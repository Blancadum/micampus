package com.micampus.model;

public class Subject {
    private String id;
    private String code;
    private String title;
    private String shortTitle;
    private String description;
    private String color = "#3b82f6";
    private String icon = "📚";
    private String teacher = "";
    private String teacherAvatar = "";
    private String category = "General";
    private String groupId = "";
    private boolean setupCompleted = false;
    private String iocCourseId = "";
    private String ownerId = "";

    public Subject() {
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId != null ? ownerId : "";
    }

    public Subject(String id, String code, String title, String shortTitle, String description, String color, String icon, String teacher, String category) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.shortTitle = shortTitle;
        this.description = description;
        this.color = color;
        this.icon = icon;
        this.teacher = teacher;
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortTitle() {
        return shortTitle;
    }

    public void setShortTitle(String shortTitle) {
        this.shortTitle = shortTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getTeacherAvatar() {
        return teacherAvatar;
    }

    public void setTeacherAvatar(String teacherAvatar) {
        this.teacherAvatar = teacherAvatar;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public boolean isSetupCompleted() {
        return setupCompleted;
    }

    public void setSetupCompleted(boolean setupCompleted) {
        this.setupCompleted = setupCompleted;
    }

    public String getIocCourseId() {
        return iocCourseId;
    }

    public void setIocCourseId(String iocCourseId) {
        this.iocCourseId = iocCourseId != null ? iocCourseId.trim() : "";
    }
}
