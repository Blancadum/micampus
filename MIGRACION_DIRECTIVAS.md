# 🚨 DIRECTIVA ESTRICTA DE MIGRACIÓN: CAMPUS HUB (AGENDA ESCOLAR)

> **DIRIGIDO A:** Antigravity AI Agents & Subagents  
> **APLICABLE A:** Proyecto `/Users/blanca/Micampus` (Migración desde `/Users/blanca/Desktop/ics-customizer`)

---

## 🎯 Objetivo del Usuario
Migrar el proyecto **`ics-customizer`** (Agenda Escolar y Hub Académico/Profesional de Blanca) al repositorio unificado **`Micampus`**.

El propósito de la migración es **estructurar, limpiar el código backend/archivos y mejorar la mantenibilidad del proyecto**, **SIN cambiar la experiencia de usuario ni alterar el diseño.**

---

## ⚠️ REGLAS INVIOLABLES DE MIGRACIÓN

### 1. 🎨 PROHIBIDO ALTERAR ESTILOS O DISEÑO VISUAL
- **NO** modificar los temas CSS (`tokens.css`, `base.css`, `styles.css`), colores, fuentes, espaciados, ni layouts existentes a menos que sea para arreglar una ruta de assets rota.
- La identidad visual, paleta de colores, tarjetas, badges, tipografía y experiencia visual de la **Agenda Escolar / Hub** deben ser **100% idénticos** a la versión funcional de `ics-customizer`.

### 2. ⚡ PRESERVAR EL 100% DE LAS FUNCIONALIDADES
Se deben mantener intactas y totalmente operativas todas las características de la agenda:
- 📅 **Generador / Sincronizador del Calendario Hub (`.ics`)**: Scripts de fusión de calendarios (`build_hub_calendar.py`, `Sincronizar-Calendario-Mac.command`, etc.).
- ⏱️ **Cuentas atrás en tiempo real**: Cálculo dinámico de días/horas restantes en la tabla de próximas entregas y tarjeta "Próxima Entrega".
- 🕒 **Reloj en directo y Saludo dinámico**: Actualización por hora del saludo ("Buenos días", "Buenas tardes", "Buenas noches") y reloj con hora exacta.
- 📚 **Secciones y Hubs de Contenido**: Accenture Hub (Spring Boot), SEPE PHP, IOC DAW, Lecciones y Second Brain.
- 📋 **Acciones interactivas**: Botones de copia de comandos Mac, descargas directas de `.ics`, etc.

### 3. 📁 REORGANIZACIÓN LIMPIA Y RECTITUD DE DATOS
- Mover los contenidos de cursos/módulos a la estructura de `Micampus` sin eliminar archivos de estudio.
- **NO** copiar archivos basura como `.zip` de backups de 180MB ni carpetas duplicadas de `node_modules` desactualizadas.
- Garantizar que todas las rutas relativas de imágenes, documentos y fuentes apunten correctamente a los assets de `Micampus`.

---

> **EN RESUMEN:** Cero experimentos visuales, cero rediseños. Es una **agenda escolar en producción y en uso activo**. Mantener la fidelidad visual y funcional absoluta.
