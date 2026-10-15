import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function SubjectRightAside({
  subjectConfig,
  gestionData,
  themeColor = '#3b82f6',
  topOffset = '100px'
}) {
  const [activeTab, setActiveTab] = useState(null); // 'lecciones' | 'eacs' | 'devkit' | 'git' | null
  const [lessons, setLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEacId, setSelectedEacId] = useState(null);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [checklistState, setChecklistState] = useState(() => {
    try {
      const saved = localStorage.getItem(`ioc_${subjectConfig?.code}_checklist`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const navigate = useNavigate();

  // Cargar las lecciones del libro digital de la asignatura cuando esté disponible
  useEffect(() => {
    if (!subjectConfig?.lecciones) return;
    setLessonsLoading(true);
    fetch(subjectConfig.lecciones)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar temario');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setLessons(data);
        }
      })
      .catch(err => console.error('Error cargando lecciones en aside:', err))
      .finally(() => setLessonsLoading(false));
  }, [subjectConfig?.lecciones]);

  // Inicializar la EAC seleccionada por defecto
  useEffect(() => {
    if (gestionData?.eacs && gestionData.eacs.length > 0 && !selectedEacId) {
      const pendingEac = gestionData.eacs.find(e => e.status === 'pending') || gestionData.eacs[0];
      setSelectedEacId(pendingEac.id);
    }
  }, [gestionData, selectedEacId]);

  // Guardar checklist en localStorage
  const handleToggleChecklist = (eacId, index) => {
    setChecklistState(prev => {
      const key = `${eacId}_${index}`;
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`ioc_${subjectConfig?.code}_checklist`, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleCopyCommand = (cmdText, id) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const toggleTab = (tabName) => {
    setActiveTab(prev => (prev === tabName ? null : tabName));
  };

  // Filtrado de lecciones por búsqueda
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    const q = searchQuery.toLowerCase().trim();
    return lessons.filter(l => 
      (l.title && l.title.toLowerCase().includes(q)) ||
      (l.topicNum && String(l.topicNum).toLowerCase().includes(q)) ||
      (l.moduleTitle && l.moduleTitle.toLowerCase().includes(q)) ||
      (l.temaTitle && l.temaTitle.toLowerCase().includes(q))
    );
  }, [lessons, searchQuery]);

  // Agrupación de lecciones por módulo/bloque
  const groupedLessons = useMemo(() => {
    const groups = {};
    filteredLessons.forEach(lesson => {
      const mod = lesson.moduleTitle || lesson.temaTitle || 'Temario General';
      if (!groups[mod]) {
        groups[mod] = [];
      }
      groups[mod].push(lesson);
    });
    return groups;
  }, [filteredLessons]);

  const currentEac = useMemo(() => {
    if (!gestionData?.eacs) return null;
    return gestionData.eacs.find(e => e.id === selectedEacId) || gestionData.eacs[0] || null;
  }, [gestionData, selectedEacId]);

  const daysUntilDue = useMemo(() => {
    if (!currentEac?.dueDate) return null;
    const diff = new Date(currentEac.dueDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  }, [currentEac]);

  if (!subjectConfig) return null;

  const isOpen = Boolean(activeTab);

  return (
    <>
      {/* Overlay transparente para cerrar en móviles/tablets al pulsar fuera */}
      {isOpen && (
        <div 
          onClick={() => setActiveTab(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(2px)',
            zIndex: 960,
            transition: 'opacity 0.2s ease'
          }}
        />
      )}

      {/* Contenedor Flotante del Aside */}
      <aside
        aria-label="Panel lateral derecho de la asignatura"
        style={{
          position: 'fixed',
          top: topOffset,
          right: 0,
          bottom: 0,
          width: '410px',
          maxWidth: '92vw',
          background: 'var(--bg-card, #1e293b)',
          borderLeft: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
          boxShadow: isOpen ? '-8px 0 30px rgba(0,0,0,0.3)' : 'none',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
          zIndex: 970,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Pestañitas Adheridas al Borde Izquierdo del Aside */}
        <div 
          style={{
            position: 'absolute',
            left: '-46px',
            top: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 980
          }}
        >
          {/* Pestaña 1: Lecciones */}
          <button
            onClick={() => toggleTab('lecciones')}
            title="Temario y Lecciones del Libro Digital"
            style={{
              width: '46px',
              height: '48px',
              background: activeTab === 'lecciones' ? 'var(--bg-card, #1e293b)' : 'var(--bg-card, #0f172a)',
              border: `1px solid ${activeTab === 'lecciones' ? themeColor : 'var(--border-subtle, rgba(255,255,255,0.15))'}`,
              borderRight: activeTab === 'lecciones' ? 'none' : undefined,
              borderRadius: '10px 0 0 10px',
              boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
              color: activeTab === 'lecciones' ? themeColor : 'var(--text-main, #e2e8f0)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              transition: 'all 0.2s ease',
              padding: 0
            }}
          >
            <span>{activeTab === 'lecciones' ? '▶' : '📖'}</span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '1px' }}>
              LIBRO
            </span>
          </button>

          {/* Pestaña 2: Actividades / EACs */}
          <button
            onClick={() => toggleTab('eacs')}
            title="Entregas y Actividades Oficiales (EACs)"
            style={{
              width: '46px',
              height: '48px',
              background: activeTab === 'eacs' ? 'var(--bg-card, #1e293b)' : 'var(--bg-card, #0f172a)',
              border: `1px solid ${activeTab === 'eacs' ? themeColor : 'var(--border-subtle, rgba(255,255,255,0.15))'}`,
              borderRight: activeTab === 'eacs' ? 'none' : undefined,
              borderRadius: '10px 0 0 10px',
              boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
              color: activeTab === 'eacs' ? themeColor : 'var(--text-main, #e2e8f0)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              transition: 'all 0.2s ease',
              padding: 0
            }}
          >
            <span>{activeTab === 'eacs' ? '▶' : '📋'}</span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '1px' }}>
              EAC
            </span>
          </button>

          {/* Pestaña 3: DevKit & Herramientas */}
          <button
            onClick={() => toggleTab('devkit')}
            title="DevKit, Recursos & Guías Prácticas"
            style={{
              width: '46px',
              height: '48px',
              background: activeTab === 'devkit' ? 'var(--bg-card, #1e293b)' : 'var(--bg-card, #0f172a)',
              border: `1px solid ${activeTab === 'devkit' ? themeColor : 'var(--border-subtle, rgba(255,255,255,0.15))'}`,
              borderRight: activeTab === 'devkit' ? 'none' : undefined,
              borderRadius: '10px 0 0 10px',
              boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
              color: activeTab === 'devkit' ? themeColor : 'var(--text-main, #e2e8f0)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              transition: 'all 0.2s ease',
              padding: 0
            }}
          >
            <span>{activeTab === 'devkit' ? '▶' : '🛠️'}</span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '1px' }}>
              KIT
            </span>
          </button>

          {/* Pestaña 4: Git & Terminal */}
          <button
            onClick={() => toggleTab('git')}
            title="Comandos Git y Flujo de Ramas"
            style={{
              width: '46px',
              height: '48px',
              background: activeTab === 'git' ? 'var(--bg-card, #1e293b)' : 'var(--bg-card, #0f172a)',
              border: `1px solid ${activeTab === 'git' ? themeColor : 'var(--border-subtle, rgba(255,255,255,0.15))'}`,
              borderRight: activeTab === 'git' ? 'none' : undefined,
              borderRadius: '10px 0 0 10px',
              boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
              color: activeTab === 'git' ? themeColor : 'var(--text-main, #e2e8f0)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              transition: 'all 0.2s ease',
              padding: 0
            }}
          >
            <span>{activeTab === 'git' ? '▶' : '💻'}</span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '1px' }}>
              GIT
            </span>
          </button>
        </div>

        {/* Cabecera del Panel Abierto */}
        <div style={{
          padding: '1.1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{
              background: `${themeColor}22`,
              color: themeColor,
              padding: '0.25rem 0.55rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {subjectConfig.code}
            </span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-title)', fontWeight: 700 }}>
                {activeTab === 'lecciones' && '📖 Temario y Lecciones'}
                {activeTab === 'eacs' && '📋 Entregas Oficiales EAC'}
                {activeTab === 'devkit' && '🛠️ DevKit & Herramientas'}
                {activeTab === 'git' && '💻 Flujo Git & Terminal'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {subjectConfig.title}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px'
            }}
            title="Cerrar panel"
          >
            ✕
          </button>
        </div>

        {/* Contenido según la pestaña activa */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>

          {/* ============================================================= */}
          {/* PESTAÑA 1: LECCIONES / TEMARIO                                */}
          {/* ============================================================= */}
          {activeTab === 'lecciones' && (
            <div>
              {/* Buscador de lecciones */}
              <div style={{ marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Buscar lección o concepto..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-hover, rgba(255,255,255,0.05))',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Botón rápido para abrir el Libro Digital completo */}
              <div style={{ marginBottom: '1.25rem' }}>
                <Link
                  to={subjectConfig.gestion ? `/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}` : `/ioc/${subjectConfig.code}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: themeColor,
                    color: '#ffffff',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    textAlign: 'center'
                  }}
                >
                  <span>Abrir Libro Digital Completo</span>
                  <span>→</span>
                </Link>
              </div>

              {lessonsLoading && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Cargando índice de lecciones... 🚀
                </div>
              )}

              {!lessonsLoading && Object.keys(groupedLessons).length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No se han encontrado lecciones que coincidan con la búsqueda.
                </div>
              )}

              {/* Listado agrupado por módulos */}
              {!lessonsLoading && Object.entries(groupedLessons).map(([moduleTitle, items]) => (
                <div key={moduleTitle} style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: themeColor,
                    letterSpacing: '0.5px',
                    marginBottom: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '0.3rem'
                  }}>
                    <span>{moduleTitle}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {items.length} temas
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {items.map(lesson => (
                      <Link
                        key={lesson.slug || lesson.id}
                        to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}/${lesson.slug}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          color: 'var(--text-main)',
                          background: 'var(--bg-hover, rgba(255,255,255,0.03))',
                          border: '1px solid var(--border-subtle, rgba(255,255,255,0.05))',
                          fontSize: '0.85rem',
                          lineHeight: '1.3',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = themeColor;
                          e.currentTarget.style.transform = 'translateX(3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-subtle, rgba(255,255,255,0.05))';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {lesson.topicNum ? (
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            background: `${themeColor}22`,
                            color: themeColor,
                            fontFamily: 'var(--font-mono, monospace)',
                            flexShrink: 0
                          }}>
                            {lesson.topicNum}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>📄</span>
                        )}
                        <span style={{ flex: 1 }}>{lesson.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================= */}
          {/* PESTAÑA 2: EACS & ENTREGAS                                     */}
          {/* ============================================================= */}
          {activeTab === 'eacs' && (
            <div>
              {/* Solapas superiores para elegir EAC */}
              {gestionData?.eacs && gestionData.eacs.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                  {gestionData.eacs.map(eac => {
                    const isSelected = eac.id === currentEac?.id;
                    return (
                      <button
                        key={eac.id}
                        onClick={() => setSelectedEacId(eac.id)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 0.6rem',
                          borderRadius: '8px',
                          border: isSelected ? `2px solid ${themeColor}` : '1px solid var(--border-subtle)',
                          background: isSelected ? `${themeColor}18` : 'var(--bg-hover)',
                          color: isSelected ? themeColor : 'var(--text-muted)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {eac.id.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentEac ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Tarjeta de estado de la EAC */}
                  <div style={{
                    background: 'var(--bg-hover, rgba(255,255,255,0.03))',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '1.1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                        background: currentEac.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                        color: currentEac.status === 'completed' ? '#10b981' : '#f59e0b',
                        border: `1px solid ${currentEac.status === 'completed' ? '#10b981' : '#f59e0b'}`
                      }}>
                        {currentEac.status === 'completed' ? '✅ Entregada' : currentEac.status === 'pending' ? '⏳ Pendiente' : '🔒 Bloqueada'}
                      </span>

                      {currentEac.weight && (
                        <span style={{ fontSize: '0.78rem', color: themeColor, fontWeight: 700 }}>
                          Peso: {currentEac.weight}
                        </span>
                      )}
                    </div>

                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: 'var(--text-title)', fontWeight: 700, lineHeight: 1.3 }}>
                      {currentEac.title}
                    </h4>

                    {currentEac.dueDate && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                        <span>📅 Fecha límite:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{currentEac.dueDate}</strong>
                        {daysUntilDue !== null && (
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: daysUntilDue > 7 ? '#10b981' : daysUntilDue >= 0 ? '#f59e0b' : '#ef4444'
                          }}>
                            ({daysUntilDue > 0 ? `Quedan ${daysUntilDue} días` : daysUntilDue === 0 ? '¡Hoy es el día!' : 'Vencida'})
                          </span>
                        )}
                      </div>
                    )}

                    {currentEac.description && (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {currentEac.description}
                      </p>
                    )}
                  </div>

                  {/* Checklist interactivo de entrega */}
                  {currentEac.checklist && currentEac.checklist.length > 0 && (
                    <div style={{
                      background: 'var(--bg-hover, rgba(255,255,255,0.03))',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '1.1rem'
                    }}>
                      <h5 style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-title)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        ☑️ Requisitos y Checklist de Entrega
                      </h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {currentEac.checklist.map((item, idx) => {
                          const isChecked = Boolean(checklistState[`${currentEac.id}_${idx}`]);
                          return (
                            <label
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.6rem',
                                fontSize: '0.84rem',
                                color: isChecked ? 'var(--text-muted)' : 'var(--text-main)',
                                textDecoration: isChecked ? 'line-through' : 'none',
                                cursor: 'pointer',
                                lineHeight: '1.4'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleChecklist(currentEac.id, idx)}
                                style={{ marginTop: '0.2rem', accentColor: themeColor }}
                              />
                              <span>{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Enlaces de Acción para esta EAC */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {currentEac.theorySlug && (
                      <Link
                        to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}/${currentEac.theorySlug}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          background: `${themeColor}22`,
                          color: themeColor,
                          border: `1px solid ${themeColor}44`,
                          padding: '0.65rem 1rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textAlign: 'center'
                        }}
                      >
                        <span>📖 Ir a la Teoría de la {currentEac.id.toUpperCase()}</span>
                        <span>→</span>
                      </Link>
                    )}

                    {currentEac.resolvedExampleSlug && (
                      <Link
                        to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}/${currentEac.resolvedExampleSlug}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          padding: '0.65rem 1rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textAlign: 'center'
                        }}
                      >
                        <span>💡 {currentEac.resolvedExampleTitle || 'Ver Ejemplo Resuelto'}</span>
                        <span>→</span>
                      </Link>
                    )}

                    <a
                      href="https://ioc.xtec.cat/campus/my/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1px dashed var(--border-subtle)',
                        padding: '0.6rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        textAlign: 'center'
                      }}
                    >
                      <span>Subir entrega al Campus Oficial IOC</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No se han registrado entregas para esta materia.
                </div>
              )}
            </div>
          )}

          {/* ============================================================= */}
          {/* PESTAÑA 3: DEVKIT & HERRAMIENTAS                               */}
          {/* ============================================================= */}
          {activeTab === 'devkit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Herramientas, simuladores, guías de sistema y recursos preparados específicamente para <strong>{subjectConfig.title}</strong>:
              </p>

              {subjectConfig.devkitItems && subjectConfig.devkitItems.length > 0 ? (
                subjectConfig.devkitItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-hover, rgba(255,255,255,0.03))',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h5 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-title)', fontWeight: 700 }}>
                        {item.title}
                      </h5>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        background: `${themeColor}22`,
                        color: themeColor,
                        textTransform: 'uppercase'
                      }}>
                        {item.type}
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                      {item.description}
                    </p>

                    <div style={{ marginTop: '0.4rem' }}>
                      {item.link ? (
                        <Link
                          to={item.link}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.82rem',
                            color: themeColor,
                            fontWeight: 700,
                            textDecoration: 'none'
                          }}
                        >
                          <span>Abrir herramienta</span>
                          <span>→</span>
                        </Link>
                      ) : item.slug ? (
                        <Link
                          to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}/${item.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.82rem',
                            color: themeColor,
                            fontWeight: 700,
                            textDecoration: 'none'
                          }}
                        >
                          <span>Consultar guía</span>
                          <span>→</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Próximamente se añadirán kits interactivos para esta materia.
                </div>
              )}

              {/* Acceso a Second Brain */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: '10px',
                padding: '1rem',
                marginTop: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🧠</span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-title)' }}>Conexión con Second Brain</strong>
                </div>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  Consulta los puentes cruzados y la arquitectura compartida entre {subjectConfig.title}, Accenture y SEPE.
                </p>
                <Link
                  to="/brain"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#8b5cf6',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  Explorar Second Brain →
                </Link>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* PESTAÑA 4: GIT & TERMINAL                                      */}
          {/* ============================================================= */}
          {activeTab === 'git' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Flujo de trabajo con Git y comandos de terminal recomendados para las prácticas de <strong>{subjectConfig.title}</strong>:
              </p>

              {[
                {
                  id: 'branch',
                  label: `Crear rama de trabajo (${currentEac ? currentEac.id : 'eac1'})`,
                  cmd: `git checkout -b ${currentEac ? currentEac.id : 'eac1'}-solucion-oficial`
                },
                {
                  id: 'status',
                  label: 'Ver estado de los cambios',
                  cmd: 'git status -s'
                },
                {
                  id: 'commit',
                  label: 'Añadir y confirmar entrega',
                  cmd: `git add .\ngit commit -m "feat(${subjectConfig.code}): resolucion ${currentEac ? currentEac.id.toUpperCase() : 'EAC1'}"`
                },
                {
                  id: 'push',
                  label: 'Subir cambios a GitHub',
                  cmd: `git push -u origin ${currentEac ? currentEac.id : 'eac1'}-solucion-oficial`
                }
              ].map(block => (
                <div
                  key={block.id}
                  style={{
                    background: 'var(--bg-hover, rgba(255,255,255,0.03))',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.75rem 0.9rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {block.label}
                    </span>
                    <button
                      onClick={() => handleCopyCommand(block.cmd, block.id)}
                      style={{
                        background: copiedCmd === block.id ? '#10b981' : 'var(--bg-card)',
                        color: copiedCmd === block.id ? '#fff' : 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {copiedCmd === block.id ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <pre style={{
                    margin: 0,
                    padding: '0.5rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: '#38bdf8',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {block.cmd}
                  </pre>
                </div>
              ))}
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
