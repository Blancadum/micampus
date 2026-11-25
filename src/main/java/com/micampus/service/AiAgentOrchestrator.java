package com.micampus.service;

import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.repository.CampusStore;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

/**
 * Orquestador de agentes especializados de MiCampus:
 * - redactor-jefe: coordina la línea editorial, evita solapamientos y valida la
 * versión final.
 * - auditor: rastrea PDFs oficiales (catalán -> español) y detecta huecos vs
 * web.
 * - escritor: maqueta la salida en Markdown jerárquico (## / ###) para el libro
 * web.
 * - estilista: revisa jerarquía visual, encabezados (##/###), sin números
 * manuales ni duplicados, y bloques de código.
 * - glosario: extrae conceptos clave de cada unidad para el glosario y la barra
 * de búsqueda.
 * - eac-coach: analiza enunciados, entregas y soluciones para fichas/tutorías
 * de EAC.
 * - sensei-agenda: coordina entregas urgentes y publicación de soluciones
 * (gradeDate).
 */
@Service
public class AiAgentOrchestrator {

    private final DocumentNormalizationService normalizationService;
    private final AiAssistantService aiAssistantService;
    private final CalendarAndCoachService calendarAndCoachService;
    private final CampusStore store;

    public AiAgentOrchestrator(
            DocumentNormalizationService normalizationService,
            AiAssistantService aiAssistantService,
            CalendarAndCoachService calendarAndCoachService,
            CampusStore store) {
        this.normalizationService = normalizationService;
        this.aiAssistantService = aiAssistantService;
        this.calendarAndCoachService = calendarAndCoachService;
        this.store = store;
    }

    public List<Map<String, Object>> listAgents() {
        return List.of(
                Map.of(
                        "id", "redactor-jefe",
                        "name", "Redactor Jefe",
                        "role",
                        "Coordina a Auditor, Escritor y Estilista, evita solapamientos entre lecciones y valida la versión final.",
                        "inputs", List.of("subjectCode", "unit (ej. u1)", "goal (opcional)")),
                Map.of(
                        "id", "auditor",
                        "name", "Auditor",
                        "role",
                        "Rastrea PDFs oficiales en catalán, detecta huecos frente a la web y traduce al español técnico.",
                        "inputs", List.of("subjectCode", "unit (ej. u1)")),
                Map.of(
                        "id", "escritor",
                        "name", "Escritor",
                        "role",
                        "Convierte contenido técnico en lecciones Markdown con niveles ## / ### y bloques de código comentados.",
                        "inputs", List.of("rawContent", "subjectCode", "unit")),
                Map.of(
                        "id", "estilista",
                        "name", "Estilista",
                        "role",
                        "Audita y pule el estilo visual del Libro MiCampus: sin títulos duplicados, sin números manuales, solo ##/### y bloques de código limpios.",
                        "inputs", List.of("subjectCode", "unit", "rawContent (opcional)")),
                Map.of(
                        "id", "glosario",
                        "name", "Glosario y Conceptos",
                        "role",
                        "Extrae conceptos clave de cada unidad para destacarlos en el glosario y en la barra de búsqueda (search_index.json).",
                        "inputs", List.of("subjectCode", "unit (ej. u1)")),
                Map.of(
                        "id", "eac-coach",
                        "name", "Tutor de EACs",
                        "role",
                        "Analiza enunciados, entregas y soluciones normalizadas para generar fichas o revisar entregas.",
                        "inputs", List.of("subjectCode", "eacId", "question")),
                Map.of(
                        "id", "sensei-agenda",
                        "name", "Sensei de Agenda y Soluciones",
                        "role",
                        "Coordina entregas pendientes, colisiones y fechas de publicación de soluciones (gradeDate).",
                        "inputs", List.of("question (opcional)")));
    }

