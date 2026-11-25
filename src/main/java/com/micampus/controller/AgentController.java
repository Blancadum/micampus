package com.micampus.controller;

import com.micampus.service.AiAgentOrchestrator;
import com.micampus.service.TelegramBotService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * API REST para listar y ejecutar agentes especializados de IA y pipelines de contenido.
 */
@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AiAgentOrchestrator orchestrator;
    private final TelegramBotService telegramBotService;

    public AgentController(AiAgentOrchestrator orchestrator, TelegramBotService telegramBotService) {
        this.orchestrator = orchestrator;
        this.telegramBotService = telegramBotService;
    }

    @GetMapping
    public List<Map<String, Object>> listAgents() {
        return orchestrator.listAgents();
    }

    @PostMapping("/{agentId}/run")
    public Map<String, Object> runAgent(
            @PathVariable String agentId,
            @RequestBody(required = false) Map<String, Object> params
    ) throws IOException {
        return orchestrator.runAgent(agentId, params);
    }

    @PostMapping("/pipeline/material")
    public Map<String, Object> runMaterialPipeline(@RequestBody(required = false) Map<String, String> payload)
            throws IOException {
        String subjectCode = payload != null ? payload.getOrDefault("subjectCode", "") : "";
        String unit = payload != null ? payload.getOrDefault("unit", "u1") : "u1";
        return orchestrator.runMaterialPipeline(subjectCode, unit);
    }

    @PostMapping("/chat")
    @SuppressWarnings("unchecked")
    public Map<String, Object> chatWithAgent(@RequestBody(required = false) Map<String, Object> payload)
            throws IOException {
        String agentId = payload != null ? String.valueOf(payload.getOrDefault("agentId", "auditor")) : "auditor";
        String subjectCode = payload != null ? String.valueOf(payload.getOrDefault("subjectCode", "")) : "";
        String unit = payload != null ? String.valueOf(payload.getOrDefault("unit", "u1")) : "u1";
        List<Map<String, String>> messages = payload != null && payload.get("messages") instanceof List<?> list
                ? (List<Map<String, String>>) list
                : List.of();
        return orchestrator.chatWithAgent(agentId, subjectCode, unit, messages);
    }

    @PostMapping("/notify-telegram")
    public Map<String, Object> notifyTelegram(@RequestBody(required = false) Map<String, String> payload) {
        String text = payload != null ? payload.getOrDefault("text", "").trim() : "";
        if (text.isBlank()) {
            return Map.of("status", "error", "message", "Texto vacío.");
        }
        telegramBotService.sendToConfiguredChat(text);
        return Map.of("status", "ok");
    }
}
