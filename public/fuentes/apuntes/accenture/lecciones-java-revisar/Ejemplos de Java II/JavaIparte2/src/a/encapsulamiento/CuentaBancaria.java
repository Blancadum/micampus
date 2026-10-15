package a.encapsulamiento;

/**
 * ENCAPSULAMIENTO: Ocultar los datos (atributos private) y controlar
 * el acceso mediante métodos públicos (getters/setters)
 * 
 * VENTAJAS:
 * - Control sobre los datos (validaciones)
 * - Flexibilidad para cambiar implementación interna
 * - Mayor seguridad
 */
public class CuentaBancaria {
    // Atributos PRIVATE - NO accesibles desde fuera
    private String titular;
    private double saldo;
    private final String numeroCuenta; // Final: no se puede modificar después de inicializar
    
    // Constructor
    public CuentaBancaria(String titular, String numeroCuenta) {
        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.saldo = 0.0; // Saldo inicial
    }
    
    // GETTER para titular
    public String getTitular() {
        return titular;
    }
    
    // SETTER para titular (con validación)
    public void setTitular(String titular) {
        if (titular != null && !titular.isEmpty()) {
            this.titular = titular;
        }
    }
    
    // GETTER para saldo (solo lectura, NO setter)
    public double getSaldo() {
        return saldo;
    }
    
    // GETTER para número de cuenta (final, solo lectura)
    public String getNumeroCuenta() {
        return numeroCuenta;
    }
    
    // Método público para modificar saldo (CONTROL)
    public void depositar(double cantidad) {
        if (cantidad > 0) {
            saldo += cantidad;
            System.out.println("Depósito: " + cantidad + "€. Nuevo saldo: " + saldo + "€");
        } else {
            System.out.println("Error: cantidad debe ser positiva");
        }
    }
    
    // Método público para retirar (VALIDACIÓN)
    public void retirar(double cantidad) {
        if (cantidad > 0 && cantidad <= saldo) {
            saldo -= cantidad;
            System.out.println("Retiro: " + cantidad + "€. Nuevo saldo: " + saldo + "€");
        } else {
            System.out.println("Error: saldo insuficiente o cantidad inválida");
        }
    }
}