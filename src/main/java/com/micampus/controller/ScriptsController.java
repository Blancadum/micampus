package com.micampus.controller;

import com.micampus.model.CampusDatabase;
import com.micampus.model.Lesson;
import com.micampus.repository.CampusStore;
import com.micampus.service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

/**
 * Controlador de "Scripts Java":
 * Expone en un clic las tareas que antes requerían pedirlas a una IA o ejecutar scripts Python/Node.
 */
@RestController
@RequestMapping("/api/scripts")
public class ScriptsController {

    private final CampusStore store;
    private final NoteImporterService noteImporterService;
    private final CalendarAndCoachService calendarAndCoachService;
    private final BackupService backupService;
    private final StarterTemplateService starterTemplateService;
    private final LegacyImporterService legacyImporterService;
    private final AiAssistantService aiAssistantService;
    private final DesktopReminderService desktopReminderService;
    private final TelegramBotService telegramBotService;
    private final EmailWatcherService emailWatcherService;
    private final AuthService authService;

    public ScriptsController(
            CampusStore store,
            NoteImporterService noteImporterService,
            CalendarAndCoachService calendarAndCoachService,
            BackupService backupService,
            StarterTemplateService starterTemplateService,
            LegacyImporterService legacyImporterService,
            AiAssistantService aiAssistantService,
            DesktopReminderService desktopReminderService,
            TelegramBotService telegramBotService,
            EmailWatcherService emailWatcherService,
            AuthService authService) {
        this.store = store;
        this.noteImporterService = noteImporterService;
        this.calendarAndCoachService = calendarAndCoachService;
        this.backupService = backupService;
        this.starterTemplateService = starterTemplateService;
        this.legacyImporterService = legacyImporterService;
        this.aiAssistantService = aiAssistantService;
        this.desktopReminderService = desktopReminderService;
        this.telegramBotService = telegramBotService;
        this.emailWatcherService = emailWatcherService;
        this.authService = authService;
    }

    @PostMapping("/import-notes")
    public Map<String, Object> importNotes(
            @RequestParam("file") MultipartFile file,
            @RequestParam("subjectId") String subjectId,
            @RequestParam(value = "unit", defaultValue = "Apuntes Importados") String unit) throws IOException {

        List<Lesson> generated = noteImporterService.parseFileToLessons(file, subjectId, unit);
        store.write(db -> db.getLessons().addAll(generated));

        return Map.of(
                "status", "ok",
                "lessonsCreated", generated.size(),
                "lessons", generated
        );
    }

    @GetMapping("/calendar.ics")
    public ResponseEntity<byte[]> downloadCalendar(
            @RequestParam(value = "subjectId", required = false) String subjectId,
            HttpServletRequest request) {
        String ownerId = authService.resolveRequestOwnerId(request);
        String ics = calendarAndCoachService.generateIcs(subjectId, ownerId);
        String filename = backupService.buildNormalizedCalendarFilename(subjectId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("text/calendar; charset=utf-8"))
                .body(ics.getBytes(StandardCharsets.UTF_8));
    }

