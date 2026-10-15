import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ActivitySolutionsAccordion from './widgets/ActivitySolutionsAccordion';
import PodcastPlayerCard from './widgets/PodcastPlayerCard';
import InfografiaCarousel from './widgets/InfografiaCarousel';
import FolderArchiveTabs from '../../common/FolderArchiveTabs';

const LOCAL_VIDEO_MAP = {
  'jzPhDD-aeF8': '/fuentes/springboot/video2_protocolo_http.mp4',
  '_AgW-rLgFWw': '/fuentes/springboot/video4_seguridad_https.mp4'
};

function LessonVideoPlayer({ src, title, ytHref, videoId }) {
  const [hasError, setHasError] = React.useState(false);

  // Si tiene archivo local configurado y no ha fallado la carga:
  if (src && !hasError) {
    return (
      <div style={{
        margin: '1.6rem 0',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        background: 'var(--bg-card, #131b2e)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.1rem',
          background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.22) 0%, rgba(37, 99, 235, 0.08) 100%)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.25)',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.88rem', fontWeight: 700, color: '#60a5fa' }}>
            <span style={{ fontSize: '1.15rem' }}>📹</span>
            <span>{title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 600,
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              ✨ Vídeo Local MP4 · HD
            </span>
            {ytHref && (
              <a 
                href={ytHref} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))'
                }}
              >
                <span>YouTube</span> <span>↗</span>
              </a>
            )}
          </div>
        </div>
        <div style={{ position: 'relative', background: '#000000', display: 'flex', justifyContent: 'center' }}>
          <video 
            src={src} 
            controls 
            preload="metadata"
            onError={() => setHasError(true)}
            style={{
              width: '100%',
              maxHeight: '520px',
              display: 'block'
            }}
          />
        </div>
      </div>
    );
  }

  // Fallback si no hay local o aún no se ha colocado el archivo MP4:
  return (
    <div style={{
      margin: '1.6rem 0',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid rgba(239, 68, 68, 0.35)',
      background: 'var(--bg-card, #131b2e)',
      boxShadow: '0 8px 26px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.1rem',
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.06) 100%)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.88rem', fontWeight: 700, color: '#f87171' }}>
          <span style={{ fontSize: '1.15rem' }}>🔴</span>
          <span>{title}</span>
        </div>
        <span style={{
          fontSize: '0.74rem',
          fontWeight: 600,
          background: 'rgba(234, 179, 8, 0.15)',
          color: '#fbbf24',
          padding: '0.25rem 0.65rem',
          borderRadius: '999px',
          border: '1px solid rgba(234, 179, 8, 0.3)'
        }}>
          🔒 Inserción restringida por YouTube
        </span>
      </div>
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        background: '#090d16'
      }}>
        {videoId && (
          <img 
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.55) blur(2px)',
              transform: 'scale(1.05)'
            }}
          />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15,23,42,0.4) 0%, rgba(10,15,30,0.85) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          zIndex: 2
        }}>
          {ytHref && (
            <a 
              href={ytHref} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#ffffff',
                padding: '0.85rem 1.6rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(239, 68, 68, 0.45)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Ver vídeo en YouTube</span>
              <span style={{ fontSize: '0.85rem' }}>↗</span>
            </a>
          )}

          <p style={{
            marginTop: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '500px',
            lineHeight: 1.45,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            {src ? (
              <span>
                💡 O coloca tu copia local en <code style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>{src}</code> para reproducirlo directamente aquí en la web sin bloqueos.
              </span>
            ) : (
              'El autor ha restringido la inserción en webs externas. Ábrelo en YouTube con el botón superior.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function CodeBlockWithCopy({ children, ...props }) {
  const [copied, setCopied] = React.useState(false);

  // Extraer texto plano para la función de copia
  const extractText = (node) => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node.props && node.props.children) return extractText(node.props.children);
    return '';
  };

  const rawCode = extractText(children).trim();

  // Detectar lenguaje y si se trata de un prompt para LLM / Copilot
  const codeChild = React.Children.toArray(children)[0];
  const className = (codeChild && codeChild.props && codeChild.props.className) || '';
  const langMatch = className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1] : '';

  const isPrompt = 
    lang === 'markdown' || 
    lang === 'prompt' || 
    rawCode.includes('Never invent or assume') || 
    rawCode.includes('copilot') || 
    rawCode.includes('Actúa como un') ||
    rawCode.includes('You are a') ||
    rawCode.includes('System Prompt');

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!rawCode) return;
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div style={{
      position: 'relative',
      margin: '1.6rem 0',
      borderRadius: '12px',
      overflow: 'hidden',
      border: isPrompt ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: isPrompt ? '0 8px 24px rgba(56, 189, 248, 0.16)' : '0 8px 24px rgba(0, 0, 0, 0.35)',
      background: '#011627'
    }}>
      {/* Cabecera interactiva con botón de copia destacado */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.1rem',
        background: isPrompt 
          ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%)' 
          : 'rgba(255, 255, 255, 0.04)',
        borderBottom: isPrompt ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        gap: '0.75rem',
        userSelect: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', fontWeight: 700, color: isPrompt ? '#38bdf8' : 'var(--text-muted)' }}>
          <span style={{ fontSize: '1.1rem' }}>{isPrompt ? '🤖' : '💻'}</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {isPrompt ? 'Prompt de Sistema · Copilot / LLM' : (lang || 'Código')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.4rem 0.95rem',
            borderRadius: '6px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: isPrompt 
              ? (copied ? '1px solid #22c55e' : '1px solid rgba(56, 189, 248, 0.6)')
              : (copied ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.22)'),
            background: copied 
              ? 'rgba(34, 197, 94, 0.25)' 
              : (isPrompt ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.08)'),
            color: copied ? '#4ade80' : (isPrompt ? '#38bdf8' : '#e2e8f0'),
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: copied ? '0 0 14px rgba(34, 197, 94, 0.45)' : 'none'
          }}
          title={copied ? '¡Copiado con éxito!' : (isPrompt ? 'Copiar todo el prompt al portapapeles' : 'Copiar código')}
        >
          <span>{copied ? '✅' : '📋'}</span>
          <span>{copied ? '¡Copiado al portapapeles!' : (isPrompt ? 'Copiar Prompt' : 'Copiar Código')}</span>
        </button>
      </div>

      {/* Bloque pre original preservado para highlight.js */}
      <pre 
        style={{
          margin: 0,
          padding: '1.25rem 1.4rem',
          overflowX: 'auto',
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          lineHeight: '1.6'
        }}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

