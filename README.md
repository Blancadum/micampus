# 🎓 MiCampus (Edición Java + React)

Plataforma de estudio autoejecutable para organizar asignaturas del IOC, temarios interactivos, entregas (EACs / PAFs), calendarios, apuntes normalizados y agentes de IA conectados al material oficial.

---

## 🚀 Inicio rápido

1. **Ejecución directa:**
   - Haz doble clic en `Iniciar-MiCampus.command` (macOS) o `Iniciar-MiCampus.bat` (Windows), o ejecuta:
     ```bash
     java -jar target/MiCampus.jar
     ```
   - La aplicación arranca en `http://localhost:8090` (configurable con `PORT`).
   - Los datos se almacenan de forma portable en `./micampus-data/` (base de datos SQLite en `micampus-data/micampus.db`).

2. **Compilar desde cero:**
   ```bash
   ./build-app.sh
   ```
   > Al ejecutar `npm run build` dentro de `frontend/`, los JSON de `frontend/public/data/ioc/gestion/*.json` se copian automáticamente a `src/main/resources/static/data/ioc/gestion/`.

---

## 🛠️ Stack tecnológico

- **Backend:** Java 17, Spring Boot 3.4.0, SQLite (`micampus-data/micampus.db`), Apache PDFBox 3.0.3 (`pom.xml`).
- **Frontend:** React 19, Vite 6, React Router 7 (`frontend/`).
- **Despliegue y extras:** `Dockerfile`, `docker-compose.yml`, `render.yaml`, scripts de servicio en macOS (`instalar-servicio-mac.sh` / `desinstalar-servicio-mac.sh`), extensión de navegador (`chrome-extension/`) y copias de seguridad en `.zip`.

### Variables de entorno principales (`src/main/resources/application.properties`)

| Variable | Valor por defecto | Descripción |
| --- | --- | --- |
| `PORT` | `8090` | Puerto HTTP del servidor |
| `MICAMPUS_DATA_DIR` | `./micampus-data` | Directorio portable de datos y SQLite |
| `MICAMPUS_PUBLIC_DIR` | `./frontend/public` | Directorio público / recursos estáticos |
| `MICAMPUS_AUTO_OPEN_BROWSER` | `true` | Abre el navegador automáticamente al iniciar |

Límite de subida de archivos: `50MB`.

---

## ✨ Funcionalidades principales

### 1. Vista de Asignatura y Libro Interactivo (modelo *Despliegue*)
- **Tarjeta y ficha de EAC (`EacCard`, `EacFichaPanel`):** Resumen de entregas con finalidad, utilidad práctica (`paraQueSirve`), contexto real y relación con la teoría.
- **Tutorial paso a paso (`EacTutorialPanel`):** Bloques prácticos estructurados por pasos para resolver cada EAC.
- **Índice del Libro en 4 niveles (`SubjectBookSidebar`):** Navegación jerárquica (`U1 - ...` → `1.`/`2.` → `2.1.` → `2.1.1.`), diagramas SVG dinámicos (`UnitIntroDiagram` desde `unitDiagrams`), franja de logos (`PlatformLogosStrip`), exportación a PDF con Apache PDFBox (`PdfExportService`) y barra superior *sticky*.
- **Mini-calendario y avisos (`SubjectMiniCalendar`, `HomeHeroBanner`):** Campana de `🔔 Avisos` en portada con entregas urgentes y próximas publicaciones de soluciones.
- **Seguridad y acceso (`WebAuthFilter`):** Protección opcional mediante login (HTTP Basic Auth) configurable desde **Configuración → Usuario**.

### 2. Calendarios IOC y Sensei
- Calendarios centrados en las asignaturas y pruebas del IOC (`DES.ics`, `DIG.ics`, `ENT.ics`, `INT.ics`, `IPO.ics`, `PAFS.ics`, incluyendo `PAF 1` y `PAF 2` con `gradeDate`).
- **Sensei (`CalendarAndCoachService`, `DesktopReminderService`, `TelegramBotService`):** Detecta entregas atrasadas, urgentes, colisiones y fechas de publicación de soluciones (`solutionReleases` / `hasSolutionUpload`), con alertas en macOS y comando `/soluciones` en Telegram.

### 3. Material oficial, normalización y compresión nativa
- **Compresión en Java (`FileCompressionService`):** Reduce el peso de PDFs e imágenes al subirlos desde `POST /api/uploads/{subjectId}`.
- **Normalización automática (`DocumentNormalizationService`):** Escanea y extrae texto de archivos `.pdf`, `.odt`, `.md` y `.txt` ubicados en `eacs/`, `uploads/` y `frontend/public/material/` (por ejemplo `frontend/public/material/desplegament/` con las unidades oficiales `u1`–`u4`).

### 4. Sistema Multi-Agente de IA (`AiAgentOrchestrator`)
Orquestación de 7 agentes especializados para coordinar, auditar, traducir/adaptar el material oficial al formato de la web, pulir estilo, indexar conceptos clave, guiar en las EACs y coordinar la agenda:
- `redactor-jefe`: Coordina a Auditor, Escritor, Estilista y Glosario, evita solapamientos y valida la versión final.
- `auditor`: Audita los PDFs oficiales frente al contenido publicado en la web y los traduce al español técnico.
- `escritor`: Traduce y adapta unidades oficiales a secciones del libro (`bookSections`) en Markdown jerárquico.
- `estilista`: Revisa y pule el estilo visual y la jerarquía (`##`/`###`, sin títulos duplicados ni números manuales).
- `glosario`: Extrae conceptos clave de cada unidad para destacarlos en el glosario y en la barra de búsqueda (`search_index.json`).
- `eac-coach`: Alinea los bloques y tutoriales de EACs con el temario oficial.
- `sensei-agenda`: Cruza carga de estudio, entregas próximas y fechas de solución.

---

## 🔌 Endpoints principales

### Campus, Calendario y Sensei
- `GET /api/campus` — Estado general del campus y asignaturas.
- `GET /api/scripts/coach-report` — Informe de Sensei (`overdue`, `urgent`, `upcoming`, `solutionReleases`, `collisions`).
- `GET /api/scripts/calendar.ics?subjectId=...` — Exportación de calendario `.ics`.
- `POST /api/uploads/{subjectId}` — Subida de archivos con compresión y normalización automática.

### Documentos y Material Oficial (`/api/documents`)
- `GET /api/documents` — Lista los documentos normalizados.
- `GET /api/documents/{docId}` — Devuelve el detalle y contenido extraído de un documento.
- `POST /api/documents/sync` — Re-escanea y sincroniza `eacs/`, `uploads/` y `material/`.
- `POST /api/documents/{docId}/ask` — Consulta a la IA sobre un documento concreto.
- `POST /api/documents/ask` — Consulta transversal sobre el conjunto de documentos.
- `POST /api/documents/adapt-material/{subjectCode}` — Adapta material oficial de una asignatura al formato web.

### Agentes de IA (`/api/agents`)
- `GET /api/agents` — Lista los agentes disponibles (`redactor-jefe`, `auditor`, `escritor`, `estilista`, `glosario`, `eac-coach`, `sensei-agenda`).
- `POST /api/agents/{agentId}/run` — Ejecuta un agente individual.
- `POST /api/agents/pipeline/material` — Ejecuta el pipeline completo sobre el material oficial.
- `POST /api/agents/chat` — Chat interactivo multi-agente con contexto de la unidad.
