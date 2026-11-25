# Bloque 1: Fundamentos y Diseño

## 1.1 Qué es la Arquitectura Limpia
La separación de responsabilidades permite que las reglas de negocio no dependan de la base de datos ni del framework web.

> 💡 **Principio clave:** El corazón de tu aplicación no debe saber si los datos vienen de MySQL, un JSON o una API externa.

### Capas principales
- **Dominio:** Entidades puras y reglas de negocio.
- **Aplicación:** Casos de uso que coordinan el flujo.
- **Infraestructura:** Controladores REST, repositorios y adaptadores externos.

### Comparativa rápida
| Enfoque | Ideal para | Ventaja principal |
| --- | --- | --- |
| 3 Capas | CRUDs rápidos | Pocos archivos iniciales |
| Hexagonal | Lógica compleja | Tests unitarios sin BD |

Pregunta: ¿Por qué el dominio debe ser independiente del framework?
Respuesta: Para poder probar las reglas de negocio en milisegundos y cambiar de base de datos o framework sin reescribir la lógica central.

## 1.2 Primeros pasos con Spring Boot
Spring Boot simplifica la configuración mediante *starters* y servidor Tomcat embebido.

### Ejemplo de controlador REST
```java
@RestController
@RequestMapping("/api/saludo")
public class SaludoController {
    @GetMapping
    public String hola() {
        return "Hola MiCampus";
    }
}
```

Pregunta: ¿Qué anotación combina @Controller y @ResponseBody en Spring Boot?
Respuesta: @RestController.

# Bloque 2: Persistencia y Buenas Prácticas

## 2.1 Validación y DTOs
Nunca expongas entidades internas directamente en la API; utiliza DTOs para controlar qué datos entran y salen.

### Checklist de validación
- Usa `@Valid` en los parámetros del controlador.
- Devuelve códigos HTTP semánticos (`201 Created`, `404 Not Found`).

Pregunta: ¿Para qué sirve un DTO en una API REST?
Respuesta: Para desacoplar el contrato público de la API del modelo interno de persistencia y validar los datos de entrada.
