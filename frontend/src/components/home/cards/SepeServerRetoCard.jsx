import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

export default function SepeServerRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article className={`campus-card card-sepe ${isArchived ? 'card-is-archived' : ''}`}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="SEPE Servidor Web (MF0492_3)"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #ca8a04, #eab308)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(234, 179, 8, 0.35)',
            }}
          >
            💻
          </div>
          <div className="campus-card-titles">
            <h3>SEPE — MF0492_3 Servidor Web</h3>
            <span className="campus-institution">Certificado de Profesionalidad · Entorno Servidor</span>
          </div>
        </div>
        <p className="campus-card-desc">
          Itinerario completo del certificado oficial: temario estructurado (UF1844, UF1845, UF1846), <strong>4 proyectos prácticos del aula</strong> (Agenda, Tamagotchi, Biblioteca PDO y API REST con <code>.htaccess</code>) y autoevaluación.
        </p>

        <div className="campus-features-list" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <Link
            to="/sepe/php#proyecto-1-agenda"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', fontWeight: 600 }}
          >
            📒 Agenda
          </Link>
          <Link
            to="/sepe/php#proyecto-2-tamagotchi"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed', fontWeight: 600 }}
          >
            👾 Tamagotchi POO
          </Link>
          <Link
            to="/sepe/php#proyecto-3-biblioteca"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontWeight: 600 }}
          >
            📚 Biblioteca PDO
          </Link>
          <Link
            to="/sepe/php#proyecto-4-api-rest"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(234, 179, 8, 0.15)', color: '#b45309', fontWeight: 700 }}
          >
            🔌 API REST .htaccess
          </Link>
          <Link
            to="/sepe/php#chuleta-intensiva-examen"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(249, 115, 22, 0.12)', color: '#ea580c', fontWeight: 700 }}
            title="Chuleta intensiva de examen con las 20 trampas y código de memoria"
          >
            ⚡ 20 Trampas Examen
          </Link>
          <Link
            to="/sepe/php#comparativa-php-python"
            className="feature-tag"
            style={{ textDecoration: 'none', background: 'rgba(16, 185, 129, 0.12)', color: '#047857', fontWeight: 700 }}
            title="Comparativa directa de sintaxis y arquitectura: PHP vs Python"
          >
            🐍🐘 PHP vs Python
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <Link to="/sepe/php" className="btn-enter-campus btn-sepe" style={{ flex: '1 1 140px' }}>
          <span>Explorar Temario</span> <span>➔</span>
        </Link>
        <a
          href="/fuentes/sepe/php/TEMARIO_COMPLETO_EXAMEN_MF0492_3.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-enter-campus"
          style={{
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.18) 0%, rgba(202, 138, 4, 0.08) 100%)',
            border: '1px solid rgba(234, 179, 8, 0.45)',
            color: '#854d0e',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 0.9rem'
          }}
          title="Descargar o leer el Temario Completo Oficial de Examen (PDF 4.1MB)"
        >
          <span>📑 Temario PDF (4.1MB)</span> ↗
        </a>
        <Link
          to="/sepe/php#proyecto-1-agenda"
          className="btn-enter-campus"
          style={{
            background: 'rgba(234, 179, 8, 0.14)',
            border: '1px solid rgba(234, 179, 8, 0.4)',
            color: '#b45309',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 0.9rem'
          }}
          title="Ver los 4 proyectos prácticos del curso con código fuente"
        >
          <span>🛠️ Proyectos del Aula</span>
        </Link>
        <a
          href="https://labex.io/free-labs/mysql"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-enter-campus"
          style={{
            background: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.6rem 0.8rem'
          }}
          title="Laboratorios interactivos gratuitos de MySQL en la nube (LabEx)"
        >
          <span>🧪 Labs</span> ↗
        </a>
      </div>
    </article>
  );
}
