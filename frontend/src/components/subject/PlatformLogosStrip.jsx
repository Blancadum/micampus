import React, { useMemo } from 'react';

const PLATFORM_CATALOG = [
  {
    id: 'apache',
    name: 'Apache HTTP',
    role: 'Servidor Web',
    color: '#d22128',
    keywords: ['apache', 'apache2', 'httpd', 'virtual host', 'mod_proxy'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M19 3C13 5 8 11 5 21c2-4 5-6 8-7-1 2-2 4-2 6 3-5 6-10 8-17Z" fill="#d22128" />
        <path d="M9 14c2-3 5-6 9-9" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'proftpd',
    name: 'ProFTPD',
    role: 'FTP / FTPS',
    color: '#0ea5e9',
    keywords: ['proftpd', 'ftps', 'ftp'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M7 10h10M7 14h6" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="14" r="1.5" fill="#22c55e" />
      </svg>
    )
  },
  {
    id: 'openssl',
    name: 'OpenSSL',
    role: 'SSL / TLS',
    color: '#16a34a',
    keywords: ['openssl', 'ssl', 'tls', 'https', 'x.509'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="5" y="11" width="14" height="9" rx="2" stroke="#16a34a" strokeWidth="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="15.5" r="1.4" fill="#16a34a" />
      </svg>
    )
  },
  {
    id: 'linux',
    name: 'Ubuntu / Linux',
    role: 'Sistema Base',
    color: '#e95420',
    keywords: ['linux', 'ubuntu', 'systemd', 'apt'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="7" stroke="#e95420" strokeWidth="2" />
        <circle cx="12" cy="4.5" r="2" fill="#e95420" />
        <circle cx="5.5" cy="16" r="2" fill="#e95420" />
        <circle cx="18.5" cy="16" r="2" fill="#e95420" />
      </svg>
    )
  },
  {
    id: 'mariadb',
    name: 'MariaDB / MySQL',
    role: 'Base de Datos',
    color: '#00758f',
    keywords: ['mariadb', 'mysql', 'phpmyadmin', 'sql'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <ellipse cx="12" cy="6.5" rx="7" ry="2.8" stroke="#00758f" strokeWidth="2" />
        <path d="M5 6.5v11c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-11" stroke="#00758f" strokeWidth="2" />
        <path d="M5 12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8" stroke="#00758f" strokeWidth="1.6" />
      </svg>
    )
  },
  {
    id: 'php',
    name: 'PHP',
    role: 'Backend Dinámico',
    color: '#777bb4',
    keywords: ['php', 'lamp', 'phpmyadmin'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <ellipse cx="12" cy="12" rx="9.5" ry="6" fill="#777bb4" />
        <text x="12" y="14.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">
          PHP
        </text>
      </svg>
    )
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    role: 'CMS Web',
    color: '#21759b',
    keywords: ['wordpress', 'cms'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#21759b" strokeWidth="2" />
        <path d="M6.8 9l3.2 8.5L12 11.5l2 6L17.2 9" stroke="#21759b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'tomcat',
    name: 'Apache Tomcat',
    role: 'Servlets / JSP',
    color: '#d97706',
    keywords: ['tomcat', 'servlet', 'jsp', '.war', 'ajp'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M5 9l2-5 3.5 3h3L17 4l2 5v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9Z" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="9.5" cy="12.5" r="1.2" fill="#d97706" />
        <circle cx="14.5" cy="12.5" r="1.2" fill="#d97706" />
      </svg>
    )
  },
  {
    id: 'wildfly',
    name: 'WildFly / JBoss',
    role: 'Java EE',
    color: '#dc2626',
    keywords: ['wildfly', 'jboss'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M4 17L8.5 7l3.5 6 3.5-6L20 17H4Z" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'docker',
    name: 'Docker',
    role: 'Contenedores',
    color: '#2496ed',
    keywords: ['docker', 'dockerfile', 'compose', 'contenedor'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M3 13h15.5c1.5 0 2.5-1 2.5-2-.8-.3-1.6-.2-2.2.2-.3-1-.9-1.7-1.8-2.1-.4 1-.3 2 .2 2.9H3Z" stroke="#2496ed" strokeWidth="1.7" strokeLinejoin="round" />
        <rect x="5" y="9" width="3" height="2.5" fill="#2496ed" />
        <rect x="9" y="9" width="3" height="2.5" fill="#2496ed" />
        <rect x="13" y="9" width="3" height="2.5" fill="#2496ed" />
        <rect x="9" y="5.8" width="3" height="2.5" fill="#2496ed" />
        <path d="M4 13.5c.5 3.2 3.2 5.5 7.5 5.5 4.8 0 8-2.6 8.8-6" stroke="#2496ed" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'vagrant',
    name: 'Vagrant',
    role: 'VMs Reproducibles',
    color: '#1563ff',
    keywords: ['vagrant', 'vagrantfile'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M5 5l7 14L19 5h-3l-4 8-4-8H5Z" fill="#1563ff" />
      </svg>
    )
  },
  {
    id: 'openldap',
    name: 'OpenLDAP',
    role: 'Directorio LDAP',
    color: '#16a34a',
    keywords: ['ldap', 'openldap', 'ldif', 'phpldapadmin'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="6" r="2.5" stroke="#16a34a" strokeWidth="1.8" />
        <circle cx="6.5" cy="17.5" r="2.5" stroke="#16a34a" strokeWidth="1.8" />
        <circle cx="17.5" cy="17.5" r="2.5" stroke="#16a34a" strokeWidth="1.8" />
        <path d="M10.8 8.2L7.7 15.2M13.2 8.2l3.1 7" stroke="#16a34a" strokeWidth="1.6" />
      </svg>
    )
  },
  {
    id: 'dns',
    name: 'BIND9 DNS',
    role: 'Resolución DNS',
    color: '#6366f1',
    keywords: ['bind9', 'dns', 'zona directa'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke="#6366f1" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="4" ry="8.5" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M4 12h16" stroke="#6366f1" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'nodejs',
    name: 'Node.js / Gulp',
    role: 'Build Frontend',
    color: '#3c873a',
    keywords: ['node.js', 'nodejs', 'npm', 'gulp', 'webpack'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 3l7.5 4.3v8.6L12 20.2l-7.5-4.3V7.3L12 3Z" stroke="#3c873a" strokeWidth="2" strokeLinejoin="round" />
        <text x="12" y="14" textAnchor="middle" fill="#3c873a" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">
          JS
        </text>
      </svg>
    )
  },
  {
    id: 'git',
    name: 'Git / GitLab',
    role: 'Control de Versiones',
    color: '#f05032',
    keywords: ['git', 'gitlab', 'github', 'commit', 'merge'],
    svg: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(45 12 12)" fill="#f05032" />
        <circle cx="12" cy="9" r="1.4" fill="#fff" />
        <circle cx="12" cy="15" r="1.4" fill="#fff" />
        <circle cx="15" cy="12" r="1.4" fill="#fff" />
        <path d="M12 9v6M12 10.5l3 1.5" stroke="#fff" strokeWidth="1.4" />
      </svg>
    )
  }
];

/**
 * Muestra una barra visual con los logos SVG de las plataformas/tecnologías detectadas en la unidad.
 */
export default function PlatformLogosStrip({ unitLessons = [], activeContent = '' }) {
  const matchedPlatforms = useMemo(() => {
    const corpus = [
      activeContent || '',
      ...unitLessons.map((l) => `${l.title || ''} ${l.summary || ''}`)
    ]
      .join(' ')
      .toLowerCase();

    return PLATFORM_CATALOG.filter((p) =>
      p.keywords.some((kw) => corpus.includes(kw))
    );
  }, [unitLessons, activeContent]);

  if (matchedPlatforms.length === 0) return null;

  return (
    <section
      style={{
        marginTop: '0.25rem',
        marginBottom: '1.25rem',
        padding: '1rem 1.15rem',
        borderRadius: '14px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      <div style={{
        fontSize: '0.78rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-muted)',
        marginBottom: '0.7rem'
      }}>
        Plataformas y tecnologías de esta unidad
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem'
      }}>
        {matchedPlatforms.map((p) => (
          <div
            key={p.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: `1px solid ${p.color}35`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {p.svg}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)' }}>
                {p.name}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {p.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
