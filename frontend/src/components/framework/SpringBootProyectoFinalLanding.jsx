import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePersistentState } from '../../hooks/usePersistentState';
import ProyectoFinalFunctionalTab from './proyecto-final/ProyectoFinalFunctionalTab.jsx';
import ProyectoFinalLayersTab from './proyecto-final/ProyectoFinalLayersTab.jsx';
import ProyectoFinalDefenseTab from './proyecto-final/ProyectoFinalDefenseTab.jsx';
import ProyectoFinalHexagonalTab from './proyecto-final/ProyectoFinalHexagonalTab.jsx';
import ProyectoFinalComparisonTab from './proyecto-final/ProyectoFinalComparisonTab.jsx';
import ProyectoFinalPresentationTab from './proyecto-final/ProyectoFinalPresentationTab.jsx';
import CollapsibleMasterAside from '../common/aside/CollapsibleMasterAside.jsx';
import {
  IconFileText,
  IconCompass,
  IconLayers,
  IconRepeat,
  IconHexagon,
  IconTerminal,
  IconCheckSquare,
  IconAward,
  IconDatabase,
  IconShield,
  IconServer,
  IconKey,
  IconCode,
  IconFolder,
  IconZap,
  IconTarget,
  IconBook,
  IconAlertTriangle,
  IconChevronDown,
  IconChevronRight
} from '../dashboards/javaStudio/StudioIcons.jsx';

/**
 * ============================================================================
 * @component   SpringBootProyectoFinalLanding
 * @description Portal interactivo del Proyecto Final de Spring Boot (Library API REST):
 *              - Explicación funcional exhaustiva de index-secure.html y flujos
 *              - Arquitectura Tradicional (3 Capas / 8 Paquetes) vs. Arquitectura Hexagonal (Ports & Adapters)
 *              - Guía de defensa con 14 preguntas trampa del tribunal
 *              - Plan de ruta interactivo paso a paso (Pasos 1 al 13 de plan.md)
 *              - Arquitectura y diagramas de base de datos MySQL con relaciones
 *              - Panel de comandos y atajos de terminal (Maven, Docker, Tests)
 *              - Suite de 25 tests desacoplados vs 12 tests tradicionales
 *              - Normas críticas y restricciones del enunciado oficial
 * ============================================================================
 */
