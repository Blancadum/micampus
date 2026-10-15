import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import accentureIcon from '../../assets/img/icons/accenture.png';

export default function AccentureDashboard() {
  const [activities, setActivities] = useState([]);
  const [activityStatus, setActivityStatus] = useState({});

  useEffect(() => {
    fetch('/data/extra/accenture_actividades.json')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));

    const saved = localStorage.getItem('accenture_activities_status');
    if (saved) {
      try {
        setActivityStatus(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleStatus = (id) => {
    const nextStatus = activityStatus[id] === 'Entregada' ? 'Pendiente' : 'Entregada';
    const updated = { ...activityStatus, [id]: nextStatus };
    setActivityStatus(updated);
    localStorage.setItem('accenture_activities_status', JSON.stringify(updated));
  };

  const completedCount = Object.values(activityStatus).filter(s => s === 'Entregada').length;
  const progressPercent = Math.round((completedCount / (activities.length || 12)) * 100);

  return (
    <div className="app-container">
      
      <main className="content-main" role="main" style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="campus-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
          <img src={accentureIcon} alt="Accenture" style={{ width: '48px', height: '48px' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-title)' }}>Accenture Hub</h1>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>Especialización Back-End Java & GenAI</p>
          </div>
        </div>

        {/* Sección de Tarjetas Principales */}
        <div className="campus-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '3rem' }}>
          
          {/* Card: Actividades */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              📦 Actividades Prácticas
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Parada SPRING BOOT: los 13 retos oficiales en formato lección con enunciados limpios, soluciones paso a paso y entrega en L2E.
            </p>
            <Link to="/accenture/actividades" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Abrir Cuaderno de Actividades →
            </Link>
          </article>

          {/* Card: Teoría SpringBoot */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              🧠 Teoría SpringBoot
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Guía teórica completa (IoC, REST, JPA, Seguridad y Testing) con lectura continua, scrollspy y menú lateral de actividades.
            </p>
            <Link to="/java/springboot" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Entrar a la Teoría →
            </Link>
          </article>

          {/* Card: Petete (Versión Integrada) */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.4)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--text-title)' }}>
                📖 Petete · Todo-en-Uno
              </h2>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '999px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                NUEVO · PROVISIONAL
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Versión integrada que combina los 13 retos prácticos del Plan de Tutorías con los vídeos interactivos de YouTube y explicaciones teóricas completas.
            </p>
            <Link to="/petete" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' }}>
              Explorar Guía Petete →
            </Link>
          </article>

          {/* Card: Tutorías en Código */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              💻 Tutorías en Código (Isra)
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Los 10 proyectos Java completos de las tutorías de Spring Boot organizados con índice lateral, código coloreado y descarga de proyectos .zip.
            </p>
            <Link to="/accenture/tutorias-codigo" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Explorar Clases y Proyectos →
            </Link>
          </article>

          {/* Card: Vídeos Teóricos Accenture */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              🎬 Vídeos Recomendados (UPM)
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Marco teórico contextual recomendado por Accenture: Módulos 0, 1 y 2 con fundamentos web, Spring Core, IoC, SOLID y arquitectura por capas.
            </p>
            <Link to="/accenture/videos" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Ver Vídeos & Transcripciones →
            </Link>
          </article>


          {/* Card: REST Lab */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              🧪 REST Lab
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Laboratorio práctico de pruebas de API REST con Postman y Swagger.
            </p>
            <Link to="/accenture/rest-lab" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Entrar al Lab →
            </Link>
          </article>

          {/* Card: Docu para IA */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              🧭 Docu para IA
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Tríada visual para documentar el contexto, la arquitectura y las reglas de trabajo del proyecto.
            </p>
            <Link to="/accenture/documentacion-ia" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Ver la Tríada →
            </Link>
          </article>

          {/* Card: Ruedas de Progreso */}
          <article className="campus-card" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, color: 'var(--text-title)' }}>
              🎯 Ruedas de Progreso
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Seguimiento de habilidades (Soft y Hard Skills) a lo largo del curso.
            </p>
            <Link to="/accenture/ruedas" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Ver Ruedas →
            </Link>
          </article>

        </div>

        {/* To-Do Tracker EXCLUSIVO de Accenture (nunca en GlobalToDo) */}
        <section style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: '16px', 
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem' }}>📋</span>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-title)' }}>
                  Seguimiento de Entregas · Parada Spring Boot
                </h2>
              </div>
              <p style={{ margin: '0.4rem 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Tracker privado del bootcamp. Al hacer clic en cualquier reto accedes a su página de lección con enunciado y solución.
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-title)' }}>
                {completedCount} de {activities.length || 12} ({progressPercent}%)
              </div>
              <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold' }}>
                ⏳ Cierre: 3 Nov 2026 (23:59)
              </span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div style={{ 
            background: 'var(--bg-hover)', 
            height: '10px', 
            borderRadius: '5px', 
            overflow: 'hidden',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              background: 'linear-gradient(90deg, #8b5cf6, #10b981)', 
              height: '100%', 
              width: `${progressPercent}%`, 
              transition: 'width 0.4s ease' 
            }} />
          </div>

          {/* Lista interactiva de las 12 actividades */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '0.8rem' 
          }}>
            {activities.map(act => {
              const isDone = activityStatus[act.id] === 'Entregada';

              return (
                <div 
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    background: isDone ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-hover)',
                    border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 0, flex: 1 }}>
                    <input 
                      type="checkbox"
                      id={`chk-${act.id}`}
                      checked={isDone}
                      onChange={() => toggleStatus(act.id)}
                      style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#10b981' }}
                    />
                    <label 
                      htmlFor={`chk-${act.id}`}
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        cursor: 'pointer', 
                        minWidth: 0,
                        textDecoration: isDone ? 'line-through' : 'none',
                        opacity: isDone ? 0.75 : 1
                      }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {act.numero}. {act.shortTitle ? act.shortTitle.replace(/^[0-9]+\.\s*/, '') : act.title}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {act.category} · Proyecto: {act.proyecto || 'taskmanager'}
                      </span>
                    </label>
                  </div>

                  <Link 
                    to={`/accenture/actividades/${act.slug}`}
                    className="theme-btn"
                    style={{
                      marginLeft: '0.8rem',
                      fontSize: '0.78rem',
                      padding: '0.35rem 0.7rem',
                      textDecoration: 'none',
                      flexShrink: 0,
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    Ver Lección →
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link 
              to="/accenture/actividades"
              className="theme-btn"
              style={{
                textDecoration: 'none',
                padding: '0.7rem 1.8rem',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              📖 Abrir las 12 Actividades en Plantilla de Lección →
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
