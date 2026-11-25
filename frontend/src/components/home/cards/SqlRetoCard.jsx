import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

/**
 * SqlRetoCard
 * Tarjeta de acceso al Compendio Integral y Masterclass de SQL en MiCampus.
 * Estilo visual: Azul clásico con líneas rectas (#1a5490 / #2563eb).
 */
export default function SqlRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article 
      className={`campus-card card-sql ${isArchived ? 'card-is-archived' : ''}`}
      style={{
        borderRadius: '4px',
        borderTop: '3px solid #1a5490',
      }}
    >
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="SQL & Bases de Datos Relacionales"
      />

      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #1a5490 0%, #2563eb 100%)',
              color: '#ffffff',
              borderRadius: '4px',
              boxShadow: '0 4px 14px rgba(26, 84, 144, 0.35)',
            }}
          >
            🗄️
          </div>
          <div className="campus-card-titles">
            <h3>SQL & Bases de Datos Relacionales</h3>
            <span className="campus-institution" style={{ color: '#1a5490', fontWeight: 600 }}>
              Compendio Completo · Masterclass & Gimnasio Práctico
            </span>
          </div>
        </div>

        <p className="campus-card-desc">
          Manual técnico unificado: diseño ER y normalización (1FN, 2FN, 3FN), SQL DDL/DML, <strong>masterclass del orden de ejecución</strong> (FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY), gimnasio con retos y cheat sheet.
        </p>

        <div className="campus-features-list" style={{ marginBottom: '1rem' }}>
          <Link
            to="/sql/1-2-conceptos"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(26, 84, 144, 0.1)', 
              color: '#1a5490', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            📘 1.2 Modelo Relacional
          </Link>
          <Link
            to="/sql/2-3-normalizacion"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(37, 99, 235, 0.1)', 
              color: '#2563eb', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            📐 2.3 1FN / 2FN / 3FN
          </Link>
          <Link
            to="/sql/4-1-select-basico"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(16, 185, 129, 0.12)', 
              color: '#059669', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            🔍 4.1 SELECT & Filtros
          </Link>
          <Link
            to="/sql/5-2-orden"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(217, 119, 6, 0.15)', 
              color: '#b45309', 
              fontWeight: 700, 
              borderRadius: '2px' 
            }}
          >
            ⏱️ 5.2 WHERE vs HAVING
          </Link>
          <Link
            to="/sql/5-4-ejercicios-gimnasio"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(147, 51, 234, 0.12)', 
              color: '#7e22ce', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            🏋️ 5.4 Gimnasio SQL
          </Link>
          <Link
            to="/sql/6-1-cte-basico"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(8, 145, 178, 0.12)', 
              color: '#0891b2', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            🌲 6.1 CTEs
          </Link>
          <Link
            to="/sql/7-1-ventanas-fundamentos"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(37, 99, 235, 0.12)', 
              color: '#2563eb', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            📈 7.1 Ventanas
          </Link>
          <Link
            to="/sql/8-1-joins-visuales"
            className="feature-tag"
            style={{ 
              textDecoration: 'none', 
              background: 'rgba(26, 84, 144, 0.12)', 
              color: '#1a5490', 
              fontWeight: 600, 
              borderRadius: '2px' 
            }}
          >
            🔗 8.1 Visual JOINs
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <Link 
          to="/sql" 
          className="btn-enter-campus" 
          style={{ 
            flex: '1 1 140px',
            background: 'linear-gradient(135deg, #1a5490 0%, #2563eb 100%)',
            borderRadius: '4px'
          }}
        >
          <span>Abrir Manual SQL (28 Módulos)</span> <span>➔</span>
        </Link>
        <Link
          to="/sql/5-2-orden"
          className="btn-enter-campus"
          style={{
            flex: '1 1 140px',
            background: '#ffffff',
            color: '#1a5490',
            border: '1.5px solid #1a5490',
            borderRadius: '4px'
          }}
        >
          <span>Masterclass 5.2</span> <span>⏱️</span>
        </Link>
      </div>
    </article>
  );
}

