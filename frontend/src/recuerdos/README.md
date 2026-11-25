# 📦 Recuerdos (Campus antiguo — pendiente de eliminar tras la migración)

Esta carpeta documenta e indexa **todo el código y los datos heredados del campus clásico** que conviven temporalmente con el nuevo MiCampus mientras dura la migración.

## ¿Qué pertenece al **Campus Nuevo** (NO borrar)?
- **Base de datos viva:** `micampus-data/micampus.db`
- **Páginas dinámicas:** `Home.jsx`, `DynamicSubjectPage.jsx`, `CalendarRadarPage.jsx`, `SettingsPage.jsx`, `ScriptsCenterPage.jsx`
- **Motor IA, PDF y Telegram:** `AiAgentOrchestrator.java`, `AiAssistantService.java`, `PdfExportService.java`, `TelegramBotService.java`, `WebAuthFilter.java`
- **Fichas y diagramas dinámicos por asignatura:** `frontend/public/data/ioc/gestion/*.json` (cargados por `DynamicSubjectPage` mientras no se muevan 100 % a SQLite)

## ¿Qué pertenece a **Recuerdos** (Campus antiguo — borrar al terminar la migración)?
El inventario exacto está en [`recuerdosManifest.js`](./recuerdosManifest.js):
1. **Rutas heredadas:** `accentureRoutes.jsx`, `sepeAndMiscRoutes.jsx`, `iocRoutes.jsx`
2. **Datos JS en código fuente:** `frontend/src/data/` (Accenture, Java Studio, Tecnofor, SQL Master, SEPE, Second Brain, Blog)
3. **JSON estáticos heredados:** `frontend/public/data/extra/`, `frontend/public/data/brain/`, `frontend/public/data/ioc/lecciones/`, `glossary.json`, `search_index.json`, `tasks.json`
4. **Importador heredado en Java:** `LegacyImporterService.java` y el endpoint `/api/scripts/import-legacy`
