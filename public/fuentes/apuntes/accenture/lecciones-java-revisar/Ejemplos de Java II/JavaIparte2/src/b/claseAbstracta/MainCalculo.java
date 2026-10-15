package b.claseAbstracta;

public class MainCalculo {
    // Constantes para las figuras
    private static final double LADO_CUADRADO = 2.0;
    private static final double RADIO_CIRCULO = 3.0;
    
    public static void main(String[] args) {
        // FiguraGeometrica figura = new FiguraGeometrica(); // ERROR!
        // NO se puede instanciar una clase abstracta
        
        // Crear instancias de las clases concretas
        Cuadrado cuadrado = new Cuadrado(LADO_CUADRADO);
        Circulo circulo = new Circulo(RADIO_CIRCULO);
        
        // Mostrar información usando el método heredado
        cuadrado.mostrarInfo();
        System.out.println();
        circulo.mostrarInfo();
        
        // POLIMORFISMO con clases abstractas
        System.out.println("\n--- Polimorfismo ---");
        FiguraGeometrica figura1 = new Cuadrado(5.0); // Tipo padre, objeto hijo
        FiguraGeometrica figura2 = new Circulo(4.0);
        
        figura1.mostrarInfo();
        figura2.mostrarInfo();
    }
}