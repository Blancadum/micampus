import React, { lazy, Suspense, useEffect, useMemo, useCallback } from 'react';

// Code-splitting asíncrono para sidebars y paneles secundarios de LessonViewer
const LessonRightSidebar = lazy(() => import('./LessonRightSidebar'));
const LessonNotebookSidebar = lazy(() => import('./LessonNotebookSidebar'));
const LessonEacDevKitSidebar = lazy(() => import('./LessonEacDevKitSidebar'));
const LessonIocActivitiesSidebar = lazy(() => import('./LessonIocActivitiesSidebar'));
const LessonGithubCommandsSidebar = lazy(() => import('./LessonGithubCommandsSidebar'));
const LessonAccentureVideosSidebar = lazy(() => import('./LessonAccentureVideosSidebar'));
const LessonIfcdAdminSidebar = lazy(() => import('./LessonIfcdAdminSidebar'));
const LessonPhpProjectsSidebar = lazy(() => import('./LessonPhpProjectsSidebar'));
const SubjectRightAside = lazy(() => import('../../../dashboards/subject/SubjectRightAside.jsx'));

/**
 * ============================================================================
 * @component   LessonRightDrawersCluster
 * @description Agrupación orquestada de todos los paneles y cajones laterales
 *              derechos con cálculo dinámico de offsets para sus pestañas,
 *              cierre con tecla Escape, backdrop exterior y carga bajo demanda.
 * ============================================================================
 */
