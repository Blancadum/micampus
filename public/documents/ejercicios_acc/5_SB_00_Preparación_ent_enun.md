# Actividad 5: Spring Boot — Preparación del Entorno (00)

> **Documento original:** `5_SB_00_Preparación_ent_enun.pdf`  
> **Plataforma L2E:** [Spring Boot – Preparación del entorno (ID: 8541)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Módulo 2 (puntos 0, 1, 2 y 3) de Spring Boot (Tutoría 5).

---

## 1. Descripción del Ejercicio

Para la realización de esta tarea, debes crear un nuevo proyecto Spring Boot desde **Spring Initializr** (`https://start.spring.io`) o desde la extensión de Visual Studio Code. En este proyecto, llamado `taskmanager`, iremos creando los distintos componentes de la aplicación Task Manager en los ejercicios sucesivos.

> ℹ️ **Nota:** Este ejercicio **no tiene código de negocio**. El objetivo es tener el proyecto Spring Boot creado, configurado y arrancando correctamente antes de empezar a desarrollar la aplicación, así como establecer el flujo de trabajo con GitHub y notas de reflexión con IA.

### Objetivos de Aprendizaje:
- **Técnico:**
  - Crear un proyecto Spring Boot con las dependencias correctas.
  - Entender la estructura de carpetas de un proyecto Spring Boot.
  - Configurar el flujo de trabajo con ramas y Pull Requests en GitHub.
  - Verificar que el entorno está listo para los ejercicios siguientes.
- **IA (Modo Ask):**
  - Usar el modo Ask con preguntas propias, concretas y no redundantes para resolver dudas sobre la estructura del proyecto o dependencias, sin delegar la configuración completa.

---

## 2. Configuración en Spring Initializr (Paso 1)

| Campo | Valor |
|---|---|
| **Project** | Maven |
| **Language** | Java |
| **Spring Boot** | 3.X (última versión estable) |
| **Group** | `com.accenture` |
| **Artifact** | `taskmanager` |
| **Packaging** | Jar |
| **Java** | 17 |
| **Dependencies** | Spring Web |

Descarga y descomprime el proyecto en tu carpeta de trabajo del repositorio y ábrelo con Visual Studio Code.

---

## 3. Exploración de la Estructura con Copilot (Paso 2 - Ask)

Antes de modificar el proyecto, formula preguntas al asistente en modo Ask para comprender qué contiene el proyecto:
- Estructura de carpetas (`src/main/java`, `src/main/resources`, `src/test/java`).
- Clase principal con `@SpringBootApplication`.
- Ficheros de configuración y dependencias en `pom.xml`.

> ⚠️ Anota las preguntas exactas formuladas y un resumen de las respuestas en tu fichero de notas.

---

## 4. Configuración Mínima (Paso 3)

Abre el archivo `src/main/resources/application.properties` y añade:

```properties
spring.application.name=taskmanager
server.port=8080
```

---

## 5. Verificación de Arranque (Paso 4)

Arranca la aplicación desde Visual Studio Code (`TaskmanagerApplication.java` -> Run) y verifica:
1. La aplicación arranca sin errores en la consola (Tomcat arrancado en puerto 8080).
2. Comprueba en el navegador entrando a `http://localhost:8080`: devolverá un error **404 (Whitelabel Error Page)**, lo cual es **correcto** porque aún no hay ningún endpoint definido.
3. Si hubo algún error de arranque, utiliza el modo Ask para resolverlo y anótalo en el fichero de notas.

---

## 6. Fichero de Notas y Reflexión

En la raíz del proyecto (al mismo nivel que `pom.xml`), crea la carpeta `notas/` y dentro el fichero:
`notas/NOTAS-00-preparacion-del-entorno.md`

Debe contener:
1. **Preguntas formuladas a Copilot** en el Paso 2 (y Paso 4 si hubo errores de arranque) con un resumen de las respuestas.
2. **Respuestas a las tres preguntas de reflexión:**
   - **Pregunta 1:** ¿Qué hace `@SpringBootApplication` exactamente? ¿Qué tres anotaciones agrupa?
   - **Pregunta 2:** ¿Por qué el navegador devuelve un 404 si la aplicación está arrancada?
   - **Pregunta 3:** ¿Para qué crees que se usará `application.properties` más adelante?

> 📌 **Regla de oro:** En cada ejercicio posterior se creará un fichero nuevo en esa carpeta (`notas/NOTAS-nombre-de-la-rama.md`), sin modificar ni borrar los anteriores.

---

## 7. Instrucciones de Entrega

1. **Rama en GitHub:**
   - Crear la rama `00-preparacion-del-entorno` a partir de `main-spring-boot`.
   - Subir el proyecto completo incluyendo la carpeta `notas/NOTAS-00-preparacion-del-entorno.md`.
2. **Pull Request:**
   - Abrir un Pull Request hacia la rama `main-spring-boot` con el título:
     `Spring Boot – Preparación del entorno`
3. **Exportar a ZIP:**
   - Nombre de archivo: `Spring Boot – Preparación del entorno - Nombre Apellido.zip`
4. **Plataforma L2E:**
   - Subir el `.zip` a la tarea de L2E:
   - [Enlace de entrega L2E (ID 8541)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541)
