package a.encapsulamiento;

public class MainEncapsulamiento {
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria("Juan Pérez", "ES1234567890");
        
        // NO se puede hacer: cuenta.saldo = 1000000; // ERROR: saldo es private
        // Debemos usar los métodos públicos
        
        cuenta.depositar(500);
        cuenta.retirar(200);
        cuenta.retirar(500); // Saldo insuficiente
        
        System.out.println("Titular: " + cuenta.getTitular());
        System.out.println("Saldo final: " + cuenta.getSaldo() + "€");
        
        // NO se puede cambiar: cuenta.numeroCuenta = "XXX"; // ERROR: es final
    }
}