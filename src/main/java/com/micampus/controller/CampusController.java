package com.micampus.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.CampusConfig;
import com.micampus.model.CampusDatabase;
import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.model.SubjectGroup;
import com.micampus.model.TaskItem;
import com.micampus.model.UploadedFile;
import com.micampus.repository.CampusStore;
import com.micampus.service.AuthService;
import com.micampus.service.BackupService;
import com.micampus.service.NoteImporterService;
import com.micampus.service.PdfExportService;
import com.micampus.service.SearchIndexService;
import com.micampus.service.TelegramBotService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api")
public class CampusController {

    private final CampusStore store;
    private final SearchIndexService searchService;
    private final BackupService backupService;
    private final NoteImporterService noteImporterService;
    private final TelegramBotService telegramBotService;
    private final PdfExportService pdfExportService;
    private final AuthService authService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CampusController(CampusStore store, SearchIndexService searchService,
                            BackupService backupService, NoteImporterService noteImporterService,
                            TelegramBotService telegramBotService, PdfExportService pdfExportService,
                            AuthService authService) {
        this.store = store;
        this.searchService = searchService;
        this.backupService = backupService;
        this.noteImporterService = noteImporterService;
        this.telegramBotService = telegramBotService;
        this.pdfExportService = pdfExportService;
        this.authService = authService;
    }

    private CampusConfig resolveUserConfig(CampusDatabase db, String ownerId) {
        if (ownerId != null && !ownerId.isBlank() && db.getUserConfigs().containsKey(ownerId)) {
            return db.getUserConfigs().get(ownerId);
        }
        return db.getConfig();
    }

    private static final String MASK = "••••••••";

    private boolean isNewSecret(String val) {
        return val != null && !val.isBlank() && !MASK.equals(val.trim());
    }

    private String maskSecret(String val) {
        return (val != null && !val.isBlank()) ? MASK : "";
    }

    private CampusConfig sanitizeConfigForClient(CampusConfig src) {
        if (src == null) return new CampusConfig();
        CampusConfig copy = objectMapper.convertValue(src, CampusConfig.class);
        copy.setGeminiApiKey(maskSecret(src.getGeminiApiKey()));
        copy.setOpenaiApiKey(maskSecret(src.getOpenaiApiKey()));
        copy.setAnthropicApiKey(maskSecret(src.getAnthropicApiKey()));
        copy.setCustomAiApiKey(maskSecret(src.getCustomAiApiKey()));
        copy.setTelegramBotToken(maskSecret(src.getTelegramBotToken()));
        copy.setEmailImapPassword(maskSecret(src.getEmailImapPassword()));
        copy.setAuthPassword("");
        if (copy.getAiFallbacks() != null) {
            copy.getAiFallbacks().forEach(fb -> {
                if (fb != null) fb.setApiKey(maskSecret(fb.getApiKey()));
            });
        }
        return copy;
    }

    @GetMapping("/campus")
    public Map<String, Object> getCampusState(HttpServletRequest request) {
        String ownerId = authService.resolveRequestOwnerId(request);
        return store.read(db -> Map.of(
                "config", sanitizeConfigForClient(resolveUserConfig(db, ownerId)),
                "groups", db.getGroups().stream().filter(g -> authService.matchesOwner(g.getOwnerId(), ownerId)).toList(),
                "subjects", db.getSubjects().stream().filter(s -> authService.matchesOwner(s.getOwnerId(), ownerId)).toList(),
                "lessons", db.getLessons().stream().filter(l -> authService.matchesOwner(l.getOwnerId(), ownerId)).toList(),
                "tasks", db.getTasks().stream().filter(t -> authService.matchesOwner(t.getOwnerId(), ownerId)).toList(),
                "uploads", db.getUploads().stream().filter(u -> authService.matchesOwner(u.getOwnerId(), ownerId)).toList(),
                "quizzes", db.getQuizzes().stream().filter(q -> authService.matchesOwner(q.getOwnerId(), ownerId)).toList()
        ));
    }

