import os
import json
import requests
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

# Cargar variables de entorno desde el archivo .env
load_dotenv()

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
SUBJECTS_DIR = "/Users/blanca/Micampus/micampus-spa/public/data/ioc/gestion/"
BACKEND_URL = "http://localhost:3001/api/eac/status"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "👋 ¡Hola princesa! Soy HERMES, tu agente personal integrado con Mi Campus.\n\n"
        "Prueba a preguntarme:\n"
        "👉 /pendientes - Te diré qué entregas tienes activas.\n"
        "👉 /tengo_dudas - Resolveré tus dudas de cualquier asignatura usando tus apuntes.\n"
        "👉 /entregar [asignatura] [eacId] - Marcaré una EAC como completada."
    )

async def tengo_dudas(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [
            InlineKeyboardButton("ENT (Entornos)", callback_data="duda_ent"),
            InlineKeyboardButton("DESP (Despliegue)", callback_data="duda_desp"),
        ],
        [
            InlineKeyboardButton("DIGI (Diseño)", callback_data="duda_digi"),
            InlineKeyboardButton("IPO (Interfaces)", callback_data="duda_ipo"),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("🤔 ¿Sobre qué asignatura tienes dudas?", reply_markup=reply_markup)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    
    # query.data contendrá "duda_ent", "duda_desp", etc.
    asignatura = query.data.split("_")[1].upper()
    
    await query.edit_message_text(
        text=f"¡Entendido! Has elegido **{asignatura}**.\n\n"
             f"Estoy cargando en mi memoria tus apuntes locales de {asignatura}. "
             f"Dime, ¿cuál es tu duda exacta? (Pronto conectaremos esto con Ollama 🧠)",
        parse_mode="Markdown"
    )

async def pendientes(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    response_text = "📚 *Tus entregas pendientes:*\n\n"
    found_any = False
    
    try:
        for filename in os.listdir(SUBJECTS_DIR):
            if filename.endswith(".json"):
                filepath = os.path.join(SUBJECTS_DIR, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for eac in data.get("eacs", []):
                        if eac.get("status") == "pending":
                            found_any = True
                            response_text += f"🔸 *{data.get('id').upper()}* - {eac.get('title')}\n📅 Límite: {eac.get('dueDate')}\n\n"
                            
        if not found_any:
            response_text = "🎉 ¡No tienes ninguna entrega pendiente! Estás al día."
            
        await update.message.reply_text(response_text, parse_mode="Markdown")
        
    except Exception as e:
        await update.message.reply_text(f"❌ Uy, ha habido un problema leyendo tu campus: {e}")

async def entregar(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    args = context.args
    if len(args) < 2:
        await update.message.reply_text("Uso correcto: /entregar [asignatura] [eacId]\nEjemplo: /entregar ent eac1")
        return
        
    subject_id = args[0].lower()
    eac_id = args[1].lower()
    
    try:
        res = requests.put(BACKEND_URL, json={
            "subjectId": subject_id,
            "eacId": eac_id,
            "status": "done"
        })
        
        if res.status_code == 200:
            progress = res.json().get('progress', 0)
            await update.message.reply_text(f"✅ ¡Entendido! He marcado la {eac_id} de {subject_id.upper()} como completada en tu campus. Tu progreso sube al {progress}%.")
        else:
            await update.message.reply_text(f"⚠️ El servidor del campus devolvió un error: {res.json().get('error')}")
            
    except Exception as e:
        await update.message.reply_text("❌ No he podido conectar con el backend de Mi Campus. Asegúrate de que el servidor en el puerto 3001 está encendido.")

async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = update.message.text.lower()
    if "hola" in text or "buenos días" in text or "buenas" in text:
        await update.message.reply_text("¡Hola princesa! 👋 ¿En qué te puedo ayudar hoy? Prueba a usar /tengo_dudas o /pendientes.")
    else:
        await update.message.reply_text("Todavía no entiendo mucho texto libre (estoy esperando a que conectes mi cerebro local Ollama 🧠). ¡Pero puedes usar los comandos del menú!")

def main() -> None:
    if not TELEGRAM_TOKEN:
        print("⚠️ ERROR: No has configurado tu TELEGRAM_TOKEN. Por favor, añádelo a tu archivo .env")
        return

    application = Application.builder().token(TELEGRAM_TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("pendientes", pendientes))
    application.add_handler(CommandHandler("entregar", entregar))
    application.add_handler(CommandHandler("tengo_dudas", tengo_dudas))
    application.add_handler(CallbackQueryHandler(button_handler))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))

    print("🤖 HERMES iniciado y escuchando mensajes de Telegram...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
