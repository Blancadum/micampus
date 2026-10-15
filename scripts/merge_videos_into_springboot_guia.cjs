const fs = require('fs');
const path = require('path');

const guiaPath = path.resolve(__dirname, '../public/data/extra/springboot_guia.json');
const videosPath = path.resolve(__dirname, '../public/data/extra/accenture_videos_teoria.json');

const originalGuia = JSON.parse(fs.readFileSync(guiaPath, 'utf-8'));
const videoTopics = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));

// Helper to find video topic by id or slug
const getVideoTopic = (idOrSlug) => {
  return videoTopics.find(v => v.id === idOrSlug || v.slug === idOrSlug || v.slug.includes(idOrSlug));
};

// Map of enrichments
const enrichedTopics = [
  // 0. Orientación
  {
    id: "springboot-guia",
    title: "Cómo usar esta guía: cercano + enterprise + vídeos UPM",
    slug: "guia-unificada",
    moduleTitle: "Bloque 0: Orientación & Metodología",
    moduleShort: "Bloque 0",
    topicNum: "0.1",
    contentMd: `Esta ruta formativa unifica **tres pilares esenciales** para dominar Spring Boot y superar con éxito el Bootcamp de Accenture y las asignaturas universitarias:

1. **💡 Explicaciones intuitivas y cercanas:** Metáforas visuales, diagramas simplificados y analogías de ingeniería para asimilar los conceptos abstractos a la primera.
2. **🎬 Vídeos Recomendados UPM / Accenture:** Transcripciones enriquecidas con reproductores de vídeo interactivos de YouTube incrustados, esquemas conceptuales y marcas de tiempo (*timestamps*).
3. **🏭 Manual Enterprise y Prácticas Reales:** Código Java profesional para Visual Studio Code, patrones de arquitectura limpia (SOLID), Inyección de Dependencias, Spring Data JPA, validaciones y conexión directa con las **12 actividades prácticas de L2E**.

> **💡 Consejo de estudio:** Puedes reproducir los vídeos directamente intercalados en cada sección técnica, probar los ejemplos de código en tu IDE y saltar a los retos prácticos mediante la pestaña lateral derecha (**🛠️** o **🎬**).`
  },

  // Bloque 1: Fundamentos Web & Protocolos
  {
    id: "arquitectura-web",
    title: "Arquitectura Web: Monolitos, SPA y Arquitectura Hexagonal",
    slug: "arquitectura-web",
    moduleTitle: "Bloque 1: Fundamentos Web & Protocolos",

    topicNum: "1.1",
    contentMd: `Antes de programar en Spring Boot, es imprescindible comprender el terreno de juego sobre el que operan las aplicaciones backend.

---

${getVideoTopic("v0-1-arquitectura-http")?.contentMd.split("### 1.2. Protocolo HTTP")[0] || ""}`
  },

  {
    id: "protocolo-http",
    title: "Protocolo HTTP: Reglas, Mensajes, RTT y Sockets",
    slug: "protocolo-http",
    moduleTitle: "Bloque 1: Fundamentos Web & Protocolos",

    topicNum: "1.2",
    contentMd: `El protocolo **HTTP** (*Hypertext Transfer Protocol*) es el lenguaje universal que utilizan el cliente y el servidor backend para comunicarse.

---

${(() => {
  const v = getVideoTopic("v0-1-arquitectura-http")?.contentMd || "";
  const part = v.split("### 1.2. Protocolo HTTP: Reglas y Funcionamiento")[1];
  if (!part) return "";
  return "### 1.2. Reglas y Funcionamiento del Protocolo HTTP" + part.split("### 1.3. Protocolo HTTPS")[0];
})()}`
  },

  {
    id: "protocolo-https",
    title: "Protocolo HTTPS: Criptografía Híbrida y TLS Handshake",
    slug: "protocolo-https",
    moduleTitle: "Bloque 1: Fundamentos Web & Protocolos",

    topicNum: "1.3",
    contentMd: `El protocolo **HTTPS** garantiza la confidencialidad, integridad y autenticación de la comunicación entre clientes y APIs Spring Boot.

---

${(() => {
  const v = getVideoTopic("v0-1-arquitectura-http")?.contentMd || "";
  const part = v.split("### 1.3. Protocolo HTTPS: Arquitectura, Seguridad y Mecanismos Criptográficos")[1];
  return part ? "### 1.3. Arquitectura y Mecanismos Criptográficos de HTTPS\n\n" + part : "";
})()}`
  },

  {
    id: "json",
    title: "JSON y Jackson: Serialización, Deserialización y Anotaciones",
    slug: "json",
    moduleTitle: "Bloque 1: Fundamentos Web & Protocolos",

    topicNum: "1.4",
    contentMd: `**JSON** es el estándar de facto para el intercambio de datos en APIs REST. En Java y Spring Boot, la biblioteca encargada de esta traducción es **Jackson**.

---

${getVideoTopic("v0-2-json-jackson")?.contentMd || ""}`
  },

  {
    id: "jakarta-ee",
    title: "Jakarta EE: Estándares, Evolución y Relación con Spring",
    slug: "jakarta-ee",
    moduleTitle: "Bloque 1: Fundamentos Web & Protocolos",

    topicNum: "1.5",
    contentMd: `${getVideoTopic("v0-3-jakarta-ee")?.contentMd || ""}`
  },

  // Bloque 2: Ecosistema Java & Herramientas
  {
    id: "maven",
    title: "Maven: Gestión de Dependencias y Ciclo de Vida",
    slug: "maven",
    moduleTitle: "Bloque 2: Ecosistema Java",

    topicNum: "2.1",
    contentMd: `En el desarrollo empresarial con Java y Spring Boot, **Apache Maven** estandariza la compilación, pruebas y dependencias.

${(() => {
  const v = getVideoTopic("v0-4-maven-lombok")?.contentMd || "";
  return v.split("### 4.2. Project Lombok")[0];
})()}`
  },

  {
    id: "lombok",
    title: "Project Lombok: Productividad y Reducción de Boilerplate",
    slug: "lombok",
    moduleTitle: "Bloque 2: Ecosistema Java",

    topicNum: "2.2",
    contentMd: `${(() => {
  const v = getVideoTopic("v0-4-maven-lombok")?.contentMd || "";
  const part = v.split("### 4.2. Project Lombok")[1];
  return part ? "### 2.2. Project Lombok: Productividad y Reducción de Boilerplate\n\n" + part : "";
})()}`
  },

  {
    id: "vscode-workflow",
    title: "Guía Práctica y Depuración en Visual Studio Code",
    slug: "vscode-workflow",
    moduleTitle: "Bloque 2: Ecosistema Java",

    topicNum: "2.3",
    contentMd: `${getVideoTopic("v1-6-guia-vscode")?.contentMd || ""}`
  },

  // Bloque 3: Spring Core & IoC
  {
    id: "spring-core-modular",
    title: "Arquitectura Modular de Spring Framework (Core)",
    slug: "spring-core-modular",
    moduleTitle: "Bloque 3: Spring Core",

    topicNum: "3.1",
    contentMd: `Spring Framework está compuesto por aproximadamente 20 módulos desacoplados.

---

${getVideoTopic("v1-1-arquitectura-modular")?.contentMd || ""}`
  },

  {
    id: "spring-boot",
    title: "Spring Boot: Filosofía, Starters y Servidor Embebido",
    slug: "spring-boot",
    moduleTitle: "Bloque 3: Spring Core",

    topicNum: "3.2",
    contentMd: `Para entender la conveniencia de **Spring Boot**, conviene recordar que Spring Framework requería extensos archivos XML de configuración. Spring Boot introduce **Convención sobre Configuración**.

### ¿Qué hace a Spring Boot tan especial?
1. **Decisiones Opinadas:** Autoconfigura beans basados en el *classpath*.
2. **Servidor Embebido (Embedded Tomcat):** Empaqueta Tomcat dentro del archivo ejecutable \`.jar\`.
3. **Starters Todo-en-Uno:** Dependencias agrupadas como \`spring-boot-starter-web\`.

\`\`\`java
@SpringBootApplication
public class TaskManagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskManagerApplication.class, args);
    }
}
\`\`\`

Esta anotación combina tres metadatos clave:
- \`@EnableAutoConfiguration\`: Habilita la configuración mágica basada en dependencias.
- \`@ComponentScan\`: Busca clases marcadas con \`@Component\`, \`@Service\`, \`@Repository\` y \`@RestController\`.
- \`@Configuration\`: Permite declarar beans manuales.`
  },

  {
    id: "ioc-beans",
    title: "Inversión de Control (IoC) y el Contenedor de Spring",
    slug: "ioc-beans",
    moduleTitle: "Bloque 3: Spring Core",

    topicNum: "3.3",
    contentMd: `${getVideoTopic("v1-2-ioc-contenedor")?.contentMd || ""}\n\n---\n\n> 🛠️ **Actividad Práctica Relacionada:**\n> Pon a prueba la configuración de beans e Inversión de Control en la [Actividad 1. Uso de IoC](/accenture/tutorias/act-01) del Plan de Tutorías de Accenture.`
  },

  {
    id: "inyeccion-dependencias",
    title: "Inyección de Dependencias (DI): Mecanismos y Estrategias",
    slug: "inyeccion-dependencias",
    moduleTitle: "Bloque 3: Spring Core",

    topicNum: "3.4",
    contentMd: `${getVideoTopic("v1-3-inyeccion-dependencias")?.contentMd || ""}\n\n---\n\n> 🛠️ **Actividad Práctica Relacionada:**\n> Aplica los patrones de inyección por constructor y setter en la [Actividad 2. Uso de IoD](/accenture/tutorias/act-02).`
  },

  {
    id: "scopes-y-resoluciones",
    title: "Ciclo de Vida y Alcances de los Beans (Scopes)",
    slug: "scopes-y-resoluciones",
    moduleTitle: "Bloque 3: Spring Core",

    topicNum: "3.5",
    contentMd: `${getVideoTopic("v1-4-ciclo-vida-scopes")?.contentMd || ""}`
  },

  {
    id: "java-annotations",
    title: "Configuración 100% Java con Annotations y Clases Java",
    slug: "java-annotations",
    moduleTitle: "Bloque 3: Spring Core",

    topicNum: "3.6",
    contentMd: `${getVideoTopic("v1-5-java-annotations")?.contentMd || ""}\n\n---\n\n> 🛠️ **Actividades Prácticas Relacionadas:**\n> Practica la configuración moderna con \`@Configuration\` y \`@Bean\` en la [Actividad 3. Java Annotations](/accenture/tutorias/act-03) y [Actividad 4. Distintas configuraciones](/accenture/tutorias/act-04).`
  },

  // Bloque 4: Arquitectura por Capas & Buenas Prácticas
  {
    id: "arquitectura-capas",
    title: "Arquitectura por Capas en Spring Boot",
    slug: "arquitectura-capas",
    moduleTitle: "Bloque 4: Arquitectura y Persistencia",

    topicNum: "4.1",
    contentMd: `${getVideoTopic("v2-1-arquitectura-capas")?.contentMd || ""}\n\n---\n\n> 🛠️ **Actividades Prácticas Relacionadas:**\n> Desarrolla las capas Controller y Service en la [Actividad 5. Preparación del entorno](/accenture/tutorias/act-05), [Actividad 6. Creación del Controller](/accenture/tutorias/act-06) y [Actividad 7. Capa de Servicio](/accenture/tutorias/act-07).`
  },

  {
    id: "principios-solid",
    title: "Principios de Diseño Orientado a Objetos: SOLID (Caso Práctico)",
    slug: "principios-solid",
    moduleTitle: "Bloque 4: Arquitectura y Persistencia",

    topicNum: "4.2",
    contentMd: `${getVideoTopic("v2-2-principios-solid")?.contentMd || ""}`
  },

  {
    id: "jpa-hibernate",
    title: "JPA e Hibernate: Modelado de Entidades Relacionales",
    slug: "jpa-hibernate",
    moduleTitle: "Bloque 4: Arquitectura y Persistencia",

    topicNum: "4.3",
    contentMd: `### De Tablas SQL a Entidades JPA

JPA (*Jakarta Persistence API*) es la especificación estándar para mapear clases y atributos Java hacia tablas y columnas relacionales SQL (ORM). **Hibernate** es la implementación más extendida.

\`\`\`java
@Entity
@Table(name = "empleados")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private Double salario;

    @Enumerated(EnumType.STRING)
    private Departamento departamento;
}
\`\`\`

#### Reglas de Oro en Entidades JPA:
1. **Constructor vacío obligatorio:** Requerido por Hibernate para instanciar el objeto por reflexión (\`@NoArgsConstructor\`).
2. **Clave primaria identificativa:** Declarada con \`@Id\` y generada típicamente con \`GenerationType.IDENTITY\`.
3. **No exponer directamente entidades en la API:** Utiliza siempre el **patrón DTO** para evitar fugas de datos y bucles infinitos de serialización circular (\`@JsonIgnore\` o DTOs planos).

---

> 🛠️ **Actividad Práctica Relacionada:**
> Practica el modelado de entidades y relaciones relacionales en la [Actividad 8. Entidades y Relaciones](/accenture/tutorias/act-08) del Plan de Tutorías de Accenture.`
  },

  {
    id: "spring-data",
    title: "Spring Data JPA y Métodos de Consulta Automáticos",
    slug: "spring-data",
    moduleTitle: "Bloque 4: Arquitectura y Persistencia",

    topicNum: "4.4",
    contentMd: `### Repositorios Declarativos sin Código SQL Boilerplate

Spring Data JPA automatiza el acceso a la base de datos permitiendo definir interfaces que heredan de \`JpaRepository<Entidad, TipoId>\`:

\`\`\`java
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    // Consulta derivada automática por convención de nombre
    Optional<Empleado> findByEmail(String email);

    // Búsqueda con operadores relacionales
    List<Empleado> findBySalarioGreaterThan(Double salarioMinimo);

    // Consulta JPQL personalizada cuando el query es complejo
    @Query("SELECT e FROM Empleado e WHERE e.departamento = :dep ORDER BY e.salario DESC")
    List<Empleado> findTopByDepartamento(@Param("dep") Departamento dep);
}
\`\`\`

Spring genera en tiempo de ejecución la implementación con todas las operaciones CRUD fundamentales (\`save\`, \`findById\`, \`findAll\`, \`deleteById\`).

---

> 🛠️ **Actividad Práctica Relacionada:**
> Construye repositorios y consultas automáticas en la [Actividad 9. Spring Data JPA](/accenture/tutorias/act-09).`
  },

  // Bloque 5: APIs RESTful, Validaciones y Seguridad
  {
    id: "patron-dto",
    title: "Contratos de Comunicación: El Patrón DTO (Data Transfer Object)",
    slug: "patron-dto",
    moduleTitle: "Bloque 5: APIs y Seguridad",

    topicNum: "5.1",
    contentMd: `### ¿Por qué nunca exponer directamente las Entidades JPA?

1. **Seguridad:** Evita ataques de *Mass Assignment* (sobreescritura no autorizada de campos como \`rol\` o \`saldo\`).
2. **Desacoplamiento:** El modelo de base de datos puede evolucionar sin romper el contrato público que consumen las aplicaciones clientes (React, móviles).
3. **Validaciones específicas:** Un DTO de entrada (\`EmpleadoRequestDTO\`) tiene reglas de validación distintas a un DTO de respuesta (\`EmpleadoResponseDTO\`).

\`\`\`java
// DTO de entrada inmutable con Java Record y validaciones
public record EmpleadoCreateRequest(
    @NotBlank(message = "El nombre es obligatorio")
    String nombre,

    @Email(message = "El formato de email no es válido")
    @NotBlank
    String email,

    @Positive(message = "El salario debe ser mayor que 0")
    Double salario
) {}
\`\`\`

---

> 🛠️ **Actividad Práctica Relacionada:**
> Implementa DTOs y mapeos hacia entidades en la [Actividad 10. Creación de DTOs](/accenture/tutorias/act-10).`
  },

  {
    id: "validaciones",
    title: "Bean Validation (@Valid) y Manejo de Excepciones (@RestControllerAdvice)",
    slug: "validaciones",
    moduleTitle: "Bloque 5: APIs y Seguridad",

    topicNum: "5.2",
    contentMd: `### 1. Validaciones Declarativas con Bean Validation

Añade anotaciones como \`@NotNull\`, \`@NotBlank\`, \`@Size\`, \`@Min\`, \`@Max\` en tus DTOs y anota el parámetro del controlador con \`@Valid\`:

\`\`\`java
@PostMapping
public ResponseEntity<EmpleadoResponse> crear(@Valid @RequestBody EmpleadoCreateRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(empleadoService.crear(request));
}
\`\`\`

---

### 2. Manejo Centralizado de Excepciones con \`@RestControllerAdvice\`

Centraliza todos los errores en un formato estándar (RFC 7807 / RFC 9457 Problem Details) en lugar de dispersar bloques \`try-catch\` en los controladores:

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(f -> {
            errores.put(f.getField(), f.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
}
\`\`\`

---

> 🛠️ **Actividades Prácticas Relacionadas:**
> Implementa validaciones con \`@Valid\` en la [Actividad 11. Validaciones](/accenture/tutorias/act-11) y control global de errores en la [Actividad 12. Manejo de Errores](/accenture/tutorias/act-12).`
  },

  {
    id: "configuracion-perfiles",
    title: "Configuración Multientorno y Perfiles (`application.yml`)",
    slug: "configuracion-perfiles",
    moduleTitle: "Bloque 5: APIs y Seguridad",

    topicNum: "5.3",
    contentMd: `### Gestión de Perfiles (dev, test, prod)

En proyectos profesionales, nunca hardcodees credenciales ni URLs de bases de datos. Utiliza archivos YAML estructurados:

\`\`\`yaml
spring:
  profiles:
    active: dev

---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:h2:mem:taskmanager_dev
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: \${DB_URL}
    username: \${DB_USER}
    password: \${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
\`\`\``
  },

  {
    id: "seguridad-jwt",
    title: "Seguridad Stateless con Tokens JWT y Spring Security",
    slug: "seguridad-jwt",
    moduleTitle: "Bloque 5: APIs y Seguridad",

    topicNum: "5.4",
    contentMd: `En una arquitectura REST y microservicios, el servidor no almacena sesiones en memoria (arquitectura *Stateless*). La autenticación se resuelve mediante **JSON Web Tokens (JWT)** firmados criptográficamente.

\`\`\`text
CLIENTE                       SERVIDOR (Spring Boot)
   │                                     │
   │ 1. POST /auth/login {user, pass}   │
   ├────────────────────────────────────►│ (Verifica contraseña con BCrypt)
   │                                     │ (Genera JWT firmado con clave secreta)
   │ 2. Response 200 OK { token }        │
   │◄────────────────────────────────────┤
   │                                     │
   │ 3. GET /api/tareas                  │
   │    Header: Authorization: Bearer ey...
   ├────────────────────────────────────►│ (Filtro JwtAuthenticationFilter)
   │                                     │ (Valida firma y extrae Roles/Claims)
   │ 4. Response 200 OK [ tareas ]       │
   │◄────────────────────────────────────┤
\`\`\`

#### Partes de un JWT:
- **Header:** Algoritmo (\`HS256\`, \`RS256\`) y tipo de token.
- **Payload (Claims):** Datos públicos (usuario, roles, fecha de expiración \`exp\`).
- **Signature:** Hash criptográfico que impide la manipulación de datos por parte del cliente.`
  },

  // Bloque 6: Calidad, Testing y Despliegue
  {
    id: "testing",
    title: "Testing Profesional con JUnit 5 y Mockito",
    slug: "testing",
    moduleTitle: "Bloque 6: Calidad y Despliegue",

    topicNum: "6.1",
    contentMd: `Una API corporativa sin pruebas automatizadas es una bomba de relojería. En Spring Boot distinguimos dos niveles de pruebas:

1. **Pruebas Unitarias (@ExtendWith(MockitoExtension.class)):** Aíslan la lógica de la capa de servicio sustituyendo el repositorio por un simulador (*Mock*). Se ejecutan en milisegundos.
2. **Pruebas de Integración (@SpringBootTest / @WebMvcTest):** Levantan el contexto de Spring o el servidor web simulado (\`MockMvc\`) para verificar los endpoints HTTP.

\`\`\`java
@ExtendWith(MockitoExtension.class)
class EmpleadoServiceTest {

    @Mock
    private EmpleadoRepository empleadoRepository;

    @InjectMocks
    private EmpleadoService empleadoService;

    @Test
    void cuandoBuscarPorIdExiste_debeRetornarEmpleado() {
        Empleado mockEmp = Empleado.builder().id(1L).nombre("Blanca").build();
        when(empleadoRepository.findById(1L)).thenReturn(Optional.of(mockEmp));

        Empleado resultado = empleadoService.obtenerPorId(1L);

        assertNotNull(resultado);
        assertEquals("Blanca", resultado.getNombre());
        verify(empleadoRepository, times(1)).findById(1L);
    }
}
\`\`\``
  },

  {
    id: "docker",
    title: "Dockerización de Aplicaciones Spring Boot",
    slug: "docker",
    moduleTitle: "Bloque 6: Calidad y Despliegue",

    topicNum: "6.2",
    contentMd: `Docker elimina el clásico problema de *«en mi máquina funciona»*. Con un archivo \`Dockerfile\` multi-etapa creamos imágenes ligeras y seguras:

\`\`\`dockerfile
# Etapa 1: Compilación con Maven
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final mínima para producción
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\``
  },

  {
    id: "patrones-avanzados",
    title: "Patrones Avanzados y Buenas Prácticas de Arquitectura",
    slug: "patrones-avanzados",
    moduleTitle: "Bloque 6: Calidad y Despliegue",

    topicNum: "6.3",
    contentMd: `En sistemas distribuidos, la arquitectura evoluciona más allá del modelo clásico en capas:
- **Arquitectura Hexagonal (Ports & Adapters):** Desacopla las entidades de negocio de los frameworks web y de bases de datos.
- **Patrón CQRS:** Separa las consultas de lectura de las operaciones de modificación para maximizar el rendimiento.
- **Event-Driven:** Comunicación asíncrona mediante mensajería (Kafka, RabbitMQ) para evitar llamadas HTTP bloqueantes entre microservicios.`
  }
];

