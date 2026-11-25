import React from 'react';

/**
 * Cabecera descriptiva de la sección de Diagnóstico & Errores Clave.
 */
export default function TroubleshootingHeader() {
  return (
    <div 
      style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '20px', 
        padding: '1.8rem' 
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        <span>🐛</span> Diagnóstico & Errores Clave
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-title)' }}>
        Solución Rápida de Problemas Comunes en Spring Boot
      </h2>
      <p style={{ margin: '0.35rem 0 0', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
        Respuestas inmediatas a los fallos más típicos al crear, importar o ejecutar proyectos Spring Boot en local.
      </p>
    </div>
  );
}
