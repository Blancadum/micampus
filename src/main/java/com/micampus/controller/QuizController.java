package com.micampus.controller;

import com.micampus.model.GeneratedQuiz;
import com.micampus.service.AuthService;
import com.micampus.service.QuizService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;
    private final AuthService authService;

    public QuizController(QuizService quizService, AuthService authService) {
        this.quizService = quizService;
        this.authService = authService;
    }

    @GetMapping
    public List<GeneratedQuiz> list(@RequestParam(required = false) String subjectId, HttpServletRequest request) {
        String ownerId = authService.resolveRequestOwnerId(request);
        return quizService.listForSubject(subjectId).stream()
                .filter(q -> authService.matchesOwner(q.getOwnerId(), ownerId))
                .toList();
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generate(@RequestBody(required = false) Map<String, Object> body, HttpServletRequest request) {
        String ownerId = authService.resolveRequestOwnerId(request);
        String subjectId = body != null ? String.valueOf(body.getOrDefault("subjectId", "")) : "";
        String unit = body != null ? String.valueOf(body.getOrDefault("unit", "")) : "";
        String source = body != null ? String.valueOf(body.getOrDefault("source", "web")) : "web";
        String mode = body != null ? String.valueOf(body.getOrDefault("mode", "repaso")) : "repaso";
        int count = 3;
        if (body != null && body.get("count") instanceof Number n) {
            count = n.intValue();
        }
        try {
            GeneratedQuiz generated = quizService.generateAndSaveQuiz(subjectId, unit, source, count, mode, ownerId);
            return ResponseEntity.ok(generated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IOException | InterruptedException e) {
            return ResponseEntity.status(502).body(Map.of("error", e.getMessage() != null ? e.getMessage() : "Error al generar quiz con IA"));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> rename(@PathVariable String id, @RequestBody Map<String, String> body) {
        String title = body != null ? body.get("title") : null;
        return quizService.renameQuiz(id, title)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return quizService.deleteQuiz(id)
                ? ResponseEntity.ok(Map.of("status", "deleted"))
                : ResponseEntity.notFound().build();
    }
}
