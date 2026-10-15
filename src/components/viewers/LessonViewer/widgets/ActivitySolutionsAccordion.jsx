import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatNotebookMarkdown } from '../../../../utils/notebookFormatter';

export default function ActivitySolutionsAccordion({ 
  solucionCodigo, 
  activeSlug, 
  actividadTitle: _actividadTitle,
  notebookData 
}) {
  const [showCode, setShowCode] = useState(false);
  const [showReflections, setShowReflections] = useState(false);
  const [copied, setCopied] = useState(false);

  // Si no hay código ni datos de notas/reflexión, no renderizamos el componente
  if (!solucionCodigo && !notebookData) {
    return null;
  }

  const docData = notebookData || null;

  const handleCopy = () => {
    if (!docData) return;
    const md = formatNotebookMarkdown(docData);
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Normalizar secciones data-driven
  const sectionsList = docData ? (docData.secciones || [
    docData.paso1 && { ...docData.paso1, icono: '💬', color: 'var(--accent-blue)' },
    docData.paso4 && { ...docData.paso4, icono: '🧠', color: '#f59e0b' },
    docData.reflexion && { ...docData.reflexion, icono: '🎯', color: '#10b981' }
  ].filter(Boolean)) : [];

  return (
    <section 
      className="activity-solutions-section" 
      style={{ 
        marginTop: '3.5rem', 
        paddingTop: '2.5rem', 
        borderTop: '2px dashed var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      {/* Cabecera de la sección de soluciones */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.6rem' }}>{solucionCodigo ? '🎯' : '📓'}</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 700 }}>
              {solucionCodigo ? 'Soluciones Guiadas y Documentación' : (docData?.tituloDoc || 'Hoja de Bloc de Notas y Decisión Técnica')}
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {solucionCodigo 
                ? 'Intenta resolver el ejercicio por tu cuenta antes de consultar estas propuestas oficiales.' 
                : 'Registro de decisiones técnicas, entorno y comandos de instalación para macOS.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={() => {
              const allOpen = showCode && showReflections;
              setShowCode(!allOpen);
              setShowReflections(!allOpen);
            }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            {showCode && showReflections ? 'Cerrar Todo' : 'Desplegar Todo'}
          </button>
        </div>
      </div>

      {/* BLOQUE 1: DESPLEGABLE SOLUCIÓN DE CÓDIGO */}
      {solucionCodigo && (
        <div 
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.2s ease'
          }}
        >
          <button
            onClick={() => setShowCode(!showCode)}
            style={{
              width: '100%',
              padding: '1.1rem 1.4rem',
              background: showCode ? 'var(--bg-hover)' : 'var(--bg-card)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--text-title)',
              transition: 'background 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.3rem' }}>💡</span>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  Propuesta de Solución en Código Java
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Implementación de referencia con buenas prácticas y anotaciones de Spring
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                background: 'rgba(16, 185, 129, 0.15)', 
                color: '#10b981', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontWeight: 700 
              }}>
                Solución Oficial
              </span>
              <span style={{ 
                fontSize: '1.1rem', 
                transform: showCode ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                display: 'inline-block' 
              }}>
                ▼
              </span>
            </div>
          </button>

          {showCode && (
            <div 
              style={{ 
                padding: '1.6rem', 
                borderTop: '1px solid var(--border-subtle)', 
                background: 'var(--bg-main)',
                fontSize: '0.98rem',
                lineHeight: '1.7'
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {solucionCodigo}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* BLOQUE 2: DESPLEGABLE SOLUCIÓN PREGUNTAS DE REFLEXIÓN (DATA-DRIVEN) */}
      {docData && (
        <div 
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.2s ease'
          }}
        >
          <button
            onClick={() => setShowReflections(!showReflections)}
            style={{
              width: '100%',
              padding: '1.1rem 1.4rem',
              background: showReflections ? 'var(--bg-hover)' : 'var(--bg-card)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--text-title)',
              transition: 'background 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📓</span>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  {docData.tituloDoc || 'Solución a las Preguntas de Reflexión'} {docData.ficheroNotas && `(${docData.ficheroNotas})`}
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {solucionCodigo ? 'Respuestas argumentadas y guía para la entrega y Pull Request' : 'Justificación técnica, elección de software frente a VirtualBox y comandos para Mac'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                background: 'rgba(139, 92, 246, 0.15)', 
                color: 'var(--accent-purple, #8b5cf6)', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontWeight: 700 
              }}>
                {solucionCodigo ? 'Reflexión & PR' : 'Decisión Técnica'}
              </span>
              <span style={{ 
                fontSize: '1.1rem', 
                transform: showReflections ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                display: 'inline-block' 
              }}>
                ▼
              </span>
            </div>
          </button>

          {showReflections && (
            <div 
              style={{ 
                padding: '1.5rem', 
                borderTop: '1px solid var(--border-subtle)', 
                background: 'var(--bg-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.4rem'
              }}
            >
              {/* Barra de cabecera con botón de copiar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.8rem 1rem',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '0.6rem'
              }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  📄 Fichero de entrega: <strong style={{ color: 'var(--text-title)' }}>{docData.ficheroNotas || `notas/${activeSlug}.md`}</strong>
                </div>
                <button
                  onClick={handleCopy}
                  className="theme-btn"
                  style={{
                    padding: '0.4rem 0.9rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    background: copied ? '#10b981' : 'var(--accent-purple, #8b5cf6)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {copied ? '✅ ¡Copiado!' : '📋 Copiar Plantilla Markdown'}
                </button>
              </div>

              {/* Secciones dinámicas data-driven */}
              {sectionsList.map((sec, sIdx) => (
                <div key={sIdx}>
                  <h4 style={{ 
                    margin: '0 0 0.8rem', 
                    fontSize: '0.92rem', 
                    color: sec.color || 'var(--accent-blue)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px' 
                  }}>
                    {sec.icono || '📌'} {sec.titulo}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {sec.items && sec.items.map((it, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.9rem 1.1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                          {it.pregunta}
                        </div>
                        {it.respuesta && (
                          <div style={{ 
                            color: 'var(--text-main)', 
                            fontSize: '0.88rem', 
                            lineHeight: 1.5, 
                            borderLeft: `2px solid ${sec.color || 'var(--border-subtle)'}`, 
                            paddingLeft: '0.6rem' 
                          }}>
                            {it.respuesta}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
