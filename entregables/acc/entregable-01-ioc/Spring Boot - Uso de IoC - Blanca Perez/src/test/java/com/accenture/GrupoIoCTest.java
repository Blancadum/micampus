package com.accenture;

import com.accenture.model.Grupo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas unitarias automatizadas para verificar el cumplimiento del Entregable 1.
 */
class GrupoIoCTest {

    private ClassPathXmlApplicationContext context;

    @BeforeEach
    void setUp() {
        context = new ClassPathXmlApplicationContext("applicationContext.xml");
    }

    @AfterEach
    void tearDown() {
        if (context != null) {
            context.close();
        }
    }

    @Test
    @DisplayName("El contenedor IoC debe instanciar grupoBean correctamente")
    void testBeanRecuperadoDesdeIoC() {
        assertNotNull(context, "El contexto de Spring debe inicializarse");
        Grupo grupo = context.getBean("grupoBean", Grupo.class);
        assertNotNull(grupo, "El bean 'grupoBean' debe recuperarse desde el contenedor");
    }

    @Test
    @DisplayName("El bean debe permitir asignación de valores y formatear toString correctamente")
    void testAsignacionValoresYFormatoToString() {
        Grupo grupo = context.getBean("grupoBean", Grupo.class);

        grupo.setId(1);
        grupo.setNombre("Metallica");
        grupo.setOrigen("Estados Unidos");
        grupo.setCreacion(1981);
        grupo.setGenero("Heavy Metal");

        assertEquals(1, grupo.getId());
        assertEquals("Metallica", grupo.getNombre());
        assertEquals("Estados Unidos", grupo.getOrigen());
        assertEquals(1981, grupo.getCreacion());
        assertEquals("Heavy Metal", grupo.getGenero());

        String esperado = "Metallica - Estados Unidos 1981 - Heavy Metal";
        assertEquals(esperado, grupo.toString(), "El método toString() debe coincidir con el formato oficial");
    }
}
