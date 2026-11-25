/**
 * brainPillarsData.js
 * Configuración maestra de los 7 Pilares de Ingeniería de Software para Second Brain.
 * Cada pilar unifica competencias cruzadas de IOC (ENT, DESP, INT, DIGI), 
 * Accenture (Java 17 / Spring Boot 3), SEPE y TecnoFor (Python, Angular, SDD, Agentes).
 */

export const BRAIN_PILLARS_DATA = [
  {
    id: '01-core',
    slug: 'core-engineering',
    num: '01',
    code: 'PILAR-CORE',
    title: 'Core Engineering, Lógica & Algoritmia Multilenguaje',
    shortTitle: 'Core Engineering',
    badge: 'LÓGICA & POO',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
    icon: '🏛️',
    tagline: 'Dominio de tipos de datos, POO sólida, inmutabilidad y patrones de diseño en Java 17, Python 3 y PHP 8.',
    summary: 'La programación real no depende de la sintaxis puntual de un lenguaje, sino de la arquitectura mental: tipado estricto vs dinámico, estructuras de control eficientes, polimorfismo, principio de responsabilidad única (SOLID) y algoritmos deterministas.',
    hours: '110 horas unificadas',
    originCredits: [
      { name: 'IOC ENT (0487)', desc: 'Java 17, POO, diagramas de clases UML y depuración.' },
      { name: 'Accenture Core', desc: 'Java 17+, POO avanzada, Records, Streams y Lambdas.' },
      { name: 'SEPE / TecnoFor Python', desc: 'IFCD0062: 39 ejercicios resueltos, tipado y PCAP™.' },
      { name: 'SEPE PHP', desc: 'PHP 8+ orientado a objetos y tipado estricto.' }
    ],
    skills: [
      'Programación Orientada a Objetos pura y patrones SOLID',
      'Manejo de colecciones: Listas, Conjuntos, Mapas y Diccionarios',
      'Tratamiento de fechas (datetime / java.time) y localización',
      'Manejo robusto de excepciones (try / catch / finally)',
      'Algoritmia: Búsqueda, ordenación y optimización de memoria'
    ],
    labs: [
      {
        id: 'lab1-poo-comparada',
        num: 1,
        title: 'Laboratorio 1: Jerarquía de Clases y Polimorfismo Comparado (Java vs Python)',
        points: '2.5 pts',
        difficulty: 'Intermedio',
        desc: 'Modelado e implementación de un sistema de facturación y entidades corporativas con clases abstractas, interfaces en Java y métodos dunder / polimorfismo en Python.',
        checklist: [
          'Definición de contrato base con interfaz / clase abstracta',
          'Encapsulación estricta con modificadores de acceso y getters/setters',
          'Sobreescritura de métodos (Override) y polimorfismo en tiempo de ejecución',
          'Implementación de tests unitarios básicos comprobando cálculos'
        ],
        codeSnippet: {
          lang: 'python',
          filename: 'facturacion_polimorfica.py',
          code: `from abc import ABC, abstractmethod
from datetime import datetime

class ComprobanteFiscal(ABC):
    def __init__(self, emisor: str, cliente: str, base_imponible: float):
        self._emisor = emisor
        self._cliente = cliente
        self._base = base_imponible
        self._fecha = datetime.now()

    @abstractmethod
    def calcular_total(self) -> float:
        pass

class FacturaEstandar(ComprobanteFiscal):
    IVA = 0.21
    def calcular_total(self) -> float:
        return round(self._base * (1 + self.IVA), 2)

class FacturaExenta(ComprobanteFiscal):
    def calcular_total(self) -> float:
        return round(self._base, 2)

if __name__ == "__main__":
    f1 = FacturaEstandar("TechCorp SL", "Blanca", 1000.0)
    f2 = FacturaExenta("TechCorp SL", "Exportación UE", 1000.0)
    print(f"Total F1 (+21% IVA): {f1.calcular_total()} €")
    print(f"Total F2 (Exenta): {f2.calcular_total()} €")`
        }
      },
      {
        id: 'lab2-fechas-colecciones',
        num: 2,
        title: 'Laboratorio 2: Tratamiento de Fechas y Colecciones de Alto Rendimiento',
        points: '2.5 pts',
        difficulty: 'Básico',
        desc: 'Cálculo de deltas temporales, plazos de entrega límite, filtrado con Streams en Java y list comprehensions en Python.',
        checklist: [
          'Manipulación de objetos datetime sin errores de zona horaria',
          'Filtrado y transformación de colecciones de más de 500 registros',
          'Validación de datos de entrada procedentes de formularios'
        ],
        codeSnippet: {
          lang: 'python',
          filename: 'filtro_plazos_entregas.py',
          code: `from datetime import datetime, timezone, timedelta
from dataclasses import dataclass

@dataclass(frozen=True)
class EntregaEAC:
    codigo: str
    titulo: str
    fecha_limite: datetime
    completada: bool

def obtener_entregas_urgentes(entregas: list[EntregaEAC], dias_aviso: int = 3) -> list[EntregaEAC]:
    ahora = datetime.now(timezone.utc)
    umbral = ahora + timedelta(days=dias_aviso)
    # List comprehension idiomática y funcional
    return [
        e for e in entregas
        if not e.completada and ahora <= e.fecha_limite <= umbral
    ]

# Prueba de ejecución
if __name__ == "__main__":
    base = datetime.now(timezone.utc)
    datos = [
        EntregaEAC("INT-EAC2", "Audio y Vídeo Web", base + timedelta(days=2), False),
        EntregaEAC("DESP-EAC2", "Servidor Nginx & Docker", base + timedelta(days=10), False),
        EntregaEAC("ENT-EAC1", "Git & UTM Linux", base - timedelta(days=1), True),
    ]
    urgentes = obtener_entregas_urgentes(datos)
    print(f"Entregas en riesgo ({len(urgentes)}): {[u.codigo for u in urgentes]}")`
        }
      }
    ],
    topics: [
      {
        num: '1.1',
        title: 'Tipado Fuerte vs Tipado Dinámico',
        desc: 'Comparación profunda del modelo de tipos entre Java (estático en compilación) y Python (dinámico en tiempo de ejecución con type hinting PEP 484).'
      },
      {
        num: '1.2',
        title: 'Los 5 Principios SOLID en la Práctica',
        desc: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation y Dependency Inversion aplicados a código limpio.'
      },
      {
        num: '1.3',
        title: 'Tratamiento de Excepciones y Resiliencia',
        desc: 'Checked vs Unchecked exceptions en Java y bloques try-except-else-finally en Python. Jerarquías de errores propias de dominio.'
      }
    ],
    docs: [
      {
        title: 'CheatSheet Oficial de Python',
        badge: 'Chuleta Rápida',
        size: '3.4 MB',
        url: '/fuentes/tecnofor/python/CheatSheet Python.pdf'
      },
      {
        title: 'Manual Completo de Python',
        badge: 'Manual de Texto',
        size: '1.3 MB',
        url: '/fuentes/tecnofor/python/Manual de Python.pdf'
      },
      {
        title: 'La librería Datetime en Python',
        badge: 'Fechas & Horas',
        size: '165 KB',
        url: '/fuentes/tecnofor/python/La librería Datetime en Python.pdf'
      }
    ]
  },
  {
    id: '02-frontend',
    slug: 'frontend-ui-systems',
    num: '02',
    code: 'PILAR-FRONTEND',
    title: 'Modern Frontend, UI Systems & Accesibilidad Web',
    shortTitle: 'Modern Frontend',
    badge: 'UI & ACCESIBILIDAD',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(190, 24, 93, 0.05) 100%)',
    icon: '🎨',
    tagline: 'Maquetación avanzada, sistemas de diseño, accesibilidad WCAG 2.1 AA y SPAs reactivas con Angular & React.',
    summary: 'Construir interfaces profesionales exige comprender la semántica del DOM, la cascada de estilos moderna (CSS Grid y Flexbox sin frameworks pesados), los requisitos legales de accesibilidad (WCAG/ARIA) y la reactividad por componentes.',
    hours: '80 horas unificadas',
    originCredits: [
      { name: 'IOC INT (0488)', desc: 'HTML5 semántico, CSS3, maquetación adaptativa y WCAG 2.1.' },
      { name: 'TecnoFor Angular (IFCD053PO)', desc: 'SPAs con Angular, componentes, directivas, pipes y RxJS.' },
      { name: 'MiCampus Architecture', desc: 'SPA modular en React 19, Vite, responsive y Dark Mode.' }
    ],
    skills: [
      'Maquetación CSS Grid y Flexbox de dos dimensiones',
      'Cumplimiento estricto de WCAG 2.1 AA y etiquetas WAI-ARIA',
      'Arquitectura de componentes y comunicación unidireccional (Props / Inputs)',
      'Formularios reactivos con validaciones asíncronas',
      'Optimización de activos multimedia: WebP, SVG e imágenes responsivas'
    ],
    labs: [
      {
        id: 'lab-int-accesibilidad',
        num: 1,
        title: 'Laboratorio: Auditoría de Accesibilidad WCAG 2.1 y Formulario Accesible',
        points: '2.5 pts',
        difficulty: 'Intermedio',
        desc: 'Construcción de un formulario reactivo con etiquetas de accesibilidad ARIA, ratios de contraste superiores a 4.5:1 y navegación por teclado íntegra.',
        checklist: [
          'Uso de elementos semánticos: <main>, <header>, <nav>, <fieldset>, <legend>',
          'Asociación obligatoria de <label for="..."> con inputs',
          'Gestión de foco accesible (outline visible y tabIndex controlado)',
          'Pruebas con lectores de pantalla y validación con axe-core / Lighthouse'
        ],
        codeSnippet: {
          lang: 'html',
          filename: 'AccessibleContactForm.html',
          code: `<form class="accessible-form" aria-labelledby="form-heading" novalidate>
  <h2 id="form-heading">Formulario de Contacto Accesible (WCAG 2.1 AA)</h2>

  <!-- Fieldset para agrupar campos con contexto accesible -->
  <fieldset>
    <legend>Datos Personales</legend>

    <div class="form-group">
      <label for="student-name">
        Nombre Completo <span aria-hidden="true">*</span>
      </label>
      <input
        type="text"
        id="student-name"
        name="name"
        required
        aria-required="true"
        aria-describedby="name-desc"
        autocomplete="name"
      />
      <span id="name-desc" class="helper-text">Introduce tu nombre oficial de matrícula</span>
    </div>

    <div class="form-group">
      <label for="student-email">
        Correo Institucional <span aria-hidden="true">*</span>
      </label>
      <input
        type="email"
        id="student-email"
        name="email"
        required
        aria-required="true"
        autocomplete="email"
      />
    </div>
  </fieldset>

  <button type="submit" class="btn-submit" aria-label="Enviar formulario de contacto">
    Enviar Solicitud
  </button>
</form>`
        }
      },
      {
        id: 'lab-grid-flex-layout',
        num: 2,
        title: 'Laboratorio: Shell de Aplicación Dashboard con CSS Grid y Flexbox',
        points: '2.5 pts',
        difficulty: 'Intermedio',
        desc: 'Estructuración de un layout macro bidimensional con CSS Grid (Sidebar, Header, Main, Footer) y alineación interna unidimensional de componentes con Flexbox.',
        checklist: [
          'Definición de grid-template-areas para macro-estructura responsiva',
          'Uso de minmax() y fr para evitar desbordamientos horizontales',
          'Uso de Flexbox con gap nativo para alineación de botones y badges',
          'Adaptación móvil con media queries fluidas sin javascript'
        ],
        codeSnippet: {
          lang: 'css',
          filename: 'dashboard-shell.css',
          code: `/* Macro-Layout bidimensional con CSS Grid */
.dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "sidebar header"
    "sidebar content"
    "sidebar footer";
  min-height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header  { grid-area: header;  }
.content { grid-area: content; }
.footer  { grid-area: footer;  }

/* Micro-Layouts unidimensionales con Flexbox */
.header-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content"
      "footer";
  }
  .sidebar { display: none; }
}`
        }
      }
    ],
    topics: [
      {
        num: '2.1',
        title: 'CSS Grid vs Flexbox: La Decisión Arquitectónica',
        desc: 'Cuándo usar Flexbox (unidimensional, flujos lineales) y cuándo Grid (bidimensional, macro-layouts y alineación estricta).'
      },
      {
        num: '2.2',
        title: 'Normativa WCAG 2.1 y Estándares de Accesibilidad',
        desc: 'Los 4 principios POUR: Perceptible, Operable, Comprensible y Robusto. Ratios de contraste y accesibilidad cognitiva.'
      },
      {
        num: '2.3',
        title: 'Patrón de Reactividad: RxJS vs Estados React',
        desc: 'Comparación técnica entre Observables de Angular y hooks de estado (useState/useMemo) en React.'
      }
    ],
    docs: [
      {
        title: 'Guía de Interfaces y Formularios Web',
        badge: 'IOC INT',
        size: '1.1 MB',
        url: '/data/ioc/lecciones/txt/interfaces.txt'
      }
    ]
  },
  {
    id: '03-backend',
    slug: 'backend-architecture-rest',
    num: '03',
    code: 'PILAR-BACKEND',
    title: 'Arquitectura Backend, Microservicios & APIs RESTful',
    shortTitle: 'Backend Architecture',
    badge: 'MICROSERVICIOS & APIS',
    color: '#0ea5e9',
    bgGradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.05) 100%)',
    icon: '⚡',
    tagline: 'Diseño de servicios desacoplados con Spring Boot 3, inyección de dependencias, contratos OpenAPI y REST.',
    summary: 'El backend moderno no es una mezcla de lógica y base de datos, sino una arquitectura en capas limpia (Controller, Service, Repository) guiada por el protocolo HTTP y el desacoplamiento mediante Inversión de Control (IoC).',
    hours: '120 horas unificadas',
    originCredits: [
      { name: 'Accenture Core (Java 17 / Spring Boot 3)', desc: '12 Actividades de microservicios, DTOs y validaciones.' },
      { name: 'IOC DESP (0614)', desc: 'Servidores Tomcat, Apache/Nginx y virtual hosts.' },
      { name: 'SEPE PHP Backend', desc: 'Servicio web REST con PHP PDO y JSON headers.' }
    ],
    skills: [
      'Inversión de Control (IoC) e Inyección de Dependencias (@Autowired / Constructor)',
      'Diseño RESTful estricto (GET, POST, PUT, DELETE, PATCH, códigos 200/400/500)',
      'Patrón DTO (Data Transfer Object) y mapeos con MapStruct',
      'Validaciones declarativas con Bean Validation (@Valid, @NotNull, @Size)',
      'Manejo global de excepciones con @ControllerAdvice y ProblemDetail RFC 7807'
    ],
    labs: [
      {
        id: 'lab-rest-spring-controller',
        num: 1,
        title: 'Laboratorio: API REST Completa con DTOs, Validaciones y Service Layer',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Desarrollo de un microservicio de gestión académica con Spring Boot 3: endpoint de matriculación, validación DTO y respuesta tipada ResponseEntity.',
        checklist: [
          'Controlador desacoplado usando @RestController y @RequestMapping',
          'Inyección por constructor recomendada por Spring (sin field injection)',
          'Separación estricta entre entidad de persistencia y DTO expuesto',
          'Captura de MethodArgumentNotValidException con respuesta JSON estándar'
        ],
        codeSnippet: {
          lang: 'java',
          filename: 'StudentRestController.java',
          code: `@RestController
@RequestMapping("/api/v1/students")
public class StudentRestController {

    private final StudentService studentService;

    public StudentRestController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> register(
            @Valid @RequestBody StudentCreateDTO dto) {
        StudentResponseDTO created = studentService.registerStudent(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }
}`
        }
      },
      {
        id: 'lab-rest-global-exception-handler',
        num: 2,
        title: 'Laboratorio: Manejo Centralizado de Excepciones con ProblemDetail (RFC 7807)',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Construcción de un interceptor @RestControllerAdvice en Spring Boot 3 para transformar errores de validación y negocio en formato estandarizado RFC 7807.',
        checklist: [
          'Uso de @RestControllerAdvice para intercepción transversal de excepciones',
          'Estandarización de errores con el objeto nativo ProblemDetail de Spring Boot 3',
          'Mapeo de MethodArgumentNotValidException con lista detallada de campos inválidos',
          'Respuestas HTTP con status 400 Bad Request y 404 Not Found tipadas'
        ],
        codeSnippet: {
          lang: 'java',
          filename: 'GlobalExceptionHandler.java',
          code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Recurso No Encontrado");
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, "Error de validación en la petición");
        problem.setTitle("Validación Fallida");
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(f -> 
            fieldErrors.put(f.getField(), f.getDefaultMessage()));
        problem.setProperty("errors", fieldErrors);
        return problem;
    }
}`
        }
      }
    ],
    topics: [
      {
        num: '3.1',
        title: 'Protocolo HTTP & Idempotencia de Verbos',
        desc: 'Diferencias entre PUT (idempotente) y PATCH (parcial). Códigos de estado HTTP RFC 9110 y cabeceras de caché.'
      },
      {
        num: '3.2',
        title: 'El Ciclo de Vida de los Beans en Spring Boot 3',
        desc: 'Scope Singleton vs Prototype, inicialización con @PostConstruct y destrucción de recursos gestionados.'
      },
      {
        num: '3.3',
        title: 'Documentación de APIs con OpenAPI / Swagger',
        desc: 'Generación automática de contratos interactivos de API listos para su consumo por frontend o agentes IA.'
      }
    ],
    docs: [
      {
        title: 'Manual de Spring Boot 3 & Microservicios',
        badge: 'Accenture',
        size: '2.1 MB',
        url: '/springboot/documentacion/Manual_Spring_Boot_Obsidian.md'
      }
    ]
  },
  {
    id: '04-data',
    slug: 'data-engineering-sql-analytics',
    num: '04',
    code: 'PILAR-DATA',
    title: 'Data Engineering, SQL Relacional & Analítica Avanzada',
    shortTitle: 'Data Engineering & SQL',
    badge: 'DATOS & ANALÍTICA',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
    icon: '💾',
    tagline: 'De la modelización relacional y transacciones ACID a los ORMs (JPA/Hibernate) y DataFrames con Pandas.',
    summary: 'Los datos son el activo central de cualquier software. Dominar su ciclo de vida significa saber estructurarlos en 3ª Forma Normal, optimizar consultas con JOINs e índices, gestionar transacciones atómicas con JPA y explotarlos mediante análisis numérico.',
    hours: '95 horas unificadas',
    originCredits: [
      { name: 'Accenture JPA/Hibernate', desc: 'Spring Data JPA, relaciones @OneToMany/@ManyToMany y @Transactional.' },
      { name: 'SEPE SQL Master', desc: 'MySQL relacional, subconsultas, agrupaciones y normalización.' },
      { name: 'TecnoFor Python Data', desc: 'Manipulación de arrays con NumPy y tablas con Pandas.' },
      { name: 'IOC ENT / DIGI', desc: 'Diagramas Entidad-Relación y Big Data en el tejido productivo.' }
    ],
    skills: [
      'Normalización de bases de datos hasta 3FN y diagramas E/R',
      'Consultas complejas: INNER/LEFT/RIGHT JOINs, GROUP BY, HAVING y ventanas',
      'Mapeo objeto-relacional con Spring Data JPA y repositorios derivados',
      'Gestión de transacciones y aislamiento ACID (@Transactional)',
      'Ingeniería de datos tabular con Pandas (limpieza, joins de DataFrames y agregaciones)'
    ],
    labs: [
      {
        id: 'lab-sql-jpa-modeling',
        num: 1,
        title: 'Laboratorio: Modelado Relacional 3FN y Mapeo Bidireccional JPA',
        points: '2.5 pts',
        difficulty: 'Intermedio',
        desc: 'Diseño de un esquema relacional para matriculaciones con claves foráneas, índices de alto rendimiento y su correspondiente entidad Hibernate con relación @ManyToOne.',
        checklist: [
          'Eliminación de dependencias parciales y transitivas (3ª Forma Normal)',
          'Anotación de entidades con @Entity, @Table y generación de ID (@GeneratedValue)',
          'Estrategia de carga perezosa (FetchType.LAZY) para evitar el problema N+1',
          'Consultas optimizadas con JPQL y Spring Data Specifications'
        ],
        codeSnippet: {
          lang: 'java',
          filename: 'EnrollmentEntity.java',
          code: `@Entity
