// Lee notas tanto en /grade/report/... (user/overview) como en /course/user.php?mode=grade...
function extractIocGrades() {
  const grades = [];
  const rows = document.querySelectorAll('table.user-grade tbody tr, table#overview-grade tbody tr, table.generaltable tbody tr');
  rows.forEach((tr) => {
    const titleEl = tr.querySelector('th a, th .gradeitemheader, td.column-itemname a, td.column-itemname, td.c0 a, td.c0');
    const gradeEl = tr.querySelector('td.column-grade, td.cell.c2, td.c1, td.grade');
    const title = (titleEl?.textContent || '').trim();
    const grade = (gradeEl?.textContent || '').trim();
    if (title && grade && grade !== '-' && !/^(total|mitjana)/i.test(title)) {
      grades.push({ title, grade });
    }
  });
  return grades;
}

function extractCourseId() {
  return new URLSearchParams(location.search).get('id') || '';
}

async function syncGradesWithMiCampus(grades) {
  if (!grades || grades.length === 0) return null;
  const stored = await chrome.storage.local.get(['micampusUrl']);
  const baseUrl = (stored.micampusUrl || 'http://localhost:8090').trim().replace(/\/+$/, '');
  const res = await fetch(`${baseUrl}/api/ioc/grades-sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId: extractCourseId(), grades }),
  });
  return res.json();
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type !== 'EXTRACT_IOC_GRADES') return;
  sendResponse({ courseId: extractCourseId(), grades: extractIocGrades(), pageTitle: document.title });
});

// Auto-sincronización silenciosa al abrir cualquier página de Qualificacions en el IOC
const isIocGradesPage =
  location.pathname.includes('/grade/report/') ||
  (location.pathname.includes('/course/user.php') && location.search.includes('mode=grade'));

if (isIocGradesPage) {
  const grades = extractIocGrades();
  if (grades.length > 0) {
    syncGradesWithMiCampus(grades).catch(() => {});
  }
}
