import React, { useState, useEffect, useMemo } from 'react';

/**
 * Ícono oficial de GitHub en formato SVG
 */
const GithubIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color} 
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

/**
 * Base de datos de entregas oficiales para actividades de Spring Boot (Accenture)
 */
const ACCENTURE_ACTIVITIES = [
  {
    num: 1,
    slug: '1-uso-de-ioc',
    title: 'Actividad 1 · Uso de IoC',
    type: 'folder', // Carpeta en rama SPRING-BOOT
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot - Uso de IoC - {NAME}',
    zipTemplate: 'Spring Boot - Uso de IoC - {NAME}.zip',
    commitMsg: 'feat(act1): entrega uso IoC Spring con XML',
    l2eId: '8537',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537',
    notesFile: null
  },
  {
    num: 2,
    slug: '2-uso-de-iod',
    title: 'Actividad 2 · Uso de IoD',
    type: 'folder',
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot - Uso de IoD - {NAME}',
    zipTemplate: 'Spring Boot - Uso de IoD - {NAME}.zip',
    commitMsg: 'feat(act2): inyeccion dependencias IoD y properties',
    l2eId: '8539',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539',
    notesFile: null
  },
  {
    num: 3,
    slug: '3-uso-java-annotations',
    title: 'Actividad 3 · Java Annotations',
    type: 'folder',
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot - Uso de Java Annotations - {NAME}',
    zipTemplate: 'Spring Boot - Uso de Java Annotations - {NAME}.zip',
    commitMsg: 'feat(act3): configuracion Java Annotations pura',
    l2eId: '8539',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539',
    notesFile: null
  },
  {
    num: 4,
    slug: '4-distintas-configuraciones',
    title: 'Actividad 4 · Distintas Configuraciones',
    type: 'folder',
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot – Config en Spring - {NAME}',
    zipTemplate: 'Spring Boot - Config en Spring - {NAME}.zip',
    commitMsg: 'feat(act4): comparativa configuraciones XML y JavaConfig',
    l2eId: '8540',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540',
    notesFile: null
  },
  {
    num: 5,
    slug: '5-preparacion-del-entorno',
    title: 'Actividad 5 · Preparación del Entorno',
    type: 'branch', // Rama específica con PR a main-spring-boot
    originBranch: 'main-spring-boot',
    branch: '00-preparacion-del-entorno',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Preparación del entorno - {NAME}.zip',
    commitMsg: 'feat(entorno): inicializacion taskmanager con notas',
    l2eId: '8541',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541',
    notesFile: 'notas/NOTAS-00-preparacion-del-entorno.md'
  },
  {
    num: 6,
    slug: '6-creacion-del-controller',
    title: 'Actividad 6 · Creación del Controller REST',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '01-creacion-del-controller',
    prTitle: 'Spring Boot – Creación del Controller',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación del Controller - {NAME}.zip',
    commitMsg: 'feat(controller): implementacion TaskController CRUD en memoria',
    l2eId: '8542',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542',
    notesFile: 'notas/NOTAS-01-creacion-del-controller.md'
  },
  {
    num: 7,
    slug: '7-creacion-capa-servicio',
    title: 'Actividad 7 · Creación de la Capa de Servicio',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '02-creacion-de-la-capa-de-servicio',
    prTitle: 'Spring Boot – Creación de la Capa de Servicio',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación de la Capa de Servicio - {NAME}.zip',
    commitMsg: 'feat(service): desacoplamiento y logica de negocio en TaskService y TaskServiceImpl',
    l2eId: '8543',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-02-creacion-de-la-capa-de-servicio.md'
  },
  {
    num: 8,
    slug: '8-creacion-capa-entidades-relaciones',
    title: 'Actividad 8 · Entidades y Relaciones JPA',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '03-creacion-de-la-capa-de-entidades-y-sus-relaciones',
    prTitle: 'Spring Boot – Introducción a JPA y modelado de entidades',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Introducción a JPA y modelado de entidades - {NAME}.zip',
    commitMsg: 'feat(jpa): mapeo de entidad Task, enums y conexion MySQL con ddl-auto=validate',
    l2eId: '8544',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md'
  },
  {
    num: 9,
    slug: '9-uso-spring-data-jpa',
    title: 'Actividad 9 · Uso de Spring Data JPA',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '04-uso-de-spring-data-jpa',
    prTitle: 'Spring Boot – Uso de Spring Data JPA',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Uso de Spring Data JPA - {NAME}.zip',
    commitMsg: 'feat(data-jpa): integracion TaskRepository JpaRepository, relaciones y paginacion',
    l2eId: '8545',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-04-uso-de-spring-data-jpa.md'
  },
  {
    num: 10,
    slug: '10-creacion-de-los-dtos',
    title: 'Actividad 10 · Creación de los DTO\'s',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '05-creacion-de-los-dtos',
    prTitle: 'Spring Boot – Creación de los DTO\'s',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación de los DTO\'s - {NAME}.zip',
    commitMsg: 'feat(dto): blindaje de API con TaskRequestDTO, TaskResponseDTO y PagedResponseDTO',
    l2eId: '8546',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-05-creacion-de-los-dtos.md'
  },
  {
    num: 11,
    slug: '11-uso-de-validaciones',
    title: 'Actividad 11 · Uso de Validaciones',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '06-uso-de-validaciones',
    prTitle: 'Spring Boot – Uso de Validaciones',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Uso de Validaciones - {NAME}.zip',
    commitMsg: 'feat(validations): validacion declarativa con @Valid y Bean Validation',
    l2eId: '8547',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-06-uso-de-validaciones.md'
  },
  {
    num: 12,
    slug: '12-manejo-de-errores',
    title: 'Actividad 12 · Manejo Global de Errores',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '07-manejo-de-errores',
    prTitle: 'Spring Boot – Manejo global de errores',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Manejo global de errores - {NAME}.zip',
    commitMsg: 'feat(error-handling): centralizacion con @RestControllerAdvice y ErrorResponse',
    l2eId: '8548',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-07-manejo-de-errores.md'
  },
  {
    num: 13,
    slug: '13-creacion-documentacion-api',
    title: 'Actividad 13 · Creación de la Documentación de la API',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '08-creacion-de-la-documentacion-de-la-api',
    prTitle: 'Spring Boot – Creación de la documentación de la API',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación de la documentación de la API - {NAME}.zip',
    commitMsg: 'feat(openapi): springdoc-openapi, @OpenAPIDefinition, @Tag, @Operation y Swagger UI',
    l2eId: '8549',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-08-creacion-de-la-documentacion-de-la-api.md'
  }
];

