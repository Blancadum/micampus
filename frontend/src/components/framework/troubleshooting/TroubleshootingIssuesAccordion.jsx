import React from 'react';

/**
 * Acordeón con los 5 problemas más comunes de Spring Boot y sus soluciones rápidas.
 */
export default function TroubleshootingIssuesAccordion({
  openIssue,
  onToggleIssue,
  copiedId,
  onCopy
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* 1. PUERTO 8080 OCUPADO */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
        <button
          onClick={() => onToggleIssue('port8080')}
          style={{ width: '100%', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🚫</span>
            <div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-title)' }}>
                Error: "Port 8080 is already in use"
              </strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                El puerto por defecto de Tomcat está tomado por otro proceso
              </span>
            </div>
          </div>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', transform: openIssue.port8080 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openIssue.port8080 && (
          <div style={{ padding: '0 1.4rem 1.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Esto ocurre cuando otra aplicación (u otra ventana de Spring Boot que no se detuvo correctamente) sigue escuchando en el puerto 8080.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {/* SOLUCIÓN A: TERMINAL */}
              <div style={{ background: 'var(--bg-hover)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)', display: 'block', marginBottom: '0.4rem' }}>
                  Solución A: Matar el proceso desde terminal
                </strong>
                
                <div style={{ marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                    <span>En macOS / Linux:</span>
                    <button
                      onClick={() => onCopy('kill-mac', 'lsof -ti :8080 | xargs kill -9')}
                      style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 600 }}
                    >
                      {copiedId === 'kill-mac' ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <code style={{ fontSize: '0.8rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.35rem 0.55rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
                    lsof -ti :8080 | xargs kill -9
                  </code>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                    <span>En Windows (PowerShell/CMD):</span>
                    <button
                      onClick={() => onCopy('kill-win', 'netstat -ano | findstr :8080\ntaskkill /PID <PID_NUMERO> /F')}
                      style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 600 }}
                    >
                      {copiedId === 'kill-win' ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <code style={{ fontSize: '0.8rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.35rem 0.55rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
                    netstat -ano | findstr :8080
                  </code>
                </div>
              </div>

              {/* SOLUCIÓN B: CAMBIAR PUERTO */}
              <div style={{ background: 'var(--bg-hover)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)', display: 'block', marginBottom: '0.4rem' }}>
                  Solución B: Cambiar el puerto del servidor
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>
                  Añade esta línea en <code>src/main/resources/application.properties</code>:
                </p>
                <div style={{ background: 'var(--bg-input, #0f172a)', borderRadius: '6px', padding: '0.5rem 0.75rem' }}>
                  <code style={{ color: '#10b981', fontSize: '0.85rem' }}>
                    server.port=8081
                  </code>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem' }}>
                  Ahora la app responderá en <code>http://localhost:8081/</code>.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. LOMBOK NO GENERA GETTERS / SETTERS */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
        <button
          onClick={() => onToggleIssue('lombok')}
          style={{ width: '100%', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🌶️</span>
            <div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-title)' }}>
                Lombok: Métodos @Getter / @Setter no reconocidos o error en compilación
              </strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                El IDE marca en rojo llamadas como <code>task.getId()</code> aunque esté anotado con <code>@Data</code>
              </span>
            </div>
          </div>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', transform: openIssue.lombok ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openIssue.lombok && (
          <div style={{ padding: '0 1.4rem 1.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Lombok genera el bytecode durante la fase de compilación mediante un <em>Annotation Processor</em>. Para que el IDE reconozca estos métodos en tiempo de edición:
            </p>
            
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
              <strong style={{ color: '#10b981', fontSize: '0.9rem', display: 'block', marginBottom: '0.35rem' }}>
                Paso indispensable en IntelliJ IDEA:
              </strong>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <li>Abre Preferencias / Ajustes (<code>Cmd + ,</code> en Mac o <code>Ctrl + Alt + S</code> en Windows/Linux).</li>
                <li>Navega a: <strong>Build, Execution, Deployment → Compiler → Annotation Processors</strong>.</li>
                <li>Marca la casilla: <strong>✅ Enable annotation processing</strong>.</li>
                <li>Pulsa <strong>Apply</strong> y <strong>OK</strong>.</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* 3. JAVA_HOME NO CONFIGURADO */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
        <button
          onClick={() => onToggleIssue('javahome')}
          style={{ width: '100%', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚙️</span>
            <div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-title)' }}>
                Error: "JAVA_HOME is not set and no 'java' command could be found"
              </strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Maven o el sistema operativo no encuentran el compilador de Java
              </span>
            </div>
          </div>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', transform: openIssue.javahome ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openIssue.javahome && (
          <div style={{ padding: '0 1.4rem 1.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Asegúrate de definir la variable de entorno en tu shell o sistema:
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              <li><strong>En macOS:</strong> Añade <code>export JAVA_HOME=$(/usr/libexec/java_home -v 17)</code> a <code>~/.zshrc</code> y recarga con <code>source ~/.zshrc</code>.</li>
              <li><strong>En Windows:</strong> Panel de Control → Variables de entorno → Nueva variable del sistema <code>JAVA_HOME</code> con ruta a <code>jdk-17</code> y agregar <code>%JAVA_HOME%\bin</code> al <code>Path</code>.</li>
              <li><strong>En IntelliJ IDEA:</strong> Ve a <strong>File → Project Structure → Project → SDK</strong> y asegúrate de tener seleccionado <strong>Java 17 o 21</strong>.</li>
            </ul>
          </div>
        )}
      </div>

      {/* 4. CLASES DE SPRING NO RECONOCIDAS (CANNOT RESOLVE SYMBOL) */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
        <button
          onClick={() => onToggleIssue('cannotResolve')}
          style={{ width: '100%', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>📦</span>
            <div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-title)' }}>
                Error: "Cannot resolve symbol 'SpringBootApplication'" o anotaciones en rojo
              </strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                El proyecto se abrió como carpeta plana en lugar de proyecto Maven indexado
              </span>
            </div>
          </div>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', transform: openIssue.cannotResolve ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openIssue.cannotResolve && (
          <div style={{ padding: '0 1.4rem 1.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Aplica estos pasos de auto-reparación en IntelliJ:
            </p>
            <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              <li>En el árbol de archivos, haz clic derecho sobre <code>pom.xml</code> → <strong>Maven → Reload Project</strong>.</li>
              <li>O abre la pestaña lateral derecha <strong>Maven</strong> y pulsa el botón del icono de recarga 🔄 (<em>Reload All Maven Projects</em>).</li>
              <li>Si persiste: Menú <strong>File → Invalidate Caches...</strong>, marca todas las casillas y pulsa <strong>Invalidate and Restart</strong>.</li>
            </ol>
          </div>
        )}
      </div>

      {/* 5. PERMISOS MVNW */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
        <button
          onClick={() => onToggleIssue('mvnwPermission')}
          style={{ width: '100%', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🔐</span>
            <div>
              <strong style={{ fontSize: '1.02rem', color: 'var(--text-title)' }}>
                Error: "zsh: permission denied: ./mvnw" en macOS / Linux
              </strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                El script wrapper descargado no tiene permisos de ejecución activados
              </span>
            </div>
          </div>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', transform: openIssue.mvnwPermission ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openIssue.mvnwPermission && (
          <div style={{ padding: '0 1.4rem 1.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Ejecuta en la raíz del proyecto:</span>
              <button
                onClick={() => onCopy('chmod-mvnw', 'chmod +x mvnw')}
                style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
              >
                {copiedId === 'chmod-mvnw' ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <code style={{ fontSize: '0.85rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'block' }}>
              chmod +x mvnw
            </code>
          </div>
        )}
      </div>

    </div>
  );
}
