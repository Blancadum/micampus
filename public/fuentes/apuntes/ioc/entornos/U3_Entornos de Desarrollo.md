## UNIDAD 3: Pruebas, optimización y documentación del software (RA3 y RA4)

Esta unidad se centra en una idea muy concreta: **un programa no está terminado cuando compila** . Hay que saber demostrar que funciona, detectar por qué falla, mejorar su estructura sin cambiar su comportamiento, conservar el historial de los cambios y dejar documentación suficiente para que otra persona pueda entenderlo y mantenerlo.

Trabajaremos los **RA3 y RA4** a partir de ejemplos Java pequeños y progresivos. Primero diseñaremos pruebas con clases de equivalencia, valores límite, flujo de control y complejidad ciclomática; después convertiremos estos casos en pruebas automáticas con **JUnit 5** y aprenderemos a depurar con Eclipse. A continuación aplicaremos **refacciones** , revisaremos el código con herramientas de análisis y generaremos documentación con **Javadoc** . Por último, utilizaremos **Git** con commites, ramas, fusiones y resolución de conflictos.

Los ejemplos y resúmenes complementarios de la antigua unidad se han integrado directamente en estos materiales. Por tanto, no es necesario ir saltando entre documentos para entender cómo se diseña un caso de prueba, cómo se aplica una refacción o cómo se resuelve un conflicto de Git.

**Resultados de aprendizaje trabajados**

| RA  | Descripción                                                                          |
| --- | ------------------------------------------------------------------------------------ |
| RA3 | Verifica el funcionamiento de programas diseñando y realizando pruebas.              |
| RA4 | Optimiza código utilizando las herramientas disponibles en el entorno de desarrollo. |
**Cómo estudiar esta unidad**: No memorice listas de órdenes ni tipos de prueba. Siga siempre el mismo hilo: **qué debería pasar → con qué datos puedo comprobarlo → cómo automatizo la comprobación → qué hago si falla → cómo cambio el código sin romperlo → cómo dejo constancia del cambio** . Si entiende este recorrido, podrá adaptarlo a cualquier código similar al del EAC.


### Bloque 1: Diseñar pruebas  que realmente encuentran errores

- Entenderá por qué probar no es «ejecutar unas cuantas veces», sino diseñar evidencias.
- Distinguirá pruebas unitarias, funcionales, de integración, de carga, de aceptación, de sistema, de regresión y de humo.
- Construirá clases de equivalencia y casos de prueba con valores límite y valores intermedios.
- Dibujará el flujo de control, calculará la complejidad ciclomática e identificará caminos independientes.
- Relacionará cada caso de prueba con el comportamiento o camino que realmente comprueba.

Esto muestra una idea importante: **clases de equivalencia, valores límite y caminos independientes no son tres ejercicios separados** . El conjunto final de casos debe revisarse con las tres miradas. Por ejemplo, el camino P1 queda cubierto con `-1`, pero todavía nos interesa probarlo `101`porque es el límite de la otra clase inválida.

Información

**Si descompone una condición compuesta, redibuja y recuenta.**

También es posible representar a cada operando de `||`cómo una decisión propia. En ese caso cambian nodos, ramas y complejidad. Lo que no se puede hacer es dibujar de una manera y contar como si hubiera dibujado otra.

Un **camino independiente** es un recorrido que incorpora al menos una rama que todavía no había aparecido en los caminos seleccionados. El objetivo no es memorizar una secuencia concreta de números: es poder demostrar que el juego de pruebas hace pasar el programa por todas las alternativas relevantes.

#### 3.1. Probar es buscar evidencias

Ejecutar un programa una vez y ver que "parece funcionar" no es una prueba suficiente. Una prueba bien diseñada parte de una pregunta concreta: **¿qué comportamiento quiero comprobar y qué datos me permiten demostrarlo?**

Imagine un método que clasifica una puntuación de 0 a 100. Si sólo lo probamos con `72`y devuelve «Notable», todavía no sabemos qué pasa con 0, 49, 50, 89, 90, 100 o con un valor imposible como 130. El reto no es ejecutar muchas veces, sino **elegir bien los casos** .

![Ciclo de pruebas: planificar, diseñar, ejecutar, comparar resultados, corregir y repetir](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/01_cicle_proves.png)

Las pruebas forman un ciclo: planificamos qué comprobaremos, diseñamos casos, los ejecutamos, comparamos el resultado con lo esperado y, si hay un fallo, corregimos y volvemos a probar.

|Concepto|Pregunta que responde|
|---|---|
|Verificación|¿Hemos construido correctamente el producto según el diseño y las especificaciones técnicas?|
|Validación|¿El producto final cumple lo que necesitaba el usuario o cliente?|
|Caso de prueba|¿Con qué entrada, en qué condiciones y con qué resultado esperado comprobaremos una funcionalidad?|
|Depuración|Si una prueba falla, ¿dónde y por qué se produce el comportamiento incorrecto?|

**Idea clave**: Una prueba no demuestra que el programa no tenga ningún error. Lo que hace es aportar evidencia sobre comportamientos concretos. Cuanto mejor escogidos están los casos, mayores probabilidades tenemos de detectar errores importantes con un número razonable de pruebas.

**Ejercicio: ¿Probar o simplemente ejecutar?**

Un método calcula el precio de una entrada: menores de 12 años pagan 5€, de 12 a 64 pagan 10€ ya partir de 65 pagan 6€. Proponga cuatro valores de entrada que den información realmente diferente.

Ver pistas

- Busque cambios de comportamiento.
- Los valores cercanos a los límites suelen ser especialmente útiles.

#### 3.2. Mapa de los tipos de pruebas

No todas las pruebas buscan lo mismo. Algunas miran una función aislada; otros comprueban si varios componentes encajan, si el sistema resiste carga o si el cliente acepta el producto. El siguiente resumen concentra lo que necesita para orientarse.

![Mapa progresivo de pruebas unitarias, integración, sistema, carga, aceptación y regresión](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/02_tipus_proves.png)

Las pruebas pasan de piezas pequeñas a comportamientos completos; las pruebas de regresión reaparecen cada vez que hacemos un cambio.

|Tipo|¿Qué comprueba?|Momento o idea principal|
|---|---|---|
|Unitarias|Clases, funciones, algoritmos y datos aislados.|Durante el desarrollo; normalmente las realiza el programador.|
|Funcionales|Que una funcionalidad implementa el requisito esperado.|Se mira el comportamiento observable, habitualmente con enfoque de caja negra.|
|Integración|Relaciones e interfaces entre componentes.|Después de tener prendas probadas individualmente.|
|De sistemas|Consecución de los requerimientos del sistema desarrollado.|Comprueban el sistema como un conjunto durante el desarrollo.|
|De carga|Rendimiento e integridad con volumen o condiciones similares a las reales.|Cuando el sistema ya está suficientemente completo para someterlo a carga.|
|De aceptación|Que el producto completo sea aceptable para el cliente o usuario.|Alfa: en torno al desarrollador. Beta: en torno al cliente.|
|De sistema|Integración del sistema final en el entorno del usuario.|Puede incluir rendimiento, resistencia, robustez, seguridad, usabilidad e instalación.|
|De regresión|Que un cambio no ha roto comportamientos que antes funcionaban.|Se repiten pruebas que ya habían pasado.|
|De humo|Que las funciones esenciales siguen vivas.|Conjunto rápido antes de dedicar tiempo a pruebas más hondas.|

