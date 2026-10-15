# Actividad 11: Spring Boot — Uso de Validaciones (06)

> **Documento original:** `Spring Boot – Uso de Validaciones.pdf`  
> **Plataforma L2E:** [Spring Boot – Uso de Validaciones](https://l2eportal-lms.cclearning.accenture.com/pluginfile.php/302763/mod_assign/introattachment/0/Spring%20Boot%20%E2%80%93%20Uso%20de%20Validaciones.pdf?forcedownload=1)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Punto 12 del módulo 2 de la parada de Spring Boot (Bean Validation y validaciones custom).  
> **Proyecto base:** Continuación del proyecto `taskmanager` desarrollado en las tareas anteriores.

---

## 📋 Instrucciones de Entrega

Para la entrega de la tarea, debes:

1. **Rama en el repositorio:** Crear la rama `06-uso-de-validaciones` a partir de `main-spring-boot`.
2. **Fichero de notas:** Incluir en el Pull Request el fichero `notas/NOTAS-06-uso-de-validaciones.md` (la carpeta `notas/` está en la raíz del proyecto, al mismo nivel que `pom.xml`) con la pregunta o preguntas exactas del Paso 1, el diseño previo del Paso 2 (con el comentario exacto de autocompletado), las respuestas del Paso 4, las respuestas a las preguntas de reflexión y las capturas de Postman del Paso 5.
   - *Nota:* Es un fichero nuevo por ejercicio: no modifiques ni borres los anteriores.
3. **Pull Request:** Abrir un Pull Request hacia la rama `main-spring-boot` con el título:  
   `Spring Boot – Uso de Validaciones`
4. **Exportación ZIP:** Exportar el proyecto completo en `.zip` usando la siguiente nomenclatura:  
   `Spring Boot – Uso de Validaciones - Nombre Apellido.zip`
5. **Plataforma L2E:** Subir el proyecto (`.zip`) a la plataforma L2E.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.  
> 🤖 **Modo permitido:** Ask (comprensión) + autocompletado por comentario (implementación).

---

## 1. Descripción del Ejercicio

Para esta tarea, partimos del proyecto de la tarea anterior, donde nuestra API acepta cualquier dato sin comprobar si es válido. En este ejercicio añadirás validaciones a las entradas de la API usando **Bean Validation**, de forma que la aplicación rechace datos incorrectos antes de procesarlos.

### Objetivos de aprendizaje
* **Técnico:**
  * Validar las entradas de la API con anotaciones estándar de Bean Validation.
  * Activar la validación en el Controller con `@Valid`.
  * Personalizar los mensajes de error de validación.
  * Crear una validación custom con `@ConstraintValidator` para reglas de negocio que no cubren las anotaciones estándar.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que las validaciones funcionan correctamente con Postman.

---

## 2. Paso 1 — Preparación (Ask)

Antes de generar código, utiliza el modo Ask para entender qué es Bean Validation, cómo se activa y qué papel juega `@Valid` en el flujo de la petición. Formula tú las preguntas que consideres necesarias — sé concreto y evita preguntas redundantes entre sí, cada pregunta debe aprovecharse al máximo.

> 📝 **Anota en `NOTAS-06-uso-de-validaciones.md`** la pregunta o preguntas exactas que le hiciste a Copilot (tal cual las escribiste) y un resumen de sus respuestas. No generes código todavía.

---

## 3. Paso 2 — Diseño Previo

Antes de generar código, decide qué validaciones aplicarás a cada campo de `TaskRequestDTO` y escríbelas en tu `NOTAS-06-uso-de-validaciones.md`:

| Campo | Validación | Motivo |
|---|---|---|
| `title` | `@NotBlank`<br>`@Size(max=150)` | Obligatorio, no puede estar vacío ni superar 150 caracteres. |
| `description` | `@Size(max=500)` | Opcional, pero limitado a 500 caracteres. |
| `status` | `@NotNull` | Obligatorio, debe ser uno de los valores permitidos (`PENDING`, `IN_PROGRESS`, `DONE`). |
| `priority` | `@NotNull` | Obligatorio, debe ser uno de los valores permitidos (`LOW`, `MEDIUM`, `HIGH`). |
| `dueDate` | `@Future` | Si se indica, debe ser una fecha futura. |

### Validación custom a nivel de clase:
Una tarea con `priority = "HIGH"` debe tener obligatoriamente `dueDate` informado. Es una regla que depende de dos campos a la vez, así que las anotaciones estándar no la cubren — necesitarás un `@ConstraintValidator` a nivel de clase, que reciba el `TaskRequestDTO` completo en vez de un solo campo.

> 📝 Escribe también en tu documento de notas el comentario exacto que escribirás para que el autocompletado lo genere. No generes código hasta no haber completado este paso.

---

## 4. Paso 3 — Implementación (Autocompletado)

1. **Dependencia Maven:** Antes de escribir código, añade en el `pom.xml` la dependencia de validación:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-validation</artifactId>
   </dependency>
   ```
   *Bean Validation no viene incluido en `spring-boot-starter-web` y, sin ella, no compilan las anotaciones de `jakarta.validation`.*
2. **En `TaskRequestDTO`:** Añade las anotaciones de validación campo a campo con un comentario por campo — son adiciones, no hace falta comentar nada existente.
3. **Crea `RequiereFechaLimite.java`:** Con un comentario que describa la anotación custom a nivel de clase (`@Target(ElementType.TYPE)`, `@Retention(RetentionPolicy.RUNTIME)`, `@Constraint(validatedBy = RequiereFechaLimiteValidator.class)`).
4. **Crea `RequiereFechaLimiteValidator.java`:** Con un comentario para el método `isValid()`, aclarando que recibe el `TaskRequestDTO` completo:
   * Si `priority == TaskPriority.HIGH` y `dueDate == null`, devuelve `false`. En cualquier otro caso devuelve `true`.
5. **En `TaskController`:** Añade `@Valid` en los parámetros de los métodos `POST` y `PUT` con un comentario puntual — inserción, no reescritura:
   ```java
   @PostMapping
   public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskRequestDTO taskDTO) { ... }
   ```

### Restricciones para el autocompletado:
* No cambies la lógica del Service ni los endpoints.
* **Los mensajes de error deben estar en español** en el atributo `message` de cada anotación.
* La validación custom debe estar en una clase separada, no inline.
* Mantén el comentario exacto en el código y añade al final: `// — generado por IA`.

