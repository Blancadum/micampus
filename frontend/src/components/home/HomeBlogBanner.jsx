import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomeBlogBanner
 * Banner destacado de la página de inicio que promociona artículos clave
 * de empleabilidad, marca personal y SEO en LinkedIn / ATS para IPO2.
 */
export default function HomeBlogBanner() {
  return (
    <section className="home-blog-banner-section" style={{ marginBottom: '2.5rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)',
        border: '1px solid rgba(234, 88, 12, 0.3)',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: '0 4px 20px rgba(234, 88, 12, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 500px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ea580c, #f97316)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#fff',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)'
          }}>
            💼
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                padding: '0.15rem 0.5rem', 
                borderRadius: '999px', 
                background: 'rgba(234, 88, 12, 0.2)', 
                color: '#ea580c' 
              }}>
                NUEVO EN BLOG · IPO2
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Orientación Laboral & Marca Personal
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-title)', fontWeight: 700 }}>
              SEO en LinkedIn, Filtros de IA (ATS) y Marca Personal
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Cómo superar al "portero digital" de los algoritmos y destacar con las soft skills más demandadas según el SEPE.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Link 
            to="/blog/seo-linkedin-filtros-ia" 
            className="theme-btn" 
            style={{ 
              background: 'linear-gradient(135deg, #ea580c, #f97316)', 
              color: '#fff', 
              textDecoration: 'none', 
              padding: '0.55rem 1rem', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>📖 Leer en el Blog</span> <span>➔</span>
          </Link>
          <Link 
            to="/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats" 
            className="theme-btn" 
            style={{ 
              textDecoration: 'none', 
              padding: '0.55rem 1rem', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Temario IPO2</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
