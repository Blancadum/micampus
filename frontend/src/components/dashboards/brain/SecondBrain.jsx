import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAIN_TOPICS_DATA } from '../../../data/brainTopicsData';
import { BRAIN_PILLARS_DATA } from '../../../config/brainPillarsData';
import BrainMatrixFilters from './BrainMatrixFilters';
import BrainMatrixCard from './BrainMatrixCard';

const MATRIX_CARDS = BRAIN_TOPICS_DATA;

export default function SecondBrain() {
  const location = useLocation();
  const queryTag = new URLSearchParams(location.search).get('tag');

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTag, setActiveTag] = useState(queryTag || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (queryTag && queryTag !== activeTag) {
      setActiveTag(queryTag);
    }
  }, [queryTag, activeTag]);

  const filteredCards = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return MATRIX_CARDS.filter(card => {
      const matchesFilter = activeFilter === 'all' || card.category === activeFilter;
      const matchesTag = activeTag === 'all' || (card.tags && card.tags.includes(activeTag));

      if (!term) return matchesFilter && matchesTag;

      const matchesSearch = 
        card.title.toLowerCase().includes(term) ||
        card.summary.toLowerCase().includes(term) ||
        card.topicTag.toLowerCase().includes(term) ||
        (card.tags && card.tags.some(t => t.toLowerCase().includes(term))) ||
        card.cheat.toLowerCase().includes(term) ||
        card.crossCompare.some(item => 
          item.campus.toLowerCase().includes(term) || 
          item.text.toLowerCase().includes(term)
        );

      return matchesFilter && matchesTag && matchesSearch;
    });
  }, [activeFilter, activeTag, searchTerm]);

  return (
    <div className="second-brain-page" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* BREADCRUMB */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', padding: '0.85rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🏠 Home</Link>
          <span style={{ color: 'var(--text-dim)' }}>›</span>
          <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>🧠 Second Brain · Matriz Transversal & Pilares</span>
        </div>
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* HERO SECTION CON BUSCADOR Y FILTROS */}
        <section style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%), var(--bg-card)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-xl, 20px)', 
          padding: '2rem 2.25rem', 
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <span>🧠</span> Second Brain Blanca
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 850, color: 'var(--text-title)', marginBottom: '0.6rem', letterSpacing: '-0.5px' }}>
            Mapa Transversal & Pilares de Ingeniería
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '900px', marginBottom: '1.5rem' }}>
            No aprendes cosas aisladas: los mismos principios de ingeniería de software sustentan tus tres programas. Cada pilar funciona como una asignatura completa con proyectos, temario y biblioteca de recursos unificados.
          </p>

          <BrainMatrixFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </section>

        {/* SECCIÓN ESTELAR: 🏛️ LOS 7 PILARES DE INGENIERÍA (DASHBOARDS DE ASIGNATURA) */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.12)', padding: '0.2rem 0.6rem', borderRadius: '6px', marginBottom: '0.35rem' }}>
                <span>🏛️</span> Nuevo Currículo Unificado
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 850, color: 'var(--text-title)', margin: 0 }}>
                Las 7 Asignaturas Maestras de Second Brain
              </h2>
            </div>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Cada pilar funciona como un dashboard completo de asignatura con laboratorios, temario y biblioteca.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {BRAIN_PILLARS_DATA.map(p => (
              <div
                key={p.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = p.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                {/* Acento superior */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: p.color }} />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px', background: `${p.color}20`, color: p.color, textTransform: 'uppercase' }}>
                        Pilar {p.num} · {p.badge}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700 }}>
                      {p.hours}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    {p.title}
                  </h3>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {p.tagline}
                  </p>

                  {/* Orígenes unificados */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
                    {p.originCredits.map((orig, i) => (
                      <span key={i} style={{ fontSize: '0.72rem', background: 'var(--bg-hover)', color: 'var(--text-muted)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                        {orig.name}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/brain/pilar/${p.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    background: `${p.color}15`,
                    color: p.color,
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    border: `1px solid ${p.color}35`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Entrar en el Dashboard de Asignatura</span>
                  <span>➔</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SEPARADOR: ⚡ MATRIZ RÁPIDA DE CHULETAS Y CHEATS */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚡</span> Matriz Rápida de Chuletas & Cheatsheets
            </h3>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Acceso instantáneo a snippets copiables de terminal, Docker, Spring Boot y sintaxis clave.
            </span>
          </div>
        </div>

        {/* MATRIX CARDS GRID */}
        {filteredCards.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '2.5rem' }}>🔍</span>
            <h3 style={{ marginTop: '1rem', color: 'var(--text-title)' }}>No se encontraron coincidencias</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Intenta con otro término de búsqueda o cambia el filtro de materia o etiqueta.</p>
            <button 
              type="button"
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); setActiveTag('all'); }} 
              style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--accent-purple)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.5rem' }}>
            {filteredCards.map(card => (
              <BrainMatrixCard 
                key={card.id}
                card={card}
                activeTag={activeTag}
                onSelectTag={setActiveTag}
              />
            ))}
          </div>
        )}

        {/* ACCESOS DIRECTOS INFERIORES */}
        <section style={{ marginTop: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', fontWeight: 800, marginBottom: '1rem' }}>
            Ecosistema de Plataformas & Asignaturas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <Link to="/accenture" style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
              <span>🌱</span> <span>Accenture Hub</span>
            </Link>
            <Link to="/java/springboot" style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
              <span>⚡</span> <span>Spring Boot Guía</span>
            </Link>
            <Link to="/ioc/ent" style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
              <span>🎓</span> <span>IOC DAW (ENT)</span>
            </Link>
            <Link to="/sepe/php" style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
              <span>💻</span> <span>SEPE Servidor PHP</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
