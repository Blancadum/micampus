// src/telegram/bridge.js
// Puente bidireccional entre Telegram (MC_SenseBot) y el bus de mensajes NATS local

import { Telegraf } from 'telegraf';
import { connect, StringCodec } from 'nats';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN;
if (!token) {
  console.error('⚠️ [Telegram Bridge] Error: TELEGRAM_BOT_TOKEN no encontrada.');
  process.exit(1);
}

const NATS_URL = process.env.NATS_URL || 'nats://127.0.0.1:4222';
const CHATS_FILE = path.join(__dirname, 'active_chats.json');

// Helper to save and load registered chat IDs
function getActiveChats() {
  try {
    if (fs.existsSync(CHATS_FILE)) {
      return JSON.parse(fs.readFileSync(CHATS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error leyendo active_chats.json:', e.message);
  }
  return [];
}

function registerChat(chatId) {
  const chats = getActiveChats();
  if (!chats.includes(chatId)) {
    chats.push(chatId);
    try {
      fs.writeFileSync(CHATS_FILE, JSON.stringify(chats, null, 2), 'utf-8');
      console.log(`📌 Nuevo chat registrado para recordatorios: ${chatId}`);
    } catch (e) {
      console.error('Error guardando active_chats.json:', e.message);
    }
  }
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 Iniciando Telegram Bridge para miCampus (Sensei)...');
  console.log(`📡 Conectando a NATS: ${NATS_URL}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let nc;
  try {
    nc = await connect({ servers: NATS_URL });
    console.log('✅ Conectado a NATS.');
  } catch (err) {
    console.error('❌ Error conectando a NATS:', err.message);
    process.exit(1);
  }

  const sc = StringCodec();
  const bot = new Telegraf(token);

  // Helper para consultar a cualquier agente vía NATS
  async function askAgent(subject, query, timeoutMs = 45000) {
    try {
      const reply = await nc.request(subject, sc.encode(query), { timeout: timeoutMs });
      return sc.decode(reply.data);
    } catch (err) {
      if (err.code === 'TIMEOUT' || err.code === '503') {
        return `⏳ El agente en "${subject}" no respondió a tiempo. Verifica que esté activo en NATS.`;
      }
      return `❌ Error al consultar con el especialista: ${err.message}`;
    }
  }

  // Detector de consultas técnicas de programación
  function isCodeQuery(text) {
    const lower = text.toLowerCase();
    const codeKeywords = [
      'springboot', 'spring boot', '@autowired', '@getmapping', '@postmapping', '@restcontroller',
      '@entity', '@service', 'java', 'jpa', 'hibernate', 'nullpointer', 'exception', 'stacktrace',
      'maven', 'pom.xml', 'junit', 'repositorio', 'repository', 'bean', 'controller', 'endpoint',
      'api rest', 'código', 'codigo', 'función', 'funcion', 'sintaxis', 'clase', 'herencia',
      'polimorfismo', 'programar', 'compilar', 'bug', 'debugging'
    ];
    return codeKeywords.some(kw => lower.includes(kw));
  }

// Conversor de Markdown a Telegram HTML seguro
function markdownToTelegramHtml(markdown) {
  if (!markdown) return '';

  const codeBlocks = [];
  // 1. Proteger bloques de código ```lang ... ```
  let text = markdown.replace(/```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push({ lang, code });
    return placeholder;
  });

  // 2. Proteger código inline `...`
  const inlineCodes = [];
  text = text.replace(/`([^`\n]+)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(code);
    return placeholder;
  });

  // 3. Escapar caracteres especiales de HTML
  text = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 4. Encabezados: ### Titulo -> <b>Titulo</b>
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '<b>$1</b>');

  // 5. Negrita: **texto** -> <b>texto</b>
  text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  // 6. Cursiva: *texto* -> <i>texto</i>
  text = text.replace(/(?<![*\w])\*([^*]+)\*(?![*\w])/g, '<i>$1</i>');

  // 7. Listas con viñetas: - o * -> •
  text = text.replace(/^[*-]\s+/gm, '• ');

  // 8. Restaurar código inline escapado
  text = text.replace(/__INLINE_CODE_(\d+)__/g, (match, idx) => {
    const code = inlineCodes[Number(idx)] || '';
    const safeCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code>${safeCode}</code>`;
  });

  // 9. Restaurar bloques de código escapados
  text = text.replace(/__CODE_BLOCK_(\d+)__/g, (match, idx) => {
    const item = codeBlocks[Number(idx)];
    if (!item) return '';
    const safeCode = item.code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre><code>${safeCode}</code></pre>`;
  });

  return text;
}

// Dividir mensajes largos para no exceder el límite de 4096 caracteres de Telegram
function splitIntoChunks(text, maxLen = 3900) {
  if (text.length <= maxLen) return [text];
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let cutIdx = remaining.lastIndexOf('\n', maxLen);
    if (cutIdx === -1 || cutIdx < maxLen * 0.5) {
      cutIdx = maxLen;
    }
    chunks.push(remaining.slice(0, cutIdx).trim());
    remaining = remaining.slice(cutIdx).trim();
  }
  return chunks;
}

