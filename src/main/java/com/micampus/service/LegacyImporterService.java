package com.micampus.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.model.SubjectGroup;
import com.micampus.model.TaskItem;
import com.micampus.repository.CampusStore;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Importador de datos desde la versión clásica de MiCampus (public/data).
 */
@Service
public class LegacyImporterService {

    private final CampusStore store;
    private final ObjectMapper mapper = new ObjectMapper();

    private record ExtraBookSpec(
            String fileName,
            String code,
            String title,
            String description,
            String color,
            String icon,
            String category
    ) {}

    private static final List<ExtraBookSpec> SPRING_BOOKS = List.of(
            new ExtraBookSpec("springboot_petete.json", "sb-petete", "Petete Spring Boot",
                    "Libro completo de Spring Boot, JPA, REST y arquitectura", "#10b981", "🍃", "Java & Spring"),
            new ExtraBookSpec("springboot_guia.json", "sb-guia", "Guía Spring Boot",
                    "Guía práctica de instalación, estructura y despliegue", "#059669", "📘", "Java & Spring"),
            new ExtraBookSpec("springboot_tutorias_codigo.json", "sb-codigo", "Código Tutorías Spring Boot",
                    "Ejemplos de código de las 15 tutorías de Spring Boot", "#0d9488", "💻", "Java & Spring"),
            new ExtraBookSpec("accenture_videos_teoria.json", "acc-teoria", "Teoría Java & Spring",
                    "Vídeos y apuntes teóricos del bootcamp Java", "#8b5cf6", "🎥", "Java & Spring"),
            new ExtraBookSpec("accenture_actividades_curso.json", "acc-acts", "Actividades TaskManager",
                    "Retos guiados paso a paso del proyecto TaskManager", "#6366f1", "🛠️", "Java & Spring")
    );

    private static final List<ExtraBookSpec> SEPE_BOOKS = List.of(
            new ExtraBookSpec("php_sql_course.json", "sepe-php", "PHP & SQL (SEPE)",
                    "Curso completo de programación web en entorno servidor", "#f59e0b", "🐘", "SEPE"),
            new ExtraBookSpec("ifcd0177_curso.json", "ifcd0177", "IFCD0177 · Programación",
                    "Temario y prácticas del certificado IFCD0177", "#ec4899", "💻", "SEPE"),
            new ExtraBookSpec("python_basics.json", "python", "Python Básico",
                    "Fundamentos de Python y automatización", "#3b82f6", "🐍", "SEPE")
    );

    public LegacyImporterService(CampusStore store) {
        this.store = store;
    }

