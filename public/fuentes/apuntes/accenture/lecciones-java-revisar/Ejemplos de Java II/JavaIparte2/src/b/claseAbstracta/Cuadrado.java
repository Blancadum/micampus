package b.claseAbstracta;

/**
 * CLASE CONCRETA que hereda de FiguraGeometrica
 * DEBE implementar TODOS los métodos abstractos
 */
public class Cuadrado extends FiguraGeometrica {
    // Atributos propios
    private final int NUM_LADOS = 4; // Constante
    private double lado;
    
    // Constructor
    public Cuadrado(double lado) {
        super("Cuadrado"); // Llama al constructor del padre
        this.lado = lado;
    }
    
    // Getter y Setter
    public double getLado() {
        return lado;
    }
    
    public void setLado(double lado) {
        this.lado = lado;
    }
   
    // IMPLEMENTACIÓN del método abstracto (OBLIGATORIO)
    @Override
    public double calcularArea() {
        // Área = lado²
        return Math.pow(lado, 2);
    }
    
    // IMPLEMENTACIÓN del método abstracto (OBLIGATORIO)
    @Override
    public double calcularPerimetro() {
        // Perímetro = lado * 4
        return lado * NUM_LADOS;
    }
}