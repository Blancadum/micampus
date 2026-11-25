import React from 'react';
import { SPRING_AI_GUIA_BLOQUES } from '../data/springAiGuiaData';

export default function SpringAiGuiaTecnicaTab() {
  return (
    <section className="spring-ai-content-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h2 className="spring-ai-section-title" style={{ margin: 0 }}>
            <span>📜</span>
            <span>Guía Técnica: Flujo MCP en Spring AI</span>
          </h2>
          <p className="spring-ai-section-subtitle" style={{ margin: '0.4rem 0 0' }}>
            Documento técnico de referencia alojado en <code>public/fuentes/springboot/ai-spring/Flujo MCP en Spring - Guia Tecnica.md</code>
          </p>
        </div>
        <a
          href="/fuentes/springboot/ai-spring/Flujo MCP en Spring - Guia Tecnica.md"
          download="Flujo-MCP-en-Spring-Guia-Tecnica.md"
          style={{
            background: '#0284c7',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.88rem'
          }}
        >
          📥 Descargar .md
        </a>
      </div>

      <div className="spring-ai-callout info" style={{ marginBottom: '1.5rem' }}>
        <span>ℹ️</span>
        <div>
          Esta guía consolida la transición de la programación tradicional (determinista) a la Inteligencia Artificial (probabilística) en entornos empresariales con Spring Boot, Anthropic Claude y Docker.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {SPRING_AI_GUIA_BLOQUES.map((bloque) => (
          <div 
            key={bloque.id}
            style={{ 
              background: 'var(--bg-card, #ffffff)', 
              border: '1px solid var(--border-subtle, #e2e8f0)', 
              borderRadius: '14px', 
              padding: '1.5rem' 
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7', margin: '0 0 0.8rem' }}>
              {bloque.titulo}
            </h3>
            {bloque.descripcion && (
              <p style={{ lineHeight: 1.6, color: 'var(--text-main, #334155)', margin: '0 0 1rem' }}>
                {bloque.descripcion}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '0.5rem' }}>
              {bloque.temas.map((tema) => (
                <div key={tema.id}>
                  <h4 style={{ margin: '0 0 0.3rem', fontSize: '1rem', fontWeight: 750, color: 'var(--text-title)' }}>
                    {tema.titulo}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {tema.puntos.map((pt, pIdx) => (
                      <React.Fragment key={pIdx}>
                        {pIdx > 0 && <br />}
                        • <strong>{pt.num}</strong> {pt.texto}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
