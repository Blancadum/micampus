/**
 * Estructura de Bloques y Temas de la Guía Técnica Flujo MCP en Spring AI.
 * Permite renderizar de forma desacoplada y mantenible el temario completo.
 */
export const SPRING_AI_GUIA_BLOQUES = [
  {
    id: 'bloque-1',
    numero: 1,
    titulo: '📌 Bloque 1: Cimientos y Arquitectura Backend Profesional',
    descripcion: 'Todo motor de Inteligencia Artificial empresarial requiere una arquitectura de software sólida, modular y limpia sobre la que asentarse. Integrar modelos de lenguaje o bases de datos vectoriales en un código desordenado o altamente acoplado genera deuda técnica inmanejable.',
    temas: [
      {
        id: 'tema-1',
        titulo: 'Tema 1: El Núcleo de Spring Boot',
        puntos: [
          { num: '1.1', texto: 'Tres pilares: Autoconfiguración inteligente, servidor embebido y opiniones firmes (starters).' },
          { num: '1.2', texto: 'Contenedor IoC y ciclo de vida de los Beans.' },
          { num: '1.3', texto: 'Patrón Singleton y requisito innegociable Stateless en peticiones concurrentes a LLMs.' }
        ]
      },
      {
        id: 'tema-2',
        titulo: 'Tema 2: Arquitectura en 3 Capas y Principios SOLID',
        puntos: [
          { num: '2.1', texto: 'Estructura en 3 capas: Presentación (@RestController), Negocio (@Service) y Datos (@Repository).' },
          { num: '2.2', texto: 'Regla de dependencias descendentes e Inversión de dependencias (D en SOLID) mediante constructor.' }
        ]
      },
      {
        id: 'tema-3',
        titulo: 'Tema 3: Diseño de APIs RESTful',
        puntos: [
          { num: '3.1', texto: 'Semántica y códigos de respuesta HTTP estándar (GET, POST, PUT, PATCH, DELETE).' },
          { num: '3.2', texto: 'Implementación de DTOs con validación declarativa (@Valid) y respuestas con ResponseEntity.' }
        ]
      }
    ]
  },
  {
    id: 'bloque-2',
    numero: 2,
    titulo: '📌 Bloque 2: Integración de IA Generativa con Spring AI',
    descripcion: 'Uso del marco oficial de Spring diseñado para tratar a los modelos de lenguaje (LLMs) como si fuesen servicios estándar en Java.',
    temas: [
      {
        id: 'tema-4',
        titulo: 'Tema 4: La Abstracción ChatClient',
        puntos: [
          { num: '1.1', texto: 'Configuración fluida y unificada con ChatClient.Builder.' },
          { num: '1.2', texto: 'Conmutación transparente entre proveedores (Anthropic Claude, Ollama, OpenAI) sin modificar código Java.' }
        ]
      },
      {
        id: 'tema-5',
        titulo: 'Tema 5: Patrones de Inferencia y Control de Salida',
        puntos: [
          { num: '2.1', texto: 'System Prompts para guiar el rol del modelo y delimitar directivas de seguridad.' },
          { num: '2.2', texto: 'Output Converters para domesticar la salida probabilística forzando Java Records tipados.' }
        ]
      },
      {
        id: 'tema-6',
        titulo: 'Tema 6: Model Context Protocol (MCP) de Anthropic',
        puntos: [
          { num: '3.1', texto: 'Fundamentos y arquitectura del protocolo MCP.' },
          { num: '3.2', texto: 'Flujo de secuencia de 9 pasos entre Cliente, Spring Boot, Claude LLM y servicios Java.' },
          { num: '3.3', texto: 'Exposición de servicios de negocio mediante la anotación @Tool.' }
        ]
      }
    ]
  },
  {
    id: 'bloque-3',
    numero: 3,
    titulo: '📌 Bloque 3: RAG Privado Local (Retrieval-Augmented Generation)',
    descripcion: 'Solución definitiva al problema de alucinaciones y confidencialidad de datos corporativos.',
    temas: [
      {
        id: 'tema-7',
        titulo: 'Tema 7: Fundamentos de la Arquitectura RAG',
        puntos: [
          { num: '1.1', texto: 'Superación de alucinaciones y ausencia de datos privados.' },
          { num: '1.2', texto: 'El pipeline de 4 fases: Ingesta ➔ Chunking semántico ➔ Embeddings ➔ Indexación en VectorStore.' }
        ]
      },
      {
        id: 'tema-8',
        titulo: 'Tema 8: Vectors & Vector Store en Spring AI',
        puntos: [
          { num: '2.1', texto: 'PGVector en PostgreSQL: Búsqueda por similitud semántica mediante distancia coseno e índices HNSW.' },
          { num: '2.2', texto: 'Inferencia local con Ollama: Privacidad absoluta, coste cero por token y operatividad offline.' }
        ]
      }
    ]
  },
  {
    id: 'bloque-4',
    numero: 4,
    titulo: '📌 Bloque 4: Orquestación Híbrida y Despliegue Enterprise',
    descripcion: 'Ensamblado industrial de arquitectura híbrida (RAG Local + Razonamiento en la Nube con Claude 3.5 Sonnet).',
    temas: [
      {
        id: 'tema-9',
        titulo: 'Tema 9: Despliegue de Infraestructura con Docker',
        puntos: [
          { num: '1.1', texto: 'Orquestación con docker-compose.yml: contenedores PGVector y Ollama con healthchecks automáticos (pg_isready).' }
        ]
      },
      {
        id: 'tema-10',
        titulo: 'Tema 10: Flujo Híbrido RAG Local + Agente Anthropic Claude',
        puntos: [
          { num: '2.1', texto: 'Implementación del servicio Java RAGLocalMCPToolService con @Tool.' },
          { num: '2.2', texto: 'Configuración en application.yml para gateway híbrido seguro.' }
        ]
      },
      {
        id: 'tema-11',
        titulo: 'Tema 11: Calidad, Testing y Monitorización',
        puntos: [
          { num: '3.1', texto: 'Pruebas unitarias con JUnit 5 y Mockito aislando herramientas.' },
          { num: '3.2', texto: 'Monitorización de salud con Spring Boot Actuator (/actuator/health).' },
          { num: '3.3', texto: 'Evaluadores de alucinación y fidelidad de Spring AI.' }
        ]
      }
    ]
  },
  {
    id: 'bloque-5',
    numero: 5,
    titulo: '📌 Bloque 5: Síntesis Arquitectónica y Directivas',
    descripcion: 'Directrices maestras de diseño y catálogo de resolución de problemas en arquitecturas cognitivas.',
    temas: [
      {
        id: 'tema-12',
        titulo: 'Tema 12: Arquitectura Completa End-to-End',
        puntos: [
          { num: '1.1', texto: 'Diagrama de topología integral: Usuario ➔ Controller ➔ ChatClient ➔ Claude ◄(MCP)► @Tool Java ➔ RAG Local.' }
        ]
      },
      {
        id: 'tema-13',
        titulo: 'Tema 13: Matriz de Patrones de Inferencia en Spring AI',
        puntos: [
          { num: '2.1', texto: 'Catálogo exhaustivo de 7 desafíos en IA Generativa vs solución técnica en Spring AI.' }
        ]
      },
      {
        id: 'tema-14',
        titulo: 'Tema 14: Directivas de Configuración e Implementación para Agentes',
        puntos: [
          { num: '3.1', texto: 'Reglas maestras para redactar descripciones de @Tool, inyectar ToolCallbackProvider y conmutación desacoplada.' }
        ]
      }
    ]
  }
];
