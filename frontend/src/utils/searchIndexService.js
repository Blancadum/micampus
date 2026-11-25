/**
 * searchIndexService
 * Construye dinámicamente el índice unificado de búsqueda desde /api/campus
 * cubriendo asignaturas, grupos, lecciones completas (Markdown), conceptos clave (encabezados),
 * preguntas de autoevaluación (quiz) y entregas/eventos (.ics).
 */

import { getSubjectUrl } from './subjectRoutes.js';

let memoryIndexCache = null;
let pendingPromise = null;

export function invalidateSearchIndexCache() {
  memoryIndexCache = null;
  pendingPromise = null;
  try {
    sessionStorage.removeItem('micampus_dynamic_search_index');
  } catch (_) {}
}

export function getCachedSearchIndex() {
  if (memoryIndexCache && memoryIndexCache.length > 0) {
    return memoryIndexCache;
  }
  try {
    const cached = sessionStorage.getItem('micampus_dynamic_search_index');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryIndexCache = parsed;
        return parsed;
      }
    }
  } catch (_) {}
  return [];
}

function buildCampusSearchIndex(campusData) {
  if (!campusData) return [];
  const items = [];
  const groups = campusData.groups || [];
  const subjectById = new Map((campusData.subjects || []).map((s) => [s.id, s]));

  // 1. Asignaturas
  for (const s of campusData.subjects || []) {
    items.push({
      id: `sub-${s.id}`,
      title: s.title,
      type: 'Materia',
      course: s.code || s.shortTitle || s.category || 'Asignatura',
      snippet: s.description || (s.teacher ? `Tutor/a: ${s.teacher}` : 'Aula de asignatura'),
      keywords: `${s.title} ${s.code || ''} ${s.category || ''} ${s.teacher || ''}`,
      route: getSubjectUrl(s, groups)
    });
  }

  // 2. Lecciones completas + conceptos clave (encabezados Markdown) + preguntas de quiz
  for (const l of campusData.lessons || []) {
    const sub = subjectById.get(l.subjectId);
    const courseLabel = sub ? (sub.code || sub.shortTitle || sub.title) : 'Temario';
    const baseRoute = sub ? getSubjectUrl(sub, groups) : `/asignatura/${l.subjectId}`;
    const route = `${baseRoute}?tab=lessons&lesson=${l.id}`;
    const fullText = `${l.summary || ''}\n${l.content || ''}`;
    const quizText = (l.quiz || []).map((q) => `${q.question} ${q.answer}`).join(' ');

    items.push({
      id: `lesson-${l.id}`,
      title: l.title,
      type: 'Lección',
      course: `${courseLabel} · ${l.unit || 'Temario'}`,
      snippet: (l.summary || l.content || '').replace(/[#*_`>]/g, '').slice(0, 140),
      content: `${fullText} ${quizText}`,
      keywords: `${l.unit || ''} ${l.title}`,
      route
    });

    // Extraer encabezados (#, ##, ###) como conceptos clave indexados del libro
    const headingMatches = (l.content || '').match(/^#{1,3}\s+.+$/gm) || [];
    headingMatches.forEach((rawHeading, idx) => {
      const cleanHeading = rawHeading.replace(/^#{1,3}\s+/, '').trim();
      if (!cleanHeading || cleanHeading.toLowerCase() === (l.title || '').toLowerCase()) return;
      items.push({
        id: `concept-${l.id}-${idx}`,
        title: cleanHeading,
        type: 'Glosario',
        course: `${courseLabel} · ${l.title}`,
        snippet: `Concepto en ${l.unit || 'Temario'} → ${l.title}`,
        content: fullText,
        keywords: `${cleanHeading} ${l.title} ${courseLabel}`,
        route
      });
    });
  }

  // 3. Entregas y eventos (.ics)
  for (const t of campusData.tasks || []) {
    const sub = subjectById.get(t.subjectId);
    const courseLabel = sub ? (sub.code || sub.shortTitle || sub.title) : 'Entrega';
    const baseRoute = sub ? getSubjectUrl(sub, groups) : `/asignatura/${t.subjectId}`;
    items.push({
      id: `task-${t.id}`,
      title: t.title,
      type: 'EAC',
      course: `${courseLabel}${t.dueDate ? ` · ${t.dueDate}` : ''}`,
      snippet: t.description || (t.dueDate ? `Fecha límite: ${t.dueDate}` : 'Actividad de asignatura'),
      keywords: `${t.title} ${t.description || ''} ${t.dueDate || ''}`,
      route: `${baseRoute}?tab=activities`
    });
  }

  return items;
}

export async function fetchSearchIndex(forceRefresh = false) {
  if (!forceRefresh && memoryIndexCache && memoryIndexCache.length > 0) {
    return memoryIndexCache;
  }

  if (!forceRefresh) {
    const cached = getCachedSearchIndex();
    if (cached.length > 0) {
      return cached;
    }
    if (pendingPromise) {
      return pendingPromise;
    }
  }

  pendingPromise = fetch('/api/campus')
    .then((res) => {
      if (!res.ok) throw new Error('Error al cargar índice de búsqueda');
      return res.json();
    })
    .then((campusData) => {
      const built = buildCampusSearchIndex(campusData);
      memoryIndexCache = built;
      try {
        sessionStorage.setItem('micampus_dynamic_search_index', JSON.stringify(built));
      } catch (_) {}
      pendingPromise = null;
      return built;
    })
    .catch(() => {
      pendingPromise = null;
      return [];
    });

  return pendingPromise;
}
