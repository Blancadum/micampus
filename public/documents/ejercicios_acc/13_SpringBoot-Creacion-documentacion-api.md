# Spring Boot – Creación de la Documentación de la API

> **Accenture · Programa Tu Futuro · 1ª Edición Back-End Java con GenAI**  
> **Proyecto:** `taskmanager`  
> **Plazo de entrega:** Martes, 3 de noviembre de 2026, 23:59  
> **Rama Git:** `08-creacion-de-la-documentacion-de-la-api` (a partir de `main-spring-boot`)  
> **Pull Request:** Hacia `main-spring-boot` con título *"Spring Boot – Creación de la documentación de la API"*  
> **Archivo de entrega:** `Spring Boot – Creación de la documentación de la API - Nombre Apellido.zip`

---

## 🎯 Objetivos de Aprendizaje

### 🛠️ Nivel Técnico
* Configurar `springdoc-openapi` para generar documentación OpenAPI 3 automática.
* Enriquecer la documentación mediante anotaciones oficiales: `@OpenAPIDefinition`, `@Tag`, `@Operation`, `@ApiResponse`, `@Content` y `@Schema`.
* Documentar códigos de estado HTTP realistas (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`) asociando el esquema `ErrorResponse.class` creado en el ejercicio anterior.
* Probar y verificar interactivamente la API desde Swagger UI (`http://localhost:8080/swagger-ui.html`).

### 🤖 Nivel de Inteligencia Artificial
* Usar **modo Ask** para comprender el rol de cada anotación antes de tocar el código.
* Emplear **autocompletado guiado por comentario** (`// — generado por IA`) para documentar pieza a pieza de manera sistemática.
* Verificar directamente el contrato en la interfaz visual de Swagger UI.

---

## 📋 Requisitos de Entrega

1. **Rama Git:** Crear la rama `08-creacion-de-la-documentacion-de-la-api` a partir de `main-spring-boot`.
2. **Fichero de Notas Obligatorio:** Crear `notas/NOTAS-08-creacion-de-la-documentacion-de-la-api.md` en la raíz del proyecto (al nivel de `pom.xml`) que contenga:
   * Las preguntas exactas realizadas a Copilot en el Paso 1 y el resumen de sus respuestas.
   * El diseño previo del Paso 3 (con los comentarios exactos de autocompletado).
   * Las respuestas a las preguntas del Paso 5 y la reflexión final.
3. **Carpeta de Capturas:** Guardar en `capturas/` las imágenes `Captura-08-creacion-de-la-documentacion-de-la-api-swagger-x.png` mostrando:
   * Cabecera OpenAPI (título, versión, descripción, contacto y servidor).
   * Los 3 controladores desplegados (`TaskController`, `CategoryController`, `TagController`).
   * Un endpoint desplegado con parámetros y respuestas (400/404 con `ErrorResponse`).
   * Ejecución interactiva *Try it out* de `GET /api/v1/tasks/{id}` con ID inexistente devolviendo `404 Not Found`.
4. **Javadoc:** Obligatorio a nivel de clase y en todos los métodos nuevos y modificados.
5. **Pull Request & ZIP:** Abrir PR hacia `main-spring-boot` y subir el archivo `.zip` comprimido al portal L2E LMS.

---

## 🚀 Guía de Pasos

### Paso 1 – Preparación (Modo Ask)
Formula preguntas sobre qué es OpenAPI, qué deduce Springdoc automáticamente a partir del código y validaciones (`@Valid`, `@NotNull`, `@Size`) y cuándo es necesario enriquecerlo con anotaciones manuales.

### Paso 2 – Añadir Dependencia Maven
Añadir `springdoc-openapi-starter-webmvc-ui` en `pom.xml`:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.6.0</version>
</dependency>
```
Arrancar la aplicación y verificar la redirección automática a:
`http://localhost:8080/swagger-ui.html` ➔ `/swagger-ui/index.html`

### Paso 3 – Diseño Previo
Planificar los tags para los 3 controladores:
* `task-controller`: Operaciones CRUD sobre tareas y filtros con paginación.
* `category-controller`: Gestión de categorías asociadas.
* `tag-controller`: Etiquetas para clasificación de tareas.

Identificar los DTOs que necesitan ejemplos con `@Schema` (`TaskRequestDTO`, `TaskResponseDTO`, `CategoryRequestDTO`, `TagRequestDTO`, `PagedResponseDTO`).

### Paso 4 – Implementación (Autocompletado)
* Crear `com.accenture.taskmanager.config.OpenApiConfig` con `@OpenAPIDefinition`, `@Info` y `@Server`.
* Añadir `@Tag` en cada controlador y `@Operation` + `@ApiResponse` en cada método.
* Asociar `@Content(schema = @Schema(implementation = ErrorResponse.class))` para respuestas 400 y 404.
* Enriquecer campos clave de DTOs con `@Schema(description = "...", example = "...")`.
* **Restricción:** Documentación en español, no duplicar lo que ya leen las anotaciones de Bean Validation, mantener `// — generado por IA` al final de cada comentario guía.

### Paso 5 – Comprensión del Código (Modo Ask)
Responder a las preguntas de control sobre `@Operation`, `@ApiResponse`, `@Schema(example = "...")` y el comportamiento por defecto de Swagger UI sin anotaciones.

### Paso 6 – Validación y Capturas
Ejecutar endpoints en Swagger UI y capturar evidencias en la carpeta `capturas/`.

### Preguntas de Reflexión
1. ¿Qué ventaja tiene Swagger UI frente a Postman para documentar y probar una API?
2. ¿Qué información añadirías o eliminarías de la documentación actual pensando en un equipo externo consumidor?
3. Mirando atrás desde el ejercicio 0 hasta aquí, ¿qué decisión de diseño cambiarías en la aplicación?
