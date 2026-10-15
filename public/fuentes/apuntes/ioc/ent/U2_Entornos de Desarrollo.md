## UNIDAD 2: Desarrollo de software y entornos de desarrollo (RA1 y RA2)

**Descripción de la Unidad**: Esta unidad explica el recorrido completo que existe entre una idea y un programa en funcionamiento. 
1. Empezaremos distinguiendo código fuente, código objeto, código ejecutable, compilación, interpretación y máquina virtual ; después situaremos los principales paradigmas de programación y las fases de desarrollo de un sistema de información.
2. **La segunda mitad es práctica**. Trabajaremos con **Eclipse** , instalaremos y entenderemos los **conectores** que amplían el IDE, construiremos **interfaces de escritorio** con **Java Swing** y **WindowBuilder** , haremos una aplicación web mínima con Spring Boot y practicaremos el uso crítico de un asistente de IA integrado en el entorno. Los ejemplos comienzan pequeños y van incorporando una sola dificultad cada vez.


**Resultados de aprendizaje trabajados**:

**RA1** Reconoce los elementos y herramientas que intervienen en el desarrollo de un programa informático, analizando sus características y fases hasta su puesta en funcionamiento.
**RA2**- Evalúa entornos integrados de desarrollo analizando sus características para editar código fuente y generar o empaquetar programas ejecutables.
Información

**Cómo estudiar esta unidad**: Haga siempre el recorrido completo: primero entienda el concepto, después pruebe el ejemplo mínimo y, finalmente, cambie una condición del ejemplo. Si sólo copia pantallas o código, cualquier cambio del enunciado le bloqueará. Si entiende qué entra, qué se valida, qué cambia de estado y qué sale, podrá construir una aplicación mayor sin haberla memorizado.

### Bloque 1. Del código fuente a la ejecución

Distinguirá programa, proceso de ejecución y relación con memoria, procesador y periféricos.
Entenderá la diferencia entre código fuente, objeto, ejecutable y bibliotecas.
Comparará compilación, interpretación, enlazamiento y ejecución sobre una máquina virtual.
Seguirá paso a paso el recorrido de un programa Java desde el archivo .javahasta la JVM.
Situará la clasificación por generaciones de lenguajes que utiliza el material del módulo.

#### 1.1. Programa, datos, hardware

Un programa informático es una secuencia de instrucciones que el ordenador ejecuta sobre unos datos. La idea es muy parecida a una receta: no es suficiente con tener los ingredientes; hay que indicar **qué operaciones** deben realizarse y **en qué orden** .

Al ejecutar un programa, intervienen varias piezas del sistema:

|Pieza|Papel simplificado|Ejemplo|
|---|---|---|
|Almacenamiento|Conserva el programa y los datos cuando no se están utilizando.|SSD con el archivo `.jar`.|
|Memoria RAM|Mantiene código y datos que se están utilizando en ese momento.|Variables y objetos de la aplicación.|
|Procesador|Ejecuta las instrucciones que finalmente llegan en un formato que puede procesar.|Operaciones aritméticas, saltos y comparaciones.|
|Periféricos|Permiten entrada y salida de información.|Teclado, pantalla, red, disco.|

Información

**Idea clave**

El archivo que ha programado no «hace cosas» solo. Es necesario cargarlo y ejecutarlo en un entorno capaz de convertir sus instrucciones en operaciones que el hardware pueda llevar a cabo.
#### 1.2. Código fuente, código objeto y ejecutable

Cuando escribimos un programa en un lenguaje de alto nivel obtenemos **código fuente** . Es texto pensado para que el programador pueda leerlo y modificarlo. El procesador, en cambio, necesita instrucciones mucho más cercanas al lenguaje máquina.

Definición

**Código fuente:** Conjunto de archivos de texto que contienen las instrucciones escritas en un lenguaje de programación.

Definición

**Código objeto:** Resultado de traducir el código fuente a una representación de nivel más bajo. En un proceso de compilación nativo todavía puede necesitar el enlace con otras piezas antes de ser ejecutable.

Definición

**Código ejecutable:** Programa ya preparado para que el sistema de ejecución correspondiente pueda ponerlo en marcha.

![Flujo del código fuente hasta el código ejecutable pasando por compilación, código objeto, bibliotecas y enlazamiento](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/01_codi_font_executable.png)

En una compilación nativa clásica, el compilador traduce la fuente y el enlazador combina el código objeto con las bibliotecas necesarias.

##### ¿Qué hace una biblioteca?

Una **biblioteca** es código ya escrito que podemos reutilizar. Cuando un programa llama funcionalidades que no hemos implementado nosotros, el proceso de construcción debe saber dónde encontrarlas y cómo incorporarlas o referenciarlas.

Por ejemplo, si una aplicación en C utiliza una función de una biblioteca gráfica, el compilador puede generar código objeto correctamente, pero el **enlazador** debe resolver la referencia a esa función para obtener el programa final.

Importante **No confunda «código objeto» con «programación orientada a objetos».** Son conceptos distintos. Aquí "objeto" describe una etapa de traducción del programa, no una instancia de una clase.

##### Ejercicio: Ordena la cadena

Ordene estos elementos en un proceso de compilación nativa: ejecutable, código fuente, enlazador, código objeto, compilador y bibliotecas.

Ver pistas v

- El programador escribe el primer elemento.
- Las bibliotecas entran en juego antes de obtener el resultado final.

#### 1. 3. Compilar, interpretar y enlazar0

Hay varias formas de pasar de un lenguaje de alto nivel a instrucciones ejecutables. Para el módulo conviene distinguir tres funciones:

|Herramienta o proceso|¿Qué hace?|Momento principal|
|---|---|---|
|Compilador|Traduce el programa a una representación de nivel más bajo antes de ejecutarlo.|Construcción.|
|Enlazador|Une código objeto y resuelve las referencias a bibliotecas para formar el programa final.|Tras compilar, en el modelo nativo clásico.|
|Intérprete|Lee y ejecuta instrucciones a través de un programa intermedio durante su ejecución.|Ejecución.|

Un ejemplo tradicional de lenguaje interpretado es JavaScript. Por el contrario, C o C++ se utilizan habitualmente en procesos de compilación nativa. **Java combina ideas de los dos mundos** : primero compila a bytecodo y después la JVM se encarga de ejecutarlo.

Información

**Modelo del material oficial**

Para resolver las preguntas conceptuales del módulo, utilice esta distinción: el compilador traduce antes de la ejecución; el intérprete traduce/ejecuta a tiempo de ejecución. Los entornos modernos pueden incorporar técnicas híbridas pero esta clasificación es la que permite entender el proceso.

### ¿Error de compilación o error de ejecución?

JAVA

#

```java
int edat = "vint";       // incompatibilitat de tipus: el compilador ho detecta

int divisor = 0;
int resultat = 10 / divisor;  // el codi pot compilar, però falla en executar-se
```

Esta diferencia será importante cuando trabajemos con el IDE: un buen entorno nos ayuda tanto a detectar errores antes de ejecutar como a diagnosticar qué ocurre cuando el programa ya está en marcha.

**Ejercicio: ¿Compilación o ejecución?**

Clasifique tres situaciones: falta un punto y coma; se intenta dividir por cero; se llama una función de una biblioteca que no se ha incorporado correctamente.

**Ver pistas**

