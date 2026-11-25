import React from 'react';
import ChangePasswordCard from './ChangePasswordCard.jsx';
import AdminUsersCard from './AdminUsersCard.jsx';

/**
 * Pestaña "Usuario y Acceso" de Configuración.
 */
function SettingsUserTab({
  form,
  updateField,
  saveConfig,
  saving,
  cardStyle,
  inputStyle,
  labelStyle,
  btnPrimaryStyle,
  btnSecondaryStyle
}) {
  return (
    <>
      <section style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>👤 Usuario y Acceso al Campus</h2>
        <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
          Personaliza tu perfil de MiCampus y activa opcionalmente usuario y contraseña si lo subes a internet.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.1rem' }}>
          <div>
            <label htmlFor="userName" style={labelStyle}>Tu nombre</label>
            <input id="userName" type="text" value={form.userName} onChange={(e) => updateField('userName', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="campusTitle" style={labelStyle}>Título del campus</label>
            <input id="campusTitle" type="text" value={form.campusTitle} onChange={(e) => updateField('campusTitle', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="subtitle" style={labelStyle}>Subtítulo / objetivo</label>
            <input id="subtitle" type="text" value={form.subtitle} onChange={(e) => updateField('subtitle', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="contactEmail" style={labelStyle}>Email de contacto (para newsletter y avisos)</label>
            <input id="contactEmail" type="email" placeholder="tu@email.com" value={form.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.45rem' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.newsletterEnabled} onChange={(e) => updateField('newsletterEnabled', e.target.checked)} />
              ✉️ Suscribirme al resumen / newsletter de MiCampus
            </label>
          </div>
        </div>

        <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', marginBottom: '0.75rem' }}>
            <input type="checkbox" checked={form.authEnabled} onChange={(e) => updateField('authEnabled', e.target.checked)} />
            🔒 Proteger MiCampus con usuario y contraseña (recomendado al subirlo a la web)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.85rem' }}>
            <div>
              <label htmlFor="authUsername" style={labelStyle}>Usuario de acceso</label>
              <input id="authUsername" type="text" placeholder="ej. blanca" value={form.authUsername} onChange={(e) => updateField('authUsername', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="authPassword" style={labelStyle}>Contraseña (deja vacío para mantener la actual)</label>
              <input id="authPassword" type="password" placeholder="••••••••" value={form.authPassword} onChange={(e) => updateField('authPassword', e.target.value)} style={inputStyle} />
            </div>
          </div>
          {form.authEnabled && !form.authUsername.trim() && (
            <div style={{ marginTop: '0.7rem', padding: '0.55rem 0.75rem', borderRadius: '8px', background: '#fef3c7', color: '#92400e', fontSize: '0.82rem', fontWeight: 600 }}>
              ⚠️ Indica un usuario de acceso (y una contraseña si aún no la has guardado) para que el login quede activo.
            </div>
          )}
          <p style={{ margin: '0.65rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', lineHeight: 1.45 }}>
            Cuando está activo o hay cuentas registradas, toda la web y la API (salvo <code>/api/health</code> y <code>/api/auth/*</code>) solicitan inicio de sesión mediante formulario web (<code>/login</code>) o HTTP Basic.
          </p>
          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            <a href="/login" style={{ ...btnSecondaryStyle, textDecoration: 'none', fontSize: '0.82rem' }}>
              🔑 Abrir pantalla de Registro / Login
            </a>
            <button
              type="button"
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/login';
              }}
              style={{ ...btnSecondaryStyle, fontSize: '0.82rem' }}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        </div>

        <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
          {saving ? 'Guardando...' : '💾 Guardar usuario y acceso'}
        </button>
      </section>
      <ChangePasswordCard
        cardStyle={cardStyle}
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        btnPrimaryStyle={btnPrimaryStyle}
      />
      <AdminUsersCard
        cardStyle={cardStyle}
        btnSecondaryStyle={btnSecondaryStyle}
      />
    </>
  );
}

export default React.memo(SettingsUserTab);
