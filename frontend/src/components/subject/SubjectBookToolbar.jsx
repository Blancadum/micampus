import React, { useState } from 'react';

const btnLinkStyle = {
  padding: '0.4rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-subtle)',
  color: 'var(--text-title)',
  fontWeight: 700,
  fontSize: '0.82rem',
  textDecoration: 'none'
};

export default function SubjectBookToolbar({
  subject,
  activeLesson,
  unitNames = [],
  accent = '#22c55e',
  onOpenGamify,
  onOpenMaterialAgent,
  onToggleLesson
}) {
  const [showGlossaryMenu, setShowGlossaryMenu] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <a
        href={`/api/subjects/${encodeURIComponent(subject.id)}/export-pdf?lessonId=${encodeURIComponent(activeLesson.id)}`}
        download
        title="Descargar esta lección en PDF (PDFBox)"
        style={btnLinkStyle}
      >
        📄 PDF
      </a>

      {activeLesson.unit && (
        <a
          href={`/api/subjects/${encodeURIComponent(subject.id)}/export-pdf?unit=${encodeURIComponent(activeLesson.unit)}`}
          download
          title="Descargar toda esta unidad en PDF (PDFBox)"
          style={btnLinkStyle}
        >
          📚 PDF Unidad
        </a>
      )}

      <a
        href={`/api/subjects/${encodeURIComponent(subject.id)}/export-diagrams-pdf`}
        download
        title="Descargar PDF de diagramas: pág 1 mapa global + 1 pág por unidad"
        style={btnLinkStyle}
      >
        🗺️ Diagramas
      </a>

      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setShowGlossaryMenu((v) => !v)}
          title="Descargar glosario en PDF (general o por unidad)"
          style={{
            ...btnLinkStyle,
            background: showGlossaryMenu ? `${accent}18` : 'var(--bg-subtle)',
            cursor: 'pointer'
          }}
        >
          📖 Glosario ▾
        </button>

        {showGlossaryMenu && (
          <div
            style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              minWidth: '240px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.14)',
              padding: '0.4rem',
              zIndex: 120,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}
          >
            <a
              href={`/api/subjects/${encodeURIComponent(subject.id)}/export-glossary-pdf`}
              download
              onClick={() => setShowGlossaryMenu(false)}
              style={{
                padding: '0.45rem 0.65rem',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--text-title)',
                fontWeight: 700,
                fontSize: '0.8rem',
                background: `${accent}12`
              }}
            >
              🌐 Glosario general completo
            </a>
            {unitNames.map((uName) => (
              <a
                key={uName}
                href={`/api/subjects/${encodeURIComponent(subject.id)}/export-glossary-pdf?unit=${encodeURIComponent(uName)}`}
                download
                onClick={() => setShowGlossaryMenu(false)}
                style={{
                  padding: '0.4rem 0.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.78rem'
                }}
              >
                📘 {uName}
              </a>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenGamify}
        title="Configurar y generar quiz gamificado con IA"
        style={{
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          border: `1px solid ${accent}45`,
          background: `${accent}14`,
          cursor: 'pointer',
          color: accent,
          fontWeight: 700,
          fontSize: '0.82rem'
        }}
      >
        🎮 Quizes
      </button>

      <button
        type="button"
        onClick={onOpenMaterialAgent}
        style={{
          padding: '0.4rem 0.85rem',
          borderRadius: '8px',
          border: `1px solid ${accent}45`,
          background: `${accent}14`,
          cursor: 'pointer',
          color: accent,
          fontWeight: 700,
          fontSize: '0.82rem'
        }}
      >
        ✨ Auditar y mejorar
      </button>

      <button
        type="button"
        onClick={onToggleLesson}
        style={{
          padding: '0.4rem 0.85rem',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          background: activeLesson.completed ? '#22c55e' : 'var(--bg-subtle)',
          cursor: 'pointer',
          color: activeLesson.completed ? '#fff' : 'var(--text-title)',
          fontWeight: 700,
          fontSize: '0.82rem'
        }}
      >
        {activeLesson.completed ? 'Completada' : 'Marcar completada'}
      </button>
    </div>
  );
}
