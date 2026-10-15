package e.claseGenerica;

/**
 * CLASE GENÉRICA: permite trabajar con diferentes tipos de datos
 * 
 * GENÉRICOS DE TIPO LIMITADO:
 * <N extends Number> → solo acepta tipos numéricos (Integer, Double, Float, Long, etc.)
 * 
 * VENTAJAS:
 * - Reutilización de código
 * - Seguridad de tipos en tiempo de compilación
 * - No necesitamos crear una clase para cada tipo
 */
public class Operaciones<N extends Number> {
    
    // IMPORTANTE: doubleValue() con minúscula (método de la clase Number)
	// meterse dentro de Numbre para ver su implementacion de doubleValue()
	// no veis nada raro????
	// revisar final del main
    
    double suma(N numero) {
        return numero.doubleValue() + 2;
    }
    
    double resta(N numero) {
        return numero.doubleValue() - 2;
    }
    
    double producto(N numero) {
        return numero.doubleValue() * 2;
    }
    
    double division(N numero) {
        return numero.doubleValue() / 2;
    }   
}