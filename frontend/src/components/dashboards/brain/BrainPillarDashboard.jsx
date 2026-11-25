import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import { BRAIN_PILLARS_DATA, getBrainPillarById } from '../../../config/brainPillarsData';
import PythonCodeBoard from '../../common/PythonCodeBoard';

export default function BrainPillarDashboard() {
  const { pillarId } = useParams();
  const navigate = useNavigate();

  // Buscar el pilar actual por id, slug o número
  const pillar = useMemo(() => {
    return getBrainPillarById(pillarId) || BRAIN_PILLARS_DATA[0];
  }, [pillarId]);

  // Pestañas internas: 'labs' | 'topics' | 'docs' | 'convalidation'
  const [activeTab, setActiveTab] = useState('labs');

  // Estado persistente de checklist con sincronización híbrida (SQLite + localStorage)
  const [checkedChecklist, setCheckedChecklist] = usePersistentState(
    `brain_pillar_${pillar.id}_checklist`,
    {},
    { category: 'brain' }
  );

  const handleToggleCheck = (labId, idx) => {
    const key = `${labId}_${idx}`;
    setCheckedChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calcular progreso en %
  const totalChecks = useMemo(() => {
    return pillar.labs.reduce((acc, lab) => acc + (lab.checklist ? lab.checklist.length : 0), 0);
  }, [pillar]);

  const completedChecks = useMemo(() => {
    return Object.values(checkedChecklist).filter(Boolean).length;
  }, [checkedChecklist]);

  const progressPercent = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 100;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      
      {/* 1. BREADCRUMB & ACCESO RÁPIDO */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', padding: '0.85rem 0', position: 'sticky', top: '70px', zIndex: 40, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Campus
            </Link>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <Link to="/brain" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              🧠 Second Brain
            </Link>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ color: pillar.color, fontWeight: 700 }}>Pilar {pillar.num}</span>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ color: 'var(--text-title)', fontWeight: 800 }}>{pillar.shortTitle}</span>
          </div>

          {/* Selector rápido entre los 7 pilares */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginRight: '0.2rem' }}>Cambiar Pilar:</span>
            {BRAIN_PILLARS_DATA.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/brain/pilar/${p.id}`)}
                style={{
                  background: p.id === pillar.id ? p.color : 'var(--bg-hover)',
                  color: p.id === pillar.id ? '#ffffff' : 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title={`Ir al Pilar ${p.num}: ${p.title}`}
              >
                {p.num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* 2. HERO HEADER DEL PILAR */}
        <section style={{
          background: pillar.bgGradient,
          border: `1px solid ${pillar.color}40`,
          borderRadius: '20px',
          padding: '2rem 2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px',
                  background: `${pillar.color}22`,
                  color: pillar.color,
                  border: `1px solid ${pillar.color}50`
                }}>
                  PILAR {pillar.num} · {pillar.badge}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  ⏱️ {pillar.hours}
                </span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 850, margin: '0 0 0.5rem 0', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span>{pillar.icon}</span> <span>{pillar.title}</span>
              </h1>
              <p style={{ margin: 0, fontSize: '1.05rem', color: pillar.color, fontWeight: 600, maxWidth: '900px' }}>
                {pillar.tagline}
              </p>
            </div>

            {/* Tarjeta de Progreso y Acceso Rápido al Temario */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              alignItems: 'stretch'
            }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '1rem 1.4rem',
                minWidth: '240px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Progreso del Pilar
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 850, color: pillar.color }}>
                    {progressPercent}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-hover)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: pillar.color, borderRadius: '999px', transition: 'width 0.3s ease' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {completedChecks} de {totalChecks} criterios verificados
                </span>
              </div>

              {/* Botón directo a LessonViewer */}
              <Link
                to={`/brain/pilar/${pillar.id}/lecciones`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  background: pillar.color,
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  textDecoration: 'none',
                  boxShadow: `0 4px 14px ${pillar.color}35`,
                  transition: 'transform 0.15s ease'
                }}
              >
                <span>📖 Estudiar en LessonViewer</span>
                <span>➔</span>
              </Link>
            </div>
          </div>

          <p style={{ margin: '1rem 0 1.4rem 0', fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '950px' }}>
            {pillar.summary}
          </p>

          {/* Badges de convalidación de origen */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>
              Convalida y Unifica:
            </span>
            {pillar.originCredits.map((orig, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: 'var(--bg-card)',
                  color: 'var(--text-title)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                title={orig.desc}
              >
                <span>✓</span> {orig.name}
              </span>
            ))}
          </div>
        </section>

        {/* 3. NAVEGACIÓN POR PESTAÑAS DEL DASHBOARD */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'labs', label: `📋 Laboratorios & Retos (${pillar.labs.length})` },
            { id: 'topics', label: `📚 Temario & Conceptos (${pillar.topics.length})` },
            { id: 'docs', label: `📄 Biblioteca & Manuales (${pillar.docs.length})` },
            { id: 'convalidation', label: '🔗 Mapa de Convalidación Cruzada' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab.id ? pillar.color : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 750,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. CONTENIDO DE LAS PESTAÑAS */}

        {/* PESTAÑA A: LABORATORIOS PRÁCTICOS (EACS) */}
        {activeTab === 'labs' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  📐 Proyectos de Aplicación y Laboratorios ({pillar.labs.length})
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Prácticas equivalentes a las EACs de la IOC y retos técnicos reales.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {pillar.labs.map(lab => (
                <div
                  key={lab.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                  }}
                >
                  {/* Encabezado del Lab */}
                  <div style={{ padding: '1.2rem 1.6rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-hover)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px', background: `${pillar.color}22`, color: pillar.color, textTransform: 'uppercase' }}>
                          Lab 0{lab.num}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(148, 163, 184, 0.15)', color: 'var(--text-muted)' }}>
                          Dificultad: {lab.difficulty}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pillar.color }}>
                          {lab.points}
                        </span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        {lab.title}
                      </h4>
                    </div>
                  </div>

                  {/* Cuerpo del Lab */}
                  <div style={{ padding: '1.4rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {lab.desc}
                    </p>

                    {/* Checklist interactivo */}
                    {lab.checklist && (
                      <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '1.1rem 1.3rem' }}>
                        <strong style={{ fontSize: '0.86rem', color: 'var(--text-title)', display: 'block', marginBottom: '0.6rem' }}>
                          📋 Criterios de Éxito & Checklist:
                        </strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {lab.checklist.map((item, idx) => {
                            const isChecked = !!checkedChecklist[`${lab.id}_${idx}`];
                            return (
                              <label
                                key={idx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.6rem',
                                  fontSize: '0.86rem',
                                  color: isChecked ? 'var(--text-muted)' : 'var(--text-main)',
                                  textDecoration: isChecked ? 'line-through' : 'none',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleCheck(lab.id, idx)}
                                  style={{ accentColor: pillar.color, cursor: 'pointer', width: '16px', height: '16px' }}
                                />
                                <span>{item}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Pizarra de código si tiene snippet */}
                    {lab.codeSnippet && (
                      <div>
                        <strong style={{ fontSize: '0.86rem', color: 'var(--text-title)', display: 'block', marginBottom: '0.4rem' }}>
                          💻 Implementación de Referencia:
                        </strong>
                        <PythonCodeBoard code={lab.codeSnippet.code} filename={lab.codeSnippet.filename} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA B: TEMARIO & CONCEPTOS */}
        {activeTab === 'topics' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Banner de Acceso al Libro de Lecciones */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              background: `${pillar.color}12`,
              border: `1px solid ${pillar.color}35`,
              borderRadius: '14px',
              padding: '1.2rem 1.6rem'
            }}>
              <div style={{ maxWidth: '680px' }}>
                <h4 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 850, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>📖</span> Lector Interactivo de Lecciones (LessonViewer)
                </h4>
                <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Estudia todo el temario unificado de {pillar.shortTitle} en formato libro Markdown interactivo con apuntes técnicos, chuletas y navegación por epígrafes.
                </p>
              </div>
              <Link
                to={`/brain/pilar/${pillar.id}/lecciones`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  background: pillar.color,
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: `0 3px 12px ${pillar.color}40`,
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Abrir en LessonViewer ➔</span>
              </Link>
            </div>

            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
              📚 Módulos Teóricos y Conceptos Fundamentales ({pillar.topics.length})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
              {pillar.topics.map((top, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: pillar.color, background: `${pillar.color}15`, padding: '0.2rem 0.5rem', borderRadius: '5px' }}>
                      Tema {top.num}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      {top.title}
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {top.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA C: BIBLIOTECA & MANUALES */}
        {activeTab === 'docs' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
              📄 Biblioteca de Recursos Oficiales ({pillar.docs.length})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
              {pillar.docs.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '1.3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.85rem'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '5px', background: `${pillar.color}20`, color: pillar.color, textTransform: 'uppercase' }}>
                      {doc.badge} · {doc.size}
                    </span>
                    <h4 style={{ margin: '0.6rem 0 0 0', fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      {doc.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem',
                        padding: '0.45rem 0.8rem',
                        borderRadius: '8px',
                        background: `${pillar.color}15`,
                        color: pillar.color,
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        textDecoration: 'none',
                        border: `1px solid ${pillar.color}35`
                      }}
                    >
                      <span>📖 Abrir PDF</span>
                    </a>
                    <a
                      href={doc.url}
                      download
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.45rem 0.65rem',
                        borderRadius: '8px',
                        background: 'var(--bg-hover)',
                        color: 'var(--text-title)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        textDecoration: 'none',
                        border: '1px solid var(--border-subtle)'
                      }}
                      title="Descargar archivo"
                    >
                      <span>⬇️</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA D: CONVALIDACIÓN CRUZADA */}
        {activeTab === 'convalidation' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.6rem 2rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                🔗 Matriz de Convalidación y Reconocimiento de Competencias
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Este Pilar {pillar.num} aglutina y convalida los siguientes bloques oficiales de tus planes de estudio:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {pillar.originCredits.map((orig, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '1.2rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>🎓</span>
                      <strong style={{ fontSize: '0.96rem', color: 'var(--text-title)' }}>
                        {orig.name}
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {orig.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