@Table(name = "enrollments", indexes = {
    @Index(name = "idx_student_subject", columnList = "student_id, subject_id", unique = true)
})
public class EnrollmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private SubjectEntity subject;

    @Column(nullable = false)
    private LocalDate enrollmentDate = LocalDate.now();

    @Column(precision = 4, scale = 2)
    private BigDecimal finalGrade;

    // Constructores, Getters y Setters
}`
        }
      },
      {
        id: 'lab-pandas-data-analytics',
        num: 2,
        title: 'Laboratorio: Pipeline ETL y Análisis de Notas con Pandas y NumPy',
        points: '2.5 pts',
        difficulty: 'Intermedio',
        desc: 'Procesamiento de un dataset CSV de notas académicas: limpieza de valores nulos, vectorización de notas finales con ponderaciones y cálculo de percentiles con NumPy.',
        checklist: [
          'Carga de datos tabulares con pd.read_csv() y detección de valores NaN',
          'Imputación de ausencias y transformación vectorizada de notas',
          'Agrupación por asignatura con .groupby() y cálculo de media, mediana y desv. estándar',
          'Exportación limpia a formato parquet o CSV optimizado'
        ],
        codeSnippet: {
          lang: 'python',
          filename: 'analisis_calificaciones.py',
          code: `import pandas as pd
