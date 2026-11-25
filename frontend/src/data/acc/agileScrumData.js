/**
 * agileScrumData.js
 * Datos maestros de Metodologías Ágiles y Scrum para la Sala de Estudio de Accenture.
 * Basado en las guías oficiales de Scrum y en los cuestionarios de evaluación técnica de Accenture.
 */

export const AGILE_SCRUM_THEORY = {
  title: 'Marco de Trabajo Scrum & Metodologías Ágiles',
  subtitle: 'Guía técnica de preparación para evaluaciones y proyectos de software profesional',
  fundamentos: {
    definicion: 'Scrum es un marco de trabajo liviano, adaptativo y centrado en las personas que permite a los equipos generar valor de negocio de forma incremental en entornos de alta incertidumbre y complejidad tecnológica.',
    pilares: [
      {
        nombre: 'Transparencia',
        icon: '👁️',
        desc: 'El proceso, los artefactos y el trabajo emergente deben ser visibles y comprensibles tanto para quienes realizan el trabajo como para quienes reciben el resultado.'
      },
      {
        nombre: 'Inspección',
        icon: '🔍',
        desc: 'Los artefactos y el avance hacia los objetivos se evalúan con frecuencia y diligencia para detectar desviaciones o problemas a tiempo.'
      },
      {
        nombre: 'Adaptación',
        icon: '⚡',
        desc: 'Si algún aspecto del proceso se desvía de los límites tolerables o el producto no alcanza la calidad requerida, el equipo ajusta el proceso o los elementos lo antes posible.'
      }
    ],
    valores: [
      { nombre: 'Compromiso', desc: 'Dedicación total a alcanzar los objetivos del Scrum Team.' },
      { nombre: 'Foco', desc: 'Atención prioritaria al trabajo del Sprint para avanzar hacia el Sprint Goal.' },
      { nombre: 'Franqueza', desc: 'Transparencia sincera sobre el trabajo y los obstáculos encontrados.' },
      { nombre: 'Respeto', desc: 'Reconocimiento mutuo de las capacidades e independencia de cada miembro.' },
      { nombre: 'Coraje', desc: 'Valentía para hacer lo correcto y abordar problemas difíciles y técnicos.' }
    ]
  },
  roles: [
    {
      id: 'po',
      title: 'Product Owner (PO)',
      badge: 'Maximizar el Valor',
      icon: '👑',
      tagColor: '#ea580c',
      bgGradient: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(194, 65, 12, 0.04) 100%)',
      borderColor: 'rgba(234, 88, 12, 0.35)',
      mision: 'Responsable único de maximizar el valor del producto resultante del trabajo del Scrum Team y de gestionar eficazmente el Product Backlog.',
      responsabilidades: [
        'Desarrollar y comunicar de forma explícita el Product Goal (Objetivo del Producto).',
        'Crear, descomponer y priorizar los elementos del Product Backlog (PBIs).',
        'Garantizar que el Product Backlog sea transparente, visible y entendido por todo el equipo.',
        'Colaborar continuamente con los desarrolladores resolviendo dudas sobre requisitos y negocio.',
        'Aceptar o rechazar los elementos completados según los criterios de aceptación y DoD.'
      ],
      queNoHace: [
        'NO asigna tareas a los miembros del equipo de desarrollo (el equipo es autogestionado).',
        'NO ejerce como jefe jerárquico tradicional ni microgestor.',
        'NO define la arquitectura técnica ni estima las horas/story points de las tareas.'
      ]
    },
    {
      id: 'sm',
      title: 'Scrum Master (SM)',
      badge: 'Líder Servicial / Facilitador',
      icon: '🛡️',
      tagColor: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.04) 100%)',
      borderColor: 'rgba(139, 92, 246, 0.35)',
      mision: 'Líder servicial (Servant Leader) responsable de promover y respaldar Scrum, ayudando al equipo y a la organización a entender y aplicar la teoría, prácticas y reglas del marco.',
      responsabilidades: [
        'Facilitar las ceremonias de Scrum asegurando que se cumplan sus timeboxes.',
        'Remover impedimentos, bloqueos operativos y obstáculos externos que frenen el avance.',
        'Hacer coaching al equipo en autogestión, multifuncionalidad y entrega de valor.',
        'Proteger al equipo de interrupciones y cambios de alcance a mitad de Sprint.',
        'Fomentar la cultura de mejora continua en la Retrospectiva.'
      ],
      queNoHace: [
        'NO es un Project Manager tradicional: no impone plazos ni reparte trabajo.',
        'NO lidera la Daily Scrum como si fuera un informe de estado a la dirección.',
        'NO toma decisiones técnicas unilaterales ni define el qué del producto.'
      ]
    },
    {
      id: 'devs',
      title: 'Developers (Equipo de Desarrollo)',
      badge: 'Autogestionados & Multifuncionales',
      icon: '💻',
      tagColor: '#0284c7',
      bgGradient: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(3, 105, 161, 0.04) 100%)',
      borderColor: 'rgba(2, 132, 199, 0.35)',
      mision: 'Profesionales comprometidos a crear cualquier aspecto de un Incremento utilizable, probado y potencialmente desplegable en cada ciclo de Sprint.',
      responsabilidades: [
        'Crear el plan de trabajo detallado para el Sprint (el Sprint Backlog).',
        'Inculcar calidad asegurando que todo incremento cumpla la Definition of Done (DoD).',
        'Adaptar el plan diariamente durante la Daily Scrum en dirección hacia el Sprint Goal.',
        'Responsabilizarse mutuamente como equipo profesional por la entrega del incremento.',
        'Diseñar, programar, testear, refactorizar e integrar la solución técnica.'
      ],
      queNoHace: [
        'NO trabajan en subgrupos aislados (no hay subequipos de solo QA, solo frontend o solo backend).',
        'NO reconocen títulos ni jerarquías internas entre los desarrolladores dentro de Scrum.'
      ]
    }
  ],
  eventos: [
    {
      id: 'sprint',
      title: '1. El Sprint',
      timebox: '1 a 4 semanas (fijo)',
      participantes: 'Todo el Scrum Team (PO, SM, Developers)',
      icon: '🔄',
      tagColor: '#6d28d9',
      proposito: 'Contenedor de todos los demás eventos. Es un ciclo de duración fija y consistente donde se materializan ideas en valor mediante un incremento de producto potencialmente desplegable.',
      reglas: [
        'No se pueden realizar cambios que pongan en peligro el Sprint Goal.',
        'La calidad del código no disminuye bajo ninguna circunstancia.',
        'El alcance puede clarificarse y renegociarse con el PO a medida que se aprende más.'
      ]
    },
    {
      id: 'planning',
      title: '2. Sprint Planning',
      timebox: 'Máx. 8 horas (sprint mensual) / ~2-4h (quincenal)',
      participantes: 'Todo el Scrum Team colaborando',
      icon: '🎯',
      tagColor: '#2563eb',
      proposito: 'Da inicio al Sprint estableciendo el trabajo a realizar mediante la respuesta a tres preguntas clave:',
      preguntasClave: [
        { q: '1. ¿Por qué es valioso este Sprint?', a: 'Se define de mutuo acuerdo el Sprint Goal (Objetivo del Sprint).' },
        { q: '2. ¿Qué se puede hacer en este Sprint?', a: 'Los Developers seleccionan elementos del Product Backlog según su capacidad real.' },
        { q: '3. ¿Cómo se realizará el trabajo seleccionado?', a: 'Los Developers desglosan los PBIs en tareas técnicas (Sprint Backlog).' }
      ]
    },
    {
      id: 'daily',
      title: '3. Daily Scrum',
      timebox: '15 minutos exactos (diaria)',
      participantes: 'Exclusiva para los Developers (SM facilita, PO opcional sin voz activa)',
      icon: '⏱️',
      tagColor: '#059669',
      proposito: 'Inspeccionar el progreso diario hacia el Sprint Goal y adaptar el plan de las siguientes 24 horas, detectando impedimentos y bloqueos a tiempo.',
      reglas: [
        'Timebox estricto de 15 minutos en la misma hora y lugar cada jornada laboral.',
        'NO es una reunión de reporte de estado al jefe ni para dar explicaciones jerárquicas.',
        'Si surgen debates técnicos profundos, se agendan inmediatamente fuera de la Daily con los interesados.'
      ]
    },
    {
      id: 'review',
      title: '4. Sprint Review',
      timebox: 'Máx. 4 horas (sprint mensual) / ~2h (quincenal)',
      participantes: 'Scrum Team + Stakeholders y Clientes clave',
      icon: '🎉',
      tagColor: '#d97706',
      proposito: 'Inspeccionar el resultado del Sprint (el Incremento terminado), demostrar el funcionamiento real del producto y obtener retroalimentación para adaptar el Product Backlog futuro.',
      reglas: [
        'Se demuestra software real funcionando, nunca presentaciones teóricas de PowerPoints vacíos.',
        'Se revisa el avance hacia el Product Goal y se debaten cambios del mercado o negocio.'
      ]
    },
    {
      id: 'retro',
      title: '5. Sprint Retrospective',
      timebox: 'Máx. 3 horas (sprint mensual) / ~1-1.5h (quincenal)',
      participantes: 'Todo el Scrum Team (PO, SM, Developers)',
      icon: '🌱',
      tagColor: '#dc2626',
      proposito: 'Espacio de MEJORA CONTINUA. El equipo inspecciona cómo fue el Sprint respecto a personas, relaciones, procesos y herramientas, acordando mejoras operativas concretas que se aplicarán en el siguiente ciclo.',
      reglas: [
        'Ambiente de seguridad psicológica sin buscar culpables individuales.',
        'Se analiza qué fue bien, qué problemas surgieron y cómo se solucionaron (o no).',
        'Se selecciona al menos una mejora accionable de alta prioridad para incorporar de inmediato al próximo Sprint Backlog.'
      ]
    }
  ],
  artefactos: [
    {
      id: 'pb',
      nombre: 'Product Backlog',
      compromiso: 'Product Goal (Objetivo del Producto)',
      icon: '📑',
      desc: 'Lista ordenada y en continua evolución de todo lo que se sabe necesario para el producto. Es la fuente única de requisitos y es un artefacto dinámico y vivo (living artifact).',
      detalles: 'El Product Owner es responsable de su contenido, disponibilidad y priorización, pero el equipo colabora continuamente en su refinamiento (desglose, estimación y detalle).'
    },
    {
      id: 'sb',
      nombre: 'Sprint Backlog',
      compromiso: 'Sprint Goal (Objetivo del Sprint)',
      icon: '📋',
      desc: 'Compuesto por el Sprint Goal (el porqué), el conjunto de elementos del Product Backlog seleccionados (el qué) y un plan de entrega procesable (el cómo).',
      detalles: 'Es propiedad exclusiva de los Developers. Se actualiza a lo largo del Sprint a medida que se aprende más o se completan las tareas técnicas.'
    },
    {
      id: 'inc',
      nombre: 'Increment (Incremento)',
      compromiso: 'Definition of Done (DoD)',
      icon: '📦',
      desc: 'Versión utilizable, probada y potencialmente entregable del producto que suma el valor del Sprint actual a los anteriores.',
      detalles: 'Para considerarse terminado, cada elemento debe cumplir obligatoriamente la Definition of Done (código limpio, tests unitarios aprobados, sin bugs críticos, documentado y listo para producción).'
    }
  ],
  comparativaCascadaVsAgil: [
    { aspecto: 'Enfoque de Requisitos', cascada: 'Fijos y detallados al inicio (fase de análisis masiva)', agil: 'Emergentes y vivos; se refinan iterativamente Sprint a Sprint' },
    { aspecto: 'Entrega de Software', cascada: 'Única entrega final al cabo de muchos meses o años', agil: 'Entregas de valor frecuentes y funcionales cada 1-4 semanas' },
    { aspecto: 'Respuesta al Cambio', cascada: 'Rígida; los cambios suponen sobrecostes y fricciones contractuales', agil: 'Abierta y bienvenida; el cambio es una ventaja competitiva' },
    { aspecto: 'Gestión del Riesgo', cascada: 'Alto; los errores de diseño o valor se descubren al final', agil: 'Mínimo; validación inmediata con clientes cada Sprint Review' },
    { aspecto: 'Estructura del Equipo', cascada: 'Silos departamentales (Analistas -> Devs -> Testers -> Operaciones)', agil: 'Equipo multifuncional y autónomo con todas las habilidades necesarias' }
  ]
};

