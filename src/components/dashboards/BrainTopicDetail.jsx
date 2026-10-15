import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BRAIN_TOPICS_DATA } from '../../data/brainTopicsData';
import PodcastPlayerCard from '../viewers/LessonViewer/widgets/PodcastPlayerCard';

export default function BrainTopicDetail() {
  const { topicId } = useParams();
  const [copiedId, setCopiedId] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeBlockFilter, setActiveBlockFilter] = useState('all');
  const [activeHermesTab, setActiveHermesTab] = useState('soul');
  const [copiedActivityId, setCopiedActivityId] = useState(null);

  const topicIndex = useMemo(() => {
    return BRAIN_TOPICS_DATA.findIndex(t => t.id === topicId);
  }, [topicId]);

  const currentTopic = useMemo(() => {
    if (topicIndex >= 0) return BRAIN_TOPICS_DATA[topicIndex];
    return BRAIN_TOPICS_DATA[0];
  }, [topicIndex]);

  const prevTopic = topicIndex > 0 ? BRAIN_TOPICS_DATA[topicIndex - 1] : null;
  const nextTopic = topicIndex >= 0 && topicIndex < BRAIN_TOPICS_DATA.length - 1 ? BRAIN_TOPICS_DATA[topicIndex + 1] : null;

  const relatedTopics = useMemo(() => {
    if (!currentTopic?.relatedTopicIds) return [];
    return currentTopic.relatedTopicIds
      .map(id => BRAIN_TOPICS_DATA.find(t => t.id === id))
      .filter(Boolean);
  }, [currentTopic]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyActivityPrompt = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedActivityId(id);
      setTimeout(() => setCopiedActivityId(null), 2000);
    });
  };

  const filteredActivities = useMemo(() => {
    if (!currentTopic.accentureActivitiesPrompts) return [];
    if (activeBlockFilter === 'all') return currentTopic.accentureActivitiesPrompts;
    return currentTopic.accentureActivitiesPrompts.filter(p => p.module.includes(activeBlockFilter));
  }, [currentTopic, activeBlockFilter]);

  const handleCopyPrompt = () => {
    if (!currentTopic.notebookLmPrompt) return;
    navigator.clipboard.writeText(currentTopic.notebookLmPrompt).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2400);
    });
  };

  if (!currentTopic) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Tema no encontrado</h2>
        <Link to="/brain" style={{ color: 'var(--accent-purple)' }}>Volver a Second Brain</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* NAVEGACIÓN SUPERIOR / BREADCRUMBS */}
      <div 
        style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.85rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Campus</Link>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <Link to="/brain" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Second Brain</Link>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ color: 'var(--accent-purple, #8b5cf6)', fontWeight: 700 }}>{currentTopic.title}</span>
          </div>

          <Link
            to="/brain"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <span>←</span>
            <span>Volver a Matriz Brain</span>
          </Link>
        </div>
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* HERO DEL TEMA */}
        <section 
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{currentTopic.emoji}</span>
            <div>
              <span 
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'rgba(139, 92, 246, 0.12)',
                  color: 'var(--accent-purple, #8b5cf6)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '5px'
                }}
              >
                {currentTopic.topicTag}
              </span>
              <h1 style={{ margin: '0.3rem 0 0', fontSize: '1.9rem', color: 'var(--text-title)', fontWeight: 800 }}>
                {currentTopic.title}
              </h1>

              {/* CLUSTER DE ETIQUETAS DEL TEMA */}
              {currentTopic.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
                  {currentTopic.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      to={`/brain?tag=${encodeURIComponent(tag)}`}
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        background: 'rgba(139, 92, 246, 0.08)',
                        color: 'var(--accent-purple, #8b5cf6)',
                        textDecoration: 'none',
                        border: '1px solid rgba(139, 92, 246, 0.22)',
                        transition: 'all 0.2s'
                      }}
                    >
                      🏷️ {tag}
                    </Link>
                  ))}
                </div>
              )}
              {/* BYLINE EDITORIAL DEL BLOG */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', marginTop: '0.55rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>✍️ {currentTopic.author || 'Blanca · Cuaderno de Ingeniería'}</span>
                <span>•</span>
                <span>📅 {currentTopic.date || 'Octubre 2026'}</span>
                <span>•</span>
                <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>⏱️ {currentTopic.readTime || '6 min de lectura'}</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1.02rem', color: 'var(--text-main)', lineHeight: '1.6', margin: '0.5rem 0 1.5rem' }}>
            {currentTopic.summary}
          </p>

          {/* Accesos rápidos dentro de la página */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {currentTopic.blogPost && (
              <a 
                href="#articulo-blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  color: 'var(--accent-purple)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <span>📝</span> <span>Entrada de Blog</span>
              </a>
            )}

            {relatedTopics.length > 0 && (
              <a 
                href="#conceptos-cruzados"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <span>🕸️</span> <span>Conceptos Cruzados ({relatedTopics.length})</span>
              </a>
            )}

            {currentTopic.cavemanScript && (
              <a 
                href="#script-caveman"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#d97706',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <span>🪨</span> <span>Script Caveman (Python)</span>
              </a>
            )}

            {currentTopic.externalLink && (
              <Link
                to={currentTopic.externalLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  background: currentTopic.externalLinkIcon === '🎬' 
                    ? 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)' 
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  boxShadow: currentTopic.externalLinkIcon === '🎬'
                    ? '0 2px 8px rgba(6, 182, 212, 0.3)'
                    : '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}
              >
                <span>{currentTopic.externalLinkIcon || '🌱'}</span>
                <span>{currentTopic.externalLinkLabel || 'Abrir Enlace Relacionado'}</span>
              </Link>
            )}

            {currentTopic.practiceLink && (
              <Link
                to={currentTopic.practiceLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}
              >
                <span>📦</span>
                <span>{currentTopic.practiceLinkLabel || '12 Actividades Prácticas'}</span>
              </Link>
            )}

            <a 
              href="#puntos-comunes"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                color: '#2563eb',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 700
              }}
            >
              <span>📌</span> <span>Puntos en Común</span>
            </a>
            <a 
              href="#tutorial"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#10b981',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 700
              }}
            >
              <span>🛠️</span> <span>Tutorial Paso a Paso</span>
            </a>

            {/* Acceso directo a 12 Prompts si el tema los tiene */}
            {currentTopic.accentureActivitiesPrompts && (
              <a 
                href="#prompts-accenture"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(117, 0, 193, 0.1)',
                  border: '1px solid rgba(117, 0, 193, 0.35)',
                  color: '#7500c1',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <span>🐙</span> <span>12 Prompts Copilot (Accenture)</span>
              </a>
            )}

            {/* Acceso directo a Hermes Config si es el tema de Hermes */}
            {currentTopic.id === 'hermes-local' && (
              <a 
                href="#hermes-config"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  color: 'var(--accent-purple)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <span>🕊️</span> <span>Archivos Hermes & Harness</span>
              </a>
            )}

            {(currentTopic.audioUrl || currentTopic.videoUrl || currentTopic.mediaList) && (
              <a 
                href="#media-player"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#dc2626',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <span>{currentTopic.videoUrl || (currentTopic.mediaList && currentTopic.mediaList.some(m => m.type === 'video')) ? '🎬' : '🎙️'}</span>
                <span>{currentTopic.videoUrl || (currentTopic.mediaList && currentTopic.mediaList.some(m => m.type === 'video')) ? 'Vídeo / Multimedia' : 'Podcast Técnico'}</span>
              </a>
            )}

            <a 
              href="#hoja-amarilla-prompt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                color: '#ca8a04',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: 800
              }}
            >
              <span>💛</span> <span>Hoja Amarilla (Prompt NotebookLM)</span>
            </a>
          </div>
        </section>

        {/* SECCIÓN MULTIMEDIA DESTACADA (PODCAST / VÍDEO) */}
        {(currentTopic.audioUrl || currentTopic.videoUrl || currentTopic.mediaList) && (
          <section id="media-player" style={{ marginBottom: '0.5rem' }}>
            <PodcastPlayerCard
              podcastUrl={currentTopic.audioUrl}
              podcastTitle={currentTopic.audioTitle || currentTopic.podcastTitle || "Podcast de Repaso Rápido"}
              duration={currentTopic.audioDuration || "Audio lección"}
              notes={currentTopic.audioNotes}
              videoUrl={currentTopic.videoUrl}
              videoTitle={currentTopic.videoTitle || "Vídeo Explicativo"}
              mediaList={currentTopic.mediaList}
            />
          </section>
        )}

        {/* SECCIÓN BLOG: REFLEXIÓN TÉCNICA, ANALOGÍA Y CONEXIÓN TRANSVERSAL */}
        {currentTopic.blogPost && (
          <section 
            id="articulo-blog" 
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '18px', 
              padding: '2rem 2.25rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.6rem' }}>📝</span>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-purple)' }}>
                  Entrada de Blog & Análisis Técnico
                </span>
                <h2 style={{ margin: '0.2rem 0 0', fontSize: '1.45rem', color: 'var(--text-title)', fontWeight: 800, lineHeight: '1.3' }}>
                  {currentTopic.blogPost.headline}
                </h2>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.75', color: 'var(--text-main)' }}>
              {currentTopic.blogPost.intro}
            </p>

            {/* CALLOUT ANALOGÍA DE INGENIERÍA */}
            {currentTopic.blogPost.analogy && (
              <div 
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '16px',
                  padding: '1.4rem 1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.9rem' }}>
                  <span>💡</span>
                  <span>Analogía de Ingeniería: {currentTopic.blogPost.analogy.concept}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.7', color: 'var(--text-title)', fontStyle: 'italic' }}>
                  "{currentTopic.blogPost.analogy.metaphor}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '0.2rem' }}>
                  <span>🎯</span>
                  <span>Conclusión práctica: {currentTopic.blogPost.analogy.takeaway}</span>
                </div>
              </div>
            )}

            {/* EL PROBLEMA REAL */}
            {currentTopic.blogPost.theProblem && (
              <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '1.2rem', margin: '0.2rem 0' }}>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', color: 'var(--text-title)', fontWeight: 700 }}>
                  ⚠️ Qué se rompe en el mundo real si ignoras esto
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.65', color: 'var(--text-muted)' }}>
                  {currentTopic.blogPost.theProblem}
                </p>
              </div>
            )}

            {/* EL HILO CONDUCTOR TRANSVERSAL */}
            {currentTopic.blogPost.crossCurricularInsight && (
              <div 
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '12px',
                  padding: '1.1rem 1.3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.88rem' }}>
                  🔗 Conexión de Asignaturas (El hilo invisible de software)
                </span>
                <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--text-main)' }}>
                  {currentTopic.blogPost.crossCurricularInsight}
                </p>
              </div>
            )}

            {/* PUENTE DIRECTO A VÍDEOS TEÓRICOS Y ACTIVIDADES ACCENTURE */}
            {currentTopic.blogPost.accentureBridge && (
              <div 
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                  border: '1px solid rgba(6, 182, 212, 0.35)',
                  borderRadius: '14px',
                  padding: '1.3rem 1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  marginTop: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>🎯</span>
                    <span style={{ color: '#06b6d4', fontWeight: 800, fontSize: '0.96rem' }}>
                      {currentTopic.blogPost.accentureBridge.title}
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    color: '#8b5cf6', 
                    background: 'rgba(139, 92, 246, 0.15)', 
                    padding: '0.2rem 0.55rem', 
                    borderRadius: '6px' 
                  }}>
                    Conexión Directa Bootcamp
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.65', color: 'var(--text-main)' }}>
                  {currentTopic.blogPost.accentureBridge.description}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                  {currentTopic.blogPost.accentureBridge.videoUrl && (
                    <Link
                      to={currentTopic.blogPost.accentureBridge.videoUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(6, 182, 212, 0.3)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <span>🎬</span>
                      <span>{currentTopic.blogPost.accentureBridge.videoTitle || 'Ver Vídeo Teórico'}</span>
                      <span style={{ fontSize: '0.9rem' }}>➔</span>
                    </Link>
                  )}

                  {currentTopic.blogPost.accentureBridge.solidVideoUrl && (
                    <Link
                      to={currentTopic.blogPost.accentureBridge.solidVideoUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.55rem 0.95rem',
                        borderRadius: '8px',
                        background: 'rgba(6, 182, 212, 0.12)',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        color: '#06b6d4',
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <span>⚡</span>
                      <span>{currentTopic.blogPost.accentureBridge.solidVideoTitle || 'Vídeo SOLID'}</span>
                      <span>➔</span>
                    </Link>
                  )}

                  {currentTopic.blogPost.accentureBridge.activitiesUrl && (
                    <Link
                      to={currentTopic.blogPost.accentureBridge.activitiesUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <span>📦</span>
                      <span>{currentTopic.blogPost.accentureBridge.activitiesTitle || 'Ir a Actividades Prácticas'}</span>
                      <span style={{ fontSize: '0.9rem' }}>➔</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>
        )}


        {/* SECCIÓN RED DE CONCEPTOS CRUZADOS (CLICKABLE CROSS-LINKING) */}
        {relatedTopics.length > 0 && (
          <section id="conceptos-cruzados" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🕸️</span>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-title)', fontWeight: 800 }}>
                  Red de Conceptos Cruzados & Artículos Relacionados
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Haz clic para saltar a otros temas y seguir el hilo conductor entre materias
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.1rem' }}>
              {relatedTopics.map(rel => (
                <Link
                  key={rel.id}
                  to={`/brain/${rel.id}`}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(139, 92, 246, 0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>
                      {rel.topicTag}
                    </span>
                    <span style={{ fontSize: '1.3rem' }}>{rel.emoji}</span>
                  </div>

                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-title)', fontWeight: 700, lineHeight: '1.35' }}>
                    {rel.title}
                  </h3>

                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', flex: 1 }}>
                    {rel.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-dim)' }}>⏱️ {rel.readTime || '6 min'}</span>
                    <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>Leer artículo ➔</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN CAVEMAN SCRIPT (PYTHON BRUTO / CERO CHARLA) */}
        {currentTopic.cavemanScript && (
          <section id="script-caveman" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🪨</span>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-title)', fontWeight: 800 }}>
                  Script Python · Modo Caveman (Cero Florituras, Solo Ejecución)
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Automatización bruta sin cordialidad: entrada → proceso → salida o muerte.
                </span>
              </div>
            </div>

            <div style={{ background: '#0b0f19', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '16px', padding: '1.5rem', position: 'relative' }}>
              {/* BADGE DEL PROMPT CAVEMAN */}
              <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '0.65rem 0.9rem', marginBottom: '1rem', color: '#f59e0b', fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: '1.5' }}>
                <strong style={{ display: 'block', marginBottom: '0.2rem' }}>🪨 PROMPT CAVEMAN ORIGINAL:</strong>
                {currentTopic.cavemanScript.prompt}
              </div>

              {/* TITULO Y BOTON COPIAR SCRIPT */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>
                  🐍 {currentTopic.cavemanScript.title}
                </span>
                <button
                  onClick={() => handleCopy('cavemanCode', currentTopic.cavemanScript.code)}
                  style={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    color: copiedId === 'cavemanCode' ? '#10b981' : '#f8fafc',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {copiedId === 'cavemanCode' ? '✓ Script Copiado' : '📋 Copiar Script'}
                </button>
              </div>

              {/* CODIGO PYTHON */}
              <pre style={{
                background: '#020617',
                color: '#e2e8f0',
                padding: '1.1rem',
                borderRadius: '10px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.84rem',
                lineHeight: '1.55',
                margin: '0 0 1rem',
                overflowX: 'auto',
                border: '1px solid #1e293b'
              }}>
                <code>{currentTopic.cavemanScript.code}</code>
              </pre>

              <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.5' }}>
                <strong>Lógica Caveman:</strong> {currentTopic.cavemanScript.explanation}
              </p>
            </div>
          </section>
        )}

        {/* SECCIÓN 1: PUNTOS MÁS IMPORTANTES EN COMÚN A TODAS LAS ASIGNATURAS */}
        <section id="puntos-comunes" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📌</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>
                Puntos Clave en Común a Todas las Asignaturas
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Cómo este conocimiento se cruza e interconecta entre IOC, Accenture y SEPE
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {currentTopic.commonPoints?.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1.3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                    {idx + 1}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-title)', fontWeight: 700 }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Comparativa por asignaturas */}
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '1.3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              marginTop: '0.5rem'
            }}
          >
            <h4 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-title)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🎯 Aplicación Concreta en Cada Campus
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentTopic.crossCompare?.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span style={{ alignSelf: 'flex-start', fontSize: '0.74rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '4px', background: item.type === 'acc' ? 'rgba(117,0,193,0.12)' : item.type === 'ioc' ? 'rgba(37,99,235,0.12)' : 'rgba(234,88,12,0.12)', color: item.type === 'acc' ? '#7500c1' : item.type === 'ioc' ? '#2563eb' : '#ea580c' }}>
                    {item.campus}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: TUTORIAL PASO A PASO */}
        <section id="tutorial" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🛠️</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>
                Tutorial Paso a Paso & Comandos
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {currentTopic.tutorial?.toolName} · Instrucciones reproducibles y comandos probados
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentTopic.tutorial?.steps?.map((step) => (
              <div 
                key={step.num}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span 
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: '#10b981',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem'
                      }}
                    >
                      {step.num}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-title)' }}>
                      {step.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopy(`step_${step.num}`, step.cmd)}
                    style={{
                      background: copiedId === `step_${step.num}` ? '#10b981' : 'var(--bg-primary)',
                      color: copiedId === `step_${step.num}` ? '#fff' : 'var(--text-main)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {copiedId === `step_${step.num}` ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                </div>

                <pre
                  style={{
                    background: '#011627',
                    color: '#d6deeb',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontSize: '0.84rem',
                    margin: 0,
                    overflowX: 'auto',
                    fontFamily: 'ui-monospace, monospace',
                    lineHeight: '1.5'
                  }}
                >
                  <code>{step.cmd}</code>
                </pre>

                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  💡 {step.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN ESPECIAL: 12 PROMPTS Y RECOMENDACIONES DE ACCENTURE PARA GITHUB COPILOT */}
        {currentTopic.accentureActivitiesPrompts && currentTopic.accentureActivitiesPrompts.length > 0 && (
          <section id="prompts-accenture" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>🐙</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--text-title)', fontWeight: 800 }}>
                    Las 12 Actividades de Accenture: Prompts Listos para Copilot
                  </h2>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    Espacios optimizados para copiar código y directrices de Token Economy para cada entrega
                  </span>
                </div>
              </div>

              {/* FILTROS POR BLOQUE FORMATIVO */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {[
                  { id: 'all', label: 'Todas (12)' },
                  { id: 'Bloque 1', label: '📁 Bloque 1: IoC & DI' },
                  { id: 'Bloque 2', label: '📁 Bloque 2: API REST' },
                  { id: 'Bloque 3', label: '📁 Bloque 3: JPA & DTOs' },
                  { id: 'Bloque 4', label: '📁 Bloque 4: JWT & Tests' }
                ].map(b => {
                  const isActive = activeBlockFilter === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setActiveBlockFilter(b.id)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                        background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
                        color: isActive ? 'var(--accent-purple)' : 'var(--text-main)',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LISTADO DE ACTIVIDADES EN FORMATO DOSSIER / CARPETAS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* CABECERA DE LA ACTIVIDAD */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(117, 0, 193, 0.12)',
                          color: '#7500c1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          border: '1px solid rgba(117, 0, 193, 0.25)'
                        }}
                      >
                        #{act.numero}
                      </span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)' }}>
                          {act.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(117, 0, 193, 0.08)', color: '#7500c1' }}>
                            {act.module}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>•</span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            Categoría: {act.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BOTÓN COPIAR PROMPT */}
                    <button
                      type="button"
                      onClick={() => handleCopyActivityPrompt(act.id, act.markdownPrompt)}
                      style={{
                        background: copiedActivityId === act.id ? '#15803d' : 'linear-gradient(135deg, #7500c1 0%, #8b5cf6 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 2px 8px rgba(117, 0, 193, 0.25)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{copiedActivityId === act.id ? '✓' : '📋'}</span>
                      <span>{copiedActivityId === act.id ? '¡Prompt Copiado!' : 'Copiar Prompt para Copilot'}</span>
                    </button>
                  </div>

                  {/* RECOMENDACIÓN POO Y TOKEN ECONOMY */}
                  <div
                    style={{
                      background: 'rgba(59, 130, 246, 0.06)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '10px',
                      padding: '0.85rem 1.1rem',
                      fontSize: '0.86rem',
                      lineHeight: '1.5',
                      color: 'var(--text-main)'
                    }}
                  >
                    <strong style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                      <span>💡</span> Recomendación POO & Token Economy:
                    </strong>
                    {act.recommendation}
                  </div>

                  {/* BLOQUE DE MARKDOWN COPIABLE */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)' }}>
                        Markdown para Copilot Chat o .github/copilot-instructions.md
                      </span>
                    </div>
                    <pre
                      style={{
                        background: '#011627',
                        color: '#d6deeb',
                        padding: '1.1rem',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        margin: 0,
                        overflowX: 'auto',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        lineHeight: '1.55',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <code>{act.markdownPrompt}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN ESPECIAL: CONFIGURACIÓN DE HERMES BOT (SOUL, USER, TOOLS Y HARNESS) */}
        {currentTopic.id === 'hermes-local' && (
          <section id="hermes-config" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.8rem' }}>🕊️</span>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--text-title)', fontWeight: 800 }}>
                  Archivos Nucleares de Hermes: Soul, User, Tools & Harness
                </h2>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  Configuración completa del agente local para ejecutar con Ollama y Telegram
                </span>
              </div>
            </div>

            {/* SELECTOR DE PESTAÑAS DE CONFIGURACIÓN */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
              {[
                { id: 'soul', label: '1. soul.md (Alma & Moral)', icon: '✨' },
                { id: 'user', label: '2. user.md (Perfil de Blanca)', icon: '👤' },
                { id: 'tools', label: '3. tools.md (Catálogo Tools)', icon: '🛠️' },
                { id: 'harness', label: '4. Harness (Arnés ReAct)', icon: '⚙️' }
              ].map(tab => {
                const isActive = activeHermesTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveHermesTab(tab.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                      background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
                      color: isActive ? 'var(--accent-purple)' : 'var(--text-main)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CONTENIDO DEL ARCHIVO SELECCIONADO */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {activeHermesTab === 'soul' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        📄 hermes/config/soul.md — Identidad Nuclear y Límites Éticos
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Fija el tono motivador, la calidez y prohíbe la invención de fechas límite de entrega.
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyActivityPrompt('soul_file', `# 🕊️ Hermes Soul Specification (soul.md)\n- Nombre: Hermes.\n- Naturaleza: Agente personal autónomo local, mentor técnico de Blanca.\n- Asignaturas: IOC DAW (ENT, DESP, DIGI, IPO), Accenture Spring Boot, SEPE Python.\n- Tono: Cercano, cómplice, respetuoso ("princesa" o "Blanca").\n- Límites Éticos:\n  1. Las fechas de entrega son sagradas; jamás inventar plazos.\n  2. Fomentar comprensión para aprobar las PAF presenciales.\n  3. Privacidad total: ningún dato sale del Mac.`)}
                      style={{
                        background: copiedActivityId === 'soul_file' ? '#15803d' : 'var(--accent-purple)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {copiedActivityId === 'soul_file' ? '✓ Copiado' : '📋 Copiar soul.md'}
                    </button>
                  </div>
                  <pre style={{ background: '#011627', color: '#d6deeb', padding: '1.1rem', borderRadius: '10px', fontSize: '0.82rem', margin: 0, overflowX: 'auto', lineHeight: '1.55' }}>
                    <code>{`# 🕊️ Hermes Soul Specification (soul.md)
- Nombre: Hermes.
- Naturaleza: Agente personal autónomo local, mentor técnico de Blanca.
- Asignaturas:
  * IOC DAW: 0487 ENT (Entornos), 0614 DESP (Despliegue), 1665 DIG (Diseño Digital), 0488 IPO (Interfaces).
  * Accenture Core: Especialización en Java 17 y Spring Boot 3 (12 Actividades).
  * SEPE: Machine Learning y Python científico.
- Tono: Cercano, cómplice, respetuoso ("princesa" o "Blanca"). Directo y sin relleno.
- Límites Éticos Innegociables:
  1. Verdad sobre el calendario: Las fechas de entrega son sagradas; jamás inventar fechas.
  2. Pensamiento crítico: Guiar para dominar las PAF presenciales, no copia ciega.
  3. Privacidad absoluta: Inferencia local con Ollama sin enviar datos a la nube.`}</code>
                  </pre>
                </div>
              )}

              {activeHermesTab === 'user' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        📄 hermes/config/user.md — Contexto Académico y Hardware
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Permite a Hermes conocer el hardware (Mac ARM64) y las preferencias de estudio de Blanca.
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyActivityPrompt('user_file', `# 👤 Perfil del Usuario: Blanca (user.md)\n- Hardware: MacBook Pro Apple Silicon (ARM64 / macOS).\n- Entorno: Mi Campus SPA, Obsidian Vault, Eclipse, UTM/Multipass Ubuntu.\n- Preferencias: Respuestas estructuradas, bloques de código listos para copiar, economía de tokens.`)}
                      style={{
                        background: copiedActivityId === 'user_file' ? '#15803d' : 'var(--accent-purple)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {copiedActivityId === 'user_file' ? '✓ Copiado' : '📋 Copiar user.md'}
                    </button>
                  </div>
                  <pre style={{ background: '#011627', color: '#d6deeb', padding: '1.1rem', borderRadius: '10px', fontSize: '0.82rem', margin: 0, overflowX: 'auto', lineHeight: '1.55' }}>
                    <code>{`# 👤 Perfil del Usuario: Blanca (user.md)
- Estudiante: Blanca.
- Hardware Principal: MacBook Pro Apple Silicon (ARM64 / macOS).
- Entornos de Trabajo:
  * IDEs: Eclipse (para Java IOC), VS Code / Cursor (React, Spring Boot), UTM (VM Ubuntu).
  * Campus: Mi Campus SPA (/Users/blanca/Micampus/micampus-spa).
  * Notas: Obsidian Vault (/Users/blanca/Documents/Obsidian Vault).
- Preferencias de Comunicación:
  * Brevedad y concreción: respuestas directas con bloques listos para copiar.
  * Orientación a la evaluación: resaltar siempre conceptos clave para las PAF y rúbricas.`}</code>
                  </pre>
                </div>
              )}

              {activeHermesTab === 'tools' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        📄 hermes/config/tools.md — Catálogo de Herramientas Ejecutables
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Esquemas JSON de funciones locales para consultar entregas y conectar con Ollama.
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyActivityPrompt('tools_file', `# 🛠️ Catálogo de Herramientas (tools.md)\n1. get_pending_deliveries: Lee JSONs de entregas en /public/data/ioc/gestion/.\n2. mark_delivery_completed: PUT a backend local para marcar EACs como done.\n3. search_study_notes: Busca en lecciones de IOC y Second Brain.\n4. query_local_llm: Inferencia vía endpoint Ollama en http://localhost:11434.`)}
                      style={{
                        background: copiedActivityId === 'tools_file' ? '#15803d' : 'var(--accent-purple)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {copiedActivityId === 'tools_file' ? '✓ Copiado' : '📋 Copiar tools.md'}
                    </button>
                  </div>
                  <pre style={{ background: '#011627', color: '#d6deeb', padding: '1.1rem', borderRadius: '10px', fontSize: '0.82rem', margin: 0, overflowX: 'auto', lineHeight: '1.55' }}>
                    <code>{`# 🛠️ Catálogo de Herramientas de Hermes (tools.md)
1. get_pending_deliveries(subject: "all" | "ent" | "desp" | "accenture"):
   - Lee archivos en /public/data/ioc/gestion/ y accenture_actividades_curso.json.
   - Devuelve lista de entregas activas con fechas límite.

2. mark_delivery_completed(subjectId: string, eacId: string):
   - Envía PUT a http://localhost:3001/api/eac/status para actualizar progreso.

3. query_local_llm(userMessage: string, systemPrompt?: string):
   - Conecta con Ollama (http://localhost:11434) usando qwen2.5-coder o deepseek-r1.`}</code>
                  </pre>
                </div>
              )}

              {activeHermesTab === 'harness' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        ⚙️ hermes/docs/harness_architecture.md — El Arnés de Ejecución ReAct
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Cómo el software envuelve al LLM para dotarlo de autonomía y herramientas.
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyActivityPrompt('harness_file', `# ⚙️ Harness Architecture\nEl Harness es el motor que orquesta el ciclo ReAct:\n1. Context Assembly: Carga soul.md, user.md, herramientas e historial.\n2. Inferencia: El LLM emite razonamiento y llamada estructurada a herramienta.\n3. Tool Dispatcher: Ejecuta la función en Python local.\n4. Observación: Reinyecta el resultado como contexto.\n5. Guardián: Máximo 5 iteraciones por turno para evitar bucles.`)}
                      style={{
                        background: copiedActivityId === 'harness_file' ? '#15803d' : 'var(--accent-purple)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {copiedActivityId === 'harness_file' ? '✓ Copiado' : '📋 Copiar Harness Doc'}
                    </button>
                  </div>
                  <pre style={{ background: '#011627', color: '#d6deeb', padding: '1.1rem', borderRadius: '10px', fontSize: '0.82rem', margin: 0, overflowX: 'auto', lineHeight: '1.55' }}>
                    <code>{`# ⚙️ Arquitectura del Harness (Arnés de Ejecución)
El Harness convierte un modelo de texto probabilístico en un agente con capacidades de acción:

           ┌───────────────────────────────────────────────┐
           │            HERMES HARNESS RUNTIME             │
           │                                               │
           │  [Context Assembly] ──> [Local LLM (Ollama)]  │
           │  (Soul + User + Mem)           │              │
           │           ▲                    ▼              │
           │           │             [Tool Call JSON]      │
           │           │                    │              │
           │  [Observation Result] <── [Tool Dispatcher]   │
           └───────────────────────────────────────────────┘

1. Context Assembly: Combina soul.md, user.md y la hora actual del sistema.
2. Pensamiento & Tool Call: El modelo emite {"action": "get_pending_deliveries"}.
3. Ejecución Local: Python lee el archivo JSON en el disco duro de Blanca.
4. Observación & Respuesta: El arnés inyecta el resultado y genera el mensaje final de Telegram.`}</code>
                  </pre>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECCIÓN 3: LA HOJA AMARILLA (PROMPT PARA NOTEBOOK LM) */}
        <section id="hoja-amarilla-prompt" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.6rem' }}>💛</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>
                Hoja de Notas: Prompt para NotebookLM
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Pega este prompt en NotebookLM para generar tu vídeo o podcast explicativo de estudio
              </span>
            </div>
          </div>

          {/* LA HOJA AMARILLA ESTILO POST-IT / LEGAL PAD */}
          <div
            style={{
              position: 'relative',
              background: '#fef9c3', // Amarillo cálido de bloc legal
              backgroundImage: 'linear-gradient(#fef08a 1px, transparent 1px)',
              backgroundSize: '100% 1.8rem',
              borderRadius: '8px',
              border: '1px solid #fde047',
              borderTop: '12px solid #eab308', // Cabecera de bloc engomado
              padding: '2rem 2.2rem 2.2rem 3.5rem', // Margen izquierdo para emular margen rojo
              boxShadow: '0 12px 28px -6px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)',
              color: '#422006', // Tinta sepia oscura
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            {/* LÍNEA DE MARGEN ROJA VERTICAL DEL BLOC */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '2.4rem',
                width: '2px',
                background: 'rgba(239, 68, 68, 0.45)', // Línea roja tenue de libreta
                pointerEvents: 'none'
              }}
            />

            {/* CHINCHETA / CINTA ADHESIVA DECORATIVA */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '3px 18px',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#713f12',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              📌 NOTEBOOKLM PROMPT READY
            </div>

            {/* ENCABEZADO DE LA HOJA AMARILLA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px dashed #ca8a04' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#713f12' }}>
                  📝 Prompt para Vídeo / Podcast Explicativo: {currentTopic.title}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#854d0e', fontWeight: 600 }}>
                  Optimizado para Gemini & NotebookLM Audio Overview / Video Script
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  style={{
                    background: copiedPrompt ? '#15803d' : '#854d0e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{copiedPrompt ? '✓' : '📋'}</span>
                  <span>{copiedPrompt ? '¡Copiado al Portapapeles!' : 'Copiar Prompt para NotebookLM'}</span>
                </button>

                <a
                  href="https://notebooklm.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#ffffff',
                    color: '#713f12',
                    border: '1px solid #ca8a04',
                    borderRadius: '8px',
                    padding: '0.55rem 0.9rem',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}
                >
                  <span>🚀</span>
                  <span>Ir a NotebookLM ↗</span>
                </a>
              </div>
            </div>

            {/* TEXTO DEL PROMPT SOBRE LA HOJA */}
            <pre
              style={{
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid #fde047',
                borderRadius: '8px',
                padding: '1.2rem',
                fontSize: '0.88rem',
                lineHeight: '1.6',
                color: '#422006',
                whiteSpace: 'pre-wrap',
                fontFamily: 'ui-monospace, Menlo, Monaco, Consolas, monospace',
                margin: 0,
                overflowX: 'auto',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {currentTopic.notebookLmPrompt}
            </pre>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#854d0e', fontWeight: 600 }}>
              <span>💡 Pégalo como fuente o en la barra de generación de Audio/Vídeo Overview de NotebookLM.</span>
              <span>Campus Blanca · Second Brain</span>
            </div>
          </div>
        </section>

        {/* NAVEGACIÓN INFERIOR ENTRE TEMAS DE BRAIN */}
        <section 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            marginTop: '1rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          {prevTopic ? (
            <Link
              to={`/brain/${prevTopic.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.2rem',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.86rem'
              }}
            >
              <span>←</span>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tema anterior</span>
                <span>{prevTopic.emoji} {prevTopic.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextTopic && (
            <Link
              to={`/brain/${nextTopic.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.2rem',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.86rem',
                textAlign: 'right'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tema siguiente</span>
                <span>{nextTopic.emoji} {nextTopic.title}</span>
              </div>
              <span>→</span>
            </Link>
          )}
        </section>
      </main>
    </div>
  );
}
