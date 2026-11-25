import React, { useState, useMemo } from 'react';
import { DILEMAS_ARQUITECTURA, GUIA_PROYECTO_CERO, TALLERES_IFCD } from '../../../../data/javaStudio/challengesData.js';
import StudioCodeBlock from '../StudioCodeBlock.jsx';
import { IconEye, IconEyeOff, IconCheckCircle, IconArrowLeft, IconArrowRight } from '../StudioIcons.jsx';

export default function StudioChallengesTab({ initialSlug = null, onSelectDilema = null }) {
  const [userSubMode, setUserSubMode] = useState(null);
  const [userDilemaIndex, setUserDilemaIndex] = useState(null);
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [selectedTallerIndex, setSelectedTallerIndex] = useState(0);

  const derivedFromSlug = useMemo(() => {
    if (!initialSlug) return null;
    const clean = String(initialSlug).toLowerCase().trim();
    if (clean === 'api-zero' || clean === 'proyecto-cero') {
      return { subMode: 'proyecto-cero', dilemaIndex: 0 };
    }
    // Dilema por ID exacto
    const foundIdx = DILEMAS_ARQUITECTURA.findIndex(d => d.id.toLowerCase() === clean);
    if (foundIdx !== -1) {
      return { subMode: 'dilemas', dilemaIndex: foundIdx };
    }
    // Dilema por alias d1..d5 o número 1..5
    const match = clean.match(/d?(\d+)/);
    if (match) {
      const idx = parseInt(match[1], 10) - 1;
      if (idx >= 0 && idx < DILEMAS_ARQUITECTURA.length) {
        return { subMode: 'dilemas', dilemaIndex: idx };
      }
    }
    return null;
  }, [initialSlug]);

  const subMode = userSubMode !== null ? userSubMode : (derivedFromSlug?.subMode || 'dilemas');
  const selectedDilemaIndex = userDilemaIndex !== null ? userDilemaIndex : (derivedFromSlug?.dilemaIndex !== undefined ? derivedFromSlug.dilemaIndex : 0);

  const setSubMode = (m) => {
    setUserSubMode(m);
    if (onSelectDilema) onSelectDilema(m === 'proyecto-cero' ? 'api-zero' : 'd1');
  };

  const setSelectedDilemaIndex = (idx) => {
    setUserDilemaIndex(idx);
    if (onSelectDilema) onSelectDilema(`d${idx + 1}`);
  };

  const currentDilema = DILEMAS_ARQUITECTURA[selectedDilemaIndex] || DILEMAS_ARQUITECTURA[0];
  const isSolRevealed = !!revealedSolutions[currentDilema.id];

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentStep = GUIA_PROYECTO_CERO[selectedStepIndex] || GUIA_PROYECTO_CERO[0];

  return (
    <div className="studio-challenges-container">
      {/* HEADER & SUBMODE SWITCHER */}
      <div className="studio-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
              Gimnasio Técnico & Arquitectura
            </span>
            <h2 style={{ margin: '0.2rem 0 0.35rem 0', fontSize: '1.45rem', fontWeight: 800 }}>
              Retos de Ingeniería & Pensamiento Crítico
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              Escenarios reales de producción, trampas sutiles de la arquitectura y guía para construir proyectos desde una hoja en blanco.
            </p>
          </div>
        </div>

        {/* MODO TOGGLE */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
          <button
            type="button"
            onClick={() => setSubMode('dilemas')}
            className={`studio-btn-secondary ${subMode === 'dilemas' ? 'active' : ''}`}
            style={{
              borderColor: subMode === 'dilemas' ? '#6d28d9' : '#cbd5e1',
              background: subMode === 'dilemas' ? '#6d28d9' : '#ffffff',
              color: subMode === 'dilemas' ? '#ffffff' : '#334155',
              fontWeight: 700
            }}
          >
            🐛 Dilemas de Producción & Bug Hunting (5 Casos)
          </button>
          <button
            type="button"
            onClick={() => setSubMode('proyecto-cero')}
            className={`studio-btn-secondary ${subMode === 'proyecto-cero' ? 'active' : ''}`}
            style={{
              borderColor: subMode === 'proyecto-cero' ? '#6d28d9' : '#cbd5e1',
              background: subMode === 'proyecto-cero' ? '#6d28d9' : '#ffffff',
              color: subMode === 'proyecto-cero' ? '#ffffff' : '#334155',
              fontWeight: 700
            }}
          >
            🚀 Construye una API desde Cero (Paso a Paso)
          </button>
          <button
            type="button"
            onClick={() => setSubMode('talleres-ifcd')}
            className={`studio-btn-secondary ${subMode === 'talleres-ifcd' ? 'active' : ''}`}
            style={{
              borderColor: subMode === 'talleres-ifcd' ? '#6d28d9' : '#cbd5e1',
              background: subMode === 'talleres-ifcd' ? '#6d28d9' : '#ffffff',
              color: subMode === 'talleres-ifcd' ? '#ffffff' : '#334155',
              fontWeight: 700
            }}
          >
            🎓 Talleres Prácticos Java Studio (3 Casos)
          </button>
        </div>
      </div>

      {/* MODO 1: DILEMAS DE PRODUCCIÓN */}
      {subMode === 'dilemas' && (
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* CABECERA COMPACTA DEL DILEMA */}
          <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
                  Dilemas de Producción & Bug Hunting
                </span>
                <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  {currentDilema.categoria}
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedDilemaIndex(prev => Math.max(0, prev - 1))}
                  disabled={selectedDilemaIndex <= 0}
                  className="studio-btn-secondary"
                  style={{ opacity: selectedDilemaIndex <= 0 ? 0.5 : 1, cursor: selectedDilemaIndex <= 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  <IconArrowLeft size={14} /> Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDilemaIndex(prev => Math.min(DILEMAS_ARQUITECTURA.length - 1, prev + 1))}
                  disabled={selectedDilemaIndex >= DILEMAS_ARQUITECTURA.length - 1}
                  className="studio-btn-secondary"
                  style={{ opacity: selectedDilemaIndex >= DILEMAS_ARQUITECTURA.length - 1 ? 0.5 : 1, cursor: selectedDilemaIndex >= DILEMAS_ARQUITECTURA.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  Siguiente <IconArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* BARRA DE APARTADOS / DILEMAS */}
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
              {DILEMAS_ARQUITECTURA.map((d, idx) => {
                const isSelected = idx === selectedDilemaIndex;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDilemaIndex(idx)}
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
                    <span>Dilema #{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TÍTULO PRINCIPAL DEL DILEMA FUERA DE LA CAJA */}
          <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
            Dilema #{selectedDilemaIndex + 1}: {currentDilema.titulo}
          </h1>

          {/* FICHA DEL DILEMA */}
          <div className="studio-card" style={{ borderLeft: '5px solid #6d28d9', marginBottom: '1.5rem', minWidth: 0, padding: '2rem 2.25rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="studio-badge studio-badge-blue">
                {currentDilema.categoria}
              </span>
              <span className="studio-badge studio-badge-amber">
                Dificultad: {currentDilema.dificultad}
              </span>
            </div>

            {/* SÍNTOMA EN PRODUCCIÓN */}
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.85rem 1rem', borderRadius: '8px', margin: '0.75rem 0', color: '#991b1b', fontSize: '0.88rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>💥 Síntoma en Producción:</strong>
              {currentDilema.sintoma}
            </div>

            {/* CONTEXTO */}
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
              <strong>Contexto de Negocio:</strong> {currentDilema.contextoEmpresa}
            </p>

            {/* CÓDIGO CON EL ERROR */}
            <h4 style={{ margin: '1rem 0 0.35rem 0', fontSize: '0.92rem', color: '#334155', fontWeight: 700 }}>
              Código Problemático (Localiza el Bug):
            </h4>
            <StudioCodeBlock code={currentDilema.codigoProblema} filename="BuggyCode.java" />

            {/* PREGUNTAS PARA PENSAR */}
            {currentDilema.preguntasPensar && currentDilema.preguntasPensar.length > 0 && (
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '1rem 0' }}>
                <strong style={{ color: '#6d28d9', fontSize: '0.86rem', display: 'block', marginBottom: '0.35rem' }}>
                  🤔 Preguntas de Reflexión Técnica:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>
                  {currentDilema.preguntasPensar.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* BOTÓN REVELAR SOLUCIÓN */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => toggleSolution(currentDilema.id)}
                className="studio-btn-primary"
                style={{
                  background: isSolRevealed ? '#475569' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                }}
              >
                {isSolRevealed ? <IconEyeOff /> : <IconEye />}
                <span>{isSolRevealed ? 'Ocultar Solución Argumentada' : 'Revelar Solución Argumentada'}</span>
              </button>

              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                {isSolRevealed ? 'Solución desplegada abajo' : 'Intenta deducir la causa antes de ver la solución'}
              </span>
            </div>

            {/* SECCIÓN SOLUCIÓN REVELADA */}
            {isSolRevealed && (
              <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#059669', marginBottom: '0.5rem' }}>
                  <IconCheckCircle size={18} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                    Solución de Arquitectura y Corrección Definitiva
                  </h4>
                </div>

                <div style={{ margin: '0 0 0.85rem 0', fontSize: '0.88rem', color: '#166534', lineHeight: 1.65 }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Diagnóstico y Fundamento:</strong>
                  {currentDilema.solucionExplicada}
                </div>

                <h5 style={{ margin: '1rem 0 0.35rem 0', fontSize: '0.88rem', color: '#166534', fontWeight: 700 }}>
                  Código Corregido en Producción:
                </h5>
                <StudioCodeBlock code={currentDilema.codigoSolucion} filename="FixedCode.java" />

                {currentDilema.preguntaExamen && (
                  <div style={{ marginTop: '1rem', padding: '0.85rem', background: '#ffffff', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '0.84rem', color: '#14532d' }}>
                    <strong>🎓 Pregunta Típica de Tribunal / Entrevista:</strong> {currentDilema.preguntaExamen}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODO 2: CONSTRUYE UNA API DESDE CERO */}
      {subMode === 'proyecto-cero' && (
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* FICHA DEL PASO SELECCIONADO */}
          <div className="studio-card" style={{ borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="studio-badge studio-badge-blue" style={{ fontWeight: 800 }}>
                Paso #{currentStep.paso} de {GUIA_PROYECTO_CERO.length}
              </span>
              <span className="studio-badge studio-badge-purple">
                {currentStep.subtitulo}
              </span>
            </div>

            <h2 style={{ margin: '0.2rem 0 0.5rem 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              {currentStep.titulo}
            </h2>

            <p style={{ margin: '0 0 1rem 0', fontSize: '0.92rem', color: '#475569', lineHeight: 1.65 }}>
              {currentStep.explicacion}
            </p>

            {/* DEPENDENCIAS O NOTAS */}
            {currentStep.dependencias && (
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.85rem', color: '#334155' }}>
                <strong style={{ color: '#0284c7', display: 'block', marginBottom: '0.2rem' }}>📦 Dependencias Maven / Configuración:</strong>
                <code>{currentStep.dependencias}</code>
              </div>
            )}

            {/* CÓDIGO DEL PASO */}
            <h4 style={{ margin: '1rem 0 0.35rem 0', fontSize: '0.92rem', color: '#334155', fontWeight: 700 }}>
              Implementación Técnica del Paso {currentStep.paso}:
            </h4>
            <StudioCodeBlock code={currentStep.codigo} filename={`Paso${currentStep.paso}_${currentStep.titulo.replace(/\s+/g, '')}.java`} />
          </div>
        </div>
      )}

      {/* MODO 3: TALLERES PRÁCTICOS JAVA STUDIO */}
      {subMode === 'talleres-ifcd' && (
        <div style={{ width: '100%', minWidth: 0 }}>
          {/* FICHA DEL TALLER SELECCIONADO */}
          {(() => {
            const taller = TALLERES_IFCD[selectedTallerIndex] || TALLERES_IFCD[0];
            return (
              <div className="studio-card" style={{ borderLeft: '4px solid #6d28d9', minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className="studio-badge studio-badge-orange">{taller.modulo}</span>
                      <span className="studio-badge studio-badge-purple">{taller.badge}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Nivel: {taller.dificultad}</span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                      {taller.titulo}
                    </h2>
                  </div>

                  <a
                    href={taller.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="studio-btn-primary"
                    style={{ background: '#ea580c', borderColor: '#ea580c', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                  >
                    <span>📄 Ver Enunciado Completo</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* ESCENARIOS RESUELTOS */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '1.25rem 0 0.75rem 0', color: '#334155' }}>
                  🎯 Escenarios de Aplicación y Soluciones Arquitectónicas:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {taller.escenarios.map((esc, sIdx) => (
                    <div key={sIdx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>{esc.nombre}</span>
                        <span style={{ background: 'rgba(234, 88, 12, 0.15)', color: '#ea580c', padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
                          {esc.patron}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.86rem', color: '#475569' }}>
                        {esc.descripcion}
                      </p>
                      <div style={{ background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '6px', borderLeft: '3px solid #10b981', fontSize: '0.82rem', color: '#1e293b' }}>
                        <strong>💡 Justificación Técnica:</strong> {esc.justificacion}
                      </div>
                    </div>
                  ))}
                </div>

                {/* DILEMA DE DISEÑO / REGLA DE ORO */}
                {taller.dilemaDiseno && (
                  <div style={{ marginTop: '1.25rem', background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.08) 0%, rgba(234, 88, 12, 0.08) 100%)', padding: '1.1rem', borderRadius: '10px', border: '1px solid rgba(109, 40, 217, 0.2)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                      ⚡ {taller.dilemaDiseno.titulo}
                    </div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      {taller.dilemaDiseno.problema}
                    </p>
                    <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                      {taller.dilemaDiseno.solucion}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
