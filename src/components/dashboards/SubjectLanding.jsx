import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import SubjectRightAside from './SubjectRightAside.jsx';
import { getIocSubjectByCode } from '../../config/iocSubjects';

import imgAnna from '../../assets/img/foto-perfil-profes/Anna-bach-INT.png';
import imgEster from '../../assets/img/foto-perfil-profes/Ester-ipo2.jpg';
import imgMontse from '../../assets/img/foto-perfil-profes/ent-montse.jpg';
import imgJoseAntonio from '../../assets/img/foto-perfil-profes/jose-antonio-coord-ipo2.jpg';
import imgJosepMaria from '../../assets/img/foto-perfil-profes/josep-maria-ent.jpg';
import imgOscar from '../../assets/img/foto-perfil-profes/òscar-guzman-DIGI.jpg';

const teacherPhotos = {
  "anna": imgAnna,
  "ester": imgEster,
  "montse": imgMontse,
  "jose_antonio": imgJoseAntonio,
  "josep_maria": imgJosepMaria,
  "oscar": imgOscar
};

export default function SubjectLanding({ dataSource, subjectConfig }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(null); // id de la eac subiéndose
  const [activeEacId, setActiveEacId] = useState('');
  const [activeBloque, setActiveBloque] = useState('bloque1');
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const navigate = useNavigate();

  const [calendarDate, setCalendarDate] = useState(() => new Date());

  const handlePrevMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const calendarInfo = React.useMemo(() => {
    const today = new Date();
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const currentDay = isCurrentMonth ? today.getDate() : null;
    const monthLong = calendarDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    return { year, month, currentDay, monthLong, daysInMonth, startOffset };
  }, [calendarDate]);

  const todayInfo = React.useMemo(() => {
    const today = new Date();
    return { day: today.getDate() };
  }, []);

  useEffect(() => {
    if (data && data.eacs) {
      const now = new Date();
      let current = data.eacs.find(e => e.dueDate && new Date(e.dueDate) >= now);
      if (!current) current = data.eacs[data.eacs.length - 1];
      if (current) setActiveEacId(current.id);
    }
    if (data && data.blocks && data.blocks.length > 0) {
      setActiveBloque(data.blocks[0].id);
    }
  }, [data]);

  const fetchSubjectData = React.useCallback(() => {
    fetch(dataSource)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la info de la asignatura');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [dataSource]);

  useEffect(() => {
    setLoading(true);
    fetchSubjectData();
  }, [fetchSubjectData]);

  const handleMarkAsDone = async (eacId) => {
    try {
      const res = await fetch(API_ENDPOINTS.eacStatus, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: data.id,
          eacId: eacId,
          status: 'done'
        })
      });
      if (res.ok) {
        // Refrescar los datos para ver el cambio (y la nueva barra de progreso)
        fetchSubjectData();
      } else {
        alert('Error al marcar como entregado');
      }
    } catch(err) {
      console.error('Error al actualizar estado EAC:', err);
      alert('Error de red al conectar con el backend local.');
    }
  };

  const handleFileUpload = async (eacId, file) => {
    if (!file) return;
    setUploading(eacId);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(API_ENDPOINTS.upload(data.id), {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert(`¡Copia de seguridad guardada con éxito en la bóveda!`);
      } else {
        alert('Error al subir el archivo');
      }
    } catch(err) {
      console.error('Error al subir copia de seguridad EAC:', err);
      alert('Error de conexión con la base de datos local');
    } finally {
      setUploading(null);
    }
  };

  const resolvedSubjectConfig = React.useMemo(() => {
    if (subjectConfig) return subjectConfig;
    if (data?.id) return getIocSubjectByCode(data.id);
    return null;
  }, [subjectConfig, data]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando asignatura...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="app-container" style={{ '--subject-color': data.themeColor }}>
      {/* Panel lateral derecho con pestañas deslizantes (Lecciones, EACs, DevKit, Git) */}
      {resolvedSubjectConfig && (
        <SubjectRightAside
          subjectConfig={resolvedSubjectConfig}
          gestionData={data}
          themeColor={data.themeColor}
          topOffset="76px"
        />
      )}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-title { display: none !important; }
          .tablet-title { display: inline !important; }
          .header-container { flex-wrap: nowrap !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .cards-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .cards-grid {
            grid-template-columns: 1fr !important;
          }
          .header-container { 
            flex-direction: column !important; 
            align-items: flex-start !important;
            text-align: left !important;
          }
          .header-left-side {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: 100% !important;
          }
          .title-row {
            flex-direction: row !important;
            gap: 1rem !important;
            align-items: center !important;
          }
          .title-icon {
            width: 40px !important;
            height: 40px !important;
            min-width: 40px !important;
            font-size: 1.5rem !important;
          }
          .controls-row {
            justify-content: space-between !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
            gap: 0.5rem !important;
          }
          .progress-col {
            flex: 1;
            margin: 0 0.5rem;
            max-width: 250px;
          }
          .action-buttons-group {
            justify-content: center !important;
            flex-wrap: nowrap !important;
            width: 100%;
            margin-top: 1rem;
            gap: 0.5rem !important;
          }
          .header-btn {
            padding: 0.5rem 0.5rem !important;
            font-size: 0.85rem !important;
            min-height: 40px !important;
            height: 40px !important;
          }
          .activities-section:not(.has-active) { display: none !important; }
          .activities-section.has-active article:not(.is-active) { display: none !important; }
          
          .desktop-calendar:not(.modal-active) { display: none !important; }
          
          .desktop-calendar.modal-active {
            display: flex !important;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            width: 90%;
            max-width: 350px;
          }
          .calendar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
          }
        }
        @media (min-width: 768px) {
          .mobile-calendar-btn { display: none !important; }
          .calendar-overlay { display: none !important; }
          .calendar-close-btn { display: none !important; }
        }
      `}</style>
      <main className="content-main" style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        
        {showMobileCalendar && <div className="calendar-overlay" onClick={() => setShowMobileCalendar(false)}></div>}
        
        {/* HERO BANNER */}
        <header className="header-container" style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* LEFT SIDE: Title & Controls */}
          <div className="header-left-side" style={{ flex: '1', minWidth: '300px' }}>
            
            {/* Title Row */}
            <div className="title-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="title-icon" style={{ fontSize: '3rem', background: 'var(--subject-color)', width: '80px', height: '80px', minWidth: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                {data.icon}
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '2.8rem', color: 'var(--text-title)', fontWeight: '800' }}>
                  <span className="desktop-title">{data.title}</span>
                  <span className="tablet-title" style={{ display: 'none' }}>{data.title.split(' ')[0]}</span>
                </h1>
                <p style={{ margin: '0.4rem 0 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                  Campus Oficial IOC · Módulo Profesional
                </p>
              </div>
            </div>

            {/* Controls Row */}
            <div className="controls-row" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              
              {data.teachers && data.teachers.length > 0 && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {data.teachers.map((teacher, idx) => (
                    <a 
                      key={idx}
                      href={teacher.mailLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={`Enviar mensaje a ${teacher.name}`}
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        textDecoration: 'none'
                      }}
                    >
                      <img 
                        src={teacherPhotos[teacher.photoKey]} 
                        alt={`Profesor/a ${teacher.name}`} 
                        style={{ 
                          width: '45px', 
                          height: '45px', 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '2px solid var(--subject-color)',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }} 
                      />
                      <span style={{ 
                        marginTop: '0.4rem', 
                        fontSize: '0.8rem', 
                        color: 'var(--text-main)', 
                        fontWeight: 'bold',
                        background: 'var(--bg-card)',
                        padding: '2px 8px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        {teacher.name}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              <div className="progress-col" style={{ flex: 1, minWidth: '0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  Progreso General
                </div>
                <div style={{ background: 'rgba(0,0,0,0.15)', height: '10px', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${data.progress}%`, background: 'var(--subject-color)', height: '100%', borderRadius: '10px', transition: 'width 1s ease-out' }}></div>
                </div>
                <div style={{ marginTop: '0.4rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--subject-color)', textAlign: 'center' }}>
                  {data.progress}%
                </div>
              </div>

              {/* MOBILE CALENDAR BUTTON */}
              <button 
                className="mobile-calendar-btn"
                onClick={() => setShowMobileCalendar(true)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '0 0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '45px',
                  fontSize: '1.1rem'
                }}
              >
                📅 {todayInfo.day}
              </button>
            </div>

            {/* Action Buttons Group */}
            <div className="action-buttons-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'nowrap', marginTop: '1rem' }}>
              <Link 
                  to={data.theoryRoute ? `${data.theoryRoute}#${activeBloque}` : `/ioc/${data.id}/lecciones-${data.id}/#${activeBloque}`} 
                  className="header-btn"
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'var(--subject-color)',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  📖 Libro
                </Link>

                {/* DROPDOWN ACTIVIDADES */}
                <select 
                  className="header-btn"
                  value={activeEacId} 
                  onChange={(e) => {
                    setActiveEacId(e.target.value);
                  }}
                  style={{
                    flex: 1,
                    background: '#e0e7ff',
                    border: 'none',
                    color: '#1e3a8a',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    outline: 'none',
                    textAlign: 'center',
                    textAlignLast: 'center',
                    minWidth: '0',
                    height: '100%',
                    minHeight: '40px'
                  }}
                >
                  <option value="" disabled>ACTIVIDADES</option>
                  {data.eacs.map(eac => (
                    <option key={eac.id} value={eac.id}>{eac.title.split(':')[0]}</option>
                  ))}
                </select>

                {/* DROPDOWN BLOQUES */}
                <select
                  className="header-btn"
                  value={activeBloque}
                  onChange={(e) => {
                    setActiveBloque(e.target.value);
                    const baseRoute = data.theoryRoute || `/ioc/${data.id}/lecciones-${data.id}/`;
                    navigate(`${baseRoute}#${e.target.value}`);
                  }}
                  style={{
                    flex: 1,
                    background: '#e0e7ff',
                    color: '#1e3a8a',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    outline: 'none',
                    textAlign: 'center',
                    textAlignLast: 'center',
                    minWidth: '0',
                    height: '100%',
                    minHeight: '40px',
                    borderRadius: '6px'
                  }}
                >
                  {(data.blocks || [
                    { id: 'bloque1', label: 'BLOQUE 1' },
                    { id: 'bloque2', label: 'BLOQUE 2' },
                    { id: 'bloque3', label: 'BLOQUE 3' }
                  ]).map(b => (
                    <option key={b.id} value={b.id}>{b.label}</option>
                  ))}
                </select>
              </div>

          </div>

          {/* RIGHT SIDE: MINI CALENDARIO MENSUAL DE LA ASIGNATURA (DIMENSIONES FIJAS CONSTANTES) */}
          <div className={`desktop-calendar ${showMobileCalendar ? 'modal-active' : ''}`} style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '12px',
            padding: '1rem', 
            width: '280px',
            minWidth: '280px',
            maxWidth: '280px',
            minHeight: '375px',
            boxSizing: 'border-box',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.6rem'
          }}>
            {showMobileCalendar && (
              <button 
                className="calendar-close-btn"
                onClick={() => setShowMobileCalendar(false)} 
                style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'white', border: '1px solid #ccc', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                ✖
              </button>
            )}
            {/* Cabecera interactiva con navegación de mes (flechas triángulo) */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '0.65rem',
              padding: '0 0.2rem'
            }}>
              <button
                type="button"
                onClick={handlePrevMonth}
                title="Mes anterior"
                aria-label="Mes anterior"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--subject-color)',
                  fontSize: '0.85rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s ease, transform 0.15s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                ◀
              </button>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', textAlign: 'center' }}>
                📅 {calendarInfo.monthLong}
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                title="Mes siguiente"
                aria-label="Mes siguiente"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--subject-color)',
                  fontSize: '0.85rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s ease, transform 0.15s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                ▶
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
              {['L','M','X','J','V','S','D'].map(d => (
                <div key={d} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{d}</div>
              ))}
              {(() => {
                const { year, month, startOffset, daysInMonth, currentDay } = calendarInfo;

                // Map of events by day number
                const dayEventsMap = {};

                // 1. Check data.events array
                if (Array.isArray(data.events)) {
                  data.events.forEach(evt => {
                    if (!evt.date) return;
                    const parts = evt.date.split('-').map(Number);
                    if (parts.length === 3 && parts[0] === year && (parts[1] - 1) === month) {
                      const dayNum = parts[2];
                      dayEventsMap[dayNum] = dayEventsMap[dayNum] || [];
                      dayEventsMap[dayNum].push(evt);
                    }
                  });
                }

                // 2. Check data.eacs for any unmapped dueDates or publishDates
                if (Array.isArray(data.eacs)) {
                  data.eacs.forEach(eac => {
                    if (eac.dueDate) {
                      const parts = eac.dueDate.split('-').map(Number);
                      if (parts.length === 3 && parts[0] === year && (parts[1] - 1) === month) {
                        const dayNum = parts[2];
                        dayEventsMap[dayNum] = dayEventsMap[dayNum] || [];
                        if (!dayEventsMap[dayNum].some(e => e.type === 'entrega')) {
                          dayEventsMap[dayNum].push({ type: 'entrega', title: eac.title, time: '23:55' });
                        }
                      }
                    }
                    if (eac.publishDate) {
                      const parts = eac.publishDate.split('-').map(Number);
                      if (parts.length === 3 && parts[0] === year && (parts[1] - 1) === month) {
                        const dayNum = parts[2];
                        dayEventsMap[dayNum] = dayEventsMap[dayNum] || [];
                        if (!dayEventsMap[dayNum].some(e => e.type === 'inicio_eac')) {
                          dayEventsMap[dayNum].push({ type: 'inicio_eac', title: `Enunciado: ${eac.title}`, time: '00:00' });
                        }
                      }
                    }
                  });
                }

                const cells = [];
                for (let i = 0; i < startOffset; i++) {
                  cells.push(<div key={`empty-${i}`} style={{ padding: '0.3rem' }}></div>);
                }

                for (let day = 1; day <= daysInMonth; day++) {
                  const isToday = day === currentDay;
                  const dayEvents = dayEventsMap[day] || [];
                  const hasEntrega = dayEvents.some(e => e.type === 'entrega');
                  const hasInicio = dayEvents.some(e => e.type === 'inicio_eac');
                  const hasLeccion = dayEvents.some(e => e.type === 'leccion');
                  const hasNotas = dayEvents.some(e => e.type === 'notas');

                  // Formatear tooltip descriptivo
                  let tooltip = undefined;
                  if (dayEvents.length > 0) {
                    tooltip = dayEvents.map(e => {
                      const icon = e.type === 'entrega' ? '🚨 Entrega' :
                                   e.type === 'inicio_eac' ? '🚀 Inicio Tarea' :
                                   e.type === 'leccion' ? '📖 Apertura Lección' :
                                   e.type === 'notas' ? '📊 Notas' : '📌';
                      return `${icon}: ${e.title} (${e.time || ''})`.trim();
                    }).join('\n');
                  } else if (isToday) {
                    tooltip = 'Hoy';
                  }

                  // Determinación de estilos visuales diferenciados (100% con el color de la asignatura)
                  let bg = 'transparent';
                  let textColor = 'var(--text-main)';
                  let borderStyle = '1.5px solid transparent';
                  let fontWeight = isToday ? 'bold' : 'normal';
                  let boxShadow = 'none';

                  if (hasEntrega) {
                    // 🚨 ENTREGA: Círculo relleno sólido con el color de la asignatura
                    bg = 'var(--subject-color)';
                    textColor = '#ffffff';
                    fontWeight = 'bold';
                    boxShadow = '0 2px 6px rgba(0,0,0,0.22)';
                  } else if (hasInicio && hasLeccion) {
                    // Coincidencia Inicio EAC + Lección: Doble estilo con el color de la asignatura
                    textColor = 'var(--subject-color)';
                    borderStyle = '2px dashed var(--subject-color)';
                    fontWeight = 'bold';
                  } else if (hasInicio) {
                    // 🚀 INICIO DE TAREA / ENUNCIADO: Círculo con borde continuo del color de la asignatura
                    textColor = 'var(--subject-color)';
                    borderStyle = '2px solid var(--subject-color)';
                    fontWeight = 'bold';
                  } else if (hasLeccion) {
                    // 📖 APERTURA DE LECCIÓN: Círculo con borde discontinuo del color de la asignatura
                    textColor = 'var(--subject-color)';
                    borderStyle = '2px dashed var(--subject-color)';
                    fontWeight = '600';
                  } else if (hasNotas) {
                    // 📊 PUBLICACIÓN DE NOTAS: Círculo punteado fino del color de la asignatura
                    textColor = 'var(--subject-color)';
                    borderStyle = '1.5px dotted var(--subject-color)';
                    fontWeight = '600';
                  } else if (isToday) {
                    textColor = 'var(--subject-color)';
                    borderStyle = '1px solid var(--border-subtle)';
                  }

                  cells.push(
                    <div 
                      key={day} 
                      title={tooltip} 
                      style={{ 
                        fontSize: '0.84rem',
                        fontWeight,
                        color: textColor,
                        background: bg,
                        border: borderStyle,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        aspectRatio: '1/1',
                        cursor: dayEvents.length > 0 ? 'help' : 'default',
                        boxShadow,
                        boxSizing: 'border-box',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      {day}
                    </div>
                  );
                }

                // Rellenar exactamente hasta 42 celdas (6 semanas fijas de 7 días) para que la cuadrícula mida siempre lo mismo
                while (cells.length < 42) {
                  cells.push(
                    <div 
                      key={`empty-trailing-${cells.length}`} 
                      style={{ width: '100%', aspectRatio: '1/1', visibility: 'hidden' }} 
                    />
                  );
                }

                return cells;
              })()}
            </div>

            {/* LEYENDA VISUAL DEL CALENDARIO (Respetando el color de la asignatura) */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginTop: '0.85rem', 
              paddingTop: '0.6rem', 
              borderTop: '1px solid var(--border-subtle)', 
              fontSize: '0.68rem', 
              color: 'var(--text-muted)', 
              flexWrap: 'wrap' 
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }} title="Vencimiento límite para entregar la actividad">
                <span style={{ width: '10px', height: '10px', background: 'var(--subject-color)', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ fontWeight: 600 }}>Entrega</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }} title="Publicación de enunciado o inicio de plazo para trabajar en la tarea">
                <span style={{ width: '10px', height: '10px', border: '2px solid var(--subject-color)', borderRadius: '50%', display: 'inline-block', boxSizing: 'border-box' }}></span>
                <span style={{ fontWeight: 600 }}>Inicio EAC</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }} title="Apertura de nuevos temas o apartados de contenido">
                <span style={{ width: '10px', height: '10px', border: '1.5px dashed var(--subject-color)', borderRadius: '50%', display: 'inline-block', boxSizing: 'border-box' }}></span>
                <span style={{ fontWeight: 600 }}>Lección</span>
              </span>
            </div>
          </div>
        </header>

        {/* ENTREGAS EACs */}
        <section className={`activities-section ${activeEacId ? 'has-active' : ''}`}>
          <h2 style={{ color: 'var(--text-title)', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            🎯 Actividades de Evaluación Continua (EAC / EAF)
          </h2>
          <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {data.eacs.map(eac => {
              let statusColor = 'var(--text-muted)';
              let statusText = 'Bloqueado';
              let icon = '🔒';

              if (eac.nota !== null && eac.nota !== undefined) {
                statusColor = '#8b5cf6';
                statusText = 'Evaluada';
                icon = '🎓';
              } else if (eac.status === 'done') {
                statusColor = '#10b981';
                statusText = 'Entregada';
                icon = '✅';
              } else if (eac.status === 'pending') {
                statusColor = '#f59e0b';
                statusText = 'Pendiente';
                icon = '⏳';
              }

              const formatDate = (ds) => {
                if (!ds) return '';
                const parts = ds.split('-');
                if (parts.length === 3) return `${parts[2]}/${parts[1]}`;
                return ds;
              };

              return (
                <article className={eac.id === activeEacId ? 'is-active' : ''} id={`card-${eac.id}`} key={eac.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', opacity: (eac.id !== activeEacId && activeEacId) ? 0.6 : 1, transition: 'opacity 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem', lineHeight: 1.4 }}>{eac.title.split(':')[0]}</h3>
                    <div style={{ fontSize: '1.5rem' }}>{icon}</div>
                  </div>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Estado:</span>
                      <span style={{ color: statusColor, fontWeight: 'bold' }}>{statusText}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Fecha Límite:</span>
                      <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{formatDate(eac.dueDate)}</span>
                    </div>

                    <button 
                      onClick={() => {
                        setActiveEacId(eac.id);
                        setShowTutorial(true);
                        setTimeout(() => {
                          const section = document.getElementById('paso-a-paso-section');
                          if (section) section.scrollIntoView({ behavior: 'auto' });
                        }, 50);
                      }}
                      style={{ 
                        display: 'block', 
                        width: '100%',
                        textAlign: 'center', 
                        background: 'transparent', 
                        color: 'var(--text-main)', 
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        padding: '0.6rem', 
                        borderRadius: '6px',
                        marginTop: '0.5rem', 
                        fontSize: '0.9rem' 
                      }}
                    >
                      Tutorial
                    </button>

                    {data.id === 'desp' && eac.id === 'eac1' && (
                      <Link
                        to="/ioc/desp/eac1-teleprompter"
                        style={{
                          display: 'block',
                          width: '100%',
                          boxSizing: 'border-box',
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          color: '#ffffff',
                          textDecoration: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.6rem',
                          borderRadius: '6px',
                          marginTop: '0.5rem',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          boxShadow: '0 2px 8px rgba(34, 197, 94, 0.25)'
                        }}
                      >
                        🎬 Teleprompter & Live Runner
                      </Link>
                    )}
                    
                    {eac.status === 'pending' && (
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'nowrap' }}>
                        
                        <label style={{ flex: 1, cursor: 'pointer', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.6rem', textAlign: 'center', fontSize: '0.9rem', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                          {uploading === eac.id ? 'Subiendo' : 'Subir'}
                          <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileUpload(eac.id, e.target.files[0])} disabled={uploading === eac.id} />
                        </label>

                        <button 
                          onClick={() => handleMarkAsDone(eac.id)}
                          style={{ flex: 1, background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap', textAlign: 'center' }}
                        >
                          Done
                        </button>
                      </div>
                    )}

                    {eac.nota !== null && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-subtle)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Nota obtenida:</span>
                        <span style={{ color: eac.nota >= 5 ? '#10b981' : '#f43f5e', fontWeight: 'bold', fontSize: '1.1rem' }}>{eac.nota}</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* PASO A PASO SECTION */}
        {showTutorial && (
          <section id="paso-a-paso-section" style={{ marginTop: '4rem', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--text-title)', margin: 0 }}>
                Tutorial: Paso a Paso
              </h2>
              <button 
                onClick={() => setShowTutorial(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
                title="Cerrar"
              >
                ✖
              </button>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Aquí se desglosarán los pasos a seguir para cada enunciado de actividad. Introduce un enunciado y la IA te generará los pasos.
              </p>

              {data.eacs
                .filter(eac => eac.id === activeEacId)
                .map(eac => (
                <div key={eac.id} id={eac.id} style={{ marginBottom: '3rem' }}>
                  <h3 style={{ color: 'var(--subject-color)' }}>{eac.title}</h3>
                  <div style={{ background: 'var(--bg-hover)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--subject-color)' }}>
                    <em>Esperando enunciados para generar el paso a paso...</em>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
