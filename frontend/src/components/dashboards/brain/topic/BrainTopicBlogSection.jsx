import React from 'react';
import { Link } from 'react-router-dom';

export default function BrainTopicBlogSection({ blogPost }) {
  if (!blogPost) return null;

  return (
    <section
      id="articulo-blog"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '18px',
        padding: '2rem 2.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.4rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.6rem' }}>📝</span>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-purple)' }}>
            Entrada de Blog & Análisis Técnico
          </span>
          <h2 style={{ margin: '0.2rem 0 0', fontSize: '1.45rem', color: 'var(--text-title)', fontWeight: 800, lineHeight: '1.3' }}>
            {blogPost.headline}
          </h2>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.75', color: 'var(--text-main)' }}>
        {blogPost.intro}
      </p>

      {/* CALLOUT ANALOGÍA DE INGENIERÍA */}
      {blogPost.analogy && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '16px',
            padding: '1.4rem 1.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.9rem' }}>
            <span>💡</span>
            <span>Analogía de Ingeniería: {blogPost.analogy.concept}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.7', color: 'var(--text-title)', fontStyle: 'italic' }}>
            "{blogPost.analogy.metaphor}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '0.2rem' }}>
            <span>🎯</span>
            <span>Conclusión práctica: {blogPost.analogy.takeaway}</span>
          </div>
        </div>
      )}

      {/* EL PROBLEMA REAL */}
      {blogPost.theProblem && (
        <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '1.2rem', margin: '0.2rem 0' }}>
          <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', color: 'var(--text-title)', fontWeight: 700 }}>
            ⚠️ Qué se rompe en el mundo real si ignoras esto
          </h3>
          <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.65', color: 'var(--text-muted)' }}>
            {blogPost.theProblem}
          </p>
        </div>
      )}

      {/* EL HILO CONDUCTOR TRANSVERSAL */}
      {blogPost.crossCurricularInsight && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '1.1rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.88rem' }}>
            🔗 Conexión de Asignaturas (El hilo invisible de software)
          </span>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--text-main)' }}>
            {blogPost.crossCurricularInsight}
          </p>
        </div>
      )}

      {/* PUENTE DIRECTO A VÍDEOS TEÓRICOS Y ACTIVIDADES ACCENTURE */}
      {blogPost.accentureBridge && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            borderRadius: '14px',
            padding: '1.3rem 1.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            marginTop: '0.4rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🎯</span>
              <span style={{ color: '#06b6d4', fontWeight: 800, fontSize: '0.96rem' }}>
                {blogPost.accentureBridge.title}
              </span>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#8b5cf6',
                background: 'rgba(139, 92, 246, 0.15)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
              }}
            >
              Conexión Directa Bootcamp
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.65', color: 'var(--text-main)' }}>
            {blogPost.accentureBridge.description}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
            {blogPost.accentureBridge.videoUrl && (
              <Link
                to={blogPost.accentureBridge.videoUrl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(6, 182, 212, 0.3)',
                  transition: 'all 0.18s ease',
                }}
              >
                <span>🎬</span>
                <span>{blogPost.accentureBridge.videoTitle || 'Ver Vídeo Teórico'}</span>
                <span style={{ fontSize: '0.9rem' }}>➔</span>
              </Link>
            )}

            {blogPost.accentureBridge.solidVideoUrl && (
              <Link
                to={blogPost.accentureBridge.solidVideoUrl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.35)',
                  color: '#06b6d4',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  transition: 'all 0.18s ease',
                }}
              >
                <span>⚡</span>
                <span>{blogPost.accentureBridge.solidVideoTitle || 'Vídeo SOLID'}</span>
                <span>➔</span>
              </Link>
            )}

            {blogPost.accentureBridge.activitiesUrl && (
              <Link
                to={blogPost.accentureBridge.activitiesUrl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.18s ease',
                }}
              >
                <span>📦</span>
                <span>{blogPost.accentureBridge.activitiesTitle || 'Ir a Actividades Prácticas'}</span>
                <span style={{ fontSize: '0.9rem' }}>➔</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
