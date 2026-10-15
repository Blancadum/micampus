package b.claseAbstracta;

/**
 * Otra implementación concreta de FiguraGeometrica
 */
public class Circulo extends FiguraGeometrica {
    private double radio;
    
    public Circulo(double radio) {
        super("Círculo");
        this.radio = radio;
    }
    
    public double getRadio() {
        return radio;
    }
    
    public void setRadio(double radio) {
        this.radio = radio;
    }
    
    @Override
    public double calcularArea() {
        // Área = π * r²
        return Math.PI * Math.pow(radio, 2);
    }
    
    @Override
    public double calcularPerimetro() {
        // Perímetro = 2 * π * r
        return 2 * Math.PI * radio;
    }
}