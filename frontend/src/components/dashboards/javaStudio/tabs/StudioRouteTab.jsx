import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

// =========================================================================
// 0. TABLA COMPARATIVA: EL SALTO ARQUITECTÓNICO DE JAVA 1 A SPRING BOOT
// =========================================================================
export const JAVA_TO_SPRING_COMPARISON = [
  {
    id: 'ioc',
    area: 'Creación de Objetos & Inversión de Control (IoC)',
    icon: '⚙️',
    porQueValeLaPena: 'Elimina el acoplamiento rígido ("new"). El framework asume la creación y orquestación del ciclo de vida de los componentes, facilitando testear con mocks en milisegundos.',
    java1: {
      titulo: 'Instanciación Manual con "new"',
      codigo: '// Acoplamiento fuerte de clases concretas\nConexionBD con = new ConexionMysql("localhost", 3306);\nRepositorioLibro repo = new RepositorioLibroImpl(con);\nServicioLibro servicio = new ServicioLibroImpl(repo);',
      problema: 'Si cambia el constructor o la implementación de una dependencia, debes refactorizar manualmente todas las clases clientes. Testear con aislamiento exige crear fakes artesanales.',
      badge: 'Acoplamiento Rígido'
    },
    spring: {
      titulo: 'Inyección de Dependencias (@Service / @Autowired)',
      codigo: '@Service\npublic class ServicioLibroImpl implements ServicioLibro {\n  private final RepositorioLibro repo;\n\n  // Inyección automática por constructor\n  public ServicioLibroImpl(RepositorioLibro repo) {\n    this.repo = repo;\n  }\n}',
      ventaja: 'El ApplicationContext de Spring Boot crea, conecta y mantiene las instancias en memoria como Singletons. Desacoplamiento absoluto guiado por interfaces.',
      badge: 'Inversión de Control (IoC)'
    }
  },
  {
    id: 'persistencia',
    area: 'Acceso a Base de Datos (Persistencia & ORM)',
    icon: '🗄️',
    porQueValeLaPena: 'Reduce en un 85% las líneas de código. Pasas de escribir SQL en texto plano y mapear ResultSets fila por fila, a declarar interfaces donde Spring genera el CRUD y las transacciones.',
    java1: {
      titulo: 'JDBC Artesanal con Connection y PreparedStatement',
      codigo: 'Connection conn = null;\nPreparedStatement ps = null;\nResultSet rs = null;\ntry {\n  conn = DriverManager.getConnection(url, user, pass);\n  ps = conn.prepareStatement("SELECT * FROM libros WHERE id = ?");\n  ps.setLong(1, id);\n  rs = ps.executeQuery();\n  if (rs.next()) {\n    Libro l = new Libro();\n    l.setId(rs.getLong("id"));\n    l.setTitulo(rs.getString("titulo"));\n    return l;\n  }\n} finally {\n  if (rs != null) rs.close();\n  if (ps != null) ps.close();\n  if (conn != null) conn.close();\n}',
      problema: 'Más del 75% del código es fontanería repetitiva (abrir/cerrar conexiones, parsear ResultSet). Riesgo crítico de SQL Injection por concatenación y fugas de memoria si se olvida cerrar recursos.',
      badge: 'JDBC Manual & Boilerplate'
    },
    spring: {
      titulo: 'Spring Data JPA & Repositorios Declarativos',
      codigo: 'public interface RepositorioLibro extends JpaRepository<Libro, Long> {\n  // Spring crea la consulta SQL automáticamente en runtime\n  List<Libro> findByAutorIgnoreCase(String autor);\n  boolean existsByIsbn(String isbn);\n}',
      ventaja: 'Cero código SQL repetitivo. Tienes CRUD completo, paginación, caché de 1er nivel de Hibernate y transacciones automáticas con @Transactional en la capa de servicio.',
      badge: 'Spring Data JPA & ORM'
    }
  },
  {
    id: 'servidor',
    area: 'Servidor HTTP & Despliegue',
    icon: '🚀',
    porQueValeLaPena: 'Convierte el despliegue en un proceso atómico de un solo comando. Ya no dependes de configurar servidores externos pesados ni lidiar con complejos archivos XML.',
    java1: {
      titulo: 'Servlets XML & Servidor Tomcat Externo',
      codigo: '<!-- web.xml -->\n<servlet>\n  <servlet-name>LibroServlet</servlet-name>\n  <servlet-class>com.empresa.LibroServlet</servlet-class>\n</servlet>\n<servlet-mapping>\n  <servlet-name>LibroServlet</servlet-name>\n  <url-pattern>/libros/*</url-pattern>\n</servlet-mapping>\n<!-- Requiere compilar en .WAR y desplegar en Tomcat externo -->',
      problema: 'Configuraciones XML verbosas propensas a errores tipográficos. Obliga a instalar, monitorizar y aprovisionar un contenedor de servlets externo independiente.',
      badge: 'WAR & Tomcat Externo'
    },
    spring: {
      titulo: 'Tomcat Embebido & Ejecutable Autónomo (FAT JAR)',
      codigo: '@SpringBootApplication\npublic class Application {\n  public static void main(String[] args) {\n    SpringApplication.run(Application.class, args);\n  }\n}\n// Ejecución directa en terminal o Dockerfile:\n// $ java -jar library-api.jar (Arranca en :8080 en 2s)',
      ventaja: 'El servidor HTTP (Tomcat o Netty) va empaquetado dentro del propio fichero JAR ejecutable. Portabilidad total, optimizado para contenedores Docker y despliegues cloud.',
      badge: 'FAT JAR Auto-contenido'
    }
  },
  {
    id: 'rest',
    area: 'APIs RESTful & Serialización JSON',
    icon: '🌐',
    porQueValeLaPena: 'Automatiza la lectura de parámetros, cabeceras y serialización JSON bidireccional. La arquitectura se comunica limpiamente con clientes frontend modernos.',
    java1: {
      titulo: 'Lectura de Streams & Serialización Imperativa',
      codigo: '// Leer inputStream del request a mano\nBufferedReader reader = request.getReader();\nStringBuilder json = new StringBuilder();\nString line;\nwhile ((line = reader.readLine()) != null) json.append(line);\nLibroDTO libro = new Gson().fromJson(json.toString(), LibroDTO.class);\n\n// Escribir respuesta\nresponse.setContentType("application/json;charset=UTF-8");\nresponse.setStatus(200);\nresponse.getWriter().write(new Gson().toJson(libro));',
      problema: 'Manipular buffers de bytes, codificaciones de caracteres y encabezados HTTP de forma artesanal. Inconsistencias en el formato de errores devueltos al cliente.',
      badge: 'Manejo Manual de Streams'
    },
    spring: {
      titulo: '@RestController & Mapeo Jackson Automático',
      codigo: '@RestController\n@RequestMapping("/api/libros")\npublic class LibroController {\n\n  @PostMapping\n  public ResponseEntity<LibroDTO> crear(@RequestBody @Valid LibroDTO dto) {\n    return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crear(dto));\n  }\n}',
      ventaja: 'Jackson convierte automáticamente el payload JSON a objetos y viceversa. ResponseEntity permite controlar con precisión semántica los códigos de estado HTTP (200, 201, 204, 404).',
      badge: '@RestController + Jackson'
    }
  },
  {
    id: 'validaciones',
    area: 'Validación de Datos en Entrada',
    icon: '🛡️',
    porQueValeLaPena: 'Garantiza la integridad de los datos en la frontera de la API antes de que lleguen a la lógica de negocio, mediante simples anotaciones estándar.',
    java1: {
      titulo: 'Bloques Repetitivos de "if / else"',
      codigo: 'if (dto.getTitulo() == null || dto.getTitulo().trim().isEmpty()) {\n  throw new IllegalArgumentException("El título es obligatorio");\n}\nif (dto.getPrecio() == null || dto.getPrecio() <= 0) {\n  throw new IllegalArgumentException("Precio inválido");\n}\nif (dto.getIsbn() == null || !dto.getIsbn().matches("^[0-9]{13}$")) {\n  throw new IllegalArgumentException("ISBN inválido");\n}',
      problema: 'Lógica de validación esparcida por todas las capas, redundante y difícil de auditar. Los fallos arrojan excepciones 500 no controladas hacia el usuario final.',
      badge: 'Validación Manual Dispersa'
    },
    spring: {
      titulo: 'Bean Validation Declarativo (@Valid) & DTOs',
      codigo: 'public record LibroDTO(\n  @NotBlank(message = "El título es obligatorio") String titulo,\n  @Positive(message = "El precio debe ser mayor que 0") Double precio,\n  @Pattern(regexp = "^[0-9]{13}$", message = "ISBN de 13 dígitos") String isbn\n) {}\n\n// Spring intercepta y rechaza con 400 Bad Request si no cumple',
      ventaja: 'Anotaciones declarativas de Java (JSR-380). El interceptor global @RestControllerAdvice captura automáticamente los errores y responde con un JSON uniforme estructurado.',
      badge: 'Bean Validation Declarativo'
    }
  },
  {
    id: 'seguridad',
    area: 'Seguridad & Autenticación',
    icon: '🔒',
    porQueValeLaPena: 'Pasa de sesiones en memoria con riesgo de fuga de estado y CSRF a una arquitectura stateless moderna con tokens JWT, lista para escalar en la nube.',
    java1: {
      titulo: 'Filtros Propios & Sesiones Stateful',
      codigo: 'HttpSession session = request.getSession(false);\nif (session == null || session.getAttribute("usuario") == null) {\n  response.sendRedirect("/login.jsp");\n  return;\n}',
      problema: 'Las sesiones se guardan en la memoria RAM del servidor. Imposibilita balancear carga entre múltiples instancias sin duplicar sesiones ni usar Sticky Sessions complejas.',
      badge: 'Sesiones con Estado (RAM)'
    },
    spring: {
      titulo: 'Spring Security 6 Stateless con JWT',
      codigo: '@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n  return http\n    .csrf(AbstractHttpConfigurer::disable)\n    .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))\n    .authorizeHttpRequests(auth -> auth\n      .requestMatchers("/api/auth/**").permitAll()\n      .anyRequest().authenticated())\n    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)\n    .build();\n}',
      ventaja: 'Arquitectura 100% Stateless: el cliente envía el token JWT en la cabecera Authorization: Bearer. Escalabilidad horizontal infinita y tolerancia a fallos.',
      badge: 'Stateless Security & JWT'
    }
  }
];

