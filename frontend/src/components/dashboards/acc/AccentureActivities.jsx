import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import { getAccentureActivityUrl } from '../../../config/accentureConfig';
import './AccentureActivities.css';

export default function AccentureActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todas'); // 'Todas' | 'Pendientes' | 'Entregadas'
  const [searchTerm, setSearchTerm] = useState('');
  const [activityStatus] = usePersistentState('accenture_activities_status', {}, {
    category: 'accenture'
  });
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);

  useEffect(() => {
    fetch('/data/extra/accenture_actividades.json')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return ['Todas', ...new Set(activities.map(a => a.category).filter(Boolean))];
  }, [activities]);

  const filtered = useMemo(() => {
    return activities.filter(act => {
      // Filtro de categoría
      if (filterCategory !== 'Todas' && act.category !== filterCategory) {
        return false;
      }

      // Filtro de estado
      const status = activityStatus[act.id] || (act.status === 'proximamente' ? 'Próximamente' : 'Pendiente');
      if (filterStatus === 'Entregadas' && status !== 'Entregada') {
        return false;
      }
      if (filterStatus === 'Pendientes' && status === 'Entregada') {
        return false;
      }

      // Filtro de texto de búsqueda
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchTitle = (act.title || '').toLowerCase().includes(term);
        const matchResumen = (act.resumen || '').toLowerCase().includes(term);
        const matchProyecto = (act.proyecto || '').toLowerCase().includes(term);
        const matchNum = String(act.numero || '').includes(term);
        return matchTitle || matchResumen || matchProyecto || matchNum;
      }

      return true;
    });
  }, [activities, filterCategory, filterStatus, searchTerm, activityStatus]);

  const completedCount = Object.values(activityStatus).filter(s => s === 'Entregada').length;
  const progressPercent = Math.round((completedCount / (activities.length || 14)) * 100);

  return (
    <div className="app-container accenture-act-container">
      
      {/* Navegación y Cabecera */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="accenture-act-breadcrumb">
          <Link to="/accenture">Accenture Hub</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Actividades Prácticas</span>
        </div>
        <h1 className="accenture-act-title">
          Actividades Prácticas · Spring Boot
        </h1>
        <p className="accenture-act-subtitle">
          Parada SPRING BOOT — Retos oficiales con enunciados limpios, soluciones paso a paso y entrega en L2E.
        </p>
      </div>

      {/* Tracker de Entregas exclusivo de Accenture */}
      <div className="accenture-act-tracker-card">
        <div className="accenture-act-tracker-top">
          <div>
            <span className="accenture-act-tracker-tag">
              📋 To-Do & Tracker de Entregas Accenture
            </span>
            <div className="accenture-act-tracker-stat">
              {completedCount} de {activities.length} actividades entregadas ({progressPercent}%)
            </div>
          </div>
          <div className="accenture-act-deadline-badge">
            <span>⏳</span> Deadline General: Martes, 3 de noviembre de 2026 (23:59)
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="accenture-act-progress-track">
          <div 
            className="accenture-act-progress-fill" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Acordeón de Protocolo Oficial de Entrega */}
      <div className="accenture-act-protocol-card">
        <button
          type="button"
          onClick={() => setIsProtocolOpen(!isProtocolOpen)}
          className="accenture-act-protocol-btn"
          aria-expanded={isProtocolOpen}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📜 Protocolo e Instrucciones Oficiales de Entrega en L2E
          </span>
          <span>{isProtocolOpen ? '▲ Ocultar' : '▼ Ver Protocolo'}</span>
        </button>

        {isProtocolOpen && (
          <div className="accenture-act-protocol-body">
            <div className="accenture-act-protocol-grid">
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>1. Ramas de Git</strong>
                Para Actividades 1 a 4: rama <code style={{ color: '#38bdf8' }}>SPRING-BOOT</code>.<br />
                Para Actividades 5+: rama propia (<code style={{ color: '#38bdf8' }}>00-preparacion-del-entorno</code>, <code style={{ color: '#38bdf8' }}>01-creacion-del-controller</code>) con Pull Request a <code style={{ color: '#38bdf8' }}>main-spring-boot</code>.
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>2. Formato de Archivo ZIP</strong>
                Exportar proyecto completo: <code style={{ color: '#10b981' }}>Spring Boot – [Nombre Tarea] – Nombre Apellido.zip</code> y subirlo a la tarea correspondiente en la plataforma L2E LMS.
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>3. Documentación Javadoc</strong>
                Requisito obligatorio: todas las clases y métodos deben incluir cabeceras Javadoc con descripción, <code style={{ color: '#fb923c' }}>@param</code> y <code style={{ color: '#fb923c' }}>@return</code>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="accenture-act-controls">
        <div className="accenture-act-search-box">
          <span className="accenture-act-search-icon">🔍</span>
          <input
            type="text"
            className="accenture-act-search-input"
            placeholder="Buscar por tema, proyecto o palabra clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar actividades"
          />
        </div>

        {/* Filtros de Estado */}
        <div className="accenture-act-filter-chips">
          {['Todas', 'Pendientes', 'Entregadas'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`accenture-act-chip ${filterStatus === status ? 'is-active' : ''}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Filtros por Categoría */}
        <div className="accenture-act-filter-chips">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`accenture-act-chip ${filterCategory === cat ? 'is-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Actividades */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Cargando actividades oficiales... ⏳
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
          No se encontraron actividades que coincidan con los filtros aplicados.
        </div>
      ) : (
        <div className="accenture-act-grid">
          {filtered.map(act => {
            const status = activityStatus[act.id] || (act.status === 'proximamente' ? 'Próximamente' : 'Pendiente');
            const isDone = status === 'Entregada';

            return (
              <article 
                key={act.id}
                className={`accenture-act-card ${isDone ? 'is-done' : ''}`}
              >
                <div>
                  <div className="accenture-act-card-header">
                    <span className="accenture-act-num-badge">
                      Actividad {act.numero}
                    </span>
                    <span className={`accenture-act-status-badge ${isDone ? 'done' : 'pending'}`}>
                      {status}
                    </span>
                  </div>

                  <h2 className="accenture-act-card-title">
                    {act.title}
                  </h2>

                  <p className="accenture-act-card-resumen">
                    {act.resumen}
                  </p>
                </div>

                <div>
                  <div className="accenture-act-card-meta">
                    <span>📁 {act.proyecto || 'taskmanager'}</span>
                    <span>🏷️ {act.category}</span>
                  </div>

                  <div className="accenture-act-card-actions">
                    <Link
                      to={getAccentureActivityUrl(act)}
                      className="theme-btn"
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        textDecoration: 'none',
                        padding: '0.55rem',
                        fontSize: '0.88rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {act.status === 'proximamente' ? 'Ver Detalles' : 'Ver Enunciado y Solución →'}
                    </Link>
                    {act.l2eUrl && (
                      <a
                        href={act.l2eUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-btn"
                        style={{
                          textDecoration: 'none',
                          padding: '0.55rem 0.8rem',
                          fontSize: '0.88rem',
                          background: 'var(--bg-hover)'
                        }}
                        title="Subir a plataforma L2E"
                      >
                        L2E ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
