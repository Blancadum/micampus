import BOOK_RAW_CHAPTERS from './bookChaptersData.json';
import { STUDIO_DATA } from './studioData.js';

// Mapeo enriquecido de diagramas por capítulo
export const BOOK_CHAPTER_DIAGRAMS = {
  'arquitectura-web': [
    {
      titulo: 'Infografía: Arquitectura Concéntrica y Hexagonal',
      subtitulo: 'Aislamiento de la lógica de negocio frente a la infraestructura y frameworks externos.',
      src: '/springboot/media/infografias/arquitectura/ARQ-HEX.png',
      etiqueta: 'Infografía Hexagonal'
    },
    {
      titulo: 'Arquitectura Monolítica Tradicional',
      subtitulo: 'Ventajas de simplicidad inicial frente a desventajas de escalado monolítico.',
      src: '/springboot/media/infografias/arquitectura/monolito-vs-microservicios/13_monolitico.png',
      etiqueta: 'Monolito'
    },
    {
      titulo: 'Arquitectura de Microservicios con Spring Cloud',
      subtitulo: 'Descomposición por dominios y comunicación distribuida entre servicios.',
      src: '/springboot/media/infografias/arquitectura/monolito-vs-microservicios/spring_microservices_arquitecture.png',
      etiqueta: 'Microservicios'
    },
    {
      titulo: 'Arquitectura Hexagonal (Cockburn)',
      subtitulo: 'El dominio en el centro, puertos de entrada/salida y desacoplamiento de infraestructura.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-hexagonal/06_Hexagonal_Alistair_Cockburn_dependencias.png',
      etiqueta: 'Hexagonal Cockburn'
    }
  ],
  'protocolo-http': [
    {
      titulo: 'Arquitectura Cliente-Servidor Stateless',
      subtitulo: 'El servidor no guarda estado de sesión en memoria; cada petición porta sus credenciales.',
      src: '/springboot/media/infografias/api_rest/1_cliente-servidor.png',
      etiqueta: 'Stateless Architecture'
    },
    {
      titulo: 'Petición HTTP, Verbos, Cabeceras y Cuerpo',
      subtitulo: 'Estructura exacta del protocolo HTTP utilizado por Spring Security y Controllers.',
      src: '/springboot/media/infografias/api_rest/2_peticion_cliente_url_verbo_headers_body.png',
      etiqueta: 'HTTP Request'
    },
    {
      titulo: 'Tipos de Headers HTTP en APIs Seguras',
      subtitulo: 'Cabeceras estándar de autenticación, control de caché, CORS y Content-Type.',
      src: '/springboot/media/infografias/api_rest/3_tipos_header.png',
      etiqueta: 'Headers HTTP'
    }
  ],
  'protocolo-https': [
    {
      titulo: 'Petición HTTP Segura sobre TLS / HTTPS',
      subtitulo: 'Cifrado simétrico y asimétrico en la capa de transporte.',
      src: '/springboot/media/infografias/api_rest/2_peticion_cliente_url_verbo_headers_body.png',
      etiqueta: 'HTTPS & TLS'
    },
    {
      titulo: 'Headers de Seguridad HTTP (HSTS, CSP)',
      subtitulo: 'Cabeceras de protección contra ataques Man-In-The-Middle y sniffing.',
      src: '/springboot/media/infografias/api_rest/3_tipos_header.png',
      etiqueta: 'Security Headers'
    }
  ],
  'json': [
    {
      titulo: 'Infografía: Bucle Infinito y Recursión Cíclica en Jackson / JPA',
      subtitulo: 'Serialización circular bidireccional que desborda la pila de memoria (StackOverflowError).',
      src: '/springboot/media/infografias/persistencia/recursividad-jpa/bucle-infinito-jpa.svg',
      etiqueta: 'Infografía Bucle Jackson'
    },
    {
      titulo: 'Evidencia Forense: java.lang.StackOverflowError en Jackson / Spring Boot',
      subtitulo: 'Captura real del colapso de la JVM al serializar entidades sin DTO.',
      src: '/springboot/media/infografias/persistencia/recursividad-jpa/libro_autor_stackoverflowerror.jpeg',
      etiqueta: 'Fallo StackOverflowError'
    }
  ],
  'jakarta-ee': [
    {
      titulo: 'Arquitectura Clásica en Capas con Jakarta EE y Spring Boot',
      subtitulo: 'Estándares Servlet, JPA, CDI y Bean Validation adoptados por Spring.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/02_capas.jpg',
      etiqueta: 'Jakarta & Spring'
    },
    {
      titulo: 'Diagrama de Integración: Spring Boot & Jakarta EE',
      subtitulo: 'Cómo Spring encapsula las APIs estándar de Jakarta bajo sus propios starters.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/arquitectura_capas_spring_jakarta.png',
      etiqueta: 'Estándares Jakarta'
    }
  ],
  'maven': [
    {
      titulo: 'Estructura Canónica de Paquetes en Proyecto Real Spring Boot',
      subtitulo: 'Distribución de controllers, entities, repositories, services, DTOs y mappers con Maven.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/paquetes_arquitecturaspring_tienda.jpg',
      etiqueta: 'Organización Maven'
    }
  ],
  'lombok': [
    {
      titulo: 'Riesgo de Recursión Cíclica en @ToString y @Data de Lombok con JPA',
      subtitulo: 'Por qué no debe usarse @Data en entidades JPA bidireccionales.',
      src: '/springboot/media/infografias/persistencia/recursividad-jpa/libro_autor_stackoverflowerror.jpeg',
      etiqueta: 'Lombok & JPA Bug'
    }
  ],
  'spring-core-modular': [
    {
      titulo: 'Contenedor Central de Spring Core (ApplicationContext / BeanFactory)',
      subtitulo: 'Gestión del ciclo de vida, resolución de beans e inyección de dependencias.',
      src: '/springboot/media/infografias/patrones/spring_core_contenedorcentral.png',
      etiqueta: 'Spring Core'
    },
    {
      titulo: 'Ciclo de Creación de Objetos en Spring Boot',
      subtitulo: 'Cómo el motor de Spring escanea componentes y gestiona la instanciación de beans.',
      src: '/springboot/media/infografias/patrones/creacion_objetos_spring.png',
      etiqueta: 'Ciclo Beans'
    }
  ],
  'spring-boot': [
    {
      titulo: 'Contenedor Central y Auto-Configuración en Spring Boot',
      subtitulo: 'Resolución condicionada de beans mediante @ConditionalOnClass y starters.',
      src: '/springboot/media/infografias/patrones/spring_core_contenedorcentral.png',
      etiqueta: 'Starters & Core'
    },
    {
      titulo: 'Ciclo de Vida de Instanciación de Beans',
      subtitulo: 'Escaneo de componentes, post-construct y precarga en el contexto de ejecución.',
      src: '/springboot/media/infografias/patrones/creacion_objetos_spring.png',
      etiqueta: 'Instanciación'
    }
  ],
  'ioc-beans': [
    {
      titulo: 'Inversión de Control: Eliminación de Dependencias con Factory',
      subtitulo: 'Desacoplamiento arquitectónico mediante inversión del flujo de control y factorías.',
      src: '/springboot/media/infografias/patrones/inversion_of_control_minima_dependencia_quitarla_con_factory.png',
      etiqueta: 'IoC & Factory'
    },
    {
      titulo: 'Contenedor Central de Spring Core (ApplicationContext / BeanFactory)',
      subtitulo: 'Gestión del ciclo de vida, resolución de beans e inyección de dependencias.',
      src: '/springboot/media/infografias/patrones/spring_core_contenedorcentral.png',
      etiqueta: 'Spring Core'
    },
    {
      titulo: 'Ciclo de Creación de Objetos en Spring Boot',
      subtitulo: 'Cómo el motor de Spring escanea componentes y gestiona la instanciación de beans.',
      src: '/springboot/media/infografias/patrones/creacion_objetos_spring.png',
      etiqueta: 'Ciclo Beans'
    },
    {
      titulo: 'Patrón Singleton: Una Sola Instancia de Acceso Global',
      subtitulo: 'Por defecto, todos los beans administrados por Spring tienen ámbito Singleton.',
      src: '/springboot/media/infografias/patrones/Singleton_unaclase_solo_una_instancia_acceso_global.png',
      etiqueta: 'Singleton Pattern'
    }
  ],
  'inyeccion-dependencias': [
    {
      titulo: 'Inversión de Control: Desacoplamiento mediante Abstracciones',
      subtitulo: 'Inyección por constructor para favorecer inmutabilidad y facilidad de pruebas.',
      src: '/springboot/media/infografias/patrones/inversion_of_control_minima_dependencia_quitarla_con_factory.png',
      etiqueta: 'DI Pattern'
    },
    {
      titulo: 'Ciclo de Creación y Cableado de Dependencias',
      subtitulo: 'Inyección e inicialización de beans en el arranque de la aplicación.',
      src: '/springboot/media/infografias/patrones/creacion_objetos_spring.png',
      etiqueta: 'Cableado DI'
    }
  ],
  'scopes-y-resoluciones': [
    {
      titulo: 'Patrón Singleton: Ámbito Predeterminado de Beans en Spring',
      subtitulo: 'Por defecto, Spring mantiene una única instancia compartida por bean en el contexto.',
      src: '/springboot/media/infografias/patrones/Singleton_unaclase_solo_una_instancia_acceso_global.png',
      etiqueta: 'Singleton Scope'
    },
    {
      titulo: 'Patrón Prototype: Nueva Instancia por Petición',
      subtitulo: 'Ámbito prototype para beans con estado mutable específico de hilo o petición.',
      src: '/springboot/media/infografias/patrones/gof/PROTOTYPE.png',
      etiqueta: 'Prototype Scope'
    }
  ],
  'arquitectura-capas': [
    {
      titulo: 'Infografía Maestra: Arquitectura Tradicional en 3 Capas',
      subtitulo: 'Flujo canónico de peticiones HTTP: Presentation (Controller) -> Business (Service) -> Data (Repository).',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/Arquitectura_tradicional_en_3_capas.png',
      etiqueta: 'Infografía 3 Capas'
    },
    {
      titulo: 'Infografía: Arquitectura Concéntrica y Hexagonal',
      subtitulo: 'Aislamiento de la lógica de negocio frente a la infraestructura y frameworks externos.',
      src: '/springboot/media/infografias/arquitectura/ARQ-HEX.png',
      etiqueta: 'Infografía Hexagonal'
    },
    {
      titulo: 'Infografía: Puertos y Adaptadores (Arquitectura Hexagonal)',
      subtitulo: 'Aislamiento del núcleo de dominio frente al framework y la base de datos con puertos in/out.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-hexagonal/Arquitectura_Hexagonal__Puertos_y_Adaptadores_capas.png',
      etiqueta: 'Infografía Hexagonal'
    },
    {
      titulo: 'Infografía: Inversión de Control en Arquitectura Hexagonal',
      subtitulo: 'Cómo las interfaces de puerto invierten las dependencias para que la infraestructura dependa del dominio.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-hexagonal/Arquitectura_hexagonal__ioc.png',
      etiqueta: 'Infografía IoC Hexagonal'
    },
    {
      titulo: 'Infografía: Acoplamiento vs Cohesión en 3 Capas',
      subtitulo: 'Beneficios de mantenibilidad, testabilidad y separación estricta de responsabilidades.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/acoplamiento-3-capas-beneficios.png',
      etiqueta: 'Infografía Beneficios'
    },
    {
      titulo: 'Infografía: Matriz de Dependencias entre Capas',
      subtitulo: 'Reglas de comunicación unidireccional permitidas y dependencias prohibidas.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/tabla-rdependencias.png',
      etiqueta: 'Infografía Dependencias'
    },
    {
      titulo: 'Arquitectura Hexagonal (Cockburn)',
      subtitulo: 'El dominio en el centro, puertos de entrada/salida y desacoplamiento de infraestructura.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-hexagonal/06_Hexagonal_Alistair_Cockburn_dependencias.png',
      etiqueta: 'Hexagonal Cockburn'
    },
    {
      titulo: 'Arquitectura Cebolla (Onion Architecture)',
      subtitulo: 'Regla de dependencias hacia el interior: Dominio -> Servicios de Dominio -> Aplicación -> Infraestructura.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-cebolla-limpia/09_arquitectura_cebolla.png',
      etiqueta: 'Onion Architecture'
    },
    {
      titulo: 'Arquitectura Clásica en 3 Capas (Controller -> Service -> Repository)',
      subtitulo: 'Flujo tradicional en 3 niveles de abstracción con Jakarta EE y Spring Boot.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/02_capas.jpg',
      etiqueta: '3 Capas'
    },
    {
      titulo: 'Estructura Canónica de Paquetes en Proyecto Real Spring Boot',
      subtitulo: 'Distribución de controllers, entities, repositories, services, DTOs y mappers en un e-commerce.',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/paquetes_arquitecturaspring_tienda.jpg',
      etiqueta: 'Organización de Paquetes'
    },
    {
      titulo: 'Niveles de Abstracción: Código, Diseño y Arquitectura',
      subtitulo: 'Los 3 niveles de abstracción necesarios para la defensa técnica de proyectos backend.',
      src: '/springboot/media/infografias/arquitectura/principios-diseno-dependencias/01_codigo_diseno_arquitectura.png',
      etiqueta: 'Diseño Software'
    }
  ],
  'principios-solid': [
    {
      titulo: 'Principios de Dependencias de Robert C. Martin (Clean Architecture)',
      subtitulo: 'La inversión de dependencias como base para poder simular colaboradores con Mockito.',
      src: '/springboot/media/infografias/arquitectura/principios-diseno-dependencias/18_Dependencias_principios_Robert_Martin.png',
      etiqueta: 'Principios SOLID'
    },
    {
      titulo: 'Relaciones UML y Niveles de Acoplamiento',
      subtitulo: 'Diferencias entre asociación, agregación y composición en diseño de clases.',
      src: '/springboot/media/infografias/arquitectura/principios-diseno-dependencias/17_UML_relaciones.png',
      etiqueta: 'UML Relaciones'
    }
  ],
  'jpa-hibernate': [
    {
      titulo: 'Infografía Maestra: Peligros de FetchType.LAZY y Soluciones',
      subtitulo: 'Cómo evitar la temida LazyInitializationException y las consultas N+1 con JOIN FETCH y EntityGraph.',
      src: '/springboot/media/infografias/peligro-fetchType_lazy_soluciones/Peligros_de_FetchType.LAZY_y_soluciones.png',
      etiqueta: 'Infografía N+1 / LAZY'
    },
    {
      titulo: 'Infografía: El Problema de Sesión Cerrada y Consulta N+1',
      subtitulo: 'Explicación gráfica de cuándo y por qué salta LazyInitializationException fuera de @Transactional.',
      src: '/springboot/media/infografias/peligro-fetchType_lazy_soluciones/problema_lazy.png',
      etiqueta: 'Infografía Problema LAZY'
    },
    {
      titulo: 'Infografía: Soluciones Técnicas para Colecciones LAZY',
      subtitulo: 'Comparativa de patrones: JOIN FETCH en JPQL, DTO Projections y @NamedEntityGraph.',
      src: '/springboot/media/infografias/peligro-fetchType_lazy_soluciones/soluciones_lazy.png',
      etiqueta: 'Infografía Soluciones'
    },
    {
      titulo: 'Infografía: Bucle Infinito y Recursión Cíclica en Relaciones JPA',
      subtitulo: 'Serialización circular en Jackson que desborda la pila de memoria (StackOverflowError).',
      src: '/springboot/media/infografias/persistencia/recursividad-jpa/bucle-infinito-jpa.svg',
      etiqueta: 'Infografía Bucle JPA'
    },
    {
      titulo: 'Evidencia Forense: java.lang.StackOverflowError en Jackson / Spring Boot',
      subtitulo: 'Captura real del colapso de la JVM al serializar entidades bidireccionales Libro <-> Autor sin DTO.',
      src: '/springboot/media/infografias/persistencia/recursividad-jpa/libro_autor_stackoverflowerror.jpeg',
      etiqueta: 'Fallo StackOverflowError'
    },
    {
      titulo: 'Infografía: Modelo de Datos Entidad-Relación',
      subtitulo: 'Diseño relacional estructurado con claves foráneas, restricciones y cardinalidad para JPA.',
      src: '/springboot/media/infografias/modelo-datos-er-relacional/Modelo_de_Datos_ER_Relacional.png',
      etiqueta: 'Infografía Modelo ER'
    },
    {
      titulo: 'Persistencia Relacional y Modelo de Entidades',
      subtitulo: 'Relaciones 1:N, N:M y sincronización con el contexto de persistencia JPA.',
      src: '/springboot/media/infografias/persistencia/015_Persistencia_bbdd.png',
      etiqueta: 'Persistencia Relacional'
    },
    {
      titulo: 'Mapeo Objeto-Relacional: Composición y Relaciones',
      subtitulo: 'Gestión del ciclo de vida en entidades compuestas y tipos embebidos @Embeddable.',
      src: '/springboot/media/infografias/persistencia/mapeo_objetos_composicion.png',
      etiqueta: 'ORM Mapeo'
    }
  ],
  'spring-data': [
    {
      titulo: 'Jerarquía de Repositorios en Spring Data JPA',
      subtitulo: 'Estructura de Repository -> CrudRepository -> PagingAndSortingRepository -> JpaRepository.',
      src: '/springboot/media/infografias/persistencia/dao_spring-data.jpg',
      etiqueta: 'Spring Data JPA'
    },
    {
      titulo: 'Patrón DAO (Data Access Object) vs Repositorios Spring Data',
      subtitulo: 'Evolución del acceso a datos: desde DAOs manuales hasta interfaces JpaRepository declarativas.',
      src: '/springboot/media/infografias/persistencia/dao_data_access_object.png',
      etiqueta: 'Patrón DAO'
    },
    {
      titulo: 'Acceso a Datos y Consultas Derivadas en Spring',
      subtitulo: 'Generación automática de consultas SQL a partir de la signatura de métodos en Repositories.',
      src: '/springboot/media/infografias/persistencia/spring_acceso_datos.png',
      etiqueta: 'Consultas Derivadas'
    }
  ],
  'patron-dto': [
    {
      titulo: 'Buenas Prácticas REST: Separación Entidad vs DTO',
      subtitulo: 'Cómo evitar exponer las entidades JPA a través de la API REST mediante objetos DTO.',
      src: '/springboot/media/infografias/api_rest/rest_buenas_practicas.jpg',
      etiqueta: 'Buenas Prácticas REST'
    },
    {
      titulo: 'Responsabilidades de Capas y Flujo DTO',
      subtitulo: 'Petición HTTP RequestDTO -> Validación -> Mapper -> Entidad -> Persistencia -> ResponseDTO.',
      src: '/springboot/media/infografias/api_rest/rest_responsabilidades.jpg',
      etiqueta: 'Flujo DTO'
    },
    {
      titulo: 'Adaptadores y Transformación de Datos',
      subtitulo: 'Patrón Adapter y Mapper para la traducción bidireccional entre DTOs y entidades de dominio.',
      src: '/springboot/media/infografias/api_rest/rest_adaptador.png',
      etiqueta: 'Mappers & Adapters'
    }
  ],
  'validaciones': [
    {
      titulo: 'Responsabilidades de Capas en Validación de Entradas',
      subtitulo: 'Filtro semántico en Controller con @Valid y captura de errores con @ExceptionHandler.',
      src: '/springboot/media/infografias/api_rest/rest_responsabilidades.jpg',
      etiqueta: 'Validación Capas'
    },
    {
      titulo: 'Buenas Prácticas en Tratamiento de Excepciones REST',
      subtitulo: 'Devolución de payloads de error enriquecidos y estructurados con códigos HTTP exactos.',
      src: '/springboot/media/infografias/api_rest/rest_buenas_practicas2.jpg',
      etiqueta: 'Errores REST'
    }
  ],
  'configuracion-perfiles': [
    {
      titulo: 'Estructura de Configuración y Paquetes Multientorno',
      subtitulo: 'Separación de perfiles application-dev.yml (H2) y application-prod.yml (MySQL).',
      src: '/springboot/media/infografias/arquitectura/arquitectura-3-capas/paquetes_arquitecturaspring_tienda.jpg',
      etiqueta: 'Perfiles Spring'
    }
  ],
  'seguridad-jwt': [
    {
      titulo: 'Arquitectura Cliente-Servidor Stateless con JWT',
      subtitulo: 'El servidor no guarda estado de sesión en memoria; cada petición porta su token Bearer.',
      src: '/springboot/media/infografias/api_rest/1_cliente-servidor.png',
      etiqueta: 'Stateless Security'
    },
    {
      titulo: 'Petición HTTP con Cabecera Authorization Bearer Token',
      subtitulo: 'Estructura exacta del protocolo HTTP utilizado por Spring Security para validar tokens JWT.',
      src: '/springboot/media/infografias/api_rest/2_peticion_cliente_url_verbo_headers_body.png',
      etiqueta: 'HTTP & JWT Bearer'
    },
    {
      titulo: 'Tipos de Headers HTTP en APIs Seguras',
      subtitulo: 'Cabeceras estándar de autenticación, control de CORS, expiración y firma criptográfica.',
      src: '/springboot/media/infografias/api_rest/3_tipos_header.png',
      etiqueta: 'Headers HTTP'
    }
  ],
  'testing': [
    {
      titulo: 'Estrategias de Test: Unitario con Mocks vs Test de Integración',
      subtitulo: 'Comparativa de aislamiento en la capa de datos y servicios con Mockito vs @SpringBootTest.',
      src: '/springboot/media/infografias/persistencia/dao_spring_test.png',
      etiqueta: 'Testing DAO / Services'
    },
    {
      titulo: 'Principios de Dependencias de Robert C. Martin (Clean Architecture)',
      subtitulo: 'La inversión de dependencias como base para poder simular colaboradores con @MockBean y Mockito.',
      src: '/springboot/media/infografias/arquitectura/principios-diseno-dependencias/18_Dependencias_principios_Robert_Martin.png',
      etiqueta: 'Testabilidad & DIP'
    }
  ],
  'docker': [
    {
      titulo: 'Arquitectura de Despliegue en Contenedores',
      subtitulo: 'Empaquetado de artefacto JAR en imagen Docker multicapa y despliegue con docker-compose.',
      src: '/springboot/media/infografias/arquitectura/monolito-vs-microservicios/spring_microservices_arquitecture.png',
      etiqueta: 'Docker & Microservicios'
    }
  ],
  'patrones-avanzados': [
    {
      titulo: 'Eventos Síncronos vs Asíncronos en Arquitectura Backend',
      subtitulo: 'Límites transaccionales ACID síncronos frente a desacoplamiento eventual asíncrono.',
      src: '/springboot/media/infografias/eventos/011_arquitectura-eventos_sincrono_asincrono.png',
      etiqueta: 'Síncrono vs Asíncrono'
    },
    {
      titulo: 'Arquitectura Dirigida por Eventos (EDA - Event Driven Architecture)',
      subtitulo: 'Producers, Event Brokers y Consumers para desacoplar transacciones pesadas.',
      src: '/springboot/media/infografias/eventos/12_Event_Driven_Architecture.jpg',
      etiqueta: 'Event Driven'
    },
    {
      titulo: 'Patrón Factory Method (GoF)',
      subtitulo: 'Creación desacoplada de objetos sin especificar la clase concreta de la instancia.',
      src: '/springboot/media/infografias/patrones/gof/notificador-factory.png',
      etiqueta: 'GoF: Factory'
    },
    {
      titulo: 'Patrón Strategy (GoF)',
      subtitulo: 'Intercambio dinámico de algoritmos o estrategias de negocio en tiempo de ejecución.',
      src: '/springboot/media/infografias/patrones/gof/strategy.png',
      etiqueta: 'GoF: Strategy'
    },
    {
      titulo: 'Patrón Observer (GoF)',
      subtitulo: 'Notificación automática de cambios de estado a múltiples suscriptores interesados.',
      src: '/springboot/media/infografias/patrones/gof/observer.png',
      etiqueta: 'GoF: Observer'
    },
    {
      titulo: 'Patrón Builder (GoF)',
      subtitulo: 'Construcción paso a paso de objetos complejos con fluidez semántica.',
      src: '/springboot/media/infografias/patrones/gof/builder.png',
      etiqueta: 'GoF: Builder'
    }
  ],
  'enterprise-testing-y-defensa': [
    {
      titulo: 'Tríada de Documentación en IA y Metodologías Ágiles',
      subtitulo: 'Contextualización para desarrollo aumentado, defensa técnica y trazabilidad de requerimientos.',
      src: '/springboot/media/infografias/Tríada_de_documentación_en_IA.png',
      etiqueta: 'Documentación & IA'
    },
    {
      titulo: 'Niveles de Abstracción: Código, Diseño y Arquitectura',
      subtitulo: 'Los 3 niveles requeridos para la defensa técnica del proyecto ante el tribunal.',
      src: '/springboot/media/infografias/arquitectura/principios-diseno-dependencias/01_codigo_diseno_arquitectura.png',
      etiqueta: 'Defensa de Proyecto'
    }
  ]
};

