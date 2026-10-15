package b.claseAbstracta;

/**
 * CLASE ABSTRACTA: plantilla que define comportamiento común
 * 
 * REGLAS IMPORTANTES (TRAMPA):
 * 1. NO se puede instanciar (new FiguraGeometrica() = ERROR)
 * 2. Si una clase tiene UN método abstract → la clase DEBE ser abstract
 * 3. Las subclases DEBEN implementar métodos abstract (o ser abstract también)
 * 4. Puede tener métodos concretos (con cuerpo)
 * 5. Puede tener atributos y constructores
 */
public abstract class FiguraGeometrica {
    // Atributo común
    protected String nombre;
    
    // Constructor (las abstract SÍ pueden tener constructores)
    public FiguraGeometrica(String nombre) {
        this.nombre = nombre;
    }
    
    // Método ABSTRACTO (sin cuerpo, termina en ;)
    // Las subclases DEBEN implementarlo
    public abstract double calcularArea();
    
    public abstract double calcularPerimetro();
    
    // Método CONCRETO (con cuerpo)
    // Las subclases lo heredan tal cual
    public void mostrarInfo() {
        System.out.println("=== " + nombre + " ===");
        System.out.println("Área: " + calcularArea());
        System.out.println("Perímetro: " + calcularPerimetro());
    }
}