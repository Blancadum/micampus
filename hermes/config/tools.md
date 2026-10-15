# 🛠️ Catálogo de Herramientas de Hermes (`tools.md`)
> *Versión 1.0 — Especificación de Funciones Locales Ejecutables por el Agente*

---

## 1. `get_pending_deliveries`
- **Descripción:** Lee los archivos JSON locales en `/public/data/ioc/gestion/` y `/public/data/extra/accenture_actividades_curso.json` para obtener la lista de entregas activas con fecha límite.
- **Entrada (JSON Schema):**
  ```json
  {
    "type": "object",
    "properties": {
      "subject": {
        "type": "string",
        "enum": ["all", "ent", "desp", "digi", "ipo", "accenture"],
        "description": "Filtro por asignatura o programa formativo"
      }
    },
    "required": []
  }
  ```
- **Salida esperada:** Lista de objetos con `{ id, title, dueDate, status, daysRemaining }`.

---

## 2. `mark_delivery_completed`
- **Descripción:** Realiza una petición `PUT` al backend local de Mi Campus (`http://localhost:3001/api/eac/status`) para marcar una tarea o EAC como entregada y recalcular el porcentaje de progreso.
- **Entrada (JSON Schema):**
  ```json
  {
    "type": "object",
    "properties": {
      "subjectId": { "type": "string", "description": "Identificador de la asignatura (ej: 'ent', 'desp')" },
      "eacId": { "type": "string", "description": "Identificador de la entrega (ej: 'eac1', 'eac2')" }
    },
    "required": ["subjectId", "eacId"]
  }
  ```

---

## 3. `search_study_notes`
- **Descripción:** Busca términos clave, conceptos y fragmentos de código dentro de las lecciones del campus (`public/data/ioc/lecciones/`) o en el Second Brain (`src/data/brainTopicsData.js`).
- **Entrada (JSON Schema):**
  ```json
  {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Concepto o comando a buscar (ej: 'agregacion vs composicion', 'docker port forwarding')" }
    },
    "required": ["query"]
  }
  ```

---

## 4. `query_local_llm`
- **Descripción:** Envía un prompt al servidor de inferencia local (Ollama en `http://localhost:11434/api/generate` o LM Studio en `http://localhost:1234/v1/chat/completions`) utilizando el modelo de lenguaje de código configurado (`qwen2.5-coder` o `deepseek-r1-distill`).
- **Entrada (JSON Schema):**
  ```json
  {
    "type": "object",
    "properties": {
      "systemPrompt": { "type": "string", "description": "Instrucciones de rol y contexto del sistema" },
      "userMessage": { "type": "string", "description": "Pregunta o duda técnica del usuario" },
      "temperature": { "type": "number", "default": 0.2 }
    },
    "required": ["userMessage"]
  }
  ```
