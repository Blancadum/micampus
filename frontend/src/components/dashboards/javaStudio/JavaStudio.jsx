import React, { lazy, Suspense, useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import './JavaStudio.css';

// Master data
import { TEORIA_LIBRO } from '../../../data/javaStudio/studioData.js';
import { resolveBookChapter, LIBRO_GROUPS } from '../../../data/javaStudio/bookData.js';
import ifcdCourse from '../../../../public/data/extra/ifcd0177_curso.json';

// Tabs (carga diferida por pestaña activa para reducir el chunk inicial de JavaStudio)
const StudioRouteTab = lazy(() => import('./tabs/StudioRouteTab.jsx'));
const StudioPooTab = lazy(() => import('./tabs/StudioPooTab.jsx'));
const StudioProjectsTab = lazy(() => import('./tabs/StudioProjectsTab.jsx'));
const StudioActivitiesTab = lazy(() => import('./tabs/StudioActivitiesTab.jsx'));
const StudioBookTab = lazy(() => import('./tabs/StudioBookTab.jsx'));
const StudioTutoriasTab = lazy(() => import('./tabs/StudioTutoriasTab.jsx'));
const StudioChallengesTab = lazy(() => import('./tabs/StudioChallengesTab.jsx'));
const StudioQuizTab = lazy(() => import('./tabs/StudioQuizTab.jsx'));
const StudioCheatSheetTab = lazy(() => import('./tabs/StudioCheatSheetTab.jsx'));
const StudioAgileTab = lazy(() => import('./tabs/StudioAgileTab.jsx'));
import StudioNavigationSidebar from './StudioNavigationSidebar.jsx';

// Icons
import {
  IconCompass,
  IconCoffee,
  IconFolder,
  IconList,
  IconBook,
  IconZap,
  IconTarget,
  IconCheckSquare,
  IconFileText,
  IconRepeat,
  IconArrowLeft,
  IconSidebar,
  IconChevronDown,
  IconChevronRight
} from './StudioIcons.jsx';

export const POO_GROUPS = [
  {
    id: 'm1',
    label: 'M1: Fundamentos POO',
    items: [
      { id: 'm1-1-poo-clases-estado', label: '1.1 · Clases y Estado' },
      { id: 'm1-2-encapsulamiento', label: '1.2 · Encapsulamiento' },
      { id: 'm1-3-herencia', label: '1.3 · Herencia y Reutilización' },
      { id: 'm1-4-polimorfismo', label: '1.4 · Polimorfismo y Sobrecarga' },
      { id: 'm1-5-interfaces-abstractas', label: '1.5 · Interfaces y Clases Abstractas' },
      { id: 'm1-6-excepciones', label: '1.6 · Gestión de Excepciones' }
    ]
  },
  {
    id: 'm2',
    label: 'M2: SOLID & Patrones GoF',
    items: [
      { id: 'm2-1-intro-justificacion-patrones', label: '2.1 · Catálogo Patrones GoF' },
      { id: 'm2-2-principios-solid-patrones', label: '2.2 · Principios SOLID' },
      { id: 'm2-3-patrones-creacionales', label: '2.3 · Patrones Creacionales' },
      { id: 'm2-4-patrones-estructurales', label: '2.4 · Patrones Estructurales' },
      { id: 'm2-5-patrones-comportamiento-1', label: '2.5 · Patrones Comportamiento I' },
      { id: 'm2-6-patrones-comportamiento-2', label: '2.6 · Patrones Comportamiento II' },
      { id: 'm2-7-antipatrones-diseno-codigo', label: '2.7 · Antipatrones en Java' },
      { id: 'm2-8-refactorizacion-optimizacion', label: '2.8 · Refactorización & Deuda' },
      { id: 'm2-9-colecciones-streams', label: '2.9 · Colecciones y Streams' }
    ]
  },
  {
    id: 'm3',
    label: 'M3: Persistencia & JPA',
    items: [
      { id: 'm3-1-jdbc-a-orm', label: '3.1 · De JDBC a ORM' },
      { id: 'm3-2-anotaciones-jpa', label: '3.2 · Anotaciones JPA (@Entity)' },
      { id: 'm3-3-relaciones-jpa', label: '3.3 · Relaciones en Cascada' },
      { id: 'm3-4-jpql-ciclo-vida', label: '3.4 · JPQL y Ciclo de Vida' }
    ]
  },
  {
    id: 'm4',
    label: 'M4: Spring Framework Web',
    items: [
      { id: 'm4-1-spring-ioc-di', label: '4.1 · Spring Core, IoC y DI' },
      { id: 'm4-2-springboot-arquitectura', label: '4.2 · Spring Boot por Capas' },
      { id: 'm4-3-api-rest-spring', label: '4.3 · APIs REST & Controllers' },
      { id: 'm4-4-evaluacion-final-prep', label: '4.4 · Preparación Evaluación' }
    ]
  }
];

const SIDEBAR_SECTIONS = [
  {
    id: 'ruta',
    label: 'Ruta',
    icon: IconCompass,
    badge: '7 Niveles',
    subitems: [
      { id: 'n1', label: '1. POO & SOLID' },
      { id: 'n2', label: '2. Persistencia JPA' },
      { id: 'n3', label: '3. Spring Boot Core & IoC' },
      { id: 'n4', label: '4. RESTful APIs & DTOs' },
      { id: 'n5', label: '5. 3 Capas vs Hexagonal' },
      { id: 'n6', label: '6. Seguridad & Mockito' },
      { id: 'n7', label: '7. Proyectos & Defensa' }
    ]
  },
  {
    id: 'poo',
    label: 'Java 1',
    icon: IconBook,
    badge: '23 Lecc.',
    groups: POO_GROUPS
  },
  {
    id: 'libro',
    label: 'Spring Boot',
    icon: IconBook,
    badge: '34 Temas',
    groups: LIBRO_GROUPS
  },
  {
    id: 'actividades',
    label: 'Actividades',
    icon: IconList,
    badge: '16 Oficiales',
    subitems: [
      { slug: 'actividad-1', label: '01 · Contenedor IoC' },
      { slug: 'actividad-2', label: '02 · Inyección Dependencias (IoD)' },
      { slug: 'actividad-3', label: '03 · Anotaciones Java' },
      { slug: 'actividad-4', label: '04 · Configuraciones Spring' },
      { slug: 'actividad-5', label: '05 · Entorno Spring Boot' },
      { slug: 'actividad-6', label: '06 · Controller REST' },
      { slug: 'actividad-7', label: '07 · Capa de Servicio' },
      { slug: 'actividad-8', label: '08 · Spring Data JPA' },
      { slug: 'actividad-9', label: '09 · Relaciones JPA' },
      { slug: 'actividad-10', label: '10 · DTOs & Mappers' },
      { slug: 'actividad-11', label: '11 · Validaciones (@Valid)' },
      { slug: 'actividad-12', label: '12 · Errores (@Advice)' },
      { slug: 'actividad-13', label: '13 · OpenAPI & Swagger' },
      { slug: 'actividad-14', label: '14 · Tests & Mockito' },
      { slug: 'actividad-15', label: '15 · Seguridad JWT' },
      { slug: 'actividad-16', label: '16 · Docker & Despliegue' }
    ]
  },
  {
    id: 'proyectos',
    label: 'Proyectos',
    icon: IconFolder,
    badge: '2 Apps',
    groups: [
      {
        id: 'taskmanager',
        label: 'TaskManager Enterprise',
        views: [
          { mode: 'capas', label: '3 Capas Tradicional' },
          { mode: 'ciclo', label: 'Ciclo HTTP (7 Fases)' },
          { mode: 'hexagonal', label: 'Hexagonal' }
        ]
      },
      {
        id: 'library',
        label: 'Librería (Proyecto Final)',
        views: [
          { mode: 'capas', label: '3 Capas Tradicional' },
          { mode: 'ciclo', label: 'Ciclo HTTP (7 Fases)' },
          { mode: 'hexagonal', label: 'Hexagonal' }
        ]
      }
    ]
  },
  {
    id: 'tutorias',
    label: 'Tutorías',
    icon: IconZap,
    badge: '199 Clases',
    subitems: [
      { id: 'tut01', label: 'Tut 1: Protocolo HTTP' },
      { id: 'tut02', label: 'Tut 2: JSON & Ecosistema' },
      { id: 'tut03', label: 'Tut 3: Maven & Lombok' },
      { id: 'tut04', label: 'Tut 4: Spring Core & IoC' },
      { id: 'tut05', label: 'Tut 5: 3 Capas & SOLID' },
      { id: 'tut06', label: 'Tut 6: REST Controllers' },
      { id: 'tut07', label: 'Tut 7: Services & JPA' },
      { id: 'tut08', label: 'Tut 8-9: Entidades & JPQL' },
      { id: 'tut10', label: 'Tut 10: DTO & Mappers' },
      { id: 'tut11', label: 'Tut 11: Bean Validation' },
      { id: 'tut12', label: 'Tut 12: Arquitectura Test' },
      { id: 'tut13', label: 'Tut 13: Mockito & Mocks' },
      { id: 'tut14', label: 'Tut 14: Verificación Final' },
      { id: 'reglas', label: '13 Reglas de Oro' }
    ]
  },
  {
    id: 'retos',
    label: 'Retos',
    icon: IconTarget,
    badge: '5 Dilemas',
    subitems: [
      { id: 'd1', label: 'Dilema 1: Fallo Transaccional' },
      { id: 'd2', label: 'Dilema 2: Concurrencia & Race Cond.' },
      { id: 'd3', label: 'Dilema 3: Lombok & StackOverflow' },
      { id: 'd4', label: 'Dilema 4: Fuga en Tokens JWT' },
      { id: 'd5', label: 'Dilema 5: 3 Capas vs Hexagonal' },
      { id: 'api-zero', label: 'API Zero (Paso a Paso)' }
    ]
  },
  {
    id: 'agile',
    label: 'Metodologías Ágiles',
    icon: IconRepeat,
    badge: 'Scrum · 10Q',
    subitems: [
      { id: 'marco', label: '1. Marco & Roles' },
      { id: 'ceremonias', label: '2. 5 Ceremonias' },
      { id: 'artefactos', label: '3. Artefactos & DoD' },
      { id: 'simulador', label: '4. Simulador Examen (10 Q)' },
      { id: 'repaso', label: '5. Hoja Resumen & Chuleta' },
      { id: 'git', label: '6. Git & GitHub Ágil' },
      { id: 'multimedia', label: '7. Vídeo & Recursos Sala' }
    ]
  },
  {
    id: 'quiz',
    label: 'Quiz',
    icon: IconCheckSquare,
    badge: '35 Preguntas',
    subitems: [
      { id: 'all', label: 'Todas las Preguntas (35)' },
      { id: 'web', label: 'Capa Web (Controller)' },
      { id: 'service', label: 'Capa Negocio (Service)' },
      { id: 'repository', label: 'Capa Persistencia (JPA)' },
      { id: 'dto', label: 'Capa DTOs & Mappers' },
      { id: 'security', label: 'Capa Seguridad & JWT' },
      { id: 'testing', label: 'Capa Testing (Mockito)' },
      { id: 'docker', label: 'Capa DevOps & Docker' }
    ]
  },
  {
    id: 'cheatsheet',
    label: 'Cheat Sheet',
    icon: IconFileText,
    badge: 'Chuleta',
    subitems: [
      { id: 'anotaciones', label: 'Anotaciones Spring Boot' },
      { id: 'jpa', label: 'Mapeo JPA & Hibernate' },
      { id: 'validaciones', label: 'Bean Validation' },
      { id: 'docker', label: 'Docker & Maven CLI' }
    ]
  }
];

export default function JavaStudio() {
  const { tab, subview } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefijo base unificado siempre hacia /java/studio
  const basePath = '/java/studio';

  // Normalización de slugs
  let normalizedTab = (tab || 'ruta').toLowerCase();
  if (normalizedTab === 'proyectos') normalizedTab = 'taskmanager';
  if (normalizedTab === 'teoria') normalizedTab = 'libro';
  if (normalizedTab === 'apuntes' || normalizedTab === 'frikadas') normalizedTab = 'tutorias';
  if (normalizedTab === 'quizzes' || normalizedTab === 'simulador') normalizedTab = 'quiz';
  if (normalizedTab === 'activities') normalizedTab = 'actividades';
  if (normalizedTab === 'scrum' || normalizedTab === 'metodologias-agiles' || normalizedTab === 'sala-estudio') normalizedTab = 'agile';

  // Determinar la sección activa en el menú lateral
  const activeSectionId = useMemo(() => {
    if (normalizedTab === 'taskmanager' || normalizedTab === 'library') {
      return 'proyectos';
    }
    const found = SIDEBAR_SECTIONS.find((s) => s.id === normalizedTab);
    return found ? found.id : 'ruta';
  }, [normalizedTab]);

  // Estado de colapso del menú lateral
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Estado de secciones expandidas manualmente (por defecto la sección activa se despliega siempre)
  const [userToggledSections, setUserToggledSections] = useState({});

  const isSectionExpanded = (secId) => {
    if (userToggledSections[secId] !== undefined) {
      return userToggledSections[secId];
    }
    return secId === activeSectionId;
  };

  const handleToggleSection = (secId) => {
    setUserToggledSections((prev) => ({
      ...prev,
      [secId]: !isSectionExpanded(secId)
    }));
  };

  const handleSelectSection = (secId) => {
    // Expandir automáticamente
    setUserToggledSections((prev) => ({
      ...prev,
      [secId]: true
    }));

    if (secId === 'proyectos') {
      navigate(`${basePath}/taskmanager/capas`);
    } else if (secId === 'ruta') {
      navigate(`${basePath}/ruta`);
    } else {
      navigate(`${basePath}/${secId}`);
    }
  };

  // Resuelve dinámicamente el subitem activo para la sección actual
  const activeSubItemId = useMemo(() => {
    // 1. PROYECTOS
    if (activeSectionId === 'proyectos') {
      return `${normalizedTab}/${subview || 'capas'}`;
    }

    // 2. TUTORÍAS
    if (activeSectionId === 'tutorias') {
      if (subview === 'reglas') return 'reglas';
      if (!subview) return 'tut01';
      const clean = subview.toLowerCase();
      if (clean.startsWith('tut')) return clean.length === 4 ? `tut0${clean.slice(3)}` : clean;
      if (clean === 'b1') return 'tut01';
      if (clean === 'b2') return 'tut03';
      if (clean === 'b3') return 'tut06';
      if (clean === 'b4') return 'tut10';
      if (clean === 'b5') return 'tut12';
      const numMatch = clean.match(/(\d+)/);
      if (numMatch) {
        const n = parseInt(numMatch[1], 10);
        return n < 10 ? `tut0${n}` : `tut${n}`;
      }
      return 'tut01';
    }

    // 3. LIBRO
    if (activeSectionId === 'libro') {
      if (!subview) return 'springboot-guia';
      const resolved = resolveBookChapter(subview);
      return resolved ? resolved.id : 'springboot-guia';
    }

    // 4. POO & SOLID
    if (activeSectionId === 'poo') {
      if (!subview) return 'm1-1-poo-clases-estado';
      const clean = subview.toLowerCase();
      if (clean === 'm1') return 'm1-1-poo-clases-estado';
      if (clean === 'm2') return 'm2-1-intro-justificacion-patrones';
      if (clean === 'm3') return 'm3-1-jdbc-a-orm';
      if (clean === 'm4') return 'm4-1-spring-ioc-di';
      const lesson = ifcdCourse.find((l) => l.id.toLowerCase() === clean);
      if (lesson) return lesson.id;
      return 'm1-1-poo-clases-estado';
    }

    // 5. ACTIVIDADES
    if (activeSectionId === 'actividades') {
      if (!subview) return 'actividad-1';
      const clean = subview.toLowerCase();
      const match = clean.match(/(\d+)/);
      if (!match) return 'actividad-1';
      const n = parseInt(match[1], 10);
      return `actividad-${n}`;
    }

    // 6. RETOS
    if (activeSectionId === 'retos') {
      if (!subview) return 'd1';
      const clean = subview.toLowerCase();
      if (clean === 'api-zero' || clean === 'proyecto-cero') return 'api-zero';
      const match = clean.match(/d?(\d+)/);
      if (match) {
        const n = parseInt(match[1], 10);
        if (n >= 1 && n <= 5) return `d${n}`;
      }
      return 'd1';
    }

    // 7. AGILE
    if (activeSectionId === 'agile') {
      if (!subview) return 'marco';
      return subview.toLowerCase();
    }

    // 8. QUIZ
    if (activeSectionId === 'quiz') {
      if (!subview) return 'all';
      return subview.toLowerCase();
    }

    // 9. CHEAT SHEET
    if (activeSectionId === 'cheatsheet') {
      if (!subview) return 'anotaciones';
      return subview.toLowerCase();
    }

    // 10. RUTA
    if (activeSectionId === 'ruta') {
      if (!subview) return 'n1';
      const match = subview.match(/(\d+)/);
      return match ? `n${match[1]}` : 'n1';
    }

    return null;
  }, [activeSectionId, subview]);

  // Módulo y lección activa para Java 1 (POO)
  const activeMValue = useMemo(() => {
    if (!subview) return 'm1';
    const clean = subview.toLowerCase();
    if (['m1', 'm2', 'm3', 'm4'].includes(clean)) return clean;
    const l = ifcdCourse.find(it => it.id.toLowerCase() === clean);
    return l?.moduleShort?.toLowerCase() || 'm1';
  }, [subview]);

  const activeSubLessonLabel = useMemo(() => {
    if (!subview) return null;
    const clean = subview.toLowerCase();
    if (['m1', 'm2', 'm3', 'm4'].includes(clean)) return null;
    const l = ifcdCourse.find(it => it.id.toLowerCase() === clean);
    return l ? `${l.topicNum} · ${l.title}` : null;
  }, [subview]);

  // Bloque y capítulo activo para Spring Boot (Libro)
  const activeBookBlockId = useMemo(() => {
    if (activeSectionId !== 'libro') return 'b0';
    const currentSub = activeSubItemId || 'springboot-guia';
    const foundGroup = LIBRO_GROUPS.find((g) =>
      g.items.some((it) => it.id === currentSub)
    );
    return foundGroup ? foundGroup.id : 'b0';
  }, [activeSectionId, activeSubItemId]);

  const activeBookChapterLabel = useMemo(() => {
    if (activeSectionId !== 'libro') return null;
    const currentSub = activeSubItemId || 'springboot-guia';
    for (const g of LIBRO_GROUPS) {
      const match = g.items.find((it) => it.id === currentSub);
      if (match) return match.label;
    }
    return null;
  }, [activeSectionId, activeSubItemId]);

  // Título y migas de pan actuales
  const breadcrumbInfo = useMemo(() => {
    if (activeSectionId === 'proyectos') {
      const isTm = normalizedTab === 'taskmanager';
      const projName = isTm ? 'TaskManager' : 'Librería';
      const mode = activeSubItemId === 'hexagonal' ? 'Hexagonal' : activeSubItemId === 'ciclo' ? 'Ciclo HTTP (7 Fases)' : '3 Capas Tradicional';
      return {
        section: 'Proyectos',
        sub: `${projName} (${mode})`
      };
    }
    const currentSec = SIDEBAR_SECTIONS.find((s) => s.id === activeSectionId);
    if (!currentSec) {
      return { section: 'Studio', sub: '' };
    }

    if (currentSec.groups) {
      for (const grp of currentSec.groups) {
        const items = grp.items || grp.views || [];
        const itMatch = items.find((it) => (it.id || it.slug) === activeSubItemId);
        if (itMatch) {
          return {
            section: currentSec.label,
            sub: `${grp.label.split(':')[0]} · ${itMatch.label || itMatch.title}`
          };
        }
      }
    }

    if (currentSec.subitems) {
      const subMatch = currentSec.subitems.find((s) => s.id === activeSubItemId || s.slug === activeSubItemId);
      if (subMatch) {
        return {
          section: currentSec.label,
          sub: subMatch.label
        };
      }
    }

    return {
      section: currentSec.label,
      sub: currentSec.badge || ''
    };
  }, [activeSectionId, normalizedTab, subview, activeSubItemId]);

  return (
    <div className="java-studio-root">
      <div className={`java-studio-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        
        {/* ===================================================================
            ASIDE LEFT MENU: NAVEGACIÓN VERTICAL REUTILIZABLE
            =================================================================== */}
        <StudioNavigationSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          hubLink="/java/studio"
          hubLabel="Studio"
          brandLabel="Java & Spring Studio"
          sections={SIDEBAR_SECTIONS}
          activeSectionId={activeSectionId}
          activeSubItemId={activeSubItemId}
          isSectionExpanded={isSectionExpanded}
          onSelectSection={handleSelectSection}
          onToggleSection={handleToggleSection}
          onSelectSubItem={(secId, targetId) => {
            if (secId === "proyectos") {
              navigate(`${basePath}/${targetId}`);
            } else {
              navigate(`${basePath}/${secId}/${targetId}`);
            }
          }}
        />

        {/* ===================================================================
            MAIN VIEWPORT: CONTENIDO DE LA SECCIÓN SELECCIONADA
            =================================================================== */}
        <div className="java-studio-main-viewport">
          
          {/* BARRA DE MIGAS DE PAN (BREADCRUMB & ACCESOS RÁPIDOS) */}
          <div className="studio-breadcrumb-bar">
            <div className="studio-breadcrumb-trail" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
              <Link to="/" title="Ir a la portada de Campus">Campus</Link>
              <span>/</span>
              <Link to="/java/studio" title="Ir al inicio de Java Studio">Java Studio</Link>
              <span>/</span>
              {activeSectionId === 'libro' ? (
                <>
                  <Link 
                    to="/java/studio/libro" 
                    style={{ fontWeight: 600, color: '#475569' }}
                    title="Ir a Spring Boot"
                  >
                    Spring Boot
                  </Link>
                  <span>/</span>
                  {/* SELECTOR DESPLEGABLE DE BLOQUES A LA ALTURA DEL BREADCRUMB */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <select
                      value={activeBookBlockId}
                      onChange={(e) => {
                        const targetBlock = LIBRO_GROUPS.find((g) => g.id === e.target.value);
                        if (targetBlock && targetBlock.items.length > 0) {
                          navigate(`${basePath}/libro/${targetBlock.items[0].id}`);
                        }
                      }}
                      style={{
                        padding: '0.24rem 1.6rem 0.24rem 0.6rem',
                        borderRadius: '6px',
                        border: '1.5px solid #6d28d9',
                        background: '#ffffff',
                        color: '#4c1d95',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        appearance: 'none',
                        outline: 'none',
                        boxShadow: '0 1px 3px rgba(109, 40, 217, 0.08)'
                      }}
                      title="Seleccionar Bloque de Spring Boot"
                    >
                      {LIBRO_GROUPS.map((grp) => (
                        <option key={grp.id} value={grp.id}>
                          {grp.label} ({grp.items.length} Temas)
                        </option>
                      ))}
                    </select>
                    <span
                      style={{
                        position: 'absolute',
                        right: '0.55rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: '#6d28d9',
                        fontSize: '0.62rem'
                      }}
                    >
                      ▼
                    </span>
                  </div>
                  {activeBookChapterLabel && (
                    <>
                      <span>/</span>
                      <span style={{ color: '#6d28d9', fontWeight: 700, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={activeBookChapterLabel}>
                        {activeBookChapterLabel}
                      </span>
                    </>
                  )}
                </>
              ) : activeSectionId === 'poo' ? (
                <>
                  <Link 
                    to="/java/studio/poo" 
                    style={{ fontWeight: 600, color: '#475569' }}
                    title="Ir a Java 1"
                  >
                    Java 1
                  </Link>
                  <span>/</span>
                  {/* SELECTOR DESPLEGABLE DE MÓDULOS "M" A LA ALTURA DEL BREADCRUMB */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <select
                      value={activeMValue}
                      onChange={(e) => navigate(`${basePath}/poo/${e.target.value}`)}
                      style={{
                        padding: '0.24rem 1.6rem 0.24rem 0.6rem',
                        borderRadius: '6px',
                        border: '1.5px solid #6d28d9',
                        background: '#ffffff',
                        color: '#4c1d95',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        appearance: 'none',
                        outline: 'none',
                        boxShadow: '0 1px 3px rgba(109, 40, 217, 0.08)'
                      }}
                      title="Seleccionar Módulo M1 - M4"
                    >
                      <option value="m1">M1: Fundamentos POO (6 Lecc.)</option>
                      <option value="m2">M2: SOLID & Patrones GoF (9 Lecc.)</option>
                      <option value="m3">M3: Persistencia & JPA (4 Lecc.)</option>
                      <option value="m4">M4: Spring Framework Web (4 Lecc.)</option>
                    </select>
                    <span
                      style={{
                        position: 'absolute',
                        right: '0.55rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: '#6d28d9',
                        fontSize: '0.62rem'
                      }}
                    >
                      ▼
                    </span>
                  </div>
                  {activeSubLessonLabel && (
                    <>
                      <span>/</span>
                      <span style={{ color: '#6d28d9', fontWeight: 700, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={activeSubLessonLabel}>
                        {activeSubLessonLabel}
                      </span>
                    </>
                  )}
                </>
              ) : breadcrumbInfo.sub ? (
                <>
                  <Link 
                    to={`/java/studio/${activeSectionId}`} 
                    style={{ fontWeight: 600, color: '#475569' }}
                    title={`Ir a ${breadcrumbInfo.section}`}
                  >
                    {breadcrumbInfo.section}
                  </Link>
                  <span>/</span>
                  <span style={{ color: '#6d28d9', fontWeight: 700 }}>{breadcrumbInfo.sub}</span>
                </>
              ) : (
                <strong style={{ color: '#0f172a' }}>{breadcrumbInfo.section}</strong>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              {activeSectionId === 'poo' && (
                <span
                  className="studio-badge studio-badge-blue"
                  style={{ fontWeight: 700, fontSize: '0.74rem' }}
                >
                  21 Lecc. Java 1
                </span>
              )}
              {activeSectionId === 'libro' && (
                <span
                  className="studio-badge studio-badge-blue"
                  style={{ fontWeight: 700, fontSize: '0.74rem' }}
                >
                  34 Temas Spring Boot
                </span>
              )}
              <Link
                to="/java/studio/quiz"
                className="studio-badge studio-badge-purple"
                style={{ textDecoration: 'none', fontWeight: 600, fontSize: '0.76rem' }}
              >
                Simulador Examen
              </Link>
            </div>
          </div>

          {/* RENDERIZADO DEL COMPONENTE DE LA SECCIÓN ACTIVA */}
          <div className="java-studio-tab-content">
            <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>Cargando sección...</div>}>
            {activeSectionId === 'ruta' && (
              <StudioRouteTab
                initialSlug={subview}
                onNavigateTab={(t) => handleSelectSection(t)}
              />
            )}
            {activeSectionId === 'poo' && (
              <StudioPooTab
                initialSlug={subview}
                onSelectLesson={(id) => navigate(`${basePath}/poo/${id}`)}
              />
            )}
            {activeSectionId === 'proyectos' && (
              <StudioProjectsTab
                projectId={normalizedTab === 'library' ? 'library' : 'taskmanager'}
                initialViewMode={subview || 'capas'}
              />
            )}
            {activeSectionId === 'actividades' && (
              <StudioActivitiesTab
                initialSlug={subview}
                onSelectActivity={(num) => navigate(num ? `${basePath}/actividades/actividad-${num}` : `${basePath}/actividades`)}
              />
            )}
            {activeSectionId === 'libro' && (
              <StudioBookTab
                initialSlug={subview}
                onSelectChapter={(id) => navigate(`${basePath}/libro/${id}`)}
              />
            )}
            {activeSectionId === 'tutorias' && (
              <StudioTutoriasTab
                initialSlug={subview}
                onSelectModule={(modId) => navigate(`${basePath}/tutorias/${modId}`)}
                onSelectSubMode={(m) => navigate(m === 'reglas' ? `${basePath}/tutorias/reglas` : `${basePath}/tutorias`)}
              />
            )}
            {activeSectionId === 'retos' && (
              <StudioChallengesTab
                initialSlug={subview}
                onSelectDilema={(id) => navigate(`${basePath}/retos/${id}`)}
              />
            )}
            {activeSectionId === 'agile' && (
              <StudioAgileTab
                initialSlug={subview}
              />
            )}
            {activeSectionId === 'quiz' && (
              <StudioQuizTab
                initialSlug={subview}
                onSelectFilter={(f) => navigate(`${basePath}/quiz/${f}`)}
              />
            )}
            {activeSectionId === 'cheatsheet' && (
              <StudioCheatSheetTab
                initialSlug={subview}
                onSelectCategory={(catId) => navigate(`${basePath}/cheatsheet/${catId}`)}
              />
            )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
