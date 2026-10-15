## **UNIDAD 1**:  Introducción al diseño orientado a objetos (modelaje UML) (RA5 y RA6)

Esta unidad introduce el modelado orientado a objetos con UML desde una idea muy concreta: **antes de dibujar un diagrama es necesario entender qué queremos explicar** . Por eso empezaremos con ejemplos mínimos —una sola clase, una relación, una decisión, una secuencia corta— y sólo después combinaremos las piezas en modelos más completos.

Trabajaremos los diagramas de clases y los principales diagramas de comportamiento que aparecen en las actividades del módulo. También aprenderemos a utilizar Papyrus para construirlos, exportarlos, generar código Java y realizar el recorrido inverso: obtener clases UML a partir de código existente.

**Resultados de aprendizaje trabajados**

| RA  | Descripción                                                                                                                         |
| --- | ----------------------------------------------------------------------------------------------------------------------------------- |
| RA5 | Genera diagramas de clases valorando su importancia en el desarrollo de aplicaciones y utilizando herramientas específicas.         |
| RA6 | Genera diagramas de comportamiento valorando su importancia en el desarrollo de aplicaciones y utilizando herramientas específicas. |

**Información**  - Cómo estudiar esta unidad** No memorice una colección de símbolos. Ante cada enunciado haga siempre las mismas preguntas: ¿qué conceptos existen?, ¿qué datos tienen?, ¿qué pueden hacer?, ¿cómo se relacionan?, ¿quién inicia cada acción?, ¿en qué orden pasan las cosas?, ¿qué decisiones o cambios de estado existen? Si estas preguntas tienen respuesta, el diagrama casi sale solo.

###  Bloque 1: Del problema al primer diagrama de clases

Aprenderá a pasar de un texto informal a un primer modelo orientado a objetos.

- ¿Qué es UML y qué diferencia una visión estática de una de comportamiento.
- Cómo representar clases, atributos, operaciones y visibilidad.
- Qué diferencia existe entre una clase y un objeto.
- Cómo crear un primer proyecto y un primer diagrama de clases con Papyrus.

#### 1. Modelar antes de programar

Cuando recibimos un enunciado, la tentación habitual es empezar a escribir código. En proyectos pequeños puede funcionar, pero cuando hay muchas clases, reglas e interacciones es fácil descubrir demasiado tarde que dos partes del sistema se han entendido de forma distinta.

El **diseño** sirve precisamente para decidir _cómo_ representaremos el sistema antes de entrar en todos los detalles de la implementación. UML proporciona una notación gráfica común para describir esta idea.

Definición

**UML:** Unified Modeling Language. Es una notación de modelado que permite describir la estructura y comportamiento de un sistema mediante diferentes tipos de diagramas.

Importante

**UML no es un lenguaje de programación ni una metodología.** UML no decide cómo debe gestionar el proyecto ni sustituye a Java. Es una forma estándar de representar el modelo para que otras personas puedan entenderlo.

##### 1.1. Dos preguntas, dos familias de diagramas

|Pregunta|Visión UML|Ejemplos|
|---|---|---|
|¿Qué hay en el sistema?|Estática o estructural|Clases, objetos, paquetes, componentes...|
|¿Qué ocurre en el sistema?|Dinámica o de comportamiento|Casos de uso, secuencias, actividades, estados...|

##### 1.2. ¿Dónde encaja el modelo dentro de un proyecto?

De forma simplificada, un proyecto pasa por entender el problema, analizar los requisitos, diseñar la solución, desarrollarla y probarla, y finalmente ponerla en servicio y mantenerla. UML es especialmente útil entre el análisis y el diseño: permite convertir lo que el sistema debe hacer en una representación que después se puede implementar.

##### 1.3. Mapa rápido de los diagramas UML

No todos los diagramas tendrán el mismo peso en esa unidad, pero conviene saber qué explica cada uno.

UML organiza sus 14 diagramas en dos familias complementarias:

- **🏗️ Diagramas de Estructura (Visión estática · *«La fotografía»*):**
  - **Clases:** Tipos, datos, métodos y relaciones que forman el sistema *(el más utilizado)*.
  - **Objetos:** Instancias y datos concretos en un escenario de ejemplo.
  - **Componentes:** Piezas de software y las interfaces que ofrecen o consumen.
  - **Paquetes:** Organización de los elementos del modelo en grupos y namespaces.
  - **Despliegue:** Nodos físicos y servidores donde se ejecutan las aplicaciones.
  - **Estructura compuesta:** Partes internas que colaboran dentro de un elemento.
  - **Perfil:** Adaptación y estereotipos de UML para un dominio o plataforma concreta.

- **⚡ Diagramas de Comportamiento (Visión dinámica · *«La película»*):**
  - **Casos de uso:** Qué servicios ofrece el sistema a los actores externos *(requisitos)*.
  - **Secuencia:** En qué orden temporal se comunican los participantes *(interacción clave)*.
  - **Actividades:** Flujo de trabajo, decisiones y procesos paralelos.
  - **Estados:** Cómo cambia un objeto a lo largo de su ciclo de vida ante eventos.
  - **Comunicación:** Quién se comunica con quién y en qué orden numérico.
  - **Visión general de interacción:** Resumen que conecta y orquesta varias secuencias.
  - **Temporal:** Evolución de estados con restricciones estrictas de tiempo.


![Mapa visual de los principales diagramas UML estructurales y de comportamiento](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/01_uml_visio_general.jpg)

Mapa de los principales diagramas UML y la pregunta que ayuda a responder a cada familia.

En esta unidad trabajaremos en profundidad los diagramas que necesitará para transformar enunciados textuales en modelos útiles. El diagrama de clases será la prenda central de la parte estructural. Para la parte de comportamiento practicaremos casos de uso, secuencia, comunicación, actividades y estados. El resto debe saber situarlos y entender qué problema de modelado resuelven.

Información

**Modelo mental**

Un diagrama de clases es como una fotografía de la estructura del sistema. Un diagrama de comportamiento se asemeja más a una película: explica qué hacen los elementos y cómo cambian a lo largo del tiempo.

##### 1.4. Del texto al modelo

Imagine este enunciado:

> Una tienda vende productos. De cada producto queremos guardar el código, nombre y precio. La tienda necesita consultar si un producto es caro.

Aún no dibujamos nada. Primero separamos la información:

- **concepto principal:** Producto;
- **datos:** código, nombre y precio;
- **comportamiento:** saber si es caro.

Esta separación nos lleva directamente a una clase con atributos y operación. Ésta será la técnica que repetiremos a lo largo de toda la unidad.

**Ejercicio: Subraya antes de dibujar**

En el enunciado “Un curso tiene un código y un título. Queremos saber cuántos alumnos hay matriculados», identifique el concepto principal, los datos y el comportamiento sin dibujar todavía ningún diagrama.

**Ver pistas**

- Busque sustantivos para encontrar conceptos.
- Las características suelen convertirse en atributos.
- Los verbos o necesidades de cálculo suelen sugerir operaciones.

#### 2. Clase, atributo y operación

Una **clase** describe un conjunto de objetos que comparten estructura y comportamiento. UML se representa habitualmente con un rectángulo dividido en compartimentos.

![Ejemplo visual de una clase UML, sus atributos y operaciones, y dos instancias](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/02_classe_atribut_operacio_objecte.jpg)

Una clase define estructura y comportamiento; Los objetos son instancias con valores concretos.

La lectura es muy directa:

- el primer compartimiento contiene el **nombre de la clase** ;
- el segundo contiene los **atributos** ;
- el tercero contiene las **operaciones** o métodos.

Definición

**Atributo:** Dato que describe el estado de un objeto. En UML se suele escribir como nombre: Tipo.

Definición

**Operación:** Comportamiento que ofrece la clase. En UML se representa la firma: nombre, parámetros y tipos de retorno.

##### 2.1. Primer paso: sólo una clase

