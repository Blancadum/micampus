package a.colleciones;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

/**
 * SET: Colección SIN orden y SIN duplicados
 * - NO permite elementos repetidos
 * - Requiere equals() y hashCode() implementados
 */
public class MainSet {
    public static void main(String[] args) {
        System.out.println("=== HASHSET (sin orden, más rápido) ===\n");
        
        Set<String> titulares = new HashSet<>();
        
        // add() devuelve true si se insertó, false si ya existía
        System.out.println("¿Se insertó Laura? " + titulares.add("Laura"));  // true
        System.out.println("¿Se insertó Miguel? " + titulares.add("Miguel")); // true
        System.out.println("¿Se insertó Laura? " + titulares.add("Laura"));   // false (duplicado)
        System.out.println("¿Se insertó Miguel? " + titulares.add("Miguel")); // false (duplicado)
        
        System.out.println("\nNúmero de titulares: " + titulares.size()); // 2
        
        // NO garantiza orden al iterar
        System.out.println("\nTitulares (sin orden garantizado):");
        for (String titular : titulares) {
            System.out.println("- " + titular);
        }
        
        System.out.println("\n\n=== LINKEDHASHSET (mantiene orden de inserción) ===\n");
        
        Set<String> nombres = new LinkedHashSet<>();
        nombres.add("Ana");
        nombres.add("Carlos");
        nombres.add("Beatriz");
        nombres.add("Ana"); // No se añade (duplicado)
        
        System.out.println("Nombres en orden de inserción:");
        for (String nombre : nombres) {
            System.out.println("- " + nombre);
        }
        
        System.out.println("\n\n=== TREESET (ordenado automáticamente) ===\n");
        
        // TreeSet requiere que los elementos implementen Comparable 
        // (meterse dentro de Integer para ver su implementacion)
        Set<Integer> numeros = new TreeSet<>();
        numeros.add(50);
        numeros.add(10);
        numeros.add(30);
        numeros.add(20);
        numeros.add(10); // No se añade (duplicado)
        
        System.out.println("Números ordenados automáticamente:");
        for (Integer num : numeros) {
            System.out.println("- " + num);
        }
    }
}