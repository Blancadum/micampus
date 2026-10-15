package e.preguntasExcepciones;

import java.io.IOException;

@SuppressWarnings("all")
public class PreguntasExcepciones {

    public static void main(String[] args) {
        // pregunta01_ThrowsVsThrow();
        // pregunta02_CheckedVsUnchecked();
        // pregunta03_CatchExceptionGenerico();
         pregunta04_FinallyConReturn();
        // pregunta05_PropagacionUnchecked();
        // pregunta06_MultipleCatchOrden();
        // pregunta07_FlujoCorrado();
        // pregunta08_ThrowsSinTryCatch();
        // pregunta09_ExcepcionNoCapturada();
        // pregunta10_CatchPadreAntesQueHijo();
    	// pregunta11_CatchThrowable();
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 1: THROWS VS THROW
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta01_ThrowsVsThrow() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 1: ¿Cuál es la diferencia entre throws y throw?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  A) throws arroja una excepción, throw indica el tipo");
        System.out.println("  B) throws indica el tipo de excepción que no maneja el método,");
        System.out.println("     throw arroja una excepción");
        System.out.println("  C) throws se usa en métodos, throw en constructores");
        System.out.println("  D) Son sinónimos, se pueden usar indistintamente");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuál es correcta?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: B) throws indica el tipo, throw arroja                  │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  throws: DECLARAR en la firma del método (después de los parámetros)│
        // │          public void metodo() throws IOException { }                │
        // │                                                                     │
        // │  throw:  LANZAR una excepción dentro del método                     │
        // │          throw new IOException("Error");                            │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        /*
        try {
            EjemploThrows1.metodoConThrows();
        } catch (IOException e) {
            System.out.println("Capturada: " + e.getMessage());
        }
        */
        
        /*
        System.out.println("  ✓ RESPUESTA: B");
        System.out.println("  → throws: DECLARAR (en la firma)");
        System.out.println("  → throw: LANZAR (dentro del método)\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 2: CHECKED VS UNCHECKED
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta02_CheckedVsUnchecked() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 2: ¿Cuál de estas es una excepción CHECKED?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  A) NullPointerException");
        System.out.println("  B) ArithmeticException");
        System.out.println("  C) IOException");
        System.out.println("  D) IllegalArgumentException");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Cuál es correcta?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: C) IOException                                          │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  CHECKED (heredan de Exception, NO de RuntimeException):            │
        // │  - IOException, SQLException, FileNotFoundException                 │
        // │  - OBLIGATORIO declararlas con throws o capturarlas con try-catch   │
        // │                                                                     │
        // │  UNCHECKED (heredan de RuntimeException):                           │
        // │  - NullPointerException, ArithmeticException, IllegalArgument...    │
        // │  - NO necesitan throws ni try-catch                                 │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // ═══════════════════════════════════════════════════════════════════════
        // CHECKED (obliga a tratar):
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // Esto NO compila sin try-catch o throws:
        EjemploChecked2.metodoChecked();  // ERROR de compilación
        
        // Forma correcta:
        try {
            EjemploChecked2.metodoChecked();
        } catch (IOException e) {
            System.out.println("Checked capturada: " + e.getMessage());
        }
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // UNCHECKED (no obliga a tratar):
        // ═══════════════════════════════════════════════════════════════════════
        
        // Esto SÍ compila sin try-catch:
   //     EjemploUnchecked2.metodoUnchecked();  // Compila, pero falla en ejecución
        
        /*
        System.out.println("  ✓ RESPUESTA: C) IOException");
        System.out.println("  → CHECKED: IOException, SQLException");
        System.out.println("  → UNCHECKED: NullPointer, Arithmetic, IllegalArgument\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 3: CATCH EXCEPTION GENÉRICO
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta03_CatchExceptionGenerico() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 3: ¿Qué captura este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  try {");
        System.out.println("      int x = 10 / 0;");
        System.out.println("  } catch (Exception e) {");
        System.out.println("      System.out.println(\"Capturado\");");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué captura?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: Captura ArithmeticException (y cualquier otra)          │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  catch (Exception e) captura CUALQUIER excepción porque             │
        // │  Exception es la clase padre de TODAS las excepciones.              │
        // │                                                                     │
        // │  Jerarquía:                                                         │
        // │  Exception → RuntimeException → ArithmeticException                 │
        // │  Exception → IOException                                            │
        // │                                                                     │
        // │  El catch del padre captura también a los hijos.                    │
        // └─────────────────────────────────────────────────────────────────────┘
        
        /*
        try {
            int x = 10 / 0;  // ArithmeticException
        } catch (Exception e) {
            System.out.println("Capturado: " + e.getClass().getSimpleName());
            // Imprime: Capturado: ArithmeticException
        }
        
        try {
            String s = null;
            s.length();  // NullPointerException
        } catch (Exception e) {
            System.out.println("Capturado: " + e.getClass().getSimpleName());
            // Imprime: Capturado: NullPointerException
        }
        */
        
        /*
        System.out.println("  ✓ RESPUESTA: Captura ArithmeticException (y cualquier otra)");
        System.out.println("  → Exception es la clase padre de TODAS las excepciones");
        System.out.println("  → catch (Exception) captura checked y unchecked\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 4: FINALLY CON RETURN
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta04_FinallyConReturn() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 4: ¿Qué devuelve este método?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  public int metodo() {");
        System.out.println("      try {");
        System.out.println("          return 1;");
        System.out.println("      } catch (Exception e) {");
        System.out.println("          return 2;");
        System.out.println("      } finally {");
        System.out.println("          return 3;");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué valor devuelve?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: Devuelve 3                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  El bloque finally SIEMPRE se ejecuta, incluso con return.          │
        // │  Si finally tiene un return, SOBRESCRIBE el return del try/catch.   │
        // │                                                                     │
        // │  Flujo:                                                             │
        // │  1. try devuelve 1                                                  │
        // │  2. finally se ejecuta y devuelve 3 (sobrescribe el 1)              │
        // │                                                                     │
        // │  ⚠️ MALA PRÁCTICA: No pongas return en finally, confunde mucho      │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        int resultado = EjemploFinally4.metodoConFinally();
        System.out.println("Resultado: " + resultado);  // Imprime: 3
        
        // Otro ejemplo: finally se ejecuta SIEMPRE
        int resultado2 = EjemploFinally4.metodoConExcepcion();
        System.out.println("Resultado2: " + resultado2);  // Imprime: 3 (no 2)
        
        
        /*
        System.out.println("  ✓ RESPUESTA: Devuelve 3");
        System.out.println("  → finally se ejecuta SIEMPRE, incluso con return");
        System.out.println("  → El return de finally sobrescribe el del try/catch\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 5: PROPAGACIÓN UNCHECKED
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta05_PropagacionUnchecked() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 5: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  public void metodoA() {");
        System.out.println("      throw new IllegalArgumentException(\"Error\");");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public void metodoB() {");
        System.out.println("      metodoA();  // Sin try-catch ni throws");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: SÍ compila                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  IllegalArgumentException es UNCHECKED (hereda de RuntimeException).│
        // │  Las excepciones unchecked:                                         │
        // │  - NO necesitan throws en la firma                                  │
        // │  - NO necesitan try-catch para llamar al método                     │
        // │  - Se propagan automáticamente hacia arriba                         │
        // │                                                                     │
        // │  Si nadie la captura, el programa muere, pero SÍ compila.           │
        // └─────────────────────────────────────────────────────────────────────┘
        
        // Esto compila perfectamente:
       // EjemploPropagacion5.metodoB();  // Compila, pero falla en ejecución
        
        /*
        System.out.println("  ✓ RESPUESTA: SÍ compila");
        System.out.println("  → IllegalArgumentException es UNCHECKED");
        System.out.println("  → No necesita throws ni try-catch\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 6: MÚLTIPLE CATCH - ORDEN
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta06_MultipleCatchOrden() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 6: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  try {");
        System.out.println("      int x = 10 / 0;");
        System.out.println("  } catch (Exception e) {");
        System.out.println("      System.out.println(\"Exception\");");
        System.out.println("  } catch (ArithmeticException e) {");
        System.out.println("      System.out.println(\"ArithmeticException\");");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO compila                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Los catch deben ir de más ESPECÍFICO a más GENÉRICO.               │
        // │                                                                     │
        // │  Exception es padre de ArithmeticException.                         │
        // │  Si pones Exception primero, captura TODAS las excepciones,         │
        // │  por lo que el catch de ArithmeticException nunca se ejecutará.     │
        // │                                                                     │
        // │  Error: "exception ArithmeticException has already been caught"     │
        // │                                                                     │
        // │  Orden correcto: Hijo primero, padre después                        │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // ═══════════════════════════════════════════════════════════════════════
        // ESTO NO COMPILA:
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // ❌ ORDEN INCORRECTO (NO COMPILA):
        try {
            int x = 10 / 0;
        } catch (Exception e) {
            System.out.println("Exception");
        } catch (ArithmeticException e) {  // ERROR: ya capturada arriba
            System.out.println("ArithmeticException");
        }
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // ORDEN CORRECTO:
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // ✓ ORDEN CORRECTO (hijo → padre):
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("ArithmeticException");  // Este se ejecuta
        } catch (Exception e) {
            System.out.println("Exception");
        }
        */
        
        /*
        System.out.println("  ❌ RESPUESTA: NO compila");
        System.out.println("  → Los catch van de más específico a más genérico");
        System.out.println("  → Exception es padre de ArithmeticException");
        System.out.println("  → Orden correcto: ArithmeticException → Exception\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 7: FLUJO CORTADO
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta07_FlujoCorrado() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 7: ¿Qué imprime este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  public void metodoA() throws IOException {");
        System.out.println("      throw new IOException(\"Error IO\");");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public void metodoB() {");
        System.out.println("      String s = null;");
        System.out.println("      s.length();  // NullPointerException");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public void metodoC() {");
        System.out.println("      try {");
        System.out.println("          metodoA();");
        System.out.println("          metodoB();");
        System.out.println("      } catch (Exception e) {");
        System.out.println("          System.out.println(\"Capturado: \" + e.getClass().getSimpleName());");
        System.out.println("      }");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué imprime? ¿Se ejecutan metodoA y metodoB?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: Imprime "Capturado: IOException"                        │
        // │             metodoB NUNCA SE EJECUTA                                │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  PECULIARIDAD IMPORTANTE:                                           │
        // │  En cuanto metodoA lanza IOException, el flujo va DIRECTO al catch. │
        // │  metodoB NUNCA llega a ejecutarse.                                  │
        // │                                                                     │
        // │  Muchos piensan que ambos métodos se ejecutan o que vuelve a        │
        // │  continuar después del que falló. ¡FALSO!                           │
        // │                                                                     │
        // │  Cuando salta una excepción, el flujo abandona el try inmediatamente│
        // │  y va al catch correspondiente.                                     │
        // └─────────────────────────────────────────────────────────────────────┘
        

        EjemploFlujo7.metodoC();
        // Salida:
        // 1. Ejecutando metodoA
        // 3. Capturado: IOException
        //
        // Nota: "2. Ejecutando metodoB" NUNCA se imprime
        
        /*
        System.out.println("\n  ✓ RESPUESTA: Imprime 'Capturado: IOException'");
        System.out.println("  → metodoB NUNCA se ejecuta");
        System.out.println("  → En cuanto salta la excepción, el flujo va al catch\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 8: THROWS SIN TRY-CATCH
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta08_ThrowsSinTryCatch() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 8: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  public void metodoA() throws IOException {");
        System.out.println("      throw new IOException(\"Error\");");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public void metodoB() throws IOException {");
        System.out.println("      metodoA();  // Sin try-catch");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: SÍ compila                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  IOException es CHECKED, por lo que metodoB tiene dos opciones:     │
        // │  1. Capturarla con try-catch                                        │
        // │  2. Propagarla con throws                                           │
        // │                                                                     │
        // │  metodoB eligió la opción 2: propagar con throws.                   │
        // │  Esto significa que el que llame a metodoB deberá manejarla.        │
        // │                                                                     │
        // │  La excepción viaja: metodoA → metodoB → quien llame a metodoB      │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // metodoB propaga la excepción, así que nosotros debemos manejarla:
        
        try {
            EjemploPropagaChecked8.metodoB();
        } catch (IOException e) {
            System.out.println("Capturada en main: " + e.getMessage());
        }
        
        
        /*
        System.out.println("  ✓ RESPUESTA: SÍ compila");
        System.out.println("  → metodoB propaga la excepción con throws");
        System.out.println("  → El que llame a metodoB deberá manejarla\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 9: EXCEPCIÓN NO CAPTURADA
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta09_ExcepcionNoCapturada() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 9: ¿Qué pasa si una excepción no es capturada?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  public void metodoA() {");
        System.out.println("      throw new RuntimeException(\"Error\");");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public void metodoB() {");
        System.out.println("      metodoA();  // Sin try-catch");
        System.out.println("  }");
        System.out.println("");
        System.out.println("  public static void main(String[] args) {");
        System.out.println("      metodoB();  // Sin try-catch");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Qué sucede?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: El programa MUERE (termina abruptamente)                │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  La excepción viaja: metodoA → metodoB → main                       │
        // │  Como nadie la captura, la JVM imprime el stack trace y termina.    │
        // │                                                                     │
        // │  Ejemplo de salida:                                                 │
        // │  Exception in thread "main" java.lang.RuntimeException: Error       │
        // │      at PreguntasExcepciones.metodoA(...)                           │
        // │      at PreguntasExcepciones.metodoB(...)                           │
        // │      at PreguntasExcepciones.main(...)                              │
        // │                                                                     │
        // │  El programa NO continúa después de esta línea.                     │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // ═══════════════════════════════════════════════════════════════════════
        // (¡OJO! Esto mata el programa):
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        System.out.println("Antes de llamar...");
        EjemploMuere9.metodoB();  // El programa muere aquí
        System.out.println("Después de llamar...");  // NUNCA se ejecuta
        */
        
        /*
        System.out.println("  ⚠️ RESPUESTA: El programa MUERE");
        System.out.println("  → La excepción sube hasta main sin ser capturada");
        System.out.println("  → La JVM imprime el stack trace y termina el programa\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 10: CATCH PADRE ANTES QUE HIJO
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta10_CatchPadreAntesQueHijo() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 10: ¿Este código compila?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  try {");
        System.out.println("      String s = null;");
        System.out.println("      s.length();");
        System.out.println("  } catch (RuntimeException e) {");
        System.out.println("      System.out.println(\"RuntimeException\");");
        System.out.println("  } catch (NullPointerException e) {");
        System.out.println("      System.out.println(\"NullPointerException\");");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  ¿Compila? ¿Por qué?");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: NO compila                                              │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  NullPointerException hereda de RuntimeException.                   │
        // │  Si pones RuntimeException primero, captura TODAS sus hijas,        │
        // │  incluida NullPointerException.                                     │
        // │                                                                     │
        // │  El segundo catch NUNCA se ejecutaría.                              │
        // │  Java no permite esto: "unreachable catch block"                    │
        // │                                                                     │
        // │  Orden correcto: Hijo primero, padre después                        │
        // │  catch (NullPointerException) → catch (RuntimeException)            │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // ═══════════════════════════════════════════════════════════════════════
        // ESTO NO COMPILA:
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // ❌ ORDEN INCORRECTO (NO COMPILA):
        try {
            String s = null;
            s.length();
        } catch (RuntimeException e) {
            System.out.println("RuntimeException");
        } catch (NullPointerException e) {  // ERROR: ya capturada arriba
            System.out.println("NullPointerException");
        }
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // ORDEN CORRECTO:
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // ✓ ORDEN CORRECTO (hijo → padre):
        try {
            String s = null;
            s.length();
        } catch (NullPointerException e) {
            System.out.println("NullPointerException");  // Este se ejecuta
        } catch (RuntimeException e) {
            System.out.println("RuntimeException");
        }
        */
        
        /*
        System.out.println("  ❌ RESPUESTA: NO compila");
        System.out.println("  → NullPointerException hereda de RuntimeException");
        System.out.println("  → El orden debe ser: hijo → padre");
        System.out.println("  → Correcto: NullPointer → RuntimeException\n");
        */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
 // ═══════════════════════════════════════════════════════════════════════════
    // PREGUNTA 11: CATCH THROWABLE
    // ═══════════════════════════════════════════════════════════════════════════
    static void pregunta11_CatchThrowable() {
        System.out.println("═══════════════════════════════════════════════════════════");
        System.out.println("  PREGUNTA 11: ¿Qué captura este código?");
        System.out.println("═══════════════════════════════════════════════════════════\n");
        
        System.out.println("  try {");
        System.out.println("      // código");
        System.out.println("  } catch (Throwable t) {");
        System.out.println("      System.out.println(\"Capturado: \" + t.getClass().getSimpleName());");
        System.out.println("  }");
        System.out.println("\n───────────────────────────────────────────────────────────");
        System.out.println("  A) Solo excepciones checked");
        System.out.println("  B) Solo excepciones unchecked");
        System.out.println("  C) Todas las excepciones (checked y unchecked)");
        System.out.println("  D) Todo: excepciones + errores de la JVM");
        System.out.println("───────────────────────────────────────────────────────────\n");
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // ┌─────────────────────────────────────────────────────────────────────┐
        // │  RESPUESTA: D) Todo: excepciones + errores de la JVM               │
        // ├─────────────────────────────────────────────────────────────────────┤
        // │  Throwable es la clase RAÍZ de toda la jerarquía de errores:       │
        // │                                                                     │
        // │  Throwable                                                          │
        // │  ├── Error (NO deberías capturar)                                   │
        // │  │   ├── OutOfMemoryError                                           │
        // │  │   ├── StackOverflowError                                         │
        // │  │   └── VirtualMachineError...                                     │
        // │  │                                                                  │
        // │  └── Exception                                                      │
        // │      ├── RuntimeException (unchecked)                               │
        // │      │   ├── NullPointerException                                   │
        // │      │   └── ArithmeticException...                                 │
        // │      └── IOException, SQLException... (checked)                     │
        // │                                                                     │
        // │   MALA PRÁCTICA: Capturar Throwable oculta errores graves           │
        // │     como OutOfMemoryError que NO deberías intentar manejar.         │
        // └─────────────────────────────────────────────────────────────────────┘
        
        
        // ═══════════════════════════════════════════════════════════════════════
        // DEMOSTRACIÓN: Throwable captura ERRORES de la JVM
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // Captura ArithmeticException (Exception → RuntimeException)
        try {
            int x = 10 / 0;
        } catch (Throwable t) {
            System.out.println("Capturado: " + t.getClass().getSimpleName());
            // Imprime: Capturado: ArithmeticException
        }
        
        // Captura StackOverflowError (Error → NO es Exception)
        try {
            EjemploThrowable11.metodoRecursivo();
        } catch (Throwable t) {
            System.out.println("Capturado: " + t.getClass().getSimpleName());
            // Imprime: Capturado: StackOverflowError
        }
        */
        
        // ═══════════════════════════════════════════════════════════════════════
        // COMPARACIÓN: Exception vs Throwable
        // ═══════════════════════════════════════════════════════════════════════
        
        /*
        // Con catch (Exception): NO captura Error
        try {
            EjemploThrowable11.metodoRecursivo();
        } catch (Exception e) {
            System.out.println("Capturado");  // NUNCA se ejecuta
        }
        // El programa MUERE con StackOverflowError
        
        // Con catch (Throwable): SÍ captura Error
        try {
            EjemploThrowable11.metodoRecursivo();
        } catch (Throwable t) {
            System.out.println("Capturado");  // SÍ se ejecuta
        }
        */
        
        /*
        System.out.println("  ✓ RESPUESTA: D) Todo: excepciones + errores de la JVM");
        System.out.println("  → Throwable es la clase raíz de Exception y Error");
        System.out.println("  → catch (Exception) captura solo excepciones");
        System.out.println("  → catch (Throwable) captura TODO (excepciones + errores)");
        System.out.println("  → MALA PRÁCTICA: oculta errores graves de la JVM\n"); 
    	// OutOfMemoryError → No hay memoria, poco puedes hacer
		// StackOverflowError → Recursión infinita, programa roto
		// NoClassDefFoundError → Falta una clase, no puede funcionar
        */
    
    }
   
    
}













































