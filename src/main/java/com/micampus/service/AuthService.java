package com.micampus.service;

import com.micampus.config.StorageProperties;
import com.micampus.model.CampusConfig;
import com.micampus.model.UserAccount;
import com.micampus.repository.CampusStore;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servicio de registro, login y sesiones firmadas (cookie HttpOnly HMAC-SHA256)
 * usando PBKDF2WithHmacSHA256 para almacenar contraseñas de forma segura.
 */
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    public static final String SESSION_COOKIE = "MICAMPUS_SESSION";
    private static final long SESSION_TTL_SECONDS = 7L * 24 * 3600;
    private static final long RESET_TTL_SECONDS = 15L * 60;
    private static final int PBKDF2_ITERATIONS = 65_536;
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCKOUT_SECONDS = 5L * 60;

    private record ResetEntry(String code, long expiresAtEpoch) {}
    private record FailedAttemptEntry(int count, long lockedUntilEpoch) {}

    private final CampusStore store;
    private final SmtpMailService smtpMailService;
    private final SecureRandom random = new SecureRandom();
    private final byte[] sessionSecret;
    private final Map<String, ResetEntry> resetTokens = new ConcurrentHashMap<>();
    private final Map<String, FailedAttemptEntry> failedLogins = new ConcurrentHashMap<>();

    public AuthService(
            CampusStore store,
            SmtpMailService smtpMailService,
            StorageProperties storageProperties,
            @Value("${micampus.auth.session-secret:}") String configuredSecret
    ) {
        this.store = store;
        this.smtpMailService = smtpMailService;
        this.sessionSecret = loadOrCreateSessionSecret(storageProperties, configuredSecret);
    }

    private byte[] loadOrCreateSessionSecret(StorageProperties storageProperties, String configuredSecret) {
        try {
            if (configuredSecret != null && !configuredSecret.isBlank()) {
                return MessageDigest.getInstance("SHA-256")
                        .digest(configuredSecret.trim().getBytes(StandardCharsets.UTF_8));
            }
            Path dataDir = Paths.get(storageProperties.getDataDir()).toAbsolutePath().normalize();
            Files.createDirectories(dataDir);
            Path secretFile = dataDir.resolve(".session-secret");
            if (Files.exists(secretFile)) {
                byte[] decoded = Base64.getDecoder().decode(Files.readString(secretFile, StandardCharsets.UTF_8).trim());
                if (decoded.length == 32) {
                    return decoded;
                }
            }
            byte[] key = new byte[32];
            this.random.nextBytes(key);
            Files.writeString(secretFile, Base64.getEncoder().encodeToString(key), StandardCharsets.UTF_8);
            return key;
        } catch (Exception e) {
            byte[] fallback = new byte[32];
            this.random.nextBytes(fallback);
            return fallback;
        }
    }

    public boolean isAuthRequired() {
        return true;
    }

    public boolean hasRegisteredUsers() {
        return store.read(db -> !db.getUsers().isEmpty());
    }

    public UserAccount register(String usernameRaw, String password, String displayName, String email) {
        String username = normalizeUsername(usernameRaw);
        if (username.length() < 3) {
            throw new IllegalArgumentException("El nombre de usuario debe tener al menos 3 caracteres.");
        }
        if (password == null || password.length() < 4) {
            throw new IllegalArgumentException("La contraseña debe tener al menos 4 caracteres.");
        }

        boolean exists = store.read(db -> db.getUsers().stream()
                .anyMatch(u -> username.equalsIgnoreCase(u.getUsername())));
        if (exists) {
            throw new IllegalArgumentException("Ese nombre de usuario ya está registrado.");
        }

        boolean isFirstUser = store.read(db -> db.getUsers().isEmpty());
        UserAccount account = new UserAccount();
        account.setId(UUID.randomUUID().toString().substring(0, 8));
        account.setUsername(username);
        account.setDisplayName((displayName != null && !displayName.isBlank()) ? displayName.trim() : username);
        account.setEmail(email != null ? email.trim() : "");
        account.setPasswordHash(hashPassword(password));
        account.setRole(isFirstUser ? "admin" : "student");
        account.setCreatedAt(LocalDateTime.now().withNano(0).toString());

        store.write(db -> {
            db.getUsers().add(account);
            if (isFirstUser) {
                // El primer usuario (propietario) hereda todo el campus ya trabajado sin ownerId
                String oid = account.getId();
                db.getSubjects().forEach(s -> { if (s.getOwnerId() == null || s.getOwnerId().isBlank()) s.setOwnerId(oid); });
                db.getGroups().forEach(g -> { if (g.getOwnerId() == null || g.getOwnerId().isBlank()) g.setOwnerId(oid); });
                db.getLessons().forEach(l -> { if (l.getOwnerId() == null || l.getOwnerId().isBlank()) l.setOwnerId(oid); });
                db.getTasks().forEach(t -> { if (t.getOwnerId() == null || t.getOwnerId().isBlank()) t.setOwnerId(oid); });
                db.getUploads().forEach(u -> { if (u.getOwnerId() == null || u.getOwnerId().isBlank()) u.setOwnerId(oid); });
                db.getQuizzes().forEach(q -> { if (q.getOwnerId() == null || q.getOwnerId().isBlank()) q.setOwnerId(oid); });

                if (db.getConfig() != null) {
                    db.getConfig().setAuthEnabled(true);
                    if (db.getConfig().getAuthUsername() == null || db.getConfig().getAuthUsername().isBlank()) {
                        db.getConfig().setAuthUsername(username);
                    }
                    db.getUserConfigs().put(oid, db.getConfig());
                }
            } else {
                // Cualquier nuevo usuario empieza desde cero con su propia configuración limpia
                CampusConfig fresh = new CampusConfig();
                fresh.setUserName(account.getDisplayName());
                fresh.setCampusTitle("MiCampus");
                fresh.setOnboardingCompleted(true);
                db.getUserConfigs().put(account.getId(), fresh);
            }
        });
        return account;
    }

    public Optional<UserAccount> authenticate(String usernameRaw, String password) {
        if (usernameRaw == null || password == null) return Optional.empty();
        String username = normalizeUsername(usernameRaw);

        long now = Instant.now().getEpochSecond();
        FailedAttemptEntry attempts = failedLogins.get(username);
        if (attempts != null && attempts.lockedUntilEpoch() > now) {
            throw new TooManyAttemptsException("Demasiados intentos fallidos. Espera unos minutos antes de volver a intentarlo.");
        }

        Optional<UserAccount> result = authenticateInternal(username, password);
        if (result.isPresent()) {
            failedLogins.remove(username);
        } else if (!username.isEmpty()) {
            int nextCount = (attempts == null || attempts.lockedUntilEpoch() > 0 && attempts.lockedUntilEpoch() <= now)
                    ? 1
                    : attempts.count() + 1;
            long lockUntil = nextCount >= MAX_FAILED_ATTEMPTS ? now + LOCKOUT_SECONDS : 0L;
            failedLogins.put(username, new FailedAttemptEntry(nextCount, lockUntil));
        }
        return result;
    }

    public static class TooManyAttemptsException extends RuntimeException {
        public TooManyAttemptsException(String message) {
            super(message);
        }
    }

    private Optional<UserAccount> authenticateInternal(String username, String password) {

        Optional<UserAccount> registered = store.read(db -> db.getUsers().stream()
                .filter(u -> username.equalsIgnoreCase(u.getUsername()))
                .findFirst());
        if (registered.isPresent()) {
            UserAccount user = registered.get();
            return verifyPassword(password, user.getPasswordHash()) ? Optional.of(user) : Optional.empty();
        }

        // Respaldo: credenciales únicas configuradas en Ajustes -> Usuario
        return store.read(db -> {
            CampusConfig cfg = db.getConfig();
            if (cfg != null && cfg.isAuthEnabled()
                    && cfg.getAuthUsername() != null && username.equalsIgnoreCase(cfg.getAuthUsername().trim())
                    && cfg.getAuthPassword() != null && MessageDigest.isEqual(
                            password.getBytes(StandardCharsets.UTF_8),
                            cfg.getAuthPassword().getBytes(StandardCharsets.UTF_8))) {
                UserAccount fallback = new UserAccount();
                fallback.setId("config-owner");
                fallback.setUsername(cfg.getAuthUsername().trim());
                fallback.setDisplayName(cfg.getUserName() != null && !cfg.getUserName().isBlank()
                        ? cfg.getUserName() : cfg.getAuthUsername().trim());
                fallback.setRole("admin");
                return Optional.of(fallback);
            }
            return Optional.empty();
        });
    }

    public boolean requestPasswordReset(String usernameRaw, String emailRaw) {
        String username = normalizeUsername(usernameRaw);
        if (username.isEmpty()) {
            throw new IllegalArgumentException("Indica tu nombre de usuario.");
        }
        UserAccount user = store.read(db -> db.getUsers().stream()
                .filter(u -> username.equalsIgnoreCase(u.getUsername()))
                .findFirst()
                .orElse(null));
        if (user == null) {
            throw new IllegalArgumentException("No existe ningún usuario registrado con ese nombre.");
        }
        String registeredEmail = user.getEmail() != null ? user.getEmail().trim() : "";
        if (!registeredEmail.isEmpty()) {
            String providedEmail = emailRaw != null ? emailRaw.trim() : "";
            if (!registeredEmail.equalsIgnoreCase(providedEmail)) {
                throw new IllegalArgumentException("El correo electrónico no coincide con el registrado en esa cuenta.");
            }
        }
        String code = String.format("%06d", random.nextInt(1_000_000));
        resetTokens.put(username, new ResetEntry(code, Instant.now().getEpochSecond() + RESET_TTL_SECONDS));

        String targetEmail = !registeredEmail.isEmpty() ? registeredEmail : (emailRaw != null ? emailRaw.trim() : "");
        boolean emailed = smtpMailService != null && smtpMailService.sendPasswordResetEmail(targetEmail, username, code);
        if (!emailed) {
            log.warn("[MiCampus] Código de recuperación de contraseña para '@{}': {} (válido 15 minutos)", username, code);
        }
        return emailed;
    }

    public void confirmPasswordReset(String usernameRaw, String code, String newPassword) {
        String username = normalizeUsername(usernameRaw);
        if (username.isEmpty() || code == null || code.isBlank()) {
            throw new IllegalArgumentException("Indica el usuario y el código de recuperación.");
        }
        if (newPassword == null || newPassword.length() < 4) {
            throw new IllegalArgumentException("La nueva contraseña debe tener al menos 4 caracteres.");
        }
        ResetEntry entry = resetTokens.get(username);
        if (entry == null || Instant.now().getEpochSecond() > entry.expiresAtEpoch()) {
            resetTokens.remove(username);
            throw new IllegalArgumentException("El código ha caducado o no existe. Solicita uno nuevo.");
        }
        if (!MessageDigest.isEqual(
                code.trim().getBytes(StandardCharsets.UTF_8),
                entry.code().getBytes(StandardCharsets.UTF_8))) {
            throw new IllegalArgumentException("El código de recuperación no es válido.");
        }

        store.write(db -> {
            UserAccount user = db.getUsers().stream()
                    .filter(u -> username.equalsIgnoreCase(u.getUsername()))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
            user.setPasswordHash(hashPassword(newPassword));
        });
        resetTokens.remove(username);
    }

    public void changePassword(String userId, String currentPassword, String newPassword) {
        if (userId == null || userId.isBlank()) {
            throw new IllegalArgumentException("Sesión no válida.");
        }
        if (newPassword == null || newPassword.length() < 4) {
            throw new IllegalArgumentException("La nueva contraseña debe tener al menos 4 caracteres.");
        }
        store.write(db -> {
            UserAccount user = db.getUsers().stream()
                    .filter(u -> userId.equals(u.getId()))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("Esta cuenta no admite cambio de contraseña desde aquí."));
            if (!verifyPassword(currentPassword, user.getPasswordHash())) {
                throw new IllegalArgumentException("La contraseña actual no es correcta.");
            }
            user.setPasswordHash(hashPassword(newPassword));
        });
    }

    public String peekResetCodeForTest(String usernameRaw) {
        ResetEntry entry = resetTokens.get(normalizeUsername(usernameRaw));
        return entry != null ? entry.code() : null;
    }

    public List<Map<String, Object>> listRegisteredUsers() {
        return store.read(db -> db.getUsers().stream()
                .map(u -> {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("id", u.getId());
                    item.put("username", u.getUsername());
                    item.put("displayName", u.getDisplayName());
                    item.put("email", u.getEmail());
                    item.put("role", u.getRole());
                    item.put("createdAt", u.getCreatedAt());
                    return item;
                })
                .toList());
    }

    public void deleteUserById(String targetUserId, String actingUserId) {
        if (targetUserId == null || targetUserId.isBlank()) {
            throw new IllegalArgumentException("ID de usuario no válido.");
        }
        if (targetUserId.equals(actingUserId)) {
            throw new IllegalArgumentException("No puedes eliminar tu propia cuenta activa.");
        }
        store.write(db -> {
            boolean removed = db.getUsers().removeIf(u -> targetUserId.equals(u.getId()));
            if (!removed) {
                throw new IllegalArgumentException("Usuario no encontrado.");
            }
            db.getUserConfigs().remove(targetUserId);
        });
    }

    public String createSessionToken(UserAccount user) {
        long exp = Instant.now().getEpochSecond() + SESSION_TTL_SECONDS;
        String payload = user.getId() + "|" + user.getUsername() + "|" + user.getRole() + "|" + exp;
        String encoded = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        String sig = sign(encoded);
        return encoded + "." + sig;
    }

    public Optional<Map<String, Object>> resolveSession(HttpServletRequest request) {
        if (request.getCookies() == null) return Optional.empty();
        for (Cookie c : request.getCookies()) {
            if (SESSION_COOKIE.equals(c.getName()) && c.getValue() != null) {
                Optional<Map<String, Object>> parsed = verifySessionToken(c.getValue());
                if (parsed.isPresent()) return parsed;
            }
        }
        return Optional.empty();
    }

    public String resolveRequestOwnerId(HttpServletRequest request) {
        if (request == null) return "";
        Optional<Map<String, Object>> session = resolveSession(request);
        if (session.isPresent()) {
            return String.valueOf(session.get().getOrDefault("id", ""));
        }
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Basic ")) {
            try {
                String decoded = new String(
                        Base64.getDecoder().decode(authHeader.substring("Basic ".length()).trim()),
                        StandardCharsets.UTF_8);
                int idx = decoded.indexOf(':');
                if (idx > 0) {
                    Optional<UserAccount> acc = authenticate(decoded.substring(0, idx), decoded.substring(idx + 1));
                    if (acc.isPresent()) return acc.get().getId();
                }
            } catch (IllegalArgumentException ignored) {
            }
        }
        return "";
    }

    public boolean matchesOwner(String itemOwnerId, String currentOwnerId) {
        if (currentOwnerId == null || currentOwnerId.isBlank()) {
            return true;
        }
        if (itemOwnerId == null || itemOwnerId.isBlank()) {
            // Solo el primer usuario / admin ve elementos heredados sin ownerId
            return store.read(db -> db.getUsers().isEmpty()
                    || currentOwnerId.equals(db.getUsers().get(0).getId())
                    || "config-owner".equals(currentOwnerId));
        }
        return currentOwnerId.equals(itemOwnerId);
    }

    public Optional<Map<String, Object>> verifySessionToken(String token) {
        try {
            int dot = token.indexOf('.');
            if (dot <= 0) return Optional.empty();
            String encoded = token.substring(0, dot);
            String sig = token.substring(dot + 1);
            String expectedSig = sign(encoded);
            if (!MessageDigest.isEqual(sig.getBytes(StandardCharsets.UTF_8), expectedSig.getBytes(StandardCharsets.UTF_8))) {
                return Optional.empty();
            }
            String payload = new String(Base64.getUrlDecoder().decode(encoded), StandardCharsets.UTF_8);
            String[] parts = payload.split("\\|");
            if (parts.length != 4) return Optional.empty();
            long exp = Long.parseLong(parts[3]);
            if (Instant.now().getEpochSecond() > exp) return Optional.empty();

            Map<String, Object> user = new LinkedHashMap<>();
            user.put("id", parts[0]);
            user.put("username", parts[1]);
            user.put("role", parts[2]);
            user.put("displayName", resolveDisplayName(parts[0], parts[1]));
            return Optional.of(user);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private String resolveDisplayName(String id, String username) {
        return store.read(db -> db.getUsers().stream()
                .filter(u -> id.equals(u.getId()) || username.equalsIgnoreCase(u.getUsername()))
                .map(UserAccount::getDisplayName)
                .filter(d -> d != null && !d.isBlank())
                .findFirst()
                .orElse(username));
    }

    private String normalizeUsername(String raw) {
        return raw == null ? "" : raw.trim().toLowerCase(Locale.ROOT);
    }

    private String hashPassword(String password) {
        try {
            byte[] salt = new byte[16];
            random.nextBytes(salt);
            PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, PBKDF2_ITERATIONS, 256);
            byte[] hash = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(salt) + ":" + Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new IllegalStateException("Error al cifrar contraseña", e);
        }
    }

    private boolean verifyPassword(String password, String stored) {
        if (stored == null || !stored.contains(":")) return false;
        try {
            String[] parts = stored.split(":", 2);
            byte[] salt = Base64.getDecoder().decode(parts[0]);
            byte[] expected = Base64.getDecoder().decode(parts[1]);
            PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, PBKDF2_ITERATIONS, 256);
            byte[] actual = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
            return MessageDigest.isEqual(actual, expected);
        } catch (Exception e) {
            return false;
        }
    }

    private String sign(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(sessionSecret, "HmacSHA256"));
            byte[] raw = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(raw);
        } catch (Exception e) {
            throw new IllegalStateException("Error al firmar sesión", e);
        }
    }
}
