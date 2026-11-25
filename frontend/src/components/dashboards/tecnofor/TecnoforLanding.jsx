import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TECNOFOR_COURSE_DATA } from '../../../data/tecnoforData';
import { PYTHON_DOCS, PYTHON_EXERCISES } from '../../../data/tecnoforPythonData';
import PythonCodeBoard from '../../common/PythonCodeBoard';

export default function TecnoforLanding() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cursoParam = searchParams.get('curso');

  // Pestañas: 'general' | 'python' | 'java' | 'angular' | 'agentes' | 'certificaciones'
  const [activeTab, setActiveTab] = useState(() => {
    if (cursoParam && ['python', 'java', 'angular', 'agentes'].includes(cursoParam.toLowerCase())) {
      return cursoParam.toLowerCase();
    }
    return 'general';
  });

  // Sincronizar cambios en los parámetros de la URL
  useEffect(() => {
    if (cursoParam && ['python', 'java', 'angular', 'agentes'].includes(cursoParam.toLowerCase())) {
      setActiveTab(cursoParam.toLowerCase());
    }
  }, [cursoParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'general' || tabId === 'certificaciones') {
      searchParams.delete('curso');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ curso: tabId }, { replace: true });
    }
  };

  // Filtros y búsqueda para el taller de Python
  const [pythonCategory, setPythonCategory] = useState('all');
  const [pythonSearch, setPythonSearch] = useState('');
  const [expandedExercises, setExpandedExercises] = useState(() => {
    const initial = {};
    if (PYTHON_EXERCISES.length > 0) initial[PYTHON_EXERCISES[0].id] = true;
    if (PYTHON_EXERCISES.length > 1) initial[PYTHON_EXERCISES[1].id] = true;
    return initial;
  });

  const toggleExercise = (id) => {
    setExpandedExercises(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllExercises = (open) => {
    const next = {};
    if (open) {
      PYTHON_EXERCISES.forEach(ex => { next[ex.id] = true; });
    }
    setExpandedExercises(next);
  };

  const filteredPythonExercises = useMemo(() => {
    return PYTHON_EXERCISES.filter(ex => {
      const matchCat = pythonCategory === 'all' || ex.category === pythonCategory;
      const q = pythonSearch.trim().toLowerCase();
      const matchSearch = !q || 
        ex.title.toLowerCase().includes(q) || 
        ex.filename.toLowerCase().includes(q) || 
        ex.desc.toLowerCase().includes(q) ||
        ex.code.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [pythonCategory, pythonSearch]);

  const { title, diplomaTitle, dates, modality, philosophy, certifications, courses, dossierPdfUrl } = TECNOFOR_COURSE_DATA;

  const pythonCourse = courses.find((c) => c.id === 'python');
  const javaCourse = courses.find((c) => c.id === 'java');
  const angularCourse = courses.find((c) => c.id === 'angular');
  const agentesCourse = courses.find((c) => c.id === 'agentes');

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
            <span style={{ color: '#0ea5e9', fontWeight: 700 }}>TecnoFor</span>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ color: 'var(--text-title)', fontWeight: 800 }}>Agentic Software Developer</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a
              href={dossierPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.2))',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                color: '#0ea5e9',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
              title="Descargar dossier completo en formato PDF"
            >
              <span>📄 Dossier Oficial (PDF)</span> <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        
        {/* 2. HERO BANNER PRINCIPAL */}
        <header
          style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(139, 92, 246, 0.08) 100%)',
            border: '1px solid rgba(14, 165, 233, 0.25)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(14, 165, 233, 0.15)', color: '#0284c7', padding: '0.3rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.5px' }}>
            <span>🌟 FORMACIÓN 100% SUBVENCIONADA · SEPE & TECNOFOR</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 850, margin: '0 0 0.8rem 0', color: 'var(--text-title)', lineHeight: 1.2 }}>
            {diplomaTitle}
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '850px', lineHeight: 1.6, margin: '0 0 1.6rem 0' }}>
            Itinerario formativo integral de capacitación desde cero: <strong style={{ color: '#10b981' }}>Python (El Dato)</strong> → <strong style={{ color: '#ea580c' }}>Java (El Backend)</strong> → <strong style={{ color: '#e11d48' }}>Angular (El Frontend)</strong> → <strong style={{ color: '#8b5cf6' }}>IA Agéntica (Spec Driven Development)</strong>.
          </p>

          {/* CHIPS DE METADATOS CLAVE */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>📅</span> <span>{dates.display}</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>⏰</span> <span>{dates.schedule}</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>🎓</span> <span>3 Certs SEPE + Diploma TecnoFor</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>💻</span> <span>Aula Virtual Directo</span>
            </div>
          </div>
        </header>

        {/* 3. BARRA DE NAVEGACIÓN POR PESTAÑAS (TABS) */}
        <nav
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {[
            { id: 'general', label: 'Visión General', icon: '🏛️', color: '#0ea5e9' },
            { id: 'python', label: '01 · Python (50h)', icon: '🐍', color: '#10b981' },
            { id: 'java', label: '02 · Java (30h)', icon: '☕', color: '#ea580c' },
            { id: 'angular', label: '03 · Angular (30h)', icon: '🅰️', color: '#e11d48' },
            { id: 'agentes', label: '04 · IA & Agentes (SDD)', icon: '🤖', color: '#8b5cf6' },
            { id: 'certificaciones', label: 'Certs SEPE & Titulación', icon: '📜', color: '#eab308' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.1rem',
                  borderRadius: '12px 12px 0 0',
                  border: 'none',
                  borderBottom: isActive ? `3px solid ${tab.color}` : '3px solid transparent',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--text-title)' : 'var(--text-muted)',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease'
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 4. CONTENIDO DINÁMICO SEGÚN PESTAÑA ACTIVA */}

        {/* PESTAÑA A: VISIÓN GENERAL */}
        {activeTab === 'general' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Las 4 tarjetas de acceso directo a los cursos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleTabChange(course.id)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = course.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '1.8rem' }}>
                        {course.id === 'python' ? '🐍' : course.id === 'java' ? '☕' : course.id === 'angular' ? '🅰️' : '🤖'}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px', background: `${course.color}22`, color: course.color, textTransform: 'uppercase' }}>
                        {course.hours}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Módulo {course.num} · {course.badge}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.3rem 0 0.6rem 0', color: 'var(--text-title)' }}>
                      {course.sigla}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {course.summary}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      {course.sepeCode ? `SEPE: ${course.sepeCode}` : 'Hito Especialización'}
                    </span>
                    <span style={{ color: course.color, fontWeight: 700, fontSize: '0.85rem' }}>
                      Ver temario ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Filosofía del curso: Fundamentos antes que Agentes */}
            <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧠</span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  ¿Por qué empezar por los fundamentos?
                </h3>
              </div>
              <blockquote style={{ margin: '0 0 1rem 0', padding: '0.8rem 1.2rem', borderLeft: '4px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.06)', fontStyle: 'italic', fontSize: '1.02rem', color: 'var(--text-title)', lineHeight: 1.6 }}>
                "{philosophy.quote}"
              </blockquote>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {philosophy.explanation}
              </p>
            </article>

            {/* Camino de Hitos & Certificaciones */}
            <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                🏆 Sistema de Desbloqueo y Acreditaciones
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                <div style={{ padding: '1.2rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <div style={{ fontWeight: 800, color: '#10b981', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    HITO 1 · TRONCALES
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: 'var(--text-title)' }}>
                    Superar los primeros 3 módulos
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Python (50h) + Java (30h) + Angular (30h). Obtienes <strong>3 certificaciones oficiales del SEPE</strong> y desbloqueas las <strong>Masterclasses de Agentes</strong>.
                  </p>
                </div>

                <div style={{ padding: '1.2rem', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
                  <div style={{ fontWeight: 800, color: '#8b5cf6', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    HITO 2 · ESPECIALIZACIÓN SDD
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: 'var(--text-title)' }}>
                    Curso Completo Spec Driven Development
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Acceso exclusivo a los 21 vídeos teóricos, 3 laboratorios guiados y GitHub Spec Kit. Otorga el <strong>Diploma propio de TecnoFor: Agentic Software Developer</strong>.
                  </p>
                </div>
              </div>
            </article>

          </section>
        )}

        {/* PESTAÑA B: PYTHON (50h) */}
        {activeTab === 'python' && pythonCourse && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <header style={{ background: 'var(--bg-card)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '0.2rem 0.6rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                    BLOQUE 01 · {pythonCourse.badge}
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 850, margin: '0.4rem 0 0.3rem 0', color: 'var(--text-title)' }}>
                    🐍 {pythonCourse.title}
                  </h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Especialidad SEPE: <strong>{pythonCourse.sepeCode}</strong> · {pythonCourse.sepeTitle}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                    ⏱️ 50 horas
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                    🎯 Examen PCAP™
                  </div>
                  <a
                    href="https://github.com/Blancadum/aprendiendo-python"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      padding: '0.42rem 0.95rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
                  >
                    <span>🐙</span> Repositorio GitHub ↗
                  </a>
                </div>
              </div>

              <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {pythonCourse.summary}
              </p>

              {/* BANNER OFICIAL: REPOSITORIO GITHUB BLANCADUM/APRENDIENDO-PYTHON */}
              <div style={{
                padding: '1rem 1.3rem',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1.5px solid rgba(16, 185, 129, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#10b981',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    flexShrink: 0
                  }}>
                    🐍
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>Repositorio de Prácticas y Código:</span>
                      <a
                        href="https://github.com/Blancadum/aprendiendo-python"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#10b981', textDecoration: 'underline', fontWeight: 800 }}
                      >
                        Blancadum/aprendiendo-python ↗
                      </a>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Fundamentos, ejercicios de algoritmia, librerías NumPy, Pandas, Matplotlib, Fechas y Machine Learning.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <code style={{
                    fontSize: '0.78rem',
                    background: 'var(--bg-card)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-title)',
                    fontFamily: 'monospace'
                  }}>
                    git clone https://github.com/Blancadum/aprendiendo-python.git
                  </code>
                  <a
                    href="https://github.com/Blancadum/aprendiendo-python"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      padding: '0.42rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    Abrir en GitHub ↗
                  </a>
                </div>
              </div>
            </header>

            {/* Desglose de los 5 módulos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-title)', fontWeight: 800 }}>
                📚 Temario Oficial (5 Módulos · 50 Horas)
              </h3>
              {pythonCourse.modules.map((mod) => (
                <div key={mod.num} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.3rem 1.6rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    {mod.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-title)' }}>
                        {mod.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                        {mod.hours}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECCIÓN 1: 📚 BIBLIOTECA DIGITAL & MANUALES OFICIALES (PDF) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', color: 'var(--text-title)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📚</span> Biblioteca Oficial & Manuales PDF ({PYTHON_DOCS.length} Documentos)
                  </h3>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    Recursos oficiales sincronizados desde el repositorio{' '}
                    <a
                      href="https://github.com/Blancadum/aprendiendo-python"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#10b981', fontWeight: 800, textDecoration: 'underline' }}
                    >
                      Blancadum/aprendiendo-python ↗
                    </a>{' '}
                    para lectura y descarga directa.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.2rem' }}>
                {PYTHON_DOCS.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.85rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s ease, border-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = doc.color || '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: `${doc.color || '#10b981'}1a`,
                          color: doc.color || '#10b981'
                        }}>
                          {doc.badge}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                          📦 {doc.size}
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        {doc.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {doc.desc}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
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
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          background: 'rgba(16, 185, 129, 0.12)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#10b981',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textDecoration: 'none',
                          transition: 'background 0.15s ease'
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
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-title)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textDecoration: 'none'
                        }}
                        title="Descargar PDF"
                      >
                        <span>⬇️</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 2: 🧪 TALLER DE CÓDIGO & EJERCICIOS RESUELTOS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', color: 'var(--text-title)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🧪</span> Taller Práctico & Ejercicios Resueltos ({filteredPythonExercises.length} de {PYTHON_EXERCISES.length})
                  </h3>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    Código completo comprobado de las prácticas, sincronizado con el repositorio{' '}
                    <a
                      href="https://github.com/Blancadum/aprendiendo-python"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#10b981', fontWeight: 800, textDecoration: 'underline' }}
                    >
                      Blancadum/aprendiendo-python ↗
                    </a>
                    , con botones de copia y descarga directa.
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => toggleAllExercises(true)}
                    style={{
                      background: 'var(--bg-hover)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--text-title)',
                      cursor: 'pointer'
                    }}
                  >
                    ▾ Desplegar todos
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAllExercises(false)}
                    style={{
                      background: 'var(--bg-hover)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--text-title)',
                      cursor: 'pointer'
                    }}
                  >
                    ▴ Plegar todos
                  </button>
                </div>
              </div>

              {/* Barra de Filtros y Búsqueda */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', background: 'var(--bg-card)', padding: '0.85rem 1.1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                {/* Categorías */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: `Todos (${PYTHON_EXERCISES.length})` },
                    { id: 'm1', label: `Módulo 1 · Tipos (${PYTHON_EXERCISES.filter(e => e.category === 'm1').length})` },
                    { id: 'm2', label: `Módulo 2 · Condicionales (${PYTHON_EXERCISES.filter(e => e.category === 'm2').length})` },
                    { id: 'snippets', label: `Ejemplos & Fechas (${PYTHON_EXERCISES.filter(e => e.category === 'snippets').length})` },
                    { id: 'ml', label: `Machine Learning (${PYTHON_EXERCISES.filter(e => e.category === 'ml').length})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPythonCategory(tab.id)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        border: pythonCategory === tab.id ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                        background: pythonCategory === tab.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                        color: pythonCategory === tab.id ? '#10b981' : 'var(--text-muted)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Input de Búsqueda */}
                <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 240px', maxWidth: '380px' }}>
                  <input
                    type="text"
                    value={pythonSearch}
                    onChange={(e) => setPythonSearch(e.target.value)}
                    placeholder="🔍 Buscar por enunciado o código..."
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-title)',
                      fontSize: '0.82rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {pythonSearch && (
                    <button
                      type="button"
                      onClick={() => setPythonSearch('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        padding: 0
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Lista de Ejercicios */}
              {filteredPythonExercises.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '2rem' }}>🔍</span>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No se han encontrado ejercicios que coincidan con la búsqueda.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredPythonExercises.map((ex) => {
                    const isExpanded = !!expandedExercises[ex.id];
                    return (
                      <div
                        key={ex.id}
                        style={{
                          background: 'var(--bg-card)',
                          border: isExpanded ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxShadow: isExpanded ? '0 4px 14px rgba(0,0,0,0.06)' : 'none',
                          transition: 'border-color 0.15s ease'
                        }}
                      >
                        {/* Cabecera clicable */}
                        <div
                          onClick={() => toggleExercise(ex.id)}
                          style={{
                            padding: '0.9rem 1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.6rem',
                            background: isExpanded ? 'rgba(16, 185, 129, 0.04)' : 'transparent'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '5px',
                              background: ex.category === 'm1' ? 'rgba(16, 185, 129, 0.15)' :
                                          ex.category === 'm2' ? 'rgba(59, 130, 246, 0.15)' :
                                          ex.category === 'snippets' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                              color: ex.category === 'm1' ? '#10b981' :
                                     ex.category === 'm2' ? '#3b82f6' :
                                     ex.category === 'snippets' ? '#f59e0b' : '#8b5cf6'
                            }}>
                              {ex.categoryLabel}
                            </span>
                            <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 750, color: 'var(--text-title)' }}>
                              {ex.title}
                            </h4>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                              ({ex.filename})
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontSize: '0.8rem', color: isExpanded ? '#10b981' : 'var(--text-dim)', fontWeight: 700 }}>
                              {isExpanded ? 'Ocultar código ▴' : 'Ver solución ▾'}
                            </span>
                          </div>
                        </div>

                        {/* Cuerpo expandido */}
                        {isExpanded && (
                          <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
                            {/* Descripción / Enunciado */}
                            <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                              <strong style={{ color: 'var(--text-title)', display: 'block', marginBottom: '0.3rem' }}>
                                📋 Enunciado y Especificación:
                              </strong>
                              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
                                {ex.desc}
                              </p>
                            </div>

                            {/* Captura de Enunciado (si aplica) */}
                            {ex.img && (
                              <div style={{ marginTop: '0.85rem', textAlign: 'center', background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.6rem' }}>
                                <a href={ex.img} target="_blank" rel="noopener noreferrer" title="Clic para ampliar imagen en pestaña nueva">
                                  <img
                                    src={ex.img}
                                    alt={ex.title}
                                    loading="lazy"
                                    style={{ maxWidth: '100%', maxHeight: '240px', objectFit: 'contain', borderRadius: '4px' }}
                                  />
                                </a>
                              </div>
                            )}

                            {/* Pizarra de Código Python */}
                            <PythonCodeBoard code={ex.code} filename={ex.filename} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* PESTAÑA C: JAVA (30h) */}
        {activeTab === 'java' && javaCourse && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <header style={{ background: 'var(--bg-card)', border: '1px solid rgba(234, 88, 12, 0.3)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', background: 'rgba(234, 88, 12, 0.12)', padding: '0.2rem 0.6rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                    BLOQUE 02 · {javaCourse.badge}
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 850, margin: '0.4rem 0 0.3rem 0', color: 'var(--text-title)' }}>
                    ☕ {javaCourse.title}
                  </h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Especialidad SEPE: <strong>{javaCourse.sepeCode}</strong> · {javaCourse.sepeTitle}
                  </span>
                </div>

                <div style={{ background: 'rgba(234, 88, 12, 0.1)', border: '1px solid rgba(234, 88, 12, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#ea580c' }}>
                  ⏱️ 30 horas · 2 Módulos
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {javaCourse.summary}
              </p>
            </header>

            {/* Desglose de los 2 módulos de Java */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-title)', fontWeight: 800 }}>
                📚 Temario Oficial (2 Módulos · 30 Horas)
              </h3>
              {javaCourse.modules.map((mod) => (
                <div key={mod.num} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.3rem 1.6rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #c2410c, #ea580c)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    {mod.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-title)' }}>
                        {mod.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ea580c', background: 'rgba(234, 88, 12, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                        {mod.hours}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA D: ANGULAR (30h) */}
        {activeTab === 'angular' && angularCourse && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <header style={{ background: 'var(--bg-card)', border: '1px solid rgba(225, 29, 72, 0.3)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#e11d48', background: 'rgba(225, 29, 72, 0.12)', padding: '0.2rem 0.6rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                    BLOQUE 03 · {angularCourse.badge}
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 850, margin: '0.4rem 0 0.3rem 0', color: 'var(--text-title)' }}>
                    🅰️ {angularCourse.title}
                  </h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Especialidad SEPE: <strong>{angularCourse.sepeCode}</strong> · {angularCourse.sepeTitle}
                  </span>
                </div>

                <div style={{ background: 'rgba(225, 29, 72, 0.1)', border: '1px solid rgba(225, 29, 72, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#e11d48' }}>
                  ⏱️ 30 horas · 1 Módulo Intensivo
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {angularCourse.summary}
              </p>
            </header>

            {/* Módulo Intensivo de Angular */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-title)', fontWeight: 800 }}>
                📚 Temario Oficial (30 Horas)
              </h3>
              {angularCourse.modules.map((mod) => (
                <div key={mod.num} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.4rem 1.6rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #be123c, #e11d48)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    {mod.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-title)' }}>
                        {mod.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e11d48', background: 'rgba(225, 29, 72, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                        {mod.hours}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Callout de conexión cruzada con IOC INT */}
              <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🔗</span>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: '#ca8a04' }}>Conexión cruzada con MiCampus:</strong> Este módulo de Angular refuerza directamente la <strong>Actividad 5 de la EAC2 de Interfaces Web (IOC INT)</strong>, donde se implementan formularios reactivos con Angular y Angular Material.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA E: IA & AGENTES (SDD) */}
        {activeTab === 'agentes' && agentesCourse && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <header style={{ background: 'linear-gradient(135deg, rgba(67, 56, 202, 0.1), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                    BLOQUE 04 · {agentesCourse.badge}
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 850, margin: '0.4rem 0 0.3rem 0', color: 'var(--text-title)' }}>
                    🤖 {agentesCourse.title}
                  </h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Titulación Propia: <strong>{agentesCourse.certAlignment}</strong>
                  </span>
                </div>

                <div style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6' }}>
                  ⚡ Especialización SDD
                </div>
              </div>

              <p style={{ margin: '0 0 1.2rem 0', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {agentesCourse.summary}
              </p>

              {/* Grid de Métricas del bloque SDD */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem' }}>
                {agentesCourse.highlights.map((h, i) => (
                  <div key={i} style={{ background: 'var(--bg-card)', padding: '0.65rem 0.9rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>✓</span> <span>{h}</span>
                  </div>
                ))}
              </div>
            </header>

            {/* Ciclo Virtuoso SDD */}
            <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.6rem 2rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)' }}>
                🔄 El Ciclo SDD: De la Intención al Código
              </h3>
              <p style={{ margin: '0 0 1.4rem 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Tú marcas los principios técnicos, las pruebas y la seguridad; el agente ejecuta en un sandbox y jamás se autoaprueba sin validación humana externa.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {agentesCourse.sddPhases.map((phase) => (
                  <div key={phase.step} style={{ padding: '1.2rem', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem' }}>
                        {phase.step}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-title)' }}>{phase.name}</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {phase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Los 4 módulos de SDD */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-title)', fontWeight: 800 }}>
                📚 Programa Formativo de IA Agéntica
              </h3>
              {agentesCourse.modules.map((mod) => (
                <div key={mod.num} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.3rem 1.6rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #4338ca, #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    {mod.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-title)' }}>
                      {mod.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA F: CERTIFICACIONES & METODOLOGÍA */}
        {activeTab === 'certificaciones' && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem 2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)' }}>
                📜 Cuadro Oficial de Titulaciones y Especialidades
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Este programa combina el reconocimiento curricular oficial del Servicio Público de Empleo Estatal (**SEPE / Fundae**) con la titulación de vanguardia expedida por **TecnoFor**.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-subtle)', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Módulo</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Código SEPE</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Denominación Oficial</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Horas</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Titulación Acreditada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#10b981' }}>🐍 Python</td>
                      <td style={{ padding: '0.85rem 1rem' }}><code>IFCD0062</code></td>
                      <td style={{ padding: '0.85rem 1rem' }}>Fundamentos de Programación en Python</td>
                      <td style={{ padding: '0.85rem 1rem' }}>50 horas</td>
                      <td style={{ padding: '0.85rem 1rem' }}>Certificación Oficial SEPE + PCAP™</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#ea580c' }}>☕ Java</td>
                      <td style={{ padding: '0.85rem 1rem' }}><code>IFCD006PO</code></td>
                      <td style={{ padding: '0.85rem 1rem' }}>Aplicaciones Java (Backend & POO)</td>
                      <td style={{ padding: '0.85rem 1rem' }}>30 horas</td>
                      <td style={{ padding: '0.85rem 1rem' }}>Certificación Oficial SEPE</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#e11d48' }}>🅰️ Angular</td>
                      <td style={{ padding: '0.85rem 1rem' }}><code>IFCD053PO</code></td>
                      <td style={{ padding: '0.85rem 1rem' }}>Desarrollo Web con Angular (SPA)</td>
                      <td style={{ padding: '0.85rem 1rem' }}>30 horas</td>
                      <td style={{ padding: '0.85rem 1rem' }}>Certificación Oficial SEPE</td>
                    </tr>
                    <tr style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#8b5cf6' }}>🤖 IA & SDD</td>
                      <td style={{ padding: '0.85rem 1rem' }}><code>TECNFOR-SDD</code></td>
                      <td style={{ padding: '0.85rem 1rem' }}>Spec Driven Development & GitHub Spec Kit</td>
                      <td style={{ padding: '0.85rem 1rem' }}>10h+</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#8b5cf6' }}>Diploma Agentic Software Developer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        )}

      </div>
    </div>
  );
}