// Enviar respuesta con formato enriquecido y fallback seguro
async function sendFormattedReply(ctx, rawMarkdown) {
  const html = markdownToTelegramHtml(rawMarkdown);
  const chunks = splitIntoChunks(html, 3900);

  for (const chunk of chunks) {
    try {
      await ctx.reply(chunk, { parse_mode: 'HTML' });
    } catch (err) {
      console.warn('[Telegram Bridge] Fallo al parsear HTML en Telegram, enviando texto plano:', err.message);
      const plain = chunk.replace(/<[^>]+>/g, '');
      await ctx.reply(plain);
    }
  }
}

async function sendFormattedMessage(bot, chatId, rawMarkdown) {
  const html = markdownToTelegramHtml(rawMarkdown);
  const chunks = splitIntoChunks(html, 3900);
  for (const chunk of chunks) {
    try {
      await bot.telegram.sendMessage(chatId, chunk, { parse_mode: 'HTML' });
    } catch (err) {
      const plain = chunk.replace(/<[^>]+>/g, '');
      await bot.telegram.sendMessage(chatId, plain);
    }
  }
}

  // 1️⃣ Comando /start
  bot.start(async (ctx) => {
    registerChat(ctx.chat.id);
    await sendFormattedReply(
      ctx,
      `👋 ¡Hola, ${ctx.from.first_name || 'estudiante'}! Bienvenido al ecosistema **miCampus AI** 🥋.\n\n` +
      `Cuentas con dos tutores conectados a tu Mac:\n` +
      `• 🥋 **SenseiBot**: Fechas, entregas y motivación diaria.\n` +
      `• 💻 **CodeSensei**: Especialista en Java, Spring Boot y programación.\n\n` +
      `Comandos rápidos:\n` +
      `• \`/ask\` <duda general o fechas>\n` +
      `• \`/code\` <duda o error de programación>\n\n` +
      `También puedes escribir cualquier mensaje normal y el sistema lo detectará automáticamente.`
    );
  });

  // 2️⃣ Comando /ask <pregunta general / coach>
  bot.command('ask', async (ctx) => {
    registerChat(ctx.chat.id);
    const query = ctx.message.text.replace(/^\/ask\s*/, '').trim();
    if (!query) {
      return sendFormattedReply(ctx, 'Escribe tu duda después de `/ask`. Ejemplo:\n`/ask ¿Qué entregas tengo próximas?`');
    }

    await ctx.sendChatAction('typing');
    const answer = await askAgent('coach.request', query);
    await sendFormattedReply(ctx, answer);
  });

  // 3️⃣ Comando /code o /java <duda de programación>
  bot.command(['code', 'java', 'springboot'], async (ctx) => {
    registerChat(ctx.chat.id);
    const query = ctx.message.text.replace(/^\/(code|java|springboot)\s*/i, '').trim();
    if (!query) {
      return sendFormattedReply(ctx, '💻 Escribe tu duda técnica después de `/code`. Ejemplo:\n`/code ¿Cómo se hace un controlador REST con @GetMapping en Spring Boot?`');
    }

    await ctx.sendChatAction('typing');
    const answer = await askAgent('code.request', query);
    await sendFormattedReply(ctx, answer);
  });

  // 4️⃣ Mensajes de texto directos (auto-enrutamiento inteligente)
  bot.on('text', async (ctx) => {
    registerChat(ctx.chat.id);
    const text = ctx.message.text.trim();
    if (text.startsWith('/')) return; // ignora otros comandos

    await ctx.sendChatAction('typing');
    if (isCodeQuery(text)) {
      console.log(`[Bridge] 🧠 Derivando consulta técnica a CodeSensei ("${text.slice(0, 40)}...")`);
      const answer = await askAgent('code.request', text);
      await sendFormattedReply(ctx, answer);
    } else {
      console.log(`[Bridge] 🥋 Derivando consulta a SenseiBot ("${text.slice(0, 40)}...")`);
      const answer = await askAgent('coach.request', text);
      await sendFormattedReply(ctx, answer);
    }
  });

  // 5️⃣ Escuchar alertas y recordatorios de NATS y enviarlos por Telegram
  const reminderSub = nc.subscribe('coach.reminder');
  (async () => {
    for await (const msg of reminderSub) {
      const reminderText = sc.decode(msg.data);
      console.log('🔔 [Telegram Bridge] Recibido recordatorio en coach.reminder:', reminderText);

      const chats = getActiveChats();
      for (const chatId of chats) {
        try {
          await sendFormattedMessage(bot, chatId, reminderText);
        } catch (e) {
          console.error(`Error enviando recordatorio al chat ${chatId}:`, e.message);
        }
      }
    }
  })();

  // Iniciar bot
  await bot.launch();
  console.log('✨ Telegram Bridge activo y escuchando en @MC_SenseBot');

  // Cierre controlado
  const shutdown = async () => {
    console.log('\n🛑 Cerrando Telegram Bridge...');
    bot.stop('SIGINT');
    await nc.drain();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch(err => {
  if (err?.response?.error_code === 409) {
    console.warn('\n⚠️ [Telegram Bridge] Ya hay otra instancia del bot de Telegram en ejecución (por ejemplo, a través de "npm run agents"). Solo puede haber una activa a la vez.');
    process.exit(0);
  }
  console.error('Fatal crash en Telegram Bridge:', err);
  process.exit(1);
});
