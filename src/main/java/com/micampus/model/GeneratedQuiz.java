package com.micampus.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Quiz dinámico generado por IA (desde la web o Telegram) y guardado por asignatura.
 */
public class GeneratedQuiz {
    private String id;
    private String subjectId;
    private String ownerId = "";
    private String unit = "";
    private String title = "";
    private String source = "web";
    private String createdAt = "";
    private List<QuestionItem> questions = new ArrayList<>();

    public GeneratedQuiz() {
    }

    public static class QuestionItem {
        private String question;
        private List<String> options = new ArrayList<>();
        private int correctIndex = 0;
        private String explanation = "";

        public QuestionItem() {
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public List<String> getOptions() {
            return options;
        }

        public void setOptions(List<String> options) {
            this.options = options != null ? options : new ArrayList<>();
        }

        public int getCorrectIndex() {
            return correctIndex;
        }

        public void setCorrectIndex(int correctIndex) {
            this.correctIndex = correctIndex;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId != null ? ownerId : "";
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public List<QuestionItem> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionItem> questions) {
        this.questions = questions != null ? questions : new ArrayList<>();
    }
}
