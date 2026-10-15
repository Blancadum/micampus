# Actividad 3: Spring Boot — Configuración con Java Annotations

> **Documento original:** `3_SB_UsoJavaAnnotations_enun.pdf`  
> **Plataforma L2E:** [Spring Boot – Uso de Java Annotations (ID: 8539)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Módulos 0 y 1 de Spring Boot (Tutorías 1 a 4).

---

## 1. Descripción del Ejercicio

Para la realización de esta tarea, debes crear un nuevo proyecto **Java Maven** llamado `JavaSpringConfigClaseJava` donde iremos creando los distintos componentes (clases Java, fichero de propiedades, etc.) con la solución al ejercicio.

En esta tarea vamos a poner en práctica la **Inversión de Control e Inyección de Dependencias de Spring**, pero en lugar de utilizar un fichero XML de configuración, utilizaremos una **clase Java de configuración** con anotaciones de Spring (`@Configuration`, `@Bean`, `@PropertySource`, `@Value`).

> ⚠️ **Requisito obligatorio:** Crear la documentación **Javadoc** a nivel de clase y a nivel de todos los métodos.

---

## 2. Configuración del Proyecto (Maven `pom.xml`)

Incluir en el fichero `pom.xml` la dependencia de Spring Context:

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.2.6</version>
</dependency>
```

---

## 3. Desarrollo de Clases del Modelo

Dentro del paquete `com.accenture.model`, crear las dos clases siguientes:

### A. Clase `Componente`
- Atributos privados:
  - `nombre` (`String`): Nombre del componente del grupo musical.
  - `instrumento` (`String`): Instrumento que toca.
- Métodos:
  - Constructor vacío y constructor con parámetros.
  - Getters y setters para todos los atributos.
  - Sobrescribir `toString()`:
    ```
    Componente: <nombre> a la <instrumento>
    ```

### B. Clase `Grupo`
- Atributos privados:
  - `id` (`int`): Valor único identificativo.
  - `nombre` (`String`): Nombre del grupo.
  - `creacion` (`int`): Año de creación.
  - `origen` (`String`): Lugar de origen.
  - `genero` (`String`): Género musical.
  - `componentes` (`List<Componente>`): Lista de los componentes del grupo.
- Métodos:
  - Constructor vacío y constructor con parámetros.
  - Getters y setters para todos los atributos.
  - Sobrescribir `toString()`:
    ```
    <nombre> - <origen> <creacion> - <genero>
    ```

---

## 4. Fichero de Propiedades (`datosGrupo.properties`)

Crear el fichero `datosGrupo.properties` en `src/main/resources/`:

```properties
nombre = Metallica
creacion = 1981
origen = Estados Unidos
genero = Heavy Metal
```

---

## 5. Clase Java de Configuración (`GruposConfig`)

En lugar de usar un fichero XML, crear dentro del paquete `com.accenture.config` la clase `GruposConfig`:

- Anotar la clase con `@Configuration`.
- Cargar las propiedades externas con `@PropertySource("classpath:datosGrupo.properties")`.
- Definir **4 métodos con `@Bean`** para crear las instancias de `Componente`:
  1. James Hetfield, Voz
  2. Kirk Hammett, Guitarra
  3. Cliff Burton, Bajo
  4. Lars Ulrich, Bateria
- Definir el **método con `@Bean`** para crear la instancia de `Grupo`:
  - Inyectar los valores desde `datosGrupo.properties` (por ejemplo mediante `@Value("${nombre}")`, etc.).
  - Inyectar la lista de componentes con los 4 beans creados previamente.

---

## 6. Clase Principal (`Main`) y Ejecución

En el método `main` de la clase principal:
1. Crear el contexto de Spring a través de la clase de configuración Java:
   ```java
   AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(GruposConfig.class);
   ```
2. Recuperar la instancia del bean de tipo `Grupo`.
3. Imprimir por consola la información del grupo y recorrer su lista de componentes.
4. Cerrar el contexto de Spring.

### Resultado Esperado por Consola:
```text
Metallica - Estados Unidos 1981 - Heavy Metal
Componente: James Hetfield a la Voz
Componente: Kirk Hammett a la Guitarra
Componente: Cliff Burton a la Bajo
Componente: Lars Ulrich a la Bateria
```

---

## 7. Instrucciones de Entrega

1. **Subir al repositorio:**
   - Rama: `SPRING-BOOT`
   - Carpeta dentro de la rama: `Spring Boot - Uso de Java Annotations - Nombre Apellido`
   - Subir el proyecto Java Maven completo.
2. **Exportar a archivo ZIP:**
   - Nombre del fichero ZIP: `Spring Boot - Uso de Java Annotations - Nombre Apellido.zip`
3. **Plataforma L2E:**
   - Subir el archivo `.zip` a la tarea correspondiente en la plataforma L2E:
   - [Enlace a la tarea L2E (ID 8539)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)