/**
 * 10 Preguntas oficiales consolidadas del archivo:
 * public/accenture/sala-estudio/Cuestionarios/Metodologias Agiles/Cuestionario-Metodologias-Agiles.md
 */
export const AGILE_SCRUM_QUESTIONS = [
  {
    id: 1,
    pregunta: '¿Cuál es la diferencia principal entre el Product Owner y el Scrum Master?',
    opciones: [
      { text: 'El Product Owner es responsable de maximizar el valor del producto, mientras que el Scrum Master es responsable de facilitar el proceso de Scrum.', correct: true },
      { text: 'El Product Owner gestiona el equipo, mientras que el Scrum Master gestiona el Product Backlog.', correct: false },
      { text: 'El Product Owner se ocupa de la calidad del producto, mientras que el Scrum Master se encarga de la velocidad del equipo.', correct: false },
      { text: 'El Product Owner es responsable de liderar las reuniones, mientras que el Scrum Master es responsable de la planificación del Sprint.', correct: false }
    ],
    explicacion: 'El Product Owner define el *qué* y el *para qué*, enfocándose en maximizar el retorno de inversión y el valor del producto mediante la gestión del Product Backlog. Por su parte, el Scrum Master es un líder servicial enfocado en el *cómo*, facilitando el marco Scrum, impulsando la autogestión y eliminando impedimentos. Ninguno ejerce jefatura jerárquica.',
    tema: 'Roles en Scrum',
    difficulty: 'Fundamento'
  },
  {
    id: 2,
    pregunta: '¿Para qué sirve la práctica de "Daily Scrum" en Scrum?',
    opciones: [
      { text: 'Para obtener una retrospectiva al final del proyecto.', correct: false },
      { text: 'Para tener una revisión detallada del trabajo realizado durante el Sprint.', correct: false },
      { text: 'Para replanificar las tareas del equipo.', correct: false },
      { text: 'Para sincronizar el trabajo diario del equipo.', correct: true }
    ],
    explicacion: 'La Daily Scrum es un evento diario de 15 minutos exclusivo para los desarrolladores. Su propósito primordial es inspeccionar el progreso diario hacia el Sprint Goal, sincronizar las actividades de las siguientes 24 horas y detectar obstáculos a tiempo.',
    tema: 'Ceremonias / Eventos',
    difficulty: 'Fundamento'
  },
  {
    id: 3,
    pregunta: '¿Cuál es el propósito del Sprint Planning?',
    opciones: [
      { text: 'Presentar el Incremento y obtener retroalimentación.', correct: false },
      { text: 'Colaborar en la selección de elementos del Product Backlog para el próximo Sprint.', correct: true },
      { text: 'Inspeccionar el trabajo completado y adaptar el Product Backlog.', correct: false },
      { text: 'Evaluar el rendimiento individual de los miembros del equipo.', correct: false }
    ],
    explicacion: 'El Sprint Planning da inicio al Sprint. Todo el Scrum Team colabora para responder a tres preguntas: 1) ¿Por qué es valioso este Sprint? (Sprint Goal), 2) ¿Qué se puede hacer? (selección del Product Backlog), y 3) ¿Cómo se realizará? (desglose técnico en el Sprint Backlog).',
    tema: 'Ceremonias / Eventos',
    difficulty: 'Fundamento'
  },
  {
    id: 4,
    pregunta: '¿Cuál es el papel del Product Owner durante el Sprint?',
    opciones: [
      { text: 'Colaborar con el equipo para seleccionar elementos del Product Backlog para el Sprint.', correct: true },
      { text: 'Controlar la ejecución del Sprint y resolver impedimentos.', correct: false },
      { text: 'Asignar tareas específicas a los miembros del equipo.', correct: false },
      { text: 'Supervisar el trabajo diario del equipo y garantizar la calidad.', correct: false }
    ],
    explicacion: 'El Product Owner colabora estrechamente y de forma continua con los desarrolladores, clarificando dudas sobre los requisitos del negocio, refinando historias de usuario y negociando el alcance si fuese necesario para cumplir el objetivo acordado. El PO nunca asigna tareas ni resuelve impedimentos de proceso.',
    tema: 'Roles en Scrum',
    difficulty: 'Intermedio'
  },
  {
    id: 5,
    pregunta: '¿Cuál es el propósito del Sprint Retrospective?',
    opciones: [
      { text: 'Revisar y adaptar el trabajo y tácticas realizadas durante el Sprint.', correct: true },
      { text: 'Inspeccionar el Incremento para el Sprint.', correct: false },
      { text: 'Planificar el próximo Sprint.', correct: false },
      { text: 'Presentar el trabajo completado al Product Owner.', correct: false }
    ],
    explicacion: 'La Retrospectiva es la ceremonia dedicada a la mejora continua del equipo. Se analizan las relaciones interpersonales, los procesos de trabajo, la comunicación y las herramientas utilizadas, acordando mejoras operativas concretas que se aplicarán en el ciclo siguiente.',
    tema: 'Ceremonias / Eventos',
    difficulty: 'Fundamento'
  },
  {
    id: 6,
    pregunta: '¿Qué es un "Increment" en Scrum?',
    opciones: [
      { text: 'El producto final entregado al cliente.', correct: false },
      { text: 'La versión del software al final del proyecto.', correct: false },
      { text: 'La suma de todas las historias de usuario completadas durante el día.', correct: false },
      { text: 'Una versión potencialmente entregable del producto, construida durante un Sprint.', correct: true }
    ],
    explicacion: 'El Incremento es un artefacto formal de Scrum que reúne todos los elementos completados en el Sprint actual (que cumplen la Definition of Done) sumados al valor de los incrementos previos. Debe estar en un estado funcional, verificado y listo para ser puesto en producción.',
    tema: 'Artefactos & Calidad',
    difficulty: 'Intermedio'
  },
  {
    id: 7,
    pregunta: '¿Cuál es el propósito del Sprint Review?',
    opciones: [
      { text: 'Presentar el trabajo completado a las distintas partes y obtener retroalimentación.', correct: true },
      { text: 'Colaborar en la selección de elementos del Product Backlog para el próximo Sprint.', correct: false },
      { text: 'Inspeccionar el trabajo completado y adaptar el Product Backlog.', correct: false },
      { text: 'Evaluar el rendimiento individual de los miembros del equipo.', correct: false }
    ],
    explicacion: 'En la Sprint Review, el Scrum Team se reúne con los interesados clave (stakeholders y clientes) para inspeccionar el Incremento de software terminado. Se demuestra el funcionamiento real del producto y se recopila feedback directo para adaptar el Product Backlog futuro.',
    tema: 'Ceremonias / Eventos',
    difficulty: 'Fundamento'
  },
  {
    id: 8,
    pregunta: '¿Cuál es el papel del Scrum Master durante la Daily Scrum?',
    opciones: [
      { text: 'Facilitar la reunión y asegurar que se sigan las reglas de Scrum.', correct: true },
      { text: 'Asignar tareas específicas a los miembros del equipo.', correct: false },
      { text: 'Informar al equipo sobre las expectativas del Product Owner.', correct: false },
      { text: 'Tomar decisiones clave para el proyecto.', correct: false }
    ],
    explicacion: 'La función del Scrum Master es velar por que la reunión se produzca, que no supere el timebox de 15 minutos y que se mantenga el foco en la sincronización hacia el objetivo del Sprint, sin derivar en discusiones técnicas profundas o reportes de estado jerárquicos.',
    tema: 'Roles en Scrum',
    difficulty: 'Intermedio'
  },
  {
    id: 9,
    pregunta: '¿Qué es el "Definition of Done"?',
    opciones: [
      { text: 'Una lista de tareas que deben completarse durante el Sprint.', correct: false },
      { text: 'Una definición clara de lo que significa "terminado" para un incremento.', correct: true },
      { text: 'Una guía para el Product Owner sobre qué funcionalidades priorizar.', correct: false },
      { text: 'Una descripción de los objetivos del equipo para el próximo Sprint.', correct: false }
    ],
    explicacion: 'La Definición de Hecho (DoD) es un acuerdo formal de calidad compartido por todo el equipo. Establece las condiciones objetivas que debe verificar un elemento para considerarse terminado (ej. código revisado por pares, pruebas unitarias aprobadas, cobertura mínima alcanzada, integrado sin errores y documentado).',
    tema: 'Artefactos & Calidad',
    difficulty: 'Fundamento'
  },
  {
    id: 10,
    pregunta: 'Elige la idea más correcta acerca del Product Backlog:',
    opciones: [
      { text: 'Es responsabilidad del Scrum Master actualizarlo diariamente.', correct: false },
      { text: 'Es dinámico y puede cambiar en cualquier momento con la colaboración del equipo y el Product Owner.', correct: true },
      { text: 'Se mantiene estático durante todo el proyecto.', correct: false },
      { text: 'Solo el Product Owner tiene permiso para modificarlo.', correct: false }
    ],
    explicacion: 'El Product Backlog es un artefacto dinámico, vivo y en continua evolución (living artifact). Se adapta a medida que se aprende más sobre el mercado, las tecnologías y las necesidades de los usuarios. Aunque el Product Owner es el responsable último de priorizarlo, el equipo colabora continuamente en su refinamiento.',
    tema: 'Artefactos & Calidad',
    difficulty: 'Intermedio'
  }
];