##### Caja negra y caja blanca no son niveles

Son **enfoques** . En una prueba de **caja negra** decidimos las entradas a partir de la especificación y observamos las salidas sin necesitar conocer el código interno. En una prueba de **caja blanca** sí que miramos la implementación e intentamos recorrer las decisiones y los caminos internos.


**No confundir "prueba de sistema" con "prueba de sistemas"**: Los materiales del módulo utilizan ambas expresiones con distintos sentidos. Para el EAC, siga la clasificación aquí trabajada: «de sistemas» comprueba la consecución de los requerimientos durante el desarrollo; "de sistema" comprueba la integración final en el entorno del usuario y puede incluir rendimiento, robustez, seguridad o instalación.

**Ejercicio: ¿Qué tipo buscaría?**: Asociar cada situación a un tipo de prueba: comprobar un método calculaIVA(); verificar que API y base de datos se comunican; repetir pruebas después de cambiar el cálculo; comprobar el sistema con 10.000 peticiones; dejar que el cliente lo pruebe en su entorno.

Ver pistas

- Piense en el tamaño de la pieza que se prueba.
- La regresión aparece después de un cambio.
- Beta significa en torno al cliente.

#### 3.3. ¿Qué debe contener un caso de prueba

Un caso de prueba útil debe poder ejecutarlo otra persona y llegar a la misma conclusión. "Probar con 50" es demasiado poco. Hay que dejar claro **qué probamos, con qué entrada y qué esperamos obtener** .

|Campo|Ejemplo|
|---|---|
|Identificador|`CP-04`|
|Método o funcionalidad|`ClassificadorPunts.etiqueta(int)`|
|Objetivo|Comprobar el cambio de Insuficiente a Bien.|
|Precondiciones|Aplicación iniciada; no es necesario ningún dato previo.|
|Entrada|`50`|
|Resultado esperado|`"Bé"`|
|Resultado obtenido|Se rellena después de ejecutar.|
|Estado|Correcto/fallido/ pendiente.|
|Observaciones|Captura, error, versión o incidencia relacionada.|

Información

**Esperado antes de ejecutar**

El resultado esperado debe decidirse a partir de la especificación, no después de ver qué devuelve el programa. Si primero ejecuta y luego decide que «esto sería lo correcto», la prueba deja de ser una comprobación independiente.

En proyectos reales el formato puede ser más completo, pero esta estructura ya obliga a pensar en las tres piezas esenciales: **entrada, acción y resultado esperado** .

#### 3.4. Clases de equivalencia0

Si un método trata miles de valores por igual, no tiene sentido probarlos todos. La técnica de **clases de equivalencia** agrupa entradas que, según especificación y código que analizamos, deberían recibir el mismo tratamiento. Después elegimos representantes de cada clase.

```java
public static String etiqueta(int punts) {
    if (punts < 0 || punts > 100) {
        throw new IllegalArgumentException("Puntuació fora de rang");
    }

    if (punts <= 49) return "Insuficient";
    if (punts <= 69) return "Bé";
    if (punts <= 89) return "Notable";
    return "Excel·lent";
}
```

Primero identificamos las **condiciones de entrada y salida** . La entrada válida va de 0 a 100. Fuera de este intervalo debe producirse una excepción. Dentro del intervalo existen cuatro tratamientos diferentes.

| Clase | Rango         | Tipo     | Tratamiento   |
| ----- | ------------- | -------- | ------------- |
| C1    | `punts < 0`   | Inválida | Excepción.    |
| C2    | `0..49`       | Válida   | Insuficiente. |
| C3    | `50..69`      | Válida   | Bien.         |
| C4    | `70..89`      | Válida   | "Notable".    |
| C5    | `90..100`     | Válida   | «Excelente».  |
| C6    | `punts > 100` | Inválida | Excepción.    |

![Recta numérica dividida en seis clases de equivalencia con los límites -1, 0, 49, 50, 69, 70, 89, 90, 100 y 101](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/03_equivalencia_limits.png)

Los puntos en los que cambia el tratamiento separan clases de equivalencia. Sus alrededores son candidatos naturales a valores límite.

**Regla práctica**_ Si dos valores provocan exactamente el mismo recorrido y el mismo tipo de resultado, probablemente pueden pertenecer a la misma clase. Si en algún punto cambia la respuesta, aparece una nueva clase.

#### 3.5. Valores límite y casos representativos0

Los errores aparecen a menudo en las fronteras: usar `<`en lugar de `<=`, empezar un intervalo un valor demasiado tarde o aceptar un valor que ya debería ser inválido. Por eso, después de definir las clases, buscamos **primer valor, último valor y un valor intermedio** cuando tenga sentido.

|Clase|Valores especialmente útiles|¿Por qué?|
|---|---|---|
|C1: < 0|`-1`y, por ejemplo,`-50`|`-1`toca el límite; el otro representa el interior de un intervalo sin límite inferior.|
|C2: 0..49|`0`, `25`,`49`|Primero, intermedio y último.|
|C3: 50..69|`50`, `60`,`69`|Comprueban los dos cambios de frontera.|
|C4: 70..89|`70`, `80`,`89`|Misma idea.|
|C5: 90..100|`90`, `95`,`100`|Incluye el máximo válido.|
|C6: > 100|`101`y, por ejemplo,`150`|`101`es el primer valor inválido superior.|

No siempre necesitará ejecutar todos estos valores. El diseño de pruebas busca un conjunto **pequeño pero justificado** que represente a todas las clases, cubra los límites importantes y, si hacemos caja blanca, recorra todos los caminos independientes que nos interesan.

**Ejercicio: De rangos a casos**

Un sensor acepta humedad de 0 a 100. De 0 a 29 devuelve «seca», de 30 a 69 «correcta» y de 70 a 100 «alta»; fuera de rango genera una excepción. Defina clases de equivalencia y proponga valores límite e intermedios.

Ver pistas

- Comience por las condiciones de entrada y salida.
- Existen dos rangos inválidos y tres tratamientos válidos.

#### 3.6. Caja blanca, flujo de control y McCabe

Las clases de equivalencia nos ayudan a escoger datos según su comportamiento. Con **caja blanca** damos un paso más: miramos la estructura interna y comprobamos si los casos seleccionados recorren las decisiones del código.

![Grafo de flujo simplificado del clasificador de puntos con nodos numerados, decisiones y salidas](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/04_flux_complexitat.png)

Un diagrama de flujo transforma los `if`del código en decisiones visibles y permite razonar sobre caminos independientes.
##### Complejidad ciclomática

Utilizaremos la fórmula de McCabe:

```text
CC = nombre de branques - nombre de nodes + 2
```

En un grafo conectado, la complejidad ciclomática indica cuántos **caminos independientes** forman el conjunto básico. En código estructurado sencillo también podemos utilizar como comprobación rápida la idea «número de decisiones + 1», siempre que tratemos cada decisión al igual que en el grafo.

##### Ejemplo completo con nuestro grafo

En la figura hemos simplificado la primera condición compuesta ( `punts < 0 || punts > 100`) como **un único nodo de decisión** y hemos añadido un nodo final común. Con esta representación tenemos **11 nodos** y **14 ramas** :

