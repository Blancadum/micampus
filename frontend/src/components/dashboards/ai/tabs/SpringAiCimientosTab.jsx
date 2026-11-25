import React from 'react';

export default function SpringAiCimientosTab() {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>🏛️</span>
        <span>Cimientos y Arquitectura Backend Profesional</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        Cómo los principios de ingeniería de software (IoC, ciclo de vida de Beans, 3 capas y APIs RESTful) sustentan los motores de IA empresariales.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        1. Los 3 Pilares del Núcleo de Spring Boot
      </h3>
      <div className="spring-ai-grid-2">
        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">⚡</div>
          <h4 className="spring-ai-feature-title">Autoconfiguración Inteligente</h4>
          <p className="spring-ai-feature-desc">
            Detecta las librerías presentes en el <em>classpath</em> (starters de Spring AI, drivers de base de datos) y configura los componentes por defecto automáticamente.
          </p>
        </div>
        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">📦</div>
          <h4 className="spring-ai-feature-title">Servidor Embebido</h4>
          <p className="spring-ai-feature-desc">
            Incluye servidores como Tomcat o Netty embebidos dentro del propio ejecutable <code>.jar</code>, facilitando el despliegue directo en contenedores Docker.
          </p>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        2. El Contenedor IoC y el Requisito Stateless en IA
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1rem' }}>
        El contenedor IoC (<em>Inversion of Control</em>) gestiona el ciclo de vida de los Beans. En Spring Boot, los beans son <strong>Singleton por defecto</strong>. Dado que múltiples hilos acceden simultáneamente al mismo Bean al invocar LLMs, es imprescindible que las clases de servicio sean <strong>Stateless (sin estado mutable por usuario)</strong>.
      </p>

      <pre className="spring-ai-ascii-card">
{`┌────────────────────────────────────────────────────────┐
│ ApplicationContext (IoC Container)                     │
│                                                        │
│   ┌──────────────────┐          ┌──────────────────┐   │
│   │ @RestController  │          │     @Service     │   │
│   │ (Singleton Bean) │────DI───>│ (Singleton Bean) │   │
│   └──────────────────┘          └────────┬─────────┘   │
│                                          │ DI          │
│                                 ┌────────▼─────────┐   │
│                                 │   @Repository    │   │
│                                 │ (Singleton Bean) │   │
│                                 └──────────────────┘   │
└────────────────────────────────────────────────────────┘`}
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        3. Arquitectura en 3 Capas y Principio de Inversión de Dependencias (SOLID)
      </h3>
      <pre className="spring-ai-ascii-card">
{`┌────────────────────────────────────────────────────────┐
│ CAPA DE PRESENTACIÓN                                   │
│ @RestController: Manejo de HTTP, DTOs y validaciones.  │
└───────────────────────────┬────────────────────────────┘
                            │ depende descendente ↓
┌───────────────────────────▼────────────────────────────┐
│ CAPA DE NEGOCIO                                        │
│ @Service: ChatClient, reglas de negocio y @Tool MCP.   │
└───────────────────────────┬────────────────────────────┘
                            │ depende descendente ↓
┌───────────────────────────▼────────────────────────────┐
│ CAPA DE DATOS                                          │
│ @Repository: Acceso a BBDD (JPA / SQL / VectorStore).  │
└────────────────────────────────────────────────────────┘`}
      </pre>

      <div className="spring-ai-callout success">
        <span>📐</span>
        <div>
          <strong>Inyección por Constructor (D en SOLID):</strong> La capa de negocio jamás debe instanciar directamente repositorios o clientes de IA con <code>new</code>. Inyectar dependencias por constructor garantiza la inmutabilidad de los campos (<code>final</code>) y permite mockear componentes en tests unitarios.
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        4. Diseño de APIs RESTful Profesionales para Servicios de IA
      </h3>
      <div className="spring-ai-table-wrapper">
        <table className="spring-ai-table">
          <thead>
            <tr>
              <th>Verbo HTTP</th>
              <th>Propósito en el Backend</th>
              <th>Código Éxito Típico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>GET</strong></td>
              <td>Consulta de recursos o estado de tareas de inferencia (sin alteración)</td>
              <td><code>200 OK</code></td>
            </tr>
            <tr>
              <td><strong>POST</strong></td>
              <td>Envío de prompts, generación de respuestas o creación de nuevos recursos</td>
              <td><code>201 Created</code> o <code>200 OK</code></td>
            </tr>
            <tr>
              <td><strong>PUT</strong></td>
              <td>Reemplazo completo de un recurso o configuración de agente</td>
              <td><code>200 OK</code></td>
            </tr>
            <tr>
              <td><strong>PATCH</strong></td>
              <td>Modificación parcial de parámetros de inferencia o metadatos</td>
              <td><code>200 OK</code></td>
            </tr>
            <tr>
              <td><strong>DELETE</strong></td>
              <td>Eliminación de colecciones de documentos o vectores en la BD</td>
              <td><code>204 No Content</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
