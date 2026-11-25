import React, { useState, useMemo } from 'react';

const MODULE_BLOCK_FILTERS = [
  { id: 'all', label: 'Todas (12)' },
  { id: 'Bloque 1', label: '📁 Bloque 1: IoC & DI' },
  { id: 'Bloque 2', label: '📁 Bloque 2: API REST' },
  { id: 'Bloque 3', label: '📁 Bloque 3: JPA & DTOs' },
  { id: 'Bloque 4', label: '📁 Bloque 4: JWT & Tests' },
];

export default function BrainTopicCopilotDossier({ activitiesPrompts }) {
  const [activeBlockFilter, setActiveBlockFilter] = useState('all');
  const [copiedActivityId, setCopiedActivityId] = useState(null);
  const [wrapLines, setWrapLines] = useState(true);

  const filteredActivities = useMemo(() => {
    if (!activitiesPrompts) return [];
    if (activeBlockFilter === 'all') return activitiesPrompts;
    return activitiesPrompts.filter((p) => p.module.includes(activeBlockFilter));
  }, [activitiesPrompts, activeBlockFilter]);

  if (!activitiesPrompts || activitiesPrompts.length === 0) return null;

  const handleCopyPrompt = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedActivityId(id);
      setTimeout(() => setCopiedActivityId(null), 2000);
    });
  };

  return (
    <section id="prompts-accenture" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🐙</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--text-title)', fontWeight: 800 }}>
              Las 12 Actividades de Accenture: Prompts Listos para Copilot
            </h2>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Espacios optimizados para copiar código y directrices de Token Economy para cada entrega
            </span>
          </div>
        </div>

        {/* FILTROS POR BLOQUE FORMATIVO */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {MODULE_BLOCK_FILTERS.map((b) => {
            const isActive = activeBlockFilter === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setActiveBlockFilter(b.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
                  color: isActive ? 'var(--accent-purple)' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* LISTADO DE ACTIVIDADES EN FORMATO DOSSIER / CARPETAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* CABECERA DE LA ACTIVIDAD */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(117, 0, 193, 0.12)',
                    color: '#7500c1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    border: '1px solid rgba(117, 0, 193, 0.25)',
                  }}
                >
                  #{act.numero}
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    {act.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(117, 0, 193, 0.08)', color: '#7500c1' }}>
                      {act.module}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>•</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Categoría: {act.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTÓN COPIAR PROMPT */}
              <button
                type="button"
                onClick={() => handleCopyPrompt(act.id, act.markdownPrompt)}
                style={{
                  background: copiedActivityId === act.id ? '#15803d' : 'linear-gradient(135deg, #7500c1 0%, #8b5cf6 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.55rem 1.1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 2px 8px rgba(117, 0, 193, 0.25)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{copiedActivityId === act.id ? '✓' : '📋'}</span>
                <span>{copiedActivityId === act.id ? '¡Prompt Copiado!' : 'Copiar Prompt para Copilot'}</span>
              </button>
            </div>

            {/* RECOMENDACIÓN POO Y TOKEN ECONOMY */}
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '10px',
                padding: '0.85rem 1.1rem',
                fontSize: '0.86rem',
                lineHeight: '1.5',
                color: 'var(--text-main)',
              }}
            >
              <strong style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                <span>💡</span> Recomendación POO & Token Economy:
              </strong>
              {act.recommendation}
            </div>

            {/* BLOQUE DE MARKDOWN COPIABLE */}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)' }}>
                  Markdown para Copilot Chat o .github/copilot-instructions.md
                </span>
                <button
                  type="button"
                  onClick={() => setWrapLines(!wrapLines)}
                  style={{
                    background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                    borderRadius: '5px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
                >
                  {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
                </button>
              </div>
              <pre
                style={{
                  background: '#011627',
                  color: '#d6deeb',
                  padding: '1.1rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  margin: 0,
                  whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
                  wordBreak: wrapLines ? 'break-word' : 'normal',
                  overflowX: wrapLines ? 'hidden' : 'auto',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  lineHeight: '1.55',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <code>{act.markdownPrompt}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
