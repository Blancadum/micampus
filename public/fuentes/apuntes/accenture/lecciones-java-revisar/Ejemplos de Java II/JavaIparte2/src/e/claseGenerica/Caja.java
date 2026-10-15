package e.claseGenerica;

/**
 * Otro ejemplo de GENÉRICO SIN LÍMITE
 * <T> puede ser CUALQUIER tipo (String, Integer, Persona, etc.)
 */
public class Caja<T> {
    private T contenido;
    
    public T getContenido() {
        return contenido;
    }
    
    public void setContenido(T contenido) {
        this.contenido = contenido;
    }
    
    public void mostrar() {
        if (contenido != null) {
            System.out.println("La caja contiene: " + contenido);
        } else {
            System.out.println("La caja está vacía");
        }
    }
}