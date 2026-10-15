# Actividad 1: Spring Boot — Inversión de Control (Uso de IoC)

> **Documento original:** `1_SpringBoot_Uso_IoC_enun.pdf`  
> **Plataforma L2E:** [Spring Boot – Uso de IoC (ID: 8537)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Módulos 0 y 1 de Spring Boot (Tutorías 1 a 4).

---

## 1. Descripción del Ejercicio

Para la realización de esta tarea, debes crear un nuevo proyecto **Java Maven** llamado `JavaSpringIoC` donde iremos creando los distintos componentes (clases Java, ficheros XML,…) con la solución al ejercicio.

En esta tarea vamos a poner en práctica la **Inversión de Control (IoC)** de Spring, gestionando el ciclo de vida de los objetos a través del contenedor de Spring (IoC Container) mediante configuración XML básica.

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

### Paquete: `com.accenture.model`

Crear la clase `Grupo` que nos permita obtener o crear elementos de grupos musicales.

#### Atributos privados:
- `id` (`int`): Valor único identificativo del grupo.
- `nombre` (`String`): Nombre del grupo musical.
- `creacion` (`int`): Año de creación del grupo musical.
- `origen` (`String`): Lugar de origen o creación del grupo musical.
- `genero` (`String`): Tipo de género musical del grupo.

#### Métodos:
- Métodos **getters y setters** para todos los atributos.
- Constructor por defecto (vacío).
- Sobrescribir el método **`toString()`** para mostrar la información del grupo con el siguiente formato:
  ```
  <nombre> - <origen> <creacion> - <genero>
  ```

---

## 4. Fichero de Configuración XML

Crear el fichero XML de configuración de Spring en la ruta de recursos:
`src/main/resources/applicationContext.xml`

- Dentro de este fichero, crear/definir el **bean** para la clase `Grupo` **sin inyectar los valores** (la inyección/asignación se realizará posteriormente en el código Java).

Ejemplo de definición del bean:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Definición del bean Grupo sin inyectar propiedades -->
    <bean id="grupoBean" class="com.accenture.model.Grupo" />

</beans>
```

---

## 5. Clase Principal (`Main`) y Prueba

En la clase principal `Main` (dentro de su método `public static void main(String[] args)`):
1. **Crear el contexto** para el contenedor de Spring (`ClassPathXmlApplicationContext`).
2. **Recuperar la instancia** de tipo `Grupo` obteniendo el bean del contenedor (`context.getBean(...)`).
3. **Asignar valores** a los atributos de la instancia mediante sus métodos setters:
   - Nombre: `Metallica`
   - Origen: `Estados Unidos`
   - Creación: `1981`
   - Género: `Heavy Metal`
4. **Mostrar por consola** la información del grupo invocando el método `toString()`.
5. Cerrar el contexto de Spring (`context.close()`).

### Resultado Esperado por Consola:
```text
Metallica - Estados Unidos 1981 - Heavy Metal
```

---

## 6. Instrucciones de Entrega

1. **Subir al repositorio:**
   - Rama: `SPRING-BOOT`
   - Carpeta dentro de la rama: `Spring Boot - Uso de IoC - Nombre Apellido`
   - Subir el proyecto Java completo.
2. **Exportar a archivo ZIP:**
   - Nombre del fichero ZIP: `Spring Boot - Uso de IoC - Nombre Apellido.zip`
3. **Plataforma L2E:**
   - Subir el archivo `.zip` a la tarea correspondiente en la plataforma L2E:
   - [Enlace a la tarea L2E (ID 8537)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537)
