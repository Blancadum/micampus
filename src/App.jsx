import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

const Home = lazy(() => import('./Home.jsx'));
import Header from './components/layout/Header.jsx';
import GlobalToDo from './components/layout/GlobalToDo.jsx';
import Placeholder from './components/layout/Placeholder.jsx';

// Lazy loading para reducir el bundle inicial (~1.4 MB -> chunks bajo demanda)
const TopicViewer = lazy(() => import('./components/viewers/TopicViewer.jsx'));
const LessonViewer = lazy(() => import('./components/viewers/LessonViewer/LessonViewer.jsx'));
const AccentureDashboard = lazy(() => import('./components/dashboards/AccentureDashboard.jsx'));
const AccentureDocumentation = lazy(() => import('./components/dashboards/AccentureDocumentation.jsx'));
const SubjectLanding = lazy(() => import('./components/dashboards/SubjectLanding.jsx'));
const JavaHub = lazy(() => import('./components/dashboards/JavaHub.jsx'));
const JavaProjects = lazy(() => import('./components/dashboards/JavaProjects.jsx'));
const SecondBrain = lazy(() => import('./components/dashboards/SecondBrain.jsx'));
const BrainTopicDetail = lazy(() => import('./components/dashboards/BrainTopicDetail.jsx'));
const DespEac1Teleprompter = lazy(() => import('./components/dashboards/DespEac1Teleprompter.jsx'));
const SpringBootInitializrLanding = lazy(() => import('./components/framework/SpringBootInitializrLanding.jsx'));
const LinkedInSeoAiBlog = lazy(() => import('./components/blog/LinkedInSeoAiBlog.jsx'));

// Configuración declarativa centralizada de materias IOC
import { IOC_SUBJECTS } from './config/iocSubjects.js';

function RouteFallback() {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh', 
        color: 'var(--c-blue, #3b82f6)',
        fontSize: '1rem',
        fontWeight: '500'
      }}
    >
      <span>Cargando módulo... 🚀</span>
    </div>
  );
}

