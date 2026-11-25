import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import useLessonMarkdownComponents from '../viewers/LessonViewer/widgets/useLessonMarkdownComponents.jsx';
import AgentWorkingBanner from './AgentWorkingBanner.jsx';
import {
  chatWithAgent,
  createLessonFromAi,
  listNormalizedDocuments,
  runAgent,
  runMaterialPipeline,
  saveGlossaryConceptsToSearch,
  sendToTelegram,
  syncNormalizedDocuments,
  updateLessonContent
} from '../../api/agentsApi';

function extractUnitCode(unitText) {
  const match = String(unitText || '').match(/\bu(\d+)\b|unidad\s*(\d+)/i);
  if (match) return `u${match[1] || match[2]}`;
  return 'u1';
}

/**
 * Modal interactivo para ejecutar el pipeline Auditor -> Escritor sobre el material oficial
 * (PDFs en catalán en material/...) y comparar o generar Markdown listo para la web.
 */
export default function MaterialAgentModal({
  isOpen,
  onClose,
  subject,
  groupedLessons = {},
  activeLesson = null,
  activeUnitLabel,
  onApplied,
  accent = '#16a34a'
}) {
  const subjectCode = (subject?.code || subject?.id || 'desp').toLowerCase();
  const markdownComponents = useLessonMarkdownComponents({});
  const [unit, setUnit] = useState(() => extractUnitCode(activeUnitLabel));
  const [docs, setDocs] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [running, setRunning] = useState(false);
  const [runningGlossary, setRunningGlossary] = useState(false);
  const [result, setResult] = useState(null);
  const [glossaryResult, setGlossaryResult] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [copiedKey, setCopiedKey] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatAgent, setChatAgent] = useState('auditor');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatSending, setChatSending] = useState(false);
  const [applyingAction, setApplyingAction] = useState('');
  const [actionNotice, setActionNotice] = useState('');
  const [previousLessonSnapshot, setPreviousLessonSnapshot] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setUnit(extractUnitCode(activeUnitLabel));
    loadDocs();
  }, [isOpen, activeUnitLabel, subjectCode]);

  const availableUnits = useMemo(() => {
    const unitMap = new Map();

    Object.entries(groupedLessons || {}).forEach(([unitName, list]) => {
      const code = extractUnitCode(unitName);
      const existing = unitMap.get(code) || { code, label: unitName, lessonCount: 0, docCount: 0 };
      existing.label = unitName;
      existing.lessonCount += Array.isArray(list) ? list.length : 0;
      unitMap.set(code, existing);
    });

    docs.forEach((d) => {
      const source = d.unit || d.eacId || d.docId || d.title || '';
      const match = String(source).match(/\bu(\d+)\b|unidad\s*(\d+)/i);
      if (!match) return;
      const code = `u${match[1] || match[2]}`;
      const existing = unitMap.get(code) || { code, label: code.toUpperCase(), lessonCount: 0, docCount: 0 };
      existing.docCount += 1;
      unitMap.set(code, existing);
    });

    return Array.from(unitMap.values()).sort((a, b) => {
      const na = parseInt(a.code.replace(/\D/g, ''), 10) || 999;
      const nb = parseInt(b.code.replace(/\D/g, ''), 10) || 999;
      return na - nb;
    });
  }, [groupedLessons, docs]);

  useEffect(() => {
    if (availableUnits.length > 0 && !availableUnits.some((u) => u.code === unit)) {
      setUnit(availableUnits[0].code);
    }
  }, [availableUnits, unit]);

  const loadDocs = async () => {
    setLoadingDocs(true);
    setError('');
    try {
      const list = await listNormalizedDocuments({ subjectCode });
      setDocs(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los documentos normalizados.');
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setError('');
    try {
      await syncNormalizedDocuments();
      await loadDocs();
    } catch (e) {
      setError(e.message || 'Error al sincronizar material.');
    } finally {
      setSyncing(false);
    }
  };

  const handleRunPipeline = async () => {
    setRunning(true);
    setError('');
    setResult(null);
    try {
      const data = await runMaterialPipeline(subjectCode, unit);
      setResult(data);
      setActiveTab(data?.aiStatus === 'ok' && data?.finalMarkdown ? 'escritor' : 'auditor');
    } catch (e) {
      setError(e.message || 'Error ejecutando el pipeline Auditor -> Escritor.');
    } finally {
      setRunning(false);
    }
  };

  const handleRunGlossary = async () => {
    setRunningGlossary(true);
    setError('');
    try {
      const data = await runAgent('glosario', { subjectCode, unit });
      setGlossaryResult(data);
      setActiveTab('glosario');
    } catch (e) {
      setError(e.message || 'Error ejecutando el agente Glosario.');
    } finally {
      setRunningGlossary(false);
    }
  };

  const handleSendChat = async (e) => {
    if (e) e.preventDefault();
    const text = chatInput.trim();
    if (!text || chatSending) return;
    const nextMessages = [...chatMessages, { role: 'user', content: text }];
    setChatMessages(nextMessages);
    setChatInput('');
    setChatSending(true);
    setError('');
    try {
      const data = await chatWithAgent({
        agentId: chatAgent,
        subjectCode,
        unit,
        messages: nextMessages
      });
      if (data?.aiStatus === 'ok' && data?.answer) {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: data.answer, agentId: chatAgent }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            agentId: chatAgent,
            content: `⚠️ No se pudo obtener respuesta directa (${data?.aiMessage || 'error o IA no configurada'}).`,
            promptFallback: data?.prompt || ''
          }
        ]);
      }
    } catch (err) {
      setError(err.message || 'Error enviando mensaje al chat.');
    } finally {
      setChatSending(false);
    }
  };

  const sendResultToChat = (agentId, text) => {
    if (!text) return;
    setChatAgent(agentId);
    setChatMessages((prev) => [
      ...prev,
      { role: 'assistant', agentId, content: text }
    ]);
    setActiveTab('chat');
  };

  const triggerAgentOnProposal = async (targetAgent, instruction, proposalText) => {
    if (!proposalText || chatSending) return;
    const promptMsg = `${instruction}\n\n---\nPROPUESTA BASE:\n${proposalText}`;
    const nextMessages = [...chatMessages, { role: 'user', content: promptMsg }];
    setChatAgent(targetAgent);
    setChatMessages(nextMessages);
    setActiveTab('chat');
    setChatSending(true);
    setError('');
    try {
      const data = await chatWithAgent({
        agentId: targetAgent,
        subjectCode,
        unit,
        messages: nextMessages
      });
      if (data?.aiStatus === 'ok' && data?.answer) {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: data.answer, agentId: targetAgent }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', agentId: targetAgent, content: `⚠️ No se pudo ejecutar (${data?.aiMessage || 'error'}).` }
        ]);
      }
    } catch (err) {
      setError(err.message || 'Error ejecutando acción sobre la propuesta.');
    } finally {
      setChatSending(false);
    }
  };

  const handleUndoLastAiApply = async () => {
    if (!previousLessonSnapshot?.lesson) return;
    setApplyingAction('undo');
    setError('');
    try {
      await updateLessonContent(previousLessonSnapshot.lesson, previousLessonSnapshot.content);
      if (onApplied) await onApplied();
      setActionNotice(`↩️ Restaurada la versión anterior de "${previousLessonSnapshot.lesson.title}".`);
      setPreviousLessonSnapshot(null);
    } catch (err) {
      setError(err.message || 'No se pudo restaurar la versión anterior.');
    } finally {
      setApplyingAction('');
    }
  };

  const handleApplySuggestionsToWeb = async (suggestionsText) => {
    if (!suggestionsText) return;
    setApplyingAction('corregir');
    setChatSending(true);
    setError('');
    setActionNotice('');
    try {
      const data = await runAgent('corregir', {
        subjectCode,
        unit,
        suggestions: suggestionsText,
        currentContent: activeLesson?.content || ''
      });
      if (data?.aiStatus !== 'ok' || !data?.answer) {
        setError(data?.aiMessage || 'No se pudo completar la lección con la IA. Revisa tu configuración de IA en Ajustes.');
        return;
      }
      if (activeLesson) {
        const prevSnapshot = { lesson: activeLesson, content: activeLesson.content || '' };
        await updateLessonContent(activeLesson, data.answer);
        setPreviousLessonSnapshot(prevSnapshot);
        if (onApplied) await onApplied();
        const summaryMsg = `✅ **"${activeLesson.title}"** actualizada y guardada en la web incorporando las mejoras detectadas en la comparativa.`;
        setActionNotice(summaryMsg);
        if (activeTab === 'chat') {
          setChatMessages((prev) => [
            ...prev,
            { role: 'assistant', agentId: 'escritor', content: summaryMsg, isSystemNotice: true }
          ]);
        }
      } else {
        setResult((prev) => ({ ...(prev || {}), finalMarkdown: data.answer, aiStatus: 'ok' }));
        setActiveTab('escritor');
        setActionNotice('✅ Contenido completado con las sugerencias. Pulsa "📄 Nueva lección" para guardarlo en la web.');
      }
    } catch (err) {
      setError(err.message || 'Error al incorporar las sugerencias de la IA.');
    } finally {
      setApplyingAction('');
      setChatSending(false);
    }
  };

  const handleSendToTelegram = async (markdownText) => {
    if (!markdownText) return;
    setApplyingAction('telegram');
    setError('');
    setActionNotice('');
    try {
      const header = `🤖 *${subjectCode.toUpperCase()} (${unit.toUpperCase()})*\n\n`;
      await sendToTelegram(`${header}${markdownText}`);
      setActionNotice('📲 Propuesta enviada a tu Telegram.');
    } catch (err) {
      setError(err.message || 'No se pudo enviar a Telegram. Revisa tu bot en Configuración.');
    } finally {
      setApplyingAction('');
    }
  };

  const handleApplyAppendLesson = async (markdownText) => {
    if (!activeLesson || !markdownText) return;
    setApplyingAction('append');
    setError('');
    setActionNotice('');
    try {
      const combined = `${(activeLesson.content || '').trim()}\n\n${markdownText.trim()}`.trim();
      await updateLessonContent(activeLesson, combined);
      if (onApplied) await onApplied();
      setActionNotice(`✅ Propuesta añadida al final de "${activeLesson.title}".`);
    } catch (err) {
      setError(err.message || 'No se pudo añadir a la lección.');
    } finally {
      setApplyingAction('');
    }
  };

  const handleCreateNewLesson = async (markdownText) => {
    if (!subject?.id || !markdownText) return;
    const defaultUnit = activeLesson?.unit || availableUnits.find((u) => u.code === unit)?.label || unit.toUpperCase();
    const title = window.prompt('Título de la nueva lección:', `Ampliación ${unit.toUpperCase()}`);
    if (!title || !title.trim()) return;
    setApplyingAction('create');
    setError('');
    setActionNotice('');
    try {
      await createLessonFromAi({
        subjectId: subject.id,
        unit: defaultUnit,
        title: title.trim(),
        content: markdownText.trim(),
        orderIndex: 99
      });
      if (onApplied) await onApplied();
      setActionNotice(`✅ Nueva lección "${title.trim()}" creada en ${defaultUnit}.`);
    } catch (err) {
      setError(err.message || 'No se pudo crear la nueva lección.');
    } finally {
      setApplyingAction('');
    }
  };

  const handleSaveGlossary = async (rawText) => {
    if (!rawText) return;
    setApplyingAction('glossary');
    setError('');
    setActionNotice('');
    try {
      const res = await saveGlossaryConceptsToSearch(rawText);
      setActionNotice(`✅ Glosario actualizado en el buscador: ${res.added} añadidos, ${res.updated} actualizados.`);
    } catch (err) {
      setError(err.message || 'No se pudo guardar el glosario en el buscador.');
    } finally {
      setApplyingAction('');
    }
  };

  const handleCopy = async (key, text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2200);
    } catch {
      // Silencioso si el navegador bloquea clipboard
    }
  };

  if (!isOpen) return null;

  const unitDocs = docs.filter((d) =>
    String(d.unit || d.id || d.title || '').toLowerCase().includes(unit.toLowerCase())
  );
  const aiReady = result?.aiStatus === 'ok' || glossaryResult?.aiStatus === 'ok';
  const auditorOutput = result?.stage1?.answer || '';
  const auditorPrompt = result?.stage1?.prompt || '';
  const escritorOutput = result?.finalMarkdown || result?.stage2?.answer || '';
  const escritorPrompt = result?.stage2?.prompt || result?.stage2PromptTemplate || '';
  const glosarioOutput = glossaryResult?.answer || '';
  const glosarioPrompt = glossaryResult?.prompt || '';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(15, 23, 42, 0.58)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: isFullscreen ? 'stretch' : 'center',
        justifyContent: 'center',
        padding: isFullscreen ? 0 : '1rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isFullscreen ? '100vw' : 'min(920px, 100%)',
          height: isFullscreen ? '100vh' : 'auto',
          maxHeight: isFullscreen ? '100vh' : '88vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          border: isFullscreen ? 'none' : '1px solid var(--border-subtle)',
          borderRadius: isFullscreen ? 0 : '16px',
          padding: isFullscreen ? '1.35rem 2rem' : '1.35rem 1.5rem',
          boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
              ✨ Mejora de Temario: Auditor → Escritor
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <strong>1. Auditor</strong> revisa tus PDFs oficiales (catalán → español) y detecta huecos frente a la web.{' '}
              <strong>2. Escritor</strong> maqueta la lección en Markdown listo para publicar.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setIsFullscreen((v) => !v)}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Abrir a pantalla completa'}
              style={{
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-title)',
                borderRadius: '8px',
                padding: '0.3rem 0.65rem',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.82rem'
              }}
            >
              {isFullscreen ? '🗗 Reducir' : '⛶ Pantalla completa'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-title)',
                borderRadius: '8px',
                padding: '0.3rem 0.65rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Controles */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 700 }}>
            Unidad:
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{
                padding: '0.38rem 0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)',
                color: 'var(--text-title)',
                fontWeight: 700,
                maxWidth: '320px'
              }}
            >
              {availableUnits.length > 0 ? (
                availableUnits.map((u) => (
                  <option key={u.code} value={u.code}>
                    {u.label} ({u.docCount} PDF · {u.lessonCount} lecc.)
                  </option>
                ))
              ) : (
                <option value={unit}>{unit.toUpperCase()}</option>
              )}
            </select>
          </label>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {loadingDocs
              ? 'Buscando PDFs...'
              : `${unitDocs.length} doc(s) en ${unit.toUpperCase()} (${docs.length} totales en ${subjectCode.toUpperCase()})`}
          </span>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              style={{
                padding: '0.42rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)',
                color: 'var(--text-title)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: syncing ? 'wait' : 'pointer'
              }}
            >
              {syncing ? 'Sincronizando...' : '🔄 Sincronizar PDFs'}
            </button>

            <button
              type="button"
              onClick={handleRunPipeline}
              disabled={running}
              style={{
                padding: '0.42rem 0.95rem',
                borderRadius: '8px',
                border: 'none',
                background: accent,
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.83rem',
                cursor: running ? 'wait' : 'pointer'
              }}
            >
              {running ? '⏳ Ejecutando agentes...' : '🚀 Ejecutar Auditor → Escritor'}
            </button>

            <button
              type="button"
              onClick={handleRunGlossary}
              disabled={runningGlossary}
              style={{
                padding: '0.42rem 0.85rem',
                borderRadius: '8px',
                border: `1px solid ${accent}55`,
                background: `${accent}14`,
                color: accent,
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: runningGlossary ? 'wait' : 'pointer'
              }}
            >
              {runningGlossary ? '⏳ Extrayendo...' : '📖 Extraer Glosario'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 0.9rem', borderRadius: '10px', background: '#fef2f2', color: '#b91c1c', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {actionNotice && (
          <div style={{
            padding: '0.75rem 0.95rem',
            borderRadius: '10px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <span>{actionNotice}</span>
            {previousLessonSnapshot && (
              <button
                type="button"
                disabled={Boolean(applyingAction)}
                onClick={handleUndoLastAiApply}
                style={{
                  padding: '0.3rem 0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #86efac',
                  background: '#ffffff',
                  color: '#166534',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {applyingAction === 'undo' ? '⏳ Restaurando...' : '↩️ Deshacer último cambio IA'}
              </button>
            )}
          </div>
        )}

        {(running || runningGlossary || chatSending || syncing) && (
          <AgentWorkingBanner
            mode={running ? 'pipeline' : runningGlossary ? 'glossary' : syncing ? 'sync' : 'chat'}
            unitLabel={unit ? unit.toUpperCase() : ''}
            accent={accent}
          />
        )}

        {(result || glossaryResult || activeTab === 'chat') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {!aiReady && (result || glossaryResult) && (() => {
              const errMsg = result?.aiMessage || result?.stage2?.aiMessage || result?.stage1?.aiMessage || glossaryResult?.aiMessage || '';
              const isMissingConfig = !errMsg || /sin api|introduce primero|no hay|not configured/i.test(errMsg);
              return (
                <div style={{
                  padding: '0.75rem 0.95rem',
                  borderRadius: '10px',
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  color: '#92400e',
                  fontSize: '0.84rem'
                }}>
                  {isMissingConfig ? (
                    <>
                      <strong>IA externa no conectada aún</strong> ({errMsg || 'sin API key en Ajustes'}).
                      Puedes copiar los prompts ya preparados con el contenido de tus PDFs y pegarlos en tu IA, o configurar la API key en Ajustes.
                    </>
                  ) : (
                    <>
                      <strong>Aviso del motor de IA:</strong> {errMsg}
                    </>
                  )}
                </div>
              );
            })()}

            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('auditor')}
                style={{
                  padding: '0.38rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: activeTab === 'auditor' ? accent : 'var(--bg-subtle)',
                  color: activeTab === 'auditor' ? '#fff' : 'var(--text-title)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                1. Auditor {auditorOutput ? '✓' : '(Prompt listo)'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('escritor')}
                style={{
                  padding: '0.38rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: activeTab === 'escritor' ? accent : 'var(--bg-subtle)',
                  color: activeTab === 'escritor' ? '#fff' : 'var(--text-title)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                2. Escritor {escritorOutput ? '✓' : '(Plantilla lista)'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('glosario')}
                style={{
                  padding: '0.38rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: activeTab === 'glosario' ? accent : 'var(--bg-subtle)',
                  color: activeTab === 'glosario' ? '#fff' : 'var(--text-title)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                3. Glosario {glosarioOutput ? '✓' : glosarioPrompt ? '(Prompt listo)' : ''}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                style={{
                  padding: '0.38rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: activeTab === 'chat' ? accent : 'var(--bg-subtle)',
                  color: activeTab === 'chat' ? '#fff' : 'var(--text-title)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                💬 Chat ({chatMessages.length})
              </button>
            </div>

            {activeTab === 'auditor' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    {auditorOutput ? 'Informe y traducción del Auditor' : 'Prompt generado para el Auditor'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('auditor', auditorOutput || auditorPrompt)}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '7px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-title)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {copiedKey === 'auditor' ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                </div>
                {auditorOutput ? (
                  <>
                    <div
                      className="topic-body agent-markdown-body"
                      style={{
                        padding: '1rem 1.15rem',
                        borderRadius: '10px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        maxHeight: isFullscreen ? 'calc(100vh - 340px)' : '350px',
                        overflow: 'auto',
                        fontSize: '0.9rem',
                        lineHeight: 1.6
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>{auditorOutput}</ReactMarkdown>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        disabled={chatSending || Boolean(applyingAction)}
                        onClick={() => handleApplySuggestionsToWeb(auditorOutput)}
                        style={{ padding: '0.38rem 0.85rem', borderRadius: '8px', border: 'none', background: accent, color: '#fff', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        {applyingAction === 'corregir' ? '⏳ Completando web...' : '✨ Corregir incorporando sugerencias de la IA'}
                      </button>
                      <button
                        type="button"
                        disabled={chatSending}
                        onClick={() => triggerAgentOnProposal('escritor', 'Convierte esta auditoría en Markdown limpio listo para el Libro de MiCampus.', auditorOutput)}
                        style={{ padding: '0.34rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        ✍️ Pasar al Escritor
                      </button>
                      <button
                        type="button"
                        onClick={() => sendResultToChat('auditor', auditorOutput)}
                        style={{ padding: '0.34rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        💬 Seguir en el Chat
                      </button>
                    </div>
                  </>
                ) : (
                  <pre style={{
                    margin: 0,
                    padding: '0.9rem',
                    borderRadius: '10px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    maxHeight: isFullscreen ? 'calc(100vh - 300px)' : '340px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.82rem',
                    lineHeight: 1.5
                  }}>
                    {auditorPrompt}
                  </pre>
                )}
              </div>
            )}

            {activeTab === 'escritor' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    {escritorOutput ? 'Markdown maquetado por el Escritor' : 'Plantilla de prompt para el Escritor'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('escritor', escritorOutput || escritorPrompt)}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '7px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-title)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {copiedKey === 'escritor' ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                </div>
                {escritorOutput ? (
                  <>
                    <div
                      className="topic-body agent-markdown-body"
                      style={{
                        padding: '1rem 1.15rem',
                        borderRadius: '10px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        maxHeight: isFullscreen ? 'calc(100vh - 340px)' : '350px',
                        overflow: 'auto',
                        fontSize: '0.9rem',
                        lineHeight: 1.6
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>{escritorOutput}</ReactMarkdown>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        disabled={chatSending}
                        onClick={() => triggerAgentOnProposal('estilista', 'Revisa y pule el estilo visual (##/###, sin títulos duplicados ni números manuales, bloques de código limpios).', escritorOutput)}
                        style={{ padding: '0.34rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        🎨 Pulir con Estilista
                      </button>
                      {activeLesson && (
                        <button
                          type="button"
                          disabled={Boolean(applyingAction)}
                          onClick={() => handleApplyAppendLesson(escritorOutput)}
                          style={{ padding: '0.34rem 0.7rem', borderRadius: '8px', border: `1px solid ${accent}55`, background: `${accent}14`, color: accent, fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          ➕ Añadir a "{activeLesson.title.slice(0, 22)}{activeLesson.title.length > 22 ? '…' : ''}"
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={Boolean(applyingAction)}
                        onClick={() => handleCreateNewLesson(escritorOutput)}
                        style={{ padding: '0.34rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        📄 Nueva lección
                      </button>
                    </div>
                  </>
                ) : (
                  <pre style={{
                    margin: 0,
                    padding: '0.9rem',
                    borderRadius: '10px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    maxHeight: isFullscreen ? 'calc(100vh - 300px)' : '340px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.82rem',
                    lineHeight: 1.5
                  }}>
                    {escritorPrompt}
                  </pre>
                )}
              </div>
            )}

            {activeTab === 'glosario' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    {glosarioOutput ? 'Conceptos clave y JSON para Glosario / Búsqueda' : 'Prompt generado para el agente Glosario'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('glosario', glosarioOutput || glosarioPrompt)}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '7px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-title)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {copiedKey === 'glosario' ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                </div>
                {glosarioOutput ? (
                  <>
                    <div
                      className="topic-body agent-markdown-body"
                      style={{
                        padding: '1rem 1.15rem',
                        borderRadius: '10px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        maxHeight: isFullscreen ? 'calc(100vh - 340px)' : '350px',
                        overflow: 'auto',
                        fontSize: '0.9rem',
                        lineHeight: 1.6
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>{glosarioOutput}</ReactMarkdown>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        disabled={Boolean(applyingAction)}
                        onClick={() => handleSaveGlossary(glosarioOutput)}
                        style={{ padding: '0.34rem 0.75rem', borderRadius: '8px', border: 'none', background: accent, color: '#fff', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        📥 Guardar conceptos en Buscador
                      </button>
                      <button
                        type="button"
                        onClick={() => sendResultToChat('glosario', glosarioOutput)}
                        style={{ padding: '0.34rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        💬 Ajustar en el Chat
                      </button>
                    </div>
                  </>
                ) : (
                  <pre style={{
                    margin: 0,
                    padding: '0.9rem',
                    borderRadius: '10px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    maxHeight: isFullscreen ? 'calc(100vh - 300px)' : '340px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.82rem',
                    lineHeight: 1.5
                  }}>
                    {glosarioPrompt || 'Pulsa "📖 Extraer Glosario" para generar los conceptos clave de esta unidad.'}
                  </pre>
                )}
              </div>
            )}

            {activeTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.83rem', fontWeight: 700 }}>
                    Hablar con:
                    <select
                      value={chatAgent}
                      onChange={(e) => setChatAgent(e.target.value)}
                      style={{
                        padding: '0.32rem 0.6rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-card)',
                        color: 'var(--text-title)',
                        fontWeight: 700
                      }}
                    >
                      <option value="redactor-jefe">🧑‍💼 Redactor Jefe (coordina y valida)</option>
                      <option value="auditor">🔍 Auditor (contenido y huecos)</option>
                      <option value="escritor">✍️ Escritor (Markdown MiCampus)</option>
                      <option value="estilista">🎨 Estilista (jerarquía y estilo web)</option>
                      <option value="glosario">📖 Glosario (conceptos y búsqueda)</option>
                      <option value="eac-coach">🎓 Tutor de EACs</option>
                      <option value="sensei-agenda">🧠 Sensei Agenda</option>
                    </select>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {auditorOutput && (
                      <button
                        type="button"
                        onClick={() => sendResultToChat('auditor', auditorOutput)}
                        style={{ padding: '0.28rem 0.6rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        + Traer Auditor
                      </button>
                    )}
                    {escritorOutput && (
                      <button
                        type="button"
                        onClick={() => sendResultToChat('escritor', escritorOutput)}
                        style={{ padding: '0.28rem 0.6rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        + Traer Escritor
                      </button>
                    )}
                    {chatMessages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setChatMessages([])}
                        style={{ padding: '0.28rem 0.6rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        🗑️ Limpiar
                      </button>
                    )}
                  </div>
                </div>

                <div style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  background: 'var(--bg-subtle)',
                  padding: '0.85rem',
                  minHeight: isFullscreen ? '420px' : '240px',
                  maxHeight: isFullscreen ? 'calc(100vh - 330px)' : '380px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {chatMessages.length === 0 ? (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                      Escribe aquí para orientar al agente sobre <strong>{subjectCode.toUpperCase()} ({unit.toUpperCase()})</strong>.
                      <div style={{ marginTop: '0.45rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {[
                          'Compara el PDF oficial con el temario y dime qué falta',
                          'Redacta el apartado de VirtualHosts con ejemplos claros',
                          'Saca los 10 conceptos clave para el glosario'
                        ].map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => setChatInput(sug)}
                            style={{
                              padding: '0.28rem 0.6rem',
                              borderRadius: '999px',
                              border: '1px solid var(--border-subtle)',
                              background: 'var(--bg-card)',
                              color: 'var(--text-title)',
                              fontSize: '0.76rem',
                              cursor: 'pointer'
                            }}
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        style={{
                          alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: msg.role === 'user' ? '82%' : '94%',
                          padding: '0.75rem 0.95rem',
                          borderRadius: '12px',
                          background: msg.role === 'user' ? accent : 'var(--bg-card)',
                          color: msg.role === 'user' ? '#fff' : 'var(--text-main)',
                          border: msg.role === 'user' ? 'none' : '1px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                          whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
                          lineHeight: 1.55
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', fontSize: '0.74rem', fontWeight: 800, opacity: 0.85 }}>
                          <span>{msg.role === 'user' ? 'Tú' : `🤖 ${(msg.agentId || chatAgent).toUpperCase()}`}</span>
                          {msg.role === 'assistant' && (
                            <button
                              type="button"
                              onClick={() => handleCopy(`msg-${idx}`, msg.content)}
                              style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700 }}
                            >
                              {copiedKey === `msg-${idx}` ? '✓ Copiado' : '📋 Copiar'}
                            </button>
                          )}
                        </div>
                        {msg.role === 'assistant' ? (
                          <>
                            <div className="topic-body agent-markdown-body" style={{ fontSize: '0.88rem', lineHeight: 1.58 }}>
                              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                            {!msg.content.startsWith('⚠️') && !msg.isSystemNotice && (
                              <div style={{
                                marginTop: '0.65rem',
                                paddingTop: '0.55rem',
                                borderTop: '1px dashed var(--border-subtle)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.4rem',
                                alignItems: 'center'
                              }}>
                                <span style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.2rem' }}>
                                  Acciones:
                                </span>
                                <button
                                  type="button"
                                  disabled={chatSending || Boolean(applyingAction)}
                                  onClick={() => handleApplySuggestionsToWeb(msg.content)}
                                  style={{ padding: '0.28rem 0.65rem', borderRadius: '7px', border: 'none', background: accent, color: '#fff', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer' }}
                                >
                                  ✨ Corregir incorporando sugerencias de la IA
                                </button>
                                <button
                                  type="button"
                                  disabled={chatSending}
                                  onClick={() => triggerAgentOnProposal('escritor', 'Convierte esta propuesta en Markdown listo para el Libro de MiCampus.', msg.content)}
                                  style={{ padding: '0.26rem 0.55rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  ✍️ Pasar al Escritor
                                </button>
                                <button
                                  type="button"
                                  disabled={chatSending}
                                  onClick={() => triggerAgentOnProposal('estilista', 'Revisa y pule el estilo visual (##/###, sin títulos duplicados ni números manuales, bloques de código limpios).', msg.content)}
                                  style={{ padding: '0.26rem 0.55rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  🎨 Pulir con Estilista
                                </button>
                                {activeLesson && (
                                  <button
                                    type="button"
                                    disabled={Boolean(applyingAction)}
                                    onClick={() => handleApplyAppendLesson(msg.content)}
                                    style={{ padding: '0.26rem 0.55rem', borderRadius: '7px', border: `1px solid ${accent}55`, background: `${accent}14`, color: accent, fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                                  >
                                    ➕ Añadir a "{activeLesson.title.slice(0, 24)}{activeLesson.title.length > 24 ? '…' : ''}"
                                  </button>
                                )}
                                <button
                                  type="button"
                                  disabled={Boolean(applyingAction)}
                                  onClick={() => handleCreateNewLesson(msg.content)}
                                  style={{ padding: '0.26rem 0.55rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  📄 Nueva lección
                                </button>
                                <button
                                  type="button"
                                  disabled={Boolean(applyingAction)}
                                  onClick={() => handleSendToTelegram(msg.content)}
                                  style={{ padding: '0.26rem 0.55rem', borderRadius: '7px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-title)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  📲 Telegram
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          msg.content
                        )}
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <textarea
                    rows={2}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChat();
                      }
                    }}
                    placeholder="Escribe indicaciones para la IA (Enter para enviar, Shift+Enter salto de línea)..."
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.75rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-title)',
                      fontSize: '0.85rem',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={chatSending || !chatInput.trim()}
                    style={{
                      padding: '0.62rem 1rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: accent,
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: chatSending ? 'wait' : 'pointer',
                      opacity: !chatInput.trim() ? 0.6 : 1
                    }}
                  >
                    {chatSending ? '⏳...' : 'Enviar'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
