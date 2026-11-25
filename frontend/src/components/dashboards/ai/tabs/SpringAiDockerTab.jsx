import React from 'react';

export default function SpringAiDockerTab({ onCopy, copiedSnippet }) {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>🐳</span>
        <span>Docker Compose & Despliegue de Arquitectura Híbrida</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        Orquestación lista para producción: Base de datos vectorial local (PGVector) + Inferencia local con Ollama + Razonamiento en la nube con Claude 3.5 Sonnet.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        1. Infraestructura con Docker Compose (<code>docker-compose.yml</code>)
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">docker-compose.yml — PGVector & Ollama Local</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`version: '3.8'

services:
  pgvector-db:
    image: pgvector/pgvector:pg16
    container_name: pgvector-db
    environment:
      POSTGRES_DB: enterprise_ai_db
      POSTGRES_USER: spring_user
      POSTGRES_PASSWORD: spring_password
    ports:
      - "5432:5432"
    volumes:
      - pgvector_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U spring_user -d enterprise_ai_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  ollama-local:
    image: ollama/ollama:latest
    container_name: ollama-local
    ports:
      - "11434:11434"
    volumes:
      - ollama_storage:/root/.ollama

volumes:
  pgvector_data:
  ollama_storage:`, 'docker-compose')}
          >
            {copiedSnippet === 'docker-compose' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`version: '3.8'

services:
  pgvector-db:
    image: pgvector/pgvector:pg16
    container_name: pgvector-db
    environment:
      POSTGRES_DB: enterprise_ai_db
      POSTGRES_USER: spring_user
      POSTGRES_PASSWORD: spring_password
    ports:
      - "5432:5432"
    volumes:
      - pgvector_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U spring_user -d enterprise_ai_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  ollama-local:
    image: ollama/ollama:latest
    container_name: ollama-local
    ports:
      - "11434:11434"
    volumes:
      - ollama_storage:/root/.ollama

volumes:
  pgvector_data:
  ollama_storage:`}
        </pre>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        2. Configuración Empresarial (<code>application.yml</code>)
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">application.yml — Gateway Híbrido</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`spring:
  application:
    name: enterprise-ai-mcp-gateway
  ai:
    anthropic:
      api-key: \${ANTHROPIC_API_KEY}
      chat:
        options:
          model: claude-3-5-sonnet-20241022
          temperature: 0.2
    vectorstore:
      pgvector:
        host: localhost
        port: 5432
        database-name: enterprise_ai_db
        username: spring_user
        password: spring_password
        index-type: HNSW
        distance-type: COSINE
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always`, 'app-yml')}
          >
            {copiedSnippet === 'app-yml' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`spring:
  application:
    name: enterprise-ai-mcp-gateway
  ai:
    anthropic:
      api-key: \${ANTHROPIC_API_KEY}
      chat:
        options:
          model: claude-3-5-sonnet-20241022
          temperature: 0.2
    vectorstore:
      pgvector:
        host: localhost
        port: 5432
        database-name: enterprise_ai_db
        username: spring_user
        password: spring_password
        index-type: HNSW
        distance-type: COSINE
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always`}
        </pre>
      </div>

      <div className="spring-ai-callout info">
        <span>🩺</span>
        <div>
          <strong>Observabilidad y Calidad:</strong> Al exponer <code>/actuator/health</code>, Spring AI reporta automáticamente la conectividad y latencia con PostgreSQL/PGVector y la API de Anthropic. Además, se aplican pruebas unitarias con Mockito para aislar las llamadas al LLM y evaluadores de fidelidad de Spring AI para comprobar alucinaciones antes del despliegue.
        </div>
      </div>
    </section>
  );
}
