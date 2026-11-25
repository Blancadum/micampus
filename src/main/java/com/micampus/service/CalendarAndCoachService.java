package com.micampus.service;

import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.model.TaskItem;
import com.micampus.repository.CampusStore;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Script Java determinista que reemplaza:
 * - build_hub_calendar.py / Sincronizar-Calendario-Mac.command (generación .ics)
 * - SenseiBot / Ollama (radar de entregas, coincidencias en el mismo día y plan de estudio)
 */
@Service
public class CalendarAndCoachService {

    private final CampusStore store;
    private final AuthService authService;

    public CalendarAndCoachService(CampusStore store, AuthService authService) {
        this.store = store;
        this.authService = authService;
    }

    public String generateIcs() {
        return generateIcs(null, "");
    }

    public String generateIcs(String subjectId) {
        return generateIcs(subjectId, "");
    }

    public String generateIcs(String subjectId, String ownerId) {
        return store.read(db -> {
            Map<String, Subject> subjectById = db.getSubjects().stream()
                    .filter(s -> authService.matchesOwner(s.getOwnerId(), ownerId))
                    .collect(Collectors.toMap(Subject::getId, s -> s, (a, b) -> a));

            String calName = "MiCampus Entregas";
            if (subjectId != null && !subjectId.isBlank() && subjectById.containsKey(subjectId)) {
                calName = "MiCampus - " + subjectById.get(subjectId).getTitle();
            }

            StringBuilder ics = new StringBuilder();
            ics.append("BEGIN:VCALENDAR\r\n");
            ics.append("VERSION:2.0\r\n");
            ics.append("PRODID:-//MiCampus Java//NONSGML v1.0//ES\r\n");
            ics.append("X-WR-CALNAME:").append(escapeIcs(calName)).append("\r\n");

            for (TaskItem task : db.getTasks()) {
                if (!authService.matchesOwner(task.getOwnerId(), ownerId)) {
                    continue;
                }
                if (subjectId != null && !subjectId.isBlank() && !subjectId.equals(task.getSubjectId())) {
                    continue;
                }
                if ("done".equalsIgnoreCase(task.getStatus()) || task.getDueDate() == null || task.getDueDate().isBlank()) {
                    continue;
                }
                String dateStr = task.getDueDate().replace("-", "");
                if (!dateStr.matches("\\d{8}")) {
                    continue;
                }
                Subject sub = subjectById.get(task.getSubjectId());
                String code = sub != null ? sub.getCode().toUpperCase() : "GEN";
                String subTitle = sub != null ? sub.getTitle() : "General";

                ics.append("BEGIN:VEVENT\r\n");
                ics.append("UID:").append(task.getId()).append("@micampus.local\r\n");
                ics.append("DTSTAMP:20260101T000000Z\r\n");
                ics.append("DTSTART;VALUE=DATE:").append(dateStr).append("\r\n");
                ics.append("SUMMARY:Entrega ").append(escapeIcs(task.getTitle())).append(" [").append(code).append("]\r\n");
                ics.append("DESCRIPTION:Asignatura: ").append(escapeIcs(subTitle));
                if (task.getWeight() > 0) {
                    ics.append(" (Peso: ").append(task.getWeight()).append("%)");
                }
                ics.append("\r\n");
                ics.append("STATUS:CONFIRMED\r\n");
                ics.append("BEGIN:VALARM\r\n");
                ics.append("TRIGGER:-P2D\r\n");
                ics.append("ACTION:DISPLAY\r\n");
                ics.append("DESCRIPTION:Recordatorio de entrega ").append(code).append("\r\n");
                ics.append("END:VALARM\r\n");
                ics.append("END:VEVENT\r\n");
            }

            ics.append("END:VCALENDAR\r\n");
            return ics.toString();
        });
    }

    public Map<String, Object> buildCoachReport() {
        return buildCoachReport("");
    }

