import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from '../../utils/highlight';

export default function AccentureActivityViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('enunciado'); // 'enunciado' | 'solucion'
  const [enunciadoMarkdown, setEnunciadoMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [activityStatus, setActivityStatus] = useState({});

  // Cargar estado guardado de entregas desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accenture_activities_status');
    if (saved) {
      try {
        setActivityStatus(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Cargar lista de actividades
  useEffect(() => {
    setLoading(true);
    fetch('/data/extra/accenture_actividades.json')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        const found = data.find(item => item.slug === slug) || data[0];
        setCurrentActivity(found);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  // Cargar el markdown del enunciado cuando cambie la actividad
  useEffect(() => {
    if (!currentActivity) return;

    if (currentActivity.enunciadoFile) {
      fetch(currentActivity.enunciadoFile)
        .then(res => {
          if (!res.ok) throw new Error('No se pudo cargar el enunciado');
          return res.text();
        })
        .then(text => setEnunciadoMarkdown(text))
        .catch(() => setEnunciadoMarkdown(`### ${currentActivity.title}\n\n${currentActivity.resumen}`));
    } else {
      setEnunciadoMarkdown(`### ${currentActivity.title}\n\n${currentActivity.resumen}`);
    }
  }, [currentActivity]);

  // Aplicar highlight.js a los bloques de código
  useEffect(() => {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }, [enunciadoMarkdown, activeTab, currentActivity]);

  const updateStatus = (newStatus) => {
    if (!currentActivity) return;
    const updated = { ...activityStatus, [currentActivity.id]: newStatus };
    setActivityStatus(updated);
    localStorage.setItem('accenture_activities_status', JSON.stringify(updated));
  };

  if (loading || !currentActivity) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <h2>Cargando actividad... 🚀</h2>
      </div>
    );
  }

  const currentStatus = activityStatus[currentActivity.id] || (currentActivity.status === 'proximamente' ? 'Próximamente' : 'Pendiente');
  const currentIndex = activities.findIndex(a => a.id === currentActivity.id);
  const prevActivity = currentIndex > 0 ? activities[currentIndex - 1] : null;
  const nextActivity = currentIndex < activities.length - 1 ? activities[currentIndex + 1] : null;

  return (
    <div className="app-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* Navegación superior y Migas de pan */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <Link to="/accenture" style={{ color: 'var(--c-blue)', textDecoration: 'none', fontWeight: '500' }}>Accenture Hub</Link>
          <span>/</span>
          <Link to="/accenture/actividades" style={{ color: 'var(--c-blue)', textDecoration: 'none', fontWeight: '500' }}>Actividades Prácticas</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Actividad {currentActivity.numero}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            disabled={!prevActivity}
            onClick={() => navigate(`/accenture/actividades/${prevActivity.slug}`)}
            className="theme-btn"
            style={{ opacity: prevActivity ? 1 : 0.4, cursor: prevActivity ? 'pointer' : 'not-allowed', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            ← Anterior
          </button>
          <button 
            disabled={!nextActivity}
            onClick={() => navigate(`/accenture/actividades/${nextActivity.slug}`)}
            className="theme-btn"
            style={{ opacity: nextActivity ? 1 : 0.4, cursor: nextActivity ? 'pointer' : 'not-allowed', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Cabecera de la Actividad */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ 
                background: 'rgba(56, 189, 248, 0.15)', 
                color: '#38bdf8', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.8rem', 
                fontWeight: 'bold' 
              }}>
                Actividad {currentActivity.numero} de {activities.length || 13}
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
                onChange={(e) => updateStatus(e.target.value)}
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
          paddingTop: '1rem' 
        }}>
          <button
            onClick={() => setActiveTab('enunciado')}
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
            onClick={() => setActiveTab('solucion')}
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

      {/* Cuerpo del contenido según pestaña */}
      <main style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '12px', 
        padding: '2rem 2.5rem',
        boxShadow: 'var(--shadow-sm)',
        lineHeight: '1.7',
        color: 'var(--text-main)'
      }}>
        {activeTab === 'enunciado' ? (
          <div>
            <div style={{ 
              background: 'rgba(56, 189, 248, 0.05)', 
              borderLeft: '4px solid #38bdf8', 
              padding: '0.8rem 1.2rem', 
              borderRadius: '4px',
              marginBottom: '2rem',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}>
              📌 <strong>Enunciado oficial:</strong> Este es el texto íntegro del ejercicio sin soluciones expuestas, ideal para resolver el reto de forma autónoma.
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {enunciadoMarkdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div>
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.05)', 
              borderLeft: '4px solid #10b981', 
              padding: '0.8rem 1.2rem', 
              borderRadius: '4px',
              marginBottom: '2rem',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}>
              ✅ <strong>Guía de resolución:</strong> Estructura del proyecto, explicaciones de arquitectura y código Java comentado listo para contrastar tu implementación.
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {currentActivity.solucionDoc || 'Solución en redacción.'}
            </ReactMarkdown>
          </div>
        )}
      </main>

    </div>
  );
}
