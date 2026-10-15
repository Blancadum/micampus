package g.avanzado;

import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * GENÉRICOS AVANZADOS
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                CONVENCIÓN DE NOMBRES DE TIPOS GENÉRICOS                 │
 * ├──────────┬──────────────────────────────────────────────────────────────┤
 * │   T      │ Type - Tipo genérico general (el más común)                  │
 * │   E      │ Element - Elementos de colecciones (List<E>, Set<E>)         │
 * │   K      │ Key - Claves en mapas (Map<K, V>)                            │
 * │   V      │ Value - Valores en mapas (Map<K, V>)                         │
 * │   N      │ Number - Cuando esperas tipos numéricos                      │
 * │   S,U,V  │ Segundo, tercer, cuarto tipo (cuando hay varios)             │
 * │   R      │ Return - Tipo de retorno en interfaces funcionales           │
 * │   ?      │ Wildcard - Tipo DESCONOCIDO (no es letra, es símbolo)        │
 * └──────────┴──────────────────────────────────────────────────────────────┘
 * 
 * IMPORTANTE: Son solo CONVENCIONES, podrías usar cualquier nombre:
 *   - class Caja<CONTENIDO> { }     // Funciona, pero no es estándar
 *   - class Caja<T> { }             // ✅ Convención estándar
 * 
 * ============================================================================
 */
public class GenericosAvanzado {

    public static void main(String[] args) {
        System.out.println("╔══════════════════════════════════════════════════════════╗");
        System.out.println("║           GENÉRICOS AVANZADOS EN JAVA                    ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝\n");
        
        System.out.println("=== 1. WILDCARDS ===\n");
        ejemplosWildcards();
        
        System.out.println("\n=== 2. PECS ===\n");
        ejemplosPECS();
        
        System.out.println("\n=== 3. MÚLTIPLES BOUNDS ===\n");
        ejemplosMultiplesBounds();
        
        System.out.println("\n=== 4. TYPE ERASURE ===\n");
        ejemplosTypeErasure();
        
        System.out.println("\n=== 5. LIMITACIONES ===\n");
        ejemplosLimitaciones();
    }

    // =========================================================================
    // 1. WILDCARDS (Comodines)
    // =========================================================================
    /*
     * ¿QUÉ ES UN WILDCARD?
     * --------------------
     * El símbolo ? representa un tipo DESCONOCIDO.
     * 
     * ¿POR QUÉ EXISTE?
     * ----------------
     * Porque List<Integer> NO es subtipo de List<Number> (invarianza).
     * Los wildcards permiten flexibilizar esto.
     * 
     * TRES TIPOS:
     * -----------
     * 1. <?>                  → Unbounded (sin límite) - cualquier tipo
     * 2. <? extends Tipo>     → Upper bounded - Tipo o subtipos (hacia abajo)
     * 3. <? super Tipo>       → Lower bounded - Tipo o supertipos (hacia arriba)
     */
    
    /**
     * <?> - WILDCARD SIN LÍMITE (Unbounded)
     * 
     * Acepta List de CUALQUIER tipo: List<String>, List<Integer>, List<Perro>...
     * 
     * RESTRICCIÓN: Solo puedes LEER como Object, NO puedes añadir elementos
     * (excepto null) porque no sabes qué tipo es.
     */
    public static void imprimirLista(List<?> lista) {
        System.out.println("  Imprimiendo lista con <?>:");
        for (Object elemento : lista) {  // Solo puedes leer como Object
            System.out.println("    - " + elemento);
        }
        
        // ❌ NO PUEDES HACER ESTO:
        // lista.add("algo");    // Error: no sabes si es List<String>
        // lista.add(123);       // Error: no sabes si es List<Integer>
        
        // ✅ ÚNICA EXCEPCIÓN:
        // lista.add(null);      // null es válido para cualquier tipo
    }
    
