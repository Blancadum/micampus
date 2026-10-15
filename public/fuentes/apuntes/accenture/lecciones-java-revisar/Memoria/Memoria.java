package aa.aa.memoria;

import java.util.Arrays;

import aa.equals_hashcode.UsuarioEqualsHashcode;

public class Memoria {

	public static void main(String[] args) {

		introduccion();
		garbageCollector();
		primitivos();
		strings();
		stringBuilder();
		arrays();
		objetos();
	}

	// ======================================================
	// 0. INTRODUCCIÓN -> las zonas de memoria que vamos a ver
	// ======================================================
	/*
	 * Java reparte la memoria en varias zonas. Las que nos interesan aquí:
	 *
	 * - STACK: una pila por cada hilo. Guarda variables locales y parámetros.
	 *   Para los objetos, solo guarda la REFERENCIA (la flecha), nunca el
	 *   objeto en sí. Se libera sola al salir del método: no necesita GC.
	 *
	 * - HEAP: zona compartida por toda la aplicación. Aquí viven todos los
	 *   objetos creados con "new" (incluidos los arrays). La gestiona el
	 *   Garbage Collector, que libera los objetos cuando ya nadie los referencia.
	 *
	 * - STRING POOL: una subzona especial dentro del Heap reservada para los
	 *   literales de String (ej. "Hola"). Si dos literales son idénticos,
	 *   Java reutiliza el mismo objeto en vez de crear uno nuevo.
	 *
	 *      Stack                  Heap
	 *      ┌──────────┐          ┌───────────────────────────────┐
	 *      │ variable │          │ String Pool: "Hola", ...      │
	 *      │ local    │ ───────▶ │ Objetos normales: Usuario     │
	 *      │ (flecha) │          │ Arrays: int[], Integer[]      │
	 *      └──────────┘          └───────────────────────────────┘
	 *
	 * Con esto de base, vemos cómo se comporta cada tipo por separado:
	 * primitivos, String, StringBuilder, arrays y objetos normales.
	 */
	private static void introduccion() {
		System.out.println("=== 0. INTRODUCCIÓN ===");
		System.out.println("STACK       -> variables locales, primitivos y referencias (flechas).");
		System.out.println("HEAP        -> objetos reales creados con 'new' (incluye arrays).");
		System.out.println("STRING POOL -> zona del Heap donde se reutilizan los literales de String.\n");
	}

	// ======================================================
	// 0.1 GARBAGE COLLECTOR -> por qué el Heap lo necesita y el Stack no
	// ======================================================
	/*
	 * STACK -> liberación determinista: cuando un método termina, su marco
	 *   (variables locales, parámetros) se elimina automáticamente y al
	 *   instante, porque el Stack es una pila (LIFO): se sabe exactamente
	 *   cuándo entra y sale cada marco. No hace falta "decidir" nada.
	 *
	 * HEAP -> liberación NO determinista: un objeto puede vivir más allá de
	 *   la llamada que lo creó (guardado en un campo, en una lista, devuelto,
	 *   etc.). La JVM no puede saber de antemano cuándo deja de hacer falta.
	 *   Por eso existe el Garbage Collector (GC): un proceso que recorre el
	 *   Heap periódicamente, detecta qué objetos ya no tienen ninguna
	 *   referencia viva apuntándolos, y libera esa memoria.
	 *
	 * Ejemplo con el String de antes:
	 *
	 *   saludo = saludo + " mundo";
	 *
	 *   Stack                Heap
	 *   ┌─────────┐         ┌────────────────┐
	 *   │ saludo  │ ──┐     │ "Hola"         │   <- nadie lo referencia ya = "basura"
	 *   └─────────┘   │     ├────────────────┤      pero SIGUE en memoria hasta que
	 *                 └────▶│ "Hola mundo"   │      el GC lo recicle
	 *                       └────────────────┘
	 */
	private static void garbageCollector() {
		System.out.println("=== 0.1 GARBAGE COLLECTOR ===");
		System.out.println("Stack -> se limpia solo, de forma automática, al salir del método (LIFO).");
		System.out.println("Heap  -> necesita al GC: recorre la memoria y libera los objetos sin referencias vivas.\n");
	}

