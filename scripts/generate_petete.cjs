const fs = require('fs');
const path = require('path');

const actividadesPath = path.resolve(__dirname, '../public/data/extra/accenture_actividades_curso.json');
const guiaPath = path.resolve(__dirname, '../public/data/extra/springboot_guia.json');
const videosPath = path.resolve(__dirname, '../public/data/extra/accenture_videos_teoria.json');
const tutoriasCodigoPath = path.resolve(__dirname, '../public/data/extra/springboot_tutorias_codigo.json');
const ifcdPath = path.resolve(__dirname, '../public/data/extra/ifcd0177_curso.json');
const outputPath = path.resolve(__dirname, '../public/data/extra/springboot_petete.json');
const distOutputPath = path.resolve(__dirname, '../dist/data/extra/springboot_petete.json');

const actividades = JSON.parse(fs.readFileSync(actividadesPath, 'utf-8'));
const guiaTopics = JSON.parse(fs.readFileSync(guiaPath, 'utf-8'));
const videoTopics = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
const tutoriasCodigo = JSON.parse(fs.readFileSync(tutoriasCodigoPath, 'utf-8'));
const ifcdTopics = JSON.parse(fs.readFileSync(ifcdPath, 'utf-8'));

const getGuiaTopic = (slug) => guiaTopics.find(t => t.slug === slug || t.id === slug);
const getVideoTopic = (idOrSlug) => videoTopics.find(v => v.id === idOrSlug || v.slug === idOrSlug || v.slug.includes(idOrSlug));

// Helper para extraer código comentado de tutorías de Isra
const getIsraCode = (moduleId, fileName) => {
  const item = tutoriasCodigo.find(t => t.moduleId === moduleId && (t.fileName === fileName || t.title === fileName));
  if (!item) return '';
  return item.contentMd.replace(/\r\n/g, '\n');
};