    @PutMapping("/config")
    public CampusConfig updateConfig(@RequestBody CampusConfig incoming, HttpServletRequest request) {
        String ownerId = authService.resolveRequestOwnerId(request);
        store.write(db -> {
            CampusConfig cfg = resolveUserConfig(db, ownerId);
            if (incoming.getUserName() != null) cfg.setUserName(incoming.getUserName());
            if (incoming.getCampusTitle() != null) cfg.setCampusTitle(incoming.getCampusTitle());
            if (incoming.getSubtitle() != null) cfg.setSubtitle(incoming.getSubtitle());
            if (incoming.getQuickLinks() != null) cfg.setQuickLinks(incoming.getQuickLinks());
            if (incoming.getOfficialLinks() != null) cfg.setOfficialLinks(incoming.getOfficialLinks());
            if (incoming.getSectionLinks() != null) cfg.setSectionLinks(incoming.getSectionLinks());
            if (incoming.getAiProvider() != null) cfg.setAiProvider(incoming.getAiProvider());
            if (incoming.getAiModel() != null) cfg.setAiModel(incoming.getAiModel());
            if (incoming.getAiIntensity() != null) cfg.setAiIntensity(incoming.getAiIntensity());
            if (isNewSecret(incoming.getGeminiApiKey())) cfg.setGeminiApiKey(incoming.getGeminiApiKey());
            if (isNewSecret(incoming.getOpenaiApiKey())) cfg.setOpenaiApiKey(incoming.getOpenaiApiKey());
            if (isNewSecret(incoming.getAnthropicApiKey())) cfg.setAnthropicApiKey(incoming.getAnthropicApiKey());
            if (incoming.getOllamaUrl() != null) cfg.setOllamaUrl(incoming.getOllamaUrl());
            if (incoming.getOllamaModel() != null) cfg.setOllamaModel(incoming.getOllamaModel());
            if (incoming.getCustomAiBaseUrl() != null) cfg.setCustomAiBaseUrl(incoming.getCustomAiBaseUrl());
            if (isNewSecret(incoming.getCustomAiApiKey())) cfg.setCustomAiApiKey(incoming.getCustomAiApiKey());
            if (incoming.getCustomAiModel() != null) cfg.setCustomAiModel(incoming.getCustomAiModel());
            if (isNewSecret(incoming.getTelegramBotToken())) cfg.setTelegramBotToken(incoming.getTelegramBotToken());
            if (incoming.getTelegramChatId() != null) cfg.setTelegramChatId(incoming.getTelegramChatId());
            if (incoming.getTelegramBotPrompt() != null) cfg.setTelegramBotPrompt(incoming.getTelegramBotPrompt());
            cfg.setTelegramRemindersEnabled(incoming.isTelegramRemindersEnabled());
            cfg.setTelegramAllowActions(incoming.isTelegramAllowActions());
            if (incoming.getBotCallMe() != null) cfg.setBotCallMe(incoming.getBotCallMe());
            if (incoming.getBotSoulProfile() != null) cfg.setBotSoulProfile(incoming.getBotSoulProfile());
            if (incoming.getBotSoulMarkdown() != null) cfg.setBotSoulMarkdown(incoming.getBotSoulMarkdown());
            cfg.setBotQuietHoursEnabled(incoming.isBotQuietHoursEnabled());
            if (incoming.getBotQuietStart() != null) cfg.setBotQuietStart(incoming.getBotQuietStart());
            if (incoming.getBotQuietEnd() != null) cfg.setBotQuietEnd(incoming.getBotQuietEnd());
            cfg.setBotUrgentDaysBefore(incoming.getBotUrgentDaysBefore());
            cfg.setBotWeeklyDigestEnabled(incoming.isBotWeeklyDigestEnabled());
            if (incoming.getBotWeeklyDigestDay() != null) cfg.setBotWeeklyDigestDay(incoming.getBotWeeklyDigestDay());
            cfg.setBotWeeklyDigestHour(incoming.getBotWeeklyDigestHour());
            cfg.setBotNotifyGrades(incoming.isBotNotifyGrades());
            cfg.setEmailWatcherEnabled(incoming.isEmailWatcherEnabled());
            if (incoming.getEmailImapHost() != null) cfg.setEmailImapHost(incoming.getEmailImapHost());
            if (incoming.getEmailImapPort() > 0) cfg.setEmailImapPort(incoming.getEmailImapPort());
            if (incoming.getEmailImapUser() != null) cfg.setEmailImapUser(incoming.getEmailImapUser());
            if (isNewSecret(incoming.getEmailImapPassword())) {
                cfg.setEmailImapPassword(incoming.getEmailImapPassword());
            }
            if (incoming.getEmailKeywords() != null) cfg.setEmailKeywords(incoming.getEmailKeywords());
            if (incoming.getAiFallbacks() != null) {
                var existingFallbacks = cfg.getAiFallbacks();
                for (int i = 0; i < incoming.getAiFallbacks().size(); i++) {
                    var fb = incoming.getAiFallbacks().get(i);
                    if (fb != null && !isNewSecret(fb.getApiKey())
                            && existingFallbacks != null && i < existingFallbacks.size() && existingFallbacks.get(i) != null) {
                        fb.setApiKey(existingFallbacks.get(i).getApiKey());
                    }
                }
                cfg.setAiFallbacks(incoming.getAiFallbacks());
            }
            if (incoming.getAuthUsername() != null) cfg.setAuthUsername(incoming.getAuthUsername());
            if (isNewSecret(incoming.getAuthPassword())) {
                cfg.setAuthPassword(incoming.getAuthPassword());
            }
            cfg.setAuthEnabled(incoming.isAuthEnabled());
            if (incoming.getContactEmail() != null) cfg.setContactEmail(incoming.getContactEmail());
            cfg.setNewsletterEnabled(incoming.isNewsletterEnabled());
            cfg.setTelegramEnabled(incoming.isTelegramEnabled());
            cfg.setOnboardingCompleted(incoming.isOnboardingCompleted());
            if (ownerId != null && !ownerId.isBlank()) {
                db.getUserConfigs().put(ownerId, cfg);
            }
        });
        return store.read(db -> sanitizeConfigForClient(resolveUserConfig(db, ownerId)));
    }

