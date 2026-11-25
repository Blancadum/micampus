package com.micampus.model;

import java.util.ArrayList;
import java.util.List;

public class Lesson {
    private String id;
    private String subjectId;
    private String unit = "Unidad 1";
    private String title;
    private String summary = "";
    private String content = "";
    private String audioUrl = "";
    private boolean completed = false;
    private int orderIndex = 0;
    private String ownerId = "";
    private List<QuizQuestion> quiz = new ArrayList<>();

    public Lesson() {
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId != null ? ownerId : "";
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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }

    public List<QuizQuestion> getQuiz() {
        return quiz;
    }

    public void setQuiz(List<QuizQuestion> quiz) {
        this.quiz = quiz;
    }
}
