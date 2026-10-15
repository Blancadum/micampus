package f.preguntas;

@SuppressWarnings("all")
public class Preguntas {
	public static void main(String[] args) {

	     pregunta01_InstanciarClaseAbstracta();
	    // pregunta02_HijaNoImplementaMetodoAbstract();
	    // pregunta03_InterfazConConstructor();
	    // pregunta04_AtributosEnInterfaces();
	    // pregunta05_HerenciaMultipleInterfaces();
	    // pregunta06_ComposicionCicloDeVida();
	    // pregunta07_GenericoTipoLimitado();
	    // pregunta08_GenericoTipoPrimitivo();
	    // pregunta09_AtributoFinalModificacion();
	    // pregunta10_EncapsulamientoAccesoDirecto();
	}



	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 1: ¿SE PUEDE INSTANCIAR UNA CLASE ABSTRACTA?
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta01_InstanciarClaseAbstracta() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 1: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");
	    System.out.println("  public abstract class Vehiculo {");
	    System.out.println("      public abstract void arrancar();");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  // En el main:");
	    System.out.println("  Vehiculo v = new Vehiculo();");
	    System.out.println("  v.arrancar();");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  NO se puede instanciar una clase abstracta con new.                │
	    // │  Las clases abstractas son plantillas incompletas.                  │
	    // │                                                                     │
	    // │  Solo puedes crear referencias de tipo abstracto que apunten        │
	    // │  a objetos de clases CONCRETAS:                                     │
	    // │                                                                     │
	    // │  Vehiculo v = new Coche(); // ✓ Coche extends Vehiculo             │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    
	    
	    // Vehiculo1 v = new Vehiculo1(); // ERROR: Vehiculo1 is abstract
	    