export default function LessonContent({ 
  topics, 
  activeSlug, 
  activeSubSlug,
  onSelectTopic: _onSelectTopic,
  onSelectSubSection,
  themeColor = 'var(--accent-blue)', 
  title,
  singleTopicView = true,
  isAccentureActivities: _isAccentureActivities = false
}) {
  const [lightboxImg, setLightboxImg] = React.useState(null);
  const [lightboxZoom, setLightboxZoom] = React.useState(1);

  React.useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  const markdownComponents = {
    pre: (props) => <CodeBlockWithCopy {...props} />,
    h2: ({ children, ...props }) => {
      const rawText = React.Children.toArray(children)
        .map(c => (typeof c === 'string' ? c : (c?.props?.children || '')))
        .join('');
      const id = rawText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h2 
          id={id}
          style={{
            scrollMarginTop: '160px',
            marginTop: '2.8rem',
            marginBottom: '1.2rem',
            paddingBottom: '0.6rem',
            borderBottom: '2px solid rgba(59, 130, 246, 0.25)',
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--text-title)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            lineHeight: 1.3
          }}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const rawText = React.Children.toArray(children)
        .map(c => (typeof c === 'string' ? c : (c?.props?.children || '')))
        .join('');
      
      let id = '';
      if (/eac.*1/i.test(rawText) || /festa.*major/i.test(rawText) || /fiesta.*major/i.test(rawText)) {
        id = '2-6-3-eac1-festa-major';
      } else if (/flota/i.test(rawText) || /vehiculo/i.test(rawText)) {
        id = '2-6-2-flota-vehiculos';
      } else if (/bici/i.test(rawText)) {
        id = '2-6-1-bicicletas';
      } else {
        id = rawText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      const isEac = /eac/i.test(rawText) && !/alquiler.*bici/i.test(rawText);
      const isNumbered = /^[0-9]+(\.[0-9]+)+\s+/.test(rawText.trim());

      return (
        <h3 
          id={id}
          style={{
            scrollMarginTop: '160px',
            marginTop: '2.2rem',
            marginBottom: '1rem',
            fontSize: '1.18rem',
            fontWeight: 700,
            color: 'var(--text-title)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            lineHeight: 1.35,
            ...(isEac ? {
              color: '#ec4899', // Rosa fuxia
              borderLeft: '4px solid #ec4899',
              background: 'rgba(236, 72, 153, 0.06)',
              padding: '0.65rem 0.95rem',
              borderRadius: '8px'
            } : isNumbered ? {
              borderLeft: '4px solid var(--accent-blue, #3b82f6)',
              paddingLeft: '0.85rem',
              marginLeft: '1.2rem',
              background: 'rgba(59, 130, 246, 0.04)',
              paddingTop: '0.45rem',
              paddingBottom: '0.45rem',
              borderRadius: '0 8px 8px 0'
            } : {})
          }}
          {...props}
        >
          <span>{children}</span>
          {isEac && (
            <span 
              style={{ 
                fontSize: '0.72rem', 
                fontWeight: 800, 
                background: '#ec4899', 
                color: '#ffffff', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '999px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              Susceptible PAF / EAC
            </span>
          )}
        </h3>
      );
    },
    table: ({ children, ...props }) => (
      <div style={{ overflowX: 'auto', margin: '1.2rem 0', borderRadius: '8px', border: '1px solid var(--border-color, rgba(255,255,255,0.1))' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }} {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th style={{ padding: '0.55rem 0.8rem', background: 'var(--bg-card-header, rgba(255,255,255,0.05))', fontWeight: 700, borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.1))', textAlign: 'left' }} {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td style={{ padding: '0.45rem 0.8rem', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.05))' }} {...props}>
        {children}
      </td>
    ),
    p: ({ children, ...props }) => (
      <div style={{ margin: '0.85rem 0', lineHeight: '1.7', color: 'var(--text-main)' }} {...props}>
        {children}
      </div>
    ),
    h4: ({ children, ...props }) => (
      <h4 style={{ 
        marginTop: '1.8rem', 
        marginBottom: '0.8rem', 
        fontSize: '1.05rem', 
        fontWeight: 700, 
        color: 'var(--text-title)',
        lineHeight: 1.4,
        display: 'block'
      }} {...props}>
        {children}
      </h4>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        style={{
          borderLeft: '4px solid var(--accent-purple, #8b5cf6)',
          background: 'var(--bg-input, rgba(139, 92, 246, 0.05))',
          margin: '1.4rem 0',
          padding: '0.95rem 1.4rem',
          borderRadius: '0 8px 8px 0',
          fontStyle: 'italic',
          color: 'var(--text-title, #0f172a)',
          fontWeight: 500,
          lineHeight: '1.65'
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),
    a: ({ href, children, ...props }) => {
      const RESTRICTED_EMBED_IDS = new Set(['jzPhDD-aeF8', '_AgW-rLgFWw']);

      const getYouTubeEmbedInfo = (url) => {
        if (!url || typeof url !== 'string') return null;
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w-]{11})/i);
        if (!ytMatch) return null;
        const videoId = ytMatch[1];
        let startSeconds = 0;
        const tMatch = url.match(/[?&]t=(\d+)s?/i);
        if (tMatch) startSeconds = parseInt(tMatch[1], 10);
        return {
          videoId,
          embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0${startSeconds ? `&start=${startSeconds}` : ''}`,
          startSeconds,
          isRestricted: RESTRICTED_EMBED_IDS.has(videoId)
        };
      };

      const ytInfo = getYouTubeEmbedInfo(href);
      const childText = React.Children.toArray(children)
        .map(c => (typeof c === 'string' ? c : (c?.props?.children || '')))
        .join('');

      // Si es un enlace de YouTube:
      if (ytInfo) {
        const isTimestamp = /^\s*\[?\d{1,2}:\d{2}(?::\d{2})?\]?/.test(childText) || 
                            /^\s*minuto\s+\d+/i.test(childText);

        // Si es una marca de tiempo específica dentro de una lista:
        if (isTimestamp) {
          return (
            <a 
              href={href} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                margin: '0.15rem 0.25rem 0.15rem 0',
                transition: 'all 0.15s ease'
              }}
              title={`Reproducir en YouTube: ${childText}`}
              {...props}
            >
              <span>⏱️</span>
              <span>{children}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>↗</span>
            </a>
          );
        }

        // Si es el enlace principal del vídeo:
        const titleDisplay = childText && !childText.startsWith('http') 
          ? childText 
          : 'Vídeo Tutorial UPM / Accenture';

        // Si el propietario del vídeo ha desactivado la inserción en webs externas:
        if (ytInfo.isRestricted) {
          return (
            <LessonVideoPlayer 
              src={LOCAL_VIDEO_MAP[ytInfo.videoId]} 
              title={titleDisplay} 
              ytHref={href} 
              videoId={ytInfo.videoId} 
            />
          );
        }

        // Si el vídeo sí permite inserción: EMBEBER EL REPRODUCTOR
        return (
          <div style={{
            margin: '1.6rem 0',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            background: 'var(--bg-card, #131b2e)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            width: '100%',
            maxWidth: '100%',
            clear: 'both',
            display: 'block'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
              background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.18) 0%, rgba(220, 38, 38, 0.06) 100%)',
              borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.86rem', fontWeight: 700, color: '#f87171' }}>
                <span style={{ fontSize: '1.15rem' }}>🔴</span>
                <span>{titleDisplay}</span>
              </div>
              <a 
                href={href} 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-muted)', 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.3rem',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))'
                }}
              >
                <span>Abrir en YouTube</span> <span>↗</span>
              </a>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000000' }}>
              <iframe
                src={ytInfo.embedUrl}
                title={titleDisplay}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
              />
            </div>
          </div>
        );
      }

      const isVideoFile = href && typeof href === 'string' && (href.endsWith('.mp4') || href.endsWith('.webm') || href.endsWith('.m4v'));
      if (isVideoFile) {
        return <LessonVideoPlayer src={href} title={childText || 'Vídeo de la lección'} />;
      }

      const isAudioFile = href && typeof href === 'string' && (href.endsWith('.mp3') || href.endsWith('.wav') || href.endsWith('.m4a') || href.endsWith('.ogg'));
      if (isAudioFile) {
        let cleanAudioSrc = href;
        if (cleanAudioSrc.includes('/public/')) {
          cleanAudioSrc = cleanAudioSrc.split('/public')[1];
        }
        return (
          <div style={{
            margin: '1.4rem 0',
            padding: '1.1rem 1.4rem',
            background: 'var(--bg-card, #131b2e)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-title)' }}>
              <span style={{ fontSize: '1.25rem' }}>🎙️</span>
              <span>{childText || 'Audio Explicativo · Arquitectura de 3 Capas'}</span>
            </div>
            <audio controls src={cleanAudioSrc} preload="metadata" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        );
      }

      return (
        <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined} {...props}>
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => {
      let cleanSrc = src || '';
      if (cleanSrc.startsWith('../../img/')) {
        cleanSrc = cleanSrc.replace('../../img/', '/img/');
      } else if (cleanSrc.startsWith('../img/')) {
        cleanSrc = cleanSrc.replace('../img/', '/img/');
      } else if (cleanSrc.startsWith('img/')) {
        cleanSrc = '/' + cleanSrc;
      }
      if (cleanSrc === '/img/video2.png') {
        cleanSrc = '/img/modulo0/video2.png';
      }

      // Mejora automática de diagramas raster a gráficos vectoriales SVG ultra nítidos
      if (cleanSrc.includes('/modulo0/maven_lombok_herramientas.png')) {
        cleanSrc = '/img/modulo0/maven_lombok_herramientas.svg';
      } else if (cleanSrc.includes('/modulo0/arquitectura_capas_spring_jakarta.png')) {
        cleanSrc = '/img/modulo0/arquitectura_capas_spring_jakarta.svg';
      } else if (cleanSrc.includes('/modulo0/evolucion_jakarta_ee.png')) {
        cleanSrc = '/img/modulo0/evolucion_jakarta_ee.svg';
      }

      const isSvg = cleanSrc.endsWith('.svg');

      return (
        <figure className="lesson-figure" style={{ margin: '2.2rem 0', width: '100%' }}>
          <div 
            style={{ 
              position: 'relative', 
              borderRadius: '12px', 
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.15))',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              cursor: 'zoom-in',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
            onClick={() => {
              setLightboxImg({ src: cleanSrc, alt: alt || 'Diagrama técnico' });
              setLightboxZoom(1.2);
            }}
            title="Haz clic para ampliar en pantalla completa y leer cómodamente"
          >
            <img 
              className="lesson-image"
              src={cleanSrc} 
              alt={alt || 'Diagrama técnico'} 
              loading="lazy"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                background: '#ffffff',
                border: 'none',
                boxShadow: 'none'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                if (parent && !parent.querySelector('.img-pending-badge')) {
                  const badge = document.createElement('div');
                  badge.className = 'img-pending-badge';
                  badge.style.cssText = 'padding: 0.8rem 1rem; border-radius: 8px; border: 1px dashed var(--border-subtle); background: var(--bg-card); font-size: 0.82rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.5rem;';
                  badge.innerHTML = `<span>🖼️</span> <span>[Diagrama técnico: ${alt || 'Esquema pendiente de imagen'}]</span>`;
                  parent.appendChild(badge);
                }
              }}
              {...props} 
            />
            {/* Barra inferior interactiva de zoom */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.45rem 1rem',
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: '0.78rem',
                fontWeight: 600,
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                userSelect: 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '0.95rem' }}>🔍</span>
                <span>Haz clic en la imagen para ampliar a pantalla completa</span>
              </span>
              <span style={{ 
                background: isSvg ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.15)',
                color: isSvg ? '#38bdf8' : '#ffffff',
                border: isSvg ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
                padding: '0.15rem 0.55rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.3px'
              }}>
                {isSvg ? 'Vector SVG HD' : 'Ampliar HD'}
              </span>
            </div>
          </div>
          {alt && (
            <figcaption className="lesson-figcaption" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.6rem', fontStyle: 'italic', textAlign: 'center' }}>
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }
  };

  // Renderizador del visor Lightbox para ampliar diagramas en pantalla completa
  const renderLightbox = () => {
    if (!lightboxImg) return null;

    const handleZoomIn = (e) => {
      e.stopPropagation();
      setLightboxZoom(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = (e) => {
      e.stopPropagation();
      setLightboxZoom(prev => Math.max(prev - 0.25, 0.6));
    };

    const handleResetZoom = (e) => {
      e.stopPropagation();
      setLightboxZoom(1);
    };

    return (
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          background: 'rgba(10, 15, 28, 0.94)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={() => setLightboxImg(null)}
      >
        {/* Barra superior de controles del visor */}
        <div 
          style={{
            width: '100%',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.98)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            gap: '1rem',
            zIndex: 2,
            boxSizing: 'border-box'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <span style={{ fontSize: '1.25rem' }}>🖼️</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lightboxImg.alt || 'Diagrama Técnico'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Haz clic en el diagrama para hacer zoom o arrastra para mover
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(255, 255, 255, 0.08)', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '0.15rem'
            }}>
              <button 
                onClick={handleZoomOut}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#ffffff', 
                  width: '32px', 
                  height: '32px', 
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px'
                }}
                title="Reducir zoom"
              >
                −
              </button>
              <button 
                onClick={handleResetZoom}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#93c5fd', 
                  padding: '0 0.5rem', 
                  height: '32px', 
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Restablecer zoom al 100%"
              >
                {Math.round(lightboxZoom * 100)}%
              </button>
              <button 
                onClick={handleZoomIn}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#ffffff', 
                  width: '32px', 
                  height: '32px', 
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px'
                }}
                title="Aumentar zoom"
              >
                +
              </button>
            </div>

            <a 
              href={lightboxImg.src} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
              title="Abrir imagen original directamente en una pestaña nueva"
            >
              <span>Abrir pestaña</span>
              <span>↗</span>
            </a>

            <button 
              onClick={() => setLightboxImg(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                background: '#ef4444',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
              }}
              title="Cerrar visor (Esc)"
            >
              <span>✕</span>
              <span>Cerrar</span>
            </button>
          </div>
        </div>

        {/* Contenedor con scroll para explorar la imagen en alta definición */}
        <div 
          style={{
            flex: 1,
            width: '100%',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem',
            boxSizing: 'border-box'
          }}
          onClick={() => setLightboxImg(null)}
        >
          <div 
            style={{
              transform: `scale(${lightboxZoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.15s ease-out',
              maxWidth: lightboxZoom <= 1 ? '92vw' : 'none',
              maxHeight: lightboxZoom <= 1 ? '82vh' : 'none',
              background: '#ffffff',
              borderRadius: '14px',
              padding: '1.2rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              cursor: lightboxZoom >= 1.5 ? 'zoom-out' : 'zoom-in'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxZoom(prev => prev >= 1.6 ? 1 : prev + 0.35);
            }}
          >
            <img 
              src={lightboxImg.src} 
              alt={lightboxImg.alt} 
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: lightboxZoom <= 1 ? '75vh' : 'none',
                width: lightboxZoom > 1 ? 'auto' : '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      </div>
    );
  };


  // Modo de lección individual (sin scroll masivo entre todas las actividades)
  if (singleTopicView) {
    const activeTopic = topics.find(t => t.slug === activeSlug) || topics[0];
    if (!activeTopic) return null;

    // Título optimizado para el H1 principal
    let displayTitle = activeTopic.title;
    if (activeTopic.title === 'Introducción a la Unidad' && activeTopic.moduleTitle) {
      displayTitle = activeTopic.moduleTitle;
    } else if (activeTopic.title === 'Introducción' && activeTopic.temaTitle) {
      const cleanTema = activeTopic.temaTitle.replace(/^Tema \d+:\s*/, '');
      displayTitle = activeTopic.topicNum ? `${activeTopic.topicNum} · Introducción: ${cleanTema}` : `Introducción: ${cleanTema}`;
    } else if (activeTopic.topicNum) {
      displayTitle = `${activeTopic.topicNum} · ${activeTopic.title}`;
    }

    // Depuración y limpieza para evitar duplicación entre el H1 de la página y el primer encabezado del Markdown
    let cleanedMd = activeTopic.contentMd ? activeTopic.contentMd.trim() : '';
    if (cleanedMd) {
      const lines = cleanedMd.split('\n');
      if (lines.length > 0) {
        const firstLine = lines[0].trim();
        if (/^#{1,4}\s+/.test(firstLine)) {
          const headingText = firstLine.replace(/^#{1,4}\s+/, '').replace(/[*_#]/g, '').trim().toLowerCase();
          const topicText = (activeTopic.title || '').replace(/[*_#]/g, '').trim().toLowerCase();
          
          const isRepeated = 
            headingText.includes(topicText) ||
            topicText.includes(headingText) ||
            headingText.startsWith('unidad') ||
            headingText.startsWith('bloque');

          if (isRepeated) {
            lines.shift();
            while (lines.length > 0 && lines[0].trim() === '') {
              lines.shift();
            }
            cleanedMd = lines.join('\n');
          }
        }
      }
    }

    return (
      <main 
        className="lesson-content" 
        style={{ 
          flex: 1, 
          minWidth: 0, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2.5rem 2rem',
          boxSizing: 'border-box'
        }}
      >
        <article style={{ width: '100%', maxWidth: '940px' }}>
          
          {/* Cabecera contextual moderna con Badges (sin cadenas repetitivas con barras) */}
          <header style={{ marginBottom: '1.8rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              flexWrap: 'wrap',
              marginBottom: '0.9rem'
            }}>
              {/* Badge Asignatura */}
              <span style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-subtle)', 
                color: 'var(--text-muted)',
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.78rem', 
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                {title}
              </span>

              {/* Badge Unidad */}
              {activeTopic.moduleShort && (
                <span style={{ 
                  background: `${themeColor}15`, 
                  border: `1px solid ${themeColor}35`, 
                  color: themeColor,
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '6px', 
                  fontSize: '0.78rem', 
                  fontWeight: 700 
                }}>
                  {activeTopic.moduleShort}
                </span>
              )}

              {/* Bloque temático */}
              {activeTopic.temaTitle && activeTopic.temaTitle !== 'Introducción' && (
                <span style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--text-muted)', 
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <span>{activeTopic.temaTitle}</span>
                </span>
              )}
            </div>

            {/* H1 Principal Único */}
            <h1 style={{ 
              fontSize: '2.2rem', 
              fontWeight: 800,
              color: 'var(--text-title)', 
              margin: '0 0 1rem', 
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              borderBottom: '2px solid var(--border-subtle)',
              paddingBottom: '1rem'
            }}>
              {displayTitle}
            </h1>
          </header>

          {/* Tarjeta de metadatos de entrega si la actividad tiene atributos */}
          {(activeTopic.proyecto || activeTopic.l2eUrl) && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              marginBottom: '2.2rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                  Accenture Bootcamp · Reto Práctico Oficial
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-title)', marginTop: '0.25rem' }}>
                  📦 Proyecto: <code style={{ color: 'var(--c-blue)', background: 'rgba(56,189,248,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{activeTopic.proyecto || 'taskmanager'}</code>
                  {activeTopic.category && (
                    <span style={{ marginLeft: '0.8rem', fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>
                      | Categoría: <strong>{activeTopic.category}</strong>
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                  ⏳ Cierre: {activeTopic.dueDate || '3 Nov 2026 (23:59)'}
                </span>
                {activeTopic.l2eUrl && (
                  <a 
                    href={activeTopic.l2eUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ 
                      background: 'var(--accent-purple, #8b5cf6)', 
                      color: '#fff', 
                      textDecoration: 'none', 
                      padding: '0.45rem 1rem', 
                      borderRadius: '6px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.4rem' 
                    }}
                  >
                    📤 Entregar en L2E ↗
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Reproductor de Podcast / Vídeo y Cuaderno de Notas si el tema lo incluye */}
          {(activeTopic.audioUrl || activeTopic.videoUrl || activeTopic.mediaList || activeTopic.podcastPrompt) && (
            <PodcastPlayerCard 
              audioUrl={activeTopic.audioUrl}
              videoUrl={activeTopic.videoUrl}
              mediaList={activeTopic.mediaList}
              title={activeTopic.podcastTitle || activeTopic.videoTitle || `Media: ${activeTopic.title}`}
              promptText={activeTopic.podcastPrompt}
              themeColor={themeColor}
            />
          )}

          {/* Cuerpo Markdown Limpio y Sin Encabezados Duplicados */}
          <div className="topic-body" style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1.02rem' }}>
            {cleanedMd ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {cleanedMd}
              </ReactMarkdown>
            ) : activeTopic.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: activeTopic.contentHtml }} />
            ) : null}
          </div>

          {/* Carpeta Archivadora de Ejemplos Prácticos (si el tema la define) */}
          {activeTopic.folderArchive && (
            <FolderArchiveTabs 
              tabs={activeTopic.folderArchive.tabs}
              activeTabId={activeSubSlug}
              onTabChange={(tabId) => {
                if (onSelectSubSection) onSelectSubSection(tabId);
              }}
              folderTitle={activeTopic.folderArchive.folderTitle}
              folderIcon={activeTopic.folderArchive.folderIcon}
              themeColor={themeColor}
              markdownComponents={markdownComponents}
            />
          )}

          {/* Infografía Interactiva en láminas WebP si el tema la incluye */}
          {activeTopic.infografia && (
            <InfografiaCarousel 
              infografia={activeTopic.infografia}
              themeColor={themeColor}
            />
          )}

          {/* Componente interactivo para desplegar soluciones de código y preguntas de reflexión (Data-Driven) */}
          {(activeTopic.solucionDoc || activeTopic.notebook) && (
            <ActivitySolutionsAccordion 
              solucionCodigo={activeTopic.solucionDoc}
              activeSlug={activeTopic.slug}
              actividadTitle={activeTopic.title}
              notebookData={activeTopic.notebook}
            />
          )}



        </article>
        {renderLightbox()}
      </main>
    );
  }

  // Modo scroll continuo (para materias que lo requieran como Entornos e IOC)
  return (
    <main 
      className="lesson-content" 
      style={{ 
        flex: 1, 
        minWidth: 0, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5rem 2rem', 
        boxSizing: 'border-box'
      }}
    >
      <div style={{ width: '100%', maxWidth: '960px' }}>
        {topics.map((topic, index) => {
          const isFirstInModule = index === 0 || topics[index-1].moduleTitle !== topic.moduleTitle;
          const isFirstInTema = index === 0 || topics[index-1].temaTitle !== topic.temaTitle;
          
          let temaNumber = '';
          if (topic.topicNum) {
             const parts = String(topic.topicNum).split('.');
             if (parts.length >= 1 && !isNaN(parts[0])) {
                 temaNumber = parts[0];
             }
          }

          // Limpiar título de tema para evitar duplicados "Tema X: Tema X: ..."
          let cleanTemaName = topic.temaTitle || '';
          if (/^Tema\s+\d+:\s*/i.test(cleanTemaName)) {
            cleanTemaName = cleanTemaName.replace(/^Tema\s+\d+:\s*/i, '');
          } else if (/^Bloque\s+\d+:\s*/i.test(cleanTemaName)) {
            cleanTemaName = cleanTemaName.replace(/^Bloque\s+\d+:\s*/i, '');
          }
          const temaLabel = temaNumber && cleanTemaName !== 'Introducción' 
            ? `Tema ${temaNumber}: ${cleanTemaName}` 
            : (cleanTemaName || 'Introducción');

          // Depuración del Markdown para evitar duplicación del título de la lección
          let cleanedMd = topic.contentMd ? topic.contentMd.trim() : '';
          if (cleanedMd) {
            const lines = cleanedMd.split('\n');
            if (lines.length > 0) {
              const firstLine = lines[0].trim();
              if (/^#{1,4}\s+/.test(firstLine)) {
                const headingText = firstLine.replace(/^#{1,4}\s+/, '').replace(/[*_#]/g, '').trim().toLowerCase();
                const topicText = (topic.title || '').replace(/[*_#]/g, '').trim().toLowerCase();
                
                const isRepeated = 
                  headingText.includes(topicText) ||
                  topicText.includes(headingText) ||
                  (topic.topicNum && headingText.startsWith(String(topic.topicNum).toLowerCase())) ||
                  headingText.startsWith('unidad') ||
                  headingText.startsWith('bloque') ||
                  headingText.startsWith('tema');

                if (isRepeated) {
                  lines.shift();
                  while (lines.length > 0 && lines[0].trim() === '') {
                    lines.shift();
                  }
                  cleanedMd = lines.join('\n');
                }
              }
            }
          }

          // Desanidar enlaces a vídeos embebidos que estén dentro de un encabezado #### para evitar que el texto quede flotando a la izquierda
          if (cleanedMd) {
            cleanedMd = cleanedMd.replace(/^#{1,6}\s*(🎬\s*V[ÍI]DEO\s*[\d\w\.\-]+)(?:\s*—|\s*[-–:])?\s*\[(.*?)\]\((https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\)]+)\)/gmi, '\n\n[$1 · $2]($3)\n\n');
          }

          const isUnitIntro = topic.isOverview || (topic.temaTitle === 'Introducción' && isFirstInModule);

          return (
            <React.Fragment key={topic.slug}>
              {/* Encabezado Principal de Unidad */}
              {isFirstInModule && topic.moduleTitle && (
                <>
                  {/* Anclajes canónicos para navegación por bloques/unidades (#bloque1, #u1, etc.) */}
                  {topic.moduleId && (
                    <span id={topic.moduleId} style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                  )}
                  {topic.moduleShort && (
                    <span id={topic.moduleShort.toLowerCase().replace(/\s+/g, '')} style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                  )}
                  {/* Alias semánticos universales bloque1/bloque2/bloque3 para materias IOC */}
                  {(topic.moduleId === 'u1' || (topic.moduleShort && topic.moduleShort.includes('1'))) && (
                    <span id="bloque1" style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                  )}
                  {(topic.moduleId === 'u2' || (topic.moduleShort && topic.moduleShort.includes('2'))) && (
                    <span id="bloque2" style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                  )}
                  {(topic.moduleId === 'u3' || (topic.moduleShort && topic.moduleShort.includes('3'))) && (
                    <span id="bloque3" style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                  )}
                  <header 
                    id={`module-${topic.slug}`} 
                    style={{ 
                      marginTop: index === 0 ? '0.5rem' : '5rem', 
                      marginBottom: '2.5rem',
                      paddingBottom: '1.2rem',
                      borderBottom: '3px solid var(--border-subtle)',
                      scrollMarginTop: '140px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                      <span style={{ 
                        background: 'var(--bg-card)', 
                        border: '1px solid var(--border-subtle)', 
                        color: 'var(--text-muted)',
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '6px', 
                        fontSize: '0.78rem', 
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        {title}
                      </span>
                      {topic.moduleShort && (
                        <span style={{ 
                          background: `${themeColor}15`, 
                          border: `1px solid ${themeColor}35`, 
                          color: themeColor, 
                          fontWeight: 700, 
                          fontSize: '0.78rem', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '6px'
                        }}>
                          {topic.moduleShort}
                        </span>
                      )}
                    </div>
                    <h1 style={{ 
                      fontSize: '2.2rem', 
                      fontWeight: 800, 
                      color: 'var(--text-title)', 
                      margin: 0, 
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em'
                    }}>
                      {topic.moduleTitle}
                    </h1>
                  </header>
                </>
              )}
              
              {/* Encabezado de Bloque / Tema */}
              {isFirstInTema && !isUnitIntro && topic.temaTitle && (() => {
                const cleanModule = (topic.moduleTitle || '').replace(/^(Bloque|Tema|Unidad)\s+\d+:\s*/i, '').trim().toLowerCase();
                const cleanTemaLower = cleanTemaName.trim().toLowerCase();
                return cleanTemaLower !== cleanModule && cleanTemaLower !== 'introducción' && cleanTemaLower !== 'orientación';
              })() && (
                <div 
                  id={`tema-content-${temaNumber}`} 
                  style={{ 
                    marginTop: isFirstInModule ? '1.5rem' : '3.8rem', 
                    marginBottom: '1.8rem',
                    paddingBottom: '0.6rem',
                    borderBottom: '2px solid var(--border-subtle)',
                    scrollMarginTop: '140px'
                  }}
                >
                  <h2 style={{ 
                    fontSize: '1.55rem', 
                    fontWeight: 700, 
                    color: 'var(--text-title)', 
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    {temaLabel}
                  </h2>
                </div>
              )}
              
              {/* Lección / Apartado Individual */}
              <section 
                id={topic.slug} 
                data-topic-id={topic.id}
                style={{ 
                  marginTop: '1.8rem', 
                  marginBottom: '2.8rem',
                  scrollMarginTop: '140px' 
                }}
              >
                {topic.id && topic.id !== topic.slug && (
                  <span id={topic.id} style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                )}
                <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h3 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1 }}>
                    <span 
                      className="lesson-topic-tag"
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        background: `${themeColor}15`, 
                        border: `1px solid ${themeColor}35`, 
                        color: themeColor, 
                        fontWeight: 700, 
                        fontSize: '0.85rem', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '6px',
                        letterSpacing: '0.2px'
                      }}
                    >
                      {topic.topicNum && !topic.isOverview ? `${topic.topicNum}. ${topic.title}` : topic.title}
                    </span>
                  </h3>
                </header>
                
                {/* Reproductor de Podcast / Vídeo y Cuaderno de Notas si el tema lo incluye */}
                {(topic.audioUrl || topic.videoUrl || topic.mediaList || topic.podcastPrompt) && (
                  <PodcastPlayerCard 
                    audioUrl={topic.audioUrl}
                    videoUrl={topic.videoUrl}
                    mediaList={topic.mediaList}
                    title={topic.podcastTitle || topic.videoTitle || `Media: ${topic.title}`}
                    promptText={topic.podcastPrompt}
                    themeColor={themeColor}
                  />
                )}

                <div 
                  className="topic-body" 
                  style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1.02rem' }}
                >
                  {cleanedMd ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {cleanedMd}
                    </ReactMarkdown>
                  ) : topic.contentHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: topic.contentHtml }} />
                  ) : null}
                </div>

                {/* Carpeta Archivadora de Ejemplos Prácticos (en modo continuo) */}
                {topic.folderArchive && (
                  <FolderArchiveTabs 
                    tabs={topic.folderArchive.tabs}
                    activeTabId={activeSubSlug}
                    onTabChange={(tabId) => {
                      if (onSelectSubSection) onSelectSubSection(tabId);
                    }}
                    folderTitle={topic.folderArchive.folderTitle}
                    folderIcon={topic.folderArchive.folderIcon}
                    themeColor={themeColor}
                    markdownComponents={markdownComponents}
                  />
                )}

                {/* Infografía Interactiva en láminas WebP en modo continuo */}
                {topic.infografia && (
                  <InfografiaCarousel 
                    infografia={topic.infografia}
                    themeColor={themeColor}
                  />
                )}
                
                {/* Separador sutil entre apartados */}
                <div style={{ 
                  height: '1px', 
                  background: 'var(--border-subtle)', 
                  margin: '2.5rem 0 1rem', 
                  opacity: 0.5 
                }} />

                {/* Divisor con icono al final de cada unidad */}
                {(index < topics.length - 1 && topics[index+1].moduleTitle !== topic.moduleTitle) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '4rem 0 3.5rem 0'
                  }}>
                    <div style={{ flex: 1, height: '2px', background: 'var(--border-subtle)' }} />
                    <div style={{ padding: '0 1.5rem', fontSize: '1.8rem', opacity: 0.85 }}>🚀</div>
                    <div style={{ flex: 1, height: '2px', background: 'var(--border-subtle)' }} />
                  </div>
                )}
              </section>
            </React.Fragment>
          );
        })}
      </div>
      {renderLightbox()}
    </main>
  );
}