	// ======================================================
	// 1. PRIMITIVOS -> viven solo en el Stack, no hay Heap
	// ======================================================
	/*
	 * Stack
	 * ┌─────────┐
	 * │ b = 127 │   <- el valor está AQUÍ, no hay objeto en Heap, no hay flecha
	 * └─────────┘
	 */
	private static void primitivos() {
		System.out.println("=== 1. PRIMITIVOS ===");

		byte b = 127;
		int edad = 30;
		System.out.println("b = " + b + " , edad = " + edad);
		System.out.println("Los primitivos no tienen identidad de objeto, solo valor.\n");
	}

	// ======================================================
	// 2. STRINGS -> inmutables, cada "modificación" crea un objeto nuevo
	// ======================================================
	/*
	 * String saludo = "Hola";
	 * String otra = "Hola";
	 *
	 * Como los dos literales son idénticos, el String Pool NO crea dos
	 * objetos: reutiliza el mismo, y ambas variables cruzan su flecha
	 * hacia él.
	 *
	 * Stack                  String Pool (Heap)
	 * ┌─────────┐
	 * │ saludo  │ ──────┐
	 * ├─────────┤       ├──▶ ┌──────────┐
	 * │ otra    │ ──────┘    │ "Hola"   │   objeto A (compartido)
	 * └─────────┘            └──────────┘
	 *
	 * saludo = saludo + " mundo";
	 *
	 * "otra" no se entera de nada: sigue apuntando al objeto A. Solo
	 * "saludo" se mueve a un objeto nuevo (B).
	 *
	 * Stack                  String Pool / Heap
	 * ┌─────────┐
	 * │ saludo  │ ────────────────────────────┐
	 * ├─────────┤                             │
	 * │ otra    │ ──────────┐                 │
	 * └─────────┘           │                 │
	 *                       ▼                 ▼
	 *                  ┌──────────┐    ┌────────────────┐
	 *                  │ "Hola"   │    │ "Hola mundo"   │   objeto B -> nuevo
	 *                  │ objeto A │    └────────────────┘
	 *                  └──────────┘
	 *
	 * saludo = "Hola"; // vuelve a apuntar al literal del Pool
	 *
	 * "saludo" no crea nada nuevo: el Pool ya tiene "Hola" (objeto A), así
	 * que vuelve a cruzar su flecha hacia ahí, igual que "otra". El objeto
	 * "Hola mundo" (B) se queda sin ninguna referencia: es basura, a la
	 * espera de que el GC lo limpie.
	 *
	 * Stack                  String Pool / Heap
	 * ┌─────────┐
	 * │ saludo  │ ──────┐
	 * ├─────────┤       ├──▶ ┌──────────┐
	 * │ otra    │ ──────┘    │ "Hola"   │   objeto A (compartido otra vez)
	 * └─────────┘            └──────────┘
	 *
	 *                        ┌────────────────┐
	 *                        │ "Hola mundo"   │   objeto B -> sin referencias, listo para el GC
	 *                        └────────────────┘
	 */
	private static void strings() {
		System.out.println("=== 2. STRINGS (inmutables) ===");

		String saludo = "Hola";
		String otra = "Hola";
		System.out.println("saludo -> valor: " + saludo + " | identidad: " + System.identityHashCode(saludo));
		System.out.println("otra   -> valor: " + otra + " | identidad: " + System.identityHashCode(otra));
		System.out.println("¿Mismo objeto en el Pool? " + (saludo == otra) + "\n");

		saludo = saludo + " mundo"; // no modifica el objeto, crea uno nuevo y reapunta la referencia
		System.out.println("Tras reasignar saludo:");
		System.out.println("saludo -> valor: " + saludo + " | identidad: " + System.identityHashCode(saludo));
		System.out.println("otra   -> valor: " + otra + " | identidad: " + System.identityHashCode(otra)
				+ "  (no cambió, sigue en el Pool)");
		System.out.println("La identidad de saludo cambió: es un objeto distinto en el Heap.\n");

		saludo = "Hola"; // vuelve a apuntar al literal del Pool, no crea nada nuevo
		System.out.println("Tras volver a asignar saludo = \"Hola\":");
		System.out.println("saludo -> valor: " + saludo + " | identidad: " + System.identityHashCode(saludo));
		System.out.println("otra   -> valor: " + otra + " | identidad: " + System.identityHashCode(otra));
		System.out.println("¿Mismo objeto en el Pool otra vez? " + (saludo == otra));
		System.out.println("\"Hola mundo\" ya no tiene ninguna referencia -> queda para el GC.\n");
	}

