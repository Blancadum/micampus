import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

export default function SecondBrainRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article
      className={`campus-card ${isArchived ? 'card-is-archived' : ''}`}
      style={{
        borderColor: 'rgba(139, 92, 246, 0.4)',
        background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, var(--bg-card) 100%)',
      }}
    >
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Second Brain & 7 Pilares de Ingeniería"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
            }}
          >
            🧠
          </div>
          <div className="campus-card-titles">
            <h3>Second Brain · 7 Asignaturas Maestras</h3>
            <span className="campus-institution">Ingeniería Unificada: IOC · Accenture · SEPE · Agentic AI</span>
          </div>
        </div>

        <p className="campus-card-desc">
          Currículo unificado de ingeniería de software estructurado en 7 pilares tecnológicos con dashboards de asignatura, laboratorios prácticos con soluciones en pizarritas de código, temarios en LessonViewer y matriz de convalidación transversal.
        </p>

        <div className="campus-features-list">
          <span className="feature-tag">🏛️ Core & Algoritmia</span>
          <span className="feature-tag">🎨 Frontend & Accesibilidad</span>
          <span className="feature-tag">⚡ Backend & APIs REST</span>
          <span className="feature-tag">💾 Data & SQL</span>
          <span className="feature-tag">🐳 DevOps & UTM</span>
          <span className="feature-tag">🛡️ DevSecOps & QA</span>
          <span className="feature-tag">🤖 Agentic AI & SDD</span>
        </div>
      </div>

      <Link
        to="/brain"
        className="btn-enter-campus"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          color: '#ffffff',
          textDecoration: 'none',
        }}
      >
        <span>Explorar los 7 Pilares & Second Brain</span> <span>➔</span>
      </Link>
    </article>
  );
}
