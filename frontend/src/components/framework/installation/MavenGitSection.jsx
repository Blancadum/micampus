import React from 'react';

/**
 * Sección 3 y 4: Apache Maven (Gestor de Construcción) y Git (Control de Versiones).
 */
export default function MavenGitSection({
  os,
  copiedId,
  onCopy
}) {
  const mavenCommand = os === 'macos' ? 'brew install maven' : (os === 'windows' ? 'choco install maven -y' : 'sudo apt install maven -y');

  return (
    <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {/* MAVEN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📦</span> 3. Apache Maven (Gestor de Construcción)
        </h3>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Spring Boot incluye el <strong>Maven Wrapper</strong> (<code>./mvnw</code> o <code>mvnw.cmd</code>), por lo que <em>no es obligatorio</em> instalar Maven global. Para instalar la CLI global:
        </p>
        <div style={{ background: 'var(--bg-input, #0f172a)', borderRadius: '10px', padding: '0.8rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Comando ({os}):</span>
            <button
              onClick={() => onCopy('maven-cmd', mavenCommand)}
              style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
            >
              {copiedId === 'maven-cmd' ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
          <code style={{ fontSize: '0.82rem', color: '#38bdf8', fontFamily: 'monospace' }}>
            {mavenCommand}
          </code>
        </div>
      </div>

      {/* GIT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🐙</span> 4. Git & Configuración Inicial
        </h3>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Indispensable para el control de versiones y entregas de ramas en GitHub / GitLab:
        </p>
        <div style={{ background: 'var(--bg-input, #0f172a)', borderRadius: '10px', padding: '0.8rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Configurar firma global:</span>
            <button
              onClick={() => onCopy('git-cfg', 'git config --global user.name "Tu Nombre"\ngit config --global user.email "tu@email.com"\ngit config --global init.defaultBranch main')}
              style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
            >
              {copiedId === 'git-cfg' ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: '1.4' }}>
{`git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"`}
          </pre>
        </div>
      </div>
    </section>
  );
}
