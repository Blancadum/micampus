import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderClock from './HeaderClock';
import HeaderPersistenceWidget from './HeaderPersistenceWidget';
import SlotMenuPopover from './SlotMenuPopover';
import HeaderAuthControls from './HeaderAuthControls';
import { getCampusData, invalidateCampusCache } from '../../utils/campusCache.js';
import './Header.css';

/**
 * Header Minimalista y Modular
 * - Agrupa accesos rápidos en dos menús desplegables personalizables: "Webs Oficiales" y "Secciones"
 * - Mantiene reloj sincronizado, persistencia, buscador global y controles de sesión
 */
export default function Header({ authState, onRefreshAuth }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null); // 'oficiales' | 'secciones' | null
  const [officialLinks, setOfficialLinks] = useState([]);
  const [sectionLinks, setSectionLinks] = useState([]);
  const menuContainerRef = useRef(null);

  useEffect(() => {
    getCampusData({ force: Boolean(authState?.user?.id) })
      .then((data) => {
        if (data?.config) {
          setOfficialLinks(Array.isArray(data.config.officialLinks) ? data.config.officialLinks : []);
          setSectionLinks(Array.isArray(data.config.sectionLinks) ? data.config.sectionLinks : []);
        }
      })
      .catch(() => {});
  }, [authState?.user?.id, authState?.authenticated]);

  const persistLinks = async (field, nextLinks) => {
    if (field === 'officialLinks') setOfficialLinks(nextLinks);
    if (field === 'sectionLinks') setSectionLinks(nextLinks);
    await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: nextLinks })
    });
    invalidateCampusCache();
  };

  // Cerrar al hacer clic fuera o pulsar Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const navLinkStyle = (path) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 0.85rem',
    borderRadius: '10px',
    border: location.pathname === path ? '1px solid var(--c-blue, #3b82f6)' : '1px solid var(--border-subtle)',
    background: location.pathname === path ? 'var(--bg-hover)' : 'var(--bg-card)',
    color: 'var(--text-title)',
    fontSize: '0.88rem',
    fontWeight: 700,
    textDecoration: 'none'
  });

  const dropdownBtnStyle = (menuName) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.45rem 0.85rem',
    borderRadius: '10px',
    border: openMenu === menuName ? '1px solid var(--c-blue, #3b82f6)' : '1px solid var(--border-subtle)',
    background: openMenu === menuName ? 'var(--bg-hover)' : 'var(--bg-card)',
    color: 'var(--text-title)',
    fontSize: '0.88rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  });

  return (
    <header className="main-header">
      <div className="header-wrapper">
        <div className="header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', width: '100%', maxWidth: '100%', margin: 0 }}>

          {/* LADO IZQUIERDO: MARCA + RELOJ + MENÚS AGRUPADOS */}
          <div ref={menuContainerRef} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <div className="brand-section">
              {location.pathname === '/' ? (
                <div className="brand-logo-icon">🎯</div>
              ) : (
                <Link to="/" className="brand-logo-icon brand-link" title="Ir al Inicio de Campus">
                  🎯
                </Link>
              )}
              <div className="brand-titles">
                <h1 className="brand-heading">
                  Campus
                  <a
                    href="/api/scripts/calendar.ics"
                    download="MiCampus.ics"
                    className="btn-sync-pill"
                    title="Descargar e importar calendario unificado (.ics)"
                  >
                    📅 Sincroniza
                  </a>
                </h1>
              </div>
            </div>

            <HeaderClock />
            <HeaderPersistenceWidget />

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleMenu('oficiales')}
                className={`header-menu-dropdown-btn ${openMenu === 'oficiales' ? 'is-active' : ''}`}
                style={dropdownBtnStyle('oficiales')}
              >
                <span>🌐 Webs Oficiales</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.7, transform: openMenu === 'oficiales' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                  ▼
                </span>
              </button>

              {openMenu === 'oficiales' && (
                <SlotMenuPopover
                  headerLabel="Tus Webs Oficiales Favoritas"
                  emptySlotLabel="Añadir web oficial"
                  defaultIcon="🌐"
                  links={officialLinks}
                  onSaveLinks={(next) => persistLinks('officialLinks', next)}
                  onCloseMenu={() => setOpenMenu(null)}
                />
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleMenu('secciones')}
                className={`header-menu-dropdown-btn ${openMenu === 'secciones' ? 'is-active' : ''}`}
                style={dropdownBtnStyle('secciones')}
              >
                <span>📂 Secciones</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.7, transform: openMenu === 'secciones' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                  ▼
                </span>
              </button>

              {openMenu === 'secciones' && (
                <SlotMenuPopover
                  headerLabel="Tus Secciones y Accesos"
                  emptySlotLabel="Añadir sección"
                  defaultIcon="📂"
                  links={sectionLinks}
                  onSaveLinks={(next) => persistLinks('sectionLinks', next)}
                  onCloseMenu={() => setOpenMenu(null)}
                />
              )}
            </div>

            <Link to="/scripts" style={navLinkStyle('/scripts')}>⚡ Scripts Java</Link>
            <Link to="/radar" style={navLinkStyle('/radar')}>📅 Radar</Link>
            <Link to="/configuracion" style={navLinkStyle('/configuracion')}>⚙️ Ajustes</Link>
          </div>

          {/* LADO DERECHO: BARRA DE BÚSQUEDA + ACCESO / SESIÓN */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div className="header-search-container" style={{ margin: 0, maxWidth: '300px' }}>
              <HeaderSearchBar />
            </div>
            <HeaderAuthControls authState={authState} onRefreshAuth={onRefreshAuth} />
          </div>

        </div>
      </div>
    </header>
  );
}