// Despachador universal para resolver rutas dinámicas de lecciones
function DynamicLessonDispatcher() {
  const { subjectCode } = useParams();
  const norm = (subjectCode || '').toLowerCase().trim();

  if (norm === 'springboot' || norm === 'java') {
    return (
      <LessonViewer 
        dataSource="/data/extra/springboot_guia.json" 
        title="Java · SpringBoot" 
        themeColor="#0ea5e9" 
      />
    );
  }

  if (norm === 'accenture' || norm === 'actividades') {
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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <GlobalToDo />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Home />} />

          {/* Dashboards Accenture */}
          <Route path="/accenture" element={<AccentureDashboard />} />
          <Route path="/accenture/documentacion-ia" element={<AccentureDocumentation />} />
          <Route 
            path="/accenture/tutorias/:slug?" 
            element={
              <LessonViewer 
                dataSource="/data/extra/accenture_actividades_curso.json" 
                title="Accenture · Actividades Spring Boot" 
                themeColor="#8b5cf6" 
                initialRightDrawer="tutorias"
                breadcrumbItems={[
                  { label: 'Campus', to: '/' },
                  { label: 'Accenture', to: '/accenture' },
                  { label: 'Plan de Tutorías', isCurrent: true }
                ]}
              />
            } 
          />
          {/* Actividades Prácticas Accenture con la Plantilla Oficial de Lección */}
          {['/accenture/actividades/:slug?', '/java/actividades/:slug?'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={
                <LessonViewer 
                  dataSource="/data/extra/accenture_actividades_curso.json" 
                  title="Accenture · Actividades Spring Boot" 
                  themeColor="#8b5cf6" 
                  breadcrumbItems={[
                    { label: 'Campus', to: '/' },
                    { label: 'Accenture', to: '/accenture' },
                    { label: 'Actividades Spring Boot', isCurrent: true }
                  ]}
                />
              } 
            />
          ))}
          {/* Tutorías en Código: Proyectos Java de Isra */}
          {['/springboot/tutorias-codigo/:slug?', '/accenture/tutorias-codigo/:slug?', '/java/tutorias/:slug?'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={
                <LessonViewer 
                  dataSource="/data/extra/springboot_tutorias_codigo.json" 
                  title="Accenture · Tutorías en Código (Isra)" 
                  themeColor="#10b981" 
                  breadcrumbItems={[
                    { label: 'Campus', to: '/' },
                    { label: 'Accenture', to: '/accenture' },
                    { label: 'Spring Boot', to: '/springboot' },
                    { label: 'Tutorías en Código (Isra)', isCurrent: true }
                  ]}
                />
              } 
            />
          ))}

          {/* PETETE: Versión Integrada Provisional (Teoría + Vídeos + Prácticas L2E) */}
          {['/petete/:slug?', '/accenture/petete/:slug?', '/java/petete/:slug?'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={
                <LessonViewer 
                  dataSource="/data/extra/springboot_petete.json" 
                  title="📖 Petete · Spring Boot Total" 
                  themeColor="#f59e0b" 
                  breadcrumbItems={[
                    { label: 'Campus', to: '/' },
                    { label: 'Accenture', to: '/accenture' },
                    { label: 'Petete (Teoría + Práctica)', isCurrent: true }
                  ]}
                />
              } 
            />
          ))}
          <Route path="/accenture/rest-lab" element={<Placeholder title="REST Lab" />} />
          <Route path="/accenture/ruedas" element={<Placeholder title="Ruedas de Progreso" />} />

          {/* Materia / Núcleo: JAVA */}
          <Route path="/java" element={<JavaHub />} />
          <Route path="/java/proyectos" element={<JavaProjects />} />
          {['/java/springboot', '/springboot', '/accenture/springboot'].map(path => (
            <Route 
              key={path}
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
          ))}
          {/* Spring Boot Initializr: Primeros pasos y FAQ del Framework */}
          {['/springboot/primeros-pasos', '/springboot/initializr', '/java/spring-initializr', '/framework/springboot'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={<SpringBootInitializrLanding />} 
            />
          ))}

          {/* Vídeos Recomendados Accenture: Marco Teórico & Tutorías */}
          {['/accenture/videos/:slug?', '/springboot/videos/:slug?', '/java/springboot/videos/:slug?', '/accenture/videos-teoria/:slug?'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={
                <LessonViewer 
                  dataSource="/data/extra/accenture_videos_teoria.json" 
                  title="Accenture · Vídeos y Marco Teórico" 
                  themeColor="#06b6d4" 
                  breadcrumbItems={[
                    { label: 'Campus', to: '/' },
                    { label: 'Accenture', to: '/accenture' },
                    { label: 'Spring Boot', to: '/springboot' },
                    { label: 'Vídeos Teóricos Recomendados', isCurrent: true }
                  ]}
                />
              } 
            />
          ))}


          {/* Teleprompter & Live Runner EAC 1 Despliegue */}
          {['/ioc/desp/eac1-teleprompter', '/desp/eac1-teleprompter', '/ioc/desp/teleprompter'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={<DespEac1Teleprompter />} 
            />
          ))}

          {/* Materias IOC (Landings + Lecciones) generadas declarativamente */}
          {IOC_SUBJECTS.map(subj => (
            <React.Fragment key={subj.code}>
              {/* Rutas de Gestión / Landing (incluyendo alias con y sin prefijo /ioc/) */}
              {subj.aliases.map(alias => (
                <React.Fragment key={`landing-${alias}`}>
                  <Route 
                    path={`/ioc/${alias}`} 
                    element={<SubjectLanding dataSource={subj.gestion} subjectConfig={subj} />} 
                  />
                  <Route 
                    path={`/${alias}`} 
                    element={<SubjectLanding dataSource={subj.gestion} subjectConfig={subj} />} 
                  />
                </React.Fragment>
              ))}

              {/* Ruta unificada de lecciones (base y con slug) */}
              <Route 
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
              />
              <Route 
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

              {/* Rutas adicionales de compatibilidad si existen */}
              {subj.extraLessonRoutes?.map(extraPath => (
                <Route 
                  key={extraPath}
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
              ))}
            </React.Fragment>
          ))}

          {/* Rutas universales de lecciones y compatibilidad de enlaces */}
          <Route path="/lecciones/:subjectCode" element={<DynamicLessonDispatcher />} />
          <Route path="/lecciones/:subjectCode/:slug" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/:subjectCode/lecciones" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/:subjectCode/lecciones/:slug" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/:subjectCode/lecciones-:prefix" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/:subjectCode/lecciones-:prefix/:slug" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/entornos/:slug?" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/despliegue/:slug?" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/digitalizacion/:slug?" element={<DynamicLessonDispatcher />} />
          <Route path="/ioc/interfaces/:slug?" element={<DynamicLessonDispatcher />} />

          {/* Rutas SEPE */}
          <Route 
            path="/sepe/python/:slug?" 
            element={<TopicViewer dataSource="/data/extra/python_basics.json" defaultSlug="hola-mundo" />} 
          />
          <Route 
            path="/sepe/php" 
            element={<LessonViewer dataSource="/data/extra/php_sql_course.json" title="Campus SEPE: PHP & SQL" themeColor="#eab308" />} 
          />
          {['/sepe/ifcd0177/:slug?', '/sepe/java-poo/:slug?', '/java/ifcd0177/:slug?'].map(path => (
            <Route 
              key={path}
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
                />
              } 
            />
          ))}

          {/* IOC Placeholders & Second Brain */}
          <Route path="/ioc" element={<Placeholder title="Dashboard IOC" />} />
          <Route path="/ioc/pafs" element={<Placeholder title="Proyecto Final IOC" />} />
          <Route path="/brain" element={<SecondBrain />} />
          <Route path="/brain/:topicId" element={<BrainTopicDetail />} />

          {/* Blog & Empleabilidad: SEO en LinkedIn y Filtros ATS de IA */}
          {['/blog/seo-linkedin-filtros-ia', '/ipo2/blog/seo-linkedin-filtros-ia', '/ipo/blog/seo-linkedin-filtros-ia', '/blog/seo-linkedin-ia'].map(path => (
            <Route 
              key={path}
              path={path} 
              element={<LinkedInSeoAiBlog />} 
            />
          ))}

          {/* 404 Catch-All */}
          <Route path="*" element={<Placeholder title="404 - No Encontrado" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
