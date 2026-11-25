package com.micampus.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.micampus.config.StorageProperties;
import com.micampus.model.AiProfile;
import com.micampus.model.CampusConfig;
import com.micampus.model.CampusDatabase;
import com.micampus.model.Lesson;
import com.micampus.model.QuizQuestion;
import com.micampus.model.Subject;
import com.micampus.model.SubjectGroup;
import com.micampus.model.TaskItem;
import com.micampus.model.UploadedFile;
import com.micampus.service.StarterTemplateService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.function.Consumer;
import java.util.function.Function;

@Repository
public class CampusStore {

    private final StorageProperties properties;
    private final StarterTemplateService starterTemplateService;
    private final ObjectMapper mapper;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    private Path dataDir;
    private Path dbFile;
    private Path sqliteFile;
    private Path uploadsDir;
    private String jdbcUrl;
    private CampusDatabase database;

    public CampusStore(StorageProperties properties, StarterTemplateService starterTemplateService) {
        this.properties = properties;
        this.starterTemplateService = starterTemplateService;
        this.mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

    @PostConstruct
    public void init() throws IOException {
        this.dataDir = Paths.get(properties.getDataDir()).toAbsolutePath().normalize();
        this.uploadsDir = dataDir.resolve("uploads");
        this.dbFile = dataDir.resolve("campus-db.json");
        this.sqliteFile = dataDir.resolve("micampus.db");
        this.jdbcUrl = "jdbc:sqlite:" + sqliteFile;

        Files.createDirectories(dataDir);
        Files.createDirectories(uploadsDir);

        initSqliteSchema();

        if (isSqliteEmpty()) {
            if (Files.exists(dbFile)) {
                this.database = mapper.readValue(dbFile.toFile(), CampusDatabase.class);
            } else {
                this.database = starterTemplateService.createDefaultCampus();
            }
            saveInternal();
        } else {
            this.database = loadFromSqlite();
        }
    }

    public Path getDataDir() {
        return dataDir;
    }

    public Path getUploadsDir() {
        return uploadsDir;
    }

    public Path getSqliteFile() {
        return sqliteFile;
    }

    public <T> T read(Function<CampusDatabase, T> reader) {
        lock.readLock().lock();
        try {
            return reader.apply(database);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void write(Consumer<CampusDatabase> writer) {
        lock.writeLock().lock();
        try {
            writer.accept(database);
            saveInternal();
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void replaceDatabase(CampusDatabase newDatabase) {
        lock.writeLock().lock();
        try {
            this.database = newDatabase;
            saveInternal();
        } finally {
            lock.writeLock().unlock();
        }
    }

    private Connection openConnection() throws SQLException {
        return DriverManager.getConnection(jdbcUrl);
    }

    private void initSqliteSchema() {
        try (Connection conn = openConnection(); Statement st = conn.createStatement()) {
            st.execute("""
                    CREATE TABLE IF NOT EXISTS campus_config (
                        id INTEGER PRIMARY KEY CHECK (id = 1),
                        user_name TEXT,
                        campus_title TEXT,
                        subtitle TEXT,
                        onboarding_completed INTEGER NOT NULL DEFAULT 0,
                        quick_links_json TEXT,
                        official_links_json TEXT,
                        section_links_json TEXT,
                        ai_provider TEXT,
                        ai_model TEXT,
                        ai_intensity TEXT,
                        gemini_api_key TEXT,
                        openai_api_key TEXT,
                        anthropic_api_key TEXT,
                        ollama_url TEXT,
                        ollama_model TEXT,
                        custom_ai_base_url TEXT,
                        custom_ai_api_key TEXT,
                        custom_ai_model TEXT,
                        telegram_enabled INTEGER NOT NULL DEFAULT 0,
                        telegram_bot_token TEXT,
                        telegram_chat_id TEXT,
                        telegram_bot_prompt TEXT,
                        telegram_reminders_enabled INTEGER NOT NULL DEFAULT 1,
                        telegram_allow_actions INTEGER NOT NULL DEFAULT 1,
                        bot_call_me TEXT,
                        bot_soul_profile TEXT,
                        bot_soul_markdown TEXT,
                        bot_quiet_hours_enabled INTEGER NOT NULL DEFAULT 0,
                        bot_quiet_start TEXT,
                        bot_quiet_end TEXT,
                        bot_urgent_days_before INTEGER NOT NULL DEFAULT 2,
                        bot_weekly_digest_enabled INTEGER NOT NULL DEFAULT 1,
                        bot_weekly_digest_day TEXT,
                        bot_weekly_digest_hour INTEGER NOT NULL DEFAULT 9,
                        bot_notify_grades INTEGER NOT NULL DEFAULT 1,
                        email_watcher_enabled INTEGER NOT NULL DEFAULT 0,
                        email_imap_host TEXT,
                        email_imap_port INTEGER NOT NULL DEFAULT 993,
                        email_imap_user TEXT,
                        email_imap_password TEXT,
                        email_keywords TEXT,
                        ai_fallbacks_json TEXT,
                        auth_enabled INTEGER NOT NULL DEFAULT 0,
                        auth_username TEXT,
                        auth_password TEXT,
                        contact_email TEXT,
                        newsletter_enabled INTEGER NOT NULL DEFAULT 0
                    )
                    """);
            st.execute("""
                    CREATE TABLE IF NOT EXISTS subject_groups (
                        id TEXT PRIMARY KEY,
                        title TEXT,
                        subtitle TEXT,
                        description TEXT,
                        color TEXT,
                        icon TEXT
                    )
                    """);
            st.execute("""
                    CREATE TABLE IF NOT EXISTS subjects (
                        id TEXT PRIMARY KEY,
                        code TEXT,
                        title TEXT,
                        short_title TEXT,
                        description TEXT,
                        color TEXT,
                        icon TEXT,
                        teacher TEXT,
                        teacher_avatar TEXT,
                        category TEXT,
                        group_id TEXT,
                        setup_completed INTEGER NOT NULL DEFAULT 0,
                        ioc_course_id TEXT
                    )
                    """);
            st.execute("""
                    CREATE TABLE IF NOT EXISTS lessons (
                        id TEXT PRIMARY KEY,
                        subject_id TEXT,
                        unit TEXT,
                        title TEXT,
                        summary TEXT,
                        content TEXT,
                        audio_url TEXT,
                        completed INTEGER NOT NULL DEFAULT 0,
                        order_index INTEGER NOT NULL DEFAULT 0,
                        quiz_json TEXT
                    )
                    """);
            st.execute("""
                    CREATE TABLE IF NOT EXISTS tasks (
                        id TEXT PRIMARY KEY,
                        subject_id TEXT,
                        title TEXT,
                        description TEXT,
                        due_date TEXT,
                        open_date TEXT,
                        grade_date TEXT,
                        status TEXT,
                        grade TEXT,
                        weight INTEGER NOT NULL DEFAULT 0
                    )
                    """);
            st.execute("""
                    CREATE TABLE IF NOT EXISTS uploads (
                        id TEXT PRIMARY KEY,
                        subject_id TEXT,
                        original_name TEXT,
                        stored_name TEXT,
                        size_bytes INTEGER NOT NULL DEFAULT 0,
                        uploaded_at TEXT,
                        folder TEXT
                    )
                    """);
            st.execute("""
                    CREATE TABLE IF NOT EXISTS progress_entries (
                        entry_key TEXT PRIMARY KEY,
                        value_json TEXT
                    )
                    """);
            for (String alter : List.of(
                    "ALTER TABLE tasks ADD COLUMN open_date TEXT",
                    "ALTER TABLE tasks ADD COLUMN grade_date TEXT",
                    "ALTER TABLE campus_config ADD COLUMN official_links_json TEXT",
                    "ALTER TABLE campus_config ADD COLUMN section_links_json TEXT",
                    "ALTER TABLE campus_config ADD COLUMN openai_api_key TEXT",
                    "ALTER TABLE campus_config ADD COLUMN anthropic_api_key TEXT",
                    "ALTER TABLE campus_config ADD COLUMN custom_ai_base_url TEXT",
                    "ALTER TABLE campus_config ADD COLUMN custom_ai_api_key TEXT",
                    "ALTER TABLE campus_config ADD COLUMN custom_ai_model TEXT",
                    "ALTER TABLE campus_config ADD COLUMN ai_model TEXT",
                    "ALTER TABLE campus_config ADD COLUMN ai_intensity TEXT",
                    "ALTER TABLE campus_config ADD COLUMN telegram_enabled INTEGER NOT NULL DEFAULT 0",
                    "ALTER TABLE campus_config ADD COLUMN telegram_bot_token TEXT",
                    "ALTER TABLE campus_config ADD COLUMN telegram_chat_id TEXT",
                    "ALTER TABLE campus_config ADD COLUMN telegram_bot_prompt TEXT",
                    "ALTER TABLE campus_config ADD COLUMN telegram_reminders_enabled INTEGER NOT NULL DEFAULT 1",
                    "ALTER TABLE campus_config ADD COLUMN telegram_allow_actions INTEGER NOT NULL DEFAULT 1",
                    "ALTER TABLE campus_config ADD COLUMN bot_call_me TEXT",
                    "ALTER TABLE campus_config ADD COLUMN bot_soul_profile TEXT",
                    "ALTER TABLE campus_config ADD COLUMN bot_soul_markdown TEXT",
                    "ALTER TABLE campus_config ADD COLUMN bot_quiet_hours_enabled INTEGER NOT NULL DEFAULT 0",
                    "ALTER TABLE campus_config ADD COLUMN bot_quiet_start TEXT",
                    "ALTER TABLE campus_config ADD COLUMN bot_quiet_end TEXT",
                    "ALTER TABLE campus_config ADD COLUMN bot_urgent_days_before INTEGER NOT NULL DEFAULT 2",
                    "ALTER TABLE campus_config ADD COLUMN bot_weekly_digest_enabled INTEGER NOT NULL DEFAULT 1",
                    "ALTER TABLE campus_config ADD COLUMN bot_weekly_digest_day TEXT",
                    "ALTER TABLE campus_config ADD COLUMN bot_weekly_digest_hour INTEGER NOT NULL DEFAULT 9",
                    "ALTER TABLE campus_config ADD COLUMN bot_notify_grades INTEGER NOT NULL DEFAULT 1",
                    "ALTER TABLE campus_config ADD COLUMN email_watcher_enabled INTEGER NOT NULL DEFAULT 0",
                    "ALTER TABLE campus_config ADD COLUMN email_imap_host TEXT",
                    "ALTER TABLE campus_config ADD COLUMN email_imap_port INTEGER NOT NULL DEFAULT 993",
                    "ALTER TABLE campus_config ADD COLUMN email_imap_user TEXT",
                    "ALTER TABLE campus_config ADD COLUMN email_imap_password TEXT",
                    "ALTER TABLE campus_config ADD COLUMN email_keywords TEXT",
                    "ALTER TABLE subjects ADD COLUMN ioc_course_id TEXT",
                    "ALTER TABLE campus_config ADD COLUMN ai_fallbacks_json TEXT",
                    "ALTER TABLE campus_config ADD COLUMN auth_enabled INTEGER NOT NULL DEFAULT 0",
                    "ALTER TABLE campus_config ADD COLUMN auth_username TEXT",
                    "ALTER TABLE campus_config ADD COLUMN auth_password TEXT",
                    "ALTER TABLE campus_config ADD COLUMN contact_email TEXT",
                    "ALTER TABLE campus_config ADD COLUMN newsletter_enabled INTEGER NOT NULL DEFAULT 0",
                    "ALTER TABLE uploads ADD COLUMN folder TEXT"
            )) {
                try {
                    st.execute(alter);
                } catch (SQLException ignored) {
                    // La columna ya existe
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error al inicializar el esquema SQLite de MiCampus", e);
        }
    }

    private boolean isSqliteEmpty() {
        try (Connection conn = openConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT COUNT(*) FROM campus_config")) {
            return rs.next() && rs.getInt(1) == 0;
        } catch (SQLException e) {
            throw new RuntimeException("Error al consultar SQLite de MiCampus", e);
        }
    }

    private CampusDatabase loadFromSqlite() {
        CampusDatabase db = new CampusDatabase();
        try (Connection conn = openConnection(); Statement st = conn.createStatement()) {
            try (ResultSet rs = st.executeQuery("SELECT * FROM campus_config WHERE id = 1")) {
                if (rs.next()) {
                    CampusConfig cfg = new CampusConfig();
                    cfg.setUserName(rs.getString("user_name"));
                    cfg.setCampusTitle(rs.getString("campus_title"));
                    cfg.setSubtitle(rs.getString("subtitle"));
                    cfg.setOnboardingCompleted(rs.getInt("onboarding_completed") == 1);
                    cfg.setQuickLinks(readJson(rs.getString("quick_links_json"), new TypeReference<List<Map<String, String>>>() {}, new ArrayList<>()));
                    cfg.setOfficialLinks(readJson(rs.getString("official_links_json"), new TypeReference<List<Map<String, String>>>() {}, new ArrayList<>()));
                    cfg.setSectionLinks(readJson(rs.getString("section_links_json"), new TypeReference<List<Map<String, String>>>() {}, new ArrayList<>()));
                    cfg.setAiProvider(rs.getString("ai_provider"));
                    cfg.setAiModel(rs.getString("ai_model"));
                    cfg.setAiIntensity(rs.getString("ai_intensity"));
                    cfg.setGeminiApiKey(rs.getString("gemini_api_key"));
                    cfg.setOpenaiApiKey(rs.getString("openai_api_key"));
                    cfg.setAnthropicApiKey(rs.getString("anthropic_api_key"));
                    cfg.setOllamaUrl(rs.getString("ollama_url"));
                    cfg.setOllamaModel(rs.getString("ollama_model"));
                    cfg.setCustomAiBaseUrl(rs.getString("custom_ai_base_url"));
                    cfg.setCustomAiApiKey(rs.getString("custom_ai_api_key"));
                    cfg.setCustomAiModel(rs.getString("custom_ai_model"));
                    cfg.setTelegramEnabled(rs.getInt("telegram_enabled") == 1);
                    cfg.setTelegramBotToken(rs.getString("telegram_bot_token"));
                    cfg.setTelegramChatId(rs.getString("telegram_chat_id"));
                    cfg.setTelegramBotPrompt(rs.getString("telegram_bot_prompt"));
                    if (rs.getObject("telegram_reminders_enabled") != null) {
                        cfg.setTelegramRemindersEnabled(rs.getInt("telegram_reminders_enabled") == 1);
                    }
                    if (rs.getObject("telegram_allow_actions") != null) {
                        cfg.setTelegramAllowActions(rs.getInt("telegram_allow_actions") == 1);
                    }
                    cfg.setBotCallMe(rs.getString("bot_call_me"));
                    if (rs.getString("bot_soul_profile") != null) cfg.setBotSoulProfile(rs.getString("bot_soul_profile"));
                    cfg.setBotSoulMarkdown(rs.getString("bot_soul_markdown"));
                    cfg.setBotQuietHoursEnabled(rs.getInt("bot_quiet_hours_enabled") == 1);
                    if (rs.getString("bot_quiet_start") != null) cfg.setBotQuietStart(rs.getString("bot_quiet_start"));
                    if (rs.getString("bot_quiet_end") != null) cfg.setBotQuietEnd(rs.getString("bot_quiet_end"));
                    if (rs.getObject("bot_urgent_days_before") != null) cfg.setBotUrgentDaysBefore(rs.getInt("bot_urgent_days_before"));
                    if (rs.getObject("bot_weekly_digest_enabled") != null) cfg.setBotWeeklyDigestEnabled(rs.getInt("bot_weekly_digest_enabled") == 1);
                    if (rs.getString("bot_weekly_digest_day") != null) cfg.setBotWeeklyDigestDay(rs.getString("bot_weekly_digest_day"));
                    if (rs.getObject("bot_weekly_digest_hour") != null) cfg.setBotWeeklyDigestHour(rs.getInt("bot_weekly_digest_hour"));
                    if (rs.getObject("bot_notify_grades") != null) cfg.setBotNotifyGrades(rs.getInt("bot_notify_grades") == 1);
                    cfg.setEmailWatcherEnabled(rs.getInt("email_watcher_enabled") == 1);
                    if (rs.getString("email_imap_host") != null) cfg.setEmailImapHost(rs.getString("email_imap_host"));
                    if (rs.getObject("email_imap_port") != null) cfg.setEmailImapPort(rs.getInt("email_imap_port"));
                    cfg.setEmailImapUser(rs.getString("email_imap_user"));
                    cfg.setEmailImapPassword(rs.getString("email_imap_password"));
                    if (rs.getString("email_keywords") != null) cfg.setEmailKeywords(rs.getString("email_keywords"));
                    cfg.setAiFallbacks(readJson(rs.getString("ai_fallbacks_json"), new TypeReference<List<AiProfile>>() {}, new ArrayList<>()));
                    cfg.setAuthEnabled(rs.getInt("auth_enabled") == 1);
                    cfg.setAuthUsername(rs.getString("auth_username"));
                    cfg.setAuthPassword(rs.getString("auth_password"));
                    cfg.setContactEmail(rs.getString("contact_email"));
                    cfg.setNewsletterEnabled(rs.getInt("newsletter_enabled") == 1);
                    db.setConfig(cfg);
                }
            }

            try (ResultSet rs = st.executeQuery("SELECT * FROM subject_groups")) {
                while (rs.next()) {
                    SubjectGroup g = new SubjectGroup();
                    g.setId(rs.getString("id"));
                    g.setTitle(rs.getString("title"));
                    g.setSubtitle(rs.getString("subtitle"));
                    g.setDescription(rs.getString("description"));
                    g.setColor(rs.getString("color"));
                    g.setIcon(rs.getString("icon"));
                    db.getGroups().add(g);
                }
            }

            try (ResultSet rs = st.executeQuery("SELECT * FROM subjects")) {
                while (rs.next()) {
                    Subject s = new Subject();
                    s.setId(rs.getString("id"));
                    s.setCode(rs.getString("code"));
                    s.setTitle(rs.getString("title"));
                    s.setShortTitle(rs.getString("short_title"));
                    s.setDescription(rs.getString("description"));
                    s.setColor(rs.getString("color"));
                    s.setIcon(rs.getString("icon"));
                    s.setTeacher(rs.getString("teacher"));
                    s.setTeacherAvatar(rs.getString("teacher_avatar"));
                    s.setCategory(rs.getString("category"));
                    s.setGroupId(rs.getString("group_id"));
                    s.setSetupCompleted(rs.getInt("setup_completed") == 1);
                    s.setIocCourseId(rs.getString("ioc_course_id"));
                    db.getSubjects().add(s);
                }
            }

            try (ResultSet rs = st.executeQuery("SELECT * FROM lessons ORDER BY order_index ASC")) {
                while (rs.next()) {
                    Lesson l = new Lesson();
                    l.setId(rs.getString("id"));
                    l.setSubjectId(rs.getString("subject_id"));
                    l.setUnit(rs.getString("unit"));
                    l.setTitle(rs.getString("title"));
                    l.setSummary(rs.getString("summary"));
                    l.setContent(rs.getString("content"));
                    l.setAudioUrl(rs.getString("audio_url"));
                    l.setCompleted(rs.getInt("completed") == 1);
                    l.setOrderIndex(rs.getInt("order_index"));
                    l.setQuiz(readJson(rs.getString("quiz_json"), new TypeReference<List<QuizQuestion>>() {}, new ArrayList<>()));
                    db.getLessons().add(l);
                }
            }

            try (ResultSet rs = st.executeQuery("SELECT * FROM tasks")) {
                while (rs.next()) {
                    TaskItem t = new TaskItem();
                    t.setId(rs.getString("id"));
                    t.setSubjectId(rs.getString("subject_id"));
                    t.setTitle(rs.getString("title"));
                    t.setDescription(rs.getString("description"));
                    t.setDueDate(rs.getString("due_date"));
                    t.setOpenDate(rs.getString("open_date"));
                    t.setGradeDate(rs.getString("grade_date"));
                    t.setStatus(rs.getString("status"));
                    t.setGrade(rs.getString("grade"));
                    t.setWeight(rs.getInt("weight"));
                    db.getTasks().add(t);
                }
            }

            try (ResultSet rs = st.executeQuery("SELECT * FROM uploads")) {
                while (rs.next()) {
                    UploadedFile u = new UploadedFile();
                    u.setId(rs.getString("id"));
                    u.setSubjectId(rs.getString("subject_id"));
                    u.setOriginalName(rs.getString("original_name"));
                    u.setStoredName(rs.getString("stored_name"));
                    u.setSizeBytes(rs.getLong("size_bytes"));
                    u.setUploadedAt(rs.getString("uploaded_at"));
                    u.setFolder(rs.getString("folder"));
                    db.getUploads().add(u);
                }
            }

            try (ResultSet rs = st.executeQuery("SELECT * FROM progress_entries")) {
                while (rs.next()) {
                    String key = rs.getString("entry_key");
                    Object val = readJson(rs.getString("value_json"), new TypeReference<Object>() {}, null);
                    if (key != null && val != null) {
                        db.getProgress().put(key, val);
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error al cargar datos desde SQLite", e);
        }
        return db;
    }

    private void saveInternal() {
        try (Connection conn = openConnection()) {
            conn.setAutoCommit(false);
            try (Statement st = conn.createStatement()) {
                st.execute("DELETE FROM campus_config");
                st.execute("DELETE FROM subject_groups");
                st.execute("DELETE FROM subjects");
                st.execute("DELETE FROM lessons");
                st.execute("DELETE FROM tasks");
                st.execute("DELETE FROM uploads");
                st.execute("DELETE FROM progress_entries");
            }

            CampusConfig cfg = database.getConfig() != null ? database.getConfig() : new CampusConfig();
            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO campus_config (id, user_name, campus_title, subtitle, onboarding_completed, quick_links_json, official_links_json, section_links_json, ai_provider, ai_model, ai_intensity, gemini_api_key, openai_api_key, anthropic_api_key, ollama_url, ollama_model, custom_ai_base_url, custom_ai_api_key, custom_ai_model, telegram_enabled, telegram_bot_token, telegram_chat_id, telegram_bot_prompt, telegram_reminders_enabled, telegram_allow_actions, bot_call_me, bot_soul_profile, bot_soul_markdown, bot_quiet_hours_enabled, bot_quiet_start, bot_quiet_end, bot_urgent_days_before, bot_weekly_digest_enabled, bot_weekly_digest_day, bot_weekly_digest_hour, bot_notify_grades, email_watcher_enabled, email_imap_host, email_imap_port, email_imap_user, email_imap_password, email_keywords, ai_fallbacks_json, auth_enabled, auth_username, auth_password, contact_email, newsletter_enabled)
                    VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """)) {
                ps.setString(1, cfg.getUserName());
                ps.setString(2, cfg.getCampusTitle());
                ps.setString(3, cfg.getSubtitle());
                ps.setInt(4, cfg.isOnboardingCompleted() ? 1 : 0);
                ps.setString(5, writeJson(cfg.getQuickLinks()));
                ps.setString(6, writeJson(cfg.getOfficialLinks()));
                ps.setString(7, writeJson(cfg.getSectionLinks()));
                ps.setString(8, cfg.getAiProvider());
                ps.setString(9, cfg.getAiModel());
                ps.setString(10, cfg.getAiIntensity());
                ps.setString(11, cfg.getGeminiApiKey());
                ps.setString(12, cfg.getOpenaiApiKey());
                ps.setString(13, cfg.getAnthropicApiKey());
                ps.setString(14, cfg.getOllamaUrl());
                ps.setString(15, cfg.getOllamaModel());
                ps.setString(16, cfg.getCustomAiBaseUrl());
                ps.setString(17, cfg.getCustomAiApiKey());
                ps.setString(18, cfg.getCustomAiModel());
                ps.setInt(19, cfg.isTelegramEnabled() ? 1 : 0);
                ps.setString(20, cfg.getTelegramBotToken());
                ps.setString(21, cfg.getTelegramChatId());
                ps.setString(22, cfg.getTelegramBotPrompt());
                ps.setInt(23, cfg.isTelegramRemindersEnabled() ? 1 : 0);
                ps.setInt(24, cfg.isTelegramAllowActions() ? 1 : 0);
                ps.setString(25, cfg.getBotCallMe());
                ps.setString(26, cfg.getBotSoulProfile());
                ps.setString(27, cfg.getBotSoulMarkdown());
                ps.setInt(28, cfg.isBotQuietHoursEnabled() ? 1 : 0);
                ps.setString(29, cfg.getBotQuietStart());
                ps.setString(30, cfg.getBotQuietEnd());
                ps.setInt(31, cfg.getBotUrgentDaysBefore());
                ps.setInt(32, cfg.isBotWeeklyDigestEnabled() ? 1 : 0);
                ps.setString(33, cfg.getBotWeeklyDigestDay());
                ps.setInt(34, cfg.getBotWeeklyDigestHour());
                ps.setInt(35, cfg.isBotNotifyGrades() ? 1 : 0);
                ps.setInt(36, cfg.isEmailWatcherEnabled() ? 1 : 0);
                ps.setString(37, cfg.getEmailImapHost());
                ps.setInt(38, cfg.getEmailImapPort());
                ps.setString(39, cfg.getEmailImapUser());
                ps.setString(40, cfg.getEmailImapPassword());
                ps.setString(41, cfg.getEmailKeywords());
                ps.setString(42, writeJson(cfg.getAiFallbacks()));
                ps.setInt(43, cfg.isAuthEnabled() ? 1 : 0);
                ps.setString(44, cfg.getAuthUsername());
                ps.setString(45, cfg.getAuthPassword());
                ps.setString(46, cfg.getContactEmail());
                ps.setInt(47, cfg.isNewsletterEnabled() ? 1 : 0);
                ps.executeUpdate();
            }

            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO subject_groups (id, title, subtitle, description, color, icon)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """)) {
                for (SubjectGroup g : database.getGroups()) {
                    ps.setString(1, g.getId());
                    ps.setString(2, g.getTitle());
                    ps.setString(3, g.getSubtitle());
                    ps.setString(4, g.getDescription());
                    ps.setString(5, g.getColor());
                    ps.setString(6, g.getIcon());
                    ps.addBatch();
                }
                ps.executeBatch();
            }

            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO subjects (id, code, title, short_title, description, color, icon, teacher, teacher_avatar, category, group_id, setup_completed, ioc_course_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """)) {
                for (Subject s : database.getSubjects()) {
                    ps.setString(1, s.getId());
                    ps.setString(2, s.getCode());
                    ps.setString(3, s.getTitle());
                    ps.setString(4, s.getShortTitle());
                    ps.setString(5, s.getDescription());
                    ps.setString(6, s.getColor());
                    ps.setString(7, s.getIcon());
                    ps.setString(8, s.getTeacher());
                    ps.setString(9, s.getTeacherAvatar());
                    ps.setString(10, s.getCategory());
                    ps.setString(11, s.getGroupId());
                    ps.setInt(12, s.isSetupCompleted() ? 1 : 0);
                    ps.setString(13, s.getIocCourseId());
                    ps.addBatch();
                }
                ps.executeBatch();
            }

            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO lessons (id, subject_id, unit, title, summary, content, audio_url, completed, order_index, quiz_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """)) {
                for (Lesson l : database.getLessons()) {
                    ps.setString(1, l.getId());
                    ps.setString(2, l.getSubjectId());
                    ps.setString(3, l.getUnit());
                    ps.setString(4, l.getTitle());
                    ps.setString(5, l.getSummary());
                    ps.setString(6, l.getContent());
                    ps.setString(7, l.getAudioUrl());
                    ps.setInt(8, l.isCompleted() ? 1 : 0);
                    ps.setInt(9, l.getOrderIndex());
                    ps.setString(10, writeJson(l.getQuiz()));
                    ps.addBatch();
                }
                ps.executeBatch();
            }

            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO tasks (id, subject_id, title, description, due_date, open_date, grade_date, status, grade, weight)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """)) {
                for (TaskItem t : database.getTasks()) {
                    ps.setString(1, t.getId());
                    ps.setString(2, t.getSubjectId());
                    ps.setString(3, t.getTitle());
                    ps.setString(4, t.getDescription());
                    ps.setString(5, t.getDueDate());
                    ps.setString(6, t.getOpenDate());
                    ps.setString(7, t.getGradeDate());
                    ps.setString(8, t.getStatus());
                    ps.setString(9, t.getGrade());
                    ps.setInt(10, t.getWeight());
                    ps.addBatch();
                }
                ps.executeBatch();
            }

            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO uploads (id, subject_id, original_name, stored_name, size_bytes, uploaded_at, folder)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """)) {
                for (UploadedFile u : database.getUploads()) {
                    ps.setString(1, u.getId());
                    ps.setString(2, u.getSubjectId());
                    ps.setString(3, u.getOriginalName());
                    ps.setString(4, u.getStoredName());
                    ps.setLong(5, u.getSizeBytes());
                    ps.setString(6, u.getUploadedAt());
                    ps.setString(7, u.getFolder());
                    ps.addBatch();
                }
                ps.executeBatch();
            }

            try (PreparedStatement ps = conn.prepareStatement("""
                    INSERT INTO progress_entries (entry_key, value_json)
                    VALUES (?, ?)
                    """)) {
                for (Map.Entry<String, Object> entry : database.getProgress().entrySet()) {
                    ps.setString(1, entry.getKey());
                    ps.setString(2, writeJson(entry.getValue()));
                    ps.addBatch();
                }
                ps.executeBatch();
            }

            conn.commit();
        } catch (SQLException e) {
            throw new RuntimeException("Error al guardar en SQLite de MiCampus", e);
        }
    }

    private String writeJson(Object obj) {
        try {
            return mapper.writeValueAsString(obj);
        } catch (IOException e) {
            return "null";
        }
    }

    private <T> T readJson(String raw, TypeReference<T> ref, T fallback) {
        if (raw == null || raw.isBlank()) return fallback;
        try {
            return mapper.readValue(raw, ref);
        } catch (IOException e) {
            return fallback;
        }
    }
}
