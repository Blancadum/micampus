package com.micampus.model;

/**
 * Perfil reutilizable de un motor de IA (para usar como respaldo automático si falla el principal).
 */
public class AiProfile {
    private String id = "";
    private String label = "";
    private boolean enabled = true;
    private String provider = "gemini"; // gemini | openai | anthropic | ollama | custom_openai
    private String model = "";
    private String intensity = "medium"; // low | medium | high
    private String apiKey = "";
    private String baseUrl = "";

    public AiProfile() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id != null ? id : "";
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label != null ? label : "";
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider != null ? provider : "none";
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model != null ? model : "";
    }

    public String getIntensity() {
        return intensity;
    }

    public void setIntensity(String intensity) {
        this.intensity = (intensity != null && !intensity.isBlank()) ? intensity : "medium";
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey != null ? apiKey : "";
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl != null ? baseUrl : "";
    }
}
