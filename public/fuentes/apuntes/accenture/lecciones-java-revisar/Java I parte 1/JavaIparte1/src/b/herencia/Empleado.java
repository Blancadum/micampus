package b.herencia;

import a.modelo.Persona;

/**
 * ═══════════════════════════════════════════════════════════════
 * HERENCIA - CLASE HIJA (SUBCLASE)
 * ═══════════════════════════════════════════════════════════════
 * 
 * EXTENDS: Palabra reservada para heredar de otra clase.
 * 
 * Empleado "ES-UN" Persona → Relación de herencia.
 * 
 * ¿Qué hereda Empleado de Persona?
 *   ✓ Métodos públicos y protected
 *   ✓ Atributos públicos y protected
 *   ✗ NO hereda constructores
 *   ✗ NO hereda atributos/métodos privados directamente
 *     (pero accede vía getters/setters)
 */
public class Empleado extends Persona {

    // Atributos PROPIOS de Empleado (especializan la clase)
    private int antiguedad;
    private double salario;
    private String puesto;

    // ─────────────────────────────────────────────────────────────
    // CONSTRUCTORES
    // ─────────────────────────────────────────────────────────────

    /**
     * Constructor vacío.
     * Implícitamente llama a super() - el constructor vacío del padre.
     */
    public Empleado() {
        // super(); ← Java lo pone automáticamente si no lo escribes
    }

    /**
     * Constructor con parámetros.
     * Usamos super(...) para llamar al constructor del padre.
     */
    public Empleado(String nombre, String primerApellido, String dni, 
                    int edad, int antiguedad, double salario, String puesto) {
        // SUPER: Llama al constructor del padre con sus parámetros
        super(nombre, primerApellido, dni, edad);
        
        // Inicializamos los atributos propios de Empleado
        this.antiguedad = antiguedad;
        this.salario = salario;
        this.puesto = puesto;
    }

    // ─────────────────────────────────────────────────────────────
    // GETTERS Y SETTERS
    // ─────────────────────────────────────────────────────────────

    public int getAntiguedad() {
        return antiguedad;
    }

    public void setAntiguedad(int antiguedad) {
        this.antiguedad = antiguedad;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    // ─────────────────────────────────────────────────────────────
    // MÉTODOS PROPIOS
    // ─────────────────────────────────────────────────────────────

    /**
     * Método propio de Empleado.
     * Incrementa el salario con el valor recibido.
     */
    public void actualizarSalario(double incremento) {
        this.salario = this.salario + incremento;
    }

    /**
     * SOBRESCRITURA del toString() heredado de Persona.
     * 
     * super.toString() → Llama al toString() del padre (Persona)
     * y le concatenamos la info propia de Empleado.
     */
    @Override
    public String toString() {
        return super.toString() + " → Empleado [antiguedad=" + antiguedad 
               + ", salario=" + salario + ", puesto=" + puesto + "]";
    }
}