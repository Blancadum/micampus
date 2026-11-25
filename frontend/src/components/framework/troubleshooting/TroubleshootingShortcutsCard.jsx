import React from 'react';
import { SHORTCUTS_DATA } from '../../../data/troubleshootingData';

/**
 * Tabla interactiva con selector de sistema operativo para atajos de IntelliJ IDEA.
 */
export default function TroubleshootingShortcutsCard({
  activeShortcutOs,
  setActiveShortcutOs
}) {
  return (
    <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⌨️</span> Atajos Imprescindibles en IntelliJ IDEA
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Multiplica tu velocidad de desarrollo y navegación en proyectos Spring
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-hover)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setActiveShortcutOs('mac')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeShortcutOs === 'mac' ? 'var(--bg-card)' : 'transparent',
              color: activeShortcutOs === 'mac' ? '#10b981' : 'var(--text-muted)',
              fontWeight: activeShortcutOs === 'mac' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🍎 macOS
          </button>
          <button
            onClick={() => setActiveShortcutOs('win')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeShortcutOs === 'win' ? 'var(--bg-card)' : 'transparent',
              color: activeShortcutOs === 'win' ? '#10b981' : 'var(--text-muted)',
              fontWeight: activeShortcutOs === 'win' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🪟 Windows / Linux
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.8rem' }}>Acción</th>
              <th style={{ padding: '0.65rem 0.8rem' }}>Atajo ({activeShortcutOs === 'mac' ? 'macOS' : 'Windows/Linux'})</th>
              <th style={{ padding: '0.65rem 0.8rem' }}>Utilidad</th>
            </tr>
          </thead>
          <tbody>
            {SHORTCUTS_DATA.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.65rem 0.8rem', fontWeight: 600, color: 'var(--text-title)' }}>{row.action}</td>
                <td style={{ padding: '0.65rem 0.8rem' }}>
                  <kbd style={{ background: 'var(--bg-input, #0f172a)', border: '1px solid var(--border-subtle)', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.78rem', color: '#10b981', fontFamily: 'monospace' }}>
                    {activeShortcutOs === 'mac' ? row.mac : row.win}
                  </kbd>
                </td>
                <td style={{ padding: '0.65rem 0.8rem', color: 'var(--text-muted)' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
