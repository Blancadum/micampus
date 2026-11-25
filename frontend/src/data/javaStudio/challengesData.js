// =========================================================================
// DATOS: LABORATORIO DE RETOS Y CASOS REALES PARA PENSAR
// =========================================================================

export const DILEMAS_ARQUITECTURA = [
  {
    id: 'dilema-transaccional',
    titulo: 'El Fallo Transaccional Silencioso (Proxy Self-Invocation)',
    categoria: 'Transacciones & Spring AOP',
    dificultad: 'Avanzado',
    sintoma: 'Un método del servicio falla con RuntimeException al procesar el tercer elemento, pero la base de datos NO hace rollback y guarda registros corruptos.',
    contextoEmpresa: 'En una pasarela de cobros, un desarrollador agrupó el procesamiento en lote dentro de PaymentServiceImpl. El método público executeBatch() itera sobre una lista y llama a this.processSinglePayment(), que está anotado con @Transactional.',
    codigoProblema: `@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    // Método público invocado desde el Controller (sin @Transactional)
    public void executeBatch(List<PaymentRequestDTO> payments) {
        for (PaymentRequestDTO dto : payments) {
            // ¡LLAMADA INTERNA VIA THIS!
            processSinglePayment(dto);
        }
    }

    // ¡Anotación ignorada por Spring en tiempo de ejecución!
    @Transactional(rollbackFor = Exception.class)
    public void processSinglePayment(PaymentRequestDTO dto) {
        Payment p = new Payment(dto.amount(), dto.concept());
        paymentRepository.save(p);
        if (dto.amount() <= 0) {
            throw new InvalidPaymentException("Monto inválido");
        }
    }
}`,
    porQueOcurre: 'Spring implementa @Transactional mediante Spring AOP creando un objeto PROXY dinámico que envuelve al Bean. Cuando un cliente externo (Controller) llama a un método, pasa a través del proxy y se abre la transacción. Sin embargo, cuando un método llama a otro método de la MISMA clase usando "this.", la llamada se ejecuta internamente en la JVM sin pasar por el proxy de Spring. En consecuencia, @Transactional es totalmente ignorada, no se abre transacción y no existe rollback.',
    preguntasPensar: [
      '¿Por qué el compilador de Java no da ningún error de sintaxis si el código es defectuoso en tiempo de ejecución?',
      '¿Qué ocurre con la conexión a base de datos en modo autocommit si no hay transacción activa?',
      '¿Qué dos formas limpias existen para solucionar este problema arquitectónico?'
    ],
    solucionExplicada: 'La solución estándar de la industria consiste en separar responsabilidades: extraer la operación transaccional unitaria a una clase de servicio colaboradora independiente (SinglePaymentProcessor) e inyectarla en el servicio batch. De este modo, la llamada atraviesa limpiamente el proxy de Spring. Alternativamente, se puede utilizar TransactionTemplate programático.',
    codigoSolucion: `@Service
public class SinglePaymentProcessor {
    private final PaymentRepository paymentRepository;

    public SinglePaymentProcessor(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public void processSinglePayment(PaymentRequestDTO dto) {
        if (dto.amount() <= 0) {
            throw new InvalidPaymentException("Monto inválido");
        }
        Payment p = new Payment(dto.amount(), dto.concept());
        paymentRepository.save(p);
    }
}

@Service
public class PaymentServiceImpl implements PaymentService {
    private final SinglePaymentProcessor singleProcessor;

    public PaymentServiceImpl(SinglePaymentProcessor singleProcessor) {
        this.singleProcessor = singleProcessor;
    }

    public void executeBatch(List<PaymentRequestDTO> payments) {
        for (PaymentRequestDTO dto : payments) {
            // ¡Ahora pasa a través del proxy de Spring! Transacción y rollback garantizados
            singleProcessor.processSinglePayment(dto);
        }
    }
}`,
    preguntaExamen: '¿Por qué las llamadas a métodos privados anotados con @Transactional nunca abren transacción en Spring AOP estándar?'
  },

  {
    id: 'dilema-concurrencia',
    titulo: 'La Trampa de Concurrencia y Sobrevendido (Race Condition)',
    categoria: 'Concurrencia & JPA',
    dificultad: 'Avanzado',
    sintoma: 'En un pico de tráfico, dos usuarios solicitan el último libro disponible (stock = 1) en el mismo milisegundo. Ambas peticiones finalizan con HTTP 201 Created y el stock en base de datos termina en -1.',
    contextoEmpresa: 'En la plataforma de Librería, el endpoint de préstamo valida si book.getAvailableStock() > 0 antes de guardar. En pruebas individuales funciona perfecto, pero bajo carga concurrente se producen reservas fantasmas.',
    codigoProblema: `@Service
public class LoanServiceImpl implements LoanService {
    @Transactional
    public LoanResponseDTO borrowBook(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new BookNotFoundException(bookId));

        // Hilo A lee: stock = 1 (¡Pasa la validación!)
        // Hilo B lee: stock = 1 (¡Pasa la validación al mismo tiempo!)
        if (book.getAvailableStock() <= 0) {
            throw new OutOfStockException("Sin stock disponible");
        }

        // Hilo A calcula: 1 - 1 = 0
        // Hilo B calcula: 1 - 1 = 0 (o sobreescribe dejando stock corrupto)
        book.setAvailableStock(book.getAvailableStock() - 1);
        bookRepository.save(book);

        Loan loan = new Loan(book, userId);
        return loanMapper.toDTO(loanRepository.save(loan));
    }
}`,
    porQueOcurre: 'Es una condición de carrera (Race Condition) de tipo "Check-Then-Act" bajo el nivel de aislamiento estándar Read Committed. Ambos hilos ejecutan la lectura antes de que el otro hilo haya hecho commit del UPDATE. No hay ningún bloqueo a nivel de registro ni control de versiones.',
    preguntasPensar: [
      '¿Qué diferencia de rendimiento existe entre un Bloqueo Optimista (@Version) y un Bloqueo Pesimista (Pessimistic Lock)?',
      '¿Qué excepción lanza Spring Data JPA cuando dos hilos intentan modificar la misma fila en bloqueo optimista?',
      '¿Por qué sincronizar el método con "synchronized" de Java no sirve si levantamos 2 réplicas de la aplicación en Docker o Kubernetes?'
    ],
    solucionExplicada: 'Para entornos concurrentes distribuidos, sincronizar en la JVM con Java no sirve porque cada contenedor Docker corre en su propia máquina virtual. La solución canónica en bases de datos relacionales es el Bloqueo Optimista añadiendo @Version en la entidad, o una consulta con Bloqueo Pesimista en el repositorio (@Lock(LockModeType.PESSIMISTIC_WRITE)).',
    codigoSolucion: `// En la Entidad Book: Bloqueo Optimista con versión
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int availableStock;

    // Hibernate comprueba WHERE version = ? en el UPDATE automático
    @Version
    private Long version;
}

// O Bloqueo Pesimista en el Repositorio (SELECT FOR UPDATE en SQL)
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Book b WHERE b.id = :id")
    Optional<Book> findByIdWithLock(@Param("id") Long id);
}`,
    preguntaExamen: '¿Qué ventaja tiene el Bloqueo Optimista sobre el Pesimista en sistemas web con miles de lecturas y pocas escrituras concurrentes?'
  },

  {
    id: 'dilema-lombok-jpa',
    titulo: 'El Desastre del Bucle Recursivo y StackOverflow (Lombok en JPA)',
    categoria: 'JPA & Mapeo de Objetos',
    dificultad: 'Intermedio',
    sintoma: 'Al consultar un usuario con sus tareas o al imprimir logs con logger.info("{}", user), la aplicación se congela y arroja un fatal java.lang.StackOverflowError.',
    contextoEmpresa: 'Un desarrollador junior añadió la anotación @Data de Lombok a todas las entidades JPA para ahorrar getters, setters, equals y hashcode. Al añadir la relación bidireccional @OneToMany y @ManyToOne entre User y Task, el servidor comenzó a colapsar en producción.',
    codigoProblema: `@Data // ¡Antipatrón fatal en entidades con relaciones!
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Task> tasks; // Llama a Task.toString() -> llama a User.toString() -> Bucle infinito
}

@Data // ¡Antipatrón fatal!
@Entity
@Table(name = "tasks")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Llama a User.toString() -> llama a Task.toString() ...
}`,
    porQueOcurre: '@Data genera automáticamente los métodos toString(), equals() y hashCode() incluyendo TODOS los campos de la clase. En relaciones bidireccionales de JPA, el método toString() de User invoca al de cada Task, el cual a su vez invoca al de User, creando una recursión cíclica infinita hasta agotar el espacio del call stack de la JVM.',
    preguntasPensar: [
      '¿Por qué Jackson también entra en recursión infinita si devolvemos directamente la entidad JPA en un @RestController?',
      '¿Por qué no se debe utilizar equals/hashCode basados en campos mutables dentro de entidades JPA?',
      '¿Cuál es la regla de oro para Lombok en entidades de persistencia?'
    ],
    solucionExplicada: 'Regla de oro: NUNCA usar @Data en entidades JPA. Usar solo @Getter y @Setter explícitos. Si se necesita toString(), excluir explícitamente las colecciones y relaciones con @ToString.Exclude. Y en la capa web, JAMÁS retornar la entidad: mapear siempre a DTOs Records inmutables que cortan cualquier ciclo de serialización.',
    codigoSolucion: `@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude // Evita recursión en logs
    private List<Task> tasks = new ArrayList<>();

    protected User() {} // Obligatorio JPA
    public User(String name) { this.name = name; }
}

// Y en el Controller: Retornar exclusivamente DTO Records
public record UserResponseDTO(Long id, String name, int totalTasks) {}`,
    preguntaExamen: '¿Por qué el uso de DTOs Records elimina de raíz los problemas de recursión cíclica en la serialización JSON de Spring Boot?'
  },

  {
    id: 'dilema-jwt-revocacion',
    titulo: 'La Fuga de Seguridad en Tokens JWT (Stateless vs Revocación)',
    categoria: 'Seguridad & JWT',
    dificultad: 'Avanzado',
    sintoma: 'Un usuario cambia su contraseña o es bloqueado por un administrador, pero puede seguir consumiendo endpoints protegidos de la API durante 24 horas hasta que caduca su token.',
    contextoEmpresa: 'La aplicación utiliza tokens JWT firmados con HMAC-SHA256 y un tiempo de vida (TTL) de 24 horas. Al ser una arquitectura stateless sin sesiones HTTP, el backend solo comprueba la firma matemática del token en cada petición.',
    codigoProblema: `@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
        String token = extractBearerToken(req);
        // ¡SOLO VALIDA LA FIRMA CRIPTOGRÁFICA Y LA FECHA DE EXPIRACIÓN!
        // No comprueba si el usuario cambió credenciales ni si fue revocado.
        if (token != null && jwtService.isTokenValid(token)) {
            String username = jwtService.extractUsername(token);
            // El usuario continúa autorizado aunque esté suspendido en la base de datos
            SecurityContextHolder.getContext().setAuthentication(createAuth(username));
        }
        chain.doFilter(req, res);
    }
}`,
    porQueOcurre: 'En una API REST estrictamente stateless, el servidor no almacena tokens. Esto permite escalar horizontalmente sin compartir sesión, pero introduce el problema clásico de invalidación de tokens JWT: un token emitido es válido hasta su expiración salvo que se implemente un mecanismo de revocación activo.',
    preguntasPensar: [
      '¿Qué ventaja tiene usar Access Tokens de corta duración (15 minutos) combinados con Refresh Tokens?',
      '¿Cómo podemos invalidar tokens sin volver la base de datos un cuello de botella en cada petición HTTP?',
      '¿Qué es el claim "iat" (Issued At) y cómo ayuda a invalidar tokens tras un cambio de contraseña?'
    ],
    solucionExplicada: 'Estrategia recomendada: 1) Reducir el Access Token a 10-15 minutos. 2) Añadir en la entidad de usuario el timestamp "credentialsUpdatedAt". 3) En el filtro JWT, comprobar que la fecha de emisión del token (claim "iat") sea posterior a la última actualización de contraseña. Si es anterior, rechazar la petición con HTTP 401 Unauthorized.',
    codigoSolucion: `@Service
public class JwtService {
    public boolean isTokenActiveAndValid(String token, User user) {
        if (!isSignatureAndExpirationValid(token)) return false;

        Date issuedAt = extractClaim(token, Claims::getIssuedAt);
        // Si el usuario cambió credenciales DESPUÉS de emitir el token, se invalida de inmediato
        if (user.getCredentialsUpdatedAt() != null &&
            issuedAt.before(user.getCredentialsUpdatedAt())) {
            return false;
        }
        return user.isActive();
    }
}`,
    preguntaExamen: '¿Por qué es una mala práctica almacenar los tokens JWT en localStorage en el frontend en lugar de cookies HttpOnly SameSite?'
  },

  {
    id: 'dilema-acoplamiento-hexagonal',
    titulo: 'El Acoplamiento de Base de Datos vs Inversión de Dependencias (Hexagonal)',
    categoria: 'Arquitectura & Diseño',
    dificultad: 'Avanzado',
    sintoma: 'El cliente solicita migrar el almacenamiento de tareas a MongoDB o dynamoDB. En la arquitectura por capas, cambiar la base de datos obliga a modificar la clase de negocio TaskServiceImpl porque importa clases de JPA (@Entity, JpaRepository).',
    contextoEmpresa: 'En la arquitectura tradicional por 3 capas, la capa de servicio depende directamente de la tecnología de persistencia. Al cambiar de SQL relacional a NoSQL, el dominio de negocio sufre cambios colaterales.',
    codigoProblema: `// Arquitectura por capas acoplada a la persistencia
@Service
public class TaskServiceImpl implements TaskService {
    // Acoplado a Spring Data JPA (Relacional)
    private final TaskRepository jpaRepo; 

    @Transactional
    public TaskResponseDTO create(TaskRequestDTO dto) {
        // La entidad JPA "Task" contiene anotaciones @Entity, @Table, @Column
        Task jpaEntity = new Task(dto.title(), dto.description());
        return mapper.toDTO(jpaRepo.save(jpaEntity));
    }
}`,
    porQueOcurre: 'Viola el Principio de Inversión de Dependencias (DIP) de SOLID: los módulos de alto nivel (negocio) no deben depender de módulos de bajo nivel (base de datos, Hibernate, SQL); ambos deben depender de abstracciones (interfaces de puertos).',
    preguntasPensar: [
      '¿Qué ocurre con los tests unitarios del dominio si la entidad tiene anotaciones de Hibernate?',
      '¿Cómo permite la arquitectura Hexagonal cambiar la base de datos sin tocar una sola línea del dominio ni de los casos de uso?',
      '¿Qué es un Puerto de Salida (Driven Port) y quién lo implementa?'
    ],
    solucionExplicada: 'En Arquitectura Hexagonal, el modelo Task es un POJO de Java puro sin dependencias de frameworks. El dominio define la interfaz TaskRepositoryPort. El adaptador de infraestructura (TaskJpaAdapter) implementa ese puerto traduciendo al modelo relacional. Si mañana cambiamos a MongoDB, solo escribimos un nuevo TaskMongoAdapter sin modificar el dominio.',
    codigoSolucion: `// DOMINIO PURO (Independiente de la tecnología)
public interface TaskRepositoryPort {
    Task save(Task task);
    Optional<Task> findById(Long id);
}

// CASO DE USO (No conoce JPA ni MongoDB)
public class CreateTaskService implements CreateTaskUseCase {
    private final TaskRepositoryPort repositoryPort;
    public CreateTaskService(TaskRepositoryPort port) { this.repositoryPort = port; }

    @Override
    public Task execute(CreateTaskCommand cmd) {
        Task task = new Task(cmd.title(), cmd.description()); // POJO Puro
        return repositoryPort.save(task);
    }
}

// ADAPTADOR EXTERIOR JPA (Detalle de infraestructura descartable)
@Component
public class TaskJpaPersistenceAdapter implements TaskRepositoryPort {
    private final SpringDataJpaTaskRepository jpaRepository;
    @Override
    public Task save(Task task) {
        TaskJpaEntity entity = TaskMapper.toEntity(task);
        return TaskMapper.toDomain(jpaRepository.save(entity));
    }
}`,
    preguntaExamen: '¿Por qué la Arquitectura Hexagonal permite ejecutar pruebas unitarias del 100% de la lógica de negocio en microsegundos sin levantar el contexto de Spring?'
  }
];

