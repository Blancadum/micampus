import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * @component   ProyectoFinalLayersTab
 * @description Explicación técnica de la arquitectura de Spring Boot capa a capa:
 *              - Modelo JPA y base de datos relacional (ddl-auto=validate)
 *              - Repositorios Spring Data JPA con derived queries y paginación
 *              - DTOs y validación personalizada a nivel de clase (@ValidStock)
 *              - Mappers manuales imperativos (sin Lambdas ni Streams por rúbrica)
 *              - Capa de Servicios con gestión transaccional (@Transactional)
 *              - Controladores REST y códigos HTTP semánticos (201 Location, 204)
 *              - Manejo global de excepciones (@RestControllerAdvice)
 *              - Seguridad Stateless con JWT y control de acceso por roles (RBAC)
 * ============================================================================
 */
export default function ProyectoFinalLayersTab({ initialLayer = 1, hideSidebar = false, viewMode = 'single' }) {
  const [selectedLayer, setSelectedLayer] = useState(initialLayer);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (initialLayer) {
      setSelectedLayer(initialLayer);
    }
  }, [initialLayer]);

  const handleCopyCode = (text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const layersData = [
    {
      id: 1,
      name: 'Capa 1: Modelo JPA & Base de Datos Relacional',
      pkg: 'com.accenture.library.model',
      icon: '🗄️',
      color: '#3b82f6',
      summary: 'Mapeo objeto-relacional (ORM) entre clases Java y las tablas MySQL del script db/init.sql con integridad referencial estricta.',
      concepts: [
        {
          title: '¿Por qué spring.jpa.hibernate.ddl-auto=validate?',
          desc: 'En entornos de producción o entregas formales, nunca se debe permitir que Hibernate modifique (update) o destruya (create-drop) las tablas automáticamente. La propiedad "validate" comprueba que las columnas, tipos de datos, tamaños y claves foráneas de las clases Java coincidan al 100% con el esquema SQL real; si hay una discrepancia de un solo campo, la aplicación aborta el arranque para proteger los datos.'
        },
        {
          title: 'Relaciones entre Entidades',
          desc: 'Book tiene relación @ManyToOne(fetch = FetchType.LAZY) con Category (carga perezosa para no saturar memoria), relación @ManyToMany con Author a través de la tabla intermedia book_author y relación @OneToMany con Loan protegida contra borrados en cascada no deseados.'
        }
      ],
      code: `@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 20)
    private String isbn;

    @Column(name = "published_year")
    private Integer publishedYear;

    @Column(name = "available_stock", nullable = false)
    private Integer availableStock;

    @Column(name = "total_stock", nullable = false)
    private Integer totalStock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
        name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private List<Author> authors = new ArrayList<>();
}`
    },
    {
      id: 2,
      name: 'Capa 2: Repositorios Spring Data JPA',
      pkg: 'com.accenture.library.repository',
      icon: '⚡',
      color: '#0ea5e9',
      summary: 'Interfaces de persistencia que heredan de JpaRepository, delegando en Spring la generación automática de consultas SQL.',
      concepts: [
        {
          title: 'Consultas Derivadas (Query Methods por Convención)',
          desc: 'Al declarar métodos como "findByIsbn(String isbn)" o "existsByNameIgnoreCase(String name)", el motor de Spring Data analiza sintácticamente el nombre del método y genera automáticamente en tiempo de ejecución la consulta SQL optimizada con PreparedStatements, inmunizando la aplicación contra SQL Injection.'
        },
        {
          title: 'Paginación Eficiente con Pageable y Page<T>',
          desc: 'En BookRepository se utilizan métodos como findByCategoryId(Long id, Pageable pageable). Esto permite solicitar bloques de registros (ej. página 0 con 10 libros), evitando que una consulta masiva de 50.000 libros bloquee el pool de conexiones o colapse la memoria RAM del servidor.'
        }
      ],
      code: `public interface BookRepository extends JpaRepository<Book, Long> {

    // Búsqueda exacta por código único ISBN
    Optional<Book> findByIsbn(String isbn);

    // Consulta paginada filtrada por categoría
    Page<Book> findByCategoryId(Long categoryId, Pageable pageable);

    // Consulta paginada filtrada por autor
    Page<Book> findByAuthorsId(Long authorId, Pageable pageable);

    // Verificación rápida de duplicados sin cargar la entidad
    boolean existsByIsbn(String isbn);
}`
    },
    {
      id: 3,
      name: 'Capa 3: DTOs & Validación Personalizada de Negocio',
      pkg: 'com.accenture.library.dto & validation',
      icon: '🛡️',
      color: '#10b981',
      summary: 'Objetos de transferencia para desacoplar el contrato externo de la base de datos y validaciones declarativas robustas.',
      concepts: [
        {
          title: '¿Por qué no devolver ni recibir Entidades JPA directamente?',
          desc: '1) Rompe dependencias circulares: Si serializas Book que apunta a Author y Author apunta a Book, Jackson entra en bucle infinito y lanza StackOverflowError. 2) Ocultación de campos sensibles: No expones IDs internos o trazas de auditoría. 3) Estabilidad de la API: Si modificas una tabla en la BBDD, el contrato JSON externo no cambia.'
        },
        {
          title: 'La Regla de Oro: Validador a Nivel de Clase @ValidStock',
          desc: 'Las anotaciones estándar como @Min o @NotNull validan un único atributo aislado. Sin embargo, la regla de negocio exige que "availableStock <= totalStock". Para comparar dos campos de la misma instancia, es obligatorio crear una anotación a nivel de clase (@Target(ElementType.TYPE)) respaldada por StockValidator implements ConstraintValidator<ValidStock, BookRequestDto>.'
        }
      ],
      code: `// 1. Validador personalizado a nivel de clase
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StockValidator.class)
public @interface ValidStock {
    String message() default "El stock disponible no puede superar el stock total";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// 2. Implementación de la lógica de validación
public class StockValidator implements ConstraintValidator<ValidStock, BookRequestDto> {
    @Override
    public boolean isValid(BookRequestDto dto, ConstraintValidatorContext context) {
        if (dto == null || dto.getAvailableStock() == null || dto.getTotalStock() == null) {
            return true; // Las anotaciones @NotNull de campo se encargan de los nulos
        }
        return dto.getAvailableStock() <= dto.getTotalStock();
    }
}`
    },
    {
      id: 4,
      name: 'Capa 4: Mappers Manuales Imperativos (Sin Lambdas)',
      pkg: 'com.accenture.library.mapper',
      icon: '🔄',
      color: '#f59e0b',
      summary: 'Conversión bidireccional DTO ↔ Entidad implementada exclusivamente con bucles clásicos por requisito de la rúbrica.',
      concepts: [
        {
          title: 'La Restricción Oficial: ¿Por qué NO usar Streams ni Lambdas?',
          desc: 'En los Pasos 6 y 8 de la especificación técnica de Accenture se exigió expresamente evitar .stream().map().toList(). El tribunal evalúa que el alumno comprenda el flujo de control tradicional, la gestión manual de colecciones ArrayList y el control estricto de punteros nulos sin abstracciones funcionales intermedias.'
        },
        {
          title: 'Traducción de Colecciones Muchos a Muchos',
          desc: 'En BookMapper, la lista de autores se transforma recorriendo manualmente un bucle for-each y llamando al método atómico toDto(author). Si la lista es nula, se devuelve de forma segura una nueva lista vacía para evitar NullPointerException.'
        }
      ],
      code: `@Component
public class BookMapper {

    // Conversión Entidad -> DTO (Sin Lambdas ni Streams)
    public BookResponseDto toDto(Book book) {
        if (book == null) return null;

        List<AuthorResponseDto> authorDtos = new ArrayList<>();
        if (book.getAuthors() != null) {
            for (Author author : book.getAuthors()) {
                authorDtos.add(toAuthorDto(author));
            }
        }

        return BookResponseDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .isbn(book.getIsbn())
                .publishedYear(book.getPublishedYear())
                .availableStock(book.getAvailableStock())
                .totalStock(book.getTotalStock())
                .category(book.getCategory() != null ? toCategoryDto(book.getCategory()) : null)
                .authors(authorDtos)
                .build();
    }
}`
    },
    {
      id: 5,
      name: 'Capa 5: Servicios de Negocio & Control Transaccional',
      pkg: 'com.accenture.library.service',
      icon: '🧠',
      color: '#8b5cf6',
      summary: 'Lógica central del dominio, inyección por constructor y transacciones atómicas con @Transactional.',
      concepts: [
        {
          title: 'Inyección de Dependencias por Constructor (Mejor Práctica)',
          desc: 'No se utiliza @Autowired en campos (@Autowired private BookRepository repo). Se declara el constructor explícito con modificadores "final". Esto garantiza que las dependencias sean inmutables, facilita la instanciación directa en pruebas unitarias y evita errores de dependencias cíclicas en el arranque.'
        },
        {
          title: 'Atomicidad en Préstamos: @Transactional',
          desc: 'Al registrar un préstamo en LoanServiceImp.createLoan(), ocurren dos escrituras: decrementar el stock del libro y guardar el registro del préstamo. Anotando el método con @Transactional, si la base de datos se interrumpe a mitad de la operación, Spring ejecuta un ROLLBACK íntegro, evitando que el stock disminuya si el préstamo no se guardó.'
        },
        {
          title: 'Cálculo Dinámico del Estado OVERDUE',
          desc: 'El estado "OVERDUE" (Vencido) no se escribe de forma continua en la base de datos mediante un proceso en segundo plano. Al consultar un préstamo, el servicio compara: si status == ACTIVE y expectedReturnDate es anterior a LocalDate.now(), se expone en el DTO como OVERDUE en tiempo real.'
        }
      ],
      code: `@Service
public class LoanServiceImp implements LoanService {

    private final LoanRepository loanRepository;
    private final BookRepository bookRepository;

    public LoanServiceImp(LoanRepository loanRepository, BookRepository bookRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    @Transactional
    public LoanResponseDto createLoan(LoanRequestDto dto) {
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado"));

        if (book.getAvailableStock() <= 0) {
            throw new BusinessRuleException("No hay ejemplares disponibles para préstamo");
        }

        // Reducción atómica de stock
        book.setAvailableStock(book.getAvailableStock() - 1);
        bookRepository.save(book);

        Loan loan = new Loan();
        loan.setBook(book);
        loan.setLoanDate(LocalDate.now());
        loan.setExpectedReturnDate(dto.getExpectedReturnDate());
        loan.setStatus(LoanStatus.ACTIVE);

        return LoanMapper.toDto(loanRepository.save(loan));
    }
}`
    },
    {
      id: 6,
      name: 'Capa 6: Controladores RESTful & Semántica HTTP',
      pkg: 'com.accenture.library.controller',
      icon: '🌐',
      color: '#ec4899',
      summary: 'Endpoints REST que exponen las operaciones con verbos HTTP adecuados, validación @Valid y cabeceras estándar.',
      concepts: [
        {
          title: 'Cumplimiento Estricto de Verbos y Códigos HTTP',
          desc: 'GET -> 200 OK (lectura). POST -> 201 Created con cabecera Location apuntando a la URI del nuevo recurso (/api/books/{id}). PUT -> 200 OK (actualización completa o cambio de estado). DELETE -> 204 No Content (cuerpo vacío). 400 para errores de cliente, 404 si el ID no existe y 409 si hay conflicto de unicidad.'
        },
        {
          title: 'Documentación Automática con Swagger / OpenAPI',
          desc: 'Cada controlador cuenta con anotaciones @Tag y @Operation de SpringDoc OpenAPI 3.1.1, generando el portal interactivo en /swagger-ui.html con esquema de seguridad BearerAuth.'
        }
      ],
      code: `@RestController
@RequestMapping("/api/books")
@Tag(name = "Libros", description = "Catálogo y gestión de inventario")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookResponseDto> createBook(@Valid @RequestBody BookRequestDto dto) {
        BookResponseDto created = bookService.createBook(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();
        return ResponseEntity.created(location).body(created); // HTTP 201 Created
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }
}`
    },
    {
      id: 7,
      name: 'Capa 7: Manejo Global de Excepciones',
      pkg: 'com.accenture.library.exception',
      icon: '🚨',
      color: '#ef4444',
      summary: 'Interceptación transversal de errores mediante @RestControllerAdvice para devolver respuestas JSON estandarizadas.',
      concepts: [
        {
          title: '¿Por qué nunca devolver trazas de error (Stacktraces) al cliente?',
          desc: 'Filtrar trazas internas (Information Leakage) es una vulnerabilidad grave según OWASP. Un atacante podría conocer versiones de librerías, nombres de tablas o rutas internas del servidor. GlobalExceptionHandler intercepta las excepciones y genera un DTO limpio (timestamp, status, error, message, path).'
        },
        {
          title: 'Captura de Errores de Validación (Bean Validation)',
          desc: 'Cuando falla @Valid, Spring lanza MethodArgumentNotValidException. El manejador recorre getBindingResult().getFieldErrors() y getGlobalErrors() (donde salta @ValidStock), empaquetando cada campo con su mensaje específico para que el frontend resalte el error.'
        }
      ],
      code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) {
        ErrorResponseDto err = ErrorResponseDto.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("Not Found")
                .message(ex.getMessage())
                .path(req.getRequestURI())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError f : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(f.getField(), f.getDefaultMessage());
        }
        for (ObjectError g : ex.getBindingResult().getGlobalErrors()) {
            fieldErrors.put(g.getObjectName(), g.getDefaultMessage());
        }

        ErrorResponseDto err = ErrorResponseDto.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Validation Error")
                .message("Uno o más campos contienen valores no válidos")
                .validationErrors(fieldErrors)
                .path(req.getRequestURI())
                .build();
        return ResponseEntity.badRequest().body(err);
    }
}`
    },
    {
      id: 8,
      name: 'Capa 8: Seguridad Stateless (Spring Security & JWT)',
      pkg: 'com.accenture.library.security',
      icon: '🔒',
      color: '#6366f1',
      summary: 'Arquitectura sin estado basada en tokens firmados con HMAC-SHA256 y control de acceso basado en roles (RBAC).',
      concepts: [
        {
          title: '¿Qué significa arquitectura Stateless (Sin Estado)?',
          desc: 'El servidor no guarda sesiones HTTP en memoria ni utiliza JSESSIONID. Cada petición del cliente debe ser autosuficiente e incluir su credencial en la cabecera Authorization: Bearer <token>. Esto permite escalar la aplicación horizontalmente en múltiples contenedores Docker sin necesidad de sincronizar sesiones.'
        },
        {
          title: 'El Filtro JwtAuthenticationFilter (OncePerRequestFilter)',
          desc: 'Intercepta cada petición antes de llegar al controlador. Extrae el token, verifica la firma con la clave secreta compartida de 256 bits, extrae el nombre de usuario y los roles, y los inyecta en el SecurityContextHolder de Spring Security.'
        }
      ],
      code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable()) // Stateless: CSRF no aplica a APIs REST con Bearer
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Preflight CORS
                .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/books/**", "/api/authors/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/loans/**").authenticated()
                .requestMatchers("/api/**").hasRole("ADMIN") // Altas/Bajas solo ADMIN
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}`
    }
  ];

  const filteredLayers = layersData.filter(layer => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      layer.name.toLowerCase().includes(q) ||
      layer.pkg.toLowerCase().includes(q) ||
      layer.summary.toLowerCase().includes(q) ||
      layer.concepts.some(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
    );
  });

  const currentIndex = layersData.findIndex(l => l.id === selectedLayer);
  const prevLayer = currentIndex > 0 ? layersData[currentIndex - 1] : null;
  const nextLayer = currentIndex < layersData.length - 1 ? layersData[currentIndex + 1] : null;
  const currentLayer = layersData.find(l => l.id === selectedLayer) || layersData[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ESTILOS DEL ASIDE IZQUIERDO Y LAYOUT RESPONSIVO */}
      <style>{`
        .layers-layout-container {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          position: relative;
        }
        .layers-aside-nav {
          width: 320px;
          flex-shrink: 0;
          position: sticky;
          top: 80px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
        }
        .layers-aside-nav::-webkit-scrollbar {
          width: 5px;
        }
        .layers-aside-nav::-webkit-scrollbar-thumb {
          background: var(--border-subtle);
          border-radius: 4px;
        }
        .layers-main-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .layer-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.55rem 0.75rem;
          border-radius: 4px;
          border: none;
          border-left: 3px solid transparent;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .layer-nav-item:hover {
          background: var(--bg-hover);
          color: var(--text-title);
          transform: translateX(3px);
          border-left-color: var(--border-subtle);
        }
        .layer-nav-item.is-active {
          transform: translateX(2px);
          font-weight: 700;
          text-shadow: 0 0 0.35px currentColor;
        }
        @media (max-width: 960px) {
          .layers-layout-container {
            flex-direction: column;
          }
          .layers-aside-nav {
            width: 100%;
            position: static;
            max-height: none;
          }
        }
      `}</style>

      {/* HEADER DE LA SECCIÓN CAPA A CAPA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.04) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.35)',
        borderRadius: '20px',
        padding: '1.6rem 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            background: '#3b82f6',
            color: '#ffffff',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.2rem 0.65rem',
            borderRadius: '999px',
            letterSpacing: '0.5px'
          }}>
            Arquitectura de Software · Spring Boot 3
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            3 Capas Lógicas · 8 Paquetes de Diseño Desacoplado (IoC)
          </span>
        </div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 850, margin: '0 0 0.4rem 0', color: 'var(--text-title)' }}>
          🏛️ Anatomía del Backend: 3 Capas Lógicas organizadas en 8 Paquetes
        </h2>
        <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
          Arquitectónicamente el sistema es un <strong>monolito en 3 capas desacopladas</strong> (Presentación, Negocio y Persistencia) más componentes transversales de seguridad y excepciones. Para garantizar el principio de <strong>Responsabilidad Única</strong> y evitar paquetes sobrecargados, el código Java se distribuye limpiamente en <strong>8 paquetes temáticos</strong>.
        </p>
      </div>

      {/* CONTENEDOR PRINCIPAL: ASIDE LEFT + DETALLE DE CONTENIDO */}
      <div className="layers-layout-container">

        {/* ASIDE IZQUIERDO: MENÚ DE LOS 8 PAQUETES EN 3 CAPAS */}
        {!hideSidebar && (
        <aside className="layers-aside-nav" aria-label="Navegación de Capas Backend">
          
          {/* CABECERA DEL ASIDE */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🏛️</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Estructura Backend
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  3 Capas · 8 Paquetes
                </span>
              </div>
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              background: 'var(--bg-hover)',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              color: 'var(--text-muted)'
            }}>
              3 Capas
            </span>
          </div>

          {/* BUSCADOR RÁPIDO DE CAPAS */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Filtrar (JPA, DTO, JWT...)"
              style={{
                width: '100%',
                padding: '0.55rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-hover)',
                color: 'var(--text-title)',
                fontSize: '0.82rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* LISTA VERTICAL DE CAPAS */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {filteredLayers.map(layer => {
              const isSelected = layer.id === selectedLayer;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setSelectedLayer(layer.id);
                    if (window.innerWidth <= 960) {
                      document.getElementById('layer-detail-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`layer-nav-item ${isSelected ? 'is-active' : ''}`}
                  style={{
                    borderLeft: isSelected ? `3px solid ${layer.color}` : '3px solid transparent',
                    background: isSelected ? `${layer.color}1f` : 'transparent',
                    color: isSelected ? layer.color : 'var(--text-muted)'
                  }}
                >
                  <span style={{
                    fontSize: '1.2rem',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    background: isSelected ? `${layer.color}25` : 'var(--bg-hover)',
                    flexShrink: 0
                  }}>
                    {layer.icon}
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1, gap: '0.1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.3rem' }}>
                      <span style={{
                        fontSize: '0.67rem',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                        color: isSelected ? layer.color : 'var(--text-dim)'
                      }}>
                        Capa {layer.id}
                      </span>
                      <span style={{
                        fontSize: '0.67rem',
                        fontFamily: 'monospace',
                        color: 'var(--text-dim)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        .{layer.pkg.split('.').pop()}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 800 : 600,
                      lineHeight: 1.25,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {layer.name.replace(/^Capa \d+: /, '')}
                    </span>
                  </div>

                  {isSelected && (
                    <span style={{ fontSize: '0.85rem', color: layer.color, fontWeight: 900, flexShrink: 0 }}>
                      ➔
                    </span>
                  )}
                </button>
              );
            })}

            {filteredLayers.length === 0 && (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                No se encontraron capas que coincidan con "{searchQuery}".
              </div>
            )}
          </nav>

          {/* FOOTER DEL ASIDE: PROGRESO DE REVISIÓN */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: 'var(--text-dim)' }}>
              <span>Capa activa</span>
              <span style={{ fontWeight: 800, color: currentLayer.color }}>
                {selectedLayer} de 8
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '5px',
              background: 'var(--bg-hover)',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(selectedLayer / 8) * 100}%`,
                height: '100%',
                background: currentLayer.color,
                transition: 'width 0.3s ease, background 0.3s ease'
              }} />
            </div>
          </div>

        </aside>
        )}

        {/* CONTENIDO PRINCIPAL: DETALLE DE LA CAPA SELECCIONADA */}
        <main className="layers-main-content">
          <div id="layer-detail-anchor" />

          {/* RENDERIZADO: MODO CONTINUO O MODO INDIVIDUAL */}
          {(viewMode === 'continuous' ? filteredLayers : [currentLayer]).map((layer) => (
            <div
              key={layer.id}
              id={`layer-${layer.id}`}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${layer.color}50`,
                borderRadius: '18px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                scrollMarginTop: '90px'
              }}
            >
              {/* CABECERA DE LA CAPA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '1.6rem' }}>{layer.icon}</span>
                    <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 850, color: 'var(--text-title)' }}>
                      {layer.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: layer.color, fontWeight: 700, fontFamily: 'monospace' }}>
                    📦 Paquete Java: {layer.pkg}
                  </span>
                </div>
                <span style={{
                  background: `${layer.color}20`,
                  color: layer.color,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase'
                }}>
                  Capa {layer.id} de 8
                </span>
              </div>

              {/* RESUMEN EJECUTIVO */}
              <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {layer.summary}
              </p>

              {/* CONCEPTOS CLAVE DE TEORÍA */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
                {layer.concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-hover)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '1.3rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: layer.color }}>
                      💡 {concept.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {concept.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CÓDIGO REAL DEL PROYECTO */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                    Fragmento Real del Proyecto:
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      Java 21 / Spring Boot 3
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(layer.code)}
                      style={{
                        background: copiedCode ? '#10b981' : 'var(--bg-hover)',
                        color: copiedCode ? '#ffffff' : 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {copiedCode ? '✓ ¡Copiado!' : '📋 Copiar Código'}
                    </button>
                  </div>
                </div>
                
                <pre style={{
                  background: '#0f172a',
                  color: '#f8fafc',
                  padding: '1.3rem',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '0.83rem',
                  lineHeight: 1.55,
                  overflowX: 'auto',
                  margin: 0,
                  border: '1px solid #1e293b'
                }}>
{layer.code}
                </pre>
              </div>

              {/* FOOTER DE NAVEGACIÓN ENTRE CAPAS (SOLO SI TIENE ASIDE INTERNO) */}
              {!hideSidebar && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1.2rem',
                  marginTop: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  {prevLayer ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLayer(prevLayer.id);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      style={{
                        background: 'var(--bg-hover)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '0.65rem 1.1rem',
                        color: 'var(--text-title)',
                        fontSize: '0.86rem',
                        fontWeight: 750,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <span>⬅</span>
                      <span>Capa {prevLayer.id}: {prevLayer.name.replace(/^Capa \d+: /, '')}</span>
                    </button>
                  ) : <div />}

                  {nextLayer ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLayer(nextLayer.id);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      style={{
                        background: nextLayer.color,
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.65rem 1.2rem',
                        color: '#ffffff',
                        fontSize: '0.86rem',
                        fontWeight: 750,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        boxShadow: `0 4px 12px ${nextLayer.color}40`
                      }}
                    >
                      <span>Capa {nextLayer.id}: {nextLayer.name.replace(/^Capa \d+: /, '')}</span>
                      <span>➔</span>
                    </button>
                  ) : <div />}
                </div>
              )}
            </div>
          ))}
        </main>

      </div>

    </div>
  );
}

