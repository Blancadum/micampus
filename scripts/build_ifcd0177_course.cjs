const fs = require('fs');
const path = require('path');

const modules = [
  {
    id: "m1",
    title: "Módulo 1: Fundamentos de la Programación Orientada a Objetos",
    short: "M1",
    topics: [
      {
        num: "1.1",
        title: "Paradigma de Orientación a Objetos: Clases y Estado",
        slug: "m1-1-poo-clases-estado",
        contentMd: `# 1.1 Paradigma Orientado a Objetos: Clases y Estado

La **Programación Orientada a Objetos (POO)** organiza el software en torno a **objetos** que encapsulan datos (**estado**) y operaciones (**comportamiento**).

### 🏛️ Pilares Básicos
* **Clase:** Plantilla o molde que define los atributos y métodos comunes.
* **Objeto:** Instancia concreta en memoria de una clase.
* **Estado:** Valores actuales de los campos de una instancia en un instante dado.
* **Comportamiento:** Métodos que definen las acciones que el objeto puede realizar.

\`\`\`java
public class Estudiante {
    // Atributos (Estado)
    private String matricula;
    private String nombre;
    private double notaMedia;

    // Constructor
    public Estudiante(String matricula, String nombre) {
        this.matricula = matricula;
        this.nombre = nombre;
        this.notaMedia = 0.0;
    }

    // Comportamiento
    public void registrarCalificacion(double calificacion) {
        if (calificacion >= 0 && calificacion <= 10) {
            this.notaMedia = (this.notaMedia == 0) ? calificacion : (this.notaMedia + calificacion) / 2.0;
        }
    }
}
\`\`\``
      },
      {
        num: "1.2",
        title: "Encapsulamiento y Modificadores de Acceso",
        slug: "m1-2-encapsulamiento",
        contentMd: `# 1.2 Encapsulamiento y Modificadores de Acceso

El **encapsulamiento** consiste en ocultar la estructura interna de los objetos y restringir el acceso directo a sus variables, protegiendo la integridad de los datos mediante métodos controlados (*getters* y *setters*).

### 🛡️ Tabla de Modificadores en Java
| Modificador | Misma Clase | Mismo Paquete | Subclase (Heredada) | Cualquier Lugar |
| :--- | :---: | :---: | :---: | :---: |
| \`private\` | ✅ | ❌ | ❌ | ❌ |
| *(default)* | ✅ | ✅ | ❌ | ❌ |
| \`protected\` | ✅ | ✅ | ✅ | ❌ |
| \`public\` | ✅ | ✅ | ✅ | ✅ |

> [!TIP]
> **Regla de Oro:** Declara siempre los atributos como \`private\` y expón únicamente los métodos necesarios para mantener invariantes de negocio seguras.`
      },
      {
        num: "1.3",
        title: "Herencia y Reutilización de Código",
        slug: "m1-3-herencia",
        contentMd: `# 1.3 Herencia y Reutilización de Código

La **herencia** permite que una clase derivada (*subclase*) herede atributos y métodos de una clase base (*superclase*), facilitando la reutilización y la jerarquía taxonómica de conceptos.

\`\`\`java
// Superclase
public class Empleado {
    protected String dni;
    protected String nombre;
    protected double salarioBase;

    public Empleado(String dni, String nombre, double salarioBase) {
        this.dni = dni;
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    public double calcularNomina() {
        return salarioBase;
    }
}

// Subclase especializada
public class Desarrollador extends Empleado {
    private String tecnologiaPrincipal;

    public Desarrollador(String dni, String nombre, double salarioBase, String tecnologia) {
        super(dni, nombre, salarioBase);
        this.tecnologiaPrincipal = tecnologia;
    }

    @Override
    public double calcularNomina() {
        return super.calcularNomina() * 1.15; // 15% bonus técnico
    }
}
\`\`\``
      },
      {
        num: "1.4",
        title: "Polimorfismo, Sobrecarga y Sobrescritura",
        slug: "m1-4-polimorfismo",
        contentMd: `# 1.4 Polimorfismo, Sobrecarga y Sobrescritura

El **polimorfismo** permite que objetos de diferentes clases respondan al mismo mensaje de manera distinta, invocando el método correspondiente en tiempo de ejecución (**ligadura dinámica**).

### Sobrecarga (*Overloading*) vs Sobrescritura (*Overriding*)
* **Sobrecarga (Estático):** Mismo nombre de método con distinta firma (parámetros) en la misma clase.
* **Sobrescritura (Dinámico):** La subclase redefine un método heredado con la anotación \`@Override\`.

\`\`\`java
List<Empleado> plantilla = List.of(
    new Empleado("111A", "Carlos", 1800),
    new Desarrollador("222B", "Ana", 2400, "Java Spring")
);

// Cada objeto ejecuta su propia versión de calcularNomina() polimórficamente
for (Empleado emp : plantilla) {
    System.out.printf("%s: %.2f €%n", emp.nombre, emp.calcularNomina());
}
\`\`\``
      },
      {
        num: "1.5",
        title: "Clases Abstractas e Interfaces en Java Moderno",
        slug: "m1-5-interfaces-abstractas",
        contentMd: `# 1.5 Clases Abstractas e Interfaces

Java proporciona dos mecanismos fundamentales para definir contratos de comportamiento y abstracción pura:

### Comparativa: Clases Abstractas vs Interfaces
| Característica | Clase Abstracta (\`abstract class\`) | Interfaz (\`interface\`) |
| :--- | :--- | :--- |
| **Herencia múltiple** | ❌ Solo herencia simple (\`extends\`) | ✅ Múltiples interfaces (\`implements\`) |
| **Estado (atributos)** | ✅ Puede tener atributos de instancia | ❌ Solo constantes (\`public static final\`) |
| **Constructores** | ✅ Puede tener constructores | ❌ No tiene constructores |
| **Métodos con cuerpo** | ✅ Métodos concretos y abstractos | ✅ Métodos \`default\` y \`static\` |

\`\`\`java
public interface Notificable {
    void enviar(String mensaje);

    default void registrarLog(String mensaje) {
        System.out.println("[AUDITORÍA] " + mensaje);
    }
}
\`\`\``
      },
      {
        num: "1.6",
        title: "Gestión Robusta de Excepciones",
        slug: "m1-6-excepciones",
        contentMd: `# 1.6 Gestión Robusta de Excepciones en Java

El manejo de errores en Java se basa en una jerarquía tipada derivada de \`Throwable\`:

* **Checked Exceptions (\`Exception\`):** Errores previsibles recuperables (I/O, SQL). Obligatorio capturar con \`try-catch\` o declarar con \`throws\`.
* **Unchecked Exceptions (\`RuntimeException\`):** Errores de lógica del programador (\`NullPointerException\`, \`IllegalArgumentException\`).

\`\`\`java
public class ServicioTransferencia {
    public void transferir(Cuenta origen, Cuenta destino, double importe) throws SaldoInsuficienteException {
        if (origen.getSaldo() < importe) {
            throw new SaldoInsuficienteException("Saldo actual insuficiente: " + origen.getSaldo());
        }
        origen.debitar(importe);
        destino.acreditar(importe);
    }
}
\`\`\``
      }
    ]
  },
  {
    id: "m2",
    title: "Módulo 2: Patrones de Diseño y Buenas Prácticas en Java",
    short: "M2",
    topics: [
      {
        num: "2.1",
        title: "Principios SOLID en el Diseño Orientado a Objetos",
        slug: "m2-1-principios-solid",
        temaTitle: "Principios SOLID",
        contentMd: `# Principios SOLID en Java

Los 5 principios esenciales formulados por Robert C. Martin ("Uncle Bob") para construir software modular, mantenible y extensible:

1. **S — Single Responsibility Principle (SRP):** Una clase debe tener una sola razón para cambiar.
2. **O — Open/Closed Principle (OCP):** Abierto para extensión, cerrado para modificación.
3. **L — Liskov Substitution Principle (LSP):** Los subtipos deben poder sustituir a sus tipos base sin romper el programa.
4. **I — Interface Segregation Principle (ISP):** Muchas interfaces específicas son mejores que una interfaz generalista.
5. **D — Dependency Inversion Principle (DIP):** Depende de abstracciones, no de implementaciones concretas.`
      },
      {
        num: "2.2",
        title: "Patrones Creacionales: Singleton, Factory y Builder",
        slug: "m2-2-patrones-creacionales",
        temaTitle: "Patrones Creacionales",
        contentMd: `# Patrones Creacionales: Singleton, Factory y Builder

Controlan y abstraen el proceso de instanciación de objetos en tiempo de ejecución.

### 🏭 1. Factory Method
Desacopla la creación del objeto concreto del código cliente mediante una interfaz unificada:
\`\`\`java
public interface Notificador { void notificar(String msg); }

public class NotificadorFactory {
    public static Notificador crear(String tipo) {
        return switch (tipo.toUpperCase()) {
            case "SMS" -> new SmsNotificador();
            case "EMAIL" -> new EmailNotificador();
            default -> throw new IllegalArgumentException("Tipo desconocido: " + tipo);
        };
    }
}
\`\`\`

### 🏗️ 2. Builder
Ideal para construir objetos inmutables con múltiples parámetros opcionales sin constructores telescópicos.`
      },
      {
        num: "2.3",
        title: "Patrones Estructurales: Adapter, Decorator y Facade",
        slug: "m2-3-patrones-estructurales",
        temaTitle: "Patrones Estructurales",
        contentMd: `# Patrones Estructurales en Java

Permiten organizar clases y objetos en estructuras más amplias manteniendo la flexibilidad:

* **Adapter:** Convierte la interfaz de una clase en otra interfaz esperada por los clientes (compatibilidad de librerías legacy).
* **Decorator:** Añade responsabilidades a un objeto de forma dinámica sin modificar la clase base (ej: \`BufferedReader(new FileReader(...))\`).
* **Facade:** Ofrece una interfaz simplificada de alto nivel para un subsistema complejo de múltiples clases.`
      },
      {
        num: "2.4",
        title: "Patrones de Comportamiento: Observer y Strategy",
        slug: "m2-4-patrones-comportamiento",
        temaTitle: "Patrones de Comportamiento",
        contentMd: `# Patrones de Comportamiento: Observer y Strategy

Gestionan los algoritmos, la asignación de responsabilidades y la comunicación entre objetos.

### 🎯 Strategy Pattern con Lambdas
\`\`\`java
@FunctionalInterface
public interface EstrategiaDescuento {
    double aplicar(double precio);
}

public class CarritoCompra {
    public double calcularTotal(double base, EstrategiaDescuento estrategia) {
        return estrategia.aplicar(base);
    }
}

// Uso elegante con lambdas en Java moderno:
CarritoCompra carrito = new CarritoCompra();
double totalBlackFriday = carrito.calcularTotal(100.0, precio -> precio * 0.80);
\`\`\``
      },
      {
        num: "2.5",
        title: "Colecciones Avanzadas y Programación Funcional (Streams)",
        slug: "m2-5-colecciones-streams",
        temaTitle: "Colecciones y Streams",
        contentMd: `# Colecciones Avanzadas y Streams API

El API de Streams de Java permite procesar conjuntos de datos de forma declarativa, fluida y paralela:

\`\`\`java
List<Empleado> empleados = obtenerEmpleados();

// Filtrado, transformación y agregación en pipeline funcional
double gastoSalarialJavaDevs = empleados.stream()
    .filter(e -> "Java".equals(e.getEspecialidad()))
    .filter(e -> e.getSalario() > 2000)
    .mapToDouble(Empleado::getSalario)
    .sum();
\`\`\``
      }
    ]
  },
  {
    id: "m3",
    title: "Módulo 3: Persistencia y Manejo de Bases de Datos en Java",
    short: "M3",
    topics: [
      {
        num: "3.1",
        title: "De JDBC al Mapeo Objeto-Relacional (ORM)",
        slug: "m3-1-jdbc-a-orm",
        temaTitle: "Persistencia en Java",
        contentMd: `# De JDBC al Mapeo Objeto-Relacional (ORM)

### 🔌 La Brecha de Impedancia Objeto-Relacional
En el mundo de los objetos trabajamos con referencias, herencia y polimorfismo; en las bases de datos relacionales trabajamos con tablas, filas, claves primarias y claves foráneas.

* **JDBC (Java Database Connectivity):** Nivel bajo con gestión manual de \`Connection\`, \`PreparedStatement\` y mapeo manual de \`ResultSet\`.
* **ORM (Hibernate / JPA):** Automatiza la traducción bidireccional entre filas SQL y objetos Java de forma transparente y segura.`
      },
      {
        num: "3.2",
        title: "Anotaciones Esenciales de JPA (@Entity, @Id, @Table)",
        slug: "m3-2-anotaciones-jpa",
        temaTitle: "Anotaciones JPA",
        contentMd: `# Anotaciones Esenciales de JPA

JPA (*Jakarta Persistence API*) es la especificación estándar en Java para definir entidades de persistencia:

\`\`\`java
import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_producto", nullable = false, length = 120)
    private String nombre;

    @Column(nullable = false, precision = 10, scale = 2)
    private Double precio;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    // Constructor por defecto obligatorio para JPA
    public Producto() {}
}
\`\`\``
      },
      {
        num: "3.3",
        title: "Mapeo de Relaciones en Cascada (@OneToMany, @ManyToOne)",
        slug: "m3-3-relaciones-jpa",
        temaTitle: "Relaciones de Entidades",
        contentMd: `# Relaciones JPA y Operaciones en Cascada

### 🔗 Tipos de Cardinalidad
* **\`@ManyToOne\`:** Muchos pedidos pertenecen a un cliente (*dueño de la clave foránea*).
* **\`@OneToMany(mappedBy = "cliente")\`:** Un cliente tiene una lista de pedidos.
* **\`@ManyToMany\`:** Alumnos y asignaturas mediante tabla intermedia con \`@JoinTable\`.

\`\`\`java
@Entity
public class Cliente {
    @Id @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> pedidos = new ArrayList<>();
}
\`\`\``
      },
      {
        num: "3.4",
        title: "Consultas Avanzadas con JPQL y Ciclo de Vida",
        slug: "m3-4-jpql-ciclo-vida",
        temaTitle: "JPQL y EntityManager",
        contentMd: `# Consultas JPQL y Ciclo de Vida de la Entidad

**JPQL (Java Persistence Query Language)** opera sobre el modelo de objetos y entidades en lugar de sobre las tablas SQL:

\`\`\`java
TypedQuery<Producto> query = em.createQuery(
    "SELECT p FROM Producto p WHERE p.categoria = :cat AND p.precio <= :max ORDER BY p.precio ASC",
    Producto.class
);
query.setParameter("cat", Categoria.INFORMATICA);
query.setParameter("max", 500.0);
List<Producto> catalogo = query.getResultList();
\`\`\`

### 🔄 Estados del Ciclo de Vida
1. **Transient (Nuevo):** Creado en memoria con \`new\`, sin id asignado en BBDD.
2. **Managed (Gestionado):** Asociado al \`EntityManager\` y monitorizado para cambios.
3. **Detached (Desconectado):** La sesión se ha cerrado; ya no se sincroniza automáticamente.
4. **Removed (Eliminado):** Marcado para borrado con \`em.remove()\`.`
      }
    ]
  },
  {
    id: "m4",
    title: "Módulo 4: Desarrollo de Aplicaciones Web con Spring Framework",
    short: "M4",
    topics: [
      {
        num: "4.1",
        title: "Arquitectura de Spring Framework, IoC y DI",
        slug: "m4-1-spring-ioc-di",
        temaTitle: "Spring Core",
        contentMd: `# Arquitectura de Spring Framework: Inversión de Control

Spring Framework revolucionó Java introduciendo el contenedor de **Inversión de Control (IoC)** y la **Inyección de Dependencias (DI)**.

### 🔄 Inyección por Constructor (Práctica Oficial)
\`\`\`java
@Service
public class PedidoService {

    private final PedidoRepository pedidoRepo;
    private final NotificadorService notificador;

    // Spring inyecta automáticamente las dependencias por constructor
    public PedidoService(PedidoRepository pedidoRepo, NotificadorService notificador) {
        this.pedidoRepo = pedidoRepo;
        this.notificador = notificador;
    }
}
\`\`\``
      },
      {
        num: "4.2",
        title: "Spring Boot: Autoconfiguración y Arquitectura por Capas",
        slug: "m4-2-springboot-arquitectura",
        temaTitle: "Spring Boot",
        contentMd: `# Spring Boot y Arquitectura por Capas

Spring Boot elimina la configuración pesada de XML mediante el principio de **convención sobre configuración** (*opinionated defaults*).

### 🏛️ Las Tres Capas
1. **Controlador (\`@RestController\`):** Recibe las peticiones HTTP, valida datos de entrada y devuelve DTOs / JSON.
2. **Servicio (\`@Service\`):** Implementa la lógica de negocio, reglas de cálculo y transacciones.
3. **Repositorio (\`@Repository\`):** Acceso a base de datos mediante Spring Data JPA.`
      },
      {
        num: "4.3",
        title: "APIs RESTful con @RestController y ResponseEntity",
        slug: "m4-3-api-rest-spring",
        temaTitle: "APIs RESTful",
        contentMd: `# APIs RESTful con Spring Boot

Diseño de endpoints conformes a los estándares HTTP y REST:

\`\`\`java
@RestController
@RequestMapping("/api/v1/productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody @Valid ProductoDTO dto) {
        ProductoDTO creado = service.guardar(dto);
        URI ubicacion = URI.create("/api/v1/productos/" + creado.id());
        return ResponseEntity.created(ubicacion).body(creado);
    }
}
\`\`\``
      },
      {
        num: "4.4",
        title: "Preparación para la Prueba de Evaluación Final",
        slug: "m4-4-evaluacion-final-prep",
        temaTitle: "Evaluación Final",
        contentMd: `# Preparación para la Evaluación Final (30/11)

> 🗓️ **Fecha Límite Inamovible:** 30 de Noviembre de 2026

### 📝 Checklist de Verificación para Superar el Curso
* [ ] **Contenidos multimedia:** 100% de los 4 módulos visualizados en el Campus de Enclave Formación.
* [ ] **Test de Autoevaluación 1 a 4:** Completados con nota superior a 5.0 (peso: 30%).
* [ ] **Actividad Obligatoria de Entrega:** Caso práctico subido en la plataforma y corregido por Javier García Lobo (peso: 30%).
* [ ] **Prueba de Evaluación Final:** Examen integral final resuelto con éxito (peso: 70%).
* [ ] **Diploma:** Descarga y acreditación oficial de la Especialidad Formativa IFCD0177.`
      }
    ]
  }
];

const allCourseTopics = [];

modules.forEach(m => {
  m.topics.forEach((t, idx) => {
    allCourseTopics.push({
      id: t.slug,
      moduleId: m.id,
      moduleShort: m.short,
      moduleTitle: m.title,
      topicNum: t.num,
      title: t.title,
      slug: t.slug,
      badge: "JAVA · IFCD0177",
      contentMd: t.contentMd
    });
  });
});

// Set prev and next slugs
for (let i = 0; i < allCourseTopics.length; i++) {
  if (i > 0) allCourseTopics[i].prevSlug = allCourseTopics[i - 1].slug;
  if (i < allCourseTopics.length - 1) allCourseTopics[i].nextSlug = allCourseTopics[i + 1].slug;
}

const outputPath = path.join(__dirname, '../public/data/extra/ifcd0177_curso.json');
fs.writeFileSync(outputPath, JSON.stringify(allCourseTopics, null, 2), 'utf-8');
console.log(`Generado exitosamente ${allCourseTopics.length} temas en ${outputPath}`);