// ═══════════════════════════════════════════════════════════════════════════════
// CLASES AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════════





// ─────────────────────────────────────────────
// Pregunta 1 - throws vs throw
// ─────────────────────────────────────────────
class EjemploThrows1 {
    
    // throws: DECLARA que el método puede lanzar IOException
    static void metodoConThrows() throws IOException {
        System.out.println("Ejecutando método...");
        // throw: LANZA la excepción
        throw new IOException("Error de lectura");
    }
}





// ─────────────────────────────────────────────
// Pregunta 2 - Checked vs Unchecked
// ─────────────────────────────────────────────
class EjemploChecked2 {
    
    // IOException es CHECKED → obliga a declarar throws
    static void metodoChecked() throws IOException {
        throw new IOException("Soy checked");
    }
}

class EjemploUnchecked2 {
    
    // IllegalArgumentException es UNCHECKED → NO necesita throws
    static void metodoUnchecked() {
        throw new IllegalArgumentException("Soy unchecked");
    }
}





// ─────────────────────────────────────────────
// Pregunta 4 - Finally con return
// ─────────────────────────────────────────────
class EjemploFinally4 {
    
    static int metodoConFinally() {
        try {
            System.out.println("try: intentando return 1");
            return 1;
        } catch (Exception e) {
            System.out.println("catch: intentando return 2");
            return 2;
        } finally {
            System.out.println("finally: ejecutando return 3");
            return 3;  // Este SOBRESCRIBE el return del try
        }
    }
    
