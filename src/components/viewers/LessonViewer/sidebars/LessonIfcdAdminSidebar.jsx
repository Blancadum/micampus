import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * @component   LessonIfcdAdminSidebar
 * @description Panel lateral derecho con la Información Administrativa oficial
 *              de la especialidad IFCD0177 (Enclave Formación / SEPE):
 *              - Ficha Técnica y Enlace al Campus Virtual
 *              - Tutoría y Contacto (Javier García Lobo)
 *              - Sistema de Evaluación y Criterios de Aprobación
 *              - Cronograma Oficial con salto a la teoría de cada módulo
 *              - Descargas oficiales (PDF Guía Didáctica y Glosario)
 * ============================================================================
 */
export default function LessonIfcdAdminSidebar({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  onSelectSection,
  topOffset = '24px'
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cronograma'); // 'ficha' | 'tutoria' | 'evaluacion' | 'cronograma' | 'documentos'
  const [adminData, setAdminData] = useState(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  useEffect(() => {
    fetch('/data/extra/ifcd0177_gestion.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos administrativos');
        return res.json();
      })
      .then(data => setAdminData(data))
      .catch(err => console.error('Error cargando ifcd0177_gestion.json:', err));
  }, []);

  if (!adminData) return null;

  const { curso, tutor, evaluacion, cronograma, documentos } = adminData;

  return (
    <aside
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '390px',
        maxWidth: '90vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 25px rgba(0,0,0,0.22)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: 960,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Botón Pestaña Externa Flotante */}
      <button
        type="button"
        onClick={toggle}
        title={isOpen ? 'Cerrar información administrativa' : 'Abrir Guía Didáctica y Gestión Oficial'}
        style={{
          position: 'absolute',
          top: topOffset,
          left: '-48px',
          width: '48px',
          height: '46px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRight: 'none',
          borderRadius: '10px 0 0 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          boxShadow: '-4px 2px 10px rgba(0,0,0,0.12)',
          color: '#ea580c',
          zIndex: 10
        }}
      >
        🏛️
      </button>

      {/* Cabecera del Panel */}
      <div style={{
        padding: '1.1rem 1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🏛️</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)' }}>
              Gestión & Guía Didáctica
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600 }}>
              SEPE · IFCD0177 (100h)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: '0.2rem'
          }}
          title="Cerrar panel"
        >
          ✕
        </button>
      </div>

      {/* Sub-pestañas de navegación */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        padding: '0.6rem 0.8rem',
        background: 'var(--bg-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'cronograma', label: '🗓️ Cronograma' },
          { id: 'evaluacion', label: '📊 Evaluación' },
          { id: 'tutoria', label: '👨‍🏫 Tutoría' },
          { id: 'ficha', label: '🏛️ Ficha' },
          { id: 'documentos', label: '📥 Docs' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: '1 0 auto',
              padding: '0.35rem 0.6rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
              color: activeTab === tab.id ? '#ea580c' : 'var(--text-muted)',
              boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cuerpo Desplazable del Panel */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* PESTAÑA: CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.65rem 0.8rem', background: 'rgba(234, 88, 12, 0.08)', borderRadius: '8px', borderLeft: '3px solid #ea580c', fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
              <strong>Ritmo Sugerido:</strong> 2 horas diarias de estudio. Pulsa en cualquier módulo para saltar a sus lecciones teóricas.
            </div>

            {cronograma.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>
                    {item.modulo}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {item.fechas}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  {item.titulo}
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                  {item.hitos}
                </div>

                {item.targetSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectSection) onSelectSection(item.targetSlug);
                      toggle();
                    }}
                    style={{
                      marginTop: '0.35rem',
                      alignSelf: 'flex-start',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '5px',
                      background: 'rgba(234, 88, 12, 0.12)',
                      border: '1px solid rgba(234, 88, 12, 0.3)',
                      color: '#ea580c',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    📖 Ver temas del módulo ➔
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA: EVALUACIÓN */}
        {activeTab === 'evaluacion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-title)' }}>
                🏆 Criterios para Obtener el Diploma
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {evaluacion.criteriosSuperacion.map((c, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem' }}>{c}</li>
                ))}
              </ul>
            </div>

            <h4 style={{ margin: '0', fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
              Ponderación de Instrumentos
            </h4>

            {evaluacion.instrumentos.map((inst, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    {inst.nombre}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {inst.descripcion}
                  </div>
                </div>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: inst.peso.includes('70%') ? 'rgba(234, 88, 12, 0.2)' : 'rgba(0,0,0,0.06)',
                  color: inst.peso.includes('70%') ? '#ea580c' : 'var(--text-main)',
                  whiteSpace: 'nowrap'
                }}>
                  {inst.peso}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA: TUTORÍA */}
        {activeTab === 'tutoria' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{
              padding: '1rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.12) 0%, rgba(249, 115, 22, 0.05) 100%)',
              border: '1px solid rgba(234, 88, 12, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                JG
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  {tutor.nombre}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600 }}>
                  Tutor Oficial de la Especialidad
                </div>
              </div>
            </div>

            <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem' }}>
              <div><strong>⏰ Horario Tutoría:</strong> {tutor.horario}</div>
              <div><strong>⏳ Plazo de Respuesta:</strong> {tutor.plazoRespuesta}</div>
              <div><strong>🚫 Días no lectivos:</strong> {tutor.diasNoLectivos}</div>
              <div><strong>📞 Teléfono Gratuito:</strong> <a href={`tel:${tutor.telefonoSoporte.replace(/\s+/g, '')}`} style={{ color: '#ea580c', fontWeight: 700 }}>{tutor.telefonoSoporte}</a> ({tutor.horarioTelefono})</div>
              <div><strong>📧 Soporte Técnico:</strong> <a href={`mailto:${tutor.emailSoporte}`} style={{ color: '#ea580c' }}>{tutor.emailSoporte}</a></div>
            </div>
          </div>
        )}

        {/* PESTAÑA: FICHA TÉCNICA */}
        {activeTab === 'ficha' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.78rem' }}>
              <div><strong>📜 Código SEPE:</strong> {curso.codigo} ({curso.numeroExpediente})</div>
              <div><strong>🏫 Centro:</strong> {curso.centro} (CIF: {curso.cif})</div>
              <div><strong>📍 Sede:</strong> {curso.sedePrincipal}</div>
              <div><strong>⏱️ Duración:</strong> {curso.duracionHoras} horas</div>
              <div><strong>🗓️ Periodo:</strong> {curso.fechaInicio} al {curso.fechaFin}</div>
              <div><strong>🎓 Modalidad:</strong> {curso.modalidad}</div>
            </div>

            <a
              href={curso.campusVirtualUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ea580c, #f97316)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.82rem'
              }}
            >
              <span>Acceder al Campus de Enclave</span> ➔
            </a>
          </div>
        )}

        {/* PESTAÑA: DOCUMENTOS */}
        {activeTab === 'documentos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Documentación oficial del curso guardada en <code>/documents/ifcd0177-java/</code>:
            </div>

            {documentos.map((doc, idx) => (
              <a
                key={idx}
                href={doc.archivo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  color: 'var(--text-title)',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{doc.icono}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{doc.nombre}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tamaño: {doc.tamano}</div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 800 }}>⬇️</span>
              </a>
            ))}
          </div>
        )}

      </div>
    </aside>
  );
}
