import{r as c,j as e}from"./vendor-react-B1CazfeU.js";import{A as l,Q as f}from"./JavaStudio-DVXSpIJz.js";import{b as S}from"./quizTheoryMapping-PdACHp5h.js";import{S as x}from"./StudioCodeBlock-CxJXErqf.js";import{S as A}from"./StudioAutoevaluacionQuiz-DteQR0LT.js";import{c as T,d as I,u as h,v as B,r as q,w as O,I as M,g as z,x as F,s as w}from"./StudioIcons-BAh4vAi2.js";import"./vendor-diagrams-BmImEzZ0.js";const L={1:{slug:"uso-ioc",tituloCorto:"Uso de IoC (Inversión de Control)",subtitulo:"Desacoplamiento mediante el contenedor IoC de Spring y configuración en XML",objetivo:'Comprender cómo Spring asume el control del ciclo de vida y la instanciación de objetos (Beans) en lugar de crearlos manualmente en el código mediante el operador "new".',problemaIngenieria:'En Java tradicional, cuando una clase necesita otra, hace `new ServicioConcreto()`. Esto genera un acoplamiento rígido: si queremos cambiar la implementación o falsearla para un test unitario, debemos modificar el código fuente del consumidor. La Inversión de Control (Principio de Hollywood: "no nos llames, nosotros te llamaremos") invierte este flujo dejando que un contenedor externo construya y suministre las instancias.',partes:[{nombre:"Parte 1: La Interfaz del Servicio (Contrato)",archivo:"GreetingService.java",explicacion:"Define el contrato público de operaciones que ofrece el servicio. El consumidor solo programa contra esta interfaz, sin saber qué clase concreta lo implementa ni cómo se instancia.",codigoFragmento:`public interface GreetingService {
    void greet(String name);
}`},{nombre:"Parte 2: La Clase Implementadora (Componente POJO)",archivo:"GreetingServiceImpl.java",explicacion:'Implementa la interfaz y define atributos configurables (como "prefix") con sus respectivos métodos setters. Es un POJO (Plain Old Java Object) sin ninguna anotación ni dependencia del framework Spring.',codigoFragmento:`public class GreetingServiceImpl implements GreetingService {
    private String prefix;

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public void greet(String name) {
        System.out.println(prefix + " " + name);
    }
}`},{nombre:"Parte 3: El Descriptor de Configuración IoC",archivo:"applicationContext.xml",explicacion:'Declara ante el contenedor qué Beans existen y qué valores inyectarles. Con la etiqueta <bean>, Spring lee el nombre de la clase, invoca su constructor por defecto e inyecta la propiedad "prefix" mediante reflexión.',codigoFragmento:`<beans xmlns="http://www.springframework.org/schema/beans" ...>
    <bean id="greetingService" class="com.studio.ioc.GreetingServiceImpl">
        <property name="prefix" value="¡Bienvenida al Bootcamp de Java Backend Studio!" />
    </bean>
</beans>`},{nombre:"Parte 4: El Contenedor ApplicationContext y Arranque",archivo:"MainApp.java",explicacion:"El ApplicationContext lee el XML del classpath, construye el grafo de dependencias en memoria y entrega la instancia gestionada cuando llamamos a getBean(). Al terminar, cerramos el contexto para liberar recursos.",codigoFragmento:`ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
GreetingService service = context.getBean("greetingService", GreetingService.class);
service.greet("Blanca");
((ClassPathXmlApplicationContext) context).close();`}],puntosDefensa:['¿Por qué usar IoC en lugar de "new"? Porque desacopla el qué del cómo. Permite cambiar implementaciones sin tocar el código del cliente y hace que las clases sean 100% testables con mocks.',"¿Qué es un Bean de Spring? Es un objeto Java instanciado, ensamblado y administrado en todo su ciclo de vida por el contenedor IoC de Spring.","¿Cuál es el scope por defecto de un Bean? Por defecto en Spring es Singleton (una única instancia compartida por todo el contenedor)."],erroresComunes:["Error de FileNotFoundException si applicationContext.xml no se ubica en la raíz de src/main/resources.",'Error de NoSuchBeanDefinitionException si el identificador pasado a getBean("id") no coincide exactamente con el atributo id del XML.',"Olvidar incluir un constructor por defecto o el setter correspondiente para la propiedad inyectada."],conexionProyectoFinal:"En TaskManager y Librería, aunque no usamos XML sino anotaciones modernas de Spring Boot, el principio es exactamente el mismo: TaskController no hace new TaskServiceImpl(), sino que Spring se lo entrega ya instanciado y configurado."},2:{slug:"uso-iod",tituloCorto:"Uso de IoD (Inyección de Dependencias)",subtitulo:"Inyección por constructor frente a inyección por setter en Spring Framework",objetivo:"Aprender cómo el contenedor de Spring ensambla objetos colaboradores conectando unos Beans con otros mediante constructor (<constructor-arg>) o mediante métodos setter (<property>).",problemaIngenieria:'Un objeto complejo casi nunca trabaja solo; necesita colaboradores (por ejemplo, un servicio de reportes necesita un impresor o logger). Si el objeto dependiente crea a su colaborador, queda rígidamente atado a él. Mediante IoD, el colaborador se "inyecta" desde el exterior, logrando una arquitectura modular y fácilmente reemplazable.',partes:[{nombre:"Parte 1: El Colaborador Secundario (Printer)",archivo:"PrinterService.java & ConsolePrinterService.java",explicacion:"Interfaz y clase que realiza una labor concreta (imprimir por consola). Será el Bean inyectado en el servicio principal.",codigoFragmento:`public interface PrinterService {
    void print(String message);
}

public class ConsolePrinterService implements PrinterService {
    @Override
    public void print(String message) { System.out.println("[PRINT] " + message); }
}`},{nombre:"Parte 2: Inyección por Constructor (<constructor-arg>)",archivo:"ReportService.java (Versión Constructor)",explicacion:"La dependencia se recibe como parámetro obligatorio del constructor. Garantiza que el objeto nunca quede en estado incompleto o nulo (inmutabilidad).",codigoFragmento:`public class ReportService {
    private final PrinterService printer;

    public ReportService(PrinterService printer) {
        this.printer = printer;
    }
    public void generateReport(String data) { printer.print("Reporte: " + data); }
}`},{nombre:"Parte 3: Inyección por Setter (<property>)",archivo:"ReportService.java (Versión Setter)",explicacion:"La dependencia se asigna a través de un método setter tras la instanciación. Es adecuada para dependencias opcionales o reconfigurables.",codigoFragmento:`public class ReportServiceSetter {
    private PrinterService printer;
    public void setPrinter(PrinterService printer) { this.printer = printer; }
}`},{nombre:"Parte 4: Cableado en XML",archivo:"applicationContext.xml",explicacion:'Spring primero instancia el Bean "printerService" y después lo pasa como referencia (ref) al constructor de un Bean y al setter del otro.',codigoFragmento:`<bean id="printerService" class="com.studio.iod.ConsolePrinterService" />

<bean id="reportConstructor" class="com.studio.iod.ReportService">
    <constructor-arg ref="printerService" />
</bean>

<bean id="reportSetter" class="com.studio.iod.ReportServiceSetter">
    <property name="printer" ref="printerService" />
</bean>`}],puntosDefensa:["¿Cuándo usar inyección por constructor y cuándo por setter? La inyección por constructor es la recomendación oficial de Spring para todas las dependencias obligatorias (garantiza inmutabilidad y previene NullPointerExceptions). El setter solo se reserva para dependencias opcionales.","¿Qué ocurre si hay dependencias circulares en constructor? Spring falla al arrancar arrojando BeanCurrentlyInCreationException, lo cual es una señal de mala arquitectura que obliga a desacoplar responsabilidades."],erroresComunes:["Confundir value (para literales/strings) con ref (para referencias a otros Beans en el XML).","Olvidar declarar el constructor explícito en Java cuando se configura <constructor-arg>."],conexionProyectoFinal:"En TaskManager, TaskController y TaskServiceImpl utilizan 100% inyección por constructor (generada mediante constructores Java puros), eliminando por completo la necesidad de @Autowired sobre campos."},3:{slug:"java-annotations",tituloCorto:"Uso de Java Annotations",subtitulo:"Escaneo de componentes, inyección declarativa y scopes (@Component, @Autowired, @Qualifier)",objetivo:"Reemplazar los descriptores XML por anotaciones de Java, dejando que Spring descubra automáticamente los componentes del proyecto mediante escaneo de paquetes.",problemaIngenieria:"Mantener archivos XML grandes en proyectos con cientos de clases es propenso a errores tipográficos y resulta tedioso. Las anotaciones de Java permiten definir la metadata de inyección directamente junto al código fuente de las clases.",partes:[{nombre:"Parte 1: Activación del Escaneo de Paquetes",archivo:"applicationContext.xml",explicacion:"Habilita el Component Scanning indicando el paquete raíz que Spring debe inspeccionar recursivamente.",codigoFragmento:`<beans ...>
    <context:component-scan base-package="com.studio.annotations" />
</beans>`},{nombre:"Parte 2: Registro de Componentes con @Component",archivo:"EmailNotificationService.java",explicacion:"Indica a Spring que esta clase es un Bean administrable. Spring creará una instancia singleton en su contexto.",codigoFragmento:`@Component("emailService")
public class EmailNotificationService implements NotificationService {
    @Override
    public void send(String msg) { System.out.println("Enviando Email: " + msg); }
}`},{nombre:"Parte 3: Desambiguación con @Qualifier",archivo:"SmsNotificationService.java",explicacion:"Cuando existen dos clases que implementan la misma interfaz (Email y SMS), @Qualifier indica explícitamente cuál inyectar para evitar conflictos de ambigüedad.",codigoFragmento:`@Component("smsService")
public class SmsNotificationService implements NotificationService {
    @Override
    public void send(String msg) { System.out.println("Enviando SMS: " + msg); }
}`},{nombre:"Parte 4: Inyección y Ciclo de Vida con @Scope",archivo:"UserManager.java",explicacion:"Inyecta la dependencia por constructor seleccionando la implementación con @Qualifier. La anotación @Scope define si es Singleton o Prototype.",codigoFragmento:`@Component
@Scope("singleton")
public class UserManager {
    private final NotificationService notifier;

    @Autowired
    public UserManager(@Qualifier("emailService") NotificationService notifier) {
        this.notifier = notifier;
    }
}`}],puntosDefensa:["¿Qué ocurre si dos beans implementan la misma interfaz y uso @Autowired sin @Qualifier? Spring arroja NoUniqueBeanDefinitionException porque no sabe cuál de los dos candidatos elegir.","¿Qué diferencia hay entre @Component, @Service, @Repository y @Controller? Todos son especializaciones de @Component. @Repository agrega traducción de excepciones de base de datos, @Service aporta semántica de capa de negocio y @Controller prepara la gestión web REST."],erroresComunes:["Ubicar clases fuera del paquete base declarado en el component scan, provocando que Spring no las detecte.","Uso de @Autowired sobre campos privados (Field Injection), lo cual dificulta los tests unitarios y rompe la inmutabilidad."],conexionProyectoFinal:"En TaskManager utilizamos @Service en TaskServiceImpl, @Repository en TaskRepository y @RestController en TaskController."},4:{slug:"configuraciones-spring",tituloCorto:"Distintas Configuraciones en Spring",subtitulo:"De XML a Java Config con @Configuration, @Bean y @PropertySource",objetivo:"Dominar la configuración de Spring basada 100% en código Java (Java Config), eliminando totalmente los archivos XML y controlando la creación de beans mediante métodos anotados con @Bean.",problemaIngenieria:"Cuando utilizamos librerías externas de terceros (como un cliente HTTP, ObjectMapper de Jackson o un DataSource), sus clases no están en nuestro código fuente, por lo que no podemos ponerles @Component. Java Config (@Configuration + @Bean) resuelve esto permitiendo instanciar y configurar cualquier objeto de terceros con código Java tipado.",partes:[{nombre:"Parte 1: La Clase @Configuration",archivo:"AppConfig.java",explicacion:"Define una clase de configuración que el contenedor procesará para registrar Beans. Se acompaña de @ComponentScan para buscar componentes propios.",codigoFragmento:`@Configuration
@ComponentScan(basePackages = "com.studio.config")
@PropertySource("classpath:app.properties")
public class AppConfig {
    // Métodos @Bean
}`},{nombre:"Parte 2: Declaración Explícita de Beans con @Bean",archivo:"AppConfig.java (continuación)",explicacion:"El método retorna la instancia. Spring intercepta la llamada y guarda el resultado en el contexto; las llamadas posteriores devuelven el mismo singleton.",codigoFragmento:`@Bean
public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule(new JavaTimeModule());
    return mapper;
}`},{nombre:"Parte 3: Inyección de Propiedades con @Value",archivo:"app.properties & AppConfig.java",explicacion:"Permite leer valores de configuración externos (URLs, timeouts, nombres de aplicación) sin hardcodearlos en el código.",codigoFragmento:`@Value("\${app.name:TaskManager}")
private String appName;

@Value("\${app.max-tasks:100}")
private int maxTasks;`},{nombre:"Parte 4: Inicialización con AnnotationConfigApplicationContext",archivo:"MainApp.java",explicacion:"Carga el contexto directamente a partir de la clase de configuración Java, sin necesidad de ningún fichero XML.",codigoFragmento:`ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
TaskService service = ctx.getBean(TaskService.class);
((AnnotationConfigApplicationContext) ctx).close();`}],puntosDefensa:["¿Por qué los métodos @Bean en una clase @Configuration no crean una nueva instancia cada vez que se llaman internamente? Porque Spring envuelve la clase de configuración con un proxy CGLIB que intercepta la llamada y retorna el bean singleton ya almacenado en caché en el ApplicationContext.","¿Qué ventaja tiene Java Config frente a XML? Validación en tiempo de compilación (type safety), refactorización automática en el IDE y soporte de lógica condicional en la creación de beans."],erroresComunes:["Olvidar la anotación @Configuration en la clase donde se definen los métodos @Bean.",'Sintaxis incorrecta en @Value("${propiedad}") (olvidar la llave de cierre o el signo de dólar).'],conexionProyectoFinal:"En TaskManager, la configuración de seguridad (SecurityConfig) y OpenAPI (OpenApiConfig) se definen exactamente con este mecanismo de @Configuration y @Bean."},5:{slug:"preparacion-entorno",tituloCorto:"Preparación del Entorno (taskmanager)",subtitulo:"Creación del proyecto Spring Boot, estructura de capas y configuración de H2",objetivo:"Iniciar el proyecto base TaskManager utilizando Spring Initializr, definiendo los starters esenciales (web, data-jpa, h2, validation, devtools, lombok) y organizando el árbol de paquetes según la arquitectura por capas.",problemaIngenieria:"Configurar un proyecto Java web desde cero tradicionalmente requería configurar Tomcat externo, dependencias Maven con versiones compatibles a mano, web.xml y decenas de configuraciones. Spring Boot resuelve esto con el concepto de Starter Dependencies y Autoconfiguración.",partes:[{nombre:"Parte 1: Gestión de Dependencias (pom.xml)",archivo:"pom.xml",explicacion:"El parent spring-boot-starter-parent define el BOM con versiones compatibles y plugins Maven listos para empaquetar un JAR ejecutable con Tomcat embebido.",codigoFragmento:`<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>`},{nombre:"Parte 2: La Anotación @SpringBootApplication",archivo:"TaskManagerApplication.java",explicacion:"Punto de entrada de la aplicación. Combina @SpringBootConfiguration, @EnableAutoConfiguration y @ComponentScan en el paquete raíz com.backend.taskmanager.",codigoFragmento:`@SpringBootApplication
public class TaskManagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskManagerApplication.class, args);
    }
}`},{nombre:"Parte 3: Configuración de Entorno (application.properties)",archivo:"src/main/resources/application.properties",explicacion:"Configura la base de datos H2 en memoria, la consola web de depuración y las directivas de Hibernate para auto-creación del esquema relacional.",codigoFragmento:`spring.application.name=taskmanager
server.port=8080
spring.datasource.url=jdbc:h2:mem:taskdb
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console`},{nombre:"Parte 4: Arquitectura de Paquetes",archivo:"Estructura de Directorios",explicacion:"Separación estricta de responsabilidades en subpaquetes: controller, service, repository, model, dto, mapper y exception.",codigoFragmento:`src/main/java/com/backend/taskmanager/
 ├── controller/
 ├── service/
 ├── repository/
 ├── model/
 ├── dto/
 ├── mapper/
 └── exception/`}],puntosDefensa:["¿Qué hace @EnableAutoConfiguration? Inspecciona el classpath del proyecto y las propiedades configuradas para registrar automáticamente los Beans necesarios (por ejemplo, si detecta H2 y JPA, configura automáticamente el DataSource y EntityManagerFactory).","¿Por qué usamos H2 en memoria durante el desarrollo? Porque permite arrancar y testear la aplicación de forma rápida y reproducible sin necesidad de instalar o mantener un servidor de base de datos externo."],erroresComunes:["Crear clases fuera del paquete donde reside @SpringBootApplication, quedando fuera del ComponentScan por defecto.","No habilitar spring.h2.console.enabled=true al intentar depurar tablas en el navegador."],conexionProyectoFinal:"Es la raíz sobre la que se construyen todas las demás actividades del proyecto TaskManager."},6:{slug:"creacion-controller-rest",tituloCorto:"Creación del Controller REST",subtitulo:"Exposición de endpoints HTTP, convención REST y semántica de códigos de estado",objetivo:"Implementar TaskController exponiendo un API REST completo con operaciones CRUD (GET, POST, PUT, DELETE), validación de payloads y códigos de estado HTTP correctos.",problemaIngenieria:"El frontend, apps móviles o servicios externos necesitan interactuar con el backend mediante HTTP. El controlador actúa como el adaptador web exterior: no debe ejecutar lógica de negocio ni comunicarse con la base de datos; su único rol es validar la entrada HTTP, delegar al servicio y transformar el resultado en una respuesta HTTP adecuada.",partes:[{nombre:"Parte 1: Definición del Controlador y Ruta Base",archivo:"TaskController.java",explicacion:"Uso de @RestController (combina @Controller + @ResponseBody) y @RequestMapping con versionado en la URL (/api/v1/tasks).",codigoFragmento:`@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private final TaskService taskService;
    // Inyección por constructor
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
}`},{nombre:"Parte 2: Endpoints de Consulta (GET)",archivo:"TaskController.java (continuación)",explicacion:"Mapea GET /api/v1/tasks para listado completo y GET /api/v1/tasks/{id} con @PathVariable para consulta por clave primaria.",codigoFragmento:`@GetMapping
public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
    return ResponseEntity.ok(taskService.getAllTasks());
}

@GetMapping("/{id}")
public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {
    return ResponseEntity.ok(taskService.getTaskById(id));
}`},{nombre:"Parte 3: Creación de Recursos (POST)",archivo:"TaskController.java (continuación)",explicacion:"Mapea POST /api/v1/tasks recibiendo el JSON con @RequestBody y activando Bean Validation con @Valid. Retorna código semántico 201 Created.",codigoFragmento:`@PostMapping
public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskRequestDTO dto) {
    TaskResponseDTO created = taskService.createTask(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}`},{nombre:"Parte 4: Actualización (PUT) y Eliminación (DELETE)",archivo:"TaskController.java (continuación)",explicacion:"PUT actualiza el recurso retornando 200 OK. DELETE elimina el recurso y retorna 204 No Content sin cuerpo.",codigoFragmento:`@PutMapping("/{id}")
public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequestDTO dto) {
    return ResponseEntity.ok(taskService.updateTask(id, dto));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
}`}],puntosDefensa:["¿Por qué retornar ResponseEntity en vez de devolver directamente el DTO? Porque ResponseEntity permite controlar de forma precisa el código de estado HTTP (201 Created, 204 No Content) y las cabeceras de respuesta (como Location).","¿Qué diferencia hay entre @PathVariable y @RequestParam? @PathVariable extrae valores embebidos en el path (/tasks/42), mientras que @RequestParam extrae parámetros de consulta en el query string (/tasks?completed=true)."],erroresComunes:["Olvidar la anotación @RequestBody en métodos POST/PUT, provocando que el DTO llegue con todos sus campos nulos.","Devolver siempre HTTP 200 OK en lugar de los códigos estándar REST como 201 Created o 204 No Content."],conexionProyectoFinal:"Es el componente real que reside en exercises/01-capa-controller/TaskController.java y atiende las peticiones del frontend."},7:{slug:"creacion-servicio",tituloCorto:"Creación de la Capa de Servicio",subtitulo:"Lógica de negocio, inyección de dependencias y gestión transaccional con @Transactional",objetivo:"Implementar TaskServiceImpl para concentrar las reglas de negocio, coordinar repositorios y mappers, y garantizar la atomicidad transaccional de las operaciones.",problemaIngenieria:"Si la lógica de negocio se escribe en el controlador, queda fuertemente acoplada a HTTP y no se puede reutilizar desde otros canales (CLI, mensajería, tareas programadas). Si se escribe en la entidad, queda acoplada al esquema de base de datos. La capa de servicio es el corazón de la aplicación donde residen las validaciones y procesos del negocio.",partes:[{nombre:"Parte 1: El Contrato de Negocio (TaskService)",archivo:"TaskService.java",explicacion:"Interfaz que define los casos de uso disponibles trabajando exclusivamente con DTOs.",codigoFragmento:`public interface TaskService {
    List<TaskResponseDTO> getAllTasks();
    TaskResponseDTO getTaskById(Long id);
    TaskResponseDTO createTask(TaskRequestDTO dto);
    TaskResponseDTO updateTask(Long id, TaskRequestDTO dto);
    void deleteTask(Long id);
}`},{nombre:"Parte 2: La Clase de Servicio y Dependencias",archivo:"TaskServiceImpl.java",explicacion:"Anotada con @Service. Recibe TaskRepository y TaskMapper por inyección en el constructor.",codigoFragmento:`@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }
}`},{nombre:"Parte 3: Regla de Negocio y Guardado Transaccional",archivo:"TaskServiceImpl.java (createTask)",explicacion:"Valida que no existan tareas duplicadas con el mismo título antes de guardar. Usa @Transactional para garantizar consistencia.",codigoFragmento:`@Override
@Transactional
public TaskResponseDTO createTask(TaskRequestDTO dto) {
    if (taskRepository.existsByTitleIgnoreCase(dto.title())) {
        throw new DuplicateTaskException("Ya existe una tarea con el título: " + dto.title());
    }
    Task entity = taskMapper.toEntity(dto);
    Task saved = taskRepository.save(entity);
    return taskMapper.toDTO(saved);
}`},{nombre:"Parte 4: Consultas de Solo Lectura",archivo:"TaskServiceImpl.java (getTaskById)",explicacion:"Marca la transacción como readOnly = true para optimizar el rendimiento de Hibernate (evita dirty checking en la sesión).",codigoFragmento:`@Override
@Transactional(readOnly = true)
public TaskResponseDTO getTaskById(Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException("Tarea no encontrada con ID: " + id));
    return taskMapper.toDTO(task);
}`}],puntosDefensa:["¿Qué ventaja tiene @Transactional(readOnly = true)? Indica a Hibernate que no necesita mantener copias en el Persistence Context para comprobar si las entidades fueron modificadas (dirty checking), reduciendo el consumo de CPU y memoria.","¿Qué excepciones activan el rollback automático en @Transactional? Por defecto solo las RuntimeException (no verificadas) y los Error. Si una excepción es checked (Exception), no hace rollback salvo que se especifique @Transactional(rollbackFor = Exception.class)."],erroresComunes:["Llamar a un método @Transactional desde otro método dentro de la misma clase (self-invocation), lo que bypassea el proxy de Spring y no abre transacción.","Atrapar una RuntimeException con try/catch en el servicio y no relanzarla, silenciando el fallo e impidiendo el rollback."],conexionProyectoFinal:"Se encuentra implementado en exercises/02-capa-service/TaskServiceImpl.java."},8:{slug:"introduccion-jpa",tituloCorto:"Introducción a JPA y Modelado de Entidades",subtitulo:"Mapeo Objeto-Relacional (ORM) con anotaciones Jakarta Persistence (@Entity, @Table, @Id)",objetivo:"Modelar la entidad Task mapeando los tipos de datos Java a tipos SQL de base de datos relacional y definiendo restricciones de integridad.",problemaIngenieria:"Los desarrolladores piensan en objetos y relaciones, mientras que las bases de datos relacionales almacenan filas y columnas en tablas. JPA (Java Persistence API / Jakarta Persistence) define el estándar para mapear clases de Java a tablas de base de datos relacionales mediante metadatos.",partes:[{nombre:"Parte 1: Declaración de Entidad y Tabla",archivo:"Task.java",explicacion:"Marca la clase como entidad persistente y asocia el nombre físico de la tabla en base de datos.",codigoFragmento:`@Entity
@Table(name = "tasks")
public class Task {
    // Atributos y Mapeos
}`},{nombre:"Parte 2: Clave Primaria Autoincremental",archivo:"Task.java (continuación)",explicacion:"La anotación @Id identifica la clave primaria. GenerationType.IDENTITY delega la generación de IDs autoincrementales a la base de datos (AUTO_INCREMENT).",codigoFragmento:`@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;`},{nombre:"Parte 3: Restricciones de Columnas SQL",archivo:"Task.java (continuación)",explicacion:"Configura propiedades de la columna física: tamaño máximo, no nulidad y unicidad.",codigoFragmento:`@Column(name = "title", nullable = false, length = 150)
private String title;

@Column(name = "description", length = 1000)
private String description;

@Column(name = "completed", nullable = false)
private boolean completed = false;

@Column(name = "due_date")
private LocalDate dueDate;`},{nombre:"Parte 4: Requisitos Obligatorios de JPA",archivo:"Task.java (continuación)",explicacion:"JPA requiere obligatoriamente un constructor sin argumentos (vacío) con visibilidad pública o protegida para instanciar la entidad mediante reflexión.",codigoFragmento:`// Constructor vacío obligatorio para Hibernate
protected Task() {}

public Task(String title, String description, LocalDate dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
}`}],puntosDefensa:["¿Por qué JPA exige un constructor sin argumentos? Porque cuando Hibernate recupera un registro de la base de datos, primero crea el objeto llamando al constructor vacío por reflexión y luego puebla los atributos con los datos de las columnas.","¿Por qué es mala práctica usar Lombok @Data sobre entidades JPA? Porque genera métodos equals, hashCode y toString automáticos que incluyen todas las relaciones. En relaciones bidireccionales esto provoca bucles infinitos (StackOverflowError) y rompe la semántica de colecciones en memoria."],erroresComunes:["Olvidar el constructor vacío protected o public.","Usar tipos primitivos (boolean, int) sin considerar si la columna en base de datos permite valores NULL (preferir Boolean / Integer si es nullable)."],conexionProyectoFinal:"Representa la tabla central del proyecto TaskManager y se coordina con TaskRepository."},9:{slug:"spring-data-jpa",tituloCorto:"Uso de Spring Data JPA",subtitulo:"Repositorios automáticos, Query Methods y consultas declarativas (@Query)",objetivo:"Implementar TaskRepository extendiendo JpaRepository para obtener operaciones CRUD completas y definir métodos de consulta derivados sin escribir SQL manual.",problemaIngenieria:"Escribir clases DAO tradicionales requería cientos de líneas de JDBC o Hibernate boilerplate: abrir conexiones, preparar sentencias SQL, mapear ResultSets y gestionar transacciones. Spring Data JPA elimina todo ese código generando las implementaciones dinámicamente en tiempo de ejecución.",partes:[{nombre:"Parte 1: Declaración del Repositorio",archivo:"TaskRepository.java",explicacion:"Al extender JpaRepository<Task, Long>, Spring Data proporciona automáticamente más de 20 métodos CRUD listos para usar (save, findById, findAll, deleteById, count, existsById).",codigoFragmento:`@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Métodos derivados
}`},{nombre:"Parte 2: Query Methods (Derivados por Nombre)",archivo:"TaskRepository.java (continuación)",explicacion:"Spring Data analiza el nombre del método y genera la consulta SQL subyacente automáticamente.",codigoFragmento:`// Genera: SELECT * FROM tasks WHERE completed = ?
List<Task> findByCompleted(boolean completed);

// Genera: SELECT COUNT(*) > 0 FROM tasks WHERE LOWER(title) = LOWER(?)
boolean existsByTitleIgnoreCase(String title);`},{nombre:"Parte 3: Consultas con JPQL Personalizado (@Query)",archivo:"TaskRepository.java (continuación)",explicacion:"Permite definir consultas complejas orientadas a objetos (JPQL) independientes del motor de base de datos relacional (H2, MySQL, PostgreSQL).",codigoFragmento:`@Query("SELECT t FROM Task t WHERE t.dueDate < :today AND t.completed = false")
List<Task> findOverdueTasks(@Param("today") LocalDate today);`},{nombre:"Parte 4: Paginación y Ordenación Eficiente",archivo:"TaskRepository.java (continuación)",explicacion:"Añadir un parámetro Pageable permite limitar y paginar resultados a nivel de base de datos (LIMIT / OFFSET en SQL).",codigoFragmento:"Page<Task> findByCompleted(boolean completed, Pageable pageable);"}],puntosDefensa:["¿Cómo sabe Spring Data qué consulta generar a partir del nombre del método? El parser de Spring Data descompone el nombre del método en prefijos (findBy, existsBy, countBy) y criterios (TitleIgnoreCase, Completed), traduciéndolos directamente al árbol sintáctico de la consulta.","¿Qué diferencia hay entre JpaRepository y CrudRepository? JpaRepository extiende PagingAndSortingRepository (y este a CrudRepository) y añade métodos específicos de JPA como flush(), saveAndFlush() y borrado por lotes."],erroresComunes:["Escribir mal el nombre de la propiedad en un query method (ejemplo: findByTitulo cuando la propiedad en Java se llama title), lo que causa un error fatal al arrancar Spring.","No usar Pageable en tablas grandes, lo que puede provocar OutOfMemoryError al cargar miles de registros en la memoria JVM."],conexionProyectoFinal:"Se encuentra en exercises/03-capa-repository/TaskRepository.java."},10:{slug:"dtos-y-mappers",tituloCorto:"Creación de los DTOs y Mappers",subtitulo:"Aislamiento de la capa de persistencia mediante Java Records y Mappers dedicados",objetivo:"Implementar el patrón DTO utilizando Java Records inmutables y crear TaskMapper para transformar bidireccionalmente entre entidades JPA y DTOs.",problemaIngenieria:"Exponer entidades JPA directamente en los controladores web (@RestController) es un grave antipatrón que provoca: 1) Fuga de datos sensibles, 2) Vulnerabilidades de asignación masiva (Mass Assignment), 3) Dependencias circulares al serializar a JSON, y 4) Acoplamiento rígido entre el contrato del API y el esquema de base de datos.",partes:[{nombre:"Parte 1: DTO de Entrada Inmutable (Request)",archivo:"TaskRequestDTO.java",explicacion:"Java Record que encapsula los datos que el cliente debe enviar para crear o modificar una tarea. No incluye ID ni campos calculados por el servidor.",codigoFragmento:`public record TaskRequestDTO(
    @NotBlank(message = "El título es obligatorio")
    @Size(min = 3, max = 150, message = "El título debe tener entre 3 y 150 caracteres")
    String title,

    @Size(max = 1000, message = "La descripción no puede superar 1000 caracteres")
    String description,

    @FutureOrPresent(message = "La fecha límite debe ser hoy o en el futuro")
    LocalDate dueDate
) {}`},{nombre:"Parte 2: DTO de Salida (Response)",archivo:"TaskResponseDTO.java",explicacion:"Java Record que define exactamente la estructura JSON que el cliente recibirá, incluyendo ID y estado de completitud.",codigoFragmento:`public record TaskResponseDTO(
    Long id,
    String title,
    String description,
    boolean completed,
    LocalDate dueDate
) {}`},{nombre:"Parte 3: El Componente Mapper (@Component)",archivo:"TaskMapper.java",explicacion:"Transforma objetos de un modelo a otro con métodos explícitos toEntity() y toDTO(), centralizando la lógica de mapeo en un único lugar testeable.",codigoFragmento:`@Component
public class TaskMapper {
    public Task toEntity(TaskRequestDTO dto) {
        if (dto == null) return null;
        return new Task(dto.title(), dto.description(), dto.dueDate());
    }

    public TaskResponseDTO toDTO(Task entity) {
        if (entity == null) return null;
        return new TaskResponseDTO(
            entity.getId(),
            entity.getTitle(),
            entity.getDescription(),
            entity.isCompleted(),
            entity.getDueDate()
        );
    }
}`},{nombre:"Parte 4: Uso en la Capa de Servicio",archivo:"TaskServiceImpl.java",explicacion:"El servicio recibe el DTO de entrada, lo convierte a Entidad con el mapper, persiste con el repositorio y devuelve el DTO de salida.",codigoFragmento:`Task task = taskMapper.toEntity(requestDTO);
Task saved = taskRepository.save(task);
return taskMapper.toDTO(saved);`}],puntosDefensa:["¿Por qué usar Java Records para los DTOs? Porque los records son inmutables por diseño, libres de boilerplate (generan automáticamente constructor canónico, getters accesores, equals, hashCode y toString) y representan fielmente datos portadores de valor.","¿Qué problema causa serializar directamente una entidad JPA con Jackson? Si la entidad tiene relaciones bidireccionales (@OneToMany / @ManyToOne), Jackson entrará en un bucle recursivo infinito provocando StackOverflowError. Los DTOs cortan de raíz este problema."],erroresComunes:["Modificar la entidad directamente con los datos de un DTO sin validar previamente su contenido.","Permitir que el DTO de entrada acepte campos de control como id o completed que solo el backend debe gestionar."],conexionProyectoFinal:"Se encuentra en exercises/04-capa-dto-mapper/TaskMapper.java."},11:{slug:"validaciones-bean-validation",tituloCorto:"Uso de Validaciones (Bean Validation)",subtitulo:"Reglas declarativas con Jakarta Validation y control en frontera con @Valid",objetivo:"Aplicar validaciones automáticas sobre los payloads JSON de entrada mediante anotaciones estándar como @NotBlank, @Size y @FutureOrPresent, impidiendo que datos inválidos lleguen a la capa de servicio.",problemaIngenieria:"Escribir comprobaciones de `if (title == null || title.trim().isEmpty())` en cada método de servicio ensucia la lógica de negocio y duplica código. Bean Validation permite declarar las restricciones de datos directamente en las propiedades del DTO de forma estandarizada y declarativa.",partes:[{nombre:"Parte 1: Dependencia de Validación en Maven",archivo:"pom.xml",explicacion:"Incluye el starter oficial que incorpora Hibernate Validator y la especificación Jakarta Validation.",codigoFragmento:`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`},{nombre:"Parte 2: Anotaciones Declarativas en el DTO",archivo:"TaskRequestDTO.java",explicacion:"Define reglas con mensajes de error descriptivos listos para internacionalización o consumo directo por el frontend.",codigoFragmento:`public record TaskRequestDTO(
    @NotBlank(message = "El título de la tarea no puede estar vacío")
    @Size(min = 3, max = 150, message = "El título debe contener entre 3 y 150 caracteres")
    String title,

    @Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres")
    String description,

    @FutureOrPresent(message = "La fecha límite debe ser igual o posterior a hoy")
    LocalDate dueDate
) {}`},{nombre:"Parte 3: Activación en el Endpoint con @Valid",archivo:"TaskController.java",explicacion:"Al anteponer @Valid a @RequestBody, Spring intercepta el JSON antes de entrar al cuerpo del método. Si hay fallos de validación, lanza automáticamente MethodArgumentNotValidException sin llegar a ejecutar el método.",codigoFragmento:`@PostMapping
public ResponseEntity<TaskResponseDTO> createTask(
    @Valid @RequestBody TaskRequestDTO dto
) {
    return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(dto));
}`},{nombre:"Parte 4: Flujo de Interrupción Automático",archivo:"Ciclo de Petición",explicacion:"Si title viene vacío, Spring aborta la petición con HTTP 400 Bad Request. La base de datos y la capa de servicio nunca se enteran ni reciben datos basura.",codigoFragmento:`POST /api/v1/tasks
{
  "title": ""
}
--> HTTP/1.1 400 Bad Request`}],puntosDefensa:['¿Qué diferencia hay entre @NotNull, @NotEmpty y @NotBlank? @NotNull solo comprueba que la referencia no sea null (permite cadenas vacías ""). @NotEmpty comprueba que no sea null y que length > 0 (permite cadenas con espacios " "). @NotBlank comprueba que no sea null y que tras hacer trim() contenga al menos un carácter visible. Para Strings siempre se debe usar @NotBlank.',"¿Qué ocurre si no pongo @Valid en el @RequestBody? Las anotaciones declaradas en el DTO son totalmente ignoradas y el payload se procesa sin ninguna validación."],erroresComunes:["Usar @NotNull en lugar de @NotBlank en campos de texto String.","No combinar Bean Validation con un @RestControllerAdvice para devolver un JSON de errores comprensible."],conexionProyectoFinal:"Se integra en todos los endpoints de escritura (POST y PUT) de TaskManager y Librería."},12:{slug:"manejo-global-errores",tituloCorto:"Manejo Global de Errores (@RestControllerAdvice)",subtitulo:"Captura centralizada de excepciones, respuestas semánticas y estándar RFC 7807",objetivo:"Implementar GlobalExceptionHandler mediante @RestControllerAdvice para interceptar excepciones de negocio y de validación, transformándolas en respuestas JSON estructuradas con códigos HTTP semánticos.",problemaIngenieria:'Sin un manejador global, cualquier excepción no controlada provoca que Spring Boot devuelva una página de error genérica ("Whitelabel Error Page") o un stacktrace completo de Java, lo cual es inseguro (expone rutas internas y versiones) y genera una pésima experiencia para el frontend.',partes:[{nombre:"Parte 1: Excepciones de Negocio Personalizadas",archivo:"TaskNotFoundException.java & DuplicateTaskException.java",explicacion:"Extienden RuntimeException para indicar situaciones anómalas del dominio sin ensuciar las firmas de los métodos.",codigoFragmento:`public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String message) { super(message); }
}

public class DuplicateTaskException extends RuntimeException {
    public DuplicateTaskException(String message) { super(message); }
}`},{nombre:"Parte 2: La Anotación @RestControllerAdvice",archivo:"GlobalExceptionHandler.java",explicacion:"Aplica el patrón de diseño Interceptor / Aspect-Oriented Programming (AOP). Escucha todas las excepciones que emergen de cualquier @RestController.",codigoFragmento:`@RestControllerAdvice
public class GlobalExceptionHandler {
    // Métodos @ExceptionHandler
}`},{nombre:"Parte 3: Mapeo de Códigos HTTP Específicos",archivo:"GlobalExceptionHandler.java (continuación)",explicacion:"Mapea TaskNotFoundException a 404 NOT FOUND y DuplicateTaskException a 409 CONFLICT.",codigoFragmento:`@ExceptionHandler(TaskNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(TaskNotFoundException ex, HttpServletRequest req) {
    ErrorResponse err = new ErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "Not Found", ex.getMessage(), req.getRequestURI());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
}

@ExceptionHandler(DuplicateTaskException.class)
public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateTaskException ex, HttpServletRequest req) {
    ErrorResponse err = new ErrorResponse(LocalDateTime.now(), HttpStatus.CONFLICT.value(), "Conflict", ex.getMessage(), req.getRequestURI());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
}`},{nombre:"Parte 4: Captura de Errores de Validación Bean Validation",archivo:"GlobalExceptionHandler.java (continuación)",explicacion:"Captura MethodArgumentNotValidException y extrae una lista limpia con el nombre de cada campo fallido y su mensaje de error.",codigoFragmento:`@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
    Map<String, String> fieldErrors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(err -> fieldErrors.put(err.getField(), err.getDefaultMessage()));
    
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("status", 400);
    body.put("errors", fieldErrors);
    return ResponseEntity.badRequest().body(body);
}`}],puntosDefensa:["¿Por qué usar @RestControllerAdvice en vez de try/catch en cada método del Controller? Porque elimina la duplicación masiva de código (DRY), desacopla el manejo de fallos del flujo normal y garantiza que ningún error escape sin una respuesta JSON estandarizada.","¿Qué es el estándar Problem Details (RFC 7807)? Es la especificación oficial de la IETF que define un formato JSON estándar para reportar errores en APIs HTTP (campos type, title, status, detail, instance)."],erroresComunes:['Devolver siempre código HTTP 500 para errores del cliente como "recurso no encontrado" (404) o "datos inválidos" (400).',"Filtrar mensajes técnicos de la base de datos (como sentencias SQL) en la respuesta de error al cliente."],conexionProyectoFinal:"Se encuentra en exercises/05-capa-exceptions/GlobalExceptionHandler.java."},13:{slug:"documentacion-openapi-swagger",tituloCorto:"Documentación de la API con OpenAPI / Swagger",subtitulo:"Especificación viva OpenAPI 3.0, anotaciones @Operation y UI interactiva en navegador",objetivo:"Integrar springdoc-openapi para generar automáticamente la documentación interactiva de la API accesible en /swagger-ui.html.",problemaIngenieria:"La documentación manual en documentos PDF o wikis se desactualiza en cuanto el código cambia. OpenAPI genera la documentación dinámicamente a partir del propio código y anotaciones de Java, garantizando que el contrato de la API siempre coincida al 100% con la implementación real.",partes:[{nombre:"Parte 1: Dependencia Springdoc OpenAPI",archivo:"pom.xml",explicacion:"Incorpora la librería que auto-inspecciona los controladores Spring MVC y genera los endpoints /v3/api-docs y /swagger-ui.html.",codigoFragmento:`<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>`},{nombre:"Parte 2: Metadatos Globales de la API",archivo:"OpenApiConfig.java",explicacion:"Define el título, versión semántica, descripción y datos de contacto de la API.",codigoFragmento:`@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
            .title("TaskManager API")
            .version("v1.0")
            .description("API REST para gestión de tareas con Spring Boot y Arquitectura por Capas"));
    }
}`},{nombre:"Parte 3: Documentación de Operaciones (@Operation)",archivo:"TaskController.java",explicacion:"Describe qué hace cada endpoint y detalla los códigos de respuesta esperados.",codigoFragmento:`@Operation(summary = "Crear nueva tarea", description = "Registra una tarea en la base de datos tras validar los campos")
@ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "Tarea creada con éxito"),
    @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
    @ApiResponse(responseCode = "409", description = "Título de tarea duplicado")
})
@PostMapping
public ResponseEntity<TaskResponseDTO> createTask(...) { ... }`},{nombre:"Parte 4: Documentación de Esquemas en DTOs (@Schema)",archivo:"TaskRequestDTO.java",explicacion:"Muestra ejemplos de payloads reales y descripciones de campos en la interfaz visual de Swagger.",codigoFragmento:`public record TaskRequestDTO(
    @Schema(description = "Título descriptivo de la tarea", example = "Estudiar Mockito")
    String title,
    @Schema(description = "Detalle adicional opcional", example = "Repasar anotaciones @Mock")
    String description,
    @Schema(description = "Fecha límite", example = "2026-12-01")
    LocalDate dueDate
) {}`}],puntosDefensa:["¿Qué ventaja aporta Swagger UI al equipo de frontend? Permite explorar todos los endpoints disponibles, ver el formato exacto del JSON requerido y probar peticiones en vivo directamente desde el navegador sin necesidad de herramientas externas como Postman.",'¿Cómo se documenta la autenticación JWT en OpenAPI? Mediante un @SecurityScheme de tipo HTTP y bearerFormat = "JWT", lo que añade el botón "Authorize" en Swagger UI para probar endpoints protegidos con token.'],erroresComunes:["Bloquear las rutas de Swagger (/swagger-ui/** y /v3/api-docs/**) en Spring Security por no dejarlas como públicas en permitAll().","No documentar los códigos de error posibles (400, 404, 409), haciendo que el frontend desconozca qué errores pueden suceder."],conexionProyectoFinal:"Disponible en la URL local http://localhost:8080/swagger-ui.html cuando la aplicación está en ejecución."},14:{slug:"pruebas-junit-mockito",tituloCorto:"Pruebas en Aplicaciones Spring Boot (JUnit 5 & Mockito)",subtitulo:"Testing unitario con @ExtendWith(MockitoExtension.class), @Mock, @InjectMocks y verify()",objetivo:"Escribir pruebas unitarias exhaustivas para TaskServiceImpl falseando las dependencias externas (TaskRepository y TaskMapper) con Mockito y validando el patrón AAA (Arrange, Act, Assert).",problemaIngenieria:"Probar la lógica de un servicio levantando Spring Boot y una base de datos real es lento (tarda segundos en iniciar) y frágil (depende del estado de la base de datos). Las pruebas unitarias con mocks se ejecutan en memoria en milisegundos, permitiendo validar casos borde y errores sin dependencias externas.",partes:[{nombre:"Parte 1: Inicialización con MockitoExtension",archivo:"TaskServiceImplTest.java",explicacion:"Anotada con @ExtendWith(MockitoExtension.class). No levanta el contexto de Spring; se ejecuta como código Java puro a máxima velocidad.",codigoFragmento:`@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {
    @Mock
    private TaskRepository taskRepository;
    @Mock
    private TaskMapper taskMapper;
    @InjectMocks
    private TaskServiceImpl taskService;
}`},{nombre:"Parte 2: Caso de Éxito con Patrón AAA",archivo:"TaskServiceImplTest.java (testCreateTask_Success)",explicacion:"Arrange (preparar mocks con when), Act (ejecutar método del servicio) y Assert (verificar resultado con AssertJ).",codigoFragmento:`@Test
void shouldCreateTaskSuccessfully() {
    // Arrange
    TaskRequestDTO request = new TaskRequestDTO("Aprender Mockito", "Detalle", LocalDate.now());
    Task taskEntity = new Task("Aprender Mockito", "Detalle", LocalDate.now());
    Task savedEntity = new Task("Aprender Mockito", "Detalle", LocalDate.now());
    TaskResponseDTO expectedDTO = new TaskResponseDTO(1L, "Aprender Mockito", "Detalle", false, LocalDate.now());

    when(taskRepository.existsByTitleIgnoreCase(request.title())).thenReturn(false);
    when(taskMapper.toEntity(request)).thenReturn(taskEntity);
    when(taskRepository.save(taskEntity)).thenReturn(savedEntity);
    when(taskMapper.toDTO(savedEntity)).thenReturn(expectedDTO);

    // Act
    TaskResponseDTO result = taskService.createTask(request);

    // Assert
    assertThat(result).isNotNull();
    assertThat(result.id()).isEqualTo(1L);
    verify(taskRepository, times(1)).save(taskEntity);
}`},{nombre:"Parte 3: Caso de Error y Lanzamiento de Excepciones",archivo:"TaskServiceImplTest.java (testCreateTask_Duplicate)",explicacion:"Verifica que el servicio lance la excepción adecuada ante datos duplicados y que jamás intente guardar en el repositorio.",codigoFragmento:`@Test
void shouldThrowDuplicateTaskExceptionWhenTitleExists() {
    // Arrange
    TaskRequestDTO request = new TaskRequestDTO("Duplicado", "Detalle", null);
    when(taskRepository.existsByTitleIgnoreCase("Duplicado")).thenReturn(true);

    // Act & Assert
    assertThatThrownBy(() -> taskService.createTask(request))
        .isInstanceOf(DuplicateTaskException.class)
        .hasMessageContaining("Duplicado");

    // Verificar que NUNCA se guardó nada
    verify(taskRepository, never()).save(any());
}`},{nombre:"Parte 4: Verificación de Interacciones con verify()",archivo:"TaskServiceImplTest.java (testDeleteTask)",explicacion:"Asegura que el método repository.deleteById() se invocó con el identificador correcto.",codigoFragmento:`@Test
void shouldDeleteTaskWhenExists() {
    when(taskRepository.existsById(1L)).thenReturn(true);
    taskService.deleteTask(1L);
    verify(taskRepository).deleteById(1L);
}`}],puntosDefensa:["¿Qué diferencia hay entre @Mock y @InjectMocks? @Mock crea un objeto doble ficticio cuyas respuestas controlamos con when(). @InjectMocks crea una instancia real de la clase que estamos probando e inyecta en ella los @Mock creados anteriormente.","¿Por qué usar @ExtendWith(MockitoExtension.class) en lugar de @SpringBootTest para pruebas unitarias? Porque @SpringBootTest levanta el contenedor completo de Spring con todos los beans (tardando varios segundos), mientras que MockitoExtension solo inicializa objetos en memoria sin contexto de Spring, ejecutando decenas de tests en milisegundos."],erroresComunes:["No usar verify(repository, never()).save(...) al testear flujos donde debe lanzarse una excepción previa.","Usar @SpringBootTest para probar métodos simples de un servicio que no necesitan integración real."],conexionProyectoFinal:"Se encuentra en exercises/07-testing-mockito/TaskServiceImplTest.java."},15:{slug:"seguridad-jwt",tituloCorto:"Seguridad con Spring Security y JWT",subtitulo:"Filtro stateless OncePerRequestFilter, tokens HMAC-SHA256 y SecurityFilterChain",objetivo:"Proteger la API mediante Spring Security y autenticación Stateless basada en tokens JSON Web Token (JWT).",problemaIngenieria:"Las APIs RESTful deben ser Stateless (sin estado): el servidor no guarda sesiones HTTP en memoria para poder escalar horizontalmente en clústeres. El cliente debe enviar en cada petición una credencial criptográficamente firmada (JWT en la cabecera Authorization: Bearer <token>) que el backend valida de forma autónoma sin consultar base de datos en cada llamada.",partes:[{nombre:"Parte 1: Dependencias de Seguridad y JWT",archivo:"pom.xml",explicacion:"Incorpora el starter de seguridad y la biblioteca JJWT para parseo y validación de tokens.",codigoFragmento:`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>`},{nombre:"Parte 2: Cadena de Filtros de Seguridad (SecurityConfig)",archivo:"SecurityConfig.java",explicacion:"Desactiva CSRF (innecesario en APIs stateless), establece sesión STATELESS y define qué endpoints son públicos (login, registro, swagger) y cuáles requieren autenticación.",codigoFragmento:`@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}`},{nombre:"Parte 3: El Filtro Personalizado OncePerRequestFilter",archivo:"JwtAuthFilter.java",explicacion:"Intercepta cada petición HTTP, extrae la cabecera Authorization, valida la firma del token y registra la autenticación en el SecurityContextHolder.",codigoFragmento:`@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtService.isTokenValid(token)) {
                String username = jwtService.extractUsername(token);
                UserDetails user = userDetailsService.loadUserByUsername(username);
                var auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(request, response);
    }
}`},{nombre:"Parte 4: Cifrado Seguro de Contraseñas",archivo:"SecurityConfig.java (PasswordEncoder)",explicacion:"Utiliza el algoritmo BCrypt para realizar hashing unidireccional con salt dinámico de las contraseñas antes de almacenarlas.",codigoFragmento:`@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`}],puntosDefensa:["¿Por qué se desactiva CSRF en APIs REST con JWT? CSRF (Cross-Site Request Forgery) se aprovecha de que los navegadores envían automáticamente las cookies de sesión en peticiones cruzadas. Como en una API REST con JWT no usamos cookies sino la cabecera Authorization: Bearer explícita, la API es inmune a ataques CSRF por naturaleza.","¿Qué contiene un JWT? Consta de 3 partes separadas por puntos (Header.Payload.Signature). El Header indica el algoritmo, el Payload contiene los claims (usuario, roles, caducidad) y la Signature es el hash criptográfico calculado con la clave secreta del servidor."],erroresComunes:["Almacenar contraseñas en texto plano o con algoritmos obsoletos como MD5 o SHA-1 en lugar de BCrypt.","Hardcodear la clave secreta JWT en el código fuente en lugar de inyectarla mediante variables de entorno."],conexionProyectoFinal:"Se encuentra en exercises/06-capa-security-jwt/SecurityConfig.java."},16:{slug:"despliegue-docker",tituloCorto:"Despliegue con Docker",subtitulo:"Multi-stage builds, imágenes ligeras Alpine, usuario no-root y docker-compose",objetivo:"Empaquetar la aplicación Spring Boot en una imagen Docker optimizada mediante Multi-stage Build y orquestar el despliegue junto a una base de datos MySQL con Docker Compose.",problemaIngenieria:'El clásico problema de "en mi máquina funciona pero en producción falla" se debe a diferencias en la versión de Java, dependencias del sistema operativo o configuraciones del servidor. Docker encapsula la aplicación junto a su runtime exacto garantizando un comportamiento 100% idéntico en cualquier entorno.',partes:[{nombre:"Parte 1: Multi-stage Build (Etapa de Compilación)",archivo:"Dockerfile (Etapa 1: Builder)",explicacion:"Utiliza una imagen con Maven y el JDK completo para compilar el código y generar el JAR. Al terminar, esta imagen pesada se descarta.",codigoFragmento:`# Etapa 1: Compilación del proyecto
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests`},{nombre:"Parte 2: Imagen Final Ultraligera y Segura (Runtime)",archivo:"Dockerfile (Etapa 2: Runner)",explicacion:"Copia solo el archivo JAR final a una imagen base JRE Alpine (pesa menos de 150MB en lugar de 800MB) y crea un usuario sin privilegios root por seguridad.",codigoFragmento:`# Etapa 2: Imagen de ejecución ligera
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`},{nombre:"Parte 3: Orquestación con Docker Compose",archivo:"docker-compose.yml",explicacion:"Define la red interna que conecta el servicio Spring Boot con un contenedor de base de datos MySQL, gestionando variables de entorno y persistencia en volúmenes.",codigoFragmento:`version: '3.8'
services:
  taskmanager-db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: taskdb
      MYSQL_ROOT_PASSWORD: secret_password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  taskmanager-app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://taskmanager-db:3306/taskdb
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: secret_password
    depends_on:
      - taskmanager-db

volumes:
  db_data:`},{nombre:"Parte 4: Comandos de Despliegue",archivo:"Terminal / CLI",explicacion:"Construye y levanta toda la infraestructura con un único comando.",codigoFragmento:`# Construir la imagen Docker
docker build -t taskmanager:latest .

# Levantar la aplicación y la base de datos MySQL
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f taskmanager-app`}],puntosDefensa:["¿Qué ventaja tiene un Dockerfile Multi-stage Build? Permite compilar dentro de un contenedor sin requerir Maven en la máquina anfitriona y genera una imagen final de producción sin el código fuente ni herramientas de compilación, reduciendo drásticamente el tamaño y la superficie de ataque.","¿Por qué crear un usuario sin privilegios (USER spring)? Si un atacante lograra comprometer la aplicación mediante una vulnerabilidad (como inyección de código), solo tendría los permisos restringidos de ese usuario en lugar de acceso root al host."],erroresComunes:["Ejecutar el contenedor como usuario root en entornos de producción.","No usar .dockerignore para excluir la carpeta target y .git, provocando transferencias innecesarias de cientos de megabytes al daemon de Docker."],conexionProyectoFinal:"Permite desplegar la aplicación completa TaskManager y Librería en cualquier nube o entorno de servidores sin configurar nada localmente."}},p={1:{nombre:"Spring Boot - Uso de IoC - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad1/Spring Boot - Uso de IoC - Blanca de Una.zip"},2:{nombre:"Spring Boot - Uso de IoD - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad2/Spring Boot - Uso de IoD - Blanca de Una.zip"},3:{nombre:"Spring Boot - Uso de Java Annotations - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad3/Spring Boot - Uso de Java Annotations - Blanca de Una.zip"},4:{nombre:"Spring Boot - Config en Spring - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad4/Spring Boot - Config en Spring - Blanca de Una.zip"},5:{nombre:"Spring Boot – Preparación del entorno - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad5/Spring Boot – Preparación del entorno - Blanca de Una.zip"},6:{nombre:"Spring Boot – Creación del Controller - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad6/Spring Boot – Creación del Controller - Blanca de Una.zip"},7:{nombre:"Spring Boot – Creación de la Capa de Servicio - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad7/Spring Boot – Creación de la Capa de Servicio - Blanca de Una.zip"},8:{nombre:"Spring Boot – Introducción a JPA y modelado de entidades - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad8/Spring Boot – Introducción a JPA y modelado de entidades - Blanca de Una.zip"},9:{nombre:"Spring Boot – Uso de Spring Data JPA - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad9/Spring Boot – Uso de Spring Data JPA - Blanca de Una.zip"},10:{nombre:"Spring Boot – Creación de los DTO's - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad010/Spring Boot – Creación de los DTO's - Blanca de Una.zip"},11:{nombre:"Spring Boot – Uso de Validaciones - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad011/Spring Boot – Uso de Validaciones - Blanca de Una.zip"},12:{nombre:"Spring Boot – Manejo de errores - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad012/Spring Boot – Manejo de errores - Blanca de Una.zip"},13:{nombre:"Spring Boot – Creación de la documentación de la API - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad013/Spring Boot – Creación de la documentación de la API - Blanca de Una.zip"},14:{nombre:"Spring Boot – Pruebas en Aplicaciones Spring Boot - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad014/Spring Boot – Pruebas en Aplicaciones Spring Boot - Blanca de Una.zip"},15:{nombre:"Spring Boot – Seguridad con Spring Security y JWT - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad015/Spring Boot – Seguridad con Spring Security y JWT - Blanca de Una.zip"},16:{nombre:"Spring Boot – Despliegue con Docker - Blanca de Una.zip",url:"/java-studio/actividades-entregadas/Actividad016/Spring Boot – Despliegue con Docker - Blanca de Una.zip"}},N=["Todos","Fundamentos Spring","Spring Boot Core","Persistencia JPA","Robustez & Calidad","Testing & Docs","Seguridad & Docker"];function _({initialSlug:m=null,onSelectActivity:b=null}){const[g,k]=c.useState(null),r=c.useMemo(()=>{if(g!==null)return g;if(m){const i=String(m).toLowerCase().trim().match(/(\d+)/);if(i){const t=parseInt(i[1],10);if(t>=1&&t<=16)return t}}return null},[g,m]),d=a=>{k(a),b&&b(a)},[u,C]=c.useState(""),[s,j]=c.useState("Todos"),y=c.useMemo(()=>l.filter(a=>{const i=s==="Todos"||a.bloque===s,t=u.toLowerCase().trim(),R=!t||a.titulo.toLowerCase().includes(t)||a.descripcion.toLowerCase().includes(t)||a.conceptosClave&&a.conceptosClave.some(D=>D.toLowerCase().includes(t))||a.rama&&a.rama.toLowerCase().includes(t);return i&&R}),[u,s]),o=c.useMemo(()=>r&&l.find(a=>a.numero===r)||null,[r]),n=c.useMemo(()=>r&&L[String(r)]||null,[r]),v=c.useMemo(()=>r?S(r,f):[],[r]),P=()=>{r>1&&d(r-1)},E=()=>{r<l.length&&d(r+1)};return o?e.jsxs("div",{className:"studio-activity-detail-view",style:{width:"100%",minWidth:0},children:[e.jsxs("div",{className:"studio-card",style:{padding:"1.25rem 1.75rem",marginBottom:"1.25rem",borderLeft:"5px solid #6d28d9",minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem",marginBottom:"0.9rem",paddingBottom:"0.75rem",borderBottom:"1px solid #e2e8f0"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:800,textTransform:"uppercase",color:"#6d28d9",letterSpacing:"0.5px"},children:"Actividades Prácticas Enterprise"}),e.jsx("h2",{style:{margin:"0.15rem 0 0",fontSize:"1.3rem",fontWeight:800,color:"#0f172a"},children:o.bloque})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",marginTop:"0.2rem"},children:[e.jsxs("button",{type:"button",onClick:()=>d(null),className:"studio-btn-secondary",style:{fontSize:"0.8rem",padding:"0.35rem 0.75rem"},children:[e.jsx(T,{size:14})," Catálogo"]}),e.jsxs("button",{type:"button",onClick:P,disabled:r<=1,className:"studio-btn-secondary",style:{opacity:r<=1?.5:1,cursor:r<=1?"not-allowed":"pointer",fontSize:"0.8rem",padding:"0.35rem 0.75rem"},children:[e.jsx(T,{size:14})," Anterior"]}),e.jsxs("button",{type:"button",onClick:E,disabled:r>=l.length,className:"studio-btn-secondary",style:{opacity:r>=l.length?.5:1,cursor:r>=l.length?"not-allowed":"pointer",fontSize:"0.8rem",padding:"0.35rem 0.75rem"},children:["Siguiente ",e.jsx(I,{size:14})]})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",overflowX:"auto",padding:"0.45rem 0.65rem",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"8px"},children:l.map(a=>{const i=a.numero===o.numero;return e.jsx("button",{type:"button",onClick:()=>d(a.numero),style:{display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.28rem 0.6rem",borderRadius:"6px",border:i?"1px solid #6d28d9":"1px solid #e2e8f0",background:i?"#6d28d9":"#ffffff",color:i?"#ffffff":"#475569",fontSize:"0.77rem",fontWeight:i?700:500,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,boxShadow:i?"0 1px 4px rgba(109, 40, 217, 0.25)":"0 1px 2px rgba(0,0,0,0.04)",transition:"all 0.12s ease"},title:a.titulo,children:e.jsxs("span",{style:{fontWeight:800},children:["Act #",a.numero<10?`0${a.numero}`:a.numero]})},a.numero)})})]}),e.jsxs("h1",{style:{margin:"1.25rem 0 1rem 0",fontSize:"1.65rem",fontWeight:800,color:"#0f172a",lineHeight:1.3},children:["Actividad #",o.numero<10?`0${o.numero}`:o.numero," · ",o.titulo]}),e.jsxs("div",{style:{width:"100%",minWidth:0},children:[e.jsxs("div",{className:"studio-card",style:{marginBottom:"1.5rem",borderLeft:"5px solid #6d28d9",padding:"2rem 2.25rem",background:"#ffffff"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",flexWrap:"wrap",marginBottom:"0.75rem"},children:[e.jsx("span",{className:"studio-badge studio-badge-blue",children:o.bloque}),o.rama&&e.jsxs("span",{className:"studio-badge studio-badge-green",style:{display:"inline-flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(h,{})," ",o.rama]}),o.proyecto&&e.jsxs("span",{className:"studio-badge studio-badge-amber",style:{display:"inline-flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(B,{})," ",o.proyecto]})]}),e.jsx("p",{style:{margin:0,fontSize:"0.94rem",color:"#334155",lineHeight:1.7},children:(n==null?void 0:n.objetivo)||o.descripcion}),o.conceptosClave&&e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.4rem",marginTop:"1rem"},children:o.conceptosClave.map((a,i)=>e.jsxs("span",{style:{background:"#f1f5f9",color:"#475569",fontSize:"0.78rem",fontWeight:600,padding:"0.2rem 0.6rem",borderRadius:"4px"},children:["#",a]},i))}),p[o.numero]&&e.jsxs("div",{style:{marginTop:"1.25rem",paddingTop:"0.85rem",borderTop:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.84rem",fontWeight:700,color:"#0f172a",display:"flex",alignItems:"center",gap:"0.4rem"},children:"📦 Archivo Entregable Oficial en L2E"}),e.jsxs("span",{style:{fontSize:"0.78rem",color:"#64748b"},children:["Proyecto Maven empaquetado y entregado por Blanca de Uña (",p[o.numero].nombre,")"]})]}),e.jsxs("a",{href:p[o.numero].url,download:p[o.numero].nombre,className:"studio-btn-primary",style:{textDecoration:"none",fontSize:"0.8rem",padding:"0.45rem 0.85rem",display:"inline-flex",alignItems:"center",gap:"0.45rem",fontWeight:700},children:[e.jsx(q,{})," Descargar .zip Entregado"]})]})]}),(n==null?void 0:n.problemaIngenieria)&&e.jsxs("div",{className:"studio-card",style:{marginBottom:"1.5rem",background:"#f8fafc",border:"1px solid #e2e8f0"},children:[e.jsxs("h4",{style:{margin:"0 0 0.4rem 0",color:"#0f172a",fontSize:"0.98rem",fontWeight:800,display:"flex",alignItems:"center",gap:"0.45rem"},children:[e.jsx(O,{style:{color:"#6d28d9"}})," Problema de Ingeniería que Resuelve"]}),e.jsx("p",{style:{margin:0,fontSize:"0.88rem",color:"#475569",lineHeight:1.6},children:n.problemaIngenieria})]}),(n==null?void 0:n.partes)&&n.partes.length>0&&e.jsxs("div",{style:{marginBottom:"1.5rem"},children:[e.jsxs("h3",{style:{fontSize:"1.15rem",fontWeight:800,marginBottom:"0.75rem",color:"#0f172a"},children:["Desglose Técnico de la Solución (",n.partes.length," Partes)"]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:n.partes.map((a,i)=>e.jsxs("div",{className:"studio-card",style:{padding:"1.25rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"0.5rem"},children:[e.jsx("strong",{style:{fontSize:"0.98rem",color:"#6d28d9"},children:a.nombre}),a.archivo&&e.jsx("span",{className:"studio-badge studio-badge-blue",style:{fontFamily:"monospace"},children:a.archivo})]}),e.jsx("p",{style:{margin:"0 0 0.75rem 0",fontSize:"0.88rem",color:"#475569",lineHeight:1.6},children:a.explicacion}),a.codigoFragmento&&e.jsx(x,{code:a.codigoFragmento,filename:a.archivo||"Snippet.java"})]},i))})]}),o.codigoResuelto&&e.jsxs("div",{className:"studio-card",style:{marginBottom:"1.5rem"},children:[e.jsxs("h3",{style:{fontSize:"1.15rem",fontWeight:800,marginBottom:"0.4rem",color:"#0f172a",display:"flex",alignItems:"center",gap:"0.45rem"},children:[e.jsx(M,{style:{color:"#10b981"}})," Código Oficial Resuelto"]}),e.jsx("p",{style:{margin:"0 0 0.75rem 0",fontSize:"0.85rem",color:"#64748b"},children:"Implementación limpia conforme a los requerimientos de la rúbrica oficial."}),e.jsx(x,{code:o.codigoResuelto,filename:`Solucion_Actividad_${o.numero}.java`})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"1rem",marginBottom:"1.5rem"},children:[e.jsxs("div",{className:"studio-card",style:{borderLeft:"4px solid #10b981"},children:[e.jsxs("h4",{style:{margin:"0 0 0.5rem 0",color:"#059669",fontSize:"0.98rem",fontWeight:800,display:"flex",alignItems:"center",gap:"0.45rem"},children:[e.jsx(z,{})," Argumentos de Defensa Técnica"]}),n!=null&&n.puntosDefensa&&n.puntosDefensa.length>0?e.jsx("ul",{style:{margin:0,paddingLeft:"1.2rem",fontSize:"0.85rem",color:"#334155",lineHeight:1.6},children:n.puntosDefensa.map((a,i)=>e.jsx("li",{style:{marginBottom:"0.4rem"},children:a},i))}):e.jsx("p",{style:{margin:0,fontSize:"0.86rem",color:"#475569",lineHeight:1.5},children:o.preguntaDefensa||"Explica la separación de responsabilidades y por qué esta implementación desacopla el cliente de la base de datos."})]}),e.jsxs("div",{className:"studio-card",style:{borderLeft:"4px solid #ea580c"},children:[e.jsxs("h4",{style:{margin:"0 0 0.5rem 0",color:"#ea580c",fontSize:"0.98rem",fontWeight:800,display:"flex",alignItems:"center",gap:"0.45rem"},children:[e.jsx(F,{})," Trampas y Errores Comunes"]}),n!=null&&n.erroresComunes&&n.erroresComunes.length>0?e.jsx("ul",{style:{margin:0,paddingLeft:"1.2rem",fontSize:"0.85rem",color:"#334155",lineHeight:1.6},children:n.erroresComunes.map((a,i)=>e.jsx("li",{style:{marginBottom:"0.4rem"},children:a},i))}):e.jsx("p",{style:{margin:0,fontSize:"0.86rem",color:"#475569",lineHeight:1.5},children:o.errorComun||"No validar campos nulos en DTOs o exponer directamente entidades JPA en el controlador."})]})]}),(n==null?void 0:n.conexionProyectoFinal)&&e.jsxs("div",{className:"studio-card",style:{background:"#f8fafc",borderLeft:"4px solid #0284c7",marginBottom:"1.5rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.4rem 0",color:"#0284c7",fontSize:"0.98rem",fontWeight:800},children:"🔗 Conexión con el Proyecto Final"}),e.jsx("p",{style:{margin:0,fontSize:"0.88rem",color:"#475569",lineHeight:1.6},children:n.conexionProyectoFinal})]}),v.length>0&&e.jsx("div",{style:{marginTop:"0.5rem"},children:e.jsx(A,{quizzes:v,title:`Autoevaluación: Actividad #${o.numero} (${v.length} Preguntas del Quiz Oficial)`,subtitle:`Pon a prueba tus conocimientos sobre ${o.titulo} con las preguntas oficiales de examen vinculadas a esta práctica.`,accentColor:"#6d28d9",quizBaseUrl:"/java/studio/quiz"})})]})]}):e.jsxs("div",{className:"studio-activities-catalog",children:[e.jsxs("div",{className:"studio-card",style:{marginBottom:"1.5rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:800,textTransform:"uppercase",color:"#6d28d9",letterSpacing:"0.5px"},children:"Catálogo Oficial del Bootcamp"}),e.jsx("h2",{style:{margin:"0.2rem 0 0.35rem 0",fontSize:"1.45rem",fontWeight:800},children:"16 Actividades de Desarrollo Backend"}),e.jsx("p",{style:{margin:0,fontSize:"0.88rem",color:"#64748b"},children:"Desde fundamentos IoC y Spring Boot hasta persistencia JPA, seguridad JWT y contenedorización Docker."})]}),e.jsxs("div",{style:{position:"relative",minWidth:"260px"},children:[e.jsx(w,{style:{position:"absolute",left:"0.85rem",top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}),e.jsx("input",{type:"text",value:u,onChange:a=>C(a.target.value),placeholder:"Buscar por título, concepto o rama...",style:{width:"100%",padding:"0.55rem 0.85rem 0.55rem 2.2rem",borderRadius:"8px",border:"1px solid #cbd5e1",fontSize:"0.86rem",outline:"none",background:"#ffffff"}})]})]}),e.jsx("div",{style:{display:"flex",gap:"0.4rem",flexWrap:"wrap",borderTop:"1px solid #e2e8f0",paddingTop:"0.85rem"},children:N.map(a=>e.jsx("button",{type:"button",onClick:()=>j(a),className:`studio-btn-secondary ${s===a?"active":""}`,style:{fontSize:"0.8rem",padding:"0.35rem 0.75rem",borderRadius:"999px",borderColor:s===a?"#6d28d9":"#e2e8f0",background:s===a?"rgba(109, 40, 217, 0.1)":"#ffffff",color:s===a?"#6d28d9":"#64748b",fontWeight:s===a?700:500},children:a},a))})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",gap:"1rem"},children:y.map(a=>e.jsxs("div",{className:"studio-card",style:{display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"pointer",transition:"transform 0.15s ease, box-shadow 0.15s ease",borderTop:"3px solid #6d28d9"},onClick:()=>d(a.numero),children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.5rem",marginBottom:"0.5rem"},children:[e.jsxs("span",{className:"studio-badge studio-badge-purple",style:{fontWeight:800},children:["Actividad #",a.numero<10?`0${a.numero}`:a.numero]}),e.jsxs("div",{style:{display:"flex",gap:"0.35rem",alignItems:"center"},children:[e.jsx("span",{className:"studio-badge studio-badge-blue",style:{fontSize:"0.72rem"},children:a.bloque}),(()=>{const i=(S(a.numero,f)||[]).length;return i===0?null:e.jsxs("span",{className:"studio-badge studio-badge-purple",style:{fontSize:"0.7rem",fontWeight:700},title:`${i} preguntas del Quiz oficial`,children:["🧪 ",i," Q"]})})(),p[a.numero]&&e.jsx("span",{className:"studio-badge studio-badge-green",style:{fontSize:"0.7rem"},children:"📦 .zip"})]})]}),e.jsx("h3",{style:{margin:"0.4rem 0 0.4rem 0",fontSize:"1.05rem",fontWeight:800,color:"#0f172a",lineHeight:1.35},children:a.titulo}),e.jsx("p",{style:{margin:"0 0 0.85rem 0",fontSize:"0.84rem",color:"#64748b",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},children:a.descripcion})]}),e.jsxs("div",{children:[a.rama&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem",fontSize:"0.76rem",color:"#059669",marginBottom:"0.75rem",fontFamily:"monospace"},children:[e.jsx(h,{})," ",a.rama]}),e.jsx("button",{type:"button",className:"studio-btn-primary",style:{width:"100%",justifyContent:"center",fontSize:"0.82rem",padding:"0.5rem"},onClick:i=>{i.stopPropagation(),d(a.numero)},children:"Ver Detalle y Código Resuelto →"})]})]},a.numero))}),y.length===0&&e.jsx("div",{className:"studio-card",style:{textAlign:"center",padding:"3rem 1rem",color:"#94a3b8"},children:e.jsxs("p",{style:{margin:0,fontSize:"0.95rem"},children:['No se encontraron actividades para "',u,'".']})})]})}export{_ as default};
