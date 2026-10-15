// scripts/generate_entornos_content.cjs
const fs = require('fs');
const path = require('path');

const dataU1 = require('./data_u1.cjs');
const dataU2 = require('./data_u2.cjs');

const ENTORNOS_JSON_PATH = path.join(__dirname, '../public/data/ioc/lecciones/entornos.json');
const rawData = JSON.parse(fs.readFileSync(ENTORNOS_JSON_PATH, 'utf8'));

// Extraemos los temas de Unidad 3 existentes y los normalizamos
const rawU3 = rawData.filter(d => d.moduleId === 'u3');

// Mapeo preciso de Unidad 3 a Temas 9, 10, 11 y 12
const u3Mappings = [
  // Overview
  { id: 'u3-overview', topicNum: null, title: 'Introducción a la Unidad', temaTitle: 'Introducción' },

  // Tema 9
  { id: 'u3-b1', topicNum: '9.1', title: 'Introducción', temaTitle: 'Tema 9: Pruebas y evidencias' },
  { id: 'u3-b2', topicNum: '9.2', title: 'Probar es buscar evidencias', temaTitle: 'Tema 9: Pruebas y evidencias' },
  { id: 'u3-b3', topicNum: '9.3', title: 'Mapa de los tipos de pruebas', temaTitle: 'Tema 9: Pruebas y evidencias' },
  { id: 'u3-b4', topicNum: '9.4', title: '¿Qué debe contener un caso de prueba?', temaTitle: 'Tema 9: Pruebas y evidencias' },
  { id: 'u3-b5', topicNum: '9.5', title: 'Clases de equivalencia', temaTitle: 'Tema 9: Pruebas y evidencias' },
  { id: 'u3-b6', topicNum: '9.6', title: 'Valores límite y casos representativos', temaTitle: 'Tema 9: Pruebas y evidencias' },
  { id: 'u3-b7', topicNum: '9.7', title: 'Caja blanca, flujo de control y McCabe', temaTitle: 'Tema 9: Pruebas y evidencias' },

  // Tema 10
  { id: 'u3-b8', topicNum: '10.1', title: 'Introducción', temaTitle: 'Tema 10: JUnit 5 y depuración' },
  { id: 'u3-b9', topicNum: '10.2', title: 'Del caso de prueba al test automático', temaTitle: 'Tema 10: JUnit 5 y depuración' },
  { id: 'u3-b10', topicNum: '10.3', title: 'Crear una clase JUnit 5 en Eclipse', temaTitle: 'Tema 10: JUnit 5 y depuración' },
  { id: 'u3-b11', topicNum: '10.4', title: 'Assertions: comprobar resultados y excepciones', temaTitle: 'Tema 10: JUnit 5 y depuración' },
  { id: 'u3-b12', topicNum: '10.5', title: 'Una batería de pruebas legible', temaTitle: 'Tema 10: JUnit 5 y depuración' },
  { id: 'u3-b13', topicNum: '10.6', title: 'Depurar: detener, observar y avanzar', temaTitle: 'Tema 10: JUnit 5 y depuración' },
  { id: 'u3-b14', topicNum: '10.7', title: 'Del fallo a una incidencia reproducible', temaTitle: 'Tema 10: JUnit 5 y depuración' },

  // Tema 11
  { id: 'u3-b15', topicNum: '11.1', title: 'Introducción', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b16', topicNum: '11.2', title: 'Refaccionar no es añadir funcionalidades', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b17', topicNum: '11.3', title: 'Patrones de refacción más útiles', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b18', topicNum: '11.4', title: 'Un ejemplo de refacción paso a paso', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b19', topicNum: '11.5', title: 'La red de seguridad: probar antes y después', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b20', topicNum: '11.6', title: 'Analizar el código antes de que falle', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b21', topicNum: '11.7', title: 'Asistentes de IA: propuesta, criterio y verificación', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b22', topicNum: '11.8', title: 'Un prompt útil tiene un criterio verificable', temaTitle: 'Tema 11: Refactorización y calidad' },
  { id: 'u3-b23', topicNum: '11.9', title: 'Javadoc: del comentario a la documentación HTML', temaTitle: 'Tema 11: Refactorización y calidad' },

  // Tema 12
  { id: 'u3-b24', topicNum: '12.1', title: 'Introducción', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b25', topicNum: '12.2', title: 'El modelo mental de Git', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b26', topicNum: '12.3', title: 'Inicializar, añadir, revisar y confirmar', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b27', topicNum: '12.4', title: 'Ramas y HEAD', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b28', topicNum: '12.5', title: 'Fusionar: cuando Git sólo avanza el puntero', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b29', topicNum: '12.6', title: 'Resolver no significa escoger un lado a ciegas', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b30', topicNum: '12.7', title: '.gitignore: qué no debe entrar en el repositorio', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b31', topicNum: '12.8', title: 'GitHub y GitHub desde Eclipse', temaTitle: 'Tema 12: Control de versiones con Git' },
  { id: 'u3-b32', topicNum: '12.9', title: 'Práctica guiada de principio a fin', temaTitle: 'Tema 12: Control de versiones con Git' },
];

const cleanU3 = rawU3.map((item, idx) => {
  const mapping = u3Mappings[idx] || {};
  let cleanSlug = item.slug.replace(/0$/, '').replace('mdental', 'mental');
  
  return {
    ...item,
    moduleTitle: 'Unidad 3: Pruebas, optimización y documentación del software (RA3 y RA4)',
    topicNum: mapping.topicNum !== undefined ? mapping.topicNum : item.topicNum,
    title: mapping.title || item.title,
    temaTitle: mapping.temaTitle || item.temaTitle,
    slug: cleanSlug
  };
});

// Unimos U1, U2 y U3
const allTopics = [...dataU1, ...dataU2, ...cleanU3];

// Enlazamos la cadena continua de prevSlug y nextSlug
for (let i = 0; i < allTopics.length; i++) {
  allTopics[i].prevSlug = i > 0 ? allTopics[i - 1].slug : undefined;
  allTopics[i].nextSlug = i < allTopics.length - 1 ? allTopics[i + 1].slug : undefined;
}

// Guardamos en entornos.json
fs.writeFileSync(ENTORNOS_JSON_PATH, JSON.stringify(allTopics, null, 2), 'utf8');
console.log(`✅ entornos.json actualizado con éxito: Total ${allTopics.length} temas.`);
console.log(`  - U1 (Temas 1 a 4): ${dataU1.length} temas`);
console.log(`  - U2 (Temas 5 a 8): ${dataU2.length} temas`);
console.log(`  - U3 (Temas 9 a 12): ${cleanU3.length} temas`);
