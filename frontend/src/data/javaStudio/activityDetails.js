// =========================================================================
// DATOS EXTENDIDOS: ANÁLISIS PASO A PASO Y EXPLICACIONES DE LAS 16 ACTIVIDADES
// =========================================================================

export const ACTIVITY_SLUGS = {
  1: 'uso-ioc',
  2: 'uso-iod',
  3: 'java-annotations',
  4: 'configuraciones-spring',
  5: 'preparacion-entorno',
  6: 'creacion-controller-rest',
  7: 'creacion-servicio',
  8: 'introduccion-jpa',
  9: 'spring-data-jpa',
  10: 'dtos-y-mappers',
  11: 'validaciones-bean-validation',
  12: 'manejo-global-errores',
  13: 'documentacion-openapi-swagger',
  14: 'pruebas-junit-mockito',
  15: 'seguridad-jwt',
  16: 'despliegue-docker'
};

// Mapa inverso para resolver slugs o alias a número de actividad
export const SLUG_TO_NUMBER = {
  'uso-ioc': 1,
  '01-uso-de-ioc': 1,
  '1': 1,
  'actividad-1': 1,

  'uso-iod': 2,
  '02-uso-de-iod': 2,
  '2': 2,
  'actividad-2': 2,

  'java-annotations': 3,
  '03-uso-de-java-annotations': 3,
  '3': 3,
  'actividad-3': 3,

  'configuraciones-spring': 4,
  '04-distintas-configuraciones': 4,
  '4': 4,
  'actividad-4': 4,

  'preparacion-entorno': 5,
  '05-preparacion-del-entorno': 5,
  '5': 5,
  'actividad-5': 5,

  'creacion-controller-rest': 6,
  '06-creacion-del-controller': 6,
  '6': 6,
  'actividad-6': 6,

  'creacion-servicio': 7,
  '07-creacion-de-la-capa-de-servicio': 7,
  '7': 7,
  'actividad-7': 7,

  'introduccion-jpa': 8,
  '08-introduccion-a-jpa': 8,
  '8': 8,
  'actividad-8': 8,

  'spring-data-jpa': 9,
  '09-uso-de-spring-data-jpa': 9,
  '9': 9,
  'actividad-9': 9,

  'dtos-y-mappers': 10,
  '10-creacion-de-dtos-y-mappers': 10,
  '10': 10,
  'actividad-10': 10,

  'validaciones-bean-validation': 11,
  '11-uso-de-validaciones': 11,
  '11': 11,
  'actividad-11': 11,

  'manejo-global-errores': 12,
  '12-manejo-de-errores': 12,
  '12': 12,
  'actividad-12': 12,

  'documentacion-openapi-swagger': 13,
  '13-documentacion-api-swagger': 13,
  '13': 13,
  'actividad-13': 13,

  'pruebas-junit-mockito': 14,
  '14-pruebas-unitarias-mockito': 14,
  '14': 14,
  'actividad-14': 14,

  'seguridad-jwt': 15,
  '15-seguridad-spring-security-jwt': 15,
  '15': 15,
  'actividad-15': 15,

  'despliegue-docker': 16,
  '16-despliegue-con-docker': 16,
  '16': 16,
  'actividad-16': 16
};

