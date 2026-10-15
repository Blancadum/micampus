import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LessonRightSidebar({ 
  mode = 'activities', // 'activities' | 'theory' | 'tutorias'
  dataSource,
  title,
  icon,
  badgeText,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  topOffset = '20px'
}) {
  const [items, setItems] = useState([]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [tutoriasSubTab, setTutoriasSubTab] = useState('calendario'); // 'calendario' | 'cronograma'
  const [activityStatus, setActivityStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('accenture_activities_status');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  const isTheoryMode = mode === 'theory';
  const isTutoriasMode = mode === 'tutorias';

  useEffect(() => {
    let endpoint = dataSource;
    if (!endpoint) {
      if (isTutoriasMode) endpoint = '/data/extra/plan_tutorias.json';
      else if (isTheoryMode) endpoint = '/data/extra/springboot_guia.json';
      else endpoint = '/data/extra/accenture_actividades.json';
    }

    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos del panel');
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => console.error('Error cargando panel lateral:', err));
  }, [isTheoryMode, isTutoriasMode, dataSource]);

  if (!items || items.length === 0) return null;

  const tabIcon = icon || (isTutoriasMode ? '📅' : isTheoryMode ? '🧠' : '🛠️');
  const tabTitle = title || (isTutoriasMode ? 'Plan de Tutorías' : isTheoryMode ? 'Ver Temario Teórico' : 'Ver Retos Prácticos');

  return (
    <aside 
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: isTutoriasMode ? '380px' : '320px',
        maxWidth: '88vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 25px rgba(0,0,0,0.22)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Botón pestaña adherido al borde izquierdo del panel */}
      <button
        onClick={toggle}
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
        title={isOpen ? 'Ocultar panel lateral' : tabTitle}
        aria-label={isOpen ? 'Ocultar panel lateral' : tabTitle}
      >
        <span>{isOpen ? '▶' : tabIcon}</span>
      </button>

      <div style={{ padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
        
        {/* Cabecera del panel */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-title)' }}>
            <span>{tabIcon}</span>
            <span>{title || (isTutoriasMode ? 'Plan de Tutorías' : isTheoryMode ? 'Teoría Spring Boot' : 'Retos Prácticos')}</span>
          </div>
          <span style={{ 
            fontSize: '0.74rem', 
            background: isTutoriasMode ? 'rgba(234, 179, 8, 0.15)' : isTheoryMode ? 'rgba(14, 165, 233, 0.15)' : 'rgba(139, 92, 246, 0.15)', 
            color: isTutoriasMode ? '#d97706' : isTheoryMode ? '#0ea5e9' : '#8b5cf6', 
            padding: '0.15rem 0.45rem', 
            borderRadius: '4px', 
            fontWeight: 'bold' 
          }}>
            {badgeText || (isTutoriasMode ? 'Spring Boot' : isTheoryMode ? `${items.length} Temas` : `${items.length} Actividades`)}
          </span>
        </div>

        {isTutoriasMode ? (
          /* MODO TUTORÍAS: Calendario y Cronograma de vídeos en sub-pestañas interactivas */
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.2rem' }}>
            {/* Acceso directo al Visor de Código de las Tutorías */}
            <Link
              to="/accenture/tutorias-codigo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.8rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(14, 165, 233, 0.12) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                textDecoration: 'none',
                color: 'var(--text-title)',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
              title="Abrir Visor Completo de Código de las Tutorías de Isra"
            >
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '8px', 
                background: 'rgba(16, 185, 129, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.1rem'
              }}>
                💻
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>
                  Código en Vivo (10 Tutorías)
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  141 clases Java y proyectos de Isra
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>➔</span>
            </Link>

            <div style={{ 
              display: 'flex', 
              gap: '0.35rem', 
              background: 'var(--bg-hover)', 
              padding: '0.25rem', 
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <button
                type="button"
                onClick={() => setTutoriasSubTab('calendario')}
                style={{
                  flex: 1,
                  padding: '0.4rem 0.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: tutoriasSubTab === 'calendario' ? 'var(--bg-card)' : 'transparent',
                  color: tutoriasSubTab === 'calendario' ? '#8b5cf6' : 'var(--text-muted)',
                  boxShadow: tutoriasSubTab === 'calendario' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                📅 Semanal (Mar / Jue)
              </button>
              <button
                type="button"
                onClick={() => setTutoriasSubTab('cronograma')}
                style={{
                  flex: 1,
                  padding: '0.4rem 0.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: tutoriasSubTab === 'cronograma' ? 'var(--bg-card)' : 'transparent',
                  color: tutoriasSubTab === 'cronograma' ? '#8b5cf6' : 'var(--text-muted)',
                  boxShadow: tutoriasSubTab === 'cronograma' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                🎬 Cronograma Vídeos
              </button>
            </div>

            <style>{`
              .tutorias-aside-table table {
                width: 100%;
                border-collapse: collapse;
                margin: 0.4rem 0 1rem;
                font-size: 0.74rem;
                border: 1px solid var(--border-subtle);
                border-radius: 6px;
                overflow: hidden;
              }
              .tutorias-aside-table th {
                background: var(--bg-hover);
                color: var(--text-title);
                padding: 0.45rem 0.5rem;
                text-align: left;
                font-weight: 700;
                border-bottom: 2px solid var(--border-subtle);
              }
              .tutorias-aside-table td {
                padding: 0.45rem 0.5rem;
                border-bottom: 1px solid var(--border-subtle);
                color: var(--text-main);
              }
              .tutorias-aside-table tr:hover td {
                background: var(--bg-hover);
              }
              .tutorias-aside-table blockquote {
                margin: 0.4rem 0 0.8rem;
                padding: 0.5rem 0.7rem;
                background: rgba(139, 92, 246, 0.08);
                border-left: 3px solid #8b5cf6;
                border-radius: 4px;
                font-size: 0.72rem;
                color: var(--text-muted);
                line-height: 1.4;
              }
            `}</style>

            <div 
              className="tutorias-aside-table"
              style={{ overflowX: 'auto', flex: 1 }}
              dangerouslySetInnerHTML={{
                __html: (() => {
                  const rawHtml = items[0]?.contentHtml || '';
                  const parts = rawHtml.split('<hr />');
                  if (tutoriasSubTab === 'calendario') {
                    return parts[0] || rawHtml;
                  }
                  return parts[1] || rawHtml;
                })()
              }}
            />
          </div>
        ) : (
          /* MODO TEORÍA O ACTIVIDADES */
          <>
            {/* Acceso directo a la miniweb del Framework: Spring Boot Initializr & FAQ */}
            <Link
              to="/springboot/primeros-pasos"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.8rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(14, 165, 233, 0.12) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                textDecoration: 'none',
                color: 'var(--text-title)',
                marginBottom: '0.85rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
              title="Abrir miniweb: Spring Boot Initializr & Fundamentos"
            >
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '8px', 
                background: 'rgba(16, 185, 129, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.1rem'
              }}>
                🌱
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>
                  Spring Initializr & FAQ
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Primeros pasos & Fundamentos Java
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>➔</span>
            </Link>

            {/* Acceso a Vídeos Recomendados Accenture (Marco Contextual Teórico) */}
            <Link
              to="/accenture/videos"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.8rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(2, 132, 199, 0.12) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                textDecoration: 'none',
                color: 'var(--text-title)',
                marginBottom: '0.85rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
              title="Abrir sección de vídeos teóricos recomendados por Accenture"
            >
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '8px', 
                background: 'rgba(6, 182, 212, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.1rem'
              }}>
                🎬
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#06b6d4' }}>
                  Vídeos Accenture & Tutorías
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Marco teórico UPM: Módulos 0, 1 y 2
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 'bold' }}>➔</span>
            </Link>

            <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              {isTheoryMode 
                ? 'Consulta rápida de conceptos teóricos:' 
                : 'Acceso directo a las 12 actividades del bootcamp:'}
            </p>

            {/* Lista scrollable */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.2rem' }}>
              {isTheoryMode ? (
                // Items de teoría
                items.map((topic, idx) => (
                  <Link
                    key={topic.id || idx}
                    to={`/java/springboot#${topic.slug}`}
                    onClick={() => {
                      const el = document.getElementById(topic.slug);
                      if (el) el.scrollIntoView({ behavior: 'auto' });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      background: 'var(--bg-hover)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontWeight: 'bold', color: '#0ea5e9', fontSize: '0.75rem', minWidth: '18px' }}>
                      {idx + 1}.
                    </span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topic.title}
                    </span>
                  </Link>
                ))
              ) : (
                // Items de actividades
                items.map(act => {
                  const status = activityStatus[act.id] || (act.status === 'proximamente' ? 'Próx.' : 'Pend.');
                  const isDone = status === 'Entregada';

                  return (
                    <Link
                      key={act.id}
                      to={`/accenture/actividades/${act.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.65rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        background: 'var(--bg-hover)',
                        border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                        color: 'var(--text-main)',
                        fontSize: '0.82rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                        <span style={{ 
                          fontWeight: 'bold', 
                          color: isDone ? '#10b981' : '#8b5cf6',
                          fontSize: '0.75rem', 
                          minWidth: '18px' 
                        }}>
                          {act.numero}.
                        </span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {act.shortTitle ? act.shortTitle.replace(/^[0-9]+\.\s*/, '') : act.title}
                        </span>
                      </div>

                      <span style={{ 
                        fontSize: '0.68rem', 
                        padding: '0.15rem 0.4rem', 
                        borderRadius: '4px', 
                        background: isDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                        color: isDone ? '#10b981' : 'var(--text-muted)',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {status}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Enlace al otro curso */}
            <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
              <Link
                to={isTheoryMode ? '/java/springboot' : '/accenture/actividades'}
                className="theme-btn"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 'bold'
                }}
              >
                {isTheoryMode ? 'Ver Guía Teórica Completa →' : 'Ver Todas las Actividades →'}
              </Link>
            </div>
          </>
        )}

      </div>
    </aside>
  );
}
