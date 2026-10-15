package c.polimorfismo;

/**
 * ═══════════════════════════════════════════════════════════════
 * POLIMORFISMO EN ACCIÓN
 * ═══════════════════════════════════════════════════════════════
 */
public class MainPolimorfismo {

    public static void main(String[] args) {

        System.out.println("═══════════════════════════════════════════════════");
        System.out.println("  POLIMORFISMO: Enlace DINÁMICO (en tiempo de ejecución)");
        System.out.println("═══════════════════════════════════════════════════\n");

        // ─────────────────────────────────────────────────────────────
        // CLAVE: Variable de tipo PADRE, objeto de tipo HIJO
        // ─────────────────────────────────────────────────────────────

        Vehiculo miVehiculo;  // Variable de referencia tipo Vehiculo

        // Asignamos un Vehiculo
        miVehiculo = new Vehiculo("Genérico", "Base");
        System.out.print("miVehiculo = new Vehiculo() → ");
        miVehiculo.arrancar();  // "Arrancando el vehículo genérico..."

        // Ahora asignamos un Coche (polimorfismo)
        miVehiculo = new Coche("Toyota", "Corolla", 5);
        System.out.print("miVehiculo = new Coche()   → ");
        miVehiculo.arrancar();  // "Arrancando el COCHE..." ← ¡Llama al método de Coche!

        // Ahora asignamos una Moto
        miVehiculo = new Moto("Honda", "CBR", 600);
        System.out.print("miVehiculo = new Moto()    → ");
        miVehiculo.arrancar();  // "Arrancando la MOTO..." ← ¡Llama al método de Moto!

        System.out.println("\n═══════════════════════════════════════════════════");
        System.out.println("  POLIMORFISMO: Enlace ESTÁTICO (en tiempo de compilación)");
        System.out.println("═══════════════════════════════════════════════════\n");        

        
        // ─────────────────────────────────────────────────────────────
        // SOBRECARGA: El compilador decide qué método llamar según
        // los parámetros que le pasamos (en tiempo de compilación)
        // ─────────────────────────────────────────────────────────────

        Vehiculo v = new Vehiculo("Test", "Demo");

        System.out.println("Sobrecarga - el compilador elige según parámetros:");
        v.acelerar();       // Versión sin parámetros
        v.acelerar(120);    // Versión con int

        System.out.println("\n═══════════════════════");
        System.out.println("  POLIMORFISMO CON ARRAYS");
        System.out.println("═══════════════════════\n");

        // ─────────────────────────────────────────────────────────────
        // Uso práctico: Array de tipo padre con objetos de tipos hijos
        // ─────────────────────────────────────────────────────────────

        Vehiculo[] flota = new Vehiculo[3];
        flota[0] = new Vehiculo("Base", "Modelo X");
        flota[1] = new Coche("BMW", "Serie 3", 4);
        flota[2] = new Moto("Yamaha", "R1", 1000);

        System.out.println("Recorremos el array y cada objeto responde a su manera:\n");

        for (Vehiculo vehiculo : flota) {
            vehiculo.mostrarInfo();
            vehiculo.arrancar();
            System.out.println("---");
        }

        System.out.println("\n═══════════════════════════════════════════════════");
        System.out.println("  RESUMEN TIPOS DE ENLACE");
        System.out.println("═══════════════════════════════════════════════════");
        System.out.println("  ESTÁTICO (compilación) → SOBRECARGA  → Misma clase, diferente firma");
        System.out.println("  DINÁMICO (ejecución)   → SOBRESCRITURA → Diferentes clases, misma firma");
        System.out.println("═══════════════════════════════════════════════════\n");
    }
}