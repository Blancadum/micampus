import React, { useState, useEffect, useMemo } from 'react';
import { TUTORIAS } from '../../../../data/javaStudio/studioData.js';
import StudioCodeBlock from '../StudioCodeBlock.jsx';
import {
  IconSearch,
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconCode,
  IconZap
} from '../StudioIcons.jsx';

// Cache en memoria para no refetchear el JSON de 864KB en cambios de tab
let cachedTutoriasCodigo = null;

export const TUTORIA_BLOCKS = [
  {
    id: 'b1',
    short: 'B1: HTTP & REST (15)',
    label: 'Bloque 1 · Protocolo HTTP, REST & JSON',
    badge: '15 Clases',
    tutorias: [
      { id: 'tut01', short: 'Tut 1 · HTTP y Arquitectura (8)', title: 'Tutoría 1 · Arquitectura Web y Protocolo HTTP', count: 8 },
      { id: 'tut02', short: 'Tut 2 · JSON & Ecosistema (7)', title: 'Tutoría 2 · JSON y Ecosistema Java', count: 7 }
    ]
  },
  {
    id: 'b2',
    short: 'B2: Core & IoC (32)',
    label: 'Bloque 2 · Maven, Lombok, IoC & SOLID',
    badge: '32 Clases',
    tutorias: [
      { id: 'tut03', short: 'Tut 3 · Maven & Lombok (8)', title: 'Tutoría 3 · Maven y Lombok', count: 8 },
      { id: 'tut04', short: 'Tut 4 · Spring Framework Core (9)', title: 'Tutoría 4 · Fundamentos del Framework Spring', count: 9 },
      { id: 'tut05', short: 'Tut 5 · 3 Capas & SOLID (15)', title: 'Tutoría 5 · Arquitectura por Capas, SOLID y Spring Boot', count: 15 }
    ]
  },
  {
    id: 'b3',
    short: 'B3: JPA & Datos (43)',
    label: 'Bloque 3 · Controladores & JPA / JPQL',
    badge: '43 Clases',
    tutorias: [
      { id: 'tut06', short: 'Tut 6 · REST Controllers (12)', title: 'Tutoría 6 · Controladores REST, APIs y ResponseEntity', count: 12 },
      { id: 'tut07', short: 'Tut 7 · Services & JPA (12)', title: 'Tutoría 7 · Capa de Servicio, IoC/DI e Intro a JPA', count: 12 },
      { id: 'tut08', short: 'Tut 8-9 · Entidades & JPQL (19)', title: 'Tutorías 8 y 9 · Entidades JPA, Relaciones y JPQL', count: 19 }
    ]
  },
  {
    id: 'b4',
    short: 'B4: DTOs & Validación (41)',
    label: 'Bloque 4 · DTOs, Mappers & Bean Validation',
    badge: '41 Clases',
    tutorias: [
      { id: 'tut10', short: 'Tut 10 · DTO & Mappers (24)', title: 'Tutoría 10 · Patrón DTO, Mappers y Spring Data JPA', count: 24 },
      { id: 'tut11', short: 'Tut 11 · Bean Validation (17)', title: 'Tutoría 11 · Bean Validation (@Valid) y Manejo de Errores', count: 17 }
    ]
  },
  {
    id: 'b5',
    short: 'B5: Testing & Calidad (68)',
    label: 'Bloque 5 · OpenAPI, Logs & Testing',
    badge: '68 Clases',
    tutorias: [
      { id: 'tut12', short: 'Tut 12 · Logs & OpenAPI (20)', title: 'Tutoría 12 · Logs, Perfiles y Documentación (OpenAPI)', count: 20 },
      { id: 'tut13', short: 'Tut 13 · JUnit & Mockito (25)', title: 'Tutoría 13 · Testing Unitario con JUnit 5 y Mockito', count: 25 },
      { id: 'tut14', short: 'Tut 14 · Tests Integración (23)', title: 'Tutoría 14 · Pruebas de Integración y Spring Boot Test', count: 23 }
    ]
  },
  {
    id: 'all',
    short: 'Todas (199)',
    label: 'Catálogo Global de las 14 Tutorías',
    badge: '199 Clases',
    tutorias: [
      { id: 'tut01', short: 'Tut 1 (8)', title: 'Tutoría 1 · Arquitectura Web y Protocolo HTTP', count: 8 },
      { id: 'tut02', short: 'Tut 2 (7)', title: 'Tutoría 2 · JSON y Ecosistema Java', count: 7 },
      { id: 'tut03', short: 'Tut 3 (8)', title: 'Tutoría 3 · Maven y Lombok', count: 8 },
      { id: 'tut04', short: 'Tut 4 (9)', title: 'Tutoría 4 · Fundamentos del Framework Spring', count: 9 },
      { id: 'tut05', short: 'Tut 5 (15)', title: 'Tutoría 5 · Arquitectura por Capas, SOLID y Spring Boot', count: 15 },
      { id: 'tut06', short: 'Tut 6 (12)', title: 'Tutoría 6 · Controladores REST, APIs y ResponseEntity', count: 12 },
      { id: 'tut07', short: 'Tut 7 (12)', title: 'Tutoría 7 · Capa de Servicio, IoC/DI e Intro a JPA', count: 12 },
      { id: 'tut08', short: 'Tut 8-9 (19)', title: 'Tutorías 8 y 9 · Entidades JPA, Relaciones y JPQL', count: 19 },
      { id: 'tut10', short: 'Tut 10 (24)', title: 'Tutoría 10 · Patrón DTO, Mappers y Spring Data JPA', count: 24 },
      { id: 'tut11', short: 'Tut 11 (17)', title: 'Tutoría 11 · Bean Validation (@Valid) y Manejo de Errores', count: 17 },
      { id: 'tut12', short: 'Tut 12 (20)', title: 'Tutoría 12 · Logs, Perfiles y Documentación (OpenAPI)', count: 20 },
      { id: 'tut13', short: 'Tut 13 (25)', title: 'Tutoría 13 · Testing Unitario con JUnit 5 y Mockito', count: 25 },
      { id: 'tut14', short: 'Tut 14 (23)', title: 'Tutoría 14 · Pruebas de Integración y Spring Boot Test', count: 23 }
    ]
  }
];