// Helper para jerarquizar los encabezados del reto dentro de la sección "3. Entregable (num) de ACC"
const formatActividadRetoMd = (contentMd) => {
  if (!contentMd) return '';
  let text = contentMd.replace(/\\n/g, '\n');
  return text
    .replace(/^####\s+/gm, '##### ')
    .replace(/^###\s+/gm, '#### ')
    .replace(/^##\s+(\d+)\.\s+/gm, '### 3.$1. ')
    .replace(/^##\s+Parte\s+(\d+):\s+/gim, '### 3.$1. Parte $1: ')
    .replace(/^##\s+([📋📑].*)$/gm, '### 3.0. $1');
};

// Helper para jerarquizar los encabezados de la solución dentro de la sección "4. Solución y Código Documentado"
const formatSolucionDocMd = (solucionDoc) => {
  if (!solucionDoc) return '';
  let s = solucionDoc.replace(/\\n/g, '\n');
  s = s.replace(/^##\s+💡[^\n]*\n*/i, '');
  s = s.replace(/^###\s+(\d+)\.\s+/gm, '### 4.$1. ');
  return s.trim();
};

const peteteTopics = [];

// ==========================================
// BLOQUE 0: Orientación & Fundamentos Web
// ==========================================

// 0.1 Bienvenida
peteteTopics.push({
  id: "petete-bienvenida",
  slug: "bienvenida",
  topicNum: "0.1",
  title: "Bienvenida a Petete: Guía Integrada de Spring Boot",
  moduleTitle: "Bloque 0: Orientación & Fundamentos",
  moduleShort: "Bloque 0",
  contentMd: `# Petete: Guía Integrada de Spring Boot (Teoría + Vídeos + Tutorías de Isra + Retos L2E)

Bienvenido a **Petete**, la edición integrada que unifica todo el material para el Bootcamp de Accenture y el desarrollo backend profesional con Spring Boot.

### Estructura de cada lección
1. **Conceptos Clave:** Explicaciones directas y sin rodeos de la teoría fundamental.
2. **Vídeos Recomendados:** Reproductores interactivos de YouTube (UPM y Píldoras Informáticas) con marcas de tiempo.
3. **Código de Tutoría (Isra):** Clases Java comentadas, esquemas ASCII de arquitectura y diagramas reales de tutoría listos para copiar.
4. **Entregables de ACC:** Enunciado del problema, estructura de paquetes y requisitos de la actividad.
5. **Solución Documentada:** Código Java completo y probado paso a paso.

> **💡 Navegación:** Utiliza el menú lateral izquierdo para saltar entre temas y los cajones de apoyo de la derecha (**📅** Tutorías y **🛠️** Retos) para consultar referencias en cualquier momento.`
});

// 0.2 Arquitectura Web & Protocolo HTTP
const httpGuia = getGuiaTopic("protocolo-http");
let httpCoreSectionMd = '';
if (httpGuia) {
  let hText = httpGuia.contentMd;
  hText = hText.replace(/###\s*1\.2\.\s*Reglas y Funcionamiento del Protocolo HTTP/g, '### 0.2.5 Fundamentos del Protocolo HTTP y Modelo Cliente-Servidor');
  hText = hText.replace(/####\s*1\.\s*Comunicación/g, '#### A. Comunicación');
  hText = hText.replace(/####\s*2\.\s*Soporte/g, '#### B. Soporte');
  hText = hText.replace(/####\s*3\.\s*Tipos de Mensajes/g, '#### C. Tipos de Mensajes');
  hText = hText.replace(/####\s*4\.\s*Flexibilidad/g, '#### D. Flexibilidad');
  // Quitar bloque duplicado de note si ya se incluye en 0.2.9
  hText = hText.replace(/> \[!NOTE\][\s\S]*?Hola desde Socket puro[\s\S]*?```/g, '');
  httpCoreSectionMd = hText.trim();
}

peteteTopics.push({
  id: "petete-fundamentos-http",
  slug: "fundamentos-web-http",
  topicNum: "0.2",
  title: "Arquitectura Web y Protocolo HTTP",
  moduleTitle: "Bloque 0: Orientación & Fundamentos",
  moduleShort: "Bloque 0",
  audioUrl: "/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3",
  podcastTitle: "Reglas de Arquitectura en Spring Boot y las 3 Capas",
  subsections: [
    { id: "0-2-1-arquitecturas-web-monolito-vs-microservicios", slug: "0-2-1-arquitecturas-web-monolito-vs-microservicios", topicNum: "0.2.1", title: "0.2.1 · Monolito vs Microservicios" },
    { id: "0-2-2-organizacion-del-codigo-de-las-3-capas-a-la-arquitectura-hexagonal", slug: "0-2-2-organizacion-del-codigo-de-las-3-capas-a-la-arquitectura-hexagonal", topicNum: "0.2.2", title: "0.2.2 · De las 3 Capas a Hexagonal" },
    { id: "0-2-3-principios-de-modularidad-y-diseno-de-paquetes-robert-c-martin", slug: "0-2-3-principios-de-modularidad-y-diseno-de-paquetes-robert-c-martin", topicNum: "0.2.3", title: "0.2.3 · Principios de Paquetes (Uncle Bob)" },
    { id: "0-2-4-codigo-de-tutoria-isra-arquitectura-hexagonal-y-puertos", slug: "0-2-4-codigo-de-tutoria-isra-arquitectura-hexagonal-y-puertos", topicNum: "0.2.4", title: "0.2.4 · Tutoría Isra: Arquitectura Hexagonal" },
    { id: "0-2-5-fundamentos-del-protocolo-http-y-modelo-cliente-servidor", slug: "0-2-5-fundamentos-del-protocolo-http-y-modelo-cliente-servidor", topicNum: "0.2.5", title: "0.2.5 · Fundamentos HTTP & Cliente-Servidor" },
    { id: "0-2-6-metodos-http-operaciones-y-semantica-rest", slug: "0-2-6-metodos-http-operaciones-y-semantica-rest", topicNum: "0.2.6", title: "0.2.6 · Métodos HTTP y Semántica REST" },
    { id: "0-2-7-codigos-de-estado-clave-status-codes", slug: "0-2-7-codigos-de-estado-clave-status-codes", topicNum: "0.2.7", title: "0.2.7 · Códigos de Estado (Status Codes)" },
    { id: "0-2-8-seguridad-en-transito-http-frente-a-https-tls", slug: "0-2-8-seguridad-en-transito-http-frente-a-https-tls", topicNum: "0.2.8", title: "0.2.8 · Seguridad HTTPS y TLS" },
    { id: "0-2-9-codigo-de-tutoria-isra-servidor-http-puro-con-sockets", slug: "0-2-9-codigo-de-tutoria-isra-servidor-http-puro-con-sockets", topicNum: "0.2.9", title: "0.2.9 · Tutoría Isra: Servidor Mock HTTP" }
  ],
  contentMd: `# Arquitectura Web y Protocolo HTTP

Antes de programar en Spring Boot, es imprescindible comprender el terreno de juego sobre el que operan las aplicaciones backend.

---

### 0.2.1 Arquitecturas Web: Monolito vs Microservicios

La arquitectura no es simplemente cómo escribes tus métodos o clases; define cómo se **organizan los componentes del sistema, cómo se comunican entre sí y bajo qué reglas operan**. En definitiva, se trata de la estructura fundamental de un sistema. Comprende sus componentes, sus relaciones con otros, su entorno y las principales guías de su diseño y evolución.

[🎬 VÍDEO 1 · Introducción a las Arquitecturas de las Aplicaciones Web](https://www.youtube.com/watch?v=XqgtFLMPaX4)

**Material de apoyo para el vídeo:** [Código en GitHub (v1.4.0-Release)](https://github.com/miw-upm/apaw/releases/tag/v1.4.0-Release) | [Diapositivas (PDF)](miw-apaw-slides.pdf)

Para entender el panorama actual de la ingeniería del software, las arquitecturas web se clasifican según sus dimensiones fundamentales de despliegue:

#### A. Según el Despliegue y Distribución (¿Cómo corre en producción?)

1. **Monolito Tradicional (Monolithic Architecture):**
   * **Concepto:** Toda la aplicación (controladores web, servicios de negocio, acceso a datos) se compila, empaqueta y despliega como una **única unidad indivisible** (por ejemplo, un único archivo ejecutable \`.jar\` o \`.war\` en Spring Boot).
   * **Ventajas:**
     * **Un solo artefacto:** Fácil despliegue en un único servidor o contenedor.
     * **Fácil gestión de versiones:** Todo el sistema se versiona, compila y despliega de forma conjunta sin desfases entre componentes.
     * **Simplicidad inicial:** Pruebas locales directas sin levantar múltiples servicios y llamadas internas en memoria ultra rápidas.
   * **Inconvenientes:**
     * **La complejidad aumenta en el tiempo:** Pérdida de productividad y producción conforme crece el volumen y la antigüedad del código.
     * **Grandes equipos de desarrollo:** Exige especialización y genera gran complejidad en la interacción, coordinación y resolución de conflictos entre equipos.
     * **Replicación costosa con difícil balanceo de carga:** Escalar una sola funcionalidad puntual obliga a replicar la aplicación completa y sobredimensionar recursos.
     * **Grandes bases de datos:** Esquemas de datos masivos que provocan migraciones complejas y delicadas.
     * **Difícil reusabilidad:** Reutilizar partes concretas del proyecto en otras aplicaciones resulta muy complejo debido al acoplamiento.
     * **Una sola tecnología y difícil migración tecnológica:** Todo el sistema depende de la misma pila tecnológica (lenguaje, framework y versiones), dificultando la modernización gradual.
   * **Caso de uso:** MVPs, proyectos nuevos, equipos pequeños o medianos y la base formativa imprescindible del desarrollo backend.

2. **Monolito Modular (Modular Monolith):**
   * **Concepto:** Mantiene la sencillez operativa de un despliegue único en un solo \`.jar\`, pero impone **fronteras estrictas y encapsulamiento riguroso entre módulos** mediante herramientas como *Spring Modulith* o módulos de Maven.
   * **Ventajas:** Elimina la enorme complejidad de red y DevOps de los microservicios sin renunciar a una arquitectura limpia y altamente desacoplada.
   * **Caso de uso:** La opción recomendada hoy por arquitectos seniors antes de plantearse dar el salto a microservicios.

3. **Microservicios (Microservices Architecture):**
   * **Concepto:** El sistema se divide en una constelación de **servicios pequeños, autónomos e independientes**, donde cada microservicio es dueño de su propia base de datos y expone una API REST (o eventos) para comunicarse con los demás.
   * **Ventajas:**
     * **Fuertemente modular.**
     * **Equipos más pequeños y multidisciplinares:** Permite que células de desarrollo autónomas trabajen en paralelo.
     * **Filosofía de productos y no proyectos:** Cada equipo asume la propiedad continua y evolución de su servicio.
     * **Descentralización de BD:** Elimina la integración acoplada en una base de datos centralizada (*database-per-service*).
     * **Despliegues independientes:** Cada servicio se puede actualizar y desplegar sin detener ni comprometer el resto del sistema.
     * **Evolución rápida y con menor riesgo:** Facilita iteraciones frecuentes y reduce el impacto de fallos aislados.
     * **Réplica de despliegues y balanceo de carga:** Permite escalar exclusivamente los servicios que experimentan picos de demanda.
     * **Reusabilidad en diferentes proyectos:** Los servicios pueden ser reutilizados y consumidos por múltiples aplicaciones.
     * **Diversidad tecnológica:** Libertad para elegir el lenguaje, framework o base de datos más apropiado para cada necesidad.
     * **Evolución tecnológica progresiva:** Permite cambiar o modernizar la tecnología adoptando nuevos servicios sin reescribir el sistema completo.
   * **Inconvenientes:**
     * **Distribución:** Al ser un sistema distribuido, su despliegue, topología de red e infraestructura resultan mucho más complejos.
     * **Consistencia:** Es más complicado mantener la consistencia del sistema (requiere consistencia eventual y patrones como Saga).
     * **Complejidad operacional:** Se necesita acceder a varios servicios para realizar una operación (orquestación, latencia de red y observabilidad distribuida).
   * **Caso de uso:** Grandes organizaciones tecnológicas (Netflix, Amazon, Uber) con múltiples equipos autónomos y tráfico masivo.

4. **Arquitectura Serverless / FaaS (Function-as-a-Service):**
   * **Concepto:** El backend no mantiene servidores encendidos continuamente; la lógica se fragmenta en funciones efímeras que se despiertan bajo demanda ante un evento HTTP (AWS Lambda, Google Cloud Functions).
   * **Ventajas:** Cero coste de cómputo en reposo y escalado elástico automático instantáneo.
   * **Limitaciones:** Latencia de arranque en frío (*cold starts*) y acoplamiento con la nube del proveedor (*vendor lock-in*).

---

### 0.2.2 Organización del Código: De las 3 Capas a la Arquitectura Hexagonal

1. **Arquitectura Tradicional de 3 Capas (Layered Architecture):**
   * **Presentación (\`@RestController\`):** Recibe las peticiones HTTP, valida sintácticamente y devuelve JSON.
   * **Negocio (\`@Service\`):** Contiene las reglas empresariales, cálculos y transformaciones.
   * **Datos (\`@Repository\` / JPA):** Se comunica con la base de datos SQL o NoSQL.
   * **Regla de oro:** Las dependencias **solo bajan**, nunca suben (\`Presentación ➔ Negocio ➔ Datos\`).
   * **Limitación común:** Tiende a acoplar la lógica con la base de datos porque las entidades JPA suelen atravesar todas las capas.

2. **Arquitectura Hexagonal (Puertos y Adaptadores - Alistair Cockburn):**
   * **Concepto:** El **Dominio de Negocio** vive en el núcleo y permanece 100% puro en Java estándar (sin anotaciones de Spring, sin JPA, sin HTTP).
   * **Mecanismo:** El núcleo expone **Puertos** (interfaces Java) y la infraestructura externa se conecta mediante **Adaptadores** (un controlador REST es un adaptador de entrada; un repositorio JPA es un adaptador de salida).
   * **Ventaja clave:** Máxima capacidad de prueba: puedes testear el 100% de la lógica de negocio en milisegundos con tests unitarios puros, sin arrancar Spring Boot ni bases de datos.

3. **Clean Architecture (Robert C. Martin / Uncle Bob) y Onion Architecture:**
   * **Concepto:** Estructuración concéntrica donde las dependencias siempre apuntan hacia el interior. El centro contiene las entidades y casos de uso empresariales; los detalles externos (bases de datos, frameworks, UI) son piezas intercambiables.
   * **Caso de uso:** Sistemas bancarios, sanitarios o de alta criticidad donde la lógica de negocio debe sobrevivir a cambios de tecnología o frameworks.

4. **Arquitectura Orientada a Eventos (EDA - Event-Driven Architecture):**
   * **Concepto:** Los servicios o módulos no se invocan directamente de forma síncrona, sino que publican **eventos de dominio** (*Domain Events*) a través de un bus de mensajes (Kafka, RabbitMQ). Los consumidores reaccionan de manera asíncrona.
   * **Ventaja:** Máximo desacoplamiento temporal y espacial entre subsistemas.

#### 📊 Tabla Comparativa de Estilos Arquitectónicos

| Arquitectura | Complejidad Operativa | Curva de Aprendizaje | Facilidad de Tests | Escalabilidad | Cuándo Elegirla |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Monolito en 3 Capas** | 🟢 Muy baja (1 \`.jar\`) | 🟢 Fácil | 🟡 Media | 🟡 Vertical / Replicación | Inicio de proyectos, MVPs y aprendizaje guiado. |
| **Monolito Modular** | 🟢 Baja (1 \`.jar\`) | 🟡 Media | 🟢 Alta | 🟡 Media-Alta | Proyectos empresariales que crecen y exigen orden. |
| **Arquitectura Hexagonal** | 🟡 Media (código puro) | 🟡 Media-Alta | 🟢 Excelente (sin mocks pesados) | 🟢 Alta mantenibilidad | Negocio complejo (DDD) y sistemas de larga vida. |
| **Microservicios** | 🔴 Muy alta (DevOps/Red) | 🔴 Alta | 🔴 Compleja (tests distribuidos) | 🟢 Extrema e independiente | Grandes organizaciones con múltiples equipos autónomos. |

#### 🎯 ¿Cuál es la ruta recomendada en este curso?

1. **Fundamentos (Bootcamp / Universidad):** Empezamos dominando la **Arquitectura en 3 Capas con Monolito en Spring Boot**. Es la base indiscutible que te enseñará a dominar la Inyección de Dependencias, las APIs REST y la persistencia con JPA.
2. **Evolución Enterprise:** A medida que domines las 3 capas, exploraremos cómo desacoplar el dominio mediante el patrón de **Puertos y Adaptadores (Hexagonal)** gracias al código avanzado de las tutorías de Isra.
3. **Horizonte Profesional:** Con una sólida base de monolitos limpios y desacoplados, la transición a microservicios o arquitecturas orientadas a eventos será un paso natural.

---

### 0.2.3 Principios de Modularidad y Diseño de Paquetes (Robert C. Martin)

Así como los principios **SOLID** guían el diseño de clases individuales, Robert C. Martin (*Uncle Bob*) formalizó los **Principios de Componentes** para organizar clases dentro de paquetes, módulos y librerías (\`.jar\`):

#### 1. Cohesión de Paquetes (¿Qué clases deben agruparse en el mismo paquete?)

* **Principio de Equivalencia entre Reusable y Entregable (REP - *Release/Reuse Equivalence Principle*):**
  * *«Se reúsa si no se mira el código fuente.»*
  * El grano de la reutilización es el grano de la entrega (*release*). Para que un paquete sea reutilizable por terceros, debe publicarse como un artefacto versionado formal (ej. un archivo \`.jar\` en Maven Central o Nexus con coordenadas GAV y notas de versión), sin obligar a los consumidores a inspeccionar ni copiar código fuente.
* **Principio de Reusabilidad Común (CRP - *Common Reuse Principle*):**
  * *«Las clases de un paquete se reutilizan juntas.»*
  * Si un módulo depende de una sola clase de un paquete, implícitamente depende de todo el paquete. Por tanto, no debes forzar a los consumidores a depender de clases, utilidades o dependencias que no necesitan.
* **Principio de Cierre Común (CCP - *Common Closure Principle*):**
  * *«Un cambio que afecte a una clase, afecta a todo el paquete.»*
  * Las clases que cambian por las mismas razones y al mismo tiempo deben pertenecer al mismo paquete. Es el equivalente al Principio de Responsabilidad Única (**SRP**) aplicado a nivel de paquete para confinar el impacto del mantenimiento.

#### 2. Acoplamiento entre Paquetes (¿Cómo deben relacionarse los paquetes entre sí?)

* **Principio de Dependencias Acíclicas (ADP - *Acyclic Dependencies Principle*):**
  * *«Ciclo de dependencias sin bucle.»*
  * La estructura de dependencias entre paquetes debe formar un **Grafo Acíclico Dirigido (DAG)**. Jamás debe existir una dependencia circular (si el paquete A depende de B y B depende de C, C nunca puede depender de A). En Java y Spring Boot, los ciclos impiden construcciones limpias y generan acoplamiento destructivo.
* **Principio de Dependencias Estables (SDP - *Stable Dependencies Principle*):**
  * *«Depende siempre en la dirección de la estabilidad.»*
  * **Estable** en el sentido de *pesado, difícil de cambiar*: muchos módulos dependen de él, por lo que cualquier modificación tendría un impacto masivo en cascada (ej. el núcleo de dominio o una interfaz pública).
  * **Inestable** en el sentido de *ligero, fácil de cambiar*: pocos o ningún módulo depende de él, lo que otorga máxima flexibilidad y volatilidad (ej. controladores web o adaptadores concretos).
  * **Regla de oro:** Los paquetes volátiles/inestables deben depender de paquetes pesados/estables, nunca al revés.

---

### 0.2.4 Código de Tutoría (Isra): Arquitectura Hexagonal y Puertos

${getIsraCode('tut01', '_01_ArquitecturaHexagonal.java')}

---

${httpCoreSectionMd}

---

### 0.2.6 Métodos HTTP: Operaciones y Semántica REST

En una API REST con Spring Boot, cada verbo HTTP define la **intención de la acción** sobre el recurso:

| Método HTTP | Propósito CRUD | Idempotente | Código Habitual | Ejemplo en Spring Boot |
| :--- | :--- | :---: | :---: | :--- |
| **\`GET\`** | **Leer** datos sin alterar el estado del servidor. | ✅ Sí | \`200 OK\` | \`@GetMapping("/libros/{id}")\` |
| **\`POST\`** | **Crear** un nuevo recurso. | ❌ No | \`201 Created\` | \`@PostMapping("/libros")\` |
| **\`PUT\`** | **Actualizar completo** (reemplazo íntegro del recurso). | ✅ Sí | \`200 OK\` | \`@PutMapping("/libros/{id}")\` |
| **\`PATCH\`** | **Actualizar parcial** (solo los campos enviados). | ❌ No | \`200 OK\` | \`@PatchMapping("/libros/{id}")\` |
| **\`DELETE\`** | **Borrar** un recurso existente. | ✅ Sí | \`204 No Content\` | \`@DeleteMapping("/libros/{id}")\` |

> **💡 Idempotencia:** Una operación es idempotente si ejecutarla varias veces consecutivas produce el mismo resultado en el servidor que ejecutarla una sola vez. \`GET\`, \`PUT\` y \`DELETE\` son idempotentes; \`POST\` no lo es.

---

### 0.2.7 Códigos de Estado Clave (Status Codes)

El servidor comunica el resultado de la petición mediante un número de 3 dígitos agrupado por familias:

#### Familia 2xx · Éxito
* **\`200 OK\`:** Petición procesada con éxito. Devuelve datos en el cuerpo de la respuesta (\`GET\`, \`PUT\`, \`PATCH\`).
* **\`201 Created\`:** El recurso se ha creado correctamente en el servidor (\`POST\`). Opcionalmente incluye la cabecera \`Location\` con la URL del nuevo recurso.
* **\`204 No Content\`:** Acción completada con éxito, pero la respuesta no contiene cuerpo (\`DELETE\`).

#### Familia 4xx · Error del Cliente (El problema reside en la petición)
* **\`400 Bad Request\`:** Petición mal formada o datos inválidos (por ejemplo, validación de campos con \`@Valid\` fallida o JSON corrupto).
* **\`401 Unauthorized\`:** No autenticado. El cliente no ha proporcionado credenciales válidas (falta token JWT o usuario/contraseña).
* **\`403 Forbidden\`:** Autenticado pero no autorizado. El cliente no tiene permisos o roles suficientes para acceder a este recurso.
* **\`404 Not Found\`:** El recurso solicitado no existe en la base de datos o la URL no coincide con ningún endpoint.

#### Familia 5xx · Error del Servidor (El problema reside en nuestro backend)
* **\`500 Internal Server Error\`:** Excepción no controlada (\`NullPointerException\`, error de base de datos SQL caída, etc.).
* **\`503 Service Unavailable\`:** El servidor está temporalmente sobrecargado o en mantenimiento.

---

### 0.2.8 Seguridad en Tránsito: HTTP frente a HTTPS (TLS)

* **HTTP (Puerto 80 por defecto):**  
  La comunicación viaja en **texto plano** a través de la red. Cualquier intermediario en la red (*sniffers*, proxies o atacantes en la misma red Wi-Fi) puede interceptar contraseñas, tokens JWT y datos sensibles (*Man-in-the-Middle*).
* **HTTPS (HTTP + TLS, Puerto 443 por defecto):**  
  Toda la comunicación viaja **cifrada de extremo a extremo** mediante TLS (*Transport Layer Security*):
  1. **Confidencialidad:** Nadie entre el cliente y el servidor puede descifrar los datos transmitidos.
  2. **Integridad:** Los datos no pueden ser manipulados ni alterados durante el trayecto.
  3. **Autenticidad:** Los certificados digitales X.509 firmados por una Autoridad de Certificación (CA) garantizan que el servidor es quien dice ser.

---

### 0.2.9 Código de Tutoría (Isra): Servidor HTTP Puro con Sockets

${getIsraCode('tut01', 'ServidorMockHTTP.java')}`
});

// 0.3 Ecosistema Java: Maven, Lombok y Formato JSON
const jsonGuia = getGuiaTopic("json");
const mavenGuia = getGuiaTopic("maven");
const lombokGuia = getGuiaTopic("lombok");

// Limpiar y preparar contenido completo de Maven
let mavenSectionMd = '';
if (mavenGuia) {
  let mText = mavenGuia.contentMd;
  // Usar el gráfico vectorial SVG ultra nítido
  mText = mText.replace(/\.\.\/\.\.\/img\/modulo0\/maven_lombok_herramientas\.png/g, '/img/modulo0/maven_lombok_herramientas.svg');
  mText = mText.replace(/\/img\/modulo0\/maven_lombok_herramientas\.png/g, '/img/modulo0/maven_lombok_herramientas.svg');
  // Quitar el título redundantemente repetido
  mText = mText.replace(/##\s*4\.\s*Herramientas del Entorno:[^\n]+/g, '');
  mText = mText.replace(/###\s*4\.1\.\s*/g, '### ');
  mavenSectionMd = mText.trim();
}

// Limpiar y preparar contenido completo de Lombok
let lombokSectionMd = '';
if (lombokGuia) {
  let lText = lombokGuia.contentMd;
  lText = lText.replace(/###\s*2\.2\.\s*Project Lombok:[^\n]+/g, '');
  lText = lText.replace(/:\s*Productividad y Reducción de Boilerplate/g, '');
  lombokSectionMd = lText.trim();
}

// Limpiar y preparar contenido completo de JSON
let jsonSectionMd = '';
if (jsonGuia) {
  let jText = jsonGuia.contentMd;
  jText = jText.replace(/##\s*2\.\s*Intercambio de Datos:[^\n]+/g, '');
  jsonSectionMd = jText.trim();
}

peteteTopics.push({
  id: "petete-ecosistema-tools",
  slug: "ecosistema-maven-lombok",
  topicNum: "0.3",
  title: "Ecosistema Java: Maven, Lombok y Formato JSON",
  moduleTitle: "Bloque 0: Orientación & Fundamentos",
  moduleShort: "Bloque 0",
  contentMd: `# Ecosistema Java: Maven, Lombok y Formato JSON

En el desarrollo empresarial con Spring Boot, **Maven** estandariza la compilación, pruebas y dependencias; **Lombok** elimina el código redundante (*boilerplate*) mediante metaprogramación en tiempo de compilación; y **Jackson** serializa y deserializa peticiones y respuestas en formato JSON.

---

## 1. Gestión de Dependencias y Ciclo de Vida con Apache Maven

${mavenSectionMd}

---

## 2. Reducción de Boilerplate con Project Lombok

${lombokSectionMd}

---

## 3. Código de Tutoría (Isra): Maven y Lombok

${getIsraCode('tut03', '_00_Resumen.java')}

${getIsraCode('tut03', '_02_Lombok.java')}

---

## 4. Formato JSON y Serialización con Jackson

${jsonSectionMd}

---

## 5. Código de Tutoría (Isra): JSON y ObjectMapper

${getIsraCode('tut02', '_00_Resumen.java')}

${getIsraCode('tut02', '_02_Jackson_ObjectMapper.java')}`
});

// ==========================================
// BLOQUE 1: Inversión de Control (IoC & DI)
// Actividades 1 a 4
// ==========================================

// 1.1 Actividad 1: IoC
const act1 = actividades.find(a => a.id === 'act-01');
peteteTopics.push({
  id: "petete-act-01",
  slug: "act-01-ioc",
  topicNum: "1.1",
  title: "Actividad 1: Inversión de Control (IoC) y Beans",
  moduleTitle: "Bloque 1: Inversión de Control (IoC & DI)",
  moduleShort: "Bloque 1",
  contentMd: `# Actividad 1: Inversión de Control (IoC) y Beans

## 1. Conceptos Clave: Inversión de Control (IoC)

La **Inversión de Control** (*Inversion of Control*) es el principio fundamental de Spring. En lugar de que tus clases instancien dependencias con \`new\`, el **Contenedor de Spring** asume la responsabilidad de crearlas, configurarlas y gestionarlas.

---

[🎬 VÍDEO 3 · Inversión de Control I (a partir del minuto 5)](https://www.youtube.com/watch?v=1F_8kI8n704)

> **💡 Principio Hollywood ("Don't call us, we'll call you"):**
> Con IoC, las clases de la aplicación no buscan ni crean sus dependencias; es el contenedor quien se las inyecta en el momento adecuado.

---

## 2. Código de Tutoría (Isra): Mapa Conceptual y Acoplamiento

${getIsraCode('tut04', '_00_Resumen.java')}

${getIsraCode('tut04', '_02_IoC_DI.java')}

---

## 3. Entregable 1 de ACC

${formatActividadRetoMd(act1?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act1?.solucionDoc)}`
});

// 1.2 Actividad 2: IoD
const act2 = actividades.find(a => a.id === 'act-02');
peteteTopics.push({
  id: "petete-act-02",
  slug: "act-02-iod",
  topicNum: "1.2",
  title: "Actividad 2: Inyección de Dependencias (IoD / DI)",
  moduleTitle: "Bloque 1: Inversión de Control (IoC & DI)",
  moduleShort: "Bloque 1",
  contentMd: `# Actividad 2: Inyección de Dependencias (IoD / DI)

## 1. Conceptos Clave: Inyección de Dependencias (DI)

La **Inyección de Dependencias** es la aplicación práctica de IoC en Spring. Permite desacoplar componentes conectándolos a través de interfaces en lugar de implementaciones concretas.

---

[🎬 VÍDEO 5 · Inyección de Dependencias I (Píldoras Informáticas)](https://www.youtube.com/watch?v=33Kj44N_3fU)

### Estrategias de Inyección
1. **Inyección por Constructor (Recomendada):** Favorece la inmutabilidad y facilita la creación de tests unitarios.
2. **Inyección por Setter / Propiedad:** Se utiliza cuando la dependencia es opcional o configurable en tiempo de ejecución.

---

## 2. Código de Tutoría (Isra): Demostración Práctica de IoC y DI

${getIsraCode('tut04', '_04_Demo_IoC_DI.java')}

---

## 3. Entregable 2 de ACC

${formatActividadRetoMd(act2?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act2?.solucionDoc)}`
});

// 1.3 Actividad 3: Anotaciones
const act3 = actividades.find(a => a.id === 'act-03');
peteteTopics.push({
  id: "petete-act-03",
  slug: "act-03-annotations",
  topicNum: "1.3",
  title: "Actividad 3: Configuración con Java Annotations",
  moduleTitle: "Bloque 1: Inversión de Control (IoC & DI)",
  moduleShort: "Bloque 1",
  contentMd: `# Actividad 3: Configuración con Java Annotations

## 1. Conceptos Clave: De XML a Anotaciones Automáticas

En Spring moderno, las anotaciones sustituyen los ficheros XML y permiten que el contenedor descubra y configure los beans automáticamente.

---

[🎬 VÍDEO 9 · Anotaciones I: @Component (Píldoras Informáticas)](https://www.youtube.com/watch?v=L5y1z34Z0z4)

* **\`@Component\`:** Marca una clase Java para que sea detectada y gestionada por el escáner de componentes.
* **\`@Autowired\`:** Solicita a Spring la inyección automática de la dependencia requerida.
* **\`@Qualifier\`:** Desambigua cuando existen múltiples implementaciones de una misma interfaz.

---

## 2. Código de Tutoría (Isra): Beans y Anotaciones

${getIsraCode('tut04', '_03_Beans_Anotaciones.java')}

---

## 3. Entregable 3 de ACC

${formatActividadRetoMd(act3?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act3?.solucionDoc)}`
});

// 1.4 Actividad 4: Configuraciones
const act4 = actividades.find(a => a.id === 'act-04');
peteteTopics.push({
  id: "petete-act-04",
  slug: "act-04-configuraciones",
  topicNum: "1.4",
  title: "Actividad 4: Alternativas de Configuración en Spring",
  moduleTitle: "Bloque 1: Inversión de Control (IoC & DI)",
  moduleShort: "Bloque 1",
  contentMd: `# Actividad 4: Alternativas de Configuración en Spring

## 1. Conceptos Clave: Configuración 100% Java (@Configuration y @Bean)

La configuración moderna prescinde de XML mediante clases marcadas con \`@Configuration\` y métodos productores anotados con \`@Bean\`.

---

[🎬 VÍDEO 14 · Configuración 100% Código Java (Píldoras Informáticas)](https://www.youtube.com/watch?v=m7N3o7XpZpE)

### Cuándo usar cada estilo
* **Anotaciones directas (\`@Component\` / \`@Service\`):** Para clases de código propio.
* **Clases Java con \`@Bean\`:** Imprescindible para instanciar clases procedentes de librerías de terceros (ej. \`ObjectMapper\`, clientes HTTP).

---

## 2. Código de Tutoría (Isra): Configuración Java y Beans

${getIsraCode('tut05', '_00_Resumen.java')}

${getIsraCode('tut05', 'DemoBeansConfig.java')}

---

## 3. Entregable 4 de ACC

${formatActividadRetoMd(act4?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act4?.solucionDoc)}`
});

// ==========================================
// BLOQUE 2: Arquitectura Web & REST APIs
// Actividades 5 a 7
// ==========================================

// 2.1 Actividad 5: Entorno Spring Boot
const act5 = actividades.find(a => a.id === 'act-05');
peteteTopics.push({
  id: "petete-act-05",
  slug: "act-05-entorno",
  topicNum: "2.1",
  title: "Actividad 5: Preparación del Entorno Spring Boot",
  moduleTitle: "Bloque 2: Arquitectura Web & REST APIs",
  moduleShort: "Bloque 2",
  contentMd: `# Actividad 5: Preparación del Entorno Spring Boot

## 1. Conceptos Clave: Starters y Autoconfiguración

Spring Boot simplifica el desarrollo empresarial mediante:
1. **Starters (\`spring-boot-starter-web\`):** Agrupaciones de librerías probadas y compatibles.
2. **Servidor Embebido (Tomcat):** Ejecución directa como archivo JAR autónomo.
3. **Autoconfiguración (\`@SpringBootApplication\`):** Detección automática de librerías en el classpath.

---

## 2. Código de Tutoría (Isra): Estructura de Paquetes y Arranque

${getIsraCode('tut05', '_03_SpringBoot_Estructura.java')}

---

## 3. Entregable 5 de ACC

${formatActividadRetoMd(act5?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act5?.solucionDoc)}`
});

// 2.2 Actividad 6: Controlador REST
const act6 = actividades.find(a => a.id === 'act-06');
peteteTopics.push({
  id: "petete-act-06",
  slug: "act-06-controller",
  topicNum: "2.2",
  title: "Actividad 6: Creación del Controlador REST",
  moduleTitle: "Bloque 2: Arquitectura Web & REST APIs",
  moduleShort: "Bloque 2",
  contentMd: `# Actividad 6: Creación del Controlador REST

## 1. Conceptos Clave: Controladores REST (@RestController)

El controlador recibe peticiones HTTP y devuelve datos en formato JSON:
* **\`@RestController\`:** Combina \`@Controller\` y \`@ResponseBody\`.
* **\`@RequestMapping\`:** Prefijo de ruta base (ej. \`/api/grupos\`).
* **Verbos HTTP:** \`@GetMapping\`, \`@PostMapping\`, \`@PutMapping\`, \`@DeleteMapping\`.
* **\`ResponseEntity<T>\`:** Permite definir cabeceras y códigos de estado semánticos (200 OK, 201 Created, 404 Not Found).

---

## 2. Código de Tutoría (Isra): Mapeo de Controladores REST

${getIsraCode('tut06', '_00_Resumen.java')}

${getIsraCode('tut06', '_01_RestController_Mappings.java')}

---

## 3. Entregable 6 de ACC

${formatActividadRetoMd(act6?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act6?.solucionDoc)}`
});

// 2.3 Actividad 7: Capa de Servicio
const act7 = actividades.find(a => a.id === 'act-07');
peteteTopics.push({
  id: "petete-act-07",
  slug: "act-07-servicio",
  topicNum: "2.3",
  title: "Actividad 7: Capa de Servicio y Lógica de Negocio",
  moduleTitle: "Bloque 2: Arquitectura Web & REST APIs",
  moduleShort: "Bloque 2",
  contentMd: `# Actividad 7: Capa de Servicio y Lógica de Negocio

## 1. Conceptos Clave: Desacoplamiento por Capas (@Service)

\`\`\`text
Petición HTTP ──> [ Controller ] ──> [ Service ] ──> [ Repository ] ──> BBDD
                        │                  │
                (Enruta y valida)   (Reglas de negocio)
\`\`\`

> **⚠️ Regla de Oro:**
> Los controladores nunca contienen lógica de negocio ni consultas directas a base de datos. Todas las reglas empresariales residen en la capa \`@Service\`.

---

## 2. Código de Tutoría (Isra): Implementación de la Capa de Servicio

${getIsraCode('tut07', '_00_Resumen.java')}

${getIsraCode('tut07', '_01_CapaServicio.java')}

---

## 3. Entregable 7 de ACC

${formatActividadRetoMd(act7?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act7?.solucionDoc)}`
});

// ==========================================
// BLOQUE 3: Persistencia & Modelado JPA
// Actividades 8 y 9
// ==========================================

// 3.1 Actividad 8: Entidades JPA
const act8 = actividades.find(a => a.id === 'act-08');
peteteTopics.push({
  id: "petete-act-08",
  slug: "act-08-entidades-jpa",
  topicNum: "3.1",
  title: "Actividad 8: Entidades Relacionales y Mapeo JPA",
  moduleTitle: "Bloque 3: Persistencia & Modelado JPA",
  moduleShort: "Bloque 3",
  contentMd: `# Actividad 8: Entidades Relacionales y Mapeo JPA

## 1. Conceptos Clave: Mapeo Objeto-Relacional (JPA / Hibernate)

JPA (*Jakarta Persistence API*) estandariza la vinculación entre clases Java y tablas relacionales:
* **\`@Entity\` & \`@Table\`:** Conectan la clase con la tabla en base de datos.
* **\`@Id\` & \`@GeneratedValue\`:** Definen la clave primaria y su generación automática.
* **Relaciones relacionales:** \`@ManyToOne\`, \`@OneToMany\`, \`@JoinColumn\`.

---

## 2. Código de Tutoría (Isra): Modelado y Anotaciones JPA

${getIsraCode('tut08', '_00_Resumen.java')}

${getIsraCode('tut08', '_01_Entidad_Anotaciones.java')}

---

## 3. Entregable 8 de ACC

${formatActividadRetoMd(act8?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act8?.solucionDoc)}`
});

// 3.2 Actividad 9: Repositorios Spring Data JPA
const act9 = actividades.find(a => a.id === 'act-09');
peteteTopics.push({
  id: "petete-act-09",
  slug: "act-09-spring-data-jpa",
  topicNum: "3.2",
  title: "Actividad 9: Repositorios con Spring Data JPA",
  moduleTitle: "Bloque 3: Persistencia & Modelado JPA",
  moduleShort: "Bloque 3",
  contentMd: `# Actividad 9: Repositorios con Spring Data JPA

## 1. Conceptos Clave: JpaRepository y Consultas Declarativas

Spring Data genera automáticamente la implementación de repositorios:
* **Operaciones CRUD estándar:** \`save\`, \`findById\`, \`findAll\`, \`deleteById\`.
* **Query Methods:** Métodos derivados del nombre (ej. \`findByNombre(String nombre)\`).
* **Consultas JPQL:** Definidas con \`@Query\` sobre objetos de dominio.

---

## 2. Código de Tutoría (Isra): Repositorios y Consultas JPQL

${getIsraCode('tut08', '_02_Relaciones_Cascada.java')}

${getIsraCode('tut08', '_03_JPQL.java')}

---

## 3. Entregable 9 de ACC

${formatActividadRetoMd(act9?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act9?.solucionDoc)}`
});

// ==========================================
// BLOQUE 4: DTOs, Validaciones & Errores
// Actividades 10 a 12
// ==========================================

// 4.1 Actividad 10: DTOs
const act10 = actividades.find(a => a.id === 'act-10');
peteteTopics.push({
  id: "petete-act-10",
  slug: "act-10-dtos",
  topicNum: "4.1",
  title: "Actividad 10: Contratos de Comunicación (DTOs)",
  moduleTitle: "Bloque 4: DTOs, Validaciones & Errores",
  moduleShort: "Bloque 4",
  contentMd: `# Actividad 10: Contratos de Comunicación (DTOs)

## 1. Conceptos Clave: El Patrón DTO (Data Transfer Object)

Razones para desacoplar las entidades JPA de las respuestas del controlador:
1. **Seguridad (*Mass Assignment*):** Evita la sobreescritura accidental o maliciosa de campos sensibles.
2. **Desacoplamiento:** Los cambios en las tablas de base de datos no rompen los contratos con clientes externos.
3. **Evitar ciclos infinitos:** Previene el error de serialización recursiva en relaciones bidireccionales.

---

## 2. Código de Tutoría (Isra): Implementación de DTOs

${getIsraCode('tut10', '_00_Resumen.java')}

${getIsraCode('tut10', '_01_DTO_SpringData.java')}

---

## 3. Entregable 10 de ACC

${formatActividadRetoMd(act10?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act10?.solucionDoc)}`
});

// 4.2 Actividad 11: Validaciones
const act11 = actividades.find(a => a.id === 'act-11');
peteteTopics.push({
  id: "petete-act-11",
  slug: "act-11-validaciones",
  topicNum: "4.2",
  title: "Actividad 11: Validación Declarativa de Datos (@Valid)",
  moduleTitle: "Bloque 4: DTOs, Validaciones & Errores",
  moduleShort: "Bloque 4",
  contentMd: `# Actividad 11: Validación Declarativa de Datos (@Valid)

## 1. Conceptos Clave: Bean Validation y Restricciones

Jakarta Bean Validation permite declarar reglas sobre los campos de los DTOs:
* **\`@NotBlank\`:** Verifica que una cadena no sea nula ni esté en blanco.
* **\`@Size(min = 2, max = 50)\`:** Acota la longitud permitida.
* **\`@Positive\`:** Garantiza valores numéricos estrictamente mayores que cero.
* **\`@Valid\`:** Activa la validación automática en los parámetros del controlador.

---

## 2. Código de Tutoría (Isra): Validación Declarativa en Acción

${getIsraCode('tut11', '_00_Resumen.java')}

${getIsraCode('tut11', '_01_Validacion.java')}

---

## 3. Entregable 11 de ACC

${formatActividadRetoMd(act11?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act11?.solucionDoc)}`
});

// 4.3 Actividad 12: Manejo de Errores
const act12 = actividades.find(a => a.id === 'act-12');
peteteTopics.push({
  id: "petete-act-12",
  slug: "act-12-manejo-errores",
  topicNum: "4.3",
  title: "Actividad 12: Control Centralizado de Excepciones",
  moduleTitle: "Bloque 4: DTOs, Validaciones & Errores",
  moduleShort: "Bloque 4",
  contentMd: `# Actividad 12: Control Centralizado de Excepciones

## 1. Conceptos Clave: @RestControllerAdvice y @ExceptionHandler

Centraliza la captura de excepciones sin ensuciar los controladores con bloques \`try-catch\`:
* **\`@RestControllerAdvice\`:** Interceptor global para todos los controladores.
* **\`@ExceptionHandler\`:** Captura tipos específicos de excepciones y devuelve respuestas JSON estructuradas con códigos HTTP semánticos.

---

## 2. Código de Tutoría (Isra): Manejo Centralizado de Excepciones

${getIsraCode('tut11', '_02_Manejo_Errores.java')}

${getIsraCode('tut11', 'GlobalExceptionHandler.java')}

---

## 3. Entregable 12 de ACC

${formatActividadRetoMd(act12?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act12?.solucionDoc)}`
});

// 4.4 Actividad 13: Creación de la Documentación con OpenAPI & Swagger UI
const act13 = actividades.find(a => a.id === 'act-13');
peteteTopics.push({
  id: "petete-act-13",
  slug: "act-13-documentacion-api",
  topicNum: "4.4",
  title: "Actividad 13: Creación de la Documentación de la API (OpenAPI & Swagger UI)",
  moduleTitle: "Bloque 4: DTOs, Validaciones, Errores & OpenAPI",
  moduleShort: "Bloque 4",
  contentMd: `# Actividad 13: Creación de la Documentación de la API (OpenAPI & Swagger UI)

## 1. Conceptos Clave: OpenAPI 3 y springdoc-openapi

Spring Boot permite generar contratos y documentación interactiva de forma automática mediante la especificación **OpenAPI 3** y la librería **springdoc-openapi**:
* **\`@OpenAPIDefinition\`:** Configura los metadatos globales de la API (título, descripción, versión, términos, servidores).
* **\`@Tag\`:** Agrupa endpoints en controladores con descripciones semánticas.
* **\`@Operation\` & \`@ApiResponse\`:** Documentan la intención del endpoint, códigos HTTP (200, 201, 204, 400, 404) y esquemas asociados.
* **\`@Schema\`:** Enriquecen DTOs con descripciones legibles y ejemplos prácticos (\`example = "..."\`).

---

## 2. Dependencia Maven y Configuración
\`\`\`xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.6.0</version>
</dependency>
\`\`\`

Interfaz interactiva disponible en: \`http://localhost:8080/swagger-ui.html\`

---

## 3. Entregable 13 de ACC

${formatActividadRetoMd(act13?.contentMd)}

---

## 4. Solución y Código Documentado

${formatSolucionDocMd(act13?.solucionDoc)}`
});

// ==========================================
// BLOQUE 5: Enterprise, Testing & Evaluación
// ==========================================
const secGuia = getGuiaTopic('seguridad-jwt');
const testGuia = getGuiaTopic('testing');
const autoGuia = getGuiaTopic('autoevaluacion');

peteteTopics.push({
  id: "petete-seguridad-testing",
  slug: "seguridad-y-testing",
  topicNum: "5.1",
  title: "Seguridad JWT y Testing Profesional",
  moduleTitle: "Bloque 5: Enterprise, Testing & Evaluación",
  moduleShort: "Bloque 5",
  contentMd: `# Seguridad JWT y Testing Profesional

En arquitecturas empresariales, las APIs se autentican sin estado mediante **JWT** (*JSON Web Tokens*) y se verifican mediante pruebas automatizadas con **JUnit 5** y **Mockito**.

---

## 1. Seguridad Stateless con JWT

${secGuia ? secGuia.contentMd : ''}

---

## 2. Testing Profesional con JUnit 5 y Mockito

${testGuia ? testGuia.contentMd : ''}`
});

peteteTopics.push({
  id: "petete-autoevaluacion",
  slug: "autoevaluacion-final",
  topicNum: "5.2",
  title: "Checklist de Preparación y Autoevaluación Final",
  moduleTitle: "Bloque 5: Enterprise, Testing & Evaluación",
  moduleShort: "Bloque 5",
  contentMd: `# Checklist de Preparación y Autoevaluación Final

${autoGuia ? autoGuia.contentMd : ''}`
});

// =========================================================================
// BLOQUE 6: Cuerpo Teórico Consolidado (De POO a Spring Boot · IFCD0177)
// =========================================================================
const sepeConsolidatedTopics = require("./sepe_consolidated_bloque6.cjs");
peteteTopics.push(...sepeConsolidatedTopics);

// Guardar archivo JSON en public
fs.writeFileSync(outputPath, JSON.stringify(peteteTopics, null, 2), "utf-8");
console.log(`Successfully generated restructured Petete with ${peteteTopics.length} topics into ${outputPath}`);

// Guardar copia en dist si existe
if (fs.existsSync(distOutputPath)) {
  fs.writeFileSync(distOutputPath, JSON.stringify(peteteTopics, null, 2), "utf-8");
  console.log(`Successfully updated ${distOutputPath}`);
}
