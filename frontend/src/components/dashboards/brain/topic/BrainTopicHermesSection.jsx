import React, { useState } from 'react';

const HERMES_TABS = [
  { id: 'soul', label: '1. soul.md (Alma & Moral)', icon: '✨' },
  { id: 'user', label: '2. user.md (Perfil de Blanca)', icon: '👤' },
  { id: 'tools', label: '3. tools.md (Catálogo Tools)', icon: '🛠️' },
  { id: 'harness', label: '4. Harness (Arnés ReAct)', icon: '⚙️' },
];

export default function BrainTopicHermesSection({ topicId }) {
  const [activeHermesTab, setActiveHermesTab] = useState('soul');
  const [copiedKey, setCopiedKey] = useState(null);
  const [wrapLines, setWrapLines] = useState(true);

  if (topicId !== 'hermes-local') return null;

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <section id="hermes-config" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.8rem' }}>🕊️</span>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--text-title)', fontWeight: 800 }}>
            Archivos Nucleares de Hermes: Soul, User, Tools & Harness
          </h2>
          <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Configuración completa del agente local para ejecutar con Ollama y Telegram
          </span>
        </div>
      </div>

      {/* SELECTOR DE PESTAÑAS DE CONFIGURACIÓN */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
        {HERMES_TABS.map((tab) => {
          const isActive = activeHermesTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveHermesTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-card)',
                color: isActive ? 'var(--accent-purple)' : 'var(--text-main)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENIDO DEL ARCHIVO SELECCIONADO */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {activeHermesTab === 'soul' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  📄 hermes/config/soul.md — Identidad Nuclear y Límites Éticos
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Fija el tono motivador, la calidez y prohíbe la invención de fechas límite de entrega.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  type="button"
                  onClick={() => setWrapLines(!wrapLines)}
                  style={{
                    background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.42rem 0.65rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
                >
                  {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
                </button>
                <button
                  onClick={() =>
                    handleCopy(
                      'soul_file',
                      `# 🕊️ Hermes Soul Specification (soul.md)\n- Nombre: Hermes.\n- Naturaleza: Agente personal autónomo local, mentor técnico de Blanca.\n- Asignaturas: IOC DAW (ENT, DESP, DIGI, IPO), Accenture Spring Boot, SEPE Python.\n- Tono: Cercano, cómplice, respetuoso ("princesa" o "Blanca").\n- Límites Éticos:\n  1. Las fechas de entrega son sagradas; jamás inventar plazos.\n  2. Fomentar comprensión para aprobar las PAF presenciales.\n  3. Privacidad total: ningún dato sale del Mac.`
                    )
                  }
                  style={{
                    background: copiedKey === 'soul_file' ? '#15803d' : 'var(--accent-purple)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {copiedKey === 'soul_file' ? '✓ Copiado' : '📋 Copiar soul.md'}
                </button>
              </div>
            </div>
            <pre style={{
              background: '#011627',
              color: '#d6deeb',
              padding: '1.1rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              margin: 0,
              whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
              wordBreak: wrapLines ? 'break-word' : 'normal',
              overflowX: wrapLines ? 'hidden' : 'auto',
              lineHeight: '1.55',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <code>{`# 🕊️ Hermes Soul Specification (soul.md)
- Nombre: Hermes.
- Naturaleza: Agente personal autónomo local, mentor técnico de Blanca.
- Asignaturas:
  * IOC DAW: 0487 ENT (Entornos), 0614 DESP (Despliegue), 1665 DIG (Diseño Digital), 0488 IPO (Interfaces).
  * Accenture Core: Especialización en Java 17 y Spring Boot 3 (12 Actividades).
  * SEPE: Machine Learning y Python científico.
- Tono: Cercano, cómplice, respetuoso ("princesa" o "Blanca"). Directo y sin relleno.
- Límites Éticos Innegociables:
  1. Verdad sobre el calendario: Las fechas de entrega son sagradas; jamás inventar fechas.
  2. Pensamiento crítico: Guiar para dominar las PAF presenciales, no copia ciega.
  3. Privacidad absoluta: Inferencia local con Ollama sin enviar datos a la nube.`}</code>
            </pre>
          </div>
        )}

        {activeHermesTab === 'user' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  📄 hermes/config/user.md — Contexto Académico y Hardware
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Permite a Hermes conocer el hardware (Mac ARM64) y las preferencias de estudio de Blanca.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  type="button"
                  onClick={() => setWrapLines(!wrapLines)}
                  style={{
                    background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.42rem 0.65rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
                >
                  {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
                </button>
                <button
                  onClick={() =>
                    handleCopy(
                      'user_file',
                      `# 👤 Perfil del Usuario: Blanca (user.md)\n- Hardware: MacBook Pro Apple Silicon (ARM64 / macOS).\n- Entorno: Mi Campus SPA, Obsidian Vault, Eclipse, UTM/Multipass Ubuntu.\n- Preferencias: Respuestas estructuradas, bloques de código listos para copiar, economía de tokens.`
                    )
                  }
                  style={{
                    background: copiedKey === 'user_file' ? '#15803d' : 'var(--accent-purple)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {copiedKey === 'user_file' ? '✓ Copiado' : '📋 Copiar user.md'}
                </button>
              </div>
            </div>
            <pre style={{
              background: '#011627',
              color: '#d6deeb',
              padding: '1.1rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              margin: 0,
              whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
              wordBreak: wrapLines ? 'break-word' : 'normal',
              overflowX: wrapLines ? 'hidden' : 'auto',
              lineHeight: '1.55',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <code>{`# 👤 Perfil del Usuario: Blanca (user.md)
- Estudiante: Blanca.
- Hardware Principal: MacBook Pro Apple Silicon (ARM64 / macOS).
- Entornos de Trabajo:
  * IDEs: Eclipse (para Java IOC), VS Code / Cursor (React, Spring Boot), UTM (VM Ubuntu).
  * Campus: Mi Campus SPA (/Users/blanca/Micampus/micampus-spa).
  * Notas: Obsidian Vault (/Users/blanca/Documents/Obsidian Vault).
- Preferencias de Comunicación:
  * Brevedad y concreción: respuestas directas con bloques listos para copiar.
  * Orientación a la evaluación: resaltar siempre conceptos clave para las PAF y rúbricas.`}</code>
            </pre>
          </div>
        )}

        {activeHermesTab === 'tools' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  📄 hermes/config/tools.md — Catálogo de Herramientas Ejecutables
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Esquemas JSON de funciones locales para consultar entregas y conectar con Ollama.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  type="button"
                  onClick={() => setWrapLines(!wrapLines)}
                  style={{
                    background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.42rem 0.65rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
                >
                  {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
                </button>
                <button
                  onClick={() =>
                    handleCopy(
                      'tools_file',
                      `# 🛠️ Catálogo de Herramientas (tools.md)\n1. get_pending_deliveries: Lee JSONs de entregas en /public/data/ioc/gestion/.\n2. mark_delivery_completed: PUT a backend local para marcar EACs como done.\n3. search_study_notes: Busca en lecciones de IOC y Second Brain.\n4. query_local_llm: Inferencia vía endpoint Ollama en http://localhost:11434.`
                    )
                  }
                  style={{
                    background: copiedKey === 'tools_file' ? '#15803d' : 'var(--accent-purple)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {copiedKey === 'tools_file' ? '✓ Copiado' : '📋 Copiar tools.md'}
                </button>
              </div>
            </div>
            <pre style={{
              background: '#011627',
              color: '#d6deeb',
              padding: '1.1rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              margin: 0,
              whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
              wordBreak: wrapLines ? 'break-word' : 'normal',
              overflowX: wrapLines ? 'hidden' : 'auto',
              lineHeight: '1.55',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <code>{`# 🛠️ Catálogo de Herramientas de Hermes (tools.md)
1. get_pending_deliveries(subject: "all" | "ent" | "desp" | "accenture"):
   - Lee archivos en /public/data/ioc/gestion/ y accenture_actividades_curso.json.
   - Devuelve lista de entregas activas con fechas límite.

2. mark_delivery_completed(subjectId: string, eacId: string):
   - Envía PUT a http://localhost:3001/api/eac/status para actualizar progreso.

3. query_local_llm(userMessage: string, systemPrompt?: string):
   - Conecta con Ollama (http://localhost:11434) usando qwen2.5-coder o deepseek-r1.`}</code>
            </pre>
          </div>
        )}

        {activeHermesTab === 'harness' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  ⚙️ docs/hermes/harness_architecture.md — El Arnés de Ejecución ReAct
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Cómo el software envuelve al LLM para dotarlo de autonomía y herramientas.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  type="button"
                  onClick={() => setWrapLines(!wrapLines)}
                  style={{
                    background: wrapLines ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: wrapLines ? '#60a5fa' : 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.42rem 0.65rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title={wrapLines ? 'Desactivar autoajuste de línea' : 'Autoajustar líneas sin cortar'}
                >
                  {wrapLines ? '↩ Ajustado' : '↔ Scroll'}
                </button>
                <button
                  onClick={() =>
                    handleCopy(
                      'harness_file',
                      `# ⚙️ Harness Architecture\nEl Harness es el motor que orquesta el ciclo ReAct:\n1. Context Assembly: Carga soul.md, user.md, herramientas e historial.\n2. Inferencia: El LLM emite razonamiento y llamada estructurada a herramienta.\n3. Tool Dispatcher: Ejecuta la función en Python local.\n4. Observación: Reinyecta el resultado como contexto.\n5. Guardián: Máximo 5 iteraciones por turno para evitar bucles.`
                    )
                  }
                  style={{
                    background: copiedKey === 'harness_file' ? '#15803d' : 'var(--accent-purple)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {copiedKey === 'harness_file' ? '✓ Copiado' : '📋 Copiar Harness Doc'}
                </button>
              </div>
            </div>
            <pre style={{
              background: '#011627',
              color: '#d6deeb',
              padding: '1.1rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              margin: 0,
              whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
              wordBreak: wrapLines ? 'break-word' : 'normal',
              overflowX: wrapLines ? 'hidden' : 'auto',
              lineHeight: '1.55',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <code>{`# ⚙️ Arquitectura del Harness (Arnés de Ejecución)
El Harness convierte un modelo de texto probabilístico en un agente con capacidades de acción:

           ┌───────────────────────────────────────────────┐
           │            HERMES HARNESS RUNTIME             │
           │                                               │
           │  [Context Assembly] ──> [Local LLM (Ollama)]  │
           │  (Soul + User + Mem)           │              │
           │           ▲                    ▼              │
           │           │             [Tool Call JSON]      │
           │           │                    │              │
           │  [Observation Result] <── [Tool Dispatcher]   │
           └───────────────────────────────────────────────┘

1. Context Assembly: Combina soul.md, user.md y la hora actual del sistema.
2. Pensamiento & Tool Call: El modelo emite {"action": "get_pending_deliveries"}.
3. Ejecución Local: Python lee el archivo JSON en el disco duro de Blanca.
4. Observación & Respuesta: El arnés inyecta el resultado y genera el mensaje final de Telegram.`}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