// Mapeo contextual de tutorías clave por capítulo
export const BOOK_CHAPTER_TUTORIAS = {
  'arquitectura-web': [1, 2],
  'protocolo-http': [1, 2],
  'protocolo-https': [1, 2],
  'json': [5],
  'ioc-beans': [1, 3],
  'inyeccion-dependencias': [1, 3],
  'scopes-y-resoluciones': [3],
  'arquitectura-capas': [1, 2],
  'jpa-hibernate': [3, 4, 13],
  'spring-data': [4, 13],
  'patron-dto': [5, 6, 9, 10, 11],
  'validaciones': [5, 6],
  'configuracion-perfiles': [8],
  'seguridad-jwt': [6, 8, 12],
  'testing': [7],
  'patrones-avanzados': [4, 13],
  'enterprise-arquitectura-profesional': [1, 2],
  'enterprise-api-y-errores': [5, 6],
  'enterprise-seguridad-practica': [6, 8, 12],
  'enterprise-testing-y-defensa': [7]
};

// Mapeo contextual de vídeos UPM por capítulo
export const BOOK_CHAPTER_VIDEOS = {
  'arquitectura-web': {
    titulo: 'Arquitectura Web y Arquitectura Hexagonal',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=0k9rX4C1_1Q'
  },
  'protocolo-http': {
    titulo: 'Protocolo HTTP, Sockets y Ciclo de Petición',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=k8vXo3sLgI4'
  },
  'ioc-beans': {
    titulo: 'Inversión de Control (IoC) y Gestión de Beans en Spring Framework',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=0_3yW7X6C4M'
  },
  'arquitectura-capas': {
    titulo: 'Arquitectura por Capas en Aplicaciones Empresariales',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=J8n09xY7mHQ'
  },
  'jpa-hibernate': {
    titulo: 'Mapeo Objeto-Relacional (ORM) con JPA e Hibernate',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=G3w7xL9mQ0Y'
  },
  'patron-dto': {
    titulo: 'Buenas Prácticas en el Diseño de APIs REST y Patrón DTO',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=L5x9Q0wY7mH'
  },
  'seguridad-jwt': {
    titulo: 'Seguridad en Servicios Web y Autenticación con Tokens JWT',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=W9x7mQ0Y5kL'
  },
  'testing': {
    titulo: 'Pruebas Unitarias y de Integración con Mockito y Spring Boot Test',
    fuente: 'UPM (Universidad Politécnica de Madrid)',
    url: 'https://www.youtube.com/watch?v=M0Y7xL9wQ5k'
  }
};

