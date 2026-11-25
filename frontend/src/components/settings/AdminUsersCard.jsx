import React, { useCallback, useEffect, useState } from 'react';

/**
 * Panel de registro de usuarios visible exclusivamente para cuentas con rol "admin".
 */
export default function AdminUsersCard({ cardStyle, btnSecondaryStyle }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) return;
      const meData = await meRes.json();
      if (!meData?.authenticated || meData?.user?.role !== 'admin') {
        setCurrentUser(null);
        return;
      }
      setCurrentUser(meData.user);

      const res = await fetch('/api/auth/users');
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo cargar el registro de usuarios.');
      } else {
        setUsers(Array.isArray(data.users) ? data.users : []);
      }
    } catch (err) {
      setError(`Error de conexión: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = async (user) => {
    if (!window.confirm(`¿Eliminar la cuenta "@${user.username}"? Esta acción no se puede deshacer.`)) return;
    setError('');
    try {
      const res = await fetch(`/api/auth/users/${encodeURIComponent(user.id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo eliminar el usuario.');
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      }
    } catch (err) {
      setError(`Error de conexión: ${err.message}`);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <section style={{ ...cardStyle, marginTop: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.08rem' }}>
            👥 Registro de Usuarios ({users.length})
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: 'var(--text-muted, #64748b)' }}>
            Cuentas registradas en este servidor (visible solo para administradores).
          </p>
        </div>
        <button type="button" onClick={loadUsers} disabled={loading} style={{ ...btnSecondaryStyle, fontSize: '0.8rem' }}>
          {loading ? '⏳ Cargando...' : '🔄 Actualizar'}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '0.75rem', padding: '0.55rem 0.75rem', borderRadius: '8px', background: '#fef2f2', color: '#b91c1c', fontSize: '0.83rem', fontWeight: 600 }}>
          ⚠️ {error}
        </div>
      )}

      {users.length === 0 ? (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted, #64748b)' }}>
          No hay cuentas registradas todavía.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle, #e2e8f0)', color: 'var(--text-muted, #64748b)' }}>
                <th style={{ padding: '0.5rem 0.6rem' }}>Usuario</th>
                <th style={{ padding: '0.5rem 0.6rem' }}>Nombre</th>
                <th style={{ padding: '0.5rem 0.6rem' }}>Correo</th>
                <th style={{ padding: '0.5rem 0.6rem' }}>Rol</th>
                <th style={{ padding: '0.5rem 0.6rem' }}>Alta</th>
                <th style={{ padding: '0.5rem 0.6rem', textAlign: 'right' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === currentUser.id;
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle, #f1f5f9)' }}>
                    <td style={{ padding: '0.55rem 0.6rem', fontWeight: 700 }}>@{u.username}</td>
                    <td style={{ padding: '0.55rem 0.6rem' }}>{u.displayName || '—'}</td>
                    <td style={{ padding: '0.55rem 0.6rem', color: 'var(--text-muted, #64748b)' }}>{u.email || '—'}</td>
                    <td style={{ padding: '0.55rem 0.6rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        background: u.role === 'admin' ? '#dbeafe' : '#f1f5f9',
                        color: u.role === 'admin' ? '#1d4ed8' : '#475569'
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', color: 'var(--text-muted, #64748b)', whiteSpace: 'nowrap' }}>
                      {u.createdAt ? u.createdAt.replace('T', ' ') : '—'}
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'right' }}>
                      {isSelf ? (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>Tu cuenta</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDelete(u)}
                          style={{
                            padding: '0.25rem 0.55rem',
                            borderRadius: '7px',
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            color: '#b91c1c',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          🗑️ Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