- La sintaxis se comprueba antes de su ejecución.
- Un valor problemático puede aparecer sólo durante su ejecución.
- Las referencias externas forman parte del proceso de construcción.

#### 1. 4. Java, bytecode y máquina virtual0

Java no suele generar directamente un ejecutable nativo específico para Windows, Linux o macOS. El compilador `javac`transforma el archivo `.java`en **bytecode** , almacenado habitualmente en archivos `.class`.

![Flujo de Java desde código fuente a bytecode y ejecución en diferentes plataformas mediante una JVM](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/02_java_jvm.png)

El mismo bytecodo se puede ejecutar en plataformas distintas si cada una dispone de una JVM adecuada.

|Sigla|¿Qué representa?|¿Qué nos interesa retener?|
|---|---|---|
|JVM|Java Virtual Machine.|Ejecuta el bytecodo en una plataforma concreta.|
|JRE|Java Runtime Environment.|Concepto de entorno de ejecución: JVM más recursos necesarios para ejecutar Java.|
|JDK|Java Development Kit.|Herramientas de desarrollo, incluido el compilador y el entorno necesario para trabajar con Java.|

##### Pruebe el recorrido sin IDE

```bash
javac Hola.java
java Hola
```

La primera orden genera el bytecodo. La segunda pide a la JVM que cargue y ejecute la clase. Eclipse automatiza estos pasos, pero entenderlos evita que el IDE parezca magia.

**Portabilidad**

La idea esencial de la JVM es separar el programa Java de la plataforma física. El programa se dirige a una máquina virtual común; cada sistema operativo dispone de su implementación de la JVM.

**Ejercicio: Sigue un Hola.java**

Dibuje con cuatro cajas el recorrido de Hola.java hasta que se ve el texto en la pantalla de un ordenador Linux. Indique dónde aparecen javac, el archivo .class y la JVM.

**Ver pistas**

- El compilador genera bytecodo.
- La JVM es específica de la plataforma.

#### 5. Generaciones de lenguajes de programación0

El material oficial utiliza una **clasificación histórica por generaciones** . Es útil para entender cómo los lenguajes se han ido alejando de la máquina y acercando al problema que desea resolver el programador.

|Generación|Idea principal|Ejemplo o pista|
|---|---|---|
|1a|Lenguaje máquina.|Instrucciones binarias directamente ligadas al procesador.|
|2a|Ensamblador.|Mnemotécnicos como `MOV`, muy cercanos a la arquitectura.|
|3a|Lenguajes de alto nivel.|C, C++, Java, Pascal en la clasificación del material.|
|4a|Lenguajes o herramientas de propósito específico y alto nivel de abstracción.|Orientados a resolver dominios concretos con menos código.|
|5a|Lenguajes asociados históricamente a lógica, IA y sistemas expertos.|Prolog o Lisp aparecen en esa clasificación del material.|

Importante

**No interprete «quinta generación» como «más moderno».** Es una clasificación histórica del material didáctico. Una nueva versión de Java no pasa a ser automáticamente de una generación diferente.

Para una pregunta rápida, fíjese sobre todo en la pista: **binario → 1a** , **mnemotécnicos → 2a** , **alto nivel → 3a** .

**Ejercicio: Clasifica por la pista**

Clasifique cuatro fragmentos: 10110000 01100001; MOV AX,1; public class Cliente; una regla lógica del tipo padre(X,Y). Justifique cada respuesta con una sola palabra clave.

**Ver pistas**

- No es necesario conocer el programa entero.
- Busque binario, mnemotécnico, sintaxis de alto nivel o regla.

### Bloque 2. Paradigmas y ciclo de desarrollo

Aplicará secuencia, selección e iteración y entenderá el diseño descendente.
Relacionará abstracción, encapsulación, modularidad, jerarquía y polimorfismo con código Java sencillo.
Diferenciará herencia, sobrecarga y sobreescritura.
Reconocerá los paradigmas funcional y lógico sin memorizar definiciones aisladas.
Ordenará las cinco fases de Métrica 3 y sabrá qué se decide en cada una.

#### 2.1. Programación estructurada

La programación estructurada parte de una idea potente: podemos construir programas complejos combinando tres estructuras de control básicas y dividiendo los grandes problemas en problemas más pequeños.
![[Pasted image 20260929001857.png]]
Secuencia, selección e iteración forman la base del flujo estructurado; el diseño descendente reduce un gran problema a funciones pequeñas.

|Estructura|Pregunta|Java típico|
|---|---|---|
|Secuencia|¿Qué pasa primero y qué ocurre después?|Instrucciones una detrás de otra.|
|Selección|¿Qué camino sigo según una condición?|`if / else`, `switch`.|
|Iteración|¿Qué debo repetir?|`for`, `while`.|


```java
double preu = 100.0;                 // seqüència

if (preu >= 100) {                    // selecció
    preu = preu * 0.90;
}

for (int i = 0; i < 3; i++) {         // iteració
    System.out.println(preu);
}
```


##### Diseño descendente: divide y vencerás

En lugar de escribir un método de cien líneas, podemos separar responsabilidades: `llegirDades()`, `validarDades()`, `calcularPreu()`y `mostrarResultat()`. Cada parte resuelve un problema más pequeño y puede probarse de forma más clara.


**¿Qué no forma parte del teorema de la estructura?**

Los saltos incondicionales como `GOTO`no son una cuarta estructura básica. El modelo estructurado se basa en secuencia, selección e iteración.

**Ejercicio: Tres piezas**

Escriba pseudocódigo para leer cinco notas, contar cuántas están aprobadas y mostrar «mayoría aprobada» si el recuento es 3 o más. Marque dónde hay secuencia, selección e iteración.

*Ver pistas*

- Necesita un contador.
- La repetición se realiza cinco veces.
- La decisión final sólo tiene dos caminos.

#### 2.2. POO: cinco ideas clave0

La programación orientada a objetos modela el programa como un conjunto de objetos que combinan **datos** y **comportamiento** . El material agrupa a los principios centrales en cinco ideas.

![Mapa de cinco ideas de la programación orientada a objetos: abstracción, encapsulación, modularidad, jerarquía y polimorfismo](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/04_poo_cinc_idees.png)

Las cinco ideas se refuerzan entre sí: cada clase representa una abstracción con límites claros que puede relacionarse y especializarse.

|Concepto|Pregunta útil|Ejemplo|
|---|---|---|
|Abstracción|¿Qué características son esenciales?|De `Client`nos interesan nombre y correo, no el color de los ojos.|
|Encapsulación|¿Qué expongo y qué escondo?|Atributos `private`, métodos públicos.|
|Modularidad|¿Qué responsabilidad tiene cada prenda?|Clases separadas que pueden modificarse con poco impacto.|
|Jerarquía|¿Qué tipo es una especialización de otro?|`Vehicle`→ `Bicicleta`.|
|Polimorfismo|¿Puede la misma operación tener comportamientos distintos?|`calcularPreu()`implementado de forma diferente según el tipo.|

JAVACuidado.java

#

```java
public class Compte {
    private double saldo;          // encapsulat

    public void ingressar(double import) {
        if (import > 0) {
            saldo += import;
        }
    }

    public double getSaldo() {
        return saldo;
    }
}
```

Aquí `Compte`está una abstracción, `saldo`queda encapsulado y la clase forma un módulo con una responsabilidad clara.

