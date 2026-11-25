import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';

/**
 * ============================================================================
 * @component   SpringBootFinalRetoCard
 * @description Tarjeta de Home para el Proyecto Final de Spring Boot (Library API REST)
 *              Permite acceder a la explicación funcional, arquitectura capa a capa,
 *              suite de tests, y descarga de la Memoria Técnica en PDF.
 * ============================================================================
 */
export default function SpringBootFinalRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article
      className={`campus-card ${isArchived ? 'card-is-archived' : ''}`}
      style={{
        borderColor: 'rgba(16, 185, 129, 0.45)',
        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.06) 0%, var(--bg-card) 100%)',
      }}
    >
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Spring Boot · Proyecto Final (Library API REST - Arquitectura Tradicional)"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
            }}
          >
            🏆
          </div>
          <div className="campus-card-titles">
            <h3>Spring Boot · Proyecto Final</h3>
            <span className="campus-institution">Accenture · Library API REST - Arquitectura Tradicional (Java 21 LTS & JWT)</span>
          </div>
        </div>

        <p className="campus-card-desc">
          Servicio web empresarial completo para la gestión de biblioteca: frontend SPA interactivo en HTML5/JS nativo, arquitectura de 3 capas lógicas (8 paquetes desacoplados), control de inventario con transacciones ACID, seguridad stateless con JWT y guía de defensa ante el tribunal.
        </p>

        <div className="campus-features-list">
          <span className="feature-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            🖥️ Frontend index-secure.html
          </span>
          <span className="feature-tag">🏛️ Arquitectura 3 Capas (8 Paquetes)</span>
          <Link
            to="/springboot/libreria/hexagonal"
            className="feature-tag"
            style={{ textDecoration: 'none', color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', fontWeight: 700 }}
            title="Ver evolución a Arquitectura Hexagonal"
          >
            ⬢ Hexagonal
          </Link>
          <span className="feature-tag">🔑 JWT & Roles RBAC</span>
          <span className="feature-tag">🔄 Préstamos & Stock ACID</span>
          <span className="feature-tag">🧪 25 Tests Passing</span>
          <span className="feature-tag">🎓 14 Preguntas Tribunal</span>
          <a
            href="/java-studio/proyectos/libreria-capas/documentacion/Memoria-tecnica-pdf/Memoria_Tecnica.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="feature-tag"
            style={{ textDecoration: 'none', color: '#0ea5e9' }}
            title="Descargar Memoria Técnica Oficial en PDF (45 páginas)"
          >
            📄 Memoria PDF
          </a>
        </div>
      </div>

      <div className="campus-card-actions">
        <Link
          to="/springboot/libreria/por-capas"
          className="btn-enter-campus"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          <span>1. Por Capas</span> <span className="btn-arrow">➔</span>
        </Link>
        <Link
          to="/springboot/libreria/comparativa"
          className="btn-enter-campus"
          style={{
            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          <span>2. Comparador</span> <span className="btn-arrow">➔</span>
        </Link>
        <Link
          to="/springboot/libreria/hexagonal"
          className="btn-enter-campus"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          <span>3. Hexagonal</span> <span className="btn-arrow">➔</span>
        </Link>
        <a
          href="/java-studio/proyectos/libreria-capas/index-secure.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sub-link"
          style={{ textDecoration: 'none' }}
          title="Abrir el frontend HTML en el navegador"
        >
          <span>🌐 Probar Web</span> <span className="btn-arrow">↗</span>
        </a>
      </div>
    </article>
  );
}