    public Map<String, Object> runMaterialPipeline(String subjectCode, String unit) throws IOException {
        Map<String, Object> stage1 = runMaterialAuditor(subjectCode, unit);
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("pipeline", "auditor -> escritor");
        out.put("subjectCode", subjectCode);
        out.put("unit", unit);
        out.put("docIds", stage1.get("docIds"));
        out.put("stage1", stage1);

        if (!"ok".equals(stage1.get("aiStatus"))) {
            out.put("aiStatus", stage1.get("aiStatus"));
            out.put("aiMessage", stage1.get("aiMessage"));
            out.put("stage2PromptTemplate", buildBookWriterPrompt(subjectCode, unit, "<SALIDA_DEL_AUDITOR>"));
            return out;
        }

        String auditedSpanish = String.valueOf(stage1.getOrDefault("answer", ""));
        int sourceWords = aiAssistantService.countWords(auditedSpanish);
        Map<String, Object> stage2 = runBookWriter(subjectCode, unit, auditedSpanish);
        out.put("stage2", stage2);
        out.put("aiStatus", stage2.get("aiStatus"));
        if (stage2.containsKey("aiMessage")) {
            out.put("aiMessage", stage2.get("aiMessage"));
        }
        if (stage2.containsKey("answer")) {
            String writerMarkdown = String.valueOf(stage2.get("answer"));
            int webWords = aiAssistantService.countWords(writerMarkdown);
            double ratio = sourceWords > 0 ? Math.round((webWords * 100.0) / sourceWords) / 100.0 : 1.0;
            out.put("wordMetrics", Map.of(
                    "sourceWords", sourceWords,
                    "webWords", webWords,
                    "densityRatio", ratio
            ));
            out.put("finalMarkdown", writerMarkdown);
        }
        return out;
    }

    private String defaultSubjectCode() {
        return store.read(db -> {
            List<Subject> subjects = db.getSubjects();
            if (subjects == null || subjects.isEmpty()) {
                return "";
            }
            Subject first = subjects.get(0);
            if (first.getCode() != null && !first.getCode().isBlank()) {
                return first.getCode().trim().toLowerCase();
            }
            return first.getId() != null ? first.getId().trim().toLowerCase() : "";
        });
    }

    public Map<String, Object> runAgent(String agentId, Map<String, Object> params) throws IOException {
        String id = agentId == null ? "" : agentId.trim().toLowerCase();
        Map<String, Object> safeParams = params != null ? params : Map.of();
        Object rawSubject = safeParams.get("subjectCode");
        String subjectCode = (rawSubject == null || String.valueOf(rawSubject).isBlank())
                ? defaultSubjectCode()
                : String.valueOf(rawSubject).trim().toLowerCase();
        String unit = String.valueOf(safeParams.getOrDefault("unit", "u1"));

        return switch (id) {
            case "redactor-jefe", "chief-editor" -> runRedactorJefe(
                    subjectCode,
                    unit,
                    String.valueOf(safeParams.getOrDefault("goal",
                            "Planifica la mejora editorial de la unidad, coordina auditor -> escritor -> estilista y valida coherencia.")));
            case "auditor", "material-auditor" -> runMaterialAuditor(subjectCode, unit);
            case "escritor", "book-writer" -> runBookWriter(
                    subjectCode,
                    unit,
                    String.valueOf(safeParams.getOrDefault("rawContent", "")));
            case "corregir", "apply-suggestions" -> runApplySuggestions(
                    subjectCode,
                    unit,
                    String.valueOf(safeParams.getOrDefault("suggestions", "")),
                    String.valueOf(safeParams.getOrDefault("currentContent", "")));
            case "estilista", "stylist" -> runEstilista(
                    subjectCode,
                    unit,
                    String.valueOf(safeParams.getOrDefault("rawContent", "")));
            case "glosario", "concept-indexer" -> runGlosario(subjectCode, unit);
            case "eac-coach" -> runEacCoach(
                    subjectCode,
                    String.valueOf(safeParams.getOrDefault("eacId", "eac1")),
                    String.valueOf(safeParams.getOrDefault("question",
                            "Genera la ficha pedagógica y verifica criterios clave.")));
            case "sensei-agenda" -> runSenseiAgenda(
                    String.valueOf(safeParams.getOrDefault("question",
                            "Resume entregas urgentes y próximas publicaciones de soluciones.")));
            default -> throw new IllegalArgumentException("Agente desconocido: " + agentId);
        };
    }