import numpy as np

# 1. Carga y limpieza de datos
def procesar_calificaciones(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path)
    
    # Rellenar actividades no entregadas con 0.0
    df['nota_teoria'] = df['nota_teoria'].fillna(0.0)
    df['nota_practica'] = df['nota_practica'].fillna(0.0)
    
    # 2. Cálculo vectorizado ponderado: 40% Teoría + 60% Práctica
    df['nota_final'] = (df['nota_teoria'] * 0.4) + (df['nota_practica'] * 0.6)
    df['aprobado'] = np.where(df['nota_final'] >= 5.0, "APROBADO", "SUSPENSO")
    
    return df

# 3. Resumen estadístico por asignatura
def estadisticas_por_modulo(df: pd.DataFrame) -> pd.DataFrame:
    resumen = df.groupby('modulo').agg(
        total_alumnos=('id', 'count'),
        tasa_aprobados=('aprobado', lambda s: (s == 'APROBADO').mean() * 100),
        media_final=('nota_final', 'mean'),
        mediana_final=('nota_final', 'median'),
        desviacion=('nota_final', 'std')
    ).round(2)
    return resumen`
        }
      }
    ],
    topics: [
      {
        num: '4.1',
        title: 'Las Propiedades ACID y el Problema N+1 en ORMs',
        desc: 'Atomicidad, Consistencia, Aislamiento y Durabilidad. Cómo evitar que Hibernate lance cientos de consultas innecesarias con JOIN FETCH.'
      },
      {
        num: '4.2',
        title: 'Computación Numérica Vectorizada con NumPy',
        desc: 'Por qué los ndarrays de NumPy son hasta 50 veces más rápidos que las listas estándar de Python gracias a la contigüidad en memoria C.'
      },
      {
        num: '4.3',
        title: 'ETL y Limpieza de Datasets con Pandas',
        desc: 'Manejo de valores nulos (NaN), transformaciones tipo apply, merges de DataFrames y exportaciones limpias a CSV/Parquet.'
      }
    ],
    docs: [
      {
        title: 'La librería Pandas en Python',
        badge: 'DataFrames',
        size: '745 KB',
        url: '/fuentes/tecnofor/python/La librería Pandas en Python.pdf'
      },
      {
        title: 'La librería NumPy en Python',
        badge: 'NumPy',
        size: '258 KB',
        url: '/fuentes/tecnofor/python/La librería NumPy en Python.pdf'
      }
    ]
  },
  {
    id: '05-devops',
    slug: 'devops-cloud-linux-platform',
    num: '05',
    code: 'PILAR-DEVOPS',
    title: 'DevOps, Cloud, Contenedores & Linux Platform',
    shortTitle: 'DevOps & Cloud',
    badge: 'PLATAFORMA & CLOUD',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.05) 100%)',
    icon: '🐳',
    tagline: 'Virtualización nativa en Apple Silicon (ARM64), Docker, Docker Compose, Nginx y pipelines CI/CD.',
    summary: 'El código solo tiene valor cuando está ejecutándose en producción de forma predecible y segura. Este pilar enseña a gobernar la infraestructura: Linux Ubuntu nativo bajo UTM, contenedorización multi-stage, orquestación local y automatización con Git.',
    hours: '100 horas unificadas',
    originCredits: [
      { name: 'IOC DESP (0614)', desc: 'EAC2: Docker, Apache, Nginx, cortafuegos UFW y SSH.' },
      { name: 'IOC ENT (0487)', desc: 'Virtualización UTM en Mac M5, Git, GitHub y ramas.' },
      { name: 'Accenture Cloud Lab', desc: 'Dockerización de aplicaciones Spring Boot y Docker Compose.' }
    ],
    skills: [
      'Administración de servidores Linux Ubuntu (systemd, journalctl, permisos chown/chmod)',
      'Virtualización en Apple Silicon (hipervisor UTM ARM64 vs emulación x86)',
      'Construcción de imágenes Docker optimizadas multi-stage (JRE Alpine)',
      'Orquestación de servicios con Docker Compose (puertos, volúmenes y redes)',
      'Servidores web y proxys inversos (Nginx / Apache) con certificados SSL/TLS'
    ],
    labs: [
      {
        id: 'lab-docker-compose-fullstack',
        num: 1,
        title: 'Laboratorio: Despliegue Full-Stack Multicapa con Docker Compose',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Despliegue unificado de un frontend SPA, una API backend Spring Boot/PHP y una base de datos MySQL conectadas por una red puente interna aislada.',
        checklist: [
          'Dockerfile multi-stage para construir el JAR y empaquetar solo con JRE',
          'docker-compose.yml con healthchecks y depends_on de la base de datos',
          'Persistencia de datos de MySQL mediante volumen con nombre',
          'Exposición segura únicamente de los puertos de frontend y backend'
        ],
        codeSnippet: {
          lang: 'docker',
          filename: 'docker-compose.yml',
          code: `version: '3.8'