    public Map<String, Object> importFromClassicMiCampus(String dataPathStr) throws IOException {
        Path dataDir = Paths.get(dataPathStr).toAbsolutePath().normalize();
        if (!Files.isDirectory(dataDir)) {
            throw new IOException("No se encontró la carpeta de datos: " + dataDir);
        }

        int[] counters = new int[3]; // [subjectsAdded, tasksAdded, lessonsAdded]

        // 1. IOC DAW (gestion + lecciones)
        String iocGroupId = ensureGroup("IOC DAW", "Módulos oficiales del ciclo DAW", "#2563eb", "🎓");
        Path gestionDir = dataDir.resolve("ioc").resolve("gestion");
        Map<String, String> codeToSubjectId = new HashMap<>();

        if (Files.isDirectory(gestionDir)) {
            try (var files = Files.list(gestionDir)) {
                for (Path p : files.filter(f -> f.toString().endsWith(".json")).sorted().toList()) {
                    JsonNode root = mapper.readTree(p.toFile());
                    String code = root.path("id").asText(p.getFileName().toString().replace(".json", "")).toLowerCase();
                    String title = root.path("title").asText(code.toUpperCase());

                    String subId = ensureSubject(
                            code,
                            title,
                            "Asignatura importada desde MiCampus clásico",
                            pickColor(code),
                            pickIcon(code),
                            "IOC",
                            iocGroupId,
                            counters
                    );
                    codeToSubjectId.put(code, subId);

                    JsonNode eacs = root.path("eacs");
                    if (eacs.isArray()) {
                        Map<String, String[]> iocDates = loadIocDatesFromIcs(dataDir.resolve("calendars").resolve("source").resolve("ioc"), code);
                        for (JsonNode eac : eacs) {
                            String taskTitle = eac.path("title").asText("Entrega");
                            String eacId = eac.path("id").asText("").toLowerCase();
                            String[] openGrade = resolveIocOpenGradeDates(iocDates, eacId, taskTitle);
                            boolean exists = store.read(db -> db.getTasks().stream()
                                    .anyMatch(t -> subId.equals(t.getSubjectId()) && taskTitle.equalsIgnoreCase(t.getTitle())));
                            if (!exists) {
                                TaskItem task = new TaskItem();
                                task.setId(shortId());
                                task.setSubjectId(subId);
                                task.setTitle(taskTitle);
                                task.setDueDate(eac.path("dueDate").asText(""));
                                task.setOpenDate(openGrade[0]);
                                task.setGradeDate(openGrade[1]);
                                task.setStatus(eac.path("status").asText("pending"));
                                task.setDescription(eac.path("description").asText(""));
                                store.write(db -> db.getTasks().add(task));
                                counters[1]++;
                            }
                        }
                    }
                }
            }
        }

        Path leccionesDir = dataDir.resolve("ioc").resolve("lecciones");
        if (Files.isDirectory(leccionesDir)) {
            try (var files = Files.list(leccionesDir)) {
                for (Path p : files.filter(f -> f.toString().endsWith(".json")).sorted().toList()) {
                    String filename = p.getFileName().toString().toLowerCase();
                    String matchedSubId = matchSubjectId(filename, codeToSubjectId);
                    if (matchedSubId == null) {
                        String fallbackCode = filename.replace("_curso.json", "").replace(".json", "");
                        matchedSubId = ensureSubject(
                                fallbackCode,
                                capitalize(fallbackCode),
                                "Asignatura IOC",
                                pickColor(fallbackCode),
                                pickIcon(fallbackCode),
                                "IOC",
                                iocGroupId,
                                counters
                        );
                    }
                    counters[2] += importLessonsFromJson(p, matchedSubId);
                }
            }
        }

        // 2. Libros extra (Java & Spring Boot, SEPE & Python)
        Path extraDir = dataDir.resolve("extra");
        if (Files.isDirectory(extraDir)) {
            String springGroupId = ensureGroup("Java & Spring Studio", "Bootcamp, guías y libro Petete", "#10b981", "☕");
            importBookGroup(extraDir, SPRING_BOOKS, springGroupId, counters);

            String sepeGroupId = ensureGroup("SEPE & Desarrollo Web", "PHP, SQL, IFCD0177 y Python", "#f59e0b", "🐘");
            importBookGroup(extraDir, SEPE_BOOKS, sepeGroupId, counters);
        }

        // 3. Second Brain (pilares)
        Path brainDir = dataDir.resolve("brain").resolve("lecciones");
        if (Files.isDirectory(brainDir)) {
            String brainGroupId = ensureGroup("Second Brain", "Matriz de conocimientos técnicos", "#8b5cf6", "🧠");
            try (var files = Files.list(brainDir)) {
                for (Path p : files.filter(f -> f.toString().endsWith(".json")).sorted().toList()) {
                    String baseName = p.getFileName().toString().replace(".json", "");
                    String niceTitle = capitalize(baseName.replace("-", " "));
                    String subId = ensureSubject(
                            baseName,
                            niceTitle,
                            "Pilar de conocimiento Second Brain",
                            "#8b5cf6",
                            "🧠",
                            "Second Brain",
                            brainGroupId,
                            counters
                    );
                    counters[2] += importLessonsFromJson(p, subId);
                }
            }
        }

        // 4. Tareas/entregas reales (tasks.json) sin mezclar eventos diarios de .ics
        counters[1] += importTasksJson(dataDir.resolve("tasks.json"));

        return Map.of(
                "subjectsAdded", counters[0],
                "tasksAdded", counters[1],
                "lessonsAdded", counters[2]
        );
    }

    private void importBookGroup(Path extraDir, List<ExtraBookSpec> specs, String groupId, int[] counters) throws IOException {
        for (ExtraBookSpec spec : specs) {
            Path file = extraDir.resolve(spec.fileName());
            if (!Files.isRegularFile(file)) continue;
            String subId = ensureSubject(
                    spec.code(),
                    spec.title(),
                    spec.description(),
                    spec.color(),
                    spec.icon(),
                    spec.category(),
                    groupId,
                    counters
            );
            counters[2] += importLessonsFromJson(file, subId);
        }
    }