    // --- SUBJECTS ---
    @PostMapping("/subjects")
    public Subject createSubject(@RequestBody Subject subject, HttpServletRequest request) {
        subject.setOwnerId(authService.resolveRequestOwnerId(request));
        if (subject.getId() == null || subject.getId().isBlank()) {
            subject.setId(UUID.randomUUID().toString().substring(0, 8));
        }
        if (subject.getCode() == null || subject.getCode().isBlank()) {
            subject.setCode(subject.getId());
        }
        if (subject.getShortTitle() == null || subject.getShortTitle().isBlank()) {
            subject.setShortTitle(subject.getTitle());
        }
        store.write(db -> db.getSubjects().add(subject));
        return subject;
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable String id, @RequestBody Subject updated) {
        boolean[] found = {false};
        store.write(db -> {
            for (Subject s : db.getSubjects()) {
                if (s.getId().equals(id)) {
                    s.setTitle(updated.getTitle());
                    s.setShortTitle(updated.getShortTitle());
                    s.setCode(updated.getCode());
                    s.setDescription(updated.getDescription());
                    s.setColor(updated.getColor());
                    s.setIcon(updated.getIcon());
                    s.setTeacher(updated.getTeacher());
                    s.setTeacherAvatar(updated.getTeacherAvatar());
                    s.setCategory(updated.getCategory());
                    s.setGroupId(updated.getGroupId());
                    s.setSetupCompleted(updated.isSetupCompleted());
                    if (updated.getIocCourseId() != null) s.setIocCourseId(updated.getIocCourseId());
                    found[0] = true;
                    break;
                }
            }
        });
        return found[0] ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable String id) {
        store.write(db -> {
            db.getSubjects().removeIf(s -> s.getId().equals(id));
            db.getLessons().removeIf(l -> l.getSubjectId().equals(id));
            db.getTasks().removeIf(t -> t.getSubjectId().equals(id));
        });
        return ResponseEntity.noContent().build();
    }

