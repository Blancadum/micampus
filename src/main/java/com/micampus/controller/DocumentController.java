package com.micampus.controller;

import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.repository.CampusStore;
import com.micampus.service.AiAssistantService;
import com.micampus.service.DocumentNormalizationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * API REST para consultar documentos normalizados (PDF/ODT/MD/TXT) y trabajarlos con la IA.
 */
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentNormalizationService normalizationService;
    private final AiAssistantService aiAssistantService;
    private final CampusStore store;

    public DocumentController(
            DocumentNormalizationService normalizationService,
            AiAssistantService aiAssistantService,
            CampusStore store
    ) {
        this.normalizationService = normalizationService;
        this.aiAssistantService = aiAssistantService;
        this.store = store;
    }

    @GetMapping
    public List<Map<String, Object>> listDocuments(
            @RequestParam(required = false) String subjectCode,
            @RequestParam(required = false) String eacId,
            @RequestParam(required = false) String kind
    ) throws IOException {
        return normalizationService.listDocuments(subjectCode, eacId, kind);
    }

    @GetMapping("/{docId}")
    public Map<String, Object> getDocument(@PathVariable String docId) throws IOException {
        return normalizationService.getDocument(docId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Documento no encontrado: " + docId));
    }

    @PostMapping("/sync")
    public Map<String, Object> syncDocuments() throws IOException {
        return normalizationService.syncAllDocuments();
    }

    @PostMapping("/{docId}/ask")
    public Map<String, Object> askAboutDocument(
            @PathVariable String docId,
            @RequestBody Map<String, String> payload
    ) throws IOException, InterruptedException {
        String question = payload != null ? payload.getOrDefault("question", "").trim() : "";
        if (question.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Falta el campo 'question'.");
        }
        Map<String, Object> doc = normalizationService.getDocument(docId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Documento no encontrado: " + docId));

        String text = String.valueOf(doc.getOrDefault("text", ""));
        if (text.length() > 28000) {
            text = text.substring(0, 28000) + "\n...[truncado]";
        }
        String prompt = "Documento normalizado [" + docId + " | " + doc.get("title") + "]:\n\n"
                + text + "\n\n---\nInstrucción/Pregunta del usuario:\n" + question;
        String answer = aiAssistantService.transformWithConfiguredAi("chat", prompt);
        return Map.of("docId", docId, "title", doc.get("title"), "answer", answer);
    }

    @PostMapping("/ask")
    public Map<String, Object> askAboutMultipleDocuments(@RequestBody Map<String, Object> payload)
            throws IOException, InterruptedException {
        if (payload == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payload vacío.");
        }
        String question = String.valueOf(payload.getOrDefault("question", "")).trim();
        @SuppressWarnings("unchecked")
        List<String> docIds = (List<String>) payload.getOrDefault("docIds", List.of());
        if (question.isBlank() || docIds.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Debes indicar 'docIds' y 'question'.");
        }

        StringBuilder sb = new StringBuilder();
        for (String id : docIds) {
            Map<String, Object> doc = normalizationService.getDocument(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Documento no encontrado: " + id));
            String text = String.valueOf(doc.getOrDefault("text", ""));
            if (text.length() > 14000) {
                text = text.substring(0, 14000) + "\n...[truncado]";
            }
            sb.append("=== DOCUMENTO ").append(id).append(" (").append(doc.get("title")).append(") ===\n")
              .append(text).append("\n\n");
        }
        sb.append("---\nInstrucción/Pregunta del usuario:\n").append(question);
        String answer = aiAssistantService.transformWithConfiguredAi("chat", sb.toString());
        return Map.of("docIds", docIds, "answer", answer);
    }

    /**
     * Rastrea los PDFs oficiales (en catalán) de material/<asignatura>, los traduce al español técnico
     * y los acomoda al formato web de MiCampus comparándolos con las lecciones existentes.
     */
    @PostMapping("/adapt-material/{subjectCode}")
    public Map<String, Object> adaptOfficialMaterial(
            @PathVariable String subjectCode,
            @RequestBody(required = false) Map<String, String> payload
    ) throws IOException {
        normalizationService.syncAllDocuments();
        String targetUnit = payload != null ? payload.getOrDefault("unit", "").trim().toLowerCase() : "";

        List<Map<String, Object>> docs = normalizationService.listDocuments(subjectCode, targetUnit.isBlank() ? null : targetUnit, "temario_oficial");
        if (docs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No hay PDFs oficiales normalizados para: " + subjectCode);
        }

        List<String> existingLessons = store.read(db -> {
            String subjectId = db.getSubjects().stream()
                    .filter(s -> subjectCode.equalsIgnoreCase(s.getCode()))
                    .map(Subject::getId)
                    .findFirst()
                    .orElse("");
            List<String> list = new ArrayList<>();
            for (Lesson l : db.getLessons()) {
                if (subjectId.equals(l.getSubjectId())) {
                    list.add("[" + l.getUnit() + "] " + l.getTitle());
                }
            }
            return list;
        });

        StringBuilder materialText = new StringBuilder();
        List<String> docIds = new ArrayList<>();
        for (Map<String, Object> summary : docs) {
            String docId = String.valueOf(summary.get("docId"));
            docIds.add(docId);
            Map<String, Object> full = normalizationService.getDocument(docId).orElse(Map.of());
            String txt = String.valueOf(full.getOrDefault("text", ""));
            if (txt.length() > 14000) {
                txt = txt.substring(0, 14000) + "\n...[truncado]";
            }
            materialText.append("=== PDF OFICIAL ").append(docId).append(" (").append(summary.get("title")).append(") ===\n")
                    .append(txt).append("\n\n");
        }

        String prompt = """
                Actúa como diseñador instruccional y traductor técnico bilingüe (catalán -> español) para MiCampus.

                OBJETIVO:
                1. **Rastreo y auditoría:** Analiza el contenido completo de los PDFs oficiales adjuntos (en catalán, organizados por unidades U1, U2, U3, U4 e índice) y compáralo con las lecciones ya publicadas en la web.
                2. **Detección de huecos:** Indica exactamente qué apartados, comandos, ejemplos o conceptos del PDF oficial faltan o están incompletos en la web.
                3. **Traducción técnica al español:** Traduce al español técnico claro y natural todo el contenido relevante del catalán, manteniendo intactos comandos, rutas Linux, directivas de configuración y nombres técnicos.
                4. **Acomodación a la web (Markdown MiCampus):** Redacta el contenido adaptado listo para publicar en el libro interactivo de la web usando:
                   - Encabezados `##` y `###` jerárquicos (compatibles con el índice lateral).
                   - Explicaciones claras, listas con viñetas y bloques de código con comentarios `#`.
                   - Un breve resumen práctico o esquema de relación al final de cada bloque.

                LECCIONES ACTUALES EN LA WEB (%s):
                %s

                TEXTO EXTRAÍDO DE LOS PDFS OFICIALES:
                %s
                """.formatted(
                subjectCode.toUpperCase(),
                existingLessons.isEmpty() ? "(ninguna todavía)" : String.join("\n", existingLessons),
                materialText.toString()
        );

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("subjectCode", subjectCode);
        result.put("unit", targetUnit.isBlank() ? "all" : targetUnit);
        result.put("docIds", docIds);
        result.put("prompt", prompt);

        try {
            String answer = aiAssistantService.transformWithConfiguredAi("chat", prompt);
            result.put("aiStatus", "ok");
            result.put("answer", answer);
        } catch (Exception e) {
            result.put("aiStatus", "not_configured_or_error");
            result.put("aiMessage", e.getMessage());
        }
        return result;
    }
}
