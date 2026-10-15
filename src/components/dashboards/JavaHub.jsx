import React from 'react';
import { Link } from 'react-router-dom';

export default function JavaHub() {
  return (
    <main className="app-container" style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Cabecera / Hero de Java */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)', 
        border: '1px solid rgba(234, 88, 12, 0.2)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
          ☕ Núcleo de Conocimiento
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, margin: '0 0 0.8rem 0', color: 'var(--text-title, #0f172a)' }}>
          Ecosistema Java
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted, #475569)', maxWidth: '750px', lineHeight: 1.6, margin: 0 }}>
          Hub centralizado para el desarrollo en Java: especialización empresarial con <strong>Spring Boot</strong> y el nuevo espacio para <strong>Aplicaciones de Java & Proyectos</strong>.
        </p>
      </section>

      {/* Grid de Rutas e Itinerarios de Java */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
        
        {/* 1. Spring Boot (Accenture) */}
        <article className="campus-card" style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border-subtle, #e2e8f0)', borderRadius: 'var(--radius-lg, 16px)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🌱</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0ea5e9', background: 'rgba(14, 165, 233, 0.1)', padding: '0.25rem 0.65rem', borderRadius: '999px' }}>
                ACCENTURE · L2E
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.6rem 0', color: 'var(--text-title, #0f172a)' }}>
              Spring Boot Enterprise
            </h2>
            <p style={{ color: 'var(--text-muted, #475569)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Guía maestra de supervivencia y temario completo en scroll continuo: Arquitectura REST, Inyección de Dependencias (IoC), JPA/Hibernate, Seguridad y Testing.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link to="/java/springboot" className="btn-enter-campus btn-accenture" style={{ flex: '1 1 180px', textAlign: 'center', justifyContent: 'center' }}>
              <span>Entrar a Spring Boot</span> ➔
            </Link>
            <Link to="/accenture/videos" className="btn-enter-campus" style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>
              <span>🎬 Vídeos Teóricos</span>
            </Link>
            <Link to="/accenture/actividades" className="btn-enter-campus" style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#8b5cf6', textDecoration: 'none', fontWeight: 600 }}>
              <span>🛠️ 12 Prácticas</span>
            </Link>
            <Link to="/accenture/tutorias-codigo" className="btn-enter-campus" style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>
              <span>💻 Código Tutorías (10 Proyectos)</span>
            </Link>
            <Link to="/accenture/tutorias" className="btn-enter-campus" style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', textDecoration: 'none' }}>
              <span>📅 Plan Tutorías</span>
            </Link>
          </div>

        </article>

        {/* 2. Aplicaciones de Java / Proyectos (Nuevo Curso) */}
        <article className="campus-card" style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid rgba(234, 88, 12, 0.25)', borderRadius: 'var(--radius-lg, 16px)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '2.5rem' }}>📦</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', background: 'rgba(234, 88, 12, 0.1)', padding: '0.25rem 0.65rem', borderRadius: '999px' }}>
                NUEVO CURSO
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.6rem 0', color: 'var(--text-title, #0f172a)' }}>
              Aplicaciones de Java & Proyectos
            </h2>
            <p style={{ color: 'var(--text-muted, #475569)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Espacio dedicado para el curso de desarrollo de aplicaciones Java: arquitectura de software, patrones de diseño, colecciones, interfaces gráficas y proyectos reales.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link to="/sepe/ifcd0177" className="btn-enter-campus" style={{ flex: '1 1 180px', background: 'linear-gradient(135deg, #ea580c, #f97316)', color: '#fff', textAlign: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <span>Entrar a IFCD0177 (100h)</span> ➔
            </Link>
            <Link to="/java/proyectos" className="btn-enter-campus" style={{ background: 'rgba(234, 88, 12, 0.1)', border: '1px solid rgba(234, 88, 12, 0.25)', color: '#ea580c', textDecoration: 'none', fontWeight: 600 }}>
              <span>Proyectos</span>
            </Link>
          </div>
        </article>

      </div>
    </main>
  );
}
