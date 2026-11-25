import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import './DespEac2Workbench.css';

/**
 * ============================================================================
 * @component   ObsVideosWorkbench
 * @description Centro de Grabación OBS Studio para todas las EACs pendientes
 *              (Interfícies EAC 2 + Desplegament EAC 3).
 *              Incluye checklist persistente, ventanas previas, guion hablado
 *              listo para leer y rutas de entrega.
 * ============================================================================
 */

const OBS_VIDEOS = [
  {
    id: 'obs-int-eac2',
    subject: 'int',
    subjectLabel: '🟡 Interfícies Web · EAC 2',
    deadline: '26/11/2026',
    title: 'Vídeo 1 · Widget Datepicker con jQuery UI (30–40 seg)',
    duration: '30–40 segundos',
    where: 'server',
    whereBadge: '🌐 WEB LOCAL + VS CODE',
    outputInfo: 'Guardar en: public/eacs/int/eac2/DAW_0615_EAC2_DeUna_M/video/tutorial-jquery-ui.mp4',
    folderPath: 'public/eacs/int/eac2/DAW_0615_EAC2_DeUna_M/video',
    prepWindows: [
      '1. Cámara web activa los primeros 3 segundos saludando.',
      '2. Navegador abierto en https://jqueryui.com/datepicker/ (documentación oficial).',
      '3. Finder abierto mostrando la carpeta del proyecto (DAW_0615_EAC2_DeUna_M).',
      '4. Editor de código abierto en video.html (mostrando los <script> de jQuery/jQuery UI y $("#datepickerDemo").datepicker()).',
      '5. Pestaña del navegador en http://localhost:5173/eacs/int/eac2/DAW_0615_EAC2_DeUna_M/video.html probando el calendario.'
    ],
    script: `“Hola, soy Blanca Deuna. En este vídeo-tutorial de 35 segundos os muestro cómo integrar el widget Datepicker de jQuery UI en Papelería Ratolí. Aquí tenemos la documentación oficial de jQuery UI, aquí la carpeta con los archivos de la web, y en el editor video.html vemos las etiquetas script de jQuery y jQuery UI junto a la inicialización del selector #datepickerDemo. Por último, en el navegador comprobamos cómo al hacer clic se despliega el calendario interactivo para elegir la fecha de entrega.”`
  },
  {
    id: 'obs-desp-eac3-vagrant',
    subject: 'desp',
    subjectLabel: '🟢 Desplegament · EAC 3 (Parte 1 · h, i, j)',
    deadline: '16/12/2026',
    title: 'Vídeo 2 · Persistencia Apache con Vagrant (192.168.20.10)',
    duration: '30–45 segundos',
    where: 'server',
    whereBadge: '🖥️ MAC HOST + NAVEGADOR',
    outputInfo: 'Subir a YouTube (Oculto) o Google Drive y pegar enlace en DAW_0614_EAC3_DeUna_M.pdf (Apartado 1.5)',
    folderPath: 'public/eacs/desp/eac3',
    prepWindows: [
      '1. Webcam visible + micrófono activo (obligatorio para validar autoría).',
      '2. Editor con ~/EverOfficeSupplies/web/index.html abierto.',
      '3. Navegador abierto en http://192.168.20.10.',
      '4. Terminal en ~/EverOfficeSupplies lista para ejecutar vagrant halt && vagrant up (o mostrar que persiste sin reiniciar).'
    ],
    script: `“Hola, soy Blanca Deuna. En este vídeo de la Parte 1 de Desplegament EAC 3 demuestro la sincronización de carpetas entre mi ordenador físico y la máquina Apache desplegada con Vagrant. Edito el archivo web/index.html desde el Mac, guardo los cambios y al recargar http://192.168.20.10 en el navegador se muestran al instante sin reiniciar Apache ni Vagrant.”`
  },
  {
    id: 'obs-desp-eac3-docker',
    subject: 'desp',
    subjectLabel: '🟢 Desplegament · EAC 3 (Parte 2 · v, w, x, y)',
    deadline: '16/12/2026',
    title: 'Vídeo 3 · Persistencia Apache en Docker (:8080)',
    duration: '45–60 segundos',
    where: 'client',
    whereBadge: '💻 UBUNTU DESKTOP + DOCKER',
    outputInfo: 'Subir a YouTube (Oculto) o Google Drive y pegar enlace en DAW_0614_EAC3_DeUna_M.pdf (Apartado 2.4)',
    folderPath: 'public/eacs/desp/eac3',
    prepWindows: [
      '1. Webcam visible + micrófono activo (obligatorio para validar autoría).',
      '2. Terminal dentro de Ubuntu Desktop (192.168.20.20) saliendo del contenedor con exit.',
      '3. Editor con ~/projecte/index.html y navegador en http://192.168.20.20:8080.',
      '4. Comandos preparados: docker stop everofficesupplies-web && docker rm everofficesupplies-web, y recrear con docker run -d ... -v "$HOME/projecte:/usr/local/apache2/htdocs" httpd:2.4.'
    ],
    script: `“Hola, soy Blanca Deuna. En este vídeo de la Parte 2 muestro la persistencia de datos en Docker. Salgo del contenedor con exit, modifico ~/projecte/index.html y al recargar http://192.168.20.20:8080 se ve el cambio al momento. Ahora detengo y elimino el contenedor con docker stop y docker rm, compruebo que el archivo sigue en ~/projecte, lo vuelvo a crear con el mismo bind mount y al recargar el navegador comprobamos que conserva todas las modificaciones.”`
  },
  {
    id: 'obs-desp-eac3-javadoc',
    subject: 'desp',
    subjectLabel: '🟢 Desplegament · EAC 3 (Parte 6 · ba)',
    deadline: '16/12/2026',
    title: 'Vídeo 4 · Navegación por JavaDoc de EverOfficeComandes',
    duration: '30–40 segundos',
    where: 'browser',
    whereBadge: '📚 JAVADOC EN NAVEGADOR',
    outputInfo: 'Subir a YouTube (Oculto) o Google Drive y pegar enlace en DAW_0614_EAC3_DeUna_M.pdf (Apartado 6.1)',
    folderPath: 'public/eacs/desp/eac3',
    prepWindows: [
      '1. Webcam visible + micrófono activo (obligatorio para validar autoría).',
      '2. Navegador abierto en el index.html generado por JavaDoc de EverOfficeComandes (target/site/apidocs/index.html).'
    ],
    script: `“Hola, soy Blanca Deuna. En este vídeo de la Parte 6 muestro la documentación HTML generada con JavaDoc para el proyecto EverOfficeComandes. Entramos en la clase ComandesServlet, revisamos la descripción de la clase y navegamos por sus métodos y parámetros documentados con las etiquetas @author, @param, @return y @throws.”`
  }
];

