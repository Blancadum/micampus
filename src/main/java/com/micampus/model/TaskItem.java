package com.micampus.model;

public class TaskItem {
    private String id;
    private String subjectId;
    private String title;
    private String description = "";
    private String dueDate; // YYYY-MM-DD
    private String openDate = ""; // YYYY-MM-DD
    private String gradeDate = ""; // YYYY-MM-DD
    private String status = "pending"; // pending | done
    private String grade = "";
    private int weight = 0;
    private String ownerId = "";

    public TaskItem() {
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getOpenDate() {
        return openDate;
    }

    public void setOpenDate(String openDate) {
        this.openDate = openDate != null ? openDate : "";
    }

    public String getGradeDate() {
        return gradeDate;
    }

    public void setGradeDate(String gradeDate) {
        this.gradeDate = gradeDate != null ? gradeDate : "";
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
