import React, { useState } from 'react';
import InstallationHeader from './installation/InstallationHeader';
import JavaJdkSection from './installation/JavaJdkSection';
import IntelliJSection from './installation/IntelliJSection';
import MavenGitSection from './installation/MavenGitSection';
import RestClientsSection from './installation/RestClientsSection';

/**
 * ============================================================================
 * @component   InstallationGuideTab
 * @description Manual Oficial de Instalación de Entorno Local para Spring Boot.
 *              Incluye comandos adaptados según SO (macOS, Windows, Linux) para
 *              JDK 17/21 LTS, IntelliJ IDEA, Apache Maven, Git y clientes REST.
 * ============================================================================
 */
export default function InstallationGuideTab() {
  const [os, setOs] = useState('macos'); // 'windows' | 'macos' | 'linux'
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Header con selector de SO y botón de descarga de markdown */}
      <InstallationHeader
        os={os}
        onSelectOs={setOs}
      />

      {/* 2. JDK 17 / 21 LTS y configuración de JAVA_HOME */}
      <JavaJdkSection
        os={os}
        copiedId={copiedId}
        onCopy={handleCopy}
      />

      {/* 3. IntelliJ IDEA Community Edition */}
      <IntelliJSection
        os={os}
        copiedId={copiedId}
        onCopy={handleCopy}
      />

      {/* 4. Maven & Git */}
      <MavenGitSection
        os={os}
        copiedId={copiedId}
        onCopy={handleCopy}
      />

      {/* 5. Clientes REST (Postman, cURL, HTTPie) */}
      <RestClientsSection />
    </div>
  );
}
