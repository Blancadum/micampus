import React, { useState } from 'react';

export default function SqlInteractiveChallenges({ onOpenSandbox }) {
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [activeHint, setActiveHint] = useState({});

  const challenges = [
    {
      id: 'reto-1-segundo-salario',
      num: 'Reto 1',
      title: 'Encontrar el 2º salario más alto de la empresa',
      level: 'Intermedio',
      badgeClass: 'intermediate',
      company: 'Pregunta recurrente en Amazon, Glovo y Telefónica',
      problem: `Dada una tabla 'empleados' (id, nombre, salario), escribe una consulta SQL que devuelva exactamente el segundo salario más alto registrado, evitando que salarios repetidos distorsionen el resultado.`,
      hint: 'Puedes resolverlo con subconsulta usando MAX() o mediante DISTINCT + ORDER BY + LIMIT 1 OFFSET 1.',
      solutionSql: `-- Método 1: Estándar y portable con subconsulta (Evita empates)
SELECT MAX(salario) AS segundo_salario
FROM empleados
WHERE salario < (SELECT MAX(salario) FROM empleados);

-- Método 2: Paginación moderna con LIMIT y OFFSET
SELECT DISTINCT salario AS segundo_salario
FROM empleados
ORDER BY salario DESC
LIMIT 1 OFFSET 1;

-- Método 3: Con Window Function (Ideal para MySQL 8 / PostgreSQL)
WITH SalariosRankeados AS (
    SELECT salario, DENSE_RANK() OVER(ORDER BY salario DESC) as ranking
    FROM empleados
)
SELECT DISTINCT salario AS segundo_salario
FROM SalariosRankeados
WHERE ranking = 2;`,
      explanation: `El truco de esta pregunta de entrevista radica en usar DISTINCT o DENSE_RANK(): si dos personas ganan 5000 € y la siguiente 4200 €, un simple 'LIMIT 1 OFFSET 1' sin DISTINCT devolvería de nuevo 5000 € en lugar del segundo valor real.`
    },
    {
      id: 'reto-2-sin-pedidos',
      num: 'Reto 2',
      title: 'Clientes que NUNCA han realizado un pedido',
      level: 'Básico / Examen',
      badgeClass: 'basic',
      company: 'Pregunta obligatoria de 1º de DAM/DAW',
      problem: `Dadas las tablas 'clientes' (id, nombre, email) y 'pedidos' (id, cliente_id, fecha, total), obtén el nombre y correo de los clientes registrados que aún no tengan ningún pedido asociado en la base de datos.`,
      hint: 'Utiliza un LEFT JOIN filtrando por los nulos de la tabla derecha (Anti-JOIN), o un WHERE NOT EXISTS.',
      solutionSql: `-- Método 1: La solución reina con LEFT JOIN y filtro IS NULL (Anti-JOIN)
SELECT c.nombre, c.email
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;

-- Método 2: Con NOT EXISTS (Altamente optimizado por el optimizador de MySQL)
SELECT c.nombre, c.email
FROM clientes c
WHERE NOT EXISTS (
    SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id
);`,
      explanation: `El LEFT JOIN conserva todos los clientes. Si un cliente no tiene pedidos, las columnas de la tabla 'pedidos' vendrán con NULL. Al aplicar 'WHERE p.id IS NULL' nos quedamos únicamente con los huérfanos.`
    },
    {
      id: 'reto-3-departamentos-agrupados',
      num: 'Reto 3',
      title: 'Departamentos con > 3 empleados y Salario Medio > 2.500 €',
      level: 'Intermedio',
      badgeClass: 'intermediate',
      company: 'Clásico de examen técnico de SQL',
      problem: `Escribe una consulta que liste el nombre del departamento, el total de trabajadores y el salario promedio, pero solo para departamentos con más de 3 empleados y cuyo promedio salarial supere los 2500 euros.`,
      hint: 'Recuerda el orden de ejecución: los filtros sobre montones calculados nunca van en WHERE, van obligatoriamente en HAVING.',
      solutionSql: `SELECT departamento,
       COUNT(*) AS total_empleados,
       ROUND(AVG(salario), 2) AS salario_medio
FROM empleados
GROUP BY departamento
HAVING COUNT(*) > 3 AND AVG(salario) > 2500
ORDER BY salario_medio DESC;`,
      explanation: `Un error habitual de los alumnos es intentar escribir 'WHERE COUNT(*) > 3'. Como WHERE se evalúa en el paso 2 (antes de agrupar), la base de datos lanza un error. La solución exige HAVING en el paso 4.`
    },
    {
      id: 'reto-4-top-n-por-grupo',
      num: 'Reto 4',
      title: 'Los 3 mejores salarios de CADA departamento (Top N por grupo)',
      level: 'Avanzado',
      badgeClass: 'advanced',
      company: 'Prueba Senior de Backend / Data Engineer',
      problem: `Obtén los 3 salarios más altos dentro de cada departamento de la empresa. La consulta debe devolver el nombre del departamento, el nombre del empleado y su salario, ordenados por departamento y rango.`,
      hint: 'No es posible hacerlo con un simple LIMIT porque LIMIT recorta el total global. La herramienta canónica es ROW_NUMBER() o DENSE_RANK() con PARTITION BY dentro de una CTE.',
      solutionSql: `WITH RankingSalarial AS (
    SELECT nombre,
           departamento,
           salario,
           DENSE_RANK() OVER(
               PARTITION BY departamento 
               ORDER BY salario DESC
           ) AS posicion
    FROM empleados
)
SELECT departamento, nombre, salario, posicion
FROM RankingSalarial
WHERE posicion <= 3
ORDER BY departamento, posicion;`,
      explanation: `PARTITION BY divide el cálculo por cada departamento de manera independiente. Como las funciones de ventana no se pueden filtrar directamente en el WHERE de su misma consulta, se encapsula en una CTE (WITH).`
    },
    {
      id: 'reto-5-eliminar-duplicados',
      num: 'Reto 5',
      title: 'Detectar y eliminar registros duplicados conservando el menor ID',
      level: 'Avanzado / DBA',
      badgeClass: 'advanced',
      company: 'Mantenimiento real de bases de datos',
      problem: `Por un fallo en el software cliente, la tabla 'contactos' (id, email, nombre) tiene emails duplicados con distintos IDs. Escribe la sentencia DELETE que elimine los duplicados conservando únicamente el registro original con el menor ID de cada email.`,
      hint: 'Puedes realizar un auto-join (INNER JOIN de la tabla consigo misma) en el DELETE condicionando a1.id > a2.id.',
      solutionSql: `-- Eliminación con AUTO-JOIN en MySQL
DELETE c1
FROM contactos c1
INNER JOIN contactos c2 
    ON c1.email = c2.email AND c1.id > c2.id;

-- Si solo queremos consultar qué registros están duplicados:
SELECT email, COUNT(*) AS veces_repetido
FROM contactos
GROUP BY email
HAVING COUNT(*) > 1;`,
      explanation: `La condición 'c1.id > c2.id' empareja cada fila repetida con una copia suya más antigua (con ID menor). Al indicar 'DELETE c1', solo se borra la fila con el ID mayor, dejando intacta la primera inserción.`
    }
  ];

  const toggleSolution = (id) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleHint = (id) => {
    setActiveHint((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="sql-challenges-container">
      <div className="sql-challenges-header">
        <div>
          <h3 className="sql-challenges-title">🎯 Taller Interactivo: Los 5 Retos de Examen y Entrevista</h3>
          <p className="sql-challenges-subtitle">
            Ponte a prueba antes de ver la solución. Intenta resolver mentalmente cada reto o pruébalo en el Playground en vivo.
          </p>
        </div>
        {onOpenSandbox && (
          <button type="button" className="sql-btn-gold" onClick={onOpenSandbox}>
            🧪 Abrir Playground para Probar
          </button>
        )}
      </div>

      <div className="sql-challenges-list">
        {challenges.map((c) => {
          const isRevealed = !!revealedSolutions[c.id];
          const isHintOpen = !!activeHint[c.id];

          return (
            <div key={c.id} className="sql-challenge-card">
              <div className="sql-challenge-card-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className="sql-challenge-num">{c.num}</span>
                  <strong className="sql-challenge-name">{c.title}</strong>
                  <span className={`sql-level-badge ${c.badgeClass}`}>{c.level}</span>
                </div>
                <span className="sql-challenge-company">{c.company}</span>
              </div>

              <div className="sql-challenge-problem">
                <p>{c.problem}</p>
              </div>

              <div className="sql-challenge-actions">
                <button
                  type="button"
                  className="sql-challenge-hint-btn"
                  onClick={() => toggleHint(c.id)}
                >
                  {isHintOpen ? '💡 Ocultar Pista' : '💡 Ver Pista Conceptual'}
                </button>

                <button
                  type="button"
                  className={`sql-challenge-reveal-btn ${isRevealed ? 'active' : ''}`}
                  onClick={() => toggleSolution(c.id)}
                >
                  {isRevealed ? '🙈 Ocultar Solución' : '👁️ Revelar Solución y Explicación'}
                </button>
              </div>

              {isHintOpen && (
                <div className="sql-challenge-hint-box">
                  <strong>Pista:</strong> {c.hint}
                </div>
              )}

              {isRevealed && (
                <div className="sql-challenge-solution-box">
                  <div className="sql-solution-code-title">
                    <span>✨ Solución Canónica SQL:</span>
                  </div>
                  <pre className="code-block">
                    <code>{c.solutionSql}</code>
                  </pre>
                  <div className="sql-solution-explanation">
                    <strong>🧠 Explicación del Patrón:</strong>
                    <p>{c.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