    private Map<String, Object> runMaterialAuditor(String subjectCode, String unit) throws IOException {
        List<Map<String, Object>> docs = normalizationService.listDocuments(
                subjectCode,
                (unit == null || unit.isBlank()) ? null : unit,
                "temario_oficial");
        List<String> currentLessons = listSubjectLessons(subjectCode);
        StringBuilder pdfBundle = new StringBuilder();
        List<String> docIds = new ArrayList<>();

        for (Map<String, Object> d : docs) {
            String docId = String.valueOf(d.get("docId"));
            docIds.add(docId);
            String txt = String
                    .valueOf(normalizationService.getDocument(docId).orElse(Map.of()).getOrDefault("text", ""));
            pdfBundle.append("=== PDF OFICIAL ").append(docId).append(" ===\n").append(txt).append("\n\n");
        }

        String prompt = """
                [AGENTE: MATERIAL-AUDITOR]
                Eres un auditor académico y traductor técnico (catalán -> español).
                OBJETIVO PRIORITARIO: ofrecer una comparativa clara y concisa sin volcar todo el texto redactado.
                TAREA:
                1. Compara el PDF oficial completo de %s (%s) con las lecciones actuales de la web.
                2. Enumera de forma estructurada y breve qué apartados, conceptos, comandos, tablas o ejemplos faltan o están incompletos en la web (refiriéndote a ellos sin desarrollar ni formatear toda la lección).
                3. Termina preguntando explícitamente al usuario si quiere implementar estas mejoras en la lección de la web.

                LECCIONES EN LA WEB:
                %s

                PDF OFICIAL NORMALIZADO:
                %s
                """
                .formatted(
                        subjectCode.toUpperCase(),
                        unit,
                        currentLessons.isEmpty() ? "(ninguna)" : String.join("\n", currentLessons),
                        pdfBundle.isEmpty() ? "(sin PDFs para esa unidad)" : pdfBundle.toString());

        return executePrompt("auditor", prompt, Map.of("docIds", docIds));
    }

    private Map<String, Object> runBookWriter(String subjectCode, String unit, String rawContent) {
        String prompt = buildBookWriterPrompt(subjectCode, unit, rawContent);
        return executePrompt("escritor", prompt, Map.of("subjectCode", subjectCode, "unit", unit));
    }

    private Map<String, Object> runApplySuggestions(String subjectCode, String unit, String suggestions, String currentContent) throws IOException {
        List<Map<String, Object>> docs = normalizationService.listDocuments(
                subjectCode,
                (unit == null || unit.isBlank()) ? null : unit,
                "temario_oficial");
        StringBuilder pdfBundle = new StringBuilder();
        for (Map<String, Object> d : docs) {
            String docId = String.valueOf(d.get("docId"));
            String txt = String
                    .valueOf(normalizationService.getDocument(docId).orElse(Map.of()).getOrDefault("text", ""));
            pdfBundle.append("=== PDF OFICIAL ").append(docId).append(" ===\n").append(txt).append("\n\n");
        }

        String prompt = """
                [AGENTE: COMPLETAR-WEB]
                Eres redactor técnico de MiCampus para %s (%s).
                TAREA: Completa y mejora el contenido actual de la lección incorporando TODAS las mejoras de la comparativa y apoyándote en el PDF oficial completo.
                REGLAS:
                1. Conserva lo que ya está bien en el contenido actual y añade o amplía lo que falta con rigor técnico en español.
                2. Usa solo `##` y `###` (sin título `#` inicial ni números manuales en encabezados).
                3. Devuelve ÚNICAMENTE el Markdown final completo de la lección para guardarlo en la web, sin comentarios previos.

                CONTENIDO ACTUAL DE LA WEB:
                %s

                COMPARATIVA / SUGERENCIAS DEL AUDITOR:
                %s

                PDF OFICIAL COMPLETO DE REFERENCIA:
                %s
                """.formatted(
                subjectCode.toUpperCase(),
                unit,
                (currentContent == null || currentContent.isBlank()) ? "(lección vacía, créala completa)" : currentContent,
                suggestions == null ? "" : suggestions,
                pdfBundle.isEmpty() ? "(sin PDFs para esa unidad)" : pdfBundle.toString());
        return executePrompt("escritor", prompt, Map.of("subjectCode", subjectCode, "unit", unit));
    }

