/**
 * Configuración centralizada de las materias oficiales de IOC
 * Contiene metadatos, rutas de gestión, libros de lecciones, prefijos y recursos DevKit.
 */

export const IOC_SUBJECTS = [
  {
    code: 'ent',
    title: 'Entornos de Desarrollo',
    shortTitle: 'Entornos',
    color: '#3b82f6',
    icon: '🛠️',
    gestion: '/data/ioc/gestion/ent.json',
    lecciones: '/data/ioc/lecciones/entornos.json',
    lessonPrefix: 'lecciones-ent',
    aliases: ['ent', 'entornos'],
    extraLessonRoutes: ['/ioc/entornos'],
    repoName: 'ioc-entornos-desarrollo',
    devkitItems: [
      {
        title: 'Virtualización macOS (Apple Silicon M-Series)',
        description: 'Justificación técnica y guía oficial de UTM vs VirtualBox en procesadores ARM64 (M1/M2/M3/M4/M5).',
        type: 'doc',
        slug: 'intro-u1'
      },
      {
        title: 'Modelado UML con Eclipse & Papyrus',
        description: 'Diagramas de clases, visibilidad (+, -, #), multiplicidades y composición vs agregación.',
        type: 'guide',
        slug: '2-6-resolver-un-enunciado-de-clases-paso-a-paso'
      },
      {
        title: 'Ejemplo Resuelto: Festa Major (EAC 1)',
        description: 'Diagrama de clases completo resuelto paso a paso con atributos y operaciones.',
        type: 'example',
        slug: '2-6-3-eac1-festa-major'
      }
    ]
  },
  {
    code: 'desp',
    title: 'Despliegue de Aplicaciones Web',
    shortTitle: 'Despliegue',
    color: '#22c55e',
    icon: '🚀',
    gestion: '/data/ioc/gestion/desp.json',
    lecciones: '/data/ioc/lecciones/despliegue.json',
    lessonPrefix: 'lecciones-desp',
    aliases: ['des', 'desp', 'despliegue'],
    repoName: 'ioc-despliegue-aplicaciones-web',
    devkitItems: [
      {
        title: 'Guía Paso a Paso EAC 2 (Git, LAMP & Tomcat)',
        description: 'Recorrido directo de los apartados 0 al 14 (a-bg) con comandos copiables, textos para el PDF y checklist de capturas y vídeos.',
        type: 'link',
        link: '/desp/eac2'
      },
      {
        title: 'Servidores Web Apache2 & VirtualHosts',
        description: 'Configuración en /etc/apache2/sites-available, puertos 80/443 y directiva DocumentRoot.',
        type: 'guide',
        slug: 'intro-bloque1'
      },
      {
        title: 'Servidor FTP Seguro & Permisos Linux',
        description: 'Gestión de grupos (comercials, auditors), permisos octales y servicios systemctl.',
        type: 'guide',
        slug: 'servidores-ftp'
      },
      {
        title: 'Labs Prácticos BBDD MySQL (LabEx)',
        description: 'Laboratorio cloud gratuito interactivo para practicar SQL, esquemas relacionales y administración de MySQL.',
        type: 'lab',
        link: 'https://labex.io/free-labs/mysql'
      }
    ]
  },
  {
    code: 'digi',
    title: 'Digitalización Aplicada',
    shortTitle: 'Digitalización',
    color: '#ec4899',
    icon: '💡',
    gestion: '/data/ioc/gestion/digi.json',
    lecciones: '/data/ioc/lecciones/digitalizacion.json',
    lessonPrefix: 'lecciones-digi',
    aliases: ['dig', 'digi', 'digitalizacion'],
    repoName: 'ioc-digitalizacion-aplicada',
    devkitItems: [
      {
        title: 'Indústria 4.0 & Tecnologías Habilitadoras',
        description: 'Cloud computing, Internet de las Cosas (IoT), Gemelos Digitales y ciberseguridad industrial.',
        type: 'guide',
        slug: 'industria-4-0'
      },
      {
        title: 'Big Data & Inteligencia Artificial',
        description: 'Las 5 Vs del Big Data, pipelines de machine learning y aplicaciones de negocio.',
        type: 'guide',
        slug: 'big-data-ia'
      }
    ]
  },
  {
    code: 'int',
    title: 'Diseño de Interfaces Web',
    shortTitle: 'Interfaces',
    color: '#eab308',
    icon: '🎨',
    gestion: '/data/ioc/gestion/int.json',
    lecciones: '/data/ioc/lecciones/interfaces.json',
    lessonPrefix: 'lecciones-int',
    aliases: ['int', 'interfaces'],
    repoName: 'ioc-interfaces-web',
    devkitItems: [
      {
        title: 'Heurísticas de Usabilidad de Nielsen',
        description: 'Los 10 principios esenciales de diseño de interacción y experiencia de usuario.',
        type: 'guide',
        slug: 'usabilidad-ux'
      },
      {
        title: 'Layout Moderno: CSS Grid & Flexbox',
        description: 'Diseño responsive mobile-first, alineaciones con auto-fit y áreas con grid-template-areas.',
        type: 'guide',
        slug: 'css-grid-flexbox'
      },
      {
        title: 'Accesibilidad Web (WCAG 2.1 AA)',
        description: 'Ratios de contraste mínimos, etiquetas semánticas y compatibilidad con tecnologías de asistencia.',
        type: 'guide',
        slug: 'accesibilidad-wcag'
      }
    ]
  },
  {
    code: 'ipo2',
    title: 'Itinerario Personal para la Empleabilidad II',
    shortTitle: 'IPO 2',
    color: '#ea580c',
    icon: '💼',
    gestion: '/data/ioc/gestion/ipo2.json',
    lecciones: '/data/ioc/lecciones/ipo2_curso.json',
    lessonPrefix: 'lecciones-ipo2',
    aliases: ['ipo', 'ipo2', 'fol'],
    repoName: 'ioc-itinerario-empleabilidad-2',
    devkitItems: [
      {
        title: 'SEO en LinkedIn & Filtros de IA (ATS)',
        description: 'Artículo práctico: visibilidad algorítmica, palabras clave hard/soft y optimización de CV frente a ATS.',
        type: 'link',
        link: '/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats'
      },
      {
        title: 'Estructura Salarial y Nóminas',
        description: 'Cálculo de bases de cotización por contingencias comunes, retenciones IRPF y líquido a percibir.',
        type: 'guide',
        slug: 'nominas-seguridad-social'
      },
      {
        title: 'Prevención de Riesgos Laborales (PRL)',
        description: 'Salud ergonómica para desarrolladores frente a pantallas (PVD) y prevención del burnout.',
        type: 'guide',
        slug: 'salud-laboral-prl'
      }
    ]
  }
];

export const getIocSubjectByCode = (codeOrAlias) => {
  if (!codeOrAlias) return null;
  const norm = String(codeOrAlias).toLowerCase().trim();
  return IOC_SUBJECTS.find(s => 
    s.code === norm || 
    s.aliases.includes(norm) ||
    s.lessonPrefix === norm ||
    s.title.toLowerCase().includes(norm)
  ) || null;
};
