import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubjectUrl } from '../utils/subjectRoutes.js';
import SettingsUserTab from '../components/settings/SettingsUserTab.jsx';

const PROVIDER_OPTIONS = [
  { value: 'none', label: 'Sin API (Manual / IA web gratuita)' },
  { value: 'gemini', label: 'Google Gemini (Nube)' },
  { value: 'openai', label: 'OpenAI ChatGPT (Nube)' },
  { value: 'anthropic', label: 'Anthropic Claude (Nube)' },
  { value: 'ollama', label: 'Ollama (IA Local en tu PC)' },
  { value: 'custom_openai', label: 'Endpoint OpenAI-compatible (LM Studio, llama.cpp, Groq, OpenRouter...)' },
];

const MENU_ITEMS = [
  { id: 'usuario', icon: '👤', label: 'Usuario y Acceso', desc: 'Perfil, título y contraseña web' },
  { id: 'ia-local', icon: '💻', label: 'IA Local', desc: 'Ollama, LM Studio y llama.cpp' },
  { id: 'ia-nube', icon: '☁️', label: 'IA en la Nube', desc: 'Gemini, OpenAI, Claude, Groq…' },
  { id: 'respaldos', icon: '🛡️', label: 'Orden de IAs (4 Slots)', desc: 'Slot 1 → 2 → 3 → 4 si algo falla' },
  { id: 'telegram', icon: '📱', label: 'Bot de Telegram', desc: '@BotFather para tu móvil' },
  { id: 'soul', icon: '🎭', label: 'SOUL.md y Avisos', desc: 'TDAH, neurodivergente, silencio, notas' },
  { id: 'correo', icon: '📧', label: 'Correo IOC y Chrome', desc: 'Detectar notas por email y extensión' },
  { id: 'accesos', icon: '🔗', label: 'Accesos Directos', desc: 'Webs externas y secciones internas' },
  { id: 'datos', icon: '💾', label: 'Copias y Calendario', desc: 'Exportar JSON e .ics' },
];

