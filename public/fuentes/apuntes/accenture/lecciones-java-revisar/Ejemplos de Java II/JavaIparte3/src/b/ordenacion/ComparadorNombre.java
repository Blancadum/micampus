package b.ordenacion;

import java.util.Comparator;

/**
 * COMPARATOR: Orden por nombre alfabéticamente
 */
public class ComparadorNombre implements Comparator<Persona> {
    
    @Override
    public int compare(Persona p1, Persona p2) {
        // compareTo() de String ya devuelve el orden alfabético
        return p1.getNombre().compareTo(p2.getNombre());
    }
}