package d.excepciones;

public class MainExcepcionPropia {
    public static void main(String[] args) {
        System.out.println("=== EXCEPCIÓN PERSONALIZADA ===\n");
        
        try {
            dividir(10, 1);
        } catch (ExcepcionDividirUno e) {
            System.out.println("Excepción capturada: " + e.getMessage());
        }
        
        try {
            dividir(10, 2);
            System.out.println("División correcta: 10 / 2 = 5");
        } catch (ExcepcionDividirUno e) {
            System.out.println("Excepción capturada: " + e.getMessage());
        }
    }
    
    static void dividir(int a, int b) throws ExcepcionDividirUno {
        if (b == 1) {
            // Lanzar excepción personalizada
            throw new ExcepcionDividirUno("No voy a dividir entre uno");
        }
        
        System.out.println(a + " / " + b + " = " + (a / b));
    }
}