```text
CC = 14 - 11 + 2 = 5
```

Por tanto, el conjunto básico necesita cinco caminos independientes. Podemos pensarlos como cinco resultados estructurales: error, Insuficiente, Bien, Notable y Excelente. Ambas clases inválidas ( `< 0`i `> 100`) son importantes para los valores límite, aunque en este grafo simplificado comparten el mismo camino después de evaluar la condición compuesta.

**Un conjunto básico posible es:**

| Camino | Secuencia de nodos | Un caso que lo cubre                              |
| ------ | ------------------ | ------------------------------------------------- |
| P1     | `1-2-6-11`         | `-1`(también `101`sigue este camino simplificado) |
| P2     | `1-2-3-7-11`       | `0`                                               |
| P3     | `1-2-3-4-8-11`     | `50`                                              |
| P4     | `1-2-3-4-5-9-11`   | `70`                                              |
| P5     | `1-2-3-4-5-10-11`  | `90`                                              |

Esto muestra una idea importante: **clases de equivalencia, valores límite y caminos independientes no son tres ejercicios separados** . El conjunto final de casos debe revisarse con las tres miradas. Por ejemplo, el camino P1 queda cubierto con `-1`, pero todavía nos interesa probarlo `101`porque es el límite de la otra clase inválida.

**Si descompone una condición compuesta, redibuja y recuenta.**

También es posible representar a cada operando de `||`cómo una decisión propia. En ese caso cambian nodos, ramas y complejidad. Lo que no se puede hacer es dibujar de una manera y contar como si hubiera dibujado otra.

Un **camino independiente** es un recorrido que incorpora al menos una rama que todavía no había aparecido en los caminos seleccionados. El objetivo no es memorizar una secuencia concreta de números: es poder demostrar que el juego de pruebas hace pasar el programa por todas las alternativas relevantes.

##### El procedimiento que debe saber repetir

1. Lea la especificación e identifique entradas y salidas.
2. Defina las clases de equivalencia.
3. Elija representantes, valores límite e intermedios.
4. Dibuje el flujo de control del método.
5. Cuenta nodos y ramas y calcule la complejidad ciclomática.
6. Escriba un conjunto de caminos independientes.
7. Marque qué caso de prueba cubre cada camino.
8. Si queda un camino sin cubrir, añada un caso.

**Importante**

**No force la fórmula sobre un dibujo ambiguo.**
▪ Primero decida cómo representa cada decisión y dibuja todas las ramas. Luego cuente. Si cambia la forma de representar una condición compuesta a medio cálculo, nodos, ramas y resultado dejarán de ser coherentes.
▪ Sé diferenciar caja negra y caja blanca 
▪ Puedo contar unitarias, integración, aceptación, regresión y humo con un ejemplo
▪ Puedo identificar las clases de equivalencia de un rango
▪ Sé buscar valores justo antes y justo después de un límite
▪ Puedo dibujar el flujo de control de una cadena de if
▪ Sé aplicar CC = ramas - nodos + 2
▪ Puedo justificar que caso de prueba cubre cada comportamiento

**Ejercicio: Mini simulación de diseño**: Diseñe las pruebas de un método que recibe el porcentaje de ocupación de un aparcamiento (0..100) y devuelve «libre» hasta 49, «alto» hasta 89 y «completo» de 90 a 100; fuera de rango genera excepción. Incluya clases, límites, diagrama, complejidad y cobertura de caminos.

**Ver pistas:**
- No programe JUnit todavía: primero diseñe.
- Ambos intervalos inválidos también cuentan.
- Un buen diseño explica por qué cada dato está en el conjunto.

### Bloque 2: JUnit5 y depuración con Eclipse


####2.1. Del caso de prueba al test automático
####2.2. Crear una clase JUnit5 en Eclipse
####2.3. Assertions: comprobar resultados y excepciones
####2.4. Una batería de pruebas legible
####2.5. Depurar: detener, observar y avanzar
####2.6. Del fallo a una incidencia reproducible

#### 2.1. Del caso de prueba al test automático0

En el blog anterior hemos decidido **qué** probar. Ahora haremos que el ordenador repita estas comprobaciones por nosotros. Una prueba automática ejecuta el código, compara el resultado con lo que esperábamos y nos avisa si el comportamiento ha cambiado.

Recuperamos un ejemplo similar al que ya conocemos:
```java
package proves;

public class ClassificadorPunts {

    public static String etiqueta(int punts) {
        if (punts < 0 || punts > 100) {
            throw new IllegalArgumentException("Puntuació fora de rang");
        }

        if (punts <= 49) return "Insuficient";
        if (punts <= 69) return "Bé";
        if (punts <= 89) return "Notable";
        return "Excel·lent";
    }
}
```

Un caso de **prueba manua**l podría decir: «entrada 50 → resultado esperado Bien». Con JUnit 5 lo podemos expresar directamente:

```java
@Test
void cinquantaEsBe() {
    assertEquals("Bé", ClassificadorPunts.etiqueta(50));
}
```

![Flujo desde un caso de prueba hasta un método JUnit, una aserción y un resultado verde o rojo](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/05_junit_flux.png)

JUnit automatiza la comparación entre el resultado esperado y el resultado real; el diseño del caso sigue siendo nuestra responsabilidad.

**Automatizar no sustituye a diseñar.**

Si los casos son malos, JUnit los ejecutará muy rápido... pero seguirán siendo malos. Primero se deciden clases, límites y comportamientos; después se convierten en métodos `@Test`.
#### 2.2 Crear una clase JUnit 5 en Eclipse

JUnit 5 está integrado habitualmente en los entornos Java modernos. En Eclipse puede crear una clase de prueba desde **File → New → JUnit Test Case** . Si esta opción no aparece directamente, utilice **File → New → Other... → Java → JUnit → JUnit Test Case** .

Para los ejercicios de esta unidad nos interesa un esquema muy simple:

1. Cree el proyecto Java y la clase que desea probar.
2. Cree una clase JUnit 5 en el **mismo paquete** .
3. Póngale un nombre que deje claro qué prueba, por ejemplo `TestClassificadorPunts`.
4. Añada un método precedido `@Test`para cada caso que desee identificar por separado.
5. Ejecute la clase con **Run As → JUnit Test** .

```java
package proves;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class TestClassificadorPunts {

    @Test
    void zeroEsInsuficient() {
        assertEquals("Insuficient", ClassificadorPunts.etiqueta(0));
    }

    @Test
    void norantaEsExcellent() {
        assertEquals("Excel·lent", ClassificadorPunts.etiqueta(90));
    }
}
```

Cuando lo ejecute, la vista de JUnit muestra cuántos tests se han ejecutado y cuáles han pasado o fallado. Un resultado verde no significa que el programa sea perfecto; significa que **todos los casos que hemos definido han producido el resultado esperado** .

**Ejercicio: Primer test**

Cree ClasificadorPuntos y TestClassificadorPuntos. Añada pruebas para los valores 49 y 50 y compruebe que ambas pasan.

Ver pistas

- Cada valor está a un lado distinto del límite.
- Utilice assertEquals con el texto esperado.

#### 2.3. Assertions: comprobar resultados y excepciones

Una **aserción** expresa una condición que tiene que cumplirse para que la prueba sea correcta. JUnit 5 ofrece muchas aserciones; para esta unidad necesitamos pocas pero bien entendidas.

