import React, { useEffect, useRef } from 'react';

export default function LessonSidebar({ 
  topics, 
  activeSlug, 
  activeSubSlug,
  scrollToSection, 
  onSelectTopic,
  isSidebarOpen, 
  setIsSidebarOpen, 
  isMobile, 
  title,
  themeColor = 'var(--accent-blue)',
  isPetete = false
}) {
  const sidebarRef = useRef(null);

  // Auto-scroll del aside izquierdo para situar el contenido o subenunciado activo a la vista
  useEffect(() => {
    if (isPetete) return;
    const targetSlug = activeSubSlug || activeSlug;
    if (!targetSlug || !isSidebarOpen) return;

    const timer = setTimeout(() => {
      if (!sidebarRef.current) return;
      const activeElement = sidebarRef.current.querySelector(`[data-sidebar-slug="${targetSlug}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'auto',
          block: 'nearest'
        });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [activeSlug, activeSubSlug, isSidebarOpen, isPetete]);
  return (
    <>
      {/* Botón flotante para plegar/desplegar el índice lateral sin molestar */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '145px',
          left: isSidebarOpen ? (isMobile ? '300px' : 'clamp(300px, 25vw, 500px)') : '0px',
          zIndex: 1000,
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-subtle)',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          width: '32px',
          height: '44px',
          fontSize: '0.9rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(8px)',
          opacity: 0.9
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--accent-purple)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.color = 'var(--text-main)'; }}
        title={isSidebarOpen ? "Replegar menú lateral" : "Desplegar menú lateral"}
        aria-label={isSidebarOpen ? "Replegar menú lateral" : "Desplegar menú lateral"}
      >
        <span>{isSidebarOpen ? '◀' : '▶'}</span>
      </button>

      {/* SIDEBAR DE SCROLLSPY */}
      <aside ref={sidebarRef} className="lesson-sidebar" style={{ 
        width: isSidebarOpen ? 'clamp(300px, 25vw, 500px)' : '0px', 
        opacity: isSidebarOpen ? 1 : 0,
        overflowY: isSidebarOpen ? 'auto' : 'hidden',
        overflowX: 'hidden',
        transition: 'width 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
        flexShrink: 0, 
        background: 'var(--bg-card)', 
        borderRight: isSidebarOpen ? '1px solid var(--border-subtle)' : 'none', 
        padding: isSidebarOpen ? '1.5rem' : '0',
        position: 'sticky',
        top: '126px', // Header principal (76px) + Breadcrumb nav (50px)
        height: 'calc(100vh - 126px)'
      }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          {title || "Índice de Contenidos"}
        </h3>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(
            topics.reduce((acc, t) => {
              const module = t.moduleTitle || 'Temas Generales';
              if (!acc[module]) acc[module] = {};
              
              let group = 'default';
              if (t.isOverview || t.title === 'Introducción a la Unidad') {
                group = 'default';
              } else if (t.temaTitle && t.temaTitle.trim() !== '') {
                let rawTitle = t.temaTitle.trim();
                const cleanModule = (t.moduleTitle || '').replace(/^(Bloque|Tema|Unidad)\s+\d+:\s*/i, '').trim().toLowerCase();
                const cleanRaw = rawTitle.replace(/^(Bloque|Tema|Unidad)\s+\d+:\s*/i, '').trim().toLowerCase();
                
                if (cleanRaw === cleanModule || cleanRaw === 'introducción' || cleanRaw === 'orientación') {
                  group = 'default';
                } else {
                  if (/^Tema\s+\d+:\s*/i.test(rawTitle)) {
                    rawTitle = rawTitle.replace(/^Tema\s+\d+:\s*/i, '');
                  } else if (/^Bloque\s+\d+:\s*/i.test(rawTitle)) {
                    rawTitle = rawTitle.replace(/^Bloque\s+\d+:\s*/i, '');
                  }
                  const num = t.topicNum ? String(t.topicNum).split('.')[0] : '';
                  group = rawTitle ? (num ? `Tema ${num}: ${rawTitle}` : rawTitle) : 'default';
                }
              }
              
              if (!acc[module][group]) acc[module][group] = [];
              acc[module][group].push(t);
              return acc;
            }, {})
          ).map(([moduleTitle, moduleGroups], mIdx) => {
            const firstGroupTopics = Object.values(moduleGroups)[0];
            const moduleFirstSlug = firstGroupTopics && firstGroupTopics.length > 0 ? firstGroupTopics[0].slug : null;
            return (
            <div key={mIdx} style={{ marginBottom: '1.2rem' }}>
              <button 
                onClick={() => {
                  if (moduleFirstSlug) {
                    if (onSelectTopic) {
                      onSelectTopic(moduleFirstSlug);
                    }
                    const section = document.getElementById(`module-${moduleFirstSlug}`);
                    if (section) {
                      const y = section.getBoundingClientRect().top + window.scrollY - 150;
                      window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
                    }
                  }
                }}
                style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 'bold', 
                  color: 'var(--text-muted)', 
                  marginBottom: '0.6rem', 
                  textTransform: 'uppercase',
                  padding: '0 0.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: moduleFirstSlug ? 'pointer' : 'default',
                  textAlign: 'left',
                  transition: 'color 0.2s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (moduleFirstSlug) e.currentTarget.style.color = themeColor;
                }}
                onMouseLeave={(e) => {
                  if (moduleFirstSlug) e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {moduleTitle}
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '0.5rem' }}>
                {(() => {
                  const groupEntries = Object.entries(moduleGroups);
                  const allGroupsAreSingle = groupEntries.length > 1 && groupEntries.every(([_, list]) => list.length === 1);
                  return groupEntries.map(([groupName, groupTopics], gIdx) => {
                    let temaNumForScroll = '';
                    if (groupTopics.length > 0 && groupTopics[0].topicNum) {
                      const parts = String(groupTopics[0].topicNum).split('.');
                      if (parts.length >= 1 && !isNaN(parts[0])) {
                        temaNumForScroll = parts[0];
                      }
                    }
                    
                    const isTemaActive = groupTopics.some(t => t.slug === activeSlug);
                    const showGroupHeading = groupName !== 'default' && !allGroupsAreSingle;
                    
                    return (
                      <div key={gIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                        {showGroupHeading && (
                          <button 
                            onClick={() => {
                              if (groupTopics.length > 0) {
                                if (onSelectTopic) {
                                  onSelectTopic(groupTopics[0].slug);
                              } else if (temaNumForScroll) {
                                const section = document.getElementById(`tema-content-${temaNumForScroll}`);
                                if (section) {
                                  const y = section.getBoundingClientRect().top + window.scrollY - 150;
                                  window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
                                }
                              }
                            }
                          }}
                          style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: '700', 
                            color: isTemaActive ? themeColor : 'var(--text-main)', 
                            textDecoration: isTemaActive ? 'underline' : 'none',
                            padding: '0.3rem 0.5rem',
                            marginBottom: '0.2rem',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            cursor: temaNumForScroll ? 'pointer' : 'default',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (temaNumForScroll && !isTemaActive) e.currentTarget.style.color = themeColor;
                          }}
                          onMouseLeave={(e) => {
                            if (temaNumForScroll && !isTemaActive) e.currentTarget.style.color = 'var(--text-main)';
                          }}
                        >
                          {groupName}
                        </button>
                      )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginLeft: showGroupHeading ? '0.5rem' : '0' }}>
                      {groupTopics.map(t => {
                        const isActive = t.slug === activeSlug;
                        const isTopicEac = /\beac\b|\beac\d+/i.test(t.title) || Boolean(t.isEac);
                        
                        // Solo en rosa fuxia (#ec4899) los encabezados que tengan que ver con EAC porque son susceptibles de caer en las paf
                        const topicColor = isTopicEac 
                          ? '#ec4899' 
                          : (isActive ? themeColor : 'var(--text-main)');

                        // Extracción de subsecciones del siguiente nivel al x.x. (x.x.x)
                        const subsections = (t.subsections && t.subsections.length > 0)
                          ? t.subsections
                          : (() => {
                              if (!t.contentMd) return [];
                              const res = [];
                              const lines = t.contentMd.split('\n');
                              for (const l of lines) {
                                const m = l.match(/^(?:###|##)\s+([0-9]+(?:\.[0-9]+)*\.?\s+.*|\bEAC\b.*)/i);
                                if (m) {
                                  const raw = m[1].replace(/[*_#]/g, '').trim();
                                  const isEac = /\beac\b|\beac\d+/i.test(raw);
                                  const slug = raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                  res.push({ id: slug, slug, title: raw, isEac });
                                }
                              }
                              return res;
                            })();

                        return (
                          <div key={t.slug} style={{ display: 'flex', flexDirection: 'column' }}>
                            <button 
                              data-sidebar-slug={t.slug}
                              onClick={() => {
                                if (onSelectTopic) {
                                  onSelectTopic(t.slug);
                                } else {
                                  scrollToSection(t.slug);
                                }
                              }}
                              style={{
                                padding: '0.6rem 0.8rem',
                                textAlign: 'left',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                color: topicColor,
                                background: isActive ? (isTopicEac ? 'rgba(236, 72, 153, 0.14)' : `${themeColor}1f`) : 'transparent', 
                                fontWeight: isTopicEac ? '700' : (isActive ? '600' : '400'),
                                transition: 'all 0.2s',
                                fontSize: '0.95rem',
                                lineHeight: '1.4',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.4rem'
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.background = isTopicEac ? 'rgba(236, 72, 153, 0.08)' : 'var(--bg-hover)';
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <span>
                                {(!t.isOverview && t.topicNum && !t.topicNum.endsWith('.0')) ? `${t.topicNum} - ` : ''}{t.title}
                              </span>
                              {isTopicEac && (
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', flexShrink: 0 }}>
                                  EAC
                                </span>
                              )}
                            </button>

                            {/* Subnivel siguiente al x.x. (x.x.x) para lectura durante el scroll en la lección */}
                            {(isPetete || isActive || isTopicEac) && subsections.length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginLeft: '0.9rem', marginTop: '0.2rem', marginBottom: '0.35rem', borderLeft: '2px solid var(--border-subtle)', paddingLeft: '0.5rem' }}>
                                {subsections.map((sub, sIdx) => {
                                  const subId = sub.slug || sub.id;
                                  const isSubActive = activeSubSlug === subId;
                                  const isSubEac = /eac/i.test(sub.title) || Boolean(sub.isEac);

                                  // Rosa fuxia color de fuente en el índice lateral solo para EAC
                                  const subTextColor = isSubEac 
                                    ? '#ec4899' 
                                    : (isSubActive ? themeColor : 'var(--text-muted)');

                                  // Detección de sub-encabezados jerárquicos (ej: 3.1., 3.2., 4.1.)
                                  const numMatch = sub.title.match(/^\s*(\d+(?:\.\d+)*)\.?\s+/);
                                  let isSubHeading = false;
                                  let indentLevel = 0;
                                  if (numMatch) {
                                    const parts = numMatch[1].split('.').filter(Boolean);
                                    const hasParentLevel1 = subsections.some(s => /^\s*\d+\.\s+/.test(s.title));
                                    if (hasParentLevel1 && parts.length >= 2) {
                                      isSubHeading = true;
                                      indentLevel = parts.length - 1;
                                    }
                                  }

                                  const indentRem = isSubHeading ? Math.min(indentLevel, 3) * 1.65 : 0;

                                  return (
                                    <button
                                      key={subId || sIdx}
                                      data-sidebar-slug={subId}
                                      onClick={() => {
                                        scrollToSection(subId);
                                      }}
                                      style={{
                                        padding: isSubHeading ? '0.35rem 0.5rem 0.35rem 0.65rem' : '0.45rem 0.55rem',
                                        marginLeft: `${indentRem}rem`,
                                        marginTop: (!isSubHeading && sIdx > 0) ? '0.35rem' : '0.05rem',
                                        marginBottom: '0.05rem',
                                        width: isSubHeading ? `calc(100% - ${indentRem}rem)` : '100%',
                                        textAlign: 'left',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        color: isSubEac 
                                          ? '#ec4899' 
                                          : (isSubActive ? themeColor : (isSubHeading ? 'var(--text-muted)' : 'var(--text-title)')),
                                        background: isSubActive 
                                          ? (isSubEac ? 'rgba(236, 72, 153, 0.18)' : `${themeColor}1f`) 
                                          : 'transparent',
                                        fontWeight: isSubEac ? '700' : (isSubActive ? '700' : (isSubHeading ? '400' : '650')),
                                        fontSize: isSubHeading ? '0.80rem' : '0.86rem',
                                        lineHeight: '1.35',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '0.35rem',
                                        borderLeft: isSubEac 
                                          ? '3px solid #ec4899' 
                                          : (isSubActive ? `3px solid ${themeColor}` : (isSubHeading ? '2px solid rgba(255, 255, 255, 0.14)' : '3px solid transparent'))
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!isSubActive) e.currentTarget.style.background = isSubEac ? 'rgba(236, 72, 153, 0.08)' : 'var(--bg-hover)';
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!isSubActive) e.currentTarget.style.background = 'transparent';
                                      }}
                                      title={isSubEac ? "Susceptible de examen PAF / EAC" : sub.title}
                                    >
                                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {(sub.topicNum && !sub.title.startsWith(sub.topicNum)) ? `${sub.topicNum} - ` : ''}{sub.title}
                                      </span>
                                      {isSubEac && (
                                        <span 
                                          style={{ 
                                            fontSize: '0.62rem', 
                                            fontWeight: 800, 
                                            padding: '0.1rem 0.35rem', 
                                            borderRadius: '4px', 
                                            background: 'rgba(236, 72, 153, 0.2)', 
                                            color: '#ec4899',
                                            flexShrink: 0
                                          }}
                                        >
                                          EAC
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
              </div>
            </div>
          );
          })}
        </nav>
      </aside>
    </>
  );
}
