import React, { useState, useMemo } from 'react';
import { ACTIVIDADES_META, QUIZZES } from '../../../../data/javaStudio/studioData.js';
import { ACTIVITY_DETAILED_EXPLANATIONS } from '../../../../data/javaStudio/activityDetails.js';
import { getQuizzesForActivity } from '../../../../data/javaStudio/quizTheoryMapping.js';
import StudioCodeBlock from '../StudioCodeBlock.jsx';
import StudioAutoevaluacionQuiz from '../StudioAutoevaluacionQuiz.jsx';
import {
  IconSearch,
  IconArrowLeft,
  IconArrowRight,
  IconCheckCircle,
  IconAlertCircle,
  IconCode,
  IconFolder,
  IconGitBranch,
  IconTarget,
  IconDownload
} from '../StudioIcons.jsx';

// Mapeo oficial de los 16 proyectos ZIP entregados por Blanca en L2E
const DELIVERED_ZIPS = {
  1: {
    nombre: 'Spring Boot - Uso de IoC - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad1/Spring Boot - Uso de IoC - Blanca de Una.zip'
  },
  2: {
    nombre: 'Spring Boot - Uso de IoD - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad2/Spring Boot - Uso de IoD - Blanca de Una.zip'
  },
  3: {
    nombre: 'Spring Boot - Uso de Java Annotations - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad3/Spring Boot - Uso de Java Annotations - Blanca de Una.zip'
  },
  4: {
    nombre: 'Spring Boot - Config en Spring - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad4/Spring Boot - Config en Spring - Blanca de Una.zip'
  },
  5: {
    nombre: 'Spring Boot – Preparación del entorno - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad5/Spring Boot – Preparación del entorno - Blanca de Una.zip'
  },
  6: {
    nombre: 'Spring Boot – Creación del Controller - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad6/Spring Boot – Creación del Controller - Blanca de Una.zip'
  },
  7: {
    nombre: 'Spring Boot – Creación de la Capa de Servicio - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad7/Spring Boot – Creación de la Capa de Servicio - Blanca de Una.zip'
  },
  8: {
    nombre: 'Spring Boot – Introducción a JPA y modelado de entidades - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad8/Spring Boot – Introducción a JPA y modelado de entidades - Blanca de Una.zip'
  },
  9: {
    nombre: 'Spring Boot – Uso de Spring Data JPA - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad9/Spring Boot – Uso de Spring Data JPA - Blanca de Una.zip'
  },
  10: {
    nombre: "Spring Boot – Creación de los DTO's - Blanca de Una.zip",
    url: "/java-studio/actividades-entregadas/Actividad010/Spring Boot – Creación de los DTO's - Blanca de Una.zip"
  },
  11: {
    nombre: 'Spring Boot – Uso de Validaciones - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad011/Spring Boot – Uso de Validaciones - Blanca de Una.zip'
  },
  12: {
    nombre: 'Spring Boot – Manejo de errores - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad012/Spring Boot – Manejo de errores - Blanca de Una.zip'
  },
  13: {
    nombre: 'Spring Boot – Creación de la documentación de la API - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad013/Spring Boot – Creación de la documentación de la API - Blanca de Una.zip'
  },
  14: {
    nombre: 'Spring Boot – Pruebas en Aplicaciones Spring Boot - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad014/Spring Boot – Pruebas en Aplicaciones Spring Boot - Blanca de Una.zip'
  },
  15: {
    nombre: 'Spring Boot – Seguridad con Spring Security y JWT - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad015/Spring Boot – Seguridad con Spring Security y JWT - Blanca de Una.zip'
  },
  16: {
    nombre: 'Spring Boot – Despliegue con Docker - Blanca de Una.zip',
    url: '/java-studio/actividades-entregadas/Actividad016/Spring Boot – Despliegue con Docker - Blanca de Una.zip'
  }
};

const BLOQUES = [
  'Todos',
  'Fundamentos Spring',
  'Spring Boot Core',
  'Persistencia JPA',
  'Robustez & Calidad',
  'Testing & Docs',
  'Seguridad & Docker'
];

