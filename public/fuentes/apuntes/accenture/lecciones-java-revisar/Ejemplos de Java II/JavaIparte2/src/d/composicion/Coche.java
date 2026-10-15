package d.composicion;

/**
 * COMPOSICIÓN vs HERENCIA:
 * - Herencia: "ES UN" (is-a) → Coche ES UN Vehículo
 * - Composición: "TIENE UN" (has-a) → Coche TIENE UN Volante
 * 
 * PREMISAS:
 * 1. Los objetos componentes DEBEN existir antes de crear el contenedor
 * 2. Sin los componentes, el contenedor NO puede funcionar
 * 3. Si el contenedor se destruye, los componentes también (mismo ciclo de vida)
 */
public class Coche {
    private String marca;
    private String modelo;
    
    // COMPOSICIÓN: Coche "TIENE UN" Volante y "TIENE UN" Motor
    private Volante volante; // Relación "tiene un..."
    private Motor motor;     // Relación "tiene un..."
    
    public Coche(String marca, String modelo) {
        this.marca = marca;
        this.modelo = modelo;
        
        // Los componentes se crean DENTRO del contenedor (agregación fuerte)
        this.volante = new Volante("OMP", "Cuero");
        this.motor = new Motor(4, 150);
    }
    
    public void arrancar() {
        System.out.println("\n--- Arrancando " + marca + " " + modelo + " ---");
        motor.arrancar(); // Delega en el componente
        System.out.println("Coche listo para conducir");
    }
    
    public void conducir(String direccion) {
        volante.girar(direccion); // Delega en el componente
        System.out.println("Conduciendo hacia la " + direccion);
    }
    
    public void apagar() {
        motor.apagar();
        System.out.println("Coche apagado");
    }
    
    // Getters para acceder a los componentes
    public Volante getVolante() {
        return volante;
    }
    
    public Motor getMotor() {
        return motor;
    }
}