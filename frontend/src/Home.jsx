import React, { useState, useEffect, useMemo } from 'react';
import HomeHeroBanner from './components/home/HomeHeroBanner.jsx';
import CustomSubjectsSection from './components/home/CustomSubjectsSection.jsx';
import { getCampusData } from './utils/campusCache.js';

// Caché en memoria para transiciones instantáneas entre páginas (0 ms y 0 peticiones de red repetidas)
let memoryTasksCache = null;

const formatTaskDate = (d) => {
  if (!d) return '--';
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${day} ${months[d.getMonth()]}`;
};

/**
 * Home
 * Vista principal de la plataforma Campus Global.
 * Orquesta de forma declarativa el Hero Banner con estadísticas clave,
 * el banner destacado del Blog y la cuadrícula de los 6 pilares formativos.
 */
export default function Home() {
  const [userName, setUserName] = useState(() => localStorage.getItem('micampus_user_name') || 'Estudiante');
  const [campusSubtitle, setCampusSubtitle] = useState('');
  const [campusTitle, setCampusTitle] = useState('MiCampus');
  const [quickLinks, setQuickLinks] = useState([]);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [aiConfig, setAiConfig] = useState({ aiProvider: 'none', geminiApiKey: '', openaiApiKey: '', ollamaUrl: 'http://localhost:11434', ollamaModel: 'llama3.2' });

  // Caché instantánea de tareas (0 ms de espera en navegación interna)
  const [tasks, setTasks] = useState(() => {
    if (memoryTasksCache && memoryTasksCache.length > 0) {
      return memoryTasksCache;
    }
    try {
      const cached = sessionStorage.getItem('micampus_dynamic_tasks_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryTasksCache = parsed;
          return parsed;
        }
      }
    } catch {
      // Ignorar fallo de almacenamiento
    }
    return [];
  });

  const loadHomeData = React.useCallback(async () => {
    try {
      const [campusData, legacyTasksRes] = await Promise.all([
        getCampusData(),
        fetch('/data/tasks.json').catch(() => null)
      ]);

      let dynamicTasks = [];
      if (campusData) {

        if (campusData?.config) {
          if (campusData.config.userName) {
            setUserName(campusData.config.userName);
            try { localStorage.setItem('micampus_user_name', campusData.config.userName); } catch {}
          }
          if (campusData.config.campusTitle) setCampusTitle(campusData.config.campusTitle);
          if (campusData.config.subtitle) setCampusSubtitle(campusData.config.subtitle);
          if (Array.isArray(campusData.config.quickLinks)) setQuickLinks(campusData.config.quickLinks);
          setAiConfig({
            aiProvider: campusData.config.aiProvider || 'none',
            geminiApiKey: campusData.config.geminiApiKey || '',
            openaiApiKey: campusData.config.openaiApiKey || '',
            ollamaUrl: campusData.config.ollamaUrl || 'http://localhost:11434',
            ollamaModel: campusData.config.ollamaModel || 'llama3.2'
          });
        }

        const subjectById = new Map((campusData.subjects || []).map((s) => [s.id, s]));
        setSubjectsCount((campusData.subjects || []).length);
        dynamicTasks = (campusData.tasks || [])
          .filter((t) => t.dueDate && /^\d{4}-\d{2}-\d{2}/.test(t.dueDate))
          .map((t) => {
            const sub = subjectById.get(t.subjectId);
            return {
              id: `campus-${t.id}`,
              course: (sub?.code || sub?.shortTitle || sub?.title || 'ASIG').toUpperCase().slice(0, 8),
              task: t.title,
              date: t.dueDate,
              done: t.status === 'done'
            };
          });
      }

      let legacyTasks = [];
      if (legacyTasksRes && legacyTasksRes.ok) {
        const parsedLegacy = await legacyTasksRes.json();
        if (Array.isArray(parsedLegacy)) {
          legacyTasks = parsedLegacy;
        }
      }

      const seenTitles = new Set(dynamicTasks.map((t) => `${t.date}::${t.task}`.toLowerCase()));
      const mergedTasks = [
        ...dynamicTasks,
        ...legacyTasks.filter((t) => !seenTitles.has(`${t.date}::${t.task}`.toLowerCase()))
      ];

      memoryTasksCache = mergedTasks;
      setTasks(mergedTasks);
      try {
        sessionStorage.setItem('micampus_dynamic_tasks_cache', JSON.stringify(mergedTasks));
      } catch {}
    } catch {}
  }, []);

  useEffect(() => {
    loadHomeData();
    const onTasksUpdated = () => loadHomeData();
    window.addEventListener('micampus-tasks-updated', onTasksUpdated);
    return () => window.removeEventListener('micampus-tasks-updated', onTasksUpdated);
  }, [loadHomeData]);

  const handleSaveProfile = async (nextConfig) => {
    const res = await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextConfig)
    });
    if (res.ok) {
      const saved = await res.json();
      setUserName(saved.userName || nextConfig.userName);
      setCampusTitle(saved.campusTitle || nextConfig.campusTitle);
      setCampusSubtitle(saved.subtitle || nextConfig.subtitle);
      if (Array.isArray(saved.quickLinks)) setQuickLinks(saved.quickLinks);
      setAiConfig({
        aiProvider: saved.aiProvider || 'none',
        geminiApiKey: saved.geminiApiKey || '',
        openaiApiKey: saved.openaiApiKey || '',
        ollamaUrl: saved.ollamaUrl || 'http://localhost:11434',
        ollamaModel: saved.ollamaModel || 'llama3.2'
      });
      try { localStorage.setItem('micampus_user_name', saved.userName || nextConfig.userName); } catch {}
    }
  };

  // Calcular próxima entrega dinámica memoizada con cálculo de días restantes
  const { nextTask, springBootDateStr } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = tasks
      .map((t) => {
        const dateObj = new Date(t.date);
        dateObj.setHours(0, 0, 0, 0);
        const diffMs = dateObj.getTime() - today.getTime();
        const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));
        return {
          ...t,
          dateObj,
          daysRemaining,
          formattedDate: formatTaskDate(dateObj),
        };
      })
      .filter((t) => t.daysRemaining >= 0 && !t.done)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);

    const next = upcoming.length > 0 ? upcoming[0] : null;

    const springBootTask = tasks.find((t) => t.id === 'acc_spring');
    const springBootStr = springBootTask ? formatTaskDate(new Date(springBootTask.date)) : '03 Nov';

    return {
      upcomingTasks: upcoming,
      nextTask: next,
      springBootDateStr: springBootStr,
    };
  }, [tasks]);

  return (
    <main className="app-container">
      {/* HERO BANNER COMPACTO CON ESTADÍSTICAS */}
      <HomeHeroBanner
        userName={userName}
        campusTitle={campusTitle}
        campusSubtitle={campusSubtitle}
        quickLinks={quickLinks}
        subjectsCount={subjectsCount}
        aiConfig={aiConfig}
        onSaveProfile={handleSaveProfile}
        tasksCount={tasks.length}
        springBootDateStr={springBootDateStr}
        nextTask={nextTask}
      />

      {/* MIS RETOS Y ASIGNATURAS DINÁMICAS */}
      <CustomSubjectsSection />
    </main>
  );
}
