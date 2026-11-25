import React from 'react';

export const FILTERS = [
  { id: 'all', label: 'Todas las materias', emoji: '🌐' },
  { id: 'ai', label: 'Inteligencia Artificial', emoji: '🤖' },
  { id: 'vm', label: 'Virtualización & Mac', emoji: '💻' },
  { id: 'git', label: 'Git & Versionado', emoji: '🌿' },
  { id: 'http', label: 'HTTP & APIs REST', emoji: '🌐' },
  { id: 'docker', label: 'Docker & Servidores', emoji: '🐳' },
  { id: 'data', label: 'SQL & Persistencia', emoji: '🗄️' },
  { id: 'arch', label: 'Patrones & Arquitectura', emoji: '📐' }
];

export const FEATURED_TAGS = [
  { id: 'all', label: 'Todas las etiquetas', icon: '🏷️' },
  { id: 'IA', label: 'IA (General)', icon: '🤖' },
  { id: 'IA local', label: 'IA Local (0€)', icon: '💻' },
  { id: 'Hermes', label: 'Hermes Bot', icon: '🕊️' },
  { id: 'Copilot', label: 'GitHub Copilot', icon: '🐙' },
  { id: 'Spring Boot', label: 'Spring Boot', icon: '🍃' },
  { id: 'Accenture', label: 'Accenture', icon: '🏢' },
  { id: 'Virtualización', label: 'Virtualización', icon: '🖥️' },
  { id: 'Docker', label: 'Docker', icon: '🐳' },
  { id: 'Git', label: 'Git & GitHub', icon: '🌿' },
  { id: 'SQL', label: 'SQL & Datos', icon: '🗄️' }
];

export default function BrainMatrixFilters({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Buscador de texto */}
      <div style={{ position: 'relative', width: '100%' }}>
        <input 
          type="text"
          placeholder="🔍 Buscar por concepto, comando, Docker, Spring, SQL o patrón..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md, 12px)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-primary)',
            color: 'var(--text-title)',
            fontSize: '0.95rem',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        />
        {searchTerm && (
          <button 
            type="button"
            onClick={() => onSearchChange('')}
            style={{ 
              position: 'absolute', 
              right: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-muted)', 
              fontSize: '1rem' 
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros de materias */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {FILTERS.map(f => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full, 9999px)',
                border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-primary)',
                color: isActive ? 'var(--accent-purple)' : 'var(--text-main)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
