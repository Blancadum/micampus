import React from 'react';

/**
 * Sección 2: IntelliJ IDEA Community Edition (IDE Gratuito y configuración de Lombok).
 */
export default function IntelliJSection({
  os,
  copiedId,
  onCopy
}) {
  return (
    <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🧠</span> 2. IntelliJ IDEA Community Edition (IDE Gratuito)
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
          Recomendado para Spring & Java
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
        IntelliJ Community es el entorno de referencia para desarrollo Java: incluye integración nativa con Maven, autocompletado avanzado, inspecciones de código y soporte para ejecutar Spring Boot sin configuración adicional.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {os === 'macos' && (
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>Instalación vía Homebrew:</span>
              <button
                onClick={() => onCopy('mac-idea', 'brew install --cask intellij-idea-ce')}
                style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
              >
                {copiedId === 'mac-idea' ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <code style={{ fontSize: '0.82rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.5rem 0.75rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
              brew install --cask intellij-idea-ce
            </code>
          </div>
        )}

        {os === 'windows' && (
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>Descarga Oficial (.exe):</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.3rem 0 0.6rem' }}>
              Al instalar, selecciona: <em>Create Desktop Shortcut</em>, <em>Update PATH</em> y asociar archivos <em>.java</em>.
            </p>
            <a href="https://www.jetbrains.com/idea/download/#section=windows" target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
              🌐 Descargar IntelliJ Community para Windows ↗
            </a>
          </div>
        )}

        {os === 'linux' && (
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>Instalación vía Snap:</span>
              <button
                onClick={() => onCopy('linux-idea', 'sudo snap install intellij-idea-community --classic')}
                style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
              >
                {copiedId === 'linux-idea' ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <code style={{ fontSize: '0.82rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.5rem 0.75rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
              sudo snap install intellij-idea-community --classic
            </code>
          </div>
        )}

        <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>Configuración Indispensable:</span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '0.3rem 0 0', lineHeight: '1.5' }}>
            En IntelliJ ve a: <strong>Settings → Build, Execution, Deployment → Compiler → Annotation Processors</strong> y activa la casilla <strong>Enable annotation processing</strong> (necesario para Lombok).
          </p>
        </div>
      </div>
    </section>
  );
}
