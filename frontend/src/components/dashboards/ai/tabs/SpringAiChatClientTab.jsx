import React from 'react';

export default function SpringAiChatClientTab({ onCopy, copiedSnippet }) {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>🧠</span>
        <span>La Fluent API de ChatClient & Salidas Tipadas (JSON Estricto)</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        Cómo domesticar la naturaleza estocástica del LLM y forzar respuestas fuertemente tipadas en Java Records sin romper el tipado seguro.
      </p>

      <div className="spring-ai-grid-2">
        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">🎯</div>
          <h4 className="spring-ai-feature-title">System Prompts & Roles</h4>
          <p className="spring-ai-feature-desc">
            Alinean el tono, definen límites éticos, directivas de seguridad y evitan que el modelo se desvíe del objetivo del negocio.
          </p>
        </div>

        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">📦</div>
          <h4 className="spring-ai-feature-title">Output Converters (Structured Outputs)</h4>
          <p className="spring-ai-feature-desc">
            Transforman texto libre en objetos Java fuertemente tipados (<code>record</code>) mediante JSON Schema estricto compatible con Jackson.
          </p>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        Ejemplo Práctico: Auditoría de Seguridad con <code>entity(Record.class)</code>
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">AuditorSeguridadService.java — Structured Outputs con Java Record</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`package com.empresa.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuditorSeguridadService {

    private final ChatClient chatClient;

    public AuditorSeguridadService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public record AnalisisSeguridad(
        String nivelRiesgo,            // "CRÍTICO", "MEDIO", "BAJO"
        int puntuacionVulnerabilidad,  // 1 a 100
        List<String> vulnerabilidades, // CVEs o malas prácticas encontradas
        String recomendacionParche     // Código corregido sugerido
    ) {}

    public AnalisisSeguridad auditarCodigo(String codigoJava) {
        return this.chatClient.prompt()
                .system("Eres un auditor de seguridad sénior en Spring Boot. Analiza el código y responde estrictamente en el formato de datos requerido.")
                .user(codigoJava)
                .call()
                .entity(AnalisisSeguridad.class); // Mapeo determinista garantizado
    }
}`, 'structured-output')}
          >
            {copiedSnippet === 'structured-output' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`package com.empresa.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuditorSeguridadService {

    private final ChatClient chatClient;

    public AuditorSeguridadService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public record AnalisisSeguridad(
        String nivelRiesgo,            // "CRÍTICO", "MEDIO", "BAJO"
        int puntuacionVulnerabilidad,  // 1 a 100
        List<String> vulnerabilidades, // CVEs o malas prácticas encontradas
        String recomendacionParche     // Código corregido sugerido
    ) {}

    public AnalisisSeguridad auditarCodigo(String codigoJava) {
        return this.chatClient.prompt()
                .system("Eres un auditor de seguridad sénior en Spring Boot. Analiza el código y responde estrictamente en el formato de datos requerido.")
                .user(codigoJava)
                .call()
                .entity(AnalisisSeguridad.class); // Mapeo determinista garantizado
    }
}`}
        </pre>
      </div>

      <div className="spring-ai-callout warning">
        <span>⚡</span>
        <div>
          <strong>Streaming Reactivo:</strong> Para interfaces web en tiempo real tipo ChatGPT, en lugar de <code>.call().content()</code> se utiliza <code>.stream().content()</code>, el cual retorna un <code>Flux&lt;String&gt;</code> de Spring WebFlux consumible directamente mediante Server-Sent Events (SSE) en el navegador.
        </div>
      </div>
    </section>
  );
}
