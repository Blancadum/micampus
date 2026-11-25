import React from 'react';

export default function SpringAiPatronesTab() {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>📊</span>
        <span>Matriz de Patrones de Inferencia & Chuleta de Ingeniería</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        Catálogo de desafíos frecuentes en Inteligencia Artificial Generativa y sus patrones de solución correspondientes en Spring AI.
      </p>

      <div className="spring-ai-table-wrapper">
        <table className="spring-ai-table">
          <thead>
            <tr>
              <th>Desafío en IA Generativa</th>
              <th>Patrón de Solución en Spring AI</th>
              <th>Implementación Técnica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Orientar el comportamiento y tono</strong></td>
              <td>Mensajes del Sistema (*System Prompt*)</td>
              <td><code>chatClient.prompt().system("...")</code></td>
            </tr>
            <tr>
              <td><strong>Respuestas sin estructura fija</strong></td>
              <td>Convertidores de Salida (*Output Converters*)</td>
              <td><code>.call().entity(MiRecord.class)</code></td>
            </tr>
            <tr>
              <td><strong>Falta de datos corporativos privados</strong></td>
              <td>Relleno de Prompt (*Prompt Stuffing*) / RAG</td>
              <td>Inyección de fragmentos contextuales</td>
            </tr>
            <tr>
              <td><strong>Ventana de contexto limitada</strong></td>
              <td>RAG (Generación Aumentada por Recuperación)</td>
              <td><code>VectorStore.similaritySearch(query)</code></td>
            </tr>
            <tr>
              <td><strong>Modelos y APIs sin estado (Stateless)</strong></td>
              <td>Memoria de Conversación (*Chat Memory*)</td>
              <td><code>MessageChatMemoryAdvisor</code></td>
            </tr>
            <tr>
              <td><strong>Ejecución de acciones en sistemas externos</strong></td>
              <td>Protocolo MCP & Invocación de Funciones</td>
              <td><code>@Tool</code> + <code>McpToolCallbackProvider</code></td>
            </tr>
            <tr>
              <td><strong>Presencia de alucinaciones</strong></td>
              <td>Evaluadores de Fidelidad (*Evaluators*)</td>
              <td><code>RelevancyEvaluator</code> de Spring AI</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-title)' }}>
        Directivas Clave para Arquitectos y Agentes Desarrolladores
      </h3>

      <div className="spring-ai-grid-2">
        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">📝</div>
          <h4 className="spring-ai-feature-title">Descripciones de @Tool</h4>
          <p className="spring-ai-feature-desc">
            El LLM decide invocar una herramienta basándose exclusivamente en su descripción en lenguaje natural. Redacta descripciones claras indicando qué hace la herramienta, qué parámetros espera y qué tipo de datos retorna.
          </p>
        </div>

        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">🔄</div>
          <h4 className="spring-ai-feature-title">Conmutación de Proveedores</h4>
          <p className="spring-ai-feature-desc">
            Mantén tu código Java 100% desacoplado de las librerías propietarias de OpenAI o Anthropic. Alternar entre modelos cloud (Claude) y locales (Ollama) solo requiere cambiar las propiedades en <code>application.yml</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