|Aserción|¿Cuándo es útil?|Ejemplo|
|---|---|---|
|`assertEquals(esperat, real)`|Cuando sabemos qué valor debe devolver.|`assertEquals("Bé", etiqueta(50))`|
|`assertTrue(condicio)`|Cuando lo que deseamos verificar es una condición booleana.|`assertTrue(total > 0)`|
|`assertFalse(condicio)`|Cuando una condición debe ser falsa.|`assertFalse(llista.isEmpty())`|
|`assertThrows(Tipus.class, ...)`|Cuando el éxito consiste precisamente en lanzar la excepción prevista.|Entrada fuera del rango permitido.|

##### Una excepción también puede ser el resultado correcto

Si la especificación dice que una entrada inválida debe producir una excepción, la prueba no debe "pasar por alto" el error. Debe comprobar que se produce exactamente la excepción esperada.

```java
@Test
void menysUnEsInvalid() {
    assertThrows(IllegalArgumentException.class,
        () -> ClassificadorPunts.etiqueta(-1));
}

@Test
void centUEsInvalid() {
    assertThrows(IllegalArgumentException.class,
        () -> ClassificadorPunts.etiqueta(101));
}
```

La parte `() -> ...`es una expresión lambda que permite a JUnit ejecutar el código y observar si arroja la excepción. No hace falta dominar las lambdas para utilizar este patrón: léalo como «ejecuta esta llamada y comprueba que acaba con esta excepción».
##### También podemos comprobar el mensaje

```java
@Test
void elMissatgeExplicaElProblema() {
    IllegalArgumentException error =
        assertThrows(IllegalArgumentException.class,
            () -> ClassificadorPunts.etiqueta(120));

    assertEquals("Puntuació fora de rang", error.getMessage());
}
```

**No haga un test que sólo ejecute el método.**

Si no hay ninguna aserción, el test puede pasar sin haber comprobado el resultado funcional. Cada método de prueba debe dejar claro lo que espera.

#### 2.4. Una batería de pruebas legible0

Cuando existen varios casos, el nombre de los tests se convierte en documentación. Compare `test1()`con `cinquantaIniciaLaClasseBe()`: cuando falla el segundo, ya sabemos qué comportamiento se ha roto.

```java
class TestClassificadorPunts {

    @Test
    void menysUnEsInvalid() {
        assertThrows(IllegalArgumentException.class,
            () -> ClassificadorPunts.etiqueta(-1));
    }

    @Test
    void zeroEsInsuficient() {
        assertEquals("Insuficient", ClassificadorPunts.etiqueta(0));
    }

    @Test
    void quarantaNouEncaraEsInsuficient() {
        assertEquals("Insuficient", ClassificadorPunts.etiqueta(49));
    }

    @Test
    void cinquantaIniciaLaClasseBe() {
        assertEquals("Bé", ClassificadorPunts.etiqueta(50));
    }

    @Test
    void norantaIniciaExcellent() {
        assertEquals("Excel·lent", ClassificadorPunts.etiqueta(90));
    }

    @Test
    void centEsValid() {
        assertEquals("Excel·lent", ClassificadorPunts.etiqueta(100));
    }

    @Test
    void centUEsInvalid() {
        assertThrows(IllegalArgumentException.class,
            () -> ClassificadorPunts.etiqueta(101));
    }
}
```

Esta batería no pretende sustituir el diseño completo del blog anterior. Sirve para ver cómo los valores justificados pasan del papel al código. En un ejercicio de diseño, antes de escribir JUnit debería poder indicar **qué clase de equivalencia y qué camino cubre cada caso** .

**Regresión casi gratis**

Cuando estos tests existen, después de una refacción podemos ejecutarlos de nuevo en segundos. Si un cambio interno altera el comportamiento, una maceta que antes era verde se volverá roja. Ésta es la red de seguridad que utilizaremos en el blog siguiente.

#### 2.5. Depurar: detener, observar y avanzar

Cuando un test falla, imprimir variables con `System.out.println`puede ayudar, pero el IDE nos ofrece una herramienta mucho más precisa: el **depurador** . El depurador ejecuta el programa de forma controlada y permite detenernos en una línea para observar qué está pasando.

![Flujo de depuración con breakpoint, ejecución paso a paso, inspección de variables, hipótesis y corrección](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/06_debugger_passos.png)

Depurar es observar una ejecución real, no adivinar. Detenemos el programa, inspeccionamos el estado y avanzamos una instrucción cada vez.

| Acción      | ¿Para qué sirve?                                                                     |
| ----------- | ------------------------------------------------------------------------------------ |
| Breakpoint  | Detiene la ejecución cuando llega a una línea concreta.                              |
| Step Into   | Entra dentro del método que se está llamando.                                        |
| Step Over   | Ejecuta la línea actual sin entrar dentro de los métodos llamados.                   |
| Step Return | Continúa hasta que termina el método actual y vuelve al método que le había llamado. |
| Resumen     | Continúa la ejecución hasta el siguiente breakpoint o hasta el final.                |
| Variables   | Muestra los valores que tienen las variables en ese instante.                        |
##### Ejemplo: una frontera mal programada

Suponga que por error hemos escrito `if (punts < 49)`en lugar de `<= 49`. El test con 49 fallará. Ponga un breakpoint en la primera condición, ejecute **Debug As → JUnit Test** y observe:

1. `punts`vale 49.
2. La condición `punts < 49`es falsa.
3. El flujo continúa hasta el siguiente `if`.
4. El método devuelve "Bueno" cuando la prueba esperaba "Insuficiente".

Ahora ya no tenemos una sospecha: tenemos una **causa observada** .

Información

**Modificar un valor en tiempo de ejecución**

La vista de variables de Eclipse también puede permitir cambiar temporalmente el valor de una variable mientras el programa está detenido. Es útil para explorar hipótesis, pero no sustituye a modificar el código y volver a ejecutar las pruebas: el cambio sólo afecta a aquella sesión de depuración.

**Ejercicio: Encuentra el límite roto**

Cambie temporalmente puntos <= 69 por puntos < 69. Ejecute los tests, identifique qué falla y utilice el depurador para explicar el recorrido exacto del valor 69.

Ver pistas

- Ponga el breakpoint antes de la condición afectada.
- Vea el valor de puntos y avance con Step Over.

#### 2.6. Del fallo a una incidencia reproducible0

Detectar un error es sólo la mitad del trabajo. Si queremos corregirlo o comunicarlo a otra persona, debemos poder **reproducirlo** . Una buena incidencia evita frases como "a veces no funciona" y conserva los datos necesarios para repetir exactamente el fallo.

|Campo|Ejemplo útil|
|---|---|
|Identificador|`INC-014`|
|Versión / commit|Commit donde se ha observado el error.|
|Entorno|JDK, sistema operativo o configuración relevante.|
|Pasos|1. Ejecutar test X. 2. Introducir 49. 3. Observar resultado.|
|Esperado|Insuficiente.|
|Obtenido|Bien.|
|Evidencia|Nombre del test fallido, captura o rastreo.|
|Estado|Abierta, en curso, resuelta, verificada.|

Cuando corrijamos la incidencia, no eliminamos el test que la ha detectado. Lo mantenemos. Así se convierte en una **prueba de regresión** : si el mismo error reaparece en el futuro, la batería volverá a avisar.

