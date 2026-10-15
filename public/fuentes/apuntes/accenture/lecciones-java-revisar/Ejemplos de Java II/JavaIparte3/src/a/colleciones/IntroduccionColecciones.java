package a.colleciones;

/**
	Jerarquía y conceptos básicos
	-----------------------------
	Las colecciones son almacenes dinámicos de objetos. 
	A diferencia de los arrays (tamaño fijo), 
	las colecciones pueden crecer o disminuir durante la ejecución del programa.
 */
public class IntroduccionColecciones {

    public static void main(String[] args) {
        mostrarJerarquia();
        mostrarConceptosClave();
    }

    public static void mostrarJerarquia() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║           JERARQUÍA DE COLECCIONES EN JAVA                     ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("                         Iterable<E>");
        System.out.println("                              │");
        System.out.println("                              ▼");
        System.out.println("                       Collection<E>  (INTERFAZ)");
        System.out.println("                              │");
        System.out.println("          ┌──────────────────┼──────────────────┐");
        System.out.println("          ▼                  ▼                  ▼");
        System.out.println("        Set<E>             List<E>           Queue<E>");
        System.out.println("      (INTERFAZ)         (INTERFAZ)        (INTERFAZ)");
        System.out.println("          │                  │                  │");
        System.out.println("    ┌─────┼─────┐      ┌─────┴─────┐      ┌─────┴─────┐");
        System.out.println("    ▼     ▼     ▼      ▼           ▼      ▼           ▼");
        System.out.println(" HashSet TreeSet    ArrayList    LinkedList      PriorityQueue");
        System.out.println(" (CLASE) (CLASE)    (CLASE)        (CLASE)           (CLASE)");
        System.out.println("    │");
        System.out.println("    ▼");
        System.out.println(" LinkedHashSet");
        System.out.println(" (CLASE)");
        System.out.println();
        System.out.println();
        System.out.println("                         Map<K,V>  (INTERFAZ) ← ¡NO hereda de Collection!");
        System.out.println("                            │");
        System.out.println("              ┌─────────────┼─────────────┐");
        System.out.println("              ▼             ▼             ▼");
        System.out.println("          HashMap       TreeMap     LinkedHashMap");
        System.out.println("          (CLASE)       (CLASE)       (CLASE)");
        System.out.println();
    }

    public static void mostrarConceptosClave() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    CONCEPTOS CLAVE                             ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("┌────────────┬─────────────┬─────────────┬──────────────────────┐");
        System.out.println("│            │  DUPLICADOS │    ORDEN    │   ACCESO POR ÍNDICE  │");
        System.out.println("├────────────┼─────────────┼─────────────┼──────────────────────┤");
        System.out.println("│    SET     │     NO      │     NO *    │          NO          │");
        System.out.println("│    LIST    │     SÍ      │     SÍ      │          SÍ          │");
        System.out.println("│    QUEUE   │     SÍ      │    FIFO     │    NO (solo extremos)│");
        System.out.println("│    MAP     │  Claves NO  │     NO *    │     Por clave        │");
        System.out.println("└────────────┴─────────────┴─────────────┴──────────────────────┘");
        System.out.println();
        System.out.println("  * TreeSet y TreeMap SÍ mantienen orden (natural o Comparator)");
        System.out.println("  * LinkedHashSet y LinkedHashMap mantienen orden de inserción");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║  PECULIARIDAD: Set, List, Map, Queue son INTERFACES            ║");
        System.out.println("║                HashSet, ArrayList, HashMap son CLASES          ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
    }
}