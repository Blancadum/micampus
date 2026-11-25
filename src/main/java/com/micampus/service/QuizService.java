package com.micampus.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.GeneratedQuiz;
import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.repository.CampusStore;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Genera quizzes dinámicos con la IA configurada del usuario, los persiste por asignatura
 * en SQLite (CampusStore) y permite listarlos, renombrarlos y eliminarlos.
 */
@Service
public class QuizService {

    private static final DateTimeFormatter TITLE_TIME_FMT = DateTimeFormatter.ofPattern("dd/MM HH:mm");

    private final CampusStore store;
    private final AiAssistantService aiAssistantService;
    private final ObjectMapper mapper = new ObjectMapper();

    public QuizService(CampusStore store, AiAssistantService aiAssistantService) {
        this.store = store;
        this.aiAssistantService = aiAssistantService;
    }

    public List<GeneratedQuiz> listForSubject(String subjectId) {
        return store.read(db -> db.getQuizzes().stream()
                .filter(q -> subjectId == null || subjectId.isBlank() || subjectId.equals(q.getSubjectId()))
                .toList());
    }

    public GeneratedQuiz generateAndSaveQuiz(String subjectQuery, String unitQuery, String source, int requestedCount)
            throws IOException, InterruptedException {
        return generateAndSaveQuiz(subjectQuery, unitQuery, source, requestedCount, "repaso");
    }

    public GeneratedQuiz generateAndSaveQuiz(
            String subjectQuery,
            String unitQuery,
            String source,
            int requestedCount,
            String mode
    ) throws IOException, InterruptedException {
        return generateAndSaveQuiz(subjectQuery, unitQuery, source, requestedCount, mode, "");
    }

    public GeneratedQuiz generateAndSaveQuiz(
            String subjectQuery,
            String unitQuery,
            String source,
            int requestedCount,
            String mode,
            String ownerId
    ) throws IOException, InterruptedException {
        int count = Math.max(1, Math.min(requestedCount > 0 ? requestedCount : 3, 8));
        Subject subject = resolveSubject(subjectQuery);
        if (subject == null) {
            throw new IllegalArgumentException("No hay ninguna asignatura disponible para generar el quiz.");
        }

        List<Lesson> matchingLessons = store.read(db -> db.getLessons().stream()
                .filter(l -> subject.getId().equals(l.getSubjectId()))
                .filter(l -> unitQuery == null || unitQuery.isBlank()
                        || (l.getUnit() != null && l.getUnit().toLowerCase(Locale.ROOT).contains(unitQuery.trim().toLowerCase(Locale.ROOT))))
                .toList());

        if (matchingLessons.isEmpty()) {
            matchingLessons = store.read(db -> db.getLessons().stream()
                    .filter(l -> subject.getId().equals(l.getSubjectId()))
                    .toList());
        }
        if (matchingLessons.isEmpty()) {
            throw new IllegalArgumentException("La asignatura " + subject.getTitle() + " aún no tiene lecciones.");
        }

        String resolvedUnit = (unitQuery != null && !unitQuery.isBlank())
                ? matchingLessons.get(0).getUnit()
                : "Toda la asignatura";

        StringBuilder context = new StringBuilder();
        for (Lesson l : matchingLessons) {
            context.append("## ").append(l.getTitle()).append("\n");
            String body = l.getContent() != null && !l.getContent().isBlank() ? l.getContent() : l.getSummary();
            if (body != null) {
                context.append(body).append("\n\n");
            }
        }
        String excerpt = aiAssistantService.extractRelevantExcerpts(
                context.toString(),
                subject.getTitle() + " " + resolvedUnit + " " + (mode != null ? mode : ""),
                11_000
        );

        String modeHint = switch ((mode != null ? mode : "").trim().toLowerCase(Locale.ROOT)) {
            case "examen", "dificil" -> "Enfoque de EXAMEN TÉCNICO exigente: preguntas de configuración, comandos exactos y casos límite.";
            case "practico", "casos" -> "Enfoque de CASOS PRÁCTICOS reales: escenarios de despliegue, errores frecuentes y resolución.";
            default -> "Enfoque de REPASO RÁPIDO gamificado: conceptos clave claros y comparativas directas.";
        };

        String prompt = """
                Eres profesor de "%s" (%s). A partir del siguiente temario, genera exactamente %d preguntas tipo test
                prácticas y variadas en español. %s
                Devuelve ÚNICAMENTE un array JSON válido (sin texto ni markdown alrededor) con este formato:
                [
                  {
                    "question": "Enunciado claro de la pregunta (máximo 220 caracteres)",
                    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
                    "correctIndex": 0,
                    "explanation": "Explicación breve de 1 frase (máximo 180 caracteres)"
                  }
                ]

                TEMARIO:
                %s
                """.formatted(subject.getTitle(), resolvedUnit, count, modeHint, excerpt);

        String raw = aiAssistantService.transformWithConfiguredAi("chat", prompt);
        List<GeneratedQuiz.QuestionItem> items = parseQuestionsJson(raw);
        if (items.isEmpty()) {
            throw new IOException("La IA no devolvió preguntas en formato JSON válido.");
        }

        LocalDateTime now = LocalDateTime.now();
        String codeOrName = (subject.getCode() != null && !subject.getCode().isBlank())
                ? subject.getCode().toUpperCase(Locale.ROOT)
                : subject.getTitle();
        String shortUnit = (unitQuery != null && !unitQuery.isBlank()) ? " " + unitQuery.trim().toUpperCase(Locale.ROOT) : "";

        GeneratedQuiz quiz = new GeneratedQuiz();
        quiz.setId(UUID.randomUUID().toString().substring(0, 8));
        quiz.setSubjectId(subject.getId());
        quiz.setOwnerId(ownerId != null && !ownerId.isBlank() ? ownerId : subject.getOwnerId());
        quiz.setUnit(resolvedUnit);
        quiz.setTitle("Quiz " + codeOrName + shortUnit + " · " + now.format(TITLE_TIME_FMT));
        quiz.setSource((source == null || source.isBlank()) ? "web" : source.trim().toLowerCase(Locale.ROOT));
        quiz.setCreatedAt(now.withNano(0).toString());
        quiz.setQuestions(items);

        store.write(db -> db.getQuizzes().add(0, quiz));
        return quiz;
    }

