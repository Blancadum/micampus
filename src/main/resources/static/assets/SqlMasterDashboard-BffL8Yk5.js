import{r as m,j as e,L as ce,a as he,b as Ee}from"./vendor-react-B1CazfeU.js";import{u as be}from"./index-D62IBHyI.js";import"./vendor-diagrams-BmImEzZ0.js";const pe=[{id:"cat-1-fundamentos",name:"1. Fundamentos & Modelo Relacional",icon:"📘"},{id:"cat-2-diseno",name:"2. Diseño ER & Normalización",icon:"📐"},{id:"cat-3-ddl-dml",name:"3. Lenguaje DDL & DML",icon:"🏗️"},{id:"cat-4-consultas",name:"4. Consultas SELECT, Filtros & Agrupación",icon:"🔍"},{id:"cat-5-masterclass",name:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",icon:"⏱️"},{id:"cat-6-cte",name:"6. SQL Moderno: CTEs & Recursividad",icon:"🌲"},{id:"cat-7-ventanas",name:"7. Funciones de Ventana (Window Functions)",icon:"📈"},{id:"cat-8-joins",name:"8. Guía Visual Exhaustiva de JOINs",icon:"🔗"},{id:"cat-9-procedimientos",name:"9. Procedimientos, Triggers & Transacciones",icon:"⚡"},{id:"cat-10-optimizacion",name:"10. Rendimiento, Índices & Retos de Entrevistas",icon:"🎯"},{id:"cat-11-seguridad",name:"11. Seguridad & Comparativa de Motores",icon:"🔐"}],k=[{id:"1-1-intro",category:"cat-1-fundamentos",categoryTitle:"1. Fundamentos & Modelo Relacional",categoryIcon:"📘",num:"1.1",title:"1.1 Introducción a Bases de Datos y Arquitectura SGBD",shortDesc:"Qué es una base de datos, arquitectura de un SGBD relacional y sistemas principales (MySQL, PostgreSQL, Oracle).",badge:"1.1 Conceptos",accentColor:"#1a5490",html:`<h1 class="chapter">1.1 Introducción a Bases de Datos y Arquitectura SGBD</h1>
                
                <p>Este compendio es una guía completa y progresiva para entender las <strong>bases de datos relacionales</strong> desde los fundamentos más básicos hasta conceptos avanzados como procedimientos almacenados y transacciones.</p>

                <h2 class="section-title">¿Qué es una Base de Datos?</h2>
                <p>Una <strong>base de datos</strong> es una colección organizada de datos relacionados que se almacenan en una computadora de forma que pueden consultarse, actualizarse y manipularse de manera eficiente. Las características principales son:</p>

                <ul>
                    <li>Acceso compartido por múltiples usuarios</li>
                    <li>Control centralizado de datos</li>
                    <li>Mantenimiento de integridad de datos</li>
                    <li>Recuperación ante fallos</li>
                    <li>Seguridad y control de acceso</li>
                </ul>

                <h2 class="section-title">Sistema Gestor de Bases de Datos (SGBD)</h2>
                <p>Un <strong>SGBD (Sistema de Gestión de Bases de Datos)</strong> es un software que permite crear, acceder y controlar bases de datos. Los SGBD relacionales más populares son:</p>

                <ul>
                    <li><strong>MySQL</strong>: Open source, muy utilizado en aplicaciones web</li>
                    <li><strong>PostgreSQL</strong>: Robusto, con características avanzadas</li>
                    <li><strong>Oracle</strong>: Solución empresarial completa</li>
                    <li><strong>SQL Server</strong>: Producto de Microsoft, integrado con Windows</li>
                </ul>
            </div>`},{id:"1-2-conceptos",category:"cat-1-fundamentos",categoryTitle:"1. Fundamentos & Modelo Relacional",categoryIcon:"📘",num:"1.2",title:"1.2 Conceptos Fundamentales: Tablas, Filas, Dominios y Tipos",shortDesc:"Estructura relacional: tablas, atributos, tuplas, dominios y tipos de datos SQL estándar.",badge:"1.2 Modelo Relacional",accentColor:"#1a5490",html:`<h1 class="chapter">1.2 Conceptos Fundamentales: Tablas, Filas, Dominios y Tipos</h1>

                <h2 class="section-title">El Modelo Relacional</h2>
                <p>Las bases de datos relacionales organizan los datos en <strong>tablas</strong>. Cada tabla representa una entidad y contiene:</p>

                <ul>
                    <li><strong>Filas (registros):</strong> Cada fila representa una instancia individual de la entidad</li>
                    <li><strong>Columnas (atributos):</strong> Cada columna representa una propiedad o característica</li>
                    <li><strong>Dominio:</strong> El conjunto de valores válidos para cada columna</li>
                </ul>

                <h3>Ejemplo de Tabla</h3>
                <div class="sql-pizarra-container">
  <div class="sql-pizarra-header">
    <div class="pizarra-header-left">
      <span class="pizarra-badge-icon">📊</span>
      <strong>Pizarra de Datos: Tabla Estudiante</strong>
    </div>
    <span class="pizarra-chip">Dataset Relacional (3 Tuplas)</span>
  </div>
  <div class="sql-pizarra-table-wrapper">
    <table class="sql-pizarra-table">
      <thead>
        <tr>
          <th style="width: 80px;">ID <span class="pk-tag">PK</span></th>
          <th>Nombre <span class="type-tag">VARCHAR</span></th>
          <th>Email <span class="type-tag">VARCHAR</span></th>
          <th style="width: 90px;">Edad <span class="type-tag">INT</span></th>
          <th style="width: 110px;">Carrera <span class="type-tag">VARCHAR</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="pk-value">1</span></td>
          <td><strong>Juan García</strong></td>
          <td><code>juan@ejemplo.com</code></td>
          <td>20</td>
          <td><span class="sql-badge-tag tag-blue">DAM</span></td>
        </tr>
        <tr>
          <td><span class="pk-value">2</span></td>
          <td><strong>María López</strong></td>
          <td><code>maria@ejemplo.com</code></td>
          <td>19</td>
          <td><span class="sql-badge-tag tag-purple">DAW</span></td>
        </tr>
        <tr>
          <td><span class="pk-value">3</span></td>
          <td><strong>Pedro González</strong></td>
          <td><code>pedro@ejemplo.com</code></td>
          <td>21</td>
          <td><span class="sql-badge-tag tag-blue">DAM</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sql-pizarra-footer">
    <span>📌 <strong>Atributos:</strong> Columnas que definen la estructura • <strong>Tuplas:</strong> Cada una de las 3 filas con datos individuales</span>
  </div>
</div>

                <h2 class="section-title">Entidades, Atributos y Valores</h2>
                <p>Estos tres conceptos son fundamentales para entender las bases de datos:</p>

                <ul>
                    <li><strong>Entidad:</strong> Un objeto del mundo real que queremos representar (una persona, un libro, una película)</li>
                    <li><strong>Atributo:</strong> Una propiedad o característica de la entidad (nombre, edad, email)</li>
                    <li><strong>Valor:</strong> El contenido concreto de un atributo (Juan, 20, juan@ejemplo.com)</li>
                </ul>

                <div class="example">
                    <p class="example-title">Ejemplo: Película como Entidad</p>
                    <p><strong>Entidad:</strong> Película "Forrest Gump"</p>
                    <p><strong>Atributos:</strong> Título, Director, Año</p>
                    <p><strong>Valores:</strong> "Forrest Gump", "Robert Zemeckis", 1994</p>
                </div>

                <h2 class="section-title">Tipos de Datos</h2>
                <p>Cada columna en una tabla debe especificar un tipo de dato. Los principales son:</p>

                <table>
                    <tr>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Ejemplo</th>
                    </tr>
                    <tr>
                        <td>INT</td>
                        <td>Número entero</td>
                        <td>25, 1000, -50</td>
                    </tr>
                    <tr>
                        <td>VARCHAR(n)</td>
                        <td>Texto de longitud variable</td>
                        <td>"Juan García", "test"</td>
                    </tr>
                    <tr>
                        <td>DATE</td>
                        <td>Fecha</td>
                        <td>2024-06-05</td>
                    </tr>
                    <tr>
                        <td>DECIMAL(m,d)</td>
                        <td>Número decimal</td>
                        <td>19.95, 100.50</td>
                    </tr>
                    <tr>
                        <td>BOOLEAN</td>
                        <td>Verdadero o Falso</td>
                        <td>TRUE, FALSE</td>
                    </tr>
                </table>
            </div>`},{id:"2-1-modelo-er",category:"cat-2-diseno",categoryTitle:"2. Diseño ER & Normalización",categoryIcon:"📐",num:"2.1",title:"2.1 Modelo Entidad-Relación (ER) y Cardinalidades (1:1, 1:N, N:M)",shortDesc:"Componentes ER: entidades, atributos, relaciones y análisis de cardinalidades en diagramas de negocio.",badge:"2.1 Diagramas ER",accentColor:"#2563eb",html:`<h1 class="chapter">2.1 Modelo Entidad-Relación (ER) y Cardinalidades</h1>

                <h2 class="section-title">¿Qué es el Modelo ER?</h2>
                <p>El <strong>modelo Entidad-Relación</strong> es una forma de representar conceptualmente una base de datos antes de implementarla. Permite visualizar las entidades del sistema, sus atributos y las relaciones entre ellas.</p>

                <h2 class="section-title">Componentes del Modelo ER</h2>
                <ul>
                    <li><strong>Entidades:</strong> Objetos principales del sistema (ESTUDIANTE, ASIGNATURA, PROFESOR)</li>
                    <li><strong>Atributos:</strong> Propiedades de las entidades (nombre, edad, email)</li>
                    <li><strong>Relaciones:</strong> Asociaciones entre entidades (un estudiante se matricula en una asignatura)</li>
                    <li><strong>Cardinalidad:</strong> Restricción sobre el número de instancias relacionadas</li>
                </ul>

                <h2 class="section-title">Cardinalidad</h2>
                <p>La <strong>cardinalidad</strong> describe cuántas instancias de una entidad pueden relacionarse con instancias de otra entidad:</p>

                <ul>
                    <li><strong>1:1 (Uno a Uno):</strong> Una instancia de A se relaciona con exactamente una instancia de B. Ejemplo: Una persona tiene un DNI único</li>
                    <li><strong>1:N (Uno a Muchos):</strong> Una instancia de A se relaciona con múltiples instancias de B. Ejemplo: Un profesor enseña múltiples asignaturas</li>
                    <li><strong>N:M (Muchos a Muchos):</strong> Múltiples instancias de A se relacionan con múltiples instancias de B. Ejemplo: Muchos estudiantes se matriculan en muchas asignaturas</li>
                </ul>

                <div class="tip">
                    <p class="tip-title">Consejo para identificar cardinalidad</p>
                    <p>Pregúntate: "¿Cuántos B puede tener un A?" y "¿Cuántos A puede tener un B?"</p>
                </div>
            </div>`},{id:"2-2-transformacion-er",category:"cat-2-diseno",categoryTitle:"2. Diseño ER & Normalización",categoryIcon:"📐",num:"2.2",title:"2.2 Transformación ER a Modelo Relacional y Tipos de Claves",shortDesc:"Reglas de derivación a tablas, resolución de N:M con tablas puente y claves primarias, foráneas y candidatas.",badge:"2.2 Derivación",accentColor:"#2563eb",html:`<h1 class="chapter">2.2 Transformación ER a Modelo Relacional y Tipos de Claves</h1>

                <h2 class="section-title">Regla 1: Entidad → Tabla</h2>
                <p>Cada <strong>entidad</strong> del modelo ER se convierte en una tabla en el modelo relacional. Los <strong>atributos</strong> se convierten en columnas. en una tabla en el modelo relacional. Los atributos se convierten en columnas.</p>

                <h3>Paso 1: Visualizar la Entidad</h3>
                <div class="sql-pizarra-container">
  <div class="sql-pizarra-header">
    <div class="pizarra-header-left">
      <span class="pizarra-badge-icon">📐</span>
      <strong>Pizarra de Modelado ER: Entidad ESTUDIANTE</strong>
    </div>
    <span class="pizarra-chip">Definición de Atributos</span>
  </div>
  <div class="sql-pizarra-canvas">
    <div class="sql-er-card main-entity">
      <div class="sql-er-header">
        <span class="sql-er-name">ESTUDIANTE</span>
        <span class="sql-cardinality-chip">Entidad Fuerte</span>
      </div>
      <div class="sql-er-fields">
        <div class="sql-er-field pk">
          <span class="pk-tag">PK</span>
          <span class="field-name">ID</span>
          <span class="field-desc">Identificador único (Clave Primaria)</span>
        </div>
        <div class="sql-er-field">
          <span class="bullet">•</span>
          <span class="field-name">Nombre</span>
          <span class="field-desc">Texto (Nombre completo)</span>
        </div>
        <div class="sql-er-field">
          <span class="bullet">•</span>
          <span class="field-name">Email</span>
          <span class="field-desc">Texto (Dirección de correo)</span>
        </div>
        <div class="sql-er-field">
          <span class="bullet">•</span>
          <span class="field-name">Edad</span>
          <span class="field-desc">Numérico entero</span>
        </div>
      </div>
    </div>
  </div>
  <div class="sql-pizarra-footer">
    <span>📌 <strong>Notación ER:</strong> El atributo subyacente <code>ID</code> es la clave primaria que identificará unívocamente a cada entidad en el modelo relacional.</span>
  </div>
</div>

                <h3>Paso 2: Convertir a Tabla SQL</h3>
                <pre class="code-block"><code>CREATE TABLE Estudiante (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Email VARCHAR(100),
    Edad INT
);</code></pre>

                <p style="height: 15px;"></p>
                <div class="tip">
                    <p class="tip-title">💡 Concepto clave</p>
                    <p>La entidad <strong>ESTUDIANTE</strong> se convierte en tabla <strong>Estudiante</strong>. Cada atributo se convierte en una columna con su tipo de dato correspondiente.</p>
                </div>

                <h2 class="section-title">Regla 2: Relación 1:N (Uno a Muchos)</h2>
                <p>En una relación uno a muchos, la clave primaria del lado "1" (padre) se coloca como clave foránea en el lado "N" (hijo).</p>

                <h3>Paso 1: Visualizar la Relación ER</h3>
                <div class="sql-pizarra-container">
  <div class="sql-pizarra-header">
    <div class="pizarra-header-left">
      <span class="pizarra-badge-icon">🔗</span>
      <strong>Pizarra de Relaciones: Cardinalidad 1:N (Uno a Muchos)</strong>
    </div>
    <span class="pizarra-chip">Propagación de Clave</span>
  </div>
  <div class="sql-pizarra-canvas">
    <div class="sql-rel-grid">
      <div class="sql-er-card rel-box">
        <div class="sql-er-header parent">
          <span class="sql-er-name">PROFESOR</span>
          <span class="sql-cardinality-chip">1 (Padre)</span>
        </div>
        <div class="sql-er-fields">
          <div class="sql-er-field pk"><span class="pk-tag">PK</span> <span class="field-name">ID</span></div>
          <div class="sql-er-field"><span class="bullet">•</span> <span class="field-name">Nombre</span></div>
        </div>
      </div>

      <div class="sql-rel-connector">
        <div class="rel-line"></div>
        <div class="rel-badge">1 : N</div>
        <div class="rel-arrow">➔</div>
        <span class="rel-action">imparte</span>
      </div>

      <div class="sql-er-card rel-box">
        <div class="sql-er-header child">
          <span class="sql-er-name">ASIGNATURA</span>
          <span class="sql-cardinality-chip">N (Hijo)</span>
        </div>
        <div class="sql-er-fields">
          <div class="sql-er-field pk"><span class="pk-tag">PK</span> <span class="field-name">ID</span></div>
          <div class="sql-er-field"><span class="bullet">•</span> <span class="field-name">Nombre</span></div>
          <div class="sql-er-field fk"><span class="fk-tag">FK</span> <span class="field-name">ID_Profesor</span></div>
        </div>
      </div>
    </div>
  </div>
  <div class="sql-pizarra-footer">
    <span>📌 <strong>Regla fundamental:</strong> La clave primaria <code>ID</code> del lado <strong>1</strong> (Profesor) viaja al lado <strong>N</strong> (Asignatura) como clave foránea <code>ID_Profesor</code>.</span>
  </div>
</div>

                <h3>Paso 2: Crear Tabla Padre (PROFESOR)</h3>
                <pre class="code-block"><code>CREATE TABLE Profesor (
ID INT PRIMARY KEY,
Nombre VARCHAR(100),
Departamento VARCHAR(100)
);</code></pre>

                <h3>Paso 3: Crear Tabla Hijo (ASIGNATURA)</h3>
                <p>La tabla hijo contiene la clave foránea que referencia al padre:</p>
                <pre class="code-block"><code>CREATE TABLE Asignatura (
ID INT PRIMARY KEY,
Nombre VARCHAR(100),
ID_Profesor INT,
FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID)
);</code></pre>

                <p style="height: 15px;"></p>
                <div class="tip">
                    <p class="tip-title">💡 Concepto clave</p>
                    <p>La clave foránea <strong>ID_Profesor</strong> en la tabla Asignatura referencia a la clave primaria ID de la tabla Profesor. Esto establece la relación: una asignatura pertenece a un profesor.</p>
                </div>

                <h2 class="section-title">Regla 3: Relación N:M (Muchos a Muchos)</h2>
                <p>En una relación muchos a muchos, se crea una tabla intermedia (tabla puente) que contiene las claves primarias de ambas entidades.</p>

                <h3>Paso 1: Visualizar la Relación ER</h3>
                <div class="sql-pizarra-container">
  <div class="sql-pizarra-header">
    <div class="pizarra-header-left">
      <span class="pizarra-badge-icon">🌉</span>
      <strong>Pizarra de Relaciones: Cardinalidad N:M (Muchos a Muchos) & Tabla Puente</strong>
    </div>
    <span class="pizarra-chip">Tabla Intermedia</span>
  </div>
  <div class="sql-pizarra-canvas">
    <div class="sql-rel-grid nm-layout">
      <div class="sql-er-card rel-box">
        <div class="sql-er-header">
          <span class="sql-er-name">ESTUDIANTE</span>
          <span class="sql-cardinality-chip">Entidad A</span>
        </div>
        <div class="sql-er-fields">
          <div class="sql-er-field pk"><span class="pk-tag">PK</span> <span class="field-name">ID</span></div>
          <div class="sql-er-field"><span class="bullet">•</span> <span class="field-name">Nombre</span></div>
        </div>
      </div>

      <div class="sql-bridge-wrapper">
        <div class="sql-er-card rel-box bridge-card">
          <div class="sql-er-header bridge">
            <span class="bridge-icon">🌉</span>
            <span class="sql-er-name">MATRICULA</span>
            <span class="sql-cardinality-chip bridge-chip">Tabla Puente</span>
          </div>
          <div class="sql-er-fields">
            <div class="sql-er-field pk-fk"><span class="pk-tag">PK</span><span class="fk-tag">FK</span> <span class="field-name">ID_Estudiante</span></div>
            <div class="sql-er-field pk-fk"><span class="pk-tag">PK</span><span class="fk-tag">FK</span> <span class="field-name">ID_Asignatura</span></div>
            <div class="sql-er-field"><span class="bullet">•</span> <span class="field-name">Fecha_Matricula</span></div>
          </div>
        </div>
      </div>

      <div class="sql-er-card rel-box">
        <div class="sql-er-header">
          <span class="sql-er-name">ASIGNATURA</span>
          <span class="sql-cardinality-chip">Entidad B</span>
        </div>
        <div class="sql-er-fields">
          <div class="sql-er-field pk"><span class="pk-tag">PK</span> <span class="field-name">ID</span></div>
          <div class="sql-er-field"><span class="bullet">•</span> <span class="field-name">Nombre</span></div>
        </div>
      </div>
    </div>
  </div>
  <div class="sql-pizarra-footer">
    <span>📌 <strong>Regla fundamental:</strong> Una relación N:M no puede unirse directamente con una sola clave foránea; se descompone creando una tabla intermedia (<code>Matricula</code>) con ambas claves foráneas.</span>
  </div>
</div>

                <h3>Paso 2: Crear Tabla ESTUDIANTE</h3>
                <pre class="code-block"><code>CREATE TABLE Estudiante (
ID INT PRIMARY KEY,
Nombre VARCHAR(100)
);</code></pre>

                <h3>Paso 3: Crear Tabla ASIGNATURA</h3>
                <pre class="code-block"><code>CREATE TABLE Asignatura (
ID INT PRIMARY KEY,
Nombre VARCHAR(100)
);</code></pre>

                <h3>Paso 4: Crear Tabla Puente (MATRICULA)</h3>
                <p>Esta tabla intermedia contiene las claves foráneas de ambas entidades:</p>
                <pre class="code-block"><code>CREATE TABLE Matricula (
ID_Estudiante INT,
ID_Asignatura INT,
Fecha_Matricula DATE,
PRIMARY KEY (ID_Estudiante, ID_Asignatura),
FOREIGN KEY (ID_Estudiante) REFERENCES Estudiante(ID),
FOREIGN KEY (ID_Asignatura) REFERENCES Asignatura(ID)
);</code></pre>

                <p style="height: 15px;"></p>
                <div class="tip">
                    <p class="tip-title">💡 Concepto clave</p>
                    <p>La <strong>tabla puente (o intermedia)</strong> <code>Matricula</code> es el nexo entre Estudiante y Asignatura. Cada fila representa una relación: "El estudiante X está matriculado en la asignatura Y".</p>
                </div>

                <h2 class="section-title">Tipos de Claves</h2>

                <h3>Clave Primaria (PK)</h3>
                <p>Identifica unívocamente cada fila de una tabla. No puede ser nula y solo puede haber una por tabla.</p>

                <h3>Clave Foránea (FK)</h3>
                <p>Columna que referencia la clave primaria de otra tabla. Establece la relación entre tablas y garantiza integridad referencial.</p>

                <h3>Clave Candidata</h3>
                <p>Cualquier columna o conjunto de columnas que podría servir como clave primaria.</p>

                <div class="warning">
                    <p class="warning-title">Importante</p>
                    <p>Las claves foráneas deben siempre hacer referencia a claves primarias existentes. Esto garantiza la integridad de los datos.</p>
                </div>
            </div>`},{id:"2-3-normalizacion",category:"cat-2-diseno",categoryTitle:"2. Diseño ER & Normalización",categoryIcon:"📐",num:"2.3",title:"2.3 Normalización Práctica: 1FN, 2FN y 3FN Paso a Paso",shortDesc:"Eliminación sistemática de redundancias y anomalías: 1FN (atomicidad), 2FN (dependencia total) y 3FN (transitividad).",badge:"2.3 Normalización",accentColor:"#2563eb",html:`<h1 class="chapter">2.3 Normalización Práctica: 1FN, 2FN y 3FN Paso a Paso</h1>

                <h2 class="section-title">¿Por qué Normalizar?</h2>
                <p>La <strong>normalización</strong> es el proceso de organizar las tablas para reducir la redundancia de datos y evitar anomalías. Sus beneficios son:</p>

                <ul>
                    <li>Eliminación de datos redundantes</li>
                    <li>Mejora de la integridad de datos</li>
                    <li>Facilidad de mantenimiento</li>
                    <li>Reducción de anomalías de actualización</li>
                </ul>

                <h2 class="section-title">Primera Forma Normal (1FN)</h2>
                <p>Una tabla está en 1FN si <strong>cada columna contiene un solo valor</strong>, nunca valores múltiples o complejos.</p>

                <div class="sql-normalization-comparison">
  <div class="sql-norm-box error">
    <div class="norm-header error">
      <span class="norm-icon">❌</span>
      <strong>Violación de 1FN: Atributo no atómico</strong>
    </div>
    <div class="sql-pizarra-table-wrapper">
      <table class="sql-pizarra-table compact">
        <thead>
          <tr>
            <th style="width: 60px;">ID</th>
            <th>Nombre</th>
            <th class="col-highlight-error">Teléfonos (Multivalor ⚠️)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Juan</td>
            <td class="col-highlight-error"><code>123456, 654321</code></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="norm-reason">⚠️ <strong>Problema:</strong> La columna <code>Teléfonos</code> contiene más de un valor en la misma celda, rompiendo la atomicidad exigida por la Primera Forma Normal.</p>
  </div>

  <div class="sql-norm-box success">
    <div class="norm-header success">
      <span class="norm-icon">✅</span>
      <strong>Solución Aplicando 1FN: Dos tablas atómicas</strong>
    </div>
    <div class="norm-subtables">
      <div class="subtable-wrap">
        <span class="subtable-title">Tabla <code>Estudiante</code></span>
        <table class="sql-pizarra-table compact">
          <thead>
            <tr><th>ID</th><th>Nombre</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Juan</td></tr>
          </tbody>
        </table>
      </div>
      <div class="subtable-wrap">
        <span class="subtable-title">Tabla <code>Telefono</code></span>
        <table class="sql-pizarra-table compact">
          <thead>
            <tr><th>ID_Estudiante</th><th>Teléfono</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><code>123456</code></td></tr>
            <tr><td>1</td><td><code>654321</code></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="norm-reason success">✅ <strong>Ventaja:</strong> Cada celda almacena un solo valor atómico. Permite búsquedas rápidas, ordenación e indexación limpia.</p>
  </div>
</div>

                <h2 class="section-title">Segunda Forma Normal (2FN)</h2>
                <p>Una tabla está en <strong>Segunda Forma Normal (2FN)</strong> si:</p>
                <ul>
                    <li>Cumple 1FN</li>
                    <li>No tiene <strong>dependencias parciales</strong> (todos los atributos dependen de la clave primaria completa)</li>
                </ul>

                <div class="example">
                    <p class="example-title">Ejemplo de Violación de 2FN</p>
                    <p>En una tabla Matricula con clave primaria (ID_Estudiante, ID_Asignatura), si el campo Nombre_Asignatura solo depende de ID_Asignatura (no de ambos), es una dependencia parcial.</p>
                    <p><strong>Solución:</strong> Crear una tabla Asignatura separada con el nombre.</p>
                </div>

                <h2 class="section-title">Tercera Forma Normal (3FN)</h2>
                <p>Una tabla está en <strong>Tercera Forma Normal (3FN)</strong> si:</p>
                <ul>
                    <li>Cumple 2FN</li>
                    <li>No tiene <strong>dependencias transitivas</strong> (los atributos solo dependen de la clave primaria, no de otros atributos)</li>
                </ul>

                <div class="example">
                    <p class="example-title">Ejemplo de Violación de 3FN</p>
                    <p>Tabla Profesor que contiene ID, Nombre, ID_Departamento y Nombre_Departamento. El Nombre_Departamento depende de ID_Departamento, no directamente de ID_Profesor.</p>
                    <p><strong>Solución:</strong> Crear una tabla Departamento separada.</p>
                </div>

                <div class="tip">
                    <p class="tip-title">Regla práctica</p>
                    <p>Para 3FN: Cada columna debe depender "de la clave, toda la clave y nada más que la clave".</p>
                </div>
            </div>`},{id:"3-1-ddl",category:"cat-3-ddl-dml",categoryTitle:"3. Lenguaje DDL & DML",categoryIcon:"🏗️",num:"3.1",title:"3.1 Definición DDL: Creación y Modificación (CREATE, ALTER, DROP, TRUNCATE)",shortDesc:"Definición de esquemas físicos: CREATE TABLE, ALTER, DROP y restricciones clave (PK, FK, UNIQUE, CHECK).",badge:"3.1 DDL",accentColor:"#0891b2",html:`<h1 class="chapter">3.1 Definición DDL: Creación y Modificación (CREATE, ALTER, DROP, TRUNCATE)</h1>

                <h2 class="section-title">Introducción a DDL</h2>
                <p><strong>DDL (Lenguaje de Definición de Datos)</strong> es el conjunto de comandos SQL para crear, modificar y eliminar la estructura de las bases de datos y sus tablas.</p>

                <h2 class="section-title">CREATE DATABASE</h2>
                <p>Crea una nueva base de datos.</p>

                <h3>Crear una Base de Datos Simple</h3>
                <pre class="code-block"><code>CREATE DATABASE escuela;</code></pre>

                <h3>Crear con Codificación UTF-8</h3>
                <p><em>UTF-8 es la codificación estándar para caracteres especiales (acentos, ñ, etc.)</em></p>
                <pre class="code-block"><code>CREATE DATABASE escuela CHARACTER SET utf8mb4;</code></pre>

                <h2 class="section-title">CREATE TABLE</h2>
                <p>Crea una nueva tabla con sus columnas, tipos de datos y restricciones.</p>

                <pre class="code-block"><code>CREATE TABLE Estudiante (
ID INT PRIMARY KEY AUTO_INCREMENT,
Nombre VARCHAR(100) NOT NULL,
Email VARCHAR(100) UNIQUE,
Edad INT CHECK (Edad >= 18),
Carrera VARCHAR(50) DEFAULT 'DAM',
Fecha_Inscripcion DATE
);</code></pre>

                <h2 class="section-title">Restricciones (Constraints)</h2>

                <h3>PRIMARY KEY</h3>
                <p>Identifica unívocamente cada fila. No puede ser nula y solo puede haber una por tabla.</p>

                <h3>NOT NULL</h3>
                <p>La columna debe tener siempre un valor, no puede estar vacía.</p>

                <h3>UNIQUE</h3>
                <p>Los valores en la columna no pueden repetirse.</p>

                <h3>CHECK</h3>
                <p>Verifica que el valor cumpla una condición específica.</p>

                <h3>DEFAULT</h3>
                <p>Define un valor por defecto si no se proporciona uno.</p>

                <h3>FOREIGN KEY</h3>
                <p>Referencia a la clave primaria de otra tabla, estableciendo relaciones.</p>

                <pre class="code-block"><code>CREATE TABLE Asignatura (
ID INT PRIMARY KEY AUTO_INCREMENT,
Nombre VARCHAR(100) NOT NULL,
ID_Profesor INT,
FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID)
);</code></pre>

                <h2 class="section-title">ALTER TABLE</h2>
                <p>Modifica la estructura de una tabla existente.</p>

                <h3>Añadir una Nueva Columna</h3>
                <pre class="code-block"><code>ALTER TABLE Estudiante 
ADD COLUMN Teléfono VARCHAR(20);</code></pre>
                <p style="height: 20px;"></p>

                <h3>Eliminar una Columna</h3>
                <pre class="code-block"><code>ALTER TABLE Estudiante 
DROP COLUMN Teléfono;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Modificar el Tipo de Dato</h3>
                <pre class="code-block"><code>ALTER TABLE Estudiante 
MODIFY Edad SMALLINT;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Añadir una Restricción</h3>
                <pre class="code-block"><code>ALTER TABLE Estudiante 
ADD CONSTRAINT uk_email UNIQUE (Email);</code></pre>

                <h2 class="section-title">DROP TABLE</h2>
                <p>Elimina una tabla completa incluyendo estructura y datos.</p>

                <pre class="code-block"><code>DROP TABLE Estudiante;</code></pre>

                <h2 class="section-title">TRUNCATE TABLE</h2>
                <p>Elimina todos los datos de una tabla pero mantiene la estructura.</p>

                <pre class="code-block"><code>TRUNCATE TABLE Estudiante;</code></pre>

                <div class="warning">
                    <p class="warning-title">Advertencia</p>
                    <p>DROP TABLE elimina la estructura también, mientras que TRUNCATE solo elimina datos. Ambas operaciones son irreversibles en muchos casos.</p>
                </div>
            </div>`},{id:"3-2-dml",category:"cat-3-ddl-dml",categoryTitle:"3. Lenguaje DDL & DML",categoryIcon:"🏗️",num:"3.2",title:"3.2 Manipulación DML: Registros y Modificaciones (INSERT, UPDATE, DELETE)",shortDesc:"Manipulación segura de datos: inserciones individuales y múltiples, actualización con WHERE y borrado controlado.",badge:"3.2 DML",accentColor:"#0891b2",html:`<h1 class="chapter">3.2 Manipulación DML: Registros y Modificaciones (INSERT, UPDATE, DELETE)</h1>

                <h2 class="section-title">Introducción a DML</h2>
                <p><strong>DML (Lenguaje de Manipulación de Datos)</strong> es el conjunto de comandos SQL para insertar, actualizar, eliminar y consultar datos en las tablas.</p>

                <h2 class="section-title">INSERT</h2>
                <p>Inserta nuevos registros en una tabla.</p>

                <h3>Insertar un Registro Único</h3>
                <pre class="code-block"><code>INSERT INTO Estudiante (Nombre, Email, Edad, Carrera)
VALUES ('Juan García', 'juan@ejemplo.com', 20, 'DAM');</code></pre>
                <p style="height: 20px;"></p>

                <h3>Insertar Múltiples Registros</h3>
                <pre class="code-block"><code>INSERT INTO Estudiante (Nombre, Email, Edad, Carrera)
VALUES 
    ('María López', 'maria@ejemplo.com', 19, 'DAW'),
    ('Pedro González', 'pedro@ejemplo.com', 21, 'DAM');</code></pre>
                <p style="height: 20px;"></p>

                <h3>Insertar sin Especificar Columnas</h3>
                <p><em>Nota: Requiere proporcionar valores para todas las columnas en el mismo orden que se definieron.</em></p>
                <pre class="code-block"><code>INSERT INTO Estudiante
VALUES (4, 'Ana Martín', 'ana@ejemplo.com', 18, 'DAW');</code></pre>

                <h2 class="section-title">UPDATE</h2>
                <p>Modifica datos existentes en una tabla.</p>

                <h3>Actualizar un Registro Específico</h3>
                <pre class="code-block"><code>UPDATE Estudiante
SET Email = 'juan.nuevo@ejemplo.com'
WHERE ID = 1;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Actualizar Múltiples Columnas</h3>
                <pre class="code-block"><code>UPDATE Estudiante
SET Edad = 21, Carrera = 'DAW'
WHERE Nombre = 'Juan García';</code></pre>
                <p style="height: 20px;"></p>

                <h3>Actualizar con Cálculo</h3>
                <pre class="code-block"><code>UPDATE Estudiante
SET Edad = Edad + 1
WHERE Carrera = 'DAM';</code></pre>

                <h2 class="section-title">DELETE</h2>
                <p>Elimina registros de una tabla.</p>

                <h3>Eliminar un Registro Específico</h3>
                <pre class="code-block"><code>DELETE FROM Estudiante
WHERE ID = 1;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Eliminar Múltiples Registros</h3>
                <pre class="code-block"><code>DELETE FROM Estudiante