const RULE_GROUPS = [
  'Todos',
  'Arquitectura',
  'JPA & Persistencia',
  'DTOs & Mappers',
  'HTTP & Validación',
  'Testing & Calidad',
  'DevOps & Docker'
];

function matchesRuleGroup(cat, group) {
  if (group === 'Todos') return true;
  const c = (cat || '').toLowerCase();
  if (group === 'Arquitectura') return c.includes('arquitectura') || c.includes('hexagonal') || c.includes('gravedad');
  if (group === 'JPA & Persistencia') return c.includes('jpa') || c.includes('hibernate') || c.includes('persistencia');
  if (group === 'DTOs & Mappers') return c.includes('dto') || c.includes('mapper') || c.includes('rúbricas');
  if (group === 'HTTP & Validación') return c.includes('http') || c.includes('validación');
  if (group === 'Testing & Calidad') return c.includes('testing') || c.includes('rendimiento');
  if (group === 'DevOps & Docker') return c.includes('devops') || c.includes('docker') || c.includes('contenedores');
  return false;
}

function findBlockIdForSlug(slug) {
  if (!slug) return 'b1';
  const clean = slug.toLowerCase();
  if (['b1', 'b2', 'b3', 'b4', 'b5', 'all'].includes(clean)) return clean;
  if (['tut01', 'tut02', 'tut1', 'tut2'].includes(clean)) return 'b1';
  if (['tut03', 'tut04', 'tut05', 'tut3', 'tut4', 'tut5'].includes(clean)) return 'b2';
  if (['tut06', 'tut07', 'tut08', 'tut6', 'tut7', 'tut8', 'tut9'].includes(clean)) return 'b3';
  if (['tut10', 'tut11'].includes(clean)) return 'b4';
  if (['tut12', 'tut13', 'tut14'].includes(clean)) return 'b5';
  return 'b1';
}

