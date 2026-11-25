import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

const IOC_SUBJECTS = [
  { path: '/ioc/ent', sigla: 'ENT', title: 'Entornos de Desarrollo', icon: '🛠️', className: 'btn-ioc-ent' },
  { path: '/ioc/desp', sigla: 'DESP', title: 'Despliegue de Aplicaciones Web', icon: '🚀', className: 'btn-ioc-desp' },
  { path: '/ioc/digi', sigla: 'DIGI', title: 'Digitalización Aplicada', icon: '💡', className: 'btn-ioc-digi' },
  { path: '/ioc/int', sigla: 'INT', title: 'Diseño de Interfaces Web', icon: '🌐', className: 'btn-ioc-int' },
  { path: '/ioc/ipo2', sigla: 'IPO2', title: 'Itinerario Empleabilidad II', icon: '💼', className: 'btn-ioc-ipo2' },
];

export default function IocDawRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article className={`campus-card card-ioc ${isArchived ? 'card-is-archived' : ''}`}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Campus IOC DAW"
      />
      <div>
        <div className="campus-card-header">
          <div className="campus-card-icon" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#fff', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}>🎓</div>
          <div className="campus-card-titles" style={{ flex: 1 }}>
            <h3>Campus IOC DAW</h3>
            <span className="campus-institution">Institut Obert de Catalunya · Desarrollo Web</span>
          </div>
        </div>
        <p className="campus-card-desc">
          Seguimiento de las asignaturas oficiales (ENT, DESP, DIGI, INT, IPO2), radar de fechas límite de EACs, semáforo de entregas y calculadora de notas de Evaluación Continua (AC).
        </p>
      </div>

      <div className="campus-card-actions ioc-card-actions">
        <div className="ioc-subjects-column">
          {IOC_SUBJECTS.map((sub) => (
            <Link key={sub.sigla} to={sub.path} className={`btn-ioc-subject-row ${sub.className}`} title={sub.title}>
              <span className="btn-ioc-icon">{sub.icon}</span>
              <div className="btn-ioc-info">
                <span className="btn-ioc-sigla">{sub.sigla}</span>
                <span className="btn-ioc-title">{sub.title}</span>
              </div>
              <span className="btn-ioc-arrow">➔</span>
            </Link>
          ))}
          <Link
            to="/blog/seo-linkedin-filtros-ia"
            className="btn-ioc-subject-row"
            style={{ borderLeftColor: '#ea580c', background: 'rgba(234, 88, 12, 0.08)' }}
            title="Artículo de Blog: SEO en LinkedIn & Filtros de IA"
          >
            <span className="btn-ioc-icon">📰</span>
            <div className="btn-ioc-info">
              <span className="btn-ioc-sigla" style={{ color: '#ea580c' }}>BLOG</span>
              <span className="btn-ioc-title">SEO LinkedIn & Filtros IA</span>
            </div>
            <span className="btn-ioc-arrow">➔</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