    private String buildBookWriterPrompt(String subjectCode, String unit, String rawContent) {
        return """
                [AGENTE: ESCRITOR]
                Eres redactor técnico y pedagógico de MiCampus para %s (%s).
                Transforma el contenido auditado siguiente en Markdown limpio siguiendo las reglas exactas del Libro de MiCampus:
                1. **Fidelidad de extensión (NO resumas en exceso):** conserva aproximadamente la misma cantidad de palabras y detalle técnico que el PDF/material original, desarrollando explicaciones completas, tablas comparativas y casos de uso.
                2. **Pulido didáctico y pedagógico:** explica con claridad, incluye de vez en cuando analogías prácticas (`> 💡 **Analogía:** ...`) y mapas conceptuales o diagramas de flujo ASCII cuando faciliten la comprensión.
                3. NO repitas el título principal de la lección al inicio (`#`, `##` o `###`): la web ya lo renderiza automáticamente con su número jerárquico (`X.Y.`).
                4. NO pongas números manuales en los encabezados (`## 1.`, `### 8.1`, etc.): la web calcula automáticamente `X.Y.1.`, `X.Y.2.` según el índice lateral.
                5. Usa solo `##` (apartados principales de la lección) y `###` (subapartados). Evita `####`.
                6. Si es una lección de Introducción de bloque/unidad: NO pongas `## Visión general del bloque` ni saludos tipo `Bienvenido a la Unidad X...`; la web muestra el mapa conceptual justo debajo del título principal y pasa directo al listado de contenidos.
                7. Incluye bloques de código con lenguaje explícito (`bash`, `apache`, `xml`, `yaml`, etc.) y comentarios `#` breves y claros.
                8. Añade al final un `## Resumen práctico` en 3-5 puntos clave.

                CONTENIDO BASE:
                %s
                """
                .formatted(subjectCode.toUpperCase(), unit, rawContent);
    }

    private Map<String, Object> runGlosario(String subjectCode, String unit) throws IOException {
        List<Map<String, Object>> docs = normalizationService.listDocuments(
                subjectCode,
                (unit == null || unit.isBlank()) ? null : unit,
                "temario_oficial");
        StringBuilder pdfBundle = new StringBuilder();
        List<String> docIds = new ArrayList<>();
        for (Map<String, Object> d : docs) {
            String docId = String.valueOf(d.get("docId"));
            docIds.add(docId);
            String txt = String
                    .valueOf(normalizationService.getDocument(docId).orElse(Map.of()).getOrDefault("text", ""));
            if (txt.length() > 12000)
                txt = txt.substring(0, 12000) + "\n...[truncado]";
            pdfBundle.append("### ").append(d.get("title")).append(" (").append(docId).append(")\n")
                    .append(txt).append("\n\n");
        }
        List<String> currentLessons = listSubjectLessons(subjectCode);
        String prompt = """
                [AGENTE: GLOSARIO]
                Eres el indexador de conceptos clave de MiCampus para %s (%s).
                TAREA:
                1. Analiza el temario web y los PDFs oficiales de la unidad %s.
                2. Extrae los 8-12 conceptos técnicos, comandos, protocolos o siglas más importantes (ej. VirtualHost, mod_ssl, PASV, FTPS, .htpasswd).
                3. Devuelve DOS bloques claros:
                   - **Parte A (Glosario visual):** tabla o lista en español con Término, Definición breve (1-2 frases) y Comando/Ejemplo.
                   - **Parte B (JSON para barra de búsqueda `search_index.json`):** array JSON válido donde cada concepto tenga:
                     `{ "id": "...", "title": "...", "type": "Glosario", "url": "/asignatura/%s", "keywords": ["..."], "snippet": "..." }`

                LECCIONES EN WEB:
                %s

                MATERIAL OFICIAL NORMALIZADO:
                %s
                """
                .formatted(
                        subjectCode.toUpperCase(),
                        unit,
                        unit,
                        subjectCode.toLowerCase(),
                        currentLessons.isEmpty() ? "(ninguna)" : String.join("\n", currentLessons),
                        pdfBundle.isEmpty() ? "(sin PDFs para esa unidad)" : pdfBundle.toString());
        return executePrompt("glosario", prompt, Map.of("docIds", docIds, "subjectCode", subjectCode, "unit", unit));
    }