// =========================================================================
// 1. RUTA OPTIMIZADA: 7 NIVELES PROGRESIVOS (ORDEN PEDAGÓGICO CORREGIDO)
// =========================================================================
export const ROADMAP_LEVELS = [
  {
    nivel: 1,
    titulo: 'Fundamentos POO & Principios SOLID',
    subtitulo: 'Base de Ingeniería (Java POO & Patrones)',
    color: '#ea580c',
    icono: '☕',
    temas: [
      'Clases, Encapsulamiento, Modificadores de Acceso y Records',
      'Herencia, Polimorfismo, Sobrecarga y Sobrescritura de Métodos',
      'Clases Abstractas e Interfaces funcionales en Java Moderno',
      'Principios SOLID (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)',
      'Patrones de Diseño GoF (Singleton, Factory, Builder, Adapter, Decorator, Strategy)',
      'Colecciones Avanzadas (List, Set, Map) y Streams Funcionales'
    ],
    tabLink: 'poo',
    tabLabel: 'Ver 21 Lecc. en Java 1'
  },
  {
    nivel: 2,
    titulo: 'Spring Boot Core, Inversión de Control (IoC) & Ciclo de Beans',
    subtitulo: 'El Corazón del Framework',
    color: '#10b981',
    icono: '🌱',
    temas: [
      'El problema del acoplamiento por new y la Inversión de Control (IoC)',
      'ApplicationContext y Contenedor de Beans de Spring',
      'Inyección de Dependencias por Constructor (evitando @Autowired en campos)',
      'Anotaciones de estereotipo: @Component, @Service, @Repository, @Configuration',
      'Alcances de Beans (Singleton vs Prototype) y Lifecycle (@PostConstruct, @PreDestroy)',
      'Autoconfiguración, condicionales (@ConditionalOnClass) y Spring AOP (Aspectos)'
    ],
    tabLink: 'libro',
    tabLabel: 'Ver Cap. 1 y 2 en Spring Boot'
  },
  {
    nivel: 3,
    titulo: 'Arquitectura Web, APIs RESTful & Controladores',
    subtitulo: 'Transporte HTTP, Contratos y Serialización',
    color: '#0284c7',
    icono: '🌐',
    temas: [
      'Protocolo HTTP/HTTPS: Verbos (GET, POST, PUT, DELETE, PATCH), Códigos de Estado y Headers',
      'Ciclo de Vida de Petición con DispatcherServlet en Spring MVC',
      '@RestController, @RequestMapping, @PathVariable y @RequestParam',
      'Serialización y Deserialización JSON bidireccional con Jackson ObjectMapper',
      'Respuestas semánticas enriquecidas mediante ResponseEntity<T>',
      'Desacoplamiento con DTOs (Data Transfer Objects) y Mappers manuales'
    ],
    tabLink: 'libro',
    tabLabel: 'Ver Cap. 3 en Spring Boot'
  },
  {
    nivel: 4,
    titulo: 'Persistencia con Hibernate & Spring Data JPA',
    subtitulo: 'De JDBC tradicional al ORM Empresarial',
    color: '#f59e0b',
    icono: '🗄️',
    temas: [
      'El desajuste de impedancia objeto-relacional y la especificación JPA',
      'Anotaciones nucleares: @Entity, @Table, @Id, @GeneratedValue, @Column',
      'Ciclo de vida de entidades JPA: Transient, Managed/Persistent, Detached y Removed',
      'Objetos de valor embebibles (@Embeddable / @Embedded) y herencia (@Inheritance)',
      'Asociaciones relacionales: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany',
      'Optimización de consultas: JPQL, solución al Problema N+1 con JOIN FETCH y @EntityGraph'
    ],
    tabLink: 'libro',
    tabLabel: 'Ver Cap. 4 en Spring Boot'
  },
  {
    nivel: 5,
    titulo: 'Calidad, Observabilidad & Arquitectura Hexagonal',
    subtitulo: 'Robustez de Producción y Aislamiento de Dominio',
    color: '#6d28d9',
    icono: '🏛️',
    temas: [
      'Bean Validation declarativo (@Valid, @NotNull, @NotBlank, @Size, @Min)',
      'Validadores multicampo a nivel de clase (@ValidStock para coherencia de inventario)',
      'Manejo global centralizado de excepciones con @RestControllerAdvice y ProblemDetails',
      'Observabilidad: Registro estructurado con SLF4J/Logback y métricas con Spring Boot Actuator',
      'Documentación viva interactiva con SpringDoc OpenAPI 3 y Swagger UI',
      'Arquitectura Hexagonal (Ports & Adapters): Dominio puro aislado de la tecnología'
    ],
    tabLink: 'proyectos',
    tabLabel: 'Ver Proyectos y Capas'
  },
  {
    nivel: 6,
    titulo: 'Seguridad Stateless JWT, Testing & Docker',
    subtitulo: 'Seguridad de Red, Pruebas Automatizadas y Despliegue',
    color: '#6d28d9',
    icono: '🛡️',
    temas: [
      'Spring Security 6 con SecurityFilterChain y desactivación de CSRF para APIs REST',
      'Autenticación stateless con JSON Web Tokens (JWT) y filtro OncePerRequestFilter',
      'Control de acceso basado en roles (RBAC) con @PreAuthorize("hasRole(\'ADMIN\')")',
      'Pirámide de Testing: Pruebas unitarias con JUnit 5 y Mockito (@Mock, @InjectMocks)',
      'Pruebas de integración web con @WebMvcTest, MockMvc y @SpringBootTest',
      'Empaquetado y contenedorización con Dockerfiles multi-stage sobre Alpine Linux'
    ],
    tabLink: 'libro',
    tabLabel: 'Ver Cap. 6 y 7 en Spring Boot'
  },
  {
    nivel: 7,
    titulo: 'Proyectos Prácticos & Evaluación de Dominio',
    subtitulo: 'Construcción Práctica, Retos y Defensa Técnica',
    color: '#059669',
    icono: '🚀',
    temas: [
      '16 Actividades oficiales con código resuelto y rúbricas de evaluación',
      'TaskManager REST API: proyecto pedagógico paso a paso (Memoria en memoria ➔ JPA ➔ Docker)',
      'Librería REST API (BiblioTech): solución empresarial completa con app web interactiva',
      '5 Dilemas de Producción reales para entrenar el pensamiento crítico y la toma de decisiones',
      'Simulador Examen Scrum (10 Preguntas) y Quiz de Arquitectura (35 Preguntas)'
    ],
    tabLink: 'actividades',
    tabLabel: 'Ver Actividades & Retos'
  }
];

