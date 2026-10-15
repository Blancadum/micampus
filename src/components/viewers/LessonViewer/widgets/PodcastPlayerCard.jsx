import React, { useState, useRef, useEffect, useMemo } from 'react';

/**
 * Reproductor Multimedia versátil para Podcasts (Audio) y Vídeo-Lecciones.
 * Detecta automáticamente si el archivo es vídeo (.mp4, .webm, .mov) o audio (.mp3, .m4a, .wav).
 * Soporta selector de pestaña si el tema incluye tanto vídeo como podcast.
 */
export default function PodcastPlayerCard({ 
  audioUrl = '',
  podcastUrl = '',
  videoUrl = '',
  mediaList = [],
  title = '',
  podcastTitle = '',
  videoTitle = '',
  duration = '',
  notes = null,
  promptText = '',
  themeColor = 'var(--accent-blue, #2563eb)'
}) {
  const isVideoFormat = (url) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url || '');

  const effAudioUrl = audioUrl || podcastUrl;
  const effTitle = title || podcastTitle || videoTitle;
  const effPrompt = promptText || notes;
  const iconBg = (themeColor && themeColor.startsWith('#')) ? `${themeColor}20` : 'rgba(37, 99, 235, 0.15)';

  // Generar lista de medios unificada
  const items = useMemo(() => {
    if (mediaList && mediaList.length > 0) return mediaList;
    const list = [];
    if (videoUrl) {
      list.push({
        type: 'video',
        url: videoUrl,
        title: videoTitle || effTitle || 'Vídeo Lección'
      });
    }
    if (effAudioUrl) {
      const isVid = isVideoFormat(effAudioUrl);
      list.push({
        type: isVid ? 'video' : 'audio',
        url: effAudioUrl,
        title: podcastTitle || effTitle || (isVid ? 'Vídeo Lección' : 'Podcast de Audio')
      });
    }
    return list;
  }, [mediaList, videoUrl, effAudioUrl, effTitle, videoTitle, podcastTitle]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = items[activeIndex] || items[0] || null;

  const [copied, setCopied] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(effPrompt || '');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    setCustomPrompt(effPrompt || '');
  }, [effPrompt]);

  useEffect(() => {
    setHasError(false);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackRate;
    }
  }, [activeIndex, activeMedia]);

  const handleCopy = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const textToCopy = customPrompt || effPrompt;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  if (!activeMedia && !effPrompt) return null;

  const isCurrentVideo = activeMedia && (activeMedia.type === 'video' || (activeMedia.type !== 'audio' && isVideoFormat(activeMedia.url)));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      margin: '1.8rem 0 2.2rem 0'
    }}>
      {/* 1. Tarjeta Reproductora de Podcast / Vídeo */}
      {activeMedia && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decoración lateral de color */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: themeColor
          }} />

          {/* Cabecera con selector de medios si hay más de 1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: iconBg,
                color: themeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}>
                {isCurrentVideo ? '🎬' : '🎙️'}
              </div>
              <div>
                <div style={{
                  fontSize: '0.74rem',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: themeColor,
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <span>{isCurrentVideo ? 'Vídeo Lección' : 'Podcast de Audio'}</span>
                  <span style={{ color: 'var(--text-dim)' }}>•</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Contenido Multimedia</span>
                </div>
                <h4 style={{
                  margin: '0.2rem 0 0',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--text-title)'
                }}>
                  {activeMedia.title || title || 'Reproducción del tema'}
                </h4>
              </div>
            </div>

            {/* Pestañas de cambio si hay varios medios (ej: Vídeo vs Audio) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              {items.length > 1 && (
                <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  {items.map((item, idx) => {
                    const isVid = item.type === 'video' || isVideoFormat(item.url);
                    const isSel = idx === activeIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        style={{
                          background: isSel ? themeColor : 'none',
                          color: isSel ? '#fff' : 'var(--text-muted)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.25rem 0.6rem',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{isVid ? '🎬 Vídeo' : '🎙️ Audio'}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selector de velocidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginRight: '0.1rem' }}>Velocidad:</span>
                {[1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleSpeedChange(rate)}
                    style={{
                      background: playbackRate === rate ? themeColor : 'var(--bg-input)',
                      color: playbackRate === rate ? '#fff' : 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.2rem 0.45rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reproductor de Vídeo o Audio */}
          {isCurrentVideo ? (
            <div style={{ position: 'relative', width: '100%', borderRadius: '10px', overflow: 'hidden', background: '#000', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
              <video
                ref={mediaRef}
                controls
                src={activeMedia.url}
                onError={() => setHasError(true)}
                onLoadedData={() => setHasError(false)}
                style={{
                  width: '100%',
                  maxHeight: '460px',
                  display: 'block',
                  outline: 'none'
                }}
              />
            </div>
          ) : (
            <audio
              ref={mediaRef}
              controls
              src={activeMedia.url}
              onError={() => setHasError(true)}
              onLoadedData={() => setHasError(false)}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          )}

          {hasError ? (
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-input)',
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              border: '1px dashed var(--border-subtle)'
            }}>
              <span>💡</span>
              <span>
                Archivo no disponible en <code style={{ color: themeColor, fontWeight: 600 }}>{activeMedia.url}</code>.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              <span>📍 <code>{activeMedia.url}</code></span>
              <a
                href={activeMedia.url}
                target="_blank"
                rel="noreferrer"
                download
                style={{ color: themeColor, textDecoration: 'none', fontWeight: 600 }}
              >
                Descargar archivo ↗
              </a>
            </div>
          )}
        </div>
      )}

      {/* 2. Hoja de Cuaderno de Notas (Post-it / Libreta en Amarillo Pastel) */}
      {effPrompt && (
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #fef9c3 0%, #fef08a 100%)',
          color: '#713f12',
          border: '1px solid #fde047',
          borderRadius: '12px',
          padding: isPromptExpanded ? '1.4rem 1.6rem 1.4rem 1.8rem' : '0.85rem 1.25rem',
          boxShadow: '0 4px 14px rgba(234, 179, 8, 0.18), 0 2px 5px rgba(0,0,0,0.06)',
          transform: 'rotate(-0.3deg)',
          transition: 'all 0.25s ease'
        }}>
          {/* Cinta adhesiva decorativa */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%) rotate(1deg)',
            width: '90px',
            height: '22px',
            background: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(253, 224, 71, 0.4)',
            borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            pointerEvents: 'none'
          }} />

          {/* Cabecera interactiva para desplegar / plegar */}
          <div 
            onClick={() => setIsPromptExpanded(!isPromptExpanded)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: isPromptExpanded ? '1px dashed rgba(161, 98, 7, 0.35)' : 'none',
              paddingBottom: isPromptExpanded ? '0.65rem' : '0',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 800,
              fontSize: '0.88rem',
              color: '#854d0e',
              letterSpacing: '0.2px'
            }}>
              <span>📝</span>
              <span>Pauta & Prompt del Podcast</span>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#a16207',
                background: 'rgba(254, 240, 138, 0.9)',
                padding: '0.15rem 0.55rem',
                borderRadius: '12px',
                border: '1px solid rgba(202, 138, 4, 0.3)'
              }}>
                {isPromptExpanded ? '▲ Plegar' : '▼ Desplegar para afinar / ver'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  background: copied ? '#15803d' : '#854d0e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.28rem 0.65rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s ease'
                }}
                title="Copiar prompt para usarlo en NotebookLM o ChatGPT"
              >
                {copied ? '✓ Copiado' : '📋 Copiar prompt'}
              </button>
            </div>
          </div>

          {/* Contenido desplegable con opción de afinar */}
          {isPromptExpanded && (
            <div style={{ marginTop: '0.85rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
                fontSize: '0.78rem',
                color: '#a16207',
                fontWeight: 600
              }}>
                <span>💡 Puedes afinar o personalizar el prompt directamente aquí antes de copiarlo:</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingPrompt(!isEditingPrompt);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(161, 98, 7, 0.4)',
                    color: '#854d0e',
                    borderRadius: '4px',
                    padding: '0.15rem 0.45rem',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {isEditingPrompt ? '👁️ Vista lectura' : '✏️ Editar / Afinar'}
                </button>
              </div>

              {isEditingPrompt ? (
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  rows={8}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid #eab308',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    fontSize: '0.88rem',
                    color: '#713f12',
                    fontFamily: 'inherit',
                    lineHeight: '1.6',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <div style={{
                  fontSize: '0.88rem',
                  lineHeight: '1.65',
                  color: '#713f12',
                  fontWeight: 500,
                  whiteSpace: 'pre-wrap',
                  background: 'rgba(255, 255, 255, 0.35)',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(234, 179, 8, 0.25)'
                }}>
                  {customPrompt || effPrompt}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
