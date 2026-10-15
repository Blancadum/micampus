package a.colleciones.extra;

/**
 * JERARQUÍA COMPLETA DE COLECCIONES - Java 11
 * Incluye interfaces, clases abstractas y clases concretas
 */
public class JerarquiaColeccionesCompleta {

    public static void main(String[] args) {
        mostrarJerarquiaCollection();
        mostrarJerarquiaMap();
    }

    public static void mostrarJerarquiaCollection() {
        System.out.println("╔════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║           JERARQUÍA COLLECTION (interfaces + clases abstractas)           ║");
        System.out.println("╚════════════════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("                                   Object");
        System.out.println("                                   (CLASE)");
        System.out.println("                                      │");
        System.out.println("                                      ▼");
        System.out.println("      Iterable ─────────────► AbstractCollection ◄─────────── Collection");
        System.out.println("     (INTERFAZ)               (CLASE ABSTRACTA)               (INTERFAZ)");
        System.out.println("                               toString() → [a, b, c]");
        System.out.println("                                      │");
        System.out.println("          ┌───────────────────────────┼───────────────────────────┐");
        System.out.println("          ▼                           ▼                           ▼");
        System.out.println("     AbstractSet               AbstractList               AbstractQueue");
        System.out.println("   (CLASE ABSTRACTA)         (CLASE ABSTRACTA)         (CLASE ABSTRACTA)");
        System.out.println("          │                           │                           │");
        System.out.println("    ┌─────┴─────┐               ┌─────┴─────┐                     ▼");
        System.out.println("    ▼           ▼               ▼           ▼              PriorityQueue");
        System.out.println(" HashSet    TreeSet        ArrayList   LinkedList            (CLASE)");
        System.out.println(" (CLASE)    (CLASE)         (CLASE)     (CLASE)");
        System.out.println("    │");
        System.out.println("    ▼");
        System.out.println(" LinkedHashSet");
        System.out.println(" (CLASE)");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║  AbstractCollection sobrescribe toString() → por eso HashSet, ArrayList,  ║");
        System.out.println("║  etc. muestran [elemento, elemento] en vez de la dirección de memoria     ║");
        System.out.println("╚════════════════════════════════════════════════════════════════════════════╝");
        System.out.println();
    }

    public static void mostrarJerarquiaMap() {
        System.out.println("╔════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║              JERARQUÍA MAP (interfaces + clases abstractas)               ║");
        System.out.println("╚════════════════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("                                   Object");
        System.out.println("                                   (CLASE)");
        System.out.println("                                      │");
        System.out.println("                                      ▼");
        System.out.println("             Map ─────────────► AbstractMap");
        System.out.println("          (INTERFAZ)          (CLASE ABSTRACTA)");
        System.out.println("                               toString() → {k=v, k=v}");
        System.out.println("                                      │");
        System.out.println("              ┌────────────────────────┼────────────────────────┐");
        System.out.println("              ▼                        ▼                        ▼");
        System.out.println("           HashMap                  TreeMap                 WeakHashMap");
        System.out.println("           (CLASE)                  (CLASE)                  (CLASE)");
        System.out.println("              │");
        System.out.println("              ▼");
        System.out.println("        LinkedHashMap");
        System.out.println("           (CLASE)");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║  AbstractMap sobrescribe toString() → por eso HashMap, TreeMap, etc.      ║");
        System.out.println("║  muestran {clave=valor, clave=valor} en vez de la dirección de memoria    ║");
        System.out.println("╚════════════════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║  RESUMEN:                                                                 ║");
        System.out.println("║    - Object.toString()           → paquete.Clase@hash (memoria)           ║");
        System.out.println("║    - AbstractCollection.toString() → [a, b, c]                            ║");
        System.out.println("║    - AbstractMap.toString()        → {k=v, k=v}                           ║");
        System.out.println("╚════════════════════════════════════════════════════════════════════════════╝");
    }
}