// =========================================================================
// 2. MATRIZ EXTENDIDA DE 6 BLOQUES Y 15 TEMAS DE LA GUÍA DE ESTUDIO
// =========================================================================
export const STUDY_BLOCKS = [
  {
    id: 'b1',
    bloque: 'Bloque 1',
    titulo: 'Fundamentos, Protocolo Web & Spring Core',
    badge: 'Temas 1 a 4',
    badgeColor: '#ea580c',
    temario: [
      { id: 't1', titulo: 'Tema 1: Arquitectura Web (MPA vs SPA) y Protocolo HTTP/HTTPS', resumen: 'Modelo cliente-servidor, petición/respuesta, sockets, códigos de estado (2xx, 3xx, 4xx, 5xx) y seguridad TLS.' },
      { id: 't2', titulo: 'Tema 2: Serialización JSON & Jackson ObjectMapper', resumen: 'Intercambio de datos universal, mapeo automático objeto-JSON, @JsonProperty, @JsonIgnore y prevención de recursión.' },
      { id: 't3', titulo: 'Tema 3: Maven, Lombok y Records en Java Moderno', resumen: 'Gestión de dependencias pom.xml, ciclo de vida (compile, test, package), reducción de boilerplate y datos inmutables.' },
      { id: 't4', titulo: 'Tema 4: Core Spring Framework (IoC, Inyección y AOP)', resumen: 'ApplicationContext, inversión de control, inyección por constructor, ciclo de vida de beans y aspectos transversales.' }
    ],
    enfoque: 'Arquitectura Web, protocolo HTTP, Jackson, ciclo Maven, Inversión de Control (IoC), Beans y Spring AOP.'
  },
  {
    id: 'b2',
    bloque: 'Bloque 2',
    titulo: 'Core Spring Boot, Principios SOLID & Capas',
    badge: 'Temas 5 a 8',
    badgeColor: '#10b981',
    temario: [
      { id: 't5', titulo: 'Tema 5: Principios SOLID y Arquitectura por Capas', resumen: 'Single Responsibility, Open/Closed, Liskov, Interface Segregation y Dependency Inversion en el diseño de microservicios.' },
      { id: 't6', titulo: 'Tema 6: Controladores REST y Semántica HTTP con ResponseEntity', resumen: 'DispatcherServlet, rutas semánticas, @PathVariable, @RequestParam y contratos estándar con ResponseEntity.' },
      { id: 't7', titulo: 'Tema 7: Servicios de Negocio e Inyección de Dependencias', resumen: 'Aislamiento de la lógica de negocio, transacciones ACID con @Transactional y servicios agnósticos de la web.' },
      { id: 't8', titulo: 'Tema 8: Hibernate & Mapeo Objeto-Relacional (ORM)', resumen: 'La impedancia objeto-relacional, SessionFactory, EntityManager, ciclo de vida de entidades (4 estados) y CRUD.' }
    ],
    enfoque: 'SOLID, autoconfiguración, DispatcherServlet, REST, transacciones ACID, arquitectura Hibernate y ciclo de vida JPA.'
  },
  {
    id: 'b3',
    bloque: 'Bloque 3',
    titulo: 'Persistencia Relacional Avanzada & DTOs',
    badge: 'Temas 9 y 10',
    badgeColor: '#0284c7',
    temario: [
      { id: 't9', titulo: 'Tema 9: Asociaciones JPA, Consultas JPQL y Problema N+1', resumen: 'Relaciones @OneToOne, @OneToMany, @ManyToOne, @ManyToMany, consultas JPQL, optimización con JOIN FETCH y @EntityGraph.' },
      { id: 't10', titulo: 'Tema 10: Desacoplamiento con DTOs y Spring Data JPA', resumen: 'Contratos Request/Response DTO con Records, Mappers manuales sin lambdas complejas y repositorios con JpaRepository.' }
    ],
    enfoque: 'Mapeo de asociaciones complejas, consultas JPQL, solución al Problema N+1 con JOIN FETCH y desacoplamiento estricto con DTOs.'
  },
  {
    id: 'b4',
    bloque: 'Bloque 4',
    titulo: 'Calidad, Observabilidad & Clientes REST',
    badge: 'Temas 11 y 12',
    badgeColor: '#6d28d9',
    temario: [
      { id: 't11', titulo: 'Tema 11: Validaciones Declarativas y Manejo Global de Errores', resumen: 'Bean Validation (@Valid, @NotNull, @NotBlank, validadores de clase @ValidStock) y captura global con @RestControllerAdvice.' },
      { id: 't12', titulo: 'Tema 12: Logs con SLF4J, OpenAPI Swagger y RestClient', resumen: 'Registro estructurado, perfiles de entorno (dev/prod), documentación OpenAPI interactiva y cliente HTTP moderno RestClient.' }
    ],
    enfoque: 'Bean Validation, manejo global de excepciones, observabilidad con SLF4J, Swagger, Actuator y consumo de APIs con RestClient.'
  },
  {
    id: 'b5',
    bloque: 'Bloque 5',
    titulo: 'Testing Automatizado: Unitario & Integración',
    badge: 'Temas 13 y 14',
    badgeColor: '#f59e0b',
    temario: [
      { id: 't13', titulo: 'Tema 13: Pruebas Unitarias con JUnit 5 y Mockito', resumen: 'Pirámide de testing, dobles de prueba con @Mock y @InjectMocks, aserciones con AssertJ y verificación con verify().' },
      { id: 't14', titulo: 'Tema 14: Pruebas de Integración con Spring Boot Test', resumen: 'Pruebas de la capa web con @WebMvcTest y MockMvc, pruebas de repositorio con base en memoria y @SpringBootTest.' }
    ],
    enfoque: 'Pirámide de pruebas, Mockito sin levantar Tomcat, tests web con MockMvc y pruebas de integración end-to-end.'
  },
  {
    id: 'b6',
    bloque: 'Bloque 6',
    titulo: 'Seguridad Stateless JWT & Despliegue con Docker',
    badge: 'Tema 15',
    badgeColor: '#6d28d9',
    temario: [
      { id: 't15', titulo: 'Tema 15: Autenticación Stateless JWT, RBAC y Docker Multi-Stage', resumen: 'Criptografía HMAC-SHA256, filtros de seguridad OncePerRequestFilter, control de acceso con @PreAuthorize y contenedores Docker en Alpine.' }
    ],
    enfoque: 'Seguridad stateless con JWT, hashing seguro con BCrypt, control RBAC y contenedorización Docker multi-stage.'
  }
];

