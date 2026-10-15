import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import talentIcon from './assets/img/icons/talent.png';
import { ACCENTURE_CONFIG } from './config/accentureConfig';

export default function Home() {
  const [userName] = useState(() => localStorage.getItem('micampus_user_name') || 'Blanca');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/data/tasks.json')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => setTasks([]));
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Buenos días';
    if (hour >= 12 && hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calcular próxima entrega dinámica
  const upcomingTasks = tasks
    .map(t => ({ ...t, dateObj: new Date(t.date) }))
    .filter(t => t.dateObj >= today)
    .sort((a, b) => a.dateObj - b.dateObj);

  const nextTask = upcomingTasks.length > 0 ? upcomingTasks[0] : null;

  const formatTaskDate = (d) => {
    if (!d) return '--';
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${day} ${months[d.getMonth()]}`;
  };

  const springBootTask = tasks.find(t => t.id === 'acc_spring');
  const springBootDateStr = springBootTask ? formatTaskDate(new Date(springBootTask.date)) : '03 Nov';

  return (
    <main className="app-container">
      {/* HERO BANNER COMPACTO */}
      <section className="hero-banner">
        <div className="hero-content">
          <h2 className="hero-title" id="heroGreetingTitle">
            <span id="heroGreetingTime">{getGreeting()}</span>, <span className="gradient-text">{userName}</span>
          </h2>
          <p className="hero-subtitle">
            Supervisa tus entregas, accede a tus pilares de contenido con navegación lateral, calcula tus notas de evaluación continua y mantén tus calendarios sincronizados en un solo lugar.
          </p>

          {/* Quick Stats */}
          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <div className="stat-icon-wrap">🚀</div>
              <div>
                <div className="stat-val">4</div>
                <div className="stat-label">Cursos Activos</div>
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-icon-wrap">📅</div>
              <div>
                <div className="stat-val">{tasks.length > 0 ? tasks.length : '--'}</div>
                <div className="stat-label">Hitos en Radar</div>
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-icon-wrap">⏳</div>
              <div>
                <div className="stat-val">{springBootDateStr}</div>
                <div className="stat-label">Cierre SpringBoot</div>
              </div>
            </div>
            <div className="hero-stat-card hero-stat-next" id="nextDeliveryCard">
              <div className="stat-icon-wrap">📬</div>
              <div>
                <div className="stat-val" id="nextDeliveryDate">
                  {nextTask ? formatTaskDate(nextTask.dateObj) : '--'}
                </div>
                <div className="stat-label" id="nextDeliveryLabel" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                  {nextTask ? (
                    <>
                      <span className="pill-badge pill-green" id="nextDeliveryBadge">
                        {nextTask.badge}
                      </span>
                      <span id="nextDeliveryTask" style={{ fontWeight: 600, color: 'var(--text-title)' }}>
                        {nextTask.task || nextTask.course}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>Sin entregas pendientes</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER DESTACADO: BLOG & EMPLEABILIDAD 4.0 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)',
          border: '1px solid rgba(234, 88, 12, 0.3)',
          borderRadius: '16px',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: '0 4px 20px rgba(234, 88, 12, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 500px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ea580c, #f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)'
            }}>
              💼
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '999px', background: 'rgba(234, 88, 12, 0.2)', color: '#ea580c' }}>
                  NUEVO EN BLOG · IPO2
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Orientación Laboral & Marca Personal
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-title)', fontWeight: 700 }}>
                SEO en LinkedIn, Filtros de IA (ATS) y Marca Personal
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Cómo superar al "portero digital" de los algoritmos y destacar con las soft skills más demandadas según el SEPE.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <Link 
              to="/blog/seo-linkedin-filtros-ia" 
              className="theme-btn" 
              style={{ 
                background: 'linear-gradient(135deg, #ea580c, #f97316)', 
                color: '#fff', 
                textDecoration: 'none', 
                padding: '0.55rem 1rem', 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>📖 Leer en el Blog</span> <span>➔</span>
            </Link>
            <Link 
              to="/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats" 
              className="theme-btn" 
              style={{ 
                textDecoration: 'none', 
                padding: '0.55rem 1rem', 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>Temario IPO2</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PILARES DE LA PLATAFORMA (CAMPUS PORTALS) */}
      <section className="campus-section">
        <div className="section-heading">
          <h2>📚 Mis retos</h2>
        </div>

        <div className="campus-grid">
          {/* 1. ACCENTURE SPRINGBOOT */}
          <article className="campus-card card-accenture">
            <div>
              <div className="campus-card-header">
                <div className="campus-card-icon accenture-brand-icon" title="Accenture">
                  <span className="accenture-gt">&gt;</span>
                </div>
                <div className="campus-card-titles">
                  <h3>Accenture</h3>
                  <span className="campus-institution">Especialización Back-End Java · GenAI</span>
                </div>
              </div>
              <div className="campus-features-list" style={{ marginTop: '1rem' }}>
                <a href="https://www.talentoteca.es/" target="_blank" rel="noopener noreferrer" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <img src={talentIcon} alt="Talentoteca" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                  Talentoteca
                </a>
                <Link to="/java" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>☕ Hub Java</Link>
                <Link to="/java/springboot" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>🧠 SpringBoot</Link>
                <Link to="/java/proyectos" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>🚀 Java Proyectos</Link>
                <Link to="/petete" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 'bold' }}>📖 Petete (Total)</Link>
                <Link to="/accenture/tutorias" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>📅 Plan Tutorías</Link>
                <Link to="/accenture/tutorias-codigo" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>💻 Código Tutorías</Link>
                <Link to="/accenture/actividades" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>📦 Actividades</Link>
                <Link to="/accenture/rest-lab" className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }}>🧪 REST Lab</Link>
                <a href={`mailto:${ACCENTURE_CONFIG.contacts.pmo.email}`} className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }} title="Contactar con Ivón (PMO)">
                  📧 PMO ({ACCENTURE_CONFIG.contacts.pmo.name})
                </a>
                <a href={`mailto:${ACCENTURE_CONFIG.contacts.tutor.email}`} className="feature-tag feature-tag-purple" style={{ textDecoration: 'none' }} title="Contactar con Isra">
                  📧 {ACCENTURE_CONFIG.contacts.tutor.name}
                </a>
              </div>
              
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {(ACCENTURE_CONFIG.meetings || [ACCENTURE_CONFIG.meeting]).map((m, idx) => (
                  <div key={m.id || idx} style={{ padding: '0.75rem 0.85rem', background: 'rgba(147, 51, 234, 0.08)', borderLeft: '4px solid #9333ea', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 'bold', color: '#9333ea', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                      <span>📅 {m.title}</span>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(147, 51, 234, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '999px', color: '#9333ea', fontWeight: 600 }}>{m.dateTime}</span>
                    </div>
                    <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <a href={m.teamsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#9333ea', textDecoration: 'none', fontWeight: 'bold' }}>
                        🔗 Unirse por Teams
                      </a>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        ID: {m.teamsId} | Pass: {m.passcode}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="campus-card-actions">
              <Link to="/java/springboot" className="btn-enter-campus btn-accenture">
                <span>📖 Teoría SpringBoot</span> <span className="btn-arrow">➔</span>
              </Link>
              <Link to="/java" className="btn-sub-link">
                <span>☕ Hub Java</span> <span className="btn-arrow">➔</span>
              </Link>
            </div>
          </article>

          {/* 2. IOC DAW CAMPUS */}
          <article className="campus-card card-ioc">
            <div>
              <div className="campus-card-header">
                <div className="campus-card-icon" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#fff', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}>🎓</div>
                <div className="campus-card-titles" style={{ flex: 1 }}>
                  <h3>Campus IOC DAW</h3>
                  <span className="campus-institution">Institut Obert de Catalunya · Desarrollo Web</span>
                </div>
              </div>
              <p className="campus-card-desc">
                Seguimiento de las asignaturas oficiales (ENT, DESP, DIGI, INT, IPO2), radar de fechas límite de EACs, semáforo de entregas y calculadora de notas de Evaluación Continua (AC).
              </p>
            </div>

            <div className="campus-card-actions ioc-card-actions">
              <div className="ioc-subjects-column">
                <Link to="/ioc/ent" className="btn-ioc-subject-row btn-ioc-ent" title="Entornos de Desarrollo">
                  <span className="btn-ioc-icon">🛠️</span>
                  <div className="btn-ioc-info">
                    <span className="btn-ioc-sigla">ENT</span>
                    <span className="btn-ioc-title">Entornos de Desarrollo</span>
                  </div>
                  <span className="btn-ioc-arrow">➔</span>
                </Link>
                <Link to="/ioc/desp" className="btn-ioc-subject-row btn-ioc-desp" title="Despliegue de Aplicaciones Web">
                  <span className="btn-ioc-icon">🚀</span>
                  <div className="btn-ioc-info">
                    <span className="btn-ioc-sigla">DESP</span>
                    <span className="btn-ioc-title">Despliegue de Aplicaciones Web</span>
                  </div>
                  <span className="btn-ioc-arrow">➔</span>
                </Link>
                <Link to="/ioc/digi" className="btn-ioc-subject-row btn-ioc-digi" title="Digitalización Aplicada">
                  <span className="btn-ioc-icon">💡</span>
                  <div className="btn-ioc-info">
                    <span className="btn-ioc-sigla">DIGI</span>
                    <span className="btn-ioc-title">Digitalización Aplicada</span>
                  </div>
                  <span className="btn-ioc-arrow">➔</span>
                </Link>
                <Link to="/ioc/int" className="btn-ioc-subject-row btn-ioc-int" title="Diseño de Interfaces Web">
                  <span className="btn-ioc-icon">🌐</span>
                  <div className="btn-ioc-info">
                    <span className="btn-ioc-sigla">INT</span>
                    <span className="btn-ioc-title">Diseño de Interfaces Web</span>
                  </div>
                  <span className="btn-ioc-arrow">➔</span>
                </Link>
                <Link to="/ioc/ipo2" className="btn-ioc-subject-row btn-ioc-ipo2" title="Itinerario Personal para la Empleabilidad II">
                  <span className="btn-ioc-icon">💼</span>
                  <div className="btn-ioc-info">
                    <span className="btn-ioc-sigla">IPO2</span>
                    <span className="btn-ioc-title">Itinerario Empleabilidad II</span>
                  </div>
                  <span className="btn-ioc-arrow">➔</span>
                </Link>
                <Link to="/blog/seo-linkedin-filtros-ia" className="btn-ioc-subject-row" style={{ borderLeftColor: '#ea580c', background: 'rgba(234, 88, 12, 0.08)' }} title="Artículo de Blog: SEO en LinkedIn & Filtros de IA">
                  <span className="btn-ioc-icon">📰</span>
                  <div className="btn-ioc-info">
                    <span className="btn-ioc-sigla" style={{ color: '#ea580c' }}>BLOG</span>
                    <span className="btn-ioc-title">SEO LinkedIn & Filtros IA</span>
                  </div>
                  <span className="btn-ioc-arrow">➔</span>
                </Link>
              </div>
            </div>
          </article>

          {/* 3. SEPE MF0492_3 SERVIDOR */}
          <article className="campus-card card-sepe">
            <div>
              <div className="campus-card-header">
                <div className="campus-card-icon" style={{ background: 'linear-gradient(135deg, #ca8a04, #eab308)', color: '#fff', boxShadow: '0 4px 14px rgba(234, 179, 8, 0.35)' }}>💻</div>
                <div className="campus-card-titles">
                  <h3>SEPE — MF0492_3 Servidor Web</h3>
                  <span className="campus-institution">Certificado de Profesionalidad · Entorno Servidor</span>
                </div>
              </div>
              <p className="campus-card-desc">
                Pilar de contenidos teóricos estructurados con navegación lateral (aside), cobertura de los 7 bloques y banco de preguntas de examen.
              </p>
            </div>

            <Link to="/sepe/php" className="btn-enter-campus btn-sepe">
              <span>Explorar Contenidos MF0492_3</span> <span>➔</span>
            </Link>
          </article>

          {/* 4. SEPE IFCD0177 - JAVA POO */}
          <article className="campus-card" style={{ borderColor: 'rgba(249, 115, 22, 0.4)', background: 'linear-gradient(180deg, rgba(249, 115, 22, 0.05) 0%, var(--bg-card) 100%)' }}>
            <div>
              <div className="campus-card-header">
                <div className="campus-card-icon" style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', color: '#fff', boxShadow: '0 4px 14px rgba(249, 115, 22, 0.35)' }}>☕</div>
                <div className="campus-card-titles">
                  <h3>SEPE — IFCD0177 Java POO</h3>
                  <span className="campus-institution">Desarrollo Orientado a Objetos con Java · Cierre 30 Nov</span>
                </div>
              </div>
              <p className="campus-card-desc">
                Especialidad oficial en programación orientada a objetos con Java: herencia, polimorfismo, colecciones, JDBC y buenas prácticas de desarrollo empresarial.
              </p>
              <div className="campus-features-list">
                <span className="feature-tag feature-tag-purple">🏛️ Especialidad SEPE</span>
                <span className="feature-tag">⏳ Fin: 30 Noviembre</span>
                <span className="feature-tag">📂 docs/ifcd0177-java</span>
              </div>
            </div>

            <Link to="/sepe/ifcd0177" className="btn-enter-campus" style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', color: '#fff', textDecoration: 'none' }}>
              <span>Entrar a IFCD0177 Java POO</span> <span>➔</span>
            </Link>
          </article>

          {/* 4. MATRIZ DE CONOCIMIENTOS TRANSVERSALES (SECOND BRAIN) */}
          <article className="campus-card" style={{ borderColor: 'rgba(139, 92, 246, 0.4)', background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, var(--bg-card) 100%)' }}>
            <div>
              <div className="campus-card-header">
                <div className="campus-card-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)' }}>🧠</div>
                <div className="campus-card-titles">
                  <h3>Matriz de Conocimientos</h3>
                  <span className="campus-institution">Base Común: Git, Docker, HTTP, SQL, SOLID & GenAI</span>
                </div>
              </div>

              <p className="campus-card-desc">
                Hub transversal que conecta los conocimientos compartidos entre Accenture, IOC y SEPE. Incluye comparativas cruzadas y chuletas de comandos rápidos.
              </p>

              <div className="campus-features-list">
                <span className="feature-tag">🌿 Git & Versionado</span>
                <span className="feature-tag">🌐 HTTP & APIs REST</span>
                <span className="feature-tag">🐳 Docker & Servidores</span>
                <span className="feature-tag">🗄️ SQL & Persistencia</span>
                <span className="feature-tag">📐 Patrones & Arquitectura</span>
              </div>
            </div>

            <Link to="/brain" className="btn-enter-campus" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#ffffff', textDecoration: 'none' }}>
              <span>Abrir Second Brain & Matriz</span> <span>➔</span>
            </Link>
          </article>

          {/* 5. INTELIGENCIA ARTIFICIAL */}
          <article className="campus-card card-ml">
            <div>
              <div className="campus-card-header">
                <div className="campus-card-icon" style={{ background: 'linear-gradient(135deg, #0284c7, #06b6d4)', color: '#fff', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)' }}>🤖</div>
                <div className="campus-card-titles">
                  <h3>Inteligencia Artificial</h3>
                  <span className="campus-institution">Modelos Predictivos, Data Science & GenAI</span>
                </div>
              </div>

              <p className="campus-card-desc">
                Ecosistema de especialización en Inteligencia Artificial: algoritmos y Machine Learning con Python, y formación avanzada en Ingeniería de IA Generativa.
              </p>

              <div className="campus-features-list">
                <Link to="/sepe/python" className="feature-tag" style={{ textDecoration: 'none', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' }}>🐍 Python & ML</Link>
                <a href="https://www.coursera.org/specializations/ibm-generative-ai-engineering" target="_blank" rel="noopener noreferrer" className="feature-tag" style={{ textDecoration: 'none', background: 'rgba(15, 98, 254, 0.1)', color: '#0f62fe' }}>🤖 IBM GenAI</a>
                <span className="feature-tag">📊 Data Science</span>
                <span className="feature-tag">🧠 Redes Neuronales</span>
              </div>
            </div>

            <div className="campus-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: 'auto' }}>
              <Link 
                to="/sepe/python" 
                className="btn-enter-campus btn-ml-action" 
                style={{ 
                  background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', 
                  color: '#ffffff', 
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  width: '100%'
                }}
              >
                <span>🐍 ML con Python</span> <span>➔</span>
              </Link>
              <a 
                href="https://www.coursera.org/specializations/ibm-generative-ai-engineering" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-enter-campus btn-ibm-action" 
                style={{ 
                  background: 'linear-gradient(135deg, #0043ce 0%, #0f62fe 60%, #4589ff 100%)', 
                  color: '#ffffff', 
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(15, 98, 254, 0.35)',
                  width: '100%'
                }}
              >
                <span>🤖 Ingeniería IBM</span> <span>➔</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
