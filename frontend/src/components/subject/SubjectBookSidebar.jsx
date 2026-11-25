import React, { useState } from 'react';
import { buildUnitEntries, syncLessonMarkdownAndHeadings, scrollElementBelowStickyBar } from '../../utils/bookHierarchy';

/**
 * Índice jerárquico del libro (estilo limpio micampus-java-blanca sin emojis):
 * U1 - Título de unidad
 *   1. Introducción...
 *   2. Bloque temático
 *     2.1. Tema...
 *       2.1.1. Subsección...
 */
export default function SubjectBookSidebar({
  lessons,
  groupedLessons,
  collapsedUnits,
  setCollapsedUnits,
  activeLesson,
  accent,
  bookSections = [],
  onSelectLesson,
}) {
  const [collapsedSections, setCollapsedSections] = useState({});
  const [collapsedLessons, setCollapsedLessons] = useState({});
  const [activeSubSlug, setActiveSubSlug] = useState('');

  const renderLessonRow = (l, numLabel, subPrefix) => {
    const isActive = activeLesson?.id === l.id;
    const isTopLevel = !/\d+\.\d+/.test(numLabel || '');
    const isLessonCollapsed = collapsedLessons[l.id] ?? true;
    const { subHeadings } = isActive
      ? syncLessonMarkdownAndHeadings(l.content || l.summary || '', l.title, subPrefix)
      : { subHeadings: [] };

    return (
      <div key={l.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>
        <button
          type="button"
          onClick={() => {
            setActiveSubSlug('');
            if (isActive) {
              setCollapsedLessons((prev) => ({ ...prev, [l.id]: !(prev[l.id] ?? true) }));
            } else {
              onSelectLesson(l.id);
              setCollapsedLessons((prev) => ({ ...prev, [l.id]: false }));
            }
          }}
          style={{
            textAlign: 'left',
            padding: '0.45rem 0.6rem',
            borderRadius: '10px',
            border: 'none',
            background: isActive ? `${accent}18` : 'transparent',
            color: isActive ? accent : 'var(--text-main)',
            fontWeight: isTopLevel ? 700 : 500,
            cursor: 'pointer',
            fontSize: '0.83rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.45rem',
            transition: 'background 0.15s ease, color 0.15s ease'
          }}
        >
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: isActive ? accent : (l.completed ? '#15803d' : 'var(--text-muted)'),
            background: isActive ? `${accent}20` : 'transparent',
            padding: '0.12rem 0.38rem',
            borderRadius: '5px',
            flexShrink: 0,
            marginTop: '0.05rem'
          }}>
            {numLabel}
          </span>
          <span style={{ flex: 1, minWidth: 0, lineHeight: 1.35 }}>{l.title}</span>
          {isActive && subHeadings.length > 0 && (
            <span style={{ fontSize: '0.72rem', color: accent, flexShrink: 0, marginTop: '0.1rem' }}>
              {isLessonCollapsed ? '▸' : '▾'}
            </span>
          )}
        </button>

        {isActive && !isLessonCollapsed && subHeadings.length > 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.12rem',
            marginLeft: '0.85rem', paddingLeft: '0.6rem',
            borderLeft: `2px solid ${accent}40`,
            marginBottom: '0.2rem'
          }}>
            {subHeadings.map((sh, sIdx) => {
              const isSubActive = activeSubSlug === sh.slug;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => {
                    setActiveSubSlug(sh.slug);
                    scrollElementBelowStickyBar(document.getElementById(sh.slug));
                  }}
                  style={{
                    textAlign: 'left',
                    padding: sh.level === 3 ? '0.22rem 0.45rem 0.22rem 0.85rem' : '0.26rem 0.45rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: isSubActive ? `${accent}14` : 'transparent',
                    color: isSubActive ? accent : (sh.level === 3 ? 'var(--text-muted)' : 'var(--text-main)'),
                    fontWeight: 500,
                    fontSize: sh.level === 3 ? '0.74rem' : '0.77rem',
                    lineHeight: 1.35,
                    cursor: 'pointer'
                  }}
                >
                  {sh.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem',
      position: 'sticky',
      top: '146px',
      maxHeight: 'calc(100vh - 162px)',
      overflowY: 'auto',
      scrollbarWidth: 'none'
    }}>
      <div style={{
        fontSize: '0.74rem',
        fontWeight: 800,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        paddingBottom: '0.45rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        Índice del Libro
      </div>

      {lessons.length === 0 ? (
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sin lecciones aún.</p>
      ) : (
        Object.entries(groupedLessons).map(([unitName, unitLessons], unitIdx) => {
          const isCollapsed = collapsedUnits[unitName] ?? true;
          const uNumMatch = unitName.match(/(?:U|Unidad|Bloque)\s*(\d+)/i);
          const uNum = uNumMatch ? uNumMatch[1] : String(unitIdx + 1);
          const unitCode = `U${uNum}`;
          const formattedUnitName = unitName.replace(/^(U\d+)\s*:\s*/i, '$1 - ');
          const entries = buildUnitEntries(unitLessons, unitCode, bookSections);
          const firstUnitLesson = unitLessons[0];

          return (
            <div key={unitName} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.35rem',
                padding: '0.45rem 0.55rem', borderRadius: '8px',
                background: 'var(--bg-subtle)'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    if (firstUnitLesson) {
                      setActiveSubSlug('');
                      onSelectLesson(firstUnitLesson.id);
                    }
                    if (isCollapsed) {
                      setCollapsedUnits((prev) => ({ ...prev, [unitName]: false }));
                    }
                  }}
                  style={{
                    flex: 1, minWidth: 0, border: 'none', background: 'transparent',
                    color: 'var(--text-title)', fontWeight: 800, fontSize: '0.8rem',
                    cursor: firstUnitLesson ? 'pointer' : 'default', textAlign: 'left', padding: 0
                  }}
                >
                  {formattedUnitName}
                </button>
                <button
                  type="button"
                  onClick={() => setCollapsedUnits((prev) => ({ ...prev, [unitName]: !(prev[unitName] ?? true) }))}
                  aria-label={isCollapsed ? 'Desplegar unidad' : 'Plegar unidad'}
                  style={{
                    border: 'none', background: 'transparent', color: 'var(--text-muted)',
                    fontSize: '0.8rem', cursor: 'pointer', padding: '0.1rem 0.35rem', flexShrink: 0
                  }}
                >
                  {isCollapsed ? '▸' : '▾'}
                </button>
              </div>

              {!isCollapsed && (
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '0.25rem',
                  paddingLeft: '0.45rem', marginLeft: '0.35rem',
                  borderLeft: '1px solid var(--border-subtle)'
                }}>
                  {entries.map((entry, entryIdx) => {
                    const topNum = entryIdx + 1;
                    if (entry.type === 'lesson') {
                      return renderLessonRow(entry.lesson, `${topNum}.`, `${topNum}.`);
                    }

                    const secKey = `${unitName}::${entry.title}`;
                    const isSecCollapsed = collapsedSections[secKey] ?? true;
                    const secHasActive = entry.lessons.some((l) => l.id === activeLesson?.id);
                    const firstSecLesson = entry.lessons[0];

                    return (
                      <div key={secKey} style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem', marginTop: '0.15rem' }}>
                        <div style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.35rem',
                          padding: '0.38rem 0.5rem', borderRadius: '8px',
                          background: secHasActive ? `${accent}10` : 'transparent'
                        }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (firstSecLesson) {
                                setActiveSubSlug('');
                                onSelectLesson(firstSecLesson.id);
                              }
                              if (isSecCollapsed) {
                                setCollapsedSections((prev) => ({ ...prev, [secKey]: false }));
                              }
                            }}
                            style={{
                              flex: 1, minWidth: 0, border: 'none', background: 'transparent',
                              color: secHasActive ? accent : 'var(--text-title)',
                              fontWeight: 700, fontSize: '0.81rem', cursor: firstSecLesson ? 'pointer' : 'default',
                              textAlign: 'left', padding: 0
                            }}
                          >
                            {topNum}. {entry.title}
                          </button>
                          <button
                            type="button"
                            onClick={() => setCollapsedSections((prev) => ({ ...prev, [secKey]: !(prev[secKey] ?? true) }))}
                            aria-label={isSecCollapsed ? 'Desplegar bloque' : 'Plegar bloque'}
                            style={{
                              border: 'none', background: 'transparent', color: 'var(--text-muted)',
                              fontSize: '0.78rem', cursor: 'pointer', padding: '0.1rem 0.35rem', flexShrink: 0
                            }}
                          >
                            {isSecCollapsed ? '▸' : '▾'}
                          </button>
                        </div>

                        {!isSecCollapsed && (
                          <div style={{
                            display: 'flex', flexDirection: 'column', gap: '0.15rem',
                            paddingLeft: '0.45rem', marginLeft: '0.45rem',
                            borderLeft: '1px solid var(--border-subtle)'
                          }}>
                            {entry.lessons.map((l, subIdx) =>
                              renderLessonRow(l, `${topNum}.${subIdx + 1}.`, `${topNum}.${subIdx + 1}.`)
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </aside>
  );
}
