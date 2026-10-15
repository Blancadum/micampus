package c.polimorfismo;

/**
 * ═══════════════════════════════════════════════════════════════
 * POLIMORFISMO - CLASE PADRE
 * ═══════════════════════════════════════════════════════════════
 * 
 * Polimorfismo = "muchas formas"
 * 
 * Una variable de tipo padre puede referenciar objetos de tipo hijo.
 * El comportamiento depende del TIPO REAL del objeto, no del tipo
 * de la variable de referencia.
 */
public class Vehiculo {

    protected String marca;
    protected String modelo;

    public Vehiculo() {
    }

    public Vehiculo(String marca, String modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }

    // ─────────────────────────────────────────────────────────────
    // Método que será SOBRESCRITO por las clases hijas
    // ─────────────────────────────────────────────────────────────

    public void arrancar() {
        System.out.println("Arrancando el vehículo genérico...");
    }

    // ─────────────────────────────────────────────────────────────
    // SOBRECARGA dentro de la misma clase (enlace ESTÁTICO)
    // ─────────────────────────────────────────────────────────────

    /**
     * Versión sin parámetros
     */
    public void acelerar() {
        System.out.println("Acelerando el vehículo...");
    }

    /**
     * Versión con parámetro - SOBRECARGA
     */
    public void acelerar(int kmh) {
        System.out.println("Acelerando a " + kmh + " km/h...");
    }

    public void mostrarInfo() {
        System.out.println("Vehículo: " + marca + " " + modelo);
    }
}