    /**
     * <? extends Number> - UPPER BOUNDED (Límite superior)
     * 
     * Acepta Number o cualquier SUBTIPO: Integer, Double, Float, Long, BigDecimal...
     * 
     * PIENSA: "? es algo que EXTIENDE de Number" (va hacia ABAJO en jerarquía)
     * 
     *              Object
     *                 │
     *              Number  ← límite superior
     *            /   |   \
     *      Integer Double Float  ← estos SÍ entran
     * 
     * RESTRICCIÓN: SOLO LECTURA - no puedes añadir porque no sabes si es
     * List<Integer> o List<Double>
     */
    public static double sumarTodos(List<? extends Number> lista) {
        double total = 0;
        for (Number n : lista) {  // Puedes leer como Number (garantizado)
            total += n.doubleValue();
        }
        
        // ❌ NO PUEDES HACER ESTO:
        // lista.add(1);         // Error: ¿y si es List<Double>?
        // lista.add(1.0);       // Error: ¿y si es List<Integer>?
        
        return total;
    }
    
    /**
     * <? super Integer> - LOWER BOUNDED (Límite inferior)
     * 
     * Acepta Integer o cualquier SUPERTIPO: Number, Object
     * 
     * PIENSA: "? es algo que es SUPER de Integer" (va hacia ARRIBA en jerarquía)
     * 
     *         Object  ← estos SÍ entran
     *            │
     *         Number  ← estos SÍ entran
     *            │
     *        Integer  ← límite inferior
     *            │
     *     (no hay subtipos)
     * 
     * VENTAJA: Puedes ESCRIBIR Integer (o subtipos)
     * RESTRICCIÓN: Solo puedes LEER como Object
     */
    public static void agregarNumeros(List<? super Integer> lista) {
        // ✅ PUEDES añadir Integer (o subtipos de Integer si los hubiera)
        lista.add(1);
        lista.add(2);
        lista.add(3);
        
        // ❌ NO puedes leer como Integer:
        // Integer x = lista.get(0);  // Error: podría ser List<Object>
        
        // ✅ Solo puedes leer como Object:
        Object x = lista.get(0);
        System.out.println("  Primer elemento (como Object): " + x);
    }
    
    public static void ejemplosWildcards() {
        // ─────────────────────────────────────────────────────────
        // <?> - Acepta CUALQUIER lista
        // ─────────────────────────────────────────────────────────
        List<String> strings = List.of("Hola", "Mundo");
        List<Integer> enteros = List.of(1, 2, 3);
        
        System.out.println("─── Wildcard <?> ───");
        imprimirLista(strings);   // ✅ Funciona con List<String>
        imprimirLista(enteros);   // ✅ Funciona con List<Integer>
        
        // ─────────────────────────────────────────────────────────
        // <? extends Number> - Solo subtipos de Number
        // ─────────────────────────────────────────────────────────
        List<Integer> integers = List.of(10, 20, 30);
        List<Double> doubles = List.of(1.5, 2.5, 3.5);
        
        System.out.println("\n─── Wildcard <? extends Number> ───");
        System.out.println("  Suma de integers: " + sumarTodos(integers));  // ✅
        System.out.println("  Suma de doubles: " + sumarTodos(doubles));    // ✅
        // sumarTodos(strings);  // ❌ Error: String no es Number
        
        // ─────────────────────────────────────────────────────────
        // <? super Integer> - Integer o supertipos
        // ─────────────────────────────────────────────────────────
        List<Number> numeros = new ArrayList<>();
        List<Object> objetos = new ArrayList<>();
        
        System.out.println("\n─── Wildcard <? super Integer> ───");
        agregarNumeros(numeros);  // ✅ Number es super de Integer
        agregarNumeros(objetos);  // ✅ Object es super de Integer
        System.out.println("  Lista Number: " + numeros);
        System.out.println("  Lista Object: " + objetos);
    }