	    /*
	    System.out.println("  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → No se puede hacer 'new' de una clase abstract.");
	    System.out.println("  → Solo puedes crear instancias de clases concretas.");
	    System.out.println("  → Correcto: Vehiculo v = new Coche();\n");
	    */
	}




















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 2: ¿QUÉ PASA SI NO IMPLEMENTO UN MÉTODO ABSTRACTO?
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta02_HijaNoImplementaMetodoAbstract() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 2: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public abstract class Figura {");
	    System.out.println("      public abstract double calcularArea();");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  public class Triangulo extends Figura {");
	    System.out.println("      private double base;");
	    System.out.println("      private double altura;");
	    System.out.println("      ");
	    System.out.println("      // NO implementa calcularArea()");
	    System.out.println("  }");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Si una clase hereda de una clase abstracta y NO implementa         │
	    // │  TODOS los métodos abstractos, entonces esa clase DEBE ser          │
	    // │  declarada como abstract también.                                   │
	    // │                                                                     │
	    // │  Opciones:                                                          │
	    // │  1. Implementar calcularArea() en Triangulo                         │
	    // │  2. Declarar Triangulo como abstract class                          │
	    // │                                                                     │
	    // │  Error de compilación: "Triangulo is not abstract and does not      │
	    // │  override abstract method calcularArea() in Figura"                 │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    /*
	    	Abajo en las clases auxiliares esta
	    
	    
	    System.out.println("  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → Si heredas de abstract y NO implementas el método,");
	    System.out.println("  → tu clase DEBE ser abstract también.");
	    System.out.println("  → Opción 1: Implementar calcularArea()");
	    System.out.println("  → Opción 2: Declarar Triangulo como abstract\n");
	    */
	}






















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 3: ¿PUEDE UNA INTERFAZ TENER CONSTRUCTORES?
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta03_InterfazConConstructor() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 3: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public interface Volador {");
	    System.out.println("      ");
	    System.out.println("      public Volador() {  // Constructor");
	    System.out.println("          System.out.println(\"Creando Volador\");");
	    System.out.println("      }");
	    System.out.println("      ");
	    System.out.println("      void volar();");
	    System.out.println("  }");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Las interfaces NO pueden tener constructores.                      │
	    // │                                                                     │
	    // │  ¿Por qué?                                                          │
	    // │  - Las interfaces no se instancian (no puedes hacer new Volador())  │
	    // │  - Son contratos que definen comportamiento                         │
	    // │  - No tienen estado propio que inicializar                          │
	    // │                                                                     │
	    // │  Error de compilación: "Interfaces cannot have constructors"        │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    /*
	    	Abajo en las clases auxiliares esta
	    
	    System.out.println("  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → Las interfaces NO pueden tener constructores.");
	    System.out.println("  → No se pueden instanciar, son solo contratos.");
	    System.out.println("  → Error: 'Interfaces cannot have constructors'\n");
	    */
	}





















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 4: ATRIBUTOS EN INTERFACES - ¿QUÉ TIPO SON?
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta04_AtributosEnInterfaces() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 4: ¿Qué tipo de variable es esta?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public interface Constantes {");
	    System.out.println("      int MAX_INTENTOS = 3;");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  public class Login implements Constantes {");
	    System.out.println("      public void intentar() {");
	    System.out.println("          MAX_INTENTOS = 5;  // ¿Se puede modificar?");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Qué tipo es MAX_INTENTOS?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Todos los atributos en interfaces son implícitamente:              │
	    // │  → public static final (CONSTANTES)                                 │
	    // │                                                                     │
	    // │  Aunque no lo escribas, Java lo añade automáticamente:              │
	    // │  public static final int MAX_INTENTOS = 3;                          │
	    // │                                                                     │
	    // │  Por tanto, NO se puede modificar (es final).                       │
	    // │  Error: "cannot assign a value to final variable MAX_INTENTOS"      │
	    // │                                                                     │
	    // │  Se accede así: Constantes.MAX_INTENTOS (como static)               │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    
	    System.out.println("  MAX_INTENTOS vale: " + Constantes4.MAX_INTENTOS);
	    	     
	    /*
	    System.out.println("\n  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → Todos los atributos en interfaces son:");
	    System.out.println("  → public static final (constantes)");
	    System.out.println("  → NO se pueden modificar.\n");
	    */
	}























	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 5: ¿SE PUEDEN IMPLEMENTAR MÚLTIPLES INTERFACES?
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta05_HerenciaMultipleInterfaces() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 5: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  interface Volador {");
	    System.out.println("      void volar();");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  interface Nadador {");
	    System.out.println("      void nadar();");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  abstract class Animal {");
	    System.out.println("      public abstract void comer();");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  public class Pato extends Animal implements Volador, Nadador {");
	    System.out.println("      public void volar() { System.out.println(\"Volando\"); }");
	    System.out.println("      public void nadar() { System.out.println(\"Nadando\"); }");
	    System.out.println("      public void comer() { System.out.println(\"Comiendo\"); }");
	    System.out.println("  }");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: SÍ COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Una clase puede:                                                   │
	    // │  → Heredar de UNA SOLA clase (extends Animal)                       │
	    // │  → Implementar MÚLTIPLES interfaces (implements Volador, Nadador)   │
	    // │                                                                     │
	    // │  Java NO permite herencia múltiple de CLASES:                       │
	    // │  ❌ class Pato extends Animal, Otro { }  // ERROR                   │
	    // │                                                                     │
	    // │  Pero SÍ permite múltiples interfaces:                              │
	    // │  ✓ class Pato implements Volador, Nadador, Corredor { }            │
	    // │                                                                     │
	    // │  Esta es la solución de Java a la herencia múltiple.                │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    

//	    Pato5 pato = new Pato5();
//	    pato.volar();
//	    pato.nadar();
//	    pato.comer();
	    
	    /*
	    System.out.println("\n  ✓ RESPUESTA: SÍ COMPILA");
	    System.out.println("  → Una clase puede heredar de UNA clase");
	    System.out.println("  → pero implementar MÚLTIPLES interfaces.");
	    System.out.println("  → Esta es la solución de Java a la herencia múltiple.\n");
	    */
	}






















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 6: COMPOSICIÓN - CICLO DE VIDA
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta06_ComposicionCicloDeVida() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 6: ¿Qué pasa con el Motor?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  class Motor {");
	    System.out.println("      public void arrancar() {");
	    System.out.println("          System.out.println(\"Motor arrancado\");");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  class Coche {");
	    System.out.println("      private Motor motor;  // Composición");
	    System.out.println("      ");
	    System.out.println("      public Coche() {");
	    System.out.println("          motor = new Motor();  // Motor se crea dentro");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  // En el main:");
	    System.out.println("  Coche miCoche = new Coche();");
	    System.out.println("  miCoche = null;  // ¿Qué pasa con el motor?");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿El motor sigue existiendo?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO, el motor también se destruye                        │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  En COMPOSICIÓN, los componentes tienen el MISMO ciclo de vida      │
	    // │  que el contenedor.                                                 │
	    // │                                                                     │
	    // │  Cuando el Coche se destruye (miCoche = null):                      │
	    // │  → El motor queda sin referencias                                   │
	    // │  → El Garbage Collector lo elimina de memoria                       │
	    // │                                                                     │
	    // │  Premisas de composición:                                           │
	    // │  1. Los componentes se crean DENTRO del contenedor                  │
	    // │  2. Sin el contenedor, los componentes NO existen                   │
	    // │  3. Si el contenedor muere, los componentes también                 │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	 

//	    Coche6 miCoche = new Coche6();
//	    miCoche.mostrarInfo();
//	    miCoche = null;
//	    System.out.println("Coche destruido → Motor también se destruye");
	    
	    /*
	    System.out.println("\n  ✓ RESPUESTA: NO, el motor también se destruye");
	    System.out.println("  → En composición, el componente tiene el mismo");
	    System.out.println("  → ciclo de vida que el contenedor.");
	    System.out.println("  → Si el Coche se destruye, el Motor también.\n");
	    */
	}





















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 7: GENÉRICOS - TIPO LIMITADO
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta07_GenericoTipoLimitado() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 7: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public class Calculadora<T extends Number> {");
	    System.out.println("      public double sumar(T numero) {");
	    System.out.println("          return numero.doubleValue() + 10;");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  // En el main:");
	    System.out.println("  Calculadora<String> calc = new Calculadora<>();");
	    System.out.println("  System.out.println(calc.sumar(\"5\"));");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  <T extends Number> significa que T solo puede ser un tipo          │
	    // │  que herede de Number:                                              │
	    // │  → Integer, Double, Float, Long, Short, Byte                        │
	    // │                                                                     │
	    // │  String NO hereda de Number, por tanto da error:                    │
	    // │  "Type argument 'String' is not within bounds of type-variable 'T'" │
	    // │                                                                     │
	    // │  Usos válidos:                                                      │
	    // │  ✓ Calculadora<Integer> calc = new Calculadora<>();                │
	    // │  ✓ Calculadora<Double> calc = new Calculadora<>();                 │
	    // │  ❌ Calculadora<String> calc = new Calculadora<>();                │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    
	    // ESTO SÍ COMPILA
//	    Calculadora7<Integer> calcInt = new Calculadora7<>();
//	    System.out.println("Sumar 5 + 10 = " + calcInt.sumar(5));
//	    
//	    Calculadora7<Double> calcDouble = new Calculadora7<>();
//	    System.out.println("Sumar 3.5 + 10 = " + calcDouble.sumar(3.5));
//	    
//	    // ESTO NO COMPILA
//	     Calculadora7<String> calcString = new Calculadora7<>();
//	     System.out.println(calcString.sumar("5"));
	    
	    /*
	    System.out.println("\n  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → <T extends Number> solo acepta tipos numéricos.");
	    System.out.println("  → String NO hereda de Number.");
	    System.out.println("  → Válidos: Integer, Double, Float, Long...\n");
	    */
	}





















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 8: GENÉRICOS - TIPOS PRIMITIVOS
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta08_GenericoTipoPrimitivo() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 8: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public class Caja<T> {");
	    System.out.println("      private T contenido;");
	    System.out.println("      ");
	    System.out.println("      public void guardar(T item) {");
	    System.out.println("          contenido = item;");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  // En el main:");
	    System.out.println("  Caja<int> cajaNumeros = new Caja<>();");
	    System.out.println("  cajaNumeros.guardar(42);");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Los genéricos NO aceptan tipos PRIMITIVOS.                         │
	    // │                                                                     │
	    // │  ❌ Caja<int> → ERROR                                               │
	    // │  ❌ Caja<double> → ERROR                                            │
	    // │  ❌ Caja<boolean> → ERROR                                           │
	    // │                                                                     │
	    // │  Debes usar WRAPPER CLASSES (clases envoltorio):                    │
	    // │  ✓ Caja<Integer> → OK                                               │
	    // │  ✓ Caja<Double> → OK                                                │
	    // │  ✓ Caja<Boolean> → OK                                               │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    
	    // ESTO SÍ COMPILA
//	    Caja8<Integer> cajaNumeros = new Caja8<>();
//	    cajaNumeros.guardar(42);
//	    System.out.println("Contenido: " + cajaNumeros.getContenido());
	    
	    // ESTO NO COMPILA
//	     Caja8<int> cajaError = new Caja8<>();
	    
	    /*
	    System.out.println("\n  RESPUESTA: NO COMPILA");
	    System.out.println("  → Los genéricos NO aceptan tipos primitivos.");
	    System.out.println("  → Usa wrapper classes: Integer, Double, Boolean...");
	    System.out.println("  → Correcto: Caja<Integer> cajaNumeros = new Caja<>();\n");
	    */
	}






















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 9: ¿SE PUEDE MODIFICAR UN ATRIBUTO FINAL?
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta09_AtributoFinalModificacion() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 9: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public class Persona {");
	    System.out.println("      private final String DNI;");
	    System.out.println("      private String nombre;");
	    System.out.println("      ");
	    System.out.println("      public Persona(String dni, String nombre) {");
	    System.out.println("          this.DNI = dni;");
	    System.out.println("          this.nombre = nombre;");
	    System.out.println("      }");
	    System.out.println("      ");
	    System.out.println("      public void setDNI(String nuevoDni) {");
	    System.out.println("          this.DNI = nuevoDni;  // ¿Se puede?");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Los atributos marcados como FINAL no se pueden modificar           │
	    // │  después de su inicialización.                                      │
	    // │                                                                     │
	    // │  Un atributo final SOLO se puede asignar:                           │
	    // │  1. En su declaración: private final String DNI = "12345678A";      │
	    // │  2. En el constructor: this.DNI = dni;                              │
	    // │                                                                     │
	    // │  Después de eso, es INMUTABLE.                                      │
	    // │  Error: "cannot assign a value to final variable DNI"               │
	    // │                                                                     │
	    // │  Por eso, NO deberías crear un setter para un atributo final.       │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    
	    // Ejemplo funcional (descomenta):
//	    Persona9 p = new Persona9("12345678A", "Juan");
//	    System.out.println("DNI: " + p.getDNI()); // ✓ getter funciona
//	    
//	    // DESCOMENTA setDNI EN PERSONA9 PARA VER EL ERROR:
//	     p.setDNI("99999999Z"); // ERROR: cannot assign to final
	    
	    /*
	    System.out.println("\n  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → Los atributos final NO se pueden modificar");
	    System.out.println("  → después de su inicialización.");
	    System.out.println("  → Solo en declaración o constructor.\n");
	    */
	}





















	// ═══════════════════════════════════════════════════════════════════════════
	// PREGUNTA 10: ENCAPSULAMIENTO - ACCESO DIRECTO A ATRIBUTOS
	// ═══════════════════════════════════════════════════════════════════════════
	static void pregunta10_EncapsulamientoAccesoDirecto() {
	    System.out.println("═══════════════════════════════════════════════════════════");
	    System.out.println("  PREGUNTA 10: ¿Este código compila?");
	    System.out.println("═══════════════════════════════════════════════════════════\n");

	    System.out.println("  public class CuentaBancaria {");
	    System.out.println("      private double saldo;");
	    System.out.println("      ");
	    System.out.println("      public CuentaBancaria() {");
	    System.out.println("          saldo = 0.0;");
	    System.out.println("      }");
	    System.out.println("      ");
	    System.out.println("      public void depositar(double cantidad) {");
	    System.out.println("          saldo += cantidad;");
	    System.out.println("      }");
	    System.out.println("  }");
	    System.out.println("");
	    System.out.println("  // En otra clase:");
	    System.out.println("  CuentaBancaria cuenta = new CuentaBancaria();");
	    System.out.println("  cuenta.saldo = 1000000;");
	    System.out.println("\n───────────────────────────────────────────────────────────");
	    System.out.println("  ¿Compila? ¿Por qué?");
	    System.out.println("───────────────────────────────────────────────────────────\n");

	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // ┌─────────────────────────────────────────────────────────────────────┐
	    // │  RESPUESTA: NO COMPILA                                              │
	    // ├─────────────────────────────────────────────────────────────────────┤
	    // │  Los atributos PRIVATE solo son accesibles dentro de su propia      │
	    // │  clase, NO desde otras clases.                                      │
	    // │                                                                     │
	    // │  Error: "saldo has private access in CuentaBancaria"                │
	    // │                                                                     │
	    // │  Este es el ENCAPSULAMIENTO:                                        │
	    // │  - Ocultar los datos (private)                                      │
	    // │  - Controlar el acceso mediante métodos públicos                    │
	    // │                                                                     │
	    // │  Forma correcta:                                                    │
	    // │  cuenta.depositar(1000);  // ✓ Método público con control          │
	    // │                                                                     │
	    // │  Modificadores de acceso (de más a menos restrictivo):              │
	    // │  private → (default) → protected → public                           │
	    // └─────────────────────────────────────────────────────────────────────┘
	    
	    
	    // FORMA CORRECTA
//	    CuentaBancaria10 cuenta = new CuentaBancaria10();
//	    cuenta.depositar(1000); // ✓ Método público
//	    System.out.println("Saldo: " + cuenta.getSaldo());
//	    
//	    // ESTO NO COMPILA
//	     cuenta.saldo = 1000000; // ERROR: saldo is not visible
	    
	    /*
	    System.out.println("\n  ❌ RESPUESTA: NO COMPILA");
	    System.out.println("  → Los atributos private NO son accesibles desde fuera.");
	    System.out.println("  → Este es el ENCAPSULAMIENTO: ocultar datos.");
	    System.out.println("  → Usa métodos públicos: cuenta.depositar(1000);\n");
	    */
	}
}







































//═══════════════════════════════════════════
//CLASES AUXILIARES
//═══════════════════════════════════════════
//─────────────────────────────────────────────
//Pregunta 1
//─────────────────────────────────────────────

 abstract class Vehiculo1 { public abstract void arrancar(); }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
//─────────────────────────────────────────────
//Pregunta 2
//─────────────────────────────────────────────
  abstract class Figura2 { 
	  public abstract double calcularArea(); 
  } 
  
/*
  class Triangulo2 extends Figura2 { 
   private double base; 
   private double altura; 
   // NO implementa calcularArea() → ERROR 
   } 
  */
  
  // SOLUCIÓN 1: Implementar el método 
  /*
  class TrianguloOK extends Figura2 
  { 
	  private double base = 5; 
	  private double altura = 3;
 
  
	  @Override 
	  public double calcularArea() { 
		  return (base * altura) / 2; 
	  } 
  } 
  */
  
  /*
  // SOLUCIÓN 2: Declarar como abstract 
  abstract class TrianguloAbstract extends Figura2 { 
	  private double base; 
	  private double altura; 
	  //Puede NO implementar calcularArea() si es abstract 
  }
  */
 
  
  
  
  
  
  
  
//─────────────────────────────────────────────
//Pregunta 3
//─────────────────────────────────────────────
  
/*
	interface Volador3 {
		public Volador3() {  // ERROR: Interfaces cannot have constructors
			System.out.println("Creando Volador");
		}

		void volar();
	}

	// CORRECTO: Interfaz sin constructor
	interface VoladorOK {
		void volar();
	}

	class Ave implements VoladorOK {
		public void volar() {
			System.out.println("Volando...");
		}
	}
*/
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
	//─────────────────────────────────────────────
	//Pregunta 4
	//─────────────────────────────────────────────
	interface Constantes4 {
		int MAX_INTENTOS = 3; // Implícitamente: public static final
	}

/*	
	class Login4 implements Constantes4 {
		public void intentar() { 
			MAX_INTENTOS = 5; // ERROR: cannot assign to final variable 
		 }
	}
*/
	//✓ CORRECTO: Leer la constante, no modificarla
	class LoginOK implements Constantes4 {
		public void intentar() {
			System.out.println("Intentos permitidos: " + MAX_INTENTOS);
		}
	}
































//─────────────────────────────────────────────
//Pregunta 5
//─────────────────────────────────────────────
interface Volador5 {
	void volar();
}

interface Nadador5 {
	void nadar();
}

abstract class Animal5 {
	public abstract void comer();
}

//✓ ESTO SÍ COMPILA
class Pato5 extends Animal5 implements Volador5, Nadador5 {
    public void volar() { System.out.println("Volando"); }
    public void nadar() { System.out.println("Nadando"); }
    public void comer() { System.out.println("Comiendo"); }
}







































//─────────────────────────────────────────────
//Pregunta 6
//─────────────────────────────────────────────
class Motor6 {
	public void arrancar() {
		System.out.println("Motor arrancado");
	}
}

class Coche6 {
	private Motor6 motor; // Composición

	public Coche6() {
		motor = new Motor6(); // Motor se crea dentro
		System.out.println("Coche creado con su motor");
	}

	public void mostrarInfo() {
		System.out.println("Coche funcionando");
		motor.arrancar();
	}
}





























//─────────────────────────────────────────────
//Pregunta 7
//─────────────────────────────────────────────
class Calculadora7<T extends Number> {
	public double sumar(T numero) {
		return numero.doubleValue() + 10;
	}
}










































//─────────────────────────────────────────────
//Pregunta 8
//─────────────────────────────────────────────
class Caja8<T> {
	private T contenido;

	public void guardar(T item) {
		contenido = item;
	}

	public T getContenido() {
		return contenido;
	}
}
































//─────────────────────────────────────────────
//Pregunta 9
//─────────────────────────────────────────────
class Persona9 {
	private final String DNI;
	private String nombre;

	public Persona9(String dni, String nombre) {
		this.DNI = dni; // ✓ OK: asignación en constructor
		this.nombre = nombre;
	}

	public String getDNI() {
		return DNI;
	}

//❌ DESCOMENTA PARA VER EL ERROR:
//public void setDNI(String nuevoDni) {
//  this.DNI = nuevoDni; // ERROR: cannot assign to final
//}
}
































//─────────────────────────────────────────────
//Pregunta 10
//─────────────────────────────────────────────
class CuentaBancaria10 {
	private double saldo; // ← PRIVATE

	public CuentaBancaria10() {
		saldo = 0.0;
	}

	public void depositar(double cantidad) {
		if (cantidad > 0) {
			saldo += cantidad;
		}
	}

	public double getSaldo() {
		return saldo;
	}

//NO hay setSaldo() directo → Control total
}




















































/*
 * En un archivo .java solo puede haber UNA clase public 
 * y debe llamarse igual que el archivo.
 * 
 * 
 * 
 * Los 4 niveles de acceso en Java (de más a menos restrictivo):
 * 
//1. PRIVATE (más restrictivo)
private class Ejemplo { }  // Solo dentro de la misma clase

//2. DEFAULT / PACKAGE-PRIVATE (sin palabra clave)
class Ejemplo { }  // ← Accesible SOLO dentro del mismo paquete

//3. PROTECTED
protected class Ejemplo { }  // Mismo paquete + subclases en otros paquetes

//4. PUBLIC (menos restrictivo)
public class Ejemplo { }  // Accesible desde cualquier lugar
*/

