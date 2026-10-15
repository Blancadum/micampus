package com.accenture.model;

/**
 * Entidad modelo que representa un grupo o banda musical.
 * <p>
 * Diseñada para ser instanciada como un Bean administrado por el contenedor
 * de Inversión de Control (IoC) de Spring Framework sin inyección previa de valores.
 * </p>
 * 
 * @author Blanca
 * @version 1.0.0
 */
public class Grupo {

    /** Identificador único del grupo */
    private int id;

    /** Nombre de la banda musical */
    private String nombre;

    /** Año de fundación o creación */
    private int creacion;

    /** Lugar o país de origen */
    private String origen;

    /** Estilo o género musical */
    private String genero;

    /**
     * Constructor por defecto sin argumentos.
     * <p>Requerido por el contenedor IoC de Spring para instanciar el bean.</p>
     */
    public Grupo() {
    }

    /**
     * Obtiene el identificador del grupo.
     * @return Identificador numérico único
     */
    public int getId() {
        return id;
    }

    /**
     * Asigna el identificador del grupo.
     * @param id Identificador numérico único
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre del grupo.
     * @return Nombre del grupo
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Asigna el nombre del grupo.
     * @param nombre Nombre del grupo
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene el año de creación del grupo.
     * @return Año de creación
     */
    public int getCreacion() {
        return creacion;
    }

    /**
     * Asigna el año de creación del grupo.
     * @param creacion Año de creación
     */
    public void setCreacion(int creacion) {
        this.creacion = creacion;
    }

    /**
     * Obtiene el país o ciudad de origen.
     * @return Lugar de origen
     */
    public String getOrigen() {
        return origen;
    }

    /**
     * Asigna el país o ciudad de origen.
     * @param origen Lugar de origen
     */
    public void setOrigen(String origen) {
        this.origen = origen;
    }

    /**
     * Obtiene el género musical.
     * @return Género musical
     */
    public String getGenero() {
        return genero;
    }

    /**
     * Asigna el género musical.
     * @param genero Género musical
     */
    public void setGenero(String genero) {
        this.genero = genero;
    }

    /**
     * Devuelve la representación textual del grupo con el formato oficial:
     * {@code <nombre> - <origen> <creacion> - <genero>}
     *
     * @return Cadena formateada con la información del grupo
     */
    @Override
    public String toString() {
        return nombre + " - " + origen + " " + creacion + " - " + genero;
    }
}