// Re-append the enterprise manual topics from originalGuia as Bloque 7
const enterpriseTopics = originalGuia.filter(t => t.moduleTitle && t.moduleTitle.includes('Manual Enterprise'));
enterpriseTopics.forEach(t => {
  t.moduleTitle = "Bloque 7: Manual Enterprise & Prácticas L2E";
  t.moduleShort = "Bloque 7";
  // Ensure contentMd is present
  if (!t.contentMd && t.contentHtml) {
    t.contentMd = t.contentHtml;
  }
  delete t.temaTitle;
  enrichedTopics.push(t);
});

// Append Evaluación Final as Bloque 8 at the very end
enrichedTopics.push({
  id: "autoevaluacion",
  title: "Test de Autoevaluación 360°",
  slug: "autoevaluacion",
  moduleTitle: "Bloque 8: Evaluación Final",
  moduleShort: "Bloque 8",
  topicNum: "8.1",
  contentMd: `Comprueba tu dominio de los fundamentos de Spring Boot respondiendo a estas preguntas de entrevista técnica:

1. **¿Qué diferencia fundamental existe entre Spring Framework y Spring Boot?**
   - *Respuesta:* Spring Framework es el contenedor de IoC y dependencias; Spring Boot es un conjunto de herramientas sobre Spring que proporciona autoconfiguración opinada, starters todo-en-uno y servidores Tomcat embebidos para agilizar el arranque.
2. **¿Por qué se desaconseja la inyección por campo (\`@Autowired private Servicio s;\`)?**
   - *Respuesta:* Porque dificulta las pruebas unitarias sin levantar el contexto de Spring, imposibilita declarar atributos inmutables (\`final\`) y oculta el acoplamiento excesivo. Se recomienda la inyección por constructor.
3. **¿Qué aporta el principio de Responsabilidad Única (SRP) en una API REST?**
   - *Respuesta:* Garantiza que los controladores solo gestionen el tráfico HTTP, los servicios apliquen las reglas de negocio y los repositorios manejen la persistencia SQL. Cada capa tiene una sola razón para cambiar.`
});

// Clean temaTitle and pre-format video embeds across all topics
enrichedTopics.forEach(t => {
  delete t.temaTitle;
  if (t.contentMd) {
    t.contentMd = t.contentMd.replace(/^#{1,4}\s*(?:🎬\s*)?(?:VIDEO|VÍDEO)?\s*([0-9\w\s]*?)\s*[-–:]\s*\[(.*?)\]\((https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\)]+)\)/gmi, (match, num, title, url) => {
      const cleanNum = num.trim();
      const cleanTitle = title.trim();
      const label = cleanNum 
        ? (cleanNum.toLowerCase().startsWith('video') || cleanNum.toLowerCase().startsWith('vídeo') ? cleanNum : 'VÍDEO ' + cleanNum) + ' · ' + cleanTitle 
        : cleanTitle;
      return `\n\n[🎬 ${label}](${url})\n\n`;
    });
  }
});

fs.writeFileSync(guiaPath, JSON.stringify(enrichedTopics, null, 2), 'utf-8');
console.log(`Successfully enriched ${enrichedTopics.length} topics into ${guiaPath}`);
