import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SpringAiDashboard.css';

import SpringAiArchitectureTab from './tabs/SpringAiArchitectureTab';
import SpringAiCimientosTab from './tabs/SpringAiCimientosTab';
import SpringAiMcpTab from './tabs/SpringAiMcpTab';
import SpringAiChatClientTab from './tabs/SpringAiChatClientTab';
import SpringAiRagTab from './tabs/SpringAiRagTab';
import SpringAiDockerTab from './tabs/SpringAiDockerTab';
import SpringAiPatronesTab from './tabs/SpringAiPatronesTab';
import SpringAiGuiaTecnicaTab from './tabs/SpringAiGuiaTecnicaTab';

export default function SpringAiDashboard() {
  const [activeTab, setActiveTab] = useState('arquitectura');
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  const handleCopy = (code, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  return (
    <div className="spring-ai-page">
      {/* Barra de Miga de Pan (Breadcrumbs) */}
      <nav aria-label="Miga de pan" className="spring-ai-nav">
        <div className="spring-ai-nav-inner">
          <div className="spring-ai-breadcrumb">
            <Link to="/" className="spring-ai-breadcrumb-link">
              🏠 Inicio
            </Link>
            <span className="spring-ai-breadcrumb-sep">›</span>
            <span className="spring-ai-breadcrumb-link">
              Inteligencia Artificial
            </span>
            <span className="spring-ai-breadcrumb-sep">›</span>
            <span className="spring-ai-breadcrumb-current">
              🤖 Spring AI & Protocolo MCP (RAG Local)
            </span>
          </div>

          <div className="spring-ai-quick-tags">
            <span className="spring-ai-tag-pill spring-ai-tag-mcp">
              ⚡ MCP Anthropic
            </span>
            <span className="spring-ai-tag-pill spring-ai-tag-rag">
              🛡️ RAG PGVector
            </span>
            <span className="spring-ai-tag-pill spring-ai-tag-claude">
              🧠 Claude 3.5 Sonnet
            </span>
          </div>
        </div>
      </nav>

      <main className="spring-ai-main">
        {/* Hero Banner Ejecutivo */}
        <header className="spring-ai-hero">
          <div className="spring-ai-hero-badge-row">
            <div className="spring-ai-hero-badge">
              🚀 INGENIERÍA DE IA GENERATIVA EN JAVA
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Ecosistema Spring AI · Estándar Model Context Protocol (MCP) de Anthropic
            </span>
          </div>

          <h1 className="spring-ai-hero-title">
            Spring AI & Arquitectura de Agentes con MCP
          </h1>
          <p className="spring-ai-hero-desc">
            Guía técnica avanzada y estructurada para integrar Modelos de Lenguaje (LLMs), el estándar abierto 
            <strong> Model Context Protocol (MCP) de Anthropic</strong> y <strong>RAG Privado Local (PGVector + Ollama)</strong> 
            dentro de aplicaciones empresariales construidas con Spring Boot.
          </p>

          {/* Quick Metrics Bar */}
          <div className="spring-ai-stats-grid">
            <div className="spring-ai-stat-card">
              <span className="spring-ai-stat-icon">🔌</span>
              <div className="spring-ai-stat-content">
                <span className="spring-ai-stat-label">Estándar MCP</span>
                <span className="spring-ai-stat-value">Anthropic Protocol</span>
              </div>
            </div>
            <div className="spring-ai-stat-card">
              <span className="spring-ai-stat-icon">💬</span>
              <div className="spring-ai-stat-content">
                <span className="spring-ai-stat-label">Abstracción Core</span>
                <span className="spring-ai-stat-value">Fluent ChatClient</span>
              </div>
            </div>
            <div className="spring-ai-stat-card">
              <span className="spring-ai-stat-icon">🗄️</span>
              <div className="spring-ai-stat-content">
                <span className="spring-ai-stat-label">Vector Store</span>
                <span className="spring-ai-stat-value">PGVector (HNSW)</span>
              </div>
            </div>
            <div className="spring-ai-stat-card">
              <span className="spring-ai-stat-icon">🔒</span>
              <div className="spring-ai-stat-content">
                <span className="spring-ai-stat-label">Inferencia Local</span>
                <span className="spring-ai-stat-value">Ollama (Zero Tokens)</span>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveTab('guia-tecnica')}
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.3rem',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.92rem',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
              }}
            >
              📖 Leer Guía Técnica Completa de Flujo MCP
            </button>
            <a
              href="/fuentes/springboot/ai-spring/Flujo MCP en Spring - Guia Tecnica.md"
              download="Flujo-MCP-en-Spring-Guia-Tecnica.md"
              style={{
                background: 'var(--bg-secondary, #ffffff)',
                color: '#0284c7',
                border: '1.5px solid rgba(2, 132, 199, 0.3)',
                padding: '0.65rem 1.3rem',
                borderRadius: '10px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.92rem'
              }}
            >
              📥 Descargar Documento Fuente (.md)
            </a>
          </div>
        </header>

        {/* Barra de Pestañas Interactivas */}
        <nav className="spring-ai-tabs-card" aria-label="Navegación de módulos">
          <div className="spring-ai-tabs-list">
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'arquitectura' ? 'active' : ''}`}
              onClick={() => setActiveTab('arquitectura')}
            >
              <span>🗺️</span>
              <span>1. Arquitectura & Flujo MCP</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'cimientos' ? 'active' : ''}`}
              onClick={() => setActiveTab('cimientos')}
            >
              <span>🏛️</span>
              <span>2. Cimientos Backend (IoC & Capas)</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'mcp-tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('mcp-tools')}
            >
              <span>🔌</span>
              <span>3. Protocolo MCP & @Tool</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'chatclient' ? 'active' : ''}`}
              onClick={() => setActiveTab('chatclient')}
            >
              <span>🧠</span>
              <span>4. ChatClient & Salidas Tipadas</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'rag-local' ? 'active' : ''}`}
              onClick={() => setActiveTab('rag-local')}
            >
              <span>🛡️</span>
              <span>5. RAG Privado (PGVector)</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'docker-despliegue' ? 'active' : ''}`}
              onClick={() => setActiveTab('docker-despliegue')}
            >
              <span>🐳</span>
              <span>6. Docker & Orquestación</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'patrones' ? 'active' : ''}`}
              onClick={() => setActiveTab('patrones')}
            >
              <span>📊</span>
              <span>7. Matriz de Patrones</span>
            </button>
            <button
              type="button"
              className={`spring-ai-tab-btn ${activeTab === 'guia-tecnica' ? 'active' : ''}`}
              onClick={() => setActiveTab('guia-tecnica')}
            >
              <span>📜</span>
              <span>8. Guía Técnica Completa</span>
            </button>
          </div>
        </nav>

        {/* =========================================================================
            RENDERIZADO MODULAR DE PESTAÑAS
           ========================================================================= */}
        {activeTab === 'arquitectura' && <SpringAiArchitectureTab />}

        {activeTab === 'cimientos' && <SpringAiCimientosTab />}

        {activeTab === 'mcp-tools' && (
          <SpringAiMcpTab onCopy={handleCopy} copiedSnippet={copiedSnippet} />
        )}

        {activeTab === 'chatclient' && (
          <SpringAiChatClientTab onCopy={handleCopy} copiedSnippet={copiedSnippet} />
        )}

        {activeTab === 'rag-local' && (
          <SpringAiRagTab onCopy={handleCopy} copiedSnippet={copiedSnippet} />
        )}

        {activeTab === 'docker-despliegue' && (
          <SpringAiDockerTab onCopy={handleCopy} copiedSnippet={copiedSnippet} />
        )}

        {activeTab === 'patrones' && <SpringAiPatronesTab />}

        {activeTab === 'guia-tecnica' && <SpringAiGuiaTecnicaTab />}
      </main>
    </div>
  );
}
