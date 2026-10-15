// Main Application Controller - Developer Handbook
(function() {
  'use strict';

  // ── 1. Theme Management (Dark / Light) ──────────────────────────────────
  function initTheme() {
    const savedTheme = localStorage.getItem('gh_study_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtons(savedTheme);

    document.addEventListener('click', (e) => {
      const target = e.target.closest('.theme-toggle-trigger, #theme-toggle-btn, #floating-theme-btn');
      if (target) {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('gh_study_theme', next);
        updateThemeButtons(next);
      }
    });
  }

  function updateThemeButtons(theme) {
    const isLight = (theme === 'light');
    const label = isLight ? '🌙 Modo Oscuro' : '☀️ Modo Diurno';

    const buttons = document.querySelectorAll('.theme-toggle-trigger, #theme-toggle-btn, #floating-theme-btn');
    buttons.forEach(btn => {
      btn.innerHTML = label;
      btn.setAttribute('title', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo diurno (claro)');
    });
  }


  // ── 2. Reading Scroll Progress Bar ──────────────────────────────────────
  function initReadingProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const topProgressLine = document.getElementById('scroll-progress-line');

    function updateProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollPos / docHeight) * 100))) : 0;

      if (progressFill) {
        progressFill.style.width = percent + '%';
      }
      if (progressText) {
        progressText.textContent = percent + '%';
      }
      if (topProgressLine) {
        topProgressLine.style.width = percent + '%';
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }


  // ── 3. Sidebar Active Section Tracking (ScrollSpy) ──────────────────────
  function initScrollSpy() {
    const targets = Array.from(document.querySelectorAll('section[id], article[id]'));
    const navLinks = Array.from(document.querySelectorAll('.sidebar-link, .sidebar-subnav a'));
    const sidebar = document.querySelector('.sidebar');

    if (!targets.length || !navLinks.length) return;

    // Mapa de targetId -> link del sidebar
    const linkMap = new Map();
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        linkMap.set(href.slice(1), link);
      }
    });

    let ticking = false;

    function setActive(targetId) {
      const activeLink = linkMap.get(targetId);
      if (!activeLink) return;

      // Limpiar clases activas previas
      navLinks.forEach(l => {
        l.classList.remove('active');
        l.classList.remove('parent-active');
      });

      // Activar el enlace correspondiente
      activeLink.classList.add('active');

      // Si es un tema hijo dentro de .sidebar-subnav, marcar también el bloque contenedor padre
      const parentSubnav = activeLink.closest('.sidebar-subnav');
      if (parentSubnav) {
        const parentLi = parentSubnav.closest('li');
        if (parentLi) {
          const parentLink = parentLi.querySelector('.sidebar-link');
          if (parentLink) {
            parentLink.classList.add('parent-active');
          }
        }
      }

      // Auto-scroll del aside para mantener el elemento sombreado siempre visible
      if (sidebar) {
        const linkRect = activeLink.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        if (linkRect.top < sidebarRect.top + 30 || linkRect.bottom > sidebarRect.bottom - 30) {
          activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;

          // Si estamos al fondo de la página, activar el último elemento
          const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
          if (atBottom) {
            const lastTarget = targets[targets.length - 1];
            if (lastTarget) setActive(lastTarget.getAttribute('id'));
            return;
          }

          // Línea de lectura (justo debajo de la barra superior fija de 49px)
          const readingLine = 90;
          let currentTarget = targets[0];

          for (let i = 0; i < targets.length; i++) {
            const rect = targets[i].getBoundingClientRect();
            if (rect.top <= readingLine) {
              currentTarget = targets[i];
            } else {
              break;
            }
          }

          if (currentTarget) {
            setActive(currentTarget.getAttribute('id'));
          }
        });
        ticking = true;
      }
    }

    // Activación instantánea al hacer clic en cualquier enlace del aside
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          setActive(href.slice(1));
        }
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Ejecutar al inicio
    onScroll();
  }


  // ── 4. Code Block Copy to Clipboard ─────────────────────────────────────
  function initCodeCopy() {
    const legacyBlocks = document.querySelectorAll('.code-container:not(code-block .code-container)');
    legacyBlocks.forEach(container => {
      const copyBtn = container.querySelector('.copy-btn');
      const code = container.querySelector('pre code');
      if (!copyBtn || !code || copyBtn._hasCopyHandler) return;
      copyBtn._hasCopyHandler = true;

      copyBtn.addEventListener('click', () => {
        const text = code.innerText || code.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '✓ Copiado';
          setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
        }).catch(err => console.error('Error al copiar:', err));
      });
    });
  }


  // ── 5. Live Search & Autocomplete ───────────────────────────────────────
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const dropdown = document.getElementById('search-autocomplete-dropdown');
    const searchWrapper = searchInput ? searchInput.closest('.search-wrapper') : null;

    if (!searchInput || !dropdown || !searchWrapper) return;

    let selectedIndex = -1;
    let currentResults = [];

    // Base de datos de palabras clave técnicas, anotaciones y apartados
    const SEARCH_DATABASE = [
      // Anotaciones Spring Boot (@...)
      { term: "@RestController", badge: "@", badgeClass: "badge-annotation", desc: "Controlador RESTful con serialización directa a JSON", target: "tema-6-restcontroller", topic: "Tema 6 · 6.1", aliases: ["restcontroller", "controlador", "api", "rest", "controller"] },
      { term: "@GetMapping", badge: "@", badgeClass: "badge-annotation", desc: "Mapeo HTTP GET para consulta idempotente de recursos", target: "tema-6-verbos", topic: "Tema 6 · 6.2", aliases: ["getmapping", "get", "endpoint", "consulta", "read"] },
      { term: "@PostMapping", badge: "@", badgeClass: "badge-annotation", desc: "Mapeo HTTP POST para creación de recursos en base de datos", target: "tema-6-verbos", topic: "Tema 6 · 6.2", aliases: ["postmapping", "post", "crear", "alta", "create"] },
      { term: "@PutMapping", badge: "@", badgeClass: "badge-annotation", desc: "Mapeo HTTP PUT para reemplazo completo de la entidad", target: "tema-6-verbos", topic: "Tema 6 · 6.2", aliases: ["putmapping", "put", "actualizar", "reemplazar", "update"] },
      { term: "@DeleteMapping", badge: "@", badgeClass: "badge-annotation", desc: "Mapeo HTTP DELETE para eliminación definitiva (204)", target: "tema-6-verbos", topic: "Tema 6 · 6.2", aliases: ["deletemapping", "delete", "borrar", "eliminar", "remove"] },
      { term: "@RequestBody", badge: "@", badgeClass: "badge-annotation", desc: "Deserialización automática del cuerpo HTTP a objeto Java/DTO", target: "tema-6-responseentity", topic: "Tema 6 · 6.3", aliases: ["requestbody", "body", "cuerpo", "dto", "payload"] },
      { term: "@PathVariable", badge: "@", badgeClass: "badge-annotation", desc: "Captura de parámetros dinámicos de ruta (/libros/{id})", target: "tema-6-responseentity", topic: "Tema 6 · 6.3", aliases: ["pathvariable", "id", "ruta", "parametro", "path"] },
      { term: "@Service", badge: "@", badgeClass: "badge-annotation", desc: "Capa de negocio y lógica de dominio con inyección", target: "tema-7-servicio", topic: "Tema 7 · 7.1", aliases: ["service", "servicio", "negocio", "capa", "reglas"] },
      { term: "@Transactional", badge: "@", badgeClass: "badge-annotation", desc: "Gestión transaccional declarativa y rollback automático", target: "tema-7-transacciones", topic: "Tema 7 · 7.3", aliases: ["transactional", "transaccion", "rollback", "acid", "readonly", "commit"] },
      { term: "@Component", badge: "@", badgeClass: "badge-annotation", desc: "Estereotipo base de Bean registrado en ApplicationContext", target: "tema-4-ioc", topic: "Tema 4 · 4.1", aliases: ["component", "bean", "estereotipo", "ioc", "spring"] },
      { term: "@Primary", badge: "@", badgeClass: "badge-annotation", desc: "Preferencia por defecto cuando existen múltiples Beans compatibles", target: "tema-4-inyeccion", topic: "Tema 4 · 4.2", aliases: ["primary", "prioridad", "defecto", "ambiguedad", "principal"] },
      { term: "@Qualifier", badge: "@", badgeClass: "badge-annotation", desc: "Desambiguación explícita mediante identificador de Bean", target: "tema-4-qualifier", topic: "Tema 4 · 4.3", aliases: ["qualifier", "nombre", "calificador", "desambiguar", "especifico"] },
      { term: "@SpringBootApplication", badge: "@", badgeClass: "badge-annotation", desc: "Anotación de arranque: @Configuration + @ComponentScan + @EnableAutoConfiguration", target: "tema-5-autoconfigure", topic: "Tema 5 · 5.2", aliases: ["springbootapplication", "arranque", "main", "magia", "iniciar"] },
      { term: "@Entity", badge: "@", badgeClass: "badge-annotation", desc: "Mapeo de clase a tabla relacional de base de datos", target: "tema-8-clases-mapeadas", topic: "Tema 8 · 8.2", aliases: ["entity", "entidad", "tabla", "jpa", "hibernate", "clases mapeadas"] },
      { term: "@Table", badge: "@", badgeClass: "badge-annotation", desc: "Especificación del nombre y restricciones de la tabla SQL", target: "tema-8-clases-mapeadas", topic: "Tema 8 · 8.2", aliases: ["table", "tabla", "esquema", "ddl"] },
      { term: "@Id", badge: "@", badgeClass: "badge-annotation", desc: "Definición del campo identificador de clave primaria", target: "tema-8-clases-mapeadas", topic: "Tema 8 · 8.2", aliases: ["id", "primary key", "clave", "pk"] },
      { term: "@GeneratedValue", badge: "@", badgeClass: "badge-annotation", desc: "Estrategia autoincremental de generación de IDs (IDENTITY)", target: "tema-8-clases-mapeadas", topic: "Tema 8 · 8.2", aliases: ["generatedvalue", "identity", "autoincrement", "secuencia"] },
      { term: "@Column", badge: "@", badgeClass: "badge-annotation", desc: "Restricciones de columna: nullable, unique, precision, scale", target: "tema-8-clases-mapeadas", topic: "Tema 8 · 8.2", aliases: ["column", "columna", "nullable", "unique", "longitud"] },
      { term: "@OneToMany", badge: "@", badgeClass: "badge-annotation", desc: "Relación uno a muchos con lista y FetchType.LAZY", target: "tema-9-relaciones", topic: "Tema 9 · 9.1", aliases: ["onetomany", "uno a muchos", "relacion", "coleccion", "lazy"] },
      { term: "@ManyToOne", badge: "@", badgeClass: "badge-annotation", desc: "Relación muchos a uno dueña de la clave foránea (FK)", target: "tema-9-relaciones", topic: "Tema 9 · 9.1", aliases: ["manytoone", "muchos a uno", "fk", "foreign key"] },
      { term: "@JoinColumn", badge: "@", badgeClass: "badge-annotation", desc: "Nombre de la columna física que almacena la foreign key", target: "tema-9-relaciones", topic: "Tema 9 · 9.1", aliases: ["joincolumn", "columna union", "fk"] },
      { term: "@Query", badge: "@", badgeClass: "badge-annotation", desc: "Consultas declarativas personalizadas en JPQL con parámetros", target: "tema-9-jpql", topic: "Tema 9 · 9.2", aliases: ["query", "jpql", "consulta", "sql", "hql"] },
      { term: "@RestControllerAdvice", badge: "@", badgeClass: "badge-annotation", desc: "Manejador global centralizado de excepciones y errores", target: "tema-11-advice", topic: "Tema 11 · 11.1", aliases: ["restcontrolleradvice", "advice", "global", "errores", "excepciones"] },
      { term: "@ExceptionHandler", badge: "@", badgeClass: "badge-annotation", desc: "Método capturador para una clase de excepción específica", target: "tema-11-advice", topic: "Tema 11 · 11.1", aliases: ["exceptionhandler", "captura", "handler", "try catch"] },
      { term: "@Valid", badge: "@", badgeClass: "badge-annotation", desc: "Disparador de validación declarativa Bean Validation en DTOs", target: "tema-11-validacion", topic: "Tema 11 · 11.3", aliases: ["valid", "validacion", "bean validation", "validar"] },
      { term: "@NotNull / @NotBlank / @Size", badge: "@", badgeClass: "badge-annotation", desc: "Restricciones de validación sobre campos del payload", target: "tema-11-validacion", topic: "Tema 11 · 11.3", aliases: ["notnull", "notblank", "size", "email", "restriccion"] },
      { term: "@Slf4j", badge: "@", badgeClass: "badge-annotation", desc: "Inyección automática del logger SLF4J mediante Lombok", target: "tema-12-logs", topic: "Tema 12 · 12.1", aliases: ["slf4j", "log", "logger", "logging", "trazas"] },
      { term: "@Test", badge: "@", badgeClass: "badge-annotation", desc: "Anotación de caso de prueba unitario en JUnit Jupiter 5", target: "tema-13-aislamiento", topic: "Tema 13 · 13.1", aliases: ["test", "junit", "prueba unitaria"] },
      { term: "@ExtendWith(MockitoExtension.class)", badge: "@", badgeClass: "badge-annotation", desc: "Inicialización del motor de Mockito en tests unitarios", target: "tema-13-aislamiento", topic: "Tema 13 · 13.1", aliases: ["extendwith", "mockitoextension", "runner"] },
      { term: "@Mock", badge: "@", badgeClass: "badge-annotation", desc: "Creación de doble de prueba (Mock) sin interacción real", target: "tema-13-aislamiento", topic: "Tema 13 · 13.1", aliases: ["mock", "simulacion", "doble", "mockito"] },
      { term: "@InjectMocks", badge: "@", badgeClass: "badge-annotation", desc: "Inyección automática de los mocks en la clase bajo prueba", target: "tema-13-aislamiento", topic: "Tema 13 · 13.1", aliases: ["injectmocks", "inyeccion mocks", "instancia test"] },
      { term: "@WebMvcTest", badge: "@", badgeClass: "badge-annotation", desc: "Slice testing web centrado exclusivamente en el controlador", target: "tema-14-slice", topic: "Tema 14 · 14.1", aliases: ["webmvctest", "slice test", "prueba web", "mockmvc"] },
      { term: "@MockBean", badge: "@", badgeClass: "badge-annotation", desc: "Sustitución de un Bean en el contexto de Spring Boot Test", target: "tema-14-mockbean", topic: "Tema 14 · 14.3", aliases: ["mockbean", "mock en contexto", "doble bean"] },
      { term: "@Autowired", badge: "@", badgeClass: "badge-annotation", desc: "Inyección de dependencias (se prefiere inyección por constructor)", target: "tema-4-inyeccion", topic: "Tema 4 · 4.2", aliases: ["autowired", "inyeccion", "campo"] },

      // Lombok
      { term: "Lombok", badge: "LOMBOK", badgeClass: "badge-lombok", desc: "Generación de código en compilación para suprimir boilerplate", target: "tema-3-lombok", topic: "Tema 3 · 3.2", aliases: ["lombok", "boilerplate", "productividad"] },
      { term: "@Data en Entidades JPA: El Bucle Infinito (StackOverflowError)", badge: "LOMBOK", badgeClass: "badge-lombok", desc: "Recursión cíclica entre toString()/hashCode() y StackOverflowError en relaciones bidireccionales", target: "tema-3-data-danger", topic: "Tema 3 · 3.3", aliases: ["data", "bucle infinito", "bucle", "el bucle infinito", "peligro data", "stackoverflowerror", "hashcode", "tostring", "recursion ciclica"] },
      { term: "@Builder", badge: "LOMBOK", badgeClass: "badge-lombok", desc: "Generación automática del patrón de diseño Builder fluido", target: "tema-3-lombok", topic: "Tema 3 · 3.2", aliases: ["builder", "patron builder", "construccion fluida"] },
      { term: "@Getter / @Setter", badge: "LOMBOK", badgeClass: "badge-lombok", desc: "Buenas prácticas en JPA: accesores y mutadores explícitos", target: "tema-3-lombok", topic: "Tema 3 · 3.2", aliases: ["getter", "setter", "encapsulamiento"] },
      { term: "@NoArgsConstructor / @AllArgsConstructor", badge: "LOMBOK", badgeClass: "badge-lombok", desc: "Constructores por defecto y completos para JPA y DTOs", target: "tema-3-lombok", topic: "Tema 3 · 3.2", aliases: ["noargsconstructor", "allargsconstructor", "constructor"] },

      // Clean Code & Arquitectura
      { term: "Clean Code", badge: "ARQ", badgeClass: "badge-clean", desc: "Código legible, nombres significativos y responsabilidad única", target: "filo-1-1", topic: "Filosofía · 1.1", aliases: ["clean code", "clean", "codigo limpio", "robert martin", "refactor"] },
      { term: "Clean Architecture", badge: "ARQ", badgeClass: "badge-clean", desc: "Arquitectura concéntrica con el Dominio en el centro inmaculado", target: "filo-1-4", topic: "Filosofía · 1.4", aliases: ["clean architecture", "arquitectura limpia", "dominio"] },
      { term: "Arquitectura Hexagonal (Puertos y Adaptadores)", badge: "ARQ", badgeClass: "badge-clean", desc: "Desacoplamiento total del núcleo frente a frameworks y bases de datos", target: "filo-1-4", topic: "Filosofía · 1.4", aliases: ["arquitectura hexagonal", "hexagonal", "ports and adapters", "puertos y adaptadores"] },
      { term: "El Pecado Original de new", badge: "ARQ", badgeClass: "badge-clean", desc: "Acoplamiento fuerte por instanciación directa sin Inversión de Control", target: "filo-1-2", topic: "Filosofía · 1.2", aliases: ["pecado de new", "new", "acoplamiento", "instanciacion"] },
      { term: "Regla de Oro de las Dependencias", badge: "ARQ", badgeClass: "badge-clean", desc: "Flujo unidireccional: Presentación → Negocio → Datos", target: "filo-1-3", topic: "Filosofía · 1.3", aliases: ["regla de dependencias", "capas", "flujo", "direccion"] },
      { term: "Inversión de Control (IoC)", badge: "ARQ", badgeClass: "badge-clean", desc: "El Contenedor de Spring instancia y suministra las dependencias", target: "tema-4-ioc", topic: "Tema 4 · 4.1", aliases: ["ioc", "inversion de control", "hollywood", "contenedor"] },
      { term: "Inyección por Constructor", badge: "ARQ", badgeClass: "badge-clean", desc: "Inmutabilidad de dependencias y facilidad para tests con mocks", target: "tema-7-inyeccion", topic: "Tema 7 · 7.2", aliases: ["inyeccion por constructor", "constructor", "dependencia"] },
      { term: "Paradigma Stateless (Sin Estado)", badge: "ARQ", badgeClass: "badge-clean", desc: "Servidores sin sesión HTTP en memoria para escalabilidad total", target: "filo-1-5", topic: "Filosofía · 1.5", aliases: ["stateless", "sin estado", "concurrencia", "singleton"] },
      { term: "Principios SOLID", badge: "ARQ", badgeClass: "badge-clean", desc: "SRP, OCP, LSP, ISP y DIP aplicados a diseño backend profesional", target: "tema-5-solid", topic: "Tema 5 · 5.1", aliases: ["solid", "srp", "ocp", "lsp", "isp", "dip"] },

      // Web & HTTP
      { term: "203 Non-Authoritative Information", badge: "2xx", badgeClass: "badge-clean", desc: "Código HTTP 203: Metadatos o cabeceras modificadas por un proxy respecto al servidor de origen", target: "http-203", topic: "HTTP · 2xx Éxito", aliases: ["203", "http 203", "codigo 203", "non-authoritative", "proxy", "metadatos"] },
      { term: "Catálogo Completo de Códigos HTTP (RFC 9110)", badge: "HTTP", badgeClass: "badge-clean", desc: "Listado exhaustivo de todos los códigos HTTP (1xx a 5xx) con los más habituales en negrita", target: "codigos-http-completos", topic: "Cheatsheet · Referencia", aliases: ["codigos http", "codigo http", "codigos de estado", "status codes", "listado http", "codigos", "estados http", "200 ok", "404 not found", "500 error"] },
      { term: "Petición HTTP (Request)", badge: "WEB", badgeClass: "badge-clean", desc: "Método, URI, cabeceras (Content-Type, Auth) y cuerpo JSON", target: "tema-1-request", topic: "Tema 1 · 1.1", aliases: ["request", "peticion http", "headers", "body"] },
      { term: "Respuesta HTTP (Response)", badge: "WEB", badgeClass: "badge-clean", desc: "Código de estado (2xx, 4xx, 5xx), cabecera Location y cuerpo", target: "tema-1-response", topic: "Tema 1 · 1.2", aliases: ["response", "respuesta http", "status code"] },
      { term: "Verbos HTTP (GET, POST, PUT, DELETE)", badge: "WEB", badgeClass: "badge-clean", desc: "Semántica RESTful e idempotencia en operaciones de red", target: "tema-1-verbos", topic: "Tema 1 · 1.3", aliases: ["verbos", "restful", "idempotencia", "crud"] },
      { term: "HTTPS y TLS Handshake", badge: "SEC", badgeClass: "badge-sec", desc: "Seguridad criptográfica en tránsito y certificados de Autoridad (CA)", target: "tema-1-https", topic: "Tema 1 · 1.4", aliases: ["https", "tls", "ssl", "handshake", "cifrado"] },
      { term: "ResponseEntity<T>", badge: "WEB", badgeClass: "badge-clean", desc: "Control total sobre código HTTP, cabeceras y cuerpo retornado", target: "tema-6-responseentity", topic: "Tema 6 · 6.3", aliases: ["responseentity", "200 ok", "201 created", "location", "204 no content"] },

      // Programación Web con Java (Tema 2)
      { term: "Trabajo con Servlets (HttpServlet)", badge: "WEB", badgeClass: "badge-clean", desc: "Ciclo de vida (init, service, destroy), concurrencia, request/response y @WebServlet", target: "tema-2-servlets", topic: "Tema 2 · 2.1", aliases: ["servlet", "servlets", "trabajo con servlets", "httpservlet", "doget", "dopost", "webservlet", "ciclo de vida servlet"] },
      { term: "Introducción a JSP (JavaServer Pages)", badge: "WEB", badgeClass: "badge-clean", desc: "Compilación Jasper, directivas, Expression Language (EL) y etiquetas JSTL", target: "tema-2-jsp", topic: "Tema 2 · 2.2", aliases: ["jsp", "introduccion a jsp", "javaserver pages", "jasper", "jstl", "expression language", "el"] },
      { term: "Seguridad en JSP (XSS y Sesiones)", badge: "SEC", badgeClass: "badge-sec", desc: "Prevención de XSS con <c:out escapeXml='true'>, directiva session='false' y HttpOnly", target: "tema-2-jsp-seguridad", topic: "Tema 2 · 2.3", aliases: ["seguridad jsp", "seguridad en jsp", "xss", "c:out", "escapexml", "httponly", "csrf jsp"] },
      { term: "Patrón MVC en Java Web (Modelo 2)", badge: "ARCH", badgeClass: "badge-annotation", desc: "Servlet como Controlador, JSP como Vista pura y POJOs como Modelo de datos", target: "tema-2-mvc", topic: "Tema 2 · 2.4", aliases: ["mvc", "patron mvc", "introduccion al patron mvc", "modelo 2", "requestdispatcher", "web-inf"] },
      { term: "Enterprise Java Beans (EJB) y Génesis de Spring", badge: "ARCH", badgeClass: "badge-annotation", desc: "Stateless/Stateful beans, MDB, crisis de J2EE y la revolución POJO de Rod Johnson", target: "tema-2-ejb", topic: "Tema 2 · 2.5", aliases: ["ejb", "enterprise java beans", "stateless", "stateful", "mdb", "rod johnson", "j2ee", "genesis spring"] },

      // JSON & DTOs
      { term: "JSON Tipos Primitivos", badge: "DATA", badgeClass: "badge-annotation", desc: "String, Number, Boolean, null, Array, Object", target: "tema-2-tipos", topic: "Tema 2 · 2.6", aliases: ["json", "tipos json", "primitivos"] },
      { term: "Jackson ObjectMapper", badge: "DATA", badgeClass: "badge-annotation", desc: "writeValueAsString (serialización) y readValue (deserialización)", target: "tema-2-jackson", topic: "Tema 2 · 2.7", aliases: ["jackson", "objectmapper", "serializacion", "deserializacion"] },
      { term: "TypeReference & Type Erasure", badge: "DATA", badgeClass: "badge-annotation", desc: "Deserialización correcta de colecciones genéricas en Jackson", target: "tema-2-colecciones", topic: "Tema 2 · 2.8", aliases: ["typereference", "type erasure", "colecciones", "list"] },
      { term: "Patrón DTO (Data Transfer Object)", badge: "DATA", badgeClass: "badge-annotation", desc: "Aislamiento de la base de datos y prevención de fuga de seguridad", target: "tema-10-peligros", topic: "Tema 10 · 10.1", aliases: ["dto", "patron dto", "desacoplamiento"] },
      { term: "Java Records (DTOs Inmutables)", badge: "DATA", badgeClass: "badge-annotation", desc: "Sintaxis compacta e inmutabilidad nativa para DTOs en Java 16+", target: "tema-10-records", topic: "Tema 10 · 10.2", aliases: ["records", "java records", "record", "inmutable"] },

      // Persistencia & JPA
      { term: "Introducción a Hibernate y Core", badge: "ORM", badgeClass: "badge-annotation", desc: "Especificación JPA y motor ORM: SessionFactory, Session y Dialectos", target: "tema-8-intro-hibernate", topic: "Tema 8 · 8.1", aliases: ["jpa", "hibernate", "introduccion a hibernate", "sessionfactory", "session", "dialect", "orm"] },
      { term: "FetchType.LAZY & Problema N+1", badge: "OPT", badgeClass: "badge-clean", desc: "Estrategia diferida en colecciones y optimización en Hibernate", target: "tema-9-optimizacion", topic: "Tema 9 · 9.4", aliases: ["fetchtype.lazy", "lazy", "n+1", "n plus 1", "eager", "optimizacion"] },
      { term: "JPQL (Java Persistence Query Language)", badge: "JPA", badgeClass: "badge-annotation", desc: "Consultas orientadas a entidades de dominio con named parameters", target: "tema-9-jpql", topic: "Tema 9 · 9.3", aliases: ["jpql", "consultas", "query", "hql"] },

      // Testing
      { term: "Mockito when() y verify()", badge: "TEST", badgeClass: "badge-test", desc: "Stubbing con when y validación de interacciones con verify", target: "tema-13-when-verify", topic: "Tema 13 · 13.2", aliases: ["mockito", "when", "verify", "stubs", "pruebas unitarias"] },
      { term: "MockMvc y jsonPath", badge: "TEST", badgeClass: "badge-test", desc: "Llamadas HTTP simuladas y validación de respuestas JSON", target: "tema-14-mockmvc", topic: "Tema 14 · 14.2", aliases: ["mockmvc", "jsonpath", "andexpect", "status.isok"] },

      // Seguridad & DevOps
      { term: "JWT (JSON Web Tokens)", badge: "SEC", badgeClass: "badge-sec", desc: "Autenticación stateless con token firmado (Header, Payload, Signature)", target: "tema-15-jwt", topic: "Tema 15 · 15.1", aliases: ["jwt", "json web token", "bearer", "authorization", "seguridad"] },
      { term: "SecurityFilterChain", badge: "SEC", badgeClass: "badge-sec", desc: "Filtros de seguridad, csrf disable y SessionCreationPolicy.STATELESS", target: "tema-15-securityfilter", topic: "Tema 15 · 15.2", aliases: ["securityfilterchain", "spring security", "csrf", "stateless"] },
      { term: "Docker Multi-Stage Build", badge: "OPS", badgeClass: "badge-annotation", desc: "Dockerfile optimizado en 2 etapas: Maven builder + Alpine JRE ligera", target: "tema-15-docker", topic: "Tema 15 · 15.4", aliases: ["docker", "dockerfile", "multi stage", "contenedor"] },
      { term: "OpenAPI y Swagger UI", badge: "DOCS", badgeClass: "badge-annotation", desc: "Documentación interactiva de APIs en /swagger-ui/index.html", target: "tema-12-perfiles-openapi", topic: "Tema 12 · 12.2", aliases: ["swagger", "openapi", "springdoc", "documentacion"] },
      { term: "SLF4J Niveles de Log", badge: "LOGS", badgeClass: "badge-annotation", desc: "Jerarquía TRACE < DEBUG < INFO < WARN < ERROR con formato estructurado", target: "tema-12-logs", topic: "Tema 12 · 12.1", aliases: ["slf4j", "logs", "niveles de log", "trazas", "debug", "warn", "error"] },

      // Módulo Exhaustivo de Hibernate
      { term: "Mapeo de Asociaciones (@OneToMany, @ManyToMany)", badge: "ORM", badgeClass: "badge-annotation", desc: "Relaciones 1:1, 1:N, N:M con @JoinColumn, @JoinTable, cascade y orphanRemoval", target: "tema-9-relaciones", topic: "Tema 9 · 9.1", aliases: ["mapeo de asociaciones", "asociaciones", "relaciones", "asociacion", "onetomany", "manytoone", "manytomany", "onetoone"] },
      { term: "JPA y sus Anotaciones: Guía Completa", badge: "JPA", badgeClass: "badge-annotation", desc: "Catálogo completo de anotaciones JPA: @Entity, @Table, @Column, @Enumerated, @Transient, @Version, @Lob, etc.", target: "tema-8-clases-mapeadas", topic: "Tema 8 · 8.2", aliases: ["anotaciones jpa", "jpa anotaciones", "anotaciones de jpa", "jpa", "clases mapeadas", "mapeo jpa", "anotaciones", "enumerated", "transient", "version", "lob", "embeddable"] },
      { term: "Trabajo con Objetos (Estados Hibernate)", badge: "ORM", badgeClass: "badge-annotation", desc: "Transient, Persistent (Managed), Detached y Removed en el Contexto de Persistencia", target: "tema-8-estados-objetos", topic: "Tema 8 · 8.3", aliases: ["trabajo con objetos", "estados hibernate", "transient", "persistent", "managed", "detached", "removed", "persist", "merge", "flush", "detach", "clear"] },
      { term: "Mapeo de Herencia (@Inheritance)", badge: "ORM", badgeClass: "badge-annotation", desc: "Estrategias de herencia: @MappedSuperclass, SINGLE_TABLE, JOINED y TABLE_PER_CLASS", target: "tema-8-herencia", topic: "Tema 8 · 8.4", aliases: ["herencia", "mapeo de herencia", "mappedsuperclass", "inheritance", "single_table", "joined", "discriminatorcolumn", "polimorfismo"] },
      { term: "Consultas contra la Base de Datos (JPQL / Nativo)", badge: "JPA", badgeClass: "badge-annotation", desc: "Consultas JPQL/HQL orientadas a objetos, SQL nativo con nativeQuery y Criteria API", target: "tema-9-jpql", topic: "Tema 9 · 9.3", aliases: ["consultas contra la base de datos", "consultas", "nativequery", "sql nativo", "criteria api", "hql"] },
      { term: "Optimización en Hibernate (JOIN FETCH, Caché L1/L2)", badge: "OPT", badgeClass: "badge-clean", desc: "Solución al problema N+1 con JOIN FETCH, @EntityGraph, Caché L1/L2 y batch_size", target: "tema-9-optimizacion", topic: "Tema 9 · 9.4", aliases: ["optimizacion", "optimizacion hibernate", "join fetch", "entitygraph", "cache l1", "cache l2", "batch_size", "segundo nivel"] },

      // Nuevas Anotaciones y Conceptos Formativos
      { term: "@Aspect", badge: "@", badgeClass: "badge-annotation", desc: "Programación Orientada a Aspectos (AOP) para modularizar lógica transversal", target: "tema-4-aop", topic: "Tema 4 · 4.4", aliases: ["aspect", "aop", "aspecto", "transversal", "interceptor"] },
      { term: "@Around / ProceedingJoinPoint", badge: "@", badgeClass: "badge-annotation", desc: "Advice AOP que envuelve ejecuciones de métodos para métricas y auditoría", target: "tema-4-aop", topic: "Tema 4 · 4.4", aliases: ["around", "proceedingjoinpoint", "advice", "joinpoint", "pointcut"] },
      { term: "@PreAuthorize (RBAC)", badge: "@", badgeClass: "badge-annotation", desc: "Control de acceso basado en roles a nivel de método con hasRole y hasAuthority", target: "tema-15-security-best-practices", topic: "Tema 15 · 15.3", aliases: ["preauthorize", "rbac", "hasrole", "roles", "autorizacion", "seguridad"] },
      { term: "@ManyToMany y @JoinTable", badge: "@", badgeClass: "badge-annotation", desc: "Relaciones N a M con tabla de unión relacional y colecciones Set", target: "tema-9-manytomany", topic: "Tema 9 · 9.2", aliases: ["manytomany", "jointable", "muchos a muchos", "tabla de union"] },
      { term: "Ciclo de Vida del Bean (@PostConstruct)", badge: "ARQ", badgeClass: "badge-clean", desc: "Fases del contenedor Spring: instanciación, DI, @PostConstruct y @PreDestroy", target: "tema-4-aop", topic: "Tema 4 · 4.4", aliases: ["ciclo de vida", "bean lifecycle", "postconstruct", "predestroy", "initializingbean"] },
      { term: "DispatcherServlet (Spring MVC)", badge: "ARQ", badgeClass: "badge-clean", desc: "Front Controller, HandlerMapping, HandlerAdapter y HttpMessageConverter", target: "tema-6-mvc-arquitectura", topic: "Tema 6 · 6.4", aliases: ["dispatcherservlet", "spring mvc", "front controller", "handlermapping", "mvc"] },
      { term: "Transacciones ACID y Propagación", badge: "ARQ", badgeClass: "badge-clean", desc: "Atomicidad, aislamiento, Propagation.REQUIRED, REQUIRES_NEW y rollbackFor", target: "tema-7-transacciones-avanzadas", topic: "Tema 7 · 7.4", aliases: ["acid", "propagation", "required", "requires_new", "rollbackfor", "transaccion", "transacciones"] },
      { term: "Modelo Entidad-Relación a ORM", badge: "ORM", badgeClass: "badge-annotation", desc: "Correspondencia entre tablas, PKs y FKs relacionales a clases entidad Java", target: "tema-8-intro-hibernate", topic: "Tema 8 · 8.1", aliases: ["modelo er", "entidad relacion", "orm", "hibernate", "tablas", "esquema"] },
      { term: "Operaciones CRUD con Hibernate & Spring Data", badge: "JPA", badgeClass: "badge-annotation", desc: "save, findById, dirty checking en commit y deleteById con transacciones", target: "tema-8-crud", topic: "Tema 8 · 8.5", aliases: ["crud", "save", "findbyid", "deletebyid", "dirty checking", "crear", "borrar"] },
      { term: "Spring Boot Actuator (/health, /metrics)", badge: "OPS", badgeClass: "badge-clean", desc: "Endpoints de monitoreo, telemetría de producción, métricas JVM y Prometheus", target: "tema-12-actuator", topic: "Tema 12 · 12.3", aliases: ["actuator", "health", "metrics", "observabilidad", "monitoreo", "prometheus", "micrometer"] },
      { term: "RestClient (Consumo de APIs REST)", badge: "WEB", badgeClass: "badge-clean", desc: "Cliente HTTP síncrono moderno con API fluida y gestión de estados en Spring Boot 3", target: "tema-12-restclient", topic: "Tema 12 · 12.4", aliases: ["restclient", "resttemplate", "consumo api", "cliente http", "apis externas", "httpclient"] },
      { term: "Depuración (Debugging) y Diagnóstico", badge: "TEST", badgeClass: "badge-test", desc: "show-sql, log de bind parameters TRACE, breakpoints condicionales y FailureAnalyzer", target: "tema-14-debugging", topic: "Tema 14 · 14.4", aliases: ["debugging", "depuracion", "show-sql", "format_sql", "bind trace", "failureanalyzer", "breakpoints"] },
      { term: "BCryptPasswordEncoder (Hashing Seguro)", badge: "SEC", badgeClass: "badge-sec", desc: "Hashing criptográfico con salt aleatorio y factor de trabajo configurable", target: "tema-15-security-best-practices", topic: "Tema 15 · 15.3", aliases: ["bcrypt", "passwordencoder", "hash", "hashing", "contraseñas", "salt"] },
      { term: "Microservicios: Síncronos vs Asíncronos", badge: "ARQ", badgeClass: "badge-clean", desc: "Comparativa REST/Feign vs Message Brokers (Apache Kafka y RabbitMQ)", target: "tema-15-microservicios", topic: "Tema 15 · 15.5", aliases: ["microservicios", "kafka", "rabbitmq", "asincrono", "sincrono", "feign", "broker", "mensajeria", "event-driven"] },
    ];

    function normalizeQuery(q) {
      return q.replace(/\.{2,}/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function highlightMatch(text, query) {
      const clean = normalizeQuery(query);
      if (!clean) return text;
      const regex = new RegExp(`(${clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    function search(query) {
      const clean = normalizeQuery(query).toLowerCase();
      if (!clean) return [];

      const words = clean.split(' ').filter(Boolean);

      const scored = [];
      for (const item of SEARCH_DATABASE) {
        const termLower = item.term.toLowerCase();
        const descLower = item.desc.toLowerCase();
        const topicLower = item.topic.toLowerCase();
        const aliasesLower = (item.aliases || []).join(' ').toLowerCase();
        const fullText = `${termLower} ${aliasesLower} ${topicLower} ${descLower}`;

        // Todas las palabras escritas deben estar presentes
        const allWordsMatch = words.every(w => fullText.includes(w));
        if (!allWordsMatch) continue;

        let score = 0;
        if (termLower === clean) score += 200;
        else if (termLower.startsWith(clean)) score += 120;
        else if (termLower.includes(clean)) score += 80;
        else if (aliasesLower.includes(clean)) score += 60;
        else if (topicLower.includes(clean)) score += 40;
        else score += 20;

        if (termLower.startsWith(words[0])) score += 30;

        scored.push({ item, score });
      }

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 8).map(s => s.item);
    }

    function renderDropdown(results, query) {
      currentResults = results;
      selectedIndex = -1;

      if (!results.length) {
        dropdown.innerHTML = `<div class="search-empty-message">No se encontraron apartados para "<strong>${escapeHtml(query)}</strong>"</div>`;
        dropdown.style.display = 'block';
        searchInput.setAttribute('aria-expanded', 'true');
        return;
      }

      let html = `<div class="search-autocomplete-header">
        <span>Sugerencias (${results.length})</span>
        <span class="hint">↑↓ Navegar · Enter Seleccionar · Esc Cerrar</span>
      </div>`;

      results.forEach((r, idx) => {
        const titleHtml = highlightMatch(escapeHtml(r.term), query);
        html += `
          <div class="search-suggestion-item" data-index="${idx}" data-target="${r.target}" role="option">
            <div class="search-suggestion-left">
              <span class="search-suggestion-badge ${r.badgeClass || ''}">${escapeHtml(r.badge)}</span>
              <div class="search-suggestion-info">
                <div class="search-suggestion-title">${titleHtml}</div>
                <div class="search-suggestion-desc">${escapeHtml(r.desc)}</div>
              </div>
            </div>
            <div class="search-suggestion-right">
              <span class="search-suggestion-topic">${escapeHtml(r.topic)}</span>
              <span class="search-suggestion-arrow">→</span>
            </div>
          </div>
        `;
      });

      dropdown.innerHTML = html;
      dropdown.style.display = 'block';
      searchInput.setAttribute('aria-expanded', 'true');

      // Click listener en los items
      const items = dropdown.querySelectorAll('.search-suggestion-item');
      items.forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.dataset.index, 10);
          if (currentResults[idx]) {
            navigateTo(currentResults[idx]);
          }
        });
      });
    }

    function updateSelection() {
      const items = dropdown.querySelectorAll('.search-suggestion-item');
      items.forEach((item, idx) => {
        if (idx === selectedIndex) {
          item.classList.add('selected');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
        }
      });
    }

    function closeDropdown() {
      dropdown.style.display = 'none';
      searchInput.setAttribute('aria-expanded', 'false');
      selectedIndex = -1;
    }

    function navigateTo(item) {
      closeDropdown();
      searchInput.value = item.term;

      const targetEl = document.getElementById(item.target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Animación suave de destello en el apartado destino
        targetEl.classList.remove('section-target-highlight');
        void targetEl.offsetWidth; // Reflow para reiniciar la animación
        targetEl.classList.add('section-target-highlight');

        setTimeout(() => {
          targetEl.classList.remove('section-target-highlight');
        }, 2300);

        try {
          history.pushState(null, '', '#' + item.target);
        } catch (e) {}
      }
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // Input events
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (!val || !val.trim()) {
        closeDropdown();
        return;
      }
      const results = search(val);
      renderDropdown(results, val);
    });

    searchInput.addEventListener('focus', () => {
      const val = searchInput.value;
      if (val && val.trim()) {
        const results = search(val);
        renderDropdown(results, val);
      }
    });

    // Teclado: flechas arriba/abajo, Enter, Esc
    searchInput.addEventListener('keydown', (e) => {
      const isOpen = dropdown.style.display !== 'none';

      if (e.key === 'ArrowDown') {
        if (isOpen && currentResults.length > 0) {
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % currentResults.length;
          updateSelection();
        }
      } else if (e.key === 'ArrowUp') {
        if (isOpen && currentResults.length > 0) {
          e.preventDefault();
          selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
          updateSelection();
        }
      } else if (e.key === 'Enter') {
        if (isOpen && currentResults.length > 0) {
          e.preventDefault();
          const targetIndex = selectedIndex >= 0 ? selectedIndex : 0;
          if (currentResults[targetIndex]) {
            navigateTo(currentResults[targetIndex]);
          }
        }
      } else if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          closeDropdown();
        }
      }
    });

    // Cierre al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!searchWrapper.contains(e.target)) {
        closeDropdown();
      }
    });

    // Atajo de teclado global Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        if (searchInput.value.trim()) {
          const results = search(searchInput.value);
          renderDropdown(results, searchInput.value);
        }
      }
    });
  }


  // ── 6. Back to Top Button ───────────────────────────────────────────────
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ── 7. Mobile Sidebar Toggle ────────────────────────────────────────────
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    const links = sidebar.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          sidebar.classList.remove('open');
        }
      });
    });
  }


  // ── 8. Topic Dropdowns (Apartados por tema) ─────────────────────────────
  function initTopicDropdowns() {
    // Cerrar el dropdown al hacer clic en un enlace de apartado
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.topic-dropdown-item');
      if (item) {
        const details = item.closest('details.topic-dropdown');
        if (details) {
          details.removeAttribute('open');
        }
      }

      // Cerrar cualquier dropdown abierto si se hace clic fuera de él
      const openDropdowns = document.querySelectorAll('details.topic-dropdown[open]');
      openDropdowns.forEach(details => {
        if (!details.contains(e.target)) {
          details.removeAttribute('open');
        }
      });
    });

    // Cerrar al pulsar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openDropdowns = document.querySelectorAll('details.topic-dropdown[open]');
        openDropdowns.forEach(details => details.removeAttribute('open'));
      }
    });
  }


  // ── Inicialización General ──────────────────────────────────────────────
  function initApp() {
    initTheme();
    initReadingProgress();
    initScrollSpy();
    initCodeCopy();
    initSearch();
    initBackToTop();
    initMobileMenu();
    initTopicDropdowns();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
