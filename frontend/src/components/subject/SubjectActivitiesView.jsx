import React from 'react';
import EacCard from './EacCard.jsx';
import EacFichaPanel from './EacFichaPanel.jsx';
import EacTutorialPanel from './EacTutorialPanel.jsx';
import { matchEacForTask } from '../../utils/eacMatcher.js';

export default function SubjectActivitiesView({
  subject,
  tasks = [],
  uploads = [],
  lessons = [],
  gestionData,
  accent = '#22c55e',
  uploadingTaskId,
  setUploadingTaskId,
  selectedEacFichaId,
  setSelectedEacFichaId,
  activeTutorialEacId,
  setActiveTutorialEacId,
  showTutorial,
  setShowTutorial,
  onReload
}) {
  const openTutorial = (eacId) => {
    setActiveTutorialEacId(eacId);
    setShowTutorial(true);
    setTimeout(() => {
      document.getElementById('paso-a-paso-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem' }}>
        🎯 Actividades y Entregas de la Asignatura
      </h2>

      {tasks.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.5rem', color: 'var(--text-muted)' }}>
          No hay actividades ni eventos registrados aún. Pulsa <strong>✏️ Editar asignatura</strong> para importar un <code>.ics</code> o añadir entregas.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {tasks.map((t) => (
            <EacCard
              key={t.id}
              task={t}
              matchedEac={matchEacForTask(t, gestionData?.eacs || [])}
              uploads={uploads}
              subjectId={subject.id}
              accent={accent}
              uploadingTaskId={uploadingTaskId}
              setUploadingTaskId={setUploadingTaskId}
              onToggleTask={async (taskId) => {
                await fetch(`/api/tasks/${taskId}/toggle`, { method: 'PATCH' });
                await onReload();
              }}
              onOpenTutorial={openTutorial}
              onReload={onReload}
            />
          ))}
        </div>
      )}

      <EacFichaPanel
        fichaTask={tasks.find((t) => t.id === selectedEacFichaId) || null}
        eacList={gestionData?.eacs || []}
        lessons={lessons}
        accent={accent}
        onClose={() => setSelectedEacFichaId(null)}
        onOpenTutorial={openTutorial}
      />

      <EacTutorialPanel
        gestionData={gestionData}
        showTutorial={showTutorial}
        activeTutorialEacId={activeTutorialEacId}
        subjectCode={subject.code}
        onClose={() => setShowTutorial(false)}
      />
    </section>
  );
}