##### El circuito completo
1. Un caso de prueba define qué debería ocurrir.
2. JUnit lo ejecuta automáticamente.
3. Si falla, el depurador permite observar el recorrido real.
4. Documentamos la incidencia con pasos reproducibles.
5. Corregimos el código.
6. Ejecutamos toda la batería, no sólo el test que fallaba.

**Checkbox:** 
❐ Sé convertir entrada y resultado esperado en un método @Test
❐ Sé cuándo utilizar assertEquals y assertThrows
❐ Puedo ejecutar una clase como JUnit Test
❐ Puedo interpretar qué test ha fallado
❐ Sé poner un breakpoint y avanzar con Step Into o Step Over
❐ Puedo inspeccionar variables durante la ejecución
❐ Sé describir una incidencia de forma reproducible

**Ejercicio: Simulación JUnit**
1. Implemente el método del aparcamiento del bloque anterior y convierta al menos seis casos de prueba justificados en tests JUnit 5.  
2. Introduzca después un error en uno de los límites, detectelo con la batería y explique con el depurador por qué falla.

Ver pistas
- Haga primero la versión correcta y deje todos los test verdes.
- Cambie sólo un operador.
- No corrija hasta que pueda describir el recorrido erróneo.

### Bloque 3: Refactorización, calidad y documentación

- Entenderá qué es una refacción y por qué debe conservar el comportamiento externo.
- Aplicará patrones como renombrar, extraer variable, constante y método, y sabrá cuándo tiene sentido extraer una interfaz.
- Protegerá cada refacción con pruebas antes y después del cambio.
- Utilizará avisos del IDE y herramientas de análisis estático para detectar problemas de calidad.
- Revisará críticamente sugerencias de un asistente de IA y documentará clases y métodos con Javadoc.

#### 3.1. Refaccionar no es añadir funcionalidades

Un programa puede dar el resultado correcto y, al mismo tiempo, tener un código difícil de leer, modificar o probar. La **refacción** consiste en mejorar la estructura interna del código **sin cambiar su comportamiento externo** .

Imagine un método de 80 líneas con cálculos repetidos, números sin nombre y variables como `x`, `y`y `z`. Podemos dividirlo, renombrar elementos y eliminar duplicaciones. Si antes una entrada de 100 producía 121, después de la refacción debe continuar produciendo 121.

|Cambio|¿Es refacción?|¿Por qué?|
|---|---|---|
|Cambiar `x`por `preuBase`.|Sí.|Mejora el código sin alterar el resultado.|
|Extraer un cálculo repetido en un método.|Sí.|Cambia la estructura, no la funcionalidad.|
|Añadir un nuevo descuento para estudiantes.|No.|Cambia el comportamiento observable.|
|Corregir un cálculo que devolvía un valor erróneo.|No estrictamente.|Es una corrección funcional; después podemos refaccionar.|

**La frase que lo resume**: Refaccionar es cambiar _cómo está escrito_ el programa manteniendo _qué hace_ el programa.

Para saber si realmente hemos mantenido el comportamiento necesitamos una red de seguridad: **pruebas que pasen antes del cambio y vuelvan a suceder después** .
#### 3.2. Patrones de refacción más útiles

Los materiales del módulo recogen distintos patrones habituales. No es necesario memorizarlos como una lista desconectada: cada patrón responde a un problema que podemos reconocer en el código.

|Patrón|Síntoma|Transformación|
|---|---|---|
|Renombrar|El nombre no explica lo que representa.|`x`→ `preuBase`.|
|Mover|Un método o clase está en el sitio equivocado.|Trasladarlo a la clase o paquete que asume su responsabilidad.|
|Extraer variable local|Una expresión larga o repetida cuesta leer.|Guardar su resultado con un nombre significativo.|
|Extraer constante|Existe un «número mágico» repetido.|`0.21`→ `IVA`.|
|Convertir variable local en campo|Un dato debe formar parte del estado del objeto.|La variable pasa a ser atributo.|
|Extraer método|Un fragmento realiza una tarea concreta o se repite.|Crear un método cuyo nombre describa la tarea.|
|Extraer interfaz|Varias clases deben poder usarse a través del mismo contrato.|Crear una interfaz común y hacer que las clases la implementen.|
**No confunda «extraer método» con copiar y pegar.**

La idea es sustituir un fragmento por una llamada a un único método reutilizable. Si duplica el código en otro sitio, ha empeorado el problema.

**Ejercicio: ¿Qué patrón aplicarías?**

Asocie cada situación con una refacción: aparece 0.21 en cuatro líneas; una expresión de cinco operaciones se repite; una variable se llama p; un bloque de 15 líneas calcula siempre el mismo concepto.

Ver pistas
- Números repetidos → constante.
- Un nombre pobre → renombrar.
- Una tarea completa → método.

#### 3.3. Un ejemplo de refacción paso a paso

Partiremos de un método que calcula el total de una compra. Funciona, pero mezcla decisiones, repite expresiones y utiliza valores sin nombre.

```java
public static double calcularTotal(double preu, int unitats) {
    double subtotal = preu * unitats;

    if (unitats >= 10) {
        subtotal = subtotal - subtotal * 0.10;
    }

    double total = subtotal + subtotal * 0.21;
    System.out.println("Total amb IVA: " + (subtotal + subtotal * 0.21));
    return total;
}
```

El comportamiento es sencillo: si hay 10 o más unidades, aplica un 10% de descuento y después un 21% de IVA. Haremos cambios pequeños.
##### Paso 1. Extraer constantes

```java
private static final int MINIM_DESCOMPTE = 10;
private static final double DESCOMPTE_VOLUM = 0.10;
private static final double IVA = 0.21;
```

Ahora el código explica qué significa cada número y un cambio futuro se haría en un único sitio.

##### Paso 2. Extraer un método

```java
private static double aplicarDescompteVolum(double subtotal, int unitats) {
    if (unitats >= MINIM_DESCOMPTE) {
        return subtotal * (1 - DESCOMPTE_VOLUM);
    }
    return subtotal;
}

private static double aplicarIva(double importNet) {
    return importNet * (1 + IVA);
}
```
##### Paso 3. El método principal explica la historia

```java
public static double calcularTotal(double preuUnitari, int unitats) {
    double subtotal = preuUnitari * unitats;
    double importAmbDescompte = aplicarDescompteVolum(subtotal, unitats);
    double total = aplicarIva(importAmbDescompte);

    System.out.println("Total amb IVA: " + total);
    return total;
}
```

![Comparación entre código con números mágicos y duplicación y código refaccionado con constantes, nombres claros y métodos pequeños](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/07_refaccio_abans_despres.png)
La refacción no cambia el cálculo que ve el usuario; cambia la forma en la que el código expresa este cálculo.

Observa que también hemos renombrado `preu`a `preuUnitari`y hemos creado la variable `importAmbDescompte`. Son cambios pequeños, pero juntos hacen que el método pueda leerse casi como una frase.

**Una buena refacción reduce la carga mental.**

Cuando lea `aplicarIva(importAmbDescompte)`no necesita reconstruir mentalmente una fórmula. El nombre explica la intención y el detalle queda encapsulado en el método correspondiente.
#### 3.4. La red de seguridad: probar antes y después