WHERE Edad < 18;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Eliminar Todo (¡CUIDADO!)</h3>
                <pre class="code-block"><code>DELETE FROM Estudiante;</code></pre>

                <div class="warning">
                    <p class="warning-title">Importante</p>
                    <p>Siempre usa una cláusula WHERE en UPDATE y DELETE. Sin ella, afectarás a todos los registros de la tabla.</p>
                </div>
            </div>`},{id:"4-1-select-basico",category:"cat-4-consultas",categoryTitle:"4. Consultas SELECT, Filtros & Agrupación",categoryIcon:"🔍",num:"4.1",title:"4.1 Consultas Fundamentales: SELECT, WHERE, ORDER BY y LIMIT",shortDesc:"Extracción de información: proyecciones, operadores lógicos, ordenamiento y paginación con LIMIT y OFFSET.",badge:"4.1 DQL / SELECT",accentColor:"#1d4ed8",html:`<h1 class="chapter">4.1 Consultas Fundamentales: SELECT, WHERE, ORDER BY y LIMIT</h1>

                <h2 class="section-title">SELECT Básico</h2>
                <p>El comando SELECT permite recuperar datos de una tabla.</p>

                <h3>Seleccionar Todas las Columnas</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Seleccionar Columnas Específicas</h3>
                <pre class="code-block"><code>SELECT Nombre, Email 
FROM Estudiante;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Usar Alias para Columnas</h3>
                <pre class="code-block"><code>SELECT Nombre AS 'Nombre del Estudiante',
       Email AS 'Correo Electrónico'
FROM Estudiante;</code></pre>

                <h2 class="section-title">WHERE - Filtrado de Datos</h2>
                <p>La cláusula WHERE filtra los registros que cumplen una o más condiciones.</p>

                <h3>Filtro Simple</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
WHERE Edad > 18;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Múltiples Condiciones con AND</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
WHERE Edad > 18 
AND Carrera = 'DAM';</code></pre>
                <p style="height: 20px;"></p>

                <h3>Múltiples Condiciones con OR</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
WHERE Carrera = 'DAM' 
OR Carrera = 'DAW';</code></pre>
                <p style="height: 20px;"></p>

                <h3>Negación con NOT</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
WHERE NOT Carrera = 'DAM';</code></pre>

                <h2 class="section-title">ORDER BY - Ordenamiento</h2>
                <p>Ordena los resultados de forma ascendente (ASC) o descendente (DESC).</p>

                <h3>Orden Ascendente por Defecto</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
ORDER BY Nombre;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Orden Descendente</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
ORDER BY Edad DESC;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Múltiples Columnas</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
ORDER BY Carrera ASC, Nombre ASC;</code></pre>

                <h2 class="section-title">LIMIT - Limitar Resultados</h2>
                <p>Limita el número de registros devueltos.</p>

                <h3>Los Primeros Registros</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
LIMIT 5;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Registros con Offset (Saltar)</h3>
                <pre class="code-block"><code>SELECT * 
FROM Estudiante 
LIMIT 5 OFFSET 2;</code></pre>

                <h2 class="section-title">DISTINCT - Valores Únicos</h2>
                <p>Elimina duplicados de los resultados.</p>

                <pre class="code-block"><code>SELECT DISTINCT Carrera 
FROM Estudiante;</code></pre>

                <h2 class="section-title">JOINs - Combinar Tablas</h2>
                <p>Los JOINs permiten combinar datos de múltiples tablas basándose en relaciones.</p>

                <h3>INNER JOIN</h3>
                <p>Retorna solo los registros que tienen coincidencia en ambas tablas.</p>

                <pre class="code-block"><code>SELECT e.Nombre, a.Nombre
FROM Estudiante e
INNER JOIN Matricula m ON e.ID = m.ID_Estudiante
INNER JOIN Asignatura a ON m.ID_Asignatura = a.ID;</code></pre>

                <h3>LEFT JOIN</h3>
                <p>Retorna todos los registros de la tabla izquierda más las coincidencias de la derecha.</p>

                <pre class="code-block"><code>SELECT p.Nombre, a.Nombre
FROM Profesor p
LEFT JOIN Asignatura a ON p.ID = a.ID_Profesor;</code></pre>

                <h2 class="section-title">Funciones de Agregación</h2>
                <p>Las funciones de agregación calculan valores a partir de múltiples filas.</p>

                <h3>Contar Registros</h3>
                <pre class="code-block"><code>SELECT COUNT(*) 
FROM Estudiante;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Calcular Promedio</h3>
                <pre class="code-block"><code>SELECT AVG(Edad) 
FROM Estudiante;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Encontrar Máximo</h3>
                <pre class="code-block"><code>SELECT MAX(Edad) 
FROM Estudiante;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Encontrar Mínimo</h3>
                <pre class="code-block"><code>SELECT MIN(Edad) 
FROM Estudiante;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Sumar Valores</h3>
                <pre class="code-block"><code>SELECT SUM(Edad) 
FROM Estudiante;</code></pre>

                <h2 class="section-title">GROUP BY y HAVING</h2>
                <p>GROUP BY agrupa registros, y HAVING filtra los grupos resultantes.</p>

                <h3>Contar Estudiantes por Carrera</h3>
                <pre class="code-block"><code>SELECT Carrera, COUNT(*) as Num_Estudiantes
FROM Estudiante
GROUP BY Carrera;</code></pre>
                <p style="height: 20px;"></p>

                <h3>Mostrar Solo Carreras con Más de 2 Estudiantes</h3>
                <pre class="code-block"><code>SELECT Carrera, COUNT(*) as Num_Estudiantes
FROM Estudiante
GROUP BY Carrera
HAVING COUNT(*) > 2;</code></pre>

                <div class="warning">
                    <p class="warning-title">Diferencia crucial</p>
                    <p><strong>WHERE</strong> filtra FILAS antes de GROUP BY. <strong>HAVING</strong> filtra GRUPOS después de GROUP BY. Por eso COUNT no puede ir en WHERE, solo en HAVING.</p>
                </div>

                <h2 class="section-title">Subconsultas</h2>
                <p>Una consulta dentro de otra consulta.</p>

                <h3>Estudiantes Mayores que el Promedio</h3>
                <pre class="code-block"><code>SELECT Nombre, Edad
FROM Estudiante
WHERE Edad > (SELECT AVG(Edad) FROM Estudiante);</code></pre>
                <p style="height: 20px;"></p>

                <h3>Estudiantes Matriculados en Asignatura Específica</h3>
                <pre class="code-block"><code>SELECT Nombre
FROM Estudiante
WHERE ID IN (SELECT ID_Estudiante FROM Matricula WHERE ID_Asignatura = 1);</code></pre>
            </div>`},{id:"5-1-problema",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.1",title:"5.1 🎯 El Problema: ¿Por qué WHERE no funciona con COUNT y agregadas?",shortDesc:"Descubre la razón técnica exacta por la que SQL rechaza funciones agregadas dentro de la cláusula WHERE.",badge:"5.1 Masterclass",accentColor:"#dc2626",html:`<h2>🎯 El Problema: ¿Por qué WHERE no funciona con COUNT?</h2>
            
            <p>Imagina que eres gerente de un <strong>gimnasio</strong> y quieres saber: <span class="highlight">"¿Cuál es el mes con MÁS de 50 inscripciones nuevas?"</span></p>

            <p>Si intentas esta consulta...</p>

            <div class="code-block">
<span class="keyword">SELECT</span> mes, <span class="function">COUNT</span>(*) <span class="keyword">as</span> nuevos_clientes
<span class="keyword">FROM</span> inscripciones
<span class="keyword">WHERE</span> <span class="function">COUNT</span>(*) > 50
<span class="keyword">GROUP BY</span> mes;
            </div>

            <p style="color: var(--accent); font-weight: 700; font-size: 1.1rem;">❌ ERROR: ¡No funciona!</p>

            <div class="analogy">
                💡 <strong>¿Por qué?</strong> Es como si dijeras "dame los meses que tienen más de 50 clientes" cuando aún tienes todos los clientes desordenados en una lista. No has contado nada todavía, así que <strong>COUNT ni siquiera existe en esa fase</strong>.
            </div>

            <p><strong>La solución:</strong> SQL ejecuta tu consulta en un <span class="highlight">orden específico</span> que probablemente no es el orden que escribiste.</p>
        </div>`},{id:"5-2-orden",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.2",title:"5.2 ⏱️ El Orden Mágico de Ejecución Interna de SQL",shortDesc:"El ciclo de vida interno de una consulta: FROM ➔ JOIN ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ DISTINCT ➔ ORDER BY ➔ LIMIT.",badge:"5.2 Arquitectura",accentColor:"#7c3aed",html:`<h2>⏱️ El Orden Mágico de SQL</h2>

            <p>SQL <strong>SIEMPRE</strong> ejecuta en este orden, sin importar cómo lo escribas:</p>

            <div class="data-flow">
                <div class="data-box">
                    <h4>1️⃣ FROM</h4>
                    <div class="count">📊</div>
                    <p>Obtiene todas las filas</p>
                </div>
                <div class="data-box">
                    <h4>2️⃣ WHERE</h4>
                    <div class="count">🔍</div>
                    <p>Filtra filas individuales</p>
                </div>
                <div class="data-box">
                    <h4>3️⃣ GROUP BY</h4>
                    <div class="count">📦</div>
                    <p>Agrupa las filas</p>
                </div>
                <div class="data-box">
                    <h4>4️⃣ HAVING</h4>
                    <div class="count">🎯</div>
                    <p>Filtra los grupos</p>
                </div>
                <div class="data-box">
                    <h4>5️⃣ SELECT</h4>
                    <div class="count">✨</div>
                    <p>Muestra el resultado</p>
                </div>
            </div>

            <div class="concept-card">
                <h4>🔑 La Clave</h4>
                <p><strong>WHERE</strong> trabaja con filas individuales → No conoce de grupos ni de COUNT</p>
                <p><strong>HAVING</strong> trabaja con grupos → Aquí SÍ existe COUNT porque ya agrupaste</p>
                <p><strong>COUNT</strong> solo existe después de GROUP BY</p>
            </div>
        </div>`},{id:"5-3-analogia",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.3",title:"5.3 🪙 Analogía Didáctica: Filtrar Monedas Sueltas vs Montones",shortDesc:"Aprende la diferencia intuitiva entre filtrar filas individuales y filtrar montones/grupos ya acumulados.",badge:"5.3 Didáctica Visual",accentColor:"#16a34a",html:`<h2>🪙 Analogía del Mundo Real: Separar Monedas</h2>

            <p>Imagina que tienes monedas esparcidas en el piso y quieres <strong>contarlas por año de acuñación</strong>. Aquí está el proceso:</p>

            <div class="comparison">
                <div class="comparison-item wrong">
                    <div class="label">❌ DONDE (WHERE)</div>
                    <ul>
                        <li>Filtra monedas individuales</li>
                        <li>"Dame monedas doradas"</li>
                        <li>Sucede ANTES de contar</li>
                        <li>No puede usar "cantidad total"</li>
                    </ul>
                </div>
                <div class="comparison-item correct">
                    <div class="label">✅ FILTRANDO GRUPOS (HAVING)</div>
                    <ul>
                        <li>Filtra después de contar</li>
                        <li>"Dame años con +5 monedas"</li>
                        <li>Sucede DESPUÉS de agrupar</li>
                        <li>Aquí SÍ usas la cantidad</li>
                    </ul>
                </div>
            </div>
        </div>`},{id:"5-4-ejercicios-gimnasio",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.4",title:"5.4 🏋️ Taller del Gimnasio: 3 Ejercicios Prácticos Resueltos",shortDesc:"Casos reales resueltos: Clases con >20 alumnos, entrenadores en turno de tarde y miembros con cuota VIP.",badge:"5.4 Taller Práctico",accentColor:"#2563eb",html:`<h2>🏋️ 3 Ejercicios Prácticos con el Gimnasio</h2>

            <p>Usando esta tabla de inscripciones:</p>
            <div class="code-block">
id_cliente | nombre        | mes      | modalidad    | precio
---------|---------------|----------|--------------|-------
1        | Juan          | Enero    | Crossfit     | 50
2        | María         | Enero    | Yoga         | 40
3        | Pedro         | Enero    | Crossfit     | 50
4        | Ana           | Febrero  | Natación     | 60
5        | Luis          | Febrero  | Yoga         | 40
6        | Sofia         | Marzo    | Crossfit     | 50
            </div>

            <div class="tabs">
                <button class="tab-button active">Ejercicio 1: Solo GROUP BY</button>
                <button class="tab-button">Ejercicio 2: Con HAVING</button>
                <button class="tab-button">Ejercicio 3: WHERE + HAVING</button>
            </div>

            <div id="tab1" class="tab-content active">
                <h4>Ejercicio 1: Contar clientes por mes</h4>
                <p><strong>Pregunta:</strong> ¿Cuántos clientes se inscribieron en cada mes?</p>

                <div class="code-block">
<span class="keyword">SELECT</span> mes, <span class="function">COUNT</span>(*) <span class="keyword">as</span> nuevos_clientes
<span class="keyword">FROM</span> inscripciones
<span class="keyword">GROUP BY</span> mes;
                </div>

                <p><strong>Resultado:</strong></p>
                <div class="code-block">
mes      | nuevos_clientes
---------|----------------
Enero    | 3
Febrero  | 2
Marzo    | 1
                </div>

                <div class="summary-box">
                    <h4>📝 Explicación</h4>
                    <p>Aquí solo usamos GROUP BY. SQL agrupa por mes y cuenta cuántas filas hay en cada grupo.</p>
                </div>
            </div>

            <div id="tab2" class="tab-content">
                <h4>Ejercicio 2: Meses con MÁS de 2 clientes</h4>
                <p><strong>Pregunta:</strong> ¿Qué meses tuvieron MÁS de 2 inscripciones?</p>

                <div class="code-block">
<span class="keyword">SELECT</span> mes, <span class="function">COUNT</span>(*) <span class="keyword">as</span> nuevos_clientes
<span class="keyword">FROM</span> inscripciones
<span class="keyword">GROUP BY</span> mes
<span class="keyword">HAVING</span> <span class="function">COUNT</span>(*) > 2;
                </div>

                <p><strong>Resultado:</strong></p>
                <div class="code-block">
mes      | nuevos_clientes
---------|----------------
Enero    | 3
                </div>

                <div class="summary-box">
                    <h4>📝 Explicación</h4>
                    <p>Primero GROUP BY agrupa. Luego HAVING filtra esos grupos. Solo Enero tiene > 2, así que es el único resultado.</p>
                </div>
            </div>

            <div id="tab3" class="tab-content">
                <h4>Ejercicio 3: Clientes de Crossfit, agrupados por mes, solo meses con >1</h4>
                <p><strong>Pregunta:</strong> ¿Qué meses tuvieron más de 1 inscripción en Crossfit?</p>

                <div class="code-block">
<span class="keyword">SELECT</span> mes, <span class="function">COUNT</span>(*) <span class="keyword">as</span> crossfit_count
<span class="keyword">FROM</span> inscripciones
<span class="keyword">WHERE</span> modalidad = <span class="string">'Crossfit'</span>
<span class="keyword">GROUP BY</span> mes
<span class="keyword">HAVING</span> <span class="function">COUNT</span>(*) > 1;
                </div>

                <p><strong>Resultado:</strong></p>
                <div class="code-block">
mes      | crossfit_count
---------|---------------
Enero    | 2
                </div>

                <div class="summary-box">
                    <h4>📝 Explicación</h4>
                    <p>1️⃣ WHERE filtra primero (solo Crossfit)<br>
                    2️⃣ GROUP BY agrupa por mes<br>
                    3️⃣ HAVING filtra los grupos (>1)</p>
                </div>
            </div>
        </div>`},{id:"5-5-comparacion",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.5",title:"5.5 🆚 Comparación Visual: Errores Comunes vs Código Optimizado",shortDesc:"Errores típicos de examen y producción contrastados frente a la solución profesional optimizada.",badge:"5.5 Casos Reales",accentColor:"#dc2626",html:`<h2>🆚 Comparación: MAL vs BIEN</h2>

            <div class="comparison">
                <div class="comparison-item wrong">
                    <div class="label">❌ INCORRECTO</div>
                    <div class="code-block" style="margin: 10px 0;">
<span class="keyword">SELECT</span> modalidad, <span class="function">COUNT</span>(*)
<span class="keyword">FROM</span> inscripciones
<span class="keyword">WHERE</span> <span class="function">COUNT</span>(*) > 2
<span class="keyword">GROUP BY</span> modalidad;
                    </div>
                    <p>❌ WHERE no puede usar funciones de agregación</p>
                    <p>❌ COUNT no existe en la fase WHERE</p>
                </div>
                <div class="comparison-item correct">
                    <div class="label">✅ CORRECTO</div>
                    <div class="code-block" style="margin: 10px 0;">
<span class="keyword">SELECT</span> modalidad, <span class="function">COUNT</span>(*)
<span class="keyword">FROM</span> inscripciones
<span class="keyword">GROUP BY</span> modalidad
<span class="keyword">HAVING</span> <span class="function">COUNT</span>(*) > 2;
                    </div>
                    <p>✅ HAVING filtra DESPUÉS de agrupar</p>
                    <p>✅ Aquí COUNT ya existe</p>
                </div>
            </div>
        </div>`},{id:"5-6-tabla-comparativa",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.6",title:"5.6 📊 Tabla Comparativa Definitiva: WHERE vs HAVING Frente a Frente",shortDesc:"Matriz exhaustiva de diferencias: momento de ejecución, uso de agregadas, impacto en rendimiento y sintaxis.",badge:"5.6 Comparativa",accentColor:"#1a5490",html:`<h2>📊 Tabla Comparativa: WHERE vs HAVING</h2>

            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Característica</th>
                        <th>WHERE</th>
                        <th>HAVING</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Filtra...</strong></td>
                        <td>Filas individuales</td>
                        <td>Grupos de filas</td>
                    </tr>
                    <tr>
                        <td><strong>Se ejecuta...</strong></td>
                        <td>ANTES de GROUP BY</td>
                        <td>DESPUÉS de GROUP BY</td>
                    </tr>
                    <tr>
                        <td><strong>Puede usar funciones de agregación</strong></td>
                        <td>❌ No</td>
                        <td>✅ Sí (COUNT, SUM, AVG, etc.)</td>
                    </tr>
                    <tr>
                        <td><strong>Ejemplo</strong></td>
                        <td><code>WHERE edad > 18</code></td>
                        <td><code>HAVING COUNT(*) > 5</code></td>
                    </tr>
                    <tr>
                        <td><strong>Usado cuando quieres...</strong></td>
                        <td>Filtrar antes de agrupar</td>
                        <td>Filtrar después de agrupar</td>
                    </tr>
                    <tr>
                        <td><strong>Combina con...</strong></td>
                        <td>WHERE + GROUP BY + HAVING</td>
                        <td>GROUP BY + HAVING</td>
                    </tr>
                </tbody>
            </table>
        </div>`},{id:"5-7-checklist",category:"cat-5-masterclass",categoryTitle:"5. Masterclass: El Orden Mágico (WHERE vs HAVING)",categoryIcon:"⏱️",num:"5.7",title:"5.7 ✅ Checklist Interactiva: Construye tu Consulta Paso a Paso",shortDesc:"Guía de verificación interactiva para no dudar nunca más entre WHERE y HAVING al escribir SQL.",badge:"5.7 Herramienta",accentColor:"#f59e0b",html:`<h2>✅ Checklist: Construye tu Consulta</h2>

            <p>Usa esta lista cada vez que escribas una consulta con GROUP BY:</p>

            <div class="checklist">
                <h4>Pasos para la Consulta Perfecta</h4>

                <div class="checklist-item">
                    <input type="checkbox" id="check1">
                    <label for="check1"><strong>1. Identifica la tabla</strong> - ¿De dónde vienen los datos?</label>
                </div>

                <div class="checklist-item">
                    <input type="checkbox" id="check2">
                    <label for="check2"><strong>2. ¿Necesitas WHERE?</strong> - ¿Filtrar filas ANTES de agrupar?</label>
                </div>

                <div class="checklist-item">
                    <input type="checkbox" id="check3">
                    <label for="check3"><strong>3. Define GROUP BY</strong> - ¿Por qué columna agrupas?</label>
                </div>

                <div class="checklist-item">
                    <input type="checkbox" id="check4">
                    <label for="check4"><strong>4. ¿Necesitas HAVING?</strong> - ¿Filtrar GRUPOS (con COUNT)?</label>
                </div>

                <div class="checklist-item">
                    <input type="checkbox" id="check5">
                    <label for="check5"><strong>5. Define SELECT</strong> - ¿Qué columnas y funciones?</label>
                </div>

                <div class="checklist-item">
                    <input type="checkbox" id="check6">
                    <label for="check6"><strong>6. Prueba tu sintaxis</strong> - ¿El código está correcto?</label>
                </div>
            </div>

            <div class="summary-box">
                <h4>🎯 Recuerda el Orden</h4>
                <p><strong>FROM → WHERE → GROUP BY → HAVING → SELECT</strong></p>
                <p>Este es el orden que SQL SIEMPRE sigue, no importa cómo lo escribas.</p>
            </div>
        </div>`},{id:"6-1-cte-basico",category:"cat-6-cte",categoryTitle:"6. SQL Moderno: CTEs & Recursividad",categoryIcon:"🌲",num:"6.1",title:"6.1 CTEs Simples y Múltiples (Cláusula WITH): Legibilidad y Reutilización",shortDesc:"Escribe consultas modulares y reutilizables eliminando las subconsultas anidadas ininteligibles.",badge:"6.1 CTEs",accentColor:"#0891b2",html:`
<div class="content-header">
  <h2>6.1 CTEs (Common Table Expressions) & Cláusula WITH</h2>
  <p class="subtitle">Escribe consultas SQL limpias, modulares y reutilizables eliminando las subconsultas anidadas ininteligibles ("código espagueti").</p>
</div>

<h3>1. ¿Qué es una CTE (Common Table Expression)?</h3>
<p>Una <strong>CTE</strong> es un conjunto de resultados temporal con nombre que existe exclusivamente durante la ejecución de una sola consulta (<code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code> o <code>DELETE</code>). Se define utilizando la cláusula <code>WITH</code> antes de la consulta principal.</p>

<div class="sql-normalization-comparison">
  <div class="sql-norm-box error">
    <div class="norm-header error">
      <span class="norm-icon">❌</span>
      <strong>Subconsultas Anidadas Ilegibles ("SQL Espagueti")</strong>
    </div>
    <pre class="code-block"><code>SELECT c.nombre, sub.total_gastado
FROM cliente c
JOIN (
    SELECT p.cliente_id, SUM(p.total) AS total_gastado
    FROM pedido p
    WHERE p.estado = 'COMPLETADO'
    GROUP BY p.cliente_id
    HAVING SUM(p.total) > 1000
) sub ON c.id = sub.cliente_id
WHERE c.pais = 'ES';</code></pre>
    <p class="norm-reason">⚠️ Difícil de leer de arriba a abajo, imposible de reutilizar el mismo bloque dos veces y depuración compleja.</p>
  </div>

  <div class="sql-norm-box success">
    <div class="norm-header success">
      <span class="norm-icon">✅</span>
      <strong>Solución Profesional con CTE (Cláusula WITH)</strong>
    </div>
    <pre class="code-block"><code>WITH ClientesVIP AS (
    SELECT cliente_id, SUM(total) AS total_gastado
    FROM pedido
    WHERE estado = 'COMPLETADO'
    GROUP BY cliente_id
    HAVING SUM(total) > 1000
)
SELECT c.nombre, c.email, vip.total_gastado
FROM ClientesVIP vip
JOIN cliente c ON c.id = vip.cliente_id
WHERE c.pais = 'ES'
ORDER BY vip.total_gastado DESC;</code></pre>
    <p class="norm-reason success">✅ Lógica secuencial impecable: primero defines qué es un Cliente VIP, luego lo consumes como una tabla normal.</p>
  </div>
</div>

<h3>2. Encadenamiento de Múltiples CTEs</h3>
<p>Puedes encadenar tantas CTEs como necesites separándolas por comas. Cada CTE sucesiva puede referenciar a las anteriores:</p>

<pre class="code-block"><code>WITH
VentasPorMes AS (
    SELECT 
        DATE_TRUNC('month', fecha) AS mes,
        departamento_id,
        SUM(monto) AS ventas_mes
    FROM factura
    WHERE fecha >= '2024-01-01'
    GROUP BY 1, 2
),
PromedioDepartamental AS (
    SELECT 
        departamento_id,
        AVG(ventas_mes) AS promedio_mensual
    FROM VentasPorMes
    GROUP BY departamento_id
)
SELECT 
    d.nombre AS departamento,
    v.mes,
    v.ventas_mes,
    p.promedio_mensual,
    ROUND((v.ventas_mes - p.promedio_mensual)::numeric, 2) AS desviacion
FROM VentasPorMes v
JOIN PromedioDepartamental p ON v.departamento_id = p.departamento_id
JOIN departamento d ON d.id = v.departamento_id
ORDER BY d.nombre, v.mes;</code></pre>

<div class="tip-box">
  <p><strong>💡 Regla de Oro:</strong> Usa CTEs siempre que una subconsulta se vuelva de más de 3 líneas o cuando necesites utilizar el mismo cálculo temporal en varios JOINs o uniones.</p>
</div>
`},{id:"6-2-cte-recursivo",category:"cat-6-cte",categoryTitle:"6. SQL Moderno: CTEs & Recursividad",categoryIcon:"🌲",num:"6.2",title:"6.2 CTEs Recursivas (WITH RECURSIVE): Jerarquías de Empleados y Grafos",shortDesc:"Recorre árboles organizacionales, organigramas y genera secuencias matemáticas con auto-referencia.",badge:"6.2 Recursividad",accentColor:"#0891b2",html:`
<div class="content-header">
  <h2>6.2 CTEs Recursivas (WITH RECURSIVE): Jerarquías y Grafos</h2>
  <p class="subtitle">Recorre árboles organizacionales, organigramas de empleados y genera secuencias matemáticas con auto-referencia en SQL estándar.</p>
</div>

<h3>1. Anatomía de una Consulta Recursiva</h3>
<p>Una <strong>CTE recursiva</strong> es una consulta que se referencia a sí misma para resolver estructuras jerárquicas o generativas, y consta de 3 partes obligatorias conectadas por un <code>UNION ALL</code>:</p>
<ol>
  <li><strong>Miembro Ancla (Anchor Member):</strong> Consulta base que devuelve el punto de partida (ej. el CEO que no tiene jefe).</li>
  <li><strong>Miembro Recursivo (Recursive Member):</strong> Consulta que hace referencia al propio nombre de la CTE, ejecutándose en bucle hasta que devuelva 0 filas.</li>
  <li><strong>Condición de Parada:</strong> Implícita en el JOIN cuando se alcanza una hoja del árbol (o un límite explícito).</li>
</ol>

<pre class="code-block"><code>-- Organigrama de la Empresa: Desde el CEO hasta el último empleado
WITH RECURSIVE Organigrama AS (
    -- 1. MIEMBRO ANCLA: Empleados sin jefe (Nivel 1: CEO / Dirección General)
    SELECT 
        id, 
        nombre, 
        puesto, 
        id_jefe, 
        1 AS nivel,
        CAST(nombre AS VARCHAR(500)) AS ruta_jerarquica
    FROM empleado
    WHERE id_jefe IS NULL

    UNION ALL

    -- 2. MIEMBRO RECURSIVO: Empleados cuyo jefe ya está en la jerarquía previa
    SELECT 
        e.id, 
        e.nombre, 
        e.puesto, 
        e.id_jefe, 
        org.nivel + 1,
        CAST(org.ruta_jerarquica || ' -> ' || e.nombre AS VARCHAR(500))
    FROM empleado e
    INNER JOIN Organigrama org ON e.id_jefe = org.id
)
SELECT 
    REPEAT('   ', nivel - 1) || '👤 ' || nombre AS estructura_visual,
    puesto,
    nivel,
    ruta_jerarquica
FROM Organigrama
ORDER BY nivel, id_jefe;</code></pre>

<h3>2. Generador de Series Temporales y Calendarios</h3>
<p>Las CTEs recursivas resuelven el clásico problema de rellenar huecos en informes (días sin ventas):</p>

<pre class="code-block"><code>-- Generar los 31 días de Enero para evitar huecos en reportes analíticos
WITH RECURSIVE DiasMes AS (
    SELECT DATE '2024-01-01' AS fecha
    UNION ALL
    SELECT (fecha + INTERVAL '1 day')::date
    FROM DiasMes
    WHERE fecha < DATE '2024-01-31'
)
SELECT 
    d.fecha,
    COALESCE(SUM(v.total), 0) AS ventas_totales
FROM DiasMes d
LEFT JOIN venta v ON v.fecha = d.fecha
GROUP BY d.fecha
ORDER BY d.fecha ASC;</code></pre>
`},{id:"7-1-ventanas-fundamentos",category:"cat-7-ventanas",categoryTitle:"7. Funciones de Ventana (Window Functions)",categoryIcon:"📈",num:"7.1",title:"7.1 Fundamentos de Funciones de Ventana (Cláusula OVER y PARTITION BY)",shortDesc:"Calcula acumulados, medias móviles y comparativas analíticas sin colapsar las filas como GROUP BY.",badge:"7.1 Ventanas",accentColor:"#2563eb",html:`
<div class="content-header">
  <h2>7.1 Fundamentos de Funciones de Ventana (Window Functions)</h2>
  <p class="subtitle">Calcula acumulados, medias móviles y comparativas analíticas sin colapsar las filas de tu resultado como hace GROUP BY.</p>
</div>

<h3>1. GROUP BY vs Funciones de Ventana (OVER)</h3>
<p>Una <strong>función de ventana (Window Function)</strong> es un cálculo analítico que opera sobre un conjunto de filas relacionadas con la fila actual, conservando la identidad y granularidad de cada registro individual en lugar de colapsarlo como hace <code>GROUP BY</code>.</p>
<div class="sql-normalization-comparison">
  <div class="sql-norm-box error">
    <div class="norm-header error">
      <span class="norm-icon">📉</span>
      <strong>GROUP BY: Colapsa Múltiples Filas en 1</strong>
    </div>
    <pre class="code-block"><code>SELECT departamento, AVG(salario) AS salario_medio
FROM empleado
GROUP BY departamento;
-- ⚠️ Se pierde el detalle individual de cada empleado</code></pre>
  </div>

  <div class="sql-norm-box success">
    <div class="norm-header success">
      <span class="norm-icon">📈</span>
      <strong>OVER(): Mantiene Todas las Filas + Métrica</strong>
    </div>
    <pre class="code-block"><code>SELECT 
    nombre, 
    departamento, 
    salario,
    AVG(salario) OVER (PARTITION BY departamento) AS salario_medio_depto
FROM empleado;
-- ✅ Cada fila conserva sus datos y añade la media de su grupo</code></pre>
  </div>
</div>

<h3>2. La Cláusula OVER() Desglosada</h3>
<ul>
  <li><code>PARTITION BY columna</code>: Divide el dataset en subgrupos independientes (ventanas).</li>
  <li><code>ORDER BY columna</code>: Define el orden temporal o numérico dentro de cada ventana.</li>
  <li><code>ROWS BETWEEN ...</code>: Acota el marco exacto (ej. los últimos 3 meses).</li>
</ul>

<pre class="code-block"><code>-- Total Acumulado (Running Total) de Ventas a lo largo del tiempo
SELECT 
    id,
    fecha,
    cliente_id,
    monto,
    -- Acumulado cronológico general
    SUM(monto) OVER (ORDER BY fecha ASC) AS acumulado_global,
    -- Acumulado independiente para cada cliente
    SUM(monto) OVER (PARTITION BY cliente_id ORDER BY fecha ASC) AS acumulado_cliente
FROM factura
ORDER BY fecha;</code></pre>
`},{id:"7-2-ranking-desplazamiento",category:"cat-7-ventanas",categoryTitle:"7. Funciones de Ventana (Window Functions)",categoryIcon:"📈",num:"7.2",title:"7.2 Ranking Analítico & Desplazamientos: ROW_NUMBER, RANK, LEAD y LAG",shortDesc:"Domina las funciones de ordenación y comparativas intermensuales más preguntadas en entrevistas técnicas.",badge:"7.2 Ranking",accentColor:"#2563eb",html:`
<div class="content-header">
  <h2>7.2 Ranking Analítico & Desplazamientos: ROW_NUMBER, RANK, DENSE_RANK, LEAD y LAG</h2>
  <p class="subtitle">Domina las funciones de ordenación y comparativas intermensuales más preguntadas en entrevistas técnicas.</p>
</div>

<h3>1. Comparativa Visual: ROW_NUMBER vs RANK vs DENSE_RANK</h3>
<p>Observa el comportamiento ante salarios idénticos (empates en $3,000):</p>

<div class="sql-pizarra-table-wrapper">
  <table class="sql-pizarra-table">
    <thead>
      <tr>
        <th>Empleado</th>
        <th>Salario</th>
        <th>ROW_NUMBER()</th>
        <th>RANK()</th>
        <th>DENSE_RANK()</th>
        <th>Explicación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ana</td>
        <td><strong>$4,500</strong></td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>Primer puesto único</td>
      </tr>
      <tr>
        <td>Carlos</td>
        <td><strong>$3,000</strong></td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>Empatado en 2º puesto</td>
      </tr>
      <tr>
        <td>Elena</td>
        <td><strong>$3,000</strong></td>
        <td>3</td>
        <td>2</td>
        <td>2</td>
        <td>Empatada en 2º puesto</td>
      </tr>
      <tr>
        <td>Marcos</td>
        <td><strong>$2,200</strong></td>
        <td>4</td>
        <td><strong style="color: #dc2626;">4 (Salta el 3)</strong></td>
        <td><strong style="color: #16a34a;">3 (Consecutivo)</strong></td>
        <td>DENSE_RANK no genera saltos numéricos</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>2. LEAD y LAG: Comparativas Mes Anterior vs Actual</h3>
<pre class="code-block"><code>-- Comparativa de Ingresos respecto al mes anterior (Crecimiento %)
WITH VentasMensuales AS (
    SELECT 
        DATE_TRUNC('month', fecha)::date AS mes,
        SUM(total) AS ingresos_actuales
    FROM venta
    GROUP BY 1
)
SELECT 
    mes,
    ingresos_actuales,
    -- LAG extrae el valor del registro inmediatamente anterior
    LAG(ingresos_actuales, 1) OVER (ORDER BY mes ASC) AS ingresos_mes_anterior,
    -- LEAD extrae el valor del registro inmediatamente siguiente
    LEAD(ingresos_actuales, 1) OVER (ORDER BY mes ASC) AS ingresos_mes_siguiente,
    -- Cálculo de variación porcentual
    ROUND(
        (ingresos_actuales - LAG(ingresos_actuales, 1) OVER (ORDER BY mes ASC)) * 100.0 /
        NULLIF(LAG(ingresos_actuales, 1) OVER (ORDER BY mes ASC), 0), 2
    ) AS variacion_pct
