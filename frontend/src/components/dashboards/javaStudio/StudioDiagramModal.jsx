import React, { useEffect } from 'react';

export default function StudioDiagramModal({
  diagrams = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
  accentColor = '#6d28d9'
}) {
  const currentDiagram = diagrams[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (onPrev) onPrev();
      } else if (e.key === 'ArrowRight') {
        if (onNext) onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentDiagram) return null;

  const total = diagrams.length;
  const hasMultiple = total > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          maxWidth: '94vw',
          maxHeight: '92vh',
          width: '1050px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden'
        }}
      >
        {/* CABECERA DEL MODAL */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: accentColor,
                  color: '#ffffff'
                }}
              >
                {currentDiagram.etiqueta || 'Diagrama'}
              </span>
              {hasMultiple && (
                <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, background: '#e2e8f0', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {currentIndex + 1} de {total}
                </span>
              )}
              <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                Navega con teclas [←] y [→]
              </span>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#0f172a',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentDiagram.titulo}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a
              href={currentDiagram.src}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            >
              Abrir Original ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '6px',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              title="Cerrar (Esc)"
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* CUERPO DEL MODAL CON FONDO BLANCO Y FLECHAS DE NAVEGACIÓN */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            overflow: 'auto',
            padding: '1.5rem',
            background: '#ffffff', // Fondo blanco puro para imágenes recortadas
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px'
          }}
        >
          {/* FLECHA IZQUIERDA FLOTANTE */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Imagen anterior"
              title="Anterior (tecla flecha izquierda [←])"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: '#1e293b',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accentColor;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#1e293b';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ‹
            </button>
          )}

          {/* IMAGEN SOBRE FONDO BLANCO PURO */}
          <img
            key={currentDiagram.src}
            src={currentDiagram.src}
            alt={currentDiagram.titulo}
            style={{
              maxWidth: '100%',
              maxHeight: '66vh',
              objectFit: 'contain',
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
            }}
          />

          {/* FLECHA DERECHA FLOTANTE */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Siguiente imagen"
              title="Siguiente (tecla flecha derecha [→])"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: '#1e293b',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accentColor;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#1e293b';
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* PIE DEL MODAL CON EXPLICACIÓN Y CONTROLES */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderTop: '1px solid #e2e8f0',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, flex: 1 }}>
            {currentDiagram.subtitulo}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  className="studio-btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="studio-btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                >
                  Siguiente →
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="studio-btn-primary"
              style={{
                fontSize: '0.8rem',
                padding: '0.4rem 0.9rem',
                flexShrink: 0,
                background: accentColor,
                borderColor: accentColor
              }}
            >
              Cerrar [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
