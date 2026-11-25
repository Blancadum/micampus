import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

export default function AiRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article className={`campus-card card-ml ${isArchived ? 'card-is-archived' : ''}`}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Inteligencia Artificial (ML & GenAI)"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #0284c7, #06b6d4)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
            }}
          >
            🤖
          </div>
          <div className="campus-card-titles">
            <h3>Inteligencia Artificial</h3>
            <span className="campus-institution">Modelos Predictivos, Data Science & GenAI</span>
          </div>
        </div>

        <p className="campus-card-desc">
          Ecosistema de especialización en Inteligencia Artificial: arquitectura empresarial de <strong>Spring AI con Protocolo MCP & RAG Local</strong>, algoritmos de Machine Learning con Python e ingeniería de IA generativa.
        </p>

        <div className="campus-features-list">
          <Link
            to="/ia"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', fontWeight: 700 }}
          >
            ⚡ Spring AI & MCP
          </Link>
          <span className="feature-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
            🛡️ RAG PGVector
          </span>
          <Link
            to="/sepe/python"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' }}
          >
            🐍 Python & ML
          </Link>
          <a
            href="https://www.coursera.org/specializations/ibm-generative-ai-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(15, 98, 254, 0.1)', color: '#0f62fe' }}
          >
            🤖 IBM GenAI
          </a>
        </div>
      </div>

      <div className="campus-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: 'auto' }}>
        <Link
          to="/ia"
          className="btn-enter-campus"
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
            width: '100%',
            fontWeight: 700,
          }}
        >
          <span>🤖 Hub Spring AI & Protocolo MCP</span> <span>➔</span>
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <Link
            to="/sepe/python"
            className="btn-enter-campus btn-ml-action"
            style={{
              background: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid rgba(2, 132, 199, 0.3)',
              color: '#0284c7',
              textDecoration: 'none',
              padding: '0.45rem 0.6rem',
              fontSize: '0.82rem',
              justifyContent: 'center',
            }}
          >
            <span>🐍 Python & ML</span>
          </Link>
          <a
            href="https://www.coursera.org/specializations/ibm-generative-ai-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-enter-campus btn-ibm-action"
            style={{
              background: 'rgba(15, 98, 254, 0.08)',
              border: '1px solid rgba(15, 98, 254, 0.3)',
              color: '#0f62fe',
              textDecoration: 'none',
              padding: '0.45rem 0.6rem',
              fontSize: '0.82rem',
              justifyContent: 'center',
            }}
          >
            <span>IBM GenAI ↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
