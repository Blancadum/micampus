const IOC_CODE_TO_SLUG = {
  desp: 'despliegue',
  ent: 'entornos',
  digi: 'digitalizacion',
  int: 'interfaces',
  ipo2: 'ipo2'
};

export function slugifySegment(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getSubjectSlug(sub) {
  if (!sub) return '';
  const codeLower = (sub.code || '').trim().toLowerCase();
  if (IOC_CODE_TO_SLUG[codeLower]) {
    return IOC_CODE_TO_SLUG[codeLower];
  }
  return slugifySegment(sub.code || sub.shortTitle || sub.title || sub.id);
}

export function getGroupSlug(sub, groups = []) {
  if (!sub) return 'asignatura';
  const group = groups.find((g) => g.id === sub.groupId);
  const raw = (group?.title || sub.category || '').trim();
  const norm = slugifySegment(raw);
  if (norm === 'ioc' || norm === 'ioc-daw') return 'ioc';
  if (norm.includes('java') && norm.includes('spring')) return 'java-spring';
  if (norm.includes('sepe')) return 'sepe';
  if (norm.includes('second-brain')) return 'second-brain';
  return norm || 'asignatura';
}

export function getSubjectUrl(sub, groups = []) {
  if (!sub) return '/';
  const groupSlug = getGroupSlug(sub, groups);
  const subjectSlug = getSubjectSlug(sub);
  if (!groupSlug || !subjectSlug) return `/asignatura/${sub.id}`;
  return `/${groupSlug}/${subjectSlug}`;
}

export function resolveSubjectFromParams({ id, groupSlug, subjectSlug }, subjects = [], groups = []) {
  if (!Array.isArray(subjects) || subjects.length === 0) return null;

  if (id) {
    const byId = subjects.find((s) => s.id === id);
    if (byId) return byId;
    const idNorm = slugifySegment(id);
    const byCodeOrSlug = subjects.find((s) =>
      getSubjectSlug(s) === idNorm ||
      slugifySegment(s.code) === idNorm ||
      slugifySegment(s.title) === idNorm
    );
    if (byCodeOrSlug) return byCodeOrSlug;
  }

  if (subjectSlug) {
    const subNorm = slugifySegment(subjectSlug);
    const grpNorm = slugifySegment(groupSlug);

    const exact = subjects.find((s) =>
      getSubjectSlug(s) === subNorm && (!grpNorm || getGroupSlug(s, groups) === grpNorm)
    );
    if (exact) return exact;

    return subjects.find((s) =>
      getSubjectSlug(s) === subNorm ||
      slugifySegment(s.code) === subNorm ||
      slugifySegment(s.title) === subNorm
    ) || null;
  }

  return null;
}