// =========================================================================
// 3. CASO PRÁCTICO TRANSVERSAL CONDUCTOR: BIBLIOTECH
// =========================================================================
export const BIBLIOTECH_ENTITIES = [
  {
    nombre: 'Autor',
    tipo: 'Entidad JPA (@Entity, Lado Inverso)',
    descripcion: 'Representa a los creadores de las obras. Colección bidireccional List<Libro> con @OneToMany(mappedBy = "autor").',
    atributos: 'id, nombre, nacionalidad, biografia'
  },
  {
    nombre: 'Libro',
    tipo: 'Entidad JPA Central (Lado Propietario)',
    descripcion: 'Piedra angular del catálogo. Relación @ManyToOne con Autor y @ManyToMany con Categoría. Control de concurrencia con @Version.',
    atributos: 'id, isbn (único), titulo, precio, sinopsis (@Lob), estado, stockTotal, stockDisponible'
  },
  {
    nombre: 'Categoria',
    tipo: 'Entidad JPA (Catálogo Temático)',
    descripcion: 'Géneros de libros vinculados físicamente mediante la tabla de unión intermedia libros_categorias.',
    atributos: 'id, nombre (Novela, Ciencia Ficción, Tecnología), descripcion'
  },
  {
    nombre: 'DimensionesLibro',
    tipo: 'Objeto de Valor (@Embeddable)',
    descripcion: 'Se incrusta (@Embedded) como columnas físicas dentro de la tabla libros sin requerir una tabla adicional.',
    atributos: 'altoCm, anchoCm, grosorCm, pesoGramos'
  },
  {
    nombre: 'Publicacion (Herencia)',
    tipo: 'Herencia Polimórfica (@Inheritance JOINED)',
    descripcion: 'Clase base abstracta con dos subclases concretas: LibroFisico (ubicación, páginas) y LibroDigital (tamaño MB, DRM).',
    atributos: 'id, fechaPublicacion, editorial'
  },
  {
    nombre: 'PrestamoLibro',
    tipo: 'Entidad Transaccional ACID (@Transactional)',
    descripcion: 'Controla el flujo de stock: decrementa al prestar y repone al devolver. Calcula dinámicamente el estado OVERDUE.',
    atributos: 'id, fechaPrestamo, fechaDevolucionLimite, lectorId, estadoPrestamo'
  }
];