export default function SpringBootProyectoFinalLanding() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const search = window.location.search;
      if (search.includes('presentacion') || search.includes('informe') || path.includes('presentacion') || path.includes('informe')) {
        return 'presentation-all';
      }
      if (path.includes('hexagonal') || search.includes('hexagonal')) {
        return 'hex-overview';
      }
      if (path.includes('comparativa') || search.includes('comparativa')) {
        return 'comparison-split';
      }
      if (path.includes('por-capas')) {
        return 'structure';
      }
    }
    return 'structure';
  });

  useEffect(() => {
    if (location.search.includes('presentacion') || location.search.includes('informe') || location.pathname.includes('presentacion') || location.pathname.includes('informe')) {
      setSelectedId('presentation-all');
    } else if (location.pathname.includes('hexagonal') || location.search.includes('hexagonal')) {
      setSelectedId('hex-overview');
    } else if (location.pathname.includes('comparativa') || location.search.includes('comparativa')) {
      setSelectedId('comparison-split');
    } else if (location.pathname.includes('por-capas')) {
      setSelectedId('structure');
    }
  }, [location.pathname, location.search]);

  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [readingMode, setReadingMode] = useState('single'); // 'single' | 'continuous'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [copiedKey, setCopiedKey] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState({
    1: true,
    2: true,
    3: true
  });

  const SIDEBAR_SECTIONS = [
    {
      id: 'presentation',
      title: 'Memoria & Presentación (5 Ejes)',
      icon: <IconFileText size={15} style={{ color: '#ec4899' }} />,
      color: '#ec4899',
      items: [
        { id: 'presentation-all', label: '1. Informe Completo (5 Ejes)', icon: <IconFileText size={14} />, badge: 'Oficial', type: 'presentation', axis: 'all' },
        { id: 'presentation-eje1', label: '2. Eje 1: Arquitectura Fullstack', icon: <span className="nav-step-num">01</span>, badge: 'SPA/REST', type: 'presentation', axis: 1 },
        { id: 'presentation-eje2', label: '3. Eje 2: Seguridad y JWT', icon: <span className="nav-step-num">02</span>, badge: 'JWT', type: 'presentation', axis: 2 },
        { id: 'presentation-eje3', label: '4. Eje 3: 3 Capas, DTOs y ACID', icon: <span className="nav-step-num">03</span>, badge: 'ACID', type: 'presentation', axis: 3 },
        { id: 'presentation-eje4', label: '5. Eje 4: 6 Desafíos Resueltos', icon: <span className="nav-step-num">04</span>, badge: 'Fixes', type: 'presentation', axis: 4 },
        { id: 'presentation-eje5', label: '6. Eje 5: Tribunal & Q&A', icon: <span className="nav-step-num">05</span>, badge: 'Q&A', type: 'presentation', axis: 5 }
      ]
    },
    {
      id: 'context',
      title: 'Contextualización & Aclaraciones Previas',
      icon: <IconCompass size={15} style={{ color: '#0ea5e9' }} />,
      color: '#0ea5e9',
      items: [
        { id: 'structure', label: 'Estructura de Carpetas (`library/`)', icon: <IconFolder size={14} />, badge: 'Tree', type: 'structure' },
        { id: 'database', label: 'Esquema DB & Relaciones JPA', icon: <IconDatabase size={14} />, badge: 'MySQL 8', type: 'database' }
      ]
    },
    {
      id: 'backend',
      title: 'Arquitectura Backend (3 Capas / 8 Paquetes)',
      icon: <IconLayers size={15} style={{ color: '#3b82f6' }} />,
      color: '#3b82f6',
      items: [
        { id: 'layer-1', label: '1. Modelo JPA & BBDD', icon: <IconDatabase size={14} />, badge: '.model', type: 'layer', layerNum: 1 },
        { id: 'layer-2', label: '2. Repositorios Spring Data', icon: <IconZap size={14} />, badge: '.repo', type: 'layer', layerNum: 2 },
        { id: 'layer-3', label: '3. DTOs & @ValidStock', icon: <IconShield size={14} />, badge: '.dto', type: 'layer', layerNum: 3 },
        { id: 'layer-4', label: '4. Mappers Manuales (Sin Lambdas)', icon: <IconRepeat size={14} />, badge: '.mapper', type: 'layer', layerNum: 4 },
        { id: 'layer-5', label: '5. Servicios & @Transactional', icon: <IconServer size={14} />, badge: '.service', type: 'layer', layerNum: 5 },
        { id: 'layer-6', label: '6. Controladores RESTful', icon: <IconCode size={14} />, badge: '.controller', type: 'layer', layerNum: 6 },
        { id: 'layer-7', label: '7. Excepciones Globales', icon: <IconAlertTriangle size={14} />, badge: '.exception', type: 'layer', layerNum: 7 },
        { id: 'layer-8', label: '8. Seguridad JWT Stateless', icon: <IconKey size={14} />, badge: '.security', type: 'layer', layerNum: 8 }
      ]
    },
    {
      id: 'comparison',
      title: 'Análisis Comparativo (Capas vs Hexagonal)',
      icon: <IconRepeat size={15} style={{ color: '#64748b' }} />,
      color: '#64748b',
      items: [
        { id: 'comparison-split', label: '1. Comparador de Código (Split View)', icon: <IconCode size={14} />, badge: 'Split', type: 'comparison', sub: 'split' },
        { id: 'comparison-common', label: '2. Puntos de Convergencia', icon: <IconCheckSquare size={14} />, badge: 'Dominio', type: 'comparison', sub: 'common' },
        { id: 'comparison-differences', label: '3. Las 7 Divergencias de Diseño', icon: <IconTarget size={14} />, badge: 'Diferencias', type: 'comparison', sub: 'differences' },
        { id: 'comparison-spring', label: '4. Mecanismos de Spring Framework', icon: <IconZap size={14} />, badge: 'Spring', type: 'comparison', sub: 'spring' },
        { id: 'comparison-matrix', label: '5. Criterios de Selección y Trade-offs', icon: <IconLayers size={14} />, badge: 'Matriz', type: 'comparison', sub: 'matrix' }
      ]
    },
    {
      id: 'hexagonal',
      title: 'Arquitectura Hexagonal (Evolución)',
      icon: <IconHexagon size={15} style={{ color: '#8b5cf6' }} />,
      color: '#8b5cf6',
      items: [
        { id: 'hex-overview', label: '1. ¿Por qué Hexagonal? (Ports & Adapters)', icon: <IconHexagon size={14} />, badge: 'Core', type: 'hexagonal', sub: 'overview' },
        { id: 'hex-differences', label: '2. Tradicional vs. Hexagonal (7 Claves)', icon: <IconRepeat size={14} />, badge: '7 Claves', type: 'hexagonal', sub: 'differences' },
        { id: 'hex-domain', label: '3. Dominio Puro & Reglas Ricas', icon: <IconCode size={14} />, badge: 'Pure Java', type: 'hexagonal', sub: 'domain' },
        { id: 'hex-ports', label: '4. Puertos (In UseCase / Out Repos)', icon: <IconServer size={14} />, badge: 'Contracts', type: 'hexagonal', sub: 'ports' },
        { id: 'hex-adapters', label: '5. Adaptadores (Web REST & Persistencia)', icon: <IconLayers size={14} />, badge: 'Adapters', type: 'hexagonal', sub: 'adapters' },
        { id: 'hex-flow', label: '6. Trazabilidad de una Petición (End-to-End)', icon: <IconCompass size={14} />, badge: 'Trace', type: 'hexagonal', sub: 'flow' },
        { id: 'hex-tests', label: '7. Suite de 25 Tests & Pirámide Ágil', icon: <IconCheckSquare size={14} />, badge: '25 Tests', type: 'hexagonal', sub: 'tests' },
        { id: 'hex-mapping', label: '8. Mapeo Carpetas Tradicional → Hexagonal', icon: <IconFolder size={14} />, badge: 'Mapeo', type: 'hexagonal', sub: 'mapping' },
        { id: 'hex-simulator', label: '9. Simulador SPA Hexagonal en Vivo', icon: <IconTerminal size={14} />, badge: 'Live', type: 'hexagonal', sub: 'simulator' }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend & Cliente Web',
      icon: <IconCode size={15} style={{ color: '#10b981' }} />,
      color: '#10b981',
      items: [
        { id: 'frontend-auth', label: '1. Login & Token JWT', icon: <IconKey size={14} />, badge: 'Auth', type: 'frontend', section: 'auth' },
        { id: 'frontend-books', label: '2. Catálogo & Stock de Libros', icon: <IconBook size={14} />, badge: 'Stock', type: 'frontend', section: 'books' },
        { id: 'frontend-loans', label: '3. Ciclo de Préstamos & Devolución', icon: <IconRepeat size={14} />, badge: 'Loans', type: 'frontend', section: 'loans' },
        { id: 'frontend-authors', label: '4. Autores y Categorías', icon: <IconFolder size={14} />, badge: 'N:M', type: 'frontend', section: 'authors-categories' },
        { id: 'frontend-errors', label: '5. Los 7 Errores Críticos Resueltos', icon: <IconShield size={14} />, badge: 'Audit', type: 'frontend', section: 'errors-resolved' },
        { id: 'frontend-simulator', label: '6. Simulador Web en Vivo (SPA)', icon: <IconTerminal size={14} />, badge: 'Live', type: 'simulator' }
      ]
    },
    {
      id: 'defense',
      title: 'Tribunal & Batería de Defensa',
      icon: <IconAward size={15} style={{ color: '#f59e0b' }} />,
      color: '#f59e0b',
      items: [
        { id: 'defense-all', label: 'Todas las 14 Preguntas', icon: <IconFileText size={14} />, badge: '14 Q', type: 'defense', category: 'all' },
        { id: 'defense-trampa', label: 'Preguntas Trampa del Tribunal', icon: <IconTarget size={14} />, badge: '3 Q', type: 'defense', category: 'trampa' },
        { id: 'defense-architecture', label: 'Arquitectura & Spring Boot', icon: <IconLayers size={14} />, badge: '3 Q', type: 'defense', category: 'architecture' },
        { id: 'defense-data', label: 'BBDD, JPA & Transacciones', icon: <IconDatabase size={14} />, badge: '3 Q', type: 'defense', category: 'data' },
        { id: 'defense-security', label: 'Seguridad & JWT Stateless', icon: <IconKey size={14} />, badge: '3 Q', type: 'defense', category: 'security' },
        { id: 'defense-frontend', label: 'Límites Web vs Backend', icon: <IconCode size={14} />, badge: '2 Q', type: 'defense', category: 'frontend' },
        { id: 'defense-docs', label: 'Memoria Técnica (PDF Oficial)', icon: <IconFileText size={14} />, badge: 'PDF', type: 'docs' }
      ]
    },
    {
      id: 'roadmap',
      title: 'Plan de Ruta & Rúbrica Oficial',
      icon: <IconTarget size={15} style={{ color: '#8b5cf6' }} />,
      color: '#8b5cf6',
      items: [
        { id: 'roadmap-steps', label: 'Checklist de 13 Pasos (plan.md)', icon: <IconCheckSquare size={14} />, badge: '13 Pasos', type: 'steps' },
        { id: 'roadmap-rules', label: 'Reglas Críticas & Prohibiciones', icon: <IconAlertTriangle size={14} />, badge: 'Rúbrica', type: 'rules' },
        { id: 'roadmap-initializr', label: 'Guía Spring Initializr', icon: <IconZap size={14} />, badge: 'Setup', type: 'initializr' }
      ]
    },
    {
      id: 'devops',
      title: 'QA, Tests & Operaciones',
      icon: <IconTerminal size={15} style={{ color: '#06b6d4' }} />,
      color: '#06b6d4',
      items: [
        { id: 'qa-tests', label: 'Suite Oficial de los 12 Tests', icon: <IconCheckSquare size={14} />, badge: 'JUnit 5', type: 'tests' },
        { id: 'qa-terminal', label: 'Comandos de Terminal & Docker', icon: <IconTerminal size={14} />, badge: 'CLI', type: 'terminal' }
      ]
    }
  ];

  const allItems = SIDEBAR_SECTIONS.flatMap(sec => 
    sec.items.map(it => ({ ...it, sectionTitle: sec.title, sectionColor: sec.color, sectionIcon: sec.icon }))
  );
  const currentItemIndex = allItems.findIndex(it => it.id === selectedId);
  const currentItem = allItems[currentItemIndex] || allItems[0];
  const prevItem = currentItemIndex > 0 ? allItems[currentItemIndex - 1] : null;
  const nextItem = currentItemIndex < allItems.length - 1 ? allItems[currentItemIndex + 1] : null;

  const toggleCategory = (catId) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const expandAll = () => setCollapsedCategories({});
  const collapseAll = () => {
    const all = {};
    SIDEBAR_SECTIONS.forEach(s => { all[s.id] = true; });
    setCollapsedCategories(all);
  };

  const handleNavigate = (tab, target) => {
    if (tab === 'layers') {
      if (typeof target === 'number') {
        setSelectedId(`layer-${target}`);
      } else {
        setSelectedId('layer-1');
      }
    } else if (tab === 'functional') {
      if (typeof target === 'string') {
        const map = {
          auth: 'frontend-auth',
          books: 'frontend-books',
          loans: 'frontend-loans',
          'authors-categories': 'frontend-authors',
          'errors-resolved': 'frontend-errors'
        };
        setSelectedId(map[target] || 'frontend-auth');
      } else {
        setSelectedId('frontend-auth');
      }
    } else if (tab === 'defense') {
      setSelectedId('defense-all');
    } else if (tab === 'roadmap') {
      setSelectedId('roadmap-steps');
    } else if (tab === 'architecture') {
      setSelectedId('database');
    } else if (tab === 'tests') {
      setSelectedId('qa-tests');
    } else if (tab === 'terminal') {
      setSelectedId('qa-terminal');
    } else if (tab === 'rules') {
      setSelectedId('roadmap-rules');
    } else if (tab === 'initializr') {
      setSelectedId('roadmap-initializr');
    } else if (tab === 'structure') {
      setSelectedId('structure');
    } else if (tab === 'hexagonal') {
      if (typeof target === 'string') {
        setSelectedId(`hex-${target}`);
      } else {
        setSelectedId('hex-overview');
      }
    } else if (tab === 'comparison') {
      setSelectedId('comparison-split');
    } else if (tab === 'presentation') {
      if (typeof target === 'number' || typeof target === 'string') {
        setSelectedId(target === 'all' ? 'presentation-all' : `presentation-eje${target}`);
      } else {
        setSelectedId('presentation-all');
      }
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const filteredSections = SIDEBAR_SECTIONS.map(sec => {
    const matchingItems = sec.items.filter(it => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return it.label.toLowerCase().includes(q) || it.badge.toLowerCase().includes(q);
    });
    return { ...sec, items: matchingItems };
  }).filter(sec => sec.items.length > 0);

  // Pasos y subtareas basados en plan.md
  const initialStepsData = [
    {
      id: 0,
      title: "Paso 0: Initializer (start.spring.io)",
      badge: "Completado",
      status: "completed",
      tag: "Initializr",
      color: "#10b981",
      summary: "Selección de metadatos (Maven, Java 21, com.accenture, library) y las 8 dependencias starter en start.spring.io.",
      tasks: [
        { id: "0-1", label: "Metadatos: Maven, Java 21, com.accenture, library, Jar, Properties", done: true },
        { id: "0-2", label: "8 dependencias: Web, Data JPA, MySQL, Validation, Security, Lombok, DevTools, H2", done: true },
        { id: "0-3", label: "2 dependencias externas para pom.xml: SpringDoc OpenAPI 3.1.1 y JJWT 0.13.0", done: true }
      ],
      codeSnippet: `# Generación directa de library.zip por terminal (curl)
curl https://start.spring.io/starter.zip \\
  -d type=maven-project \\
  -d language=java \\
  -d baseDir=library \\
  -d groupId=com.accenture \\
  -d artifactId=library \\
  -d name=library \\
  -d packageName=com.accenture.library \\
  -d packaging=jar \\
  -d javaVersion=21 \\
  -d dependencies=web,data-jpa,mysql,validation,security,lombok,devtools,h2 \\
  -o library.zip && unzip library.zip`
    },

    {
      id: 1,
      title: 'Paso 1: Entorno, Ubicación y Proyecto Base (pom.xml)',
      badge: 'Completado',
      status: 'completed',
      tag: 'Configuración',
      color: '#10b981',
      summary: 'Creación de la estructura base en el repositorio, pom.xml con Java 21 y Spring Boot 4.1.1, clase LibraryApplication y application.properties.',
      tasks: [
        { id: '1-1', label: 'Estructura de carpetas creada según especificación oficial (com.accenture.library)', done: true },
        { id: '1-2', label: 'Configuración de pom.xml con Java 21, Spring Boot 4.1.1, MySQL, SpringDoc 3.1.1 y JJWT 0.13.0', done: true },
        { id: '1-3', label: 'Clase principal LibraryApplication.java y application.properties inicial (port=8080, ddl-auto=validate)', done: true }
      ],
      codeSnippet: `// Estructura completa de carpetas y ficheros del proyecto library/
library/
├── pom.xml                                    <-- Java 21, Spring Boot 4.1.1 y dependencias oficiales
├── db/
│   └── init.sql                               <-- Script MySQL con las tablas y datos iniciales
└── src/
    ├── main/
    │   ├── java/com/accenture/library/        <-- Paquete base com.accenture.library
    │   │   ├── LibraryApplication.java        <-- Clase de arranque @SpringBootApplication
    │   │   ├── config/                        <-- OpenApiConfig (Swagger UI)
    │   │   ├── controller/                    <-- BookController, AuthorController, etc.
    │   │   ├── dto/                           <-- Request y Response DTOs
    │   │   ├── exception/                     <-- GlobalExceptionHandler y excepciones custom
    │   │   ├── mapper/                        <-- Mappers manuales (sin lambdas ni streams)
    │   │   ├── model/                         <-- Entidades JPA (Book, Author, Category, Loan)
    │   │   ├── repository/                    <-- Interfaces Spring Data JPA
    │   │   ├── security/                      <-- SecurityConfig, JwtService, JwtAuthFilter
    │   │   ├── service/                       <-- Lógica de negocio (@Transactional)
    │   │   └── validation/                    <-- Validador de clase @ValidStock
    │   └── resources/
    │       └── application.properties         <-- Puerto 8080 y MySQL (ddl-auto=validate)
    └── test/
        ├── java/com/accenture/library/        <-- Los 12 tests con Given/When/Then
        └── resources/
            └── application-test.properties    <-- Perfil para tests con H2`
    },
    {
      id: 2,
      title: 'Paso 2: Script SQL y Base de Datos MySQL (db/init.sql)',
      badge: 'Completado',
      status: 'completed',
      tag: 'Base de Datos',
      color: '#10b981',
      summary: 'Script db/init.sql idempotente con creación de base de datos library, 5 tablas, relaciones foráneas y datos de prueba con stock coherente.',
      tasks: [
        { id: '2-1', label: 'Archivo db/init.sql creado con creación idempotente de base de datos library y tablas (category, author, book, book_author, loan)', done: true },
        { id: '2-2', label: 'Motor InnoDB, charset utf8mb4 y collation utf8mb4_0900_ai_ci', done: true },
        { id: '2-3', label: 'Datos iniciales con coherencia de stock (available_stock = total_stock - préstamos ACTIVE), libros con dos autores, autores sin libros, categorías vacías y préstamos vencidos/futuros', done: true }
      ],
      codeSnippet: `-- db/init.sql (Regla de oro: Coherencia de Stock)
-- available_stock = total_stock - COUNT(préstamos ACTIVE)
CREATE DATABASE IF NOT EXISTS library CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE library;

CREATE TABLE category (...);
CREATE TABLE author (...);
CREATE TABLE book (...);
CREATE TABLE book_author (...);
CREATE TABLE loan (...);`
    },
    {
      id: 3,
      title: 'Paso 3: Entidades JPA y Relaciones (com.accenture.library.model)',
      badge: 'Completado',
      status: 'completed',
      tag: 'Modelo JPA',
      color: '#10b981',
      summary: 'Entidades Category, Author, Book, Loan y enum LoanStatus con mapeo exacto al esquema SQL para pasar ddl-auto=validate.',
      tasks: [
        { id: '3-1', label: 'Crear Enum LoanStatus con los tres estados: ACTIVE, RETURNED, OVERDUE', done: true },
        { id: '3-2', label: 'Crear entidad Category: id, name (único, obligatorio, 100 car.), description (opcional, 500 car.), relación @OneToMany bidireccional a Book', done: true },
        { id: '3-3', label: 'Crear entidad Author: id, firstName (obligatorio), lastName (obligatorio), nationality (opcional), relación @ManyToMany a Book', done: true },
        { id: '3-4', label: 'Crear entidad Book: id, title, isbn (único, obligatorio), publishedYear, availableStock, totalStock, relación @ManyToOne a Category y relación @ManyToMany a Author con tabla intermedia book_author', done: true },
        { id: '3-5', label: 'Crear entidad Loan: id, loanDate, expectedReturnDate, actualReturnDate, status (@Enumerated(EnumType.STRING)), relación @ManyToOne a Book', done: true },
        { id: '3-6', label: 'Aplicar Javadoc completo en clases y atributos, asegurando compatibilidad estricta con ddl-auto=validate', done: true }
      ],
      codeSnippet: `@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 20)
    private String isbn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id"))
    private List<Author> authors;
}`
    },
    {
      id: 4,
      title: 'Paso 4: Repositorios Spring Data JPA (com.accenture.library.repository)',
      badge: 'Completado',
      status: 'completed',
      tag: 'Persistencia',
      color: '#10b981',
      summary: 'Interfaces JpaRepository para Category, Author, Book (con paginación Pageable y filtros) y Loan.',
      tasks: [
        { id: '4-1', label: 'Crear CategoryRepository: métodos de consulta por nombre y existencia (existsByNameIgnoreCase)', done: true },
        { id: '4-2', label: 'Crear AuthorRepository: consultas por nombre/apellidos y verificación de existencia', done: true },
        { id: '4-3', label: 'Crear BookRepository: consultas paginadas con Pageable, filtros por categoría (findByCategoryId), filtros por autor (findByAuthorsId), búsqueda por ISBN', done: true },
        { id: '4-4', label: 'Crear LoanRepository: consultas por estado (findByStatus), préstamos por libro (findByBookId) y conteo de préstamos activos', done: true },
        { id: '4-5', label: 'Incluir Javadoc explicativo en cada interfaz y método derivado', done: true }
      ],
      codeSnippet: `public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);
    Page<Book> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Book> findByAuthorsId(Long authorId, Pageable pageable);
}`
    },
    {
      id: 5,
      title: 'Paso 5: DTOs, Validaciones y Formato de Fechas',
      badge: 'En Curso',
      status: 'in-progress',
      tag: 'DTOs & Validación',
      color: '#3b82f6',
      summary: 'Separación entre capa de datos y representación externa con Bean Validation, formato ISO de fechas y validador de stock.',
      tasks: [
        { id: '5-1', label: 'DTOs de Categoría: CategoryRequestDto y CategoryResponseDto', done: false },
        { id: '5-2', label: 'DTOs de Autor: AuthorRequestDto y AuthorResponseDto', done: false },
        { id: '5-3', label: 'DTOs de Libro: BookRequestDto y BookResponseDto (con IDs de autores, categoría y lista detallada de autores)', done: false },
        { id: '5-4', label: 'DTOs de Préstamo: LoanRequestDto (con bookId y expectedReturnDate) y LoanResponseDto (con cálculo dinámico de status)', done: false },
        { id: '5-5', label: 'DTOs de Seguridad: LoginRequestDto y AuthResponseDto (token JWT)', done: false },
        { id: '5-6', label: 'Anotaciones Bean Validation (@NotBlank, @Size, @NotNull, @Min, @Pattern para ISBN, @Future para fecha esperada)', done: false },
        { id: '5-7', label: 'Crear validador personalizado a nivel de clase: comprobación de stock consistente (availableStock <= totalStock)', done: false },
        { id: '5-8', label: 'Configurar formato ISO (@JsonFormat(pattern = "yyyy-MM-dd")) para todas las fechas LocalDate', done: false }
      ],
      codeSnippet: `// Formato ISO obligatorio
@JsonFormat(pattern = "yyyy-MM-dd")
private LocalDate expectedReturnDate;

// Validador personalizado a nivel de clase
@ValidStock
public class BookRequestDto { ... }`
    },
    {
      id: 6,
      title: 'Paso 6: Mappers (Sin Lambdas ni Streams)',
      badge: 'Crítico',
      status: 'pending',
      tag: 'Mappers Manuales',
      color: '#ec4899',
      summary: 'Conversión manual de entidades a DTOs usando bucles for/for-each tradicionales y cálculo dinámico de OVERDUE.',
      tasks: [
        { id: '6-1', label: 'Crear CategoryMapper: conversiones toEntity, toDto y toDtoList usando bucles clásicos (for / for-each)', done: false },
        { id: '6-2', label: 'Crear AuthorMapper: conversiones bidireccionales entidad-DTO con iteración tradicional imperativa', done: false },
        { id: '6-3', label: 'Crear BookMapper: ensamblado de libro, resolución de autores y categoría sin Streams API ni funciones lambda', done: false },
        { id: '6-4', label: 'Crear LoanMapper: mapeo de préstamo con cálculo dinámico de OVERDUE (si status == ACTIVE y expectedReturnDate < LocalDate.now(), el DTO devolverá OVERDUE)', done: false },
        { id: '6-5', label: 'Incorporar Javadoc exhaustivo en cada método de conversión', done: false }
      ],
      codeSnippet: `// Regla de cálculo dinámico OVERDUE (¡Nunca se guarda en BD!)
LoanStatus computedStatus = loan.getStatus();
if (loan.getStatus() == LoanStatus.ACTIVE 
    && loan.getExpectedReturnDate().isBefore(LocalDate.now())) {
    computedStatus = LoanStatus.OVERDUE;
}`
    },
    {
      id: 7,
      title: 'Paso 7: Manejo Global de Errores y Excepciones Personalizadas',
      badge: 'Pendiente',
      status: 'pending',
      tag: 'Excepciones',
      color: '#ef4444',
      summary: 'Control centralizado con @RestControllerAdvice para capturar 404, 400, 409 y 500 con respuestas estructuradas en JSON.',
      tasks: [
        { id: '7-1', label: 'Crear excepciones personalizadas: ResourceNotFoundException (404), BusinessRuleException (400), DuplicateResourceException (409)', done: false },
        { id: '7-2', label: 'Crear DTO estándar de error: ErrorResponseDto (timestamp, código HTTP, mensaje descriptivo, ruta invocada y mapa de validaciones)', done: false },
        { id: '7-3', label: 'Implementar @RestControllerAdvice GlobalExceptionHandler capturando excepciones personalizadas, validaciones y errores 500', done: false }
      ],
      codeSnippet: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponseDto(HttpStatus.NOT_FOUND.value(), ex.getMessage(), req.getRequestURI()));
    }
}`
    },
    {
      id: 8,
      title: 'Paso 8: Servicios y Lógica de Negocio (Préstamos y Stock)',
      badge: 'Lógica Central',
      status: 'pending',
      tag: 'Servicios',
      color: '#6366f1',
      summary: 'Reglas de negocio críticas: comprobación de stock disponible, decremento/incremento de stock y transaccionalidad con @Transactional.',
      tasks: [
        { id: '8-1', label: 'Implementar CategoryService / CategoryServiceImpl: operaciones CRUD y control de nombres duplicados', done: false },
        { id: '8-2', label: 'Implementar AuthorService / AuthorServiceImpl: gestión y consulta de autores', done: false },
        { id: '8-3', label: 'Implementar BookService / BookServiceImpl: creación con validación de stock, actualización, filtrado combinado y paginación', done: false },
        { id: '8-4', label: 'Creación de préstamo: validar existencia de libro, verificar availableStock > 0, restar 1 al stock disponible y registrar préstamo como ACTIVE', done: false },
        { id: '8-5', label: 'Devolución de préstamo: comprobar estado ACTIVE, cambiar a RETURNED, registrar actualReturnDate = LocalDate.now() y sumar 1 al stock disponible', done: false },
        { id: '8-6', label: 'Consulta de préstamos: listado general y por estado con cálculo dinámico en respuesta', done: false },
        { id: '8-7', label: 'Control de transaccionalidad con @Transactional y código estricto sin lambdas/streams (bucles imperativos)', done: false }
      ],
      codeSnippet: `@Transactional
public LoanResponseDto createLoan(LoanRequestDto request) {
    Book book = bookRepository.findById(request.getBookId())
        .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado"));
    if (book.getAvailableStock() <= 0) {
        throw new BusinessRuleException("No hay stock disponible para préstamo");
    }
    book.setAvailableStock(book.getAvailableStock() - 1);
    // guardar préstamo y retornar dto...
}`
    },
    {
      id: 9,
      title: 'Paso 9: Controladores REST, Paginación y Filtros',
      badge: 'Pendiente',
      status: 'pending',
      tag: 'Controladores',
      color: '#0ea5e9',
      summary: 'Controladores REST para categorías, autores, libros (con filtros y paginación), préstamos (crear y devolver) y autenticación.',
      tasks: [
        { id: '9-1', label: 'Implementar CategoryController (/api/categories): endpoints GET, POST, PUT, DELETE', done: false },
        { id: '9-2', label: 'Implementar AuthorController (/api/authors): endpoints GET, POST, PUT, DELETE', done: false },
        { id: '9-3', label: 'Implementar BookController (/api/books): listado con soporte de paginación (Pageable), filtros opcionales por categoría/autor, obtención por ID, creación (201 con header Location), actualización y borrado', done: false },
        { id: '9-4', label: 'Implementar LoanController (/api/loans): endpoints GET (con filtro de estado), POST para nuevo préstamo, y endpoint PUT /{id}/return para devolución', done: false },
        { id: '9-5', label: 'Implementar AuthController (/api/auth/login): validación de credenciales y expedición del token JWT', done: false },
        { id: '9-6', label: 'Gestión adecuada de códigos de estado HTTP (200 OK, 201 Created, 204 No Content, 400, 404, 409)', done: false }
      ],
      codeSnippet: `@PostMapping
public ResponseEntity<BookResponseDto> createBook(@Valid @RequestBody BookRequestDto request) {
    BookResponseDto created = bookService.createBook(request);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}").buildAndExpand(created.getId()).toUri();
    return ResponseEntity.created(location).body(created);
}`
    },
    {
      id: 10,
      title: 'Paso 10: Documentación con OpenAPI / Swagger UI',
      badge: 'Pendiente',
      status: 'pending',
      tag: 'Swagger',
      color: '#14b8a6',
      summary: 'Configuración de OpenApiConfig, esquema de autenticación JWT Bearer y anotaciones @Operation en controladores.',
      tasks: [
        { id: '10-1', label: 'Crear configuración OpenApiConfig con metadatos de la API (título, versión, descripción, contacto)', done: false },
        { id: '10-2', label: 'Configurar esquema de seguridad JWT Bearer en Swagger (@SecurityScheme HTTP Bearer JWT)', done: false },
        { id: '10-3', label: 'Documentar cada controlador y endpoint con anotaciones @Tag, @Operation y @ApiResponse', done: false },
        { id: '10-4', label: 'Verificar acceso interactivo en /swagger-ui.html y esquema JSON en /v3/api-docs', done: false }
      ],
      codeSnippet: `@Configuration
