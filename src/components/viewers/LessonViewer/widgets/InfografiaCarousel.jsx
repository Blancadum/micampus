import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * @component   InfografiaCarousel
 * @description Visor interactivo de infografías en láminas WebP para lecciones
 *              teóricas. Incluye navegación secuencial, miniaturas, modo
 *              pantalla completa (Lightbox) y descarga del PDF original.
 * ============================================================================
 */
export default function InfografiaCarousel({ 
  infografia, 
  themeColor = 'var(--accent-blue, #0284c7)' 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = infografia?.totalSlides || 0;
  const prefix = infografia?.slidePrefix || 'Arquitectura_Web_en_Localhost_';
  const baseDir = infografia?.baseDir || '/infografia/Arquitectura_Web_en_Localhost_webp';

  const getSlideUrl = (index) => {
    const num = String(index + 1).padStart(5, '0');
    return `${baseDir}/${prefix}${num}.webp`;
  };

  const handlePrev = React.useCallback((e) => {
    if (e) e.stopPropagation();
    if (total <= 0) return;
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = React.useCallback((e) => {
    if (e) e.stopPropagation();
    if (total <= 0) return;
    setCurrentSlide(prev => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Atajos de teclado para navegación cuando el modal o visor está abierto
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handlePrev, handleNext]);

  if (!infografia || !infografia.totalSlides) return null;

  return (
    <section 
      className="infografia-carousel"
      style={{
        margin: '2.5rem 0',
        background: 'var(--bg-card, #ffffff)',
        border: '2px solid var(--border-subtle, #cbd5e1)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md, 0 4px 18px rgba(0,0,0,0.06))'
      }}
    >
      {/* Cabecera de la Infografía */}
      <div style={{
        padding: '1.2rem 1.6rem',
        background: 'var(--bg-subtle, #f8fafc)',
        borderBottom: '2px solid var(--border-subtle, #e2e8f0)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '1.4rem' }}>📊</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                background: themeColor,
                color: '#ffffff',
                padding: '0.15rem 0.55rem',
                borderRadius: '5px',
                fontSize: '0.74rem',
                fontWeight: 900,
                letterSpacing: '0.5px'
              }}>
                INFOGRAFÍA
              </span>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title, #0f172a)' }}>
                {infografia.title || 'Arquitectura Web en Localhost'}
              </h3>
            </div>
            {infografia.description && (
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)', fontWeight: 500 }}>
                {infografia.description}
              </p>
            )}
          </div>
        </div>

        {/* Acciones: Descargar PDF y Pantalla Completa */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {infografia.pdfUrl && (
            <a
              href={infografia.pdfUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                background: 'var(--bg-card, #ffffff)',
                border: '1.5px solid var(--border-subtle, #cbd5e1)',
                color: 'var(--text-main, #334155)',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span>📥</span>
              <span>Descargar PDF</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: themeColor,
              border: 'none',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <span>🔍</span>
            <span>Ampliar</span>
          </button>
        </div>
      </div>

      {/* Visor Principal de la Lámina */}
      <div 
        style={{
          position: 'relative',
          background: '#090d16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '440px',
          maxHeight: '620px',
          overflow: 'hidden'
        }}
      >
        <img 
          src={getSlideUrl(currentSlide)} 
          alt={`Lámina ${currentSlide + 1} de ${total}`}
          style={{
            maxWidth: '100%',
            maxHeight: '620px',
            objectFit: 'contain',
            display: 'block',
            cursor: 'zoom-in',
            transition: 'transform 0.2s ease'
          }}
          onClick={() => setIsFullscreen(true)}
        />

        {/* Flecha Anterior Flotante */}
        <button
          type="button"
          onClick={handlePrev}
          title="Lámina anterior (Flecha Izquierda)"
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.15s ease'
          }}
        >
          ‹
        </button>

        {/* Flecha Siguiente Flotante */}
        <button
          type="button"
          onClick={handleNext}
          title="Lámina siguiente (Flecha Derecha)"
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.15s ease'
          }}
        >
          ›
        </button>

        {/* Contador Flotante */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          padding: '0.25rem 0.7rem',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: 800,
          backdropFilter: 'blur(4px)'
        }}>
          Lámina {currentSlide + 1} / {total}
        </div>
      </div>

      {/* Tira Inferior de Miniaturas */}
      <div style={{
        padding: '0.8rem 1rem',
        background: 'var(--bg-subtle, #f8fafc)',
        borderTop: '1px solid var(--border-subtle, #e2e8f0)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        overflowX: 'auto',
        scrollbarWidth: 'thin'
      }}>
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            style={{
              flexShrink: 0,
              width: '64px',
              height: '42px',
              borderRadius: '6px',
              border: idx === currentSlide ? `2px solid ${themeColor}` : '2px solid transparent',
              opacity: idx === currentSlide ? 1 : 0.65,
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#090d16',
              transition: 'all 0.15s ease'
            }}
          >
            <img 
              src={getSlideUrl(idx)} 
              alt={`Miniatura ${idx + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {/* MODAL FULLSCREEN / LIGHTBOX */}
      {isFullscreen && (
        <div 
          onClick={() => setIsFullscreen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5, 8, 15, 0.92)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Barra superior de controles del Lightbox */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#ffffff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                {infografia.title || 'Arquitectura Web en Localhost'}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '5px', fontSize: '0.82rem', fontWeight: 800 }}>
                {currentSlide + 1} de {total}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '1.2rem',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              ✕ Cerrar
            </button>
          </div>

          {/* Imagen ampliada */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '85vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={getSlideUrl(currentSlide)} 
              alt={`Lámina ${currentSlide + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            />

            {/* Flechas de navegación en Fullscreen */}
            <button
              type="button"
              onClick={handlePrev}
              style={{
                position: 'fixed',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                fontSize: '2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                position: 'fixed',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                fontSize: '2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
