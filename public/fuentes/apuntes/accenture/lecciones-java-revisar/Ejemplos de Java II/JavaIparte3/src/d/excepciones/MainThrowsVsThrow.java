package d.excepciones;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * THROWS vs THROW
 * 
 * throws: DECLARAR que un método puede lanzar una excepción (en la firma)
 * throw:  LANZAR una excepción manualmente (dentro del método)
 */
public class MainThrowsVsThrow {
    public static void main(String[] args) {
        ejemploThrow();
        System.out.println("\n" + "=".repeat(60) + "\n");
        ejemploThrows();
        System.out.println("\n" + "=".repeat(60) + "\n");
        ejemploPropagacion();
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 1: throw (lanzar manualmente)
    // ════════════════════════════════════════════════════════════════
    static void ejemploThrow() {
        System.out.println("=== EJEMPLO 1: THROW (lanzar manualmente) ===\n");
        
        try {
            validarEdad(15);
            System.out.println("Edad válida - try: 15");
        } catch (IllegalArgumentException e) {
            System.out.println("Excepción capturada: " + e.getMessage());
        }
        
        try {
            validarEdad(25);
            System.out.println("Edad válida - try: 25");
        } catch (IllegalArgumentException e) {
            System.out.println("Excepción capturada: " + e.getMessage());
        }
    }
    
    static void validarEdad(int edad) {
        if (edad < 18) {
            // throw: LANZAR la excepción manualmente
            throw new IllegalArgumentException("Debe ser mayor de 18 años");
        }
        System.out.println("Edad válida - método: " + edad);
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 2: throws (declarar en la firma)
    // ════════════════════════════════════════════════════════════════
    static void ejemploThrows() {
        System.out.println("=== EJEMPLO 2: THROWS (declarar en la firma) ===\n");
        
        try {
            leerArchivo("archivo.txt");
        } catch (IOException e) {
            System.out.println("Error al leer archivo: " + e.getMessage());
        }
        
        System.out.println("\n✓ throws indica que el método puede lanzar esa excepción");
        System.out.println("✓ El que llame al método DEBE manejarla (try-catch) o propagarla (throws)");
    }
    
    // throws: DECLARAR que este método puede lanzar IOException
    static void leerArchivo(String nombre) throws IOException  {
        System.out.println("Intentando leer: " + nombre);
        
        // FileReader puede lanzar FileNotFoundException (checked)
        // Como no la capturamos, debemos declararla con throws
        FileReader fr = new FileReader(nombre);
        
        System.out.println("Archivo leído exitosamente");
    }
    
    // ════════════════════════════════════════════════════════════════
    // EJEMPLO 3: Propagación con throws
    // ════════════════════════════════════════════════════════════════
    static void ejemploPropagacion() {
        System.out.println("=== EJEMPLO 3: PROPAGACIÓN CON THROWS ===\n");
        
        try {
            nivel3();
        } catch (IOException e) {
            System.out.println("Excepción capturada en main: " + e.getMessage());
        }
        
        System.out.println("\n✓ La excepción viaja: nivel1 → nivel2 → nivel3 → main");
        System.out.println("✓ Cada nivel puede capturarla (try-catch) o propagarla (throws)");
    }
    
    // Nivel 1: LANZA la excepción
    static void nivel1() throws IOException {
        System.out.println("1. En nivel1: Lanzando excepción");
        throw new IOException("Error en nivel 1");
    }
    
    // Nivel 2: NO captura, PROPAGA
    static void nivel2() throws IOException {
        System.out.println("2. En nivel2: Llamando a nivel1");
        nivel1(); // Propaga la excepción hacia arriba
    }
    
    // Nivel 3: NO captura, PROPAGA
    static void nivel3() throws IOException {
        System.out.println("3. En nivel3: Llamando a nivel2");
        nivel2(); // Propaga la excepción hacia arriba
    }
}