// Aliases para compatibilidad con rutas antiguas y códigos abreviados
export const BOOK_SLUG_ALIASES = {
  'ioc-iod': 'ioc-beans',
  'capas-vs-hexagonal': 'arquitectura-capas',
  'transaccionalidad': 'patrones-avanzados',
  'jpa-hibernate-n1': 'jpa-hibernate',
  'dto-validaciones': 'patron-dto',
  'testing-mockito': 'testing',
  'b0': 'springboot-guia',
  'b1': 'arquitectura-web',
  'b2': 'maven',
  'b3': 'spring-core-modular',
  'b4': 'arquitectura-capas',
  'b5': 'patron-dto',
  'b6': 'testing',
  'b7': 'enterprise-entorno',
  'b8': 'autoevaluacion'
};

// Datos de evaluación heredados de ACCENTURE_DATA.teoria
const LEGACY_EVALUATION_DATA = {
  'ioc-beans': {
    preguntaEvaluación: '¿Por qué no es recomendable inyectar dependencias mediante @Autowired en el campo (Field Injection) en aplicaciones de producción?',
    respuestaModelo: 'La inyección por campo dificulta las pruebas unitarias al impedir la instanciación de la clase sin un contenedor Spring o sin recurrir a reflexión artificial. Además, oculta las dependencias reales de la clase rompiendo el Principio de Responsabilidad Única (SRP), y no permite declarar los campos como final (inmutabilidad). En Spring Boot 3 se recomienda inyección por constructor.',
    puntosClave: ['Inmutabilidad con campos final', 'Testabilidad sin contenedor Spring', 'Detección temprana de dependencias circulares', 'Cumplimiento del principio SRP']
  },
  'arquitectura-capas': {
    preguntaEvaluación: '¿Qué diferencia arquitectónica fundamental existe entre la Arquitectura en 3 Capas tradicional y la Arquitectura Hexagonal?',
    respuestaModelo: 'En 3 Capas tradicional la dependencia es transitiva hacia abajo: Controller -> Service -> Repository -> Base de Datos (la lógica depende de los datos). En la Arquitectura Hexagonal (Puertos y Adaptadores) se aplica el Principio de Inversión de Dependencias (DIP): el Dominio está en el centro y define interfaces (puertos) que la infraestructura implementa mediante adaptadores, haciendo al negocio totalmente independiente del framework y la BBDD.',
    puntosClave: ['Dominio aislado en el centro', 'Inversión de dependencias (DIP)', 'Puertos de entrada (API) y salida (SPI)', 'Fácil sustitución de tecnologías de infraestructura']
  },
  'jpa-hibernate': {
    preguntaEvaluación: '¿En qué consiste el problema de las consultas N+1 en JPA/Hibernate y cuáles son las tres mejores estrategias para solucionarlo?',
    respuestaModelo: 'Ocurre cuando al consultar una entidad principal (1 consulta inicial), Hibernate ejecuta N consultas adicionales para cargar sus relaciones @OneToMany / @ManyToOne configuradas con FetchType.LAZY al iterarlas. Las soluciones óptimas son: 1) Usar JOIN FETCH en consultas JPQL, 2) Definir un @EntityGraph con los nodos requeridos, y 3) Mapear proyecciones directas a DTO mediante constructor expressions.',
    puntosClave: ['JOIN FETCH en JPQL', '@EntityGraph declarativo', 'FetchType.LAZY por defecto siempre', 'Evitar serializar entidades directamente']
  },
  'patron-dto': {
    preguntaEvaluación: '¿Por qué nunca se debe devolver una entidad JPA directamente en el cuerpo de una respuesta HTTP en un controlador REST?',
    respuestaModelo: '1) Exponer entidades acopla la estructura interna de la base de datos a los clientes de la API, 2) Puede filtrar datos sensibles (contraseñas, tokens internos), 3) Provoca fallos de serialización circular y StackOverflowError en relaciones bidireccionales, y 4) Desencadena LazyInitializationException si Jackson intenta serializar relaciones diferidas fuera del contexto transaccional.',
    puntosClave: ['Desacoplamiento de contrato público y modelo de datos', 'Prevención de StackOverflowError en Jackson', 'Evita LazyInitializationException', 'Validación granular con Bean Validation (@Valid)']
  },
  'seguridad-jwt': {
    preguntaEvaluación: '¿Por qué un sistema basado en tokens JWT se considera Stateless y qué ventajas e implicaciones tiene sobre la memoria del servidor?',
    respuestaModelo: 'Un sistema JWT es Stateless porque el servidor no almacena sesiones en memoria (HttpSession) ni en caché centralizada; toda la información de identidad (claims), roles y caducidad viaja cifrada/firmada criptográficamente en el propio token portado por el cliente. Esto permite escalar horizontalmente sin afinidad de sesión (Sticky Sessions) y reduce el consumo de memoria del servidor.',
    puntosClave: ['Arquitectura completamente Stateless', 'Escalado horizontal sin sesiones compartidas', 'Firma criptográfica HMAC / RSA', 'Cabecera estándar Authorization: Bearer <token>']
  },
  'testing': {
    preguntaEvaluación: '¿Cuál es la diferencia práctica entre un test unitario con @ExtendWith(MockitoExtension.class) y un test de integración con @SpringBootTest?',
    respuestaModelo: 'El test unitario con Mockito solo prueba la clase aislada, simulando todas sus dependencias con @Mock sin levantar el ApplicationContext de Spring, ejecutándose en pocos milisegundos. El test con @SpringBootTest levanta el contenedor completo de Spring, inicializa beans, configura bases de datos en memoria (H2) y prueba la interacción real entre capas, siendo más lento pero validando la configuración global.',
    puntosClave: ['Velocidad de ejecución en tests unitarios', 'Aislamiento estricto de colaboradores con @Mock', 'Verificación de configuración y contexto con @SpringBootTest', 'Pirámide de testing: muchos unitarios, pocos de integración']
  },
  'patrones-avanzados': {
    preguntaEvaluación: '¿Por qué una transacción anotada con @Transactional no hace rollback ante una excepción de tipo comprobada (Checked Exception) por defecto en Spring?',
    respuestaModelo: 'Por defecto, Spring Transaction Management solo realiza rollback automático ante excepciones no comprobadas (Unchecked Exceptions, que heredan de RuntimeException o Error). Para que una excepción comprobada (Checked) provoque rollback se debe configurar explícitamente el atributo rollbackFor = Exception.class en la anotación @Transactional.',
    puntosClave: ['Rollback por defecto solo en RuntimeException', 'Configuración de rollbackFor = Exception.class', 'Proxy AOP y trampas de autollamada interna', 'Límites transaccionales ACID en capa de servicio']
  }
};

