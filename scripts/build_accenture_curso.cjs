const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const extraDataPath = path.join(projectRoot, 'public/data/extra');
const docsPath = path.join(projectRoot, 'public/documents/ejercicios_acc');

const activitiesRaw = JSON.parse(
  fs.readFileSync(path.join(extraDataPath, 'accenture_actividades.json'), 'utf8')
);

const reflexionesPath = path.join(extraDataPath, 'accenture_reflexiones.json');
const reflexionesRaw = fs.existsSync(reflexionesPath)
  ? JSON.parse(fs.readFileSync(reflexionesPath, 'utf8'))
  : {};

const modulesConfig = [
  {
    moduleTitle: 'Bloque 1: Inversión de Control (IoC & DI)',
    temaTitle: 'Contenedor y Dependencias',
    temaNum: '1',
    actNums: [1, 2]
  },
  {
    moduleTitle: 'Bloque 1: Inversión de Control (IoC & DI)',
    temaTitle: 'Configuración de Beans',
    temaNum: '2',
    actNums: [3, 4]
  },
  {
    moduleTitle: 'Bloque 2: Arquitectura Web & REST APIs',
    temaTitle: 'Setup y Controladores',
    temaNum: '3',
    actNums: [5, 6]
  },
  {
    moduleTitle: 'Bloque 2: Arquitectura Web & REST APIs',
    temaTitle: 'Capa de Servicio y Negocio',
    temaNum: '4',
    actNums: [7]
  },
  {
    moduleTitle: 'Bloque 3: Persistencia & Modelado JPA',
    temaTitle: 'Entidades y Repositorios',
    temaNum: '5',
    actNums: [8, 9]
  },
  {
    moduleTitle: 'Bloque 4: DTOs, Validaciones, Errores & OpenAPI',
    temaTitle: 'Robustez & Documentación de APIs REST',
    temaNum: '6',
    actNums: [10, 11, 12, 13]
  }
];

const cursoTopics = [];

let topicCounter = {};

activitiesRaw.forEach(act => {
  // Encontrar el bloque correspondiente
  const modConf = modulesConfig.find(m => m.actNums.includes(act.numero)) || {
    moduleTitle: 'Bloque Práctico: Spring Boot',
    temaTitle: act.category || 'Retos Prácticos',
    temaNum: '1'
  };

  if (!topicCounter[modConf.temaNum]) {
    topicCounter[modConf.temaNum] = 1;
  }
  const subNum = topicCounter[modConf.temaNum]++;
  const topicNum = `${modConf.temaNum}.${subNum}`;

  // Leer el enunciado markdown si existe
  let enunciadoContent = '';
  if (act.enunciadoFile) {
    const fullDocPath = path.join(projectRoot, 'public', act.enunciadoFile);
    if (fs.existsSync(fullDocPath)) {
      enunciadoContent = fs.readFileSync(fullDocPath, 'utf8');
      // Quitar el primer H1 (# Actividad ...) si ya se va a mostrar en el título
      enunciadoContent = enunciadoContent.replace(/^#\s+[^\n]+\n+/, '');
    }
  }

  if (!enunciadoContent) {
    enunciadoContent = `> ⏳ **Enunciado oficial en preparación.**\n\n${act.resumen || 'Próximamente disponible en el campus.'}`;
  }

  cursoTopics.push({
    id: `act-${String(act.numero).padStart(2, '0')}`,
    numero: act.numero,
    title: act.shortTitle ? `Actividad ${act.shortTitle}` : act.title,
    slug: act.slug,
    proyecto: act.proyecto || 'taskmanager',
    category: act.category || 'Spring Boot',
    dueDate: act.dueDate || '2026-11-03',
    l2eUrl: act.l2eUrl || '',
    moduleTitle: modConf.moduleTitle,
    temaTitle: modConf.temaTitle,
    topicNum: topicNum,
    contentMd: enunciadoContent.trim(),
    solucionDoc: act.solucionDoc || '',
    notebook: reflexionesRaw[act.slug] || null
  });
});

const outputPath = path.join(extraDataPath, 'accenture_actividades_curso.json');
fs.writeFileSync(outputPath, JSON.stringify(cursoTopics, null, 2), 'utf8');

console.log(`✅ Creado correctamente ${outputPath} con ${cursoTopics.length} actividades en formato lección.`);
