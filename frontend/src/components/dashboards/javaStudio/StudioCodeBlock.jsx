import React, { useState } from 'react';
import { IconCopy, IconCheck, IconCode } from './StudioIcons.jsx';

export default function StudioCodeBlock({ code = '', language = 'java', filename = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div
      className="studio-code-block"
      style={{
        background: '#0f172a',
        color: '#f8fafc',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #1e293b',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="studio-code-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          background: '#1e293b',
          fontSize: '0.78rem',
          color: '#94a3b8',
          fontWeight: 600
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <IconCode size={14} />
          <span>{filename || language.toUpperCase()}</span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? '#10b981' : '#94a3b8',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            transition: 'color 0.15s'
          }}
          title="Copiar código"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
        </button>
      </div>
      <pre
        className="studio-code-pre"
        style={{
          margin: 0,
          padding: '1.1rem 1.25rem',
          fontSize: '0.88rem',
          lineHeight: 1.6,
          overflowX: 'auto',
          maxWidth: '100%',
          boxSizing: 'border-box',
          whiteSpace: 'pre',
          fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace"
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
