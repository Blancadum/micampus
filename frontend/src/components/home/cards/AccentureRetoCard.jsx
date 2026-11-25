import React from 'react';
import { Link } from 'react-router-dom';
import talentIcon from '../../../assets/img/icons/talent.webp';
import { ACCENTURE_CONFIG } from '../../../config/accentureConfig';
import CardArchiveButton from './CardArchiveButton.jsx';

export default function AccentureRetoCard({ isArchived, onToggleArchive }) {
  const meetings = ACCENTURE_CONFIG.meetings || [ACCENTURE_CONFIG.meeting];

  return (
    <article className={`campus-card card-accenture ${isArchived ? 'card-is-archived' : ''}`}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Accenture · Spring Boot & GenAI"
      />
      <div>
        <div className="campus-card-header">
          <div className="campus-card-icon accenture-brand-icon" title="Accenture">
            <span className="accenture-gt">&gt;</span>
          </div>
          <div className="campus-card-titles">
            <h3>Accenture</h3>
            <span className="campus-institution">Especialización Back-End Java · GenAI</span>
          </div>
        </div>

        <div className="campus-features-list" style={{ marginTop: '1rem' }}>
          <Link to="/java/studio" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none', background: 'rgba(109, 40, 217, 0.2)', color: '#6d28d9', border: '1.5px solid #8b5cf6', fontWeight: 800 }}>☕ Java Studio</Link>
          <a
            href="https://www.talentoteca.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="feature-tag feature-tag-purple"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            title="Acceso a Talentoteca (abre en nueva pestaña)"
          >
            <img src={talentIcon} alt="Talentoteca" style={{ width: '14px', height: '14px', objectFit: 'contain' }} loading="lazy" />
            Talentoteca
          </a>
          <Link to="/java/studio/proyectos/library/capas" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)', fontWeight: 'bold' }}>🏛️ Proyectos (Capas)</Link>
          <Link to="/java/studio/proyectos/library/hexagonal" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.3)', fontWeight: 'bold' }}>⬢ Hexagonal</Link>
          <Link to="/java/studio/actividades" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>📦 16 Actividades</Link>
          <Link to="/java/studio/tutorias" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>📅 14 Tutorías</Link>
          <Link to="/java/studio/agile" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none', background: 'rgba(99, 102, 241, 0.15)', color: '#4f46e5', border: '1.5px solid rgba(99, 102, 241, 0.35)', fontWeight: 'bold' }}>🏃 Scrum & Ágiles</Link>
          <Link to="/java/studio/libro" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>📖 Libro (34 Temas)</Link>
          <a href={`mailto:${ACCENTURE_CONFIG.contacts.pmo.email}`} className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }} title="Contactar con Ivón (PMO)">
            📧 PMO ({ACCENTURE_CONFIG.contacts.pmo.name})
          </a>
          <a href={`mailto:${ACCENTURE_CONFIG.contacts.tutor.email}`} className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }} title="Contactar con Isra">
            📧 {ACCENTURE_CONFIG.contacts.tutor.name}
          </a>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {meetings.map((m, idx) => (
            <div key={m.id || idx} style={{ padding: '0.75rem 0.85rem', background: 'rgba(147, 51, 234, 0.08)', borderLeft: '4px solid #9333ea', borderRadius: '6px', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 'bold', color: '#9333ea', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span>📅 {m.title}</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(147, 51, 234, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '999px', color: '#9333ea', fontWeight: 600 }}>{m.dateTime}</span>
              </div>
              <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <a href={m.teamsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#9333ea', textDecoration: 'none', fontWeight: 'bold' }}>
                  🔗 Unirse por Teams
                </a>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  ID: {m.teamsId} | Pass: {m.passcode}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="campus-card-actions">
        <Link to="/java/studio" className="btn-enter-campus btn-accenture" style={{ background: 'linear-gradient(135deg, #6d28d9, #5b21b6)', border: 'none', color: '#fff' }}>
          <span>☕ Entrar a Java Studio</span> <span className="btn-arrow">➔</span>
        </Link>
        <Link to="/java/studio/proyectos" className="btn-sub-link">
          <span>🏛️ Proyectos</span> <span className="btn-arrow">➔</span>
        </Link>
      </div>
    </article>
  );
}
