import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/img/icons/search.png';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todo' },
  { id: 'leccion', label: '📚 Lecciones' },
  { id: 'eac', label: '⚡ EACs' },
  { id: 'glosario', label: '📖 Glosario' },
  { id: 'campus', label: '🌐 Portales' }
];

export default function HeaderSearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const resultsListRef = useRef(null);
  const navigate = useNavigate();

  // Detección de sistema operativo para mostrar ⌘K o Ctrl+K
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  // Carga del índice enriquecido de búsqueda
  useEffect(() => {
    fetch('/data/search_index.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar índice de búsqueda');
        return res.json();
      })
      .then(data => setSearchData(data))
      .catch(() => setSearchData([]));
  }, []);

  // Atajos globales: Cmd+K / Ctrl+K y '/' para enfocar el buscador
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ignorar si el usuario ya está escribiendo en otro input o textarea
      const targetTag = (e.target.tagName || '').toLowerCase();
      const isInputActive = targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && !isInputActive) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Cierre al hacer click fuera del componente
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrado reactivo optimizado
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');

    return searchData.filter(item => {
      // 1. Filtro por categoría seleccionada
      if (activeCategory !== 'all') {
        const itemType = (item.type || '').toLowerCase();
        if (activeCategory === 'leccion' && !itemType.includes('lección') && !itemType.includes('leccion')) return false;
        if (activeCategory === 'eac' && !itemType.includes('eac') && !itemType.includes('actividad')) return false;
        if (activeCategory === 'glosario' && !itemType.includes('glosario')) return false;
        if (activeCategory === 'campus' && !itemType.includes('campus') && !itemType.includes('portal') && !itemType.includes('materia')) return false;
      }

      // 2. Coincidencia por texto
      const titleMatch = regex.test(item.title || '');
      const typeMatch = regex.test(item.type || '');
      const defMatch = item.definition ? regex.test(item.definition) : false;
      const keywordsMatch = Array.isArray(item.keywords)
        ? item.keywords.some(k => typeof k === 'string' && (k.toLowerCase().includes(q) || regex.test(k)))
        : false;

      return titleMatch || typeMatch || defMatch || keywordsMatch;
    }).slice(0, 40); // Limitar a los 40 más relevantes para un renderizado ultra rápido
  }, [query, searchData, activeCategory]);

  // Reset del cursor al cambiar la query o la categoría
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Manejo de teclado (flechas y enter) dentro del buscador
  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || filteredResults.length === 0) {
      if (e.key === 'ArrowDown' && query) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredResults.length);
      scrollItemIntoView((selectedIndex + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
      scrollItemIntoView((selectedIndex - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = filteredResults[selectedIndex];
      if (selectedItem) {
        handleSelectItem(selectedItem);
      }
    }
  };

  const scrollItemIntoView = (index) => {
    if (!resultsListRef.current) return;
    const items = resultsListRef.current.querySelectorAll('.header-search-result-row');
    if (items[index]) {
      items[index].scrollIntoView({ block: 'nearest' });
    }
  };

  const handleSelectItem = (item) => {
    setIsOpen(false);
    setQuery('');
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
  };

  // Color identificador según el tipo de materia
  const getBadgeStyle = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('accenture')) return { bg: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6', border: 'rgba(139, 92, 246, 0.25)' };
    if (t.includes('entornos') || t === 'ent') return { bg: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.25)' };
    if (t.includes('desp')) return { bg: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.25)' };
    if (t.includes('digi')) return { bg: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', border: 'rgba(236, 72, 153, 0.25)' };
    if (t.includes('int')) return { bg: 'rgba(234, 179, 8, 0.12)', color: '#eab308', border: 'rgba(234, 179, 8, 0.25)' };
    if (t.includes('ipo')) return { bg: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: 'rgba(234, 88, 12, 0.25)' };
    if (t.includes('spring') || t.includes('java')) return { bg: 'rgba(14, 165, 233, 0.12)', color: '#0ea5e9', border: 'rgba(14, 165, 233, 0.25)' };
    if (t.includes('brain')) return { bg: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.25)' };
    if (t.includes('eac')) return { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.25)' };
    return { bg: 'rgba(148, 163, 184, 0.12)', color: 'var(--text-muted)', border: 'var(--border-subtle)' };
  };

  return (
    <div 
      ref={containerRef}
      className="header-search-container"
      style={{
        position: 'relative',
        flex: '1 1 240px',
        maxWidth: '380px',
        margin: '0 0.5rem'
      }}
    >
      {/* 1. Barra de entrada visible en la cabecera */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-card)',
          border: isOpen ? '1px solid var(--accent-purple, #8b5cf6)' : '1px solid var(--border-subtle)',
          boxShadow: isOpen ? '0 0 0 3px rgba(139, 92, 246, 0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
          borderRadius: '9999px',
          padding: '0.4rem 0.8rem',
          height: '38px',
          boxSizing: 'border-box',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'text'
        }}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
      >
        <img 
          src={searchIcon} 
          alt="" 
          aria-hidden="true" 
          style={{ width: '16px', height: '16px', objectFit: 'contain', opacity: 0.75, flexShrink: 0 }} 
        />
        
        <input 
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder="Buscar lecciones, conceptos, EACs..."
          aria-label="Buscar en todo el Campus"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontSize: '0.86rem',
            fontWeight: 500,
            padding: 0,
            minWidth: 0
          }}
        />

        {query ? (
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuery('');
              inputRef.current?.focus();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              padding: '0 0.2rem',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1
            }}
            title="Borrar texto"
          >
            ✕
          </button>
        ) : (
          <kbd 
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.15rem 0.4rem',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              fontFamily: 'inherit',
              letterSpacing: '0.5px',
              userSelect: 'none',
              whiteSpace: 'nowrap'
            }}
            title={`Atajo de teclado: ${isMac ? 'Comando + K' : 'Control + K'}`}
          >
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        )}
      </div>

      {/* 2. Popover desplegable flotante de resultados en tiempo real */}
      {isOpen && query.trim().length > 0 && (
        <div 
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            minWidth: '380px',
            maxWidth: '600px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            boxShadow: '0 14px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            zIndex: 9999,
            overflow: 'hidden',
            animation: 'fadeInDown 0.15s ease-out'
          }}
        >
          {/* Barra de Filtro de Categorías */}
          <div 
            style={{
              display: 'flex',
              gap: '0.35rem',
              padding: '0.6rem 0.8rem',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-primary)',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {CATEGORY_FILTERS.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    background: isSelected ? 'var(--accent-purple, #8b5cf6)' : 'transparent',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)',
                    border: isSelected ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                    borderRadius: '20px',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Lista de Resultados */}
          <div 
            ref={resultsListRef}
            style={{
              maxHeight: '380px',
              overflowY: 'auto',
              padding: '0.4rem 0'
            }}
          >
            {filteredResults.length > 0 ? (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {filteredResults.map((item, idx) => {
                  const isHighlighted = idx === selectedIndex;
                  const badgeStyle = getBadgeStyle(item.type);

                  return (
                    <li 
                      key={item.id}
                      className="header-search-result-row"
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        padding: '0.65rem 1rem',
                        cursor: 'pointer',
                        background: isHighlighted ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                        borderLeft: isHighlighted ? '3px solid var(--accent-purple, #8b5cf6)' : '3px solid transparent',
                        transition: 'background 0.12s ease'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                          <span 
                            style={{
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              color: isHighlighted ? 'var(--accent-purple, #8b5cf6)' : 'var(--text-title)',
                              lineHeight: 1.3
                            }}
                          >
                            {item.title}
                          </span>
                          <span 
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              padding: '0.12rem 0.45rem',
                              borderRadius: '6px',
                              background: badgeStyle.bg,
                              color: badgeStyle.color,
                              border: `1px solid ${badgeStyle.border}`,
                              letterSpacing: '0.4px'
                            }}
                          >
                            {item.type}
                          </span>
                        </div>

                        {item.definition && (
                          <p 
                            style={{
                              margin: 0,
                              fontSize: '0.78rem',
                              color: 'var(--text-muted)',
                              lineHeight: 1.35,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {item.definition}
                          </p>
                        )}
                      </div>

                      <span 
                        style={{
                          fontSize: '0.9rem',
                          color: isHighlighted ? 'var(--accent-purple)' : 'var(--text-dim)',
                          transform: isHighlighted ? 'translateX(3px)' : 'none',
                          transition: 'transform 0.15s ease',
                          flexShrink: 0
                        }}
                      >
                        →
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div 
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.88rem'
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔍</div>
                <p style={{ margin: '0 0 0.3rem', fontWeight: 600 }}>No se encontraron resultados</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Intenta buscar por conceptos ("UML", "Docker"), temas ("Tema 1", "EAC1") o materias.
                </p>
              </div>
            )}
          </div>

          {/* Pie de navegación rápida */}
          <div 
            style={{
              padding: '0.4rem 0.8rem',
              background: 'var(--bg-primary)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              color: 'var(--text-dim)'
            }}
          >
            <span>{filteredResults.length} resultados encontrados</span>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <span><kbd>↑</kbd><kbd>↓</kbd> Navegar</span>
              <span><kbd>↵</kbd> Abrir</span>
              <span><kbd>ESC</kbd> Cerrar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
