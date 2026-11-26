import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCampusData, invalidateCampusCache } from '../utils/campusCache.js';

const cardStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '16px',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const btnPrimary = {
  padding: '0.6rem 1rem',
  borderRadius: '10px',
  border: 'none',
  background: 'var(--c-blue, #3b82f6)',
  color: '#fff',
  fontWeight: 700,
  cursor: 'pointer',
  textAlign: 'center',
  textDecoration: 'none'
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  borderRadius: '10px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-subtle)',
  color: 'var(--text-title)'
};

export default function ScriptsCenterPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [icsSubject, setIcsSubject] = useState('auto');
  const [unitName, setUnitName] = useState('Apuntes Importados');
  const [legacyPath, setLegacyPath] = useState('./frontend/public/data');
  const [log, setLog] = useState('');

  const loadSubjects = async () => {
    const data = await getCampusData();
    const list = data?.subjects || [];
    setSubjects(list);
    if (list.length > 0 && !selectedSubject) {
      setSelectedSubject(list[0].id);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleImportNotes = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedSubject) return;
    setLog('⏳ Ejecutando script Java de lectura PDF/Markdown y limpieza de viñetas...');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('subjectId', selectedSubject);
    fd.append('unit', unitName);
    const res = await fetch('/api/scripts/import-notes', { method: 'POST', body: fd });
    const data = await res.json();
    setLog(`✅ ¡Listo! Se crearon ${data.lessonsCreated} lecciones automáticamente.`);
  };

  const handleRestoreBackup = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLog('⏳ Restaurando copia de seguridad...');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/scripts/backup/restore', { method: 'POST', body: fd });
    const data = await res.json();
    setLog(`✅ ${data.message}`);
    await loadSubjects();
  };

  const handleApplyTemplate = async (template) => {
    const name = window.prompt('Tu nombre para personalizar el campus:', 'Blanca') || 'Estudiante';
    await fetch('/api/scripts/apply-template', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template, userName: name })
    });
    setLog(`✅ Plantilla "${template}" aplicada correctamente.`);
    await loadSubjects();
  };

  const handleImportLegacy = async () => {
    setLog('⏳ Importando asignaturas, EACs y lecciones desde MiCampus clásico...');
    const res = await fetch('/api/scripts/import-legacy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: legacyPath })
    });
    const data = await res.json();
    setLog(`✅ Migración completada: ${data.subjectsAdded} asignaturas, ${data.tasksAdded} entregas y ${data.lessonsAdded} lecciones.`);
    await loadSubjects();
  };

  const handleImportIcs = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLog('⏳ Analizando calendario .ics y detectando asignatura...');
    const fd = new FormData();
    fd.append('file', file);
    if (icsSubject && icsSubject !== 'auto') {
      fd.append('subjectId', icsSubject);
    }
    const res = await fetch('/api/scripts/import-ics', { method: 'POST', body: fd });
    const data = await res.json();
    invalidateCampusCache();
    const detected = Array.isArray(data.detectedSubjects) && data.detectedSubjects.length > 0
      ? ` · Asignaturas: ${data.detectedSubjects.join(', ')}`
      : '';
    const unmatched = data.unmatchedEvents > 0
      ? ` (${data.unmatchedEvents} eventos sin asignatura coincidente)`
      : '';
    setLog(`✅ Se importaron ${data.eventsImported || 0} entregas desde ${file.name}${detected}${unmatched}.`);
    e.target.value = '';
  };

  return (
    <main className="app-container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ ...cardStyle, marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, color: 'var(--text-title)' }}>⚡ Centro de Scripts Automáticos (Java)</h1>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--text-muted)' }}>
              Funciones que antes requerían pedírselas a una IA o usar la terminal, convertidas en botones de un clic para cualquier usuario.
            </p>
          </div>
          <Link to="/" style={{ ...btnPrimary, background: 'var(--bg-subtle)', color: 'var(--text-title)' }}>← Volver al Campus</Link>
        </div>
      </div>

      {log && (
        <div style={{ ...cardStyle, marginBottom: '1.25rem', borderColor: 'var(--c-blue, #3b82f6)' }}>
          <strong>{log}</strong>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div style={cardStyle}>
          <h3 style={{ margin: 0 }}>📄 1. Importador de Apuntes (PDF / MD)</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Lee PDFs o Markdown, normaliza viñetas, divide por encabezados y extrae preguntas de autoevaluación.
          </p>
          <select style={inputStyle} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.icon} {s.title}</option>
            ))}
          </select>
          <input style={inputStyle} value={unitName} onChange={(e) => setUnitName(e.target.value)} placeholder="Nombre de la unidad" />
          <label style={btnPrimary}>
            Seleccionar archivo (.pdf, .md, .txt)
            <input type="file" accept=".pdf,.md,.txt" hidden onChange={handleImportNotes} />
          </label>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0 }}>💾 2. Copia de Seguridad Total (.zip)</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Exporta todas tus asignaturas, temarios, entregas y archivos en un ZIP o restáuralo en otro equipo.
          </p>
          <a style={btnPrimary} href="/api/scripts/backup/export">⬇️ Exportar Backup (.zip)</a>
          <label style={{ ...btnPrimary, background: 'var(--bg-subtle)', color: 'var(--text-title)' }}>
            ⬆️ Restaurar desde Backup (.zip)
            <input type="file" accept=".zip" hidden onChange={handleRestoreBackup} />
          </label>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0 }}>🎨 3. Plantillas para Nuevos Usuarios</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Reinicia o prepara un campus limpio para otra persona con asignaturas de ejemplo o desde cero.
          </p>
          <button style={btnPrimary} onClick={() => handleApplyTemplate('general')}>🎓 Plantilla General (FP / Uni)</button>
          <button style={{ ...btnPrimary, background: '#10b981' }} onClick={() => handleApplyTemplate('bootcamp')}>☕ Plantilla Bootcamp Java</button>
          <button style={{ ...btnPrimary, background: 'var(--bg-subtle)', color: 'var(--text-title)' }} onClick={() => handleApplyTemplate('empty')}>✨ Campus Vacío</button>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0 }}>📥 4. Migrar desde MiCampus Clásico</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Importa tus asignaturas, EACs y lecciones desde la carpeta <code>public/data</code> del proyecto original.
          </p>
          <input style={inputStyle} value={legacyPath} onChange={(e) => setLegacyPath(e.target.value)} />
          <button style={btnPrimary} onClick={handleImportLegacy}>🚀 Importar Datos Clásicos</button>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: 0 }}>📅 5. Importar Calendario (.ics)</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Sube un archivo <code>.ics</code> del campus y detecta automáticamente a qué asignatura pertenece cada entrega.
          </p>
          <select style={inputStyle} value={icsSubject} onChange={(e) => setIcsSubject(e.target.value)}>
            <option value="auto">✨ Detectar asignatura automáticamente</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.icon} {s.title}</option>
            ))}
          </select>
          <label style={btnPrimary}>
            📅 Seleccionar archivo (.ics)
            <input type="file" accept=".ics,text/calendar" hidden onChange={handleImportIcs} />
          </label>
        </div>
      </div>
    </main>
  );
}
