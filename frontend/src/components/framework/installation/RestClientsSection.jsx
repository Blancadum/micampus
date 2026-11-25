import React from 'react';

/**
 * Sección 5: Clientes HTTP REST (Postman, cURL, HTTPie) para pruebas de endpoints.
 */
export default function RestClientsSection() {
  return (
    <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📮</span> 5. Postman & Alternativas para Probar APIs REST
        </h3>
        <a href="https://www.postman.com/downloads/" target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
          🌐 Descargar Postman Desktop ↗
        </a>
      </div>

      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
        Spring Boot expone servicios HTTP REST. Puedes enviar peticiones de prueba utilizando Postman o directamente desde tu consola con cURL o HTTPie:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', display: 'block', marginBottom: '0.4rem' }}>
            Petición rápida con cURL (Nativo en terminal):
          </span>
          <code style={{ fontSize: '0.82rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.45rem 0.7rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
            curl -i http://localhost:8080/api/saludo
          </code>
        </div>

        <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', display: 'block', marginBottom: '0.4rem' }}>
            Petición rápida con HTTPie (más amigable):
          </span>
          <code style={{ fontSize: '0.82rem', background: 'var(--bg-input, #0f172a)', color: '#38bdf8', padding: '0.45rem 0.7rem', borderRadius: '6px', display: 'block', overflowX: 'auto' }}>
            http GET :8080/api/saludo
          </code>
        </div>
      </div>
    </section>
  );
}
