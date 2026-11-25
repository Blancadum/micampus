import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * HomeHeroBanner
 * Cabecera principal de la Home con saludo dinámico según la hora del día,
 * nombre de la usuaria editable y panel de estadísticas clave con entrega destacada.
 */
export default function HomeHeroBanner({
  userName = 'Estudiante',
  campusTitle = 'MiCampus',
  campusSubtitle = '',
  quickLinks = [],
  subjectsCount = 0,
  aiConfig = { aiProvider: 'none', geminiApiKey: '', ollamaUrl: 'http://localhost:11434', ollamaModel: 'llama3.2' },
  onSaveProfile,
  tasksCount = 0,
  springBootDateStr = '--',
  nextTask = null,
}) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [showNotices, setShowNotices] = useState(false);
  const [coachReport, setCoachReport] = useState(null);
  const [draftName, setDraftName] = useState(userName);

  useEffect(() => {
    fetch('/api/scripts/coach-report')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setCoachReport(d))
      .catch(() => {});
  }, []);
  const [draftTitle, setCampusTitleDraft] = useState(campusTitle);
  const [draftSubtitle, setDraftSubtitle] = useState(campusSubtitle);
  const [draftLinks, setDraftLinks] = useState(quickLinks);
  const [draftAi, setDraftAi] = useState(aiConfig);

  useEffect(() => {
    setDraftName(userName);
    setCampusTitleDraft(campusTitle);
    setDraftSubtitle(campusSubtitle);
    setDraftLinks(Array.isArray(quickLinks) ? quickLinks : []);
    setDraftAi(aiConfig || { aiProvider: 'none', geminiApiKey: '', ollamaUrl: 'http://localhost:11434', ollamaModel: 'llama3.2' });
  }, [userName, campusTitle, campusSubtitle, quickLinks, aiConfig]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      await onSaveProfile({
        userName: draftName.trim() || 'Estudiante',
        campusTitle: draftTitle.trim() || 'MiCampus',
        subtitle: draftSubtitle.trim(),
        quickLinks: draftLinks.filter((l) => l.label?.trim() && l.url?.trim()),
        aiProvider: draftAi.aiProvider || 'none',
        geminiApiKey: draftAi.geminiApiKey || '',
        openaiApiKey: draftAi.openaiApiKey || '',
        ollamaUrl: draftAi.ollamaUrl || 'http://localhost:11434',
        ollamaModel: draftAi.ollamaModel || 'llama3.2',
        onboardingCompleted: true
      });
    }
    setEditingProfile(false);
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Buenos días';
    if (hour >= 12 && hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getUrgencyBadge = (days) => {
    if (typeof days !== 'number' || isNaN(days)) return null;
    if (days === 0) {
      return { text: '¡Hoy!', className: 'pill-rose' };
    }
    if (days === 1) {
      return { text: 'Mañana', className: 'pill-orange' };
    }
    if (days <= 3) {
      return { text: `En ${days} días`, className: 'pill-gold' };
    }
    return { text: `En ${days} días`, className: 'pill-green' };
  };

  const urgency = nextTask ? getUrgencyBadge(nextTask.daysRemaining) : null;

  return (
    <section className="hero-banner" style={{ overflow: 'visible', position: 'relative', zIndex: 40 }}>
      <div className="hero-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', position: 'relative' }}>
          <h2 className="hero-title" id="heroGreetingTitle" style={{ margin: 0 }}>
            <span id="heroGreetingTime">{getGreeting()}</span>,{' '}
            <span className="gradient-text">{userName}</span>
          </h2>

          {(() => {
            const urgentItems = coachReport?.urgent || [];
            const overdueItems = coachReport?.overdue || [];
            const solItems = (coachReport?.solutionReleases || []).filter((s) => s.daysRemaining <= 7);
            const totalCount = (nextTask ? 1 : 0) + urgentItems.length + overdueItems.length + solItems.length;
            const badgeCount = Math.max(nextTask ? 1 : 0, urgentItems.length + overdueItems.length + solItems.length);
            return (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowNotices((v) => !v)}
                  title="Avisos y próximas entregas"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.4rem 0.78rem', borderRadius: '999px',
                    border: '1px solid var(--border-subtle)', background: 'var(--bg-card)',
                    color: 'var(--text-title)', fontWeight: 700, fontSize: '0.8rem',
                    cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <span>🔔</span>
                  <span>Avisos</span>
                  {badgeCount > 0 && (
                    <span style={{
                      background: urgency?.className === 'pill-red' ? '#ef4444' : '#3b82f6',
                      color: '#fff', fontSize: '0.7rem', fontWeight: 800,
                      padding: '0.08rem 0.42rem', borderRadius: '999px', lineHeight: 1.3
                    }}>
                      {badgeCount}
                    </span>
                  )}
                </button>

                {showNotices && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 'min(360px, 88vw)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    boxShadow: '0 14px 34px rgba(0,0,0,0.14)',
                    padding: '0.85rem',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.45rem' }}>
                      <strong style={{ fontSize: '0.84rem', color: 'var(--text-title)' }}>Avisos y recordatorios</strong>
                      <Link to="/radar" onClick={() => setShowNotices(false)} style={{ fontSize: '0.76rem', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}>
                        Ver radar →
                      </Link>
                    </div>

                    {totalCount === 0 ? (
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Sin avisos urgentes ahora mismo.</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {nextTask && (
                          <div style={{ padding: '0.55rem 0.7rem', borderRadius: '10px', background: 'var(--bg-subtle)', fontSize: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                              <strong style={{ color: 'var(--text-title)' }}>{nextTask.formattedDate} · {nextTask.badge}</strong>
                              {urgency && (
                                <span className={`pill-badge ${urgency.className}`} style={{ fontSize: '0.68rem', padding: '0.08rem 0.4rem' }}>
                                  {urgency.text}
                                </span>
                              )}
                            </div>
                            <div style={{ color: 'var(--text-main)' }}>{nextTask.task || nextTask.course}</div>
                          </div>
                        )}

                        {solItems.map((s) => (
                          <div key={`sol-${s.id}`} style={{ padding: '0.55rem 0.7rem', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.08)', fontSize: '0.8rem' }}>
                            <strong style={{ display: 'block', color: '#2563eb', fontSize: '0.76rem' }}>
                              Solución / Nota · {s.gradeDate} ({s.daysRemaining === 0 ? 'Hoy' : s.daysRemaining === 1 ? 'Mañana' : s.daysRemaining < 0 ? `Hace ${Math.abs(s.daysRemaining)}d` : `En ${s.daysRemaining}d`})
                            </strong>
                            <div style={{ color: 'var(--text-title)', fontWeight: 600 }}>{s.subjectTitle}: {s.title}</div>
                          </div>
                        ))}

                        {urgentItems.map((u) => (
                          <div key={`urg-${u.id}`} style={{ padding: '0.55rem 0.7rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', fontSize: '0.8rem' }}>
                            <strong style={{ display: 'block', color: '#d97706', fontSize: '0.76rem' }}>
                              Entrega urgente · {u.dueDate}
                            </strong>
                            <div style={{ color: 'var(--text-title)', fontWeight: 600 }}>{u.subjectTitle}: {u.title}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
        <p className="hero-subtitle">
          {campusSubtitle || 'Supervisa tus entregas, accede a tus pilares de contenido con navegación lateral, calcula tus notas de evaluación continua y mantén tus calendarios sincronizados en un solo lugar.'}
        </p>

        {editingProfile && (
          <form
            onSubmit={handleProfileSubmit}
            style={{
              marginBottom: '1rem', padding: '1rem', borderRadius: '14px',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              display: 'flex', flexDirection: 'column', gap: '0.85rem'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Tu nombre</label>
                <input
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Título del campus</label>
                <input
                  value={draftTitle}
                  onChange={(e) => setCampusTitleDraft(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Subtítulo / objetivo</label>
                <input
                  placeholder="Ej. 2º DAW + Curso SEPE"
                  value={draftSubtitle}
                  onChange={(e) => setDraftSubtitle(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  🔗 Accesos directos personalizados (botones bajo el saludo)
                </span>
                <button
                  type="button"
                  onClick={() => setDraftLinks((prev) => [...prev, { icon: '🔗', label: '', url: '', color: '#3b82f6' }])}
                  style={{
                    padding: '0.3rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  + Añadir acceso directo
                </button>
              </div>
              {draftLinks.map((lnk, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <input
                    placeholder="Icono"
                    value={lnk.icon || ''}
                    onChange={(e) => setDraftLinks((prev) => prev.map((it, i) => i === idx ? { ...it, icon: e.target.value } : it))}
                    style={{ width: '50px', textAlign: 'center', padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                  <input
                    placeholder="Texto (ej. Aula IOC, Radar...)"
                    value={lnk.label || ''}
                    onChange={(e) => setDraftLinks((prev) => prev.map((it, i) => i === idx ? { ...it, label: e.target.value } : it))}
                    style={{ flex: 1, minWidth: '130px', padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                  <input
                    placeholder="URL o ruta (ej. https://... o /radar)"
                    value={lnk.url || ''}
                    onChange={(e) => setDraftLinks((prev) => prev.map((it, i) => i === idx ? { ...it, url: e.target.value } : it))}
                    style={{ flex: 1.5, minWidth: '170px', padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                  <input
                    type="color"
                    value={lnk.color || '#3b82f6'}
                    onChange={(e) => setDraftLinks((prev) => prev.map((it, i) => i === idx ? { ...it, color: e.target.value } : it))}
                    style={{ width: '36px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  />
                  <button
                    type="button"
                    onClick={() => setDraftLinks((prev) => prev.filter((_, i) => i !== idx))}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}
                    title="Eliminar acceso directo"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                🤖 Motor de IA (Opcional — si no tienes API Key, usa ChatGPT/Gemini web + "Pegar respuesta")
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <select
                  value={draftAi.aiProvider || 'none'}
                  onChange={(e) => setDraftAi({ ...draftAi, aiProvider: e.target.value })}
                  style={{ padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                >
                  <option value="none">Sin API (ChatGPT / Gemini web + Pegar)</option>
                  <option value="gemini">Google Gemini API Key (tus tokens)</option>
                  <option value="openai">OpenAI API Key (gpt-4o-mini · tus tokens)</option>
                  <option value="ollama">Ollama Local (gratis, sin API Key)</option>
                </select>
                {draftAi.aiProvider === 'gemini' && (
                  <input
                    type="password"
                    placeholder="Pega tu Gemini API Key (AIza...)"
                    value={draftAi.geminiApiKey || ''}
                    onChange={(e) => setDraftAi({ ...draftAi, geminiApiKey: e.target.value })}
                    style={{ flex: 1, minWidth: '220px', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                )}
                {draftAi.aiProvider === 'openai' && (
                  <input
                    type="password"
                    placeholder="Pega tu OpenAI API Key (sk-...)"
                    value={draftAi.openaiApiKey || ''}
                    onChange={(e) => setDraftAi({ ...draftAi, openaiApiKey: e.target.value })}
                    style={{ flex: 1, minWidth: '220px', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                )}
                {draftAi.aiProvider === 'ollama' && (
                  <>
                    <input
                      placeholder="URL Ollama (http://localhost:11434)"
                      value={draftAi.ollamaUrl || ''}
                      onChange={(e) => setDraftAi({ ...draftAi, ollamaUrl: e.target.value })}
                      style={{ flex: 1, minWidth: '180px', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                    />
                    <input
                      placeholder="Modelo (ej. llama3.2)"
                      value={draftAi.ollamaModel || ''}
                      onChange={(e) => setDraftAi({ ...draftAi, ollamaModel: e.target.value })}
                      style={{ width: '130px', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                    />
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1.05rem', borderRadius: '8px', border: 'none',
                  background: '#3b82f6', color: '#fff', fontWeight: 700, cursor: 'pointer'
                }}
              >
                💾 Guardar perfil y accesos
              </button>
            </div>
          </form>
        )}

        {/* Accesos Directos Personalizables (se gestionan en /configuracion) */}
        {quickLinks.length > 0 && (
          <div style={{ display: 'flex', gap: '0.65rem', margin: '0.9rem 0 1.2rem 0', flexWrap: 'wrap' }}>
            {quickLinks.map((lnk, idx) => {
              const isExternal = /^https?:\/\//i.test(lnk.url || '');
              const bg = lnk.color || '#3b82f6';
              return (
                <a
                  key={`${lnk.label}-${idx}`}
                  href={lnk.url || '#'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    background: bg,
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <span>{lnk.icon || '🔗'}</span>
                  <span>{lnk.label}</span>
                  <span style={{ fontSize: '0.9rem' }}>➔</span>
                </a>
              );
            })}
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <div className="stat-icon-wrap">🚀</div>
            <div>
              <div className="stat-val">{subjectsCount}</div>
              <div className="stat-label">Asignaturas</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">📅</div>
            <div>
              <div className="stat-val">{tasksCount > 0 ? tasksCount : '--'}</div>
              <div className="stat-label">Hitos en Radar</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">⏳</div>
            <div>
              <div className="stat-val">{springBootDateStr}</div>
              <div className="stat-label">Cierre SpringBoot</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
