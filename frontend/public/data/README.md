# 🗄️ MiCampus · Arquitectura del Sistema de Datos (`public/data/`)

Este directorio centraliza todos los modelos, materias, lecciones y fuentes del campus agrupados por dominio de forma modular y descriptiva.

---

## 🗂️ Estructura de Directorios

```text
public/data/
├── README.md                      <-- Arquitectura del sistema de datos
│
├── ioc/                           <-- [1] Ecosistema IOC DAW Oficial
│   ├── gestion/                   <-- Fichas de gestión administrativa de cada materia (landing, EACs, profesores)
│   │   ├── ent.json               (Entornos de Desarrollo)
│   │   ├── desp.json              (Despliegue de Aplicaciones Web)
│   │   ├── digi.json              (Digitalización Aplicada)
│   │   ├── int.json               (Diseño de Interfaces Web)
│   │   └── ipo2.json              (Itinerario Personal para la Empleabilidad II)
│   │
│   └── lecciones/                 <-- Libros y temarios teóricos completos (scroll infinito)
│       ├── entornos.json          (Teoría completa de ENT)
│       ├── despliegue.json        (Teoría completa de DESP)
│       ├── digitalizacion.json    (Teoría completa de DIGI)
│       ├── interfaces.json        (Teoría completa de INT)
│       └── ipo2_curso.json        (Teoría completa de IPO2)
│
├── extra/                         <-- [2] Cursos y Materias Complementarias (Java, Spring Boot, SEPE)
│   ├── springboot_petete.json     (Libro Integral Petete: 25 temas de arquitectura Spring Boot)
│   ├── springboot_guia.json       (Manual Enterprise & Lecciones de Spring Boot)
│   ├── springboot_tutorias_codigo.json (Código comentado de las tutorías de Spring Boot)
│   ├── accenture_actividades.json (16 actividades prácticas y proyectos entregados)
│   ├── accenture_actividades_curso.json (Enunciados detallados y resoluciones)
│   ├── accenture_videos_teoria.json (Catálogo de videotutorías y masterclasses)
│   ├── ifcd0177_curso.json        (Temario completo de Java POO, SOLID y Persistencia JPA)
│   ├── ifcd0177_gestion.json      (Ficha didáctica y documentos del curso de Java)
│   ├── php_sql_course.json        (Campus SEPE: Certificado PHP & SQL)
│   └── python_basics.json         (SEPE: Machine Learning & Python Básico)
│
├── calendars/                     <-- [3] Sistema Centralizado de Calendarios (.ics)
│   ├── source/                    (Fuentes organizadas por institución: acc/, ioc/, sepe/)
│   └── exports/                   (HUB_PERSONALIZADO.ics, calendario_miCampus.ics, todo.ics)
│
├── tasks.json                     <-- To-Do Global, radar de entregas y fechas límite
├── glossary.json                  <-- Glosario terminológico unificado del campus
└── search_index.json              <-- Índice global para el buscador modal (Ctrl+K)
```

---

## 🎯 Principio de Única Fuente de Verdad (Single Source of Truth)
* **Cero archivos sueltos ni duplicados:** Cada modelo de datos reside exclusivamente en su carpeta correspondiente.
* **Fichas de Gestión IOC:** `/data/ioc/gestion/` contiene la configuración administrativa, profesorado y entregas EAC.
* **Temarios Curriculares IOC:** `/data/ioc/lecciones/` contiene el contenido lectivo y teórico completo.
* **Cursos Complementarios:** `/data/extra/` contiene los cursos y guías externas (Java Studio, SEPE, Spring Boot).
* **Calendarios:** `/data/calendars/exports/` contiene las exportaciones `.ics` unificadas, generadas desde `calendars/source/`.

---

## 📦 Recuerdos (Campus antiguo — pendiente de eliminar tras la migración)
Los directorios `extra/`, `brain/`, `ioc/lecciones/` y los ficheros sueltos `tasks.json`, `glossary.json` y `search_index.json` pertenecen al contenido heredado (**Recuerdos**, inventariado en `frontend/src/recuerdos/recuerdosManifest.js`) y se retirarán cuando toda la migración esté consolidada en `micampus-data/micampus.db`.
