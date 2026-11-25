import React from 'react';

const OS_OPTIONS = [
  { id: 'macos', label: 'macOS (Apple Silicon & Intel)', icon: '🍎' },
  { id: 'windows', label: 'Windows (10 / 11)', icon: '🪟' },
  { id: 'linux', label: 'Linux (Ubuntu / Debian / Fedora)', icon: '🐧' }
];

/**
 * Cabecera del manual de instalación con selector de sistema operativo y botón de descarga .md.
 */
export default function InstallationHeader({
  os,
  onSelectOs
}) {
  return (
    <div 
      style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '20px', 
        padding: '1.8rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <span>🛠️</span> Manual Oficial de Entorno Local
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-title)' }}>
            Instalación de Java, IntelliJ IDEA y Herramientas Spring Boot
          </h2>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Elige tu sistema operativo para ver comandos adaptados y atajos directos listos para copiar con un clic.
          </p>
        </div>

        <a
          href="/springboot/documentacion/guia-instalacion-java-spring-boot.md"
          download="guia-instalacion-java-spring-boot.md"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.15rem',
            borderRadius: '10px',
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-title)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
          title="Descargar versión completa en Markdown (.md)"
        >
          <span>📥</span> Descargar Markdown (.md)
        </a>
      </div>

      {/* SELECTOR DE SISTEMA OPERATIVO */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>
          Tu Sistema:
        </span>

        {OS_OPTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectOs(item.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '12px',
              border: os === item.id ? '2px solid #10b981' : '1px solid var(--border-subtle)',
              background: os === item.id ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-card)',
              color: os === item.id ? '#10b981' : 'var(--text-main)',
              fontWeight: os === item.id ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: os === item.id ? '0 2px 8px rgba(16, 185, 129, 0.2)' : 'none'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