    private int importLessonsFromJson(Path jsonFile, String subjectId) throws IOException {
        JsonNode root = mapper.readTree(jsonFile.toFile());
        int added = 0;

        if (root.isArray()) {
            // Formato plano clásico de MiCampus: [{ moduleTitle, moduleShort, title, contentMd, ... }]
            int idx = 1;
            for (JsonNode item : root) {
                if (item.has("lessons") && item.get("lessons").isArray()) {
                    String unitName = item.path("title").asText("Unidad " + idx);
                    for (JsonNode lNode : item.get("lessons")) {
                        if (addLessonIfMissing(subjectId, unitName, lNode, idx)) {
                            added++;
                        }
                        idx++;
                    }
                } else {
                    String unitName = firstNonBlank(
                            item.path("moduleTitle").asText(""),
                            item.path("moduleShort").asText(""),
                            item.path("temaTitle").asText(""),
                            "Bloque 1"
                    );
                    if (addLessonIfMissing(subjectId, unitName, item, idx)) {
                        added++;
                    }
                    idx++;
                }
            }
        } else if (root.has("units") && root.get("units").isArray()) {
            int idx = 1;
            for (JsonNode unit : root.get("units")) {
                String unitName = unit.path("title").asText("Unidad");
                JsonNode lessons = unit.path("lessons");
                if (lessons.isArray()) {
                    for (JsonNode lNode : lessons) {
                        if (addLessonIfMissing(subjectId, unitName, lNode, idx)) {
                            added++;
                        }
                        idx++;
                    }
                }
            }
        }
        return added;
    }

    private boolean addLessonIfMissing(String subjectId, String unitName, JsonNode lNode, int orderIndex) {
        String title = lNode.path("title").asText("Lección " + orderIndex).trim();
        String content = firstNonBlank(
                lNode.path("contentMd").asText(""),
                lNode.path("content").asText(""),
                lNode.path("contentHtml").asText(""),
                lNode.path("summary").asText("")
        );
        if (title.isBlank() && content.isBlank()) return false;

        boolean exists = store.read(db -> db.getLessons().stream()
                .anyMatch(l -> subjectId.equals(l.getSubjectId())
                        && unitName.equalsIgnoreCase(l.getUnit())
                        && title.equalsIgnoreCase(l.getTitle())));
        if (exists) return false;

        Lesson lesson = new Lesson();
        lesson.setId(shortId());
        lesson.setSubjectId(subjectId);
        lesson.setUnit(unitName);
        lesson.setTitle(title);
        lesson.setContent(content);
        lesson.setSummary(lNode.path("summary").asText(""));
        lesson.setAudioUrl(lNode.path("audioUrl").asText(""));
        lesson.setOrderIndex(orderIndex);
        store.write(db -> db.getLessons().add(lesson));
        return true;
    }

    private String ensureGroup(String title, String subtitle, String color, String icon) {
        String existingId = store.read(db -> db.getGroups().stream()
                .filter(g -> title.equalsIgnoreCase(g.getTitle()))
                .map(SubjectGroup::getId)
                .findFirst()
                .orElse(null));
        if (existingId != null) return existingId;

        SubjectGroup group = new SubjectGroup();
        group.setId(shortId());
        group.setTitle(title);
        group.setSubtitle(subtitle);
        group.setDescription(subtitle);
        group.setColor(color);
        group.setIcon(icon);
        store.write(db -> db.getGroups().add(group));
        return group.getId();
    }

    private String ensureSubject(
            String code,
            String title,
            String description,
            String color,
            String icon,
            String category,
            String groupId,
            int[] counters
    ) {
        String existingId = store.read(db -> db.getSubjects().stream()
                .filter(s -> code.equalsIgnoreCase(s.getCode()) || title.equalsIgnoreCase(s.getTitle()))
                .map(Subject::getId)
                .findFirst()
                .orElse(null));
        if (existingId != null) return existingId;

        Subject sub = new Subject();
        sub.setId(shortId());
        sub.setCode(code.toLowerCase());
        sub.setTitle(title);
        sub.setShortTitle(title.length() > 20 ? title.substring(0, 20) : title);
        sub.setDescription(description);
        sub.setColor(color);
        sub.setIcon(icon);
        sub.setCategory(category);
        sub.setGroupId(groupId);
        sub.setSetupCompleted(true);
        store.write(db -> db.getSubjects().add(sub));
        counters[0]++;
        return sub.getId();
    }

