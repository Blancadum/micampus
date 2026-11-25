import React from 'react';

export default function SpringAiArchitectureTab() {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>🗺️</span>
        <span>Arquitectura Integral: Spring AI y el Protocolo MCP</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        Cómo pasar del código determinista tradicional a la inteligencia probabilística mediante una arquitectura desacoplada, escalable y mantenible.
      </p>

      <div className="spring-ai-callout info">
        <span>💡</span>
        <div>
          <strong>Cimientos Profesionales de Software:</strong> La Inteligencia Artificial no reemplaza la arquitectura limpia; la necesita más que nunca. Integrar LLMs en código altamente acoplado crea deuda técnica inmanejable. Hablar de <em>«Cimientos y Arquitectura Backend Profesional»</em> significa asentar las bases para que cualquier funcionalidad de IA sea testeable, mantenible y robusta.
        </div>
      </div>

      {/* Esquema ASCII de Arquitectura Completa End-to-End */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.6rem', color: 'var(--text-title)' }}>
        Topología Completa del Sistema (De la Petición HTTP al RAG Local)
      </h3>
      <pre className="spring-ai-ascii-card">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│ ARQUITECTURA INTEGRAL ENTERPRISE CON SPRING AI & MCP                        │
│                                                                             │
│ [ Petición Usuario / Front ] ──► [ @RestController (Spring Boot) ]          │
│                                           │                                 │
│                                           ▼                                 │
│                             [ ChatClient / MCP Client ]                     │
│                                           │                                 │
│         ┌─────────────────────────────────┴─────────────────────────────────┐
│         ▼                                                                   ▼
│ [ Agente Anthropic Claude ] ◄────────(MCP Protocol)────────► [ @Service Java (@Tool) ]
│ (Razonamiento / Inferencia)                                                 │
│                                                                             ▼
│                                                                  [ RAG Local VectorStore ]
│                                                                  [ PGVector en Docker ]
└─────────────────────────────────────────────────────────────────────────────┘`}
      </pre>

      {/* Diagrama Arquitectónico Oficial */}
      <div className="spring-ai-diagram-wrapper">
        <img
          src="/fuentes/springboot/ai-spring/spring_ai_mcp_diagram.png"
          alt="Flujo Arquitectónico de Spring AI y Model Context Protocol (MCP) con Anthropic Claude"
          className="spring-ai-diagram-img"
        />
        <div className="spring-ai-diagram-caption">
          Diagrama Oficial de Flujo MCP: Tool Discovery, Schema Generation y Tool Execution Loop entre Anthropic Claude y Spring Boot
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-title)' }}>
        Los 3 Momentos Críticos del Flujo MCP
      </h3>

      <div className="spring-ai-pipeline">
        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">1</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Tool Discovery (Descubrimiento en Arranque)</h4>
            <p className="spring-ai-step-text">
              Durante el ciclo de inicialización del <code>ApplicationContext</code>, el cliente MCP de Spring AI escanea los beans del contenedor buscando métodos anotados con <code>@Tool</code>. Registra sus metadatos, parámetros y descripciones en lenguaje natural.
            </p>
          </div>
        </div>

        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">2</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Schema Generation (Conversión a JSON Schema)</h4>
            <p className="spring-ai-step-text">
              Spring AI traduce automáticamente las firmas de los métodos Java y los tipos de datos a especificaciones estándar de <strong>JSON Schema</strong>. Al enviar un prompt a Anthropic Claude, se adjunta este catálogo de herramientas disponibles.
            </p>
          </div>
        </div>

        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">3</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Tool Execution Loop (Bucle de Ejecución Automatizado)</h4>
            <p className="spring-ai-step-text">
              Si el modelo decide que necesita información externa para responder, emite un <code>ToolCall</code> con los parámetros calculados. Spring AI intercepta la llamada, ejecuta el método Java correspondiente de forma local, serializa el resultado y se lo devuelve al modelo para que elabore su respuesta final.
            </p>
          </div>
        </div>
      </div>

      <div className="spring-ai-grid-2">
        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">⚙️</div>
          <h4 className="spring-ai-feature-title">Programación Determinista</h4>
          <p className="spring-ai-feature-desc">
            Reglas fijas (<code>if/else</code>), consultas SQL directas y flujos secuenciales. Misma entrada garantiza siempre exactamente la misma salida sin margen de interpretación.
          </p>
        </div>

        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">🧠</div>
          <h4 className="spring-ai-feature-title">Inferencia Probabilística (GenAI)</h4>
          <p className="spring-ai-feature-desc">
            Comprensión de lenguaje natural, síntesis, razonamiento y orquestación dinámica. Las herramientas Java (<code>@Tool</code>) anclan la IA a datos y hechos reales y verificables.
          </p>
        </div>
      </div>
    </section>
  );
}
