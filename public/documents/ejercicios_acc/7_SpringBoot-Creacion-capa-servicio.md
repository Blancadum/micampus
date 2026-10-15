# Actividad 7: Spring Boot — Creación de la Capa de Servicio (02)

> **Documento original:** `Spring Boot – Creación de la Capa de Servicio.pdf`  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Punto 7 del módulo 2 de Spring Boot (Tutorías de Arquitectura en Capas).  
> **Proyecto base:** Partimos del proyecto `taskmanager` construido en los ejercicios 5 y 6.

---

## 1. Descripción del Ejercicio

Partimos del proyecto de la tarea anterior donde toda la lógica está en la capa Controller. En esta tarea vamos a extraer la lógica a una **capa Service**, separando correctamente las responsabilidades de cada capa.

Al terminar, el **Controller solo gestionará la petición HTTP** (recibir la request, delegar y devolver la respuesta con el código de estado correspondiente), y el **Service contendrá toda la lógica de negocio**.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.  
> 📁 **Fichero de notas:** Crear `notas/NOTAS-02-creacion-de-la-capa-de-servicio.md` en la raíz del proyecto.

### Objetivos de Aprendizaje:
- **Técnico:**
  - Crear una capa Service que centralice la lógica de negocio.
  - Aplicar el principio **SRP (Single Responsibility)**: cada clase tiene una sola responsabilidad.
  - Aplicar el principio **DIP (Dependency Inversion)**: el Controller depende de una interfaz (`TaskService`), no de una implementación concreta (`TaskServiceImpl`).
- **IA (Modo Ask + Autocompletado asistido):**
  - Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  - Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  - Verificar que la refactorización no rompe el comportamiento existente.

---

## 2. Instrucciones de Entrega

1. **Rama en el repositorio:** Crear la rama `02-creacion-de-la-capa-de-servicio` a partir de `main-spring-boot`.
2. **Pull Request (PR):** Abrir un PR hacia `main-spring-boot` con el título:
   `Spring Boot – Creación de la Capa de Servicio`
   - Incluir en el PR el fichero `notas/NOTAS-02-creacion-de-la-capa-de-servicio.md` con las preguntas del Paso 1, diseño del Paso 2, respuestas del Paso 4, reflexiones y capturas de Postman del Paso 5.
3. **Exportación ZIP:** Exportar el proyecto completo en `.zip` con la nomenclatura:
   `Spring Boot – Creación de la Capa de Servicio - Nombre Apellido.zip`
4. **Plataforma L2E:** Subir el `.zip` a la tarea correspondiente en la plataforma L2E.

---

## 3. Paso 1 — Preparación con Asistente (Ask)

Antes de generar código, utiliza el modo Ask para entender qué responsabilidades tiene la capa Service y cómo se inyecta correctamente en Spring. Formula tú las preguntas que consideres necesarias, sé concreto y evita redundancias.

> 📝 Anota en `NOTAS-02-creacion-de-la-capa-de-servicio.md` la pregunta o preguntas exactas que le hiciste a Copilot y el resumen de sus respuestas.

---

## 4. Paso 2 — Diseño Previo

Antes de programar, responde en tu documento de notas:
1. ¿Qué clases e interfaces vas a crear y qué responsabilidad tiene cada una?
2. ¿Qué métodos tendrá la interfaz `TaskService`?
3. ¿Qué lógica vas a mover del Controller al Service?
4. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

---

## 5. Paso 3 — Implementación (Autocompletado y Refactorización)

1. **Crear `TaskService.java`:** Interfaz con los 5 métodos de negocio:
   - `findAll()`: Listar todas las tareas.
   - `findById(Long id)`: Obtener tarea por identificador.
   - `create(Task task)`: Crear una nueva tarea.
   - `update(Long id, Task task)`: Actualizar tarea existente.
   - `delete(Long id)`: Eliminar tarea.
2. **Crear `TaskServiceImpl.java`:** Implementación anotada con `@Service`, moviendo la lista estática y las operaciones una a una.
3. **Refactorizar `TaskController.java`:** Inyectar `TaskService` por constructor y delegar todas las llamadas sin lógica de negocio propia.

### Restricciones estrictas:
- El Controller **no debe contener lógica de negocio**, sólo recibe la request, delega y devuelve la response.
- **No cambies los endpoints ni las URIs** definidas anteriormente (`/api/v1/tasks`).
- No añadas lógica nueva, sólo mueve la existente al lugar correcto.
- Mantén el comentario exacto en el código y añade al final: `// — generado por IA` para su localización en la revisión.

---

## 6. Paso 4 — Comprensión del Código (Ask)

Responde en tu fichero de notas:
1. ¿Qué hace la anotación `@Service`? ¿Qué pasaría si la eliminas?
2. ¿Por qué se inyecta `TaskService` por constructor en lugar de usar `@Autowired` en el campo?
3. ¿Qué ventaja tiene que `TaskController` dependa de la interfaz `TaskService` y no de `TaskServiceImpl`?
4. ¿Qué tipo de excepción se lanza cuando no se encuentra una tarea? ¿Dónde se captura esa excepción ahora mismo?
5. ¿Qué pasaría si hubiera dos implementaciones de `TaskService` en el proyecto? ¿Cómo sabría Spring cuál inyectar?

---

## 7. Paso 5 — Validación en Postman

Al ser una refactorización, el comportamiento externo de la API debe ser 100% idéntico al del ejercicio anterior:
1. Ejecutar las mismas peticiones (`GET`, `POST`, `PUT`, `DELETE` sobre `/api/v1/tasks`).
2. Adjuntar capturas de Postman de cada caso demostrando que el contrato REST se mantiene intacto.

---

## 8. Preguntas de Reflexión Final

1. ¿Qué problema concreto resuelve separar el Controller del Service?
2. ¿Dónde se está capturando ahora mismo la excepción de "tarea no encontrada"? ¿Te parece el lugar correcto?
3. ¿Qué ocurriría si en el futuro necesitas una segunda implementación de `TaskService` (por ejemplo, una que lea de base de datos)?