    private int importTasksJson(Path tasksFile) throws IOException {
        if (!Files.isRegularFile(tasksFile)) return 0;
        JsonNode root = mapper.readTree(tasksFile.toFile());
        if (!root.isArray()) return 0;

        int added = 0;
        for (JsonNode item : root) {
            String course = item.path("course").asText("").toLowerCase();
            String subId = resolveSubjectIdForCourse(course);
            if (subId == null) continue;

            String title = item.path("task").asText("").trim();
            String dueDate = item.path("date").asText("").trim();
            if (title.isBlank()) continue;

            boolean exists = store.read(db -> db.getTasks().stream()
                    .anyMatch(t -> subId.equals(t.getSubjectId())
                            && (dueDate.equals(t.getDueDate()) || title.equalsIgnoreCase(t.getTitle()))));
            if (exists) continue;

            TaskItem task = new TaskItem();
            task.setId(shortId());
            task.setSubjectId(subId);
            task.setTitle(title);
            task.setDueDate(dueDate);
            task.setStatus(item.path("done").asBoolean(false) ? "done" : "pending");
            task.setDescription(item.path("tooltip").asText(""));
            store.write(db -> db.getTasks().add(task));
            added++;
        }
        return added;
    }

    private int importIcsCalendars(Path sourceDir) throws IOException {
        if (!Files.isDirectory(sourceDir)) return 0;
        int added = 0;
        List<Path> icsFiles;
        try (var stream = Files.walk(sourceDir)) {
            icsFiles = stream
                    .filter(p -> Files.isRegularFile(p)
                            && p.toString().toLowerCase().endsWith(".ics")
                            && !p.toString().toLowerCase().contains("/ioc/"))
                    .sorted()
                    .toList();
        }

        for (Path ics : icsFiles) {
            String base = ics.getFileName().toString().replaceFirst("(?i)\\.ics$", "").toLowerCase();
            String subId = resolveSubjectIdForCourse(base);
            if (subId == null) continue;

            List<String> lines = Files.readAllLines(ics);
            boolean inEvent = false;
            String summary = "";
            String dtStart = "";
            String description = "";

            for (String rawLine : lines) {
                String line = rawLine.trim();
                if ("BEGIN:VEVENT".equalsIgnoreCase(line)) {
                    inEvent = true;
                    summary = "";
                    dtStart = "";
                    description = "";
                } else if ("END:VEVENT".equalsIgnoreCase(line)) {
                    if (inEvent && !summary.isBlank() && !dtStart.isBlank()) {
                        final String fTitle = summary;
                        final String fDate = dtStart;
                        final String fDesc = description;
                        boolean exists = store.read(db -> db.getTasks().stream()
                                .anyMatch(t -> subId.equals(t.getSubjectId())
                                        && fTitle.equalsIgnoreCase(t.getTitle())
                                        && fDate.equals(t.getDueDate())));
                        if (!exists) {
                            TaskItem task = new TaskItem();
                            task.setId(shortId());
                            task.setSubjectId(subId);
                            task.setTitle(fTitle);
                            task.setDueDate(fDate);
                            task.setStatus("pending");
                            task.setDescription(fDesc);
                            store.write(db -> db.getTasks().add(task));
                            added++;
                        }
                    }
                    inEvent = false;
                } else if (inEvent) {
                    if (line.startsWith("SUMMARY:")) {
                        summary = line.substring("SUMMARY:".length()).trim();
                    } else if (line.startsWith("DTSTART")) {
                        int colon = line.indexOf(':');
                        if (colon > 0) {
                            String rawDate = line.substring(colon + 1).trim();
                            if (rawDate.length() >= 8 && rawDate.substring(0, 8).matches("\\d{8}")) {
                                dtStart = rawDate.substring(0, 4) + "-" + rawDate.substring(4, 6) + "-" + rawDate.substring(6, 8);
                            }
                        }
                    } else if (line.startsWith("DESCRIPTION:")) {
                        description = line.substring("DESCRIPTION:".length())
                                .replace("\\n", "\n")
                                .replace("\\,", ",")
                                .trim();
                    }
                }
            }
        }
        return added;
    }

    private String resolveSubjectIdForCourse(String rawCode) {
        if (rawCode == null || rawCode.isBlank()) return null;
        String mapped = switch (rawCode.toLowerCase()) {
            case "dig", "digi" -> "digi";
            case "des", "desp" -> "desp";
            case "ent" -> "ent";
            case "int" -> "int";
            case "ipo", "ipo2" -> "ipo2";
            case "acc" -> "acc-acts";
            case "serv", "sepe" -> "sepe-php";
            case "salud", "ml" -> "ifcd0177";
            default -> rawCode.toLowerCase();
        };
        return store.read(db -> db.getSubjects().stream()
                .filter(s -> mapped.equalsIgnoreCase(s.getCode()))
                .map(Subject::getId)
                .findFirst()
                .orElse(null));
    }