    public Map<String, Object> buildCoachReport(String ownerId) {
        return store.read(db -> {
            LocalDate today = LocalDate.now();
            Map<String, Subject> subjectById = db.getSubjects().stream()
                    .filter(s -> authService.matchesOwner(s.getOwnerId(), ownerId))
                    .collect(Collectors.toMap(Subject::getId, s -> s, (a, b) -> a));

            List<Map<String, Object>> overdue = new ArrayList<>();
            List<Map<String, Object>> urgent = new ArrayList<>();
            List<Map<String, Object>> upcoming = new ArrayList<>();
            List<Map<String, Object>> solutionReleases = new ArrayList<>();
            Map<String, List<String>> sameDayMap = new LinkedHashMap<>();

            long doneTasks = 0;
            List<TaskItem> ownerTasks = db.getTasks().stream()
                    .filter(t -> authService.matchesOwner(t.getOwnerId(), ownerId))
                    .toList();
            for (TaskItem t : ownerTasks) {
                Subject sub = subjectById.get(t.getSubjectId());

                if (t.getGradeDate() != null && !t.getGradeDate().isBlank()) {
                    try {
                        LocalDate gradeDue = LocalDate.parse(t.getGradeDate());
                        long daysSol = ChronoUnit.DAYS.between(today, gradeDue);
                        boolean hasUploadedSolution = hasSolutionUpload(db.getUploads(), t);
                        if (daysSol >= -7 && !hasUploadedSolution) {
                            Map<String, Object> solItem = new LinkedHashMap<>();
                            solItem.put("id", t.getId());
                            solItem.put("subjectId", t.getSubjectId());
                            solItem.put("subjectCode", sub != null ? sub.getCode() : "");
                            solItem.put("title", t.getTitle());
                            solItem.put("gradeDate", t.getGradeDate());
                            solItem.put("daysRemaining", daysSol);
                            solItem.put("status", t.getStatus());
                            solItem.put("subjectTitle", sub != null ? sub.getShortTitle() : "General");
                            solutionReleases.add(solItem);
                        }
                    } catch (Exception ignored) {
                    }
                }

                if ("done".equalsIgnoreCase(t.getStatus())) {
                    doneTasks++;
                    continue;
                }
                if (t.getDueDate() == null || t.getDueDate().isBlank()) continue;

                LocalDate due;
                try {
                    due = LocalDate.parse(t.getDueDate());
                } catch (Exception e) {
                    continue;
                }

                long days = ChronoUnit.DAYS.between(today, due);

                Map<String, Object> item = new LinkedHashMap<>();
                item.put("id", t.getId());
                item.put("subjectId", t.getSubjectId());
                item.put("subjectCode", sub != null ? sub.getCode() : "");
                item.put("title", t.getTitle());
                item.put("dueDate", t.getDueDate());
                item.put("daysRemaining", days);
                item.put("subjectTitle", sub != null ? sub.getShortTitle() : "General");
                item.put("subjectColor", sub != null ? sub.getColor() : "#3b82f6");
                item.put("subjectIcon", sub != null ? sub.getIcon() : "📌");
                item.put("weight", t.getWeight());

                if (days < 0) {
                    overdue.add(item);
                } else if (days <= 3) {
                    urgent.add(item);
                } else {
                    upcoming.add(item);
                }

                if (days >= 0) {
                    sameDayMap.computeIfAbsent(t.getDueDate(), k -> new ArrayList<>())
                            .add((sub != null ? sub.getShortTitle() + ": " : "") + t.getTitle());
                }
            }

            Comparator<Map<String, Object>> byDays = Comparator.comparingLong(m -> (Long) m.get("daysRemaining"));
            overdue.sort(byDays);
            urgent.sort(byDays);
            upcoming.sort(byDays);
            solutionReleases.sort(byDays);

            List<Map<String, Object>> collisions = new ArrayList<>();
            for (Map.Entry<String, List<String>> entry : sameDayMap.entrySet()) {
                if (entry.getValue().size() > 1) {
                    Map<String, Object> c = new HashMap<>();
                    c.put("date", entry.getKey());
                    c.put("count", entry.getValue().size());
                    c.put("tasks", entry.getValue());
                    collisions.add(c);
                }
            }

            List<Lesson> ownerLessons = db.getLessons().stream()
                    .filter(l -> authService.matchesOwner(l.getOwnerId(), ownerId))
                    .toList();
            long completedLessons = ownerLessons.stream().filter(Lesson::isCompleted).count();
            int totalLessons = ownerLessons.size();
            int totalTasks = ownerTasks.size();

            Map<String, Object> report = new LinkedHashMap<>();
            report.put("generatedAt", today.toString());
            report.put("overdue", overdue);
            report.put("urgent", urgent);
            report.put("upcoming", upcoming);
            report.put("solutionReleases", solutionReleases);
            report.put("collisions", collisions);
            report.put("stats", Map.of(
                    "totalSubjects", subjectById.size(),
                    "totalLessons", totalLessons,
                    "completedLessons", completedLessons,
                    "totalTasks", totalTasks,
                    "doneTasks", doneTasks,
                    "pendingTasks", totalTasks - doneTasks
            ));
            return report;
        });
    }

