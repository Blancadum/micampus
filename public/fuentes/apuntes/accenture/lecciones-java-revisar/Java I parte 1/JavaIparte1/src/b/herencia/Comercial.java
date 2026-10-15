package b.herencia;

/**
 * ═══════════════════════════════════════════════════════════════
 * SOBRECARGA Y SOBRESCRITURA
 * ═══════════════════════════════════════════════════════════════
 * 
 * Comercial extiende de Empleado (herencia multinivel):
 * Object → Persona → Empleado → Comercial
 */
public class Comercial extends Empleado {

    private double comision;

    //porque se queja aqui sonar? *1
    public Comercial() {
    }

    public double getComision() {
        return comision;
    }

    public void setComision(double comision) {
        this.comision = comision;
    }

    // ═══════════════════════════════════════════════════════════════
    // SOBRECARGA (OVERLOADING) - Mismo nombre, DIFERENTE firma
    // ═══════════════════════════════════════════════════════════════
    // 
    // La FIRMA de un método = nombre + lista de parámetros
    // 
    // SOBRECARGA VÁLIDA cuando cambia:
    //   ✓ Número de parámetros
    //   ✓ Tipo de parámetros
    //   ✓ Orden de los tipos de parámetros
    //
    // ⚠️ TENER EN CUENTA: Cambiar SOLO el tipo de retorno NO es sobrecarga
    // ═══════════════════════════════════════════════════════════════

    /**
     * Versión 1: Un solo parámetro
     */
    public void calcularComision(double incrementoComision) {
        this.comision = this.comision + incrementoComision;
    }

    /**
     * Versión 2: Dos parámetros - SOBRECARGA VÁLIDA
     * (diferente número de parámetros)
     */
    public void calcularComision(double incrementoComision, double plusConvenio) {
        this.comision = this.comision + incrementoComision + plusConvenio;
    }

    // ═══════════════════════════════════════════════════════════════
    // SOBRESCRITURA (OVERRIDING) - Misma firma, DIFERENTE implementación
    // ═══════════════════════════════════════════════════════════════
    //
    // Reglas de la sobrescritura:
    //   ✓ Misma firma (nombre + parámetros)
    //   ✓ Mismo tipo de retorno (o subtipo - covariante)
    //   ✓ No puede ser MÁS restrictivo (si padre es public, hijo no puede ser private)
    //   ✗ No se pueden sobrescribir métodos static ni final
    //
    // ⚠️ @Override es OPCIONAL pero MUY RECOMENDADO
    //    (ayuda al compilador a detectar errores)
    // ═══════════════════════════════════════════════════════════════

    /**
     * Sobrescribimos actualizarSalario() de Empleado.
     * Ahora el salario se calcula diferente para un Comercial.
     */
    @Override
    public void actualizarSalario(double incremento) {
        // Guardamos el salario actual
        double salarioActual = this.getSalario();

        // Calculamos comisión según antigüedad
        if (this.getAntiguedad() <= 5) {
            calcularComision(25.0);  // Usa versión de 1 parámetro
        } else {
            calcularComision(25.0, 100.0);  // Usa versión de 2 parámetros
        }

        // Actualizamos salario = actual + incremento + comisión calculada
        this.setSalario(salarioActual + incremento + this.comision);
    }

    @Override
    public String toString() {
        return super.toString() + " → Comercial [comision=" + comision + "]";
    }
}










/*
 * 
 * 1 .  se queja sonar porque hay un constructor ya por defecto vacio, 
 * 		si creas uno es porque vas a hacer algo con el, sino lo dejamos
 * 		sin implementar para que coja el de or defecto
 * 		
 * 
 * 
 * 
 * 
 * 
 * 
 */