	// ======================================================
	// 3. STRINGBUILDER -> mutable, modifica el MISMO objeto en el Heap
	// ======================================================
	/*
	 * StringBuilder sb = new StringBuilder("Hola");
	 *
	 * Stack                Heap
	 * ┌─────────┐         ┌───────────────────────────┐
	 * │ sb      │ ──────▶│ StringBuilder("Hola")     │   objeto único
	 * └─────────┘         └───────────────────────────┘
	 *                              │ append(" mundo") -> modifica el MISMO objeto
	 *                              ▼
	 *                     ┌───────────────────────────┐
	 *                     │ StringBuilder("Hola mundo")│   sigue siendo el objeto A
	 *                     └───────────────────────────┘
	 */
	private static void stringBuilder() {
		System.out.println("=== 3. STRINGBUILDER (mutable) ===");

		StringBuilder sb = new StringBuilder("Hola");
		System.out.println("Antes  -> valor: " + sb + " | identidad: " + System.identityHashCode(sb));

		sb.append(" mundo"); // modifica el mismo objeto, no crea uno nuevo
		System.out.println("Después -> valor: " + sb + " | identidad: " + System.identityHashCode(sb));
		System.out.println("La identidad NO cambió: sigue siendo el mismo objeto en el Heap.\n");
	}

	// ======================================================
	// 4. ARRAYS -> primitivos incrustados vs array de referencias
	// ======================================================
	/*
	 * int[] numeros1 = {5, 2, 9, 1};
	 *
	 * Stack                Heap
	 * ┌──────────┐        ┌───────────────────┐
	 * │ numeros1 │ ──────▶│ int[]: 5, 2, 9, 1 │   un único objeto, valores incrustados
	 * └──────────┘        └───────────────────┘
	 *
	 * Integer[] numeros2 = {5, 2, 9, 1};
	 *
	 * Stack                Heap
	 * ┌──────────┐        ┌─────────────────────────┐
	 * │ numeros2 │ ──────▶│ Integer[]: ●  ●   ●   ● │   array de referencias
	 * └──────────┘        └────────────┬───┬───┬───┬┘
	 *                                  ▼   ▼   ▼   ▼
	 *                                 [5] [2] [9] [1]   <- 4 objetos Integer aparte
	 *
	 * INTEGER CACHE: igual que el String Pool reutiliza literales de texto,
	 * Integer.valueOf(int) reutiliza objetos para el rango -128..127 en vez
	 * de crear uno nuevo cada vez. Como 5, 2, 9 y 1 caen en ese rango, los 4
	 * "objetos Integer aparte" de arriba en realidad ya existían en la
	 * caché: no se crearon nuevos.
	 *
	 * Integer a = 100;   Integer b = 100;   (dentro de la caché)
	 * Stack                Heap
	 * ┌──────┐
	 * │ a    │ ──────┐
	 * ├──────┤        ├──▶ ┌───────────┐
	 * │ b    │ ──────┘    │ Integer(100)│   objeto compartido (cacheado)
	 * └──────┘            └───────────┘
	 *
	 * Integer c = 200;   Integer d = 200;   (fuera de la caché)
	 * Stack                Heap
	 * ┌──────┐            ┌─────────────┐
	 * │ c    │ ──────────▶│ Integer(200)│   objeto A
	 * ├──────┤            ├─────────────┤
	 * │ d    │ ──────────▶│ Integer(200)│   objeto B (distinto de A)
	 * └──────┘            └─────────────┘
	 */
	private static void arrays() {
		System.out.println("=== 4. ARRAYS (primitivos vs objetos) ===");

		int[] numeros1 = { 5, 2, 9, 1 };
		Integer[] numeros2 = { 5, 2, 9, 1 };

		System.out.println("int[]      -> " + Arrays.toString(numeros1)
				+ " : un solo objeto en el Heap con los valores incrustados.");
		System.out.println("Integer[]  -> un objeto array de referencias + " + numeros2.length
				+ " objetos Integer adicionales en el Heap.\n");

		System.out.println("--- Integer Cache (-128 a 127) ---");
		Integer a = 100;
		Integer b = 100;
		System.out.println("a -> identidad: " + System.identityHashCode(a));
		System.out.println("b -> identidad: " + System.identityHashCode(b));
		System.out.println("a == b -> " + (a == b) + "  (mismo objeto: 100 está en la caché)");

		Integer c = 200;
		Integer d = 200;
		System.out.println("c -> identidad: " + System.identityHashCode(c));
		System.out.println("d -> identidad: " + System.identityHashCode(d));
		System.out.println("c == d -> " + (c == d) + "  (objetos distintos: 200 está fuera de la caché)\n");
	}

