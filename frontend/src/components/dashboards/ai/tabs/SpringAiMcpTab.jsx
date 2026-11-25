import React from 'react';

export default function SpringAiMcpTab({ onCopy, copiedSnippet }) {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>🔌</span>
        <span>Model Context Protocol (MCP) de Anthropic en Spring AI</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        El protocolo abierto estándar que soluciona el problema de integraciones N × M, permitiendo que cualquier servicio Java sea invocado como una herramienta por Claude.
      </p>

      <div className="spring-ai-callout success">
        <span>🌐</span>
        <div>
          <strong>¿Por qué MCP es revolucionario?</strong> Antes de MCP, cada proveedor de LLM requería un conector personalizado para acceder a herramientas externas. MCP unifica el protocolo en un estándar universal abierto donde los modelos pueden descubrir recursos, ejecutar herramientas y leer prompts estandarizados.
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        El Flujo de Secuencia MCP Paso a Paso
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1rem' }}>
        Observemos los 9 pasos del ciclo de comunicación entre el usuario, Spring Boot, Anthropic Claude y los servicios Java:
      </p>

      <div className="spring-ai-seq-grid">
        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 1</span>
            <span className="spring-ai-seq-role">Cliente ➔ Spring Boot</span>
          </div>
          <p className="spring-ai-seq-desc">El usuario o frontend envía una petición HTTP con su consulta en lenguaje natural.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 2</span>
            <span className="spring-ai-seq-role">Spring Boot ➔ Beans Java</span>
          </div>
          <p className="spring-ai-seq-desc">Spring Boot descubre todos los métodos anotados con <code>@Tool</code> en los servicios registrados.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 3</span>
            <span className="spring-ai-seq-role">Spring Boot ➔ Claude LLM</span>
          </div>
          <p className="spring-ai-seq-desc">Envía el prompt del usuario adjuntando los esquemas JSON de las herramientas Java disponibles.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 4</span>
            <span className="spring-ai-seq-role">Claude LLM ➔ Spring Boot</span>
          </div>
          <p className="spring-ai-seq-desc">Claude razona que necesita datos y emite una instrucción <code>ToolCall</code> con los parámetros calculados.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 5</span>
            <span className="spring-ai-seq-role">Spring Boot ➔ @Service</span>
          </div>
          <p className="spring-ai-seq-desc">Spring AI intercepta el <code>ToolCall</code> y ejecuta localmente el método Java correspondiente.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 6</span>
            <span className="spring-ai-seq-role">@Service ➔ Spring Boot</span>
          </div>
          <p className="spring-ai-seq-desc">El servicio Java consulta la base de datos o API y devuelve el resultado tipado.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 7</span>
            <span className="spring-ai-seq-role">Spring Boot ➔ Claude LLM</span>
          </div>
          <p className="spring-ai-seq-desc">Spring Boot serializa el resultado de la herramienta y se lo reenvía a Claude.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 8</span>
            <span className="spring-ai-seq-role">Claude LLM ➔ Spring Boot</span>
          </div>
          <p className="spring-ai-seq-desc">Claude sintetiza la respuesta final enriquecida con los datos reales obtenidos.</p>
        </div>

        <div className="spring-ai-seq-card">
          <div className="spring-ai-seq-header">
            <span className="spring-ai-seq-badge">Paso 9</span>
            <span className="spring-ai-seq-role">Spring Boot ➔ Cliente</span>
          </div>
          <p className="spring-ai-seq-desc">Spring Boot entrega la respuesta procesada al cliente HTTP en formato JSON o texto.</p>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        1. Dependencias Maven Oficiales (<code>pom.xml</code>)
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">pom.xml — Dependencias Spring AI & MCP</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>`, 'pom-mcp')}
          >
            {copiedSnippet === 'pom-mcp' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>`}
        </pre>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        2. Exposición de Herramientas Java con la Anotación <code>@Tool</code>
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">InventarioToolService.java — Definición de @Tool</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`package com.empresa.ai.tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
public class InventarioToolService {

    @Tool(description = "Consulta el stock disponible, almacén y fecha de reposición de un producto mediante su código SKU")
    public StockInfo consultarStock(String codigoSku) {
        // Lógica de acceso a base de datos relacional o ERP corporativo
        return new StockInfo(codigoSku, 142, "Almacén Central Madrid", "2026-11-15");
    }

    public record StockInfo(String sku, int unidades, String ubicacion, String fechaReposicion) {}
}`, 'tool-code')}
          >
            {copiedSnippet === 'tool-code' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`package com.empresa.ai.tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
public class InventarioToolService {

    @Tool(description = "Consulta el stock disponible, almacén y fecha de reposición de un producto mediante su código SKU")
    public StockInfo consultarStock(String codigoSku) {
        // Lógica de acceso a base de datos relacional o ERP corporativo
        return new StockInfo(codigoSku, 142, "Almacén Central Madrid", "2026-11-15");
    }

    public record StockInfo(String sku, int unidades, String ubicacion, String fechaReposicion) {}
}`}
        </pre>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        3. Conexión del Proveedor MCP al <code>ChatClient</code>
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">AsistenteMcpService.java — Inyección de McpToolCallbackProvider</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`package com.empresa.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.mcp.client.McpToolCallbackProvider;
import org.springframework.stereotype.Service;

@Service
public class AsistenteMcpService {

    private final ChatClient chatClient;

    public AsistenteMcpService(ChatClient.Builder builder, McpToolCallbackProvider mcpToolProvider) {
        this.chatClient = builder
                .defaultTools(mcpToolProvider) // Publica automáticamente las herramientas MCP hacia Claude
                .build();
    }

    public String procesarPeticion(String promptUsuario) {
        return this.chatClient.prompt()
                .user(promptUsuario)
                .call()
                .content(); // Gestiona de forma autónoma el bucle de invocación de herramientas
    }
}`, 'mcp-service')}
          >
            {copiedSnippet === 'mcp-service' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`package com.empresa.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.mcp.client.McpToolCallbackProvider;
import org.springframework.stereotype.Service;

@Service
public class AsistenteMcpService {

    private final ChatClient chatClient;

    public AsistenteMcpService(ChatClient.Builder builder, McpToolCallbackProvider mcpToolProvider) {
        this.chatClient = builder
                .defaultTools(mcpToolProvider) // Publica automáticamente las herramientas MCP hacia Claude
                .build();
    }

    public String procesarPeticion(String promptUsuario) {
        return this.chatClient.prompt()
                .user(promptUsuario)
                .call()
                .content(); // Gestiona de forma autónoma el bucle de invocación de herramientas
    }
}`}
        </pre>
      </div>
    </section>
  );
}
