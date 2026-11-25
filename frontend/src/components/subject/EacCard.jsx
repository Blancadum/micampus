import React from 'react';
import { getAcWeightLabel } from '../../utils/eacMatcher';

/**
 * Tarjeta individual de una actividad/EAC con estado (% AC), fechas,
 * descarga de enunciado/solución, subida de entregas y botón de completar.
 */
export default function EacCard({
  task,
  matchedEac,
  uploads,
  subjectId,
  accent,
  uploadingTaskId,
  setUploadingTaskId,
  onToggleTask,
  onOpenTutorial,
  onReload,
}) {
  const isDone = task.status === 'done';
  const folderKey = matchedEac?.id ? matchedEac.id.toUpperCase() : (task.title || 'entregas').slice(0, 32);
  const solutionFolderKey = `${folderKey}-solucion`;
  const taskUploads = uploads.filter((u) => (u.folder || '').toLowerCase() === folderKey.toLowerCase());
  const solutionUploads = uploads.filter((u) => (u.folder || '').toLowerCase() === solutionFolderKey.toLowerCase());
  const acWeight = getAcWeightLabel(task, matchedEac);

  const handleUpload = async (file, targetFolder, uploadKey) => {
    if (!file) return;
    setUploadingTaskId(uploadKey);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', targetFolder);
      await fetch(`/api/uploads/${subjectId}`, { method: 'POST', body: fd });
      await onReload();
    } finally {
      setUploadingTaskId(null);
    }
  };

  const renderUploadList = (items, prefix, isSolution) => items.map((u) => (
    <div key={u.id} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem',
      padding: '0.35rem 0.55rem', borderRadius: '8px',
      background: isSolution ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-subtle)',
      fontSize: '0.78rem'
    }}>
      <a
        href={`/api/uploads/${subjectId}/${u.storedName}`}
        style={{
          color: isSolution ? '#6d28d9' : 'var(--text-title)',
          textDecoration: 'none', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}
        title={u.originalName}
      >
        {prefix} {u.originalName}
      </a>
      <button
        type="button"
        onClick={async () => { await fetch(`/api/uploads/${u.id}`, { method: 'DELETE' }); await onReload(); }}
        title="Eliminar archivo"
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.78rem' }}
      >
        🗑️
      </button>
    </div>
  ));

  return (
    <article style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      padding: '1.15rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '0.85rem',
      boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-title)' }}>
            {(task.title || '').replace(/\s*\([^)]*%\s*AC\)/gi, '').trim()}
          </h3>
          <button
            type="button"
            onClick={() => onToggleTask(task.id)}
            title={isDone ? 'Marcar como pendiente' : 'Marcar como completada'}
            style={{
              width: '26px', height: '26px', borderRadius: '6px', border: 'none',
              background: isDone ? '#22c55e' : 'var(--bg-subtle)',
              color: isDone ? '#fff' : 'var(--text-muted)',
              fontWeight: 800, cursor: 'pointer', flexShrink: 0
            }}
          >
            {isDone ? '✓' : ''}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.3rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Estado:</span>
          <strong style={{ color: isDone ? '#16a34a' : '#d97706' }}>
            {acWeight || (isDone ? 'Entregada' : 'Pendiente')}
          </strong>
        </div>
        {task.openDate && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fecha Apertura:</span>
            <strong>{task.openDate}</strong>
          </div>
        )}
        {task.dueDate && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fecha Límite:</span>
            <strong>{task.dueDate}</strong>
          </div>
        )}
        {task.gradeDate && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Publicación Nota:</span>
            <strong>{task.gradeDate}</strong>
          </div>
        )}
        {task.weight > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Peso AC:</span>
            <strong>{task.weight}%</strong>
          </div>
        )}
        {task.grade && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Nota:</span>
            <strong style={{ color: '#16a34a' }}>{task.grade}</strong>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {(matchedEac || matchedEac?.enunciatUrl) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: (matchedEac && matchedEac?.enunciatUrl) ? '1fr 1fr' : '1fr',
            gap: '0.45rem'
          }}>
            {matchedEac && (
              <button
                type="button"
                onClick={() => onOpenTutorial(matchedEac.id)}
                style={{
                  width: '100%', padding: '0.5rem 0.55rem', borderRadius: '8px',
                  border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)',
                  color: 'var(--text-title)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                📖 Tutorial
              </button>
            )}
            {matchedEac?.enunciatUrl && (
              <a
                href={matchedEac.enunciatUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '100%', boxSizing: 'border-box', textAlign: 'center',
                  padding: '0.5rem 0.55rem', borderRadius: '8px',
                  border: '1px solid var(--border-subtle)', background: 'var(--bg-card)',
                  color: 'var(--text-title)', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                📄 Descargar
              </a>
            )}
          </div>
        )}

        {matchedEac?.solutionUrl && (
          <a
            href={matchedEac.solutionUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', boxSizing: 'border-box', textAlign: 'center',
              padding: '0.45rem 0.65rem', borderRadius: '8px',
              border: '1px solid rgba(34, 197, 94, 0.35)', background: 'rgba(34, 197, 94, 0.08)',
              color: '#15803d', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none'
            }}
          >
            ✅ Ver Solución Oficial
          </a>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
          <label style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
            width: '100%', boxSizing: 'border-box', textAlign: 'center',
            padding: '0.5rem 0.45rem', borderRadius: '8px',
            border: `1px dashed ${accent}`, background: `${accent}12`,
            color: accent, fontWeight: 700, fontSize: '0.79rem', cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}>
            {uploadingTaskId === task.id ? '⏳ Subiendo...' : '📤 Subir entrega'}
            <input
              type="file"
              hidden
              disabled={uploadingTaskId === task.id || uploadingTaskId === `${task.id}-sol`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                handleUpload(file, folderKey, task.id);
              }}
            />
          </label>

          <label style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
            width: '100%', boxSizing: 'border-box', textAlign: 'center',
            padding: '0.5rem 0.45rem', borderRadius: '8px',
            border: '1px dashed #8b5cf6', background: 'rgba(139, 92, 246, 0.08)',
            color: '#7c3aed', fontWeight: 700, fontSize: '0.79rem', cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}>
            {uploadingTaskId === `${task.id}-sol` ? '⏳ Subiendo...' : '📥 Subir solución'}
            <input
              type="file"
              hidden
              disabled={uploadingTaskId === task.id || uploadingTaskId === `${task.id}-sol`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                handleUpload(file, solutionFolderKey, `${task.id}-sol`);
              }}
            />
          </label>
        </div>

        {(taskUploads.length > 0 || solutionUploads.length > 0) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.15rem' }}>
            {renderUploadList(taskUploads, '📎 Entrega:', false)}
            {renderUploadList(solutionUploads, '✅ Solución:', true)}
          </div>
        )}

        <button
          type="button"
          onClick={() => onToggleTask(task.id)}
          style={{
            width: '100%',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            padding: '0 0.75rem',
            borderRadius: '10px',
            border: isDone ? '1px solid var(--border-subtle)' : `1px solid ${accent}`,
            background: isDone ? 'var(--bg-subtle)' : accent,
            color: isDone ? 'var(--text-title)' : '#fff',
            fontWeight: 700,
            fontSize: '0.86rem',
            lineHeight: 1,
            cursor: 'pointer'
          }}
        >
          {isDone ? 'Reabrir como pendiente' : '✅ Marcar como entregada'}
        </button>
      </div>
    </article>
  );
}
