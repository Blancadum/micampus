import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import { SQL_MODULE_CATEGORIES, SQL_MASTER_MODULES } from '../../../data/sqlMasterData';
import SqlSandboxModal from './SqlSandboxModal';
import SqlCheatSheetModal from './SqlCheatSheetModal';
import SqlBackendIntegrationModal from './SqlBackendIntegrationModal';
import SqlQuickReferenceModal from './SqlQuickReferenceModal';
import SqlInteractiveChallenges from './SqlInteractiveChallenges';
import SqlMysqlDeepDive from './SqlMysqlDeepDive';
import SqlQueryBuilderModal from './SqlQueryBuilderModal';
import SqlCaseStudyViewer from './SqlCaseStudyViewer';
import './SqlMasterDashboard.css';

/**
 * SqlMasterDashboard
 * Sección Integral de SQL & Bases de Datos Relacionales de MiCampus.
 * Unifica el Compendio Oficial de 55 temas con la Masterclass Interactiva
 * de WHERE vs HAVING, Orden de Ejecución y Retos Prácticos.
 * Diseño: "Azul clásico con líneas rectas" (#1a5490 / #2563eb).
 */
export default function SqlMasterDashboard() {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  // Modo de visualización: 'continuous' (manual completo corrido) | 'single' (vista por módulos)
  const [viewMode, setViewMode] = useState('continuous');
  const [activeModuleId, setActiveModuleId] = useState(() => {
    if (sectionId) {
      const match = SQL_MASTER_MODULES.find((m) => m.id === sectionId || m.id.endsWith(`-${sectionId}`));
      if (match) return match.id;
    }
    return SQL_MASTER_MODULES[0]?.id || '1-1-intro';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const [showBackTop, setShowBackTop] = useState(false);

  // Modales interactivos
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [showCheatSheetModal, setShowCheatSheetModal] = useState(false);
  const [showBackendModal, setShowBackendModal] = useState(false);
  const [showQuickRefModal, setShowQuickRefModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);

  // Filtro por nivel / enfoque: 'all' | 'basic' | 'advanced' | 'dba' | 'practice'
  const [levelFilter, setLevelFilter] = useState('all');

  // Progreso del estudiante con persistencia híbrida (SQLite + localStorage)
  const [completedModules, setCompletedModules] = usePersistentState('micampus_sql_completed', [], {
    category: 'sql'
  });

  const toggleModuleComplete = (modId) => {
    setCompletedModules((prev) => (prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]));
  };

  // Estados interactivos para widgets de la Masterclass
  const [gymActiveTab, setGymActiveTab] = useState(1);
  const [checklistState, setChecklistState] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });

  const contentRef = useRef(null);

  // Filtrado reactivo por buscador y nivel
  const filteredModules = useMemo(() => {
    let list = SQL_MASTER_MODULES;

    if (levelFilter === 'basic') {
      list = list.filter((m) =>
        ['cat-1-fundamentos', 'cat-2-er-normalizacion', 'cat-3-ddl-dml', 'cat-4-select-basico'].includes(m.category)
      );
    } else if (levelFilter === 'advanced') {
      list = list.filter((m) =>
        ['cat-5-where-having', 'cat-6-ctes-recursivas', 'cat-7-window-functions', 'cat-8-joins-visual'].includes(m.category)
      );
    } else if (levelFilter === 'dba') {
      list = list.filter((m) =>
        ['cat-9-proc-triggers', 'cat-10-indices-retos', 'cat-11-seguridad-motores'].includes(m.category)
      );
    } else if (levelFilter === 'practice') {
      list = list.filter((m) =>
        m.id.includes('ejercicio') ||
        m.id.includes('retos') ||
        m.id.includes('checklist') ||
        m.category === 'cat-5-where-having' ||
        m.badge.toLowerCase().includes('práctica') ||
        m.badge.toLowerCase().includes('retos')
      );
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.shortDesc.toLowerCase().includes(q) ||
        m.badge.toLowerCase().includes(q) ||
        m.html.toLowerCase().includes(q)
    );
  }, [searchQuery, levelFilter]);

  // Módulos a renderizar según vista seleccionada
  const modulesToRender = useMemo(() => {
    return viewMode === 'single'
      ? filteredModules.filter((m) => m.id === activeModuleId)
      : filteredModules;
  }, [viewMode, filteredModules, activeModuleId]);

  // Sincronizar URL cuando cambie sectionId (Salto instantáneo sin transición rodante)
  useEffect(() => {
    if (sectionId) {
      const match = SQL_MASTER_MODULES.find((m) => m.id === sectionId || m.id.endsWith(`-${sectionId}`));
      if (match) {
        setActiveModuleId(match.id);
        const el = document.getElementById(`sql-sec-${match.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }
    }
  }, [sectionId]);

  // Inyectar botón de copiar interactivo en los bloques de código renderizados
  useEffect(() => {
    if (!contentRef.current) return;
    const blocks = contentRef.current.querySelectorAll('.code-block');
    blocks.forEach((block) => {
      if (block.querySelector('.sql-code-copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sql-code-copy-btn';
      btn.textContent = '📋 Copiar';
      btn.setAttribute('aria-label', 'Copiar código');
      btn.onclick = (e) => {
        e.stopPropagation();
        const code = block.querySelector('code')?.innerText || block.innerText.replace('📋 Copiar', '').replace('✓ Copiado', '');
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(code.trim());
          btn.textContent = '✓ Copiado';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = '📋 Copiar';
            btn.classList.remove('copied');
          }, 2000);
        }
      };
      block.appendChild(btn);
    });
  }, [modulesToRender, viewMode]);

  // Listener para botón flotante "Volver arriba"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejo de categorías en el menú lateral (replegar/desplegar con el triángulo)
  const toggleCategory = (catId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Clic en el título de la categoría: despliega la categoría y navega a su primer contenido
  const handleSelectCategory = (catId, firstModId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: false,
    }));
    if (firstModId) {
      handleSelectModule(firstModId);
    }
  };

  // Salto instantáneo sin efecto rodante ni animación de scroll
  const handleSelectModule = (modId) => {
    setActiveModuleId(modId);
    navigate(`/sql/${modId}`, { replace: true });
    if (viewMode === 'continuous') {
      const el = document.getElementById(`sql-sec-${modId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const handleCopyCode = useCallback((codeText, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(codeText);
      setCopiedSnippetId(id);
      setTimeout(() => setCopiedSnippetId(null), 2000);
    }
  }, []);

  const handleChecklistToggle = (key) => {
    setChecklistState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const checklistCompletedCount = Object.values(checklistState).filter(Boolean).length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="sql-master-page">
      {/* 1. HERO HEADER AZUL CON LÍNEAS RECTAS */}
      <header className="sql-hero-header">
        <div className="sql-hero-inner">
          <nav aria-label="Miga de pan" className="sql-breadcrumbs">
            <Link to="/">🏠 Inicio</Link>
            <span className="sql-breadcrumbs-sep">/</span>
            <span>Bases de Datos & SQL</span>
            <span className="sql-breadcrumbs-sep">/</span>
            <strong style={{ color: '#ffffff' }}>Compendio & Masterclass</strong>
          </nav>

          <div className="sql-hero-title-row">
            <div className="sql-hero-titles">
              <h1>
                <span>🐬</span> Compendio SQL & Bases de Datos
              </h1>
              <p>
                Guía completa desde el diseño Entidad-Relación y Normalización (1FN, 2FN, 3FN)
                hasta Procedimientos, Transacciones ACID y la Masterclass interactiva de <strong>WHERE vs HAVING</strong>.
              </p>
            </div>

            <div className="sql-hero-badges">
              <span className="sql-hero-badge highlight">⭐ Guía Unificada</span>
              <span className="sql-hero-badge">28 Módulos</span>
              <span className="sql-hero-badge">11 Bloques Temáticos</span>
              <span className="sql-hero-badge">PostgreSQL · MySQL · SQLite</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTENEDOR PRINCIPAL: SIDEBAR + LECTURA */}
      <div className="sql-layout-container">
        {/* SIDEBAR AZUL MARINO (#1a5490) */}
        <aside className="sql-sidebar" aria-label="Navegación del Compendio SQL">
          <div className="sql-sidebar-search">
            <input
              type="text"
              placeholder="🔍 Buscar sintaxis, HAVING, JOIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar en la guía de SQL"
            />
          </div>

          <div className="sql-sidebar-controls">
            <button
              type="button"
              className="sql-sidebar-btn"
              onClick={() => setCollapsedCategories({})}
              title="Expandir todas las categorías"
            >
              Expandir
            </button>
            <button
              type="button"
              className="sql-sidebar-btn"
              onClick={() => {
                const allCollapsed = {};
                SQL_MODULE_CATEGORIES.forEach((c) => {
                  allCollapsed[c.id] = true;
                });
                setCollapsedCategories(allCollapsed);
              }}
              title="Contraer todas las categorías"
            >
              Contraer
            </button>
          </div>

          <nav className="sql-sidebar-nav">
            {SQL_MODULE_CATEGORIES.map((cat) => {
              const catModules = filteredModules.filter((m) => m.category === cat.id);
              if (catModules.length === 0) return null;
              const isCollapsed = !!collapsedCategories[cat.id];

              const isCatActive = catModules.some((m) => m.id === activeModuleId);

              return (
                <div key={cat.id} className="sql-menu-category">
                  <div className={`sql-menu-cat-header-wrap ${isCatActive ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="sql-menu-cat-header"
                      onClick={() => handleSelectCategory(cat.id, catModules[0]?.id)}
                      title={`Ir a ${cat.name}`}
                    >
                      <span>
                        {cat.icon} {cat.name}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="sql-menu-cat-toggle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(cat.id);
                      }}
                      aria-expanded={!isCollapsed}
                      aria-label={isCollapsed ? `Desplegar subapartados de ${cat.name}` : `Replegar subapartados de ${cat.name}`}
                      title={isCollapsed ? 'Desplegar subapartados' : 'Replegar subapartados'}
                    >
                      {isCollapsed ? '▼' : '▲'}
                    </button>
                  </div>

                  {!isCollapsed && (
                    <div className="sql-menu-items">
                      {catModules.map((mod) => {
                        const isDone = completedModules.includes(mod.id);
                        return (
                          <button
                            key={mod.id}
                            type="button"
                            className={`sql-menu-item-btn ${activeModuleId === mod.id ? 'active' : ''}`}
                            onClick={() => handleSelectModule(mod.id)}
                            title={mod.title}
                          >
                            <span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              {isDone && <span className="sql-menu-check-badge" title="Módulo completado">✓</span>}
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{mod.title}</span>
                            </span>
                            <span className="sql-menu-item-badge">{mod.num || mod.badge}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="sql-content-area" ref={contentRef}>
          {/* BARRA DE PROGRESO GLOBAL & HERRAMIENTAS RÁPIDAS */}
          <div className="sql-progress-box">
            <div className="sql-progress-info">
              <div>
                <span className="sql-progress-title">📈 Tu Progreso en SQL:</span>
                <span className="sql-progress-count">
                  {' '}{completedModules.length} de {SQL_MASTER_MODULES.length} temas completados
                </span>
              </div>
              <div className="sql-progress-bar-wrap" title={`${Math.round((completedModules.length / SQL_MASTER_MODULES.length) * 100)}% completado`}>
                <div
                  className="sql-progress-bar-fill"
                  style={{ width: `${Math.round((completedModules.length / SQL_MASTER_MODULES.length) * 100)}%` }}
                />
              </div>
              <span className="sql-progress-pct">
                {Math.round((completedModules.length / SQL_MASTER_MODULES.length) * 100)}%
              </span>
            </div>

            <div className="sql-tools-quick-bar">
              <button
                type="button"
                className={`sql-action-pill-btn ${viewMode === 'case-study' ? 'primary' : ''}`}
                onClick={() => setViewMode('case-study')}
                title="Abrir página pormenorizada de cada caso real: situación, organización de tablas, relaciones y playground"
              >
                🏢 Casos Reales & Playground
              </button>
              <button
                type="button"
                className="sql-action-pill-btn"
                onClick={() => setShowBuilderModal(true)}
                title="Abrir Generador Visual de Consultas Asistido"
              >
                🛒 Generador Visual
              </button>
              <button
                type="button"
                className="sql-action-pill-btn"
                onClick={() => setShowSandboxModal(true)}
                title="Abrir consola para probar consultas SQL en vivo con datos reales"
              >
                🧪 Playground Rápido
              </button>
              <button
                type="button"
                className="sql-action-pill-btn"
                onClick={() => setShowCheatSheetModal(true)}
                title="Abrir resumen condensado listo para imprimir o PDF"
              >
                📄 Chuleta de Examen
              </button>
              <button
                type="button"
                className="sql-action-pill-btn"
                onClick={() => setShowBackendModal(true)}
                title="Ver conexión segura con PHP PDO y Java Spring Data JPA"
              >
                🔌 PHP & Spring Boot
              </button>
              <button
                type="button"
                className="sql-action-pill-btn"
                onClick={() => setShowQuickRefModal(true)}
                title="Buscador alfabético de palabras clave y cláusulas"
              >
                🔍 Glosario Rápido
              </button>
            </div>
          </div>

          {/* FILTROS POR NIVEL / ENFOQUE PEDAGÓGICO */}
          <div className="sql-level-filters-bar">
            <span className="sql-level-filter-label">Nivel / Enfoque:</span>
            <button
              type="button"
              className={`sql-level-filter-btn ${levelFilter === 'all' && viewMode !== 'case-study' ? 'active' : ''}`}
              onClick={() => {
                setLevelFilter('all');
                if (viewMode === 'case-study') setViewMode('continuous');
              }}
            >
              Todos ({SQL_MASTER_MODULES.length})
            </button>
            <button
              type="button"
              className={`sql-level-filter-btn ${levelFilter === 'basic' ? 'active' : ''}`}
              onClick={() => {
                setLevelFilter('basic');
                if (viewMode === 'case-study') setViewMode('continuous');
              }}
            >
              🟢 Fundamentos (DAM/DAW)
            </button>
            <button
              type="button"
              className={`sql-level-filter-btn ${levelFilter === 'advanced' ? 'active' : ''}`}
              onClick={() => {
                setLevelFilter('advanced');
                if (viewMode === 'case-study') setViewMode('continuous');
              }}
            >
              🟡 Analítica & Avanzado
            </button>
            <button
              type="button"
              className={`sql-level-filter-btn ${levelFilter === 'dba' ? 'active' : ''}`}
              onClick={() => {
                setLevelFilter('dba');
                if (viewMode === 'case-study') setViewMode('continuous');
              }}
            >
              🔴 DBA & Optimización
            </button>
            <button
              type="button"
              className={`sql-level-filter-btn ${levelFilter === 'practice' ? 'active' : ''}`}
              onClick={() => {
                setLevelFilter('practice');
                if (viewMode === 'case-study') setViewMode('continuous');
              }}
            >
              ⭐ Solo Retos & Práctica
            </button>
            <button
              type="button"
              className={`sql-level-filter-btn ${viewMode === 'case-study' ? 'active' : ''}`}
              onClick={() => setViewMode('case-study')}
              style={{ borderLeft: '3px solid var(--sql-gold)' }}
            >
              🏢 Casos de Negocio Reales
            </button>
          </div>

          {/* TOOLBAR SUPERIOR */}
          <div className="sql-toolbar">
            <div className="sql-toolbar-left">
              <span>📚 Vista Actual:</span>
              <span style={{ color: '#0f172a', fontWeight: 800 }}>
                {viewMode === 'case-study'
                  ? '🏢 Casos de Estudio Pormenorizados: Situación, Tablas, Relaciones y Playground en Vivo'
                  : viewMode === 'continuous'
                  ? 'Manual Completo (Scroll Continuo)'
                  : `Módulo Individual: ${SQL_MASTER_MODULES.find((m) => m.id === activeModuleId)?.title || ''}`}
              </span>
              {searchQuery && viewMode !== 'case-study' && (
                <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>
                  ({filteredModules.length} resultados para "{searchQuery}")
                </span>
              )}
            </div>

            <div className="sql-toolbar-right">
              <button
                type="button"
                className={`sql-tool-btn ${viewMode === 'case-study' ? 'active' : ''}`}
                onClick={() => setViewMode('case-study')}
                title="Página pormenorizada para cada ejemplo del mundo real"
              >
                🏢 Casos Reales
              </button>
              <button
                type="button"
                className={`sql-tool-btn ${viewMode === 'continuous' ? 'active' : ''}`}
                onClick={() => setViewMode('continuous')}
                title="Leer todo el manual con scroll continuo"
              >
                📜 Manual Corrido
              </button>
              <button
                type="button"
                className={`sql-tool-btn ${viewMode === 'single' ? 'active' : ''}`}
                onClick={() => setViewMode('single')}
                title="Ver sólo el tema seleccionado"
              >
                📄 Por Módulo
              </button>
              <button
                type="button"
                className="sql-tool-btn"
                onClick={() => {
                  if (navigator?.clipboard?.writeText) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('¡Enlace directo al tema copiado al portapapeles!');
                  }
                }}
                title="Copiar enlace directo a esta sección"
              >
                🔗 Compartir
              </button>
            </div>
          </div>

          {/* MÓDULOS DE SQL O VISTA PORMENORIZADA DE CASOS REALES */}
          {viewMode === 'case-study' ? (
            <SqlCaseStudyViewer isModal={false} />
          ) : (
            modulesToRender.map((mod) => {
            const isGymModule = mod.id === 'masterclass-ejercicios';
            const isChecklistModule = mod.id === 'masterclass-checklist';
            const isCompleted = completedModules.includes(mod.id);

            return (
              <section
                key={mod.id}
                id={`sql-sec-${mod.id}`}
                className="sql-section-card"
                style={{ borderTopColor: mod.accentColor || '#1a5490' }}
              >
                {/* Metadatos superiores de la tarjeta */}
                <div className="sql-card-meta">
                  <span className="sql-card-category">{mod.categoryTitle}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      className={`sql-module-complete-btn ${isCompleted ? 'completed' : ''}`}
                      onClick={() => toggleModuleComplete(mod.id)}
                      title={isCompleted ? 'Desmarcar este módulo' : 'Marcar como completado'}
                    >
                      {isCompleted ? '✓ Completado' : 'Marcar como visto'}
                    </button>
                    <span className="sql-card-badge">{mod.badge}</span>
                    <button
                      type="button"
                      className="sql-tool-btn"
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}
                      onClick={() => handleSelectModule(mod.id)}
                      title="Enlazar a este módulo"
                    >
                      # {mod.id}
                    </button>
                  </div>
                </div>

                {/* Si es el módulo de ejercicios de gimnasio, inyectamos selector interactivo de tabs */}
                {isGymModule && (
                  <div className="sql-gym-tabs">
                    <div className="sql-gym-tab-header">
                      <button
                        type="button"
                        className={`sql-gym-tab-btn ${gymActiveTab === 1 ? 'active' : ''}`}
                        onClick={() => setGymActiveTab(1)}
                      >
                        🏋️ Ejercicio 1: Clases con &gt;20 Alumnos
                      </button>
                      <button
                        type="button"
                        className={`sql-gym-tab-btn ${gymActiveTab === 2 ? 'active' : ''}`}
                        onClick={() => setGymActiveTab(2)}
                      >
                        🥊 Ejercicio 2: Entrenadores en Turno Tarde
                      </button>
                      <button
                        type="button"
                        className={`sql-gym-tab-btn ${gymActiveTab === 3 ? 'active' : ''}`}
                        onClick={() => setGymActiveTab(3)}
                      >
                        ⭐ Ejercicio 3: Socios VIP con &gt;10 Visitas
                      </button>
                    </div>

                    <div className="sql-gym-tab-pane">
                      {gymActiveTab === 1 && (
                        <div className="sql-example">
                          <div className="example-title">📌 Caso 1: Identificar Clases Populares</div>
                          <p><strong>Enunciado:</strong> Obtén el nombre de las actividades y la cantidad de inscritos, pero únicamente para aquellas que superen los 20 alumnos.</p>
                          <div className="code-block" style={{ position: 'relative' }}>
                            <button
                              type="button"
                              className={`sql-code-copy-btn ${copiedSnippetId === 'gym1' ? 'copied' : ''}`}
                              onClick={() => handleCopyCode("SELECT actividad, COUNT(id_socio) AS total_alumnos\nFROM inscripciones\nGROUP BY actividad\nHAVING COUNT(id_socio) > 20;", 'gym1')}
                            >
                              {copiedSnippetId === 'gym1' ? '✅ ¡Copiado!' : '📋 Copiar'}
                            </button>
                            <code>
                              <span style={{ color: '#60a5fa' }}>SELECT</span> actividad, <span style={{ color: '#fbbf24' }}>COUNT</span>(id_socio) <span style={{ color: '#60a5fa' }}>AS</span> total_alumnos<br/>
                              <span style={{ color: '#60a5fa' }}>FROM</span> inscripciones<br/>
                              <span style={{ color: '#60a5fa' }}>GROUP BY</span> actividad<br/>
                              <span style={{ color: '#f87171', fontWeight: 800 }}>HAVING</span> <span style={{ color: '#fbbf24' }}>COUNT</span>(id_socio) &gt; 20;
                            </code>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#166534' }}>
                            💡 <strong>¿Por qué HAVING?</strong> Porque el filtro <code>&gt; 20</code> se aplica <em>después</em> de haber contado cuántos alumnos hay por grupo en <code>GROUP BY</code>.
                          </p>
                        </div>
                      )}

                      {gymActiveTab === 2 && (
                        <div className="sql-example">
                          <div className="example-title">📌 Caso 2: Filtrado Previo (WHERE) + Agregación (HAVING)</div>
                          <p><strong>Enunciado:</strong> Encuentra a los entrenadores que hayan impartido más de 5 clases en horario de tarde (a partir de las 16:00).</p>
                          <div className="code-block" style={{ position: 'relative' }}>
                            <button
                              type="button"
                              className={`sql-code-copy-btn ${copiedSnippetId === 'gym2' ? 'copied' : ''}`}
                              onClick={() => handleCopyCode("SELECT entrenador_id, COUNT(*) AS clases_tarde\nFROM sesiones_gym\nWHERE hora_inicio >= '16:00:00'\nGROUP BY entrenador_id\nHAVING COUNT(*) > 5;", 'gym2')}
                            >
                              {copiedSnippetId === 'gym2' ? '✅ ¡Copiado!' : '📋 Copiar'}
                            </button>
                            <code>
                              <span style={{ color: '#60a5fa' }}>SELECT</span> entrenador_id, <span style={{ color: '#fbbf24' }}>COUNT</span>(*) <span style={{ color: '#60a5fa' }}>AS</span> clases_tarde<br/>
                              <span style={{ color: '#60a5fa' }}>FROM</span> sesiones_gym<br/>
                              <span style={{ color: '#38bdf8', fontWeight: 800 }}>WHERE</span> hora_inicio &gt;= <span style={{ color: '#86efac' }}>'16:00:00'</span><br/>
                              <span style={{ color: '#60a5fa' }}>GROUP BY</span> entrenador_id<br/>
                              <span style={{ color: '#f87171', fontWeight: 800 }}>HAVING</span> <span style={{ color: '#fbbf24' }}>COUNT</span>(*) &gt; 5;
                            </code>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#166534' }}>
                            💡 <strong>Estrategia óptima:</strong> Primero se descartan las clases matinales con <code>WHERE</code> (ahorrando memoria), y luego se agrupa y filtra el conteo con <code>HAVING</code>.
                          </p>
                        </div>
                      )}

                      {gymActiveTab === 3 && (
                        <div className="sql-example">
                          <div className="example-title">📌 Caso 3: Socios VIP con Alto Rendimiento</div>
                          <p><strong>Enunciado:</strong> Muestra los socios con tarifa VIP que hayan acumulado más de 10 accesos en el mes en curso.</p>
                          <div className="code-block" style={{ position: 'relative' }}>
                            <button
                              type="button"
                              className={`sql-code-copy-btn ${copiedSnippetId === 'gym3' ? 'copied' : ''}`}
                              onClick={() => handleCopyCode("SELECT s.nombre, s.tipo_tarifa, COUNT(a.id_acceso) AS total_visitas\nFROM socios s\nINNER JOIN accesos a ON s.id_socio = a.id_socio\nWHERE s.tipo_tarifa = 'VIP'\nGROUP BY s.id_socio, s.nombre, s.tipo_tarifa\nHAVING COUNT(a.id_acceso) > 10\nORDER BY total_visitas DESC;", 'gym3')}
                            >
                              {copiedSnippetId === 'gym3' ? '✅ ¡Copiado!' : '📋 Copiar'}
                            </button>
                            <code>
                              <span style={{ color: '#60a5fa' }}>SELECT</span> s.nombre, s.tipo_tarifa, <span style={{ color: '#fbbf24' }}>COUNT</span>(a.id_acceso) <span style={{ color: '#60a5fa' }}>AS</span> total_visitas<br/>
                              <span style={{ color: '#60a5fa' }}>FROM</span> socios s<br/>
                              <span style={{ color: '#60a5fa' }}>INNER JOIN</span> accesos a <span style={{ color: '#60a5fa' }}>ON</span> s.id_socio = a.id_socio<br/>
                              <span style={{ color: '#38bdf8', fontWeight: 800 }}>WHERE</span> s.tipo_tarifa = <span style={{ color: '#86efac' }}>'VIP'</span><br/>
                              <span style={{ color: '#60a5fa' }}>GROUP BY</span> s.id_socio, s.nombre, s.tipo_tarifa<br/>
                              <span style={{ color: '#f87171', fontWeight: 800 }}>HAVING</span> <span style={{ color: '#fbbf24' }}>COUNT</span>(a.id_acceso) &gt; 10<br/>
                              <span style={{ color: '#60a5fa' }}>ORDER BY</span> total_visitas <span style={{ color: '#60a5fa' }}>DESC</span>;
                            </code>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Si es el módulo de Checklist, inyectamos la herramienta interactiva */}
                {isChecklistModule && (
                  <div className="sql-checklist-container">
                    <div className="sql-checklist-title">
                      <span>✅ Pasos para Decidir: ¿WHERE o HAVING?</span>
                      <span style={{ fontSize: '0.85rem', color: '#16a34a' }}>
                        {checklistCompletedCount} de 6 completados
                      </span>
                    </div>

                    {[
                      { id: 'check1', label: '1. ¿La condición evalúa filas individuales antes de agrupar? ➔ Usa WHERE.' },
                      { id: 'check2', label: '2. ¿La condición involucra COUNT(), SUM(), AVG(), MIN() o MAX()? ➔ Usa HAVING.' },
                      { id: 'check3', label: '3. ¿Puedes filtrar antes de GROUP BY para reducir datos? ➔ Hazlo siempre con WHERE.' },
                      { id: 'check4', label: '4. ¿Tu consulta tiene GROUP BY? ➔ Solo entonces tiene sentido usar HAVING.' },
                      { id: 'check5', label: '5. Recuerda el orden de ejecución: FROM ➔ JOIN ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT.' },
                      { id: 'check6', label: '6. Valida que las columnas en SELECT estén en el GROUP BY o dentro de una agregada.' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`sql-checklist-item ${checklistState[item.id] ? 'checked' : ''}`}
                        onClick={() => handleChecklistToggle(item.id)}
                      >
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={checklistState[item.id]}
                          onChange={() => {}} // Manejado por onClick del contenedor
                        />
                        <label htmlFor={item.id}>{item.label}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contenido HTML del capítulo original */}
                <div
                  className="sql-section-html"
                  dangerouslySetInnerHTML={{ __html: mod.html }}
                />

                {/* Si es el módulo de Retos Técnicos (10.2), inyectamos el taller interactivo de los 5 retos con soluciones desplegables */}
                {(mod.id === '10-2-retos-entrevistas' || mod.id.includes('retos-entrevistas')) && (
                  <SqlInteractiveChallenges onOpenSandbox={() => setShowSandboxModal(true)} />
                )}

                {/* Si es el módulo de Motores y Cheat Sheet (11.2), inyectamos la profundización técnica en MySQL 8.x */}
                {(mod.id === '11-2-motores-cheatsheet' || mod.id.includes('motores-cheatsheet')) && (
                  <SqlMysqlDeepDive />
                )}
              </section>
            );
          }))}
        </main>
      </div>

      {/* BOTÓN FLOTANTE VOLVER ARRIBA */}
      {showBackTop && (
        <button
          type="button"
          className="sql-back-top-btn"
          onClick={scrollToTop}
          title="Volver al inicio"
          aria-label="Volver arriba"
        >
          ▲
        </button>
      )}

      {/* MODAL 1: PLAYGROUND / SANDBOX SQL EN VIVO */}
      <SqlSandboxModal
        isOpen={showSandboxModal}
        onClose={() => setShowSandboxModal(false)}
      />

      {/* MODAL 2: CHULETA DEFINITIVA DE EXAMEN (LISTA PARA IMPRIMIR / PDF) */}
      <SqlCheatSheetModal
        isOpen={showCheatSheetModal}
        onClose={() => setShowCheatSheetModal(false)}
      />

      {/* MODAL 3: INTEGRACIÓN BACKEND (PHP PDO & JAVA SPRING BOOT) */}
      <SqlBackendIntegrationModal
        isOpen={showBackendModal}
        onClose={() => setShowBackendModal(false)}
      />

      {/* MODAL 4: GLOSARIO & ÍNDICE RÁPIDO DE PALABRAS CLAVE */}
      <SqlQuickReferenceModal
        isOpen={showQuickRefModal}
        onClose={() => setShowQuickRefModal(false)}
        onSelectModule={(modId) => handleSelectModule(modId)}
      />

      {/* MODAL 5: GENERADOR VISUAL DE CONSULTAS & TALLER REAL TECHSTORE */}
      <SqlQueryBuilderModal
        isOpen={showBuilderModal}
        onClose={() => setShowBuilderModal(false)}
      />

      {/* MODAL 6: CASOS DE ESTUDIO PORMENORIZADOS (VENTANA FLOTANTE) */}
      {showCaseStudyModal && (
        <SqlCaseStudyViewer
          isModal={true}
          onClose={() => setShowCaseStudyModal(false)}
        />
      )}
    </div>
  );
}

