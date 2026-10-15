/**
 * Cuerpo Teórico Consolidado: De POO a Spring Boot (Especialidad Formativa IFCD0177 - SEPE)
 * 5 temas magistrales consolidados para estudiar y entender la arquitectura desde sus fundamentos.
 */

const topics = [
  // 6.1 Del Paradigma POO a Spring Framework (SOLID y Patrones GoF)
  {
    id: "petete-sepe-poo-solid-patrones",
    slug: "sepe-poo-solid-patrones",
    topicNum: "6.1",
    title: "Del Paradigma POO a Spring Framework (SOLID y Patrones GoF)",
    moduleTitle: "Bloque 6: Cuerpo Teórico Consolidado (De POO a Spring Boot · IFCD0177)",
    moduleShort: "Bloque 6",
    badge: "TEORÍA OFICIAL · IFCD0177",
    contentMd: `# Del Paradigma POO a Spring Framework (SOLID y Patrones GoF)

> 🎓 **Cuerpo Teórico Consolidado:** Especialidad Formativa Oficial IFCD0177 (*Desarrollo de Aplicaciones Orientadas a Objetos con Java*) — SEPE / Enclave Formación.
> 
> *Este tema establece el puente conceptual indispensable: cómo los fundamentos de la Programación Orientada a Objetos y los principios de ingeniería de software conducen de forma natural a la arquitectura de Spring Framework.*

---

## 1. Los 4 Pilares de la POO en Sistemas Empresariales

La Programación Orientada a Objetos no es una mera sintaxis de clases; es un modelo mental para combatir la complejidad del software dividiendo un sistema en componentes autónomos con responsabilidad:

1. **Abstracción:** Capacidad de aislar los atributos y comportamientos esenciales de una entidad del dominio ignorando los detalles secundarios. En Spring, la abstracción se materializa en las **Interfaces** que definen los contratos entre capas (servicios y repositorios).
2. **Encapsulamiento:** Ocultación del estado interno de un objeto protegiendo sus campos con visibilidad privada (\`private\`) y exponiendo únicamente métodos controlados de acceso (\`getters\` y \`setters\`). En Spring, esto fundamenta la especificación **JavaBeans** y la inmutabilidad de los DTOs.
3. **Herencia:** Jerarquización y reutilización de código mediante relaciones superclase/subclase (\`extends\`). En arquitecturas modernas se aplica la máxima de diseño: *«Priorizar la composición sobre la herencia»*.
4. **Polimorfismo:** Habilidad de diferentes clases de responder a un mismo mensaje (firma de método) con implementaciones distintas. El polimorfismo es el motor del **Contenedor IoC de Spring**, que inyecta implementaciones concretas en tiempo de ejecución a partir de referencias a interfaces.

---

## 2. Los Principios SOLID en el ADN de Spring

Spring Framework fue diseñado explícitamente para hacer que el código Java cumpla los 5 principios SOLID de forma natural y elegante:

| Principio SOLID | Definición Teórica | Manifestación Práctica en Spring Boot |
|---|---|---|
| **S — Single Responsibility (Responsabilidad Única)** | Una clase debe tener una sola razón para cambiar. | **Arquitectura en Capas:** El Controller sólo atiende peticiones HTTP; el Service sólo aplica reglas de negocio; el Repository sólo interactúa con la base de datos. |
| **O — Open/Closed (Abierto/Cerrado)** | Abierto a la extensión, pero cerrado a la modificación. | **Inyección de Beans e Interfaces:** Se pueden añadir nuevos comportamientos creando un nuevo Bean que implemente una interfaz sin alterar el código cliente existente. |
| **L — Liskov Substitution (Sustitución de Liskov)** | Las subclases deben poder sustituir a sus clases base sin alterar la corrección del programa. | **Polimorfismo de Servicios:** Si tenemos \`NotificadorService\`, implementaciones como \`EmailNotificador\` o \`SmsNotificador\` son completamente intercambiables sin romper el flujo. |
| **I — Interface Segregation (Segregación de Interfaces)** | Los clientes no deben verse obligados a depender de métodos que no utilizan. | **Interfaces Específicas de Spring Data:** En lugar de interfaces gigantescas, se usan contratos granulares como \`CrudRepository\`, \`PagingAndSortingRepository\` o \`JpaRepository\`. |
| **D — Dependency Inversion (Inversión de Dependencias)** | Los módulos de alto nivel no deben depender de los de bajo nivel; ambos deben depender de abstracciones. | **El Núcleo de Spring (IoC / DI):** Las clases del negocio nunca instancian sus dependencias con \`new\`; reciben interfaces inyectadas por el contenedor de Spring. |

---

## 3. Patrones de Diseño GoF que Soportan Spring

Spring Framework no inventó la rueda; implementa de forma magistral los patrones clásicos de la banda de los cuatro (GoF):

\`\`\`text
  ┌────────────────────────────────────────────────────────────────────────┐
  │                   PATRONES GoF EN SPRING FRAMEWORK                     │
  ├────────────────────────────────────────────────────────────────────────┤
  │ 1. SINGLETON: Ámbito (scope) por defecto de los Beans en memoria.      │
  │ 2. FACTORY: BeanFactory y ApplicationContext instancian componentes.   │
  │ 3. PROXY DINÁMICO: @Transactional y @Async interceptan llamadas.       │
  │ 4. STRATEGY: Inyección polimórfica de interfaces (@Qualifier).        │
  │ 5. OBSERVER: Publicación de eventos (ApplicationEventPublisher).       │
  └────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Detalle de los Patrones Clave:
* **Singleton:** Por defecto, Spring mantiene una única instancia de cada Bean por contenedor, ahorrando recursos de memoria y CPU en servidores multi-hilo.
* **Proxy Dinámico (AOP - Aspect-Oriented Programming):** Cuando anotas un método con \`@Transactional\`, Spring no ejecuta directamente tu clase. Envuelve tu Bean en un objeto **Proxy** que abre la transacción antes de ejecutar el método y hace \`commit\` o \`rollback\` al finalizar.
* **Strategy:** Permite cambiar la lógica de un algoritmo en tiempo de ejecución pasando diferentes Beans que implementan la misma interfaz.

---

## 4. Comparativa Definitiva: POJO vs Entidad JPA vs DTO vs Spring Bean

En una aplicación enterprise conviven 4 tipos de objetos Java. Comprender su rol exacto evita los errores más comunes de acoplamiento:

| Objeto Java | Propósito en la Arquitectura | Dependencia de Frameworks | ¿Dónde Vive? |
|---|---|---|---|
| **POJO (*Plain Old Java Object*)** | Objeto plano de datos con getters y setters. Representa conceptos puros. | **Cero**. Únicamente Java Standard (JDK). | En cualquier estrato; modelo conceptual. |
| **Entidad JPA (\`@Entity\`)** | Representa una tabla de la base de datos relacional y sus relaciones. | **Alta**. Acoplado a Jakarta Persistence (Hibernate). | Exclusivamente en la capa de persistencia (\`Repository\`). |
| **DTO (*Data Transfer Object*)** | Contrato de comunicación plano para peticiones y respuestas HTTP. Protege datos internos. | **Baja**. Anotaciones de validación (\`@Valid\`). | En la frontera exterior (\`Controller\`). |
| **Spring Managed Bean** | Componente de lógica administrado por el contenedor de Inversión de Control. | **Alta**. Gestionado por el ciclo de vida de Spring. | En las capas de infraestructura, servicios y controladores. |`
  },

  // 6.2 Inversión de Control (IoC), Inyección de Dependencias y Contenedor Spring
  {
    id: "petete-sepe-ioc-di-contenedor",
    slug: "sepe-ioc-di-contenedor",
    topicNum: "6.2",
    title: "Inversión de Control (IoC), Inyección de Dependencias y Contenedor Spring",
    moduleTitle: "Bloque 6: Cuerpo Teórico Consolidado (De POO a Spring Boot · IFCD0177)",
    moduleShort: "Bloque 6",
    badge: "TEORÍA OFICIAL · IFCD0177",
    contentMd: `# Inversión de Control (IoC), Inyección de Dependencias y Contenedor Spring

> 🎓 **Cuerpo Teórico Consolidado:** Especialidad Formativa Oficial IFCD0177 (*Desarrollo de Aplicaciones Orientadas a Objetos con Java*) — SEPE / Enclave Formación.
> 
> *Explica el principio que revolucionó el ecosistema Java: por qué delegar la creación de objetos en un contenedor desacopla el sistema y permite testing profesional.*

---

## 1. El Problema del Acoplamiento Rígido con \`new\`

En la programación Java tradicional, cuando una clase necesita otra clase para realizar su trabajo, la crea directamente con el operador \`new\`:

\`\`\`java
// ❌ MAL: Acoplamiento rígido, imposible de mockear en pruebas unitarias
public class PedidoService {
    private PedidoRepository repository = new PedidoRepositoryMySql(); // Rígido
    private NotificadorEmail notificador = new NotificadorEmail();       // Rígido
}
\`\`\`

### Consecuencias fatales del acoplamiento rígido:
1. **Imposible de testear en aislamiento:** Para probar \`PedidoService\`, estás obligado a levantar una base de datos real MySQL y un servidor de correo real.
2. **Violación del principio Open/Closed:** Cambiar la base de datos a PostgreSQL o el correo a SMS exige reescribir y recompilar el servicio.

---

## 2. Inversión de Control (IoC) y el Principio de Hollywood

Bajo el paradigma de **Inversión de Control (IoC)**, la responsabilidad de instanciar, configurar, enlazar y destruir los objetos ya no corresponde a las clases, sino a un contenedor centralizado: el **\`ApplicationContext\`** de Spring.

> 🎬 **El Principio de Hollywood:**  
> *«Don't call us, we'll call you»* (No nos llames a nosotros, nosotros te llamaremos).  
> Tu clase no busca sus dependencias; el contenedor se las inyecta cuando las necesita.

\`\`\`mermaid
graph TD
    A[Cliente HTTP] --> B[Controller]
    subgraph Spring ApplicationContext IoC Container
        C[Bean: Servicio]
        D[Bean: Repositorio]
        E[Bean: DataSource / BBDD]
    end
    B -.->|Inyectado por Spring| C
    C -.->|Inyectado por Spring| D
    D -.->|Inyectado por Spring| E
    style C fill:#2563eb,stroke:#1e40af,color:#fff
    style D fill:#16a34a,stroke:#15803d,color:#fff
    style E fill:#d97706,stroke:#b45309,color:#fff
\`\`\`

---

## 3. Estereotipos de Spring y Escaneo Automático (\`@ComponentScan\`)

Spring clasifica los componentes de la aplicación mediante **estereotipos** derivados de la anotación base \`@Component\`:

* **\`@Component\`:** Anotación genérica para cualquier clase gestionada por el contenedor.
* **\`@Service\`:** Especialización semántica para clases que contienen reglas de negocio y orquestación transaccional.
* **\`@Repository\`:** Especialización para clases de acceso a datos. Activa la traducción automática de excepciones de base de datos a la jerarquía unificada \`DataAccessException\`.
* **\`@Controller\` / \`@RestController\`:** Especialización para la capa web que procesa peticiones HTTP y serializa respuestas.
* **\`@Configuration\`:** Define clases de configuración que declaran métodos anotados con \`@Bean\` para integrar librerías de terceros.

---

## 4. Inyección de Dependencias: Por qué la Inyección por Constructor es la Única Recomendada

Existen tres formas históricas de inyectar dependencias en Spring:

### 1. Inyección por Atributo (Field Injection con \`@Autowired\`) — ❌ DESACONSEJADA
\`\`\`java
@Service
public class PedidoService {
    @Autowired // ❌ Inyección por reflexión oculta
    private PedidoRepository repository;
}
\`\`\`
* **Problemas:** No permite hacer los campos inmutables (\`final\`). Para probar la clase en JUnit sin levantar Spring se requiere reflexión o trucos complejos. Oculta el número de dependencias (favorece clases gigantes).

### 2. Inyección por Constructor — ✅ PRÁCTICA OFICIAL RECOMENDADA
\`\`\`java
@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final NotificadorService notificador;

    // En Spring moderno, si hay un solo constructor, @Autowired es opcional
    public PedidoService(PedidoRepository repository, NotificadorService notificador) {
        this.repository = repository;
        this.notificador = notificador;
    }
}
\`\`\`
* **Ventajas indiscutibles:**
  1. **Inmutabilidad total:** Los campos son \`final\`; no pueden reasignarse tras la creación.
  2. **Garantía en tiempo de compilación:** Es imposible instanciar la clase en un estado inválido o incompleto.
  3. **Testing unitario instantáneo:** En un test con JUnit y Mockito, puedes hacer \`new PedidoService(mockRepo, mockNotif)\` sin necesidad de arrancar Spring.

---

## 5. Los 3 Pilares Fundamentales de Spring Boot

Spring Boot no es un framework nuevo; es una capa de aceleración sobre Spring Framework basada en tres pilares:

1. **Spring Initializr (\`start.spring.io\`):** Asistente oficial para generar el esqueleto Maven/Gradle con versiones compatibles pre-validadas.
2. **Dependencias "Starters":** Agrupaciones lógicas de librerías bajo un solo identificador. Por ejemplo, \`spring-boot-starter-web\` incluye automáticamente Spring MVC, Jackson (JSON), validaciones y Tomcat.
3. **Autoconfiguración y Servidor Embebido:** La anotación \`@SpringBootApplication\` combina \`@Configuration\`, \`@EnableAutoConfiguration\` y \`@ComponentScan\`. Levanta automáticamente un servidor web Tomcat en el puerto \`8080\` sin necesidad de instalar servidores externos ni configurar archivos XML.`
  },

  // 6.3 Persistencia Empresarial: De JDBC a JPA, Hibernate y Spring Data
  {
    id: "petete-sepe-persistencia-jdbc-jpa",
    slug: "sepe-persistencia-jdbc-jpa",
    topicNum: "6.3",
    title: "Persistencia Empresarial: De JDBC a JPA, Hibernate y Spring Data",
    moduleTitle: "Bloque 6: Cuerpo Teórico Consolidado (De POO a Spring Boot · IFCD0177)",
    moduleShort: "Bloque 6",
    badge: "TEORÍA OFICIAL · IFCD0177",
    contentMd: `# Persistencia Empresarial: De JDBC a JPA, Hibernate y Spring Data

> 🎓 **Cuerpo Teórico Consolidado:** Especialidad Formativa Oficial IFCD0177 (*Desarrollo de Aplicaciones Orientadas a Objetos con Java*) — SEPE / Enclave Formación.
> 
> *Aborda el almacenamiento de datos en aplicaciones Java: la transición histórica desde las consultas manuales JDBC hasta el estándar JPA y los repositorios reactivos/automáticos de Spring Data.*

---

## 1. La Brecha de Impedancia Objeto-Relacional (*Impedance Mismatch*)

Existe un conflicto fundamental de paradigmas entre el mundo de la programación orientada a objetos y las bases de datos relacionales:

* **En Java (Objetos):** Trabajamos con referencias en memoria, encapsulamiento, tipos de datos ricos, herencia jerárquica y polimorfismo.
* **En SQL (Relacional):** Trabajamos con tablas bidimensionales, filas, columnas primitivas, claves primarias (\`PK\`) y claves foráneas (\`FK\`).

### La época oscura de JDBC artesanal:
En JDBC nativo, el desarrollador debía escribir decenas de líneas de código repetitivo (*boilerplate*):
\`\`\`java
// Fragmento JDBC artesanal propenso a errores y fugas de conexión
Connection conn = DriverManager.getConnection(url, user, pass);
PreparedStatement ps = conn.prepareStatement("SELECT * FROM productos WHERE id = ?");
ps.setLong(1, id);
ResultSet rs = ps.executeQuery();
if (rs.next()) {
    Producto p = new Producto();
    p.setId(rs.getLong("id"));
    p.setNombre(rs.getString("nombre")); // Mapeo manual tedioso columna por columna
    p.setPrecio(rs.getDouble("precio"));
}
rs.close();
ps.close();
conn.close();
\`\`\`

---

## 2. El Estándar JPA y el Motor de Persistencia Hibernate

Para resolver la brecha de impedancia nació el concepto **ORM (*Object-Relational Mapping*)**:

* **JPA (*Jakarta Persistence API*):** Es la **especificación estándar** de Java. Define las interfaces y anotaciones oficiales (\`@Entity\`, \`@Table\`, \`EntityManager\`). No contiene código ejecutable; es solo el contrato.
* **Hibernate:** Es la **implementación de referencia** más utilizada de JPA. Se encarga de traducir las operaciones Java a dialectos SQL concretos (PostgreSQL, MySQL, H2, Oracle).

### El Contexto de Persistencia (*Persistence Context / Caché de Nivel 1*):
Dentro de una transacción, el \`EntityManager\` mantiene una caché interna en memoria donde rastrea el estado de todas las entidades cargadas. Esto permite:
* **Garantizar identidad única:** Si consultas dos veces el producto con ID 1 en la misma transacción, Hibernate devuelve exactamente la misma referencia en memoria.
* **Dirty Checking (Detección de Cambios):** Al modificar un atributo con \`producto.setPrecio(29.99)\`, Hibernate detecta el cambio automáticamente y genera el \`UPDATE\` SQL en el momento del \`commit\` sin necesidad de llamar a ningún método \`update()\`.

---

## 3. Los 4 Estados del Ciclo de Vida de una Entidad JPA

Una entidad atraviesa cuatro estados claramente definidos en el ciclo de persistencia:

\`\`\`text
                 [ new Producto() ]
                         │
                         ▼
                  ┌──────────────┐
                  │  TRANSIENT   │ (En memoria, sin ID en BBDD)
                  └──────┬───────┘
                         │ persist() / save()
                         ▼
                  ┌──────────────┐  close() / clear()   ┌──────────────┐
                  │   MANAGED    │ ───────────────────> │   DETACHED   │
                  └──────┬───────┘ <─────────────────── └──────────────┘
                         │               merge()
                         │ remove() / delete()
                         ▼
                  ┌──────────────┐
                  │   REMOVED    │ (Marcado para borrado físico en SQL)
                  └──────────────┘
\`\`\`

1. **Transient (Nuevo):** Creado en memoria mediante \`new\`. No tiene identificador (\`ID\`) asignado en la base de datos ni está vinculado a ninguna sesión.
2. **Managed (Gestionado):** Asociado activamente al \`EntityManager\`. Cualquier cambio en sus propiedades se sincronizará automáticamente con la base de datos al finalizar la transacción.
3. **Detached (Desconectado):** La transacción o sesión ha finalizado. La entidad conserva su ID de base de datos, pero los cambios que se hagan sobre ella en memoria ya no se guardarán automáticamente salvo que se invoque \`merge()\`.
4. **Removed (Eliminado):** Marcado para eliminación física en la base de datos al ejecutarse el \`commit\`.

---

## 4. Mapeo de Relaciones, Cascada y Eliminación de Huérfanos

### Multiplicidades y Dueño de la Relación:
* **\`@ManyToOne\`:** La relación más común. Muchos registros apuntan a uno (ej. muchos pedidos pertenecen a un cliente). **Siempre es el dueño de la clave foránea (\`FK\`)**.
* **\`@OneToMany(mappedBy = "...")\`:** El lado inverso. El atributo \`mappedBy\` indica el nombre del campo en la clase hija que es dueña de la relación.
* **\`@ManyToMany\`:** Relación de muchos a muchos mediante una tabla intermedia gestionada con \`@JoinTable\`.

### Reglas de Cascada y Huérfanos:
\`\`\`java
@Entity
public class Factura {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // cascade: las operaciones en Factura se propagan a sus líneas
    // orphanRemoval: si se quita una línea de la lista, se borra de la BBDD
    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineaFactura> lineas = new ArrayList<>();
}
\`\`\`

---

## 5. De SQL a JPQL y Spring Data JPA

Spring Data JPA simplifica al extremo la persistencia mediante interfaces declarativas:

\`\`\`java
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // 1. Derived Query Method: Spring Data genera el SQL a partir del nombre del método
    List<Producto> findByCategoriaAndPrecioLessThan(String categoria, Double precioMaximo);

    // 2. Consulta JPQL: Opera sobre entidades y atributos Java, no sobre tablas SQL
    @Query("SELECT p FROM Producto p WHERE p.stock > 0 ORDER BY p.nombre ASC")
    List<Producto> findDisponiblesOrdenados();
}
\`\`\``
  },

  // 6.4 Arquitectura Multicapa Enterprise en Spring Boot y Ciclo de Vida HTTP
  {
    id: "petete-sepe-arquitectura-multicapa-http",
    slug: "sepe-arquitectura-multicapa-http",
    topicNum: "6.4",
    title: "Arquitectura Multicapa Enterprise en Spring Boot y Ciclo de Vida HTTP",
    moduleTitle: "Bloque 6: Cuerpo Teórico Consolidado (De POO a Spring Boot · IFCD0177)",
    moduleShort: "Bloque 6",
    badge: "TEORÍA OFICIAL · IFCD0177",
    contentMd: `# Arquitectura Multicapa Enterprise en Spring Boot y Ciclo de Vida HTTP

> 🎓 **Cuerpo Teórico Consolidado:** Especialidad Formativa Oficial IFCD0177 (*Desarrollo de Aplicaciones Orientadas a Objetos con Java*) — SEPE / Enclave Formación.
> 
> *Detalla el flujo arquitectónico completo que recorre una petición HTTP desde que impacta en el servidor web hasta que se almacena en base de datos y retorna al cliente.*

---

## 1. El Viaje Completo de una Petición HTTP (Flujo en 7 Fases)

En una arquitectura limpia de Spring Boot, el flujo de una petición está estrictamente delimitado para evitar que las capas se contaminen entre sí:

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Cliente as Cliente HTTP (Frontend / Postman)
    participant Tomcat as Servidor Tomcat (Puerto 8080)
    participant Dispatcher as DispatcherServlet & Jackson
    participant Controller as @RestController (Capa Web)
    participant Service as @Service (Lógica de Negocio)
    participant Repo as @Repository (Spring Data JPA)
    database DB as Base de Datos Relacional

    Cliente->>Tomcat: POST /api/v1/productos + JSON Payload
    Tomcat->>Dispatcher: Enruta la petición
    Note over Dispatcher: Deserializa JSON a DTO<br/>Ejecuta validaciones declarativas (@Valid)
    Dispatcher->>Controller: Invoca método con ProductoRequestDTO
    Controller->>Service: Invoca service.crear(dto)
    Note over Service: Abre transacción (@Transactional)<br/>Aplica reglas de negocio<br/>Convierte DTO a Entidad JPA
    Service->>Repo: repo.save(entidad)
    Repo->>DB: Ejecuta INSERT INTO productos...
    DB-->>Repo: Retorna registro persistido con nuevo ID
    Repo-->>Service: Retorna Entidad gestionada
    Note over Service: Convierte Entidad a ProductoResponseDTO<br/>Cierra transacción (COMMIT)
    Service-->>Controller: Retorna ProductoResponseDTO
    Note over Controller: Envuelve en ResponseEntity.created(uri).body(dto)
    Controller-->>Dispatcher: Retorna ResponseEntity<DTO>
    Dispatcher-->>Tomcat: Serializa DTO a JSON + Código HTTP 201
    Tomcat-->>Cliente: Respuesta HTTP 201 Created + JSON
\`\`\`

---

## 2. Capa de Presentación (\`@RestController\`)

Es la puerta de entrada a la aplicación. Su única responsabilidad es gestionar el protocolo HTTP:

* **\`@RestController\`:** Anotación compuesta que combina \`@Controller\` y \`@ResponseBody\`. Hace que todos los métodos devuelvan directamente datos estructurados (JSON/XML) en lugar de vistas HTML.
* **Mapeo de Verbos HTTP Semánticos:**
  * \`@GetMapping\`: Consulta y lectura idempotente de recursos.
  * \`@PostMapping\`: Creación no idempotente de nuevos recursos.
  * \`@PutMapping\`: Reemplazo completo de un recurso existente.
  * \`@DeleteMapping\`: Eliminación de un recurso.
  * \`@PatchMapping\`: Modificación parcial de un recurso.
* **Extracción de Parámetros:**
  * \`@PathVariable\`: Captura variables embebidas en la ruta (\`/api/productos/{id}\`).
  * \`@RequestParam\`: Captura parámetros de consulta tipo filtro (\`/api/productos?categoria=TECH&page=1\`).
  * \`@RequestBody\`: Captura el cuerpo JSON de la petición y lo deserializa al DTO correspondiente.

---

## 3. Respuestas Semánticas con \`ResponseEntity<T>\`

Un servicio web profesional jamás debe devolver objetos desnudos ni tipos genéricos; debe devolver **\`ResponseEntity<T>\`** para controlar con precisión el código de estado HTTP y los encabezados:

\`\`\`java
@RestController
@RequestMapping("/api/v1/productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crear(@Valid @RequestBody ProductoRequestDTO request) {
        ProductoResponseDTO creado = service.crear(request);
        // Retorna 201 Created junto a la cabecera Location con la URI del nuevo recurso
        URI location = URI.create("/api/v1/productos/" + creado.id());
        return ResponseEntity.created(location).body(creado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)                           // 200 OK si existe
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not Found si no existe
    }
}
\`\`\`

---

## 4. Capa de Negocio (\`@Service\`) y Transacciones Atómicas

La capa de servicio concentra las validaciones de negocio complejas, los cálculos y la orquestación entre múltiples repositorios.

### El Rol Crítico de \`@Transactional\`:
* **Atomicidad (ACID):** Todas las operaciones de base de datos dentro del método forman una única unidad de trabajo. O se guardan todas o no se guarda ninguna.
* **Rollback Automático:** Si el método lanza cualquier excepción no chequeada (\`RuntimeException\`), Spring revierte automáticamente todos los cambios ejecutados en la base de datos.
* **Optimización en Lecturas:** Anotar métodos de consulta con \`@Transactional(readOnly = true)\` desactiva el dirty checking de Hibernate, reduciendo el consumo de memoria y mejorando la latencia de respuesta.

---

## 5. Delimitación Estricta de Responsabilidades por Capa

| Capa | Responsabilidades Obligatorias | Prohibiciones Terminantes |
|---|---|---|
| **Controller** | Mapear rutas HTTP, validar sintaxis de DTOs con \`@Valid\`, fijar códigos de estado con \`ResponseEntity\`. | **PROHIBIDO:** Escribir lógica de negocio, acceder directamente a repositorios o usar SQL/JPQL. |
| **Service** | Reglas de negocio, cálculos, transacciones con \`@Transactional\`, conversión bidireccional entre DTOs y Entidades. | **PROHIBIDO:** Manipular objetos \`HttpServletRequest\`, \`HttpServletResponse\` o retornar códigos HTTP directamente. |
| **Repository** | Ejecutar operaciones de persistencia, consultas derivadas y JPQL. | **PROHIBIDO:** Validar reglas de negocio o manipular DTOs. Solo opera con Entidades JPA y tipos primitivos. |`
  },

  // 6.5 Resiliencia, Calidad de APIs: DTOs, Validaciones y Manejo de Errores
  {
    id: "petete-sepe-resiliencia-dtos-errores",
    slug: "sepe-resiliencia-dtos-errores",
    topicNum: "6.5",
    title: "Resiliencia y Calidad de APIs: DTOs, Validaciones y Manejo de Errores",
    moduleTitle: "Bloque 6: Cuerpo Teórico Consolidado (De POO a Spring Boot · IFCD0177)",
    moduleShort: "Bloque 6",
    badge: "TEORÍA OFICIAL · IFCD0177",
    contentMd: `# Resiliencia y Calidad de APIs: DTOs, Validaciones y Manejo de Errores

> 🎓 **Cuerpo Teórico Consolidado:** Especialidad Formativa Oficial IFCD0177 (*Desarrollo de Aplicaciones Orientadas a Objetos con Java*) — SEPE / Enclave Formación.
> 
> *Explica los patrones de protección indispensables para construir APIs robustas en entornos productivos: por qué nunca exponer entidades, cómo validar datos declarativamente y cómo atrapar errores centralizadamente.*

---

## 1. El Patrón DTO: Por qué NUNCA Exponer una Entidad JPA

Un error de principiante muy extendido es retornar directamente las entidades \`@Entity\` desde los métodos del \`@RestController\`. En producción, esto genera tres problemas críticos:

1. **Fugas de Seguridad e Información Sensible:** La entidad \`Usuario\` contiene campos como \`passwordHash\`, \`tokenRecuperacion\` o \`intentosFallidos\`. Si se serializa directamente, estos datos viajan en el JSON al navegador.
2. **El Error Fatal de Recursión Infinita (\`StackOverflowError\`):** En relaciones bidireccionales (\`Cliente\` tiene \`Pedidos\` y cada \`Pedido\` tiene a su \`Cliente\`), el serializador Jackson entra en un bucle infinito al intentar convertir el árbol a JSON, provocando la caída del servidor.
3. **Acoplamiento Rígido con la Base de Datos:** Si cambias el nombre de una columna o normalizas una tabla, romperías inmediatamente todos los clientes frontend y aplicaciones móviles que consumen tu API.

> 🛡️ **Solución Definitiva:** El uso obligatorio de **DTOs (*Data Transfer Objects*)**. Los DTOs definen un contrato estricto, plano e inmutable adaptado a lo que cada vista necesita.

---

## 2. Validación Declarativa con Jakarta Bean Validation

En lugar de llenar los controladores de comprobaciones manuales (\`if (nombre == null || nombre.isEmpty())\`), Spring integra **Jakarta Bean Validation** para declarar reglas de integridad mediante anotaciones en el DTO:

\`\`\`java
public record ProductoRequestDTO(
    @NotBlank(message = "El nombre del producto no puede estar vacío")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    String nombre,

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser estrictamente mayor que cero")
    Double precio,

    @NotBlank(message = "La categoría es obligatoria")
    String categoria
) {}
\`\`\`

Para que Spring ejecute estas reglas de validación de forma automática antes de entrar en la lógica del método, se añade la anotación **\`@Valid\`** en el parámetro del controlador:

\`\`\`java
@PostMapping
public ResponseEntity<ProductoResponseDTO> crear(@Valid @RequestBody ProductoRequestDTO dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
}
\`\`\`

---

## 3. Control Centralizado de Excepciones (\`@RestControllerAdvice\`)

En una arquitectura limpia, **los controladores jamás deben contener bloques \`try-catch\` dispersos**. Si un recurso no existe o una validación falla, el servicio lanza una excepción de dominio y Spring la intercepta de forma global mediante un asesor centralizado:

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Manejo de recurso no encontrado (HTTP 404)
    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFound(RecursoNoEncontradoException ex, HttpServletRequest req) {
        ErrorResponseDTO error = new ErrorResponseDTO(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            "Not Found",
            ex.getMessage(),
            req.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // 2. Manejo de fallos en validaciones @Valid (HTTP 400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> {
            errores.put(err.getField(), err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
}
\`\`\`

---

## 4. Pirámide de Testing en Spring Boot

Una aplicación empresarial requiere tres niveles complementarios de verificación automatizada:

1. **Pruebas Unitarias Aisladas (JUnit 5 + Mockito):**
   - Evalúan métodos individuales de la capa de servicio en memoria pura.
   - Utilizan \`@Mock\` para simular los repositorios y \`@InjectMocks\` para el servicio, ejecutándose en pocos milisegundos sin arrancar el contexto de Spring.
2. **Pruebas de Integración Web (\`@WebMvcTest\` + \`MockMvc\`):**
   - Arrancan únicamente la capa web de Spring MVC sin base de datos.
   - Validan que los endpoints mapean correctamente las rutas, que las anotaciones \`@Valid\` rechazan peticiones con JSON inválido y que se devuelven los códigos HTTP correctos.
3. **Pruebas de Integración Completas (\`@SpringBootTest\`):**
   - Levantan el contenedor completo de Spring con una base de datos en memoria (H2 o Testcontainers) para verificar el flujo extremo a extremo.

---

## 5. Rúbrica Oficial de Evaluación y Acreditación (SEPE IFCD0177)

Para obtener la acreditación oficial de la Especialidad Formativa **IFCD0177 - Desarrollo de Aplicaciones Orientadas a Objetos con Java** (100 horas):

* [x] **Visualización Multimedia:** 100% de los 4 módulos completados en el Campus de Enclave Formación.
* [x] **Controles de Aprendizaje:** 4 Test de Autoevaluación superados con nota superior a 5.0 (peso: 30%).
* [x] **Actividad Obligatoria de Entrega:** Caso práctico implementado y corregido por Javier García Lobo (peso: 30%).
* [x] **Prueba de Evaluación Final:** Examen integral final resuelto con éxito (peso: 70%).
* [x] **Fecha Límite Oficial Inamovible:** 30 de Noviembre de 2026.`
  }
];

module.exports = topics;
