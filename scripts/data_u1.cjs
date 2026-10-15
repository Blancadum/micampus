// scripts/data_u1.cjs
// Contenido limpio y estructurado de la Unidad 1 de Entornos de Desarrollo (IOC / M04)

module.exports = [
  {
    id: "u1-overview",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: null,
    title: "Introducción a la Unidad",
    slug: "intro-u1",
    badge: "ENT",
    isOverview: true,
    temaTitle: "Introducción",
    contentMd: `Esta unidad introduce el modelado orientado a objetos con UML desde una idea muy concreta: **antes de dibujar un diagrama es necesario entender qué queremos explicar**. Por eso empezaremos con ejemplos mínimos —una sola clase, una relación, una decisión, una secuencia corta— y sólo después combinaremos las piezas en modelos más completos.

Trabajaremos los diagramas de clases y los principales diagramas de comportamiento que aparecen en las actividades del módulo. También aprenderemos a utilizar **Papyrus** para construirlos, exportarlos, generar código Java y realizar el recorrido inverso: obtener clases UML a partir de código existente.

### Resultados de aprendizaje trabajados

| RA | Descripción |
|---|---|
| **RA5** | Genera diagramas de clases valorando su importancia en el desarrollo de aplicaciones y utilizando herramientas específicas. |
| **RA6** | Genera diagramas de comportamiento valorando su importancia en el desarrollo de aplicaciones y utilizando herramientas específicas. |

> **Información - Cómo estudiar esta unidad**
> No memorice una colección de símbolos. Ante cada enunciado hágase siempre las mismas preguntas: ¿qué conceptos existen?, ¿qué datos tienen?, ¿qué pueden hacer?, ¿cómo se relacionan?, ¿quién inicia cada acción?, ¿en qué orden pasan las cosas?, ¿qué decisiones o cambios de estado existen? Si estas preguntas tienen respuesta, el diagrama casi sale solo.`
  },

  // ==========================================
  // TEMA 1: DEL PROBLEMA AL PRIMER DIAGRAMA DE CLASES
  // ==========================================
  {
    id: "u1-b1",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "1.1",
    title: "Introducción",
    slug: "1-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 1: Del problema al primer diagrama",
    audioUrl: "/podcasts/ent/tema-1-podcast.mp3",
    podcastTitle: "Podcast: Introducción al primer diagrama de clases",
    podcastPrompt: `Hazme un podcast para introducir el primer tema:
- Enfócate en resolver ejercicios reales paso a paso.
- Incluye trucos técnicos esenciales para evitar errores comunes al usar la herramienta Papyrus.
- Explica conceptos para estudiantes que inician desde cero en diseño de software.
- Analiza cómo un arquitecto de software profesional valida sus modelos antes de programar.
- Aplica la lógica a bicicletas.
- Estructura una lista de verificación para evitar errores comunes en entregas.
- Aplica reglas de composición y agregación usando el ejemplo de las bicicletas.`,
    contentMd: `### 1.1. Introducción al primer diagrama de clases

Aprenderá a pasar de un texto informal a un primer modelo orientado a objetos:

- Qué es UML y qué diferencia una visión estática de una de comportamiento.
- Cómo representar clases, atributos, operaciones y visibilidad.
- Qué diferencia existe entre una clase y un objeto.
- Cómo crear un primer proyecto y un primer diagrama de clases con Papyrus.`
  },
  {
    id: "u1-1-1",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "1.2",
    title: "Modelar antes de programar",
    slug: "1-2-modelar-antes-de-programar",
    badge: "ENT",
    temaTitle: "Tema 1: Del problema al primer diagrama",
    contentMd: `Cuando recibimos un enunciado, la tentación habitual es empezar a escribir código. En proyectos pequeños puede funcionar, pero cuando hay muchas clases, reglas e interacciones es fácil descubrir demasiado tarde que dos partes del sistema se han entendido de forma distinta.

El **diseño** sirve precisamente para decidir _cómo_ representaremos el sistema antes de entrar en todos los detalles de la implementación. UML proporciona una notación gráfica común para describir esta idea.

> **Definición - UML (Unified Modeling Language)**
> Es una notación estándar de modelado que permite describir la estructura y el comportamiento de un sistema software mediante diferentes tipos de diagramas.

> **Importante**
> **UML no es un lenguaje de programación ni una metodología.** UML no decide cómo debe gestionar el proyecto ni sustituye a Java. Es una forma estándar de representar el modelo para que otras personas y equipos puedan entenderlo.

### Dos preguntas, dos familias de diagramas

| Pregunta | Visión UML | Ejemplos |
|---|---|---|
| **¿Qué hay en el sistema?** | Estática o estructural | Clases, objetos, paquetes, componentes... |
| **¿Qué ocurre en el sistema?** | Dinámica o de comportamiento | Casos de uso, secuencias, actividades, estados... |

### ¿Dónde encaja el modelo dentro de un proyecto?

De forma simplificada, un proyecto pasa por entender el problema, analizar los requisitos, diseñar la solución, desarrollarla y probarla, y finalmente ponerla en servicio y mantenerla. UML es especialmente útil entre el análisis y el diseño: permite convertir lo que el sistema debe hacer en una representación técnica clara que después se puede implementar en código.

### Mapa rápido de los diagramas UML

| Familia | Diagrama | Pregunta principal |
|---|---|---|
| **Estructura** | Clases | ¿Qué tipos, datos y relaciones forman el sistema? |
| | Objetos | ¿Qué instancias concretas existen en un ejemplo? |
| | Paquetes | ¿Cómo se organizan los elementos del modelo en grupos? |
| | Estructura compuesta | ¿Qué partes internas colaboran dentro de un elemento compuesto? |
| | Componentes | ¿Qué piezas de software forman el sistema y qué interfaces ofrecen? |
| | Despliegue | ¿Dónde se ejecutan o alojan las partes del software? |
| | Perfil | ¿Cómo se adapta UML a un dominio o plataforma específico? |
| **Comportamiento** | Casos de uso | ¿Qué ofrece el sistema a los actores externos? |
| | Estados | ¿Cómo cambia un objeto a lo largo de su ciclo de vida? |
| | Actividades | ¿Qué flujo de trabajo, decisiones y paralelismo existen? |
| | Secuencia | ¿En qué orden temporal se comunican los participantes? |
| | Comunicación | ¿Quién se comunica con quién y en qué orden numérico? |
| | Visión general de interacción | ¿Cómo se resumen y conectan diversas interacciones? |
| | Temporal | ¿Cómo evolucionan estados o valores poniendo el énfasis en el tiempo? |

![Mapa visual de los principales diagramas UML estructurales y de comportamiento](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/01_uml_visio_general.jpg)

> **Modelo mental**
> Un diagrama de clases es como una fotografía de la estructura del sistema. Un diagrama de comportamiento se asemeja más a una película: explica qué hacen los elementos y cómo cambian a lo largo del tiempo.

### Del texto al modelo

Imagine este enunciado:
> *Una tienda vende productos. De cada producto queremos guardar el código, nombre y precio. La tienda necesita consultar si un producto es caro.*

Aún no dibujamos nada. Primero separamos la información:
- **Concepto principal:** Producto
- **Datos:** código, nombre y precio
- **Comportamiento:** saber si es caro (\`esCaro()\`)

Esta separación nos lleva directamente a una clase con atributos y operaciones.

---
#### Ejercicio: Subraya antes de dibujar
En el enunciado: *«Un curso tiene un código y un título. Queremos saber cuántos alumnos están matriculados»*, identifique el concepto principal, los datos y el comportamiento sin dibujar todavía ningún diagrama.

💡 **Pistas:**
- Busque sustantivos para encontrar conceptos y clases candidatas.
- Las características suelen convertirse en atributos.
- Los verbos o necesidades de cálculo sugieren operaciones y métodos.`
  },
  {
    id: "u1-1-2",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "1.3",
    title: "Clase, atributo y operación",
    slug: "1-3-clase-atributo-y-operacion",
    badge: "ENT",
    temaTitle: "Tema 1: Del problema al primer diagrama",
    contentMd: `Una **clase** describe un conjunto de objetos que comparten estructura y comportamiento. En UML se representa habitualmente con un rectángulo dividido en tres compartimentos.

![Ejemplo visual de una clase UML, sus atributos y operaciones, y dos instancias](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/02_classe_atribut_operacio_objecte.jpg)

La lectura es directa:
1. El primer compartimento contiene el **nombre de la clase**.
2. El segundo contiene los **atributos** (datos que describen el estado).
3. El tercero contiene las **operaciones** o métodos (comportamiento que ofrece).

> **Definición - Atributo**
> Dato que describe el estado de un objeto. En UML se escribe normalmente como: \`nombre: Tipo\`.

> **Definición - Operación**
> Comportamiento que ofrece la clase. En UML se representa su firma: nombre, parámetros y tipo de retorno.

### Primer paso: sólo una clase

> *Una película tiene un título, una duración en minutos y una calificación de edad. Queremos saber si es apta para una edad concreta.*

Representación en compartimentos UML:
\`\`\`text
Pelicula
----------------------------
- titulo: String
- duracionMinutos: int
- edadMinima: int
----------------------------
+ esApta(edad: int): boolean
\`\`\`

### Cómo pasarlo a Java

\`\`\`java
public class Pelicula {
    private String titulo;
    private int duracionMinutos;
    private int edadMinima;

    public boolean esApta(int edad) {
        return edad >= edadMinima;
    }
}
\`\`\`

> **Importante**
> **No convierta cada frase en un atributo.** Un dato debe tener sentido como parte del estado real del objeto. Frases como "es importante" o "se hace rápido" son descripciones informales, no atributos.

---
#### Ejercicio: Dibuja una clase
Modele una clase \`Cuenta\` con número, titular y saldo. Debe permitir ingresar una cantidad y consultar si está en descubierto.

💡 **Pistas:**
- Los tres valores describen el estado: \`numero: String\`, \`titular: String\`, \`saldo: double\`.
- \`ingresar(importe: double): void\` necesita un parámetro.
- \`estaEnDescubierto(): boolean\` devuelve un valor booleano.`
  },
  {
    id: "u1-1-3",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "1.4",
    title: "Visibilidad, tipos y firmas",
    slug: "1-4-visibilidad-tipos-y-firmas",
    badge: "ENT",
    temaTitle: "Tema 1: Del problema al primer diagrama",
    contentMd: `Un diagrama de clases no sólo dice qué miembros existen, sino también desde dónde son accesibles.

| Símbolo UML | Equivalente Java | Significado |
|---|---|---|
| \`+\` | \`public\` | Accesible desde cualquier otra clase. |
| \`-\` | \`private\` | Accesible únicamente desde la propia clase. |
| \`#\` | \`protected\` | Accesible desde la clase y sus subclases (especializaciones). |
| \`~\` | Visibilidad de paquete (*default*) | Accesible dentro del mismo paquete. |

En el modelado habitual seguimos el principio de **encapsulación**: **atributos privados (\`-\`) y operaciones públicas (\`+\`)**, salvo que se requiera explícitamente otra cosa.

### Tipo de los atributos
Los tipos concretan qué puede contener cada campo: \`String\`, \`int\`, \`double\`, \`boolean\` o \`Date\`.

### Firma de una operación
Una firma completa en UML se escribe:
\`\`\`text
+ calcularPrecio(cantidad: int, descuento: double): double
\`\`\`
- \`calcularPrecio\`: nombre de la operación.
- \`cantidad: int\`, \`descuento: double\`: parámetros de entrada (\`direction = in\`).
- \`double\`: tipo de retorno (\`direction = return\`).

> **Información - Getters y Setters**
> Cuando un ejercicio pide omitir *getters* y *setters*, no significa que el código Java final no los tenga; significa que el diagrama conceptual debe centrarse en la lógica del negocio sin saturarse de métodos triviales.

---
#### Ejercicio: Lee firmas
Explique qué significa \`+ reservar(fecha: Date, plazas: int): boolean\` y proponga la firma UML de un método que reciba un año y devuelva el número total de ventas.

💡 **Pistas:**
- Separe nombre, parámetros y retorno.
- Un recuento de ventas devuelve un tipo entero (\`int\`).`
  },
  {
    id: "u1-1-4",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "1.5",
    title: "Objetos e instancias",
    slug: "1-5-objetos-e-instancias",
    badge: "ENT",
    temaTitle: "Tema 1: Del problema al primer diagrama",
    contentMd: `Una clase es una plantilla o descripción abstracta. Un **objeto** es una instancia concreta creada a partir de esa clase con valores particulares en sus atributos.

![Dos objetos p1:Pelicula y p2:Pelicula con los mismos atributos y valores diferentes](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/11_objectes_instancia_pellicula.png)

Ambos objetos comparten la misma estructura porque provienen de la clase \`Pelicula\`, pero mantienen valores distintos en memoria:
\`\`\`java
Pelicula p1 = new Pelicula("Matrix", 136, 16);
Pelicula p2 = new Pelicula("Toy Story", 81, 0);
\`\`\`

Notación en UML:
- Una caja con el nombre \`Pelicula\` representa la **clase**.
- Una caja con el texto subrayado \`p1 : Pelicula\` representa el **objeto concreto**.

### ¿Para qué sirve un diagrama de objetos?
Funciona como una "foto de ejemplo" en un instante determinado. Es excelente para verificar si las multiplicidades de un diagrama de clases admiten situaciones reales o provocan contradicciones.

---
#### Ejercicio: ¿Clase u objeto?
Clasifique los siguientes elementos: \`Cliente\`, \`juan : Cliente\`, \`Pedido\`, \`pedido42 : Pedido\`. Luego asigne dos valores de atributos distintos para cada uno de los objetos.

💡 **Pistas:** El formato \`nombreObjeto : NombreClase\` (o nombre subrayado) identifica sin equívoco una instancia.`
  },
  {
    id: "u1-1-5",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "1.6",
    title: "Primer diagrama de clases con Papyrus",
    slug: "1-6-primer-diagrama-de-clases-con-papyrus",
    badge: "ENT",
    temaTitle: "Tema 1: Del problema al primer diagrama",
    contentMd: `**Papyrus** es la herramienta estándar basada en Eclipse para modelado UML en el curso de Entornos de Desarrollo.

### Flujo de trabajo en Papyrus:

1. **Crear el proyecto:**
   - **File → New → Other... → Papyrus → Papyrus Project**.
   - Seleccionar **UML** como lenguaje de modelado.
   - Asignar nombre al proyecto y marcar **Class Diagram**.
2. **Añadir una clase:**
   - Seleccionar la herramienta **Class** de la paleta y hacer clic en el lienzo.
   - En la vista **Properties**, añadir propiedades (atributos) y operaciones (métodos).
3. **Configurar tipos y visibilidad:**
   - Atributos: nombre, tipo (\`String\`, \`Integer\`, \`Boolean\`) y visibilidad (\`private\`).
   - Operaciones: nombre, visibilidad (\`public\`) y añadir parámetros con dirección \`in\` o \`return\`.
4. **Legibilidad y exportación:**
   - Redimensionar la caja para que los textos nunca queden truncados.
   - Exportar a imagen: **File → Save As Image File...** (o clic derecho en fondo → exportar).

> **Importante**
> No acumule ejercicios inconexos dentro del mismo archivo de modelo \`.di\`. Papyrus valida constantemente la coherencia de todo el modelo; tener ejercicios distintos mezclados genera errores cruzados y lentitud.

---
#### Ejercicio: Primer modelo en Papyrus
Cree un modelo con una clase \`Libro\` que tenga \`isbn\`, \`titulo\` y \`paginas\`, y una operación \`esLargo(): boolean\`. Exporte el diagrama a formato imagen PNG.`
  },

  // ==========================================
  // TEMA 2: RELACIONES ENTRE CLASES Y MODELADO COMPLETO
  // ==========================================
  {
    id: "u1-b2",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "2.1",
    title: "Introducción",
    slug: "2-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 2: Relaciones entre clases",
    contentMd: `### 2.1. Introducción a las relaciones UML

Aprenderá a convertir relaciones del mundo real en modelos UML rigurosos:

- Asociaciones binarias y lectura de multiplicidades en ambas direcciones.
- Generalización (herencia), dependencias e interfaces.
- Diferencias conceptuales y prácticas entre agregación y composición.
- Clases asociativas para modelar atributos que pertenecen a la relación.
- Método sistemático de 6 pasos para resolver un enunciado completo.`
  },
  {
    id: "u1-2-1",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "2.2",
    title: "Asociaciones y multiplicidades",
    slug: "2-2-asociaciones-y-multiplicidades",
    badge: "ENT",
    temaTitle: "Tema 2: Relaciones entre clases",
    contentMd: `Con una sola clase describimos un concepto aislado, pero el software real surge cuando los objetos se relacionan entre sí.

> *Un cliente puede realizar muchos pedidos. Cada pedido pertenece a un único cliente.*

Entre las clases \`Cliente\` y \`Pedido\` existe una **asociación**. Lo crucial es determinar cuántas instancias pueden participar en cada extremo.

![Asociaciones UML, multiplicidades, relaciones muchos a muchos y generalización](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/03_relacions_entre_classes.jpg)

> **Definición - Multiplicidad**
> Número mínimo y máximo de instancias de una clase que pueden vincularse con una única instancia de la clase opuesta.

| Notación UML | Significado |
|---|---|
| \`1\` | Exactamente uno (obligatorio). |
| \`0..1\` | Cero o uno (opcional). |
| \`*\` o \`0..*\` | Cero, uno o muchos (colección opcional). |
| \`1..*\` | Al menos uno (colección obligatoria). |
| \`2..5\` | Rango específico entre dos y cinco. |

### La regla de oro para no equivocarse
Póngase mentalmente sobre una de las clases y pregunte:
> *"Para **un objeto concreto** de esta clase, ¿cuántos objetos de la otra clase pueden existir vinculados?"*

![Asociación muchos-a-muchos entre Biblioteca y Publicación](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/12_associacio_multiplicitat_biblioteca.png)

---
#### Ejercicio: Lee la relación en dos direcciones
Modele la relación entre \`Profesor\` y \`Modulo\` si cada módulo tiene exactamente un profesor responsable, y un profesor puede no coordinar ningún módulo o coordinar varios. Escriba la lectura en palabras para ambos sentidos.

💡 **Pistas:**
- Para un módulo → \`1\` profesor.
- Para un profesor → \`0..*\` módulos.`
  },
  {
    id: "u1-2-2",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "2.3",
    title: "Generalización, dependencia e interfaces",
    slug: "2-3-generalizacion-dependencia-e-interfaces",
    badge: "ENT",
    temaTitle: "Tema 2: Relaciones entre clases",
    contentMd: `### Generalización: la relación «es un tipo de»
Cuando una clase especializada comparte atributos y métodos de una clase más general, usamos la **generalización** (herencia).

![Generalización con Publicación como superclase y Libro y Revista como subclases](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/13_generalitzacio_publicacio.png)

- La flecha hueca triangular **apunta siempre hacia la superclase** (la clase más general).
- **Prueba verbal:** *"Un Libro ES UNA Publicación"* tiene sentido pleno; al revés no siempre se cumple.

### Dependencia: la relación «utiliza temporalmente»
Es una relación débil. Ocurre cuando una clase necesita a otra para ejecutar una operación (por ejemplo, como parámetro de un método), pero no la almacena como un atributo permanente en su estado:
\`\`\`text
Informe --------> Impresora  (flecha discontinua: Informe utiliza Impresora)
\`\`\`

### Interfaces: definir un contrato
Declaran operaciones que las clases deben implementar:
\`\`\`java
public interface Pagable {
    double calcularImporte();
}

public class Factura implements Pagable {
    @Override
    public double calcularImporte() {
        return 121.0;
    }
}
\`\`\`

---
#### Ejercicio: ¿Herencia o simple asociación?
Decida si estas relaciones indican generalización:
1. *Un Coche tiene un Motor* (No: asociación / composición).
2. *Un Administrador es un Usuario* (Sí: generalización).
3. *Un Pedido utiliza un ServicioPago* (No: dependencia).`
  },
  {
    id: "u1-2-3",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "2.4",
    title: "Agregación y composición",
    slug: "2-4-agregacion-y-composicion",
    badge: "ENT",
    temaTitle: "Tema 2: Relaciones entre clases",
    contentMd: `Son relaciones estructurales del tipo **todo-parte**. La distinción fundamental radica en el ciclo de vida de la parte respecto al todo.

![Comparación visual entre agregación, composición y clase asociativa](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/04_agregacio_composicio_classe_associativa.jpg)

### Agregación (Rombo hueco): vida independiente
La parte puede existir sin el todo. Si el todo se destruye, la parte sobrevive.
*Ejemplo:* Un \`Equipo\` y sus \`Jugadores\`. Si el equipo desaparece, los jugadores continúan existiendo.

### Composición (Rombo relleno): dependencia de ciclo de vida
La parte carece de sentido sin el todo. Si el contenedor se destruye, las partes se destruyen con él.
*Ejemplo:* Un \`Pedido\` y sus \`LineasPedido\`. Una línea de pedido no tiene sentido aislada.

| Criterio | Agregación | Composición |
|---|---|---|
| **Tipo de relación** | Todo-parte débil | Todo-parte fuerte |
| **¿La parte sobrevive al todo?** | **Sí** | **No** (muere con el todo) |
| **Símbolo UML** | Rombo vacío ◊ | Rombo relleno ♦ |
| **Ubicación del rombo** | Siempre al lado del **TODO** | Siempre al lado del **TODO** |

---
#### Ejercicio: La prueba de la vida
Clasifique las siguientes parejas justificando la vida de la parte:
- \`Casa\` - \`Habitacion\` ➔ **Composición** (la habitación no existe sin la casa).
- \`Universidad\` - \`Profesor\` ➔ **Agregación** (el profesor existe independientemente).
- \`Playlist\` - \`Cancion\` ➔ **Agregación** (la canción existe en la fonoteca aunque borres la playlist).`
  },
  {
    id: "u1-2-4",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "2.5",
    title: "Clases asociativas y relaciones complejas",
    slug: "2-5-clases-asociativas-y-relaciones-complejas",
    badge: "ENT",
    temaTitle: "Tema 2: Relaciones entre clases",
    contentMd: `A veces un dato no pertenece a ninguna de las dos clases por separado, sino a la **unión o interacción** entre ellas.

> *Un alumno cursa varias asignaturas. Una asignatura tiene varios alumnos. Por cada alumno matriculado en una asignatura queremos registrar la calificación final y la fecha de matrícula.*

- La \`nota\` no puede estar en \`Alumno\` (un alumno tiene muchas notas en distintas asignaturas).
- Tampoco puede estar en \`Asignatura\` (una asignatura tiene notas de muchos alumnos).
- Pertenece a la relación específica **Alumno-Asignatura**.

> **Definición - Clase asociativa**
> Clase vinculada a una asociación mediante una línea discontinua cuando dicha relación posee atributos u operaciones propios.

\`\`\`text
  Alumno [0..*] ---------------------- [0..*] Asignatura
                          :
                          :
                 Matricula
                 - fecha: Date
                 - nota: double
\`\`\`

> **Patrón de detección:**
> Si el enunciado dice: *"Cada vez que A se relaciona con B queremos registrar X e Y"*, piense de inmediato en una **clase asociativa**.

---
#### Ejercicio: ¿Dónde va el atributo?
Un \`Empleado\` participa en varios \`Proyectos\` y un \`Proyecto\` cuenta con varios empleados. De cada participación se registra el \`rol\` y las \`horasSemanales\`.
➔ Ambos atributos deben situarse en una clase asociativa \`Participacion\` (o \`Asignacion\`).`
  },
  {
    id: "u1-2-5",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "2.6",
    title: "Resolver un enunciado de clases paso a paso",
    slug: "2-6-resolver-un-enunciado-de-clases-paso-a-paso",
    badge: "ENT",
    temaTitle: "Tema 2: Relaciones entre clases",
    subsections: [
      {
        id: "2-6-1-ejemplo-eac1",
        slug: "2-6-1-ejemplo-eac1",
        topicNum: "2.6.1",
        title: "2.6.1 - Ejemplo EAC1: Resolución del Diagrama de Clases (PAF)",
        isEac: true
      }
    ],
    contentMd: `Para resolver enunciados de examen o prácticas sin atascarse, aplique siempre este método secuencial:

### Enunciado de ejemplo: Alquiler de bicicletas
> *Una empresa alquila bicicletas. De cada bicicleta se guarda código, marca y precioHora. Hay bicicletas normales y eléctricas (de estas últimas guardamos su autonomía). Los clientes tienen DNI y nombre. Un cliente puede realizar muchos alquileres; cada alquiler corresponde a un solo cliente y una sola bicicleta, guardando fechaInicio, fechaFin y precioFinal. Cada bicicleta tiene varias revisiones, que solo tienen sentido vinculadas a la bicicleta revisada, anotando fecha y observaciones.*

### Paso a paso:
1. **Identificar clases candidatas (Sustantivos clave):**
   \`Bicicleta\`, \`BicicletaElectrica\`, \`Cliente\`, \`Alquiler\`, \`Revision\`.
2. **Asignar atributos y operaciones:**
   - \`Bicicleta\`: codigo, marca, precioHora.
   - \`BicicletaElectrica\`: autonomia.
   - \`Cliente\`: dni, nombre.
   - \`Alquiler\`: fechaInicio, fechaFin, precioFinal.
   - \`Revision\`: fecha, observaciones.
3. **Identificar generalización (Herencia):**
   \`BicicletaElectrica\` es una \`Bicicleta\`. Flecha de generalización apuntando a \`Bicicleta\`.
4. **Calcular multiplicidades de asociaciones:**
   - \`Cliente [1] ----- [0..*] Alquiler\`
   - \`Alquiler [0..*] ----- [1] Bicicleta\`
5. **Detectar relaciones todo-parte (Composición):**
   Las revisiones no tienen sentido sin la bicicleta ➔ Rombo relleno ♦ en \`Bicicleta\` hacia \`Revision [0..*]\`.
6. **Revisión final:**
   Comprobar nombres en singular, visibilidad en todos los atributos y multiplicidades coherentes en ambos sentidos.

---

### 2.6.1. Ejemplo EAC1: Resolución del Diagrama de Clases (Caso Práctico Evaluado)

> 🎯 **Enunciado Oficial Tipo EAC1 / PAF (Gestión de Flota y Alquileres):**
> *"Una empresa de alquiler de vehículos desea modelar su sistema informático. Dispone de Vehículos identificados por matrícula, marca, modelo y precioBaseDiario. Existen dos categorías de vehículos: Turismos (de los que interesa el número de plazas) y Furgonetas (de las que se registra su capacidad de carga en kg). Los Clientes tienen DNI, nombre, teléfono y correo electrónico. Un cliente formaliza uno o varios Alquileres; cada alquiler se realiza para un único vehículo y cliente en unas fechas determinadas (fechaInicio y fechaFin), calculando el importeTotal. Por cada alquiler se emite obligatoriamente una Factura (con númeroFactura, fechaEmision e importeNeto); si un alquiler se cancela o elimina, la factura asociada deja de existir. Por otro lado, los vehículos pasan periódicamente Revisiones Técnicas (con fechaRevision, kilometraje y coste); cada revisión es realizada por un Taller Mecánico homologado (con CIF, nombreTaller y teléfono). Las revisiones forman parte inseparable del historial del vehículo."*

#### Paso 1: Extracción de Clases Candidatas (Sustantivos del Negocio)
Identificamos las entidades con identidad propia y atributos:
1. \`Vehiculo\` (Clase base del catálogo)
2. \`Turismo\` (Subclase especializada de Vehiculo)
3. \`Furgoneta\` (Subclase especializada de Vehiculo)
4. \`Cliente\` (Actor / entidad externa contratante)
5. \`Alquiler\` (Transacción con fechas e importes)
6. \`Factura\` (Documento fiscal derivado del alquiler)
7. \`RevisionTecnica\` (Registro de mantenimiento de la máquina)
8. \`Taller\` (Proveedor homologado de servicio técnico)

#### Paso 2: Asignación de Atributos, Tipos y Encapsulación
> ⚠️ **Regla de corrección PAF:** Los atributos deben estar siempre encapsulados (\`-\` privado) y los métodos accesibles (\`+\` público):

| Clase | Visibilidad y Atributos UML | Operaciones / Métodos Clave |
|---|---|---|
| **Vehiculo** | \`- matricula: String\`<br>\`- marca: String\`<br>\`- modelo: String\`<br>\`- precioBaseDiario: double\` | \`+ calcularPrecio(dias: int): double\`<br>\`+ getMatricula(): String\` |
| **Turismo** | \`- numPlazas: int\` | \`+ getNumPlazas(): int\` |
| **Furgoneta** | \`- capacidadCargaKg: double\` | \`+ getCapacidadCargaKg(): double\` |
| **Cliente** | \`- dni: String\`<br>\`- nombre: String\`<br>\`- telefono: String\`<br>\`- email: String\` | \`+ getDni(): String\`<br>\`+ getNombre(): String\` |
| **Alquiler** | \`- idAlquiler: int\`<br>\`- fechaInicio: LocalDate\`<br>\`- fechaFin: LocalDate\`<br>\`- diasAlquiler: int\`<br>\`- importeTotal: double\` | \`+ liquidarAlquiler(): double\`<br>\`+ generarFactura(): Factura\` |
| **Factura** | \`- numFactura: String\`<br>\`- fechaEmision: LocalDate\`<br>\`- importeNeto: double\`<br>\`- iva: double\` | \`+ emitir(): void\`<br>\`+ imprimirPDF(): byte[]\` |
| **RevisionTecnica** | \`- idRevision: int\`<br>\`- fechaRevision: LocalDate\`<br>\`- kilometraje: int\`<br>\`- coste: double\` | \`+ getCoste(): double\` |
| **Taller** | \`- cif: String\`<br>\`- nombreTaller: String\`<br>\`- telefono: String\` | \`+ getCif(): String\` |

#### Paso 3: Identificación de Jerarquías de Herencia (Generalización)
- Tanto \`Turismo\` como \`Furgoneta\` **son** vehículos (\`is-a\`).
- Comparten los atributos comunes (\`matricula\`, \`marca\`, \`modelo\`, \`precioBaseDiario\`).
- En el diagrama se dibuja una flecha de punta triangular cerrada (◁) desde las subclases hacia la superclase \`Vehiculo\`.

#### Paso 4: Detección de Composición vs Agregación (Criterio Fundamental de Examen)
- **Alquiler ♦--- Factura (Composición):** La factura no tiene razón de existir sin un alquiler que la origine. Su ciclo de vida depende 100% de la existencia del alquiler. Rombo negro relleno (♦) en el lado de \`Alquiler\`.
- **Vehiculo ♦--- RevisionTecnica (Composición):** Una revisión técnica no puede flotar suelta en el sistema; forma parte exclusiva del historial físico de ese vehículo concreto. Rombo negro relleno (♦) en \`Vehiculo\`.
- **RevisionTecnica --- Taller (Asociación Simple):** El taller es independiente. Si el taller cierra o cambia de CIF, la revisión técnica sigue existiendo en el historial del vehículo.

#### Paso 5: Cálculo Riguroso de Multiplicidades
1. \`Cliente [1] ------------ [0..*] Alquiler\`: Un cliente puede registrarse y no haber alquilado todavía (\`0..*\`), pero un alquiler pertenece estrictamente a 1 cliente (\`1\`).
2. \`Alquiler [0..*] -------- [1] Vehiculo\`: Un alquiler se realiza para 1 vehículo concreto (\`1\`). Un vehículo puede tener 0 o muchos alquileres sucesivos (\`0..*\`).
3. \`Alquiler [1] ♦---------- [1] Factura\`: Cada alquiler produce exactamente 1 factura oficial (\`1\`).
4. \`Vehiculo [1] ♦---------- [0..*] RevisionTecnica\`: Un vehículo nuevo puede no haber pasado revisiones (\`0..*\`), pero cada revisión pertenece a 1 solo vehículo (\`1\`).
5. \`RevisionTecnica [0..*] - [1] Taller\`: Una revisión es firmada por 1 taller (\`1\`); un taller puede haber realizado muchas revisiones para nuestra flota (\`0..*\`).

#### Paso 6: Diagrama Estructural Completo de la EAC1

\`\`\`text
                           ┌──────────────────────────┐
                           │         Vehiculo         │
                           ├──────────────────────────┤
                           │ - matricula: String      │
                           │ - marca: String          │
                           │ - modelo: String         │
                           │ - precioBaseDiario: dbl  │
                           ├──────────────────────────┤
                           │ + calcularPrecio(dias)   │
                           └────────────┬─────────────┘
                                        ▲ (Herencia)
                           ┌────────────┴────────────┐
                           │                         │
                ┌──────────┴──────────┐   ┌──────────┴──────────┐
                │       Turismo       │   │      Furgoneta      │
                ├─────────────────────┤   ├─────────────────────┤
                │ - numPlazas: int    │   │ - cargaKg: double   │
                └─────────────────────┘   └─────────────────────┘

  ┌───────────────┐           1..1         0..* ┌─────────────────────────┐
  │    Cliente    │ ─────────────────────────── │        Alquiler         │
  ├───────────────┤                             ├─────────────────────────┤
  │ - dni: String │                             │ - idAlquiler: int       │
  │ - nombre: Str │                             │ - fechaInicio: LocalDate│
  └───────────────┘                             │ - fechaFin: LocalDate   │
                                                ├─────────────────────────┤
                                                │ + liquidar(): double    │
                                                └────────────┬────────────┘
                                                             │ 1..1 (♦ Comp.)
                                                             ▼
                                                ┌─────────────────────────┐
                                                │         Factura         │
                                                ├─────────────────────────┤
                                                │ - numFactura: String    │
                                                │ - importeNeto: double   │
                                                └─────────────────────────┘

           Vehiculo [1] ♦────── 0..* [RevisionTecnica] 0..* ────── 1 [Taller]
\`\`\`

> 💡 **Puntos Calientes para Aprobar la PAF:**
> 1. Si el enunciado dice *"no puede existir sin..."* ➔ siempre **Composición (♦ rombo relleno)**.
> 2. No olvides los dos puntos y el tipo de dato (\`nombreAtributo: TipoDato\`).
> 3. Las multiplicidades deben estar especificadas en **ambos extremos** de cada relación.`
  },

  // ==========================================
  // TEMA 3: DIAGRAMAS DE COMPORTAMIENTO Y DE INTERACCIÓN
  // ==========================================
  {
    id: "u1-b3",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.1",
    title: "Introducción",
    slug: "3-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `### 3.1. Introducción al comportamiento e interacción

Mientras los diagramas de clases explican qué existe en el sistema, los diagramas de comportamiento explican **qué ocurre y cómo colaboran los elementos**:

- Casos de uso: la frontera del sistema desde la perspectiva del usuario.
- Relaciones \`<<include>>\` y \`<<extend>>\`.
- Diagrama de secuencia: el orden cronológico de los mensajes.
- Diagrama de comunicación: la topología de colaboración.
- Diagrama de actividades: flujos de trabajo, decisiones, bucles y paralelismo (\`fork\` / \`join\`).
- Diagrama de estados: el ciclo de vida y las transiciones de un objeto.`
  },
  {
    id: "u1-3-1",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.2",
    title: "Casos de uso: actores y funcionalidades",
    slug: "3-2-casos-de-uso-actores-y-funcionalidades",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `Un diagrama de casos de uso describe **qué ofrece el sistema a quien interactúa con él**.

> **Definición - Actor**
> Rol externo que interactúa con el sistema (persona, dispositivo u otro software). Se dibuja fuera del límite del sistema con una figura humana estilizada (*stickman*).

> **Definición - Caso de uso**
> Funcionalidad o meta que el sistema ofrece al actor. Se dibuja con un óvalo y se redacta siempre en formato: **Verbo en infinitivo + Complemento** (*«Registrar préstamo»*, *«Consultar catálogo»*).

![Ejemplo de diagrama de casos de uso con actores, include y extend](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/05_diagrama_casos_us.jpg)

### El límite del sistema
Se representa mediante un rectángulo. Los casos de uso van dentro; los actores permanecen fuera y se conectan a los casos de uso mediante líneas simples (asociaciones).

> **Regla clave:**
> No convierta cada clic de botón en un caso de uso. Un caso de uso representa un objetivo completo de valor para el actor, no pasos intermedios de una pantalla.`
  },
  {
    id: "u1-3-2",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.3",
    title: "include, extend y generalización",
    slug: "3-3-include-extend-y-generalizacion",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `### \`<<include>>\` (Comportamiento obligatorio y compartido)
Indica que un caso de uso base ejecuta obligatoriamente otro caso de uso para completarse.
- **Dirección de la flecha:** Desde el caso base hacia el caso incluido:
  \`\`\`text
  [Registrar Prestamo] ----<<include>>---> [Buscar Libro]
  \`\`\`
- **Pregunta mental:** *«Para hacer A, ¿siempre y obligatoriamente tengo que hacer B?»* Si la respuesta es sí, es \`<<include>>\`.

### \`<<extend>>\` (Comportamiento opcional y condicional)
Representa una funcionalidad que sólo se ejecuta bajo ciertas condiciones o de manera optativa.
- **Dirección de la flecha:** Desde el comportamiento opcional hacia el caso base:
  \`\`\`text
  [Pagar Reserva] ----<<extend>>---> [Hacer Reserva]
  \`\`\`
- **Pregunta mental:** *«¿Puede el caso base terminar con éxito sin esta acción?»* Si puede completarse sin ella, es \`<<extend>>\`.

| Relación | ¿Es obligatorio? | Sentido de la flecha |
|---|---|---|
| \`<<include>>\` | **Sí**, siempre se ejecuta | Del caso base ➔ al caso incluido |
| \`<<extend>>\` | **No**, opcional / condicional | De la extensión opcional ➔ al caso base |`
  },
  {
    id: "u1-3-3",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.4",
    title: "Diagrama de secuencia",
    slug: "3-4-diagrama-de-secuencia",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `Explica **en qué orden cronológico se comunican los participantes** en un escenario concreto.

![Diagrama de secuencia de una reserva de pista con cuatro participantes](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/06_diagrama_sequencia.jpg)

### Elementos fundamentales:
- **Línea de vida:** Línea vertical discontinua que representa la existencia de un participante (actor, objeto o componente).
- **Eje temporal:** El tiempo avanza estrictamente de **arriba hacia abajo**.
- **Barra de activación:** Rectángulo vertical sobre la línea de vida que indica cuándo un objeto está ejecutando una acción.
- **Mensaje síncrono:** Flecha continua con punta maciza (el emisor se bloquea esperando respuesta).
- **Mensaje de retorno:** Flecha discontinua con punta abierta que devuelve el control o un valor.
- **Creación de objeto:** Flecha que apunta directamente a la caja del nuevo objeto, cuya línea de vida empieza en ese preciso instante.`
  },
  {
    id: "u1-3-4",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.5",
    title: "Diagrama de comunicación",
    slug: "3-5-diagrama-de-comunicacion",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `Es semánticamente equivalente al diagrama de secuencia, pero cambia el enfoque: en lugar de un eje temporal vertical, muestra la **red de conexiones entre objetos**.

![Diagrama de comunicación de inspección con CentroControl, SistemaNavegacion, Camara y Terminal](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/07_diagrama_comunicacio.jpg)

Como no hay eje temporal, el orden se explicita obligatoriamente mediante **números de secuencia en los mensajes**:
- \`1: consultarDisponibilidad()\`
- \`1.1: verificarHoras()\`
- \`2: confirmarReserva()\`

| Secuencia | Comunicación |
|---|---|
| El tiempo fluye de arriba abajo. | El orden se deduce de la numeración. |
| Destaca la cronología exacta. | Destaca la topología y acoplamiento entre objetos. |`
  },
  {
    id: "u1-3-5",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.6",
    title: "Diagrama de actividades",
    slug: "3-6-diagrama-de-actividades",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `Se utiliza para modelar **flujos de trabajo, algoritmos y procesos empresariales**, permitiendo representar caminos alternativos y ejecución paralela.

![Diagrama de actividades con fork, join, decisión y bucle](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/08_diagrama_activitats.jpg)

### Nodos esenciales:
1. **Nodo de decisión (Rombo):** Divide el flujo en caminos excluyentes según condiciones llamadas **guardas** (ej. \`[saldo >= total]\` y \`[saldo < total]\`).
2. **Nodo de fusión (Merge - Rombo):** Reúne caminos alternativos procedentes de una decisión.
3. **Fork (Barra gruesa de bifurcación):** Abre dos o más ramas que avanzan en **paralelo**.
4. **Join (Barra gruesa de sincronización):** Espera a que **todas** las actividades concurrentes hayan finalizado antes de continuar el flujo.

> **Importante:** No confunda una decisión con un fork. En una decisión se elige un camino u otro; en un fork se inician ambos a la vez.`
  },
  {
    id: "u1-3-6",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "3.7",
    title: "Diagrama de estados",
    slug: "3-7-diagrama-de-estados",
    badge: "ENT",
    temaTitle: "Tema 3: Diagramas de comportamiento",
    contentMd: `Responde a la pregunta: **¿en qué situaciones puede encontrarse un objeto a lo largo de su ciclo de vida y qué eventos provocan el cambio?**

![Diagrama de estados del ciclo de vida de un pedido](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/09_diagrama_estats.jpg)

- **Estado:** Condición persistente de un objeto (\`PENDIENTE\`, \`ENVIADO\`, \`CANCELADO\`). Se escribe en mayúsculas dentro de rectángulos con esquinas redondeadas.
- **Transición:** Flecha entre estados desencadenada por un **evento** y opcionalmente regulada por una **guarda**: \`evento [guarda] / accion\`.
- **Autotransición:** Flecha que sale y entra al mismo estado sin alterarlo (ej. añadir un ítem a un carrito en estado \`ABIERTO\`).`
  },

  // ==========================================
  // TEMA 4: PAPYRUS DE PRINCIPIO A FIN
  // ==========================================
  {
    id: "u1-b4",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "4.1",
    title: "Introducción",
    slug: "4-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 4: Papyrus de principio a fin",
    contentMd: `### 4.1. Introducción a las herramientas CASE y Papyrus

Aprenderá el ciclo de vida técnico completo de las herramientas CASE en Eclipse:

- Estructura de proyectos, modelos (\`.di\`) y vistas en Papyrus.
- Configuración de propiedades y exportación limpia de imágenes.
- Ingeniería directa: generación automática de código Java a partir del modelo UML.
- Ingeniería inversa: generación de modelos UML a partir de código Java existente.
- Circuito metodológico completo y checklist de errores habituales en entregas.`
  },
  {
    id: "u1-4-1",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "4.2",
    title: "Proyectos, modelos y diagramas en Papyrus",
    slug: "4-2-proyectos-modelos-y-diagramas-en-papyrus",
    badge: "ENT",
    temaTitle: "Tema 4: Papyrus de principio a fin",
    contentMd: `La primera dificultad en Papyrus no son los símbolos UML, sino comprender su jerarquía:

![Organización de un proyecto Papyrus y flujo entre UML y Java](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/10_papyrus_projecte_model_diagrama.jpg)

| Nivel | Qué representa |
|---|---|
| **Proyecto** | Contenedor físico de trabajo en el workspace de Eclipse. |
| **Modelo** | Conjunto lógico y coherente de elementos UML (archivo con extensión \`.di\`). |
| **Diagrama** | Vista gráfica específica que dibuja una porción del modelo. |

### Recuperar vistas perdidas
Si accidentalmente cierra **Properties**, **Palette** o **Package Explorer**, puede recuperarlas desde el menú superior:
**Window → Show View**.`
  },
  {
    id: "u1-4-2",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "4.3",
    title: "Trabajar y exportar diagramas",
    slug: "4-3-trabajar-y-exportar-diagramas",
    badge: "ENT",
    temaTitle: "Tema 4: Papyrus de principio a fin",
    contentMd: `### Reglas clave para el lienzo:
- **Orden de clics:** Al dibujar una relación con flecha (herencia, dependencia o include), haga clic primero en el origen y después en el destino.
- **Propiedades cruciales:**
  - \`Visibility\`: \`public\`, \`private\`, \`protected\`.
  - \`Multiplicity\`: \`1\`, \`0..1\`, \`0..*\`, \`1..*\`.
  - \`Aggregation\`: \`none\`, \`shared\` (agregación) o \`composite\` (composición).
  - \`Owned parameters\`: parámetros con dirección \`in\` y valor de retorno con dirección \`return\`.

### Exportación a imagen para entregas:
1. Haga clic derecho en una zona vacía del diagrama.
2. Seleccione **File → Save As Image File...** (o exportar).
3. Asegúrese antes de que ninguna caja corta texto de atributos ni firmas.`
  },
  {
    id: "u1-4-3",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "4.4",
    title: "Generar código Java desde un diagrama",
    slug: "4-4-generar-codigo-java-desde-un-diagrama",
    badge: "ENT",
    temaTitle: "Tema 4: Papyrus de principio a fin",
    contentMd: `Mediante **Papyrus Software Designer** podemos convertir clases UML en código fuente Java esqueleto:

### Procedimiento:
1. En el Class Diagram, clic secundario en el fondo.
2. Seleccionar **Designer → Generate code → Java**.
3. Indicar el proyecto Java de destino.

### Correspondencias habituales:
- Una clase UML se convierte en una clase Java pública.
- Los atributos privados se convierten en campos (\`private\`).
- Las multiplicidades muchos (\`0..*\`) navegables se convierten en colecciones:
\`\`\`java
public class Cliente {
    private java.util.List<Pedido> pedidos;
}
\`\`\`
- Las operaciones generan métodos con retorno por defecto (\`return 0.0;\` o \`return false;\`).`
  },
  {
    id: "u1-4-4",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "4.5",
    title: "Ingeniería inversa: del Java al diagrama",
    slug: "4-5-ingenieria-inversa-del-java-al-diagrama",
    badge: "ENT",
    temaTitle: "Tema 4: Papyrus de principio a fin",
    contentMd: `Permite realizar el camino inverso: analizar código Java preexistente y generar su diagrama de clases UML correspondiente.

### Procedimiento:
1. Tener el proyecto Java compilando sin errores en Eclipse.
2. En un modelo Papyrus con diagrama de clases vacío, importar el paquete Java mediante la herramienta de ingeniería inversa de Software Designer.
3. Si los miembros no se visualizan inicialmente, activar **Filters → Show/Hide contents**.

> **Limitación conocida de Papyrus:**
> La ingeniería inversa importa con precisión las clases, tipos y métodos, pero a menudo no reconstruye visualmente las flechas de asociación conceptuales. En las prácticas evaluables, observe lo que genera la herramienta sin forzar flechas manuales salvo indicación expresa.`
  },
  {
    id: "u1-4-5",
    moduleId: "u1",
    moduleTitle: "Unidad 1: Introducción al diseño orientado a objetos (modelado UML)",
    moduleShort: "U1",
    topicNum: "4.6",
    title: "Circuito completo y errores habituales",
    slug: "4-6-circuito-completo-y-errores-habituales",
    badge: "ENT",
    temaTitle: "Tema 4: Papyrus de principio a fin",
    contentMd: `### Checklist previo a la entrega:

| Error habitual | Cómo evitarlo |
|---|---|
| **Nombres en plural** | Las clases describen tipos, no colecciones: use \`Cliente\`, nunca \`Clientes\`. |
| **Atributos sin visibilidad o tipo** | Compruebe que todos tengan su símbolo (\`-\`) y tipo explícito (\`: String\`). |
| **Multiplicidad invertida** | Pregunte siempre: *"Para un objeto X, ¿cuántos Y existen?"*. |
| **Rombo al lado de la parte** | El rombo (vacío o lleno) va **siempre en el lado del TODO**. |
| **Flecha de herencia al revés** | La flecha apunta hacia la superclase (la más general). |
| **\`include\` / \`extend\` invertidos** | Compruebe la dirección: include va hacia lo incluido; extend va hacia el caso base. |
| **Comunicación sin números** | Todo mensaje en diagrama de comunicación requiere numeración de orden (\`1:\`, \`2:\`). |
| **Textos cortados en imagen** | Abra la imagen exportada en el visor del sistema operativo y compruebe su legibilidad completa antes de subirla. |`
  }
];
