import React, { useState, useMemo } from 'react';

const MONTH_NAMES = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];

/**
 * Mini calendario mensual de entregas/eventos de una asignatura con enlace a .ics.
 */
export default function SubjectMiniCalendar({ tasks, accentColor, subjectId }) {
  const [cursor, setCursor] = useState(() => {
    const firstDated = tasks.find((t) => t.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(t.dueDate));
    if (firstDated) {
      const [y, m] = firstDated.dueDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const tasksByDay = useMemo(() => {
    const map = {};
    for (const t of tasks) {
      if (!t.dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(t.dueDate)) continue;
      const [y, m, d] = t.dueDate.split('-').map(Number);
      if (y === year && m - 1 === month) {
        if (!map[d]) map[d] = [];
        map[d].push(t);
      }
    }
    return map;
  }, [tasks, year, month]);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '18px',
      padding: '1.1rem',
      boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          aria-label="Mes anterior"
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: accentColor, fontWeight: 800, fontSize: '1.25rem', lineHeight: 1, padding: '0.15rem 0.4rem'
          }}
        >
          ‹
        </button>
        <div style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.03em', color: 'var(--text-title)' }}>
          📅 {MONTH_NAMES[month]} DE {year}
        </div>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label="Mes siguiente"
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: accentColor, fontWeight: 800, fontSize: '1.25rem', lineHeight: 1, padding: '0.15rem 0.4rem'
          }}
        >
          ›
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <div key={d}>{d}</div>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: '30px', gap: '0.25rem', textAlign: 'center', fontSize: '0.8rem' }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} style={{ height: '30px' }} />;
          const dayTasks = tasksByDay[day] || [];
          const hasEvent = dayTasks.length > 0;
          const isToday = isCurrentMonth && today.getDate() === day;
          return (
            <div
              key={day}
              title={hasEvent ? dayTasks.map((t) => t.title).join(' · ') : undefined}
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontWeight: hasEvent || isToday ? 800 : 500,
                background: hasEvent ? accentColor : 'transparent',
                color: hasEvent ? '#fff' : 'var(--text-title)',
                border: isToday && !hasEvent ? `2px solid ${accentColor}` : '2px solid transparent',
                cursor: hasEvent ? 'help' : 'default'
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
          Entrega / Evento
        </span>
        <a href={`/api/scripts/calendar.ics?subjectId=${subjectId}`} style={{ color: accentColor, fontWeight: 700, textDecoration: 'none' }}>
          ⬇️ .ics
        </a>
      </div>
    </div>
  );
}