**Ejercicio: ¿Qué principio estás aplicando?**

Asocie cada situación a un concepto: hacer saldo private; separar Factura y Cliente; crear Coche como subclase de Vehículo; definir sólo los datos relevantes de un Producto.

**Ver pistas**
(añadir pistas)
#### 2.3. Herencia, sobrecarga y sobreescritura0

Estos tres términos suelen aparecer juntos y es fácil mezclarlos. La clave es mirar **qué cambia** .

##### Herencia

Una clase hija recibe atributos y métodos accesibles de la clase padre y puede añadir o especializar comportamiento.

```java
class Vehicle {
    public void arrencar() {
        System.out.println("Vehicle en marxa");
    }
}

class BicicletaElectrica extends Vehicle {
    // hereta arrencar()
}
```

##### Sobrecarga: mismo nombre, parámetros distintos

```java
int sumar(int a, int b) {
    return a + b;
}

double sumar(double a, double b) {
    return a + b;
}
```

##### Sobreescritura: misma firma heredada, nueva implementación

```java
class Vehicle {
    public void descriure() {
        System.out.println("Vehicle");
    }
}

class Bicicleta extends Vehicle {
    @Override
    public void descriure() {
        System.out.println("Bicicleta");
    }
}
```

|Concepto|¿Mismo nombre?|¿Mismos parámetros?|¿Necesita herencia?|
|---|---|---|---|
|Herencia|No es la pregunta principal.|No es la pregunta principal.|Sí, relaciona clase padre e hija.|
|Sobrecarga|Sí.|No.|No necesariamente.|
|Sobreescritura|Sí.|Sí, misma firma.|Sí, redefine un método heredado.|

**Ejercicio: ¿Overload u override?**

Diga si hay sobrecarga o sobreescritura en dos casos: (1) imprimir(String) e imprimir(int); (2) una subclase vuelve a definir mostrar() con la misma firma que la clase padre.

**Ver pistas**
(añadir pistas)
#### 2.4. Paradigmas funcional y lógico0

No todos los programas se organizan en torno a sentencias imperativas u objetos. El material presenta también los paradigmas **funcional** y **lógico** .

##### Funcional: transformar valores

La idea es ver el cálculo como una composición de funciones: la salida de una operación se convierte en la entrada de la siguiente. Lisp es uno de los ejemplos clásicos que aparecen en el material.

```java
// Mateixa idea expressada en Java amb funcions simples
static int doble(int x) {
    return x * 2;
}

static int sumaUn(int x) {
    return x + 1;
}

// sumaUn(doble(3)) -> 7
```

##### Lógico: hechos + reglas + consulta

En el paradigma lógico describimos **hechos** y **reglas** ; un motor de inferencia intenta deducir conclusiones. Prolog es el ejemplo típico del material.

> Hecho: la temperatura es 39 °C.  
> Regla: si la temperatura es superior a 37 °C, existe fiebre.  
> Consulta: ¿hay fiebre?

Ésta es la pista más directa para reconocer el paradigma lógico: **aplicar reglas lógicas para inferir conclusiones a partir de datos**

**Ejercicio: Reconocer el paradigma**

Explique qué paradigma encaja mejor con: (a) una cadena de funciones que transforma una lista; (b) una base de hechos y reglas que decide si una incidencia es prioritaria.

**Ver pistas**
(añadir pistas)
#### 2.5. Fases de desarrollo con Métrica 30

Programar es sólo una parte del desarrollo de un sistema. El material utiliza **Métrica 3** para presentar cinco fases secuenciales.

![Cinco fases de Métrica 3: viabilidad, análisis, diseño, construcción e implantación/aceptación](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/05_metrica3_fases.png)

La pregunta cambia en cada fase: ¿conviene hacerlo?, ¿qué necesita el sistema?, ¿cómo será?, ¿cómo lo construimos?, ¿cómo lo ponemos en servicio?

| Fase                                   | Pregunta principal                        | Resultado que debe retener                                                             |
| -------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| 1. Estudio de viabilidad               | ¿Vale la pena continuar?                  | Analiza necesidades y viabilidad económica, técnica, legal y operativa.                |
| 2. Análisis del sistema de información | ¿Qué debe hacer exactamente?              | **Especificación detallada** , catálogo de requisitos y modelos.                       |
| 3. Diseño del sistema de información   | ¿Cómo estará construido?                  | Arquitectura, entorno tecnológico, componentes, pruebas e implantación.                |
| 4. Construcción                        | ¿Cómo lo convertimos en software probado? | Código, componentes, pruebas unitarias y de integración, manuales y procedimientos.    |
| 5. Implantación y aceptación           | ¿Cómo llega a producción y se acepta?     | Implantación, pruebas de aceptación, paso a producción y preparación de mantenimiento. |

**Truco para no confundir análisis y diseño**

**Análisis = qué** necesita el sistema. **Diseño = cómo** lo vamos a construir. Si la frase habla de «especificación detallada del sistema» y catálogo de requisitos, el material la sitúa en el análisis.

**Ejercicio: Pon cada decisión en su fase**

Clasificar cinco acciones: decidir si el proyecto es viable; recoger requisitos; definir la arquitectura; programar y realizar pruebas unitarias; realizar pruebas de aceptación con el usuario.

**Ver pistas**
(añadir pistas)

### Bloque 3. Eclipse y aplicaciones de escritorio con Swing

Identificará las funciones de un IDE y las principales piezas del entorno Eclipse.
Relacionará JDK, JRE y JVM y configurará un entorno Java de desarrollo.
Trabajará con proyectos, perspectivas, vistas, conectores y actualizaciones.
Construirá una interfaz Swing con WindowBuilder a partir de un ejemplo mínimo.
Validará campos, gestionará eventos, focos, combos, tooltipos y estados habilitado/deshabilitado.
Diferenciará archivos .class, JAR, WAR y EAR.

#### 3.1. ¿Qué es un IDE y qué aporta Eclipse?

Podríamos programar Java con un editor de texto y una terminal. Un **IDE** integra en una sola herramienta las operaciones que repetimos continuamente: editar, compilar, ejecutar, depurar, navegar por el proyecto y gestionar extensiones.

![[Pasted image 20260929002240.png]]
Un IDE no es sólo un editor: coordina herramientas que intervienen en distintos momentos del desarrollo.

|Función|¿Qué aporta?|
|---|---|
|Editor|Coloración, realización, navegación y detección temprana de errores.|
|Compilador/intérprete|Construye o ejecuta el proyecto según el lenguaje.|
|Depurador|Permite detener el programa, avanzar paso a paso e inspeccionar variables.|
|GUI designer|Ayuda a construir interfaces gráficas.|
|Control de versiones|Integra el historial de cambios y operaciones con repositorios.|
|Refactorización|Reestructura el código manteniendo el comportamiento externo.|
|Documentación y ayuda|Acceso a información contextual y documentación.|
|Conectores|Añaden soporte para nuevas tecnologías o funciones.|

Información

**Eclipse es extensible.**

La instalación base no debe contener todas las herramientas posibles. El soporte Java, WindowBuilder, Spring o un asistente de IA pueden aparecer como componentes o conectores que amplían el entorno.

**Ejercicio: ¿Editor o IDE?**

Explique qué cuatro funciones adicionales espere de un IDE respecto a un editor de texto simple cuando desarrolle una aplicación Java.

**Ver pistas**

