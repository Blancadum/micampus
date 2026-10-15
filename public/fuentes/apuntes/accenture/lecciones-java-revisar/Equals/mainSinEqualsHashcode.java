package aa.equals_hashcode;

import java.util.HashSet;
import java.util.Set;

public class mainSinEqualsHashcode {

	public static void main(String[] args) {

		Usuario u1 = new Usuario();
		u1.setId(1);
		u1.setNombre("Juan");

		Usuario u2 = new Usuario();
		u2.setId(1);
		u2.setNombre("Juan");

		// Comparación por refencia
		System.out.println(u1 == u2);        // false (diferentes referencias)
		System.out.println(u1);
		System.out.println(u2);
		
//		Implementación por defecto cuando no lo implementamos en la clase de Object.toString()
//		public String toString() {
//		    return getClass().getName() + "@" + Integer.toHexString(hashCode());
		
		//comparacion por contenido
		System.out.println(u1.equals(u2));   // false (usa equals() de Object)
	
//		Implementación por defecto cuando no lo implementamos en la clase de java.lang.Object
//		public boolean equals(Object obj) {
//		    return (this == obj);
//		}
	
		
		
		// En colecciones
		Set<Usuario> usuarios = new HashSet<>();
		usuarios.add(u1);
		usuarios.add(u2);
		System.out.println("total: "+usuarios.size());  // 2 (debería ser 1, son el mismo usuario)
		
		// Implementación nativa de Object.hashCode()
		// NO es exactamente la dirección de memoria, pero está relacionada
		//public native int hashCode();
		
		
		

	}

}
