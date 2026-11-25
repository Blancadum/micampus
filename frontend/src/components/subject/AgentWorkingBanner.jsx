import React, { useEffect, useState } from 'react';

const PHASE_MESSAGES = {
  pipeline: [
    'Leyendo PDFs oficiales y comparando con el temario...',
    'El Auditor está detectando huecos y conceptos clave...',
    'El Escritor está maquetando la lección en Markdown...'
  ],
  glossary: [
    'Analizando los documentos de la unidad...',
    'Extrayendo términos clave y definiciones...',
    'Preparando el glosario listo para guardar...'
  ],
  chat: [
    'El agente está consultando el material de la unidad...',
    'Analizando tu petición y redactando respuesta...',
    'Formateando el resultado en Markdown...'
  ],
  sync: [
    'Escaneando PDFs oficiales en la carpeta de material...',
    'Extrayendo y normalizando texto por unidades...'
  ]
};

/**
 * Ilustración SVG animada + indicador de progreso dinámico mientras trabajan los agentes IA.
 */
export default function AgentWorkingBanner({ mode = 'pipeline', unitLabel = '', accent = '#16a34a' }) {
  const messages = PHASE_MESSAGES[mode] || PHASE_MESSAGES.pipeline;
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    setStepIdx(0);
    const id = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % messages.length);
    }, 2400);
    return () => clearInterval(id);
  }, [mode, messages.length]);

  const titleByMode = {
    pipeline: 'Ejecutando comparativa Auditor → Escritor',
    glossary: 'Extrayendo glosario de la unidad',
    chat: 'Agente IA procesando tu consulta',
    sync: 'Sincronizando documentos PDF'
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.15rem',
        padding: '1rem 1.25rem',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${accent}12 0%, rgba(59, 130, 246, 0.08) 100%)`,
        border: `1px solid ${accent}44`,
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes mcSpinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mcSpinReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes mcPulseNode { 0%, 100% { transform: scale(0.92); opacity: 0.75; } 50% { transform: scale(1.12); opacity: 1; } }
        @keyframes mcFlowDash { to { stroke-dashoffset: -28; } }
        @keyframes mcShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(220%); } }
      `}</style>

      {/* Ilustración SVG dinámica */}
      <svg
        width="88"
        height="64"
        viewBox="0 0 88 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        {/* Flujo de datos animado entre nodos */}
        <path
          d="M22 32 C34 18, 54 18, 66 32"
          stroke={accent}
          strokeWidth="2"
          strokeDasharray="5 4"
          style={{ animation: 'mcFlowDash 1.1s linear infinite' }}
        />
        <path
          d="M22 32 C34 46, 54 46, 66 32"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5 4"
          style={{ animation: 'mcFlowDash 1.1s linear infinite reverse' }}
        />

        {/* Nodo izquierdo: Auditor / PDF */}
        <g style={{ transformOrigin: '20px 32px', animation: 'mcPulseNode 1.8s ease-in-out infinite' }}>
          <circle cx="20" cy="32" r="12" fill="var(--bg-card, #ffffff)" stroke={accent} strokeWidth="2" />
          <text x="20" y="36" textAnchor="middle" fontSize="12">🔍</text>
        </g>

        {/* Núcleo central giratorio */}
        <g style={{ transformOrigin: '44px 32px', animation: 'mcSpinSlow 6s linear infinite' }}>
          <circle cx="44" cy="32" r="14" stroke={`${accent}55`} strokeWidth="1.5" strokeDasharray="4 3" />
        </g>
        <g style={{ transformOrigin: '44px 32px', animation: 'mcSpinReverse 4s linear infinite' }}>
          <circle cx="44" cy="32" r="9" stroke="#3b82f688" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
        <circle cx="44" cy="32" r="4" fill={accent} />

        {/* Nodo derecho: Escritor / Resultado */}
        <g style={{ transformOrigin: '68px 32px', animation: 'mcPulseNode 1.8s ease-in-out 0.6s infinite' }}>
          <circle cx="68" cy="32" r="12" fill="var(--bg-card, #ffffff)" stroke="#3b82f6" strokeWidth="2" />
          <text x="68" y="36" textAnchor="middle" fontSize="12">✍️</text>
        </g>
      </svg>

      {/* Texto de estado + barra animada */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: '0.92rem', color: 'var(--text-title, #0f172a)' }}>
            {titleByMode[mode] || titleByMode.pipeline}
          </strong>
          {unitLabel && (
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.12rem 0.5rem',
              borderRadius: '999px',
              background: `${accent}20`,
              color: accent
            }}>
              {unitLabel}
            </span>
          )}
        </div>

        <div style={{ fontSize: '0.83rem', color: 'var(--text-muted, #475569)', fontWeight: 500 }}>
          {messages[stepIdx]}
        </div>

        <div style={{
          marginTop: '0.2rem',
          height: '5px',
          width: '100%',
          borderRadius: '999px',
          background: 'rgba(148, 163, 184, 0.22)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '45%',
            height: '100%',
            borderRadius: '999px',
            background: `linear-gradient(90deg, ${accent}, #3b82f6)`,
            animation: 'mcShimmer 1.35s ease-in-out infinite'
          }} />
        </div>
      </div>
    </div>
  );
}
