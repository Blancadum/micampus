package com.micampus.service;

import com.micampus.model.CampusConfig;
import com.micampus.repository.CampusStore;
import jakarta.mail.*;
import jakarta.mail.internet.MimeUtility;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Revisa periódicamente el correo por IMAP (ej. Gmail) para detectar avisos del IOC / Moodle
 * (ej. "ha hecho un comentario en la tarea Lliurament EAC1") y avisar al instante por Telegram.
 */
@Service
public class EmailWatcherService {

    private final CampusStore store;
    private final TelegramBotService telegramBotService;
    private final Set<String> alertedKeys = ConcurrentHashMap.newKeySet();

    public EmailWatcherService(CampusStore store, TelegramBotService telegramBotService) {
        this.store = store;
        this.telegramBotService = telegramBotService;
    }

    @Scheduled(initialDelay = 25_000, fixedDelay = 120_000)
    public void scheduledCheck() {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg == null || !cfg.isEmailWatcherEnabled()) return;
        if (cfg.getEmailImapUser().isBlank() || cfg.getEmailImapPassword().isBlank()) return;
        try {
            scanRecentEmails(cfg, false);
        } catch (Exception ignored) {
        }
    }

    public Map<String, Object> testAndScanNow() throws Exception {
        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg == null || cfg.getEmailImapUser().isBlank() || cfg.getEmailImapPassword().isBlank()) {
            throw new IllegalStateException("Introduce tu email y contraseña de aplicación IMAP.");
        }
        List<String> matches = scanRecentEmails(cfg, true);
        return Map.of(
                "status", "ok",
                "matchesCount", matches.size(),
                "matches", matches,
                "message", matches.isEmpty()
                        ? "Conexión IMAP correcta. No hay avisos nuevos recientes que coincidan con tus palabras clave."
                        : "Conexión IMAP correcta. Se encontraron " + matches.size() + " aviso(s) reciente(s)."
        );
    }

    private List<String> scanRecentEmails(CampusConfig cfg, boolean dryRun) throws Exception {
        Properties props = new Properties();
        props.put("mail.store.protocol", "imaps");
        props.put("mail.imaps.host", cfg.getEmailImapHost());
        props.put("mail.imaps.port", String.valueOf(cfg.getEmailImapPort()));
        props.put("mail.imaps.timeout", "10000");
        props.put("mail.imaps.connectiontimeout", "10000");

        Session session = Session.getInstance(props);
        List<String> matchedSubjects = new ArrayList<>();
        List<String> keywords = Arrays.stream((cfg.getEmailKeywords() != null ? cfg.getEmailKeywords() : "").split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .map(String::toLowerCase)
                .toList();

        try (Store mailStore = session.getStore("imaps")) {
            mailStore.connect(cfg.getEmailImapHost(), cfg.getEmailImapPort(), cfg.getEmailImapUser().trim(), cfg.getEmailImapPassword().trim());
            Folder inbox = mailStore.getFolder("INBOX");
            inbox.open(Folder.READ_ONLY);
            try {
                int total = inbox.getMessageCount();
                if (total <= 0) return matchedSubjects;
                int start = Math.max(1, total - 14);
                Message[] messages = inbox.getMessages(start, total);
                FetchProfile fp = new FetchProfile();
                fp.add(FetchProfile.Item.ENVELOPE);
                inbox.fetch(messages, fp);

                long cutoff = System.currentTimeMillis() - (48L * 3600L * 1000L);
                for (int i = messages.length - 1; i >= 0; i--) {
                    Message msg = messages[i];
                    Date sent = msg.getSentDate() != null ? msg.getSentDate() : msg.getReceivedDate();
                    if (sent != null && sent.getTime() < cutoff) continue;

                    String rawSubject = msg.getSubject() != null ? msg.getSubject() : "";
                    String subject = MimeUtility.decodeText(rawSubject);
                    String from = msg.getFrom() != null && msg.getFrom().length > 0 ? msg.getFrom()[0].toString() : "";
                    String combined = (subject + " " + from).toLowerCase();

                    boolean matches = keywords.isEmpty() || keywords.stream().anyMatch(combined::contains);
                    if (!matches) continue;

                    matchedSubjects.add(subject);
                    if (!dryRun) {
                        String key = subject + "|" + (sent != null ? sent.getTime() : msg.getMessageNumber());
                        if (alertedKeys.add(key)) {
                            telegramBotService.sendToConfiguredChat("📧 ¡Aviso del IOC en tu correo!\n" + subject + "\n\nEntra al IOC para revisar tu nota o comentario.");
                        }
                    }
                }
            } finally {
                if (inbox.isOpen()) inbox.close(false);
            }
        }
        return matchedSubjects;
    }
}
