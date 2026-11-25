# 📖 Modelo de Landing para Libro (MiCampus)

Esta carpeta contiene la plantilla y el prompt oficial para generar libros y temarios compatibles con la vista **Libro / Temario** de **MiCampus**.

## 🧩 Estructura visual del modelo

1. **Índice lateral agrupado por Bloques (`#`)**:
   - Cada encabezado de nivel 1 (`# Nombre del Bloque`) se convierte automáticamente en una sección desplegable en el índice izquierdo con su contador de progreso (`completadas/total`).
2. **Lecciones (`##`)**:
   - Cada encabezado de nivel 2 (`## Título de la Lección`) se convierte en una lección independiente dentro de su bloque.
3. **Secciones internas (`###`)**:
   - Los encabezados de nivel 3 (`### Subsección`) permanecen dentro de la lección y generan píldoras de navegación rápida en la parte superior del tema.
4. **Tarjetas de citas / conceptos clave (`>`) y código (` ``` `)**:
   - Las citas Markdown (`> 💡 ...`) y bloques de código se renderizan destacados dentro de la lectura.
5. **Autoevaluación automática (`Pregunta:` / `Respuesta:`)**:
   - Cualquier par `Pregunta:` / `Respuesta:` al final de una lección se extrae automáticamente en tarjetas interactivas de **🧠 Autoevaluación**.
6. **Navegación tipo libro**:
   - Pie con botones `← Lección anterior` y `✅ Completar y siguiente →`.

## 📁 Archivos en esta carpeta

- `PROMPT-PARA-IA.md`: Prompt listo para copiar y entregar a tu IA junto con tus apuntes o PDF.
- `ejemplo-libro.md`: Archivo Markdown de ejemplo listo para subir con **📄 Importar PDF / MD**.
