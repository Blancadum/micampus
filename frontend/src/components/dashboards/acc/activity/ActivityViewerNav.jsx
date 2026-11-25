import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ActivityViewerNav
 * Miga de pan de navegación y botones Anterior / Siguiente.
 */
export default function ActivityViewerNav({
  currentNumber,
  prevActivity,
  nextActivity,
  onNavigate
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <Link to="/accenture" style={{ color: 'var(--c-blue)', textDecoration: 'none', fontWeight: '500' }}>Accenture Hub</Link>
        <span>/</span>
        <Link to="/accenture/actividades" style={{ color: 'var(--c-blue)', textDecoration: 'none', fontWeight: '500' }}>Actividades Prácticas</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Actividad {currentNumber}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          type="button"
          disabled={!prevActivity}
          onClick={() => prevActivity && onNavigate(prevActivity.slug)}
          className="theme-btn"
          style={{ opacity: prevActivity ? 1 : 0.4, cursor: prevActivity ? 'pointer' : 'not-allowed', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          ← Anterior
        </button>
        <button 
          type="button"
          disabled={!nextActivity}
          onClick={() => nextActivity && onNavigate(nextActivity.slug)}
          className="theme-btn"
          style={{ opacity: nextActivity ? 1 : 0.4, cursor: nextActivity ? 'pointer' : 'not-allowed', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
