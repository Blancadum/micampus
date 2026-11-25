import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

/**
 * JavaStudioRetoCard
 * Tarjeta del Home Dashboard para el ecosistema integral de Java & Spring Studio.
 * Unifica POO & SOLID, Proyectos por Capas y Hexagonal, Libro de Arquitectura y Quizzes.
 */
export default function JavaStudioRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article
      className={`campus-card ${isArchived ? 'card-is-archived' : ''}`}
      style={{
        borderColor: 'rgba(109, 40, 217, 0.45)',
        background: 'linear-gradient(180deg, rgba(109, 40, 217, 0.06) 0%, var(--bg-card) 100%)',
      }}
    >
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Java & Spring Studio"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #6d28d9, #8b5cf6)',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(109, 40, 217, 0.35)',
            }}
          >
            ☕
          </div>
          <div className="campus-card-titles">
            <h3>Java & Spring Studio</h3>
            <span className="campus-institution">Ecosistema Integral · POO, SOLID, 4 Proyectos & Quizzes</span>
          </div>
        </div>

        <p className="campus-card-desc">
          Entorno de ingeniería para dominar Java y Spring Boot de extremo a extremo: fundamentos de POO, patrones GoF, 4 proyectos enterprise (TaskManager y Library en 3 Capas, Hexagonal y Modular), libro interactivo de arquitectura, 199 tutorías y simulador de 65 preguntas oficiales.
        </p>

        <div className="campus-features-list">
          <Link
            to="/java/studio/poo"
            className="feature-tag feature-tag-purple"
            style={{ textDecoration: 'none', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.3)', fontWeight: 700 }}
          >
            📖 21 Lecc. Java 1
          </Link>
          <Link
            to="/java/studio/proyectos/taskmanager/capas"
            className="feature-tag feature-tag-purple"
            style={{ textDecoration: 'none', background: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.3)', fontWeight: 700 }}
          >
            📦 4 Proyectos
          </Link>
          <Link
            to="/java/studio/libro"
            className="feature-tag feature-tag-purple"
            style={{ textDecoration: 'none', background: 'rgba(109, 40, 217, 0.12)', color: '#6d28d9', border: '1px solid rgba(109, 40, 217, 0.3)', fontWeight: 700 }}
          >
            📖 Spring Boot (34 Temas)
          </Link>
          <Link
            to="/java/studio/quiz"
            className="feature-tag feature-tag-purple"
            style={{ textDecoration: 'none', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 700 }}
          >
            🧪 65 Q. Quiz
          </Link>
          <span className="feature-tag">⚡ 199 Tutorías</span>
        </div>

        {/* REUNIÓN CRÍTICA: PRESENTACIÓN DE PROYECTO */}
        <div
          style={{
            marginTop: '1rem',
            padding: '0.7rem 0.85rem',
            background: 'rgba(109, 40, 217, 0.08)',
            borderLeft: '4px solid #6d28d9',
            borderRadius: '8px',
            fontSize: '0.82rem'
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: '#6d28d9',
              marginBottom: '0.3rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.35rem'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>📅</span> <span>Presentación de Proyecto</span>
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                background: 'rgba(109, 40, 217, 0.15)',
                padding: '0.12rem 0.5rem',
                borderRadius: '999px',
                color: '#6d28d9',
                fontWeight: 700
              }}
            >
              16 de Noviembre
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <a
              href="https://teams.microsoft.com/meet/27980786524665?p=TOaS8Fsl3dMslsgXpP"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#6d28d9', textDecoration: 'none', fontWeight: 800 }}
              title="Unirse a la reunión de Teams para la presentación del proyecto"
            >
              🔗 Unirse por Teams
            </a>
            <span style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.74rem', fontWeight: 600 }}>
              ID: 279 807 865 246 65 | Pass: AV9Tg7VD
            </span>
          </div>
        </div>
      </div>

      <div className="campus-card-actions">
        <Link
          to="/java/studio"
          className="btn-enter-campus"
          style={{ background: 'linear-gradient(135deg, #6d28d9, #8b5cf6)', color: '#ffffff', textDecoration: 'none' }}
        >
          <span>Entrar a Java Studio</span> <span className="btn-arrow">➔</span>
        </Link>
        <Link
          to="/java/studio/libro"
          className="btn-sub-link"
          style={{ textDecoration: 'none' }}
          title="Abrir Spring Boot"
        >
          <span>📖 Spring Boot</span> <span className="btn-arrow">➔</span>
        </Link>
        <Link
          to="/java/studio/poo"
          className="btn-sub-link"
          style={{ textDecoration: 'none' }}
          title="Abrir Fundamentos de Java 1"
        >
          <span>📖 Java 1</span> <span className="btn-arrow">➔</span>
        </Link>
      </div>
    </article>
  );
}