    // --- SUBJECT GROUPS ---
    @PostMapping("/groups")
    public SubjectGroup createGroup(@RequestBody SubjectGroup group, HttpServletRequest request) {
        group.setOwnerId(authService.resolveRequestOwnerId(request));
        if (group.getId() == null || group.getId().isBlank()) {
            group.setId(UUID.randomUUID().toString().substring(0, 8));
        }
        store.write(db -> db.getGroups().add(group));
        return group;
    }

    @PutMapping("/groups/{id}")
    public ResponseEntity<SubjectGroup> updateGroup(@PathVariable String id, @RequestBody SubjectGroup updated) {
        boolean[] found = {false};
        store.write(db -> {
            for (SubjectGroup g : db.getGroups()) {
                if (g.getId().equals(id)) {
                    g.setTitle(updated.getTitle());
                    g.setSubtitle(updated.getSubtitle());
                    g.setDescription(updated.getDescription());
                    g.setColor(updated.getColor());
                    g.setIcon(updated.getIcon());
                    found[0] = true;
                    break;
                }
            }
        });
        return found[0] ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/groups/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable String id) {
        store.write(db -> {
            db.getGroups().removeIf(g -> g.getId().equals(id));
            for (Subject s : db.getSubjects()) {
                if (id.equals(s.getGroupId())) {
                    s.setGroupId("");
                }
            }
        });
        return ResponseEntity.noContent().build();
    }

    // --- LESSONS ---
    @PostMapping("/lessons")
    public Lesson createLesson(@RequestBody Lesson lesson, HttpServletRequest request) {
        lesson.setOwnerId(authService.resolveRequestOwnerId(request));
        if (lesson.getId() == null || lesson.getId().isBlank()) {
            lesson.setId(UUID.randomUUID().toString().substring(0, 8));
        }
        if (lesson.getQuiz() == null || lesson.getQuiz().isEmpty()) {
            lesson.setQuiz(noteImporterService.extractQuiz(lesson.getContent()));
        }
        store.write(db -> db.getLessons().add(lesson));
        return lesson;
    }

