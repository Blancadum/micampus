import React, { useState, useEffect, useMemo } from 'react';
import { IocActivitiesRepository } from '../../../../data/models/IocActivityModel';

/**
 * ============================================================================
 * @component   LessonIocActivitiesSidebar
 * @description Panel lateral derecho de Actividades/EACs con diseño idéntico
 *              al EAC DevKit: solapas superiores (EAC1, EAC2, EAC3), tarjeta
 *              descriptiva con título, fecha límite y resumen, bloques de
 *              evaluación y requisitos.
 *              Al clicar en cualquier solapa, AUTOMÁTICAMENTE sitúa el libro en
 *              el punto inicial de la teoría de dicha entrega.
 * ============================================================================
 */
export default function LessonIocActivitiesSidebar({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  gestionSource,
  subjectTitle = 'Actividades IOC',
  themeColor = '#3b82f6',
  onSelectSection,
  topOffset = '24px'
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gestionData, setGestionData] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  useEffect(() => {
    if (!gestionSource) return;
    setLoading(true);
    fetch(gestionSource)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar actividades de gestión');
        return res.json();
      })
      .then(data => {
        setGestionData(data);
        if (data.eacs && data.eacs.length > 0) {
          const defaultAct = data.eacs.find(a => a.status === 'pending') || data.eacs[0];
          setSelectedActivityId(defaultAct.id);
        }
      })
      .catch(err => {
        console.error('Error cargando actividades IOC:', err);
      })
      .finally(() => setLoading(false));
  }, [gestionSource]);

  const repository = useMemo(() => {
    return new IocActivitiesRepository(gestionData?.eacs || []);
  }, [gestionData]);

  const activities = repository.getAll();
  const currentActivity = repository.findById(selectedActivityId) || activities[0] || null;

  // Selección de solapa: actualiza vista y AUTOMÁTICAMENTE salta a la teoría
  const handleSelectActivity = (activity) => {
    if (!activity) return;
    setSelectedActivityId(activity.id);
    if (activity.hasTheorySlug() && onSelectSection) {
      onSelectSection(activity.theorySlug);
    }
  };

  return (
    <aside
      aria-label="Panel lateral de entregas y actividades EAC"
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '400px',
        maxWidth: '90vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 28px rgba(0,0,0,0.25)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Botón Pestaña Adherido al Margen Izquierdo */}
      <button
        type="button"
        onClick={toggle}
        style={{
          position: 'absolute',
          left: '-40px',
          top: topOffset,
          width: '40px',
          height: '46px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRight: 'none',
          borderRadius: '10px 0 0 10px',
          boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
          color: themeColor,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.15rem',
          zIndex: 941,
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title={isOpen ? 'Cerrar panel de entregas' : 'Abrir Entregas y Actividades EAC'}
        aria-label="Alternar panel de entregas"
      >
        <span>{isOpen ? '✕' : '📝'}</span>
      </button>

      {/* Contenedor con Scroll de las Secciones */}
      <div
        style={{
          padding: '1.4rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}
      >
        {/* Cabecera Principal */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.1rem',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🎯</span>
            <span style={{ fontWeight: 800, fontSize: '1.08rem', color: 'var(--text-title)', letterSpacing: '-0.01em' }}>
              EAC Entregas · Actividades
            </span>
          </div>

          <span
            style={{
              fontSize: '0.78rem',
              background: `${themeColor}20`,
              color: themeColor,
              padding: '0.22rem 0.6rem',
              borderRadius: '6px',
              fontWeight: 800,
              border: `1px solid ${themeColor}40`,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {currentActivity?.weight || 'AVALUACIÓ CONTINUADA'}
          </span>
        </header>

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Cargando entregas oficiales... ⏳
          </div>
        )}

        {!loading && activities.length > 0 && currentActivity && (
          <>
            {/* 1. Selector de Solapas de EAC (Idéntico a EacUnitSelector) */}
            <nav
              aria-label="Selector de EACs"
              style={{
                display: 'flex',
                gap: '0.45rem',
                background: 'var(--bg-input)',
                padding: '0.35rem',
                borderRadius: '10px',
                marginBottom: '1.3rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {activities.map(act => {
                const isSelected = currentActivity.id === act.id;
                const tabLabel = act.shortBadge.replace(/\s+/g, '');

                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSelectActivity(act)}
                    style={{
                      flex: 1,
                      background: isSelected ? 'var(--bg-card)' : 'transparent',
                      color: isSelected ? themeColor : 'var(--text-muted)',
                      border: isSelected ? '1px solid var(--border-subtle)' : 'none',
                      borderRadius: '7px',
                      padding: '0.45rem 0.3rem',
                      fontSize: '0.86rem',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                      transition: 'all 0.15s ease',
                      textAlign: 'center'
                    }}
                    title={`Seleccionar ${tabLabel} y saltar a su teoría`}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </nav>

            {/* 2. Tarjeta Resumen y Explicación de la EAC Activa (Idéntico a EacHeaderCard) */}
            <div
              style={{
                background: 'var(--bg-hover)',
                border: `1px solid ${themeColor}35`,
                borderLeft: `5px solid ${themeColor}`,
                borderRadius: '10px',
                padding: '1rem 1.15rem',
                marginBottom: '1.4rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.3' }}>
                  {currentActivity.title}
                </h4>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: '#d97706',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    background: 'rgba(245, 158, 11, 0.12)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '5px',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}
                >
                  ⏳ {currentActivity.formattedDueDate}
                </span>
              </div>
              <p style={{ margin: '0.55rem 0 0', fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: '1.45', fontWeight: 500 }}>
                {currentActivity.description || currentActivity.title}
              </p>
            </div>

            {/* Acceso a Teleprompter & Live Runner para DESP EAC1 */}
            {(currentActivity.id === 'eac1' && (gestionSource?.includes('desp') || subjectTitle?.toLowerCase().includes('despliegue'))) && (
              <div style={{ marginBottom: '1.4rem' }}>
                <a
                  href="/ioc/desp/eac1-teleprompter"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span>🎬</span>
                  <span>Teleprompter & Live Runner EAC 1 ↗</span>
                </a>
              </div>
            )}

            {/* Acceso a Ejemplo Resuelto EAC 1 (Rosa Fucsia, idéntico al índice lateral) */}
            {(currentActivity.resolvedExampleSlug || (currentActivity.id === 'eac1' && (gestionSource?.includes('ent') || subjectTitle?.toLowerCase().includes('entorno')))) && (
              <div style={{ marginBottom: '1.4rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    const parentSlug = currentActivity.resolvedTopicSlug || '2-6-resolver-un-enunciado-de-clases-paso-a-paso';
                    const subId = currentActivity.resolvedExampleSlug || '2-6-3-eac1-festa-major';
                    if (onSelectSection) {
                      onSelectSection(parentSlug);
                    }
                    setTimeout(() => {
                      const el = document.getElementById(subId);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 150;
                        window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
                      }
                    }, 60);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.65rem',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(236, 72, 153, 0.35)',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.48)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(236, 72, 153, 0.35)';
                  }}
                  title="Ir al apartado 2.6.3 con la resolución oficial de la EAC 1 (Fiesta Mayor)"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🎯</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 800 }}>
                        {currentActivity.resolvedExampleTitle || 'Ejemplo Resuelto EAC 1 (Fiesta Mayor)'}
                      </span>
                      <span style={{ fontSize: '0.74rem', opacity: 0.95, fontWeight: 500, marginTop: '0.18rem' }}>
                        Ver resolución paso a paso (Tema 2.6.3)
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, opacity: 0.9 }}>➔</span>
                </button>
              </div>
            )}

            {/* 3. Bloque de Ponderación e Impacto Académico */}
            <section style={{ marginBottom: '1.4rem' }}>
              <div
                style={{
                  fontSize: '0.86rem',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: 'var(--text-title)',
                  letterSpacing: '0.6px',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>⚖️</span>
                <span>Ponderación y Calificación (AC)</span>
              </div>

              <div
                style={{
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '0.95rem 1.05rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    Ponderación en la Evaluación Continua
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {currentActivity.isPending() ? 'Estado: Pendiente de entrega' : 'Estado: Bloqueado temporalmente'}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: themeColor,
                    background: `${themeColor}15`,
                    padding: '0.3rem 0.65rem',
                    borderRadius: '7px',
                    border: `1px solid ${themeColor}35`
                  }}
                >
                  {currentActivity.weight || 'Evaluable'}
                </span>
              </div>
            </section>

            {/* 4. Bloque de Requisitos y Checklist de Entrega */}
            {Array.isArray(currentActivity.checklist) && currentActivity.checklist.length > 0 && (
              <section style={{ marginBottom: '1.2rem' }}>
                <div
                  style={{
                    fontSize: '0.86rem',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    color: 'var(--text-title)',
                    letterSpacing: '0.6px',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>📋</span>
                  <span>Criterios y Objetivos a Cumplir</span>
                </div>

                <div
                  style={{
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '0.9rem 1rem'
                  }}
                >
                  <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {currentActivity.checklist.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text-main)',
                          lineHeight: '1.4',
                          fontWeight: 500
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
