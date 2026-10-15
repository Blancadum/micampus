# ⚙️ Arquitectura del Harness (Arnés de Ejecución) para Agentes Locales
> *Guía Técnica — Cómo funciona el arnés que convierte un LLM en un agente autónomo*

---

## 1. ¿Qué es un "Harness" en Inteligencia Artificial?
Un **Modelo de Lenguaje (LLM)** por sí solo es simplemente una función probabilística pasiva: recibe una secuencia de texto (tokens de entrada) y predice los siguientes tokens más plausibles. No tiene noción del tiempo, no puede conectarse a internet, no puede leer ficheros de tu disco duro ni ejecutar código.

El **Harness (o arnés de ejecución)** es la infraestructura de software que envuelve y gobierna al modelo. Es el "cuerpo y sistema nervioso" del agente:
- Inyecta el contexto inicial (`soul.md`, `user.md`, estado actual).
- Captura la salida del LLM y analiza si ha solicitado invocar una herramienta (*tool calling*).
- Ejecuta de forma segura dicha herramienta en el sistema operativo local o APIs internas.
- Captura el resultado o error (*observación*) y lo reinyecta en el contexto del LLM.
- Repite este ciclo de forma iterativa hasta que el agente considera que la tarea está completada y emite la respuesta final al usuario.

```
       ┌────────────────────────────────────────────────────────┐
       │                 HERMES HARNESS RUNTIME                 │
       │                                                        │
       │  ┌──────────────┐   Prompt    ┌─────────────────────┐  │
       │  │ Context      │ ──────────> │ Local LLM           │  │
       │  │ Assembler    │             │ (Ollama / LMStudio) │  │
       │  │ (Soul+User)  │ <────────── │                     │  │
       │  └──────────────┘    Tool     └─────────────────────┘  │
       │         ▲            Call                 │            │
       │         │ (Observación)                   ▼            │
       │  ┌──────────────┐             ┌─────────────────────┐  │
       │  │ Memory &     │             │ Tool Dispatcher     │  │
       │  │ Context      │ <────────── │ (JSON API / FS /    │  │
       │  │ Compaction   │  Tool Exec  │  Telegram Bot)      │  │
       │  └──────────────┘             └─────────────────────┘  │
       └────────────────────────────────────────────────────────┘
```

---

## 2. El Ciclo de Vida ReAct (Reasoning + Acting)

El arnés ejecuta el patrón canónico **ReAct**:
1. **Paso 1: Ensamblaje de Contexto (Context Assembly):**
   - El arnés carga `soul.md` (identidad), `user.md` (perfil de Blanca), la fecha y hora actual, y el historial reciente de conversación.
   - Concatena las definiciones de herramientas disponibles (`tools.md`).
2. **Paso 2: Inferencia del Modelo (Thought):**
   - El LLM genera un razonamiento interno: *"El usuario me pregunta por sus tareas pendientes de ENT. Debo consultar la herramienta `get_pending_deliveries` con filtro 'ent'"*.
3. **Paso 3: Emisión de Tool Call (Action):**
   - El LLM emite un bloque estructurado:
     ```json
     {"action": "get_pending_deliveries", "params": {"subject": "ent"}}
     ```
4. **Paso 4: Ejecución en Sandbox Local (Execution):**
   - El arnés intercepta el bloque JSON, valida los parámetros y ejecuta la función Python correspondiente.
5. **Paso 5: Inyección de la Observación (Observation):**
   - El resultado devuelto por la función se añade al historial como un mensaje de rol `tool_result` o `observation`.
6. **Paso 6: Decisión de Parada:**
   - Si el agente ya tiene todos los datos necesarios, emite su respuesta final a Blanca: *"Tienes la EAC1 de Entornos pendiente con fecha límite el 20 de octubre"*. Si necesita más datos, vuelve al Paso 2.

---

## 3. Manejo de Contexto y Compactación de Memoria
En modelos locales (como Ollama o LM Studio ejecutando modelos de 7B a 14B parámetros), la ventana de contexto típica suele ser de 8k a 32k tokens. Si dejamos que el historial crezca indefinidamente, la inferencia se ralentiza y el modelo empieza a sufrir pérdidas de memoria o alucinaciones.

El arnés implementa **tres técnicas de control**:
1. **Filtrado de Observaciones Voluminosas:** Si una herramienta lee un archivo de 500 líneas, el arnés extrae solo los fragmentos relevantes o trunca con resumen antes de alimentar al LLM.
2. **Memoria en Dos Niveles:**
   - *Memoria de Trabajo (Short-term context):* Los últimos 6 turnos conversacionales exactos.
   - *Memoria Resumida (Episodic scratchpad):* Un bloque compacto con las decisiones tomadas y los datos clave recopilados hasta ese momento.
3. **Límite de Pasos de Seguridad (Max Iterations Guard):**
   - El arnés impone un límite estricto de máximo 5 llamadas a herramientas por turno de usuario para evitar bucles infinitos en caso de que el modelo entre en un ciclo repetitivo.

---

## 4. Test Harness vs Agent Runtime
- **Agent Runtime:** Es el motor en producción que atiende a Blanca a través de Telegram o la terminal interactiva.
- **Test Harness:** Es una suite de pruebas automatizadas donde ejecutamos escenarios mockeados (sin gastar tokens innecesarios ni tocar bases de datos reales) para verificar que el agente selecciona las herramientas correctas y respeta las restricciones de `soul.md`.
