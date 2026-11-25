import React from 'react';

const CHUNK_RELOAD_KEY = 'micampus_chunk_reload_at';

function isChunkLoadError(error) {
  const msg = String(error?.message || error || '');
  return /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk/i.test(msg);
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '', isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    const chunkErr = isChunkLoadError(error);
    return {
      hasError: true,
      isChunkError: chunkErr,
      message: chunkErr
        ? 'Se ha actualizado la aplicación o se perdió la conexión al cargar este módulo. Recarga la página para obtener la última versión.'
        : (error?.message || 'Se produjo un error inesperado en la interfaz.')
    };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary capturó un fallo:', error, info);
    if (isChunkLoadError(error)) {
      try {
        const lastReload = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
        if (Date.now() - lastReload > 10_000) {
          sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
          window.location.reload();
        }
      } catch {
        // Ignorar si sessionStorage no está disponible
      }
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'var(--bg-page, #f1f5f9)'
      }}>
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          borderRadius: '18px',
          padding: '1.75rem',
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.1)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h2 style={{ margin: '0 0 0.5rem', color: 'var(--text-title, #0f172a)', fontSize: '1.25rem' }}>
            Algo ha fallado en esta vista
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted, #64748b)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            {this.state.message}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '0.55rem 1.05rem',
                borderRadius: '10px',
                border: 'none',
                background: '#16a34a',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🔄 Recargar página
            </button>
            <button
              type="button"
              onClick={() => { window.location.href = '/'; }}
              style={{
                padding: '0.55rem 1.05rem',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle, #cbd5e1)',
                background: 'var(--bg-subtle, #f8fafc)',
                color: 'var(--text-title, #0f172a)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🏠 Ir al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }
}
