import React from 'react';

export default function BrainTopicCommonAndCompare({ commonPoints = [], crossCompare = [] }) {
  if ((!commonPoints || commonPoints.length === 0) && (!crossCompare || crossCompare.length === 0)) {
    return null;
  }

  return (
    <section id="puntos-comunes" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.5rem' }}>📌</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>
            Puntos Clave en Común a Todas las Asignaturas
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Cómo este conocimiento se cruza e interconecta entre IOC, Accenture y SEPE
          </span>
        </div>
      </div>

      {commonPoints.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {commonPoints.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '1.3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.15)',
                    color: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  {idx + 1}
                </span>
                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-title)', fontWeight: 700 }}>
                  {item.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comparativa por asignaturas */}
      {crossCompare.length > 0 && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            marginTop: '0.5rem',
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: '0.92rem',
              color: 'var(--text-title)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            🎯 Aplicación Concreta en Cada Campus
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {crossCompare.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    background:
                      item.type === 'acc'
                        ? 'rgba(117,0,193,0.12)'
                        : item.type === 'ioc'
                        ? 'rgba(37,99,235,0.12)'
                        : 'rgba(234,88,12,0.12)',
                    color:
                      item.type === 'acc'
                        ? '#7500c1'
                        : item.type === 'ioc'
                        ? '#2563eb'
                        : '#ea580c',
                  }}
                >
                  {item.campus}
                </span>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
