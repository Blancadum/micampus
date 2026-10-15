package d.excepciones;

/**
 * EXCEPCIÓN PERSONALIZADA
 * 
 * extends RuntimeException → UNCHECKED (no necesita throws)
 * extends Exception → CHECKED (necesita throws o try-catch)
 */
public class ExcepcionDividirUno extends RuntimeException {
    
    // Constructor sin argumentos
    public ExcepcionDividirUno() {
        super();
    }
    
    // Constructor con mensaje
    public ExcepcionDividirUno(String mensaje) {
        super(mensaje);
    }
}