import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function LoginPage({ hasUsers = true, allowBack = false, onSuccess }) {
  const [searchParams] = useSearchParams();
  const queryMode = searchParams.get('mode');
  const resolvedDefaultMode =
    queryMode === 'register' || queryMode === 'login'
      ? queryMode
      : (hasUsers ? 'login' : 'register');

  const [mode, setMode] = useState(resolvedDefaultMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [resetStep, setResetStep] = useState('request'); // 'request' | 'confirm'
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (queryMode === 'register' || queryMode === 'login') {
      setMode(queryMode);
      setError('');
      setInfo('');
      setResetStep('request');
    }
  }, [queryMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      if (mode === 'forgot') {
        if (resetStep === 'request') {
          const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || 'No se pudo generar el código de recuperación.');
          } else {
            setInfo(data.message || 'Código generado en la consola del servidor.');
            setResetStep('confirm');
          }
        } else {
          const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, code: resetCode, newPassword })
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || 'No se pudo restablecer la contraseña.');
          } else {
            setInfo(data.message || 'Contraseña actualizada. Ya puedes iniciar sesión.');
            setMode('login');
            setResetStep('request');
            setResetCode('');
            setNewPassword('');
            setPassword('');
          }
        }
        return;
      }

      if (mode === 'register' && password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const payload = mode === 'register'
        ? { username, password, displayName, email, rememberMe }
        : { username, password, rememberMe };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo completar la operación.');
      } else if (onSuccess) {
        await onSuccess(data.user);
      }
    } catch (err) {
      setError(`Error de conexión: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: '10px',
    border: '1px solid var(--border-subtle, #cbd5e1)',
    background: 'var(--bg-subtle, #f8fafc)',
    color: 'var(--text-title, #0f172a)',
    fontSize: '0.92rem',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'var(--bg-page, #f1f5f9)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--bg-card, #ffffff)',
        border: '1px solid var(--border-subtle, #e2e8f0)',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>🎓</div>
          <h1 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--text-title, #0f172a)' }}>
            MiCampus
          </h1>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: 'var(--text-muted, #64748b)' }}>
            {mode === 'register' ? 'Crea tu cuenta personal para acceder' : 'Inicia sesión para entrar a tu campus'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.4rem',
          padding: '0.3rem',
          background: 'var(--bg-subtle, #f1f5f9)',
          borderRadius: '12px',
          marginBottom: '1.25rem'
        }}>
          {[
            { id: 'login', label: 'Iniciar sesión' },
            { id: 'register', label: 'Registrarse' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setMode(tab.id); setError(''); }}
              style={{
                padding: '0.5rem',
                borderRadius: '9px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: mode === tab.id ? 'var(--bg-card, #ffffff)' : 'transparent',
                color: mode === tab.id ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
                boxShadow: mode === tab.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {mode === 'register' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ej. Blanca García"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Correo (opcional)
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Usuario
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              placeholder="tu_usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>

          {mode !== 'forgot' ? (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={mode === 'register' ? 4 : undefined}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: '2.7rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    style={{
                      position: 'absolute',
                      right: '0.6rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      padding: '0.2rem'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Confirmar contraseña
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={4}
                    autoComplete="new-password"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #475569)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Mantener sesión iniciada (7 días)
                </label>

                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setResetStep('request'); setError(''); setInfo(''); }}
                    style={{ border: 'none', background: 'transparent', padding: 0, color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {resetStep === 'request' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    Correo registrado (si lo indicaste al registrarte)
                  </label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Código de 6 dígitos (enviado a tu correo o consola del servidor)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123456"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Nueva contraseña
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={4}
                        autoComplete="new-password"
                        placeholder="Mínimo 4 caracteres"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ ...inputStyle, paddingRight: '2.7rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                        style={{
                          position: 'absolute',
                          right: '0.6rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          padding: '0.2rem'
                        }}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => { setResetStep('request'); setError(''); setInfo(''); }}
                      style={{ border: 'none', background: 'transparent', padding: 0, color: '#2563eb', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Reenviar o pedir nuevo código
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {info && (
            <div style={{
              padding: '0.6rem 0.85rem',
              borderRadius: '10px',
              background: '#dcfce7',
              color: '#166534',
              fontSize: '0.83rem',
              fontWeight: 600
            }}>
              ✅ {info}
            </div>
          )}

          {error && (
            <div style={{
              padding: '0.6rem 0.85rem',
              borderRadius: '10px',
              background: '#fee2e2',
              color: '#991b1b',
              fontSize: '0.83rem',
              fontWeight: 600
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            style={{
              marginTop: '0.35rem',
              padding: '0.7rem',
              borderRadius: '11px',
              border: 'none',
              background: '#16a34a',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: busy ? 'wait' : 'pointer',
              opacity: busy ? 0.7 : 1
            }}
          >
            {busy
              ? 'Procesando...'
              : mode === 'register'
                ? 'Crear cuenta y entrar'
                : mode === 'forgot'
                  ? (resetStep === 'request' ? 'Generar código de recuperación' : 'Guardar nueva contraseña')
                  : 'Entrar a MiCampus'}
          </button>

          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => { setMode('login'); setResetStep('request'); setError(''); setInfo(''); }}
              style={{ border: 'none', background: 'transparent', color: 'var(--text-muted, #64748b)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.2rem' }}
            >
              ← Volver a iniciar sesión
            </button>
          )}
        </form>

        {allowBack && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--text-muted, #64748b)',
                textDecoration: 'none'
              }}
            >
              ← Volver al campus
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