    static int metodoConExcepcion() {
        try {
            System.out.println("try: lanzando excepción");
            int x = 10 / 0;
            return 1;
        } catch (Exception e) {
            System.out.println("catch: intentando return 2");
            return 2;
        } finally {
            System.out.println("finally: ejecutando return 3");
            return 3;  // Este SOBRESCRIBE el return del catch
        }
    }
}





// ─────────────────────────────────────────────
// Pregunta 5 - Propagación Unchecked
// ─────────────────────────────────────────────
class EjemploPropagacion5 {
    
    static void metodoA() {
        // IllegalArgumentException es UNCHECKED → NO necesita throws
        throw new IllegalArgumentException("Error en A");
    }
    
    static void metodoB() {
        // Compila sin try-catch ni throws porque es UNCHECKED
        metodoA();
    }
}





// ─────────────────────────────────────────────
// Pregunta 7 - Flujo cortado (TRAMPA)
// ─────────────────────────────────────────────
class EjemploFlujo7 {
    
    static void metodoA() throws IOException {
        System.out.println("  1. Ejecutando metodoA");
        throw new IOException("Error IO");
    }
    
    static void metodoB() {
        System.out.println("  2. Ejecutando metodoB (NUNCA SE IMPRIME)");
        String s = null;
        s.length();
    }
    
