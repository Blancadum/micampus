/**
 * Cliente ligero para interactuar con los agentes IA y documentos normalizados.
 */

export async function fetchAgents() {
  const res = await fetch('/api/agents');
  if (!res.ok) throw new Error(`Error cargando agentes (${res.status})`);
  return res.json();
}

export async function runAgent(agentId, params = {}) {
  const res = await fetch(`/api/agents/${encodeURIComponent(agentId)}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  if (!res.ok) throw new Error(`Error ejecutando agente ${agentId} (${res.status})`);
  return res.json();
}

export async function runMaterialPipeline(subjectCode, unit) {
  const res = await fetch('/api/agents/pipeline/material', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subjectCode, unit })
  });
  if (!res.ok) throw new Error(`Error en pipeline auditor -> escritor (${res.status})`);
  return res.json();
}

export async function listNormalizedDocuments({ subjectCode, eacId, kind } = {}) {
  const qs = new URLSearchParams();
  if (subjectCode) qs.set('subjectCode', subjectCode);
  if (eacId) qs.set('eacId', eacId);
  if (kind) qs.set('kind', kind);
  const query = qs.toString();
  const res = await fetch(`/api/documents${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error(`Error listando documentos (${res.status})`);
  return res.json();
}

export async function syncNormalizedDocuments() {
  const res = await fetch('/api/documents/sync', { method: 'POST' });
  if (!res.ok) throw new Error(`Error sincronizando documentos (${res.status})`);
  return res.json();
}

export async function chatWithAgent({ agentId, subjectCode, unit, messages }) {
  const res = await fetch('/api/agents/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentId, subjectCode, unit, messages })
  });
  if (!res.ok) throw new Error(`Error en chat con agente (${res.status})`);
  return res.json();
}

export async function updateLessonContent(lesson, newContent) {
  const res = await fetch(`/api/lessons/${encodeURIComponent(lesson.id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...lesson,
      content: newContent
    })
  });
  if (!res.ok) throw new Error(`Error actualizando lección (${res.status})`);
  return res.json();
}

export async function createLessonFromAi({ subjectId, unit, title, content, orderIndex = 99 }) {
  const res = await fetch('/api/lessons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subjectId,
      unit,
      title,
      summary: '',
      content,
      completed: false,
      orderIndex
    })
  });
  if (!res.ok) throw new Error(`Error creando lección (${res.status})`);
  return res.json();
}

export async function saveGlossaryConceptsToSearch(rawText) {
  const res = await fetch('/api/search/glossary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawText })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Error guardando glosario (${res.status})`);
  return data;
}

export async function sendToTelegram(text) {
  const res = await fetch('/api/agents/notify-telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error(`Error enviando a Telegram (${res.status})`);
  return res.json();
}
