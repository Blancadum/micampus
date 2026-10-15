package aa.equals_hashcode;

import java.util.HashSet;
import java.util.Set;

public class mainConEqualsHashcode {

	public static void main(String[] args) {

		UsuarioEqualsHashcode u1 = new UsuarioEqualsHashcode();
		u1.setId(1);
		u1.setNombre("Juan");

		UsuarioEqualsHashcode u2 = new UsuarioEqualsHashcode();
		u2.setId(1);
		u2.setNombre("Juan");

		
		// Comparación de refencias
		System.out.println(u1 == u2);        // false (diferentes referencias)
		System.out.println(u1);
		System.out.println(u2);
		
		//comparacion de contenidos
		System.out.println(u1.equals(u2));   // true (usa equals() de Object)

		// En colecciones
		Set<UsuarioEqualsHashcode> usuarios = new HashSet<>();
		usuarios.add(u1);
		usuarios.add(u2);
		System.out.println(usuarios.size());  // 1, son el mismo usuario
		

	}

}
