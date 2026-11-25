import React, { useState } from 'react';

export default function BrainTopicTutorialSection({ tutorial }) {
  const [copiedId, setCopiedId] = useState(null);
  const [wrapLines, setWrapLines] = useState(true);

  if (!tutorial || !tutorial.steps || tutorial.steps.length === 0) return null;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section id="tutorial" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🛠️</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>
            Tutorial Paso a Paso & Comandos
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {tutorial.toolName} · Instrucciones reproducibles y comandos probados
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tutorial.steps.map((step) => (
          <div
            key={step.num}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: '#10b981',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  {step.num}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  {step.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => setWrapLines(!wrapLines)}
                  style={{
                    background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-primary)',
                    color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.55rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
                >
                  {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
                </button>
                <button
                  onClick={() => handleCopy(`step_${step.num}`, step.cmd)}
                  style={{
                    background: copiedId === `step_${step.num}` ? '#10b981' : 'var(--bg-primary)',
                    color: copiedId === `step_${step.num}` ? '#fff' : 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.65rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {copiedId === `step_${step.num}` ? '✓ Copiado' : '📋 Copiar'}
                </button>
              </div>
            </div>

            <pre
              style={{
                background: '#011627',
                color: '#d6deeb',
                padding: '1rem',
                borderRadius: '10px',
                fontSize: '0.84rem',
                margin: 0,
                whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
                wordBreak: wrapLines ? 'break-word' : 'normal',
                overflowX: wrapLines ? 'hidden' : 'auto',
                fontFamily: 'ui-monospace, monospace',
                lineHeight: '1.5',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <code>{step.cmd}</code>
            </pre>

            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
              💡 {step.explanation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