    private Map<String, Object> runEstilista(String subjectCode, String unit, String rawContent) {
        String target = (rawContent != null && !rawContent.isBlank())
                ? rawContent
                : String.join("\n", listSubjectLessons(subjectCode));
        String prompt = """
                [AGENTE: ESTILISTA]
                Eres el Estilista editorial y visual del Libro de MiCampus para %s (%s).
                TAREA: Revisa y pule el formato y estilo del contenido siguiente sin recortar ni resumir su extensión ni perder rigor técnico:
                1. Elimina cualquier título duplicado al inicio (`#`, `##` o `###`) que repita el nombre de la lección.
                2. Quita toda numeración manual de los encabezados (`## 1.`, `### 8.1`, etc.): la web calcula `X.Y.Z.` automáticamente.
                3. Normaliza los niveles a solo `##` y `###` (convierte `####` a `###`).
                4. Si es una lección de Introducción, elimina cualquier `## Visión general del bloque` y saludos tipo `Bienvenido a la Unidad X...` para pasar directo al listado tras el mapa conceptual.
                5. Revisa que todos los bloques de código lleven lenguaje (`bash`, `apache`, `xml`, `yaml`) y comentarios `#` breves.
                6. Mejora la legibilidad pedagógica (analogías puntuales `> 💡 **Analogía:** ...` o diagramas ASCII si aportan claridad) manteniendo la misma densidad de palabras aproximada.
                7. Devuelve primero una lista breve de **ajustes aplicados** y después el **Markdown final pulido**.

                CONTENIDO A ESTILIZAR:
                %s
                """
                .formatted(subjectCode.toUpperCase(), unit, target.isBlank() ? "(sin contenido)" : target);
        return executePrompt("estilista", prompt, Map.of("subjectCode", subjectCode, "unit", unit));
    }

    private Map<String, Object> runRedactorJefe(String subjectCode, String unit, String goal) throws IOException {
        List<Map<String, Object>> docs = normalizationService.listDocuments(
                subjectCode,
                (unit == null || unit.isBlank()) ? null : unit,
                "temario_oficial");
        List<String> docIds = new ArrayList<>();
        StringBuilder pdfSummary = new StringBuilder();
        for (Map<String, Object> d : docs) {
            String docId = String.valueOf(d.get("docId"));
            docIds.add(docId);
            String txt = String
                    .valueOf(normalizationService.getDocument(docId).orElse(Map.of()).getOrDefault("text", ""));
            if (txt.length() > 6000)
                txt = txt.substring(0, 6000) + "\n...[truncado]";
            pdfSummary.append("=== PDF ").append(docId).append(" ===\n").append(txt).append("\n\n");
        }
        List<String> currentLessons = listSubjectLessons(subjectCode);
        String prompt = """
                [AGENTE: REDACTOR-JEFE]
                Eres el Redactor Jefe de MiCampus para %s (%s).
                OBJETIVO: %s

                TAREA DE COORDINACIÓN EDITORIAL:
                1. Revisa el índice actual en la web y los PDFs oficiales de la unidad %s.
                2. Define el plan de trabajo exacto para tu equipo:
                   - Qué debe verificar/traducir el **Auditor**.
                   - Qué debe redactar el **Escritor** (evitando solapamientos con otras unidades).
                   - Qué debe pulir el **Estilista** (sin títulos duplicados, sin números manuales, solo `##` y `###`, bloques de código limpios).
                   - Qué términos debe extraer **Glosario** para la barra de búsqueda.
                3. Cierra con una checklist de validación final (5 puntos).

                LECCIONES ACTUALES EN LA WEB:
                %s

                RESUMEN DE PDFs OFICIALES:
                %s
                """
                .formatted(
                        subjectCode.toUpperCase(),
                        unit,
                        goal,
                        unit,
                        currentLessons.isEmpty() ? "(ninguna)" : String.join("\n", currentLessons),
                        pdfSummary.isEmpty() ? "(sin PDFs para esa unidad)" : pdfSummary.toString());
        return executePrompt("redactor-jefe", prompt,
                Map.of("docIds", docIds, "subjectCode", subjectCode, "unit", unit));
    }

