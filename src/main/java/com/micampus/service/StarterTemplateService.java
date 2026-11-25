package com.micampus.service;

import com.micampus.model.CampusConfig;
import com.micampus.model.CampusDatabase;
import com.micampus.model.Lesson;
import com.micampus.model.QuizQuestion;
import com.micampus.model.Subject;
import com.micampus.model.TaskItem;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class StarterTemplateService {

    public CampusDatabase createDefaultCampus() {
        return createTemplate("general", "Estudiante");
    }

    public CampusDatabase createTemplate(String templateName, String userName) {
        CampusDatabase db = new CampusDatabase();
        String safeName = (userName == null || userName.isBlank()) ? "Estudiante" : userName.trim();

        db.setConfig(new CampusConfig(
                safeName,
                "MiCampus",
                "Tu espacio de estudio organizado, sin complicaciones.",
                false
        ));

        if ("empty".equalsIgnoreCase(templateName)) {
            return db;
        }

        if ("bootcamp".equalsIgnoreCase(templateName)) {
            Subject sub1 = new Subject(id(), "asig1", "Asignatura 1", "Asignatura 1",
                    "Descripción de la Asignatura 1.", "#f59e0b", "📚", "Tutor/a", "Bloque 1");
            Subject sub2 = new Subject(id(), "asig2", "Asignatura 2", "Asignatura 2",
                    "Descripción de la Asignatura 2.", "#22c55e", "📘", "Tutor/a", "Bloque 1");
            Subject sub3 = new Subject(id(), "asig3", "Asignatura 3", "Asignatura 3",
                    "Descripción de la Asignatura 3.", "#3b82f6", "📙", "Tutor/a", "Bloque 2");
            db.getSubjects().addAll(List.of(sub1, sub2, sub3));

            db.getLessons().add(createSampleLesson(sub1.getId(), "Unidad 1", "Tema 1: Introducción",
                    "Resumen inicial de la Asignatura 1."));
            db.getLessons().add(createSampleLesson(sub2.getId(), "Unidad 1", "Tema 1: Primeros pasos",
                    "Resumen inicial de la Asignatura 2."));

            db.getTasks().add(createTask(sub1.getId(), "Entrega 1",
                    LocalDate.now().plusDays(3).toString(), "pending", 30));
            db.getTasks().add(createTask(sub2.getId(), "Entrega 2",
                    LocalDate.now().plusDays(7).toString(), "pending", 40));
            return db;
        }

        // Plantilla "general" por defecto (adaptable a cualquier carrera, FP o curso)
        Subject asig1 = new Subject(id(), "asig1", "Asignatura 1", "Asignatura 1",
                "Descripción de la Asignatura 1.", "#3b82f6", "📚", "Tutor/a", "General");
        Subject asig2 = new Subject(id(), "asig2", "Asignatura 2", "Asignatura 2",
                "Descripción de la Asignatura 2.", "#ec4899", "📘", "Tutor/a", "General");
        Subject asig3 = new Subject(id(), "asig3", "Asignatura 3", "Asignatura 3",
                "Descripción de la Asignatura 3.", "#22c55e", "📙", "Tutor/a", "General");
        db.getSubjects().addAll(List.of(asig1, asig2, asig3));

        db.getLessons().add(createSampleLesson(asig1.getId(), "Unidad 1", "Bienvenida a tu nuevo MiCampus",
                "Puedes editar esta lección o importar tus propios apuntes en PDF/Markdown."));
        db.getLessons().add(createSampleLesson(asig2.getId(), "Unidad 1", "Tema 1 de ejemplo",
                "Organiza tus apuntes por bloques y lecciones."));

        db.getTasks().add(createTask(asig1.getId(), "Entrega 1",
                LocalDate.now().plusDays(2).toString(), "pending", 25));
        db.getTasks().add(createTask(asig2.getId(), "Entrega 2",
                LocalDate.now().plusDays(4).toString(), "pending", 25));
        db.getTasks().add(createTask(asig3.getId(), "Entrega 3",
                LocalDate.now().plusDays(6).toString(), "pending", 15));

        return db;
    }

    private Lesson createSampleLesson(String subjectId, String unit, String title, String summary) {
        Lesson l = new Lesson();
        l.setId(id());
        l.setSubjectId(subjectId);
        l.setUnit(unit);
        l.setTitle(title);
        l.setSummary(summary);
        l.setContent("# " + title + "\n\n" + summary + "\n\n"
                + "## Puntos clave\n"
                + "- No necesitas saber programar ni usar IA para organizar tus estudios.\n"
                + "- Usa el **Centro de Scripts** para importar PDFs, generar tu calendario `.ics` o hacer copias de seguridad.\n"
                + "- Añade tantas asignaturas, temas y entregas como quieras.\n\n"
                + "Pregunta: ¿Qué hace el Centro de Scripts de MiCampus?\n"
                + "Respuesta: Ejecuta tareas automáticas en Java (importar apuntes, crear calendarios, detectar entregas el mismo día y guardar copias de seguridad) con un solo clic.");
        l.setQuiz(List.of(new QuizQuestion(
                "¿Qué hace el Centro de Scripts de MiCampus?",
                "Ejecuta tareas automáticas en Java (importar apuntes, crear calendarios y copias de seguridad) con un solo clic."
        )));
        return l;
    }

    private TaskItem createTask(String subjectId, String title, String dueDate, String status, int weight) {
        TaskItem t = new TaskItem();
        t.setId(id());
        t.setSubjectId(subjectId);
        t.setTitle(title);
        t.setDueDate(dueDate);
        t.setStatus(status);
        t.setWeight(weight);
        return t;
    }

    private String id() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