export default function ObsVideosWorkbench() {
  const [filterSubject, setFilterSubject] = useState('all'); // 'all' | 'int' | 'desp'
  const [copiedId, setCopiedId] = useState(null);
  const [openedFolderId, setOpenedFolderId] = useState(null);

  const [completedVideos, setCompletedVideos] = usePersistentState('obs_videos_completed_v1', {}, {
    category: 'ioc'
  });

  const toggleVideo = useCallback((id) => {
    setCompletedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setCompletedVideos]);

  const handleCopy = useCallback((text, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  const handleOpenFolder = useCallback((folderPath, id) => {
    fetch(`/api/open-folder?path=${encodeURIComponent(folderPath)}`);
    setOpenedFolderId(id);
    setTimeout(() => setOpenedFolderId(null), 3000);
  }, []);

  const visibleVideos = useMemo(() => {
    if (filterSubject === 'all') return OBS_VIDEOS;
    return OBS_VIDEOS.filter((v) => v.subject === filterSubject);
  }, [filterSubject]);

  const doneCount = useMemo(
    () => OBS_VIDEOS.filter((v) => Boolean(completedVideos[v.id])).length,
    [completedVideos]
  );

  return (
    <div className="eac2-workbench-root">
      <header className="eac2-header">
        <div className="eac2-header-left">
          <Link to="/" className="eac2-back-btn">
            ← Inicio Campus
          </Link>
          <span className="eac2-badge" style={{ background: '#7c3aed' }}>🎬 OBS STUDIO</span>
          <div className="eac2-header-title">
            <h1>Centro de Grabación de Vídeos OBS (Interfícies + Desplegament)</h1>
            <p>
              <strong>4 vídeos obligatorios en total</strong> · Prepara las ventanas, activa webcam + micro y graba del tirón.
            </p>
          </div>
        </div>

        <div className="eac2-header-actions">
          <Link to="/ioc/interfaces" className="eac2-Resource-btn">
            🟡 Ir a Interfícies
          </Link>
          <Link to="/desp/eac3" className="eac2-Resource-btn">
            🟢 Ir a Desplegament EAC 3
          </Link>
          <div className="eac2-progress-pill">
            <span>Grabados:</span>
            <strong>
              {doneCount}/{OBS_VIDEOS.length}
            </strong>
          </div>
        </div>
      </header>

      <div className="eac2-container">
        <div className="eac2-filter-tabs">
          <button
            type="button"
            className={`eac2-filter-tab ${filterSubject === 'all' ? 'active' : ''}`}
            onClick={() => setFilterSubject('all')}
          >
            🎬 Todos los Vídeos ({OBS_VIDEOS.length})
          </button>
          <button
            type="button"
            className={`eac2-filter-tab ${filterSubject === 'int' ? 'active' : ''}`}
            onClick={() => setFilterSubject('int')}
          >
            🟡 Interfícies EAC 2 (1)
          </button>
          <button
            type="button"
            className={`eac2-filter-tab ${filterSubject === 'desp' ? 'active' : ''}`}
            onClick={() => setFilterSubject('desp')}
          >
            🟢 Desplegament EAC 3 (3)
          </button>
        </div>

        <div className="eac2-tasks-section">
          {visibleVideos.map((vid) => {
            const isDone = Boolean(completedVideos[vid.id]);
            return (
              <article
                key={vid.id}
                className={`eac2-task-box ${isDone ? 'is-done' : ''}`}
              >
                <div className="eac2-task-header">
                  <div className="eac2-task-title-group">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleVideo(vid.id)}
                      className="eac2-checkbox"
                      id={`chk-${vid.id}`}
                    />
                    <span className="eac2-task-badge">{vid.subjectLabel}</span>
                    <span className="eac2-letters-badge">⏱️ {vid.duration}</span>
                    <label
                      htmlFor={`chk-${vid.id}`}
                      className={`eac2-task-title ${isDone ? 'done-text' : ''}`}
                    >
                      {vid.title}
                    </label>
                  </div>

                  <div className="eac2-task-meta-right">
                    <span className="eac2-machine-indicator">Entrega: {vid.deadline}</span>
                    <button
                      type="button"
                      onClick={() => handleOpenFolder(vid.folderPath, vid.id)}
                      className="eac2-copy-btn"
                    >
                      {openedFolderId === vid.id ? '✅ Abierta' : '📂 Abrir carpeta'}
                    </button>
                  </div>
                </div>

                <div className="eac2-deliverables-box" style={{ marginTop: '0.75rem' }}>
                  <div className="eac2-deliverables-title">
                    🖥️ Ventanas y requisitos antes de pulsar "Iniciar grabación" en OBS:
                  </div>
                  <ul className="eac2-deliverables-list">
                    {vid.prepWindows.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="eac2-textcopy-box" style={{ marginTop: '0.75rem' }}>
                  <div className="eac2-textcopy-header">
                    <strong>🎙️ Guion hablado listo para leer:</strong>
                    <button
                      type="button"
                      className={`eac2-copy-btn eac2-copy-text-btn ${copiedId === vid.id ? 'copied' : ''}`}
                      onClick={() => handleCopy(vid.script, vid.id)}
                    >
                      {copiedId === vid.id ? '✓ ¡Guion copiado!' : '📋 Copiar guion'}
                    </button>
                  </div>
                  <pre className="eac2-textcopy-content" style={{ whiteSpace: 'pre-wrap' }}>{vid.script}</pre>
                </div>

                <p className="eac2-task-desc" style={{ marginTop: '0.65rem', marginBottom: 0 }}>
                  📌 <strong>Destino:</strong> {vid.outputInfo}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
