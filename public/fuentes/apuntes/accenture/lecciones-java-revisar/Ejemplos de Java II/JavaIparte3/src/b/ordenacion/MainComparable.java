package b.ordenacion;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Demostración de COMPARABLE (orden natural)
 */
public class MainComparable {
    public static void main(String[] args) {
        // Crear personas con diferentes edades
        Persona alex = new Persona("Alex", "Muñoz", "Velasco", "12.345.678-L", 25);
        Persona ana = new Persona("Ana", "Gil", "Gil", "98.765.432-M", 55);
        Persona erik = new Persona("Erik", "Muñoz", "Velasco", "11.222.333-N", 34);
        Persona sara = new Persona("Sara", "Sanz", "Pérez", "44.555.666-P", 48);
        
        // Crear lista
        List<Persona> personas = new ArrayList<>();
        personas.add(alex);
        personas.add(ana);
        personas.add(erik);
        personas.add(sara);
        
        System.out.println("=== LISTA SIN ORDENAR (orden de inserción) ===\n");
        for (Persona p : personas) {
            System.out.println(p);
        }
        
        // Collections.sort() usa el compareTo() de Comparable
        Collections.sort(personas);
        
        System.out.println("\n=== LISTA ORDENADA (por edad, orden natural) ===\n");
        for (Persona p : personas) {
            System.out.println(p);
        }
        
        System.out.println("\n✓ Orden: Alex (25) → Erik (34) → Sara (48) → Ana (55)");
    }
}