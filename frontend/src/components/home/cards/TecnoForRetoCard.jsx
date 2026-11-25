import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

const TECNOFOR_COURSES = [
  {
    sigla: 'PYTHON',
    title: 'El Dato (50h · IFCD0062 · PCAP)',
    icon: '🐍',
    path: '/tecnofor?curso=python',
    className: 'btn-tecnofor-python',
    badge: '50h'
  },
  {
    sigla: 'JAVA',
    title: 'El Backend (30h · IFCD006PO · POO)',
    icon: '☕',
    path: '/tecnofor?curso=java',
    className: 'btn-tecnofor-java',
    badge: '30h'
  },
  {
    sigla: 'ANGULAR',
    title: 'El Frontend (30h · IFCD053PO · SPA)',
    icon: '🅰️',
    path: '/tecnofor?curso=angular',
    className: 'btn-tecnofor-angular',
    badge: '30h'
  }
];

export default function TecnoForRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article className={`campus-card card-tecnofor ${isArchived ? 'card-is-archived' : ''}`} style={{ border: '1px solid rgba(14, 165, 233, 0.28)' }}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="TecnoFor · Agentic Developer"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              fontWeight: 800,
              fontSize: '1.25rem'
            }}
          >
            {'{AI}'}
          </div>
          <div className="campus-card-titles" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0 }}>TecnoFor · Agentic Developer</h3>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0ea5e9', background: 'rgba(14, 165, 233, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                100% Subvencionado
              </span>
            </div>
            <span className="campus-institution">SEPE · 1ª Edición: 3 Nov – 26 Ene</span>
          </div>
        </div>

        <p className="campus-card-desc">
          Itinerario integral de desarrollo de software y agentes autónomos. Domina el ciclo completo de la ingeniería con 3 certificaciones SEPE y titulación en <strong>Spec Driven Development (SDD)</strong>.
        </p>
      </div>

      <div className="campus-card-actions ioc-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {/* Los 3 botones principales para los cursos (como en IOC) */}
        <div className="ioc-subjects-column" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {TECNOFOR_COURSES.map((course) => (
            <Link
              key={course.sigla}
              to={course.path}
              className={`btn-ioc-subject-row ${course.className}`}
              title={`Ver detalles de ${course.sigla}`}
            >
              <span className="btn-ioc-icon">{course.icon}</span>
              <div className="btn-ioc-info">
                <span className="btn-ioc-sigla">{course.sigla}</span>
                <span className="btn-ioc-title">{course.title}</span>
              </div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.22)', padding: '0.1rem 0.4rem', borderRadius: '6px', marginRight: '0.2rem' }}>
                {course.badge}
              </span>
              <span className="btn-ioc-arrow">➔</span>
            </Link>
          ))}

          {/* Fila destacada de IA Agéntica & SDD */}
          <Link
            to="/tecnofor?curso=agentes"
            className="btn-ioc-subject-row"
            style={{
              background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.28)'
            }}
            title="Especialización: Spec Driven Development con GitHub Spec Kit"
          >
            <span className="btn-ioc-icon">🤖</span>
            <div className="btn-ioc-info">
              <span className="btn-ioc-sigla" style={{ color: '#ffffff' }}>AGENTES</span>
              <span className="btn-ioc-title">Spec Driven Development (SDD)</span>
            </div>
            <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.25)', padding: '0.1rem 0.4rem', borderRadius: '6px', marginRight: '0.2rem' }}>
              Hito 2
            </span>
            <span className="btn-ioc-arrow">➔</span>
          </Link>
        </div>

        {/* Botón general para entrar a la Landing completa */}
        <Link
          to="/tecnofor"
          className="btn-enter-campus"
          style={{
            marginTop: '0.4rem',
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.15))',
            border: '1px solid rgba(14, 165, 233, 0.35)',
            color: '#0284c7',
            justifyContent: 'center',
            fontWeight: 700,
            textDecoration: 'none'
          }}
          title="Ver dossier oficial y landing interactiva completa del itinerario"
        >
          <span>Explorar Landing del Itinerario Completo</span> <span>➔</span>
        </Link>
      </div>
    </article>
  );
}