export const SALA_ESTUDIO_FILES = [
  {
    id: 'github-backup',
    title: 'Guía de Backup y Resolución de Problemas en GitHub',
    path: '/acc/sala-estudio/github-backup-problemas.pdf',
    type: 'pdf',
    badge: 'PDF Oficial (273 KB)',
    desc: 'Protocolo de copias de seguridad de repositorios, resolución de incidencias en git push/pull, sincronización de ramas y contingencias en GitHub para equipos ágiles.'
  },
  {
    id: 'cuestionario-agile',
    title: 'Cuestionario de Metodologías Ágiles y Scrum',
    path: '/acc/sala-estudio/Cuestionarios/Metodologias Agiles/Cuestionario-Metodologias-Agiles.md',
    type: 'markdown',
    badge: '10 Preguntas + Resumen',
    desc: 'Preguntas oficiales de examen con respuestas explicadas, roles, eventos y tabla comparativa del marco Scrum.'
  },
  {
    id: 'cuestionario-spring',
    title: 'Cuestionario de Java & Spring Boot',
    path: '/acc/sala-estudio/Cuestionarios/Spring Boot/Cuestionario-Spring-Boot.md',
    type: 'markdown',
    badge: '45 Preguntas Técnicas',
    desc: 'Evaluación exhaustiva sobre REST, IoC, JPA, Validaciones, Testing con Mockito, Seguridad JWT y Docker.'
  },
  {
    id: 'video-intro',
    title: 'Vídeo: Introducción a Spring Boot & API REST',
    path: '/acc/sala-estudio/Spring_Boot_API_REST_introduccion.mp4',
    type: 'video',
    badge: 'Vídeo MP4 (45 MB)',
    desc: 'Grabación explicativa de la arquitectura Spring Boot y diseño de APIs RESTful.'
  }
];

