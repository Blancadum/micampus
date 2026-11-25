package com.micampus.model;

public class UploadedFile {
    private String id;
    private String subjectId;
    private String originalName;
    private String storedName;
    private long sizeBytes;
    private String uploadedAt;
    private String folder = "otros";
    private String ownerId = "";

    public UploadedFile() {
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

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getStoredName() {
        return storedName;
    }

    public void setStoredName(String storedName) {
        this.storedName = storedName;
    }

    public long getSizeBytes() {
        return sizeBytes;
    }

    public void setSizeBytes(long sizeBytes) {
        this.sizeBytes = sizeBytes;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(String uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getFolder() {
        return folder;
    }

    public void setFolder(String folder) {
        this.folder = (folder == null || folder.isBlank()) ? "otros" : folder;
    }
}
