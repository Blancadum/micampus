# Actividad 12: Spring Boot — Manejo Global de Errores (07)

> **Documento original:** `Spring Boot – Manejo de errores.pdf`  
> **Plataforma L2E:** [Spring Boot – Manejo de errores](https://l2eportal-lms.cclearning.accenture.com/pluginfile.php/302767/mod_assign/introattachment/0/Spring%20Boot%20%E2%80%93%20Manejo%20de%20errores.pdf?forcedownload=1)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Punto 13 del módulo 2 de la parada de Spring Boot (Manejo global de excepciones, `@RestControllerAdvice` y `@ExceptionHandler`).  
> **Proyecto base:** Continuación del proyecto `taskmanager` desarrollado en las tareas anteriores.

---

## 📋 Instrucciones de Entrega

Para la entrega de la tarea, debes:

1. **Rama en el repositorio:** Crear la rama `07-manejo-de-errores` a partir de `main-spring-boot`.
2. **Fichero de notas:** Incluir en el Pull Request el fichero `notas/NOTAS-07-manejo-de-errores.md` (la carpeta `notas/` está en la raíz del proyecto, al mismo nivel que `pom.xml`) con la pregunta o preguntas exactas del Paso 1, el diseño previo del Paso 2 (con el comentario exacto de autocompletado), las respuestas del Paso 4, las respuestas a las preguntas de reflexión y las capturas de Postman del Paso 5.
   - *Nota:* Es un fichero nuevo por ejercicio: no modifiques ni borres los anteriores.
3. **Pull Request:** Abrir un Pull Request hacia la rama `main-spring-boot` con el título:  
   `Spring Boot – Manejo global de errores`
4. **Exportación ZIP:** Exportar el proyecto completo en `.zip` usando la siguiente nomenclatura:  
   `Spring Boot – Manejo global de errores - Nombre Apellido.zip`
5. **Plataforma L2E:** Subir el proyecto (`.zip`) a la plataforma L2E.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.  
> 🤖 **Modo permitido:** Ask (comprensión) + autocompletado por comentario (implementación).

---

## 1. Descripción del Ejercicio

Para esta tarea, partimos del proyecto de la tarea anterior, donde los errores se gestionan de forma inconsistente: las validaciones devuelven la respuesta por defecto de Spring y las excepciones de negocio como "tarea no encontrada" no tienen un formato estandarizado.

En este ejercicio **centralizarás el manejo de errores en un único lugar** (`@RestControllerAdvice`) y definirás un formato de respuesta de error claro, profesional y consistente para toda la API.

### Objetivos de aprendizaje
* **Técnico:**
  * Centralizar el manejo de errores con `@RestControllerAdvice`.
  * Capturar excepciones específicas con `@ExceptionHandler`.
  * Crear excepciones custom de negocio (`TaskNotFoundException`).
  * Definir una estructura de respuesta de error estandarizada (`ErrorResponse`).
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que los errores se devuelven con el formato correcto en Postman.

---

## 2. Paso 1 — Preparación (Ask)

Antes de generar código, utiliza el modo Ask para entender cómo Spring centraliza el manejo de errores con `@RestControllerAdvice` y `@ExceptionHandler`. Formula tú las preguntas que consideres necesarias — sé concreto y evita preguntas redundantes entre sí, cada pregunta debe aprovecharse al máximo.

> 📝 **Anota en `NOTAS-07-manejo-de-errores.md`** la pregunta o preguntas exactas que le hiciste a Copilot (tal cual las escribiste) y un resumen de sus respuestas. No generes código todavía.

---

## 3. Paso 2 — Diseño Previo

Antes de generar código, decide la estructura de la respuesta de error y anótala en tu fichero de notas:

### 1. Estructura de `ErrorResponse`:
```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Tarea con id 99 no encontrada",
  "path": "/api/v1/tasks/99"
}
```

### 2. Mapa de Excepciones y Códigos HTTP:
| Excepción | Código HTTP | Cuándo se lanza |
|---|---|---|
| `TaskNotFoundException` | `404 Not Found` | Tarea no encontrada por id. |
| `NoSuchElementException` | `404 Not Found` | Categoría o tag no encontrado por id al consultarlo, actualizarlo o borrarlo (`/categories/{id}`, `/tags/{id}`). |
| `MethodArgumentNotValidException` | `400 Bad Request` | Fallo de validación de Bean Validation. |
| `HttpMessageNotReadableException` | `400 Bad Request` | JSON mal formado o valor no válido (por ejemplo, un status inexistente). |
| `IllegalArgumentException` | `400 Bad Request` | `categoryId` o algún `tagId` inexistente en el body de una tarea. |
| `MethodArgumentTypeMismatchException` | `400 Bad Request` | Parámetro con valor no válido (p. ej. `id=abc`). |
| `MissingServletRequestParameterException` | `400 Bad Request` | Parámetro obligatorio ausente. |
| `PropertyReferenceException` | `400 Bad Request` | Campo de ordenación inexistente (p. ej. `sort=foo,asc`). |
| `NoResourceFoundException` | `404 Not Found` | Ruta inexistente. |
| `Exception` (genérica) | `500 Internal Server Error` | Cualquier error inesperado no controlado. |

> 📌 **Regla de oro de diseño REST:** Un ID inexistente devuelve **404** si es el recurso principal que pides en la URL (`GET /categories/99`), pero devuelve **400** si es un dato que envías dentro del body de una tarea (`categoryId: 99`).

---

## 4. Paso 3 — Implementación (Autocompletado)

1. **Crea `TaskNotFoundException.java`:** Extiende de `RuntimeException` con un constructor que reciba el mensaje.
2. **Crea `ErrorResponse.java`:** POJO/DTO con los 5 campos decididos (`timestamp`, `status`, `error`, `message`, `path`).
3. **Crea `GlobalExceptionHandler.java`:** Clase anotada con `@RestControllerAdvice` conteniendo cada `@ExceptionHandler` por separado según la tabla del Paso 2.
   * *Nota para Jackson:* Para indicar qué campo trae un valor no válido (p. ej. status), importa `InvalidFormatException` de `tools.jackson.databind.exc` (en Spring Boot 4) o `com.fasterxml.jackson.databind.exc`.
4. **En `TaskServiceImpl`:** Comenta la línea donde se lanzaba la excepción genérica actual, escribe debajo el comentario pidiendo `TaskNotFoundException`, autocompleta y limpia.
5. **En `TaskServiceImpl`:** Donde resuelves `categoryId` y `tagIds`, haz que un id inexistente lance `IllegalArgumentException` con el mensaje:  
   `"Categoría con id X no encontrada"` o `"Tag con id X no encontrado"`.
6. **En los Services de categorías y tags:** Lanza `NoSuchElementException` con ese mismo estilo de mensaje.
7. **Limpieza en `application.properties`:** Retira la línea del ejercicio anterior que activaba include-message (`spring.web.error.include-message=always` o `server.error.include-message`): ahora el mensaje lo devuelve limpiamente el `GlobalExceptionHandler`.
8. **Limpieza en Controllers:** Elimina los bloques `try/catch` de `NoSuchElementException` de los Controllers (tareas, categorías y tags): ahora los resuelve centralizadamente el `GlobalExceptionHandler`.

### Restricciones para el autocompletado:
* No cambies los endpoints ni la lógica de validación del ejercicio anterior.
* El `GlobalExceptionHandler` debe capturar siempre `Exception` como último recurso.
* **Los mensajes de error deben estar en español.**
* La respuesta de error debe usar siempre la clase `ErrorResponse`, nunca un `String` o `Map`.
* Mantén el comentario exacto en el código y añade al final: `// — generado por IA`.

---

## 5. Paso 4 — Comprensión del Código (Ask)

Responde en tu fichero de notas:
1. ¿Por qué `TaskNotFoundException` extiende `RuntimeException` y no `Exception`?
2. ¿Qué hace Spring internamente cuando una excepción llega al `GlobalExceptionHandler`? ¿Cómo sabe qué método `@ExceptionHandler` ejecutar?
3. ¿Cómo se extraen todos los mensajes de error de una `MethodArgumentNotValidException`?
4. ¿Qué pasaría si no capturas `Exception` como último recurso? ¿Qué devolvería Spring por defecto?
5. ¿Por qué es importante que todos los errores devuelvan siempre la misma estructura `ErrorResponse`?

> 📝 Anota las respuestas en tu `NOTAS-07-manejo-de-errores.md`.

---

## 6. Paso 5 — Validación en Postman

Prueba con los siguientes 10 casos en Postman y documenta los resultados:

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `GET` | `http://localhost:8080/api/v1/tasks/99` | - | `404` + `ErrorResponse` con mensaje *"Tarea con id 99 no encontrada"* |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"", "status":"PENDING", "priority":"LOW"}` | `400` + `ErrorResponse` con mensaje de validación |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"INVALIDO", "priority":"LOW"}` | `400` + `ErrorResponse` indicando que el valor de status no es válido |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea válida", "status":"PENDING", "priority":"HIGH", "dueDate":"2099-12-31"}` | `201 Created` (sin cambios) |
| `DELETE` | `http://localhost:8080/api/v1/tasks/99` | - | `404` + `ErrorResponse` con mensaje *"Tarea con id 99 no encontrada"* |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"PENDING", "priority":"LOW", "categoryId":99}` | `400` + `ErrorResponse` con mensaje *"Categoría con id 99 no encontrada"* |
| `GET` | `http://localhost:8080/api/v1/tasks/abc` | - | `400` + `ErrorResponse`: el valor `'abc'` no es válido para el parámetro `'id'` |
| `GET` | `http://localhost:8080/api/v1/ruta-inexistente` | - | `404` + `ErrorResponse` |
| `GET` | `http://localhost:8080/api/v1/categories/99` | - | `404` + `ErrorResponse` con mensaje *"Categoría con id 99 no encontrada"* |
| `GET` | `http://localhost:8080/api/v1/tasks?sort=foo,asc` | - | `400` + `ErrorResponse` indicando que el campo de ordenación no es válido |

> ⚠️ Compara la respuesta de error actual con la respuesta de error por defecto de Spring que obtuviste en el Paso 5 del ejercicio anterior. El ejercicio no está completo hasta que **todos los errores devuelven la estructura `ErrorResponse`** definida en el Paso 2.

---

## 7. Preguntas de Reflexión

1. ¿Qué problema concreto resuelve tener un `GlobalExceptionHandler` frente a capturar excepciones en cada Controller?
2. ¿Qué información incluirías o eliminarías de `ErrorResponse` pensando en la seguridad de la API?
3. ¿Qué ocurriría si en el futuro añades un nuevo Controller? ¿Necesitas tocar el `GlobalExceptionHandler`?
