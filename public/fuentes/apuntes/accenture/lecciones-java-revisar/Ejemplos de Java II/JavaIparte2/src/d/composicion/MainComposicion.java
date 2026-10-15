package d.composicion;

public class MainComposicion {
    public static void main(String[] args) {
        // El Coche se crea Y dentro se crean sus componentes
        Coche miCoche = new Coche("Toyota", "Corolla");
        
        miCoche.arrancar();
        miCoche.conducir("derecha");
        miCoche.apagar();
        
        System.out.println();
        
        // Acceso encadenado a componentes (PREGUNTA TEST)
        System.out.println("Marca del volante: " + miCoche.getVolante().getMarca());
        
        // Si el coche se destruye, sus componentes (volante, motor) también
        miCoche = null; // El volante y motor ya no son accesibles
    }
}