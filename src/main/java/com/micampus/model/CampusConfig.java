package com.micampus.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CampusConfig {
    private String userName = "Estudiante";
    private String campusTitle = "MiCampus";
    private String subtitle = "Tu espacio de estudio organizado, sin complicaciones.";
    private boolean onboardingCompleted = false;
    private List<Map<String, String>> quickLinks = new ArrayList<>();
    private List<Map<String, String>> officialLinks = new ArrayList<>();
    private List<Map<String, String>> sectionLinks = new ArrayList<>();
    private String aiProvider = "none"; // none | gemini | openai | anthropic | ollama | custom_openai
    private String aiModel = "";
    private String aiIntensity = "medium"; // low | medium | high
    private String geminiApiKey = "";
    private String openaiApiKey = "";
    private String anthropicApiKey = "";
    private String ollamaUrl = "http://localhost:11434";
    private String ollamaModel = "llama3.2";
    private String customAiBaseUrl = "";
    private String customAiApiKey = "";
    private String customAiModel = "";
    private boolean telegramEnabled = false;
    private String telegramBotToken = "";
    private String telegramChatId = "";
    private String telegramBotPrompt = "";
    private boolean telegramRemindersEnabled = true;
    private boolean telegramAllowActions = true;
    private String botCallMe = "";
    private String botSoulProfile = "default"; // default | tdah | neurodivergent | strict_coach | supportive | minimalist | custom
    private String botSoulMarkdown = "";
    private boolean botQuietHoursEnabled = false;
    private String botQuietStart = "23:00";
    private String botQuietEnd = "08:00";
    private int botUrgentDaysBefore = 2;
    private boolean botWeeklyDigestEnabled = true;
    private String botWeeklyDigestDay = "MONDAY";
    private int botWeeklyDigestHour = 9;
    private boolean botNotifyGrades = true;
    private boolean emailWatcherEnabled = false;
    private String emailImapHost = "imap.gmail.com";
    private int emailImapPort = 993;
    private String emailImapUser = "";
    private String emailImapPassword = "";
    private String emailKeywords = "comentario en la tarea,ha fet un comentari,qualificat,calificado,retroacció,EAC,PAF,nota";
    private List<AiProfile> aiFallbacks = new ArrayList<>();
    private boolean authEnabled = false;
    private String authUsername = "";
    private String authPassword = "";
    private String contactEmail = "";
    private boolean newsletterEnabled = false;

    public CampusConfig() {
    }

    public CampusConfig(String userName, String campusTitle, String subtitle, boolean onboardingCompleted) {
        this.userName = userName;
        this.campusTitle = campusTitle;
        this.subtitle = subtitle;
        this.onboardingCompleted = onboardingCompleted;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCampusTitle() {
        return campusTitle;
    }

    public void setCampusTitle(String campusTitle) {
        this.campusTitle = campusTitle;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public boolean isOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }

    public List<Map<String, String>> getQuickLinks() {
        return quickLinks;
    }

    public void setQuickLinks(List<Map<String, String>> quickLinks) {
        this.quickLinks = quickLinks != null ? quickLinks : new ArrayList<>();
    }

    public List<Map<String, String>> getOfficialLinks() {
        return officialLinks;
    }

    public void setOfficialLinks(List<Map<String, String>> officialLinks) {
        this.officialLinks = officialLinks != null ? officialLinks : new ArrayList<>();
    }

    public List<Map<String, String>> getSectionLinks() {
        return sectionLinks;
    }

    public void setSectionLinks(List<Map<String, String>> sectionLinks) {
        this.sectionLinks = sectionLinks != null ? sectionLinks : new ArrayList<>();
    }

    public String getAiProvider() {
        return aiProvider;
    }

    public void setAiProvider(String aiProvider) {
        this.aiProvider = aiProvider != null ? aiProvider : "none";
    }

    public String getGeminiApiKey() {
        return geminiApiKey;
    }

    public void setGeminiApiKey(String geminiApiKey) {
        this.geminiApiKey = geminiApiKey != null ? geminiApiKey : "";
    }

    public String getOpenaiApiKey() {
        return openaiApiKey;
    }

    public void setOpenaiApiKey(String openaiApiKey) {
        this.openaiApiKey = openaiApiKey != null ? openaiApiKey : "";
    }

    public String getOllamaUrl() {
        return ollamaUrl;
    }

    public void setOllamaUrl(String ollamaUrl) {
        this.ollamaUrl = ollamaUrl != null ? ollamaUrl : "http://localhost:11434";
    }

    public String getOllamaModel() {
        return ollamaModel;
    }

    public void setOllamaModel(String ollamaModel) {
        this.ollamaModel = ollamaModel != null ? ollamaModel : "llama3.2";
    }

    public String getAnthropicApiKey() {
        return anthropicApiKey;
    }

    public void setAnthropicApiKey(String anthropicApiKey) {
        this.anthropicApiKey = anthropicApiKey != null ? anthropicApiKey : "";
    }

    public String getCustomAiBaseUrl() {
        return customAiBaseUrl;
    }

    public void setCustomAiBaseUrl(String customAiBaseUrl) {
        this.customAiBaseUrl = customAiBaseUrl != null ? customAiBaseUrl : "";
    }

    public String getCustomAiApiKey() {
        return customAiApiKey;
    }

    public void setCustomAiApiKey(String customAiApiKey) {
        this.customAiApiKey = customAiApiKey != null ? customAiApiKey : "";
    }

    public String getCustomAiModel() {
        return customAiModel;
    }

    public void setCustomAiModel(String customAiModel) {
        this.customAiModel = customAiModel != null ? customAiModel : "";
    }

    public String getAiModel() {
        return aiModel;
    }

    public void setAiModel(String aiModel) {
        this.aiModel = aiModel != null ? aiModel : "";
    }

    public String getAiIntensity() {
        return aiIntensity;
    }

    public void setAiIntensity(String aiIntensity) {
        this.aiIntensity = (aiIntensity != null && !aiIntensity.isBlank()) ? aiIntensity : "medium";
    }

    public boolean isTelegramEnabled() {
        return telegramEnabled;
    }

    public void setTelegramEnabled(boolean telegramEnabled) {
        this.telegramEnabled = telegramEnabled;
    }

    public String getTelegramBotToken() {
        return telegramBotToken;
    }

    public void setTelegramBotToken(String telegramBotToken) {
        this.telegramBotToken = telegramBotToken != null ? telegramBotToken : "";
    }

    public String getTelegramChatId() {
        return telegramChatId;
    }

    public void setTelegramChatId(String telegramChatId) {
        this.telegramChatId = telegramChatId != null ? telegramChatId : "";
    }

    public List<AiProfile> getAiFallbacks() {
        return aiFallbacks;
    }

    public void setAiFallbacks(List<AiProfile> aiFallbacks) {
        this.aiFallbacks = aiFallbacks != null ? aiFallbacks : new ArrayList<>();
    }

    public boolean isAuthEnabled() {
        return authEnabled;
    }

    public void setAuthEnabled(boolean authEnabled) {
        this.authEnabled = authEnabled;
    }

    public String getAuthUsername() {
        return authUsername;
    }

    public void setAuthUsername(String authUsername) {
        this.authUsername = authUsername != null ? authUsername : "";
    }

    public String getAuthPassword() {
        return authPassword;
    }

    public void setAuthPassword(String authPassword) {
        this.authPassword = authPassword != null ? authPassword : "";
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail != null ? contactEmail : "";
    }

    public boolean isNewsletterEnabled() {
        return newsletterEnabled;
    }

    public void setNewsletterEnabled(boolean newsletterEnabled) {
        this.newsletterEnabled = newsletterEnabled;
    }

    public String getTelegramBotPrompt() {
        return telegramBotPrompt;
    }

    public void setTelegramBotPrompt(String telegramBotPrompt) {
        this.telegramBotPrompt = telegramBotPrompt != null ? telegramBotPrompt : "";
    }

    public boolean isTelegramRemindersEnabled() {
        return telegramRemindersEnabled;
    }

    public void setTelegramRemindersEnabled(boolean telegramRemindersEnabled) {
        this.telegramRemindersEnabled = telegramRemindersEnabled;
    }

    public boolean isTelegramAllowActions() {
        return telegramAllowActions;
    }

    public void setTelegramAllowActions(boolean telegramAllowActions) {
        this.telegramAllowActions = telegramAllowActions;
    }

    public String getBotCallMe() {
        return botCallMe;
    }

    public void setBotCallMe(String botCallMe) {
        this.botCallMe = botCallMe != null ? botCallMe : "";
    }

    public String getBotSoulProfile() {
        return botSoulProfile;
    }

    public void setBotSoulProfile(String botSoulProfile) {
        this.botSoulProfile = (botSoulProfile != null && !botSoulProfile.isBlank()) ? botSoulProfile : "default";
    }

    public String getBotSoulMarkdown() {
        return botSoulMarkdown;
    }

    public void setBotSoulMarkdown(String botSoulMarkdown) {
        this.botSoulMarkdown = botSoulMarkdown != null ? botSoulMarkdown : "";
    }

    public boolean isBotQuietHoursEnabled() {
        return botQuietHoursEnabled;
    }

    public void setBotQuietHoursEnabled(boolean botQuietHoursEnabled) {
        this.botQuietHoursEnabled = botQuietHoursEnabled;
    }

    public String getBotQuietStart() {
        return botQuietStart;
    }

    public void setBotQuietStart(String botQuietStart) {
        this.botQuietStart = (botQuietStart != null && !botQuietStart.isBlank()) ? botQuietStart : "23:00";
    }

    public String getBotQuietEnd() {
        return botQuietEnd;
    }

    public void setBotQuietEnd(String botQuietEnd) {
        this.botQuietEnd = (botQuietEnd != null && !botQuietEnd.isBlank()) ? botQuietEnd : "08:00";
    }

    public int getBotUrgentDaysBefore() {
        return botUrgentDaysBefore;
    }

    public void setBotUrgentDaysBefore(int botUrgentDaysBefore) {
        this.botUrgentDaysBefore = Math.max(0, Math.min(30, botUrgentDaysBefore));
    }

    public boolean isBotWeeklyDigestEnabled() {
        return botWeeklyDigestEnabled;
    }

    public void setBotWeeklyDigestEnabled(boolean botWeeklyDigestEnabled) {
        this.botWeeklyDigestEnabled = botWeeklyDigestEnabled;
    }

    public String getBotWeeklyDigestDay() {
        return botWeeklyDigestDay;
    }

    public void setBotWeeklyDigestDay(String botWeeklyDigestDay) {
        this.botWeeklyDigestDay = (botWeeklyDigestDay != null && !botWeeklyDigestDay.isBlank()) ? botWeeklyDigestDay : "MONDAY";
    }

    public int getBotWeeklyDigestHour() {
        return botWeeklyDigestHour;
    }

    public void setBotWeeklyDigestHour(int botWeeklyDigestHour) {
        this.botWeeklyDigestHour = Math.max(0, Math.min(23, botWeeklyDigestHour));
    }

    public boolean isBotNotifyGrades() {
        return botNotifyGrades;
    }

    public void setBotNotifyGrades(boolean botNotifyGrades) {
        this.botNotifyGrades = botNotifyGrades;
    }

    public boolean isEmailWatcherEnabled() {
        return emailWatcherEnabled;
    }

    public void setEmailWatcherEnabled(boolean emailWatcherEnabled) {
        this.emailWatcherEnabled = emailWatcherEnabled;
    }

    public String getEmailImapHost() {
        return emailImapHost;
    }

    public void setEmailImapHost(String emailImapHost) {
        this.emailImapHost = (emailImapHost != null && !emailImapHost.isBlank()) ? emailImapHost : "imap.gmail.com";
    }

    public int getEmailImapPort() {
        return emailImapPort;
    }

    public void setEmailImapPort(int emailImapPort) {
        this.emailImapPort = emailImapPort > 0 ? emailImapPort : 993;
    }

    public String getEmailImapUser() {
        return emailImapUser;
    }

    public void setEmailImapUser(String emailImapUser) {
        this.emailImapUser = emailImapUser != null ? emailImapUser : "";
    }

    public String getEmailImapPassword() {
        return emailImapPassword;
    }

    public void setEmailImapPassword(String emailImapPassword) {
        this.emailImapPassword = emailImapPassword != null ? emailImapPassword : "";
    }

    public String getEmailKeywords() {
        return emailKeywords;
    }

    public void setEmailKeywords(String emailKeywords) {
        this.emailKeywords = emailKeywords != null ? emailKeywords : "";
    }
}
