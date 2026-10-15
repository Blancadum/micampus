package d.preguntas;

@SuppressWarnings("all")
public class Preguntas {

	
	public static void main(String[] args) {

        // pregunta01_SobrecargaSoloCambiaRetorno();
        // pregunta02_HeredarDeClaseFinal();
        // pregunta03_OverrideSinAnotacion();
        // pregunta04_AccesoMasRestrictivo();
        // pregunta05_PolimorfismoQueMuestraConsola();
        // pregunta06_ConstructorHijoSinSuperExplicito();
        // pregunta07_MetodosSobreescritosEnCadena();
    }

    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 1: SOBRECARGA
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta01_SobrecargaSoloCambiaRetorno() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 1: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        System.out.println("  class Calculadora {");
        System.out.println("      public void sumar(int a, int b) {");
        System.out.println("          System.out.println(a + b);");
        System.out.println("      }");
        System.out.println("");
        System.out.println("      public int sumar(int a, int b) {");
        System.out.println("          return a + b;");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO COMPILA                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  La firma de un método = nombre + parámetros                        │
        // │  El tipo de retorno NO forma parte de la firma.                     │
        // │                                                                     │
        // │  Ambos métodos tienen la MISMA firma: sumar(int, int)               │
        // │  Java no sabe cuál llamar → Error de compilación                    │
        // │                                                                     │
        // │  SOBRECARGA VÁLIDA: Cambiar número, tipo u orden de parámetros      │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        class Calculadora {
            public void sumar(int a, int b) {
                System.out.println(a + b);
            }

