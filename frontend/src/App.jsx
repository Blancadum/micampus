import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const Home = lazy(() => import('./Home.jsx'));
const ScriptsCenterPage = lazy(() => import('./pages/ScriptsCenterPage.jsx'));
const CalendarRadarPage = lazy(() => import('./pages/CalendarRadarPage.jsx'));
const DynamicSubjectPage = lazy(() => import('./pages/DynamicSubjectPage.jsx'));
const SettingsPage = lazy(() => import('./pages/SettingsPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
import Header from './components/layout/Header.jsx';
import GlobalToDo from './components/layout/GlobalToDo.jsx';
import Placeholder from './components/layout/Placeholder.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import { clearUserSessionCaches } from './utils/campusCache.js';

import { getAccentureRoutes } from './routes/accentureRoutes.jsx';
import { getIocRoutes } from './routes/iocRoutes.jsx';
import { getSepeAndMiscRoutes } from './routes/sepeAndMiscRoutes.jsx';

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

function AppContent() {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    loading: true,
    authRequired: false,
    authenticated: false,
    hasUsers: false,
    user: null
  });

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setAuthState({
          loading: false,
          authRequired: Boolean(data.authRequired),
          authenticated: Boolean(data.authenticated),
          hasUsers: Boolean(data.hasUsers),
          user: data.user || null
        });
        return;
      }
    } catch {
      // Fallback en caso de error de red
    }
    setAuthState((prev) => ({ ...prev, loading: false }));
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Rutas de grabación limpias donde NO debe verse ningún header de campus ni buscador
  const isRecordingBackdrop = [
    '/ioc/desp/fondo-grabacion',
    '/desp/fondo-grabacion',
    '/ioc/desp/pantalla-grabacion',
    '/ioc/desp/recording-backdrop',
    '/ioc/desp/stage-grabacion',
    '/desp/stage-grabacion',
    '/ioc/desp/stage-rol',
    '/desp/stage-rol'
  ].includes(location.pathname);

  if (authState.loading) {
    return <RouteFallback />;
  }

  if (authState.authRequired && !authState.authenticated) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <LoginPage
          hasUsers={authState.hasUsers}
          onSuccess={async () => {
            clearUserSessionCaches();
            await checkAuth();
          }}
        />
      </Suspense>
    );
  }

  return (
    <>
      {!isRecordingBackdrop && <Header authState={authState} onRefreshAuth={checkAuth} />}
      {!isRecordingBackdrop && <GlobalToDo />}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage hasUsers={authState.hasUsers} allowBack={!authState.authRequired || authState.authenticated} onSuccess={() => { clearUserSessionCaches(); checkAuth(); window.location.href = '/'; }} />} />

          {/* Scripts Java, Radar de Entregas, Configuración y Asignaturas Dinámicas */}
          <Route path="/scripts" element={<ScriptsCenterPage />} />
          <Route path="/radar" element={<CalendarRadarPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />
          <Route path="/asignatura/:id" element={<DynamicSubjectPage />} />
          <Route path="/ioc/despliegue" element={<DynamicSubjectPage />} />
          <Route path="/ioc/entornos" element={<DynamicSubjectPage />} />
          <Route path="/ioc/digitalizacion" element={<DynamicSubjectPage />} />
          <Route path="/ioc/interfaces" element={<DynamicSubjectPage />} />
          <Route path="/ioc/ipo2" element={<DynamicSubjectPage />} />

          {/* === RECUERDOS (Campus antiguo — pendiente de migrar y eliminar; ver src/recuerdos/recuerdosManifest.js) === */}
          {getAccentureRoutes()}
          {getIocRoutes()}
          {getSepeAndMiscRoutes()}

          {/* Rutas semánticas dinámicas para cualquier grupo/asignatura */}
          <Route path="/:groupSlug/:subjectSlug" element={<DynamicSubjectPage />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<Placeholder title="404 - No Encontrado" />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
