import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import './DespEac2Workbench.css';

/**
 * ============================================================================
 * @component   EntEac3Workbench
 * @description Guía Directa Paso a Paso para la EAC 3 de Entorns (DA2 M0487).
 *              Fiel al enunciado oficial DA2_M0487_EAC3_Enunciat_2627S1.odt
 *              (Partes 1 a 4: Test, Git, Refacció/Javadoc y Pruebas/JUnit 5).
 * ============================================================================
 */

export const getEntEac3Parts = () => [
  {
    id: 'part-1',
    number: 'Parte 1',
    shortLabel: '📝 Parte 1 · Test (1.0 pt)',
    title: 'Cuestionario tipo test (10 preguntas)',
    score: '1.0 punto',
    deliveryType: '✍️ Rellenar tabla azul al final del ejercicio 1 (.odt)',
    desc: 'Cada acierto suma 0,1 pts y cada error resta 0,05 pts (en blanco 0). Temas: pruebas de regresión, diseño de casos antes de ejecutar, análisis estático, @Test sin assert, Step Over, Extract Method, flujo seguro de refactorización, Javadoc, clone vs fork y marcas de conflicto Git.',
    tasks: [
      {
        id: 'ent3-p1',
        code: '1.1 – 1.10',
        letters: '10 preguntas',
        title: 'Responder las 10 preguntas tipo test en el .odt',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '📄 Documento .odt',
        desc: 'Revisa los conceptos clave de cada pregunta antes de marcar la casilla azul en el documento oficial.',
        steps: [
          {
            letter: '1.1 – 1.5)',
            where: 'client',
            whereBadge: '📚 TEORÍA PRUEBAS',
            label: '1.1 Regresión · 1.2 Antes de ejecutar · 1.3 Análisis estático · 1.4 @Test sin assert pasa · 1.5 Step Over',
            cmd: '1.1 d) De regressió | 1.2 a) Abans d\'executar-lo | 1.3 c) Examina sense executar | 1.4 b) Pot passar sense comprovar | 1.5 c) Step Over'
          },
          {
            letter: '1.6 – 1.10)',
            where: 'client',
            whereBadge: '📚 TEORÍA REFACCIÓ & GIT',
            label: '1.6 Extreure mètode · 1.7 Flux segur · 1.8 Contracte públic Javadoc · 1.9 Clone vs Fork · 1.10 HEAD actual',
            cmd: '1.6 d) Extreure mètode | 1.7 b) Proves verdes, canvi petit | 1.8 a) Contracte públic | 1.9 a) Clone vs Fork | 1.10 d) Versió branca actual'
          }
        ],
        deliverables: [
          '✍️ Rellenar las 10 respuestas en la tabla azul del apartado 1 del .odt.'
        ]
      }
    ]
  },
  {
    id: 'part-2',
    number: 'Parte 2',
    shortLabel: '🌿 Parte 2 · Git & Conflictos (3.0 pts)',
    title: 'Control de versiones con Git: ramas, merge y resolución de conflicto',
    score: '3.0 puntos',
    deliveryType: '📸 Capturas de Terminal (con ruta en el prompt) + respuestas escritas',
    desc: 'Crea la carpeta EAC3_Patinet_Control con PatinetElectric.java, trabaja con dos ramas (branca_bateria y branca_nom_atribut), fusiona, resuelve el conflicto conservando ambas mejoras y muestra el grafo.',
    tasks: [
      {
        id: 'ent3-p2-init',
        code: '2.0 – 2.4',
        letters: 'Inicialización',
        title: 'Crear EAC3_Patinet_Control, PatinetElectric.java y primer commit',
        score: '0,75 puntos',
        machine: 'server',
        machineLabel: '💻 Terminal Mac',
        desc: 'Inicializa Git, crea PatinetElectric.java (paquete transport), añade al staging, revisa git status y haz commit con "primera versió de DeUna".',
        steps: [
          {
            letter: '2.1 – 2.2)',
            where: 'server',
            whereBadge: '💻 TERMINAL MAC',
            label: 'Crear carpeta, inicializar Git y añadir PatinetElectric.java al staging',
            cmd: 'mkdir -p ~/EAC3_Patinet_Control/transport && cd ~/EAC3_Patinet_Control && git init && git add PatinetElectric.java'
          },
          {
            letter: '2.3 – 2.4)',
            where: 'server',
            whereBadge: '💻 TERMINAL MAC',
            label: 'Comprobar estado, hacer commit y volver a comprobar estado',
            cmd: 'git status && git commit -m "primera versió de DeUna" && git status'
          }
        ],
        deliverables: [
          '📸 Capturas/texto de 2.3 (git status antes del commit) y 2.4 (commit + git status limpio).'
        ]
      },
      {
        id: 'ent3-p2-branches',
        code: '2.5 – 2.10',
        letters: '2 Ramas',
        title: 'Trabajar en branca_bateria y branca_nom_atribut por separado',
        score: '1,00 punto',
        machine: 'server',
        machineLabel: '💻 Terminal Mac + Editor',
        desc: 'En branca_bateria cambia autonomia a double (25.0). Vuelve a main, crea branca_nom_atribut y renombra autonomia a autonomiaMaxima (manteniendo int).',
        steps: [
          {
            letter: '2.5 – 2.7)',
            where: 'server',
            whereBadge: '💻 TERMINAL MAC',
            label: 'Crear y moverse a branca_bateria, editar autonomía a double (25.0) y commitear',
            cmd: 'git branch branca_bateria && git checkout branca_bateria\n# Edita PatinetElectric.java (int -> double, 25 -> 25.0)\ngit add PatinetElectric.java && git commit -m "Canvi de tipus autonomia a double"'
          },
          {
            letter: '2.8 – 2.10)',
            where: 'server',
            whereBadge: '💻 TERMINAL MAC',
            label: 'Volver a main (comprobar int), crear branca_nom_atribut, renombrar a autonomiaMaxima y commitear',
            cmd: 'git checkout main && git checkout -b branca_nom_atribut\n# Edita PatinetElectric.java (autonomia -> autonomiaMaxima, manteniendo int)\ngit add PatinetElectric.java && git commit -m "Reanomenat atribut autonomia a autonomiaMaxima"'
          }
        ],
        deliverables: [
          '📸 Capturas de 2.5, 2.6, 2.7, 2.8 (código en main), 2.9 y 2.10.'
        ]
      },
      {
        id: 'ent3-p2-merge',
        code: '2.11 – 2.15',
        letters: 'Merge & Conflicto',
        title: 'Fusión fast-forward, conflicto en segunda fusión y git log --graph',
        score: '1,25 puntos',
        machine: 'server',
        machineLabel: '💻 Terminal Mac + Editor',
        desc: 'Fusiona branca_bateria en main (fast-forward), luego fusiona branca_nom_atribut (conflicto), resuelve conservando double autonomiaMaxima = 25.0, compila con javac y saca el grafo.',
        steps: [
          {
            letter: '2.11 – 2.12)',
            where: 'server',
            whereBadge: '💻 TERMINAL MAC',
            label: 'Volver a main, fusionar branca_bateria y luego branca_nom_atribut (genera conflicto)',
            cmd: 'git checkout main && git merge branca_bateria && git merge branca_nom_atribut'
          },
          {
            letter: '2.13 – 2.15)',
            where: 'server',
            whereBadge: '💻 TERMINAL MAC',
            label: 'Tras resolver conflicto (double autonomiaMaxima = 25.0) y borrar marcas, compilar, commitear y ver grafo',
            cmd: 'javac PatinetElectric.java && git add PatinetElectric.java && git commit -m "Resolució conflicte: double autonomiaMaxima" && git log --oneline --graph --all'
          }
        ],
        deliverables: [
          '✍️ 2.11: Explicar por qué es Fast-forward.',
          '✍️ 2.12: Explicar qué líneas entran en conflicto y por qué Git no lo resuelve solo.',
          '📸 Capturas de 2.13, 2.14 y 2.15 (git log --oneline --graph --all).'
        ]
      }
    ]
  },
  {
    id: 'part-3',
    number: 'Parte 3',
    shortLabel: '🔧 Parte 3 · Refacció & Javadoc (2.5 pts)',
    title: 'Refactorización asistida por IA (CalculadoraEnviament) y Javadoc',
    score: '2.5 puntos',
    deliveryType: '✍️ Prompt + Análisis crítico + Código (comentarios rojos) + Captura Javadoc',
    desc: 'Refactoriza CalculadoraEnviament.java eliminando código duplicado y números mágicos con ayuda de IA, documentando qué aceptaste y qué descartaste. Luego genera Javadoc de la clase original en Eclipse.',
    tasks: [
      {
        id: 'ent3-p3-1',
        code: '3.1',
        letters: 'A, B, C)',
        title: 'Refacció de CalculadoraEnviament.java con asistente IA',
        score: '2,00 puntos',
        machine: 'client',
        machineLabel: '💻 IDE / Eclipse + IA',
        desc: 'Extrae constantes para tarifas/recargos/incrementos por urgencia y extrae un método auxiliar común para evitar repetir el cálculo en NACIONAL, EUROPA e INTERNACIONAL.',
        steps: [
          {
            letter: 'A-B)',
            where: 'client',
            whereBadge: '✍️ REDACCIÓN .ODT',
            label: 'Documentar el Prompt exacto y el Análisis Crítico (qué aceptaste y qué descartaste)',
            cmd: 'Técnicas mínimas a aplicar: 1) Extract Constant (tarifas, umbral 10.0kg, recargos) · 2) Extract Method (cálculo unificado de envío)'
          }
        ],
        deliverables: [
          '✍️ 3.1.A: Prompt exacto usado.',
          '✍️ 3.1.B: Texto continuo con análisis crítico (aceptado vs descartado).',
          '✍️ 3.1.C: Código final con comentarios // en color ROJO indicando las técnicas aplicadas.'
        ]
      },
      {
        id: 'ent3-p3-2',
        code: '3.2',
        letters: 'Javadoc',
        title: 'Documentar la clase original con Javadoc y generar HTML en Eclipse',
        score: '0,50 puntos',
        machine: 'client',
        machineLabel: '💻 Eclipse + 🌐 Navegador',
        desc: 'Añade /** ... */ con @author, @version, @param y @return a la clase original CalculadoraEnviament, genera Javadoc en Eclipse (Project > Generate Javadoc...) y ábrelo en el navegador.',
        steps: [
          {
            letter: '3.2)',
            where: 'browser',
            whereBadge: '💻 ECLIPSE + NAVEGADOR',
            label: 'Generar Javadoc desde Eclipse y abrir index.html',
            cmd: 'Project > Generate Javadoc... > Abrir doc/index.html en navegador'
          }
        ],
        deliverables: [
          '✍️ Código original con comentarios Javadoc.',
          '📸 Captura de pantalla de la documentación HTML generada vista en el navegador.'
        ]
      }
    ]
  },
  {
    id: 'part-4',
    number: 'Parte 4',
    shortLabel: '🧪 Parte 4 · Casos de Prova & JUnit 5 (3.5 pts)',
    title: 'Clases de equivalencia, complejidad ciclomática y JUnit 5 en Eclipse',
    score: '3.5 puntos',
    deliveryType: '✍️ Tablas + Diagrama de flujo + Captura JUnit 5 en verde',
    desc: 'Diseña las pruebas de EficienciaEnergetica.determinaCategoriaConsum(int consumKwh) (válido 0..150; excepción <0 o >150) y ejecútalas en Eclipse con TestEficienciaEnergetica.',
    tasks: [
      {
        id: 'ent3-p4-1',
        code: '4.1',
        letters: 'A y B)',
        title: 'Clases de equivalencia, diagrama de flujo, V(G) y casos de prova',
        score: '2,50 puntos',
        machine: 'client',
        machineLabel: '📄 Diseño en .odt',
        desc: 'Identifica clases válidas ([0..20] A, [21..50] B, [51..90] C, [91..120] D, [121..150] E) e inválidas (<0, >150), dibuja el diagrama de flujo, calcula V(G) y cubre todos los caminos independientes.',
        steps: [
          {
            letter: '4.1.A-B)',
            where: 'client',
            whereBadge: '📊 ANÁLISIS',
            label: 'Valores límite clave a cubrir en la tabla de casos de prueba',
            cmd: 'Inválidos: -5, -1, 151, 160 | Límites válidos: 0, 20, 21, 50, 51, 90, 91, 120, 121, 150 | Intermedios: 10, 35, 70, 105, 135'
          }
        ],
        deliverables: [
          '✍️ 4.1.A: Condiciones de entrada/salida y tabla de clases válidas/inválidas.',
          '✍️ 4.1.B: Diagrama de flujo + cálculo de Complejidad Ciclomática V(G) + caminos independientes + tabla de casos de prueba.'
        ]
      },
      {
        id: 'ent3-p4-2',
        code: '4.2',
        letters: 'JUnit 5',
        title: 'Crear y ejecutar TestEficienciaEnergetica en Eclipse',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '💻 Eclipse (JUnit 5)',
        desc: 'Crea la clase TestEficienciaEnergetica en el paquete avaluacio con un @Test para cada llamada: -5, 0, 21, 35, 70, 91, 150 y 160.',
        steps: [
          {
            letter: '4.2)',
            where: 'client',
            whereBadge: '💻 ECLIPSE JUNIT 5',
            label: 'Aserciones a usar en TestEficienciaEnergetica (Assertions.assertEquals / assertThrows)',
            cmd: 'assertThrows(ConsumIncorrecteException.class, () -> EficienciaEnergetica.determinaCategoriaConsum(-5));\nassertEquals("Categoria A", EficienciaEnergetica.determinaCategoriaConsum(0));'
          }
        ],
        deliverables: [
          '📸 Captura de pantalla de la ejecución de JUnit Test en Eclipse viendo todos los métodos @Test y sus resultados.'
        ]
      }
    ]
  }
];

