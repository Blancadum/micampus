import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * SqlBackendIntegrationModal
 * Muestra cómo conectar y ejecutar sentencias SQL desde el Backend
 * en las dos tecnologías clave del campus: PHP (PDO) y Java (Spring Data JPA).
 */
export default function SqlBackendIntegrationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('php');
  const [copiedTab, setCopiedTab] = useState(null);

  if (!isOpen) return null;

  const phpSnippet = `<?php
// 1. Conexión segura con PDO a MySQL (utf8mb4 y modo de excepciones)
$dsn = "mysql:host=localhost;dbname=micampus_db;charset=utf8mb4";
$user = "db_user";
$pass = "secret_password";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // 2. Sentencia preparada (PREVIENE Inyección SQL al 100%)
    $sql = "SELECT id, nombre, email, nota_media 
            FROM estudiantes 
            WHERE carrera = :carrera AND nota_media >= :notaMin
            ORDER BY nota_media DESC";

    $stmt = $pdo->prepare($sql);
    
    // 3. Vincular parámetros seguros
    $stmt->execute([
        ':carrera' => 'DAM',
        ':notaMin' => 7.0
    ]);

    // 4. Obtener resultados en array asociativo
    $estudiantes = $stmt->fetchAll();
    foreach ($estudiantes as $e) {
        echo "{$e['nombre']} - Nota: {$e['nota_media']}\\n";
    }

} catch (PDOException $e) {
    echo "Error de conexión o consulta: " . $e->getMessage();
}
?>`;

  const javaSnippet = `package com.micampus.repository;

import com.micampus.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    // 1. Consulta derivada de Spring Data (Método declarativo sin SQL manual)
    List<Estudiante> findByCarreraAndNotaMediaGreaterThanEqual(String carrera, Double notaMedia);

    // 2. Consulta personalizada con JPQL (Orientada a Objetos)
    @Query("SELECT e FROM Estudiante e WHERE e.carrera = :carrera AND e.activo = true ORDER BY e.notaMedia DESC")
    List<Estudiante> findActivosPorCarrera(@Param("carrera") String carrera);

    // 3. Consulta Nativa MySQL (Para funciones complejas, CTEs o Window Functions)
    @Query(value = """
        SELECT e.*, RANK() OVER(PARTITION BY carrera ORDER BY nota_media DESC) as ranking
        FROM estudiantes e
        WHERE carrera = :carrera
        """, nativeQuery = true)
    List<Estudiante> findRankingPorCarreraNative(@Param("carrera") String carrera);
}`;

  const handleCopy = (code, tab) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    }
  };

  return (
    <div className="sql-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sql-modal-window sql-backend-window" onClick={(e) => e.stopPropagation()}>
        <div className="sql-modal-header">
          <div className="sql-modal-header-left">
            <span className="sql-modal-icon">🔌</span>
            <div>
              <h2 className="sql-modal-title">Integración Backend: PHP PDO & Java Spring Boot</h2>
              <p className="sql-modal-subtitle">
                Aprende cómo conectar y ejecutar de forma segura tus consultas SQL desde la capa de persistencia
              </p>
            </div>
          </div>
          <button type="button" className="sql-modal-close-btn" onClick={onClose} aria-label="Cerrar Integración">
            ✕
          </button>
        </div>

        {/* Tabs de Selección de Tecnología */}
        <div className="sql-backend-tabs-bar">
          <button
            type="button"
            className={`sql-backend-tab-btn ${activeTab === 'php' ? 'active' : ''}`}
            onClick={() => setActiveTab('php')}
          >
            🐘 PHP con PDO (SEPE / Web Backend)
          </button>
          <button
            type="button"
            className={`sql-backend-tab-btn ${activeTab === 'java' ? 'active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            ☕ Java con Spring Data JPA & Hibernate (DAM/DAW)
          </button>
        </div>

        <div className="sql-backend-body">
          {activeTab === 'php' ? (
            <div className="sql-backend-pane">
              <div className="sql-backend-summary">
                <span className="sql-backend-badge php">Patrón Recomendado en PHP</span>
                <p>
                  Utiliza siempre <strong>PDO con Sentencias Preparadas (Prepared Statements)</strong>. Nunca concatenes variables directamente en la cadena SQL mediante <code>$sql = "... WHERE id = $id"</code>, ya que expondrías el servidor a ataques de <strong>Inyección SQL</strong>.
                </p>
              </div>

              <div className="sql-backend-code-header">
                <span>📄 Ejemplo de Producción: Conexión y SELECT con Parámetros</span>
                <button
                  type="button"
                  className="sql-tool-btn"
                  onClick={() => handleCopy(phpSnippet, 'php')}
                >
                  {copiedTab === 'php' ? '✓ Copiado' : '📋 Copiar Código'}
                </button>
              </div>

              <pre className="code-block">
                <code>{phpSnippet}</code>
              </pre>

              <div className="sql-backend-crosslink">
                <span>📚 ¿Quieres practicar más con PHP?</span>
                <Link to="/sepe/php-chat" className="sql-crosslink-btn" onClick={onClose}>
                  Abrir Tutor Interactivo de PHP del SEPE ➔
                </Link>
              </div>
            </div>
          ) : (
            <div className="sql-backend-pane">
              <div className="sql-backend-summary">
                <span className="sql-backend-badge java">Patrón Recomendado en Java</span>
                <p>
                  En Spring Boot, <strong>Spring Data JPA</strong> se encarga de la persistencia automática. Puedes usar nombres de métodos derivados, consultas <strong>JPQL</strong> orientadas a entidades o sentencias <strong>Native SQL</strong> con <code>nativeQuery = true</code> para consultas analíticas complejas.
                </p>
              </div>

              <div className="sql-backend-code-header">
                <span>📄 Ejemplo de Producción: Repositorio JpaRepository con Métodos y @Query</span>
                <button
                  type="button"
                  className="sql-tool-btn"
                  onClick={() => handleCopy(javaSnippet, 'java')}
                >
                  {copiedTab === 'java' ? '✓ Copiado' : '📋 Copiar Código'}
                </button>
              </div>

              <pre className="code-block">
                <code>{javaSnippet}</code>
              </pre>

              <div className="sql-backend-crosslink">
                <span>📚 ¿Estás repasando el módulo de Spring Boot?</span>
                <Link to="/spring-boot/initializr" className="sql-crosslink-btn" onClick={onClose}>
                  Abrir Módulo de Spring Boot & Initializr ➔
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