const INITIAL_FORM = {
  userName: 'Estudiante',
  campusTitle: 'MiCampus',
  subtitle: '',
  authEnabled: false,
  authUsername: '',
  authPassword: '',
  contactEmail: '',
  newsletterEnabled: false,
  aiProvider: 'none',
  aiModel: '',
  aiIntensity: 'medium',
  geminiApiKey: '',
  openaiApiKey: '',
  anthropicApiKey: '',
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3.2',
  customAiBaseUrl: '',
  customAiApiKey: '',
  customAiModel: '',
  telegramEnabled: false,
  telegramBotToken: '',
  telegramChatId: '',
  telegramBotPrompt: '',
  telegramRemindersEnabled: true,
  telegramAllowActions: true,
  botCallMe: '',
  botSoulProfile: 'default',
  botSoulMarkdown: '',
  botQuietHoursEnabled: false,
  botQuietStart: '23:00',
  botQuietEnd: '08:00',
  botUrgentDaysBefore: 2,
  botWeeklyDigestEnabled: true,
  botWeeklyDigestDay: 'MONDAY',
  botWeeklyDigestHour: 9,
  botNotifyGrades: true,
  emailWatcherEnabled: false,
  emailImapHost: 'imap.gmail.com',
  emailImapPort: 993,
  emailImapUser: '',
  emailImapPassword: '',
  emailKeywords: 'comentario en la tarea,ha fet un comentari,qualificat,calificado,retroacció,EAC,PAF,nota',
  aiFallbacks: [],
  quickLinks: [],
  officialLinks: [],
  sectionLinks: [],
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('usuario');
  const [localEngine, setLocalEngine] = useState('ollama');
  const [targetSlot, setTargetSlot] = useState(1);
  const [manualModelMode, setManualModelMode] = useState(false);
  const [dragSlotIdx, setDragSlotIdx] = useState(null);
  const [dragOverSlotIdx, setDragOverSlotIdx] = useState(null);
  const [dragLink, setDragLink] = useState(null);
  const [dragOverLinkGroup, setDragOverLinkGroup] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingAi, setTestingAi] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [fallbackModels, setFallbackModels] = useState({});
  const [fallbackTestStatus, setFallbackTestStatus] = useState({});
  const [statusBanner, setStatusBanner] = useState(null);
  const [testingTg, setTestingTg] = useState(false);
  const [tgStatus, setTgStatus] = useState(null);
  const [testingEmail, setTestingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  useEffect(() => {
    let active = true;
    fetch('/api/campus')
      .then((res) => res.json())
      .then((data) => {
        if (!active || !data?.config) return;
        if (Array.isArray(data.subjects)) setSubjects(data.subjects);
        const c = data.config;
        setForm({
          userName: c.userName || 'Estudiante',
          campusTitle: c.campusTitle || 'MiCampus',
          subtitle: c.subtitle || '',
          authEnabled: Boolean(c.authEnabled),
          authUsername: c.authUsername || '',
          authPassword: '',
          contactEmail: c.contactEmail || '',
          newsletterEnabled: Boolean(c.newsletterEnabled),
          aiProvider: c.aiProvider || 'none',
          aiModel: c.aiModel || '',
          aiIntensity: c.aiIntensity || 'medium',
          geminiApiKey: c.geminiApiKey || '',
          openaiApiKey: c.openaiApiKey || '',
          anthropicApiKey: c.anthropicApiKey || '',
          ollamaUrl: c.ollamaUrl || 'http://localhost:11434',
          ollamaModel: c.ollamaModel || 'llama3.2',
          customAiBaseUrl: c.customAiBaseUrl || '',
          customAiApiKey: c.customAiApiKey || '',
          customAiModel: c.customAiModel || '',
          telegramEnabled: Boolean(c.telegramEnabled),
          telegramBotToken: c.telegramBotToken || '',
          telegramChatId: c.telegramChatId || '',
          telegramBotPrompt: c.telegramBotPrompt || '',
          telegramRemindersEnabled: c.telegramRemindersEnabled !== false,
          telegramAllowActions: c.telegramAllowActions !== false,
          botCallMe: c.botCallMe || '',
          botSoulProfile: c.botSoulProfile || 'default',
          botSoulMarkdown: c.botSoulMarkdown || '',
          botQuietHoursEnabled: Boolean(c.botQuietHoursEnabled),
          botQuietStart: c.botQuietStart || '23:00',
          botQuietEnd: c.botQuietEnd || '08:00',
          botUrgentDaysBefore: typeof c.botUrgentDaysBefore === 'number' ? c.botUrgentDaysBefore : 2,
          botWeeklyDigestEnabled: c.botWeeklyDigestEnabled !== false,
          botWeeklyDigestDay: c.botWeeklyDigestDay || 'MONDAY',
          botWeeklyDigestHour: typeof c.botWeeklyDigestHour === 'number' ? c.botWeeklyDigestHour : 9,
          botNotifyGrades: c.botNotifyGrades !== false,
          emailWatcherEnabled: Boolean(c.emailWatcherEnabled),
          emailImapHost: c.emailImapHost || 'imap.gmail.com',
          emailImapPort: typeof c.emailImapPort === 'number' ? c.emailImapPort : 993,
          emailImapUser: c.emailImapUser || '',
          emailImapPassword: '',
          emailKeywords: c.emailKeywords || 'comentario en la tarea,ha fet un comentari,qualificat,calificado,retroacció,EAC,PAF,nota',
          aiFallbacks: Array.isArray(c.aiFallbacks) ? c.aiFallbacks : [],
          quickLinks: Array.isArray(c.quickLinks) ? c.quickLinks : [],
          officialLinks: Array.isArray(c.officialLinks) ? c.officialLinks : [],
          sectionLinks: Array.isArray(c.sectionLinks) ? c.sectionLinks : [],
        });
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Auto-refresco del Chat ID mientras espera /start en Telegram
  useEffect(() => {
    if (!form.telegramEnabled || form.telegramChatId) return;
    const timer = setInterval(() => {
      fetch('/api/campus')
        .then((r) => r.json())
        .then((d) => {
          const detected = d?.config?.telegramChatId;
          if (detected) {
            setForm((prev) => ({ ...prev, telegramChatId: detected }));
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(timer);
  }, [form.telegramEnabled, form.telegramChatId]);

  // Auto-cargar modelos locales al entrar en IA Local
  useEffect(() => {
    if (activeTab !== 'ia-local') return;
    handleLoadModels(localEngine);
  }, [activeTab, localEngine]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === 'aiProvider' ? { aiModel: '' } : {}),
    }));
    if (key === 'aiProvider') {
      setAvailableModels([]);
      setStatusBanner(null);
    }
  };

  const saveConfig = async (overrideForm) => {
    const payload = overrideForm || form;
    setSaving(true);
    setStatusBanner(null);
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatusBanner({ ok: true, text: '✅ Configuración guardada en SQLite.' });
    } catch (err) {
      setStatusBanner({ ok: false, text: `❌ Error al guardar: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleLoadModels = async (providerOverride) => {
    setLoadingModels(true);
    setStatusBanner(null);
    const body = providerOverride ? { ...form, aiProvider: providerOverride } : form;
    try {
      const res = await fetch('/api/scripts/ai-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.status === 'ok') {
        const list = Array.isArray(data.models) ? data.models : [];
        setAvailableModels(list);
        setStatusBanner(
          list.length === 0
            ? { ok: false, text: 'No se encontraron modelos en este proveedor.' }
            : { ok: true, text: `✅ ${list.length} modelos cargados.` }
        );
      } else {
        setStatusBanner({ ok: false, text: `❌ ${data.message || 'No se pudieron cargar los modelos.'}` });
      }
    } catch (err) {
      setStatusBanner({ ok: false, text: `❌ Error cargando modelos: ${err.message}` });
    } finally {
      setLoadingModels(false);
    }
  };

  const handleTestAi = async (customProfile) => {
    setTestingAi(true);
    setStatusBanner(null);
    try {
      if (!customProfile) {
        const saveRes = await fetch('/api/config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!saveRes.ok) throw new Error(`HTTP ${saveRes.status}`);
      }
      const res = await fetch('/api/scripts/ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: customProfile ? JSON.stringify(customProfile) : undefined,
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setStatusBanner({ ok: true, text: `🤖 Respuesta de tu IA: ${data.reply}` });
      } else {
        setStatusBanner({ ok: false, text: `❌ ${data.message || 'No se pudo conectar con la IA.'}` });
      }
    } catch (err) {
      setStatusBanner({ ok: false, text: `❌ Error probando IA: ${err.message}` });
    } finally {
      setTestingAi(false);
    }
  };

  const handleTestTelegram = async () => {
    setTestingTg(true);
    setTgStatus(null);
    try {
      const saveRes = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!saveRes.ok) throw new Error(`HTTP ${saveRes.status}`);
      const res = await fetch('/api/scripts/telegram-test', { method: 'POST' });
      const data = await res.json();
      setTgStatus(
        data.status === 'ok'
          ? { ok: true, text: `✅ ${data.message || 'Mensaje de prueba enviado a Telegram.'}` }
          : { ok: false, text: `❌ ${data.message || 'No se pudo enviar el mensaje.'}` }
      );
    } catch (err) {
      setTgStatus({ ok: false, text: `❌ Error probando Telegram: ${err.message}` });
    } finally {
      setTestingTg(false);
    }
  };

  const padFallbacks = (list) => {
    const arr = Array.isArray(list) ? list.slice(0, 3) : [];
    while (arr.length < 3) {
      const n = arr.length + 1;
      arr.push({
        id: `slot_${n + 1}`,
        label: `Slot ${n + 1}`,
        enabled: false,
        provider: 'none',
        model: '',
        intensity: 'medium',
        apiKey: '',
        baseUrl: '',
      });
    }
    return arr;
  };

  const getSlot1Profile = (f = form) => {
    const p = f.aiProvider || 'none';
    return {
      id: 'slot_1',
      label: 'Slot 1 (Principal)',
      enabled: p !== 'none',
      provider: p,
      model: f.aiModel || '',
      intensity: f.aiIntensity || 'medium',
      apiKey: p === 'gemini' ? f.geminiApiKey : p === 'openai' ? f.openaiApiKey : p === 'anthropic' ? f.anthropicApiKey : p === 'custom_openai' ? f.customAiApiKey : '',
      baseUrl: p === 'ollama' ? f.ollamaUrl : p === 'custom_openai' ? f.customAiBaseUrl : '',
    };
  };

  const applySlot1ToForm = (f, slot) => {
    const p = slot.provider || 'none';
    return {
      ...f,
      aiProvider: p,
      aiModel: slot.model || '',
      aiIntensity: slot.intensity || 'medium',
      ...(p === 'gemini' ? { geminiApiKey: slot.apiKey || '' } : {}),
      ...(p === 'openai' ? { openaiApiKey: slot.apiKey || '' } : {}),
      ...(p === 'anthropic' ? { anthropicApiKey: slot.apiKey || '' } : {}),
      ...(p === 'ollama' ? { ollamaUrl: slot.baseUrl || 'http://localhost:11434' } : {}),
      ...(p === 'custom_openai' ? { customAiBaseUrl: slot.baseUrl || '', customAiApiKey: slot.apiKey || '' } : {}),
    };
  };

  const saveCurrentToSlot = (slotNum, providerOverride) => {
    const slotProfile = getSlot1Profile({
      ...form,
      ...(providerOverride ? { aiProvider: providerOverride } : {}),
    });
    if (slotNum === 1) {
      const next = providerOverride ? { ...form, aiProvider: providerOverride } : form;
      setForm(next);
      saveConfig(next);
      return;
    }
    const fallbacks = padFallbacks(form.aiFallbacks);
    fallbacks[slotNum - 2] = {
      ...slotProfile,
      id: `slot_${slotNum}`,
      label: `Slot ${slotNum}`,
      enabled: slotProfile.provider !== 'none',
    };
    const next = { ...form, aiFallbacks: fallbacks };
    setForm(next);
    saveConfig(next);
  };

  const moveAnySlot = (slotIdx, delta) => {
    // slotIdx: 0 = Slot 1 (Principal), 1..3 = aiFallbacks[0..2]
    const targetIdx = slotIdx + delta;
    if (targetIdx < 0 || targetIdx > 3) return;
    const allSlots = [getSlot1Profile(form), ...padFallbacks(form.aiFallbacks)];
    [allSlots[slotIdx], allSlots[targetIdx]] = [allSlots[targetIdx], allSlots[slotIdx]];
    let nextForm = applySlot1ToForm(form, allSlots[0]);
    nextForm = { ...nextForm, aiFallbacks: allSlots.slice(1) };
    setForm(nextForm);
  };

  const moveSlotTo = (fromIdx, toIdx) => {
    if (fromIdx === null || toIdx === null || fromIdx === toIdx) return;
    if (fromIdx < 0 || fromIdx > 3 || toIdx < 0 || toIdx > 3) return;
    const allSlots = [getSlot1Profile(form), ...padFallbacks(form.aiFallbacks)];
    const [moved] = allSlots.splice(fromIdx, 1);
    allSlots.splice(toIdx, 0, moved);
    let nextForm = applySlot1ToForm(form, allSlots[0]);
    nextForm = { ...nextForm, aiFallbacks: allSlots.slice(1) };
    setForm(nextForm);
  };

  const dropModelIntoSlot = (modelId, slotIdx, provider, baseUrl) => {
    if (!modelId || slotIdx < 0 || slotIdx > 3) return;
    const allSlots = [getSlot1Profile(form), ...padFallbacks(form.aiFallbacks)];
    allSlots[slotIdx] = {
      ...allSlots[slotIdx],
      enabled: true,
      provider,
      model: modelId,
      intensity: form.aiIntensity || 'medium',
      baseUrl: baseUrl || (provider === 'ollama' ? 'http://localhost:11434' : 'http://localhost:1234/v1'),
      apiKey: '',
    };
    let nextForm = applySlot1ToForm(form, allSlots[0]);
    nextForm = { ...nextForm, aiFallbacks: allSlots.slice(1) };
    setForm(nextForm);
  };

  const addFallback = (preset) => {
    setForm((prev) => ({
      ...prev,
      aiFallbacks: [
        ...(prev.aiFallbacks || []),
        {
          id: `fb_${Date.now()}`,
          label: preset?.label || `Respaldo ${(prev.aiFallbacks?.length || 0) + 1}`,
          enabled: true,
          provider: preset?.provider || 'gemini',
          model: preset?.model || '',
          intensity: preset?.intensity || 'medium',
          apiKey: preset?.apiKey || '',
          baseUrl: preset?.baseUrl || '',
        },
      ],
    }));
  };

  const updateFallback = (index, patch) => {
    setForm((prev) => {
      const next = [...(prev.aiFallbacks || [])];
      next[index] = { ...next[index], ...patch };
      return { ...prev, aiFallbacks: next };
    });
  };

  const moveFallback = (index, delta) => {
    setForm((prev) => {
      const next = [...(prev.aiFallbacks || [])];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, aiFallbacks: next };
    });
  };

  const removeFallback = (index) => {
    setForm((prev) => ({
      ...prev,
      aiFallbacks: (prev.aiFallbacks || []).filter((_, i) => i !== index),
    }));
  };

  const loadFallbackModels = async (index) => {
    const fb = form.aiFallbacks[index];
    if (!fb) return;
    const payload = {
      aiProvider: fb.provider,
      geminiApiKey: fb.provider === 'gemini' ? fb.apiKey : '',
      openaiApiKey: fb.provider === 'openai' ? fb.apiKey : '',
      anthropicApiKey: fb.provider === 'anthropic' ? fb.apiKey : '',
      ollamaUrl: fb.provider === 'ollama' ? (fb.baseUrl || 'http://localhost:11434') : '',
      customAiBaseUrl: fb.provider === 'custom_openai' ? fb.baseUrl : '',
      customAiApiKey: fb.provider === 'custom_openai' ? fb.apiKey : '',
    };
    try {
      const res = await fetch('/api/scripts/ai-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setFallbackModels((prev) => ({ ...prev, [fb.id || index]: data.models || [] }));
        setFallbackTestStatus((prev) => ({ ...prev, [fb.id || index]: { ok: true, text: `✅ ${(data.models || []).length} modelos cargados.` } }));
      } else {
        setFallbackTestStatus((prev) => ({ ...prev, [fb.id || index]: { ok: false, text: `❌ ${data.message}` } }));
      }
    } catch (err) {
      setFallbackTestStatus((prev) => ({ ...prev, [fb.id || index]: { ok: false, text: `❌ ${err.message}` } }));
    }
  };

  const testFallback = async (index) => {
    const fb = form.aiFallbacks[index];
    if (!fb) return;
    const key = fb.id || index;
    setFallbackTestStatus((prev) => ({ ...prev, [key]: { ok: true, text: 'Probando...' } }));
    try {
      const res = await fetch('/api/scripts/ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fb),
      });
      const data = await res.json();
      setFallbackTestStatus((prev) => ({
        ...prev,
        [key]: data.status === 'ok' ? { ok: true, text: `🤖 ${data.reply}` } : { ok: false, text: `❌ ${data.message}` },
      }));
    } catch (err) {
      setFallbackTestStatus((prev) => ({ ...prev, [key]: { ok: false, text: `❌ ${err.message}` } }));
    }
  };

  const cardStyle = {
    background: 'var(--bg-card, #ffffff)',
    border: '1px solid var(--border-subtle, #e2e8f0)',
    borderRadius: '14px',
    padding: '1.4rem',
    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.84rem',
    fontWeight: 700,
    color: 'var(--text-title, #0f172a)',
    marginBottom: '0.35rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.58rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--border-subtle, #cbd5e1)',
    background: 'var(--bg-page, #f8fafc)',
    color: 'var(--text-title, #0f172a)',
    fontSize: '0.89rem',
    boxSizing: 'border-box',
  };

  const btnPrimaryStyle = {
    padding: '0.55rem 1.05rem',
    borderRadius: '8px',
    border: 'none',
    background: 'var(--c-blue, #2563eb)',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '0.87rem',
    cursor: 'pointer',
  };

  const btnSecondaryStyle = {
    padding: '0.55rem 1.05rem',
    borderRadius: '8px',
    border: '1px solid var(--border-subtle, #cbd5e1)',
    background: 'var(--bg-hover, #f1f5f9)',
    color: 'var(--text-title, #0f172a)',
    fontWeight: 700,
    fontSize: '0.87rem',
    cursor: 'pointer',
  };

  const renderModelAndIntensityBox = (providerHint) => (
    <div style={{ marginTop: '0.9rem', marginBottom: '1rem', padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.45rem' }}>
        <label htmlFor="aiModel" style={{ ...labelStyle, marginBottom: 0 }}>
          Modelo de IA (vacío = automático)
        </label>
        <button
          type="button"
          onClick={() => handleLoadModels(providerHint)}
          disabled={loadingModels}
          style={{ ...btnSecondaryStyle, padding: '0.32rem 0.7rem', fontSize: '0.8rem' }}
        >
          {loadingModels ? 'Cargando...' : '🔄 Cargar modelos disponibles'}
        </button>
      </div>

      {availableModels.length > 0 && !manualModelMode ? (
        <select
          aria-label="Seleccionar modelo cargado"
          value={availableModels.some((m) => m.id === form.aiModel) ? form.aiModel : ''}
          onChange={(e) => {
            if (e.target.value === '__manual__') {
              setManualModelMode(true);
            } else {
              updateField('aiModel', e.target.value);
            }
          }}
          style={inputStyle}
        >
          <option value="">-- Elige un modelo de la lista ({availableModels.length}) --</option>
          {availableModels.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label || m.id}
            </option>
          ))}
          <option value="__manual__">✍️ Escribir otro modelo manualmente...</option>
        </select>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            id="aiModel"
            type="text"
            placeholder="Ej. gemma4:26b, gemini-flash-latest, gpt-4o, claude-sonnet-4-0..."
            value={form.aiModel}
            onChange={(e) => updateField('aiModel', e.target.value)}
            style={inputStyle}
          />
          {availableModels.length > 0 && (
            <button type="button" onClick={() => setManualModelMode(false)} style={{ ...btnSecondaryStyle, whiteSpace: 'nowrap', padding: '0.5rem 0.7rem', fontSize: '0.8rem' }}>
              Lista
            </button>
          )}
        </div>
      )}

      <div style={{ marginTop: '0.75rem' }}>
        <label htmlFor="aiIntensity" style={labelStyle}>Intensidad de respuesta</label>
        <select
          id="aiIntensity"
          value={form.aiIntensity}
          onChange={(e) => updateField('aiIntensity', e.target.value)}
          style={inputStyle}
        >
          <option value="low">⚡ Ligera (rápida, respuestas breves y menor gasto de tokens)</option>
          <option value="medium">⚖️ Equilibrada (recomendada)</option>
          <option value="high">🧠 Profunda (máximo detalle, razonamiento y extensión)</option>
        </select>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '1.5rem 1.25rem 3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.55rem', color: 'var(--text-title, #0f172a)' }}>
            ⚙️ Configuración de MiCampus
          </h1>
          <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted, #64748b)' }}>
            Gestiona tu usuario, contraseña de acceso, IA local, APIs en la nube, respaldos y tu bot de Telegram.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
            {saving ? 'Guardando...' : '💾 Guardar cambios'}
          </button>
          <Link to="/" style={{ ...btnSecondaryStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* Barra rápida de estado y navegación directa */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {[
          {
            tab: 'usuario',
            label: form.authEnabled && form.authUsername.trim() ? `🔒 Login activo (${form.authUsername.trim()})` : '🔓 Sin contraseña',
            active: form.authEnabled && Boolean(form.authUsername.trim())
          },
          {
            tab: 'ia-local',
            label: form.aiProvider === 'ollama' ? '🦙 IA: Ollama' : form.aiProvider === 'llamacpp' ? '⚡ IA: llama.cpp' : '✨ IA: Gemini / Nube',
            active: true
          },
          {
            tab: 'telegram',
            label: form.telegramEnabled && form.telegramBotToken ? '🤖 Telegram conectado' : '🤖 Telegram inactivo',
            active: Boolean(form.telegramEnabled && form.telegramBotToken)
          }
        ].map((pill) => (
          <button
            key={pill.tab}
            type="button"
            onClick={() => setActiveTab(pill.tab)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              border: `1px solid ${pill.active ? '#bfdbfe' : 'var(--border-subtle, #e2e8f0)'}`,
              background: pill.active ? 'var(--bg-selected, #eff6ff)' : 'var(--bg-card, #ffffff)',
              color: pill.active ? 'var(--accent-primary, #1d4ed8)' : 'var(--text-muted, #64748b)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={cardStyle}>Cargando configuración...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(230px, 270px) 1fr', gap: '1.25rem', alignItems: 'start' }}>
          {/* MENÚ LATERAL IZQUIERDO (ASIDE) */}
          <aside style={{ ...cardStyle, padding: '0.85rem', position: 'sticky', top: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted, #64748b)', padding: '0.25rem 0.5rem 0.6rem' }}>
              Secciones
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {MENU_ITEMS.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setStatusBanner(null);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '10px',
                      border: active ? '1px solid var(--c-blue, #3b82f6)' : '1px solid transparent',
                      background: active ? 'var(--bg-hover, #eff6ff)' : 'transparent',
                      color: 'var(--text-title, #0f172a)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', lineHeight: 1.2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted, #64748b)' }}>{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div style={{ marginTop: '0.9rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle, #e2e8f0)', fontSize: '0.78rem', color: 'var(--text-muted, #64748b)', display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingLeft: '0.35rem' }}>
              <div><strong>Principal:</strong> {form.aiProvider} {form.aiModel ? `(${form.aiModel})` : ''}</div>
              <div><strong>Respaldos:</strong> {(form.aiFallbacks || []).filter((f) => f.enabled !== false).length} activo(s)</div>
              <div><strong>Telegram:</strong> {form.telegramEnabled ? '🟢 Activo' : '⚪ Apagado'}</div>
              <div><strong>Bloqueo web:</strong> {form.authEnabled ? '🔒 Protegido' : '🔓 Abierto'}</div>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL DE LA SECCIÓN ACTIVA */}
          <main>
            {activeTab === 'usuario' && (
              <SettingsUserTab
                form={form}
                updateField={updateField}
                saveConfig={saveConfig}
                saving={saving}
                cardStyle={cardStyle}
                inputStyle={inputStyle}
                labelStyle={labelStyle}
                btnPrimaryStyle={btnPrimaryStyle}
                btnSecondaryStyle={btnSecondaryStyle}
              />
            )}

            {activeTab === 'ia-local' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>💻 IA Local (Ollama / LM Studio / llama.cpp)</h2>
                <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Elige tu motor local, detecta tus modelos y asígnalos a los <strong>4 Slots</strong> (arrastrando o seleccionando en cada slot).
                </p>

                {/* PASO 1: MOTOR + URL + DETECTAR + INTENSIDAD */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.65rem', alignItems: 'end', marginBottom: '1rem', padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
                  <div>
                    <label style={labelStyle}>1. Motor local</label>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setLocalEngine('ollama')}
                        style={{ ...(localEngine === 'ollama' ? btnPrimaryStyle : btnSecondaryStyle), flex: 1, padding: '0.5rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        🦙 Ollama
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLocalEngine('lmstudio');
                          if (!form.customAiBaseUrl || form.customAiBaseUrl === 'http://localhost:8080/v1') {
                            updateField('customAiBaseUrl', 'http://localhost:1234/v1');
                          }
                        }}
                        style={{ ...(localEngine === 'lmstudio' || localEngine === 'custom_openai' ? btnPrimaryStyle : btnSecondaryStyle), flex: 1, padding: '0.5rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        🧩 LM Studio
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLocalEngine('llamacpp');
                          if (!form.customAiBaseUrl || form.customAiBaseUrl === 'http://localhost:1234/v1') {
                            updateField('customAiBaseUrl', 'http://localhost:8080/v1');
                          }
                        }}
                        style={{ ...(localEngine === 'llamacpp' ? btnPrimaryStyle : btnSecondaryStyle), flex: 1, padding: '0.5rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        ⚡ llama.cpp
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>URL del servidor</label>
                    {localEngine !== 'ollama' ? (
                      <input
                        type="text"
                        placeholder={localEngine === 'llamacpp' ? 'http://localhost:8080/v1' : 'http://localhost:1234/v1'}
                        value={form.customAiBaseUrl}
                        onChange={(e) => updateField('customAiBaseUrl', e.target.value)}
                        style={inputStyle}
                      />
                    ) : (
                      <input type="text" placeholder="http://localhost:11434" value={form.ollamaUrl} onChange={(e) => updateField('ollamaUrl', e.target.value)} style={inputStyle} />
                    )}
                  </div>

                  <div>
                    <label style={labelStyle}>Intensidad</label>
                    <select value={form.aiIntensity} onChange={(e) => updateField('aiIntensity', e.target.value)} style={inputStyle}>
                      <option value="low">⚡ Ligera</option>
                      <option value="medium">⚖️ Equilibrada</option>
                      <option value="high">🧠 Profunda</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleLoadModels(localEngine === 'ollama' ? 'ollama' : 'custom_openai')}
                      disabled={loadingModels}
                      style={{ ...btnSecondaryStyle, width: '100%' }}
                    >
                      {loadingModels ? 'Cargando...' : '🔄 Detectar modelos'}
                    </button>
                  </div>
                </div>

                {/* PASO 2: MODELOS DETECTADOS (ARRASTRABLES) */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.45rem' }}>
                    2. Modelos detectados ({availableModels.length}) — arrástralos a un slot o elígelos abajo:
                  </div>
                  {availableModels.length === 0 ? (
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-muted, #64748b)', padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'var(--bg-page, #f8fafc)', border: '1px dashed var(--border-subtle, #cbd5e1)' }}>
                      No se detectaron modelos en {localEngine === 'ollama' ? 'Ollama' : localEngine === 'llamacpp' ? 'llama.cpp (llama-server)' : 'LM Studio'}. Ábrelo y pulsa <strong>🔄 Detectar modelos</strong>.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {availableModels.map((m) => (
                        <span
                          key={m.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/x-micampus-model', m.id);
                            setDragSlotIdx(null);
                          }}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '999px',
                            background: 'var(--bg-card, #ffffff)',
                            border: '1px solid var(--c-blue, #3b82f6)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'grab',
                            userSelect: 'none',
                          }}
                        >
                          ⠿ {m.id}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* PASO 3: 4 SLOTS EN ORDEN CON SELECTOR DIRECTO + DRAG & DROP */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.45rem' }}>
                    3. Orden de prioridad (si falla el Slot 1, salta automáticamente al 2 → 3 → 4):
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {[getSlot1Profile(form), ...padFallbacks(form.aiFallbacks)].map((slot, sIdx) => {
                      const localProvider = localEngine === 'ollama' ? 'ollama' : 'custom_openai';
                      const localUrl = localEngine !== 'ollama' ? form.customAiBaseUrl : form.ollamaUrl;
                      return (
                        <div
                          key={`local-slot-${sIdx}`}
                          draggable
                          onDragStart={(e) => {
                            setDragSlotIdx(sIdx);
                            e.dataTransfer.setData('text/plain', String(sIdx));
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverSlotIdx(sIdx);
                          }}
                          onDragLeave={() => setDragOverSlotIdx(null)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOverSlotIdx(null);
                            const droppedModel = e.dataTransfer.getData('application/x-micampus-model');
                            if (droppedModel) {
                              dropModelIntoSlot(droppedModel, sIdx, localProvider, localUrl);
                            } else if (dragSlotIdx !== null) {
                              moveSlotTo(dragSlotIdx, sIdx);
                            }
                            setDragSlotIdx(null);
                          }}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(160px, 210px) 1fr auto',
                            alignItems: 'center',
                            gap: '0.65rem',
                            padding: '0.6rem 0.8rem',
                            borderRadius: '10px',
                            border: dragOverSlotIdx === sIdx
                              ? '2px dashed var(--c-blue, #2563eb)'
                              : sIdx === 0
                                ? '2px solid var(--c-blue, #3b82f6)'
                                : '1px solid var(--border-subtle, #cbd5e1)',
                            background: dragOverSlotIdx === sIdx ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-page, #f8fafc)',
                            cursor: 'grab',
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>
                            ⠿ {sIdx === 0 ? '1️⃣ Principal' : `${sIdx + 1}️⃣ Respaldo ${sIdx}`}
                          </div>

                          <select
                            aria-label={`Modelo para Slot ${sIdx + 1}`}
                            value={slot.provider !== 'none' ? (slot.model || '') : ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (!val) {
                                const allSlots = [getSlot1Profile(form), ...padFallbacks(form.aiFallbacks)];
                                allSlots[sIdx] = { ...allSlots[sIdx], enabled: false, provider: 'none', model: '' };
                                const nextForm = applySlot1ToForm(form, allSlots[0]);
                                setForm({ ...nextForm, aiFallbacks: allSlots.slice(1) });
                              } else {
                                dropModelIntoSlot(val, sIdx, localEngine, localUrl);
                              }
                            }}
                            style={inputStyle}
                          >
                            <option value="">— Slot vacío (arrastra o elige modelo) —</option>
                            {slot.model && !availableModels.some((m) => m.id === slot.model) && (
                              <option value={slot.model}>{slot.model} ({slot.provider})</option>
                            )}
                            {availableModels.map((m) => (
                              <option key={`${sIdx}-${m.id}`} value={m.id}>{m.id}</option>
                            ))}
                          </select>

                          <div style={{ display: 'flex', gap: '0.3rem' }}>
                            <button
                              type="button"
                              onClick={() => handleTestAi(slot)}
                              disabled={slot.provider === 'none' || testingAi}
                              title="Probar este slot"
                              style={{ ...btnSecondaryStyle, padding: '0.4rem 0.6rem', fontSize: '0.8rem', opacity: slot.provider === 'none' ? 0.45 : 1 }}
                            >
                              🧪
                            </button>
                            <button
                              type="button"
                              disabled={slot.provider === 'none'}
                              title="Vaciar slot"
                              onClick={() => {
                                const allSlots = [getSlot1Profile(form), ...padFallbacks(form.aiFallbacks)];
                                allSlots[sIdx] = { ...allSlots[sIdx], enabled: false, provider: 'none', model: '' };
                                const nextForm = applySlot1ToForm(form, allSlots[0]);
                                setForm({ ...nextForm, aiFallbacks: allSlots.slice(1) });
                              }}
                              style={{ ...btnSecondaryStyle, padding: '0.4rem 0.6rem', fontSize: '0.8rem', color: '#b91c1c', opacity: slot.provider === 'none' ? 0.45 : 1 }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
                  {saving ? 'Guardando...' : '💾 Guardar configuración local'}
                </button>
              </section>
            )}

            {activeTab === 'ia-nube' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>☁️ IA en la Nube (APIs)</h2>
                <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Conecta Google Gemini, OpenAI ChatGPT, Anthropic Claude o endpoints compatibles (Groq, OpenRouter, DeepSeek…).
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="aiProvider" style={labelStyle}>Proveedor principal</label>
                  <select id="aiProvider" value={form.aiProvider} onChange={(e) => updateField('aiProvider', e.target.value)} style={inputStyle}>
                    {PROVIDER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {form.aiProvider === 'gemini' && (form.aiModel || '').includes(':') && (
                  <div style={{ marginBottom: '0.85rem', padding: '0.65rem 0.85rem', borderRadius: '8px', background: '#fef3c7', border: '1px solid #f59e0b', color: '#92400e', fontSize: '0.83rem' }}>
                    ⚠️ El modelo principal <code>{form.aiModel}</code> tiene formato de Ollama/local (con <code>:</code>). Para Google Gemini usa un identificador como <code>gemini-2.5-flash</code> o <code>gemini-2.5-pro</code>.
                  </div>
                )}

                {form.aiProvider === 'gemini' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="geminiApiKey" style={labelStyle}>Google Gemini API Key</label>
                    <input id="geminiApiKey" type="password" placeholder="AIza..." value={form.geminiApiKey} onChange={(e) => updateField('geminiApiKey', e.target.value)} style={inputStyle} />
                  </div>
                )}

                {form.aiProvider === 'openai' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="openaiApiKey" style={labelStyle}>OpenAI API Key</label>
                    <input id="openaiApiKey" type="password" placeholder="sk-..." value={form.openaiApiKey} onChange={(e) => updateField('openaiApiKey', e.target.value)} style={inputStyle} />
                  </div>
                )}

                {form.aiProvider === 'anthropic' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="anthropicApiKey" style={labelStyle}>Anthropic Claude API Key</label>
                    <input id="anthropicApiKey" type="password" placeholder="sk-ant-..." value={form.anthropicApiKey} onChange={(e) => updateField('anthropicApiKey', e.target.value)} style={inputStyle} />
                  </div>
                )}

                {form.aiProvider === 'custom_openai' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                      <label htmlFor="customAiBaseUrl" style={labelStyle}>Base URL (OpenAI-compatible)</label>
                      <input id="customAiBaseUrl" type="text" placeholder="https://api.groq.com/openai/v1" value={form.customAiBaseUrl} onChange={(e) => updateField('customAiBaseUrl', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="customAiApiKey" style={labelStyle}>API Key</label>
                      <input id="customAiApiKey" type="password" placeholder="sk-..." value={form.customAiApiKey} onChange={(e) => updateField('customAiApiKey', e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                )}

                {form.aiProvider !== 'none' && renderModelAndIntensityBox()}

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <select
                    aria-label="Elegir slot destino nube"
                    value={targetSlot}
                    onChange={(e) => setTargetSlot(Number(e.target.value))}
                    style={{ ...inputStyle, width: 'auto', minWidth: '175px' }}
                  >
                    <option value={1}>Slot 1 (Principal)</option>
                    <option value={2}>Slot 2 (Respaldo 1)</option>
                    <option value={3}>Slot 3 (Respaldo 2)</option>
                    <option value={4}>Slot 4 (Respaldo 3)</option>
                  </select>
                  <button type="button" onClick={() => saveCurrentToSlot(targetSlot)} disabled={saving} style={btnPrimaryStyle}>
                    {saving ? 'Guardando...' : `💾 Guardar en Slot ${targetSlot}`}
                  </button>
                  <button type="button" onClick={() => handleTestAi()} disabled={testingAi || form.aiProvider === 'none'} style={{ ...btnSecondaryStyle, opacity: form.aiProvider === 'none' ? 0.55 : 1 }}>
                    {testingAi ? 'Probando...' : '🧪 Probar IA'}
                  </button>
                </div>
              </section>
            )}

            {activeTab === 'respaldos' && (
              <section style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>🛡️ Orden de IAs (4 Slots)</h2>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.86rem', color: 'var(--text-muted, #64748b)' }}>
                      MiCampus intenta siempre el <strong>Slot 1</strong> y, si falla, salta automáticamente al <strong>Slot 2 → Slot 3 → Slot 4</strong>. Usa ↑ / ↓ para cambiar el orden.
                    </p>
                  </div>
                </div>

                {/* SLOT 1 (PRINCIPAL) */}
                {(() => {
                  const s1 = getSlot1Profile(form);
                  return (
                    <div
                      draggable
                      onDragStart={() => setDragSlotIdx(0)}
                      onDragOver={(e) => { e.preventDefault(); setDragOverSlotIdx(0); }}
                      onDragLeave={() => setDragOverSlotIdx(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverSlotIdx(null);
                        if (dragSlotIdx !== null) moveSlotTo(dragSlotIdx, 0);
                        setDragSlotIdx(null);
                      }}
                      style={{
                        padding: '0.9rem',
                        borderRadius: '10px',
                        border: dragOverSlotIdx === 0 ? '2px dashed var(--c-blue, #2563eb)' : '2px solid var(--c-blue, #3b82f6)',
                        background: dragOverSlotIdx === 0 ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-page, #f8fafc)',
                        marginBottom: '0.75rem',
                        cursor: 'grab',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div>
                          <strong style={{ fontSize: '0.95rem' }}>⠿ 🥇 Slot 1 (Principal): {s1.provider === 'none' ? 'Sin configurar' : s1.provider}</strong>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted, #64748b)' }}>
                            Modelo: {s1.model || 'automático'} · Intensidad: {s1.intensity}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button type="button" onClick={() => moveAnySlot(0, 1)} style={{ ...btnSecondaryStyle, padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}>↓ Bajar a Slot 2</button>
                          <button type="button" onClick={() => handleTestAi(s1)} style={{ ...btnSecondaryStyle, padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}>🧪 Probar</button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* SLOTS 2, 3 Y 4 */}
                {padFallbacks(form.aiFallbacks).map((fb, idx) => {
                  const slotNumber = idx + 2;
                  const fbKey = fb.id || `slot_${slotNumber}`;
                  const modelsForFb = fallbackModels[fbKey] || [];
                  const statusForFb = fallbackTestStatus[fbKey];
                  const syncFallbackList = (patch) => {
                    const next = padFallbacks(form.aiFallbacks);
                    next[idx] = { ...next[idx], ...patch };
                    setForm((prev) => ({ ...prev, aiFallbacks: next }));
                  };
                  return (
                    <div
                      key={fbKey}
                      draggable
                      onDragStart={() => setDragSlotIdx(idx + 1)}
                      onDragOver={(e) => { e.preventDefault(); setDragOverSlotIdx(idx + 1); }}
                      onDragLeave={() => setDragOverSlotIdx(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverSlotIdx(null);
                        if (dragSlotIdx !== null) moveSlotTo(dragSlotIdx, idx + 1);
                        setDragSlotIdx(null);
                      }}
                      style={{
                        padding: '0.9rem',
                        borderRadius: '10px',
                        border: dragOverSlotIdx === idx + 1 ? '2px dashed var(--c-blue, #2563eb)' : '1px solid var(--border-subtle, #cbd5e1)',
                        background: dragOverSlotIdx === idx + 1 ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-page, #f8fafc)',
                        marginBottom: '0.75rem',
                        cursor: 'grab',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
                          <span>⠿</span>
                          <input type="checkbox" checked={fb.enabled !== false && fb.provider !== 'none'} onChange={(e) => syncFallbackList({ enabled: e.target.checked })} />
                          Slot {slotNumber} (Respaldo {idx + 1})
                        </label>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button type="button" onClick={() => moveAnySlot(idx + 1, -1)} style={{ ...btnSecondaryStyle, padding: '0.25rem 0.55rem', fontSize: '0.78rem' }}>↑ Subir</button>
                          <button type="button" onClick={() => moveAnySlot(idx + 1, 1)} disabled={idx === 2} style={{ ...btnSecondaryStyle, padding: '0.25rem 0.55rem', fontSize: '0.78rem' }}>↓ Bajar</button>
                          <button type="button" onClick={() => testFallback(idx)} disabled={fb.provider === 'none'} style={{ ...btnSecondaryStyle, padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}>🧪 Probar</button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                        <div>
                          <label style={labelStyle}>Proveedor</label>
                          <select value={fb.provider || 'none'} onChange={(e) => syncFallbackList({ provider: e.target.value, model: '', enabled: e.target.value !== 'none' })} style={inputStyle}>
                            {PROVIDER_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Intensidad</label>
                          <select value={fb.intensity || 'medium'} onChange={(e) => syncFallbackList({ intensity: e.target.value })} style={inputStyle}>
                            <option value="low">⚡ Ligera</option>
                            <option value="medium">⚖️ Equilibrada</option>
                            <option value="high">🧠 Profunda</option>
                          </select>
                        </div>
                      </div>

                      {fb.provider !== 'none' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.6rem', marginTop: '0.6rem' }}>
                          {(fb.provider === 'ollama' || fb.provider === 'custom_openai') && (
                            <div>
                              <label style={labelStyle}>URL del servidor</label>
                              <input type="text" value={fb.baseUrl || ''} placeholder={fb.provider === 'ollama' ? 'http://localhost:11434' : 'http://localhost:1234/v1'} onChange={(e) => syncFallbackList({ baseUrl: e.target.value })} style={inputStyle} />
                            </div>
                          )}
                          {fb.provider !== 'ollama' && (
                            <div>
                              <label style={labelStyle}>API Key</label>
                              <input type="password" value={fb.apiKey || ''} placeholder="Clave API" onChange={(e) => syncFallbackList({ apiKey: e.target.value })} style={inputStyle} />
                            </div>
                          )}
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                              <label style={{ ...labelStyle, marginBottom: 0 }}>Modelo</label>
                              <button type="button" onClick={() => loadFallbackModels(idx)} style={{ ...btnSecondaryStyle, padding: '0.18rem 0.5rem', fontSize: '0.75rem' }}>🔄 Modelos</button>
                            </div>
                            {modelsForFb.length > 0 && (
                              <select value={modelsForFb.some((m) => m.id === fb.model) ? fb.model : ''} onChange={(e) => syncFallbackList({ model: e.target.value })} style={{ ...inputStyle, marginBottom: '0.35rem' }}>
                                <option value="">-- Elegir ({modelsForFb.length}) --</option>
                                {modelsForFb.map((m) => <option key={m.id} value={m.id}>{m.label || m.id}</option>)}
                              </select>
                            )}
                            <input type="text" value={fb.model || ''} placeholder="Vacío = automático" onChange={(e) => syncFallbackList({ model: e.target.value })} style={inputStyle} />
                          </div>
                        </div>
                      )}

                      {statusForFb && (
                        <div style={{ marginTop: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', background: statusForFb.ok ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: statusForFb.ok ? '#065f46' : '#991b1b' }}>
                          {statusForFb.text}
                        </div>
                      )}
                    </div>
                  );
                })}

                <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
                  {saving ? 'Guardando...' : '💾 Guardar orden de los 4 slots'}
                </button>
              </section>
            )}

            {activeTab === 'telegram' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>📱 Bot de Telegram (@BotFather)</h2>
                <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Habla con tu MiCampus desde el móvil, crea entregas, consulta el radar y recibe alertas urgentes.
                </p>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.92rem' }}>
                  <input type="checkbox" checked={form.telegramEnabled} onChange={(e) => updateField('telegramEnabled', e.target.checked)} />
                  Activar bot de Telegram en segundo plano
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="telegramBotToken" style={labelStyle}>Token de @BotFather</label>
                    <input id="telegramBotToken" type="password" placeholder="123456789:AAH..." value={form.telegramBotToken} onChange={(e) => updateField('telegramBotToken', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="telegramChatId" style={labelStyle}>Chat ID (se rellena solo con /start)</label>
                    <input id="telegramChatId" type="text" placeholder="Envía /start a tu bot..." value={form.telegramChatId} onChange={(e) => updateField('telegramChatId', e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div style={{ padding: '0.9rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                    🎛️ Comportamiento y Personalidad del Bot
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.75rem' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.telegramRemindersEnabled} onChange={(e) => updateField('telegramRemindersEnabled', e.target.checked)} />
                      🔔 Enviar alertas automáticas de entregas urgentes o atrasadas al móvil
                    </label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.telegramAllowActions} onChange={(e) => updateField('telegramAllowActions', e.target.checked)} />
                      ✍️ Permitir crear y completar entregas desde Telegram (/nueva y /hecha)
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <label htmlFor="telegramBotPrompt" style={{ ...labelStyle, marginBottom: 0 }}>Personalidad / instrucciones del bot</label>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => updateField('telegramBotPrompt', 'Eres Sensei, un tutor cercano y motivador. Explica con ejemplos claros y tono amigable.')} style={{ ...btnSecondaryStyle, padding: '0.18rem 0.5rem', fontSize: '0.74rem' }}>🎓 Tutor cercano</button>
                      <button type="button" onClick={() => updateField('telegramBotPrompt', 'Responde siempre muy breve, en viñetas directas al grano.')} style={{ ...btnSecondaryStyle, padding: '0.18rem 0.5rem', fontSize: '0.74rem' }}>⚡ Directo</button>
                      <button type="button" onClick={() => updateField('telegramBotPrompt', 'Eres un coach académico exigente: prioriza fechas, pesos de evaluación y advierte riesgos.')} style={{ ...btnSecondaryStyle, padding: '0.18rem 0.5rem', fontSize: '0.74rem' }}>🧠 Coach exigente</button>
                    </div>
                  </div>
                  <textarea
                    id="telegramBotPrompt"
                    rows={2}
                    placeholder="Ej. Eres Sensei, mi asistente de estudio. Háblame de forma clara, breve y práctica..."
                    value={form.telegramBotPrompt}
                    onChange={(e) => updateField('telegramBotPrompt', e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <strong>Comandos en tu móvil:</strong>{' '}
                  <code>/entregas</code>, <code>/asignaturas</code>, <code>/soluciones</code>, <code>/plan</code>,{' '}
                  <code>/nueva Asig | Título | YYYY-MM-DD</code>, <code>/hecha Título</code>, <code>/limpiar</code>.
                  <br />
                  <strong>Agentes IA y Quiz por Telegram:</strong>{' '}
                  <code>/agentes</code>, <code>/auditar DESP U1</code>, <code>/glosario DAW U2</code>,{' '}
                  <code>/quiz DESP U1</code>, <code>/agente escritor DESP U1 | Resume el punto 2</code> o cualquier mensaje libre.
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
                    {saving ? 'Guardando...' : '💾 Guardar Telegram'}
                  </button>
                  <button type="button" onClick={handleTestTelegram} disabled={testingTg} style={btnSecondaryStyle}>
                    {testingTg ? 'Enviando...' : '🧪 Enviar mensaje de prueba'}
                  </button>
                </div>

                {tgStatus && (
                  <div style={{ marginTop: '0.9rem', padding: '0.7rem 0.9rem', borderRadius: '8px', fontSize: '0.88rem', background: tgStatus.ok ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: tgStatus.ok ? '#065f46' : '#991b1b', whiteSpace: 'pre-wrap' }}>
                    {tgStatus.text}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'soul' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>🎭 SOUL.md, Perfiles y Reglas de Aviso</h2>
                <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Define cómo quieres que te hable tu asistente (TDAH, neurodivergente, coach exigente, anti-agobio…), edita su <code>SOUL.md</code> y configura silencios, resumen semanal y alertas de notas.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="botCallMe" style={labelStyle}>¿Cómo quieres que te llame el bot?</label>
                    <input id="botCallMe" type="text" placeholder="Ej. Blanca, Campeona, Jefa..." value={form.botCallMe} onChange={(e) => updateField('botCallMe', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="botUrgentDaysBefore" style={labelStyle}>Avisar entregas urgentes con antelación (días)</label>
                    <input id="botUrgentDaysBefore" type="number" min={0} max={30} value={form.botUrgentDaysBefore} onChange={(e) => updateField('botUrgentDaysBefore', Number(e.target.value))} style={inputStyle} />
                  </div>
                </div>

                {/* PERFILES PREDETERMINADOS */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Perfiles predeterminados (haz clic para cargar su SOUL.md y personalizarlo)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.5rem' }}>
                    {[
                      {
                        id: 'tdah',
                        title: '⚡ Modo TDAH',
                        desc: 'Corto, visual, sin culpa, 1 paso',
                        md: '# SOUL: Modo TDAH / Despiste Cero\n- Respuestas muy cortas y visuales (máx 4-5 líneas por bloque).\n- Propón UN único micro-paso para empezar ahora ("solo 5 minutos").\n- Nunca regañes ni generes culpa por retrasos.',
                      },
                      {
                        id: 'neurodivergent',
                        title: '🧩 Neurodivergente',
                        desc: 'Literal, predecible, cero presión',
                        md: '# SOUL: Modo Neurodivergente / Baja Sobrecarga\n- Comunicación literal, directa y tranquila (sin sarcasmo ni ambigüedades).\n- Pasos numerados 1, 2, 3.\n- Da 2 opciones concretas en lugar de preguntas abiertas agotadoras.',
                      },
                      {
                        id: 'strict_coach',
                        title: '🔥 Coach Exigente',
                        desc: 'Prioridad por peso % y notas',
                        md: '# SOUL: Coach Exigente\n- Directo, estratégico y orientado a nota.\n- Prioriza entregas por fecha y peso % en evaluación.',
                      },
                      {
                        id: 'supportive',
                        title: '💚 Anti-Agobio',
                        desc: 'Cálido, calmado y alentador',
                        md: '# SOUL: Mentor Empático\n- Tono cálido y calmado. Divide tareas grandes en trozos pequeños.',
                      },
                      {
                        id: 'minimalist',
                        title: '🥷 Minimalista',
                        desc: 'Solo datos, fechas y acción',
                        md: '# SOUL: Ultra Minimalista\n- Máxima brevedad: solo datos, fechas y acción en viñetas secas.',
                      },
                      {
                        id: 'default',
                        title: '🎓 Sensei',
                        desc: 'Equilibrado y práctico',
                        md: '# SOUL: Sensei Equilibrado\n- Asistente académico claro, cercano y práctico en español.',
                      },
                    ].map((preset) => {
                      const selected = form.botSoulProfile === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, botSoulProfile: preset.id, botSoulMarkdown: preset.md }))}
                          style={{
                            textAlign: 'left',
                            padding: '0.6rem 0.75rem',
                            borderRadius: '10px',
                            border: selected ? '2px solid var(--c-blue, #2563eb)' : '1px solid var(--border-subtle, #cbd5e1)',
                            background: selected ? 'var(--bg-hover, #eff6ff)' : 'var(--bg-page, #f8fafc)',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>{preset.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted, #64748b)' }}>{preset.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* EDITOR SOUL.md */}
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="botSoulMarkdown" style={labelStyle}>Editor SOUL.md (sobrescribe el perfil con tus propias reglas)</label>
                  <textarea
                    id="botSoulMarkdown"
                    rows={5}
                    placeholder="# SOUL.md&#10;- Cómo quieres que te hable, tono, longitud, trucos para tu concentración..."
                    value={form.botSoulMarkdown}
                    onChange={(e) => updateField('botSoulMarkdown', e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.83rem', resize: 'vertical' }}
                  />
                </div>

                {/* REGLAS DE SILENCIO, RESUMEN SEMANAL Y NOTAS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.6rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.botQuietHoursEnabled} onChange={(e) => updateField('botQuietHoursEnabled', e.target.checked)} />
                      🌙 Silenciar avisos en franja horaria
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div>
                        <label style={{ ...labelStyle, fontSize: '0.78rem' }}>Desde</label>
                        <input type="time" value={form.botQuietStart} onChange={(e) => updateField('botQuietStart', e.target.value)} style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, fontSize: '0.78rem' }}>Hasta</label>
                        <input type="time" value={form.botQuietEnd} onChange={(e) => updateField('botQuietEnd', e.target.value)} style={inputStyle} />
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.6rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.botWeeklyDigestEnabled} onChange={(e) => updateField('botWeeklyDigestEnabled', e.target.checked)} />
                      📆 Resumen semanal de entregas
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '0.5rem' }}>
                      <select value={form.botWeeklyDigestDay} onChange={(e) => updateField('botWeeklyDigestDay', e.target.value)} style={inputStyle}>
                        <option value="MONDAY">Lunes</option>
                        <option value="TUESDAY">Martes</option>
                        <option value="WEDNESDAY">Miércoles</option>
                        <option value="THURSDAY">Jueves</option>
                        <option value="FRIDAY">Viernes</option>
                        <option value="SATURDAY">Sábado</option>
                        <option value="SUNDAY">Domingo</option>
                      </select>
                      <input type="number" min={0} max={23} value={form.botWeeklyDigestHour} onChange={(e) => updateField('botWeeklyDigestHour', Number(e.target.value))} style={inputStyle} title="Hora (0-23)" />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.84rem', marginTop: '0.65rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.botNotifyGrades} onChange={(e) => updateField('botNotifyGrades', e.target.checked)} />
                      🏆 Avisar en Telegram cuando salga una nota
                    </label>
                  </div>
                </div>

                <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
                  {saving ? 'Guardando...' : '💾 Guardar SOUL.md y reglas'}
                </button>
              </section>
            )}

            {activeTab === 'correo' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>📧 Correo del IOC (IMAP) y Extensión de Chrome</h2>
                <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Detecta avisos de Moodle/IOC en tu correo (ej. <em>«ha hecho un comentario en la tarea Lliurament EAC1»</em>) y sincroniza tus notas reales desde Chrome.
                </p>

                <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', marginBottom: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', marginBottom: '0.8rem' }}>
                    <input type="checkbox" checked={form.emailWatcherEnabled} onChange={(e) => updateField('emailWatcherEnabled', e.target.checked)} />
                    📬 Vigilar mi correo cada 2 minutos y avisar por Telegram
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label style={labelStyle}>Servidor IMAP</label>
                      <input type="text" value={form.emailImapHost} onChange={(e) => updateField('emailImapHost', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Puerto IMAP</label>
                      <input type="number" value={form.emailImapPort} onChange={(e) => updateField('emailImapPort', Number(e.target.value))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Tu email</label>
                      <input type="email" placeholder="tu@gmail.com" value={form.emailImapUser} onChange={(e) => updateField('emailImapUser', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Contraseña de aplicación (Gmail)</label>
                      <input type="password" placeholder="xxxx xxxx xxxx xxxx" value={form.emailImapPassword} onChange={(e) => updateField('emailImapPassword', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Palabras clave a detectar en asunto/remitente (separadas por coma)</label>
                    <input type="text" value={form.emailKeywords} onChange={(e) => updateField('emailKeywords', e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
                    {saving ? 'Guardando...' : '💾 Guardar correo IMAP'}
                  </button>
                  <button
                    type="button"
                    disabled={testingEmail}
                    onClick={async () => {
                      setTestingEmail(true);
                      setEmailStatus(null);
                      try {
                        await fetch('/api/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
                        const res = await fetch('/api/scripts/email-test', { method: 'POST' });
                        const data = await res.json();
                        setEmailStatus(data.status === 'ok'
                          ? { ok: true, text: `✅ ${data.message}${data.matches?.length ? '\n• ' + data.matches.join('\n• ') : ''}` }
                          : { ok: false, text: `❌ ${data.message}` });
                      } catch (err) {
                        setEmailStatus({ ok: false, text: `❌ ${err.message}` });
                      } finally {
                        setTestingEmail(false);
                      }
                    }}
                    style={btnSecondaryStyle}
                  >
                    {testingEmail ? 'Comprobando...' : '🧪 Probar y escanear correo ahora'}
                  </button>
                </div>

                {emailStatus && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem 0.9rem', borderRadius: '8px', fontSize: '0.86rem', background: emailStatus.ok ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: emailStatus.ok ? '#065f46' : '#991b1b', whiteSpace: 'pre-wrap' }}>
                    {emailStatus.text}
                  </div>
                )}

                <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    <strong>🧩 Extensión de Chrome para leer notas del IOC y avisar por Telegram</strong>
                    <a href="/api/ioc/extension.zip" download="micampus-ioc-extension.zip" style={{ ...btnPrimaryStyle, textDecoration: 'none', padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                      📦 Descargar extensión (.zip)
                    </a>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>URL para vincular en la extensión:</strong> <code>{window.location.origin}</code>
                  </div>
                  <ol style={{ margin: '0.35rem 0 0', paddingLeft: '1.25rem' }}>
                    <li>Descarga y descomprime el <code>.zip</code> (o usa la carpeta <code>chrome-extension</code> del proyecto).</li>
                    <li>Abre <code>chrome://extensions</code>, activa <strong>Modo de desarrollador</strong> y pulsa <strong>Cargar descomprimida</strong>.</li>
                    <li>Pega <code>{window.location.origin}</code> en la extensión; al abrir <em>Qualificacions</em> en el IOC sincronizará tus notas y avisará por Telegram.</li>
                  </ol>
                </div>

                {/* DICCIONARIO ASIGNATURA <-> ID DEL IOC */}
                <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '10px', background: 'var(--bg-page, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.94rem' }}>📚 Diccionario de Asignaturas ↔ ID del IOC</strong>
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/ioc/apply-dictionary', { method: 'POST' });
                            const data = await res.json();
                            if (data.status === 'ok') {
                              if (Array.isArray(data.subjects)) setSubjects(data.subjects);
                              setEmailStatus({ ok: true, text: `✅ Diccionario DAW aplicado (${data.applied} asignaturas enlazadas con el IOC).` });
                            } else {
                              setEmailStatus({ ok: false, text: `❌ ${data.message}` });
                            }
                          } catch (err) {
                            setEmailStatus({ ok: false, text: `❌ Error aplicando diccionario: ${err.message}` });
                          }
                        }}
                        style={{ ...btnSecondaryStyle, padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                      >
                        📥 Cargar diccionario DAW
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          const mapping = {};
                          subjects.forEach((s) => { mapping[s.id] = s.iocCourseId || ''; });
                          try {
                            const res = await fetch('/api/ioc/courses', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(mapping),
                            });
                            if (!res.ok) throw new Error(`HTTP ${res.status}`);
                            setEmailStatus({ ok: true, text: '✅ Diccionario de IDs del IOC guardado en SQLite.' });
                          } catch (err) {
                            setEmailStatus({ ok: false, text: `❌ Error guardando diccionario: ${err.message}` });
                          }
                        }}
                        style={{ ...btnPrimaryStyle, padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                      >
                        💾 Guardar diccionario IOC
                      </button>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--text-muted, #64748b)' }}>
                    Pon el ID del curso en el IOC (ej. <code>18646</code>) o pega directamente la URL completa del IOC y se extraerá solo el número.
                  </p>

                  {subjects.length === 0 ? (
                    <div style={{ fontSize: '0.83rem', color: 'var(--text-muted, #64748b)' }}>No tienes asignaturas creadas todavía.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {subjects.map((sub, idx) => (
                        <div key={sub.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                            {sub.icon || '📚'} {sub.title}
                          </div>
                          <input
                            type="text"
                            placeholder="ID o URL IOC (ej. 18646)"
                            value={sub.iocCourseId || ''}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const match = raw.match(/[?&]id=(\d+)/);
                              const clean = match ? match[1] : raw;
                              setSubjects((prev) => prev.map((item, i) => (i === idx ? { ...item, iocCourseId: clean } : item)));
                            }}
                            style={inputStyle}
                          />
                          {sub.iocCourseId ? (
                            <a
                              href={`https://ioc.xtec.cat/campus/grade/report/user/index.php?id=${encodeURIComponent(sub.iocCourseId)}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ ...btnSecondaryStyle, textDecoration: 'none', padding: '0.42rem 0.7rem', fontSize: '0.8rem' }}
                            >
                              🔗 Abrir notas
                            </a>
                          ) : (
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)', padding: '0 0.4rem' }}>Sin ID</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === 'accesos' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>🔗 Accesos Directos (Drag & Drop)</h2>
                <p style={{ marginTop: 0, marginBottom: '1.1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Arrastra cualquier acceso con <strong>⠿</strong> para ordenarlos o moverlos entre <strong>🏫 Dentro del Campus</strong>, <strong>🌐 Fuera del Campus</strong> y <strong>⚡ Portada Home</strong>.
                </p>

                {[
                  {
                    key: 'sectionLinks',
                    title: '🏫 Dentro del Campus (asignaturas, temas, radar...)',
                    defaultIcon: '📂',
                    urlPlaceholder: '/asignatura/... o /radar',
                    presets: [
                      { icon: '📅', label: 'Radar de Entregas', url: '/radar' },
                      { icon: '⚡', label: 'Scripts Java', url: '/scripts' },
                      ...subjects.map((s) => ({
                        icon: s.icon || '📚',
                        label: s.shortTitle || s.title || 'Asignatura',
                        url: getSubjectUrl(s),
                      })),
                    ],
                  },
                  {
                    key: 'officialLinks',
                    title: '🌐 Fuera del Campus (webs externas)',
                    defaultIcon: '🌐',
                    urlPlaceholder: 'https://...',
                    presets: [
                      { icon: '🎓', label: 'Aula Virtual', url: 'https://' },
                      { icon: '📁', label: 'Google Drive', url: 'https://drive.google.com' },
                      { icon: '🐙', label: 'GitHub', url: 'https://github.com' },
                    ],
                  },
                  {
                    key: 'quickLinks',
                    title: '⚡ Portada de la Home',
                    defaultIcon: '🔗',
                    urlPlaceholder: 'https://... o /ruta',
                    presets: [],
                  },
                ].map((group) => {
                  const list = form[group.key] || [];
                  const updateLink = (idx, patch) => {
                    const next = [...list];
                    next[idx] = { ...next[idx], ...patch };
                    updateField(group.key, next);
                  };
                  const addLink = (preset) => {
                    updateField(group.key, [
                      ...list,
                      {
                        icon: preset?.icon || group.defaultIcon,
                        label: preset?.label || '',
                        url: preset?.url || '',
                      },
                    ]);
                  };
                  const removeLink = (idx) => {
                    updateField(group.key, list.filter((_, i) => i !== idx));
                  };
                  const handleDropIntoGroup = (targetIdx) => {
                    setDragOverLinkGroup(null);
                    if (!dragLink) return;
                    const { groupKey: fromKey, index: fromIdx } = dragLink;
                    setDragLink(null);
                    const fromList = [...(form[fromKey] || [])];
                    const [moved] = fromList.splice(fromIdx, 1);
                    if (!moved) return;
                    if (fromKey === group.key) {
                      const insertAt = typeof targetIdx === 'number' ? targetIdx : fromList.length;
                      fromList.splice(insertAt, 0, moved);
                      updateField(group.key, fromList);
                    } else {
                      const toList = [...list];
                      const insertAt = typeof targetIdx === 'number' ? targetIdx : toList.length;
                      toList.splice(insertAt, 0, moved);
                      setForm((prev) => ({
                        ...prev,
                        [fromKey]: fromList,
                        [group.key]: toList,
                      }));
                    }
                  };

                  return (
                    <div
                      key={group.key}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverLinkGroup(group.key);
                      }}
                      onDragLeave={() => setDragOverLinkGroup(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDropIntoGroup();
                      }}
                      style={{
                        padding: '0.95rem',
                        borderRadius: '10px',
                        background: dragOverLinkGroup === group.key ? 'rgba(59, 130, 246, 0.06)' : 'var(--bg-page, #f8fafc)',
                        border: dragOverLinkGroup === group.key ? '2px dashed var(--c-blue, #2563eb)' : '1px solid var(--border-subtle, #e2e8f0)',
                        marginBottom: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                        <strong style={{ fontSize: '0.93rem' }}>{group.title}</strong>
                        <button type="button" onClick={() => addLink()} style={{ ...btnSecondaryStyle, padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}>
                          + Añadir acceso
                        </button>
                      </div>

                      {group.presets.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.65rem' }}>
                          {group.presets.map((p, pIdx) => (
                            <button
                              key={`${group.key}-preset-${pIdx}`}
                              type="button"
                              onClick={() => addLink(p)}
                              style={{ ...btnSecondaryStyle, padding: '0.22rem 0.55rem', fontSize: '0.76rem', borderRadius: '999px' }}
                            >
                              + {p.icon} {p.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {list.length === 0 ? (
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted, #64748b)' }}>
                          Sin accesos aquí. Arrastra uno desde otro grupo o pulsa <strong>+ Añadir acceso</strong>.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {list.map((item, idx) => (
                            <div
                              key={`${group.key}-${idx}`}
                              draggable
                              onDragStart={(e) => {
                                e.stopPropagation();
                                setDragLink({ groupKey: group.key, index: idx });
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDropIntoGroup(idx);
                              }}
                              style={{ display: 'grid', gridTemplateColumns: '26px 60px 1fr 1.3fr auto', gap: '0.45rem', alignItems: 'center', cursor: 'grab' }}
                            >
                              <span title="Arrastra para mover o reordenar" style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-muted, #64748b)', userSelect: 'none' }}>⠿</span>
                              <input
                                type="text"
                                aria-label="Icono"
                                value={item.icon || ''}
                                placeholder={group.defaultIcon}
                                onChange={(e) => updateLink(idx, { icon: e.target.value })}
                                style={{ ...inputStyle, textAlign: 'center' }}
                              />
                              <input
                                type="text"
                                aria-label="Nombre"
                                value={item.label || ''}
                                placeholder="Nombre visible"
                                onChange={(e) => updateLink(idx, { label: e.target.value })}
                                style={inputStyle}
                              />
                              <input
                                type="text"
                                aria-label="URL o ruta"
                                value={item.url || ''}
                                placeholder={group.urlPlaceholder}
                                onChange={(e) => updateLink(idx, { url: e.target.value })}
                                style={inputStyle}
                              />
                              <button type="button" onClick={() => removeLink(idx)} style={{ ...btnSecondaryStyle, padding: '0.45rem 0.65rem', color: '#b91c1c' }}>
                                🗑️
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <button type="button" onClick={() => saveConfig()} disabled={saving} style={btnPrimaryStyle}>
                  {saving ? 'Guardando...' : '💾 Guardar accesos directos'}
                </button>
              </section>
            )}

            {activeTab === 'datos' && (
              <section style={cardStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '0.35rem', fontSize: '1.2rem' }}>💾 Copias de seguridad y Calendario</h2>
                <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                  Descarga tu base de datos completa o sincroniza tus entregas con Apple Calendar / Google Calendar.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href="/api/export" download="micampus-backup.json" style={{ ...btnPrimaryStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    📦 Descargar copia completa (.json)
                  </a>
                  <a href="/api/calendar/ics" download="micampus-calendario.ics" style={{ ...btnSecondaryStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    📅 Descargar calendario (.ics)
                  </a>
                  <Link to="/radar" style={{ ...btnSecondaryStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    🎯 Ir al Radar
                  </Link>
                  <Link to="/scripts" style={{ ...btnSecondaryStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    ⚡ Centro de Scripts
                  </Link>
                </div>
              </section>
            )}

            {statusBanner && (
              <div
                style={{
                  marginTop: '0.9rem',
                  padding: '0.75rem 0.95rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  background: statusBanner.ok ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  color: statusBanner.ok ? '#065f46' : '#991b1b',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {statusBanner.text}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
