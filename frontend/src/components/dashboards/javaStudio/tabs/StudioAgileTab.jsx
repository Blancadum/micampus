import React, { useState, useMemo, useEffect } from 'react';
import AgileScrumStudio from '../../acc/AgileScrumStudio.jsx';
import { IconArrowLeft, IconArrowRight } from '../StudioIcons.jsx';

const AGILE_SECTIONS = [
  { id: 'marco', title: '1. Marco & Roles', subtitle: 'Product Owner, Scrum Master, Developers', icon: '🏃' },
  { id: 'ceremonias', title: '2. 5 Ceremonias', subtitle: 'Sprint, Daily, Planning, Review, Retro', icon: '⏱️' },
  { id: 'artefactos', title: '3. Artefactos & DoD', subtitle: 'Product Backlog, Sprint Backlog, Increment', icon: '📦' },
  { id: 'simulador', title: '4. Simulador Examen (10 Q)', subtitle: 'Preguntas oficiales de certificación', icon: '📝' },
  { id: 'repaso', title: '5. Hoja Resumen & Chuleta', subtitle: 'Casos de producción vs Cascada', icon: '📑' },
  { id: 'git', title: '6. Git & GitHub Ágil', subtitle: 'GitFlow, ramas y pull requests', icon: '🐙' },
  { id: 'multimedia', title: '7. Vídeo & Recursos Sala', subtitle: 'Grabación de clase y apuntes', icon: '🎥' }
];

export default function StudioAgileTab({ initialSlug = 'marco' }) {
  const derivedTab = useMemo(() => {
    const clean = String(initialSlug || '').toLowerCase().trim();
    if (clean.includes('rol') || clean === 'marco') return 'marco';
    if (clean.includes('ceremonia') || clean.includes('evento') || clean === 'daily' || clean === 'sprint') return 'ceremonias';
    if (clean.includes('artefact') || clean === 'dod') return 'artefactos';
    if (clean.includes('simula') || clean.includes('quiz') || clean.includes('test') || clean.includes('pregunt')) return 'simulador';
    if (clean.includes('repaso') || clean.includes('chuleta') || clean.includes('cascada')) return 'repaso';
    if (clean.includes('git') || clean.includes('github') || clean.includes('backup') || clean.includes('version')) return 'git';
    if (clean.includes('video') || clean.includes('multimedia') || clean.includes('recurso')) return 'multimedia';
    return 'marco';
  }, [initialSlug]);

  const [activeTab, setActiveTab] = useState(derivedTab);

  useEffect(() => {
    setActiveTab(derivedTab);
  }, [derivedTab]);

  const currentIndex = AGILE_SECTIONS.findIndex((s) => s.id === activeTab);
  const currentSection = AGILE_SECTIONS[currentIndex] || AGILE_SECTIONS[0];

  const handlePrev = () => {
    if (currentIndex > 0) setActiveTab(AGILE_SECTIONS[currentIndex - 1].id);
  };
  const handleNext = () => {
    if (currentIndex < AGILE_SECTIONS.length - 1) setActiveTab(AGILE_SECTIONS[currentIndex + 1].id);
  };

  return (
    <div className="studio-agile-tab-wrapper" style={{ width: '100%', minWidth: 0 }}>
      {/* CABECERA COMPACTA DE METODOLOGÍAS ÁGILES */}
      <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
              Metodologías Ágiles & Scrum Framework
            </span>
            <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Guía Oficial Scrum, Ceremonias y Artefactos
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="studio-btn-secondary"
              style={{ opacity: currentIndex <= 0 ? 0.5 : 1, cursor: currentIndex <= 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            >
              <IconArrowLeft size={14} /> Anterior
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= AGILE_SECTIONS.length - 1}
              className="studio-btn-secondary"
              style={{ opacity: currentIndex >= AGILE_SECTIONS.length - 1 ? 0.5 : 1, cursor: currentIndex >= AGILE_SECTIONS.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            >
              Siguiente <IconArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* BARRA DE APARTADOS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            overflowX: 'auto',
            padding: '0.45rem 0.65rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}
        >
          {AGILE_SECTIONS.map((sec) => {
            const isSelected = sec.id === activeTab;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(sec.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.28rem 0.6rem',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                  background: isSelected ? '#6d28d9' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  fontSize: '0.77rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: isSelected ? '0 1px 4px rgba(109, 40, 217, 0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'all 0.12s ease'
                }}
              >
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TÍTULO PRINCIPAL FUERA DE LA CAJA */}
      <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
        {currentSection.title} · {currentSection.subtitle}
      </h1>

      <AgileScrumStudio isEmbedded={true} initialTab={activeTab} hideNav={true} />
    </div>
  );
}