    // =========================================================================
    // 2. PECS - Producer Extends, Consumer Super
    // =========================================================================
    /*
     * ¿QUÉ ES PECS?
     * -------------
     * Es una REGLA MNEMOTÉCNICA para saber cuándo usar extends o super.
     * 
     * PRODUCER EXTENDS:
     *   - Si LEES/PRODUCES datos de una estructura → usa EXTENDS
     *   - La estructura "produce" datos para ti
     * 
     * CONSUMER SUPER:
     *   - Si ESCRIBES/CONSUMES datos en una estructura → usa SUPER
     *   - La estructura "consume" los datos que le das
     * 
     * EJEMPLO MENTAL:
     *   - Un frutero del que SACAS frutas → Producer → extends
     *   - Una cesta donde METES frutas → Consumer → super
     */
    
    /**
     * Ejemplo clásico de PECS: copiar de una lista a otra
     * 
     * @param origen  PRODUCER - leemos de aquí → extends
     * @param destino CONSUMER - escribimos aquí → super
     */
    public static void copiarElementos(
            List<? extends Number> origen,    // PRODUCER: sacas datos de aquí
            List<? super Number> destino) {   // CONSUMER: metes datos aquí
        
        for (Number n : origen) {   // LEES de origen (extends permite leer)
            destino.add(n);         // ESCRIBES en destino (super permite escribir)
        }
    }
    
    public static void ejemplosPECS() {
        List<Integer> origen = List.of(1, 2, 3);  // List<Integer> es "producer"
        List<Object> destino = new ArrayList<>();  // List<Object> es "consumer"
        
        copiarElementos(origen, destino);
        System.out.println("  Origen (List<Integer>): " + origen);
        System.out.println("  Destino (List<Object>): " + destino);
        
        System.out.println("\n  ¿Por qué funciona?");
        System.out.println("  • origen: List<Integer>, Integer extends Number ✅");
        System.out.println("  • destino: List<Object>, Object es super de Number ✅");
        
        /*
         * RESUMEN PECS:
         * ┌────────────────┬───────────────┬───────────────────────────┐
         * │ Operación      │ Usa           │ Razón                     │
         * ├────────────────┼───────────────┼───────────────────────────┤
         * │ Solo LEER      │ ? extends T   │ Sabes que es T o subtipo  │
         * │ Solo ESCRIBIR  │ ? super T     │ Aceptará T o subtipos     │
         * │ LEER y ESCRIBIR│ T (sin ?)     │ Necesitas tipo exacto     │
         * └────────────────┴───────────────┴───────────────────────────┘
         */
    }

    // =========================================================================
    // 3. MÚLTIPLES BOUNDS (Límites múltiples)
    // =========================================================================
    /*
     * ¿QUÉ SON?
     * ---------
     * Puedes exigir que T cumpla VARIAS restricciones a la vez.
     * 
     * SINTAXIS:
     *   <T extends Clase & Interface1 & Interface2>
     * 
     * REGLAS:
     *   1. La CLASE debe ir PRIMERO (si hay una)
     *   2. Las INTERFACES van después, separadas por &
     *   3. Solo puede haber UNA clase (Java no tiene herencia múltiple)
     *   4. Puede haber MÚLTIPLES interfaces
     * 
     * EJEMPLOS VÁLIDOS:
     *   <T extends Number & Comparable<T>>           ✅
     *   <T extends Number & Serializable & Cloneable> ✅
     *   <T extends Comparable<T> & Serializable>     ✅ (sin clase, solo interfaces)
     * 
     * EJEMPLOS INVÁLIDOS:
     *   <T extends Comparable<T> & Number>           ❌ (clase debe ir primero)
     *   <T extends Number & String>                  ❌ (dos clases)
     */
    
    /**
     * T debe ser:
     *   1. Subtipo de Number (para poder hacer operaciones numéricas)
     *   2. Implementar Comparable<T> (para poder comparar)
     */
    public static <T extends Number & Comparable<T>> T maximo(T a, T b) {
        System.out.println("  Comparando: " + a + " vs " + b);
        return a.compareTo(b) > 0 ? a : b;
    }
    
