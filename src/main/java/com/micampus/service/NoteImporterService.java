package com.micampus.service;

import com.micampus.model.Lesson;
import com.micampus.model.QuizQuestion;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Script Java determinista que reemplaza el formateo manual con IA y scripts Python:
 * - Lee PDFs (Apache PDFBox), Markdown (.md) o texto (.txt).
 * - Normaliza viñetas y saltos de línea.
 * - Divide automáticamente el documento en lecciones por encabezados (# / ##) o bloques.
 * - Extrae tarjetas de autoevaluación (Pregunta: ... / Respuesta: ...).
 */
@Service
public class NoteImporterService {

    private static final Pattern H1_PATTERN = Pattern.compile("^#\\s+(.+)$");
    private static final Pattern H2_PATTERN = Pattern.compile("^##\\s+(.+)$");
    private static final Pattern HEADING_PATTERN = Pattern.compile("^(#{1,2})\\s+(.+)$");
    private static final Pattern QA_PATTERN = Pattern.compile(
            "(?im)^(?:Pregunta|P|Question|Q)\\s*:\\s*(.+?)\\R+(?:Respuesta|R|Answer|A)\\s*:\\s*(.+)$"
    );

    public List<Lesson> parseFileToLessons(MultipartFile file, String subjectId, String defaultUnit) throws IOException {
        String filename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "apuntes.txt";
        String lower = filename.toLowerCase();

        String rawText;
        if (lower.endsWith(".pdf")) {
            rawText = extractPdfText(file.getBytes());
        } else {
            rawText = new String(file.getBytes(), StandardCharsets.UTF_8);
        }

        String normalized = normalizeMarkdown(rawText);
        return splitIntoLessons(normalized, subjectId, defaultUnit, stripExtension(filename));
    }

    public String extractPdfText(byte[] pdfBytes) throws IOException {
        try (PDDocument document = Loader.loadPDF(pdfBytes)) {
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            return stripper.getText(document);
        }
    }

    /**
     * Normaliza viñetas (•, *, ▪) a listas Markdown limpias (- ) y elimina exceso de líneas en blanco.
     */
    public String normalizeMarkdown(String raw) {
        if (raw == null) return "";
        String[] lines = raw.replace("\r\n", "\n").replace("\r", "\n").split("\n");
        StringBuilder sb = new StringBuilder();
        int emptyCount = 0;

        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                emptyCount++;
                if (emptyCount <= 1) {
                    sb.append("\n");
                }
                continue;
            }
            emptyCount = 0;

            // Convertir viñetas comunes de PDF/Word a Markdown estándar
            if (trimmed.matches("^[•▪◦‣–—*]\\s+.+")) {
                String indent = line.substring(0, line.indexOf(trimmed.charAt(0)));
                String cleanIndent = indent.length() >= 2 ? "  " : "";
                sb.append(cleanIndent).append("- ").append(trimmed.substring(1).trim()).append("\n");
            } else {
                sb.append(line).append("\n");
            }
        }
        return sb.toString().trim();
    }

    public List<Lesson> splitIntoLessons(String markdown, String subjectId, String unit, String fallbackTitle) {
        List<Lesson> result = new ArrayList<>();
        String safeUnit = (unit == null || unit.isBlank()) ? "Apuntes Importados" : unit.trim();

        String[] lines = markdown.split("\n");
        boolean hasH1 = false;
        boolean hasH2 = false;
        boolean inFence = false;
        for (String line : lines) {
            String t = line.trim();
            if (t.startsWith("```")) {
                inFence = !inFence;
                continue;
            }
            if (inFence) continue;
            if (H1_PATTERN.matcher(t).matches()) hasH1 = true;
            if (H2_PATTERN.matcher(t).matches()) hasH2 = true;
        }

        // Si el documento sigue el modelo Libro (# Bloque y ## Lección), # define la unidad y ## cada lección
        boolean hierarchicalBook = hasH1 && hasH2;

        String currentUnit = safeUnit;
        String currentTitle = null;
        StringBuilder currentBody = new StringBuilder();
        int order = 1;
        inFence = false;

        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.startsWith("```")) {
                inFence = !inFence;
                currentBody.append(line).append("\n");
                continue;
            }

            if (!inFence && hierarchicalBook) {
                Matcher h1 = H1_PATTERN.matcher(trimmed);
                if (h1.matches()) {
                    if (currentTitle != null && !currentBody.toString().isBlank()) {
                        result.add(buildLesson(subjectId, currentUnit, currentTitle, currentBody.toString().trim(), order++));
                    }
                    currentUnit = h1.group(1).trim();
                    currentTitle = null;
                    currentBody.setLength(0);
                    continue;
                }
                Matcher h2 = H2_PATTERN.matcher(trimmed);
                if (h2.matches()) {
                    if (currentTitle != null && !currentBody.toString().isBlank()) {
                        result.add(buildLesson(subjectId, currentUnit, currentTitle, currentBody.toString().trim(), order++));
                    }
                    currentTitle = h2.group(1).trim();
                    currentBody.setLength(0);
                    currentBody.append(line).append("\n");
                    continue;
                }
                currentBody.append(line).append("\n");
                continue;
            }

            if (!inFence) {
                Matcher m = HEADING_PATTERN.matcher(trimmed);
                if (m.matches()) {
                    if (currentTitle != null && !currentBody.toString().isBlank()) {
                        result.add(buildLesson(subjectId, currentUnit, currentTitle, currentBody.toString().trim(), order++));
                    }
                    currentTitle = m.group(2).trim();
                    currentBody.setLength(0);
                    currentBody.append(line).append("\n");
                    continue;
                }
            }
            currentBody.append(line).append("\n");
        }

        if (currentTitle != null && !currentBody.toString().isBlank()) {
            result.add(buildLesson(subjectId, currentUnit, currentTitle, currentBody.toString().trim(), order));
        }

        // Si el archivo no tenía encabezados Markdown, crear una única lección completa
        if (result.isEmpty() && !markdown.isBlank()) {
            result.add(buildLesson(subjectId, safeUnit, fallbackTitle, "# " + fallbackTitle + "\n\n" + markdown, 1));
        }

        return result;
    }

    private Lesson buildLesson(String subjectId, String unit, String title, String content, int order) {
        Lesson lesson = new Lesson();
        lesson.setId(UUID.randomUUID().toString().substring(0, 8));
        lesson.setSubjectId(subjectId);
        lesson.setUnit(unit);
        lesson.setTitle(title);
        lesson.setContent(content);
        lesson.setSummary(buildSummary(content));
        lesson.setOrderIndex(order);
        lesson.setQuiz(extractQuiz(content));
        return lesson;
    }

    private String buildSummary(String content) {
        String plain = content.replaceAll("(?m)^#+\\s+.*$", "")
                .replaceAll("[*_`>-]", "")
                .replaceAll("\\s+", " ")
                .trim();
        if (plain.length() <= 140) return plain;
        return plain.substring(0, 137) + "...";
    }

    public List<QuizQuestion> extractQuiz(String content) {
        List<QuizQuestion> questions = new ArrayList<>();
        Matcher matcher = QA_PATTERN.matcher(content);
        while (matcher.find()) {
            questions.add(new QuizQuestion(matcher.group(1).trim(), matcher.group(2).trim()));
        }
        return questions;
    }

    private String stripExtension(String name) {
        int idx = name.lastIndexOf('.');
        return idx > 0 ? name.substring(0, idx) : name;
    }
}
