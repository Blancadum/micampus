package com.micampus.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final Path publicDirPath;
    private final String[] allowedOriginPatterns;

    public WebConfig(
            StorageProperties storageProperties,
            @Value("${micampus.cors.allowed-origins:http://localhost:5173,http://localhost:8090}") String allowedOriginsCsv
    ) {
        this.publicDirPath = Paths.get(storageProperties.getPublicDir()).toAbsolutePath().normalize();
        this.allowedOriginPatterns = Arrays.stream(allowedOriginsCsv.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toArray(String[]::new);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(allowedOriginPatterns.length > 0 ? allowedOriginPatterns : new String[]{"http://localhost:*"})
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**")
                .addResourceLocations("classpath:/static/assets/")
                .setCacheControl(CacheControl.maxAge(java.time.Duration.ofDays(30)).cachePublic());

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.noStore())
                .resourceChain(false)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requested = location.createRelative(resourcePath);
                        if (requested.exists() && requested.isReadable()) {
                            return requested;
                        }
                        if (Files.isDirectory(publicDirPath)) {
                            Path publicFile = publicDirPath.resolve(resourcePath).normalize();
                            if (publicFile.startsWith(publicDirPath)
                                    && Files.isRegularFile(publicFile)
                                    && Files.isReadable(publicFile)) {
                                return new FileSystemResource(publicFile);
                            }
                        }
                        if (resourcePath.startsWith("api/")) {
                            return null;
                        }
                        return new ClassPathResource("/static/index.html");
                    }
                });
    }
}