function findDefaultTutoriaForBlock(blockId) {
  const block = TUTORIA_BLOCKS.find((b) => b.id === blockId);
  return block && block.tutorias.length > 0 ? block.tutorias[0].id : 'tut01';
}

export default function StudioTutoriasTab({ initialSlug = null, onSelectModule = null, onSelectSubMode = null }) {
  // Modo de visualización: 'codigo' (199 clases prácticas) | 'reglas' (13 reglas de oro)
  const [userSubMode, setUserSubMode] = useState(null);
  const activeSubMode = userSubMode !== null
    ? userSubMode
    : (initialSlug === 'reglas' ? 'reglas' : 'codigo');

  const setActiveSubMode = (m) => {
    setUserSubMode(m);
    if (onSelectSubMode) onSelectSubMode(m);
  };

  // Datos de las 199 clases de código
  const [classesData, setClassesData] = useState(() => cachedTutoriasCodigo || []);
  const [loadingCode, setLoadingCode] = useState(!cachedTutoriasCodigo);
  const [codeLoadError, setCodeLoadError] = useState(null);

  // Estados de bloque, módulo y clase seleccionados
  const [userSelectedBlockId, setUserSelectedBlockId] = useState(null);
  const [userSelectedModuleId, setUserSelectedModuleId] = useState(null);
  const [userSelectedClassSlug, setUserSelectedClassSlug] = useState(null);
  const [codeSearchQuery, setCodeSearchQuery] = useState('');

  // Estado para la sección de 13 Reglas
  const [selectedRuleNum, setSelectedRuleNum] = useState(1);
  const [ruleSearchQuery, setRuleSearchQuery] = useState('');
  const [selectedRuleGroup, setSelectedRuleGroup] = useState('Todos');

  // Carga asíncrona del repositorio de código si no estaba en caché
  useEffect(() => {
    if (cachedTutoriasCodigo) return;

    let isMounted = true;
    fetch('/data/extra/springboot_tutorias_codigo.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} al cargar tutorías de código`);
        return res.json();
      })
      .then((data) => {
        cachedTutoriasCodigo = data;
        if (isMounted) {
          setClassesData(data);
          setLoadingCode(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setCodeLoadError(err.message);
          setLoadingCode(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const initialMatch = useMemo(() => {
    if (!initialSlug || initialSlug === 'reglas' || classesData.length === 0) return null;
    return classesData.find(
      (c) => c.slug === initialSlug || c.id === initialSlug || c.fileName.toLowerCase() === initialSlug.toLowerCase()
    );
  }, [initialSlug, classesData]);

  // Resolver bloque activo
  const activeBlockId = userSelectedBlockId !== null
    ? userSelectedBlockId
    : (initialMatch ? findBlockIdForSlug(initialMatch.moduleId) : findBlockIdForSlug(initialSlug));

  const currentBlockObj = useMemo(() => {
    return TUTORIA_BLOCKS.find((b) => b.id === activeBlockId) || TUTORIA_BLOCKS[0];
  }, [activeBlockId]);

  // Resolver tutoría activa
  const selectedModuleId = userSelectedModuleId !== null
    ? userSelectedModuleId
    : (initialMatch?.moduleId || (currentBlockObj.tutorias.some((t) => t.id === initialSlug) ? initialSlug : findDefaultTutoriaForBlock(activeBlockId)));

  const selectedClassSlug = userSelectedClassSlug !== null
    ? userSelectedClassSlug
    : (initialMatch?.slug || '');

  const handleSelectBlock = (blockId) => {
    setUserSelectedBlockId(blockId);
    const defTut = findDefaultTutoriaForBlock(blockId);
    setUserSelectedModuleId(defTut);
    setUserSelectedClassSlug('');
    if (onSelectModule) onSelectModule(blockId);
  };

  const handleSelectTutoria = (tutId) => {
    setUserSelectedModuleId(tutId);
    setUserSelectedClassSlug('');
    if (onSelectModule) onSelectModule(tutId);
  };

  const allTutorias = useMemo(() => TUTORIA_BLOCKS.flatMap(b => b.tutorias), []);
  const currentTutoriaIndex = allTutorias.findIndex(t => t.id === selectedModuleId);
  const handlePrevTutoria = () => {
    if (currentTutoriaIndex > 0) handleSelectTutoria(allTutorias[currentTutoriaIndex - 1].id);
  };
  const handleNextTutoria = () => {
    if (currentTutoriaIndex < allTutorias.length - 1) handleSelectTutoria(allTutorias[currentTutoriaIndex + 1].id);
  };

  const setSelectedClassSlug = (slug) => {
    setUserSelectedClassSlug(slug);
  };

  // Filtrado de clases según módulo y búsqueda
  const filteredClasses = useMemo(() => {
    return classesData.filter((item) => {
      const matchModule = selectedModuleId === 'all' || item.moduleId === selectedModuleId;
      const q = codeSearchQuery.toLowerCase().trim();
      const matchQ =
        !q ||
        item.fileName.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.filePath.toLowerCase().includes(q) ||
        item.moduleTitle.toLowerCase().includes(q) ||
        (item.topicNum && item.topicNum.includes(q));
      return matchModule && matchQ;
    });
  }, [classesData, selectedModuleId, codeSearchQuery]);

  // Clase actualmente seleccionada
  const activeClass = useMemo(() => {
    if (filteredClasses.length === 0) return null;
    if (selectedClassSlug) {
      const found = filteredClasses.find((c) => c.slug === selectedClassSlug);
      if (found) return found;
    }
    return filteredClasses[0];
  }, [filteredClasses, selectedClassSlug]);

  const activeClassIndex = useMemo(() => {
    if (!activeClass) return 0;
    return filteredClasses.findIndex((c) => c.slug === activeClass.slug);
  }, [filteredClasses, activeClass]);

  // Extracción limpia de código y comentarios desde contentMd
  const parsedActiveContent = useMemo(() => {
    if (!activeClass || !activeClass.contentMd) return { note: '', code: '' };
    const md = activeClass.contentMd;
    const match = md.match(/```(?:java)?\r?\n([\s\S]*?)```/);
    const code = match ? match[1].trim() : md;
    const note = md.split('```')[0].replace(/^###[^\n]*\n+/, '').trim();
    return { note, code };
  }, [activeClass]);

  // Navegación de clases anterior / siguiente
  const handlePrevClass = () => {
    if (activeClassIndex > 0) {
      setSelectedClassSlug(filteredClasses[activeClassIndex - 1].slug);
    }
  };

  const handleNextClass = () => {
    if (activeClassIndex < filteredClasses.length - 1) {
      setSelectedClassSlug(filteredClasses[activeClassIndex + 1].slug);
    }
  };

  // Filtrado de las 13 Reglas de Oro
  const filteredRules = useMemo(() => {
    return TUTORIAS.filter((t) => {
      const matchCat = matchesRuleGroup(t.categoria, selectedRuleGroup);
      const q = ruleSearchQuery.toLowerCase().trim();
      const matchQ =
        !q ||
        t.titulo.toLowerCase().includes(q) ||
        t.explicacion.toLowerCase().includes(q) ||
        t.categoria.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [ruleSearchQuery, selectedRuleGroup]);

  // Regla actualmente seleccionada
  const currentRule = useMemo(() => {
    if (filteredRules.length === 0) return null;
    const found = filteredRules.find((r) => r.numero === selectedRuleNum);
    return found || filteredRules[0];
  }, [filteredRules, selectedRuleNum]);

  const selectedRuleIndex = useMemo(() => {
    if (!currentRule) return 0;
    return filteredRules.findIndex((r) => r.numero === currentRule.numero);
  }, [filteredRules, currentRule]);

  // Metadatos del módulo activo
  const activeModuleMeta = useMemo(() => {
    if (selectedModuleId === 'all') {
      return {
        title: 'Catálogo Global de las 14 Tutorías',
        zipUrl: '/fuentes/springboot/tutorias-isra/tutoria-01-http-arquitectura.zip',
        zipName: 'Todos los proyectos disponibles individualmente'
      };
    }
    const sample = classesData.find((c) => c.moduleId === selectedModuleId);
    return {
      title: sample ? sample.moduleTitle : 'Tutoría Seleccionada',
      zipUrl: sample?.zipUrl || `/fuentes/springboot/tutorias-isra/tutoria-01-http-arquitectura.zip`,
      zipName: sample?.zipName || 'tutoria.zip'
    };
  }, [selectedModuleId, classesData]);

  return (
    <div className="studio-tutorias-container">
      {/* CABECERA OPERACIONAL CON CONMUTADOR DE MODOS */}
      <div className="project-header-bar" style={{ marginBottom: '1.25rem' }}>
        <div className="project-title-area">
          <h2 style={{ fontSize: '1.45rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            Tutorías & Código Práctico (Israel Rodríguez)
            <span className="studio-badge studio-badge-purple" style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem' }}>
              {activeSubMode === 'codigo' ? '199 Clases Java · 14 Tutorías' : '13 Reglas de Oro de Arquitectura'}
            </span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0.35rem 0 0 0' }}>
            {activeSubMode === 'codigo'
              ? 'Código real de las tutorías: arquitectura web, Spring Core, REST, servicios, JPA/JPQL, DTOs, Bean Validation y suite JUnit 5/Mockito.'
              : 'Reglas de oro, decisiones de diseño de producción, rendimiento de la JVM y rúbrica oficial de defensa técnica.'}
          </p>
        </div>

        {/* CONMUTADOR DE SUBMODO */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Vista:
          </span>
          <div className="category-pills" style={{ margin: 0 }}>
            <button
              type="button"
              className={`pill-btn ${activeSubMode === 'codigo' ? 'active' : ''}`}
              onClick={() => setActiveSubMode('codigo')}
            >
              <IconCode style={{ fontSize: '0.9rem' }} /> 199 Clases en Código
            </button>
            <button
              type="button"
              className={`pill-btn ${activeSubMode === 'reglas' ? 'active' : ''}`}
              onClick={() => setActiveSubMode('reglas')}
            >
              <IconZap style={{ fontSize: '0.9rem' }} /> 13 Reglas de Oro
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODO 1: REPOSITORIO DE CÓDIGO (199 CLASES EN 14 TUTORÍAS)
          ===================================================================== */}
      {activeSubMode === 'codigo' && (
        <div>
          {/* CABECERA COMPACTA DEL BLOQUE DE TUTORÍAS */}
          <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
                  Tutorías & Masterclasses en Código
                </span>
                <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentBlockObj.title}
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <button
                  type="button"
                  onClick={handlePrevTutoria}
                  disabled={currentTutoriaIndex <= 0}
                  className="studio-btn-secondary"
                  style={{ opacity: currentTutoriaIndex <= 0 ? 0.5 : 1, cursor: currentTutoriaIndex <= 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  <IconArrowLeft size={14} /> Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNextTutoria}
                  disabled={currentTutoriaIndex >= allTutorias.length - 1}
                  className="studio-btn-secondary"
                  style={{ opacity: currentTutoriaIndex >= allTutorias.length - 1 ? 0.5 : 1, cursor: currentTutoriaIndex >= allTutorias.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  Siguiente <IconArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* BARRA DE APARTADOS / TUTORÍAS DEL BLOQUE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                overflowX: 'auto',
                padding: '0.45rem 0.65rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            >
              {currentBlockObj.tutorias.map((tut) => {
                const isTutSelected = selectedModuleId === tut.id;
                return (
                  <button
                    key={tut.id}
                    type="button"
                    onClick={() => handleSelectTutoria(tut.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.28rem 0.6rem',
                      borderRadius: '6px',
                      border: isTutSelected ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                      background: isTutSelected ? '#6d28d9' : '#ffffff',
                      color: isTutSelected ? '#ffffff' : '#475569',
                      fontSize: '0.77rem',
                      fontWeight: isTutSelected ? 700 : 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      boxShadow: isTutSelected ? '0 1px 4px rgba(109, 40, 217, 0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    <span>{tut.short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TÍTULO PRINCIPAL DE LA TUTORÍA FUERA DE LA CAJA */}
          <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
            {activeModuleMeta.title}
          </h1>

          {/* CARD RESUMEN DE LA TUTORÍA ACTIVA + DESCARGA DE ZIP */}
          <div
            className="studio-card"
            style={{
              marginBottom: '1.25rem',
              background: '#ffffff',
              borderLeft: '5px solid #6d28d9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1.25rem 1.75rem'
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>
                {filteredClasses.length} clases Java disponibles en este bloque con explicaciones y pruebas en ejecución.
              </p>
            </div>

            {selectedModuleId !== 'all' && (
              <a
                href={activeModuleMeta.zipUrl}
                download
                className="studio-btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  padding: '0.55rem 1rem',
                  fontSize: '0.84rem'
                }}
              >
                <IconDownload /> Descargar Proyecto Completo ({activeModuleMeta.zipName})
              </a>
            )}
          </div>

          {/* BARRA DE HERRAMIENTAS IDE: BUSCADOR + CONTADOR + PESTAÑAS DE ARCHIVOS */}
          <div className="challenge-toolbar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '0.8rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg-card, #ffffff)',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle, #e2e8f0)'
          }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
              <IconSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                value={codeSearchQuery}
                onChange={(e) => setCodeSearchQuery(e.target.value)}
                placeholder="Filtrar clases de este módulo..."
                style={{
                  width: '100%',
                  padding: '0.45rem 0.75rem 0.45rem 2.1rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.84rem',
                  outline: 'none',
                  background: 'var(--bg-subtle, #f8fafc)'
                }}
              />
            </div>

            <div className="challenge-nav-buttons" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                type="button"
                className="challenge-nav-btn"
                disabled={activeClassIndex <= 0}
                onClick={handlePrevClass}
                title="Clase anterior"
              >
                <IconArrowLeft /> Anterior
              </button>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontFamily: 'monospace', padding: '0 0.45rem', fontWeight: 700 }}>
                {filteredClasses.length > 0 ? `${activeClassIndex + 1} de ${filteredClasses.length}` : '0 de 0'}
              </span>
              <button
                type="button"
                className="challenge-nav-btn"
                disabled={activeClassIndex >= filteredClasses.length - 1}
                onClick={handleNextClass}
                title="Clase siguiente"
              >
                Siguiente <IconArrowRight />
              </button>
            </div>
          </div>

          {/* VISOR DE CÓDIGO A ANCHO COMPLETO */}
          <div style={{ width: '100%', minWidth: 0 }}>
            {/* TARJETA DETALLADA DE LA CLASE SELECCIONADA */}
              {loadingCode && (
                <div className="studio-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <p style={{ color: '#64748b' }}>Cargando repositorio de 199 clases Java...</p>
                </div>
              )}

              {codeLoadError && (
                <div className="studio-card" style={{ borderLeft: '4px solid #ef4444', color: '#b91c1c' }}>
                  Error al cargar clases de tutoría: {codeLoadError}
                </div>
              )}

              {!loadingCode && activeClass && (
                <article className="challenge-display-card" style={{ borderLeft: '5px solid #6d28d9' }}>
                  <div className="challenge-card-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                        <span className="studio-badge studio-badge-purple" style={{ fontFamily: 'monospace' }}>
                          {activeClass.filePath}
                        </span>
                        <span className="studio-badge studio-badge-blue">
                          Tema {activeClass.topicNum || '1.0'}
                        </span>
                        <span className="studio-badge">
                          {activeClass.badge || 'JAVA'}
                        </span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>
                        {activeClass.title}
                      </h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                        {activeClass.moduleTitle}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <a
                        href={activeClass.zipUrl}
                        download
                        className="studio-btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', textDecoration: 'none' }}
                      >
                        <IconDownload /> Descargar Zip
                      </a>
                    </div>
                  </div>

                  {/* NOTA CONTEXTUAL */}
                  {parsedActiveContent.note && (
                    <div style={{ background: '#f8fafc', padding: '0.9rem 1.1rem', borderRadius: '8px', borderLeft: '3px solid #6d28d9', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                      {parsedActiveContent.note.replace(/^>\s*/gm, '')}
                    </div>
                  )}

                  {/* BLOQUE DE CÓDIGO JAVA */}
                  <StudioCodeBlock
                    code={parsedActiveContent.code}
                    language="java"
                    fileName={activeClass.fileName}
                  />
                </article>
              )}
            </div>
          </div>
      )}

      {/* =====================================================================
          MODO 2: 13 REGLAS DE ORO DE ARQUITECTURA & DECISIONES DE DISEÑO
          ===================================================================== */}
      {activeSubMode === 'reglas' && (
        <div>
          {/* HEADER DE REGLAS DE ORO */}
          <div className="studio-card" style={{ marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
                  Píldoras Técnicas del Profesor
                </span>
                <h3 style={{ margin: '0.2rem 0 0.35rem 0', fontSize: '1.45rem', fontWeight: 800 }}>
                  13 Tutorías & Reglas de Oro de Arquitectura
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
                  Apuntes esenciales de Israel Rodríguez sobre trampas de producción, rendimiento JVM y decisiones de diseño reales.
                </p>
              </div>

              {/* BUSCADOR DE REGLAS */}
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <IconSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={ruleSearchQuery}
                  onChange={(e) => setRuleSearchQuery(e.target.value)}
                  placeholder="Buscar por concepto o trampa..."
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
              </div>
            </div>

            {/* FILTROS POR GRUPO DE REGLAS */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
              {RULE_GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedRuleGroup(group)}
                  className={`studio-btn-secondary ${selectedRuleGroup === group ? 'active' : ''}`}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    borderColor: selectedRuleGroup === group ? '#6d28d9' : '#e2e8f0',
                    background: selectedRuleGroup === group ? 'rgba(109, 40, 217, 0.1)' : '#ffffff',
                    color: selectedRuleGroup === group ? '#6d28d9' : '#64748b',
                    fontWeight: selectedRuleGroup === group ? 700 : 500
                  }}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* FICHA DETALLADA DE LA REGLA A ANCHO COMPLETO */}
          <div style={{ width: '100%', minWidth: 0 }}>
              {currentRule && (
                <div className="studio-card" style={{ borderLeft: '5px solid #6d28d9', padding: '1.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="studio-badge studio-badge-purple" style={{ fontWeight: 800 }}>
                        Tutoría #{currentRule.numero < 10 ? `0${currentRule.numero}` : currentRule.numero}
                      </span>
                      <span className="studio-badge studio-badge-blue">
                        {currentRule.categoria}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                      {currentRule.autor || 'Israel Rodríguez'}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.65rem 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                    {currentRule.titulo}
                  </h3>

                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: '#334155', lineHeight: 1.65 }}>
                    {currentRule.explicacion}
                  </p>

                  {currentRule.trampaExamen && (
                    <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', border: '1px solid #fecaca', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.86rem', color: '#991b1b', lineHeight: 1.55, marginBottom: '1rem' }}>
                      <strong style={{ display: 'block', marginBottom: '0.2rem' }}>⚠️ Trampa de Examen / Producción:</strong>
                      {currentRule.trampaExamen}
                    </div>
                  )}

                  {currentRule.codigoJava && (
                    <div>
                      <h4 style={{ margin: '1rem 0 0.35rem 0', fontSize: '0.92rem', color: '#334155', fontWeight: 700 }}>
                        Ejemplo de Implementación:
                      </h4>
                      <StudioCodeBlock
                        code={currentRule.codigoJava}
                        language="java"
                        fileName={`Tutoria_${currentRule.numero}_Regla.java`}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