    @PutMapping("/lessons/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable String id, @RequestBody Lesson updated) {
        boolean[] found = {false};
        store.write(db -> {
            for (Lesson l : db.getLessons()) {
                if (l.getId().equals(id)) {
                    l.setUnit(updated.getUnit());
                    l.setTitle(updated.getTitle());
                    l.setSummary(updated.getSummary());
                    l.setContent(updated.getContent());
                    l.setAudioUrl(updated.getAudioUrl());
                    l.setCompleted(updated.isCompleted());
                    l.setOrderIndex(updated.getOrderIndex());
                    l.setQuiz(noteImporterService.extractQuiz(updated.getContent()));
                    found[0] = true;
                    break;
                }
            }
        });
        return found[0] ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/lessons/{id}/toggle")
    public ResponseEntity<Lesson> toggleLesson(@PathVariable String id) {
        Lesson[] target = {null};
        store.write(db -> {
            for (Lesson l : db.getLessons()) {
                if (l.getId().equals(id)) {
                    l.setCompleted(!l.isCompleted());
                    target[0] = l;
                    break;
                }
            }
        });
        return target[0] != null ? ResponseEntity.ok(target[0]) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/lessons/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable String id) {
        store.write(db -> db.getLessons().removeIf(l -> l.getId().equals(id)));
        return ResponseEntity.noContent().build();
    }

    // --- TASKS ---
    @PostMapping("/tasks")
    public TaskItem createTask(@RequestBody TaskItem task, HttpServletRequest request) {
        task.setOwnerId(authService.resolveRequestOwnerId(request));
        if (task.getId() == null || task.getId().isBlank()) {
            task.setId(UUID.randomUUID().toString().substring(0, 8));
        }
        store.write(db -> db.getTasks().add(task));
        return task;
    }

    @PatchMapping("/tasks/{id}/toggle")
    public ResponseEntity<TaskItem> toggleTask(@PathVariable String id) {
        TaskItem[] target = {null};
        store.write(db -> {
            for (TaskItem t : db.getTasks()) {
                if (t.getId().equals(id)) {
                    t.setStatus("done".equalsIgnoreCase(t.getStatus()) ? "pending" : "done");
                    target[0] = t;
                    break;
                }
            }
        });
        return target[0] != null ? ResponseEntity.ok(target[0]) : ResponseEntity.notFound().build();
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskItem> updateTask(@PathVariable String id, @RequestBody TaskItem updated) {
        boolean[] found = {false};
        String[] gradeAlert = {null};
        store.write(db -> {
            for (TaskItem t : db.getTasks()) {
                if (t.getId().equals(id)) {
                    String prevGrade = t.getGrade() != null ? t.getGrade().trim() : "";
                    String nextGrade = updated.getGrade() != null ? updated.getGrade().trim() : "";
                    t.setTitle(updated.getTitle());
                    t.setDescription(updated.getDescription());
                    t.setDueDate(updated.getDueDate());
                    t.setStatus(updated.getStatus());
                    t.setGrade(updated.getGrade());
                    t.setWeight(updated.getWeight());
                    found[0] = true;
                    if (!nextGrade.isBlank() && !nextGrade.equals(prevGrade) && db.getConfig().isBotNotifyGrades()) {
                        String subName = db.getSubjects().stream()
                                .filter(s -> s.getId().equals(t.getSubjectId()))
                                .map(Subject::getTitle)
                                .findFirst().orElse("Asignatura");
                        gradeAlert[0] = "🏆 ¡Nueva nota registrada!\n" + subName + " · " + t.getTitle() + ": " + nextGrade;
                    }
                    break;
                }
            }
        });
        if (gradeAlert[0] != null) {
            telegramBotService.sendToConfiguredChat(gradeAlert[0]);
        }
        return found[0] ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        store.write(db -> db.getTasks().removeIf(t -> t.getId().equals(id)));
        return ResponseEntity.noContent().build();
    }

    // --- UPLOADS ---
    @PostMapping("/uploads/{subjectId}")
    public UploadedFile uploadFile(
            @PathVariable String subjectId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "otros") String folder) throws IOException {
        return backupService.saveUploadedFile(subjectId, file, folder);
    }

    @GetMapping("/uploads/{subjectId}/{storedName}")
    public ResponseEntity<Resource> downloadUpload(
            @PathVariable String subjectId,
            @PathVariable String storedName,
            @RequestParam(value = "inline", defaultValue = "false") boolean inline) throws IOException {
        Resource resource = backupService.loadUploadedFile(subjectId, storedName);
        String disposition = inline ? "inline" : "attachment";
        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
        if (inline) {
            String lower = storedName.toLowerCase();
            if (lower.endsWith(".png")) mediaType = MediaType.IMAGE_PNG;
            else if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) mediaType = MediaType.IMAGE_JPEG;
            else if (lower.endsWith(".gif")) mediaType = MediaType.IMAGE_GIF;
            else if (lower.endsWith(".webp")) mediaType = MediaType.parseMediaType("image/webp");
            else if (lower.endsWith(".svg")) mediaType = MediaType.parseMediaType("image/svg+xml");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition + "; filename=\"" + storedName + "\"")
                .contentType(mediaType)
                .body(resource);
    }

    @DeleteMapping("/uploads/{id}")
    public ResponseEntity<Void> deleteUpload(@PathVariable String id) {
        store.write(db -> db.getUploads().removeIf(u -> u.getId().equals(id)));
        return ResponseEntity.noContent().build();
    }

    // --- HEALTH CHECK (Cloud / Keep-alive) ---
    @GetMapping("/health")
    public Map<String, Object> health() {
        CampusConfig cfg = store.read(db -> db.getConfig());
        return Map.of(
                "status", "ok",
                "telegramEnabled", cfg != null && cfg.isTelegramEnabled(),
                "aiProvider", cfg != null && cfg.getAiProvider() != null ? cfg.getAiProvider() : "none"
        );
    }

    // --- SEARCH ---
    @GetMapping("/search")
    public List<Map<String, Object>> search(@RequestParam(name = "q", defaultValue = "") String query) {
        return searchService.search(query);
    }

