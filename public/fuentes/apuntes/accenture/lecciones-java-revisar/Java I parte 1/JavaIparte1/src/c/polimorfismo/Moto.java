package c.polimorfismo;

/**
 * Moto también extiende Vehiculo con su propia implementación.
 */
public class Moto extends Vehiculo {

    private int cilindrada;

    public Moto() {
    }

    public Moto(String marca, String modelo, int cilindrada) {
        super(marca, modelo);
        this.cilindrada = cilindrada;
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }

    @Override
    public void arrancar() {
        System.out.println("Arrancando la MOTO " + marca + " " + modelo + "...");
    }

    @Override
    public void mostrarInfo() {
        System.out.println("Moto: " + marca + " " + modelo + " (" + cilindrada + "cc)");
    }
}