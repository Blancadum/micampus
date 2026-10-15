import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ============================================================================
 * @component   SpringBootInitializrLanding
 * @description Portal interactivo y landing de aterrizaje para Spring Boot:
 *              - Paso a paso para inicializar el primer proyecto (start.spring.io)
 *              - Preguntas Frecuentes (FAQ): Spring vs Spring Boot, Java puro vs Framework
 *              - Anatomía de un proyecto Spring Boot y arquitectura IoC/DI
 *              - Galería preparada para capturas de pantalla de Eclipse / STS
 * ============================================================================
 */
export default function SpringBootInitializrLanding() {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'faq' | 'architecture' | 'screenshots' | 'generator'
  const [copiedCode, setCopiedCode] = useState(null);
  const [openFaq, setOpenFaq] = useState({
    springVsBoot: true,
    vanillaVsFramework: true,
    embeddedTomcat: false,
    iocDi: false,
    annotations: false,
    packageStructure: false
  });
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false
  });

  const toggleFaq = (key) => {
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStep = (key) => {
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2200);
    });
  };

  // Configuración de capturas de pantalla preparadas para que Blanca las adjunte
  const screenshotSlots = [
    {
      id: 'step1-initializr',
      stepNum: 1,
      title: '1. Formulario en start.spring.io',
      desc: 'Captura con Maven, Java 17/21, Spring Boot 3.x, metadatos com.accenture / taskmanager y dependencias.',
      src: '/images/springboot/start-spring-io-setup.png',
      suggestedPath: 'public/images/springboot/start-spring-io-setup.png'
    },
    {
      id: 'step2-eclipse-import',
      stepNum: 2,
      title: '2. Importación Maven en Eclipse / STS',
      desc: 'Ventana de File → Import → Existing Maven Projects seleccionando la carpeta descomprimida.',
      src: '/images/springboot/import-eclipse-maven.png',
      suggestedPath: 'public/images/springboot/import-eclipse-maven.png'
    },
    {
      id: 'step3-terminal-run',
      stepNum: 3,
      title: '3. Primer Arranque y Banner Spring',
      desc: 'Consola de Eclipse con el banner ASCII de Spring Boot y el log "Tomcat started on port 8080".',
      src: '/images/springboot/terminal-boot-run.png',
      suggestedPath: 'public/images/springboot/terminal-boot-run.png'
    },
    {
      id: 'step4-browser-test',
      stepNum: 4,
      title: '4. Comprobación en Navegador (localhost:8080)',
      desc: 'Navegador mostrando la página de prueba Whitelabel o la respuesta del primer endpoint @RestController.',
      src: '/images/springboot/localhost-8080-browser.png',
      suggestedPath: 'public/images/springboot/localhost-8080-browser.png'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', paddingBottom: '5rem' }}>
      {/* BREADCRUMB */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', padding: '0.85rem 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🏠 Inicio</Link>
          <span style={{ color: 'var(--text-dim)' }}>›</span>
          <Link to="/java/springboot" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>☕ Spring Boot</Link>
          <span style={{ color: 'var(--text-dim)' }}>›</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>🌱 Spring Initializr & Fundamentos</span>
        </div>
      </div>

      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* HERO SECTION */}
        <section 
          style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.08) 50%, rgba(139, 92, 246, 0.05) 100%), var(--bg-card)', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            borderRadius: '24px', 
            padding: '2.5rem', 
            marginBottom: '2.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '30px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
            <span>🌱</span> Framework Hub · Guía de Inicio Oficial
          </div>

          <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-title)', margin: '0 0 1rem', lineHeight: '1.25' }}>
            Spring Boot Initializr: Primeros pasos para un proyecto Java con Spring
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '850px', lineHeight: '1.65', margin: '0 0 1.5rem' }}>
            Aprende qué es Spring Boot, qué aporta frente a escribir Java puro, cómo generar y configurar tu primer proyecto en <strong style={{ color: 'var(--text-title)' }}>start.spring.io</strong> y cómo importarlo en tu entorno de desarrollo para construir APIs REST modernas con arquitectura limpia.
          </p>

          {/* BADGES */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.8rem' }}>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600 }}>☕ Java 17 / 21 LTS</span>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600 }}>📦 Maven & Starters</span>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600 }}>🚀 Tomcat Embebido</span>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600 }}>🔄 Inversión de Control (IoC)</span>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', fontWeight: 600 }}>🏢 Proyecto Accenture Taskmanager</span>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <a 
              href="https://start.spring.io/" 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#10b981',
                color: '#ffffff',
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🌐</span> Abrir start.spring.io Oficial
            </a>

            <button
              onClick={() => setActiveTab('faq')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-card)',
                color: 'var(--text-title)',
                border: '1px solid var(--border-subtle)',
                padding: '0.75rem 1.3rem',
                borderRadius: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>❓</span> Ver Preguntas Frecuentes (FAQ)
            </button>

            <Link
              to="/accenture/actividades"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#8b5cf6',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '0.75rem 1.3rem',
                borderRadius: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🛠️</span> Ir a Retos y Actividades (1-12)
            </Link>
          </div>
        </section>

        {/* NAVIGATION TABS */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            borderBottom: '1px solid var(--border-subtle)', 
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem'
          }}
        >
          {[
            { id: 'steps', label: '1. Paso a Paso: Tu Primer Proyecto', icon: '🚀' },
            { id: 'faq', label: '2. Preguntas Frecuentes (FAQ)', icon: '❓' },
            { id: 'architecture', label: '3. Java Puro vs Spring Boot', icon: '⚖️' },
            { id: 'screenshots', label: '4. Capturas & Guía Visual IDE', icon: '📸' },
            { id: 'generator', label: '5. Comando Terminal (curl)', icon: '⚡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.75rem 1.15rem',
                borderRadius: '12px 12px 0 0',
                border: 'none',
                background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === tab.id ? '3px solid #10b981' : '3px solid transparent',
                color: activeTab === tab.id ? '#10b981' : 'var(--text-muted)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: PASO A PASO */}
        {activeTab === 'steps' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🎯</span> Check-list de Creación y Arranque del Proyecto
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Progreso: {Object.values(completedSteps).filter(Boolean).length} / 5 pasos completados
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
                        <div style={{ background: '#1e1e2e', padding: '0.9rem 1rem', borderRadius: '10px', color: '#cdd6f4', fontFamily: 'monospace', fontSize: '0.84rem', marginBottom: '0.75rem' }}>
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
                          <pre style={{ background: '#1e1e2e', padding: '1rem', borderRadius: '10px', color: '#cdd6f4', fontFamily: 'monospace', fontSize: '0.84rem', margin: 0, overflowX: 'auto' }}>
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
        )}

        {/* TAB 2: PREGUNTAS FRECUENTES (FAQ) */}
        {activeTab === 'faq' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* FAQ 1: Spring vs Spring Boot */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
              <button
                onClick={() => toggleFaq('springVsBoot')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-title)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>🌱</span>
                  <span>1. ¿Qué diferencia fundamental hay entre Spring Framework y Spring Boot?</span>
                </div>
                <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.springVsBoot ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {openFaq.springVsBoot && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  <p style={{ margin: '0 0 1rem' }}>
                    <strong>Spring Framework</strong> (creado en 2002) es el ecosistema central que proporciona Inversión de Control (IoC), Inyección de Dependencias (DI), abstracciones para transacciones y seguridad. Sin embargo, en el Spring Framework clásico tenías que:
                  </p>
                  <ul style={{ margin: '0 0 1rem', paddingLeft: '1.4rem' }}>
                    <li>Escribir cientos de líneas de configuración en ficheros XML (<code>applicationContext.xml</code>, <code>web.xml</code>).</li>
                    <li>Instalar, configurar y desplegar un servidor externo (Apache Tomcat, WildFly o WebLogic) como un archivo <code>.war</code>.</li>
                    <li>Gestionar manualmente las versiones de cada librería en Maven, sufriendo conflictos constantes de dependencias incompatibles (el temido <em>"JAR Hell"</em>).</li>
                  </ul>
                  <p style={{ margin: '0 0 1rem' }}>
                    <strong>Spring Boot</strong> (lanzado en 2014) es una capa superior "opinionada" que automatiza todo lo anterior mediante tres pilares:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#10b981' }}>1. Convención sobre Configuración</strong>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Auto-configura componentes según las librerías presentes en tu <code>pom.xml</code>. Si añades <code>spring-boot-starter-web</code>, configura Tomcat y Spring MVC automáticamente.</p>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#0ea5e9' }}>2. Servidor Embebido</strong>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tomcat viene empaquetado dentro de la aplicación. Tu proyecto es un archivo <code>.jar</code> autoejecutable con <code>java -jar app.jar</code>.</p>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ color: '#8b5cf6' }}>3. Dependencias "Starters"</strong>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Agrupaciones de dependencias probadas entre sí. Una sola línea importa todas las versiones compatibles necesarias.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ 2: Java Puro vs Framework */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
              <button
                onClick={() => toggleFaq('vanillaVsFramework')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-title)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>⚖️</span>
                  <span>2. ¿Qué aportaciones hace el framework frente a desarrollar en Java "puro" (Vanilla)?</span>
                </div>
                <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.vanillaVsFramework ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {openFaq.vanillaVsFramework && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  <p style={{ margin: '0 0 1rem' }}>
                    Programar una API web en <strong>Java puro (sin framework)</strong> requiere escribir miles de líneas de "fontanería" antes de poder programar la primera regla de negocio. Observa la comparativa:
                  </p>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', margin: '0 0 1rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-hover)', borderBottom: '2px solid var(--border-subtle)' }}>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-title)' }}>Área</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#ef4444' }}>Java Puro (Vanilla)</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#10b981' }}>Con Spring Boot</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Servidor HTTP</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>Configurar Sockets crudos con <code>ServerSocket</code> o Servlets manuales.</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}>Tomcat embebido incluido listo para escuchar peticiones al arrancar.</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Rutas y JSON</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>Parsear strings de URL a mano y usar librerías de JSON con decenas de líneas de mapeo.</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}>Anotaciones declarativas: <code>@GetMapping</code> y serialización automática con Jackson.</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Creación de Objetos</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>Instanciar con <code>new Servicio()</code> creando alto acoplamiento y dificultad para pruebas.</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}><strong>Inyección de Dependencias (IoC)</strong>: Spring instancia e inyecta los Beans automáticamente.</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Base de Datos (SQL)</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>JDBC tradicional con <code>Connection</code>, <code>Statement</code>, <code>try/catch/finally</code> y SQL manual.</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}><strong>Spring Data JPA</strong>: Métodos CRUD generados automáticamente solo definiendo una interfaz.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ 3: Por qué Tomcat Embebido */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
              <button
                onClick={() => toggleFaq('embeddedTomcat')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-title)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>🚀</span>
                  <span>3. ¿Por qué Spring Boot empaqueta Tomcat dentro en lugar de usar un servidor externo?</span>
                </div>
                <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.embeddedTomcat ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {openFaq.embeddedTomcat && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  <p style={{ margin: '0 0 1rem' }}>
                    Antiguamente, la infraestructura era monolítica: existía un servidor físico con un Tomcat instalado donde los desarrolladores "subían" archivos <code>.war</code>.
                  </p>
                  <p style={{ margin: '0 0 1rem' }}>
                    En la era moderna de <strong>Microservicios, la nube (AWS/Azure) y Docker</strong>, el paradigma cambió: <em>"La aplicación ES el servidor"</em>. Al generar un único archivo <code>.jar</code> autoejecutable:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.4rem' }}>
                    <li>Se puede arrancar en cualquier máquina con el simple comando <code>java -jar app.jar</code>.</li>
                    <li>No dependes de qué versión de Tomcat tenga instalada el servidor de producción.</li>
                    <li>Empaquetar en un contenedor Docker requiere apenas 4 líneas de <code>Dockerfile</code>.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* FAQ 4: Inversión de Control (IoC) y DI */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
              <button
                onClick={() => toggleFaq('iocDi')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-title)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>🔄</span>
                  <span>4. ¿Qué es el contenedor IoC y cómo funciona la Inyección de Dependencias (@Autowired)?</span>
                </div>
                <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.iocDi ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {openFaq.iocDi && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  <p style={{ margin: '0 0 1rem' }}>
                    <strong>Inversión de Control (IoC):</strong> En lugar de que tú crees las instancias de tus clases con <code>new GestorTareas()</code>, le cedes el control a Spring. Spring actúa como el director de orquesta: lee las anotaciones, crea los objetos (llamados <strong>Beans</strong>) al arrancar y los guarda en su contenedor interno (ApplicationContext).
                  </p>
                  <p style={{ margin: '0 0 1rem' }}>
                    <strong>Inyección de Dependencias (DI):</strong> Cuando una clase (por ejemplo, un Controller) necesita un servicio para hacer su trabajo, tú no creas el servicio. Simplemente lo declaras y Spring te lo "inyecta" automáticamente mediante el constructor o la anotación <code>@Autowired</code>:
                  </p>
                  <pre style={{ background: '#1e1e2e', padding: '1rem', borderRadius: '10px', color: '#cdd6f4', fontFamily: 'monospace', fontSize: '0.84rem', margin: 0 }}>
{`@Service
public class TareaService { ... }

@RestController
public class TareaController {
    private final TareaService tareaService;

    // Spring busca automáticamente el Bean TareaService y lo inyecta aquí
    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* FAQ 5: Anotaciones Esenciales */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
              <button
                onClick={() => toggleFaq('annotations')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-title)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>🏷️</span>
                  <span>5. ¿Cuáles son las anotaciones iniciales imprescindibles que debo memorizar?</span>
                </div>
                <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.annotations ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {openFaq.annotations && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <code style={{ color: '#10b981', fontWeight: 700 }}>@SpringBootApplication</code>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Anota la clase principal. Combina <code>@Configuration</code>, <code>@EnableAutoConfiguration</code> y <code>@ComponentScan</code>.</p>
                    </div>
                    <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <code style={{ color: '#0ea5e9', fontWeight: 700 }}>@RestController</code>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Marca un controlador web donde los retornos de métodos se convierten directamente a JSON/texto (incluye <code>@ResponseBody</code>).</p>
                    </div>
                    <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <code style={{ color: '#8b5cf6', fontWeight: 700 }}>@GetMapping / @PostMapping</code>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Mapean peticiones HTTP GET y POST a métodos Java específicos.</p>
                    </div>
                    <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                      <code style={{ color: '#f59e0b', fontWeight: 700 }}>@Service & @Repository</code>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Estereotipos que indican que una clase es de lógica de negocio o de acceso a datos.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ARQUITECTURA EN CAPAS */}
        {activeTab === 'architecture' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📐</span> Anatomía y Flujo de Petición en un Proyecto Spring Boot
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
              Un proyecto Spring Boot profesional separa responsabilidades en 3 capas estándar (Arquitectura en Capas o Clean Architecture). Cada capa tiene una sola misión:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              {/* CAPA 1 */}
              <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#0ea5e9' }}>1. Controller (Camarero)</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Recibe la petición HTTP desde el navegador o Postman, valida los parámetros de entrada y devuelve la respuesta en JSON. No contiene cálculos de negocio ni sentencias SQL.
                </p>
              </div>

              {/* CAPA 2 */}
              <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧠</div>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#10b981' }}>2. Service (Cocinero)</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Contiene las reglas de negocio, validaciones complejas, transacciones (<code>@Transactional</code>) y orquestación de llamadas a múltiples repositorios.
                </p>
              </div>

              {/* CAPA 3 */}
              <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🗄️</div>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#8b5cf6' }}>3. Repository (Despensa)</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Accede a la base de datos (H2, MySQL, PostgreSQL) a través de Spring Data JPA o JDBC. Solo sabe cómo guardar, buscar y eliminar entidades.
                </p>
              </div>
            </div>

            {/* ESTRUCTURA DE CARPETAS */}
            <div style={{ background: '#1e1e2e', padding: '1.5rem', borderRadius: '16px', color: '#cdd6f4', fontFamily: 'monospace', fontSize: '0.85rem', overflowX: 'auto' }}>
              <div style={{ color: '#a6e3a1', fontWeight: 'bold', marginBottom: '0.75rem' }}>📁 Estructura Estándar Maven en taskmanager:</div>
{`taskmanager/
├── pom.xml                               # Declaración de dependencias y versión Java
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/accenture/taskmanager/
│   │   │       ├── TaskmanagerApplication.java   # Punto de arranque (@SpringBootApplication)
│   │   │       ├── controller/                   # Endpoints HTTP REST (@RestController)
│   │   │       ├── service/                      # Lógica de negocio (@Service)
│   │   │       ├── repository/                   # Acceso a base de datos (@Repository)
│   │   │       └── model/                        # Entidades JPA y DTOs
│   │   └── resources/
│   │       ├── application.properties           # Puerto de servidor, credenciales de BD, perfiles
│   │       └── static/ & templates/
│   └── test/
│       └── java/                                # Pruebas unitarias y de integración (@SpringBootTest)`}
            </div>
          </div>
        )}

        {/* TAB 4: GALERÍA DE CAPTURAS DE PANTALLA */}
        {activeTab === 'screenshots' && (
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
                  📁 Carpeta destino: <code>public/images/springboot/</code>
                </div>
              </div>

              {/* GRID DE SLOTS DE CAPTURAS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                {screenshotSlots.map(slot => (
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
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontFamily: 'monospace' }}>
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
        )}

        {/* TAB 5: GENERADOR CON CURL */}
        {activeTab === 'generator' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚡</span> Inicialización Instantánea por Terminal (1 Línea de Comando)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
              ¿Sabías que puedes generar el proyecto entero sin abrir el navegador? start.spring.io expone un API REST oficial que permite descargar y configurar tu proyecto directamente desde la terminal con <code>curl</code>:
            </p>

            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <pre style={{ background: '#1e1e2e', padding: '1.25rem', borderRadius: '14px', color: '#a6e3a1', fontFamily: 'monospace', fontSize: '0.88rem', margin: 0, overflowX: 'auto', lineHeight: '1.6' }}>
{`# 1. Descargar el proyecto taskmanager configurado con Web, DevTools y Lombok
curl https://start.spring.io/starter.zip \\
  -d type=maven-project \\
  -d language=java \\
  -d bootVersion=3.3.0 \\
  -d baseDir=taskmanager \\
  -d groupId=com.accenture \\
  -d artifactId=taskmanager \\
  -d name=taskmanager \\
  -d packageName=com.accenture.taskmanager \\
  -d packaging=jar \\
  -d javaVersion=17 \\
  -d dependencies=web,devtools,lombok \\
  -o taskmanager.zip

# 2. Descomprimir e ingresar
unzip taskmanager.zip && cd taskmanager

# 3. Compilar y arrancar de inmediato
./mvnw spring-boot:run`}
              </pre>
              <button
                onClick={() => handleCopy('curlCmd', `curl https://start.spring.io/starter.zip -d type=maven-project -d language=java -d baseDir=taskmanager -d groupId=com.accenture -d artifactId=taskmanager -d dependencies=web,devtools,lombok -o taskmanager.zip && unzip taskmanager.zip && cd taskmanager && ./mvnw spring-boot:run`)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copiedCode === 'curlCmd' ? '✓ ¡Comando copiado!' : '📋 Copiar Comando'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.85rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <span style={{ color: 'var(--text-main)' }}>
                <strong>Tip de Productividad:</strong> Este comando es exactamente el mismo que ejecutan las pipelines de CI/CD para generar esqueletos de microservicios automatizados en producción.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
