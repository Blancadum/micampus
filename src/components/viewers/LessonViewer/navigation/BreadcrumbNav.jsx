import React from 'react';
import { Link } from 'react-router-dom';

export default function BreadcrumbNav({ title, items }) {
  const breadcrumbItems = items || [
    { label: 'Campus', to: '/' },
    { label: title || 'Apuntes', isCurrent: true }
  ];

  return (
    <nav 
      aria-label="Ruta de navegación"
      style={{ 
        position: 'sticky',
        top: '76px', // Altura aproximada del header principal
        zIndex: 90,
        width: '100%', 
        height: '50px', 
        background: 'var(--bg-input)', 
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 1.5rem',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        gap: '0.5rem'
      }}
    >
      {breadcrumbItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span>/</span>}
          {item.to && !item.isCurrent ? (
            <Link to={item.to} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              {item.label}
            </Link>
          ) : (
            <strong style={{ color: 'var(--text-main)' }}>{item.label}</strong>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
