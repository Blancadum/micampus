package d.composicion;

public class Motor {
    private int cilindros;
    private int potencia; // CV
    
    public Motor(int cilindros, int potencia) {
        this.cilindros = cilindros;
        this.potencia = potencia;
    }
    
    public void arrancar() {
        System.out.println("Motor de " + cilindros + " cilindros arrancado (" + potencia + "CV)");
    }
    
    public void apagar() {
        System.out.println("Motor apagado");
    }
}