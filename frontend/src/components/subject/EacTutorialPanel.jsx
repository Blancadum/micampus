import React, { Suspense, lazy } from 'react';
import SubjectTutorialSection from '../dashboards/subject/SubjectTutorialSection.jsx';

/**
 * Registro declarativo de workbenches interactivos por "<subjectCode>:<eacId>".
 * Para añadir un workbench a otra asignatura/EAC, basta con registrar una entrada aquí.
 */
const WORKBENCH_MAP = {
  'desp:eac2': lazy(() => import('../dashboards/eac2/DespEac2Workbench.jsx')),
  'desp:eac3': lazy(() => import('../dashboards/eac2/DespEac3Workbench.jsx')),
  'ent:eac2': lazy(() => import('../dashboards/eac2/EntEac2Workbench.jsx')),
  'ent:eac3': lazy(() => import('../dashboards/eac2/EntEac3Workbench.jsx')),
};

/**
 * Panel del tutorial paso a paso de una EAC y su workbench interactivo si existe.
 */
export default function EacTutorialPanel({
  gestionData,
  showTutorial,
  activeTutorialEacId,
  subjectCode,
  onClose,
}) {
  if (!gestionData?.eacs || !showTutorial) return null;

  const subCodeLower = (subjectCode || '').toLowerCase();
  const effEacId = (activeTutorialEacId || gestionData.eacs[0]?.id || '').toLowerCase();
  const WorkbenchComp = WORKBENCH_MAP[`${subCodeLower}:${effEacId}`] || null;

  return (
    <div id="paso-a-paso-section" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {WorkbenchComp && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <strong style={{ color: 'var(--text-title)' }}>
              🛠️ Guía Interactiva Paso a Paso ({effEacId.toUpperCase()})
            </strong>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)', color: 'var(--text-title)', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem'
              }}
            >
              ✕ Cerrar Tutorial
            </button>
          </div>
          <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Cargando guía interactiva...</div>}>
            <WorkbenchComp />
          </Suspense>
        </div>
      )}

      <SubjectTutorialSection
        showTutorial={showTutorial}
        onClose={onClose}
        eacs={gestionData.eacs}
        activeEacId={activeTutorialEacId || gestionData.eacs[0]?.id}
        subjectId={subjectCode}
        presentation={gestionData.presentation}
        activeEacGallery={[]}
        onOpenLightbox={() => {}}
      />
    </div>
  );
}
