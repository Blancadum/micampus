# Actividad 2: Spring Boot — Inyección de Dependencias (Uso de IoD)

> **Documento original:** `2_SpringBoot_UsoIoD_enun.pdf`  
> **Plataforma L2E:** [Spring Boot – Uso de IoD / Annotations (ID: 8539)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Módulos 0 y 1 de Spring Boot (Tutorías 1 a 4).  
> ⚠️ **Nota docente:** Todavía no está permitido generar código con IA para esta actividad; el objetivo es afianzar los conceptos fundamentales manualmente.

---

## 1. Descripción del Ejercicio

Para la realización de esta tarea, debes crear un nuevo proyecto **Java Maven** llamado `JavaSpringIoD` donde iremos creando los distintos componentes (clases Java, ficheros XML, fichero de propiedades) con la solución al ejercicio.

En esta tarea vamos a poner en práctica la **Inyección de Dependencias (DI / IoD)** en Spring mediante ficheros XML y carga de ficheros externos `.properties`, inyectando objetos individuales y listas de beans.

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

## 3. Desarrollo de Clases

Dentro del paquete `com.accenture.model`, crear las dos clases siguientes:

### A. Clase `Componente`
Representa los componentes o integrantes musicales del grupo.

#### Atributos privados:
- `nombre` (`String`): Nombre del componente.
- `instrumento` (`String`): Instrumento que toca.

#### Métodos:
- Constructor vacío (por defecto).
- Constructor con parámetros (`nombre`, `instrumento`).
- Getters y setters para todos los atributos.
- Sobrescribir `toString()` con el siguiente formato exacto:
  ```
  Componente: <nombre> a la <instrumento>
  ```

---

### B. Clase `Grupo`
Representa al grupo musical y contiene la colección de sus componentes.

#### Atributos privados:
- `id` (`int`): Identificador único.
- `nombre` (`String`): Nombre del grupo musical.
- `creacion` (`int`): Año de creación o fundación.
- `origen` (`String`): Lugar o país de origen.
- `genero` (`String`): Género musical.
- `componentes` (`List<Componente>`): Lista de los componentes musicales del grupo.

#### Métodos:
- Constructor vacío (por defecto).
- Constructor con parámetros.
- Getters y setters para todos los atributos (incluyendo `getComponentes()` y `setComponentes(...)`).
- Sobrescribir `toString()` con el siguiente formato:
  ```
  <nombre> - <origen> <creacion> - <genero>
  ```

---

## 4. Fichero de Propiedades Externo

Crear el fichero `datosGrupo.properties` en `src/main/resources/`:

```properties
nombre = Metallica
creacion = 1981
origen = Estados Unidos
genero = Heavy Metal
```

---

## 5. Configuración XML (`applicationContext.xml`)

Crear el fichero `src/main/resources/applicationContext.xml` con:
1. Activar el lector de ficheros de propiedades (`<context:property-placeholder location="classpath:datosGrupo.properties"/>`).
2. Definir los **4 beans** para la clase `Componente`:
   - `componente1`: Nombre = `James Hetfield`, instrumento = `Voz`
   - `componente2`: Nombre = `Kirk Hammett`, instrumento = `Guitarra`
   - `componente3`: Nombre = `Cliff Burton`, instrumento = `Bajo`
   - `componente4`: Nombre = `Lars Ulrich`, instrumento = `Bateria`
3. Definir el **bean** para la clase `Grupo`:
   - Inyectar los valores desde el fichero `datosGrupo.properties` (ej. `${nombre}`, `${creacion}`, etc.).
   - Inyectar en el atributo `componentes` (de tipo `List<Componente>`) las referencias a los 4 beans anteriores mediante la etiqueta `<list><ref bean="..."/>...</list>`.

---

## 6. Clase Principal (`Main`) y Ejecución

En el método `main` de la clase principal:
1. Crear el contexto del contenedor Spring cargando `applicationContext.xml`.
2. Recuperar la instancia del bean de tipo `Grupo`.
3. Imprimir por consola la información del grupo y recorrer su lista de componentes imprimiendo cada uno.
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
   - Carpeta dentro de la rama: `Spring Boot - Uso de IoD - Nombre Apellido`
   - Subir el proyecto Java Maven completo.
2. **Exportar a archivo ZIP:**
   - Nombre del fichero ZIP: `Spring Boot - Uso de IoD - Nombre Apellido.zip`
3. **Plataforma L2E:**
   - Subir el archivo `.zip` a la tarea correspondiente en la plataforma L2E:
   - [Enlace a la tarea L2E (ID 8539)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539)
