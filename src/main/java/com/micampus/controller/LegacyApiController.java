package com.micampus.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.micampus.config.StorageProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
public class LegacyApiController {

    private static final Set<String> ALLOWED_EXTS = Set.of(
            ".pdf", ".zip", ".odt", ".docx", ".png", ".jpg", ".jpeg", ".txt", ".md"
    );
    private static final DateTimeFormatter TS_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final ObjectMapper mapper;
    private final Path dataDir;
    private final Path publicDir;
    private final Path progressFile;
    private final Object lock = new Object();

    public LegacyApiController(StorageProperties props) {
        this.mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
        this.dataDir = Paths.get(props.getDataDir()).toAbsolutePath().normalize();
        this.publicDir = Paths.get(props.getPublicDir()).toAbsolutePath().normalize();
        this.progressFile = this.dataDir.resolve("legacy-progress.json");
    }

    // --- Progress & Persistence ---

    @GetMapping("/progress")
    public ResponseEntity<Map<String, Object>> getAllProgress() {
        synchronized (lock) {
            LegacyStore store = readStore();
            return ResponseEntity.ok(store.progress);
        }
    }

    @GetMapping("/progress/category/{category}")
    public ResponseEntity<List<Map<String, Object>>> getProgressByCategory(@PathVariable String category) {
        synchronized (lock) {
            LegacyStore store = readStore();
            List<Map<String, Object>> items = new ArrayList<>();
            store.progress.entrySet().stream()
                    .sorted(Map.Entry.comparingByKey())
                    .forEach(entry -> {
                        if (entry.getValue() instanceof Map<?, ?> map && category.equals(map.get("category"))) {
                            Map<String, Object> item = new LinkedHashMap<>();
                            item.put("key", entry.getKey());
                            item.put("category", map.get("category"));
                            item.put("value", map.get("value"));
                            item.put("updatedAt", map.get("updatedAt"));
                            items.add(item);
                        }
                    });
            return ResponseEntity.ok(items);
        }
    }

    @GetMapping("/progress/{key}")
    public ResponseEntity<?> getProgress(@PathVariable String key) {
        synchronized (lock) {
            LegacyStore store = readStore();
            Object entry = store.progress.get(key);
            if (!(entry instanceof Map<?, ?> map)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Clave no encontrada"));
            }
            Map<String, Object> result = new LinkedHashMap<>();
            result.put("key", key);
            result.put("category", map.get("category"));
            result.put("value", map.get("value"));
            result.put("updatedAt", map.get("updatedAt"));
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping("/progress/{key}")
    public ResponseEntity<?> setProgress(@PathVariable String key, @RequestBody Map<String, Object> body) {
        if (!body.containsKey("value")) {
            return ResponseEntity.badRequest().body(Map.of("error", "El valor es requerido"));
        }
        String category = body.get("category") instanceof String s && !s.isBlank() ? s : "general";
        Object value = body.get("value");
        String now = LocalDateTime.now().format(TS_FORMAT);

        Map<String, Object> stored = new LinkedHashMap<>();
        stored.put("category", category);
        stored.put("value", value);
        stored.put("updatedAt", now);

        synchronized (lock) {
            LegacyStore store = readStore();
            store.progress.put(key, stored);
            writeStore(store);
        }

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("key", key);
        data.put("category", category);
        data.put("value", value);
        data.put("updatedAt", Instant.now().toString());
        return ResponseEntity.ok(Map.of("message", "Progreso guardado", "data", data));
    }

    @DeleteMapping("/progress/{key}")
    public ResponseEntity<Map<String, Object>> deleteProgress(@PathVariable String key) {
        boolean removed;
        synchronized (lock) {
            LegacyStore store = readStore();
            removed = store.progress.remove(key) != null;
            if (removed) {
                writeStore(store);
            }
        }
        return ResponseEntity.ok(Map.of("success", removed));
    }

    @PostMapping("/progress-bulk")
    public ResponseEntity<?> bulkSetProgress(@RequestBody Map<String, Object> body) {
        Object itemsObj = body.get("items");
        if (!(itemsObj instanceof List<?> items)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Se esperaba un array de items"));
        }
        String now = LocalDateTime.now().format(TS_FORMAT);
        int count = 0;
        synchronized (lock) {
            LegacyStore store = readStore();
            for (Object obj : items) {
                if (obj instanceof Map<?, ?> item && item.get("key") instanceof String key) {
                    String category = item.get("category") instanceof String s && !s.isBlank() ? s : "general";
                    Map<String, Object> stored = new LinkedHashMap<>();
                    stored.put("category", category);
                    stored.put("value", item.get("value"));
                    stored.put("updatedAt", now);
                    store.progress.put(key, stored);
                    count++;
                }
            }
            writeStore(store);
        }
        return ResponseEntity.ok(Map.of("message", count + " claves guardadas correctamente", "count", count));
    }

    // --- EAC Evaluations ---

    @PostMapping("/eac/evaluation")
    public ResponseEntity<?> saveEacEvaluation(@RequestBody Map<String, Object> body) {
        String subjectId = asString(body.get("subjectId"));
        String eacId = asString(body.get("eacId"));
        if (subjectId == null || eacId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "subjectId y eacId requeridos"));
        }
        Map<String, Object> eval = new LinkedHashMap<>();
        eval.put("id", System.currentTimeMillis());
        eval.put("subjectId", subjectId);
        eval.put("eacId", eacId);
        eval.put("score", body.get("score"));
        eval.put("answers", body.getOrDefault("answers", Map.of()));
        eval.put("completedAt", LocalDateTime.now().format(TS_FORMAT));

        synchronized (lock) {
            LegacyStore store = readStore();
            store.evaluations.add(0, eval);
            writeStore(store);
        }
        return ResponseEntity.ok(Map.of("message", "Evaluación registrada", "data", eval));
    }

