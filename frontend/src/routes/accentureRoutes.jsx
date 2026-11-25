import React, { lazy } from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';
import Placeholder from '../components/layout/Placeholder.jsx';

function TutoriasRedirect() {
  const params = useParams();
  const slug = params.slug || params.subview;
  return <Navigate to={slug ? `/java/studio/tutorias/${slug}` : '/java/studio/tutorias'} replace />;
}

function AccentureStudioRedirect() {
  const { tab, subview, subid } = useParams();
  const rest = [tab, subview, subid].filter(Boolean).join('/');
  return <Navigate to={rest ? `/java/studio/${rest}` : '/java/studio'} replace />;
}

function StudioRedirect({ tab }) {
  const params = useParams();
  const rest = [params.subview, params.subid, params.slug, params.tab].filter(Boolean).join('/');
  return <Navigate to={rest ? `/java/studio/${tab}/${rest}` : `/java/studio/${tab}`} replace />;
}

const LessonViewer = lazy(() => import('../components/viewers/LessonViewer/LessonViewer.jsx'));
const AccentureDashboard = lazy(() => import('../components/dashboards/acc/AccentureDashboard.jsx'));
const AccentureDocumentation = lazy(() => import('../components/dashboards/acc/AccentureDocumentation.jsx'));
const JavaHub = lazy(() => import('../components/dashboards/java/JavaHub.jsx'));
const JavaProjects = lazy(() => import('../components/dashboards/java/JavaProjects.jsx'));
const JavaStudio = lazy(() => import('../components/dashboards/javaStudio/JavaStudio.jsx'));
const AgileScrumStudio = lazy(() => import('../components/dashboards/acc/AgileScrumStudio.jsx'));
const SpringBootInitializrLanding = lazy(() => import('../components/framework/SpringBootInitializrLanding.jsx'));
const SpringBootProyectoFinalLanding = lazy(() => import('../components/framework/SpringBootProyectoFinalLanding.jsx'));
const SpringBootQuizPage = lazy(() => import('../components/dashboards/quiz/SpringBootQuizPage.jsx'));
const SpringAiDashboard = lazy(() => import('../components/dashboards/ai/SpringAiDashboard.jsx'));

/**
 * Rutas del itinerario Accenture, Java, Spring Boot y Spring AI
 */
