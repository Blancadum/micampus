package com.micampus.controller;

import com.micampus.model.UserAccount;
import com.micampus.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final boolean cookieSecure;
    private final String cookieSameSite;

    public AuthController(
            AuthService authService,
            @Value("${micampus.cookie.secure:false}") boolean cookieSecure,
            @Value("${micampus.cookie.same-site:Lax}") String cookieSameSite
    ) {
        this.authService = authService;
        this.cookieSecure = cookieSecure;
        this.cookieSameSite = cookieSameSite;
    }

    @GetMapping("/me")
    public Map<String, Object> me(HttpServletRequest request) {
        boolean authRequired = authService.isAuthRequired();
        Optional<Map<String, Object>> sessionUser = authService.resolveSession(request);

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("authRequired", authRequired);
        out.put("hasUsers", authService.hasRegisteredUsers());
        out.put("authenticated", sessionUser.isPresent());
        sessionUser.ifPresent(u -> out.put("user", u));
        return out;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Map<String, Object> body,
            HttpServletResponse response
    ) {
        try {
            String username = str(body, "username");
            String password = str(body, "password");
            String displayName = str(body, "displayName");
            String email = str(body, "email");
            boolean rememberMe = parseRememberMe(body);

            UserAccount created = authService.register(username, password, displayName, email);
            setSessionCookie(response, authService.createSessionToken(created), rememberMe);

            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "user", Map.of(
                            "id", created.getId(),
                            "username", created.getUsername(),
                            "displayName", created.getDisplayName(),
                            "role", created.getRole()
                    )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, Object> body,
            HttpServletResponse response
    ) {
        String username = str(body, "username");
        String password = str(body, "password");
        boolean rememberMe = parseRememberMe(body);

        Optional<UserAccount> userOpt;
        try {
            userOpt = authService.authenticate(username, password);
        } catch (AuthService.TooManyAttemptsException e) {
            return ResponseEntity.status(429).body(Map.of("error", e.getMessage()));
        }
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Usuario o contraseña incorrectos."));
        }

        UserAccount user = userOpt.get();
        setSessionCookie(response, authService.createSessionToken(user), rememberMe);
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "user", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "displayName", user.getDisplayName(),
                        "role", user.getRole()
                )
        ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, Object> body) {
        try {
            boolean emailed = authService.requestPasswordReset(str(body, "username"), str(body, "email"));
            String message = emailed
                    ? "Hemos enviado el código de recuperación a tu correo (válido 15 minutos)."
                    : "SMTP no configurado: código generado en la consola del servidor (válido 15 minutos).";
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "emailed", emailed,
                    "message", message
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, Object> body) {
        try {
            authService.confirmPasswordReset(str(body, "username"), str(body, "code"), str(body, "newPassword"));
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Contraseña actualizada. Ya puedes iniciar sesión."
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, Object> body,
            HttpServletRequest request
    ) {
        Optional<Map<String, Object>> session = authService.resolveSession(request);
        if (session.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Debes iniciar sesión para cambiar tu contraseña."));
        }
        try {
            String userId = String.valueOf(session.get().getOrDefault("id", ""));
            authService.changePassword(userId, str(body, "currentPassword"), str(body, "newPassword"));
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Contraseña actualizada correctamente."
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        response.addHeader(HttpHeaders.SET_COOKIE, buildSessionCookie("", 0).toString());
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers(HttpServletRequest request) {
        Optional<Map<String, Object>> session = authService.resolveSession(request);
        if (session.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Debes iniciar sesión."));
        }
        if (!"admin".equalsIgnoreCase(String.valueOf(session.get().getOrDefault("role", "")))) {
            return ResponseEntity.status(403).body(Map.of("error", "Acceso restringido a administradores."));
        }
        return ResponseEntity.ok(Map.of("users", authService.listRegisteredUsers()));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id, HttpServletRequest request) {
        Optional<Map<String, Object>> session = authService.resolveSession(request);
        if (session.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Debes iniciar sesión."));
        }
        if (!"admin".equalsIgnoreCase(String.valueOf(session.get().getOrDefault("role", "")))) {
            return ResponseEntity.status(403).body(Map.of("error", "Acceso restringido a administradores."));
        }
        try {
            String actingId = String.valueOf(session.get().getOrDefault("id", ""));
            authService.deleteUserById(id, actingId);
            return ResponseEntity.ok(Map.of("status", "ok"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private void setSessionCookie(HttpServletResponse response, String token, boolean rememberMe) {
        long maxAge = rememberMe ? 7L * 24 * 3600 : -1L;
        response.addHeader(HttpHeaders.SET_COOKIE, buildSessionCookie(token, maxAge).toString());
    }

    private static String str(Map<String, Object> body, String key) {
        Object val = body.get(key);
        return val != null ? String.valueOf(val) : "";
    }

    private static boolean parseRememberMe(Map<String, Object> body) {
        Object val = body.get("rememberMe");
        if (val instanceof Boolean b) return b;
        if (val instanceof String s) return Boolean.parseBoolean(s);
        return true;
    }

    private ResponseCookie buildSessionCookie(String value, long maxAgeSeconds) {
        return ResponseCookie.from(AuthService.SESSION_COOKIE, value)
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(maxAgeSeconds)
                .sameSite(cookieSameSite)
                .build();
    }
}