---

## 5. Paso 4 — Comprensión del Código (Ask)

Una vez generado el código con autocompletado, no lo des por bueno automáticamente. Utiliza el modo Ask para responder las siguientes preguntas sobre dicho código:

1. ¿Qué ocurre internamente cuando Spring encuentra `@Valid` en un parámetro del Controller?
2. ¿Qué excepción lanza Spring cuando falla una validación? ¿Dónde se captura ahora mismo?
3. ¿Qué hace el método `isValid()` en `RequiereFechaLimiteValidator` y cuándo se ejecuta? ¿Por qué recibe `TaskRequestDTO` en vez de un solo campo?
4. ¿Qué pasaría si añades `@Valid` en un método `GET`? ¿Tiene sentido hacerlo?
5. ¿Por qué los mensajes de error personalizados van en el atributo `message` de cada anotación?

> 📝 Anota las respuestas en tu `NOTAS-06-uso-de-validaciones.md`.

---

## 6. Paso 5 — Validación en Postman

Prueba con los siguientes casos en Postman y documenta los resultados:

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"", "status":"PENDING", "priority":"LOW"}` | `400 Bad Request` – título vacío |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"status":"PENDING", "priority":"LOW"}` | `400 Bad Request` – título obligatorio |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"INVALIDO", "priority":"LOW"}` | `400 Bad Request` – status no válido |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"PENDING", "priority":"LOW", "dueDate":"2000-01-01"}` | `400 Bad Request` – fecha en el pasado |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"PENDING", "priority":"HIGH"}` | `400 Bad Request` – priority HIGH exige dueDate |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea válida", "status":"PENDING", "priority":"HIGH", "dueDate":"2099-12-31"}` | `201 Created` |

> ⚠️ **Nota docente:** Fíjate en la respuesta de error que devuelve Spring por defecto, más adelante se mejorará. En Spring Boot esa respuesta automática todavía no muestra tus mensajes en español ni el campo exacto que falla (esto se resolverá con el `@RestControllerAdvice` en el ejercicio 12 de Manejo de Errores).

---

## 7. Preguntas de Reflexión

1. ¿Qué ventaja tiene validar en el Controller antes de llegar al Service?
2. ¿La respuesta de error que devuelve Spring por defecto es útil para el cliente de la API? ¿Qué mejorarías?
3. ¿Qué pasaría si un campo tiene varias anotaciones de validación y falla más de una a la vez?
4. Si durante las pruebas has encontrado algún error adicional que no aparece en este enunciado, ¿cuál era y cómo lo has resuelto? Anótalo en tu `NOTAS-06-uso-de-validaciones.md`.
