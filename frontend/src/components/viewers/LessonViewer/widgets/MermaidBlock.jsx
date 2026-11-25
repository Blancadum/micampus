import React, { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

let mermaidInitialized = false;

function ensureMermaidInit() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'default',
    fontFamily: 'inherit'
  });
  mermaidInitialized = true;
}

export default function MermaidBlock({ chart = '' }) {
  const uid = useId().replace(/[:]/g, '_');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const source = String(chart || '').trim();
    if (!source) return;

    ensureMermaidInit();
    mermaid
      .render(`mmd_${uid}`, source)
      .then(({ svg: rendered }) => {
        if (!cancelled) {
          setSvg(rendered);
          setError('');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Error al renderizar diagrama Mermaid');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, uid]);

  if (error) {
    return (
      <pre style={{
        padding: '0.85rem 1rem',
        borderRadius: '12px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto',
        fontSize: '0.82rem'
      }}>
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      style={{
        margin: '1rem 0',
        padding: '1rem',
        borderRadius: '14px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto',
        textAlign: 'center'
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
