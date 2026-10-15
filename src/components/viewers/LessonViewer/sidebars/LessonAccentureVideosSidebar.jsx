import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LessonAccentureVideosSidebar({
  isOpen,
  onToggle,
  activeSlug,
  onSelectSection,
  topOffset = '76px'
}) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModule, setOpenModule] = useState('mod0');
  const navigate = useNavigate();
  const location = useLocation();

  const isVideosRoute = location.pathname.startsWith('/accenture/videos') || 
                        location.pathname.startsWith('/springboot/videos') ||
                        location.pathname.startsWith('/java/springboot/videos');

  useEffect(() => {
    fetch('/data/extra/accenture_videos_teoria.json')
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando vídeos de Accenture:', err);
        setLoading(false);
      });
  }, []);

  // Agrupar por módulo
  const groupedModules = topics.reduce((acc, topic) => {
    const modId = topic.moduleId || 'mod0';
    if (!acc[modId]) {
      acc[modId] = {
        id: modId,
        title: topic.moduleTitle || 'Módulo',
        short: topic.moduleShort || 'Módulo',
        topics: []
      };
    }
    acc[modId].topics.push(topic);
    return acc;
  }, {});

  const handleTopicClick = (slug) => {
    if (onSelectSection) {
      onSelectSection(slug);
    }
    const el = document.getElementById(slug);
    const isPetete = window.location.pathname.includes('/petete');
    if (el) {
      el.scrollIntoView({ behavior: 'auto' });
    } else if (isPetete) {
      navigate(`/petete#${slug}`);
    } else {
      navigate(`/java/springboot#${slug}`);
    }
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };


  const filteredTopics = searchTerm.trim()
    ? topics.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.temaTitle && t.temaTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : null;

  return (
    <>
      {/* Cajón Lateral Desplegable */}
      <aside
        style={{
          position: 'fixed',
          top: '126px',
          right: 0,
          bottom: 0,
          width: '340px',
          maxWidth: '88vw',
          background: 'var(--bg-card, #131b2e)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: isOpen ? '-8px 0 25px rgba(0,0,0,0.22)' : 'none',
          zIndex: isOpen ? 980 : 950,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Botón Pestaña Lateral */}
        <button
          onClick={onToggle}
          style={{
            position: 'absolute',
            left: '-40px',
            top: topOffset,
            width: '40px',
            height: '46px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRight: 'none',
            borderRadius: '10px 0 0 10px',
            boxShadow: '-4px 2px 10px rgba(0,0,0,0.12)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.05rem',
            zIndex: 951,
            transition: 'all 0.2s ease',
            padding: 0
          }}
          title={isOpen ? 'Ocultar panel de vídeos' : 'Vídeos Recomendados Accenture · Marco Teórico'}
          aria-label={isOpen ? 'Ocultar panel de vídeos' : 'Vídeos Recomendados Accenture · Marco Teórico'}
        >
          <span>{isOpen ? '▶' : '🎬'}</span>
        </button>

        <div style={{ padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
          
          {/* Cabecera */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '0.8rem', 
            paddingBottom: '0.65rem', 
            borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.08))' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-title)' }}>
              <span style={{ fontSize: '1.25rem' }}>🎬</span>
              <div>
                <div>Vídeos Accenture</div>
                <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>Marco Teórico & Tutorías</div>
              </div>
            </div>
            <span style={{ 
              fontSize: '0.72rem', 
              background: 'rgba(6, 182, 212, 0.15)', 
              color: '#06b6d4', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '6px', 
              fontWeight: 700 
            }}>
              {topics.length} Temas
            </span>
          </div>

          {/* Banner de Enlace Principal a la sección completa */}
          <Link
            to="/accenture/videos"
            onClick={() => {
              if (window.innerWidth <= 768) onToggle();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.65rem 0.8rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(2, 132, 199, 0.12) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              textDecoration: 'none',
              color: 'var(--text-title)',
              marginBottom: '0.75rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
            title="Abrir la sección completa de vídeos en el visor de lección"
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem'
            }}>
              📺
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4' }}>
                Ver Visor de Vídeos Teóricos
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Módulos 0, 1 y 2 con timestamps y código
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 'bold' }}>➔</span>
          </Link>

          {/* Buscador de temas de vídeo */}
          <div style={{ marginBottom: '0.75rem' }}>
            <input
              type="text"
              placeholder="Buscar por concepto (IoC, HTTP, JPA...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                background: 'var(--bg-main, #0b1120)',
                color: 'var(--text-main, #f1f5f9)',
                fontSize: '0.78rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <p style={{ margin: '0 0 0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
            Vídeos recomendados por Accenture / UPM para contextualizar las tutorías:
          </p>

          {/* Contenedor con scroll para los temas */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.2rem' }}>
            {loading ? (
              <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Cargando módulos de vídeo...
              </div>
            ) : filteredTopics ? (
              /* Resultados de búsqueda */
              filteredTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 0.65rem',
                    borderRadius: '8px',
                    border: activeSlug === topic.slug ? '1px solid #06b6d4' : '1px solid transparent',
                    background: activeSlug === topic.slug ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-hover, rgba(255,255,255,0.03))',
                    color: 'var(--text-main)',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#06b6d4', fontSize: '0.72rem' }}>
                    {topic.topicNum}
                  </span>
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{topic.title}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{topic.moduleShort} · {topic.temaTitle}</div>
                  </div>
                </button>
              ))
            ) : (
              /* Acordeón por Módulos */
              Object.values(groupedModules).map((mod) => {
                const isExpanded = openModule === mod.id;
                return (
                  <div 
                    key={mod.id} 
                    style={{ 
                      borderRadius: '8px', 
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setOpenModule(isExpanded ? null : mod.id)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isExpanded ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                        border: 'none',
                        color: 'var(--text-title)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>📂</span>
                        <span>{mod.short}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {mod.topics.length} temas
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#06b6d4' }}>
                          {isExpanded ? '▼' : '▶'}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div style={{ padding: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {mod.topics.map((topic) => {
                          const isActive = activeSlug === topic.slug;
                          return (
                            <button
                              key={topic.id}
                              onClick={() => handleTopicClick(topic.slug)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.45rem 0.6rem',
                                borderRadius: '6px',
                                border: isActive ? '1px solid #06b6d4' : '1px solid transparent',
                                background: isActive ? 'rgba(6, 182, 212, 0.18)' : 'transparent',
                                color: isActive ? '#06b6d4' : 'var(--text-main)',
                                fontSize: '0.78rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span style={{ 
                                fontWeight: 'bold', 
                                color: isActive ? '#06b6d4' : 'var(--text-muted)', 
                                fontSize: '0.72rem',
                                minWidth: '22px'
                              }}>
                                {topic.topicNum}
                              </span>
                              <span style={{ 
                                flex: 1, 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap',
                                fontWeight: isActive ? 700 : 500
                              }}>
                                {topic.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pie de apoyo */}
          <div style={{ 
            marginTop: '0.65rem', 
            paddingTop: '0.65rem', 
            borderTop: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}>
            Contenidos adaptados para VS Code & Java Spring Boot
          </div>
        </div>
      </aside>
    </>
  );
}
