package a.colleciones;

import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * QUEUE: Cola FIFO (First In, First Out)
 * - Solo acceso al principio/final
 * - NO acceso aleatorio (no hay get(índice))
 */
public class MainQueue {
    public static void main(String[] args) {
        System.out.println("=== LINKEDLIST COMO QUEUE (orden de inserción) ===\n");
        
        Queue<String> colaPersonas = new LinkedList<>();
        
        // add() o offer(): añadir al final
        colaPersonas.add("Juan");
        colaPersonas.add("Ana");
        colaPersonas.add("Luis");
        
        System.out.println("Cola de personas: " + colaPersonas);
        System.out.println("Tamaño: " + colaPersonas.size());
        
        // peek(): ver el primero SIN eliminarlo (devuelve null si está vacía)
        System.out.println("\nPrimero en la cola: " + colaPersonas.peek());
        System.out.println("Cola tras peek: " + colaPersonas); // No se modifica
        
        // element(): ver el primero SIN eliminarlo (lanza excepción si está vacía)
        System.out.println("Primero en la cola: " + colaPersonas.element());
        
        // poll(): obtener y ELIMINAR el primero (devuelve null si está vacía)
        System.out.println("\nAtendiendo a: " + colaPersonas.poll());
        System.out.println("Cola tras poll: " + colaPersonas);
        
        // remove(): obtener y ELIMINAR el primero (lanza excepción si está vacía)
        System.out.println("\nAtendiendo a: " + colaPersonas.remove());
        System.out.println("Cola tras remove: " + colaPersonas);
        
        System.out.println("\n\n=== PRIORITYQUEUE (orden por prioridad) ===\n");
        
        // PriorityQueue ordena automáticamente (menor a mayor para números)
        Queue<Integer> colaPrioridad = new PriorityQueue<>();
        
        colaPrioridad.add(50);
        colaPrioridad.add(10);
        colaPrioridad.add(30);
        colaPrioridad.add(20);
        
        System.out.println("Procesando por prioridad (menor primero):");
        while (!colaPrioridad.isEmpty()) {
            System.out.println("- Procesando: " + colaPrioridad.poll());
        }
    }
}