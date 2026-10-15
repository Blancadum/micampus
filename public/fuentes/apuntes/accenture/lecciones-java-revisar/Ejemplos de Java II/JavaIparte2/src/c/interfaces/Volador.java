package c.interfaces;

/**
 * INTERFAZ: contrato que define QUÉ debe hacer, no CÓMO
 * 
 * REGLAS IMPORTANTES (TRAMPA):
 * 1. NO puede tener constructores
 * 2. Todos los métodos son "public abstract" implícitamente
 * 3. Todos los atributos son "public static final" implícitamente (constantes)
 * 4. Una clase puede implementar VARIAS interfaces (herencia múltiple de interfaces)
 * 5. Una interfaz puede extender de OTRAS interfaces
 */
public interface Volador {
    // Constante (public static final implícito)
    int ALTURA_MAXIMA = 10000; // metros
    
    // Métodos abstractos (public abstract implícito)
    void volar();
    void aterrizar();
    
    // Desde Java 8: métodos default (con cuerpo)
    default void planear() {
        System.out.println("Planeando suavemente...");
    }
}