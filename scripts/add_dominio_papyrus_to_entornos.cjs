const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../public/data/ioc/lecciones/entornos.json');
const distJsonPath = path.join(__dirname, '../dist/data/ioc/lecciones/entornos.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 1. Localizar el tema 2.6 (id u1-2-5 o slug 2-6-resolver-un-enunciado-de-clases-paso-a-paso)
const topic26 = data.find(t => t.slug === '2-6-resolver-un-enunciado-de-clases-paso-a-paso' || t.id === 'u1-2-5');
if (!topic26) {
  console.error('Topic 2.6 not found!');
  process.exit(1);
}

// Añadir la subsección 2.6.4 si no existe
if (!topic26.subsections) topic26.subsections = [];
const existsSub4 = topic26.subsections.some(s => s.id === '2-6-4-modelado-dominio-4clases-16atributos');
if (!existsSub4) {
  topic26.subsections.push({
    id: '2-6-4-modelado-dominio-4clases-16atributos',
    slug: '2-6-4-modelado-dominio-4clases-16atributos',
    topicNum: '2.6.4',
    title: 'Dominio (4 Clases / 16 Atributos)',
    isEac: false
  });
}

const tab4Content = `### Enunciado: Modelado de Dominio — Sistema de Biblioteca (4 Clases y 16 Atributos)
> *«Nos piden modelizar una biblioteca. Existen libros, con su título, su ISBN y una lista de autores. Los libros están asociados a un conjunto de temas. Un tema tiene un nombre y un tema puede estar asociado a muchos libros. De cada autor queremos guardar su nombre y su apellido y sus datos de contacto, que están formados por un email y un teléfono. Un autor tiene un estilo, pero un estilo puede ser utilizado por muchos autores. De un estilo se guarda el nombre y la descripción. El cliente quiere poder gestionar libros, los autores...*
> 
> *Después de LIBERAR (en producción) la primera versión, el cliente nos pide ahora que en un libro se indique si está recomendado. Él pretende recomendar cada mes una serie de libros.*
> 
> *Restricción obligatoria de proyecto: **Exactamente 4 clases y un total de 16 atributos** (proyecto y clases únicas para todos los grupos).»*

---

#### 📋 Paso 1: Cumplimiento de la Rúbrica Estricta (4 Clases y 16 Atributos)
Para encajar la especificación académica de **exactamente 4 clases con un total de 16 atributos** (4 atributos por entidad) manteniendo la integridad del dominio:

| Clase UML | Atributos UML Encapsulados (\`-\`) | Rol y Justificación en el Dominio |
|---|---|---|
| **Libro** | \`- id: Long\`<br>\`- isbn: String\`<br>\`- titulo: String\`<br>\`- recomendado: Boolean = false\` | Entidad agregada principal. El atributo \`recomendado\` responde a la evolución del software tras su puesta en producción. |
| **Autor** | \`- id: Long\`<br>\`- nombre: String\`<br>\`- apellidos: String\`<br>\`- contacto: Contacto\` *(o \`- telefono: String\`)* | Creador literario. Asocia un estilo literario y datos de comunicación. |
| **Estilo** | \`- id: Long\`<br>\`- nombre: String\`<br>\`- descripcion: String\`<br>\`- epoca: String\` | Clasificación literaria compartida por múltiples autores (\`N..1\`). |
| **Tema** | \`- id: Long\`<br>\`- nombre: String\`<br>\`- descripcion: String\`<br>\`- codigo: String\` | Categorización temática de los libros en relación muchos a muchos (\`N..M\`). |

> 💡 **Nota sobre los datos de contacto:** En diseño orientado a objetos y DDD, \`Contacto\` se modela conceptualmente como un **Value Object** (objeto embebido con \`email\` y \`telefono\`) dentro de \`Autor\`, permitiendo que las 4 entidades del sistema de persistencia sean \`Libro\`, \`Autor\`, \`Estilo\` y \`Tema\`.

---

#### 📐 Paso 2: Diagrama de Clases UML en Papyrus

\`\`\`text
 ┌─────────────────────────────────────────┐                     0..* ┌──────────────────────────┐
 │                  Libro                  │ ───────────────────────> │           Tema           │
 ├─────────────────────────────────────────┤  asociado a              ├──────────────────────────┤
 │ - id: Long                              │                          │ - id: Long               │
 │ - isbn: String                          │                          │ - nombre: String         │
 │ - titulo: String                        │                          │ - descripcion: String    │
 │ - recomendado: Boolean = false          │                          │ - codigo: String         │
 └────────────────────┬────────────────────┘                          └──────────────────────────┘
                 0..* │
                      │ escrito por
                      ▼ 1..*
 ┌─────────────────────────────────────────┐               0..*     1 ┌──────────────────────────┐
 │                  Autor                  │ ───────────────────────> │          Estilo          │
 ├─────────────────────────────────────────┤  sigue                   ├──────────────────────────┤
 │ - id: Long                              │                          │ - id: Long               │
 │ - nombre: String                        │                          │ - nombre: String         │
 │ - apellidos: String                     │                          │ - descripcion: String    │
 │ - contacto: Contacto                    │                          │ - epoca: String          │
 └────────────────────┬────────────────────┘                          └──────────────────────────┘
                    1 │
                      │ tiene (composición de valor)
                      ▼ 1
 ┌─────────────────────────────────────────┐
 │       <<Value Object>> Contacto         │
 ├─────────────────────────────────────────┤
 │ - email: String                         │
 │ - telefono: String                      │
 └─────────────────────────────────────────┘
\`\`\`

---

#### 🖥️ Paso 3: Construcción Paso a Paso en Eclipse Papyrus

1. **Crear el Proyecto de Modelado:**
   - Menú: \`File\` ➔ \`New\` ➔ \`Other...\` ➔ \`Papyrus\` ➔ \`Papyrus Project\`.
   - Seleccionar lenguaje: **UML**.
   - Nombre de proyecto: \`GestionBiblioteca_UML\`.
   - En la pantalla de diagramas, marcar **Class Diagram** con el nombre \`DiagramaDominioBiblioteca\`.

2. **Crear las Clases:**
   - En la paleta derecha (*Palette*), seleccionar la herramienta **Class** y hacer clic 4 veces sobre el lienzo para instanciar \`Libro\`, \`Autor\`, \`Estilo\` y \`Tema\`.
   - Crear una quinta clase y en su estereotipo asignarle \`<<dataType>>\` o tratarla como clase de valor para \`Contacto\`.

3. **Añadir Atributos y Visibilidades (Vista Properties):**
   - Seleccionar cada clase ➔ pestaña inferior **Properties** ➔ **UML** ➔ **Attributes** ➔ botón verde **+**.
   - Asignar nombre, tipo de dato UML (\`String\`, \`Integer\`, \`Boolean\`) y visibilidad **Private** (\`-\`).
   - Para \`recomendado\` en \`Libro\`: establecer **Default Value** en \`false\`.

4. **Trazar las Asociaciones y Multiplicidades:**
   - **Libro con Autor:** Seleccionar herramienta **Association** de la paleta. Trazar de \`Libro\` a \`Autor\`. En propiedades de los extremos (*Association Ends*):
     - Extremo Libro: Multiplicidad \`0..*\`
     - Extremo Autor: Multiplicidad \`1..*\`
   - **Libro con Tema:** Trazar asociación \`0..*\` a \`0..*\`.
   - **Autor con Estilo:** Trazar asociación de muchos autores (\`0..*\`) a exactamente un estilo (\`1\`).
   - **Autor con Contacto:** Seleccionar herramienta **Composite** (composición con rombo negro ♦) indicando que los datos de contacto no existen independientemente del autor.

---

#### 🔄 Paso 4: Requisito Evolutivo Post-Producción ("Libro Recomendado")

El enunciado plantea una situación real de ingeniería de software:
> *«Después de LIBERAR en producción la primera versión, el cliente nos pide ahora que en un libro se indique si está recomendado. Pretende recomendar cada mes una serie de libros.»*

##### ¿Por qué es un reto arquitectónico y cómo se resuelve?
1. **Principio Abierto/Cerrado (OCP - Open/Closed Principle):**
   - El modelo existente debe poder **extenderse** para nuevas funcionalidades sin **modificar** ni romper el comportamiento de los clientes que ya consumen la versión 1.0 en producción.
2. **Impacto en Base de Datos (Retrocompatibilidad):**
   - No se puede añadir una columna \`NOT NULL\` sin valor por defecto a una tabla con millones de registros ya existentes.
   - En la migración de BBDD (Flyway / Liquibase) se define un valor por defecto seguro:
     \`\`\`sql
     -- V2__anadir_recomendado_a_libros.sql
     ALTER TABLE libros ADD COLUMN recomendado BOOLEAN DEFAULT FALSE NOT NULL;
     \`\`\`
3. **Diseño Temporal de la Recomendación Mensual:**
   - En una primera aproximación con la restricción de 16 atributos: \`Boolean recomendado = false\`.
   - En una arquitectura avanzada evolutiva: si el cliente quiere *recomendar cada mes una serie de libros*, se puede sustituir o acompañar con \`LocalDate fechaRecomendacion\` o un agregador \`RecomendacionMensual(mes, anio, listaLibros)\`.

---

#### ⚙️ Paso 5: Mapeo de Objetos — ORM vs ODM y Rendimiento

El modelado visual de Papyrus es independiente del motor de persistencia final:

| Característica | ORM (Object-Relational Mapping) | ODM (Object-Document Mapping) |
|---|---|---|
| **Definición** | Mapea objetos Java a **Bases de Datos Relacionales** (tablas, filas, claves foráneas). | Mapea objetos Java a **Bases de Datos de Documentos** (JSON/BSON jerárquicos). |
| **Frameworks de referencia** | **Spring Data JPA** / Hibernate | **Spring Data MongoDB** |
| **Mapeo de Relaciones** | Tablas intermedias (\`JOIN\`), claves foráneas (\`FK\`), anotaciones \`@OneToMany\`, \`@ManyToMany\`. | Documentos anidados o referencias por ID (\`@Document\`, \`@DBRef\`). |
| **Rendimiento de Memoria** | **Mayor consumo:** Persistence Context (caché de nivel 1), proxies CGLIB para carga perezosa y dirty checking. | **Menor consumo:** Mapeo directo y liviano del árbol BSON en memoria. |
| **Rendimiento de Ejecución** | Requiere optimización contra el problema de las **N+1 consultas** (usar \`JOIN FETCH\` o \`@EntityGraph\`). | **Lecturas ultrarrápidas:** Al persistir el documento completo embebido, 1 sola lectura por ID recupera el libro con sus autores y temas. |

##### Principio de Independencia de Base de Datos (Inversión de Dependencias - DIP):
> 🚨 **Regla de oro de la Arquitectura Limpia:**  
> *«El Dominio nunca debe depender del tipo de Base de Datos.»*  
> Las entidades del modelo UML (\`Libro\`, \`Autor\`) y los contratos (\`LibroRepository\`) residen en el núcleo de la aplicación. Los adaptadores de persistencia (JPA con MySQL o MongoDB) son detalles técnicos intercambiables de la capa de infraestructura.

---

#### 🏢 Paso 6: Catálogo de Modelado para los Proyectos de Grupo (4 Clases y 16 Atributos)

A continuación tienes la distribución exacta para los diferentes temas asignados a los grupos de trabajo:

| Proyecto | Clase 1 (4 Atributos) | Clase 2 (4 Atributos) | Clase 3 (4 Atributos) | Clase 4 (4 Atributos) |
|---|---|---|---|---|
| **Doctor / Clínica** | \`Doctor\` (id, colegiado, nombre, especialidad) | \`Paciente\` (id, dni, nombre, historial) | \`Cita\` (id, fechaHora, motivo, estado) | \`Tratamiento\` (id, descripcion, medicacion, dias) |
| **Company** | \`Empresa\` (id, cif, razonSocial, direccion) | \`Departamento\` (id, codigo, nombre, presupuesto) | \`Empleado\` (id, dni, nombre, salario) | \`Proyecto\` (id, titulo, fechaInicio, entregado) |
| **Car Hire** | \`Vehiculo\` (id, matricula, marca, tarifaDia) | \`Cliente\` (id, dni, nombre, carnetConducir) | \`Alquiler\` (id, fechaInicio, fechaFin, fianza) | \`Seguro\` (id, poliza, tipoCobertura, franquicia) |
| **Hotel** | \`Hotel\` (id, nombre, estrellas, ciudad) | \`Habitacion\` (id, numero, precioNoche, tipo) | \`Huesped\` (id, pasaporte, nombre, telefono) | \`Reserva\` (id, checkIn, checkOut, pagada) |
| **Sport** | \`Club\` (id, nombre, fundacion, ciudad) | \`Equipo\` (id, categoria, division, temporada) | \`Deportista\` (id, ficha, nombre, dorsal) | \`Entrenamiento\` (id, fecha, duracion, campo) |
| **Shop** | \`Tienda\` (id, codigo, nombre, direccion) | \`Producto\` (id, sku, nombre, precio) | \`Cliente\` (id, email, nombre, puntosFidelidad) | \`Pedido\` (id, fecha, total, entregado) |
| **Veterinary Clinic** | \`Clinica\` (id, cif, nombre, telefono) | \`Veterinario\` (id, colegiado, nombre, turno) | \`Mascota\` (id, microchip, nombre, especie) | \`Consulta\` (id, fecha, diagnostico, coste) |
| **Department** | \`Facultad\` (id, codigo, nombre, campus) | \`Departamento\` (id, sigla, nombre, edificio) | \`Profesor\` (id, despacho, nombre, categoria) | \`Asignatura\` (id, codigo, nombre, creditos) |
| **Movie** | \`Productora\` (id, cif, nombre, pais) | \`Pelicula\` (id, titulo, duracion, estreno) | \`Director\` (id, dni, nombre, biografia) | \`Actor\` (id, dni, nombre, cache) |
`;

// Asegurar que el folderArchive tiene la 4ª pestaña
if (!topic26.folderArchive) {
  topic26.folderArchive = {
    folderTitle: 'Dossier de Ejemplos Prácticos de Clases (UML)',
    folderIcon: '📂',
    tabs: []
  };
}

const tabIndex = topic26.folderArchive.tabs.findIndex(t => t.id === '2-6-4-modelado-dominio-4clases-16atributos');
const tabData = {
  id: '2-6-4-modelado-dominio-4clases-16atributos',
  slug: '2-6-4-modelado-dominio-4clases-16atributos',
  label: '4. Dominio (4 Clases / 16 Atributos)',
  icon: '📚',
  title: 'Ejemplo 4: Modelado de Dominio, Papyrus y Mapeo ORM/ODM',
  subtitle: 'Caso Biblioteca, evolución en producción, Papyrus paso a paso y plantilla de proyectos de grupo',
  isEac: false,
  contentMd: tab4Content
};

if (tabIndex >= 0) {
  topic26.folderArchive.tabs[tabIndex] = tabData;
} else {
  topic26.folderArchive.tabs.push(tabData);
}

// 2. Enriquecer también el Tema 4.4: Generar código Java desde un diagrama (id u1-4-3)
const topic44 = data.find(t => t.slug === '4-4-generar-codigo-java-desde-un-diagrama' || t.id === 'u1-4-3');
if (topic44) {
  topic44.contentMd = `Mediante **Papyrus Software Designer** podemos convertir clases UML en código fuente Java esqueleto listo para compilar:

### Procedimiento en Eclipse:
1. Abrir el diagrama de clases (\`Class Diagram\`) en Papyrus.
2. Hacer clic secundario en el fondo del lienzo o sobre el paquete del modelo en el *Model Explorer*.
3. Seleccionar **Designer ➔ Generate code ➔ Java**.
4. Indicar el proyecto Java de destino en el workspace de Eclipse.

---

### Correspondencias habituales entre UML y Java:

| Elemento UML en Papyrus | Generación en Código Java | Ejemplo Generado |
|---|---|---|
| **Class pública** | \`public class NombreClase\` | \`public class Libro { ... }\` |
| **Atributo privado \`-\`** | Campo privado con tipo | \`private String isbn;\` |
| **Valor por defecto** | Inicialización del campo | \`private Boolean recomendado = false;\` |
| **Asociación \`0..*\`** | Colección de objetos | \`private java.util.List<Autor> autores;\` |
| **Operación \`+\`** | Método con retorno por defecto | \`public boolean estaDisponible() { return false; }\` |

---

### Caso Práctico: Esqueleto Java generado del Modelo Biblioteca

\`\`\`java
package es.upm.miw.biblioteca.domain;

import java.util.List;
import java.util.Set;

/**
 * Esqueleto generado automáticamente por Papyrus Software Designer.
 */
public class Libro {

    private Long id;
    private String isbn;
    private String titulo;
    private Boolean recomendado = false;

    // Relaciones generadas a partir de las asociaciones navegables
    private List<Autor> autores;
    private Set<Tema> temas;

    public Libro() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Boolean getRecomendado() {
        return recomendado;
    }

    public void setRecomendado(Boolean recomendado) {
        this.recomendado = recomendado;
    }

    public List<Autor> getAutores() {
        return autores;
    }

    public void setAutores(List<Autor> autores) {
        this.autores = autores;
    }

    public Set<Tema> getTemas() {
        return temas;
    }

    public void setTemas(Set<Tema> temas) {
        this.temas = temas;
    }
}
\`\`\`

---

### Del Diagrama UML a la Persistencia: ORM vs ODM

Una vez generado el esqueleto desde Papyrus, la arquitectura de persistencia define cómo se almacenan las relaciones:

\`\`\`text
                 [ Diagrama UML en Papyrus ]
                   (Clases y Multiplicidades)
                              │
                    Ingeniería Directa
                              ▼
                 [ Clases Entidad en Java ]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
        [ Mapeo ORM: JPA ]           [ Mapeo ODM: Mongo ]
       @Entity / @Table              @Document / @Id
       @ManyToMany / @JoinTable      Documentos Embebidos
       Tablas relacionales (SQL)     Colecciones JSON/BSON
\`\`\`

> 💡 **Recordatorio Arquitectónico:** El diseño de tus clases de dominio nunca debe quedar atrapado por la tecnología de base de datos. Modela primero en Papyrus con rigor conceptual, genera el código limpio y aplica el adaptador de persistencia adecuado mediante Inversión de Dependencias.`;
}

// Guardar archivo público
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Updated public/data/ioc/lecciones/entornos.json');

// Guardar copia en dist si existe
if (fs.existsSync(distJsonPath)) {
  fs.writeFileSync(distJsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ Updated dist/data/ioc/lecciones/entornos.json');
}
