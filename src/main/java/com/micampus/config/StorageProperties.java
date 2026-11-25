package com.micampus.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "micampus")
public class StorageProperties {
    private String dataDir = "./micampus-data";
    private String publicDir = "./frontend/public";
    private boolean autoOpenBrowser = true;

    public String getDataDir() {
        return dataDir;
    }

    public void setDataDir(String dataDir) {
        this.dataDir = dataDir;
    }

    public String getPublicDir() {
        return publicDir;
    }

    public void setPublicDir(String publicDir) {
        this.publicDir = publicDir;
    }

    public boolean isAutoOpenBrowser() {
        return autoOpenBrowser;
    }

    public void setAutoOpenBrowser(boolean autoOpenBrowser) {
        this.autoOpenBrowser = autoOpenBrowser;
    }
}
