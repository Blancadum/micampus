# Actividad 8: Spring Boot — Introducción a JPA y Modelado de Entidades (03)

> **Documento original:** `Spring Boot – Creación de la Capa de Entidades y sus relaciones.pdf`  
> **Script de Base de Datos:** [`init.sql`](https://l2eportal-lms.cclearning.accenture.com/pluginfile.php/302760/mod_assign/introattachment/0/init.sql?forcedownload=1)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Puntos 8 y 9 del módulo 2 de Spring Boot (Persistencia con JPA y MySQL).  
> **Proyecto base:** Continuación de `taskmanager` de las actividades anteriores.

---

## 1. Descripción del Ejercicio

En nuestra aplicación, hasta ahora los datos se almacenaban en una lista en memoria que se perdía en cada reinicio. En esta tarea **vamos a migrar la aplicación a MySQL usando JPA e Hibernate**, modificando la clase `Task` para convertirla en una entidad mapeada contra una tabla real de la base de datos.

Este ejercicio marca un **punto de inflexión**: a partir de aquí, los datos son persistentes.

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.  
> 📁 **Fichero de notas:** Crear `notas/NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md`.

### Objetivos de Aprendizaje:
- **Técnico:**
  - Configurar Spring Boot para conectarse a **MySQL**.
  - Mapear una clase Java a una tabla de base de datos con anotaciones JPA (`@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`, `@Enumerated`).
  - Entender el rol de **Hibernate** como proveedor e implementación de la especificación JPA.
  - Conectar y validar el esquema de base de datos existente con `ddl-auto=validate`.
- **IA (Modo Ask + Autocompletado asistido):**
  - Describir en lenguaje natural, en un comentario, qué esperas que te sugiera el autocompletado antes de escribirlo.
  - Validar críticamente el código generado respondiendo preguntas conceptuales precisas.
  - Verificar que la conexión a base de datos y la validación de tablas funcionan sin errores.

---

## 2. Instrucciones de Entrega

1. **Rama en el repositorio:** Crear la rama `03-creacion-de-la-capa-de-entidades-y-sus-relaciones` a partir de `main-spring-boot`.
2. **Pull Request (PR):** Abrir un PR hacia `main-spring-boot` con el título:
   `Spring Boot – Introducción a JPA y modelado de entidades`
   - Incluir en el PR el fichero `notas/NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md` con las preguntas del Paso 2, diseño del Paso 5, respuestas del Paso 7, reflexiones y captura de la consola del Paso 8 (arranque con queries SQL de Hibernate).
3. **Exportación ZIP:** Exportar el proyecto completo en `.zip` con la nomenclatura:
   `Spring Boot – Introducción a JPA y modelado de entidades - Nombre Apellido.zip`
4. **Plataforma L2E:** Subir el `.zip` a la tarea correspondiente en la plataforma L2E.

---

## 3. Paso 1 — Preparación de la Base de Datos

1. Descargar el fichero `init.sql` adjunto en la plataforma L2E.
2. Ejecutar el script SQL en tu gestor MySQL local (desde VS Code o MySQL Workbench/CLI).
3. Verificar que la base de datos `taskmanager` existe y que las tablas `task`, `category`, `tag` y `task_tag` contienen datos de prueba.

---

## 4. Paso 2 — Preparación Conceptual (Ask)

Utiliza el modo Ask para profundizar en:
- Qué es JPA frente a Hibernate.
- Cómo mapea Hibernate los tipos Java a tipos relacionales de MySQL.
- Cuándo y por qué es obligatorio usar `@Column(name = "...")`.

> 📝 Registra tus preguntas y respuestas en `NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md`.

---

## 5. Paso 3 — Inclusión de Dependencias (`pom.xml`)

Añadir las dependencias de JPA y del driver de MySQL:

```xml
<!-- Spring Data JPA (Hibernate) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Driver Oficial MySQL Connector/J -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

## 6. Paso 4 — Configuración de MySQL (`application.properties`)

```properties
# Conexión a Base de Datos MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración JPA / Hibernate
# validate: Comprueba que las clases coincidan con las tablas sin modificarlas
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## 7. Paso 5 — Diseño Previo

Define antes de programar:
1. ¿Qué cambios necesita la clase `Task` para convertirse en una entidad JPA?
2. ¿Qué anotaciones esperas ver y para qué sirve cada una?
3. ¿Qué comentario exacto escribirás para que el autocompletado lo genere?

---

## 8. Paso 6 — Implementación de la Entidad y Enums

1. **Anotar `Task.java`:** `@Entity`, `@Table(name = "task")`, clave primaria con `@Id` y `@GeneratedValue(strategy = GenerationType.IDENTITY)`.
2. **Nuevos campos:**
   - `createdAt` (`LocalDateTime`) mapeado a columna `created_at`.
   - `categoryId` (`Long`, admite `null`) mapeado a columna `category_id`.
   - `dueDate` mapeado con `@Column(name = "due_date")`.
3. **Crear Enums:**
   - `TaskStatus.java`: (`PENDING`, `IN_PROGRESS`, `DONE`, etc.).
   - `TaskPriority.java`: (`LOW`, `MEDIUM`, `HIGH`).
   - Mapear en `Task` con `@Enumerated(EnumType.STRING)`.

### Restricciones para el autocompletado:
- **No toques el Controller ni la lógica del Service.** Solo adapta los constructores de prueba en `TaskServiceImpl` para compilar con los enums y campos nuevos.
- Nombres de columna idénticos a los de `init.sql`.
- Enums en archivos `.java` separados.
- No añadas relaciones `@ManyToOne` todavía (se realizarán en los ejercicios siguientes).
- Conserva el comentario exacto con la coletilla: `// — generado por IA`.

---

## 9. Paso 7 — Comprensión del Código (Ask)

1. ¿Qué diferencia hay entre `@Column(name = "due_date")` y no poner `@Column`? ¿Cuándo es obligatorio?
2. ¿Qué hace `@Enumerated(EnumType.STRING)` y qué pasaría si usaras `EnumType.ORDINAL`?
3. ¿Por qué se usa `GenerationType.IDENTITY` para MySQL y no `SEQUENCE`?
4. ¿Qué ocurre si el nombre de un campo Java no coincide con el nombre de la columna y no añades `@Column`?
5. ¿Qué hace `ddl-auto=validate` al arrancar? ¿Qué error daría si un campo no coincide con la tabla?

---

## 10. Paso 8 — Verificación de Arranque y Consultas JPQL

1. Arrancar la aplicación con `./mvnw spring-boot:run`.
2. Verificar que Hibernate valida el esquema sin lanzar excepciones.
3. Confirmar consultas JPQL con una prueba de conteo:
   ```java
   // DECISIÓN: contar cuántas Task hay, con EntityManager y una consulta JPQL
   em.createQuery("SELECT COUNT(t) FROM Task t", Long.class).getSingleResult();
   ```
4. Comprobar que el número devuelto coincide con las filas de prueba insertadas por `init.sql`.

---

## 11. Preguntas de Reflexión

1. ¿Qué ventaja tiene usar `ddl-auto=validate` frente a `ddl-auto=update` en un entorno profesional?
2. ¿Qué problema tendría exponer directamente la entidad `Task` en los endpoints de la API? *(Pista: se resolverá al crear los DTOs en la Actividad 10)*.
3. ¿Qué ocurriría si cambias el nombre de un campo en la entidad sin actualizar la base de datos?