	// ======================================================
	// 5. OBJETOS NORMALES -> referencia en Stack, objeto en Heap
	// ======================================================
	/*
	 * Usuario u1 = new Usuario(1, "Juan");
	 * Usuario u2 = new Usuario(1, "Juan");
	 *
	 * Stack                Heap
	 * ┌──────┐            ┌────────────────────┐
	 * │ u1   │ ─────────▶ │ Usuario {id=1,...} │  objeto A
	 * ├──────┤            ├────────────────────┤
	 * │ u2   │ ─────────▶ │ Usuario {id=1,...} │  objeto B
	 * └──────┘            └────────────────────┘
	 *
	 * u1 == u2        -> compara las flechas (direcciones)         -> false
	 * u1.equals(u2)   -> compara el contenido de A y B (overridden) -> true
	 */
	private static void objetos() {
		System.out.println("=== 5. OBJETOS (referencia vs contenido) ===");

		UsuarioEqualsHashcode u1 = new UsuarioEqualsHashcode();
		u1.setId(1);
		u1.setNombre("Juan");

		UsuarioEqualsHashcode u2 = new UsuarioEqualsHashcode();
		u2.setId(1);
		u2.setNombre("Juan");

		System.out.println("Identidad u1: " + System.identityHashCode(u1));
		System.out.println("Identidad u2: " + System.identityHashCode(u2));
		System.out.println("u1 == u2      -> " + (u1 == u2) + "  (compara direcciones: objetos distintos en Heap)");
		System.out.println("u1.equals(u2) -> " + u1.equals(u2) + "  (compara contenido: equals() sobrescrito)");
	}

	// ======================================================
	// PREGUNTA
	// ======================================================
	/*
	 * ¿Crees que existen más cachés de autoboxing aparte de la de Integer?
	 * Por ejemplo: ¿Byte? ¿Short? ¿Float?
	 *
	 * 
	 * 
	 * 





























































	 * Respuesta:
	 * - Byte  -> SÍ. Se cachea TODO su rango (-128 a 127), porque es el
	 *            rango completo del tipo byte.
	 * - Short -> SÍ. Se cachea el rango -128 a 127, igual que Integer y Long.
	 * - Float -> NO. Float (y Double) no tienen caché de autoboxing: hay
	 *            demasiados valores posibles y casos raros (NaN, -0.0 vs 0.0)
	 *            que hacen que reutilizar instancias no tenga sentido.
	 * 
	 * 
	 * Dato curioso: el límite superior de la caché de Integer (127 por defecto) se puede ampliar con la opción de JVM -XX:AutoBoxCacheMax=N.
	 */

}
