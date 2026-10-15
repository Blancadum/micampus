import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function TopicViewer({ dataSource, defaultSlug }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentSlug = slug || defaultSlug;

  useEffect(() => {
    setLoading(true);
    fetch(dataSource)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el contenido');
        return res.json();
      })
      .then(data => {
        setTopics(data);
        const found = data.find(item => item.slug === currentSlug);
        if (found) {
          setTopic(found);
          setError(null);
        } else if (data.length > 0) {
          // Si no encuentra el slug, carga el primero por defecto
          setTopic(data[0]);
          setError(null);
        } else {
          setError('El tema que buscas no existe.');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dataSource, currentSlug]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Cargando campus... 🚀</h2>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="app-container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Oops! 💥</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="theme-btn" style={{ marginTop: '1rem' }}>Volver a Home</button>
      </div>
    );
  }

  return (
    <div className="mini-campus-layout" style={{ display: 'flex', minHeight: '100vh', marginTop: '70px' }}>
      
      {/* Botón flotante para replegar/desplegar menú lateral */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '90px',
          left: isSidebarOpen ? '300px' : '0px',
          zIndex: 1000,
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-subtle)',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          width: '32px',
          height: '44px',
          fontSize: '0.9rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(8px)',
          opacity: 0.9
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--accent-purple)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.color = 'var(--text-main)'; }}
        title={isSidebarOpen ? "Replegar menú lateral" : "Desplegar menú lateral"}
        aria-label={isSidebarOpen ? "Replegar menú lateral" : "Desplegar menú lateral"}
      >
        <span>{isSidebarOpen ? '◀' : '▶'}</span>
      </button>

      {/* SIDEBAR */}
      <aside className="campus-sidebar" style={{ 
        width: isSidebarOpen ? '300px' : '0px', 
        opacity: isSidebarOpen ? 1 : 0,
        background: 'var(--bg-card)', 
        borderRight: isSidebarOpen ? '1px solid var(--border-subtle)' : 'none', 
        padding: isSidebarOpen ? '2rem 1.5rem' : '0',
        overflowY: isSidebarOpen ? 'auto' : 'hidden',
        overflowX: 'hidden',
        position: 'fixed',
        height: 'calc(100vh - 70px)',
        left: 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 90
      }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          {topic.moduleTitle}
        </h3>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {topics.map(t => {
            const isActive = t.slug === currentSlug;
            return (
              <Link 
                key={t.slug}
                to={`../${t.slug}`} 
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  color: isActive ? 'white' : 'var(--text-main)',
                  background: isActive ? 'var(--accent-purple)' : 'transparent',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'background 0.2s',
                  fontSize: '0.95rem'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                {t.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="campus-content" style={{ 
        flex: 1, 
        marginLeft: isSidebarOpen ? '300px' : '0px', 
        padding: '3rem 5%', 
        maxWidth: '1000px',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div className="topic-header" style={{ marginBottom: '2rem' }}>
          <span className="topic-badge" style={{ 
            display: 'inline-block', 
            background: 'var(--accent-purple)', 
            color: 'white', 
            padding: '0.2rem 0.5rem', 
            borderRadius: '4px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>
            {topic.badge}
          </span>
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-title)' }}>{topic.title}</h1>
        </div>
        
        <div 
          className="topic-body" 
          style={{ lineHeight: '1.6', color: 'var(--text-main)' }}
          dangerouslySetInnerHTML={{ __html: topic.contentHtml }} 
        />
        
        {/* NAVEGACIÓN INFERIOR */}
        <div className="topic-navigation" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '4rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border-subtle)' 
        }}>
          {topic.prevSlug ? (
            <button 
              className="theme-btn" 
              onClick={() => navigate(`../${topic.prevSlug}`)}
            >
              ← Anterior
            </button>
          ) : <div></div>}
          
          {topic.nextSlug ? (
            <button 
              className="theme-btn" 
              onClick={() => navigate(`../${topic.nextSlug}`)}
            >
              Siguiente →
            </button>
          ) : <div></div>}
        </div>
      </main>
    </div>
  );
}