    public static void ejemplosMultiplesBounds() {
        // Integer cumple: extends Number ✅ e implements Comparable<Integer> ✅
        Integer maxInt = maximo(5, 10);
        System.out.println("  Máximo: " + maxInt);
        
        // Double cumple: extends Number ✅ e implements Comparable<Double> ✅
        Double maxDouble = maximo(3.14, 2.71);
        System.out.println("  Máximo: " + maxDouble);
        
        // ❌ String NO cumple: no extiende Number
        // maximo("a", "b");  // Error de compilación
        
        System.out.println("\n  Integer cumple ambas restricciones:");
        System.out.println("    • extends Number ✅");
        System.out.println("    • implements Comparable<Integer> ✅");
    }

    // =========================================================================
    // 4. TYPE ERASURE (Borrado de tipos)
    // =========================================================================
    /*
     * ¿QUÉ ES TYPE ERASURE?
     * ---------------------
     * Es el proceso por el cual la JVM ELIMINA la información de tipos
     * genéricos en tiempo de EJECUCIÓN.
     * 
     * EN COMPILACIÓN (código fuente):
     *   List<String> listaStrings = new ArrayList<>();
     *   List<Integer> listaIntegers = new ArrayList<>();
     *   // Son tipos DIFERENTES
     * 
     * EN EJECUCIÓN (bytecode):
     *   List listaStrings = new ArrayList();  // Solo "List"
     *   List listaIntegers = new ArrayList(); // Solo "List"
     *   // ¡Son el MISMO tipo!
     * 
     * ¿POR QUÉ EXISTE?
     * ----------------
     * Para mantener compatibilidad con código Java anterior a 1.5
     * (cuando no existían los genéricos).
     * 
     * CONSECUENCIAS:
     *   1. No puedes hacer instanceof con tipo genérico
     *   2. No puedes crear instancias de T (new T())
     *   3. No puedes crear arrays de T (new T[10])
     *   4. No puedes sobrecargar por diferente tipo genérico
     */
    
    public static void ejemplosTypeErasure() {
        List<String> listaStrings = new ArrayList<>();
        List<Integer> listaIntegers = new ArrayList<>();
        
        // En runtime, ¡AMBAS son la misma clase!
        System.out.println("  Clase de List<String>:  " + listaStrings.getClass().getName());
        System.out.println("  Clase de List<Integer>: " + listaIntegers.getClass().getName());
        
        boolean mismaTipo = listaStrings.getClass() == listaIntegers.getClass();
        System.out.println("  ¿Son la misma clase? " + mismaTipo);  // ¡TRUE!
        
        System.out.println("\n  Consecuencias del Type Erasure:");
        
        // ❌ NO COMPILA: instanceof con tipo genérico
        // if (listaStrings instanceof List<String>) { }  // Error
        System.out.println("    • instanceof List<String> ❌ No compila");
        
        // ✅ SÍ COMPILA: instanceof con wildcard
        if (listaStrings instanceof List<?>) {
            System.out.println("    • instanceof List<?> ✅ Sí compila (pero pierde info)");
        }
        
        // ❌ NO PUEDES sobrecargar solo por tipo genérico:
        // void procesar(List<String> lista) { }   // Estos dos métodos
        // void procesar(List<Integer> lista) { }  // ¡SON EL MISMO después del erasure!
        System.out.println("    • No puedes sobrecargar solo por tipo genérico");
    }

    // =========================================================================
    // 5. LIMITACIONES DE LOS GENÉRICOS
    // =========================================================================
    /*
     * Los genéricos tienen LIMITACIONES debido al Type Erasure.
     * Es importante conocerlas para evitar errores.
     */
    
