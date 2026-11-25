import React, { useState } from 'react';

/**
 * ============================================================================
 * @component   ProyectoFinalComparisonTab
 * @description Módulo de análisis arquitectónico comparativo:
 *              Arquitectura en Capas (N-Tier) frente a Arquitectura Hexagonal
 *              (Ports & Adapters) sobre el dominio de la Biblioteca.
 *              Análisis técnico y relación con los mecanismos de Spring Boot.
 * ============================================================================
 */
export default function ProyectoFinalComparisonTab({ onNavigateToTab }) {
  const [activeTab, setActiveTab] = useState('split');
  const [selectedCase, setSelectedCase] = useState('loan');
  const [selectedDifference, setSelectedDifference] = useState(1);
  const [copiedKey, setCopiedKey] = useState(null);

  const copyCode = (code, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // CASOS DE USO LADO A LADO
  const SIDE_BY_SIDE_CASES = [
    {
      id: 'create-book',
      title: 'Alta de Libro y Control de Stock',
      endpoint: 'POST /api/books',
      traditional: {
        pattern: 'Flujo descendente: Controller → Service → JpaRepository',
        files: ['BookController.java', 'BookServiceImp.java', 'BookRepository.java', 'Book.java (@Entity)'],
        mechanism: 'Validación en entrada con Bean Validation (@ValidStock). Mapeo directo DTO-Entidad y persistencia mediante Spring Data JPA.',
        code: `// ARQUITECTURA EN CAPAS (TRADICIONAL)
// 1. Capa de Presentación: Controlador REST
@PostMapping
public ResponseEntity<BookResponseDto> createBook(@Valid @RequestBody BookRequestDto request) {
    BookResponseDto created = bookService.createBook(request);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}").buildAndExpand(created.getId()).toUri();
    return ResponseEntity.created(location).body(created);
}

// 2. Capa de Negocio: Servicio acoplado a la infraestructura
@Service
@Transactional
public class BookServiceImp implements BookService {
    @Autowired
    private BookRepository bookRepository; // Dependencia directa de JpaRepository
    
    @Override
    public BookResponseDto createBook(BookRequestDto request) {
        if (bookRepository.existsByIsbn(request.getIsbn())) {
            throw new DuplicateResourceException("El ISBN ya existe");
        }
        Book entity = bookMapper.toEntity(request);
        Book saved = bookRepository.save(entity);
        return bookMapper.toDto(saved);
    }
}`
      },
      hexagonal: {
        pattern: 'Flujo hacia el centro: WebAdapter → InPort → Domain → OutPort → PersistenceAdapter',
        files: ['BookController.java', 'CreateBookUseCase.java', 'Book.java (Domain)', 'BookRepositoryPort.java', 'BookJpaAdapter.java'],
        mechanism: 'El controlador delega en un puerto primario (CreateBookUseCase). El modelo de dominio valida sus invariantes. El adaptador secundario ejecuta la persistencia.',
        code: `// ARQUITECTURA HEXAGONAL (PORTS & ADAPTERS)
// 1. Adaptador Primario (Web): Convierte DTO a modelo de dominio
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final CreateBookUseCase createBookUseCase; // Puerto de Entrada

    @PostMapping
    public ResponseEntity<BookResponseDto> createBook(@Valid @RequestBody BookRequestDto request) {
        Book domainBook = bookWebMapper.toDomain(request);
        Book savedDomain = createBookUseCase.execute(domainBook);
        return ResponseEntity.created(URI.create("/api/books/" + savedDomain.getId()))
            .body(bookWebMapper.toResponse(savedDomain));
    }
}

// 2. Caso de Uso (Aplicación): Libre de dependencias externas
public class CreateBookService implements CreateBookUseCase {
    private final BookRepositoryPort bookRepositoryPort; // Puerto de Salida

    @Override
    public Book execute(Book book) {
        if (bookRepositoryPort.existsByIsbn(book.getIsbn())) {
            throw new DuplicateIsbnException("El ISBN ya existe");
        }
        book.validateStockConsistency(); // Invariante encapsulado en el dominio
        return bookRepositoryPort.save(book);
    }
}`
      }
    },
    {
      id: 'loan',
      title: 'Emisión de Préstamo y Decremento de Stock',
      endpoint: 'POST /api/loans',
      traditional: {
        pattern: 'Orquestación procedimental en el servicio',
        files: ['LoanController.java', 'LoanServiceImp.java', 'Book.java (Entity)'],
        mechanism: 'El servicio ejecuta la comprobación de stock y la mutación directa sobre los campos de la entidad antes de guardar.',
        code: `// ARQUITECTURA EN CAPAS (TRADICIONAL)
@Service
@Transactional
public class LoanServiceImp implements LoanService {
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public LoanResponseDto createLoan(LoanRequestDto request) {
        Book book = bookRepository.findById(request.getBookId())
            .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado"));
            
        // Regla de negocio procedural en el servicio:
        if (book.getAvailableStock() <= 0) {
            throw new BusinessRuleException("No hay stock disponible para préstamo");
        }
        book.setAvailableStock(book.getAvailableStock() - 1);
        bookRepository.save(book);

        Loan loan = new Loan(book, request.getUserName(), LocalDate.now(), LoanStatus.ACTIVE);
        return loanMapper.toDto(loanRepository.save(loan));
    }
}`
      },
      hexagonal: {
        pattern: 'Invocación de método rico en el agregado de dominio',
        files: ['BorrowBookUseCase.java', 'Book.java (Domain)', 'Loan.java (Domain)', 'BookRepositoryPort.java'],
        mechanism: 'La regla reside en el método book.borrowCopy(), que salvaguarda la consistencia interna sin exponer setters pasivos.',
        code: `// ARQUITECTURA HEXAGONAL (PORTS & ADAPTERS)
// 1. Modelo de Dominio: domain/model/Book.java
public class Book {
    private Long id;
    private Integer availableStock;

    // Regla encapsulada e invariante:
    public void borrowCopy() {
        if (this.availableStock <= 0) {
            throw new InsufficientStockException("Imposible prestar: stock agotado");
        }
        this.availableStock--;
    }
}

// 2. Servicio de Aplicación (Caso de Uso):
public class BorrowBookService implements BorrowBookUseCase {
    private final BookRepositoryPort bookRepositoryPort;
    private final LoanRepositoryPort loanRepositoryPort;

    @Override
    public Loan execute(Long bookId, String user) {
        Book book = bookRepositoryPort.findById(bookId)
            .orElseThrow(() -> new BookNotFoundException(bookId));
            
        book.borrowCopy(); // El propio objeto asegura su consistencia
        bookRepositoryPort.update(book);

        Loan loan = Loan.createActiveLoan(book, user);
        return loanRepositoryPort.save(loan);
    }
}`
      }
    },
    {
      id: 'mapping',
      title: 'Fronteras de Datos y Separación de Modelos',
      endpoint: 'Estructura de Datos Interna',
      traditional: {
        pattern: 'Entidad unificada de persistencia y dominio',
        files: ['BookRequestDto.java', 'Book.java (@Entity)', 'BookMapper.java'],
        mechanism: 'Una única clase combina la definición de negocio con las anotaciones ORM de Hibernate (@Table, @Column, @ManyToOne).',
        code: `// TRADICIONAL: Entidad única acoplada a persistencia
@Entity
@Table(name = "book")
@Getter @Setter
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 150)
    private String title;
    
    @Column(name = "available_stock", nullable = false)
    private Integer availableStock;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}`
      },
      hexagonal: {
        pattern: 'Dos representaciones desacopladas por frontera',
        files: ['Book.java (Domain)', 'BookJpaEntity.java', 'BookPersistenceMapper.java'],
        mechanism: 'El modelo de dominio permanece libre de anotaciones de base de datos. La entidad JPA pertenece exclusivamente a la infraestructura.',
        code: `// HEXAGONAL: Desacoplamiento estricto

// 1. Dominio Puro: domain/model/Book.java (Java estándar)
public class Book {
    private Long id;
    private String title;
    private Integer availableStock;
    // Métodos de negocio puros; sin dependencias de Hibernate ni Spring
}

// 2. Persistencia: infrastructure/persistence/BookJpaEntity.java
@Entity
@Table(name = "book")
@Getter @Setter
public class BookJpaEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(name = "available_stock")
    private Integer availableStock;
    // BookPersistenceMapper traduce bidireccionalmente Book <-> BookJpaEntity
}`
      }
    },
    {
      id: 'testing',
      title: 'Estrategia de Verificación y Pruebas Unitarias',
      endpoint: 'Tests de Regresión',
      traditional: {
        pattern: 'Pruebas con contexto o emulación mediante Mockito',
        files: ['BookServiceTest.java (@ExtendWith(MockitoExtension.class))'],
        mechanism: 'Para aislar el servicio es necesario emular las interfaces de Spring Data JPA mediante librerías de mocks.',
        code: `// TRADICIONAL: Test unitario acoplado al framework de mocks
@ExtendWith(MockitoExtension.class)
class BookServiceTest {
    @Mock
    private BookRepository bookRepository;
    @InjectMocks
    private BookServiceImp bookService;

    @Test
    void shouldCreateBook() {
        Book entity = new Book(1L, "Clean Code", 5);
        when(bookRepository.save(any(Book.class))).thenReturn(entity);
        
        BookResponseDto result = bookService.createBook(dto);
        assertNotNull(result);
        verify(bookRepository).save(any(Book.class));
    }
}`
      },
      hexagonal: {
        pattern: 'Pruebas directas de objetos de dominio sin dependencias',
        files: ['BookDomainTest.java', 'BorrowBookUseCaseTest.java'],
        mechanism: 'Las reglas de negocio se verifican directamente instanciando objetos en memoria, sin arranque de contexto ni mocks pesados.',
        code: `// HEXAGONAL: Test unitario puro en Java sin librerías de emulación
class BookDomainTest {
    @Test
    void shouldDecreaseStockWhenBorrowed() {
        Book book = new Book(1L, "Clean Code", 5);
        book.borrowCopy();
        assertEquals(4, book.getAvailableStock());
    }

    @Test
    void shouldThrowExceptionWhenNoStock() {
        Book book = new Book(1L, "Clean Code", 0);
        assertThrows(InsufficientStockException.class, () -> book.borrowCopy());
    }
}`
      }
    }
  ];

  // LAS 7 DIFERENCIAS TÉCNICAS
  const ARCH_DIFFERENCES = [
    {
      id: 1,
      title: '1. Dirección de Dependencias',
      subtitle: 'Acoplamiento a base de datos vs. Inversión hacia el dominio',
      trad: 'Las dependencias descienden verticalmente: Controlador → Servicio → Repositorio → Base de Datos. La capa de negocio depende de la estructura relacional.',
      hex: 'Las dependencias convergen hacia el dominio central. La base de datos y la web constituyen adaptadores periféricos que implementan o invocan contratos.',
      springNote: 'En el diseño tradicional se inyecta JpaRepository en los servicios. En hexagonal se inyecta un puerto (interfaz de dominio) resuelto por un adaptador.'
    },
    {
      id: 2,
      title: '2. Definición del Modelo de Datos',
      subtitle: 'Entidad unificada vs. Modelos especializados por capa',
      trad: 'Una única clase con anotaciones @Entity, @Table y @Column modela simultáneamente el negocio y el esquema relacional SQL.',
      hex: 'Se definen dos clases: un modelo de dominio puro sin dependencias de persistencia y una entidad JPA confinada al adaptador de infraestructura.',
      springNote: 'Elimina el riesgo de que cambios en la estructura de tablas o ajustes de Hibernate alteren la semántica del negocio.'
    },
    {
      id: 3,
      title: '3. Encapsulamiento de la Lógica',
      subtitle: 'Modelo anémico vs. Modelo de dominio rico',
      trad: 'Entidades concebidas como estructuras de datos pasivas (getters/setters). La lógica y las validaciones operativas residen en los servicios.',
      hex: 'Los objetos de dominio encapsulan su propio estado y aseguran sus invariantes mediante métodos semánticos (ej. book.borrowCopy()).',
      springNote: 'Refuerza los principios fundamentales de cohesión y encapsulamiento propios del diseño orientado a objetos.'
    },
    {
      id: 4,
      title: '4. Exposición de Casos de Uso',
      subtitle: 'Servicios de propósito general vs. Puertos de entrada acotados',
      trad: 'Los controladores invocan directamente servicios que suelen concentrar múltiples operaciones y vincularse a DTOs de transporte.',
      hex: 'La capa de aplicación expone contratos específicos (UseCases). Múltiples puntos de entrada (REST, mensajería, CLI) pueden invocar el mismo puerto.',
      springNote: 'Permite reutilizar la lógica de aplicación sin ligar su ejecución al protocolo HTTP ni a las clases del paquete web.'
    },
    {
      id: 5,
      title: '5. Aislamiento respecto al Framework',
      subtitle: 'Dependencia ubicua de Spring vs. Dominio agnóstico',
      trad: 'Las anotaciones de Spring (@Service, @Transactional, @Autowired) se distribuyen por todas las capas del proyecto.',
      hex: 'El núcleo de dominio se compila con Java estándar sin imports de librerías externas. El framework se limita a los adaptadores de infraestructura.',
      springNote: 'Permite verificar la lógica fundamental de forma aislada y previene la obsolescencia ligada a cambios mayores de dependencias.'
    },
    {
      id: 6,
      title: '6. Transformación de Datos (Mappers)',
      subtitle: 'Mapeo directo vs. Fronteras de traducción independientes',
      trad: 'Mapeo bidireccional simple: DTO ↔ Entidad JPA. Ambas representaciones se encuentran estrechamente ligadas.',
      hex: 'Mapeo en dos fronteras independientes: Adaptador Web (DTO ↔ Dominio) y Adaptador de Persistencia (Dominio ↔ Entidad JPA).',
      springNote: 'Asegura que las modificaciones en contratos REST no impacten en el esquema de tablas, y viceversa.'
    },
    {
      id: 7,
      title: '7. Complejidad y Velocidad de Pruebas',
      subtitle: 'Pruebas dependientes de contexto vs. Verificación unitaria pura',
      trad: 'Requiere herramientas de emulación (Mockito) o inicialización del contexto de Spring (@SpringBootTest) para validar el comportamiento del servicio.',
      hex: 'La mayor parte de las pruebas se ejecutan de forma instantánea sobre objetos Java puros, prescindiendo del contenedor de inyección.',
      springNote: 'Acelera los ciclos de retroalimentación en desarrollo local y optimiza los tiempos de compilación en pipelines de integración continua.'
    }
  ];

  const currentCase = SIDE_BY_SIDE_CASES.find(c => c.id === selectedCase) || SIDE_BY_SIDE_CASES[0];
  const currentDiff = ARCH_DIFFERENCES.find(d => d.id === selectedDifference) || ARCH_DIFFERENCES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '3rem' }}>
      
      {/* CABECERA ACADÉMICA SOBRIA */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '1.75rem 2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          Documento de Análisis de Arquitectura de Software
        </div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-title)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Análisis Comparativo: Arquitectura en Capas frente a Hexagonal
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '880px', margin: 0 }}>
          Estudio técnico de las decisiones de diseño aplicadas a la API REST de Gestión de Biblioteca. Análisis de trade-offs, desacoplamiento, flujos de control y su correspondencia con los mecanismos internos de Spring Framework.
        </p>

        {/* NAVEGACIÓN SECUNDARIA SOBRIA */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginTop: '1.4rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          {[
            { id: 'split', label: '1. Implementación Paralela (Split View)' },
            { id: 'common', label: '2. Puntos de Convergencia' },
            { id: 'differences', label: '3. Divergencias Arquitectónicas' },
            { id: 'spring', label: '4. Mecanismos de Spring Framework' },
            { id: 'matrix', label: '5. Criterios de Selección' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  border: '1px solid',
                  borderColor: isActive ? 'var(--text-title)' : 'var(--border-subtle)',
                  background: isActive ? 'var(--text-title)' : 'transparent',
                  color: isActive ? 'var(--bg-body, #ffffff)' : 'var(--text-muted)',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.12s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VISTA PARALELA (SPLIT VIEW)                                            */}
      {/* ========================================================================= */}
      {activeTab === 'split' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* SELECTOR DE CASO DE USO SOBRIO */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Caso de uso seleccionado para la comparativa:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {SIDE_BY_SIDE_CASES.map(c => {
                const isSelected = selectedCase === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCase(c.id)}
                    style={{
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--text-title)' : 'var(--border-subtle)',
                      background: isSelected ? 'var(--bg-hover)' : 'transparent',
                      color: 'var(--text-title)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    <div style={{ fontWeight: isSelected ? 700 : 600, fontSize: '0.84rem' }}>
                      {c.title}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
                      {c.endpoint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VISTA COMPARATIVA DOS COLUMNAS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.25rem' }}>
            
            {/* COLUMNA 1: ARQUITECTURA EN CAPAS */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                background: 'var(--bg-hover)',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    Arquitectura en Capas (N-Tier)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Diseño tradicional con acoplamiento a persistencia
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(currentCase.traditional.code, 'trad')}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedKey === 'trad' ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Flujo de ejecución:
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)' }}>
                    {currentCase.traditional.pattern}
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {currentCase.traditional.mechanism}
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'ui-monospace, monospace' }}>
                  Archivos: {currentCase.traditional.files.join(' · ')}
                </div>

                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '0.85rem 1rem',
                  borderRadius: '6px',
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: '0.76rem',
                  lineHeight: 1.4,
                  overflowX: 'auto',
                  margin: 0,
                  flex: 1
                }}>
                  <code>{currentCase.traditional.code}</code>
                </pre>
              </div>
            </div>

            {/* COLUMNA 2: ARQUITECTURA HEXAGONAL */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                background: 'var(--bg-hover)',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    Arquitectura Hexagonal (Ports & Adapters)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Diseño desacoplado con inversión de dependencias
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(currentCase.hexagonal.code, 'hex')}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedKey === 'hex' ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Flujo de ejecución:
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)' }}>
                    {currentCase.hexagonal.pattern}
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {currentCase.hexagonal.mechanism}
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'ui-monospace, monospace' }}>
                  Archivos: {currentCase.hexagonal.files.join(' · ')}
                </div>

                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '0.85rem 1rem',
                  borderRadius: '6px',
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: '0.76rem',
                  lineHeight: 1.4,
                  overflowX: 'auto',
                  margin: 0,
                  flex: 1
                }}>
                  <code>{currentCase.hexagonal.code}</code>
                </pre>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PUNTOS DE CONVERGENCIA                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'common' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-title)', margin: '0 0 0.35rem 0' }}>
                Convergencia de Reglas de Negocio y Contratos Externos
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.55, fontSize: '0.88rem', margin: 0 }}>
                El cambio de patrón arquitectónico no modifica los requisitos funcionales ni el comportamiento visible del sistema. Ambas implementaciones comparten íntegramente las siguientes especificaciones:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
              
              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  1. Modelo Lógico y Entidades
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Las cuatro entidades del dominio (Libro, Autor, Categoría y Préstamo) y sus relaciones estructurales (1:N y N:M) se conservan idénticas en ambas versiones.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  2. Invariantes de Consistencia
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Restricciones obligatorias: el stock disponible no puede superar el total ni ser negativo, y la formalización de un préstamo descuenta exactamente un ejemplar.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  3. Semántica de la API REST
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Códigos de estado normalizados: 200 OK, 201 Created con cabecera Location, 204 No Content, 400 Bad Request, 404 Not Found y 409 Conflict.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  4. Control de Acceso (RBAC)
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Autenticación sin estado mediante tokens JWT (algoritmo HMAC-SHA256). Perfiles diferenciados: ROLE_ADMIN (operaciones de escritura) y ROLE_USER (lectura).
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  5. Esquema Relacional de Persistencia
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  El script DDL de base de datos (tablas book, author, book_author, loan, category) y sus restricciones de integridad referencial aplican en ambos entornos.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  6. Atomicidad Transaccional
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Garantía ACID en operaciones compuestas: cualquier fallo durante el registro de un préstamo revierte automáticamente las modificaciones de stock.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DIVERGENCIAS ARQUITECTÓNICAS (LAS 7 DIFERENCIAS)                       */}
      {/* ========================================================================= */}
      {activeTab === 'differences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* LISTADO LATERAL / BOTONES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
            {ARCH_DIFFERENCES.map(d => {
              const isSelected = selectedDifference === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDifference(d.id)}
                  style={{
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--text-title)' : 'var(--border-subtle)',
                    background: isSelected ? 'var(--bg-card)' : 'transparent',
                    borderRadius: '6px',
                    padding: '0.65rem 0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem'
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 600, color: 'var(--text-title)' }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {d.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* FICHA TÉCNICA DE LA DIVERGENCIA */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-title)', margin: '0 0 0.2rem 0' }}>
                {currentDiff.title}
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {currentDiff.subtitle}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              
              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Arquitectura en Capas:
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {currentDiff.trad}
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Arquitectura Hexagonal:
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {currentDiff.hex}
                </p>
              </div>

            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.9rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Implicación técnica en Spring Boot:
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-title)', lineHeight: 1.5 }}>
                {currentDiff.springNote}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MECANISMOS DE SPRING FRAMEWORK                                         */}
      {/* ========================================================================= */}
      {activeTab === 'spring' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-title)', margin: '0 0 0.35rem 0' }}>
                Correspondencia con los Mecanismos Internos de Spring Boot
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.55, fontSize: '0.88rem', margin: 0 }}>
                Análisis de la interacción entre el contenedor IoC, el ciclo de vida de beans y la gestión transaccional según el patrón elegido:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
              
              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                  1. Inversión de Control (IoC) y Registro de Beans
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <strong>En capas:</strong> Las clases de servicio y repositorio se anotan con <code>@Service</code> y <code>@Repository</code>, permitiendo que el escaneo de componentes (@ComponentScan) gestione directamente su ciclo de vida.<br /><br />
                  <strong>En hexagonal:</strong> El dominio y los casos de uso evitan anotaciones del framework. Su registro en el ApplicationContext se delega a clases de configuración (<code>@Configuration</code>) mediante métodos <code>@Bean</code> en la capa de infraestructura.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                  2. Delimitación Transaccional (@Transactional & AOP)
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Spring intercepta la llamada mediante un proxy dinámico CGLIB.<br /><br />
                  <strong>En capas:</strong> <code>@Transactional</code> se ubica en el servicio de aplicación, gestionando el ciclo de vida de la transacción de base de datos directamente sobre la capa intermedia.<br /><br />
                  <strong>En hexagonal:</strong> La transacción se define en la frontera del caso de uso o en el adaptador de persistencia, impidiendo que el dominio puro quede ligado a la semántica transaccional de Spring.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                  3. Aislamiento de la Sesión de Persistencia (Lazy Loading)
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <strong>En capas:</strong> El acceso a relaciones marcadas como <code>FetchType.LAZY</code> fuera del contexto transaccional provoca excepciones <code>LazyInitializationException</code> si la vista o el serializador intentan resolver el proxy.<br /><br />
                  <strong>En hexagonal:</strong> Los mappers de persistencia materializan el estado completo necesario en objetos de dominio antes de abandonar el adaptador, evitando proxies residuales en capas superiores.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                  4. Jerarquía de Validación (Entrada vs. Dominio)
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <strong>Validación de transporte:</strong> Restricciones estructurales (formato, obligatoriedad, tamaños) verificadas con Bean Validation (<code>@Valid</code>) en los DTOs del controlador web.<br /><br />
                  <strong>Validación de invariantes:</strong> Coherencia de negocio (disponibilidad de ejemplares, unicidad) garantizada directamente en los métodos del modelo de dominio, independientemente del canal de acceso.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CRITERIOS DE SELECCIÓN Y TRADE-OFFS                                    */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-title)', margin: '0 0 0.35rem 0' }}>
                Criterios de Selección y Evaluación de Compensaciones (Trade-offs)
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.55, fontSize: '0.88rem', margin: 0 }}>
                La elección entre una arquitectura en capas y una arquitectura hexagonal responde a requisitos de mantenibilidad, ciclo de vida del producto y complejidad del dominio:
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-hover)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 0.9rem', color: 'var(--text-title)' }}>Criterio</th>
                    <th style={{ padding: '0.75rem 0.9rem', color: 'var(--text-title)' }}>Arquitectura en Capas</th>
                    <th style={{ padding: '0.75rem 0.9rem', color: 'var(--text-title)' }}>Arquitectura Hexagonal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 0.9rem', fontWeight: 600 }}>Velocidad inicial de entrega</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Elevada (menor número de clases y transformaciones)</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Moderada (exige puertos, adaptadores y mappers adicionales)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 0.9rem', fontWeight: 600 }}>Adecuación a lógica compleja (DDD)</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Baja (tiende a acumular reglas procedimentales en servicios)</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Elevada (fomenta agregados ricos e invariantes protegidos)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 0.9rem', fontWeight: 600 }}>Coste cognitivo del equipo</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Reducido (patrón estándar en la industria y documentación)</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Moderado (requiere disciplina estricta en límites de paquete)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 0.9rem', fontWeight: 600 }}>Aislamiento en pruebas unitarias</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Dependiente de librerías de emulación (Mockito)</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Independiente (permite testing puro de modelos sin framework)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 0.9rem', fontWeight: 600 }}>Independencia de infraestructura</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Baja (el dominio hereda anotaciones del motor ORM)</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Alta (el motor de persistencia puede sustituirse sin alterar negocio)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 0.9rem', fontWeight: 600 }}>Evolución a largo plazo</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Adecuada para aplicaciones CRUD de alcance acotado</td>
                    <td style={{ padding: '0.75rem 0.9rem' }}>Recomendada para sistemas centrales con mantenimiento prolongado</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.85rem', marginTop: '0.5rem' }}>
              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  Escenarios recomendados para Arquitectura en Capas:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  • Proyectos formativos, pruebas técnicas o entregas con plazos restringidos.<br />
                  • Aplicaciones donde la mayoría de operaciones son lecturas y escrituras directas sobre base de datos.<br />
                  • Prototipos o servicios cuya lógica no justifica la sobrecarga de múltiples representaciones de datos.
                </div>
              </div>

              <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                  Escenarios recomendados para Arquitectura Hexagonal:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  • Módulos centrales (core domain) con reglas complejas y alta frecuencia de cambio funcional.<br />
                  • Sistemas que requieren múltiples adaptadores de entrada (API REST, colas de mensajería, tareas batch).<br />
                  • Aplicaciones con pipelines CI/CD exigentes donde la velocidad de los tests unitarios es crítica.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
