import{j as e,R as d,r as o,L as p}from"./vendor-react-B1CazfeU.js";function m(){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"🗺️"}),e.jsx("span",{children:"Arquitectura Integral: Spring AI y el Protocolo MCP"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"Cómo pasar del código determinista tradicional a la inteligencia probabilística mediante una arquitectura desacoplada, escalable y mantenible."}),e.jsxs("div",{className:"spring-ai-callout info",children:[e.jsx("span",{children:"💡"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Cimientos Profesionales de Software:"})," La Inteligencia Artificial no reemplaza la arquitectura limpia; la necesita más que nunca. Integrar LLMs en código altamente acoplado crea deuda técnica inmanejable. Hablar de ",e.jsx("em",{children:"«Cimientos y Arquitectura Backend Profesional»"})," significa asentar las bases para que cualquier funcionalidad de IA sea testeable, mantenible y robusta."]})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.6rem",color:"var(--text-title)"},children:"Topología Completa del Sistema (De la Petición HTTP al RAG Local)"}),e.jsx("pre",{className:"spring-ai-ascii-card",children:`┌─────────────────────────────────────────────────────────────────────────────┐
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
└─────────────────────────────────────────────────────────────────────────────┘`}),e.jsxs("div",{className:"spring-ai-diagram-wrapper",children:[e.jsx("img",{src:"/fuentes/springboot/ai-spring/spring_ai_mcp_diagram.png",alt:"Flujo Arquitectónico de Spring AI y Model Context Protocol (MCP) con Anthropic Claude",className:"spring-ai-diagram-img"}),e.jsx("div",{className:"spring-ai-diagram-caption",children:"Diagrama Oficial de Flujo MCP: Tool Discovery, Schema Generation y Tool Execution Loop entre Anthropic Claude y Spring Boot"})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"1rem",color:"var(--text-title)"},children:"Los 3 Momentos Críticos del Flujo MCP"}),e.jsxs("div",{className:"spring-ai-pipeline",children:[e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"1"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Tool Discovery (Descubrimiento en Arranque)"}),e.jsxs("p",{className:"spring-ai-step-text",children:["Durante el ciclo de inicialización del ",e.jsx("code",{children:"ApplicationContext"}),", el cliente MCP de Spring AI escanea los beans del contenedor buscando métodos anotados con ",e.jsx("code",{children:"@Tool"}),". Registra sus metadatos, parámetros y descripciones en lenguaje natural."]})]})]}),e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"2"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Schema Generation (Conversión a JSON Schema)"}),e.jsxs("p",{className:"spring-ai-step-text",children:["Spring AI traduce automáticamente las firmas de los métodos Java y los tipos de datos a especificaciones estándar de ",e.jsx("strong",{children:"JSON Schema"}),". Al enviar un prompt a Anthropic Claude, se adjunta este catálogo de herramientas disponibles."]})]})]}),e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"3"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Tool Execution Loop (Bucle de Ejecución Automatizado)"}),e.jsxs("p",{className:"spring-ai-step-text",children:["Si el modelo decide que necesita información externa para responder, emite un ",e.jsx("code",{children:"ToolCall"})," con los parámetros calculados. Spring AI intercepta la llamada, ejecuta el método Java correspondiente de forma local, serializa el resultado y se lo devuelve al modelo para que elabore su respuesta final."]})]})]})]}),e.jsxs("div",{className:"spring-ai-grid-2",children:[e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"⚙️"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Programación Determinista"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Reglas fijas (",e.jsx("code",{children:"if/else"}),"), consultas SQL directas y flujos secuenciales. Misma entrada garantiza siempre exactamente la misma salida sin margen de interpretación."]})]}),e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"🧠"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Inferencia Probabilística (GenAI)"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Comprensión de lenguaje natural, síntesis, razonamiento y orquestación dinámica. Las herramientas Java (",e.jsx("code",{children:"@Tool"}),") anclan la IA a datos y hechos reales y verificables."]})]})]})]})}function u(){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"🏛️"}),e.jsx("span",{children:"Cimientos y Arquitectura Backend Profesional"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"Cómo los principios de ingeniería de software (IoC, ciclo de vida de Beans, 3 capas y APIs RESTful) sustentan los motores de IA empresariales."}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"1.5rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"1. Los 3 Pilares del Núcleo de Spring Boot"}),e.jsxs("div",{className:"spring-ai-grid-2",children:[e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"⚡"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Autoconfiguración Inteligente"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Detecta las librerías presentes en el ",e.jsx("em",{children:"classpath"})," (starters de Spring AI, drivers de base de datos) y configura los componentes por defecto automáticamente."]})]}),e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"📦"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Servidor Embebido"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Incluye servidores como Tomcat o Netty embebidos dentro del propio ejecutable ",e.jsx("code",{children:".jar"}),", facilitando el despliegue directo en contenedores Docker."]})]})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"2. El Contenedor IoC y el Requisito Stateless en IA"}),e.jsxs("p",{style:{color:"var(--text-muted)",fontSize:"0.95rem",margin:"0 0 1rem"},children:["El contenedor IoC (",e.jsx("em",{children:"Inversion of Control"}),") gestiona el ciclo de vida de los Beans. En Spring Boot, los beans son ",e.jsx("strong",{children:"Singleton por defecto"}),". Dado que múltiples hilos acceden simultáneamente al mismo Bean al invocar LLMs, es imprescindible que las clases de servicio sean ",e.jsx("strong",{children:"Stateless (sin estado mutable por usuario)"}),"."]}),e.jsx("pre",{className:"spring-ai-ascii-card",children:`┌────────────────────────────────────────────────────────┐
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
└────────────────────────────────────────────────────────┘`}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"3. Arquitectura en 3 Capas y Principio de Inversión de Dependencias (SOLID)"}),e.jsx("pre",{className:"spring-ai-ascii-card",children:`┌────────────────────────────────────────────────────────┐
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
└────────────────────────────────────────────────────────┘`}),e.jsxs("div",{className:"spring-ai-callout success",children:[e.jsx("span",{children:"📐"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Inyección por Constructor (D en SOLID):"})," La capa de negocio jamás debe instanciar directamente repositorios o clientes de IA con ",e.jsx("code",{children:"new"}),". Inyectar dependencias por constructor garantiza la inmutabilidad de los campos (",e.jsx("code",{children:"final"}),") y permite mockear componentes en tests unitarios."]})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"4. Diseño de APIs RESTful Profesionales para Servicios de IA"}),e.jsx("div",{className:"spring-ai-table-wrapper",children:e.jsxs("table",{className:"spring-ai-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Verbo HTTP"}),e.jsx("th",{children:"Propósito en el Backend"}),e.jsx("th",{children:"Código Éxito Típico"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"GET"})}),e.jsx("td",{children:"Consulta de recursos o estado de tareas de inferencia (sin alteración)"}),e.jsx("td",{children:e.jsx("code",{children:"200 OK"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"POST"})}),e.jsx("td",{children:"Envío de prompts, generación de respuestas o creación de nuevos recursos"}),e.jsxs("td",{children:[e.jsx("code",{children:"201 Created"})," o ",e.jsx("code",{children:"200 OK"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"PUT"})}),e.jsx("td",{children:"Reemplazo completo de un recurso o configuración de agente"}),e.jsx("td",{children:e.jsx("code",{children:"200 OK"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"PATCH"})}),e.jsx("td",{children:"Modificación parcial de parámetros de inferencia o metadatos"}),e.jsx("td",{children:e.jsx("code",{children:"200 OK"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"DELETE"})}),e.jsx("td",{children:"Eliminación de colecciones de documentos o vectores en la BD"}),e.jsx("td",{children:e.jsx("code",{children:"204 No Content"})})]})]})]})})]})}function g({onCopy:a,copiedSnippet:i}){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"🔌"}),e.jsx("span",{children:"Model Context Protocol (MCP) de Anthropic en Spring AI"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"El protocolo abierto estándar que soluciona el problema de integraciones N × M, permitiendo que cualquier servicio Java sea invocado como una herramienta por Claude."}),e.jsxs("div",{className:"spring-ai-callout success",children:[e.jsx("span",{children:"🌐"}),e.jsxs("div",{children:[e.jsx("strong",{children:"¿Por qué MCP es revolucionario?"})," Antes de MCP, cada proveedor de LLM requería un conector personalizado para acceder a herramientas externas. MCP unifica el protocolo en un estándar universal abierto donde los modelos pueden descubrir recursos, ejecutar herramientas y leer prompts estandarizados."]})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"El Flujo de Secuencia MCP Paso a Paso"}),e.jsx("p",{style:{color:"var(--text-muted)",fontSize:"0.95rem",margin:"0 0 1rem"},children:"Observemos los 9 pasos del ciclo de comunicación entre el usuario, Spring Boot, Anthropic Claude y los servicios Java:"}),e.jsxs("div",{className:"spring-ai-seq-grid",children:[e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 1"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Cliente ➔ Spring Boot"})]}),e.jsx("p",{className:"spring-ai-seq-desc",children:"El usuario o frontend envía una petición HTTP con su consulta en lenguaje natural."})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 2"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Spring Boot ➔ Beans Java"})]}),e.jsxs("p",{className:"spring-ai-seq-desc",children:["Spring Boot descubre todos los métodos anotados con ",e.jsx("code",{children:"@Tool"})," en los servicios registrados."]})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 3"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Spring Boot ➔ Claude LLM"})]}),e.jsx("p",{className:"spring-ai-seq-desc",children:"Envía el prompt del usuario adjuntando los esquemas JSON de las herramientas Java disponibles."})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 4"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Claude LLM ➔ Spring Boot"})]}),e.jsxs("p",{className:"spring-ai-seq-desc",children:["Claude razona que necesita datos y emite una instrucción ",e.jsx("code",{children:"ToolCall"})," con los parámetros calculados."]})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 5"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Spring Boot ➔ @Service"})]}),e.jsxs("p",{className:"spring-ai-seq-desc",children:["Spring AI intercepta el ",e.jsx("code",{children:"ToolCall"})," y ejecuta localmente el método Java correspondiente."]})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 6"}),e.jsx("span",{className:"spring-ai-seq-role",children:"@Service ➔ Spring Boot"})]}),e.jsx("p",{className:"spring-ai-seq-desc",children:"El servicio Java consulta la base de datos o API y devuelve el resultado tipado."})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 7"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Spring Boot ➔ Claude LLM"})]}),e.jsx("p",{className:"spring-ai-seq-desc",children:"Spring Boot serializa el resultado de la herramienta y se lo reenvía a Claude."})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 8"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Claude LLM ➔ Spring Boot"})]}),e.jsx("p",{className:"spring-ai-seq-desc",children:"Claude sintetiza la respuesta final enriquecida con los datos reales obtenidos."})]}),e.jsxs("div",{className:"spring-ai-seq-card",children:[e.jsxs("div",{className:"spring-ai-seq-header",children:[e.jsx("span",{className:"spring-ai-seq-badge",children:"Paso 9"}),e.jsx("span",{className:"spring-ai-seq-role",children:"Spring Boot ➔ Cliente"})]}),e.jsx("p",{className:"spring-ai-seq-desc",children:"Spring Boot entrega la respuesta procesada al cliente HTTP en formato JSON o texto."})]})]}),e.jsxs("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:["1. Dependencias Maven Oficiales (",e.jsx("code",{children:"pom.xml"}),")"]}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"pom.xml — Dependencias Spring AI & MCP"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>`,"pom-mcp"),children:i==="pom-mcp"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-anthropic-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>`})]}),e.jsxs("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:["2. Exposición de Herramientas Java con la Anotación ",e.jsx("code",{children:"@Tool"})]}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"InventarioToolService.java — Definición de @Tool"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`package com.empresa.ai.tools;

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
}`,"tool-code"),children:i==="tool-code"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`package com.empresa.ai.tools;

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
}`})]}),e.jsxs("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:["3. Conexión del Proveedor MCP al ",e.jsx("code",{children:"ChatClient"})]}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"AsistenteMcpService.java — Inyección de McpToolCallbackProvider"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`package com.empresa.ai.service;

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
}`,"mcp-service"),children:i==="mcp-service"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`package com.empresa.ai.service;

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
}`})]})]})}function h({onCopy:a,copiedSnippet:i}){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"🧠"}),e.jsx("span",{children:"La Fluent API de ChatClient & Salidas Tipadas (JSON Estricto)"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"Cómo domesticar la naturaleza estocástica del LLM y forzar respuestas fuertemente tipadas en Java Records sin romper el tipado seguro."}),e.jsxs("div",{className:"spring-ai-grid-2",children:[e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"🎯"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"System Prompts & Roles"}),e.jsx("p",{className:"spring-ai-feature-desc",children:"Alinean el tono, definen límites éticos, directivas de seguridad y evitan que el modelo se desvíe del objetivo del negocio."})]}),e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"📦"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Output Converters (Structured Outputs)"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Transforman texto libre en objetos Java fuertemente tipados (",e.jsx("code",{children:"record"}),") mediante JSON Schema estricto compatible con Jackson."]})]})]}),e.jsxs("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:["Ejemplo Práctico: Auditoría de Seguridad con ",e.jsx("code",{children:"entity(Record.class)"})]}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"AuditorSeguridadService.java — Structured Outputs con Java Record"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`package com.empresa.ai.service;

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
}`,"structured-output"),children:i==="structured-output"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`package com.empresa.ai.service;

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
}`})]}),e.jsxs("div",{className:"spring-ai-callout warning",children:[e.jsx("span",{children:"⚡"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Streaming Reactivo:"})," Para interfaces web en tiempo real tipo ChatGPT, en lugar de ",e.jsx("code",{children:".call().content()"})," se utiliza ",e.jsx("code",{children:".stream().content()"}),", el cual retorna un ",e.jsx("code",{children:"Flux<String>"})," de Spring WebFlux consumible directamente mediante Server-Sent Events (SSE) en el navegador."]})]})]})}function x({onCopy:a,copiedSnippet:i}){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"🛡️"}),e.jsx("span",{children:"RAG Privado Local: PGVector, Embeddings y Cero Alucinaciones"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"Cómo fundamentar las respuestas de la IA en documentos corporativos privados sin que la información confidencial abandone tu infraestructura."}),e.jsxs("div",{className:"spring-ai-grid-2",children:[e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"🔍"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Similitud Semántica vs Léxica"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Un Vector Store no busca coincidencias exactas de texto; calcula la ",e.jsx("strong",{children:"distancia coseno"})," en un espacio vectorial multidimensional para comprender el significado conceptual de la consulta."]})]}),e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"💻"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Inferencia Local con Ollama"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Ejecución de modelos open-weights (Llama 3, DeepSeek, Mistral) en servidores internos: ",e.jsx("strong",{children:"privacidad absoluta"}),", ",e.jsx("strong",{children:"coste cero por token"})," y ",e.jsx("strong",{children:"disponibilidad offline"}),"."]})]})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"El Pipeline de 4 Pasos de la Arquitectura RAG"}),e.jsxs("div",{className:"spring-ai-pipeline",children:[e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"1"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Ingesta de Documentos"}),e.jsxs("p",{className:"spring-ai-step-text",children:["Carga de archivos PDF, Word, Markdown, hojas de cálculo o exportaciones de bases de datos mediante los lectores documentales de Spring AI (",e.jsx("code",{children:"PagePdfDocumentReader"}),", ",e.jsx("code",{children:"TikaDocumentReader"}),")."]})]})]}),e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"2"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Chunking (Fragmentación Semántica)"}),e.jsxs("p",{className:"spring-ai-step-text",children:["División del texto en bloques pequeños (típicamente 500-800 tokens con solapamiento del 10%) con ",e.jsx("code",{children:"TokenTextSplitter"})," para no saturar la ventana de contexto."]})]})]}),e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"3"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Vectorización (Embeddings)"}),e.jsxs("p",{className:"spring-ai-step-text",children:["Conversión de cada fragmento a un vector numérico de alta dimensionalidad (ej. 1536 dimensiones con OpenAI o 768 con Ollama ",e.jsx("code",{children:"nomic-embed-text"}),")."]})]})]}),e.jsxs("div",{className:"spring-ai-step-row",children:[e.jsx("span",{className:"spring-ai-step-num",children:"4"}),e.jsxs("div",{className:"spring-ai-step-body",children:[e.jsx("h4",{className:"spring-ai-step-title",children:"Almacenamiento en VectorStore (PGVector)"}),e.jsxs("p",{className:"spring-ai-step-text",children:["Indexación de los vectores en PostgreSQL utilizando la extensión ",e.jsx("code",{children:"pgvector"})," con índices HNSW para búsquedas de similitud coseno ultrarrápidas."]})]})]})]}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:"Servicio RAG Local Expuesto como Herramienta MCP"}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"RAGLocalMCPToolService.java — Búsqueda Semántica VectorStore"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`package com.empresa.ai.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RAGLocalMCPToolService {

    private final VectorStore vectorStore;

    public RAGLocalMCPToolService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Tool(description = "Consulta la base documental privada local para obtener contexto verificado sobre normativas internas, arquitectura y expedientes")
    public String consultarBaseConocimientoPrivada(String consultaSemantica) {
        List<Document> documentosRelacionados = vectorStore.similaritySearch(
            SearchRequest.query(consultaSemantica).withTopK(3)
        );

        if (documentosRelacionados.isEmpty()) {
            return "No se encontraron documentos relevantes en la base local.";
        }

        return documentosRelacionados.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("
--- FRAGMENTO ---
"));
    }
}`,"rag-code"),children:i==="rag-code"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`package com.empresa.ai.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RAGLocalMCPToolService {

    private final VectorStore vectorStore;

    public RAGLocalMCPToolService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Tool(description = "Consulta la base documental privada local para obtener contexto verificado sobre normativas internas, arquitectura y expedientes")
    public String consultarBaseConocimientoPrivada(String consultaSemantica) {
        List<Document> documentosRelacionados = vectorStore.similaritySearch(
            SearchRequest.query(consultaSemantica).withTopK(3)
        );

        if (documentosRelacionados.isEmpty()) {
            return "No se encontraron documentos relevantes en la base local.";
        }

        return documentosRelacionados.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("
--- FRAGMENTO ---
"));
    }
}`})]})]})}function j({onCopy:a,copiedSnippet:i}){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"🐳"}),e.jsx("span",{children:"Docker Compose & Despliegue de Arquitectura Híbrida"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"Orquestación lista para producción: Base de datos vectorial local (PGVector) + Inferencia local con Ollama + Razonamiento en la nube con Claude 3.5 Sonnet."}),e.jsxs("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"1.5rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:["1. Infraestructura con Docker Compose (",e.jsx("code",{children:"docker-compose.yml"}),")"]}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"docker-compose.yml — PGVector & Ollama Local"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`version: '3.8'

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
  ollama_storage:`,"docker-compose"),children:i==="docker-compose"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`version: '3.8'

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
  ollama_storage:`})]}),e.jsxs("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"0.8rem",color:"var(--text-title)"},children:["2. Configuración Empresarial (",e.jsx("code",{children:"application.yml"}),")"]}),e.jsxs("div",{className:"spring-ai-code-box",children:[e.jsxs("div",{className:"spring-ai-code-header",children:[e.jsx("span",{className:"spring-ai-code-title",children:"application.yml — Gateway Híbrido"}),e.jsx("button",{type:"button",className:"spring-ai-copy-btn",onClick:()=>a&&a(`spring:
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
      show-details: always`,"app-yml"),children:i==="app-yml"?"✓ Copiado":"Copiar"})]}),e.jsx("pre",{className:"spring-ai-code-pre",children:`spring:
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
      show-details: always`})]}),e.jsxs("div",{className:"spring-ai-callout info",children:[e.jsx("span",{children:"🩺"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Observabilidad y Calidad:"})," Al exponer ",e.jsx("code",{children:"/actuator/health"}),", Spring AI reporta automáticamente la conectividad y latencia con PostgreSQL/PGVector y la API de Anthropic. Además, se aplican pruebas unitarias con Mockito para aislar las llamadas al LLM y evaluadores de fidelidad de Spring AI para comprobar alucinaciones antes del despliegue."]})]})]})}function v(){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("h2",{className:"spring-ai-section-title",children:[e.jsx("span",{children:"📊"}),e.jsx("span",{children:"Matriz de Patrones de Inferencia & Chuleta de Ingeniería"})]}),e.jsx("p",{className:"spring-ai-section-subtitle",children:"Catálogo de desafíos frecuentes en Inteligencia Artificial Generativa y sus patrones de solución correspondientes en Spring AI."}),e.jsx("div",{className:"spring-ai-table-wrapper",children:e.jsxs("table",{className:"spring-ai-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Desafío en IA Generativa"}),e.jsx("th",{children:"Patrón de Solución en Spring AI"}),e.jsx("th",{children:"Implementación Técnica"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Orientar el comportamiento y tono"})}),e.jsx("td",{children:"Mensajes del Sistema (*System Prompt*)"}),e.jsx("td",{children:e.jsx("code",{children:'chatClient.prompt().system("...")'})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Respuestas sin estructura fija"})}),e.jsx("td",{children:"Convertidores de Salida (*Output Converters*)"}),e.jsx("td",{children:e.jsx("code",{children:".call().entity(MiRecord.class)"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Falta de datos corporativos privados"})}),e.jsx("td",{children:"Relleno de Prompt (*Prompt Stuffing*) / RAG"}),e.jsx("td",{children:"Inyección de fragmentos contextuales"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Ventana de contexto limitada"})}),e.jsx("td",{children:"RAG (Generación Aumentada por Recuperación)"}),e.jsx("td",{children:e.jsx("code",{children:"VectorStore.similaritySearch(query)"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Modelos y APIs sin estado (Stateless)"})}),e.jsx("td",{children:"Memoria de Conversación (*Chat Memory*)"}),e.jsx("td",{children:e.jsx("code",{children:"MessageChatMemoryAdvisor"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Ejecución de acciones en sistemas externos"})}),e.jsx("td",{children:"Protocolo MCP & Invocación de Funciones"}),e.jsxs("td",{children:[e.jsx("code",{children:"@Tool"})," + ",e.jsx("code",{children:"McpToolCallbackProvider"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Presencia de alucinaciones"})}),e.jsx("td",{children:"Evaluadores de Fidelidad (*Evaluators*)"}),e.jsxs("td",{children:[e.jsx("code",{children:"RelevancyEvaluator"})," de Spring AI"]})]})]})]})}),e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,marginTop:"2rem",marginBottom:"1rem",color:"var(--text-title)"},children:"Directivas Clave para Arquitectos y Agentes Desarrolladores"}),e.jsxs("div",{className:"spring-ai-grid-2",children:[e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"📝"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Descripciones de @Tool"}),e.jsx("p",{className:"spring-ai-feature-desc",children:"El LLM decide invocar una herramienta basándose exclusivamente en su descripción en lenguaje natural. Redacta descripciones claras indicando qué hace la herramienta, qué parámetros espera y qué tipo de datos retorna."})]}),e.jsxs("div",{className:"spring-ai-feature-card",children:[e.jsx("div",{className:"spring-ai-feature-icon",children:"🔄"}),e.jsx("h4",{className:"spring-ai-feature-title",children:"Conmutación de Proveedores"}),e.jsxs("p",{className:"spring-ai-feature-desc",children:["Mantén tu código Java 100% desacoplado de las librerías propietarias de OpenAI o Anthropic. Alternar entre modelos cloud (Claude) y locales (Ollama) solo requiere cambiar las propiedades en ",e.jsx("code",{children:"application.yml"}),"."]})]})]})]})}const b=[{id:"bloque-1",numero:1,titulo:"📌 Bloque 1: Cimientos y Arquitectura Backend Profesional",descripcion:"Todo motor de Inteligencia Artificial empresarial requiere una arquitectura de software sólida, modular y limpia sobre la que asentarse. Integrar modelos de lenguaje o bases de datos vectoriales en un código desordenado o altamente acoplado genera deuda técnica inmanejable.",temas:[{id:"tema-1",titulo:"Tema 1: El Núcleo de Spring Boot",puntos:[{num:"1.1",texto:"Tres pilares: Autoconfiguración inteligente, servidor embebido y opiniones firmes (starters)."},{num:"1.2",texto:"Contenedor IoC y ciclo de vida de los Beans."},{num:"1.3",texto:"Patrón Singleton y requisito innegociable Stateless en peticiones concurrentes a LLMs."}]},{id:"tema-2",titulo:"Tema 2: Arquitectura en 3 Capas y Principios SOLID",puntos:[{num:"2.1",texto:"Estructura en 3 capas: Presentación (@RestController), Negocio (@Service) y Datos (@Repository)."},{num:"2.2",texto:"Regla de dependencias descendentes e Inversión de dependencias (D en SOLID) mediante constructor."}]},{id:"tema-3",titulo:"Tema 3: Diseño de APIs RESTful",puntos:[{num:"3.1",texto:"Semántica y códigos de respuesta HTTP estándar (GET, POST, PUT, PATCH, DELETE)."},{num:"3.2",texto:"Implementación de DTOs con validación declarativa (@Valid) y respuestas con ResponseEntity."}]}]},{id:"bloque-2",numero:2,titulo:"📌 Bloque 2: Integración de IA Generativa con Spring AI",descripcion:"Uso del marco oficial de Spring diseñado para tratar a los modelos de lenguaje (LLMs) como si fuesen servicios estándar en Java.",temas:[{id:"tema-4",titulo:"Tema 4: La Abstracción ChatClient",puntos:[{num:"1.1",texto:"Configuración fluida y unificada con ChatClient.Builder."},{num:"1.2",texto:"Conmutación transparente entre proveedores (Anthropic Claude, Ollama, OpenAI) sin modificar código Java."}]},{id:"tema-5",titulo:"Tema 5: Patrones de Inferencia y Control de Salida",puntos:[{num:"2.1",texto:"System Prompts para guiar el rol del modelo y delimitar directivas de seguridad."},{num:"2.2",texto:"Output Converters para domesticar la salida probabilística forzando Java Records tipados."}]},{id:"tema-6",titulo:"Tema 6: Model Context Protocol (MCP) de Anthropic",puntos:[{num:"3.1",texto:"Fundamentos y arquitectura del protocolo MCP."},{num:"3.2",texto:"Flujo de secuencia de 9 pasos entre Cliente, Spring Boot, Claude LLM y servicios Java."},{num:"3.3",texto:"Exposición de servicios de negocio mediante la anotación @Tool."}]}]},{id:"bloque-3",numero:3,titulo:"📌 Bloque 3: RAG Privado Local (Retrieval-Augmented Generation)",descripcion:"Solución definitiva al problema de alucinaciones y confidencialidad de datos corporativos.",temas:[{id:"tema-7",titulo:"Tema 7: Fundamentos de la Arquitectura RAG",puntos:[{num:"1.1",texto:"Superación de alucinaciones y ausencia de datos privados."},{num:"1.2",texto:"El pipeline de 4 fases: Ingesta ➔ Chunking semántico ➔ Embeddings ➔ Indexación en VectorStore."}]},{id:"tema-8",titulo:"Tema 8: Vectors & Vector Store en Spring AI",puntos:[{num:"2.1",texto:"PGVector en PostgreSQL: Búsqueda por similitud semántica mediante distancia coseno e índices HNSW."},{num:"2.2",texto:"Inferencia local con Ollama: Privacidad absoluta, coste cero por token y operatividad offline."}]}]},{id:"bloque-4",numero:4,titulo:"📌 Bloque 4: Orquestación Híbrida y Despliegue Enterprise",descripcion:"Ensamblado industrial de arquitectura híbrida (RAG Local + Razonamiento en la Nube con Claude 3.5 Sonnet).",temas:[{id:"tema-9",titulo:"Tema 9: Despliegue de Infraestructura con Docker",puntos:[{num:"1.1",texto:"Orquestación con docker-compose.yml: contenedores PGVector y Ollama con healthchecks automáticos (pg_isready)."}]},{id:"tema-10",titulo:"Tema 10: Flujo Híbrido RAG Local + Agente Anthropic Claude",puntos:[{num:"2.1",texto:"Implementación del servicio Java RAGLocalMCPToolService con @Tool."},{num:"2.2",texto:"Configuración en application.yml para gateway híbrido seguro."}]},{id:"tema-11",titulo:"Tema 11: Calidad, Testing y Monitorización",puntos:[{num:"3.1",texto:"Pruebas unitarias con JUnit 5 y Mockito aislando herramientas."},{num:"3.2",texto:"Monitorización de salud con Spring Boot Actuator (/actuator/health)."},{num:"3.3",texto:"Evaluadores de alucinación y fidelidad de Spring AI."}]}]},{id:"bloque-5",numero:5,titulo:"📌 Bloque 5: Síntesis Arquitectónica y Directivas",descripcion:"Directrices maestras de diseño y catálogo de resolución de problemas en arquitecturas cognitivas.",temas:[{id:"tema-12",titulo:"Tema 12: Arquitectura Completa End-to-End",puntos:[{num:"1.1",texto:"Diagrama de topología integral: Usuario ➔ Controller ➔ ChatClient ➔ Claude ◄(MCP)► @Tool Java ➔ RAG Local."}]},{id:"tema-13",titulo:"Tema 13: Matriz de Patrones de Inferencia en Spring AI",puntos:[{num:"2.1",texto:"Catálogo exhaustivo de 7 desafíos en IA Generativa vs solución técnica en Spring AI."}]},{id:"tema-14",titulo:"Tema 14: Directivas de Configuración e Implementación para Agentes",puntos:[{num:"3.1",texto:"Reglas maestras para redactar descripciones de @Tool, inyectar ToolCallbackProvider y conmutación desacoplada."}]}]}];function S(){return e.jsxs("section",{className:"spring-ai-content-card",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem"},children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"spring-ai-section-title",style:{margin:0},children:[e.jsx("span",{children:"📜"}),e.jsx("span",{children:"Guía Técnica: Flujo MCP en Spring AI"})]}),e.jsxs("p",{className:"spring-ai-section-subtitle",style:{margin:"0.4rem 0 0"},children:["Documento técnico de referencia alojado en ",e.jsx("code",{children:"public/fuentes/springboot/ai-spring/Flujo MCP en Spring - Guia Tecnica.md"})]})]}),e.jsx("a",{href:"/fuentes/springboot/ai-spring/Flujo MCP en Spring - Guia Tecnica.md",download:"Flujo-MCP-en-Spring-Guia-Tecnica.md",style:{background:"#0284c7",color:"#ffffff",padding:"0.5rem 1rem",borderRadius:"8px",fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"0.4rem",fontSize:"0.88rem"},children:"📥 Descargar .md"})]}),e.jsxs("div",{className:"spring-ai-callout info",style:{marginBottom:"1.5rem"},children:[e.jsx("span",{children:"ℹ️"}),e.jsx("div",{children:"Esta guía consolida la transición de la programación tradicional (determinista) a la Inteligencia Artificial (probabilística) en entornos empresariales con Spring Boot, Anthropic Claude y Docker."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:b.map(a=>e.jsxs("div",{style:{background:"var(--bg-card, #ffffff)",border:"1px solid var(--border-subtle, #e2e8f0)",borderRadius:"14px",padding:"1.5rem"},children:[e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:800,color:"#0284c7",margin:"0 0 0.8rem"},children:a.titulo}),a.descripcion&&e.jsx("p",{style:{lineHeight:1.6,color:"var(--text-main, #334155)",margin:"0 0 1rem"},children:a.descripcion}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.8rem",paddingLeft:"0.5rem"},children:a.temas.map(i=>e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 0.3rem",fontSize:"1rem",fontWeight:750,color:"var(--text-title)"},children:i.titulo}),e.jsx("p",{style:{margin:0,fontSize:"0.88rem",color:"var(--text-muted)",lineHeight:1.5},children:i.puntos.map((s,r)=>e.jsxs(d.Fragment,{children:[r>0&&e.jsx("br",{}),"• ",e.jsx("strong",{children:s.num})," ",s.texto]},r))})]},i.id))})]},a.id))})]})}function N(){const[a,i]=o.useState("arquitectura"),[s,r]=o.useState(null),n=(c,l)=>{var t;(t=navigator==null?void 0:navigator.clipboard)!=null&&t.writeText&&(navigator.clipboard.writeText(c),r(l),setTimeout(()=>r(null),2e3))};return e.jsxs("div",{className:"spring-ai-page",children:[e.jsx("nav",{"aria-label":"Miga de pan",className:"spring-ai-nav",children:e.jsxs("div",{className:"spring-ai-nav-inner",children:[e.jsxs("div",{className:"spring-ai-breadcrumb",children:[e.jsx(p,{to:"/",className:"spring-ai-breadcrumb-link",children:"🏠 Inicio"}),e.jsx("span",{className:"spring-ai-breadcrumb-sep",children:"›"}),e.jsx("span",{className:"spring-ai-breadcrumb-link",children:"Inteligencia Artificial"}),e.jsx("span",{className:"spring-ai-breadcrumb-sep",children:"›"}),e.jsx("span",{className:"spring-ai-breadcrumb-current",children:"🤖 Spring AI & Protocolo MCP (RAG Local)"})]}),e.jsxs("div",{className:"spring-ai-quick-tags",children:[e.jsx("span",{className:"spring-ai-tag-pill spring-ai-tag-mcp",children:"⚡ MCP Anthropic"}),e.jsx("span",{className:"spring-ai-tag-pill spring-ai-tag-rag",children:"🛡️ RAG PGVector"}),e.jsx("span",{className:"spring-ai-tag-pill spring-ai-tag-claude",children:"🧠 Claude 3.5 Sonnet"})]})]})}),e.jsxs("main",{className:"spring-ai-main",children:[e.jsxs("header",{className:"spring-ai-hero",children:[e.jsxs("div",{className:"spring-ai-hero-badge-row",children:[e.jsx("div",{className:"spring-ai-hero-badge",children:"🚀 INGENIERÍA DE IA GENERATIVA EN JAVA"}),e.jsx("span",{style:{fontSize:"0.85rem",color:"var(--text-muted)",fontWeight:600},children:"Ecosistema Spring AI · Estándar Model Context Protocol (MCP) de Anthropic"})]}),e.jsx("h1",{className:"spring-ai-hero-title",children:"Spring AI & Arquitectura de Agentes con MCP"}),e.jsxs("p",{className:"spring-ai-hero-desc",children:["Guía técnica avanzada y estructurada para integrar Modelos de Lenguaje (LLMs), el estándar abierto",e.jsx("strong",{children:" Model Context Protocol (MCP) de Anthropic"})," y ",e.jsx("strong",{children:"RAG Privado Local (PGVector + Ollama)"}),"dentro de aplicaciones empresariales construidas con Spring Boot."]}),e.jsxs("div",{className:"spring-ai-stats-grid",children:[e.jsxs("div",{className:"spring-ai-stat-card",children:[e.jsx("span",{className:"spring-ai-stat-icon",children:"🔌"}),e.jsxs("div",{className:"spring-ai-stat-content",children:[e.jsx("span",{className:"spring-ai-stat-label",children:"Estándar MCP"}),e.jsx("span",{className:"spring-ai-stat-value",children:"Anthropic Protocol"})]})]}),e.jsxs("div",{className:"spring-ai-stat-card",children:[e.jsx("span",{className:"spring-ai-stat-icon",children:"💬"}),e.jsxs("div",{className:"spring-ai-stat-content",children:[e.jsx("span",{className:"spring-ai-stat-label",children:"Abstracción Core"}),e.jsx("span",{className:"spring-ai-stat-value",children:"Fluent ChatClient"})]})]}),e.jsxs("div",{className:"spring-ai-stat-card",children:[e.jsx("span",{className:"spring-ai-stat-icon",children:"🗄️"}),e.jsxs("div",{className:"spring-ai-stat-content",children:[e.jsx("span",{className:"spring-ai-stat-label",children:"Vector Store"}),e.jsx("span",{className:"spring-ai-stat-value",children:"PGVector (HNSW)"})]})]}),e.jsxs("div",{className:"spring-ai-stat-card",children:[e.jsx("span",{className:"spring-ai-stat-icon",children:"🔒"}),e.jsxs("div",{className:"spring-ai-stat-content",children:[e.jsx("span",{className:"spring-ai-stat-label",children:"Inferencia Local"}),e.jsx("span",{className:"spring-ai-stat-value",children:"Ollama (Zero Tokens)"})]})]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.8rem",marginTop:"1.4rem",flexWrap:"wrap"},children:[e.jsx("button",{type:"button",onClick:()=>i("guia-tecnica"),style:{background:"linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",color:"#ffffff",border:"none",padding:"0.65rem 1.3rem",borderRadius:"10px",fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.92rem",boxShadow:"0 2px 8px rgba(2, 132, 199, 0.25)"},children:"📖 Leer Guía Técnica Completa de Flujo MCP"}),e.jsx("a",{href:"/fuentes/springboot/ai-spring/Flujo MCP en Spring - Guia Tecnica.md",download:"Flujo-MCP-en-Spring-Guia-Tecnica.md",style:{background:"var(--bg-secondary, #ffffff)",color:"#0284c7",border:"1.5px solid rgba(2, 132, 199, 0.3)",padding:"0.65rem 1.3rem",borderRadius:"10px",fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.92rem"},children:"📥 Descargar Documento Fuente (.md)"})]})]}),e.jsx("nav",{className:"spring-ai-tabs-card","aria-label":"Navegación de módulos",children:e.jsxs("div",{className:"spring-ai-tabs-list",children:[e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="arquitectura"?"active":""}`,onClick:()=>i("arquitectura"),children:[e.jsx("span",{children:"🗺️"}),e.jsx("span",{children:"1. Arquitectura & Flujo MCP"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="cimientos"?"active":""}`,onClick:()=>i("cimientos"),children:[e.jsx("span",{children:"🏛️"}),e.jsx("span",{children:"2. Cimientos Backend (IoC & Capas)"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="mcp-tools"?"active":""}`,onClick:()=>i("mcp-tools"),children:[e.jsx("span",{children:"🔌"}),e.jsx("span",{children:"3. Protocolo MCP & @Tool"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="chatclient"?"active":""}`,onClick:()=>i("chatclient"),children:[e.jsx("span",{children:"🧠"}),e.jsx("span",{children:"4. ChatClient & Salidas Tipadas"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="rag-local"?"active":""}`,onClick:()=>i("rag-local"),children:[e.jsx("span",{children:"🛡️"}),e.jsx("span",{children:"5. RAG Privado (PGVector)"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="docker-despliegue"?"active":""}`,onClick:()=>i("docker-despliegue"),children:[e.jsx("span",{children:"🐳"}),e.jsx("span",{children:"6. Docker & Orquestación"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="patrones"?"active":""}`,onClick:()=>i("patrones"),children:[e.jsx("span",{children:"📊"}),e.jsx("span",{children:"7. Matriz de Patrones"})]}),e.jsxs("button",{type:"button",className:`spring-ai-tab-btn ${a==="guia-tecnica"?"active":""}`,onClick:()=>i("guia-tecnica"),children:[e.jsx("span",{children:"📜"}),e.jsx("span",{children:"8. Guía Técnica Completa"})]})]})}),a==="arquitectura"&&e.jsx(m,{}),a==="cimientos"&&e.jsx(u,{}),a==="mcp-tools"&&e.jsx(g,{onCopy:n,copiedSnippet:s}),a==="chatclient"&&e.jsx(h,{onCopy:n,copiedSnippet:s}),a==="rag-local"&&e.jsx(x,{onCopy:n,copiedSnippet:s}),a==="docker-despliegue"&&e.jsx(j,{onCopy:n,copiedSnippet:s}),a==="patrones"&&e.jsx(v,{}),a==="guia-tecnica"&&e.jsx(S,{})]})]})}export{N as default};