Antes de añadir relaciones, practique una clase aislada. Por ejemplo:

> Una película tiene un título, una duración en minutos y una calificación de edad. Queremos saber si es apta para una edad concreta.

Separándolo por los tres compartimentos que acabamos de ver:

```text

Pellicula
----------------------------
- titol: String
- duradaMinuts: int
- edatMinima: int
----------------------------
+ esApta(edat: int): boolean
```

Observe que el método `esApta`necesita un dato de entrada: la edad que queremos comprobar. Por eso el parámetro forma parte de la firma.

#####  2.2. Cómo pasarlo a Java

JAVAPelícula.java

```java
public class Pellicula {
    private String titol;
    private int duradaMinuts;
    private int edatMinima;

    public boolean esApta(int edat) {
        return edat >= edatMinima;
    }
}
```

El diagrama no es código, pero existe una correspondencia clara: los atributos UML se convierten habitualmente en campos y las operaciones UML en métodos.

Importante

**No convierta cada frase en un atributo.** Un dato debe tener sentido como parte del estado del objeto. Expresiones como "es importante" o "se hace rápidamente" no son automáticamente atributos.

**Ejercicio: Dibuja una clase**

Modele una clase Cuenta con número, titular y saldo. Debe permitir ingresar una cantidad y consultar si está en descubierto.

**Ver pistas**

- Los tres valores describen el estado.
- Ingresar necesita un parámetro.
- Estar en descubierto puede devolver boolean.

#### 3. Visibilidad, tipos y firmas

Un diagrama de clases no sólo dice qué miembros existen. También puede indicar desde dónde son accesibles.

|Símbolo UML|Java habitual|Significado|
|---|---|---|
|`+`|`public`|Accesible desde otras clases.|
|`-`|`private`|Accesible desde la misma clase.|
|`#`|`protected`|Accesible desde la clase y sus especializaciones.|
|`~`|visibilidad de paquete|Accesible dentro del propio paquete.|

En muchos ejercicios de modelado trabajaremos con una regla simple: **atributos privados y operaciones públicas** , salvo que el enunciado indique otra cosa.

En notación UML, por ejemplo: `- saldo: double`, `+ ingressar(import: double): void`y `+ saldoDisponible(): double`.
##### 3.1. Tipo de los atributos

Los tipos ayudan a concretar qué puede contener cada atributo. Algunos ejemplos habituales son `String`, `int`, `double`, `boolean`o `Date`. El nombre concreto puede variar según la herramienta o el lenguaje, pero el modelo debe ser coherente.
##### 3.2. Firma de una operación

Una operación UML puede incluir:

Una firma completa podría ser `+ calcularPreu(quantitat: int, descompte: double): double`.

- `calcularPreu`: nombre de la operación;
- `quantitat: int`y `descompte: double`: parámetros;
- `double`: tipos de retorno.

En Papyrus, los parámetros y el valor de retorno se gestionan como _owned parameters_ . Los parámetros normales utilizan dirección `in`; el valor de retorno utiliza dirección `return`.

Información

**Getter y setter no son el centro del modelo.**

Cuando un ejercicio pide omitir getters y setters, no significa que el código final no pueda tenerlos. Significa que el diagrama debe concentrarse en la información y el comportamiento relevantes, sin llenarlo de métodos triviales.

**Ejercicio: Lee firmas**

Explique qué significa «+ reservar(fecha: Date, plazas: int): boolean» y proponga la firma UML de un método que reciba un año y devuelva el número de ventas.

**Ver pistas**

- Separe nombre, parámetros y retorno.
- Piense qué tipo puede representar un recuento.

#### 4. Objetos e instancias

Una clase es una descripción. Un **objeto** es una instancia concreta creada a partir de esa clase.

![Dos objetos p1:Pellicula y p2:Pellicula con los mismos atributos y valores diferentes](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-1/11_objectes_instancia_pellicula.png)

Dos objetos instanciados a partir de la misma clase `Pellicula`, cada uno con sus propios valores.

