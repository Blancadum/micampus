# 📅 MiCampus · Arquitectura del Sistema de Calendarios

Sistema centralizado de gestión, combinación y exportación de calendarios iCalendar (`.ics`) para el ecosistema MiCampus, sincronizable con Apple Calendar (macOS / iOS) y Google Calendar.

---

## 🗂️ Estructura de Directorios

```text
calendars/ (public/data/calendars/)
├── README.md                          <-- Esta guía de arquitectura
│
├── source/                            <-- [1] Fuentes individuales (.ics) organizadas por institución
│   ├── acc/                           <-- 🏢 Accenture (Bootcamp Java & Spring Boot)
│   │   └── ACC.ics                    (Hitos, sesiones, tutorías y entregas de Spring Boot)
│   │
│   ├── ioc/                           <-- 🎓 IOC DAW (Generalitat de Catalunya)
│   │   ├── DES.ics                    (Despliegue de Aplicaciones Web)
│   │   ├── DIG.ics                    (Digitalización y Diseño Web)
│   │   ├── ENT.ics                    (Entornos de Desarrollo)
│   │   ├── INT.ics                    (Desarrollo de Interfaces Web)
│   │   ├── IPO.ics                    (Interacción Persona-Ordenador)
│   │   └── PAFS.ics                   (Proyecto Final / PAF)
│   │
│   └── sepe/                          <-- 🏛️ SEPE & Certificados Profesionales
│       ├── SERV.ics                   (Servidor Web PHP & Bases de Datos SQL)
│       ├── ML.ics                     (Machine Learning & Python)
│       └── SALUD.ics                  (Módulo Transversal: Prevención y Salud)
│
└── exports/                           <-- [2] Calendarios finales exportados (.ics)
    ├── calendario_miCampus.ics        (Macro-calendario unificado con los 177 eventos académicos)
    ├── todo.ics                       (Calendario dinámico con alarmas push de tareas pendientes)
    └── HUB_PERSONALIZADO.ics          (Alias de compatibilidad para enlaces directos)
```

---

## ⚙️ Scripts y Motores de Sincronización

### 1. `scripts/calendars/build_hub_calendar.py`
Compilador en Python que combina todas las fuentes de `source/` (carpetas `acc/`, `ioc/` y `sepe/`), elimina duplicados mediante comparación de `UID` y genera el archivo maestro:
```bash
python3 scripts/calendars/build_hub_calendar.py
```
* **Destino:** Se genera en `public/data/calendars/exports/calendario_miCampus.ics` para su descarga desde la web.

### 2. `scripts/bin/Sincronizar-Calendario-Mac.command`
Script ejecutable con doble clic en macOS que:
1. Recompila los eventos actualizados.
2. Crea e importa automáticamente el calendario **`🎯 Hub Táctico · Blanca`** en la aplicación nativa **Calendario** de macOS mediante AppleScript.

### 3. `backend/server.js` (Micro-API)
Monitorea las acciones en la SPA: cuando marcas una EAC como `Done`, regenera automáticamente `todo.ics` en tiempo real excluyendo esa tarea para apagar las alarmas del móvil.

---

## 📲 Cómo Sincronizar en tus Dispositivos

* **macOS (App Calendario):** Haz doble clic en `scripts/bin/Sincronizar-Calendario-Mac.command` o abre directamente `public/data/calendars/exports/calendario_miCampus.ics`.
* **Google Calendar:** Ve a *Configuración ➔ Añadir calendario ➔ Importar* y sube `calendario_miCampus.ics`.
* **Desde la Web (MiCampus):** Pulsa el botón **📅 Calendario** en la barra superior para descargar el `.ics` más reciente.
