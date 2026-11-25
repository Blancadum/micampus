import React, { useState } from 'react';
import TroubleshootingHeader from './troubleshooting/TroubleshootingHeader';
import TroubleshootingIssuesAccordion from './troubleshooting/TroubleshootingIssuesAccordion';
import TroubleshootingShortcutsCard from './troubleshooting/TroubleshootingShortcutsCard';
import TroubleshootingChecklist from './troubleshooting/TroubleshootingChecklist';

/**
 * ============================================================================
 * @component   TroubleshootingTab
 * @description Pestaña de Diagnóstico y Errores Clave para proyectos Spring Boot.
 *              Incluye solución rápida de problemas comunes, atajos de teclado
 *              de IntelliJ (Mac/Windows) y checklist de verificación de entorno.
 * ============================================================================
 */
export default function TroubleshootingTab() {
  const [copiedId, setCopiedId] = useState(null);
  const [activeShortcutOs, setActiveShortcutOs] = useState('mac'); // 'mac' | 'win'
  const [openIssue, setOpenIssue] = useState({
    port8080: true,
    lombok: true,
    javahome: false,
    cannotResolve: false,
    mvnwPermission: false
  });

  const [checklist, setChecklist] = useState({
    jdk: true,
    javahome: true,
    ide: false,
    maven: false,
    git: false,
    bootRun: false,
    helloTest: false
  });

  const toggleIssue = (id) => {
    setOpenIssue((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Cabecera */}
      <TroubleshootingHeader />

      {/* 2. Acordeón de Problemas Frecuentes y Soluciones */}
      <TroubleshootingIssuesAccordion
        openIssue={openIssue}
        onToggleIssue={toggleIssue}
        copiedId={copiedId}
        onCopy={handleCopy}
      />

      {/* 3. Tabla de Atajos de Teclado de IntelliJ IDEA */}
      <TroubleshootingShortcutsCard
        activeShortcutOs={activeShortcutOs}
        setActiveShortcutOs={setActiveShortcutOs}
      />

      {/* 4. Checklist interactivo de verificación final */}
      <TroubleshootingChecklist
        checklist={checklist}
        onToggleCheck={toggleCheck}
        completedCount={completedCount}
      />
    </div>
  );
}