    private Map<String, Object> runEacCoach(String subjectCode, String eacId, String question) throws IOException {
        List<Map<String, Object>> docs = normalizationService.listDocuments(subjectCode, eacId, null);
        StringBuilder eacBundle = new StringBuilder();
        List<String> docIds = new ArrayList<>();

        for (Map<String, Object> d : docs) {
            if ("temario_oficial".equals(d.get("kind")))
                continue;
            String docId = String.valueOf(d.get("docId"));
            docIds.add(docId);
            String txt = String
                    .valueOf(normalizationService.getDocument(docId).orElse(Map.of()).getOrDefault("text", ""));
            if (txt.length() > 10000)
                txt = txt.substring(0, 10000) + "\n...[truncado]";
            eacBundle.append("=== ").append(d.get("kind")).append(" | ").append(docId).append(" ===\n")
                    .append(txt).append("\n\n");
        }

        String prompt = """
                [AGENTE: EAC-COACH]
                Eres tutor práctico de MiCampus para %s (%s).
                DOCUMENTOS DISPONIBLES:
                %s

                PETICIÓN:
                %s
                """.formatted(
                subjectCode.toUpperCase(),
                eacId.toUpperCase(),
                eacBundle.isEmpty() ? "(sin documentos de esta EAC todavía)" : eacBundle.toString(),
                question);

        return executePrompt("eac-coach", prompt, Map.of("docIds", docIds));
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> runSenseiAgenda(String question) {
        Map<String, Object> report = calendarAndCoachService.buildCoachReport();
        StringBuilder agenda = new StringBuilder();
        agenda.append("Fecha actual: ").append(report.get("generatedAt")).append("\n");
        for (String key : List.of("overdue", "urgent", "upcoming")) {
            List<Map<String, Object>> items = (List<Map<String, Object>>) report.getOrDefault(key, List.of());
            agenda.append(key.toUpperCase()).append(": ").append(items).append("\n");
        }
        agenda.append("PUBLICACIÓN DE SOLUCIONES (gradeDate): ")
                .append(report.getOrDefault("solutionReleases", List.of())).append("\n");

        String prompt = """
                [AGENTE: SENSEI-AGENDA]
                Eres Sensei, coordinador académico de calendario y soluciones.
                ESTADO ACTUAL DEL RADAR:
                %s

                PETICIÓN:
                %s
                """.formatted(agenda.toString(), question);

        return executePrompt("sensei-agenda", prompt, Map.of());
    }

    public Map<String, Object> chatWithAgent(
            String agentId,
            String subjectCode,
            String unit,
            List<Map<String, String>> messages) throws IOException {
        String id = agentId == null ? "auditor" : agentId.trim().toLowerCase();
        String safeSubject = (subjectCode == null || subjectCode.isBlank()) ? defaultSubjectCode()
                : subjectCode.trim().toLowerCase();
        String safeUnit = (unit == null || unit.isBlank()) ? "u1" : unit.trim().toLowerCase();

        String roleGuide = switch (id) {
            case "redactor-jefe", "chief-editor" ->
                """
                        Eres el REDACTOR JEFE de MiCampus para %s (%s).
                        Coordinas a Auditor, Escritor, Estilista y Glosario: decides prioridades, evitas solapamientos entre lecciones, marcas directrices editoriales y validas la calidad final.
                        """
                        .formatted(safeSubject.toUpperCase(), safeUnit);
            case "auditor", "material-auditor" ->
                """
                        Eres el agente AUDITOR de MiCampus para %s (%s).
                        Tu foco: contrastar el temario web con los PDFs oficiales (catalán -> español técnico) y detectar qué contenidos faltan o están incompletos.
                        REGLAS DE RESPUESTA EN EL CHAT:
                        - Haz una comparativa clara y concisa refiriéndote a los apartados, conceptos, comandos o ejemplos que faltan, SIN redactar ni volcar el contenido completo formateado en el chat.
                        - Termina siempre preguntando al usuario si quiere implementar esas mejoras en la lección de la web.
                        """
                        .formatted(safeSubject.toUpperCase(), safeUnit);
            case "escritor", "book-writer" -> """
                    Eres el agente ESCRITOR de MiCampus para %s (%s).
                    Reglas estrictas del Libro de MiCampus:
                    - NO repitas el título de la lección al inicio (#, ##, ###).
                    - NO pongas números manuales en encabezados (la web calcula X.Y.1.).
                    - Usa solo ## y ### (evita ####).
                    - En introducciones, empieza por `## Visión general del bloque`.
                    - Bloques de código con lenguaje y comentarios `#` claros.
                    """.formatted(safeSubject.toUpperCase(), safeUnit);
            case "glosario", "concept-indexer" ->
                """
                        Eres el agente GLOSARIO de MiCampus para %s (%s).
                        Extraes conceptos clave, comandos y siglas con definición breve y formato JSON compatible con `search_index.json`.
                        """
                        .formatted(safeSubject.toUpperCase(), safeUnit);
            case "estilista", "stylist" ->
                """
                        Eres el agente ESTILISTA de MiCampus para %s (%s).
                        Pules el formato y la jerarquía visual de las lecciones: eliminas títulos duplicados y números manuales, dejas solo ## y ###, aseguras `## Visión general del bloque` en introducciones y limpias bloques de código.
                        """
                        .formatted(safeSubject.toUpperCase(), safeUnit);
            case "eac-coach" -> "Eres el agente TUTOR DE EACs de MiCampus para " + safeSubject.toUpperCase()
                    + ". Ayudas con criterios, fichas y pasos prácticos.";
            case "sensei-agenda" ->
                "Eres SENSEI DE AGENDA de MiCampus. Ayudas a priorizar entregas, colisiones y fechas de solución (gradeDate).";
            default ->
                "Eres un asistente académico de MiCampus para " + safeSubject.toUpperCase() + " (" + safeUnit + ").";
        };

        StringBuilder docContext = new StringBuilder();
        if (List.of("auditor", "material-auditor", "escritor", "book-writer", "glosario", "concept-indexer")
                .contains(id)) {
            if ("auditor".equals(id) || "material-auditor".equals(id)) {
                List<String> currentLessons = listSubjectLessons(safeSubject);
                docContext.append("\n[LECCIONES ACTUALES EN LA WEB]\n")
                        .append(currentLessons.isEmpty() ? "(ninguna)" : String.join("\n", currentLessons))
                        .append("\n");
            }
            List<Map<String, Object>> docs = normalizationService.listDocuments(safeSubject, safeUnit,
                    "temario_oficial");
            for (Map<String, Object> d : docs) {
                String docId = String.valueOf(d.get("docId"));
                String txt = String
                        .valueOf(normalizationService.getDocument(docId).orElse(Map.of()).getOrDefault("text", ""));
                docContext.append("\n[PDF ").append(docId).append("]\n").append(txt).append("\n");
            }
        }

        StringBuilder history = new StringBuilder();
        if (messages != null) {
            int start = Math.max(0, messages.size() - 10);
            for (int i = start; i < messages.size(); i++) {
                Map<String, String> m = messages.get(i);
                String role = "assistant".equalsIgnoreCase(m.get("role")) ? "IA" : "USUARIO";
                String content = String.valueOf(m.getOrDefault("content", ""));
                if (content.length() > 4000)
                    content = content.substring(0, 4000) + "\n...[truncado]";
                history.append(role).append(": ").append(content).append("\n\n");
            }
        }

        String fullPrompt = """
                [CHAT INTERACTIVO - AGENTE: %s]
                %s
                %s
                CONVERSACIÓN (responde de forma clara, directa y accionable en español al último mensaje del USUARIO):
                %s
                """.formatted(
                id.toUpperCase(),
                roleGuide,
                docContext.isEmpty() ? "" : "CONTEXTO OFICIAL DE REFERENCIA:\n" + docContext,
                history.toString());

        return executePrompt(id, fullPrompt, Map.of("subjectCode", safeSubject, "unit", safeUnit));
    }

    private Map<String, Object> executePrompt(String agentId, String prompt, Map<String, Object> extra) {
        Map<String, Object> res = new LinkedHashMap<>();
        res.put("agentId", agentId);
        res.putAll(extra);
        res.put("prompt", prompt);
        try {
            String answer = aiAssistantService.transformWithConfiguredAi("chat", prompt);
            res.put("aiStatus", "ok");
            res.put("answer", answer);
        } catch (Exception e) {
            res.put("aiStatus", "not_configured_or_error");
            res.put("aiMessage", e.getMessage());
        }
        return res;
    }

    private List<String> listSubjectLessons(String subjectCode) {
        return store.read(db -> {
            String subId = db.getSubjects().stream()
                    .filter(s -> subjectCode.equalsIgnoreCase(s.getCode()))
                    .map(Subject::getId)
                    .findFirst()
                    .orElse("");
            List<String> list = new ArrayList<>();
            for (Lesson l : db.getLessons()) {
                if (subId.equals(l.getSubjectId())) {
                    list.add("[" + l.getUnit() + "] " + l.getTitle());
                }
            }
            return list;
        });
    }
}
