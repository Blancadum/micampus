import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import IconPicker, { SubjectIcon } from '../components/common/IconPicker.jsx';
import LessonLightboxModal from '../components/viewers/LessonViewer/widgets/LessonLightboxModal.jsx';
import PodcastPlayerCard from '../components/viewers/LessonViewer/widgets/PodcastPlayerCard.jsx';
import useLessonMarkdownComponents from '../components/viewers/LessonViewer/widgets/useLessonMarkdownComponents.jsx';
import SubjectMiniCalendar from '../components/subject/SubjectMiniCalendar.jsx';
import SubjectBookSidebar from '../components/subject/SubjectBookSidebar.jsx';
import UnitIntroDiagram from '../components/subject/UnitIntroDiagram.jsx';
import PlatformLogosStrip from '../components/subject/PlatformLogosStrip.jsx';
import SubjectQuizzesPanel from '../components/subject/SubjectQuizzesPanel.jsx';
import SubjectGamifyModal from '../components/subject/SubjectGamifyModal.jsx';
import SubjectBookToolbar from '../components/subject/SubjectBookToolbar.jsx';
import SubjectActivitiesView from '../components/subject/SubjectActivitiesView.jsx';
import MaterialAgentModal from '../components/subject/MaterialAgentModal.jsx';
import { getLessonNumbering, syncLessonMarkdownAndHeadings, scrollElementBelowStickyBar } from '../utils/bookHierarchy.js';
import { resolveSubjectFromParams, getSubjectUrl } from '../utils/subjectRoutes.js';

