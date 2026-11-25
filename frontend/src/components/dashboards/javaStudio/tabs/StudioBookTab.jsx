import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import StudioCodeBlock from '../StudioCodeBlock.jsx';
import StudioDiagramModal from '../StudioDiagramModal.jsx';
import StudioAutoevaluacionQuiz from '../StudioAutoevaluacionQuiz.jsx';
import StudioTerminalModal from '../StudioTerminalModal.jsx';
import {
  IconHelpCircle,
  IconTerminal,
  IconBook,
  IconCheckCircle,
  IconZap,
  IconArrowLeft,
  IconArrowRight
} from '../StudioIcons.jsx';

import {
  BOOK_CHAPTERS,
  resolveBookChapter,
  BOOK_CHAPTER_DIAGRAMS,
  BOOK_CHAPTER_TUTORIAS,
  BOOK_CHAPTER_VIDEOS,
  getBookQuizzes,
  LIBRO_GROUPS
} from '../../../../data/javaStudio/bookData.js';
import { TUTORIAS, QUIZZES } from '../../../../data/javaStudio/studioData.js';

export default function StudioBookTab({ initialSlug = null, onSelectChapter = null }) {
  // Estado de capítulo seleccionado
  const [selectedChapterId, setSelectedChapterId] = useState(() => {
    return resolveBookChapter(initialSlug)?.id || BOOK_CHAPTERS[0].id;
  });

  // Modales
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
  const [selectedActivityTab, setSelectedActivityTab] = useState(0);

  // Sincronizar cuando cambia initialSlug por la URL
  useEffect(() => {
    if (initialSlug) {
      const resolved = resolveBookChapter(initialSlug);
      if (resolved && resolved.id !== selectedChapterId) {
        setSelectedChapterId(resolved.id);
      }
    }
  }, [initialSlug]);

  const handleSelectChapter = (id) => {
    const resolved = resolveBookChapter(id);
    const targetId = resolved ? resolved.id : id;
    setSelectedChapterId(targetId);
    setSelectedActivityTab(0);
    if (onSelectChapter) {
      onSelectChapter(targetId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Capítulo actual
  const currentChapter = useMemo(() => {
    return resolveBookChapter(selectedChapterId) || BOOK_CHAPTERS[0];
  }, [selectedChapterId]);

  // Bloque actual y sus capítulos para la barra de apartados
  const currentBlock = useMemo(() => {
    return (
      LIBRO_GROUPS.find((g) =>
        g.items.some((it) => it.id === currentChapter.id)
      ) || LIBRO_GROUPS[0]
    );
  }, [currentChapter.id]);

  const blockChapters = useMemo(() => {
    return currentBlock?.items || [];
  }, [currentBlock]);

  const currentIndex = useMemo(() => {
    return BOOK_CHAPTERS.findIndex((ch) => ch.id === currentChapter.id);
  }, [currentChapter]);

  // Contenido markdown limpio de encabezado inicial para evitar títulos duplicados
  const cleanContentMd = useMemo(() => {
    if (!currentChapter?.contentMd) return '';
    const firstLineMatch = currentChapter.contentMd.match(/^#{1,4}\s+([^\n]+)\n+/);
    if (firstLineMatch) {
      const headerText = firstLineMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');
      const titleText = (currentChapter.displayTitle || currentChapter.label || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (titleText.includes(headerText) || headerText.includes(titleText) || (currentChapter.label && firstLineMatch[0].includes(currentChapter.label))) {
        return currentChapter.contentMd.slice(firstLineMatch[0].length);
      }
    }
    return currentChapter.contentMd.replace(/^#\s+[^\n]+\n+/, '');
  }, [currentChapter]);

  // Diagramas asociados al capítulo
  const chapterDiagrams = useMemo(() => {
    return BOOK_CHAPTER_DIAGRAMS[currentChapter.id] || currentChapter.diagrams || [];
  }, [currentChapter]);

  // Tutorías vinculadas
  const linkedTutoriaNums = useMemo(() => {
    return BOOK_CHAPTER_TUTORIAS[currentChapter.id] || currentChapter.tutorias || [];
  }, [currentChapter]);

  const linkedTutorias = useMemo(() => {
    if (!Array.isArray(TUTORIAS)) return [];
    return TUTORIAS.filter((t) => linkedTutoriaNums.includes(t.numero));
  }, [linkedTutoriaNums]);

  // Vídeo UPM / Masterclass
  const linkedVideo = useMemo(() => {
    return BOOK_CHAPTER_VIDEOS[currentChapter.id] || currentChapter.video || null;
  }, [currentChapter]);

  // Quizzes vinculados
  const chapterQuizzes = useMemo(() => {
    return getBookQuizzes(currentChapter.id, QUIZZES);
  }, [currentChapter]);

  // Actividades vinculadas
  const acts = currentChapter.actividadesVinculadas || [];
  const currentAct = acts[selectedActivityTab] || acts[0];

  // Navegación anterior / siguiente
  const prevChapter = currentIndex > 0 ? BOOK_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < BOOK_CHAPTERS.length - 1 ? BOOK_CHAPTERS[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevChapter) {
      handleSelectChapter(prevChapter.id);
    }
  };

  const handleNext = () => {
    if (nextChapter) {
      handleSelectChapter(nextChapter.id);
    }
  };

  // Handlers del modal de diagramas
  const handlePrevDiagram = () => {
    setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : chapterDiagrams.length - 1));
  };
  const handleNextDiagram = () => {
    setActiveModalIndex((prev) => (prev < chapterDiagrams.length - 1 ? prev + 1 : 0));
  };

  // Renderizadores Markdown personalizados
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '2rem 0 0.8rem 0', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.45rem' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '1.32rem', fontWeight: 800, color: '#1e293b', margin: '1.6rem 0 0.65rem 0' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155', margin: '1.3rem 0 0.5rem 0' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#475569', margin: '1rem 0 0.4rem 0' }}>
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p style={{ margin: '0 0 1rem 0', color: '#334155', lineHeight: 1.75, fontSize: '0.94rem' }}>
        {children}
      </p>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeText = String(children).replace(/\n$/, '');
      if (!inline && (match || codeText.includes('\n'))) {
        return (
          <div style={{ margin: '1.25rem 0' }}>
            <StudioCodeBlock
              code={codeText}
              language={match ? match[1] : 'java'}
              filename={`Snippet_${match ? match[1] : 'code'}`}
            />
          </div>
        );
      }
      return (
        <code
          style={{
            background: 'rgba(109, 40, 217, 0.08)',
            color: '#6d28d9',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.86rem',
            fontFamily: 'monospace',
            fontWeight: 600,
            border: '1px solid rgba(109, 40, 217, 0.15)'
          }}
          {...props}
        >
          {children}
        </code>
      );
    },
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: '1.25rem 0',
          padding: '0.9rem 1.25rem',
          background: '#f8fafc',
          borderLeft: '4px solid #6d28d9',
          borderRadius: '0 8px 8px 0',
          color: '#334155',
          fontSize: '0.92rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}
      >
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '1.35rem 0', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: '#ffffff' }}>
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', textAlign: 'left', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td style={{ padding: '0.6rem 0.85rem', borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
        {children}
      </td>
    ),
    ul: ({ children }) => (
      <ul style={{ margin: '0 0 1rem 1.4rem', padding: 0, color: '#334155', lineHeight: 1.7 }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol style={{ margin: '0 0 1rem 1.4rem', padding: 0, color: '#334155', lineHeight: 1.7 }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: '0.35rem' }}>
        {children}
      </li>
    ),
    hr: () => (
      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.8rem 0' }} />
    ),
    img: ({ src, alt }) => (
      <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
        <div
          onClick={() => setLightboxImage({ src, alt: alt || 'Diagrama técnico' })}
          title="Haz clic para ampliar a pantalla completa en alta resolución"
          style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            background: '#ffffff',
            cursor: 'zoom-in',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6d28d9';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(109, 40, 217, 0.16)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
          }}
        >
          <img
            src={src}
            alt={alt || 'Diagrama técnico'}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              objectFit: 'contain'
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Badge indicador flotante de zoom */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(15, 23, 42, 0.78)',
              backdropFilter: 'blur(4px)',
              color: '#ffffff',
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '0.35rem 0.7rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              pointerEvents: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
          >
            <span>🔍</span> Clic para ampliar en alta resolución
          </div>
        </div>
        {alt && (
          <figcaption style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '0.6rem', fontWeight: 600 }}>
            {alt}
          </figcaption>
        )}
      </figure>
    )
  };

  return (
    <div className="studio-book-layout" style={{ maxWidth: '1020px', margin: '0 auto' }}>
      {/* CONTENIDO PRINCIPAL DEL CAPÍTULO */}
      <main style={{ minWidth: 0 }}>
        {/* CABECERA COMPACTA DEL BLOQUE DE SPRING BOOT */}
        <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
                Spring Boot Enterprise & Microservicios
              </span>
              <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {currentBlock.label}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                className="studio-btn-secondary"
                style={{ opacity: currentIndex <= 0 ? 0.5 : 1, cursor: currentIndex <= 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                <IconArrowLeft size={14} /> Anterior
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= BOOK_CHAPTERS.length - 1}
                className="studio-btn-secondary"
                style={{ opacity: currentIndex >= BOOK_CHAPTERS.length - 1 ? 0.5 : 1, cursor: currentIndex >= BOOK_CHAPTERS.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                Siguiente <IconArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* BARRA DE APARTADOS DEL BLOQUE ACTUAL */}
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
            {blockChapters.map((ch) => {
              const isSelected = ch.id === currentChapter.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(ch.id)}
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
                  title={ch.label}
                >
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TÍTULO PRINCIPAL DE LA LECCIÓN / CAPÍTULO FUERA DE LA CAJA */}
        <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
          {currentChapter.displayTitle}
        </h1>

        {/* TUTORÍAS DE ORO INTERCALADAS CONTEXTUALMENTE */}
        {linkedTutorias.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            {linkedTutorias.map((tut, i) => (
              <div key={i} className="studio-tutoria-box" style={{ marginBottom: '0.75rem' }}>
                <div className="studio-tutoria-header">
                  <h4 className="studio-tutoria-title">
                    <span>Tutoría #{tut.numero}: {tut.titulo}</span>
                  </h4>
                  <span className="studio-badge studio-badge-amber" style={{ fontSize: '0.72rem' }}>
                    {tut.categoria}
                  </span>
                </div>
                <p className="studio-tutoria-desc">
                  {tut.explicacion}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CUERPO EXTENSO DEL LIBRO EN FORMATO MARKDOWN */}
        <div
          className="studio-card"
          style={{
            marginBottom: '1.5rem',
            padding: '2.25rem 2.5rem',
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            borderLeft: '5px solid #6d28d9'
          }}
        >
          {/* PUNTOS CLAVE / BADGES DE CONCEPTO */}
          {currentChapter.puntosClave && currentChapter.puntosClave.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
              {currentChapter.puntosClave.map((pto, i) => (
                <span key={i} style={{ background: '#f8fafc', color: '#475569', fontSize: '0.78rem', fontWeight: 600, padding: '0.25rem 0.65rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  ✓ {pto}
                </span>
              ))}
            </div>
          )}

          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {cleanContentMd}
          </ReactMarkdown>
        </div>

        {/* PREGUNTA DE EVALUACIÓN TÉCNICA Y ARGUMENTACIÓN MODELO PARA DEFENSA */}
        {currentChapter.preguntaEvaluación && currentChapter.respuestaModelo && (
          <div className="studio-card" style={{ marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#059669', marginBottom: '0.4rem' }}>
              <IconHelpCircle size={18} />
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>
                Pregunta de Examen / Defensa Técnica
              </h4>
            </div>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.94rem', fontWeight: 700, color: '#0f172a' }}>
              "{currentChapter.preguntaEvaluación}"
            </p>

            <div style={{ background: '#ffffff', padding: '0.9rem 1.15rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ display: 'block', marginBottom: '0.35rem', color: '#059669', fontSize: '0.86rem' }}>
                Argumentación de Respuesta Modelo (Tribunal Evaluador):
              </strong>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.65 }}>
                {currentChapter.respuestaModelo}
              </p>
            </div>
          </div>
        )}

        {/* AUTOEVALUACIÓN INTERACTIVA CON PREGUNTAS DEL QUIZ OFICIAL */}
        {chapterQuizzes.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <StudioAutoevaluacionQuiz
              quizzes={chapterQuizzes}
              title={`Autoevaluación Oficial: Epígrafe ${currentChapter.epigrafe} (${chapterQuizzes.length} Pregunta${chapterQuizzes.length > 1 ? 's' : ''})`}
              subtitle="Valida tus conocimientos técnicos con las preguntas oficiales de examen y defensa."
              accentColor="#6d28d9"
              quizBaseUrl="/java/studio/quiz"
            />
          </div>
        )}

        {/* GALERÍA DE DIAGRAMAS ARQUITECTÓNICOS Y CONCEPTUALES */}
        {chapterDiagrams.length > 0 && (
          <div className="studio-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #2563eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <IconBook size={18} color="#2563eb" />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Diagramas Arquitectónicos y Conceptuales
                </h4>
              </div>
              <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.72rem' }}>
                {chapterDiagrams.length} Diagrama{chapterDiagrams.length > 1 ? 's' : ''}
              </span>
            </div>

            <p style={{ margin: '0 0 1rem 0', fontSize: '0.86rem', color: '#475569', lineHeight: 1.55 }}>
              Esquemas visuales y modelos de arquitectura para reforzar los fundamentos técnicos. Haz clic en cualquiera para ampliarlo en alta resolución.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {chapterDiagrams.map((diag, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveModalIndex(idx)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.15)';
                    e.currentTarget.style.borderColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '170px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' }}>
                    <img
                      src={diag.src}
                      alt={diag.titulo}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '0.5rem' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                      Ampliar
                    </div>
                    {diag.etiqueta && (
                      <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', background: '#2563eb', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                        {diag.etiqueta}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                        {diag.titulo}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                        {diag.subtitulo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VÍDEO MAGISTRAL UPM / MASTERCLASS RECOMENDADO */}
        {linkedVideo && (
          <div className="studio-card" style={{ marginBottom: '1.5rem', background: '#f8fafc', borderLeft: '4px solid #0891b2', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <IconZap size={18} color="#0891b2" />
                <strong style={{ fontSize: '0.96rem', color: '#0891b2' }}>{linkedVideo.titulo}</strong>
              </div>
              <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.72rem' }}>{linkedVideo.fuente}</span>
            </div>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.86rem', color: '#475569' }}>
              Clase magistral recomendada para reforzar los conceptos de este capítulo con explicaciones en pizarra y código paso a paso.
            </p>
            <a
              href={linkedVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-btn-secondary"
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem', borderColor: '#0891b2', color: '#0891b2', fontWeight: 700 }}
            >
              Ver Masterclass en YouTube (UPM) ↗
            </a>
          </div>
        )}

        {/* ACTIVIDADES VINCULADAS EN ESTE CAPÍTULO */}
        {acts.length > 0 && (
          <div className="studio-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                Actividades Prácticas Vinculadas ({acts.length})
              </h4>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {acts.map((act, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedActivityTab(idx)}
                  className={`studio-btn-secondary ${selectedActivityTab === idx ? 'active' : ''}`}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.8rem',
                    borderColor: selectedActivityTab === idx ? '#6d28d9' : '#e2e8f0',
                    background: selectedActivityTab === idx ? 'rgba(109, 40, 217, 0.08)' : '#ffffff',
                    color: selectedActivityTab === idx ? '#6d28d9' : '#64748b',
                    fontWeight: selectedActivityTab === idx ? 800 : 500
                  }}
                >
                  {act.titulo || `Actividad #${act.actividadNum}`}
                </button>
              ))}
            </div>

            {currentAct && (
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ fontSize: '0.94rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                  {currentAct.titulo}
                </strong>
                <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.86rem', color: '#475569', lineHeight: 1.6 }}>
                  {currentAct.explicacion}
                </p>
                {currentAct.codigo && (
                  <StudioCodeBlock code={currentAct.codigo} filename={`Actividad_${currentAct.actividadNum}.java`} />
                )}
              </div>
            )}
          </div>
        )}

        {/* NAVEGACIÓN INFERIOR LINEAL DEL LIBRO (ANTERIOR / SIGUIENTE) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}
        >
          {prevChapter ? (
            <button
              type="button"
              onClick={() => handleSelectChapter(prevChapter.id)}
              className="studio-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                textAlign: 'left'
              }}
            >
              <span>←</span>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>Epígrafe anterior</span>
                <span>{prevChapter.displayTitle}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextChapter && (
            <button
              type="button"
              onClick={() => handleSelectChapter(nextChapter.id)}
              className="studio-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                textAlign: 'right'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.8 }}>Siguiente epígrafe</span>
                <span>{nextChapter.displayTitle}</span>
              </div>
              <span>→</span>
            </button>
          )}
        </div>
      </main>

      {/* MODAL LIGHTBOX PARA DIAGRAMAS EN ALTA RESOLUCIÓN */}
      {activeModalIndex !== null && (
        <StudioDiagramModal
          diagrams={chapterDiagrams}
          currentIndex={activeModalIndex}
          onClose={() => setActiveModalIndex(null)}
          onPrev={handlePrevDiagram}
          onNext={handleNextDiagram}
          accentColor="#6d28d9"
        />
      )}

      {/* MODAL LIGHTBOX FULLSCREEN PARA CUALQUIER IMAGEN DEL LIBRO */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            cursor: 'zoom-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '96vw',
              maxHeight: '94vh',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              cursor: 'default'
            }}
          >
            {/* Cabecera del Lightbox */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.25rem',
                background: '#0f172a',
                color: '#ffffff',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                <span style={{ fontSize: '0.95rem' }}>🖼️</span>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '65vw'
                  }}
                >
                  {lightboxImage.alt || 'Vista en Alta Resolución'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <a
                  href={lightboxImage.src}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.08)'
                  }}
                  title="Abrir imagen original en nueva pestaña"
                >
                  Abrir original ↗
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '1.3rem',
                    lineHeight: 1,
                    padding: '0.2rem 0.4rem',
                    borderRadius: '4px'
                  }}
                  title="Cerrar (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Contenedor de la Imagen */}
            <div
              style={{
                padding: '0.75rem',
                background: '#020617',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
                maxHeight: 'calc(94vh - 54px)'
              }}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(90vh - 60px)',
                  objectFit: 'contain',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* POP-UP SIMULADOR DE TERMINAL CON EL CONTENIDO COMPLETO DEL TEMA */}
      {isTerminalModalOpen && (
        <StudioTerminalModal
          isOpen={isTerminalModalOpen}
          onClose={() => setIsTerminalModalOpen(false)}
          title={`epigrafe-${currentChapter.epigrafe}-${currentChapter.id}.md`}
          badge={`Epígrafe ${currentChapter.epigrafe} · ${currentChapter.readingTime}`}
          filePath={`/java-studio/libro/epigrafe-${currentChapter.epigrafe}.md`}
          content={currentChapter.contentMd}
        />
      )}
    </div>
  );
}

