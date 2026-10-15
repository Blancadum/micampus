/**
 * ============================================================================
 * @package     MiCampus.Backend
 * @module      Server
 * @description Servidor API ligero para la gestión de entregas, uploads y sincronización de calendarios.
 * 
 * ESTRUCTURA DE CALENDARIOS:
 *  - exports/todo.ics : Calendario dinámico generado en tiempo real con las EACs en estado 'pending'.
 * 
 * @author      Blanca
 * @version     2.0.0
 * @since       2026-10-08
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'MiCampus API',
    status: 'ok',
    frontend: 'http://localhost:5173',
    endpoints: ['/api/eac/status', '/api/upload/:subjectId']
  });
});

// Paths
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SUBJECTS_DIR = path.join(PUBLIC_DIR, 'data', 'ioc', 'gestion');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads', 'ioc');
const CALENDARS_PUBLIC_DIR = path.join(PUBLIC_DIR, 'data', 'calendars', 'exports');
const CALENDARS_ROOT_DIR = path.join(__dirname, '..', 'data', 'calendars', 'exports');

// Ensure directories exist
[UPLOADS_DIR, CALENDARS_PUBLIC_DIR, CALENDARS_ROOT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subjectId = req.params.subjectId;
    const dest = path.join(UPLOADS_DIR, subjectId);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Helper: Generador de Calendario .ics
function generateCalendar() {
  let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MiCampus//NONSGML v1.0//EN\r\n`;

  const files = fs.readdirSync(SUBJECTS_DIR).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(SUBJECTS_DIR, file), 'utf-8'));
    const subjectId = data.id.toUpperCase();

    data.eacs.forEach(eac => {
      // Solo metemos en el calendario las pendientes
      if (eac.status === 'pending' && eac.dueDate) {
        // eac.dueDate = "2026-10-31" -> "20261031"
        const dateStr = eac.dueDate.replace(/-/g, '');
        
        icsContent += `BEGIN:VEVENT\r\n`;
        icsContent += `UID:${eac.id}-${data.id}@micampus.local\r\n`;
        icsContent += `DTSTAMP:20261006T000000Z\r\n`;
        icsContent += `DTSTART;VALUE=DATE:${dateStr}\r\n`;
        icsContent += `SUMMARY:Entrega ${eac.title} [${subjectId}]\r\n`;
        icsContent += `DESCRIPTION:Entrega pendiente de la asignatura ${data.title}\r\n`;
        icsContent += `STATUS:CONFIRMED\r\n`;
        
        // Alarma 2 días antes
        icsContent += `BEGIN:VALARM\r\n`;
        icsContent += `TRIGGER:-P2D\r\n`;
        icsContent += `ACTION:DISPLAY\r\n`;
        icsContent += `DESCRIPTION:Recordatorio de entrega de ${subjectId}\r\n`;
        icsContent += `END:VALARM\r\n`;
        
        icsContent += `END:VEVENT\r\n`;
      }
    });
  });

  icsContent += `END:VCALENDAR\r\n`;
  fs.writeFileSync(path.join(CALENDARS_PUBLIC_DIR, 'todo.ics'), icsContent);
  fs.writeFileSync(path.join(CALENDARS_ROOT_DIR, 'todo.ics'), icsContent);
}

// 1. Endpoint: Subir archivo
app.post('/api/upload/:subjectId', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'Archivo subido correctamente', filename: req.file.filename });
});

// 2. Endpoint: Cambiar estado de EAC (y regenerar progreso + calendario)
app.put('/api/eac/status', (req, res) => {
  const { subjectId, eacId, status } = req.body;
  if (!subjectId || !eacId || !status) return res.status(400).json({ error: 'Faltan parámetros' });

  const filePath = path.join(SUBJECTS_DIR, `${subjectId}.json`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Asignatura no encontrada' });

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let found = false;

  data.eacs.forEach(eac => {
    if (eac.id === eacId) {
      eac.status = status;
      found = true;
    }
  });

  if (!found) return res.status(404).json({ error: 'EAC no encontrada' });

  // Recalcular el progreso general (basado en cuantas están 'done')
  const total = data.eacs.length;
  const done = data.eacs.filter(e => e.status === 'done').length;
  data.progress = Math.round((done / total) * 100);

  // Guardar JSON
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // Regenerar el calendario global
  generateCalendar();

  res.json({ message: 'Estado actualizado y calendario regenerado', progress: data.progress });
});

// Ejecutar generador al arrancar para asegurar que existe el .ics base
try {
  generateCalendar();
  console.log('✅ Calendario base todo.ics generado.');
} catch(e) {
  console.log('No se pudo generar el calendario base.', e);
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Motor de entregas activo en http://localhost:${PORT}`);
});
