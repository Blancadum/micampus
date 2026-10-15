package g.avanzado;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;

/**
 * ============================================================================
 * REFLECTION EN JAVA
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                        ¿QUÉ ES REFLECTION?                              │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ Reflection es la capacidad de un programa de EXAMINAR y MODIFICAR      │
 * │ su propia estructura y comportamiento en tiempo de EJECUCIÓN.          │
 * │                                                                         │
 * │ Permite:                                                                │
 * │   • Inspeccionar clases, métodos, campos, constructores                │
 * │   • Crear instancias de clases sin conocerlas en compilación           │
 * │   • Invocar métodos dinámicamente                                       │
 * │   • Acceder a miembros privados (¡saltándose el encapsulamiento!)      │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                     CLASES PRINCIPALES (java.lang.reflect)              │
 * ├──────────────────┬──────────────────────────────────────────────────────┤
 * │ Class<T>         │ Representa una clase o interfaz                      │
 * │ Field            │ Representa un atributo/campo de una clase            │
 * │ Method           │ Representa un método de una clase                    │
 * │ Constructor<T>   │ Representa un constructor de una clase               │
 * │ Modifier         │ Utilidades para decodificar modificadores (public..) │
 * │ Array            │ Utilidades para crear y manipular arrays             │
 * └──────────────────┴──────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                        ¿CUÁNDO SE USA?                                  │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ • Frameworks (Spring, Hibernate, JUnit)                                 │
 * │ • Inyección de dependencias                                             │
 * │ • Serialización/Deserialización (JSON, XML)                             │
 * │ • IDEs (autocompletado, refactoring)                                    │
 * │ • Testing (acceder a miembros privados)                                 │
 * │ • Plugins y extensiones dinámicas                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 */
public class ReflexionAvanzado {

    public static void main(String[] args) throws Exception {
        System.out.println("╔══════════════════════════════════════════════════════════╗");
        System.out.println("║              REFLECTION EN JAVA                          ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝\n");
        
        System.out.println("=== 1. OBTENER OBJETO CLASS ===\n");
        obtenerClase();
        
        System.out.println("\n=== 2. INSPECCIONAR CAMPOS (FIELDS) ===\n");
        inspeccionarCampos();
        
        System.out.println("\n=== 3. INSPECCIONAR MÉTODOS ===\n");
        inspeccionarMetodos();
        
        System.out.println("\n=== 4. INSPECCIONAR CONSTRUCTORES ===\n");
        inspeccionarConstructores();
        
        System.out.println("\n=== 5. CREAR INSTANCIAS DINÁMICAMENTE ===\n");
        crearInstancias();
        
        System.out.println("\n=== 6. INVOCAR MÉTODOS DINÁMICAMENTE ===\n");
        invocarMetodos();
        
        System.out.println("\n=== 7. ACCEDER A CAMPOS PRIVADOS ===\n");
        accederCamposPrivados();
        
        System.out.println("\n=== 8. MODIFICAR CAMPOS PRIVADOS ===\n");
        modificarCamposPrivados();
        
        System.out.println("\n=== 9. INVOCAR MÉTODOS PRIVADOS ===\n");
        invocarMetodosPrivados();
        
        System.out.println("\n=== 10. CASO PRÁCTICO: MINI-FRAMEWORK ===\n");
        ejemploMiniFramework();
    }

    // =========================================================================
    // 1. OBTENER EL OBJETO CLASS
    // =========================================================================
    /*
     * El objeto Class<T> es el punto de entrada a Reflection.
     * Representa la "plantilla" de una clase en memoria.
     * 
     * HAY 3 FORMAS DE OBTENERLO:
     */
    
