import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAIN_TOPICS_DATA } from '../../data/brainTopicsData';

const MATRIX_CARDS = BRAIN_TOPICS_DATA;

const FILTERS = [
  { id: 'all', label: 'Todas las materias', emoji: '🌐' },
  { id: 'ai', label: 'Inteligencia Artificial', emoji: '🤖' },
  { id: 'vm', label: 'Virtualización & Mac', emoji: '💻' },
  { id: 'git', label: 'Git & Versionado', emoji: '🌿' },
  { id: 'http', label: 'HTTP & APIs REST', emoji: '🌐' },
  { id: 'docker', label: 'Docker & Servidores', emoji: '🐳' },
  { id: 'data', label: 'SQL & Persistencia', emoji: '🗄️' },
  { id: 'arch', label: 'Patrones & Arquitectura', emoji: '📐' }
];

const FEATURED_TAGS = [
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

export default function SecondBrain() {
  const location = useLocation();
  const queryTag = new URLSearchParams(location.search).get('tag');

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTag, setActiveTag] = useState(queryTag || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (queryTag && queryTag !== activeTag) {
      setActiveTag(queryTag);
    }
  }, [queryTag, activeTag]);

  const filteredCards = useMemo(() => {
    return MATRIX_CARDS.filter(card => {
      const matchesFilter = activeFilter === 'all' || card.category === activeFilter;
      const matchesTag = activeTag === 'all' || (card.tags && card.tags.includes(activeTag));
      const term = searchTerm.toLowerCase().trim();

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

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="second-brain-page" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* BREADCRUMB */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', padding: '0.85rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🏠 Home</Link>
          <span style={{ color: 'var(--text-dim)' }}>›</span>
          <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>🧠 Second Brain · Matriz Transversal</span>
        </div>
      </div>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* HERO SECTION */}
        <section style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%), var(--bg-card)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-xl, 20px)', 
          padding: '2rem 2.25rem', 
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <span>🧠</span> Second Brain Blanca
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 850, color: 'var(--text-title)', marginBottom: '0.6rem', letterSpacing: '-0.5px' }}>
            Mapa Transversal de Competencias
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '850px', marginBottom: '1.5rem' }}>
            No aprendes cosas aisladas: los mismos principios de ingeniería de software sustentan tus tres programas. Aquí tienes la matriz que cruza conceptos, cómo se aplican en cada entorno y sus chuletas maestras.
          </p>

          {/* BARRA DE BÚSQUEDA Y FILTROS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type="text"
                placeholder="🔍 Buscar por concepto, comando, Docker, Spring, SQL o patrón..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1rem' }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {FILTERS.map(f => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
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

            {/* CLUSTER DE ETIQUETAS */}
            <div style={{ marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)' }}>
                  Cluster de Etiquetas & Conexiones ({FEATURED_TAGS.length - 1} áreas)
                </span>
                {activeTag !== 'all' && (
                  <button
                    onClick={() => setActiveTag('all')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-purple)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Restablecer etiquetas (Filtrando #{activeTag}) ✕
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {FEATURED_TAGS.map(t => {
                  const isSelected = activeTag === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTag(t.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        border: isSelected ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-primary)',
                        color: isSelected ? 'var(--accent-purple)' : 'var(--text-main)',
                        fontWeight: isSelected ? 800 : 500,
                        fontSize: '0.76rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* MATRIX CARDS GRID */}
        {filteredCards.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '2.5rem' }}>🔍</span>
            <h3 style={{ marginTop: '1rem', color: 'var(--text-title)' }}>No se encontraron coincidencias</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Intenta con otro término de búsqueda o cambia el filtro de materia o etiqueta.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); setActiveTag('all'); }} 
              style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--accent-purple)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.5rem' }}>
            {filteredCards.map(card => (
              <article 
                key={card.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg, 16px)',
                  padding: '1.65rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>
                    {card.topicTag}
                  </span>
                  <span style={{ fontSize: '1.35rem' }}>{card.emoji}</span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {card.summary}
                  </p>
                </div>

                {/* ETIQUETAS ASOCIADAS A LA TARJETA */}
                {card.tags && card.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {card.tags.map((t, idx) => {
                      const isTagSelected = activeTag === t;
                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveTag(isTagSelected ? 'all' : t);
                          }}
                          style={{
                            background: isTagSelected ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                            border: isTagSelected ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                            color: isTagSelected ? 'var(--accent-purple)' : 'var(--text-muted)',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            padding: '0.15rem 0.5rem',
                            fontWeight: isTagSelected ? 800 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          #{t}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* DOSSIER BADGES */}
                {card.accentureActivitiesPrompts && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.75rem', borderRadius: '8px', background: 'rgba(117, 0, 193, 0.08)', border: '1px solid rgba(117, 0, 193, 0.25)', fontSize: '0.76rem', color: '#7500c1', fontWeight: 700 }}>
                    <span>📁</span>
                    <span>Dossier: Incluye los 12 Prompts de Copilot para actividades de Accenture</span>
                  </div>
                )}
                {card.id === 'hermes-local' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.75rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', fontSize: '0.76rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
                    <span>🕊️</span>
                    <span>Dossier: Incluye soul.md, user.md, tools.md y arquitectura del Harness</span>
                  </div>
                )}

                {/* COMPARATIVA CRUZADA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.25rem 0' }}>
                  {card.crossCompare.map((item, idx) => {
                    const badgeStyles = {
                      acc: { bg: 'rgba(117, 0, 193, 0.1)', color: '#7500c1', border: '1px solid rgba(117, 0, 193, 0.25)' },
                      ioc: { bg: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.25)' },
                      sep: { bg: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)' }
                    }[item.type] || { bg: 'var(--bg-primary)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' };

                    return (
                      <div key={idx} style={{ background: 'var(--bg-primary)', borderRadius: '10px', padding: '0.65rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.84rem' }}>
                        <span style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, ...badgeStyles }}>
                          {item.campus}
                        </span>
                        <div style={{ color: 'var(--text-main)', lineHeight: 1.4 }}>
                          {item.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CHUETA / CODIGO */}
                <div style={{ position: 'relative', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)' }}>
                      Chuleta Rápida
                    </span>
                    <button
                      onClick={() => handleCopy(card.id, card.cheat)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: copiedId === card.id ? 'var(--accent-green, #10b981)' : 'var(--text-muted)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                      title="Copiar código al portapapeles"
                    >
                      {copiedId === card.id ? '✓ Copiado' : '📋 Copiar'}
                    </button>
                  </div>
                  <pre style={{ 
                    background: '#011627', 
                    color: '#d6deeb', 
                    padding: '0.85rem 1rem', 
                    borderRadius: '8px', 
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', 
                    fontSize: '0.8rem', 
                    overflowX: 'auto',
                    margin: 0,
                    lineHeight: 1.45
                  }}>
                    <code>{card.cheat}</code>
                  </pre>
                </div>

                {/* BOTÓN PÁGINA HIJA DE BRAIN */}
                <div style={{ marginTop: '0.85rem' }}>
                  <Link
                    to={`/brain/${card.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.95rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.12))',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      color: 'var(--text-title)',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.22), rgba(59, 130, 246, 0.22))';
                      e.currentTarget.style.borderColor = 'var(--accent-purple)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.12))';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span>📖</span>
                      <span>Leer más</span>
                      {card.readTime && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                          · {card.readTime}
                        </span>
                      )}
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--accent-purple)' }}>➔</span>
                  </Link>
                </div>
              </article>
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