export default function LessonGithubCommandsSidebar({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  activeSlug,
  topOffset = '128px'
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('accenture'); // 'accenture' | 'ioc_eac' | 'cheatsheet'
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('student_git_name') || 'Blanca Perez';
  });
  const [selectedActNum, setSelectedActNum] = useState(() => {
    if (activeSlug) {
      const match = ACCENTURE_ACTIVITIES.find(a => a.slug === activeSlug || activeSlug.includes(a.slug));
      if (match) return match.num;
    }
    return 1;
  });
  const [copiedId, setCopiedId] = useState(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  // Guardar nombre en localStorage
  const handleNameChange = (e) => {
    const val = e.target.value;
    setStudentName(val);
    localStorage.setItem('student_git_name', val);
  };

  // Sincronizar actividad seleccionada automáticamente con el slug activo de la pantalla
  useEffect(() => {
    if (activeSlug) {
      const match = ACCENTURE_ACTIVITIES.find(a => a.slug === activeSlug || activeSlug.includes(a.slug));
      if (match) {
        setSelectedActNum(prev => prev !== match.num ? match.num : prev);
      }
    }
  }, [activeSlug]);

  const currentAct = useMemo(() => {
    return ACCENTURE_ACTIVITIES.find(a => a.num === selectedActNum) || ACCENTURE_ACTIVITIES[0];
  }, [selectedActNum]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const safeName = studentName.trim() || 'Blanca Perez';
  const resolvedFolder = currentAct.folderTemplate.replace('{NAME}', safeName);
  const resolvedZip = currentAct.zipTemplate.replace('{NAME}', safeName);

  // Generador de script según tipo de actividad
  const generateAccentureScript = () => {
    if (currentAct.type === 'folder') {
      return `# 1. Situarse en la rama de entrega SPRING-BOOT y traer últimos cambios
git checkout SPRING-BOOT
git pull origin SPRING-BOOT

# 2. Agregar la carpeta con el nombre oficial requerido
git add "${resolvedFolder}"

# 3. Confirmar cambios con commit semántico
git commit -m "${currentAct.commitMsg}"

# 4. Subir al repositorio remoto
git push origin SPRING-BOOT

# 5. [Opcional] Generar ZIP limpio para subir a L2E (sin carpeta target/ ni .git)
mvn clean
zip -r "${resolvedZip}" "${resolvedFolder}" -x "*/target/*" "*/.git/*" "*/.DS_Store"`;
    } else {
      return `# 1. Partir siempre de la rama base actualizada
git checkout ${currentAct.originBranch}
git pull origin ${currentAct.originBranch}

# 2. Crear y cambiar a la rama de trabajo de la actividad
git checkout -b ${currentAct.branch}

# 3. Crear fichero de notas obligatorio si aún no existe
mkdir -p notas
touch "${currentAct.notesFile}"

# 4. Añadir cambios y realizar el commit oficial
git add .
git commit -m "${currentAct.commitMsg}"

# 5. Subir la nueva rama a GitHub
git push -u origin ${currentAct.branch}

# 6. Abrir Pull Request (PR) en la web de GitHub:
#    Base: ${currentAct.originBranch}  <---  Compare: ${currentAct.branch}
#    Título: "${currentAct.prTitle || currentAct.title}"

# 7. Empaquetar proyecto limpio en ZIP para plataforma L2E
mvn clean
zip -r "${resolvedZip}" . -x "target/*" ".git/*" ".DS_Store"`;
    }
  };

  return (
    <aside
      aria-label="Panel lateral de comandos Git y GitHub para entregas"
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '450px',
        maxWidth: 'calc(100vw - 42px)',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 30px rgba(0,0,0,0.3)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Botón Pestaña Adherido al Margen Izquierdo con Ícono de GitHub */}
      <button
        type="button"
        onClick={toggle}
        style={{
          position: 'absolute',
          left: '-40px',
          top: topOffset,
          width: '40px',
          height: '46px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRight: 'none',
          borderRadius: '10px 0 0 10px',
          boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
          color: isOpen ? '#8b5cf6' : 'var(--text-main)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.15rem',
          zIndex: 951,
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title={isOpen ? 'Ocultar comandos Git/GitHub' : '🐙 Comandos Git & GitHub para entregas EAC'}
        aria-label={isOpen ? 'Ocultar comandos Git/GitHub' : 'Comandos Git & GitHub para entregas EAC'}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen ? '▶' : <GithubIcon size={19} color="var(--text-main)" />}
        </span>
      </button>

      {/* Header del Drawer */}
      <div
        style={{
          padding: '1rem 1.2rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          gap: '0.6rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8b5cf6'
            }}
          >
            <GithubIcon size={18} color="#8b5cf6" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)' }}>
              Git & GitHub · Comandos EAC
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Guía oficial para subir actividades y entregas
            </span>
          </div>
        </div>

        <button
          onClick={toggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px'
          }}
          title="Cerrar panel"
        >
          ✕
        </button>
      </div>

      {/* Selector de Nombre del Alumno para Autocompletado */}
      <div
        style={{
          padding: '0.75rem 1.2rem',
          background: 'var(--bg-subtle, rgba(0,0,0,0.03))',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.82rem'
        }}
      >
        <span style={{ whiteSpace: 'nowrap', fontWeight: 600, color: 'var(--text-main)' }}>
          👤 Tu Nombre:
        </span>
        <input
          type="text"
          value={studentName}
          onChange={handleNameChange}
          placeholder="Nombre Apellido"
          style={{
            flex: 1,
            padding: '0.35rem 0.6rem',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
            outline: 'none'
          }}
          title="Se sustituirá automáticamente en todos los comandos generados"
        />
      </div>

      {/* Selector de Pestañas Principales */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-card)'
        }}
      >
        <button
          onClick={() => setActiveTab('accenture')}
          style={{
            flex: 1,
            padding: '0.65rem 0.4rem',
            border: 'none',
            borderBottom: activeTab === 'accenture' ? '2px solid #8b5cf6' : '2px solid transparent',
            background: 'transparent',
            color: activeTab === 'accenture' ? '#8b5cf6' : 'var(--text-muted)',
            fontWeight: activeTab === 'accenture' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          📦 Spring Boot
        </button>
        <button
          onClick={() => setActiveTab('ioc_eac')}
          style={{
            flex: 1,
            padding: '0.65rem 0.4rem',
            border: 'none',
            borderBottom: activeTab === 'ioc_eac' ? '2px solid #0969da' : '2px solid transparent',
            background: 'transparent',
            color: activeTab === 'ioc_eac' ? '#0969da' : 'var(--text-muted)',
            fontWeight: activeTab === 'ioc_eac' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          🎓 EACs IOC (DAW)
        </button>
        <button
          onClick={() => setActiveTab('cheatsheet')}
          style={{
            flex: 1,
            padding: '0.65rem 0.4rem',
            border: 'none',
            borderBottom: activeTab === 'cheatsheet' ? '2px solid #10b981' : '2px solid transparent',
            background: 'transparent',
            color: activeTab === 'cheatsheet' ? '#10b981' : 'var(--text-muted)',
            fontWeight: activeTab === 'cheatsheet' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          ⚡ Chuleta Git
        </button>
      </div>

      {/* Contenido Scrolleable */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}
      >
        {/* PESTAÑA 1: SPRING BOOT (ACCENTURE) */}
        {activeTab === 'accenture' && (
          <>
            {/* Selector de Actividad */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                SELECCIONA LA ACTIVIDAD:
              </label>
              <select
                value={selectedActNum}
                onChange={(e) => setSelectedActNum(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                {ACCENTURE_ACTIVITIES.map(act => (
                  <option key={act.num} value={act.num}>
                    {act.title} ({act.type === 'folder' ? `Rama ${act.branch}` : `PR ${act.branch}`})
                  </option>
                ))}
              </select>
            </div>

            {/* Ficha Resumen de la Entrega */}
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.06)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '10px',
                padding: '0.9rem',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#8b5cf6' }}>
                  {currentAct.type === 'folder' ? '📁 Entrega por Carpeta en Rama' : '🌿 Entrega por Rama + Pull Request'}
                </span>
                <span style={{ fontSize: '0.72rem', background: '#8b5cf6', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  Actividad {currentAct.num}
                </span>
              </div>

              <div>
                <strong>Rama Git:</strong>{' '}
                <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', color: '#8b5cf6' }}>
                  {currentAct.branch}
                </code>
              </div>

              <div>
                <strong>Carpeta requerida:</strong><br />
                <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', wordBreak: 'break-all' }}>
                  {resolvedFolder}
                </code>
              </div>

              <div>
                <strong>Nombre ZIP L2E:</strong><br />
                <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', wordBreak: 'break-all' }}>
                  {resolvedZip}
                </code>
              </div>

              {currentAct.notesFile && (
                <div>
                  <strong>Notas obligatorias:</strong><br />
                  <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', color: '#10b981' }}>
                    {currentAct.notesFile}
                  </code>
                </div>
              )}

              <div style={{ marginTop: '0.2rem' }}>
                <a
                  href={currentAct.l2eUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#8b5cf6',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  🔗 Abrir tarea en L2E Portal (ID: {currentAct.l2eId}) ↗
                </a>
              </div>
            </div>

            {/* Bloque de Comandos Listos para Copiar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  TERMINAL BASH (COPIAR Y PEGAR):
                </span>
                <button
                  onClick={() => copyToClipboard(generateAccentureScript(), 'accenture_full')}
                  style={{
                    background: copiedId === 'accenture_full' ? '#10b981' : '#8b5cf6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '4px 9px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {copiedId === 'accenture_full' ? '✓ ¡Copiado!' : '📋 Copiar Script'}
                </button>
              </div>

              <pre
                style={{
                  background: '#1e1e2e',
                  color: '#cdd6f4',
                  padding: '1rem',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  lineHeight: '1.5',
                  overflowX: 'auto',
                  border: '1px solid rgba(255,255,255,0.08)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace'
                }}
              >
                {generateAccentureScript()}
              </pre>
            </div>

            {/* Aviso de Buenas Prácticas */}
            <div
              style={{
                fontSize: '0.76rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-subtle, rgba(0,0,0,0.02))',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                lineHeight: '1.4'
              }}
            >
              💡 <strong>Regla de oro:</strong> Ejecuta siempre <code>mvn clean</code> antes de generar el archivo ZIP para no incluir los binarios compilados de <code>target/</code>.
            </div>
          </>
        )}

        {/* PESTAÑA 2: PROTOCOLO OFICIAL EAC (IOC DAW) */}
        {activeTab === 'ioc_eac' && (
          <>
            <div
              style={{
                background: 'rgba(9, 105, 218, 0.06)',
                border: '1px solid rgba(9, 105, 218, 0.25)',
                borderRadius: '10px',
                padding: '0.85rem',
                fontSize: '0.82rem',
                lineHeight: '1.45'
              }}
            >
              <strong style={{ color: '#0969da' }}>🎓 Protocolo Evaluativo EAC:</strong>
              <p style={{ margin: '0.4rem 0 0', color: 'var(--text-main)' }}>
                En las EACs de Entornos y Programación de IOC se evalúa el historial de Git, ramas separadas, resolución de conflictos y el grafo generado con <code>git log --graph</code>.
              </p>
            </div>

            {/* Paso 1: Inicialización & Remoto */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  1. Inicializar Repositorio & Vincular Remoto
                </span>
                <button
                  onClick={() => copyToClipboard('git init\ngit branch -M main\ngit remote add origin https://github.com/TU_USUARIO/TU_REPO_EAC.git', 'eac_step1')}
                  style={{
                    background: copiedId === 'eac_step1' ? '#10b981' : 'var(--bg-subtle, #333)',
                    color: copiedId === 'eac_step1' ? '#fff' : 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '2px 7px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedId === 'eac_step1' ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
              <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`git init
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO_EAC.git`}
              </pre>
            </div>

            {/* Paso 2: .gitignore Limpio */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  2. .gitignore Limpio (¡Requisito indispensable!)
                </span>
                <button
                  onClick={() => copyToClipboard(`cat << 'EOF' > .gitignore
*.class
bin/
target/
.metadata/
.settings/
.classpath
.project
.DS_Store
EOF
git add .gitignore
git commit -m "chore: anadir .gitignore oficial para entorno Java"`, 'eac_gitignore')}
                  style={{
                    background: copiedId === 'eac_gitignore' ? '#10b981' : 'var(--bg-subtle, #333)',
                    color: copiedId === 'eac_gitignore' ? '#fff' : 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '2px 7px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedId === 'eac_gitignore' ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
              <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`cat << 'EOF' > .gitignore
*.class
bin/
target/
.metadata/
.settings/
.classpath
.project
.DS_Store
EOF
git add .gitignore
git commit -m "chore: anadir .gitignore oficial para entorno Java"`}
              </pre>
            </div>

            {/* Paso 3: Grafo Visual Obligatorio */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  3. Captura del Grafo para la Memoria PDF
                </span>
                <button
                  onClick={() => copyToClipboard('git log --oneline --graph --decorate --all', 'eac_graph')}
                  style={{
                    background: copiedId === 'eac_graph' ? '#10b981' : 'var(--bg-subtle, #333)',
                    color: copiedId === 'eac_graph' ? '#fff' : 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '2px 7px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedId === 'eac_graph' ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
              <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`git log --oneline --graph --decorate --all`}
              </pre>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                📸 Este es el comando exacto para capturar el historial de fusiones en la documentación.
              </span>
            </div>

            {/* Paso 4: Tag de Entrega Definitiva */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
                  4. Etiquetado y Entrega Final (Tag)
                </span>
                <button
                  onClick={() => copyToClipboard('git tag -a v1.0-entrega-eac -m "Entrega definitiva evaluable EAC"\ngit push origin main --tags', 'eac_tag')}
                  style={{
                    background: copiedId === 'eac_tag' ? '#10b981' : 'var(--bg-subtle, #333)',
                    color: copiedId === 'eac_tag' ? '#fff' : 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '2px 7px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedId === 'eac_tag' ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
              <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`git tag -a v1.0-entrega-eac -m "Entrega definitiva evaluable EAC"
git push origin main --tags`}
              </pre>
            </div>
          </>
        )}

        {/* PESTAÑA 3: CHULETA RÁPIDA GIT */}
        {activeTab === 'cheatsheet' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              {
                title: 'Ver estado del repositorio',
                cmd: 'git status -s',
                desc: 'Muestra los ficheros modificados, nuevos o preparados en formato compacto.'
              },
              {
                title: 'Ver diferencias exactas',
                cmd: 'git diff',
                desc: 'Compara cambios de tu código antes de añadirlos al staging.'
              },
              {
                title: 'Crear rama y cambiar a ella',
                cmd: 'git checkout -b feature/nueva-funcionalidad',
                desc: 'Crea una nueva rama de desarrollo y te posiciona en ella.'
              },
              {
                title: 'Guardar cambios en el cajón temporal (Stash)',
                cmd: 'git stash push -m "trabajo-en-progreso"\n# Para recuperarlo luego:\ngit stash pop',
                desc: 'Guarda temporalmente modificaciones sin hacer commit para cambiar de rama limpio.'
              },
              {
                title: 'Deshacer último commit manteniendo el código',
                cmd: 'git reset --soft HEAD~1',
                desc: 'Devuelve los archivos a staging para corregir el mensaje o añadir algo olvidado.'
              },
              {
                title: 'Limpiar archivos y compilados no rastreados',
                cmd: 'git clean -fd',
                desc: 'Borra ficheros y carpetas generados que no estén en seguimiento.'
              },
              {
                title: 'Comprobar URLs remotas de GitHub',
                cmd: 'git remote -v',
                desc: 'Verifica hacia qué repositorio de GitHub apunta fetch y push.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-subtle, rgba(0,0,0,0.03))',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-title)' }}>
                    {item.title}
                  </span>
                  <button
                    onClick={() => copyToClipboard(item.cmd, `cheat_${idx}`)}
                    style={{
                      background: copiedId === `cheat_${idx}` ? '#10b981' : 'transparent',
                      color: copiedId === `cheat_${idx}` ? '#fff' : 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontSize: '0.7rem',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedId === `cheat_${idx}` ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
                <pre
                  style={{
                    background: '#1e1e2e',
                    color: '#cdd6f4',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    margin: '0.3rem 0',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {item.cmd}
                </pre>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
