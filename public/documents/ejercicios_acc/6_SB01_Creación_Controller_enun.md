# Actividad 6: Spring Boot — Creación del Controller REST (01)

> **Documento original:** `6_SB01_Creación_Controller_enun.pdf`  
> **Plataforma L2E:** [Spring Boot – Creación del Controller (ID: 8542)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Módulo 2 (puntos 4, 5 y 6) de Spring Boot (Tutoría 6).

---

## 1. Descripción del Ejercicio

Partiendo del proyecto **Task Manager** (`taskmanager`) creado en la actividad anterior, vamos a implementar el primer endpoint REST de la aplicación de gestión de tareas.

> ℹ️ **Nota de diseño:** Todavía no tenemos base de datos, por lo que los datos se gestionarán en una **lista de tareas en memoria (estática)** dentro del propio Controller. Esto permite centrarse al 100% en los mecanismos de la capa Controller y el protocolo HTTP.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.

### Objetivos de Aprendizaje:
- **Técnicos:**
  - Implementar un Controller REST con los métodos HTTP más comunes (`GET`, `POST`, `PUT`, `DELETE`).
  - Diseñar URIs REST correctas y versionadas (`/api/v1/tasks`).
  - Devolver respuestas HTTP con el código de estado adecuado usando `ResponseEntity<?>`.
- **IA (Modo Ask + Autocompletado asistido):**
  - Describir en lenguaje natural, mediante comentarios claros en el código, qué esperas que genere el autocompletado antes de aceptarlo.
  - Validar críticamente el código generado respondiendo preguntas conceptuales precisas.

---

## 2. Paso 1 — Preparación con Asistente (Ask)

Antes de generar código, utiliza el modo Ask para profundizar en:
- Qué es un `@RestController` en Spring Boot y en qué se diferencia de un `@Controller` tradicional.
- Cómo se estructura la respuesta HTTP (`ResponseEntity`, headers, body, status codes).
- Cómo y por qué se versionan las URIs (`/api/v1/...`).

> 📝 Registra en `notas/NOTAS-01-creacion-del-controller.md` las preguntas exactas formuladas y el resumen de respuestas.

---

## 3. Paso 2 — Diseño Previo

Define en tu documento de notas antes de programar:
1. **Clase a crear y responsabilidad:** `TaskController` gestiona exclusivamente las peticiones HTTP para el recurso `Task`.
2. **Tabla de endpoints REST:**

| Método HTTP | URI | Descripción | Código de Respuesta Esperado |
|---|---|---|---|
| **GET** | `/api/v1/tasks` | Obtener todas las tareas | `200 OK` + lista de tareas |
| **GET** | `/api/v1/tasks/{id}` | Obtener una tarea por ID | `200 OK` + tarea / `404 Not Found` si no existe |
| **POST** | `/api/v1/tasks` | Crear una nueva tarea | `201 Created` + tarea creada |
| **PUT** | `/api/v1/tasks/{id}` | Actualizar una tarea existente | `200 OK` + tarea actualizada / `404 Not Found` si no existe |
| **DELETE** | `/api/v1/tasks/{id}` | Eliminar una tarea por ID | `204 No Content` / `404 Not Found` si no existe |

3. **Comentarios exactos** que redactarás para solicitar la generación con autocompletado.

---

## 4. Paso 3 — Implementación

### A. Modelo: `Task.java`
Dentro del paquete de modelos (ej. `com.accenture.taskmanager.model`), crear la clase `Task` con los atributos:
- `id` (`Long` o `int`)
- `title` (`String`)
- `description` (`String`)
- `status` (`String` o `Enum`: pendiente, en progreso, completada)
- `priority` (`String` o `Enum`: baja, media, alta)
- `dueDate` (`LocalDate` o `String`)
- Constructores, getters, setters y `toString()`.

### B. Controlador: `TaskController.java`
Dentro del paquete de controladores (ej. `com.accenture.taskmanager.controller`):
- Anotar la clase con `@RestController` y `@RequestMapping("/api/v1/tasks")`.
- Mantener una lista estática en memoria para almacenar las tareas:
  ```java
  private static final List<Task> tasks = new ArrayList<>();
  ```
- Generar endpoint por endpoint con un comentario descriptivo para cada uno (no todos a la vez):
  1. `findAllTasks()` -> `@GetMapping`
  2. `findTaskById(@PathVariable ...)` -> `@GetMapping("/{id}")`
  3. `createTask(@RequestBody Task newTask)` -> `@PostMapping`
  4. `updateTask(@PathVariable ..., @RequestBody Task updatedTask)` -> `@PutMapping("/{id}")`
  5. `deleteTask(@PathVariable ...)` -> `@DeleteMapping("/{id}")`

> ⚠️ **Restricciones obligatorias:**
> - Todos los endpoints bajo `/api/v1/tasks`.
> - Todos los métodos deben devolver `ResponseEntity<?>`.

---

## 5. Paso 4 — Preguntas de Comprensión (Ask)

Una vez implementado el código, anota en el fichero de notas las respuestas a:
1. **¿Qué hace `@RequestMapping("/api/v1/tasks")` a nivel de clase? ¿Qué ocurriría si lo eliminas?**
2. **¿Qué diferencia hay entre `@GetMapping` y `@GetMapping("/{id}")`?**
3. **¿Qué hace `@PathVariable` y qué pasaría si no lo incluyes en el método GET `/tasks/{id}`?**
4. **¿Por qué el método POST devuelve `ResponseEntity.status(HttpStatus.CREATED)` y no `ResponseEntity.ok()`?**
5. **¿Qué hace `@RequestBody` y qué ocurre si envías un JSON mal formado sin él?**

---

## 6. Paso 5 — Pruebas con Postman

Probar los 5 métodos en Postman:
- `GET http://localhost:8080/api/v1/tasks`
- `POST http://localhost:8080/api/v1/tasks` (con JSON en body)
- `GET http://localhost:8080/api/v1/tasks/1`
- `PUT http://localhost:8080/api/v1/tasks/1` (con cambios en body)
- `DELETE http://localhost:8080/api/v1/tasks/1`
- Casos de error `404 Not Found` al buscar o eliminar un ID inexistente.

Tomar capturas de pantalla de las pruebas e integrarlas o referenciarlas en las notas.

---

## 7. Fichero de Notas (`notas/NOTAS-01-creacion-del-controller.md`)

Debe incluir:
- Prompts formulados en el Paso 1.
- Diseño previo del Paso 2.
- Respuestas a las 5 preguntas del Paso 4.
- Capturas o evidencias de Postman del Paso 5.

> ⚠️ No modificar ni borrar `notas/NOTAS-00-preparacion-del-entorno.md`.

---

## 8. Instrucciones de Entrega

1. **Rama en GitHub:**
   - Crear y posicionarse en la rama: `01-creacion-del-controller` creada a partir de `main-spring-boot`.
   - Subir el proyecto con el código y `notas/NOTAS-01-creacion-del-controller.md`.
2. **Pull Request:**
   - Abrir un Pull Request hacia la rama `main-spring-boot` con el título:
     `Spring Boot – Creación del Controller`
3. **Exportar a ZIP:**
   - Nombre de archivo: `Spring Boot – Creación del Controller - Nombre Apellido.zip`
4. **Plataforma L2E:**
   - Subir el archivo `.zip` a la tarea de L2E:
   - [Enlace de entrega L2E (ID 8542)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542)
