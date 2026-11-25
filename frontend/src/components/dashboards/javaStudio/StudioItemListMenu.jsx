import React, { useState, useMemo } from 'react';
import { IconSearch } from './StudioIcons.jsx';

/**
 * ============================================================================
 * @component   StudioItemListMenu
 * @description Menú lateral vertical reutilizable para listas de elementos
 *              (Capítulos de libro, Actividades, Lecciones POO, Tutorías).
 *              Soporta insignia numérica circular, título truncado, subtítulo,
 *              buscador reactivo, badge de progreso y fijación sticky.
 * ============================================================================
 */
export default function StudioItemListMenu({
  title = 'Contenidos',
  icon = '📑',
  badgeText = null,
  items = [], // Array de { id, indexLabel, title, subtitle, badge }
  selectedId,
  onSelect,
  stickyTop = '1rem',
  searchable = false,
  searchPlaceholder = 'Buscar en la lista...',
  accentColor = '#6d28d9',
  bgActive = 'rgba(109, 40, 217, 0.08)',
  showIndexBadge = true
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(it => 
      (it.title && it.title.toLowerCase().includes(q)) ||
      (it.subtitle && it.subtitle.toLowerCase().includes(q)) ||
      (it.indexLabel && String(it.indexLabel).toLowerCase().includes(q))
    );
  }, [items, searchable, searchQuery]);

  const currentIndex = items.findIndex(it => String(it.id) === String(selectedId));
  const displayBadge = badgeText || (currentIndex !== -1 ? `${currentIndex + 1} de ${items.length}` : `${items.length} items`);

  return (
    <aside 
      className="studio-card studio-item-list-menu" 
      style={{ 
        padding: '0.85rem', 
        position: 'sticky', 
        top: stickyTop,
        maxHeight: 'calc(100vh - 5rem)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      {/* CABECERA DEL MENÚ */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '0.65rem', 
          paddingBottom: '0.5rem', 
          borderBottom: '1px solid #e2e8f0',
          flexShrink: 0
        }}
      >
        <span 
          style={{ 
            fontSize: '0.78rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            color: accentColor, 
            letterSpacing: '0.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span>{icon}</span> {title}
        </span>
        <span 
          className="studio-badge" 
          style={{ 
            fontSize: '0.72rem',
            background: bgActive,
            color: accentColor,
            fontWeight: 700
          }}
        >
          {displayBadge}
        </span>
      </div>

      {/* BUSCADOR OPCIONAL */}
      {searchable && items.length > 8 && (
        <div style={{ position: 'relative', marginBottom: '0.65rem', flexShrink: 0 }}>
          <IconSearch 
            style={{ 
              position: 'absolute', 
              left: '0.65rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#94a3b8',
              fontSize: '0.85rem'
            }} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              width: '100%',
              padding: '0.4rem 0.65rem 0.4rem 1.9rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              outline: 'none',
              background: '#ffffff',
              boxSizing: 'border-box'
            }}
          />
        </div>
      )}

      {/* LISTA NAVEGABLE CON SCROLL INTERNO */}
      <nav 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.35rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '0.2rem'
        }}
      >
        {filteredItems.map((item, idx) => {
          const isSelected = String(item.id) === String(selectedId);
          const circleLabel = item.indexLabel !== undefined ? item.indexLabel : (idx + 1);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`studio-tab-btn ${isSelected ? 'active' : ''}`}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                borderRadius: showIndexBadge ? '8px' : '0 6px 6px 0',
                padding: showIndexBadge ? '0.55rem 0.75rem' : '0.5rem 0.75rem',
                border: showIndexBadge
                  ? (isSelected ? `1.5px solid ${accentColor}` : '1px solid transparent')
                  : 'none',
                borderLeft: showIndexBadge
                  ? (isSelected ? `1.5px solid ${accentColor}` : '1px solid transparent')
                  : (isSelected ? `3px solid ${accentColor}` : '3px solid transparent'),
                background: isSelected ? bgActive : 'transparent',
                color: isSelected ? accentColor : '#475569',
                display: 'flex',
                gap: showIndexBadge ? '0.65rem' : '0.5rem',
                alignItems: 'center',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              {/* INSIGNIA NUMERADA / EPÍGRAFE (OPCIONAL, SIN BOLITAS SI ES FALSE) */}
              {showIndexBadge && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '26px',
                    height: '24px',
                    padding: '0 5px',
                    borderRadius: '12px',
                    background: isSelected ? accentColor : '#e2e8f0',
                    color: isSelected ? '#ffffff' : '#64748b',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    flexShrink: 0,
                    transition: 'background 0.15s ease'
                  }}
                >
                  {circleLabel}
                </span>
              )}

              {/* TÍTULOS Y SUBTÍTULOS */}
              <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
                <div 
                  style={{ 
                    fontSize: '0.84rem', 
                    fontWeight: isSelected ? 800 : 600, 
                    whiteSpace: 'nowrap', 
                    textOverflow: 'ellipsis', 
                    overflow: 'hidden',
                    lineHeight: 1.3
                  }}
                  title={item.title}
                >
                  {item.title}
                </div>
                {item.subtitle && (
                  <div 
                    style={{ 
                      fontSize: '0.7rem', 
                      color: isSelected ? accentColor : '#94a3b8',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      opacity: isSelected ? 0.9 : 1
                    }}
                  >
                    {item.subtitle}
                  </div>
                )}
              </div>

              {/* BADGE COMPLEMENTARIO (OPCIONAL) */}
              {item.badge && (
                <span 
                  style={{ 
                    fontSize: '0.65rem', 
                    padding: '0.15rem 0.4rem', 
                    borderRadius: '4px',
                    background: isSelected ? '#ffffff' : '#f1f5f9',
                    color: isSelected ? accentColor : '#64748b',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {filteredItems.length === 0 && (
          <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem' }}>
            No se encontraron elementos
          </div>
        )}
      </nav>
    </aside>
  );
}
