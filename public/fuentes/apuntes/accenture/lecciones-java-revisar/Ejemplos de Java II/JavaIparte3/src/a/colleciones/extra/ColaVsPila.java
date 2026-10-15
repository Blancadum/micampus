package a.colleciones.extra;

/**
 * COLA vs PILA
 * Diferencias y jerarquía
 */
public class ColaVsPila {

    public static void main(String[] args) {
        mostrarDiferencias();
        mostrarJerarquia();
        mostrarMetodos();
    }

    public static void mostrarDiferencias() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    COLA vs PILA                                ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("┌────────────────────────────────┬────────────────────────────────┐");
        System.out.println("│         COLA (Queue)           │         PILA (Stack)           │");
        System.out.println("├────────────────────────────────┼────────────────────────────────┤");
        System.out.println("│            FIFO                │            LIFO                │");
        System.out.println("│   First In, First Out          │   Last In, First Out           │");
        System.out.println("│   (Primero en entrar,          │   (Último en entrar,           │");
        System.out.println("│    primero en salir)           │    primero en salir)           │");
        System.out.println("├────────────────────────────────┼────────────────────────────────┤");
        System.out.println("│                                │                                │");
        System.out.println("│   ENTRADA → [1][2][3] → SALIDA │        ↓ ENTRADA               │");
        System.out.println("│                                │       [3] ← último             │");
        System.out.println("│   Sale el 1 (el primero)       │       [2]                      │");
        System.out.println("│                                │       [1] ← primero            │");
        System.out.println("│                                │        ↑ SALIDA                │");
        System.out.println("│                                │   Sale el 3 (el último)        │");
        System.out.println("├────────────────────────────────┼────────────────────────────────┤");
        System.out.println("│   Ejemplo: Cola del super      │   Ejemplo: Pila de platos      │");
        System.out.println("│   El primero en llegar,        │   El último plato que pones,   │");
        System.out.println("│   es el primero en ser atendido│   es el primero que coges      │");
        System.out.println("└────────────────────────────────┴────────────────────────────────┘");
        System.out.println();
    }

    public static void mostrarJerarquia() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    JERARQUÍA EN JAVA                           ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("                          Collection");
        System.out.println("                          (INTERFAZ)");
        System.out.println("                              │");
        System.out.println("                              ▼");
        System.out.println("                            Queue");
        System.out.println("                          (INTERFAZ)");
        System.out.println("                              │");
        System.out.println("              ┌───────────────┴───────────────┐");
        System.out.println("              ▼                               ▼");
        System.out.println("           Deque                        PriorityQueue");
        System.out.println("        (INTERFAZ)                        (CLASE)");
        System.out.println("     Cola de doble extremo              Cola con prioridad");
        System.out.println("              │");
        System.out.println("       ┌──────┴──────┐");
        System.out.println("       ▼             ▼");
        System.out.println("  ArrayDeque    LinkedList");
        System.out.println("   (CLASE)       (CLASE)");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║  PECULIARIDAD:                                                 ║");
        System.out.println("║  - La clase Stack existe pero está OBSOLETA (legacy)          ║");
        System.out.println("║  - Para pilas, usar Deque con ArrayDeque o LinkedList         ║");
        System.out.println("║  - Deque = Double Ended Queue (cola de doble extremo)         ║");
        System.out.println("║  - Deque sirve tanto para COLA como para PILA                 ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
    }

    public static void mostrarMetodos() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    MÉTODOS PRINCIPALES                         ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("┌─────────────────────────────────────────────────────────────────┐");
        System.out.println("│                    COLA (Queue/Deque)                           │");
        System.out.println("├─────────────────────────────────────────────────────────────────┤");
        System.out.println("│  offer(e)  → Añade al final (devuelve false si no puede)       │");
        System.out.println("│  poll()    → Saca del principio (devuelve null si vacía)       │");
        System.out.println("│  peek()    → Consulta el primero SIN sacarlo                   │");
        System.out.println("└─────────────────────────────────────────────────────────────────┘");
        System.out.println();
        System.out.println("┌─────────────────────────────────────────────────────────────────┐");
        System.out.println("│                    PILA (Deque)                                 │");
        System.out.println("├─────────────────────────────────────────────────────────────────┤");
        System.out.println("│  push(e)   → Añade en la cima (arriba)                         │");
        System.out.println("│  pop()     → Saca de la cima (el último añadido)               │");
        System.out.println("│  peek()    → Consulta la cima SIN sacarlo                      │");
        System.out.println("└─────────────────────────────────────────────────────────────────┘");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║  EJEMPLO PRÁCTICO:                                             ║");
        System.out.println("║                                                                ║");
        System.out.println("║  Deque<String> cola = new ArrayDeque<>();  // Como COLA        ║");
        System.out.println("║  cola.offer(\"A\");  cola.offer(\"B\");  cola.poll(); // Sale A    ║");
        System.out.println("║                                                                ║");
        System.out.println("║  Deque<String> pila = new ArrayDeque<>();  // Como PILA        ║");
        System.out.println("║  pila.push(\"A\");  pila.push(\"B\");  pila.pop();  // Sale B      ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
    }
}