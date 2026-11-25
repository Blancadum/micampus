import React, { useState } from 'react';

export default function BrainTopicCavemanSection({ cavemanScript }) {
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(true);

  if (!cavemanScript) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(cavemanScript.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="script-caveman" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🪨</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-title)', fontWeight: 800 }}>
            Script Python · Modo Caveman (Cero Florituras, Solo Ejecución)
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Automatización bruta sin cordialidad: entrada → proceso → salida o muerte.
          </span>
        </div>
      </div>

      <div style={{ background: '#0b0f19', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '16px', padding: '1.5rem', position: 'relative' }}>
        {/* BADGE DEL PROMPT CAVEMAN */}
        <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '0.65rem 0.9rem', marginBottom: '1rem', color: '#f59e0b', fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: '1.5' }}>
          <strong style={{ display: 'block', marginBottom: '0.2rem' }}>🪨 PROMPT CAVEMAN ORIGINAL:</strong>
          {cavemanScript.prompt}
        </div>

        {/* TITULO Y BOTON COPIAR SCRIPT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>
            🐍 {cavemanScript.title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              type="button"
              onClick={() => setWrapLines(!wrapLines)}
              style={{
                background: wrapLines ? 'rgba(245, 158, 11, 0.15)' : '#1e293b',
                border: '1px solid #334155',
                color: wrapLines ? '#fbbf24' : '#94a3b8',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
              title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
            >
              {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
            </button>
            <button
              onClick={handleCopy}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                color: copied ? '#10b981' : '#f8fafc',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {copied ? '✓ Script Copiado' : '📋 Copiar Script'}
            </button>
          </div>
        </div>

        {/* CODIGO PYTHON */}
        <pre
          style={{
            background: '#020617',
            color: '#e2e8f0',
            padding: '1.1rem',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '0.84rem',
            lineHeight: '1.55',
            margin: '0 0 1rem',
            whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
            wordBreak: wrapLines ? 'break-word' : 'normal',
            overflowX: wrapLines ? 'hidden' : 'auto',
            border: '1px solid #1e293b',
          }}
        >
          <code>{cavemanScript.code}</code>
        </pre>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.5' }}>
          <strong>Lógica Caveman:</strong> {cavemanScript.explanation}
        </p>
      </div>
    </section>
  );
}
