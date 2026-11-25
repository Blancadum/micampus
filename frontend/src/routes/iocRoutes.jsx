import React, { lazy } from 'react';
import { Route, useParams } from 'react-router-dom';
import Placeholder from '../components/layout/Placeholder.jsx';
import { IOC_SUBJECTS } from '../config/iocSubjects.js';
import { getBrainPillarById } from '../config/brainPillarsData.js';

const LessonViewer = lazy(() => import('../components/viewers/LessonViewer/LessonViewer.jsx'));
const SubjectLanding = lazy(() => import('../components/dashboards/subject/SubjectLanding.jsx'));
const DespEac2Workbench = lazy(() => import('../components/dashboards/eac2/DespEac2Workbench.jsx'));
const DespEac3Workbench = lazy(() => import('../components/dashboards/eac2/DespEac3Workbench.jsx'));
const EntEac2Workbench = lazy(() => import('../components/dashboards/eac2/EntEac2Workbench.jsx'));
const EntEac3Workbench = lazy(() => import('../components/dashboards/eac2/EntEac3Workbench.jsx'));
const ObsVideosWorkbench = lazy(() => import('../components/dashboards/eac2/ObsVideosWorkbench.jsx'));

// Despachador universal para resolver rutas dinámicas de lecciones
export function DynamicLessonDispatcher() {
  const { subjectCode, pillarId } = useParams();
  const norm = (pillarId || subjectCode || '').toLowerCase().trim();

  // Comprobar si es uno de los 7 Pilares de Second Brain
  const pillar = getBrainPillarById(norm.replace('pilar-', ''));
  if (pillar) {
    return (
      <LessonViewer 
        dataSource={`/data/brain/lecciones/pilar-${pillar.id}.json`} 
        title={`Pilar ${pillar.num} · ${pillar.shortTitle}`} 
        themeColor={pillar.color} 
        breadcrumbItems={[
          { label: 'Campus', to: '/' },
          { label: 'Second Brain', to: '/brain' },
          { label: `Pilar ${pillar.num}`, to: `/brain/pilar/${pillar.id}` }
        ]}
      />
    );
  }

  if (norm === 'springboot' || norm === 'java') {
    return (
      <LessonViewer 
        dataSource="/data/extra/springboot_guia.json" 
        title="Java · SpringBoot" 
        themeColor="#0ea5e9" 
      />
    );
  }

  if (norm === 'acc' || norm === 'accenture' || norm === 'actividades') {
    return (
      <LessonViewer 
        dataSource="/data/extra/accenture_actividades_curso.json" 
        title="Accenture · Actividades Spring Boot" 
        themeColor="#8b5cf6" 
      />
    );
  }

  const subj = IOC_SUBJECTS.find(s => 
    s.code === norm || 
    s.aliases.includes(norm) ||
    s.lessonPrefix === norm ||
    s.title.toLowerCase().includes(norm)
  ) || IOC_SUBJECTS[0];

  return (
    <LessonViewer 
      dataSource={subj.lecciones} 
      gestionSource={subj.gestion}
      subjectCode={subj.code}
      title={subj.title} 
      themeColor={subj.color} 
      breadcrumbItems={[
        { label: 'Campus', to: '/' },
        { label: subj.title, to: `/ioc/${subj.code}` },
        { label: 'Libro Digital', isCurrent: true }
      ]}
    />
  );
}

/**
 * Rutas de materias oficiales de la IOC y despachador dinámico
 */
