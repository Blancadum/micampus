import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowLeft,
  IconSidebar,
  IconChevronDown,
  IconChevronRight
} from './StudioIcons.jsx';

/**
 * ============================================================================
 * @component   StudioNavigationSidebar
 * @description Barra de navegación lateral vertical modular y reutilizable para
 *              Java Studio, Spring Boot y portales modulares de Campus.
 *              Soporta colapsado suave, insignias dinámicas, árbol desplegable
 *              con apartados y subapartados temáticos, grupos y enlaces activos.
 * ============================================================================
 */
export default function StudioNavigationSidebar({
  isCollapsed = false,
  onToggleCollapse,
  hubLink = '/java',
  hubLabel = 'Hub',
  brandLabel = 'Java & Spring Studio',
  sections = [],
  activeSectionId,
  activeSubItemId,
  isSectionExpanded, // (secId) => boolean
  onSelectSection,   // (secId) => void
  onToggleSection,   // (secId) => void
  onSelectSubItem    // (secId, subId, e) => void
}) {
  const [toggledGroups, setToggledGroups] = useState({});

  const isGroupOpen = (secId, grp) => {
    const key = `${secId}:${grp.id}`;
    if (toggledGroups[key] !== undefined) {
      return toggledGroups[key];
    }
    const items = grp.items || grp.views || [];
    const hasActive = items.some((item) => {
      const targetId = item.id || item.slug || (item.mode ? `${grp.id}/${item.mode}` : null);
      return String(activeSubItemId) === String(targetId);
    });
    if (hasActive) return true;
    return grp.defaultOpen ?? (secId === 'proyectos');
  };

  const handleToggleGroup = (secId, grpId, grp, e) => {
    e.stopPropagation();
    const key = `${secId}:${grpId}`;
    setToggledGroups((prev) => ({
      ...prev,
      [key]: !isGroupOpen(secId, grp)
    }));
  };
  return (
    <aside className={`java-studio-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* CABECERA DEL SIDEBAR */}
      <div className="studio-sidebar-header">
        <div className="studio-sidebar-top-actions">
          <Link
            to={hubLink}
            className="studio-btn-secondary"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem' }}
            title={`Volver a ${hubLabel}`}
          >
            <IconArrowLeft /> {!isCollapsed && hubLabel}
          </Link>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="challenge-nav-btn"
            style={{ padding: '0.35rem 0.55rem', display: 'flex', alignItems: 'center' }}
            title={isCollapsed ? 'Expandir Menú Lateral' : 'Contraer Menú Lateral'}
          >
            <IconSidebar style={{ fontSize: '0.9rem' }} />
          </button>
        </div>

        {!isCollapsed && (
          <div className="studio-sidebar-brand">
            <span className="java-studio-badge-pill" style={{ fontSize: '0.72rem' }}>
              {brandLabel}
            </span>
          </div>
        )}
      </div>

      {/* ÁRBOL DE NAVEGACIÓN VERTICAL */}
      <nav className="studio-sidebar-nav">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSectionId === sec.id;
          const isExpanded = isSectionExpanded ? isSectionExpanded(sec.id) : false;

          return (
            <div key={sec.id} className="studio-nav-section">
              {/* BOTÓN PRINCIPAL DE SECCIÓN */}
              <button
                type="button"
                onClick={() => {
                  if (!isActive) {
                    onSelectSection(sec.id);
                  } else if (onToggleSection) {
                    onToggleSection(sec.id);
                  }
                }}
                className={`studio-nav-item-btn ${isActive ? 'active' : ''}`}
                title={sec.label}
              >
                <div className="studio-nav-item-content">
                  {Icon && <Icon style={{ fontSize: '1.05rem', flexShrink: 0 }} />}
                  {!isCollapsed && (
                    <span className="studio-nav-item-label">{sec.label}</span>
                  )}
                </div>

                {!isCollapsed && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {sec.badge && (
                      <span className="studio-nav-item-badge">{sec.badge}</span>
                    )}
                    {(sec.subitems || sec.groups) && (
                      isExpanded ? (
                        <IconChevronDown style={{ fontSize: '0.75rem', opacity: 0.7 }} />
                      ) : (
                        <IconChevronRight style={{ fontSize: '0.75rem', opacity: 0.7 }} />
                      )
                    )}
                  </div>
                )}
              </button>

              {/* SUBAPARTADOS DESPLEGABLES SEGÚN LA SECCIÓN */}
              {!isCollapsed && isExpanded && (
                <div className="studio-subapartados-tree">
                  {/* CASO A: APARTADOS Y SUBAPARTADOS DESPLEGABLES (GRUPOS) */}
                  {sec.groups && sec.groups.map((grp) => {
                    const isOpen = isGroupOpen(sec.id, grp);
                    const items = grp.items || grp.views || [];
                    const isGroupActive = isActive && items.some((it) => String(activeSubItemId) === String(it.id || it.slug || (it.mode ? `${grp.id}/${it.mode}` : null)));

                    return (
                      <div key={grp.id} style={{ marginBottom: '0.15rem' }}>
                        {/* CABECERA DEL APARTADO (DISCRETA Y MINIMALISTA) */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleGroup(sec.id, grp.id, grp, e)}
                          className={`studio-group-header-btn ${isGroupActive ? 'active' : ''}`}
                          title={grp.label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span style={{ color: isGroupActive ? '#7c3aed' : '#94a3b8', fontSize: '0.75rem' }}>
                              {isGroupActive ? '▸' : '•'}
                            </span>
                            <span>{grp.label}</span>
                          </span>
                          <span style={{ fontSize: '0.72rem', opacity: isGroupActive ? 0.95 : 0.6, color: isGroupActive ? '#7c3aed' : 'inherit', marginLeft: '0.4rem', flexShrink: 0 }}>
                            {isOpen ? <IconChevronDown style={{ fontSize: '0.75rem' }} /> : <IconChevronRight style={{ fontSize: '0.75rem' }} />}
                          </span>
                        </button>

                        {/* SUBAPARTADOS DESPLEGABLES */}
                        {isOpen && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', paddingLeft: '0.75rem', marginTop: '0.15rem', marginBottom: '0.25rem' }}>
                            {items.map((it) => {
                              const targetId = it.id || it.slug || (it.mode ? `${grp.id}/${it.mode}` : null);
                              const isItemActive = isActive && String(activeSubItemId) === String(targetId);
                              return (
                                <button
                                  key={targetId}
                                  type="button"
                                  onClick={(e) => onSelectSubItem && onSelectSubItem(sec.id, targetId, e)}
                                  className={`studio-sub-item-btn ${isItemActive ? 'active' : ''}`}
                                  style={{
                                    fontSize: '0.76rem',
                                    padding: '0.28rem 0.5rem',
                                    fontWeight: isItemActive ? 700 : 500
                                  }}
                                  title={it.label || it.title}
                                >
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {isItemActive ? '▸ ' : '· '} {it.label || it.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* CASO B: LISTA DIRECTA DE SUBAPARTADOS */}
                  {sec.subitems && sec.subitems.map((sub) => {
                    const targetId = sub.slug || sub.id;
                    const isSubActive = isActive && String(activeSubItemId) === String(targetId);
                    return (
                      <button
                        key={targetId}
                        type="button"
                        onClick={(e) => onSelectSubItem && onSelectSubItem(sec.id, targetId, e)}
                        className={`studio-sub-item-btn ${isSubActive ? 'active' : ''}`}
                      >
                        <span>{isSubActive ? '▸ ' : '• '} {sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* BOTÓN INFERIOR: LANDING DEL PROYECTO ENTREGADO (MEMORIA EXPLICATIVA) */}
      <div
        className="studio-sidebar-footer"
        style={{
          padding: isCollapsed ? '0.6rem 0.35rem' : '0.85rem 0.75rem',
          borderTop: '1px solid #e2e8f0',
          marginTop: 'auto',
          background: '#ffffff'
        }}
      >
        <Link
          to="/springboot/libreria/por-capas"
          className="studio-btn-delivered-project"
          title="Ver Memoria & Explicación del Proyecto Entregado"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            gap: '0.5rem',
            width: '100%',
            padding: isCollapsed ? '0.6rem 0.4rem' : '0.65rem 0.85rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
            transition: 'all 0.15s ease'
          }}
        >
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🏆</span>
          {!isCollapsed && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Proyecto Entregado
                </span>
                <span style={{ fontSize: '0.68rem', opacity: 0.9, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Memoria & Explicación
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>➔</span>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}
