import React, { useState } from 'react';

export default function InitializrStepsTab() {
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('initializr_completed_steps');
      return saved ? JSON.parse(saved) : {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false
      };
    } catch {
      return { step1: false, step2: false, step3: false, step4: false, step5: false };
    }
  });

  const [copiedCode, setCopiedCode] = useState(null);

  const toggleStep = (key) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('initializr_completed_steps', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2200);
    });
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎯</span> Check-list de Creación y Arranque del Proyecto
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Progreso: <strong style={{ color: '#10b981' }}>{completedCount}</strong> / 5 pasos completados
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* PASO 1 */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.25rem', background: completedSteps.step1 ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="checkbox" 
                  checked={completedSteps.step1} 
                  onChange={() => toggleStep('step1')} 
                  style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', color: 'var(--text-title)' }}>
                    Paso 1: Configurar start.spring.io (Spring Initializr)
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Abre <a href="https://start.spring.io" target="_blank" rel="noreferrer" style={{ color: '#10b981', fontWeight: 600 }}>start.spring.io</a> en tu navegador y selecciona los siguientes parámetros base:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li><strong>Project:</strong> <span style={{ color: '#10b981' }}>Maven</span> (estándar de la industria para gestión declarativa de dependencias).</li>
                    <li><strong>Language:</strong> <span style={{ color: '#10b981' }}>Java</span>.</li>
                    <li><strong>Spring Boot Version:</strong> 3.x estable (ej. 3.2 o 3.3). <em>Evita versiones marcadas como (SNAPSHOT)</em>.</li>
                    <li><strong>Project Metadata:</strong>
                      <ul style={{ marginTop: '0.2rem' }}>
                        <li>Group: <code>com.accenture</code> (o tu dominio invertido).</li>
                        <li>Artifact: <code>taskmanager</code> (nombre del repositorio/proyecto).</li>
                        <li>Packaging: <code>Jar</code> (contiene el servidor embebido listo para ejecutar).</li>
                        <li>Java Version: <code>17</code> o <code>21</code> (versiones LTS estables recomendadas).</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* PASO 2 */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.25rem', background: completedSteps.step2 ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="checkbox" 
                  checked={completedSteps.step2} 
                  onChange={() => toggleStep('step2')} 
                  style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', color: 'var(--text-title)' }}>
                    Paso 2: Añadir las Dependencias Críticas (Starters)
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Pulsa en el botón <strong>"ADD DEPENDENCIES" (Ctrl + B)</strong> y agrega las 4 herramientas esenciales:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.8rem' }}>
                    <div style={{ padding: '0.8rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.2rem' }}>🌐 Spring Web</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Crea APIs RESTful usando Spring MVC y levanta un servidor Apache Tomcat embebido.</span>
                    </div>
                    <div style={{ padding: '0.8rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#0ea5e9', display: 'block', marginBottom: '0.2rem' }}>⚡ Spring Boot DevTools</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reinicio automático rápido en caliente cada vez que guardas cambios en tu código fuente.</span>
                    </div>
                    <div style={{ padding: '0.8rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#8b5cf6', display: 'block', marginBottom: '0.2rem' }}>🌶️ Lombok</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Elimina el código repetitivo de Java generando Getters, Setters, Equals y Constructores con anotaciones.</span>
                    </div>
                    <div style={{ padding: '0.8rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '0.2rem' }}>🗄️ Spring Data JPA & H2 (Opcional)</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Para persistencia ORM con Hibernate y base de datos en memoria para pruebas rápidas.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PASO 3 */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.25rem', background: completedSteps.step3 ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="checkbox" 
                  checked={completedSteps.step3} 
                  onChange={() => toggleStep('step3')} 
                  style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', color: 'var(--text-title)' }}>
                    Paso 3: Generar, Descomprimir e Importar en tu IDE
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Haz clic en <strong>"GENERATE" (Ctrl + Enter)</strong> en start.spring.io para descargar <code>taskmanager.zip</code>. Luego:
                  </p>
                  <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li>Descomprime el archivo en tu carpeta de trabajo (ej. <code>~/workspace/taskmanager</code>).</li>
                    <li>Abre <strong>Eclipse IDE / Spring Tools Suite (STS)</strong>.</li>
                    <li>Ve al menú: <code>File</code> → <code>Import...</code> → <code>Maven</code> → <code>Existing Maven Projects</code>.</li>
                    <li>Selecciona la carpeta raíz donde se encuentra el archivo <code>pom.xml</code> y pulsa <strong>Finish</strong>.</li>
                    <li>Espera a que la barra de progreso inferior de Eclipse termine de descargar los paquetes de Maven Central.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* PASO 4 */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.25rem', background: completedSteps.step4 ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="checkbox" 
                  checked={completedSteps.step4} 
                  onChange={() => toggleStep('step4')} 
                  style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', color: 'var(--text-title)' }}>
                    Paso 4: Primer Arranque y Verificación en Consola
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Localiza la clase principal generada en <code>src/main/java/com/accenture/taskmanager/TaskmanagerApplication.java</code>:
                  </p>
                  <div style={{ background: '#1e1e2e', padding: '0.9rem 1rem', borderRadius: '10px', color: '#cdd6f4', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.84rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#cba6f7' }}>@SpringBootApplication</span><br/>
                    <span style={{ color: '#f38ba8' }}>public class</span> <span style={{ color: '#89b4fa' }}>TaskmanagerApplication</span> &#123;<br/>
                    &nbsp;&nbsp;<span style={{ color: '#f38ba8' }}>public static void</span> <span style={{ color: '#a6e3a1' }}>main</span>(String[] args) &#123;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;SpringApplication.<span style={{ color: '#89dceb' }}>run</span>(TaskmanagerApplication.<span style={{ color: '#f38ba8' }}>class</span>, args);<br/>
                    &nbsp;&nbsp;&#125;<br/>
                    &#125;
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Haz clic derecho sobre el archivo → <strong>Run As → Java Application</strong> (o <em>Spring Boot App</em>). Verás el logotipo de Spring en la consola de Eclipse y el mensaje final: <code>Tomcat started on port 8080 (http) with context path '/'</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PASO 5 */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.25rem', background: completedSteps.step5 ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="checkbox" 
                  checked={completedSteps.step5} 
                  onChange={() => toggleStep('step5')} 
                  style={{ marginTop: '0.3rem', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10b981' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', color: 'var(--text-title)' }}>
                    Paso 5: Crear tu Primer Endpoint REST (@RestController)
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Crea un paquete <code>controller</code> y dentro una clase <code>HolaController.java</code> para verificar la respuesta HTTP:
                  </p>
                  <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                    <pre style={{ background: '#1e1e2e', padding: '1rem', borderRadius: '10px', color: '#cdd6f4', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.84rem', margin: 0, overflowX: 'auto' }}>
{`package com.accenture.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {

    @GetMapping("/api/hola")
    public String saludar() {
        return "¡Hola Mundo desde Spring Boot y Java en Accenture!";
    }
}`}
                    </pre>
                    <button
                      type="button"
                      onClick={() => handleCopy('holaCode', `@RestController\npublic class HolaController {\n    @GetMapping("/api/hola")\n    public String saludar() {\n        return "¡Hola Mundo desde Spring Boot y Java en Accenture!";\n    }\n}`)}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: '#313244', color: '#cdd6f4', border: 'none', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      {copiedCode === 'holaCode' ? '✓ ¡Copiado!' : '📋 Copiar'}
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Guarda el fichero, abre tu navegador y entra en <a href="http://localhost:8080/api/hola" target="_blank" rel="noreferrer" style={{ color: '#10b981', fontWeight: 600 }}>http://localhost:8080/api/hola</a>. ¡Verás el mensaje devuelto en milisegundos sin configurar ningún servidor Apache o Tomcat a mano!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
