package com.micampus.service;

import com.micampus.model.CampusConfig;
import com.micampus.repository.CampusStore;
import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Properties;

/**
 * Envío de correos transaccionales por SMTP usando jakarta.mail.
 * Lee configuración de variables micampus.smtp.* (o reutiliza la cuenta IMAP de Ajustes si existe).
 */
@Service
public class SmtpMailService {

    private static final Logger log = LoggerFactory.getLogger(SmtpMailService.class);

    private final CampusStore store;
    private final String smtpHost;
    private final int smtpPort;
    private final String smtpUser;
    private final String smtpPassword;
    private final String smtpFrom;

    public SmtpMailService(
            CampusStore store,
            @Value("${micampus.smtp.host:}") String smtpHost,
            @Value("${micampus.smtp.port:587}") int smtpPort,
            @Value("${micampus.smtp.user:}") String smtpUser,
            @Value("${micampus.smtp.password:}") String smtpPassword,
            @Value("${micampus.smtp.from:}") String smtpFrom
    ) {
        this.store = store;
        this.smtpHost = smtpHost != null ? smtpHost.trim() : "";
        this.smtpPort = smtpPort > 0 ? smtpPort : 587;
        this.smtpUser = smtpUser != null ? smtpUser.trim() : "";
        this.smtpPassword = smtpPassword != null ? smtpPassword.trim() : "";
        this.smtpFrom = smtpFrom != null ? smtpFrom.trim() : "";
    }

    public boolean sendPasswordResetEmail(String toEmail, String username, String code) {
        if (toEmail == null || toEmail.isBlank()) {
            return false;
        }

        SmtpSettings settings = resolveSettings();
        if (settings == null) {
            return false;
        }

        try {
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", settings.host());
            props.put("mail.smtp.port", String.valueOf(settings.port()));
            props.put("mail.smtp.connectiontimeout", "10000");
            props.put("mail.smtp.timeout", "10000");

            Session session = Session.getInstance(props, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(settings.user(), settings.password());
                }
            });

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(settings.from()));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail.trim(), false));
            message.setSubject("MiCampus — Código de recuperación de contraseña", StandardCharsets.UTF_8.name());
            message.setText(
                    "Hola @" + username + ",\n\n"
                    + "Has solicitado restablecer tu contraseña en MiCampus.\n"
                    + "Tu código de verificación es: " + code + "\n\n"
                    + "Este código caduca en 15 minutos. Si no lo solicitaste, ignora este correo.",
                    StandardCharsets.UTF_8.name()
            );

            Transport.send(message);
            log.info("[MiCampus] Código de recuperación enviado por correo a '{}'", toEmail.trim());
            return true;
        } catch (Exception e) {
            log.warn("[MiCampus] No se pudo enviar el correo SMTP a '{}': {}", toEmail.trim(), e.getMessage());
            return false;
        }
    }

    private SmtpSettings resolveSettings() {
        if (!smtpHost.isEmpty() && !smtpUser.isEmpty() && !smtpPassword.isEmpty()) {
            String from = !smtpFrom.isEmpty() ? smtpFrom : smtpUser;
            return new SmtpSettings(smtpHost, smtpPort, smtpUser, smtpPassword, from);
        }

        CampusConfig cfg = store.read(db -> db.getConfig());
        if (cfg != null && cfg.getEmailImapUser() != null && !cfg.getEmailImapUser().isBlank()
                && cfg.getEmailImapPassword() != null && !cfg.getEmailImapPassword().isBlank()) {
            String imapHost = cfg.getEmailImapHost() != null ? cfg.getEmailImapHost().trim() : "imap.gmail.com";
            String derivedHost = imapHost.startsWith("imap.") ? "smtp." + imapHost.substring(5) : "smtp.gmail.com";
            String user = cfg.getEmailImapUser().trim();
            return new SmtpSettings(derivedHost, 587, user, cfg.getEmailImapPassword().trim(), user);
        }
        return null;
    }

    private record SmtpSettings(String host, int port, String user, String password, String from) {}
}