    public Optional<GeneratedQuiz> renameQuiz(String id, String newTitle) {
        if (newTitle == null || newTitle.isBlank()) {
            return Optional.empty();
        }
        final GeneratedQuiz[] updated = {null};
        store.write(db -> {
            for (GeneratedQuiz q : db.getQuizzes()) {
                if (id.equals(q.getId())) {
                    q.setTitle(newTitle.trim());
                    updated[0] = q;
                    break;
                }
            }
        });
        return Optional.ofNullable(updated[0]);
    }

    public boolean deleteQuiz(String id) {
        final boolean[] removed = {false};
        store.write(db -> removed[0] = db.getQuizzes().removeIf(q -> id.equals(q.getId())));
        return removed[0];
    }

    private Subject resolveSubject(String query) {
        return store.read(db -> {
            List<Subject> all = db.getSubjects();
            if (all.isEmpty()) return null;
            if (query == null || query.isBlank()) return all.get(0);
            String q = query.trim().toLowerCase(Locale.ROOT);
            for (Subject s : all) {
                if (q.equalsIgnoreCase(s.getId()) || (s.getCode() != null && q.equalsIgnoreCase(s.getCode()))) {
                    return s;
                }
            }
            for (Subject s : all) {
                if (s.getTitle() != null && s.getTitle().toLowerCase(Locale.ROOT).contains(q)) {
                    return s;
                }
            }
            return all.get(0);
        });
    }

    private List<GeneratedQuiz.QuestionItem> parseQuestionsJson(String raw) {
        if (raw == null || raw.isBlank()) return List.of();
        int start = raw.indexOf('[');
        int end = raw.lastIndexOf(']');
        if (start < 0 || end <= start) return List.of();
        try {
            List<GeneratedQuiz.QuestionItem> list = mapper.readValue(
                    raw.substring(start, end + 1),
                    new TypeReference<List<GeneratedQuiz.QuestionItem>>() {}
            );
            List<GeneratedQuiz.QuestionItem> clean = new ArrayList<>();
            for (GeneratedQuiz.QuestionItem item : list) {
                if (item.getQuestion() == null || item.getQuestion().isBlank()) continue;
                if (item.getOptions() == null || item.getOptions().size() < 2) continue;
                int idx = Math.max(0, Math.min(item.getCorrectIndex(), item.getOptions().size() - 1));
                item.setCorrectIndex(idx);
                clean.add(item);
            }
            return clean;
        } catch (Exception e) {
            return List.of();
        }
    }
}