@OpenAPIDefinition(info = @Info(title = "Library API", version = "1.0"))
@SecurityScheme(name = "BearerAuth", type = SecuritySchemeType.HTTP,
    scheme = "bearer", bearerFormat = "JWT")
public class OpenApiConfig { }`
    },
    {
      id: 11,
      title: 'Paso 11: Seguridad con Spring Security y JWT',
      badge: 'Crítico',
      status: 'pending',
      tag: 'Seguridad',
      color: '#f43f5e',
      summary: 'Usuarios en memoria admin/user, JwtService (HMAC-SHA256, 256 bits), JwtAuthenticationFilter y SecurityConfig sin estado.',
      tasks: [
        { id: '11-1', label: 'Configurar usuarios en memoria/código: admin (rol ADMIN) y user (rol USER) con passwords cifradas en BCrypt', done: false },
        { id: '11-2', label: 'Implementar JwtService: generación del token, firma con HMAC-SHA256 (clave secreta segura de 256 bits), extracción de claims y validación de expiración', done: false },
        { id: '11-3', label: 'Implementar JwtAuthenticationFilter: interceptor de peticiones para leer header Authorization: Bearer <token> y cargar contexto de seguridad', done: false },
        { id: '11-4', label: 'Implementar SecurityConfig: desactivar CSRF, sesión Stateless, rutas públicas (/api/auth/**, /swagger-ui/**) y operaciones de escritura solo para ADMIN', done: false }
      ],
      codeSnippet: `// Credenciales oficiales:
// admin / admin123 (ROLE_ADMIN) -> Permite GET, POST, PUT, DELETE
// user / user123 (ROLE_USER)   -> Solo operaciones GET de lectura`
    },
    {
      id: 12,
      title: 'Paso 12: Suite de Pruebas (Los 12 Tests con Given/When/Then)',
      badge: '12 Tests',
      status: 'pending',
      tag: 'Testing',
      color: '#a855f7',
      summary: '12 pruebas unitarias e integración mockeada con estructura Given/When/Then cubriendo Controllers, Services, Mappers, Seguridad y Validación.',
      tasks: [
        { id: '12-1', label: 'Configurar application-test.properties con base de datos H2 en memoria', done: false },
        { id: '12-2', label: 'Test 1: Crear libro válido retorna 201 Created (@WebMvcTest)', done: false },
        { id: '12-3', label: 'Test 2: Crear libro con datos inválidos retorna 400 Bad Request', done: false },
        { id: '12-4', label: 'Test 3: Obtener libro por ID inexistente retorna 404 Not Found', done: false },
        { id: '12-5', label: 'Test 4: Endpoint protegido sin token retorna 401 Unauthorized / 403 Forbidden', done: false },
        { id: '12-6', label: 'Test 5: Crear préstamo exitoso disminuye en 1 el availableStock (Mockito)', done: false },
        { id: '12-7', label: 'Test 6: Crear préstamo de libro sin stock disponible lanza BusinessRuleException', done: false },
        { id: '12-8', label: 'Test 7: Devolver préstamo incrementa en 1 el availableStock y asigna actualReturnDate', done: false },
        { id: '12-9', label: 'Test 8: Devolver un préstamo ya devuelto lanza BusinessRuleException', done: false },
        { id: '12-10', label: 'Test 9: Cálculo dinámico de estado asigna OVERDUE cuando expectedReturnDate es pasada y estado es ACTIVE', done: false },
        { id: '12-11', label: 'Test 10: Generación correcta de token JWT conteniendo username y rol', done: false },
        { id: '12-12', label: 'Test 11: Validación y extracción de claims de un token JWT válido', done: false },
        { id: '12-13', label: 'Test 12: Validador de stock rechaza libro cuando availableStock > totalStock', done: false }
      ],
      codeSnippet: `@Test
void shouldDecreaseAvailableStockWhenLoanCreated() {
    // Given
    Book book = new Book();
    book.setAvailableStock(3);
    when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

    // When
    loanService.createLoan(new LoanRequestDto(1L, LocalDate.now().plusDays(7)));

    // Then
    assertEquals(2, book.getAvailableStock());
}`
    },
    {
      id: 13,
      title: 'Paso 13: Dockerfile y README Final',
      badge: 'Entrega Final',
      status: 'pending',
      tag: 'DevOps & Docs',
      color: '#3b82f6',
      summary: 'Dockerfile multi-stage (Maven 3.9 + Temurin 21 JRE Alpine), perfil docker con H2 y documentación final con instrucciones de arranque.',
      tasks: [
        { id: '13-1', label: 'Crear Dockerfile multi-stage con Java 21 (etapa build con maven:3.9-eclipse-temurin-21 y etapa runtime con eclipse-temurin:21-jre-alpine)', done: false },
        { id: '13-2', label: 'Crear perfil application-docker.properties utilizando H2 en memoria con ddl-auto=create-drop', done: false },
        { id: '13-3', label: 'Redactar el documento README.md final en la raíz del proyecto library/ con todos los apartados obligatorios', done: false }
      ],
      codeSnippet: `# Dockerfile multi-stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]`
    }
  ];

  // Estado sincronizado con LocalStorage
  const [steps, setSteps] = usePersistentState('proyecto_final_roadmap_steps', initialStepsData, {
    category: 'accenture'
  });

  // Normalización defensiva para garantizar que cada paso contenga un array tasks válido
  const normalizedSteps = useMemo(() => {
    if (!Array.isArray(steps) || steps.length === 0) return initialStepsData;
    return steps.map((step, idx) => {
      const fallback = initialStepsData[idx] || initialStepsData.find(s => s.id === step.id) || {};
      const tasks = Array.isArray(step.tasks) ? step.tasks : (fallback.tasks || []);
      return {
        ...fallback,
        ...step,
        tasks
      };
    });
  }, [steps]);

  const toggleTask = (stepId, taskId) => {
    setSteps(prevSteps => {
      const current = Array.isArray(prevSteps) && prevSteps.length > 0 ? prevSteps : initialStepsData;
      return current.map(step => {
        if (step.id !== stepId) return step;
        const currentTasks = Array.isArray(step.tasks) ? step.tasks : [];
        const updatedTasks = currentTasks.map(task => {
          if (task.id !== taskId) return task;
          return { ...task, done: !task.done };
        });
        const allDone = updatedTasks.length > 0 && updatedTasks.every(t => t.done);
        const anyDone = updatedTasks.some(t => t.done);
        return {
          ...step,
          tasks: updatedTasks,
          status: allDone ? 'completed' : anyDone ? 'in-progress' : 'pending',
          badge: allDone ? 'Completado' : anyDone ? 'En Curso' : 'Pendiente'
        };
      });
    });
  };

  const toggleExpand = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  // Cálculo de estadísticas defensivo
  const totalTasks = normalizedSteps.reduce((acc, step) => acc + (step?.tasks?.length || 0), 0);
  const completedTasks = normalizedSteps.reduce(
    (acc, step) => acc + (step?.tasks?.filter(t => t?.done)?.length || 0),
    0
  );
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const completedStepsCount = normalizedSteps.filter(s => s?.status === 'completed').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', paddingBottom: '6rem' }}>
      {/* BREADCRUMB */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', padding: '0.85rem 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Link to="/java/studio" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Java Studio</Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: selectedId.startsWith('hex-') ? '#8b5cf6' : '#10b981', fontWeight: 600 }}>
              {selectedId.startsWith('hex-') 
                ? 'Proyecto Final: Library API REST - Arquitectura Hexagonal' 
                : 'Proyecto Final: Library API REST - Arquitectura Tradicional'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Link
              to="/springboot/primeros-pasos-taskmanager"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <span>💼</span> Ver Guía Taskmanager
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.25rem 1.5rem 0' }}>
        {/* HERO HEADER COMPACTO Y ELEGANTE CON CONMUTADOR DE ARQUITECTURA */}
        <section
          style={{
            background: selectedId.startsWith('hex-')
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)',
            border: selectedId.startsWith('hex-') ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '1.5rem 1.8rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.2rem',
            transition: 'background 0.3s ease, border-color 0.3s ease'
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.2rem 0.65rem',
              borderRadius: '30px',
              background: selectedId.startsWith('hex-') ? 'rgba(139, 92, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: selectedId.startsWith('hex-') ? '#8b5cf6' : '#10b981',
              fontSize: '0.74rem',
              fontWeight: 750,
              marginBottom: '0.45rem'
            }}>
              <span>{selectedId.startsWith('hex-') ? '⬢' : '📚'}</span>
              <span>
                {selectedId.startsWith('hex-')
                  ? 'Evolución Avanzada · Arquitectura Hexagonal (Ports & Adapters)'
                  : 'Proyecto Final Oficial · Especialización Java Spring Boot (Arquitectura Tradicional)'}
              </span>
            </div>
            
            {/* BADGE DE SELECCIÓN ARQUITECTÓNICA SOBRIO */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.2rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'var(--bg-hover)',
              color: 'var(--text-dim)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '0.45rem'
            }}>
              <span>
                {selectedId.startsWith('comparison-')
                  ? 'Análisis Técnico Comparativo'
                  : selectedId.startsWith('hex-')
                    ? 'Arquitectura Hexagonal (Ports & Adapters)'
                    : 'Arquitectura en Capas (N-Tier)'}
              </span>
            </div>
            
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-title)', margin: '0 0 0.4rem 0', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              {selectedId.startsWith('comparison-')
                ? 'Análisis Comparativo: Arquitectura en Capas frente a Hexagonal'
                : selectedId.startsWith('hex-')
                  ? 'API REST – Gestión de Biblioteca: Arquitectura Hexagonal'
                  : 'API REST – Gestión de Biblioteca: Arquitectura en Capas'}
            </h1>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0, maxWidth: '850px' }}>
              {selectedId.startsWith('comparison-')
                ? 'Estudio analítico de dos paradigmas de diseño sobre el mismo dominio funcional. Puntos de convergencia, divergencias de implementación, correlación con Spring Framework y matriz de trade-offs.'
                : selectedId.startsWith('hex-')
                  ? 'Desacoplamiento estricto con inversión de dependencias: Dominio puro sin dependencias de frameworks, puertos de entrada y salida, adaptadores independientes de persistencia y web, y verificación unitaria aislada.'
                  : 'Implementación estructurada en capas: Persistencia objeto-relacional con Spring Data JPA y MySQL, validaciones con Bean Validation, control transaccional y seguridad sin estado con JWT.'}
            </p>
          </div>

          {/* ACTION BUTTONS DIRECTOS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            {selectedId.startsWith('hex-') ? (
              <>
                <a
                  href="/java-studio/proyectos/libreria-hexagonal/index-secure.html"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    color: '#ffffff',
                    padding: '0.65rem 1.15rem',
                    borderRadius: '10px',
                    fontWeight: 750,
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.35)'
                  }}
                  title="Abrir la SPA adaptada a Hexagonal"
                >
                  <span>🌐</span> Probar SPA Hexagonal ↗
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedId('hex-differences')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'var(--bg-card)',
                    color: 'var(--text-title)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.86rem'
                  }}
                >
                  <span>⚖️</span> 7 Diferencias Clave
                </button>
              </>
            ) : (
              <>
                <a
                  href="/java-studio/proyectos/libreria-capas/index-secure.html"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    padding: '0.65rem 1.15rem',
                    borderRadius: '10px',
                    fontWeight: 750,
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
                  }}
                  title="Abrir el cliente web real index-secure.html en una nueva pestaña"
                >
                  <span>🌐</span> Probar Web Tradicional ↗
                </a>

                <a
                  href="/java-studio/proyectos/libreria-capas/documentacion/Memoria-tecnica-pdf/Memoria_Tecnica.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(59, 130, 246, 0.12)',
                    color: '#3b82f6',
                    border: '1px solid rgba(59, 130, 246, 0.35)',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '10px',
                    fontWeight: 750,
                    textDecoration: 'none',
                    fontSize: '0.86rem'
                  }}
                >
                  <span>📄</span> Memoria PDF (45 págs) ↗
                </a>
              </>
            )}

            <a 
              href="https://start.spring.io/#!type=maven-project&language=java&packaging=jar&jvmVersion=21&groupId=com.accenture&artifactId=library&name=library&description=API%20REST%20Gestion%20de%20Biblioteca&packageName=com.accenture.library&dependencies=web,data-jpa,mysql,validation,security,lombok,devtools,h2"
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'var(--bg-card)',
                color: 'var(--text-title)',
                border: '1px solid var(--border-subtle)',
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                fontWeight: 650,
                textDecoration: 'none',
                fontSize: '0.86rem'
              }}
            >
              <span>🌱</span> start.spring.io ↗
            </a>
          </div>
        </section>

        {/* =========================================================================
            DASHBOARD PRINCIPAL CON ASIDE LEFT (ESTRUCTURA TIPO IOC / SQL / LESSON)
            ========================================================================= */}
        <style>{`
          .project-dashboard-layout {
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
            position: relative;
          }
          .project-sidebar {
            width: 330px;
            flex-shrink: 0;
            position: sticky;
            top: 75px;
            max-height: calc(100vh - 95px);
            overflow-y: auto;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 18px;
            padding: 1.15rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
            box-sizing: border-box;
          }
          .project-sidebar::-webkit-scrollbar {
            width: 5px;
          }
          .project-sidebar::-webkit-scrollbar-thumb {
            background: var(--border-subtle);
            border-radius: 4px;
          }
          .project-content-area {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .sidebar-cat-btn {
            display: flex;
            align-items: center;
            justifyContent: space-between;
            width: 100%;
            padding: 0.55rem 0.75rem;
            background: var(--bg-hover);
            border: none;
            border-left: 3px solid var(--border-subtle);
            border-radius: 4px;
            color: var(--text-title);
            font-size: 0.82rem;
            font-weight: 750;
            cursor: pointer;
            text-align: left;
            transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
          }
          .sidebar-cat-btn:hover {
            background: var(--bg-card);
          }
          .sidebar-item-btn {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            width: 100%;
            padding: 0.55rem 0.75rem;
            border-radius: 4px;
            border: none;
            border-left: 3px solid transparent;
            background: transparent;
            color: var(--text-muted);
            font-size: 0.83rem;
            font-weight: 500;
            cursor: pointer;
            text-align: left;
            transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
            box-sizing: border-box;
          }
          .sidebar-item-btn:hover {
            background: var(--bg-hover);
            color: var(--text-title);
            transform: translateX(3px);
            border-left-color: var(--border-subtle);
          }
          .sidebar-item-btn.is-active {
            border-left: 3px solid var(--item-active-color);
            background: var(--item-active-bg);
            color: var(--item-active-color);
            font-weight: 700;
            text-shadow: 0 0 0.35px currentColor;
            transform: translateX(2px);
          }
          .nav-step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 19px;
            height: 19px;
            border-radius: 4px;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            font-size: 0.65rem;
            font-weight: 700;
            font-family: 'JetBrains Mono', Menlo, monospace;
            color: var(--text-muted);
            flex-shrink: 0;
            line-height: 1;
          }
          .sidebar-item-btn.is-active .nav-step-num {
            border-color: var(--item-active-color);
            color: var(--item-active-color);
            background: var(--item-active-bg);
          }
          @media (max-width: 960px) {
            .project-dashboard-layout {
              flex-direction: column;
            }
            .project-sidebar {
              width: 100%;
              position: static;
              max-height: none;
            }
          }
        `}</style>

        <div className="project-dashboard-layout">

          {/* ASIDE LEFT: MENÚ GLOBAL LATERAL REUTILIZABLE Y COLAPSABLE */}
          <CollapsibleMasterAside
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Índice del Proyecto"
            subtitle={`${allItems.length} Apartados Disponibles`}
            icon={<IconBook size={18} style={{ color: '#3b82f6' }} />}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Buscar tema, JPA, DTO, test..."
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
            width={330}
            footer={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  <span>Apartado activo:</span>
                  <span style={{ fontWeight: 800, color: currentItem.sectionColor }}>
                    {currentItemIndex + 1} de {allItems.length}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'var(--bg-hover)',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${((currentItemIndex + 1) / allItems.length) * 100}%`,
                    height: '100%',
                    background: currentItem.sectionColor,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            }
          >
            {/* ÁRBOL DE CATEGORÍAS */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredSections.map(sec => {
                const isCollapsed = !!collapsedCategories[sec.id];
                const hasActiveItem = sec.items.some(it => it.id === selectedId);

                return (
                  <div key={sec.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(sec.id)}
                      className="sidebar-cat-btn"
                      style={{
                        borderLeft: `3px solid ${sec.color}`,
                        background: hasActiveItem ? `${sec.color}10` : 'var(--bg-hover)'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', flexShrink: 0 }}>
                          {sec.icon}
                        </span>
                        <span>{sec.title}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{
                          fontSize: '0.68rem',
                          background: 'var(--bg-card)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          color: 'var(--text-dim)'
                        }}>
                          {sec.items.length}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                          {isCollapsed 
                            ? <IconChevronRight size={13} style={{ color: 'var(--text-muted)' }} /> 
                            : <IconChevronDown size={13} style={{ color: 'var(--text-muted)' }} />}
                        </span>
                      </span>
                    </button>

                    {!isCollapsed && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingLeft: '0.4rem' }}>
                        {sec.items.map(it => {
                          const isSelected = it.id === selectedId;
                          return (
                            <button
                              key={it.id}
                              type="button"
                              onClick={() => {
                                setSelectedId(it.id);
                                if (readingMode === 'continuous' && it.type === 'layer') {
                                  const el = document.getElementById(`layer-${it.layerNum}`);
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                    return;
                                  }
                                }
                                if (window.innerWidth <= 960) {
                                  document.getElementById('project-content-anchor')?.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className={`sidebar-item-btn ${isSelected ? 'is-active' : ''}`}
                              style={{
                                '--item-active-color': sec.color,
                                '--item-active-bg': `${sec.color}1f`
                              }}
                            >
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '18px',
                                height: '18px',
                                flexShrink: 0,
                                color: isSelected ? sec.color : 'var(--text-muted)'
                              }}>
                                {it.icon}
                              </span>
                              <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {it.label}
                              </span>
                              <span style={{
                                fontSize: '0.66rem',
                                padding: '0.1rem 0.35rem',
                                borderRadius: '4px',
                                background: isSelected ? `${sec.color}25` : 'var(--bg-hover)',
                                color: isSelected ? sec.color : 'var(--text-dim)',
                                flexShrink: 0
                              }}>
                                {it.badge}
                              </span>
                              {isSelected && (
                                <IconChevronRight size={13} style={{ color: sec.color, flexShrink: 0 }} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </CollapsibleMasterAside>

          {/* ÁREA PRINCIPAL DE CONTENIDO */}
          <main className="project-content-area" style={{ width: isSidebarOpen ? undefined : '100%' }}>
            <div id="project-content-anchor" />

            {/* BREADCRUMB ELEGANTE + SELECTOR DE MODO DE LECTURA */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.82rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {!isSidebarOpen && (
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    style={{
                      background: 'rgba(59, 130, 246, 0.12)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 750,
                      color: '#3b82f6',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    title="Desplegar menú lateral de contenidos"
                  >
                    <IconBook size={14} />
                    <span>Índice ({allItems.length})</span>
                    <IconChevronRight size={12} />
                  </button>
                )}
                <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>
                  {selectedId.startsWith('hex-') 
                    ? 'PROYECTO FINAL · ARQUITECTURA HEXAGONAL' 
                    : 'PROYECTO FINAL · ARQUITECTURA TRADICIONAL'}
                </span>
                <span style={{ color: 'var(--border-subtle)' }}>/</span>
                <span style={{ color: currentItem.sectionColor, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  {currentItem.sectionIcon}
                  <span>{currentItem.sectionTitle}</span>
                </span>
                <span style={{ color: 'var(--border-subtle)' }}>/</span>
                <span style={{ color: 'var(--text-title)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  {currentItem.icon}
                  <span>{currentItem.label}</span>
                </span>
              </div>

              {/* MODO DE LECTURA: FOCO VS CONTINUO (SOLO EN CAPAS) */}
              {currentItem.type === 'layer' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-hover)', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => setReadingMode('single')}
                    style={{
                      border: 'none',
                      background: readingMode === 'single' ? 'var(--bg-card)' : 'transparent',
                      color: readingMode === 'single' ? '#3b82f6' : 'var(--text-muted)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: readingMode === 'single' ? 800 : 600,
                      cursor: 'pointer',
                      boxShadow: readingMode === 'single' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    🎯 Vista Focalizada
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadingMode('continuous')}
                    style={{
                      border: 'none',
                      background: readingMode === 'continuous' ? 'var(--bg-card)' : 'transparent',
                      color: readingMode === 'continuous' ? '#3b82f6' : 'var(--text-muted)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: readingMode === 'continuous' ? 800 : 600,
                      cursor: 'pointer',
                      boxShadow: readingMode === 'continuous' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    📖 Modo Continuo (8 Paquetes / 3 Capas)
                  </button>
                </div>
              )}
            </div>

            {/* CONTENIDO MEMORIA & PRESENTACIÓN OFICIAL (5 EJES + 5 INFOGRAFÍAS) */}
            {currentItem.type === 'presentation' && (
              <ProyectoFinalPresentationTab initialAxis={currentItem.axis} />
            )}

            {/* CONTENIDO 0: PUENTE COMPARATIVO (CAPAS VS HEXAGONAL) */}
            {currentItem.type === 'comparison' && (
              <ProyectoFinalComparisonTab onNavigateToTab={handleNavigate} />
            )}

            {/* CONTENIDO 1: EVOLUCIÓN ARQUITECTURA HEXAGONAL */}
            {currentItem.type === 'hexagonal' && (
              <ProyectoFinalHexagonalTab initialSection={currentItem.sub} onNavigateToTab={handleNavigate} />
            )}

            {/* CONTENIDO 1: CAPAS BACKEND (SPRING BOOT) */}
            {currentItem.type === 'layer' && (
              <ProyectoFinalLayersTab initialLayer={currentItem.layerNum} hideSidebar={true} viewMode={readingMode} />
            )}

            {/* CONTENIDO 2: CLIENTE WEB FUNCIONAL */}
            {currentItem.type === 'frontend' && (
              <ProyectoFinalFunctionalTab initialSection={currentItem.section} hideNav={true} />
            )}

            {/* CONTENIDO 3: SIMULADOR WEB EN VIVO */}
            {currentItem.type === 'simulator' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.04) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '20px',
                  padding: '1.8rem 2rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>🌐</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-title)' }}>
                          Simulador Interactivo en Vivo (index-secure.html)
                        </h2>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                        SPA Vanilla con Bootstrap 5 y autenticación JWT Stateless consumiendo la API de Spring Boot.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                      <a
                        href="/java-studio/proyectos/libreria-capas/index-secure.html"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: '#10b981',
                          color: '#ffffff',
                          padding: '0.65rem 1.2rem',
                          borderRadius: '10px',
                          fontWeight: 750,
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
                        }}
                      >
                        Abrir en Nueva Pestaña ↗
                      </a>
                    </div>
                  </div>

                  {/* CREDENCIALES DE PRUEBA */}
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
                    <div><strong>Rol ADMIN:</strong> <code>admin</code> / <code>admin123</code> (CRUD completo, préstamos y altas)</div>
                    <div><strong>Rol USER:</strong> <code>user</code> / <code>user123</code> (Lectura y solicitud de préstamos)</div>
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
                    src="/java-studio/proyectos/libreria-capas/index-secure.html"
                    title="Simulador de index-secure.html"
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

            {/* CONTENIDO 4: PREGUNTAS DEL TRIBUNAL */}
            {currentItem.type === 'defense' && (
              <ProyectoFinalDefenseTab
                initialCategory={currentItem.category}
                hideCategoryNav={true}
                onNavigateToTab={handleNavigate}
              />
            )}

            {/* CONTENIDO 5: DOCUMENTACIÓN OFICIAL */}
            {currentItem.type === 'docs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '20px',
              padding: '1.8rem 2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📄</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-title)' }}>
                  Documentación Oficial y Memoria Técnica
                </h2>
              </div>
              <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Todos los documentos formales de entrega del proyecto generados durante el desarrollo, incluyendo la Memoria Técnica de 45 páginas, bitácora de incidencias, tablas de pruebas y plan de despliegue Docker.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>📕</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      Memoria Técnica Oficial
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>45 Páginas · PDF</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Documento formal con diagramas de clases, esquema relacional JPA, diseño DTO, seguridad JWT, capturas de pantalla de la SPA y conclusiones.
                </p>
                <a
                  href="/java-studio/proyectos/libreria-capas/documentacion/Memoria-tecnica-pdf/Memoria_Tecnica.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 'auto',
                    background: '#f59e0b',
                    color: '#ffffff',
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontWeight: 750,
                    textDecoration: 'none',
                    fontSize: '0.84rem'
                  }}
                >
                  Abrir / Descargar PDF ↗
                </a>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>📔</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      Bitácora de Desarrollo
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>BITACORA.md</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Registro diario con incidencias encontradas, soluciones adoptadas, justificación de patrones y decisiones arquitectónicas.
                </p>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Disponible en <code>public/java-studio/proyectos/libreria-capas/documentacion/</code>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>🧪</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      Tablas de Pruebas
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 700 }}>TABLAS_PRUEBAS.md</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Matriz completa de casos de prueba manuales y automatizados (Given/When/Then), validaciones 400/404/409 y control de stock.
                </p>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Disponible en <code>public/java-studio/proyectos/libreria-capas/documentacion/</code>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>🐳</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      Despliegue con Docker
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: 700 }}>DESPLIEGUE_DOCKER.md</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Instrucciones completas para construir y ejecutar la imagen Docker multi-stage del microservicio conectada al contenedor MySQL.
                </p>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Disponible en <code>public/java-studio/proyectos/libreria-capas/documentacion/</code>
                </div>
              </div>
            </div>
          </div>
        )}

            {/* CONTENIDO 6: PLAN DE RUTA (13 PASOS) */}
            {currentItem.type === 'steps' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--text-title)' }}>
                  📋 Desglose Interactivo de Pasos (Sincronizado con plan.md)
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Haz clic en las tareas para marcar tu avance real. Se guarda automáticamente.
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {normalizedSteps.map(step => {
                  const isExpanded = !!expandedSteps[step.id];
                  const stepTasks = Array.isArray(step.tasks) ? step.tasks : [];
                  const allDone = stepTasks.length > 0 && stepTasks.every(t => t.done);
                  return (
                    <div
                      key={step.id}
                      style={{
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        background: allDone ? 'rgba(16, 185, 129, 0.04)' : 'var(--bg-hover)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* STEP HEADER */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: allDone ? '#10b981' : step.color,
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              flexShrink: 0
                            }}
                          >
                            {allDone ? '✓' : step.id}
                          </span>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                              <h3 style={{ margin: 0, fontSize: '1.08rem', color: 'var(--text-title)' }}>
                                {step.title}
                              </h3>
                              <span
                                style={{
                                  padding: '0.15rem 0.55rem',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  background: allDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                  color: allDone ? '#10b981' : step.color
                                }}
                              >
                                {step.badge}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                                {step.tag}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                              {step.summary}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(step.id)}
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-title)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          {isExpanded ? '▲ Ocultar tareas' : `▼ Ver subtareas (${stepTasks.filter(t => t.done).length}/${stepTasks.length})`}
                        </button>
                      </div>

                      {/* STEP DETAILS */}
                      {isExpanded && (
                        <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}>
                            {stepTasks.map(task => (
                              <label
                                key={task.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '0.65rem',
                                  cursor: 'pointer',
                                  fontSize: '0.88rem',
                                  color: task.done ? 'var(--text-muted)' : 'var(--text-main)',
                                  textDecoration: task.done ? 'line-through' : 'none'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={task.done}
                                  onChange={() => toggleTask(step.id, task.id)}
                                  style={{ marginTop: '0.2rem', accentColor: '#10b981', cursor: 'pointer', width: '16px', height: '16px' }}
                                />
                                <span>{task.label}</span>
                              </label>
                            ))}
                          </div>

                          {step.codeSnippet && (
                            <div style={{ position: 'relative' }}>
                              <pre
                                style={{
                                  background: '#1e1e2e',
                                  padding: '1rem',
                                  borderRadius: '10px',
                                  color: '#cdd6f4',
                                  fontFamily: 'var(--font-mono, monospace)',
                                  fontSize: '0.82rem',
                                  margin: 0,
                                  overflowX: 'auto',
                                  lineHeight: '1.6'
                                }}
                              >
                                {step.codeSnippet}
                              </pre>
                              <button
                                type="button"
                                onClick={() => handleCopy(`step-${step.id}`, step.codeSnippet)}
                                style={{
                                  position: 'absolute',
                                  top: '10px',
                                  right: '10px',
                                  background: '#313244',
                                  color: '#cdd6f4',
                                  border: 'none',
                                  padding: '0.3rem 0.65rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {copiedKey === `step-${step.id}` ? '✓ ¡Copiado!' : '📋 Copiar'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        
        
            {/* CONTENIDO 7: GUÍA SPRING INITIALIZR */}
            {currentItem.type === 'initializr' && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "20px", padding: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.8rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.35rem", color: "var(--text-title)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span>🌱</span> Spring Initializr: Configuración Oficial para `library`
                  </h2>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                    Parámetros oficiales recomendados para inicializar el proyecto base en <strong>start.spring.io</strong>.
                  </p>
                </div>
                <a
                  href="https://start.spring.io/#!type=maven-project&language=java&packaging=jar&jvmVersion=21&groupId=com.accenture&artifactId=library&name=library&description=API%20REST%20Gestion%20de%20Biblioteca&packageName=com.accenture.library&dependencies=web,data-jpa,mysql,validation,security,lombok,devtools,h2"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "#10b981",
                    color: "#ffffff",
                    padding: "0.65rem 1.25rem",
                    borderRadius: "10px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.86rem",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <span>🌐</span> Abrir start.spring.io con todo seleccionado
                </a>
              </div>

              {/* PASO 1: METADATOS DEL PROYECTO */}
              <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "1.3rem", background: "var(--bg-hover)", marginBottom: "1.3rem" }}>
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "1.1rem", color: "var(--text-title)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>1️⃣</span> Metadatos del Proyecto (Project Metadata)
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                  <div style={{ background: "var(--bg-card)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Project & Language</span>
                    <strong style={{ color: "#10b981", fontSize: "0.95rem" }}>Maven · Java</strong>
                  </div>
                  <div style={{ background: "var(--bg-card)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Java Version</span>
                    <strong style={{ color: "#3b82f6", fontSize: "0.95rem" }}>Java 21 (JDK 21)</strong>
                  </div>
                  <div style={{ background: "var(--bg-card)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Group ID</span>
                    <strong style={{ color: "var(--text-title)", fontSize: "0.95rem" }}>com.accenture</strong>
                  </div>
                  <div style={{ background: "var(--bg-card)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Artifact & Name</span>
                    <strong style={{ color: "var(--text-title)", fontSize: "0.95rem" }}>library</strong>
                  </div>
                  <div style={{ background: "var(--bg-card)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Package Name</span>
                    <strong style={{ color: "var(--text-title)", fontSize: "0.95rem" }}>com.accenture.library</strong>
                  </div>
                  <div style={{ background: "var(--bg-card)", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Packaging</span>
                    <strong style={{ color: "#8b5cf6", fontSize: "0.95rem" }}>Jar</strong>
                  </div>
                </div>
              </div>

              {/* PASO 2: DEPENDENCIAS DE INITIALIZR */}
              <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "1.3rem", background: "var(--bg-hover)", marginBottom: "1.3rem" }}>
                <h3 style={{ margin: "0 0 0.8rem", fontSize: "1.1rem", color: "var(--text-title)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>2️⃣</span> Dependencias que seleccionas en start.spring.io (Starters)
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem" }}>
                  {[
                    { name: "Spring Web", id: "spring-boot-starter-web", icon: "🌐", desc: "Servidor Tomcat embebido y controladores RESTful", color: "#10b981" },
                    { name: "Spring Data JPA", id: "spring-boot-starter-data-jpa", icon: "🗄️", desc: "Persistencia relacional Hibernate y repositorios", color: "#3b82f6" },
                    { name: "MySQL Driver", id: "mysql-connector-j", icon: "🐬", desc: "Conexión a la base de datos MySQL library", color: "#06b6d4" },
                    { name: "Validation", id: "spring-boot-starter-validation", icon: "🛡️", desc: "Validaciones Bean Validation (@NotBlank, @Min, etc.)", color: "#f59e0b" },
                    { name: "Spring Security", id: "spring-boot-starter-security", icon: "🔒", desc: "Autenticación, BCrypt y filtros de acceso", color: "#f43f5e" },
                    { name: "Lombok", id: "lombok", icon: "🌶️", desc: "Reduce código repetitivo de getters, setters y constructores", color: "#ec4899" },
                    { name: "Spring Boot DevTools", id: "spring-boot-devtools", icon: "⚡", desc: "Recarga rápida en caliente al guardar cambios", color: "#8b5cf6" },
                    { name: "H2 Database", id: "h2", icon: "📦", desc: "Base de datos en memoria para tests y Docker", color: "#6366f1" }
                  ].map(dep => (
                    <div key={dep.id} style={{ background: "var(--bg-card)", padding: "0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <span>{dep.icon}</span>
                        <strong style={{ color: dep.color, fontSize: "0.92rem" }}>{dep.name}</strong>
                      </div>
                      <code style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.3rem" }}>{dep.id}</code>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4", display: "block" }}>{dep.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PASO 3: LAS 2 DEPENDENCIAS EXTERNAS QUE SE AÑADEN A MANO */}
              <div style={{ border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "16px", padding: "1.3rem", background: "rgba(245, 158, 11, 0.05)", marginBottom: "1.3rem" }}>
                <h3 style={{ margin: "0 0 0.6rem", fontSize: "1.1rem", color: "#f59e0b", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⚠️</span> Dependencias NO disponibles en Initializr (Añadidas en pom.xml)
                </h3>
                <p style={{ margin: "0 0 1rem", fontSize: "0.88rem", color: "var(--text-main)", lineHeight: "1.6" }}>
                  El enunciado oficial exige estas dos librerías con versiones exactas que no vienen en el buscador de start.spring.io y deben colocarse directamente en <code>pom.xml</code>:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
                  <div style={{ background: "var(--bg-card)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <strong style={{ color: "#10b981", display: "block", marginBottom: "0.3rem" }}>
                      📑 SpringDoc OpenAPI 3.1.1 (Swagger UI)
                    </strong>
                    <pre style={{ background: "#1e1e2e", padding: "0.75rem", borderRadius: "8px", color: "#cdd6f4", fontSize: "0.78rem", margin: 0, overflowX: "auto" }}>
{`<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>3.1.1</version>
</dependency>`}
                    </pre>
                  </div>

                  <div style={{ background: "var(--bg-card)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                    <strong style={{ color: "#f43f5e", display: "block", marginBottom: "0.3rem" }}>
                      🔑 JJWT 0.13.0 (API, Impl y Jackson)
                    </strong>
                    <pre style={{ background: "#1e1e2e", padding: "0.75rem", borderRadius: "8px", color: "#cdd6f4", fontSize: "0.78rem", margin: 0, overflowX: "auto" }}>
{`<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.13.0</version>
</dependency>
<!-- jjwt-impl y jjwt-jackson con scope runtime -->`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* PASO 4: GENERADOR AUTOMÁTICO VÍA CURL */}
              <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "1.3rem", background: "var(--bg-hover)" }}>
                <h3 style={{ margin: "0 0 0.6rem", fontSize: "1.1rem", color: "var(--text-title)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⚡</span> Inicialización Automática por Terminal (1 Línea de Comando)
                </h3>
                <p style={{ margin: "0 0 1rem", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Puedes descargar el proyecto completo <code>library.zip</code> directamente con este comando:
                </p>

                <div style={{ position: "relative" }}>
                  <pre
                    style={{
                      background: "#1e1e2e",
                      padding: "1rem",
                      borderRadius: "10px",
                      color: "#a6e3a1",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.82rem",
                      lineHeight: "1.65",
                      margin: 0,
                      overflowX: "auto"
                    }}
                  >
{`curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d baseDir=library \
  -d groupId=com.accenture \
  -d artifactId=library \
  -d name=library \
  -d packageName=com.accenture.library \
  -d packaging=jar \
  -d javaVersion=21 \
  -d dependencies=web,data-jpa,mysql,validation,security,lombok,devtools,h2 \
  -o library.zip && unzip library.zip`}
                  </pre>
                  <button
                    type="button"
                    onClick={() => handleCopy("curlInit", `curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d baseDir=library \
  -d groupId=com.accenture \
  -d artifactId=library \
  -d name=library \
  -d packageName=com.accenture.library \
  -d packaging=jar \
  -d javaVersion=21 \
  -d dependencies=web,data-jpa,mysql,validation,security,lombok,devtools,h2 \
  -o library.zip && unzip library.zip`)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#313244",
                      color: "#cdd6f4",
                      border: "none",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      cursor: "pointer"
                    }}
                  >
                    {copiedKey === "curlInit" ? "✓ ¡Copiado!" : "📋 Copiar Comando"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

            {/* CONTENIDO 8: ESTRUCTURA DE CARPETAS */}
            {currentItem.type === 'structure' && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "20px", padding: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.8rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.35rem", color: "var(--text-title)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span>📁</span> Estructura Completa de Carpetas y Ficheros (`library/`)
                  </h2>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                    Estructura oficial para el desarrollo y entrega en la rama <strong>SPRING-BOOT</strong>.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.3rem 0.75rem", borderRadius: "8px", fontWeight: 700 }}>
                    📍 /Users/blanca/Desktop/Proyecto-acc/library
                  </span>
                </div>
              </div>

              {/* TREE DISPLAY TERMINAL CARD */}
              <div style={{ position: "relative", marginBottom: "2rem" }}>
                <pre
                  style={{
                    background: "#1e1e2e",
                    padding: "1.4rem",
                    borderRadius: "14px",
                    color: "#cdd6f4",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.85rem",
                    lineHeight: "1.75",
                    margin: 0,
                    overflowX: "auto",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
                  }}
                >
{`library/
├── pom.xml                                    <-- Configurado con Java 21 y dependencias oficiales
├── db/
│   └── init.sql                               <-- Script MySQL con las tablas y datos de prueba
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/accenture/library/
    │   │       ├── LibraryApplication.java    <-- Clase principal @SpringBootApplication
    │   │       ├── config/                    <-- OpenApiConfig (Swagger UI y esquemas)
    │   │       ├── controller/                <-- BookController, AuthorController, CategoryController, LoanController, AuthController
    │   │       ├── dto/                       <-- RequestDTO y ResponseDTO de cada entidad
    │   │       ├── exception/                 <-- GlobalExceptionHandler y custom exceptions (404, 400, 409)
    │   │       ├── mapper/                    <-- Mappers manuales (sin lambdas ni streams)
    │   │       ├── model/                     <-- Entidades JPA (Book, Author, Category, Loan) y enum LoanStatus
    │   │       ├── repository/                <-- Interfaces Spring Data JPA con soporte Pageable
    │   │       ├── security/                  <-- SecurityConfig, JwtService, JwtAuthenticationFilter
    │   │       ├── service/                   <-- Interfaces e implementaciones Service (@Transactional)
    │   │       └── validation/                <-- Validaciones personalizadas de clase (@ValidStock)
    │   └── resources/
    │       ├── application.properties         <-- Configuración principal con MySQL (puerto 8080)
    │       └── application-docker.properties  <-- Perfil para contenedor Docker con H2
    └── test/
        ├── java/
        │   └── com/accenture/library/         <-- Paquetes para los 12 tests oficiales
        │       ├── controller/                <-- Tests @WebMvcTest con MockMvc
        │       ├── mapper/                    <-- Test unitario cálculo OVERDUE
        │       ├── security/                  <-- Test generación JWT y rol
        │       ├── service/                   <-- Tests unitarios con Mockito
        │       └── validation/                <-- Test validador de stock
        └── resources/
            └── application-test.properties    <-- Perfil para los tests con H2 en memoria`}
                </pre>
                <button
                  type="button"
                  onClick={() => handleCopy("treeCode", `library/
├── pom.xml
├── db/
│   └── init.sql
└── src/
    ├── main/
    │   ├── java/com/accenture/library/
    │   │   ├── LibraryApplication.java
    │   │   ├── config/
    │   │   ├── controller/
    │   │   ├── dto/
    │   │   ├── exception/
    │   │   ├── mapper/
    │   │   ├── model/
    │   │   ├── repository/
    │   │   ├── security/
    │   │   ├── service/
    │   │   └── validation/
    │   └── resources/
    │       ├── application.properties
    │       └── application-docker.properties
    └── test/
        ├── java/com/accenture/library/
        │   ├── controller/
        │   ├── mapper/
        │   ├── security/
        │   ├── service/
        │   └── validation/
        └── resources/
            └── application-test.properties`)}
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "#313244",
                    color: "#cdd6f4",
                    border: "none",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {copiedKey === "treeCode" ? "✓ ¡Copiado!" : "📋 Copiar Árbol"}
                </button>
              </div>

              {/* GUÍA DETALLADA DE CADA CARPETA */}
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--text-title)" }}>
                🔍 Explicación de Cada Módulo y Capa
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#10b981", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    📄 pom.xml & db/init.sql
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Configuración de Java 21, Spring Boot 4.1.1, MySQL, Swagger y JJWT. El script SQL crea idempotentemente la base de datos y datos coherentes de stock.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#3b82f6", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    📦 model/ (Entidades JPA)
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Clases `Book`, `Author`, `Category`, `Loan` y enum `LoanStatus`. Respetan exactamente la estructura de MySQL para superar `ddl-auto=validate`.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#8b5cf6", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    🗄️ repository/ (Persistencia)
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Interfaces Spring Data JPA con soporte de paginación (`Pageable`) y consultas por categoría, autor, estado de préstamos e ISBN.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#f59e0b", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    📋 dto/ & validation/
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Request/Response DTOs con validaciones Bean Validation (`@NotBlank`, `@Size`, etc.) y el validador a nivel de clase `@ValidStock`.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#ec4899", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    🔄 mapper/ (Sin Lambdas ni Streams)
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Transformación manual de objetos con bucles tradicionales y cálculo en tiempo de ejecución del estado `OVERDUE` para préstamos vencidos.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#6366f1", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    💼 service/ (Lógica de Negocio)
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Lógica transaccional (`@Transactional`): control estricto de decremento/incremento de stock y fechas al crear y devolver préstamos.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#0ea5e9", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    🌐 controller/ & config/
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Controladores RESTful con paginación, filtros opcionales y documentación Swagger OpenAPI en `/swagger-ui.html`.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#f43f5e", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    🔒 security/ (JWT & Roles)
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    Filtro de autenticación stateless con tokens JWT, endpoints públicos y restricción de escritura solo para el rol `ADMIN`.
                  </span>
                </div>

                <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "1.1rem" }}>
                  <strong style={{ color: "#a855f7", display: "block", marginBottom: "0.3rem", fontSize: "0.95rem" }}>
                    🧪 test/ (Los 12 Tests Oficiales)
                  </strong>
                  <span style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: "1.6", display: "block" }}>
                    12 tests unitarios e integrados con H2 en memoria y comentarios obligatorios `// Given`, `// When` y `// Then`.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

            {/* CONTENIDO 9: ESQUEMA DE BASE DE DATOS & RELACIONES JPA */}
            {currentItem.type === 'database' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* DIAGRAMA RELACIONAL */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-title)' }}>
                🗄️ Esquema de Base de Datos y Relaciones JPA
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
                El esquema de MySQL debe mapearse de forma exacta. La aplicación arranca con <code>spring.jpa.hibernate.ddl-auto=validate</code>, por lo que cualquier discrepancia en nombres de columnas o tipos impedirá el arranque del servidor.
              </p>

              {/* VISUAL CARDS DEL MODELO */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                {/* CATEGORY */}
                <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <strong style={{ color: '#10b981', fontSize: '1.05rem' }}>📂 category</strong>
                    <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>1 a N (Book)</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li><code>id</code>: BIGINT (PK, AutoInc)</li>
                    <li><code>name</code>: VARCHAR(100) (Único, Not Null)</li>
                    <li><code>description</code>: VARCHAR(500) (Nullable)</li>
                  </ul>
                </div>

                {/* BOOK */}
                <div style={{ background: 'var(--bg-hover)', border: '2px solid #3b82f6', borderRadius: '14px', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <strong style={{ color: '#3b82f6', fontSize: '1.05rem' }}>📖 book (Entidad Núcleo)</strong>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>N a N / 1 a N</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li><code>id</code>: BIGINT (PK, AutoInc)</li>
                    <li><code>title</code>: VARCHAR(150) (Not Null)</li>
                    <li><code>isbn</code>: VARCHAR(20) (Único, Not Null)</li>
                    <li><code>published_year</code>: INT</li>
                    <li><code>available_stock</code>: INT (Min 0)</li>
                    <li><code>total_stock</code>: INT (Min 1)</li>
                    <li><code>category_id</code>: BIGINT (FK Opcional)</li>
                  </ul>
                </div>

                {/* AUTHOR */}
                <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <strong style={{ color: '#8b5cf6', fontSize: '1.05rem' }}>✍️ author</strong>
                    <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>N a N (Book)</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li><code>id</code>: BIGINT (PK, AutoInc)</li>
                    <li><code>first_name</code>: VARCHAR(100) (Not Null)</li>
                    <li><code>last_name</code>: VARCHAR(100) (Not Null)</li>
                    <li><code>nationality</code>: VARCHAR(100) (Nullable)</li>
                  </ul>
                </div>

                {/* BOOK_AUTHOR */}
                <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <strong style={{ color: '#f59e0b', fontSize: '1.05rem' }}>🔗 book_author (Intermedia)</strong>
                    <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>PK Compuesta</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li><code>book_id</code>: BIGINT (FK a book.id)</li>
                    <li><code>author_id</code>: BIGINT (FK a author.id)</li>
                    <li><strong>PK:</strong> (book_id, author_id)</li>
                  </ul>
                </div>

                {/* LOAN */}
                <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <strong style={{ color: '#ec4899', fontSize: '1.05rem' }}>📑 loan (Préstamo)</strong>
                    <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>N a 1 (Book)</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    <li><code>id</code>: BIGINT (PK, AutoInc)</li>
                    <li><code>loan_date</code>: DATE (Not Null)</li>
                    <li><code>expected_return_date</code>: DATE (Not Null)</li>
                    <li><code>actual_return_date</code>: DATE (Nullable)</li>
                    <li><code>status</code>: VARCHAR(20) (ACTIVE / RETURNED)</li>
                    <li><code>book_id</code>: BIGINT (FK a book.id)</li>
                  </ul>
                </div>
              </div>

              {/* REGLAS CLAVE DE NEGOCIO */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '1.2rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>⚖️</span> Regla Matemática de Stock
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                    En todo momento debe cumplirse:
                    <br />
                    <code style={{ display: 'inline-block', margin: '0.4rem 0', fontWeight: 700, color: '#10b981' }}>
                      available_stock = total_stock - COUNT(préstamos ACTIVE)
                    </code>
                    <br />
                    Al crear un préstamo <code>available_stock</code> resta 1. Al devolver el libro (pasar a <code>RETURNED</code>) <code>available_stock</code> suma 1.
                  </p>
                </div>

                <div style={{ background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: '14px', padding: '1.2rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>⏳</span> Cálculo Dinámico de Estado OVERDUE
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                    <strong>El valor <code>OVERDUE</code> NUNCA se persiste en la base de datos.</strong>
                    <br />
                    En MySQL solo se guardan <code>ACTIVE</code> y <code>RETURNED</code>. El estado <code>OVERDUE</code> se calcula al responder al cliente en el Mapper si el préstamo sigue <code>ACTIVE</code> y la fecha esperada es anterior a hoy (<code>expectedReturnDate &lt; LocalDate.now()</code>).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

            {/* CONTENIDO 10: SUITE DE 12 TESTS OFICIALES */}
            {currentItem.type === 'tests' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--text-title)' }}>
              🧪 Los 12 Tests Obligatorios del Enunciado
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
              Todos los tests deben contener comentarios explícitos <code>// Given</code>, <code>// When</code> y <code>// Then</code>. La suite completa debe ejecutarse en verde con <code>mvn clean test</code>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
              {[
                { num: 1, capa: 'Controller (@WebMvcTest)', desc: 'Crear libro válido retorna HTTP 201 Created y header Location', color: '#0ea5e9' },
                { num: 2, capa: 'Controller (@WebMvcTest)', desc: 'Crear libro con datos inválidos (título vacío, stock negativo) retorna HTTP 400 Bad Request', color: '#0ea5e9' },
                { num: 3, capa: 'Controller (@WebMvcTest)', desc: 'Obtener libro por ID inexistente retorna HTTP 404 Not Found', color: '#0ea5e9' },
                { num: 4, capa: 'Controller (@WebMvcTest)', desc: 'Endpoint protegido invocado sin token retorna HTTP 401 Unauthorized o 403 Forbidden', color: '#0ea5e9' },
                { num: 5, capa: 'Service (Mockito)', desc: 'Crear préstamo con éxito disminuye en 1 el availableStock del libro', color: '#6366f1' },
                { num: 6, capa: 'Service (Mockito)', desc: 'Crear préstamo de libro con availableStock = 0 lanza BusinessRuleException', color: '#6366f1' },
                { num: 7, capa: 'Service (Mockito)', desc: 'Devolver préstamo incrementa en 1 el availableStock y guarda actualReturnDate con la fecha actual', color: '#6366f1' },
                { num: 8, capa: 'Service (Mockito)', desc: 'Devolver un préstamo que ya estaba en estado RETURNED lanza BusinessRuleException', color: '#6366f1' },
                { num: 9, capa: 'Mapper (Unitario)', desc: 'Mapeo de Loan asigna dinámicamente status = OVERDUE si expectedReturnDate es anterior a hoy y status es ACTIVE', color: '#ec4899' },
                { num: 10, capa: 'Security (Unitario)', desc: 'Generación correcta de token JWT conteniendo el username y los roles en los claims', color: '#f43f5e' },
                { num: 11, capa: 'Security (Unitario)', desc: 'Validación y extracción correcta de claims a partir de un token JWT firmado válido', color: '#f43f5e' },
                { num: 12, capa: 'Validation (Unitario)', desc: 'Validador personalizado de clase rechaza un BookRequestDto cuando availableStock > totalStock', color: '#f59e0b' }
              ].map(test => (
                <div
                  key={test.num}
                  style={{
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1.1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <span style={{ fontWeight: 800, color: test.color, fontSize: '0.92rem' }}>
                      Test {test.num}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'var(--bg-card)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      {test.capa}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    {test.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

            {/* CONTENIDO 11: COMANDOS DE TERMINAL & DOCKER */}
            {currentItem.type === 'terminal' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-title)' }}>
              ⚡ Comandos Esenciales para el Proyecto
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                {
                  id: 'mysql-init',
                  title: '1. Ejecutar el script SQL de inicialización en MySQL',
                  cmd: 'mysql -u root -p library < "db/init.sql"'
                },
                {
                  id: 'mvn-compile',
                  title: '2. Compilar el proyecto con Maven',
                  cmd: 'mvn clean compile'
                },
                {
                  id: 'mvn-test',
                  title: '3. Ejecutar los 12 tests unitarios e integrados',
                  cmd: 'mvn clean test'
                },
                {
                  id: 'mvn-run',
                  title: '4. Arrancar la aplicación Spring Boot en puerto 8080',
                  cmd: 'mvn spring-boot:run'
                },
                {
                  id: 'docker-build',
                  title: '5. Construir la imagen Docker multi-stage',
                  cmd: 'docker build -t library-api:latest .'
                },
                {
                  id: 'docker-run',
                  title: '6. Arrancar contenedor Docker con perfil en memoria H2',
                  cmd: 'docker run -p 8080:8080 library-api:latest'
                }
              ].map(item => (
                <div key={item.id} style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: 'var(--text-title)' }}>
                    {item.title}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <pre
                      style={{
                        background: '#1e1e2e',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        color: '#a6e3a1',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.84rem',
                        margin: 0,
                        overflowX: 'auto'
                      }}
                    >
                      {item.cmd}
                    </pre>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.cmd)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#313244',
                        color: '#cdd6f4',
                        border: 'none',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedKey === item.id ? '✓ ¡Copiado!' : '📋 Copiar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

            {/* CONTENIDO 12: REGLAS Y PROHIBICIONES */}
            {currentItem.type === 'rules' && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>⚠️</span> Reglas Críticas del Enunciado (Peligro de Suspenso en Defensa)
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '1.2rem' }}>
                    <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>
                      🚫 1. Prohibido Expresiones Lambda y Stream API
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      El código dentro de <code>src/main</code> <strong>NO puede contener</strong> expresiones lambda (<code>-&gt;</code>), referencias a métodos (<code>::</code>) ni la Stream API (<code>.stream()</code>, <code>Collectors</code>, <code>.map()</code>, <code>.filter()</code>, <code>.forEach()</code> funcional).
                      <br />
                      Se deben utilizar bucles imperativos tradicionales: <code>for</code> clásico, <code>for-each</code> tradicional y condicionales <code>if/else</code>.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '14px', padding: '1.2rem' }}>
                    <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>
                      📖 2. Javadoc Exhaustivo Obligatorio
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      Todas las clases y métodos de <code>src/main</code> deben tener comentarios Javadoc detallados con <code>@param</code>, <code>@return</code> y <code>@throws</code>. Si se utiliza Lombok, los métodos generados automáticamente quedan exentos porque no aparecen en el código fuente.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '14px', padding: '1.2rem' }}>
                    <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>
                      🎯 3. Validación de Base de Datos Estricta
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      La aplicación arranca con <code>spring.jpa.hibernate.ddl-auto=validate</code>. No se permite generar tablas automáticamente: los nombres de tablas, tipos SQL y restricciones deben coincidir al milímetro con <code>db/init.sql</code>.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '1.2rem' }}>
                    <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>
                      🏷️ 4. Nomenclatura y Entrega
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      El repositorio debe subirse a la rama <strong><code>SPRING-BOOT</code></strong> en la carpeta:
                      <br />
                      <code>Spring Boot - Proyecto Final - Blanca De Uña/library</code>
                      <br />
                      Y el comprimido para la plataforma L2E: <code>Spring Boot - Proyecto Final - Blanca De Uña.zip</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BARRA DE NAVEGACIÓN SECUENCIAL (ANTERIOR / SIGUIENTE) */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.5rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {prevItem ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(prevItem.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '0.75rem 1.3rem',
                    color: 'var(--text-title)',
                    fontSize: '0.86rem',
                    fontWeight: 750,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>⬅</span>
                  <span>Anterior: {prevItem.icon} {prevItem.label}</span>
                </button>
              ) : <div />}

              {nextItem ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(nextItem.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  style={{
                    background: nextItem.sectionColor,
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.4rem',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    fontWeight: 750,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: `0 4px 14px ${nextItem.sectionColor}35`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Siguiente: {nextItem.icon} {nextItem.label}</span>
                  <span>➔</span>
                </button>
              ) : <div />}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