Ambos objetos comparten la misma estructura porque son instancias de `Pellicula`, pero mantienen valores diferentes.

```java
Pellicula p1 = new Pellicula();
Pellicula p2 = new Pellicula();
```

Esta diferencia es importante cuando leemos un diagrama: una caja con el nombre `Pellicula`describe un tipo. Una notación cómo `p1:Pellicula`representa una instancia concreta.

### ¿Para qué sirve un diagrama de objetos?

Un diagrama de objetos puede funcionar como una fotografía de ejemplo de un diagrama de clases. Es útil para comprobar si las relaciones y multiplicidades que hemos definido admiten situaciones reales.

Información

**Truco de validación**: Si dudas de una relación entre clases, invente dos o tres objetos concretos. Pregunta qué objetos pueden quedar conectados y cuántos pueden haber a cada lado. A menudo, la multiplicidad correcta se ve mucho más clara.

**Ejercicio: ¿Clase u objeto?** Clasifique estos elementos: Cliente, Juan: Cliente, Pedido y Pedido42: Pedido. Luego invente dos valores de atributos distintos para ambos objetos.

Ver pistas
- El formato nombreObjeto:Clase identifica una instancia.

#### 5. Primer diagrama de clases con Papyrus0

Una vez entendemos qué queremos moldear, ya tiene sentido abrir la herramienta. Papyrus es un entorno basado en Eclipse que permite construir modelos de UML. La interfaz puede variar ligeramente según su versión, pero el flujo de trabajo es el mismo.

##### 5.1. Crear un proyecto

1. Abra **File → New → Other...** .
2. Busque **Papyrus** y seleccione **Papyrus Project** .
3. Asegúrese de que trabaja con un modelo UML.
4. Ponga un nombre en el proyecto y en el modelo.
5. Añada un **Class Diagram** .

**Un modelo no es una carpeta para acumular ejercicios inconexos.** Si está haciendo diagramas independientes, es preferible utilizar un modelo diferente para cada ejercicio. Papyrus valida constantemente la coherencia del modelo y mezclar ejercicios sin relación complica el trabajo y puede penalizar el rendimiento.

##### 5.2. Añadir una clase

En la paleta del diagrama encontrará los elementos principales. Seleccione **Class** , haga clic en el lienzo y ponga un nombre a la clase. Después, desde la vista **Properties** , puede añadir propiedades y operaciones.

Para la clase `Pellicula`del ejemplo anterior:

|Elemento|Configuración|
|---|---|
|`titol`|Property, tipo String, visibilidad private|
|`duradaMinuts`|Property, tipo Integer/int, visibilidad private|
|`edatMinima`|Property, tipo Integer/int, visibilidad private|
|`esApta`|Operation, visibilidad public, parámetro `edat`, retorno boolean|

##### 5.3. Hacer legible el diagrama

Después de añadir propiedades u operaciones, amplíe la caja de la clase hasta que los nombres y las firmas se vean enteros. Un diagrama correcto pero ilegible sigue siendo una mala entrega.

##### 5.4. Guardarlo como imagen

Cuando haya terminado, haga clic en una zona vacía del diagrama y utilice la opción de exportación de imagen disponible en Papyrus, habitualmente **File → Save As Image File...** .

Éxito **Primer objetivo alcanzado**

Si puede leer un enunciado corto, separar clase, atributos y operaciones, configurar su visibilidad y reproducirlo en Papyrus, ya tiene la base sobre la que construiremos todos los diagramas de clases de la unidad.
### Bloque 2:  Relaciones entre clases y modelado completo

Aprenderá a convertir frases como «un cliente puede realizar muchos pedidos» o «un motor no tiene sentido sin el dron» en relaciones UML precisas.

- Asociaciones y multiplicidades leídas en ambas direcciones.
- Generalización, dependencia e interfaces.
- Diferencia entre agregación y composición.
- Clases asociativas y relaciones con información propia.
- Método sistemático para resolver un enunciado completo.