- Piense en construir, probar, depurar y ampliar el entorno.

## 2. JDK, JRE, JVM y configuración0

Para desarrollar Java necesitamos el **JDK** . Eclipse debe saber qué JDK utilizar para compilar y ejecutar el proyecto.

**Entorno recomendado**

Trabajaremos con **JDK 25 LTS** o superior y una versión actual de **Eclipse** ( **Eclipse 2026-09** en el momento de preparar estos materiales). Si hay una versión LTS de Java más reciente al realizar esta unidad, utilícela: lo que cuenta es trabajar con una versión LTS, que ofrece una base más estable que las versiones intermedias.

### Compruebe Java antes de abrir el IDE

BASH

#

```bash
java -version
javac -version
```

Si `java`funciona pero `javac`no, probablemente disponga de un entorno de ejecución pero no de un JDK completo o `PATH`no apunta a las herramientas correctas.

|Elemento|Función práctica|
|---|---|
|`JAVA_HOME`|Indica la carpeta raíz de JDK en herramientas que necesitan localizarlo.|
|`PATH`|Permite ejecutar comandos como `java`y `javac`desde la terminal.|
|JDK configurado en Eclipse|Determina con qué conjunto de herramientas se construye el proyecto.|

### Flujo de preparación

1. Instale una versión **JDK LTS** , al menos la 25.
2. Verifique `java`y `javac`.
3. Instale o descomprima Eclipse.
4. Abra un _workspace_ .
5. Compruebe en las preferencias de Java que Eclipse detecta el JDK correcto.

Importante

**No instale cosas a ciegas.**

Si Eclipse ya compila un proyecto Java sencillo, JDK está operativo. Añadir nuevas versiones o cambiar variables sin necesidad concreta puede crear más problemas que resolver.

**Ejercicio: Diagnóstico mínimo**

Imagine que Eclipse se abre pero un proyecto Java no encuentra el compilador. Escriba tres comprobaciones, en orden, antes de reinstalar nada.

**Ver pistas**

- Primero compruebe la terminal.
- Luego la versión del JDK.
- Por último la configuración del IDE.

## 3. Proyectos, perspectivas, vistas y conectores

Eclipse organiza el trabajo en **proyectos** . Un proyecto agrupa código fuente, recursos, configuración y otros archivos relacionados. Encima de esta estructura, el IDE presenta diferentes ventanas.

|Concepto|Imagen mental|
|---|---|
|Editor|La zona en la que modifica un archivo.|
|Vista|Una ventana auxiliar: explorador de proyecto, consola, problemas...|
|Perspectiva|Un conjunto de vistas y editores organizado para una tarea concreta.|
|Conector|Una extensión que añade capacidades a Eclipse.|

Si desapareix una finestra, normalment no cal reinstal·lar res: proveu **Window → Show View**. Per canviar la disposició orientada a una tasca, utilitzeu **Window → Perspective**.

### Instal·lar connectors

Segons el connector, el camí habitual és **Help → Eclipse Marketplace...** o **Help → Install New Software...**. El procés general és el mateix: localitzar el component, revisar què s'instal·larà, acceptar les condicions necessàries i reiniciar Eclipse.

Aquesta unitat utilitzarà dos exemples d'extensió:

- **WindowBuilder** per dissenyar interfícies Swing;
- **Spring Tools** per treballar còmodament amb projectes Spring.

### Si WindowBuilder encara no està instal·lat

1. Obriu **Help → Install New Software...**.
2. Afegiu un lloc nou amb el nom **WindowBuilder** i l'adreça `https://download.eclipse.org/windowbuilder/updates/release/latest`.
3. Seleccioneu els components de WindowBuilder, continueu l'assistent i reinicieu Eclipse.

Utilitzeu el canal `release/latest`: apunta a l'última versió estable de WindowBuilder. Eviteu els canals `milestone` i `nightly` per a les pràctiques del curs. En el moment de preparar aquests materials, la versió estable és **WindowBuilder 1.25.x**.

Informació

**RA2 no és «saber on és un menú».**

El que heu d'entendre és que un IDE es pot personalitzar, ampliar i actualitzar. Els noms exactes dels menús poden variar lleugerament entre versions; la funció que busqueu és la mateixa.

Exercici: Recupera el teu entorn

Expliqueu què faríeu si (a) no veieu la consola, (b) voleu tornar a la disposició Java i (c) necessiteu afegir suport per una eina nova.

Bàsic7 min

Veure pistes

- Show View, Perspective i Marketplace/Install New Software són tres pistes diferents.

## 4. Primera finestra amb WindowBuilder i Swing0

Començarem amb un exemple mínim: una finestra que llegeix un enter, calcula el doble i mostra el resultat. Només hi ha **dos camps de text i un botó**.

### 1. Crear el projecte i la finestra

1. Creeu un **Java Project**.
2. Amb WindowBuilder instal·lat, feu **New → Other... → WindowBuilder → Swing Designer → Application Window**.
3. Poseu un nom a la classe, per exemple `CalculaDoble`.
4. Obriu la pestanya **Design**.

Per a una pràctica petita de mida fixa, podeu utilitzar **Absolute Layout**. En aplicacions reals més grans són preferibles gestors de disposició adaptables, però aquí l'objectiu és aprendre els components i els esdeveniments sense afegir una dificultat nova.

Important

**Trieu components Swing, no SWT.**

WindowBuilder pot oferir assistents per a tecnologies diferents. En aquesta unitat treballarem amb **Swing Designer** i components de `javax.swing`.

### 2. Afegir components

|Component Swing|Paper|Variable d'exemple|
|---|---|---|
|`JLabel`|Text fix.|`lblTitol`|
|`JTextField`|Entrada o sortida de text.|`textEntrada`, `textResultat`|
|`JButton`|Acció de l'usuari.|`btnDobla`|

El camp de resultat no l'ha de modificar l'usuari:

JAVA

#

```java
textResultat.setEditable(false);
```

### 3. Afegir el comportament

En fer doble clic al botó, WindowBuilder pot generar l'esquelet de l'`ActionListener`. El nostre codi va dins d'`actionPerformed`.

JAVA

#

```java
btnDobla.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        try {
            int entrada = Integer.parseInt(textEntrada.getText().trim());
            int resultat = entrada * 2;
            textResultat.setText(String.valueOf(resultat));
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Introdueix un nombre enter.");
        }
    }
});
```

Aquest exemple ja conté el patró que repetirem: **llegir → validar/convertir → calcular → mostrar**.

Exercici: Del doble al triple

Reproduïu l'exemple i modifiqueu-lo perquè calculi el triple. Afegiu un tooltip al camp d'entrada i feu que el camp de sortida no sigui editable.

Bàsic15 min

Veure pistes

- setToolTipText defineix l'ajuda.
- setEditable(false) protegeix la sortida.
- Només canvia una operació aritmètica.

## 5. Esdeveniments, validació i errors0

Una interfície gràfica espera accions de l'usuari. El botó és l'objecte que genera un esdeveniment i l'`ActionListener` és el codi que reacciona al clic.

![Flujo de un clic en un botón Swing: leer campos, validar, mostrar error o continuar con el cálculo](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/07_swing_validacio.png)

Una validació bona talla el flux tan aviat com detecta la primera dada incorrecta i indica a l'usuari on corregir-la.

### Validar un enter amb rang

JAVA

#

