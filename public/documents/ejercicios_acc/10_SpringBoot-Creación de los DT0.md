# Actividad 10: Spring Boot — Creación de los DTO's (05)

> **Documento original:** `Spring Boot – Creación de los DTOs.pdf`  
> **Plataforma L2E:** [Spring Boot – Creación de los DTO's](https://l2eportal-lms.cclearning.accenture.com/pluginfile.php/302761/mod_assign/introattachment/0/Spring%20Boot%20%E2%80%93%20Creaci%C3%B3n%20de%20los%20DTOs.pdf?forcedownload=1)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Punto 10 del módulo 2 de la parada de Spring Boot (Tutorías de Arquitectura, DTOs y Mappers).  
> **Proyecto base:** Continuación del proyecto `taskmanager` desarrollado en los ejercicios anteriores.

---

## 📋 Instrucciones Generales de Entrega

Para la entrega de la tarea, debes seguir los siguientes pasos:

1. **Rama en el repositorio:** Crear la rama `05-creacion-de-los-dtos` a partir de `main-spring-boot`. Esta rama cubre las **3 partes de este documento**: **no se abre Pull Request hasta haber completado la Parte 3**.
2. **Fichero de notas:** Crear el fichero `notas/NOTAS-05-creacion-de-los-dtos.md` (la carpeta `notas/` está en la raíz del proyecto, al mismo nivel que `pom.xml`) para incluirlo tanto en el PR como en el `.zip`. Es un fichero nuevo por ejercicio: no modifiques ni borres los anteriores.  
   - Debe incluir de cada una de las 3 partes: las preguntas exactas de Preparación (Ask), el diseño previo con el comentario de autocompletado, las respuestas de Comprensión del código, las capturas de Postman y las respuestas a las preguntas de reflexión.
3. **Pull Request:** Abrir un único Pull Request hacia la rama `main-spring-boot` con el título:  
   `Spring Boot – Creación de los DTO's`
4. **Exportación ZIP:** Exportar el proyecto completo en `.zip` con la nomenclatura:  
   `Spring Boot – Creación de los DTO's - Nombre Apellido.zip`
5. **Plataforma L2E:** Subir el archivo `.zip` a la plataforma L2E.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.  
> 🤖 **Modo permitido:** Ask (comprensión) + autocompletado por comentario (implementación).

---

## 📑 Índice de Contenidos

1. [Parte 1: DTOs y transformación de datos](#parte-1-spring-boot--dtos-y-transformación-de-datos)
2. [Parte 2: Relaciones OneToMany / ManyToOne](#parte-2-spring-boot--relaciones-onetomany--manytoone)
3. [Parte 3: Relaciones ManyToMany](#parte-3-spring-boot--relaciones-manytomany)

---

## Parte 1: Spring Boot – DTOs y transformación de datos

### 1. Descripción del Ejercicio
En nuestra aplicación, hasta ahora, la API expone directamente las entidades JPA (`Task` en los endpoints de tareas y el `Page<Task>` de Spring Data en los listados), y para poder serializarlas hubo que ocultar sus relaciones con `@JsonIgnore`. Esto es un **antipatrón**, ya que la entidad está acoplada a la BBDD, y cualquier cambio en el modelo de datos afecta directamente al contrato de la API y viceversa.

En este ejercicio refactorizarás la aplicación para introducir los **DTOs (Data Transfer Objects)** que separen la representación interna de los datos de su representación externa en la API.

### Objetivos de aprendizaje
* **Técnico:**
  * Entender por qué exponer entidades directamente en la API es un problema.
  * Crear DTOs para separar la representación interna de la externa.
  * Implementar la transformación `Entity ↔ DTO` de forma manual.
  * Sustituir el `Page<Task>` de Spring Data por un DTO genérico de respuesta paginada (`PagedResponseDTO<T>`).
  * Refactorizar Controller y Service para trabajar con DTOs.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que el comportamiento de la API no cambia tras la refactorización.

---

### Paso 1 – Problema: exponer entidades directamente
Antes de generar código y modificar el proyecto, reflexiona sobre lo que tienes ahora mismo: qué implica que la API exponga directamente la entidad `Task` y el `Page<Task>` de Spring Data, y por qué hizo falta añadir `@JsonIgnore` en las relaciones. Utiliza el modo Ask con las preguntas que consideres necesarias.

> 📝 Anota en `NOTAS-05-creacion-de-los-dtos.md` las preguntas exactas a Copilot y el resumen de sus respuestas.

---

### Paso 2 – Preparación (Ask)
Utiliza el modo Ask para entender qué es un DTO, qué problema resuelve y dónde debe vivir la transformación `Entity ↔ DTO`. Formula preguntas concretas sin redundancias.

---

### Paso 3 – Diseño previo
Diseña en tu documento de notas los DTOs que necesitas:

#### A. `TaskRequestDTO` (Lo que el cliente envía al crear o actualizar una tarea):
| Campo | Tipo | Descripción |
|---|---|---|
| `title` | `String` | Título de la tarea |
| `description` | `String` | Descripción de la tarea |
| `status` | `TaskStatus` | Estado de la tarea |
| `priority` | `TaskPriority` | Prioridad de la tarea |
| `dueDate` | `LocalDate` | Fecha límite |

#### B. `TaskResponseDTO` (Lo que la API devuelve al cliente):
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `Long` | Identificador generado por la BBDD |
| `title` | `String` | Título de la tarea |
| `description` | `String` | Descripción de la tarea |
| `status` | `TaskStatus` | Estado de la tarea |
| `priority` | `TaskPriority` | Prioridad de la tarea |
| `dueDate` | `LocalDate` | Fecha límite |
| `createdAt` | `LocalDateTime` | Solo lectura, no va en el request |

#### C. `PagedResponseDTO<T>` (Respuesta en listados paginados en lugar de `Page<Task>`):
* `content` (`List<T>`), `pageNumber` (`int`), `pageSize` (`int`), `totalElements` (`long`), `totalPages` (`int`), `last` (`boolean`).

> ℹ️ *Las anotaciones de validación (Bean Validation) no se añaden todavía: llegan en el siguiente ejercicio.*

---

### Paso 4 – Implementación (autocompletado)
1. Crea `TaskRequestDTO.java` con un comentario.
2. Crea `TaskResponseDTO.java` con un comentario aparte.
3. Crea `PagedResponseDTO.java` genérico con un comentario (`content`, `pageNumber`, `pageSize`, `totalElements`, `totalPages`, `last`).
4. Crea `TaskMapper.java`: un comentario para `toResponseDTO()`, otro para `toEntity()`.
5. Quita los `@JsonIgnore` provisionales de los campos de relación de `Task`, `Category` y `Tag`: ya no se serializa ninguna entidad. Es una eliminación simple, no necesita autocompletado.
6. En la interfaz `TaskService`, comenta las firmas actuales, escribe debajo el comentario con la nueva firma basada en DTOs (`TaskRequestDTO` al recibir, `TaskResponseDTO` al devolver, `PagedResponseDTO<TaskResponseDTO>` en los listados paginados), autocompleta y borra lo comentado.
7. En `TaskServiceImpl`, comenta cada método a cambiar, pide con un comentario que use `TaskMapper` y que construya el `PagedResponseDTO` a partir del `Page<Task>`, autocompleta y limpia.
8. En `TaskController`, comenta los métodos que usan `Task` o `Page<Task>` directamente, pide con un comentario que usen los DTOs, autocompleta y limpia.

#### Restricciones para el autocompletado:
* La transformación `Entity ↔ DTO` debe estar en `TaskMapper`, no en el Service ni en el Controller.
* **No uses librerías externas como MapStruct:** la transformación debe ser manual.
* No cambies los endpoints ni las URIs, ni los parámetros de paginación (los valores por defecto y el máximo de 100 siguen en el Controller).
* `PagedResponseDTO` debe ser genérico (`PagedResponseDTO<T>`) para poder reutilizarse con otros DTOs.
* No cambies la lógica de negocio del Service.
* Mantén el comentario exacto en el código y añade al final: `// — generado por IA`.

---

### Paso 5 – Comprensión del código (Ask)
Responde en tu fichero de notas:
1. Cuando más adelante añadas validaciones de Bean Validation, ¿por qué deberían ir en `TaskRequestDTO` y no en la entidad `Task`?
2. ¿Qué ventaja tiene tener `TaskMapper` como clase separada frente a hacer la transformación inline en el Service?
3. ¿Qué ocurriría si añades un nuevo campo a `Task` en base de datos? ¿Qué tendrías que cambiar con DTOs y qué tendrías que cambiar sin DTOs?
4. ¿Por qué `TaskResponseDTO` incluye `createdAt` pero `TaskRequestDTO` no?
5. ¿Por qué `PagedResponseDTO` es genérico (`<T>`)? ¿Qué ventaja tiene frente a devolver el `Page<Task>` de Spring Data o a crear un `PagedTaskResponseDTO` específico?
6. ¿Qué problema concreto evita no exponer `Task` directamente, ahora que `Task` tiene relaciones con `Category` y `Tag` y tuvimos que ocultarlas con `@JsonIgnore`?

---

### Paso 6 – Validación en Postman
Verifica y valida tu código desde Postman:

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `GET` | `http://localhost:8080/api/v1/tasks` | - | `200` + `PagedResponseDTO` con content (`TaskResponseDTO`) y metadatos |
| `GET` | `http://localhost:8080/api/v1/tasks?page=0&size=3` | - | `200` + 3 tareas, con `totalElements`, `totalPages` y `last` correctos |
| `GET` | `http://localhost:8080/api/v1/tasks/1` | - | `200` + tarea con estructura `TaskResponseDTO` |
| `GET` | `http://localhost:8080/api/v1/tasks/99` | - | `404 Not Found` |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea nueva", "status":"PENDING", "priority":"HIGH"}` | `201` + `TaskResponseDTO` con id asignado |
| `PUT` | `http://localhost:8080/api/v1/tasks/1` | `{"title":"Tarea actualizada", "status":"IN_PROGRESS", "priority":"HIGH"}` | `200` + `TaskResponseDTO` actualizado |
| `DELETE` | `http://localhost:8080/api/v1/tasks/{id creada en el POST}` | - | `204 No Content` |
| `GET` | `http://localhost:8080/api/v1/tasks/by-category/1` | - | `200` + `PagedResponseDTO` con las tareas de la categoría 1 |
| `GET` | `http://localhost:8080/api/v1/tasks/count-by-status?status=PENDING` | - | `200` + número de tareas PENDING (sin cambios) |

* Adjunta capturas de pantalla de Postman mostrando el request y response para cada caso.
* ⚠️ Fíjate especialmente en que la respuesta ahora tiene **exactamente los campos de `TaskResponseDTO`, ni más ni menos**.

#### Preguntas de Reflexión (Parte 1):
1. ¿Qué problema concreto habrías tenido en la Parte 2 si no hubieras introducido DTOs ahora?
2. ¿Qué ventaja tiene hacer la transformación manualmente frente a usar una librería como MapStruct?
3. ¿Qué desventaja tiene hacerla manualmente?

---

## Parte 2: Spring Boot – Relaciones OneToMany / ManyToOne

### 1. Descripción del Ejercicio
En esta parte, `Task` ya trabaja con DTOs. La entidad `Category` y su relación `@ManyToOne` / `@OneToMany` con `Task` ya existen desde el ejercicio anterior, pero todavía no se pueden gestionar desde la API. Este ejercicio consiste en exponer esa relación mediante DTOs: **asignar una categoría a una tarea con `categoryId`, devolver su nombre en la respuesta y añadir el CRUD de categorías**.

La tabla `category` y la clave foránea `category_id` en `task` ya existen en la BBDD desde el script SQL inicial.

### Objetivos de aprendizaje
* **Técnico:**
  * Gestionar una relación `@ManyToOne` desde la API usando DTOs: el id en la petición y el nombre en la respuesta.
  * Crear el CRUD completo (`DTOs`, `Mapper`, `Repository`, `Service` y `Controller`) para una entidad que ya existe (`Category`).
  * Resolver una relación contra su Repository en la capa Service.
  * Entender el impacto de la relación en los DTOs, en los endpoints y en el rendimiento (N+1).
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que la relación funciona correctamente con Postman.

---

### Paso 1 – Preparación (Ask)
Utiliza el modo Ask para entender cómo se expone una relación `@ManyToOne` con DTOs (id en el request, nombre en el response), por qué no se devuelve la entidad completa y qué problema N+1 puede aparecer al listar tareas con el nombre de su categoría.

---

### Paso 2 – Diseño previo
Responde en tu fichero de notas:
1. ¿Qué campos tendrán `CategoryRequestDTO` y `CategoryResponseDTO`?
2. ¿Qué campos nuevos necesitan `TaskRequestDTO` y `TaskResponseDTO`?
3. ¿Dónde y cómo vas a resolver el `categoryId` (qué capa, qué Repository) y qué ocurrirá si no existe?
4. ¿Qué endpoints necesitas para gestionar categorías?
5. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

---

### Paso 3 – Implementación (autocompletado)
1. Crea `CategoryRequestDTO.java` y `CategoryResponseDTO.java`, uno por uno.
2. Crea `CategoryMapper.java`.
3. Añade el campo `categoryId` a `TaskRequestDTO` y el campo `categoryName` a `TaskResponseDTO` — dos comentarios de adición, uno por DTO.
4. En `TaskMapper`, comenta `toResponseDTO()`, pide con un comentario que rellene `categoryName` (con la comprobación de null: la categoría es opcional), autocompleta y borra lo comentado.
5. Crea `CategoryRepository.java` (interface vacía extendiendo `JpaRepository<Category, Long>` + comentario).
6. Crea `CategoryService` y `CategoryServiceImpl` con el CRUD básico.
7. Crea `CategoryController.java` con los endpoints de categorías bajo `/api/v1/categories`.
8. En `TaskServiceImpl`, comenta el método de crear/actualizar tarea, escribe debajo el comentario pidiendo que resuelva `categoryId` contra el Repository, autocompleta y borra lo comentado.
9. Añade en `application.properties` la línea:
   ```properties
   server.error.include-message=always
   ```
   *Es provisional, hasta el ejercicio de manejo de errores: sin ella Spring no incluye en la respuesta el mensaje de la excepción y no verás el id inexistente.*

#### Restricciones:
* El `TaskResponseDTO` solo debe incluir el nombre de la categoría, no la entidad completa.
* El `categoryId` es opcional: una tarea puede crearse sin categoría.
* El `categoryId` se resuelve en el Service contra `CategoryRepository`, no en el Mapper ni en el Controller.
* Si el `categoryId` no existe, lanza una excepción que indique el id inexistente.
* No modifiques la entidad `Category` ni la relación de `Task`: ya están creadas.
* No cambies los endpoints existentes de tareas.

---

### Paso 4 – Comprensión del código (Ask)
1. ¿Por qué `TaskRequestDTO` lleva `categoryId` y `TaskResponseDTO` lleva `categoryName`, en vez de la entidad `Category` completa?
2. ¿Qué problema ocurriría si intentaras serializar directamente la entidad `Category` con su lista de tareas en un endpoint REST? ¿Qué papel tenía el `@JsonIgnore` provisional?
3. ¿Qué es `LazyInitializationException` y en qué situación podría aparecer al rellenar `categoryName` desde la relación LAZY?
4. ¿Por qué el `categoryId` se resuelve en el Service y no en el Mapper?
5. Al listar tareas con su `categoryName`, ¿qué consultas SQL adicionales puede generar la relación LAZY (problema N+1)? ¿Cómo se podría evitar?

---

### Paso 5 – Validación en Postman

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `GET` | `http://localhost:8080/api/v1/categories` | - | `200` + lista de categorías |
| `GET` | `http://localhost:8080/api/v1/categories/1` | - | `200` + categoría con id 1 |
| `GET` | `http://localhost:8080/api/v1/tasks/1` | - | `200` + tarea con `categoryName` en la respuesta |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea con categoría", "status":"PENDING", "priority":"HIGH", "categoryId":1}` | `201` + tarea creada con categoría asignada |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea sin categoría", "status":"PENDING", "priority":"HIGH"}` | `201` + tarea creada sin categoría |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"PENDING", "priority":"HIGH", "categoryId":99}` | Error: la tarea no se crea y el mensaje indica que la categoría 99 no existe |
| `GET` | `http://localhost:8080/api/v1/tasks` | - | `200` + `PagedResponseDTO` con `categoryName` donde corresponda |

* Verifica en MySQL que la columna `category_id` de la tabla `task` se actualiza correctamente tras el caso 4.

#### Preguntas de Reflexión (Parte 2):
1. ¿Qué problema habrías tenido en este ejercicio si no hubieras introducido DTOs en la Parte 1?
2. ¿Por qué es importante que la categoría sea opcional al crear una tarea?
3. ¿Qué pasaría si intentaras eliminar una categoría que tiene tareas asignadas? ¿Cómo lo gestionarías?

---

## Parte 3: Spring Boot – Relaciones ManyToMany

### 1. Descripción del Ejercicio
En este ejercicio, `Task` ya gestiona su categoría mediante DTOs. La entidad `Tag` y su relación `@ManyToMany` con `Task` (con la tabla intermedia `task_tag`) ya existen desde el ejercicio anterior, pero todavía no se pueden gestionar desde la API. En este ejercicio expondrás esa relación mediante DTOs: **asignar varios tags a una tarea con `tagIds`, devolver la lista de tags en la respuesta y añadir el CRUD de tags**.

La tabla `tag` y la tabla intermedia `task_tag` ya existen en la BBDD.

### Objetivos de aprendizaje
* **Técnico:**
  * Gestionar una relación `@ManyToMany` desde la API usando DTOs: los ids en la petición y la lista de `TagResponseDTO` en la respuesta.
  * Crear el CRUD completo (`DTOs`, `Mapper`, `Repository`, `Service` y `Controller`) para una entidad que ya existe (`Tag`).
  * Resolver una lista de ids contra su Repository en la capa Service.
  * Entender cómo se actualiza la tabla intermedia al crear o actualizar una tarea.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que la relación funciona correctamente con Postman.

---

### Paso 1 – Preparación (Ask)
Utiliza el modo Ask para entender cómo se expone una relación `@ManyToMany` con DTOs (lista de ids en el request, lista de DTOs en el response) y qué diferencia hay entre reemplazar la lista completa de tags de una tarea y añadir o quitar tags individualmente.

---

### Paso 2 – Diseño previo
1. ¿Qué campos tendrán `TagRequestDTO` y `TagResponseDTO`?
2. ¿Qué campos nuevos necesitan `TaskRequestDTO` y `TaskResponseDTO`?
3. ¿Dónde y cómo vas a resolver los `tagIds` (qué capa, qué Repository) y qué ocurrirá si alguno no existe?
4. Al actualizar una tarea, ¿reemplazarás la lista completa de tags o añadirás/quitarás tags individualmente?
5. ¿Qué endpoints necesitas para gestionar tags?
6. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

---

### Paso 3 – Implementación (autocompletado)
1. Crea `TagRequestDTO.java` y `TagResponseDTO.java`, uno por uno; luego `TagMapper.java`.
2. Añade `tagIds` (`List<Long>`) a `TaskRequestDTO` y `tags` (`List<TagResponseDTO>`) a `TaskResponseDTO`, dos comentarios separados.
3. En `TaskMapper`, comenta `toResponseDTO()`, pide con un comentario que rellene la lista de `TagResponseDTO` a partir de los tags de la tarea, autocompleta y borra lo comentado.
4. Crea `TagRepository.java`, luego `TagService`/`TagServiceImpl`, luego `TagController.java` con los endpoints bajo `/api/v1/tags`.
5. En `TaskServiceImpl`, comenta el método afectado, pide con un comentario que resuelva `tagIds` contra el Repository, autocompleta y borra lo comentado.

#### Restricciones:
* El `TaskResponseDTO` debe incluir la lista de `TagResponseDTO`, no las entidades directamente.
* Los `tagIds` se resuelven en el Service contra `TagRepository`, no en el Mapper ni en el Controller.
* Si algún `tagId` no existe, lanza una excepción con el id que falta.
* No modifiques la entidad `Tag` ni la relación de `Task`: ya están creadas.
* No cambies los endpoints existentes de tareas ni de categorías.

---

### Paso 4 – Comprensión del código (Ask)
1. ¿Por qué `TaskRequestDTO` lleva una lista de ids (`tagIds`) y `TaskResponseDTO` una lista de `TagResponseDTO`?
2. ¿Qué problema puede surgir con `FetchType.LAZY` en una relación `@ManyToMany` cuando rellenas la lista de tags para serializar la respuesta?
3. ¿Qué ocurre en la tabla `task_tag` al reemplazar la lista completa de tags de una tarea?
4. ¿Qué diferencia hay entre actualizar los tags de una tarea reemplazando la lista completa frente a añadir o eliminar tags individualmente?
5. ¿Por qué los `tagIds` se resuelven en el Service y no en el Mapper?

---

### Paso 5 – Validación en Postman

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `GET` | `http://localhost:8080/api/v1/tags` | - | `200` + lista de tags |
| `GET` | `http://localhost:8080/api/v1/tasks/1` | - | `200` + tarea con lista de tags en la respuesta |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea con tags", "status":"PENDING", "priority":"HIGH", "tagIds":[1,2]}` | `201` + tarea creada con tags asignados |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea sin tags", "status":"PENDING", "priority":"HIGH"}` | `201` + tarea creada sin tags |
| `PUT` | `http://localhost:8080/api/v1/tasks/2` | `{"title":"Tarea actualizada", "status":"IN_PROGRESS", "priority":"HIGH", "tagIds":[1,3]}` | `200` + tarea con tags actualizados |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea", "status":"PENDING", "priority":"HIGH", "tagIds":[99]}` | Error: la tarea no se crea y el mensaje indica que el tag 99 no existe |
| `GET` | `http://localhost:8080/api/v1/tasks` | - | `200` + `PagedResponseDTO` con tags donde corresponda |

* ⚠️ Verifica en MySQL que la tabla `task_tag` se actualiza correctamente tras los casos 3 y 5 con:
  ```sql
  SELECT * FROM task_tag WHERE task_id = ?;
  ```

#### Preguntas de Reflexión (Parte 3):
1. ¿Qué diferencia práctica has notado entre gestionar una relación `@ManyToOne` de la Parte 2 y una `@ManyToMany` de esta parte?
2. ¿Por qué es importante verificar en la tabla `task_tag` que los datos se han persistido correctamente?
3. ¿Qué estrategia seguirías para eliminar un tag que está asignado a varias tareas sin borrar esas tareas?
