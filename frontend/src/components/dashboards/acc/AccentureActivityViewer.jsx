import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import hljs from '../../../utils/highlight';
import ActivityViewerNav from './activity/ActivityViewerNav';
import ActivityViewerHeader from './activity/ActivityViewerHeader';
import ActivityViewerBody from './activity/ActivityViewerBody';
import StudioItemListMenu from '../javaStudio/StudioItemListMenu.jsx';

/**
 * ============================================================================
 * @component   AccentureActivityViewer
 * @description Visor de actividades prácticas de Accenture con navegación
 *              entre ejercicios, cambio de estado (pendiente/en curso/entregada),
 *              enunciado oficial y solución técnica documentada paso a paso.
 * ============================================================================
 */
export default function AccentureActivityViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('enunciado'); // 'enunciado' | 'solucion'
  const [enunciadoMarkdown, setEnunciadoMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [activityStatus, setActivityStatus] = usePersistentState('accenture_activities_status', {}, {
    category: 'accenture'
  });

  // Cargar lista de actividades
  useEffect(() => {
    setLoading(true);
    fetch('/data/extra/accenture_actividades.json')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        const found = data.find(item => item.slug === slug) || data[0];
        setCurrentActivity(found);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  // Cargar el markdown del enunciado cuando cambie la actividad
  useEffect(() => {
    if (!currentActivity) return;

    if (currentActivity.enunciadoFile) {
      fetch(currentActivity.enunciadoFile)
        .then(res => {
          if (!res.ok) throw new Error('No se pudo cargar el enunciado');
          return res.text();
        })
        .then(text => setEnunciadoMarkdown(text))
        .catch(() => setEnunciadoMarkdown(`### ${currentActivity.title}\n\n${currentActivity.resumen}`));
    } else {
      setEnunciadoMarkdown(`### ${currentActivity.title}\n\n${currentActivity.resumen}`);
    }
  }, [currentActivity]);

  // Aplicar highlight.js a los bloques de código
  useEffect(() => {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }, [enunciadoMarkdown, activeTab, currentActivity]);

  const updateStatus = useCallback((newStatus) => {
    if (!currentActivity) return;
    setActivityStatus(prev => ({
      ...prev,
      [currentActivity.id]: newStatus
    }));
  }, [currentActivity, setActivityStatus]);

  if (loading || !currentActivity) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <h2>Cargando actividad... 🚀</h2>
      </div>
    );
  }

  const currentStatus = activityStatus[currentActivity.id] || (currentActivity.status === 'proximamente' ? 'Próximamente' : 'Pendiente');
  const currentIndex = activities.findIndex(a => a.id === currentActivity.id);
  const prevActivity = currentIndex > 0 ? activities[currentIndex - 1] : null;
  const nextActivity = currentIndex < activities.length - 1 ? activities[currentIndex + 1] : null;

  return (
    <div className="app-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
      {/* 1. Navegación superior y migas de pan */}
      <ActivityViewerNav
        currentNumber={currentActivity.numero}
        prevActivity={prevActivity}
        nextActivity={nextActivity}
        onNavigate={(targetSlug) => navigate(`/accenture/actividades/${targetSlug}`)}
      />

      {/* 2. Layout dual con menú lateral de actividades ACC */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(270px, 320px) 1fr', gap: '1.5rem', alignItems: 'start', marginTop: '1rem' }}>
        <StudioItemListMenu
          title="Actividades ACC"
          icon="📦"
          items={activities.map(a => ({
            id: a.slug,
            indexLabel: a.numero < 10 ? `0${a.numero}` : a.numero,
            title: a.title,
            subtitle: a.category || a.proyecto,
            badge: activityStatus[a.id] === 'Entregada' ? '✓' : null
          }))}
          selectedId={currentActivity.slug}
          onSelect={(slug) => navigate(`/accenture/actividades/${slug}`)}
          searchable={true}
          searchPlaceholder="Filtrar retos..."
          accentColor="#a855f7"
          bgActive="rgba(168, 85, 247, 0.08)"
          badgeText={`${currentIndex + 1} de ${activities.length}`}
        />

        <div style={{ minWidth: 0 }}>
          {/* Cabecera con título, tags, selector de estado y tabs de modo */}
          <ActivityViewerHeader
            currentActivity={currentActivity}
            totalActivities={activities.length}
            currentStatus={currentStatus}
            onStatusChange={updateStatus}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Cuerpo del contenido (Enunciado o Solución guiada) */}
          <ActivityViewerBody
            activeTab={activeTab}
            enunciadoMarkdown={enunciadoMarkdown}
            solucionDoc={currentActivity.solucionDoc}
          />
        </div>
      </div>
    </div>
  );
}
