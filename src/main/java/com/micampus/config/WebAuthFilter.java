package com.micampus.config;

import com.micampus.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Protege las rutas /api/** mediante sesión HttpOnly (MICAMPUS_SESSION) o HTTP Basic Auth
 * cuando hay usuarios registrados o authEnabled está activo.
 * Las rutas SPA permiten cargar React para mostrar la pantalla de Login / Registro.
 */
@Component
public class WebAuthFilter extends OncePerRequestFilter {

    private final AuthService authService;

    public WebAuthFilter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String path = request.getRequestURI();
        if (!path.startsWith("/api/")
                || "/api/health".equals(path)
                || path.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (!authService.isAuthRequired()) {
            filterChain.doFilter(request, response);
            return;
        }

        if (authService.resolveSession(request).isPresent()) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Basic ")) {
            try {
                String base64Credentials = authHeader.substring("Basic ".length()).trim();
                String decoded = new String(Base64.getDecoder().decode(base64Credentials), StandardCharsets.UTF_8);
                int idx = decoded.indexOf(':');
                if (idx > 0) {
                    String user = decoded.substring(0, idx);
                    String pass = decoded.substring(idx + 1);
                    if (authService.authenticate(user, pass).isPresent()) {
                        filterChain.doFilter(request, response);
                        return;
                    }
                }
            } catch (IllegalArgumentException ignored) {
            }
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"error\":\"Authentication required\"}");
    }
}
