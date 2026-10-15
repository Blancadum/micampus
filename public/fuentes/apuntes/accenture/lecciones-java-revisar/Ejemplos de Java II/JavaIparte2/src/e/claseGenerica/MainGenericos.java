package e.claseGenerica;

public class MainGenericos {
    public static void main(String[] args) {
        System.out.println("=== GENÉRICOS CON TIPO LIMITADO ===\n");
        
        // Operaciones con Integer
        Operaciones<Integer> opI = new Operaciones<>();
        System.out.println("--- Operaciones con Integer ---");
        System.out.println("La suma es: " + opI.suma(5));
        System.out.println("La resta es: " + opI.resta(5));
        System.out.println("La multiplicación es: " + opI.producto(5));
        System.out.println("La división es: " + opI.division(5));
        
        System.out.println();
        
        // Operaciones con Double (IMPORTANTE: punto decimal, no coma)
        Operaciones<Double> opD = new Operaciones<>();
        System.out.println("--- Operaciones con Double ---");
        System.out.println("La suma es: " + opD.suma(12.34));
        System.out.println("La resta es: " + opD.resta(12.34));
        System.out.println("La multiplicación es: " + opD.producto(12.34));
        System.out.println("La división es: " + opD.division(12.34));
        
        System.out.println();
        
        // TRAMPA: Operaciones<String> opS = new Operaciones<>(); // ERROR!
        // String NO hereda de Number, solo funciona con tipos numéricos
        
        System.out.println("=== GENÉRICOS SIN LÍMITE ===\n");
        
        // Caja con String
        Caja<String> cajaTexto = new Caja<>();
        cajaTexto.setContenido("Java es genial");
        cajaTexto.mostrar();
        
        // Caja con Integer
        Caja<Integer> cajaNumero = new Caja<>();
        cajaNumero.setContenido(42);
        cajaNumero.mostrar();
        
        // No se pueden usar tipos primitivos
        // Caja<int> cajaError = new Caja<>(); // ERROR! Debe ser Integer, no int
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
//        Integer numero = 5;
//        System.out.println(numero.doubleValue());
        
        
        
        
        
        
        
        
        
    }
}