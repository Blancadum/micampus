import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BrainMatrixCard({ card, activeTag, onSelectTag }) {
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(true);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(card.cheat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article 
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '1.65rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.2s, box-shadow 0.2s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>
          {card.topicTag}
        </span>
        <span style={{ fontSize: '1.35rem' }}>{card.emoji}</span>
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
          {card.title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
          {card.summary}
        </p>
      </div>

      {/* ETIQUETAS ASOCIADAS A LA TARJETA */}
      {card.tags && card.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {card.tags.map((t, idx) => {
            const isTagSelected = activeTag === t;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectTag(isTagSelected ? 'all' : t);
                }}
                style={{
                  background: isTagSelected ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  border: isTagSelected ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                  color: isTagSelected ? 'var(--accent-purple)' : 'var(--text-muted)',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  fontWeight: isTagSelected ? 800 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                #{t}
              </button>
            );
          })}
        </div>
      )}

      {/* DOSSIER BADGES */}
      {card.accentureActivitiesPrompts && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.75rem', borderRadius: '8px', background: 'rgba(117, 0, 193, 0.08)', border: '1px solid rgba(117, 0, 193, 0.25)', fontSize: '0.76rem', color: '#7500c1', fontWeight: 700 }}>
          <span>📁</span>
          <span>Dossier: Incluye los 12 Prompts de Copilot para actividades de Accenture</span>
        </div>
      )}
      {card.id === 'hermes-local' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.75rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', fontSize: '0.76rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
          <span>🕊️</span>
          <span>Dossier: Incluye soul.md, user.md, tools.md y arquitectura del Harness</span>
        </div>
      )}

      {/* COMPARATIVA CRUZADA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.25rem 0' }}>
        {card.crossCompare.map((item, idx) => {
          const badgeStyles = {
            acc: { bg: 'rgba(117, 0, 193, 0.1)', color: '#7500c1', border: '1px solid rgba(117, 0, 193, 0.25)' },
            ioc: { bg: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.25)' },
            sep: { bg: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)' }
          }[item.type] || { bg: 'var(--bg-primary)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' };

          return (
            <div key={idx} style={{ background: 'var(--bg-primary)', borderRadius: '10px', padding: '0.65rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.84rem' }}>
              <span style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, ...badgeStyles }}>
                {item.campus}
              </span>
              <div style={{ color: 'var(--text-main)', lineHeight: 1.4 }}>
                {item.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* CHULETA / CODIGO */}
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)' }}>
            Chuleta Rápida
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setWrapLines(!wrapLines);
              }}
              style={{
                background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                border: wrapLines ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--border-subtle)',
                color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                fontSize: '0.7rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.12rem 0.45rem',
                borderRadius: '4px'
              }}
              title={wrapLines ? 'Desactivar ajuste de línea' : 'Ajustar líneas al ancho de la tarjeta'}
            >
              {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                color: copied ? 'var(--accent-green, #10b981)' : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              title="Copiar código al portapapeles"
            >
              {copied ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
        </div>
        <pre style={{ 
          background: '#011627', 
          color: '#d6deeb', 
          padding: '0.85rem 1rem', 
          borderRadius: '8px', 
          fontFamily: 'var(--font-mono, monospace)', 
          fontSize: '0.8rem', 
          whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
          wordBreak: wrapLines ? 'break-word' : 'normal',
          overflowX: wrapLines ? 'hidden' : 'auto',
          margin: 0,
          lineHeight: 1.5,
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <code>{card.cheat}</code>
        </pre>
      </div>

      {/* BOTÓN PÁGINA HIJA DE BRAIN */}
      <div style={{ marginTop: '0.85rem' }}>
        <Link
          to={`/brain/${card.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 0.95rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.12))',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            color: 'var(--text-title)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.85rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.22), rgba(59, 130, 246, 0.22))';
            e.currentTarget.style.borderColor = 'var(--accent-purple)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.12))';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.35)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span>📖</span>
            <span>Leer más</span>
            {card.readTime && (
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                · {card.readTime}
              </span>
            )}
          </span>
          <span style={{ fontSize: '1rem', color: 'var(--accent-purple)' }}>➔</span>
        </Link>
      </div>
    </article>
  );
}
