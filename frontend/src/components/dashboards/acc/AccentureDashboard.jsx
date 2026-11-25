import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import accentureIcon from '../../../assets/img/icons/accenture.webp';
import { ACCENTURE_CONFIG, getAccentureActivityUrl } from '../../../config/accentureConfig';
import './AccentureDashboard.css';

export default function AccentureDashboard() {
  const [activities, setActivities] = useState([]);
  const [activityStatus, setActivityStatus] = usePersistentState('accenture_activities_status', {}, {
    category: 'accenture'
  });
  const [filterState, setFilterState] = useState('all'); // 'all' | 'pending' | 'completed'

  useEffect(() => {
    fetch(ACCENTURE_CONFIG.activitiesSource)
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  }, []);

  const toggleStatus = (id) => {
    setActivityStatus(prev => {
      const nextStatus = prev[id] === 'Entregada' ? 'Pendiente' : 'Entregada';
      return { ...prev, [id]: nextStatus };
    });
  };

  const completedCount = Object.values(activityStatus).filter(s => s === 'Entregada').length;
  const totalCount = activities.length || ACCENTURE_CONFIG.defaultActivitiesCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredActivities = useMemo(() => {
    if (filterState === 'completed') {
      return activities.filter(act => activityStatus[act.id] === 'Entregada');
    }
    if (filterState === 'pending') {
      return activities.filter(act => activityStatus[act.id] !== 'Entregada');
    }
    return activities;
  }, [activities, activityStatus, filterState]);

  return (
    <div className="app-container">
      <main className="content-main accenture-dashboard-main" role="main">
        {/* Cabecera del Hub */}
        <div className="campus-header accenture-hub-header">
          <img src={accentureIcon} alt="Accenture" className="accenture-hub-logo" />
          <div>
            <h1 className="accenture-hub-title">Accenture Hub</h1>
            <p className="accenture-hub-subtitle">Especialización Back-End Java & GenAI</p>
          </div>
        </div>

        {/* BANNER ESTELAR: JAVA & SPRING BOOT STUDIO */}
        <div style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
          border: '1.5px solid #8b5cf6',
          borderRadius: '16px',
          padding: '1.25rem 1.6rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6d28d9', background: 'rgba(109, 40, 217, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                Nuevo · Ecosistema Unificado
              </span>
              <strong style={{ fontSize: '1.15rem', color: '#4c1d95' }}>☕ Java & Spring Boot Studio</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#5b21b6' }}>
              Selector de <strong>Proyectos</strong> (TaskManager & Librería), <strong>16 Actividades</strong> resueltas, <strong>Libro</strong> de defensa técnica, <strong>Tutorías</strong> de oro, <strong>Retos</strong> y <strong>Quiz</strong>.
            </p>
          </div>
          <Link
            to="/accenture/studio"
            className="theme-btn"
            style={{
              background: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)',
              color: '#ffffff',
              fontWeight: 800,
              padding: '0.65rem 1.3rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(109, 40, 217, 0.25)',
              fontSize: '0.88rem'
            }}
          >
            Abrir Java Studio ➔
          </Link>
        </div>

        {/* Sección de Tarjetas Principales */}
        <div className="accenture-hub-grid">
          
          {/* SECCIÓN ESTELAR DUAL: PROYECTO FINAL TRADICIONAL & HEXAGONAL */}
          <section className="accenture-hub-card" style={{
            gridColumn: '1 / -1',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: '1.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>📚</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 850, margin: 0, color: 'var(--text-title)' }}>
                    Proyecto Final · Library API REST: Dos Enfoques Arquitectónicos
                  </h2>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  Comparativa y análisis práctico del microservicio empresarial de gestión de biblioteca bajo los dos patrones de diseño:
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  OFICIAL ACCENTURE
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                  EVOLUCIÓN HEXAGONAL
                </span>
              </div>
            </div>

            {/* GRID CON LAS DOS ARQUITECTURAS CARA A CARA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.2rem' }}>
              
              {/* TRACK 1: ARQUITECTURA TRADICIONAL POR CAPAS */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.03) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '18px',
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div>
                    <span style={{
                      background: '#10b981',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      letterSpacing: '0.5px'
                    }}>
                      Entregable Oficial
                    </span>
                    <h3 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.2rem', fontWeight: 850, color: 'var(--text-title)' }}>
                      🏛️ Arquitectura Tradicional (Por Capas)
                    </h3>
                  </div>
                  <span style={{ fontSize: '1.6rem' }}>🏆</span>
                </div>

                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Patrón estricto en <strong>3 capas lógicas (8 paquetes desacoplados)</strong> recomendado por la comunidad de Spring Boot: <code>Controller → Service → Repository → @Entity</code>. Modelo centrado en la base de datos MySQL, mappers imperativos sin lambdas y 12 tests oficiales.
                </p>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'monospace', background: 'var(--bg-card)', padding: '0.4rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  📁 /Users/blanca/Desktop/ACC/SpringBoot-Proyecto-ACC-Blancadeuna
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <Link
                    to="/springboot/libreria/por-capas"
                    className="theme-btn"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Ver Tradicional (3 Capas / 8 Paquetes) →
                  </Link>
                  <a
                    href="/java-studio/proyectos/libreria-capas/index-secure.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn"
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-title)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      fontWeight: 650
                    }}
                  >
                    Probar SPA ↗
                  </a>
                  <a
                    href="/java-studio/proyectos/libreria-capas/documentacion/Memoria-tecnica-pdf/Memoria_Tecnica.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      fontWeight: 650
                    }}
                  >
                    Memoria PDF ↗
                  </a>
                </div>
              </div>

              {/* TRACK 2: ARQUITECTURA HEXAGONAL */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.03) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '18px',
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div>
                    <span style={{
                      background: '#8b5cf6',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      letterSpacing: '0.5px'
                    }}>
                      Evolución Avanzada
                    </span>
                    <h3 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.2rem', fontWeight: 850, color: '#8b5cf6' }}>
                      ⬢ Arquitectura Hexagonal (Puertos & Adaptadores)
                    </h3>
                  </div>
                  <span style={{ fontSize: '1.6rem' }}>⚡</span>
                </div>

                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Desacoplamiento radical con <strong>Inversión de Dependencias</strong>: Dominio puro Java con lógica de negocio rica (cero Spring/Hibernate), Puertos de Entrada (<code>*UseCase</code>) y Salida (<code>*RepositoryPort</code>), mappers por frontera y 25 tests ultrarrápidos.
                </p>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'monospace', background: 'var(--bg-card)', padding: '0.4rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  📁 /Users/blanca/Desktop/ACC/Evoluciones/Spring Boot - Proyecto Final - Hexagonal
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <Link
                    to="/springboot/libreria/hexagonal"
                    className="theme-btn"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      boxShadow: '0 3px 10px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    Ver Arquitectura Hexagonal →
                  </Link>
                  <a
                    href="/java-studio/proyectos/libreria-hexagonal/index-secure.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn"
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-title)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      fontWeight: 650
                    }}
                  >
                    Probar SPA Hexagonal ↗
                  </a>
                  <Link
                    to="/springboot/libreria/hexagonal"
                    className="theme-btn"
                    style={{
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: '#8b5cf6',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      fontWeight: 650
                    }}
                  >
                    7 Diferencias ⚖️
                  </Link>
                </div>
              </div>

            </div>
          </section>

          {/* Card: Nivel 1 - Fundamentos Java POO & Patrones (IFCD0177) */}
          <article className="accenture-hub-card" style={{ borderTop: '3px solid #ea580c' }}>
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                ☕ Fundamentos Java POO & Patrones
              </h2>
              <span className="accenture-hub-card-badge" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', fontWeight: 800 }}>
                NIVEL 1 · 21 LECCIONES
              </span>
            </div>
            <p className="accenture-hub-card-desc">
              Base sólida de Programación Orientada a Objetos, principios SOLID, Patrones de Diseño GoF (Singleton, Factory, Builder, Strategy) y Persistencia JPA que cimientan Spring Boot.
            </p>
            <Link 
              to="/accenture/java-poo" 
              className="theme-btn accenture-hub-card-btn" 
              style={{ background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', color: '#fff' }}
            >
              Explorar Temario Java POO (IFCD0177) →
            </Link>
          </article>

          {/* Card: Actividades */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                📦 Actividades Prácticas
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Parada SPRING BOOT: los {totalCount} retos oficiales en formato lección con enunciados limpios, soluciones paso a paso y entrega en L2E.
            </p>
            <Link to="/accenture/actividades" className="theme-btn accenture-hub-card-btn">
              Abrir Cuaderno de Actividades →
            </Link>
          </article>

          {/* Card: Teoría SpringBoot */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🧠 Teoría SpringBoot
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Guía teórica completa (IoC, REST, JPA, Seguridad y Testing) con lectura continua, scrollspy y menú lateral de actividades.
            </p>
            <Link to="/java/springboot" className="theme-btn accenture-hub-card-btn">
              Entrar a la Teoría →
            </Link>
          </article>

          {/* Card: Petete (Versión Integrada) */}
          <article className="accenture-hub-card highlight-amber">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                📖 Petete · Todo-en-Uno
              </h2>
              <span className="accenture-hub-card-badge badge-amber">
                NUEVO · OFICIAL
              </span>
            </div>
            <p className="accenture-hub-card-desc">
              Versión integrada que combina los {totalCount} retos prácticos del Plan de Tutorías con los vídeos interactivos de YouTube y explicaciones teóricas completas.
            </p>
            <Link 
              to="/petete" 
              className="theme-btn accenture-hub-card-btn" 
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' }}
            >
              Explorar Guía Petete →
            </Link>
          </article>

          {/* Card: Tutorías en Código */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                💻 Tutorías en Código (Isra)
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Los proyectos Java completos de las tutorías de Spring Boot organizados con índice lateral, código coloreado y descarga de proyectos .zip.
            </p>
            <Link to="/java/studio/tutorias" className="theme-btn accenture-hub-card-btn">
              Explorar Clases y Proyectos →
            </Link>
          </article>

          {/* Card: Arena de Quiz y Juegos Interactivos */}
          <article className="accenture-hub-card highlight-green">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🎮 Quiz & Juegos de Código
              </h2>
              <span className="accenture-hub-card-badge badge-green">
                99 PREGUNTAS
              </span>
            </div>
            <p className="accenture-hub-card-desc">
              Consolida la información de las 14 tutorías con preguntas y respuestas extraídas del código de Isra: Quiz temático, Modo Desafío Speed Run, Flashcards y Autoevaluación.
            </p>
            <Link 
              to="/quiz" 
              className="theme-btn accenture-hub-card-btn" 
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}
            >
              Entrar a la Arena de Tests & Juegos →
            </Link>
          </article>

          {/* Card: Metodologías Ágiles & Marco Scrum (Sala de Estudio) */}
          <article className="accenture-hub-card highlight-indigo" style={{ borderTop: '3px solid #6366f1' }}>
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🏃 Metodologías Ágiles & Scrum
              </h2>
              <span className="accenture-hub-card-badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#4f46e5', fontWeight: 800 }}>
                SALA DE ESTUDIO · 10Q
              </span>
            </div>
            <p className="accenture-hub-card-desc">
              Preparación técnica de evaluaciones sobre el marco Scrum: 3 roles (PO, SM, Developers), 5 ceremonias con timeboxes (Daily 15 min), 3 artefactos con DoD, comparativa con Cascada y simulador con las 10 preguntas oficiales explicadas de la sala de estudio.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
              <Link 
                to="/accenture/agile" 
                className="theme-btn accenture-hub-card-btn" 
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)', color: '#fff' }}
              >
                Abrir Sala de Estudio Ágil →
              </Link>
              <Link
                to="/accenture/studio/agile/simulador"
                className="theme-btn"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-title)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  fontWeight: 650
                }}
              >
                Simulador Examen 📝
              </Link>
            </div>
          </article>

          {/* Card: Vídeos Teóricos Accenture */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🎬 Vídeos Recomendados (UPM)
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Marco teórico contextual recomendado por Accenture: Módulos 0, 1 y 2 con fundamentos web, Spring Core, IoC, SOLID y arquitectura por capas.
            </p>
            <Link to="/accenture/videos" className="theme-btn accenture-hub-card-btn">
              Ver Vídeos & Transcripciones →
            </Link>
          </article>

          {/* Card: REST Lab */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🧪 REST Lab
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Laboratorio práctico de pruebas de API REST con Postman y Swagger.
            </p>
            <Link to="/accenture/rest-lab" className="theme-btn accenture-hub-card-btn">
              Entrar al Lab →
            </Link>
          </article>

          {/* Card: Docu para IA */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🧭 Docu para IA
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Tríada visual para documentar el contexto, la arquitectura y las reglas de trabajo del proyecto.
            </p>
            <Link to="/accenture/documentacion-ia" className="theme-btn accenture-hub-card-btn">
              Ver la Tríada →
            </Link>
          </article>

          {/* Card: Ruedas de Progreso */}
          <article className="accenture-hub-card">
            <div className="accenture-hub-card-header">
              <h2 className="accenture-hub-card-title">
                🎯 Ruedas de Progreso
              </h2>
            </div>
            <p className="accenture-hub-card-desc">
              Seguimiento de habilidades (Soft y Hard Skills) a lo largo del curso.
            </p>
            <Link to="/accenture/ruedas" className="theme-btn accenture-hub-card-btn">
              Ver Ruedas →
            </Link>
          </article>

        </div>

        {/* To-Do Tracker EXCLUSIVO de Accenture */}
        <section className="accenture-tracker-card">
          <div className="accenture-tracker-header">
            <div>
              <div className="accenture-tracker-title-wrap">
                <span style={{ fontSize: '1.4rem' }}>📋</span>
                <h2 className="accenture-tracker-title">
                  Seguimiento de Entregas · Parada Spring Boot
                </h2>
              </div>
              <p className="accenture-tracker-desc">
                Tracker privado del bootcamp. Al hacer clic en cualquier reto accedes a su página de lección con enunciado y solución.
              </p>
            </div>
            
            <div className="accenture-tracker-kpi">
              <div className="accenture-tracker-kpi-value">
                {completedCount} de {totalCount} ({progressPercent}%)
              </div>
              <span className="accenture-tracker-kpi-deadline">
                ⏳ Cierre: 3 Nov 2026 (23:59)
              </span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="accenture-progress-track">
            <div 
              className="accenture-progress-fill" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>

          {/* Filtros de estado */}
          <div className="accenture-tracker-filters">
            <button
              onClick={() => setFilterState('all')}
              className={`accenture-filter-chip ${filterState === 'all' ? 'active' : ''}`}
            >
              Todas ({activities.length})
            </button>
            <button
              onClick={() => setFilterState('pending')}
              className={`accenture-filter-chip ${filterState === 'pending' ? 'active' : ''}`}
            >
              Pendientes ({activities.length - completedCount})
            </button>
            <button
              onClick={() => setFilterState('completed')}
              className={`accenture-filter-chip ${filterState === 'completed' ? 'active' : ''}`}
            >
              Entregadas ({completedCount})
            </button>
          </div>

          {/* Lista interactiva de las actividades */}
          <div className="accenture-activities-grid">
            {filteredActivities.map(act => {
              const isDone = activityStatus[act.id] === 'Entregada';

              return (
                <div 
                  key={act.id}
                  className={`accenture-activity-row ${isDone ? 'is-done' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 0, flex: 1 }}>
                    <input 
                      type="checkbox"
                      id={`chk-${act.id}`}
                      checked={isDone}
                      onChange={() => toggleStatus(act.id)}
                      style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#10b981' }}
                    />
                    <label 
                      htmlFor={`chk-${act.id}`}
                      className={`accenture-activity-label ${isDone ? 'is-done' : ''}`}
                    >
                      <span className="accenture-activity-name">
                        {act.numero}. {act.shortTitle ? act.shortTitle.replace(/^[0-9]+\.\s*/, '') : act.title}
                      </span>
                      <span className="accenture-activity-sub">
                        {act.category} · Proyecto: {act.proyecto || 'taskmanager'}
                      </span>
                    </label>
                  </div>

                  <Link 
                    to={getAccentureActivityUrl(act)}
                    className="accenture-activity-btn"
                  >
                    Ver Lección →
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="accenture-tracker-footer">
            <Link 
              to="/accenture/actividades"
              className="theme-btn"
              style={{
                textDecoration: 'none',
                padding: '0.7rem 1.8rem',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              📖 Abrir las {totalCount} Actividades en Plantilla de Lección →
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
