# Guía Maestra de Instrucciones de Entrega — Spring Boot
### Accenture & Fundación Universidad-Empresa | 1ª Edición Back-End Java con GenAI

Este documento reúne todas las directrices, convenios de nombrado, flujo de trabajo en Git/GitHub, requisitos de documentación y enlaces directos a la plataforma **L2E** para las entregas de actividades del curso.

---

## 📌 Tabla Resumen de Entregas

| Actividad | Nombre Oficial | Proyecto Maven | Rama Git | Carpeta / PR | Nombre del Archivo ZIP | ID L2E | Fecha Límite |
|---|---|---|---|---|---|---|---|
| **Act. 1** | Uso de IoC | `JavaSpringIoC` | `SPRING-BOOT` | Carpeta: `Spring Boot - Uso de IoC - Nombre Apellido` | `Spring Boot - Uso de IoC - Nombre Apellido.zip` | [8537](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537) | 03/11/2026 23:59 |
| **Act. 2** | Uso de IoD | `JavaSpringIoD` | `SPRING-BOOT` | Carpeta: `Spring Boot - Uso de IoD - Nombre Apellido` | `Spring Boot - Uso de IoD - Nombre Apellido.zip` | [8539](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539) | 03/11/2026 23:59 |
| **Act. 3** | Java Annotations | `JavaSpringConfigClaseJava` | `SPRING-BOOT` | Carpeta: `Spring Boot - Uso de Java Annotations - Nombre Apellido` | `Spring Boot - Uso de Java Annotations - Nombre Apellido.zip` | [8539](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539) | 03/11/2026 23:59 |
| **Act. 4** | Distintas Config. | `JavaSpringEventosMusicales` | `SPRING-BOOT` | Carpeta: `Spring Boot – Config en Spring - Nombre Apellido` | `Spring Boot - Config en Spring - Nombre Apellido.zip` | [8540](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540) | 03/11/2026 23:59 |
| **Act. 5** | Preparación Entorno | `taskmanager` | `00-preparacion-del-entorno` (origen: `main-spring-boot`) | PR: `Spring Boot – Preparación del entorno` + `notas/NOTAS-00-preparacion-del-entorno.md` | `Spring Boot – Preparación del entorno - Nombre Apellido.zip` | [8541](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541) | 03/11/2026 23:59 |
| **Act. 6** | Creación Controller | `taskmanager` | `01-creacion-del-controller` (origen: `main-spring-boot`) | PR: `Spring Boot – Creación del Controller` + `notas/NOTAS-01-creacion-del-controller.md` | `Spring Boot – Creación del Controller - Nombre Apellido.zip` | [8542](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542) | 03/11/2026 23:59 |
| **Act. 7** | Capa de Servicio | `taskmanager` | `02-creacion-de-la-capa-de-servicio` (origen: `main-spring-boot`) | PR: `Spring Boot – Creación de la Capa de Servicio` + `notas/NOTAS-02-creacion-de-la-capa-de-servicio.md` | `Spring Boot – Creación de la Capa de Servicio - Nombre Apellido.zip` | [8543](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |
| **Act. 8** | Entidades JPA | `taskmanager` | `03-creacion-de-la-capa-de-entidades-y-sus-relaciones` (origen: `main-spring-boot`) | PR: `Spring Boot – Introducción a JPA y modelado de entidades` + `notas/NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md` | `Spring Boot – Introducción a JPA y modelado de entidades - Nombre Apellido.zip` | [8544](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |
| **Act. 9** | Spring Data JPA | `taskmanager` | `04-uso-de-spring-data-jpa` (origen: `main-spring-boot`) | PR: `Spring Boot – Uso de Spring Data JPA` + `notas/NOTAS-04-uso-de-spring-data-jpa.md` | `Spring Boot – Uso de Spring Data JPA - Nombre Apellido.zip` | [8545](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |
| **Act. 10** | Creación DTO's | `taskmanager` | `05-creacion-de-los-dtos` (origen: `main-spring-boot`) | PR: `Spring Boot – Creación de los DTO's` + `notas/NOTAS-05-creacion-de-los-dtos.md` | `Spring Boot – Creación de los DTO's - Nombre Apellido.zip` | [8546](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |
| **Act. 11** | Validaciones | `taskmanager` | `06-uso-de-validaciones` (origen: `main-spring-boot`) | PR: `Spring Boot – Uso de Validaciones` + `notas/NOTAS-06-uso-de-validaciones.md` | `Spring Boot – Uso de Validaciones - Nombre Apellido.zip` | [8547](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |
| **Act. 12** | Manejo de Errores | `taskmanager` | `07-manejo-de-errores` (origen: `main-spring-boot`) | PR: `Spring Boot – Manejo global de errores` + `notas/NOTAS-07-manejo-de-errores.md` | `Spring Boot – Manejo global de errores - Nombre Apellido.zip` | [8548](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |
| **Act. 13** | Documentación API | `taskmanager` | `08-creacion-de-la-documentacion-de-la-api` (origen: `main-spring-boot`) | PR: `Spring Boot – Creación de la documentación de la API` + `notas/NOTAS-08-creacion-de-la-documentacion-de-la-api.md` | `Spring Boot – Creación de la documentación de la API - Nombre Apellido.zip` | [8549](https://l2eportal-lms.cclearning.accenture.com) | 03/11/2026 23:59 |

---

## 🎯 Reglas Transversales Obligatorias

### 1. Nomenclatura Personal
- Sustituye siempre `Nombre Apellido` por tu nombre y primer apellido reales (por ejemplo: `Blanca Perez`).
- Respeta los espacios y guiones en los nombres de carpeta y archivos ZIP.

### 2. Documentación Javadoc
- **Obligatorio** en todas las actividades a nivel de clase y en **todos** los métodos públicos (descripción, `@param`, `@return`).

### 3. Carpeta de Notas (`notas/`) para Spring Boot (Actividades 5 y 6 en adelante)
- La carpeta `notas/` debe situarse en la raíz del proyecto (al mismo nivel que `pom.xml`).
- Los ficheros siguen el formato: `NOTAS-<nombre-de-la-rama>.md`.
- **¡Importante!** Nunca borres ni modifiques las notas de actividades anteriores al avanzar de rama; deben acumularse secuencialmente.

### 4. Política de Uso de Inteligencia Artificial (GenAI)
- **Actividades 1 a 4 (Fundamentos):** Prohibido generar código con IA. El objetivo pedagógico es dominar manualmente IoC, DI, XML y `@Configuration`.
- **Actividad 5:** Modo **Ask** exclusivo para resolver dudas de estructura y dependencias sin delegar la configuración.
- **Actividad 6:** Modo **Ask** para diseño conceptual + **autocompletado por comentario** guiado paso a paso para los endpoints REST.

---

## 📋 Detalle por Actividad

---

### Actividad 1: Spring Boot — Uso de IoC
- **Fichero de especificación:** [`1_SpringBoot_Uso_IoC_enun.md`](file:///Users/blanca/Desktop/ICS-customizer/Accenture-springboot/1_SpringBoot_Uso_IoC_enun.md)
- **Objetivo:** Inversión de Control básica con contenedor Spring mediante `applicationContext.xml` (bean sin inyectar propiedades).
- **Proyecto Maven:** `JavaSpringIoC`
- **Dependencia:** `org.springframework:spring-context:6.2.6`
- **Clases:** `com.accenture.model.Grupo`
- **Pasos clave:**
  1. Crear `Grupo` con atributos `id`, `nombre`, `creacion`, `origen`, `genero`, getters/setters y `toString()`.
  2. Crear `src/main/resources/applicationContext.xml` definiendo el bean sin inyectar valores.
  3. En `Main`: instanciar contexto (`ClassPathXmlApplicationContext`), recuperar bean, setear datos (`Metallica`, `Estados Unidos`, `1981`, `Heavy Metal`), e imprimir.
  4. Redactar Javadoc completo.
- **Flujo de entrega:**
  - Rama Git: `SPRING-BOOT`
  - Carpeta en repo: `Spring Boot - Uso de IoC - Nombre Apellido`
  - Fichero ZIP: `Spring Boot - Uso de IoC - Nombre Apellido.zip`
  - Entrega L2E: [Tarea ID 8537](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537)

---

### Actividad 2: Spring Boot — Uso de IoD (Inyección de Dependencias)
- **Fichero de especificación:** [`2_SpringBoot_UsoIoD_enun.md`](file:///Users/blanca/Desktop/ICS-customizer/Accenture-springboot/2_SpringBoot_UsoIoD_enun.md)
- **Objetivo:** Inyección de dependencias con XML y desacoplamiento con fichero de propiedades externo.
- **Proyecto Maven:** `JavaSpringIoD`
- **Clases:** `com.accenture.model.Componente` y `com.accenture.model.Grupo` (con `List<Componente>`).
- **Pasos clave:**
  1. Crear `Componente` (`nombre`, `instrumento`) con constructores vacío y completo, getters/setters y `toString()`.
  2. Crear `Grupo` con `List<Componente>`, constructores y getters/setters.
  3. Crear `src/main/resources/datosGrupo.properties` (Metallica, 1981, Estados Unidos, Heavy Metal).
  4. En `src/main/resources/applicationContext.xml`:
     - Activar `<context:property-placeholder location="classpath:datosGrupo.properties"/>`.
     - Definir 4 beans de `Componente` (Hetfield: Voz, Hammett: Guitarra, Burton: Bajo, Ulrich: Bateria).
     - Definir bean de `Grupo` inyectando propiedades desde `.properties` y la lista de los 4 beans `Componente`.
  5. En `Main`: recuperar bean `Grupo` e imprimir datos del grupo y sus integrantes.
- **Flujo de entrega:**
  - Rama Git: `SPRING-BOOT`
  - Carpeta en repo: `Spring Boot - Uso de IoD - Nombre Apellido`
  - Fichero ZIP: `Spring Boot - Uso de IoD - Nombre Apellido.zip`
  - Entrega L2E: [Tarea ID 8539](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)

---

### Actividad 3: Spring Boot — Configuración con Java Annotations
- **Fichero de especificación:** [`3_SB_UsoJavaAnnotations_enun.md`](file:///Users/blanca/Desktop/ICS-customizer/Accenture-springboot/3_SB_UsoJavaAnnotations_enun.md)
- **Objetivo:** Sustituir completamente el fichero XML por una clase de configuración Java con anotaciones (`@Configuration`, `@Bean`, `@PropertySource`, `@Value`).
- **Proyecto Maven:** `JavaSpringConfigClaseJava`
- **Clases:**
  - Modelo: `Componente` y `Grupo` en `com.accenture.model`.
  - Configuración: `com.accenture.config.GruposConfig`.
- **Pasos clave:**
  1. Implementar `GruposConfig` con `@Configuration` y `@PropertySource("classpath:datosGrupo.properties")`.
  2. Definir métodos `@Bean` para los 4 componentes y el grupo.
  3. En `Main`: instanciar `AnnotationConfigApplicationContext(GruposConfig.class)`, recuperar bean e imprimir.
- **Flujo de entrega:**
  - Rama Git: `SPRING-BOOT`
  - Carpeta en repo: `Spring Boot - Uso de Java Annotations - Nombre Apellido`
  - Fichero ZIP: `Spring Boot - Uso de Java Annotations - Nombre Apellido.zip`
  - Entrega L2E: [Tarea ID 8539](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)

---

### Actividad 4: Spring Boot — Distintas Configuraciones en Spring
- **Fichero de especificación:** [`4_SB_Distintas_config_enun.md`](file:///Users/blanca/Desktop/ICS-customizer/Accenture-springboot/4_SB_Distintas_config_enun.md)
- **Objetivo:** Comparar de forma práctica en un único proyecto las 3 formas de configuración: XML puro, XML + Anotaciones, y 100% JavaConfig.
- **Proyecto Maven:** `JavaSpringEventosMusicales`
- **Clases:**
  - Modelo: `com.accenture.model.Evento`.
  - Servicio: interfaz `com.accenture.services.GestionEventos` e implementación `GestionEventosImpl`.
- **Tres configuraciones:**
  - **Opción 1:** `applicationContextXML.xml` (todos los beans y la inyección en XML).
  - **Opción 2:** `applicationContext.xml` (beans `Evento` en XML; `GestionEventosImpl` con `@Service` y `@Autowired` con `component-scan`).
  - **Opción 3:** `EventosConfig.java` en `com.accenture.config` con `@Configuration`, `@ComponentScan` y `@Bean`.
- **Flujo de entrega:**
  - Rama Git: `SPRING-BOOT`
  - Carpeta en repo: `Spring Boot – Config en Spring - Nombre Apellido`
  - Fichero ZIP: `Spring Boot - Config en Spring - Nombre Apellido.zip`
  - Entrega L2E: [Tarea ID 8540](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540)

---

### Actividad 5: Spring Boot — Preparación del Entorno (00)
- **Fichero de especificación:** [`5_SB_00_Preparación_ent_enun.md`](file:///Users/blanca/Desktop/ICS-customizer/Accenture-springboot/5_SB_00_Preparacio%CC%81n_ent_enun.md)
- **Objetivo:** Inicializar el proyecto base `taskmanager` con Spring Initializr, validar arranque y documentar reflexiones iniciales con IA.
- **Configuración Initializr:** Maven, Java 17, Spring Boot 3.x, dependencia `Spring Web`, Group `com.accenture`, Artifact `taskmanager`.
- **Configuración en `application.properties`:**
  ```properties
  spring.application.name=taskmanager
  server.port=8080
  ```
- **Fichero obligatorio de notas:** `notas/NOTAS-00-preparacion-del-entorno.md` con:
  - Preguntas y respuestas de exploración en modo Ask.
  - Reflexión 1: Las 3 anotaciones de `@SpringBootApplication` (`@Configuration`, `@ComponentScan`, `@EnableAutoConfiguration`).
  - Reflexión 2: Causa del error 404 en `http://localhost:8080` (Tomcat arranca pero no existen rutas mapeadas en el `DispatcherServlet`).
  - Reflexión 3: Usos futuros de `application.properties` (BBDD, logs, puertos, perfiles).
- **Flujo de entrega:**
  - Rama Git: `00-preparacion-del-entorno` (creada a partir de `main-spring-boot`).
  - Pull Request en GitHub hacia `main-spring-boot` con título: `"Spring Boot – Preparación del entorno"`.
  - Fichero ZIP: `Spring Boot – Preparación del entorno - Nombre Apellido.zip`.
  - Entrega L2E: [Tarea ID 8541](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541).

---

### Actividad 6: Spring Boot — Creación del Controller REST (01)
- **Fichero de especificación:** [`6_SB01_Creación_Controller_enun.md`](file:///Users/blanca/Desktop/ICS-customizer/Accenture-springboot/6_SB01_Creacio%CC%81n_Controller_enun.md)
- **Objetivo:** Crear el primer Controller REST con operaciones CRUD completas en memoria devolviendo códigos de estado HTTP semánticos con `ResponseEntity<?>`.
- **Base del proyecto:** Sobre el proyecto `taskmanager` de la actividad 5.
- **Ruta base:** `/api/v1/tasks`
- **Operaciones:**
  - `GET /api/v1/tasks` → `200 OK` (lista de tareas)
  - `GET /api/v1/tasks/{id}` → `200 OK` / `404 Not Found`
  - `POST /api/v1/tasks` → `201 Created`
  - `PUT /api/v1/tasks/{id}` → `200 OK` / `404 Not Found`
  - `DELETE /api/v1/tasks/{id}` → `204 No Content` / `404 Not Found`
- **Fichero obligatorio de notas:** `notas/NOTAS-01-creacion-del-controller.md` con:
  - Preguntas previas en modo Ask (Paso 1).
  - Tabla de diseño previo de endpoints y comentarios de autocompletado (Paso 2).
  - Respuestas a las 5 preguntas de comprensión conceptual (Paso 4: `@RequestMapping`, `@PathVariable`, `@RequestBody`, `HttpStatus.CREATED` vs `ok()`, etc.).
  - Capturas de prueba en Postman (Paso 5).
- **Flujo de entrega:**
  - Rama Git: `01-creacion-del-controller` (creada a partir de `main-spring-boot`).
  - Pull Request en GitHub hacia `main-spring-boot` con título: `"Spring Boot – Creación del Controller"`.
  - Fichero ZIP: `Spring Boot – Creación del Controller - Nombre Apellido.zip`.
  - Entrega L2E: [Tarea ID 8542](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542).

---

## 🔗 Vinculación con Tutorías (`PLAN-TUTORIAS.md`) y Explicaciones de Israel (`Frikadas-isra`)

| Actividad | Tutoría de Referencia | Temas Tratados en Tutoría | Referencia en `Frikadas-isra` |
|---|---|---|---|
| **Act. 1 (IoC)** | **Tut 4 (Sem 2, Jueves)** | Fundamentos de Spring, Contenedor IoC, Beans | `tutoria-04-fundamentos-spring/src/main/java/tut04/_02_IoC_DI.java` |
| **Act. 2 (IoD)** | **Tut 4 (Sem 2, Jueves)** | Inyección de Dependencias, Inyección por constructor vs setter | `tut04/_02_IoC_DI.java` y `tut04/_00b_EstructuraSpring.java` |
| **Act. 3 (Java Annot.)** | **Tut 4 (Sem 2, Jueves)** | `@Configuration`, `@Bean`, estereotipos, `@PropertySource` | `tut04/_03_Beans_Anotaciones.java` |
| **Act. 4 (Distintas Config.)**| **Tut 4 (Sem 2, Jueves)** | Comparativa XML vs Anotaciones vs JavaConfig | `tut04/_02_IoC_DI.java` y `tut04/avanzado/` |
| **Act. 5 (Prep. Entorno)** | **Tut 5 (Sem 3, Martes)** | Arquitectura por capas, Principios SOLID, `@SpringBootApplication` | `tutoria-05-capas-solid-springboot/src/main/java/tut05/explicacion/_03_SpringBoot_Estructura.java` |
| **Act. 6 (Controller REST)** | **Tut 6 (Sem 3, Jueves)** | `@RestController`, `@RequestMapping`, `ResponseEntity`, HTTP Verbs | `tutoria-05-capas-solid-springboot/src/main/java/tut05/controlador/LibroController.java` |

---

## 🛠️ Comandos Git Rápidos de Referencia

### Para Actividades 1 a 4 (Rama `SPRING-BOOT`):
```bash
git checkout SPRING-BOOT
git add "Spring Boot - Uso de IoC - Nombre Apellido"
git commit -m "feat(act1): implementacion de Inversion de Control con Spring XML"
git push origin SPRING-BOOT
```

### Para Actividad 5 (Rama `00-preparacion-del-entorno`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 00-preparacion-del-entorno
git add .
git commit -m "feat(entorno): configuracion inicial del proyecto taskmanager y notas"
git push -u origin 00-preparacion-del-entorno
# Abrir PR en GitHub: 00-preparacion-del-entorno -> main-spring-boot
```

### Para Actividad 6 (Rama `01-creacion-del-controller`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 01-creacion-del-controller
git add .
git commit -m "feat(controller): implementacion de TaskController REST con metodos CRUD en memoria"
git push -u origin 01-creacion-del-controller
# Abrir PR en GitHub: 01-creacion-del-controller -> main-spring-boot
```

### Para Actividad 7 (Rama `02-creacion-de-la-capa-de-servicio`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 02-creacion-de-la-capa-de-servicio
mkdir -p notas
touch notas/NOTAS-02-creacion-de-la-capa-de-servicio.md
git add .
git commit -m "feat(service): desacoplamiento y logica de negocio en TaskService y TaskServiceImpl"
git push -u origin 02-creacion-de-la-capa-de-servicio
# Abrir PR en GitHub: 02-creacion-de-la-capa-de-servicio -> main-spring-boot
# Título PR: Spring Boot – Creación de la Capa de Servicio
mvn clean
zip -r "Spring Boot – Creación de la Capa de Servicio - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```

### Para Actividad 8 (Rama `03-creacion-de-la-capa-de-entidades-y-sus-relaciones`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 03-creacion-de-la-capa-de-entidades-y-sus-relaciones
mkdir -p notas
touch notas/NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md
git add .
git commit -m "feat(jpa): mapeo de entidad Task, enums y conexion MySQL con ddl-auto=validate"
git push -u origin 03-creacion-de-la-capa-de-entidades-y-sus-relaciones
# Abrir PR en GitHub: 03-creacion-de-la-capa-de-entidades-y-sus-relaciones -> main-spring-boot
# Título PR: Spring Boot – Introducción a JPA y modelado de entidades
mvn clean
zip -r "Spring Boot – Introducción a JPA y modelado de entidades - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```

### Para Actividad 9 (Rama `04-uso-de-spring-data-jpa`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 04-uso-de-spring-data-jpa
mkdir -p notas
touch notas/NOTAS-04-uso-de-spring-data-jpa.md
git add .
git commit -m "feat(data-jpa): integracion TaskRepository JpaRepository, relaciones y paginacion"
git push -u origin 04-uso-de-spring-data-jpa
# Abrir PR en GitHub: 04-uso-de-spring-data-jpa -> main-spring-boot (al completar las 5 partes)
# Título PR: Spring Boot – Uso de Spring Data JPA
mvn clean
zip -r "Spring Boot – Uso de Spring Data JPA - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```

### Para Actividad 10 (Rama `05-creacion-de-los-dtos`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 05-creacion-de-los-dtos
mkdir -p notas
touch notas/NOTAS-05-creacion-de-los-dtos.md
git add .
git commit -m "feat(dto): blindaje de API con TaskRequestDTO, TaskResponseDTO y PagedResponseDTO"
git push -u origin 05-creacion-de-los-dtos
# Abrir PR en GitHub: 05-creacion-de-los-dtos -> main-spring-boot (al completar las 3 partes)
# Título PR: Spring Boot – Creación de los DTO's
mvn clean
zip -r "Spring Boot – Creación de los DTO's - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```

### Para Actividad 11 (Rama `06-uso-de-validaciones`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 06-uso-de-validaciones
mkdir -p notas
touch notas/NOTAS-06-uso-de-validaciones.md
git add .
git commit -m "feat(validations): validacion declarativa con @Valid y Bean Validation"
git push -u origin 06-uso-de-validaciones
# Abrir PR en GitHub: 06-uso-de-validaciones -> main-spring-boot
# Título PR: Spring Boot – Uso de Validaciones
mvn clean
zip -r "Spring Boot – Uso de Validaciones - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```

### Para Actividad 12 (Rama `07-manejo-de-errores`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 07-manejo-de-errores
mkdir -p notas
touch notas/NOTAS-07-manejo-de-errores.md
git add .
git commit -m "feat(error-handling): centralizacion con @RestControllerAdvice y ErrorResponse"
git push -u origin 07-manejo-de-errores
# Abrir PR en GitHub: 07-manejo-de-errores -> main-spring-boot
# Título PR: Spring Boot – Manejo global de errores
mvn clean
zip -r "Spring Boot – Manejo global de errores - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```

### Para Actividad 13 (Rama `08-creacion-de-la-documentacion-de-la-api`):
```bash
git checkout main-spring-boot
git pull origin main-spring-boot
git checkout -b 08-creacion-de-la-documentacion-de-la-api
mkdir -p notas
touch notas/NOTAS-08-creacion-de-la-documentacion-de-la-api.md
git add .
git commit -m "feat(openapi): springdoc-openapi, @OpenAPIDefinition, @Tag, @Operation y Swagger UI"
git push -u origin 08-creacion-de-la-documentacion-de-la-api
# Abrir PR en GitHub: 08-creacion-de-la-documentacion-de-la-api -> main-spring-boot
# Título PR: Spring Boot – Creación de la documentación de la API
mvn clean
zip -r "Spring Boot – Creación de la documentación de la API - Nombre Apellido.zip" . -x "target/*" ".git/*" ".DS_Store"
```
