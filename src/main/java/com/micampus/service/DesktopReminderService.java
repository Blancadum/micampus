package com.micampus.service;

import com.micampus.model.CampusConfig;
import com.micampus.repository.CampusStore;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servicio en segundo plano que lanza notificaciones nativas del sistema
 * para entregas de hoy, mañana o atrasadas sin gastar tokens de IA.
 */
@Service
public class DesktopReminderService {

    private final CalendarAndCoachService calendarAndCoachService;
    private final TelegramBotService telegramBotService;
    private final CampusStore store;
    private final Set<String> notifiedToday = ConcurrentHashMap.newKeySet();
    private volatile String lastWeeklyDigestKey = "";

    public DesktopReminderService(CalendarAndCoachService calendarAndCoachService, TelegramBotService telegramBotService, CampusStore store) {
        this.calendarAndCoachService = calendarAndCoachService;
        this.telegramBotService = telegramBotService;
        this.store = store;
    }

    @Scheduled(initialDelay = 10_000, fixedRate = 3_600_000)
    public void scheduledReminderCheck() {
        checkAndNotify(false);
    }

    @Scheduled(initialDelay = 30_000, fixedRate = 1_800_000)
    public void scheduledWeeklyDigestCheck() {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg == null || !cfg.isTelegramEnabled() || !cfg.isBotWeeklyDigestEnabled() || isWithinQuietHours(cfg)) {
            return;
        }
        LocalDate today = LocalDate.now();
        String targetDay = cfg.getBotWeeklyDigestDay() != null ? cfg.getBotWeeklyDigestDay().toUpperCase() : "MONDAY";
        if (!today.getDayOfWeek().name().equals(targetDay)) {
            return;
        }
        if (LocalTime.now().getHour() < cfg.getBotWeeklyDigestHour()) {
            return;
        }
        String weekKey = today.getYear() + "-W" + today.get(WeekFields.ISO.weekOfWeekBasedYear());
        if (weekKey.equals(lastWeeklyDigestKey)) {
            return;
        }
        lastWeeklyDigestKey = weekKey;
        sendWeeklyDigestNow();
    }

    @SuppressWarnings("unchecked")
    public void sendWeeklyDigestNow() {
        CampusConfig cfg = store.read(db -> db.getConfig());
        String callMe = (cfg != null && cfg.getBotCallMe() != null && !cfg.getBotCallMe().isBlank())
                ? cfg.getBotCallMe().trim()
                : (cfg != null ? cfg.getUserName() : "Estudiante");
        Map<String, Object> report = calendarAndCoachService.buildCoachReport();
        List<Map<String, Object>> urgent = (List<Map<String, Object>>) report.getOrDefault("urgent", List.of());
        List<Map<String, Object>> upcoming = (List<Map<String, Object>>) report.getOrDefault("upcoming", List.of());
        List<Map<String, Object>> solutions = (List<Map<String, Object>>) report.getOrDefault("solutionReleases", List.of());

        StringBuilder sb = new StringBuilder("📆 Resumen semanal de entregas para ").append(callMe).append(":\n\n");
        if (urgent.isEmpty() && upcoming.isEmpty()) {
            sb.append("✅ No tienes entregas próximas pendientes esta semana.");
        } else {
            for (Map<String, Object> it : urgent) {
                sb.append("🔥 ").append(it.get("subjectTitle")).append(": ").append(it.get("title")).append(" (").append(it.get("dueDate")).append(")\n");
            }
            for (Map<String, Object> it : upcoming) {
                sb.append("🗓️ ").append(it.get("subjectTitle")).append(": ").append(it.get("title")).append(" (").append(it.get("dueDate")).append(")\n");
            }
        }
        List<Map<String, Object>> weekSolutions = solutions.stream()
                .filter(s -> {
                    long d = ((Number) s.getOrDefault("daysRemaining", 99L)).longValue();
                    return d >= -2 && d <= 7;
                })
                .toList();
        if (!weekSolutions.isEmpty()) {
            sb.append("\n📘 Soluciones / notas que salen esta semana:\n");
            for (Map<String, Object> s : weekSolutions) {
                sb.append("• ").append(s.get("subjectTitle")).append(": ").append(s.get("title"))
                        .append(" (").append(s.get("gradeDate")).append(")\n");
            }
        }
        telegramBotService.sendToConfiguredChat(sb.toString());
    }

    private boolean isWithinQuietHours(CampusConfig cfg) {
        if (cfg == null || !cfg.isBotQuietHoursEnabled()) return false;
        try {
            LocalTime now = LocalTime.now();
            LocalTime start = LocalTime.parse(cfg.getBotQuietStart());
            LocalTime end = LocalTime.parse(cfg.getBotQuietEnd());
            if (start.equals(end)) return false;
            if (start.isBefore(end)) {
                return !now.isBefore(start) && now.isBefore(end);
            }
            return !now.isBefore(start) || now.isBefore(end);
        } catch (Exception ignored) {
            return false;
        }
    }

    public int sendUrgentRemindersNow() {
        return checkAndNotify(true);
    }

    @SuppressWarnings("unchecked")
    private int checkAndNotify(boolean forceAll) {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (!forceAll && isWithinQuietHours(cfg)) {
            return 0;
        }
        int urgentDays = cfg != null ? cfg.getBotUrgentDaysBefore() : 2;
        Map<String, Object> report = calendarAndCoachService.buildCoachReport();
        List<Map<String, Object>> urgent = (List<Map<String, Object>>) report.getOrDefault("urgent", List.of());
        List<Map<String, Object>> overdue = (List<Map<String, Object>>) report.getOrDefault("overdue", List.of());
        List<Map<String, Object>> solutions = (List<Map<String, Object>>) report.getOrDefault("solutionReleases", List.of());

        List<Map<String, Object>> targets = new ArrayList<>();
        targets.addAll(overdue);
        targets.addAll(urgent);

        String todayKey = LocalDate.now().toString();
        int sent = 0;

        for (Map<String, Object> item : targets) {
            String taskId = String.valueOf(item.getOrDefault("id", ""));
            String dedupKey = todayKey + ":" + taskId;
            if (!forceAll && !notifiedToday.add(dedupKey)) {
                continue;
            }
            long days = ((Number) item.getOrDefault("daysRemaining", 0L)).longValue();
            if (!forceAll && days > urgentDays) {
                continue;
            }

            String subject = String.valueOf(item.getOrDefault("subjectTitle", "Asignatura"));
            String title = String.valueOf(item.getOrDefault("title", "Entrega"));
            String when = days < 0 ? ("Atrasada " + Math.abs(days) + "d")
                    : days == 0 ? "¡Vence HOY!"
                    : days == 1 ? "Vence mañana"
                    : "Vence en " + days + " días";

            sendDesktopNotification("MiCampus 📅", subject + " · " + when, title);
            telegramBotService.sendToConfiguredChat("📅 Recordatorio MiCampus\n" + subject + " · " + when + ": " + title);
            sent++;
            if (sent >= 3) break; // Evitar saturar el centro de notificaciones
        }

        for (Map<String, Object> sol : solutions) {
            long days = ((Number) sol.getOrDefault("daysRemaining", 99L)).longValue();
            if (!forceAll && (days < -3 || days > 1)) {
                continue;
            }
            String taskId = String.valueOf(sol.getOrDefault("id", ""));
            String dedupKey = todayKey + ":sol:" + taskId;
            if (!forceAll && !notifiedToday.add(dedupKey)) {
                continue;
            }
            String subject = String.valueOf(sol.getOrDefault("subjectTitle", "Asignatura"));
            String title = String.valueOf(sol.getOrDefault("title", "EAC"));
            String gradeDate = String.valueOf(sol.getOrDefault("gradeDate", ""));
            String when = days < 0 ? ("Salió el " + gradeDate)
                    : days == 0 ? "¡Sale HOY (" + gradeDate + ")!"
                    : "Sale mañana (" + gradeDate + ")";

            sendDesktopNotification("MiCampus 📘", "Solución " + subject + " · " + when, title);
            telegramBotService.sendToConfiguredChat(
                    "📘 Solución oficial · " + subject + "\n" + title + " — " + when
                            + "\nRecuerda revisarla y subirla con «📥 Subir solución» en MiCampus."
            );
            sent++;
            if (sent >= 5) break;
        }

        if (targets.isEmpty() && sent == 0 && forceAll) {
            sendDesktopNotification("MiCampus 📅", "Todo al día", "No tienes entregas urgentes ni soluciones pendientes.");
            return 1;
        }
        return sent;
    }

    private void sendDesktopNotification(String title, String subtitle, String message) {
        String os = System.getProperty("os.name", "").toLowerCase();
        if (os.contains("mac")) {
            try {
                String script = String.format(
                        "display notification \"%s\" with title \"%s\" subtitle \"%s\" sound name \"Glass\"",
                        escapeAppleScript(message),
                        escapeAppleScript(title),
                        escapeAppleScript(subtitle)
                );
                new ProcessBuilder("osascript", "-e", script).start();
            } catch (Exception ignored) {
            }
        }
    }

    private String escapeAppleScript(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", " ");
    }
}
