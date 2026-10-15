package a.colleciones.extra;

/**
 * GUÍA DE EFICIENCIA: ¿Cuándo usar cada colección?
 */
public class EficienciaColecciones {
    
    public static void main(String[] args) {
        mostrarTablaComparativa();
        mostrarCasosDeUso();
    }
    
    static void mostrarTablaComparativa() {
        System.out.println("╔═══════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    TABLA COMPARATIVA DE COLECCIONES                           ║");
        System.out.println("╠═══════════════════════════════════════════════════════════════════════════════╣");
        System.out.println("║ COLECCIÓN       │ BÚSQUEDA │ INSERCIÓN │ ELIMINACIÓN │ ORDENACIÓN │DUPLICADOS ║");
        System.out.println("╠═════════════════╪══════════╪═══════════╪═════════════╪════════════╪═══════════╣");
        System.out.println("║ ArrayList       │ O(1)ᴵᵈˣ  │ O(1)ᶠⁱⁿ    │ O(n)        │ O(n log n) │ SÍ        ║");
        System.out.println("║                 │ O(n)ⱽᵃˡ  │ O(n)ⁱⁿⁱ     │             │            │           ║");
        System.out.println("╠═════════════════╪══════════╪═══════════╪═════════════╪════════════╪═══════════╣");
        System.out.println("║ LinkedList      │ O(n)     │ O(1)ⁱⁿⁱ     │ O(1)ⁱⁿⁱ       │ O(n log n) │ SÍ         ║");
        System.out.println("║                 │          │ O(1)ᶠⁱⁿ    │ O(1)ᶠⁱⁿ      │            │            ║");
        System.out.println("╠═════════════════╪══════════╪═══════════╪═════════════╪════════════╪═══════════╣");
        System.out.println("║ HashSet         │ O(1)     │ O(1)      │ O(1)        │ NO ordenado│ NO         ║");
        System.out.println("╠═════════════════╪══════════╪═══════════╪═════════════╪════════════╪═══════════╣");
        System.out.println("║ TreeSet         │ O(log n) │ O(log n)  │ O(log n)    │ AUTO       │ NO         ║");
        System.out.println("╠═════════════════╪══════════╪═══════════╪═════════════╪════════════╪═══════════╣");
        System.out.println("║ HashMap         │ O(1)     │ O(1)      │ O(1)        │ NO ordenado│ Claves: NO ║");
        System.out.println("║                 │          │           │             │            │ Valores:SÍ ║");
        System.out.println("╠═════════════════╪══════════╪═══════════╪═════════════╪════════════╪═══════════╣");
        System.out.println("║ TreeMap         │ O(log n) │ O(log n)  │ O(log n)    │ AUTO       │ Claves: NO ║");
        System.out.println("║                 │          │           │             │            │ Valores:SÍ ║");
        System.out.println("╚═════════════════╧══════════╧═══════════╧═════════════╧════════════╧═══════════╝");
        System.out.println("\nLEYENDA:");
        System.out.println("  O(1)      = Tiempo constante (instantáneo)");
        System.out.println("  O(log n)  = Tiempo logarítmico (muy rápido)");
        System.out.println("  O(n)      = Tiempo lineal (depende del tamaño)");
        System.out.println("  O(n log n)= Tiempo lineal-logarítmico");
        System.out.println("  ᴵᵈˣ       = Por índice (get)");
        System.out.println("  ⱽᵃˡ       = Por valor (contains)");
        System.out.println("  ⁱⁿⁱ       = Al inicio/final");
        System.out.println("  ᶠⁱⁿ       = Al final");
    }
    
    static void mostrarCasosDeUso() {
        System.out.println("\n\n╔═══════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                        ¿CUÁNDO USAR CADA UNA?                         ║");
        System.out.println("╚═══════════════════════════════════════════════════════════════════════╝\n");
        
        System.out.println("┌─ USA ARRAYLIST SI:");
        System.out.println("│  ✓ Necesitas acceso rápido por índice");
        System.out.println("│  ✓ Añades elementos al final");
        System.out.println("│  ✓ NO haces muchas inserciones/eliminaciones en el medio");
        System.out.println("│  ✓ Es la opción por defecto en el 90% de casos");
        System.out.println("│");
        System.out.println("│  Ejemplo: Lista de productos en un carrito de compra");
        System.out.println("│  → ArrayList<Producto> carrito = new ArrayList<>();\n");
        
        System.out.println("┌─ USA LINKEDLIST SI:");
        System.out.println("│  ✓ Haces muchas inserciones/eliminaciones al principio o medio");
        System.out.println("│  ✓ Implementas una cola o pila");
        System.out.println("│  ✓ NO necesitas acceso aleatorio por índice");
        System.out.println("│");
        System.out.println("│  Ejemplo: Cola de tareas pendientes (FIFO)");
        System.out.println("│  → Queue<Tarea> colaTareas = new LinkedList<>();\n");
        
        System.out.println("┌─ USA HASHSET SI:");
        System.out.println("│  ✓ NO quieres duplicados");
        System.out.println("│  ✓ NO te importa el orden");
        System.out.println("│  ✓ Necesitas búsquedas muy rápidas (contains)");
        System.out.println("│");
        System.out.println("│  Ejemplo: Usuarios únicos conectados");
        System.out.println("│  → Set<String> usuariosConectados = new HashSet<>();\n");
        
        System.out.println("┌─ USA TREESET SI:");
        System.out.println("│  ✓ NO quieres duplicados");
        System.out.println("│  ✓ Necesitas los elementos ORDENADOS automáticamente");
        System.out.println("│  ✓ Los elementos implementan Comparable");
        System.out.println("│");
        System.out.println("│  Ejemplo: Ranking de puntuaciones (ordenado automáticamente)");
        System.out.println("│  → Set<Integer> ranking = new TreeSet<>();\n");
        
        System.out.println("┌─ USA HASHMAP SI:");
        System.out.println("│  ✓ Necesitas asociar claves con valores");
        System.out.println("│  ✓ Búsquedas muy rápidas por clave");
        System.out.println("│  ✓ NO te importa el orden");
        System.out.println("│");
        System.out.println("│  Ejemplo: Diccionario inglés-español");
        System.out.println("│  → Map<String, String> diccionario = new HashMap<>();\n");
        
        System.out.println("┌─ USA TREEMAP SI:");
        System.out.println("│  ✓ Necesitas asociar claves con valores");
        System.out.println("│  ✓ Necesitas las claves ORDENADAS automáticamente");
        System.out.println("│");
        System.out.println("│  Ejemplo: Historial de versiones ordenado por fecha");
        System.out.println("│  → Map<LocalDate, String> versiones = new TreeMap<>();\n");
        
        System.out.println("\n╔═══════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                         REGLAS DE ORO                                 ║");
        System.out.println("╠═══════════════════════════════════════════════════════════════════════╣");
        System.out.println("║  1. Por defecto, usa ARRAYLIST (el más común)                        ║");
        System.out.println("║  2. Si necesitas VELOCIDAD en búsquedas, usa HASHSET o HASHMAP       ║");
        System.out.println("║  3. Si necesitas ORDEN automático, usa TREESET o TREEMAP             ║");
        System.out.println("║  4. Si haces muchas inserciones al inicio, usa LINKEDLIST            ║");
        System.out.println("║  5. Para pares clave-valor, usa MAP (no Collection)                  ║");
        System.out.println("╚═══════════════════════════════════════════════════════════════════════╝");
    }
}