import React, { useState, useMemo } from 'react';
import TecnoForRetoCard from './cards/TecnoForRetoCard.jsx';
import SpringBootFinalRetoCard from './cards/SpringBootFinalRetoCard.jsx';
import IocDawRetoCard from './cards/IocDawRetoCard.jsx';
import SepeServerRetoCard from './cards/SepeServerRetoCard.jsx';
import SqlRetoCard from './cards/SqlRetoCard.jsx';
import JavaStudioRetoCard from './cards/JavaStudioRetoCard.jsx';
import SecondBrainRetoCard from './cards/SecondBrainRetoCard.jsx';
import AiRetoCard from './cards/AiRetoCard.jsx';

const RETOS_LIST = [
  { id: 'tecnofor', title: 'TecnoFor · Agentic Developer', Component: TecnoForRetoCard },
  { id: 'java-studio', title: 'Java & Spring Studio (Ecosistema Integral)', Component: JavaStudioRetoCard },
  { id: 'ioc', title: 'Campus IOC DAW', Component: IocDawRetoCard },
  { id: 'sepe-server', title: 'SEPE · Servidor Web (MF0492_3)', Component: SepeServerRetoCard },
  { id: 'sql-master', title: 'SQL & Bases de Datos Relacionales', Component: SqlRetoCard },
  { id: 'second-brain', title: 'Matriz de Conocimientos (Second Brain)', Component: SecondBrainRetoCard },
  { id: 'ai', title: 'Inteligencia Artificial (ML & GenAI)', Component: AiRetoCard },
];

const STORAGE_KEY = 'micampus_archived_cards';

/**
 * CampusRetosGrid
 * Sección principal de portales y retos formativos con capacidad
 * de archivar/desarchivar tarjetas individualmente con persistencia en localStorage.
 */
export default function CampusRetosGrid() {
  const [archivedIds, setArchivedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      // Limpiar id obsoleta de accenture si existía en localStorage
      const cleaned = parsed.filter((id) => id !== 'accenture');
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived'

  // Sincronizar en localStorage
  const handleToggleArchive = (id) => {
    setArchivedIds((prev) => {
      const isCurrentlyArchived = prev.includes(id);
      const next = isCurrentlyArchived ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleRestoreAll = () => {
    setArchivedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setActiveTab('active');
  };

  const activeCards = useMemo(() => {
    return RETOS_LIST.filter((item) => !archivedIds.includes(item.id));
  }, [archivedIds]);

  const archivedCards = useMemo(() => {
    return RETOS_LIST.filter((item) => archivedIds.includes(item.id));
  }, [archivedIds]);

  const cardsToRender = activeTab === 'active' ? activeCards : archivedCards;

  return (
    <section className="campus-section">
      <div
        className="section-heading"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <h2 style={{ margin: 0 }}>📚 Mis retos</h2>
          <span
            style={{
              fontSize: '0.8rem',
              background: 'var(--bg-subtle, rgba(100, 116, 139, 0.08))',
              color: 'var(--text-muted, #64748b)',
              padding: '0.22rem 0.7rem',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle, rgba(0, 0, 0, 0.08))',
              fontWeight: 600,
            }}
          >
            {activeCards.length} activos {archivedCards.length > 0 && `· ${archivedCards.length} archivados`}
          </span>
        </div>

        {/* PESTAÑAS DE CONTROL: ACTIVOS vs ARCHIVADOS */}
        <div
          className="retos-filter-tabs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--bg-subtle, #f1f5f9)',
            border: '1px solid var(--border-subtle, #e2e8f0)',
            borderRadius: '12px',
            padding: '4px',
            gap: '4px',
          }}
        >
          <button
            type="button"
            className={`retos-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
            title="Ver cursos y retos activos"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              fontFamily: 'inherit',
              border: activeTab === 'active' ? '1px solid var(--border-subtle, rgba(0,0,0,0.08))' : '1px solid transparent',
              outline: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '9px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              background: activeTab === 'active' ? 'var(--bg-card, #ffffff)' : 'transparent',
              color: activeTab === 'active' ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
              boxShadow: activeTab === 'active' ? '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)' : 'none',
            }}
          >
            <span>🚀 Activos</span>
            <span
              className="retos-tab-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '20px',
                height: '20px',
                padding: '0 6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                borderRadius: '999px',
                marginLeft: '0.2rem',
                background: activeTab === 'active' ? '#3b82f6' : 'rgba(100, 116, 139, 0.16)',
                color: activeTab === 'active' ? '#ffffff' : 'var(--text-muted, #475569)',
              }}
            >
              {activeCards.length}
            </span>
          </button>

          <button
            type="button"
            className={`retos-tab-btn ${activeTab === 'archived' ? 'active' : ''}`}
            onClick={() => setActiveTab('archived')}
            title="Ver cursos archivados"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              fontFamily: 'inherit',
              border: activeTab === 'archived' ? '1px solid var(--border-subtle, rgba(0,0,0,0.08))' : '1px solid transparent',
              outline: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '9px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              background: activeTab === 'archived' ? 'var(--bg-card, #ffffff)' : 'transparent',
              color: activeTab === 'archived' ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
              boxShadow: activeTab === 'archived' ? '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)' : 'none',
            }}
          >
            <span>📦 Archivados</span>
            <span
              className="retos-tab-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '20px',
                height: '20px',
                padding: '0 6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                borderRadius: '999px',
                marginLeft: '0.2rem',
                background: activeTab === 'archived' ? '#d97706' : 'rgba(100, 116, 139, 0.16)',
                color: activeTab === 'archived' ? '#ffffff' : 'var(--text-muted, #475569)',
              }}
            >
              {archivedCards.length}
            </span>
          </button>

          {archivedCards.length > 0 && activeTab === 'archived' && (
            <button
              type="button"
              onClick={handleRestoreAll}
              style={{
                marginLeft: '0.4rem',
                padding: '0.42rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                color: '#16a34a',
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: '9px',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                outline: 'none',
                transition: 'all 0.18s ease',
              }}
              title="Restaurar todos los retos archivados a la vista principal"
            >
              Restaurar todos
            </button>
          )}
        </div>
      </div>

      {/* CUADRÍCULA DE RETOS */}
      {cardsToRender.length > 0 ? (
        <div className="campus-grid">
          {cardsToRender.map(({ id, Component }) => {
            const isArchived = archivedIds.includes(id);
            return (
              <Component
                key={id}
                isArchived={isArchived}
                onToggleArchive={() => handleToggleArchive(id)}
              />
            );
          })}
        </div>
      ) : (
        <div
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: '16px',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>{activeTab === 'active' ? '🎉' : '📦'}</span>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-title)' }}>
              {activeTab === 'active'
                ? '¡Todos los retos están archivados!'
                : 'No tienes ningún reto archivado'}
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              {activeTab === 'active'
                ? 'Puedes revisar o restaurar tus cursos en la pestaña de Archivados.'
                : 'Puedes archivar cualquier tarjeta desde el botón 📦 en su esquina superior derecha.'}
            </p>
          </div>
          {activeTab === 'active' && archivedCards.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('archived')}
              className="btn-enter-campus"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
            >
              Ver {archivedCards.length} archivados ➔
            </button>
          )}
        </div>
      )}
    </section>
  );
}