```java
try {
    int antiguitat = Integer.parseInt(textAntiguitat.getText().trim());

    if (antiguitat < 0 || antiguitat > 150) {
        textErrors.setText("Introdueix un enter entre 0 i 150.");
        textAntiguitat.requestFocus();
        textAntiguitat.selectAll();
        return;
    }

    textErrors.setText("");
    // continuar...
} catch (NumberFormatException ex) {
    textErrors.setText("Introdueix un enter entre 0 i 150.");
    textAntiguitat.requestFocus();
    textAntiguitat.selectAll();
    return;
}
```

### Validar un combo

Una tècnica senzilla és reservar l'índex 0 per al text «-- Selecciona --». Aleshores:

JAVA

#

```java
if (comboTipus.getSelectedIndex() == 0) {
    textErrors.setText("Selecciona un tipus.");
    comboTipus.requestFocus();
    return;
}
```

### Canviar l'estat de la interfície

JAVA

#

```java
textAntiguitat.setEnabled(false);
comboTipus.setEnabled(false);

comboOpcio.setEnabled(true);
textDescompte.setEnabled(true);
btnCalcular.setEnabled(true);
```

Aquesta tècnica evita que l'usuari canviï dades que ja hem validat mentre calcula la segona part del formulari.

Important

**Validar no és només convertir.**

`Integer.parseInt("200")` és correcte sintàcticament, però si el domini només permet valors fins a 150, la dada continua sent invàlida. Primer comprovem el format i després les regles del problema.

Exercici: Primer error, primer focus

Creeu dos camps: edat (0..120) i tipus de client (combo). En prémer Validar, mostreu només el primer error, doneu focus al component corresponent i no continueu fins que sigui correcte.

Intermedi15 min

Veure pistes

- Useu return després de cada error.
- Per al JTextField combineu requestFocus() i selectAll().
- Reserveu l'índex 0 del combo.

## 6. Construir una interfície per etapes0

Una aplicació amb molts camps deixa de ser complicada si la pensem com una **màquina d'estats senzilla**. En lloc de voler programar-ho tot alhora, dividim la interacció en etapes.

![Flujo de un formulario por etapas: datos iniciales, validación, opciones, cálculo y resultado o error](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/08_formulari_etapes.png)

El formulari gran es converteix en quatre passos petits: validar dades inicials, habilitar opcions, validar opcions i calcular.

### Mapa de components que heu de dominar

|Necessitat|Component/mètode|
|---|---|
|Entrada de text|`JTextField`, `getText()`, `setText()`|
|Selecció tancada|`JComboBox`, `addItem(...)`, `getSelectedIndex()`, `getSelectedItem()`, `getItemCount()`|
|Bloquejar/desbloquejar|`setEnabled(boolean)`|
|Sortida no editable|`setEditable(false)`|
|Ajuda contextual|`setToolTipText(...)`|
|Marcar un error de text|`requestFocus()` + `selectAll()`|
|Reiniciar|`setText("")`, `setSelectedIndex(0)` i reposar els estats habilitat/deshabilitat.|

### Un càlcul per capes

Eviteu una fórmula gegant. Calculeu variables intermèdies que pugueu inspeccionar:

JAVA

#

```java
double base = 80.0;
double factorClient = 0.90;
double extres = 25.0;
double descompte = 10.0;

double abansImpostos = base * factorClient + extres - descompte;
double iva = abansImpostos * 0.21;
double total = abansImpostos + iva;
```

Amb variables separades podeu provar cada regla de negoci de forma independent i detectar molt més ràpidament on hi ha un error.

Èxit

**Estratègia recomanada**

1. Feu que la finestra tingui l'aspecte correcte.
2. Implementeu només la validació del primer bloc.
3. Active/desactive la segunda etapa.
4. Valide la segunda etapa.
5. Haga los cálculos.
6. Implemente «borrar/reiniciar» al final.

**Ejercicio: Cuota mensual**

Cree una mini aplicación con tipo de cuota (Básica 20 €, Plus 35 €), un extra Sí/No de 5 € y un descuento numérico. Valide primero la cuota, después la extra y el descuento, y muestre base, IVA del 21% y total.

**Ver pistas**

- No programe todas las validaciones a la vez.
- Reserva un valor «-- Selecciona --» en los combos.
- Calcule base, antesImpuestos, iva y total en variables diferentes.

## 7. Empaquetar y ejecutar: CLASS, JAR, WAR y EAR0

En Java, Eclipse genera **bytecode** en archivos `.class`. Para distribuir una aplicación, es habitual encapsular varios archivos en un paquete.

|Formato|Uso principal|
|---|---|
|`.class`|Bytecode de una clase Java.|
|JAR|Java Archive: agrupa clases y recursos; puede representar una aplicación Java distribuible.|
|WAR|Web Application Archive: empaqueta una aplicación web Java para su despliegue.|
|EAR|Enterprise Archive: agrupa varios módulos de una aplicación empresarial.|

Para una aplicación de escritorio sencilla, el formato que más le interesa es el **JAR** . El IDE puede automatizar la exportación, pero JAR sigue necesitando una JVM compatible para ejecutar el bytecode.

**No confunda "ejecutar desde Eclipse" con "tener un .exe".**

En Java, el objetivo habitual es generar bytecodo y empaquetarlo. La JVM es quien proporciona la capa de ejecución sobre cada plataforma.

**Ejercicio: ¿Qué paquete utilizarías?**

Elija entre class, JAR, WAR o EAR para: una única clase compilada, una aplicación Java de escritorio, una aplicación web Java y un paquete empresarial con varios módulos.

**Ver pistas**

- Piense en clase, aplicación de escritorio, web y conjunto de módulos.

#### 3.2. JDK, JRE, JVM y configuración 

Para desarrollar Java necesitamos el **JDK** . Eclipse debe saber qué JDK utilizar para compilar y ejecutar el proyecto.

Información

**Entorno recomendado**

Trabajaremos con **JDK 25 LTS** o superior y una versión actual de **Eclipse** ( **Eclipse 2026-09** en el momento de preparar estos materiales). Si hay una versión LTS de Java más reciente al realizar esta unidad, utilícela: lo que cuenta es trabajar con una versión LTS, que ofrece una base más estable que las versiones intermedias.

### Compruebe Java antes de abrir el IDE

BASH

#

```bash
java -version
javac -version
```

Si `java`funciona pero `javac`no, probablemente disponga de un entorno de ejecución pero no de un JDK completo o `PATH`no apunta a las herramientas correctas.

|Elemento|Función práctica|
|---|---|
|`JAVA_HOME`|Indica la carpeta raíz de JDK en herramientas que necesitan localizarlo.|
|`PATH`|Permite ejecutar comandos como `java`y `javac`desde la terminal.|
|JDK configurado en Eclipse|Determina con qué conjunto de herramientas se construye el proyecto.|

### Flujo de preparación

1. Instale una versión **JDK LTS** , al menos la 25.
2. Verifique `java`y `javac`.
3. Instale o descomprima Eclipse.
4. Abra un _workspace_ .
5. Compruebe en las preferencias de Java que Eclipse detecta el JDK correcto.

**No instale cosas a ciegas.**

Si Eclipse ya compila un proyecto Java sencillo, JDK está operativo. Añadir nuevas versiones o cambiar variables sin necesidad concreta puede crear más problemas que resolver.