export const GUIA_PROYECTO_CERO = [
  {
    paso: 1,
    titulo: 'Paso 1: Inicialización Limpia con Spring Initializr',
    subtitulo: 'Selección estricta de dependencias sin boilerplate innecesario',
    explicacion: 'Un error común al arrancar un proyecto es añadir decenas de dependencias que inflan el classpath y ralentizan el arranque. Para un microservicio robusto en producción solo necesitamos los siguientes starters oficiales.',
    dependencias: [
      'spring-boot-starter-web (Tomcat embebido y Spring MVC)',
      'spring-boot-starter-data-jpa (Hibernate y EntityManager)',
      'spring-boot-starter-validation (Jakarta Bean Validation)',
      'com.h2database:h2 (Base de datos relacional en memoria para desarrollo)',
      'spring-boot-starter-test (JUnit 5, Mockito y AssertJ)'
    ],
    codigo: `<!-- pom.xml mínimo canónico -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`
  },
  {
    paso: 2,
    titulo: 'Paso 2: Modelado del Dominio Puro antes de la Base de Datos',
    subtitulo: 'Diseñar la lógica y las invariantes sin atarse a anotaciones de persistencia',
    explicacion: 'El primer archivo en el que debes pensar no es la tabla ni el controlador, sino el modelo de negocio: una clase Java POJO con reglas de validación en su propio constructor que impidan crear estados corruptos.',
    codigo: `package com.studio.orderhub.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Order {
    private final Long id;
    private final Long customerId;
    private final BigDecimal totalAmount;
    private final OrderStatus status;
    private final LocalDateTime createdAt;

    public Order(Long id, Long customerId, BigDecimal totalAmount) {
        if (customerId == null || customerId <= 0) {
            throw new IllegalArgumentException("Cliente obligatorio");
        }
        if (totalAmount == null || totalAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El importe debe ser mayor que cero");
        }
        this.id = id;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.status = OrderStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    // Getters inmutables
    public Long getId() { return id; }
    public Long getCustomerId() { return customerId; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public OrderStatus getStatus() { return status; }
}`
  },
  {
    paso: 3,
    titulo: 'Paso 3: Definir el Contrato de Entrada (DTOs & Records)',
    subtitulo: 'Aislar el mundo exterior con inmutabilidad y Bean Validation',
    explicacion: 'Crea los Java Records inmutables para el payload que enviará el cliente en el cuerpo HTTP POST. Jamás expongas campos internos de control.',
    codigo: `package com.studio.orderhub.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record CreateOrderRequest(
    @NotNull(message = "El identificador de cliente es obligatorio")
    @Positive(message = "El ID de cliente debe ser positivo")
    Long customerId,

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.01", message = "El importe mínimo de un pedido es 0.01")
    BigDecimal totalAmount
) {}

public record OrderResponse(
    Long id,
    Long customerId,
    BigDecimal totalAmount,
    String status,
    String createdAt
) {}`
  },
  {
    paso: 4,
    titulo: 'Paso 4: La Capa de Negocio Transaccional (@Service)',
    subtitulo: 'Orquestar validaciones con @Transactional y rollback automático',
    explicacion: 'Implementa el servicio inyectando el repositorio en el constructor. Envuelve el guardado con @Transactional para garantizar consistencia ACID.',
    codigo: `package com.studio.orderhub.service;

import com.studio.orderhub.domain.model.Order;
import com.studio.orderhub.dto.*;
import com.studio.orderhub.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest req) {
        Order order = new Order(null, req.customerId(), req.totalAmount());
        Order saved = orderRepository.save(order);
        return new OrderResponse(
            saved.getId(),
            saved.getCustomerId(),
            saved.getTotalAmount(),
            saved.getStatus().name(),
            saved.getCreatedAt().toString()
        );
    }
}`
  },
  {
    paso: 5,
    titulo: 'Paso 5: Controlador REST y Manejador Global de Errores',
    subtitulo: 'HTTP semántico con @RestController y @RestControllerAdvice',
    explicacion: 'Expón el endpoint POST /api/v1/orders con código HTTP 201 Created y asegura que cualquier fallo de validación devuelva un JSON estructurado.',
    codigo: `@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) { this.orderService = orderService; }

    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(req));
    }
}

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.badRequest().body(Map.of("status", 400, "errors", errors));
    }
}`
  },
  {
    paso: 6,
    titulo: 'Paso 6: Testing Unitario Instantáneo con Mockito',
    subtitulo: 'Validar la lógica de negocio en milisegundos sin arrancar Spring',
    explicacion: 'El test unitario debe aislar la capa de servicio con @ExtendWith(MockitoExtension.class). No levanta servidores ni base de datos.',
    codigo: `@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {
    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    void shouldCreateOrderSuccessfully() {
        // Arrange
        CreateOrderRequest request = new CreateOrderRequest(42L, new BigDecimal("99.90"));
        Order savedOrder = new Order(1L, 42L, new BigDecimal("99.90"));
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        // Act
        OrderResponse response = orderService.createOrder(request);

        // Assert
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.status()).isEqualTo("PENDING");
        verify(orderRepository, times(1)).save(any(Order.class));
    }
}`
  }
];

