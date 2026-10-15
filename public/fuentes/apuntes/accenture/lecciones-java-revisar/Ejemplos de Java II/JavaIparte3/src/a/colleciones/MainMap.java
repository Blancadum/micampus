package a.colleciones;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * MAP: Colección de pares CLAVE-VALOR
 * - NO hereda de Collection
 * - Claves únicas (NO duplicadas)
 * - Valores pueden duplicarse
 */
public class MainMap {
    public static void main(String[] args) {
        System.out.println("=== HASHMAP (más rápido, sin orden) ===\n");
        
        // Map<TipoClave, TipoValor>
        Map<Integer, String> alumnos = new HashMap<>();

        // put(clave, valor): insertar o actualizar
        alumnos.put(1, "Juan");
        alumnos.put(2, "Juan");   // Valor duplicado OK
        alumnos.put(3, "Laura");
        alumnos.put(1, "Miguel"); // Clave duplicada → SOBRESCRIBE el valor
        
        System.out.println("Alumnos: " + alumnos);
        System.out.println("Tamaño: " + alumnos.size()); // 3 (clave 1 se sobrescribió)
        
        // get(clave): obtener valor (null si no existe)
        System.out.println("\nAlumno con ID 2: " + alumnos.get(2));
        System.out.println("Alumno con ID 99: " + alumnos.get(99)); // null
        
        // containsKey(): verificar si existe una clave
        System.out.println("\n¿Existe alumno con ID 3? " + alumnos.containsKey(3));
        System.out.println("¿Existe alumno con ID 99? " + alumnos.containsKey(99));
        
        // remove(clave): eliminar entrada
        alumnos.remove(2);
        System.out.println("\nTras eliminar ID 2: " + alumnos);
        
        // keySet(): obtener todas las claves
        System.out.println("\nClaves (IDs): " + alumnos.keySet());
        
        // Iterar sobre Map
        System.out.println("\nListado completo:");
        for (Map.Entry<Integer, String> entrada : alumnos.entrySet()) {
            System.out.println("ID " + entrada.getKey() + " → " + entrada.getValue());
        }
        
        System.out.println("\n\n=== LINKEDHASHMAP (orden de inserción) ===\n");
        
        Map<String, Integer> edades = new LinkedHashMap<>();
        edades.put("Ana", 25);
        edades.put("Carlos", 30);
        edades.put("Beatriz", 28);
        
        System.out.println("Edades (orden de inserción):");
        for (String nombre : edades.keySet()) {
            System.out.println(nombre + " tiene " + edades.get(nombre) + " años");
        }
        
        System.out.println("\n\n=== TREEMAP (ordenado por clave) ===\n");
        
        Map<String, String> capitales = new TreeMap<>();
        capitales.put("España", "Madrid");
        capitales.put("Francia", "París");
        capitales.put("Alemania", "Berlín");
        capitales.put("Italia", "Roma");
        
        System.out.println("Capitales (ordenadas alfabéticamente por país):");
        for (String pais : capitales.keySet()) {
            System.out.println(pais + " → " + capitales.get(pais));
        }
    }
}