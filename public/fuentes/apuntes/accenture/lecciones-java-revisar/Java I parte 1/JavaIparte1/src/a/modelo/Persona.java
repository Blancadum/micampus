package a.modelo;

/**
 * ═══════════════════════════════════════════════════════════════
 * CLASE PADRE (SUPERCLASE)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Esta es nuestra clase base. Todas las clases en Java heredan
 * implícitamente de Object (la clase raíz de toda la jerarquía).
 * 
 * PUNTO CLAVE: Los atributos PRIVATE no se heredan directamente,
 * pero se accede a ellos mediante getters/setters.
 */
public class Persona {

    // Atributos privados - ENCAPSULAMIENTO
    private String nombre;
    private String primerApellido;
    private String segundoApellido;
    private String dni;
    private int edad;

    // ─────────────────────────────────────────────────────────────
    // CONSTRUCTORES
    // ─────────────────────────────────────────────────────────────
    
    /**
     * Constructor vacío.
     * IMPORTANTE: Los constructores NO se heredan.
     * Las clases hijas deben definir sus propios constructores.
     */
    public Persona() {
    }

    /**
     * Constructor con parámetros.
     */
    public Persona(String nombre, String primerApellido, String dni, int edad) {
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.dni = dni;
        this.edad = edad;
    }

    // ─────────────────────────────────────────────────────────────
    // GETTERS Y SETTERS
    // ─────────────────────────────────────────────────────────────

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    // ─────────────────────────────────────────────────────────────
    // MÉTODOS
    // ─────────────────────────────────────────────────────────────

    /**
     * Método toString() - Sobrescribe el de Object.
     * Todas las clases heredan toString() de Object.
     */
    @Override
    public String toString() {
        return "Persona [nombre=" + nombre + ", primerApellido=" + primerApellido 
               + ", segundoApellido=" + segundoApellido + ", dni=" + dni 
               + ", edad=" + edad + "]";
    }
}