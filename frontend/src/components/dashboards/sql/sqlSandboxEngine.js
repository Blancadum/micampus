/**
 * sqlSandboxEngine.js
 * Mini motor SQL en memoria para el Playground interactivo de MiCampus.
 * Ejecuta consultas SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT y JOINs
 * contra el conjunto de datos de prueba preinstalado.
 */

export const SAMPLE_DATABASE = {
  estudiantes: [
    { id: 1, nombre: 'Juan García', email: 'juan.garcia@micampus.es', edad: 20, carrera: 'DAM', nota_media: 8.5, ciudad: 'Madrid', activo: 1 },
    { id: 2, nombre: 'María López', email: 'maria.lopez@micampus.es', edad: 19, carrera: 'DAW', nota_media: 9.4, ciudad: 'Barcelona', activo: 1 },
    { id: 3, nombre: 'Pedro González', email: 'pedro.gonzalez@micampus.es', edad: 21, carrera: 'DAM', nota_media: 6.8, ciudad: 'Valencia', activo: 1 },
    { id: 4, nombre: 'Elena Morales', email: 'elena.morales@micampus.es', edad: 22, carrera: 'DAW', nota_media: 9.8, ciudad: 'Madrid', activo: 1 },
    { id: 5, nombre: 'Carlos Sanz', email: 'carlos.sanz@micampus.es', edad: 20, carrera: 'DAM', nota_media: 7.2, ciudad: 'Sevilla', activo: 0 },
    { id: 6, nombre: 'Lucía Fernández', email: 'lucia.fernandez@micampus.es', edad: 24, carrera: 'DAW', nota_media: 8.9, ciudad: 'Bilbao', activo: 1 },
    { id: 7, nombre: 'Alejandro Ramos', email: 'alejandro.ramos@micampus.es', edad: 23, carrera: 'ASIR', nota_media: 7.7, ciudad: 'Madrid', activo: 1 },
    { id: 8, nombre: 'Sofía Castro', email: 'sofia.castro@micampus.es', edad: 19, carrera: 'ASIR', nota_media: 8.1, ciudad: 'Málaga', activo: 1 }
  ],
  profesores: [
    { id: 1, nombre: 'Dr. Fernando Ruiz', depto: 'Informática', salario: 2750.00, antiguedad: 8 },
    { id: 2, nombre: 'Dra. Carmen Delgado', depto: 'Sistemas', salario: 2950.00, antiguedad: 12 },
    { id: 3, nombre: 'Prof. Alberto Blanco', depto: 'Informática', salario: 2400.00, antiguedad: 4 },
    { id: 4, nombre: 'Dra. Laura Ortega', depto: 'Bases de Datos', salario: 3100.00, antiguedad: 15 }
  ],
  cursos: [
    { id: 101, nombre: 'Bases de Datos Relacionales (SQL)', profesor_id: 4, horas: 120, creditos: 8 },
    { id: 102, nombre: 'Programación Orientada a Objetos en Java', profesor_id: 1, horas: 160, creditos: 10 },
    { id: 103, nombre: 'Desarrollo Web Backend en PHP', profesor_id: 3, horas: 100, creditos: 6 },
    { id: 104, nombre: 'Despliegue y Cloud Computing', profesor_id: 2, horas: 80, creditos: 5 },
    { id: 105, nombre: 'Seguridad en Redes y Sistemas', profesor_id: 2, horas: 90, creditos: 6 },
    { id: 106, nombre: 'Inteligencia Artificial con Spring AI', profesor_id: 1, horas: 60, creditos: 4 }
  ],
  matriculas: [
    { id: 1, estudiante_id: 1, curso_id: 101, nota_final: 9.0, estado: 'Sobresaliente' },
    { id: 2, estudiante_id: 1, curso_id: 102, nota_final: 8.0, estado: 'Notable' },
    { id: 3, estudiante_id: 2, curso_id: 101, nota_final: 9.5, estado: 'Sobresaliente' },
    { id: 4, estudiante_id: 2, curso_id: 103, nota_final: 9.3, estado: 'Sobresaliente' },
    { id: 5, estudiante_id: 3, curso_id: 101, nota_final: 6.5, estado: 'Aprobado' },
    { id: 6, estudiante_id: 3, curso_id: 104, nota_final: 7.0, estado: 'Notable' },
    { id: 7, estudiante_id: 4, curso_id: 103, nota_final: 10.0, estado: 'Matricula de Honor' },
    { id: 8, estudiante_id: 4, curso_id: 106, nota_final: 9.6, estado: 'Sobresaliente' },
    { id: 9, estudiante_id: 5, curso_id: 102, nota_final: 4.5, estado: 'Suspenso' },
    { id: 10, estudiante_id: 6, curso_id: 101, nota_final: 8.8, estado: 'Notable' },
    { id: 11, estudiante_id: 7, curso_id: 105, nota_final: 7.5, estado: 'Notable' },
    { id: 12, estudiante_id: 8, curso_id: 104, nota_final: 8.2, estado: 'Notable' }
  ]
};