export default function LessonRightDrawersCluster({
  activeRightDrawer,
  setActiveRightDrawer,
  isMobile,
  subjectConfig,
  currentTopic,
  activeSlug,
  title,
  themeColor,
  onSelectTopic
}) {
  const {
    isTheorySpringBoot,
    isActivitiesSpringBoot,
    isVideosSpringBoot,
    isTutoriasCodigo,
    isIfcd0177,
    isEntornos,
    isSepePhp,
    effectiveGestionSource,
    resolvedSubjectConfig,
    iocGestionData,
    isIocSubject
  } = subjectConfig;

  // Condiciones de visibilidad de cada cajón
  const showRightSidebar = (isTheorySpringBoot || isActivitiesSpringBoot || isVideosSpringBoot || isTutoriasCodigo) && !isMobile;
  const showTutoriasSidebar = (isTheorySpringBoot || isActivitiesSpringBoot || isTutoriasCodigo) && !isMobile;
  const showVideosSidebar = (isTheorySpringBoot || isActivitiesSpringBoot || isVideosSpringBoot || isTutoriasCodigo) && !isMobile;
  const showNotebookSidebar = (isActivitiesSpringBoot || Boolean(currentTopic?.notebook)) && !isMobile;
  const showEacDevKit = isEntornos && !isIocSubject && !isMobile;
  const showIocActivities = Boolean(effectiveGestionSource) && !isIocSubject && !isMobile;
  const showGithubSidebar = (isActivitiesSpringBoot || isTheorySpringBoot || isVideosSpringBoot || isTutoriasCodigo || (isEntornos && !isIocSubject)) && !isMobile;
  const showIfcdAdminSidebar = isIfcd0177 && !isMobile;
  const showPhpProjects = isSepePhp && !isMobile;

  // Cierre interactivo con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeRightDrawer) {
        setActiveRightDrawer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRightDrawer, setActiveRightDrawer]);

  // Cálculo memoizado de offsets verticales (altura pestaña 46px + separación 10px = 56px)
  const tabOffsets = useMemo(() => {
    let nextOffset = 20;
    const TAB_STEP = 56;
    const offsets = {};

    const registerDrawer = (key, isVisible) => {
      if (isVisible) {
        offsets[key] = `${nextOffset}px`;
        nextOffset += TAB_STEP;
      }
    };

    registerDrawer('ifcdAdmin', showIfcdAdminSidebar);
    registerDrawer('phpProjects', showPhpProjects);
    registerDrawer('theory', showRightSidebar);
    registerDrawer('tutorias', showTutoriasSidebar);
    registerDrawer('videos', showVideosSidebar);
    registerDrawer('eacDevKit', showEacDevKit);
    registerDrawer('notebook', showNotebookSidebar);
    registerDrawer('iocActivities', showIocActivities);
    registerDrawer('github', showGithubSidebar);

    return offsets;
  }, [
    showIfcdAdminSidebar,
    showPhpProjects,
    showRightSidebar,
    showTutoriasSidebar,
    showVideosSidebar,
    showEacDevKit,
    showNotebookSidebar,
    showIocActivities,
    showGithubSidebar
  ]);

  const toggleDrawer = useCallback((drawerKey) => {
    setActiveRightDrawer(prev => (prev === drawerKey ? null : drawerKey));
  }, [setActiveRightDrawer]);

  const closeActiveDrawer = useCallback(() => {
    setActiveRightDrawer(null);
  }, [setActiveRightDrawer]);

  return (
    <>
      {/* Backdrop sutil al abrir un cajón para permitir cierre al hacer clic fuera */}
      {activeRightDrawer && (
        <div
          onClick={closeActiveDrawer}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(2px)',
            zIndex: 940,
            transition: 'opacity 0.2s ease',
            cursor: 'pointer'
          }}
          aria-hidden="true"
        />
      )}

      <Suspense fallback={null}>
        {showRightSidebar && (
          <LessonRightSidebar 
            mode={isActivitiesSpringBoot ? 'theory' : 'activities'} 
            isOpen={activeRightDrawer === 'theory'}
            onToggle={() => toggleDrawer('theory')}
            topOffset={tabOffsets.theory || '20px'}
          />
        )}

        {showTutoriasSidebar && (
          <LessonRightSidebar 
            mode="tutorias"
            dataSource="/data/extra/plan_tutorias.json"
            title="Plan de Tutorías"
            icon="📅"
            badgeText="Spring Boot"
            isOpen={activeRightDrawer === 'tutorias'}
            onToggle={() => toggleDrawer('tutorias')}
            topOffset={tabOffsets.tutorias || '76px'}
          />
        )}

        {showVideosSidebar && (
          <LessonAccentureVideosSidebar 
            isOpen={activeRightDrawer === 'videos'}
            onToggle={() => toggleDrawer('videos')}
            activeSlug={activeSlug}
            onSelectSection={onSelectTopic}
            topOffset={tabOffsets.videos || '76px'}
          />
        )}

        {/* Riel unificado para materias de IOC (Entornos, Despliegue, etc.) idéntico al Aula */}
        {isIocSubject && resolvedSubjectConfig && (
          <SubjectRightAside
            subjectConfig={resolvedSubjectConfig}
            gestionData={iocGestionData}
            themeColor={themeColor || resolvedSubjectConfig.color}
            topOffset="126px"
            onSelectLesson={onSelectTopic}
          />
        )}

        {showNotebookSidebar && (
          <LessonNotebookSidebar 
            isOpen={activeRightDrawer === 'notebook'}
            onToggle={() => toggleDrawer('notebook')}
            activeSlug={activeSlug}
            activityTitle={currentTopic ? currentTopic.title : ''}
            notebookData={currentTopic ? currentTopic.notebook : null}
            topOffset={tabOffsets.notebook || '132px'}
          />
        )}

        {showEacDevKit && (
          <LessonEacDevKitSidebar 
            isOpen={activeRightDrawer === 'eacDevKit'}
            onToggle={() => toggleDrawer('eacDevKit')}
            activeModuleId={currentTopic?.moduleId || 'u1'}
            onSelectSection={onSelectTopic}
            topOffset={tabOffsets.eacDevKit || '76px'}
          />
        )}

        {showIocActivities && (
          <LessonIocActivitiesSidebar 
            isOpen={activeRightDrawer === 'iocActivities'}
            onToggle={() => toggleDrawer('iocActivities')}
            gestionSource={effectiveGestionSource}
            subjectTitle={title}
            themeColor={themeColor}
            onSelectSection={onSelectTopic}
            topOffset={tabOffsets.iocActivities || '132px'}
          />
        )}

        {showGithubSidebar && (
          <LessonGithubCommandsSidebar 
            isOpen={activeRightDrawer === 'github'}
            onToggle={() => toggleDrawer('github')}
            activeSlug={activeSlug}
            topOffset={tabOffsets.github || '188px'}
          />
        )}

        {showIfcdAdminSidebar && (
          <LessonIfcdAdminSidebar 
            isOpen={activeRightDrawer === 'ifcdAdmin'}
            onToggle={() => toggleDrawer('ifcdAdmin')}
            onSelectSection={onSelectTopic}
            topOffset={tabOffsets.ifcdAdmin || '20px'}
          />
        )}

        {showPhpProjects && (
          <LessonPhpProjectsSidebar 
            isOpen={activeRightDrawer === 'phpProjects'}
            onToggle={() => toggleDrawer('phpProjects')}
            onSelectTopic={onSelectTopic}
            topOffset={tabOffsets.phpProjects || '20px'}
          />
        )}
      </Suspense>
    </>
  );
}
