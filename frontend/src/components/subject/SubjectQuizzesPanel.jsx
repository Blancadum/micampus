import React, { useState } from 'react';

function formatDateTime(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  if (Number.isNaN(d.getTime())) return isoStr;
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function SubjectQuizzesPanel({
  subject,
  quizzes = [],
  units = [],
  accent = '#22c55e',
  onChanged
}) {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [generating, setGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [openQuizId, setOpenQuizId] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleGenerate = async () => {
    setGenerating(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/quizzes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: subject.id,
          unit: selectedUnit,
          count: 3,
          source: 'web'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(`⚠️ ${data.error || 'No se pudo generar el quiz.'}`);
      } else {
        setOpenQuizId(data.id);
        setStatusMsg(`✅ Quiz "${data.title}" generado y guardado.`);
        if (onChanged) await onChanged();
      }
    } catch (err) {
      setStatusMsg(`⚠️ Error de red: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveTitle = async (quizId) => {
    const trimmed = titleDraft.trim();
    if (!trimmed) return;
    const res = await fetch(`/api/quizzes/${quizId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: trimmed })
    });
    if (res.ok) {
      setEditingId(null);
      if (onChanged) await onChanged();
    }
  };

  const handleDelete = async (quizId) => {
    const res = await fetch(`/api/quizzes/${quizId}`, { method: 'DELETE' });
    if (res.ok && onChanged) {
      await onChanged();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '1.15rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-title)' }}>
            🧠 Quizzes de {subject.title} ({quizzes.length})
          </h2>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Aquí se guardan todos los quizzes generados por IA desde la web o desde Telegram (<code>/quiz</code>).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-title)',
              fontSize: '0.84rem'
            }}
          >
            <option value="">Toda la asignatura</option>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: accent,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: generating ? 'wait' : 'pointer',
              opacity: generating ? 0.7 : 1
            }}
          >
            {generating ? 'Generando...' : '✨ Generar Quiz con IA'}
          </button>
        </div>
      </div>

      {statusMsg && (
        <div style={{
          padding: '0.7rem 1rem',
          borderRadius: '10px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.85rem'
        }}>
          {statusMsg}
        </div>
      )}

      {quizzes.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          Todavía no hay quizzes guardados en esta asignatura. Pulsa <strong>✨ Generar Quiz con IA</strong> arriba o envía <code>/quiz</code> a tu bot de Telegram.
        </div>
      ) : (
        quizzes.map((q) => {
          const isOpen = openQuizId === q.id;
          const isEditing = editingId === q.id;
          const isTelegram = q.source === 'telegram';

          return (
            <div
              key={q.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '1rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={titleDraft}
                        onChange={(e) => setTitleDraft(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveTitle(q.id); }}
                        style={{
                          flex: 1,
                          minWidth: '200px',
                          padding: '0.4rem 0.65rem',
                          borderRadius: '8px',
                          border: `1.5px solid ${accent}`,
                          background: 'var(--bg-subtle)',
                          color: 'var(--text-title)',
                          fontWeight: 700,
                          fontSize: '0.92rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveTitle(q.id)}
                        style={{
                          padding: '0.4rem 0.75rem', borderRadius: '8px', border: 'none',
                          background: accent, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem'
                        }}
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: '0.4rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                          background: 'var(--bg-subtle)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem'
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-title)' }}>{q.title}</strong>
                      <button
                        type="button"
                        title="Editar nombre del quiz"
                        onClick={() => { setEditingId(q.id); setTitleDraft(q.title || ''); }}
                        style={{
                          border: 'none', background: 'transparent', cursor: 'pointer',
                          fontSize: '0.85rem', padding: '0.1rem 0.3rem', color: 'var(--text-muted)'
                        }}
                      >
                        ✏️
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', marginTop: '0.3rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>🕒 {formatDateTime(q.createdAt)}</span>
                    <span>•</span>
                    <span>{isTelegram ? '📱 Telegram' : '🌐 Web'}</span>
                    {q.unit && (
                      <>
                        <span>•</span>
                        <span>📚 {q.unit}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{(q.questions || []).length} preguntas</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setOpenQuizId(isOpen ? null : q.id)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '10px',
                      border: `1px solid ${accent}`,
                      background: isOpen ? accent : 'transparent',
                      color: isOpen ? '#fff' : accent,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isOpen ? 'Ocultar' : '▶ Practicar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(q.id)}
                    title="Eliminar quiz"
                    style={{
                      padding: '0.45rem 0.65rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-muted)',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {isOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: '0.6rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {(q.questions || []).map((item, qi) => {
                    const key = `${q.id}:${qi}`;
                    const picked = answers[key];
                    return (
                      <div key={qi} style={{ background: 'var(--bg-subtle)', borderRadius: '12px', padding: '0.9rem 1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.6rem', color: 'var(--text-title)' }}>
                          {qi + 1}. {item.question}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {(item.options || []).map((opt, oi) => {
                            const isSelected = picked === oi;
                            const isCorrect = oi === item.correctIndex;
                            let bg = 'var(--bg-card)';
                            let border = '1px solid var(--border-subtle)';
                            if (picked !== undefined) {
                              if (isCorrect) {
                                bg = 'rgba(34, 197, 94, 0.18)';
                                border = '1px solid #22c55e';
                              } else if (isSelected && !isCorrect) {
                                bg = 'rgba(239, 68, 68, 0.18)';
                                border = '1px solid #ef4444';
                              }
                            }
                            return (
                              <button
                                key={oi}
                                type="button"
                                onClick={() => setAnswers((prev) => ({ ...prev, [key]: oi }))}
                                style={{
                                  textAlign: 'left',
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: '8px',
                                  border,
                                  background: bg,
                                  color: 'var(--text-main)',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {picked !== undefined && item.explanation && (
                          <p style={{ margin: '0.55rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            💡 {item.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