export const GIT_AGILE_GUIDE = {
  title: 'Git & GitHub en Equipos Ágiles (Scrum & DevOps)',
  subtitle: 'Control de versiones como pilar fundamental de la Integración Continua (CI) y la Definición de Terminado (DoD)',
  pdfPath: '/acc/sala-estudio/github-backup-problemas.pdf',
  pdfName: 'github-backup-problemas.pdf',
  principios: [
    {
      titulo: 'Ramas Cortas & Feature Branching',
      icon: '🌿',
      desc: 'Cada Historia de Usuario del Sprint Backlog se desarrolla en su propia rama efímera (ej. `feature/US-102-filtro-libros`), que se integra rápidamente en la rama principal tras superar los tests.'
    },
    {
      titulo: 'Pull Requests como parte del DoD',
      icon: '🔍',
      desc: 'Ningún incremento se considera "Done" (Terminado) sin una Pull Request revisada y aprobada por al menos un compañero (Peer Review), con la suite de JUnit pasando al 100% en GitHub Actions.'
    },
    {
      titulo: 'Commits Semánticos & Trazabilidad',
      icon: '🏷️',
      desc: 'Mensajes de commit estructurados (`feat:`, `fix:`, `test:`, `docs:`) que referencian el identificador de la tarea para garantizar una auditoría clara del trabajo en cada Daily y Sprint Review.'
    },
    {
      titulo: 'Respaldo & Plan de Contingencia',
      icon: '💾',
      desc: 'Los entornos locales de los desarrolladores son volátiles. Mantener el repositorio remoto sincronizado en GitHub y disponer de backups periódicos previene la pérdida de trabajo crítico del Sprint.'
    }
  ],
  comandosFrecuentes: [
    { cmd: 'git checkout -b feature/US-XXX', desc: 'Crear y cambiar a una rama de funcionalidad aislada para la tarea del Sprint.' },
    { cmd: 'git pull origin main --rebase', desc: 'Actualizar la rama de trabajo con los últimos cambios del equipo sin generar commits de merge redundantes.' },
    { cmd: 'git stash save "wip"', desc: 'Guardar temporalmente cambios en progreso para atender un bug prioritario o cambiar de rama limpiamente.' },
    { cmd: 'git merge --abort', desc: 'Cancelar un merge conflictivo y devolver el repositorio al estado seguro previo.' }
  ]
};
