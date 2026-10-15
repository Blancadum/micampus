package c.interfaces;

/**
 * TRAMPA IMPORTANTE: El pingüino NO vuela, pero SÍ nada
 * Clase que implementa MÚLTIPLES interfaces
 * 
 * Esto demuestra que Java NO permite herencia múltiple de CLASES,
 * pero SÍ permite implementar MÚLTIPLES INTERFACES
 */
public class Pinguino implements Volador, Nadador {
    private String nombre;
    
    public Pinguino(String nombre) {
        this.nombre = nombre;
    }
    
    // Implementación de Volador (aunque los pingüinos NO vuelan)
    @Override
    public void volar() {
        System.out.println(nombre + " no puede volar, es un pingüino");
    }
    
    @Override
    public void aterrizar() {
        System.out.println(nombre + " ya está en el suelo");
    }
    
    // Implementación de Nadador
    @Override
    public void nadar() {
        System.out.println(nombre + " nada muy bien bajo el agua");
    }
    
    @Override
    public void sumergirse() {
        System.out.println(nombre + " se sumerge hasta " + PROFUNDIDAD_MAXIMA + "m");
    }
}