package d.excepciones.extra;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;

/**
 * 7 CASOS PRÁCTICOS DE EXCEPCIONES
 * Basados en situaciones reales para entender el flujo completo
 */
@SuppressWarnings("all")
public class CasosExcepciones {
    public static void main(String[] args) {
        // caso01_ThrowsIOExceptionPeroSaltaNullPointer();
        // caso02_ThrowSinThrowsUnchecked();
        // caso03_ThrowConThrowsChecked();
        // caso04_PropagacionMultipleNivelesChecked();
        // caso05_PropagacionMultipleNivelesUnchecked();
        // caso06_ThrowsSinThrowLanzaInternamente();
        // caso07_CapturaGenericaException();
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 1: throws IOException pero salta NullPointerException
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso01_ThrowsIOExceptionPeroSaltaNullPointer() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 1: throws IOException pero salta NullPointerException");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        metodoB_caso1();
        
        System.out.println("\n RESULTADO:");
        System.out.println("  El programa MUERE porque NullPointerException NO es capturado");
        System.out.println("  por el catch de IOException (son tipos diferentes)");
    }
    
    static void metodoA_caso1() throws IOException {
        String texto = null;
        texto.length();  // ¡NullPointerException!
    }
    
    static void metodoB_caso1() {
        try {
            metodoA_caso1();
        } catch (IOException e) {
            System.out.println("Capturé IOException");
        }
        // NullPointerException NO es capturado → programa muere
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 2: throw SIN throws (excepción unchecked)
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso02_ThrowSinThrowsUnchecked() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 2: throw SIN throws (excepción unchecked)");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        metodoC_caso2();
        
        System.out.println("\n RESULTADO:");
        System.out.println("  La excepción sube: metodoA → metodoB → metodoC");
        System.out.println("  Como nadie la captura, el programa MUERE");
    }
    
    static void metodoA_caso2() {
        // No necesito throws porque RuntimeException es unchecked
        throw new RuntimeException("Error grave");
    }
    
    static void metodoB_caso2() {
        metodoA_caso2();  // No necesito try-catch, compila bien
    }
    
    static void metodoC_caso2() {
        metodoB_caso2();  // Sigue sin necesitar try-catch
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 3: throw CON throws (excepción checked)
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso03_ThrowConThrowsChecked() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 3: throw CON throws (excepción checked)");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        metodoC_caso3();
        
        System.out.println("\n RESULTADO:");
        System.out.println("  La excepción sube: metodoA → metodoB → metodoC (capturada aquí)");
        System.out.println("  El programa continúa normalmente");
    }
    
    static void metodoA_caso3() throws IOException {
        // OBLIGATORIO el throws porque IOException es checked
        throw new IOException("No se puede leer");
    }
    
    static void metodoB_caso3() throws IOException {
        // Como no hago try-catch, DEBO propagar con throws
        metodoA_caso3();
    }
    
    static void metodoC_caso3() {
        try {
            metodoB_caso3();
        } catch (IOException e) {
            System.out.println("Capturado en metodoC: " + e.getMessage());
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 4: Propagación en múltiples niveles (checked)
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso04_PropagacionMultipleNivelesChecked() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 4: Propagación en múltiples niveles (checked)");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        nivel4_caso4();
        
        System.out.println("\n La excepción viaja: nivel1 → nivel2 → nivel3 → nivel4 (capturada)");
    }
    
    static void nivel1_caso4() throws SQLException {
        throw new SQLException("Error en BD");
    }
    
    static void nivel2_caso4() throws SQLException {
        // No manejo, propago
        nivel1_caso4();
    }
    
    static void nivel3_caso4() throws SQLException {
        // No manejo, propago
        nivel2_caso4();
    }
    
    static void nivel4_caso4() {
        try {
            nivel3_caso4();
        } catch (SQLException e) {
            System.out.println("Finalmente capturado en nivel4");
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 5: Propagación en múltiples niveles (unchecked)
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso05_PropagacionMultipleNivelesUnchecked() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 5: Propagación en múltiples niveles (unchecked)");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        nivel4_caso5();
        
        System.out.println("\n Funciona igual, pero sin necesidad de declarar throws en cada nivel");
    }
    
    static void nivel1_caso5() {
        throw new IllegalArgumentException("Dato inválido");
    }
    
    static void nivel2_caso5() {
        nivel1_caso5();  // No necesito throws ni try-catch
    }
    
    static void nivel3_caso5() {
        nivel2_caso5();  // No necesito throws ni try-catch
    }
    
    static void nivel4_caso5() {
        try {
            nivel3_caso5();
        } catch (IllegalArgumentException e) {
            System.out.println("Capturado en nivel4");
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 6: throws sin throw (el error viene de otro lado)
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso06_ThrowsSinThrowLanzaInternamente() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 6: throws sin throw (el error viene de otro lado)");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        try {
            leerArchivo_caso6();
        } catch (FileNotFoundException e) {
            System.out.println("Archivo no encontrado: " + e.getMessage());
        }
        
        System.out.println("\n Yo no hago throw, pero FileReader sí puede lanzarla internamente");
        System.out.println(" La propago con mi throws");
    }
    
    static void leerArchivo_caso6() throws FileNotFoundException  {
        // Yo no hago throw, pero FileReader sí puede lanzarla internamente
        FileReader fr = new FileReader("archivo_inexistente.txt");
        // Si el archivo no existe, FileReader lanza la excepción
        // y yo la propago con mi throws
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CASO 7: Captura genérica (Exception)
    // ═══════════════════════════════════════════════════════════════════════════
    static void caso07_CapturaGenericaException() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  CASO 7: Captura genérica (Exception)");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("--- Peculiaridad ---");
        System.out.println("Muchos piensan que se ejecutan metodoA Y metodoB...");
        System.out.println("pero NO es así:\n");
        
        metodoC_caso7();
        
        System.out.println("\n metodoB NUNCA se ejecuta");
        System.out.println("   En cuanto metodoA lanza la excepción, el flujo va directo al catch");
        
        System.out.println("\n\n--- EJEMPLO CORRECTO ---");
        System.out.println("Para capturar ambas excepciones, usa un boolean o dos try separados:\n");
        
        metodoD_caso7_correcto(true);
        System.out.println();
        metodoD_caso7_correcto(false);
    }
    
    // Este código confunde a muchos
    static void metodoA_caso7() throws IOException {
        throw new IOException("Error IO");
    }
    
    static void metodoB_caso7() {
        String s = null;
        s.length();  // NullPointerException
    }
    
    static void metodoC_caso7() {
        try {
            metodoA_caso7();  // ← Lanza IOException aquí
            metodoB_caso7();  // ← NUNCA SE EJECUTA
        } catch (Exception e) {
            // Captura CUALQUIER excepción (IOException, NullPointer, etc.)
            System.out.println("Capturado: " + e.getClass().getSimpleName());
        }
    }
    
    // CORRECTO: Con boolean para demostrar que captura ambas
    static void metodoD_caso7_correcto(boolean opcion) {
        try {
            if (opcion) {
                metodoA_caso7();  // Lanza IOException (checked)
            } else {
                metodoB_caso7();  // Lanza NullPointerException (unchecked)
            }
        } catch (Exception e) {
            // Captura CUALQUIERA de las dos
            System.out.println("Capturado: " + e.getClass().getSimpleName());
        }
    }
}