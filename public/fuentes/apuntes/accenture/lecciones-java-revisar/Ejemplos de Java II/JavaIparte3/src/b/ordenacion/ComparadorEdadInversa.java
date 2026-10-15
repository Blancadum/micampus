package b.ordenacion;

import java.util.Comparator;

/**
 * COMPARATOR: Orden PERSONALIZADO (NO modifica la clase original)
 * Este comparador ordena por edad de MAYOR a MENOR
 */
public class ComparadorEdadInversa implements Comparator<Persona> {
    
    /**
     * compare() debe devolver:
     * - NEGATIVO si o1 < o2 (o1 va antes)
     * - CERO si o1 == o2 (son iguales)
     * - POSITIVO si o1 > o2 (o1 va después)
     */
    @Override
    public int compare(Persona p1, Persona p2) {
        // Orden descendente por edad (mayor primero)
        return p2.getEdad() - p1.getEdad();
    }
}