// Estimación de tiempo de lectura (aprox 200 palabras por minuto)
function calculateReadingTime(contentMd = '') {
  const words = contentMd.trim().split(/\s+/).length;
  const minutes = Math.max(2, Math.ceil(words / 190));
  return `${minutes} min`;
}

// Ensamblado final de los 34 capítulos con todos sus metadatos enriquecidos
export const BOOK_CHAPTERS = BOOK_RAW_CHAPTERS.map((raw, idx) => {
  const chId = raw.id;
  const legacyEval = LEGACY_EVALUATION_DATA[chId] || null;
  const diagrams = BOOK_CHAPTER_DIAGRAMS[chId] || [];
  const tutorias = BOOK_CHAPTER_TUTORIAS[chId] || [];
  const video = BOOK_CHAPTER_VIDEOS[chId] || (raw.videoUrl ? { titulo: raw.videoTitle || raw.title, url: raw.videoUrl, fuente: 'UPM / Masterclass' } : null);

  // Mapeo de actividades desde STUDIO_DATA si coinciden
  const legacyTeoria = STUDIO_DATA?.teoria?.find(t => t.id === chId || BOOK_SLUG_ALIASES[t.id] === chId);

  const cleanTitle = raw.title.replace(/^\d+(\.\d+)?\.?\s*/, '').trim();
  const epigrafe = raw.topicNum ? String(raw.topicNum) : String(idx + 1);
  const displayTitle = `${epigrafe}. ${cleanTitle}`;

  return {
    ...raw,
    epigrafe,
    displayTitle,
    chapterNumber: idx + 1,
    readingTime: calculateReadingTime(raw.contentMd),
    diagrams,
    tutorias,
    video,
    preguntaEvaluación: legacyEval?.preguntaEvaluación || legacyTeoria?.preguntaEvaluación || null,
    respuestaModelo: legacyEval?.respuestaModelo || legacyTeoria?.respuestaModelo || null,
    puntosClave: legacyEval?.puntosClave || legacyTeoria?.puntosClave || [],
    actividadesVinculadas: legacyTeoria?.actividadesVinculadas || []
  };
});