    private Map<String, String[]> loadIocDatesFromIcs(Path iocCalDir, String code) throws IOException {
        Map<String, String[]> datesByKey = new HashMap<>(); // key -> [openDate, gradeDate]
        if (!Files.isDirectory(iocCalDir)) return datesByKey;
        String icsBase = switch (code.toLowerCase()) {
            case "desp" -> "DES.ics";
            case "digi" -> "DIG.ics";
            case "ent" -> "ENT.ics";
            case "int" -> "INT.ics";
            case "ipo2" -> "IPO.ics";
            default -> "";
        };
        if (icsBase.isEmpty()) return datesByKey;
        Path icsFile = iocCalDir.resolve(icsBase);
        if (!Files.isRegularFile(icsFile)) return datesByKey;

        List<String> lines = Files.readAllLines(icsFile);
        boolean inEvent = false;
        String summary = "";
        String dtStart = "";
        for (String raw : lines) {
            String line = raw.trim();
            if ("BEGIN:VEVENT".equalsIgnoreCase(line)) {
                inEvent = true;
                summary = "";
                dtStart = "";
            } else if ("END:VEVENT".equalsIgnoreCase(line)) {
                if (inEvent && !summary.isBlank() && !dtStart.isBlank()) {
                    String sLower = summary.toLowerCase();
                    if (!sLower.contains("recu")) {
                        boolean isOpen = sLower.contains("inicio");
                        boolean isGrade = sLower.contains("notas");
                        if (isOpen || isGrade) {
                            String key = extractEacKey(sLower);
                            if (!key.isEmpty()) {
                                String[] pair = datesByKey.computeIfAbsent(key, k -> new String[]{"", ""});
                                if (isOpen && pair[0].isEmpty()) pair[0] = dtStart;
                                if (isGrade && pair[1].isEmpty()) pair[1] = dtStart;
                            }
                        }
                    }
                }
                inEvent = false;
            } else if (inEvent) {
                if (line.startsWith("SUMMARY:")) {
                    summary = line.substring("SUMMARY:".length()).trim();
                } else if (line.startsWith("DTSTART")) {
                    int colon = line.indexOf(':');
                    if (colon > 0) {
                        String rawDate = line.substring(colon + 1).trim();
                        if (rawDate.length() >= 8 && rawDate.substring(0, 8).matches("\\d{8}")) {
                            dtStart = rawDate.substring(0, 4) + "-" + rawDate.substring(4, 6) + "-" + rawDate.substring(6, 8);
                        }
                    }
                }
            }
        }
        return datesByKey;
    }

    private String[] resolveIocOpenGradeDates(Map<String, String[]> iocDates, String eacId, String taskTitle) {
        String key = extractEacKey((eacId + " " + taskTitle).toLowerCase());
        if (iocDates.containsKey(key)) return iocDates.get(key);
        // fallback sin sufijo p1/p2
        String baseKey = key.replaceAll("p\\d+$", "");
        if (iocDates.containsKey(baseKey)) return iocDates.get(baseKey);
        return new String[]{"", ""};
    }

    private String extractEacKey(String text) {
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("(eac|eaf)\\s*(\\d+)(?:.*?\\((p[12]|parte\\s*[12])\\))?").matcher(text);
        if (m.find()) {
            String base = m.group(1) + m.group(2);
            if (m.group(3) != null) {
                String p = m.group(3).replaceAll("[^12]", "");
                if (!p.isEmpty()) return base + "_p" + p;
            }
            return base;
        }
        return "";
    }

    private String matchSubjectId(String filename, Map<String, String> codeToSubjectId) {
        for (Map.Entry<String, String> e : codeToSubjectId.entrySet()) {
            if (filename.contains(e.getKey())) {
                return e.getValue();
            }
        }
        return null;
    }

    private static String firstNonBlank(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return "";
    }

    private static String shortId() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private static String capitalize(String s) {
        if (s == null || s.isBlank()) return "";
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    private String pickColor(String code) {
        return switch (code.toLowerCase()) {
            case "ent" -> "#3b82f6";
            case "desp" -> "#22c55e";
            case "digi" -> "#ec4899";
            case "int" -> "#eab308";
            case "ipo2" -> "#a855f7";
            default -> "#06b6d4";
        };
    }

    private String pickIcon(String code) {
        return switch (code.toLowerCase()) {
            case "ent" -> "🛠️";
            case "desp" -> "🚀";
            case "digi" -> "💡";
            case "int" -> "🎨";
            case "ipo2" -> "🧠";
            default -> "📚";
        };
    }
}
