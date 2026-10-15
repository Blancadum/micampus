import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iocIcon from '../../assets/img/icons/ioc.png';
import accentureIcon from '../../assets/img/icons/accenture.png';
import sqlIcon from '../../assets/img/icons/sql.png';
import aiIcon from '../../assets/img/icons/ai.png';
import ibmIcon from '../../assets/img/icons/ibm.avif';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header() {
  const [timeString, setTimeString] = useState('Cargando hora...');
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="main-header">
      <style>{`
        @media (max-width: 767px) {
          .nav-text { display: none !important; }
          .header-campus-nav { 
            justify-content: center !important; 
            gap: 0.5rem !important; 
            width: 100% !important; 
            margin-top: 0.5rem;
            order: 3;
          }
          .header-search-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0.5rem 0 !important;
            order: 2;
          }
          .theme-btn { 
            padding: 0.4rem !important; 
            min-width: 38px !important; 
            height: 38px !important; 
            justify-content: center !important; 
            border-radius: 12px !important;
          }
          .main-header {
            position: relative;
          }
          .header-clock-pill { 
            position: absolute !important;
            top: 1.5rem !important;
            right: 1.5rem !important;
            font-size: 1.1rem !important; 
            padding: 0.3rem 0.8rem !important; 
            margin-right: 0 !important;
          }
          .brand-heading {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
      <div style={{ width: '100%', padding: '0 1rem' }}>
        <div className="header-inner" style={{ maxWidth: '100%' }}>
          <div className="brand-section">
            {location.pathname === '/' ? (
              <div className="brand-logo-icon">🎯</div>
            ) : (
              <Link to="/" className="brand-logo-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
                🎯
              </Link>
            )}
            <div className="brand-titles">
              <h1 className="brand-heading">
                Campus 
                <a 
                  href="/data/calendars/exports/calendario_miCampus.ics" 
                  download="calendario_miCampus.ics" 
                  className="btn-sync-pill" 
                  title="Descargar e importar calendario unificado (.ics)"
                >
                  📅 Sincroniza
                </a>
              </h1>
            </div>
          </div>

          {/* Barra de Búsqueda Integrada en la Cabecera */}
          <HeaderSearchBar />

          {/* Barra Unificada de Campus Global */}
          <nav className="header-campus-nav" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'nowrap' }}>
            <div className="header-clock-pill" style={{ 
              background: 'rgba(139, 92, 246, 0.1)', 
              border: '1px solid rgba(139, 92, 246, 0.3)', 
              padding: '0.2rem 0.6rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: 'var(--accent-purple)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.3rem',
              marginRight: '0.5rem'
            }}>
              🕒 <span>{timeString}</span>
            </div>
            
            <a 
              href="https://ioc.xtec.cat/campus/my/" 
              target="_blank" rel="noopener noreferrer"
              className="theme-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontWeight: 600 }} 
              title="Ir al Campus Oficial IOC"
            >
              <img src={iocIcon} alt="IOC" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              <span className="nav-text">IOC</span>
            </a>
            
            <Link 
              to="/accenture" 
              className="theme-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontWeight: 600 }} 
              title="Ir al Dashboard de Accenture"
            >
              <img src={accentureIcon} alt="Accenture" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              <span className="nav-text">Accenture</span>
            </Link>
            
            <a 
              href="https://campus.cursosocupados.es/login/login-access/" 
              target="_blank" rel="noopener noreferrer"
              className="theme-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontWeight: 600 }} 
              title="Ir al Campus SEPE (PHP)"
            >
              <img src={sqlIcon} alt="PHP" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              <span className="nav-text">PHP</span>
            </a>
            
            <a 
              href="https://www.miaulaonline.net/login/index.php" 
              target="_blank" rel="noopener noreferrer"
              className="theme-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontWeight: 600 }} 
              title="Ir al Campus Machine Learning"
            >
              <img src={aiIcon} alt="ML" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              <span className="nav-text">ML</span>
            </a>
            
            <a 
              href="https://www.coursera.org/specializations/ibm-generative-ai-engineering" 
              target="_blank" rel="noopener noreferrer"
              className="theme-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontWeight: 600 }} 
              title="Ir a Coursera IBM GenAI"
            >
              <img src={ibmIcon} alt="IBM" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
              <span className="nav-text">IBM</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