    @PostMapping("/import-ics")
    public Map<String, Object> importIcs(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "subjectId", required = false) String subjectId,
            HttpServletRequest request) throws IOException {
        String content = new String(file.getBytes(), StandardCharsets.UTF_8);
        String ownerId = authService.resolveRequestOwnerId(request);
        Map<String, Object> res = calendarAndCoachService.importIcs(subjectId, content, file.getOriginalFilename(), ownerId);

        String savedAs = "";
        if (subjectId != null && !subjectId.isBlank() && !"auto".equalsIgnoreCase(subjectId.trim())) {
            backupService.saveNormalizedCalendarFile(subjectId, content);
            savedAs = backupService.buildNormalizedCalendarFilename(subjectId);
        }

        return Map.of(
                "status", "ok",
                "eventsImported", res.getOrDefault("eventsImported", 0),
                "detectedSubjects", res.getOrDefault("detectedSubjects", List.of()),
                "unmatchedEvents", res.getOrDefault("unmatchedEvents", 0),
                "savedAs", savedAs,
                "tasks", res.getOrDefault("tasks", List.of())
        );
    }

    @PostMapping("/sync-mac-calendar")
    public Map<String, Object> syncMacCalendar(HttpServletRequest request) throws IOException {
        String ownerId = authService.resolveRequestOwnerId(request);
        String ics = calendarAndCoachService.generateIcs(null, ownerId);
        Path out = store.getDataDir().resolve("MiCampus.ics");
        Files.writeString(out, ics, StandardCharsets.UTF_8);

        String os = System.getProperty("os.name").toLowerCase();
        boolean opened = false;
        if (os.contains("mac")) {
            new ProcessBuilder("open", out.toString()).start();
            opened = true;
        }
        return Map.of(
                "status", "ok",
                "file", out.toString(),
                "openedInMacCalendar", opened
        );
    }

    @GetMapping("/coach-report")
    public Map<String, Object> getCoachReport(HttpServletRequest request) {
        String ownerId = authService.resolveRequestOwnerId(request);
        return calendarAndCoachService.buildCoachReport(ownerId);
    }

    @GetMapping("/backup/export")
    public ResponseEntity<byte[]> exportBackup() throws IOException {
        byte[] zip = backupService.exportFullBackupZip();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"micampus-backup.zip\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zip);
    }

    @PostMapping("/backup/restore")
    public Map<String, Object> restoreBackup(@RequestParam("file") MultipartFile file) throws IOException {
        backupService.restoreFullBackupZip(file);
        return Map.of("status", "ok", "message", "Copia de seguridad restaurada correctamente.");
    }

    @PostMapping("/apply-template")
    public Map<String, Object> applyTemplate(@RequestBody Map<String, String> body) {
        String template = body.getOrDefault("template", "general");
        String userName = body.getOrDefault("userName", "Estudiante");
        CampusDatabase newDb = starterTemplateService.createTemplate(template, userName);
        newDb.getConfig().setOnboardingCompleted(true);
        store.replaceDatabase(newDb);
        return Map.of("status", "ok", "subjects", newDb.getSubjects().size());
    }

    @PostMapping("/import-legacy")
    public Map<String, Object> importLegacy(@RequestBody Map<String, String> body) throws IOException {
        String path = body.getOrDefault("path", "./frontend/public/data");
        return legacyImporterService.importFromClassicMiCampus(path);
    }

    @PostMapping("/import-raw")
    public Map<String, Object> importRawContent(@RequestBody Map<String, String> body) {
        String subjectId = body.getOrDefault("subjectId", "");
        String unit = body.getOrDefault("unit", "Apuntes Importados");
        String content = body.getOrDefault("content", "");
        return aiAssistantService.importRawContent(subjectId, unit, content);
    }

    @PostMapping("/ai-transform")
    public Map<String, Object> aiTransform(
            @RequestParam("subjectId") String subjectId,
            @RequestParam(value = "unit", defaultValue = "Apuntes IA") String unit,
            @RequestParam(value = "mode", defaultValue = "book") String mode,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "text", required = false) String text) {
        try {
            String rawInput = text != null ? text : "";
            if (file != null && !file.isEmpty()) {
                String name = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
                rawInput = name.endsWith(".pdf")
                        ? noteImporterService.extractPdfText(file.getBytes())
                        : new String(file.getBytes(), StandardCharsets.UTF_8);
            }
            if (rawInput.isBlank()) {
                return Map.of("status", "error", "message", "No se recibió archivo ni texto para procesar.");
            }
            String transformed = aiAssistantService.transformWithConfiguredAi(mode, rawInput);
            return aiAssistantService.importRawContent(subjectId, unit, transformed);
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "Error al procesar con IA");
        }
    }

    @PostMapping("/ai-autofill")
    public Map<String, Object> aiAutofill(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "text", required = false) String text) {
        try {
            String rawInput = text != null ? text : "";
            if (file != null && !file.isEmpty()) {
                String name = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
                String fileText = name.endsWith(".pdf")
                        ? noteImporterService.extractPdfText(file.getBytes())
                        : new String(file.getBytes(), StandardCharsets.UTF_8);
                rawInput = rawInput.isBlank() ? fileText : (rawInput + "\n\n" + fileText);
            }
            if (rawInput.isBlank()) {
                return Map.of("status", "error", "message", "Escribe una descripción o adjunta un PDF/texto.");
            }
            Map<String, Object> draft = aiAssistantService.autofillSubjectDraft(rawInput);
            return Map.of("status", "ok", "draft", draft);
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "Error al generar borrador con IA");
        }
    }

    @PostMapping("/notify-now")
    public Map<String, Object> notifyNow() {
        int sent = desktopReminderService.sendUrgentRemindersNow();
        return Map.of("status", "ok", "sentCount", sent);
    }

    @PostMapping("/ai-study-plan")
    public Map<String, Object> aiStudyPlan() {
        try {
            String plan = aiAssistantService.buildAiStudyPlan();
            return Map.of("status", "ok", "plan", plan);
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "Configura tu API Key u Ollama en Ajustes");
        }
    }

    @PostMapping("/ai-test")
    public Map<String, Object> testAi(@RequestBody(required = false) com.micampus.model.AiProfile profile) {
        try {
            String reply = profile != null
                    ? aiAssistantService.testSingleProfile(profile)
                    : aiAssistantService.testAiConnection();
            return Map.of("status", "ok", "reply", reply);
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "No se pudo conectar con la IA");
        }
    }

    @PostMapping("/ai-models")
    public Map<String, Object> listAiModels(@RequestBody(required = false) com.micampus.model.CampusConfig cfg) {
        try {
            return Map.of("status", "ok", "models", aiAssistantService.listAvailableModels(cfg));
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "No se pudieron cargar los modelos");
        }
    }

    @PostMapping("/telegram-test")
    public Map<String, Object> testTelegram() {
        try {
            telegramBotService.sendTestMessage();
            return Map.of("status", "ok", "message", "Mensaje de prueba enviado a tu Telegram.");
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "Error al enviar mensaje a Telegram");
        }
    }

    @PostMapping("/email-test")
    public Map<String, Object> testEmail() {
        try {
            return emailWatcherService.testAndScanNow();
        } catch (Exception ex) {
            return Map.of("status", "error", "message", ex.getMessage() != null ? ex.getMessage() : "Error al conectar por IMAP");
        }
    }
}
