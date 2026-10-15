// scripts/data_u2.cjs
// Contenido limpio y estructurado de la Unidad 2 de Entornos de Desarrollo (IOC / M04)

module.exports = [
  {
    id: "u2-overview",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: null,
    title: "Introducción a la Unidad",
    slug: "intro-u2",
    badge: "ENT",
    isOverview: true,
    temaTitle: "Introducción",
    contentMd: `Esta unidad explica el recorrido completo que existe entre una idea y un programa en funcionamiento.

1. **Fundamentos teóricos:** Distinguiremos código fuente, código objeto, código ejecutable, compilación, interpretación y máquina virtual; después situaremos los principales paradigmas de programación y las fases de desarrollo de un sistema de información con **Métrica 3**.
2. **Parte práctica:** Trabajaremos con **Eclipse**, instalaremos y configuraremos conectores como **WindowBuilder** para diseñar interfaces de escritorio con **Swing**, desarrollaremos una aplicación web mínima con **Spring Boot** y practicaremos el uso crítico de un asistente de IA integrado en el IDE (**Windsurf Plugin**).

### Resultados de aprendizaje trabajados

| RA | Descripción |
|---|---|
| **RA1** | Reconoce los elementos y herramientas que intervienen en el desarrollo de un programa informático, analizando sus características y fases hasta su puesta en funcionamiento. |
| **RA2** | Evalúa entornos integrados de desarrollo analizando sus características para editar código fuente y generar o empaquetar programas ejecutables. |

> **Cómo estudiar esta unidad**
> Haga siempre el recorrido completo: primero entienda el concepto, después pruebe el ejemplo mínimo y, finalmente, cambie una condición del ejemplo. Si entiende qué entra, qué se valida, qué cambia de estado y qué sale, podrá construir aplicaciones complejas sin memorizarlas.`
  },

  // ==========================================
  // TEMA 5: DEL CÓDIGO FUENTE A LA EJECUCIÓN
  // ==========================================
  {
    id: "u2-b1",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "5.1",
    title: "Introducción",
    slug: "5-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 5: Del código fuente a la ejecución",
    contentMd: `### 5.1. Introducción al proceso de ejecución

Aprenderá los fundamentos de la ejecución de programas en el ordenador:

- Distinguir programa, proceso de ejecución y su relación con memoria, procesador y periféricos.
- Comprender la diferencia entre código fuente, código objeto, ejecutable y bibliotecas.
- Comparar compilación, interpretación, enlazado y máquinas virtuales.
- Seguir el recorrido de un programa Java desde el archivo \`.java\` hasta la JVM.
- Clasificación histórica de los lenguajes por generaciones.`
  },
  {
    id: "u2-1-1",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "5.2",
    title: "Programa, datos y hardware",
    slug: "5-2-programa-datos-hardware",
    badge: "ENT",
    temaTitle: "Tema 5: Del código fuente a la ejecución",
    contentMd: `Un programa informático es una secuencia de instrucciones que el ordenador ejecuta sobre unos datos. Al ejecutar un programa intervienen diferentes componentes del sistema:

| Componente | Papel simplificado | Ejemplo práctico |
|---|---|---|
| **Almacenamiento (Disco)** | Conserva el programa y los datos cuando no se ejecutan. | SSD con el archivo \`.jar\` o \`.class\`. |
| **Memoria RAM** | Mantiene el código activo y los datos en uso en ese instante. | Variables y objetos creados en la aplicación. |
| **Procesador (CPU)** | Ejecuta las instrucciones en formato binario comprensible por el hardware. | Operaciones aritméticas, saltos lógicos y comparaciones. |
| **Periféricos** | Entrada y salida de datos del usuario o del sistema. | Teclado, pantalla, tarjeta de red, disco. |

### Un programa mínimo en Java
\`\`\`java
public class Hola {
    public static void main(String[] args) {
        String nombre = "Ada";
        System.out.println("Hola, " + nombre);
    }
}
\`\`\`
El código contiene un dato (\`nombre\`) y acciones para manipularlo y enviarlo a la salida estándar. El procesador físico no comprende directamente Java; requiere un proceso previo de traducción.`
  },
  {
    id: "u2-1-2",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "5.3",
    title: "Código fuente, código objeto y ejecutable",
    slug: "5-3-codigo-fuente-codigo-objeto-y-ejecutable",
    badge: "ENT",
    temaTitle: "Tema 5: Del código fuente a la ejecución",
    contentMd: `> **Código fuente:** Conjunto de archivos de texto que contienen instrucciones escritas en un lenguaje de alto nivel legible por humanos.

> **Código objeto:** Resultado intermedio de traducir el código fuente a bajo nivel (código máquina o bytecode) que aún requiere enlazarse con otras dependencias.

> **Código ejecutable:** Programa empaquetado y listo para ser cargado y ejecutado directamente por el sistema operativo o máquina virtual.

![Flujo del código fuente hasta el código ejecutable pasando por compilación, bibliotecas y enlazado](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/01_codi_font_executable.png)

### ¿Qué hace una biblioteca (*library*)?
Una biblioteca es código reutilizable ya compilado. El **enlazador (*linker*)** se encarga de resolver las referencias externas entre nuestro código objeto y las bibliotecas para generar el ejecutable definitivo.

> **Importante:** No confunda «código objeto» con «programación orientada a objetos». En este contexto, "objeto" se refiere a una fase técnica de la compilación, no a una instancia de una clase.`
  },
  {
    id: "u2-1-3",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "5.4",
    title: "Compilar, interpretar y enlazar",
    slug: "5-4-compilar-interpretar-y-enlazar",
    badge: "ENT",
    temaTitle: "Tema 5: Del código fuente a la ejecución",
    contentMd: `| Proceso | Función principal | Momento en el que actúa |
|---|---|---|
| **Compilador** | Traduce el código completo a bajo nivel antes de ejecutarse. | Fase de construcción (*build time*). |
| **Enlazador (*Linker*)** | Une varios códigos objeto y bibliotecas en un único ejecutable. | Tras la compilación. |
| **Intérprete** | Lee y ejecuta las instrucciones línea por línea en tiempo real. | Durante la ejecución (*runtime*). |

**Java combina ambos enfoques:** Compila primero el código fuente a **bytecode** (\`.class\`), y después la máquina virtual Java (**JVM**) lo interpreta o compila en caliente (*JIT Compiler*) para la máquina anfitriona.

### Error de compilación vs error de ejecución
\`\`\`java
int edad = "veinte";        // Error de compilación: incompatibilidad de tipos detectada por javac

int divisor = 0;
int resultado = 10 / divisor; // Compila perfectamente, pero lanza ArithmeticException en ejecución
\`\`\``
  },
  {
    id: "u2-1-4",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "5.5",
    title: "Java, bytecode y máquina virtual",
    slug: "5-5-java-bytecode-y-maquina-virtual",
    badge: "ENT",
    temaTitle: "Tema 5: Del código fuente a la ejecución",
    contentMd: `Java no genera directamente binarios nativos para un sistema operativo concreto. El compilador \`javac\` genera **bytecode** independiente de la arquitectura.

![Flujo de Java desde código fuente a bytecode y ejecución en diferentes plataformas mediante una JVM](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/02_java_jvm.png)

| Concepto | Significado | Función |
|---|---|---|
| **JVM** | Java Virtual Machine | Ejecuta el bytecode en un sistema operativo específico. |
| **JRE** | Java Runtime Environment | JVM más las bibliotecas base necesarias para ejecutar Java. |
| **JDK** | Java Development Kit | Incluye el JRE más el compilador \`javac\`, herramientas de empaquetado y depuradores. |

### Prueba en terminal sin IDE:
\`\`\`bash
javac Hola.java   # Genera Hola.class (bytecode)
java Hola         # La JVM carga y ejecuta la clase
\`\`\`
Esta arquitectura proporciona la célebre **portabilidad** de Java: *«Escribe una vez, ejecuta en cualquier parte»*.`
  },
  {
    id: "u2-1-5",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "5.6",
    title: "Generaciones de lenguajes de programación",
    slug: "5-6-generaciones-de-lenguajes-de-programacion",
    badge: "ENT",
    temaTitle: "Tema 5: Del código fuente a la ejecución",
    contentMd: `El temario de la IOC clasifica históricamente la evolución de los lenguajes según su nivel de abstracción:

| Generación | Concepto clave | Ejemplos representativos |
|---|---|---|
| **1ª Generación** | Lenguaje máquina (código binario directo para la CPU). | Secuencias de ceros y unos (\`10110000\`). |
| **2ª Generación** | Lenguaje ensamblador (nemotécnicos vinculados a registros). | Instrucciones como \`MOV AX, 1\`. |
| **3ª Generación** | Lenguajes estructurados y de alto nivel. | C, C++, Java, Pascal. |
| **4ª Generación** | Lenguajes de propósito específico y alto nivel declarativo. | SQL, generadores de informes. |
| **5ª Generación** | Lenguajes basados en reglas lógicas e inteligencia artificial. | Prolog, Lisp. |

> **Pista para exámenes:**
> - Ceros y unos ➔ 1ª generación.
> - Nemotécnicos ➔ 2ª generación.
> - Sintaxis orientada a algoritmos (Java/C) ➔ 3ª generación.
> - Hechos y reglas lógicas ➔ 5ª generación.`
  },

  // ==========================================
  // TEMA 6: PARADIGMAS Y CICLO DE DESARROLLO
  // ==========================================
  {
    id: "u2-b2",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "6.1",
    title: "Introducción",
    slug: "6-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 6: Paradigmas y ciclo de desarrollo",
    contentMd: `### 6.1. Introducción a paradigmas y ciclo de vida

Estudiaremos cómo se estructuran los programas y cómo se gestionan los proyectos profesionales:

- Teorema de la programación estructurada y diseño descendente.
- Cinco pilares de la programación orientada a objetos (POO).
- Diferenciación técnica entre herencia, sobrecarga (*overload*) y sobreescritura (*override*).
- Paradigmas funcional y lógico.
- Fases del ciclo de vida del software según la metodología **Métrica 3**.`
  },
  {
    id: "u2-2-1",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "6.2",
    title: "Programación estructurada",
    slug: "6-2-programacion-estructurada",
    badge: "ENT",
    temaTitle: "Tema 6: Paradigmas y ciclo de desarrollo",
    contentMd: `Demostrado por Böhm y Jacopini, todo programa computable puede escribirse combinando tres estructuras básicas:

![Secuencia, selección, iteración y descomposición descendente](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/03_programacio_estructurada.png)

1. **Secuencia:** Instrucciones consecutivas una tras otra.
2. **Selección:** Bifurcaciones condicionales (\`if / else\`, \`switch\`).
3. **Iteración:** Bucles y repeticiones controladas (\`for\`, \`while\`).

### Diseño descendente (*Top-Down* / Divide y vencerás)
En lugar de crear métodos gigantescos, un problema complejo se divide en funciones más pequeñas con responsabilidades únicas: \`leerDatos()\`, \`validarDatos()\`, \`calcularPrecio()\` y \`mostrarResultado()\`.`
  },
  {
    id: "u2-2-2",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "6.3",
    title: "POO: cinco ideas clave",
    slug: "6-3-poo-cinco-ideas-clave",
    badge: "ENT",
    temaTitle: "Tema 6: Paradigmas y ciclo de desarrollo",
    contentMd: `La programación orientada a objetos organiza el software en torno a objetos que encapsulan estado (datos) y comportamiento (métodos).

![Cinco ideas de la POO: abstracción, encapsulación, modularidad, jerarquía y polimorfismo](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/04_poo_cinc_idees.png)

| Principio | Pregunta clave | Ejemplo práctico |
|---|---|---|
| **Abstracción** | ¿Qué rasgos son esenciales para el problema? | En un sistema bancario nos interesa saldo y cuenta, no la altura del cliente. |
| **Encapsulación** | ¿Qué detalles internos oculto al exterior? | Atributos privados (\`private double saldo\`) protegidos por métodos validados. |
| **Modularidad** | ¿Tiene cada clase una responsabilidad clara? | Clases independientes que pueden probarse y modificarse por separado. |
| **Jerarquía** | ¿Cómo se especializan los conceptos? | \`Vehiculo\` ➔ \`BicicletaElectrica\`. |
| **Polimorfismo** | ¿Puede una misma operación actuar de distinta forma según el tipo? | Un método \`dibujar()\` implementado de manera diferente por \`Circulo\` o \`Rectangulo\`. |`
  },
  {
    id: "u2-2-3",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "6.4",
    title: "Herencia, sobrecarga y sobreescritura",
    slug: "6-4-herencia-sobrecarga-y-sobreescritura",
    badge: "ENT",
    temaTitle: "Tema 6: Paradigmas y ciclo de desarrollo",
    contentMd: `| Concepto | ¿Mismo nombre? | ¿Mismos parámetros? | ¿Requiere herencia? |
|---|---|---|---|
| **Herencia** | N/A | N/A | **Sí**, relación entre clase padre e hija. |
| **Sobrecarga (*Overload*)** | **Sí** | **No**, distinta lista de tipos/parámetros. | **No**, puede ocurrir en la misma clase. |
| **Sobreescritura (*Override*)** | **Sí** | **Sí**, firma idéntica (\`@Override\`). | **Sí**, redefine un método heredado. |

### Ejemplo en Java:
\`\`\`java
// Sobrecarga (Overload):
public int sumar(int a, int b) { return a + b; }
public double sumar(double a, double b) { return a + b; }

// Sobreescritura (Override):
class Animal {
    public void emitirSonido() { System.out.println("Sonido generico"); }
}

class Perro extends Animal {
    @Override
    public void emitirSonido() { System.out.println("Ladrido"); }
}
\`\`\``
  },
  {
    id: "u2-2-4",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "6.5",
    title: "Paradigmas funcional y lógico",
    slug: "6-5-paradigmas-funcional-y-logico",
    badge: "ENT",
    temaTitle: "Tema 6: Paradigmas y ciclo de desarrollo",
    contentMd: `### Paradigma Funcional
El cómputo se concibe como la evaluación de funciones matemáticas puras sin efectos secundarios ni mutación de estado.
- La salida de una función es la entrada directa de la siguiente: \`f(g(x))\`.
- Ejemplos clásicos: Lisp, Haskell, lambdas en Java y JavaScript.

### Paradigma Lógico
El programa consiste en una base de conocimiento de **hechos** y **reglas de inferencia**. El motor deduce conclusiones respondiendo consultas.
- Ejemplo clásico: Prolog.
- *Hecho:* \`temperatura(39).\`
- *Regla:* \`fiebre(X) :- temperatura(X), X > 37.\`
- *Consulta:* \`?- fiebre(39).\` ➔ \`true.\``
  },
  {
    id: "u2-2-5",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "6.6",
    title: "Fases de desarrollo con Métrica 3",
    slug: "6-6-fases-de-desarrollo-con-metrica-3",
    badge: "ENT",
    temaTitle: "Tema 6: Paradigmas y ciclo de desarrollo",
    contentMd: `**Métrica 3** es la metodología estándar de desarrollo de software promovida por la Administración Pública española:

![Cinco fases de Métrica 3: viabilidad, análisis, diseño, construcción e implantación](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/05_metrica3_fases.png)

1. **Estudio de Viabilidad del Sistema (EVS):** ¿Vale la pena emprender el proyecto técnica, económica y legalmente?
2. **Análisis del Sistema de Información (ASI):** **¿QUÉ debe hacer el sistema?** Catálogo de requisitos y especificación detallada.
3. **Diseño del Sistema de Información (DSI):** **¿CÓMO se construirá?** Arquitectura, diseño de bases de datos e interfaces.
4. **Construcción del Sistema de Información (CSI):** Codificación, pruebas unitarias y de integración.
5. **Implantación y Aceptación (IAS):** Puesta en producción, pruebas de aceptación del usuario y plan de mantenimiento.

> **Regla de oro:** Análisis = *¿QUÉ hace?* | Diseño = *¿CÓMO se construye?*`
  },

  // ==========================================
  // TEMA 7: ECLIPSE Y APLICACIONES DE ESCRITORIO CON SWING
  // ==========================================
  {
    id: "u2-b3",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.1",
    title: "Introducción",
    slug: "7-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `### 7.1. Introducción al IDE y diseño de interfaces

Aprenderá a configurar el entorno de desarrollo y crear interfaces gráficas de usuario:

- Anatomía de un IDE moderno y personalización con conectores.
- Configuración de variables \`JAVA_HOME\`, \`PATH\` y JDK en Eclipse.
- Creación de formularios visuales con **WindowBuilder** y Swing.
- Gestión de eventos con \`ActionListener\`, validación de campos y manejo de errores.
- Construcción modular de interfaces por etapas (*máquina de estados*).
- Empaquetado y distribución en archivos JAR, WAR y EAR.`
  },
  {
    id: "u2-3-1",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.2",
    title: "Qué es un IDE y qué aporta Eclipse",
    slug: "7-2-que-es-un-ide-y-que-aporta-eclipse",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `Un **Entorno de Desarrollo Integrado (IDE)** agrupa en una única herramienta todas las utilidades del ciclo de programación:

![Anatomía conceptual de un IDE](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/06_ide_anatomia.png)

- **Editor inteligente:** Resaltado de sintaxis, autocompletado y detección de errores en tiempo real.
- **Compilador integrado:** Construcción automática incremental al guardar.
- **Depurador (*Debugger*):** Puntos de interrupción (*breakpoints*), inspección de variables y avance paso a paso.
- **Diseñador gráfico (GUI Designer):** Construcción visual de interfaces arrastrando componentes.
- **Control de versiones:** Integración con Git para confirmaciones, ramas y resolución de conflictos.
- **Conectores y extensiones:** Vía *Eclipse Marketplace* para añadir soporte a Spring, WindowBuilder o asistentes de IA.`
  },
  {
    id: "u2-3-2",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.3",
    title: "JDK, JRE, JVM y configuración",
    slug: "7-3-jdk-jre-jvm-y-configuracion",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `Para desarrollar en Java se requiere una versión **JDK LTS** (Long Term Support).

### Diagnóstico inicial en la terminal:
\`\`\`bash
java -version    # Verifica que la máquina virtual está disponible
javac -version   # Verifica que el compilador del JDK está instalado y en el PATH
\`\`\`

### Variables de entorno críticas:
- \`JAVA_HOME\`: Ruta al directorio raíz de instalación del JDK.
- \`PATH\`: Debe incluir el subdirectorio \`bin\` del JDK para reconocer \`javac\` y \`java\` desde cualquier carpeta.
- En Eclipse: verificar en **Window → Preferences → Java → Installed JREs** que apunta a un JDK válido.`
  },
  {
    id: "u2-3-3",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.4",
    title: "Proyectos, perspectivas, vistas y conectores",
    slug: "7-4-proyectos-perspectivas-vistas-y-conectores",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `| Concepto | Significado |
|---|---|
| **Editor** | Área central donde se edita el código fuente. |
| **Vista** | Ventanas auxiliares especializadas: Consola, Explorador de Paquetes, Problemas, Propiedades. |
| **Perspectiva** | Disposición organizada de editores y vistas orientada a una tarea específica (Java, Depuración, Git). |
| **Conector (*Plugin*)** | Extensión que añade capacidades adicionales a Eclipse. |

### Instalación de WindowBuilder:
1. Abrir **Help → Install New Software...** (o **Eclipse Marketplace**).
2. Añadir la URL oficial del canal estable: \`https://download.eclipse.org/windowbuilder/updates/release/latest\`.
3. Seleccionar los componentes de WindowBuilder y reiniciar Eclipse.`
  },
  {
    id: "u2-3-4",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.5",
    title: "Primera ventana con WindowBuilder y Swing",
    slug: "7-5-primera-ventana-con-windowbuilder-y-swing",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `Crearemos una ventana con Swing que lee un número entero, calcula su doble y muestra el resultado.

### Componentes básicos:
- \`JLabel\`: Etiquetas de texto explicativo.
- \`JTextField\`: Campos de entrada o salida (\`setEditable(false)\` para la salida).
- \`JButton\`: Botón que dispara la acción.

### Código del controlador de eventos:
\`\`\`java
btnCalcular.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        try {
            int entrada = Integer.parseInt(textEntrada.getText().trim());
            int resultado = entrada * 2;
            textResultado.setText(String.valueOf(resultado));
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Por favor, introduzca un numero entero valido.");
        }
    }
});
\`\`\``
  },
  {
    id: "u2-3-5",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.6",
    title: "Eventos, validación y errores",
    slug: "7-6-eventos-validacion-y-errores",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `Una interfaz profesional valida los datos antes de operar y guía al usuario:

![Flujo de validación en Swing con control de foco](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/07_swing_validacio.png)

### Validación con foco y selección:
\`\`\`java
try {
    int antiguedad = Integer.parseInt(textAntiguedad.getText().trim());
    if (antiguedad < 0 || antiguedad > 150) {
        lblError.setText("Introduzca un valor entre 0 y 150.");
        textAntiguedad.requestFocus();
        textAntiguedad.selectAll();
        return;
    }
    lblError.setText(""); // Limpiar error si es correcto
} catch (NumberFormatException ex) {
    lblError.setText("Debe introducir un numero entero.");
    textAntiguedad.requestFocus();
    textAntiguedad.selectAll();
    return;
}
\`\`\`

### Validación de un JComboBox:
Reservar el índice \`0\` para la opción inicial *«-- Seleccione --»*:
\`\`\`java
if (comboTipo.getSelectedIndex() == 0) {
    lblError.setText("Debe seleccionar una opcion de la lista.");
    comboTipo.requestFocus();
    return;
}
\`\`\``
  },
  {
    id: "u2-3-6",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.7",
    title: "Construir una interfaz por etapas",
    slug: "7-7-construir-una-interfaz-por-etapas",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `Para formularios extensos, diseñe la ventana como una **máquina de estados**:

![Flujo de etapas: validar iniciales, habilitar opciones, calcular y reiniciar](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/08_formulari_etapes.png)

1. **Etapa 1:** Usuario introduce datos iniciales. La segunda parte permanece bloqueada (\`setEnabled(false)\`).
2. **Validación:** Si los datos iniciales son válidos, se bloquea la etapa 1 y se desbloquea la etapa 2.
3. **Cálculo por capas:** Calcule variables intermedias para facilitar la inspección:
\`\`\`java
double base = 80.0;
double factor = 0.90;
double extras = 25.0;
double subtotal = base * factor + extras;
double iva = subtotal * 0.21;
double total = subtotal + iva;
\`\`\`
4. **Acción de Reiniciar:** Restaura valores por defecto y devuelve el foco al primer campo.`
  },
  {
    id: "u2-3-7",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "7.8",
    title: "Empaquetar y ejecutar: CLASS, JAR, WAR y EAR",
    slug: "7-8-empaquetar-y-ejecutar-class-jar-war-y-ear",
    badge: "ENT",
    temaTitle: "Tema 7: Eclipse y aplicaciones Swing",
    contentMd: `| Formato | Nombre completo | Propósito principal |
|---|---|---|
| \`.class\` | Bytecode individual | Archivo binario resultante de compilar una única clase Java. |
| **JAR** | Java Archive | Empaqueta clases, recursos y manifiesto para aplicaciones de escritorio. |
| **WAR** | Web Application Archive | Empaqueta aplicaciones web Java con servlets y vistas para servidores web. |
| **EAR** | Enterprise Archive | Empaqueta múltiples módulos (WARs y JARs) en aplicaciones empresariales Java EE. |

> **Importante:**
> En Java no se genera un ejecutable nativo \`.exe\`. El archivo distribuible estándar es un **JAR ejecutable**, el cual requiere una JVM compatible instalada en el sistema anfitrión para ejecutarse (\`java -jar aplicacion.jar\`).`
  },

  // ==========================================
  // TEMA 8: SPRING Y ASISTENTES DE IA EN EL IDE
  // ==========================================
  {
    id: "u2-b4",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.1",
    title: "Introducción",
    slug: "8-1-introduccion",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `### 8.1. Introducción a Spring Boot e Inteligencia Artificial

Desarrollaremos servicios web modernos y aprovecharemos la inteligencia artificial de forma productiva y crítica:

- Arquitectura cliente-servidor HTTP y Spring Boot con Tomcat embebido.
- Creación de proyectos con **Spring Starter Project** y Maven en Eclipse.
- Mapeo de rutas con \`@RestController\`, \`@GetMapping\` y \`@RequestParam\`.
- Metodología de adaptación controlada paso a paso ante nuevos requisitos.
- Diagnóstico de puertos ocupados (\`8080\`) y gestión de servidores.
- Integración de **Windsurf Plugin** (IA): generación, chat, análisis y validación crítica del código.`
  },
  {
    id: "u2-4-1",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.2",
    title: "Cliente-servidor y Spring Boot",
    slug: "8-2-cliente-servidor-y-spring-boot",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `En el modelo web, un cliente (navegador o Postman) envía una petición HTTP al servidor, y este devuelve una respuesta:

![Flujo cliente servidor con navegador, petición HTTP y controlador Spring](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/09_spring_flux.png)

- **Spring Boot:** Framework que simplifica la creación de aplicaciones basadas en Spring mediante auto-configuración y dependencias agrupadas (*starters*).
- **Spring Web:** Módulo para crear APIs REST y controladores web.
- **Tomcat embebido:** Servidor web integrado en la aplicación que arranca sin necesidad de configuraciones externas.`
  },
  {
    id: "u2-4-2",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.3",
    title: "Crear un proyecto Spring en Eclipse",
    slug: "8-3-crear-un-proyecto-spring-en-eclipse",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `### Pasos con Spring Tools:
1. Instalar el conector **Spring Tools** desde *Eclipse Marketplace*.
2. **File → New → Other... → Spring Boot → Spring Starter Project**.
3. Seleccionar **Maven**, versión de Java LTS y definir el paquete base.
4. En dependencias, marcar **Spring Web**.
5. Finalizar y dejar que Maven descargue las dependencias (\`pom.xml\`).

La clase principal anotada con \`@SpringBootApplication\` contiene el método \`main\` que arranca toda la aplicación.`
  },
  {
    id: "u2-4-3",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.4",
    title: "Formulario, rutas y controlador",
    slug: "8-4-formulario-rutas-y-controlador",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `\`\`\`java
package com.ejemplo.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controlador {

    @GetMapping("/")
    public String index() {
        return "<html><body>"
             + "<h1>Calculadora de Doble</h1>"
             + "<form action=\"/dobla\" method=\"GET\">"
             + "<input type=\"text\" name=\"entero\"/>"
             + "<button type=\"submit\">Calcular</button>"
             + "</form>"
             + "</body></html>";
    }

    @GetMapping("/dobla")
    public String resultado(@RequestParam("entero") String entero) {
        try {
            int res = Integer.parseInt(entero) * 2;
            return "<html><body><h1>Resultado: " + res + "</h1></body></html>";
        } catch (NumberFormatException e) {
            return "<html><body><h1>Error: Debe introducir un entero valido.</h1></body></html>";
        }
    }
}
\`\`\``
  },
  {
    id: "u2-4-4",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.5",
    title: "Adaptar el ejemplo a un nuevo requisito",
    slug: "8-5-adaptar-el-ejemplo-a-un-nuevo-requisito",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `> **Regla de oro:** Modifique un elemento a la vez y ejecute de inmediato.

Si nos piden cambiar el cálculo para obtener el **quíntuplo** (\`* 5\`) y añadir datos del alumno:
1. Actualizar el título y añadir el párrafo con los datos del alumno.
2. Modificar el cálculo aritmético en el método (\`* 5\`).
3. Verificar la sincronización entre el \`action\` del formulario y la ruta \`@GetMapping\`.
4. Probar 3 casos esenciales:
   - Entrada válida (\`25\` ➔ \`125\`).
   - Cero (\`0\` ➔ \`0\`).
   - Entrada inválida (\`abc\` ➔ mensaje de error amigable).`
  },
  {
    id: "u2-4-5",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.6",
    title: "Ejecución, Tomcat y puerto 8080",
    slug: "8-6-ejecucion-tomcat-y-puerto-8080",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `Para poner en marcha la aplicación: Clic secundario en el proyecto ➔ **Run As → Spring Boot App**.
Acceso: \`http://localhost:8080\`.

### Diagnóstico de error: Puerto 8080 ocupado (*Address already in use*)
Dos servidores no pueden escuchar en el mismo puerto simultáneamente.
1. Detener ejecuciones previas en la pestaña **Console** de Eclipse con el botón rojo de *Stop*.
2. En caso necesario, localizar el proceso en el sistema:
\`\`\`bash
lsof -i :8080        # En macOS / Linux
netstat -ano | findstr 8080  # En Windows
\`\`\``
  },
  {
    id: "u2-4-6",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.7",
    title: "Windsurf Plugin: sugerencias, chat y revisión",
    slug: "8-7-windsurf-plugin-sugerencias-chat-y-revision",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `**Windsurf Plugin** (anteriormente conocido como Codeium) es el asistente de IA integrado en Eclipse:

![Flujo de trabajo responsable con asistente de IA](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/10_ia_flux.png)

### Buenas prácticas de uso:
1. **Comentarios como especificación precisa:** Describa parámetros, precondiciones y resultado esperado antes de invocar la sugerencia.
2. **Evaluación crítica:** No acepte sugerencias solo porque compilen. Verifique casos borde (cadenas vacías, nulos, ceros).
3. **El programador es el responsable final** del código entregado.`
  },
  {
    id: "u2-4-7",
    moduleId: "u2",
    moduleTitle: "Unidad 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)",
    moduleShort: "U2",
    topicNum: "8.8",
    title: "Del ejemplo al EAC",
    slug: "8-8-del-ejemplo-al-eac",
    badge: "ENT",
    temaTitle: "Tema 8: Spring y asistentes de IA",
    contentMd: `### Resumen de competencias adquiridas:
- Entiendo la diferencia entre fuente, objeto, ejecutable, compilador, intérprete y JVM.
- Domino secuencia, selección, iteración, herencia, sobrecarga y sobreescritura.
- Conozco las 5 fases de Métrica 3 y sé ubicar decisiones en su fase correspondiente.
- Sé construir interfaces gráficas con WindowBuilder en Swing, gestionando eventos y estados.
- Puedo desplegar una API web con Spring Boot y mapear parámetros con anotaciones.
- Integro y audito sugerencias de asistentes de IA con criterio técnico.`
  }
];
