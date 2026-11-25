import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BRAIN_TOPICS_DATA } from '../../../data/brainTopicsData';
import PodcastPlayerCard from '../../viewers/LessonViewer/widgets/PodcastPlayerCard';
import BrainTopicHero from './topic/BrainTopicHero';
import BrainTopicBlogSection from './topic/BrainTopicBlogSection';
import BrainTopicCrossConcepts from './topic/BrainTopicCrossConcepts';
import BrainTopicCavemanSection from './topic/BrainTopicCavemanSection';
import BrainTopicCommonAndCompare from './topic/BrainTopicCommonAndCompare';
import BrainTopicTutorialSection from './topic/BrainTopicTutorialSection';
import BrainTopicCopilotDossier from './topic/BrainTopicCopilotDossier';
import BrainTopicHermesSection from './topic/BrainTopicHermesSection';
import BrainTopicYellowPad from './topic/BrainTopicYellowPad';
import BrainTopicNavFooter from './topic/BrainTopicNavFooter';

export default function BrainTopicDetail() {
  const { topicId } = useParams();

  const topicIndex = useMemo(() => {
    return BRAIN_TOPICS_DATA.findIndex((t) => t.id === topicId);
  }, [topicId]);

  const currentTopic = useMemo(() => {
    if (topicIndex >= 0) return BRAIN_TOPICS_DATA[topicIndex];
    return BRAIN_TOPICS_DATA[0];
  }, [topicIndex]);

  const prevTopic = topicIndex > 0 ? BRAIN_TOPICS_DATA[topicIndex - 1] : null;
  const nextTopic =
    topicIndex >= 0 && topicIndex < BRAIN_TOPICS_DATA.length - 1
      ? BRAIN_TOPICS_DATA[topicIndex + 1]
      : null;

  const relatedTopics = useMemo(() => {
    if (!currentTopic?.relatedTopicIds) return [];
    return currentTopic.relatedTopicIds
      .map((id) => BRAIN_TOPICS_DATA.find((t) => t.id === id))
      .filter(Boolean);
  }, [currentTopic]);

  if (!currentTopic) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Tema no encontrado</h2>
        <Link to="/brain" style={{ color: 'var(--accent-purple)' }}>
          Volver a Second Brain
        </Link>
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
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Campus
            </Link>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <Link to="/brain" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Second Brain
            </Link>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ color: 'var(--accent-purple, #8b5cf6)', fontWeight: 700 }}>
              {currentTopic.title}
            </span>
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
              fontWeight: 600,
            }}
          >
            <span>←</span>
            <span>Volver a Matriz Brain</span>
          </Link>
        </div>
      </div>

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        {/* 1. HERO DEL TEMA Y ACCESOS RÁPIDOS */}
        <BrainTopicHero currentTopic={currentTopic} relatedCount={relatedTopics.length} />

        {/* 2. SECCIÓN MULTIMEDIA DESTACADA (PODCAST / VÍDEO) */}
        {(currentTopic.audioUrl || currentTopic.videoUrl || currentTopic.mediaList) && (
          <section id="media-player" style={{ marginBottom: '0.5rem' }}>
            <PodcastPlayerCard
              podcastSrc={currentTopic.audioUrl}
              videoSrc={currentTopic.videoUrl}
              mediaList={currentTopic.mediaList}
              title={`Multimedia: ${currentTopic.title}`}
              duration={currentTopic.audioDuration || currentTopic.readTime || '6:30'}
              description={currentTopic.summary}
              badge="Brain Podcast & Vídeo"
            />
          </section>
        )}

        {/* 3. SECCIÓN BLOG: REFLEXIÓN TÉCNICA, ANALOGÍA Y CONEXIÓN TRANSVERSAL */}
        <BrainTopicBlogSection blogPost={currentTopic.blogPost} />

        {/* 4. SECCIÓN RED DE CONCEPTOS CRUZADOS (CLICKABLE CROSS-LINKING) */}
        <BrainTopicCrossConcepts relatedTopics={relatedTopics} />

        {/* 5. SECCIÓN CAVEMAN SCRIPT (PYTHON BRUTO / CERO CHARLA) */}
        <BrainTopicCavemanSection cavemanScript={currentTopic.cavemanScript} />

        {/* 6. PUNTOS CLAVE EN COMÚN Y COMPARATIVA POR ASIGNATURAS */}
        <BrainTopicCommonAndCompare
          commonPoints={currentTopic.commonPoints}
          crossCompare={currentTopic.crossCompare}
        />

        {/* 7. TUTORIAL PASO A PASO */}
        <BrainTopicTutorialSection tutorial={currentTopic.tutorial} />

        {/* 8. 12 PROMPTS Y RECOMENDACIONES DE ACCENTURE PARA GITHUB COPILOT */}
        <BrainTopicCopilotDossier
          activitiesPrompts={currentTopic.accentureActivitiesPrompts}
        />

        {/* 9. CONFIGURACIÓN DE HERMES BOT (SOUL, USER, TOOLS Y HARNESS) */}
        <BrainTopicHermesSection topicId={currentTopic.id} />

        {/* 10. LA HOJA AMARILLA (PROMPT PARA NOTEBOOK LM) */}
        <BrainTopicYellowPad currentTopic={currentTopic} />

        {/* 11. NAVEGACIÓN INFERIOR ENTRE TEMAS */}
        <BrainTopicNavFooter prevTopic={prevTopic} nextTopic={nextTopic} />
      </main>
    </div>
  );
}
