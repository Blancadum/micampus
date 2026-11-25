import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ifcdCourse from '../../../../../public/data/extra/ifcd0177_curso.json';
import { QUIZZES } from '../../../../data/javaStudio/studioData.js';
import { getQuizzesForPooLesson } from '../../../../data/javaStudio/quizTheoryMapping.js';
import StudioCodeBlock from '../StudioCodeBlock.jsx';
import StudioDiagramModal from '../StudioDiagramModal.jsx';
import StudioAutoevaluacionQuiz from '../StudioAutoevaluacionQuiz.jsx';
import StudioTerminalModal from '../StudioTerminalModal.jsx';
import { IconArrowLeft, IconArrowRight, IconSearch, IconTerminal } from '../StudioIcons.jsx';

const MODULES = [
  { id: 'all', label: 'Todos los Temas (22)' },
  { id: 'M1', label: 'M1: Fundamentos POO (6)' },
  { id: 'M2', label: 'M2: SOLID & Patrones (6)' },
  { id: 'M3', label: 'M3: Persistencia & JPA (5)' },
  { id: 'M4', label: 'M4: Spring Framework (5)' }
];

// Mapeo de diagramas visuales vinculados a lecciones de POO, SOLID, JPA y Spring
const POO_LESSON_DIAGRAMS_MAP = {
  'm2-1-principios-solid': [
    {
      titulo: 'Principios de Dependencias de Robert C. Martin (SOLID)',
      subtitulo: 'Reglas de inversión y acoplamiento para arquitectura mantenible y testeable.',
      src: '/springboot/media/diagramas/arquitectura/18_Dependencias_principios_Robert_Martin.png',
      etiqueta: 'SOLID & DIP'
    }
  ],
  'm2-2-patrones-creacionales': [
    {
      titulo: 'Patrón Singleton: Una Sola Instancia de Acceso Global',
      subtitulo: 'Implementación con constructor privado, instancia estática y acceso seguro.',
      src: '/springboot/media/diagramas/patrones/Singleton_unaclase_solo_una_instancia_acceso_global.png',
      etiqueta: 'Patrón Singleton'
    },
    {
      titulo: 'Patrón Builder: Construcción Paso a Paso de Objetos Complejos',
      subtitulo: 'Evita constructores telescópicos y garantiza inmutabilidad.',
      src: '/springboot/media/infografias/patrones/gof/builder.png',
      etiqueta: 'Patrón Builder'
    },
    {
      titulo: 'Patrón Factory Method: Creación Desacoplada',
      subtitulo: 'Delega la instanciación en subclases o notificadores especializados.',
      src: '/springboot/media/infografias/patrones/gof/notificador-factory.png',
      etiqueta: 'Factory Method'
    },
    {
      titulo: 'Patrón Abstract Factory: Familias de Objetos Relacionados',
      subtitulo: 'Interfaz unificada para crear familias completas sin acoplarse a clases concretas.',
      src: '/springboot/media/infografias/patrones/gof/fabricadetema.png',
      etiqueta: 'Abstract Factory'
    },
    {
      titulo: 'Patrón Prototype: Clonación Dinámica de Instancias',
      subtitulo: 'Copia objetos complejos existentes sin depender de sus jerarquías de clases.',
      src: '/springboot/media/infografias/patrones/gof/PROTOTYPE.png',
      etiqueta: 'Prototype'
    }
  ],
  'm2-3-patrones-estructurales': [
    {
      titulo: 'Patrón Adapter: Compatibilidad de Interfaces Incompatibles',
      subtitulo: 'Permite que clases con interfaces dispares colaboren como puente.',
      src: '/springboot/media/infografias/patrones/gof/adapter.png',
      etiqueta: 'Patrón Adapter'
    },
    {
      titulo: 'Patrón Facade: Interfaz Simplificada de Subsistemas Complejos',
      subtitulo: 'Punto de entrada unificado que oculta la complejidad interna.',
      src: '/springboot/media/infografias/patrones/gof/farcade.png',
      etiqueta: 'Patrón Facade'
    },
    {
      titulo: 'Patrón Composite: Estructuras Jerárquicas en Árbol',
      subtitulo: 'Trata objetos individuales y compuestos de forma homogénea.',
      src: '/springboot/media/infografias/patrones/gof/composite.png',
      etiqueta: 'Patrón Composite'
    },
    {
      titulo: 'Patrón Decorator: Adición Dinámica de Responsabilidades',
      subtitulo: 'Envuelve objetos para extender funcionalidad sin recurrir a herencia rígida.',
      src: '/springboot/media/infografias/patrones/gof/decorator.png',
      etiqueta: 'Patrón Decorator'
    },
    {
      titulo: 'Patrón Proxy: Control de Acceso y Representación Intermedia',
      subtitulo: 'Sustituto o intermediario que gestiona carga diferida, seguridad o caché.',
      src: '/springboot/media/infografias/patrones/gof/proxy.png',
      etiqueta: 'Patrón Proxy'
    },
    {
      titulo: 'Patrón Bridge: Desacoplamiento de Abstracción e Implementación',
      subtitulo: 'Permite que ambas dimensiones varíen independientemente.',
      src: '/springboot/media/infografias/patrones/gof/bridge.png',
      etiqueta: 'Patrón Bridge'
    },
    {
      titulo: 'Patrón Flyweight: Compartición Ligera de Estado Intrínseco',
      subtitulo: 'Reduce el consumo de memoria compartiendo eficientemente millones de objetos.',
      src: '/springboot/media/infografias/patrones/gof/flyweight.png',
      etiqueta: 'Patrón Flyweight'
    }
  ],
  'm2-4-patrones-comportamiento': [
    {
      titulo: 'Patrón Observer: Suscripción y Notificación de Eventos',
      subtitulo: 'Mecanismo uno-a-muchos para notificar cambios de estado a dependientes.',
      src: '/springboot/media/infografias/patrones/gof/observer.png',
      etiqueta: 'Patrón Observer'
    },
    {
      titulo: 'Patrón Strategy: Familia de Algoritmos Intercambiables',
      subtitulo: 'Encapsula algoritmos en clases separadas intercambiables en tiempo de ejecución.',
      src: '/springboot/media/infografias/patrones/gof/strategy.png',
      etiqueta: 'Patrón Strategy'
    },
    {
      titulo: 'Patrón State: Comportamiento según Estado Interno',
      subtitulo: 'Permite a un objeto alterar su lógica cuando su estado interno cambia.',
      src: '/springboot/media/infografias/patrones/gof/state.png',
      etiqueta: 'Patrón State'
    },
    {
      titulo: 'Patrón Chain of Responsibility: Cadena de Manejadores',
      subtitulo: 'Pasa la petición a lo largo de una cadena de receptores hasta que uno la procesa.',
      src: '/springboot/media/infografias/patrones/gof/Chain of Responsibility.png',
      etiqueta: 'Chain of Resp.'
    },
    {
      titulo: 'Patrón Command: Encapsulación de Acciones como Objetos',
      subtitulo: 'Convierte peticiones en objetos con soporte para colas, deshacer y logs.',
      src: '/springboot/media/infografias/patrones/gof/comand.png',
      etiqueta: 'Patrón Command'
    },
    {
      titulo: 'Patrón Iterator: Recorrido Secuencial de Colecciones',
      subtitulo: 'Acceso a elementos de un agregado sin exponer su estructura subyacente.',
      src: '/springboot/media/infografias/patrones/gof/ITERATOR.png',
      etiqueta: 'Patrón Iterator'
    },
    {
      titulo: 'Patrón Mediator: Comunicación Centralizada entre Colegas',
      subtitulo: 'Reduce dependencias mutuas directas forzando colaboración mediante un mediador.',
      src: '/springboot/media/infografias/patrones/gof/mediator.png',
      etiqueta: 'Patrón Mediator'
    },
    {
      titulo: 'Patrón Memento: Restauración de Estado sin Romper Encapsulamiento',
      subtitulo: 'Captura y exterioriza el estado interno para permitir volver atrás (Undo).',
      src: '/springboot/media/infografias/patrones/gof/memento.png',
      etiqueta: 'Patrón Memento'
    },
    {
      titulo: 'Patrón Template Method: Esqueleto de Algoritmo en Superclase',
      subtitulo: 'Define los pasos de un algoritmo permitiendo a subclases redefinir pasos.',
      src: '/springboot/media/infografias/patrones/gof/template-method.png',
      etiqueta: 'Template Method'
    },
    {
      titulo: 'Patrón Visitor: Nuevas Operaciones sin Modificar Clases',
      subtitulo: 'Separa un algoritmo de la estructura de objetos sobre la que opera.',
      src: '/springboot/media/infografias/patrones/gof/visitor.png',
      etiqueta: 'Patrón Visitor'
    }
  ],
  'm2-6-antipatrones-refactorizacion': [
    {
      titulo: 'Antipatrones GoF & Deuda Técnica en Java',
      subtitulo: 'God Object, Lava Flow, Golden Hammer, Singletonitis y estrategias de refactorización.',
      src: '/springboot/media/diagramas/arquitectura/01_codigo_diseno_arquitectura.png',
      etiqueta: 'Antipatrones & Clean Code'
    }
  ],
  'm3-1-jdbc-a-orm': [
    {
      titulo: 'Patrón DAO (Data Access Object) y Persistencia Relacional',
      subtitulo: 'Aislamiento del modelo de negocio frente al motor de base de datos.',
      src: '/springboot/media/diagramas/persistencia/dao_data_access_object.png',
      etiqueta: 'Patrón DAO'
    },
    {
      titulo: 'Persistencia de Base de Datos y Modelo Relacional',
      subtitulo: 'Mapeo conceptual entre tablas SQL y entidades orientadas a objetos.',
      src: '/springboot/media/diagramas/persistencia/015_Persistencia_bbdd.png',
      etiqueta: 'Persistencia BBDD'
    }
  ],
  'm3-2-anotaciones-jpa': [
    {
      titulo: 'Mapeo Entidad JPA y Ciclo de Vida',
      subtitulo: 'Anotaciones @Entity, @Id, @Column y sincronización con EntityManager.',
      src: '/springboot/media/diagramas/persistencia/015_Persistencia_bbdd.png',
      etiqueta: 'JPA Entities'
    }
  ],
  'm3-3-relaciones-jpa': [
    {
      titulo: 'Mapeo Objeto-Relacional: Composición y Relaciones',
      subtitulo: 'Relaciones de pertenencia, agregación y ciclo de vida en JPA.',
      src: '/springboot/media/diagramas/persistencia/mapeo_objetos_composicion.png',
      etiqueta: 'Composición ORM'
    },
    {
      titulo: 'Mapeo de Relaciones de Agregación',
      subtitulo: 'Diferencia entre relación débil (agregación) y relación fuerte (composición).',
      src: '/springboot/media/diagramas/persistencia/mapeo_objetos_agregacion.png',
      etiqueta: 'Agregación ORM'
    },
    {
      titulo: 'Diagrama UML: Relaciones entre Clases',
      subtitulo: 'Asociación, agregación, composición, dependencia y herencia.',
      src: '/springboot/media/diagramas/arquitectura/17_UML_relaciones.png',
      etiqueta: 'UML Relaciones'
    }
  ],
  'm4-1-spring-ioc-di': [
    {
      titulo: 'Inversión de Control: Desacoplamiento de Dependencias',
      subtitulo: 'Eliminación del operador new y delegación al IoC Container.',
      src: '/springboot/media/diagramas/patrones/inversion_of_control_minima_dependencia_quitarla_con_factory.png',
      etiqueta: 'IoC & Factory'
    },
    {
      titulo: 'Contenedor Central Spring Core y BeanFactory',
      subtitulo: 'Inyección de dependencias y resolución de ciclo de vida.',
      src: '/springboot/media/diagramas/patrones/spring_core_contenedorcentral.png',
      etiqueta: 'Spring Core'
    },
    {
      titulo: 'Ciclo de Creación de Objetos en Spring',
      subtitulo: 'Detección con @ComponentScan, registro e instanciación de beans.',
      src: '/springboot/media/diagramas/patrones/creacion_objetos_spring.png',
      etiqueta: 'Creación Beans'
    }
  ],
  'm4-2-springboot-arquitectura': [
    {
      titulo: 'Arquitectura Clásica en 3 Capas en Spring Boot',
      subtitulo: 'Separación estricta: Controller -> Service -> Repository.',
      src: '/springboot/media/diagramas/arquitectura/02_capas.jpg',
      etiqueta: '3 Capas'
    },
    {
      titulo: 'Organización Canónica de Paquetes en Proyecto Real',
      subtitulo: 'Estructura de paquetes en producción para aplicaciones Spring Boot.',
      src: '/springboot/media/diagramas/arquitectura/paquetes_arquitecturaspring_tienda.jpg',
      etiqueta: 'Paquetes Spring'
    },
    {
      titulo: 'Arquitectura Hexagonal (Cockburn)',
      subtitulo: 'Dominio desacoplado de frameworks con puertos y adaptadores.',
      src: '/springboot/media/diagramas/arquitectura/06_Hexagonal_Alistair_Cockburn_dependencias.png',
      etiqueta: 'Hexagonal'
    },
    {
      titulo: 'Arquitectura Cebolla (Onion)',
      subtitulo: 'Inversión de dependencias concéntricas hacia el núcleo del dominio.',
      src: '/springboot/media/diagramas/arquitectura/09_arquitectura_cebolla.png',
      etiqueta: 'Onion'
    }
  ],
  'm4-3-api-rest-spring': [
    {
      titulo: 'Arquitectura Cliente-Servidor y Protocolo HTTP',
      subtitulo: 'Comunicación RESTful sin estado sobre HTTP/HTTPS.',
      src: '/springboot/media/diagramas/api_rest/1_cliente-servidor.png',
      etiqueta: 'Cliente-Servidor'
    },
    {
      titulo: 'Petición HTTP: Método, URL, Headers y Body',
      subtitulo: 'Estructura analizada por @RestController y @RequestBody.',
      src: '/springboot/media/diagramas/api_rest/2_peticion_cliente_url_verbo_headers_body.png',
      etiqueta: 'HTTP Request'
    },
    {
      titulo: 'Buenas Prácticas REST y Separación Entidad / DTO',
      subtitulo: 'Reglas para el diseño de endpoints limpios, versionados y seguros.',
      src: '/springboot/media/diagramas/api_rest/rest_buenas_practicas.jpg',
      etiqueta: 'Buenas Prácticas'
    }
  ]
};

