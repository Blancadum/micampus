import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getSubjectUrl } from '../utils/subjectRoutes.js';
import { getCampusData } from '../utils/campusCache.js';

const cardStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '16px',
  padding: '1.25rem'
};

export default function CalendarRadarPage() {
  const [report, setReport] = useState(null);
  const [campusMeta, setCampusMeta] = useState({ subjects: [], groups: [] });
  const [msg, setMsg] = useState('');
  const [aiPlan, setAiPlan] = useState('');
  const [aiBusy, setAiBusy] = useState(false);

  const loadRadar = useCallback(async () => {
    try {
      const [repRes, c] = await Promise.all([
        fetch('/api/scripts/coach-report'),
        getCampusData()
      ]);
      if (repRes.ok) setReport(await repRes.json());
      if (c) {
        setCampusMeta({ subjects: c.subjects || [], groups: c.groups || [] });
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadRadar();
  }, [loadRadar]);

  const resolveItemUrl = (item) => {
    const sub = campusMeta.subjects.find((s) => s.id === item.subjectId);
    return sub ? getSubjectUrl(sub, campusMeta.groups) : '/';
  };

  const handleToggleTask = async (e, taskId) => {
    e.preventDefault();
    e.stopPropagation();
    await fetch(`/api/tasks/${taskId}/toggle`, { method: 'PATCH' });
    window.dispatchEvent(new Event('micampus-tasks-updated'));
    await loadRadar();
  };

  const syncMac = async () => {
    const res = await fetch('/api/scripts/sync-mac-calendar', { method: 'POST' });
    const data = await res.json();
    setMsg(data.openedInMacCalendar ? `✅ Abierto en Calendario de Mac (${data.file})` : `✅ Generado en ${data.file}`);
  };

  const triggerMacNotification = async () => {
    const res = await fetch('/api/scripts/notify-now', { method: 'POST' });
    const data = await res.json();
    setMsg(`🔔 Se enviaron ${data.sentCount || 0} notificación(es) al centro de notificaciones.`);
  };

  const generateAiPlan = async () => {
    setAiBusy(true);
    setMsg('');
    try {
      const res = await fetch('/api/scripts/ai-study-plan', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'ok') {
        setAiPlan(data.plan);
      } else {
        setMsg(`⚠️ ${data.message}`);
      }
    } finally {
      setAiBusy(false);
    }
  };

  if (!report) return <main className="app-container" style={{ padding: '2rem' }}>Cargando radar de entregas...</main>;

  const renderList = (title, items, badgeBg) => (
    <div style={{ ...cardStyle, marginBottom: '1rem' }}>
      <h3 style={{ marginTop: 0 }}>{title} ({items.length})</h3>
      {items.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Sin entregas en esta sección.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((item) => (
            <Link
              key={item.id}
              to={resolveItemUrl(item)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: '12px', background: 'var(--bg-subtle)',
                borderLeft: `4px solid ${item.subjectColor || badgeBg}`,
                textDecoration: 'none', color: 'inherit'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-title)' }}>{item.subjectIcon} {item.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.subjectTitle} · {item.dueDate}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{ padding: '0.25rem 0.65rem', borderRadius: '999px', background: badgeBg, color: '#fff', fontSize: '0.78rem', fontWeight: 700 }}>
                  {item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)}d atrasada` : item.daysRemaining === 0 ? '¡HOY!' : `En ${item.daysRemaining}d`}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleToggleTask(e, item.id)}
                  title="Marcar como entregada"
                  style={{
                    padding: '0.28rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)', color: 'var(--text-title)', fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer'
                  }}
                >
                  ✅
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <main className="app-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ ...cardStyle, marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>📅 Radar de Entregas y Calendario (Sin IA)</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>Alertas automáticas de fechas límite y coincidencias calculadas en Java.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <a href="/api/scripts/calendar.ics" style={{ padding: '0.55rem 1rem', borderRadius: '10px', background: 'var(--c-blue, #3b82f6)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}>⬇️ Descargar .ics</a>
          <button onClick={syncMac} style={{ padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, cursor: 'pointer' }}>🍎 Abrir en Calendario Mac</button>
          <button onClick={triggerMacNotification} style={{ padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, cursor: 'pointer' }}>🔔 Probar alarma Mac</button>
          <button onClick={generateAiPlan} disabled={aiBusy} style={{ padding: '0.55rem 1rem', borderRadius: '10px', border: 'none', background: '#8b5cf6', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            {aiBusy ? '⏳ Generando plan...' : '🧠 Plan de estudio con IA'}
          </button>
          <Link to="/" style={{ padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'var(--text-title)' }}>← Inicio</Link>
        </div>
      </div>

      {msg && <div style={{ ...cardStyle, marginBottom: '1rem', borderColor: '#22c55e' }}>{msg}</div>}

      {aiPlan && (
        <div style={{ ...cardStyle, marginBottom: '1rem', borderLeft: '5px solid #8b5cf6' }}>
          <h3 style={{ marginTop: 0 }}>🧠 Plan de Estudio Recomendado por tu IA</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiPlan}</ReactMarkdown>
        </div>
      )}

      {report.collisions?.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: '1rem', borderColor: '#f59e0b' }}>
          <h3 style={{ marginTop: 0 }}>⚠️ Alertas de Coincidencia</h3>
          {report.collisions.map((c) => (
            <div key={c.date}><strong>{c.date}</strong> ({c.count} entregas): {c.tasks.join(' · ')}</div>
          ))}
        </div>
      )}

      {renderList('🚨 Atrasadas', report.overdue || [], '#ef4444')}
      {renderList('🔥 Urgentes (0-3 días)', report.urgent || [], '#f59e0b')}
      {renderList('🗓️ Próximas', report.upcoming || [], '#3b82f6')}
    </main>
  );
}
