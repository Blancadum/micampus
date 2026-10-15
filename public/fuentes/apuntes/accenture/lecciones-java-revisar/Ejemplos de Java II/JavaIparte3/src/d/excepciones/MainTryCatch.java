package d.excepciones;

/**
 * TRY-CATCH-FINALLY: Capturar excepciones
 * 
 * FLUJO:
 * 1. Se ejecuta el bloque try
 * 2. Si hay excepción → va al catch correspondiente
 * 3. El bloque finally SIEMPRE se ejecuta (haya o no excepción)
 */
public class MainTryCatch {
    public static void main(String[] args) {
        ejemploBasico();
        System.out.println("\n" + "=".repeat(60) + "\n");
        ejemploMultiplesCatch();
        System.out.println("\n" + "=".repeat(60) + "\n");
        ejemploFinally();
        System.out.println("\n" + "=".repeat(60) + "\n");
        ejemploFlujoCortado();
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 1: Try-catch básico
    // ════════════════════════════════════════════════════════════════
    static void ejemploBasico() {
        System.out.println("=== EJEMPLO 1: TRY-CATCH BÁSICO ===\n");
        
        try {
            System.out.println("1. Antes de la excepción");
            
            int resultado = 10 / 0; // ArithmeticException
            
            System.out.println("2. Después de la excepción (NUNCA se ejecuta)");
            
        } catch (ArithmeticException e) {
            System.out.println("3. Excepción capturada: " + e.getMessage());
        }
        
        System.out.println("4. El programa continúa normalmente");
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 2: Múltiples catch
    // ════════════════════════════════════════════════════════════════
    static void ejemploMultiplesCatch() {
        System.out.println("=== EJEMPLO 2: MÚLTIPLES CATCH ===\n");
        
        String texto = null;
        int[] numeros = {1, 2, 3};
        
        try {
            System.out.println("Intentando acceder a texto.length()...");
            int longitud = texto.length(); // NullPointerException
            
            System.out.println("Intentando acceder a numeros[10]...");
            int valor = numeros[10]; // ArrayIndexOutOfBoundsException (nunca llega)
            
        } catch (NullPointerException e) {
            System.out.println("✓ Capturado NullPointerException");
            
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("✓ Capturado ArrayIndexOutOfBoundsException");
            
        } catch (Exception e) {
            // Exception captura CUALQUIER excepción no capturada antes
            System.out.println("✓ Capturado otra excepción: " + e.getClass().getSimpleName());
        }
        
        System.out.println("\n IMPORTANTE: Solo se ejecuta UN catch (el primero que coincida)");
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 3: Finally SIEMPRE se ejecuta
    // ════════════════════════════════════════════════════════════════
    static void ejemploFinally() {
        System.out.println("=== EJEMPLO 3: FINALLY SIEMPRE SE EJECUTA ===\n");
        
        // Caso 1: CON excepción
        System.out.println("--- Caso 1: CON excepción ---");
        try {
            System.out.println("1. Dentro del try");
            int x = 5 / 0; // Excepción
            System.out.println("2. Después de la excepción (no se ejecuta)");
        } catch (ArithmeticException e) {
            System.out.println("3. Dentro del catch");
        } finally {
            System.out.println("4. Dentro del finally (SIEMPRE se ejecuta)");
        }
        
        System.out.println("\n--- Caso 2: SIN excepción ---");
        try {
            System.out.println("1. Dentro del try");
            int x = 10 / 2; // Sin excepción
            System.out.println("2. Fin del try");
        } catch (ArithmeticException e) {
            System.out.println("3. Dentro del catch (no se ejecuta)");
        } finally {
            System.out.println("4. Dentro del finally (SIEMPRE se ejecuta)");
        }
        
        System.out.println("\n✓ Finally se usa para: cerrar archivos, conexiones BD, liberar recursos");
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 4: FLUJO CORTADO
    // ════════════════════════════════════════════════════════════════
    static void ejemploFlujoCortado() {
        System.out.println("=== EJEMPLO 4: FLUJO CORTADO (TRAMPA) ===\n");
        
        try {
            System.out.println("1. Ejecutando método A");
            metodoA(); // Lanza excepción aquí
            
            System.out.println("2. Ejecutando método B (NUNCA SE EJECUTA)");
            metodoB();
            
            System.out.println("3. Ejecutando método C (NUNCA SE EJECUTA)");
            metodoC();
            
        } catch (ArithmeticException e) {
            System.out.println("4. Excepción capturada");
        }
        
        System.out.println("\n En cuanto salta la excepción, el flujo va directo al catch");
        System.out.println("   Los métodos B y C NUNCA se ejecutan");
    }
    
    static void metodoA() {
        throw new ArithmeticException("Error en método A");
    }
    
    static void metodoB() {
        System.out.println("Método B");
    }
    
    static void metodoC() {
        System.out.println("Método C");
    }
}