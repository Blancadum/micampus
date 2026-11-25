package com.micampus.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CampusDatabase {
    private CampusConfig config = new CampusConfig();
    private List<SubjectGroup> groups = new ArrayList<>();
    private List<Subject> subjects = new ArrayList<>();
    private List<Lesson> lessons = new ArrayList<>();
    private List<TaskItem> tasks = new ArrayList<>();
    private List<UploadedFile> uploads = new ArrayList<>();
    private List<GeneratedQuiz> quizzes = new ArrayList<>();
    private List<UserAccount> users = new ArrayList<>();
    private Map<String, CampusConfig> userConfigs = new HashMap<>();
    private Map<String, Object> progress = new HashMap<>();

    public CampusConfig getConfig() {
        return config;
    }

    public void setConfig(CampusConfig config) {
        this.config = config;
    }

    public List<SubjectGroup> getGroups() {
        return groups;
    }

    public void setGroups(List<SubjectGroup> groups) {
        this.groups = groups;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }

    public List<TaskItem> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskItem> tasks) {
        this.tasks = tasks;
    }

    public List<UploadedFile> getUploads() {
        return uploads;
    }

    public List<GeneratedQuiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<GeneratedQuiz> quizzes) {
        this.quizzes = quizzes != null ? quizzes : new ArrayList<>();
    }

    public List<UserAccount> getUsers() {
        return users;
    }

    public void setUsers(List<UserAccount> users) {
        this.users = users != null ? users : new ArrayList<>();
    }

    public Map<String, CampusConfig> getUserConfigs() {
        return userConfigs;
    }

    public void setUserConfigs(Map<String, CampusConfig> userConfigs) {
        this.userConfigs = userConfigs != null ? userConfigs : new HashMap<>();
    }

    public void setUploads(List<UploadedFile> uploads) {
        this.uploads = uploads;
    }

    public Map<String, Object> getProgress() {
        return progress;
    }

    public void setProgress(Map<String, Object> progress) {
        this.progress = progress;
    }
}
