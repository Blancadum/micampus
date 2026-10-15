package c.interfaces;

/**
 * Clase que implementa UNA interfaz
 */
public class Ave implements Volador {
    private String nombre;
    
    public Ave(String nombre) {
        this.nombre = nombre;
    }
    
    // DEBE implementar TODOS los métodos de la interfaz
    @Override
    public void volar() {
        System.out.println(nombre + " está volando a " + ALTURA_MAXIMA + "m de altura");
    }
    
    @Override
    public void aterrizar() {
        System.out.println(nombre + " ha aterrizando suavemente");
    }
    
    // Puede usar el método default heredado (planear) o sobrescribirlo
}