export function getIocRoutes() {
  const routes = [
    // Guía Paso a Paso / Workbench EAC 2 Desplegament (DAW_0614_EAC2_Enunciat_2627S1)
    ...[
      '/ioc/desp/eac2',
      '/desp/eac2',
      '/ioc/desp/eac2-workbench',
      '/desp/eac2-workbench',
      '/ioc/desp/eac2-teleprompter',
      '/desp/eac2-teleprompter',
      '/ioc/desp/teleprompter'
    ].map(path => (
      <Route 
        key={`workbench-${path}`}
        path={path} 
        element={<DespEac2Workbench />} 
      />
    )),

    // Guía Paso a Paso / Workbench EAC 3 Desplegament (DAW_0614_EAC3_Enunciat_2627S1)
    ...[
      '/ioc/desp/eac3',
      '/desp/eac3',
      '/ioc/desp/eac3-workbench',
      '/desp/eac3-workbench'
    ].map(path => (
      <Route 
        key={`workbench3-${path}`}
        path={path} 
        element={<DespEac3Workbench />} 
      />
    )),

    // Workbench EAC 2 Entorns: Mode Tasques & Checklist (Opció 1) i Mode Memòria Oficial (Opció 2)
    ...['/ioc/ent/eac2', '/ent/eac2', '/ioc/ent/eac2-workbench', '/ent/eac2-workbench'].map(path => (
      <Route 
        key={`ent-workbench-${path}`}
        path={path} 
        element={<EntEac2Workbench />} 
      />
    )),

    // Workbench EAC 3 Entorns (DA2_M0487_EAC3_Enunciat_2627S1)
    ...['/ioc/ent/eac3', '/ent/eac3', '/ioc/ent/eac3-workbench', '/ent/eac3-workbench'].map(path => (
      <Route 
        key={`ent3-workbench-${path}`}
        path={path} 
        element={<EntEac3Workbench />} 
      />
    )),

    // Centro de Grabación OBS Studio (Interfícies EAC2 + Desplegament EAC3)
    ...['/videos-obs', '/ioc/videos-obs'].map(path => (
      <Route 
        key={`obs-videos-${path}`}
        path={path} 
        element={<ObsVideosWorkbench />} 
      />
    ))
  ];

  // Materias IOC (Landings + Lecciones) generadas declarativamente
  IOC_SUBJECTS.forEach(subj => {
    // Rutas de Gestión / Landing (incluyendo alias)
    subj.aliases.forEach(alias => {
      routes.push(
        <Route 
          key={`ioc-landing-${alias}`}
          path={`/ioc/${alias}`} 
          element={<SubjectLanding dataSource={subj.gestion} subjectConfig={subj} />} 
        />,
        <Route 
          key={`landing-${alias}`}
          path={`/${alias}`} 
          element={<SubjectLanding dataSource={subj.gestion} subjectConfig={subj} />} 
        />
      );
    });

    // Rutas unificadas de lecciones (base y con slug)
    routes.push(
      <Route 
        key={`ioc-lesson-base-${subj.code}`}
        path={`/ioc/${subj.code}/${subj.lessonPrefix}`} 
        element={
          <LessonViewer 
            dataSource={subj.lecciones} 
            gestionSource={subj.gestion}
            subjectCode={subj.code}
            title={subj.title} 
            themeColor={subj.color} 
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: subj.title, to: `/ioc/${subj.code}` },
              { label: 'Libro Digital', isCurrent: true }
            ]}
          />
        } 
      />,
      <Route 
        key={`ioc-lesson-slug-${subj.code}`}
        path={`/ioc/${subj.code}/${subj.lessonPrefix}/:slug`} 
        element={
          <LessonViewer 
            dataSource={subj.lecciones} 
            gestionSource={subj.gestion}
            subjectCode={subj.code}
            title={subj.title} 
            themeColor={subj.color} 
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: subj.title, to: `/ioc/${subj.code}` },
              { label: 'Libro Digital', isCurrent: true }
            ]}
          />
        } 
      />
    );

    // Rutas adicionales de compatibilidad
    subj.extraLessonRoutes?.forEach(extraPath => {
      routes.push(
        <Route 
          key={`ioc-extra-${extraPath}`}
          path={extraPath} 
          element={
            <LessonViewer 
              dataSource={subj.lecciones} 
              gestionSource={subj.gestion}
              subjectCode={subj.code}
              title={subj.title} 
              themeColor={subj.color} 
              breadcrumbItems={[
                { label: 'Campus', to: '/' },
                { label: subj.title, to: `/ioc/${subj.code}` },
                { label: 'Libro Digital', isCurrent: true }
              ]}
            />
          } 
        />
      );
    });
  });

  // Rutas universales de compatibilidad de lecciones
  routes.push(
    <Route key="lec-sub" path="/lecciones/:subjectCode" element={<DynamicLessonDispatcher />} />,
    <Route key="lec-sub-slug" path="/lecciones/:subjectCode/:slug" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-sub-lec" path="/ioc/:subjectCode/lecciones" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-sub-lec-slug" path="/ioc/:subjectCode/lecciones/:slug" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-sub-pre" path="/ioc/:subjectCode/lecciones-:prefix" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-sub-pre-slug" path="/ioc/:subjectCode/lecciones-:prefix/:slug" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-ent-alias" path="/ioc/entornos/:slug?" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-desp-alias" path="/ioc/despliegue/:slug?" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-digi-alias" path="/ioc/digitalizacion/:slug?" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-int-alias" path="/ioc/interfaces/:slug?" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-dash" path="/ioc" element={<Placeholder title="Dashboard IOC" />} />,
    <Route key="ioc-pafs" path="/ioc/pafs" element={<Placeholder title="Proyecto Final IOC" />} />
  );

  return routes;
}
