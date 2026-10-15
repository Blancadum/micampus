package cc.b.strings;

public class MainStringEficiencia {

	public static void main(String[] args) {
        int iteraciones = 50000;
        
        // MÉTODO LENTO - Concatenación con String
        long inicioString = System.currentTimeMillis();
        String resultado = "";
        for (int i = 0; i < iteraciones; i++) {
            resultado += i;
        }
        long finString = System.currentTimeMillis();
        long tiempoString = finString - inicioString;
        
        // MÉTODO RÁPIDO - StringBuilder
        long inicioStringBuilder = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iteraciones; i++) {
            sb.append(i);
        }

        long finStringBuilder = System.currentTimeMillis();
        long tiempoStringBuilder = finStringBuilder - inicioStringBuilder;
        
        // MÉTODO MEDIO - StringBuffer
        long inicioStringBuffer= System.currentTimeMillis();
        StringBuilder sb1 = new StringBuilder();
        for (int i = 0; i < iteraciones; i++) {
            sb1.append(i);
        }

        long finStringBuffer = System.currentTimeMillis();
        long tiempoStringBuffer = finStringBuffer - inicioStringBuffer;
        
        
        // Mostrar resultados
        System.out.println("=== COMPARACIÓN DE RENDIMIENTO ===");
        System.out.println("Iteraciones: " + iteraciones);
        System.out.println();
        System.out.println("❌ String (concatenación):");
        System.out.println("   Tiempo: " + tiempoString + " ms");
        System.out.println();
        System.out.println("✅ StringBuilder:");
        System.out.println("   Tiempo: " + tiempoStringBuilder + " ms");
        System.out.println();
        System.out.println("✅ StringBuffer:");
        System.out.println("   Tiempo: " + tiempoStringBuffer + " ms");
    }
}