// Apartados y subapartados formales para el menú lateral externo (sin emojis)
export const LIBRO_GROUPS = [
  {
    id: 'b0',
    label: 'Bloque 0: Orientación',
    items: [
      { id: 'springboot-guia', label: '0.1. Guía y Metodología' }
    ]
  },
  {
    id: 'b1',
    label: 'Bloque 1: Web y Protocolos',
    items: [
      { id: 'arquitectura-web', label: '1.1. Arquitectura Web y Hexagonal' },
      { id: 'protocolo-http', label: '1.2. Protocolo HTTP y Sockets' },
      { id: 'protocolo-https', label: '1.3. Protocolo HTTPS y TLS' },
      { id: 'json', label: '1.4. JSON y Jackson' },
      { id: 'jakarta-ee', label: '1.5. Jakarta EE y Estándares' }
    ]
  },
  {
    id: 'b2',
    label: 'Bloque 2: Ecosistema Java',
    items: [
      { id: 'maven', label: '2.1. Apache Maven' },
      { id: 'lombok', label: '2.2. Project Lombok' },
      { id: 'vscode-workflow', label: '2.3. Entorno de Trabajo en VS Code' }
    ]
  },
  {
    id: 'b3',
    label: 'Bloque 3: Spring Core',
    items: [
      { id: 'spring-core-modular', label: '3.1. Arquitectura Modular Spring' },
      { id: 'spring-boot', label: '3.2. Spring Boot y Starters' },
      { id: 'ioc-beans', label: '3.3. Inversión de Control (IoC)' },
      { id: 'inyeccion-dependencias', label: '3.4. Inyección de Dependencias' },
      { id: 'scopes-y-resoluciones', label: '3.5. Ciclo de Vida y Scopes' },
      { id: 'java-annotations', label: '3.6. Configuración con Annotations' }
    ]
  },
  {
    id: 'b4',
    label: 'Bloque 4: Arquitectura y JPA',
    items: [
      { id: 'arquitectura-capas', label: '4.1. Arquitectura por Capas' },
      { id: 'principios-solid', label: '4.2. Principios SOLID' },
      { id: 'jpa-hibernate', label: '4.3. JPA e Hibernate' },
      { id: 'spring-data', label: '4.4. Spring Data JPA' }
    ]
  },
  {
    id: 'b5',
    label: 'Bloque 5: APIs y Seguridad',
    items: [
      { id: 'patron-dto', label: '5.1. Patrón DTO' },
      { id: 'validaciones', label: '5.2. Bean Validation y Excepciones' },
      { id: 'configuracion-perfiles', label: '5.3. Configuración y Perfiles' },
      { id: 'seguridad-jwt', label: '5.4. Seguridad con JWT' }
    ]
  },
  {
    id: 'b6',
    label: 'Bloque 6: Calidad y Despliegue',
    items: [
      { id: 'testing', label: '6.1. Testing con JUnit 5 y Mockito' },
      { id: 'docker', label: '6.2. Dockerización de Aplicaciones' },
      { id: 'patrones-avanzados', label: '6.3. Patrones Avanzados' }
    ]
  },
  {
    id: 'b7',
    label: 'Bloque 7: Manual Enterprise L2E',
    items: [
      { id: 'enterprise-entorno', label: '7.1. Preparación y Entorno' },
      { id: 'enterprise-pojo-y-spring', label: '7.2. POJO, Entidades y DTOs' },
      { id: 'enterprise-arquitectura-profesional', label: '7.3. Flujo HTTP y Límites' },
      { id: 'enterprise-paquetes-y-perfiles', label: '7.4. Paquetes y Perfiles' },
      { id: 'enterprise-api-y-errores', label: '7.5. APIs REST y Errores' },
      { id: 'enterprise-seguridad-practica', label: '7.6. Seguridad Práctica' },
      { id: 'enterprise-testing-y-defensa', label: '7.7. Testing y Defensa de Proyecto' }
    ]
  },
  {
    id: 'b8',
    label: 'Bloque 8: Evaluación Final',
    items: [
      { id: 'autoevaluacion', label: '8.1. Test de Autoevaluación 360°' }
    ]
  }
];

