# Parada SPRING BOOT — Actividades Oficiales Accenture

> **Plazo de entrega general:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Norma de entrega:** Proyectos exportados en formato `.zip` con la nomenclatura oficial y subidos a la plataforma L2E LMS.

---

## Actividad 1: Spring Boot – Uso de IoC

* **Documento:** `1_SpringBoot_Uso_IoC_enun.pdf` / [`1_SpringBoot_Uso_IoC_enun.md`](./1_SpringBoot_Uso_IoC_enun.md)
* **Plataforma L2E:** [Spring Boot – Uso de IoC (ID: 8537)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537)
* **Proyecto:** `JavaSpringIoC` (Maven)
* **Contenido:** Inversión de Control con configuración clásica en `applicationContext.xml`. Clase `Grupo` (Metallica, etc.) y recuperación del Bean mediante `ClassPathXmlApplicationContext`.
* **Entrega:** Rama `SPRING-BOOT`, carpeta y ZIP: `Spring Boot – Uso de IoC – Nombre Apellido.zip`.

---

## Actividad 2: Spring Boot – Uso de IoD

* **Documento:** `2_SpringBoot_UsoIoD_enun.pdf` / [`2_SpringBoot_UsoIoD_enun.md`](./2_SpringBoot_UsoIoD_enun.md)
* **Plataforma L2E:** [Spring Boot – Uso de IoD (ID: 8539)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)
* **Proyecto:** `JavaSpringIoD` (Maven)
* **Contenido:** Inyección de Dependencias por XML y archivo externo `datosGrupo.properties`. Inyección de colecciones/listas de Beans (`Componente` dentro de `Grupo`).
* **Entrega:** Rama `SPRING-BOOT`, carpeta y ZIP: `Spring Boot – Uso de IoD – Nombre Apellido.zip`.
* **Nota docente:** No está permitido generar código con IA para afianzar conceptos base.

---

## Actividad 3: Spring Boot – Uso de Java Annotations

* **Documento:** `3_SB_UsoJavaAnnotations_enun.pdf` / [`3_SB_UsoJavaAnnotations_enun.md`](./3_SB_UsoJavaAnnotations_enun.md)
* **Plataforma L2E:** [Spring Boot – Uso de Java Annotations](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)
* **Proyecto:** `JavaSpringConfigClaseJava` (Maven)
* **Contenido:** Configuración 100% Java (`@Configuration`, `@Bean`, `@PropertySource`, `@Value`) sustituyendo el XML.
* **Entrega:** Rama `SPRING-BOOT`, carpeta y ZIP: `Spring Boot – Java Annotations – Nombre Apellido.zip`.

---

## Actividad 4: Spring Boot – Distintas Configuraciones en Spring

* **Documento:** `4_SB_Distintas_config_enun.pdf` / [`4_SB_Distintas_config_enun.md`](./4_SB_Distintas_config_enun.md)
* **Plataforma L2E:** [Spring Boot – Distintas configuraciones en Spring (ID: 8540)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540)
* **Proyecto:** `JavaSpringEventosMusicales` (Maven)
* **Contenido:** Comparativa práctica de los 3 estilos de configuración: XML puro, mixto (XML + `@Component`/`@Autowired`) y Java puro (`@Configuration`).
* **Entrega:** Rama `SPRING-BOOT`, carpeta y ZIP: `Spring Boot – Config en Spring – Nombre Apellido.zip`.

---

## Actividad 5: Spring Boot – Preparación del Entorno

* **Documento:** `5_SB_00_Preparación_ent_enun.pdf` / [`5_SB_00_Preparación_ent_enun.md`](./5_SB_00_Preparaci%C3%B3n_ent_enun.md)
* **Plataforma L2E:** [Spring Boot – Preparación del entorno (ID: 8541)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541)
* **Proyecto:** `taskmanager` (Spring Boot Initializr 3.x)
* **Contenido:** Creación del proyecto base Task Manager, estructura de paquetes, Maven Wrapper, verificación de arranque en Tomcat (`localhost:8080`) y notas con IA (modo Ask).
* **Entrega:** Rama `00-preparacion-del-entorno`, Pull Request hacia `main-spring-boot` y ZIP: `Spring Boot – Preparación del entorno – Nombre Apellido.zip`.

---

## Actividad 6: Spring Boot – Creación del Controller

