import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AccentureActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [activityStatus, setActivityStatus] = useState({});
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);

  useEffect(() => {
    fetch('/data/extra/accenture_actividades.json')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    const saved = localStorage.getItem('accenture_activities_status');
    if (saved) {
      try {
        setActivityStatus(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const categories = ['Todas', ...new Set(activities.map(a => a.category))];

  const filtered = filterCategory === 'Todas' 
    ? activities 
    : activities.filter(a => a.category === filterCategory);

  const completedCount = Object.values(activityStatus).filter(s => s === 'Entregada').length;
  const progressPercent = Math.round((completedCount / (activities.length || 12)) * 100);

  return (
    <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* Navegación y Cabecera */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <Link to="/accenture" style={{ color: 'var(--c-blue)', textDecoration: 'none', fontWeight: '500' }}>Accenture Hub</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Actividades Prácticas</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', margin: '0 0 0.5rem', color: 'var(--text-title)' }}>
          Actividades Prácticas · Spring Boot
        </h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Parada SPRING BOOT — 13 retos semanales oficiales con enunciados limpios y resolución guiada paso a paso.
        </p>
      </div>

      {/* Tracker de Entregas exclusivo de Accenture */}
      <div style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '12px', 
        padding: '1.5rem', 
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              📋 To-Do & Tracker de Entregas Accenture
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-title)', marginTop: '0.2rem' }}>
              {completedCount} de {activities.length} actividades entregadas ({progressPercent}%)
            </div>
          </div>
          <div style={{ 
            background: 'rgba(245, 158, 11, 0.1)', 
            border: '1px solid #f59e0b', 
            borderRadius: '8px', 
            padding: '0.6rem 1rem',
            color: '#f59e0b',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⏳</span> Deadline General: Martes, 3 de noviembre de 2026 (23:59)
          </div>
        </div>

        {/* Barra de Progreso */}
        <div style={{ 
          background: 'var(--bg-hover)', 
          height: '10px', 
          borderRadius: '5px', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            background: 'linear-gradient(90deg, #38bdf8, #10b981)', 
            height: '100%', 
            width: `${progressPercent}%`, 
            transition: 'width 0.5s ease-in-out' 
          }} />
        </div>
      </div>

      {/* Acordeón de Protocolo Oficial de Entrega */}
      <div style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '12px', 
        marginBottom: '2.5rem',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setIsProtocolOpen(!isProtocolOpen)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            background: 'transparent',
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'var(--text-title)',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📜 Protocolo e Instrucciones Oficiales de Entrega en L2E
          </span>
          <span>{isProtocolOpen ? '▲ Ocultar' : '▼ Ver Protocolo'}</span>
        </button>

        {isProtocolOpen && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
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

      {/* Filtros por Categoría */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className="theme-btn"
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              border: filterCategory === cat ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
              background: filterCategory === cat ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
              color: filterCategory === cat ? '#38bdf8' : 'var(--text-muted)',
              fontWeight: filterCategory === cat ? 'bold' : 'normal'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Actividades */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando actividades...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(act => {
            const status = activityStatus[act.id] || (act.status === 'proximamente' ? 'Próximamente' : 'Pendiente');
            const isDone = status === 'Entregada';
            const isInProgress = status === 'En curso';

            return (
              <article 
                key={act.id}
                style={{
                  background: 'var(--bg-card)',
                  border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  opacity: act.status === 'proximamente' ? 0.75 : 1
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold', 
                      background: 'rgba(56, 189, 248, 0.12)', 
                      color: '#38bdf8', 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '4px' 
                    }}>
                      Actividad {act.numero}
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      background: isDone ? 'rgba(16, 185, 129, 0.15)' : isInProgress ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-hover)',
                      color: isDone ? '#10b981' : isInProgress ? '#f59e0b' : 'var(--text-muted)'
                    }}>
                      {status}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--text-title)' }}>
                    {act.title}
                  </h2>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.2rem' }}>
                    {act.resumen}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.8rem' }}>
                    <span>📁 {act.proyecto}</span>
                    <span>🏷️ {act.category}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                      to={`/accenture/actividades/${act.slug}`}
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
