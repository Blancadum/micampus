package c.polimorfismo;

/**
 * Coche extiende Vehiculo y SOBRESCRIBE algunos métodos.
 */
public class Coche extends Vehiculo {

    private int numeroPuertas;

    public Coche() {
    }

    public Coche(String marca, String modelo, int numeroPuertas) {
        super(marca, modelo);
        this.numeroPuertas = numeroPuertas;
    }

    public int getNumeroPuertas() {
        return numeroPuertas;
    }

    public void setNumeroPuertas(int numeroPuertas) {
        this.numeroPuertas = numeroPuertas;
    }

    // ─────────────────────────────────────────────────────────────
    // SOBRESCRITURA - Enlace DINÁMICO (se resuelve en ejecución)
    // ─────────────────────────────────────────────────────────────

    @Override
    public void arrancar() {
        System.out.println("Arrancando el COCHE " + marca + " " + modelo + "...");
    }

    // ─────────────────────────────────────────────────────────────
    // SOBRECARGA adicional en la clase hija
    // ─────────────────────────────────────────────────────────────

    /**
     * Nueva sobrecarga que solo existe en Coche
     */
    public void acelerar(int kmh, String modo) {
        System.out.println("Acelerando en modo " + modo + " a " + kmh + " km/h");
    }

    @Override
    public void mostrarInfo() {
        System.out.println("Coche: " + marca + " " + modelo + " (" + numeroPuertas + " puertas)");
    }
}