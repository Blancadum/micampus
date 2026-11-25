package com.micampus.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.CampusConfig;
import com.micampus.model.GeneratedQuiz;
import com.micampus.model.Subject;
import com.micampus.repository.CampusStore;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * Conector con el bot personal de Telegram del usuario (creado con @BotFather).
 * Permite consultar entregas, asignaturas y hablar con la IA configurada desde el móvil.
 */
@Service
public class TelegramBotService {

    private final CampusStore store;
    private final CalendarAndCoachService calendarAndCoachService;
    private final AiAssistantService aiAssistantService;
    private final AiAgentOrchestrator aiAgentOrchestrator;
    private final QuizService quizService;
    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private long lastUpdateId = 0;
    private final Map<String, List<String>> chatHistory = new java.util.concurrent.ConcurrentHashMap<>();

    public TelegramBotService(
            CampusStore store,
            CalendarAndCoachService calendarAndCoachService,
            AiAssistantService aiAssistantService,
            AiAgentOrchestrator aiAgentOrchestrator,
            QuizService quizService) {
        this.store = store;
        this.calendarAndCoachService = calendarAndCoachService;
        this.aiAssistantService = aiAssistantService;
        this.aiAgentOrchestrator = aiAgentOrchestrator;
        this.quizService = quizService;
    }

