# 🤖 Prompt para generar un Libro compatible con MiCampus

Copia y pega este prompt en tu IA (Gemini, ChatGPT, Claude) adjuntando tus apuntes, temario o PDF.  
El archivo `.md` resultante se acomodará automáticamente en **MiCampus** al subirlo con **📄 Importar PDF / MD** (sin necesidad de configurar nada manualmente).

---

```markdown
Actúa como un diseñador instruccional y redactor técnico. Te adjunto mis apuntes / temario.
Quiero que los transformes en un único archivo Markdown (.md) listo para importar como un Libro interactivo, siguiendo ESTRICTAMENTE esta estructura:

1. **Bloques / Unidades (`#` nivel 1):**
   - Usa `# ` (un solo `#`) exclusivamente para los grandes bloques o unidades del temario.
   - Ejemplo: `# Bloque 1: Fundamentos`

2. **Lecciones (`##` nivel 2):**
   - Dentro de cada bloque, divide el contenido en lecciones claras y digeribles usando `## ` (dos `##`).
   - Ejemplo: `## 1.1 Qué es la Arquitectura Hexagonal`

3. **Secciones dentro de cada lección (`###` nivel 3):**
   - Estructura cada lección con 2 a 4 subsecciones usando `### ` (tres `###`), por ejemplo:
     - `### Concepto clave`
     - `### Ejemplo práctico`
     - `### Trade-offs o errores comunes`

4. **Formato rico y claro:**
   - Usa citas (`> 💡 ...` o `> ⚠️ ...`) para destacar definiciones importantes o advertencias.
   - Usa listas con viñetas (`- `) y tablas Markdown cuando compares conceptos.
   - Usa bloques de código con lenguaje explícito (```java, ```python, ```sql, etc.) si hay código.

5. **Autoevaluación al final de cada lección:**
   - Incluye al menos 1 o 2 preguntas de repaso al final de cada `## Lección` usando EXACTAMENTE estas etiquetas en líneas consecutivas:
     Pregunta: ¿Texto de la pregunta?
     Respuesta: Texto claro y conciso de la respuesta.

Devuélveme únicamente el contenido del archivo `.md` completo, listo para descargar o guardar como `temario.md`.
```