La regla más importante de la refacción es que el comportamiento debe conservarse. Por eso el flujo recomendado es muy repetitivo:

![Ciclo seguro de refacción: pruebas verdes, cambio pequeño, pruebas de nuevo, conservar o deshacer](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/08_refaccio_cicle.png)

Una refacción segura avanza en pequeños pasos. Si las pruebas pasan antes y fallan después, sabemos que cambio ha introducido la regresión.

1. Ejecute las pruebas y déjelas **verdes** .
2. Haga **una** refacción pequeña.
3. Compile y ejecute de nuevo toda la batería relevante.
4. Si sigue verde, conserva el cambio.
5. Si falla, investigue o deshaga ese paso antes de acumular más.

##### Tests mínimos para nuestro ejemplo

```java
@Test
void vuitUnitatsNoTenenDescompte() {
    assertEquals(96.80, CalculCompra.calcularTotal(10, 8), 0.001);
}

@Test
void deuUnitatsActivenDescompte() {
    assertEquals(108.90, CalculCompra.calcularTotal(10, 10), 0.001);
}
```

En números decimales es habitual utilizar una tolerancia, aquí `0.001`, porque los números de coma flotante no siempre se representan de forma exacta.

**¿Por qué probarlo también después?**

Porque una refacción aparentemente inocente puede introducir un error: cambiar el orden de las operaciones, perder una condición, usar una variable equivocada o modificar sin querer una referencia. Las pruebas convierten a «creo que no he roto nada» en una comprobación repetible.

#### 3.5. Analizar el código antes de que falle

Las pruebas dinámicas ejecutan el programa con datos. El **análisis estático** , en cambio, examina el código sin necesidad de ejecutarlo y busca patrones que pueden indicar errores, código muerto, duplicación, vulnerabilidades o problemas de mantenibilidad.

Eclipse ya muestra avisos del compilador y permite configurar su severidad. Además, pueden integrarse analizadores especializados.

|Herramienta o fuente|¿Qué puede detectar?|¿Cómo interpretarla?|
|---|---|---|
|Compilador / Eclipse|Tipos incompatibles, variables no usadas, código inalcanzable y muchos avisos configurables.|Es la primera capa; no ignore automáticamente los warnings.|
|PMD|Código duplicado o problemático, complejidad, malas prácticas y reglas de calidad.|Las reglas se pueden activar, desactivar o ajustar al proyecto.|
|SpotBugs|Patrones de bugs probables en bytecode Java.|Es el sucesor moderno de FindBugs, herramienta que aparece en los materiales antiguos.|

Un analizador no es un oráculo. Puede dar **falsos positivos** o avisos que no tienen igual importancia en todos los proyectos. Por eso el RA4 no pide sólo ejecutar una herramienta: también es necesario entender las posibilidades de **configuración** .

##### Un ejemplo de aviso que sí nos ayuda

```java
public double calcula(double preu) {
    double resultat = preu * 1.21;
    double temporal = preu * 2;  // es calcula però mai s'utilitza
    return resultat;
}
```

La variable `temporal`es código inútil. El compilador o el IDE puede avisarnos antes de que nadie deba encontrar el problema ejecutando pruebas.

**"No hay warnings" no significa "el programa es correcto".**

El análisis estático y las pruebas encuentran diferentes tipos de problemas. Son complementarias: una inspecciona patrones del código; la otra comprueba comportamientos ejecutándolo.

#### 3.6. Asistentes de IA: propuesta, criterio y verificación

Un asistente de IA puede proponer una refacción, pero la responsabilidad de decidir si es correcta sigue siendo del programador. En esta unidad no nos interesa "pedirle que lo haga todo", sino aprender a **describir el problema, revisar la propuesta y demostrar que conserva el comportamiento** .

### Un prompt útil tiene un criterio verificable

```text
Analitza aquest mètode Java i proposa refaccions que millorin
la llegibilitat i redueixin duplicació sense canviar el resultat.

Prioritza:
- extreure constants per als números màgics;
- extreure mètodes només quan representin una tasca clara;
- noms més descriptius.

Explica cada canvi per separat. No afegeixis funcionalitats noves.
```

Después de recibir una propuesta, no la acepte en blog. Clasifique cada sugerencia:

| Pregunta                     | ¿Qué debe poder responder?                                          |
| ---------------------------- | ------------------------------------------------------------------- |
| ¿Qué problema resuelve?      | Duplicación, número mágico, nombre pobre, método demasiado largo... |
| ¿Cambia el comportamiento?   | Si sí, ya no es sólo una refacción.                                 |
| ¿Es más simple?              | Una nueva abstracción no es mejor si sólo complica un caso trivial. |
| ¿Puedo explicarlo?           | Debe entender el código que acepta.                                 |
| ¿Las pruebas siguen pasando? | Es la comprobación final del comportamiento.                        |
##### Aceptar o descartar también es parte del ejercicio

Suponga que la IA propone convertir un cálculo de cuatro líneas en una jerarquía de seis clases con un patrón de diseño. Puede ser técnicamente posible, pero para un programa pequeño puede ser **más complejo que el problema original** . Un análisis crítico explica por qué aceptamos unas mejoras y descartamos otras

**Ejercicio: Revisor, no copista**

De a un asistente el código inicial de CalculCompra y pida tres posibles refacciones. Para cada una, escriba: problema que resuelve, cambio propuesto, si lo acepta y cómo comprobará que no altera el resultado.

**Ver pistas**

- No valore una propuesta por la longitud de la respuesta.
- Ejecute los test después de cada cambio aceptado.
#### 3.7. Javadoc: del comentario a la documentación HTML0

Los comentarios internos explican decisiones locales del código. **Javadoc** tiene un objetivo diferente: describir la API de clases y métodos de forma estructurada y generar documentación HTML automáticamente.

Un comentario Javadoc comienza con `/**`y termina con `*/`. Después de la descripción podemos utilizar etiquetas.

| Etiqueta               | Uso                                                 |
| ---------------------- | --------------------------------------------------- |
| `@author`              | Autor o autores.                                    |
| `@version`             | Versión documentada.                                |
| `@param`               | Describe un parámetro de entrada.                   |
| `@return`              | Describe el valor devuelto.                         |
| `@throws`/`@exception` | Describe una excepción que puede lanzar el método.  |
| `@see`                 | Relaciona la documentación con otra clase o método. |
| `@deprecated`          | Indica que un elemento ha quedado obsoleto.         |
##### Documentamos un método pequeño

```java
/**
 * Calcula el preu total d'una compra.
 *
 * @param preuUnitari preu d'una unitat, en euros
 * @param unitats nombre d'unitats comprades
 * @return import final després del descompte i l'IVA
 * @throws IllegalArgumentException si el preu o les unitats són negatius
 */
public static double calcularTotal(double preuUnitari, int unitats) {
    // ...
}
```

La documentación no debe repetir literalmente la firma. Debe explicar el **contrato** : qué representa cada dato, qué devuelve y en qué situaciones excepcionales puede fallar.
##### Generar la documentación

Con JDK instalado, Eclipse ofrece la opción **Project → Generate Javadoc...** . El asistente puede solicitar la ubicación del ejecutable `javadoc`de JDK, las clases que queremos documentar y la carpeta de salida.