export default function EntEac3Workbench() {
  const [selectedPart, setSelectedPart] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [finderToast, setFinderToast] = useState(false);

  const [completedTasks, setCompletedTasks] = usePersistentState('ent_eac3_completed_v1', {}, {
    category: 'ioc'
  });

  const toggleTask = useCallback((taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  }, [setCompletedTasks]);

  const handleCopy = useCallback((text, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  const handleOpenFinder = () => {
    fetch('/api/open-folder?path=public/eacs/ent/eac3');
    setFinderToast(true);
    setTimeout(() => setFinderToast(false), 3500);
  };

  const parts = useMemo(() => getEntEac3Parts(), []);

  const allTasks = useMemo(() => parts.flatMap((p) => p.tasks), [parts]);
  const completedCount = useMemo(
    () => allTasks.filter((t) => Boolean(completedTasks[t.id])).length,
    [allTasks, completedTasks]
  );
  const progressPercent = useMemo(
    () => (allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0),
    [completedCount, allTasks.length]
  );

  const visibleParts = useMemo(() => {
    if (selectedPart === 'all') return parts;
    return parts.filter((p) => p.id === selectedPart);
  }, [parts, selectedPart]);

  return (
    <div className="eac2-workbench-root">
      <header className="eac2-header">
        <div className="eac2-header-left">
          <Link to="/ioc/entornos" className="eac2-back-btn">
            ← Volver a ENT
          </Link>
          <span className="eac2-badge" style={{ background: '#3b82f6' }}>DA2 M0487 · EAC 3</span>
          <div className="eac2-header-title">
            <h1>Guía Directa EAC 3: Test, Git, Refacció IA, Javadoc y JUnit 5</h1>
            <p>
              Archivo a entregar: <strong>DA2_M0487_EAC3_DeUna_M.odt</strong> · Fecha límite: <strong>10/12/2026 (23:55h)</strong>
            </p>
          </div>
        </div>

        <div className="eac2-header-actions">
          <a
            href="/eacs/ent/eac3/enunciado/DA2_M0487_EAC3_Enunciat_2627S1.odt"
            download
            className="eac2-Resource-btn"
          >
            📝 Descargar .odt
          </a>
          <button type="button" onClick={handleOpenFinder} className="eac2-Resource-btn">
            {finderToast ? '✅ ¡Abierta en Finder!' : '📂 Carpeta Finder'}
          </button>

          <div className="eac2-progress-pill">
            <span>Progreso:</span>
            <strong>
              {completedCount}/{allTasks.length} ({progressPercent}%)
            </strong>
          </div>
        </div>
      </header>

      <div className="eac2-container">
        <section className="eac2-summary-banner">
          <div className="eac2-summary-grid">
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-neutral">Parte 1 · Test (1.0 pt)</span>
              <p>
                <strong>10 preguntas</strong> en la tabla azul del <code>.odt</code> (+0,1 acierto / -0,05 fallo).
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-blue">Parte 2 · Git (3.0 pts)</span>
              <p>
                <code>PatinetElectric.java</code> con 2 ramas, merge fast-forward, resolución manual de conflicto y <code>git log --graph</code>.
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-green">Parte 3 · Refacció & Javadoc (2.5 pts)</span>
              <p>
                <code>CalculadoraEnviament.java</code> refactorizada con IA (comentarios en <strong>rojo</strong>) + Javadoc HTML en Eclipse.
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-amber">Parte 4 · Pruebas & JUnit 5 (3.5 pts)</span>
              <p>
                Clases de equivalencia, diagrama de flujo, V(G) y ejecución de <code>TestEficienciaEnergetica</code> en Eclipse.
              </p>
            </div>
          </div>
        </section>

        <div className="eac2-filter-tabs">
          <button
            type="button"
            className={`eac2-filter-tab ${selectedPart === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPart('all')}
          >
            📋 Todas las Partes (1–4)
          </button>
          {parts.map((part) => {
            const doneInPart = part.tasks.filter((t) => completedTasks[t.id]).length;
            return (
              <button
                key={part.id}
                type="button"
                className={`eac2-filter-tab ${selectedPart === part.id ? 'active' : ''}`}
                onClick={() => setSelectedPart(part.id)}
              >
                <span>{part.shortLabel}</span>
                <span className="eac2-filter-count">
                  {doneInPart}/{part.tasks.length}
                </span>
              </button>
            );
          })}
        </div>

        {visibleParts.map((part) => (
          <div key={part.id} className="eac2-part-section">
            <div className="eac2-part-banner">
              <div>
                <div className="eac2-part-banner-top">
                  <span className="eac2-part-num">{part.number}</span>
                  <span className="eac2-part-score">{part.score}</span>
                  <span className="eac2-part-delivery">{part.deliveryType}</span>
                </div>
                <h2 className="eac2-part-heading">{part.title}</h2>
                <p className="eac2-part-sub">{part.desc}</p>
              </div>
            </div>

            <div className="eac2-tasks-section">
              {part.tasks.map((task) => {
                const isDone = Boolean(completedTasks[task.id]);

                return (
                  <article
                    key={task.id}
                    className={`eac2-task-box ${isDone ? 'is-done' : ''}`}
                  >
                    <div className="eac2-task-header">
                      <div className="eac2-task-title-group">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTask(task.id)}
                          className="eac2-checkbox"
                          id={`chk-${task.id}`}
                        />
                        <span className="eac2-task-badge">{task.code}</span>
                        <span className="eac2-letters-badge">{task.letters}</span>
                        <label
                          htmlFor={`chk-${task.id}`}
                          className={`eac2-task-title ${isDone ? 'done-text' : ''}`}
                        >
                          {task.title}
                        </label>
                      </div>

                      <div className="eac2-task-meta-right">
                        <span className="eac2-machine-indicator">{task.machineLabel}</span>
                        <span className="eac2-task-score">{task.score}</span>
                      </div>
                    </div>

                    <p className="eac2-task-desc">{task.desc}</p>

                    <div className="eac2-steps-list">
                      {task.steps.map((st, idx) => {
                        const copyKey = `${task.id}-cmd-${idx}`;
                        return (
                          <div key={idx} className="eac2-cmd-card">
                            <div className="eac2-cmd-header">
                              <div className="eac2-cmd-header-left">
                                <span className="eac2-letter-pill">{st.letter}</span>
                                <span className={`where-pill where-${st.where}`}>
                                  {st.whereBadge}
                                </span>
                                <span className="eac2-step-label">{st.label}</span>
                              </div>
                            </div>
                            <div className="eac2-cmd-body">
                              <code className="eac2-cmd-text">{st.cmd}</code>
                              <button
                                type="button"
                                className={`eac2-copy-btn ${copiedId === copyKey ? 'copied' : ''}`}
                                onClick={() => handleCopy(st.cmd, copyKey)}
                              >
                                {copiedId === copyKey ? '✓ ¡Copiado!' : '📋 Copiar'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {task.deliverables && (
                      <div className="eac2-deliverables-box">
                        <div className="eac2-deliverables-title">
                          📌 Qué debes incluir en el .odt en este apartado:
                        </div>
                        <ul className="eac2-deliverables-list">
                          {task.deliverables.map((del, dIdx) => (
                            <li key={dIdx}>{del}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
