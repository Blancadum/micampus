import React from 'react';

/**
 * Ilustración SVG limpia y agnóstica de asignatura para las lecciones de introducción.
 * Lee la definición del diagrama desde gestionData.unitDiagrams (sin hardcodear asignaturas).
 */
export default function UnitIntroDiagram({ unitName, unitDiagrams = {}, accent = '#22c55e', headingId, headingTitle }) {
  const uMatch = (unitName || '').match(/(?:U|Unidad|Bloque)\s*(\d+)/i);
  const unitCode = uMatch ? `U${uMatch[1]}` : 'U1';
  const diagram = unitDiagrams?.[unitCode] || unitDiagrams?.[unitCode.toLowerCase()] || null;

  if (!diagram || !Array.isArray(diagram.nodes) || diagram.nodes.length === 0) return null;

  return (
    <section id={headingId} className="topic-body" style={{ marginTop: '0.25rem', marginBottom: '1.5rem' }}>
      {headingTitle && (
        <h2 className="lesson-h2">
          {headingTitle}
        </h2>
      )}
      <p style={{ margin: '0 0 0.75rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
        {diagram.subtitle}
      </p>

      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '1rem',
        overflowX: 'auto'
      }}>
        <svg viewBox="0 0 820 165" style={{ width: '100%', maxWidth: '820px', height: 'auto', display: 'block', margin: '0 auto' }}>
          <defs>
            <marker id="intro-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill={accent || '#22c55e'} />
            </marker>
          </defs>

          {diagram.arrows.map((a, idx) => (
            <g key={idx}>
              <line
                x1={a.fromX}
                y1={82}
                x2={a.toX - 2}
                y2={82}
                stroke={accent || '#22c55e'}
                strokeWidth="2"
                markerEnd="url(#intro-arrow)"
              />
              <text
                x={(a.fromX + a.toX) / 2}
                y={72}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="currentColor"
                opacity="0.7"
              >
                {a.label}
              </text>
            </g>
          ))}

          {diagram.nodes.map((node, idx) => (
            <g key={idx} transform={`translate(${node.x}, 14)`}>
              <rect
                width="200"
                height="136"
                rx="12"
                fill="var(--bg-card, #ffffff)"
                stroke={node.color}
                strokeWidth="2"
              />
              <rect width="200" height="32" rx="12" fill={node.color} opacity="0.14" />
              <text x="100" y="21" textAnchor="middle" fontSize="12" fontWeight="800" fill={node.color}>
                {node.title}
              </text>
              {node.items.map((item, iIdx) => (
                <text
                  key={iIdx}
                  x="16"
                  y={56 + iIdx * 26}
                  fontSize="11"
                  fontWeight="600"
                  fill="currentColor"
                  opacity="0.85"
                >
                  • {item}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
