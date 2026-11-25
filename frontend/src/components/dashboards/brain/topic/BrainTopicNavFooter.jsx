import React from 'react';
import { Link } from 'react-router-dom';

export default function BrainTopicNavFooter({ prevTopic, nextTopic }) {
  if (!prevTopic && !nextTopic) return null;

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '2rem',
        marginTop: '1rem',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {prevTopic ? (
        <Link
          to={`/brain/${prevTopic.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.2rem',
            borderRadius: '10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
          }}
        >
          <span>←</span>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tema anterior</span>
            <span>{prevTopic.emoji} {prevTopic.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextTopic && (
        <Link
          to={`/brain/${nextTopic.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.2rem',
            borderRadius: '10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            textAlign: 'right',
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tema siguiente</span>
            <span>{nextTopic.emoji} {nextTopic.title}</span>
          </div>
          <span>→</span>
        </Link>
      )}
    </section>
  );
}