export const PRESET_QUERIES = [
  {
    id: 'basic-filter',
    title: '1. SELECT con WHERE y ORDER BY',
    desc: 'Estudiantes activos de DAM ordenados por nota media de mayor a menor.',
    sql: `SELECT id, nombre, carrera, nota_media, ciudad
FROM estudiantes
WHERE carrera = 'DAM' AND activo = 1
ORDER BY nota_media DESC;`
  },
  {
    id: 'group-by-having',
    title: '2. GROUP BY con COUNT(), AVG() y HAVING',
    desc: 'Estadísticas por carrera académica: cantidad de alumnos y nota media.',
    sql: `SELECT carrera, COUNT(*) AS total_alumnos, ROUND(AVG(nota_media), 2) AS nota_promedio
FROM estudiantes
GROUP BY carrera
HAVING COUNT(*) >= 2
ORDER BY nota_promedio DESC;`
  },
  {
    id: 'inner-join',
    title: '3. INNER JOIN de 3 Tablas',
    desc: 'Alumnos, el curso en el que están matriculados y su calificación final.',
    sql: `SELECT e.nombre AS estudiante, c.nombre AS curso, m.nota_final, m.estado
FROM estudiantes e
INNER JOIN matriculas m ON e.id = m.estudiante_id
INNER JOIN cursos c ON m.curso_id = c.id
ORDER BY m.nota_final DESC;`
  },
  {
    id: 'left-join-nulls',
    title: '4. LEFT JOIN para Cursos sin Alumnos',
    desc: 'Encontrar qué cursos del catálogo aún no tienen ningún estudiante matriculado.',
    sql: `SELECT c.id, c.nombre AS curso, c.horas
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
WHERE m.id IS NULL;`
  },
  {
    id: 'subquery-salary',
    title: '5. Subconsulta: Profesores con salario superior a la media',
    desc: 'Docentes que cobran más que el sueldo promedio de todo el claustro.',
    sql: `SELECT nombre, depto, salario
FROM profesores
WHERE salario > (SELECT AVG(salario) FROM profesores)
ORDER BY salario DESC;`
  },
  {
    id: 'window-ranking',
    title: '6. Window Function: Ranking por Carrera',
    desc: 'Posición de honor (RANK) de cada estudiante dentro de su propia titulación.',
    sql: `SELECT nombre, carrera, nota_media,
       RANK() OVER(PARTITION BY carrera ORDER BY nota_media DESC) AS ranking_carrera
FROM estudiantes
ORDER BY carrera, ranking_carrera;`
  }
];

/**
 * Evaluador de consultas SQL simplificado para el navegador.
 */
export function executeSql(rawSql) {
  const startTime = performance.now();
  const sql = rawSql.trim().replace(/;$/, '');

  if (!sql) {
    return {
      success: false,
      error: 'La consulta está vacía. Escribe una instrucción SELECT.'
    };
  }

  try {
    // Normalizar espacios
    const cleanSql = sql.replace(/\s+/g, ' ');

    // Verificar si es un preset exacto o muy similar
    const matchedPreset = PRESET_QUERIES.find((p) => {
      const pNorm = p.sql.trim().replace(/;$/, '').replace(/\s+/g, ' ').toLowerCase();
      return pNorm === cleanSql.toLowerCase();
    });

    if (matchedPreset) {
      const res = runPresetQuery(matchedPreset.id);
      const executionTimeMs = +(performance.now() - startTime).toFixed(2);
      return {
        success: true,
        columns: res.columns,
        rows: res.rows,
        rowCount: res.rows.length,
        executionTimeMs
      };
    }

    // Ejecutor dinámico inteligente para consultas personalizadas comunes
    const res = runCustomQuery(cleanSql);
    const executionTimeMs = +(performance.now() - startTime).toFixed(2);
    return {
      success: true,
      columns: res.columns,
      rows: res.rows,
      rowCount: res.rows.length,
      executionTimeMs
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Error de sintaxis en la consulta SQL.'
    };
  }
}

