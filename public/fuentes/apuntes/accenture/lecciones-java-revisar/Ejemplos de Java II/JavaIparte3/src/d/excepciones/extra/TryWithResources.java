package d.excepciones.extra;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * TRY-WITH-RESOURCES
 * 
 * Peculiaridad: El try NO siempre necesita catch.
 * Con recursos (AutoCloseable), el try solo se usa para cerrar automáticamente.
 */
public class TryWithResources {

    public static void main(String[] args) throws IOException {
        // ejemplo1_TryTradicional();
        // ejemplo2_TryWithResourcesConCatch();
        // ejemplo3_TryWithResourcesSinCatch();
        // ejemplo4_MultiplesRecursos();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EJEMPLO 1: TRY TRADICIONAL (sin resources) - Cierre manual
    // ═══════════════════════════════════════════════════════════════════════════
    static void ejemplo1_TryTradicional() {
        
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("archivo.txt"));
            String linea = reader.readLine();
            System.out.println("Línea leída: " + linea);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            
        } finally {
            // PROBLEMA: Hay que cerrar manualmente y puede fallar también
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("Recurso cerrado manualmente");
                } catch (IOException e) {
                    System.out.println("Error al cerrar: " + e.getMessage());
                }
            }
        }
        
        // Problemas:
        // - Código verboso (muchas líneas solo para cerrar)
        // - Fácil olvidarse de cerrar
        // - El close() también puede lanzar excepción
    }
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // EJEMPLO 2: TRY-WITH-RESOURCES CON CATCH - Cierre automático
    // ═══════════════════════════════════════════════════════════════════════════
    static void ejemplo2_TryWithResourcesConCatch() {
        
        // El recurso se declara dentro del paréntesis del try
        try (BufferedReader reader = new BufferedReader(new FileReader("archivo.txt"))) {
            
            String linea = reader.readLine();
            System.out.println("Línea leída: " + linea);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // ↑ reader.close() se llama AUTOMÁTICAMENTE al salir del try
        
        System.out.println("Recurso cerrado automáticamente (sin finally)");
        
        // Ventajas:
        // - Código más limpio
        // - No hay que acordarse de cerrar
        // - close() se llama SIEMPRE, incluso si hay excepción
        // - Funciona con cualquier clase que implemente AutoCloseable
    }
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // EJEMPLO 3: TRY-WITH-RESOURCES SIN CATCH (¡PECULIARIDAD!)
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // PECULIARIDAD: try SIN catch NI finally
    // Solo se usa para que el recurso se cierre automáticamente.
    // La excepción se propaga con throws en la firma del método.
    //
    // ═══════════════════════════════════════════════════════════════════════════
    static void ejemplo3_TryWithResourcesSinCatch() throws IOException {
        
        try (BufferedReader reader = new BufferedReader(new FileReader("archivo.txt"))) {
            
            String linea = reader.readLine();
            System.out.println("Línea leída: " + linea);
            
        }  // ← Sin catch, sin finally. Solo cierra el recurso.
        
        // La excepción (si ocurre) sube al método que llamó a este.
        // Por eso el método declara "throws IOException"
        
        System.out.println("Recurso cerrado automáticamente");
    }
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // EJEMPLO 4: MÚLTIPLES RECURSOS - Todos se cierran
    // ═══════════════════════════════════════════════════════════════════════════
    static void ejemplo4_MultiplesRecursos() throws IOException {
        
        // Se pueden declarar múltiples recursos separados por ;
        try (BufferedReader reader1 = new BufferedReader(new FileReader("archivo1.txt"));
             BufferedReader reader2 = new BufferedReader(new FileReader("archivo2.txt"))) {
            
            System.out.println("Leyendo archivo 1: " + reader1.readLine());
            System.out.println("Leyendo archivo 2: " + reader2.readLine());
            
        }  // ← Ambos se cierran automáticamente (en orden inverso)
        
        // Orden de cierre: Inverso a la declaración
        // 1. Se cierra reader2
        // 2. Se cierra reader1
    }
}





// ═══════════════════════════════════════════════════════════════════════════════
// Repositorio con PreparedStatement
// ═══════════════════════════════════════════════════════════════════════════════
//
// Este es el patrón típico en repositorios JDBC.
// El método ya tiene throws SQLException, no queremos catch aquí.
// Solo queremos que el PreparedStatement se cierre automáticamente.
//
// ═══════════════════════════════════════════════════════════════════════════════

/*
public class AlumnoRepository {
    
    private Connection conexion;
    
    // El método propaga la excepción (throws), no la captura aquí
    public Alumno findById(int id) throws SQLException {
        
        String sql = "SELECT * FROM alumnos WHERE id = ?";
        
        // try solo para cerrar el PreparedStatement automáticamente
        try (PreparedStatement ps = conexion.prepareStatement(sql)) {
            
            ps.setInt(1, id);
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Alumno(
                        rs.getInt("id"),
                        rs.getString("nombre")
                    );
                }
            }  // ← rs.close() automático
            
        }  // ← ps.close() automático
        
        return null;
    }
    
    
    public void insertar(Alumno alumno) throws SQLException {
        
        String sql = "INSERT INTO alumnos (nombre, edad) VALUES (?, ?)";
        
        // Sin catch, solo cierre automático
        try (PreparedStatement ps = conexion.prepareStatement(sql)) {
            
            ps.setString(1, alumno.getNombre());
            ps.setInt(2, alumno.getEdad());
            ps.executeUpdate();
            
        }  // ← ps.close() automático, excepción sube al service
    }
}
*/


// ═══════════════════════════════════════════════════════════════════════════════
// RESUMEN
// ═══════════════════════════════════════════════════════════════════════════════
//
// try-catch-finally    → Forma tradicional, cierre manual
// try-with-resources   → Cierre automático de recursos AutoCloseable
//
// PECULIARIDAD:
// try (recurso) { }    → SIN catch, SIN finally
//                      → Solo cierra el recurso
//                      → La excepción se propaga con throws
//
// Requisito: La clase del recurso debe implementar AutoCloseable
// Ejemplos: BufferedReader, FileReader, Connection, PreparedStatement, ResultSet
//
// ═══════════════════════════════════════════════════════════════════════════════