// =========================================================================
// 4. LAS 5 CLAVES CONCEPTUALES PARA PRINCIPIANTES
// =========================================================================
export const BEGINNER_KEYS = [
  {
    titulo: '1. ¿Por qué un Servidor Backend y no solo el Navegador?',
    icono: '🛡️',
    color: '#0284c7',
    contenido: 'El navegador (Frontend) corre en el equipo del usuario y puede manipularse con F12. Si la lógica estuviera allí, cualquiera alteraría precios o inventarios. El backend es el entorno seguro controlado por la empresa donde residen las reglas de negocio, la integridad transaccional y el acceso a la base de datos.'
  },
  {
    titulo: '2. ¿Qué es una API REST y por qué hablamos en JSON?',
    icono: '🌐',
    color: '#10b981',
    contenido: 'Una API REST es la ventanilla de trámites del backend con URLs claras (/api/v1/libros) y verbos HTTP universales (GET, POST, PUT, DELETE). JSON es el esperanto de la tecnología: formato ligero de "clave": "valor" que entienden React, iOS, Android y microservicios por igual.'
  },
  {
    titulo: '3. ¿Por qué usamos Spring Boot en lugar de Java básico?',
    icono: '🌱',
    color: '#ea580c',
    contenido: 'Construir una app web en Java clásico requeriría configurar Tomcat a mano, gestionar hilos, abrir y cerrar conexiones JDBC y hacer new de cientos de clases. Spring Boot es un chasis de ingeniería: incluye Tomcat embebido, autoconfigura la persistencia y conecta todo con Inversión de Control (IoC).'
  },
  {
    titulo: '4. ¿Qué es un ORM (Hibernate / JPA) y por qué lo necesitamos?',
    icono: '🗄️',
    color: '#6d28d9',
    contenido: 'En Java pensamos en Objetos con relaciones en memoria; las bases de datos relacionales piensan en Tablas bidimensionales con claves foráneas. Este desajuste se resuelve con JPA/Hibernate, que actúa como traductor automático generando los SQL INSERT, UPDATE y SELECT sin escribir JDBC repetitivo.'
  },
  {
    titulo: '5. La Metáfora del Restaurante de Alta Cocina (3 Capas)',
    icono: '🍽️',
    color: '#6d28d9',
    contenido: '• Controlador (El Camarero): Atiende al cliente, valida que la comanda esté bien escrita y la traslada a cocina. No cocina ni entra a la despensa.\n• Servicio (El Chef): Contiene la maestría culinaria (reglas de negocio). Verifica stock, aplica la receta y prepara el plato.\n• Repositorio (El Despensero): Es el único con llave de la despensa (Base de Datos). El chef le pide "tráeme el libro X" o "guarda el préstamo Y".'
  }
];