services:
  database:
    image: mysql:8.0
    container_name: campus_mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret_root_pass
      MYSQL_DATABASE: campus_db
      MYSQL_USER: blanca
      MYSQL_PASSWORD: dev_password
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - internal_net

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: campus_api
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/campus_db
      SPRING_DATASOURCE_USERNAME: blanca
      SPRING_DATASOURCE_PASSWORD: dev_password
    depends_on:
      - database
    networks:
      - internal_net

volumes:
  db_data:

networks:
  internal_net:
    driver: bridge`
        }
      },
      {
        id: 'lab-nginx-reverse-proxy',
        num: 2,
        title: 'Laboratorio: Proxy Inverso con Nginx, SSL y Cabeceras de Seguridad',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Configuración de un servidor Nginx como puerta de enlace (API Gateway local) que redirige peticiones hacia el backend y frontend, aplicando gzip y cabeceras de seguridad OWASP.',
        checklist: [
          'Directiva proxy_pass hacia upstream de backend y frontend',
          'Preservación de cabeceras de cliente: Host, X-Real-IP, X-Forwarded-For y X-Forwarded-Proto',
          'Activación de compresión gzip para respuestas de tipo JSON, JS y CSS',
          'Cabeceras de protección: X-Content-Type-Options, X-Frame-Options y Referrer-Policy'
        ],
        codeSnippet: {
          lang: 'nginx',
          filename: 'nginx.conf',
          code: `server {
    listen 80;
    server_name micampus.local;

    # Compresión Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;

    # Cabeceras de Seguridad OWASP
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy hacia API Backend (Spring Boot / PHP)
    location /api/ {
        proxy_pass http://backend:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Servir Frontend SPA estático
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}`
        }
      }
    ],
    topics: [
      {
        num: '5.1',
        title: 'Apple Silicon (ARM64) vs Intel (x86_64) en Docker y VMs',
        desc: 'Por qué falla VirtualBox en Mac M1/M2/M3/M4/M5 y cómo UTM y el Apple Virtualization Framework ejecutan Linux a velocidad nativa.'
      },
      {
        num: '5.2',
        title: 'Anatomía de un Dockerfile Multi-Stage de Producción',
        desc: 'Cómo reducir una imagen de 800MB (con Maven/JDK completo) a menos de 120MB usando Eclipse Temurin JRE Alpine.'
      },
      {
        num: '5.3',
        title: 'Proxys Inversos con Nginx: Terminación SSL y Balanceo',
        desc: 'Configuración de bloques server, directiva proxy_pass, reescritura de cabeceras Host y X-Forwarded-For.'
      }
    ],
    docs: [
      {
        title: 'Guía Oficial de Despliegue & Servidores Web',
        badge: 'IOC DESP',
        size: '1.4 MB',
        url: '/data/ioc/lecciones/txt/despliegue.txt'
      }
    ]
  },
  {
    id: '06-quality',
    slug: 'devsecops-testing-software-quality',
    num: '06',
    code: 'PILAR-QUALITY',
    title: 'DevSecOps, Testing Automatizado & Calidad de Código',
    shortTitle: 'Quality & DevSecOps',
    badge: 'DEVSECOPS & QA',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.05) 100%)',
    icon: '🛡️',
    tagline: 'Pruebas unitarias con JUnit 5, cobertura con JaCoCo, análisis con SonarQube y seguridad OWASP.',
    summary: 'Cualquiera puede escribir código que la máquina entienda; los buenos ingenieros escriben código que otros humanos pueden mantener y verificar con pruebas automatizadas, métricas de deuda técnica y protección frente a las 10 vulnerabilidades de OWASP.',
    hours: '85 horas unificadas',
    originCredits: [
      { name: 'IOC ENT (0487)', desc: 'JUnit 5, pruebas de caja negra/blanca, refactorización y SonarQube.' },
      { name: 'Accenture QA', desc: 'Pruebas de controladores con MockMvc y Mockito.' },
      { name: 'IOC DIGI (Ciberseguridad)', desc: 'Criptografía, certificados digitales y auditoría de seguridad.' }
    ],
    skills: [
      'Diseño de pruebas unitarias con JUnit 5 y aserciones completas',
      'Mocking de servicios y repositorios con Mockito (@Mock, @InjectMocks)',
      'Pruebas de endpoints REST con MockMvc y validación de JSONPath',
      'Métricas de calidad: Cobertura de ramas (Branch Coverage) y complejidad ciclomática',
      'Seguridad aplicada: Prevención de SQLi, XSS, CSRF, Path Traversal y firmas HMAC'
    ],
    labs: [
      {
        id: 'lab-junit-mockmvc-testing',
        num: 1,
        title: 'Laboratorio: Suite Completa de Pruebas Unitarias y de Integración',
        points: '2.5 pts',
        difficulty: 'Intermedio',
        desc: 'Construcción de un conjunto de pruebas con cobertura superior al 85% para un servicio de autenticación y transacciones bancarias.',
        checklist: [
          'Pruebas unitarias de casos de éxito y casos de borde (valores límite)',
          'Simulación de fallos con assertThrows para excepciones de negocio',
          'Mocking de capa de datos con verify() de llamadas a métodos',
          'Generación de informe de cobertura JaCoCo en HTML'
        ],
        codeSnippet: {
          lang: 'java',
          filename: 'BankServiceTest.java',
          code: `@ExtendWith(MockitoExtension.class)
class BankServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private BankServiceImpl bankService;

    @Test
    @DisplayName("Debe lanzar InsufficientFundsException cuando el saldo es menor al importe")
    void shouldThrowExceptionWhenBalanceIsInsufficient() {
        Account sender = new Account("ES001", BigDecimal.valueOf(50));
        when(accountRepository.findById("ES001")).thenReturn(Optional.of(sender));

        assertThrows(InsufficientFundsException.class, () -> {
            bankService.transfer("ES001", "ES002", BigDecimal.valueOf(100));
        });

        verify(accountRepository, never()).save(any());
    }
}`
        }
      },
      {
        id: 'lab-mockmvc-rest-tests',
        num: 2,
        title: 'Laboratorio: Pruebas de Integración de Endpoints REST con MockMvc y JSONPath',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Verificación integral de controladores Spring Boot simulando peticiones HTTP con MockMvc, aserción de códigos de estado y validación del árbol JSON de respuesta.',
        checklist: [
          'Configuración con @WebMvcTest o @SpringBootTest con MockMvc autoconfigurado',
          'Envío de payloads JSON con contentType(MediaType.APPLICATION_JSON)',
          'Aserción de status HTTP 201 Created y presencia de header Location',
          'Validación de campos anidados mediante expresiones JSONPath ($.id, $.nombre)'
        ],
        codeSnippet: {
          lang: 'java',
          filename: 'StudentRestControllerTest.java',
          code: `@WebMvcTest(StudentRestController.class)
class StudentRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/v1/students con payload válido retorna 201 y DTO")
    void shouldCreateStudentAndReturn201() throws Exception {
        StudentCreateDTO req = new StudentCreateDTO("Blanca", "blanca@campus.cat");
        StudentResponseDTO res = new StudentResponseDTO(1L, "Blanca", "blanca@campus.cat");

        when(studentService.registerStudent(any())).thenReturn(res);

        mockMvc.perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.email").value("blanca@campus.cat"));
    }
}`
        }
      }
    ],
    topics: [
      {
        num: '6.1',
        title: 'La Pirámide de Pruebas: Unitarias, Integración y E2E',
        desc: 'Por qué el 70% de la inversión debe centrarse en pruebas unitarias rápidas y solo un 10% en pruebas de interfaz de usuario de extremo a extremo.'
      },
      {
        num: '6.2',
        title: 'Refactorización y Deuda Técnica con SonarQube',
        desc: 'Cómo interpretar el escaneo de Sonar: Bugs, Vulnerabilities, Security Hotspots y Code Smells. Regla de los 3 strikes de Martin Fowler.'
      },
      {
        num: '6.3',
        title: 'OWASP Top 10: Inyección, Autenticación Rota y CSRF',
        desc: 'Mecanismos de defensa en código: parámetros preparados (PreparedStatements), tokens SameSite y saneamiento estricto.'
      }
    ],
    docs: [
      {
        title: 'Guía de Entornos, Pruebas y Depuración',
        badge: 'IOC ENT',
        size: '1.2 MB',
        url: '/data/ioc/lecciones/txt/entornos.txt'
      }
    ]
  },
  {
    id: '07-agentic',
    slug: 'agentic-ai-spec-driven-development',
    num: '07',
    code: 'PILAR-AGENTIC',
    title: 'Agentic AI, Spec-Driven Development & LLMs Locales',
    shortTitle: 'Agentic AI & SDD',
    badge: 'ESPECIALIZACIÓN IA',
    color: '#6366f1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(67, 56, 202, 0.05) 100%)',
    icon: '🤖',
    tagline: 'El nuevo paradigma: desarrollo guiado por especificaciones (SDD), LLMs locales con Ollama y agentes autónomos como Hermes.',
    summary: 'La IA generativa no reemplaza a los programadores; reemplaza a quienes no saben formular especificaciones técnicas rigurosas. En este pilar dominas el paradigma Spec-Driven Development (SDD), los modelos open-weights locales con Ollama y la creación de agentes con arnés de ejecución (Harness).',
    hours: '130 horas unificadas',
    originCredits: [
      { name: 'TecnoFor Agentic (SDD)', desc: 'Ciclo Virtuoso SDD, 21 lecciones teóricas y labs de agentes IA.' },
      { name: 'IOC DIGI (IA & Cloud)', desc: 'Fundamentos de Machine Learning, supervisado/no supervisado y ética.' },
      { name: 'Second Brain Hermes', desc: 'Agente local personal con inferencia privada en Mac M5 y Telegram.' },
      { name: 'TecnoFor Python ML', desc: '16 ejercicios de algoritmos supervisados y TensorFlow.' }
    ],
    skills: [
      'Spec-Driven Development (SDD): De la intención a especificaciones formales testables',
      'Inferencia local privada con Ollama y LM Studio (DeepSeek-R1, Qwen2.5-Coder)',
      'Diseño de arneses de ejecución (Harness) para agentes autónomos con ciclo ReAct',
      'Ingeniería de contexto persistente (soul.md, user.md, memory.md)',
      'Tool Calling estructurado (JSON Schema de herramientas ejecutables en disco)',
      'Machine Learning aplicado: Modelos supervisados y redes neuronales con TensorFlow'
    ],
    labs: [
      {
        id: 'lab-hermes-harness-dispatch',
        num: 1,
        title: 'Laboratorio: Implementación de un Arnés ReAct con Tool Dispatcher en Python',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Construcción de un bucle de ejecución que consulta a Ollama en local, detecta llamadas a herramientas en formato JSON y ejecuta acciones en el disco duro de forma segura.',
        checklist: [
          'Ensamblado de contexto con soul.md y especificación de usuario',
          'Llamada HTTP al endpoint local http://localhost:11434/api/generate',
          'Parser del bloque de herramienta y ejecución de la función local',
          'Límite de guardián (máximo 5 turnos) para prevenir bucles infinitos'
        ],
        codeSnippet: {
          lang: 'python',
          filename: 'hermes_react_harness.py',
          code: `import json
