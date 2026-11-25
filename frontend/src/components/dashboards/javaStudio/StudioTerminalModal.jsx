import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IconCopy, IconCheck, IconX, IconTerminal } from './StudioIcons.jsx';

export default function StudioTerminalModal({
  isOpen = false,
  onClose,
  title = 'guia-didactica-java-studio.md',
  command = 'cat poo/secretaria/guia-didactica-java-studio.md',
  filePath = '/java-studio/poo/secretaria/guia-didactica-java-studio.md',
  initialContent = null
}) {
  const [content, setContent] = useState(initialContent || '');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('glow'); // 'glow' (CLI Markdown) | 'cat' (Raw monospace)
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Tecla Escape para cerrar
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cargar contenido del archivo si no se proporcionó
    if (!initialContent && filePath) {
      setLoading(true);
      fetch(filePath)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((err) => {
          setContent(`[ERROR] No se pudo leer el archivo: ${err.message}\nRuta: ${filePath}`);
          setLoading(false);
        });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, filePath, initialContent, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 15, 30, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullscreen ? '0' : '1.25rem',
        animation: 'studioModalFadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: isFullscreen ? '100vw' : '92vw',
          maxWidth: isFullscreen ? '100vw' : '980px',
          height: isFullscreen ? '100vh' : '88vh',
          background: '#0d1117',
          color: '#e6edf3',
          borderRadius: isFullscreen ? '0' : '12px',
          border: '1px solid #30363d',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(110, 118, 129, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'SF Mono', 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
          transition: 'all 0.2s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA TERMINAL MACOS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 1rem',
            background: '#161b22',
            borderBottom: '1px solid #21262d',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          {/* SEMÁFORO MACOS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              type="button"
              onClick={onClose}
              title="Cerrar terminal (Esc)"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ff5f56',
                border: '1px solid #e0443e',
                cursor: 'pointer',
                padding: 0
              }}
            />
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              title="Restaurar tamaño"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ffbd2e',
                border: '1px solid #dea123',
                cursor: 'pointer',
                padding: 0
              }}
            />
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#27c93f',
                border: '1px solid #1aab29',
                cursor: 'pointer',
                padding: 0
              }}
            />
          </div>

          {/* TÍTULO DE LA SESIÓN DE TERMINAL */}
          <div
            style={{
              fontSize: '0.8rem',
              color: '#8b949e',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: 600
            }}
          >
            <IconTerminal size={14} style={{ color: '#a78bfa' }} />
            <span style={{ color: '#c9d1d9' }}>blanca@macbook-pro:</span>
            <span style={{ color: '#58a6ff' }}>~/Micampus/java-studio</span>
            <span style={{ color: '#8b949e', fontSize: '0.72rem' }}>({title})</span>
          </div>

          {/* ACCIONES RÁPIDAS DE LA TERMINAL */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* CONMUTADOR GLOW / RAW */}
            <div style={{ display: 'inline-flex', background: '#0d1117', borderRadius: '6px', border: '1px solid #30363d', padding: '2px' }}>
              <button
                type="button"
                onClick={() => setViewMode('glow')}
                style={{
                  background: viewMode === 'glow' ? '#6d28d9' : 'transparent',
                  color: viewMode === 'glow' ? '#ffffff' : '#8b949e',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Visor Markdown estilo Glow / CLI"
              >
                glow
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cat')}
                style={{
                  background: viewMode === 'cat' ? '#6d28d9' : 'transparent',
                  color: viewMode === 'cat' ? '#ffffff' : '#8b949e',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Texto Raw estilo cat / less"
              >
                cat (raw)
              </button>
            </div>

            {/* BOTÓN COPIAR */}
            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: 'transparent',
                border: '1px solid #30363d',
                color: copied ? '#3fb950' : '#c9d1d9',
                borderRadius: '6px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.74rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Copiar contenido de la terminal"
            >
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>

            {/* BOTÓN CERRAR */}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8b949e',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem',
                borderRadius: '4px'
              }}
              title="Cerrar (Esc)"
            >
              <IconX size={16} />
            </button>
          </div>
        </div>

        {/* CUERPO DE LA TERMINAL */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            background: '#0d1117',
            fontSize: '0.86rem',
            lineHeight: 1.6
          }}
        >
          {/* LÍNEA DE COMANDO SHELL SIMULADA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.45rem',
              marginBottom: '1.1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px dashed #21262d',
              fontSize: '0.84rem'
            }}
          >
            <span style={{ color: '#3fb950', fontWeight: 800 }}>blanca@macbook-pro</span>
            <span style={{ color: '#8b949e' }}>:</span>
            <span style={{ color: '#58a6ff', fontWeight: 700 }}>~/Micampus/java-studio</span>
            <span style={{ color: '#a78bfa', fontWeight: 800 }}>%</span>
            <span style={{ color: '#f0883e', fontWeight: 700 }}>{command}</span>
          </div>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8b949e' }}>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span> Cargando contenido en el buffer de la terminal...
            </div>
          ) : viewMode === 'glow' ? (
            /* VISOR GLOW CLI / MARKDOWN RENDERIZADO CON PALETA TERMINAL */
            <div
              className="studio-terminal-glow"
              style={{
                color: '#c9d1d9',
                fontSize: '0.88rem'
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <div style={{ margin: '1.4rem 0 0.8rem 0', paddingBottom: '0.4rem', borderBottom: '2px solid #6d28d9', color: '#a78bfa', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#3fb950' }}>#</span> {children}
                    </div>
                  ),
                  h2: ({ children }) => (
                    <div style={{ margin: '1.25rem 0 0.6rem 0', color: '#58a6ff', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: '#d29922' }}>##</span> {children}
                    </div>
                  ),
                  h3: ({ children }) => (
                    <div style={{ margin: '1rem 0 0.4rem 0', color: '#79c0ff', fontSize: '0.98rem', fontWeight: 700 }}>
                      <span style={{ color: '#8b949e' }}>###</span> {children}
                    </div>
                  ),
                  p: ({ children }) => (
                    <p style={{ margin: '0 0 0.85rem 0', color: '#c9d1d9', lineHeight: 1.65 }}>{children}</p>
                  ),
                  ol: ({ children }) => (
                    <ol className="term-ol">{children}</ol>
                  ),
                  ul: ({ children }) => (
                    <ul className="term-ul">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="term-li">
                      <div className="term-li-content">{children}</div>
                    </li>
                  ),
                  hr: () => (
                    <hr style={{ border: 'none', borderTop: '1px dashed #30363d', margin: '1.25rem 0' }} />
                  ),
                  table: ({ children }) => (
                    <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', background: '#161b22', border: '1px solid #30363d', borderRadius: '6px' }}>
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th style={{ background: '#21262d', color: '#a78bfa', padding: '0.55rem 0.8rem', textAlign: 'left', borderBottom: '1px solid #30363d', fontWeight: 800 }}>
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td style={{ padding: '0.5rem 0.8rem', borderBottom: '1px solid #21262d', color: '#c9d1d9' }}>
                      {children}
                    </td>
                  ),
                  code: ({ inline, children }) => (
                    <code
                      style={{
                        background: '#161b22',
                        color: '#f0883e',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        border: '1px solid #30363d',
                        fontSize: '0.82rem',
                        fontFamily: 'inherit'
                      }}
                    >
                      {children}
                    </code>
                  ),
                  strong: ({ children }) => (
                    <strong style={{ color: '#ffffff', fontWeight: 800 }}>{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#58a6ff', textDecoration: 'underline' }}
                    >
                      {children}
                    </a>
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            /* MODO RAW CAT CON LÍNEAS */
            <pre
              style={{
                margin: 0,
                color: '#7ee787',
                fontFamily: 'inherit',
                fontSize: '0.82rem',
                lineHeight: 1.55,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {content}
            </pre>
          )}

          {/* PROMPT FINAL CON CURSOR PARPADEANTE */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginTop: '1.5rem',
              paddingTop: '0.85rem',
              borderTop: '1px dashed #21262d',
              fontSize: '0.84rem'
            }}
          >
            <span style={{ color: '#3fb950', fontWeight: 800 }}>blanca@macbook-pro</span>
            <span style={{ color: '#8b949e' }}>:</span>
            <span style={{ color: '#58a6ff', fontWeight: 700 }}>~/Micampus/java-studio</span>
            <span style={{ color: '#a78bfa', fontWeight: 800 }}>%</span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '15px',
                background: '#a78bfa',
                animation: 'terminalBlink 1s step-end infinite'
              }}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes studioModalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .studio-terminal-glow ol.term-ol {
          counter-reset: term-counter;
          list-style: none;
          padding-left: 0;
          margin: 0.85rem 0 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .studio-terminal-glow ol.term-ol > li.term-li {
          counter-increment: term-counter;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          line-height: 1.65;
          color: #c9d1d9;
        }
        .studio-terminal-glow ol.term-ol > li.term-li::before {
          content: counter(term-counter, decimal-leading-zero);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 22px;
          padding: 0 6px;
          font-size: 0.74rem;
          font-weight: 800;
          font-family: inherit;
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.12);
          border: 1px solid rgba(167, 139, 250, 0.35);
          border-radius: 6px;
          flex-shrink: 0;
          margin-top: 3px;
          letter-spacing: 0.5px;
        }
        .studio-terminal-glow ol.term-ol > li.term-li .term-li-content {
          flex: 1;
          min-width: 0;
        }
        .studio-terminal-glow ul.term-ul {
          list-style: none;
          padding-left: 0;
          margin: 0.85rem 0 1.1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .studio-terminal-glow ul.term-ul > li.term-li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          line-height: 1.6;
          color: #c9d1d9;
        }
        .studio-terminal-glow ul.term-ul > li.term-li::before {
          content: "❯";
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #3fb950;
          font-weight: 800;
          font-size: 0.82rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .studio-terminal-glow ul.term-ul > li.term-li .term-li-content {
          flex: 1;
          min-width: 0;
        }
        .studio-terminal-glow .term-li-content > p {
          margin: 0;
          line-height: inherit;
        }
      `}</style>
    </div>
  );
}
