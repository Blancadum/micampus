/**
 * Banco de Preguntas y Respuestas de Reflexión oficial para las actividades de Accenture Spring Boot.
 * Estructurado en formato documento para exportar/copiar directamente a `notas/NOTAS-XX-*.md`.
 */

export const ACCENTURE_REFLEXIONES = {
  '12-manejo-de-errores': {
    actividadNumero: 12,
    ficheroNotas: 'notas/NOTAS-07-manejo-de-errores.md',
    rama: '07-manejo-de-errores',
    prTitulo: 'Spring Boot – Manejo global de errores',
    tituloDoc: 'NOTAS-07: Manejo Global de Errores con @RestControllerAdvice',
    modulo: 'Bloque 4: DTOs, Validaciones & Errores',
    paso1: {
      titulo: 'Paso 1 — Preguntas de Preparación (Ask)',
      items: [
        {
          pregunta: '¿Cómo centraliza Spring Boot el manejo de errores mediante @RestControllerAdvice y @ExceptionHandler?',
          respuesta: '@RestControllerAdvice es una especialización de @ControllerAdvice que combina la interceptación global de excepciones con la semántica de @ResponseBody. Spring captura cualquier excepción no controlada que escape de los controladores REST y busca el método anotado con @ExceptionHandler cuya jerarquía coincida más específicamente con la excepción lanzada. Esto permite formatear una respuesta HTTP uniforme (con status code y cuerpo ErrorResponse) sin duplicar bloques try/catch en cada endpoint.'
        },
        {
          pregunta: '¿Cuál es la diferencia entre capturar excepciones en el Controller con try/catch frente a un GlobalExceptionHandler?',
          respuesta: 'El bloque try/catch en cada Controller acopla el código de presentación con la lógica de formateo de errores, genera código repetitivo y suele provocar respuestas inconsistentes entre diferentes endpoints. GlobalExceptionHandler separa radicalmente responsabilidades: los controladores delegan el flujo natural y cualquier fallo se traduce de manera centralizada a un estándar JSON único en toda la API.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión del Código (Ask)',
      items: [
        {
          pregunta: '¿Por qué TaskNotFoundException extiende RuntimeException y no Exception?',
          respuesta: 'Porque es una excepción no comprobada (unchecked exception). En la arquitectura moderna de Spring, las excepciones de negocio no deben forzar firmas con cláusulas "throws" en interfaces de servicio ni controladores. Además, Spring aplica rollback automático en transacciones declarativas (@Transactional) únicamente ante RuntimeException y Error, a menos que se configure explícitamente lo contrario.'
        },
        {
          pregunta: '¿Qué hace Spring internamente cuando una excepción llega al GlobalExceptionHandler? ¿Cómo sabe qué método @ExceptionHandler ejecutar?',
          respuesta: 'El DispatcherServlet captura la excepción y la delega a la cadena de HandlerExceptionResolvers (concretamente a ExceptionHandlerExceptionResolver). Este componente busca beans anotados con @ControllerAdvice / @RestControllerAdvice, inspecciona los métodos con @ExceptionHandler y calcula la distancia jerárquica en el árbol de herencia de clases de Java entre la excepción lanzada y las declaradas. Ejecuta siempre el método con la coincidencia más cercana y específica.'
        },
        {
          pregunta: '¿Cómo se extraen todos los mensajes de error de una MethodArgumentNotValidException?',
          respuesta: 'Invocando "ex.getBindingResult().getFieldErrors()". Esta llamada devuelve una lista de objetos FieldError. Iterando sobre ella, se extrae el nombre del campo con "error.getField()" y el mensaje de validación con "error.getDefaultMessage()", permitiendo concatenarlos en un String descriptivo o empaquetarlos en un array de detalles.'
        },
        {
          pregunta: '¿Qué pasaría si no capturas Exception como último recurso? ¿Qué devolvería Spring por defecto?',
          respuesta: 'Cualquier excepción inesperada (como NullPointerException, fallo de base de datos o error de red) escaparía del manejador personalizado y sería procesada por el BasicErrorController predeterminado de Spring Boot. Esto devolvería un error 500 con la estructura por defecto de Spring (o la página Whitelabel en desarrollo), rompiendo el contrato uniforme ErrorResponse acordado con el cliente y potencialmente exponiendo trazas internas del servidor.'
        },
        {
          pregunta: '¿Por qué es importante que todos los errores devuelvan siempre la misma estructura ErrorResponse?',
          respuesta: 'Porque proporciona un contrato de API determinista, consistente y predecible. Las aplicaciones cliente (frontend en React, apps móviles o microservicios consumidores) pueden implementar un único interceptor o deserializador de errores global sin tener que comprobar dinámicamente si el error viene como String, Map o formato estándar de Spring.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué problema concreto resuelve tener un GlobalExceptionHandler frente a capturar excepciones en cada Controller?',
          respuesta: 'Resuelve el problema de la dispersión de código y la inconsistencia en las respuestas. Al eliminar los bloques try/catch repetidos en cada método del controlador, el código queda limpio y enfocado exclusivamente en orquestar peticiones y respuestas. Cualquier cambio futuro en el formato de error de la compañía se aplica en un único punto sin modificar cientos de endpoints.'
        },
        {
          pregunta: '2. ¿Qué información incluirías o eliminarías de ErrorResponse pensando en la seguridad de la API?',
          respuesta: 'Pensando en seguridad (OWASP API Security): se debe ELIMINAR cualquier traza de pila (stack trace), nombres de tablas SQL, consultas internas, nombres de clases Java o versiones del framework, ya que proporcionan vectores de explotación a posibles atacantes. Se debe INCLUIR un identificador único de correlación (traceId o correlationId) para que el usuario o cliente pueda reportar la incidencia y el equipo de operaciones pueda buscar el detalle técnico real en los logs seguros del servidor.'
        },
        {
          pregunta: '3. ¿Qué ocurriría si en el futuro añades un nuevo Controller? ¿Necesitas tocar el GlobalExceptionHandler?',
          respuesta: 'No es necesario modificar GlobalExceptionHandler. Dado que la anotación @RestControllerAdvice tiene alcance global sobre todo el contexto de la aplicación, el nuevo Controller heredará automáticamente el manejo de 404, 400 y 500 para todas las excepciones ya mapeadas. Solo se intervendría si el nuevo módulo introduce excepciones de negocio inéditas con semántica REST particular.'
        }
      ]
    }
  },

  '11-uso-de-validaciones': {
    actividadNumero: 11,
    ficheroNotas: 'notas/NOTAS-06-uso-de-validaciones.md',
    rama: '06-uso-de-validaciones',
    prTitulo: 'Spring Boot – Uso de Validaciones',
    tituloDoc: 'NOTAS-06: Validaciones Declarativas y Validadores Custom',
    modulo: 'Bloque 4: DTOs, Validaciones & Errores',
    paso1: {
      titulo: 'Paso 1 — Preguntas de Preparación (Ask)',
      items: [
        {
          pregunta: '¿Cómo funciona el motor Bean Validation (Jakarta Validation / Hibernate Validator) en Spring Boot?',
          respuesta: 'Funciona interceptando los argumentos marcados con @Valid en los métodos del controlador mediante AOP. La especificación valida las restricciones declarativas (@NotBlank, @Size, @NotNull, etc.) en las propiedades del DTO antes de que el controlador ejecute su cuerpo, acumulando los fallos en un BindingResult.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión del Código (Ask)',
      items: [
        {
          pregunta: '¿Qué ocurre internamente cuando Spring encuentra @Valid en un parámetro del Controller?',
          respuesta: 'El RequestResponseBodyMethodProcessor delega la deserialización JSON a Jackson y, acto seguido, invoca al validador registrado (Hibernate Validator). Si se viola alguna restricción, se genera una MethodArgumentNotValidException interrumpiendo el flujo hacia el servicio.'
        },
        {
          pregunta: '¿Qué excepción lanza Spring cuando falla una validación? ¿Dónde se captura ahora mismo?',
          respuesta: 'Lanza MethodArgumentNotValidException. En este ejercicio se captura por el mecanismo por defecto de Spring devolviendo HTTP 400 Bad Request, a la espera de ser centralizada en la siguiente actividad.'
        },
        {
          pregunta: '¿Qué hace el método isValid() en RequiereFechaLimiteValidator y cuándo se ejecuta? ¿Por qué recibe TaskRequestDTO en vez de un solo campo?',
          respuesta: 'Evalúa la regla de validación cruzada: si priority == HIGH, exige que dueDate != null. Se ejecuta automáticamente tras validar las anotaciones de campo. Recibe el objeto DTO completo porque una validación cruzada necesita correlacionar el valor de múltiples propiedades a la vez.'
        },
        {
          pregunta: '¿Qué pasaría si añades @Valid en un método GET? ¿Tiene sentido hacerlo?',
          respuesta: 'En métodos GET no suele haber @RequestBody, pero tiene sentido si se validan objetos encapsulados con @ModelAttribute o si se usa @Validated a nivel de clase para validar @RequestParam o @PathVariable con anotaciones como @Min o @Pattern.'
        },
        {
          pregunta: '¿Por qué los mensajes de error personalizados van en el atributo message de cada anotación?',
          respuesta: 'Para desacoplar el contrato de la regla de su descripción lingüística, permitiendo además internacionalización (i18n) referenciando claves de ResourceBundle como "{validation.title.notblank}".'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué ventaja tiene validar en el Controller antes de llegar al Service?',
          respuesta: 'Sigue el principio Fail-Fast: rechaza datos corruptos o incompletos en la misma frontera HTTP del sistema, evitando abrir transacciones innecesarias, consumir recursos de base de datos o ensuciar la lógica de negocio con comprobaciones sintácticas triviales.'
        },
        {
          pregunta: '2. ¿La respuesta de error que devuelve Spring por defecto es útil para el cliente de la API? ¿Qué mejorarías?',
          respuesta: 'Es útil pero excesivamente técnica, compleja de parsear y habitualmente en inglés con detalles irrelevantes. Se debe mejorar estandarizándola con un ErrorResponse legible que liste los campos inválidos con sus mensajes amigables en español.'
        },
        {
          pregunta: '3. ¿Qué pasaría si un campo tiene varias anotaciones de validación y falla más de una a la vez?',
          respuesta: 'Por defecto Hibernate Validator valida todas las anotaciones aplicadas al campo y genera un error por cada restricción incumplida, acumulándose todas en el BindingResult a menos que se defina un orden secuencial con @GroupSequence.'
        }
      ]
    }
  },

  '10-creacion-de-los-dtos': {
    actividadNumero: 10,
    ficheroNotas: 'notas/NOTAS-05-creacion-de-los-dtos.md',
    rama: '05-creacion-de-los-dtos',
    prTitulo: "Spring Boot – Creación de los DTO's",
    tituloDoc: 'NOTAS-05: Creación de DTOs y Desacoplamiento de Entidades',
    modulo: 'Bloque 4: DTOs, Validaciones & Errores',
    paso1: {
      titulo: 'Paso 1 — Preguntas de Preparación (Ask)',
      items: [
        {
          pregunta: '¿Por qué nunca se deben exponer directamente las entidades JPA en los endpoints REST?',
          respuesta: 'Exponer entidades JPA rompe el encapsulamiento de la base de datos, puede provocar bucles infinitos de serialización JSON por relaciones bidireccionales, expone campos sensibles (contraseñas, flags internos) y acopla rígidamente el esquema relacional con el contrato público de la API.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión del Código (Ask)',
      items: [
        {
          pregunta: '¿Cuál es la diferencia entre un RequestDTO y un ResponseDTO?',
          respuesta: 'El RequestDTO define exclusivamente los datos que el cliente tiene permiso de enviar (sin IDs generados ni metadatos de auditoría). El ResponseDTO proyecta la información que el cliente necesita consumir, formateando fechas, resolviendo nombres de relaciones y ocultando detalles de persistencia.'
        },
        {
          pregunta: '¿Qué ventajas aporta una clase Mapper frente a mapear dentro del propio Controller o Service?',
          respuesta: 'Aplica el principio de responsabilidad única (SRP), reutiliza la transformación en múltiples métodos y facilita pruebas unitarias aisladas para la lógica de conversión.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué problema concreto habrías tenido en relaciones OneToMany si no hubieras introducido DTOs?',
          respuesta: 'Se habrían producido excepciones StackOverflowError por serialización cíclica infinita entre la tarea y su categoría, o bien errores LazyInitializationException si las colecciones se serializaban fuera de la transacción activa.'
        },
        {
          pregunta: '2. ¿Qué ventajas y desventajas tiene la transformación manual frente a MapStruct?',
          respuesta: 'Ventajas: control absoluto del código, facilidad para depurar línea por línea y cero configuración de procesadores de anotaciones. Desventajas: mayor cantidad de código boilerplate y riesgo de olvido al añadir nuevas propiedades en las entidades.'
        },
        {
          pregunta: '3. ¿Por qué en RequestDTO recibimos categoryId pero en ResponseDTO devolvemos categoryName?',
          respuesta: 'Porque en la escritura el cliente solo necesita suministrar la referencia externa (el ID numérico), mientras que en la lectura el usuario final necesita ver el nombre legible de la categoría sin realizar peticiones HTTP adicionales.'
        }
      ]
    }
  },

  '9-uso-spring-data-jpa': {
    actividadNumero: 9,
    ficheroNotas: 'notas/NOTAS-04-uso-spring-data-jpa.md',
    rama: '04-uso-spring-data-jpa',
    prTitulo: 'Spring Boot – Uso de Spring Data JPA',
    tituloDoc: 'NOTAS-04: Persistencia Avanzada con Spring Data JPA',
    modulo: 'Bloque 3: Persistencia & Modelado JPA',
    paso1: {
      titulo: 'Paso 1 — Preguntas de Preparación (Ask)',
      items: [
        {
          pregunta: '¿Cómo genera Spring Data JPA las consultas a partir de los Query Methods?',
          respuesta: 'Analiza el nombre del método en el repositorio (prefijos findBy, countBy, existsBy) descomponiendo las palabras clave y nombres de propiedades mediante reflexión para generar en tiempo de ejecución las consultas JPQL correspondientes.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión del Código (Ask)',
      items: [
        {
          pregunta: '¿Cómo funciona la paginación con Pageable y Page<T> en Spring Data JPA?',
          respuesta: 'Spring Data añade automáticamente las cláusulas LIMIT y OFFSET (o su equivalente en el dialecto SQL) y ejecuta en paralelo una consulta COUNT para calcular el total de páginas y elementos.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Por qué es fundamental paginar las listas en APIs REST empresariales?',
          respuesta: 'Para proteger la memoria del servidor y la red ante tablas con miles o millones de registros, evitando bloqueos por OutOfMemoryError y acelerando el tiempo de respuesta al cliente.'
        },
        {
          pregunta: '2. ¿Qué papel desempeña @Transactional en métodos de servicio?',
          respuesta: 'Delimita la transacción física en la base de datos, garantizando atomicidad (ACID) y permitiendo que las operaciones lazy loading funcionen dentro de la sesión activa de Hibernate.'
        }
      ]
    }
  },

  '8-creacion-capa-entidades-relaciones': {
    actividadNumero: 8,
    ficheroNotas: 'notas/NOTAS-03-entidades-jpa.md',
    rama: '03-entidades-jpa',
    prTitulo: 'Spring Boot – Entidades y Relaciones JPA',
    tituloDoc: 'NOTAS-03: Modelado de Entidades JPA y Relaciones',
    modulo: 'Bloque 3: Persistencia & Modelado JPA',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Cómo mapea JPA las entidades Java a tablas relacionales?',
          respuesta: 'Mediante anotaciones estándar Jakarta Persistence (@Entity, @Table, @Id, @GeneratedValue, @Column, @ManyToOne, @ManyToMany).'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Qué diferencia hay entre FetchType.LAZY y FetchType.EAGER?',
          respuesta: 'LAZY retrasa la carga de los datos relacionados hasta que se accede explícitamente a la propiedad (ahorrando memoria), mientras que EAGER los carga de inmediato en la misma consulta.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué ventaja tiene usar ddl-auto=validate frente a ddl-auto=update en entornos profesionales?',
          respuesta: 'validate solo comprueba la concordancia sin alterar nunca la estructura de las tablas, previniendo pérdidas catastróficas de datos en producción.'
        },
        {
          pregunta: '2. ¿Qué ocurriría si cambias el nombre de un campo en la entidad sin actualizar la base de datos?',
          respuesta: 'Al arrancar con ddl-auto=validate la aplicación fallará inmediatamente con un error de SchemaManagementException, evitando operar con discrepancias silenciosas.'
        }
      ]
    }
  },

  '7-creacion-capa-servicio': {
    actividadNumero: 7,
    ficheroNotas: 'notas/NOTAS-02-capa-servicio.md',
    rama: '02-capa-servicio',
    prTitulo: 'Spring Boot – Creación de la Capa de Servicio',
    tituloDoc: 'NOTAS-02: Arquitectura en Capas y Servicios de Negocio',
    modulo: 'Bloque 2: Arquitectura Web & REST APIs',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Cuál es el propósito de la capa de servicio (@Service)?',
          respuesta: 'Contener la lógica de negocio, validaciones complejas y coordinación de persistencia, manteniendo los controladores livianos y desacoplados.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Por qué se utiliza una interfaz TaskService y una clase implementadora TaskServiceImpl?',
          respuesta: 'Aplica el principio de inversión de dependencias (DIP) y favorece el testing unitario mediante mocks, permitiendo intercambiar implementaciones sin afectar a los controladores.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué problema concreto resuelve separar el Controller del Service?',
          respuesta: 'Evita el patrón anti-arquitectura "Fat Controller", permitiendo reutilizar la misma lógica de negocio desde otros puntos (jobs batch, eventos asíncronos o controladores GraphQL).'
        },
        {
          pregunta: '2. ¿Qué ocurriría si en el futuro necesitas una segunda implementación de TaskService?',
          respuesta: 'Simplemente se crea otra clase implementando TaskService y se utiliza @Qualifier o perfiles de Spring (@Profile) para inyectar la requerida.'
        }
      ]
    }
  },

  '6-creacion-del-controlador': {
    actividadNumero: 6,
    ficheroNotas: 'notas/NOTAS-01-creacion-controlador.md',
    rama: '01-creacion-controlador',
    prTitulo: 'Spring Boot – Creación del Primer Controlador REST',
    tituloDoc: 'NOTAS-01: Endpoints REST y Códigos de Estado HTTP',
    modulo: 'Bloque 2: Arquitectura Web & REST APIs',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Cuál es la diferencia entre @Controller y @RestController?',
          respuesta: '@RestController combina @Controller y @ResponseBody. Los métodos de un @RestController devuelven directamente datos serializados en JSON/XML en el cuerpo de la respuesta HTTP, en lugar de resolver nombres de vistas HTML.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Por qué POST devuelve 201 Created y DELETE devuelve 204 No Content?',
          respuesta: '201 Created confirma la creación de un nuevo recurso y suele incluir la cabecera Location. 204 No Content confirma que la acción destructiva se procesó con éxito y no hay cuerpo necesario que retornar.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Por qué es una mala práctica devolver siempre HTTP 200 OK en todas las respuestas?',
          respuesta: 'Rompe la semántica estándar de la web y obliga a los clientes a parsear el cuerpo del mensaje para saber si una operación falló o si un recurso se creó correctamente.'
        },
        {
          pregunta: '2. ¿Qué ventaja ofrece usar ResponseEntity en lugar de devolver objetos directamente?',
          respuesta: 'Permite un control fino y flexible sobre el código de estado HTTP (201, 404, 204), cabeceras HTTP personalizadas (Location, Cache-Control) y el tipo de cuerpo devuelto.'
        }
      ]
    }
  },

  '5-preparacion-del-entorno': {
    actividadNumero: 5,
    ficheroNotas: 'notas/NOTAS-00-preparacion-del-entorno.md',
    rama: '00-preparacion-del-entorno',
    prTitulo: 'Spring Boot – Preparación del Entorno',
    tituloDoc: 'NOTAS-00: Inicialización y Setup de Spring Boot',
    modulo: 'Bloque 2: Arquitectura Web & REST APIs',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Qué hace @SpringBootApplication exactamente?',
          respuesta: 'Es una meta-anotación que agrupa tres anotaciones esenciales: @Configuration (declara la clase como fuente de beans), @EnableAutoConfiguration (activa la autoconfiguración automática de Spring Boot según las dependencias en el classpath) y @ComponentScan (escanea componentes, servicios y repositorios en el paquete actual y sus subpaquetes).'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Por qué el navegador devuelve un 404 Whitelabel si la aplicación está arrancada?',
          respuesta: 'Porque Tomcat embebido arrancó y el DispatcherServlet está activo y respondiendo, pero todavía no existe ningún controlador (@RestController) con una ruta (@GetMapping) asociada a la URL raíz solicitada.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué tres anotaciones agrupa @SpringBootApplication y qué función cumple cada una?',
          respuesta: '@Configuration para definir beans, @EnableAutoConfiguration para configurar automáticamente el contexto según librerías detectadas, y @ComponentScan para registrar componentes automáticamente.'
        },
        {
          pregunta: '2. ¿Para qué crees que se utilizará application.properties más adelante?',
          respuesta: 'Para configurar parámetros externos como puertos (server.port), credenciales y URLs de bases de datos (spring.datasource.*), niveles de log (logging.level.*), y configuraciones de JPA/Hibernate.'
        }
      ]
    }
  },

  '4-distintas-configuraciones': {
    actividadNumero: 4,
    ficheroNotas: 'notas/NOTAS-04-distintas-configuraciones.md',
    rama: '04-distintas-configuraciones',
    prTitulo: 'Spring Boot – Distintas Configuraciones',
    tituloDoc: 'NOTAS: Configuración mediante Java Config vs XML vs Anotaciones',
    modulo: 'Bloque 1: Inversión de Control (IoC & DI)',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Cuáles son las formas principales de configurar beans en Spring?',
          respuesta: 'XML (legacy), anotaciones estereotipo (@Component, @Service) con escaneo de componentes, y clases Java Config anotadas con @Configuration y métodos con @Bean.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Cuándo es imprescindible usar @Bean en lugar de @Component?',
          respuesta: 'Cuando se instancian clases de librerías externas de terceros cuyo código fuente no podemos anotar directamente con @Component.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué ventajas aporta Java Config frente a la configuración clásica basada en XML?',
          respuesta: 'Seguridad de tipos en tiempo de compilación (type-safety), refactorización automática por el IDE, facilidad para navegar por el código y eliminación de ficheros XML verbosos.'
        }
      ]
    }
  },

  '3-uso-java-annotations': {
    actividadNumero: 3,
    ficheroNotas: 'notas/NOTAS-03-uso-java-annotations.md',
    rama: '03-uso-java-annotations',
    prTitulo: 'Spring Boot – Uso de Java Annotations',
    tituloDoc: 'NOTAS: Anotaciones de Spring Framework',
    modulo: 'Bloque 1: Inversión de Control (IoC & DI)',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Qué significan las anotaciones estereotipo en Spring?',
          respuesta: '@Component es el genérico; @Service marca lógica de negocio; @Repository añade traducción automática de excepciones de acceso a datos; @Controller/@RestController gestiona la capa web.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Cómo resuelve Spring ambigüedades cuando múltiples beans implementan la misma interfaz?',
          respuesta: 'Usando @Primary para declarar el bean preferente por defecto, o @Qualifier("nombreBean") en el punto de inyección para especificar el bean concreto.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Por qué es preferible usar anotaciones estereotipo especializadas (@Service, @Repository) en vez de @Component en todas partes?',
          respuesta: 'Porque comunican claramente el rol arquitectónico de la clase a otros desarrolladores y permiten que Spring aplique comportamientos automáticos específicos (como traducción de excepciones en @Repository o proxies AOP para transacciones en @Service).'
        }
      ]
    }
  },

  '2-inversion-control': {
    actividadNumero: 2,
    ficheroNotas: 'notas/NOTAS-02-inversion-control.md',
    rama: '02-inversion-control',
    prTitulo: 'Spring Boot – Inversión de Control (IoC)',
    tituloDoc: 'NOTAS: Principio de Inversión de Control y Contenedor IoC',
    modulo: 'Bloque 1: Inversión de Control (IoC & DI)',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Qué es el principio de Hollywood en Inversión de Control?',
          respuesta: '"No nos llames tú, nosotros te llamaremos": en lugar de que una clase cree y controle sus propias dependencias llamando a "new", delega ese ciclo de vida al contenedor de Spring.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Qué es el ApplicationContext en Spring?',
          respuesta: 'Es el contenedor IoC avanzado de Spring que gestiona el ciclo de vida de los beans, resuelve dependencias, emite eventos y proporciona soporte para internacionalización y perfiles.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Qué beneficio directo tiene el IoC en los tests unitarios?',
          respuesta: 'Permite instanciar una clase en el test pasando dependencias simuladas (Mocks) a través del constructor, sin depender de bases de datos o servicios reales.'
        }
      ]
    }
  },

  '1-inyeccion-dependencias': {
    actividadNumero: 1,
    ficheroNotas: 'notas/NOTAS-01-inyeccion-dependencias.md',
    rama: '01-inyeccion-dependencias',
    prTitulo: 'Spring Boot – Inyección de Dependencias',
    tituloDoc: 'NOTAS: Inyección de Dependencias por Constructor',
    modulo: 'Bloque 1: Inversión de Control (IoC & DI)',
    paso1: {
      titulo: 'Paso 1 — Preparación',
      items: [
        {
          pregunta: '¿Por qué la inyección por constructor es superior a la inyección por campo (@Autowired en atributos)?',
          respuesta: 'Garantiza inmutabilidad (campos final), previene dependencias nulas en tiempo de ejecución, facilita testing unitario sin frameworks de reflexión y detecta dependencias circulares en compilación/arranque.'
        }
      ]
    },
    paso4: {
      titulo: 'Paso 4 — Comprensión',
      items: [
        {
          pregunta: '¿Es obligatorio poner @Autowired en constructores en versiones modernas de Spring?',
          respuesta: 'No. Desde Spring 4.3, si una clase tiene un único constructor, Spring inyecta automáticamente los parámetros sin necesidad de anotar @Autowired explícitamente.'
        }
      ]
    },
    reflexion: {
      titulo: 'Preguntas de Reflexión Final',
      items: [
        {
          pregunta: '1. ¿Cómo ayuda la inyección de dependencias a cumplir los principios SOLID?',
          respuesta: 'Favorece el principio de Responsabilidad Única (SRP) y el de Inversión de Dependencias (DIP), desacoplando los módulos de alto nivel de los detalles de bajo nivel.'
        }
      ]
    }
  }
};