    /**
     * Parsea eventos VEVENT de un archivo .ics y los guarda como entregas/eventos de la asignatura.
     */
    public List<TaskItem> importIcsForSubject(String subjectId, String icsContent) {
        if (icsContent == null || icsContent.isBlank()) {
            return List.of();
        }
        String unfolded = icsContent.replaceAll("\\r?\\n[ \\t]", "");
        String[] blocks = unfolded.split("(?i)BEGIN:VEVENT");
        List<TaskItem> created = new ArrayList<>();
        Pattern datePattern = Pattern.compile("(\\d{4})(\\d{2})(\\d{2})");

        for (int i = 1; i < blocks.length; i++) {
            String block = blocks[i];
            int endIdx = block.toUpperCase().indexOf("END:VEVENT");
            if (endIdx >= 0) {
                block = block.substring(0, endIdx);
            }

            String summary = "";
            String dueDate = "";
            String description = "";

            for (String rawLine : block.split("\\r?\\n")) {
                String line = rawLine.trim();
                if (line.isEmpty()) continue;
                int colonIdx = line.indexOf(':');
                if (colonIdx <= 0) continue;

                String keyPart = line.substring(0, colonIdx).toUpperCase();
                String valPart = line.substring(colonIdx + 1).trim();

                if (keyPart.equals("SUMMARY") || keyPart.startsWith("SUMMARY;")) {
                    summary = unescapeIcs(valPart);
                } else if (keyPart.equals("DTSTART") || keyPart.startsWith("DTSTART;")) {
                    Matcher m = datePattern.matcher(valPart);
                    if (m.find()) {
                        dueDate = m.group(1) + "-" + m.group(2) + "-" + m.group(3);
                    }
                } else if (keyPart.equals("DESCRIPTION") || keyPart.startsWith("DESCRIPTION;")) {
                    description = unescapeIcs(valPart);
                }
            }

            if (summary.isBlank()) continue;

            TaskItem item = new TaskItem();
            item.setId(UUID.randomUUID().toString().substring(0, 8));
            item.setSubjectId(subjectId);
            item.setTitle(summary);
            item.setDescription(description);
            item.setDueDate(dueDate);
            item.setStatus("pending");
            created.add(item);
        }

        if (!created.isEmpty()) {
            store.write(db -> {
                for (TaskItem item : created) {
                    boolean duplicate = db.getTasks().stream().anyMatch(existing ->
                            subjectId.equals(existing.getSubjectId())
                                    && item.getTitle().equalsIgnoreCase(existing.getTitle())
                                    && ((item.getDueDate() == null && existing.getDueDate() == null)
                                    || (item.getDueDate() != null && item.getDueDate().equals(existing.getDueDate()))));
                    if (!duplicate) {
                        db.getTasks().add(item);
                    }
                }
            });
        }

        return created;
    }

    private boolean hasSolutionUpload(List<com.micampus.model.UploadedFile> uploads, TaskItem task) {
        if (uploads == null || uploads.isEmpty() || task == null) return false;
        String titleLower = task.getTitle() == null ? "" : task.getTitle().toLowerCase();
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("(eac|eaf)\\s*(\\d+)").matcher(titleLower);
        String eacKey = m.find() ? (m.group(1) + m.group(2) + "-solucion") : null;
        return uploads.stream().anyMatch(u -> {
            if (!java.util.Objects.equals(u.getSubjectId(), task.getSubjectId())) return false;
            String folder = u.getFolder() == null ? "" : u.getFolder().toLowerCase();
            if (!folder.endsWith("-solucion")) return false;
            if (eacKey != null) return folder.equals(eacKey);
            return true;
        });
    }

    private String escapeIcs(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\").replace(",", "\\,").replace(";", "\\;").replace("\n", " ");
    }

    private String unescapeIcs(String text) {
        if (text == null) return "";
        return text.replace("\\n", "\n")
                .replace("\\N", "\n")
                .replace("\\,", ",")
                .replace("\\;", ";")
                .replace("\\\\", "\\");
    }
}
