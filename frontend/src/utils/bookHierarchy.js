export function scrollElementBelowStickyBar(el) {
  if (!el) return;
  const stickyOffset = 152;
  const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - stickyOffset);
  window.scrollTo({ top: targetY, behavior: 'auto' });
  requestAnimationFrame(() => {
    const barBottom = document.getElementById('subject-sticky-bar')?.getBoundingClientRect().bottom;
    if (!barBottom) return;
    const diff = el.getBoundingClientRect().top - (barBottom + 14);
    if (Math.abs(diff) > 2) {
      window.scrollTo({ top: Math.max(0, window.scrollY + diff), behavior: 'auto' });
    }
  });
}

export function slugifyHeading(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function buildUnitEntries(unitLessons, unitCode, bookSections = []) {
  const unitRules = (bookSections || []).filter(
    (r) => !r.unit || r.unit.toUpperCase() === unitCode.toUpperCase()
  );

  const entries = [];
  const sectionIndexByName = new Map();

  for (const l of unitLessons) {
    const titleLower = (l.title || '').toLowerCase();
    const matchedRule = unitRules.find((r) =>
      (r.match || []).some((kw) => titleLower.includes(kw.toLowerCase()))
    );

    if (!matchedRule) {
      entries.push({ type: 'lesson', lesson: l });
    } else {
      const secName = matchedRule.section;
      if (!sectionIndexByName.has(secName)) {
        sectionIndexByName.set(secName, entries.length);
        entries.push({ type: 'section', title: secName, lessons: [] });
      }
      entries[sectionIndexByName.get(secName)].lessons.push(l);
    }
  }

  return entries;
}

/**
 * Devuelve { numLabel, subPrefix } para una lección dentro de groupedLessons + bookSections.
 */
export function getLessonNumbering(lesson, groupedLessons, bookSections = []) {
  if (!lesson || !groupedLessons) return { numLabel: '', subPrefix: '' };
  const unitEntries = Object.entries(groupedLessons);
  for (let unitIdx = 0; unitIdx < unitEntries.length; unitIdx++) {
    const [unitName, unitLessons] = unitEntries[unitIdx];
    const uNumMatch = unitName.match(/(?:U|Unidad|Bloque)\s*(\d+)/i);
    const uNum = uNumMatch ? uNumMatch[1] : String(unitIdx + 1);
    const entries = buildUnitEntries(unitLessons, `U${uNum}`, bookSections);

    for (let entryIdx = 0; entryIdx < entries.length; entryIdx++) {
      const entry = entries[entryIdx];
      const topNum = entryIdx + 1;
      if (entry.type === 'lesson' && entry.lesson.id === lesson.id) {
        return { numLabel: `${topNum}.`, subPrefix: `${topNum}.` };
      }
      if (entry.type === 'section') {
        const subIdx = entry.lessons.findIndex((l) => l.id === lesson.id);
        if (subIdx !== -1) {
          return {
            numLabel: `${topNum}.${subIdx + 1}.`,
            subPrefix: `${topNum}.${subIdx + 1}.`,
          };
        }
      }
    }
  }
  return { numLabel: '', subPrefix: '' };
}

function isDuplicateLessonHeading(rawHeading, lessonTitle) {
  const cleanHeading = String(rawHeading || '')
    .replace(/[*_`]/g, '')
    .replace(/^\d+(?:\.\d+)*\.?\s+/, '')
    .trim();
  const headingNorm = slugifyHeading(cleanHeading);
  const titleNorm = slugifyHeading(lessonTitle);
  return Boolean(
    headingNorm && titleNorm && (
      headingNorm === titleNorm
      || titleNorm.includes(headingNorm)
      || headingNorm.includes(titleNorm)
    )
  );
}

/**
 * Sincroniza los encabezados ## y ### del markdown con la numeración del índice lateral
 * y devuelve { markdown, subHeadings }.
 */
export function syncLessonMarkdownAndHeadings(md, lessonTitle, subPrefix = '') {
  if (!md) return { markdown: '', subHeadings: [] };

  const isIntro = /introducci[oó]n/i.test(lessonTitle || '');
  let text = md;
  const leadMatch = text.match(/^#{1,3}\s+([^\n]+)\n+/);
  if (leadMatch && isDuplicateLessonHeading(leadMatch[1], lessonTitle)) {
    text = text.slice(leadMatch[0].length);
  }
  if (isIntro) {
    text = text
      .replace(/^#{1,3}\s+(?:\d+(?:\.\d+)*\.?\s*)?Visi[oó]n general del bloque\s*\n+/im, '')
      .replace(/^\s*(?:Bienvenido|Benvingut)[^\n]*\n+/i, '');
  }

  const subHeadings = [];
  let subCounter = 0;
  const lines = text.split('\n');
  let inCodeFence = false;

  const updatedLines = lines.map((line) => {
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      return line;
    }
    if (inCodeFence) return line;

    const m = line.match(/^(#{2,4})\s+(.+)$/);
    if (!m) return line;

    const hashes = m[1].length > 3 ? '###' : m[1];
    const level = hashes.length;
    const rawText = m[2].replace(/[*_`]/g, '').trim();
    const cleanLabel = rawText.replace(/^\d+(?:\.\d+)*\.?\s+/, '').trim();
    if (!cleanLabel) return line;
    if (isDuplicateLessonHeading(cleanLabel, lessonTitle)) return null;
    if (isIntro && /visi[oó]n general del bloque/i.test(cleanLabel)) return null;

    subCounter += 1;
    const numberedLabel = subPrefix ? `${subPrefix}${subCounter}. ${cleanLabel}` : cleanLabel;
    subHeadings.push({
      level,
      label: numberedLabel,
      slug: slugifyHeading(numberedLabel),
    });
    return `${hashes} ${numberedLabel}`;
  }).filter((line) => line !== null);

  return { markdown: updatedLines.join('\n'), subHeadings };
}
