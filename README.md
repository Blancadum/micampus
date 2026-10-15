# 🎓 MiCampus — Hub de Estudio y Desarrollo

Plataforma integral de seguimiento académico para el ciclo de **DAW (IOC)**, retos del **Bootcamp de Java/Spring Boot (Accenture)** y cursos especializados (**SEPE**).

---

## 📂 Mapa de Directorios Fijos (Convención de Archivos)

Todos los recursos se ubican en **rutas fijas por código de asignatura**:

> **Códigos oficiales de materias:**  
> • `ent` → Entornos de Desarrollo  
> • `desp` → Despliegue de Aplicaciones Web  
> • `digi` → Digitalización aplicada a los sectores productivos  
> • `int` → Diseño de Interfaces Web  
> • `ipo2` → Interacción Persona-Ordenador  

---

### 1. 📄 Enunciados y Entregas de EACs (`public/eacs/`)
Aquí se depositan los **enunciados oficiales en PDF**, plantillas de entrega y resoluciones de cada evaluación continua:

```text
public/eacs/
├── ent/             <-- Enunciados EAC1, EAC2, EAC3 de Entornos
│   ├── eac1-enunciat.pdf
│   └── eac1-solucion.pdf
├── desp/            <-- Enunciados de Despliegue
├── digi/            <-- Enunciados de Digitalización
├── int/             <-- Enunciados de Interfaces Web
└── ipo2/            <-- Enunciados de IPO 2
```
* **Acceso web directo:** `http://localhost:5173/eacs/ent/eac1-enunciat.pdf`

---

### 2. 🎙️ Audiolecciones y Podcasts (`public/podcasts/`)
Directorio reservado para los archivos de audio MP3 correspondientes a cada tema:

```text
public/podcasts/
├── ent/
│   ├── tema-1-podcast.mp3
│   └── tema-2-podcast.mp3
├── desp/
├── digi/
├── int/
└── ipo2/
```
* **Acceso web directo:** `http://localhost:5173/podcasts/ent/tema-1-podcast.mp3`
* **Vinculación en JSON:** Se indica en la propiedad `"audioUrl": "/podcasts/ent/tema-1-podcast.mp3"`.

---

### 3. ⚙️ Datos de Gestión y Seguimiento (`public/data/ioc/gestion/`)
Archivos JSON donde se controlan las **fechas límite, estados de entrega (pending/done) y profesorado**:
* `public/data/ioc/gestion/ent.json`
* `public/data/ioc/gestion/desp.json`
* `public/data/ioc/gestion/digi.json`
* `public/data/ioc/gestion/int.json`
* `public/data/ioc/gestion/ipo2.json`

---

### 4. 📖 Temarios y Lecciones Renderizadas (`public/data/ioc/lecciones/`)
Archivos JSON generados que contienen el temario completo formateado en Markdown:
* `public/data/ioc/lecciones/entornos.json`
* `public/data/ioc/lecciones/despliegue.json`
* `public/data/ioc/lecciones/digitalizacion.json`
* `public/data/ioc/lecciones/interfaces.json`
* `public/data/ioc/lecciones/ipo2_curso.json`

---

### 5. 🏢 Documentación y Retos de Accenture (`public/documents/`)
* **Enunciados y notas:** `public/documents/ejercicios_acc/`
* **Manuales y guías:** `public/documents/Manual_Spring_Boot_Obsidian.md`

---

### 6. 📁 Bóveda Unificada de Fuentes y Multimedia (`public/fuentes/`)
Directorio centralizado que unifica todo el material fuente (apuntes, vídeos locales, audios y zips):
* `public/fuentes/springboot/` (Vídeos MP4 como `video2_protocolo_http.mp4`, audios y tutorías zip)
* `public/fuentes/apuntes/` (Fuentes originales Markdown: `accenture`, `ioc`, `sepe`)
* `public/fuentes/ioc/` (Audios MP3, vídeos MP4 y recursos de asignaturas IOC)
* `public/fuentes/ia/` (Vídeos y podcasts de Inteligencia Artificial)

---

### 7. ☁️ Subidas de Copias de Seguridad de Entregas (`public/uploads/`)
Carpeta gestionada por el micro-backend (`backend/server.js`) para archivar copias seguras de las entregas antes de enviarlas al campus oficial:
* `public/uploads/ioc/<asignatura>/`

---

## 🚀 Puesta en Marcha

### Frontend (SPA React + Vite)
```bash
npm run dev
# Disponible en: http://localhost:5173
```

### Backend Local (Sincronizador de Calendarios y Subida de Archivos)
```bash
npm run api
# API activa en: http://localhost:3001
```

### Sincronización con el Calendario de macOS
Doble clic sobre el archivo ejecutable:
```bash
./Sincronizar-Calendario-Mac.command
```
