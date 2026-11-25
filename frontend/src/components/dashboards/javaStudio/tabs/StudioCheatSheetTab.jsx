import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CHEATSHEET } from '../../../../data/javaStudio/studioData.js';
import { IconSearch, IconBookmark } from '../StudioIcons.jsx';

const CHEATSHEET_CATEGORIES = [
  { id: 'all', label: 'Todas las Categorías' },
  { id: 'anotaciones', label: 'Anotaciones Spring Boot' },
  { id: 'jpa', label: 'Mapeo JPA & Hibernate' },
  { id: 'validaciones', label: 'Bean Validation' },
  { id: 'docker', label: 'Docker & Maven CLI' }
];

function mapCategoryToId(catTitle) {
  const c = (catTitle || '').toLowerCase();
  if (c.includes('spring boot core') || c.includes('anotaciones spring')) return 'anotaciones';
  if (c.includes('jpa') || c.includes('entidades')) return 'jpa';
  if (c.includes('validation') || c.includes('robustez')) return 'validaciones';
  if (c.includes('maven') || c.includes('docker') || c.includes('comandos')) return 'docker';
  return 'all';
}

export default function StudioCheatSheetTab({ initialSlug = null, onSelectCategory = null }) {
  const [userCategory, setUserCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const cardRefs = useRef({});

  const derivedCategory = useMemo(() => {
    if (!initialSlug) return 'all';
    const clean = String(initialSlug).toLowerCase().trim();
    if (CHEATSHEET_CATEGORIES.some(c => c.id === clean)) return clean;
    return 'all';
  }, [initialSlug]);

  const selectedCategory = userCategory !== null ? userCategory : derivedCategory;

  const handleSelectCategory = (catId) => {
    setUserCategory(catId);
    if (onSelectCategory) onSelectCategory(catId);
  };

  useEffect(() => {
    if (selectedCategory !== 'all' && cardRefs.current[selectedCategory]) {
      cardRefs.current[selectedCategory].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCategory]);

  const filteredSheet = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return CHEATSHEET.map(sec => {
      const catId = mapCategoryToId(sec.categoria);
      if (selectedCategory !== 'all' && catId !== selectedCategory) {
        return null;
      }

      const filteredItems = (sec.items || []).filter(item =>
        !q ||
        item.nombre.toLowerCase().includes(q) ||
        item.descripcion.toLowerCase().includes(q)
      );

      if (filteredItems.length === 0 && q) return null;

      return {
        ...sec,
        catId,
        items: filteredItems
      };
    }).filter(Boolean);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="studio-cheatsheet-container">
      {/* CABECERA COMPACTA DE CHEATSHEET */}
      <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
              Referencia Rápida
            </span>
            <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Spring Boot & Comandos CLI
            </h2>
          </div>

          <div style={{ position: 'relative', minWidth: '260px' }}>
            <IconSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar por anotación o comando..."
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem 0.45rem 2.2rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.84rem',
                outline: 'none',
                background: '#ffffff'
              }}
            />
          </div>
        </div>

        {/* BARRA DE APARTADOS / CATEGORÍAS */}
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
          {CHEATSHEET_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
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
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TÍTULO PRINCIPAL FUERA DE LA CAJA */}
      <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
        Cheat Sheet & Comandos Esenciales
      </h1>

      {/* FICHAS DE CHULETA A ANCHO COMPLETO */}
      <div style={{ width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredSheet.map((sec, idx) => (
            <div
              key={idx}
              ref={(el) => { cardRefs.current[sec.catId] = el; }}
              className="studio-card"
              style={{ padding: '1.25rem 1.4rem', borderLeft: '5px solid #6d28d9' }}
            >
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#6d28d9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconBookmark /> {sec.categoria}
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '0.65rem 0.75rem', width: '35%' }}>Elemento / Anotación</th>
                      <th style={{ padding: '0.65rem 0.75rem' }}>Descripción & Regla Técnica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.items.map((item, iIdx) => (
                      <tr key={iIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.75rem', verticalAlign: 'top' }}>
                          <code style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '0.2rem 0.45rem', borderRadius: '4px', fontSize: '0.84rem', fontFamily: 'monospace', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                            {item.nombre}
                          </code>
                        </td>
                        <td style={{ padding: '0.75rem', color: '#475569', lineHeight: 1.55 }}>
                          {item.descripcion}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {filteredSheet.length === 0 && (
            <div className="studio-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>No se encontraron elementos para "{searchQuery}".</p>
            </div>
          )}
        </div>
    </div>
  );
}
