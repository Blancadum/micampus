# 🧠 Guía Definitiva: Proyecto HERMES (IA Local + Mi Campus + Obsidian)

Has planteado el ecosistema definitivo de productividad. Lo que quieres construir no es un simple bot, sino un **Sistema Multi-Interfaz impulsado por una Inteligencia Artificial Local (100% Gratuita y Privada)** que actúa como tu asistente académico personal (Hermes).

He escaneado tu sistema y las noticias son inmejorables:
> 💻 **Tu hardware:** MacBook Pro (Mac17,8) con **Chip Apple M5 Pro (18 núcleos)** y **48 GB de Memoria Unificada**. 

Tener 48GB de memoria unificada en un M5 Pro es el paraíso de la IA local. A diferencia de los PCs tradicionales, tu Mac puede usar casi toda esa memoria directamente como VRAM para la tarjeta gráfica integrada, lo que te permite correr modelos gigantes y extremadamente inteligentes en local a una velocidad de vértigo.

---

## 📚 Contexto Teórico: ¿Quién habla con quién?

Antes de ponernos manos a la obra, aclaremos tus dudas sobre cómo encajan las piezas:

1. **¿Hermes hablará conmigo (Antigravity)?** 
   No. Yo soy Antigravity, tu asistente de programación (vivo en los servidores de Google y te ayudo a programar). *Hermes* será un "agente" que vivirá **dentro de tu Mac**. Será un modelo de IA de código abierto (como Llama o Mistral) que ejecutaremos en tu ordenador. Yo te ayudaré a programar a Hermes, pero luego Hermes operará de forma independiente sin internet.
2. **¿Puede Hermes estar en la Web y en Telegram a la vez?**
   Sí. Hermes será un "cerebro central" (un servidor local de IA). La web de Mi Campus, el bot de Telegram y Obsidian serán simplemente **las bocas y las orejas** (los clientes) que se conectarán a ese mismo cerebro.

---

## 🛠️ Fase 1: El Motor de IA Local (Costo Cero)

Para no pagar ni un céntimo, usaremos **Ollama**, el estándar de la industria para ejecutar LLMs (Modelos de Lenguaje Grande) en local, optimizado brutalmente para los chips Apple Silicon.

### Paso a paso:
1. Ve a [ollama.com](https://ollama.com) y descarga la app para macOS.
2. Instálala. Verás el icono de una alpaca en tu barra superior de Mac.
3. Abre tu terminal y ejecuta tu primer modelo. 

**Modelos recomendados para tu M5 Pro (48GB RAM):**
Dado tu hardware, puedes ejecutar cosas muy pesadas. Te recomiendo descargar estos dos:
- `ollama run llama3.1:8b` (Un modelo ligero y ultra-rápido, ideal para charlar rápido por Telegram y clasificar tareas. Ocupa unos 5GB de RAM).
- `ollama run qwen2.5:32b` o `mixtral:8x7b` (Modelos "pesados" de nivel profesional. Ocupan unos 20-25GB de RAM. Son más lentos pero tienen un razonamiento y comprensión lectora brutal, ideales para que Hermes resuma tus apuntes).

> *Teoría:* Al ejecutar un modelo en Ollama, este levanta automáticamente un servidor API invisible en tu Mac en el puerto `11434`. ¡Ese es el cerebro de Hermes encendido!

---

## 🛠️ Fase 2: Conectar HERMES (El Backend)

Ya tenemos el cerebro (Ollama) y los datos (los JSON de Mi Campus). Ahora hay que conectarlos.
Modificaremos el script que hicimos antes (`hermes_bot.py`) y el servidor (`server.js`) para que hagan de puente.

### Paso a paso:
1. Instalaremos la librería `langchain` o la librería oficial de `ollama` en tu entorno de Python o Node.
2. Programaremos una función llamada `preguntar_a_hermes(mensaje)` que:
   - Coja tu mensaje ("¿Qué tareas tengo para mañana?").
   - Lea el archivo `ent.json`.
   - Le pase todo al cerebro local (Ollama en el puerto 11434) con una instrucción: *"Eres Hermes. Mira estos datos en JSON y responde a la chica"*.
   - Devuelva la respuesta inteligente generada.

---

## 🛠️ Fase 3: Las 3 Interfaces (Omnicanalidad)

Una vez que el backend sabe hablar con Ollama, lo conectamos a todos lados:

### 1. La Web (Mi Campus)
Crearemos un componente en React llamado `ChatHermes.jsx`. Será una burbuja flotante en la esquina inferior derecha de la SPA.
- **Teoría:** Haremos que el chat de la web envíe un `POST` a tu servidor local `http://localhost:3001/api/chat`. El servidor usará Ollama para pensar, y devolverá el texto.

### 2. Telegram (En movilidad)
Usaremos el bot que empezamos a programar. En lugar de respuestas pre-programadas, el bot cogerá tu mensaje de audio o texto, se lo enviará al servidor local de tu Mac (que tiene que estar encendido en casa) y te devolverá la respuesta.

### 3. Obsidian (La Bóveda de Conocimiento)
Obsidian es la herramienta perfecta para integrarse con IAs locales.
- **Teoría:** Los apuntes de Mi Campus pueden guardarse como `.md` dentro de una "Vault" (Bóveda) de Obsidian. 
- **Paso a paso:**
  1. Instala el plugin de Obsidian llamado **"Smart Connections"** o **"Text Generator"** (ambos gratuitos).
  2. En los ajustes del plugin, selecciona como proveedor de IA **"Ollama (Local)"** o "Custom API".
  3. Pon la dirección `http://localhost:11434`.
  4. ¡Listo! Ahora Hermes podrá leer todo tu grafo de Obsidian y podrás chatear con tus apuntes sin salir de la aplicación, usando los modelos que descargamos en la Fase 1.

---

## 🎯 Plan de Acción Inmediato

Si estás decidida a ir por este camino (y teniendo ese maquinón de M5 Pro sería un delito no hacerlo), el orden exacto de ataque es:

1. **Instalar Ollama** en tu Mac y descargar `llama3.1:8b`.
2. **Actualizar el servidor local** que hicimos (`server.js`) para que se conecte a Ollama.
3. **Crear el Chat Web** en Mi Campus para que puedas hablar con Hermes sin salir de tu portal.
4. **Conectar Telegram** (para cuando no estés frente al ordenador).
5. **Configurar Obsidian** con el plugin para que lea tus `.md`.
