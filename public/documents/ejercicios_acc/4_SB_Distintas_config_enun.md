# Actividad 4: Spring Boot — Distintas Configuraciones en Spring

> **Documento original:** `4_SB_Distintas_config_enun.pdf`  
> **Plataforma L2E:** [Spring Boot – Distintas configuraciones en Spring (ID: 8540)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540)  
> **Plazo de entrega:** Cierre: martes, 3 de noviembre de 2026, 23:59 (Apertura: lunes, 7 de septiembre de 2026, 07:00)  
> **Requisitos previos recomendados:** Módulos 0 y 1 de Spring Boot (Tutorías 1 a 4).

---

## 1. Descripción del Ejercicio

Para la realización de esta tarea, debes crear un nuevo proyecto **Java Maven** llamado `JavaSpringEventosMusicales` donde iremos creando los distintos componentes (clases Java, ficheros XML, clases de configuración) con la solución al ejercicio.

En esta tarea vamos a poner en práctica las distintas formas que existen para configurar el contenedor de Spring, comprobando la evolución histórica de configuración:
1. **Configuración XML clásica pura.**
2. **Configuración mixta (XML + Anotaciones de detección e inyección automática).**
3. **Configuración moderna 100% Java (Clase Java `@Configuration` + Anotaciones).**

La aplicación muestra por consola la lista de eventos disponibles para nuestros grupos musicales.

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

## 3. Modelo y Capa de Servicios

### A. Modelo: `com.accenture.model.Evento`
Atributos privados:
- `eventoId` (`int`): Id del evento.
- `nombre` (`String`): Nombre del evento musical.
- `descripcion` (`String`): Descripción del evento musical.
- `lugar` (`String`): Lugar del evento.
- `duracion` (`String`): Duración del evento.
- `tipoEvento` (`String`): Tipo del evento.
- `asientosDisponibles` (`int`): Número de asientos disponibles.

Métodos:
- Constructor vacío y constructor con parámetros.
- Getters y setters para todos los atributos.
- Sobrescribir `toString()`:
  ```
  <nombre> - <descripcion> - <lugar> - <duracion> - <tipoEvento> - <asientosDisponibles>
  ```

---

### B. Interfaz: `com.accenture.services.GestionEventos`
Define el contrato para gestionar los eventos:
```java
package com.accenture.services;

import java.util.List;
import com.accenture.model.Evento;

public interface GestionEventos {
    List<Evento> getAllEvents();
}
```

---

### C. Implementación: `com.accenture.services.GestionEventosImpl`
Implementa la interfaz `GestionEventos`:
- Atributo privado: `listaEventos` (`List<Evento>`).
- Getters y setters para `listaEventos`.
- Implementación de `getAllEvents()` devolviendo `listaEventos`.

---

## 4. Las Tres Formas de Configuración

### Datos de los 3 Eventos a configurar:
| Id | Nombre | Descripción | Lugar | Duración | Tipo | Asientos disp. |
|---|---|---|---|---|---|---|
| 1 | Concierto Metallica | World Tour 2024 | Madrid | 3 horas | Música | 67 |
| 2 | Concierto ACDC | Hellfest 2024 | Francia | 3 horas | Música | 130 |
| 3 | Concierto Iron Maiden | World Tour 2024 | Australia | 2 horas | Música | 310 |

---

### ❑ Opción 1: Configuración XML pura
- Fichero: `src/main/resources/applicationContextXML.xml`.
- Define los 3 beans `Evento` en el XML.
- Define el bean para `GestionEventosImpl` inyectando la lista de los 3 eventos mediante etiquetas XML (`<property name="listaEventos"><list>...</list></property>`).
- En `Main`: cargar `ClassPathXmlApplicationContext("applicationContextXML.xml")`, obtener bean `GestionEventos`, listar eventos.

---

### ❑ Opción 2: Configuración XML + Anotaciones
- Fichero: `src/main/resources/applicationContext.xml`.
- Define los 3 beans `Evento` en el XML.
- Habilita escaneo de componentes y anotaciones:
  ```xml
  <context:component-scan base-package="com.accenture" />
  <context:annotation-config />
  ```
- En `GestionEventosImpl`: anotar la clase con `@Service` (o `@Component`) e inyectar la lista con `@Autowired`.
- En `Main`: cargar `ClassPathXmlApplicationContext("applicationContext.xml")`, obtener bean y listar eventos.

---

### ❑ Opción 3: Configuración 100% Java (sin XML)
- Clase: `com.accenture.config.EventosConfig`.
- Anotar con `@Configuration` y `@ComponentScan(basePackages = "com.accenture")`.
- Definir 3 métodos con `@Bean` para crear y configurar cada uno de los 3 eventos.
- `GestionEventosImpl` se detecta e inyecta mediante `@Service` y `@Autowired`.
- En `Main`: cargar `AnnotationConfigApplicationContext(EventosConfig.class)`, obtener bean y listar eventos.

---

## 5. Resultado Esperado en Consola

```text
Listado de eventos
1 - Concierto Metallica - World Tour 2024 - Madrid - 3 horas - Musica - 67
2 - Concierto ACDC - Hellfest 2024 - Francia - 3 horas - Musica - 130
3 - Concierto Iron Maiden - World Tour 2024 - Australia - 2 horas - Musica - 310
```

---

## 6. Instrucciones de Entrega

1. **Subir al repositorio:**
   - Rama: `SPRING-BOOT`
   - Carpeta dentro de la rama: `Spring Boot – Config en Spring - Nombre Apellido`
   - Subir el proyecto Java Maven completo con las tres configuraciones implementadas.
2. **Exportar a archivo ZIP:**
   - Nombre del fichero ZIP: `Spring Boot - Config en Spring - Nombre Apellido.zip`
3. **Plataforma L2E:**
   - Subir el archivo `.zip` a la tarea correspondiente en la plataforma L2E:
   - [Enlace a la tarea L2E (ID 8540)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540)