También se puede entender el proceso fuera del IDE con un orden como éste:

```bash
javadoc -d docs src/proves/*.java
```

El resultado es un conjunto de páginas HTML navegables. Esta separación es importante: **el código contiene la fuente de la documentación y Javadoc genera la presentación final** .

**Documentar no es comentar cada línea.**

Un comentario que dice `// incrementem i`delante de `i++`no aporta información. Javadoc es especialmente útil para explicar el contrato público de clases y métodos: qué hacen, qué necesitan, qué devuelven y qué excepciones pueden producir.

❐  Puedo definir refacción sin confundirla con una nueva funcionalidad
❐  Reconozco renombrar, extraer variable, constante y método
❐  Sé por qué es necesario ejecutar pruebas antes y después
❐  Entiendo qué aporta una herramienta de análisis estático
❐  Puedo justificar críticamente si acepto una sugerencia de IA
❐  Sé escribir @param, @return y @throws
❐  Puedo generar documentación Javadoc desde Eclipse

**Ejercicio: Refacció completa**

Cree un método que calcule el coste de un envío con dos números mágicos y una expresión repetida. Escriba primero tests, aplique al menos dos refacciones en pasos separados, vuelva a ejecutar la batería y documente el método final con Javadoc.

**Ver pistas**

- Deje los test verdes antes de tocar la estructura.
- Haga una refacción cada vez.
- La documentación debe explicar el contrato, no narrar cada línea.
### Bloque 4: Git: historial, ramas y conflictos

- Entenderá el recorrido _working tree → staging area → commit_ y las órdenes básicas de Git.
- Creará ramas, identificará `HEAD`y cambiará de una rama a otra sin perder trabajo.
- Distinguirá una fusión _fast-forward_ de una fusión con historial divergente.
- Provocará y resolverá un conflicto conservando los cambios que interesan de ambas ramas.
- Utilizará `.gitignore`, repositorios remotos y la integración de Git que ofrece Eclipse.
#### 4.1. El modelo mdental de Git

Git no es sólo una copia de seguridad. Es un sistema que conserva **versiones identificables del proyecto** y nos permite trabajar en líneas de desarrollo distintas sin tener que duplicar carpetas manualmente.

Para entender las órdenes básicas, imagina tres zonas:

![Modelo de Git con working tree, staging area, commits y las órdenes git add y git commit](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/09_git_model.png)

`git add`prepara una fotografía; `git commit`la incorpora en el historial del repositorio.

|Zona|¿Qué contiene?|Pregunta útil|
|---|---|---|
|Working tree|Los archivos tal y como los está editando ahora.|¿Qué he modificado?|
|Staging area|Los cambios que ha seleccionado para el próximo commit.|¿Qué quiero incluir en la siguiente fotografía?|
|Repositorio local|El historial de commits.|¿Qué versiones he confirmado?|

**Una idea que evita muchas confusiones**

`git add`no «sube» nada a Internet. `git commit`tampoco. Ambas operaciones trabajan con el repositorio **local** . La comunicación con un repositorio remoto llegará después con `push`y `pull`.

#### 4.2. Inicializar, añadir, revisar y confirmar

Crearemos un proyecto mínimo llamado `reserves`. En la terminal, situarse en la carpeta del proyecto antes de ejecutar los comandos.

```bash
mkdir reserves
cd reserves
git init -b main
```

`git init`crea el repositorio local. La opción `-b main`indica el nombre de la rama inicial. Si su instalación ya utiliza `main`por defecto, el resultado conceptual es el mismo.

Suponga que cree este archivo:

```java
public class Reserva {
    private String client;
    private int durada;

    public Reserva(String client, int durada) {
        this.client = client;
        this.durada = durada;
    }

    public int getDurada() {
        return durada;
    }
}
```

Ahora siga el recorrido:
```bash
git status
git add Reserva.java
git status
git commit -m "versió inicial de Reserva"
git status
git log --oneline
```

|Orden|¿Qué nos dice o hace?|
|---|---|
|`git status`|Muestra rama actual, archivos modificados, no seguidos y cambios preparados para confirmar.|
|`git add`|Sucede el estado actual del archivo en la zona de preparación.|
|`git commit -m "..."`|Crea un commit con los cambios preparados.|
|`git log --oneline`|Muestra el historial de commits en formato compacto.|

**No memorice una secuencia a ciegas.**

Ejecute `git status`a menudo. Es el orden que mejor explica en qué punto sois y qué dará el siguiente paso.

**Ejercicio: Lee el estado**

Cree un archivo, ejecute git status, haga git add y vuelva a ejecutar git status. Explique con una frase qué ha cambiado entre las dos salidas.

Ver pistas: 
- El archivo pasa de no preparado a preparado.
- Todavía no hay ningún nuevo commit hasta que haga git commit.
#### 4.3. Ramas y HEAD

Una **rama** es un nombre que apunta a una línea de commits. Nos permite desarrollar una modificación sin mover de inmediato la rama principal.

`HEAD`nos indica dónde estamos trabajando ahora. Habitualmente apunta a la rama actual, y esta rama apunta a su commit más reciente.

```bash
git branch branca_tipus   # crea la branca
git branch                 # mostra les branques; encara som a main
git switch branca_tipus    # ens hi situem
git branch                 # ara l'asterisc apareix a branca_tipus
```

El asterisco que muestra `git branch`identifica la rama actual. Hemos separado expresamente los dos pasos para que quede claro que **crear una rama** y **situarse en ella** son acciones diferentes. Cuando desee realizarlas en una sola orden, puede utilizar `git switch -c branca_tipus`. En materiales antiguos también puede encontrarse `git checkout`; `git switch`es el orden moderno y más específico para cambiar de rama.

A `branca_tipus`cambiamos la duración para que admita fracciones temprano:

```java
private double durada;

public double getDurada() {
    return durada;
}
```

Y confirmamos el cambio:

```bash
git add Reserva.java
git commit -m "canvia durada a double"
git log --oneline --decorate
```

Si ahora hacemos `git switch main`, el archivo vuelve al estado que tenía en el commit de `main`: el atributo vuelve a ser `int`. No se ha perdido el cambio; sigue guardado en la rama `branca_tipus`.

**HEAD no es una rama especial.**

Es la referencia que indica la posición actual. Cuando cambie de rama, HEAD pasa a seguir esa rama. Por eso en mensajes de conflicto verá `HEAD`identificando la versión de al lado donde está situado

#### 4.4. Fusionar: cuando Git sólo avanza el puntero

Volvemos a `main`. Desde que creamos `branca_tipus`, `main`no ha recibido ningún nuevo commit. El historial tiene esta forma conceptual:

```text
A  ← main
   B ← branca_tipus
```

Si desde `main`ejecutamos:

```bash
git switch main
git merge branca_tipus
```

Git no necesita combinar dos historiales divergentes. Simplemente puede mover el puntero de `main`A hasta B. Esto se llama **fast-forward** .

```text
A --- B
      ↑
      main
      branca_tipus
```

No ha desaparecido ningún commit y no se ha inventado ninguna versión intermedia: **main se ha puesto al día hasta el commit que ya existía** .

**¿Cuándo puede hacerse un fast-forward?**

Cuando la rama de destino no ha avanzado por otro camino desde el punto en el que se creó la rama que fusionamos. En otras palabras, el commit que tenía la rama de destino es antepasado directo del otro