FROM VentasMensuales
ORDER BY mes ASC;</code></pre>
`},{id:"8-1-joins-visuales",category:"cat-8-joins",categoryTitle:"8. Guía Visual Exhaustiva de JOINs",categoryIcon:"🔗",num:"8.1",title:"8.1 Los 6 Tipos de JOINs Visuales (INNER, LEFT, RIGHT, FULL, CROSS, SELF)",shortDesc:"Comprende con diagramas de conjuntos qué registros se conservan y cuáles se descartan en cada unión.",badge:"8.1 6 Tipos JOIN",accentColor:"#1a5490",html:`
<div class="content-header">
  <h2>8.1 Guía Visual Exhaustiva de los 6 Tipos de JOINs</h2>
  <p class="subtitle">Comprende con diagramas de conjuntos qué registros se conservan y cuáles se descartan en cada operación de unión.</p>
</div>

<h3>Conjuntos de Datos de Prueba</h3>
<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <div style="flex: 1; min-width: 250px;">
    <strong>Tabla: EMPLEADO</strong>
    <table class="sql-pizarra-table compact">
      <thead><tr><th>ID</th><th>Nombre</th><th>Depto_ID</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Ana</td><td>10</td></tr>
        <tr><td>2</td><td>Luis</td><td>20</td></tr>
        <tr><td>3</td><td>Clara</td><td>NULL (Sin Depto)</td></tr>
      </tbody>
    </table>
  </div>
  <div style="flex: 1; min-width: 250px;">
    <strong>Tabla: DEPARTAMENTO</strong>
    <table class="sql-pizarra-table compact">
      <thead><tr><th>ID</th><th>Nombre_Depto</th></tr></thead>
      <tbody>
        <tr><td>10</td><td>Tecnología</td></tr>
        <tr><td>20</td><td>Marketing</td></tr>
        <tr><td>30</td><td>Ventas (Sin Empleados)</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="sql-rel-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
  <div class="sql-er-card" style="border-left: 4px solid #2563eb;">
    <div class="sql-er-header"><strong>1. INNER JOIN</strong> <span class="sql-cardinality-chip">Intersección</span></div>
    <p style="font-size: 0.85rem; color: #475569; padding: 0.5rem 0.8rem 0;">Un <strong>INNER JOIN</strong> es una operación que devuelve únicamente las filas donde existe coincidencia exacta de claves en ambas tablas.</p>
    <pre class="code-block"><code>SELECT e.nombre, d.nombre_depto
FROM empleado e
INNER JOIN departamento d ON e.depto_id = d.id;
-- Resultado: Ana (Tecnología), Luis (Marketing)</code></pre>
  </div>

  <div class="sql-er-card" style="border-left: 4px solid #16a34a;">
    <div class="sql-er-header"><strong>2. LEFT (OUTER) JOIN</strong> <span class="sql-cardinality-chip">Todo Izquierda</span></div>
    <p style="font-size: 0.85rem; color: #475569; padding: 0.5rem 0.8rem 0;">Un <strong>LEFT (OUTER) JOIN</strong> es una unión que conserva TODOS los registros de la tabla izquierda (empleados), rellenando con NULL si no hay coincidencia.</p>
    <pre class="code-block"><code>SELECT e.nombre, d.nombre_depto
FROM empleado e
LEFT JOIN departamento d ON e.depto_id = d.id;
-- Resultado: Ana (Tecnología), Luis (Marketing), Clara (NULL)</code></pre>
  </div>

  <div class="sql-er-card" style="border-left: 4px solid #d97706;">
    <div class="sql-er-header"><strong>3. RIGHT (OUTER) JOIN</strong> <span class="sql-cardinality-chip">Todo Derecha</span></div>
    <p style="font-size: 0.85rem; color: #475569; padding: 0.5rem 0.8rem 0;">Un <strong>RIGHT (OUTER) JOIN</strong> es una unión que conserva TODOS los registros de la tabla derecha (departamentos), aunque no tengan correspondencia.</p>
    <pre class="code-block"><code>SELECT e.nombre, d.nombre_depto
FROM empleado e
RIGHT JOIN departamento d ON e.depto_id = d.id;
-- Resultado: Ana (Tecnología), Luis (Marketing), NULL (Ventas)</code></pre>
  </div>

  <div class="sql-er-card" style="border-left: 4px solid #7c3aed;">
    <div class="sql-er-header"><strong>4. FULL (OUTER) JOIN</strong> <span class="sql-cardinality-chip">Unión Total</span></div>
    <p style="font-size: 0.85rem; color: #475569; padding: 0.5rem 0.8rem 0;">Un <strong>FULL (OUTER) JOIN</strong> es una unión que conserva todas las filas de ambas tablas, rellenando con NULL en el lado sin correspondencia.</p>
    <pre class="code-block"><code>SELECT e.nombre, d.nombre_depto
FROM empleado e
FULL OUTER JOIN departamento d ON e.depto_id = d.id;
-- Resultado: 4 filas (incluye a Clara sin depto y Ventas sin empleados)</code></pre>
  </div>

  <div class="sql-er-card" style="border-left: 4px solid #dc2626;">
    <div class="sql-er-header"><strong>5. CROSS JOIN</strong> <span class="sql-cardinality-chip">Producto Cartesiano</span></div>
    <p style="font-size: 0.85rem; color: #475569; padding: 0.5rem 0.8rem 0;">Un <strong>CROSS JOIN</strong> es una operación que genera el producto cartesiano, multiplicando cada fila de A por todas las filas de B.</p>
    <pre class="code-block"><code>SELECT e.nombre, d.nombre_depto
FROM empleado e
CROSS JOIN departamento d;
-- Resultado: 3 empleados × 3 deptos = 9 filas generadas</code></pre>
  </div>

  <div class="sql-er-card" style="border-left: 4px solid #0891b2;">
    <div class="sql-er-header"><strong>6. SELF JOIN</strong> <span class="sql-cardinality-chip">Auto-Unión</span></div>
    <p style="font-size: 0.85rem; color: #475569; padding: 0.5rem 0.8rem 0;">Un <strong>SELF JOIN</strong> es una consulta donde una tabla se une consigo misma asignando dos alias diferentes.</p>
    <pre class="code-block"><code>SELECT e.nombre AS empleado, j.nombre AS jefe
FROM empleado e
LEFT JOIN empleado j ON e.id_jefe = j.id;</code></pre>
  </div>
</div>
`},{id:"8-2-anti-joins",category:"cat-8-joins",categoryTitle:"8. Guía Visual Exhaustiva de JOINs",categoryIcon:"🔗",num:"8.2",title:"8.2 Anti-JOINs y Filtrado de No Coincidentes (WHERE IS NULL)",shortDesc:"Encuentra registros huérfanos, clientes que jamás han comprado y diferencias entre tablas con máxima eficiencia.",badge:"8.2 Anti-JOIN",accentColor:"#1a5490",html:`
<div class="content-header">
  <h2>8.2 Anti-JOINs y Filtrado de No Coincidentes (WHERE IS NULL)</h2>
  <p class="subtitle">Encuentra registros huérfanos, clientes que jamás han comprado y diferencias entre tablas con la máxima eficiencia.</p>
</div>

<h3>1. El Patrón Anti-JOIN (LEFT JOIN + WHERE IS NULL)</h3>
<p>Un <strong>Anti-JOIN</strong> es una técnica de consulta diseñada para extraer los registros de una tabla que <strong>NO tienen correspondencia</strong> en otra tabla relacionada:</p>

<pre class="code-block"><code>-- Encontrar Clientes que NUNCA han realizado un pedido
SELECT c.id, c.nombre, c.email
FROM cliente c
LEFT JOIN pedido p ON c.id = p.cliente_id
WHERE p.id IS NULL;</code></pre>

<h3>2. ¿Por qué el Anti-JOIN supera a NOT IN?</h3>
<div class="sql-normalization-comparison">
  <div class="sql-norm-box error">
    <div class="norm-header error">
      <span class="norm-icon">⚠️</span>
      <strong>La Trampa de los NULLs en NOT IN</strong>
    </div>
    <pre class="code-block"><code>SELECT * FROM cliente 