    public static void obtenerClase() throws ClassNotFoundException {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│           3 FORMAS DE OBTENER Class<T>                  │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        // ─────────────────────────────────────────────────────────
        // FORMA 1: Usando .class (en tiempo de compilación)
        // ─────────────────────────────────────────────────────────
        Class<Persona> clase1 = Persona.class;
        System.out.println("1️.  NombreClase.class");
        System.out.println("    Persona.class → " + clase1.getName());
        System.out.println("    ✅ Más eficiente, se resuelve en compilación\n");
        
        // ─────────────────────────────────────────────────────────
        // FORMA 2: Usando getClass() en una instancia
        // ─────────────────────────────────────────────────────────
        Persona persona = new Persona("Juan", 25);
        Class<?> clase2 = persona.getClass();
        System.out.println("2️.  objeto.getClass()");
        System.out.println("    persona.getClass() → " + clase2.getName());
        System.out.println("    ✅ Útil cuando tienes una instancia\n");
        
        // ─────────────────────────────────────────────────────────
        // FORMA 3: Usando Class.forName() (dinámico)
        // ─────────────────────────────────────────────────────────
        Class<?> clase3 = Class.forName(Persona.class.getName());
        System.out.println("3️.  Class.forName(\"nombreCompleto\")");
        System.out.println("    Class.forName(\"Persona.class.getName()\") → " + clase3.getName());
        System.out.println("    ✅ Para cargar clases dinámicamente (ej: drivers JDBC)");
        System.out.println("    ⚠️ Lanza ClassNotFoundException si no existe");
        
        // ─────────────────────────────────────────────────────────
        // INFORMACIÓN BÁSICA DE UNA CLASE
        // ─────────────────────────────────────────────────────────
        System.out.println("\n┌─────────────────────────────────────────────────────────┐");
        System.out.println("│           INFORMACIÓN BÁSICA DE UNA CLASE               │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        System.out.println("  getName():          " + clase1.getName());
        System.out.println("  getSimpleName():    " + clase1.getSimpleName());
        System.out.println("  getPackageName():   " + clase1.getPackageName());
        System.out.println("  getSuperclass():    " + clase1.getSuperclass().getSimpleName());
        System.out.println("  isInterface():      " + clase1.isInterface());
        System.out.println("  isEnum():           " + clase1.isEnum());
        System.out.println("  isArray():          " + clase1.isArray());
        System.out.println("  getModifiers():     " + Modifier.toString(clase1.getModifiers()));
    }

    // =========================================================================
    // 2. INSPECCIONAR CAMPOS (FIELDS)
    // =========================================================================
    /*
     * Field representa un atributo de una clase.
     * Puedes obtener:
     *   - getFields()          → Solo campos PUBLIC (incluye heredados)
     *   - getDeclaredFields()  → TODOS los campos declarados (privados incluidos)
     */
    
    public static void inspeccionarCampos() {
        Class<Persona> clase = Persona.class;
        
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│              CAMPOS DE LA CLASE Persona                 │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        // ─────────────────────────────────────────────────────────
        // getDeclaredFields() - Todos los campos (incluso privados)
        // ─────────────────────────────────────────────────────────
        System.out.println("  getDeclaredFields() - Todos los campos declarados:\n");
        
        Field[] campos = clase.getDeclaredFields();
        for (Field campo : campos) {
            String modificador = Modifier.toString(campo.getModifiers());
            String tipo = campo.getType().getSimpleName();
            String nombre = campo.getName();
            
            System.out.println("    " + modificador + " " + tipo + " " + nombre);
        }
        
        // ─────────────────────────────────────────────────────────
        // getFields() - Solo campos públicos
        // ─────────────────────────────────────────────────────────
        System.out.println("\n  getFields() - Solo campos públicos:");
        Field[] camposPublicos = clase.getFields();
        if (camposPublicos.length == 0) {
            System.out.println("    (ninguno)");
        }
        for (Field campo : camposPublicos) {
            System.out.println("    " + campo.getName());
        }
        
        System.out.println("\n  ⚠️ DIFERENCIA IMPORTANTE:");
        System.out.println("    • getFields() → públicos + heredados");
        System.out.println("    • getDeclaredFields() → todos los declarados en ESTA clase");
    }

    // =========================================================================
    // 3. INSPECCIONAR MÉTODOS
    // =========================================================================
    /*
     * Method representa un método de una clase.
     * Puedes obtener:
     *   - getMethods()          → Métodos PUBLIC (incluye heredados de Object)
     *   - getDeclaredMethods()  → Métodos declarados en esta clase
     */
    
    public static void inspeccionarMetodos() {
        Class<Persona> clase = Persona.class;
        
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│             MÉTODOS DE LA CLASE Persona                 │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        // ─────────────────────────────────────────────────────────
        // getDeclaredMethods() - Métodos de esta clase
        // ─────────────────────────────────────────────────────────
        System.out.println("  getDeclaredMethods() - Métodos declarados:\n");
        
        Method[] metodos = clase.getDeclaredMethods();
        for (Method metodo : metodos) {
            String modificador = Modifier.toString(metodo.getModifiers());
            String retorno = metodo.getReturnType().getSimpleName();
            String nombre = metodo.getName();
            String parametros = Arrays.toString(
                Arrays.stream(metodo.getParameterTypes())
                      .map(Class::getSimpleName)
                      .toArray(String[]::new)
            );
            
            System.out.println("    " + modificador + " " + retorno + " " + nombre + parametros);
        }
        
        // ─────────────────────────────────────────────────────────
        // Obtener un método específico
        // ─────────────────────────────────────────────────────────
        System.out.println("\n  Obtener método específico:");
        try {
            // getMethod(nombre, tiposParametros...)
            Method saludar = clase.getMethod("saludar");
            System.out.println("    getMethod(\"saludar\") → " + saludar);
            
            Method setEdad = clase.getMethod("setEdad", int.class);
            System.out.println("    getMethod(\"setEdad\", int.class) → " + setEdad);
        } catch (NoSuchMethodException e) {
            System.out.println("    Método no encontrado");
        }
    }

    // =========================================================================
    // 4. INSPECCIONAR CONSTRUCTORES
    // =========================================================================
    /*
     * Constructor<T> representa un constructor de una clase.
     */
    
    public static void inspeccionarConstructores() {
        Class<Persona> clase = Persona.class;
        
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│           CONSTRUCTORES DE LA CLASE Persona             │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        Constructor<?>[] constructores = clase.getDeclaredConstructors();
        
        for (Constructor<?> constructor : constructores) {
            String modificador = Modifier.toString(constructor.getModifiers());
            String parametros = Arrays.toString(
                Arrays.stream(constructor.getParameterTypes())
                      .map(Class::getSimpleName)
                      .toArray(String[]::new)
            );
            
            System.out.println("    " + modificador + " Persona" + parametros);
        }
        
        System.out.println("\n  Total: " + constructores.length + " constructor(es)");
    }

    // =========================================================================
    // 5. CREAR INSTANCIAS DINÁMICAMENTE
    // =========================================================================
    /*
     * Puedes crear objetos sin usar "new" directamente.
     * Útil cuando no conoces la clase en tiempo de compilación.
     */
    
    public static void crearInstancias() throws Exception {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│            CREAR INSTANCIAS DINÁMICAMENTE               │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        Class<Persona> clase = Persona.class;
        
        // ─────────────────────────────────────────────────────────
        // Usando constructor sin parámetros
        // ─────────────────────────────────────────────────────────
        System.out.println("1️⃣  Constructor sin parámetros:");
        Constructor<Persona> constructorVacio = clase.getDeclaredConstructor();
        Persona p1 = constructorVacio.newInstance();
        System.out.println("    Creado: " + p1 + "\n");
        
        // ─────────────────────────────────────────────────────────
        // Usando constructor con parámetros
        // ─────────────────────────────────────────────────────────
        System.out.println("2️⃣  Constructor con parámetros:");
        Constructor<Persona> constructorParams = clase.getDeclaredConstructor(String.class, int.class);
        Persona p2 = constructorParams.newInstance("María", 30);
        System.out.println("    Creado: " + p2 + "\n");
        
        // ─────────────────────────────────────────────────────────
        // Crear instancia de clase cargada dinámicamente
        // ─────────────────────────────────────────────────────────
        System.out.println("3️⃣  Clase cargada dinámicamente:");
        Class<?> claseDinamica = Class.forName(Persona.class.getName());
        Object p3 = claseDinamica.getDeclaredConstructor(String.class, int.class)
                                  .newInstance("Carlos", 45);
        System.out.println("    Creado: " + p3);
        System.out.println("    Tipo real: " + p3.getClass().getSimpleName());
    }

    // =========================================================================
    // 6. INVOCAR MÉTODOS DINÁMICAMENTE
    // =========================================================================
    /*
     * Method.invoke(objeto, argumentos...) ejecuta el método
     */
    
    public static void invocarMetodos() throws Exception {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│            INVOCAR MÉTODOS DINÁMICAMENTE                │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        Persona persona = new Persona("Ana", 28);
        Class<?> clase = persona.getClass();
        
        // ─────────────────────────────────────────────────────────
        // Invocar método sin parámetros
        // ─────────────────────────────────────────────────────────
        System.out.println("1️⃣  Método sin parámetros:");
        Method saludar = clase.getMethod("saludar");
        System.out.print("    persona.saludar() → ");
        saludar.invoke(persona);  // Ejecuta: persona.saludar()
        
        // ─────────────────────────────────────────────────────────
        // Invocar método con parámetros
        // ─────────────────────────────────────────────────────────
        System.out.println("\n2️⃣  Método con parámetros:");
        Method setEdad = clase.getMethod("setEdad", int.class);
        System.out.println("    Antes: edad = " + persona.getEdad());
        setEdad.invoke(persona, 35);  // Ejecuta: persona.setEdad(35)
        System.out.println("    Después: edad = " + persona.getEdad());
        
        // ─────────────────────────────────────────────────────────
        // Invocar método con retorno
        // ─────────────────────────────────────────────────────────
        System.out.println("\n3️⃣  Método con retorno:");
        Method getNombre = clase.getMethod("getNombre");
        Object resultado = getNombre.invoke(persona);
        System.out.println("    persona.getNombre() → " + resultado);
        
        // ─────────────────────────────────────────────────────────
        // Invocar método estático
        // ─────────────────────────────────────────────────────────
        System.out.println("\n4️⃣  Método estático:");
        Method metodoEstatico = clase.getMethod("contarInstancias");
        Object count = metodoEstatico.invoke(null);  // null porque es static
        System.out.println("    Persona.contarInstancias() → " + count);
    }

    // =========================================================================
    // 7. ACCEDER A CAMPOS PRIVADOS
    // =========================================================================
    /*
     * Por defecto, no puedes acceder a campos privados.
     * Pero con setAccessible(true) puedes "romper" el encapsulamiento.
     * 
     * ⚠️ USAR CON CUIDADO - Viola el principio de encapsulamiento
     */
    
    public static void accederCamposPrivados() throws Exception {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│            ACCEDER A CAMPOS PRIVADOS                    │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        Persona persona = new Persona("Luis", 40);
        Class<?> clase = persona.getClass();
        
        // ─────────────────────────────────────────────────────────
        // Obtener campo privado
        // ─────────────────────────────────────────────────────────
        Field campoNombre = clase.getDeclaredField("nombre");
        
        System.out.println("  Campo: " + campoNombre);
        System.out.println("  Es privado: " + Modifier.isPrivate(campoNombre.getModifiers()));
        
        // ─────────────────────────────────────────────────────────
        // Sin setAccessible → IllegalAccessException
        // ─────────────────────────────────────────────────────────
        System.out.println("\n  ❌ Sin setAccessible(true):");
        try {
            Object valor = campoNombre.get(persona);  // LANZA EXCEPCIÓN
        } catch (IllegalAccessException e) {
            System.out.println("     IllegalAccessException: " + e.getMessage());
        }
        
        // ─────────────────────────────────────────────────────────
        // Con setAccessible → Funciona
        // ─────────────────────────────────────────────────────────
        System.out.println("\n  ✅ Con setAccessible(true):");
        campoNombre.setAccessible(true);  // ¡Desactiva la comprobación de acceso!
        Object valor = campoNombre.get(persona);
        System.out.println("     Valor de 'nombre': " + valor);
        
        System.out.println("\n  ⚠️ ADVERTENCIA:");
        System.out.println("     setAccessible(true) rompe el encapsulamiento.");
        System.out.println("     Usar solo cuando sea REALMENTE necesario.");
    }

    // =========================================================================
    // 8. MODIFICAR CAMPOS PRIVADOS
    // =========================================================================
    
    public static void modificarCamposPrivados() throws Exception {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│           MODIFICAR CAMPOS PRIVADOS                     │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        Persona persona = new Persona("Pedro", 50);
        Class<?> clase = persona.getClass();
        
        System.out.println("  Antes: " + persona);
        
        // ─────────────────────────────────────────────────────────
        // Modificar campo privado 'nombre'
        // ─────────────────────────────────────────────────────────
        Field campoNombre = clase.getDeclaredField("nombre");
        campoNombre.setAccessible(true);
        campoNombre.set(persona, "Pedro Modificado");  // ¡Cambia el valor!
        
        // ─────────────────────────────────────────────────────────
        // Modificar campo privado 'edad'
        // ─────────────────────────────────────────────────────────
        Field campoEdad = clase.getDeclaredField("edad");
        campoEdad.setAccessible(true);
        campoEdad.setInt(persona, 99);  // Para primitivos: setInt, setDouble, etc.
        
        System.out.println("  Después: " + persona);
        
        System.out.println("\n  Métodos para primitivos:");
        System.out.println("    • field.setInt(obj, valor)");
        System.out.println("    • field.setDouble(obj, valor)");
        System.out.println("    • field.setBoolean(obj, valor)");
        System.out.println("    • field.set(obj, valor) para objetos");
    }

    // =========================================================================
    // 9. INVOCAR MÉTODOS PRIVADOS
    // =========================================================================
    
    public static void invocarMetodosPrivados() throws Exception {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│            INVOCAR MÉTODOS PRIVADOS                     │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        Persona persona = new Persona("Laura", 33);
        Class<?> clase = persona.getClass();
        
        // ─────────────────────────────────────────────────────────
        // Obtener método privado
        // ─────────────────────────────────────────────────────────
        // getDeclaredMethod (no getMethod) para métodos privados
        Method metodoPrivado = clase.getDeclaredMethod("metodoSecreto");
        
        System.out.println("  Método: " + metodoPrivado.getName());
        System.out.println("  Es privado: " + Modifier.isPrivate(metodoPrivado.getModifiers()));
        
        // ─────────────────────────────────────────────────────────
        // Invocar método privado
        // ─────────────────────────────────────────────────────────
        metodoPrivado.setAccessible(true);
        System.out.print("\n  Invocando metodoSecreto(): ");
        metodoPrivado.invoke(persona);
        
        // ─────────────────────────────────────────────────────────
        // Método privado con parámetros
        // ─────────────────────────────────────────────────────────
        Method calcularPrivado = clase.getDeclaredMethod("calcularEdadSecreta", int.class);
        calcularPrivado.setAccessible(true);
        Object resultado = calcularPrivado.invoke(persona, 10);
        System.out.println("\n  calcularEdadSecreta(10) → " + resultado);
    }

    // =========================================================================
    // 10. CASO PRÁCTICO: MINI-FRAMEWORK
    // =========================================================================
    /*
     * Ejemplo de cómo los frameworks usan Reflection.
     * Simula una inyección de dependencias básica.
     */
    
    public static void ejemploMiniFramework() throws Exception {
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│        CASO PRÁCTICO: MINI-FRAMEWORK                    │");
        System.out.println("└─────────────────────────────────────────────────────────┘\n");
        
        System.out.println("  Simulando lo que hace Spring/Hibernate:\n");
        
        // ─────────────────────────────────────────────────────────
        // 1. Crear instancia sin conocer la clase en compilación
        // ─────────────────────────────────────────────────────────
        String nombreClase = Persona.class.getName();  // Podría venir de un XML/properties
        Class<?> clase = Class.forName(nombreClase);
        Object instancia = clase.getDeclaredConstructor().newInstance();
        
        System.out.println("  1. Creada instancia de: " + clase.getSimpleName());
        
        // ─────────────────────────────────────────────────────────
        // 2. Inyectar valores en campos (como @Autowired)
        // ─────────────────────────────────────────────────────────
        Field campoNombre = clase.getDeclaredField("nombre");
        campoNombre.setAccessible(true);
        campoNombre.set(instancia, "Inyectado por Framework");
        
        Field campoEdad = clase.getDeclaredField("edad");
        campoEdad.setAccessible(true);
        campoEdad.setInt(instancia, 100);
        
        System.out.println("  2. Valores inyectados en campos privados");
        
        // ─────────────────────────────────────────────────────────
        // 3. Invocar método (como @PostConstruct)
        // ─────────────────────────────────────────────────────────
        Method metodo = clase.getMethod("saludar");
        System.out.print("  3. Invocando método: ");
        metodo.invoke(instancia);
        
        System.out.println("\n  Resultado final: " + instancia);
        
        System.out.println("\n  ═══════════════════════════════════════════════════════");
        System.out.println("  Esto es EXACTAMENTE lo que hacen frameworks como Spring:");
        System.out.println("    • Leen configuración (XML, anotaciones, properties)");
        System.out.println("    • Crean instancias con Class.forName() + newInstance()");
        System.out.println("    • Inyectan dependencias con Field.set()");
        System.out.println("    • Invocan métodos de ciclo de vida con Method.invoke()");
        System.out.println("  ═══════════════════════════════════════════════════════");
    }
}


// =============================================================================
// CLASE DE PRUEBA PARA REFLECTION
// =============================================================================

/**
 * Clase de ejemplo para demostrar Reflection.
 * Tiene campos privados, métodos públicos y privados, varios constructores.
 */
class Persona {
    