    public static void ejemplosLimitaciones() {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│         LIMITACIONES DE LOS GENÉRICOS EN JAVA           │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        // ─────────────────────────────────────────────────────────
        // 1. NO PRIMITIVOS
        // ─────────────────────────────────────────────────────────
        System.out.println("1️   NO primitivos:");
        System.out.println("    List<int> ❌");
        System.out.println("    List<Integer> ✅ (usar wrapper)");
        System.out.println("    Razón: Los genéricos trabajan con Object, primitivos no son Object\n");
        
        // ─────────────────────────────────────────────────────────
        // 2. NO INSTANCIAR TIPO GENÉRICO
        // ─────────────────────────────────────────────────────────
        System.out.println("2️.  NO instanciar T:");
        System.out.println("    new T() ❌");
        System.out.println("    Razón: En runtime no se sabe qué es T");
        System.out.println("    Solución: Pasar Class<T> y usar reflection\n");
        
        // ─────────────────────────────────────────────────────────
        // 3. NO ARRAYS GENÉRICOS
        // ─────────────────────────────────────────────────────────
        System.out.println("3️.  NO arrays de tipo genérico:");
        System.out.println("    new T[10] ❌");
        System.out.println("    new List<String>[5] ❌");
        System.out.println("    Solución: Usar List<T> en vez de arrays\n");
        
        // ─────────────────────────────────────────────────────────
        // 4. NO EXCEPCIONES GENÉRICAS
        // ─────────────────────────────────────────────────────────
        System.out.println("4️.  NO excepciones genéricas:");
        System.out.println("    class MiExcepcion<T> extends Exception ❌");
        System.out.println("    Razón: El catch no podría distinguir tipos\n");
        
        // ─────────────────────────────────────────────────────────
        // 5. NO STATIC CON TIPO DE LA CLASE
        // ─────────────────────────────────────────────────────────
        System.out.println("5️.  NO usar T de la clase en contexto static:");
        System.out.println("    class Caja<T> { static T valor; } ❌");
        System.out.println("    Razón: T pertenece a la instancia, static es de la clase\n");
        
        // ─────────────────────────────────────────────────────────
        // 6. INVARIANZA DE GENÉRICOS
        // ─────────────────────────────────────────────────────────
        System.out.println("6️.  INVARIANZA - Tipos genéricos no son covariantes:");
        System.out.println("    List<Integer> NO es subtipo de List<Number>");
        System.out.println("    Aunque Integer SÍ es subtipo de Number");
        System.out.println("    Solución: Usar wildcards\n");
        
        // Demostración:
        List<Integer> integers = new ArrayList<>();
        // List<Number> numbers = integers;         // ❌ NO compila
        List<? extends Number> numbers = integers;  // ✅ Con wildcard SÍ
        System.out.println("    List<Number> nums = integers; ❌");
        System.out.println("    List<? extends Number> nums = integers; ✅");
    }
    
    // =========================================================================
    // SOLUCIÓN: Cómo crear instancia de T usando Class<T>
    // =========================================================================
    
    /**
     * Como no puedes hacer new T(), la solución es pasar el Class<T>
     * y usar reflection para crear la instancia.
     */
    public static <T> T crearInstancia(Class<T> clase) throws Exception {
        return clase.getDeclaredConstructor().newInstance();
    }
    
    // Uso:
    // String s = crearInstancia(String.class);  // Crea un String vacío
}


// =============================================================================
// CLASES ADICIONALES DE EJEMPLO
// =============================================================================

/**
 * Clase genérica con DOS tipos parametrizados: K (Key) y V (Value)
 * Similar a Map.Entry<K, V>
 */
class Par<K, V> {
    private K clave;   // K = Key
    private V valor;   // V = Value
    
    public Par(K clave, V valor) {
        this.clave = clave;
        this.valor = valor;
    }
    
    public K getClave() { return clave; }
    public V getValor() { return valor; }
    
    @Override
    public String toString() {
        return clave + " -> " + valor;
    }
}


/**
 * Interfaz genérica con tipo E (Element)
 * Similar a Collection<E>
 */
interface Contenedor<E> {
    void agregar(E elemento);
    E obtener(int indice);
    int tamanio();
}

/**
 * Implementación de interfaz genérica
 */
class MiLista<E> implements Contenedor<E> {
    private List<E> elementos = new ArrayList<>();
    
    @Override
    public void agregar(E elemento) {
        elementos.add(elemento);
    }
    
    @Override
    public E obtener(int indice) {
        return elementos.get(indice);
    }
    
    @Override
    public int tamanio() {
        return elementos.size();
    }
}