**Ejercicio: Diagnóstico mínimo**

Imagine que Eclipse se abre pero un proyecto Java no encuentra el compilador. Escriba tres comprobaciones, en orden, antes de reinstalar nada.

**Ver pistas**
- Primero compruebe la terminal.
- Luego la versión del JDK.
- Por último la configuración del IDE.

## 3. Proyectos, perspectivas, vistas y conectores0

Eclipse organiza el trabajo en **proyectos** . Un proyecto agrupa código fuente, recursos, configuración y otros archivos relacionados. Encima de esta estructura, el IDE presenta diferentes ventanas.

|Concepto|Imagen mental|
|---|---|
|Editor|La zona en la que modifica un archivo.|
|Vista|Una ventana auxiliar: explorador de proyecto, consola, problemas...|
|Perspectiva|Un conjunto de vistas y editores organizado para una tarea concreta.|
|Conector|Una extensión que añade capacidades a Eclipse.|

Si desapareix una finestra, normalment no cal reinstal·lar res: proveu **Window → Show View**. Per canviar la disposició orientada a una tasca, utilitzeu **Window → Perspective**.

### Instal·lar connectors

Segons el connector, el camí habitual és **Help → Eclipse Marketplace...** o **Help → Install New Software...**. El procés general és el mateix: localitzar el component, revisar què s'instal·larà, acceptar les condicions necessàries i reiniciar Eclipse.

Aquesta unitat utilitzarà dos exemples d'extensió:

- **WindowBuilder** per dissenyar interfícies Swing;
- **Spring Tools** per treballar còmodament amb projectes Spring.

### Si WindowBuilder encara no està instal·lat

1. Obriu **Help → Install New Software...**.
2. Afegiu un lloc nou amb el nom **WindowBuilder** i l'adreça `https://download.eclipse.org/windowbuilder/updates/release/latest`.
3. Seleccioneu els components de WindowBuilder, continueu l'assistent i reinicieu Eclipse.

Utilitzeu el canal `release/latest`: apunta a l'última versió estable de WindowBuilder. Eviteu els canals `milestone` i `nightly` per a les pràctiques del curs. En el moment de preparar aquests materials, la versió estable és **WindowBuilder 1.25.x**.

Informació

**RA2 no és «saber on és un menú».**

El que heu d'entendre és que un IDE es pot personalitzar, ampliar i actualitzar. Els noms exactes dels menús poden variar lleugerament entre versions; la funció que busqueu és la mateixa.

Exercici: Recupera el teu entorn

Expliqueu què faríeu si (a) no veieu la consola, (b) voleu tornar a la disposició Java i (c) necessiteu afegir suport per una eina nova.

Bàsic7 min

Veure pistes

- Show View, Perspective i Marketplace/Install New Software són tres pistes diferents.

## 4. Primera finestra amb WindowBuilder i Swing0

Començarem amb un exemple mínim: una finestra que llegeix un enter, calcula el doble i mostra el resultat. Només hi ha **dos camps de text i un botó**.

### 1. Crear el projecte i la finestra

1. Creeu un **Java Project**.
2. Amb WindowBuilder instal·lat, feu **New → Other... → WindowBuilder → Swing Designer → Application Window**.
3. Poseu un nom a la classe, per exemple `CalculaDoble`.
4. Obriu la pestanya **Design**.

Per a una pràctica petita de mida fixa, podeu utilitzar **Absolute Layout**. En aplicacions reals més grans són preferibles gestors de disposició adaptables, però aquí l'objectiu és aprendre els components i els esdeveniments sense afegir una dificultat nova.

Important

**Trieu components Swing, no SWT.**

WindowBuilder pot oferir assistents per a tecnologies diferents. En aquesta unitat treballarem amb **Swing Designer** i components de `javax.swing`.

### 2. Afegir components

|Component Swing|Paper|Variable d'exemple|
|---|---|---|
|`JLabel`|Text fix.|`lblTitol`|
|`JTextField`|Entrada o sortida de text.|`textEntrada`, `textResultat`|
|`JButton`|Acció de l'usuari.|`btnDobla`|

El camp de resultat no l'ha de modificar l'usuari:

JAVA

#

```java
textResultat.setEditable(false);
```

### 3. Afegir el comportament

En fer doble clic al botó, WindowBuilder pot generar l'esquelet de l'`ActionListener`. El nostre codi va dins d'`actionPerformed`.

JAVA

#

```java
btnDobla.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        try {
            int entrada = Integer.parseInt(textEntrada.getText().trim());
            int resultat = entrada * 2;
            textResultat.setText(String.valueOf(resultat));
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Introdueix un nombre enter.");
        }
    }
});
```

Aquest exemple ja conté el patró que repetirem: **llegir → validar/convertir → calcular → mostrar**.

Exercici: Del doble al triple

Reproduïu l'exemple i modifiqueu-lo perquè calculi el triple. Afegiu un tooltip al camp d'entrada i feu que el camp de sortida no sigui editable.

Bàsic15 min

Veure pistes

- setToolTipText defineix l'ajuda.
- setEditable(false) protegeix la sortida.
- Només canvia una operació aritmètica.

## 5. Esdeveniments, validació i errors0

Una interfície gràfica espera accions de l'usuari. El botó és l'objecte que genera un esdeveniment i l'`ActionListener` és el codi que reacciona al clic.

![Flujo de un clic en un botón Swing: leer campos, validar, mostrar error o continuar con el cálculo](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/07_swing_validacio.png)

Una validació bona talla el flux tan aviat com detecta la primera dada incorrecta i indica a l'usuari on corregir-la.

### Validar un enter amb rang

JAVA

#

```java
try {
    int antiguitat = Integer.parseInt(textAntiguitat.getText().trim());

    if (antiguitat < 0 || antiguitat > 150) {
        textErrors.setText("Introdueix un enter entre 0 i 150.");
        textAntiguitat.requestFocus();
        textAntiguitat.selectAll();
        return;
    }

    textErrors.setText("");
    // continuar...
} catch (NumberFormatException ex) {
    textErrors.setText("Introdueix un enter entre 0 i 150.");
    textAntiguitat.requestFocus();
    textAntiguitat.selectAll();
    return;
}
```

### Validar un combo

Una tècnica senzilla és reservar l'índex 0 per al text «-- Selecciona --». Aleshores:

JAVA

#

```java
if (comboTipus.getSelectedIndex() == 0) {
    textErrors.setText("Selecciona un tipus.");
    comboTipus.requestFocus();
    return;
}
```

### Canviar l'estat de la interfície

JAVA

#

```java
textAntiguitat.setEnabled(false);
comboTipus.setEnabled(false);

comboOpcio.setEnabled(true);
textDescompte.setEnabled(true);
btnCalcular.setEnabled(true);
```

Aquesta tècnica evita que l'usuari canviï dades que ja hem validat mentre calcula la segona part del formulari.

Important

**Validar no és només convertir.**

`Integer.parseInt("200")` és correcte sintàcticament, però si el domini només permet valors fins a 150, la dada continua sent invàlida. Primer comprovem el format i després les regles del problema.

Exercici: Primer error, primer focus

Creeu dos camps: edat (0..120) i tipus de client (combo). En prémer Validar, mostreu només el primer error, doneu focus al component corresponent i no continueu fins que sigui correcte.

Intermedi15 min

Veure pistes

