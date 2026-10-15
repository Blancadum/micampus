import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseContent from './useCourseContent';
import BreadcrumbNav from './navigation/BreadcrumbNav';
import LessonSidebar from './navigation/LessonSidebar';
import LessonContent from './LessonContent';
import LessonRightSidebar from './sidebars/LessonRightSidebar';
import LessonNotebookSidebar from './sidebars/LessonNotebookSidebar';
import LessonEacDevKitSidebar from './sidebars/LessonEacDevKitSidebar';
import LessonIocActivitiesSidebar from './sidebars/LessonIocActivitiesSidebar';
import LessonGithubCommandsSidebar from './sidebars/LessonGithubCommandsSidebar';
import LessonAccentureVideosSidebar from './sidebars/LessonAccentureVideosSidebar';
import LessonIfcdAdminSidebar from './sidebars/LessonIfcdAdminSidebar';

export default function LessonViewer({ 
  dataSource, 
  gestionSource,
  subjectCode,
  title, 
  themeColor = 'var(--accent-blue)',
  breadcrumbItems,
  singleTopicView = false, // Scroll infinito continuo por defecto para un estudio fluido y sin interrupciones
  initialRightDrawer = null
}) {
  const navigate = useNavigate();
  const isPetete = typeof dataSource === 'string' && dataSource.includes('petete');
  const isTheorySpringBoot = typeof dataSource === 'string' && (dataSource.includes('springboot_guia') || isPetete);
  const isActivitiesSpringBoot = typeof dataSource === 'string' && (dataSource.includes('actividades') || dataSource.includes('accenture_actividades'));
  const isVideosSpringBoot = typeof dataSource === 'string' && (dataSource.includes('accenture_videos') || dataSource.includes('videos_accenture'));
  const isTutoriasCodigo = typeof dataSource === 'string' && dataSource.includes('tutorias_codigo');
  const isIfcd0177 = (typeof dataSource === 'string' && dataSource.includes('ifcd0177')) || subjectCode === 'ifcd0177';
  const isEntornos = (subjectCode === 'ent' || (typeof dataSource === 'string' && !dataSource.includes('accenture') && (dataSource.includes('entornos') || dataSource.includes('/ent.') || dataSource.includes('/ent/'))));
  
  // Detección automática o explícita del archivo de gestión para materias de IOC
  const inferGestionSource = () => {
    if (gestionSource) return gestionSource;
    if (typeof dataSource === 'string') {
      if (dataSource.includes('accenture') || dataSource.includes('springboot') || isPetete) return null;
      if (dataSource.includes('entornos') || dataSource.includes('/ent/') || dataSource.includes('/ent.')) return '/data/ioc/gestion/ent.json';
      if (dataSource.includes('despliegue') || dataSource.includes('/desp/') || dataSource.includes('/desp.')) return '/data/ioc/gestion/desp.json';
      if (dataSource.includes('digitalizacion') || dataSource.includes('/digi/') || dataSource.includes('/digi.')) return '/data/ioc/gestion/digi.json';
      if (dataSource.includes('interfaces') || dataSource.includes('/int/') || dataSource.includes('/int.')) return '/data/ioc/gestion/int.json';
      if (dataSource.includes('ipo2') || dataSource.includes('/ipo2/') || dataSource.includes('/ipo2.')) return '/data/ioc/gestion/ipo2.json';
    }
    return null;
  };
  const effectiveGestionSource = inferGestionSource();

  // Vista unitaria solo si se especifica explícitamente por prop
  const isSingleView = singleTopicView;

  const { 
    topics, 
    loading, 
    error, 
    activeSlug, 
    setActiveSlug, 
    activeSubSlug, 
    setActiveSubSlug, 
    scrollToSection 
  } = useCourseContent(dataSource, isSingleView);
  
  const currentTopic = topics?.find(t => t.slug === activeSlug);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isPetete ? true : window.innerWidth > 768);
  
  // Estado para coordinar los paneles laterales derechos (teoría, tutorías, vídeos, cuaderno, devkit EAC, actividades IOC o comandos GitHub)
  const [activeRightDrawer, setActiveRightDrawer] = useState(initialRightDrawer); // 'theory' | 'tutorias' | 'videos' | 'notebook' | 'eacDevKit' | 'iocActivities' | 'github' | null

  const showRightSidebar = (isTheorySpringBoot || isActivitiesSpringBoot || isVideosSpringBoot || isTutoriasCodigo) && !isMobile;
  const showTutoriasSidebar = (isTheorySpringBoot || isActivitiesSpringBoot || isTutoriasCodigo) && !isMobile;
  const showVideosSidebar = (isTheorySpringBoot || isActivitiesSpringBoot || isVideosSpringBoot || isTutoriasCodigo) && !isMobile;
  const showNotebookSidebar = (isActivitiesSpringBoot || Boolean(currentTopic?.notebook)) && !isMobile;
  const showEacDevKit = isEntornos && !isMobile;
  const showIocActivities = Boolean(effectiveGestionSource) && !isMobile;
  const showGithubSidebar = (isActivitiesSpringBoot || isTheorySpringBoot || isVideosSpringBoot || isTutoriasCodigo || isEntornos || Boolean(effectiveGestionSource)) && !isMobile;
  const showIfcdAdminSidebar = isIfcd0177 && !isMobile;

  // Coordinación dinámica de offsets verticales para pestañas laterales derechas
  // Altura pestaña (46px) + separación (10px) = 56px de paso entre pestañas sucesivas
  let nextTopOffset = 20;
  const TAB_STEP = 56;

  let ifcdAdminTop = '20px';
  if (showIfcdAdminSidebar) {
    ifcdAdminTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let rightSidebarTop = '20px';
  if (showRightSidebar) {
    rightSidebarTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let tutoriasSidebarTop = '76px';
  if (showTutoriasSidebar) {
    tutoriasSidebarTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let videosSidebarTop = '76px';
  if (showVideosSidebar) {
    videosSidebarTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let eacDevKitTop = '76px';
  if (showEacDevKit) {
    eacDevKitTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let notebookSidebarTop = '132px';
  if (showNotebookSidebar) {
    notebookSidebarTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let iocActivitiesTop = '132px';
  if (showIocActivities) {
    iocActivitiesTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  let githubSidebarTop = '188px';
  if (showGithubSidebar) {
    githubSidebarTop = `${nextTopOffset}px`;
    nextTopOffset += TAB_STEP;
  }

  const handleSelectTopic = (slug) => {
    setActiveSlug(slug);
    if (isSingleView) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      const currentPath = window.location.pathname;
      if (isActivitiesSpringBoot) {
        navigate(`/accenture/actividades/${slug}`);
      } else if (isVideosSpringBoot) {
        navigate(`/accenture/videos/${slug}`);
      } else {
        const matchingTopic = topics.find(t => currentPath.endsWith(`/${t.slug}`));
        if (matchingTopic) {
          const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
          navigate(`${basePath}/${slug}`);
        } else {
          const cleanBase = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
          navigate(`${cleanBase}/${slug}`);
        }
      }
    } else {
      // Salto instantáneo sin efecto rodante / animación de scroll
      scrollToSection(slug);

      // Sincronizar URL de forma limpia en el historial del navegador sin concatenaciones
      const currentPath = window.location.pathname;
      let cleanBasePath = currentPath;
      const iocMatch = currentPath.match(/^(\/ioc\/[^\/]+\/[^\/]+)/);
      if (iocMatch) {
        cleanBasePath = iocMatch[1];
      } else {
        const parts = currentPath.split('/').filter(Boolean);
        if (topics.some(t => t.slug === parts[parts.length - 1] || t.id === parts[parts.length - 1])) {
          cleanBasePath = '/' + parts.slice(0, parts.length - 1).join('/');
        } else {
          cleanBasePath = '/' + parts.join('/');
        }
      }
      cleanBasePath = cleanBasePath.replace(/\/+$/, '');
      window.history.replaceState(null, '', `${cleanBasePath}/${slug}`);
    }

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Control responsive del sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && !isPetete) {
        setIsSidebarOpen(false);
      } else if (!mobile) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPetete]);

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Cargando contenido... 🚀</h2>
      </div>
    );
  }

  if (error || topics.length === 0) {
    return (
      <div className="app-container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Oops! 💥</h2>
        <p>{error || 'No hay contenido disponible.'}</p>
        <button onClick={() => navigate('/')} className="theme-btn" style={{ marginTop: '1rem' }}>Volver a Home</button>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbNav title={title} items={breadcrumbItems} />
      
      <div 
        className="mini-campus-layout" 
        style={{ 
          display: 'flex', 
          width: '100%',
          minHeight: 'calc(100vh - 126px)', 
          position: 'relative',
          overflowX: 'clip' 
        }}
      >
        <LessonSidebar 
          topics={topics}
          activeSlug={activeSlug}
          activeSubSlug={activeSubSlug}
          scrollToSection={scrollToSection}
          onSelectTopic={handleSelectTopic}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
          title={title}
          themeColor={themeColor}
          isPetete={isPetete}
        />
        
        <LessonContent 
          topics={topics} 
          activeSlug={activeSlug}
          activeSubSlug={activeSubSlug}
          onSelectTopic={handleSelectTopic}
          onSelectSubSection={setActiveSubSlug}
          themeColor={themeColor} 
          title={title}
          singleTopicView={isSingleView}
          isAccentureActivities={isActivitiesSpringBoot}
        />

        {showRightSidebar && (
          <LessonRightSidebar 
            mode={isActivitiesSpringBoot ? 'theory' : 'activities'} 
            isOpen={activeRightDrawer === 'theory'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'theory' ? null : 'theory')}
            topOffset={rightSidebarTop}
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
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'tutorias' ? null : 'tutorias')}
            topOffset={tutoriasSidebarTop}
          />
        )}

        {showVideosSidebar && (
          <LessonAccentureVideosSidebar 
            isOpen={activeRightDrawer === 'videos'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'videos' ? null : 'videos')}
            activeSlug={activeSlug}
            onSelectSection={handleSelectTopic}
            topOffset={videosSidebarTop}
          />
        )}

        {showNotebookSidebar && (
          <LessonNotebookSidebar 
            isOpen={activeRightDrawer === 'notebook'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'notebook' ? null : 'notebook')}
            activeSlug={activeSlug}
            activityTitle={currentTopic ? currentTopic.title : ''}
            notebookData={currentTopic ? currentTopic.notebook : null}
            topOffset={notebookSidebarTop}
          />
        )}

        {showEacDevKit && (
          <LessonEacDevKitSidebar 
            isOpen={activeRightDrawer === 'eacDevKit'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'eacDevKit' ? null : 'eacDevKit')}
            activeModuleId={currentTopic?.moduleId || 'u1'}
            onSelectSection={handleSelectTopic}
            topOffset={eacDevKitTop}
          />
        )}

        {showIocActivities && (
          <LessonIocActivitiesSidebar 
            isOpen={activeRightDrawer === 'iocActivities'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'iocActivities' ? null : 'iocActivities')}
            gestionSource={effectiveGestionSource}
            subjectTitle={title}
            themeColor={themeColor}
            onSelectSection={handleSelectTopic}
            topOffset={iocActivitiesTop}
          />
        )}

        {showGithubSidebar && (
          <LessonGithubCommandsSidebar 
            isOpen={activeRightDrawer === 'github'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'github' ? null : 'github')}
            activeSlug={activeSlug}
            topOffset={githubSidebarTop}
          />
        )}

        {showIfcdAdminSidebar && (
          <LessonIfcdAdminSidebar 
            isOpen={activeRightDrawer === 'ifcdAdmin'}
            onToggle={() => setActiveRightDrawer(activeRightDrawer === 'ifcdAdmin' ? null : 'ifcdAdmin')}
            onSelectSection={handleSelectTopic}
            topOffset={ifcdAdminTop}
          />
        )}
      </div>
    </>
  );
}