    // ─────────────────────────────────────────────────────────
    // CAMPOS (privados)
    // ─────────────────────────────────────────────────────────
    private String nombre;
    private int edad;
    private static int contador = 0;  // Campo estático
    
    // ─────────────────────────────────────────────────────────
    // CONSTRUCTORES
    // ─────────────────────────────────────────────────────────
    
    public Persona() {
        this.nombre = "Sin nombre";
        this.edad = 0;
        contador++;
    }
    
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
        contador++;
    }
    
    // ─────────────────────────────────────────────────────────
    // MÉTODOS PÚBLICOS
    // ─────────────────────────────────────────────────────────
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public int getEdad() {
        return edad;
    }
    
    public void setEdad(int edad) {
        this.edad = edad;
    }
    
    public void saludar() {
        System.out.println("¡Hola! Soy " + nombre + " y tengo " + edad + " años.");
    }
    
    public static int contarInstancias() {
        return contador;
    }
    
    // ─────────────────────────────────────────────────────────
    // MÉTODOS PRIVADOS (accesibles solo con Reflection)
    // ─────────────────────────────────────────────────────────
    
    private void metodoSecreto() {
        System.out.println("¡Este método es PRIVADO!");
    }
    
    private int calcularEdadSecreta(int bonus) {
        return edad + bonus;
    }
    
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', edad=" + edad + "}";
    }
}