- Useu return després de cada error.
- Per al JTextField combineu requestFocus() i selectAll().
- Reserveu l'índex 0 del combo.

## 6. Construir una interfície per etapes0

Una aplicació amb molts camps deixa de ser complicada si la pensem com una **màquina d'estats senzilla**. En lloc de voler programar-ho tot alhora, dividim la interacció en etapes.

![Flujo de un formulario por etapas: datos iniciales, validación, opciones, cálculo y resultado o error](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/08_formulari_etapes.png)

El formulari gran es converteix en quatre passos petits: validar dades inicials, habilitar opcions, validar opcions i calcular.

### Mapa de components que heu de dominar

|Necessitat|Component/mètode|
|---|---|
|Entrada de text|`JTextField`, `getText()`, `setText()`|
|Selecció tancada|`JComboBox`, `addItem(...)`, `getSelectedIndex()`, `getSelectedItem()`, `getItemCount()`|
|Bloquejar/desbloquejar|`setEnabled(boolean)`|
|Sortida no editable|`setEditable(false)`|
|Ajuda contextual|`setToolTipText(...)`|
|Marcar un error de text|`requestFocus()` + `selectAll()`|
|Reiniciar|`setText("")`, `setSelectedIndex(0)` i reposar els estats habilitat/deshabilitat.|

### Un càlcul per capes

Eviteu una fórmula gegant. Calculeu variables intermèdies que pugueu inspeccionar:

JAVA

#

```java
double base = 80.0;
double factorClient = 0.90;
double extres = 25.0;
double descompte = 10.0;

double abansImpostos = base * factorClient + extres - descompte;
double iva = abansImpostos * 0.21;
double total = abansImpostos + iva;
```

Amb variables separades podeu provar cada regla de negoci de forma independent i detectar molt més ràpidament on hi ha un error.

**Estratègia recomanada**

1. Feu que la finestra tingui l'aspecte correcte.
2. Implementeu només la validació del primer bloc.
3. Active/desactive la segunda etapa.
4. Valide la segunda etapa.
5. Haga los cálculos.
6. Implemente «borrar/reiniciar» al final.

**Ejercicio: Cuota mensual**

Cree una mini aplicación con tipo de cuota (Básica 20 €, Plus 35 €), un extra Sí/No de 5 € y un descuento numérico. Valide primero la cuota, después la extra y el descuento, y muestre base, IVA del 21% y total.

**Ver pistas**

- No programe todas las validaciones a la vez.
- Reserva un valor «-- Selecciona --» en los combos.
- Calcule base, antesImpuestos, iva y total en variables diferentes.

## 7. Empaquetar y ejecutar: CLASS, JAR, WAR y EAR0

En Java, Eclipse genera **bytecode** en archivos `.class`. Para distribuir una aplicación, es habitual encapsular varios archivos en un paquete.

|Formato|Uso principal|
|---|---|
|`.class`|Bytecode de una clase Java.|
|JAR|Java Archive: agrupa clases y recursos; puede representar una aplicación Java distribuible.|
|WAR|Web Application Archive: empaqueta una aplicación web Java para su despliegue.|
|EAR|Enterprise Archive: agrupa varios módulos de una aplicación empresarial.|

Para una aplicación de escritorio sencilla, el formato que más le interesa es el **JAR** . El IDE puede automatizar la exportación, pero JAR sigue necesitando una JVM compatible para ejecutar el bytecode.

Información

**No confunda "ejecutar desde Eclipse" con "tener un .exe".**

En Java, el objetivo habitual es generar bytecodo y empaquetarlo. La JVM es quien proporciona la capa de ejecución sobre cada plataforma.

**Ejercicio: ¿Qué paquete utilizarías?**

Elija entre class, JAR, WAR o EAR para: una única clase compilada, una aplicación Java de escritorio, una aplicación web Java y un paquete empresarial con varios módulos.

**Ver pistas**

- Piense en clase, aplicación de escritorio, web y conjunto de módulos.
#### 3.3. Proyectos, perspectivas, vistas y conectores

Eclipse organiza el trabajo en **proyectos** . Un proyecto agrupa código fuente, recursos, configuración y otros archivos relacionados. Encima de esta estructura, el IDE presenta diferentes ventanas.

|Concepto|Imagen mental|
|---|---|
|Editor|La zona en la que modifica un archivo.|
|Vista|Una ventana auxiliar: explorador de proyecto, consola, problemas...|
|Perspectiva|Un conjunto de vistas y editores organizado para una tarea concreta.|
|Conector|Una extensión que añade capacidades a Eclipse.|

Si desaparece una ventana, normalmente no es necesario reinstalar nada: pruebe **Window → Show View** . Para cambiar la disposición orientada a una tarea, utilice **Window → Perspective** .

##### Instalar conectores

Según el complemento, el camino habitual es **Help → Eclipse Marketplace...** o **Help → Install New Software...** . El proceso general es el mismo: localizar el componente, revisar qué se va a instalar, aceptar las condiciones necesarias y reiniciar Eclipse.

Esta unidad utilizará dos ejemplos de extensión:

- **WindowBuilder** para diseñar interfaces Swing;
- **Spring Tools** para trabajar cómodamente con proyectos Spring.

##### Si WindowBuilder todavía no está instalado

1. Abra **Help → Instalar New Software...** .
2. Añada un sitio nuevo con el nombre **WindowBuilder** y la dirección `https://download.eclipse.org/windowbuilder/updates/release/latest`.
3. Seleccione los componentes de WindowBuilder, continúe el asistente y reinicie Eclipse.

Utilice el canal `release/latest`: apunta a la última versión estable de WindowBuilder. Evite los canales `milestone`y `nightly`para las prácticas del curso. En el momento de preparar estos materiales, la versión estable es **WindowBuilder** 1.25.x.

Información

**RA2 no es «saber dónde está un menú».**

Lo que debe entender es que un IDE se puede personalizar, ampliar y actualizar. Los nombres exactos de los menús pueden variar ligeramente entre versiones; la función que busca es la misma.

**Ejercicio: Recupera tu entorno**

Explique qué haría si (a) no ve la consola, (b) desea volver a la disposición Java y (c) necesita añadir soporte para una herramienta nueva.

**Ver pistas**

- Show View, Perspective y Marketplace/Install New Software son tres pistas distintas.

#### 3.4. Primera ventana con WindowBuilder y Swing0

Empezaremos con un ejemplo mínimo: una ventana que lee un entero, calcula el doble y muestra el resultado. Sólo hay **dos campos de texto y un botón** .

##### 1. Crear el proyecto y la ventana

1. Cree un **Java Project** .
2. Con WindowBuilder instalado, haga **New → Other... → WindowBuilder → Swing Designer → Application Window** .
3. Ponga un nombre en la clase, por ejemplo `CalculaDoble`.
4. Abra la pestaña **Design** .

Para una práctica pequeña de tamaño fijo, puede utilizar **Absolute Layout** . En aplicaciones reales más grandes son preferibles gestores de disposición adaptables, pero aquí el objetivo es aprender los componentes y eventos sin añadir una dificultad nueva.

Importante

**Elija componentes Swing, no SWT.**

WindowBuilder puede ofrecer asistentes para tecnologías distintas. En esta unidad trabajaremos con **Swing Designer** y componentes de `javax.swing`.

##### 2. Añadir componentes

