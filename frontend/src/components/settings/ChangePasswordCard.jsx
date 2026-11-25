import React, { useState } from 'react';

/**
 * Tarjeta independiente para cambiar la contraseña de la cuenta autenticada.
 */
export default function ChangePasswordCard({ cardStyle, inputStyle, labelStyle, btnPrimaryStyle }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', text: 'La nueva contraseña y su confirmación no coinciden.' });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', text: data.error || 'No se pudo actualizar la contraseña.' });
      } else {
        setStatus({ type: 'ok', text: data.message || 'Contraseña actualizada correctamente.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setStatus({ type: 'error', text: `Error de conexión: ${err.message}` });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section style={{ ...cardStyle, marginTop: '1.25rem' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.08rem' }}>🔐 Cambiar contraseña de tu cuenta</h3>
      <p style={{ marginTop: 0, marginBottom: '0.9rem', fontSize: '0.84rem', color: 'var(--text-muted, #64748b)' }}>
        Actualiza la contraseña de la cuenta con la que has iniciado sesión.
      </p>
      <form onSubmit={handleChangePassword} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
        <div>
          <label htmlFor="currentPassword" style={labelStyle}>Contraseña actual</label>
          <input
            id="currentPassword"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="newAccountPassword" style={labelStyle}>Nueva contraseña</label>
          <input
            id="newAccountPassword"
            type="password"
            required
            minLength={4}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 4 caracteres"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="confirmAccountPassword" style={labelStyle}>Confirmar nueva contraseña</label>
          <input
            id="confirmAccountPassword"
            type="password"
            required
            minLength={4}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la contraseña"
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button type="submit" disabled={busy} style={btnPrimaryStyle}>
            {busy ? 'Actualizando...' : '🔐 Actualizar contraseña'}
          </button>
          {status.text && (
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: status.type === 'error' ? '#b91c1c' : '#15803d' }}>
              {status.type === 'error' ? '⚠️ ' : '✅ '}{status.text}
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
