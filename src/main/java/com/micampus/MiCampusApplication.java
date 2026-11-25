package com.micampus;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.awt.Desktop;
import java.net.URI;

@SpringBootApplication
@EnableScheduling
public class MiCampusApplication {

    @Value("${server.port:8080}")
    private int port;

    @Value("${micampus.auto-open-browser:true}")
    private boolean autoOpenBrowser;

    public static void main(String[] args) {
        SpringApplication.run(MiCampusApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void openBrowserOnStartup() {
        if (!autoOpenBrowser) {
            return;
        }
        String url = "http://localhost:" + port;
        System.out.println("\n==================================================");
        System.out.println("  MiCampus esta listo en: " + url);
        System.out.println("==================================================\n");

        new Thread(() -> {
            try {
                if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                    Desktop.getDesktop().browse(new URI(url));
                    return;
                }
                String os = System.getProperty("os.name").toLowerCase();
                if (os.contains("mac")) {
                    new ProcessBuilder("open", url).start();
                } else if (os.contains("win")) {
                    new ProcessBuilder("rundll32", "url.dll,FileProtocolHandler", url).start();
                } else if (os.contains("nix") || os.contains("nux")) {
                    new ProcessBuilder("xdg-open", url).start();
                }
            } catch (Exception ignored) {
                // En entornos headless o sin navegador gráfico, no interrumpir la app
            }
        }, "browser-launcher").start();
    }
}