// Bloques temáticos para agrupamiento y filtrado rápido
export const BOOK_BLOCKS = [
  { id: 'all', label: 'Todos los Temas', count: BOOK_CHAPTERS.length, icon: '📚' },
  { id: 'b0', label: 'B0: Orientación (0.1)', pattern: /Bloque 0/, icon: '🧭' },
  { id: 'b1', label: 'B1: Web & HTTP (1.1 - 1.5)', pattern: /Bloque 1/, icon: '🌐' },
  { id: 'b2', label: 'B2: Ecosistema Java (2.1 - 2.3)', pattern: /Bloque 2/, icon: '☕' },
  { id: 'b3', label: 'B3: Spring Core (3.1 - 3.6)', pattern: /Bloque 3/, icon: '🌱' },
  { id: 'b4', label: 'B4: Arq & JPA (4.1 - 4.4)', pattern: /Bloque 4/, icon: '🏛️' },
  { id: 'b5', label: 'B5: APIs & Seguridad (5.1 - 5.4)', pattern: /Bloque 5/, icon: '🔐' },
  { id: 'b6', label: 'B6: Calidad & Docker (6.1 - 6.3)', pattern: /Bloque 6/, icon: '🧪' },
  { id: 'b7', label: 'B7: Manual Enterprise (7.1 - 7.7)', pattern: /Bloque 7/, icon: '📘' },
  { id: 'b8', label: 'B8: Test 360° (8.1)', pattern: /Bloque 8/, icon: '🎯' }
];

