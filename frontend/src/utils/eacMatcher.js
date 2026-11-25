/**
 * Empareja una tarea de SQLite con su entrada correspondiente en gestionData.eacs.
 */
export function matchEacForTask(task, eacList = []) {
  if (!task || !Array.isArray(eacList) || eacList.length === 0) return null;
  const tLower = (task.title || '').toLowerCase();
  return eacList.find((e) => {
    const eLower = (e.title || '').toLowerCase();
    if (eLower === tLower) return true;
    const m = e.id?.match(/^(eac|eaf)(\d+)/i);
    if (m) {
      const tag = `${m[1]} ${m[2]}`.toLowerCase();
      const tagCompact = `${m[1]}${m[2]}`.toLowerCase();
      return tLower.includes(tag) || tLower.includes(tagCompact);
    }
    return false;
  }) || null;
}

/**
 * Extrae la etiqueta de peso AC de una tarea o su EAC asociada (ej. "45% AC").
 */
export function getAcWeightLabel(task, matchedEac) {
  return matchedEac?.weight
    || (task?.weight > 0 ? `${task.weight}% AC` : null)
    || task?.title?.match(/(\d+(?:[.,]\d+)?%\s*AC)/i)?.[1]
    || null;
}
