import React from 'react';
import { CHECKLIST_ITEMS } from '../../../data/troubleshootingData';

/**
 * Checklist interactivo de verificación del entorno Java y Spring Boot.
 */
export default function TroubleshootingChecklist({
  checklist,
  onToggleCheck,
  completedCount
}) {
  return (
    <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-title)' }}>
            ✅ Checklist de Verificación Final
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Comprueba que tienes todo listo antes de comenzar a escribir código
          </span>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: completedCount === 7 ? '#10b981' : 'var(--text-muted)' }}>
          {completedCount} / 7 completados {completedCount === 7 && '🎉 ¡Listo para crear APIs!'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {CHECKLIST_ITEMS.map((item) => (
          <label
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.9rem',
              borderRadius: '10px',
              background: checklist[item.id] ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-hover)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              fontSize: '0.88rem',
              color: checklist[item.id] ? 'var(--text-title)' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            <input
              type="checkbox"
              checked={checklist[item.id] || false}
              onChange={() => onToggleCheck(item.id)}
              style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
            />
            <span>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