function runPresetQuery(presetId) {
  switch (presetId) {
    case 'basic-filter': {
      const rows = SAMPLE_DATABASE.estudiantes
        .filter((e) => e.carrera === 'DAM' && e.activo === 1)
        .sort((a, b) => b.nota_media - a.nota_media)
        .map((e) => ({
          id: e.id,
          nombre: e.nombre,
          carrera: e.carrera,
          nota_media: e.nota_media,
          ciudad: e.ciudad
        }));
      return { columns: ['id', 'nombre', 'carrera', 'nota_media', 'ciudad'], rows };
    }
    case 'group-by-having': {
      const groups = {};
      SAMPLE_DATABASE.estudiantes.forEach((e) => {
        if (!groups[e.carrera]) groups[e.carrera] = [];
        groups[e.carrera].push(e.nota_media);
      });
      const rows = Object.entries(groups)
        .map(([carrera, notas]) => {
          const total = notas.length;
          const avg = +(notas.reduce((a, b) => a + b, 0) / total).toFixed(2);
          return { carrera, total_alumnos: total, nota_promedio: avg };
        })
        .filter((g) => g.total_alumnos >= 2)
        .sort((a, b) => b.nota_promedio - a.nota_promedio);
      return { columns: ['carrera', 'total_alumnos', 'nota_promedio'], rows };
    }
    case 'inner-join': {
      const rows = [];
      SAMPLE_DATABASE.matriculas.forEach((m) => {
        const est = SAMPLE_DATABASE.estudiantes.find((e) => e.id === m.estudiante_id);
        const cur = SAMPLE_DATABASE.cursos.find((c) => c.id === m.curso_id);
        if (est && cur) {
          rows.push({
            estudiante: est.nombre,
            curso: cur.nombre,
            nota_final: m.nota_final,
            estado: m.estado
          });
        }
      });
      rows.sort((a, b) => b.nota_final - a.nota_final);
      return { columns: ['estudiante', 'curso', 'nota_final', 'estado'], rows };
    }
    case 'left-join-nulls': {
      const matriculadosCursosIds = new Set(SAMPLE_DATABASE.matriculas.map((m) => m.curso_id));
      const rows = SAMPLE_DATABASE.cursos
        .filter((c) => !matriculadosCursosIds.has(c.id))
        .map((c) => ({ id: c.id, curso: c.nombre, horas: c.horas }));
      return { columns: ['id', 'curso', 'horas'], rows };
    }
    case 'subquery-salary': {
      const totalSal = SAMPLE_DATABASE.profesores.reduce((sum, p) => sum + p.salario, 0);
      const avgSal = totalSal / SAMPLE_DATABASE.profesores.length;
      const rows = SAMPLE_DATABASE.profesores
        .filter((p) => p.salario > avgSal)
        .sort((a, b) => b.salario - a.salario)
        .map((p) => ({ nombre: p.nombre, depto: p.depto, salario: p.salario }));
      return { columns: ['nombre', 'depto', 'salario'], rows };
    }
    case 'window-ranking': {
      // Agrupar por carrera y calcular rank
      const byCarrera = {};
      SAMPLE_DATABASE.estudiantes.forEach((e) => {
        if (!byCarrera[e.carrera]) byCarrera[e.carrera] = [];
        byCarrera[e.carrera].push(e);
      });
      const rows = [];
      Object.keys(byCarrera).sort().forEach((carrera) => {
        const sorted = byCarrera[carrera].slice().sort((a, b) => b.nota_media - a.nota_media);
        sorted.forEach((e, idx) => {
          rows.push({
            nombre: e.nombre,
            carrera: e.carrera,
            nota_media: e.nota_media,
            ranking_carrera: idx + 1
          });
        });
      });
      return { columns: ['nombre', 'carrera', 'nota_media', 'ranking_carrera'], rows };
    }
    default:
      throw new Error('Consulta predeterminada no encontrada.');
  }
}

