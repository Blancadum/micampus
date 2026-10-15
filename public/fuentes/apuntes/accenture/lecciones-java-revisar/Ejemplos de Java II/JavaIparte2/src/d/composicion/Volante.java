package d.composicion;

/**
 * COMPOSICIÓN: relación "TIENE UN" (has-a)
 * Los objetos componentes tienen el MISMO ciclo de vida que el contenedor
 */
public class Volante {
    private String marca;
    private String material;
    
    public Volante(String marca, String material) {
        this.marca = marca;
        this.material = material;
    }
    
    public String getMarca() {
        return marca;
    }
    
    public String getMaterial() {
        return material;
    }
    
    public void girar(String direccion) {
        System.out.println("Girando el volante hacia la " + direccion);
    }
}