import urllib.request

OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_local_llm(prompt: str, model: str = "qwen2.5-coder:7b") -> str:
    payload = json.dumps({"model": model, "prompt": prompt, "stream": False}).encode("utf-8")
    req = urllib.request.Request(OLLAMA_URL, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data.get("response", "")

def tool_get_pending_eacs() -> str:
    # Lee entregas del campus local
    return json.dumps([{"subject": "INT", "eac": "EAC 2", "status": "pending"}])

def run_agent_turn(user_msg: str):
    system_prompt = "Eres Hermes, agente de Blanca. Si necesitas entregas, responde únicamente: TOOL:get_pending_eacs"
    full_prompt = f"{system_prompt}\\n\\nUsuario: {user_msg}\\nHermes:"
    res = ask_local_llm(full_prompt).strip()
    
    if "TOOL:get_pending_eacs" in res:
        obs = tool_get_pending_eacs()
        final_prompt = f"{full_prompt}\\n{res}\\nObservación: {obs}\\nHermes:"
        return ask_local_llm(final_prompt)
    return res

if __name__ == "__main__":
    print(run_agent_turn("¿Qué entregas tengo pendientes en el campus?"))`
        }
      },
      {
        id: 'lab-sdd-schema-validation',
        num: 2,
        title: 'Laboratorio: Especificación Formal SDD y Validación con JSON Schema',
        points: '2.5 pts',
        difficulty: 'Avanzado',
        desc: 'Construcción de un validador que comprueba que toda nueva feature antes de ser codificada cuenta con su contrato formal SDD (requisitos, inputs, outputs y criterios de verificación).',
        checklist: [
          'Definición de meta-esquema JSON Schema para especificaciones funcionales',
          'Validación estricta de campos obligatorios: featureId, title, criteria, tests',
          'Manejo de errores descriptivo si la IA genera una propuesta incompleta',
          'Integración como hook o pre-commit en el pipeline de desarrollo'
        ],
        codeSnippet: {
          lang: 'python',
          filename: 'validar_especificacion_sdd.py',
          code: `import json
import jsonschema

# Metamodelo formal del estándar SDD
SDD_SPEC_SCHEMA = {
    "type": "object",
    "required": ["specId", "titulo", "rol", "criterios_aceptacion", "casos_prueba"],
    "properties": {
        "specId": {"type": "string", "pattern": "^SPEC-[0-9]{3}$"},
        "titulo": {"type": "string", "minLength": 5},
        "rol": {"type": "string"},
        "criterios_aceptacion": {
            "type": "array",
            "minItems": 2,
            "items": {"type": "string"}
        },
        "casos_prueba": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "required": ["nombre", "dado", "cuando", "entonces"],
                "properties": {
                    "nombre": {"type": "string"},
                    "dado": {"type": "string"},
                    "cuando": {"type": "string"},
                    "entonces": {"type": "string"}
                }
            }
        }
    }
}