export function getAccentureRoutes() {
  return [
    // Dashboards Accenture & Hubs
    <Route key="acc-dash" path="/acc" element={<AccentureDashboard />} />,
    <Route key="acc-dash-legacy" path="/accenture" element={<Navigate to="/acc" replace />} />,
    <Route key="acc-doc" path="/acc/documentacion-ia" element={<AccentureDocumentation />} />,
    <Route key="acc-doc-legacy" path="/accenture/documentacion-ia" element={<Navigate to="/acc/documentacion-ia" replace />} />,

    // Sala de Estudio · Metodologías Ágiles y Marco Scrum (Unificado en Java Studio)
    ...[
      '/acc/sala-estudio/:subview?',
      '/acc/agile/:subview?',
      '/acc/scrum/:subview?',
      '/acc/metodologias-agiles/:subview?',
      '/accenture/sala-estudio/:subview?',
      '/accenture/agile/:subview?',
      '/accenture/scrum/:subview?',
      '/accenture/metodologias-agiles/:subview?',
      '/sala-estudio/:subview?',
      '/agile/:subview?',
      '/scrum/:subview?'
    ].map(path => (
      <Route 
        key={`acc-agile-${path}`} 
        path={path} 
        element={<StudioRedirect tab="agile" />} 
      />
    )),

    // Java & Spring Boot Studio: Ecosistema unificado oficial
    ...[
      '/java/studio/:tab?/:subview?/:subid?',
      '/studio/:tab?/:subview?/:subid?',
      '/java-studio/:tab?/:subview?/:subid?'
    ].map(path => (
      <Route 
        key={`java-studio-${path}`} 
        path={path} 
        element={<JavaStudio />} 
      />
    )),

    // Redirección inmediata desde alias heredados hacia /java/studio
    ...[
      '/acc/studio/:tab?/:subview?/:subid?',
      '/accenture/studio/:tab?/:subview?/:subid?',
      '/acc/java-studio/:tab?/:subview?/:subid?',
      '/accenture/java-studio/:tab?/:subview?/:subid?'
    ].map(path => (
      <Route 
        key={`acc-studio-redirect-${path}`} 
        path={path} 
        element={<AccentureStudioRedirect />} 
      />
    )),

    // Alias directos amigables hacia apartados de Java Studio
    ...['/java/libro/:subview?/:subid?', '/libro/:subview?/:subid?', '/acc/libro/:subview?/:subid?'].map(path => (
      <Route key={`alias-libro-${path}`} path={path} element={<StudioRedirect tab="libro" />} />
    )),
    ...['/java/retos/:subview?/:subid?', '/retos/:subview?/:subid?', '/acc/retos/:subview?/:subid?'].map(path => (
      <Route key={`alias-retos-${path}`} path={path} element={<StudioRedirect tab="retos" />} />
    )),
    ...['/java/cheatsheet/:subview?/:subid?', '/cheatsheet/:subview?/:subid?', '/acc/cheatsheet/:subview?/:subid?'].map(path => (
      <Route key={`alias-cs-${path}`} path={path} element={<StudioRedirect tab="cheatsheet" />} />
    )),

    // Nivel 1: Fundamentos de Java POO & Patrones de Diseño (Unificado en Java Studio > POO)
    ...[
      '/acc/java-poo/:slug?',
      '/acc/poo/:slug?',
      '/acc/ifcd0177/:slug?',
      '/accenture/java-poo/:slug?',
      '/accenture/poo/:slug?',
      '/accenture/ifcd0177/:slug?',
      '/java/poo/:slug?',
      '/java/java-poo/:slug?',
      '/java/fundamentos/:slug?',
      '/java/ifcd0177/:slug?'
    ].map(path => (
      <Route 
        key={`acc-poo-${path}`}
        path={path} 
        element={<StudioRedirect tab="poo" />} 
      />
    )),

    // Tutorías Oficiales y Plan de Tutorías (Unificado en Java Studio > Tutorías)
    ...['/acc/tutorias/:slug?', '/accenture/tutorias/:slug?'].map(path => (
      <Route 
        key={`acc-tut-${path}`}
        path={path} 
        element={<StudioRedirect tab="tutorias" />} 
      />
    )),

    // Actividades Prácticas (1 a 16) - Unificado en Java Studio > Actividades
    ...[
      '/acc/actividades/taskmanager/pasos-previos/:slug?',
      '/acc/actividades/spring/:slug?',
      '/accenture/actividades/taskmanager/pasos-previos/:slug?',
      '/accenture/actividades/spring/:slug?',
      '/java/actividades/taskmanager/pasos-previos/:slug?',
      '/java/actividades/spring/:slug?',
      '/acc/actividades/taskmanager/:slug?',
      '/accenture/actividades/taskmanager/:slug?',
      '/java/actividades/taskmanager/:slug?',
      '/acc/actividades/:slug?',
      '/accenture/actividades/:slug?',
      '/java/actividades/:slug?'
    ].map(path => (
      <Route 
        key={`acc-act-${path}`}
        path={path} 
        element={<StudioRedirect tab="actividades" />} 
      />
    )),

    // Tutorías en Código: Proyectos Java (Unificado en Java Studio > Tutorías)
    ...['/springboot/tutorias-codigo/:slug?', '/acc/tutorias-codigo/:slug?', '/accenture/tutorias-codigo/:slug?', '/java/tutorias/:slug?'].map(path => (
      <Route 
        key={`acc-tut-cod-${path}`}
        path={path} 
        element={<TutoriasRedirect />} 
      />
    )),

    // PETETE: Versión Integrada Provisional (Teoría + Vídeos + Prácticas L2E)
    ...['/petete/:slug?', '/acc/petete/:slug?', '/accenture/petete/:slug?', '/java/petete/:slug?', '/springboot/petete/:slug?'].map(path => (
      <Route 
        key={`petete-${path}`}
        path={path} 
        element={
          <LessonViewer 
            dataSource="/data/extra/springboot_petete.json" 
            title="📖 Petete · Spring Boot Total" 
            themeColor="#f59e0b" 
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: 'Accenture', to: '/acc' },
              { label: 'Petete (Teoría + Práctica)', isCurrent: true }
            ]}
          />
        } 
      />
    )),
    <Route key="acc-lab" path="/acc/rest-lab" element={<Placeholder title="REST Lab" />} />,
    <Route key="acc-lab-legacy" path="/accenture/rest-lab" element={<Navigate to="/acc/rest-lab" replace />} />,
    <Route key="acc-ruedas" path="/acc/ruedas" element={<Placeholder title="Ruedas de Progreso" />} />,
    <Route key="acc-ruedas-legacy" path="/accenture/ruedas" element={<Navigate to="/acc/ruedas" replace />} />,

    // Materia / Núcleo: JAVA (Unificado en Java Studio)
    <Route key="java-hub" path="/java" element={<Navigate to="/java/studio" replace />} />,
    <Route key="java-proy" path="/java/proyectos" element={<Navigate to="/java/studio/proyectos" replace />} />,
    ...['/java/springboot', '/springboot', '/acc/springboot', '/accenture/springboot'].map(path => (
      <Route 
        key={`spring-guia-${path}`}
        path={path} 
        element={
          <LessonViewer 
            dataSource="/data/extra/springboot_guia.json" 
            title="Java · SpringBoot" 
            themeColor="#0ea5e9" 
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: 'Java', to: '/java' },
              { label: 'Spring Boot (Guía Teórica)', isCurrent: true }
            ]}
          />
        } 
      />
    )),

    // Spring Boot Initializr - Taskmanager
    ...['/springboot/primeros-pasos-taskmanager', '/springboot/initializr', '/java/spring-initializr', '/framework/springboot'].map(path => (
      <Route 
        key={`sb-init-tm-${path}`}
        path={path} 
        element={<SpringBootInitializrLanding />} 
      />
    )),

    // Landing Explicativa Oficial del Proyecto Final Entregado (Library API REST - 48 Apartados & Memoria)
    ...[
      '/springboot/libreria/por-capas',
      '/springboot/libreria/comparativa',
      '/springboot/libreria/hexagonal',
      '/springboot/comparativa',
      '/springboot/proyecto-final',
      '/springboot/primeros-pasos',
      '/springboot/primeros-pasos-library',
      '/proyectofinal',
      '/proyecto-final',
      '/acc/proyecto-final',
      '/accenture/proyecto-final',
      '/springboot/library',
      '/library',
      '/springboot/hexagonal',
      '/acc/hexagonal',
      '/accenture/hexagonal',
      '/hexagonal',
      '/springboot/proyecto-hexagonal',
      '/proyecto-entregado'
    ].map(path => (
      <Route 
        key={`sb-init-pf-${path}`}
        path={path} 
        element={<SpringBootProyectoFinalLanding />} 
      />
    )),

    // Arena de Tests, Quizzes y Juegos Interactivos (Unificado en Java Studio > Quiz)
    ...['/quiz', '/springboot/quiz', '/acc/quiz', '/accenture/quiz', '/java/quiz', '/springboot/juegos', '/acc/juegos', '/accenture/juegos', '/juegos', '/tests'].map(path => (
      <Route 
        key={`quiz-${path}`}
        path={path} 
        element={<StudioRedirect tab="quiz" />} 
      />
    )),

    // Inteligencia Artificial: Spring AI & MCP
    ...['/ia', '/ai', '/ia/spring-ai', '/ai/spring-ai', '/ia/mcp'].map(path => (
      <Route 
        key={`ia-${path}`}
        path={path} 
        element={<SpringAiDashboard />} 
      />
    )),

    // Vídeos Recomendados Accenture: Marco Teórico & Tutorías
    ...['/acc/videos/:slug?', '/accenture/videos/:slug?', '/springboot/videos/:slug?', '/java/springboot/videos/:slug?', '/acc/videos-teoria/:slug?', '/accenture/videos-teoria/:slug?'].map(path => (
      <Route 
        key={`acc-vid-${path}`}
        path={path} 
        element={
          <LessonViewer 
            dataSource="/data/extra/accenture_videos_teoria.json" 
            title="Accenture · Vídeos y Marco Teórico" 
            themeColor="#06b6d4" 
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: 'Accenture', to: '/acc' },
              { label: 'Spring Boot', to: '/springboot' },
              { label: 'Vídeos Teóricos Recomendados', isCurrent: true }
            ]}
          />
        } 
      />
    ))
  ];
}