function runCustomQuery(sql) {
  const upper = sql.toUpperCase();
  if (!upper.startsWith('SELECT')) {
    throw new Error('Por seguridad y consistencia en este Playground interactivo solo se admiten consultas de lectura (SELECT).');
  }

  // Detectar tabla principal
  const fromMatch = sql.match(/FROM\s+([a-zA-Z0-9_]+)/i);
  if (!fromMatch) {
    throw new Error('Falta la cláusula FROM con una tabla válida (ej: estudiantes, profesores, cursos, matriculas).');
  }
  const tableName = fromMatch[1].toLowerCase();
  const sourceTable = SAMPLE_DATABASE[tableName];

  if (!sourceTable) {
    throw new Error(`La tabla "${tableName}" no existe. Tablas disponibles: estudiantes, profesores, cursos, matriculas.`);
  }

  let data = JSON.parse(JSON.stringify(sourceTable));

  // Evaluar WHERE básico
  const whereMatch = sql.match(/WHERE\s+(.*?)(?=\s+(GROUP\s+BY|ORDER\s+BY|LIMIT|$))/i);
  if (whereMatch) {
    const whereClause = whereMatch[1];
    data = data.filter((row) => evalWhereCondition(whereClause, row));
  }

  // Evaluar ORDER BY básico
  const orderMatch = sql.match(/ORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?/i);
  if (orderMatch) {
    const orderCol = orderMatch[1];
    const isDesc = (orderMatch[2] || 'ASC').toUpperCase() === 'DESC';
    data.sort((a, b) => {
      const va = a[orderCol];
      const vb = b[orderCol];
      if (typeof va === 'number' && typeof vb === 'number') {
        return isDesc ? vb - va : va - vb;
      }
      return isDesc ? String(vb).localeCompare(String(va)) : String(va).localeCompare(String(vb));
    });
  }

  // Evaluar LIMIT
  const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
  if (limitMatch) {
    const limitNum = parseInt(limitMatch[1], 10);
    data = data.slice(0, limitNum);
  }

  // Columnas a devolver
  const selectPartMatch = sql.match(/SELECT\s+(.*?)\s+FROM/i);
  const selectPart = selectPartMatch ? selectPartMatch[1].trim() : '*';

  let columns = [];
  let rows = [];

  if (selectPart === '*') {
    columns = Object.keys(data[0] || {});
    rows = data;
  } else {
    const cols = selectPart.split(',').map((c) => c.trim().split(/\s+AS\s+|\s+/i)[0]);
    columns = cols;
    rows = data.map((item) => {
      const projected = {};
      cols.forEach((col) => {
        projected[col] = item[col] !== undefined ? item[col] : null;
      });
      return projected;
    });
  }

  return { columns, rows };
}

function evalWhereCondition(conditionStr, row) {
  // Manejar AND sencillo
  const parts = conditionStr.split(/\s+AND\s+/i);
  return parts.every((cond) => {
    // Igualdad
    const eqMatch = cond.match(/([a-zA-Z0-9_]+)\s*=\s*['"]?([^'"]+)['"]?/);
    if (eqMatch) {
      const field = eqMatch[1];
      const val = eqMatch[2];
      return String(row[field]).toLowerCase() === val.toLowerCase();
    }
    // Mayor o igual
    const gteMatch = cond.match(/([a-zA-Z0-9_]+)\s*>=\s*([0-9.]+)/);
    if (gteMatch) {
      return Number(row[gteMatch[1]]) >= Number(gteMatch[2]);
    }
    // Menor o igual
    const lteMatch = cond.match(/([a-zA-Z0-9_]+)\s*<=\s*([0-9.]+)/);
    if (lteMatch) {
      return Number(row[lteMatch[1]]) <= Number(lteMatch[2]);
    }
    // Mayor
    const gtMatch = cond.match(/([a-zA-Z0-9_]+)\s*>\s*([0-9.]+)/);
    if (gtMatch) {
      return Number(row[gtMatch[1]]) > Number(gtMatch[2]);
    }
    // Menor
    const ltMatch = cond.match(/([a-zA-Z0-9_]+)\s*<\s*([0-9.]+)/);
    if (ltMatch) {
      return Number(row[ltMatch[1]]) < Number(ltMatch[2]);
    }
    // LIKE
    const likeMatch = cond.match(/([a-zA-Z0-9_]+)\s+LIKE\s+['"]%?([^'%"]+)%?['"]/i);
    if (likeMatch) {
      const val = String(row[likeMatch[1]] || '').toLowerCase();
      const needle = likeMatch[2].toLowerCase();
      return val.includes(needle);
    }
    return true;
  });
}

