import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SLOT_COUNT = 4;

/**
 * Popover reutilizable de slots personalizables para Webs Oficiales y Secciones.
 */
export default function SlotMenuPopover({
  headerLabel,
  emptySlotLabel,
  defaultIcon,
  links,
  onSaveLinks,
  onCloseMenu
}) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [draft, setDraft] = useState({ icon: defaultIcon, title: '', desc: '', url: '' });

  const openEditor = (idx) => {
    const existing = links[idx] || { icon: defaultIcon, title: '', desc: '', url: '' };
    setDraft({
      icon: existing.icon || defaultIcon,
      title: existing.title || '',
      desc: existing.desc || '',
      url: existing.url || ''
    });
    setEditingIdx(idx);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingIdx === null || !draft.title.trim() || !draft.url.trim()) return;
    const next = [...links];
    while (next.length <= editingIdx) next.push({});
    next[editingIdx] = {
      icon: draft.icon.trim() || defaultIcon,
      title: draft.title.trim(),
      desc: draft.desc.trim(),
      url: draft.url.trim()
    };
    await onSaveLinks(next);
    setEditingIdx(null);
  };

  const handleClear = async (idx) => {
    const next = links.map((item, i) => (i === idx ? {} : item));
    while (next.length > 0 && !next[next.length - 1]?.title) next.pop();
    await onSaveLinks(next);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        width: '330px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
        padding: '0.5rem',
        zIndex: 1050,
        animation: 'fadeInDown 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ padding: '0.4rem 0.75rem 0.3rem', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
        {headerLabel}
      </div>

      {editingIdx !== null ? (
        <form onSubmit={handleSave} style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)' }}>
            ✏️ Configurar Slot #{editingIdx + 1}
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              placeholder="Icono"
              value={draft.icon}
              onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
              style={{ width: '48px', textAlign: 'center', padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
            />
            <input
              placeholder="Nombre"
              required
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              style={{ flex: 1, padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.82rem' }}
            />
          </div>
          <input
            placeholder="URL o ruta (ej. https://... o /asignatura/...)"
            required
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.82rem' }}
          />
          <input
            placeholder="Descripción breve (opcional)"
            value={draft.desc}
            onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.82rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
            <button type="button" onClick={() => setEditingIdx(null)} style={{ padding: '0.35rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-title)', fontSize: '0.78rem', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" style={{ padding: '0.35rem 0.8rem', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
              💾 Guardar
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {Array.from({ length: Math.max(SLOT_COUNT, links.length) }).map((_, idx) => {
            const item = links[idx];
            if (!item || !item.title || !item.url) {
              return (
                <button
                  key={`slot-empty-${idx}`}
                  type="button"
                  onClick={() => openEditor(idx)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.55rem 0.75rem', borderRadius: '10px',
                    border: '1px dashed var(--border-subtle)', background: 'var(--bg-subtle)',
                    color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <span>➕ Slot libre #{idx + 1} · {emptySlotLabel}</span>
                  <span style={{ fontSize: '0.75rem' }}>✏️</span>
                </button>
              );
            }

            const isExternal = /^https?:\/\//i.test(item.url);
            const linkContent = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '1.1rem', width: '22px', textAlign: 'center', flexShrink: 0 }}>{item.icon || defaultIcon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 650, fontSize: '0.85rem', color: 'var(--text-title)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </div>
                  {item.desc && (
                    <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.desc}
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <div
                key={`slot-filled-${idx}`}
                className="header-dropdown-item"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem',
                  padding: '0.5rem 0.65rem', borderRadius: '10px'
                }}
              >
                {isExternal ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onCloseMenu}
                    style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, textDecoration: 'none', color: 'inherit' }}
                  >
                    {linkContent}
                  </a>
                ) : (
                  <Link
                    to={item.url}
                    onClick={onCloseMenu}
                    style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, textDecoration: 'none', color: 'inherit' }}
                  >
                    {linkContent}
                  </Link>
                )}
                <div style={{ display: 'flex', gap: '0.2rem', flexShrink: 0 }}>
                  <button type="button" onClick={() => openEditor(idx)} title="Editar enlace" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.78rem' }}>✏️</button>
                  <button type="button" onClick={() => handleClear(idx)} title="Vaciar slot" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.78rem' }}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
