package b.ordenacion;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Demostración de COMPARATOR (orden personalizado)
 */
public class MainComparator {
    public static void main(String[] args) {
        // Crear personas
        Persona alex = new Persona("Alex", "Muñoz", "Velasco", "12.345.678-L", 25);
        Persona erik = new Persona("Erik", "Muñoz", "Velasco", "11.222.333-N", 34);
        Persona ana = new Persona("Ana", "Gil", "Gil", "98.765.432-M", 55);
        Persona sara = new Persona("Sara", "Sanz", "Pérez", "44.555.666-P", 48);
        
        List<Persona> personas = new ArrayList<>();
        personas.add(alex);
        personas.add(erik);
        personas.add(ana);
        personas.add(sara);
        
        System.out.println("=== LISTA ORIGINAL ===\n");
        for (Persona p : personas) {
            System.out.println(p);
        }
        
        // OPCIÓN 1: Usar Comparator implementado en clase separada
        System.out.println("\n=== ORDENAR POR EDAD INVERSA (mayor a menor) ===\n");
        Collections.sort(personas, new ComparadorEdadInversa());
        for (Persona p : personas) {
            System.out.println(p);
        }
        
        // OPCIÓN 2: Usar otro Comparator
        System.out.println("\n=== ORDENAR POR NOMBRE ALFABÉTICAMENTE ===\n");
        Collections.sort(personas, new ComparadorNombre());
        for (Persona p : personas) {
            System.out.println(p);
        }
        
        // OPCIÓN 3: Comparator anónimo (inline) - AVANZADO
        System.out.println("\n=== ORDENAR POR LONGITUD DEL NOMBRE ===\n");
        Collections.sort(personas, new Comparator<Persona>() {
            @Override
            public int compare(Persona p1, Persona p2) {
                return p1.getNombre().length() - p2.getNombre().length();
            }
        });
        for (Persona p : personas) {
            System.out.println(p);
        }
        
        System.out.println("\n✓ Con Comparator puedes tener MÚLTIPLES criterios de ordenación");
        System.out.println("✓ NO modifica la clase original (Persona)");
    }
}