export default function StudioRouteTab({ onNavigateTab, initialSlug = null }) {
  const derivedInitial = useMemo(() => {
    if (!initialSlug) return { view: 'comparativa', level: 1 };
    const clean = String(initialSlug).toLowerCase().trim();
    if (clean === 'comparativa' || clean === 'tabla' || clean === 'resumen') return { view: 'comparativa', level: 1 };
    if (clean === 'bloques') return { view: 'bloques', level: 1 };
    if (clean === 'bibliotech') return { view: 'bibliotech', level: 1 };
    if (clean === 'claves') return { view: 'claves', level: 1 };
    const match = clean.match(/(\d+)/);
    if (match) {
      return { view: 'roadmap', level: parseInt(match[1], 10) };
    }
    return { view: 'comparativa', level: 1 };
  }, [initialSlug]);

  const [activeView, setActiveView] = useState(derivedInitial.view); // 'comparativa' | 'roadmap' | 'bloques' | 'bibliotech' | 'claves'
  const levelRefMap = useRef({});

  const [activeLevelNum, setActiveLevelNum] = useState(derivedInitial.level);
  const [selectedBlockId, setSelectedBlockId] = useState('b1');
  const [selectedKeyIdx, setSelectedKeyIdx] = useState(0);

  useEffect(() => {
    if (derivedInitial.level) {
      setActiveLevelNum(derivedInitial.level);
    }
    if (derivedInitial.view) {
      setActiveView(derivedInitial.view);
    }
  }, [derivedInitial]);

  useEffect(() => {
    if (activeLevelNum && levelRefMap.current[activeLevelNum] && activeView === 'roadmap') {
      levelRefMap.current[activeLevelNum].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLevelNum, activeView]);

  return (
    <div className="studio-route-container">
      {/* CABECERA OPERACIONAL Y ENLACES DIRECTOS A LIBROS */}
      <div className="studio-card" style={{ marginBottom: '1.25rem', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderLeft: '5px solid #6d28d9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
          <div style={{ flex: '1 1 340px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
              Compendio Resumen a Vista de Pájaro
            </span>
            <h2 style={{ margin: '0.25rem 0 0.35rem 0', fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
              Ruta de Aprendizaje: El Salto de Java 1 a Spring Boot
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Comprende por qué y cómo la programación orientada a objetos de <strong>Java 1</strong> (clases, encapsulamiento y SOLID) se transforma en el motor de <strong>Spring Boot</strong>: Inversión de Control, persistencia declarativa con JPA, APIs REST automáticas y despliegues sin fricción.
            </p>
          </div>

          {/* BOTONES DIRECTOS A LOS LIBROS DE JAVA 1 Y SPRING BOOT */}
          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to="/java/studio/poo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                padding: '0.5rem 0.95rem',
                borderRadius: '8px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: '#ffffff',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(234, 88, 12, 0.25)',
                transition: 'all 0.15s ease'
              }}
              title="Abrir el Libro de Java 1 (POO & Principios SOLID)"
            >
              <span>📖 Libro Java 1 (POO)</span>
              <span style={{ opacity: 0.85 }}>➔</span>
            </Link>

            <Link
              to="/java/studio/libro"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                padding: '0.5rem 0.95rem',
                borderRadius: '8px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)',
                color: '#ffffff',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(109, 40, 217, 0.25)',
                transition: 'all 0.15s ease'
              }}
              title="Abrir el Libro de Spring Boot (34 Temas de Arquitectura)"
            >
              <span>📖 Libro Spring Boot</span>
              <span style={{ opacity: 0.85 }}>➔</span>
            </Link>
          </div>
        </div>

        {/* SELECTOR DE VISTAS DE APRENDIZAJE */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
          <button
            type="button"
            className={`pill-btn ${activeView === 'comparativa' ? 'active' : ''}`}
            onClick={() => setActiveView('comparativa')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem', fontWeight: activeView === 'comparativa' ? 800 : 500 }}
          >
            ⚖️ Compendio Comparativo: Java 1 ➔ Spring Boot
          </button>
          <button
            type="button"
            className={`pill-btn ${activeView === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveView('roadmap')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', fontWeight: activeView === 'roadmap' ? 800 : 500 }}
          >
            🗺️ 7 Niveles de la Ruta
          </button>
          <button
            type="button"
            className={`pill-btn ${activeView === 'bloques' ? 'active' : ''}`}
            onClick={() => setActiveView('bloques')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', fontWeight: activeView === 'bloques' ? 800 : 500 }}
          >
            📦 6 Bloques & 15 Temas
          </button>
          <button
            type="button"
            className={`pill-btn ${activeView === 'bibliotech' ? 'active' : ''}`}
            onClick={() => setActiveView('bibliotech')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', fontWeight: activeView === 'bibliotech' ? 800 : 500 }}
          >
            📚 Caso Conductor: BiblioTech
          </button>
          <button
            type="button"
            className={`pill-btn ${activeView === 'claves' ? 'active' : ''}`}
            onClick={() => setActiveView('claves')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', fontWeight: activeView === 'claves' ? 800 : 500 }}
          >
            💡 5 Claves para Principiantes
          </button>
        </div>
      </div>

      {/* =====================================================================
          VISTA 0: COMPENDIO COMPARATIVO (JAVA 1 VS SPRING BOOT)
          ===================================================================== */}
      {activeView === 'comparativa' && (
        <div style={{ width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* BANNER EXPLICATIVO DE LA TRANSICIÓN */}
          <div
            className="studio-card"
            style={{
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
              border: '1px solid #bbf7d0',
              borderLeft: '5px solid #10b981'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.35rem' }}>⚖️</span>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                ¿Por qué merece la pena dar el salto de Java Puro a Spring Boot?
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              Aprender <strong>Java 1 (POO pura)</strong> forja los cimientos algorítmicos esenciales: polimorfismo, tipos de datos, encapsulación y diseño de clases. Sin embargo, en entornos corporativos modernos, construir aplicaciones web artesanales mediante JDBC, Servlets y XML resulta inviable por coste, lentitud y mantenimiento. <strong>Spring Boot</strong> automatiza la fontanería repetitiva para que el desarrollador se centre exclusivamente en la <strong>lógica de negocio</strong>.
            </p>
          </div>

          {/* LISTA DE TARJETAS COMPARATIVAS POR ÁREA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {JAVA_TO_SPRING_COMPARISON.map((comp) => (
              <div
                key={comp.id}
                className="studio-card"
                style={{
                  padding: '1.2rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                {/* CABECERA DEL ÁREA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{comp.icon}</span>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                      {comp.area}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '999px', background: '#f1f5f9', color: '#475569' }}>
                    Área Arquitectónica
                  </span>
                </div>

                {/* DESTACADO: POR QUÉ VALE LA PENA */}
                <div
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    marginBottom: '1rem',
                    fontSize: '0.82rem',
                    color: '#581c87',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem'
                  }}
                >
                  <span style={{ flexShrink: 0 }}>💡</span>
                  <div>
                    <strong>Por qué merece la pena el salto: </strong>
                    <span>{comp.porQueValeLaPena}</span>
                  </div>
                </div>

                {/* COMPARATIVA EN 2 COLUMNAS */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                    gap: '1rem'
                  }}
                >
                  {/* COLUMNA IZQUIERDA: JAVA 1 */}
                  <div
                    style={{
                      background: '#fff1f2',
                      border: '1px solid #fecdd3',
                      borderRadius: '8px',
                      padding: '0.9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase' }}>
                          ☕ Java 1 (Artesanal)
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#ffe4e6', color: '#9f1239', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {comp.java1.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#881337', marginBottom: '0.5rem' }}>
                        {comp.java1.titulo}
                      </div>
                      <pre
                        style={{
                          background: '#0f172a',
                          color: '#f8fafc',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.73rem',
                          fontFamily: 'monospace',
                          overflowX: 'auto',
                          margin: '0 0 0.65rem 0',
                          lineHeight: 1.45
                        }}
                      >
                        <code>{comp.java1.codigo}</code>
                      </pre>
                    </div>
                    <div
                      style={{
                        padding: '0.55rem 0.7rem',
                        background: '#ffffff',
                        border: '1px solid #fecdd3',
                        borderRadius: '6px',
                        fontSize: '0.77rem',
                        color: '#9f1239',
                        lineHeight: 1.45
                      }}
                    >
                      <strong>⚠️ Limitación: </strong>
                      {comp.java1.problema}
                    </div>
                  </div>

                  {/* COLUMNA DERECHA: SPRING BOOT */}
                  <div
                    style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '0.9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                          🌱 Spring Boot (Enterprise)
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#dcfce7', color: '#065f46', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {comp.spring.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#064e3b', marginBottom: '0.5rem' }}>
                        {comp.spring.titulo}
                      </div>
                      <pre
                        style={{
                          background: '#0f172a',
                          color: '#f8fafc',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.73rem',
                          fontFamily: 'monospace',
                          overflowX: 'auto',
                          margin: '0 0 0.65rem 0',
                          lineHeight: 1.45
                        }}
                      >
                        <code>{comp.spring.codigo}</code>
                      </pre>
                    </div>
                    <div
                      style={{
                        padding: '0.55rem 0.7rem',
                        background: '#ffffff',
                        border: '1px solid #bbf7d0',
                        borderRadius: '6px',
                        fontSize: '0.77rem',
                        color: '#065f46',
                        lineHeight: 1.45
                      }}
                    >
                      <strong>✨ Ventaja: </strong>
                      {comp.spring.ventaja}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA FINAL: ACCESO A LIBROS COMPLETOS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginTop: '0.5rem'
            }}
          >
            {/* CTA JAVA 1 */}
            <div
              className="studio-card"
              style={{
                padding: '1.25rem',
                borderLeft: '5px solid #ea580c',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>☕</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    Aprende los Cimientos
                  </h4>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                  Domina 21 lecciones completas sobre Programación Orientada a Objetos, herencia, encapsulamiento, polimorfismo, principios SOLID y patrones de diseño GoF en Java puro.
                </p>
              </div>
              <Link
                to="/java/studio/poo"
                className="studio-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  background: '#ea580c',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <span>📖 Abrir Libro Java 1 (21 Lecciones)</span>
                <span>➔</span>
              </Link>
            </div>

            {/* CTA SPRING BOOT */}
            <div
              className="studio-card"
              style={{
                padding: '1.25rem',
                borderLeft: '5px solid #6d28d9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>🌱</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    Domina el Framework
                  </h4>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                  Explora los 34 temas de ingeniería y arquitectura: IoC, Repositorios Spring Data JPA, APIs RESTful con DTOs, validaciones declarativas, testing con Mockito y Docker.
                </p>
              </div>
              <Link
                to="/java/studio/libro"
                className="studio-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  background: '#6d28d9',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <span>📖 Abrir Libro Spring Boot (34 Temas)</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VISTA 1: 7 NIVELES DE LA RUTA OPTIMIZADA
          ===================================================================== */}
      {activeView === 'roadmap' && (
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* SELECTOR DESPLEGABLE DE NIVELES (MINIMALISTA) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: '1 1 300px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                🧭 Seleccionar Nivel:
              </span>
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
                <select
                  value={activeLevelNum}
                  onChange={(e) => setActiveLevelNum(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2.2rem 0.5rem 0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #6d28d9',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    appearance: 'none',
                    boxShadow: '0 1px 3px rgba(109, 40, 217, 0.08)',
                    outline: 'none'
                  }}
                >
                  {ROADMAP_LEVELS.map((lvl) => (
                    <option key={lvl.nivel} value={lvl.nivel}>
                      {lvl.icono} Nivel {lvl.nivel}: {lvl.titulo}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#6d28d9',
                    fontSize: '0.75rem'
                  }}
                >
                  ▼
                </span>
              </div>
            </div>

            {/* BOTONES RÁPIDOS ANTERIOR / SIGUIENTE E INDICADOR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <button
                type="button"
                onClick={() => setActiveLevelNum(Math.max(1, activeLevelNum - 1))}
                disabled={activeLevelNum <= 1}
                className="studio-btn-secondary"
                style={{ padding: '0.38rem 0.65rem', fontSize: '0.78rem', opacity: activeLevelNum <= 1 ? 0.35 : 1 }}
                title="Nivel anterior"
              >
                ◀ Ant
              </button>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#6d28d9',
                  background: '#f5f3ff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd6fe'
                }}
              >
                {activeLevelNum} de {ROADMAP_LEVELS.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveLevelNum(Math.min(ROADMAP_LEVELS.length, activeLevelNum + 1))}
                disabled={activeLevelNum >= ROADMAP_LEVELS.length}
                className="studio-btn-secondary"
                style={{ padding: '0.38rem 0.65rem', fontSize: '0.78rem', opacity: activeLevelNum >= ROADMAP_LEVELS.length ? 0.35 : 1 }}
                title="Siguiente nivel"
              >
                Sig ▶
              </button>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            {(() => {
              const lvl = ROADMAP_LEVELS.find((l) => l.nivel === activeLevelNum) || ROADMAP_LEVELS[0];
              return (
                <div
                  key={lvl.nivel}
                  className="studio-card"
                  style={{
                    borderLeft: '5px solid #6d28d9',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: 'rgba(109, 40, 217, 0.1)',
                          color: '#6d28d9',
                          fontSize: '1.25rem',
                          fontWeight: 800
                        }}
                      >
                        {lvl.icono}
                      </span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span className="studio-badge studio-badge-purple" style={{ fontWeight: 800 }}>
                            NIVEL {lvl.nivel} DE 7
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                            {lvl.subtitulo}
                          </span>
                        </div>
                        <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                          {lvl.titulo}
                        </h3>
                      </div>
                    </div>

                    {onNavigateTab && (
                      <button
                        type="button"
                        onClick={() => onNavigateTab(lvl.tabLink)}
                        className="studio-btn-primary"
                        style={{
                          fontSize: '0.82rem',
                          padding: '0.45rem 0.9rem',
                          background: '#6d28d9',
                          color: '#ffffff',
                          fontWeight: 700
                        }}
                      >
                        {lvl.tabLabel} →
                      </button>
                    )}
                  </div>

                  {/* TEMAS INCLUIDOS EN ESTE NIVEL */}
                  <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 0.65rem 0', fontSize: '0.9rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      📚 Contenidos Clave del Nivel:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#475569' }}>
                      {lvl.temas.map((tema, tIdx) => (
                        <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: '#6d28d9', fontWeight: 800, lineHeight: 1.2 }}>✓</span>
                          <span>{tema}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTONES ANTERIOR / SIGUIENTE */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
                    <button
                      type="button"
                      className="studio-btn-secondary"
                      disabled={activeLevelNum <= 1}
                      onClick={() => setActiveLevelNum(activeLevelNum - 1)}
                      style={{ opacity: activeLevelNum <= 1 ? 0.4 : 1 }}
                    >
                      ← Nivel Anterior
                    </button>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>
                      Nivel {activeLevelNum} de {ROADMAP_LEVELS.length}
                    </span>
                    <button
                      type="button"
                      className="studio-btn-secondary"
                      disabled={activeLevelNum >= ROADMAP_LEVELS.length}
                      onClick={() => setActiveLevelNum(activeLevelNum + 1)}
                      style={{ opacity: activeLevelNum >= ROADMAP_LEVELS.length ? 0.4 : 1 }}
                    >
                      Siguiente Nivel →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* =====================================================================
          VISTA 2: 6 BLOQUES TEMÁTICOS & 15 TEMAS DE PROFUNDIZACIÓN
          ===================================================================== */}
      {activeView === 'bloques' && (
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* SELECTOR DESPLEGABLE DE BLOQUES (MINIMALISTA) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: '1 1 300px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                📦 Seleccionar Bloque:
              </span>
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
                <select
                  value={selectedBlockId}
                  onChange={(e) => setSelectedBlockId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2.2rem 0.5rem 0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #6d28d9',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    appearance: 'none',
                    boxShadow: '0 1px 3px rgba(109, 40, 217, 0.08)',
                    outline: 'none'
                  }}
                >
                  {STUDY_BLOCKS.map((blk, idx) => (
                    <option key={blk.id} value={blk.id}>
                      Bloque {idx + 1}: {blk.titulo} ({blk.badge})
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#6d28d9',
                    fontSize: '0.75rem'
                  }}
                >
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            {(() => {
              const blk = STUDY_BLOCKS.find(b => b.id === selectedBlockId) || STUDY_BLOCKS[0];
              return (
                <div
                  key={blk.id}
                  className="studio-card"
                  style={{
                    borderLeft: '5px solid #6d28d9',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {blk.bloque}
                    </span>
                    <span className="studio-badge studio-badge-purple" style={{ fontWeight: 700, fontSize: '0.75rem' }}>
                      {blk.badge}
                    </span>
                  </div>

                  <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                    {blk.titulo}
                  </h3>

                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                    <strong>Enfoque clave:</strong> {blk.enfoque}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                    <h4 style={{ margin: '0.35rem 0 0 0', fontSize: '0.86rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Temario Oficial Detallado:
                    </h4>
                    {blk.temario.map((tema) => (
                      <div
                        key={tema.id}
                        style={{
                          background: '#f8fafc',
                          padding: '0.75rem 0.95rem',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.85rem'
                        }}
                      >
                        <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.25rem' }}>
                          {tema.titulo}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.45 }}>
                          {tema.resumen}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* =====================================================================
          VISTA 3: CASO DE ESTUDIO PRÁCTICO CONDUCTOR: BIBLIOTECH
          ===================================================================== */}
      {activeView === 'bibliotech' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="studio-card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.1rem 1.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                  Hilo Conductor de Aprendizaje
                </span>
                <h3 style={{ margin: '0.2rem 0 0.35rem 0', color: '#065f46', fontSize: '1.2rem', fontWeight: 800 }}>
                  📚 Caso Práctico Conductor: Plataforma BiblioTech
                </h3>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#047857', lineHeight: 1.5 }}>
                  En lugar de ejemplos inconexos, toda la teoría y los fragmentos de código del curso se demuestran sobre un único dominio empresarial: un sistema integral de biblioteca digital, gestión de préstamos transaccionales y catálogo editorial.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab && onNavigateTab('proyectos')}
                className="studio-btn-primary"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.4rem 0.8rem',
                  background: '#059669',
                  color: '#ffffff',
                  fontWeight: 700,
                  borderRadius: '6px'
                }}
              >
                Ver Código en Proyectos →
              </button>
            </div>
          </div>

          {/* TABLA DE ENTIDADES DEL DOMINIO */}
          <div className="studio-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Mapa de Dominio de BiblioTech: Entidades, Mapeos y Relaciones
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {BIBLIOTECH_ENTITIES.map((ent, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.9rem',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                      {ent.nombre}
                    </span>
                    <span className="studio-badge studio-badge-purple" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                      JPA
                    </span>
                  </div>

                  <span style={{ fontSize: '0.76rem', color: '#6d28d9', fontWeight: 700 }}>
                    {ent.tipo}
                  </span>

                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>
                    {ent.descripcion}
                  </p>

                  <div style={{ fontSize: '0.74rem', color: '#64748b', background: '#ffffff', padding: '0.4rem 0.55rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '0.2rem' }}>
                    <strong>Atributos:</strong> <code>{ent.atributos}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VISTA 4: 5 CLAVES CONCEPTUALES PARA PRINCIPIANTES
          ===================================================================== */}
      {activeView === 'claves' && (
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* SELECTOR HORIZONTAL DE CLAVES */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            {BEGINNER_KEYS.map((k, idx) => {
              const isSelected = selectedKeyIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedKeyIdx(idx)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid #6d28d9' : '1px solid #e2e8f0',
                    background: isSelected ? '#6d28d9' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  💡 Clave #{idx + 1}: {k.titulo.replace(/^\d+\.\s*/, '')}
                </button>
              );
            })}
          </div>

          <div style={{ minWidth: 0 }}>
            {(() => {
              const k = BEGINNER_KEYS[selectedKeyIdx] || BEGINNER_KEYS[0];
              return (
                <div
                  className="studio-card"
                  style={{
                    borderLeft: '5px solid #6d28d9',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{k.icono}</span>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                      {k.titulo}
                    </h3>
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line', background: '#f8fafc', padding: '1.15rem 1.3rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    {k.contenido}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
