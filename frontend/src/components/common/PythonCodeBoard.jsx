import React, { useState } from 'react';

/**
 * Pizarra de código interactiva para los ejercicios y scripts de Python.
 * Ofrece:
 * - Ajuste automático de líneas (sin scroll horizontal ni código cortado).
 * - Botón de copiar al portapapeles con confirmación visual.
 * - Botón de descarga directa del script .py.
 * - Selector para alternar entre salto de línea y scroll horizontal si se desea.
 */
export default function PythonCodeBoard({ code, filename = 'script.py' }) {
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(true);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!code) return;
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.py') ? filename : `${filename}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!code) return null;

  return (
    <div style={{
      margin: '0.75rem 0 0 0',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid #334155',
      background: '#090d16',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
    }}>
      {/* Barra de cabecera tipo editor / terminal */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.45rem 0.85rem',
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px'
          }}>
            🐍 PYTHON 3
          </span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>
            {filename}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setWrapLines(!wrapLines); }}
            style={{
              background: wrapLines ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.1)',
              color: wrapLines ? '#60a5fa' : '#94a3b8',
              border: wrapLines ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid #334155',
              padding: '0.22rem 0.55rem',
              borderRadius: '5px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
            title={wrapLines ? 'Desactivar ajuste de línea' : 'Ajustar líneas al ancho de la pantalla'}
          >
            <span>{wrapLines ? '↩ Ajustado' : '↔ Scroll'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            style={{
              background: 'rgba(148, 163, 184, 0.1)',
              color: '#cbd5e1',
              border: '1px solid #334155',
              padding: '0.22rem 0.55rem',
              borderRadius: '5px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
            title="Descargar archivo .py directamente"
          >
            <span>📥 Descargar</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: copied ? '#10b981' : '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '0.24rem 0.65rem',
              borderRadius: '5px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
            title="Copiar código al portapapeles"
          >
            <span>{copied ? '✓ Copiado' : '📋 Copiar'}</span>
          </button>
        </div>
      </div>

      {/* Bloque preformateado */}
      <pre style={{
        margin: 0,
        padding: '0.85rem 1rem',
        fontSize: '0.82rem',
        lineHeight: 1.55,
        fontFamily: "'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, monospace",
        color: '#e2e8f0',
        whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
        wordBreak: wrapLines ? 'break-word' : 'normal',
        overflowX: wrapLines ? 'hidden' : 'auto',
        background: '#090d16'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