function slugifyHeading(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripLeadingDuplicateHeading(md, lessonTitle) {
  if (!md) return '';
  const match = md.match(/^#{1,2}\s+([^\n]+)\n+/);
  if (!match) return md;
  const headingNorm = slugifyHeading(match[1]);
  const titleNorm = slugifyHeading(lessonTitle);
  if (headingNorm && titleNorm && (headingNorm === titleNorm || titleNorm.includes(headingNorm) || headingNorm.includes(titleNorm))) {
    return md.slice(match[0].length);
  }
  return md;
}

const BOOK_PROMPT = `Actúa como un diseñador instruccional y redactor técnico. Te adjunto mis apuntes / temario.
Quiero que los transformes en un único archivo Markdown (.md) listo para importar como un Libro interactivo, siguiendo ESTRICTAMENTE esta estructura:

1. Bloques / Unidades (# nivel 1): Usa "# " exclusivamente para los grandes bloques (ej. "# Bloque 1: Fundamentos").
2. Lecciones (## nivel 2): Dentro de cada bloque, divide el contenido en lecciones claras usando "## " (ej. "## 1.1 Qué es la Arquitectura Hexagonal").
3. Secciones internas (### nivel 3): Usa "### " para subsecciones dentro de cada lección (ej. "### Concepto clave", "### Ejemplo práctico").
4. Formato rico: Usa citas ("> 💡 ..."), listas ("- "), tablas Markdown y bloques de código (\`\`\`java, \`\`\`sql, etc.).
5. Autoevaluación al final de cada lección con estas etiquetas exactas en líneas consecutivas:
Pregunta: ¿Texto de la pregunta?
Respuesta: Texto de la respuesta.

Devuélveme únicamente el archivo .md completo.`;

const AI_ICS_PROMPT = `Te adjunto el archivo .ics exportado de mi campus virtual (por ejemplo IOC).
Quiero que lo refactorices antes de importarlo siguiendo estas reglas:
1. Divide el calendario en un archivo .ics independiente para cada asignatura (ej. ENT.ics, DESP.ics, Ingles.ics).
2. Elimina eventos repetidos o duplicados (quédate solo con las fechas clave reales: inicios, entregas, exámenes y tutorías).
3. Estandariza los títulos (SUMMARY) con la sigla de la asignatura delante, por ejemplo: "[ENT] Entrega EAC 2".
4. Añade un color distinto a cada asignatura usando X-APPLE-CALENDAR-COLOR y COLOR (ej. #2563eb para ENT, #10b981 para DESP, #ec4899 para DIGI...).
5. Limpia etiquetas HTML de la DESCRIPTION y añade un recordatorio (VALARM) 2 días antes de cada entrega.`;

function IcsTutorialBox() {
  const [copied, setCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_ICS_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Silencioso si el navegador bloquea clipboard
    }
  };

  const stepBadgeStyle = (bg) => ({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: bg,
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '0.85rem',
    flexShrink: 0
  });

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderLeft: '5px solid #3b82f6',
      borderRadius: '14px',
      padding: '1.15rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-title)' }}>
            🚀 Guía Visual: Cómo exportar, limpiar con IA e importar tu <code>.ics</code>
          </div>
          <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            Sigue estos 3 pasos para que tu calendario quede limpio, sin duplicados y con un color por asignatura.
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowVideo((v) => !v)}
          style={{
            padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
            background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
          }}
        >
          {showVideo ? '🙈 Ocultar vídeo' : '🎬 Ver vídeo guía'}
        </button>
      </div>

      {/* Paso 1: Descargar ICS + Vídeo */}
      <div style={{
        padding: '0.9rem 1rem', borderRadius: '12px', background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={stepBadgeStyle('#2563eb')}>1</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.93rem' }}>Descarga el calendario <code>.ics</code> de tu centro (ej. IOC)</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              En este vídeo puedes ver exactamente dónde ir dentro del campus para exportar el archivo <code>.ics</code>:{' '}
              <a href="https://youtu.be/TwimHsgq1LU" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', fontWeight: 600 }}>
                Abrir en YouTube ↗
              </a>
            </div>
          </div>
        </div>

        {showVideo && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '560px', paddingBottom: 'min(56.25%, 315px)', height: 0, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <iframe
              src="https://www.youtube.com/embed/TwimHsgq1LU"
              title="Cómo exportar calendario ICS en IOC"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
        )}
      </div>

      {/* Paso 2: Refactorizar con IA */}
      <div style={{
        padding: '0.9rem 1rem', borderRadius: '12px', background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.65rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={stepBadgeStyle('#8b5cf6')}>2</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.93rem' }}>Divide y limpia el <code>.ics</code> con IA antes de subirlo</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Los calendarios del IOC suelen repetir eventos, mezclar asignaturas y usar un único color. Pídele a tu IA que lo refactorice:
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyPrompt}
            style={{
              padding: '0.4rem 0.85rem', borderRadius: '8px', border: 'none',
              background: copied ? '#16a34a' : '#8b5cf6', color: '#fff',
              fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
            }}
          >
            {copied ? '✅ ¡Prompt copiado!' : '📋 Copiar prompt para IA'}
          </button>
        </div>

        <ul style={{ margin: '0.1rem 0', paddingLeft: '1.35rem', fontSize: '0.82rem', color: 'var(--text-title)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <li><strong>Separar por asignatura:</strong> un <code>.ics</code> independiente por cada materia.</li>
          <li><strong>Quitar duplicados y ruido:</strong> eliminar eventos repetidos o avisos genéricos innecesarios.</li>
          <li><strong>Color y sigla por asignatura:</strong> añadir <code>X-APPLE-CALENDAR-COLOR</code> / <code>COLOR</code> y prefijo <code>[SIGLA]</code> en el título.</li>
          <li><strong>Recordatorios y formato limpio:</strong> limpiar HTML de la descripción y añadir alertas 2 días antes.</li>
        </ul>

        <pre style={{
          margin: 0, padding: '0.75rem', borderRadius: '10px',
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          fontSize: '0.76rem', whiteSpace: 'pre-wrap', lineHeight: 1.45, color: 'var(--text-muted)'
        }}>
          {AI_ICS_PROMPT}
        </pre>
      </div>

      {/* Paso 3: Importar en MiCampus / Exportar a tu calendario */}
      <div style={{
        padding: '0.9rem 1rem', borderRadius: '12px', background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.65rem'
      }}>
        <span style={stepBadgeStyle('#10b981')}>3</span>
        <div style={{ fontSize: '0.84rem', lineHeight: 1.45 }}>
          <strong>Sube el <code>.ics</code> de esta asignatura arriba</strong> con el botón <strong>📤 Importar archivo .ics</strong>.
          Cuando quieras llevarlo a tu Mac o Google Calendar, pulsa <strong>⬇️ Descargar .ics de la asignatura</strong> (en Mac basta con hacer doble clic para añadirlo a Apple Calendar).
        </div>
      </div>
    </div>
  );
}


export default function DynamicSubjectPage() {
  const { id, groupSlug, subjectSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [campus, setCampus] = useState(null);
  const [publicView, setPublicView] = useState(() => searchParams.get('tab') || 'activities'); // activities | lessons | uploads
  const [selectedLessonId, setSelectedLessonId] = useState(() => searchParams.get('lesson') || null);

  useEffect(() => {
    const qTab = searchParams.get('tab');
    const qLesson = searchParams.get('lesson');
    if (qTab) setPublicView(qTab);
    if (qLesson) setSelectedLessonId(qLesson);
  }, [searchParams]);
  const [revealedQuiz, setRevealedQuiz] = useState({});
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [gestionData, setGestionData] = useState(null);
  const [activeTutorialEacId, setActiveTutorialEacId] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [selectedEacFichaId, setSelectedEacFichaId] = useState(null);
  const [showActivitiesDropdown, setShowActivitiesDropdown] = useState(false);
  const [uploadingTaskId, setUploadingTaskId] = useState(null);

  const handleOpenLightbox = useCallback((imgData) => {
    setLightboxImg(imgData);
    setLightboxZoom(1.2);
  }, []);

  const markdownComponents = useLessonMarkdownComponents({
    onOpenLightbox: handleOpenLightbox
  });

  // Modo edición vs versión pública
  const [editMode, setEditMode] = useState(false);
  const [initializedForId, setInitializedForId] = useState(null);

  // Campos de edición de asignatura
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [icon, setIcon] = useState('📚');
  const [color, setColor] = useState('#2563eb');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherAvatar, setTeacherAvatar] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savingSetup, setSavingSetup] = useState(false);

  // Eventos / Entregas / ICS
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskWeight, setTaskWeight] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskDraft, setEditTaskDraft] = useState({ title: '', dueDate: '', weight: '', grade: '', description: '' });
  const [icsFeedback, setIcsFeedback] = useState('');

  // Lecciones e IA híbrida
  const [importUnit, setImportUnit] = useState('Apuntes Importados');
  const [showBookPrompt, setShowBookPrompt] = useState(false);
  const [copiedBookPrompt, setCopiedBookPrompt] = useState(false);
  const [showPasteAi, setShowPasteAi] = useState(false);
  const [pasteAiText, setPasteAiText] = useState('');
  const [pasteAiStatus, setPasteAiStatus] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [autofillText, setAutofillText] = useState('');
  const [autofillFile, setAutofillFile] = useState(null);
  const [autofillDraft, setAutofillDraft] = useState(null);
  const [autofillMsg, setAutofillMsg] = useState('');
  const [collapsedUnits, setCollapsedUnits] = useState({});
  const [showMaterialAgentModal, setShowMaterialAgentModal] = useState(false);
  const [showGamifyModal, setShowGamifyModal] = useState(false);
  const [uploadFolder, setUploadFolder] = useState('temario');
  const [newLessonUnit, setNewLessonUnit] = useState('Unidad 1');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editLessonDraft, setEditLessonDraft] = useState({ unit: '', title: '', content: '' });

  const reload = useCallback(async () => {
    const res = await fetch('/api/campus');
    const data = await res.json();
    setCampus(data);
    window.dispatchEvent(new Event('micampus-tasks-updated'));
  }, []);

  useEffect(() => {
    const onExternalUpdate = async () => {
      const res = await fetch('/api/campus');
      if (res.ok) {
        const data = await res.json();
        setCampus(data);
      }
    };
    window.addEventListener('micampus-tasks-updated', onExternalUpdate);
    return () => window.removeEventListener('micampus-tasks-updated', onExternalUpdate);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const effectiveGroupSlug = groupSlug || (pathParts.length >= 2 ? pathParts[0] : undefined);
  const effectiveSubjectSlug = subjectSlug || (pathParts.length >= 2 ? pathParts[1] : undefined);
  const subject = resolveSubjectFromParams(
    { id, groupSlug: effectiveGroupSlug, subjectSlug: effectiveSubjectSlug },
    campus?.subjects || [],
    campus?.groups || []
  );

  useEffect(() => {
    if (subject && initializedForId !== subject.id) {
      setTitle(subject.title || '');
      setCode(subject.code || '');
      setIcon(subject.icon || '📚');
      setColor(subject.color || '#2563eb');
      setCategory(subject.category || 'General');
      setDescription(subject.description || '');
      setTeacherName(subject.teacher || '');
      setTeacherAvatar(subject.teacherAvatar || '');
      setEditMode(!subject.setupCompleted);
      setInitializedForId(subject.id);
    }
  }, [subject, initializedForId]);

  useEffect(() => {
    if (!subject) return;
    const canonical = getSubjectUrl(subject, campus?.groups || []);
    if (canonical && canonical !== '/' && location.pathname !== canonical) {
      navigate(`${canonical}${location.search || ''}`, { replace: true });
    }
  }, [subject, campus?.groups, location.pathname, location.search, navigate]);

  useEffect(() => {
    const codeLower = (subject?.code || '').trim().toLowerCase();
    if (!codeLower) {
      setGestionData(null);
      return;
    }
    fetch(`/data/ioc/gestion/${codeLower}.json`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setGestionData(data))
      .catch(() => setGestionData(null));
  }, [subject?.code]);

  if (!campus) return <main className="app-container" style={{ padding: '2rem' }}>Cargando asignatura...</main>;

  if (!subject) {
    return (
      <main className="app-container" style={{ padding: '2rem' }}>
        <h2>Asignatura no encontrada</h2>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </main>
    );
  }

  const accent = subject.color || '#2563eb';
  const lessons = (campus.lessons || [])
    .filter((l) => l.subjectId === subject.id)
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const tasks = (campus.tasks || []).filter((t) => t.subjectId === subject.id);
  const uploads = (campus.uploads || []).filter((u) => u.subjectId === subject.id);
  const activeLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const activeLessonIndex = activeLesson ? lessons.findIndex((l) => l.id === activeLesson.id) : -1;

  const groupedLessons = lessons.reduce((acc, l) => {
    const u = l.unit?.trim() || 'Unidad 1';
    if (!acc[u]) acc[u] = [];
    acc[u].push(l);
    return acc;
  }, {});

  const doneTasksCount = tasks.filter((t) => t.status === 'done').length;
  const doneLessonsCount = lessons.filter((l) => l.completed).length;
  const progressPct = tasks.length > 0
    ? Math.round((doneTasksCount / tasks.length) * 100)
    : (lessons.length > 0 ? Math.round((doneLessonsCount / lessons.length) * 100) : 0);

  const saveSubjectFields = async (markCompleted = subject.setupCompleted) => {
    setSavingSetup(true);
    try {
      await fetch(`/api/subjects/${subject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...subject,
          title: title.trim() || subject.title,
          shortTitle: title.trim() || subject.shortTitle,
          code: code.trim() || subject.code,
          icon: icon.trim() || subject.icon,
          color: color || subject.color,
          category: category.trim() || subject.category,
          description: description.trim(),
          teacher: teacherName.trim(),
          teacherAvatar: teacherAvatar.trim(),
          setupCompleted: markCompleted
        })
      });
      await reload();
    } finally {
      setSavingSetup(false);
    }
  };

  const handlePublishAndView = async () => {
    await saveSubjectFields(true);
    setEditMode(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'tutor');
      const res = await fetch(`/api/uploads/${subject.id}`, { method: 'POST', body: fd });
      if (res.ok) {
        const uploaded = await res.json();
        setTeacherAvatar(`/api/uploads/${subject.id}/${uploaded.storedName}?inline=true`);
      }
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleImportIcs = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('subjectId', id);
    const res = await fetch('/api/scripts/import-ics', { method: 'POST', body: fd });
    if (res.ok) {
      const data = await res.json();
      setIcsFeedback(`✅ Se importaron ${data.eventsImported} evento(s) desde "${file.name}".`);
      await reload();
    } else {
      setIcsFeedback('❌ No se pudo leer el archivo .ics. Comprueba que sea un calendario válido.');
    }
    e.target.value = '';
  };

  const handleImportPdf = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('subjectId', id);
    fd.append('unit', importUnit.trim() || 'Apuntes Importados');
    await fetch('/api/scripts/import-notes', { method: 'POST', body: fd });
    await reload();
    e.target.value = '';
  };

  const handlePasteAiImport = async (e) => {
    e.preventDefault();
    if (!pasteAiText.trim()) return;
    setAiBusy(true);
    setPasteAiStatus('');
    try {
      const res = await fetch('/api/scripts/import-raw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: subject.id,
          unit: importUnit.trim() || 'Apuntes IA',
          content: pasteAiText
        })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setPasteAiStatus(`✅ ${data.message}`);
        setPasteAiText('');
        await reload();
      } else {
        setPasteAiStatus(`❌ ${data.message || 'No se pudo importar.'}`);
      }
    } finally {
      setAiBusy(false);
    }
  };

  const handleAiTransformFile = async (e, mode) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAiBusy(true);
    setPasteAiStatus('⏳ Procesando archivo con el motor de IA configurado...');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('subjectId', id);
      fd.append('unit', importUnit.trim() || 'Apuntes IA');
      fd.append('mode', mode);
      const res = await fetch('/api/scripts/ai-transform', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.status === 'ok') {
        setPasteAiStatus(`✅ ${data.message}`);
        await reload();
      } else {
        setPasteAiStatus(`❌ ${data.message || 'Error al procesar con IA.'}`);
      }
    } finally {
      setAiBusy(false);
      e.target.value = '';
    }
  };

  const hasConfiguredAi = campus.config?.aiProvider && campus.config.aiProvider !== 'none';

  const handleGenerateAutofill = async (e) => {
    e.preventDefault();
    if (!autofillText.trim() && !autofillFile) return;
    setAiBusy(true);
    setAutofillMsg('⏳ Generando borrador del aula con tu IA...');
    setAutofillDraft(null);
    try {
      const fd = new FormData();
      if (autofillFile) fd.append('file', autofillFile);
      if (autofillText.trim()) fd.append('text', autofillText.trim());
      const res = await fetch('/api/scripts/ai-autofill', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.status === 'ok' && data.draft) {
        setAutofillDraft(data.draft);
        setAutofillMsg('✅ Borrador listo. Revísalo y pulsa "Aplicar al aula".');
      } else {
        setAutofillMsg(`❌ ${data.message || 'No se pudo generar el borrador.'}`);
      }
    } finally {
      setAiBusy(false);
    }
  };

  const handleApplyAutofill = async () => {
    if (!autofillDraft) return;
    setAiBusy(true);
    try {
      const nextTeacher = autofillDraft.teacher || teacherName;
      const nextDesc = autofillDraft.description || description;
      const nextIcon = autofillDraft.icon || icon;
      if (autofillDraft.teacher) setTeacherName(autofillDraft.teacher);
      if (autofillDraft.description) setDescription(autofillDraft.description);
      if (autofillDraft.icon) setIcon(autofillDraft.icon);

      await fetch(`/api/subjects/${subject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...subject,
          title: title.trim() || subject.title,
          shortTitle: title.trim() || subject.shortTitle,
          code: code.trim() || subject.code,
          icon: nextIcon,
          color,
          category,
          description: nextDesc,
          teacher: nextTeacher,
          teacherAvatar
        })
      });

      const taskCalls = (autofillDraft.tasks || []).map((t) =>
        fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectId: subject.id,
            title: t.title || 'Entrega',
            dueDate: t.dueDate || '',
            weight: Number(t.weight) || 0,
            description: t.description || '',
            status: 'pending'
          })
        })
      );
      const lessonCalls = (autofillDraft.lessons || []).map((l, idx) =>
        fetch('/api/lessons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectId: subject.id,
            unit: l.unit || 'Bloque 1',
            title: l.title || `Lección ${idx + 1}`,
            content: l.content || '',
            orderIndex: idx + 1
          })
        })
      );
      await Promise.all([...taskCalls, ...lessonCalls]);
      setAutofillDraft(null);
      setAutofillText('');
      setAutofillFile(null);
      setAutofillMsg('✅ ¡Borrador aplicado! Ya puedes ver el resultado en los pasos de abajo o publicar el aula.');
      await reload();
    } finally {
      setAiBusy(false);
    }
  };

  const handleMoveLesson = async (unitLessons, index, delta) => {
    const targetIdx = index + delta;
    if (targetIdx < 0 || targetIdx >= unitLessons.length) return;
    const reordered = [...unitLessons];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);

    await Promise.all(
      reordered.map((lesson, idx) =>
        fetch(`/api/lessons/${lesson.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lesson, orderIndex: idx })
        })
      )
    );
    await reload();
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    const res = await fetch('/api/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectId: subject.id,
        unit: newLessonUnit.trim() || 'Unidad 1',
        title: newLessonTitle,
        content: newLessonContent
      })
    });
    const created = await res.json();
    setNewLessonTitle('');
    setNewLessonContent('');
    setSelectedLessonId(created.id);
    await reload();
  };

  const handleSaveLessonEdit = async (lesson) => {
    await fetch(`/api/lessons/${lesson.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lesson,
        unit: editLessonDraft.unit.trim() || 'Unidad 1',
        title: editLessonDraft.title.trim() || lesson.title,
        content: editLessonDraft.content
      })
    });
    setEditingLessonId(null);
    await reload();
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectId: subject.id,
        title: taskTitle,
        dueDate: taskDate,
        weight: parseInt(taskWeight, 10) || 0,
        description: taskDesc,
        status: 'pending'
      })
    });
    setTaskTitle('');
    setTaskDate('');
    setTaskWeight('');
    setTaskDesc('');
    await reload();
  };

  const handleSaveTaskEdit = async (task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...task,
        title: editTaskDraft.title.trim() || task.title,
        dueDate: editTaskDraft.dueDate,
        weight: parseInt(editTaskDraft.weight, 10) || 0,
        grade: editTaskDraft.grade.trim(),
        description: editTaskDraft.description.trim()
      })
    });
    setEditingTaskId(null);
    await reload();
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', uploadFolder);
    await fetch(`/api/uploads/${subject.id}`, { method: 'POST', body: fd });
    await reload();
    e.target.value = '';
  };

  // =========================================================================
  // MODO EDICIÓN: Configuración paso a paso, tutor, ICS, temario y archivos
  // =========================================================================
  if (editMode) {
    return (
      <main className="app-container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '1.5rem' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: `2px dashed ${accent}`,
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{
              display: 'inline-block', fontSize: '0.72rem', fontWeight: 800,
              padding: '0.2rem 0.6rem', borderRadius: '999px',
              background: 'rgba(245, 158, 11, 0.16)', color: '#d97706', marginBottom: '0.35rem'
            }}>
              🛠️ MODO EDICIÓN DE AULA
            </span>
            <h1 style={{ margin: 0, fontSize: '1.35rem' }}>{subject.icon} {title || subject.title}</h1>
          </div>

          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handlePublishAndView}
              disabled={savingSetup}
              style={{
                padding: '0.55rem 1.05rem', borderRadius: '10px', border: 'none',
                background: accent, color: '#fff', fontWeight: 700, cursor: 'pointer'
              }}
            >
              {savingSetup ? 'Guardando...' : '👁️ Ver versión pública'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                padding: '0.55rem 0.9rem', borderRadius: '10px', border: '1px solid var(--border-subtle)',
                background: 'var(--bg-subtle)', color: 'var(--text-title)', cursor: 'pointer'
              }}
            >
              ← Inicio
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!window.confirm('¿Eliminar esta asignatura?')) return;
                await fetch(`/api/subjects/${subject.id}`, { method: 'DELETE' });
                navigate('/');
              }}
              style={{
                padding: '0.55rem 0.9rem', borderRadius: '10px', border: 'none',
                background: '#ef4444', color: '#fff', cursor: 'pointer'
              }}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Automatismos opcionales con la IA del usuario */}
          <section style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderLeft: '5px solid #8b5cf6',
            borderRadius: '16px',
            padding: '1.15rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.05rem' }}>🪄 Automatismos con tu IA (opcional · usa tus propios tokens)</h2>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Compatible con 3 formas de trabajar: <strong>1) Manual</strong> (pasos de abajo), <strong>2) IA web gratuita</strong> (ChatGPT + Pegar) o <strong>3) Tu propia API / Ollama</strong>.
                </p>
              </div>
              <span style={{
                fontSize: '0.74rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px',
                background: hasConfiguredAi ? 'rgba(34, 197, 94, 0.14)' : 'var(--bg-subtle)',
                color: hasConfiguredAi ? '#16a34a' : 'var(--text-muted)'
              }}>
                {hasConfiguredAi ? `✅ Conectada (${campus.config.aiProvider.toUpperCase()})` : '⚪ Sin API conectada (configúrala en Inicio → ✏️ Editar perfil)'}
              </span>
            </div>

            {hasConfiguredAi && (
              <form onSubmit={handleGenerateAutofill} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <textarea
                  rows="3"
                  placeholder="Describe la asignatura o pega tu guía docente (tutor, fechas de entregas, % de nota, bloques de temario)..."
                  value={autofillText}
                  onChange={(e) => setAutofillText(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.85rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                    {autofillFile ? `📎 ${autofillFile.name}` : '📎 Adjuntar Guía Docente (PDF / TXT / MD)'}
                    <input type="file" accept=".pdf,.txt,.md" hidden onChange={(e) => setAutofillFile(e.target.files?.[0] || null)} />
                  </label>
                  <button
                    type="submit"
                    disabled={aiBusy}
                    style={{ padding: '0.48rem 1rem', borderRadius: '8px', border: 'none', background: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer' }}
                  >
                    {aiBusy ? '⏳ Generando...' : '⚡ Autocompletar aula con mi IA'}
                  </button>
                </div>
              </form>
            )}

            {autofillMsg && (
              <div style={{ fontSize: '0.83rem', color: 'var(--text-title)' }}>{autofillMsg}</div>
            )}

            {autofillDraft && (
              <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
                <div><strong>👀 Vista previa del borrador:</strong></div>
                <div>• {autofillDraft.icon || '📚'} <strong>Tutor/a:</strong> {autofillDraft.teacher || '—'} · {autofillDraft.description || '—'}</div>
                <div>• 📅 <strong>{(autofillDraft.tasks || []).length}</strong> entregas/eventos detectados</div>
                <div>• 📖 <strong>{(autofillDraft.lessons || []).length}</strong> lecciones propuestas</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setAutofillDraft(null)} style={{ padding: '0.38rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer' }}>Descartar</button>
                  <button type="button" onClick={handleApplyAutofill} disabled={aiBusy} style={{ padding: '0.38rem 0.85rem', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>✅ Aplicar al aula</button>
                </div>
              </div>
            )}
          </section>

          {/* Paso 1: Información general y Tutor/a */}
          <section style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.08rem' }}>Paso 1 · Datos de la asignatura y Tutor/a</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Nombre de la asignatura
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Subtítulo / Descripción
                </label>
                <input
                  placeholder="Ej. Campus Oficial IOC · Módulo Profesional"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Código, Icono y Color
                </label>
                <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                  <input
                    placeholder="Código"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{ flex: 1, minWidth: 0, padding: '0.55rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                  <IconPicker value={icon} onChange={setIcon} subjectId={id} />
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ width: '42px', height: '38px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Categoría / Centro
                </label>
                <input
                  placeholder="Ej. General, Curso 1..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Nombre y apellidos del tutor/a
                </label>
                <input
                  placeholder="Nombre y apellidos del tutor/a"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Imagen del tutor/a (subir foto o pegar URL)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {teacherAvatar && (
                    <img
                      src={teacherAvatar}
                      alt="Vista previa tutor"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}` }}
                    />
                  )}
                  <input
                    placeholder="https://... o sube una imagen →"
                    value={teacherAvatar}
                    onChange={(e) => setTeacherAvatar(e.target.value)}
                    style={{ flex: 1, minWidth: 0, padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
                  />
                  <label style={{
                    padding: '0.55rem 0.85rem', borderRadius: '8px', background: accent,
                    color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap'
                  }}>
                    {uploadingAvatar ? 'Subiendo...' : '📷 Subir'}
                    <input type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Paso 2: Calendario ICS y Entregas */}
          <section style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.08rem' }}>Paso 2 · Calendario (.ics) y Eventos importantes ({tasks.length})</h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <label style={{
                  padding: '0.45rem 0.85rem', borderRadius: '8px', background: accent,
                  color: '#fff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer'
                }}>
                  📤 Importar archivo .ics
                  <input type="file" accept=".ics,text/calendar" hidden onChange={handleImportIcs} />
                </label>
                <a
                  href={`https://chatgpt.com/?q=${encodeURIComponent(AI_ICS_PROMPT)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, fontSize: '0.84rem', textDecoration: 'none'
                  }}
                >
                  🤖 Abrir en ChatGPT
                </a>
                <button
                  type="button"
                  onClick={() => setShowPasteAi((v) => !v)}
                  style={{
                    padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                    background: showPasteAi ? 'rgba(139, 92, 246, 0.14)' : 'var(--bg-subtle)',
                    color: 'var(--text-title)', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer'
                  }}
                >
                  ✨ Pegar respuesta IA
                </button>
                {hasConfiguredAi && (
                  <label style={{
                    padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#8b5cf6',
                    color: '#fff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer'
                  }}>
                    {aiBusy ? '⏳ Procesando...' : '⚡ Limpiar .ics con IA'}
                    <input type="file" accept=".ics,text/calendar" hidden onChange={(e) => handleAiTransformFile(e, 'ics')} />
                  </label>
                )}
                <a
                  href={`/api/scripts/calendar.ics?subjectId=${subject.id}`}
                  style={{
                    padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, fontSize: '0.84rem', textDecoration: 'none'
                  }}
                >
                  ⬇️ Descargar .ics de la asignatura
                </a>
              </div>
            </div>

            {icsFeedback && (
              <div style={{ padding: '0.55rem 0.85rem', borderRadius: '8px', background: 'var(--bg-subtle)', fontSize: '0.88rem' }}>
                {icsFeedback}
              </div>
            )}

            <IcsTutorialBox />

            <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                placeholder="Evento o entrega (ej. EAC 1, Examen parcial...)"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                style={{ flex: 2, minWidth: '180px', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                style={{ padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              />
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Peso %"
                value={taskWeight}
                onChange={(e) => setTaskWeight(e.target.value)}
                style={{ width: '82px', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              />
              <input
                placeholder="Contenidos / notas (opcional)"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                style={{ flex: 1.5, minWidth: '150px', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }}
              />
              <button type="submit" style={{ padding: '0.55rem 1rem', borderRadius: '8px', border: 'none', background: accent, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                + Añadir evento
              </button>
            </form>

            {tasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {tasks.map((t) => (
                  <div key={t.id} style={{
                    padding: '0.6rem 0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem'
                  }}>
                    {editingTaskId === t.id ? (
                      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <input
                          value={editTaskDraft.title}
                          onChange={(e) => setEditTaskDraft({ ...editTaskDraft, title: e.target.value })}
                          placeholder="Título"
                          style={{ flex: 2, minWidth: '160px', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }}
                        />
                        <input
                          type="date"
                          value={editTaskDraft.dueDate}
                          onChange={(e) => setEditTaskDraft({ ...editTaskDraft, dueDate: e.target.value })}
                          style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }}
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editTaskDraft.weight}
                          onChange={(e) => setEditTaskDraft({ ...editTaskDraft, weight: e.target.value })}
                          placeholder="Peso %"
                          style={{ width: '74px', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }}
                        />
                        <input
                          value={editTaskDraft.grade}
                          onChange={(e) => setEditTaskDraft({ ...editTaskDraft, grade: e.target.value })}
                          placeholder="Nota"
                          style={{ width: '74px', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }}
                        />
                        <input
                          value={editTaskDraft.description}
                          onChange={(e) => setEditTaskDraft({ ...editTaskDraft, description: e.target.value })}
                          placeholder="Notas / descripción"
                          style={{ flex: 2, minWidth: '150px', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }}
                        />
                        <button type="button" onClick={() => handleSaveTaskEdit(t)} style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: 'none', background: accent, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>💾</button>
                        <button type="button" onClick={() => setEditingTaskId(null)} style={{ padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer' }}>✕</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>{t.title}</span>
                          {t.dueDate && <span style={{ marginLeft: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>📅 {t.dueDate}</span>}
                          {t.weight > 0 && <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>⚖️ {t.weight}%</span>}
                          {t.grade && <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', fontWeight: 700, color: '#16a34a' }}>📝 Nota: {t.grade}</span>}
                          {t.description && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.description}</div>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTaskId(t.id);
                              setEditTaskDraft({
                                title: t.title || '',
                                dueDate: t.dueDate || '',
                                weight: t.weight ? String(t.weight) : '',
                                grade: t.grade || '',
                                description: t.description || ''
                              });
                            }}
                            title="Editar evento"
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                          >
                            ✏️
                          </button>
                          <button onClick={async () => { await fetch(`/api/tasks/${t.id}`, { method: 'DELETE' }); await reload(); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🗑️</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Paso 3: Temario y Archivos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <section style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.08rem' }}>Paso 3 · Temario ({lessons.length})</h2>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setShowBookPrompt((v) => !v)}
                    style={{ padding: '0.38rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {showBookPrompt ? 'Ocultar prompt' : '🤖 Prompt Libro'}
                  </button>
                  <a
                    href={`https://chatgpt.com/?q=${encodeURIComponent(BOOK_PROMPT)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '0.38rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}
                  >
                    🌐 Abrir ChatGPT
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowPasteAi((v) => !v)}
                    style={{
                      padding: '0.38rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                      background: showPasteAi ? 'rgba(139, 92, 246, 0.14)' : 'var(--bg-subtle)',
                      color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    ✨ Pegar respuesta IA
                  </button>
                  <input
                    placeholder="Bloque destino..."
                    value={importUnit}
                    onChange={(e) => setImportUnit(e.target.value)}
                    title="Unidad o bloque donde se guardará el PDF / MD importado (si el .md tiene # Bloques y ## Lecciones, se agrupan solos)"
                    style={{ width: '125px', padding: '0.38rem 0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.8rem' }}
                  />
                  <label style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: accent, color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                    📄 Importar PDF / MD
                    <input type="file" accept=".pdf,.md,.txt" hidden onChange={handleImportPdf} />
                  </label>
                  {hasConfiguredAi && (
                    <label style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                      {aiBusy ? '⏳...' : '⚡ Estructurar con IA'}
                      <input type="file" accept=".pdf,.md,.txt" hidden onChange={(e) => handleAiTransformFile(e, 'book')} />
                    </label>
                  )}
                </div>
              </div>
              {showPasteAi && (
                <form onSubmit={handlePasteAiImport} style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                    ✨ Pega aquí la respuesta de ChatGPT / Gemini (autodetecta si es calendario <code>.ics</code> o libro <code>.md</code>):
                  </div>
                  <textarea
                    rows="5"
                    placeholder="Pega aquí el texto BEGIN:VCALENDAR... o el Markdown # Bloque / ## Lección..."
                    value={pasteAiText}
                    onChange={(e) => setPasteAiText(e.target.value)}
                    style={{ padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)', fontSize: '0.82rem' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pasteAiStatus}</span>
                    <button type="submit" disabled={aiBusy} style={{ padding: '0.45rem 0.95rem', borderRadius: '8px', border: 'none', background: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                      {aiBusy ? 'Importando...' : '🚀 Autodetectar e importar'}
                    </button>
                  </div>
                </form>
              )}
              {showBookPrompt && (
                <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      📖 Pide a tu IA este formato (<code># Bloque</code> + <code>## Lección</code>) y la app lo acomodará automáticamente:
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(BOOK_PROMPT);
                          setCopiedBookPrompt(true);
                          setTimeout(() => setCopiedBookPrompt(false), 2500);
                        } catch {}
                      }}
                      style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', border: 'none', background: copiedBookPrompt ? '#16a34a' : '#8b5cf6', color: '#fff', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {copiedBookPrompt ? '✅ ¡Copiado!' : '📋 Copiar prompt'}
                    </button>
                  </div>
                  <pre style={{ margin: 0, padding: '0.6rem', borderRadius: '8px', background: 'var(--bg-card)', fontSize: '0.74rem', whiteSpace: 'pre-wrap', lineHeight: 1.4, color: 'var(--text-muted)' }}>
                    {BOOK_PROMPT}
                  </pre>
                </div>
              )}
              <form onSubmit={handleAddLesson} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  <input placeholder="Unidad / Bloque (ej. Bloque 1)" value={newLessonUnit} onChange={(e) => setNewLessonUnit(e.target.value)}
                    style={{ width: '42%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }} />
                  <input placeholder="Título de la lección..." value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }} />
                </div>
                <textarea rows="3" placeholder="Contenido en Markdown..." value={newLessonContent} onChange={(e) => setNewLessonContent(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)' }} />
                <button type="submit" style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 700, cursor: 'pointer' }}>+ Añadir lección</button>
              </form>
              {Object.entries(groupedLessons).map(([unitName, unitLessons]) => (
                <div key={unitName} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    📂 {unitName} ({unitLessons.length})
                  </div>
                  {unitLessons.map((l, idx) => (
                    <div key={l.id} style={{ padding: '0.5rem 0.7rem', borderRadius: '8px', background: 'var(--bg-subtle)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {editingLessonId === l.id ? (
                        <>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <input value={editLessonDraft.unit} onChange={(e) => setEditLessonDraft({ ...editLessonDraft, unit: e.target.value })} placeholder="Unidad"
                              style={{ width: '38%', padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }} />
                            <input value={editLessonDraft.title} onChange={(e) => setEditLessonDraft({ ...editLessonDraft, title: e.target.value })} placeholder="Título"
                              style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }} />
                          </div>
                          <textarea rows="4" value={editLessonDraft.content} onChange={(e) => setEditLessonDraft({ ...editLessonDraft, content: e.target.value })} placeholder="Markdown..."
                            style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-title)' }} />
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                            <button type="button" onClick={() => setEditingLessonId(null)} style={{ padding: '0.35rem 0.7rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer' }}>Cancelar</button>
                            <button type="button" onClick={() => handleSaveLessonEdit(l)} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: 'none', background: accent, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>💾 Guardar</button>
                          </div>
                        </>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.88rem' }}>{l.completed ? '✅' : '📘'} {l.title}</span>
                          <div style={{ display: 'flex', gap: '0.2rem', flexShrink: 0 }}>
                            <button type="button" disabled={idx === 0} onClick={() => handleMoveLesson(unitLessons, idx, -1)} title="Subir" style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'default' : 'pointer', opacity: idx === 0 ? 0.3 : 1 }}>↑</button>
                            <button type="button" disabled={idx === unitLessons.length - 1} onClick={() => handleMoveLesson(unitLessons, idx, 1)} title="Bajar" style={{ border: 'none', background: 'transparent', cursor: idx === unitLessons.length - 1 ? 'default' : 'pointer', opacity: idx === unitLessons.length - 1 ? 0.3 : 1 }}>↓</button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingLessonId(l.id);
                                setEditLessonDraft({ unit: l.unit || 'Unidad 1', title: l.title || '', content: l.content || l.summary || '' });
                              }}
                              title="Editar lección"
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                            >
                              ✏️
                            </button>
                            <button onClick={async () => { await fetch(`/api/lessons/${l.id}`, { method: 'DELETE' }); await reload(); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🗑️</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </section>

            <section style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.08rem' }}>Paso 4 · Archivos del aula ({uploads.length})</h2>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <select
                    value={uploadFolder}
                    onChange={(e) => setUploadFolder(e.target.value)}
                    style={{ padding: '0.38rem 0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.8rem' }}
                  >
                    <option value="temario">📁 Temario</option>
                    <option value="entregas">📁 Entregas</option>
                    <option value="calendario">📁 Calendario</option>
                    <option value="otros">📁 Otros</option>
                  </select>
                  <label style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: accent, color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                    ⬆️ Subir archivo
                    <input type="file" hidden onChange={handleUpload} />
                  </label>
                </div>
              </div>
              {uploads.length === 0 ? (
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>Aún no hay archivos subidos.</p>
              ) : (
                uploads.map((u) => (
                  <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'var(--bg-subtle)' }}>
                    <span style={{ fontSize: '0.88rem' }}>
                      📎 {u.originalName}
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', padding: '0.12rem 0.45rem', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-muted)', fontWeight: 700 }}>
                        {u.folder || 'otros'}
                      </span>
                    </span>
                    <button onClick={async () => { await fetch(`/api/uploads/${u.id}`, { method: 'DELETE' }); await reload(); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🗑️</button>
                  </div>
                ))
              )}
            </section>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handlePublishAndView}
              disabled={savingSetup}
              style={{
                padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none',
                background: accent, color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer'
              }}
            >
              {savingSetup ? 'Publicando...' : '🚀 Guardar y abrir versión pública del aula →'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // LANDING PUBLICADA / OPERATIVA (estilo aula Entornos de Desarrollo)
  // =========================================================================
  return (
    <main className="app-container" style={{ maxWidth: publicView === 'lessons' ? '1320px' : '1150px', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
      {/* Hero: oculto en Libro/Temario para dar prioridad al contenido con barra sticky compacta */}
      {publicView !== 'lessons' ? (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 310px)',
        gap: '1.5rem',
        alignItems: 'start',
        minHeight: '320px',
        marginBottom: '1.75rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '62px', height: '62px', borderRadius: '50%',
              background: accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
            }}>
              <SubjectIcon icon={subject.icon} size={32} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.9rem', lineHeight: 1.15 }}>{subject.title}</h1>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {subject.description || subject.category || 'Aula de asignatura'}
              </p>
            </div>
          </div>

          {/* Tutor + Barra de Progreso General */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', flexWrap: 'wrap' }}>
            {(subject.teacher || subject.teacherAvatar) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', minWidth: '64px' }}>
                {subject.teacherAvatar ? (
                  <img
                    src={subject.teacherAvatar}
                    alt={subject.teacher || 'Tutor/a'}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}` }}
                  />
                ) : (
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', border: `2px solid ${accent}`
                  }}>
                    👨‍🏫
                  </div>
                )}
                {subject.teacher && (
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem',
                    borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)'
                  }}>
                    {subject.teacher}
                  </span>
                )}
              </div>
            )}

            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ textAlign: 'center', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                PROGRESO GENERAL
              </div>
              <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(148, 163, 184, 0.25)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                <div style={{ width: `${progressPct}%`, height: '100%', background: accent, transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: '0.35rem', fontWeight: 800, color: accent, fontSize: '0.95rem' }}>
                {progressPct}%
              </div>
            </div>
          </div>

          {/* Pills de navegación operativa */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setPublicView('activities');
                  if (tasks.length > 0) {
                    setShowActivitiesDropdown((v) => !v);
                  }
                }}
                style={{
                  padding: '0.6rem 1.15rem', borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: publicView === 'activities' ? accent : 'var(--bg-card)',
                  color: publicView === 'activities' ? '#fff' : 'var(--text-title)',
                  fontWeight: 700, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                }}
              >
                <span>🎯 Actividades y Entregas ({tasks.length})</span>
                {tasks.length > 0 && <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>{showActivitiesDropdown ? '▴' : '▾'}</span>}
              </button>

              {showActivitiesDropdown && tasks.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  minWidth: '290px',
                  maxWidth: '380px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.14)',
                  padding: '0.4rem',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  {tasks.map((t) => {
                    const isSelected = selectedEacFichaId === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setPublicView('activities');
                          setSelectedEacFichaId(t.id);
                          setShowTutorial(false);
                          setShowActivitiesDropdown(false);
                          setTimeout(() => {
                            document.getElementById('eac-ficha-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 60);
                        }}
                        style={{
                          textAlign: 'left',
                          padding: '0.5rem 0.7rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: isSelected ? `${accent}18` : 'transparent',
                          color: isSelected ? accent : 'var(--text-title)',
                          fontWeight: isSelected ? 700 : 600,
                          fontSize: '0.83rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.status === 'done' ? '✅' : '🎯'} {t.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {[
              { id: 'lessons', label: `📖 Libro / Temario (${Object.keys(groupedLessons).length})` },
              { id: 'quizzes', label: `🧠 Quiz (${(campus?.quizzes || []).filter((q) => q.subjectId === subject.id).length})` }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setShowActivitiesDropdown(false);
                  setPublicView(item.id);
                }}
                style={{
                  padding: '0.6rem 1.15rem', borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: publicView === item.id ? accent : 'var(--bg-card)',
                  color: publicView === item.id ? '#fff' : 'var(--text-title)',
                  fontWeight: 700, cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <SubjectMiniCalendar tasks={tasks} accentColor={accent} subjectId={subject.id} />
      </div>
      ) : (
        <div
          id="subject-sticky-bar"
          style={{
          position: 'sticky',
          top: '78px',
          zIndex: 90,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '0.6rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          flexWrap: 'wrap',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <SubjectIcon icon={subject.icon} size={16} />
            </div>
            <strong style={{ fontSize: '0.98rem', color: 'var(--text-title)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {subject.title}
            </strong>
            <span style={{
              fontSize: '0.76rem', fontWeight: 800, color: accent,
              background: `${accent}18`, padding: '0.15rem 0.5rem', borderRadius: '999px', flexShrink: 0
            }}>
              {progressPct}%
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { id: 'activities', label: `Actividades y Entregas (${tasks.length})` },
              { id: 'lessons', label: `Libro / Temario (${Object.keys(groupedLessons).length})` },
              { id: 'quizzes', label: `Quiz (${(campus?.quizzes || []).filter((q) => q.subjectId === subject.id).length})` }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setShowActivitiesDropdown(false);
                  setPublicView(item.id);
                }}
                style={{
                  padding: '0.42rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: publicView === item.id ? accent : 'var(--bg-subtle)',
                  color: publicView === item.id ? '#fff' : 'var(--text-title)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vista Operativa: Actividades y Entregas */}
      {publicView === 'activities' && (
        <SubjectActivitiesView
          subject={subject}
          tasks={tasks}
          uploads={uploads}
          lessons={lessons}
          gestionData={gestionData}
          accent={accent}
          uploadingTaskId={uploadingTaskId}
          setUploadingTaskId={setUploadingTaskId}
          selectedEacFichaId={selectedEacFichaId}
          setSelectedEacFichaId={setSelectedEacFichaId}
          activeTutorialEacId={activeTutorialEacId}
          setActiveTutorialEacId={setActiveTutorialEacId}
          showTutorial={showTutorial}
          setShowTutorial={setShowTutorial}
          onReload={reload}
        />
      )}

      {/* Vista Operativa: Libro / Temario */}
      {publicView === 'lessons' && (
        <div
          id="book-content-top"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 315px) 1fr',
            gap: '1.25rem',
            alignItems: 'start',
            scrollMarginTop: '140px'
          }}
        >
          <SubjectBookSidebar
            lessons={lessons}
            groupedLessons={groupedLessons}
            collapsedUnits={collapsedUnits}
            setCollapsedUnits={setCollapsedUnits}
            activeLesson={activeLesson}
            accent={accent}
            slugifyHeading={slugifyHeading}
            bookSections={gestionData?.bookSections || []}
            onSelectLesson={(lessonId) => {
              setSelectedLessonId(lessonId);
              setRevealedQuiz({});
              requestAnimationFrame(() => {
                scrollElementBelowStickyBar(document.getElementById('book-content-top'));
              });
            }}
          />

          <article style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '2rem 2.25rem',
            minWidth: 0
          }}>
            {activeLesson ? (
              <>
                <header style={{ marginBottom: '1.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-muted)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}>
                        {subject.title}
                      </span>
                      {activeLesson.unit && (
                        <span style={{
                          background: `${accent}18`,
                          border: `1px solid ${accent}40`,
                          color: accent,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 700
                        }}>
                          {activeLesson.unit}
                        </span>
                      )}
                    </div>

                    <SubjectBookToolbar
                      subject={subject}
                      activeLesson={activeLesson}
                      unitNames={Object.keys(groupedLessons)}
                      accent={accent}
                      onOpenGamify={() => setShowGamifyModal(true)}
                      onOpenMaterialAgent={() => setShowMaterialAgentModal(true)}
                      onToggleLesson={async () => {
                        await fetch(`/api/lessons/${activeLesson.id}/toggle`, { method: 'PATCH' });
                        await reload();
                      }}
                    />
                  </div>

                  <h1 style={{
                    fontSize: '1.95rem',
                    fontWeight: 800,
                    color: 'var(--text-title)',
                    margin: '0 0 0.85rem',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    borderBottom: '2px solid var(--border-subtle)',
                    paddingBottom: '0.9rem'
                  }}>
                    {(() => {
                      const { numLabel } = getLessonNumbering(activeLesson, groupedLessons, gestionData?.bookSections || []);
                      return numLabel ? `${numLabel} ${activeLesson.title}` : activeLesson.title;
                    })()}
                  </h1>
                </header>

                {activeLesson.audioUrl && (
                  <PodcastPlayerCard
                    audioUrl={activeLesson.audioUrl}
                    title={`Media: ${activeLesson.title}`}
                    themeColor={accent}
                  />
                )}

                {/introducci[oó]n/i.test(activeLesson.title || '') && (
                  <PlatformLogosStrip
                    unitLessons={groupedLessons[activeLesson.unit] || []}
                    activeContent={activeLesson.content || activeLesson.summary}
                  />
                )}

                {/introducci[oó]n/i.test(activeLesson.title || '') && (
                  <UnitIntroDiagram
                    unitName={activeLesson.unit}
                    unitDiagrams={gestionData?.unitDiagrams}
                    accent={accent}
                    headingId="book-intro-diagram"
                    headingTitle=""
                  />
                )}

                <div id="book-intro-overview" className="topic-body" style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1.02rem' }}>
                  {(() => {
                    const { subPrefix } = getLessonNumbering(activeLesson, groupedLessons, gestionData?.bookSections || []);
                    const synced = syncLessonMarkdownAndHeadings(
                      activeLesson.content || activeLesson.summary,
                      activeLesson.title,
                      subPrefix
                    );
                    return (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={markdownComponents}
                      >
                        {synced.markdown}
                      </ReactMarkdown>
                    );
                  })()}
                </div>

                {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                  <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <h3 style={{ marginTop: 0 }}>Autoevaluación rápida</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {activeLesson.quiz.map((q, qi) => (
                        <div key={q.id || qi} style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px' }}>
                          <p style={{ margin: '0 0 0.6rem', fontWeight: 700 }}>{qi + 1}. {q.question}</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {(q.options || []).map((opt, oi) => {
                              const picked = revealedQuiz[qi] !== undefined;
                              const isSelected = revealedQuiz[qi] === oi;
                              const isCorrect = oi === q.correctIndex;
                              let bg = 'var(--bg-card)';
                              if (picked && isCorrect) bg = 'rgba(34, 197, 94, 0.2)';
                              else if (picked && isSelected && !isCorrect) bg = 'rgba(239, 68, 68, 0.2)';
                              return (
                                <button
                                  key={oi}
                                  onClick={() => setRevealedQuiz({ ...revealedQuiz, [qi]: oi })}
                                  style={{
                                    textAlign: 'left', padding: '0.55rem 0.85rem', borderRadius: '8px',
                                    border: '1px solid var(--border-subtle)', background: bg, cursor: 'pointer', color: 'var(--text-title)'
                                  }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {revealedQuiz[qi] !== undefined && q.explanation && (
                            <p style={{ margin: '0.6rem 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                              {q.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {lessons.length > 1 && (
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
                    marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <button
                      type="button"
                      disabled={activeLessonIndex <= 0}
                      onClick={() => {
                        if (activeLessonIndex > 0) {
                          setSelectedLessonId(lessons[activeLessonIndex - 1].id);
                          setRevealedQuiz({});
                          requestAnimationFrame(() => {
                            scrollElementBelowStickyBar(document.getElementById('book-content-top'));
                          });
                        }
                      }}
                      style={{
                        padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-subtle)', color: 'var(--text-title)', fontWeight: 600,
                        cursor: activeLessonIndex <= 0 ? 'default' : 'pointer', opacity: activeLessonIndex <= 0 ? 0.45 : 1
                      }}
                    >
                      ← Lección anterior
                    </button>
                    {activeLessonIndex < lessons.length - 1 && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (!activeLesson.completed) {
                            await fetch(`/api/lessons/${activeLesson.id}/toggle`, { method: 'PATCH' });
                            await reload();
                          }
                          setSelectedLessonId(lessons[activeLessonIndex + 1].id);
                          setRevealedQuiz({});
                          requestAnimationFrame(() => {
                            scrollElementBelowStickyBar(document.getElementById('book-content-top'));
                          });
                        }}
                        style={{
                          padding: '0.55rem 1.1rem', borderRadius: '10px', border: 'none',
                          background: accent, color: '#fff', fontWeight: 700, cursor: 'pointer'
                        }}
                      >
                        {activeLesson.completed ? 'Siguiente lección →' : 'Completar y siguiente →'}
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : <p style={{ color: 'var(--text-muted)' }}>Pulsa <strong>Editar asignatura</strong> para añadir o importar apuntes.</p>}
          </article>

          <LessonLightboxModal
            image={lightboxImg}
            zoom={lightboxZoom}
            setZoom={setLightboxZoom}
            onClose={() => setLightboxImg(null)}
          />
        </div>
      )}

      {/* Vista Operativa: Quizzes */}
      {publicView === 'quizzes' && (
        <SubjectQuizzesPanel
          subject={subject}
          quizzes={(campus?.quizzes || []).filter((q) => q.subjectId === subject.id)}
          units={Object.keys(groupedLessons)}
          accent={accent}
          onChanged={reload}
        />
      )}

      {/* Vista Operativa: Archivos */}
      {publicView === 'uploads' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.25rem' }}>
          {uploads.length === 0 ? (
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>No hay archivos en esta asignatura. Pulsa <strong>✏️ Editar asignatura</strong> para subir documentos.</p>
          ) : (
            uploads.map((u) => (
              <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem', borderRadius: '10px', background: 'var(--bg-subtle)', marginBottom: '0.5rem' }}>
                <span>
                  📎 {u.originalName}
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', padding: '0.12rem 0.45rem', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    📁 {u.folder || 'otros'}
                  </span>
                </span>
                <a href={`/api/uploads/${subject.id}/${u.storedName}`}>⬇️ Descargar</a>
              </div>
            ))
          )}
        </div>
      )}
      <SubjectGamifyModal
        isOpen={showGamifyModal}
        onClose={() => setShowGamifyModal(false)}
        subject={subject}
        units={Object.keys(groupedLessons)}
        defaultUnit={activeLesson?.unit || ''}
        accent={accent}
        onGenerated={async () => {
          await reload();
          setPublicView('quizzes');
        }}
      />
      <MaterialAgentModal
        isOpen={showMaterialAgentModal}
        onClose={() => setShowMaterialAgentModal(false)}
        subject={subject}
        groupedLessons={groupedLessons}
        activeLesson={activeLesson}
        activeUnitLabel={activeLesson?.unit}
        onApplied={reload}
        accent={accent}
      />
    </main>
  );
}
