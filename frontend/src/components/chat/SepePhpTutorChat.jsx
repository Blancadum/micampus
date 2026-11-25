import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './SepePhpTutorChat.css';

const QUICK_CHIPS = [
  { label: '📝 ¿Qué entra en el examen?', text: '¿Qué contenidos y bloques exactos entran en el examen del 18 de noviembre?' },
  { label: '💡 Pregunta tipo test', text: 'Ponme una pregunta tipo test del examen para practicar y dame 4 opciones (A, B, C, D).' },
  { label: '🔌 Rutas amigables (.htaccess)', text: 'Explícame detalladamente cómo configurar el archivo .htaccess con mod_rewrite para la API de socios.' },
  { label: '📚 Transacciones ACID con PDO', text: '¿Cómo se programa una transacción atómica con PDO en PHP con beginTransaction, commit y rollBack?' },
  { label: '🛡️ Seguridad XSS e Inyección SQL', text: '¿Cuál es la diferencia entre prevenir XSS con htmlspecialchars y prevenir inyecciones SQL con PDO?' },
  { label: '📑 Paginación con LIMIT y OFFSET', text: '¿Cómo funciona la fórmula de paginación del aula con LIMIT, OFFSET y ceil()?' }
];

export default function SepePhpTutorChat({
  isOpen: controlledIsOpen,
  onToggleOpen
} = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(() => {
    try {
      return sessionStorage.getItem('sepe_tutor_chat_open') === 'true';
    } catch {
      return false;
    }
  });

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (nextVal) => {
    const resolvedVal = typeof nextVal === 'function' ? nextVal(isOpen) : nextVal;
    try {
      sessionStorage.setItem('sepe_tutor_chat_open', String(resolvedVal));
    } catch {}
    if (isControlled && onToggleOpen) {
      onToggleOpen(resolvedVal);
    } else {
      setInternalIsOpen(resolvedVal);
    }
  };

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('sepe_php_tutor_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'welcome',
        role: 'assistant',
        text: '¡Hola Blanca! 👋 Soy tu **Profe Tutor de PHP & SQL (MF0492_3)**.\n\nEstoy aquí para prepararte a fondo para tu **Examen Presencial del 18 de noviembre en Rincón de la Victoria** (17:00 a 22:00).\n\nPuedes preguntarme dudas teóricas, pedirme que te examine con preguntas tipo test, o revisar juntos el código de los proyectos (Agenda, Tamagotchi, Biblioteca PDO y API REST con `.htaccess`).\n\n¿Por qué tema quieres que empecemos hoy?'
      }
    ];
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('sepe_php_tutor_chat_history', JSON.stringify(messages));
    } catch {}
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Intentamos llamar al endpoint del backend
      const res = await fetch('http://localhost:3001/api/sepe/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: updatedMessages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!res.ok) throw new Error('Respuesta no válida del servidor');
      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', text: data.reply }
      ]);
    } catch (err) {
      // Fallback inteligente offline
      const fallbackReply = generateFallbackReply(text);
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', text: fallbackReply }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    sessionStorage.removeItem('sepe_php_tutor_chat_history');
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: '¡Conversación reiniciada! ¿Qué duda o tema del examen de PHP quieres que trabajemos ahora?'
      }
    ]);
  };

  return (
    <div className="tutor-chat-wrapper">
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button
          type="button"
          className="tutor-chat-launcher"
          onClick={() => setIsOpen(true)}
          title="Abrir chat con tu Profe Tutor de PHP"
          aria-label="Abrir tutor virtual"
        >
          <span className="tutor-chat-launcher-icon">👨‍🏫</span>
          <span>Profe PHP</span>
          <span className="tutor-chat-status-dot" />
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <section className="tutor-chat-window" aria-label="Ventana de chat del tutor virtual">
          {/* Cabecera */}
          <header className="tutor-chat-header">
            <div className="tutor-chat-header-info">
              <div className="tutor-chat-avatar">👨‍🏫</div>
              <div className="tutor-chat-header-text">
                <h4>Profe Tutor PHP · SEPE</h4>
                <p>
                  <span className="tutor-chat-status-dot" style={{ display: 'inline-block' }} />
                  Examen 18 Nov · Rincón de la Victoria
                </p>
              </div>
            </div>
            <div className="tutor-chat-actions">
              <button
                type="button"
                className="tutor-chat-btn-icon"
                onClick={handleClearChat}
                title="Reiniciar conversación"
              >
                🔄
              </button>
              <button
                type="button"
                className="tutor-chat-btn-icon"
                onClick={() => setIsOpen(false)}
                title="Minimizar chat"
              >
                ✕
              </button>
            </div>
          </header>

          {/* Área de Mensajes */}
          <div className="tutor-chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`tutor-msg-bubble ${m.role === 'user' ? 'tutor-msg-user' : 'tutor-msg-assistant'}`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {m.text}
                </ReactMarkdown>
              </div>
            ))}

            {isLoading && (
              <div className="tutor-typing-indicator">
                <span className="tutor-typing-dot" />
                <span className="tutor-typing-dot" />
                <span className="tutor-typing-dot" />
                <span>El profe está pensando tu respuesta...</span>
              </div>
            )}

            {/* Chips de sugerencias rápidas */}
            {messages.length <= 3 && !isLoading && (
              <div className="tutor-chips-container">
                <span className="tutor-chip-title">💡 Preguntas rápidas para el examen:</span>
                <div className="tutor-chips-list">
                  {QUICK_CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      type="button"
                      className="tutor-quick-chip"
                      onClick={() => handleSendMessage(chip.text)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Inferior */}
          <footer className="tutor-chat-footer">
            <input
              ref={inputRef}
              type="text"
              className="tutor-chat-input"
              placeholder="Pregúntale al profe sobre el examen..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="button"
              className="tutor-chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              title="Enviar mensaje"
            >
              ➤
            </button>
          </footer>
        </section>
      )}
    </div>
  );
}

