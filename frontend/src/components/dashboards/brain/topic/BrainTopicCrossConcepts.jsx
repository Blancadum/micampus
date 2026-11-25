import React from 'react';
import { Link } from 'react-router-dom';

export default function BrainTopicCrossConcepts({ relatedTopics = [] }) {
  if (!relatedTopics || relatedTopics.length === 0) return null;

  return (
    <section id="conceptos-cruzados" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🕸️</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-title)', fontWeight: 800 }}>
            Red de Conceptos Cruzados & Artículos Relacionados
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Haz clic para saltar a otros temas y seguir el hilo conductor entre materias
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.1rem' }}>
        {relatedTopics.map((rel) => (
          <Link
            key={rel.id}
            to={`/brain/${rel.id}`}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '1.25rem',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-xs)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-purple)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(139, 92, 246, 0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: 'rgba(139, 92, 246, 0.12)',
                  color: 'var(--accent-purple)',
                }}
              >
                {rel.topicTag}
              </span>
              <span style={{ fontSize: '1.3rem' }}>{rel.emoji}</span>
            </div>

            <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-title)', fontWeight: 700, lineHeight: '1.35' }}>
              {rel.title}
            </h3>

            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', flex: 1 }}>
              {rel.summary}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.4rem',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.65rem',
                fontSize: '0.78rem',
              }}
            >
              <span style={{ color: 'var(--text-dim)' }}>⏱️ {rel.readTime || '6 min'}</span>
              <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>Leer artículo ➔</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