    // --- IOC CHROME EXTENSION COURSE DICTIONARY & GRADE SYNC ---
    @CrossOrigin(origins = "*")
    @GetMapping("/ioc/courses")
    public List<Map<String, String>> listIocCourses() {
        return store.read(db -> db.getSubjects().stream()
                .filter(s -> s.getIocCourseId() != null && !s.getIocCourseId().isBlank())
                .map(s -> Map.of(
                        "subjectId", s.getId(),
                        "title", s.getTitle() != null ? s.getTitle() : s.getId(),
                        "iocCourseId", s.getIocCourseId().trim()
                ))
                .toList());
    }

    @PutMapping("/ioc/courses")
    public Map<String, Object> saveIocCourses(@RequestBody Map<String, String> mapping) {
        store.write(db -> {
            for (Subject s : db.getSubjects()) {
                if (mapping.containsKey(s.getId())) {
                    s.setIocCourseId(mapping.get(s.getId()));
                }
            }
        });
        return Map.of("status", "ok");
    }

    @PostMapping("/ioc/apply-dictionary")
    public Map<String, Object> applyIocDictionary() throws IOException {
        Path dictPath = Path.of("ioc-diccionario.json");
        if (!Files.isRegularFile(dictPath)) {
            return Map.of("status", "error", "message", "No se encontró ioc-diccionario.json en la raíz del proyecto.");
        }
        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        com.fasterxml.jackson.databind.JsonNode root = mapper.readTree(Files.readString(dictPath));
        com.fasterxml.jackson.databind.JsonNode items = root.path("asignaturas");
        int[] applied = {0};

        store.write(db -> {
            for (com.fasterxml.jackson.databind.JsonNode item : items) {
                String code = item.path("code").asText("").trim();
                String title = item.path("title").asText("").trim();
                String iocId = item.path("iocCourseId").asText("").trim();
                if (title.isBlank() || iocId.isBlank()) continue;

                Subject target = db.getSubjects().stream()
                        .filter(s -> iocId.equals(s.getIocCourseId()) || title.equalsIgnoreCase(s.getTitle()))
                        .findFirst()
                        .orElse(null);

                if (target == null) {
                    // Reutilizar placeholder neutral ("Asignatura 1/2/3") si aún no tiene ID IOC
                    target = db.getSubjects().stream()
                            .filter(s -> (s.getIocCourseId() == null || s.getIocCourseId().isBlank())
                                    && s.getTitle() != null && s.getTitle().matches("^Asignatura \\d+$"))
                            .findFirst()
                            .orElse(null);
                }

                if (target != null) {
                    target.setCode(code);
                    target.setTitle(title);
                    target.setShortTitle(code.isBlank() ? title : code);
                    target.setIocCourseId(iocId);
                    target.setSetupCompleted(true);
                } else {
                    Subject created = new Subject();
                    created.setId(UUID.randomUUID().toString().substring(0, 8));
                    created.setCode(code.isBlank() ? created.getId() : code);
                    created.setTitle(title);
                    created.setShortTitle(code.isBlank() ? title : code);
                    created.setIcon("💻");
                    created.setCategory("DAW");
                    created.setIocCourseId(iocId);
                    created.setSetupCompleted(true);
                    db.getSubjects().add(created);
                }
                applied[0]++;
            }
        });

        List<Subject> updatedSubjects = store.read(db -> db.getSubjects());
        return Map.of("status", "ok", "applied", applied[0], "subjects", updatedSubjects);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/ioc/grades-sync")
    public Map<String, Object> syncIocGrades(@RequestBody Map<String, Object> payload) {
        String courseId = payload.get("courseId") != null ? String.valueOf(payload.get("courseId")).trim() : "";
        @SuppressWarnings("unchecked")
        List<Map<String, String>> incoming = (List<Map<String, String>>) payload.getOrDefault("grades", List.of());
        List<String> updatedAlerts = new java.util.ArrayList<>();
        int[] updatedCount = {0};

        store.write(db -> {
            String targetSubjectId = null;
            if (!courseId.isBlank()) {
                targetSubjectId = db.getSubjects().stream()
                        .filter(s -> courseId.equals(s.getIocCourseId() != null ? s.getIocCourseId().trim() : ""))
                        .map(Subject::getId)
                        .findFirst()
                        .orElse(null);
            }

            for (Map<String, String> g : incoming) {
                String itemTitle = g.getOrDefault("title", "").trim();
                String itemGrade = g.getOrDefault("grade", "").trim();
                if (itemTitle.isBlank() || itemGrade.isBlank() || "-".equals(itemGrade)) continue;

                String needle = itemTitle.toLowerCase();
                for (TaskItem t : db.getTasks()) {
                    if (targetSubjectId != null && !targetSubjectId.equals(t.getSubjectId())) continue;
                    if (t.getTitle() != null && (needle.contains(t.getTitle().toLowerCase()) || t.getTitle().toLowerCase().contains(needle))) {
                        String prev = t.getGrade() != null ? t.getGrade().trim() : "";
                        if (!itemGrade.equals(prev)) {
                            t.setGrade(itemGrade);
                            t.setStatus("done");
                            updatedCount[0]++;
                            if (db.getConfig().isBotNotifyGrades()) {
                                updatedAlerts.add("🏆 " + t.getTitle() + ": " + itemGrade);
                            }
                        }
                    }
                }
            }
        });

        if (!updatedAlerts.isEmpty()) {
            telegramBotService.sendToConfiguredChat("🎓 Notas sincronizadas desde el IOC:\n" + String.join("\n", updatedAlerts));
        }

        return Map.of(
                "status", "ok",
                "received", incoming.size(),
                "updatedCount", updatedCount[0],
                "alerts", updatedAlerts
        );
    }

    @GetMapping("/ioc/extension.zip")
    public ResponseEntity<byte[]> downloadChromeExtension() throws IOException {
        Path extDir = Path.of("chrome-extension");
        if (!Files.isDirectory(extDir)) {
            return ResponseEntity.notFound().build();
        }
        java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            for (String fileName : List.of("manifest.json", "content.js", "popup.html", "popup.js")) {
                Path file = extDir.resolve(fileName);
                if (Files.isRegularFile(file)) {
                    zos.putNextEntry(new ZipEntry("micampus-ioc-extension/" + fileName));
                    zos.write(Files.readAllBytes(file));
                    zos.closeEntry();
                }
            }
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"micampus-ioc-extension.zip\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(baos.toByteArray());
    }

    @GetMapping("/subjects/{subjectId}/export-pdf")
    public ResponseEntity<byte[]> exportSubjectPdf(
            @PathVariable String subjectId,
            @RequestParam(required = false) String unit,
            @RequestParam(required = false) String lessonId
    ) throws IOException {
        CampusDatabase db = store.read(d -> d);
        Subject subject = db.getSubjects().stream()
                .filter(s -> s.getId().equals(subjectId) || (s.getCode() != null && s.getCode().equalsIgnoreCase(subjectId)))
                .findFirst()
                .orElse(null);
        if (subject == null) {
            return ResponseEntity.notFound().build();
        }
        List<Lesson> allSubjectLessons = db.getLessons().stream()
                .filter(l -> subject.getId().equals(l.getSubjectId()))
                .toList();

        byte[] pdfBytes = pdfExportService.exportLessonsToPdf(subject, unit, lessonId, allSubjectLessons);
        String slug = (subject.getCode() != null && !subject.getCode().isBlank() ? subject.getCode() : subject.getId())
                .toLowerCase().replaceAll("[^a-z0-9-_]", "-");
        String fileName = (lessonId != null && !lessonId.isBlank())
                ? slug + "-leccion.pdf"
                : (unit != null && !unit.isBlank() ? slug + "-unidad.pdf" : slug + "-libro.pdf");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    @GetMapping("/subjects/{subjectId}/export-diagrams-pdf")
    public ResponseEntity<byte[]> exportDiagramsPdf(@PathVariable String subjectId) throws IOException {
        CampusDatabase db = store.read(d -> d);
        Subject subject = db.getSubjects().stream()
                .filter(s -> s.getId().equals(subjectId) || (s.getCode() != null && s.getCode().equalsIgnoreCase(subjectId)))
                .findFirst()
                .orElse(null);
        if (subject == null) {
            return ResponseEntity.notFound().build();
        }
        List<Lesson> allSubjectLessons = db.getLessons().stream()
                .filter(l -> subject.getId().equals(l.getSubjectId()))
                .toList();
        byte[] pdfBytes = pdfExportService.exportDiagramsPdf(subject, allSubjectLessons);
        String slug = (subject.getCode() != null && !subject.getCode().isBlank() ? subject.getCode() : subject.getId())
                .toLowerCase().replaceAll("[^a-z0-9-_]", "-");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + slug + "-diagramas.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    @GetMapping("/subjects/{subjectId}/export-glossary-pdf")
    public ResponseEntity<byte[]> exportGlossaryPdf(
            @PathVariable String subjectId,
            @RequestParam(required = false) String unit
    ) throws IOException {
        CampusDatabase db = store.read(d -> d);
        Subject subject = db.getSubjects().stream()
                .filter(s -> s.getId().equals(subjectId) || (s.getCode() != null && s.getCode().equalsIgnoreCase(subjectId)))
                .findFirst()
                .orElse(null);
        if (subject == null) {
            return ResponseEntity.notFound().build();
        }
        List<Lesson> allSubjectLessons = db.getLessons().stream()
                .filter(l -> subject.getId().equals(l.getSubjectId()))
                .toList();
        byte[] pdfBytes = pdfExportService.exportGlossaryPdf(subject, unit, allSubjectLessons);
        String slug = (subject.getCode() != null && !subject.getCode().isBlank() ? subject.getCode() : subject.getId())
                .toLowerCase().replaceAll("[^a-z0-9-_]", "-");
        String fileName = (unit != null && !unit.isBlank()) ? slug + "-glosario-unidad.pdf" : slug + "-glosario.pdf";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    @PostMapping("/search/glossary")
    public ResponseEntity<Map<String, Object>> saveGlossaryConcepts(@RequestBody Map<String, String> payload)
            throws IOException {
        String rawText = payload != null ? payload.getOrDefault("rawText", "") : "";
        int start = rawText.indexOf('[');
        int end = rawText.lastIndexOf(']');
        if (start < 0 || end <= start) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "No se encontró un array JSON válido en la salida del agente Glosario."
            ));
        }
        String jsonSlice = rawText.substring(start, end + 1);
        List<Map<String, Object>> incoming = objectMapper.readValue(
                jsonSlice,
                new TypeReference<List<Map<String, Object>>>() {}
        );

        Path publicIndex = Path.of("frontend/public/data/search_index.json");
        Path staticIndex = Path.of("src/main/resources/static/data/search_index.json");
        Path source = Files.exists(publicIndex) ? publicIndex : staticIndex;
        if (!Files.exists(source)) {
            return ResponseEntity.status(404).body(Map.of(
                    "status", "error",
                    "message", "No se encontró search_index.json."
            ));
        }

        List<Map<String, Object>> current = objectMapper.readValue(
                Files.readString(source),
                new TypeReference<List<Map<String, Object>>>() {}
        );
        Map<String, Integer> idxById = new java.util.HashMap<>();
        for (int i = 0; i < current.size(); i++) {
            Object id = current.get(i).get("id");
            if (id != null) idxById.put(String.valueOf(id), i);
        }

        int added = 0;
        int updated = 0;
        for (Map<String, Object> item : incoming) {
            String id = String.valueOf(item.getOrDefault("id", "")).trim();
            if (id.isEmpty()) continue;
            item.putIfAbsent("type", "Glosario");
            if (idxById.containsKey(id)) {
                current.set(idxById.get(id), item);
                updated++;
            } else {
                idxById.put(id, current.size());
                current.add(item);
                added++;
            }
        }

        String outJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(current);
        if (Files.exists(publicIndex.getParent())) Files.writeString(publicIndex, outJson);
        if (Files.exists(staticIndex.getParent())) Files.writeString(staticIndex, outJson);

        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "added", added,
                "updated", updated,
                "total", current.size()
        ));
    }
}