export default function StudioActivitiesTab({ initialSlug = null, onSelectActivity = null }) {
  const [internalNum, setInternalNum] = useState(null);

  const selectedActivityNum = useMemo(() => {
    if (internalNum !== null) return internalNum;
    if (initialSlug) {
      const clean = String(initialSlug).toLowerCase().trim();
      const match = clean.match(/(\d+)/);
      if (match) {
        const n = parseInt(match[1], 10);
        if (n >= 1 && n <= 16) return n;
      }
    }
    return null;
  }, [internalNum, initialSlug]);

  const setSelectedActivityNum = (n) => {
    setInternalNum(n);
    if (onSelectActivity) {
      onSelectActivity(n);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('Todos');

  // Filtrado de actividades
  const filteredActivities = useMemo(() => {
    return ACTIVIDADES_META.filter(act => {
      const matchBlock = selectedBlock === 'Todos' || act.bloque === selectedBlock;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        act.titulo.toLowerCase().includes(q) ||
        act.descripcion.toLowerCase().includes(q) ||
        (act.conceptosClave && act.conceptosClave.some(c => c.toLowerCase().includes(q))) ||
        (act.rama && act.rama.toLowerCase().includes(q));
      return matchBlock && matchSearch;
    });
  }, [searchQuery, selectedBlock]);

  // Actividad seleccionada en detalle
  const currentActivity = useMemo(() => {
    if (!selectedActivityNum) return null;
    return ACTIVIDADES_META.find(a => a.numero === selectedActivityNum) || null;
  }, [selectedActivityNum]);

  const currentDetail = useMemo(() => {
    if (!selectedActivityNum) return null;
    return ACTIVITY_DETAILED_EXPLANATIONS[String(selectedActivityNum)] || null;
  }, [selectedActivityNum]);

  // Preguntas del Quiz oficial vinculadas a esta actividad práctica
  const activityQuizzes = useMemo(() => {
    if (!selectedActivityNum) return [];
    return getQuizzesForActivity(selectedActivityNum, QUIZZES);
  }, [selectedActivityNum]);

  // Navegación anterior / siguiente
  const handlePrev = () => {
    if (selectedActivityNum > 1) {
      setSelectedActivityNum(selectedActivityNum - 1);
    }
  };

  const handleNext = () => {
    if (selectedActivityNum < ACTIVIDADES_META.length) {
      setSelectedActivityNum(selectedActivityNum + 1);
    }
  };

  // VISTA DETALLE DE ACTIVIDAD
  if (currentActivity) {
    return (
      <div className="studio-activity-detail-view" style={{ width: '100%', minWidth: 0 }}>
        {/* CABECERA COMPACTA DE LA ACTIVIDAD */}
        <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
                Actividades Prácticas Enterprise
              </span>
              <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {currentActivity.bloque}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <button
                type="button"
                onClick={() => setSelectedActivityNum(null)}
                className="studio-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                <IconArrowLeft size={14} /> Catálogo
              </button>
              <button
                type="button"
                onClick={handlePrev}
                disabled={selectedActivityNum <= 1}
                className="studio-btn-secondary"
                style={{ opacity: selectedActivityNum <= 1 ? 0.5 : 1, cursor: selectedActivityNum <= 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                <IconArrowLeft size={14} /> Anterior
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={selectedActivityNum >= ACTIVIDADES_META.length}
                className="studio-btn-secondary"
                style={{ opacity: selectedActivityNum >= ACTIVIDADES_META.length ? 0.5 : 1, cursor: selectedActivityNum >= ACTIVIDADES_META.length ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                Siguiente <IconArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* BARRA DE APARTADOS / ACTIVIDADES */}
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
            {ACTIVIDADES_META.map((act) => {
              const isSelected = act.numero === currentActivity.numero;
              return (
                <button
                  key={act.numero}
                  type="button"
                  onClick={() => setSelectedActivityNum(act.numero)}
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
                  title={act.titulo}
                >
                  <span style={{ fontWeight: 800 }}>Act #{act.numero < 10 ? `0${act.numero}` : act.numero}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TÍTULO PRINCIPAL DE LA ACTIVIDAD FUERA DE LA CAJA */}
        <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
          Actividad #{currentActivity.numero < 10 ? `0${currentActivity.numero}` : currentActivity.numero} · {currentActivity.titulo}
        </h1>

        {/* CONTENIDO DEL DETALLE DE LA ACTIVIDAD A ANCHO COMPLETO */}
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* CABECERA DE LA ACTIVIDAD */}
        <div className="studio-card" style={{ marginBottom: '1.5rem', borderLeft: '5px solid #6d28d9', padding: '2rem 2.25rem', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span className="studio-badge studio-badge-blue">
              {currentActivity.bloque}
            </span>
            {currentActivity.rama && (
              <span className="studio-badge studio-badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <IconGitBranch /> {currentActivity.rama}
              </span>
            )}
            {currentActivity.proyecto && (
              <span className="studio-badge studio-badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <IconFolder /> {currentActivity.proyecto}
              </span>
            )}
          </div>

          <p style={{ margin: 0, fontSize: '0.94rem', color: '#334155', lineHeight: 1.7 }}>
            {currentDetail?.objetivo || currentActivity.descripcion}
          </p>

          {/* CONCEPTOS CLAVE */}
          {currentActivity.conceptosClave && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
              {currentActivity.conceptosClave.map((c, i) => (
                <span key={i} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.78rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  #{c}
                </span>
              ))}
            </div>
          )}

          {/* DESCARGA DIRECTA DEL ENTREGABLE OFICIAL L2E */}
          {DELIVERED_ZIPS[currentActivity.numero] && (
            <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  📦 Archivo Entregable Oficial en L2E
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Proyecto Maven empaquetado y entregado por Blanca de Uña ({DELIVERED_ZIPS[currentActivity.numero].nombre})
                </span>
              </div>
              <a
                href={DELIVERED_ZIPS[currentActivity.numero].url}
                download={DELIVERED_ZIPS[currentActivity.numero].nombre}
                className="studio-btn-primary"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  padding: '0.45rem 0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontWeight: 700
                }}
              >
                <IconDownload /> Descargar .zip Entregado
              </a>
            </div>
          )}
        </div>

        {/* PROBLEMA DE INGENIERÍA */}
        {currentDetail?.problemaIngenieria && (
          <div className="studio-card" style={{ marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 0.4rem 0', color: '#0f172a', fontSize: '0.98rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <IconTarget style={{ color: '#6d28d9' }} /> Problema de Ingeniería que Resuelve
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
              {currentDetail.problemaIngenieria}
            </p>
          </div>
        )}

        {/* DESGLOSE PASO A PASO / PARTES DEL CÓDIGO */}
        {currentDetail?.partes && currentDetail.partes.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
              Desglose Técnico de la Solución ({currentDetail.partes.length} Partes)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentDetail.partes.map((parte, idx) => (
                <div key={idx} className="studio-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.98rem', color: '#6d28d9' }}>
                      {parte.nombre}
                    </strong>
                    {parte.archivo && (
                      <span className="studio-badge studio-badge-blue" style={{ fontFamily: 'monospace' }}>
                        {parte.archivo}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                    {parte.explicacion}
                  </p>
                  {parte.codigoFragmento && (
                    <StudioCodeBlock code={parte.codigoFragmento} filename={parte.archivo || 'Snippet.java'} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CÓDIGO RESUELTO OFICIAL COMPLETO */}
        {currentActivity.codigoResuelto && (
          <div className="studio-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <IconCode style={{ color: '#10b981' }} /> Código Oficial Resuelto
            </h3>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#64748b' }}>
              Implementación limpia conforme a los requerimientos de la rúbrica oficial.
            </p>
            <StudioCodeBlock code={currentActivity.codigoResuelto} filename={`Solucion_Actividad_${currentActivity.numero}.java`} />
          </div>
        )}

        {/* GUÍA DE DEFENSA TÉCNICA & TRAMPAS FRECUENTES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* PUNTOS DE DEFENSA */}
          <div className="studio-card" style={{ borderLeft: '4px solid #10b981' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#059669', fontSize: '0.98rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <IconCheckCircle /> Argumentos de Defensa Técnica
            </h4>
            {currentDetail?.puntosDefensa && currentDetail.puntosDefensa.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                {currentDetail.puntosDefensa.map((pto, i) => (
                  <li key={i} style={{ marginBottom: '0.4rem' }}>{pto}</li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                {currentActivity.preguntaDefensa || 'Explica la separación de responsabilidades y por qué esta implementación desacopla el cliente de la base de datos.'}
              </p>
            )}
          </div>

          {/* ERRORES COMUNES */}
          <div className="studio-card" style={{ borderLeft: '4px solid #ea580c' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#ea580c', fontSize: '0.98rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <IconAlertCircle /> Trampas y Errores Comunes
            </h4>
            {currentDetail?.erroresComunes && currentDetail.erroresComunes.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                {currentDetail.erroresComunes.map((err, i) => (
                  <li key={i} style={{ marginBottom: '0.4rem' }}>{err}</li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                {currentActivity.errorComun || 'No validar campos nulos en DTOs o exponer directamente entidades JPA en el controlador.'}
              </p>
            )}
          </div>
        </div>

        {/* CONEXIÓN CON EL PROYECTO FINAL */}
        {currentDetail?.conexionProyectoFinal && (
          <div className="studio-card" style={{ background: '#f8fafc', borderLeft: '4px solid #0284c7', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.4rem 0', color: '#0284c7', fontSize: '0.98rem', fontWeight: 800 }}>
              🔗 Conexión con el Proyecto Final
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
              {currentDetail.conexionProyectoFinal}
            </p>
          </div>
        )}

        {/* AUTOEVALUACIÓN DEL QUIZ OFICIAL VINCULADA A ESTA ACTIVIDAD */}
        {activityQuizzes.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <StudioAutoevaluacionQuiz
              quizzes={activityQuizzes}
              title={`Autoevaluación: Actividad #${currentActivity.numero} (${activityQuizzes.length} Preguntas del Quiz Oficial)`}
              subtitle={`Pon a prueba tus conocimientos sobre ${currentActivity.titulo} con las preguntas oficiales de examen vinculadas a esta práctica.`}
              accentColor="#6d28d9"
              quizBaseUrl="/java/studio/quiz"
            />
          </div>
        )}
        </div>
      </div>
    );
  }

  // VISTA CATÁLOGO (LISTADO DE LAS 16 ACTIVIDADES)
  return (
    <div className="studio-activities-catalog">
      {/* HEADER Y FILTROS */}
      <div className="studio-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
              Catálogo Oficial del Bootcamp
            </span>
            <h2 style={{ margin: '0.2rem 0 0.35rem 0', fontSize: '1.45rem', fontWeight: 800 }}>
              16 Actividades de Desarrollo Backend
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              Desde fundamentos IoC y Spring Boot hasta persistencia JPA, seguridad JWT y contenedorización Docker.
            </p>
          </div>

          {/* BUSCADOR */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <IconSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, concepto o rama..."
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.86rem',
                outline: 'none',
                background: '#ffffff'
              }}
            />
          </div>
        </div>

        {/* FILTROS POR BLOQUE */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
          {BLOQUES.map((bloque) => (
            <button
              key={bloque}
              type="button"
              onClick={() => setSelectedBlock(bloque)}
              className={`studio-btn-secondary ${selectedBlock === bloque ? 'active' : ''}`}
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                borderColor: selectedBlock === bloque ? '#6d28d9' : '#e2e8f0',
                background: selectedBlock === bloque ? 'rgba(109, 40, 217, 0.1)' : '#ffffff',
                color: selectedBlock === bloque ? '#6d28d9' : '#64748b',
                fontWeight: selectedBlock === bloque ? 700 : 500
              }}
            >
              {bloque}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE ACTIVIDADES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
        {filteredActivities.map((act) => (
          <div
            key={act.numero}
            className="studio-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              borderTop: '3px solid #6d28d9'
            }}
            onClick={() => setSelectedActivityNum(act.numero)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="studio-badge studio-badge-purple" style={{ fontWeight: 800 }}>
                  Actividad #{act.numero < 10 ? `0${act.numero}` : act.numero}
                </span>
                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                  <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.72rem' }}>
                    {act.bloque}
                  </span>
                  {(() => {
                    const qCount = (getQuizzesForActivity(act.numero, QUIZZES) || []).length;
                    if (qCount === 0) return null;
                    return (
                      <span className="studio-badge studio-badge-purple" style={{ fontSize: '0.7rem', fontWeight: 700 }} title={`${qCount} preguntas del Quiz oficial`}>
                        🧪 {qCount} Q
                      </span>
                    );
                  })()}
                  {DELIVERED_ZIPS[act.numero] && (
                    <span className="studio-badge studio-badge-green" style={{ fontSize: '0.7rem' }}>
                      📦 .zip
                    </span>
                  )}
                </div>
              </div>

              <h3 style={{ margin: '0.4rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35 }}>
                {act.titulo}
              </h3>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {act.descripcion}
              </p>
            </div>

            <div>
              {act.rama && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', color: '#059669', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  <IconGitBranch /> {act.rama}
                </div>
              )}

              <button
                type="button"
                className="studio-btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '0.5rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedActivityNum(act.numero);
                }}
              >
                Ver Detalle y Código Resuelto →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="studio-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>No se encontraron actividades para "{searchQuery}".</p>
        </div>
      )}
    </div>
  );
}
