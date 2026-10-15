package c.preguntasColleciones;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

@SuppressWarnings("all")
public class PreguntasColecciones {

    public static void main(String[] args) {
        // pregunta01_InterfacesVsClases();
        // pregunta02_SetPermiteDuplicados();
        // pregunta03_ListIndexOf();
        // pregunta04_MapClaveDuplicada();
        // pregunta05_TreeSetSinComparable();    //ordenacion
        // pregunta06_ComparableVsComparator();		// ordenacion
        // pregunta07_CollectionsSortSinComparable(); //ordenacion
        // pregunta08_QueueAccesoAleatorio();
        // pregunta09_HashMapOrdenInsercion();
        // pregunta10_ArrayListVsLinkedList(); //eficiencia
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 1: INTERFACES VS CLASES
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta01_InterfacesVsClases() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 1: ¿Cuál de estas contiene SOLO interfaces?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  A) Set, List, Map, Queue");
        System.out.println("  B) HashSet, ArrayList, HashMap, LinkedList");
        System.out.println("  C) Set, HashSet, List, ArrayList");
        System.out.println("  D) Collection, ArrayList, Map, TreeSet");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuál es correcta?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: A) Set, List, Map, Queue                                │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  INTERFACES: Set, List, Map, Queue, Collection                      │
        // │  CLASES: HashSet, TreeSet, ArrayList, LinkedList, HashMap, TreeMap  │
        // │                                                                     │
        // │  Peculiaridad: Es muy fácil confundir interfaces con clases               │
        // │  Recuerda: Las clases concretas suelen llevar "Hash", "Tree",       │
        // │  "Array" o "Linked" en el nombre                                    │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        System.out.println("  ✓ RESPUESTA: A) Set, List, Map, Queue");
        System.out.println("  → Todas son INTERFACES");
        System.out.println("  → HashSet, ArrayList, etc. son CLASES\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 2: SET PERMITE DUPLICADOS
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta02_SetPermiteDuplicados() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 2: ¿Qué devuelve este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  Set<String> nombres = new HashSet<>();");
        System.out.println("  nombres.add(\"Juan\");");
        System.out.println("  nombres.add(\"Ana\");");
        System.out.println("  nombres.add(\"Juan\");");
        System.out.println("  System.out.println(nombres.size());");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuántos elementos tiene el Set?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: 2                                                       │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Set NO permite duplicados.                                         │
        // │  El segundo "Juan" NO se añade.                                     │
        // │                                                                     │
        // │  add() devuelve:                                                    │
        // │  - true si se insertó                                               │
        // │  - false si ya existía (no se añade)                                │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        Set<String> nombres = new HashSet<>();
        System.out.println("¿Se añadió Juan? " + nombres.add("Juan"));   // true
        System.out.println("¿Se añadió Ana? " + nombres.add("Ana"));     // true
        System.out.println("¿Se añadió Juan? " + nombres.add("Juan"));   // false (duplicado)
        System.out.println("Tamaño: " + nombres.size());                  // 2
        
        System.out.println("\n  ✓ RESPUESTA: 2 elementos");
        System.out.println("  → Set NO permite duplicados\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 3: LIST indexOf()
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta03_ListIndexOf() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 3: ¿Qué imprime este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  List<String> frutas = new ArrayList<>();");
        System.out.println("  frutas.add(\"Manzana\");");
        System.out.println("  frutas.add(\"Pera\");");
        System.out.println("  frutas.add(\"Manzana\");");
        System.out.println("  System.out.println(frutas.indexOf(\"Manzana\"));");
        System.out.println("  System.out.println(frutas.indexOf(\"Naranja\"));");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué valores imprime?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: 0 y -1                                                  │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  indexOf() devuelve:                                                │
        // │  - El índice de la PRIMERA aparición                                │
        // │  - -1 si el elemento NO existe                                      │
        // │                                                                     │
        // │  "Manzana" está en posición 0 y 2, pero indexOf devuelve 0 (primera)│
        // │  "Naranja" no existe → devuelve -1                                  │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        List<String> frutas = new ArrayList<>();
        frutas.add("Manzana");
        frutas.add("Pera");
        frutas.add("Manzana");
        
        System.out.println("Índice de Manzana: " + frutas.indexOf("Manzana")); // 0
        System.out.println("Índice de Naranja: " + frutas.indexOf("Naranja")); // -1
        
        System.out.println("\n  ✓ RESPUESTA: 0 y -1");
        System.out.println("  → indexOf devuelve la PRIMERA aparición");
        System.out.println("  → Devuelve -1 si no existe\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 4: MAP CLAVE DUPLICADA
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta04_MapClaveDuplicada() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 4: ¿Qué imprime este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  Map<Integer, String> alumnos = new HashMap<>();");
        System.out.println("  alumnos.put(1, \"Juan\");");
        System.out.println("  alumnos.put(2, \"Ana\");");
        System.out.println("  alumnos.put(1, \"Pedro\");");
        System.out.println("  System.out.println(alumnos.get(1));");
        System.out.println("  System.out.println(alumnos.size());");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué valores imprime?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: "Pedro" y 2                                             │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  En un Map, las claves NO pueden duplicarse.                        │
        // │  Si haces put() con una clave existente, SOBRESCRIBE el valor.      │
        // │                                                                     │
        // │  Clave 1: "Juan" → "Pedro" (sobrescrito)                            │
        // │  Clave 2: "Ana" (sin cambios)                                       │
        // │  Total: 2 elementos                                                 │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        Map<Integer, String> alumnos = new HashMap<>();
        alumnos.put(1, "Juan");
        alumnos.put(2, "Ana");
        alumnos.put(1, "Pedro"); // Sobrescribe
        
        System.out.println("Alumno con ID 1: " + alumnos.get(1));  // Pedro
        System.out.println("Tamaño: " + alumnos.size());           // 2
        
        System.out.println("\n  ✓ RESPUESTA: Pedro y 2");
        System.out.println("  → Las claves duplicadas SOBRESCRIBEN el valor\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 5: TREESET SIN COMPARABLE
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta05_TreeSetSinComparable() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 5: ¿Este código compila? ¿Qué pasa al ejecutar?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  class Producto {");
        System.out.println("      String nombre;");
        System.out.println("      // NO implementa Comparable");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  Set<Producto> productos = new TreeSet<>();");
        System.out.println("  productos.add(new Producto());");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Lanza excepción?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: SÍ compila, pero lanza ClassCastException al ejecutar   │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  TreeSet necesita ordenar los elementos automáticamente.            │
        // │  Para eso, los elementos DEBEN implementar Comparable.              │
        // │                                                                     │
        // │  Compila OK porque Java no puede verificar esto en tiempo de comp.  │
        // │  Pero al ejecutar add(), lanza ClassCastException:                  │
        // │  "Producto5 cannot be cast to Comparable"                           │
        // │                                                                     │
        // │  Solución: Implementar Comparable en Producto                       │
        // │  O usar TreeSet con Comparator: new TreeSet<>(comparador)           │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        Set<Producto5> productos = new TreeSet<>();
        System.out.println("Intentando añadir producto al TreeSet...");
        productos.add(new Producto5("Laptop"));  // ← ClassCastException aquí
        System.out.println("Producto añadido correctamente"); // Nunca llega aquí
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // SOLUCIÓN 1: Implementar Comparable en la clase
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        Set<Producto5OK> productosOK = new TreeSet<>();
        productosOK.add(new Producto5OK("Laptop"));
        productosOK.add(new Producto5OK("Monitor"));
        productosOK.add(new Producto5OK("Teclado"));
        System.out.println("Productos ordenados: " + productosOK);
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // SOLUCIÓN 2: Pasar Comparator en el constructor
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        Set<Producto5> productosConComparator = new TreeSet<>((p1, p2) -> p1.nombre.compareTo(p2.nombre));
        productosConComparator.add(new Producto5("Laptop"));
        productosConComparator.add(new Producto5("Monitor"));
        productosConComparator.add(new Producto5("Teclado"));
        System.out.println("Productos con Comparator: " + productosConComparator);
        // equivalente a la opcion 3 de la clase MainComparator
        // pero esta con lambdas
        */
        
        /*
        System.out.println("  ⚠️ RESPUESTA: SÍ compila, pero falla en ejecución");
        System.out.println("  → TreeSet requiere que los elementos implementen Comparable");
        System.out.println("  → Lanza ClassCastException al intentar add()\n");
        */
}
        

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 6: COMPARABLE VS COMPARATOR
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta06_ComparableVsComparator() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 6: ¿Cuál es la diferencia entre Comparable y Comparator?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  A) Comparable se implementa en la clase original,");
        System.out.println("     Comparator se crea en una clase separada");
        System.out.println("");
        System.out.println("  B) Comparable define orden natural (un solo criterio),");
        System.out.println("     Comparator permite múltiples criterios de ordenación");
        System.out.println("");
        System.out.println("  C) Comparable tiene el método compareTo(),");
        System.out.println("     Comparator tiene el método compare()");
        System.out.println("");
        System.out.println("  D) Todas las anteriores son correctas");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuál es correcta?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: D) Todas son correctas                                  │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  COMPARABLE:                                                        │
        // │  - Se implementa EN la clase (implements Comparable<T>)             │
        // │  - Define el ORDEN NATURAL (un solo criterio)                       │
        // │  - Método: public int compareTo(T other)                            │
        // │  - Uso: Collections.sort(lista)                                     │
        // │                                                                     │
        // │  COMPARATOR:                                                        │
        // │  - Se crea en clase SEPARADA (implements Comparator<T>)             │
        // │  - Permite MÚLTIPLES criterios de ordenación                        │
        // │  - Método: public int compare(T o1, T o2)                           │
        // │  - Uso: Collections.sort(lista, new MiComparator())                 │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        System.out.println("  ✓ RESPUESTA: D) Todas son correctas");
        System.out.println("  → Comparable: orden natural, en la clase original");
        System.out.println("  → Comparator: órdenes personalizados, clases separadas\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 7: COLLECTIONS.SORT SIN COMPARABLE
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta07_CollectionsSortSinComparable() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 7: ¿Este código compila? ¿Qué pasa al ejecutar?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  class Libro {");
        System.out.println("      String titulo;");
        System.out.println("      // NO implementa Comparable");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  List<Libro> libros = new ArrayList<>();");
        System.out.println("  libros.add(new Libro());");
        System.out.println("  libros.add(new Libro());");
        System.out.println("  Collections.sort(libros);");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Lanza excepción?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO COMPILA                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Collections.sort(lista) requiere que los elementos implementen     │
        // │  Comparable. Esto se verifica en TIEMPO DE COMPILACIÓN.             │
        // │                                                                     │
        // │  Error de compilación:                                              │
        // │  "The method sort(List<T>) in the type Collections is not           │
        // │  applicable for the arguments (List<Libro7>)"                       │
        // │                                                                     │
        // │  DIFERENCIA CON PREGUNTA 5 (TreeSet):                               │
        // │  - TreeSet: SÍ compila, falla en EJECUCIÓN (ClassCastException)     │
        // │  - Collections.sort: NO compila directamente                        │
        // │                                                                     │
        // │  Soluciones:                                                        │
        // │  1. Implementar Comparable en Libro                                 │
        // │  2. Usar Collections.sort(libros, comparador)                       │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // ═══════════════════════════════════════════════════════════════════════
        // DESCOMENTA PARA VER EL ERROR DE COMPILACIÓN:
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        List<Libro7> libros = new ArrayList<>();
        libros.add(new Libro7("Java"));
        libros.add(new Libro7("Python"));
        Collections.sort(libros);  // ← ERROR DE COMPILACIÓN aquí
        System.out.println(libros);
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // SOLUCIÓN 1: Implementar Comparable en la clase
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        List<Libro7OK> librosOK = new ArrayList<>();
        librosOK.add(new Libro7OK("Java"));
        librosOK.add(new Libro7OK("Python"));
        librosOK.add(new Libro7OK("C++"));
        
        System.out.println("Antes de ordenar: " + librosOK);
        Collections.sort(librosOK);  // ← Ahora SÍ compila
        System.out.println("Después de ordenar: " + librosOK);
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // SOLUCIÓN 2: Pasar Comparator como segundo parámetro
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        List<Libro7> librosConComparator = new ArrayList<>();
        librosConComparator.add(new Libro7("Java"));
        librosConComparator.add(new Libro7("Python"));
        librosConComparator.add(new Libro7("C++"));
        
        System.out.println("Antes de ordenar: " + librosConComparator);
        
        // Versión con clase Comparator
        Collections.sort(librosConComparator, new ComparadorLibro7());
        System.out.println("Después de ordenar: " + librosConComparator);
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // SOLUCIÓN 2b: Con lambda (equivalente a la clase Comparator)
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        List<Libro7> librosLambda = new ArrayList<>();
        librosLambda.add(new Libro7("Java"));
        librosLambda.add(new Libro7("Python"));
        librosLambda.add(new Libro7("C++"));
        
        System.out.println("Antes de ordenar: " + librosLambda);
        Collections.sort(librosLambda, (l1, l2) -> l1.titulo.compareTo(l2.titulo));
        System.out.println("Después de ordenar (lambda): " + librosLambda);
        */
        
        /*
        System.out.println("  ❌ RESPUESTA: NO COMPILA");
        System.out.println("  → Collections.sort() requiere Comparable");
        System.out.println("  → A diferencia de TreeSet, aquí falla en COMPILACIÓN");
        System.out.println("  → Solución: implementar Comparable o pasar Comparator\n");
        */
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 8: QUEUE ACCESO ALEATORIO
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta08_QueueAccesoAleatorio() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 8: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  Queue<String> cola = new LinkedList<>();");
        System.out.println("  cola.add(\"Primero\");");
        System.out.println("  cola.add(\"Segundo\");");
        System.out.println("  cola.add(\"Tercero\");");
        System.out.println("  System.out.println(cola.get(1)); // Acceso por índice");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO compila                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Queue NO tiene método get(índice).                                 │
        // │  Solo permite acceso al principio/final de la cola:                 │
        // │  - peek() / element(): ver el primero sin eliminar                  │
        // │  - poll() / remove(): obtener y eliminar el primero                 │
        // │                                                                     │
        // │  Error: "The method get(int) is undefined for the type Queue"       │
        // │                                                                     │
        // │  Peculiaridad: Aunque uses LinkedList (que SÍ tiene get), si declaras     │
        // │  como Queue, solo puedes usar métodos de Queue.                     │
        // │                                                                     │
        // │  Para acceso por índice, usa List en lugar de Queue.                │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        System.out.println("  ❌ RESPUESTA: NO compila");
        System.out.println("  → Queue NO tiene get(índice)");
        System.out.println("  → Solo acceso al principio/final (peek, poll, remove)\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 9: HASHMAP ORDEN DE INSERCIÓN
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta09_HashMapOrdenInsercion() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 9: ¿Qué Map mantiene el orden de inserción?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  A) HashMap");
        System.out.println("  B) TreeMap");
        System.out.println("  C) LinkedHashMap");
        System.out.println("  D) Ninguno mantiene el orden");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuál es correcta?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: C) LinkedHashMap                                        │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  HashMap: NO mantiene orden (más rápido)                            │
        // │  TreeMap: Orden por CLAVE (ordenado alfabéticamente)                │
        // │  LinkedHashMap: Mantiene orden de INSERCIÓN                         │
        // │                                                                     │
        // │  Ejemplo:                                                           │
        // │  HashMap → {3=C, 1=A, 2=B} (sin orden)                              │
        // │  TreeMap → {1=A, 2=B, 3=C} (orden por clave)                        │
        // │  LinkedHashMap → {1=A, 2=B, 3=C} (orden inserción)                  │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        System.out.println("  ✓ RESPUESTA: C) LinkedHashMap");
        System.out.println("  → HashMap: sin orden");
        System.out.println("  → TreeMap: orden por clave");
        System.out.println("  → LinkedHashMap: orden de inserción\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 10: ARRAYLIST VS LINKEDLIST
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta10_ArrayListVsLinkedList() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 10: ¿Cuándo es mejor usar LinkedList que ArrayList?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  A) Cuando necesitas acceso rápido por índice");
        System.out.println("  B) Cuando haces muchas inserciones/eliminaciones al inicio");
        System.out.println("  C) Cuando solo añades elementos al final");
        System.out.println("  D) ArrayList siempre es mejor");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuál es correcta?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: B) Muchas inserciones/eliminaciones al inicio           │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  ARRAYLIST:                                                         │
        // │  - Mejor para: acceso por índice (get), añadir al final            │
        // │  - Peor para: insertar/eliminar al inicio (mueve todos los demás)   │
        // │                                                                     │
        // │  LINKEDLIST:                                                        │
        // │  - Mejor para: insertar/eliminar al inicio/medio                    │
        // │  - Peor para: acceso por índice (recorre nodo por nodo)            │
        // │                                                                     │
        // │  Regla: Usa ArrayList por defecto (90% de casos)                    │
        // │  Solo usa LinkedList si haces muchas operaciones al inicio          │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        System.out.println("  ✓ RESPUESTA: B) Inserciones/eliminaciones al inicio");
        System.out.println("  → ArrayList: mejor acceso por índice");
        System.out.println("  → LinkedList: mejor inserciones al inicio\n");
        */
    }
}




