    @GetMapping("/eac/evaluations/{subjectId}")
    public ResponseEntity<List<Map<String, Object>>> getEacEvaluations(@PathVariable String subjectId) {
        synchronized (lock) {
            LegacyStore store = readStore();
            List<Map<String, Object>> matching = store.evaluations.stream()
                    .filter(e -> subjectId.equals(e.get("subjectId")))
                    .toList();
            return ResponseEntity.ok(matching);
        }
    }

    @GetMapping("/backup/export")
    public ResponseEntity<byte[]> exportBackup() throws IOException {
        Map<String, Object> backup = new LinkedHashMap<>();
        synchronized (lock) {
            LegacyStore store = readStore();
            List<Map<String, Object>> progressList = new ArrayList<>();
            store.progress.forEach((k, v) -> {
                if (v instanceof Map<?, ?> map) {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("key", k);
                    item.put("category", map.get("category"));
                    item.put("value", map.get("value"));
                    item.put("updated_at", map.get("updatedAt"));
                    progressList.add(item);
                }
            });
            backup.put("app", "MiCampus");
            backup.put("version", "2.1.0");
            backup.put("exportedAt", Instant.now().toString());
            backup.put("progress", progressList);
            backup.put("evaluations", store.evaluations);
        }
        byte[] json = mapper.writeValueAsBytes(backup);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"micampus_backup_" + System.currentTimeMillis() + ".json\"")
                .contentType(MediaType.APPLICATION_JSON)
                .body(json);
    }

    // --- EAC Status & Calendar ---

    @PutMapping("/eac/status")
    public ResponseEntity<?> updateEacStatus(@RequestBody Map<String, Object> body) {
        String subjectId = asString(body.get("subjectId"));
        String eacId = asString(body.get("eacId"));
        String status = asString(body.get("status"));
        if (subjectId == null || eacId == null || status == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Faltan parámetros"));
        }

        Path subjectsDir = publicDir.resolve("data/ioc/gestion").normalize();
        Path filePath = subjectsDir.resolve(subjectId + ".json").normalize();
        if (!filePath.startsWith(subjectsDir) || !Files.isRegularFile(filePath)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Asignatura no encontrada"));
        }

        try {
            Map<String, Object> data = mapper.readValue(filePath.toFile(), new TypeReference<>() {});
            Object eacsObj = data.get("eacs");
            if (!(eacsObj instanceof List<?> rawList)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "EAC no encontrada"));
            }

            boolean found = false;
            int total = 0;
            int done = 0;
            for (Object item : rawList) {
                if (item instanceof Map<?, ?> rawMap) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> eac = (Map<String, Object>) rawMap;
                    total++;
                    if (eacId.equals(eac.get("id"))) {
                        eac.put("status", status);
                        found = true;
                    }
                    if ("done".equals(eac.get("status"))) {
                        done++;
                    }
                }
            }
            if (!found) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "EAC no encontrada"));
            }

            int progress = total > 0 ? (int) Math.round((done * 100.0) / total) : 0;
            data.put("progress", progress);
            mapper.writeValue(filePath.toFile(), data);
            regenerateCalendar(subjectsDir);

            return ResponseEntity.ok(Map.of(
                    "message", "Estado actualizado y calendario regenerado",
                    "progress", progress
            ));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error actualizando estado: " + e.getMessage()));
        }
    }

    // --- File Upload ---

    @PostMapping("/upload/{subjectId}")
    public ResponseEntity<?> uploadSubjectFile(@PathVariable String subjectId,
                                               @RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded"));
        }
        String originalName = file.getOriginalFilename() != null ? Paths.get(file.getOriginalFilename()).getFileName().toString() : "archivo";
        int dot = originalName.lastIndexOf('.');
        String ext = dot >= 0 ? originalName.substring(dot).toLowerCase() : "";
        if (!ALLOWED_EXTS.contains(ext)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Tipo de archivo no permitido (" + ext + ")"));
        }

        Path uploadsRoot = publicDir.resolve("uploads/ioc").normalize();
        Path subjectDir = uploadsRoot.resolve(subjectId).normalize();
        if (!subjectDir.startsWith(uploadsRoot)) {
            return ResponseEntity.badRequest().body(Map.of("error", "subjectId inválido"));
        }

        try {
            Files.createDirectories(subjectDir);
            String filename = System.currentTimeMillis() + "-" + originalName;
            Path dest = subjectDir.resolve(filename);
            file.transferTo(dest);
            return ResponseEntity.ok(Map.of("message", "Archivo subido correctamente", "filename", filename));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al guardar archivo: " + e.getMessage()));
        }
    }

    // --- Open Folder ---

    @GetMapping("/open-folder")
    public ResponseEntity<Map<String, Object>> openFolder(@RequestParam(value = "path", required = false) String requested) {
        String target = (requested == null || requested.isBlank()) ? "public/eacs" : requested.trim();
        if (target.contains("\0")) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "error", "Ruta inválida"));
        }
        String relativeToPublic = target.startsWith("public/") ? target.substring("public/".length()) : target;
        if ("public".equals(relativeToPublic)) {
            relativeToPublic = "";
        }

        Path resolved = publicDir.resolve(relativeToPublic).normalize();
        if (!resolved.startsWith(publicDir)) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "error", "La carpeta debe estar dentro del proyecto"));
        }
        if (!Files.isDirectory(resolved)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("ok", false, "error", "La carpeta no existe", "path", resolved.toString()));
        }

        try {
            String os = System.getProperty("os.name").toLowerCase();
            String opener = os.contains("mac") ? "open" : (os.contains("win") ? "explorer" : "xdg-open");
            new ProcessBuilder(opener, resolved.toString()).start();
            return ResponseEntity.ok(Map.of("ok", true, "path", resolved.toString()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "error", e.getMessage()));
        }
    }

    // --- SEPE Tutor Chat ---

    @PostMapping("/sepe/tutor-chat")
    public ResponseEntity<Map<String, Object>> sepeTutorChat(@RequestBody Map<String, Object> body) {
        String message = asString(body.get("message"));
        if (message == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mensaje requerido"));
        }

        try {
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("model", "qwen2.5-coder:7b");
            payload.put("system", "Eres el Profesor Tutor Oficial del curso SEPE 'MF0492_3: Programación Web en el Entorno Servidor' (PHP & SQL). Responde de forma clara, pedagógica y concisa en español.");
            payload.put("prompt", message);
            payload.put("stream", false);

            HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(3)).build();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://127.0.0.1:11434/api/generate"))
                    .timeout(Duration.ofSeconds(12))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(payload)))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                Map<String, Object> ollamaData = mapper.readValue(response.body(), new TypeReference<>() {});
                Object reply = ollamaData.get("response");
                if (reply instanceof String s && !s.isBlank()) {
                    return ResponseEntity.ok(Map.of("reply", s));
                }
            }
        } catch (Exception ignored) {
            // Fallback local sin Ollama
        }

        return ResponseEntity.ok(Map.of(
                "reply",
                "¡Muy buena pregunta, Blanca! Ten siempre presente conectar este concepto con la arquitectura global de servidor: cómo se comunican cliente y servidor, cómo se protegen los datos contra ataques y cómo estructurar el código en capas limpias."
        ));
    }

    // --- Helpers ---

    private void regenerateCalendar(Path subjectsDir) throws IOException {
        StringBuilder ics = new StringBuilder("BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MiCampus//NONSGML v1.0//EN\r\n");
        if (Files.isDirectory(subjectsDir)) {
            try (Stream<Path> files = Files.list(subjectsDir)) {
                List<Path> jsonFiles = files.filter(p -> p.toString().endsWith(".json")).toList();
                for (Path p : jsonFiles) {
                    Map<String, Object> data = mapper.readValue(p.toFile(), new TypeReference<>() {});
                    String id = String.valueOf(data.getOrDefault("id", ""));
                    String title = String.valueOf(data.getOrDefault("title", id));
                    String subjectUpper = id.toUpperCase();
                    if (data.get("eacs") instanceof List<?> eacs) {
                        for (Object obj : eacs) {
                            if (obj instanceof Map<?, ?> eac
                                    && "pending".equals(eac.get("status"))
                                    && eac.get("dueDate") instanceof String dueDate
                                    && !dueDate.isBlank()) {
                                String dateStr = dueDate.replace("-", "");
                                ics.append("BEGIN:VEVENT\r\n")
                                        .append("UID:").append(eac.get("id")).append("-").append(id).append("@micampus.local\r\n")
                                        .append("DTSTAMP:20261006T000000Z\r\n")
                                        .append("DTSTART;VALUE=DATE:").append(dateStr).append("\r\n")
                                        .append("SUMMARY:Entrega ").append(eac.get("title")).append(" [").append(subjectUpper).append("]\r\n")
                                        .append("DESCRIPTION:Entrega pendiente de la asignatura ").append(title).append("\r\n")
                                        .append("STATUS:CONFIRMED\r\n")
                                        .append("BEGIN:VALARM\r\nTRIGGER:-P2D\r\nACTION:DISPLAY\r\n")
                                        .append("DESCRIPTION:Recordatorio de entrega de ").append(subjectUpper).append("\r\n")
                                        .append("END:VALARM\r\nEND:VEVENT\r\n");
                            }
                        }
                    }
                }
            }
        }
        ics.append("END:VCALENDAR\r\n");
        Path calDir = publicDir.resolve("data/calendars/exports");
        Files.createDirectories(calDir);
        Files.writeString(calDir.resolve("todo.ics"), ics.toString(), StandardCharsets.UTF_8);
    }

    private LegacyStore readStore() {
        try {
            if (Files.isRegularFile(progressFile)) {
                return mapper.readValue(progressFile.toFile(), LegacyStore.class);
            }
        } catch (IOException ignored) {
        }
        return new LegacyStore();
    }

    private void writeStore(LegacyStore store) {
        try {
            Files.createDirectories(dataDir);
            mapper.writeValue(progressFile.toFile(), store);
        } catch (IOException e) {
            throw new RuntimeException("Error guardando legacy-progress.json", e);
        }
    }

    private String asString(Object obj) {
        return obj instanceof String s && !s.isBlank() ? s : null;
    }

    public static class LegacyStore {
        public Map<String, Object> progress = new LinkedHashMap<>();
        public List<Map<String, Object>> evaluations = new ArrayList<>();
    }
}