    static void metodoC() {
        try {
            metodoA();  // Lanza IOException
            metodoB();  // NUNCA se ejecuta
        } catch (Exception e) {
            System.out.println("  3. Capturado: " + e.getClass().getSimpleName());
        }
    }
}





// ─────────────────────────────────────────────
// Pregunta 8 - Propagar checked con throws
// ─────────────────────────────────────────────
class EjemploPropagaChecked8 {
    
    static void metodoA() throws IOException {
        throw new IOException("Error en A");
    }
    
    // Propaga la excepción en lugar de capturarla
    static void metodoB() throws IOException {
        metodoA();  // Sin try-catch, pero con throws
    }
}





// ─────────────────────────────────────────────
// Pregunta 9 - Excepción no capturada (mata el programa)
// ─────────────────────────────────────────────
class EjemploMuere9 {
    
    static void metodoA() {
        throw new RuntimeException("Error fatal");
    }
    
    static void metodoB() {
        metodoA();  // Sin try-catch
    }
    
    // Si llamas a metodoB() desde main sin try-catch, el programa muere
}




//─────────────────────────────────────────────
//Pregunta 11 - Throwable (clase auxiliar)
//─────────────────────────────────────────────
class EjemploThrowable11 {
 
 // Provoca StackOverflowError (un Error, no Exception)
 static void metodoRecursivo() {
     metodoRecursivo();  // Recursión infinita → StackOverflowError
 }
 
 // Demuestra la diferencia
 static void demostrarDiferencia() {
     
     // catch (Exception) NO captura Error:
     System.out.println("Probando con catch (Exception):");
     try {
         metodoRecursivo();
     } catch (Exception e) {
         System.out.println("Capturado con Exception");  // NUNCA
     }
     
     // catch (Throwable) SÍ captura Error:
     System.out.println("Probando con catch (Throwable):");
     try {
         metodoRecursivo();
     } catch (Throwable t) {
         System.out.println("Capturado con Throwable: " + t.getClass().getSimpleName());
     }
 }
}