            public int sumar(int a, int b) {
                return a + b;
            }
        }
        
        
        System.out.println("  ❌ RESPUESTA: NO COMPILA");
        System.out.println("  → El tipo de retorno NO forma parte de la firma del método.");
        System.out.println("  → Ambos tienen la misma firma: sumar(int, int)");
        System.out.println("  → Java no sabría cuál de los dos llamar.\n");
        
        */
        
        
    }

    
    
    
    
    
    
    
    
    
    
    
    
       
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 2:
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta02_HeredarDeClaseFinal() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 2: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");

        System.out.println("  public final class Constantes {");
        System.out.println("      public static final double PI = 3.14159;");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public class MisConstantes extends Constantes {");
        System.out.println("      public static final double E = 2.71828;");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
  
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO COMPILA                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Una clase marcada como FINAL no puede tener clases hijas.          │
        // │  Es el "fin de la línea" de la jerarquía.                           │
        // │                                                                     │
        // │  Ejemplo real: La clase String en Java es final.                    │
        // │  No puedes hacer: class MiString extends String {}                  │
        // └─────────────────────────────────────────────────────────────────────┘
        /*
        
        System.out.println("  ❌ RESPUESTA: NO COMPILA");
        System.out.println("  → Una clase FINAL no puede ser extendida.");
        System.out.println("  → Ejemplo: String es final, no puedes heredar de ella.\n");
        
        */
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 3:
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta03_OverrideSinAnotacion() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 3: ¿Este código compila? ¿Qué imprime?");
        System.out.println("═══════════════════════════════════════════════════════════\n");

        System.out.println("  class Padre {");
        System.out.println("      public void saludar() {");
        System.out.println("          System.out.println(\"Hola desde Padre\");");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  class Hijo extends Padre {");
        System.out.println("      // Sin @Override");
        System.out.println("      public void saludar() {");
        System.out.println("          System.out.println(\"Hola desde Hijo\");");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  // En el main:");
        System.out.println("  Padre p = new Hijo();");
        System.out.println("  p.saludar();");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Qué imprime?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: SÍ COMPILA - Imprime "Hola desde Hijo"                  │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  @Override es OPCIONAL, es solo una ayuda para el compilador.       │
        // │  La sobrescritura funciona igual sin la anotación.                  │
        // │                                                                     │
        // │  ¿Para qué sirve @Override entonces?                                │
        // │  - Si te equivocas en la firma, el compilador te avisa              │
        // │  - Sin @Override, crearías un método nuevo sin darte cuenta         │
        // └─────────────────────────────────────────────────────────────────────┘
        /*
        
        Padre3 p = new Hijo3();
        System.out.print("  Resultado real: ");
        p.saludar();
        
        
        System.out.println("\n  ✓ RESPUESTA: SÍ COMPILA - Imprime \"Hola desde Hijo\"");
        System.out.println("  → @Override es OPCIONAL, solo ayuda al compilador.");
        System.out.println("  → Sin ella, la sobrescritura sigue funcionando.");
        System.out.println("  → Pero si la pones y NO sobrescribes, da error.\n");
        
        */
    }

    
    
    
    
    
    
    
    
    
    
    


        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 4:
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta04_AccesoMasRestrictivo() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 4: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");

        System.out.println("  class Animal {");
        System.out.println("      public void comer() {");
        System.out.println("          System.out.println(\"Animal comiendo\");");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  class Gato extends Animal {");
        System.out.println("      @Override");
        System.out.println("      private void comer() {  // ← Cambio a private");
        System.out.println("          System.out.println(\"Gato comiendo\");");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO COMPILA                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Al sobrescribir NO puedes hacer el método MÁS restrictivo.         │
        // │                                                                     │
        // │  Si el padre tiene public → el hijo NO puede tener private          │
        // │  Si el padre tiene protected → el hijo puede tener protected/public │
        // │                                                                     │
        // │  Orden (de menos a más restrictivo):                                │
        // │  public → protected → (default) → private                           │
        // │                                                                     │
        // │  ¿Por qué? Por el polimorfismo:                                     │
        // │  Animal a = new Gato();                                             │
        // │  a.comer(); // ¡Esperamos poder llamarlo! Es public en Animal       │
        // └─────────────────────────────────────────────────────────────────────┘
        /*

        System.out.println("  ❌ RESPUESTA: NO COMPILA");
        System.out.println("  → No puedes hacer un método MÁS restrictivo al sobrescribir.");
        System.out.println("  → Padre public → Hijo no puede ser private");
        System.out.println("  → Esto rompería el polimorfismo.\n");
        
        */
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 5: 
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta05_PolimorfismoQueMuestraConsola() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 5: ¿Qué imprime este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");

        System.out.println("  class Vehiculo {");
        System.out.println("      public void arrancar() {");
        System.out.println("          System.out.println(\"Arrancando vehículo\");");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  class Coche extends Vehiculo {");
        System.out.println("      @Override");
        System.out.println("      public void arrancar() {");
        System.out.println("          System.out.println(\"Arrancando coche\");");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  // En el main:");
        System.out.println("  Vehiculo v = new Coche();");
        System.out.println("  v.arrancar();");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿\"Arrancando vehículo\" o \"Arrancando coche\"?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: "Arrancando coche"                                      │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  En polimorfismo, el método que se ejecuta depende del              │
        // │  TIPO REAL del objeto (Coche), no del tipo de la variable (Vehiculo)│
        // │                                                                     │
        // │  Esto es el ENLACE DINÁMICO: se decide en tiempo de ejecución       │
        // └─────────────────────────────────────────────────────────────────────┘
        /*
             
        Vehiculo5 v = new Coche5();
        System.out.print("  Resultado real: ");
        v.arrancar();
        
        System.out.println("\n  ✓ RESPUESTA: \"Arrancando coche\"");
        System.out.println("  → El tipo REAL del objeto es Coche, no Vehiculo.");
        System.out.println("  → Se ejecuta el método del tipo real (enlace dinámico).\n");
        
        */
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 6: 
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta06_ConstructorHijoSinSuperExplicito() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 6: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");

        System.out.println("  class Persona {");
        System.out.println("      private String nombre;");
        System.out.println("      ");
        System.out.println("      public Persona(String nombre) {  // Solo este constructor");
        System.out.println("          this.nombre = nombre;");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  class Empleado extends Persona {");
        System.out.println("      public Empleado() {  // Constructor vacío");
        System.out.println("          // No llama a super(...)");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO COMPILA                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Java intenta llamar implícitamente a super() (sin parámetros)      │
        // │  Pero Persona NO tiene constructor sin parámetros.                  │
        // │                                                                     │
        // │  Solución: Llamar explícitamente al constructor del padre           │
        // │  public Empleado() {                                                │
        // │      super("Sin nombre");  // O el valor que corresponda            │
        // │  }                                                                  │
        // │                                                                     │
        // │  REGLA: Si el padre no tiene constructor vacío, el hijo DEBE        │
        // │  llamar explícitamente a super(...) con los parámetros correctos    │
        // └─────────────────────────────────────────────────────────────────────┘
        /*
        
        System.out.println("  ❌ RESPUESTA: NO COMPILA");
        System.out.println("  → Java busca super() implícito, pero Persona no lo tiene.");
        System.out.println("  → Solución: Llamar a super(\"valor\") explícitamente.\n");
        
        */
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 7: 
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta07_MetodosSobreescritosEnCadena() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 7: ¿Qué imprime este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");

        System.out.println("  class A {");
        System.out.println("      public String toString() { return \"A\"; }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  class B extends A {");
        System.out.println("      public String toString() { return super.toString() + \"B\"; }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  class C extends B {");
        System.out.println("      public String toString() { return super.toString() + \"C\"; }");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  // En el main:");
        System.out.println("  System.out.println(new C());");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué imprime? ¿\"C\"? ¿\"ABC\"? ¿\"CBA\"? ¿\"Nada\"?");
        System.out.println("───────────────────────────────────────────────────────────\n");

        
        
        
        
 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: "ABC"                                                   │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  C.toString() llama a super.toString() → B.toString()               │
        // │  B.toString() llama a super.toString() → A.toString()               │
        // │  A.toString() devuelve "A"                                          │
        // │  B añade "B" → "AB"                                                 │
        // │  C añade "C" → "ABC"                                                │
        // │                                                                     │
        // │  super.toString() sube en la cadena de herencia                     │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        System.out.print("  Resultado real: ");
        System.out.println(new C7());
        

        System.out.println("\n  ✓ RESPUESTA: \"ABC\"");
        System.out.println("  → super va subiendo por la jerarquía de clases.");
        System.out.println("  → C llama a B, B llama a A, se concatena al volver.\n");
        
        /*
        No veis nada raro aqui? System.out.println(new C9());
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
 
        
        
        
        
        
        
        Internamente, println() convierte automáticamente el objeto a String 
        llamando a su método toString().
        
        Es equivalente a hacer esto
        
        System.out.println(new C().toString());
        
        
        Por que pasa esto?
        
        El método println() está sobrecargado y tiene esta firma:
        
        public void println(Object obj) {
		    String s = String.valueOf(obj);  // ← Aquí está la magia
		    // ...
		}
		        
        Y String.valueOf(obj) internamente hace:
        
        public static String valueOf(Object obj) {
		    return (obj == null) ? "null" : obj.toString();  // ← Llama a toString()
		} 
        
        */
        
        
        
        
        
        
        
    
    }
}


















// ═══════════════════════════════════════════
// CLASES AUXILIARES
// ═══════════════════════════════════════════

// Pregunta 3
class Padre3 {
    public void saludar() {
        System.out.println("Hola desde Padre");
    }
}

class Hijo3 extends Padre3 {
    public void saludar() {
        System.out.println("Hola desde Hijo");
    }
}

// Pregunta 5
class Vehiculo5 {
    public void arrancar() {
        System.out.println("Arrancando vehículo");
    }
}

class Coche5 extends Vehiculo5 {
    @Override
    public void arrancar() {
        System.out.println("Arrancando coche");
    }
}

// Pregunta 7
class A7 {
    public String toString() { return "A"; }
}

class B7 extends A7 {
    public String toString() { return super.toString() + "B"; }
}

class C7 extends B7 {
    public String toString() { return super.toString() + "C"; }
}