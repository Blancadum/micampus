import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconPicker, { SubjectIcon } from '../common/IconPicker.jsx';
import { getSubjectUrl } from '../../utils/subjectRoutes.js';
import { getCampusData } from '../../utils/campusCache.js';

const EMPTY_FORM = {
  title: '', code: '', description: '', color: '#3b82f6', icon: '📚', category: 'Personalizada', groupId: ''
};

const EMPTY_GROUP = {
  title: '', subtitle: '', description: '', color: '#2563eb', icon: '🎓'
};

const ARCHIVED_STORAGE_KEY = 'micampus_archived_dynamic_cards';

function parseHexRgb(hex) {
  const clean = String(hex || '#3b82f6').replace('#', '').trim();
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return [59, 130, 246];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function mixRgb([r, g, b], target, amount) {
  return [
    Math.round(r + (target[0] - r) * amount),
    Math.round(g + (target[1] - g) * amount),
    Math.round(b + (target[2] - b) * amount)
  ];
}

function toRgbCss([r, g, b]) {
  return `rgb(${r}, ${g}, ${b})`;
}

function getDynamicGradientStyle(hexColor) {
  const rgb = parseHexRgb(hexColor);
  const darker = toRgbCss(mixRgb(rgb, [15, 23, 42], 0.32));
  const mid = toRgbCss(rgb);
  const lighter = toRgbCss(mixRgb(rgb, [255, 255, 255], 0.28));
  const [r, g, b] = rgb;
  return {
    background: `linear-gradient(135deg, ${darker} 0%, ${mid} 50%, ${lighter} 100%)`,
    boxShadow: `0 4px 12px rgba(${r}, ${g}, ${b}, 0.35)`,
    '--btn-glow': `rgba(${r}, ${g}, ${b}, 0.6)`
  };
}

export default function CustomSubjectsSection() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived'
  const [archivedKeys, setArchivedKeys] = useState(() => {
    try {
      const saved = localStorage.getItem(ARCHIVED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleArchiveCard = (key) => {
    setArchivedKeys((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      try {
        localStorage.setItem(ARCHIVED_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [groupForm, setGroupForm] = useState(EMPTY_GROUP);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

  const loadCampus = useCallback(async (force = false) => {
    try {
      const data = await getCampusData({ force });
      if (!data) return;
      setGroups(data.groups || []);
      setSubjects(data.subjects || []);
      setLessons(data.lessons || []);
      setTasks(data.tasks || []);
    } catch {
      // Silencioso si el backend no está activo
    }
  }, []);

  useEffect(() => {
    loadCampus();
  }, [loadCampus]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const res = await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const created = await res.json();
    setForm(EMPTY_FORM);
    setShowModal(false);
    if (created?.id) {
      navigate(getSubjectUrl(created, groups));
    } else {
      await loadCampus(true);
    }
  };

  const openNewGroupModal = () => {
    setEditingGroupId(null);
    setGroupForm(EMPTY_GROUP);
    setSelectedSubjectIds([]);
    setShowGroupModal(true);
  };

  const openEditGroupModal = (group) => {
    setEditingGroupId(group.id);
    setGroupForm({
      title: group.title || '',
      subtitle: group.subtitle || '',
      description: group.description || '',
      color: group.color || '#2563eb',
      icon: group.icon || '🎓'
    });
    setSelectedSubjectIds(subjects.filter((s) => s.groupId === group.id).map((s) => s.id));
    setShowGroupModal(true);
  };

  const toggleSubjectInGroup = (subjectId) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handleSaveGroup = async (e) => {
    e.preventDefault();
    if (!groupForm.title.trim()) return;

    let savedGroupId = editingGroupId;
    if (editingGroupId) {
      await fetch(`/api/groups/${editingGroupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...groupForm, id: editingGroupId })
      });
    } else {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groupForm)
      });
      const created = await res.json();
      savedGroupId = created.id;
    }

    if (savedGroupId) {
      const updates = subjects
        .filter((s) => {
          const shouldBeInGroup = selectedSubjectIds.includes(s.id);
          const isInThisGroup = s.groupId === savedGroupId;
          return shouldBeInGroup !== isInThisGroup;
        })
        .map((s) => {
          const nextGroupId = selectedSubjectIds.includes(s.id) ? savedGroupId : '';
          return fetch(`/api/subjects/${s.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...s, groupId: nextGroupId })
          });
        });
      await Promise.all(updates);
    }

    setShowGroupModal(false);
    setEditingGroupId(null);
    setGroupForm(EMPTY_GROUP);
    setSelectedSubjectIds([]);
    await loadCampus(true);
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm('¿Deshacer esta tarjeta de grupo? Las asignaturas no se borrarán, volverán a mostrarse sueltas.')) return;
    await fetch(`/api/groups/${groupId}`, { method: 'DELETE' });
    await loadCampus(true);
  };

  const groupIdsSet = new Set(groups.map((g) => g.id));
  const standaloneSubjects = subjects.filter((s) => !s.groupId || !groupIdsSet.has(s.groupId));

  const activeGroups = groups.filter((g) => !archivedKeys.includes(`group:${g.id}`));
  const archivedGroups = groups.filter((g) => archivedKeys.includes(`group:${g.id}`));
  const activeStandalone = standaloneSubjects.filter((s) => !archivedKeys.includes(`sub:${s.id}`));
  const archivedStandalone = standaloneSubjects.filter((s) => archivedKeys.includes(`sub:${s.id}`));

  const activeCount = activeGroups.length + activeStandalone.length;
  const archivedCount = archivedGroups.length + archivedStandalone.length;
  const groupsToRender = activeTab === 'active' ? activeGroups : archivedGroups;
  const standaloneToRender = activeTab === 'active' ? activeStandalone : archivedStandalone;

  return (
    <section className="campus-section" style={{ marginBottom: '2.25rem' }}>
      <div
        className="section-heading"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>🎓 Mis retos</h2>
          <span style={{
            fontSize: '0.8rem', background: 'var(--bg-subtle, rgba(100,116,139,0.08))',
            color: 'var(--text-muted)', padding: '0.22rem 0.7rem',
            borderRadius: '12px', border: '1px solid var(--border-subtle)', fontWeight: 600
          }}>
            {subjects.length} asignaturas · {groups.length} grupos
          </span>

          <div
            className="retos-filter-tabs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-subtle, #f1f5f9)',
              border: '1px solid var(--border-subtle, #e2e8f0)',
              borderRadius: '12px',
              padding: '4px',
              gap: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('active')}
              style={{
                border: activeTab === 'active' ? '1px solid var(--border-subtle, rgba(0,0,0,0.08))' : '1px solid transparent',
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.38rem 0.85rem', fontSize: '0.82rem', fontWeight: 700, borderRadius: '9px', cursor: 'pointer',
                background: activeTab === 'active' ? 'var(--bg-card, #ffffff)' : 'transparent',
                color: activeTab === 'active' ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
                boxShadow: activeTab === 'active' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
              }}
            >
              <span>🚀 Activos</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', height: '20px', padding: '0 6px', fontSize: '0.72rem', fontWeight: 800, borderRadius: '999px',
                background: activeTab === 'active' ? '#3b82f6' : 'rgba(100, 116, 139, 0.16)',
                color: activeTab === 'active' ? '#ffffff' : 'var(--text-muted, #475569)',
              }}>
                {activeCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('archived')}
              style={{
                border: activeTab === 'archived' ? '1px solid var(--border-subtle, rgba(0,0,0,0.08))' : '1px solid transparent',
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.38rem 0.85rem', fontSize: '0.82rem', fontWeight: 700, borderRadius: '9px', cursor: 'pointer',
                background: activeTab === 'archived' ? 'var(--bg-card, #ffffff)' : 'transparent',
                color: activeTab === 'archived' ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
                boxShadow: activeTab === 'archived' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
              }}
            >
              <span>📦 Archivados</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', height: '20px', padding: '0 6px', fontSize: '0.72rem', fontWeight: 800, borderRadius: '999px',
                background: activeTab === 'archived' ? '#3b82f6' : 'rgba(100, 116, 139, 0.16)',
                color: activeTab === 'archived' ? '#ffffff' : 'var(--text-muted, #475569)',
              }}>
                {archivedCount}
              </span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link to="/scripts" className="btn-sync-pill" style={{ textDecoration: 'none', padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
            ⚡ Importar PDF / Scripts Java
          </Link>
          <button
            type="button"
            onClick={openNewGroupModal}
            style={{
              padding: '0.45rem 0.95rem', borderRadius: '10px', border: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)', color: 'var(--text-title)', fontWeight: 700,
              fontSize: '0.85rem', cursor: 'pointer'
            }}
          >
            📦 Agrupar en Tarjeta
          </button>
          <button
            type="button"
            onClick={() => { setForm(EMPTY_FORM); setShowModal(true); }}
            style={{
              padding: '0.45rem 0.95rem', borderRadius: '10px', border: 'none',
              background: 'var(--c-blue, #3b82f6)', color: '#fff', fontWeight: 700,
              fontSize: '0.85rem', cursor: 'pointer'
            }}
          >
            + Nueva Asignatura
          </button>
        </div>
      </div>

      {groupsToRender.length === 0 && standaloneToRender.length === 0 ? (
        <div style={{
          padding: '2rem', borderRadius: '16px', background: 'var(--bg-card)',
          border: '1px dashed var(--border-subtle)', textAlign: 'center', color: 'var(--text-muted)'
        }}>
          {activeTab === 'archived'
            ? 'No tienes tarjetas archivadas.'
            : 'No hay tarjetas activas. Crea una nueva asignatura o agrupa tus materias.'}
        </div>
      ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.15rem', alignItems: 'start' }}>
        {groupsToRender.map((group) => {
          const groupSubjects = subjects.filter((s) => s.groupId === group.id);
          return (
            <article
              key={group.id}
              style={{
                display: 'flex', flexDirection: 'column', gap: '0.9rem',
                padding: '1.25rem', borderRadius: '18px',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderTop: `4px solid ${group.color || '#2563eb'}`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    ...getDynamicGradientStyle(group.color || '#2563eb'),
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <SubjectIcon icon={group.icon} size={24} fallback="🎓" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--text-title)', fontSize: '1.1rem' }}>{group.title}</h3>
                    {group.subtitle && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{group.subtitle}</span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => toggleArchiveCard(`group:${group.id}`)}
                    title={archivedKeys.includes(`group:${group.id}`) ? 'Restaurar tarjeta' : 'Archivar tarjeta'}
                    style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', borderRadius: '8px', padding: '0.3rem 0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    {archivedKeys.includes(`group:${group.id}`) ? '🚀' : '📦'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditGroupModal(group)}
                    title="Editar tarjeta y asignaturas"
                    style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', borderRadius: '8px', padding: '0.3rem 0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteGroup(group.id)}
                    title="Deshacer grupo"
                    style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', borderRadius: '8px', padding: '0.3rem 0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {group.description && (
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {group.description}
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {groupSubjects.length === 0 ? (
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-subtle)', textAlign: 'center' }}>
                    Sin asignaturas aún. Pulsa ✏️ para añadir existentes o crea una nueva abajo.
                  </div>
                ) : (
                  groupSubjects.map((sub) => {
                    const subTasks = tasks.filter((t) => t.subjectId === sub.id && t.status !== 'done').length;
                    const sigla = (sub.code || sub.shortTitle || '').toUpperCase().slice(0, 8);
                    return (
                      <Link
                        key={sub.id}
                        to={getSubjectUrl(sub, groups)}
                        className="btn-ioc-subject-row btn-dynamic-subject"
                        style={getDynamicGradientStyle(sub.color || '#3b82f6')}
                        title={sub.title}
                      >
                        <span className="btn-ioc-icon">
                          <SubjectIcon icon={sub.icon} size={21} />
                        </span>
                        <div className="btn-ioc-info">
                          {sigla && <span className="btn-ioc-sigla">{sigla}</span>}
                          <span className="btn-ioc-title">{sub.title}</span>
                        </div>
                        {subTasks > 0 && (
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: 'rgba(0, 0, 0, 0.22)',
                            padding: '0.14rem 0.5rem',
                            borderRadius: '999px',
                            flexShrink: 0
                          }}>
                            {subTasks}
                          </span>
                        )}
                        <span className="btn-ioc-arrow">➔</span>
                      </Link>
                    );
                  })
                )}
              </div>

              <button
                type="button"
                onClick={() => { setForm({ ...EMPTY_FORM, groupId: group.id }); setShowModal(true); }}
                style={{
                  padding: '0.5rem', borderRadius: '10px', border: '1px dashed var(--border-subtle)',
                  background: 'transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer'
                }}
              >
                + Añadir asignatura a "{group.title}"
              </button>
            </article>
          );
        })}

        {standaloneToRender.map((sub) => {
          const subLessons = lessons.filter((l) => l.subjectId === sub.id);
          const allSubTasks = tasks.filter((t) => t.subjectId === sub.id);
          const subTasks = allSubTasks.filter((t) => t.status !== 'done');
          const doneL = subLessons.filter((l) => l.completed).length;
          const doneT = allSubTasks.filter((t) => t.status === 'done').length;
          const pct = allSubTasks.length > 0
            ? Math.round((doneT / allSubTasks.length) * 100)
            : (subLessons.length > 0 ? Math.round((doneL / subLessons.length) * 100) : 0);

          return (
            <div
              key={sub.id}
              style={{
                position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem',
                padding: '1.15rem', borderRadius: '16px',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderTop: `4px solid ${sub.color || '#3b82f6'}`,
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
              }}
            >
              <Link
                to={getSubjectUrl(sub, groups)}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <SubjectIcon icon={sub.icon} size={26} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '999px', background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                        {sub.category || 'General'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleArchiveCard(`sub:${sub.id}`); }}
                        title={archivedKeys.includes(`sub:${sub.id}`) ? 'Restaurar asignatura' : 'Archivar asignatura'}
                        style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', borderRadius: '8px', padding: '0.2rem 0.45rem', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        {archivedKeys.includes(`sub:${sub.id}`) ? '🚀' : '📦'}
                      </button>
                    </div>
                  </div>
                  <h3 style={{ margin: '0.5rem 0 0.25rem', color: 'var(--text-title)', fontSize: '1.05rem' }}>{sub.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    {sub.description || 'Haz clic para ver temario y entregas'}
                    {sub.teacher ? ` · 👨‍🏫 ${sub.teacher}` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>📖 {subLessons.length} temas ({pct}%)</span>
                  <span>📅 {subTasks.length} pendientes</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      )}

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreate}
            style={{
              width: '100%', maxWidth: '460px', background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.8rem'
            }}
          >
            <h3 style={{ margin: 0, color: 'var(--text-title)' }}>➕ Crear Nueva Asignatura</h3>
            <input
              placeholder="Nombre (ej. Asignatura 1...)"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                placeholder="Código (ej. BBDD)"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              />
              <IconPicker value={form.icon} onChange={(nextIcon) => setForm({ ...form, icon: nextIcon })} />
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                style={{ width: '48px', height: '38px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
            </div>
            {groups.length > 0 && (
              <select
                value={form.groupId}
                onChange={(e) => setForm({ ...form, groupId: e.target.value })}
                style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              >
                <option value="">Sin agrupar (tarjeta individual)</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>📦 Tarjeta: {g.title}</option>
                ))}
              </select>
            )}
            <textarea
              rows="3"
              placeholder="Descripción breve..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', background: 'var(--c-blue, #3b82f6)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                Guardar y configurar →
              </button>
            </div>
          </form>
        </div>
      )}

      {showGroupModal && (
        <div
          onClick={() => setShowGroupModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSaveGroup}
            style={{
              width: '100%', maxWidth: '500px', background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '90vh', overflowY: 'auto'
            }}
          >
            <h3 style={{ margin: 0, color: 'var(--text-title)' }}>
              {editingGroupId ? '✏️ Editar Tarjeta de Grupo' : '📦 Nueva Tarjeta de Grupo'}
            </h3>
            <input
              placeholder="Título de la tarjeta (ej. Bloque 1, Curso...)"
              required
              value={groupForm.title}
              onChange={(e) => setGroupForm({ ...groupForm, title: e.target.value })}
              style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                placeholder="Subtítulo / Centro (ej. Institut Obert de Catalunya)"
                value={groupForm.subtitle}
                onChange={(e) => setGroupForm({ ...groupForm, subtitle: e.target.value })}
                style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              />
              <IconPicker value={groupForm.icon} onChange={(nextIcon) => setGroupForm({ ...groupForm, icon: nextIcon })} />
              <input
                type="color"
                value={groupForm.color}
                onChange={(e) => setGroupForm({ ...groupForm, color: e.target.value })}
                style={{ width: '46px', height: '38px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
            </div>
            <textarea
              rows="2"
              placeholder="Descripción del itinerario o bloque de asignaturas..."
              value={groupForm.description}
              onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
              style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
            />

            {subjects.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Selecciona las asignaturas que quieres unir en esta tarjeta:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '180px', overflowY: 'auto', padding: '0.5rem', borderRadius: '10px', background: 'var(--bg-subtle)' }}>
                  {subjects.map((sub) => (
                    <label key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedSubjectIds.includes(sub.id)}
                        onChange={() => toggleSubjectInGroup(sub.id)}
                      />
                      <span>{sub.icon || '📚'}</span>
                      <span style={{ fontWeight: 600 }}>{sub.title}</span>
                      {sub.code && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({sub.code})</span>}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" onClick={() => setShowGroupModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', background: 'var(--c-blue, #3b82f6)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                Guardar tarjeta
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