// Mapeo específico de preguntas del Quiz Oficial por capítulo
export const BOOK_CHAPTER_QUIZZES = {
  'protocolo-http': [2, 4, 23, 56],
  'protocolo-https': [23],
  'json': [3, 16],
  'jakarta-ee': [50],
  'spring-boot': [1, 9, 34],
  'ioc-beans': [9, 60, 63],
  'inyeccion-dependencias': [9, 60],
  'scopes-y-resoluciones': [9, 34],
  'arquitectura-capas': [1, 5, 45, 46],
  'principios-solid': [5, 45],
  'jpa-hibernate': [11, 12, 13, 14, 15, 17, 18, 19],
  'spring-data': [11, 12, 14, 17, 18, 19],
  'patron-dto': [2, 3, 4, 16],
  'validaciones': [3, 33],
  'configuracion-perfiles': [35],
  'seguridad-jwt': [22, 23, 24, 25, 26, 27, 28, 29],
  'testing': [35, 36, 37, 38],
  'docker': [30, 31, 32],
  'patrones-avanzados': [6, 7, 8, 10, 36],
  'enterprise-arquitectura-profesional': [1, 5, 45],
  'enterprise-seguridad-practica': [22, 23, 24, 25],
  'enterprise-testing-y-defensa': [35, 36, 37, 38]
};

