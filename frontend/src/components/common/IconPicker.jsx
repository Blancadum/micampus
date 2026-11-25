import React, { useState } from 'react';

const PRESET_EMOJIS = [
  '📚', '📘', '📙', '💻', '🌐', '🗄️', '🎨', '📐',
  '🧪', '📊', '🗣️', '🚀', '🎯', '🧠', '⚙️', '☕',
  '🐍', '📝', '🎓', '📅', '✨', '🔬', '⚖️', '💼'
];

export function isImageIcon(icon) {
  if (!icon || typeof icon !== 'string') return false;
  const trimmed = icon.trim();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:image/')
  );
}

export function SubjectIcon({ icon, size = 24, fallback = '📚' }) {
  const val = icon || fallback;
  if (isImageIcon(val)) {
    return (
      <img
        src={val}
        alt=""
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          borderRadius: '6px',
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
      />
    );
  }
  return <span style={{ fontSize: `${size}px`, lineHeight: 1, display: 'inline-block' }}>{val}</span>;
}

export default function IconPicker({ value, onChange, subjectId }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('emoji'); // 'emoji' | 'flaticon'
  const [uploading, setUploading] = useState(false);

  const handleUploadIcon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (subjectId) {
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'otros');
        const res = await fetch(`/api/uploads/${subjectId}`, { method: 'POST', body: fd });
        if (res.ok) {
          const uploaded = await res.json();
          onChange(`/api/uploads/${subjectId}/${uploaded.storedName}?inline=true`);
          setOpen(false);
        }
      } finally {
        setUploading(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
          setOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Elegir emoji o icono de Flaticon"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.45rem 0.7rem',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-subtle)',
          color: 'var(--text-title)',
          cursor: 'pointer',
          minWidth: '72px',
          justifyContent: 'center'
        }}
      >
        <SubjectIcon icon={value} size={20} />
        <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>▼</span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '280px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '0.75rem',
            boxShadow: '0 12px 28px rgba(0,0,0,0.16)',
            zIndex: 2500,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}
        >
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              type="button"
              onClick={() => setTab('emoji')}
              style={{
                flex: 1, padding: '0.35rem', borderRadius: '8px', border: 'none',
                background: tab === 'emoji' ? '#3b82f6' : 'var(--bg-subtle)',
                color: tab === 'emoji' ? '#fff' : 'var(--text-title)',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}
            >
              😀 Emojis
            </button>
            <button
              type="button"
              onClick={() => setTab('flaticon')}
              style={{
                flex: 1, padding: '0.35rem', borderRadius: '8px', border: 'none',
                background: tab === 'flaticon' ? '#3b82f6' : 'var(--bg-subtle)',
                color: tab === 'flaticon' ? '#fff' : 'var(--text-title)',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer'
              }}
            >
              🎨 Flaticon / PNG
            </button>
          </div>

          {tab === 'emoji' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.3rem' }}>
              {PRESET_EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => { onChange(em); setOpen(false); }}
                  style={{
                    padding: '0.35rem', borderRadius: '8px', border: value === em ? '1px solid #3b82f6' : '1px solid transparent',
                    background: value === em ? 'rgba(59,130,246,0.14)' : 'var(--bg-subtle)',
                    fontSize: '1.15rem', cursor: 'pointer'
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
              <a
                href="https://www.flaticon.com/free-icons/education"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}
              >
                🔍 Buscar iconos gratis en Flaticon ↗
              </a>
              <input
                placeholder="Pega URL del icono (https://cdn-icons...)"
                value={isImageIcon(value) ? value : ''}
                onChange={(e) => onChange(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.55rem',
                  borderRadius: '8px', border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem'
                }}
              />
              <label style={{
                padding: '0.45rem', borderRadius: '8px', background: 'var(--bg-subtle)',
                border: '1px dashed var(--border-subtle)', textAlign: 'center', fontWeight: 700, cursor: 'pointer'
              }}>
                {uploading ? 'Subiendo...' : '📤 Subir icono descargado (PNG / SVG)'}
                <input type="file" accept="image/png,image/svg+xml,image/webp,image/jpeg" hidden onChange={handleUploadIcon} />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
