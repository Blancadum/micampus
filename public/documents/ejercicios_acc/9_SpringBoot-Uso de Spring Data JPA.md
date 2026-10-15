# Actividad 9: Spring Boot — Uso de Spring Data JPA (04)

> **Documento original:** `Spring Boot – Uso de Spring Data JPA.pdf`  
> **Plataforma L2E:** [Spring Boot – Uso de Spring Data JPA](https://l2eportal-lms.cclearning.accenture.com)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Punto 11 del módulo 2 de la parada de Spring Boot (Persistencia y Spring Data JPA).  
> **Proyecto base:** Continuación del proyecto `taskmanager` desarrollado en los ejercicios anteriores.

---

## 📋 Instrucciones Generales de Entrega

Para la entrega de la tarea, debes seguir los siguientes pasos:

1. **Rama en el repositorio:** Crear la rama `04-uso-de-spring-data-jpa` a partir de `main-spring-boot`. Esta rama cubre las **5 partes de este documento**: **no se abre Pull Request hasta haber completado la Parte 5**.
2. **Fichero de notas:** Crear el fichero `notas/NOTAS-04-uso-de-spring-data-jpa.md` (la carpeta `notas/` está en la raíz del proyecto, al mismo nivel que `pom.xml`) para incluirlo tanto en el PR como en el `.zip`. Es un fichero nuevo por ejercicio: no modifiques ni borres los anteriores.  
   - Debe incluir de cada una de las 5 partes: las preguntas exactas de Preparación (Ask), el diseño previo con el comentario de autocompletado, las respuestas de Comprensión del código, las capturas de Postman/consola y las respuestas a las preguntas de reflexión.
3. **Pull Request:** Abrir un único Pull Request hacia la rama `main-spring-boot` con el título:  
   `Spring Boot – Uso de Spring Data JPA`
4. **Exportación ZIP:** Exportar el proyecto completo en `.zip` con la siguiente nomenclatura:  
   `Spring Boot – Uso de Spring Data JPA - Nombre Apellido.zip`
5. **Plataforma L2E:** Subir el archivo `.zip` a la plataforma L2E.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.  
> 🤖 **Modo permitido:** Ask (comprensión) + autocompletado por comentario (implementación).

---

## 📑 Índice de Contenidos

1. [Parte 1: Capa Repository y CRUD completo](#parte-1-spring-boot--capa-repository-y-crud-completo)
2. [Parte 2: Relaciones entre entidades](#parte-2-spring-boot--relaciones-entre-entidades)
3. [Parte 3: Queries personalizadas](#parte-3-spring-boot--queries-personalizadas)
4. [Parte 4: Paginación y ordenación](#parte-4-spring-boot--paginación-y-ordenación)
5. [Parte 5: Transacciones](#parte-5-spring-boot--transacciones)

---

## Parte 1: Spring Boot – Capa Repository y CRUD completo

### 1. Descripción del Ejercicio
Para esta tarea, partimos del proyecto de la tarea anterior. En nuestra aplicación, `Task` ya es una entidad JPA pero la aplicación sigue usando una lista en memoria. En este ejercicio vamos a conectar todas las capas reemplazando esta lista por una capa Repository real que accede a la BBDD de MySQL.

Al terminar este ejercicio tendrás un CRUD completo funcionando de extremo a extremo:  
**Controller → Service → Repository → MySQL**.

### Objetivos de aprendizaje
* **Técnico:**
  * Crear la clase Repository con `JpaRepository` para acceder a la BBDD.
  * Usar `Optional<T>` para gestionar correctamente los casos en que un registro no existe.
  * Implementar query methods por nombre para consultas simples.
  * Conectar las tres capas: Controller, Service y Repository.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar el CRUD completo con Postman contra datos reales de MySQL.

---

### Paso 1 – Preparación (Ask)
Antes de generar código, utiliza el modo Ask para entender qué te da `JpaRepository` de forma automática y cómo funcionan los query methods por nombre. Formula tú las preguntas que consideres necesarias — sé concreto y evita preguntas redundantes entre sí, cada pregunta debe aprovecharse al máximo.

> 📝 **Anota en `NOTAS-04-uso-de-spring-data-jpa.md`** la pregunta o preguntas exactas que le hiciste a Copilot (tal cual las escribiste) y un resumen de sus respuestas. No generes código todavía.

---

### Paso 2 – Diseño previo
Antes de generar código, diseña y anota en tu `NOTAS-04-uso-de-spring-data-jpa.md` las respuestas a las siguientes preguntas:
1. ¿Qué interface vas a crear y de qué extiende?
2. ¿Qué métodos adicionales necesitas más allá de los CRUD automáticos?
3. ¿Qué cambios necesita `TaskServiceImpl` para usar el Repository en lugar de la lista en memoria?
4. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

> ⚠️ Anota las respuestas en tu documento de notas y no generes código hasta no haber completado este paso previamente.

---

### Paso 3 – Implementación (autocompletado)
1. Crea `TaskRepository.java` con un comentario para los 3 query methods (`findByStatus`, `findByPriority`, `findByStatusAndPriority`).
2. En la interfaz `TaskService`, añade los 2 métodos nuevos con un comentario.
3. En `Task`, añade con un comentario un método con `@PrePersist` que asigne `createdAt = LocalDateTime.now()` si viene vacío: ahora la tarea se guarda en MySQL y nadie más rellena esa fecha.
4. En `TaskServiceImpl`, comenta cada método que usa la lista en memoria, escribe debajo el comentario pidiendo que use el Repository (inyectado por constructor, con `Optional<T>`; si `findById()` devuelve vacío, lanza la misma excepción de "tarea no encontrada" que ya usabas en el Service), autocompleta uno a uno y borra lo comentado. Es la reescritura más grande de este sub-ejercicio: casi toda la clase cambia.

#### Restricciones para el autocompletado:
* No cambies los endpoints ni el Controller.
* No añadas lógica nueva en el Repository, sólo métodos de consulta.
* La lógica de negocio debe seguir en el Service, no en el Repository.
* Elimina completamente la lista en memoria de `TaskServiceImpl`.
* Mantén el comentario exacto en el código (no lo borres tras aceptar la sugerencia) y añade al final: `// — generado por IA`, para poder localizarlo fácilmente en la revisión.

---

### Paso 4 – Comprensión del código (Ask)
Una vez generado el código con autocompletado, no lo des por bueno automáticamente. Utiliza el modo Ask para responder las siguientes preguntas sobre dicho código:
1. ¿Por qué `TaskRepository` es una interface y no una clase? ¿Quién proporciona la implementación?
2. ¿Cómo interpreta Spring Data el método `findByStatusAndPriority()`? ¿Qué query SQL genera?
3. ¿Qué diferencia hay entre `findById()` que devuelve `Optional<Task>` y `getReferenceById()` que devuelve `Task` directamente?
4. ¿Qué hace `save()` cuando la entidad ya tiene id? ¿Y cuando no tiene id?
5. ¿Qué pasaría si llamas a `deleteById()` con un id que no existe?

> 📝 Anota las respuestas en tu `NOTAS-04-uso-de-spring-data-jpa.md`.

---

### Paso 5 – Validación en Postman
Este ejercicio es una refactorización del código del ejercicio anterior, con lo que no debe cambiar su comportamiento, así que verifica y valida tu código desde Postman, pero esta vez con los datos reales de la BBDD. Prueba con los siguientes casos y documenta el resultado real obtenido:

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `GET` | `http://localhost:8080/api/v1/tasks` | - | `200` + lista de tareas de la BBDD |
| `GET` | `http://localhost:8080/api/v1/tasks/1` | - | `200` + tarea con id 1 |
| `GET` | `http://localhost:8080/api/v1/tasks/99` | - | `404 Not Found` |
| `POST` | `http://localhost:8080/api/v1/tasks` | `{"title":"Tarea nueva", "status":"PENDING", "priority":"HIGH"}` | `201` + Tarea creada con id asignado por MySQL en la BBDD |
| `PUT` | `http://localhost:8080/api/v1/tasks/1` | `{"title":"Tarea actualizada", "status":"IN_PROGRESS", "priority":"HIGH"}` | `200` + tarea actualizada |
| `DELETE` | `http://localhost:8080/api/v1/tasks/7` | - | `204 No Content` |
| `GET` | `http://localhost:8080/api/v1/tasks/7` | - | `404 Not Found` (la tarea fue eliminada) |

* Adjunta capturas de pantalla de Postman mostrando el request y response para cada caso.
* ⚠️ Verifica en la BBDD de MySQL que los cambios se han realizado o se han persistido realmente ejecutando un `SELECT * FROM task` tras las operaciones de escritura.

#### Preguntas de Reflexión (Parte 1):
1. ¿Qué ventaja tiene que `TaskRepository` sea una interface que extiende `JpaRepository` frente a escribir las queries a mano?
2. ¿Dónde debe estar la lógica de negocio: en el Repository o en el Service? ¿Por qué?
3. Ahora que los datos vienen de MySQL, ¿qué problema ves en devolver directamente la entidad `Task` desde los endpoints?

---

## Parte 2: Spring Boot – Relaciones entre entidades

### 1. Descripción del Ejercicio
Para esta tarea, partimos del proyecto de la Parte anterior, donde `Task` es la única entidad JPA. En esta parte modelarás las entidades `Category` y `Tag` y sus relaciones con `Task`, para que las consultas de la Parte siguiente puedan recorrerlas:
* Una categoría puede tener muchas tareas y cada tarea pertenece a una categoría.
* Una tarea puede tener varios tags y un tag puede estar asignado a varias tareas.

Las tablas `category`, `tag` y la tabla intermedia `task_tag`, junto con la clave foránea `category_id` en `task`, ya existen en la BBDD desde el script SQL inicial (`init.sql`).

> ℹ️ **En esta parte solo se prepara el modelo:** todavía no se crean los Repository, Service ni Controller de `Category` y `Tag`, ni se asignan categorías o tags desde la API. Eso se hará en el ejercicio de creación de los DTO's.

### Objetivos de aprendizaje
* **Técnico:**
  * Mapear una relación `@OneToMany` / `@ManyToOne` entre dos entidades JPA (`Task` y `Category`).
  * Mapear una relación `@ManyToMany` con tabla intermedia (`@JoinTable`) entre `Task` y `Tag`.
  * Entender la diferencia entre relaciones unidireccionales y bidireccionales, y quién es el dueño de la relación.
  * Configurar `FetchType` y `CascadeType` correctamente.
  * Evitar problemas de serialización de las relaciones mientras la API siga devolviendo entidades.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que las relaciones están bien mapeadas con dos consultas de prueba (query methods de Spring Data).

---

### Paso 1 – Preparación (Ask)
Antes de generar código, utiliza el modo Ask para entender cómo se modelan las relaciones `@OneToMany` / `@ManyToOne` y `@ManyToMany` en JPA, la diferencia entre `FetchType.LAZY` y `EAGER`, el problema N+1 y qué riesgos tiene un cascade mal configurado. Formula tú las preguntas que consideres necesarias — sé concreto y evita preguntas redundantes entre sí.

> 📝 **Anota en `NOTAS-04-uso-de-spring-data-jpa.md`** la pregunta o preguntas exactas que le hiciste a Copilot y el resumen de sus respuestas. No generes código todavía.

---

### Paso 2 – Diseño previo
Antes de generar código, diseña y anota en tu `NOTAS-04-uso-de-spring-data-jpa.md` las respuestas a las siguientes preguntas:
1. ¿Qué campos tendrán las entidades `Category` y `Tag`?
2. ¿Cada relación será unidireccional o bidireccional? ¿Por qué?
3. ¿Quién será el dueño de cada relación? ¿Dónde irán `@JoinColumn` y `@JoinTable`?
4. ¿Qué `FetchType` y `CascadeType` usarás en cada relación? ¿Por qué?
5. ¿Qué problema crees que tendrá devolver estas entidades en JSON tal cual, con sus relaciones?
6. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

---

### Paso 3 – Implementación (autocompletado)
1. **Crea `Category.java`** (entidad JPA) con un comentario: `@Entity`, `@Table("category")`, `@Id`, `@GeneratedValue(IDENTITY)`, campos `id`/`name`/`description`, `@OneToMany(mappedBy="category", fetch = FetchType.LAZY)`.
2. **Crea `Tag.java`** (entidad JPA) con un comentario: `@Entity`, `@Table("tag")`, `@Id`, `@GeneratedValue(IDENTITY)`, campos `id`/`name`, `@ManyToMany(mappedBy="tags", fetch = FetchType.LAZY)`.
3. **En `Task`**, añade el campo `category` con `@ManyToOne(fetch = FetchType.LAZY)` + `@JoinColumn(name = "category_id")` con un comentario — es una adición de campo. Si `Task` ya tenía un campo `categoryId` (`Long`) mapeado a la columna `category_id`, sustitúyelo por esta relación: la misma columna no se puede mapear dos veces.
4. **En `Task`**, añade el campo `tags` con `@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})` + `@JoinTable("task_tag")` con un comentario — adición.

#### Restricciones para el autocompletado:
* Usa `FetchType.LAZY` en ambos lados de cada relación.
* No uses `CascadeType.ALL` en la relación `@OneToMany`: las tareas y las categorías tienen ciclos de vida independientes.
* `Task` es el dueño de la relación `@ManyToMany`: `@JoinTable` va en `Task`, `mappedBy` va en `Tag`. Usa solo `CascadeType.PERSIST` y `CascadeType.MERGE`, nunca `REMOVE` ni `ALL`.
* No crees Repository, Service ni Controller de `Category` ni de `Tag` en esta parte.
* No cambies los endpoints existentes de tareas.
* Mantén el comentario exacto en el código y añade al final: `// — generado por IA`.

---

### Paso 4 – Comprensión del código (Ask)
Responde en tu archivo de notas:
1. ¿Qué hace `mappedBy = "category"` en la anotación `@OneToMany`? ¿Qué pasaría si lo eliminas?
2. ¿Qué hace `@JoinColumn(name = "category_id")` en `Task`? ¿Quién es el dueño de la relación?
3. ¿Por qué se usa `FetchType.LAZY` y no `EAGER`? ¿Qué consulta SQL extra generaría `EAGER`?
4. ¿Por qué `@JoinTable` va en `Task` y no en `Tag`? ¿Qué hace `mappedBy = "tags"` en la entidad `Tag`?
5. ¿Qué pasaría si usaras `CascadeType.REMOVE` en la relación `@ManyToMany`? ¿Por qué es peligroso?
6. ¿Qué problema evita `@JsonIgnore` en las relaciones? ¿Por qué es solo una solución provisional?

---

### Paso 5 – Verificación
1. Arranca la aplicación y verifica que arranca sin errores (Hibernate valida el esquema con `ddl-auto=validate`) y que los endpoints de tareas siguen respondiendo igual que antes (`GET /api/v1/tasks` y `GET /api/v1/tasks/1`).
2. Si la respuesta es enorme o no tiene sentido, usa el modo Ask para diagnosticar la causa y aplica la medida provisional que te proponga.
3. **Consultas de prueba:** En `TaskRepository` añade:
   - `long countByCategoryId(Long categoryId);`
   - `long countByTagsId(Long tagId);`  
   Crea una clase temporal con un `CommandLineRunner` que las llame al arrancar e imprima en consola el resultado para la categoría 1 y para el tag 1. Comprueba que los números coinciden con los datos de prueba del `init.sql` (contrastándolos con un `SELECT` en MySQL).
4. *En esta parte no se valida con Postman, porque todavía no existen endpoints para Category ni para Tag.*

#### Preguntas de Reflexión (Parte 2):
1. ¿Por qué es importante que la relación de una tarea con su categoría sea opcional?
2. ¿Qué diferencia práctica hay entre una relación `@ManyToOne` y una `@ManyToMany` a nivel de tablas?
3. ¿Qué solución definitiva crees que habrá para devolver estas relaciones en la API sin `@JsonIgnore`? *(Pista: lo resolverás en el ejercicio de creación de los DTO's).*

---

## Parte 3: Spring Boot – Queries personalizadas

### 1. Descripción del Ejercicio
Para esta tarea, partimos del proyecto de la Parte anterior, donde `Task` ya está relacionada con `Category` y `Tag`, y el acceso a datos se limita a los métodos automáticos de `JpaRepository` y algunos query methods por nombre. En este ejercicio implementarás consultas más complejas que recorren esas relaciones, usando **JPQL** y combinando query methods por nombre.

### Objetivos de aprendizaje
* **Técnico:**
  * Escribir consultas personalizadas con `@Query` y JPQL, incluidas las que recorren relaciones (por categoría y por tag).
  * Combinar varias condiciones en un query method por nombre (`findByXAndY`).
  * Usar `@Param` para nombrar parámetros en las queries.
  * Exponer cada consulta personalizada como su propio endpoint en la API.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que las queries devuelven los resultados correctos con Postman.

---

### Paso 1 – Preparación (Ask)
Antes de generar código, utiliza el modo Ask para entender qué es JPQL, cuándo Spring Data genera la consulta por el nombre del método y cuándo hace falta `@Query`, y cómo se nombran los parámetros de una query.

> 📝 **Anota en `NOTAS-04-uso-de-spring-data-jpa.md`** las preguntas formuladas y un resumen de las respuestas.

---

### Paso 2 – Diseño previo
Diseña las 5 consultas y cómo las expondrás en la API:

| Consulta | Tipo | Endpoint |
|---|---|---|
| Buscar tareas por categoría | JPQL (`@Query`) | `GET /api/v1/tasks/by-category/{categoryId}` |
| Buscar tareas por tag | JPQL (`@Query`) | `GET /api/v1/tasks/by-tag/{tagId}` |
| Buscar tareas por status y priority | Query method por nombre (ya creado en Parte 1) | `GET /api/v1/tasks/by-status-priority?status=PENDING&priority=HIGH` |
| Buscar tareas con fecha límite anterior a una fecha | JPQL (`@Query`) | `GET /api/v1/tasks/before-date?date=2026-02-01` |
| Contar tareas de un status | JPQL (`@Query`) | `GET /api/v1/tasks/count-by-status?status=PENDING` |

---

### Paso 3 – Implementación (autocompletado)
En `TaskRepository`, añade cada `@Query` con su propio comentario — una por una, no todas a la vez:

```java
// Buscar por categoría
@Query("SELECT t FROM Task t WHERE t.category.id = :categoryId")
List<Task> findByCategoryId(@Param("categoryId") Long categoryId);

// Buscar por tag
@Query("SELECT t FROM Task t JOIN t.tags tag WHERE tag.id = :tagId")
List<Task> findByTagId(@Param("tagId") Long tagId);

// Buscar tareas con fecha límite anterior a una fecha
@Query("SELECT t FROM Task t WHERE t.dueDate < :date")
List<Task> findByDueDateBefore(@Param("date") LocalDate date);

// Contar tareas de un status concreto
@Query("SELECT COUNT(t) FROM Task t WHERE t.status = :status")
long countByStatus(@Param("status") TaskStatus status);
```

* **En `TaskService`:** añade los 5 métodos nuevos (`findByCategoryId`, `findByTagId`, `findByStatusAndPriority`, `findByDueDateBefore`, `getCountByStatus(TaskStatus status)`).
* **En `TaskServiceImpl`:** añade los métodos nuevos delegando en el Repository y devolviendo las entidades `Task`.
* **En `TaskController`:** añade un endpoint nuevo por cada método según la tabla del Paso 2. No modifiques el endpoint `GET /api/v1/tasks` ya existente.

#### Restricciones:
* No añadas lógica de negocio en el Repository, solo las anotaciones/consultas pedidas.
* No crees endpoints para `Category` ni para `Tag`: la API sigue devolviendo solo tareas.
* Añade al final: `// — generado por IA`.

---

### Paso 4 – Comprensión del código (Ask)
1. ¿Qué diferencia hay entre `SELECT t FROM Task t` en JPQL y `SELECT * FROM task` en SQL? ¿Por qué JPQL usa el nombre de la clase y no de la tabla?
2. ¿Qué hace `JOIN t.tags tag` en la query de búsqueda por tag? ¿Cómo sabe JPA que debe usar la tabla `task_tag`?
3. ¿Qué diferencia hay entre una consulta derivada del nombre del método (`findByStatusAndPriority`) y una escrita con `@Query`? ¿Cuál de las consultas de esta parte podría haberse resuelto también solo con el nombre del método?
4. ¿Qué SQL genera Hibernate para `SELECT COUNT(t) FROM Task t WHERE t.status = :status`? ¿Por qué se usa `COUNT(t)` y no `COUNT(*)`?
5. ¿Cuándo escribirías una consulta con `@Query` en JPQL en vez de dejar que Spring Data la genere por el nombre del método?

---

### Paso 5 – Validación en Postman
Prueba con los siguientes casos en Postman:

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| `GET` | `http://localhost:8080/api/v1/tasks/by-category/1` | - | `200` + tareas de la categoría 1 |
| `GET` | `http://localhost:8080/api/v1/tasks/by-tag/1` | - | `200` + tareas con el tag 1 |
| `GET` | `http://localhost:8080/api/v1/tasks/by-status-priority?status=PENDING&priority=HIGH` | - | `200` + tareas PENDING y HIGH |
| `GET` | `http://localhost:8080/api/v1/tasks/before-date?date=2026-02-01` | - | `200` + tareas con fecha límite anterior a esa fecha |
| `GET` | `http://localhost:8080/api/v1/tasks/count-by-status?status=PENDING` | - | `200` + número de tareas PENDING |
| `GET` | `http://localhost:8080/api/v1/tasks/by-category/99` | - | `200` + lista vacía |

* Activa `spring.jpa.show-sql=true` en `application.properties` y verifica en la consola que las queries SQL generadas por Hibernate son las esperadas.

#### Preguntas de Reflexión (Parte 3):
1. ¿Qué ventaja tiene un query method por nombre (`findByStatusAndPriority`) frente a escribir el JPQL a mano con `@Query`, cuando ambos hacen lo mismo?
2. ¿Qué problema de rendimiento podría surgir si la tabla `task` tuviera millones de registros y no hubiera índices en las columnas filtradas?
3. ¿Cuándo dejarías de usar query methods por nombre y empezarías a usar `@Query`?

---

## Parte 4: Spring Boot – Paginación y ordenación

### 1. Descripción del Ejercicio
Para esta tarea, partimos del proyecto de la Parte anterior, donde los endpoints del listado devuelven siempre todos los registros. En este ejercicio añadirás paginación y ordenación a los listados de tareas, de forma que el cliente pueda solicitar los datos en bloques manejables y en el orden que necesite. De momento, la respuesta paginada será el `Page<Task>` que genera Spring Data.

### Objetivos de aprendizaje
* **Técnico:**
  * Implementar paginación con `Pageable` y `PageRequest`.
  * Entender la diferencia entre `Page<T>` y `List<T>` y qué información extra aporta `Page<T>`.
  * Implementar ordenación con `Sort`.
  * Integrar paginación y ordenación en los endpoints REST como parámetros de query.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.
  * Verificar que la paginación y ordenación funcionan correctamente con Postman.

---

### Paso 1 – Preparación (Ask)
Antes de generar código, utiliza el modo Ask para entender qué es `Pageable`, qué aporta `Page<T>` frente a una lista simple, y por qué importa para el rendimiento.

---

### Paso 2 – Diseño previo
Responde en tu fichero de notas:
1. ¿Qué parámetros de query expondrás en el endpoint? Por ejemplo: `?page=0&size=10&sort=priority,asc`.
2. ¿Qué información trae `Page<T>` en la respuesta al cliente? (número de página, total de páginas, total de elementos, contenido...)
3. ¿Cómo afecta la paginación a las queries personalizadas de la Parte 3? ¿Necesitas modificarlas?
4. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

---

### Paso 3 – Implementación (autocompletado)
1. **En `TaskRepository`:** comenta cada método de búsqueda de tareas (`findByCategoryId`, `findByTagId`, `findByStatusAndPriority`), escribe debajo el comentario para que acepte `Pageable` y devuelva `Page<Task>`, autocompleta uno a uno y borra lo comentado. El método `findAll(Pageable)` ya viene heredado de `JpaRepository`.
2. **En la interfaz `TaskService`:** comenta las firmas actuales de los listados, pide el nuevo tipo de retorno (`Page<Task>`) con un comentario, autocompleta y borra.
3. **En `TaskServiceImpl`:** comenta el cuerpo de los métodos afectados, pide que pasen el `Pageable` al Repository y devuelvan el `Page<Task>`, autocompleta y borra.
4. **En `TaskController`:** comenta la firma de los endpoints de listado (`GET /api/v1/tasks`, `by-category`, `by-tag` y `by-status-priority`), pide los parámetros `page`/`size`/`sort` con un comentario, autocompleta y borra.

#### Restricciones:
* Los valores por defecto de paginación (`page=0`, `size=10`, `sort=createdAt,desc`) deben definirse en el Controller, no en el Service.
* El tamaño máximo de página debe limitarse a 100 para evitar consultas excesivas.
* No pagines los endpoints `GET /api/v1/tasks/count-by-status` ni `GET /api/v1/tasks/before-date`.
* No crees todavía un DTO propio para la respuesta paginada: devuelve el `Page<Task>` de Spring Data.

---

### Paso 4 – Comprensión del código (Ask)
1. ¿Qué hace `PageRequest.of(page, size, Sort.by(sort))` internamente? ¿Qué SQL genera Hibernate?
2. ¿Qué información incluye el `Page<Task>` en el JSON de la respuesta? ¿Qué ventaja tiene frente a devolver una `List<Task>`?
3. ¿Qué ocurre si el cliente solicita una página que no existe, por ejemplo `?page=999`? ¿Qué devuelve Spring Data?
4. ¿Qué diferencia hay entre ordenar por `createdAt,desc` y por `priority,asc` en términos de la query SQL generada?
5. ¿Por qué es importante limitar el tamaño máximo de página en un endpoint público?

---

### Paso 5 – Validación en Postman
Prueba los siguientes casos:

| Método | URL | Resultado esperado |
|---|---|---|
| `GET` | `http://localhost:8080/api/v1/tasks?page=0&size=3` | `200` + primeras 3 tareas + metadatos de paginación |
| `GET` | `http://localhost:8080/api/v1/tasks?page=1&size=3` | `200` + siguientes 3 tareas |
| `GET` | `http://localhost:8080/api/v1/tasks?page=0&size=3&sort=priority,asc` | `200` + tareas ordenadas por prioridad ascendente |
| `GET` | `http://localhost:8080/api/v1/tasks?page=0&size=3&sort=dueDate,desc` | `200` + tareas ordenadas por fecha límite descendente |
| `GET` | `http://localhost:8080/api/v1/tasks?page=999&size=10` | `200` + lista vacía con metadatos correctos |
| `GET` | `http://localhost:8080/api/v1/tasks/by-category/1?page=0&size=2` | `200` + 2 tareas de la categoría 1 + metadatos de paginación |
| `GET` | `http://localhost:8080/api/v1/tasks?size=200` | `400` o tamaño limitado a 100 |

* Verifica en los metadatos de la respuesta que `totalElements`, `totalPages` y `last` son correctos en cada caso.

#### Preguntas de Reflexión (Parte 4):
1. ¿Qué problema concreto resuelve la paginación en una API con muchos registros?
2. ¿Qué diferencia hay entre devolver un `Page<Task>` y una `List<Task>`? ¿Qué información extra aporta `Page`?
3. ¿Cómo afectaría la paginación a un cliente frontend que necesita mostrar todos los registros? ¿Cómo lo gestionarías?
4. ¿Qué inconveniente ves en devolver directamente el `Page<Task>` de Spring Data al cliente? *(Pista: lo resolverás en el ejercicio de creación de los DTO's).*

---

## Parte 5: Spring Boot – Transacciones

### 1. Descripción del Ejercicio
Para la realización de esta tarea, partimos del proyecto de la Parte anterior. Los métodos de escritura del Service se ejecutan sin control transaccional explícito. En este ejercicio añadirás `@Transactional` a esos métodos, para garantizar que si algo falla a mitad de una operación, la base de datos no quede en un estado inconsistente.

### Objetivos de aprendizaje
* **Técnico:**
  * Entender qué es una transacción y qué garantiza.
  * Aplicar `@Transactional` correctamente en la capa Service.
  * Verificar el comportamiento transaccional en la consola de Hibernate.
* **IA:**
  * Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  * Validar críticamente el código generado respondiendo preguntas concretas sobre él.

---

### Paso 1 – Preparación (Ask)
Antes de generar código, utiliza el modo Ask para entender qué garantiza una transacción y qué ocurre con los cambios ya realizados si el método falla a mitad de la operación. Formula tú las preguntas que consideres necesarias.

---

### Paso 2 – Diseño previo
Identifica en tu fichero de notas cuáles son los métodos de escritura de `TaskServiceImpl` (los que crean, actualizan o borran una `Task`). Escribe también el comentario exacto que escribirás para el autocompletado.

---

### Paso 3 – Implementación (autocompletado)
Es una anotación que se añade encima de cada método, no una reescritura de lógica: método a método, escribe el comentario pidiendo `@Transactional` y deja que el autocompletado sugiera la línea.

#### Restricciones para el autocompletado:
* `@Transactional` solo en la capa Service, nunca en el Controller ni en el Repository.
* Solo en los métodos de escritura (crear, actualizar, borrar). No lo añadas en los métodos de solo lectura.
* No añadas ninguna lógica nueva, solo las anotaciones.
* Mantén el comentario exacto en el código y añade al final: `// — generado por IA`.

---

### Paso 4 – Comprensión del código (Ask)
1. ¿Qué hace Spring cuando encuentra `@Transactional` en un método? ¿Qué ocurre si el método lanza una excepción?
2. ¿Qué pasaría si pusieras `@Transactional` en el Repository en lugar del Service?
3. ¿Qué diferencia hay entre un método de lectura y uno de escritura desde el punto de vista de la transacción?

---

### Paso 5 – Validación
1. Añade en `application.properties` la línea:
   ```properties
   logging.level.org.springframework.orm.jpa.JpaTransactionManager=DEBUG
   ```
   Así la consola muestra cuándo se abre, se confirma (`commit`) o se revierte (`rollback`) cada transacción.
2. Arranca la aplicación y verifica en la consola de Hibernate que las transacciones se aplican correctamente:
   - Ejecuta un `POST /api/v1/tasks` y observa en la consola el comportamiento transaccional de la operación de escritura.
   - Provoca un error a mitad de un método de escritura (por ejemplo, lanzando una excepción de prueba tras el primer `save()`) y comprueba que no queda ningún dato a medio guardar.
3. Adjunta capturas de la consola mostrando ambos casos.

#### Preguntas de Reflexión (Parte 5):
1. ¿Por qué `@Transactional` pertenece al Service y no al Repository?
2. ¿Qué problema concreto podría ocurrir en un método de escritura sin `@Transactional` si falla a mitad de la operación?
3. ¿Qué ocurriría si un método del Service llama a otro método del mismo Service que también tiene `@Transactional`?
