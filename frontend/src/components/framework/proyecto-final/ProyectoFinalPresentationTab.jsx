import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import StudioCodeBlock from '../../dashboards/javaStudio/StudioCodeBlock.jsx';

const INFOGRAFIAS_HERO = [
  {
    eje: 1,
    titulo: '1. Arquitectura Fullstack',
    subtitulo: 'SPA JavaScript Vanilla + Backend REST Spring Boot 3 Stateless',
    src: '/acc/proyectos/libreria-capas/documentacion/presentacion/Arquitectura_Fullstack_Desacoplada.png',
    badge: 'Eje 1 · Arquitectura'
  },
  {
    eje: 2,
    titulo: '2. Seguridad y JWT',
    subtitulo: 'Flujo de autenticación sin estado, BCrypt, HMAC y auto-logout 401',
    src: '/acc/proyectos/libreria-capas/documentacion/presentacion/Ciclo_de_autenticacion_JWT.png',
    badge: 'Eje 2 · Seguridad'
  },
  {
    eje: 3,
    titulo: '3. 3 Capas, DTOs y ACID',
    subtitulo: 'Triple capa, prevención de recursión Jackson y @Transactional en préstamos',
    src: '/acc/proyectos/libreria-capas/documentacion/presentacion/Arquitectura_backend_en_tres_capas.png',
    badge: 'Eje 3 · Backend'
  },
  {
    eje: 4,
    titulo: '4. 6 Desafíos Resueltos',
    subtitulo: 'CORS, Preflight OPTIONS, Paginación Page<T> vs Arrays y selectores con IDs',
    src: '/acc/proyectos/libreria-capas/documentacion/presentacion/Desafios_de_Integracion_Frontend-Backend.png',
    badge: 'Eje 4 · Integración'
  },
  {
    eje: 5,
    titulo: '5. Decisiones Técnicas & Q&A',
    subtitulo: 'Inyección por constructor, por qué csrf.disable(), concurrencia y N+1',
    src: '/acc/proyectos/libreria-capas/documentacion/presentacion/Decisiones_Tecnicas_para_API_REST.png',
    badge: 'Eje 5 · Tribunal'
  }
];

