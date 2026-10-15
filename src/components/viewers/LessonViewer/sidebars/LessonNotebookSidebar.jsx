import React, { useState } from 'react';
import { formatNotebookMarkdown } from '../../../../utils/notebookFormatter';

export default function LessonNotebookSidebar({ 
  isOpen, 
  onToggle, 
  activeSlug, 
  activityTitle,
  notebookData,
  topOffset = '76px'
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('doc'); // 'doc' | 'raw'

  // Si no se pasan datos específicos de notas, generamos una plantilla base universal
  const docData = notebookData || {
    actividadNumero: activeSlug ? activeSlug.replace(/[^0-9]/g, '') : '',
    ficheroNotas: `notas/NOTAS-${activeSlug || 'ejercicio'}.md`,
    rama: activeSlug || 'main',
    prTitulo: `${activityTitle || 'Entrega'}`,
    tituloDoc: `Documento de Notas: ${activityTitle || activeSlug}`,
    modulo: 'Apuntes y Registro de Trabajo',
    secciones: [
      {
        titulo: 'Registro de Decisiones Técnicas',
        icono: '📝',
        color: 'var(--accent-blue)',
        items: [
          {
            pregunta: 'Decisiones de diseño y arquitectura tomadas:',
            respuesta: 'Registra aquí las razones técnicas de la estructura implementada y cualquier consulta realizada.'
          }
        ]
      }
    ]
  };

  const markdownContent = formatNotebookMarkdown(docData);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Normalizar secciones para renderizado 100% data-driven
  const sectionsList = docData.secciones || [
    docData.paso1 && { ...docData.paso1, icono: '💬', color: 'var(--accent-blue)' },
    docData.paso4 && { ...docData.paso4, icono: '🧠', color: '#f59e0b' },
    docData.reflexion && { ...docData.reflexion, icono: '🎯', color: '#10b981' }
  ].filter(Boolean);

  return (
    <aside
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '460px',
        maxWidth: 'calc(100vw - 42px)',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 28px rgba(0,0,0,0.25)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Pestaña Notebook adherida a la izquierda del panel */}
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
          zIndex: 961,
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title={isOpen ? 'Ocultar cuaderno' : '📓 Cuaderno de Notas y Reflexión'}
        aria-label={isOpen ? 'Ocultar cuaderno' : '📓 Cuaderno de Notas y Reflexión'}
      >
        <span>{isOpen ? '▶' : '📓'}</span>
      </button>

      {/* Cabecera del Panel Cuaderno */}
      <div style={{
        padding: '1rem 1.2rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>📓</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-title)', fontWeight: 700 }}>
              Cuaderno de Reflexión
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {docData.modulo || 'Registro de Trabajo'}
            </span>
          </div>
        </div>

        {/* Acciones de la cabecera */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <button
            onClick={() => setActiveTab(activeTab === 'doc' ? 'raw' : 'doc')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600
            }}
            title="Alternar vista Documento / Código Markdown"
          >
            {activeTab === 'doc' ? 'Ver .md' : 'Ver Doc'}
          </button>

          <button
            onClick={handleCopy}
            className="theme-btn"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '6px',
              background: copied ? '#10b981' : 'var(--accent-purple, #8b5cf6)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'background 0.2s ease'
            }}
          >
            {copied ? '✅ ¡Copiado!' : '📋 Copiar'}
          </button>
        </div>
      </div>

      {/* Metadatos del Documento de Notas */}
      <div style={{
        padding: '0.7rem 1.2rem',
        background: 'var(--bg-hover)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.78rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: 600 }}>
          <span>📄</span>
          <code style={{ background: 'var(--bg-card)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--accent-blue)' }}>
            {docData.ficheroNotas || `notas/${activeSlug}.md`}
          </code>
        </div>
        {docData.rama && (
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Rama: <strong style={{ color: 'var(--text-title)' }}>{docData.rama}</strong>
          </div>
        )}
      </div>

      {/* Contenido en formato Documento (Doc Reader) */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        boxSizing: 'border-box'
      }}>
        {activeTab === 'raw' ? (
          /* Vista Markdown Crudo listo para seleccionar */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Contenido exacto para tu archivo <code>{docData.ficheroNotas}</code>:
            </div>
            <pre style={{
              flex: 1,
              background: 'var(--bg-main)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowY: 'auto',
              color: 'var(--text-main)'
            }}>
              <code>{markdownContent}</code>
            </pre>
          </div>
        ) : (
          /* Vista Doc Formateada tipo Cuaderno Oficial */
          <>
            {/* Tarjeta de Encabezado de Documento */}
            <div style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '1rem 1.2rem',
              borderLeft: '4px solid var(--accent-purple, #8b5cf6)'
            }}>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '0.95rem', color: 'var(--text-title)' }}>
                {docData.tituloDoc}
              </h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Plantilla requerida para la entrega técnica y Pull Request{docData.rama ? <> hacia <code>{docData.rama}</code></> : ''}.
              </p>
            </div>

            {/* SECCIONES DINÁMICAS DATA-DRIVEN */}
            {sectionsList.map((sec, sIdx) => (
              <section key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  fontSize: '0.82rem', 
                  fontWeight: 700, 
                  color: sec.color || 'var(--accent-blue)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px' 
                }}>
                  <span>{sec.icono || '📌'}</span>
                  <span>{sec.titulo}</span>
                </div>
                {sec.items && sec.items.map((it, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.85rem 1rem'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                      {it.pregunta}
                    </div>
                    {it.respuesta && (
                      <div style={{ 
                        fontSize: '0.82rem', 
                        color: 'var(--text-main)', 
                        lineHeight: 1.5, 
                        borderLeft: `2px solid ${sec.color || 'var(--border-subtle)'}`, 
                        paddingLeft: '0.6rem' 
                      }}>
                        {it.respuesta}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            ))}

            {/* Footer con recordatorio de entrega */}
            <div style={{
              marginTop: 'auto',
              padding: '0.8rem',
              background: 'var(--bg-hover)',
              borderRadius: '8px',
              border: '1px dashed var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}>
              💡 Usa el botón <strong>Copiar</strong> para pegar esta plantilla completa en tu fichero local dentro de <code>notas/</code>.
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
