package a.colleciones;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * LIST: Colección ORDENADA que PERMITE duplicados
 * - Mantiene el orden de inserción
 * - Acceso por índice (como un array)
 * - Permite elementos repetidos
 */
public class MainList {
    public static void main(String[] args) {
        System.out.println("=== ARRAYLIST (más usado, mejor rendimiento general) ===\n");
        
        List<String> asistentes = new ArrayList<>();
        
        // add() siempre devuelve true (List permite duplicados)
        asistentes.add("Pedro");
        asistentes.add("María");
        asistentes.add("Antonio");
        asistentes.add("María"); // SÍ se añade (List permite duplicados)
        
        System.out.println("Asistentes (4 elementos, incluyendo duplicado):");
        for (String asistente : asistentes) {
            System.out.println("- " + asistente);
        }
        
        // Acceso por índice
        System.out.println("\nPrimer asistente: " + asistentes.get(0));
        System.out.println("Último asistente: " + asistentes.get(asistentes.size() - 1));
        
        // indexOf: devuelve índice (siempre de la primera coincidencia) o -1 si no existe 
        System.out.println("\n¿En qué posición está María? " + asistentes.indexOf("María")); // 1
        System.out.println("¿En qué posición está Juan? " + asistentes.indexOf("Juan"));     // -1
        
        // add(índice, elemento): insertar en posición específica
        asistentes.add(1, "Laura"); // Inserta en posición 1
        System.out.println("\nTras insertar Laura en posición 1:");
        for (int i = 0; i < asistentes.size(); i++) {
            System.out.println(i + ": " + asistentes.get(i));
        }
        
        // set(índice, elemento): reemplazar elemento
        asistentes.set(2, "Miguel"); // Reemplaza elemento en posición 2
        System.out.println("\nTras reemplazar posición 2 con Miguel:");
        System.out.println(asistentes);
        
        // remove(índice): eliminar por posición
        asistentes.remove(0); // Elimina primer elemento
        System.out.println("\nTras eliminar primer elemento:");
        System.out.println(asistentes);
        
        System.out.println("\n\n=== LINKEDLIST (mejor para inserciones/eliminaciones frecuentes) ===\n");
        
        List<String> cola = new LinkedList<>();
        cola.add("Juan");
        cola.add("Ana");
        cola.add("Luis");
        
        System.out.println("Cola: " + cola);
        
        // LinkedList tiene métodos adicionales para actuar como cola
        ((LinkedList<String>) cola).addFirst("Primero");
        ((LinkedList<String>) cola).addLast("Último");
        
        System.out.println("Tras addFirst y addLast: " + cola);
    }
}