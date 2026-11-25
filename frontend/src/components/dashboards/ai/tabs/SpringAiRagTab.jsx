import React from 'react';

export default function SpringAiRagTab({ onCopy, copiedSnippet }) {
  return (
    <section className="spring-ai-content-card">
      <h2 className="spring-ai-section-title">
        <span>🛡️</span>
        <span>RAG Privado Local: PGVector, Embeddings y Cero Alucinaciones</span>
      </h2>
      <p className="spring-ai-section-subtitle">
        Cómo fundamentar las respuestas de la IA en documentos corporativos privados sin que la información confidencial abandone tu infraestructura.
      </p>

      <div className="spring-ai-grid-2">
        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">🔍</div>
          <h4 className="spring-ai-feature-title">Similitud Semántica vs Léxica</h4>
          <p className="spring-ai-feature-desc">
            Un Vector Store no busca coincidencias exactas de texto; calcula la <strong>distancia coseno</strong> en un espacio vectorial multidimensional para comprender el significado conceptual de la consulta.
          </p>
        </div>

        <div className="spring-ai-feature-card">
          <div className="spring-ai-feature-icon">💻</div>
          <h4 className="spring-ai-feature-title">Inferencia Local con Ollama</h4>
          <p className="spring-ai-feature-desc">
            Ejecución de modelos open-weights (Llama 3, DeepSeek, Mistral) en servidores internos: <strong>privacidad absoluta</strong>, <strong>coste cero por token</strong> y <strong>disponibilidad offline</strong>.
          </p>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        El Pipeline de 4 Pasos de la Arquitectura RAG
      </h3>

      <div className="spring-ai-pipeline">
        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">1</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Ingesta de Documentos</h4>
            <p className="spring-ai-step-text">
              Carga de archivos PDF, Word, Markdown, hojas de cálculo o exportaciones de bases de datos mediante los lectores documentales de Spring AI (<code>PagePdfDocumentReader</code>, <code>TikaDocumentReader</code>).
            </p>
          </div>
        </div>

        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">2</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Chunking (Fragmentación Semántica)</h4>
            <p className="spring-ai-step-text">
              División del texto en bloques pequeños (típicamente 500-800 tokens con solapamiento del 10%) con <code>TokenTextSplitter</code> para no saturar la ventana de contexto.
            </p>
          </div>
        </div>

        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">3</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Vectorización (Embeddings)</h4>
            <p className="spring-ai-step-text">
              Conversión de cada fragmento a un vector numérico de alta dimensionalidad (ej. 1536 dimensiones con OpenAI o 768 con Ollama <code>nomic-embed-text</code>).
            </p>
          </div>
        </div>

        <div className="spring-ai-step-row">
          <span className="spring-ai-step-num">4</span>
          <div className="spring-ai-step-body">
            <h4 className="spring-ai-step-title">Almacenamiento en VectorStore (PGVector)</h4>
            <p className="spring-ai-step-text">
              Indexación de los vectores en PostgreSQL utilizando la extensión <code>pgvector</code> con índices HNSW para búsquedas de similitud coseno ultrarrápidas.
            </p>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--text-title)' }}>
        Servicio RAG Local Expuesto como Herramienta MCP
      </h3>

      <div className="spring-ai-code-box">
        <div className="spring-ai-code-header">
          <span className="spring-ai-code-title">RAGLocalMCPToolService.java — Búsqueda Semántica VectorStore</span>
          <button
            type="button"
            className="spring-ai-copy-btn"
            onClick={() => onCopy && onCopy(`package com.empresa.ai.service;

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
            .collect(Collectors.joining("\n--- FRAGMENTO ---\n"));
    }
}`, 'rag-code')}
          >
            {copiedSnippet === 'rag-code' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="spring-ai-code-pre">
{`package com.empresa.ai.service;

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
            .collect(Collectors.joining("\n--- FRAGMENTO ---\n"));
    }
}`}
        </pre>
      </div>
    </section>
  );
}
