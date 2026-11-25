import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { DynamicLessonDispatcher } from './iocRoutes';

const TopicViewer = lazy(() => import('../components/viewers/TopicViewer.jsx'));
const LessonViewer = lazy(() => import('../components/viewers/LessonViewer/LessonViewer.jsx'));
const SecondBrain = lazy(() => import('../components/dashboards/brain/SecondBrain.jsx'));
const BrainTopicDetail = lazy(() => import('../components/dashboards/brain/BrainTopicDetail.jsx'));
const BrainPillarDashboard = lazy(() => import('../components/dashboards/brain/BrainPillarDashboard.jsx'));
const LinkedInSeoAiBlog = lazy(() => import('../components/blog/LinkedInSeoAiBlog.jsx'));
const TecnoforLanding = lazy(() => import('../components/dashboards/tecnofor/TecnoforLanding.jsx'));
const SqlMasterDashboard = lazy(() => import('../components/dashboards/sql/SqlMasterDashboard.jsx'));

/**
 * Rutas de cursos SEPE, Second Brain y artículos de Blog
 */
export function getSepeAndMiscRoutes() {
  return [
    // Rutas SEPE
    <Route 
      key="sepe-python"
      path="/sepe/python/:slug?" 
      element={<TopicViewer dataSource="/data/extra/python_basics.json" defaultSlug="hola-mundo" />} 
    />,
    <Route 
      key="sepe-php"
      path="/sepe/php" 
      element={
        <LessonViewer 
          dataSource="/data/extra/php_sql_course.json" 
          title="Campus SEPE: PHP & SQL" 
          themeColor="#eab308" 
          externalLink={{
            label: '🧪 LabEx: Free MySQL Labs',
            href: 'https://labex.io/free-labs/mysql',
            title: 'Laboratorios interactivos gratuitos en la nube para estudiar BBDD y MySQL (LabEx)'
          }}
        />
      } 
    />,
    ...['/sepe/ifcd0177/:slug?', '/sepe/java-poo/:slug?', '/java/ifcd0177/:slug?'].map(path => (
      <Route 
        key={`sepe-ifcd-${path}`}
        path={path} 
        element={
          <LessonViewer 
            dataSource="/data/extra/ifcd0177_curso.json" 
            title="SEPE · IFCD0177 Desarrollo OO con Java" 
            themeColor="#ea580c" 
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: 'SEPE', to: '/sepe/php' },
              { label: 'IFCD0177 Java POO', isCurrent: true }
            ]}
            externalLink={{
              label: '🌐 Campus Virtual Enclave',
              href: 'https://campusvirtual.enclaveformacion.com/login/index.php#section-2',
              title: 'Acceso directo al Campus Virtual oficial de Enclave Formación (SEPE)'
            }}
          />
        } 
      />
    )),

    // SQL & Bases de Datos Relacionales (Compendio Completo + Masterclass)
    <Route key="sql-master" path="/sql" element={<SqlMasterDashboard />} />,
    <Route key="sql-master-section" path="/sql/:sectionId" element={<SqlMasterDashboard />} />,

    // Second Brain
    <Route key="brain-home" path="/brain" element={<SecondBrain />} />,
    <Route key="brain-pillar" path="/brain/pilar/:pillarId" element={<BrainPillarDashboard />} />,
    <Route key="brain-pillar-lessons" path="/brain/pilar/:pillarId/lecciones" element={<DynamicLessonDispatcher />} />,
    <Route key="brain-topic" path="/brain/:topicId" element={<BrainTopicDetail />} />,

    // Blog & Empleabilidad: SEO en LinkedIn y Filtros ATS de IA
    ...['/blog/seo-linkedin-filtros-ia', '/ipo2/blog/seo-linkedin-filtros-ia', '/ipo/blog/seo-linkedin-filtros-ia', '/blog/seo-linkedin-ia'].map(path => (
      <Route 
        key={`blog-${path}`}
        path={path} 
        element={<LinkedInSeoAiBlog />} 
      />
    )),

    // TecnoFor: Itinerario Agentic Software Developer (Python, Java, Angular, SDD)
    ...['/tecnofor', '/agentic-developer', '/tecnofor/agentic', '/tecnofor-agentic'].map(path => (
      <Route
        key={`tecnofor-${path}`}
        path={path}
        element={<TecnoforLanding />}
      />
    ))
  ];
}