// Motor de reserva inteligente con respuestas detalladas del temario
function generateFallbackReply(message) {
  const q = message.toLowerCase();

  if (q.includes('examen') || q.includes('18 nov') || q.includes('rincón') || q.includes('entra') || q.includes('temario')) {
    return `### 🎯 Temario Oficial para el 18 de Noviembre (17:00 – 22:00)

El examen presencial en **Rincón de la Victoria** consta de parte teórica (test y preguntas cortas) y parte práctica en ordenador con WAMP:

1. **UF1844 (Ingeniería de Software & PHP Base):**
   - Ciclo de vida (Cascada vs Iterativo/Ágil).
   - Diagramas de flujo ANSI/ISO y casos de uso UML (\`<<include>>\` y \`<<extend>>\`).
   - Formularios GET y POST, sesiones con \`$_SESSION\`, superglobal \`$_SERVER\`.
   - Seguridad XSS con \`htmlspecialchars()\` y control de acceso (\`comprobarUsuario()\`).
   - POO: atributos \`private\`, constructor \`__construct()\`, getters/setters y clase Tamagotchi.

2. **UF1845 (MySQL, Persistencia & PDO):**
   - DDL (\`CREATE TABLE\`, claves primarias, \`FOREIGN KEY\`) y DML (\`SELECT\` con JOIN y GROUP BY).
   - Conexión PDO con sentencias preparadas (\`prepare()\` y marcadores \`:id\`).
   - **Transacciones ACID:** \`beginTransaction()\`, \`commit()\` y \`rollBack()\` (préstamos atómicos).
   - **Disparadores (Triggers):** \`AFTER INSERT ON prestamo\` para decrementar ejemplares del libro.
   - **Paginación:** \`LIMIT\`, \`OFFSET = ($pag - 1) * $por_pagina\` y redondeo \`ceil()\`.

3. **UF1846 (APIs REST & Rutas Amigables):**
   - 5 Verbos HTTP: \`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`.
   - Recepción de datos JSON con \`file_get_contents('php://input')\` y \`json_decode()\`.
   - Cabecera obligatoria: \`header('Content-Type: application/json; charset=utf-8')\`.
   - Códigos HTTP: \`200\`, \`201\`, \`400\`, \`404\`, \`500\` con \`http_response_code()\`.
   - **Rutas Amigables en Apache \`.htaccess\`:** \`RewriteRule ^socios/([0-9]+)/?$ socios.php?id=$1 [L,QSA]\`.

¿Quieres que te ponga una pregunta tipo test para practicar?`;
  }

  if (q.includes('test') || q.includes('pregunta') || q.includes('quiz') || q.includes('simulacro')) {
    return `### 💡 Pregunta Tipo Test de Examen Oficial

**Pregunta (UF1845 - Persistencia PDO):**
En una aplicación de gestión bibliotecaria, un usuario tramita un préstamo. Para asegurar que el registro en la tabla \`prestamo\` y la disminución de stock en la tabla \`libro\` se ejecuten como una sola unidad indivisible ante posibles fallos, ¿qué mecanismo debe implementarse?

- **A)** Un bucle \`while\` que reintente la inserción hasta que no devuelva error.
- **B)** Una transacción ACID mediante \`$conexion->beginTransaction()\`, confirmando con \`commit()\` y capturando fallos con \`rollBack()\`.
- **C)** Una función recursiva en PHP que verifique el stock después de 5 segundos.
- **D)** Definir el campo \`ejemplares\` con la restricción \`UNIQUE\` en MySQL.

¿Cuál es tu respuesta: **A**, **B**, **C** o **D**?`;
  }

  if (q.includes('htaccess') || q.includes('amigable') || q.includes('rewrite')) {
    return `### 🔌 Rutas Amigables (*Clean URLs*) con Apache \`.htaccess\`

En el examen de la **UF1846** te pedirán cómo pasar de:
\`http://localhost/proyectos/biblioteca/api/socios.php?id=16\`
a la ruta limpia:
\`http://localhost/proyectos/biblioteca/api/socios/16\`

**El archivo \`api/.htaccess\` oficial del aula:**
\`\`\`apache
# 1. Desactivar la negociación automática de Apache
Options -MultiViews

# 2. Activar el motor de reescritura
RewriteEngine On

# 3. Regla para un socio concreto por ID
RewriteRule ^socios/([0-9]+)/?$ socios.php?id=$1 [L,QSA]

# 4. Regla para la colección general
RewriteRule ^socios/?$ socios.php [L,QSA]
\`\`\`

**Puntos clave a defender ante el tribunal:**
- \`^socios/([0-9]+)/?$\`: Expresión regular que captura uno o más dígitos numéricos entre paréntesis.
- \`$1\`: Sustituye la captura en el parámetro \`?id=\`.
- \`[L]\` (*Last*): Indica a Apache que si coincide la regla, deje de evaluar directivas siguientes.
- \`[QSA]\` (*Query String Append*): Preserva cualquier parámetro adicional en la URL.`;
  }

  if (q.includes('transaccion') || q.includes('acid') || q.includes('commit') || q.includes('rollback')) {
    return `### 📚 Transacciones ACID con PDO en PHP

Una transacción agrupa múltiples sentencias SQL para que se comporten como un bloque atómico (**o se guardan todas o ninguna**):

\`\`\`php
try {
    // 1. Iniciar transacción
    $conexion->beginTransaction();

    // 2. Operación A: Insertar el préstamo
    $sql1 = "INSERT INTO prestamo (id_socio, id_libro, fecha_prestamo, estado) 
             VALUES (:socio, :libro, NOW(), 'Activo')";
    $stmt1 = $conexion->prepare($sql1);
    $stmt1->execute(['socio' => $idSocio, 'libro' => $idLibro]);

    // 3. Operación B: Reducir stock disponible
    $sql2 = "UPDATE libro SET ejemplares = ejemplares - 1 WHERE id_libro = :libro";
    $stmt2 = $conexion->prepare($sql2);
    $stmt2->execute(['libro' => $idLibro]);

    // 4. Confirmar cambios definitivamente en la base de datos
    $conexion->commit();
    echo "Préstamo tramitado con éxito.";
} catch (Exception $e) {
    // 5. Si algo falla (ej: fallo de red o stock negativo), revertir todo
    $conexion->rollBack();
    echo "Fallo en la operación. Cambios deshechos: " . $e->getMessage();
}
\`\`\``;
  }

  return `¡Excelente consulta, Blanca! Recuerda que para el examen del 18 de noviembre es fundamental justificar siempre el *por qué* técnico: la separación de responsabilidades en 3 capas, la prevención de vulnerabilidades (XSS e inyección SQL) y la consistencia de los datos en el servidor.\n\n¿Quieres que hagamos un simulacro de pregunta práctica o que veamos otro ejemplo de código?`;
}