/**
 * Función auxiliar para generar el Markdown exportable listo para pegar en `NOTAS-XX.md`
 */
export function generarMarkdownCompleto(docData) {
  if (!docData) return '';

  let md = `# ${docData.tituloDoc || 'Notas de la Tarea'}\n\n`;
  md += `> **Fichero oficial:** \`${docData.ficheroNotas}\`  \n`;
  md += `> **Rama:** \`${docData.rama}\` ➔ **PR:** \`${docData.prTitulo}\`  \n`;
  md += `> **Módulo:** ${docData.modulo}  \n\n`;
  md += `---\n\n`;

  if (docData.paso1) {
    md += `## ${docData.paso1.titulo}\n\n`;
    docData.paso1.items.forEach((item, idx) => {
      md += `### Pregunta ${idx + 1}:\n**${item.pregunta}**\n\n`;
      md += `* **Respuesta:**\n${item.respuesta}\n\n`;
    });
    md += `---\n\n`;
  }

  if (docData.paso4) {
    md += `## ${docData.paso4.titulo}\n\n`;
    docData.paso4.items.forEach((item, idx) => {
      md += `### ${idx + 1}. ${item.pregunta}\n\n`;
      md += `* **Respuesta analizada:**\n${item.respuesta}\n\n`;
    });
    md += `---\n\n`;
  }

  if (docData.reflexion) {
    md += `## ${docData.reflexion.titulo}\n\n`;
    docData.reflexion.items.forEach((item, idx) => {
      md += `### Reflexión ${idx + 1}:\n**${item.pregunta}**\n\n`;
      md += `* **Respuesta argumentada:**\n${item.respuesta}\n\n`;
    });
    md += `---\n\n`;
  }

  md += `## Checklist de Entrega y Verificación\n\n`;
  md += `- [x] Fichero \`${docData.ficheroNotas}\` creado en la carpeta \`notas/\`.\n`;
  md += `- [x] Javadoc redactado en clases y métodos obligatorios.\n`;
  md += `- [x] Capturas de ejecución en Postman adjuntadas.\n`;
  md += `- [x] Pull Request abierto hacia \`main-spring-boot\`.\n`;

  return md;
}