//═══════════════════════════════════════════════════════════════════════════════
//CLASES AUXILIARES
//═══════════════════════════════════════════════════════════════════════════════





//─────────────────────────────────────────────
//Pregunta 5 - Clase SIN Comparable (da error)
//─────────────────────────────────────────────
class Producto5 {
 String nombre;
 
 public Producto5(String nombre) {
     this.nombre = nombre;
 }
 
 @Override
 public String toString() {
     return nombre;
 }
}





//─────────────────────────────────────────────
//Pregunta 5 - SOLUCIÓN: Clase CON Comparable
//─────────────────────────────────────────────
class Producto5OK implements Comparable<Producto5OK> {
 String nombre;
 
 public Producto5OK(String nombre) {
     this.nombre = nombre;
 }
 
 @Override
 public int compareTo(Producto5OK otro) {
     return this.nombre.compareTo(otro.nombre);
 }
 
 @Override
 public String toString() {
     return nombre;
 }
}



//─────────────────────────────────────────────
//Pregunta 7 - Clase SIN Comparable (no compila)
//─────────────────────────────────────────────
class Libro7 {
 String titulo;
 
 public Libro7(String titulo) {
     this.titulo = titulo;
 }
 
 @Override
 public String toString() {
     return titulo;
 }
}





//─────────────────────────────────────────────
//Pregunta 7 - SOLUCIÓN 1: Clase CON Comparable
//─────────────────────────────────────────────
class Libro7OK implements Comparable<Libro7OK> {
 String titulo;
 
 public Libro7OK(String titulo) {
     this.titulo = titulo;
 }
 
 @Override
 public int compareTo(Libro7OK otro) {
     return this.titulo.compareTo(otro.titulo);
 }
 
 @Override
 public String toString() {
     return titulo;
 }
}





//─────────────────────────────────────────────
//Pregunta 7 - SOLUCIÓN 2: Clase Comparator separada
//─────────────────────────────────────────────
class ComparadorLibro7 implements Comparator<Libro7> {
 
 @Override
 public int compare(Libro7 l1, Libro7 l2) {
     return l1.titulo.compareTo(l2.titulo);
 }
}









































