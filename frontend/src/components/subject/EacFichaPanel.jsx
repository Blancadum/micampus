import React from 'react';
import { matchEacForTask } from '../../utils/eacMatcher';

/**
 * Ficha pedagógica desplegable de una EAC: explica su finalidad, sentido en la práctica real
 * y relación explicativa con la teoría (sin botones hacia el temario).
 */
export default function EacFichaPanel({
  fichaTask,
  eacList,
  lessons,
  accent,
  onClose,
  onOpenTutorial,
}) {
  if (!fichaTask) return null;

  const fichaEac = matchEacForTask(fichaTask, eacList);
  const numMatch = (fichaEac?.id || fichaTask.title || '').match(/(?:eac|eaf)\s*(\d+)/i);
  const eacNum = numMatch ? numMatch[1] : null;
  const relatedLessons = eacNum
    ? lessons.filter((l) => {
        const u = (l.unit || '').toLowerCase();
        return u.includes(`eac ${eacNum}`)
          || u.includes(`eac${eacNum}`)
          || new RegExp(`^(?:u|unidad|bloque)\\s*${eacNum}\\b`, 'i').test(u)
          || (eacNum === '2' && u.includes('git'));
      })
    : [];

  return (
    <div
      id="eac-ficha-section"
      style={{
        marginTop: '1.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `5px solid ${accent}`,
        borderRadius: '16px',
        padding: '1.35rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            📋 Ficha de la Actividad
          </div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-title)' }}>{fichaTask.title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
            background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer'
          }}
        >
          ✕ Cerrar ficha
        </button>
      </div>

      {fichaEac?.ficha ? (
        <>
          <div style={{
            background: `${accent}10`,
            border: `1px solid ${accent}35`,
            borderRadius: '12px',
            padding: '0.95rem 1.15rem'
          }}>
            <strong style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.9rem', color: accent }}>
              🎯 Finalidad de la EAC (Por qué y para qué)
            </strong>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {fichaEac.ficha.finalidad}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ fontSize: '0.92rem', color: 'var(--text-title)' }}>
              🌍 Sentido en la práctica real y relación con la teoría:
            </strong>
            {fichaEac.ficha.partes.map((parte, pIdx) => (
              <div key={pIdx} style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.95rem 1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem'
              }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-title)' }}>{parte.titulo}</strong>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  <strong>Para qué sirve:</strong> {parte.paraQueSirve}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  <strong style={{ color: 'var(--text-title)' }}>En la práctica real:</strong> {parte.contextoReal}
                </div>
                {(parte.relacionTeoria || parte.temaTitulo) && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                    <strong style={{ color: accent }}>Relación con la teoría:</strong>{' '}
                    {parte.relacionTeoria || `Aplica directamente los conceptos del tema «${parte.temaTitulo}».`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {!(fichaEac?.checklist?.length > 0) && (fichaEac?.description || fichaTask.description) && (
            <p style={{ margin: 0, fontSize: '0.93rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {fichaEac?.description || fichaTask.description}
            </p>
          )}

          {fichaEac?.checklist?.length > 0 && (
            <div style={{ background: 'var(--bg-subtle)', borderRadius: '12px', padding: '0.9rem 1.1rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.86rem', color: 'var(--text-title)' }}>
                🎯 Contenidos y objetivos clave:
              </strong>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                {fichaEac.checklist.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {relatedLessons.length > 0 && (
            <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text-title)' }}>📖 Relación con el temario teórico:</strong>{' '}
              Esta actividad aplica los contenidos de{' '}
              {relatedLessons.map((l) => l.title).join(', ')}.
            </div>
          )}
        </>
      )}

      {fichaEac && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => onOpenTutorial(fichaEac.id)}
            style={{
              padding: '0.5rem 1rem', borderRadius: '10px', border: 'none',
              background: accent, color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
            }}
          >
            🛠️ Abrir Tutorial Paso a Paso
          </button>
        </div>
      )}
    </div>
  );
}
