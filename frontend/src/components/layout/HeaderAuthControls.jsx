import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserSessionCaches } from '../../utils/campusCache.js';

/**
 * Controles de autenticación de la barra superior (Login / Registro / Cerrar sesión).
 */
export default function HeaderAuthControls({ authState, onRefreshAuth }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      clearUserSessionCaches();
      if (onRefreshAuth) await onRefreshAuth();
      navigate('/login?mode=login');
    } catch {
      clearUserSessionCaches();
      window.location.href = '/login?mode=login';
    } finally {
      setLoggingOut(false);
    }
  };

  if (authState?.authenticated) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
        {authState.user && (
          <span
            title={`Sesión iniciada como @${authState.user.username}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-title)',
              fontSize: '0.82rem',
              fontWeight: 700,
              maxWidth: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            👤 {authState.user.displayName || authState.user.username}
          </span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.45rem 0.8rem',
            borderRadius: '10px',
            border: '1px solid #fecaca',
            background: '#fef2f2',
            color: '#b91c1c',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: loggingOut ? 'wait' : 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          🚪 {loggingOut ? 'Saliendo...' : 'Cerrar sesión'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
      <Link
        to="/login?mode=login"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.45rem 0.8rem',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-card)',
          color: 'var(--text-title)',
          fontSize: '0.84rem',
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        🔑 Iniciar sesión
      </Link>
      <Link
        to="/login?mode=register"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.45rem 0.85rem',
          borderRadius: '10px',
          border: '1px solid #2563eb',
          background: '#2563eb',
          color: '#ffffff',
          fontSize: '0.84rem',
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        📝 Registrarse
      </Link>
    </div>
  );
}
