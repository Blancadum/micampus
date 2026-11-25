import React, { useState } from 'react';

const SCREENSHOT_SLOTS = [
  {
    id: 'step1-initializr',
    stepNum: 1,
    title: '1. Formulario en start.spring.io',
    desc: 'Captura con Maven, Java 17/21, Spring Boot 3.x, metadatos com.accenture / taskmanager y dependencias.',
    src: '/fuentes/springboot/img/start-spring-io-setup.png',
    suggestedPath: 'public/fuentes/springboot/img/start-spring-io-setup.png'
  },
  {
    id: 'step2-eclipse-import',
    stepNum: 2,
    title: '2. Importación Maven en Eclipse / STS',
    desc: 'Ventana de File → Import → Existing Maven Projects seleccionando la carpeta descomprimida.',
    src: '/fuentes/springboot/img/import-eclipse-maven.png',
    suggestedPath: 'public/fuentes/springboot/img/import-eclipse-maven.png'
  },
  {
    id: 'step3-terminal-run',
    stepNum: 3,
    title: '3. Primer Arranque y Banner Spring',
    desc: 'Consola de Eclipse con el banner ASCII de Spring Boot y el log "Tomcat started on port 8080".',
    src: '/fuentes/springboot/img/terminal-boot-run.png',
    suggestedPath: 'public/fuentes/springboot/img/terminal-boot-run.png'
  },
  {
    id: 'step4-browser-test',
    stepNum: 4,
    title: '4. Comprobación en Navegador (localhost:8080)',
    desc: 'Navegador mostrando la página de prueba Whitelabel o la respuesta del primer endpoint @RestController.',
    src: '/fuentes/springboot/img/localhost-8080-browser.png',
    suggestedPath: 'public/fuentes/springboot/img/localhost-8080-browser.png'
  }
];

export default function InitializrScreenshotsTab() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2200);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.3rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📸</span> Galería de Capturas del Proceso
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Espacio preparado para que adjuntes las capturas de pantalla de tu entorno (start.spring.io, Eclipse, consola y navegador).
            </p>
          </div>
          <div style={{ padding: '0.4rem 0.8rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
            📁 Carpeta destino: <code>public/fuentes/springboot/img/</code>
          </div>
        </div>

        {/* GRID DE SLOTS DE CAPTURAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {SCREENSHOT_SLOTS.map(slot => (
            <div 
              key={slot.id}
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                background: 'var(--bg-hover)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* IMAGEN O PLACEHOLDER ELEGANTE */}
              <div 
                style={{
                  height: '180px',
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  textAlign: 'center',
                  position: 'relative',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  📷
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10b981' }}>
                  Ranura {slot.stepNum} Preparada
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontFamily: 'var(--font-mono, monospace)' }}>
                  {slot.suggestedPath.replace('public/', '')}
                </span>
              </div>

              {/* CONTENIDO Y EXPLICACIÓN */}
              <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem', color: 'var(--text-title)' }}>
                  {slot.title}
                </h4>
                <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', flex: 1 }}>
                  {slot.desc}
                </p>

                <button
                  type="button"
                  onClick={() => handleCopy(`path-${slot.id}`, slot.suggestedPath)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.45rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <span>📋</span>
                  <span>{copiedCode === `path-${slot.id}` ? '¡Ruta copiada al portapapeles!' : 'Copiar ruta de archivo'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