export const TALLERES_IFCD = [
  {
    id: 'taller-patrones-gof',
    titulo: 'Taller 1: Detección y Selección de Patrones GoF & Principios SOLID',
    modulo: 'M2: SOLID & Patrones',
    dificultad: 'Intermedio',
    archivo: '/fuentes/ifcd0177/U2_PATRONES_DISEÑO_BUENAS_PRACTICAS_JAVA/patrones/Actividad_patrones-Detectar patrones.md',
    badge: 'Patrones GoF · Arquitectura',
    escenarios: [
      {
        nombre: 'Escenario 1: Configuración Centralizada de App',
        descripcion: 'Garantizar que ConfiguracionApp tenga una única instancia, accesible desde cualquier punto del programa.',
        patron: 'Singleton (Creacional)',
        justificacion: 'Controla el ciclo de instanciación para asegurar una única instancia global en memoria y un punto de acceso centralizado sin colisiones.'
      },
      {
        nombre: 'Escenario 2: Mensajería Multicanal',
        descripcion: 'Una fábrica decide qué canal concreto (Email, SMS, Push) se instancia. El código cliente solo conoce la interfaz CanalNotificacion.',
        patron: 'Factory Method (Creacional)',
        justificacion: 'Delega la creación en métodos de fábrica especializados, desacoplando al cliente de las implementaciones concretas mediante una interfaz común.'
      },
      {
        nombre: 'Escenario 3: Notificación de Eventos en Pedidos',
        descripcion: 'Un objeto Pedido notifica automáticamente a inventario, cliente y contabilidad cuándo cambia su estado, sin acoplarse a ellos.',
        patron: 'Observer (Comportamiento)',
        justificacion: 'Modela una relación de dependencia 1-a-N donde el sujeto notifica cambios de estado a una lista dinámica de observadores desacoplados.'
      }
    ],
    dilemaDiseno: {
      titulo: 'Dilema de Diseño: Objetos Complejos con Parámetros Opcionales',
      problema: 'Se requiere crear instancias de Documento con muchos parámetros opcionales (cabecera, pie, marca de agua, orientación vertical/horizontal). ¿Constructores sobrecargados o Builder?',
      solucion: 'El patrón Builder es la solución idónea. Evita el antipatrón de constructores telescópicos, mejora drásticamente la legibilidad mediante interfaz fluida (.conCabecera(...).conPie(...).build()) y asegura la inmutabilidad del objeto final.'
    }
  },
  {
    id: 'taller-jpa-entitymanager',
    titulo: 'Taller 2: Persistencia Avanzada, Ciclo de Vida JPA y EntityManager',
    modulo: 'M3: Persistencia & JPA',
    dificultad: 'Avanzado',
    archivo: '/fuentes/ifcd0177/U3_PERSISTENCIA_BBDD_JAVA/Actividad-3-Persistencia-JPA-EntityManager.md',
    badge: 'JPA Nativo · Hibernate ORM',
    escenarios: [
      {
        nombre: 'Operación 1: Transición Transient a Managed',
        descripcion: 'Creación de un objeto Libro nuevo en memoria y llamada a em.persist(libro).',
        patron: 'persist() / Managed State',
        justificacion: 'El objeto pasa del estado Transient al contexto de persistencia (Managed). Al confirmarse la transacción con tx.commit(), JPA emite el INSERT a la base de datos.'
      },
      {
        nombre: 'Operación 2: Búsqueda y Modificación Automática (Dirty Checking)',
        descripcion: 'Recuperar un registro con em.find(Libro.class, 1L) y modificar su título con setter dentro de la transacción.',
        patron: 'Dirty Checking / Automatic Synchronization',
        justificacion: 'Al estar en estado Managed, cualquier mutación mediante setters es detectada por el mecanismo de Dirty Checking de Hibernate, generando el UPDATE en el commit sin invocar métodos extra.'
      },
      {
        nombre: 'Operación 3: Sincronización de Entidades Desconectadas',
        descripcion: 'Un objeto que estuvo en la sesión HTTP o fue desasociado (Detached) se vuelve a vincular con em.merge(libro).',
        patron: 'merge() / Detached to Managed',
        justificacion: 'JPA copia el estado del objeto desasociado en una instancia gestionada dentro del contexto de persistencia activo y sincroniza con la base de datos.'
      }
    ],
    dilemaDiseno: {
      titulo: 'Ciclo de Vida de las Entidades en JPA',
      problema: '¿Cuál es la diferencia entre em.remove() y un simple DELETE SQL?',
      solucion: 'em.remove() marca la entidad gestionada como Removed en el contexto de persistencia de Hibernate. Esto garantiza que las cascadas (CascadeType.REMOVE o orphanRemoval=true) se propaguen limpiamente a las entidades hijas relacionadas antes del commit.'
    }
  },
  {
    id: 'taller-spring-hikari-rendimiento',
    titulo: 'Taller 3: Arquitectura Spring Boot, Factory Method & Pool HikariCP',
    modulo: 'M4: Spring Framework',
    dificultad: 'Avanzado',
    archivo: '/fuentes/ifcd0177/U4_FRAMEWORK_spring-boot/Actividad-4-Spring-Boot-JPA-Patrones-Rendimiento.md',
    badge: 'Spring Boot 3 · HikariCP · Rendimiento',
    escenarios: [
      {
        nombre: 'Módulo 1: Modelado de Entidades e Integridad',
        descripcion: 'Entidad Incidencia con atributos tipados, validaciones de integridad referencial y claves foráneas.',
        patron: '@Entity, @Table, @NotNull, @Enumerated',
        justificacion: 'Garantiza validación tanto a nivel de aplicación como en el esquema de base de datos relacional DDL.'
      },
      {
        nombre: 'Módulo 2: Factoría de Incidencias',
        descripcion: 'Implementación de Factory Method para instanciar tipos especializados de incidencias (Hardware, Software, Red).',
        patron: 'Factory Method Pattern',
        justificacion: 'Desacopla la lógica de registro de incidencias del tipo concreto, facilitando añadir nuevos canales o naturalezas sin tocar el núcleo.'
      },
      {
        nombre: 'Módulo 3: Optimización del Pool HikariCP',
        descripcion: 'Ajuste de maximum-pool-size, minimum-idle y connection-timeout para soportar alta concurrencia sin saturar PostgreSQL/MySQL.',
        patron: 'HikariCP High Performance Connection Pool',
        justificacion: 'Evita el cuello de botella de apertura de sockets TCP/IP por petición, reutilizando conexiones atómicas con latencias inferiores a 5ms.'
      }
    ],
    dilemaDiseno: {
      titulo: 'Prevención del Problema N+1 en Consultas Relacionales',
      problema: 'Al listar incidencias con sus técnicos asignados en FetchType.LAZY, Hibernate ejecuta 1 consulta para las incidencias y N consultas adicionales para cada técnico.',
      solucion: 'Utilizar JOIN FETCH en consultas JPQL (SELECT i FROM Incidencia i JOIN FETCH i.tecnico) o definir @EntityGraph en el repositorio para traer los datos relacionados en un único SELECT con JOIN.'
    }
  }
];
