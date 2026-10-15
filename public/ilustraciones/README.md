# 🎨 Ilustraciones y Diagramas por Curso

```java
/**
 * ============================================================================
 * @package     MiCampus.Assets
 * @module      Ilustraciones
 * @description Almacén central de recursos visuales, esquemas e infografías
 *              organizados por curso para uso directo en lecciones Markdown y JSON.
 *
 * ¿POR QUÉ EN /public/ Y NO EN /src/assets/?
 *  1. Los archivos en /src/assets/ son procesados por Vite y reciben un hash
 *     aleatorio en el build (ej: hero-nsTe5ISr.jpg), lo que impide enlazarlos
 *     de forma estática y legible desde archivos Markdown o JSON.
 *  2. Los archivos en /public/ se sirven con su ruta exacta y predecible en
 *     la raíz web (ej: /ilustraciones/sql/joins.jpg).
 *
 * @author      Blanca
 * @version     1.0.0
 * @since       2026-10-08
 * ============================================================================
 */
```

---

## 🗂️ Estructura de Directorios

```text
public/ilustraciones/
├── accenture/           --> Diagramas de arquitectura, Spring Boot, JPA y GenAI
├── sepe-php/            --> Esquemas de ciclo de vida, Apache, módulos y PHP
├── sql/                 --> Modelos entidad-relación, JOINs, diagramas DDL/DML
├── ioc-daw/             --> Diagramas UML, Git flow, wireframes e interacción
├── machine-learning/    --> Gráficos de dispersión, redes neuronales, pipelines
└── brain/               --> Infografías transversales (Docker, HTTP, Patrones)
```

---

## 📌 Cómo Usar en los Apuntes (Markdown)

En cualquier lección de `php_sql_course.json`, `entornos.json` o `springboot_guia.json`:

```markdown
![Diagrama de JOINs](/ilustraciones/sql/joins.jpg)
![Arquitectura Spring](/ilustraciones/accenture/arquitectura.png)
```