def validar_especificacion(spec_data: dict) -> bool:
    try:
        jsonschema.validate(instance=spec_data, schema=SDD_SPEC_SCHEMA)
        print(f"✅ Especificación {spec_data['specId']} cumple el estándar SDD.")
        return True
    except jsonschema.ValidationError as err:
        print(f"❌ Error SDD en {err.json_path}: {err.message}")
        return False`
        }
      }
    ],
    topics: [
      {
        num: '7.1',
        title: 'El Ciclo Virtuoso SDD: Principios vs Autocompletado Ciego',
        desc: 'Por qué nunca se debe pedir a un LLM que escriba código sin tests ni especificación formal previa. El desarrollador como arquitecto y auditor.'
      },
      {
        num: '7.2',
        title: 'Arquitectura de Inferencia Local: Ollama & LM Studio en Mac ARM64',
        desc: 'Cuantización GGUF (Q4_K_M, Q8), uso de la memoria unificada del chip Apple Silicon y cero latencia de red.'
      },
      {
        num: '7.3',
        title: 'Diseño de Agentes Autónomos: Soul, User, Tools & Memory',
        desc: 'Cómo mantener coherencia cognitiva a lo largo del tiempo sin degradar la ventana de contexto mediante ficheros markdown modulares.'
      }
    ],
    docs: [
      {
        title: 'Libro Oficial IFCD093PO: Machine Learning Aplicado',
        badge: 'Certificación SEPE',
        size: '23 MB',
        url: '/fuentes/tecnofor/python/Libro IFCD093PO Machine Learning aplicado usando Python - Orbe.pdf'
      },
      {
        title: 'Introducción y Exposición de TensorFlow',
        badge: 'Deep Learning',
        size: '1.4 MB',
        url: '/fuentes/tecnofor/python/Tensor-Flow.pdf'
      },
      {
        title: 'Dossier TecnoFor Agentic Software Developer',
        badge: 'Itinerario SDD',
        size: '6.1 MB',
        url: '/fuentes/tecnofor/TecnoFor-dossier-itinerario-gratuito-agentic-sofwtare-developer.pdf'
      }
    ]
  }
];

export function getBrainPillarById(idOrSlug) {
  if (!idOrSlug) return null;
  const norm = idOrSlug.toLowerCase().trim();
  return BRAIN_PILLARS_DATA.find(p => 
    p.id === norm || 
    p.slug === norm || 
    p.num === norm ||
    p.code.toLowerCase() === norm
  ) || null;
}

