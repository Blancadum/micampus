import React, { useState } from 'react';

export default function BrainTopicYellowPad({ currentTopic }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!currentTopic || !currentTopic.notebookLmPrompt) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentTopic.notebookLmPrompt).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2400);
    });
  };

  return (
    <section id="hoja-amarilla-prompt" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.6rem' }}>💛</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>
            Hoja de Notas: Prompt para NotebookLM
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Pega este prompt en NotebookLM para generar tu vídeo o podcast explicativo de estudio
          </span>
        </div>
      </div>

      {/* LA HOJA AMARILLA ESTILO POST-IT / LEGAL PAD */}
      <div
        style={{
          position: 'relative',
          background: '#fef9c3', // Amarillo cálido de bloc legal
          backgroundImage: 'linear-gradient(#fef08a 1px, transparent 1px)',
          backgroundSize: '100% 1.8rem',
          borderRadius: '8px',
          border: '1px solid #fde047',
          borderTop: '12px solid #eab308', // Cabecera de bloc engomado
          padding: '2rem 2.2rem 2.2rem 3.5rem', // Margen izquierdo para emular margen rojo
          boxShadow: '0 12px 28px -6px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)',
          color: '#422006', // Tinta sepia oscura
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* LÍNEA DE MARGEN ROJA VERTICAL DEL BLOC */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '2.4rem',
            width: '2px',
            background: 'rgba(239, 68, 68, 0.45)', // Línea roja tenue de libreta
            pointerEvents: 'none',
          }}
        />

        {/* CHINCHETA / CINTA ADHESIVA DECORATIVA */}
        <div
          style={{
            position: 'absolute',
            top: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '3px 18px',
            borderRadius: '3px',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#713f12',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          📌 NOTEBOOKLM PROMPT READY
        </div>

        {/* ENCABEZADO DE LA HOJA AMARILLA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px dashed #ca8a04' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#713f12' }}>
              📝 Prompt para Vídeo / Podcast Explicativo: {currentTopic.title}
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#854d0e', fontWeight: 600 }}>
              Optimizado para Gemini & NotebookLM Audio Overview / Video Script
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleCopyPrompt}
              style={{
                background: copiedPrompt ? '#15803d' : '#854d0e',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.55rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{copiedPrompt ? '✓' : '📋'}</span>
              <span>{copiedPrompt ? '¡Copiado al Portapapeles!' : 'Copiar Prompt para NotebookLM'}</span>
            </button>

            <a
              href="https://notebooklm.google.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#ffffff',
                color: '#713f12',
                border: '1px solid #ca8a04',
                borderRadius: '8px',
                padding: '0.55rem 0.9rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <span>🚀</span>
              <span>Ir a NotebookLM ↗</span>
            </a>
          </div>
        </div>

        {/* TEXTO DEL PROMPT SOBRE LA HOJA */}
        <pre
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            border: '1px solid #fde047',
            borderRadius: '8px',
            padding: '1.2rem',
            fontSize: '0.88rem',
            lineHeight: '1.6',
            color: '#422006',
            whiteSpace: 'pre-wrap',
            fontFamily: 'ui-monospace, Menlo, Monaco, Consolas, monospace',
            margin: 0,
            overflowX: 'auto',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          {currentTopic.notebookLmPrompt}
        </pre>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#854d0e', fontWeight: 600 }}>
          <span>💡 Pégalo como fuente o en la barra de generación de Audio/Vídeo Overview de NotebookLM.</span>
          <span>Campus Blanca · Second Brain</span>
        </div>
      </div>
    </section>
  );
}
