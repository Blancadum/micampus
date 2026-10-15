import React from 'react';
import { Link } from 'react-router-dom';

const documentationImage = '/documents/Tri%CC%81ada_de_documentacio%CC%81n_en_IA.png';

export default function AccentureDocumentation() {
  return (
    <main className="content-main" role="main" style={{ padding: '2rem 5%' }}>
      <div
        className="campus-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1.5rem'
        }}
      >
        <div style={{ fontSize: '2.5rem' }} aria-hidden="true">🧭</div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-title)' }}>
            Documentación para trabajar con IA
          </h1>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Guía visual para dar contexto, dirección y límites a tus herramientas de IA.
          </p>
        </div>
      </div>

      <article
        className="campus-card"
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginTop: 0 }}>
          Consulta la tríada de documentación recomendada para que una persona o una IA
          pueda entender el proyecto, sus decisiones y la forma correcta de trabajar en él.
        </p>

        <a
          href={documentationImage}
          target="_blank"
          rel="noreferrer"
          title="Abrir la imagen en una pestaña nueva"
        >
          <img
            src={documentationImage}
            alt="Tríada de documentación en IA"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          />
        </a>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/accenture" className="theme-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            ← Volver a Accenture
          </Link>
        </div>
      </article>
    </main>
  );
}