export const ACTIVITY_DETAILED_EXPLANATIONS = {
  1: {
    slug: 'uso-ioc',
    tituloCorto: 'Uso de IoC (Inversión de Control)',
    subtitulo: 'Desacoplamiento mediante el contenedor IoC de Spring y configuración en XML',
    objetivo: 'Comprender cómo Spring asume el control del ciclo de vida y la instanciación de objetos (Beans) en lugar de crearlos manualmente en el código mediante el operador "new".',
    problemaIngenieria: 'En Java tradicional, cuando una clase necesita otra, hace `new ServicioConcreto()`. Esto genera un acoplamiento rígido: si queremos cambiar la implementación o falsearla para un test unitario, debemos modificar el código fuente del consumidor. La Inversión de Control (Principio de Hollywood: "no nos llames, nosotros te llamaremos") invierte este flujo dejando que un contenedor externo construya y suministre las instancias.',
    partes: [
      {
        nombre: 'Parte 1: La Interfaz del Servicio (Contrato)',
        archivo: 'GreetingService.java',
        explicacion: 'Define el contrato público de operaciones que ofrece el servicio. El consumidor solo programa contra esta interfaz, sin saber qué clase concreta lo implementa ni cómo se instancia.',
        codigoFragmento: `public interface GreetingService {\n    void greet(String name);\n}`
      },
      {
        nombre: 'Parte 2: La Clase Implementadora (Componente POJO)',
        archivo: 'GreetingServiceImpl.java',
        explicacion: 'Implementa la interfaz y define atributos configurables (como "prefix") con sus respectivos métodos setters. Es un POJO (Plain Old Java Object) sin ninguna anotación ni dependencia del framework Spring.',
        codigoFragmento: `public class GreetingServiceImpl implements GreetingService {\n    private String prefix;\n\n    public void setPrefix(String prefix) {\n        this.prefix = prefix;\n    }\n\n    @Override\n    public void greet(String name) {\n        System.out.println(prefix + " " + name);\n    }\n}`
      },
      {
        nombre: 'Parte 3: El Descriptor de Configuración IoC',
        archivo: 'applicationContext.xml',
        explicacion: 'Declara ante el contenedor qué Beans existen y qué valores inyectarles. Con la etiqueta <bean>, Spring lee el nombre de la clase, invoca su constructor por defecto e inyecta la propiedad "prefix" mediante reflexión.',
        codigoFragmento: `<beans xmlns="http://www.springframework.org/schema/beans" ...>\n    <bean id="greetingService" class="com.studio.ioc.GreetingServiceImpl">\n        <property name="prefix" value="¡Bienvenida al Bootcamp de Java Backend Studio!" />\n    </bean>\n</beans>`
      },
      {
        nombre: 'Parte 4: El Contenedor ApplicationContext y Arranque',
        archivo: 'MainApp.java',
        explicacion: 'El ApplicationContext lee el XML del classpath, construye el grafo de dependencias en memoria y entrega la instancia gestionada cuando llamamos a getBean(). Al terminar, cerramos el contexto para liberar recursos.',
        codigoFragmento: `ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");\nGreetingService service = context.getBean("greetingService", GreetingService.class);\nservice.greet("Blanca");\n((ClassPathXmlApplicationContext) context).close();`
      }
    ],
    puntosDefensa: [
      '¿Por qué usar IoC en lugar de "new"? Porque desacopla el qué del cómo. Permite cambiar implementaciones sin tocar el código del cliente y hace que las clases sean 100% testables con mocks.',
      '¿Qué es un Bean de Spring? Es un objeto Java instanciado, ensamblado y administrado en todo su ciclo de vida por el contenedor IoC de Spring.',
      '¿Cuál es el scope por defecto de un Bean? Por defecto en Spring es Singleton (una única instancia compartida por todo el contenedor).'
    ],
    erroresComunes: [
      'Error de FileNotFoundException si applicationContext.xml no se ubica en la raíz de src/main/resources.',
      'Error de NoSuchBeanDefinitionException si el identificador pasado a getBean("id") no coincide exactamente con el atributo id del XML.',
      'Olvidar incluir un constructor por defecto o el setter correspondiente para la propiedad inyectada.'
    ],
    conexionProyectoFinal: 'En TaskManager y Librería, aunque no usamos XML sino anotaciones modernas de Spring Boot, el principio es exactamente el mismo: TaskController no hace new TaskServiceImpl(), sino que Spring se lo entrega ya instanciado y configurado.'
  },

  2: {
    slug: 'uso-iod',
    tituloCorto: 'Uso de IoD (Inyección de Dependencias)',
    subtitulo: 'Inyección por constructor frente a inyección por setter en Spring Framework',
    objetivo: 'Aprender cómo el contenedor de Spring ensambla objetos colaboradores conectando unos Beans con otros mediante constructor (<constructor-arg>) o mediante métodos setter (<property>).',
    problemaIngenieria: 'Un objeto complejo casi nunca trabaja solo; necesita colaboradores (por ejemplo, un servicio de reportes necesita un impresor o logger). Si el objeto dependiente crea a su colaborador, queda rígidamente atado a él. Mediante IoD, el colaborador se "inyecta" desde el exterior, logrando una arquitectura modular y fácilmente reemplazable.',
    partes: [
      {
        nombre: 'Parte 1: El Colaborador Secundario (Printer)',
        archivo: 'PrinterService.java & ConsolePrinterService.java',
        explicacion: 'Interfaz y clase que realiza una labor concreta (imprimir por consola). Será el Bean inyectado en el servicio principal.',
        codigoFragmento: `public interface PrinterService {\n    void print(String message);\n}\n\npublic class ConsolePrinterService implements PrinterService {\n    @Override\n    public void print(String message) { System.out.println("[PRINT] " + message); }\n}`
      },
      {
        nombre: 'Parte 2: Inyección por Constructor (<constructor-arg>)',
        archivo: 'ReportService.java (Versión Constructor)',
        explicacion: 'La dependencia se recibe como parámetro obligatorio del constructor. Garantiza que el objeto nunca quede en estado incompleto o nulo (inmutabilidad).',
        codigoFragmento: `public class ReportService {\n    private final PrinterService printer;\n\n    public ReportService(PrinterService printer) {\n        this.printer = printer;\n    }\n    public void generateReport(String data) { printer.print("Reporte: " + data); }\n}`
      },
      {
        nombre: 'Parte 3: Inyección por Setter (<property>)',
        archivo: 'ReportService.java (Versión Setter)',
        explicacion: 'La dependencia se asigna a través de un método setter tras la instanciación. Es adecuada para dependencias opcionales o reconfigurables.',
        codigoFragmento: `public class ReportServiceSetter {\n    private PrinterService printer;\n    public void setPrinter(PrinterService printer) { this.printer = printer; }\n}`
      },
      {
        nombre: 'Parte 4: Cableado en XML',
        archivo: 'applicationContext.xml',
        explicacion: 'Spring primero instancia el Bean "printerService" y después lo pasa como referencia (ref) al constructor de un Bean y al setter del otro.',
        codigoFragmento: `<bean id="printerService" class="com.studio.iod.ConsolePrinterService" />\n\n<bean id="reportConstructor" class="com.studio.iod.ReportService">\n    <constructor-arg ref="printerService" />\n</bean>\n\n<bean id="reportSetter" class="com.studio.iod.ReportServiceSetter">\n    <property name="printer" ref="printerService" />\n</bean>`
      }
    ],
    puntosDefensa: [
      '¿Cuándo usar inyección por constructor y cuándo por setter? La inyección por constructor es la recomendación oficial de Spring para todas las dependencias obligatorias (garantiza inmutabilidad y previene NullPointerExceptions). El setter solo se reserva para dependencias opcionales.',
      '¿Qué ocurre si hay dependencias circulares en constructor? Spring falla al arrancar arrojando BeanCurrentlyInCreationException, lo cual es una señal de mala arquitectura que obliga a desacoplar responsabilidades.'
    ],
    erroresComunes: [
      'Confundir value (para literales/strings) con ref (para referencias a otros Beans en el XML).',
      'Olvidar declarar el constructor explícito en Java cuando se configura <constructor-arg>.'
    ],
    conexionProyectoFinal: 'En TaskManager, TaskController y TaskServiceImpl utilizan 100% inyección por constructor (generada mediante constructores Java puros), eliminando por completo la necesidad de @Autowired sobre campos.'
  },

  3: {
    slug: 'java-annotations',
    tituloCorto: 'Uso de Java Annotations',
    subtitulo: 'Escaneo de componentes, inyección declarativa y scopes (@Component, @Autowired, @Qualifier)',
    objetivo: 'Reemplazar los descriptores XML por anotaciones de Java, dejando que Spring descubra automáticamente los componentes del proyecto mediante escaneo de paquetes.',
    problemaIngenieria: 'Mantener archivos XML grandes en proyectos con cientos de clases es propenso a errores tipográficos y resulta tedioso. Las anotaciones de Java permiten definir la metadata de inyección directamente junto al código fuente de las clases.',
    partes: [
      {
        nombre: 'Parte 1: Activación del Escaneo de Paquetes',
        archivo: 'applicationContext.xml',
        explicacion: 'Habilita el Component Scanning indicando el paquete raíz que Spring debe inspeccionar recursivamente.',
        codigoFragmento: `<beans ...>\n    <context:component-scan base-package="com.studio.annotations" />\n</beans>`
      },
      {
        nombre: 'Parte 2: Registro de Componentes con @Component',
        archivo: 'EmailNotificationService.java',
        explicacion: 'Indica a Spring que esta clase es un Bean administrable. Spring creará una instancia singleton en su contexto.',
        codigoFragmento: `@Component("emailService")\npublic class EmailNotificationService implements NotificationService {\n    @Override\n    public void send(String msg) { System.out.println("Enviando Email: " + msg); }\n}`
      },
      {
        nombre: 'Parte 3: Desambiguación con @Qualifier',
        archivo: 'SmsNotificationService.java',
        explicacion: 'Cuando existen dos clases que implementan la misma interfaz (Email y SMS), @Qualifier indica explícitamente cuál inyectar para evitar conflictos de ambigüedad.',
        codigoFragmento: `@Component("smsService")\npublic class SmsNotificationService implements NotificationService {\n    @Override\n    public void send(String msg) { System.out.println("Enviando SMS: " + msg); }\n}`
      },
      {
        nombre: 'Parte 4: Inyección y Ciclo de Vida con @Scope',
        archivo: 'UserManager.java',
        explicacion: 'Inyecta la dependencia por constructor seleccionando la implementación con @Qualifier. La anotación @Scope define si es Singleton o Prototype.',
        codigoFragmento: `@Component\n@Scope("singleton")\npublic class UserManager {\n    private final NotificationService notifier;\n\n    @Autowired\n    public UserManager(@Qualifier("emailService") NotificationService notifier) {\n        this.notifier = notifier;\n    }\n}`
      }
    ],
    puntosDefensa: [
      '¿Qué ocurre si dos beans implementan la misma interfaz y uso @Autowired sin @Qualifier? Spring arroja NoUniqueBeanDefinitionException porque no sabe cuál de los dos candidatos elegir.',
      '¿Qué diferencia hay entre @Component, @Service, @Repository y @Controller? Todos son especializaciones de @Component. @Repository agrega traducción de excepciones de base de datos, @Service aporta semántica de capa de negocio y @Controller prepara la gestión web REST.'
    ],
    erroresComunes: [
      'Ubicar clases fuera del paquete base declarado en el component scan, provocando que Spring no las detecte.',
      'Uso de @Autowired sobre campos privados (Field Injection), lo cual dificulta los tests unitarios y rompe la inmutabilidad.'
    ],
    conexionProyectoFinal: 'En TaskManager utilizamos @Service en TaskServiceImpl, @Repository en TaskRepository y @RestController en TaskController.'
  },

  4: {
    slug: 'configuraciones-spring',
    tituloCorto: 'Distintas Configuraciones en Spring',
    subtitulo: 'De XML a Java Config con @Configuration, @Bean y @PropertySource',
    objetivo: 'Dominar la configuración de Spring basada 100% en código Java (Java Config), eliminando totalmente los archivos XML y controlando la creación de beans mediante métodos anotados con @Bean.',
    problemaIngenieria: 'Cuando utilizamos librerías externas de terceros (como un cliente HTTP, ObjectMapper de Jackson o un DataSource), sus clases no están en nuestro código fuente, por lo que no podemos ponerles @Component. Java Config (@Configuration + @Bean) resuelve esto permitiendo instanciar y configurar cualquier objeto de terceros con código Java tipado.',
    partes: [
      {
        nombre: 'Parte 1: La Clase @Configuration',
        archivo: 'AppConfig.java',
        explicacion: 'Define una clase de configuración que el contenedor procesará para registrar Beans. Se acompaña de @ComponentScan para buscar componentes propios.',
        codigoFragmento: `@Configuration\n@ComponentScan(basePackages = "com.studio.config")\n@PropertySource("classpath:app.properties")\npublic class AppConfig {\n    // Métodos @Bean\n}`
      },
      {
        nombre: 'Parte 2: Declaración Explícita de Beans con @Bean',
        archivo: 'AppConfig.java (continuación)',
        explicacion: 'El método retorna la instancia. Spring intercepta la llamada y guarda el resultado en el contexto; las llamadas posteriores devuelven el mismo singleton.',
        codigoFragmento: `@Bean\npublic ObjectMapper objectMapper() {\n    ObjectMapper mapper = new ObjectMapper();\n    mapper.registerModule(new JavaTimeModule());\n    return mapper;\n}`
      },
      {
        nombre: 'Parte 3: Inyección de Propiedades con @Value',
        archivo: 'app.properties & AppConfig.java',
        explicacion: 'Permite leer valores de configuración externos (URLs, timeouts, nombres de aplicación) sin hardcodearlos en el código.',
        codigoFragmento: `@Value("\${app.name:TaskManager}")\nprivate String appName;\n\n@Value("\${app.max-tasks:100}")\nprivate int maxTasks;`
      },
      {
        nombre: 'Parte 4: Inicialización con AnnotationConfigApplicationContext',
        archivo: 'MainApp.java',
        explicacion: 'Carga el contexto directamente a partir de la clase de configuración Java, sin necesidad de ningún fichero XML.',
        codigoFragmento: `ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);\nTaskService service = ctx.getBean(TaskService.class);\n((AnnotationConfigApplicationContext) ctx).close();`
      }
    ],
    puntosDefensa: [
      '¿Por qué los métodos @Bean en una clase @Configuration no crean una nueva instancia cada vez que se llaman internamente? Porque Spring envuelve la clase de configuración con un proxy CGLIB que intercepta la llamada y retorna el bean singleton ya almacenado en caché en el ApplicationContext.',
      '¿Qué ventaja tiene Java Config frente a XML? Validación en tiempo de compilación (type safety), refactorización automática en el IDE y soporte de lógica condicional en la creación de beans.'
    ],
    erroresComunes: [
      'Olvidar la anotación @Configuration en la clase donde se definen los métodos @Bean.',
      'Sintaxis incorrecta en @Value("\${propiedad}") (olvidar la llave de cierre o el signo de dólar).'
    ],
    conexionProyectoFinal: 'En TaskManager, la configuración de seguridad (SecurityConfig) y OpenAPI (OpenApiConfig) se definen exactamente con este mecanismo de @Configuration y @Bean.'
  },

  5: {
    slug: 'preparacion-entorno',
    tituloCorto: 'Preparación del Entorno (taskmanager)',
    subtitulo: 'Creación del proyecto Spring Boot, estructura de capas y configuración de H2',
    objetivo: 'Iniciar el proyecto base TaskManager utilizando Spring Initializr, definiendo los starters esenciales (web, data-jpa, h2, validation, devtools, lombok) y organizando el árbol de paquetes según la arquitectura por capas.',
    problemaIngenieria: 'Configurar un proyecto Java web desde cero tradicionalmente requería configurar Tomcat externo, dependencias Maven con versiones compatibles a mano, web.xml y decenas de configuraciones. Spring Boot resuelve esto con el concepto de Starter Dependencies y Autoconfiguración.',
    partes: [
      {
        nombre: 'Parte 1: Gestión de Dependencias (pom.xml)',
        archivo: 'pom.xml',
        explicacion: 'El parent spring-boot-starter-parent define el BOM con versiones compatibles y plugins Maven listos para empaquetar un JAR ejecutable con Tomcat embebido.',
        codigoFragmento: `<parent>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-parent</artifactId>\n    <version>3.2.0</version>\n</parent>`
      },
      {
        nombre: 'Parte 2: La Anotación @SpringBootApplication',
        archivo: 'TaskManagerApplication.java',
        explicacion: 'Punto de entrada de la aplicación. Combina @SpringBootConfiguration, @EnableAutoConfiguration y @ComponentScan en el paquete raíz com.backend.taskmanager.',
        codigoFragmento: `@SpringBootApplication\npublic class TaskManagerApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(TaskManagerApplication.class, args);\n    }\n}`
      },
      {
        nombre: 'Parte 3: Configuración de Entorno (application.properties)',
        archivo: 'src/main/resources/application.properties',
        explicacion: 'Configura la base de datos H2 en memoria, la consola web de depuración y las directivas de Hibernate para auto-creación del esquema relacional.',
        codigoFragmento: `spring.application.name=taskmanager\nserver.port=8080\nspring.datasource.url=jdbc:h2:mem:taskdb\nspring.datasource.driverClassName=org.h2.Driver\nspring.jpa.hibernate.ddl-auto=update\nspring.h2.console.enabled=true\nspring.h2.console.path=/h2-console`
      },
      {
        nombre: 'Parte 4: Arquitectura de Paquetes',
        archivo: 'Estructura de Directorios',
        explicacion: 'Separación estricta de responsabilidades en subpaquetes: controller, service, repository, model, dto, mapper y exception.',
        codigoFragmento: `src/main/java/com/backend/taskmanager/\n ├── controller/\n ├── service/\n ├── repository/\n ├── model/\n ├── dto/\n ├── mapper/\n └── exception/`
      }
    ],
    puntosDefensa: [
      '¿Qué hace @EnableAutoConfiguration? Inspecciona el classpath del proyecto y las propiedades configuradas para registrar automáticamente los Beans necesarios (por ejemplo, si detecta H2 y JPA, configura automáticamente el DataSource y EntityManagerFactory).',
      '¿Por qué usamos H2 en memoria durante el desarrollo? Porque permite arrancar y testear la aplicación de forma rápida y reproducible sin necesidad de instalar o mantener un servidor de base de datos externo.'
    ],
    erroresComunes: [
      'Crear clases fuera del paquete donde reside @SpringBootApplication, quedando fuera del ComponentScan por defecto.',
      'No habilitar spring.h2.console.enabled=true al intentar depurar tablas en el navegador.'
    ],
    conexionProyectoFinal: 'Es la raíz sobre la que se construyen todas las demás actividades del proyecto TaskManager.'
  },

  6: {
    slug: 'creacion-controller-rest',
    tituloCorto: 'Creación del Controller REST',
    subtitulo: 'Exposición de endpoints HTTP, convención REST y semántica de códigos de estado',
    objetivo: 'Implementar TaskController exponiendo un API REST completo con operaciones CRUD (GET, POST, PUT, DELETE), validación de payloads y códigos de estado HTTP correctos.',
    problemaIngenieria: 'El frontend, apps móviles o servicios externos necesitan interactuar con el backend mediante HTTP. El controlador actúa como el adaptador web exterior: no debe ejecutar lógica de negocio ni comunicarse con la base de datos; su único rol es validar la entrada HTTP, delegar al servicio y transformar el resultado en una respuesta HTTP adecuada.',
    partes: [
      {
        nombre: 'Parte 1: Definición del Controlador y Ruta Base',
        archivo: 'TaskController.java',
        explicacion: 'Uso de @RestController (combina @Controller + @ResponseBody) y @RequestMapping con versionado en la URL (/api/v1/tasks).',
        codigoFragmento: `@RestController\n@RequestMapping("/api/v1/tasks")\npublic class TaskController {\n    private final TaskService taskService;\n    // Inyección por constructor\n    public TaskController(TaskService taskService) {\n        this.taskService = taskService;\n    }\n}`
      },
      {
        nombre: 'Parte 2: Endpoints de Consulta (GET)',
        archivo: 'TaskController.java (continuación)',
        explicacion: 'Mapea GET /api/v1/tasks para listado completo y GET /api/v1/tasks/{id} con @PathVariable para consulta por clave primaria.',
        codigoFragmento: `@GetMapping\npublic ResponseEntity<List<TaskResponseDTO>> getAllTasks() {\n    return ResponseEntity.ok(taskService.getAllTasks());\n}\n\n@GetMapping("/{id}")\npublic ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {\n    return ResponseEntity.ok(taskService.getTaskById(id));\n}`
      },
      {
        nombre: 'Parte 3: Creación de Recursos (POST)',
        archivo: 'TaskController.java (continuación)',
        explicacion: 'Mapea POST /api/v1/tasks recibiendo el JSON con @RequestBody y activando Bean Validation con @Valid. Retorna código semántico 201 Created.',
        codigoFragmento: `@PostMapping\npublic ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskRequestDTO dto) {\n    TaskResponseDTO created = taskService.createTask(dto);\n    return ResponseEntity.status(HttpStatus.CREATED).body(created);\n}`
      },
      {
        nombre: 'Parte 4: Actualización (PUT) y Eliminación (DELETE)',
        archivo: 'TaskController.java (continuación)',
        explicacion: 'PUT actualiza el recurso retornando 200 OK. DELETE elimina el recurso y retorna 204 No Content sin cuerpo.',
        codigoFragmento: `@PutMapping("/{id}")\npublic ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequestDTO dto) {\n    return ResponseEntity.ok(taskService.updateTask(id, dto));\n}\n\n@DeleteMapping("/{id}")\npublic ResponseEntity<Void> deleteTask(@PathVariable Long id) {\n    taskService.deleteTask(id);\n    return ResponseEntity.noContent().build();\n}`
      }
    ],
    puntosDefensa: [
      '¿Por qué retornar ResponseEntity en vez de devolver directamente el DTO? Porque ResponseEntity permite controlar de forma precisa el código de estado HTTP (201 Created, 204 No Content) y las cabeceras de respuesta (como Location).',
      '¿Qué diferencia hay entre @PathVariable y @RequestParam? @PathVariable extrae valores embebidos en el path (/tasks/42), mientras que @RequestParam extrae parámetros de consulta en el query string (/tasks?completed=true).'
    ],
    erroresComunes: [
      'Olvidar la anotación @RequestBody en métodos POST/PUT, provocando que el DTO llegue con todos sus campos nulos.',
      'Devolver siempre HTTP 200 OK en lugar de los códigos estándar REST como 201 Created o 204 No Content.'
    ],
    conexionProyectoFinal: 'Es el componente real que reside en exercises/01-capa-controller/TaskController.java y atiende las peticiones del frontend.'
  },

  7: {
    slug: 'creacion-servicio',
    tituloCorto: 'Creación de la Capa de Servicio',
    subtitulo: 'Lógica de negocio, inyección de dependencias y gestión transaccional con @Transactional',
    objetivo: 'Implementar TaskServiceImpl para concentrar las reglas de negocio, coordinar repositorios y mappers, y garantizar la atomicidad transaccional de las operaciones.',
    problemaIngenieria: 'Si la lógica de negocio se escribe en el controlador, queda fuertemente acoplada a HTTP y no se puede reutilizar desde otros canales (CLI, mensajería, tareas programadas). Si se escribe en la entidad, queda acoplada al esquema de base de datos. La capa de servicio es el corazón de la aplicación donde residen las validaciones y procesos del negocio.',
    partes: [
      {
        nombre: 'Parte 1: El Contrato de Negocio (TaskService)',
        archivo: 'TaskService.java',
        explicacion: 'Interfaz que define los casos de uso disponibles trabajando exclusivamente con DTOs.',
        codigoFragmento: `public interface TaskService {\n    List<TaskResponseDTO> getAllTasks();\n    TaskResponseDTO getTaskById(Long id);\n    TaskResponseDTO createTask(TaskRequestDTO dto);\n    TaskResponseDTO updateTask(Long id, TaskRequestDTO dto);\n    void deleteTask(Long id);\n}`
      },
      {
        nombre: 'Parte 2: La Clase de Servicio y Dependencias',
        archivo: 'TaskServiceImpl.java',
        explicacion: 'Anotada con @Service. Recibe TaskRepository y TaskMapper por inyección en el constructor.',
        codigoFragmento: `@Service\npublic class TaskServiceImpl implements TaskService {\n    private final TaskRepository taskRepository;\n    private final TaskMapper taskMapper;\n\n    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {\n        this.taskRepository = taskRepository;\n        this.taskMapper = taskMapper;\n    }\n}`
      },
      {
        nombre: 'Parte 3: Regla de Negocio y Guardado Transaccional',
        archivo: 'TaskServiceImpl.java (createTask)',
        explicacion: 'Valida que no existan tareas duplicadas con el mismo título antes de guardar. Usa @Transactional para garantizar consistencia.',
        codigoFragmento: `@Override\n@Transactional\npublic TaskResponseDTO createTask(TaskRequestDTO dto) {\n    if (taskRepository.existsByTitleIgnoreCase(dto.title())) {\n        throw new DuplicateTaskException("Ya existe una tarea con el título: " + dto.title());\n    }\n    Task entity = taskMapper.toEntity(dto);\n    Task saved = taskRepository.save(entity);\n    return taskMapper.toDTO(saved);\n}`
      },
      {
        nombre: 'Parte 4: Consultas de Solo Lectura',
        archivo: 'TaskServiceImpl.java (getTaskById)',
        explicacion: 'Marca la transacción como readOnly = true para optimizar el rendimiento de Hibernate (evita dirty checking en la sesión).',
        codigoFragmento: `@Override\n@Transactional(readOnly = true)\npublic TaskResponseDTO getTaskById(Long id) {\n    Task task = taskRepository.findById(id)\n        .orElseThrow(() -> new TaskNotFoundException("Tarea no encontrada con ID: " + id));\n    return taskMapper.toDTO(task);\n}`
      }
    ],
    puntosDefensa: [
      '¿Qué ventaja tiene @Transactional(readOnly = true)? Indica a Hibernate que no necesita mantener copias en el Persistence Context para comprobar si las entidades fueron modificadas (dirty checking), reduciendo el consumo de CPU y memoria.',
      '¿Qué excepciones activan el rollback automático en @Transactional? Por defecto solo las RuntimeException (no verificadas) y los Error. Si una excepción es checked (Exception), no hace rollback salvo que se especifique @Transactional(rollbackFor = Exception.class).'
    ],
    erroresComunes: [
      'Llamar a un método @Transactional desde otro método dentro de la misma clase (self-invocation), lo que bypassea el proxy de Spring y no abre transacción.',
      'Atrapar una RuntimeException con try/catch en el servicio y no relanzarla, silenciando el fallo e impidiendo el rollback.'
    ],
    conexionProyectoFinal: 'Se encuentra implementado en exercises/02-capa-service/TaskServiceImpl.java.'
  },

  8: {
    slug: 'introduccion-jpa',
    tituloCorto: 'Introducción a JPA y Modelado de Entidades',
    subtitulo: 'Mapeo Objeto-Relacional (ORM) con anotaciones Jakarta Persistence (@Entity, @Table, @Id)',
    objetivo: 'Modelar la entidad Task mapeando los tipos de datos Java a tipos SQL de base de datos relacional y definiendo restricciones de integridad.',
    problemaIngenieria: 'Los desarrolladores piensan en objetos y relaciones, mientras que las bases de datos relacionales almacenan filas y columnas en tablas. JPA (Java Persistence API / Jakarta Persistence) define el estándar para mapear clases de Java a tablas de base de datos relacionales mediante metadatos.',
    partes: [
      {
        nombre: 'Parte 1: Declaración de Entidad y Tabla',
        archivo: 'Task.java',
        explicacion: 'Marca la clase como entidad persistente y asocia el nombre físico de la tabla en base de datos.',
        codigoFragmento: `@Entity\n@Table(name = "tasks")\npublic class Task {\n    // Atributos y Mapeos\n}`
      },
      {
        nombre: 'Parte 2: Clave Primaria Autoincremental',
        archivo: 'Task.java (continuación)',
        explicacion: 'La anotación @Id identifica la clave primaria. GenerationType.IDENTITY delega la generación de IDs autoincrementales a la base de datos (AUTO_INCREMENT).',
        codigoFragmento: `@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\nprivate Long id;`
      },
      {
        nombre: 'Parte 3: Restricciones de Columnas SQL',
        archivo: 'Task.java (continuación)',
        explicacion: 'Configura propiedades de la columna física: tamaño máximo, no nulidad y unicidad.',
        codigoFragmento: `@Column(name = "title", nullable = false, length = 150)\nprivate String title;\n\n@Column(name = "description", length = 1000)\nprivate String description;\n\n@Column(name = "completed", nullable = false)\nprivate boolean completed = false;\n\n@Column(name = "due_date")\nprivate LocalDate dueDate;`
      },
      {
        nombre: 'Parte 4: Requisitos Obligatorios de JPA',
        archivo: 'Task.java (continuación)',
        explicacion: 'JPA requiere obligatoriamente un constructor sin argumentos (vacío) con visibilidad pública o protegida para instanciar la entidad mediante reflexión.',
        codigoFragmento: `// Constructor vacío obligatorio para Hibernate\nprotected Task() {}\n\npublic Task(String title, String description, LocalDate dueDate) {\n    this.title = title;\n    this.description = description;\n    this.dueDate = dueDate;\n    this.completed = false;\n}`
      }
    ],
    puntosDefensa: [
      '¿Por qué JPA exige un constructor sin argumentos? Porque cuando Hibernate recupera un registro de la base de datos, primero crea el objeto llamando al constructor vacío por reflexión y luego puebla los atributos con los datos de las columnas.',
      '¿Por qué es mala práctica usar Lombok @Data sobre entidades JPA? Porque genera métodos equals, hashCode y toString automáticos que incluyen todas las relaciones. En relaciones bidireccionales esto provoca bucles infinitos (StackOverflowError) y rompe la semántica de colecciones en memoria.'
    ],
    erroresComunes: [
      'Olvidar el constructor vacío protected o public.',
      'Usar tipos primitivos (boolean, int) sin considerar si la columna en base de datos permite valores NULL (preferir Boolean / Integer si es nullable).'
    ],
    conexionProyectoFinal: 'Representa la tabla central del proyecto TaskManager y se coordina con TaskRepository.'
  },

  9: {
    slug: 'spring-data-jpa',
    tituloCorto: 'Uso de Spring Data JPA',
    subtitulo: 'Repositorios automáticos, Query Methods y consultas declarativas (@Query)',
    objetivo: 'Implementar TaskRepository extendiendo JpaRepository para obtener operaciones CRUD completas y definir métodos de consulta derivados sin escribir SQL manual.',
    problemaIngenieria: 'Escribir clases DAO tradicionales requería cientos de líneas de JDBC o Hibernate boilerplate: abrir conexiones, preparar sentencias SQL, mapear ResultSets y gestionar transacciones. Spring Data JPA elimina todo ese código generando las implementaciones dinámicamente en tiempo de ejecución.',
    partes: [
      {
        nombre: 'Parte 1: Declaración del Repositorio',
        archivo: 'TaskRepository.java',
        explicacion: 'Al extender JpaRepository<Task, Long>, Spring Data proporciona automáticamente más de 20 métodos CRUD listos para usar (save, findById, findAll, deleteById, count, existsById).',
        codigoFragmento: `@Repository\npublic interface TaskRepository extends JpaRepository<Task, Long> {\n    // Métodos derivados\n}`
      },
      {
        nombre: 'Parte 2: Query Methods (Derivados por Nombre)',
        archivo: 'TaskRepository.java (continuación)',
        explicacion: 'Spring Data analiza el nombre del método y genera la consulta SQL subyacente automáticamente.',
        codigoFragmento: `// Genera: SELECT * FROM tasks WHERE completed = ?\nList<Task> findByCompleted(boolean completed);\n\n// Genera: SELECT COUNT(*) > 0 FROM tasks WHERE LOWER(title) = LOWER(?)\nboolean existsByTitleIgnoreCase(String title);`
      },
      {
        nombre: 'Parte 3: Consultas con JPQL Personalizado (@Query)',
        archivo: 'TaskRepository.java (continuación)',
        explicacion: 'Permite definir consultas complejas orientadas a objetos (JPQL) independientes del motor de base de datos relacional (H2, MySQL, PostgreSQL).',
        codigoFragmento: `@Query("SELECT t FROM Task t WHERE t.dueDate < :today AND t.completed = false")\nList<Task> findOverdueTasks(@Param("today") LocalDate today);`
      },
      {
        nombre: 'Parte 4: Paginación y Ordenación Eficiente',
        archivo: 'TaskRepository.java (continuación)',
        explicacion: 'Añadir un parámetro Pageable permite limitar y paginar resultados a nivel de base de datos (LIMIT / OFFSET en SQL).',
        codigoFragmento: `Page<Task> findByCompleted(boolean completed, Pageable pageable);`
      }
    ],
    puntosDefensa: [
      '¿Cómo sabe Spring Data qué consulta generar a partir del nombre del método? El parser de Spring Data descompone el nombre del método en prefijos (findBy, existsBy, countBy) y criterios (TitleIgnoreCase, Completed), traduciéndolos directamente al árbol sintáctico de la consulta.',
      '¿Qué diferencia hay entre JpaRepository y CrudRepository? JpaRepository extiende PagingAndSortingRepository (y este a CrudRepository) y añade métodos específicos de JPA como flush(), saveAndFlush() y borrado por lotes.'
    ],
    erroresComunes: [
      'Escribir mal el nombre de la propiedad en un query method (ejemplo: findByTitulo cuando la propiedad en Java se llama title), lo que causa un error fatal al arrancar Spring.',
      'No usar Pageable en tablas grandes, lo que puede provocar OutOfMemoryError al cargar miles de registros en la memoria JVM.'
    ],
    conexionProyectoFinal: 'Se encuentra en exercises/03-capa-repository/TaskRepository.java.'
  },

  10: {
    slug: 'dtos-y-mappers',
    tituloCorto: 'Creación de los DTOs y Mappers',
    subtitulo: 'Aislamiento de la capa de persistencia mediante Java Records y Mappers dedicados',
    objetivo: 'Implementar el patrón DTO utilizando Java Records inmutables y crear TaskMapper para transformar bidireccionalmente entre entidades JPA y DTOs.',
    problemaIngenieria: 'Exponer entidades JPA directamente en los controladores web (@RestController) es un grave antipatrón que provoca: 1) Fuga de datos sensibles, 2) Vulnerabilidades de asignación masiva (Mass Assignment), 3) Dependencias circulares al serializar a JSON, y 4) Acoplamiento rígido entre el contrato del API y el esquema de base de datos.',
    partes: [
      {
        nombre: 'Parte 1: DTO de Entrada Inmutable (Request)',
        archivo: 'TaskRequestDTO.java',
        explicacion: 'Java Record que encapsula los datos que el cliente debe enviar para crear o modificar una tarea. No incluye ID ni campos calculados por el servidor.',
        codigoFragmento: `public record TaskRequestDTO(\n    @NotBlank(message = "El título es obligatorio")\n    @Size(min = 3, max = 150, message = "El título debe tener entre 3 y 150 caracteres")\n    String title,\n\n    @Size(max = 1000, message = "La descripción no puede superar 1000 caracteres")\n    String description,\n\n    @FutureOrPresent(message = "La fecha límite debe ser hoy o en el futuro")\n    LocalDate dueDate\n) {}`
      },
      {
        nombre: 'Parte 2: DTO de Salida (Response)',
        archivo: 'TaskResponseDTO.java',
        explicacion: 'Java Record que define exactamente la estructura JSON que el cliente recibirá, incluyendo ID y estado de completitud.',
        codigoFragmento: `public record TaskResponseDTO(\n    Long id,\n    String title,\n    String description,\n    boolean completed,\n    LocalDate dueDate\n) {}`
      },
      {
        nombre: 'Parte 3: El Componente Mapper (@Component)',
        archivo: 'TaskMapper.java',
        explicacion: 'Transforma objetos de un modelo a otro con métodos explícitos toEntity() y toDTO(), centralizando la lógica de mapeo en un único lugar testeable.',
        codigoFragmento: `@Component\npublic class TaskMapper {\n    public Task toEntity(TaskRequestDTO dto) {\n        if (dto == null) return null;\n        return new Task(dto.title(), dto.description(), dto.dueDate());\n    }\n\n    public TaskResponseDTO toDTO(Task entity) {\n        if (entity == null) return null;\n        return new TaskResponseDTO(\n            entity.getId(),\n            entity.getTitle(),\n            entity.getDescription(),\n            entity.isCompleted(),\n            entity.getDueDate()\n        );\n    }\n}`
      },
      {
        nombre: 'Parte 4: Uso en la Capa de Servicio',
        archivo: 'TaskServiceImpl.java',
        explicacion: 'El servicio recibe el DTO de entrada, lo convierte a Entidad con el mapper, persiste con el repositorio y devuelve el DTO de salida.',
        codigoFragmento: `Task task = taskMapper.toEntity(requestDTO);\nTask saved = taskRepository.save(task);\nreturn taskMapper.toDTO(saved);`
      }
    ],
    puntosDefensa: [
      '¿Por qué usar Java Records para los DTOs? Porque los records son inmutables por diseño, libres de boilerplate (generan automáticamente constructor canónico, getters accesores, equals, hashCode y toString) y representan fielmente datos portadores de valor.',
      '¿Qué problema causa serializar directamente una entidad JPA con Jackson? Si la entidad tiene relaciones bidireccionales (@OneToMany / @ManyToOne), Jackson entrará en un bucle recursivo infinito provocando StackOverflowError. Los DTOs cortan de raíz este problema.'
    ],
    erroresComunes: [
      'Modificar la entidad directamente con los datos de un DTO sin validar previamente su contenido.',
      'Permitir que el DTO de entrada acepte campos de control como id o completed que solo el backend debe gestionar.'
    ],
    conexionProyectoFinal: 'Se encuentra en exercises/04-capa-dto-mapper/TaskMapper.java.'
  },

  11: {
    slug: 'validaciones-bean-validation',
    tituloCorto: 'Uso de Validaciones (Bean Validation)',
    subtitulo: 'Reglas declarativas con Jakarta Validation y control en frontera con @Valid',
    objetivo: 'Aplicar validaciones automáticas sobre los payloads JSON de entrada mediante anotaciones estándar como @NotBlank, @Size y @FutureOrPresent, impidiendo que datos inválidos lleguen a la capa de servicio.',
    problemaIngenieria: 'Escribir comprobaciones de `if (title == null || title.trim().isEmpty())` en cada método de servicio ensucia la lógica de negocio y duplica código. Bean Validation permite declarar las restricciones de datos directamente en las propiedades del DTO de forma estandarizada y declarativa.',
    partes: [
      {
        nombre: 'Parte 1: Dependencia de Validación en Maven',
        archivo: 'pom.xml',
        explicacion: 'Incluye el starter oficial que incorpora Hibernate Validator y la especificación Jakarta Validation.',
        codigoFragmento: `<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-validation</artifactId>\n</dependency>`
      },
      {
        nombre: 'Parte 2: Anotaciones Declarativas en el DTO',
        archivo: 'TaskRequestDTO.java',
        explicacion: 'Define reglas con mensajes de error descriptivos listos para internacionalización o consumo directo por el frontend.',
        codigoFragmento: `public record TaskRequestDTO(\n    @NotBlank(message = "El título de la tarea no puede estar vacío")\n    @Size(min = 3, max = 150, message = "El título debe contener entre 3 y 150 caracteres")\n    String title,\n\n    @Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres")\n    String description,\n\n    @FutureOrPresent(message = "La fecha límite debe ser igual o posterior a hoy")\n    LocalDate dueDate\n) {}`
      },
      {
        nombre: 'Parte 3: Activación en el Endpoint con @Valid',
        archivo: 'TaskController.java',
        explicacion: 'Al anteponer @Valid a @RequestBody, Spring intercepta el JSON antes de entrar al cuerpo del método. Si hay fallos de validación, lanza automáticamente MethodArgumentNotValidException sin llegar a ejecutar el método.',
        codigoFragmento: `@PostMapping\npublic ResponseEntity<TaskResponseDTO> createTask(\n    @Valid @RequestBody TaskRequestDTO dto\n) {\n    return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(dto));\n}`
      },
      {
        nombre: 'Parte 4: Flujo de Interrupción Automático',
        archivo: 'Ciclo de Petición',
        explicacion: 'Si title viene vacío, Spring aborta la petición con HTTP 400 Bad Request. La base de datos y la capa de servicio nunca se enteran ni reciben datos basura.',
        codigoFragmento: `POST /api/v1/tasks\n{\n  "title": ""\n}\n--> HTTP/1.1 400 Bad Request`
      }
    ],
    puntosDefensa: [
      '¿Qué diferencia hay entre @NotNull, @NotEmpty y @NotBlank? @NotNull solo comprueba que la referencia no sea null (permite cadenas vacías ""). @NotEmpty comprueba que no sea null y que length > 0 (permite cadenas con espacios " "). @NotBlank comprueba que no sea null y que tras hacer trim() contenga al menos un carácter visible. Para Strings siempre se debe usar @NotBlank.',
      '¿Qué ocurre si no pongo @Valid en el @RequestBody? Las anotaciones declaradas en el DTO son totalmente ignoradas y el payload se procesa sin ninguna validación.'
    ],
    erroresComunes: [
      'Usar @NotNull en lugar de @NotBlank en campos de texto String.',
      'No combinar Bean Validation con un @RestControllerAdvice para devolver un JSON de errores comprensible.'
    ],
    conexionProyectoFinal: 'Se integra en todos los endpoints de escritura (POST y PUT) de TaskManager y Librería.'
  },

  12: {
    slug: 'manejo-global-errores',
    tituloCorto: 'Manejo Global de Errores (@RestControllerAdvice)',
    subtitulo: 'Captura centralizada de excepciones, respuestas semánticas y estándar RFC 7807',
    objetivo: 'Implementar GlobalExceptionHandler mediante @RestControllerAdvice para interceptar excepciones de negocio y de validación, transformándolas en respuestas JSON estructuradas con códigos HTTP semánticos.',
    problemaIngenieria: 'Sin un manejador global, cualquier excepción no controlada provoca que Spring Boot devuelva una página de error genérica ("Whitelabel Error Page") o un stacktrace completo de Java, lo cual es inseguro (expone rutas internas y versiones) y genera una pésima experiencia para el frontend.',
    partes: [
      {
        nombre: 'Parte 1: Excepciones de Negocio Personalizadas',
        archivo: 'TaskNotFoundException.java & DuplicateTaskException.java',
        explicacion: 'Extienden RuntimeException para indicar situaciones anómalas del dominio sin ensuciar las firmas de los métodos.',
        codigoFragmento: `public class TaskNotFoundException extends RuntimeException {\n    public TaskNotFoundException(String message) { super(message); }\n}\n\npublic class DuplicateTaskException extends RuntimeException {\n    public DuplicateTaskException(String message) { super(message); }\n}`
      },
      {
        nombre: 'Parte 2: La Anotación @RestControllerAdvice',
        archivo: 'GlobalExceptionHandler.java',
        explicacion: 'Aplica el patrón de diseño Interceptor / Aspect-Oriented Programming (AOP). Escucha todas las excepciones que emergen de cualquier @RestController.',
        codigoFragmento: `@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    // Métodos @ExceptionHandler\n}`
      },
      {
        nombre: 'Parte 3: Mapeo de Códigos HTTP Específicos',
        archivo: 'GlobalExceptionHandler.java (continuación)',
        explicacion: 'Mapea TaskNotFoundException a 404 NOT FOUND y DuplicateTaskException a 409 CONFLICT.',
        codigoFragmento: `@ExceptionHandler(TaskNotFoundException.class)\npublic ResponseEntity<ErrorResponse> handleNotFound(TaskNotFoundException ex, HttpServletRequest req) {\n    ErrorResponse err = new ErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "Not Found", ex.getMessage(), req.getRequestURI());\n    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);\n}\n\n@ExceptionHandler(DuplicateTaskException.class)\npublic ResponseEntity<ErrorResponse> handleDuplicate(DuplicateTaskException ex, HttpServletRequest req) {\n    ErrorResponse err = new ErrorResponse(LocalDateTime.now(), HttpStatus.CONFLICT.value(), "Conflict", ex.getMessage(), req.getRequestURI());\n    return ResponseEntity.status(HttpStatus.CONFLICT).body(err);\n}`
      },
      {
        nombre: 'Parte 4: Captura de Errores de Validación Bean Validation',
        archivo: 'GlobalExceptionHandler.java (continuación)',
        explicacion: 'Captura MethodArgumentNotValidException y extrae una lista limpia con el nombre de cada campo fallido y su mensaje de error.',
        codigoFragmento: `@ExceptionHandler(MethodArgumentNotValidException.class)\npublic ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {\n    Map<String, String> fieldErrors = new HashMap<>();\n    ex.getBindingResult().getFieldErrors().forEach(err -> fieldErrors.put(err.getField(), err.getDefaultMessage()));\n    \n    Map<String, Object> body = new LinkedHashMap<>();\n    body.put("timestamp", LocalDateTime.now());\n    body.put("status", 400);\n    body.put("errors", fieldErrors);\n    return ResponseEntity.badRequest().body(body);\n}`
      }
    ],
    puntosDefensa: [
      '¿Por qué usar @RestControllerAdvice en vez de try/catch en cada método del Controller? Porque elimina la duplicación masiva de código (DRY), desacopla el manejo de fallos del flujo normal y garantiza que ningún error escape sin una respuesta JSON estandarizada.',
      '¿Qué es el estándar Problem Details (RFC 7807)? Es la especificación oficial de la IETF que define un formato JSON estándar para reportar errores en APIs HTTP (campos type, title, status, detail, instance).'
    ],
    erroresComunes: [
      'Devolver siempre código HTTP 500 para errores del cliente como "recurso no encontrado" (404) o "datos inválidos" (400).',
      'Filtrar mensajes técnicos de la base de datos (como sentencias SQL) en la respuesta de error al cliente.'
    ],
    conexionProyectoFinal: 'Se encuentra en exercises/05-capa-exceptions/GlobalExceptionHandler.java.'
  },

  13: {
    slug: 'documentacion-openapi-swagger',
    tituloCorto: 'Documentación de la API con OpenAPI / Swagger',
    subtitulo: 'Especificación viva OpenAPI 3.0, anotaciones @Operation y UI interactiva en navegador',
    objetivo: 'Integrar springdoc-openapi para generar automáticamente la documentación interactiva de la API accesible en /swagger-ui.html.',
    problemaIngenieria: 'La documentación manual en documentos PDF o wikis se desactualiza en cuanto el código cambia. OpenAPI genera la documentación dinámicamente a partir del propio código y anotaciones de Java, garantizando que el contrato de la API siempre coincida al 100% con la implementación real.',
    partes: [
      {
        nombre: 'Parte 1: Dependencia Springdoc OpenAPI',
        archivo: 'pom.xml',
        explicacion: 'Incorpora la librería que auto-inspecciona los controladores Spring MVC y genera los endpoints /v3/api-docs y /swagger-ui.html.',
        codigoFragmento: `<dependency>\n    <groupId>org.springdoc</groupId>\n    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>\n    <version>2.3.0</version>\n</dependency>`
      },
      {
        nombre: 'Parte 2: Metadatos Globales de la API',
        archivo: 'OpenApiConfig.java',
        explicacion: 'Define el título, versión semántica, descripción y datos de contacto de la API.',
        codigoFragmento: `@Configuration\npublic class OpenApiConfig {\n    @Bean\n    public OpenAPI customOpenAPI() {\n        return new OpenAPI().info(new Info()\n            .title("TaskManager API")\n            .version("v1.0")\n            .description("API REST para gestión de tareas con Spring Boot y Arquitectura por Capas"));\n    }\n}`
      },
      {
        nombre: 'Parte 3: Documentación de Operaciones (@Operation)',
        archivo: 'TaskController.java',
        explicacion: 'Describe qué hace cada endpoint y detalla los códigos de respuesta esperados.',
        codigoFragmento: `@Operation(summary = "Crear nueva tarea", description = "Registra una tarea en la base de datos tras validar los campos")\n@ApiResponses(value = {\n    @ApiResponse(responseCode = "201", description = "Tarea creada con éxito"),\n    @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),\n    @ApiResponse(responseCode = "409", description = "Título de tarea duplicado")\n})\n@PostMapping\npublic ResponseEntity<TaskResponseDTO> createTask(...) { ... }`
      },
      {
        nombre: 'Parte 4: Documentación de Esquemas en DTOs (@Schema)',
        archivo: 'TaskRequestDTO.java',
        explicacion: 'Muestra ejemplos de payloads reales y descripciones de campos en la interfaz visual de Swagger.',
        codigoFragmento: `public record TaskRequestDTO(\n    @Schema(description = "Título descriptivo de la tarea", example = "Estudiar Mockito")\n    String title,\n    @Schema(description = "Detalle adicional opcional", example = "Repasar anotaciones @Mock")\n    String description,\n    @Schema(description = "Fecha límite", example = "2026-12-01")\n    LocalDate dueDate\n) {}`
      }
    ],
    puntosDefensa: [
      '¿Qué ventaja aporta Swagger UI al equipo de frontend? Permite explorar todos los endpoints disponibles, ver el formato exacto del JSON requerido y probar peticiones en vivo directamente desde el navegador sin necesidad de herramientas externas como Postman.',
      '¿Cómo se documenta la autenticación JWT en OpenAPI? Mediante un @SecurityScheme de tipo HTTP y bearerFormat = "JWT", lo que añade el botón "Authorize" en Swagger UI para probar endpoints protegidos con token.'
    ],
    erroresComunes: [
      'Bloquear las rutas de Swagger (/swagger-ui/** y /v3/api-docs/**) en Spring Security por no dejarlas como públicas en permitAll().',
      'No documentar los códigos de error posibles (400, 404, 409), haciendo que el frontend desconozca qué errores pueden suceder.'
    ],
    conexionProyectoFinal: 'Disponible en la URL local http://localhost:8080/swagger-ui.html cuando la aplicación está en ejecución.'
  },

  14: {
    slug: 'pruebas-junit-mockito',
    tituloCorto: 'Pruebas en Aplicaciones Spring Boot (JUnit 5 & Mockito)',
    subtitulo: 'Testing unitario con @ExtendWith(MockitoExtension.class), @Mock, @InjectMocks y verify()',
    objetivo: 'Escribir pruebas unitarias exhaustivas para TaskServiceImpl falseando las dependencias externas (TaskRepository y TaskMapper) con Mockito y validando el patrón AAA (Arrange, Act, Assert).',
    problemaIngenieria: 'Probar la lógica de un servicio levantando Spring Boot y una base de datos real es lento (tarda segundos en iniciar) y frágil (depende del estado de la base de datos). Las pruebas unitarias con mocks se ejecutan en memoria en milisegundos, permitiendo validar casos borde y errores sin dependencias externas.',
    partes: [
      {
        nombre: 'Parte 1: Inicialización con MockitoExtension',
        archivo: 'TaskServiceImplTest.java',
        explicacion: 'Anotada con @ExtendWith(MockitoExtension.class). No levanta el contexto de Spring; se ejecuta como código Java puro a máxima velocidad.',
        codigoFragmento: `@ExtendWith(MockitoExtension.class)\nclass TaskServiceImplTest {\n    @Mock\n    private TaskRepository taskRepository;\n    @Mock\n    private TaskMapper taskMapper;\n    @InjectMocks\n    private TaskServiceImpl taskService;\n}`
      },
      {
        nombre: 'Parte 2: Caso de Éxito con Patrón AAA',
        archivo: 'TaskServiceImplTest.java (testCreateTask_Success)',
        explicacion: 'Arrange (preparar mocks con when), Act (ejecutar método del servicio) y Assert (verificar resultado con AssertJ).',
        codigoFragmento: `@Test\nvoid shouldCreateTaskSuccessfully() {\n    // Arrange\n    TaskRequestDTO request = new TaskRequestDTO("Aprender Mockito", "Detalle", LocalDate.now());\n    Task taskEntity = new Task("Aprender Mockito", "Detalle", LocalDate.now());\n    Task savedEntity = new Task("Aprender Mockito", "Detalle", LocalDate.now());\n    TaskResponseDTO expectedDTO = new TaskResponseDTO(1L, "Aprender Mockito", "Detalle", false, LocalDate.now());\n\n    when(taskRepository.existsByTitleIgnoreCase(request.title())).thenReturn(false);\n    when(taskMapper.toEntity(request)).thenReturn(taskEntity);\n    when(taskRepository.save(taskEntity)).thenReturn(savedEntity);\n    when(taskMapper.toDTO(savedEntity)).thenReturn(expectedDTO);\n\n    // Act\n    TaskResponseDTO result = taskService.createTask(request);\n\n    // Assert\n    assertThat(result).isNotNull();\n    assertThat(result.id()).isEqualTo(1L);\n    verify(taskRepository, times(1)).save(taskEntity);\n}`
      },
      {
        nombre: 'Parte 3: Caso de Error y Lanzamiento de Excepciones',
        archivo: 'TaskServiceImplTest.java (testCreateTask_Duplicate)',
        explicacion: 'Verifica que el servicio lance la excepción adecuada ante datos duplicados y que jamás intente guardar en el repositorio.',
        codigoFragmento: `@Test\nvoid shouldThrowDuplicateTaskExceptionWhenTitleExists() {\n    // Arrange\n    TaskRequestDTO request = new TaskRequestDTO("Duplicado", "Detalle", null);\n    when(taskRepository.existsByTitleIgnoreCase("Duplicado")).thenReturn(true);\n\n    // Act & Assert\n    assertThatThrownBy(() -> taskService.createTask(request))\n        .isInstanceOf(DuplicateTaskException.class)\n        .hasMessageContaining("Duplicado");\n\n    // Verificar que NUNCA se guardó nada\n    verify(taskRepository, never()).save(any());\n}`
      },
      {
        nombre: 'Parte 4: Verificación de Interacciones con verify()',
        archivo: 'TaskServiceImplTest.java (testDeleteTask)',
        explicacion: 'Asegura que el método repository.deleteById() se invocó con el identificador correcto.',
        codigoFragmento: `@Test\nvoid shouldDeleteTaskWhenExists() {\n    when(taskRepository.existsById(1L)).thenReturn(true);\n    taskService.deleteTask(1L);\n    verify(taskRepository).deleteById(1L);\n}`
      }
    ],
    puntosDefensa: [
      '¿Qué diferencia hay entre @Mock y @InjectMocks? @Mock crea un objeto doble ficticio cuyas respuestas controlamos con when(). @InjectMocks crea una instancia real de la clase que estamos probando e inyecta en ella los @Mock creados anteriormente.',
      '¿Por qué usar @ExtendWith(MockitoExtension.class) en lugar de @SpringBootTest para pruebas unitarias? Porque @SpringBootTest levanta el contenedor completo de Spring con todos los beans (tardando varios segundos), mientras que MockitoExtension solo inicializa objetos en memoria sin contexto de Spring, ejecutando decenas de tests en milisegundos.'
    ],
    erroresComunes: [
      'No usar verify(repository, never()).save(...) al testear flujos donde debe lanzarse una excepción previa.',
      'Usar @SpringBootTest para probar métodos simples de un servicio que no necesitan integración real.'
    ],
    conexionProyectoFinal: 'Se encuentra en exercises/07-testing-mockito/TaskServiceImplTest.java.'
  },

  15: {
    slug: 'seguridad-jwt',
    tituloCorto: 'Seguridad con Spring Security y JWT',
    subtitulo: 'Filtro stateless OncePerRequestFilter, tokens HMAC-SHA256 y SecurityFilterChain',
    objetivo: 'Proteger la API mediante Spring Security y autenticación Stateless basada en tokens JSON Web Token (JWT).',
    problemaIngenieria: 'Las APIs RESTful deben ser Stateless (sin estado): el servidor no guarda sesiones HTTP en memoria para poder escalar horizontalmente en clústeres. El cliente debe enviar en cada petición una credencial criptográficamente firmada (JWT en la cabecera Authorization: Bearer <token>) que el backend valida de forma autónoma sin consultar base de datos en cada llamada.',
    partes: [
      {
        nombre: 'Parte 1: Dependencias de Seguridad y JWT',
        archivo: 'pom.xml',
        explicacion: 'Incorpora el starter de seguridad y la biblioteca JJWT para parseo y validación de tokens.',
        codigoFragmento: `<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-security</artifactId>\n</dependency>\n<dependency>\n    <groupId>io.jsonwebtoken</groupId>\n    <artifactId>jjwt-api</artifactId>\n    <version>0.12.3</version>\n</dependency>`
      },
      {
        nombre: 'Parte 2: Cadena de Filtros de Seguridad (SecurityConfig)',
        archivo: 'SecurityConfig.java',
        explicacion: 'Desactiva CSRF (innecesario en APIs stateless), establece sesión STATELESS y define qué endpoints son públicos (login, registro, swagger) y cuáles requieren autenticación.',
        codigoFragmento: `@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {\n        return http\n            .csrf(AbstractHttpConfigurer::disable)\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/v1/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/h2-console/**").permitAll()\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)\n            .build();\n    }\n}`
      },
      {
        nombre: 'Parte 3: El Filtro Personalizado OncePerRequestFilter',
        archivo: 'JwtAuthFilter.java',
        explicacion: 'Intercepta cada petición HTTP, extrae la cabecera Authorization, valida la firma del token y registra la autenticación en el SecurityContextHolder.',
        codigoFragmento: `@Component\npublic class JwtAuthFilter extends OncePerRequestFilter {\n    private final JwtService jwtService;\n    private final UserDetailsService userDetailsService;\n\n    @Override\n    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)\n            throws ServletException, IOException {\n        String authHeader = request.getHeader("Authorization");\n        if (authHeader != null && authHeader.startsWith("Bearer ")) {\n            String token = authHeader.substring(7);\n            if (jwtService.isTokenValid(token)) {\n                String username = jwtService.extractUsername(token);\n                UserDetails user = userDetailsService.loadUserByUsername(username);\n                var auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());\n                SecurityContextHolder.getContext().setAuthentication(auth);\n            }\n        }\n        filterChain.doFilter(request, response);\n    }\n}`
      },
      {
        nombre: 'Parte 4: Cifrado Seguro de Contraseñas',
        archivo: 'SecurityConfig.java (PasswordEncoder)',
        explicacion: 'Utiliza el algoritmo BCrypt para realizar hashing unidireccional con salt dinámico de las contraseñas antes de almacenarlas.',
        codigoFragmento: `@Bean\npublic PasswordEncoder passwordEncoder() {\n    return new BCryptPasswordEncoder();\n}`
      }
    ],
    puntosDefensa: [
      '¿Por qué se desactiva CSRF en APIs REST con JWT? CSRF (Cross-Site Request Forgery) se aprovecha de que los navegadores envían automáticamente las cookies de sesión en peticiones cruzadas. Como en una API REST con JWT no usamos cookies sino la cabecera Authorization: Bearer explícita, la API es inmune a ataques CSRF por naturaleza.',
      '¿Qué contiene un JWT? Consta de 3 partes separadas por puntos (Header.Payload.Signature). El Header indica el algoritmo, el Payload contiene los claims (usuario, roles, caducidad) y la Signature es el hash criptográfico calculado con la clave secreta del servidor.'
    ],
    erroresComunes: [
      'Almacenar contraseñas en texto plano o con algoritmos obsoletos como MD5 o SHA-1 en lugar de BCrypt.',
      'Hardcodear la clave secreta JWT en el código fuente en lugar de inyectarla mediante variables de entorno.'
    ],
    conexionProyectoFinal: 'Se encuentra en exercises/06-capa-security-jwt/SecurityConfig.java.'
  },

  16: {
    slug: 'despliegue-docker',
    tituloCorto: 'Despliegue con Docker',
    subtitulo: 'Multi-stage builds, imágenes ligeras Alpine, usuario no-root y docker-compose',
    objetivo: 'Empaquetar la aplicación Spring Boot en una imagen Docker optimizada mediante Multi-stage Build y orquestar el despliegue junto a una base de datos MySQL con Docker Compose.',
    problemaIngenieria: 'El clásico problema de "en mi máquina funciona pero en producción falla" se debe a diferencias en la versión de Java, dependencias del sistema operativo o configuraciones del servidor. Docker encapsula la aplicación junto a su runtime exacto garantizando un comportamiento 100% idéntico en cualquier entorno.',
    partes: [
      {
        nombre: 'Parte 1: Multi-stage Build (Etapa de Compilación)',
        archivo: 'Dockerfile (Etapa 1: Builder)',
        explicacion: 'Utiliza una imagen con Maven y el JDK completo para compilar el código y generar el JAR. Al terminar, esta imagen pesada se descarta.',
        codigoFragmento: `# Etapa 1: Compilación del proyecto\nFROM maven:3.9-eclipse-temurin-17 AS builder\nWORKDIR /build\nCOPY pom.xml .\nRUN mvn dependency:go-offline -B\nCOPY src ./src\nRUN mvn clean package -DskipTests`
      },
      {
        nombre: 'Parte 2: Imagen Final Ultraligera y Segura (Runtime)',
        archivo: 'Dockerfile (Etapa 2: Runner)',
        explicacion: 'Copia solo el archivo JAR final a una imagen base JRE Alpine (pesa menos de 150MB en lugar de 800MB) y crea un usuario sin privilegios root por seguridad.',
        codigoFragmento: `# Etapa 2: Imagen de ejecución ligera\nFROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nRUN addgroup -S spring && adduser -S spring -G spring\nUSER spring:spring\nCOPY --from=builder /build/target/*.jar app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "app.jar"]`
      },
      {
        nombre: 'Parte 3: Orquestación con Docker Compose',
        archivo: 'docker-compose.yml',
        explicacion: 'Define la red interna que conecta el servicio Spring Boot con un contenedor de base de datos MySQL, gestionando variables de entorno y persistencia en volúmenes.',
        codigoFragmento: `version: '3.8'\nservices:\n  taskmanager-db:\n    image: mysql:8.0\n    environment:\n      MYSQL_DATABASE: taskdb\n      MYSQL_ROOT_PASSWORD: secret_password\n    ports:\n      - "3306:3306"\n    volumes:\n      - db_data:/var/lib/mysql\n\n  taskmanager-app:\n    build: .\n    ports:\n      - "8080:8080"\n    environment:\n      SPRING_DATASOURCE_URL: jdbc:mysql://taskmanager-db:3306/taskdb\n      SPRING_DATASOURCE_USERNAME: root\n      SPRING_DATASOURCE_PASSWORD: secret_password\n    depends_on:\n      - taskmanager-db\n\nvolumes:\n  db_data:`
      },
      {
        nombre: 'Parte 4: Comandos de Despliegue',
        archivo: 'Terminal / CLI',
        explicacion: 'Construye y levanta toda la infraestructura con un único comando.',
        codigoFragmento: `# Construir la imagen Docker\ndocker build -t taskmanager:latest .\n\n# Levantar la aplicación y la base de datos MySQL\ndocker compose up -d\n\n# Ver logs en tiempo real\ndocker compose logs -f taskmanager-app`
      }
    ],
    puntosDefensa: [
      '¿Qué ventaja tiene un Dockerfile Multi-stage Build? Permite compilar dentro de un contenedor sin requerir Maven en la máquina anfitriona y genera una imagen final de producción sin el código fuente ni herramientas de compilación, reduciendo drásticamente el tamaño y la superficie de ataque.',
      '¿Por qué crear un usuario sin privilegios (USER spring)? Si un atacante lograra comprometer la aplicación mediante una vulnerabilidad (como inyección de código), solo tendría los permisos restringidos de ese usuario en lugar de acceso root al host.'
    ],
    erroresComunes: [
      'Ejecutar el contenedor como usuario root en entornos de producción.',
      'No usar .dockerignore para excluir la carpeta target y .git, provocando transferencias innecesarias de cientos de megabytes al daemon de Docker.'
    ],
    conexionProyectoFinal: 'Permite desplegar la aplicación completa TaskManager y Librería en cualquier nube o entorno de servidores sin configurar nada localmente.'
  }
};
