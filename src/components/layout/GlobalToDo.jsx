import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalToDo() {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [removedTasks, setRemovedTasks] = useState([]);
  
  useEffect(() => {
    fetch('/data/tasks.json')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => setTasks([]));

    const saved = localStorage.getItem('micampus_removed_tasks');
    if (saved) {
      setRemovedTasks(JSON.parse(saved));
    }
  }, []);

  const removeTask = (id) => {
    const newRemoved = [...removedTasks, id];
    setRemovedTasks(newRemoved);
    localStorage.setItem('micampus_removed_tasks', JSON.stringify(newRemoved));
  };

  // Filter and compute remaining days
  const today = new Date();
  today.setHours(0,0,0,0);
  
  let validTasks = tasks.map(t => {
    const d = new Date(t.date);
    const diffTime = d - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { ...t, d, diffDays };
  })
  .filter(t => t.diffDays >= 0 && !removedTasks.includes(t.id))
  .sort((a, b) => a.d - b.d);

  // Group by month
  const grouped = validTasks.reduce((acc, t) => {
    const month = t.d.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(t);
    return acc;
  }, {});

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // No renderizar en el visor de lecciones, tutorías, actividades o cursos para evitar solapamientos con el menú lateral
  const isLessonLikeView = 
    location.pathname.includes('/tutorias') ||
    location.pathname.includes('/actividades') ||
    location.pathname.includes('/springboot') ||
    location.pathname.includes('/petete') ||
    location.pathname.includes('/lesson') ||
    location.pathname.includes('/topic');
  if (isLessonLikeView) return null;

  if (validTasks.length === 0) return null; // hide if nothing to do

  return (
    <div 
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Icon Tab (Solo este botón captura el ratón cuando está cerrado) */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        title={isOpen ? "Cerrar calendario de entregas" : "Abrir calendario de entregas"}
        style={{
          background: 'var(--bg-card)',
          padding: '0.75rem 0.65rem',
          borderRadius: '0 12px 12px 0',
          boxShadow: '2px 0 10px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          border: '1px solid var(--border-subtle)',
          borderLeft: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'auto',
          outline: 'none',
          zIndex: 10
        }}
      >
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>📅</span>
        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: 1 }}>{validTasks.length}</span>
      </button>

      {/* Expanded Menu (Se expande hacia la derecha, completamente oculto al cerrarse) */}
      <div style={{
        width: isOpen ? '330px' : '0',
        height: isOpen ? 'auto' : '0',
        maxHeight: isOpen ? '80vh' : '0',
        display: isOpen ? 'block' : 'none',
        overflow: 'hidden',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'var(--bg-card)',
        boxShadow: '4px 4px 15px rgba(0,0,0,0.15)',
        borderRadius: '0 12px 12px 0',
        border: isOpen ? '1px solid var(--border-subtle)' : 'none',
        borderLeft: 'none',
        overflowY: 'auto',
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        <div style={{ padding: '1rem', width: '330px', boxSizing: 'border-box' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>📅 Calendario de Entregas</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{validTasks.length} pendientes</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  padding: '0.1rem 0.3rem',
                  borderRadius: '4px'
                }}
                title="Cerrar panel"
              >
                ✕
              </button>
            </div>
          </h3>
          
          {Object.entries(grouped).map(([month, tasks]) => (
            <div key={month} style={{ marginBottom: '1.25rem' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                color: 'var(--text-muted)',
                marginBottom: '0.5rem'
              }}>
                {month}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {tasks.map(t => (
                  <div 
                    key={t.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(110px, 1fr) 48px 40px 35px 20px',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem 0',
                      borderBottom: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', overflow: 'hidden' }}>
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: t.color,
                        flexShrink: 0
                      }}></span>
                      <Link 
                        to={t.link} 
                        title={t.tooltip}
                        style={{ 
                          fontWeight: '600', 
                          color: 'var(--text-main)', 
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        <span style={{ fontWeight: 'bold' }}>{t.course}</span> · {t.task}
                      </Link>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '600', textAlign: 'center' }}>
                      {t.d.getDate().toString().padStart(2, '0')}/{(t.d.getMonth()+1).toString().padStart(2, '0')}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      {t.weight}
                    </div>
                    
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: t.diffDays <= 7 ? 'var(--accent-red)' : 'var(--accent-green)',
                      fontSize: '0.8rem',
                      textAlign: 'right'
                    }}>
                      {t.diffDays}d
                    </div>

                    <button 
                      onClick={() => removeTask(t.id)}
                      title="Marcar como completado"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0',
                        opacity: 0.5,
                        transition: 'opacity 0.2s',
                        fontSize: '0.8rem',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
