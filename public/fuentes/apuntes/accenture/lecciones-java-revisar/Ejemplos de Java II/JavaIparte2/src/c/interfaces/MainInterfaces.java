package c.interfaces;

public class MainInterfaces {
    public static void main(String[] args) {
        // Volador v = new Volador(); // ERROR! No se puede instanciar interfaz
        
        Ave aguila = new Ave("Águila");
        aguila.volar();
        aguila.planear(); // Método default heredado
        aguila.aterrizar();
        
        System.out.println();
        
        Pinguino pingu = new Pinguino("Pingüino Emperor");
        pingu.volar(); // Implementado, pero con mensaje realista
        pingu.nadar();
        pingu.sumergirse();
        
        System.out.println();
        
        // POLIMORFISMO con interfaces
        Volador volador1 = new Ave("Halcón");
        Nadador nadador1 = new Pinguino("Pingüino de Humboldt");
        
        volador1.volar();
        nadador1.nadar();
    }
}