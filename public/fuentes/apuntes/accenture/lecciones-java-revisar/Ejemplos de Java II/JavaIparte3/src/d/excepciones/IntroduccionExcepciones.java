package d.excepciones;

/**
	Jerarquía y conceptos básicos
	-----------------------------
	Las excepciones son errores en tiempo de ejecución que interrumpen el flujo normal del programa. 
 */
public class IntroduccionExcepciones {

    public static void main(String[] args) {
        mostrarJerarquia();
        mostrarConceptosClave();
    }

    public static void mostrarJerarquia() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║             JERARQUÍA DE EXCEPCIONES EN JAVA                   ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("                           Object");
        System.out.println("                              │");
        System.out.println("                              ▼");
        System.out.println("                         Throwable");
        System.out.println("                              │");
        System.out.println("              ┌───────────────┴───────────────┐");
        System.out.println("              ▼                               ▼");
        System.out.println("           Error                          Exception");
        System.out.println("      (NO recuperable)                        │");
        System.out.println("              │                    ┌──────────┴──────────┐");
        System.out.println("              ▼                    ▼                     ▼");
        System.out.println("      OutOfMemoryError      RuntimeException        IOException");
        System.out.println("      StackOverflowError       (UNCHECKED)          SQLException");
        System.out.println("                                   │                 (CHECKED)");
        System.out.println("                    ┌──────────────┼──────────────┐");
        System.out.println("                    ▼              ▼              ▼");
        System.out.println("     NullPointerException  ArithmeticException  IllegalArgumentException");
        System.out.println("IndexOutOfBoundsException  ClassCastException       ...");
        System.out.println();
    }

    public static void mostrarConceptosClave() {
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    CONCEPTOS CLAVE                             ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("┌─────────────────────────────────────────────────────────────────┐");
        System.out.println("│                      CHECKED vs UNCHECKED                       │");
        System.out.println("├────────────────────────────────┬────────────────────────────────┤");
        System.out.println("│           CHECKED              │           UNCHECKED            │");
        System.out.println("├────────────────────────────────┼────────────────────────────────┤");
        System.out.println("│ Heredan de Exception           │ Heredan de RuntimeException    │");
        System.out.println("│ OBLIGATORIO: try-catch o throws│ NO obligatorio tratarlas       │");
        System.out.println("│ El compilador las verifica     │ El compilador NO las verifica  │");
        System.out.println("├────────────────────────────────┼────────────────────────────────┤");
        System.out.println("│ IOException                    │ NullPointerException           │");
        System.out.println("│ SQLException                   │ ArithmeticException            │");
        System.out.println("│ FileNotFoundException          │ ArrayIndexOutOfBoundsException │");
        System.out.println("│ ClassNotFoundException         │ IllegalArgumentException       │");
        System.out.println("└────────────────────────────────┴────────────────────────────────┘");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    throws vs throw                             ║");
        System.out.println("╠════════════════════════════════════════════════════════════════╣");
        System.out.println("║  throws → DECLARAR en la firma del método                      ║");
        System.out.println("║           public void leer() throws IOException { }            ║");
        System.out.println("║                                                                ║");
        System.out.println("║  throw  → LANZAR dentro del método                             ║");
        System.out.println("║           throw new IOException(\"Error al leer\");              ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
        System.out.println();
        System.out.println("╔════════════════════════════════════════════════════════════════╗");
        System.out.println("║  PECULIARIDAD: Si creas excepción propia...                    ║");
        System.out.println("║    - extends Exception → CHECKED (obligatorio tratarla)        ║");
        System.out.println("║    - extends RuntimeException → UNCHECKED (opcional tratarla)  ║");
        System.out.println("╚════════════════════════════════════════════════════════════════╝");
    }
}