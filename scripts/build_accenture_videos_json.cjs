const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../public/documents/videos_accenture');
const outputJson = path.resolve(__dirname, '../public/data/extra/accenture_videos_teoria.json');

const modulesConfig = [
  {
    file: 'modulo_0-intro.md',
    moduleId: 'mod0',
    moduleShort: 'Módulo 0',
    moduleTitle: 'Módulo 0: Fundamentos del Desarrollo Web',
    slugPrefix: '0-',
    sections: [
      {
        num: '0.0',
        id: 'v0-0-intro',
        slug: '0-0-intro-fundamentos-web',
        title: 'Módulo 0 · Introducción a los Fundamentos Web',
        temaTitle: 'Visión General'
      },
      {
        num: '0.1',
        id: 'v0-1-arquitectura-http',
        slug: '0-1-arquitectura-y-protocolos-http',
        title: '1. Arquitectura y Protocolos HTTP/HTTPS',
        temaTitle: 'Protocolos & Red'
      },
      {
        num: '0.2',
        id: 'v0-2-json-jackson',
        slug: '0-2-intercambio-de-datos-json-jackson',
        title: '2. Intercambio de Datos: JSON & Jackson',
        temaTitle: 'Formatos de Datos'
      },
      {
        num: '0.3',
        id: 'v0-3-jakarta-ee',
        slug: '0-3-ecosistema-java-web-jakarta-ee',
        title: '3. Ecosistema Java Web: Jakarta EE vs Spring',
        temaTitle: 'Estándares Empresariales'
      },
      {
        num: '0.4',
        id: 'v0-4-maven-lombok',
        slug: '0-4-herramientas-maven-lombok',
        title: '4. Herramientas: Maven & Lombok',
        temaTitle: 'Entorno de Desarrollo'
      }
    ]
  },
  {
    file: 'modulo_1.md',
    moduleId: 'mod1',
    moduleShort: 'Módulo 1',
    moduleTitle: 'Módulo 1: Fundamentos de Spring Framework (Core)',
    slugPrefix: '1-',
    sections: [
      {
        num: '1.0',
        id: 'v1-0-intro',
        slug: '1-0-intro-core-spring',
        title: 'Módulo 1 · Introducción al Core de Spring Framework',
        temaTitle: 'Visión General'
      },
      {
        num: '1.1',
        id: 'v1-1-arquitectura-modular',
        slug: '1-1-arquitectura-modular-core-spring',
        title: '1. Arquitectura Modular de Spring Framework (Core)',
        temaTitle: 'Arquitectura Modular'
      },
      {
        num: '1.2',
        id: 'v1-2-ioc-contenedor',
        slug: '1-2-inversion-de-control-ioc-contenedor',
        title: '2. Inversión de Control (IoC) y el Contenedor de Spring',
        temaTitle: 'Contenedor IoC'
      },
      {
        num: '1.3',
        id: 'v1-3-inyeccion-dependencias',
        slug: '1-3-inyeccion-de-dependencias-di-estrategias',
        title: '3. Inyección de Dependencias (DI): Mecanismos y Estrategias',
        temaTitle: 'Inyección de Dependencias'
      },
      {
        num: '1.4',
        id: 'v1-4-ciclo-vida-scopes',
        slug: '1-4-ciclo-de-vida-y-scopes-beans',
        title: '4. Ciclo de Vida y Alcances de los Beans (Scopes)',
        temaTitle: 'Ciclo de Vida & Scopes'
      },
      {
        num: '1.5',
        id: 'v1-5-java-annotations',
        slug: '1-5-configuracion-java-annotations-clases',
        title: '5. Configuración con Java Annotations y Clases Java',
        temaTitle: 'Anotaciones & Java Config'
      },
      {
        num: '1.6',
        id: 'v1-6-guia-vscode',
        slug: '1-6-guia-flujo-trabajo-vscode',
        title: '6. Guía Práctica de Flujo de Trabajo en Visual Studio Code',
        temaTitle: 'Entorno de Desarrollo'
      }
    ]
  },
  {
    file: 'modulo2.md',
    moduleId: 'mod2',
    moduleShort: 'Módulo 2',
    moduleTitle: 'Módulo 2: Desarrollo & Capas con Spring Boot',
    slugPrefix: '2-',
    sections: [
      {
        num: '2.0',
        id: 'v2-0-intro',
        slug: '2-0-intro-desarrollo-spring-boot',
        title: 'Módulo 2 · Introducción a Spring Boot & Capas',
        temaTitle: 'Visión General'
      },
      {
        num: '2.1',
        id: 'v2-1-arquitectura-capas',
        slug: '2-1-arquitectura-por-capas-spring-boot',
        title: '1. Arquitectura por Capas en Spring Boot',
        temaTitle: 'Arquitectura por Capas'
      },
      {
        num: '2.2',
        id: 'v2-2-principios-solid',
        slug: '2-2-principios-diseno-solid',
        title: '2. Principios de Diseño Orientado a Objetos: SOLID',
        temaTitle: 'Buenas Prácticas & SOLID'
      },
      {
        num: '2.3',
        id: 'v2-3-estructura-spring-boot',
        slug: '2-3-introduccion-estructura-app-spring-boot',
        title: '3. Introducción y Estructura de una Aplicación Spring Boot',
        temaTitle: 'Estructura & APIs'
      }
    ]
  }
];

const topics = [];

for (const mod of modulesConfig) {
  const filePath = path.join(baseDir, mod.file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  
  // Split content by "## " headers
  const parts = rawContent.split(/\n(?=## \d+\. )/);
  
  // The first part is the intro up to the first ## 1.
  const introContent = parts[0].trim();
  
  topics.push({
    id: mod.sections[0].id,
    title: mod.sections[0].title,
    slug: mod.sections[0].slug,
    moduleId: mod.moduleId,
    moduleShort: mod.moduleShort,
    moduleTitle: mod.moduleTitle,
    temaTitle: mod.sections[0].temaTitle,
    topicNum: mod.sections[0].num,
    category: 'Vídeos Recomendados Accenture',
    contentMd: introContent
  });

  // Remaining parts correspond to ## 1., ## 2., etc.
  for (let i = 1; i < parts.length; i++) {
    const secConfig = mod.sections[i];
    if (!secConfig) continue;
    
    topics.push({
      id: secConfig.id,
      title: secConfig.title,
      slug: secConfig.slug,
      moduleId: mod.moduleId,
      moduleShort: mod.moduleShort,
      moduleTitle: mod.moduleTitle,
      temaTitle: secConfig.temaTitle,
      topicNum: secConfig.num,
      category: 'Vídeos Recomendados Accenture',
      contentMd: parts[i].trim()
    });
  }
}

// Format nicely
fs.writeFileSync(outputJson, JSON.stringify(topics, null, 2), 'utf-8');
console.log(`Generated ${topics.length} topics into ${outputJson}`);
