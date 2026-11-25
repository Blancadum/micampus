import React from 'react';

/**
 * Sección 1: Instalación de Java Development Kit (JDK 17 / 21 LTS) según el sistema operativo.
 */
export default function JavaJdkSection({
  os,
  copiedId,
  onCopy
}) {
  return (
    <>
      {/* REQUISITO CRÍTICO JAVA 17+ */}
      <div style={{ padding: '1rem 1.25rem', borderRadius: '14px', background: 'rgba(234, 88, 12, 0.08)', border: '1px solid rgba(234, 88, 12, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.4rem' }}>⚠️</span>
        <div style={{ fontSize: '0.88rem', lineHeight: '1.5', color: 'var(--text-main)' }}>
          <strong style={{ color: '#ea580c' }}>Requisito de Spring Boot 3.x:</strong> Requiere obligatoriamente <strong>Java 17 LTS o 21 LTS</strong>. Versiones anteriores (Java 8 u 11) lanzarán el error <code>UnsupportedClassVersionError (class file version 61.0)</code>.
        </div>
      </div>

      <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>☕</span> 1. Instalación de Java Development Kit (JDK 17 / 21 LTS)
          </h3>
          <span style={{ fontSize: '0.8rem', background: 'var(--bg-hover)', padding: '0.25rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
            Recomendado: Eclipse Temurin (Adoptium)
          </span>
        </div>

        {os === 'macos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              En macOS, la vía más limpia y profesional es mediante <strong>Homebrew</strong> o el gestor <strong>SDKMAN!</strong>:
            </p>

            <div style={{ background: 'var(--bg-input, #0f172a)', borderRadius: '12px', padding: '1rem 1.2rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Terminal (Zsh) · Homebrew:</span>
                <button
                  onClick={() => onCopy('mac-brew', 'brew install openjdk@17\nsudo ln -sfn $(brew --prefix)/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk')}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  {copiedId === 'mac-brew' ? '✓ ¡Copiado!' : '📋 Copiar comandos'}
                </button>
              </div>
              <pre style={{ margin: 0, color: '#38bdf8', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: '1.5' }}>
{`# 1. Instalar OpenJDK 17 LTS
brew install openjdk@17

# 2. Symlink para que el sistema reconozca la JVM
sudo ln -sfn $(brew --prefix)/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk`}
              </pre>
            </div>

            <div style={{ background: 'var(--bg-input, #0f172a)', borderRadius: '12px', padding: '1rem 1.2rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Configurar JAVA_HOME en ~/.zshrc:</span>
                <button
                  onClick={() => onCopy('mac-zsh', 'echo \'export JAVA_HOME=$(/usr/libexec/java_home -v 17)\' >> ~/.zshrc\necho \'export PATH=$JAVA_HOME/bin:$PATH\' >> ~/.zshrc\nsource ~/.zshrc')}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  {copiedId === 'mac-zsh' ? '✓ ¡Copiado!' : '📋 Copiar configuración'}
                </button>
              </div>
              <pre style={{ margin: 0, color: '#10b981', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: '1.5' }}>
{`echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc`}
              </pre>
            </div>
          </div>
        )}

        {os === 'windows' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              En Windows puedes utilizar el instalador gráfico o comandos de gestores de paquetes en PowerShell:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', color: 'var(--text-title)' }}>Opción 1: Instalador Gráfico (.msi)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
                  Descarga desde Adoptium y marca las casillas <strong>Set JAVA_HOME</strong> y <strong>Add to PATH</strong>.
                </p>
                <a href="https://adoptium.net/" target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
                  🌐 Descargar Temurin 17 (.msi) ↗
                </a>
              </div>

              <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-title)' }}>Opción 2: Winget / Choco</h4>
                  <button
                    onClick={() => onCopy('win-winget', 'winget install EclipseAdoptium.Temurin.17.JDK')}
                    style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {copiedId === 'win-winget' ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
                <code style={{ fontSize: '0.8rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.4rem 0.6rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
                  winget install EclipseAdoptium.Temurin.17.JDK
                </code>
              </div>
            </div>
          </div>
        )}

        {os === 'linux' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Ejecuta en tu terminal según tu distribución:
            </p>

            <div style={{ background: 'var(--bg-input, #0f172a)', borderRadius: '12px', padding: '1rem 1.2rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Ubuntu / Debian / Mint:</span>
                <button
                  onClick={() => onCopy('linux-apt', 'sudo apt update && sudo apt install openjdk-17-jdk -y\necho "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64" >> ~/.bashrc\nsource ~/.bashrc')}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  {copiedId === 'linux-apt' ? '✓ ¡Copiado!' : '📋 Copiar comandos'}
                </button>
              </div>
              <pre style={{ margin: 0, color: '#38bdf8', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: '1.5' }}>
{`sudo apt update && sudo apt install openjdk-17-jdk -y
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc`}
              </pre>
            </div>
          </div>
        )}

        {/* VERIFICACIÓN TERMINAL */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
              🔍 Comando de Verificación (ejecutar en terminal nueva):
            </span>
            <button
              onClick={() => onCopy('verify-java', os === 'windows' ? 'java -version && javac -version && echo %JAVA_HOME%' : 'java -version && javac -version && echo $JAVA_HOME')}
              style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
            >
              {copiedId === 'verify-java' ? '✓ Copiado' : '📋 Copiar verificación'}
            </button>
          </div>
          <code style={{ fontSize: '0.85rem', background: 'var(--bg-input, #0f172a)', color: '#a7f3d0', padding: '0.6rem 0.9rem', borderRadius: '8px', display: 'block', overflowX: 'auto', fontFamily: 'monospace' }}>
            {os === 'windows' ? 'java -version && javac -version && echo %JAVA_HOME%' : 'java -version && javac -version && echo $JAVA_HOME'}
          </code>
        </div>
      </section>
    </>
  );
}
