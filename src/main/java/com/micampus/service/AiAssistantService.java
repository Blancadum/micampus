package com.micampus.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.AiProfile;
import com.micampus.model.CampusConfig;
import com.micampus.model.Lesson;
import com.micampus.model.TaskItem;
import com.micampus.repository.CampusStore;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AiAssistantService {

    private final CampusStore store;
    private final NoteImporterService noteImporterService;
    private final CalendarAndCoachService calendarAndCoachService;
    private final BackupService backupService;
    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    public AiAssistantService(
            CampusStore store,
            NoteImporterService noteImporterService,
            CalendarAndCoachService calendarAndCoachService,
            BackupService backupService) {
        this.store = store;
        this.noteImporterService = noteImporterService;
        this.calendarAndCoachService = calendarAndCoachService;
        this.backupService = backupService;
    }

    /**
     * Autodetecta si el texto pegado o generado por la IA es un calendario (.ics) o un libro (.md)
     * y lo guarda en la asignatura correspondiente.
     */
    public Map<String, Object> importRawContent(String subjectId, String unit, String rawContent) {
        if (rawContent == null || rawContent.isBlank()) {
            return Map.of("status", "error", "message", "El contenido está vacío.");
        }
        String cleaned = stripCodeFences(rawContent.trim());

        if (cleaned.toUpperCase().contains("BEGIN:VCALENDAR") || cleaned.toUpperCase().contains("BEGIN:VEVENT")) {
            List<TaskItem> imported = calendarAndCoachService.importIcsForSubject(subjectId, cleaned);
            try {
                backupService.saveNormalizedCalendarFile(subjectId, cleaned);
            } catch (IOException ignored) {
            }
            return Map.of(
                    "status", "ok",
                    "kind", "ics",
                    "count", imported.size(),
                    "message", "Se detectó un calendario .ics, se guardó como " + backupService.buildNormalizedCalendarFilename(subjectId) + " y se importaron " + imported.size() + " evento(s)."
            );
        }

        String normalized = noteImporterService.normalizeMarkdown(cleaned);
        List<Lesson> lessons = noteImporterService.splitIntoLessons(normalized, subjectId, unit, "Apuntes IA");
        if (!lessons.isEmpty()) {
            store.write(db -> db.getLessons().addAll(lessons));
        }
        return Map.of(
                "status", "ok",
                "kind", "book",
                "count", lessons.size(),
                "message", "Se detectó formato Libro Markdown y se crearon " + lessons.size() + " lección(es)."
        );
    }

    /**
     * Transforma texto crudo (PDF/apuntes o .ics) usando Gemini API u Ollama local según la configuración.
     */
    /**
     * Transforma texto crudo usando el motor principal y, si falla, recorre en orden
     * los motores de respaldo configurados en Ajustes.
     */
    /**
     * Transforma texto crudo usando el motor principal y, si falla, recorre en orden
     * los motores de respaldo configurados en Ajustes.
     * En modo libro/markdown, aplica troceado automático y control de densidad de palabras
     * respecto al PDF/texto original.
     */
    public String transformWithConfiguredAi(String mode, String rawText) throws IOException, InterruptedException {
        boolean isBookMode = mode == null || mode.isBlank()
                || "book".equalsIgnoreCase(mode)
                || "markdown".equalsIgnoreCase(mode);
        if (isBookMode && countWords(rawText) >= 250) {
            return transformBookWithDensityCheck(rawText);
        }
        return callConfiguredChain(mode, rawText);
    }

    /**
     * Cuenta las palabras útiles de un texto para validar la densidad web frente al PDF.
     */
    public int countWords(String text) {
        if (text == null || text.isBlank()) {
            return 0;
        }
        String trimmed = text.trim();
        return trimmed.isEmpty() ? 0 : trimmed.split("\\s+").length;
    }

    /**
     * Selecciona los fragmentos más relevantes de un texto/PDF largo en función de una consulta
     * (título de unidad, palabras clave o pregunta), evitando recortar ciegamente por el principio.
     */
    public String extractRelevantExcerpts(String fullText, String query, int maxChars) {
        if (fullText == null || fullText.isBlank()) return "";
        if (fullText.length() <= maxChars) return fullText;

        String[] rawBlocks = fullText.split("\\n\\s*\\n");
        if (rawBlocks.length <= 2) {
            return fullText.substring(0, maxChars) + "\n...[recortado]";
        }

        List<String> terms = java.util.Arrays.stream((query != null ? query : "").toLowerCase(java.util.Locale.ROOT).split("[^a-záéíóúüñ0-9]+"))
                .filter(t -> t.length() >= 3)
                .distinct()
                .toList();

        record ScoredBlock(int index, String text, int score) {}
        List<ScoredBlock> scored = new java.util.ArrayList<>();
        for (int i = 0; i < rawBlocks.length; i++) {
            String block = rawBlocks[i].trim();
            if (block.isEmpty()) continue;
            String lower = block.toLowerCase(java.util.Locale.ROOT);
            int score = (i < 2) ? 2 : 0; // Prioriza cabecera/introducción inicial
            for (String term : terms) {
                if (lower.contains(term)) {
                    score += 3;
                }
            }
            if (block.startsWith("#") || block.contains("```")) {
                score += 1;
            }
            scored.add(new ScoredBlock(i, block, score));
        }

        scored.sort((a, b) -> Integer.compare(b.score(), a.score()));
        List<ScoredBlock> chosen = new java.util.ArrayList<>();
        int used = 0;
        for (ScoredBlock sb : scored) {
            if (used + sb.text().length() + 4 > maxChars) continue;
            chosen.add(sb);
            used += sb.text().length() + 4;
        }
        chosen.sort(java.util.Comparator.comparingInt(ScoredBlock::index));

        StringBuilder out = new StringBuilder();
        for (ScoredBlock sb : chosen) {
            if (!out.isEmpty()) out.append("\n\n");
            out.append(sb.text());
        }
        return out.isEmpty() ? fullText.substring(0, maxChars) : out.toString();
    }

    /**
     * Trocea materiales largos, convierte cada bloque a Markdown didáctico y exige
     * una densidad mínima (~65% de las palabras del original) disparando una ampliación
     * automática si la IA resumió en exceso.
     */
    public String transformBookWithDensityCheck(String rawText) throws IOException, InterruptedException {
        List<String> chunks = splitIntoChunks(rawText, 12_000);
        StringBuilder combined = new StringBuilder();
        for (String chunk : chunks) {
            int sourceWords = countWords(chunk);
            String generated = callConfiguredChain("book", chunk);
            int generatedWords = countWords(generated);
            if (sourceWords >= 250 && generatedWords < Math.round(sourceWords * 0.65)) {
                String expandInput = """
                        OBJETIVO DE DENSIDAD: El texto original tiene %d palabras y tu borrador solo tiene %d.
                        Amplía y desarrolla TODOS los apartados, comandos, tablas y ejemplos para alcanzar
                        aproximadamente %d palabras (sin resumir ni omitir detalles), añadiendo al menos
                        una analogía práctica (> 💡 **Analogía:** ...) y un diagrama conceptual ASCII.

                        TEXTO ORIGINAL DEL PDF:
                        %s

                        BORRADOR ACTUAL A AMPLIAR:
                        %s
                        """.formatted(sourceWords, generatedWords, sourceWords, chunk, generated);
                String expanded = callConfiguredChain("chat", expandInput);
                if (countWords(expanded) > generatedWords) {
                    generated = expanded;
                }
            }
            if (!combined.isEmpty()) {
                combined.append("\n\n");
            }
            combined.append(generated.trim());
        }
        return combined.toString();
    }

    /**
     * Genera en JSON la especificación del mapa conceptual SVG para UnitIntroDiagram.jsx.
     */
    @SuppressWarnings("unchecked")
    public Optional<Map<String, Object>> generateUnitDiagramSpec(String unitTitle, String unitMarkdown) {
        if (unitMarkdown == null || unitMarkdown.isBlank()) {
            return Optional.empty();
        }
        String excerpt = unitMarkdown.length() > 6000 ? unitMarkdown.substring(0, 6000) : unitMarkdown;
        String prompt = """
                A partir del temario de la unidad "%s", devuelve ÚNICAMENTE un JSON válido (sin markdown)
                con exactamente 3 nodos conceptuales y 2 flechas para renderizar su mapa conceptual SVG:
                {
                  "title": "Título breve del mapa conceptual",
                  "nodes": [
                    { "title": "Bloque 1", "bullets": ["Concepto 1", "Concepto 2", "Concepto 3"] },
                    { "title": "Bloque 2", "bullets": ["Concepto 1", "Concepto 2", "Concepto 3"] },
                    { "title": "Bloque 3", "bullets": ["Concepto 1", "Concepto 2", "Concepto 3"] }
                  ],
                  "edges": ["Relación 1→2", "Relación 2→3"]
                }

                TEMARIO:
                %s
                """.formatted(unitTitle != null ? unitTitle : "Unidad", excerpt);
        try {
            String raw = stripCodeFences(callConfiguredChain("chat", prompt).trim());
            int start = raw.indexOf('{');
            int end = raw.lastIndexOf('}');
            if (start < 0 || end <= start) {
                return Optional.empty();
            }
            Map<String, Object> parsed = mapper.readValue(raw.substring(start, end + 1), Map.class);
            if (parsed.get("nodes") instanceof List<?> nodes && !nodes.isEmpty()) {
                return Optional.of(parsed);
            }
        } catch (Exception ignored) {
        }
        return Optional.empty();
    }

    private List<String> splitIntoChunks(String text, int maxChars) {
        if (text == null || text.length() <= maxChars) {
            return List.of(text == null ? "" : text);
        }
        List<String> chunks = new java.util.ArrayList<>();
        String[] paragraphs = text.split("\\n\\s*\\n");
        StringBuilder current = new StringBuilder();
        for (String para : paragraphs) {
            if (!current.isEmpty() && current.length() + para.length() + 2 > maxChars) {
                chunks.add(current.toString().trim());
                current.setLength(0);
            }
            if (!current.isEmpty()) {
                current.append("\n\n");
            }
            current.append(para);
        }
        if (!current.isEmpty()) {
            chunks.add(current.toString().trim());
        }
        return chunks;
    }

    private String callConfiguredChain(String mode, String rawText) throws IOException, InterruptedException {
        CampusConfig cfg = store.read(db -> db.getConfig());
        List<AiProfile> chain = new java.util.ArrayList<>();

        AiProfile primary = primaryToProfile(cfg);
        if (!"none".equalsIgnoreCase(primary.getProvider())) {
            chain.add(primary);
        }
        if (cfg.getAiFallbacks() != null) {
            for (AiProfile fb : cfg.getAiFallbacks()) {
                if (fb != null && fb.isEnabled() && !"none".equalsIgnoreCase(fb.getProvider())) {
                    chain.add(fb);
                }
            }
        }
        if (chain.isEmpty()) {
            throw new IllegalStateException("No hay proveedor de IA configurado en Ajustes.");
        }

        List<String> errors = new java.util.ArrayList<>();
        for (int i = 0; i < chain.size(); i++) {
            AiProfile profile = chain.get(i);
            String name = !isBlank(profile.getLabel()) ? profile.getLabel() : (i == 0 ? "Principal (" + profile.getProvider() + ")" : "Respaldo " + i + " (" + profile.getProvider() + ")");
            try {
                return callProfile(profile, mode, rawText);
            } catch (Exception ex) {
                errors.add(name + ": " + (ex.getMessage() != null ? ex.getMessage() : ex.getClass().getSimpleName()));
            }
        }
        throw new IOException("Fallaron todos los motores de IA configurados → " + String.join(" | ", errors));
    }

    public String testSingleProfile(AiProfile profile) throws IOException, InterruptedException {
        if (profile == null || "none".equalsIgnoreCase(profile.getProvider())) {
            return testAiConnection();
        }
        return callProfile(profile, "chat", "Responde únicamente con: Conexión OK con MiCampus.");
    }

    private AiProfile primaryToProfile(CampusConfig cfg) {
        AiProfile p = new AiProfile();
        String provider = cfg.getAiProvider() != null ? cfg.getAiProvider().trim().toLowerCase() : "none";
        p.setProvider(provider);
        p.setModel(resolveModel(cfg, provider));
        p.setIntensity(cfg.getAiIntensity());
        switch (provider) {
            case "gemini" -> p.setApiKey(cfg.getGeminiApiKey());
            case "openai" -> p.setApiKey(cfg.getOpenaiApiKey());
            case "anthropic" -> p.setApiKey(cfg.getAnthropicApiKey());
            case "ollama" -> p.setBaseUrl(cfg.getOllamaUrl());
            case "custom_openai" -> {
                p.setBaseUrl(cfg.getCustomAiBaseUrl());
                p.setApiKey(cfg.getCustomAiApiKey());
            }
        }
        return p;
    }

    private String callProfile(AiProfile profile, String mode, String rawText) throws IOException, InterruptedException {
        String provider = profile.getProvider() != null ? profile.getProvider().trim().toLowerCase() : "none";
        String selectedModel = !isBlank(profile.getModel()) ? profile.getModel().trim() : defaultModelFor(provider);
        IntensityProfile intensity = resolveIntensity(profile.getIntensity());
        String prompt = buildPrompt(mode)
                + (intensity.promptHint().isEmpty() ? "" : ("\n" + intensity.promptHint()))
                + "\n\n---\nCONTENIDO ORIGINAL:\n" + rawText;

        return switch (provider) {
            case "gemini" -> {
                if (isBlank(profile.getApiKey())) throw new IllegalStateException("Falta Gemini API Key.");
                yield callGemini(profile.getApiKey().trim(), selectedModel, intensity, prompt);
            }
            case "openai" -> {
                if (isBlank(profile.getApiKey())) throw new IllegalStateException("Falta OpenAI API Key.");
                yield callOpenAiCompatible("https://api.openai.com/v1", profile.getApiKey().trim(), selectedModel, intensity, prompt);
            }
            case "anthropic" -> {
                if (isBlank(profile.getApiKey())) throw new IllegalStateException("Falta Anthropic API Key.");
                yield callAnthropic(profile.getApiKey().trim(), selectedModel, intensity, prompt);
            }
            case "custom_openai" -> {
                if (isBlank(profile.getBaseUrl())) throw new IllegalStateException("Falta Base URL.");
                String baseUrl = trimTrailingSlashes(profile.getBaseUrl());
                String apiKey = profile.getApiKey() != null ? profile.getApiKey().trim() : "";
                yield callOpenAiCompatible(baseUrl, apiKey, selectedModel, intensity, prompt);
            }
            case "ollama" -> {
                String baseUrl = isBlank(profile.getBaseUrl()) ? "http://localhost:11434" : trimTrailingSlashes(profile.getBaseUrl());
                yield callOllama(baseUrl, selectedModel, intensity, prompt);
            }
            default -> throw new IllegalStateException("Proveedor de IA no válido: " + provider);
        };
    }

    private String defaultModelFor(String provider) {
        return switch (provider) {
            case "gemini" -> "gemini-flash-latest";
            case "openai" -> "gpt-4o-mini";
            case "anthropic" -> "claude-sonnet-4-0";
            case "ollama" -> "llama3.2";
            case "custom_openai" -> "local-model";
            default -> "";
        };
    }

    private record IntensityProfile(double temperature, int maxTokens, String promptHint) {}

    private IntensityProfile resolveIntensity(String raw) {
        String level = raw != null ? raw.trim().toLowerCase() : "medium";
        return switch (level) {
            case "low" -> new IntensityProfile(0.2, 2048, "Nivel de detalle: ligero y directo, responde de forma breve ahorrando tokens.");
            case "high" -> new IntensityProfile(0.7, 16384, "Nivel de detalle: profundo y exhaustivo, razona paso a paso y da explicaciones completas.");
            default -> new IntensityProfile(0.5, 8192, "");
        };
    }

    /**
     * Consulta dinámicamente la API del proveedor configurado para listar todos los modelos disponibles.
     */
    public List<Map<String, String>> listAvailableModels(CampusConfig overrideCfg) throws IOException, InterruptedException {
        CampusConfig saved = store.read(db -> db.getConfig());
        CampusConfig cfg = overrideCfg != null ? overrideCfg : saved;
        String provider = cfg.getAiProvider() != null ? cfg.getAiProvider().trim().toLowerCase() : "none";
        List<Map<String, String>> models = new java.util.ArrayList<>();

        switch (provider) {
            case "gemini" -> {
                String key = !isBlank(cfg.getGeminiApiKey()) ? cfg.getGeminiApiKey().trim() : saved.getGeminiApiKey().trim();
                if (isBlank(key)) throw new IllegalStateException("Introduce primero tu Gemini API Key.");
                JsonNode root = sendJson("GET", "https://generativelanguage.googleapis.com/v1beta/models?key=" + key, Map.of(), null, 15);
                for (JsonNode m : root.path("models")) {
                    boolean supportsGenerate = false;
                    for (JsonNode method : m.path("supportedGenerationMethods")) {
                        if ("generateContent".equals(method.asText())) {
                            supportsGenerate = true;
                            break;
                        }
                    }
                    if (!supportsGenerate) continue;
                    String id = m.path("name").asText("").replaceFirst("^models/", "");
                    String display = m.path("displayName").asText(id);
                    if (!id.isBlank()) models.add(Map.of("id", id, "label", display + " (" + id + ")"));
                }
            }
            case "openai" -> {
                String key = !isBlank(cfg.getOpenaiApiKey()) ? cfg.getOpenaiApiKey().trim() : saved.getOpenaiApiKey().trim();
                if (isBlank(key)) throw new IllegalStateException("Introduce primero tu OpenAI API Key.");
                JsonNode root = sendJson("GET", "https://api.openai.com/v1/models", Map.of("Authorization", "Bearer " + key), null, 15);
                for (JsonNode m : root.path("data")) {
                    String id = m.path("id").asText("");
                    if (!id.isBlank()) models.add(Map.of("id", id, "label", id));
                }
                models.sort(java.util.Comparator.comparing(a -> a.get("id")));
            }
            case "anthropic" -> {
                String key = !isBlank(cfg.getAnthropicApiKey()) ? cfg.getAnthropicApiKey().trim() : saved.getAnthropicApiKey().trim();
                if (isBlank(key)) throw new IllegalStateException("Introduce primero tu Anthropic API Key.");
                JsonNode root = sendJson("GET", "https://api.anthropic.com/v1/models", Map.of(
                        "x-api-key", key,
                        "anthropic-version", "2023-06-01"
                ), null, 15);
                for (JsonNode m : root.path("data")) {
                    String id = m.path("id").asText("");
                    String display = m.path("display_name").asText(id);
                    if (!id.isBlank()) models.add(Map.of("id", id, "label", display + " (" + id + ")"));
                }
            }
            case "ollama" -> {
                String baseUrl = isBlank(cfg.getOllamaUrl()) ? "http://localhost:11434" : trimTrailingSlashes(cfg.getOllamaUrl());
                JsonNode root = sendJson("GET", baseUrl + "/api/tags", Map.of(), null, 10);
                for (JsonNode m : root.path("models")) {
                    String id = m.path("name").asText("");
                    if (!id.isBlank()) models.add(Map.of("id", id, "label", id));
                }
            }
            case "custom_openai" -> {
                String baseUrl = !isBlank(cfg.getCustomAiBaseUrl()) ? trimTrailingSlashes(cfg.getCustomAiBaseUrl()) : trimTrailingSlashes(saved.getCustomAiBaseUrl());
                if (isBlank(baseUrl)) throw new IllegalStateException("Introduce primero la Base URL.");
                String key = !isBlank(cfg.getCustomAiApiKey()) ? cfg.getCustomAiApiKey().trim() : saved.getCustomAiApiKey().trim();
                Map<String, String> headers = isBlank(key) ? Map.of() : Map.of("Authorization", "Bearer " + key);
                JsonNode root = sendJson("GET", baseUrl + "/models", headers, null, 15);
                for (JsonNode m : root.path("data")) {
                    String id = m.path("id").asText("");
                    if (!id.isBlank()) models.add(Map.of("id", id, "label", id));
                }
            }
            default -> {
                // Sin API
            }
        }
        return models;
    }

    private String resolveModel(CampusConfig cfg, String provider) {
        if (!isBlank(cfg.getAiModel())) return cfg.getAiModel().trim();
        return switch (provider) {
            case "gemini" -> "gemini-flash-latest";
            case "openai" -> "gpt-4o-mini";
            case "anthropic" -> "claude-sonnet-4-0";
            case "ollama" -> !isBlank(cfg.getOllamaModel()) ? cfg.getOllamaModel().trim() : "llama3.2";
            case "custom_openai" -> !isBlank(cfg.getCustomAiModel()) ? cfg.getCustomAiModel().trim() : "local-model";
            default -> "";
        };
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    private static String trimTrailingSlashes(String s) {
        return s == null ? "" : s.trim().replaceAll("/+$", "");
    }

    /**
     * Genera un borrador JSON estructurado de asignatura completa (tutor, descripción, entregas y lecciones)
     * usando el motor de IA configurado por el usuario.
     */
    public Map<String, Object> autofillSubjectDraft(String rawText) throws IOException, InterruptedException {
        String rawResponse = transformWithConfiguredAi("autofill", rawText);
        String cleanJson = stripCodeFences(rawResponse.trim());
        JsonNode node = mapper.readTree(cleanJson);
        return mapper.convertValue(node, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
    }

    /**
     * Genera un plan de estudio personalizado a partir de las entregas próximas y colisiones del Radar.
     */
    @SuppressWarnings("unchecked")
    public String buildAiStudyPlan() throws IOException, InterruptedException {
        Map<String, Object> report = calendarAndCoachService.buildCoachReport();
        StringBuilder summary = new StringBuilder();
        summary.append("Fecha actual: ").append(report.get("generatedAt")).append("\n");
        for (String key : List.of("overdue", "urgent", "upcoming")) {
            List<Map<String, Object>> items = (List<Map<String, Object>>) report.getOrDefault(key, List.of());
            summary.append(key.toUpperCase()).append(":\n");
            for (Map<String, Object> item : items) {
                summary.append("- ").append(item.get("subjectTitle"))
                        .append(" | ").append(item.get("title"))
                        .append(" | Fecha: ").append(item.get("dueDate"))
                        .append(" (días: ").append(item.get("daysRemaining")).append(")\n");
            }
        }
        List<Map<String, Object>> collisions = (List<Map<String, Object>>) report.getOrDefault("collisions", List.of());
        if (!collisions.isEmpty()) {
            summary.append("COLISIONES EN EL MISMO DÍA:\n");
            for (Map<String, Object> c : collisions) {
                summary.append("- ").append(c.get("date")).append(": ").append(c.get("tasks")).append("\n");
            }
        }
        return transformWithConfiguredAi("study-plan", summary.toString());
    }

    public String testAiConnection() throws IOException, InterruptedException {
        return transformWithConfiguredAi("chat", "Responde únicamente con: Conexión OK con MiCampus.");
    }

    public String askWithCampusContext(String question) throws IOException, InterruptedException {
        return askWithCampusContext(question, List.of());
    }

    public String askWithCampusContext(String question, List<String> recentHistory) throws IOException, InterruptedException {
        String context = store.read(db -> {
            StringBuilder sb = new StringBuilder();
            sb.append("Fecha actual: ").append(java.time.LocalDate.now()).append("\n");
            sb.append("Estudiante: ").append(db.getConfig().getUserName()).append("\n\n");
            java.util.Map<String, String> subjectNames = new java.util.HashMap<>();
            sb.append("ASIGNATURAS:\n");
            db.getSubjects().forEach(s -> {
                subjectNames.put(s.getId(), s.getTitle());
                sb.append("- ").append(s.getTitle());
                if (!isBlank(s.getTeacher())) sb.append(" (Tutor: ").append(s.getTeacher()).append(")");
                sb.append("\n");
            });

            sb.append("\nENTREGAS PENDIENTES:\n");
            db.getTasks().stream()
                    .filter(t -> !"done".equalsIgnoreCase(t.getStatus()))
                    .forEach(t -> {
                        String sub = subjectNames.getOrDefault(t.getSubjectId(), "General");
                        sb.append("- [").append(sub).append("] ").append(t.getTitle())
                                .append(" | Fecha: ").append(isBlank(t.getDueDate()) ? "sin fecha" : t.getDueDate());
                        if (t.getWeight() > 0) sb.append(" | Peso: ").append(t.getWeight()).append("%");
                        sb.append("\n");
                    });

            sb.append("\nPUBLICACIÓN DE SOLUCIONES Y NOTAS (gradeDate):\n");
            db.getTasks().stream()
                    .filter(t -> !isBlank(t.getGradeDate()))
                    .forEach(t -> {
                        String sub = subjectNames.getOrDefault(t.getSubjectId(), "General");
                        sb.append("- [").append(sub).append("] ").append(t.getTitle())
                                .append(" | Publicación solución/nota: ").append(t.getGradeDate()).append("\n");
                    });

            if (!db.getLessons().isEmpty()) {
                sb.append("\nTEMARIO / LECCIONES (muestra):\n");
                db.getLessons().stream().limit(25).forEach(l -> {
                    String sub = subjectNames.getOrDefault(l.getSubjectId(), "General");
                    sb.append("- [").append(sub).append("] ").append(l.getUnit()).append(": ").append(l.getTitle()).append("\n");
                });
            }
            return sb.toString();
        });

        StringBuilder fullPrompt = new StringBuilder();
        CampusConfig cfg = store.read(db -> db.getConfig());
        String callMe = !isBlank(cfg.getBotCallMe()) ? cfg.getBotCallMe().trim() : cfg.getUserName();
        String soul = resolveSoulMarkdown(cfg);
        fullPrompt.append("LLAMA AL USUARIO: ").append(callMe).append("\n");
        if (!isBlank(soul)) {
            fullPrompt.append("SOUL.md (TU IDENTIDAD Y FORMA DE TRATAR AL USUARIO):\n").append(soul).append("\n\n");
        }
        if (!isBlank(cfg.getTelegramBotPrompt())) {
            fullPrompt.append("INSTRUCCIÓN EXTRA DEL USUARIO:\n").append(cfg.getTelegramBotPrompt().trim()).append("\n\n");
        }
        fullPrompt.append("CONTEXTO ACTUAL DEL CAMPUS:\n").append(context);
        if (recentHistory != null && !recentHistory.isEmpty()) {
            fullPrompt.append("\nHISTORIAL RECIENTE DEL CHAT:\n");
            for (String turn : recentHistory) {
                fullPrompt.append(turn).append("\n");
            }
        }
        fullPrompt.append("\nMENSAJE ACTUAL DEL USUARIO:\n").append(question);
        return transformWithConfiguredAi("chat", fullPrompt.toString());
    }

    private String resolveSoulMarkdown(CampusConfig cfg) {
        if (cfg != null && !isBlank(cfg.getBotSoulMarkdown())) {
            return cfg.getBotSoulMarkdown().trim();
        }
        String profile = cfg != null && cfg.getBotSoulProfile() != null ? cfg.getBotSoulProfile().trim().toLowerCase() : "default";
        return switch (profile) {
            case "tdah" -> """
                    # SOUL: Modo TDAH / Despiste Cero
                    - Respuestas muy cortas, visuales y con viñetas claras (máx 4-5 líneas por bloque).
                    - Propón UN único micro-paso accionable para empezar ahora ("solo 5 minutos").
                    - Nunca regañes ni generes culpa por retrasos; enfócate en el siguiente paso fácil.
                    """;
            case "neurodivergent" -> """
                    # SOUL: Modo Neurodivergente / Baja Sobrecarga
                    - Comunicación literal, directa, predecible y tranquila (sin sarcasmo ni ambigüedades).
                    - Cero presión emocional; pasos numerados 1, 2, 3.
                    - Cuando haya opciones, da 2 alternativas concretas en lugar de preguntas abiertas agotadoras.
                    """;
            case "strict_coach" -> """
                    # SOUL: Coach Exigente
                    - Directo, estratégico y orientado a nota.
                    - Prioriza siempre las entregas por fecha y peso % en la evaluación, y avisa de colisiones.
                    """;
            case "supportive" -> """
                    # SOUL: Mentor Empático / Anti-Agobio
                    - Tono cálido, calmado y alentador. Divide tareas grandes en trozos pequeños y manejables.
                    """;
            case "minimalist" -> """
                    # SOUL: Ultra Minimalista
                    - Máxima brevedad: solo datos, fechas y acción en viñetas secas. Cero relleno.
                    """;
            default -> """
                    # SOUL: Sensei Equilibrado
                    - Asistente académico claro, cercano y práctico en español.
                    """;
        };
    }

    private String callOpenAiCompatible(String baseUrl, String apiKey, String model, IntensityProfile intensity, String prompt) throws IOException, InterruptedException {
        Map<String, String> headers = isBlank(apiKey) ? Map.of() : Map.of("Authorization", "Bearer " + apiKey);
        JsonNode root = sendJson("POST", baseUrl + "/chat/completions", headers, Map.of(
                "model", model,
                "temperature", intensity.temperature(),
                "max_tokens", intensity.maxTokens(),
                "messages", List.of(Map.of("role", "user", "content", prompt))
        ), 60);
        return root.path("choices").path(0).path("message").path("content").asText("");
    }

    private String callAnthropic(String apiKey, String model, IntensityProfile intensity, String prompt) throws IOException, InterruptedException {
        JsonNode root = sendJson("POST", "https://api.anthropic.com/v1/messages", Map.of(
                "x-api-key", apiKey,
                "anthropic-version", "2023-06-01"
        ), Map.of(
                "model", model,
                "temperature", intensity.temperature(),
                "max_tokens", intensity.maxTokens(),
                "messages", List.of(Map.of("role", "user", "content", prompt))
        ), 60);
        return root.path("content").path(0).path("text").asText("");
    }

    private String callGemini(String apiKey, String preferredModel, IntensityProfile intensity, String prompt) throws IOException, InterruptedException {
        java.util.LinkedHashSet<String> candidates = new java.util.LinkedHashSet<>();
        if (!isBlank(preferredModel)) candidates.add(preferredModel.trim());
        candidates.add("gemini-4-carbon");
        candidates.add("gemini-4-argon");
        candidates.add("gemini-3.5-flash");
        candidates.add("gemini-3.5-flash-lite");
        candidates.add("gemini-3-flash-preview");
        candidates.add("gemini-3.1-flash-lite");
        candidates.add("gemini-2.5-flash");
        candidates.add("gemini-2.5-flash-lite");
        candidates.add("gemini-flash-latest");
        candidates.add("gemini-flash-lite-latest");
        candidates.add("gemma-4-26b-a4b-it");
        candidates.add("gemini-3.1-pro-preview");

        Object payload = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of(
                        "temperature", intensity.temperature(),
                        "maxOutputTokens", intensity.maxTokens()
                )
        );
        IOException lastError = null;
        for (String model : candidates) {
            try {
                JsonNode root = sendJson("POST",
                        "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey,
                        Map.of(), payload, 60);
                return root.path("candidates").path(0).path("content").path("parts").path(0).path("text").asText("");
            } catch (IOException ex) {
                lastError = ex;
                String msg = ex.getMessage() != null ? ex.getMessage() : "";
                if (!msg.contains("(503)") && !msg.contains("(429)") && !msg.contains("(404)")) {
                    throw ex;
                }
            }
        }
        throw lastError != null ? lastError : new IOException("No se pudo conectar con Gemini.");
    }

    private String callOllama(String baseUrl, String model, IntensityProfile intensity, String prompt) throws IOException, InterruptedException {
        JsonNode root = sendJson("POST", baseUrl + "/api/generate", Map.of(), Map.of(
                "model", model,
                "prompt", prompt,
                "stream", false,
                "options", Map.of(
                        "temperature", intensity.temperature(),
                        "num_predict", intensity.maxTokens()
                )
        ), 120);
        return root.path("response").asText("");
    }

    private JsonNode sendJson(String method, String url, Map<String, String> headers, Object body, int timeoutSeconds)
            throws IOException, InterruptedException {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(timeoutSeconds));
        headers.forEach(builder::header);
        if ("POST".equalsIgnoreCase(method)) {
            builder.header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body)));
        } else {
            builder.GET();
        }
        HttpResponse<String> res = httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() >= 400) {
            throw new IOException("Error IA (" + res.statusCode() + "): " + res.body());
        }
        return mapper.readTree(res.body());
    }

    private String buildPrompt(String mode) {
        if ("chat".equalsIgnoreCase(mode)) {
            return "Eres el asistente personal de MiCampus. Responde de forma clara, breve y útil en español.";
        }
        if ("study-plan".equalsIgnoreCase(mode)) {
            return """
                    Eres un coach académico. Con la lista de entregas pendientes, urgentes y colisiones,
                    crea un plan de estudio práctico en Markdown (breve, con viñetas por día y prioridades claras)
                    para llegar a tiempo sin agobios.
                    """;
        }
        if ("autofill".equalsIgnoreCase(mode)) {
            return """
                    Eres un asistente académico. A partir de la guía docente, apuntes o descripción que te paso,
                    devuelve ÚNICAMENTE un JSON válido (sin texto adicional ni markdown) con esta estructura exacta:
                    {
                      "teacher": "Nombre y apellidos del tutor/a si aparece, o cadena vacía",
                      "description": "Descripción breve de la asignatura",
                      "icon": "Un único emoji representativo",
                      "tasks": [
                        { "title": "Nombre entrega/evento", "dueDate": "YYYY-MM-DD", "weight": 25, "description": "Notas breves" }
                      ],
                      "lessons": [
                        { "unit": "Bloque 1", "title": "Título de lección", "content": "Contenido en Markdown con ### subsecciones" }
                      ]
                    }
                    """;
        }
        if ("ics".equalsIgnoreCase(mode)) {
            return """
                    Refactoriza el siguiente calendario .ics para dejarlo limpio:
                    1. Elimina eventos repetidos o duplicados y quédate solo con fechas clave reales (inicios, entregas, exámenes, tutorías).
                    2. Devuelve ÚNICAMENTE un archivo .ics válido (empezando por BEGIN:VCALENDAR y terminando por END:VCALENDAR).
                    3. Limpia etiquetas HTML de DESCRIPTION y mantén SUMMARY claro.
                    """;
        }
        return """
                Transforma este material PDF / apuntes en un único archivo Markdown (.md) completo y listo para importar como Libro interactivo de MiCampus:
                1. **Fidelidad de extensión y contenido (NO resumas):** mantén aproximadamente la misma cantidad de palabras y profundidad técnica que el material original. No recortes apartados, comandos, rutas, tablas comparativas ni ejemplos prácticos.
                2. **Pulido didáctico y pedagógico:** redacta en español claro y cercano; añade de vez en cuando una analogía práctica (`> 💡 **Analogía:** ...`) para explicar conceptos complejos y un mapa conceptual o diagrama (` ```mermaid ` o diagrama de flujo ASCII) cuando ayude a visualizar la arquitectura.
                3. **Jerarquía exacta de MiCampus:**
                   - Usa `# ` para grandes bloques/unidades.
                   - Usa `## ` para cada lección dentro del bloque (sin números manuales ni repetir títulos).
                   - Usa `### ` para subsecciones internas (sin números manuales: la web los numera automáticamente).
                   - En lecciones de Introducción, evita saludos tipo "Bienvenido a la Unidad..." o "Visión general del bloque" y pasa directo al resumen de contenidos.
                4. Incluye bloques de código con lenguaje explícito (`bash`, `apache`, `xml`, `yaml`, `java`, `sql`, etc.) y comentarios `#` breves.
                5. Al final de cada lección incluye 1 o 2 preguntas usando EXACTAMENTE:
                Pregunta: ¿...?
                Respuesta: ...
                Devuelve ÚNICAMENTE el Markdown sin explicaciones previas.
                """;
    }

    private String stripCodeFences(String text) {
        if (text.startsWith("```")) {
            int firstNl = text.indexOf('\n');
            int lastFence = text.lastIndexOf("```");
            if (firstNl > 0 && lastFence > firstNl) {
                return text.substring(firstNl + 1, lastFence).trim();
            }
        }
        return text;
    }
}
