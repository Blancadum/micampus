import React from 'react';

/**
 * ============================================================================
 * @component   CollapsibleMasterAside
 * @description Barra lateral maestra vertical reutilizable (Aside Left) para MiCampus.
 *              Soporta colapsado/desplegado suave, buscador reactivo, controles de
 *              acordeón, botón flotante de reapertura y área de progreso en el pie.
 * ============================================================================
 */
export default function CollapsibleMasterAside({
  isOpen = true,
  onToggle,
  title = 'Índice de Contenidos',
  subtitle,
  icon = '📚',
  badge,
  searchQuery,
  onSearchChange,
  searchPlaceholder = '🔍 Buscar...',
  onExpandAll,
  onCollapseAll,
  children,
  footer,
  width = 320,
  ariaLabel = 'Navegación Lateral'
}) {
  return (
    <>
      <style>{`
        .master-aside-wrapper {
          display: flex;
          position: relative;
          flex-shrink: 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .master-aside-container {
          width: ${width}px;
          flex-shrink: 0;
          position: sticky;
          top: 75px;
          max-height: calc(100vh - 95px);
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .master-aside-container::-webkit-scrollbar {
          width: 5px;
        }
        .master-aside-container::-webkit-scrollbar-thumb {
          background: var(--border-subtle);
          border-radius: 4px;
        }
        .master-aside-floating-toggle {
          position: fixed;
          top: 140px;
          left: 0;
          z-index: 1000;
          background: var(--bg-card);
          color: var(--text-title);
          border: 1px solid var(--border-subtle);
          border-left: none;
          border-radius: 0 10px 10px 0;
          padding: 0.65rem 0.85rem;
          font-size: 0.82rem;
          font-weight: 750;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }
        .master-aside-floating-toggle:hover {
          background: var(--bg-hover);
          color: #3b82f6;
          transform: translateX(3px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
        }
        @media (max-width: 960px) {
          .master-aside-container {
            width: 100% !important;
            position: static;
            max-height: none;
          }
          .master-aside-floating-toggle {
            top: auto;
            bottom: 20px;
          }
        }
      `}</style>

      {/* BOTÓN FLOTANTE CUANDO EL ASIDE ESTÁ REPLEGADO */}
      {!isOpen && (
        <button
          type="button"
          onClick={onToggle}
          className="master-aside-floating-toggle"
          title="Desplegar menú lateral (Aside Left)"
          aria-label="Desplegar menú lateral"
        >
          <span>{icon}</span>
          <span>Mostrar Menú</span>
          <span style={{ fontSize: '0.9rem', color: '#3b82f6', fontWeight: 900 }}>▶</span>
        </button>
      )}

      {/* ASIDE LATERAL DESPLEGADO */}
      {isOpen && (
        <aside className="master-aside-container" aria-label={ariaLabel}>
          {/* CABECERA DEL ASIDE */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.65rem',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{icon}</span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: 'var(--text-title)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {title}
                </h3>
                {subtitle && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>
                    {subtitle}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              {badge && (
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 750,
                  background: 'var(--bg-hover)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '5px',
                  color: 'var(--text-muted)'
                }}>
                  {badge}
                </span>
              )}
              {onToggle && (
                <button
                  type="button"
                  onClick={onToggle}
                  title="Replegar menú lateral para maximizar área de lectura"
                  aria-label="Replegar menú lateral"
                  style={{
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.25rem 0.55rem',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: 700,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <span>◀</span>
                  <span>Ocultar</span>
                </button>
              )}
            </div>
          </div>

          {/* BUSCADOR INTEGRADO (OPCIONAL) */}
          {onSearchChange && (
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-hover)',
                  color: 'var(--text-title)',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* CONTROLES EXPANDIR / CONTRAER TODO (OPCIONAL) */}
          {(onExpandAll || onCollapseAll) && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {onExpandAll && (
                <button
                  type="button"
                  onClick={onExpandAll}
                  style={{
                    flex: 1,
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.5rem',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: 650
                  }}
                >
                  Expandir Todo
                </button>
              )}
              {onCollapseAll && (
                <button
                  type="button"
                  onClick={onCollapseAll}
                  style={{
                    flex: 1,
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.5rem',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: 650
                  }}
                >
                  Contraer Todo
                </button>
              )}
            </div>
          )}

          {/* CUERPO DEL ASIDE: CATEGORÍAS, LISTAS O PESTAÑAS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
            {children}
          </div>

          {/* PIE DEL ASIDE (PROGRESO O ESTADÍSTICAS) */}
          {footer && (
            <div style={{
              marginTop: 'auto',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              {footer}
            </div>
          )}
        </aside>
      )}
    </>
  );
}

