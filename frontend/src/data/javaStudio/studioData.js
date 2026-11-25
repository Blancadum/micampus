// =========================================================================
// JAVA BACKEND ARCHITECTURE & SPRING BOOT STUDIO - KNOWLEDGE BASE
// Master Data: Arquitecturas, 16 Actividades, Teoría, Apuntes, Quizzes y Retos
// =========================================================================

const ACCENTURE_DATA = {
  "meta": {
    "programa": "{\"Pr0gr4m4 tu ƒutur0\"}; 1ª Edición Back-End Java con GenAI",
    "entidad": "Bootcamp Java Backend",
    "estudiante": "Blanca De Uña Martín",
    "version": "3.0.0",
    "descripcion": "Tutor interactivo especializado en los dos proyectos (TaskManager y Library API), arquitecturas por capas y hexagonal, teoría para la defensa y las tutorías de Isra."
  },
  "proyectos": {
    "taskmanager": {
      "id": "taskmanager",
      "nombre": "TaskManager (Proyecto Pedagógico Paso a Paso)",
      "subtitulo": "Desarrollado de forma progresiva a lo largo de las Actividades 5 a 16",
      "descripcion": "El proyecto nuclear de aprendizaje del bootcamp. Nace en memoria con una lista de tareas y evoluciona capa a capa hasta convertirse en una API REST con persistencia JPA, DTOs, validaciones, excepciones globales, JWT y Docker.",
      "capas": [
        {
          "nombre": "Capa Web (Controller)",
          "componente": "TaskController.java",
          "anotaciones": [
            "@RestController",
            "@RequestMapping(\"/api/v1/tasks\")",
            "@Valid",
            "ResponseEntity"
          ],
          "responsabilidad": "Atiende peticiones HTTP, valida la sintaxis JSON con @Valid, delega al servicio TaskService y devuelve respuestas con códigos HTTP (200, 201, 204).",
          "codigo": "@RestController\n@RequestMapping(\"/api/v1/tasks\")\npublic class TaskController {\n    private final TaskService taskService;\n\n    public TaskController(TaskService taskService) {\n        this.taskService = taskService;\n    }\n\n    @GetMapping\n    public ResponseEntity<List<TaskResponseDTO>> getAll() {\n        return ResponseEntity.ok(taskService.getAllTasks());\n    }\n\n    @PostMapping\n    public ResponseEntity<TaskResponseDTO> create(@Valid @RequestBody TaskRequestDTO dto) {\n        TaskResponseDTO created = taskService.createTask(dto);\n        return ResponseEntity.status(HttpStatus.CREATED).body(created);\n    }\n}"
        },
        {
          "nombre": "Capa de Negocio (Service)",
          "componente": "TaskService.java & TaskServiceImpl.java",
          "anotaciones": [
            "@Service",
            "@Transactional",
            "@Transactional(readOnly = true)"
          ],
          "responsabilidad": "Contiene las reglas de negocio de las tareas, gestiona transacciones ACID, invoca repositorios y convierte entidades a DTOs con TaskMapper.",
          "codigo": "@Service\npublic class TaskServiceImpl implements TaskService {\n    private final TaskRepository taskRepository;\n    private final TaskMapper taskMapper;\n\n    public TaskServiceImpl(TaskRepository repo, TaskMapper mapper) {\n        this.taskRepository = repo;\n        this.taskMapper = mapper;\n    }\n\n    @Override\n    @Transactional(readOnly = true)\n    public TaskResponseDTO getTaskById(Long id) {\n        Task task = taskRepository.findById(id)\n            .orElseThrow(() -> new ResourceNotFoundException(\"Tarea \" + id + \" no encontrada\"));\n        return taskMapper.toResponseDTO(task);\n    }\n}"
        },
        {
          "nombre": "Capa de Persistencia (Repository)",
          "componente": "TaskRepository.java",
          "anotaciones": [
            "@Repository",
            "JpaRepository<Task, Long>",
            "@Query"
          ],
          "responsabilidad": "Acceso a la base de datos relacional H2/MySQL. Ofrece CRUD automático y consultas Derived Queries como findByCompleted(boolean).",
          "codigo": "@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n    List<Task> findByCompleted(boolean completed);\n    List<Task> findByTitleContainingIgnoreCase(String keyword);\n}"
        },
        {
          "nombre": "Capa DTO & Mappers",
          "componente": "TaskRequestDTO, TaskResponseDTO, TaskMapper",
          "anotaciones": [
            "@Component",
            "@NotBlank",
            "@Size",
            "@NotNull"
          ],
          "responsabilidad": "Desacopla la base de datos de la interfaz pública. Mappers manuales con bucles for clásicos sin Streams (requisito oficial).",
          "codigo": "@Component\npublic class TaskMapper {\n    public TaskResponseDTO toResponseDTO(Task task) {\n        if (task == null) return null;\n        TaskResponseDTO dto = new TaskResponseDTO();\n        dto.setId(task.getId());\n        dto.setTitle(task.getTitle());\n        dto.setCompleted(task.isCompleted());\n        return dto;\n    }\n}"
        }
      ],
      "hexagonal": {
        "descripcion": "Enfoque de Puertos y Adaptadores (Ports & Adapters) para TaskManager. El dominio de la tarea no depende de Spring ni de JPA; se comunica mediante puertos.",
        "nucleo": "Dominio Puro: Task (POJO sin anotaciones @Entity), reglas de negocio aisladas.",
        "puertosEntrada": "TaskUseCase / ManageTaskPort (interfaz con métodos: createTask, completeTask, getTask).",
        "puertosSalida": "TaskPersistencePort (interfaz con métodos: save, findById, findAll).",
        "adaptadoresPrimarios": "RestTaskAdapter (@RestController que implementa el transporte HTTP y llama al puerto de entrada).",
        "adaptadoresSecundarios": "JpaTaskRepositoryAdapter (clase con @Component que implementa TaskPersistencePort usando un JpaRepository interno).",
        "codigoEjemplo": "// PUERTO DE SALIDA (En el núcleo de dominio, sin Spring)\npackage com.studio.taskmanager.domain.port.out;\n\nimport com.studio.taskmanager.domain.model.Task;\nimport java.util.Optional;\n\npublic interface TaskPersistencePort {\n    Task save(Task task);\n    Optional<Task> findById(Long id);\n}\n\n// ADAPTADOR SECUNDARIO (En infraestructura, con Spring Data)\npackage com.studio.taskmanager.infrastructure.adapter.out;\n\n@Component\npublic class JpaTaskRepositoryAdapter implements TaskPersistencePort {\n    private final SpringDataJpaTaskRepository jpaRepository;\n\n    public JpaTaskRepositoryAdapter(SpringDataJpaTaskRepository repo) {\n        this.jpaRepository = repo;\n    }\n\n    @Override\n    public Task save(Task task) {\n        TaskEntity entity = TaskEntity.fromDomain(task);\n        return jpaRepository.save(entity).toDomain();\n    }\n}"
      }
    },
    "library": {
      "id": "library",
      "nombre": "Library API REST (Proyecto Final Oficial)",
      "subtitulo": "Gestión integral de biblioteca empresarial (Libros, Autores, Categorías, Préstamos)",
      "descripcion": "El proyecto final presentado para cerrar el bootcamp. Desarrollado con Spring Boot y Java, incorpora control transaccional de stock, cálculo dinámico de estado OVERDUE, seguridad JWT y validación @ValidStock.",
      "capas": [
        {
          "nombre": "Capa Web (Controllers Especializados)",
          "componente": "BookController, LoanController, AuthController",
          "anotaciones": [
            "@RestController",
            "@RequestMapping",
            "@PreAuthorize",
            "@Valid"
          ],
          "responsabilidad": "Endpoints para catálogo público, autenticación y gestión protegida de préstamos con roles RBAC (ROLE_ADMIN, ROLE_USER).",
          "codigo": "@RestController\n@RequestMapping(\"/api/v1/loans\")\npublic class LoanController {\n    private final LoanService loanService;\n\n    public LoanController(LoanService loanService) {\n        this.loanService = loanService;\n    }\n\n    @PostMapping\n    public ResponseEntity<LoanResponseDTO> createLoan(@Valid @RequestBody LoanRequestDTO request) {\n        LoanResponseDTO loan = loanService.createLoan(request);\n        return ResponseEntity.status(HttpStatus.CREATED).body(loan);\n    }\n\n    @PutMapping(\"/{id}/return\")\n    public ResponseEntity<LoanResponseDTO> returnBook(@PathVariable Long id) {\n        return ResponseEntity.ok(loanService.returnBook(id));\n    }\n}"
        },
        {
          "nombre": "Capa de Negocio (Reglas Transaccionales & Stock)",
          "componente": "LoanServiceImpl.java & BookServiceImpl.java",
          "anotaciones": [
            "@Service",
            "@Transactional",
            "Control de Stock",
            "Cálculo OVERDUE"
          ],
          "responsabilidad": "Valida stock disponible (availableStock > 0), decrementa stock atómicamente, asigna fecha límite (14 días) y calcula en tiempo real si el préstamo está OVERDUE.",
          "codigo": "@Service\npublic class LoanServiceImpl implements LoanService {\n    private final LoanRepository loanRepository;\n    private final BookRepository bookRepository;\n\n    @Override\n    @Transactional\n    public LoanResponseDTO createLoan(LoanRequestDTO request) {\n        Book book = bookRepository.findById(request.getBookId())\n            .orElseThrow(() -> new ResourceNotFoundException(\"Libro no encontrado\"));\n\n        if (book.getAvailableStock() <= 0) {\n            throw new BookOutOfStockException(\"No quedan ejemplares disponibles de: \" + book.getTitle());\n        }\n\n        book.setAvailableStock(book.getAvailableStock() - 1);\n        bookRepository.save(book);\n\n        Loan loan = new Loan();\n        loan.setBook(book);\n        loan.setLoanDate(LocalDate.now());\n        loan.setDueDate(LocalDate.now().plusDays(14));\n        loan.setStatus(LoanStatus.ACTIVE);\n\n        return LoanMapper.toResponseDTO(loanRepository.save(loan));\n    }\n}"
        },
        {
          "nombre": "Capa DTO & Validador de Negocio (@ValidStock)",
          "componente": "BookRequestDTO, @ValidStock, StockValidator",
          "anotaciones": [
            "@ValidStock",
            "ConstraintValidator",
            "Mappers Manuales"
          ],
          "responsabilidad": "Valida a nivel de clase que availableStock nunca supere a totalStock ni sea negativo antes de llegar al servicio.",
          "codigo": "@Target({ElementType.TYPE})\n@Retention(RetentionPolicy.RUNTIME)\n@Constraint(validatedBy = StockValidator.class)\npublic @interface ValidStock {\n    String message() default \"El stock disponible no puede superar al stock total ni ser negativo\";\n    Class<?>[] groups() default {};\n    Class<? extends Payload>[] payload() default {};\n}\n\npublic class StockValidator implements ConstraintValidator<ValidStock, BookRequestDTO> {\n    @Override\n    public boolean isValid(BookRequestDTO dto, ConstraintValidatorContext ctx) {\n        if (dto == null) return true;\n        if (dto.getAvailableStock() == null || dto.getTotalStock() == null) return true;\n        return dto.getAvailableStock() >= 0 && dto.getAvailableStock() <= dto.getTotalStock();\n    }\n}"
        },
        {
          "nombre": "Capa de Seguridad Stateless con JWT",
          "componente": "SecurityConfig, JwtAuthenticationFilter, JwtService",
          "anotaciones": [
            "@EnableWebSecurity",
            "SessionCreationPolicy.STATELESS",
            "RBAC"
          ],
          "responsabilidad": "Autenticación con HMAC-SHA256 y control de acceso: ROLE_ADMIN gestiona catálogo y devoluciones; ROLE_USER realiza préstamos.",
          "codigo": "@Bean\npublic SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n    return http\n        .csrf(AbstractHttpConfigurer::disable)\n        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n        .authorizeHttpRequests(auth -> auth\n            .requestMatchers(\"/api/v1/auth/**\", \"/swagger-ui/**\", \"/v3/api-docs/**\").permitAll()\n            .requestMatchers(HttpMethod.DELETE, \"/api/v1/**\").hasRole(\"ADMIN\")\n            .requestMatchers(HttpMethod.POST, \"/api/v1/books/**\").hasRole(\"ADMIN\")\n            .anyRequest().authenticated()\n        )\n        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)\n        .build();\n}"
        }
      ],
      "hexagonal": {
        "descripcion": "Evolución Hexagonal de Library API. Aísla completamente la lógica del préstamo y el cálculo de penalizaciones/stock del framework Spring y de la persistencia relacional.",
        "nucleo": "Modelos de Dominio Puros: Book, Loan (con métodos de negocio como loan.isOverdue(), loan.decreaseStock()).",
        "puertosEntrada": "BorrowBookUseCase (prestar libro), ReturnBookUseCase (devolver libro), SearchCatalogUseCase (consultar).",
        "puertosSalida": "BookRepositoryPort, LoanRepositoryPort, NotificationPort (para avisos de retraso).",
        "adaptadoresPrimarios": "LoanRestController (API HTTP), CliConsoleAdapter (interfaz de comandos de terminal).",
        "adaptadoresSecundarios": "JpaBookAdapter, JpaLoanAdapter, SmtpNotificationAdapter.",
        "codigoEjemplo": "// DOMINIO PURO (Sin Spring, sin JPA)\npackage com.studio.library.domain.model;\n\npublic class Loan {\n    private Long id;\n    private Book book;\n    private LocalDate dueDate;\n    private boolean returned;\n\n    public boolean isOverdue() {\n        return !returned && LocalDate.now().isAfter(dueDate);\n    }\n\n    public void processReturn() {\n        this.returned = true;\n        this.book.incrementStock();\n    }\n}"
      }
    }
  },
  "teoria": [
    {
      "id": "ioc-iod",
      "numero": 1,
      "titulo": "1. Inversión de Control (IoC) e Inyección de Dependencias (IoD)",
      "categoria": "Spring Core",
      "resumen": "El fundamento absoluto de Spring Framework y la razón de ser del ApplicationContext.",
      "preguntaEvaluación": "¿Por qué en Spring Boot es obligatorio inyectar dependencias por constructor en lugar de usar @Autowired sobre el atributo privado?",
      "respuestaModelo": "La inyección por constructor aporta 3 ventajas críticas de diseño: 1) Permite inmutabilidad declarando los atributos como private final; 2) Garantiza que el bean nunca se instancie en un estado incompleto o nulo (principio Fail-Fast); y 3) Desacopla la clase del contenedor de Spring, permitiendo escribir pruebas unitarias puras instanciando con new o inyectando mocks de Mockito sin necesidad de levantar el contexto de Spring.",
      "puntosClave": [
        "IoC (Inversion of Control): El flujo de ejecución y el ciclo de vida de los objetos no los controla tu código creando instancias con new, sino el Contenedor de Spring (ApplicationContext / BeanFactory).",
        "IoD (Dependency Injection): Es el patrón mediante el cual el contenedor suministra las dependencias que una clase necesita en tiempo de ejecución.",
        "¿Por qué evitar inyección por campo (@Autowired privado)? Porque oculta dependencias, viola el principio de responsabilidad única al facilitar añadir dependencias sin fricción, y dificulta los tests unitarios.",
        "Scopes de los Beans: Por defecto en Spring Boot todos los Beans son Singleton (una única instancia compartida por toda la JVM). Otros scopes: Prototype (instancia nueva por cada inyección), Request (uno por petición HTTP) y Session (uno por sesión web)."
      ],
      "codigo": "// BUENA PRÁCTICA OFICIAL RECOMENDADA: Inyección por Constructor e Inmutabilidad\n@Service\npublic class TaskServiceImpl implements TaskService {\n\n    private final TaskRepository taskRepository;\n    private final TaskMapper taskMapper;\n\n    // Inyección explícita por constructor: inmutable y 100% testeable sin Spring\n    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {\n        this.taskRepository = taskRepository;\n        this.taskMapper = taskMapper;\n    }\n}\n\n// ANTIPATRÓN A EVITAR EN LA DEFENSA TÉCNICA: Inyección por campo (@Autowired)\n@Service\npublic class BadTaskService {\n    @Autowired // Provoca acoplamiento oculto y dificulta pruebas unitarias\n    private TaskRepository taskRepository;\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 1,
          "titulo": "Actividad 1: IoC Container en XML",
          "explicacion": "Muestra cómo el ApplicationContext instancia los Beans a partir de XML sin usar \"new\".",
          "codigo": "<!-- applicationContext.xml (Actividad 1: IoC en XML) -->\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<beans xmlns=\"http://www.springframework.org/schema/beans\"\n       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n       xsi:schemaLocation=\"http://www.springframework.org/schema/beans\n       http://www.springframework.org/schema/beans/spring-beans.xsd\">\n\n    <!-- Definición del Bean en el contenedor IoC -->\n    <bean id=\"greetingService\" class=\"com.studio.ioc.GreetingServiceImpl\">\n        <property name=\"prefix\" value=\"¡Bienvenida al Bootcamp de Java Backend Studio!\"/>\n    </bean>\n</beans>\n\n// MainApp.java: Recuperación del Bean sin \"new\"\nApplicationContext context = new ClassPathXmlApplicationContext(\"applicationContext.xml\");\nGreetingService service = context.getBean(\"greetingService\", GreetingService.class);\nservice.greet(\"Blanca\");\n((ClassPathXmlApplicationContext) context).close();"
        },
        {
          "actividadNum": 2,
          "titulo": "Actividad 2: Inyección por Constructor (<constructor-arg>)",
          "explicacion": "Demuestra la inyección por constructor para colaboradores en Spring Framework.",
          "codigo": "<!-- applicationContext.xml (Actividad 2: Inyección por Constructor y Setter) -->\n<beans xmlns=\"http://www.springframework.org/schema/beans\" ...>\n\n    <bean id=\"printerService\" class=\"com.studio.iod.ConsolePrinterService\" />\n\n    <!-- Inyección por Constructor (<constructor-arg>) -->\n    <bean id=\"reportServiceConstructor\" class=\"com.studio.iod.ReportService\">\n        <constructor-arg ref=\"printerService\" />\n    </bean>\n\n    <!-- Inyección por Setter (<property>) -->\n    <bean id=\"reportServiceSetter\" class=\"com.studio.iod.ReportService\">\n        <property name=\"printer\" ref=\"printerService\" />\n    </bean>\n</beans>"
        },
        {
          "actividadNum": 7,
          "titulo": "Actividad 7: Inyección por Constructor en TaskServiceImpl",
          "explicacion": "Implementación recomendada en Spring Boot 3 con atributos \"final\" y sin @Autowired.",
          "codigo": "// Actividad 7: TaskService y TaskServiceImpl (Separación de Negocio)\npackage com.studio.taskmanager.service;\n\nimport com.studio.taskmanager.model.Task;\nimport java.util.List;\n\npublic interface TaskService {\n    List<Task> findAll();\n    Task findById(Long id);\n    Task create(Task task);\n}\n\n@Service\npublic class TaskServiceImpl implements TaskService {\n    private final List<Task> tasks = new ArrayList<>();\n    private long seq = 1L;\n\n    @Override\n    public List<Task> findAll() {\n        return new ArrayList<>(tasks);\n    }\n\n    @Override\n    public Task findById(Long id) {\n        for (Task t : tasks) {\n            if (t.getId().equals(id)) return t;\n        }\n        return null;\n    }\n\n    @Override\n    public Task create(Task task) {\n        task.setId(seq++);\n        tasks.add(task);\n        return task;\n    }\n}"
        }
      ]
    },
    {
      "id": "capas-vs-hexagonal",
      "numero": 2,
      "titulo": "2. Arquitectura en 3 Capas vs Arquitectura Hexagonal",
      "categoria": "Arquitectura",
      "resumen": "Cómo justificar las decisiones de diseño arquitectónico en la evaluación técnica.",
      "preguntaEvaluación": "¿En qué casos mantendrías una arquitectura tradicional de 3 capas y cuándo justificarías migrar a Arquitectura Hexagonal (Ports & Adapters)?",
      "respuestaModelo": "La arquitectura en 3 capas (Web -> Service -> Repository) es óptima para aplicaciones estándar con modelos fuertemente centrados en datos (CRUD) donde la productividad y las convenciones de Spring son prioritarias. La arquitectura Hexagonal (Alistair Cockburn) se justifica cuando el Dominio contiene lógica de negocio rica, volátil y compleja que debe protegerse de cambios tecnológicos, o cuando se prevé sustituir frameworks, bases de datos (SQL a NoSQL) o protocolos de entrada (REST a Kafka/GraphQL) sin alterar el núcleo de negocio.",
      "puntosClave": [
        "Capas Tradicionales: La dependencia viaja estrictamente de arriba hacia abajo (Controller -> Service -> Repository -> Base de Datos). Muy productiva y estándar en la mayoría de proyectos corporativos.",
        "Hexagonal (Ports & Adapters): El DOMINIO se coloca en el centro absoluto y compila hacia adentro. No contiene ninguna anotación de framework (@Entity, @Table, @Service están prohibidas en el Core).",
        "Puertos de Entrada (Driver Ports): Interfaces Java puras que definen los casos de uso ofrecidos al exterior (ej: CreateTaskUseCase, BorrowBookUseCase).",
        "Puertos de Salida (Driven Ports): Interfaces Java puras que declaran lo que el dominio necesita del exterior (ej: TaskPersistencePort, NotificationPort).",
        "Adaptadores: Implementaciones técnicas que traducen protocolos externos (REST Controller, Spring Data JPA, adaptadores de mensajería)."
      ],
      "codigo": "// PUERTO DE ENTRADA (Contrato del Caso de Uso, sin dependencias externas)\npackage com.studio.taskmanager.domain.port.in;\n\npublic interface CreateTaskUseCase {\n    Task createTask(String title, String description, LocalDate dueDate);\n}\n\n// PUERTO DE SALIDA (Contrato de Persistencia que el Dominio declara)\npackage com.studio.taskmanager.domain.port.out;\n\npublic interface TaskPersistencePort {\n    Task save(Task task);\n    Optional<Task> findById(Long id);\n}\n\n// ADAPTADOR SECUNDARIO (Implementación JPA en la Capa de Infraestructura)\n@Component\npublic class JpaTaskAdapter implements TaskPersistencePort {\n    private final SpringDataTaskRepository jpaRepo;\n    // Traduce entre modelo de dominio puro y entidad relacional @Entity\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 6,
          "titulo": "Actividad 6: Capa Web (TaskController)",
          "explicacion": "Controlador REST anotado con @RestController para atender peticiones HTTP.",
          "codigo": "// Actividad 6: TaskController REST con Almacenamiento en Memoria\npackage com.studio.taskmanager.controller;\n\nimport com.studio.taskmanager.model.Task;\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.*;\n\n@RestController\n@RequestMapping(\"/api/v1/tasks\")\npublic class TaskController {\n    private final List<Task> taskList = new ArrayList<>();\n    private long currentId = 1L;\n\n    @GetMapping\n    public ResponseEntity<List<Task>> getAll() {\n        return ResponseEntity.ok(taskList);\n    }\n\n    @PostMapping\n    public ResponseEntity<Task> create(@RequestBody Task task) {\n        task.setId(currentId++);\n        taskList.add(task);\n        return ResponseEntity.status(HttpStatus.CREATED).body(task);\n    }\n\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Task> getById(@PathVariable Long id) {\n        for (Task t : taskList) {\n            if (t.getId().equals(id)) return ResponseEntity.ok(t);\n        }\n        return ResponseEntity.notFound().build();\n    }\n}"
        },
        {
          "actividadNum": 7,
          "titulo": "Actividad 7: Capa de Servicio (TaskServiceImpl)",
          "explicacion": "Desacopla la lógica de negocio de la capa de presentación HTTP.",
          "codigo": "// Actividad 7: TaskService y TaskServiceImpl (Separación de Negocio)\npackage com.studio.taskmanager.service;\n\nimport com.studio.taskmanager.model.Task;\nimport java.util.List;\n\npublic interface TaskService {\n    List<Task> findAll();\n    Task findById(Long id);\n    Task create(Task task);\n}\n\n@Service\npublic class TaskServiceImpl implements TaskService {\n    private final List<Task> tasks = new ArrayList<>();\n    private long seq = 1L;\n\n    @Override\n    public List<Task> findAll() {\n        return new ArrayList<>(tasks);\n    }\n\n    @Override\n    public Task findById(Long id) {\n        for (Task t : tasks) {\n            if (t.getId().equals(id)) return t;\n        }\n        return null;\n    }\n\n    @Override\n    public Task create(Task task) {\n        task.setId(seq++);\n        tasks.add(task);\n        return task;\n    }\n}"
        },
        {
          "actividadNum": 8,
          "titulo": "Actividad 8: Capa de Persistencia JPA (TaskRepository)",
          "explicacion": "Acceso a datos relacionales con interfaces Spring Data JPA.",
          "codigo": "// Actividad 8: Persistencia JPA y TaskRepository\npackage com.studio.taskmanager.entity;\n\nimport jakarta.persistence.*;\nimport java.time.LocalDate;\n\n@Entity\n@Table(name = \"tasks\")\npublic class Task {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 100)\n    private String title;\n\n    @Column(length = 500)\n    private String description;\n\n    @Column(nullable = false)\n    private boolean completed;\n\n    @Column(name = \"due_date\")\n    private LocalDate dueDate;\n    // Getters y setters...\n}\n\npackage com.studio.taskmanager.repository;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n}"
        }
      ]
    },
    {
      "id": "transaccionalidad",
      "numero": 3,
      "titulo": "3. Transaccionalidad ACID y Ciclo de Vida (@Transactional)",
      "categoria": "Transacciones ACID",
      "resumen": "Garantía de integridad de datos ACID en la capa de negocio y control del ciclo de vida.",
      "preguntaEvaluación": "¿Dónde debe residir @Transactional, qué excepciones provocan rollback por defecto y qué beneficio aporta readOnly = true?",
      "respuestaModelo": "El @Transactional debe residir exclusivamente en la Capa de Servicio (@Service), donde se orquestan múltiples operaciones que deben ser atómicas. Por defecto, Spring ejecuta un ROLLBACK automático únicamente ante RuntimeException y Error (excepciones no chequeadas). La directiva readOnly = true optimiza el rendimiento en operaciones de consulta GET al indicarle a Hibernate que desactive el 'dirty checking' (detección de cambios en memoria), reduciendo drásticamente el consumo de CPU y memoria.",
      "puntosClave": [
        "Propiedades ACID: Atomicidad (todo o nada), Consistencia (invariantes de BD válidas), Aislamiento (transacciones concurrentes no interfieren), Durabilidad (los commits sobreviven a caídas).",
        "Mecanismo de Spring: Spring envuelve el Bean en un Proxy dinámico (Spring AOP) que abre la transacción antes de entrar al método y ejecuta COMMIT al finalizar con éxito.",
        "Rollback selectivo: Si se desea rollback ante checked exceptions (Exception), se debe anotar con @Transactional(rollbackFor = Exception.class).",
        "¿Transacciones en el Dominio o en el Servicio? En el Servicio de Aplicación, porque las transacciones son una preocupación de persistencia y orquestación externa, no de la lógica pura del dominio."
      ],
      "codigo": "@Service\npublic class LoanServiceImpl implements LoanService {\n\n    // Transacción de lectura: sin dirty checking, máximo rendimiento\n    @Override\n    @Transactional(readOnly = true)\n    public LoanResponseDTO getLoanById(Long id) {\n        return loanRepository.findById(id)\n            .map(loanMapper::toResponseDTO)\n            .orElseThrow(() -> new ResourceNotFoundException(\"Préstamo no encontrado\"));\n    }\n\n    // Transacción de escritura atómica: si salta BookOutOfStockException hace ROLLBACK\n    @Override\n    @Transactional(rollbackFor = Exception.class)\n    public LoanResponseDTO createLoan(LoanRequestDTO request) {\n        Book book = bookRepository.findById(request.getBookId())\n            .orElseThrow(() -> new ResourceNotFoundException(\"Libro no existe\"));\n\n        if (book.getAvailableStock() <= 0) {\n            throw new BookOutOfStockException(\"Stock agotado\"); // Dispara rollback\n        }\n\n        book.setAvailableStock(book.getAvailableStock() - 1);\n        bookRepository.save(book);\n\n        Loan loan = new Loan(book, request.getUserId(), LocalDate.now(), LocalDate.now().plusDays(14));\n        return loanMapper.toResponseDTO(loanRepository.save(loan));\n    }\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 7,
          "titulo": "Actividad 7 & 12: Manejo de Transacciones en TaskService",
          "explicacion": "Apertura de transacción ACID y rollback automático ante excepciones de negocio.",
          "codigo": "// Actividad 7: TaskService y TaskServiceImpl (Separación de Negocio)\npackage com.studio.taskmanager.service;\n\nimport com.studio.taskmanager.model.Task;\nimport java.util.List;\n\npublic interface TaskService {\n    List<Task> findAll();\n    Task findById(Long id);\n    Task create(Task task);\n}\n\n@Service\npublic class TaskServiceImpl implements TaskService {\n    private final List<Task> tasks = new ArrayList<>();\n    private long seq = 1L;\n\n    @Override\n    public List<Task> findAll() {\n        return new ArrayList<>(tasks);\n    }\n\n    @Override\n    public Task findById(Long id) {\n        for (Task t : tasks) {\n            if (t.getId().equals(id)) return t;\n        }\n        return null;\n    }\n\n    @Override\n    public Task create(Task task) {\n        task.setId(seq++);\n        tasks.add(task);\n        return task;\n    }\n}"
        }
      ]
    },
    {
      "id": "jpa-hibernate-n1",
      "numero": 4,
      "titulo": "4. JPA, Hibernate, Caché y el Problema N+1",
      "categoria": "Persistencia Relacional",
      "resumen": "El motor de persistencia relacional, el contexto de persistencia y cómo evitar el cuello de botella N+1.",
      "preguntaEvaluación": "¿Qué es el problema de rendimiento N+1 en Hibernate, cómo se identifica y cuáles son las soluciones técnicas recomendadas?",
      "respuestaModelo": "El problema N+1 ocurre cuando, al consultar una colección de N entidades (ej: 100 libros), Hibernate ejecuta 1 consulta inicial para obtener los libros y luego dispara N consultas individuales adicionales para resolver una relación foránea con carga perezosa (LAZY) al acceder a cada autor, resultando en 101 consultas a la base de datos. Se soluciona forzando un JOIN FETCH en la consulta JPQL ('SELECT b FROM Book b JOIN FETCH b.author') o mediante la anotación @EntityGraph, resolviendo la consulta completa en un único viaje a la base de datos.",
      "puntosClave": [
        "JPA vs Hibernate vs Spring Data: JPA es la especificación estándar de Java (interfaces y anotaciones); Hibernate es el motor de implementación ORM físico; Spring Data JPA es una capa de abstracción que genera implementaciones de repositorios dinámicamente.",
        "Caché de Primer Nivel: Contexto de Persistencia (EntityManager) vinculado al hilo de la transacción activa. Evita consultar dos veces la misma entidad por ID durante la misma transacción.",
        "Carga LAZY vs EAGER: FetchType.LAZY carga la relación bajo demanda al invocar el getter; FetchType.EAGER la carga siempre mediante JOINs automáticos que pueden saturar la memoria.",
        "LazyInitializationException: Ocurre cuando se invoca un getter de una relación LAZY fuera del ámbito de una transacción activa (ej: en el Controller o en un serializador JSON)."
      ],
      "codigo": "@Repository\npublic interface BookRepository extends JpaRepository<Book, Long> {\n\n    // ANTIPATRÓN QUE CAUSA N+1:\n    // List<Book> findAll(); -> 1 SELECT para libros + N SELECTs para cada autor\n\n    // SOLUCIÓN OFICIAL 1: JPQL con JOIN FETCH (Una sola consulta SQL con JOIN)\n    @Query(\"SELECT b FROM Book b JOIN FETCH b.author JOIN FETCH b.category WHERE b.availableStock > 0\")\n    List<Book> findAllWithAuthorAndCategory();\n\n    // SOLUCIÓN OFICIAL 2: Anotación @EntityGraph sobre el repositorio\n    @EntityGraph(attributePaths = {\"author\", \"category\"})\n    List<Book> findByTitleContainingIgnoreCase(String keyword);\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 8,
          "titulo": "Actividad 8: Entidad JPA @Entity y TaskRepository",
          "explicacion": "Mapeo objeto-relacional (ORM) de la tabla \"tasks\" con clave primaria autogenerada.",
          "codigo": "// Actividad 8: Persistencia JPA y TaskRepository\npackage com.studio.taskmanager.entity;\n\nimport jakarta.persistence.*;\nimport java.time.LocalDate;\n\n@Entity\n@Table(name = \"tasks\")\npublic class Task {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 100)\n    private String title;\n\n    @Column(length = 500)\n    private String description;\n\n    @Column(nullable = false)\n    private boolean completed;\n\n    @Column(name = \"due_date\")\n    private LocalDate dueDate;\n    // Getters y setters...\n}\n\npackage com.studio.taskmanager.repository;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n}"
        },
        {
          "actividadNum": 9,
          "titulo": "Actividad 9: Derived Queries en TaskRepository",
          "explicacion": "Generación dinámica de consultas SQL (findByCompleted, findByTitleContainingIgnoreCase).",
          "codigo": "// Actividad 9: Derived Queries en TaskRepository\npackage com.studio.taskmanager.repository;\n\nimport com.studio.taskmanager.entity.Task;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\nimport java.util.List;\n\n@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n    // Derived Query: buscar por estado completado\n    List<Task> findByCompleted(boolean completed);\n\n    // Derived Query: buscar por coincidencia en el título ignorando mayúsculas\n    List<Task> findByTitleContainingIgnoreCase(String keyword);\n\n    // Comprobar existencia por título\n    boolean existsByTitleIgnoreCase(String title);\n}"
        }
      ]
    },
    {
      "id": "dto-validaciones",
      "numero": 5,
      "titulo": "5. Patrón DTO, Mappers Manuales y Bean Validation",
      "categoria": "Validaciones & DTO",
      "resumen": "Aislamiento de la interfaz pública y validación estricta de datos de entrada.",
      "preguntaEvaluación": "¿Por qué está estrictamente prohibido devolver entidades JPA en el Controller y por qué Java Backend Studio exige mappers manuales imperativos?",
      "respuestaModelo": "Devolver entidades JPA directamente al cliente exterior genera 3 riesgos graves: 1) Expone el modelo interno de base de datos y campos sensibles (contraseñas, auditoría); 2) Genera bucles infinitos de serialización JSON (StackOverflowError) por relaciones bidireccionales (@OneToMany <-> @ManyToOne); y 3) Acopla a los clientes con cambios en la persistencia. Java Backend Studio exige mappers manuales con bucles for clásicos (sin Streams) para garantizar predictibilidad total, evitar fallos opacos de librerías de reflexión y demostrar control riguroso de null-safety.",
      "puntosClave": [
        "Separación Request / Response: RequestDTO valida la entrada del cliente; ResponseDTO moldea la respuesta exacta requerida por la vista o contrato API.",
        "Bean Validation (@Valid): Anotaciones estándar (JSR-380) validadas en el DispatcherServlet antes de invocar el método del Controller (@NotBlank, @NotNull, @Size, @Min, @Email).",
        "Validadores Custom (@ValidStock): Validaciones de negocio a nivel de clase implementando ConstraintValidator para validar relaciones entre múltiples campos (ej: availableStock <= totalStock).",
        "GlobalExceptionHandler: Intercepta MethodArgumentNotValidException y traduce los errores a un mapa JSON limpio con los campos afectados y mensajes legibles."
      ],
      "codigo": "// Validador Personalizado a nivel de Clase para Library API\n@Target({ElementType.TYPE})\n@Retention(RetentionPolicy.RUNTIME)\n@Constraint(validatedBy = StockValidator.class)\npublic @interface ValidStock {\n    String message() default \"El stock disponible no puede superar al stock total ni ser negativo\";\n    Class<?>[] groups() default {};\n    Class<? extends Payload>[] payload() default {};\n}\n\npublic class StockValidator implements ConstraintValidator<ValidStock, BookRequestDTO> {\n    @Override\n    public boolean isValid(BookRequestDTO dto, ConstraintValidatorContext ctx) {\n        if (dto == null) return true;\n        if (dto.getAvailableStock() == null || dto.getTotalStock() == null) return true;\n        return dto.getAvailableStock() >= 0 && dto.getAvailableStock() <= dto.getTotalStock();\n    }\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 10,
          "titulo": "Actividad 10: TaskMapper Manual Imperativo (Sin Streams)",
          "explicacion": "Mapper manual con bucles for clásicos exigido por la rúbrica oficial.",
          "codigo": "// Actividad 10: DTOs y Mappers Manuales Imperativos (Sin Streams)\npackage com.studio.taskmanager.dto;\n\npublic class TaskRequestDTO {\n    private String title;\n    private String description;\n    private LocalDate dueDate;\n    // Getters y Setters...\n}\n\npublic class TaskResponseDTO {\n    private Long id;\n    private String title;\n    private boolean completed;\n    // Getters y Setters...\n}\n\npackage com.studio.taskmanager.mapper;\nimport org.springframework.stereotype.Component;\nimport java.util.*;\n\n@Component\npublic class TaskMapper {\n    public TaskResponseDTO toResponseDTO(Task entity) {\n        if (entity == null) return null;\n        TaskResponseDTO dto = new TaskResponseDTO();\n        dto.setId(entity.getId());\n        dto.setTitle(entity.getTitle());\n        dto.setCompleted(entity.isCompleted());\n        return dto;\n    }\n\n    // Mapper Manual con bucle for clásico (Rúbrica Oficial de Java Backend Studio)\n    public List<TaskResponseDTO> toResponseDTOList(List<Task> entities) {\n        List<TaskResponseDTO> dtos = new ArrayList<>();\n        if (entities != null) {\n            for (Task t : entities) {\n                dtos.add(toResponseDTO(t));\n            }\n        }\n        return dtos;\n    }\n}"
        },
        {
          "actividadNum": 11,
          "titulo": "Actividad 11: Bean Validation (@Valid, @NotBlank, @Size)",
          "explicacion": "Validación estricta de los campos de entrada en TaskRequestDTO antes de llegar al servicio.",
          "codigo": "// Actividad 11: Bean Validation (@Valid, @NotBlank, @Size)\npackage com.studio.taskmanager.dto;\n\nimport jakarta.validation.constraints.*;\nimport java.time.LocalDate;\n\npublic class TaskRequestDTO {\n    @NotBlank(message = \"El título de la tarea no puede estar vacío\")\n    @Size(min = 3, max = 100, message = \"El título debe tener entre 3 y 100 caracteres\")\n    private String title;\n\n    @Size(max = 500, message = \"La descripción no puede superar 500 caracteres\")\n    private String description;\n\n    @NotNull(message = \"La fecha límite es obligatoria\")\n    @FutureOrPresent(message = \"La fecha límite debe ser hoy o una fecha futura\")\n    private LocalDate dueDate;\n    // Getters y Setters...\n}"
        }
      ]
    },
    {
      "id": "seguridad-jwt",
      "numero": 6,
      "titulo": "6. Seguridad Stateless con Spring Security y JWT",
      "categoria": "Seguridad Stateless",
      "resumen": "Autenticación moderna basada en tokens para arquitecturas de microservicios y APIs REST.",
      "preguntaEvaluación": "¿Por qué en una API REST deshabilitamos CSRF y cómo valida el servidor un token JWT sin consultar la base de datos?",
      "respuestaModelo": "CSRF (Cross-Site Request Forgery) se deshabilita porque el servidor opera con SessionCreationPolicy.STATELESS: no almacena sesiones HTTP en memoria ni utiliza cookies automáticas del navegador. Las peticiones viajan con el header Authorization: Bearer <token>. El servidor valida el JWT comprobando criptográficamente su firma (HMAC-SHA256) con su clave secreta compartida y revisando la fecha de expiración contenida en los claims; si la firma coincide, el token es legítimo y se extraen los roles (ROLE_ADMIN, ROLE_USER) sin consultar la base de datos en cada petición.",
      "puntosClave": [
        "Autenticación vs Autorización: Autenticación verifica la identidad del usuario (¿Quién eres?); Autorización verifica si tiene permisos/roles para ejecutar el recurso (¿Puedes acceder?).",
        "Estructura de un JWT: Header (tipo y algoritmo) . Payload (claims: subject, roles, expiración) . Signature (hash HMAC-SHA256 con secret key).",
        "Filtro JwtAuthenticationFilter: Hereda de OncePerRequestFilter y se posiciona antes de UsernamePasswordAuthenticationFilter en la cadena de seguridad.",
        "SecurityFilterChain: Define las reglas de acceso con authorizeHttpRequests: endpoints públicos con permitAll(), endpoints restringidos con hasRole(\"ADMIN\")."
      ],
      "codigo": "@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n\n    private final JwtAuthenticationFilter jwtAuthFilter;\n\n    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {\n        this.jwtAuthFilter = jwtAuthFilter;\n    }\n\n    @Bean\n    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(AbstractHttpConfigurer::disable) // Deshabilitado en APIs Stateless\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/v1/auth/**\", \"/swagger-ui/**\", \"/v3/api-docs/**\").permitAll()\n                .requestMatchers(HttpMethod.DELETE, \"/api/v1/**\").hasRole(\"ADMIN\")\n                .requestMatchers(HttpMethod.POST, \"/api/v1/books/**\").hasRole(\"ADMIN\")\n                .requestMatchers(\"/api/v1/loans/**\").authenticated()\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)\n            .build();\n    }\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 15,
          "titulo": "Actividad 15: Configuración de Seguridad Stateless con JWT",
          "explicacion": "SecurityFilterChain con CSRF deshabilitado, sesiones STATELESS y filtro JwtAuthFilter.",
          "codigo": "// Actividad 15: Seguridad Stateless con JWT y Spring Security 6\npackage com.studio.taskmanager.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.http.HttpMethod;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;\nimport org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.web.SecurityFilterChain;\nimport org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;\n\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    private final JwtAuthenticationFilter jwtAuthFilter;\n\n    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {\n        this.jwtAuthFilter = jwtAuthFilter;\n    }\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(AbstractHttpConfigurer::disable)\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/v1/auth/**\", \"/swagger-ui/**\", \"/v3/api-docs/**\").permitAll()\n                .requestMatchers(HttpMethod.POST, \"/api/v1/tasks/**\").hasRole(\"ADMIN\")\n                .requestMatchers(HttpMethod.DELETE, \"/api/v1/tasks/**\").hasRole(\"ADMIN\")\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)\n            .build();\n    }\n}"
        }
      ]
    },
    {
      "id": "testing-mockito",
      "numero": 7,
      "titulo": "7. Testing Unitario con Mockito vs Pruebas de Integración",
      "categoria": "Testing & Calidad",
      "resumen": "Estrategias de verificación de calidad de software requeridas en la rúbrica oficial.",
      "preguntaEvaluación": "¿Cuál es la diferencia entre @Mock y @Spy en Mockito, y por qué las pruebas unitarias no deben usar @SpringBootTest?",
      "respuestaModelo": "Un @Mock es un objeto simulado vacío (dummy) donde todos los métodos devuelven valores por defecto (null, 0, false) a menos que se definan comportamientos explícitos con when(...).thenReturn(...); un @Spy envuelve una instancia real delegando en el código original salvo en los métodos específicamente mockeados. Las pruebas unitarias deben ejecutarse con @ExtendWith(MockitoExtension.class) para correr en milisegundos en memoria sin levantar Spring Boot, reservando @SpringBootTest para pruebas de integración pesadas que validan la interacción real con la base de datos y el contexto de Spring.",
      "puntosClave": [
        "Estructura AAA / Given-When-Then: Arrange (preparar datos y mocks), Act (ejecutar el método bajo prueba), Assert (comprobar el resultado y excepciones).",
        "verify(): Comprobación de comportamiento estricto en Mockito (ej: verify(taskRepo, times(1)).save(any())).",
        "Pruebas de Excepciones: Uso de assertThrows(ResourceNotFoundException.class, () -> service.getById(99L)).",
        "@Mock vs @InjectMocks: @Mock crea los dobles simulados de las dependencias; @InjectMocks crea la instancia real de la clase que estamos testeando e inyecta los mocks creados."
      ],
      "codigo": "@ExtendWith(MockitoExtension.class)\nclass TaskServiceImplTest {\n\n    @Mock\n    private TaskRepository taskRepository;\n\n    @Mock\n    private TaskMapper taskMapper;\n\n    @InjectMocks\n    private TaskServiceImpl taskService;\n\n    @Test\n    void whenTaskNotFound_thenThrowResourceNotFoundException() {\n        // Arrange\n        when(taskRepository.findById(99L)).thenReturn(Optional.empty());\n\n        // Act & Assert\n        assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(99L));\n        verify(taskRepository, times(1)).findById(99L);\n        verifyNoInteractions(taskMapper); // Verifica que el mapper nunca llegó a ejecutarse\n    }\n}",
      "actividadesVinculadas": [
        {
          "actividadNum": 14,
          "titulo": "Actividad 14: Pruebas Unitarias con Mockito (verify & assertThrows)",
          "explicacion": "Test de TaskServiceImplTest aislando el repositorio con @Mock y verificando llamadas.",
          "codigo": "// Actividad 14: Pruebas Unitarias con Mockito (JUnit 5 & verify)\npackage com.studio.taskmanager.service;\n\nimport com.studio.taskmanager.entity.Task;\nimport com.studio.taskmanager.exception.ResourceNotFoundException;\nimport com.studio.taskmanager.mapper.TaskMapper;\nimport com.studio.taskmanager.repository.TaskRepository;\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\nimport java.util.Optional;\nimport static org.junit.jupiter.api.Assertions.*;\nimport static org.mockito.Mockito.*;\n\n@ExtendWith(MockitoExtension.class)\nclass TaskServiceImplTest {\n    @Mock\n    private TaskRepository taskRepository;\n\n    @Mock\n    private TaskMapper taskMapper;\n\n    @InjectMocks\n    private TaskServiceImpl taskService;\n\n    @Test\n    void whenTaskNotFound_thenThrowException() {\n        when(taskRepository.findById(99L)).thenReturn(Optional.empty());\n\n        assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(99L));\n        verify(taskRepository, times(1)).findById(99L);\n        verifyNoInteractions(taskMapper);\n    }\n}"
        }
      ]
    }
  ],
  "frikadasIsra": [
    {
      "numero": 1,
      "titulo": "Regla de Oro: ¡Las dependencias solo bajan, nunca suben!",
      "categoria": "Arquitectura & Gravedad de Software",
      "tutoria": "Apunte 1",
      "icono": "",
      "explicacion": "En una arquitectura por capas existe una \"fuerza de gravedad\": Presentación conoce a Negocio, Negocio conoce a Datos, pero Datos NUNCA debe saber que existe el Negocio, y el Negocio JAMÁS debe importar paquetes HTTP (HttpServletRequest o ResponseEntity). Si la capa de datos llama a la de negocio, has creado un acoplamiento circular que destruye la mantenibilidad."
    },
    {
      "numero": 2,
      "titulo": "El Dominio debe estar libre del \"pecado\" de Spring",
      "categoria": "Arquitectura Hexagonal (Ports & Adapters)",
      "tutoria": "Apunte 2",
      "icono": "",
      "explicacion": "En arquitectura hexagonal pura, la carpeta \"domain\" no debe tener NI UNA SOLA anotación de Spring ni de Hibernate (@Entity, @Table, @Service son ilegales en el dominio). El dominio son clases Java puras (POJOs). Los frameworks son herramientas desechables; tu lógica de negocio es el activo real de tu cliente."
    },
    {
      "numero": 3,
      "titulo": "El peligro mortal de @Data de Lombok en Entidades JPA",
      "categoria": "JPA & Trampas Ocultas",
      "tutoria": "Apunte 3",
      "icono": "",
      "explicacion": "@Data genera automáticamente toString(), equals() y hashCode() sobre TODOS los campos. Si tienes una relación bidireccional (@OneToMany libros <-> autor), al llamar a toString() o meter una entidad en un HashSet se produce un bucle recursivo infinito que desborda la pila (StackOverflowError). En entidades JPA solo se debe usar @Getter, @Setter y generar equals/hashCode manualmente basados en la clave de negocio o ID."
    },
    {
      "numero": 4,
      "titulo": "LazyInitializationException: El fantasma fuera de la transacción",
      "categoria": "Persistencia & Hibernate",
      "tutoria": "Apunte 4",
      "icono": "",
      "explicacion": "Si una relación es FetchType.LAZY y el método del Service termina, la sesión de Hibernate se cierra. Si luego en el Controller o en el Mapper intentas hacer \"libro.getAutor().getNombre()\", ¡BOOM! LazyInitializationException: could not initialize proxy - no Session. Solución de Isra: Haz JOIN FETCH en la consulta JPQL o asegura que el mapeo DTO se ejecute dentro del ámbito @Transactional del servicio."
    },
    {
      "numero": 5,
      "titulo": "Mappers manuales sin Streams: El test del desarrollador real",
      "categoria": "Calidad de Código & Rúbricas",
      "tutoria": "Apunte 5",
      "icono": "",
      "explicacion": "Muchos desarrolladores abusan de .stream().map(...).collect() sin entender qué pasa por debajo ni validar nulos. En las entrevistas y rúbricas de Java Backend Studio te piden mappers con bucles for clásicos para comprobar si dominas el control de flujo imperativo, la prevención de NullPointerException y la legibilidad sin magia sintáctica."
    },
    {
      "numero": 6,
      "titulo": "401 Unauthorized vs 403 Forbidden vs 409 Conflict",
      "categoria": "Protocolo HTTP Semántico",
      "tutoria": "Apunte 6",
      "icono": "",
      "explicacion": "401 en realidad significa \"Unauthenticated\": No sé quién eres porque no me has enviado el token JWT o está caducado. 403 Forbidden significa \"Te conozco, sé quién eres, pero tu rol (ej: ROLE_USER) no tiene permiso para borrar este libro\". Y 409 Conflict es el código perfecto cuando la petición es válida pero choca con el estado de la base de datos (por ejemplo, intentar prestar un libro con stock = 0)."
    },
    {
      "numero": 7,
      "titulo": "Levantar @SpringBootTest para un test unitario es un pecado de lentitud",
      "categoria": "Testing & Rendimiento",
      "tutoria": "Apunte 7",
      "icono": "",
      "explicacion": "Arrancar el contexto entero de Spring Boot (@SpringBootTest) tarda entre 4 y 15 segundos por test. Si tienes 500 tests, tu pipeline de despliegue tarda 2 horas. Con Mockito puro (@ExtendWith(MockitoExtension.class)) las pruebas unitarias se ejecutan en 10 milisegundos. Reserva @SpringBootTest exclusivamente para pruebas de integración de punta a punta."
    },
    {
      "numero": 8,
      "titulo": "Docker Multi-Stage: Compilar dentro del contenedor o morir en local",
      "categoria": "DevOps & Contenedores",
      "tutoria": "Apunte 8",
      "icono": "",
      "explicacion": "Si compilas el .jar en tu Mac con tu versión local de Java y luego solo copias el .jar en un Dockerfile simple, no es un despliegue reproducible (\"en mi máquina funciona\"). Con Multi-Stage Build, la primera etapa usa una imagen oficial de Maven para descargar librerías y compilar; la segunda etapa solo toma el binario generado y lo mete en un Alpine JRE ligero de 150MB. ¡Inmutabilidad total!"
    },
    {
      "numero": 9,
      "titulo": "Validación a Nivel de Clase (@ValidStock) para Reglas Multicampo",
      "categoria": "Validación Avanzada & Bean Validation",
      "tutoria": "Apunte 9",
      "icono": "",
      "explicacion": "Las anotaciones estándar como @NotNull o @Min solo validan un atributo aislado. Cuando una regla de negocio vincula dos campos del mismo objeto (por ejemplo, comprobar que availableStock <= totalStock), la validación debe realizarse a nivel de clase implementando un ConstraintValidator<ValidStock, BookRequestDto>. Esto garantiza que los payloads incoherentes se rechacen inmediatamente con HTTP 400 Bad Request antes de que lleguen a la capa de servicio o toquen la base de datos."
    },
    {
      "numero": 10,
      "titulo": "Desacoplamiento de DTOs con IDs Planos (categoryId y authorIds)",
      "categoria": "Diseño de DTOs & Contrato REST",
      "tutoria": "Apunte 10",
      "icono": "",
      "explicacion": "En lugar de recibir objetos anidados complejos en BookRequestDto para la categoría o los autores, la mejor práctica es recibir identificadores planos (Long categoryId y List<Long> authorIds). Esto desacopla al cliente de las entidades relacionales internas de JPA, evita problemas de cascadas no deseadas (CascadeType), simplifica el JSON enviado por el cliente y delega en el servicio la recuperación segura de las referencias reales."
    },
    {
      "numero": 11,
      "titulo": "Cálculo Dinámico de Estados (OVERDUE) en Mappers vs Tareas Programadas (@Scheduled)",
      "categoria": "Lógica de Negocio & Mappers",
      "tutoria": "Apunte 11",
      "icono": "",
      "explicacion": "Para calcular si un préstamo está fuera de plazo (OVERDUE), no es necesario implementar crons ni procesos en segundo plano con @Scheduled que saturen la CPU recalculando registros. La solución más limpia y eficiente es calcularlo al vuelo dentro de LoanMapper: si el estado persistido es ACTIVE y la fecha límite (dueDate) es anterior a LocalDate.now(), el mapper proyecta el DTO con estado OVERDUE sin coste de base de datos."
    },
    {
      "numero": 12,
      "titulo": "Dockerfile Seguro para Producción: Usuario No-Root y Tuning de Memoria Heap",
      "categoria": "DevOps & Contenedores",
      "tutoria": "Apunte 12",
      "icono": "",
      "explicacion": "En entornos productivos, un contenedor Docker jamás debe ejecutarse como usuario root. En el Dockerfile se añade RUN addgroup -S appgroup && adduser -S appuser -G appgroup seguido de USER appuser para mitigar vectores de escape del contenedor. Además, fijar ENV JAVA_OPTS=\"-Xms256m -Xmx512m\" previene que la JVM devore la memoria del host o sea eliminada súbitamente por el OOM Killer del sistema operativo."
    },
    {
      "numero": 13,
      "titulo": "Estrategia Dual de Base de Datos: H2 en Memoria (Desarrollo) vs MySQL (Producción)",
      "categoria": "Persistencia & Perfiles Spring",
      "tutoria": "Apunte 13",
      "icono": "",
      "explicacion": "Durante el desarrollo de la API de biblioteca, H2 en memoria (jdbc:h2:mem:librarydb) permite arrancar la aplicación en solo 2.2 segundos y probar endpoints sin dependencias de red ni credenciales externas. Para desplegar en entornos reales con Docker o Kubernetes, basta con activar el perfil con MySQL y ddl-auto=validate, asegurando que el esquema relacional sea gestionado mediante scripts SQL inmutables (init.sql)."
    }
  ],
  "actividades": [
    {
      "numero": 1,
      "titulo": "Spring Framework — Uso de IoC (Inversión de Control)",
      "bloque": "Fundamentos Spring",
      "rama": "01-uso-de-ioc",
      "proyecto": "JavaSpringIoC",
      "descripcion": "Comprender el funcionamiento del Contenedor de Inversión de Control (IoC Container) de Spring instanciando Beans definidos mediante un archivo XML (applicationContext.xml) sin recurrir al operador new en la lógica de negocio.",
      "conceptosClave": [
        "IoC Container",
        "ClassPathXmlApplicationContext",
        "Beans XML",
        "getBean()",
        "Desacoplamiento"
      ],
      "rubrica": [
        "Crear interfaz y clase de implementación concreta.",
        "Definir applicationContext.xml con etiquetas <bean id=\"...\" class=\"...\">.",
        "Cargar el ApplicationContext en la clase Main.",
        "Invocar getBean() y comprobar el funcionamiento sin instanciación manual."
      ],
      "errorComun": "Ruta incorrecta del XML de configuración o no cerrar el ApplicationContext liberando recursos.",
      "preguntaDefensa": "¿Por qué la Inversión de Control facilita las pruebas unitarias frente al acoplamiento con \"new\"?",
      "codigoResuelto": "<!-- applicationContext.xml (Actividad 1: IoC en XML) -->\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<beans xmlns=\"http://www.springframework.org/schema/beans\"\n       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n       xsi:schemaLocation=\"http://www.springframework.org/schema/beans\n       http://www.springframework.org/schema/beans/spring-beans.xsd\">\n\n    <!-- Definición del Bean en el contenedor IoC -->\n    <bean id=\"greetingService\" class=\"com.studio.ioc.GreetingServiceImpl\">\n        <property name=\"prefix\" value=\"¡Bienvenida al Bootcamp de Java Backend Studio!\"/>\n    </bean>\n</beans>\n\n// MainApp.java: Recuperación del Bean sin \"new\"\nApplicationContext context = new ClassPathXmlApplicationContext(\"applicationContext.xml\");\nGreetingService service = context.getBean(\"greetingService\", GreetingService.class);\nservice.greet(\"Blanca\");\n((ClassPathXmlApplicationContext) context).close();"
    },
    {
      "numero": 2,
      "titulo": "Spring Framework — Uso de IoD (Inyección de Dependencias)",
      "bloque": "Fundamentos Spring",
      "rama": "02-uso-de-iod",
      "proyecto": "JavaSpringIoD",
      "descripcion": "Implementar los distintos mecanismos de inyección de dependencias (por constructor y por métodos setter) mediante XML en Spring, entendiendo cómo el contenedor ensambla objetos colaboradores.",
      "conceptosClave": [
        "Inyección por Constructor (<constructor-arg>)",
        "Inyección por Setter (<property>)",
        "Colaboradores entre Beans"
      ],
      "rubrica": [
        "Definir Bean dependiente y Bean inyectado.",
        "Configurar inyección por constructor.",
        "Configurar inyección por setter.",
        "Verificar el flujo de ejecución completo desde el Main."
      ],
      "errorComun": "Falta de constructor por defecto al usar inyección por setter o tipos de datos incompatibles en <constructor-arg>.",
      "preguntaDefensa": "¿Cuándo es preferible inyectar por constructor frente a inyectar por setter?",
      "codigoResuelto": "<!-- applicationContext.xml (Actividad 2: Inyección por Constructor y Setter) -->\n<beans xmlns=\"http://www.springframework.org/schema/beans\" ...>\n\n    <bean id=\"printerService\" class=\"com.studio.iod.ConsolePrinterService\" />\n\n    <!-- Inyección por Constructor (<constructor-arg>) -->\n    <bean id=\"reportServiceConstructor\" class=\"com.studio.iod.ReportService\">\n        <constructor-arg ref=\"printerService\" />\n    </bean>\n\n    <!-- Inyección por Setter (<property>) -->\n    <bean id=\"reportServiceSetter\" class=\"com.studio.iod.ReportService\">\n        <property name=\"printer\" ref=\"printerService\" />\n    </bean>\n</beans>"
    },
    {
      "numero": 3,
      "titulo": "Spring Framework — Uso de Java Annotations",
      "bloque": "Fundamentos Spring",
      "rama": "03-uso-de-java-annotations",
      "proyecto": "JavaSpringAnnotations",
      "descripcion": "Sustituir la configuración explícita en XML por el escaneo automático de componentes con anotaciones estándar de Spring (@Component, @Autowired, @Qualifier, @Value, @Scope).",
      "conceptosClave": [
        "@Component",
        "@Autowired",
        "@Qualifier",
        "@Value",
        "@Scope(\"singleton\"/\"prototype\")",
        "<context:component-scan>"
      ],
      "rubrica": [
        "Activar component-scan apuntando al paquete base.",
        "Anotar clases con @Component.",
        "Inyectar dependencias con @Autowired.",
        "Resolver ambigüedad de múltiples implementaciones con @Qualifier."
      ],
      "errorComun": "Tener dos beans que implementan la misma interfaz sin usar @Qualifier o @Primary, causando NoUniqueBeanDefinitionException.",
      "preguntaDefensa": "¿Qué ocurre si dos clases implementan la misma interfaz y se inyectan con @Autowired sin @Qualifier?",
      "codigoResuelto": "// Actividad 3: Uso de Java Annotations (@Component, @Autowired, @Qualifier)\npackage com.studio.annotations;\n\nimport org.springframework.stereotype.Component;\n\npublic interface NotificationService {\n    void sendNotification(String message);\n}\n\n@Component(\"emailNotification\")\npublic class EmailNotificationService implements NotificationService {\n    @Override\n    public void sendNotification(String message) {\n        System.out.println(\"Email enviado: \" + message);\n    }\n}\n\n@Component\npublic class TaskNotifier {\n    private final NotificationService notificationService;\n\n    // Uso de @Autowired y @Qualifier para resolver ambigüedad\n    public TaskNotifier(@Qualifier(\"emailNotification\") NotificationService notificationService) {\n        this.notificationService = notificationService;\n    }\n\n    public void alertUser(String msg) {\n        notificationService.sendNotification(msg);\n    }\n}"
    },
    {
      "numero": 4,
      "titulo": "Spring Framework — Distintas Configuraciones en Spring",
      "bloque": "Fundamentos Spring",
      "rama": "04-distintas-configuraciones",
      "proyecto": "JavaSpringConfig",
      "descripcion": "Aprender la configuración pura en Java (JavaConfig) con @Configuration y @Bean, eliminando por completo los archivos XML, y gestionar propiedades externas con @PropertySource.",
      "conceptosClave": [
        "@Configuration",
        "@Bean",
        "AnnotationConfigApplicationContext",
        "@PropertySource",
        "Perfiles de Configuración"
      ],
      "rubrica": [
        "Crear clase anotada con @Configuration.",
        "Definir métodos anotados con @Bean.",
        "Instanciar AnnotationConfigApplicationContext.",
        "Inyectar valores desde archivo .properties con @Value."
      ],
      "errorComun": "Olvidar el prefijo ${...} en las expresiones de @Value o no registrar PropertySourcesPlaceholderConfigurer.",
      "preguntaDefensa": "¿Qué ventaja tiene la configuración JavaConfig (@Configuration) frente a la basada en XML respecto al chequeo de tipos en compilación?",
      "codigoResuelto": "// Actividad 4: Configuración pura Java (@Configuration y @Bean)\npackage com.studio.config;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.context.annotation.PropertySource;\nimport org.springframework.beans.factory.annotation.Value;\n\n@Configuration\n@PropertySource(\"classpath:application.properties\")\npublic class AppConfig {\n\n    @Value(\"${app.max-tasks:100}\")\n    private int maxTasks;\n\n    @Bean\n    public TaskLimits taskLimits() {\n        return new TaskLimits(maxTasks);\n    }\n}"
    },
    {
      "numero": 5,
      "titulo": "Spring Boot — Preparación del Entorno (taskmanager)",
      "bloque": "Spring Boot Core",
      "rama": "05-preparacion-del-entorno",
      "proyecto": "taskmanager",
      "descripcion": "Iniciar el proyecto central taskmanager mediante Spring Initializr. Comprender la estructura de directorios Maven, los starters (spring-boot-starter-web), la anotación @SpringBootApplication y el archivo application.properties.",
      "conceptosClave": [
        "Spring Initializr",
        "Starters",
        "application.properties",
        "@SpringBootApplication",
        "Embedded Tomcat"
      ],
      "rubrica": [
        "Generar proyecto con dependencias web y devtools.",
        "Configurar puerto del servidor (server.port=8080) y banner.",
        "Ejecutar con éxito SpringApplication.run().",
        "Verificar el arranque del servidor embebido en los logs de consola."
      ],
      "errorComun": "Incompatibilidades de versión entre el plugin de Maven de Spring Boot y la versión instalada de Java (JDK 17 vs JDK 21).",
      "preguntaDefensa": "¿Qué tres anotaciones combina internamente @SpringBootApplication?",
      "codigoResuelto": "// Actividad 5: Modelo de Tarea Inicial (Task.java) y Configuración\npackage com.studio.taskmanager.model;\n\nimport java.time.LocalDate;\n\npublic class Task {\n    private Long id;\n    private String title;\n    private String description;\n    private boolean completed;\n    private LocalDate dueDate;\n\n    public Task() {}\n\n    public Task(Long id, String title, String description, boolean completed, LocalDate dueDate) {\n        this.id = id;\n        this.title = title;\n        this.description = description;\n        this.completed = completed;\n        this.dueDate = dueDate;\n    }\n\n    // Getters y Setters...\n    public Long getId() { return id; }\n    public void setId(Long id) { this.id = id; }\n    public String getTitle() { return title; }\n    public void setTitle(String title) { this.title = title; }\n    public boolean isCompleted() { return completed; }\n    public void setCompleted(boolean completed) { this.completed = completed; }\n}"
    },
    {
      "numero": 6,
      "titulo": "Spring Boot — Creación del Controller REST",
      "bloque": "Spring Boot Core",
      "rama": "06-creacion-del-controller",
      "proyecto": "taskmanager",
      "descripcion": "Desarrollar un controlador REST completo con operaciones CRUD sobre tareas almacenadas en memoria (colección List<Task>), respondiendo con objetos JSON y códigos de estado semánticos con ResponseEntity.",
      "conceptosClave": [
        "@RestController",
        "@RequestMapping",
        "@GetMapping",
        "@PostMapping",
        "@PutMapping",
        "@DeleteMapping",
        "ResponseEntity",
        "@PathVariable",
        "@RequestBody"
      ],
      "rubrica": [
        "Crear modelo Task con atributos id, title, description, completed.",
        "Crear TaskController con mapeo base /api/v1/tasks.",
        "Implementar endpoints GET (listar y por ID), POST (crear), PUT (editar) y DELETE (eliminar).",
        "Validar respuestas semánticas en Postman/cURL (200, 201, 204, 404)."
      ],
      "errorComun": "Retornar siempre HTTP 200 incluso cuando el recurso solicitado por ID no existe en la colección.",
      "preguntaDefensa": "¿Cuál es la diferencia entre @Controller y @RestController en Spring?",
      "codigoResuelto": "// Actividad 6: TaskController REST con Almacenamiento en Memoria\npackage com.studio.taskmanager.controller;\n\nimport com.studio.taskmanager.model.Task;\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.*;\n\n@RestController\n@RequestMapping(\"/api/v1/tasks\")\npublic class TaskController {\n    private final List<Task> taskList = new ArrayList<>();\n    private long currentId = 1L;\n\n    @GetMapping\n    public ResponseEntity<List<Task>> getAll() {\n        return ResponseEntity.ok(taskList);\n    }\n\n    @PostMapping\n    public ResponseEntity<Task> create(@RequestBody Task task) {\n        task.setId(currentId++);\n        taskList.add(task);\n        return ResponseEntity.status(HttpStatus.CREATED).body(task);\n    }\n\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Task> getById(@PathVariable Long id) {\n        for (Task t : taskList) {\n            if (t.getId().equals(id)) return ResponseEntity.ok(t);\n        }\n        return ResponseEntity.notFound().build();\n    }\n}"
    },
    {
      "numero": 7,
      "titulo": "Spring Boot — Creación de la Capa de Servicio",
      "bloque": "Spring Boot Core",
      "rama": "07-creacion-de-la-capa-de-servicio",
      "proyecto": "taskmanager",
      "descripcion": "Refactorizar el controlador extrayendo toda la lógica de negocio y almacenamiento hacia una capa de servicio desacoplada (TaskService + TaskServiceImpl), evitando el antipatrón de fat controller.",
      "conceptosClave": [
        "@Service",
        "Separación de Responsabilidades (SoC)",
        "Inyección por Constructor",
        "Principio de Inversión de Dependencias (DIP)"
      ],
      "rubrica": [
        "Definir interfaz TaskService con los métodos del contrato.",
        "Crear implementación TaskServiceImpl anotada con @Service.",
        "Inyectar TaskService en TaskController mediante constructor.",
        "Asegurar que el controlador únicamente orquesta llamadas HTTP."
      ],
      "errorComun": "Inyectar mediante @Autowired en el campo (Field Injection) en lugar de usar inyección por constructor.",
      "preguntaDefensa": "¿Por qué la inyección por constructor es considerada la mejor práctica en Spring moderno frente a la inyección en campos?",
      "codigoResuelto": "// Actividad 7: TaskService y TaskServiceImpl (Separación de Negocio)\npackage com.studio.taskmanager.service;\n\nimport com.studio.taskmanager.model.Task;\nimport java.util.List;\n\npublic interface TaskService {\n    List<Task> findAll();\n    Task findById(Long id);\n    Task create(Task task);\n}\n\n@Service\npublic class TaskServiceImpl implements TaskService {\n    private final List<Task> tasks = new ArrayList<>();\n    private long seq = 1L;\n\n    @Override\n    public List<Task> findAll() {\n        return new ArrayList<>(tasks);\n    }\n\n    @Override\n    public Task findById(Long id) {\n        for (Task t : tasks) {\n            if (t.getId().equals(id)) return t;\n        }\n        return null;\n    }\n\n    @Override\n    public Task create(Task task) {\n        task.setId(seq++);\n        tasks.add(task);\n        return task;\n    }\n}"
    },
    {
      "numero": 8,
      "titulo": "Spring Boot — Introducción a JPA y Modelado de Entidades",
      "bloque": "Persistencia JPA",
      "rama": "08-introduccion-a-jpa",
      "proyecto": "taskmanager",
      "descripcion": "Reemplazar las listas en memoria por la persistencia relacional con JPA / Hibernate. Configurar la base de datos H2 en memoria y modelar entidades con relaciones @ManyToOne y @OneToMany.",
      "conceptosClave": [
        "JPA / Hibernate",
        "@Entity",
        "@Table",
        "@Id",
        "@GeneratedValue",
        "@Column",
        "H2 In-Memory DB",
        "Relaciones (@ManyToOne)"
      ],
      "rubrica": [
        "Añadir dependencias spring-boot-starter-data-jpa y h2.",
        "Configurar datasource H2 y consola web en application.properties.",
        "Anotar clase Task con @Entity y definir clave primaria.",
        "Crear entidad Category y relacionarla con Task (@ManyToOne)."
      ],
      "errorComun": "Olvidar el constructor por defecto sin argumentos requerido por la especificación JPA para instanciación por reflexión.",
      "preguntaDefensa": "¿Qué función cumple la propiedad ddl-auto=update de Hibernate y por qué no debe usarse en entornos de producción?",
      "codigoResuelto": "// Actividad 8: Persistencia JPA y TaskRepository\npackage com.studio.taskmanager.entity;\n\nimport jakarta.persistence.*;\nimport java.time.LocalDate;\n\n@Entity\n@Table(name = \"tasks\")\npublic class Task {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 100)\n    private String title;\n\n    @Column(length = 500)\n    private String description;\n\n    @Column(nullable = false)\n    private boolean completed;\n\n    @Column(name = \"due_date\")\n    private LocalDate dueDate;\n    // Getters y setters...\n}\n\npackage com.studio.taskmanager.repository;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n}"
    },
    {
      "numero": 9,
      "titulo": "Spring Boot — Uso de Spring Data JPA",
      "bloque": "Persistencia JPA",
      "rama": "09-uso-de-spring-data-jpa",
      "proyecto": "taskmanager",
      "descripcion": "Implementar interfaces de repositorio que extienden JpaRepository<T, ID>, eliminando el código boilerplate de acceso a datos y aprovechando Derived Query Methods y JPQL.",
      "conceptosClave": [
        "JpaRepository",
        "Derived Query Methods",
        "JPQL (@Query)",
        "Optional<T>",
        "@Transactional"
      ],
      "rubrica": [
        "Crear TaskRepository extendiendo JpaRepository<Task, Long>.",
        "Implementar métodos personalizados de búsqueda (findByCompleted, findByTitleContaining).",
        "Refactorizar TaskServiceImpl para persistir mediante el repositorio.",
        "Gestionar retornos con Optional.orElseThrow()."
      ],
      "errorComun": "Escribir nombres erróneos en Derived Queries (ej: findByTitul en vez de findByTitle) que provocan fallos de arranque del contexto.",
      "preguntaDefensa": "¿Cómo infiere Spring Data JPA las consultas SQL subyacentes a partir del nombre del método en la interfaz?",
      "codigoResuelto": "// Actividad 9: Derived Queries en TaskRepository\npackage com.studio.taskmanager.repository;\n\nimport com.studio.taskmanager.entity.Task;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\nimport java.util.List;\n\n@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n    // Derived Query: buscar por estado completado\n    List<Task> findByCompleted(boolean completed);\n\n    // Derived Query: buscar por coincidencia en el título ignorando mayúsculas\n    List<Task> findByTitleContainingIgnoreCase(String keyword);\n\n    // Comprobar existencia por título\n    boolean existsByTitleIgnoreCase(String title);\n}"
    },
    {
      "numero": 10,
      "titulo": "Spring Boot — Creación de los DTOs y Mappers",
      "bloque": "Robustez & Calidad",
      "rama": "10-creacion-de-dtos-y-mappers",
      "proyecto": "taskmanager",
      "descripcion": "Implementar el patrón Data Transfer Object (DTO) para desacoplar la API de las entidades de base de datos. Crear mappers manuales imperativos (cumpliendo la restricción oficial de no usar Streams/Lambdas).",
      "conceptosClave": [
        "Patrón DTO",
        "TaskRequestDTO",
        "TaskResponseDTO",
        "Mapper Manual Imperativo (bucles clásicos)",
        "Desacoplamiento"
      ],
      "rubrica": [
        "Crear clases DTO específicas para Request y Response.",
        "Implementar TaskMapper con métodos manuales (usando bucles for clásicos).",
        "Asegurar que el Controller no recibe ni expone Entidades JPA.",
        "Actualizar los tests y endpoints para operar con DTOs."
      ],
      "errorComun": "Exponer el objeto Entidad JPA anidado en el ResponseDTO provocando referencias cíclicas infinitas.",
      "preguntaDefensa": "¿Por qué la rúbrica oficial exige en ocasiones mappers imperativos con bucles clásicos en lugar de streams y lambdas?",
      "codigoResuelto": "// Actividad 10: DTOs y Mappers Manuales Imperativos (Sin Streams)\npackage com.studio.taskmanager.dto;\n\npublic class TaskRequestDTO {\n    private String title;\n    private String description;\n    private LocalDate dueDate;\n    // Getters y Setters...\n}\n\npublic class TaskResponseDTO {\n    private Long id;\n    private String title;\n    private boolean completed;\n    // Getters y Setters...\n}\n\npackage com.studio.taskmanager.mapper;\nimport org.springframework.stereotype.Component;\nimport java.util.*;\n\n@Component\npublic class TaskMapper {\n    public TaskResponseDTO toResponseDTO(Task entity) {\n        if (entity == null) return null;\n        TaskResponseDTO dto = new TaskResponseDTO();\n        dto.setId(entity.getId());\n        dto.setTitle(entity.getTitle());\n        dto.setCompleted(entity.isCompleted());\n        return dto;\n    }\n\n    // Mapper Manual con bucle for clásico (Rúbrica Oficial de Java Backend Studio)\n    public List<TaskResponseDTO> toResponseDTOList(List<Task> entities) {\n        List<TaskResponseDTO> dtos = new ArrayList<>();\n        if (entities != null) {\n            for (Task t : entities) {\n                dtos.add(toResponseDTO(t));\n            }\n        }\n        return dtos;\n    }\n}"
    },
    {
      "numero": 11,
      "titulo": "Spring Boot — Uso de Validaciones (Bean Validation)",
      "bloque": "Robustez & Calidad",
      "rama": "11-uso-de-validaciones",
      "proyecto": "taskmanager",
      "descripcion": "Garantizar la integridad de los datos entrantes mediante anotaciones de Bean Validation (@Valid, @NotBlank, @Size, @Min, @NotNull) y crear validadores personalizados a nivel de clase.",
      "conceptosClave": [
        "spring-boot-starter-validation",
        "@Valid",
        "@NotBlank",
        "@Size",
        "ConstraintValidator",
        "Validador a nivel de clase"
      ],
      "rubrica": [
        "Anotar campos del RequestDTO con validaciones semánticas.",
        "Anotar @Valid en el @RequestBody de los métodos del Controller.",
        "Implementar validador personalizado (ej: comprobación de stock o coherencia de fechas).",
        "Verificar que peticiones con datos erróneos devuelven HTTP 400 Bad Request."
      ],
      "errorComun": "Olvidar la anotación @Valid en el controlador, lo que hace que Spring ignore por completo las anotaciones de validación del DTO.",
      "preguntaDefensa": "¿Cómo se implementa un validador personalizado a nivel de clase para validar dos campos relacionados entre sí?",
      "codigoResuelto": "// Actividad 11: Bean Validation (@Valid, @NotBlank, @Size)\npackage com.studio.taskmanager.dto;\n\nimport jakarta.validation.constraints.*;\nimport java.time.LocalDate;\n\npublic class TaskRequestDTO {\n    @NotBlank(message = \"El título de la tarea no puede estar vacío\")\n    @Size(min = 3, max = 100, message = \"El título debe tener entre 3 y 100 caracteres\")\n    private String title;\n\n    @Size(max = 500, message = \"La descripción no puede superar 500 caracteres\")\n    private String description;\n\n    @NotNull(message = \"La fecha límite es obligatoria\")\n    @FutureOrPresent(message = \"La fecha límite debe ser hoy o una fecha futura\")\n    private LocalDate dueDate;\n    // Getters y Setters...\n}"
    },
    {
      "numero": 12,
      "titulo": "Spring Boot — Manejo Global de Errores (@RestControllerAdvice)",
      "bloque": "Robustez & Calidad",
      "rama": "12-manejo-de-errores",
      "proyecto": "taskmanager",
      "descripcion": "Centralizar el tratamiento de excepciones de toda la aplicación utilizando @RestControllerAdvice y @ExceptionHandler, garantizando respuestas de error uniformes y códigos HTTP semánticos.",
      "conceptosClave": [
        "@RestControllerAdvice",
        "@ExceptionHandler",
        "MethodArgumentNotValidException",
        "ResourceNotFoundException",
        "Estructura ErrorResponse"
      ],
      "rubrica": [
        "Crear excepciones personalizadas de negocio heredando de RuntimeException.",
        "Crear clase DTO ErrorResponse con timestamp, status, error, mensaje y ruta.",
        "Implementar GlobalExceptionHandler anotado con @RestControllerAdvice.",
        "Capturar errores de validación formateando una lista clara de campos con fallo."
      ],
      "errorComun": "Hacer capturas genéricas con Exception.class sin devolver códigos semánticos específicos para errores del cliente (4xx).",
      "preguntaDefensa": "¿Qué ventaja aporta @RestControllerAdvice frente a capturar excepciones dentro de cada método del controlador con try-catch?",
      "codigoResuelto": "// Actividad 12: Manejo Global de Excepciones (@RestControllerAdvice)\npackage com.studio.taskmanager.exception;\n\nimport jakarta.servlet.http.HttpServletRequest;\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.MethodArgumentNotValidException;\nimport org.springframework.web.bind.annotation.*;\nimport java.time.LocalDateTime;\nimport java.util.*;\n\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) {\n        Map<String, Object> body = new LinkedHashMap<>();\n        body.put(\"timestamp\", LocalDateTime.now());\n        body.put(\"status\", HttpStatus.NOT_FOUND.value());\n        body.put(\"error\", \"Not Found\");\n        body.put(\"message\", ex.getMessage());\n        body.put(\"path\", req.getRequestURI());\n        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);\n    }\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {\n        Map<String, String> fieldErrors = new HashMap<>();\n        ex.getBindingResult().getFieldErrors().forEach(fe -> \n            fieldErrors.put(fe.getField(), fe.getDefaultMessage())\n        );\n        Map<String, Object> body = new LinkedHashMap<>();\n        body.put(\"timestamp\", LocalDateTime.now());\n        body.put(\"status\", HttpStatus.BAD_REQUEST.value());\n        body.put(\"errors\", fieldErrors);\n        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);\n    }\n}"
    },
    {
      "numero": 13,
      "titulo": "Spring Boot — Documentación de la API con OpenAPI / Swagger",
      "bloque": "Documentación & Pruebas",
      "rama": "13-documentacion-api-swagger",
      "proyecto": "taskmanager",
      "descripcion": "Integrar SpringDoc OpenAPI para generar documentación interactiva accesible vía navegador (/swagger-ui.html) y especificación JSON estándar (/v3/api-docs).",
      "conceptosClave": [
        "springdoc-openapi-starter-webmvc-ui",
        "@OpenAPIDefinition",
        "@Operation",
        "@ApiResponse",
        "Swagger UI"
      ],
      "rubrica": [
        "Añadir dependencia springdoc en pom.xml.",
        "Configurar metadatos globales (título, versión, descripción, contacto).",
        "Documentar endpoints con @Operation y posibles códigos de respuesta con @ApiResponse.",
        "Probar la ejecución interactiva de peticiones desde Swagger UI."
      ],
      "errorComun": "Bloqueo de las rutas de Swagger al incorporar posteriormente Spring Security sin autorizar el acceso público a /v3/api-docs/**.",
      "preguntaDefensa": "¿Por qué la documentación viva generada mediante OpenAPI es superior a mantener un documento estático?",
      "codigoResuelto": "// Actividad 13: Documentación OpenAPI / Swagger\npackage com.studio.taskmanager.config;\n\nimport io.swagger.v3.oas.models.OpenAPI;\nimport io.swagger.v3.oas.models.info.Info;\nimport io.swagger.v3.oas.models.info.Contact;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\n\n@Configuration\npublic class OpenApiConfig {\n    @Bean\n    public OpenAPI taskManagerOpenAPI() {\n        return new OpenAPI()\n            .info(new Info()\n                .title(\"TaskManager API REST - Java Backend Studio\")\n                .description(\"API REST para gestión de tareas con Spring Boot y JPA\")\n                .version(\"1.0.0\")\n                .contact(new Contact().name(\"Blanca De Uña Martín\").email(\"blanca.deuna@bootcamp.local\")));\n    }\n}"
    },
    {
      "numero": 14,
      "titulo": "Spring Boot — Pruebas en Aplicaciones Spring Boot (JUnit 5 & Mockito)",
      "bloque": "Documentación & Pruebas",
      "rama": "14-pruebas-unitarias-mockito",
      "proyecto": "taskmanager",
      "descripcion": "Desarrollar una suite completa de pruebas unitarias sobre la capa de servicio aislando dependencias con Mockito (@Mock, @InjectMocks, when().thenReturn(), verify()) y pruebas de integración con @SpringBootTest.",
      "conceptosClave": [
        "JUnit 5",
        "Mockito",
        "@ExtendWith(MockitoExtension.class)",
        "@Mock",
        "@InjectMocks",
        "verify()",
        "assertThrows"
      ],
      "rubrica": [
        "Configurar clase de test con @ExtendWith(MockitoExtension.class).",
        "Simular comportamiento del repositorio con Mockito.when().",
        "Comprobar llamadas a métodos con Mockito.verify().",
        "Validar excepciones esperadas con assertThrows()."
      ],
      "errorComun": "Usar @SpringBootTest para pruebas unitarias de servicio (provocando lentitud innecesaria al levantar todo el framework).",
      "preguntaDefensa": "¿Cuál es la diferencia entre un Mock y un Spy en Mockito?",
      "codigoResuelto": "// Actividad 14: Pruebas Unitarias con Mockito (JUnit 5 & verify)\npackage com.studio.taskmanager.service;\n\nimport com.studio.taskmanager.entity.Task;\nimport com.studio.taskmanager.exception.ResourceNotFoundException;\nimport com.studio.taskmanager.mapper.TaskMapper;\nimport com.studio.taskmanager.repository.TaskRepository;\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\nimport java.util.Optional;\nimport static org.junit.jupiter.api.Assertions.*;\nimport static org.mockito.Mockito.*;\n\n@ExtendWith(MockitoExtension.class)\nclass TaskServiceImplTest {\n    @Mock\n    private TaskRepository taskRepository;\n\n    @Mock\n    private TaskMapper taskMapper;\n\n    @InjectMocks\n    private TaskServiceImpl taskService;\n\n    @Test\n    void whenTaskNotFound_thenThrowException() {\n        when(taskRepository.findById(99L)).thenReturn(Optional.empty());\n\n        assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(99L));\n        verify(taskRepository, times(1)).findById(99L);\n        verifyNoInteractions(taskMapper);\n    }\n}"
    },
    {
      "numero": 15,
      "titulo": "Spring Boot — Seguridad con Spring Security y JWT",
      "bloque": "Seguridad & Despliegue",
      "rama": "15-seguridad-spring-security-jwt",
      "proyecto": "taskmanager",
      "descripcion": "Implementar arquitectura de autenticación y autorización stateless. Generación y validación de tokens JWT (JSON Web Tokens), filtro interceptor de peticiones y control de acceso basado en roles (RBAC).",
      "conceptosClave": [
        "Spring Security 6",
        "JWT (HMAC-SHA256)",
        "OncePerRequestFilter",
        "SecurityFilterChain",
        "BCryptPasswordEncoder",
        "RBAC"
      ],
      "rubrica": [
        "Configurar SecurityFilterChain deshabilitando CSRF y estableciendo SessionCreationPolicy.STATELESS.",
        "Implementar JwtService para generar y verificar tokens criptográficos.",
        "Crear JwtAuthenticationFilter interceptando el header Authorization Bearer.",
        "Proteger rutas con @PreAuthorize o configuraciones por rol (ROLE_ADMIN, ROLE_USER)."
      ],
      "errorComun": "No comprobar si el header Authorization empieza por \"Bearer \" o no manejar la expiración del token devolviendo HTTP 401.",
      "preguntaDefensa": "¿Por qué en una API REST stateless con JWT se debe deshabilitar la protección CSRF en Spring Security?",
      "codigoResuelto": "// Actividad 15: Seguridad Stateless con JWT y Spring Security 6\npackage com.studio.taskmanager.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.http.HttpMethod;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;\nimport org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.web.SecurityFilterChain;\nimport org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;\n\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    private final JwtAuthenticationFilter jwtAuthFilter;\n\n    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {\n        this.jwtAuthFilter = jwtAuthFilter;\n    }\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(AbstractHttpConfigurer::disable)\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/v1/auth/**\", \"/swagger-ui/**\", \"/v3/api-docs/**\").permitAll()\n                .requestMatchers(HttpMethod.POST, \"/api/v1/tasks/**\").hasRole(\"ADMIN\")\n                .requestMatchers(HttpMethod.DELETE, \"/api/v1/tasks/**\").hasRole(\"ADMIN\")\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)\n            .build();\n    }\n}"
    },
    {
      "numero": 16,
      "titulo": "Spring Boot — Despliegue con Docker",
      "bloque": "Seguridad & Despliegue",
      "rama": "16-despliegue-con-docker",
      "proyecto": "taskmanager",
      "descripcion": "Contenerizar la aplicación Java mediante Dockerfiles Multi-Stage. Separar la fase de compilación con Maven y JDK de la fase de ejecución con JRE mínimo en Alpine Linux, optimizando tamaño, seguridad y portabilidad.",
      "conceptosClave": [
        "Docker",
        "Multi-Stage Build",
        "Dockerfile",
        "Alpine Linux",
        "Optimización de Capas",
        "Variables de Entorno"
      ],
      "rubrica": [
        "Diseñar Dockerfile con Stage 1 (maven builder) y Stage 2 (eclipse-temurin:17-jre-alpine).",
        "Crear archivo .dockerignore excluyendo target/, .git y ficheros locales.",
        "Construir imagen Docker (docker build -t taskmanager:latest .).",
        "Ejecutar contenedor mapeando puertos (docker run -p 8080:8080) y verificar endpoints."
      ],
      "errorComun": "Copiar todo el código fuente antes de copiar el pom.xml, invalidando la caché de capas de Docker en cada cambio de código.",
      "preguntaDefensa": "¿Qué ventajas aporta la compilación Multi-Stage frente a una imagen Docker tradicional de una sola etapa?",
      "codigoResuelto": "// Actividad 16: Despliegue con Dockerfile Multi-Stage\n# Stage 1: Build de la aplicación con Maven y JDK 17\nFROM maven:3.9.6-eclipse-temurin-17 AS builder\nWORKDIR /app\nCOPY pom.xml .\nRUN mvn dependency:go-offline\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\n# Stage 2: Runtime ligero con Eclipse Temurin JRE en Alpine\nFROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nCOPY --from=builder /app/target/taskmanager-*.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
    }
  ],
  "quizzes": [
    {
      "id": 1,
      "capa": "web",
      "capaNombre": "Capa Web (Controller)",
      "fase": "fase-3",
      "faseNombre": "Fase 3: @RestController & Validación",
      "pregunta": "¿Cuál es la diferencia fundamental entre anotar una clase con @Controller y hacerlo con @RestController en Spring Boot?",
      "opciones": [
        "@RestController añade automáticamente @ResponseBody a todos los métodos del controlador, serializando los retornos directamente a JSON/XML mediante Jackson.",
        "@Controller solo permite peticiones HTTP GET, mientras que @RestController habilita POST, PUT y DELETE.",
        "@RestController levanta un servidor Tomcat embebido independiente para cada petición.",
        "@Controller requiere configurar archivos XML y no es compatible con Spring Boot 3."
      ],
      "correcta": 0,
      "explicacion": "@RestController es una anotación compuesta de @Controller y @ResponseBody. Al usarla, Spring asume que el valor de retorno de cada método handler debe serializarse directamente en el cuerpo de la respuesta HTTP (habitualmente JSON), sin pasar por un ViewResolver de plantillas HTML."
    },
    {
      "id": 2,
      "capa": "web",
      "capaNombre": "Capa Web (Controller)",
      "fase": "fase-1",
      "faseNombre": "Fase 1: Petición HTTP Entrante",
      "pregunta": "¿Qué código de estado HTTP es el estándar RESTful que debe devolver un endpoint POST al dar de alta un recurso con éxito?",
      "opciones": [
        "200 OK con el objeto creado en el cuerpo.",
        "201 Created con el objeto creado en el cuerpo y opcionalmente la cabecera Location con la URI del nuevo recurso.",
        "204 No Content sin cuerpo de respuesta.",
        "202 Accepted indicando que la tarea se procesará de forma asíncrona."
      ],
      "correcta": 1,
      "explicacion": "El estándar HTTP y las buenas prácticas RESTful dictan que una creación exitosa debe responder con HTTP 201 Created. Además, es una excelente práctica incluir en la cabecera Location la URL donde se puede consultar el recurso recién creado (/api/v1/tasks/{id})."
    },
    {
      "id": 3,
      "capa": "web",
      "capaNombre": "Capa Web (Controller)",
      "fase": "fase-3",
      "faseNombre": "Fase 3: @RestController & Validación",
      "pregunta": "Si un cliente envía un JSON con campos que violan las restricciones de Bean Validation (@NotNull, @Size) y el controlador usa @Valid @RequestBody, ¿qué excepción lanza Spring por defecto?",
      "opciones": [
        "NullPointerException lanzada por la JVM.",
        "MethodArgumentNotValidException capturable con @ExceptionHandler o @RestControllerAdvice.",
        "ConstraintViolationException exclusivamente en la base de datos.",
        "ResponseStatusException con código 500 Internal Server Error."
      ],
      "correcta": 1,
      "explicacion": "Cuando un argumento de método anotado con @Valid falla la validación en el Controller, Spring lanza MethodArgumentNotValidException. Capturarla en un @RestControllerAdvice permite extraer los errores de BindingResult y devolver un HTTP 400 Bad Request formateado con la lista de campos erróneos."
    },
    {
      "id": 4,
      "capa": "web",
      "capaNombre": "Capa Web (Controller)",
      "fase": "fase-7",
      "faseNombre": "Fase 7: Respuesta HTTP & Status",
      "pregunta": "¿Cuál es el código HTTP adecuado al ejecutar un borrado exitoso (DELETE /api/v1/tasks/{id}) cuando la API no necesita devolver contenido?",
      "opciones": [
        "200 OK devolviendo true.",
        "204 No Content con cuerpo vacío.",
        "202 Accepted indicando solicitud en cola.",
        "404 Not Found si el recurso ya no existe tras borrarlo."
      ],
      "correcta": 1,
      "explicacion": "HTTP 204 No Content es el código semántico exacto para peticiones procesadas con éxito que no requieren devolver datos en el body, como ocurre en la mayoría de operaciones DELETE idempotentes."
    },
    {
      "id": 5,
      "capa": "web",
      "capaNombre": "Capa Web (Controller)",
      "fase": "fase-3",
      "faseNombre": "Fase 3: @RestController & Validación",
      "pregunta": "¿Por qué se considera una violación grave de la arquitectura por capas que un @RestController inyecte directamente un @Repository?",
      "opciones": [
        "Porque Spring Boot arroja un error de compilación al detectar inyección cruzada.",
        "Porque se salta la Capa de Negocio (Service), perdiendo la orquestación transaccional ACID, las reglas de negocio y acoplando la web a la persistencia.",
        "Porque las peticiones HTTP solo pueden comunicarse con interfaces SOAP.",
        "Porque el Repository solo puede ejecutarse en hilos secundarios asíncronos."
      ],
      "correcta": 1,
      "explicacion": "La regla fundamental de la arquitectura por capas impone que el flujo sea unidireccional y secuencial (Controller -> Service -> Repository). Si el Controller accede al Repository, la lógica de negocio se fragmenta en la vista y se pierde el control transaccional gestionado en el Service."
    },
    {
      "id": 6,
      "capa": "service",
      "capaNombre": "Capa de Servicio (Service)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Dónde debe residir principalmente la anotación @Transactional en una arquitectura enterprise en capas?",
      "opciones": [
        "En el @RestController para abarcar la serialización del JSON y la respuesta HTTP.",
        "En los métodos de la Capa de Negocio (@Service), donde se coordinan las operaciones que deben ser atómicas e íntegras.",
        "En las interfaces JpaRepository exclusivamente.",
        "En la clase principal anotada con @SpringBootApplication."
      ],
      "correcta": 1,
      "explicacion": "Las transacciones ACID son una preocupación del caso de uso de negocio. El Service es quien coordina múltiples llamadas a repositorios o servicios externos que deben completarse juntas (Commit) o revertirse en caso de fallo (Rollback)."
    },
    {
      "id": 7,
      "capa": "service",
      "capaNombre": "Capa de Servicio (Service)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "Por defecto en Spring Framework, ¿qué tipo de excepciones provocan un ROLLBACK automático de una transacción gestionada con @Transactional?",
      "opciones": [
        "Todas las subclases de java.lang.Throwable, incluidas las checked exceptions.",
        "Únicamente las excepciones no chequeadas (subclases de RuntimeException) y los Error.",
        "Cualquier excepción que implemente Serializable.",
        "Ninguna; es obligatorio invocar manualmente TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()."
      ],
      "correcta": 1,
      "explicacion": "Por defecto, Spring solo realiza rollback ante RuntimeException y Error. Si un método lanza una Checked Exception (heredera directa de java.lang.Exception) y queremos rollback, debemos especificarlo con @Transactional(rollbackFor = Exception.class)."
    },
    {
      "id": 8,
      "capa": "service",
      "capaNombre": "Capa de Servicio (Service)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Qué beneficio técnico crítico aporta declarar @Transactional(readOnly = true) en métodos de consulta en la capa Service?",
      "opciones": [
        "Bloquea la tabla completa en la base de datos para impedir escrituras concurrentes.",
        "Indica a Hibernate que desactive el 'dirty checking' (detección de cambios en memoria), reduciendo el consumo de CPU y memoria de la JVM.",
        "Hace que el método se ejecute en un thread de solo lectura sin conexión JDBC.",
        "Convierte automáticamente las entidades devueltas en constantes inmutables."
      ],
      "correcta": 1,
      "explicacion": "Con readOnly = true, el Persistence Context de Hibernate sabe que las entidades cargadas no se modificarán, por lo que no crea instantáneas (snapshots) en memoria para el dirty checking al cierre de la sesión, mejorando sustancialmente el rendimiento."
    },
    {
      "id": 9,
      "capa": "service",
      "capaNombre": "Capa de Servicio (Service)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Por qué en Spring Boot 3 se exige inyectar los colaboradores del Service por constructor en lugar de usar @Autowired sobre atributos privados?",
      "opciones": [
        "Porque @Autowired sobre atributo privado fue eliminado en Java 17.",
        "Porque la inyección por constructor permite declarar atributos inmutables (private final) y facilita pruebas unitarias puras instanciando con 'new' o con Mocks de Mockito sin necesidad de levantar Spring.",
        "Porque el constructor obliga a que las clases implementen la interfaz Serializable.",
        "Porque la inyección por campo duplica el consumo de sockets de red."
      ],
      "correcta": 1,
      "explicacion": "La inyección por constructor promueve la inmutabilidad (campos final), evita dependencias nulas en tiempo de ejecución (falla al instanciar si falta algo) y desacopla la clase del contenedor de inversión de control, haciendo que los tests corran en milisegundos."
    },
    {
      "id": 10,
      "capa": "service",
      "capaNombre": "Capa de Servicio (Service)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "Si el método A() de un @Service tiene @Transactional y llama al método B() de la misma clase mediante this.B(), ¿se aplicará una nueva transacción si B() tiene @Transactional(propagation = Propagation.REQUIRES_NEW)?",
      "opciones": [
        "Sí, Spring siempre abre una nueva transacción para cada llamada anotada.",
        "No, porque al ser una llamada interna directa (self-invocation con this), la ejecución no pasa a través del Proxy dinámico de Spring AOP.",
        "Sí, pero solo si la base de datos subyacente es PostgreSQL.",
        "No, provocará una excepción IllegalTransactionStateException en compilación."
      ],
      "correcta": 1,
      "explicacion": "Spring gestiona transacciones mediante Proxies (Spring AOP). Una llamada directa interna dentro del mismo objeto no pasa por el Proxy interceptor, por lo que las anotaciones @Transactional del método invocado internamente son ignoradas."
    },
    {
      "id": 11,
      "capa": "repository",
      "capaNombre": "Capa de Persistencia (Repository)",
      "fase": "fase-5",
      "faseNombre": "Fase 5: @Repository & Persistencia JPA",
      "pregunta": "¿Qué es el problema de rendimiento N+1 en JPA/Hibernate y cuál es la solución técnica estándar?",
      "opciones": [
        "Se ejecuta 1 consulta para la lista principal y luego N consultas individuales adicionales para cargar relaciones perezosas (LAZY). Se soluciona con 'JOIN FETCH' o '@EntityGraph'.",
        "Ocurre cuando la base de datos supera N+1 conexiones simultáneas en el pool HikariCP. Se soluciona reiniciando el servicio.",
        "Es un fallo que ocurre cuando se insertan N entidades y se genera 1 ID repetido. Se soluciona usando UUID.",
        "Es un error de memoria Heap cuando una lista contiene N+1 elementos sin paginación."
      ],
      "correcta": 0,
      "explicacion": "El problema N+1 ocurre típicamente al iterar una colección cargada con FetchType.LAZY. Cada iteración dispara una consulta SQL adicional a la base de datos. Usando JOIN FETCH en JPQL o @EntityGraph se carga la entidad y su relación en una única consulta SQL optimizada con JOIN."
    },
    {
      "id": 12,
      "capa": "repository",
      "capaNombre": "Capa de Persistencia (Repository)",
      "fase": "fase-5",
      "faseNombre": "Fase 5: @Repository & Persistencia JPA",
      "pregunta": "¿Cómo genera Spring Data JPA la consulta SQL al declarar 'List<Task> findByCompletedAndDueDateBefore(boolean completed, LocalDate date)'?",
      "opciones": [
        "Ejecuta un analizador sintáctico en tiempo de arranque que descompone las palabras clave del nombre del método (Derived Query) y genera el SQL con WHERE completed = ? AND due_date < ?.",
        "Requiere un archivo tasks-queries.xml en el classpath con el SQL explícito.",
        "Carga todas las filas de la tabla en memoria Java y las filtra usando streams de Java 8.",
        "Delega en una biblioteca JavaScript del navegador la ejecución del filtro relacional."
      ],
      "correcta": 0,
      "explicacion": "Spring Data JPA utiliza el mecanismo de Derived Queries. Analiza el nombre del método respetando las convenciones (findBy, And, Before, GreaterThan, IgnoreCase) y construye dinámicamente la consulta JPQL/SQL parametrizada correspondiente."
    },
    {
      "id": 13,
      "capa": "repository",
      "capaNombre": "Capa de Persistencia (Repository)",
      "fase": "fase-5",
      "faseNombre": "Fase 5: @Repository & Persistencia JPA",
      "pregunta": "¿Por qué es obligatorio añadir la anotación @Modifying al declarar una consulta personalizada con @Query que ejecuta un UPDATE o DELETE en JpaRepository?",
      "opciones": [
        "Para permitir que Spring Data sepa que la sentencia modificará registros y ejecute executeUpdate() en lugar de executeQuery().",
        "Para indicar a Hibernate que convierta la consulta en un procedimiento almacenado.",
        "Para forzar el cifrado de la clave primaria antes de modificar el registro.",
        "Para desactivar los índices de la tabla durante la ejecución."
      ],
      "correcta": 0,
      "explicacion": "Por defecto, @Query espera sentencias SELECT que devuelven resultados. La anotación @Modifying le indica a Spring Data JPA que debe invocar executeUpdate() sobre el EntityManager y gestionar la sincronización de la caché de primer nivel."
    },
    {
      "id": 14,
      "capa": "repository",
      "capaNombre": "Capa de Persistencia (Repository)",
      "fase": "fase-5",
      "faseNombre": "Fase 5: @Repository & Persistencia JPA",
      "pregunta": "¿Qué significa que una entidad JPA se encuentre en estado 'Detached' (desconectada)?",
      "opciones": [
        "Que ha sido borrada permanentemente de la base de datos con un DELETE.",
        "Que posee un identificador pero ya no está asociada a un Persistence Context activo (por ejemplo, al cerrarse la transacción).",
        "Que nunca ha sido persistida ni tiene clave primaria asignada.",
        "Que está bloqueada exclusivamente por otro hilo en una transacción concurrente."
      ],
      "correcta": 1,
      "explicacion": "En el ciclo de vida JPA, una entidad está Detached cuando representa un registro existente en la base de datos pero el EntityManager que la gestionaba ya se cerró. Modificar sus atributos en este estado no provocará cambios en la BD a menos que se reasocie con merge()."
    },
    {
      "id": 15,
      "capa": "repository",
      "capaNombre": "Capa de Persistencia (Repository)",
      "fase": "fase-5",
      "faseNombre": "Fase 5: @Repository & Persistencia JPA",
      "pregunta": "¿Cuál es la diferencia entre JpaRepository y CrudRepository en Spring Data?",
      "opciones": [
        "CrudRepository solo sirve para bases de datos NoSQL como MongoDB.",
        "JpaRepository extiende de ListPagingAndSortingRepository y CrudRepository, añadiendo métodos específicos de persistencia relacional (flush(), deleteInBatch(), retorno directo de List<T> en lugar de Iterable<T>).",
        "JpaRepository no soporta transacciones y requiere gestionar los commit manualmente.",
        "CrudRepository es más moderno y sustituye por completo a JpaRepository en Spring Boot 3."
      ],
      "correcta": 1,
      "explicacion": "JpaRepository es la interfaz más completa para JPA en Spring Data: hereda los métodos CRUD básicos, añade soporte de paginación y ordenación con List, y proporciona operaciones de sincronización de caché (flush) y borrado por lotes."
    },
    {
      "id": 16,
      "capa": "dto",
      "capaNombre": "Capa de DTOs & Mappers",
      "fase": "fase-6",
      "faseNombre": "Fase 6: Mapper & Transformación DTO",
      "pregunta": "¿Por qué está estrictamente desaconsejado devolver directamente entidades JPA (@Entity) en las respuestas de una API REST?",
      "opciones": [
        "Porque las entidades son demasiado pesadas para la red debido a que incluyen el código binario de la base de datos.",
        "Porque provoca fugas de seguridad (exponiendo claves foráneas, auditoría o contraseñas), problemas de serialización cíclica por relaciones bidireccionales y excepciones LazyInitializationException fuera de sesión transaccional.",
        "Porque Jackson no sabe serializar objetos Java ordinarios.",
        "Porque los navegadores web modernos rechazan cualquier objeto anotado con @Table."
      ],
      "correcta": 1,
      "explicacion": "Las entidades modelan la persistencia, no el contrato público de la API. Exponerlas directamente acopla el cliente a la base de datos, expone datos internos sensibles y causa errores de serialización JSON al acceder a colecciones perezosas cerradas."
    },
    {
      "id": 17,
      "capa": "dto",
      "capaNombre": "Capa de DTOs & Mappers",
      "fase": "fase-6",
      "faseNombre": "Fase 6: Mapper & Transformación DTO",
      "pregunta": "¿Qué ventaja pedagógica y técnica aporta implementar un Mapper manual con bucles for clásicos (sin librerías de reflexión tipo ModelMapper)?",
      "opciones": [
        "Control absoluto sobre la asignación de cada atributo, depuración paso a paso en tiempo de compilación y cero sobrecarga de reflexión o librerías opacas de 'caja negra'.",
        "Permite que el código Java compile más rápido en máquinas con menos de 4GB de RAM.",
        "Obliga al recolector de basura a limpiar la memoria en cada llamada a getter.",
        "Garantiza que la API sea compatible con Internet Explorer 6."
      ],
      "correcta": 0,
      "explicacion": "Los mappers manuales imperativos con getters y setters son 100% transparentes, fallan en tiempo de compilación si cambia un tipo de dato, facilitan pruebas unitarias y evitan los problemas habituales de librerías automáticas de reflexión que fallan silenciosamente."
    },
    {
      "id": 18,
      "capa": "dto",
      "capaNombre": "Capa de DTOs & Mappers",
      "fase": "fase-6",
      "faseNombre": "Fase 6: Mapper & Transformación DTO",
      "pregunta": "¿Cuál es la separación de responsabilidades correcta entre un RequestDTO y un ResponseDTO?",
      "opciones": [
        "El RequestDTO solo contiene tipos primitivos y el ResponseDTO solo colecciones.",
        "El RequestDTO contiene las validaciones de entrada (@NotBlank, @NotNull) y los campos que el cliente puede enviar; el ResponseDTO proyecta los datos procesados, identificadores generados y fechas para lectura.",
        "Ambos deben ser exactamente iguales y reutilizar la misma clase para evitar duplicar código.",
        "El ResponseDTO debe contener anotaciones @Entity de persistencia."
      ],
      "correcta": 1,
      "explicacion": "Un RequestDTO modela lo que el cliente suministra para crear o editar (con validaciones de sintaxis y sin IDs asignados por el usuario). El ResponseDTO proyecta lo que el cliente tiene permiso de ver una vez procesado por el negocio."
    },
    {
      "id": 19,
      "capa": "dto",
      "capaNombre": "Capa de DTOs & Mappers",
      "fase": "fase-6",
      "faseNombre": "Fase 6: Mapper & Transformación DTO",
      "pregunta": "¿Por qué los Java Records (introducidos de forma estándar en Java 16/17) son especialmente idóneos para implementar DTOs de lectura?",
      "opciones": [
        "Porque generan automáticamente constructor canónico, getters de acceso (campo()), equals(), hashCode() y toString() inmutables por diseño.",
        "Porque permiten herencia múltiple de clases abstractas.",
        "Porque reemplazan a los controladores REST en Spring Boot 3.",
        "Porque se almacenan automáticamente en la caché L2 de Hibernate."
      ],
      "correcta": 0,
      "explicacion": "Los records en Java son portadores de datos inmutables y concisos. Al no permitir setters, eliminan efectos secundarios accidentales al transportar datos entre capas y simplifican el código eliminando el boilerplate de getters y constructores."
    },
    {
      "id": 20,
      "capa": "security",
      "capaNombre": "Capa de Seguridad (Security)",
      "fase": "fase-2",
      "faseNombre": "Fase 2: Filtro Security & Validación JWT",
      "pregunta": "¿Por qué en una API REST moderna asegurada con JWT se deshabilita la protección CSRF (Cross-Site Request Forgery)?",
      "opciones": [
        "Porque el protocolo HTTP prohíbe el uso de CSRF en servidores Linux.",
        "Porque la API es Stateless y no utiliza cookies de sesión automáticas en el navegador; las peticiones viajan con el token en la cabecera 'Authorization: Bearer', que los navegadores no adjuntan automáticamente en ataques CSRF.",
        "Porque Spring Security 6 ya no soporta CSRF bajo ninguna circunstancia.",
        "Para permitir que usuarios anónimos ejecuten peticiones DELETE sin autenticarse."
      ],
      "correcta": 1,
      "explicacion": "Los ataques CSRF explotan que los navegadores envían automáticamente las cookies de sesión en peticiones cross-origin. Si la autenticación se basa en tokens JWT enviados explícitamente en la cabecera Authorization (no en cookies), el ataque CSRF es inviable y mantenerlo activo generaría rechazos 403 innecesarios."
    },
    {
      "id": 21,
      "capa": "security",
      "capaNombre": "Capa de Seguridad (Security)",
      "fase": "fase-2",
      "faseNombre": "Fase 2: Filtro Security & Validación JWT",
      "pregunta": "¿Cómo valida el servidor un token JWT recibido en una petición sin necesidad de consultar la base de datos?",
      "opciones": [
        "El servidor envía el token a los servidores centrales de identidad en la nube.",
        "Comprueba criptográficamente la firma (Signature) usando el algoritmo y la clave secreta compartida (Secret Key), y revisa que la fecha de expiración ('exp' claim) sea posterior al instante actual.",
        "Descifra el cuerpo del JWT y busca el username en la tabla users de la base de datos en cada petición.",
        "Calcula un hash MD5 de la dirección IP del cliente y lo compara con el token."
      ],
      "correcta": 1,
      "explicacion": "Un JWT consta de Header, Payload y Signature. La firma se genera como Hash(Header + Payload, SecretKey). El servidor recalculando la firma sobre los datos recibidos comprueba si coincide con la firma adjunta. Si coincide y no ha expirado, el token es 100% legítimo sin tocar la BD."
    },
    {
      "id": 22,
      "capa": "security",
      "capaNombre": "Capa de Seguridad (Security)",
      "fase": "fase-2",
      "faseNombre": "Fase 2: Filtro Security & Validación JWT",
      "pregunta": "¿En qué posición de la cadena de filtros (SecurityFilterChain) debe colocarse el filtro personalizado JwtAuthenticationFilter?",
      "opciones": [
        "Al final absoluto, después de que el Controller haya respondido.",
        "Antes de UsernamePasswordAuthenticationFilter, para interceptar el token, autenticar el contexto de seguridad y evitar el procesamiento por formulario tradicional.",
        "En el servidor web Apache o Nginx previo a la aplicación.",
        "Dentro de la clase Service anotada con @Service."
      ],
      "correcta": 1,
      "explicacion": "En Spring Security, addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) asegura que el token se extraiga e inspeccione al inicio de la cadena HTTP, poblando el SecurityContextHolder antes de que se evalúen las reglas de autorización."
    },
    {
      "id": 23,
      "capa": "security",
      "capaNombre": "Capa de Seguridad (Security)",
      "fase": "fase-7",
      "faseNombre": "Fase 7: Respuesta HTTP & Status",
      "pregunta": "¿Cuál es la diferencia exacta entre el código HTTP 401 Unauthorized y el código HTTP 403 Forbidden?",
      "opciones": [
        "401 significa fallo de Autenticación (¿Quién eres? Falta el token o no es válido); 403 significa fallo de Autorización (Sé quién eres, pero tu rol/permisos no te permiten acceder a este recurso).",
        "401 es para peticiones GET y 403 es para peticiones POST.",
        "401 lo emite el servidor de base de datos y 403 el servidor web Tomcat.",
        "Son sinónimos intercambiables en la especificación HTTP."
      ],
      "correcta": 0,
      "explicacion": "401 Unauthorized indica que las credenciales no fueron provistas o son inválidas (Autenticación). 403 Forbidden indica que el usuario está correctamente autenticado, pero no posee los roles o permisos suficientes para ejecutar la acción solicitada (Autorización)."
    },
    {
      "id": 24,
      "capa": "security",
      "capaNombre": "Capa de Seguridad (Security)",
      "fase": "fase-2",
      "faseNombre": "Fase 2: Filtro Security & Validación JWT",
      "pregunta": "En Spring Security 6, ¿cuál es la clase recomendada para configurar las rutas y filtros de seguridad mediante un @Bean?",
      "opciones": [
        "Heredar de WebSecurityConfigurerAdapter y sobreescribir configure(HttpSecurity http).",
        "Declarar un @Bean que devuelva un SecurityFilterChain configurando el objeto HttpSecurity con expresiones lambda.",
        "Configurar un archivo web.xml con etiquetas <security-constraint>.",
        "Crear un componente que implemente la interfaz Filter de Jakarta EE sin anotaciones de Spring."
      ],
      "correcta": 1,
      "explicacion": "A partir de Spring Security 5.7 y de forma obligatoria en Spring Security 6 (Spring Boot 3), WebSecurityConfigurerAdapter fue eliminado. La configuración se realiza creando un @Bean público que devuelva SecurityFilterChain usando el patrón basado en lambdas (http.csrf(...).authorizeHttpRequests(...))."
    },
    {
      "id": 25,
      "capa": "testing",
      "capaNombre": "Capa de Testing (Mockito)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Cuál es la diferencia entre un @Mock y un @Spy en Mockito?",
      "opciones": [
        "Un @Mock es un objeto simulado dummy donde todos los métodos devuelven valores por defecto salvo que se defina un when(); un @Spy envuelve una instancia real delegando en el código original salvo los métodos stubbeados.",
        "@Mock solo funciona con interfaces y @Spy solo con clases finales.",
        "@Spy ejecuta las llamadas en un servidor remoto de pruebas.",
        "@Mock solo se puede usar con JUnit 4 y @Spy con JUnit 5."
      ],
      "correcta": 0,
      "explicacion": "Un Mock es una cáscara vacía completa (sus métodos devuelven null, 0 o false por defecto). Un Spy es un 'espía' sobre un objeto real: ejecuta el código original del método a menos que expresamente se sobreescriba su comportamiento con doReturn().when(spy)..."
    },
    {
      "id": 26,
      "capa": "testing",
      "capaNombre": "Capa de Testing (Mockito)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Qué hace la anotación @InjectMocks de Mockito en una clase de test?",
      "opciones": [
        "Inyecta los Beans administrados por el ApplicationContext de Spring.",
        "Crea la instancia real de la clase que estamos testeando e inyecta en ella automáticamente los colaboradores declarados con @Mock o @Spy.",
        "Sobreescribe la base de datos de producción con datos de prueba.",
        "Ejecuta los tests en paralelo utilizando hilos virtuales de Java 21."
      ],
      "correcta": 1,
      "explicacion": "@InjectMocks instancia la clase bajo prueba (por ejemplo, TaskServiceImpl) e inyecta en sus constructores o atributos los dobles creados con @Mock (como TaskRepository y TaskMapper), permitiendo probar la lógica de la clase en total aislamiento."
    },
    {
      "id": 27,
      "capa": "testing",
      "capaNombre": "Capa de Testing (Mockito)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Para qué sirve el método verify() de Mockito en una aserción de prueba unitaria?",
      "opciones": [
        "Para verificar si la base de datos tiene registros duplicados.",
        "Para comprobar formalmente que un método específico de un mock fue invocado el número esperado de veces (ej: times(1)) con los argumentos esperados.",
        "Para comprobar que el código Java no contiene errores de compilación.",
        "Para imprimir los logs de ejecución en la consola de Maven."
      ],
      "correcta": 1,
      "explicacion": "verify(mock, times(1)).save(any()) no verifica el valor de retorno, sino el COMPORTAMIENTO: asegura que la clase bajo prueba realmente interactuó con sus colaboradores de la forma prevista por el diseño arquitectónico."
    },
    {
      "id": 28,
      "capa": "testing",
      "capaNombre": "Capa de Testing (Mockito)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Por qué en pruebas unitarias puras de servicios se debe usar @ExtendWith(MockitoExtension.class) en vez de @SpringBootTest?",
      "opciones": [
        "Porque @SpringBootTest levanta todo el contenedor de dependencias, base de datos y configuración de Spring, tardando segundos por test; mientras que MockitoExtension corre en milisegundos en memoria pura.",
        "Porque @SpringBootTest no es compatible con JUnit 5.",
        "Porque @ExtendWith requiere licencias comerciales de pago.",
        "Porque Spring Boot prohíbe el uso de mocks en integración."
      ],
      "correcta": 0,
      "explicacion": "Las pruebas unitarias deben ser veloces (milisegundos) y aisladas. @ExtendWith(MockitoExtension.class) inicializa los mocks sin tocar Spring. @SpringBootTest debe reservarse exclusivamente para pruebas de integración donde se desea probar la interacción real de todas las piezas."
    },
    {
      "id": 29,
      "capa": "testing",
      "capaNombre": "Capa de Testing (Mockito)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "¿Cómo se verifica en JUnit 5 que un método del servicio lanza la excepción ResourceNotFoundException cuando no se encuentra un elemento?",
      "opciones": [
        "Con try/catch clásico sin aserciones.",
        "Usando assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(99L));",
        "Anotando el método de prueba con @Test(expected = ResourceNotFoundException.class).",
        "Comprobando si el método devuelve null."
      ],
      "correcta": 1,
      "explicacion": "En JUnit 5, la forma idiomática y precisa es assertThrows(Class<T>, Executable). Permite capturar la excepción lanzada por la lambda y verificar opcionalmente su mensaje de error con assertEquals."
    },
    {
      "id": 30,
      "capa": "docker",
      "capaNombre": "Capa de Infraestructura (Docker)",
      "fase": "fase-1",
      "faseNombre": "Fase 1: Petición HTTP Entrante",
      "pregunta": "¿Cuál es la ventaja fundamental de un Dockerfile Multi-Stage en el empaquetado de aplicaciones Spring Boot?",
      "opciones": [
        "Permite ejecutar la aplicación en múltiples sistemas operativos al mismo tiempo.",
        "Separa la etapa de construcción (con Maven y JDK completo de 800MB) de la etapa de ejecución final (con un JRE ligero sobre Alpine Linux de 150MB), garantizando compilaciones reproducibles y reduciendo drásticamente la superficie de ataque y el tamaño de la imagen.",
        "Elimina la necesidad de utilizar contenedores Docker en el servidor.",
        "Hace que la aplicación Spring Boot no necesite memoria RAM para ejecutarse."
      ],
      "correcta": 1,
      "explicacion": "Multi-Stage Build permite compilar dentro de un contenedor oficial (solucionando el 'en mi máquina funciona'), pero la imagen final producida solo copia el archivo .jar compilado a una imagen mínima JRE (Alpine o distroless), logrando contenedores de 150MB en lugar de 900MB."
    },
    {
      "id": 31,
      "capa": "docker",
      "capaNombre": "Capa de Infraestructura (Docker)",
      "fase": "fase-1",
      "faseNombre": "Fase 1: Petición HTTP Entrante",
      "pregunta": "En el comando 'docker run -d -p 8080:8080 --name mi-app app:latest', ¿qué significa el parámetro '-p 8080:8080'?",
      "opciones": [
        "Mapea el puerto 8080 de la máquina anfitriona (host) al puerto 8080 dentro del contenedor Docker.",
        "Indica que el contenedor consumirá un máximo de 8080 MB de memoria.",
        "Fija el número de hilos de ejecución de Tomcat a 8080.",
        "Establece el timeout de conexión HTTP en 8080 milisegundos."
      ],
      "correcta": 0,
      "explicacion": "La sintaxis de -p en Docker es 'puerto-host:puerto-contenedor'. Permite que las peticiones que llegan al puerto 8080 del sistema operativo anfitrión sean redirigidas al puerto 8080 donde escucha la aplicación Spring Boot dentro de la red aislada del contenedor."
    },
    {
      "id": 32,
      "capa": "docker",
      "capaNombre": "Capa de Infraestructura (Docker)",
      "fase": "fase-1",
      "faseNombre": "Fase 1: Petición HTTP Entrante",
      "pregunta": "¿Cuál es la diferencia entre ENTRYPOINT y CMD en un Dockerfile para Spring Boot?",
      "opciones": [
        "ENTRYPOINT define el comando ejecutable base invariable (ej: ['java', '-jar', 'app.jar']), mientras que CMD define los argumentos por defecto que pueden ser fácilmente sobreescritos al arrancar el contenedor.",
        "ENTRYPOINT solo se ejecuta al compilar la imagen y CMD solo al descargarla de Docker Hub.",
        "CMD solo funciona con comandos de Windows y ENTRYPOINT con Linux.",
        "Son exactamente idénticos y se pueden intercambiar sin diferencias."
      ],
      "correcta": 0,
      "explicacion": "ENTRYPOINT establece el proceso principal del contenedor (como java -jar app.jar). Si se define CMD a continuación, actúa como parámetros por defecto que el usuario puede sobreescribir al ejecutar 'docker run ...'."
    },
    {
      "id": 33,
      "capa": "service",
      "capaNombre": "Capa de Servicio (Service)",
      "fase": "fase-4",
      "faseNombre": "Fase 4: @Service & Transacciones ACID",
      "pregunta": "En el contexto de las propiedades ACID, ¿qué significa la 'A' (Atomicidad)?",
      "opciones": [
        "Que las operaciones se ejecutan a nivel de átomos de silicio de la CPU.",
        "Que todas las operaciones de la transacción se ejecutan con éxito y se confirman juntas (Commit), o si alguna falla, ninguna se aplica y se revierte el estado por completo (Rollback; 'todo o nada').",
        "Que la base de datos solo admite tipos de datos atómicos como enteros y booleanos.",
        "Que la aplicación debe reiniciarse automáticamente tras cada consulta."
      ],
      "correcta": 1,
      "explicacion": "Atomicidad garantiza el principio de 'todo o nada': una transacción compuesta por múltiples sentencias (como restar saldo y crear apunte de préstamo) no puede quedar a medias; o se completan todas o se revierte íntegramente."
    },
    {
      "id": 34,
      "capa": "web",
      "capaNombre": "Capa Web (Controller)",
      "fase": "fase-7",
      "faseNombre": "Fase 7: Respuesta HTTP & Status",
      "pregunta": "¿Qué clase de Spring Framework permite encapsular en una sola respuesta el cuerpo de datos, las cabeceras HTTP personalizadas y el código de estado?",
      "opciones": [
        "HttpServletResponse exclusivamente.",
        "ResponseEntity<T>.",
        "ModelMap.",
        "HttpEntityHeaders."
      ],
      "correcta": 1,
      "explicacion": "ResponseEntity<T> es la clase canónica de Spring para construir respuestas HTTP completas. Permite definir de forma fluida el status (HttpStatus.OK, CREATED, NOT_FOUND), añadir cabeceras (headers.setLocation(...)) y adjuntar el body tipado."
    },
    {
      "id": 35,
      "capa": "repository",
      "capaNombre": "Capa de Persistencia (Repository)",
      "fase": "fase-5",
      "faseNombre": "Fase 5: @Repository & Persistencia JPA",
      "pregunta": "¿Qué papel cumple el archivo 'application.properties' o 'application.yml' en la configuración de la persistencia de Spring Boot?",
      "opciones": [
        "Permite configurar la URL de conexión JDBC (spring.datasource.url), credenciales, driver y parámetros de Hibernate como 'ddl-auto' y 'show-sql' sin escribir código Java de configuración.",
        "Genera automáticamente las clases de las entidades relacionales a partir de una plantilla XML.",
        "Es obligatorio para que el compilador javac pueda encontrar las clases de Spring.",
        "Cifra los archivos binarios de la base de datos en el disco duro."
      ],
      "correcta": 0,
      "explicacion": "Spring Boot utiliza application.properties para la auto-configuración (Auto-Configuration). Al detectar parámetros como spring.datasource.url y un driver en el classpath, configura automáticamente el DataSource (HikariCP), el EntityManagerFactory y el TransactionManager."
    },
    {
          "id": 36,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "En el patrón Observer, ¿qué relación se establece entre los objetos?",
          "opciones": [
                "De uno a uno, donde cada objeto tiene un único observador.",
                "De uno a muchos, donde un cambio de estado notifica automáticamente a los objetos dependientes.",
                "De muchos a uno, donde varios objetos controlan el estado de un sujeto.",
                "De muchos a muchos, donde todos los objetos se notifican entre sí."
          ],
          "correcta": 1,
          "explicacion": "El patrón Observer define una dependencia uno-a-muchos entre objetos, de forma que cuando el sujeto cambia su estado, todos sus dependientes (observadores) son notificados y actualizados de manera automática."
    },
    {
          "id": 37,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cómo clasifica la *Gang of Four* los 23 patrones de diseño?",
          "opciones": [
                "Según el lenguaje de programación: Java, C++ y Smalltalk.",
                "Según su propósito: creacionales, estructurales y de comportamiento.",
                "Según su complejidad: básicos, intermedios y avanzados.",
                "Según su autor: Gamma, Helm, Johnson y Vlissides."
          ],
          "correcta": 1,
          "explicacion": "La GoF los clasifica según su propósito en tres familias: Creacionales (mecanismos de instanciación), Estructurales (composición de clases y objetos) y de Comportamiento (interacción y distribución de responsabilidades)."
    },
    {
          "id": 38,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cuál es uno de los beneficios de utilizar patrones de diseño en un equipo de desarrollo?",
          "opciones": [
                "Eliminan la necesidad de escribir código.",
                "Proporcionan un vocabulario compartido que agiliza la comunicación.",
                "Garantizan que el software no tenga errores.",
                "Hacen que cualquier código sea más rápido."
          ],
          "correcta": 1,
          "explicacion": "Facilitan un lenguaje y vocabulario común de alto nivel (\"aquí aplicamos un Factory\" o \"usamos un Observer\") que acelera el entendimiento y el diseño dentro del equipo sin tener que explicar la estructura desde cero."
    },
    {
          "id": 39,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué es un patrón de diseño?",
          "opciones": [
                "Un fragmento de código listo para copiar y pegar en cualquier proyecto.",
                "Una descripción de una solución reutilizable y probada a un problema recurrente.",
                "Un lenguaje de programación orientado a objetos.",
                "Una herramienta de prueba automática de software."
          ],
          "correcta": 1,
          "explicacion": "Un patrón no es una librería ni código terminado, sino una plantilla conceptual o solución arquitectónica contrastada ante un problema común de diseño software."
    },
    {
          "id": 40,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué patrón añade responsabilidades adicionales a un objeto de forma dinámica, sin modificar su clase?",
          "opciones": [
                "Decorator.",
                "Adapter.",
                "Template Method.",
                "Command."
          ],
          "correcta": 0,
          "explicacion": "El patrón Decorator adjunta responsabilidades adicionales a un objeto dinámicamente mediante composición envoltoria (wrapper), siendo una alternativa flexible a la herencia."
    },
    {
          "id": 41,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué patrón de comportamiento permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables?",
          "opciones": [
                "State.",
                "Command.",
                "Iterator.",
                "Strategy."
          ],
          "correcta": 3,
          "explicacion": "Strategy define una familia de algoritmos, encapsula cada uno de ellos y los hace intercambiables en tiempo de ejecución de cara al cliente."
    },
    {
          "id": 42,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué patrón de diseño garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella?",
          "opciones": [
                "Prototype.",
                "Builder.",
                "Singleton.",
                "Factory Method."
          ],
          "correcta": 2,
          "explicacion": "Singleton restringe la instanciación de una clase a un único objeto y proporciona un método de acceso global estático (ej: `getInstance()`)."
    },
    {
          "id": 43,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué patrón estructural permite que dos interfaces incompatibles trabajen juntas?",
          "opciones": [
                "Facade.",
                "Proxy.",
                "Composite.",
                "Adapter."
          ],
          "correcta": 3,
          "explicacion": "Adapter convierte la interfaz de una clase en otra interfaz que el cliente espera, permitiendo que clases incompatibles colaboren entre sí."
    },
    {
          "id": 44,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué riesgo se asocia al uso indiscriminado de patrones de diseño?",
          "opciones": [
                "Aumenta la velocidad de ejecución del programa.",
                "Genera sobreingeniería que complica innecesariamente el código.",
                "Impide la reutilización del conocimiento probado.",
                "Elimina la necesidad de aplicar los principios SOLID."
          ],
          "correcta": 1,
          "explicacion": "El uso excesivo o injustificado (antipatrón \"Golden Hammer\" o diseño especulativo) conduce a una sobreingeniería con capas e interfaces innecesarias que aumentan la complejidad cognitiva del proyecto."
    },
    {
          "id": 45,
          "capa": "patrones",
          "capaNombre": "Patrones GoF & SOLID",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Quién adaptó el concepto de patrones desde la arquitectura al diseño de software?",
          "opciones": [
                "Christopher Alexander.",
                "La Gang of Four (Erich Gamma, Richard Helm, Ralph Johnson y John Vlissides).",
                "James Gosling.",
                "Martin Fowler."
          ],
          "correcta": 1,
          "explicacion": "Christopher Alexander creó el concepto original en la arquitectura física/urbanismo (1977). Fue la *Gang of Four* (GoF) en su mítico libro de 1994 (*Design Patterns: Elements of Reusable Object-Oriented Software*) quien lo adaptó e impulsó en la ingeniería de software."
    },
    {
          "id": 46,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cuál es el propósito principal del mapeo objeto-relacional (ORM) en Java?",
          "opciones": [
                "Eliminar por completo la necesidad de usar bases de datos relacionales.",
                "Convertir los datos entre el sistema de tipos de un lenguaje orientado a objetos y una base de datos relacional.",
                "Sustituir a JDBC como capa de comunicación con la base de datos.",
                "Generar automáticamente las clases Java a partir de las tablas de la base de datos."
          ],
          "correcta": 1,
          "explicacion": "El desfase objeto-relacional (*Object-Relational Impedance Mismatch*) surge porque Java maneja objetos con referencias y tipos complejos, mientras que las bases de datos relacionales manejan tablas, filas y tipos SQL. El propósito del ORM es actuar como puente bidireccional traduciendo ambos modelos de forma transparente."
    },
    {
          "id": 47,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cuál es el valor adecuado de `hibernate.hbm2ddl.auto` para un entorno de desarrollo con una base de datos en memoria como H2?",
          "opciones": [
                "`validate`",
                "`none`",
                "`create-drop`",
                "`update`"
          ],
          "correcta": 2,
          "explicacion": "En una base de datos en memoria como H2 (que vive mientras corre la aplicación y se reinicia en cada ejecución), `create-drop` crea el esquema de tablas al arrancar el `SessionFactory`/`EntityManagerFactory` y lo destruye de forma limpia al cerrarse, garantizando un estado limpio en cada prueba o sesión de desarrollo."
    },
    {
          "id": 48,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cuál es la forma correcta de obtener un `EntityManager` a partir de una unidad de persistencia configurada en `persistence.xml`?",
          "opciones": [
                "`EntityManager em = new EntityManager(\"miUnidadPersistencia\");`",
                "`EntityManager em = Persistence.createEntityManager(\"miUnidadPersistencia\");`",
                "`EntityManagerFactory emf = Persistence.createEntityManagerFactory(\"miUnidadPersistencia\"); EntityManager em = emf.createEntityManager();`",
                "`EntityManagerFactory emf = new EntityManagerFactory(\"miUnidadPersistencia\"); EntityManager em = emf.createEntityManager();`"
          ],
          "correcta": 2,
          "explicacion": "`Persistence` es la clase de arranque estándar de JPA que contiene el método factoría estático `createEntityManagerFactory(nombreUnidad)`. Una vez obtenida la factoría `EntityManagerFactory`, esta expone `createEntityManager()` para abrir una sesión de trabajo."
    },
    {
          "id": 49,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cuál es la sintaxis correcta para eliminar una entidad con `EntityManager`?",
          "opciones": [
                "`em.remove(em.find(Cliente.class, 1L));`",
                "`em.delete(em.find(Cliente.class, 1L));`",
                "`em.remove(1L);`",
                "`em.persist(em.find(Cliente.class, 1L));`"
          ],
          "correcta": 0,
          "explicacion": "El método de JPA para borrar es `em.remove(entidad)`. Exige como argumento un objeto de la entidad que esté en estado gestionado (*managed*); no admite una clave primaria suelta (como `1L`), ni existe el método `delete` en la interfaz `EntityManager`."
    },
    {
          "id": 50,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Dónde debe ubicarse el archivo `persistence.xml` en un proyecto Maven típico?",
          "opciones": [
                "En `src/main/resources/META-INF/persistence.xml`",
                "En la raíz del proyecto, junto al `pom.xml`",
                "En `src/main/java/com/ejemplo/META-INF/persistence.xml`",
                "En `WEB-INF/persistence.xml`"
          ],
          "correcta": 0,
          "explicacion": "El estándar JPA especifica que el archivo de configuración debe residir dentro de la carpeta `META-INF/` en la raíz del classpath. En la convención estándar de Maven, esto corresponde a `src/main/resources/META-INF/persistence.xml`."
    },
    {
          "id": 51,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué estado tiene una entidad recién creada con `new` y que aún no ha sido asociada a ningún `EntityManager`?",
          "opciones": [
                "Managed",
                "New (o Transient)",
                "Detached",
                "Removed"
          ],
          "correcta": 1,
          "explicacion": "Una entidad instanciada con el operador `new` en memoria se encuentra en estado *New* (también conocido como *Transient* o Transitoria). No tiene representación asociada en la base de datos ni está bajo el control del contexto de persistencia hasta que se ejecuta `em.persist()`."
    },
    {
          "id": 52,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué función cumple la anotación `@GeneratedValue(strategy = GenerationType.IDENTITY)` en una entidad JPA?",
          "opciones": [
                "Indica que la clave primaria se genera automáticamente mediante la estrategia de identidad de la base de datos.",
                "Establece que la clave primaria debe ser asignada manualmente por el desarrollador.",
                "Define una restricción de unicidad sobre la clave primaria.",
                "Configura el proveedor de persistencia concreto que usará la entidad."
          ],
          "correcta": 0,
          "explicacion": "`GenerationType.IDENTITY` delega la generación del valor de la clave primaria a una columna de tipo auto-incremental o identidad nativa del motor de base de datos (como `AUTO_INCREMENT` en MySQL o `SERIAL`/`IDENTITY` en PostgreSQL/H2)."
    },
    {
          "id": 53,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué indica el valor `true` de la propiedad `hibernate.show_sql`?",
          "opciones": [
                "Que Hibernate imprimirá en consola las sentencias SQL que ejecuta.",
                "Que Hibernate mostrará las consultas JPQL escritas por quien desarrolla.",
                "Que se habilitará el dialecto SQL específico de la base de datos.",
                "Que se activará el control de concurrencia optimista mediante `@Version`."
          ],
          "correcta": 0,
          "explicacion": "La propiedad `hibernate.show_sql=true` instruye a Hibernate a volcar por la salida estándar (consola) todas las sentencias SQL reales que envía a la base de datos (`SELECT`, `INSERT`, `UPDATE`, `DELETE`), ideal para depuración en desarrollo."
    },
    {
          "id": 54,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué método de `EntityManager` se utiliza para buscar una entidad por su clave primaria?",
          "opciones": [
                "`em.persist(clase, id);`",
                "`em.find(clase, id);`",
                "`em.refresh(clase, id);`",
                "`em.remove(clase, id);`"
          ],
          "correcta": 1,
          "explicacion": "`em.find(Class<T> entityClass, Object primaryKey)` es el método oficial de JPA para recuperar una entidad a partir de su tipo y su identificador primario, devolviendo `null` si no existe."
    },
    {
          "id": 55,
          "capa": "repository",
          "capaNombre": "Persistencia BBDD & JPA",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué representa cada instancia de una clase entidad en una base de datos relacional según el mapeo objeto-relacional?",
          "opciones": [
                "Una columna de una tabla.",
                "Una tabla completa.",
                "Una fila de la tabla correspondiente.",
                "Una clave foránea."
          ],
          "correcta": 2,
          "explicacion": "En el mapeo ORM:"
    },
    {
          "id": 56,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Cuándo se comprimen las respuestas HTTP si se activa `server.compression.enabled=true` en Spring Boot con Tomcat?",
          "opciones": [
                "Cuando la respuesta supera el tamaño indicado en `min-response-size` y su tipo MIME está incluido en la configuración.",
                "Siempre, independientemente del tamaño o del tipo de contenido.",
                "Solo cuando el cliente no soporta contenido comprimido.si",
                "Únicamente cuando la petición se realiza a través de HTTP/2."
          ],
          "correcta": 0,
          "explicacion": "Spring Boot y Tomcat aplican compresión (GZIP) únicamente si el cliente envía la cabecera `Accept-Encoding: gzip`, el tamaño de la respuesta supera el umbral fijado en `server.compression.min-response-size` (por defecto 2KB) y el tipo MIME de la respuesta (`Content-Type`) coincide con los configurados en `server.compression.mime-types`."
    },
    {
          "id": 57,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Por qué se recomienda usar `FetchType.LAZY` en las relaciones JPA?",
          "opciones": [
                "Porque evita cargar datos relacionados que no siempre se necesitan, reduciendo consultas y consumo de recursos.",
                "Porque hace que Hibernate cargue todas las relaciones en una única consulta SQL.",
                "Porque elimina la necesidad de usar transacciones en el acceso a datos.",
                "Porque convierte automáticamente las consultas JPQL en sentencias SQL nativas más rápidas."
          ],
          "correcta": 0,
          "explicacion": "La carga perezosa (`LAZY`) posterga la recuperación de entidades asociadas hasta que realmente se accede a ellas vía getter. Esto evita transferencias masivas e innecesarias desde la base de datos hacia la memoria de la JVM, optimizando el ancho de banda y la CPU."
    },
    {
          "id": 58,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué consecuencia tiene configurar un `minimum-idle` igual a `maximum-pool-size` (o un valor excesivamente alto) en un pool de conexiones como HikariCP?",
          "opciones": [
                "El pool mantiene todas las conexiones activas aunque no se usen, derrochando memoria y recursos.",
                "El pool cierra todas las conexiones cuando quedan inactivas y las reabre bajo demanda.",
                "Se elimina el límite máximo de conexiones del pool.",
                "La base de datos recibe menos conexiones simultáneas."
          ],
          "correcta": 0,
          "explicacion": "Si se fuerza a que el pool mantenga un número elevado de conexiones mínimas ociosa abiertas permanentemente, la base de datos y la aplicación reservan recursos (sockets, buffers, memoria) de forma estática e ineficiente, incluso durante valles de inactividad o bajo tráfico."
    },
    {
          "id": 59,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué criterio se recomienda para dimensionar el pool de hilos en tareas asíncronas intensivas en CPU?",
          "opciones": [
                "Que el número de hilos activos no supere, en general, el número de núcleos de CPU disponibles.",
                "Que el número de hilos sea siempre igual al número de peticiones concurrentes.",
                "Que el pool tenga al menos tantos hilos como conexiones de base de datos.",
                "Que el tamaño del pool sea indefinido para evitar esperas en las peticiones."
          ],
          "correcta": 0,
          "explicacion": "Para tareas ligadas a CPU (CPU-bound, como cálculo matemático, criptografía o compresión), crear más hilos que núcleos disponibles provoca una penalización por sobrecarga en el cambio de contexto (*context switching*). La fórmula estándar recomendada es $N_{threads} \\approx N_{CPUs}$ (o $N_{CPUs} + 1$)."
    },
    {
          "id": 60,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué efecto tiene activar la inicialización perezosa global con `spring.main.lazy-initialization=true`?",
          "opciones": [
                "Los beans singleton se crean solo cuando se solicitan por primera vez, lo que reduce el tiempo de arranque y el consumo inicial de recursos.",
                "Todos los beans, incluidos los de uso poco frecuente, se instancian al arrancar el contexto.",
                "Los beans de tipo prototype se convierten en singleton y se comparten en toda la aplicación.",
                "Se desactiva la inyección de dependencias para acelerar el contexto de Spring."
          ],
          "correcta": 0,
          "explicacion": "Por defecto, Spring instancia todos los beans singleton en el arranque (*eager*). Con `spring.main.lazy-initialization=true`, ningún bean se instancia hasta que sea demandado, lo que reduce drásticamente el tiempo de inicio de la aplicación y el consumo inicial de memoria (muy útil en entornos de desarrollo o en arquitecturas serverless)."
    },
    {
          "id": 61,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué práctica ayuda a reducir el consumo energético en el entorno de desarrollo con Spring?",
          "opciones": [
                "Usar perfiles de Spring para desactivar servicios innecesarios, como una base de datos real o integraciones externas.",
                "Mantener Spring Boot DevTools activo en producción para acelerar los reinicios automáticos.",
                "Incluir la mayor cantidad de dependencias posibles para evitar recompilar constantemente.",
                "Desactivar la paginación y la caché para comprobar mejor el rendimiento en producción."
          ],
          "correcta": 0,
          "explicacion": "El uso de perfiles (`@Profile(\"dev\")`) permite arrancar la aplicación con versiones ligeras (como bases de datos en memoria H2, mocks de servicios externos o colas locales), evitando levantar contenedores pesados o dependencias externas que gastan cómputo innecesario en local."
    },
    {
          "id": 62,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué problema ayuda a resolver una consulta JPQL con `JOIN FETCH`?",
          "opciones": [
                "El problema N+1, porque la relación se carga en la misma consulta en lugar de hacer consultas adicionales por cada fila.",
                "La paginación de resultados, porque limita el número de filas devueltas automáticamente.",
                "El almacenamiento en caché de las consultas repetidas.",
                "La creación del pool de conexiones, porque mantiene una conexión abierta durante toda la consulta."
          ],
          "correcta": 0,
          "explicacion": "El problema N+1 ocurre cuando se consulta una lista de $N$ entidades principales y luego Hibernate ejecuta $N$ consultas secundarias para traer sus relaciones hijas. Con `JOIN FETCH`, Hibernate genera un único `JOIN` en SQL y recupera ambas entidades en un solo viaje de red (*round-trip*)."
    },
    {
          "id": 63,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué relación hay entre una inyección de dependencias excesiva y la eficiencia energética de una aplicación Spring?",
          "opciones": [
                "Inyectar demasiadas dependencias en un mismo componente puede indicar un diseño con demasiadas responsabilidades y aumentar el consumo de recursos.",
                "Cuantos más beans se inyectan, menos memoria se consume porque se comparten automáticamente.",
                "La inyección de dependencias solo afecta a la organización del código, nunca al consumo energético.",
                "Es recomendable inyectar todos los repositorios en un único servicio para ahorrar conexiones."
          ],
          "correcta": 0,
          "explicacion": "Un número desmedido de dependencias en una sola clase es síntoma del antipatrón *God Object* y violación de la Responsabilidad Única (SRP). Implica grafos de objetos inflados, mayor huella en memoria, mayor tiempo de ciclo de vida del recolector de basura (GC) y mayor esfuerzo computacional innecesario."
    },
    {
          "id": 64,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué riesgo principal se evita al configurar correctamente `max-lifetime` en un pool de conexiones HikariCP?",
          "opciones": [
                "Que las conexiones muy longevas sean cerradas por firewalls o bases de datos y se produzcan errores.",
                "Que el pool abra conexiones nuevas en cada petición, aumentando el consumo de red.",
                "Que las conexiones inactivas se cierren demasiado pronto.",
                "Que el número máximo de conexiones supere el límite de la base de datos."
          ],
          "correcta": 0,
          "explicacion": "Los firewalls de red o los servidores de base de datos suelen terminar silenciosamente las conexiones TCP que superan un cierto tiempo de vida o inactividad. `max-lifetime` en HikariCP renueva proactivamente las conexiones antes de que expiren externamente, evitando excepciones de tipo \"Connection reset\" o conexiones rotas (*stale connections*)."
    },
    {
          "id": 65,
          "capa": "service",
          "capaNombre": "Spring Boot Avanzado",
          "fase": "certificacion-ifcd",
          "faseNombre": "Certificación Java POO & Patrones",
          "pregunta": "¿Qué se recomienda hacer con los endpoints de Spring Actuator en producción?",
          "opciones": [
                "Desactivar los que no se necesiten, como `/env` o `/beans`, para reducir la exposición y el trabajo de recopilar datos.",
                "Activarlos todos para tener una monitorización completa de cada detalle interno.",
                "Dejarlos con la configuración por defecto sin revisarlos, porque no afectan al consumo.",
                "Usarlos para compartir la configuración interna con todo el equipo de desarrollo."
          ],
          "correcta": 0,
          "explicacion": "Endpoints como `/env`, `/beans` o `/heapdump` exponen información sensible de infraestructura (credenciales, variables de entorno) y conllevan una sobrecarga de CPU y memoria para serializar estados completos de la JVM. En producción se deben exponer únicamente los mínimos necesarios (como `/health` y `/info`), debidamente securizados."
    },
    {
          "id": 66,
          "capa": "testing",
          "capaNombre": "Capa de Testing & Calidad (JaCoCo)",
          "fase": "fase-4",
          "faseNombre": "Fase 4: Testing & Calidad",
          "pregunta": "¿Por qué un informe de cobertura de JaCoCo puede mostrar clases con barras rojas si el 100% de los tests unitarios pasaron con éxito?",
          "opciones": [
                "Porque las barras rojas no indican fallos en los tests, sino líneas de código que ningún test automatizado ha llegado a ejecutar o transitar.",
                "Porque JaCoCo detecta errores de sintaxis en tiempo de compilación que JUnit ignora.",
                "Porque los tests que fallaron fueron silenciados por Mockito durante la ejecución.",
                "Porque la base de datos H2 no estaba levantada durante la ejecución de las pruebas."
          ],
          "correcta": 0,
          "explicacion": "JaCoCo mide cobertura de código (Code Coverage) acoplándose como agente a la JVM. Un 100% de tests aprobados significa que todos los casos evaluados funcionan, pero las barras rojas señalan métodos o ramas condicionales que ningún test ha transitado (por ejemplo, servicios auxiliares no exigidos en la rúbrica)."
    },
    {
          "id": 67,
          "capa": "testing",
          "capaNombre": "Capa de Calidad & SAST (SonarQube)",
          "fase": "fase-4",
          "faseNombre": "Fase 4: Testing & Calidad",
          "pregunta": "En un análisis estático de código con SonarQube (SAST), ¿qué diferencia existe entre un 'Code Smell' y un 'Bug'?",
          "opciones": [
                "Un Bug es un defecto funcional o de lógica que causará un fallo en ejecución, mientras que un Code Smell es un problema de diseño o deuda técnica que dificulta el mantenimiento pero no rompe el programa.",
                "Un Code Smell es un agujero de seguridad crítico (vulnerabilidad), mientras que un Bug es un error tipográfico en un comentario.",
                "Un Bug bloquea la compilación de Maven, mientras que un Code Smell solo se ejecuta en Docker.",
                "No existe ninguna diferencia; SonarQube usa ambos términos como sinónimos de vulnerabilidad."
          ],
          "correcta": 0,
          "explicacion": "Los Bugs son errores funcionales probables (ej. NullPointerException). Los Code Smells (como literales duplicados o complejidad cognitiva excesiva) no rompen la aplicación en tiempo de ejecución, pero acumulan deuda técnica, violan Clean Code y dificultan la mantenibilidad."
    },
    {
          "id": 68,
          "capa": "repository",
          "capaNombre": "Capa de Persistencia & JPA",
          "fase": "fase-5",
          "faseNombre": "Fase 5: @Repository & JPA",
          "pregunta": "¿Cuál es la diferencia fundamental entre el término 'fetch' en JavaScript/Frontend y 'JOIN FETCH' en JPA/Hibernate?",
          "opciones": [
                "En JavaScript, fetch() es una función asíncrona de red HTTP basada en Promesas; en JPA, JOIN FETCH es una cláusula JPQL para recuperar entidades asociadas en una única consulta SQL y evitar el problema N+1.",
                "En JavaScript fetch se usa para conectar a bases de datos relacionales, mientras que en JPA JOIN FETCH es para enviar peticiones HTTP REST.",
                "Son exactamente la misma función compartida entre el backend y el frontend a través de Node.js.",
                "JOIN FETCH es una anotación de Spring Security para validar tokens JWT en el navegador."
          ],
          "correcta": 0,
          "explicacion": "En frontend (JS nativo), fetch() realiza peticiones de red al backend sin recargar la página. En backend (JPA/Hibernate), 'fetch' describe la estrategia de carga (LAZY vs EAGER) y 'JOIN FETCH' en JPQL indica a Hibernate que realice un JOIN para traer entidades relacionadas en una sola sentencia SQL."
    },
    {
          "id": 69,
          "capa": "service",
          "capaNombre": "Capa de Negocio (Service & Dominio)",
          "fase": "fase-4",
          "faseNombre": "Fase 4: @Service & Transacciones",
          "pregunta": "¿Por qué en un sistema de biblioteca es una buena práctica distinguir entre 'totalStock' y 'stock' disponible en la entidad Book?",
          "opciones": [
                "Porque 'totalStock' representa el patrimonio total de ejemplares adquiridos por la biblioteca, mientras que 'stock' indica las unidades físicas disponibles en estantería para ser prestadas en tiempo real.",
                "Porque 'totalStock' almacena el precio de los libros y 'stock' almacena el número de páginas.",
                "Porque Spring Data JPA exige obligatoriamente dos columnas de stock en todas las entidades relacionales.",
                "Porque 'totalStock' es una variable de sesión en memoria y 'stock' se guarda en el archivo pom.xml."
          ],
          "correcta": 0,
          "explicacion": "La distinción permite auditar el inventario físico total sin perder trazabilidad: cuando se concede un préstamo, se decrementa el stock disponible pero totalStock permanece inalterado. Además, la regla de negocio exige que stock jamás supere a totalStock (validado con @ValidStock)."
    }
  ],
  "retos": [
    {
      "id": "reto-mapper",
      "titulo": "Reto 1: Implementación del Mapper Manual Imperativo",
      "capa": "Capa DTO & Mappers",
      "enunciado": "Implementa el método `toResponseDTOList` dentro del mapper de la biblioteca. Requisito estricto de la rúbrica oficial: NO utilizar la API Stream de Java ni expresiones Lambda; debe implementarse con bucles for clásicos y validación de listas nulas.",
      "codigoInicial": "package com.studio.library.mapper;\n\nimport com.studio.library.dto.BookResponseDTO;\nimport com.studio.library.entity.Book;\nimport org.springframework.stereotype.Component;\nimport java.util.ArrayList;\nimport java.util.List;\n\n@Component\npublic class BookMapper {\n\n    public BookResponseDTO toResponseDTO(Book book) {\n        if (book == null) return null;\n        BookResponseDTO dto = new BookResponseDTO();\n        dto.setId(book.getId());\n        dto.setTitle(book.getTitle());\n        dto.setIsbn(book.getIsbn());\n        dto.setAvailableStock(book.getAvailableStock());\n        dto.setTotalStock(book.getTotalStock());\n        if (book.getAuthor() != null) {\n            dto.setAuthorName(book.getAuthor().getName());\n        }\n        return dto;\n    }\n\n    // TODO: Implementa este método usando bucle clásico for-each sin Streams\n    public List<BookResponseDTO> toResponseDTOList(List<Book> books) {\n        // Tu código aquí...\n    }\n}",
      "solucionModelo": "    public List<BookResponseDTO> toResponseDTOList(List<Book> books) {\n        List<BookResponseDTO> dtos = new ArrayList<>();\n        if (books == null || books.isEmpty()) {\n            return dtos;\n        }\n        for (Book book : books) {\n            if (book != null) {\n                dtos.add(toResponseDTO(book));\n            }\n        }\n        return dtos;\n    }",
      "explicacion": "El método inicializa una lista vacía para evitar retornar null (Null Safety). Comprueba si la lista de entrada es nula o vacía y recorre los elementos con un bucle for-each tradicional, transformando elemento a elemento con toResponseDTO()."
    },
    {
      "id": "reto-exception",
      "titulo": "Reto 2: Excepción Personalizada y Handler Global",
      "capa": "Capa Transversal / Errores",
      "enunciado": "Crea el método manejador para capturar la excepción `BookOutOfStockException` en el `GlobalExceptionHandler`, devolviendo un código HTTP 409 Conflict y el DTO estándar `ErrorResponse`.",
      "codigoInicial": "@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    // TODO: Anota este método con @ExceptionHandler para BookOutOfStockException\n    // y haz que retorne ResponseEntity<ErrorResponse> con HttpStatus.CONFLICT (409)\n    public ResponseEntity<ErrorResponse> handleOutOfStock(BookOutOfStockException ex, HttpServletRequest request) {\n        // Tu código aquí...\n    }\n}",
      "solucionModelo": "    @ExceptionHandler(BookOutOfStockException.class)\n    public ResponseEntity<ErrorResponse> handleOutOfStock(BookOutOfStockException ex, HttpServletRequest request) {\n        ErrorResponse error = new ErrorResponse(\n            LocalDateTime.now(),\n            HttpStatus.CONFLICT.value(),\n            \"Conflicto de Stock\",\n            ex.getMessage(),\n            request.getRequestURI()\n        );\n        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);\n    }",
      "explicacion": "El código HTTP 409 Conflict es el código semántico exacto para peticiones válidas en su formato pero que violan una regla del estado del negocio (no hay unidades físicas disponibles para formalizar el préstamo)."
    },
    {
      "id": "reto-test-mockito",
      "titulo": "Reto 3: Prueba Unitaria con Mockito y Verify",
      "capa": "Documentación & Pruebas",
      "enunciado": "Escribe un test unitario con JUnit 5 y Mockito para comprobar que al solicitar un libro existente por ID, el servicio lo busca en el repositorio, lo mapea y confirma con `verify()` que el repositorio fue consultado exactamente una vez.",
      "codigoInicial": "@ExtendWith(MockitoExtension.class)\nclass BookServiceImplTest {\n\n    @Mock\n    private BookRepository bookRepository;\n\n    @Mock\n    private BookMapper bookMapper;\n\n    @InjectMocks\n    private BookServiceImpl bookService;\n\n    @Test\n    void getBookById_WhenExists_ShouldReturnDTO() {\n        // GIVEN: Preparación de datos simulados\n        Long bookId = 1L;\n        Book mockBook = new Book(bookId, \"Clean Code\", \"978-0132350884\");\n        BookResponseDTO mockDTO = new BookResponseDTO(bookId, \"Clean Code\");\n\n        // TODO: Simula el comportamiento con when(...).thenReturn(...)\n        // TODO: Invoca a bookService.getBookById(bookId)\n        // TODO: Realiza las aserciones con assertEquals\n        // TODO: Verifica con Mockito.verify(...) que se llamó a bookRepository.findById(bookId)\n    }\n}",
      "solucionModelo": "    @Test\n    void getBookById_WhenExists_ShouldReturnDTO() {\n        // GIVEN\n        Long bookId = 1L;\n        Book mockBook = new Book(bookId, \"Clean Code\", \"978-0132350884\");\n        BookResponseDTO mockDTO = new BookResponseDTO(bookId, \"Clean Code\");\n\n        Mockito.when(bookRepository.findById(bookId)).thenReturn(Optional.of(mockBook));\n        Mockito.when(bookMapper.toResponseDTO(mockBook)).thenReturn(mockDTO);\n\n        // WHEN\n        BookResponseDTO result = bookService.getBookById(bookId);\n\n        // THEN\n        assertNotNull(result);\n        assertEquals(\"Clean Code\", result.getTitle());\n        Mockito.verify(bookRepository, Mockito.times(1)).findById(bookId);\n        Mockito.verify(bookMapper, Mockito.times(1)).toResponseDTO(mockBook);\n    }",
      "explicacion": "Sigue el patrón canónico GIVEN-WHEN-THEN. Con verify(..., times(1)) garantizamos que no se realicen consultas redundantes a la base de datos."
    }
  ],
  "cheatSheet": [
    {
      "categoria": "Anotaciones Spring Boot Core",
      "items": [
        {
          "nombre": "@SpringBootApplication",
          "descripcion": "Combina @Configuration, @EnableAutoConfiguration y @ComponentScan en la clase principal."
        },
        {
          "nombre": "@RestController",
          "descripcion": "Especialización de @Controller que incluye @ResponseBody en todos los métodos, retornando JSON directamente."
        },
        {
          "nombre": "@RequestMapping(\"/ruta\")",
          "descripcion": "Define el prefijo de URL base para todos los endpoints del controlador."
        },
        {
          "nombre": "@Service",
          "descripcion": "Marca una clase como componente de la capa de lógica de negocio."
        },
        {
          "nombre": "@Repository",
          "descripcion": "Marca componentes de persistencia y habilita la traducción automática de excepciones de base de datos."
        },
        {
          "nombre": "@Transactional",
          "descripcion": "Envuelve el método en una transacción de base de datos. Si se produce una RuntimeException, hace rollback automático."
        }
      ]
    },
    {
      "categoria": "Anotaciones JPA & Entidades",
      "items": [
        {
          "nombre": "@Entity y @Table(name=\"...\")",
          "descripcion": "Declara la clase como entidad persistente mapeada a una tabla relacional."
        },
        {
          "nombre": "@Id y @GeneratedValue(strategy=IDENTITY)",
          "descripcion": "Establece la clave primaria con generación autoincremental de base de datos."
        },
        {
          "nombre": "@Column(nullable=false, length=100)",
          "descripcion": "Personaliza restricciones de columna en la tabla física."
        },
        {
          "nombre": "@ManyToOne(fetch = FetchType.LAZY)",
          "descripcion": "Relación muchos a uno. La carga diferida (LAZY) evita traer la relación si no se consulta explícitamente."
        },
        {
          "nombre": "@JoinColumn(name=\"fk_id\")",
          "descripcion": "Especifica el nombre de la columna que almacena la foreign key."
        }
      ]
    },
    {
      "categoria": "Bean Validation & Robustez",
      "items": [
        {
          "nombre": "@Valid",
          "descripcion": "Activa la validación en cascada de los campos del DTO anotado en el Controller."
        },
        {
          "nombre": "@NotBlank",
          "descripcion": "Verifica que un String no sea nulo y contenga al menos un carácter no blanco."
        },
        {
          "nombre": "@NotNull",
          "descripcion": "Verifica que cualquier tipo de dato de objeto no sea nulo."
        },
        {
          "nombre": "@Min(0) / @Max(100)",
          "descripcion": "Restricciones numéricas de valor mínimo y máximo inclusivos."
        },
        {
          "nombre": "@Size(min=3, max=150)",
          "descripcion": "Restringe la longitud de cadenas de texto o colecciones."
        },
        {
          "nombre": "@RestControllerAdvice",
          "descripcion": "Interceptador global transversal para manejo centralizado de excepciones en toda la API."
        }
      ]
    },
    {
      "categoria": "Comandos Esenciales (Maven & Docker)",
      "items": [
        {
          "nombre": "mvn clean test",
          "descripcion": "Limpia el directorio target y ejecuta todas las pruebas unitarias y de integración."
        },
        {
          "nombre": "mvn spring-boot:run",
          "descripcion": "Compila y levanta la aplicación Spring Boot en el puerto configurado (ej: 8080)."
        },
        {
          "nombre": "mvn clean package -DskipTests",
          "descripcion": "Genera el archivo .jar ejecutable empaquetado omitiendo la suite de tests."
        },
        {
          "nombre": "docker build -t app:latest .",
          "descripcion": "Construye la imagen Docker a partir de las etapas del Dockerfile."
        },
        {
          "nombre": "docker run -p 8080:8080 --name mi-app app:latest",
          "descripcion": "Ejecuta el contenedor mapeando el puerto 8080 de tu Mac al puerto del contenedor."
        }
      ]
    }
  ],
  "apuntes": [
    {
      "numero": 1,
      "titulo": "Regla de Oro: ¡Las dependencias solo bajan, nunca suben!",
      "categoria": "Arquitectura & Gravedad de Software",
      "tutoria": "Apunte 1",
      "icono": "",
      "explicacion": "En una arquitectura por capas existe una \"fuerza de gravedad\": Presentación conoce a Negocio, Negocio conoce a Datos, pero Datos NUNCA debe saber que existe el Negocio, y el Negocio JAMÁS debe importar paquetes HTTP (HttpServletRequest o ResponseEntity). Si la capa de datos llama a la de negocio, has creado un acoplamiento circular que destruye la mantenibilidad."
    },
    {
      "numero": 2,
      "titulo": "El Dominio debe estar libre del \"pecado\" de Spring",
      "categoria": "Arquitectura Hexagonal (Ports & Adapters)",
      "tutoria": "Apunte 2",
      "icono": "",
      "explicacion": "En arquitectura hexagonal pura, la carpeta \"domain\" no debe tener NI UNA SOLA anotación de Spring ni de Hibernate (@Entity, @Table, @Service son ilegales en el dominio). El dominio son clases Java puras (POJOs). Los frameworks son herramientas desechables; tu lógica de negocio es el activo real de tu cliente."
    },
    {
      "numero": 3,
      "titulo": "El peligro mortal de @Data de Lombok en Entidades JPA",
      "categoria": "JPA & Trampas Ocultas",
      "tutoria": "Apunte 3",
      "icono": "",
      "explicacion": "@Data genera automáticamente toString(), equals() y hashCode() sobre TODOS los campos. Si tienes una relación bidireccional (@OneToMany libros <-> autor), al llamar a toString() o meter una entidad en un HashSet se produce un bucle recursivo infinito que desborda la pila (StackOverflowError). En entidades JPA solo se debe usar @Getter, @Setter y generar equals/hashCode manualmente basados en la clave de negocio o ID."
    },
    {
      "numero": 4,
      "titulo": "LazyInitializationException: El fantasma fuera de la transacción",
      "categoria": "Persistencia & Hibernate",
      "tutoria": "Apunte 4",
      "icono": "",
      "explicacion": "Si una relación es FetchType.LAZY y el método del Service termina, la sesión de Hibernate se cierra. Si luego en el Controller o en el Mapper intentas hacer \"libro.getAutor().getNombre()\", ¡BOOM! LazyInitializationException: could not initialize proxy - no Session. Solución de Isra: Haz JOIN FETCH en la consulta JPQL o asegura que el mapeo DTO se ejecute dentro del ámbito @Transactional del servicio."
    },
    {
      "numero": 5,
      "titulo": "Mappers manuales sin Streams: El test del desarrollador real",
      "categoria": "Calidad de Código & Rúbricas",
      "tutoria": "Apunte 5",
      "icono": "",
      "explicacion": "Muchos desarrolladores abusan de .stream().map(...).collect() sin entender qué pasa por debajo ni validar nulos. En las entrevistas y rúbricas de Java Backend Studio te piden mappers con bucles for clásicos para comprobar si dominas el control de flujo imperativo, la prevención de NullPointerException y la legibilidad sin magia sintáctica."
    },
    {
      "numero": 6,
      "titulo": "401 Unauthorized vs 403 Forbidden vs 409 Conflict",
      "categoria": "Protocolo HTTP Semántico",
      "tutoria": "Apunte 6",
      "icono": "",
      "explicacion": "401 en realidad significa \"Unauthenticated\": No sé quién eres porque no me has enviado el token JWT o está caducado. 403 Forbidden significa \"Te conozco, sé quién eres, pero tu rol (ej: ROLE_USER) no tiene permiso para borrar este libro\". Y 409 Conflict es el código perfecto cuando la petición es válida pero choca con el estado de la base de datos (por ejemplo, intentar prestar un libro con stock = 0)."
    },
    {
      "numero": 7,
      "titulo": "Levantar @SpringBootTest para un test unitario es un pecado de lentitud",
      "categoria": "Testing & Rendimiento",
      "tutoria": "Apunte 7",
      "icono": "",
      "explicacion": "Arrancar el contexto entero de Spring Boot (@SpringBootTest) tarda entre 4 y 15 segundos por test. Si tienes 500 tests, tu pipeline de despliegue tarda 2 horas. Con Mockito puro (@ExtendWith(MockitoExtension.class)) las pruebas unitarias se ejecutan en 10 milisegundos. Reserva @SpringBootTest exclusivamente para pruebas de integración de punta a punta."
    },
    {
      "numero": 8,
      "titulo": "Docker Multi-Stage: Compilar dentro del contenedor o morir en local",
      "categoria": "DevOps & Contenedores",
      "tutoria": "Apunte 8",
      "icono": "",
      "explicacion": "Si compilas el .jar en tu Mac con tu versión local de Java y luego solo copias el .jar en un Dockerfile simple, no es un despliegue reproducible (\"en mi máquina funciona\"). Con Multi-Stage Build, la primera etapa usa una imagen oficial de Maven para descargar librerías y compilar; la segunda etapa solo toma el binario generado y lo mete en un Alpine JRE ligero de 150MB. ¡Inmutabilidad total!"
    },
    {
      "numero": 9,
      "titulo": "Validación a Nivel de Clase (@ValidStock) para Reglas Multicampo",
      "categoria": "Validación Avanzada & Bean Validation",
      "tutoria": "Apunte 9",
      "icono": "",
      "explicacion": "Las anotaciones estándar como @NotNull o @Min solo validan un atributo aislado. Cuando una regla de negocio vincula dos campos del mismo objeto (por ejemplo, comprobar que availableStock <= totalStock), la validación debe realizarse a nivel de clase implementando un ConstraintValidator<ValidStock, BookRequestDto>. Esto garantiza que los payloads incoherentes se rechacen inmediatamente con HTTP 400 Bad Request antes de que lleguen a la capa de servicio o toquen la base de datos."
    },
    {
      "numero": 10,
      "titulo": "Desacoplamiento de DTOs con IDs Planos (categoryId y authorIds)",
      "categoria": "Diseño de DTOs & Contrato REST",
      "tutoria": "Apunte 10",
      "icono": "",
      "explicacion": "En lugar de recibir objetos anidados complejos en BookRequestDto para la categoría o los autores, la mejor práctica es recibir identificadores planos (Long categoryId y List<Long> authorIds). Esto desacopla al cliente de las entidades relacionales internas de JPA, evita problemas de cascadas no deseadas (CascadeType), simplifica el JSON enviado por el cliente y delega en el servicio la recuperación segura de las referencias reales."
    },
    {
      "numero": 11,
      "titulo": "Cálculo Dinámico de Estados (OVERDUE) en Mappers vs Tareas Programadas (@Scheduled)",
      "categoria": "Lógica de Negocio & Mappers",
      "tutoria": "Apunte 11",
      "icono": "",
      "explicacion": "Para calcular si un préstamo está fuera de plazo (OVERDUE), no es necesario implementar crons ni procesos en segundo plano con @Scheduled que saturen la CPU recalculando registros. La solución más limpia y eficiente es calcularlo al vuelo dentro de LoanMapper: si el estado persistido es ACTIVE y la fecha límite (dueDate) es anterior a LocalDate.now(), el mapper proyecta el DTO con estado OVERDUE sin coste de base de datos."
    },
    {
      "numero": 12,
      "titulo": "Dockerfile Seguro para Producción: Usuario No-Root y Tuning de Memoria Heap",
      "categoria": "DevOps & Contenedores",
      "tutoria": "Apunte 12",
      "icono": "",
      "explicacion": "En entornos productivos, un contenedor Docker jamás debe ejecutarse como usuario root. En el Dockerfile se añade RUN addgroup -S appgroup && adduser -S appuser -G appgroup seguido de USER appuser para mitigar vectores de escape del contenedor. Además, fijar ENV JAVA_OPTS=\"-Xms256m -Xmx512m\" previene que la JVM devore la memoria del host o sea eliminada súbitamente por el OOM Killer del sistema operativo."
    },
    {
      "numero": 13,
      "titulo": "Estrategia Dual de Base de Datos: H2 en Memoria (Desarrollo) vs MySQL (Producción)",
      "categoria": "Persistencia & Perfiles Spring",
      "tutoria": "Apunte 13",
      "icono": "",
      "explicacion": "Durante el desarrollo de la API de biblioteca, H2 en memoria (jdbc:h2:mem:librarydb) permite arrancar la aplicación en solo 2.2 segundos y probar endpoints sin dependencias de red ni credenciales externas. Para desplegar en entornos reales con Docker o Kubernetes, basta con activar el perfil con MySQL y ddl-auto=validate, asegurando que el esquema relacional sea gestionado mediante scripts SQL inmutables (init.sql)."
    }
  ]
};

export const STUDIO_DATA = ACCENTURE_DATA;
export const PROYECTOS = ACCENTURE_DATA.proyectos;
export const TEORIA_LIBRO = ACCENTURE_DATA.teoria;
export const TUTORIAS = ACCENTURE_DATA.frikadasIsra || ACCENTURE_DATA.apuntes;
export const ACTIVIDADES_META = ACCENTURE_DATA.actividades;
export const QUIZZES = ACCENTURE_DATA.quizzes;
export const RETOS = ACCENTURE_DATA.retos;
export const CHEATSHEET = ACCENTURE_DATA.cheatSheet;