export default function StudioPooTab({ initialSlug = null, onSelectLesson = null }) {
  const [userModule, setUserModule] = useState(null);
  const [userLessonId, setUserLessonId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Sincronización limpia con initialSlug sin efecto secundario ni cascading renders
  const derivedInitial = useMemo(() => {
    if (!initialSlug) return null;
    const clean = String(initialSlug).toLowerCase().trim();
    if (['m1', 'm2', 'm3', 'm4'].includes(clean)) {
      const mod = clean.toUpperCase();
      const firstLesson = ifcdCourse.find(l => l.moduleShort === mod);
      return { module: mod, lessonId: firstLesson?.id || null };
    }
    const foundLesson = ifcdCourse.find(l => l.id.toLowerCase() === clean);
    if (foundLesson) {
      return { module: foundLesson.moduleShort, lessonId: foundLesson.id };
    }
    return null;
  }, [initialSlug]);

  useEffect(() => {
    if (derivedInitial?.lessonId) {
      setUserLessonId(derivedInitial.lessonId);
    }
    if (derivedInitial?.module) {
      setUserModule(derivedInitial.module);
    }
  }, [derivedInitial?.lessonId, derivedInitial?.module]);

  const selectedModule = userModule !== null ? userModule : (derivedInitial?.module || 'all');
  const selectedLessonId = userLessonId !== null ? userLessonId : (derivedInitial?.lessonId || ifcdCourse[0]?.id || 'm1-1-poo-clases-estado');

  const setSelectedModule = (mod) => {
    setUserModule(mod);
  };

  const setSelectedLessonId = (id) => {
    setUserLessonId(id);
    if (onSelectLesson) onSelectLesson(id);
  };

  // Filtrado de lecciones
  const filteredLessons = useMemo(() => {
    return ifcdCourse.filter(lesson => {
      const matchModule = selectedModule === 'all' || lesson.moduleShort === selectedModule;
      const q = searchQuery.toLowerCase().trim();
      const matchQ = !q ||
        lesson.title.toLowerCase().includes(q) ||
        (lesson.moduleTitle && lesson.moduleTitle.toLowerCase().includes(q)) ||
        (lesson.contentMd && lesson.contentMd.toLowerCase().includes(q));
      return matchModule && matchQ;
    });
  }, [selectedModule, searchQuery]);

  const currentLesson = ifcdCourse.find(l => l.id === selectedLessonId) || ifcdCourse[0];
  const currentIndex = ifcdCourse.findIndex(l => l.id === currentLesson.id);

  // Contenido markdown limpio de H1 inicial para evitar títulos duplicados
  const cleanContentMd = useMemo(() => {
    if (!currentLesson?.contentMd) return '';
    return currentLesson.contentMd.replace(/^#\s+[^\n]+\n+/, '');
  }, [currentLesson?.contentMd]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(ifcdCourse[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < ifcdCourse.length - 1) {
      setSelectedLessonId(ifcdCourse[currentIndex + 1].id);
    }
  };

  const lessonDiagrams = POO_LESSON_DIAGRAMS_MAP[currentLesson?.id] || [];

  const moduleLessons = useMemo(() => {
    if (!currentLesson?.moduleShort) return [];
    return ifcdCourse.filter(l => l.moduleShort === currentLesson.moduleShort);
  }, [currentLesson?.moduleShort]);

  // Quizzes vinculados a esta lección de POO / Certificación
  const lessonQuizzes = useMemo(
    () => getQuizzesForPooLesson(currentLesson?.id, QUIZZES),
    [currentLesson?.id]
  );

  const handlePrevDiagram = () => {
    setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : lessonDiagrams.length - 1));
  };
  const handleNextDiagram = () => {
    setActiveModalIndex((prev) => (prev < lessonDiagrams.length - 1 ? prev + 1 : 0));
  };

  // Renderizador personalizado de Markdown para code blocks fluidos
  const markdownComponents = {
    h1({ children }) {
      return (
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 1rem 0', lineHeight: 1.3 }}>
          {children}
        </h1>
      );
    },
    code({ _node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      if (!inline && match) {
        return (
          <StudioCodeBlock
            code={codeString}
            language={match[1]}
            filename={match[1] === 'java' ? 'Snippet.java' : match[1].toUpperCase()}
          />
        );
      }
      return (
        <code
          style={{
            background: '#f1f5f9',
            color: '#0f172a',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontFamily: 'monospace'
          }}
          {...props}
        >
          {children}
        </code>
      );
    }
  };

  return (
    <div className="studio-poo-container">
      {/* CONTENIDO PRINCIPAL DE LA LECCIÓN A ANCHO COMPLETO (SIN CABECERA INVASIVA) */}
      <div style={{ width: '100%', minWidth: 0 }}>
        {/* CABECERA COMPACTA DEL MÓDULO CON M1: FUNDAMENTOS */}
        <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
                Base de Ingeniería de Software (Java POO & Patrones de Diseño)
              </span>
              <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {currentLesson.moduleShort === 'M1' ? 'M1: Fundamentos Java POO, SOLID & Patrones GoF' : `${currentLesson.moduleShort}: ${currentLesson.moduleTitle}`}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                className="studio-btn-secondary"
                style={{ opacity: currentIndex <= 0 ? 0.5 : 1, cursor: currentIndex <= 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                <IconArrowLeft size={14} /> Anterior
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= ifcdCourse.length - 1}
                className="studio-btn-secondary"
                style={{ opacity: currentIndex >= ifcdCourse.length - 1 ? 0.5 : 1, cursor: currentIndex >= ifcdCourse.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                Siguiente <IconArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* BARRA DE APARTADOS DEL MÓDULO PARA APRECIAR EL CONTENIDO COMPLETO */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              overflowX: 'auto',
              padding: '0.45rem 0.65rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}
          >
            {moduleLessons.map((les) => {
              const isSelected = les.id === currentLesson.id;
              return (
                <button
                  key={les.id}
                  type="button"
                  onClick={() => setSelectedLessonId(les.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.28rem 0.6rem',
                    borderRadius: '6px',
                    border: isSelected ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                    background: isSelected ? '#6d28d9' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#475569',
                    fontSize: '0.77rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: isSelected ? '0 1px 4px rgba(109, 40, 217, 0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'all 0.12s ease'
                  }}
                  title={les.title}
                >
                  <span style={{ fontWeight: 800 }}>{les.topicNum}</span>
                  <span>{les.title.split(':')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TÍTULO PRINCIPAL DE LA LECCIÓN FUERA DE LA CAJA */}
        <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
          {currentLesson.topicNum} · {currentLesson.title}
        </h1>

        <main className="studio-card" style={{ padding: '2rem 2.25rem', minWidth: 0, borderLeft: '5px solid #6d28d9', marginBottom: '1.5rem', background: '#ffffff' }}>
          {/* CUERPO DE LA LECCIÓN FORMATEADO */}
          <div className="studio-markdown-body" style={{ lineHeight: 1.7, fontSize: '0.94rem', color: '#334155' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {cleanContentMd || 'Contenido en preparación.'}
            </ReactMarkdown>
          </div>

          {/* DIAGRAMAS CONCEPTUALES & PATRONES GOF VINCULADOS */}
          {(() => {
            const lessonDiagrams = POO_LESSON_DIAGRAMS_MAP[currentLesson?.id] || [];
            if (lessonDiagrams.length === 0) return null;
            return (
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px dashed #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>📐</span>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                      Diagramas Conceptuales & Arquitectura
                    </h3>
                  </div>
                  <span className="studio-badge studio-badge-orange" style={{ fontSize: '0.72rem' }}>
                    {lessonDiagrams.length} Diagrama{lessonDiagrams.length > 1 ? 's' : ''}
                  </span>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.86rem', color: '#64748b' }}>
                  Esquemas técnicos para reforzar visualmente los conceptos teóricos de esta lección. Haz clic en cualquier diagrama para ampliarlo a pantalla completa.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {lessonDiagrams.map((diag, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveModalIndex(idx)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(234, 88, 12, 0.15)';
                        e.currentTarget.style.borderColor = '#ea580c';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '170px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' }}>
                        <img
                          src={diag.src}
                          alt={diag.titulo}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '0.5rem' }}
                          loading="lazy"
                        />
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                          🔍 Ampliar
                        </div>
                        {diag.etiqueta && (
                          <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', background: '#ea580c', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                            {diag.etiqueta}
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                            {diag.titulo}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                            {diag.subtitulo}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* AUTOEVALUACIÓN INTERACTIVA CON PREGUNTAS DEL QUIZ OFICIAL */}
          {lessonQuizzes.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <StudioAutoevaluacionQuiz
                quizzes={lessonQuizzes}
                title={`Autoevaluación: Lección ${currentLesson.topicNum || currentIndex + 1} (${lessonQuizzes.length} Preguntas del Quiz Oficial)`}
                subtitle="Preguntas oficiales de certificación y arquitectura vinculadas a los conceptos técnicos de esta lección."
                accentColor="#6d28d9"
                quizBaseUrl="/java/studio/quiz"
              />
            </div>
          )}
        </main>
      </div>

      {/* MODAL LIGHTBOX PARA DIAGRAMA EN ALTA RESOLUCIÓN CON FONDO BLANCO Y TECLAS */}
      {activeModalIndex !== null && (
        <StudioDiagramModal
          diagrams={lessonDiagrams}
          currentIndex={activeModalIndex}
          onClose={() => setActiveModalIndex(null)}
          onPrev={handlePrevDiagram}
          onNext={handleNextDiagram}
          accentColor="#6d28d9"
        />
      )}

      {/* MODAL SIMULADOR TERMINAL */}
      <StudioTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        title="guia-didactica-java-studio.md"
        command="cat poo/secretaria/guia-didactica-java-studio.md"
        filePath="/java-studio/poo/secretaria/guia-didactica-java-studio.md"
      />
    </div>
  );
}
