const apiInput = document.getElementById('apiBase');
const syncBtn = document.getElementById('syncBtn');
const allCoursesBtn = document.getElementById('allCoursesBtn');
const overviewBtn = document.getElementById('overviewBtn');
const statusEl = document.getElementById('status');

chrome.storage.local.get(['micampusUrl'], (res) => {
  if (res.micampusUrl) apiInput.value = res.micampusUrl;
});

overviewBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://ioc.xtec.cat/campus/grade/report/overview/index.php' });
});

allCoursesBtn.addEventListener('click', async () => {
  const baseUrl = (apiInput.value || 'http://localhost:8090').trim().replace(/\/+$/, '');
  chrome.storage.local.set({ micampusUrl: baseUrl });
  try {
    const res = await fetch(`${baseUrl}/api/ioc/courses`);
    const courses = await res.json();
    if (!Array.isArray(courses) || courses.length === 0) {
      statusEl.textContent = 'Configura primero los IDs de tus asignaturas en MiCampus → Correo IOC y Chrome.';
      return;
    }
    courses.forEach((c) => {
      chrome.tabs.create({ url: `https://ioc.xtec.cat/campus/grade/report/user/index.php?id=${encodeURIComponent(c.iocCourseId)}`, active: false });
    });
    statusEl.textContent = `🚀 Abiertas ${courses.length} pestañas del IOC; al cargar se auto-sincronizan solas.`;
  } catch (err) {
    statusEl.textContent = `❌ Error: ${err.message}`;
  }
});

syncBtn.addEventListener('click', async () => {
  const baseUrl = (apiInput.value || 'http://localhost:8090').trim().replace(/\/+$/, '');
  chrome.storage.local.set({ micampusUrl: baseUrl });
  statusEl.textContent = 'Leyendo notas del IOC...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('No hay pestaña activa.');

    const response = await chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_IOC_GRADES' });
    const grades = response?.grades || [];
    if (grades.length === 0) {
      statusEl.textContent = 'No se detectaron notas en esta pestaña. Entra en Qualificacions del IOC.';
      return;
    }

    const res = await fetch(`${baseUrl}/api/ioc/grades-sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: response?.courseId || '', grades }),
    });
    const data = await res.json();
    statusEl.textContent = `✅ Leídas ${data.received} notas; ${data.updatedCount} actualizadas en MiCampus.`;
  } catch (err) {
    statusEl.textContent = `❌ Error: ${err.message}. Recarga la pestaña del IOC y comprueba que MiCampus está encendido.`;
  }
});
