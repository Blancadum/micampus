import React, { useState } from 'react';

export default function SubjectGamifyModal({
  isOpen,
  onClose,
  subject,
  units = [],
  defaultUnit = '',
  accent = '#22c55e',
  onGenerated
}) {
  const [unit, setUnit] = useState(defaultUnit || '');
  const [count, setCount] = useState(5);
  const [mode, setMode] = useState('repaso');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/quizzes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: subject.id,
          unit,
          count,
          mode,
          source: 'web'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo generar el quiz.');
      } else {
        if (onGenerated) await onGenerated(data);
        onClose();
      }
    } catch (err) {
      setError(`Error de red: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '18px',
          padding: '1.35rem 1.5rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.12rem', color: 'var(--text-title)' }}>
            🎮 Configurar Quiz Gamificado · {subject.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', fontSize: '1.1rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 700, color: 'var(--text-title)' }}>
            Alcance del contenido
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{
                padding: '0.55rem 0.75rem', borderRadius: '10px',
                border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)'
              }}
            >
              <option value="">🌐 Toda la asignatura (mezcla global)</option>
              {units.map((u) => (
                <option key={u} value={u}>📘 Solo: {u}</option>
              ))}
            </select>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 700, color: 'var(--text-title)' }}>
              Enfoque / Dificultad
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                style={{
                  padding: '0.55rem 0.75rem', borderRadius: '10px',
                  border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)'
                }}
              >
                <option value="repaso">⚡ Repaso rápido</option>
                <option value="practico">🛠️ Casos prácticos</option>
                <option value="examen">🎯 Examen técnico</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 700, color: 'var(--text-title)' }}>
              Número de preguntas
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                style={{
                  padding: '0.55rem 0.75rem', borderRadius: '10px',
                  border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)'
                }}
              >
                <option value={3}>3 preguntas</option>
                <option value={5}>5 preguntas</option>
                <option value={8}>8 preguntas</option>
              </select>
            </label>
          </div>
        </div>

        {error && (
          <div style={{ padding: '0.6rem 0.85rem', borderRadius: '8px', background: '#fee2e2', color: '#991b1b', fontSize: '0.83rem' }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.55rem', marginTop: '0.25rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 0.95rem', borderRadius: '10px', border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={busy}
            style={{
              padding: '0.5rem 1.1rem', borderRadius: '10px', border: 'none',
              background: accent, color: '#fff', fontWeight: 700, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.7 : 1
            }}
          >
            {busy ? 'Generando con IA...' : '✨ Generar y guardar Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}