|Component Swing|Papel|Variable de ejemplo|
|---|---|---|
|`JLabel`|Texto fijo.|`lblTitol`|
|`JTextField`|Entrada o salida de texto.|`textEntrada`,`textResultat`|
|`JButton`|Acción del usuario.|`btnDobla`|

El campo de resultado no debe modificarlo el usuario:

```java
textResultat.setEditable(false);
```

##### 3. Añadir el comportamiento

Al hacer doble clic en el botón, WindowBuilder puede generar el esqueleto del `ActionListener`. Nuestro código va dentro de `actionPerformed`.

```java
btnDobla.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        try {
            int entrada = Integer.parseInt(textEntrada.getText().trim());
            int resultat = entrada * 2;
            textResultat.setText(String.valueOf(resultat));
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Introdueix un nombre enter.");
        }
    }
});
```

Este ejemplo ya contiene el patrón que repetiremos: **leer → validar/convertir → calcular → mostrar** .

**Ejercicio: Del doble al triple**

Reproduzca el ejemplo y modifíquelo para que calcule el triple. Añada un tooltipo al campo de entrada y haga que el campo de salida no sea editable.

**Ver pistas**

- setToolTipText define la ayuda.
- setEditable(false) resguarda la salida.
- Sólo cambia una operación aritmética.

#### 3.5. Eventos, validación y errores0

Una interfaz gráfica espera acciones del usuario. El botón es el objeto que genera un evento y lo `ActionListener`es el código que reacciona al clic.

![Flujo de un clic en un botón Swing: leer campos, validar, mostrar error o continuar con el cálculo](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/07_swing_validacio.png)

Una buena validación corta el flujo tan pronto como detecta el primer dato incorrecto e indica al usuario dónde corregirlo.
##### Validar un entero con rango

```java
try {
    int antiguitat = Integer.parseInt(textAntiguitat.getText().trim());

    if (antiguitat < 0 || antiguitat > 150) {
        textErrors.setText("Introdueix un enter entre 0 i 150.");
        textAntiguitat.requestFocus();
        textAntiguitat.selectAll();
        return;
    }

    textErrors.setText("");
    // continuar...
} catch (NumberFormatException ex) {
    textErrors.setText("Introdueix un enter entre 0 i 150.");
    textAntiguitat.requestFocus();
    textAntiguitat.selectAll();
    return;
}
```

##### Validar un combo

Una técnica sencilla es reservar el índice 0 para el texto "-- Selecciona --". Entonces:


```java
if (comboTipus.getSelectedIndex() == 0) {
    textErrors.setText("Selecciona un tipus.");
    comboTipus.requestFocus();
    return;
}
```

##### Cambiar el estado de la interfaz


```java
textAntiguitat.setEnabled(false);
comboTipus.setEnabled(false);

comboOpcio.setEnabled(true);
textDescompte.setEnabled(true);
btnCalcular.setEnabled(true);
```

Esta técnica evita que el usuario cambie datos que ya hemos validado mientras calcula la segunda parte del formulario.

Importante

**Validar no es sólo convertir.**

`Integer.parseInt("200")`es correcto sintácticamente, pero si el dominio sólo permite valores hasta 150, el dato sigue siendo inválido. Primero comprobamos el formato y después las reglas del problema.

**Ejercicio: Primer error, primer foco**

Cree dos campos: edad (0..120) y tipo de cliente (combo). Al pulsar Validar, muestre sólo el primer error, dé foco al componente correspondiente y no continúe hasta que sea correcto.

**Ver pistas**
- Utilice return después de cada error.
- Para JTextField combine requestFocus() y selectAll().
- Reserva el índice 0 del combo.
#### 3.6. Construir una interfaz por etapas0

Una aplicación con muchos campos deja de ser complicada si la pensamos como una **máquina de estados sencilla** . En lugar de querer programar todo a la vez, dividimos la interacción en etapas.

![Flujo de un formulario por etapas: datos iniciales, validación, opciones, cálculo y resultado o error](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-2/08_formulari_etapes.png)

El formulario grande se convierte en cuatro pasos pequeños: validar datos iniciales, habilitar opciones, validar opciones y calcular.

##### Mapa de componentes que debe dominar

|Necesidad|Componente/método|
|---|---|
|Entrada de texto|`JTextField`, `getText()`,`setText()`|
|Selección cerrada|`JComboBox`, `addItem(...)`, `getSelectedIndex()`, `getSelectedItem()`,`getItemCount()`|
|Bloquear/desbloquear|`setEnabled(boolean)`|
|Salida no editable|`setEditable(false)`|
|Ayuda contextual|`setToolTipText(...)`|
|Marcar un error de texto|`requestFocus()`+`selectAll()`|
|Reiniciar|`setText("")`, `setSelectedIndex(0)`y reponer los estados habilitado/deshabilitado.|
##### Un cálculo por capas

Evite una fórmula gigante. Calcule variables intermedias que pueda inspeccionar:

```java
double base = 80.0;
double factorClient = 0.90;
double extres = 25.0;
double descompte = 10.0;

double abansImpostos = base * factorClient + extres - descompte;
double iva = abansImpostos * 0.21;
double total = abansImpostos + iva;
```

Con variables separadas puede probar cada regla de negocio de forma independiente y detectar mucho más rápidamente dónde hay un error.

Éxito

**Estrategia recomendada**

1. Haga que la ventana tenga el aspecto correcto.
2. Implemente sólo la validación del primer bloque.
3. Active/desactive la segunda etapa.
4. Valide la segunda etapa.
5. Haga los cálculos.
6. Implemente «borrar/reiniciar» al final.

Ejercicio: Cuota mensual

Cree una mini aplicación con tipo de cuota (Básica 20 €, Plus 35 €), un extra Sí/No de 5 € y un descuento numérico. Valide primero la cuota, después la extra y el descuento, y muestre base, IVA del 21% y total.

Ver pistas

- No programe todas las validaciones a la vez.
- Reserva un valor «-- Selecciona --» en los combos.
- Calcule base, antesImpuestos, iva y total en variables diferentes.

#### 3.7. Empaquetar y ejecutar: CLASS, JAR, WAR y EAR

En Java, Eclipse genera **bytecode** en archivos `.class`. Para distribuir una aplicación, es habitual encapsular varios archivos en un paquete.

|Formato|Uso principal|
|---|---|
|`.class`|Bytecode de una clase Java.|
|JAR|Java Archive: agrupa clases y recursos; puede representar una aplicación Java distribuible.|
|WAR|Web Application Archive: empaqueta una aplicación web Java para su despliegue.|
|EAR|Enterprise Archive: agrupa varios módulos de una aplicación empresarial.|

Para una aplicación de escritorio sencilla, el formato que más le interesa es el **JAR** . El IDE puede automatizar la exportación, pero JAR sigue necesitando una JVM compatible para ejecutar el bytecode.

Información

**No confunda "ejecutar desde Eclipse" con "tener un .exe".**

En Java, el objetivo habitual es generar bytecodo y empaquetarlo. La JVM es quien proporciona la capa de ejecución sobre cada plataforma.

Ejercicio: ¿Qué paquete utilizarías?

Elija entre class, JAR, WAR o EAR para: una única clase compilada, una aplicación Java de escritorio, una aplicación web Java y un paquete empresarial con varios módulos.

Ver pistas

- Piense en clase, aplicación de escritorio, web y conjunto de módulos.