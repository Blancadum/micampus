import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * @component   ProyectoFinalDefenseTab
 * @description Batería interactiva de 14 preguntas de tribunal para la defensa:
 *              - Filtrado por bloques temáticos (Trampas, Arquitectura, BBDD, Seguridad, Web)
 *              - Pitch de respuesta rápida (20 segundos)
 *              - Desplegable de fundamentos técnicos profundos y trazas
 *              - Conexión y navegación directa hacia la capa de arquitectura o pantalla funcional
 * ============================================================================
 */
export default function ProyectoFinalDefenseTab({ onNavigateToTab, initialCategory = 'all', hideCategoryNav = false }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [openQuestion, setOpenQuestion] = useState(1);
  const [expandedDetails, setExpandedDetails] = useState({ 1: true });

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'Todas las Preguntas (14)', icon: '📋' },
    { id: 'trampa', label: '🥊 Preguntas Trampa (3)', icon: '🥊' },
    { id: 'architecture', label: '🏛️ Arquitectura & Spring (3)', icon: '🏛️' },
    { id: 'data', label: '💾 BBDD, JPA & Transacciones (3)', icon: '💾' },
    { id: 'security', label: '🔒 Seguridad & JWT (3)', icon: '🔒' },
    { id: 'frontend', label: '🌐 Límites Web vs Backend (2)', icon: '🌐' }
  ];

  const defenseQuestions = [
    {
      id: 1,
      category: 'trampa',
      badge: 'PREGUNTA TRAMPA · BEAN VALIDATION',
      color: '#ef4444',
      question: '¿Por qué la regla de stock tuvo que validarse a nivel de clase (@ValidStock) y no con una anotación de atributo normal?',
      shortAnswer: 'Porque las anotaciones de atributo como @NotNull o @Min solo tienen visibilidad de su propio campo. Para verificar la regla "availableStock <= totalStock" es obligatorio comparar dos atributos distintos de la misma instancia, lo que exige una anotación a nivel de clase (@Target(ElementType.TYPE)).',
      deepAnswer: `En la especificación oficial de Bean Validation (Jakarta Validation / JSR-380), un ConstraintValidator de atributo solo recibe en su método isValid() el valor aislado de esa propiedad (por ejemplo, el Integer de availableStock). No tiene forma de conocer cuánto vale totalStock.

Para solucionarlo de forma limpia según el estándar de ingeniería:
1. Se creó la anotación @ValidStock con destino @Target({ElementType.TYPE}).
2. La clase StockValidator implementa ConstraintValidator<ValidStock, BookRequestDto>.
3. El método isValid(BookRequestDto dto, ...) recibe la instancia completa del DTO antes de que entre al controlador, pudiendo comparar:
   return dto.getAvailableStock() <= dto.getTotalStock();
4. Si falla, el error se registra como GlobalError en el BindingResult y GlobalExceptionHandler lo empaqueta como HTTP 400 Bad Request.`,
      tipDefensa: 'Si te dicen: "¿No se podía validar en el Setter?", responde que en los DTOs desacoplados la validación declarativa con anotaciones estándar es la mejor práctica porque centraliza las reglas sin ensuciar la lógica de acceso a datos.',
      relatedLayer: 3,
      relatedLayerName: 'Capa 3: DTOs & Validación (@ValidStock)',
      relatedFunctional: 'books',
      relatedFunctionalName: 'Pantalla de Libros y Control de Stock'
    },
    {
      id: 2,
      category: 'trampa',
      badge: 'PREGUNTA TRAMPA · RÚBRICA OFICIAL',
      color: '#ef4444',
      question: '¿Por qué en los mappers hiciste bucles tradicionales for-each en lugar de usar Streams y Lambdas de Java moderno?',
      shortAnswer: 'Por cumplimiento estricto de los Pasos 6 y 8 de la rúbrica oficial de Accenture, que prohibía expresamente el uso de Streams y Lambdas para evaluar el dominio imperativo tradicional, la instanciación de listas ArrayList y el control defensivo de punteros nulos.',
      deepAnswer: `Aunque en producción comercial la tendencia es emplear MapStruct o la API Stream (.stream().map(this::toDto).toList()), el cliente y el enunciado de la práctica impusieron una restricción de diseño explícita.

El evaluador busca verificar:
1. Comprensión del flujo de control fundamental de la máquina virtual Java.
2. Gestión explícita de referencias nulas: comprobar si book.getAuthors() != null antes de iterar para blindar el código contra NullPointerException.
3. Declaración de mappers desacoplados como componentes Spring (@Component) inyectables.

Demuestra madurez profesional: un ingeniero senior no introduce características del lenguaje solo por novedad si el pliego de condiciones técnicas del cliente o del proyecto lo restringe expresamente.`,
      tipDefensa: 'Menciona que la decisión no fue por desconocimiento de la API funcional de Java 8+, sino por disciplina ante los requisitos contractuales de la entrega.',
      relatedLayer: 4,
      relatedLayerName: 'Capa 4: Mappers Manuales Imperativos'
    },
    {
      id: 3,
      category: 'trampa',
      badge: 'PREGUNTA TRAMPA · INTERFAZ WEB',
      color: '#ef4444',
      question: 'En la web index-secure.html al crear un libro no se le puede asignar autor, ¿es que el sistema no lo permite?',
      shortAnswer: 'El backend y la base de datos lo permiten al 100%: existe la tabla intermedia book_author, BookRequestDto recibe la lista authorIds y BookServiceImp los asocia. La limitación está únicamente en el prototipo HTML, que omitió el control visual de selección de autores.',
      deepAnswer: `En la arquitectura del proyecto:
1. En MySQL existe la tabla intermedia Many-to-Many "book_author" con claves foráneas cruzadas.
2. En Java, BookRequestDto incluye el campo "private List<Long> authorIds".
3. En BookServiceImp.createBook(), el servicio ejecuta:
   authors = authorRepository.findAllById(bookRequestDto.getAuthorIds());
   book.setAuthors(authors);
4. Mediante Postman, Swagger UI (/swagger-ui.html) o cURL, se pueden registrar libros con uno o múltiples autores enviando el array de IDs.

Lo que ocurrió es que index-secure.html fue suministrado como un cliente web monolítico de prueba rápida que priorizó el selector de categorías, pero no incluyó el desplegable múltiple de autores en el formulario ni la columna en la tabla. Esto quedó documentado en la bitácora técnica de integración.`,
      tipDefensa: 'Esta es la respuesta perfecta: separas con total claridad el alcance de la API REST del cliente web de prueba suministrado.',
      relatedLayer: 1,
      relatedLayerName: 'Capa 1: Modelo JPA (Relación Many-to-Many)',
      relatedFunctional: 'books',
      relatedFunctionalName: 'Pantalla de Libros en index-secure.html'
    },
    {
      id: 4,
      category: 'frontend',
      badge: 'FUNCIONALIDAD · BÚSQUEDA Y FILTRADO',
      color: '#0ea5e9',
      question: '¿La aplicación permite buscar libros por título o por autor?',
      shortAnswer: 'A nivel de persistencia en Spring Data JPA sí, están programados findByTitleContainingIgnoreCase y findByAuthorsId. En la API REST el endpoint principal prioriza el filtrado por stock disponible por requisito de la rúbrica.',
      deepAnswer: `En BookRepository.java se implementaron las siguientes consultas derivadas:
- Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable): Búsqueda insensible a mayúsculas/minúsculas por fragmento de título.
- Page<Book> findByAuthorsId(Long authorId, Pageable pageable): Búsqueda de todas las obras de un autor.
- Page<Book> findByCategoryId(Long categoryId, Pageable pageable): Filtrado temático.

Por especificación del Paso 9 de Accenture, el endpoint GET /api/books devuelve por defecto los libros disponibles (availableStock > 0). En la documentación de mejoras de frontend (SITUACION_Y_EVALUACION_FRONTEND.md) se propuso incorporar un input de búsqueda reactivo con debounce conectado directamente a estos métodos de repositorio.`,
      tipDefensa: 'Demuestra que la base de datos está preparada para búsquedas complejas aunque el cliente web solo consuma el catálogo disponible.',
      relatedLayer: 2,
      relatedLayerName: 'Capa 2: Repositorios Spring Data JPA',
      relatedFunctional: 'books',
      relatedFunctionalName: 'Listado de Libros en Frontend'
    },
    {
      id: 5,
      category: 'architecture',
      badge: 'DISEÑO DE SOFTWARE · SERIALIZACIÓN',
      color: '#3b82f6',
      question: '¿Por qué utilizas DTOs en lugar de recibir y devolver directamente las Entidades JPA en los controladores?',
      shortAnswer: 'Para evitar el error StackOverflowError de Jackson por referencias circulares bidireccionales, por seguridad (no exponer claves internas ni auditoría) y para desacoplar el contrato de la API del esquema de MySQL.',
      deepAnswer: `Si expones directamente la entidad Book:
1. Jackson intenta serializar Book a JSON -> encuentra su lista de Author -> serializa Author -> Author tiene una lista de Book -> serializa Book de nuevo... Esto genera un bucle de recursión infinita en memoria que colapsa la JVM con java.lang.StackOverflowError.
2. Violación del principio de mínimo privilegio: Una entidad JPA suele contener flags lógicos, versiones de bloqueo optimista (@Version) o relaciones perezosas que no deben viajar por la red.
3. Desacoplamiento arquitectónico: Si en el futuro se refactoriza una columna en MySQL o se cambia el motor de persistencia, el contrato JSON externo permanece inmutable, protegiendo a todos los clientes web o móviles.`,
      tipDefensa: 'Resalta que los DTOs planos garantizan además un payload JSON mucho más ligero y rápido de transferir por HTTP.',
      relatedLayer: 3,
      relatedLayerName: 'Capa 3: DTOs & Separación de Capas'
    },
    {
      id: 6,
      category: 'architecture',
      badge: 'SPRING CORE · INYECCIÓN DE DEPENDENCIAS',
      color: '#3b82f6',
      question: '¿Por qué inyectas dependencias por constructor en lugar de usar @Autowired sobre los atributos?',
      shortAnswer: 'Porque es la mejor práctica oficial de Spring: permite declarar los atributos como "final" garantizando inmutabilidad, evita instancias en estado incompleto con null y facilita los tests unitarios con Mockito.',
      deepAnswer: `La inyección por campo (@Autowired private BookRepository repo) presenta desventajas serias:
1. Mutabilidad: El atributo no puede ser "final".
2. Acoplamiento al contenedor IoC: Para probar la clase fuera de Spring necesitas usar reflexión o levantar un contexto pesado de prueba.
3. Posibilidad de NullPointerException en tiempo de ejecución si el bean no fue inicializado por el contenedor.

Con la inyección por constructor:
- Los atributos se declaran como "private final ...".
- En las pruebas unitarias (ej. LoanServiceTest), simplemente haces "new LoanServiceImp(mockLoanRepo, mockBookRepo)", garantizando un código 100% testeable y limpio sin necesidad de levantar Spring Boot.`,
      tipDefensa: 'Explica que desde Spring 4.3 ni siquiera hace falta poner la anotación @Autowired en el constructor si la clase solo tiene un constructor.',
      relatedLayer: 5,
      relatedLayerName: 'Capa 5: Servicios e Inyección por Constructor'
    },
    {
      id: 7,
      category: 'architecture',
      badge: 'TRATAMIENTO DE ERRORES · OWASP',
      color: '#3b82f6',
      question: '¿Qué hace exactamente la anotación @RestControllerAdvice en tu GlobalExceptionHandler?',
      shortAnswer: 'Actúa como un interceptor transversal (AOP) que captura cualquier excepción del sistema para generar respuestas JSON homogéneas con códigos HTTP estándar (404, 400, 409), impidiendo la fuga de trazas internas (OWASP).',
      deepAnswer: `Sin un manejador global, cuando salta una excepción no capturada (como ResourceNotFoundException o un fallo de Bean Validation), Spring Boot devuelve una página HTML de error por defecto o un JSON genérico con el stacktrace completo.

Filtrar trazas de error (Information Leakage) es una vulnerabilidad grave según el Top 10 de OWASP, ya que revela nombres de clases internas, versiones de librerías y detalles de la base de datos a posibles atacantes.

Con GlobalExceptionHandler:
- Centraliza la captura de ResourceNotFoundException (404), DuplicateResourceException (409) y MethodArgumentNotValidException (400).
- Construye un ErrorResponseDto con formato unificado (timestamp, status, error, message, path).
- El cliente siempre recibe una respuesta predecible y limpia.`,
      tipDefensa: 'Menciona que este manejador captura tanto los errores de campo como los de clase (@ValidStock) en getGlobalErrors().',
      relatedLayer: 7,
      relatedLayerName: 'Capa 7: Manejo Centralizado de Excepciones'
    },
    {
      id: 8,
      category: 'data',
      badge: 'TRANSACCIONALIDAD · ACID',
      color: '#10b981',
      question: '¿Cómo garantizas que el stock de un libro no se descuente si la base de datos falla al guardar el préstamo?',
      shortAnswer: 'Mediante la anotación @Transactional en LoanServiceImp.createLoan(). Si la inserción del préstamo falla, Spring ejecuta un ROLLBACK automático de toda la transacción, preservando el stock intacto (propiedad de Atomicidad ACID).',
      deepAnswer: `El registro de un préstamo involucra dos operaciones consecutivas en MySQL:
1. book.setAvailableStock(book.getAvailableStock() - 1); -> Ejecuta UPDATE en book.
2. loanRepository.save(loan); -> Ejecuta INSERT en loan.

Si se produce un corte de red, un fallo de clave foránea o una excepción inesperada entre el paso 1 y el paso 2, el libro perdería una unidad de stock pero no existiría registro de a quién se prestó (inconsistencia grave de inventario).

Al anotar el método con @Transactional:
- Spring Framework inicia una transacción de base de datos antes de entrar al método.
- Si cualquier RuntimeException se propaga fuera del método, el gestor de transacciones ejecuta automáticamente un ROLLBACK.
- Ambas operaciones se consolidan juntas (COMMIT) o ninguna tiene efecto, garantizando la Atomicidad de las propiedades ACID.`,
      tipDefensa: 'Añade que en la devolución de préstamos (returnLoan) se aplica exactamente la misma protección transaccional.',
      relatedLayer: 5,
      relatedLayerName: 'Capa 5: Servicios y Transaccionalidad',
      relatedFunctional: 'loans',
      relatedFunctionalName: 'Ciclo de Préstamos y Devolución'
    },
    {
      id: 9,
      category: 'data',
      badge: 'LÓGICA DE NEGOCIO · RENDIMIENTO',
      color: '#10b981',
      question: '¿Por qué el estado OVERDUE (Vencido) no se actualiza continuamente mediante un cron en MySQL?',
      shortAnswer: 'Porque es un dato calculado dependiente del tiempo. Modificar la base de datos a diario con un cron desgasta recursos de I/O inútilmente y genera desfases; computarlo al vuelo al devolver el DTO es 100% exacto al milisegundo con coste cero.',
      deepAnswer: `Implementar una tarea programada (@Scheduled o cron de medianoche) para recorrer la tabla "loan" y mutar registros de ACTIVE a OVERDUE es un anti-patrón de diseño:
1. Desfase temporal: Si un préstamo vence a las 10:00 AM y el cron corre a las 00:00, durante 14 horas el dato es falso.
2. Sobrecarga de base de datos: En tablas con cientos de miles de registros, hacer escrituras masivas bloquea filas y agota el pool de conexiones.
3. Principio de datos derivados: Todo dato que pueda calcularse deterministamente en tiempo O(1) no debe persistirse como estado estático mutante.

En nuestra solución, al consultar el préstamo o mapearlo al DTO:
if (loan.getStatus() == LoanStatus.ACTIVE && loan.getExpectedReturnDate().isBefore(LocalDate.now())) {
    return LoanStatus.OVERDUE;
}
La base de datos permanece inmutable y el usuario siempre ve la realidad en tiempo real.`,
      tipDefensa: 'Este argumento demuestra que entiendes la optimización de recursos y evitas procesos innecesarios en segundo plano.',
      relatedLayer: 5,
      relatedLayerName: 'Capa 5: Lógica de Negocio y Estados',
      relatedFunctional: 'loans',
      relatedFunctionalName: 'Visualización Dinámica de Préstamos'
    },
    {
      id: 10,
      category: 'data',
      badge: 'HIBERNATE · GOBERNANZA DE DATOS',
      color: '#10b981',
      question: '¿Por qué en producción se configura spring.jpa.hibernate.ddl-auto=validate y no update?',
      shortAnswer: 'Porque "update" altera tablas en tiempo de arranque sin auditoría previa, arriesgando corrupción de datos históricos. "validate" verifica que las clases Java mapeen de forma idéntica al script SQL oficial sin modificar nada.',
      deepAnswer: `ddl-auto=update está pensado solo para prototipado rápido en desarrollo local. En entornos empresariales y entregas formales su uso está desaconsejado:
1. No elimina columnas huérfanas: Si renombras un atributo en Java, Hibernate crea una columna nueva y deja la antigua con datos viejos.
2. Puede relajar o alterar restricciones de nulidad e índices de forma descontrolada.
3. Falta de idempotencia entre entornos.

Al fijar ddl-auto=validate:
- Hibernate se limita a contrastar las entidades Java contra el diccionario de datos de MySQL.
- Si los tipos de datos, nombres de columna o claves foráneas difieren mínimamente del script "db/init.sql", el arranque falla inmediatamente avisando al administrador.
- Garantiza que la única fuente de verdad sobre el esquema es el script SQL versionado.`,
      tipDefensa: 'Resalta que esto asegura compatibilidad total con pipelines CI/CD y despliegues con Docker.',
      relatedLayer: 1,
      relatedLayerName: 'Capa 1: Modelo JPA y ddl-auto=validate'
    },
    {
      id: 11,
      category: 'security',
      badge: 'SPRING SECURITY · ARQUITECTURA',
      color: '#6366f1',
      question: '¿Qué significa que la arquitectura de seguridad sea Stateless (Sin Estado) con JWT?',
      shortAnswer: 'Significa que el servidor no guarda sesiones HTTP en memoria ni utiliza cookies JSESSIONID. Cada petición del cliente es autosuficiente e incluye su token firmado, lo que permite escalar horizontalmente en Docker sin sincronizar servidores.',
      deepAnswer: `En la arquitectura clásica Stateful:
- El servidor guarda un objeto HttpSession en su memoria RAM y le devuelve al usuario una cookie con la JSESSIONID.
- Si levantas 5 réplicas del contenedor backend en Docker o Kubernetes, necesitas "Sticky Sessions" o una memoria compartida externa (Redis) para que un servidor reconozca la sesión iniciada en otro.

En nuestra arquitectura Stateless (SessionCreationPolicy.STATELESS):
1. El servidor firma criptográficamente el token JWT con el algoritmo HMAC-SHA256 y una clave privada de 256 bits.
2. El cliente almacena el token y lo envía en el encabezado Authorization: Bearer <token>.
3. Cualquier réplica del servidor puede verificar la firma matemática en milisegundos sin consultar ninguna base de datos ni memoria centralizada.`,
      tipDefensa: 'Explica que esto reduce el consumo de memoria del servidor a prácticamente cero por usuario inactivo.',
      relatedLayer: 8,
      relatedLayerName: 'Capa 8: Seguridad Stateless & JWT',
      relatedFunctional: 'auth',
      relatedFunctionalName: 'Pantalla de Login y Gestión de Token'
    },
    {
      id: 12,
      category: 'security',
      badge: 'FILTROS SERVLET · RENDIMIENTO',
      color: '#6366f1',
      question: '¿Por qué el filtro JwtAuthenticationFilter hereda de OncePerRequestFilter?',
      shortAnswer: 'Para garantizar que la verificación criptográfica del token se ejecute exactamente una sola vez por petición HTTP, evitando repetir cálculos de CPU costosos ante redirecciones internas o despachos asíncronos.',
      deepAnswer: `En la especificación de Servlets de Java EE / Jakarta, una única petición de usuario puede ser despachada varias veces dentro de la cadena interna de filtros (por ejemplo ante reenvíos forward de error, controladores asíncronos con AsyncContext o despachos internos de RequestDispatcher).

Un filtro normal de tipo javax.servlet.Filter podría llegar a ejecutarse 2 o 3 veces para una única llamada del cliente.
La verificación de un JWT requiere operaciones criptográficas: decodificación en Base64Url, cálculo del hash SHA-256 y comparación de firmas.

Al heredar de OncePerRequestFilter de Spring:
- El filtro comprueba un flag interno en la petición (already filtered).
- Garantiza que la verificación y la inyección en SecurityContextHolder sucedan de manera estricta UNA SOLA VEZ por ciclo de vida de petición, optimizando la latencia de la API.`,
      tipDefensa: 'Demuestra un conocimiento profundo del ciclo de vida de peticiones en Spring MVC y servlets.',
      relatedLayer: 8,
      relatedLayerName: 'Capa 8: Filtro JwtAuthenticationFilter'
    },
    {
      id: 13,
      category: 'security',
      badge: 'INTEGRACIÓN WEB · POLÍTICA CORS',
      color: '#6366f1',
      question: '¿Qué es una petición HTTP Preflight OPTIONS y por qué bloqueaba el frontend antes de tocar el código?',
      shortAnswer: 'Es una petición preliminar que el navegador envía automáticamente para verificar si el servidor acepta cabeceras personalizadas como Authorization. Spring Security la bloqueaba con 401 por no estar autenticada.',
      deepAnswer: `Cuando una SPA en JavaScript (fetch) envía una petición de origen cruzado que incluye métodos no simples (POST, PUT, DELETE) o encabezados personalizados (Authorization: Bearer ...), el navegador lanza primero una petición con método HTTP OPTIONS llamada "Preflight".

Esta petición preliminar OPTIONS no lleva el token Bearer (porque precisamente pregunta si tiene permiso para enviarlo).
En la configuración inicial, Spring Security exigía autenticación para cualquier ruta /api/**. Al llegar el OPTIONS sin token, el filtro de seguridad respondía HTTP 401 Unauthorized antes de darle permiso al navegador para enviar el POST real.

La solución definitiva en SecurityConfig:
http.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
    ...
);
Permite que el navegador reciba las cabeceras Access-Control-Allow-* y proceda con la llamada autenticada.`,
      tipDefensa: 'Es uno de los errores de integración más reales y formativos del proyecto; explícalo con orgullo.',
      relatedLayer: 8,
      relatedLayerName: 'Capa 8: Configuración de Seguridad y CORS',
      relatedFunctional: 'errors-resolved',
      relatedFunctionalName: 'Los 7 Errores Críticos Resueltos'
    },
    {
      id: 14,
      category: 'frontend',
      badge: 'ANÁLISIS FORENSE · ENUNCIADOS PDF',
      color: '#0ea5e9',
      question: '¿Cómo detectaste y solucionaste la trampa del enunciado sobre "Spring Boot 4" y Jackson 3?',
      shortAnswer: 'Comprobando que Spring Boot 4 aún no existe comercialmente y que Jackson 3 (tools.jackson) no forma parte de Spring Boot 3; mantener los paquetes estándar evitó que el proyecto no compilase.',
      deepAnswer: `En la página 8 del PDF oficial "12_Spring Boot – Manejo de errores", el enunciado indicaba que en "Spring Boot 4" Jackson pasaba a la versión 3 bajo paquetes tools.jackson.databind.exc y que la propiedad era spring.web.error.include-message.

Al intentar compilar, el compilador javac arrojaba Package tools.jackson... does not exist. 
Tras una investigación exhaustiva de la versión del parent en pom.xml (spring-boot-starter-parent 3.3.x):
1. Se constató que Spring Boot 4 no era una versión disponible en producción.
2. En Spring Boot 3, el motor oficial es Jackson 2.x residiendo bajo com.fasterxml.jackson.databind.*.
3. La causa real por la que Postman no mostraba el mensaje de error era que se lanzaba IllegalArgumentException no capturada, la cual Spring traduce como HTTP 500 y oculta por directiva de seguridad.

Se corrigió implementando un manejador global @RestControllerAdvice con DTOs de error y códigos 404/400, demostrando capacidad analítica para no aplicar directrices a ciegas cuando contradicen la arquitectura real del sistema.`,
      tipDefensa: 'Demuestra que no eres una desarrolladora que copia y pega código, sino alguien que sabe auditar y verificar las dependencias reales del proyecto.',
      relatedFunctional: 'errors-resolved',
      relatedFunctionalName: 'Los 7 Errores Críticos Resueltos'
    }
  ];

  const filteredQuestions = selectedCategory === 'all'
    ? defenseQuestions
    : defenseQuestions.filter(q => q.category === selectedCategory);

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* HEADER DE LA BATERÍA DE DEFENSA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '20px',
        padding: '2rem 2.4rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <span style={{
            background: '#f59e0b',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            letterSpacing: '0.5px'
          }}>
            Guía de Defensa & Tribunal
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            14 Preguntas Críticas con Conexión a la Arquitectura
          </span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 850, margin: '0 0 0.5rem 0', color: 'var(--text-title)' }}>
          🎓 Simulador de Defensa ante el Tribunal: Preguntas Clave & Fundamentos
        </h2>
        <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '850px' }}>
          Diseñado para que domines tanto el <strong>pitch rápido de respuesta</strong> como la <strong>justificación técnica profunda</strong>. Cada pregunta incluye botones de salto directo para navegar hacia la capa del backend o la sección funcional donde se implementa.
        </p>
      </div>

      {/* FILTROS POR BLOQUES TEMÁTICOS */}
      {!hideCategoryNav && (
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.8rem'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              border: selectedCategory === cat.id ? 'none' : '1px solid var(--border-subtle)',
              background: selectedCategory === cat.id ? '#f59e0b' : 'var(--bg-card)',
              color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-title)',
              fontWeight: selectedCategory === cat.id ? 800 : 600,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease',
              boxShadow: selectedCategory === cat.id ? '0 3px 10px rgba(245, 158, 11, 0.3)' : 'none'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
      )}

      {/* LISTADO DE PREGUNTAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {filteredQuestions.map(q => {
          const isOpen = openQuestion === q.id;
          const isDetailed = !!expandedDetails[q.id];

          return (
            <div
              key={q.id}
              style={{
                background: 'var(--bg-card)',
                border: isOpen ? `2px solid ${q.color}` : '1px solid var(--border-subtle)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                boxShadow: isOpen ? `0 6px 24px ${q.color}20` : '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              {/* CABECERA DE LA PREGUNTA */}
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? null : q.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.3rem 1.6rem',
                  background: isOpen ? `${q.color}08` : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: q.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 850,
                    fontSize: '0.9rem',
                    flexShrink: 0
                  }}>
                    {q.id}
                  </span>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: q.color, letterSpacing: '0.5px' }}>
                      {q.badge}
                    </span>
                    <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      {q.question}
                    </h3>
                  </div>
                </div>
                <span style={{
                  fontSize: '1.2rem',
                  color: q.color,
                  fontWeight: 800,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ▼
                </span>
              </button>

              {/* CONTENIDO DE LA PREGUNTA */}
              {isOpen && (
                <div style={{ padding: '0 1.6rem 1.6rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  
                  {/* PITCH RÁPIDO DE 20 SEGUNDOS */}
                  <div style={{
                    background: `${q.color}14`,
                    borderLeft: `4px solid ${q.color}`,
                    borderRadius: '0 10px 10px 0',
                    padding: '1rem 1.25rem'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 850, textTransform: 'uppercase', color: q.color, display: 'block', marginBottom: '0.35rem' }}>
                      ⚡ Pitch Rápido para el Evaluador (20 segundos):
                    </span>
                    <p style={{ margin: 0, fontSize: '0.94rem', fontWeight: 650, color: 'var(--text-title)', lineHeight: 1.5 }}>
                      "{q.shortAnswer}"
                    </p>
                  </div>

                  {/* BARRA DE BOTONES: AMPLIAR + ENLACES A SECCIONES DETALLADAS */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', paddingTop: '0.4rem' }}>
                    
                    <button
                      type="button"
                      onClick={() => toggleDetails(q.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: isDetailed ? 'var(--bg-hover)' : `${q.color}15`,
                        color: isDetailed ? 'var(--text-title)' : q.color,
                        border: `1px solid ${q.color}50`,
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 750,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{isDetailed ? '▲ Ocultar Explicación Profunda' : '🔍 Ampliar Explicación Técnica y Código ▼'}</span>
                    </button>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {q.relatedLayer && onNavigateToTab && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('layers', q.relatedLayer)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#3b82f6',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 750,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(59, 130, 246, 0.3)',
                            transition: 'all 0.15s ease'
                          }}
                          title={`Ir a ${q.relatedLayerName}`}
                        >
                          <span>🏛️</span>
                          <span>Ver {q.relatedLayerName}</span>
                          <span>➔</span>
                        </button>
                      )}

                      {q.relatedFunctional && onNavigateToTab && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('functional', q.relatedFunctional)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 750,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)',
                            transition: 'all 0.15s ease'
                          }}
                          title={`Ver en ${q.relatedFunctionalName}`}
                        >
                          <span>🖥️</span>
                          <span>Ver en {q.relatedFunctionalName}</span>
                          <span>➔</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* SECCIÓN DETALLADA EXPANDIBLE */}
                  {isDetailed && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      background: 'var(--bg-hover)',
                      padding: '1.3rem 1.5rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      marginTop: '0.4rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.45rem' }}>
                          📖 Fundamentación Técnica Detallada:
                        </span>
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.65,
                          whiteSpace: 'pre-line'
                        }}>
                          {q.deepAnswer}
                        </div>
                      </div>

                      {q.tipDefensa && (
                        <div style={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          borderLeft: '3px solid #f59e0b',
                          padding: '0.75rem 1rem',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '0.85rem',
                          color: 'var(--text-title)'
                        }}>
                          <strong>💡 Consejo Estratégico de Defensa:</strong> {q.tipDefensa}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
