import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LinkedInSeoAiBlog() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('micampus_linkedin_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      headline: true,
      about: true,
      skills: false,
      cvFormat: false,
      githubLinks: false,
      recommendations: false
    };
  });

  const toggleCheck = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem('micampus_linkedin_checklist', JSON.stringify(updated));
  };

  const atsPromptText = `Actúa como un reclutador técnico senior y un sistema ATS (Applicant Tracking System) de última generación.
A continuación te proporciono:
1) La oferta de trabajo objetivo.
2) Mi perfil profesional actual / CV.

Por favor:
1. Extrae las 15 palabras clave principales (hard skills, tecnologías, frameworks y certificaciones) que el ATS buscará.
2. Calcula mi compatibilidad estimada (Match Score de 0 a 100%).
3. Identifica qué términos críticos me faltan para superar el umbral del 85%.
4. Redáctame una propuesta de sección 'Experiencia' y 'Acerca de' optimizada para LinkedIn donde estas keywords se integren de forma natural, asertiva y sin relleno artificial.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(atsPromptText).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    });
  };

  const checklistItems = [
    { key: 'headline', label: 'Titular con Stack Técnico y Rol (Ej: Full-Stack Developer | Java · Spring Boot · React)', category: 'SEO LinkedIn' },
    { key: 'about', label: 'Sección "Acerca de" con gancho, elevator pitch y tecnologías estructuradas con viñetas', category: 'SEO LinkedIn' },
    { key: 'skills', label: 'Las 3 habilidades principales fijadas en el top (Java, Spring Framework, REST)', category: 'SEO LinkedIn' },
    { key: 'cvFormat', label: 'CV en formato ATS-Friendly: 1 columna, sin tablas complejas ni iconos gráficos que rompan el parser', category: 'Filtros ATS' },
    { key: 'githubLinks', label: 'Enlaces directos y verificables a repositorios en GitHub y demos activas', category: 'Marca Personal' },
    { key: 'recommendations', label: 'Al menos 2 recomendaciones cruzadas de compañeros, mentores o profesores de IOC/Accenture', category: 'Autoridad' }
  ];

  const completedChecks = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedChecks / checklistItems.length) * 100);

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '1.5rem 5% 4rem', maxWidth: '1080px', margin: '0 auto' }}>
      
      {/* NAVEGACIÓN Y BREADCRUMB */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Inicio</Link>
        <span>/</span>
        <Link to="/ioc/ipo2" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>IOC · IPO2</Link>
        <span>/</span>
        <span style={{ color: '#ea580c', fontWeight: 600 }}>Blog: SEO en LinkedIn & Filtros de IA</span>
      </nav>

      {/* HEADER EDITORIAL DEL ARTÍCULO */}
      <header style={{ 
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(147, 51, 234, 0.08) 100%)', 
        border: '1px solid rgba(234, 88, 12, 0.25)', 
        borderRadius: '20px', 
        padding: '2.5rem', 
        marginBottom: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #ea580c, #f97316)', 
            color: '#fff', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '999px', 
            fontSize: '0.75rem', 
            fontWeight: 700 
          }}>
            💼 IPO2 · ESPECIAL EMPLEABILIDAD
          </span>
          <span style={{ 
            background: 'rgba(147, 51, 234, 0.15)', 
            color: '#9333ea', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '999px', 
            fontSize: '0.75rem', 
            fontWeight: 600 
          }}>
            🤖 ALGORITMOS & ATS
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            ⏱️ 7 min de lectura · Orientación Laboral 4.0
          </span>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', 
          lineHeight: '1.25', 
          color: 'var(--text-title)', 
          margin: '0 0 1rem', 
          fontWeight: 800 
        }}>
          Desmontando el Proceso de Selección: SEO en LinkedIn, Filtros de IA y la Marca Personal que Abre Puertas
        </h1>

        <p style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.65', 
          color: 'var(--text-main)', 
          margin: '0 0 1.5rem', 
          maxWidth: '850px' 
        }}>
          El puente entre la formación y el mercado laboral ha cambiado para siempre. Ya no enviamos currículums a personas: primero nos enfrentamos a algoritmos implacables. Aprende a superar al <em>portero digital</em> de los ATS, a optimizar tu presencia en LinkedIn y a explotar las habilidades que la IA nunca podrá replicar.
        </p>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <Link 
            to="/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats" 
            className="theme-btn" 
            style={{ 
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)', 
              color: '#fff', 
              textDecoration: 'none', 
              padding: '0.65rem 1.25rem', 
              fontWeight: 600, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              borderRadius: '8px' 
            }}
          >
            <span>📖 Abrir en el Libro Digital de IPO2</span>
            <span>➔</span>
          </Link>
          <button 
            type="button" 
            onClick={handleCopyPrompt}
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-subtle)', 
              color: 'var(--text-title)', 
              padding: '0.65rem 1.25rem', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 600, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem' 
            }}
          >
            <span>{copiedPrompt ? '✅ Prompt Copiado' : '📋 Copiar Prompt ATS para IA'}</span>
          </button>
        </div>
      </header>

      {/* CUERPO PRINCIPAL DEL ARTÍCULO */}
      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2.5rem' }}>
        
        {/* SECCIÓN 1: EL NUEVO PARADIGMA */}
        <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🎯</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
              1. El Nuevo Paradigma: De la Cantidad Masiva a la Precisión Láser
            </h2>
          </div>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            La época romántica de imprimir cientos de currículums en papel o enviar el mismo documento PDF a cuarenta ofertas distintas está muerta y enterrada. Aquello era un juego de volumen; hoy el mercado laboral es <strong>un juego de pura estrategia algorítmica</strong>.
          </p>
          <div style={{ 
            background: 'rgba(234, 88, 12, 0.08)', 
            borderLeft: '4px solid #ea580c', 
            padding: '1rem 1.25rem', 
            borderRadius: '4px', 
            margin: '1.25rem 0',
            fontStyle: 'italic',
            color: 'var(--text-main)'
          }}>
            "Cada candidatura que envías debe ser diseñada como un tiro de precisión láser: concebida primero para satisfacer a una máquina, y solo si la superas, llegará a los ojos de un ser humano."
          </div>
        </article>

        {/* SECCIÓN 2: LA FORTALEZA DIGITAL (ATS) */}
        <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🤖</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
              2. La Fortaleza Digital: Los ATS como "Porteros de Discoteca"
            </h2>
          </div>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            Un <strong>ATS (*Applicant Tracking System*)</strong> es un software de cribaje que actúa como el portero implacable de una discoteca digital. No tiene intuición, no empatiza con tus ganas de aprender y no busca al candidato con mayor vocación. <strong>Busca únicamente la coincidencia estricta de palabras clave (*keyword matching*) con la oferta de trabajo.</strong>
          </p>

          {/* Comparativa Visual ATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>❌ Lo que el ATS descarta al instante</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <li>Currículums con plantillas gráficas complejas o texto dentro de imágenes.</li>
                <li>Tablas anidadas y columnas múltiples que desordenan el parser.</li>
                <li>Falta de los términos exactos solicitados (ej: pedir "Spring Boot" y poner solo "Java").</li>
                <li>CVs genéricos sin adaptar a las tecnologías de la oferta.</li>
              </ul>
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 'bold', color: '#22c55e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>✅ Lo que maximiza tu "Match Score"</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <li>Keywords técnicas repetidas de forma natural en habilidades y proyectos.</li>
                <li>Documentos con encabezados canónicos (Experiencia, Proyectos, Habilidades).</li>
                <li>Verbos de acción cuantificados (Desarrollado, Desplegado, Reducido un 20%).</li>
                <li>Formato PDF o DOCX limpio, mono-columna y texto seleccionable.</li>
              </ul>
            </div>
          </div>
        </article>

        {/* SECCIÓN 3: ESTRATEGIA DE SEO EN LINKEDIN */}
        <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🔍</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
              3. Estrategia de SEO en LinkedIn: Haz que los Reclutadores te Encuentren
            </h2>
          </div>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            LinkedIn es fundamentalmente una base de datos indexada. Los reclutadores de empresas como Accenture o consultoras TIC no buscan perfiles al azar: aplican búsquedas booleanas (ej: <code>"Java" AND "Spring Boot" AND ("Docker" OR "REST")</code>). Si esas palabras no están en tus zonas calientes, eres invisible.
          </p>

          {/* CHECKLIST INTERACTIVA */}
          <div style={{ marginTop: '1.5rem', background: 'var(--bg-hover)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--text-title)', fontSize: '1.05rem' }}>
                📋 Checklist Interactiva de Optimización de Perfil
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: progressPercent === 100 ? '#22c55e' : '#ea580c' }}>
                {completedChecks} de {checklistItems.length} completadas ({progressPercent}%)
              </span>
            </div>

            <div style={{ background: 'var(--border-subtle)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div style={{ background: 'linear-gradient(90deg, #ea580c, #9333ea)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.3s ease' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {checklistItems.map((item) => (
                <label 
                  key={item.key} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '0.75rem', 
                    cursor: 'pointer', 
                    padding: '0.6rem 0.8rem', 
                    borderRadius: '8px', 
                    background: checklist[item.key] ? 'rgba(34, 197, 94, 0.08)' : 'var(--bg-card)', 
                    border: '1px solid',
                    borderColor: checklist[item.key] ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-subtle)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={!!checklist[item.key]} 
                    onChange={() => toggleCheck(item.key)}
                    style={{ marginTop: '0.2rem', accentColor: '#ea580c', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: checklist[item.key] ? 'var(--text-main)' : 'var(--text-title)', 
                      fontWeight: checklist[item.key] ? 500 : 600,
                      textDecoration: checklist[item.key] ? 'line-through' : 'none' 
                    }}>
                      {item.label}
                    </span>
                    <span style={{ display: 'inline-block', marginLeft: '0.5rem', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                      {item.category}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </article>

        {/* SECCIÓN 4: MARCA PERSONAL VS CV */}
        <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🚀</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
              4. Marca Personal: El Tráiler Dinámico de tu Futuro
            </h2>
          </div>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            La diferencia entre un currículum convencional y la marca personal es conceptualmente demoledora:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-hover)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-title)', fontSize: '1.1rem' }}>El Currículum Tradicional</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Es una simple foto estática de tu pasado. Describe de dónde vienes, qué estudiaste y qué hiciste. Solo se activa si tú tomas la iniciativa de enviarlo a un buzón.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(147, 51, 234, 0.08)', borderRadius: '12px', border: '1px solid rgba(147, 51, 234, 0.3)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎬</div>
              <h3 style={{ margin: '0 0 0.5rem', color: '#9333ea', fontSize: '1.1rem' }}>La Marca Personal</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                Es el tráiler dinámico de tu película profesional. Es una promesa viva de qué valor serás capaz de aportar mañana. Atrae oportunidades de forma pasiva (*inbound*) las 24 horas del día.
              </p>
            </div>
          </div>
        </article>

        {/* SECCIÓN 5: HARD SKILLS VS SOFT SKILLS (DATOS DEL SEPE) */}
        <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>📊</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
              5. Hard Skills vs. Soft Skills: El Diagnóstico Oficial del SEPE
            </h2>
          </div>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            Existe un mantra imprescindible que debes interiorizar antes de tu próxima entrevista:
          </p>

          <blockquote style={{ 
            margin: '1.25rem 0', 
            padding: '1.25rem', 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)', 
            borderLeft: '4px solid #3b82f6', 
            borderRadius: '6px', 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            color: 'var(--text-title)',
            lineHeight: '1.6'
          }}>
            "Las habilidades técnicas (hard skills) te abren la puerta de la entrevista. Pero son tus habilidades personales (soft skills) las que realmente te consiguen el puesto, la promoción y consolidan tu carrera profesional."
          </blockquote>

          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            Según el informe oficial del <strong>Servicio Público de Empleo Estatal (SEPE)</strong>, casi el 50% de las competencias decisivas en la selección final no son técnicas, sino sociales y comunicativas. Las tres competencias estrella son:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>⚡</div>
              <div style={{ fontWeight: 'bold', color: 'var(--text-title)', marginBottom: '0.2rem' }}>Proactividad</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Anticiparse a fallos, no esperar órdenes pasivas y proponer soluciones.</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🤝</div>
              <div style={{ fontWeight: 'bold', color: 'var(--text-title)', marginBottom: '0.2rem' }}>Trabajo en Equipo</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Compartir conocimientos en Git/Jira y priorizar la meta común.</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🛡️</div>
              <div style={{ fontWeight: 'bold', color: 'var(--text-title)', marginBottom: '0.2rem' }}>Compromiso</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rigor técnico, responsabilidad en plazos y calidad de entregas.</div>
            </div>
          </div>
        </article>

        {/* SECCIÓN 6: EL MODELO DE LAS 3 Cs & IA */}
        <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>💎</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
              6. El Modelo de las 3 Cs y la Complementariedad con la IA
            </h2>
          </div>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
            Para triunfar en equipos multidisciplinares, quédate con el <strong>Modelo de las 3 Cs</strong>:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(234, 88, 12, 0.06)', borderRadius: '10px', border: '1px solid rgba(234, 88, 12, 0.2)' }}>
              <div style={{ fontWeight: 'bold', color: '#ea580c', marginBottom: '0.4rem' }}>1. Comunicación Abierta</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                Honestidad técnica, capacidad de pedir ayuda sin miedo ante bloqueos y retroalimentación transparente.
              </div>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(147, 51, 234, 0.06)', borderRadius: '10px', border: '1px solid rgba(147, 51, 234, 0.2)' }}>
              <div style={{ fontWeight: 'bold', color: '#9333ea', marginBottom: '0.4rem' }}>2. Colaboración Real</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                Alinear esfuerzos como un solo bloque. Si un compañero tropieza con un bug, el equipo entero responde.
              </div>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(16, 185, 129, 0.06)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '0.4rem' }}>3. Compromiso Indestructible</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                Cumplimiento ético de acuerdos y excelencia en cada commit, prueba unitaria o despliegue.
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
            color: '#f8fafc', 
            padding: '1.75rem', 
            borderRadius: '12px', 
            marginTop: '1.5rem' 
          }}>
            <h3 style={{ margin: '0 0 0.6rem', color: '#38bdf8', fontSize: '1.15rem' }}>
              💡 La Pregunta Definitiva: No competir contra la IA, complementarla
            </h3>
            <p style={{ margin: 0, lineHeight: '1.65', fontSize: '0.95rem', color: '#cbd5e1' }}>
              En un entorno donde la inteligencia artificial escribe código estándar a velocidad de la luz y los ATS filtran candidatos en microsegundos, tus cualidades profundamente humanas —<strong>la creatividad, la empatía, el pensamiento crítico y el liderazgo ético</strong>— son tu activo más valioso.
              <br /><br />
              La pregunta para diseñar tu futuro ya no es <em>"¿qué pide el mercado?"</em>, sino: <strong>¿cuál de estas competencias clave comenzarás a entrenar hoy mismo?</strong>
            </p>
          </div>
        </article>

      </main>

      {/* FOOTER DE ACCIONES */}
      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
          <span>←</span> <span>Volver a la Home</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/ioc/ipo2" className="theme-btn" style={{ textDecoration: 'none' }}>
            💼 Ver Landing IPO2
          </Link>
          <Link to="/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats" className="theme-btn" style={{ background: '#ea580c', color: '#fff', textDecoration: 'none' }}>
            📖 Temario Oficial IPO2 →
          </Link>
        </div>
      </footer>

    </div>
  );
}