    @Scheduled(fixedDelay = 3_000)
    public void pollUpdates() {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg == null || !cfg.isTelegramEnabled() || cfg.getTelegramBotToken() == null || cfg.getTelegramBotToken().isBlank()) {
            return;
        }
        String token = cfg.getTelegramBotToken().trim();
        try {
            String url = "https://api.telegram.org/bot" + token + "/getUpdates?timeout=1&offset=" + (lastUpdateId + 1);
            HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url)).timeout(Duration.ofSeconds(10)).GET().build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() >= 400) return;

            JsonNode root = mapper.readTree(res.body());
            if (!root.path("ok").asBoolean(false)) return;

            for (JsonNode update : root.path("result")) {
                long updateId = update.path("update_id").asLong(0);
                if (updateId > lastUpdateId) lastUpdateId = updateId;

                JsonNode msg = update.path("message");
                if (msg.isMissingNode()) continue;

                String chatId = msg.path("chat").path("id").asText("");
                String text = msg.path("text").asText("").trim();
                if (chatId.isBlank() || text.isBlank()) continue;

                // Si el usuario aún no ha fijado chatId, lo guardamos automáticamente con /start
                String allowedChat = cfg.getTelegramChatId() != null ? cfg.getTelegramChatId().trim() : "";
                if (!allowedChat.isBlank() && !allowedChat.equals(chatId)) {
                    continue;
                }
                if (allowedChat.isBlank()) {
                    store.write(db -> db.getConfig().setTelegramChatId(chatId));
                }

                sendTypingAction(token, chatId);
                if (text.trim().toLowerCase().startsWith("/quiz")) {
                    handleQuizCommand(token, chatId, text.trim());
                    continue;
                }
                String reply = handleIncomingMessage(text, chatId);
                sendMessage(token, chatId, reply);
            }
        } catch (Exception ignored) {
            // Silencioso para no saturar logs si no hay red temporalmente
        }
    }

    @SuppressWarnings("unchecked")
    private String handleIncomingMessage(String text, String chatId) {
        String lower = text.toLowerCase();
        if (lower.startsWith("/start") || lower.startsWith("/ayuda") || lower.startsWith("/help")) {
            return """
                    🎓 MiCampus Bot conectado
                    Tu Chat ID es: %s

                    Comandos disponibles:
                    /entregas — Ver entregas urgentes y próximas
                    /soluciones — Ver fechas de publicación de soluciones de EACs
                    /asignaturas — Ver tus asignaturas
                    /plan — Generar plan de estudio con tu IA
                    /agentes — Ver la plantilla de agentes IA
                    /auditar desp u1 — Auditar unidad contra PDF oficial
                    /glosario desp u1 — Extraer conceptos clave de la unidad
                    /agente <id> <asig> <unidad> | <pregunta> — Consultar a un agente
                    /nueva Asignatura | Título | YYYY-MM-DD — Crear entrega
                    /hecha Título — Marcar una entrega como completada
                    /limpiar — Reiniciar memoria de esta conversación

                    También puedes escribirme cualquier duda libremente (recuerdo el contexto del chat).
                    """.formatted(chatId);
        }

        if (lower.startsWith("/limpiar")) {
            chatHistory.remove(chatId);
            return "🧹 Memoria del chat reiniciada.";
        }

        if (lower.startsWith("/hecha ")) {
            if (!store.read(db -> db.getConfig().isTelegramAllowActions())) {
                return "🔒 La creación/edición desde Telegram está desactivada en Ajustes.";
            }
            String needle = text.substring(7).trim().toLowerCase();
            if (needle.isBlank()) return "Uso: /hecha <parte del título de la entrega>";
            final String[] completedTitle = {null};
            store.write(db -> {
                for (com.micampus.model.TaskItem t : db.getTasks()) {
                    if (!"done".equalsIgnoreCase(t.getStatus()) && t.getTitle() != null && t.getTitle().toLowerCase().contains(needle)) {
                        t.setStatus("done");
                        completedTitle[0] = t.getTitle();
                        break;
                    }
                }
            });
            return completedTitle[0] != null
                    ? "✅ Marcada como completada: " + completedTitle[0]
                    : "No encontré ninguna entrega pendiente que coincida con \"" + needle + "\".";
        }

        if (lower.startsWith("/nueva ")) {
            if (!store.read(db -> db.getConfig().isTelegramAllowActions())) {
                return "🔒 La creación/edición desde Telegram está desactivada en Ajustes.";
            }
            String raw = text.substring(7).trim();
            String[] parts = raw.split("\\|");
            if (parts.length < 2) {
                return "Uso: /nueva Asignatura | Título de la entrega | YYYY-MM-DD (fecha opcional)";
            }
            String subQuery = parts[0].trim().toLowerCase();
            String title = parts[1].trim();
            String dueDate = parts.length >= 3 ? parts[2].trim() : "";
            final String[] targetSubName = {"General"};
            store.write(db -> {
                String subId = db.getSubjects().stream()
                        .filter(s -> s.getTitle() != null && s.getTitle().toLowerCase().contains(subQuery))
                        .map(s -> {
                            targetSubName[0] = s.getTitle();
                            return s.getId();
                        })
                        .findFirst()
                        .orElse(db.getSubjects().isEmpty() ? "general" : db.getSubjects().get(0).getId());
                com.micampus.model.TaskItem task = new com.micampus.model.TaskItem();
                task.setId(java.util.UUID.randomUUID().toString().substring(0, 8));
                task.setSubjectId(subId);
                task.setTitle(title);
                task.setDueDate(dueDate);
                task.setStatus("pending");
                db.getTasks().add(task);
            });
            return "📌 Entrega añadida en *" + targetSubName[0] + "*: " + title + (dueDate.isBlank() ? "" : " (" + dueDate + ")");
        }

        if (lower.startsWith("/asignaturas")) {
            List<Subject> subs = store.read(db -> db.getSubjects());
            if (subs.isEmpty()) return "No tienes asignaturas creadas todavía.";
            StringBuilder sb = new StringBuilder("📚 *Tus asignaturas:*\n");
            for (Subject s : subs) {
                sb.append("• ").append(s.getIcon()).append(" *").append(s.getTitle()).append("*");
                if (s.getTeacher() != null && !s.getTeacher().isBlank()) {
                    sb.append(" (Tutor/a: ").append(s.getTeacher()).append(")");
                }
                sb.append("\n");
            }
            return sb.toString();
        }

        if (lower.startsWith("/soluciones")) {
            Map<String, Object> report = calendarAndCoachService.buildCoachReport();
            List<Map<String, Object>> solutions = (List<Map<String, Object>>) report.getOrDefault("solutionReleases", List.of());
            if (solutions.isEmpty()) {
                return "✅ No tienes publicaciones de soluciones pendientes por subir.";
            }
            StringBuilder sb = new StringBuilder("📘 *Publicación de Soluciones y Notas:*\n");
            for (Map<String, Object> s : solutions) {
                long days = ((Number) s.getOrDefault("daysRemaining", 0L)).longValue();
                String tag = days < 0 ? "✅ Ya publicada (" + s.get("gradeDate") + ")"
                        : days == 0 ? "🔔 ¡Sale HOY (" + s.get("gradeDate") + ")!"
                        : "🗓️ " + s.get("gradeDate") + " (en " + days + "d)";
                sb.append("• *").append(s.get("subjectTitle")).append("*: ").append(s.get("title"))
                        .append(" — ").append(tag).append("\n");
            }
            return sb.toString();
        }

        if (lower.startsWith("/entregas") || lower.startsWith("/radar")) {
            Map<String, Object> report = calendarAndCoachService.buildCoachReport();
            StringBuilder sb = new StringBuilder("📅 *Radar de Entregas:*\n");
            for (String key : List.of("overdue", "urgent", "upcoming")) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) report.getOrDefault(key, List.of());
                if (items.isEmpty()) continue;
                String label = "overdue".equals(key) ? "🚨 Atrasadas" : "urgent".equals(key) ? "🔥 Urgentes" : "🗓️ Próximas";
                sb.append("\n*").append(label).append(":*\n");
                for (Map<String, Object> it : items) {
                    sb.append("• ").append(it.get("subjectTitle")).append(": ").append(it.get("title"))
                            .append(" (").append(it.get("dueDate")).append(")\n");
                }
            }
            return sb.toString();
        }

        if (lower.startsWith("/plan")) {
            try {
                return aiAssistantService.buildAiStudyPlan();
            } catch (Exception e) {
                return "⚠️ No tienes una IA conectada en MiCampus → ⚙️ Ajustes. Configúrala para generar planes desde Telegram.";
            }
        }

        if (lower.startsWith("/agentes")) {
            StringBuilder sb = new StringBuilder("🤖 *Plantilla de Agentes MiCampus:*\n");
            for (Map<String, Object> a : aiAgentOrchestrator.listAgents()) {
                sb.append("• `").append(a.get("id")).append("` (*").append(a.get("name")).append("*): ")
                        .append(a.get("role")).append("\n");
            }
            sb.append("\nEjemplo: `/auditar desp u2` o `/agente escritor desp u2 | Resume WildFly`");
            return sb.toString();
        }

        if (lower.startsWith("/auditar ") || lower.startsWith("/glosario ")) {
            boolean isGlossary = lower.startsWith("/glosario ");
            String[] parts = text.substring(isGlossary ? 10 : 9).trim().split("\\s+");
            if (parts.length < 2) {
                return "Uso: " + (isGlossary ? "/glosario" : "/auditar") + " <asignatura> <unidad> (ej. desp u2)";
            }
            try {
                Map<String, Object> res = aiAgentOrchestrator.runAgent(
                        isGlossary ? "glosario" : "auditor",
                        Map.of("subjectCode", parts[0], "unit", parts[1])
                );
                if ("ok".equals(res.get("aiStatus"))) {
                    return String.valueOf(res.get("answer"));
                }
                return "⚠️ Error ejecutando agente: " + res.getOrDefault("aiMessage", "IA no configurada");
            } catch (Exception e) {
                return "⚠️ Error: " + e.getMessage();
            }
        }

        if (lower.startsWith("/agente ")) {
            String body = text.substring(8).trim();
            int pipe = body.indexOf('|');
            String head = (pipe >= 0 ? body.substring(0, pipe) : body).trim();
            String question = (pipe >= 0 ? body.substring(pipe + 1) : "Resume los puntos clave.").trim();
            String[] tokens = head.split("\\s+");
            if (tokens.length == 0 || tokens[0].isBlank()) {
                return "Uso: /agente <id> [asignatura] [unidad] | <pregunta>";
            }
            String agentId = tokens[0];
            String defaultSub = store.read(db -> db.getSubjects().stream()
                    .findFirst()
                    .map(s -> s.getCode() != null && !s.getCode().isBlank() ? s.getCode() : s.getId())
                    .orElse(""));
            String subCode = tokens.length >= 2 ? tokens[1] : defaultSub;
            String unit = tokens.length >= 3 ? tokens[2] : "u1";
            try {
                Map<String, Object> res = aiAgentOrchestrator.chatWithAgent(
                        agentId,
                        subCode,
                        unit,
                        List.of(Map.of("role", "user", "content", question))
                );
                if ("ok".equals(res.get("aiStatus"))) {
                    return String.valueOf(res.get("answer"));
                }
                return "⚠️ Error en `" + agentId + "`: " + res.getOrDefault("aiMessage", "IA no configurada");
            } catch (Exception e) {
                return "⚠️ Error: " + e.getMessage();
            }
        }

        // Mensaje libre: responder con la IA configurada + contexto del campus + memoria reciente
        try {
            List<String> history = chatHistory.computeIfAbsent(chatId, k -> new java.util.ArrayList<>());
            List<String> snapshot;
            synchronized (history) {
                snapshot = new java.util.ArrayList<>(history);
            }
            String answer = aiAssistantService.askWithCampusContext(text, snapshot);
            synchronized (history) {
                history.add("Usuario: " + text);
                history.add("Asistente: " + (answer.length() > 600 ? answer.substring(0, 600) + "..." : answer));
                while (history.size() > 10) {
                    history.remove(0);
                }
            }
            return answer;
        } catch (Exception e) {
            return "👋 Recibido. Para charlar con tu IA desde Telegram, conecta Gemini, OpenAI, Claude, Ollama o una API compatible en MiCampus → ⚙️ Ajustes.\nUsa /entregas o /asignaturas para consultas rápidas sin IA.";
        }
    }

    public void sendToConfiguredChat(String text) {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg == null || !cfg.isTelegramEnabled() || !cfg.isTelegramRemindersEnabled()) return;
        if (cfg.getTelegramBotToken() == null || cfg.getTelegramBotToken().isBlank()) return;
        if (cfg.getTelegramChatId() == null || cfg.getTelegramChatId().isBlank()) return;
        try {
            sendMessage(cfg.getTelegramBotToken().trim(), cfg.getTelegramChatId().trim(), text);
        } catch (Exception ignored) {
        }
    }

    public void sendTestMessage() throws IOException, InterruptedException {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg == null || cfg.getTelegramBotToken() == null || cfg.getTelegramBotToken().isBlank()) {
            throw new IllegalStateException("Introduce primero el Token de @BotFather.");
        }
        if (cfg.getTelegramChatId() == null || cfg.getTelegramChatId().isBlank()) {
            throw new IllegalStateException("Falta el Chat ID. Envía /start a tu bot en Telegram para detectarlo automáticamente.");
        }
        sendMessage(cfg.getTelegramBotToken().trim(), cfg.getTelegramChatId().trim(), "✅ ¡Conexión correcta! Tu bot de MiCampus ya está listo en tu móvil.");
    }

    private void sendTypingAction(String token, String chatId) {
        try {
            String url = "https://api.telegram.org/bot" + token + "/sendChatAction";
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(5))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(Map.of("chat_id", chatId, "action", "typing"))))
                    .build();
            httpClient.send(req, HttpResponse.BodyHandlers.discarding());
        } catch (Exception ignored) {
        }
    }

    private void sendMessage(String token, String chatId, String text) throws IOException, InterruptedException {
        String url = "https://api.telegram.org/bot" + token + "/sendMessage";
        String remaining = text != null ? text : "";
        while (!remaining.isEmpty()) {
            String chunk = remaining.length() > 4000 ? remaining.substring(0, 4000) : remaining;
            remaining = remaining.length() > 4000 ? remaining.substring(4000) : "";
            Map<String, Object> body = Map.of("chat_id", chatId, "text", chunk);
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body)))
                    .build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() >= 400) {
                throw new IOException("Error Telegram (" + res.statusCode() + "): " + res.body());
            }
        }
    }

    private void handleQuizCommand(String token, String chatId, String text) {
        try {
            String args = text.length() > 5 ? text.substring(5).trim() : "";
            String[] tokens = args.isEmpty() ? new String[0] : args.split("\\s+");
            String subQuery = tokens.length >= 1 ? tokens[0] : "";
            String unitQuery = tokens.length >= 2 ? tokens[1] : "";

            GeneratedQuiz quiz = quizService.generateAndSaveQuiz(subQuery, unitQuery, "telegram", 3);
            sendMessage(token, chatId, "🧠 Guardado en tu campus (" + quiz.getTitle() + "). ¡Aquí van las preguntas!");
            for (GeneratedQuiz.QuestionItem item : quiz.getQuestions()) {
                sendQuizPoll(token, chatId, item);
            }
        } catch (Exception e) {
            try {
                sendMessage(token, chatId, "⚠️ No pude generar el quiz: " + e.getMessage());
            } catch (Exception ignored) {
            }
        }
    }

    private void sendQuizPoll(String token, String chatId, GeneratedQuiz.QuestionItem item)
            throws IOException, InterruptedException {
        String url = "https://api.telegram.org/bot" + token + "/sendPoll";
        String question = item.getQuestion().length() > 295 ? item.getQuestion().substring(0, 295) : item.getQuestion();
        List<String> options = item.getOptions().stream()
                .limit(10)
                .map(o -> o.length() > 95 ? o.substring(0, 95) : o)
                .toList();
        Map<String, Object> body = new java.util.LinkedHashMap<>();
        body.put("chat_id", chatId);
        body.put("question", question);
        body.put("options", options);
        body.put("type", "quiz");
        body.put("correct_option_id", Math.max(0, Math.min(item.getCorrectIndex(), options.size() - 1)));
        body.put("is_anonymous", false);
        if (item.getExplanation() != null && !item.getExplanation().isBlank()) {
            String exp = item.getExplanation();
            body.put("explanation", exp.length() > 195 ? exp.substring(0, 195) : exp);
        }
        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(15))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body)))
                .build();
        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() >= 400) {
            throw new IOException("Error Telegram sendPoll (" + res.statusCode() + "): " + res.body());
        }
    }
}
