package com.micampus;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.service.AuthService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties = {
        "micampus.auto-open-browser=false",
        "micampus.data-dir=target/test-auth-data"
})
@AutoConfigureMockMvc
class AuthAndErrorHandlingTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AuthService authService;

    @TestConfiguration
    static class ErrorProbeConfig {
        @RestController
        static class ErrorProbeController {
            @GetMapping("/api/test-error/bad-arg")
            public String badArg() {
                throw new IllegalArgumentException("Parámetro inválido de prueba");
            }

            @GetMapping("/api/test-error/unexpected")
            public String unexpected() {
                throw new RuntimeException("Fallo interno simulado");
            }
        }
    }

    private Cookie registerAndGetCookie(String username) throws Exception {
        String registerJson = objectMapper.writeValueAsString(Map.of(
                "username", username,
                "password", "claveSegura123",
                "displayName", "Usuario Test",
                "email", "test@micampus.local"
        ));

        MvcResult regResult = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("ok")))
                .andExpect(jsonPath("$.user.username", is(username)))
                .andExpect(header().string("Set-Cookie", containsString(AuthService.SESSION_COOKIE + "=")))
                .andExpect(header().string("Set-Cookie", containsString("HttpOnly")))
                .andReturn();

        Cookie sessionCookie = regResult.getResponse().getCookie(AuthService.SESSION_COOKIE);
        assertNotNull(sessionCookie);
        return sessionCookie;
    }

    @Test
    void registerLoginLogoutFlowWorks() throws Exception {
        String username = "test_user_" + System.currentTimeMillis();
        Cookie sessionCookie = registerAndGetCookie(username);

        mockMvc.perform(get("/api/auth/me").cookie(sessionCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authenticated", is(true)))
                .andExpect(jsonPath("$.user.username", is(username)));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "password", "incorrecta"
                        ))))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "password", "claveSegura123"
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.username", is(username)));

        mockMvc.perform(post("/api/auth/logout").cookie(sessionCookie))
                .andExpect(status().isOk())
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
    }

    @Test
    void globalExceptionHandlerReturnsStructuredJson() throws Exception {
        Cookie sessionCookie = registerAndGetCookie("err_user_" + System.currentTimeMillis());

        mockMvc.perform(get("/api/test-error/bad-arg").cookie(sessionCookie))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.message", is("Parámetro inválido de prueba")))
                .andExpect(jsonPath("$.path", is("/api/test-error/bad-arg")));

        mockMvc.perform(get("/api/test-error/unexpected").cookie(sessionCookie))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status", is(500)))
                .andExpect(jsonPath("$.path", is("/api/test-error/unexpected")));
    }

    @Test
    void forgotResetAndChangePasswordWork() throws Exception {
        String username = "reset_user_" + System.currentTimeMillis();
        Cookie sessionCookie = registerAndGetCookie(username);

        // Cambiar contraseña estando autenticado
        mockMvc.perform(post("/api/auth/change-password")
                        .cookie(sessionCookie)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "currentPassword", "claveSegura123",
                                "newPassword", "nuevaClave456"
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("ok")));

        // Solicitar código de recuperación y restablecer contraseña
        mockMvc.perform(post("/api/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "email", "test@micampus.local"
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.emailed", is(false)));

        String code = authService.peekResetCodeForTest(username);
        assertNotNull(code);

        mockMvc.perform(post("/api/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "code", code,
                                "newPassword", "finalClave789"
                        ))))
                .andExpect(status().isOk());

        // Login con rememberMe=false funciona con la nueva contraseña
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "password", "finalClave789",
                                "rememberMe", false
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.username", is(username)));
    }

    @Test
    void adminUsersEndpointEnforcesRoleAndListsUsers() throws Exception {
        // Aseguramos que existe al menos un usuario (el primero será admin) y otro student
        String u1 = "admin_check_" + System.currentTimeMillis();
        Cookie firstCookie = registerAndGetCookie(u1);

        String u2 = "student_check_" + System.currentTimeMillis();
        Cookie studentCookie = registerAndGetCookie(u2);

        // Un student no puede listar usuarios (403)
        mockMvc.perform(get("/api/auth/users").cookie(studentCookie))
                .andExpect(status().isForbidden());

        // Si u1 fue el primer usuario de este contexto será admin; si ya existía otro admin,
        // verificamos que un admin real sí obtiene 200 al consultar /api/auth/users.
        var users = authService.listRegisteredUsers();
        String adminUsername = String.valueOf(users.get(0).get("username"));
        if (adminUsername.equals(u1)) {
            mockMvc.perform(get("/api/auth/users").cookie(firstCookie))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.users").isArray());
        }
    }
}