####4.5. Conflictos: cuando Git necesita una decisión humana

Vamos a crear ahora una situación diferente. Volvemos al punto inicial e imaginamos que una segunda rama había cambiado **las mismas líneas** con una intención distinta: renombrar `durada`a `horesReserva`.

```java
private int horesReserva;

public int getHoresReserva() {
    return horesReserva;
}
```

Si esta rama se creó antes de fusionar `branca_tipus`, después del primer merge tenemos dos ideas incompatibles sobre la misma línea:

- `main`ya contiene `double durada`.
- `branca_nom`contiene `int horesReserva`.

Al intentar:
```bash
git switch main
git merge branca_nom
```

Git puede detectar que no sabe elegir automáticamente. El archivo mostrará marcas similares a estas:

```text
<<<<<<< HEAD
private double durada;
=======
private int horesReserva;
>>>>>>> branca_nom
```

![Historial Git con main, una rama que cambia el tipo, otra que renombra el campo y una fusión manual que conserva ambos objetivos](https://itrascastro.github.io/ioc/da2_0487/assets/img/unitat-3/10_git_branques_conflicte.png)

Git detecta la colisión, pero la decisión semántica es nuestra: el resultado correcto puede necesitar combinar la intención de ambas ramas.

### Resolver no significa escoger un lado a ciegas

En este ejemplo queremos conservar **ambas mejoras** : el tipo `double`y el nombre `horesReserva`. Editaríamos manualmente el archivo para que quede así:

```java
private double horesReserva;

public double getHoresReserva() {
    return horesReserva;
}
```

Luego eliminamos todas las marcas del conflicto y confirmamos la resolución:

```bash
git add Reserva.java
git status
git commit -m "resol conflicte de durada"
git log --oneline --graph --decorate --all
```

Importante

**No confirme un conflicto sin compilar y probar.**

Git sólo sabe si el texto ha quedado resuelto. No sabe si ha combinado correctamente los significados. Después de resolver una fusión, compile y ejecute las pruebas antes de considerarla buena.

**Ejercicio: Resuelve los dos objetivos**

En una rama, un atributo int cantidad pasa a double cantidad. En otra, int cantidad pasa a int unidades. Escriba cuál debería ser el resultado final si queremos conservar ambas intenciones

Ver pistas: 
- No elija simplemente HEAD o la otra rama.
- Pregúntese qué quería conseguir cada cambio.

#### 4.6. .gitignore: qué no debe entrar en el repositorio

No todos los archivos de una carpeta forman parte del proyecto que queremos versionar. Compilados, logs, credenciales locales o directorios generados pueden ensuciar el historial o, en el peor caso, exponer información que no debería haberse confirmado.

El archivo `.gitignore`describe patrones que Git debe ignorar cuando todavía no están versionados.

```text
# Compilats Java
*.class
bin/
target/

# Fitxers temporals
*.log
*.tmp

# Configuració local amb secrets
.env
```

Después de crearlo, utilice `git status`para comprobar que los archivos generados ya no aparecen como no seguidos.

**.gitignore no borra el historial.**

Si un archivo ya ha sido confirmado, añadirlo después a `.gitignore`no hace desaparecer las copias anteriores. Por eso es importante decidir qué no debe versionarse **antes** del primer commit, especialmente cuando hay credenciales o secretos


#### 4.7. GitHub y GitHub desde Eclipse

Git es el sistema de control de versiones. GitHub es un servicio que puede alojar un **repositorio remoto** . El repositorio local sigue existiendo en su ordenador; el remoto permite compartir cambios y sincronizarlos.

##### Órdenes básicas con un remoto

```bash
git remote add origin URL_DEL_REPOSITORI
git push -u origin main

# Més endavant
git pull
git push
```

| Operación | Idea simplificada                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------- |
| `push`    | Envía commits locales al repositorio remoto.                                                        |
| `pull`    | Recupera cambios del remoto y los integra en la rama local correspondiente.                         |
| `fetch`   | Actualiza la información del remoto sin integrar automáticamente los cambios en la rama de trabajo. |

Eclipse integra Git mediante **EGit** . Las mismas ideas aparecen en opciones como **Team** , la vista **Git Staging** , el cambio de rama, **Merge** , **Pull** y **Push** . La interfaz puede cambiar ligeramente entre versiones, pero el modelo mental es el mismo:
- seleccionamos cambios para el staging;
- creamos commits locales;
- cambiamos o creamos ramas;
- fusionamos historiales;
- sincronizamos con el remoto.

**Terminal e IDE no son dos Git distintos.**

Si hace `git status`la terminal y luego abra Git Staging en Eclipse, ambas herramientas están mirando el mismo repositorio. Aprender las órdenes ayuda a entender qué está haciendo la interfaz gráfica.
#### 4.8. Práctica guiada de principio a fin

Esta práctica está pensada para que pueda afrontar después un ejercicio similar con otros nombres, atributos y mensajes.
##### 1. Cree el estado inicial

1. Cree una carpeta `control_reserves`.
2. Inicie Git con una rama principal.
3. Añada `Reserva.java`con `int durada`.
4. Consulte `git status`, añada el archivo y realice el primer commit.
##### 2. Primera rama: cambio de tipos

1. Cree `branca_tipus`y sitúese.
2. Cambie `int durada`a `double durada`.
3. Actualice getter, setter o constructor si es necesario.
4. Realice un commit descriptivo.
##### 3. Segunda rama: cambio de nombre

La segunda rama debe partir del estado inicial, no de la primera modificación. Su objetivo será renombrar `durada`a `horesReserva`manteniendo todavía el tipo original.
##### 4. Fusione en el orden adecuado

1. Vuelva a `main`y fusione `branca_tipus`.
2. Explique por qué Git puede hacer un _fast-forward_ .
3. Intente fusionar `branca_nom`.
4. Inspeccione las marcas del conflicto.
5. Resuélvelo con `double horesReserva`.
6. Compile, pruebe y confirme la resolución.
##### 5. Explique el historial

```bash
git log --oneline --graph --decorate --all
```

No se limite a capturar la pantalla. Debe poder explicar **qué representan las líneas del gráfico, donde se separaron las ramas, por qué la primera fusión era sencilla y por qué la segunda necesitaba una decisión humana** .

❐  Sé diferenciar working tree, staging y commit
❐  Puedo explicar qué hacen git init, add, status y commit
❐  Entiendo qué representa HEAD
❐  Puedo crear y cambiar de rama
❐  Sé reconocer un fast-forward
❐  Entiendo por qué aparece un conflicto
❐  Sé interpretar las marcas <<<<<<<, ======= y >>>>>>>
❐  Puedo resolver un conflicto conservando ideas de ambas ramas
❐  Sé para qué sirve .gitignore
❐  Distingo commit local, push y pull

**Ejercicio: Simulación final de Git**
Repita toda la práctica con una clase Producto: una rama cambia stock de int a long y otra renombra stock a unidadesDisponibles. Realice los commits, las fusiones, resuelva el conflicto y explique el historial con git log --graph.

**Ver pistas**
- La segunda rama debe nacer antes de incorporar el cambio de la primera.
- Tras el conflicto, el resultado debe conservar el nuevo tipo y el nuevo nombre.
- Use git status en cada etapa