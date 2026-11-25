import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ActivityViewerHeader
 * Cabecera con título, tags, selector de estado de entrega, fecha límite y tabs Enunciado vs Solución.
 */
export default function ActivityViewerHeader({
  currentActivity,
  totalActivities,
  currentStatus,
  onStatusChange,
  activeTab,
  onTabChange
}) {
  return (
    <header style={{ 
      background: 'var(--bg-card)', 
      border: '1px solid var(--border-subtle)', 
      borderRadius: '12px', 
      padding: '1.8rem', 
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ 
              background: 'rgba(56, 189, 248, 0.15)', 
              color: '#38bdf8', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '6px', 
              fontSize: '0.8rem', 
              fontWeight: 'bold' 
            }}>
              Actividad {currentActivity.numero} de {totalActivities || 13}
            </span>
            <span style={{ 
              background: 'var(--bg-hover)', 
              color: 'var(--text-muted)', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '6px', 
              fontSize: '0.8rem' 
            }}>
              {currentActivity.category}
            </span>
            {currentActivity.proyecto && (
              <span style={{ 
                background: 'rgba(16, 185, 129, 0.1)', 
                color: '#10b981', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)' 
              }}>
                📁 {currentActivity.proyecto}
              </span>
            )}
          </div>

          <h1 style={{ margin: '0.5rem 0', fontSize: '1.85rem', color: 'var(--text-title)' }}>
            {currentActivity.title}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {currentActivity.resumen}
          </p>
        </div>

        {/* Panel de Estado y Entrega */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end', 
          gap: '0.8rem', 
          minWidth: '220px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mi Estado:</span>
            <select
              value={currentStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              style={{
                padding: '0.35rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input, var(--bg-hover))',
                color: 'var(--text-main)',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="Pendiente">⏳ Pendiente</option>
              <option value="En curso">⚡ En curso</option>
              <option value="Entregada">✅ Entregada</option>
            </select>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold' }}>
            📅 Límite: {currentActivity.dueDate}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {currentActivity.l2eUrl && (
              <a 
                href={currentActivity.l2eUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="theme-btn"
                style={{ textDecoration: 'none', padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 'bold' }}
              >
                🚀 Subir a L2E ↗
              </a>
            )}
            {currentActivity.teoriaSlug && (
              <Link
                to={`/java/springboot#${currentActivity.teoriaSlug}`}
                className="theme-btn"
                style={{ textDecoration: 'none', padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--bg-hover)' }}
              >
                📖 Ver Teoría
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Pestañas de Modo: Enunciado vs Solución */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginTop: '1.5rem', 
        borderTop: '1px solid var(--border-subtle)', 
        paddingTop: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          onClick={() => onTabChange('enunciado')}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: activeTab === 'enunciado' ? '1px solid #38bdf8' : '1px solid transparent',
            background: activeTab === 'enunciado' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
            color: activeTab === 'enunciado' ? '#38bdf8' : 'var(--text-muted)',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem'
          }}
        >
          📋 Enunciado Oficial (Sin Resolver)
        </button>

        <button
          type="button"
          onClick={() => onTabChange('solucion')}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: activeTab === 'solucion' ? '1px solid #10b981' : '1px solid transparent',
            background: activeTab === 'solucion' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            color: activeTab === 'solucion' ? '#10b981' : 'var(--text-muted)',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem'
          }}
        >
          💡 Solución & Documentación Paso a Paso
        </button>
      </div>
    </header>
  );
}
