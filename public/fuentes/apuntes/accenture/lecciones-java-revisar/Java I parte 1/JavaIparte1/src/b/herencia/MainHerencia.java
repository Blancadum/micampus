package b.herencia;

/**
 * ═══════════════════════════════════════════════════════════════
 * DEMO: HERENCIA EN ACCIÓN
 * ═══════════════════════════════════════════════════════════════
 * 
 * Ejecuta esta clase para ver cómo funciona la herencia.
 */
public class MainHerencia {

    public static void main(String[] args) {

        System.out.println("══════════════════════════════════════════════");
        System.out.println("  HERENCIA BÁSICA - Empleado hereda de Persona");
        System.out.println("════════════════════════════════════════════\n");

        // Creamos un Empleado (que ES-UNA Persona)
        Empleado emp1 = new Empleado();

        // Podemos usar métodos heredados de Persona
        emp1.setNombre("Rebeca");
        emp1.setPrimerApellido("Velasco");
        emp1.setSegundoApellido("González");
        emp1.setDni("12345678L");
        emp1.setEdad(30);

        // Y también los métodos propios de Empleado
        emp1.setAntiguedad(3);
        emp1.setPuesto("Analista");
        emp1.setSalario(1800.0);

        System.out.println("Empleado creado:");
        System.out.println(emp1);

        System.out.println("\n────────────────────────────────────────────");
        System.out.println("Actualizamos salario con incremento de 150€...");
        System.out.println("────────────────────────────────────────────\n");

        System.out.println("ANTES: Salario = " + emp1.getSalario());
        emp1.actualizarSalario(150.0);
        System.out.println("DESPUÉS: Salario = " + emp1.getSalario());

        System.out.println("\n══════════════════════════════════════");
        System.out.println("  SOBRECARGA Y SOBRESCRITURA - Comercial");
        System.out.println("══════════════════════════════════════\n");

        Comercial comercial = new Comercial();
        comercial.setNombre("Carlos");
        comercial.setPrimerApellido("García");
        comercial.setDni("87654321X");
        comercial.setEdad(35);
        comercial.setAntiguedad(7);  // > 5 años → usará calcularComision con 2 params
        comercial.setPuesto("Comercial Senior");
        comercial.setSalario(2000.0);
        comercial.setComision(0.0);

        System.out.println("Comercial creado:");
        System.out.println(comercial);

        System.out.println("\n───────────────────────────────────────-──────────");
        System.out.println("Actualizamos salario (usa el método SOBRESCRITO)....");
        System.out.println("Como tiene >5 años, aplica comisión 25 + 100 de plus");
        System.out.println("──────────────────────────────────────────────────\n");

        System.out.println("ANTES: Salario = " + comercial.getSalario() 
                         + ", Comisión = " + comercial.getComision());
        
        comercial.actualizarSalario(200.0);
        
        System.out.println("DESPUÉS: Salario = " + comercial.getSalario() 
                         + ", Comisión = " + comercial.getComision());

        System.out.println("\n═══════════════════════════════");
        System.out.println("  PALABRA SUPER - Acceso al padre");
        System.out.println("═══════════════════════════════\n");

        // El toString() de Comercial llama a super.toString()
        // que a su vez llama al super.toString() de Empleado (que es Persona)
        // Resultado: se encadenan todos los toString() de la jerarquía
        
        System.out.println("toString() encadenado con super:");
        System.out.println(comercial.toString());
    }
}