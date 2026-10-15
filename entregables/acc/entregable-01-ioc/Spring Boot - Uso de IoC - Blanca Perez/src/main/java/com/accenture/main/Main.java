package com.accenture.main;

import com.accenture.model.Grupo;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Clase principal de ejecución para el Entregable 1 de Accenture (L2E).
 * <p>
 * Demuestra la recuperación y uso de un Bean administrado a través del
 * Contenedor de Inversión de Control (IoC) de Spring cargado mediante
 * configuración XML ({@code applicationContext.xml}).
 * </p>
 * 
 * @author Blanca
 * @version 1.0.0
 */
public class Main {

    /**
     * Punto de entrada de la aplicación.
     * <ol>
     *   <li>Carga el contenedor de Spring {@link ClassPathXmlApplicationContext}.</li>
     *   <li>Recupera la instancia del bean {@code grupoBean}.</li>
     *   <li>Asigna los valores requeridos mediante métodos setters.</li>
     *   <li>Muestra por consola la información formateada invocando {@link Grupo#toString()}.</li>
     *   <li>Cierra el contexto de Spring de forma limpia.</li>
     * </ol>
     *
     * @param args Argumentos de la línea de comandos (no utilizados)
     */
    public static void main(String[] args) {
        // 1. Crear el contexto para el contenedor de Spring cargando applicationContext.xml
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        // 2. Recuperar la instancia de tipo Grupo obteniendo el bean del contenedor
        Grupo grupo = context.getBean("grupoBean", Grupo.class);

        // 3. Asignar valores a los atributos mediante los métodos setters
        grupo.setId(1);
        grupo.setNombre("Metallica");
        grupo.setOrigen("Estados Unidos");
        grupo.setCreacion(1981);
        grupo.setGenero("Heavy Metal");

        // 4. Mostrar por consola la información del grupo invocando el método toString()
        System.out.println(grupo.toString());

        // 5. Cerrar el contexto de Spring
        context.close();
    }
}