export default function ProyectoFinalPresentationTab({ initialAxis = 'all' }) {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAxis, setSelectedAxis] = useState(initialAxis);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeModalIndex, setActiveModalIndex] = useState(0);

  // Carga reactiva de informe.md desde la ruta estática
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch('/acc/proyectos/libreria-capas/documentacion/presentacion/informe.md')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar informe.md');
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setMarkdownContent(text);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching informe.md:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sincronizar initialAxis si cambia desde props
  useEffect(() => {
    if (initialAxis) {
      setSelectedAxis(initialAxis);
    }
  }, [initialAxis]);

  // Filtrado de contenido según el eje temático seleccionado
  const filteredContent = useMemo(() => {
    if (!markdownContent) return '';
    if (selectedAxis === 'all' || !selectedAxis) return markdownContent;

    const sections = markdownContent.split(/\n(?=(?:##\s+)?[1-5]\. )/);
    // El intro es la primera parte antes de la sección 1
    const intro = sections[0] && !sections[0].match(/^(?:##\s+)?[1-5]\. /) ? sections[0] : '';
    
    const axisNum = parseInt(selectedAxis, 10);
    const matchedSection = sections.find(s => s.trim().match(new RegExp(`^(?:##\\s+)?${axisNum}\\. `)));

    if (matchedSection) {
      return `${intro}\n\n---\n\n${matchedSection}`;
    }
    return markdownContent;
  }, [markdownContent, selectedAxis]);

  // Manejo de Lightbox Modal para las 5 infografías principales
  const handleOpenHeroModal = (index) => {
    setActiveModalIndex(index);
    setLightboxImage({
      src: INFOGRAFIAS_HERO[index].src,
      alt: INFOGRAFIAS_HERO[index].titulo,
      subtitulo: INFOGRAFIAS_HERO[index].subtitulo
    });
  };

  const handlePrevHero = () => {
    const nextIdx = (activeModalIndex - 1 + INFOGRAFIAS_HERO.length) % INFOGRAFIAS_HERO.length;
    setActiveModalIndex(nextIdx);
    setLightboxImage({
      src: INFOGRAFIAS_HERO[nextIdx].src,
      alt: INFOGRAFIAS_HERO[nextIdx].titulo,
      subtitulo: INFOGRAFIAS_HERO[nextIdx].subtitulo
    });
  };

  const handleNextHero = () => {
    const nextIdx = (activeModalIndex + 1) % INFOGRAFIAS_HERO.length;
    setActiveModalIndex(nextIdx);
    setLightboxImage({
      src: INFOGRAFIAS_HERO[nextIdx].src,
      alt: INFOGRAFIAS_HERO[nextIdx].titulo,
      subtitulo: INFOGRAFIAS_HERO[nextIdx].subtitulo
    });
  };

  // Renderizadores Markdown personalizados con rewrite de rutas relativas
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 style={{
        fontSize: '1.75rem',
        fontWeight: 800,
        color: '#0f172a',
        margin: '2.2rem 0 0.8rem 0',
        paddingBottom: '0.6rem',
        borderBottom: '2px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{
        fontSize: '1.4rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: '1.8rem 0 0.7rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{
        fontSize: '1.18rem',
        fontWeight: 700,
        color: '#334155',
        margin: '1.4rem 0 0.5rem 0'
      }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{
        margin: '0 0 1rem 0',
        color: '#334155',
        lineHeight: 1.75,
        fontSize: '0.96rem'
      }}>
        {children}
      </p>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeText = String(children).replace(/\n$/, '');
      if (!inline && (match || codeText.includes('\n'))) {
        return (
          <div style={{ margin: '1.25rem 0' }}>
            <StudioCodeBlock
              code={codeText}
              language={match ? match[1] : 'java'}
              filename={`Snippet_${match ? match[1] : 'code'}`}
            />
          </div>
        );
      }
      return (
        <code
          style={{
            background: 'rgba(236, 72, 153, 0.08)',
            color: '#be185d',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            fontSize: '0.86rem',
            fontFamily: 'monospace',
            fontWeight: 600,
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}
          {...props}
        >
          {children}
        </code>
      );
    },
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: '1.35rem 0',
          padding: '0.9rem 1.3rem',
          background: '#fdf2f8',
          borderLeft: '4px solid #ec4899',
          borderRadius: '0 8px 8px 0',
          color: '#831843',
          fontSize: '0.94rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}
      >
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '1.4rem 0', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', background: '#ffffff' }}>
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th style={{ background: '#f8fafc', padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #e2e8f0' }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
        {children}
      </td>
    ),
    ul: ({ children }) => (
      <ul style={{ margin: '0 0 1.1rem 1.4rem', padding: 0, color: '#334155', lineHeight: 1.75 }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol style={{ margin: '0 0 1.1rem 1.4rem', padding: 0, color: '#334155', lineHeight: 1.75 }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: '0.4rem' }}>
        {children}
      </li>
    ),
    hr: () => (
      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '2rem 0' }} />
    ),
    img: ({ src, alt }) => {
      // Si la ruta es relativa './Imagen.png', la resolvemos al directorio de la presentación
      let resolvedSrc = src;
      if (resolvedSrc.startsWith('./')) {
        resolvedSrc = '/acc/proyectos/libreria-capas/documentacion/presentacion/' + resolvedSrc.substring(2);
      }

      return (
        <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
          <div
            onClick={() => setLightboxImage({ src: resolvedSrc, alt: alt || 'Infografía de Defensa', subtitulo: '' })}
            title="Haz clic para ampliar a pantalla completa en alta resolución"
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
              background: '#ffffff',
              cursor: 'zoom-in',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ec4899';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(236, 72, 153, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
            }}
          >
            <img
              src={resolvedSrc}
              alt={alt || 'Infografía Técnica'}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                objectFit: 'contain'
              }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(4px)',
                color: '#ffffff',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                pointerEvents: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
            >
              <span>🔍</span> Clic para ampliar en alta resolución
            </div>
          </div>
          {alt && (
            <figcaption style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.65rem', fontWeight: 600 }}>
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. HERO HEADER DEFENSA & PRESENTACIÓN */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
        border: '1.5px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '20px',
        padding: '2rem 2.2rem',
        boxShadow: '0 8px 30px rgba(236, 72, 153, 0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.8rem' }}>🎤</span>
              <span style={{
                background: 'rgba(236, 72, 153, 0.15)',
                color: '#be185d',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '0.25rem 0.7rem',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Memoria Técnica Oficial & 5 Infografías
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.6rem 0' }}>
              Informe Técnico de Defensa: Arquitectura, Seguridad e Integración
            </h1>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.98rem', maxWidth: '850px', lineHeight: 1.6 }}>
              Guía analítica y soporte descriptivo para defender ante el tribunal los 5 ejes fundamentales de la biblioteca: desde la arquitectura desacoplada y el token JWT hasta las 3 capas en Spring Boot 3 y los 6 desafíos reales resueltos.
            </p>

            {/* ENLACE Y CREDENCIALES OFICIALES DE TEAMS */}
            <div
              style={{
                marginTop: '1.1rem',
                padding: '0.75rem 1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1.5px solid rgba(236, 72, 153, 0.35)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                boxShadow: '0 2px 8px rgba(236, 72, 153, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.35rem' }}>📅</span>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                    Presentación de Proyecto · 16 de Noviembre
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                    ID: 279 807 865 246 65 | Pass: AV9Tg7VD
                  </div>
                </div>
              </div>
              <a
                href="https://teams.microsoft.com/meet/27980786524665?p=TOaS8Fsl3dMslsgXpP"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(236, 72, 153, 0.3)',
                  transition: 'all 0.15s ease'
                }}
              >
                🔗 Unirse por Teams
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href="/acc/proyectos/libreria-capas/documentacion/presentacion/informe.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              <span>📄</span> Ver informe.md puro ↗
            </a>
            <button
              onClick={() => window.print()}
              style={{
                background: '#ec4899',
                color: '#ffffff',
                border: 'none',
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
              }}
            >
              <span>🖨️</span> Imprimir / Guardar PDF
            </button>
          </div>
        </div>

        {/* 2. CARRUSEL RÁPIDO DE LAS 5 INFOGRAFÍAS */}
        <div style={{ marginTop: '1.8rem', borderTop: '1px solid rgba(236, 72, 153, 0.2)', paddingTop: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#831843', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🖼️ Las 5 Infografías Maestras de Presentación (Haz clic para ampliar)
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Pasa el ratón o pulsa para proyectar en alta resolución
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {INFOGRAFIAS_HERO.map((info, idx) => (
              <div
                key={info.eje}
                onClick={() => handleOpenHeroModal(idx)}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#ec4899';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(236, 72, 153, 0.16)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ height: '110px', background: '#f8fafc', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={info.src}
                    alt={info.titulo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'rgba(15, 23, 42, 0.82)',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '12px'
                  }}>
                    Eje {info.eje}
                  </div>
                </div>
                <div style={{ padding: '0.75rem 0.9rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.86rem', fontWeight: 800, color: '#0f172a' }}>
                      {info.titulo}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.74rem', color: '#64748b', lineHeight: 1.4 }}>
                      {info.subtitulo}
                    </p>
                  </div>
                  <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#be185d', fontWeight: 700 }}>
                    🔍 Proyectar diapositiva →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. FILTROS DE EJES TEMÁTICOS */}
        <div style={{ marginTop: '1.6rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569', marginRight: '0.4rem' }}>
            Filtrar sección:
          </span>
          {[
            { id: 'all', label: '📑 Todos los Ejes (Informe Completo)' },
            { id: '1', label: '1️⃣ Eje 1: Arquitectura' },
            { id: '2', label: '2️⃣ Eje 2: Seguridad JWT' },
            { id: '3', label: '3️⃣ Eje 3: 3 Capas & ACID' },
            { id: '4', label: '4️⃣ Eje 4: 6 Desafíos' },
            { id: '5', label: '5️⃣ Eje 5: Tribunal & Q&A' }
          ].map((tab) => {
            const isActive = String(selectedAxis) === String(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedAxis(tab.id)}
                style={{
                  background: isActive ? '#ec4899' : '#ffffff',
                  color: isActive ? '#ffffff' : '#334155',
                  border: isActive ? '1px solid #db2777' : '1px solid #cbd5e1',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 3px 8px rgba(236, 72, 153, 0.3)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CUERPO DEL INFORME TÉCNICO EN MARKDOWN */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '2.5rem 3rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.8rem' }}>⏳</span>
            Cargando informe técnico oficial con las infografías...
          </div>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {filteredContent}
          </ReactMarkdown>
        )}
      </div>

      {/* 5. MODAL LIGHTBOX FULLSCREEN PARA INFOGRAFÍAS */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          {/* Barra superior del modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1200px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              color: '#ffffff'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {lightboxImage.alt || 'Infografía Técnica'}
              </h3>
              {lightboxImage.subtitulo && (
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                  {lightboxImage.subtitulo}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <a
                href={lightboxImage.src}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}
              >
                Abrir original ↗
              </a>
              <button
                onClick={() => setLightboxImage(null)}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                Cerrar ✕
              </button>
            </div>
          </div>

          {/* Contenedor de la imagen con controles de navegación */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '1200px',
              maxHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Botón anterior */}
            <button
              onClick={handlePrevHero}
              title="Infografía anterior"
              style={{
                position: 'absolute',
                left: '-60px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: 'none',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                fontSize: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(236, 72, 153, 0.8)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
            >
              ‹
            </button>

            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '78vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            />

            {/* Botón siguiente */}
            <button
              onClick={handleNextHero}
              title="Infografía siguiente"
              style={{
                position: 'absolute',
                right: '-60px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: 'none',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                fontSize: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(236, 72, 153, 0.8)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