// Helper para obtener quizzes de un capítulo
export function getBookQuizzes(chapterId, allQuizzes = []) {
  if (!chapterId || !Array.isArray(allQuizzes)) return [];
  const qIds = BOOK_CHAPTER_QUIZZES[chapterId] || [];
  if (qIds.length > 0) {
    return allQuizzes.filter(q => qIds.includes(q.id));
  }
  return [];
}

// Helper de resolución de capítulo
export function resolveBookChapter(slugOrId) {
  if (!slugOrId) return BOOK_CHAPTERS[0];
  const clean = String(slugOrId).toLowerCase().trim();

  // 1. Alias directo
  if (BOOK_SLUG_ALIASES[clean]) {
    const aliasedId = BOOK_SLUG_ALIASES[clean];
    const found = BOOK_CHAPTERS.find(ch => ch.id.toLowerCase() === aliasedId);
    if (found) return found;
  }

  // 2. ID exacto
  const byId = BOOK_CHAPTERS.find(ch => ch.id.toLowerCase() === clean);
  if (byId) return byId;

  // 3. Slug exacto
  const bySlug = BOOK_CHAPTERS.find(ch => ch.slug && ch.slug.toLowerCase() === clean);
  if (bySlug) return bySlug;

  // 4. Por epígrafe o topicNum directo (ej: "1.1", "1-1", "t1.1", "epigrafe-1.1", "4.1")
  const normalizedEpigrafe = clean.replace(/^(epigrafe|tema|t)-?/, '').replace(/[-_]/g, '.');
  const byEpigrafe = BOOK_CHAPTERS.find(ch => String(ch.epigrafe).toLowerCase() === normalizedEpigrafe || String(ch.topicNum).toLowerCase() === normalizedEpigrafe);
  if (byEpigrafe) return byEpigrafe;

  // 5. Número ordinal (1 a 34 o "cap1", "tema1")
  const numMatch = clean.match(/(?:cap|tema|t)?(\d+)/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (num >= 1 && num <= BOOK_CHAPTERS.length) {
      return BOOK_CHAPTERS[num - 1];
    }
  }

  return BOOK_CHAPTERS[0];
}
