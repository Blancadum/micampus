package cc.b.strings;

public class MainStrings {

	public static void main(String[] args) {

		//string es inmutable, lo que significa que una vez que sea crea no se puede modificar
		//cada vez que modificamos un string en realidad estamos creando un nuevo objeto en memoria
		
		String saludo = "Hola";
		saludo = saludo + " mundo";  // Se crea un NUEVO String, el anterior "Hola" queda en memoria
		System.out.println(saludo);
		
		String algo = "";
		for (int i = 0; i < 100; i++) {
		    algo += i + ", ";  // ¡Se crean 100 nuevos objetos String!
		}
		//esto lo que hace es consumir mucha memoria ademas que es lento, que tiene que copiar todo el contenido antenior
		System.out.println(algo);
		
		//para solucionar esto se crea el stringbuilder
		
		// Constructor vacío
		StringBuilder sb1 = new StringBuilder();

		// Constructor con capacidad inicial
		StringBuilder sb2 = new StringBuilder(100);

		// Constructor con String inicial
		StringBuilder sb3 = new StringBuilder("Hola");
		
		
		//ejemplos de metodos principales
		StringBuilder sb = new StringBuilder();
		
		// Añadir contenido al final
		sb.append("Hola");
		sb.append(" ");
		sb.append("mundo");
		System.out.println(sb);

		// Insertar en una posición específica
		sb.insert(5, "querido ");  // "Hola querido mundo"
		System.out.println(sb);
		
		// Eliminar caracteres
		sb.delete(5, 13);  // Elimina desde índice 5 hasta 12
		System.out.println(sb);
		
		// Reemplazar una sección
		sb.replace(0, 4, "Adiós");
		System.out.println(sb);
		
		// Invertir el contenido
		sb.reverse();
		System.out.println(sb);
		
		// Convertir a String
		String resultado = sb.toString();
		System.out.println(resultado);
		
		
		//ejemplo con un poco mas de sentido
        StringBuilder sb0 = new StringBuilder();
        
        for (int i = 1; i <= 10; i++) {
            sb0.append("Número: ").append(i);
            
            if (i < 10) {
                sb0.append(", ");
            }
        }
        
        System.out.println(sb0.toString());
        // Salida: Número: 1, Número: 2, Número: 3, ...
		
        
        
        //StringBuffer tiene los mismos metodos que stringbuilder 
        //pero se suele usar con hilos
        StringBuffer sbuffer = new StringBuffer();
		
		
		
		
		
		
		
		
		
		

	}

}