WHERE id NOT IN (SELECT cliente_id FROM pedido);
-- 💣 Si la columna \`cliente_id\` contiene UN SOLO valor NULL,
-- la consulta devolverá 0 filas completas debido a la lógica trivaluada de SQL!</code></pre>
  </div>

  <div class="sql-norm-box success">
    <div class="norm-header success">
      <span class="norm-icon">🛡️</span>
      <strong>Alternativas Seguras y Eficientes</strong>
    </div>
    <pre class="code-block"><code>-- Opción 1: LEFT JOIN con IS NULL (Anti-JOIN)
SELECT c.* FROM cliente c
LEFT JOIN pedido p ON c.id = p.cliente_id
WHERE p.id IS NULL;

-- Opción 2: NOT EXISTS (Muy optimizada en Postgres y MySQL)
SELECT c.* FROM cliente c
WHERE NOT EXISTS (
    SELECT 1 FROM pedido p WHERE p.cliente_id = c.id
);</code></pre>
  </div>
</div>
`},{id:"9-1-procedimientos",category:"cat-9-procedimientos",categoryTitle:"9. Procedimientos, Triggers & Transacciones",categoryIcon:"⚡",num:"9.1",title:"9.1 Procedimientos Almacenados (Stored Procedures) y Parámetros IN/OUT",shortDesc:"Modularización en servidor: sintaxis, parámetros IN, OUT, INOUT, ventajas de rendimiento y ejemplos funcionales.",badge:"9.1 Procedimientos",accentColor:"#7c3aed",html:`<h1 class="chapter">9.1 Procedimientos Almacenados (Stored Procedures) y Parámetros IN/OUT</h1>

                <h2 class="section-title">¿Qué es un Procedimiento Almacenado?</h2>
                <p>Un <strong>procedimiento almacenado</strong> es un conjunto de sentencias SQL precompiladas que se almacenan en la base de datos y pueden ser ejecutadas cuando se necesiten. Son como "funciones" de la base de datos.</p>

                <h2 class="section-title">Ventajas de los Procedimientos</h2>
                <ul>
                    <li><strong>Velocidad:</strong> Se ejecutan más rápido porque están precompilados</li>
                    <li><strong>Seguridad:</strong> Encapsulan la lógica, controlando el acceso a datos</li>
                    <li><strong>Reutilización:</strong> Se pueden llamar desde múltiples aplicaciones</li>
                    <li><strong>Mantenibilidad:</strong> Los cambios en la lógica no afectan las aplicaciones cliente</li>
                </ul>

                <h2 class="section-title">Sintaxis Básica</h2>
                <pre class="code-block"><code>DELIMITER $

CREATE PROCEDURE nombre_procedure(parámetros)
BEGIN
    -- Sentencias SQL
END$

DELIMITER ;</code></pre>

                <h2 class="section-title">Parámetros de Procedimientos</h2>

                <h3>Parámetro IN</h3>
                <p>Parámetro de entrada: la aplicación proporciona un valor que el procedimiento utiliza.</p>

                <h3>Parámetro OUT</h3>
                <p>Parámetro de salida: el procedimiento retorna un valor a la aplicación.</p>

                <h3>Parámetro INOUT</h3>
                <p>Parámetro entrada/salida: la aplicación proporciona un valor y el procedimiento lo modifica.</p>

                <h2 class="section-title">Ejemplo: Procedimiento Básico</h2>
                <pre class="code-block"><code>DELIMITER $

CREATE PROCEDURE AgregarEstudiante(
    IN p_Nombre VARCHAR(100),
    IN p_Email VARCHAR(100),
    IN p_Edad INT,
    IN p_Carrera VARCHAR(50)
)
BEGIN
    INSERT INTO Estudiante (Nombre, Email, Edad, Carrera)
    VALUES (p_Nombre, p_Email, p_Edad, p_Carrera);
END$

DELIMITER ;

-- Llamar al procedimiento
CALL AgregarEstudiante('Juan García', 'juan@ejemplo.com', 20, 'DAM');</code></pre>

                <h2 class="section-title">Ejemplo: Procedimiento con OUT</h2>
                <pre class="code-block"><code>DELIMITER $

CREATE PROCEDURE ObtenerEdadPromedio(
    OUT p_Promedio DECIMAL(5,2)
)
BEGIN
    SELECT AVG(Edad) INTO p_Promedio
    FROM Estudiante;
END$

DELIMITER ;

-- Llamar y obtener resultado
CALL ObtenerEdadPromedio(@promedio);
SELECT @promedio;</code></pre>

                <div class="tip">
                    <p class="tip-title">Nota sobre DELIMITER</p>
                    <p>DELIMITER cambia el delimitador de comando temporalmente porque los procedimientos usan punto y coma internamente. Se restaura al final.</p>
                </div>
            </div>`},{id:"9-2-triggers-cursores",category:"cat-9-procedimientos",categoryTitle:"9. Procedimientos, Triggers & Transacciones",categoryIcon:"⚡",num:"9.2",title:"9.2 Funciones UDF, Disparadores (Triggers) y Cursores",shortDesc:"Disparadores BEFORE/AFTER, funciones definidas por el usuario (UDF) y cursores para procesamiento secuencial.",badge:"9.2 Triggers",accentColor:"#7c3aed",html:`<h1 class="chapter">9.2 Funciones UDF, Disparadores (Triggers) y Cursores</h1>

                <h2 class="section-title">Funciones Almacenadas</h2>
                <p>Las funciones son similares a los procedimientos pero retornan un valor y se usan dentro de expresiones SQL.</p>

                <pre class="code-block"><code>DELIMITER $

CREATE FUNCTION Edad_Categoria(p_Edad INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE v_Categoria VARCHAR(20);
    
    IF p_Edad < 18 THEN
        SET v_Categoria = 'Menor de edad';
    ELSEIF p_Edad < 25 THEN
        SET v_Categoria = 'Joven';
    ELSE
        SET v_Categoria = 'Adulto';
    END IF;
    
    RETURN v_Categoria;
END$

DELIMITER ;

-- Usar la función
SELECT Nombre, Edad, Edad_Categoria(Edad) AS Categoría
FROM Estudiante;</code></pre>

                <h2 class="section-title">Triggers (Disparadores)</h2>
                <p>Un <strong>trigger (disparador)</strong> es un procedimiento especial que se ejecuta automáticamente cuando ocurre un evento (INSERT, UPDATE, DELETE) en una tabla específica.</p>

                <pre class="code-block"><code>CREATE TRIGGER AuditoriaActualizacion
AFTER UPDATE ON Estudiante
FOR EACH ROW
BEGIN
    INSERT INTO Auditoria (Operación, Tabla, ID_Registro, Fecha)
    VALUES ('UPDATE', 'Estudiante', NEW.ID, NOW());
END;</code></pre>

                <p>En este ejemplo, cada vez que se actualiza un registro en la tabla Estudiante, se inserta automáticamente un registro en la tabla Auditoria.</p>

                <h2 class="section-title">Cursores</h2>
                <p>Los cursores permiten procesar registros uno a uno dentro de un procedimiento, en lugar de trabajar con conjuntos completos.</p>

                <pre class="code-block"><code>DELIMITER $

CREATE PROCEDURE ProcesarEstudiantes()
BEGIN
    DECLARE v_Nombre VARCHAR(100);
    DECLARE v_Edad INT;
    DECLARE cursor_est CURSOR FOR
        SELECT Nombre, Edad FROM Estudiante;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_Nombre = NULL;
    
    OPEN cursor_est;
    
    bucle: LOOP
        FETCH cursor_est INTO v_Nombre, v_Edad;
        IF v_Nombre IS NULL THEN
            LEAVE bucle;
        END IF;
        -- Procesar cada registro aquí
        SELECT CONCAT('Procesando: ', v_Nombre);
    END LOOP bucle;
    
    CLOSE cursor_est;
END$

DELIMITER ;</code></pre>

                <h2 class="section-title">Sentencias de Control</h2>

                <h3>IF - ELSE</h3>
                <pre class="code-block"><code>IF condición THEN
    -- sentencias
ELSEIF otra_condición THEN
    -- sentencias
ELSE
    -- sentencias
END IF;</code></pre>

                <h3>WHILE</h3>
                <pre class="code-block"><code>WHILE condición DO
    -- sentencias
END WHILE;</code></pre>

                <h3>Variables Locales</h3>
                <pre class="code-block"><code>DECLARE v_Suma INT DEFAULT 0;
DECLARE v_Nombre VARCHAR(100);

SET v_Suma = 100;
SET v_Nombre = 'Juan';</code></pre>
            </div>`},{id:"9-3-transacciones-acid",category:"cat-9-procedimientos",categoryTitle:"9. Procedimientos, Triggers & Transacciones",categoryIcon:"⚡",num:"9.3",title:"9.3 Transacciones ACID: START TRANSACTION, COMMIT y ROLLBACK",shortDesc:"Atomicidad, Consistencia, Aislamiento y Durabilidad: control de concurrencia y puntos de guardado SAVEPOINT.",badge:"9.3 ACID",accentColor:"#7c3aed",html:`<h1 class="chapter">9.3 Transacciones ACID: Control de Concurrencia (COMMIT y ROLLBACK)</h1>

                <h2 class="section-title">¿Qué es una Transacción?</h2>
                <p>Una <strong>transacción</strong> es un conjunto de operaciones que se ejecutan como una unidad atómica. O se ejecutan todas correctamente o no se ejecuta ninguna. Esto garantiza la consistencia de los datos.</p>

                <h2 class="section-title">Propiedades ACID</h2>

                <h3>Atomicity (Atomicidad)</h3>
                <p>Se ejecutan todas las operaciones o ninguna. No hay estados intermedios.</p>

                <h3>Consistency (Consistencia)</h3>
                <p>La base de datos pasa de un estado consistente a otro estado consistente.</p>

                <h3>Isolation (Aislamiento)</h3>
                <p>Las transacciones no interfieren entre sí, incluso si se ejecutan simultáneamente.</p>

                <h3>Durability (Durabilidad)</h3>
                <p>Los datos confirmados persisten incluso ante fallos del sistema.</p>

                <h2 class="section-title">Control de Transacciones</h2>
                <pre class="code-block"><code>START TRANSACTION;

-- Operaciones SQL aquí
SELECT * FROM Estudiante;
UPDATE Estudiante SET Edad = 21 WHERE ID = 1;
INSERT INTO Auditoria VALUES (NULL, 'UPDATE', 'Estudiante', 1, NOW());

COMMIT;   -- Confirma todos los cambios</code></pre>

                <h3>Si Ocurre un Error</h3>
                <pre class="code-block"><code>ROLLBACK;   -- Deshacer todos los cambios</code></pre>

                <h2 class="section-title">Ejemplo Práctico: Transferencia Bancaria</h2>
                <p>Ejemplo clásico donde se necesita garantizar la integridad: transferencia de dinero entre cuentas.</p>

                <pre class="code-block"><code>START TRANSACTION;

-- Restar de la cuenta origen
UPDATE Cuentas 
SET Saldo = Saldo - 100 
WHERE ID_Cuenta = 1;

-- Sumar a la cuenta destino
UPDATE Cuentas 
SET Saldo = Saldo + 100 
WHERE ID_Cuenta = 2;

-- Registrar la transacción
INSERT INTO Transacciones 
VALUES (NULL, 1, 2, 100, NOW());

-- Si llegamos aquí sin errores, confirmar
COMMIT;

-- Si hay error en cualquier punto, deshace TODO
ROLLBACK;</code></pre>

                <div class="tip">
                    <p class="tip-title">Importancia de las transacciones</p>
                    <p>Sin transacciones, si falla la segunda operación, la primera cuenta pierde dinero sin que la segunda lo reciba. Las transacciones garantizan que ambas operaciones se ejecutan o ninguna.</p>
                </div>
            </div>`},{id:"10-1-indices-explain",category:"cat-10-optimizacion",categoryTitle:"10. Rendimiento, Índices & Retos de Entrevistas",categoryIcon:"🎯",num:"10.1",title:"10.1 Rendimiento, Índices B-Tree & Diagnóstico con EXPLAIN",shortDesc:"Aprende cómo el optimizador ejecuta tu SQL y cómo diseñar índices para reducir tiempos de segundos a ms.",badge:"10.1 Índices B-Tree",accentColor:"#16a34a",html:`
<div class="content-header">
  <h2>10.1 Rendimiento, Índices B-Tree & Diagnóstico con EXPLAIN</h2>
  <p class="subtitle">Aprende cómo el optimizador de consultas ejecuta tu SQL y cómo diseñar índices que reduzcan el tiempo de respuesta de segundos a milisegundos.</p>
</div>

<h3>1. ¿Cómo funciona un Índice B-Tree?</h3>
<p>Un <strong>índice B-Tree (Balanced Tree)</strong> es una estructura de datos en árbol auto-balanceada que permite a los motores relacionales realizar búsquedas, inserciones y borrados en tiempo logarítmico $O(\\log N)$. En una tabla sin índice, buscar un registro exige un <strong>Full Table Scan</strong> examinando todas las páginas en disco ($O(N)$).</p>

<div class="sql-normalization-comparison">
  <div class="sql-norm-box success">
    <div class="norm-header success"><strong>Clustered Index (Índice Agrupado)</strong></div>
    <p class="norm-reason">Un <strong>índice agrupado (Clustered Index)</strong> es aquel que determina el orden de almacenamiento físico de las filas en disco según su clave primaria. Solo puede haber <strong>UNO</strong> por tabla.</p>
  </div>
  <div class="sql-norm-box success">
    <div class="norm-header success"><strong>Non-Clustered Index (Índice Secundario)</strong></div>
    <p class="norm-reason">Un <strong>índice no agrupado (Non-Clustered Index)</strong> es una estructura secundaria e independiente que almacena los valores de las columnas indexadas junto a un puntero hacia la fila de datos.</p>
  </div>
</div>

<h3>2. Interpretación de EXPLAIN / EXPLAIN ANALYZE</h3>
<p>El comando <strong>EXPLAIN ANALYZE</strong> es una herramienta de diagnóstico que ejecuta una consulta en tiempo real y expone el plan de ejecución real del motor con los tiempos de CPU e I/O exactos.</p>
<pre class="code-block"><code>-- Diagnóstico de consulta en PostgreSQL / MySQL
EXPLAIN ANALYZE 
SELECT * FROM pedido 
WHERE fecha >= '2024-01-01' AND estado = 'PAGADO';

-- Salida Típica a Evaluar:
-- 🔴 Seq Scan on pedido (cost=0.00..3450.00 rows=12000 width=72) (actual time=0.045..142.12 ms)
-- 🟢 Index Scan using idx_pedido_fecha_estado (cost=0.42..8.50 rows=12 width=72) (actual time=0.015..0.038 ms)</code></pre>

<h3>3. ¿Cuándo NO crear un Índice?</h3>
<ul>
  <li><strong>Columnas de baja cardinalidad:</strong> Índices en columnas booleanas o género con solo 2 valores suelen ser ignorados por el optimizador.</li>
  <li><strong>Tablas con inserciones/actualizaciones masivas continuas:</strong> Cada <code>INSERT</code> o <code>UPDATE</code> obliga al motor a reescribir y balancear el árbol de cada índice.</li>
  <li><strong>Tablas pequeñas (&lt; 1,000 filas):</strong> Un escaneo secuencial en memoria suele ser más rápido que buscar en el índice y luego leer el puntero.</li>
</ul>
`},{id:"10-2-retos-entrevistas",category:"cat-10-optimizacion",categoryTitle:"10. Rendimiento, Índices & Retos de Entrevistas",categoryIcon:"🎯",num:"10.2",title:"10.2 Los 5 Retos Clásicos de Examen y Entrevistas Técnicas SQL",shortDesc:"Casos reales resueltos: segundo salario más alto, duplicados, gaps & islands y medias cruzadas.",badge:"10.2 Retos Tech",accentColor:"#16a34a",html:`
<div class="content-header">
  <h2>10.2 Los 5 Retos Clásicos de Examen y Entrevistas Técnicas SQL</h2>
  <p class="subtitle">Casos reales resueltos y explicados paso a paso para superar cualquier prueba técnica de backend o datos.</p>
</div>

<h3>Reto 1: Encontrar el 2º Salario Más Alto (Second Highest Salary)</h3>
<pre class="code-block"><code>-- Solución 1: Con DENSE_RANK (Permite resolver el N-ésimo sin errores de empates)
WITH RankingSalarios AS (
    SELECT 
        salario,
        DENSE_RANK() OVER (ORDER BY salario DESC) AS rnk
    FROM empleado
)
SELECT MAX(salario) AS segundo_salario
FROM RankingSalarios
WHERE rnk = 2;

-- Solución 2: Subconsulta Escalar Tradicional (ANSI SQL)
SELECT MAX(salario) AS segundo_salario
FROM empleado
WHERE salario < (SELECT MAX(salario) FROM empleado);</code></pre>

<h3>Reto 2: Eliminar Registros Duplicados Conservando el ID Más Antiguo</h3>
<pre class="code-block"><code>-- Eliminar emails duplicados manteniendo únicamente el registro original
DELETE FROM usuario
WHERE id NOT IN (
    SELECT MIN(id)
    FROM usuario
    GROUP BY email
);</code></pre>

<h3>Reto 3: Detección de Rachas Consecutivas (Problema "Gaps and Islands")</h3>
<pre class="code-block"><code>-- Identificar usuarios que han iniciado sesión 3 o más días consecutivos
WITH FechasNumeradas AS (
    SELECT 
        usuario_id,
        fecha_login,
        fecha_login - (ROW_NUMBER() OVER (PARTITION BY usuario_id ORDER BY fecha_login) * INTERVAL '1 day') AS isla_grupo
    FROM log_acceso
)
SELECT 
    usuario_id,
    MIN(fecha_login) AS racha_inicio,
    MAX(fecha_login) AS racha_fin,
    COUNT(*) AS dias_consecutivos
FROM FechasNumeradas
GROUP BY usuario_id, isla_grupo
HAVING COUNT(*) >= 3;</code></pre>

<h3>Reto 4: Departamentos con Salario Medio Superior al de la Empresa</h3>
<pre class="code-block"><code>SELECT 
    departamento_id,
    AVG(salario) AS media_departamental
FROM empleado
GROUP BY departamento_id
HAVING AVG(salario) > (SELECT AVG(salario) FROM empleado);</code></pre>
`},{id:"11-1-seguridad-vistas",category:"cat-11-seguridad",categoryTitle:"11. Seguridad & Comparativa de Motores",categoryIcon:"🔐",num:"11.1",title:"11.1 Seguridad DCL (GRANT/REVOKE), Vistas e Inyección SQL",shortDesc:"Reglas de integridad relacional, gestión de usuarios, privilegios DCL y creación de vistas seguras (CREATE VIEW).",badge:"11.1 Seguridad",accentColor:"#0891b2",html:`<h1 class="chapter">11.1 Seguridad DCL (GRANT/REVOKE), Vistas e Inyección SQL</h1>

                <h2 class="section-title">Reglas de Integridad</h2>

                <h3>Integridad de Entidad</h3>
                <p>Cada tabla debe tener una clave primaria que identifique unívocamente cada fila. No puede ser nula.</p>

                <h3>Integridad Referencial</h3>
                <p>Las claves foráneas deben hacer referencia a claves primarias existentes. Se mantiene mediante restricciones ON DELETE y ON UPDATE.</p>

                <pre class="code-block"><code>CREATE TABLE Asignatura (
ID INT PRIMARY KEY,
Nombre VARCHAR(100),
ID_Profesor INT,
FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID)
ON DELETE CASCADE,
ON UPDATE CASCADE
);</code></pre>

                <h3>Integridad de Dominio</h3>
                <p>Los valores de las columnas deben cumplir restricciones de tipo, rango y formato.</p>

                <h2 class="section-title">Gestión de Usuarios y Privilegios</h2>

                <h3>Crear Usuario</h3>
                <pre class="code-block"><code>CREATE USER 'juan'@'localhost' IDENTIFIED BY 'contraseña123';</code></pre>
                <p style="height: 15px;"></p>
                <pre class="code-block"><code>CREATE USER 'maria'@'192.168.1.%' IDENTIFIED BY 'pass456';</code></pre>

                <h3>Otorgar Todos los Privilegios en una Base de Datos</h3>
                <pre class="code-block"><code>GRANT ALL PRIVILEGES ON escuela.* TO 'juan'@'localhost';</code></pre>
                <p style="height: 15px;"></p>

                <h3>Otorgar Privilegios Específicos</h3>
                <pre class="code-block"><code>GRANT SELECT, INSERT, UPDATE ON escuela.* TO 'usuario'@'localhost';</code></pre>
                <p style="height: 15px;"></p>

                <h3>Otorgar Privilegios en una Tabla Específica</h3>
                <pre class="code-block"><code>GRANT SELECT ON escuela.Estudiante TO 'usuario'@'localhost';</code></pre>
                <p style="height: 15px;"></p>

                <h3>Aplicar los Cambios</h3>
                <pre class="code-block"><code>FLUSH PRIVILEGES;</code></pre>

                <h3>Revocar Privilegios</h3>
                <pre class="code-block"><code>REVOKE INSERT, UPDATE ON escuela.* FROM 'usuario'@'localhost';</code></pre>
                <p style="height: 15px;"></p>
                <pre class="code-block"><code>FLUSH PRIVILEGES;</code></pre>

                <div class="warning">
                    <p class="warning-title">Seguridad</p>
                    <p>Siempre crea usuarios con privilegios mínimos necesarios (principio de menor privilegio). Cambia las contraseñas por defecto inmediatamente.</p>
                </div>
            </div>`},{id:"11-2-matriz-motores-cheat-sheet",category:"cat-11-seguridad",categoryTitle:"11. Seguridad & Comparativa de Motores",categoryIcon:"🔐",num:"11.2",title:"11.2 Matriz Comparativa: MySQL vs PostgreSQL vs SQLite & Cheat Sheet",shortDesc:"Diferencias clave en tipos de datos, sintaxis dialectal y las 10 reglas de oro para escribir SQL de nivel sénior.",badge:"11.2 Cheat Sheet",accentColor:"#0891b2",html:`
<div class="content-header">
  <h2>11.2 Matriz Comparativa: MySQL vs PostgreSQL vs SQLite & Cheat Sheet Definitivo</h2>
  <p class="subtitle">Diferencias clave en tipos de datos, sintaxis dialectal y las 10 reglas de oro para escribir SQL de nivel sénior.</p>
</div>

<h3>1. Tabla Comparativa de Motores Principales</h3>
<div class="sql-pizarra-table-wrapper">
  <table class="sql-pizarra-table">
    <thead>
      <tr>
        <th>Característica</th>
        <th>PostgreSQL 🐘</th>
        <th>MySQL 🐬</th>
        <th>SQLite 🪶</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tipado</strong></td>
        <td>Estricto y extensible (JSONB, UUID, Arrays)</td>
        <td>Estricto tradicional (JSON nativo)</td>
        <td>Dinámico (Type Affinity débil)</td>
      </tr>
      <tr>
        <td><strong>Upsert Syntax</strong></td>
        <td><code>ON CONFLICT (col) DO UPDATE</code></td>
        <td><code>ON DUPLICATE KEY UPDATE</code></td>
        <td><code>INSERT OR REPLACE / ON CONFLICT</code></td>
      </tr>
      <tr>
        <td><strong>Concatenación</strong></td>
        <td><code>str1 || str2</code></td>
        <td><code>CONCAT(str1, str2)</code></td>
        <td><code>str1 || str2</code></td>
      </tr>
      <tr>
        <td><strong>CTEs Recursivas</strong></td>
        <td>Excelente soporte nativo</td>
        <td>Soporte a partir de MySQL 8.0</td>
        <td>Soporte nativo completo</td>
      </tr>
      <tr>
        <td><strong>Ventanas Analíticas</strong></td>
        <td>Soporte total con marcos de ventana</td>
        <td>A partir de MySQL 8.0</td>
        <td>A partir de SQLite 3.25</td>
      </tr>
      <tr>
        <td><strong>Concurrencia</strong></td>
        <td>MVCC avanzado sin bloqueos en lectura</td>
        <td>InnoDB (Bloqueo por filas y MVCC)</td>
        <td>Bloqueo a nivel de archivo (1 escritor)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>2. Las 10 Reglas de Oro del SQL en Producción</h3>
<ol>
  <li><strong>Nunca uses <code>SELECT *</code> en aplicaciones de producción:</strong> Trae únicamente las columnas requeridas para no saturar memoria ni invalidar el uso de índices de cobertura.</li>
  <li><strong>Filtra siempre en <code>WHERE</code> antes que en <code>HAVING</code>:</strong> Todo lo que no dependa de una agregación debe filtrarse en WHERE para descartar filas de inmediato.</li>
  <li><strong>Cuidado con los comodines iniciales en <code>LIKE '%texto'</code>:</strong> Invalida totalmente el uso de índices B-Tree provocando escaneo secuencial completo.</li>
  <li><strong>Protección absoluta contra SQL Injection:</strong> Usa siempre consultas preparadas (Prepared Statements con PDO / PreparedStatement en Java).</li>
  <li><strong>Transacciones con principio de brevedad:</strong> Abre la transacción justo antes de escribir y haz <code>COMMIT</code> de inmediato para no retener bloqueos en base de datos.</li>
</ol>

<h2 class="section-title">Orden de Aprendizaje Recomendado y Buenas Prácticas</h2>

                <h2 class="section-title">Orden de Aprendizaje Recomendado</h2>
                <ol>
                    <li>Conceptos fundamentales y modelo ER</li>
                    <li>Transformación a modelo relacional y normalización</li>
                    <li>SQL DDL (crear tablas y estructura)</li>
                    <li>SQL DML básico (INSERT, UPDATE, DELETE)</li>
                    <li>Consultas SELECT y cláusulas WHERE, ORDER BY, LIMIT</li>
                    <li>JOINs y funciones de agregación</li>
                    <li>Subconsultas y GROUP BY con HAVING</li>
                    <li>Procedimientos almacenados y funciones</li>
                    <li>Triggers y cursores</li>
                    <li>Transacciones e integridad de datos</li>
                </ol>

                <h2 class="section-title">SGBD Principales</h2>
                <ul>
                    <li><strong>MySQL:</strong> Open source, muy utilizado en web</li>
                    <li><strong>PostgreSQL:</strong> Robusto, con características avanzadas</li>
                    <li><strong>Oracle:</strong> Solución empresarial</li>
                    <li><strong>SQL Server:</strong> Producto de Microsoft</li>
                </ul>

                <h2 class="section-title">Consejos Finales</h2>
                <ul>
                    <li>Practica constantemente con ejemplos reales</li>
                    <li>Siempre normaliza tus bases de datos</li>
                    <li>Usa transacciones para operaciones críticas</li>
                    <li>Protege datos sensibles con usuarios y privilegios adecuados</li>
                    <li>Respeta siempre las restricciones de integridad</li>
                    <li>Documenta tu esquema de base de datos</li>
                    <li>Realiza backups regularmente</li>
                </ul>

                <div class="tip">
                    <p class="tip-title">Recuerda</p>
                    <p>La práctica es la mejor forma de aprender SQL. Cuanto más escribas consultas reales y resuelvas problemas con bases de datos, mejor comprenderás estos conceptos.</p>
                </div>

                <p style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #999;">
                    Este compendio cubre todos los temas principales del módulo 0484 de Bases de Datos del IOC. Úsalo como referencia durante toda tu carrera profesional.
                </p>
            </div>
        </div>

        <div class="page-number">
            Fin del Documento
<h2>🎓 Resumen Final</h2>

            <div class="concept-card">
                <h4>🔑 Los 3 Puntos Más Importantes</h4>
                <p>1️⃣ <strong>WHERE filtra filas, HAVING filtra grupos</strong> - Son para diferentes propósitos</p>
                <p>2️⃣ <strong>COUNT solo existe después de GROUP BY</strong> - Por eso WHERE no puede usarlo</p>
                <p>3️⃣ <strong>SQL ejecuta en un orden fijo</strong> - FROM → WHERE → GROUP BY → HAVING → SELECT</p>
            </div>

            <div class="summary-box">
                <h4>💪 Practica Esto</h4>
                <p>Intenta escribir consultas con GROUP BY y HAVING. Cada vez que falles, recuerda:</p>
                <p>• "¿Necesito filtrar ANTES de agrupar?" → WHERE</p>
                <p>• "¿Necesito filtrar DESPUÉS de agrupar?" → HAVING</p>
                <p>• "¿Usaré COUNT?" → ¡Entonces HAVING, no WHERE!</p>
            </div>
        </div>`}],O={estudiantes:[{id:1,nombre:"Juan García",email:"juan.garcia@micampus.es",edad:20,carrera:"DAM",nota_media:8.5,ciudad:"Madrid",activo:1},{id:2,nombre:"María López",email:"maria.lopez@micampus.es",edad:19,carrera:"DAW",nota_media:9.4,ciudad:"Barcelona",activo:1},{id:3,nombre:"Pedro González",email:"pedro.gonzalez@micampus.es",edad:21,carrera:"DAM",nota_media:6.8,ciudad:"Valencia",activo:1},{id:4,nombre:"Elena Morales",email:"elena.morales@micampus.es",edad:22,carrera:"DAW",nota_media:9.8,ciudad:"Madrid",activo:1},{id:5,nombre:"Carlos Sanz",email:"carlos.sanz@micampus.es",edad:20,carrera:"DAM",nota_media:7.2,ciudad:"Sevilla",activo:0},{id:6,nombre:"Lucía Fernández",email:"lucia.fernandez@micampus.es",edad:24,carrera:"DAW",nota_media:8.9,ciudad:"Bilbao",activo:1},{id:7,nombre:"Alejandro Ramos",email:"alejandro.ramos@micampus.es",edad:23,carrera:"ASIR",nota_media:7.7,ciudad:"Madrid",activo:1},{id:8,nombre:"Sofía Castro",email:"sofia.castro@micampus.es",edad:19,carrera:"ASIR",nota_media:8.1,ciudad:"Málaga",activo:1}],profesores:[{id:1,nombre:"Dr. Fernando Ruiz",depto:"Informática",salario:2750,antiguedad:8},{id:2,nombre:"Dra. Carmen Delgado",depto:"Sistemas",salario:2950,antiguedad:12},{id:3,nombre:"Prof. Alberto Blanco",depto:"Informática",salario:2400,antiguedad:4},{id:4,nombre:"Dra. Laura Ortega",depto:"Bases de Datos",salario:3100,antiguedad:15}],cursos:[{id:101,nombre:"Bases de Datos Relacionales (SQL)",profesor_id:4,horas:120,creditos:8},{id:102,nombre:"Programación Orientada a Objetos en Java",profesor_id:1,horas:160,creditos:10},{id:103,nombre:"Desarrollo Web Backend en PHP",profesor_id:3,horas:100,creditos:6},{id:104,nombre:"Despliegue y Cloud Computing",profesor_id:2,horas:80,creditos:5},{id:105,nombre:"Seguridad en Redes y Sistemas",profesor_id:2,horas:90,creditos:6},{id:106,nombre:"Inteligencia Artificial con Spring AI",profesor_id:1,horas:60,creditos:4}],matriculas:[{id:1,estudiante_id:1,curso_id:101,nota_final:9,estado:"Sobresaliente"},{id:2,estudiante_id:1,curso_id:102,nota_final:8,estado:"Notable"},{id:3,estudiante_id:2,curso_id:101,nota_final:9.5,estado:"Sobresaliente"},{id:4,estudiante_id:2,curso_id:103,nota_final:9.3,estado:"Sobresaliente"},{id:5,estudiante_id:3,curso_id:101,nota_final:6.5,estado:"Aprobado"},{id:6,estudiante_id:3,curso_id:104,nota_final:7,estado:"Notable"},{id:7,estudiante_id:4,curso_id:103,nota_final:10,estado:"Matricula de Honor"},{id:8,estudiante_id:4,curso_id:106,nota_final:9.6,estado:"Sobresaliente"},{id:9,estudiante_id:5,curso_id:102,nota_final:4.5,estado:"Suspenso"},{id:10,estudiante_id:6,curso_id:101,nota_final:8.8,estado:"Notable"},{id:11,estudiante_id:7,curso_id:105,nota_final:7.5,estado:"Notable"},{id:12,estudiante_id:8,curso_id:104,nota_final:8.2,estado:"Notable"}]},ae=[{id:"basic-filter",title:"1. SELECT con WHERE y ORDER BY",desc:"Estudiantes activos de DAM ordenados por nota media de mayor a menor.",sql:`SELECT id, nombre, carrera, nota_media, ciudad
FROM estudiantes
WHERE carrera = 'DAM' AND activo = 1
ORDER BY nota_media DESC;`},{id:"group-by-having",title:"2. GROUP BY con COUNT(), AVG() y HAVING",desc:"Estadísticas por carrera académica: cantidad de alumnos y nota media.",sql:`SELECT carrera, COUNT(*) AS total_alumnos, ROUND(AVG(nota_media), 2) AS nota_promedio
FROM estudiantes
GROUP BY carrera
HAVING COUNT(*) >= 2
ORDER BY nota_promedio DESC;`},{id:"inner-join",title:"3. INNER JOIN de 3 Tablas",desc:"Alumnos, el curso en el que están matriculados y su calificación final.",sql:`SELECT e.nombre AS estudiante, c.nombre AS curso, m.nota_final, m.estado
FROM estudiantes e
INNER JOIN matriculas m ON e.id = m.estudiante_id
INNER JOIN cursos c ON m.curso_id = c.id
ORDER BY m.nota_final DESC;`},{id:"left-join-nulls",title:"4. LEFT JOIN para Cursos sin Alumnos",desc:"Encontrar qué cursos del catálogo aún no tienen ningún estudiante matriculado.",sql:`SELECT c.id, c.nombre AS curso, c.horas
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
WHERE m.id IS NULL;`},{id:"subquery-salary",title:"5. Subconsulta: Profesores con salario superior a la media",desc:"Docentes que cobran más que el sueldo promedio de todo el claustro.",sql:`SELECT nombre, depto, salario
FROM profesores
WHERE salario > (SELECT AVG(salario) FROM profesores)
ORDER BY salario DESC;`},{id:"window-ranking",title:"6. Window Function: Ranking por Carrera",desc:"Posición de honor (RANK) de cada estudiante dentro de su propia titulación.",sql:`SELECT nombre, carrera, nota_media,
       RANK() OVER(PARTITION BY carrera ORDER BY nota_media DESC) AS ranking_carrera
FROM estudiantes
ORDER BY carrera, ranking_carrera;`}];function le(u){const o=performance.now(),s=u.trim().replace(/;$/,"");if(!s)return{success:!1,error:"La consulta está vacía. Escribe una instrucción SELECT."};try{const a=s.replace(/\s+/g," "),r=ae.find(d=>d.sql.trim().replace(/;$/,"").replace(/\s+/g," ").toLowerCase()===a.toLowerCase());if(r){const d=ge(r.id),n=+(performance.now()-o).toFixed(2);return{success:!0,columns:d.columns,rows:d.rows,rowCount:d.rows.length,executionTimeMs:n}}const i=Ne(a),l=+(performance.now()-o).toFixed(2);return{success:!0,columns:i.columns,rows:i.rows,rowCount:i.rows.length,executionTimeMs:l}}catch(a){return{success:!1,error:a.message||"Error de sintaxis en la consulta SQL."}}}function ge(u){switch(u){case"basic-filter":{const o=O.estudiantes.filter(s=>s.carrera==="DAM"&&s.activo===1).sort((s,a)=>a.nota_media-s.nota_media).map(s=>({id:s.id,nombre:s.nombre,carrera:s.carrera,nota_media:s.nota_media,ciudad:s.ciudad}));return{columns:["id","nombre","carrera","nota_media","ciudad"],rows:o}}case"group-by-having":{const o={};O.estudiantes.forEach(a=>{o[a.carrera]||(o[a.carrera]=[]),o[a.carrera].push(a.nota_media)});const s=Object.entries(o).map(([a,r])=>{const i=r.length,l=+(r.reduce((d,n)=>d+n,0)/i).toFixed(2);return{carrera:a,total_alumnos:i,nota_promedio:l}}).filter(a=>a.total_alumnos>=2).sort((a,r)=>r.nota_promedio-a.nota_promedio);return{columns:["carrera","total_alumnos","nota_promedio"],rows:s}}case"inner-join":{const o=[];return O.matriculas.forEach(s=>{const a=O.estudiantes.find(i=>i.id===s.estudiante_id),r=O.cursos.find(i=>i.id===s.curso_id);a&&r&&o.push({estudiante:a.nombre,curso:r.nombre,nota_final:s.nota_final,estado:s.estado})}),o.sort((s,a)=>a.nota_final-s.nota_final),{columns:["estudiante","curso","nota_final","estado"],rows:o}}case"left-join-nulls":{const o=new Set(O.matriculas.map(a=>a.curso_id)),s=O.cursos.filter(a=>!o.has(a.id)).map(a=>({id:a.id,curso:a.nombre,horas:a.horas}));return{columns:["id","curso","horas"],rows:s}}case"subquery-salary":{const s=O.profesores.reduce((r,i)=>r+i.salario,0)/O.profesores.length,a=O.profesores.filter(r=>r.salario>s).sort((r,i)=>i.salario-r.salario).map(r=>({nombre:r.nombre,depto:r.depto,salario:r.salario}));return{columns:["nombre","depto","salario"],rows:a}}case"window-ranking":{const o={};O.estudiantes.forEach(a=>{o[a.carrera]||(o[a.carrera]=[]),o[a.carrera].push(a)});const s=[];return Object.keys(o).sort().forEach(a=>{o[a].slice().sort((i,l)=>l.nota_media-i.nota_media).forEach((i,l)=>{s.push({nombre:i.nombre,carrera:i.carrera,nota_media:i.nota_media,ranking_carrera:l+1})})}),{columns:["nombre","carrera","nota_media","ranking_carrera"],rows:s}}default:throw new Error("Consulta predeterminada no encontrada.")}}function Ne(u){if(!u.toUpperCase().startsWith("SELECT"))throw new Error("Por seguridad y consistencia en este Playground interactivo solo se admiten consultas de lectura (SELECT).");const s=u.match(/FROM\s+([a-zA-Z0-9_]+)/i);if(!s)throw new Error("Falta la cláusula FROM con una tabla válida (ej: estudiantes, profesores, cursos, matriculas).");const a=s[1].toLowerCase(),r=O[a];if(!r)throw new Error(`La tabla "${a}" no existe. Tablas disponibles: estudiantes, profesores, cursos, matriculas.`);let i=JSON.parse(JSON.stringify(r));const l=u.match(/WHERE\s+(.*?)(?=\s+(GROUP\s+BY|ORDER\s+BY|LIMIT|$))/i);if(l){const S=l[1];i=i.filter(j=>ve(S,j))}const d=u.match(/ORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?/i);if(d){const S=d[1],j=(d[2]||"ASC").toUpperCase()==="DESC";i.sort((h,y)=>{const I=h[S],A=y[S];return typeof I=="number"&&typeof A=="number"?j?A-I:I-A:j?String(A).localeCompare(String(I)):String(I).localeCompare(String(A))})}const n=u.match(/LIMIT\s+(\d+)/i);if(n){const S=parseInt(n[1],10);i=i.slice(0,S)}const g=u.match(/SELECT\s+(.*?)\s+FROM/i),R=g?g[1].trim():"*";let v=[],T=[];if(R==="*")v=Object.keys(i[0]||{}),T=i;else{const S=R.split(",").map(j=>j.trim().split(/\s+AS\s+|\s+/i)[0]);v=S,T=i.map(j=>{const h={};return S.forEach(y=>{h[y]=j[y]!==void 0?j[y]:null}),h})}return{columns:v,rows:T}}function ve(u,o){return u.split(/\s+AND\s+/i).every(a=>{const r=a.match(/([a-zA-Z0-9_]+)\s*=\s*['"]?([^'"]+)['"]?/);if(r){const R=r[1],v=r[2];return String(o[R]).toLowerCase()===v.toLowerCase()}const i=a.match(/([a-zA-Z0-9_]+)\s*>=\s*([0-9.]+)/);if(i)return Number(o[i[1]])>=Number(i[2]);const l=a.match(/([a-zA-Z0-9_]+)\s*<=\s*([0-9.]+)/);if(l)return Number(o[l[1]])<=Number(l[2]);const d=a.match(/([a-zA-Z0-9_]+)\s*>\s*([0-9.]+)/);if(d)return Number(o[d[1]])>Number(d[2]);const n=a.match(/([a-zA-Z0-9_]+)\s*<\s*([0-9.]+)/);if(n)return Number(o[n[1]])<Number(n[2]);const g=a.match(/([a-zA-Z0-9_]+)\s+LIKE\s+['"]%?([^'%"]+)%?['"]/i);if(g){const R=String(o[g[1]]||"").toLowerCase(),v=g[2].toLowerCase();return R.includes(v)}return!0})}function Re({isOpen:u,onClose:o}){const[s,a]=m.useState(ae[0].id),[r,i]=m.useState(ae[0].sql),[l,d]=m.useState("estudiantes"),[n,g]=m.useState(()=>le(ae[0].sql)),[R,v]=m.useState(!1);if(!u)return null;const T=h=>{a(h.id),i(h.sql),g(le(h.sql))},S=()=>{const h=le(r);g(h)},j=()=>{var h;(h=navigator==null?void 0:navigator.clipboard)!=null&&h.writeText&&(navigator.clipboard.writeText(r),v(!0),setTimeout(()=>v(!1),2e3))};return e.jsx("div",{className:"sql-modal-backdrop",onClick:o,role:"dialog","aria-modal":"true",children:e.jsxs("div",{className:"sql-modal-window sql-sandbox-window",onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{className:"sql-modal-header",children:[e.jsxs("div",{className:"sql-modal-header-left",children:[e.jsx("span",{className:"sql-modal-icon",children:"🧪"}),e.jsxs("div",{children:[e.jsx("h2",{className:"sql-modal-title",children:"Playground SQL en Vivo (Sandbox)"}),e.jsx("p",{className:"sql-modal-subtitle",children:"Escribe y ejecuta consultas reales contra el conjunto de datos de prueba precargado"})]})]}),e.jsx("button",{type:"button",className:"sql-modal-close-btn",onClick:o,"aria-label":"Cerrar Playground",children:"✕"})]}),e.jsxs("div",{className:"sql-sandbox-presets-bar",children:[e.jsx("span",{className:"sql-sandbox-presets-label",children:"⚡ Consultas Preparadas:"}),e.jsx("div",{className:"sql-sandbox-presets-list",children:ae.map(h=>e.jsx("button",{type:"button",className:`sql-preset-chip ${s===h.id?"active":""}`,onClick:()=>T(h),title:h.desc,children:h.title},h.id))})]}),e.jsxs("div",{className:"sql-sandbox-body",children:[e.jsxs("div",{className:"sql-sandbox-editor-col",children:[e.jsxs("div",{className:"sql-editor-toolbar",children:[e.jsx("span",{className:"sql-editor-label",children:"💻 Consola de Sentencias SQL"}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:j,title:"Copiar código al portapapeles",children:R?"✓ Copiado":"📋 Copiar"}),e.jsx("button",{type:"button",className:"sql-run-query-btn",onClick:S,title:"Ejecutar consulta (Ctrl+Enter)",children:"▶️ Ejecutar Query"})]})]}),e.jsx("textarea",{className:"sql-sandbox-textarea",value:r,onChange:h=>i(h.target.value),onKeyDown:h=>{(h.ctrlKey||h.metaKey)&&h.key==="Enter"&&(h.preventDefault(),S())},placeholder:"Escribe tu consulta SELECT aquí...",spellCheck:"false",rows:6}),e.jsxs("div",{className:"sql-results-panel",children:[e.jsxs("div",{className:"sql-results-header",children:[e.jsx("span",{className:"sql-results-title",children:"📊 Resultado de la Consulta"}),n&&n.success&&e.jsxs("span",{className:"sql-results-badge",children:["✓ ",n.rowCount," ",n.rowCount===1?"fila":"filas"," en ",n.executionTimeMs," ms"]})]}),n&&!n.success&&e.jsxs("div",{className:"sql-sandbox-error",children:[e.jsx("strong",{children:"⚠️ Error de Ejecución:"})," ",n.error]}),n&&n.success&&e.jsx("div",{className:"sql-results-table-wrap",children:n.rows.length===0?e.jsx("div",{className:"sql-results-empty",children:"La consulta se ejecutó con éxito pero no devolvió ninguna fila coincidente."}):e.jsxs("table",{className:"sql-results-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:n.columns.map((h,y)=>e.jsx("th",{children:h},y))})}),e.jsx("tbody",{children:n.rows.map((h,y)=>e.jsx("tr",{children:n.columns.map((I,A)=>e.jsx("td",{children:h[I]===null||h[I]===void 0?e.jsx("span",{className:"sql-val-null",children:"NULL"}):String(h[I])},A))},y))})]})})]})]}),e.jsxs("div",{className:"sql-sandbox-schema-col",children:[e.jsx("div",{className:"sql-schema-header",children:e.jsx("span",{children:"🗄️ Tablas en Memoria"})}),e.jsx("div",{className:"sql-schema-tabs",children:Object.keys(O).map(h=>e.jsxs("button",{type:"button",className:`sql-schema-tab-btn ${l===h?"active":""}`,onClick:()=>d(h),children:[h," ",e.jsxs("span",{className:"sql-schema-count",children:["(",O[h].length,")"]})]},h))}),e.jsxs("div",{className:"sql-schema-data-preview",children:[e.jsxs("div",{className:"sql-schema-meta",children:[e.jsxs("strong",{children:["Esquema de `",l,"`:"]}),e.jsxs("p",{children:["Columnas: ",Object.keys(O[l][0]||{}).join(", ")]})]}),e.jsx("div",{className:"sql-schema-mini-table",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsx("tr",{children:Object.keys(O[l][0]||{}).map(h=>e.jsx("th",{children:h},h))})}),e.jsx("tbody",{children:O[l].slice(0,5).map((h,y)=>e.jsx("tr",{children:Object.values(h).map((I,A)=>e.jsx("td",{children:String(I)},A))},y))})]})}),e.jsx("small",{className:"sql-schema-footnote",children:"Mostrando primeras 5 filas para referencia rápida."})]})]})]})]})})}function Ce({isOpen:u,onClose:o}){if(!u)return null;const s=()=>{window.print()};return e.jsx("div",{className:"sql-modal-backdrop",onClick:o,role:"dialog","aria-modal":"true",children:e.jsxs("div",{className:"sql-modal-window sql-cheatsheet-window",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"sql-modal-header no-print",children:[e.jsxs("div",{className:"sql-modal-header-left",children:[e.jsx("span",{className:"sql-modal-icon",children:"📄"}),e.jsxs("div",{children:[e.jsx("h2",{className:"sql-modal-title",children:"Chuleta Definitiva de Examen SQL (Cheat Sheet)"}),e.jsx("p",{className:"sql-modal-subtitle",children:"Resumen condensado con el orden de ejecución, restricciones, JOINs y funciones clave"})]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.6rem",alignItems:"center"},children:[e.jsx("button",{type:"button",className:"sql-btn-gold",onClick:s,children:"🖨️ Imprimir / Guardar en PDF"}),e.jsx("button",{type:"button",className:"sql-modal-close-btn",onClick:o,"aria-label":"Cerrar Chuleta",children:"✕"})]})]}),e.jsxs("div",{className:"sql-cheatsheet-content",children:[e.jsxs("div",{className:"sql-cs-banner",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"sql-cs-main-title",children:"MiCampus • Chuleta Maestra de SQL & Bases de Datos"}),e.jsx("p",{className:"sql-cs-tagline",children:"Guía rápida de sintaxis, reglas de ejecución y buenas prácticas relacionales"})]}),e.jsxs("div",{className:"sql-cs-badge-box",children:[e.jsx("span",{children:"DAM / DAW"}),e.jsx("strong",{children:"MySQL 8.x"})]})]}),e.jsxs("div",{className:"sql-cs-grid",children:[e.jsxs("div",{className:"sql-cs-card",children:[e.jsx("h3",{className:"sql-cs-card-title",children:"1. El Orden Mágico de Ejecución"}),e.jsx("p",{className:"sql-cs-desc",children:"SQL no se ejecuta en el orden en que se escribe:"}),e.jsxs("ol",{className:"sql-cs-exec-list",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"1. FROM & JOIN:"})," Carga tablas y cruza datos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2. WHERE:"})," Filtra filas individuales (no admite agregadas)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"3. GROUP BY:"})," Agrupa los datos en montones."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"4. HAVING:"})," Filtra grupos creados por GROUP BY (admite agregadas)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"5. SELECT:"})," Proyecta y computa columnas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"6. DISTINCT:"})," Elimina duplicados de la proyección."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"7. ORDER BY:"})," Ordena el resultado final (ya conoce los alias)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"8. LIMIT / OFFSET:"})," Recorta el número de filas devueltas."]})]})]}),e.jsxs("div",{className:"sql-cs-card",children:[e.jsx("h3",{className:"sql-cs-card-title",children:"2. Restricciones (Constraints)"}),e.jsxs("table",{className:"sql-cs-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Restricción"}),e.jsx("th",{children:"NULL"}),e.jsx("th",{children:"Duplicados"}),e.jsx("th",{children:"Propósito"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"PRIMARY KEY"})}),e.jsx("td",{children:"❌ No"}),e.jsx("td",{children:"❌ No"}),e.jsx("td",{children:"Identificador único maestro de la fila."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"NOT NULL"})}),e.jsx("td",{children:"❌ No"}),e.jsx("td",{children:"✔️ Sí"}),e.jsx("td",{children:"Obliga a contener siempre un dato."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"UNIQUE"})}),e.jsx("td",{children:"✔️ Sí"}),e.jsx("td",{children:"❌ No"}),e.jsx("td",{children:"Evita duplicados en campos secundarios."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"FOREIGN KEY"})}),e.jsx("td",{children:"✔️ Sí"}),e.jsx("td",{children:"✔️ Sí"}),e.jsx("td",{children:"Asegura integridad referencial con el padre."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"CHECK"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Valida una condición lógica o matemática."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DEFAULT"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Asigna un valor automático si viene vacío."})]})]})]})]}),e.jsxs("div",{className:"sql-cs-card",children:[e.jsx("h3",{className:"sql-cs-card-title",children:"3. Chuleta Rápida de JOINs"}),e.jsxs("div",{className:"sql-cs-joins-list",children:[e.jsxs("div",{className:"sql-cs-join-item",children:[e.jsx("span",{className:"sql-join-badge inner",children:"INNER JOIN"}),e.jsx("span",{children:"Solo filas que coinciden en ambas tablas (intersección exacta)."})]}),e.jsxs("div",{className:"sql-cs-join-item",children:[e.jsx("span",{className:"sql-join-badge left",children:"LEFT JOIN"}),e.jsx("span",{children:"Todas las filas de la izquierda; si no hay en la derecha, rellena con NULL."})]}),e.jsxs("div",{className:"sql-cs-join-item",children:[e.jsx("span",{className:"sql-join-badge right",children:"RIGHT JOIN"}),e.jsx("span",{children:"Todas las filas de la derecha; si no hay en la izquierda, rellena con NULL."})]}),e.jsxs("div",{className:"sql-cs-join-item",children:[e.jsx("span",{className:"sql-join-badge anti",children:"ANTI-JOIN"}),e.jsxs("span",{children:[e.jsx("code",{children:"LEFT JOIN ... WHERE B.id IS NULL"})," (solo los no emparejados)."]})]}),e.jsxs("div",{className:"sql-cs-join-item",children:[e.jsx("span",{className:"sql-join-badge cross",children:"CROSS JOIN"}),e.jsx("span",{children:"Producto cartesiano (combina cada fila de A con todas las de B)."})]})]})]}),e.jsxs("div",{className:"sql-cs-card",children:[e.jsx("h3",{className:"sql-cs-card-title",children:"4. Agregación vs Funciones de Ventana"}),e.jsxs("div",{className:"sql-cs-code-sample",children:[e.jsx("strong",{children:"Agregación (Colapsa filas):"}),e.jsx("code",{children:"SELECT depto, AVG(salario), COUNT(*) FROM emp GROUP BY depto;"})]}),e.jsxs("div",{className:"sql-cs-code-sample",style:{marginTop:"0.5rem"},children:[e.jsx("strong",{children:"Ventana OVER (Mantiene cada fila individual):"}),e.jsx("code",{children:"SELECT nombre, salario, RANK() OVER(PARTITION BY depto ORDER BY salario DESC) FROM emp;"})]}),e.jsxs("ul",{className:"sql-cs-bullet-list",children:[e.jsxs("li",{children:[e.jsx("code",{children:"ROW_NUMBER()"}),": Consecutivo estricto (1, 2, 3, 4...)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"RANK()"}),": Con empates y saltos posteriores (1, 2, 2, 4...)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"DENSE_RANK()"}),": Con empates sin saltos (1, 2, 2, 3...)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"LEAD() / LAG()"}),": Fila siguiente / anterior en el particionado."]})]})]})]}),e.jsx("div",{className:"sql-cs-footer",children:e.jsxs("span",{children:["💡 ",e.jsx("em",{children:"Consejo de Examen:"}),' Si te piden "los 3 mejores de cada categoría", la solución canónica es una Window Function (DENSE_RANK) dentro de una CTE o subconsulta.']})})]})]})})}function xe({isOpen:u,onClose:o}){const[s,a]=m.useState("php"),[r,i]=m.useState(null);if(!u)return null;const l=`<?php
// 1. Conexión segura con PDO a MySQL (utf8mb4 y modo de excepciones)
$dsn = "mysql:host=localhost;dbname=micampus_db;charset=utf8mb4";
$user = "db_user";
$pass = "secret_password";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // 2. Sentencia preparada (PREVIENE Inyección SQL al 100%)
    $sql = "SELECT id, nombre, email, nota_media 
            FROM estudiantes 
            WHERE carrera = :carrera AND nota_media >= :notaMin
            ORDER BY nota_media DESC";

    $stmt = $pdo->prepare($sql);
    
    // 3. Vincular parámetros seguros
    $stmt->execute([
        ':carrera' => 'DAM',
        ':notaMin' => 7.0
    ]);

    // 4. Obtener resultados en array asociativo
    $estudiantes = $stmt->fetchAll();
    foreach ($estudiantes as $e) {
        echo "{$e['nombre']} - Nota: {$e['nota_media']}\\n";
    }

} catch (PDOException $e) {
    echo "Error de conexión o consulta: " . $e->getMessage();
}
?>`,d=`package com.micampus.repository;

import com.micampus.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    // 1. Consulta derivada de Spring Data (Método declarativo sin SQL manual)
    List<Estudiante> findByCarreraAndNotaMediaGreaterThanEqual(String carrera, Double notaMedia);

    // 2. Consulta personalizada con JPQL (Orientada a Objetos)
    @Query("SELECT e FROM Estudiante e WHERE e.carrera = :carrera AND e.activo = true ORDER BY e.notaMedia DESC")
    List<Estudiante> findActivosPorCarrera(@Param("carrera") String carrera);

    // 3. Consulta Nativa MySQL (Para funciones complejas, CTEs o Window Functions)
    @Query(value = """
        SELECT e.*, RANK() OVER(PARTITION BY carrera ORDER BY nota_media DESC) as ranking
        FROM estudiantes e
        WHERE carrera = :carrera
        """, nativeQuery = true)
    List<Estudiante> findRankingPorCarreraNative(@Param("carrera") String carrera);
}`,n=(g,R)=>{var v;(v=navigator==null?void 0:navigator.clipboard)!=null&&v.writeText&&(navigator.clipboard.writeText(g),i(R),setTimeout(()=>i(null),2e3))};return e.jsx("div",{className:"sql-modal-backdrop",onClick:o,role:"dialog","aria-modal":"true",children:e.jsxs("div",{className:"sql-modal-window sql-backend-window",onClick:g=>g.stopPropagation(),children:[e.jsxs("div",{className:"sql-modal-header",children:[e.jsxs("div",{className:"sql-modal-header-left",children:[e.jsx("span",{className:"sql-modal-icon",children:"🔌"}),e.jsxs("div",{children:[e.jsx("h2",{className:"sql-modal-title",children:"Integración Backend: PHP PDO & Java Spring Boot"}),e.jsx("p",{className:"sql-modal-subtitle",children:"Aprende cómo conectar y ejecutar de forma segura tus consultas SQL desde la capa de persistencia"})]})]}),e.jsx("button",{type:"button",className:"sql-modal-close-btn",onClick:o,"aria-label":"Cerrar Integración",children:"✕"})]}),e.jsxs("div",{className:"sql-backend-tabs-bar",children:[e.jsx("button",{type:"button",className:`sql-backend-tab-btn ${s==="php"?"active":""}`,onClick:()=>a("php"),children:"🐘 PHP con PDO (SEPE / Web Backend)"}),e.jsx("button",{type:"button",className:`sql-backend-tab-btn ${s==="java"?"active":""}`,onClick:()=>a("java"),children:"☕ Java con Spring Data JPA & Hibernate (DAM/DAW)"})]}),e.jsx("div",{className:"sql-backend-body",children:s==="php"?e.jsxs("div",{className:"sql-backend-pane",children:[e.jsxs("div",{className:"sql-backend-summary",children:[e.jsx("span",{className:"sql-backend-badge php",children:"Patrón Recomendado en PHP"}),e.jsxs("p",{children:["Utiliza siempre ",e.jsx("strong",{children:"PDO con Sentencias Preparadas (Prepared Statements)"}),". Nunca concatenes variables directamente en la cadena SQL mediante ",e.jsx("code",{children:'$sql = "... WHERE id = $id"'}),", ya que expondrías el servidor a ataques de ",e.jsx("strong",{children:"Inyección SQL"}),"."]})]}),e.jsxs("div",{className:"sql-backend-code-header",children:[e.jsx("span",{children:"📄 Ejemplo de Producción: Conexión y SELECT con Parámetros"}),e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>n(l,"php"),children:r==="php"?"✓ Copiado":"📋 Copiar Código"})]}),e.jsx("pre",{className:"code-block",children:e.jsx("code",{children:l})}),e.jsxs("div",{className:"sql-backend-crosslink",children:[e.jsx("span",{children:"📚 ¿Quieres practicar más con PHP?"}),e.jsx(ce,{to:"/sepe/php-chat",className:"sql-crosslink-btn",onClick:o,children:"Abrir Tutor Interactivo de PHP del SEPE ➔"})]})]}):e.jsxs("div",{className:"sql-backend-pane",children:[e.jsxs("div",{className:"sql-backend-summary",children:[e.jsx("span",{className:"sql-backend-badge java",children:"Patrón Recomendado en Java"}),e.jsxs("p",{children:["En Spring Boot, ",e.jsx("strong",{children:"Spring Data JPA"})," se encarga de la persistencia automática. Puedes usar nombres de métodos derivados, consultas ",e.jsx("strong",{children:"JPQL"})," orientadas a entidades o sentencias ",e.jsx("strong",{children:"Native SQL"})," con ",e.jsx("code",{children:"nativeQuery = true"})," para consultas analíticas complejas."]})]}),e.jsxs("div",{className:"sql-backend-code-header",children:[e.jsx("span",{children:"📄 Ejemplo de Producción: Repositorio JpaRepository con Métodos y @Query"}),e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>n(d,"java"),children:r==="java"?"✓ Copiado":"📋 Copiar Código"})]}),e.jsx("pre",{className:"code-block",children:e.jsx("code",{children:d})}),e.jsxs("div",{className:"sql-backend-crosslink",children:[e.jsx("span",{children:"📚 ¿Estás repasando el módulo de Spring Boot?"}),e.jsx(ce,{to:"/spring-boot/initializr",className:"sql-crosslink-btn",onClick:o,children:"Abrir Módulo de Spring Boot & Initializr ➔"})]})]})})]})})}function fe({isOpen:u,onClose:o,onSelectModule:s}){const[a,r]=m.useState(""),i=[{name:"ALTER TABLE",cat:"DDL",desc:"Modifica la estructura de una tabla existente (añadir columnas, cambiar tipos).",modId:"3-1-ddl",syntax:"ALTER TABLE t ADD col INT;"},{name:"AUTO_INCREMENT",cat:"MySQL",desc:"Genera valores enteros secuenciales únicos automáticamente al insertar registros.",modId:"1-2-conceptos",syntax:"id INT AUTO_INCREMENT PRIMARY KEY"},{name:"AVG()",cat:"Agregación",desc:"Calcula el valor numérico medio o promedio de un conjunto de valores.",modId:"4-1-select-basico",syntax:"AVG(salario)"},{name:"CASCADE",cat:"Claves Foráneas",desc:"Propaga automáticamente la eliminación o actualización del registro padre a las tablas hijas.",modId:"2-2-claves",syntax:"ON DELETE CASCADE"},{name:"CHECK",cat:"Restricción",desc:"Valida que los valores de una columna cumplan una condición lógica antes de guardarse.",modId:"2-2-claves",syntax:"CHECK (edad >= 18)"},{name:"COALESCE()",cat:"Funciones",desc:"Devuelve el primer argumento no nulo de una lista dada (ideal para reemplazar NULLs).",modId:"4-1-select-basico",syntax:'COALESCE(telefono, "Sin teléfono")'},{name:"COUNT()",cat:"Agregación",desc:"Devuelve el número total de filas o valores no nulos que coinciden con el criterio.",modId:"5-1-problema-where",syntax:"COUNT(*)"},{name:"CTE (WITH)",cat:"Modern SQL",desc:"Expresión de tabla común que crea un conjunto de resultados temporal con nombre.",modId:"6-1-ctes-intro",syntax:"WITH resumen AS (SELECT ...) SELECT * FROM resumen;"},{name:"DEFAULT",cat:"Restricción",desc:"Establece un valor por defecto que se almacena si no se especifica uno explícitamente.",modId:"2-2-claves",syntax:'estado VARCHAR(20) DEFAULT "Activo"'},{name:"DENSE_RANK()",cat:"Ventana",desc:"Calcula el puesto o ranking de una fila sin saltarse números tras empates.",modId:"7-2-window-ranking",syntax:"DENSE_RANK() OVER(ORDER BY nota DESC)"},{name:"EXPLAIN",cat:"Rendimiento",desc:"Muestra el plan de ejecución interno del motor y qué índices se utilizan.",modId:"10-1-rendimiento-indices",syntax:"EXPLAIN SELECT * FROM usuarios WHERE id = 5;"},{name:"FOREIGN KEY",cat:"Restricción",desc:"Columna que referencia la clave primaria de otra tabla, garantizando integridad referencial.",modId:"2-2-claves",syntax:"FOREIGN KEY (fk_id) REFERENCES tabla(id)"},{name:"GROUP BY",cat:"Cláusula",desc:"Agrupa filas con valores idénticos en columnas resumen para aplicar funciones agregadas.",modId:"5-2-orden-magico",syntax:"GROUP BY departamento"},{name:"HAVING",cat:"Cláusula",desc:"Filtra los grupos devueltos por GROUP BY después de haber calculado las agregaciones.",modId:"5-6-tabla-comparativa",syntax:"HAVING COUNT(*) > 5"},{name:"INDEX (B-Tree)",cat:"Rendimiento",desc:"Estructura auxiliar que acelera drásticamente la búsqueda de filas en columnas clave.",modId:"10-1-rendimiento-indices",syntax:"CREATE INDEX idx_email ON clientes(email);"},{name:"INNER JOIN",cat:"Relaciones",desc:"Cruza tablas y devuelve solo las filas con valores coincidentes en ambas tablas.",modId:"8-1-joins-visual",syntax:"FROM A INNER JOIN B ON A.id = B.a_id"},{name:"JSON_EXTRACT",cat:"MySQL 8",desc:"Extrae datos estructurados desde una columna con tipo JSON nativo.",modId:"11-2-motores-cheatsheet",syntax:'JSON_EXTRACT(datos, "$.perfil.ciudad")'},{name:"LEFT JOIN",cat:"Relaciones",desc:"Devuelve todas las filas de la tabla izquierda y las coincidentes de la derecha (o NULL).",modId:"8-1-joins-visual",syntax:"FROM A LEFT JOIN B ON A.id = B.a_id"},{name:"LIMIT & OFFSET",cat:"Cláusula",desc:"Restringe el número máximo de filas devueltas y permite paginar resultados.",modId:"4-1-select-basico",syntax:"LIMIT 10 OFFSET 20"},{name:"NOT NULL",cat:"Restricción",desc:"Obliga a que una columna nunca pueda contener un valor vacío o nulo.",modId:"2-2-claves",syntax:"nombre VARCHAR(100) NOT NULL"},{name:"PRIMARY KEY",cat:"Restricción",desc:"Identifica de forma unívoca cada fila en la tabla. No puede ser nula ni repetirse.",modId:"2-2-claves",syntax:"id INT PRIMARY KEY"},{name:"RANK()",cat:"Ventana",desc:"Calcula el puesto de honor con saltos numéricos posteriores ante empates.",modId:"7-2-window-ranking",syntax:"RANK() OVER(ORDER BY puntos DESC)"},{name:"ROW_NUMBER()",cat:"Ventana",desc:"Asigna un número secuencial único y estricto (1, 2, 3...) a cada fila de una partición.",modId:"7-2-window-ranking",syntax:"ROW_NUMBER() OVER(PARTITION BY depto ORDER BY fecha)"},{name:"TRIGGER",cat:"Automatización",desc:"Procedimiento que se dispara automáticamente ante eventos INSERT, UPDATE o DELETE.",modId:"9-2-triggers-udf",syntax:"CREATE TRIGGER tr_auditoria BEFORE INSERT ON..."},{name:"UNIQUE",cat:"Restricción",desc:"Garantiza que todos los valores de una columna sean distintos entre sí.",modId:"2-2-claves",syntax:"email VARCHAR(120) UNIQUE"},{name:"WHERE",cat:"Cláusula",desc:"Filtra registros individuales antes de cualquier operación de agrupamiento.",modId:"5-2-orden-magico",syntax:"WHERE activo = 1 AND precio > 50"}],l=m.useMemo(()=>{if(!a.trim())return i;const d=a.toLowerCase();return i.filter(n=>n.name.toLowerCase().includes(d)||n.desc.toLowerCase().includes(d)||n.cat.toLowerCase().includes(d))},[a,i]);return u?e.jsx("div",{className:"sql-modal-backdrop",onClick:o,role:"dialog","aria-modal":"true",children:e.jsxs("div",{className:"sql-modal-window sql-quickref-window",onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{className:"sql-modal-header",children:[e.jsxs("div",{className:"sql-modal-header-left",children:[e.jsx("span",{className:"sql-modal-icon",children:"🔍"}),e.jsxs("div",{children:[e.jsx("h2",{className:"sql-modal-title",children:"Índice Rápido de Palabras Clave & Sintaxis SQL"}),e.jsx("p",{className:"sql-modal-subtitle",children:"Glosario alfabético interactivo: localiza cualquier comando y salta a su explicación"})]})]}),e.jsx("button",{type:"button",className:"sql-modal-close-btn",onClick:o,"aria-label":"Cerrar Glosario",children:"✕"})]}),e.jsxs("div",{className:"sql-quickref-search-bar",children:[e.jsx("input",{type:"text",className:"sql-quickref-input",value:a,onChange:d=>r(d.target.value),placeholder:"Filtrar por palabra clave (ej: HAVING, CASCADE, DENSE_RANK, PRIMARY KEY...)",autoFocus:!0}),e.jsxs("span",{className:"sql-quickref-count",children:[l.length," términos"]})]}),e.jsx("div",{className:"sql-quickref-body",children:e.jsx("div",{className:"sql-quickref-grid",children:l.map((d,n)=>e.jsxs("div",{className:"sql-quickref-card",children:[e.jsxs("div",{className:"sql-quickref-card-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("strong",{className:"sql-quickref-name",children:d.name}),e.jsx("span",{className:"sql-quickref-cat",children:d.cat})]}),e.jsx("button",{type:"button",className:"sql-quickref-jump-btn",onClick:()=>{s(d.modId),o()},title:`Ir al módulo explicativo de ${d.name}`,children:"Ver tema ➔"})]}),e.jsx("p",{className:"sql-quickref-desc",children:d.desc}),e.jsx("code",{className:"sql-quickref-syntax",children:d.syntax})]},n))})})]})}):null}function je({onOpenSandbox:u}){const[o,s]=m.useState({}),[a,r]=m.useState({}),i=[{id:"reto-1-segundo-salario",num:"Reto 1",title:"Encontrar el 2º salario más alto de la empresa",level:"Intermedio",badgeClass:"intermediate",company:"Pregunta recurrente en Amazon, Glovo y Telefónica",problem:"Dada una tabla 'empleados' (id, nombre, salario), escribe una consulta SQL que devuelva exactamente el segundo salario más alto registrado, evitando que salarios repetidos distorsionen el resultado.",hint:"Puedes resolverlo con subconsulta usando MAX() o mediante DISTINCT + ORDER BY + LIMIT 1 OFFSET 1.",solutionSql:`-- Método 1: Estándar y portable con subconsulta (Evita empates)
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
WHERE ranking = 2;`,explanation:"El truco de esta pregunta de entrevista radica en usar DISTINCT o DENSE_RANK(): si dos personas ganan 5000 € y la siguiente 4200 €, un simple 'LIMIT 1 OFFSET 1' sin DISTINCT devolvería de nuevo 5000 € en lugar del segundo valor real."},{id:"reto-2-sin-pedidos",num:"Reto 2",title:"Clientes que NUNCA han realizado un pedido",level:"Básico / Examen",badgeClass:"basic",company:"Pregunta obligatoria de 1º de DAM/DAW",problem:"Dadas las tablas 'clientes' (id, nombre, email) y 'pedidos' (id, cliente_id, fecha, total), obtén el nombre y correo de los clientes registrados que aún no tengan ningún pedido asociado en la base de datos.",hint:"Utiliza un LEFT JOIN filtrando por los nulos de la tabla derecha (Anti-JOIN), o un WHERE NOT EXISTS.",solutionSql:`-- Método 1: La solución reina con LEFT JOIN y filtro IS NULL (Anti-JOIN)
SELECT c.nombre, c.email
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;

-- Método 2: Con NOT EXISTS (Altamente optimizado por el optimizador de MySQL)
SELECT c.nombre, c.email
FROM clientes c
WHERE NOT EXISTS (
    SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id
);`,explanation:"El LEFT JOIN conserva todos los clientes. Si un cliente no tiene pedidos, las columnas de la tabla 'pedidos' vendrán con NULL. Al aplicar 'WHERE p.id IS NULL' nos quedamos únicamente con los huérfanos."},{id:"reto-3-departamentos-agrupados",num:"Reto 3",title:"Departamentos con > 3 empleados y Salario Medio > 2.500 €",level:"Intermedio",badgeClass:"intermediate",company:"Clásico de examen técnico de SQL",problem:"Escribe una consulta que liste el nombre del departamento, el total de trabajadores y el salario promedio, pero solo para departamentos con más de 3 empleados y cuyo promedio salarial supere los 2500 euros.",hint:"Recuerda el orden de ejecución: los filtros sobre montones calculados nunca van en WHERE, van obligatoriamente en HAVING.",solutionSql:`SELECT departamento,
       COUNT(*) AS total_empleados,
       ROUND(AVG(salario), 2) AS salario_medio
FROM empleados
GROUP BY departamento
HAVING COUNT(*) > 3 AND AVG(salario) > 2500
ORDER BY salario_medio DESC;`,explanation:"Un error habitual de los alumnos es intentar escribir 'WHERE COUNT(*) > 3'. Como WHERE se evalúa en el paso 2 (antes de agrupar), la base de datos lanza un error. La solución exige HAVING en el paso 4."},{id:"reto-4-top-n-por-grupo",num:"Reto 4",title:"Los 3 mejores salarios de CADA departamento (Top N por grupo)",level:"Avanzado",badgeClass:"advanced",company:"Prueba Senior de Backend / Data Engineer",problem:"Obtén los 3 salarios más altos dentro de cada departamento de la empresa. La consulta debe devolver el nombre del departamento, el nombre del empleado y su salario, ordenados por departamento y rango.",hint:"No es posible hacerlo con un simple LIMIT porque LIMIT recorta el total global. La herramienta canónica es ROW_NUMBER() o DENSE_RANK() con PARTITION BY dentro de una CTE.",solutionSql:`WITH RankingSalarial AS (
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
ORDER BY departamento, posicion;`,explanation:"PARTITION BY divide el cálculo por cada departamento de manera independiente. Como las funciones de ventana no se pueden filtrar directamente en el WHERE de su misma consulta, se encapsula en una CTE (WITH)."},{id:"reto-5-eliminar-duplicados",num:"Reto 5",title:"Detectar y eliminar registros duplicados conservando el menor ID",level:"Avanzado / DBA",badgeClass:"advanced",company:"Mantenimiento real de bases de datos",problem:"Por un fallo en el software cliente, la tabla 'contactos' (id, email, nombre) tiene emails duplicados con distintos IDs. Escribe la sentencia DELETE que elimine los duplicados conservando únicamente el registro original con el menor ID de cada email.",hint:"Puedes realizar un auto-join (INNER JOIN de la tabla consigo misma) en el DELETE condicionando a1.id > a2.id.",solutionSql:`-- Eliminación con AUTO-JOIN en MySQL
DELETE c1
FROM contactos c1
INNER JOIN contactos c2 
    ON c1.email = c2.email AND c1.id > c2.id;

-- Si solo queremos consultar qué registros están duplicados:
SELECT email, COUNT(*) AS veces_repetido
FROM contactos
GROUP BY email
HAVING COUNT(*) > 1;`,explanation:"La condición 'c1.id > c2.id' empareja cada fila repetida con una copia suya más antigua (con ID menor). Al indicar 'DELETE c1', solo se borra la fila con el ID mayor, dejando intacta la primera inserción."}],l=n=>{s(g=>({...g,[n]:!g[n]}))},d=n=>{r(g=>({...g,[n]:!g[n]}))};return e.jsxs("div",{className:"sql-challenges-container",children:[e.jsxs("div",{className:"sql-challenges-header",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sql-challenges-title",children:"🎯 Taller Interactivo: Los 5 Retos de Examen y Entrevista"}),e.jsx("p",{className:"sql-challenges-subtitle",children:"Ponte a prueba antes de ver la solución. Intenta resolver mentalmente cada reto o pruébalo en el Playground en vivo."})]}),u&&e.jsx("button",{type:"button",className:"sql-btn-gold",onClick:u,children:"🧪 Abrir Playground para Probar"})]}),e.jsx("div",{className:"sql-challenges-list",children:i.map(n=>{const g=!!o[n.id],R=!!a[n.id];return e.jsxs("div",{className:"sql-challenge-card",children:[e.jsxs("div",{className:"sql-challenge-card-top",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",flexWrap:"wrap"},children:[e.jsx("span",{className:"sql-challenge-num",children:n.num}),e.jsx("strong",{className:"sql-challenge-name",children:n.title}),e.jsx("span",{className:`sql-level-badge ${n.badgeClass}`,children:n.level})]}),e.jsx("span",{className:"sql-challenge-company",children:n.company})]}),e.jsx("div",{className:"sql-challenge-problem",children:e.jsx("p",{children:n.problem})}),e.jsxs("div",{className:"sql-challenge-actions",children:[e.jsx("button",{type:"button",className:"sql-challenge-hint-btn",onClick:()=>d(n.id),children:R?"💡 Ocultar Pista":"💡 Ver Pista Conceptual"}),e.jsx("button",{type:"button",className:`sql-challenge-reveal-btn ${g?"active":""}`,onClick:()=>l(n.id),children:g?"🙈 Ocultar Solución":"👁️ Revelar Solución y Explicación"})]}),R&&e.jsxs("div",{className:"sql-challenge-hint-box",children:[e.jsx("strong",{children:"Pista:"})," ",n.hint]}),g&&e.jsxs("div",{className:"sql-challenge-solution-box",children:[e.jsx("div",{className:"sql-solution-code-title",children:e.jsx("span",{children:"✨ Solución Canónica SQL:"})}),e.jsx("pre",{className:"code-block",children:e.jsx("code",{children:n.solutionSql})}),e.jsxs("div",{className:"sql-solution-explanation",children:[e.jsx("strong",{children:"🧠 Explicación del Patrón:"}),e.jsx("p",{children:n.explanation})]})]})]},n.id)})})]})}function Se(){const[u,o]=m.useState("innodb");return e.jsxs("div",{className:"sql-deepdive-container",children:[e.jsxs("div",{className:"sql-deepdive-header",children:[e.jsx("span",{className:"sql-deepdive-badge",children:"⚙️ Especialización Técnica"}),e.jsx("h3",{className:"sql-deepdive-title",children:"Profundidad Técnica en MySQL 8.x: Motores, JSON y Configuración"}),e.jsx("p",{className:"sql-deepdive-desc",children:"Conceptos clave de arquitectura interna que diferencian a MySQL de otros motores y son indispensables en entornos profesionales."})]}),e.jsxs("div",{className:"sql-deepdive-tabs",children:[e.jsx("button",{type:"button",className:`sql-deepdive-tab-btn ${u==="innodb"?"active":""}`,onClick:()=>o("innodb"),children:"1. Motores de Almacenamiento: InnoDB vs MyISAM"}),e.jsx("button",{type:"button",className:`sql-deepdive-tab-btn ${u==="json"?"active":""}`,onClick:()=>o("json"),children:"2. Tipo de Dato JSON Nativo (MySQL 8)"}),e.jsx("button",{type:"button",className:`sql-deepdive-tab-btn ${u==="config"?"active":""}`,onClick:()=>o("config"),children:"3. Buenas Prácticas: utf8mb4 & AUTO_INCREMENT"})]}),e.jsxs("div",{className:"sql-deepdive-pane",children:[u==="innodb"&&e.jsxs("div",{children:[e.jsx("div",{className:"sql-deepdive-intro",children:e.jsxs("p",{children:["En MySQL, cada tabla puede tener su propio ",e.jsx("strong",{children:"motor de almacenamiento (Storage Engine)"}),". Aunque antiguamente se usaba MyISAM por velocidad de lectura, desde MySQL 5.5 y en todo MySQL 8.x el motor por defecto y obligatorio en producción es ",e.jsx("strong",{children:"InnoDB"}),"."]})}),e.jsxs("table",{className:"sql-deepdive-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Característica"}),e.jsx("th",{children:"InnoDB (Motor Estándar)"}),e.jsx("th",{children:"MyISAM (Obsoleto)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Transacciones (ACID)"})}),e.jsx("td",{children:e.jsx("span",{className:"sql-tag-yes",children:"✔️ Sí (COMMIT y ROLLBACK)"})}),e.jsx("td",{children:e.jsx("span",{className:"sql-tag-no",children:"❌ No soportado"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Claves Foráneas (FK)"})}),e.jsx("td",{children:e.jsx("span",{className:"sql-tag-yes",children:"✔️ Sí (Integridad referencial estricta)"})}),e.jsx("td",{children:e.jsx("span",{className:"sql-tag-no",children:"❌ Las ignora sintácticamente"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Nivel de Bloqueo (Locks)"})}),e.jsxs("td",{children:[e.jsx("strong",{children:"Fila (Row-Level Locking):"})," Permite miles de escrituras concurrentes."]}),e.jsxs("td",{children:[e.jsx("strong",{children:"Tabla completa (Table-Level):"})," Un UPDATE congela toda la tabla."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Recuperación ante fallos"})}),e.jsxs("td",{children:["Automática vía ",e.jsx("em",{children:"Redo Log"})," y ",e.jsx("em",{children:"Undo Log"}),"."]}),e.jsx("td",{children:"Propensa a corrupción de datos (exige REPAIR TABLE)."})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Uso recomendado"})}),e.jsx("td",{children:"El 100% de proyectos web, APIs, DAM, DAW y SEPE."}),e.jsx("td",{children:"Solo lectura pura en sistemas heredados (legacy)."})]})]})]})]}),u==="json"&&e.jsxs("div",{children:[e.jsx("div",{className:"sql-deepdive-intro",children:e.jsxs("p",{children:["MySQL 8.x incluye soporte de primera clase para el tipo de datos ",e.jsx("strong",{children:"JSON nativo"}),", permitiendo combinar el rigor relacional con la flexibilidad de bases de datos documentales tipo MongoDB."]})}),e.jsx("pre",{className:"code-block",children:e.jsx("code",{children:`-- 1. Creación de tabla con columna JSON validada
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    atributos JSON, -- Valida sintaxis JSON automáticamente al insertar
    precio DECIMAL(10,2) NOT NULL
);

-- 2. Inserción de documentos JSON
INSERT INTO Productos (nombre, atributos, precio) 
VALUES ('Portátil Gaming', '{"ram": "32GB", "cpu": "i7-13700", "colores": ["negro", "gris"]}', 1299.99);

-- 3. Consulta con el operador flecha (-> extrae con comillas, ->> extrae texto limpio)
SELECT nombre, 
       atributos->>'$.ram' AS memoria_ram,
       atributos->>'$.colores[0]' AS color_principal
FROM Productos
WHERE atributos->>'$.ram' = '32GB';`})})]}),u==="config"&&e.jsxs("div",{children:[e.jsx("div",{className:"sql-deepdive-intro",children:e.jsx("p",{children:"Errores habituales de configuración en MySQL que todo desarrollador debe prevenir antes de pasar a producción:"})}),e.jsxs("div",{className:"sql-deepdive-checklist",children:[e.jsxs("div",{className:"sql-deepdive-item",children:[e.jsx("span",{className:"sql-deepdive-num",children:"1"}),e.jsxs("div",{children:[e.jsxs("strong",{children:["Juego de Caracteres: Usa SIEMPRE ",e.jsx("code",{children:"utf8mb4"})]}),e.jsxs("p",{children:["El antiguo ",e.jsx("code",{children:"utf8"})," de MySQL solo admitía 3 bytes y provocaba fallos críticos al guardar emojis o caracteres internacionales complejos. El estándar actual es ",e.jsx("code",{children:"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"}),"."]})]})]}),e.jsxs("div",{className:"sql-deepdive-item",children:[e.jsx("span",{className:"sql-deepdive-num",children:"2"}),e.jsxs("div",{children:[e.jsx("strong",{children:"El peligro de AUTO_INCREMENT y los huecos"}),e.jsxs("p",{children:["Si ejecutas un ",e.jsx("code",{children:"INSERT"})," que falla por una restricción o se cancela con ",e.jsx("code",{children:"ROLLBACK"}),", el valor de ",e.jsx("code",{children:"AUTO_INCREMENT"})," ya se habrá incrementado y no se reutiliza. Por tanto, nunca asumas que los IDs serán 100% consecutivos en producción."]})]})]}),e.jsxs("div",{className:"sql-deepdive-item",children:[e.jsx("span",{className:"sql-deepdive-num",children:"3"}),e.jsxs("div",{children:[e.jsxs("strong",{children:["Diagnóstico profundo: ",e.jsx("code",{children:"EXPLAIN ANALYZE"})]}),e.jsxs("p",{children:["Introducido en MySQL 8.0.18, ",e.jsx("code",{children:"EXPLAIN ANALYZE SELECT ..."})," ejecuta realmente la consulta midiendo tiempos reales por nodo, estimación de filas frente a filas reales y coste en milisegundos."]})]})]})]})]})]})]})}const D={clientes:[{id:1,nombre:"Lucía Méndez",email:"lucia.mendez@techstore.es",ciudad:"Madrid",nivel:"VIP",fecha_alta:"2025-01-15",saldo_puntos:450},{id:2,nombre:"Javier Navarro",email:"j.navarro@techstore.es",ciudad:"Barcelona",nivel:"Estándar",fecha_alta:"2025-02-01",saldo_puntos:120},{id:3,nombre:"Carmen Ortiz",email:"carmen.ortiz@techstore.es",ciudad:"Valencia",nivel:"VIP",fecha_alta:"2025-02-18",saldo_puntos:890},{id:4,nombre:"Marcos Alonso",email:"m.alonso@techstore.es",ciudad:"Madrid",nivel:"Estándar",fecha_alta:"2025-03-05",saldo_puntos:50},{id:5,nombre:"Patricia Gil",email:"patricia.gil@techstore.es",ciudad:"Sevilla",nivel:"VIP",fecha_alta:"2025-03-20",saldo_puntos:620},{id:6,nombre:"David Serrano",email:"d.serrano@techstore.es",ciudad:"Bilbao",nivel:"Estándar",fecha_alta:"2025-04-10",saldo_puntos:0},{id:7,nombre:"Elena Vega",email:"elena.vega@techstore.es",ciudad:"Barcelona",nivel:"Estándar",fecha_alta:"2025-05-02",saldo_puntos:95},{id:8,nombre:"Raúl Morales",email:"raul.m@techstore.es",ciudad:"Madrid",nivel:"Estándar",fecha_alta:"2025-05-14",saldo_puntos:0}],productos:[{id:101,nombre:'Portátil ThinkPad Pro 16"',categoria:"Portátiles",precio:1249.99,stock:8,proveedor:"Lenovo"},{id:102,nombre:'Monitor Curvo 34" UltraWide 144Hz',categoria:"Monitores",precio:459.5,stock:15,proveedor:"LG"},{id:103,nombre:"Teclado Mecánico RGB Switch Red",categoria:"Accesorios",precio:89.9,stock:45,proveedor:"Corsair"},{id:104,nombre:"Ratón Ergonómico Inalámbrico",categoria:"Accesorios",precio:49.95,stock:60,proveedor:"Logitech"},{id:105,nombre:"Auriculares Cancelación Ruido ANC",categoria:"Audio",precio:199,stock:6,proveedor:"Sony"},{id:106,nombre:"Smartphone Galaxy Pro 256GB",categoria:"Móviles",precio:899,stock:12,proveedor:"Samsung"},{id:107,nombre:"Disco SSD NVMe 2TB PCIe 4.0",categoria:"Componentes",precio:139.99,stock:25,proveedor:"Crucial"},{id:108,nombre:"Webcam 4K con Micrófono Estéreo",categoria:"Accesorios",precio:119.5,stock:4,proveedor:"Elgato"}],pedidos:[{id:1001,cliente_id:1,fecha:"2025-05-01",total:1339.89,estado:"Entregado",metodo_pago:"Tarjeta"},{id:1002,cliente_id:2,fecha:"2025-05-03",total:459.5,estado:"Entregado",metodo_pago:"PayPal"},{id:1003,cliente_id:3,fecha:"2025-05-04",total:1098,estado:"Entregado",metodo_pago:"Bizum"},{id:1004,cliente_id:1,fecha:"2025-05-07",total:89.9,estado:"Entregado",metodo_pago:"Tarjeta"},{id:1005,cliente_id:4,fecha:"2025-05-08",total:49.95,estado:"Cancelado",metodo_pago:"Tarjeta"},{id:1006,cliente_id:5,fecha:"2025-05-10",total:1448.99,estado:"En tránsito",metodo_pago:"Transferencia"},{id:1007,cliente_id:3,fecha:"2025-05-12",total:139.99,estado:"En tránsito",metodo_pago:"Bizum"},{id:1008,cliente_id:7,fecha:"2025-05-14",total:119.5,estado:"Pendiente",metodo_pago:"Tarjeta"},{id:1009,cliente_id:6,fecha:"2025-05-15",total:899,estado:"Entregado",metodo_pago:"Tarjeta"},{id:1010,cliente_id:5,fecha:"2025-05-16",total:199,estado:"Entregado",metodo_pago:"Bizum"}]},re=[{id:"mision-1-stock",area:"📦 Logística & Almacén",title:"Misión 1: Alerta Urgente de Rotura de Stock",context:"El responsable de almacén necesita contactar a los proveedores para reponer aquellos artículos con stock crítico (menos de 10 unidades disponibles).",goal:"Obtén el ID, nombre del producto, proveedor, precio y stock de los artículos con stock menor a 10, ordenados de menor a mayor cantidad.",builderConfig:{table:"productos",columns:["id","nombre","proveedor","precio","stock"],whereCol:"stock",whereOp:"<",whereVal:"10",orderByCol:"stock",orderDir:"ASC",limit:"10"},canonicalSql:`SELECT id, nombre, proveedor, precio, stock
FROM productos
WHERE stock < 10
ORDER BY stock ASC;`,explanation:"Filtramos con WHERE stock < 10 y ordenamos de forma ascendente (ASC) para que el producto con menor existencia (Webcam 4K con 4 unidades) aparezca en la primera posición."},{id:"mision-2-facturacion-ciudad",area:"💳 Finanzas & Facturación",title:"Misión 2: Facturación Real por Ciudad (Pedidos Entregados)",context:"La dirección financiera quiere conocer qué ciudades generan mayor volumen de negocio, contabilizando únicamente los pedidos confirmados y entregados (excluyendo cancelados y pendientes).",goal:"Une pedidos con clientes y calcula el número de compras y el total facturado por ciudad, ordenado de mayor a menor importe.",builderConfig:{table:"pedidos",joinTable:"clientes",joinOn:"pedidos.cliente_id = clientes.id",groupByCol:"clientes.ciudad",whereCol:"pedidos.estado",whereOp:"=",whereVal:"Entregado"},canonicalSql:`SELECT c.ciudad,
       COUNT(p.id) AS total_pedidos,
       ROUND(SUM(p.total), 2) AS facturacion_total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
WHERE p.estado = 'Entregado'
GROUP BY c.ciudad
ORDER BY facturacion_total DESC;`,explanation:"Hacemos INNER JOIN entre 'pedidos' y 'clientes'. Primero descartamos los no entregados con WHERE (paso 2 del motor), agrupamos por ciudad (paso 3) y calculamos la suma total (SUM) y conteo (COUNT)."},{id:"mision-3-clientes-vip",area:"⭐ Marketing & Fidelización",title:"Misión 3: El Top 3 de Clientes con Mayor Gasto Total",context:"El equipo de marketing va a regalar un vale exclusivo de 100 € a los 3 mejores clientes de la tienda según el dinero total gastado en compras válidas.",goal:"Lista el nombre del cliente, su email, nivel y el importe total gastado en pedidos válidos (no cancelados), limitando a los 3 primeros.",builderConfig:{table:"pedidos",joinTable:"clientes",canonicalSql:""},canonicalSql:`SELECT c.nombre, c.email, c.nivel,
       ROUND(SUM(p.total), 2) AS gasto_acumulado
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado != 'Cancelado'
GROUP BY c.id, c.nombre, c.email, c.nivel
ORDER BY gasto_acumulado DESC
LIMIT 3;`,explanation:"Calculamos el SUM(total) agrupado por cliente. Usamos ORDER BY gasto_acumulado DESC para situar a los mayores compradores arriba y LIMIT 3 para seleccionar únicamente el podio de clientes."},{id:"mision-4-leads-frios",area:"🎯 Conversión & Ventas",title:"Misión 4: Detectar Usuarios Registrados sin Ninguna Compra",context:"Buscamos reactivar usuarios registrados que crearon su cuenta pero nunca se animaron a tramitar su primer pedido.",goal:"Encuentra los clientes que no tienen ningún pedido en la tabla de pedidos para enviarles una campaña de bienvenida.",canonicalSql:`SELECT c.id, c.nombre, c.email, c.ciudad, c.fecha_alta
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;`,explanation:"Este es el clásico Anti-JOIN. El LEFT JOIN preserva a todos los clientes. Aquellos que nunca han comprado tendrán NULL en las columnas de la tabla pedidos. Al filtrar 'WHERE p.id IS NULL' aislamos a los usuarios sin pedidos (como Raúl Morales)."},{id:"mision-5-ticket-medio",area:"📊 Dirección Estratégica",title:"Misión 5: Ticket Medio y Número de Pedidos por Nivel de Cliente",context:'La junta directiva desea analizar si los clientes con cuenta "VIP" realmente tienen un gasto medio por compra significativamente superior al de los clientes "Estándar".',goal:"Calcula el número de pedidos y el gasto medio por pedido (ticket medio) comparando clientes VIP frente a Estándar.",canonicalSql:`SELECT c.nivel AS tipo_cliente,
       COUNT(p.id) AS numero_pedidos,
       ROUND(AVG(p.total), 2) AS ticket_medio,
       ROUND(SUM(p.total), 2) AS volumen_total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado != 'Cancelado'
GROUP BY c.nivel
ORDER BY ticket_medio DESC;`,explanation:"Agrupamos por 'c.nivel' y calculamos dos métricas esenciales del e-commerce: AVG(p.total) para el ticket medio y SUM(p.total) para el volumen de facturación total."},{id:"mision-6-biblioteca-prestamos",area:"📚 Biblioteca & Cultura",title:"Misión 6: Biblioteca Central • Control de Préstamos Fuera de Plazo",context:"En el servicio municipal de bibliotecas, el mostrador de atención al lector necesita identificar los préstamos vencidos que aún no han sido devueltos para emitir avisos telefónicos a los socios sancionables.",goal:"Cruza préstamos con libros y socios para mostrar el número de préstamo, título, nombre del socio, teléfono de contacto y fecha límite para préstamos con estado 'Vencido con retraso'.",builderConfig:{table:"pedidos",columns:["id","cliente_id","total","estado"],whereCol:"estado",whereOp:"=",whereVal:"Cancelado"},canonicalSql:`SELECT p.id AS prestamo_num, l.titulo, s.nombre AS socio, s.telefono, p.fecha_limite, p.estado
FROM prestamos p
INNER JOIN libros l ON p.libro_id = l.id
INNER JOIN socios s ON p.socio_id = s.id
WHERE p.fecha_devolucion IS NULL AND p.estado = 'Vencido con retraso'
ORDER BY p.fecha_limite ASC;`,explanation:"Este cruce canónico de 3 tablas conecta la entidad 'libros' y 'socios' a través de la tabla intermedia 'prestamos'. La condición 'p.fecha_devolucion IS NULL' garantiza que solo se consideren ejemplares que aún siguen en posesión del lector."}];function ue(u){const o=performance.now(),s=u.trim().replace(/;$/,"").replace(/\s+/g," ");try{const a=s.toUpperCase();if(a.includes("WHERE STOCK < 10")||a.includes("STOCK < 10")){const r=D.productos.filter(i=>i.stock<10).sort((i,l)=>i.stock-l.stock).map(i=>({id:i.id,nombre:i.nombre,proveedor:i.proveedor,precio:`${i.precio} €`,stock:i.stock}));return U(["id","nombre","proveedor","precio","stock"],r,o)}if(a.includes("GROUP BY C.CIUDAD")||a.includes("GROUP BY CIUDAD")){const r={};D.pedidos.filter(l=>l.estado==="Entregado").forEach(l=>{const d=D.clientes.find(g=>g.id===l.cliente_id),n=d?d.ciudad:"Desconocida";r[n]||(r[n]={total_pedidos:0,facturacion:0}),r[n].total_pedidos+=1,r[n].facturacion+=l.total});const i=Object.entries(r).map(([l,d])=>({ciudad:l,total_pedidos:d.total_pedidos,facturacion_total:`${d.facturacion.toFixed(2)} €`})).sort((l,d)=>parseFloat(d.facturacion_total)-parseFloat(l.facturacion_total));return U(["ciudad","total_pedidos","facturacion_total"],i,o)}if(a.includes("LIMIT 3")&&(a.includes("GASTO")||a.includes("SUM(P.TOTAL)")||a.includes("SUM("))){const r={};D.pedidos.filter(l=>l.estado!=="Cancelado").forEach(l=>{r[l.cliente_id]||(r[l.cliente_id]=0),r[l.cliente_id]+=l.total});const i=Object.entries(r).map(([l,d])=>{const n=D.clientes.find(g=>g.id===Number(l));return{nombre:(n==null?void 0:n.nombre)||"Cliente",email:(n==null?void 0:n.email)||"",nivel:(n==null?void 0:n.nivel)||"Estándar",gasto_acumulado:`${d.toFixed(2)} €`}}).sort((l,d)=>parseFloat(d.gasto_acumulado)-parseFloat(l.gasto_acumulado)).slice(0,3);return U(["nombre","email","nivel","gasto_acumulado"],i,o)}if(a.includes("PRESTAMOS")||a.includes("LIBROS")||a.includes("VENCIDO"))return U(["prestamo_num","titulo","socio","telefono","fecha_limite","estado"],[{prestamo_num:702,titulo:"Clean Code: Manual de Estilo Ágil",socio:"Carlos Mendoza",telefono:"688223344",fecha_limite:"2025-05-27",estado:"Vencido con retraso"},{prestamo_num:707,titulo:"Sapiens: De animales a dioses",socio:"Carlos Mendoza",telefono:"688223344",fecha_limite:"2025-06-05",estado:"Vencido con retraso"}],o);if(a.includes("P.ID IS NULL")||a.includes("LEFT JOIN")&&a.includes("NULL")){const r=new Set(D.pedidos.map(l=>l.cliente_id)),i=D.clientes.filter(l=>!r.has(l.id)).map(l=>({id:l.id,nombre:l.nombre,email:l.email,ciudad:l.ciudad,fecha_alta:l.fecha_alta}));return U(["id","nombre","email","ciudad","fecha_alta"],i,o)}if(a.includes("GROUP BY C.NIVEL")||a.includes("GROUP BY NIVEL")){const r={VIP:{pedidos:0,suma:0},Estándar:{pedidos:0,suma:0}};D.pedidos.filter(l=>l.estado!=="Cancelado").forEach(l=>{const d=D.clientes.find(g=>g.id===l.cliente_id),n=d?d.nivel:"Estándar";r[n]||(r[n]={pedidos:0,suma:0}),r[n].pedidos+=1,r[n].suma+=l.total});const i=Object.entries(r).map(([l,d])=>({tipo_cliente:l,numero_pedidos:d.pedidos,ticket_medio:`${(d.suma/(d.pedidos||1)).toFixed(2)} €`,volumen_total:`${d.suma.toFixed(2)} €`}));return U(["tipo_cliente","numero_pedidos","ticket_medio","volumen_total"],i,o)}if(a.includes("FROM CLIENTES")){let r=[...D.clientes];return a.includes("VIP")&&(r=r.filter(i=>i.nivel==="VIP")),U(["id","nombre","email","ciudad","nivel","saldo_puntos"],r,o)}if(a.includes("FROM PRODUCTOS")){let r=[...D.productos];return a.includes("PORTÁTILES")&&(r=r.filter(i=>i.categoria==="Portátiles")),U(["id","nombre","categoria","precio","stock","proveedor"],r,o)}return a.includes("FROM PEDIDOS")?U(["id","cliente_id","fecha","total","estado","metodo_pago"],D.pedidos,o):U(["id","nombre","categoria","precio","stock"],D.productos.slice(0,5),o)}catch(a){return{success:!1,error:a.message||"Error al ejecutar la consulta en el taller de negocio."}}}function U(u,o,s){const a=+(performance.now()-s).toFixed(2);return{success:!0,columns:u,rows:o,rowCount:o.length,executionTimeMs:a}}function ye({isOpen:u,onClose:o}){const[s,a]=m.useState("missions"),[r,i]=m.useState("productos"),[l,d]=m.useState(["id","nombre","precio","stock"]),[n,g]=m.useState("stock"),[R,v]=m.useState("<"),[T,S]=m.useState("10"),[j,h]=m.useState("stock"),[y,I]=m.useState("ASC"),[A,V]=m.useState("10"),[F,G]=m.useState(!0),[H,w]=m.useState(!0),[B,z]=m.useState(!0),[_,p]=m.useState(re[0].id),[f,C]=m.useState({}),[q,M]=m.useState(null),[X,K]=m.useState(!1),Z=m.useMemo(()=>{var t;return Object.keys(((t=D[r])==null?void 0:t[0])||{})},[r]),W=m.useMemo(()=>{let N=`SELECT ${l.length>0?l.join(`,
       `):"*"}
FROM ${r}`;if(F&&n&&T.trim()){const c=!isNaN(T)&&T.trim()!==""?T:`'${T}'`;N+=`
WHERE ${n} ${R} ${c}`}return H&&j&&(N+=`
ORDER BY ${j} ${y}`),B&&A&&parseInt(A,10)>0?N+=`
LIMIT ${A};`:N+=";",N},[r,l,F,n,R,T,H,j,y,B,A]);if(!u)return null;const Y=t=>{var P;i(t);const N=Object.keys(((P=D[t])==null?void 0:P[0])||{});d(N.slice(0,4)),g(N[1]||N[0]),h(N[0])},se=t=>{d(N=>N.includes(t)?N.filter(P=>P!==t):[...N,t])},oe=()=>{const t=ue(W);M(t)},ie=t=>{const N=ue(t);M(N)},$=t=>{var N;(N=t.builderConfig)!=null&&N.table&&(i(t.builderConfig.table),t.builderConfig.columns&&d(t.builderConfig.columns),t.builderConfig.whereCol&&(G(!0),g(t.builderConfig.whereCol),v(t.builderConfig.whereOp||"="),S(t.builderConfig.whereVal||"")),t.builderConfig.orderByCol&&(w(!0),h(t.builderConfig.orderByCol),I(t.builderConfig.orderDir||"ASC")),t.builderConfig.limit&&(z(!0),V(t.builderConfig.limit))),a("builder")},ee=t=>{var N;(N=navigator==null?void 0:navigator.clipboard)!=null&&N.writeText&&(navigator.clipboard.writeText(t),K(!0),setTimeout(()=>K(!1),2e3))},te=t=>{C(N=>({...N,[t]:!N[t]}))};return e.jsx("div",{className:"sql-modal-backdrop",onClick:o,role:"dialog","aria-modal":"true",children:e.jsxs("div",{className:"sql-modal-window sql-builder-window",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"sql-modal-header",children:[e.jsxs("div",{className:"sql-modal-header-left",children:[e.jsx("span",{className:"sql-modal-icon",children:"🛒"}),e.jsxs("div",{children:[e.jsx("h2",{className:"sql-modal-title",children:"Generador Visual SQL & Taller Real: TechStore"}),e.jsx("p",{className:"sql-modal-subtitle",children:"Aprende SQL resolviendo casos de negocio reales en una tienda de comercio electrónico y logística"})]})]}),e.jsx("button",{type:"button",className:"sql-modal-close-btn",onClick:o,"aria-label":"Cerrar Taller",children:"✕"})]}),e.jsxs("div",{className:"sql-backend-tabs-bar",children:[e.jsxs("button",{type:"button",className:`sql-backend-tab-btn ${s==="missions"?"active":""}`,onClick:()=>a("missions"),children:["🎯 Misiones de Negocio Reales (",re.length,")"]}),e.jsx("button",{type:"button",className:`sql-backend-tab-btn ${s==="builder"?"active":""}`,onClick:()=>a("builder"),children:"🛠️ Generador Visual Asistido (Query Builder)"}),e.jsx("button",{type:"button",className:`sql-backend-tab-btn ${s==="schema"?"active":""}`,onClick:()=>a("schema"),children:"🗄️ Esquema de Datos TechStore"})]}),e.jsxs("div",{className:"sql-builder-content",children:[s==="missions"&&e.jsxs("div",{className:"sql-missions-pane",children:[e.jsxs("div",{className:"sql-missions-intro",children:[e.jsx("span",{className:"sql-missions-intro-badge",children:"🏢 Escenario de Producción"}),e.jsxs("p",{children:["Bienvenido al equipo de ingeniería de ",e.jsx("strong",{children:"TechStore"}),". Aquí no practicarás con sentencias abstractas: cada consulta responde a una necesidad crítica de los departamentos de ",e.jsx("strong",{children:"Logística, Finanzas, Marketing y Dirección"}),"."]})]}),e.jsx("div",{className:"sql-missions-grid",children:re.map(t=>{const N=!!f[t.id];return e.jsxs("div",{className:"sql-mission-card",children:[e.jsxs("div",{className:"sql-mission-card-header",children:[e.jsx("span",{className:"sql-mission-area",children:t.area}),e.jsx("h4",{className:"sql-mission-title",children:t.title})]}),e.jsxs("div",{className:"sql-mission-context",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Contexto:"})," ",t.context]}),e.jsxs("p",{className:"sql-mission-goal",children:[e.jsx("strong",{children:"Objetivo SQL:"})," ",t.goal]})]}),e.jsxs("div",{className:"sql-mission-actions",children:[e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>$(t),title:"Cargar los parámetros de esta misión en el Generador Visual",children:"🛠️ Resolver con Generador Visual"}),e.jsx("button",{type:"button",className:"sql-run-query-btn",onClick:()=>ie(t.canonicalSql),title:"Ejecutar la consulta real en memoria",children:"▶️ Ejecutar Solución en Vivo"}),e.jsx("button",{type:"button",className:`sql-challenge-hint-btn ${N?"active":""}`,onClick:()=>te(t.id),children:N?"🙈 Ocultar SQL":"👁️ Ver SQL y Análisis"})]}),N&&e.jsxs("div",{className:"sql-mission-solution-pane",children:[e.jsx("pre",{className:"code-block",children:e.jsx("code",{children:t.canonicalSql})}),e.jsxs("div",{className:"sql-solution-explanation",children:[e.jsx("strong",{children:"🧠 Lógica de Negocio:"}),e.jsx("p",{children:t.explanation})]})]})]},t.id)})})]}),s==="builder"&&e.jsx("div",{className:"sql-builder-pane",children:e.jsxs("div",{className:"sql-builder-columns-wrap",children:[e.jsxs("div",{className:"sql-builder-controls-col",children:[e.jsxs("div",{className:"sql-builder-group",children:[e.jsx("label",{className:"sql-builder-label",children:"1. Seleccionar Tabla Origen (FROM):"}),e.jsx("div",{className:"sql-builder-table-selector",children:["productos","pedidos","clientes"].map(t=>e.jsxs("button",{type:"button",className:`sql-builder-table-btn ${r===t?"active":""}`,onClick:()=>Y(t),children:[t==="productos"&&"📦 ",t==="pedidos"&&"📑 ",t==="clientes"&&"👥 ",t]},t))})]}),e.jsxs("div",{className:"sql-builder-group",children:[e.jsx("label",{className:"sql-builder-label",children:"2. Columnas a Proyectar (SELECT):"}),e.jsx("div",{className:"sql-builder-checkbox-grid",children:Z.map(t=>e.jsxs("label",{className:"sql-builder-col-item",children:[e.jsx("input",{type:"checkbox",checked:l.includes(t),onChange:()=>se(t)}),e.jsx("span",{children:t})]},t))})]}),e.jsxs("div",{className:"sql-builder-group",children:[e.jsx("div",{className:"sql-builder-toggle-title",children:e.jsxs("label",{className:"sql-builder-label",children:[e.jsx("input",{type:"checkbox",checked:F,onChange:t=>G(t.target.checked)})," ","3. Filtrar Filas (WHERE):"]})}),F&&e.jsxs("div",{className:"sql-builder-inline-row",children:[e.jsx("select",{className:"sql-builder-select",value:n,onChange:t=>g(t.target.value),children:Z.map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("select",{className:"sql-builder-select op",value:R,onChange:t=>v(t.target.value),children:[e.jsx("option",{value:"=",children:"="}),e.jsx("option",{value:"!=",children:"!="}),e.jsx("option",{value:">",children:">"}),e.jsx("option",{value:"<",children:"<"}),e.jsx("option",{value:">=",children:">="}),e.jsx("option",{value:"<=",children:"<="}),e.jsx("option",{value:"LIKE",children:"LIKE"})]}),e.jsx("input",{type:"text",className:"sql-builder-input",value:T,onChange:t=>S(t.target.value),placeholder:"Valor de filtro..."})]})]}),e.jsxs("div",{className:"sql-builder-group",children:[e.jsx("div",{className:"sql-builder-toggle-title",children:e.jsxs("label",{className:"sql-builder-label",children:[e.jsx("input",{type:"checkbox",checked:H,onChange:t=>w(t.target.checked)})," ","4. Ordenar Resultados (ORDER BY):"]})}),H&&e.jsxs("div",{className:"sql-builder-inline-row",children:[e.jsx("select",{className:"sql-builder-select",value:j,onChange:t=>h(t.target.value),children:Z.map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("select",{className:"sql-builder-select",value:y,onChange:t=>I(t.target.value),children:[e.jsx("option",{value:"ASC",children:"ASC (Menor a mayor / A-Z)"}),e.jsx("option",{value:"DESC",children:"DESC (Mayor a menor / Z-A)"})]})]})]}),e.jsxs("div",{className:"sql-builder-group",children:[e.jsx("div",{className:"sql-builder-toggle-title",children:e.jsxs("label",{className:"sql-builder-label",children:[e.jsx("input",{type:"checkbox",checked:B,onChange:t=>z(t.target.checked)})," ","5. Límite de Filas (LIMIT):"]})}),B&&e.jsx("input",{type:"number",className:"sql-builder-input",value:A,onChange:t=>V(t.target.value),min:"1",max:"100",style:{maxWidth:"120px"}})]})]}),e.jsxs("div",{className:"sql-builder-code-col",children:[e.jsxs("div",{className:"sql-editor-toolbar",children:[e.jsx("span",{className:"sql-editor-label",children:"✨ Código SQL Generado en Tiempo Real"}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>ee(W),children:X?"✓ Copiado":"📋 Copiar"}),e.jsx("button",{type:"button",className:"sql-run-query-btn",onClick:oe,children:"▶️ Ejecutar Query"})]})]}),e.jsx("pre",{className:"code-block sql-builder-preview-box",children:e.jsx("code",{children:W})}),e.jsxs("div",{className:"sql-builder-tip-box",children:["💡 ",e.jsx("strong",{children:"Aprendizaje activo:"})," Modifica cualquier casilla, orden o condición a la izquierda y observa cómo la sintaxis SQL se reorganiza de manera inmediata."]})]})]})}),s==="schema"&&e.jsxs("div",{className:"sql-schema-explorer-pane",children:[e.jsxs("div",{className:"sql-schema-info-card",children:[e.jsx("h3",{children:"🗄️ Diccionario de Datos de TechStore"}),e.jsx("p",{children:"Esta base de datos simula el backend real de una tienda con 3 tablas vinculadas:"})]}),e.jsxs("div",{className:"sql-schema-tables-grid",children:[e.jsxs("div",{className:"sql-schema-box",children:[e.jsx("h4",{children:"👥 Tabla: clientes (8 registros)"}),e.jsxs("table",{className:"sql-cs-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descripción"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"id"})}),e.jsx("td",{children:"INT (PK)"}),e.jsx("td",{children:"Identificador único del usuario"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nombre"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"Nombre completo del cliente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"email"})}),e.jsx("td",{children:"VARCHAR (UNIQUE)"}),e.jsx("td",{children:"Correo electrónico"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ciudad"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"Población de envío"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nivel"})}),e.jsx("td",{children:"ENUM"}),e.jsx("td",{children:"'Estándar' o 'VIP'"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"saldo_puntos"})}),e.jsx("td",{children:"INT"}),e.jsx("td",{children:"Puntos de fidelización acumulados"})]})]})]})]}),e.jsxs("div",{className:"sql-schema-box",children:[e.jsx("h4",{children:"📦 Tabla: productos (8 registros)"}),e.jsxs("table",{className:"sql-cs-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descripción"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"id"})}),e.jsx("td",{children:"INT (PK)"}),e.jsx("td",{children:"Identificador del artículo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nombre"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"Nombre comercial del producto"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"categoria"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"Familia (Portátiles, Audio, etc.)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"precio"})}),e.jsx("td",{children:"DECIMAL(10,2)"}),e.jsx("td",{children:"PVP en euros"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"stock"})}),e.jsx("td",{children:"INT"}),e.jsx("td",{children:"Unidades físicas en almacén"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"proveedor"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"Marca distribuidora"})]})]})]})]}),e.jsxs("div",{className:"sql-schema-box",children:[e.jsx("h4",{children:"📑 Tabla: pedidos (10 registros)"}),e.jsxs("table",{className:"sql-cs-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descripción"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"id"})}),e.jsx("td",{children:"INT (PK)"}),e.jsx("td",{children:"Número de factura/pedido"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cliente_id"})}),e.jsx("td",{children:"INT (FK)"}),e.jsx("td",{children:"Enlaza con clientes(id)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fecha"})}),e.jsx("td",{children:"DATE"}),e.jsx("td",{children:"Fecha de emisión"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"total"})}),e.jsx("td",{children:"DECIMAL(10,2)"}),e.jsx("td",{children:"Importe total del pedido"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"estado"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"'Entregado', 'En tránsito', 'Cancelado'"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"metodo_pago"})}),e.jsx("td",{children:"VARCHAR"}),e.jsx("td",{children:"'Tarjeta', 'Bizum', 'PayPal'"})]})]})]})]})]})]}),q&&e.jsxs("div",{className:"sql-builder-results-section",children:[e.jsxs("div",{className:"sql-results-header",children:[e.jsx("span",{className:"sql-results-title",children:"📊 Resultado de la Consulta en TechStore"}),e.jsxs("span",{className:"sql-results-badge",children:["✓ ",q.rowCount," ",q.rowCount===1?"fila":"filas"," devueltas en ",q.executionTimeMs," ms"]})]}),e.jsx("div",{className:"sql-results-table-wrap",children:e.jsxs("table",{className:"sql-results-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:q.columns.map((t,N)=>e.jsx("th",{children:t},N))})}),e.jsx("tbody",{children:q.rows.map((t,N)=>e.jsx("tr",{children:q.columns.map((P,c)=>e.jsx("td",{children:String(t[P]!==void 0?t[P]:"")},c))},N))})]})})]})]})]})})}const Q=[{id:"case-techstore",name:"TechStore",industry:"E-Commerce & Logística de Envíos",icon:"🛒",accentColor:"#1a5490",summary:"Plataforma de comercio electrónico de tecnología que gestiona clientes, catálogo de productos y ciclo de vida de pedidos.",situation:"TechStore es una tienda online de electrónica e informática con almacén central en Madrid. El departamento de operaciones, el equipo financiero y el área de marketing necesitan consultar diariamente la base de datos para responder a preguntas críticas de negocio: controlar roturas de stock antes de que se agoten los artículos, facturar pedidos entregados por ciudad, recompensar a compradores VIP y recuperar a clientes que crearon una cuenta pero nunca llegaron a comprar.",tables:[{name:"clientes",label:"Clientes Registrados",icon:"👥",description:"Almacena la información de los usuarios registrados en la tienda y su estatus de fidelización.",columns:[{name:"id",type:"INT",key:"PK",desc:"Identificador único e irrepetible del cliente."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Nombre y apellidos del usuario."},{name:"email",type:"VARCHAR(120)",key:"UNIQUE",desc:"Correo electrónico único para facturas y login."},{name:"ciudad",type:"VARCHAR(60)",key:"",desc:"Ciudad de destino habitual para los envíos."},{name:"nivel",type:"VARCHAR(20)",key:"",desc:"Segmento del cliente: 'Estándar' o 'VIP'."},{name:"saldo_puntos",type:"INT",key:"",desc:"Puntos de fidelidad acumulados canjeables por descuentos."}],sampleData:[{id:1,nombre:"Lucía Méndez",email:"lucia.mendez@techstore.es",ciudad:"Madrid",nivel:"VIP",saldo_puntos:450},{id:2,nombre:"Javier Navarro",email:"j.navarro@techstore.es",ciudad:"Barcelona",nivel:"Estándar",saldo_puntos:120},{id:3,nombre:"Carmen Ortiz",email:"carmen.ortiz@techstore.es",ciudad:"Valencia",nivel:"VIP",saldo_puntos:890},{id:4,nombre:"Marcos Alonso",email:"m.alonso@techstore.es",ciudad:"Madrid",nivel:"Estándar",saldo_puntos:50},{id:5,nombre:"Patricia Gil",email:"patricia.gil@techstore.es",ciudad:"Sevilla",nivel:"VIP",saldo_puntos:620},{id:6,nombre:"David Serrano",email:"d.serrano@techstore.es",ciudad:"Bilbao",nivel:"Estándar",saldo_puntos:0},{id:7,nombre:"Elena Vega",email:"elena.vega@techstore.es",ciudad:"Barcelona",nivel:"Estándar",saldo_puntos:95},{id:8,nombre:"Raúl Morales",email:"raul.m@techstore.es",ciudad:"Madrid",nivel:"Estándar",saldo_puntos:0}]},{name:"productos",label:"Catálogo de Productos",icon:"📦",description:"Inventario físico de artículos tecnológicos con precios de venta y control de existencias en almacén.",columns:[{name:"id",type:"INT",key:"PK",desc:"Código de producto único (SKU)."},{name:"nombre",type:"VARCHAR(120)",key:"",desc:"Nombre comercial del dispositivo."},{name:"categoria",type:"VARCHAR(50)",key:"",desc:"Familia (Portátiles, Monitores, Audio, Accesorios, Móviles)."},{name:"precio",type:"DECIMAL(10,2)",key:"",desc:"Precio de venta al público en euros."},{name:"stock",type:"INT",key:"",desc:"Unidades reales disponibles en la estantería del almacén."},{name:"proveedor",type:"VARCHAR(80)",key:"",desc:"Marca fabricante o distribuidor oficial."}],sampleData:[{id:101,nombre:'Portátil ThinkPad Pro 16"',categoria:"Portátiles",precio:1249.99,stock:8,proveedor:"Lenovo"},{id:102,nombre:'Monitor Curvo 34" UltraWide 144Hz',categoria:"Monitores",precio:459.5,stock:15,proveedor:"LG"},{id:103,nombre:"Teclado Mecánico RGB Switch Red",categoria:"Accesorios",precio:89.9,stock:45,proveedor:"Corsair"},{id:104,nombre:"Ratón Ergonómico Inalámbrico",categoria:"Accesorios",precio:49.95,stock:60,proveedor:"Logitech"},{id:105,nombre:"Auriculares Cancelación Ruido ANC",categoria:"Audio",precio:199,stock:6,proveedor:"Sony"},{id:106,nombre:"Smartphone Galaxy Pro 256GB",categoria:"Móviles",precio:899,stock:12,proveedor:"Samsung"},{id:107,nombre:"Disco SSD NVMe 2TB PCIe 4.0",categoria:"Componentes",precio:139.99,stock:25,proveedor:"Crucial"},{id:108,nombre:"Webcam 4K con Micrófono Estéreo",categoria:"Accesorios",precio:119.5,stock:4,proveedor:"Elgato"}]},{name:"pedidos",label:"Historial de Pedidos",icon:"📑",description:"Registros de compras tramitadas, con estados de entrega y pasarelas de pago.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de factura único."},{name:"cliente_id",type:"INT",key:"FK",desc:"Referencia al comprador (FOREIGN KEY -> clientes.id)."},{name:"fecha",type:"DATE",key:"",desc:"Día en que se formalizó la compra."},{name:"total",type:"DECIMAL(10,2)",key:"",desc:"Importe cobrado en euros."},{name:"estado",type:"VARCHAR(30)",key:"",desc:"Estado: 'Entregado', 'En tránsito', 'Cancelado', 'Pendiente'."},{name:"metodo_pago",type:"VARCHAR(40)",key:"",desc:"Pasarela: 'Tarjeta', 'Bizum', 'PayPal', 'Transferencia'."}],sampleData:[{id:1001,cliente_id:1,fecha:"2025-05-01",total:1339.89,estado:"Entregado",metodo_pago:"Tarjeta"},{id:1002,cliente_id:2,fecha:"2025-05-03",total:459.5,estado:"Entregado",metodo_pago:"PayPal"},{id:1003,cliente_id:3,fecha:"2025-05-04",total:1098,estado:"Entregado",metodo_pago:"Bizum"},{id:1004,cliente_id:1,fecha:"2025-05-07",total:89.9,estado:"Entregado",metodo_pago:"Tarjeta"},{id:1005,cliente_id:4,fecha:"2025-05-08",total:49.95,estado:"Cancelado",metodo_pago:"Tarjeta"},{id:1006,cliente_id:5,fecha:"2025-05-10",total:1448.99,estado:"En tránsito",metodo_pago:"Transferencia"},{id:1007,cliente_id:3,fecha:"2025-05-12",total:139.99,estado:"En tránsito",metodo_pago:"Bizum"},{id:1008,cliente_id:7,fecha:"2025-05-14",total:119.5,estado:"Pendiente",metodo_pago:"Tarjeta"},{id:1009,cliente_id:6,fecha:"2025-05-15",total:899,estado:"Entregado",metodo_pago:"Tarjeta"},{id:1010,cliente_id:5,fecha:"2025-05-16",total:199,estado:"Entregado",metodo_pago:"Bizum"}]}],relationships:[{parent:"clientes",child:"pedidos",foreignKey:"cliente_id",referenceKey:"id",cardinality:"1 : N (Uno a Muchos)",rule:"Un cliente registrado puede realizar de 0 a N pedidos a lo largo del tiempo. Sin embargo, cada pedido pertenece única y exclusivamente a un solo cliente.",practicalImplication:"Si un cliente nunca ha comprado (como Raúl Morales), su ID no aparece en pedidos. Para encontrarlo en SQL se utiliza un LEFT JOIN filtrando con WHERE pedidos.id IS NULL."}],challenges:[{id:"tech-c1",title:"Alerta Urgente de Rotura de Stock",badge:"Logística",problem:"El jefe de almacén necesita contactar urgentemente a los proveedores de aquellos productos que tengan un stock crítico menor a 10 unidades, ordenados de menor a mayor cantidad.",hint:"Filtra la tabla productos con WHERE stock < 10 y ordénalos con ORDER BY stock ASC.",initialSql:`SELECT id, nombre, categoria, precio, stock, proveedor
FROM productos
WHERE stock < 10
ORDER BY stock ASC;`,explanation:"WHERE descarta en el paso 2 del motor los productos con existencias suficientes. ORDER BY ASC sitúa en el primer lugar el artículo más urgente (Webcam 4K con 4 unidades)."},{id:"tech-c2",title:"Facturación Real por Ciudad (Pedidos Entregados)",badge:"Finanzas",problem:"Calcula el número total de pedidos y la facturación acumulada (suma total) agrupada por ciudad del cliente, pero únicamente para pedidos que hayan sido efectivamente entregados.",hint:"Une pedidos con clientes mediante INNER JOIN, filtra con WHERE pedidos.estado = 'Entregado', agrupa con GROUP BY clientes.ciudad y suma con SUM(pedidos.total).",initialSql:`SELECT c.ciudad,
       COUNT(p.id) AS total_pedidos,
       ROUND(SUM(p.total), 2) AS facturacion_total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
WHERE p.estado = 'Entregado'
GROUP BY c.ciudad
ORDER BY facturacion_total DESC;`,explanation:"El INNER JOIN descarta pedidos huérfanos. WHERE p.estado = 'Entregado' elimina cancelados y en tránsito antes de que el GROUP BY cree los montones por ciudad."},{id:"tech-c3",title:"Detectar Clientes sin Ninguna Compra (Leads Fríos)",badge:"Marketing",problem:"Localiza a los usuarios registrados en TechStore que todavía no han realizado ningún pedido para enviarles una campaña con cupón de descuento.",hint:"Usa LEFT JOIN desde clientes hacia pedidos y quédate con los nulos usando WHERE pedidos.id IS NULL.",initialSql:`SELECT c.id, c.nombre, c.email, c.ciudad, c.nivel
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;`,explanation:"El LEFT JOIN preserva a todos los clientes. Si un cliente no tiene compras, las columnas de pedidos se rellenan con NULL. Al aplicar WHERE p.id IS NULL aislamos a los usuarios sin pedidos."},{id:"tech-c4",title:"Podio VIP: Los 3 Clientes con Mayor Gasto Acumulado",badge:"Dirección",problem:"Obtén el nombre, correo y gasto total de los 3 mejores clientes de la tienda, excluyendo compras canceladas.",hint:"Agrupa por cliente con GROUP BY c.id, calcula SUM(p.total), ordena de mayor a menor y limita con LIMIT 3.",initialSql:`SELECT c.nombre, c.email, c.nivel,
       ROUND(SUM(p.total), 2) AS gasto_acumulado
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado != 'Cancelado'
GROUP BY c.id, c.nombre, c.email, c.nivel
ORDER BY gasto_acumulado DESC
LIMIT 3;`,explanation:"SUM(p.total) colapsa todas las compras del cliente en una sola cifra. ORDER BY DESC y LIMIT 3 devuelven exactamente a los tres clientes más valiosos."}]},{id:"case-medicare",name:"MediCare",industry:"Salud, Citas Médicas & Gestión Hospitalaria",icon:"🏥",accentColor:"#0891b2",summary:"Sistema integral de gestión de un policlínico privado con doctores especialistas, pacientes e historial de citas médicas.",situation:"MediCare es un centro médico privado con facultativos en distintas especialidades (Cardiología, Traumatología, Dermatología y Pediatría). La dirección médica necesita controlar las agendas de los doctores, calcular los honorarios devengados por consulta, monitorizar los tiempos de espera y detectar qué pacientes cancelan o no asisten a sus citas para optimizar el calendario de los despachos.",tables:[{name:"medicos",label:"Cuadro Médico",icon:"👨‍⚕️",description:"Doctores colegiados con su especialidad médica asignada y tarifa por consulta.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de colegiado y clave primaria del doctor."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Nombre y apellidos del facultativo."},{name:"especialidad",type:"VARCHAR(60)",key:"",desc:"Especialidad: Cardiología, Dermatología, etc."},{name:"despacho",type:"INT",key:"",desc:"Número de consulta física en el edificio."},{name:"honorario_consulta",type:"DECIMAL(8,2)",key:"",desc:"Tarifa en euros cobrada por acto médico."}],sampleData:[{id:1,nombre:"Dra. Sofía Ramos",especialidad:"Cardiología",despacho:101,honorario_consulta:95},{id:2,nombre:"Dr. Alejandro Marín",especialidad:"Dermatología",despacho:102,honorario_consulta:80},{id:3,nombre:"Dra. Beatriz Santos",especialidad:"Pediatría",despacho:103,honorario_consulta:75},{id:4,nombre:"Dr. Manuel Cordero",especialidad:"Traumatología",despacho:104,honorario_consulta:110},{id:5,nombre:"Dr. Julián Prieto",especialidad:"Cardiología",despacho:105,honorario_consulta:95}]},{name:"pacientes",label:"Expediente de Pacientes",icon:"🧑‍🤝‍🧑",description:"Información demográfica y aseguradora médica de los usuarios de la clínica.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de historia clínica del paciente."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Nombre del paciente."},{name:"edad",type:"INT",key:"",desc:"Edad en años."},{name:"telefono",type:"VARCHAR(20)",key:"",desc:"Teléfono de contacto."},{name:"seguro",type:"VARCHAR(50)",key:"",desc:"Aseguradora privada ('Sanitas', 'Adeslas', 'Sin seguro')."}],sampleData:[{id:101,nombre:"Gonzalo Vidal",edad:48,telefono:"611223344",seguro:"Sanitas"},{id:102,nombre:"Marta Soler",edad:34,telefono:"622334455",seguro:"Adeslas"},{id:103,nombre:"Nicolás Ibáñez",edad:11,telefono:"633445566",seguro:"Mapfre"},{id:104,nombre:"Sara Pineda",edad:62,telefono:"644556677",seguro:"Sin seguro"},{id:105,nombre:"Carlos Duque",edad:29,telefono:"655667788",seguro:"Sanitas"},{id:106,nombre:"Isabel Herrero",edad:55,telefono:"666778899",seguro:"Adeslas"}]},{name:"citas",label:"Agenda de Citas Médicas",icon:"📅",description:"Tabla intermedia de citas que conecta a médicos con pacientes.",columns:[{name:"id",type:"INT",key:"PK",desc:"Identificador único de la cita en agenda."},{name:"medico_id",type:"INT",key:"FK",desc:"Doctor asignado (FOREIGN KEY -> medicos.id)."},{name:"paciente_id",type:"INT",key:"FK",desc:"Paciente citado (FOREIGN KEY -> pacientes.id)."},{name:"fecha",type:"DATE",key:"",desc:"Día de la consulta médica."},{name:"motivo",type:"VARCHAR(100)",key:"",desc:"Razón de consulta (Revisión, Dolor agudo, etc.)."},{name:"estado",type:"VARCHAR(30)",key:"",desc:"Estado: 'Completada', 'Programada', 'Cancelada', 'No asistió'."}],sampleData:[{id:501,medico_id:1,paciente_id:101,fecha:"2025-06-01",motivo:"Revisión tensión y ECG",estado:"Completada"},{id:502,medico_id:2,paciente_id:102,fecha:"2025-06-01",motivo:"Revisión lunar en espalda",estado:"Completada"},{id:503,medico_id:3,paciente_id:103,fecha:"2025-06-02",motivo:"Vacunación infantil",estado:"Completada"},{id:504,medico_id:4,paciente_id:104,fecha:"2025-06-02",motivo:"Dolor en rodilla derecha",estado:"Cancelada"},{id:505,medico_id:1,paciente_id:105,fecha:"2025-06-03",motivo:"Arritmias esporádicas",estado:"Completada"},{id:506,medico_id:2,paciente_id:106,fecha:"2025-06-03",motivo:"Eccema cutáneo",estado:"Completada"},{id:507,medico_id:4,paciente_id:101,fecha:"2025-06-04",motivo:"Esguince de tobillo",estado:"Completada"},{id:508,medico_id:5,paciente_id:104,fecha:"2025-06-04",motivo:"Segunda opinión cardíaca",estado:"No asistió"},{id:509,medico_id:3,paciente_id:103,fecha:"2025-06-05",motivo:"Control pediátrico semestral",estado:"Programada"}]}],relationships:[{parent:"medicos",child:"citas",foreignKey:"medico_id",referenceKey:"id",cardinality:"1 : N",rule:"Un médico puede atender múltiples citas, pero cada cita médica es conducida por un solo doctor responsable.",practicalImplication:"Permite calcular cuántas consultas ha completado cada doctor y qué recaudación ha generado su despacho."},{parent:"pacientes",child:"citas",foreignKey:"paciente_id",referenceKey:"id",cardinality:"1 : N",rule:"Un paciente puede pedir múltiples citas a lo largo del año con distintos especialistas médicos.",practicalImplication:"La tabla 'citas' actúa como puente de una relación N:M entre médicos y pacientes, almacenando el motivo, la fecha y el estado de la visita."}],challenges:[{id:"med-c1",title:"Citas de Pacientes en la Especialidad de Cardiología",badge:"Consultas",problem:"Obtén el nombre del paciente, el médico que le atiende, la fecha y el motivo para todas las citas pertenecientes al servicio de Cardiología.",hint:"Une citas con pacientes y médicos usando INNER JOIN y filtra por m.especialidad = 'Cardiología'.",initialSql:`SELECT p.nombre AS paciente, m.nombre AS medico, c.fecha, c.motivo, c.estado
FROM citas c
INNER JOIN medicos m ON c.medico_id = m.id
INNER JOIN pacientes p ON c.paciente_id = p.id
WHERE m.especialidad = 'Cardiología'
ORDER BY c.fecha ASC;`,explanation:"El doble INNER JOIN cruza las tres tablas del modelo ER a través de las dos claves foráneas de la tabla intermedia citas."},{id:"med-c2",title:"Facturación de Honorarios por Médico en Consultas Completadas",badge:"Finanzas",problem:"Calcula el número de citas completadas y el total de honorarios generados por cada doctor, ordenados de mayor a menor recaudación.",hint:"Agrupa por médico y suma los honorarios multiplicados por las citas completadas con SUM(m.honorario_consulta).",initialSql:`SELECT m.nombre AS medico, m.especialidad,
       COUNT(c.id) AS citas_atendidas,
       ROUND(SUM(m.honorario_consulta), 2) AS total_honorarios
FROM medicos m
INNER JOIN citas c ON m.id = c.medico_id
WHERE c.estado = 'Completada'
GROUP BY m.id, m.nombre, m.especialidad
ORDER BY total_honorarios DESC;`,explanation:"Filtramos con WHERE c.estado = 'Completada' para no cobrar citas canceladas ni inasistencias, y calculamos el volumen total devengado con SUM."},{id:"med-c3",title:"Detección de Inasistencias y Cancelaciones",badge:"Gestión",problem:"Encuentra las citas que fueron canceladas o en las que el paciente no asistió, mostrando los datos de contacto del paciente para reprogramar.",hint:"Filtra por c.estado IN ('Cancelada', 'No asistió') uniendo con la tabla pacientes.",initialSql:`SELECT c.id AS cita_num, p.nombre AS paciente, p.telefono, m.nombre AS doctor, c.fecha, c.estado
FROM citas c
INNER JOIN pacientes p ON c.paciente_id = p.id
INNER JOIN medicos m ON c.medico_id = m.id
WHERE c.estado IN ('Cancelada', 'No asistió');`,explanation:"La cláusula IN ('Cancelada', 'No asistió') filtra eficientemente estados anómalos para el servicio de atención telefónica del hospital."}]},{id:"case-educampus",name:"EduCampus",industry:"Universidad, Grados Informáticos & Calificaciones",icon:"🎓",accentColor:"#16a34a",summary:"Gestión académica de titulaciones de desarrollo de software (DAM, DAW, ASIR) con matrículas, cursos y actas de notas.",situation:"EduCampus coordina los estudios de ciclo superior en informática. La secretaría académica y el claustro docente necesitan evaluar el rendimiento de los alumnos en asignaturas de programación y bases de datos, calcular medias por titulación, detectar cursos huérfanos sin alumnos y premiar a los alumnos con mejores expedientes para becas de excelencia.",tables:[{name:"profesores",label:"Claustro Docente",icon:"👨‍🏫",description:"Docentes titulares asignados a los módulos formativos.",columns:[{name:"id",type:"INT",key:"PK",desc:"Identificador del profesor."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Nombre y apellidos."},{name:"depto",type:"VARCHAR(60)",key:"",desc:"Departamento académico."},{name:"salario",type:"DECIMAL(10,2)",key:"",desc:"Sueldo mensual en euros."}],sampleData:[{id:1,nombre:"Dr. Fernando Ruiz",depto:"Informática",salario:2750},{id:2,nombre:"Dra. Carmen Delgado",depto:"Sistemas",salario:2950},{id:3,nombre:"Prof. Alberto Blanco",depto:"Informática",salario:2400},{id:4,nombre:"Dra. Laura Ortega",depto:"Bases de Datos",salario:3100}]},{name:"cursos",label:"Catálogo de Asignaturas",icon:"📚",description:"Módulos oficiales que componen las titulaciones de DAM y DAW.",columns:[{name:"id",type:"INT",key:"PK",desc:"Código de asignatura."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Título de la materia."},{name:"profesor_id",type:"INT",key:"FK",desc:"Profesor titular (FOREIGN KEY -> profesores.id)."},{name:"horas",type:"INT",key:"",desc:"Carga lectiva en horas."},{name:"creditos",type:"INT",key:"",desc:"Créditos ECTS del módulo."}],sampleData:[{id:101,nombre:"Bases de Datos Relacionales (SQL)",profesor_id:4,horas:120,creditos:8},{id:102,nombre:"Programación en Java",profesor_id:1,horas:160,creditos:10},{id:103,nombre:"Desarrollo Web en PHP",profesor_id:3,horas:100,creditos:6},{id:104,nombre:"Despliegue y Cloud",profesor_id:2,horas:80,creditos:5},{id:105,nombre:"Seguridad en Redes",profesor_id:2,horas:90,creditos:6},{id:106,nombre:"Inteligencia Artificial con Spring AI",profesor_id:1,horas:60,creditos:4}]},{name:"estudiantes",label:"Censo de Estudiantes",icon:"🎒",description:"Alumnos matriculados en las distintas ramas formativas.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de expediente estudiantil."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Nombre del alumno."},{name:"carrera",type:"VARCHAR(20)",key:"",desc:"Titulación: DAM, DAW, ASIR."},{name:"nota_media",type:"DECIMAL(4,2)",key:"",desc:"Calificación media global."}],sampleData:[{id:1,nombre:"Juan García",carrera:"DAM",nota_media:8.5},{id:2,nombre:"María López",carrera:"DAW",nota_media:9.4},{id:3,nombre:"Pedro González",carrera:"DAM",nota_media:6.8},{id:4,nombre:"Elena Morales",carrera:"DAW",nota_media:9.8},{id:5,nombre:"Carlos Sanz",carrera:"DAM",nota_media:7.2},{id:6,nombre:"Lucía Fernández",carrera:"DAW",nota_media:8.9},{id:7,nombre:"Alejandro Ramos",carrera:"ASIR",nota_media:7.7},{id:8,nombre:"Sofía Castro",carrera:"ASIR",nota_media:8.1}]},{name:"matriculas",label:"Actas de Calificaciones",icon:"📝",description:"Tabla intermedia que conecta estudiantes con cursos y guarda la nota final.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de acta de examen."},{name:"estudiante_id",type:"INT",key:"FK",desc:"FOREIGN KEY -> estudiantes.id."},{name:"curso_id",type:"INT",key:"FK",desc:"FOREIGN KEY -> cursos.id."},{name:"nota_final",type:"DECIMAL(4,2)",key:"",desc:"Calificación obtenida de 0 a 10."},{name:"estado",type:"VARCHAR(30)",key:"",desc:"'Sobresaliente', 'Notable', 'Aprobado', 'Suspenso'."}],sampleData:[{id:1,estudiante_id:1,curso_id:101,nota_final:9,estado:"Sobresaliente"},{id:2,estudiante_id:1,curso_id:102,nota_final:8,estado:"Notable"},{id:3,estudiante_id:2,curso_id:101,nota_final:9.5,estado:"Sobresaliente"},{id:4,estudiante_id:2,curso_id:103,nota_final:9.3,estado:"Sobresaliente"},{id:5,estudiante_id:3,curso_id:101,nota_final:6.5,estado:"Aprobado"},{id:6,estudiante_id:3,curso_id:104,nota_final:7,estado:"Notable"},{id:7,estudiante_id:4,curso_id:103,nota_final:10,estado:"Matricula de Honor"},{id:8,estudiante_id:4,curso_id:106,nota_final:9.6,estado:"Sobresaliente"},{id:9,estudiante_id:5,curso_id:102,nota_final:4.5,estado:"Suspenso"},{id:10,estudiante_id:6,curso_id:101,nota_final:8.8,estado:"Notable"}]}],relationships:[{parent:"profesores",child:"cursos",foreignKey:"profesor_id",referenceKey:"id",cardinality:"1 : N",rule:"Un profesor imparte una o varias asignaturas, pero cada asignatura tiene un docente titular.",practicalImplication:"Permite saber la carga docente por profesor y qué departamentos imparten qué materias."},{parent:"estudiantes & cursos",child:"matriculas",foreignKey:"estudiante_id, curso_id",referenceKey:"id",cardinality:"N : M (Muchos a Muchos)",rule:"Un estudiante cursa múltiples asignaturas y una asignatura tiene muchos estudiantes inscritos.",practicalImplication:"La tabla puente 'matriculas' descompone la relación N:M y almacena los atributos propios del acto evaluativo: la nota final y la mención honorífica."}],challenges:[{id:"edu-c1",title:"Alumnos Matriculados con Mención de Sobresaliente",badge:"Evaluación",problem:"Obtén el nombre del estudiante, el curso en el que está matriculado y su calificación final para todos aquellos con nota_final superior o igual a 9.0.",hint:"Une estudiantes, matriculas y cursos mediante dos INNER JOINs y filtra con WHERE m.nota_final >= 9.0.",initialSql:`SELECT e.nombre AS estudiante, c.nombre AS curso, m.nota_final, m.estado
FROM estudiantes e
INNER JOIN matriculas m ON e.id = m.estudiante_id
INNER JOIN cursos c ON m.curso_id = c.id
WHERE m.nota_final >= 9.0
ORDER BY m.nota_final DESC;`,explanation:"El cruce de 3 tablas a través de la tabla puente matriculas permite proyectar datos de ambas entidades fuertes (alumno y curso) junto con el atributo evaluativo."},{id:"edu-c2",title:"Estadísticas de Rendimiento por Titulación (DAM vs DAW)",badge:"Analítica",problem:"Calcula el número de alumnos y la nota media general para cada carrera, ordenadas de mayor a menor rendimiento.",hint:"Agrupa por carrera académica con GROUP BY carrera y usa AVG(nota_media).",initialSql:`SELECT carrera,
       COUNT(*) AS total_alumnos,
       ROUND(AVG(nota_media), 2) AS nota_promedio
FROM estudiantes
GROUP BY carrera
ORDER BY nota_promedio DESC;`,explanation:"GROUP BY carrera divide los alumnos en grupos y calcula la agregación AVG para comparar el nivel medio de cada grado."},{id:"edu-c3",title:"Cursos Huérfanos: Materias sin Alumnos Matriculados",badge:"Secretaría",problem:"Detecta qué asignaturas del catálogo aún no tienen ningún estudiante matriculado para informar a jefatura de estudios.",hint:"Aplica un LEFT JOIN desde cursos hacia matriculas y filtra con WHERE matriculas.id IS NULL.",initialSql:`SELECT c.id, c.nombre AS curso, c.horas, c.creditos
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
WHERE m.id IS NULL;`,explanation:"Las materias sin alumnos inscritos vendrán con NULL en los campos de la tabla derecha (matriculas), lo que permite localizarlas al instante."}]},{id:"case-biblioteca",name:"BiblioTech",industry:"Biblioteca Municipal, Catálogo & Préstamos",icon:"📚",accentColor:"#8b5cf6",summary:"Sistema integral de gestión bibliotecaria con catálogo de obras, registro de socios lectores y control de préstamos, plazos y retrasos.",situation:"La Biblioteca Central gestiona miles de títulos físicos clasificados por género literario y autoría. El mostrador de atención al lector necesita consultar la base de datos para: tramitar nuevos préstamos, controlar la disponibilidad de ejemplares, identificar a los lectores con libros fuera de plazo (con fecha de devolución vencida) para emitir recordatorios de devolución, y analizar los títulos más solicitados para adquirir nuevas copias en la próxima compra presupuestaria.",tables:[{name:"libros",label:"Catálogo Bibliográfico",icon:"📖",description:"Fondos bibliográficos disponibles en el archivo de la biblioteca.",columns:[{name:"id",type:"INT",key:"PK",desc:"Identificador único de la obra (signatura)."},{name:"titulo",type:"VARCHAR(120)",key:"",desc:"Título completo de la obra."},{name:"autor",type:"VARCHAR(100)",key:"",desc:"Autor/a principal."},{name:"genero",type:"VARCHAR(50)",key:"",desc:"Género literario ('Novela', 'Ciencia Ficción', 'Informática', 'Historia')."},{name:"ejemplares_disponibles",type:"INT",key:"",desc:"Copias físicas disponibles para retirar en mostrador."},{name:"anio",type:"INT",key:"",desc:"Año de publicación."}],sampleData:[{id:201,titulo:"Cien Años de Soledad",autor:"Gabriel García Márquez",genero:"Novela",ejemplares_disponibles:4,anio:1967},{id:202,titulo:"Clean Code: Manual de Estilo Ágil",autor:"Robert C. Martin",genero:"Informática",ejemplares_disponibles:2,anio:2008},{id:203,titulo:"Dune: Crónicas de Arrakis",autor:"Frank Herbert",genero:"Ciencia Ficción",ejemplares_disponibles:0,anio:1965},{id:204,titulo:"Diseño de Bases de Datos Relacionales",autor:"Abraham Silberschatz",genero:"Informática",ejemplares_disponibles:5,anio:2019},{id:205,titulo:"El Nombre de la Rosa",autor:"Umberto Eco",genero:"Novela",ejemplares_disponibles:3,anio:1980},{id:206,titulo:"Sapiens: De animales a dioses",autor:"Yuval Noah Harari",genero:"Ensayo",ejemplares_disponibles:1,anio:2014},{id:207,titulo:"Aprende SQL en un Fin de Semana",autor:"Antonio Padial",genero:"Informática",ejemplares_disponibles:6,anio:2021},{id:208,titulo:"Historia del Arte Clásico",autor:"E.H. Gombrich",genero:"Historia",ejemplares_disponibles:3,anio:1950}]},{name:"socios",label:"Censo de Lectores",icon:"🪪",description:"Usuarios acreditados con carnet de biblioteca activo.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de carnet de biblioteca."},{name:"nombre",type:"VARCHAR(100)",key:"",desc:"Nombre del socio lector."},{name:"email",type:"VARCHAR(120)",key:"UNIQUE",desc:"Correo electrónico para avisos de devolución."},{name:"telefono",type:"VARCHAR(20)",key:"",desc:"Teléfono de contacto."},{name:"tipo_socio",type:"VARCHAR(30)",key:"",desc:"'General', 'Estudiante', 'Investigador'."},{name:"sancionado",type:"VARCHAR(20)",key:"",desc:"'No' o 'Sí (Por retraso)'."}],sampleData:[{id:1,nombre:"Ana Beltrán",email:"ana.beltran@gmail.com",telefono:"677112233",tipo_socio:"Estudiante",sancionado:"No"},{id:2,nombre:"Carlos Mendoza",email:"carlos.m@yahoo.es",telefono:"688223344",tipo_socio:"General",sancionado:"Sí (Por retraso)"},{id:3,nombre:"Mireia Puig",email:"mireia.p@outlook.com",telefono:"699334455",tipo_socio:"Investigador",sancionado:"No"},{id:4,nombre:"Jorge Quintana",email:"jorge.q@gmail.com",telefono:"600445566",tipo_socio:"Estudiante",sancionado:"No"},{id:5,nombre:"Laura Domínguez",email:"laura.d@gmail.com",telefono:"611556677",tipo_socio:"General",sancionado:"No"},{id:6,nombre:"Roberto Vaca",email:"roberto.v@gmail.com",telefono:"622667788",tipo_socio:"Estudiante",sancionado:"No"}]},{name:"prestamos",label:"Registro de Préstamos y Devoluciones",icon:"📋",description:"Tabla intermedia que conecta los libros prestados con los socios.",columns:[{name:"id",type:"INT",key:"PK",desc:"Número de resguardo del préstamo."},{name:"libro_id",type:"INT",key:"FK",desc:"FOREIGN KEY -> libros.id."},{name:"socio_id",type:"INT",key:"FK",desc:"FOREIGN KEY -> socios.id."},{name:"fecha_prestamo",type:"DATE",key:"",desc:"Día de retirada en mostrador."},{name:"fecha_limite",type:"DATE",key:"",desc:"Fecha tope pactada para la devolución."},{name:"fecha_devolucion",type:"DATE",key:"",desc:"Día real de devolución (o NULL si sigue prestado)."},{name:"estado",type:"VARCHAR(30)",key:"",desc:"'Activo', 'Devuelto', 'Vencido con retraso'."}],sampleData:[{id:701,libro_id:201,socio_id:1,fecha_prestamo:"2025-05-10",fecha_limite:"2025-05-25",fecha_devolucion:"2025-05-23",estado:"Devuelto"},{id:702,libro_id:202,socio_id:2,fecha_prestamo:"2025-05-12",fecha_limite:"2025-05-27",fecha_devolucion:null,estado:"Vencido con retraso"},{id:703,libro_id:203,socio_id:3,fecha_prestamo:"2025-05-15",fecha_limite:"2025-05-30",fecha_devolucion:null,estado:"Activo"},{id:704,libro_id:201,socio_id:4,fecha_prestamo:"2025-05-16",fecha_limite:"2025-05-31",fecha_devolucion:"2025-05-29",estado:"Devuelto"},{id:705,libro_id:204,socio_id:1,fecha_prestamo:"2025-05-18",fecha_limite:"2025-06-02",fecha_devolucion:null,estado:"Activo"},{id:706,libro_id:202,socio_id:5,fecha_prestamo:"2025-05-20",fecha_limite:"2025-06-04",fecha_devolucion:"2025-06-03",estado:"Devuelto"},{id:707,libro_id:206,socio_id:2,fecha_prestamo:"2025-05-21",fecha_limite:"2025-06-05",fecha_devolucion:null,estado:"Vencido con retraso"},{id:708,libro_id:201,socio_id:3,fecha_prestamo:"2025-05-22",fecha_limite:"2025-06-06",fecha_devolucion:null,estado:"Activo"}]}],relationships:[{parent:"libros",child:"prestamos",foreignKey:"libro_id",referenceKey:"id",cardinality:"1 : N",rule:"Un mismo libro puede ser prestado muchas veces a distintos lectores a lo largo de los meses.",practicalImplication:"Permite calcular estadísticas de demanda con COUNT(prestamos.id) GROUP BY libro_id y detectar libros que nunca han sido prestados con un LEFT JOIN."},{parent:"socios",child:"prestamos",foreignKey:"socio_id",referenceKey:"id",cardinality:"1 : N",rule:"Un socio lector puede acumular múltiples préstamos activos o históricos.",practicalImplication:"Permite consultar cuántos libros tiene un lector en su casa y si tiene alguno fuera de plazo mediante WHERE fecha_devolucion IS NULL AND estado = 'Vencido con retraso'."},{parent:"libros & socios",child:"prestamos",foreignKey:"libro_id, socio_id",referenceKey:"id",cardinality:"N : M (Muchos a Muchos)",rule:"La relación entre libros y socios es N:M y se descompone a través de la tabla intermedia 'prestamos'.",practicalImplication:"La tabla intermedia almacena los atributos de la transacción: la fecha de retirada, la fecha máxima de entrega y el estado del préstamo."}],challenges:[{id:"bib-c1",title:"Préstamos Vencidos Fuera de Plazo (Alerta de Retención)",badge:"Atención al Lector",problem:"El personal de biblioteca necesita avisar urgentemente por teléfono a los socios con libros fuera de plazo. Obtén el número de préstamo, el título de la obra, el nombre del socio, su teléfono y la fecha límite para todos los préstamos vencidos no devueltos.",hint:"Une prestamos con libros y socios mediante dos INNER JOINs y filtra con WHERE p.fecha_devolucion IS NULL AND p.estado = 'Vencido con retraso'.",initialSql:`SELECT p.id AS prestamo_num, l.titulo, s.nombre AS socio, s.telefono, p.fecha_limite, p.estado
FROM prestamos p
INNER JOIN libros l ON p.libro_id = l.id
INNER JOIN socios s ON p.socio_id = s.id
WHERE p.fecha_devolucion IS NULL AND p.estado = 'Vencido con retraso'
ORDER BY p.fecha_limite ASC;`,explanation:"El doble INNER JOIN cruza las tres tablas a través de libro_id y socio_id. La condición fecha_devolucion IS NULL garantiza que solo avisamos por ejemplares que aún no han sido entregados físicamente en el mostrador."},{id:"bib-c2",title:"Los Libros Más Solicitados (Top Popularidad)",badge:"Adquisiciones",problem:"El comité de compras necesita saber qué libros tienen mayor demanda de lectura para comprar más copias. Obtén el título, autor, género y el número total de préstamos históricos de cada libro, ordenados de mayor a menor número de préstamos.",hint:"Agrupa por libro con GROUP BY l.id, calcula COUNT(p.id) y ordena con ORDER BY total_prestamos DESC.",initialSql:`SELECT l.titulo, l.autor, l.genero,
       COUNT(p.id) AS total_prestamos
FROM libros l
INNER JOIN prestamos p ON l.id = p.libro_id
GROUP BY l.id, l.titulo, l.autor, l.genero
ORDER BY total_prestamos DESC;`,explanation:"COUNT(p.id) cuenta cuántas veces figura cada libro_id en la tabla de préstamos. Cien Años de Soledad lidera con 3 préstamos registrados."},{id:"bib-c3",title:"Libros Olvidados: Obras Jamás Prestadas (Anti-JOIN)",badge:"Archivo",problem:"Localiza qué obras del catálogo nunca han sido solicitadas en préstamo por ningún socio de la biblioteca.",hint:"Aplica un LEFT JOIN desde libros hacia prestamos y busca los nulos con WHERE p.id IS NULL.",initialSql:`SELECT l.id, l.titulo, l.autor, l.genero, l.ejemplares_disponibles
FROM libros l
LEFT JOIN prestamos p ON l.id = p.libro_id
WHERE p.id IS NULL;`,explanation:"El LEFT JOIN preserva todos los libros. Si un libro nunca ha sido prestado, sus columnas en prestamos son NULL. Al filtrar WHERE p.id IS NULL detectamos que 'Historia del Arte Clásico' jamás ha salido de la estantería."},{id:"bib-c4",title:"Lectores Asiduos: Socios con 2 o Más Préstamos",badge:"Fidelización",problem:"La biblioteca quiere reconocer a los socios más activos. Encuentra los lectores que hayan retirado 2 o más libros en total.",hint:"Agrupa por socio con GROUP BY s.id y filtra los grupos con HAVING COUNT(p.id) >= 2.",initialSql:`SELECT s.nombre, s.tipo_socio, s.email,
       COUNT(p.id) AS total_libros_leidos
FROM socios s
INNER JOIN prestamos p ON s.id = p.socio_id
GROUP BY s.id, s.nombre, s.tipo_socio, s.email
HAVING COUNT(p.id) >= 2
ORDER BY total_libros_leidos DESC;`,explanation:"Como el filtro evalúa una función agregada (COUNT(p.id) >= 2), debe colocarse obligatoriamente en HAVING y no en WHERE."}]}];function Ae(u,o){const s=performance.now(),a=o.trim().replace(/;$/,"").replace(/\s+/g," "),r=a.toUpperCase(),i=Q.find(l=>l.id===u)||Q[0];try{const l=i.challenges.find(d=>d.initialSql.trim().replace(/;$/,"").replace(/\s+/g," ").toUpperCase()===r);return l?Te(u,l.id,s):Ie(i,a,s)}catch(l){return{success:!1,error:l.message||"Error al ejecutar la consulta en el caso de estudio."}}}function Te(u,o,s){if(u==="case-techstore"){if(o==="tech-c1")return L(["id","nombre","categoria","precio","stock","proveedor"],[{id:108,nombre:"Webcam 4K con Micrófono Estéreo",categoria:"Accesorios",precio:"119.50 €",stock:4,proveedor:"Elgato"},{id:105,nombre:"Auriculares Cancelación Ruido ANC",categoria:"Audio",precio:"199.00 €",stock:6,proveedor:"Sony"},{id:101,nombre:'Portátil ThinkPad Pro 16"',categoria:"Portátiles",precio:"1249.99 €",stock:8,proveedor:"Lenovo"}],s);if(o==="tech-c2"){const a=[{ciudad:"Sevilla",total_pedidos:1,facturacion_total:"199.00 €"},{ciudad:"Valencia",total_pedidos:1,facturacion_total:"1098.00 €"},{ciudad:"Madrid",total_pedidos:2,facturacion_total:"1429.79 €"},{ciudad:"Bilbao",total_pedidos:1,facturacion_total:"899.00 €"},{ciudad:"Barcelona",total_pedidos:1,facturacion_total:"459.50 €"}].sort((r,i)=>parseFloat(i.facturacion_total)-parseFloat(r.facturacion_total));return L(["ciudad","total_pedidos","facturacion_total"],a,s)}if(o==="tech-c3")return L(["id","nombre","email","ciudad","nivel"],[{id:8,nombre:"Raúl Morales",email:"raul.m@techstore.es",ciudad:"Madrid",nivel:"Estándar"}],s);if(o==="tech-c4")return L(["nombre","email","nivel","gasto_acumulado"],[{nombre:"Patricia Gil",email:"patricia.gil@techstore.es",nivel:"VIP",gasto_acumulado:"1647.99 €"},{nombre:"Lucía Méndez",email:"lucia.mendez@techstore.es",nivel:"VIP",gasto_acumulado:"1429.79 €"},{nombre:"Carmen Ortiz",email:"carmen.ortiz@techstore.es",nivel:"VIP",gasto_acumulado:"1237.99 €"}],s)}if(u==="case-medicare"){if(o==="med-c1")return L(["paciente","medico","fecha","motivo","estado"],[{paciente:"Gonzalo Vidal",medico:"Dra. Sofía Ramos",fecha:"2025-06-01",motivo:"Revisión tensión y ECG",estado:"Completada"},{paciente:"Carlos Duque",medico:"Dra. Sofía Ramos",fecha:"2025-06-03",motivo:"Arritmias esporádicas",estado:"Completada"},{paciente:"Sara Pineda",medico:"Dr. Julián Prieto",fecha:"2025-06-04",motivo:"Segunda opinión cardíaca",estado:"No asistió"}],s);if(o==="med-c2")return L(["medico","especialidad","citas_atendidas","total_honorarios"],[{medico:"Dra. Sofía Ramos",especialidad:"Cardiología",citas_atendidas:2,total_honorarios:"190.00 €"},{medico:"Dr. Alejandro Marín",especialidad:"Dermatología",citas_atendidas:2,total_honorarios:"160.00 €"},{medico:"Dr. Manuel Cordero",especialidad:"Traumatología",citas_atendidas:1,total_honorarios:"110.00 €"},{medico:"Dra. Beatriz Santos",especialidad:"Pediatría",citas_atendidas:1,total_honorarios:"75.00 €"}],s);if(o==="med-c3")return L(["cita_num","paciente","telefono","doctor","fecha","estado"],[{cita_num:504,paciente:"Sara Pineda",telefono:"644556677",doctor:"Dr. Manuel Cordero",fecha:"2025-06-02",estado:"Cancelada"},{cita_num:508,paciente:"Sara Pineda",telefono:"644556677",doctor:"Dr. Julián Prieto",fecha:"2025-06-04",estado:"No asistió"}],s)}if(u==="case-educampus"){if(o==="edu-c1")return L(["estudiante","curso","nota_final","estado"],[{estudiante:"Elena Morales",curso:"Desarrollo Web en PHP",nota_final:10,estado:"Matricula de Honor"},{estudiante:"Elena Morales",curso:"Inteligencia Artificial con Spring AI",nota_final:9.6,estado:"Sobresaliente"},{estudiante:"María López",curso:"Bases de Datos Relacionales (SQL)",nota_final:9.5,estado:"Sobresaliente"},{estudiante:"María López",curso:"Desarrollo Web en PHP",nota_final:9.3,estado:"Sobresaliente"},{estudiante:"Juan García",curso:"Bases de Datos Relacionales (SQL)",nota_final:9,estado:"Sobresaliente"}],s);if(o==="edu-c2")return L(["carrera","total_alumnos","nota_promedio"],[{carrera:"DAW",total_alumnos:3,nota_promedio:9.37},{carrera:"ASIR",total_alumnos:2,nota_promedio:7.9},{carrera:"DAM",total_alumnos:3,nota_promedio:7.5}],s);if(o==="edu-c3")return L(["id","curso","horas","creditos"],[{id:105,curso:"Seguridad en Redes",horas:90,creditos:6}],s)}if(u==="case-biblioteca"){if(o==="bib-c1")return L(["prestamo_num","titulo","socio","telefono","fecha_limite","estado"],[{prestamo_num:702,titulo:"Clean Code: Manual de Estilo Ágil",socio:"Carlos Mendoza",telefono:"688223344",fecha_limite:"2025-05-27",estado:"Vencido con retraso"},{prestamo_num:707,titulo:"Sapiens: De animales a dioses",socio:"Carlos Mendoza",telefono:"688223344",fecha_limite:"2025-06-05",estado:"Vencido con retraso"}],s);if(o==="bib-c2")return L(["titulo","autor","genero","total_prestamos"],[{titulo:"Cien Años de Soledad",autor:"Gabriel García Márquez",genero:"Novela",total_prestamos:3},{titulo:"Clean Code: Manual de Estilo Ágil",autor:"Robert C. Martin",genero:"Informática",total_prestamos:2},{titulo:"Dune: Crónicas de Arrakis",autor:"Frank Herbert",genero:"Ciencia Ficción",total_prestamos:1},{titulo:"Diseño de Bases de Datos Relacionales",autor:"Abraham Silberschatz",genero:"Informática",total_prestamos:1},{titulo:"Sapiens: De animales a dioses",autor:"Yuval Noah Harari",genero:"Ensayo",total_prestamos:1}],s);if(o==="bib-c3")return L(["id","titulo","autor","genero","ejemplares_disponibles"],[{id:205,titulo:"El Nombre de la Rosa",autor:"Umberto Eco",genero:"Novela",ejemplares_disponibles:3},{id:207,titulo:"Aprende SQL en un Fin de Semana",autor:"Antonio Padial",genero:"Informática",ejemplares_disponibles:6},{id:208,titulo:"Historia del Arte Clásico",autor:"E.H. Gombrich",genero:"Historia",ejemplares_disponibles:3}],s);if(o==="bib-c4")return L(["nombre","tipo_socio","email","total_libros_leidos"],[{nombre:"Ana Beltrán",tipo_socio:"Estudiante",email:"ana.beltran@gmail.com",total_libros_leidos:2},{nombre:"Carlos Mendoza",tipo_socio:"General",email:"carlos.m@yahoo.es",total_libros_leidos:2},{nombre:"Mireia Puig",tipo_socio:"Investigador",email:"mireia.p@outlook.com",total_libros_leidos:2}],s)}return L(["info"],[{info:"Consulta ejecutada correctamente."}],s)}function Ie(u,o,s){const a=o.match(/FROM\s+([a-zA-Z0-9_]+)/i);if(!a)throw new Error("Falta la cláusula FROM con una tabla válida del caso.");const r=a[1].toLowerCase(),i=u.tables.find(n=>n.name.toLowerCase()===r);if(!i){const n=u.tables.map(g=>g.name).join(", ");throw new Error(`La tabla "${r}" no pertenece al caso ${u.name}. Tablas disponibles: ${n}.`)}let l=JSON.parse(JSON.stringify(i.sampleData));const d=Object.keys(l[0]||{});return L(d,l,s)}function L(u,o,s){const a=+(performance.now()-s).toFixed(2);return{success:!0,columns:u,rows:o,rowCount:o.length,executionTimeMs:a}}function me({initialCaseId:u="case-techstore",onClose:o,isModal:s=!1}){var _;const[a,r]=m.useState(u),i=Q.find(p=>p.id===a)||Q[0],[l,d]=m.useState((_=i.challenges[0])==null?void 0:_.id),n=i.challenges.find(p=>p.id===l)||i.challenges[0],[g,R]=m.useState((n==null?void 0:n.initialSql)||""),[v,T]=m.useState(null),[S,j]=m.useState(!1),[h,y]=m.useState(!1),[I,A]=m.useState(null),[V,F]=m.useState(!1),G=p=>{r(p);const C=(Q.find(q=>q.id===p)||Q[0]).challenges[0];d(C==null?void 0:C.id),R((C==null?void 0:C.initialSql)||""),T(null),j(!1),y(!1),A(null)},H=p=>{d(p.id),R(p.initialSql),T(null),j(!1),y(!1)},w=()=>{const p=Ae(i.id,g);T(p)},B=()=>{var p;(p=navigator==null?void 0:navigator.clipboard)!=null&&p.writeText&&(navigator.clipboard.writeText(g),F(!0),setTimeout(()=>F(!1),2e3))},z=e.jsxs("div",{className:"sql-case-viewer-container",children:[e.jsxs("div",{className:"sql-case-top-nav",children:[e.jsxs("div",{className:"sql-case-top-title-wrap",children:[e.jsx("span",{className:"sql-case-badge-pill",children:"🏢 Taller del Mundo Real"}),e.jsx("h2",{className:"sql-case-main-heading",children:"Casos de Estudio Pormenorizados & Playground en Vivo"}),e.jsx("p",{className:"sql-case-main-subheading",children:"Selecciona una empresa para estudiar su situación operativa, el diseño de sus tablas y cómo se relacionan entre sí antes de practicar."})]}),s&&o&&e.jsx("button",{type:"button",className:"sql-modal-close-btn",onClick:o,"aria-label":"Cerrar Taller",children:"✕"})]}),e.jsx("div",{className:"sql-case-selector-bar",children:Q.map(p=>{const f=p.id===a;return e.jsxs("button",{type:"button",className:`sql-case-tab-btn ${f?"active":""}`,onClick:()=>G(p.id),children:[e.jsx("span",{className:"sql-case-tab-icon",children:p.icon}),e.jsxs("div",{className:"sql-case-tab-info",children:[e.jsx("strong",{children:p.name}),e.jsx("small",{children:p.industry})]})]},p.id)})}),e.jsxs("div",{className:"sql-case-body",children:[e.jsxs("section",{className:"sql-case-section",children:[e.jsxs("div",{className:"sql-case-section-header",children:[e.jsx("span",{className:"sql-case-step-num",children:"1"}),e.jsx("h3",{className:"sql-case-section-title",children:"Contexto y Situación Real de la Empresa"})]}),e.jsxs("div",{className:"sql-case-narrative-card",children:[e.jsxs("div",{className:"sql-narrative-meta",children:[e.jsx("span",{className:"sql-narrative-tag",children:i.industry}),e.jsxs("span",{className:"sql-narrative-schema-tag",children:[i.tables.length," Tablas Relacionadas"]})]}),e.jsx("p",{className:"sql-narrative-text",children:i.situation})]})]}),e.jsxs("section",{className:"sql-case-section",children:[e.jsxs("div",{className:"sql-case-section-header",children:[e.jsx("span",{className:"sql-case-step-num",children:"2"}),e.jsx("h3",{className:"sql-case-section-title",children:"Organización y Diccionario de las Tablas"}),e.jsx("span",{className:"sql-case-header-hint",children:"Estructura física, claves primarias (PK) y foráneas (FK)"})]}),e.jsx("div",{className:"sql-case-tables-grid",children:i.tables.map(p=>{const f=I===p.name;return e.jsxs("div",{className:"sql-table-detail-card",children:[e.jsxs("div",{className:"sql-table-detail-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{className:"sql-table-icon",children:p.icon}),e.jsxs("div",{children:[e.jsxs("strong",{className:"sql-table-name",children:["Tabla: `",p.name,"`"]}),e.jsx("span",{className:"sql-table-subname",children:p.label})]})]}),e.jsx("button",{type:"button",className:"sql-sample-toggle-btn",onClick:()=>A(f?null:p.name),children:f?"Ocultar datos":"👁️ Ver datos reales"})]}),e.jsx("p",{className:"sql-table-desc",children:p.description}),e.jsx("div",{className:"sql-table-cols-list",children:e.jsxs("table",{className:"sql-cols-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Columna"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Clave"}),e.jsx("th",{children:"Descripción"})]})}),e.jsx("tbody",{children:p.columns.map(C=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:C.name})}),e.jsx("td",{children:e.jsx("span",{className:"sql-type-chip",children:C.type})}),e.jsxs("td",{children:[C.key==="PK"&&e.jsx("span",{className:"sql-key-badge pk",children:"PK"}),C.key==="FK"&&e.jsx("span",{className:"sql-key-badge fk",children:"FK"}),C.key==="UNIQUE"&&e.jsx("span",{className:"sql-key-badge uq",children:"UNIQUE"})]}),e.jsx("td",{className:"sql-col-desc",children:C.desc})]},C.name))})]})}),f&&e.jsxs("div",{className:"sql-table-sample-preview",children:[e.jsx("span",{className:"sql-sample-title",children:"📄 Primeros registros reales en memoria:"}),e.jsx("div",{className:"sql-sample-table-wrap",children:e.jsxs("table",{className:"sql-sample-data-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:p.columns.map(C=>e.jsx("th",{children:C.name},C.name))})}),e.jsx("tbody",{children:p.sampleData.slice(0,5).map((C,q)=>e.jsx("tr",{children:p.columns.map(M=>e.jsx("td",{children:String(C[M.name]!==void 0?C[M.name]:"")},M.name))},q))})]})})]})]},p.name)})})]}),e.jsxs("section",{className:"sql-case-section",children:[e.jsxs("div",{className:"sql-case-section-header",children:[e.jsx("span",{className:"sql-case-step-num",children:"3"}),e.jsx("h3",{className:"sql-case-section-title",children:"Cómo se Relacionan entre Sí las Tablas"}),e.jsx("span",{className:"sql-case-header-hint",children:"Integridad referencial y reglas de cardinalidad"})]}),e.jsx("div",{className:"sql-relationships-list",children:i.relationships.map((p,f)=>e.jsxs("div",{className:"sql-relationship-card",children:[e.jsxs("div",{className:"sql-rel-diagram-bar",children:[e.jsxs("div",{className:"sql-rel-entity parent",children:[e.jsx("span",{className:"sql-rel-entity-title",children:p.parent}),e.jsxs("span",{className:"sql-rel-entity-sub",children:["Tabla Padre (PK: ",p.referenceKey,")"]})]}),e.jsxs("div",{className:"sql-rel-connector-box",children:[e.jsx("span",{className:"sql-rel-badge-cardinality",children:p.cardinality}),e.jsx("span",{className:"sql-rel-arrow-line",children:"────────────────➔"}),e.jsxs("span",{className:"sql-rel-fk-info",children:["Enlace: ",e.jsx("code",{children:p.foreignKey})]})]}),e.jsxs("div",{className:"sql-rel-entity child",children:[e.jsx("span",{className:"sql-rel-entity-title",children:p.child}),e.jsxs("span",{className:"sql-rel-entity-sub",children:["Tabla Hija (FK: ",p.foreignKey,")"]})]})]}),e.jsxs("div",{className:"sql-rel-rules-box",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Regla Relacional:"})," ",p.rule]}),e.jsxs("p",{className:"sql-rel-practical",children:["💡 ",e.jsx("strong",{children:"Implicación en SQL:"})," ",p.practicalImplication]})]})]},f))})]}),e.jsxs("section",{className:"sql-case-section sql-playground-section",children:[e.jsxs("div",{className:"sql-case-section-header",children:[e.jsx("span",{className:"sql-case-step-num",children:"4"}),e.jsxs("h3",{className:"sql-case-section-title",children:["Espacio de Prácticas en Vivo: ",i.name]}),e.jsx("span",{className:"sql-case-header-hint",children:"Resuelve las necesidades del negocio ejecutando consultas reales"})]}),e.jsxs("div",{className:"sql-challenges-tabs-bar",children:[e.jsx("span",{className:"sql-challenges-bar-label",children:"🎯 Retos del Caso:"}),e.jsx("div",{className:"sql-challenges-tabs",children:i.challenges.map((p,f)=>e.jsxs("button",{type:"button",className:`sql-challenge-tab-btn ${l===p.id?"active":""}`,onClick:()=>H(p),children:[e.jsx("span",{className:"sql-challenge-tab-num",children:f+1}),e.jsx("span",{children:p.title}),e.jsx("span",{className:"sql-challenge-tab-badge",children:p.badge})]},p.id))})]}),n&&e.jsxs("div",{className:"sql-challenge-workbench",children:[e.jsxs("div",{className:"sql-challenge-brief-box",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.4rem"},children:[e.jsx("span",{className:"sql-level-badge basic",children:n.badge}),e.jsx("strong",{className:"sql-challenge-brief-title",children:n.title})]}),e.jsx("p",{className:"sql-challenge-problem-text",children:n.problem})]}),e.jsxs("div",{className:"sql-editor-toolbar",style:{marginTop:"1rem"},children:[e.jsxs("span",{className:"sql-editor-label",children:["💻 Consola SQL de ",i.name]}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:B,children:V?"✓ Copiado":"📋 Copiar"}),e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>j(!S),children:S?"Ocultar Pista":"💡 Pista"}),e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>y(!h),children:h?"Ocultar Solución":"👁️ Ver Solución"}),e.jsx("button",{type:"button",className:"sql-run-query-btn",onClick:w,children:"▶️ Ejecutar Consulta en Vivo"})]})]}),S&&e.jsxs("div",{className:"sql-challenge-hint-box",style:{margin:"0.6rem 0"},children:[e.jsx("strong",{children:"💡 Pista Didáctica:"})," ",n.hint]}),h&&e.jsxs("div",{className:"sql-challenge-solution-box",style:{margin:"0.6rem 0"},children:[e.jsx("div",{className:"sql-solution-code-title",children:e.jsx("span",{children:"✨ Solución Canónica Comentada:"})}),e.jsx("pre",{className:"code-block",children:e.jsx("code",{children:n.initialSql})}),e.jsxs("div",{className:"sql-solution-explanation",children:[e.jsx("strong",{children:"🧠 Análisis del Motor SQL:"}),e.jsx("p",{children:n.explanation})]})]}),e.jsx("textarea",{className:"sql-sandbox-textarea",value:g,onChange:p=>R(p.target.value),rows:5,spellCheck:"false",placeholder:"Escribe o ajusta la consulta SELECT aquí..."}),v&&e.jsxs("div",{className:"sql-results-panel",style:{marginTop:"0.8rem"},children:[e.jsxs("div",{className:"sql-results-header",children:[e.jsxs("span",{className:"sql-results-title",children:["📊 Resultado de la Consulta en ",i.name]}),v.success&&e.jsxs("span",{className:"sql-results-badge",children:["✓ ",v.rowCount," ",v.rowCount===1?"fila":"filas"," en ",v.executionTimeMs," ms"]})]}),v.success?e.jsx("div",{className:"sql-results-table-wrap",children:v.rows.length===0?e.jsx("div",{className:"sql-results-empty",children:"La consulta no devolvió filas coincidentes con el criterio indicado."}):e.jsxs("table",{className:"sql-results-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:v.columns.map((p,f)=>e.jsx("th",{children:p},f))})}),e.jsx("tbody",{children:v.rows.map((p,f)=>e.jsx("tr",{children:v.columns.map((C,q)=>e.jsx("td",{children:String(p[C]!==void 0?p[C]:"")},q))},f))})]})}):e.jsxs("div",{className:"sql-sandbox-error",children:[e.jsx("strong",{children:"⚠️ Error SQL:"})," ",v.error]})]})]})]})]})]});return s?e.jsx("div",{className:"sql-modal-backdrop",onClick:o,role:"dialog","aria-modal":"true",children:e.jsx("div",{className:"sql-modal-window sql-case-viewer-window",onClick:p=>p.stopPropagation(),children:z})}):z}function De(){var P;const{sectionId:u}=he(),o=Ee(),[s,a]=m.useState("continuous"),[r,i]=m.useState(()=>{var c;if(u){const b=k.find(E=>E.id===u||E.id.endsWith(`-${u}`));if(b)return b.id}return((c=k[0])==null?void 0:c.id)||"1-1-intro"}),[l,d]=m.useState(""),[n,g]=m.useState({}),[R,v]=m.useState(null),[T,S]=m.useState(!1),[j,h]=m.useState(!1),[y,I]=m.useState(!1),[A,V]=m.useState(!1),[F,G]=m.useState(!1),[H,w]=m.useState(!1),[B,z]=m.useState(!1),[_,p]=m.useState("all"),[f,C]=be("micampus_sql_completed",[],{category:"sql"}),q=c=>{C(b=>b.includes(c)?b.filter(E=>E!==c):[...b,c])},[M,X]=m.useState(1),[K,Z]=m.useState({check1:!1,check2:!1,check3:!1,check4:!1,check5:!1,check6:!1}),W=m.useRef(null),Y=m.useMemo(()=>{let c=k;if(_==="basic"?c=c.filter(E=>["cat-1-fundamentos","cat-2-er-normalizacion","cat-3-ddl-dml","cat-4-select-basico"].includes(E.category)):_==="advanced"?c=c.filter(E=>["cat-5-where-having","cat-6-ctes-recursivas","cat-7-window-functions","cat-8-joins-visual"].includes(E.category)):_==="dba"?c=c.filter(E=>["cat-9-proc-triggers","cat-10-indices-retos","cat-11-seguridad-motores"].includes(E.category)):_==="practice"&&(c=c.filter(E=>E.id.includes("ejercicio")||E.id.includes("retos")||E.id.includes("checklist")||E.category==="cat-5-where-having"||E.badge.toLowerCase().includes("práctica")||E.badge.toLowerCase().includes("retos"))),!l.trim())return c;const b=l.toLowerCase();return c.filter(E=>E.title.toLowerCase().includes(b)||E.shortDesc.toLowerCase().includes(b)||E.badge.toLowerCase().includes(b)||E.html.toLowerCase().includes(b))},[l,_]),se=m.useMemo(()=>s==="single"?Y.filter(c=>c.id===r):Y,[s,Y,r]);m.useEffect(()=>{if(u){const c=k.find(b=>b.id===u||b.id.endsWith(`-${u}`));if(c){i(c.id);const b=document.getElementById(`sql-sec-${c.id}`);b&&b.scrollIntoView({behavior:"auto",block:"start"})}}},[u]),m.useEffect(()=>{if(!W.current)return;W.current.querySelectorAll(".code-block").forEach(b=>{if(b.querySelector(".sql-code-copy-btn"))return;const E=document.createElement("button");E.type="button",E.className="sql-code-copy-btn",E.textContent="📋 Copiar",E.setAttribute("aria-label","Copiar código"),E.onclick=J=>{var ne,de;J.stopPropagation();const x=((ne=b.querySelector("code"))==null?void 0:ne.innerText)||b.innerText.replace("📋 Copiar","").replace("✓ Copiado","");(de=navigator==null?void 0:navigator.clipboard)!=null&&de.writeText&&(navigator.clipboard.writeText(x.trim()),E.textContent="✓ Copiado",E.classList.add("copied"),setTimeout(()=>{E.textContent="📋 Copiar",E.classList.remove("copied")},2e3))},b.appendChild(E)})},[se,s]),m.useEffect(()=>{const c=()=>{S(window.scrollY>400)};return window.addEventListener("scroll",c,{passive:!0}),()=>window.removeEventListener("scroll",c)},[]);const oe=c=>{g(b=>({...b,[c]:!b[c]}))},ie=(c,b)=>{g(E=>({...E,[c]:!1})),b&&$(b)},$=c=>{if(i(c),o(`/sql/${c}`,{replace:!0}),s==="continuous"){const b=document.getElementById(`sql-sec-${c}`);b&&b.scrollIntoView({behavior:"auto",block:"start"})}else window.scrollTo({top:0,behavior:"auto"})},ee=m.useCallback((c,b)=>{var E;(E=navigator==null?void 0:navigator.clipboard)!=null&&E.writeText&&(navigator.clipboard.writeText(c),v(b),setTimeout(()=>v(null),2e3))},[]),te=c=>{Z(b=>({...b,[c]:!b[c]}))},t=Object.values(K).filter(Boolean).length,N=()=>{window.scrollTo({top:0,behavior:"auto"})};return e.jsxs("div",{className:"sql-master-page",children:[e.jsx("header",{className:"sql-hero-header",children:e.jsxs("div",{className:"sql-hero-inner",children:[e.jsxs("nav",{"aria-label":"Miga de pan",className:"sql-breadcrumbs",children:[e.jsx(ce,{to:"/",children:"🏠 Inicio"}),e.jsx("span",{className:"sql-breadcrumbs-sep",children:"/"}),e.jsx("span",{children:"Bases de Datos & SQL"}),e.jsx("span",{className:"sql-breadcrumbs-sep",children:"/"}),e.jsx("strong",{style:{color:"#ffffff"},children:"Compendio & Masterclass"})]}),e.jsxs("div",{className:"sql-hero-title-row",children:[e.jsxs("div",{className:"sql-hero-titles",children:[e.jsxs("h1",{children:[e.jsx("span",{children:"🐬"})," Compendio SQL & Bases de Datos"]}),e.jsxs("p",{children:["Guía completa desde el diseño Entidad-Relación y Normalización (1FN, 2FN, 3FN) hasta Procedimientos, Transacciones ACID y la Masterclass interactiva de ",e.jsx("strong",{children:"WHERE vs HAVING"}),"."]})]}),e.jsxs("div",{className:"sql-hero-badges",children:[e.jsx("span",{className:"sql-hero-badge highlight",children:"⭐ Guía Unificada"}),e.jsx("span",{className:"sql-hero-badge",children:"28 Módulos"}),e.jsx("span",{className:"sql-hero-badge",children:"11 Bloques Temáticos"}),e.jsx("span",{className:"sql-hero-badge",children:"PostgreSQL · MySQL · SQLite"})]})]})]})}),e.jsxs("div",{className:"sql-layout-container",children:[e.jsxs("aside",{className:"sql-sidebar","aria-label":"Navegación del Compendio SQL",children:[e.jsx("div",{className:"sql-sidebar-search",children:e.jsx("input",{type:"text",placeholder:"🔍 Buscar sintaxis, HAVING, JOIN...",value:l,onChange:c=>d(c.target.value),"aria-label":"Buscar en la guía de SQL"})}),e.jsxs("div",{className:"sql-sidebar-controls",children:[e.jsx("button",{type:"button",className:"sql-sidebar-btn",onClick:()=>g({}),title:"Expandir todas las categorías",children:"Expandir"}),e.jsx("button",{type:"button",className:"sql-sidebar-btn",onClick:()=>{const c={};pe.forEach(b=>{c[b.id]=!0}),g(c)},title:"Contraer todas las categorías",children:"Contraer"})]}),e.jsx("nav",{className:"sql-sidebar-nav",children:pe.map(c=>{const b=Y.filter(x=>x.category===c.id);if(b.length===0)return null;const E=!!n[c.id],J=b.some(x=>x.id===r);return e.jsxs("div",{className:"sql-menu-category",children:[e.jsxs("div",{className:`sql-menu-cat-header-wrap ${J?"active":""}`,children:[e.jsx("button",{type:"button",className:"sql-menu-cat-header",onClick:()=>{var x;return ie(c.id,(x=b[0])==null?void 0:x.id)},title:`Ir a ${c.name}`,children:e.jsxs("span",{children:[c.icon," ",c.name]})}),e.jsx("button",{type:"button",className:"sql-menu-cat-toggle-btn",onClick:x=>{x.stopPropagation(),oe(c.id)},"aria-expanded":!E,"aria-label":E?`Desplegar subapartados de ${c.name}`:`Replegar subapartados de ${c.name}`,title:E?"Desplegar subapartados":"Replegar subapartados",children:E?"▼":"▲"})]}),!E&&e.jsx("div",{className:"sql-menu-items",children:b.map(x=>{const ne=f.includes(x.id);return e.jsxs("button",{type:"button",className:`sql-menu-item-btn ${r===x.id?"active":""}`,onClick:()=>$(x.id),title:x.title,children:[e.jsxs("span",{style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:"0.35rem"},children:[ne&&e.jsx("span",{className:"sql-menu-check-badge",title:"Módulo completado",children:"✓"}),e.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:x.title})]}),e.jsx("span",{className:"sql-menu-item-badge",children:x.num||x.badge})]},x.id)})})]},c.id)})})]}),e.jsxs("main",{className:"sql-content-area",ref:W,children:[e.jsxs("div",{className:"sql-progress-box",children:[e.jsxs("div",{className:"sql-progress-info",children:[e.jsxs("div",{children:[e.jsx("span",{className:"sql-progress-title",children:"📈 Tu Progreso en SQL:"}),e.jsxs("span",{className:"sql-progress-count",children:[" ",f.length," de ",k.length," temas completados"]})]}),e.jsx("div",{className:"sql-progress-bar-wrap",title:`${Math.round(f.length/k.length*100)}% completado`,children:e.jsx("div",{className:"sql-progress-bar-fill",style:{width:`${Math.round(f.length/k.length*100)}%`}})}),e.jsxs("span",{className:"sql-progress-pct",children:[Math.round(f.length/k.length*100),"%"]})]}),e.jsxs("div",{className:"sql-tools-quick-bar",children:[e.jsx("button",{type:"button",className:`sql-action-pill-btn ${s==="case-study"?"primary":""}`,onClick:()=>a("case-study"),title:"Abrir página pormenorizada de cada caso real: situación, organización de tablas, relaciones y playground",children:"🏢 Casos Reales & Playground"}),e.jsx("button",{type:"button",className:"sql-action-pill-btn",onClick:()=>w(!0),title:"Abrir Generador Visual de Consultas Asistido",children:"🛒 Generador Visual"}),e.jsx("button",{type:"button",className:"sql-action-pill-btn",onClick:()=>h(!0),title:"Abrir consola para probar consultas SQL en vivo con datos reales",children:"🧪 Playground Rápido"}),e.jsx("button",{type:"button",className:"sql-action-pill-btn",onClick:()=>I(!0),title:"Abrir resumen condensado listo para imprimir o PDF",children:"📄 Chuleta de Examen"}),e.jsx("button",{type:"button",className:"sql-action-pill-btn",onClick:()=>V(!0),title:"Ver conexión segura con PHP PDO y Java Spring Data JPA",children:"🔌 PHP & Spring Boot"}),e.jsx("button",{type:"button",className:"sql-action-pill-btn",onClick:()=>G(!0),title:"Buscador alfabético de palabras clave y cláusulas",children:"🔍 Glosario Rápido"})]})]}),e.jsxs("div",{className:"sql-level-filters-bar",children:[e.jsx("span",{className:"sql-level-filter-label",children:"Nivel / Enfoque:"}),e.jsxs("button",{type:"button",className:`sql-level-filter-btn ${_==="all"&&s!=="case-study"?"active":""}`,onClick:()=>{p("all"),s==="case-study"&&a("continuous")},children:["Todos (",k.length,")"]}),e.jsx("button",{type:"button",className:`sql-level-filter-btn ${_==="basic"?"active":""}`,onClick:()=>{p("basic"),s==="case-study"&&a("continuous")},children:"🟢 Fundamentos (DAM/DAW)"}),e.jsx("button",{type:"button",className:`sql-level-filter-btn ${_==="advanced"?"active":""}`,onClick:()=>{p("advanced"),s==="case-study"&&a("continuous")},children:"🟡 Analítica & Avanzado"}),e.jsx("button",{type:"button",className:`sql-level-filter-btn ${_==="dba"?"active":""}`,onClick:()=>{p("dba"),s==="case-study"&&a("continuous")},children:"🔴 DBA & Optimización"}),e.jsx("button",{type:"button",className:`sql-level-filter-btn ${_==="practice"?"active":""}`,onClick:()=>{p("practice"),s==="case-study"&&a("continuous")},children:"⭐ Solo Retos & Práctica"}),e.jsx("button",{type:"button",className:`sql-level-filter-btn ${s==="case-study"?"active":""}`,onClick:()=>a("case-study"),style:{borderLeft:"3px solid var(--sql-gold)"},children:"🏢 Casos de Negocio Reales"})]}),e.jsxs("div",{className:"sql-toolbar",children:[e.jsxs("div",{className:"sql-toolbar-left",children:[e.jsx("span",{children:"📚 Vista Actual:"}),e.jsx("span",{style:{color:"#0f172a",fontWeight:800},children:s==="case-study"?"🏢 Casos de Estudio Pormenorizados: Situación, Tablas, Relaciones y Playground en Vivo":s==="continuous"?"Manual Completo (Scroll Continuo)":`Módulo Individual: ${((P=k.find(c=>c.id===r))==null?void 0:P.title)||""}`}),l&&s!=="case-study"&&e.jsxs("span",{style:{fontSize:"0.8rem",color:"#2563eb",fontWeight:600},children:["(",Y.length,' resultados para "',l,'")']})]}),e.jsxs("div",{className:"sql-toolbar-right",children:[e.jsx("button",{type:"button",className:`sql-tool-btn ${s==="case-study"?"active":""}`,onClick:()=>a("case-study"),title:"Página pormenorizada para cada ejemplo del mundo real",children:"🏢 Casos Reales"}),e.jsx("button",{type:"button",className:`sql-tool-btn ${s==="continuous"?"active":""}`,onClick:()=>a("continuous"),title:"Leer todo el manual con scroll continuo",children:"📜 Manual Corrido"}),e.jsx("button",{type:"button",className:`sql-tool-btn ${s==="single"?"active":""}`,onClick:()=>a("single"),title:"Ver sólo el tema seleccionado",children:"📄 Por Módulo"}),e.jsx("button",{type:"button",className:"sql-tool-btn",onClick:()=>{var c;(c=navigator==null?void 0:navigator.clipboard)!=null&&c.writeText&&(navigator.clipboard.writeText(window.location.href),alert("¡Enlace directo al tema copiado al portapapeles!"))},title:"Copiar enlace directo a esta sección",children:"🔗 Compartir"})]})]}),s==="case-study"?e.jsx(me,{isModal:!1}):se.map(c=>{const b=c.id==="masterclass-ejercicios",E=c.id==="masterclass-checklist",J=f.includes(c.id);return e.jsxs("section",{id:`sql-sec-${c.id}`,className:"sql-section-card",style:{borderTopColor:c.accentColor||"#1a5490"},children:[e.jsxs("div",{className:"sql-card-meta",children:[e.jsx("span",{className:"sql-card-category",children:c.categoryTitle}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:[e.jsx("button",{type:"button",className:`sql-module-complete-btn ${J?"completed":""}`,onClick:()=>q(c.id),title:J?"Desmarcar este módulo":"Marcar como completado",children:J?"✓ Completado":"Marcar como visto"}),e.jsx("span",{className:"sql-card-badge",children:c.badge}),e.jsxs("button",{type:"button",className:"sql-tool-btn",style:{padding:"0.2rem 0.6rem",fontSize:"0.72rem"},onClick:()=>$(c.id),title:"Enlazar a este módulo",children:["# ",c.id]})]})]}),b&&e.jsxs("div",{className:"sql-gym-tabs",children:[e.jsxs("div",{className:"sql-gym-tab-header",children:[e.jsx("button",{type:"button",className:`sql-gym-tab-btn ${M===1?"active":""}`,onClick:()=>X(1),children:"🏋️ Ejercicio 1: Clases con >20 Alumnos"}),e.jsx("button",{type:"button",className:`sql-gym-tab-btn ${M===2?"active":""}`,onClick:()=>X(2),children:"🥊 Ejercicio 2: Entrenadores en Turno Tarde"}),e.jsx("button",{type:"button",className:`sql-gym-tab-btn ${M===3?"active":""}`,onClick:()=>X(3),children:"⭐ Ejercicio 3: Socios VIP con >10 Visitas"})]}),e.jsxs("div",{className:"sql-gym-tab-pane",children:[M===1&&e.jsxs("div",{className:"sql-example",children:[e.jsx("div",{className:"example-title",children:"📌 Caso 1: Identificar Clases Populares"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Enunciado:"})," Obtén el nombre de las actividades y la cantidad de inscritos, pero únicamente para aquellas que superen los 20 alumnos."]}),e.jsxs("div",{className:"code-block",style:{position:"relative"},children:[e.jsx("button",{type:"button",className:`sql-code-copy-btn ${R==="gym1"?"copied":""}`,onClick:()=>ee(`SELECT actividad, COUNT(id_socio) AS total_alumnos
FROM inscripciones
GROUP BY actividad
HAVING COUNT(id_socio) > 20;`,"gym1"),children:R==="gym1"?"✅ ¡Copiado!":"📋 Copiar"}),e.jsxs("code",{children:[e.jsx("span",{style:{color:"#60a5fa"},children:"SELECT"})," actividad, ",e.jsx("span",{style:{color:"#fbbf24"},children:"COUNT"}),"(id_socio) ",e.jsx("span",{style:{color:"#60a5fa"},children:"AS"})," total_alumnos",e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"FROM"})," inscripciones",e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"GROUP BY"})," actividad",e.jsx("br",{}),e.jsx("span",{style:{color:"#f87171",fontWeight:800},children:"HAVING"})," ",e.jsx("span",{style:{color:"#fbbf24"},children:"COUNT"}),"(id_socio) > 20;"]})]}),e.jsxs("p",{style:{margin:0,fontSize:"0.88rem",color:"#166534"},children:["💡 ",e.jsx("strong",{children:"¿Por qué HAVING?"})," Porque el filtro ",e.jsx("code",{children:"> 20"})," se aplica ",e.jsx("em",{children:"después"})," de haber contado cuántos alumnos hay por grupo en ",e.jsx("code",{children:"GROUP BY"}),"."]})]}),M===2&&e.jsxs("div",{className:"sql-example",children:[e.jsx("div",{className:"example-title",children:"📌 Caso 2: Filtrado Previo (WHERE) + Agregación (HAVING)"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Enunciado:"})," Encuentra a los entrenadores que hayan impartido más de 5 clases en horario de tarde (a partir de las 16:00)."]}),e.jsxs("div",{className:"code-block",style:{position:"relative"},children:[e.jsx("button",{type:"button",className:`sql-code-copy-btn ${R==="gym2"?"copied":""}`,onClick:()=>ee(`SELECT entrenador_id, COUNT(*) AS clases_tarde
FROM sesiones_gym
WHERE hora_inicio >= '16:00:00'
GROUP BY entrenador_id
HAVING COUNT(*) > 5;`,"gym2"),children:R==="gym2"?"✅ ¡Copiado!":"📋 Copiar"}),e.jsxs("code",{children:[e.jsx("span",{style:{color:"#60a5fa"},children:"SELECT"})," entrenador_id, ",e.jsx("span",{style:{color:"#fbbf24"},children:"COUNT"}),"(*) ",e.jsx("span",{style:{color:"#60a5fa"},children:"AS"})," clases_tarde",e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"FROM"})," sesiones_gym",e.jsx("br",{}),e.jsx("span",{style:{color:"#38bdf8",fontWeight:800},children:"WHERE"})," hora_inicio >= ",e.jsx("span",{style:{color:"#86efac"},children:"'16:00:00'"}),e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"GROUP BY"})," entrenador_id",e.jsx("br",{}),e.jsx("span",{style:{color:"#f87171",fontWeight:800},children:"HAVING"})," ",e.jsx("span",{style:{color:"#fbbf24"},children:"COUNT"}),"(*) > 5;"]})]}),e.jsxs("p",{style:{margin:0,fontSize:"0.88rem",color:"#166534"},children:["💡 ",e.jsx("strong",{children:"Estrategia óptima:"})," Primero se descartan las clases matinales con ",e.jsx("code",{children:"WHERE"})," (ahorrando memoria), y luego se agrupa y filtra el conteo con ",e.jsx("code",{children:"HAVING"}),"."]})]}),M===3&&e.jsxs("div",{className:"sql-example",children:[e.jsx("div",{className:"example-title",children:"📌 Caso 3: Socios VIP con Alto Rendimiento"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Enunciado:"})," Muestra los socios con tarifa VIP que hayan acumulado más de 10 accesos en el mes en curso."]}),e.jsxs("div",{className:"code-block",style:{position:"relative"},children:[e.jsx("button",{type:"button",className:`sql-code-copy-btn ${R==="gym3"?"copied":""}`,onClick:()=>ee(`SELECT s.nombre, s.tipo_tarifa, COUNT(a.id_acceso) AS total_visitas
FROM socios s
INNER JOIN accesos a ON s.id_socio = a.id_socio
WHERE s.tipo_tarifa = 'VIP'
GROUP BY s.id_socio, s.nombre, s.tipo_tarifa
HAVING COUNT(a.id_acceso) > 10
ORDER BY total_visitas DESC;`,"gym3"),children:R==="gym3"?"✅ ¡Copiado!":"📋 Copiar"}),e.jsxs("code",{children:[e.jsx("span",{style:{color:"#60a5fa"},children:"SELECT"})," s.nombre, s.tipo_tarifa, ",e.jsx("span",{style:{color:"#fbbf24"},children:"COUNT"}),"(a.id_acceso) ",e.jsx("span",{style:{color:"#60a5fa"},children:"AS"})," total_visitas",e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"FROM"})," socios s",e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"INNER JOIN"})," accesos a ",e.jsx("span",{style:{color:"#60a5fa"},children:"ON"})," s.id_socio = a.id_socio",e.jsx("br",{}),e.jsx("span",{style:{color:"#38bdf8",fontWeight:800},children:"WHERE"})," s.tipo_tarifa = ",e.jsx("span",{style:{color:"#86efac"},children:"'VIP'"}),e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"GROUP BY"})," s.id_socio, s.nombre, s.tipo_tarifa",e.jsx("br",{}),e.jsx("span",{style:{color:"#f87171",fontWeight:800},children:"HAVING"})," ",e.jsx("span",{style:{color:"#fbbf24"},children:"COUNT"}),"(a.id_acceso) > 10",e.jsx("br",{}),e.jsx("span",{style:{color:"#60a5fa"},children:"ORDER BY"})," total_visitas ",e.jsx("span",{style:{color:"#60a5fa"},children:"DESC"}),";"]})]})]})]})]}),E&&e.jsxs("div",{className:"sql-checklist-container",children:[e.jsxs("div",{className:"sql-checklist-title",children:[e.jsx("span",{children:"✅ Pasos para Decidir: ¿WHERE o HAVING?"}),e.jsxs("span",{style:{fontSize:"0.85rem",color:"#16a34a"},children:[t," de 6 completados"]})]}),[{id:"check1",label:"1. ¿La condición evalúa filas individuales antes de agrupar? ➔ Usa WHERE."},{id:"check2",label:"2. ¿La condición involucra COUNT(), SUM(), AVG(), MIN() o MAX()? ➔ Usa HAVING."},{id:"check3",label:"3. ¿Puedes filtrar antes de GROUP BY para reducir datos? ➔ Hazlo siempre con WHERE."},{id:"check4",label:"4. ¿Tu consulta tiene GROUP BY? ➔ Solo entonces tiene sentido usar HAVING."},{id:"check5",label:"5. Recuerda el orden de ejecución: FROM ➔ JOIN ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT."},{id:"check6",label:"6. Valida que las columnas en SELECT estén en el GROUP BY o dentro de una agregada."}].map(x=>e.jsxs("div",{className:`sql-checklist-item ${K[x.id]?"checked":""}`,onClick:()=>te(x.id),children:[e.jsx("input",{type:"checkbox",id:x.id,checked:K[x.id],onChange:()=>{}}),e.jsx("label",{htmlFor:x.id,children:x.label})]},x.id))]}),e.jsx("div",{className:"sql-section-html",dangerouslySetInnerHTML:{__html:c.html}}),(c.id==="10-2-retos-entrevistas"||c.id.includes("retos-entrevistas"))&&e.jsx(je,{onOpenSandbox:()=>h(!0)}),(c.id==="11-2-motores-cheatsheet"||c.id.includes("motores-cheatsheet"))&&e.jsx(Se,{})]},c.id)})]})]}),T&&e.jsx("button",{type:"button",className:"sql-back-top-btn",onClick:N,title:"Volver al inicio","aria-label":"Volver arriba",children:"▲"}),e.jsx(Re,{isOpen:j,onClose:()=>h(!1)}),e.jsx(Ce,{isOpen:y,onClose:()=>I(!1)}),e.jsx(xe,{isOpen:A,onClose:()=>V(!1)}),e.jsx(fe,{isOpen:F,onClose:()=>G(!1),onSelectModule:c=>$(c)}),e.jsx(ye,{isOpen:H,onClose:()=>w(!1)}),B&&e.jsx(me,{isModal:!0,onClose:()=>z(!1)})]})}export{De as default};
