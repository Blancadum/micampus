package b.ordenacion;

/**
 * Clase Persona que implementa Comparable para definir
 * su ORDEN NATURAL (por edad de menor a mayor)
 */
public class Persona implements Comparable<Persona> {
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String dni;
    private int edad;
    
    public Persona(String nombre, String apellido1, String apellido2, String dni, int edad) {
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.dni = dni;
        this.edad = edad;
    }
    
    // Getters
    public String getNombre() {
        return nombre;
    }
    
    public String getApellido1() {
        return apellido1;
    }
    
    public String getApellido2() {
        return apellido2;
    }
    
    public String getDni() {
        return dni;
    }
    
    public int getEdad() {
        return edad;
    }
    
    /**
     * COMPARABLE: Define el ORDEN NATURAL de Persona
     * En este caso: por edad de menor a mayor
     * 
     * compareTo() debe devolver:
     * - NEGATIVO si this < other (this va antes)
     * - CERO si this == other (son iguales)
     * - POSITIVO si this > other (this va después)
     */
    @Override
    public int compareTo(Persona otra) {
        // Orden ascendente por edad
        return this.edad - otra.edad;
        
        // Para orden descendente sería: otra.edad - this.edad
    }
    
    @Override
    public String toString() {
        return String.format("Persona [nombre=%s, apellido1=%s, edad=%d]", 
                             nombre, apellido1, edad);
    }
}