* **Documento:** `6_SB01_Creación_Controller_enun.pdf` / [`6_SB01_Creación_Controller_enun.md`](./6_SB01_Creaci%C3%B3n_Controller_enun.md)
* **Plataforma L2E:** [Spring Boot – Creación del Controller (ID: 8542)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542)
* **Proyecto:** `taskmanager`
* **Contenido:** Creación de `TaskController` (`@RestController`), endpoints CRUD `/api/v1/tasks` con lista en memoria, `ResponseEntity`, códigos HTTP y documentación Javadoc completa.
* **Entrega:** Rama `01-creacion-del-controller`, Pull Request hacia `main-spring-boot` y ZIP: `Spring Boot – Creación del Controller – Nombre Apellido.zip`.

---

## Actividad 7: Spring Boot – Creación de la Capa de Servicio

* **Documento:** `Spring Boot – Creación de la Capa de Servicio.pdf` / [`7_SpringBoot-Creacion-capa-servicio.md`](./7_SpringBoot-Creacion-capa-servicio.md)
* **Proyecto:** `taskmanager` (continuación de actividades 5 y 6)
* **Contenido:** Extracción de la lógica de negocio a la capa Service (`TaskService` y `TaskServiceImpl` con `@Service`), inyección por constructor en `TaskController`, principios SRP y DIP.
* **Entrega:** Rama `02-creacion-de-la-capa-de-servicio`, Pull Request hacia `main-spring-boot` y ZIP: `Spring Boot – Creación de la Capa de Servicio - Nombre Apellido.zip`.

---

## Actividad 8: Spring Boot – Creación de la Capa de Entidades y sus Relaciones

* **Documento:** `Spring Boot – Creación de la Capa de Entidades y sus relaciones.pdf` / [`8_SpringBoot-Creacion-capa-entidades-relaciones.md`](./8_SpringBoot-Creacion-capa-entidades-relaciones.md)
* **Script SQL:** [`init.sql`](https://l2eportal-lms.cclearning.accenture.com/pluginfile.php/302760/mod_assign/introattachment/0/init.sql?forcedownload=1)
* **Proyecto:** `taskmanager` (migración a persistencia relacional MySQL con JPA/Hibernate)
* **Contenido:** Mapeo de la entidad `Task` (`@Entity`, `@Table(name="task")`, `@Id`, `@GeneratedValue`), enums `TaskStatus` y `TaskPriority` con `@Enumerated(EnumType.STRING)`, conexión MySQL con `ddl-auto=validate` y pruebas JPQL con `EntityManager`.
* **Entrega:** Rama `03-creacion-de-la-capa-de-entidades-y-sus-relaciones`, Pull Request hacia `main-spring-boot` y ZIP: `Spring Boot – Introducción a JPA y modelado de entidades - Nombre Apellido.zip`.

---

## Actividad 9: Spring Boot – Uso de Spring Data JPA
* **Estado:** ⏳ Próximamente
* **Contenido previsto:** Implementación de `TaskRepository` extendiendo `JpaRepository`, consultas derivadas y conexión con base de datos H2/PostgreSQL.

---

## Actividad 10: Spring Boot – Creación de los DTO's
* **Estado:** ⏳ Próximamente
* **Contenido previsto:** Implementación del patrón Data Transfer Object (`TaskRequestDTO`, `TaskResponseDTO`) para blindar la capa de datos.

---

## Actividad 11: Spring Boot – Uso de Validaciones
* **Estado:** ⏳ Próximamente
* **Contenido previsto:** Validación declarativa con `@Valid`, Bean Validation (`@NotNull`, `@Size`, `@Email`) en DTOs.

---

## Actividad 12: Spring Boot – Manejo de Errores
* **Estado:** ⏳ Próximamente
* **Contenido previsto:** Centralización de excepciones con `@RestControllerAdvice` y respuestas de error homogéneas con códigos HTTP consistentes.

---

## Actividad 13: Spring Boot – Creación de la documentación de la API
* **Documento:** `Spring Boot – Creación de la documentación de la API.pdf` / [`13_SpringBoot-Creacion-documentacion-api.md`](./13_SpringBoot-Creacion-documentacion-api.md)
* **Proyecto:** `taskmanager` (OpenAPI 3 / Swagger UI)
* **Contenido:** Configuración de `springdoc-openapi-starter-webmvc-ui` (v2.6.0), enriquecimiento de controladores con `@Tag`, `@Operation` y `@ApiResponse`, anotaciones `@Schema` en DTOs con ejemplos en español, clase `OpenApiConfig` con `@OpenAPIDefinition` y `@Server`, y verificación interactiva en Swagger UI (`http://localhost:8080/swagger-ui.html`).
* **Entrega:** Rama `08-creacion-de-la-documentacion-de-la-api`, Pull Request hacia `main-spring-boot` con `NOTAS-08-creacion-de-la-documentacion-de-la-api.md`, capturas en `capturas/` y ZIP: `Spring Boot – Creación de la documentación de la API - Nombre Apellido.zip`.

