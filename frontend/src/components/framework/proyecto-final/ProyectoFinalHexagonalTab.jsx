import React, { useState } from 'react';

/**
 * ============================================================================
 * @component   ProyectoFinalHexagonalTab
 * @description Módulo interactivo exhaustivo sobre la Arquitectura Hexagonal
 *              (Puertos y Adaptadores) aplicada al proyecto Library API REST.
 *              Compara la versión tradicional entregada con la evolución
 *              hexagonal, desglosando las 7 diferencias clave, dominio puro,
 *              puertos in/out, adaptadores web y persistencia, y la suite de 25 tests.
 * ============================================================================
 */
export default function ProyectoFinalHexagonalTab({ initialSection = 'overview', onNavigateToTab }) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [activeDifference, setActiveDifference] = useState(1);
  const [activeCodeTab, setActiveCodeTab] = useState('domain');
  const [copiedKey, setCopiedKey] = useState(null);

  // Sincronizar si cambia la prop
  React.useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const copyCode = (code, key) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Las 7 Grandes Diferencias Tradicional vs Hexagonal
  const DIFFERENCES = [
    {
      id: 1,
      title: 'Inversión de Dependencias',
      subtitle: 'Dirección de las flechas hacia el Dominio, no hacia la BD',
      icon: '🔄',
      color: '#3b82f6',
      tradicional: {
        title: 'Tradicional (Por Capas)',
        desc: 'Las dependencias apuntan hacia abajo: Controller → Service → JpaRepository → @Entity. El negocio está acoplado a Spring Data JPA y a las tablas SQL.',
        consequence: 'Si cambias de base de datos o de ORM, tienes que reescribir servicios y modelos.',
        code: `// Tradicional: El servicio conoce directamente Spring Data JPA
@Service
public class LoanServiceImp implements LoanService {
    @Autowired
    private LoanRepository loanRepository; // Interfaz que hereda de JpaRepository
    @Autowired
    private BookRepository bookRepository;
}`
      },
      hexagonal: {
        title: 'Hexagonal (Puertos y Adaptadores)',
        desc: 'Todas las dependencias apuntan hacia el centro (domain/). El dominio define las interfaces (RepositoryPort) y es la infraestructura la que se adapta mediante BookJpaAdapter.',
        consequence: 'Si cambias MySQL por MongoDB o DynamoDB, domain/ y application/ no tocan ni una sola línea de código.',
        code: `// Hexagonal: El servicio solo conoce contratos puros del dominio (Puertos Out)
@Service
public class LoanApplicationService implements LoanUseCase {
    private final LoanRepositoryPort loanRepositoryPort; // Puerto de salida puro
    private final BookRepositoryPort bookRepositoryPort; // Cero imports de Spring Data
}`
      }
    },
    {
      id: 2,
      title: 'Separación de Modelos',
      subtitle: 'Una clase para todo vs. Dominio Puro + Entidad JPA separadas',
      icon: '✂️',
      color: '#10b981',
      tradicional: {
        title: 'Tradicional: @Entity Única',
        desc: 'La misma clase Book modela la lógica de negocio, mapea las columnas SQL con @Column, define llaves foráneas con @JoinTable y arrastra relaciones de Hibernate.',
        consequence: 'Los problemas de Lazy Loading y dependencias cíclicas de Hibernate contaminan el negocio.',
        code: `// Tradicional: Mezcla negocio y mapeo relacional en una sola clase
@Entity
@Table(name = "book")
@Getter @Setter
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "available_stock", nullable = false)
    private Integer availableStock;
    @ManyToMany
    @JoinTable(name = "book_author", ...)
    private List<Author> authors;
}`
      },
      hexagonal: {
        title: 'Hexagonal: Dos Clases Desacopladas',
        desc: 'Book en domain/model es Java puro (cero anotaciones de persistencia o Spring). BookJpaEntity en infrastructure/adapters/out/persistence se encarga únicamente del SQL.',
        consequence: 'Si eliminas Spring Boot e Hibernate del proyecto, el Dominio sigue compilando al 100%.',
        code: `// 1. Dominio puro: domain/model/Book.java (Java puro, cero frameworks)
public class Book {
    private Long id;
    private String title;
    private Integer availableStock;
    private Integer totalStock;
    // Lógica rica: borrowCopy(), returnCopy(), validateStockConsistency()
}

// 2. Entidad de BD: infrastructure/.../entity/BookJpaEntity.java
@Entity @Table(name = "books")
public class BookJpaEntity { ... }`
      }
    },
    {
      id: 3,
      title: 'Modelo Anémico vs. Dominio Rico',
      subtitle: 'Entidades pasivas vs. Invariantes protegidos en el objeto',
      icon: '🧠',
      color: '#8b5cf6',
      tradicional: {
        title: 'Tradicional: Modelo Anémico',
        desc: 'Las entidades solo tienen getters y setters públicos. La lógica de negocio (descontar stock, validar coherencia, calcular OVERDUE) está repartida entre Services y Mappers.',
        consequence: 'Cualquier parte del código puede hacer setAvailableStock(-5) sin que la entidad se queje.',
        code: `// Tradicional: La lógica de stock está dispersa en el servicio
if (book.getAvailableStock() == null || book.getAvailableStock() <= 0) {
    throw new BusinessRuleException("No hay stock disponible");
}
book.setAvailableStock(book.getAvailableStock() - 1);
bookRepository.save(book);`
      },
      hexagonal: {
        title: 'Hexagonal: Dominio Rico con Invariantes',
        desc: 'Los métodos mutadores tienen nombres de negocio (borrowCopy(), returnCopy()). El objeto de dominio se protege a sí mismo validando sus reglas internas.',
        consequence: 'Imposible dejar el sistema en un estado inconsistente desde cualquier canal (REST, Batch, CLI).',
        code: `// Hexagonal: Book protege sus invariantes internamente
public void borrowCopy() {
    if (this.availableStock == null || this.availableStock <= 0) {
        throw new BusinessRuleException("No hay ejemplares disponibles para préstamo");
    }
    this.availableStock--;
}

public LoanStatus getEffectiveStatus() {
    if (this.status == LoanStatus.ACTIVE && this.expectedReturnDate.isBefore(LocalDate.now())) {
        return LoanStatus.OVERDUE;
    }
    return this.status;
}`
      }
    },
    {
      id: 4,
      title: 'Contratos de Casos de Uso',
      subtitle: 'Servicios acoplados a DTOs/Spring vs. Contratos agnósticos',
      icon: '🔌',
      color: '#f59e0b',
      tradicional: {
        title: 'Tradicional: Acoplado a la Web y Spring',
        desc: 'LoanService recibe LoanRequestDto y devuelve LoanResponseDto. BookService devuelve Page<BookResponseDto> de org.springframework.data.',
        consequence: 'El núcleo de negocio depende de la capa web y de librerías externas de paginación.',
        code: `// Tradicional: El contrato del servicio usa DTOs web y tipos de Spring Data
public interface BookService {
    Page<BookResponseDto> findAll(Pageable pageable, Long categoryId, Long authorId);
    BookResponseDto createBook(BookRequestDto request);
}`
      },
      hexagonal: {
        title: 'Hexagonal: Puertos de Entrada con Tipos de Dominio',
        desc: 'BookUseCase en domain/port/in solo habla en términos de Book y PageResult<T> (un contenedor agnóstico propio de dominio).',
        consequence: 'Puedes invocar el caso de uso desde un endpoint REST, una prueba unitaria o un consumidor RabbitMQ sin tocar DTOs.',
        code: `// Hexagonal: domain/port/in/BookUseCase.java (100% independiente)
public interface BookUseCase {
    PageResult<Book> findAll(int page, int size, String sort, Long categoryId, Long authorId, Boolean available);
    Book createBook(Book book, Long categoryId, List<Long> authorIds);
}`
      }
    },
    {
      id: 5,
      title: 'Estrategia de Mappers',
      subtitle: 'Un solo mapper directo vs. Mappers separados por frontera',
      icon: '🗺️',
      color: '#ec4899',
      tradicional: {
        title: 'Tradicional: Mapper Directo Entity ↔ DTO',
        desc: 'BookMapper traduce directamente entre la @Entity de JPA y el DTO de la API REST. Mezcla los campos de base de datos con los contratos JSON.',
        consequence: 'Cambiar el nombre de una columna SQL puede romper silenciosamente la API REST o viceversa.',
        code: `// Tradicional: BookMapper traduce @Entity JPA <-> DTO Web directamente
public static BookResponseDto toDto(Book book) {
    BookResponseDto dto = new BookResponseDto();
    dto.setId(book.getId());
    // Mapeo directo de entidades relacionales a JSON
    return dto;
}`
      },
      hexagonal: {
        title: 'Hexagonal: Dos Fronteras Aisladas',
        desc: '1. WebMapper traduce DTO HTTP ↔ Modelo de Dominio.\n2. PersistenceMapper traduce Modelo de Dominio ↔ JpaEntity de base de datos.',
        consequence: 'Aislamiento total: la base de datos y la API HTTP pueden evolucionar de forma 100% independiente.',
        code: `// Frontera 1 (Web): BookWebMapper
Book toDomain(BookRequestDto dto);
BookResponseDto toDto(Book book);

// Frontera 2 (Persistencia): BookPersistenceMapper
BookJpaEntity toJpaEntity(Book domain);
Book toDomain(BookJpaEntity entity);`
      }
    },
    {
      id: 6,
      title: 'Manejo de Excepciones y Cargas',
      subtitle: 'Excepciones acopladas a HTTP vs. Excepciones puras de negocio',
      icon: '🚨',
      color: '#ef4444',
      tradicional: {
        title: 'Tradicional: @ResponseStatus en el Dominio',
        desc: 'ResourceNotFoundException llevaba @ResponseStatus(HttpStatus.NOT_FOUND), arrastrando dependencias de Spring Web al negocio. Las comprobaciones de borrado navegaban listas @OneToMany de Hibernate arriesgando LazyInitializationException.',
        consequence: 'El negocio sabe qué es HTTP y depende de la sesión de Hibernate para validar reglas.',
        code: `// Tradicional: Anotación de Spring Web en la excepción
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException { ... }`
      },
      hexagonal: {
        title: 'Hexagonal: Excepciones Puras y Puertos Explícitos',
        desc: 'Las excepciones en domain/exception son RuntimeException puras de Java. Solo GlobalExceptionHandler en el adaptador web las traduce a códigos HTTP (400, 404, 409). Las comprobaciones se hacen con puertos booleanos explícitos (existsByBookId).',
        consequence: 'Cero sorpresas de LazyInitializationException y excepciones utilizables en cualquier entorno.',
        code: `// Hexagonal: domain/exception/ResourceNotFoundException.java (Java puro)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) { super(message); }
}
// El adaptador web GlobalExceptionHandler se encarga del código HTTP`
      }
    },
    {
      id: 7,
      title: 'Estrategia y Pirámide de Testing',
      subtitle: 'Tests lentos con contexto Spring vs. Tests unitarios en milisegundos',
      icon: '⚡',
      color: '#06b6d4',
      tradicional: {
        title: 'Tradicional: Tests pesados con Mocks',
        desc: 'Para probar una regla de negocio (como el cálculo de stock o el estado OVERDUE) era necesario levantar @SpringBootTest o mockear repositorios de Spring Data y mappers.',
        consequence: 'La suite de pruebas tarda más en ejecutarse y es más frágil ante cambios de infraestructura.',
        code: `// Tradicional: Requiere Mockito para simular repositorios de Spring Data
@ExtendWith(MockitoExtension.class)
public class LoanServiceTest {
    @Mock private LoanRepository loanRepository;
    @Mock private BookRepository bookRepository;
    // ...
}`
      },
      hexagonal: {
        title: 'Hexagonal: Pirámide de 25 Tests Desacoplados',
        desc: '1. Tests de Dominio puros (BookDomainTest, LoanDomainTest): Java puro, 0 Spring, 0 mocks, ejecutan en < 10 ms.\n2. Tests de Aplicación: Mockito sobre interfaces de puerto puras.\n3. Tests de Infraestructura: MockMvc y Spring Security solo donde corresponde.',
        consequence: 'Feedback instantáneo en desarrollo y pruebas verdaderamente unitarias de la lógica de negocio.',
        code: `// Hexagonal: BookDomainTest.java (Java puro sin Spring ni Mockito)
@Test
void borrowCopy_whenAvailableStockPositive_shouldDecrement() {
    Book book = Book.builder().availableStock(3).totalStock(5).build();
    book.borrowCopy();
    assertEquals(2, book.getAvailableStock()); // ¡Ejecución en 2 milisegundos!
}`
      }
    }
  ];

  const currentDiff = DIFFERENCES.find(d => d.id === activeDifference) || DIFFERENCES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* HERO BANNER DE ARQUITECTURA HEXAGONAL */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.14) 0%, rgba(99, 102, 241, 0.05) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        borderRadius: '24px',
        padding: '2rem 2.2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          right: '-20px',
          top: '-20px',
          fontSize: '10rem',
          opacity: 0.05,
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          ⬢
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{
            background: '#8b5cf6',
            color: '#ffffff',
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            letterSpacing: '0.6px'
          }}>
            Evolución Arquitectónica · Accenture
          </span>
          <span style={{
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#3b82f6',
            fontSize: '0.74rem',
            fontWeight: 750,
            padding: '0.25rem 0.65rem',
            borderRadius: '999px'
          }}>
            Ports & Adapters (Alistair Cockburn)
          </span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            fontSize: '0.74rem',
            fontWeight: 750,
            padding: '0.25rem 0.65rem',
            borderRadius: '999px'
          }}>
            25 Tests Desacoplados
          </span>
        </div>

        <h2 style={{ fontSize: '1.85rem', fontWeight: 850, margin: '0 0 0.5rem 0', color: 'var(--text-title)' }}>
          ⬢ Arquitectura Hexagonal: Library API REST
        </h2>
        <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '900px' }}>
          La adaptación a <strong>Arquitectura Hexagonal (Puertos y Adaptadores)</strong> traslada el foco desde la base de datos hacia el corazón del negocio. Las reglas de préstamo y control de stock están encapsuladas en objetos de dominio puros en Java (libres de Spring e Hibernate), comunicándose con el exterior a través de <strong>Puertos de Entrada (`UseCase`)</strong> y <strong>Puertos de Salida (`RepositoryPort`)</strong>.
        </p>

        {/* ACCIONES RÁPIDAS DEL BANNER */}
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
          <a
            href="/java-studio/proyectos/libreria-hexagonal/index-secure.html"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#8b5cf6',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              fontWeight: 750,
              textDecoration: 'none',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)'
            }}
          >
            <span>🌐</span> Probar SPA Hexagonal en Vivo ↗
          </a>
          <button
            type="button"
            onClick={() => setActiveSection('differences')}
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-title)',
              border: '1px solid var(--border-subtle)',
              padding: '0.65rem 1.15rem',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>⚖️</span> Ver las 7 Diferencias Clave
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('flow')}
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              padding: '0.65rem 1.15rem',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🌊</span> Trazabilidad de una Petición
          </button>
        </div>
      </div>

      {/* SELECTOR DE SUBSECCIONES HEXAGONAL */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {[
          { id: 'overview', label: '1. Fundamentos', icon: '⬢' },
          { id: 'differences', label: '2. Las 7 Diferencias', icon: '⚖️' },
          { id: 'domain', label: '3. Dominio Puro', icon: '🧠' },
          { id: 'ports', label: '4. Puertos In/Out', icon: '🔌' },
          { id: 'adapters', label: '5. Adaptadores', icon: '🧩' },
          { id: 'flow', label: '6. Trazabilidad Flujo', icon: '🌊' },
          { id: 'tests', label: '7. Suite 25 Tests', icon: '🧪' },
          { id: 'mapping', label: '8. Mapeo Paquetes', icon: '📁' },
          { id: 'simulator', label: '9. Simulador SPA', icon: '🌐' }
        ].map(tab => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              style={{
                border: 'none',
                background: isActive ? '#8b5cf6' : 'var(--bg-hover)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                padding: '0.55rem 0.95rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECCIÓN 1: FUNDAMENTOS & FILOSOFÍA HEXAGONAL */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              ¿Qué es la Arquitectura Hexagonal y por qué es superior aquí?
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Propuesta por <strong>Alistair Cockburn</strong> en 2005, la Arquitectura Hexagonal parte de un principio fundamental de la ingeniería de software:
            </p>
            <blockquote style={{
              margin: '0.5rem 0',
              padding: '1rem 1.4rem',
              background: 'rgba(139, 92, 246, 0.08)',
              borderLeft: '4px solid #8b5cf6',
              borderRadius: '0 12px 12px 0',
              fontSize: '0.98rem',
              fontStyle: 'italic',
              color: 'var(--text-title)'
            }}>
              "El corazón de tu aplicación (las reglas de negocio) no debe saber ni depender de qué base de datos usas, qué framework web utilizas ni qué formato viaja por la red."
            </blockquote>

            {/* ESQUEMA VISUAL EN 3 BLOQUES */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '0.8rem' }}>
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '16px',
                padding: '1.4rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>⬅️</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#3b82f6' }}>
                    Adaptadores Primarios (In)
                  </h4>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.6rem' }}>
                  "Quien llama a la aplicación"
                </span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Controladores REST (`BookController`, `LoanController`), validaciones Bean Validation (`@ValidStock`), Swagger UI y seguridad JWT. Hablan con el centro mediante <strong>Puertos de Entrada (`*UseCase`)</strong>.
                </p>
              </div>

              <div style={{
                background: 'rgba(139, 92, 246, 0.08)',
                border: '2px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '16px',
                padding: '1.4rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>⬢</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#8b5cf6' }}>
                    Núcleo: Dominio + Aplicación
                  </h4>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.6rem' }}>
                  "El corazón del negocio en Java puro"
                </span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Modelos con reglas (`Book.borrowCopy()`, `Loan.getEffectiveStatus()`), contratos de casos de uso (`BookUseCase`) y coordinadores (`LoanApplicationService`). <strong>Cero imports de Hibernate, Spring Data o Web</strong>.
                </p>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '16px',
                padding: '1.4rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>➡️</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#10b981' }}>
                    Adaptadores Secundarios (Out)
                  </h4>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.6rem' }}>
                  "A quien llama la aplicación"
                </span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  MySQL 8 / H2 con Spring Data JPA, `BookJpaEntity`, mappers de persistencia y consultas SQL. Implementan los <strong>Puertos de Salida (`*RepositoryPort`)</strong> definidos por el dominio.
                </p>
              </div>
            </div>
          </div>

          {/* CUÁNDO COMPENSA HEXAGONAL VS CUÁNDO USAR TRADICIONAL */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
              Trade-offs Reales: ¿Cuándo conviene cada arquitectura?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
              <div style={{ background: 'var(--bg-hover)', padding: '1.4rem', borderRadius: '14px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6', fontWeight: 800 }}>
                  🏛️ Arquitectura Tradicional (Por Capas)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <li><strong>Ideal para:</strong> Proyectos pequeños, prototipos rápidos o CRUDs directos donde las tablas y la API son casi idénticas.</li>
                  <li><strong>Ventaja:</strong> Menos archivos iniciales (1 sola clase `@Entity`, 1 solo `Mapper`).</li>
                  <li><strong>Desventaja:</strong> Tiende al <em>modelo anémico</em> y acopla el negocio a la base de datos y al framework web.</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.4rem', borderRadius: '14px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#8b5cf6', fontWeight: 800 }}>
                  ⬢ Arquitectura Hexagonal (Ports & Adapters)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <li><strong>Ideal para:</strong> Aplicaciones empresariales con reglas de negocio ricas (stock dinámico, fechas de préstamo, estados calculados).</li>
                  <li><strong>Ventaja:</strong> Tests de dominio a velocidad de vértigo (&lt; 5 ms), independencia tecnológica y longevidad del código.</li>
                  <li><strong>Desventaja:</strong> Mayor coste inicial de archivos y mappers por cada frontera (Web ↔ Dominio ↔ Persistencia).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: LAS 7 GRANDES DIFERENCIAS (COMPARADOR INTERACTIVO) */}
      {activeSection === 'differences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* BOTONERA DE LAS 7 DIFERENCIAS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {DIFFERENCES.map(diff => {
              const isSelected = diff.id === activeDifference;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setActiveDifference(diff.id)}
                  style={{
                    background: isSelected ? `${diff.color}18` : 'var(--bg-card)',
                    border: isSelected ? `2px solid ${diff.color}` : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '0.9rem 1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    fontSize: '1.3rem',
                    background: isSelected ? diff.color : 'var(--bg-hover)',
                    color: isSelected ? '#fff' : 'var(--text-title)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {diff.icon}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800, color: diff.color }}>
                      Clave #{diff.id}
                    </div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 750, color: 'var(--text-title)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {diff.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* DETALLE COMPARATIVO DE LA DIFERENCIA SELECCIONADA */}
          <div style={{
            background: 'var(--bg-card)',
            border: `1px solid ${currentDiff.color}40`,
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: currentDiff.color, letterSpacing: '0.5px' }}>
                  Diferencia #{currentDiff.id} de 7
                </span>
                <h3 style={{ margin: '0.2rem 0', fontSize: '1.45rem', fontWeight: 850, color: 'var(--text-title)' }}>
                  {currentDiff.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  {currentDiff.subtitle}
                </p>
              </div>
            </div>

            {/* COMPARADOR CARA A CARA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.4rem' }}>
              
              {/* LADO TRADICIONAL */}
              <div style={{
                background: 'var(--bg-hover)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ background: '#64748b', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                    ENTREGADO
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    {currentDiff.tradicional.title}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {currentDiff.tradicional.desc}
                </p>
                <div style={{ fontSize: '0.78rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.08)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                  ⚠️ <strong>Limitación:</strong> {currentDiff.tradicional.consequence}
                </div>
                <div style={{ position: 'relative', marginTop: 'auto' }}>
                  <pre style={{
                    margin: 0,
                    background: '#0d1117',
                    color: '#c9d1d9',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    lineHeight: 1.45
                  }}>
                    {currentDiff.tradicional.code}
                  </pre>
                </div>
              </div>

              {/* LADO HEXAGONAL */}
              <div style={{
                background: `${currentDiff.color}08`,
                border: `2px solid ${currentDiff.color}35`,
                borderRadius: '16px',
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ background: currentDiff.color, color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                    EVOLUCIÓN
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: currentDiff.color }}>
                    {currentDiff.hexagonal.title}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {currentDiff.hexagonal.desc}
                </p>
                <div style={{ fontSize: '0.78rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                  ✨ <strong>Ventaja Práctica:</strong> {currentDiff.hexagonal.consequence}
                </div>
                <div style={{ position: 'relative', marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => copyCode(currentDiff.hexagonal.code, `hex-diff-${currentDiff.id}`)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '8px',
                      background: 'rgba(255,255,255,0.15)',
                      border: 'none',
                      color: '#fff',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedKey === `hex-diff-${currentDiff.id}` ? '✓ Copiado' : 'Copiar'}
                  </button>
                  <pre style={{
                    margin: 0,
                    background: '#0d1117',
                    color: '#c9d1d9',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    lineHeight: 1.45
                  }}>
                    {currentDiff.hexagonal.code}
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 3: DOMINIO PURO & ENTIDADES RICAS */}
      {activeSection === 'domain' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              🧠 El Corazón: Dominio Rico Libre de Dependencias (`domain/model`)
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              En la arquitectura tradicional, una entidad suele ser un simple DTO de base de datos con getters y setters (modelo anémico). En cambio, en la versión hexagonal, las entidades de dominio <strong>protegen sus invariantes</strong> y contienen las reglas de negocio críticas:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-hover)', padding: '1.2rem', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', color: '#8b5cf6', fontSize: '0.95rem' }}>
                  `Book.borrowCopy()`
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Valida que `availableStock &gt; 0`. Si no hay stock, lanza `BusinessRuleException`. Si hay, resta 1 atómicamente.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.2rem', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', color: '#8b5cf6', fontSize: '0.95rem' }}>
                  `Book.returnCopy()`
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Impide que el stock disponible supere al stock total registrado (`availableStock &lt; totalStock`).
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.2rem', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', color: '#8b5cf6', fontSize: '0.95rem' }}>
                  `Loan.getEffectiveStatus()`
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Si el préstamo está `ACTIVE` y `expectedReturnDate &lt; LocalDate.now()`, devuelve dinámicamente `OVERDUE`. ¡Nunca se guarda en BD!
                </p>
              </div>
            </div>

            {/* CÓDIGO COMPLETO DE BOOK.JAVA */}
            <div style={{ marginTop: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#8b5cf6', fontWeight: 700 }}>
                  library/src/main/java/com/accenture/library/domain/model/Book.java
                </span>
                <button
                  type="button"
                  onClick={() => copyCode(`package com.accenture.library.domain.model;

import com.accenture.library.domain.exception.BusinessRuleException;
import java.util.ArrayList;
import java.util.List;

public class Book {
    private Long id;
    private String title;
    private String isbn;
    private Integer totalStock;
    private Integer availableStock;
    private Category category;
    private List<Author> authors = new ArrayList<>();

    public void borrowCopy() {
        if (this.availableStock == null || this.availableStock <= 0) {
            throw new BusinessRuleException("No hay stock disponible para préstamo");
        }
        this.availableStock--;
    }

    public void returnCopy() {
        if (this.availableStock >= this.totalStock) {
            throw new BusinessRuleException("El stock disponible no puede superar el total");
        }
        this.availableStock++;
    }

    public void validateStockConsistency() {
        if (this.availableStock != null && this.totalStock != null 
            && this.availableStock > this.totalStock) {
            throw new BusinessRuleException("El stock disponible no puede ser mayor que el total");
        }
    }
}`, 'book-domain')}
                  style={{ background: 'none', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                >
                  {copiedKey === 'book-domain' ? '✓ Copiado' : 'Copiar Código'}
                </button>
              </div>
              <pre style={{
                margin: 0,
                background: '#0d1117',
                color: '#c9d1d9',
                padding: '1.2rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                overflowX: 'auto',
                fontFamily: 'monospace',
                lineHeight: 1.5
              }}>
{`// CERO imports de jakarta.persistence.* ni de Spring Framework
package com.accenture.library.domain.model;

import com.accenture.library.domain.exception.BusinessRuleException;
import java.util.ArrayList;
import java.util.List;

public class Book {
    private Long id;
    private String title;
    private String isbn;
    private Integer totalStock;
    private Integer availableStock;
    private Category category;
    private List<Author> authors = new ArrayList<>();

    // Invariante de negocio: prestar ejemplar
    public void borrowCopy() {
        if (this.availableStock == null || this.availableStock <= 0) {
            throw new BusinessRuleException("No hay ejemplares disponibles para prestar");
        }
        this.availableStock--;
    }

    // Invariante de negocio: devolver ejemplar
    public void returnCopy() {
        if (this.availableStock >= this.totalStock) {
            throw new BusinessRuleException("El stock disponible no puede superar al stock total");
        }
        this.availableStock++;
    }

    // Invariante de consistencia de stock
    public void validateStockConsistency() {
        if (this.availableStock != null && this.totalStock != null 
            && this.availableStock > this.totalStock) {
            throw new BusinessRuleException("Inconsistencia: availableStock > totalStock");
        }
    }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 4: PUERTOS DE ENTRADA Y SALIDA */}
      {activeSection === 'ports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              🔌 Puertos: Los Contratos Sagrados del Dominio (`domain/port`)
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Un <strong>Puerto</strong> es una interfaz Java pura mediante la cual el dominio define qué operaciones ofrece al exterior (Puertos de Entrada) y qué servicios necesita del exterior (Puertos de Salida).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.4rem' }}>
              
              {/* PUERTOS DE ENTRADA */}
              <div style={{ background: 'var(--bg-hover)', borderRadius: '16px', padding: '1.4rem', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>📥</span>
                  <h4 style={{ margin: 0, color: '#3b82f6', fontWeight: 800, fontSize: '1.05rem' }}>
                    Puertos de Entrada (`domain/port/in/`)
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                  Definen los <strong>Casos de Uso</strong> de la aplicación. Son implementados por los servicios en `application/service/` y consumidos por los controladores web.
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <li><code>BookUseCase.java</code> (crear, actualizar, filtrar libros con PageResult)</li>
                  <li><code>LoanUseCase.java</code> (createLoan, returnLoan, findByStatus)</li>
                  <li><code>AuthorUseCase.java</code> (CRUD de autores)</li>
                  <li><code>CategoryUseCase.java</code> (CRUD de categorías)</li>
                </ul>
              </div>

              {/* PUERTOS DE SALIDA */}
              <div style={{ background: 'var(--bg-hover)', borderRadius: '16px', padding: '1.4rem', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>📤</span>
                  <h4 style={{ margin: 0, color: '#10b981', fontWeight: 800, fontSize: '1.05rem' }}>
                    Puertos de Salida (`domain/port/out/`)
                  </h4>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                  Definen qué necesita el dominio para persistir o consultar datos. <strong>El dominio impone el contrato</strong> y la persistencia (`JpaAdapter`) se adapta a él.
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <li><code>BookRepositoryPort.java</code> (save, findById, delete, existsByCategoryId)</li>
                  <li><code>LoanRepositoryPort.java</code> (save, findById, findByStatus, existsByBookId)</li>
                  <li><code>AuthorRepositoryPort.java</code> (save, findById, findAll)</li>
                  <li><code>CategoryRepositoryPort.java</code> (save, findById, existsByName)</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 5: ADAPTADORES WEB Y PERSISTENCIA */}
      {activeSection === 'adapters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              🧩 Adaptadores: El Puente con el Mundo Real (`infrastructure/adapters`)
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Los adaptadores envuelven la tecnología concreta (HTTP/REST y SQL/JPA) para que el núcleo de la aplicación nunca se manche con dependencias externas.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              
              {/* ADAPTADOR WEB */}
              <div style={{ background: 'var(--bg-hover)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                <span style={{ background: '#3b82f6', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                  PRIMARIO (IN)
                </span>
                <h4 style={{ margin: '0.6rem 0 0.3rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Adaptador Web (`in/web`)
                </h4>
                <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Recibe HTTP JSON, valida sintaxis (@ValidStock, @ValidLoanDates), autentica con JWT y delega en el puerto de entrada.
                </p>
                <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  • <code>BookController.java</code> (Endpoints REST)<br />
                  • <code>BookWebMapper.java</code> (DTO &harr; Dominio)<br />
                  • <code>GlobalExceptionHandler.java</code> (Mapeo a 400/404/409)<br />
                  • <code>StockValidator.java</code> (Validación Bean Validation)
                </div>
              </div>

              {/* ADAPTADOR PERSISTENCIA */}
              <div style={{ background: 'var(--bg-hover)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                <span style={{ background: '#10b981', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                  SECUNDARIO (OUT)
                </span>
                <h4 style={{ margin: '0.6rem 0 0.3rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Adaptador Persistencia (`out/persistence`)
                </h4>
                <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Implementa `BookRepositoryPort`. Convierte el `Book` de dominio a `BookJpaEntity`, habla con Hibernate y persiste en MySQL.
                </p>
                <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  • <code>BookJpaAdapter.java</code> (Implementa el Puerto)<br />
                  • <code>BookJpaEntity.java</code> (@Entity, @Table, @Column)<br />
                  • <code>SpringDataBookRepository.java</code> (JpaRepository de Spring)<br />
                  • <code>BookPersistenceMapper.java</code> (Dominio &harr; Entity)
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 6: TRAZABILIDAD DE UNA PETICIÓN (END-TO-END) */}
      {activeSection === 'flow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 850, color: 'var(--text-title)' }}>
              🌊 Trazabilidad Paso a Paso: Flujo de "Crear Préstamo" (`POST /api/loans`)
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Cuando un usuario pulsa <strong>"Prestar Libro"</strong> en la web, los datos viajan cruzando cada frontera de la arquitectura hexagonal de forma totalmente desacoplada:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  step: 1,
                  layer: 'Adaptador Web (In)',
                  component: 'LoanController.java',
                  action: 'Recibe HTTP POST con LoanRequestDto, valida formato ISO y rango de fechas con @ValidLoanDates, y llama a loanUseCase.createLoan(...)',
                  color: '#3b82f6'
                },
                {
                  step: 2,
                  layer: 'Aplicación (Orquestación)',
                  component: 'LoanApplicationService.java',
                  action: 'Pide el libro al puerto de salida: bookRepositoryPort.findById(bookId). No conoce SQL ni JPA.',
                  color: '#8b5cf6'
                },
                {
                  step: 3,
                  layer: 'Adaptador Persistencia (Out)',
                  component: 'BookJpaAdapter.java + BookPersistenceMapper.java',
                  action: 'Consulta SpringDataBookRepository, obtiene BookJpaEntity y lo transforma a un Book de dominio puro.',
                  color: '#10b981'
                },
                {
                  step: 4,
                  layer: 'Núcleo de Dominio',
                  component: 'Book.java & Loan.java',
                  action: 'book.borrowCopy() comprueba que availableStock > 0 y descuenta 1. Loan.createActive(...) valida la fecha esperada y crea el préstamo ACTIVE.',
                  color: '#f59e0b'
                },
                {
                  step: 5,
                  layer: 'Adaptador Persistencia (Out)',
                  component: 'BookJpaAdapter.java & LoanJpaAdapter.java',
                  action: 'Transforman los modelos de dominio a JpaEntities y ejecutan UPDATE books / INSERT INTO loans en la base de datos MySQL.',
                  color: '#10b981'
                },
                {
                  step: 6,
                  layer: 'Adaptador Web de Respuesta',
                  component: 'LoanWebMapper.java & LoanController.java',
                  action: 'Transforma el Loan de dominio a LoanResponseDto, calculando getEffectiveStatus() y responde HTTP 201 Created con cabecera Location.',
                  color: '#3b82f6'
                }
              ].map(f => (
                <div key={f.step} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  background: 'var(--bg-hover)',
                  padding: '1.2rem',
                  borderRadius: '14px',
                  borderLeft: `4px solid ${f.color}`
                }}>
                  <span style={{
                    background: f.color,
                    color: '#fff',
                    fontWeight: 900,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.9rem'
                  }}>
                    {f.step}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: f.color }}>
                        {f.layer}
                      </span>
                      <code style={{ fontSize: '0.78rem', background: 'rgba(0,0,0,0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {f.component}
                      </code>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-title)', lineHeight: 1.5 }}>
                      {f.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 7: SUITE DE 25 TESTS Y PIRÁMIDE DESACOPLADA */}
      {activeSection === 'tests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 850, color: 'var(--text-title)' }}>
                  🧪 Suite de 25 Tests Automatizados (Pirámide Hexagonal)
                </h3>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  La suite de pruebas refleja perfectamente la separación arquitectónica.
                </p>
              </div>
              <span style={{
                background: '#10b981',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 800,
                padding: '0.35rem 0.8rem',
                borderRadius: '8px'
              }}>
                25 / 25 Passing (100%)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
              
              <div style={{ background: 'var(--bg-hover)', padding: '1.4rem', borderRadius: '14px', borderTop: '4px solid #8b5cf6' }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: '#8b5cf6' }}>NIVEL 1 · CERO FRAMEWORKS</span>
                <h4 style={{ margin: '0.3rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>Tests de Dominio Puros (7)</h4>
                <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  `BookDomainTest` (4) y `LoanDomainTest` (3). Java puro sin Spring ni Mockito. Ejecutan en &lt; 10 ms.
                </p>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>⚡ Tiempo de ejecución: ~5 ms</div>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.4rem', borderRadius: '14px', borderTop: '4px solid #3b82f6' }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: '#3b82f6' }}>NIVEL 2 · PUERTOS MOCKEADOS</span>
                <h4 style={{ margin: '0.3rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>Tests de Aplicación (5)</h4>
                <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  `LoanApplicationServiceTest` (5). Mockito sobre `LoanRepositoryPort` y `BookRepositoryPort`.
                </p>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>⚡ Tiempo de ejecución: ~120 ms</div>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.4rem', borderRadius: '14px', borderTop: '4px solid #10b981' }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: '#10b981' }}>NIVEL 3 · ADAPTADORES REALES</span>
                <h4 style={{ margin: '0.3rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>Tests de Infraestructura (13)</h4>
                <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  `BookControllerTest` (8), `StockValidatorTest` (2), `JwtServiceTest` (2), `ContextLoad` (1).
                </p>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>⚡ Tiempo de ejecución: ~1.2 s</div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 8: MAPEO DE PAQUETES TRADICIONAL -> HEXAGONAL */}
      {activeSection === 'mapping' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 850, color: 'var(--text-title)' }}>
              📁 Mapeo de Paquetes: De Tradicional a Hexagonal
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Compara dónde residía cada concepto en el proyecto entregado y cuál es su destino limpio en la arquitectura hexagonal:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-title)' }}>
                    <th style={{ padding: '0.8rem 1rem' }}>Paquete Tradicional</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Paquete Hexagonal</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Motivo de la Separación</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { trad: 'model/ (única clase @Entity)', hex: 'domain/model/ (Java puro)\ninfrastructure/out/persistence/entity/ (*JpaEntity)', why: 'Desacoplar el negocio de las anotaciones relacionales de Hibernate' },
                    { trad: 'service/ (interfaces + *ServiceImp)', hex: 'domain/port/in/ (*UseCase)\napplication/service/ (*ApplicationService)', why: 'Los contratos de negocio ya no usan DTOs web ni Page<T> de Spring Data' },
                    { trad: 'repository/ (JpaRepository)', hex: 'domain/port/out/ (*RepositoryPort)\ninfrastructure/out/persistence/adapter/ (*JpaAdapter)', why: 'Inversión de Dependencias: el dominio define qué necesita persistir' },
                    { trad: 'dto/', hex: 'infrastructure/in/web/dto/', why: 'Los DTOs HTTP son detalles del canal Web, no del negocio' },
                    { trad: 'mapper/ (1 solo mapper directo)', hex: 'infrastructure/in/web/mapper/ (*WebMapper)\ninfrastructure/out/persistence/mapper/ (*PersistenceMapper)', why: 'Separar la frontera HTTP ↔ Dominio de la frontera Dominio ↔ Base de datos' },
                    { trad: 'controller/', hex: 'infrastructure/in/web/controller/', why: 'Los controladores actúan como adaptadores primarios delgados' },
                    { trad: 'exception/ (con @ResponseStatus)', hex: 'domain/exception/ (Java puro)\ninfrastructure/in/web/exception/ (GlobalExceptionHandler)', why: 'Las excepciones de negocio no deben arrastrar códigos de estado HTTP' },
                    { trad: 'validation/ (@ValidStock)', hex: 'infrastructure/in/web/validation/', why: 'Jakarta Bean Validation pertenece a la entrada HTTP; el dominio se valida en Java puro' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.8rem 1rem', fontFamily: 'monospace', color: '#64748b' }}>
                        {row.trad}
                      </td>
                      <td style={{ padding: '0.8rem 1rem', fontFamily: 'monospace', color: '#8b5cf6', whiteSpace: 'pre-line' }}>
                        {row.hex}
                      </td>
                      <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)' }}>
                        {row.why}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 9: SIMULADOR WEB HEXAGONAL EN VIVO */}
      {activeSection === 'simulator' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.04) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '20px',
            padding: '1.8rem 2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🌐</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 850, margin: 0, color: 'var(--text-title)' }}>
                    Simulador SPA Hexagonal en Vivo (index-secure.html)
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  Frontal Web interactivo con selectores múltiples de autores, filtros dinámicos y consumo de la API Hexagonal.
                </p>
              </div>
              <a
                href="/java-studio/proyectos/libreria-hexagonal/index-secure.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#8b5cf6',
                  color: '#ffffff',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 750,
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.35)'
                }}
              >
                Abrir en Nueva Pestaña ↗
              </a>
            </div>

            <div style={{
              marginTop: '1.2rem',
              display: 'flex',
              gap: '1.2rem',
              flexWrap: 'wrap',
              background: 'var(--bg-card)',
              padding: '0.9rem 1.2rem',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.84rem'
            }}>
              <div><strong>Admin:</strong> <code>admin</code> / <code>admin123</code> (ROLE_ADMIN)</div>
              <div><strong>User:</strong> <code>user</code> / <code>user123</code> (ROLE_USER)</div>
              <div><strong>API REST:</strong> Puerto 8080 (H2 en memoria / MySQL)</div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 6px 24px rgba(0,0,0,0.06)'
          }}>
            <iframe
              src="/java-studio/proyectos/libreria-hexagonal/index-secure.html"
              title="Simulador de index-secure.html Hexagonal"
              style={{
                width: '100%',
                height: '750px',
                border: 'none',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

