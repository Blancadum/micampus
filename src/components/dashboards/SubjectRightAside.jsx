import React, { useState, useEffect, useMemo } from 'react';
import RightDrawerShell from '../common/aside/RightDrawerShell.jsx';
import AsideLessonsTab from './subject-aside/AsideLessonsTab.jsx';
import AsideEacsTab from './subject-aside/AsideEacsTab.jsx';
import AsideDevKitTab from './subject-aside/AsideDevKitTab.jsx';
import AsideGitTab from './subject-aside/AsideGitTab.jsx';

/**
 * ============================================================================
 * @component SubjectRightAside
 * @description Panel lateral unificado con riel de pestañas (Tab Rail)
 *              para las aulas de asignaturas IOC (IPO2, ENT, DESP, DIGI, INT).
 *              Reutiliza los componentes del sistema RightDrawerShell y
 *              evita la duplicación de estilos CSS.
 * ============================================================================
 */
export default function SubjectRightAside({
  subjectConfig,
  gestionData,
  themeColor = '#3b82f6',
  topOffset = '76px'
}) {
  const [activeTab, setActiveTab] = useState(null); // 'lecciones' | 'eacs' | 'devkit' | 'git' | null
  const [lessons, setLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  // Cargar lecciones del libro digital si existe la ruta
  useEffect(() => {
    if (!subjectConfig?.lecciones) return;
    let isCancelled = false;
    setLessonsLoading(true);

    fetch(subjectConfig.lecciones)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar temario');
        return res.json();
      })
      .then(data => {
        if (!isCancelled && Array.isArray(data)) {
          setLessons(data);
        }
      })
      .catch(err => {
        if (!isCancelled) console.error('Error cargando lecciones en aside:', err);
      })
      .finally(() => {
        if (!isCancelled) setLessonsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [subjectConfig?.lecciones]);

  const toggleTab = (tabName) => {
    setActiveTab(prev => (prev === tabName ? null : tabName));
  };

  const closeDrawer = () => {
    setActiveTab(null);
  };

  // Definición declarativa de las pestañas del Drawer
  const tabs = useMemo(() => {
    if (!subjectConfig) return [];

    return [
      {
        id: 'lecciones',
        icon: '📖',
        label: 'LIBRO',
        title: '📖 Temario y Lecciones',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideLessonsTab
            lessons={lessons}
            loading={lessonsLoading}
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      },
      {
        id: 'eacs',
        icon: '📋',
        label: 'EAC',
        title: '📋 Entregas Oficiales EAC',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideEacsTab
            eacs={gestionData?.eacs || []}
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      },
      {
        id: 'devkit',
        icon: '🛠️',
        label: 'KIT',
        title: '🛠️ DevKit & Herramientas',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideDevKitTab
            devkitItems={subjectConfig.devkitItems || []}
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      },
      {
        id: 'git',
        icon: '💻',
        label: 'GIT',
        title: '💻 Flujo Git & Terminal',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideGitTab
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      }
    ];
  }, [subjectConfig, gestionData, lessons, lessonsLoading, themeColor]);

  if (!subjectConfig) return null;

  return (
    <RightDrawerShell
      tabs={tabs}
      activeTab={activeTab}
      onToggleTab={toggleTab}
      onClose={closeDrawer}
      accentColor={themeColor}
      topOffset={topOffset}
      badge={subjectConfig.code?.toUpperCase()}
      subjectTitle={subjectConfig.title}
    />
  );
}
