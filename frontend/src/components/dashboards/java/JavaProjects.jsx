import React from 'react';
import { Link } from 'react-router-dom';
import PodcastPlayerCard from '../../viewers/LessonViewer/widgets/PodcastPlayerCard';

export default function JavaProjects() {
  const sampleProjects = [
    {
      id: 'p1',
      title: 'Sistema de Gestión y Almacén en Consola',
      level: 'Fundamental',
      desc: 'Manejo de POO pura: encapsulamiento, herencia, colecciones (ArrayList, HashMap) y persistencia en ficheros.',
      icon: '📦',
      status: 'Próximamente'
    },
    {
      id: 'p2',
      title: 'Cliente de Conectividad JDBC & PostgreSQL',
      level: 'Intermedio',
      desc: 'Conexión directa a bases de datos relacionales sin ORM, transacciones, consultas preparadas (PreparedStatement) y Connection Pooling.',
      icon: '🗄️',
      status: 'Planificado'
    },
    {
      id: 'p3',
      title: 'Aplicación de Escritorio con JavaFX / Swing',
      level: 'Avanzado',
      desc: 'Diseño de interfaz gráfica, arquitectura MVC, gestión de eventos asíncronos y empaquetado jlink/jpackage.',
      icon: '🖥️',
      status: 'En Preparación'
    }
  ];

  return (
    <main className="app-container" style={{ padding: '2rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted, #64748b)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/java" style={{ color: 'inherit', textDecoration: 'none' }}>Java</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main, #0f172a)', fontWeight: 600 }}>Proyectos</span>
      </nav>

      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle, #e2e8f0)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#ea580c', background: 'rgba(234, 88, 12, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.8rem' }}>
          🚀 Curso: Aplicaciones de Java
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.8rem 0', color: 'var(--text-title, #0f172a)' }}>
          Java / Proyectos
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted, #64748b)', margin: 0, lineHeight: 1.6 }}>
          Repositorio central de proyectos prácticos, retos de código y arquitecturas del nuevo curso de desarrollo de aplicaciones con Java SE & EE.
        </p>
      </header>

      {/* SECCIÓN DESTACADA: PRÁCTICAS OFICIALES ACCENTURE BOOTCAMP */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '3rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.6rem' }}>
              ⭐ Prácticas Oficiales del Bootcamp
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-title)' }}>
              Accenture · 13 Prácticas Spring Boot
            </h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '720px', lineHeight: 1.5 }}>
              Desarrollo iterativo del proyecto empresarial <code style={{ color: 'var(--accent-blue)', background: 'rgba(56,189,248,0.1)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>taskmanager</code> a lo largo de 13 entregas oficiales: Inversión de Control, Arquitectura en Capas, Persistencia JPA, DTOs, Validaciones, Manejo Global de Errores y Documentación OpenAPI con plantillas de entrega <code>notas/NOTAS-XX.md</code>.
            </p>
          </div>

          <Link
            to="/accenture/actividades"
            className="theme-btn"
            style={{
              textDecoration: 'none',
              background: 'var(--accent-purple, #8b5cf6)',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>Explorar las 12 Prácticas</span>
            <span>→</span>
          </Link>
        </div>

        {/* Acceso Rápido por Bloques de Prácticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <Link
            to="/accenture/actividades/taskmanager/pasos-previos/1-uso-de-ioc"
            style={{
              textDecoration: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '1rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase' }}>Bloque 1 · IoC & DI</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>Actividades 1 a 4</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inyección, Beans y Java Config</span>
          </Link>

          <Link
            to="/accenture/actividades/taskmanager/5-preparacion-entorno"
            style={{
              textDecoration: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '1rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase' }}>Bloque 2 · REST & Servicios</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>Actividades 5 a 7</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Setup, Controllers y @Service</span>
          </Link>

          <Link
            to="/accenture/actividades/taskmanager/8-jpa-entidades"
            style={{
              textDecoration: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '1rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Bloque 3 · Persistencia JPA</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>Actividades 8 y 9</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MySQL, JPQL, Paginación y TX</span>
          </Link>

          <Link
            to="/accenture/actividades/taskmanager/10-dtos"
            style={{
              textDecoration: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '1rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>Bloque 4 · DTOs & Errores</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>Actividades 10 a 12</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DTOs, Validaciones y Errores</span>
          </Link>
        </div>

        {/* RECURSOS MULTIMEDIA DESTACADOS DE ARQUITECTURA SPRING BOOT */}
        <div style={{ marginTop: '1.8rem' }}>
          <PodcastPlayerCard
            podcastUrl="/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3"
            podcastTitle="Reglas de Arquitectura en Spring Boot e Inteligencia Artificial"
            duration="Podcast Técnico Accenture"
            videoUrl="/fuentes/springboot/Por_qué_un_POJO_no_es_una_Entidad.mp4"
            videoTitle="Vídeo: ¿Por qué un POJO no es una Entidad JPA en Spring Boot?"
            mediaList={[
              {
                type: 'audio',
                url: '/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3',
                title: 'Podcast: Reglas de Arquitectura en Spring Boot e IA',
                duration: 'Podcast Técnico'
              },
              {
                type: 'video',
                url: '/fuentes/springboot/Por_qué_un_POJO_no_es_una_Entidad.mp4',
                title: 'Vídeo: ¿Por qué un POJO no es una Entidad JPA?'
              }
            ]}
          />
        </div>
      </section>

      {/* Grid de Otros Proyectos Java */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1.2rem', color: 'var(--text-title)' }}>
        Otros Proyectos y Retos del Ecosistema Java
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {sampleProjects.map(proj => (
          <article key={proj.id} style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border-subtle, #e2e8f0)', borderRadius: 'var(--radius-lg, 16px)', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{proj.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'var(--bg-card-hover, #f1f5f9)', color: 'var(--text-muted, #64748b)' }}>
                  {proj.level}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-title, #0f172a)' }}>
                {proj.title}
              </h3>
              <p style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                {proj.desc}
              </p>
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle, #e2e8f0)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 600 }}>{proj.status}</span>
              <button type="button" disabled style={{ opacity: 0.6, cursor: 'not-allowed', background: 'var(--border-subtle, #e2e8f0)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                Ver Código
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Barra de Navegación Inferior */}
      <footer style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'var(--bg-card, #ffffff)', borderRadius: '12px', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
        <Link to="/java" style={{ textDecoration: 'none', color: 'var(--text-main, #0f172a)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          ← Volver al Hub de Java
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/java/springboot" style={{ textDecoration: 'none', color: '#0ea5e9', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            Teoría Spring Boot →
          </Link>
          <Link to="/accenture/actividades" style={{ textDecoration: 'none', color: '#8b5cf6', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            Prácticas Accenture (13 Retos) →
          </Link>
        </div>
      </footer>
    </main>
  );
}
