import React from 'react';
import { Link } from 'react-router-dom';

export default function BrainTopicHero({ currentTopic, relatedCount = 0 }) {
  if (!currentTopic) return null;

  return (
    <section
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '2.5rem' }}>{currentTopic.emoji}</span>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: 'rgba(139, 92, 246, 0.12)',
              color: 'var(--accent-purple, #8b5cf6)',
              padding: '0.2rem 0.6rem',
              borderRadius: '5px',
            }}
          >
            {currentTopic.topicTag}
          </span>
          <h1 style={{ margin: '0.3rem 0 0', fontSize: '1.9rem', color: 'var(--text-title)', fontWeight: 800 }}>
            {currentTopic.title}
          </h1>

          {/* CLUSTER DE ETIQUETAS DEL TEMA */}
          {currentTopic.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
              {currentTopic.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/brain?tag=${encodeURIComponent(tag)}`}
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    background: 'rgba(139, 92, 246, 0.08)',
                    color: 'var(--accent-purple, #8b5cf6)',
                    textDecoration: 'none',
                    border: '1px solid rgba(139, 92, 246, 0.22)',
                    transition: 'all 0.2s',
                  }}
                >
                  🏷️ {tag}
                </Link>
              ))}
            </div>
          )}

          {/* BYLINE EDITORIAL DEL BLOG */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', marginTop: '0.55rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>✍️ {currentTopic.author || 'Blanca · Cuaderno de Ingeniería'}</span>
            <span>•</span>
            <span>📅 {currentTopic.date || 'Octubre 2026'}</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>⏱️ {currentTopic.readTime || '6 min de lectura'}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '1.02rem', color: 'var(--text-main)', lineHeight: '1.6', margin: '0.5rem 0 1.5rem' }}>
        {currentTopic.summary}
      </p>

      {/* Accesos rápidos dentro de la página */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {currentTopic.blogPost && (
          <a
            href="#articulo-blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              color: 'var(--accent-purple)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 800,
            }}
          >
            <span>📝</span> <span>Entrada de Blog</span>
          </a>
        )}

        {relatedCount > 0 && (
          <a
            href="#conceptos-cruzados"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 800,
            }}
          >
            <span>🕸️</span> <span>Conceptos Cruzados ({relatedCount})</span>
          </a>
        )}

        {currentTopic.cavemanScript && (
          <a
            href="#script-caveman"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#d97706',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 800,
            }}
          >
            <span>🪨</span> <span>Script Caveman (Python)</span>
          </a>
        )}

        {currentTopic.externalLink && (
          currentTopic.externalLink.startsWith('http') ? (
            <a
              href={currentTopic.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                background:
                  currentTopic.externalLinkIcon === '🎬'
                    ? 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                boxShadow:
                  currentTopic.externalLinkIcon === '🎬'
                    ? '0 2px 8px rgba(6, 182, 212, 0.3)'
                    : '0 2px 8px rgba(16, 185, 129, 0.3)',
              }}
            >
              <span>{currentTopic.externalLinkIcon || '🌱'}</span>
              <span>{currentTopic.externalLinkLabel || 'Abrir Enlace Relacionado'}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>↗</span>
            </a>
          ) : (
            <Link
              to={currentTopic.externalLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                background:
                  currentTopic.externalLinkIcon === '🎬'
                    ? 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                boxShadow:
                  currentTopic.externalLinkIcon === '🎬'
                    ? '0 2px 8px rgba(6, 182, 212, 0.3)'
                    : '0 2px 8px rgba(16, 185, 129, 0.3)',
              }}
            >
              <span>{currentTopic.externalLinkIcon || '🌱'}</span>
              <span>{currentTopic.externalLinkLabel || 'Abrir Enlace Relacionado'}</span>
            </Link>
          )
        )}

        {currentTopic.practiceLink && (
          <Link
            to={currentTopic.practiceLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
            }}
          >
            <span>📦</span>
            <span>{currentTopic.practiceLinkLabel || 'Actividades Prácticas'}</span>
          </Link>
        )}

        <a
          href="#puntos-comunes"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '8px',
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            color: '#2563eb',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
          }}
        >
          <span>📌</span> <span>Puntos en Común</span>
        </a>

        <a
          href="#tutorial"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            color: '#10b981',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
          }}
        >
          <span>🛠️</span> <span>Tutorial Paso a Paso</span>
        </a>

        {/* Acceso directo a 12 Prompts si el tema los tiene */}
        {currentTopic.accentureActivitiesPrompts && (
          <a
            href="#prompts-accenture"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(117, 0, 193, 0.1)',
              border: '1px solid rgba(117, 0, 193, 0.35)',
              color: '#7500c1',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 800,
            }}
          >
            <span>🐙</span> <span>12 Prompts Copilot (Accenture)</span>
          </a>
        )}

        {/* Acceso directo a Hermes Config si es el tema de Hermes */}
        {currentTopic.id === 'hermes-local' && (
          <a
            href="#hermes-config"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              color: 'var(--accent-purple)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 800,
            }}
          >
            <span>🕊️</span> <span>Archivos Hermes & Harness</span>
          </a>
        )}

        {(currentTopic.audioUrl || currentTopic.videoUrl || currentTopic.mediaList) && (
          <a
            href="#media-player"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#dc2626',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 800,
            }}
          >
            <span>{currentTopic.videoUrl || (currentTopic.mediaList && currentTopic.mediaList.some((m) => m.type === 'video')) ? '🎬' : '🎙️'}</span>
            <span>{currentTopic.videoUrl || (currentTopic.mediaList && currentTopic.mediaList.some((m) => m.type === 'video')) ? 'Vídeo / Multimedia' : 'Podcast Técnico'}</span>
          </a>
        )}

        <a
          href="#hoja-amarilla-prompt"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '8px',
            background: 'rgba(234, 179, 8, 0.15)',
            border: '1px solid rgba(234, 179, 8, 0.4)',
            color: '#ca8a04',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 800,
          }}
        >
          <span>💛</span> <span>Hoja Amarilla (Prompt NotebookLM)</span>
        </a>
      </div>
    </section>
  );
}
