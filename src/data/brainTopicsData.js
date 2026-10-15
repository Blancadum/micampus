/**
 * Base de datos enriquecida de temas transversales para Second Brain
 * Conecta asignaturas de IOC (ENT, DESP, DIGI), Accenture (Spring Boot / Java) y SEPE.
 * Formato de blog de ingeniería con enlaces cruzados, analogías técnicas y scripts de automatización.
 */
export const BRAIN_TOPICS_DATA = [
  {
    "id": "vm",
    "category": "vm",
    "tags": [
      "Virtualización",
      "Mac",
      "Linux",
      "UTM"
    ],
    "topicTag": "Virtualización & Apple Silicon",
    "emoji": "💻",
    "title": "Máquinas Virtuales en Mac M5 (UTM vs VirtualBox)",
    "summary": "Elección técnica de UTM / Apple Virtualization Framework sobre VirtualBox en Mac Apple Silicon (ARM64), Ubuntu y comandos nativos para macOS.",
    "videoUrl": "/fuentes/ioc/ent/How to Use Eclipse IDE for Java — Complete Setup, JDK & First Project.mp4",
    "videoTitle": "Configuración de Eclipse IDE, Java JDK y Primer Proyecto en Entorno Virtual / Mac",
    "commonPoints": [
      {
        "title": "Entorno de Ejecución Compartido para ENT y DESP",
        "desc": "Tanto la Unidad 1 de Entornos (instalación de IDEs, Papyrus y Java SDK) como el Bloque 1 de Despliegue (servidores web Apache, SSH, FTPS y cortafuegos) requieren una máquina invitada Linux Ubuntu. En lugar de instalar dos sistemas operativos independientes, el mismo hipervisor y la misma máquina virtual sirven para ambas asignaturas."
      },
      {
        "title": "La Realidad de Apple Silicon (ARM64)",
        "desc": "Los materiales docentes clásicos fueron redactados para PCs con arquitectura Intel/AMD x86_64 y recomiendan VirtualBox. En ordenadores Mac con chips M1/M2/M3/M4/M5, la arquitectura nativa es ARM64. Usar VirtualBox produce cuelgues constantes en el kernel (kernel panics), emulación lenta por software y fallo de aceleración gráfica."
      },
      {
        "title": "Cumplimiento Estricto de la Rúbrica de Evaluación",
        "desc": "Aunque el hipervisor del anfitrión sea UTM en lugar de VirtualBox, el sistema operativo invitado es Ubuntu Server/Desktop 24.04 LTS oficial. Todos los comandos de terminal bash, paquetes apt, servicios systemd y ficheros de configuración son 100% idénticos a los solicitados en los enunciados."
      },
      {
        "title": "Mapeo de Puertos y Trabajo en Red Local",
        "desc": "Con la configuración de Port Forwarding en el hipervisor (puerto 2222 para SSH y puerto 8080 para Web), el MacBook Pro accede a los servicios de la máquina virtual desde su propio navegador y terminal sin necesidad de complejas redes puente."
      }
    ],
    "crossCompare": [
      {
        "campus": "IOC DAW (0487 ENT)",
        "type": "ioc",
        "text": "Unidad 1 de ENT: Justificación técnica de UTM con Ubuntu ARM64 sobre VirtualBox para instalar Eclipse, Papyrus UML y Java SDK sin cuelgues de kernel."
      },
      {
        "campus": "IOC DAW (0614 DESP)",
        "type": "ioc",
        "text": "Bloque 1 de DESP: Servidores Apache, FTPS y SSH en Ubuntu ARM64 con redirección de puertos (Port Forwarding: 8080 y 2222) hacia el anfitrión macOS."
      },
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Entorno de ejecución Linux nativo ARM64 compatible con contenedores Docker y microservicios sin penalización de emulación Rosetta."
      }
    ],
    "cheat": "# Comprobar arquitectura de CPU en Mac\nuname -m   # Salida: arm64\n\n# Instalar UTM y descargar Ubuntu ARM64\nbrew install --cask utm\ncurl -L -O https://releases.ubuntu.com/noble/ubuntu-24.04.1-live-server-arm64.iso\n\n# Alternativa instantánea en 1 línea con Multipass\nbrew install --cask multipass && multipass launch noble",
    "tutorial": {
      "type": "tool",
      "toolName": "UTM / Multipass en macOS",
      "steps": [
        {
          "num": 1,
          "title": "Verificar la arquitectura de hardware de tu Mac",
          "cmd": "uname -m",
          "explanation": "Debe devolver \"arm64\", lo que confirma que tu procesador es Apple Silicon y requiere hipervisores e imágenes compatibles con ARM64."
        },
        {
          "num": 2,
          "title": "Instalar el gestor de paquetes Homebrew",
          "cmd": "/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"",
          "explanation": "Homebrew es el estándar de la industria en macOS para instalar herramientas de desarrollo sin lidiar con instaladores gráficos manuales."
        },
        {
          "num": 3,
          "title": "Instalar UTM (Hipervisor nativo con soporte Apple Virtualization)",
          "cmd": "brew install --cask utm",
          "explanation": "UTM utiliza las APIs oficiales Hypervisor.framework de Apple para ejecutar el procesador ARM64 a velocidad nativa 1:1 sin emulación."
        },
        {
          "num": 4,
          "title": "Descargar la ISO oficial de Ubuntu Server 24.04 ARM64",
          "cmd": "curl -L -O https://releases.ubuntu.com/noble/ubuntu-24.04.1-live-server-arm64.iso",
          "explanation": "Descarga directa desde los servidores oficiales de Canonical de la versión compatible con procesadores ARM64."
        },
        {
          "num": 5,
          "title": "Configurar Port Forwarding en la máquina virtual UTM",
          "cmd": "# En Ajustes de la VM en UTM -> Red -> Avanzado:\n# Añadir regla 1: Host 2222 -> Guest 22 (SSH)\n# Añadir regla 2: Host 8080 -> Guest 80 (Apache Web)",
          "explanation": "Permite conectarte mediante \"ssh -p 2222 blanca@localhost\" y ver tus páginas web en \"http://localhost:8080\" directamente desde Safari o Chrome."
        },
        {
          "num": 6,
          "title": "[Alternativa CLI Instantánea] Levantar Ubuntu en 30 segundos con Multipass",
          "cmd": "brew install --cask multipass\nmultipass launch --name ubuntu-ioc --cpus 2 --memory 4G --disk 25G noble\nmultipass shell ubuntu-ioc",
          "explanation": "Multipass es la herramienta oficial de Canonical para macOS que descarga, crea y arranca una máquina virtual de Ubuntu lista para usar en una sola orden de terminal."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un profesor universitario senior y arquitecto de sistemas de primer nivel. Vas a generar un guion completo y detallado para un VÍDEO EXPLICATIVO educativo de 6 minutos titulado: \"Virtualización en Mac con Apple Silicon (M1-M5): Por qué UTM y Multipass superan a VirtualBox en DAW y Desarrollo Web\".\n\nEL CONTEXTO ESPECÍFICO DE LA ALUMNA:\n- Mi nombre es Blanca. Estoy cursando el ciclo superior de Desarrollo de Aplicaciones Web (DAW) en el IOC (materias de Entornos de Desarrollo 0487 y Despliegue de Aplicaciones Web 0614) y formándome en Java Spring Boot con Accenture.\n- Mi equipo principal de trabajo es un MacBook Pro con procesador Apple Silicon M5 (arquitectura ARM64).\n- En los ejercicios y rúbricas los profesores siempre piden \"Oracle VirtualBox\", pero en mi equipo se congela, tiene cuelgues de kernel y no está optimizado.\n\nESTRUCTURA EXACTA DEL GUION QUE DEBES GENERAR:\n1. MINUTO 0:00 - 0:45: GANCHO Y EL CONFLICTO TÉCNICO\n   - Explica con claridad la diferencia entre la arquitectura x86_64 (PC tradicional Intel/AMD) y la arquitectura ARM64 de los procesadores Apple Silicon.\n   - Describe con una analogía por qué Oracle VirtualBox es como intentar encajar un motor diésel pesado en un deportivo eléctrico: la emulación por software drena la batería y bloquea el kernel.\n2. MINUTO 0:45 - 2:30: LA SOLUCIÓN TÉCNICA ELEGIDA (UTM & APPLE VIRTUALIZATION)\n   - Presenta a UTM y cómo se comunica directamente con las APIs de virtualización del kernel de macOS a velocidad nativa 1:1.\n   - Demuestra con argumentos sólidos por qué esto cumple al 100% las rúbricas docentes: el sistema invitado sigue siendo Ubuntu Server 24.04 LTS con exactamente los mismos comandos de terminal.\n3. MINUTO 2:30 - 4:15: TUTORIAL PRÁCTICO PASO A PASO POR COMANDOS DE MAC\n   - Muestra cómo instalar Homebrew, UTM y la ISO oficial de Ubuntu Server ARM64 desde la terminal zsh.\n   - Explica el truco de la redirección de puertos (Port Forwarding): mapear el puerto 2222 para SSH y el 8080 para el servidor web Apache, permitiendo trabajar desde el Mac sin complicaciones de IP.\n   - Menciona la alternativa instantánea de Multipass de Canonical para quien prefiera no usar interfaz gráfica.\n4. MINUTO 4:15 - 5:30: APLICACIÓN CRUZADA (ENTORNOS VS DESPLIEGUE VS ACCENTURE)\n   - Explica cómo este mismo entorno de Ubuntu sirve para levantar Apache, FTPS y SSH en Despliegue, y a la vez ejecutar Eclipse, Papyrus UML y Java en Entornos.\n5. MINUTO 5:30 - 6:00: CONCLUSIÓN Y MENSAJE DE TRANQUILIDAD DOCENTE\n   - Cierre contundente y profesional con una lista de verificación (checklist) para justificar la elección técnica en la memoria de la práctica ante el profesor.\n\nTONO Y ESTILO:\n- Tono dinámico, seguro, entusiasta, riguroso y pedagógico.\n- Incluye indicaciones visuales entre corchetes [Corte a pantalla de terminal], [Gráfico animado de arquitectura x86 vs ARM64] y sugerencias de efectos de sonido.",
    "readTime": "6 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "docker",
      "arch",
      "http"
    ],
    "blogPost": {
      "headline": "Apple Silicon no perdona la emulación: por qué VirtualBox muere y UTM vuela",
      "intro": "Llegas a clase de Entornos (ENT) o Despliegue (DESP). El temario en PDF fue escrito en 2017 para ordenadores x86_64 con procesador Intel o AMD. La instrucción dice: \"Descarga Oracle VirtualBox e instala Ubuntu\". Lo haces en tu MacBook Pro con chip M-Series ARM64 y el resultado es desolador: el ventilador ruge, el ratón se congela y a los diez minutos tienes un kernel panic. No es tu ordenador; es la física de las arquitecturas de CPU.",
      "analogy": {
        "concept": "Emulación x86 por software vs Virtualización nativa ARM64",
        "metaphor": "Es como intentar que un traductor humano traduzca palabra por palabra en tiempo real una conversación a 300 palabras por minuto mientras corre una maratón. Si usas VirtualBox en Apple Silicon, cada llamada de sistema x86 debe traducirse por software. Con UTM y el Apple Hypervisor Framework, el procesador habla su idioma nativo: Ubuntu Server ARM64 se ejecuta a velocidad 1:1 sin penalización.",
        "takeaway": "No emules lo que puedes virtualizar de forma nativa. La arquitectura del host y del guest deben alinearse."
      },
      "theProblem": "El problema real es cumplir la rúbrica del profesor sin romper tu máquina. Muchos alumnos se rinden y buscan un PC viejo con Windows. El truco de ingeniería es entender que al profesor no le importa el hipervisor (VirtualBox es solo un vehículo); le importa el sistema operativo invitado (Ubuntu Server 24.04 LTS), los comandos bash, systemd, Apache y las capturas de terminal.",
      "crossCurricularInsight": "La misma máquina virtual Ubuntu ARM64 levantada en UTM con port forwarding (2222 para SSH y 8080 para Web) te resuelve simultáneamente la Unidad 1 de Entornos (Eclipse IDE, Java SDK) y el Bloque 1 de Despliegue (servidores web Apache y cortafuegos ufw), ahorrándote 40 GB de disco y duplicidad de mantenimiento."
    },
    "cavemanScript": {
      "title": "Verificador de Puertos y VM Viva (Socket Raw)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. CERO CORDIALIDAD. CERO EXPLICACIONES. COMPROBAR SOCKET EN PUERTOS 2222 (SSH) Y 8080 (APACHE). SI ABIERTOS -> IMPRIMIR \"VM_OK\". SI CERRADOS -> IMPRIMIR \"VM_MUERTA\" Y SALIR CON CODIGO 1.",
      "code": "import socket\nimport sys\n\nTARGETS = [(\"127.0.0.1\", 2222, \"SSH\"), (\"127.0.0.1\", 8080, \"WEB\")]\n\nfor host, port, name in TARGETS:\n    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    sock.settimeout(0.8)\n    try:\n        sock.connect((host, port))\n        sock.close()\n    except Exception as err:\n        print(f\"FALLO: {name} en {host}:{port} no responde -> {err}\")\n        sys.exit(1)\n\nprint('{\"status\": \"VM_OK\", \"ssh_2222\": true, \"web_8080\": true}')\nsys.exit(0)",
      "explanation": "Verificación bruta en menos de 100ms sin dependencias externas. Si falla, el script rompe el flujo de terminal de inmediato."
    }
  },
  {
    "id": "git",
    "category": "git",
    "tags": [
      "Git",
      "Versionado",
      "GitHub",
      "CI/CD"
    ],
    "topicTag": "Control de Versiones",
    "emoji": "🌿",
    "title": "Flujos de Trabajo con Git & GitHub",
    "summary": "Gestión de ramas, commits semánticos, resolución de conflictos y trazabilidad gráfica de repositorios.",
    "videoUrl": "/fuentes/ioc/ent/Git-cuqui.mp4",
    "videoTitle": "Flujos de Trabajo con Git & GitHub Explicados de Forma Visual",
    "commonPoints": [
      {
        "title": "Estándar Universal de la Industria",
        "desc": "Git no es una herramienta exclusiva de una materia; es el sistema de control de versiones obligatorio en cualquier desarrollo moderno. Entender el flujo entre Working Tree, Staging Area y Commits es fundamental para no perder código."
      },
      {
        "title": "Trazabilidad y Evaluación Docente",
        "desc": "En las materias de IOC (especialmente ENT Unidad 3) se evalúa obligatoriamente el grafo de confirmaciones (git log --graph). En Accenture, se exigen ramas separadas por actividad (SPRING-BOOT, 00-preparacion-del-entorno, 01-creacion-del-controller) con Pull Requests limpios."
      },
      {
        "title": "Protección de Repositorios con .gitignore",
        "desc": "Subir archivos binarios compilados (.class, bin/, target/), temporales (.DS_Store) o credenciales locales (.env) penaliza gravemente en las entregas de ambas plataformas. Un .gitignore limpio desde el commit inicial es obligatorio."
      },
      {
        "title": "Resolución de Conflictos Sin Miedo",
        "desc": "Fusionar ramas (git merge) y toparse con marcas de conflicto (<<<<<<<, =======, >>>>>>>) es parte natural del trabajo en equipo. Saber interpretar el origen de cada cambio garantiza fusiones seguras."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Conventional commits para las actividades (feat: ..., fix: ...) y apertura de Pull Requests hacia main-spring-boot."
      },
      {
        "campus": "IOC DAW (0487 ENT)",
        "type": "ioc",
        "text": "Unidad 3 de ENT (EAC3): control de versiones, creación de ramas, resolución de conflictos y etiquetas release (git tag)."
      },
      {
        "campus": "SEPE Servidor Web",
        "type": "sep",
        "text": "Control de cambios en el proyecto PHP MVC, backups y despliegue local."
      }
    ],
    "cheat": "git checkout -b feature/modulo-auth\ngit commit -m \"feat(api): add jwt token filter\"\ngit push -u origin feature/modulo-auth",
    "tutorial": {
      "type": "tool",
      "toolName": "Flujo Completo Git en Terminal macOS",
      "steps": [
        {
          "num": 1,
          "title": "Configurar identidad global de Git",
          "cmd": "git config --global user.name \"Blanca Perez\"\ngit config --global user.email \"tu-email@dominio.com\"",
          "explanation": "Registra tu autoría en todos los commits locales que se enviarán a GitHub."
        },
        {
          "num": 2,
          "title": "Crear un .gitignore oficial para desarrollo Java y macOS",
          "cmd": "cat << 'EOF' > .gitignore\n*.class\nbin/\ntarget/\n.metadata/\n.settings/\n.classpath\n.project\n.DS_Store\n*.log\nEOF",
          "explanation": "Evita que los binarios compilados de Java o archivos ocultos de Mac ensucien el repositorio."
        },
        {
          "num": 3,
          "title": "Inicializar repositorio y rama principal main",
          "cmd": "git init\ngit branch -M main\ngit add .\ngit commit -m \"chore: inicializar repositorio con .gitignore\"",
          "explanation": "Crea el repositorio local y realiza el primer commit fundacional."
        },
        {
          "num": 4,
          "title": "Crear rama de trabajo para una actividad o funcionalidad",
          "cmd": "git checkout -b feature/actividad-1\n# ... realizas tus cambios en código ...\ngit add .\ngit commit -m \"feat: completar implementacion solicitada\"",
          "explanation": "Aísla el desarrollo en una rama independiente para no comprometer la rama principal."
        },
        {
          "num": 5,
          "title": "Fusionar ramas y capturar el grafo para la entrega",
          "cmd": "git checkout main\ngit merge feature/actividad-1\ngit log --oneline --graph --decorate --all",
          "explanation": "El comando git log --graph genera la captura visual obligatoria solicitada en las memorias de evaluación de EAC."
        },
        {
          "num": 6,
          "title": "Crear etiqueta release (Tag) y subir con etiquetas a GitHub",
          "cmd": "git tag -a v1.0-entrega -m \"Version final evaluable\"\ngit push -u origin main --tags",
          "explanation": "Etiqueta el punto exacto de la entrega para que el profesorado pueda verificar el estado inmutable."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un mentor de programación y especialista en DevOps. Vas a generar un guion para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"Domina Git y GitHub: El Flujo Definitivo para Aprobar tus Prácticas y Entregas sin Miedo\".\n\nCONTEXTO DEL ESTUDIANTE:\n- Soy Blanca, estudiante de DAW y formación Java en Accenture.\n- Necesito un vídeo que me enseñe cómo usar Git de forma profesional en terminal macOS (zsh), cómo estructurar mis ramas para las actividades prácticas y cómo interpretar el grafo de ramas que piden los profesores de ENT y Accenture.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 0:45): Por qué los programadores le tienen miedo a Git y cómo un modelo mental claro (Working Tree -> Staging -> Commit) lo hace trivial.\n2. EL FLUJO DE RAMAS PROFESIONAL (0:45 - 2:00): Explicar por qué nunca se programa directamente en 'main', cómo crear ramas feature y qué es un Conventional Commit (feat:, fix:, chore:).\n3. EL TEMIDO CONFLICTO DE FUSIÓN (2:00 - 3:30): Muestra con un ejemplo práctico dos ramas editando la misma línea, cómo leer las marcas <<<<<<< y cómo resolverlo con calma.\n4. LA CAPTURA DEL GRAFO Y LOS TAGS (3:30 - 4:30): El comando mágico \"git log --oneline --graph --decorate --all\" y por qué los evaluadores lo exigen en las memorias PDF.\n5. RESUMEN EN 30 SEGUNDOS (4:30 - 5:00): Las 5 reglas de oro para no perder nunca código.\n\nTONO: Inspirador, muy práctico, con metáforas visuales claras y ritmo ágil.",
    "readTime": "7 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "copilot-spring-accenture",
      "arch",
      "spring-initializr"
    ],
    "blogPost": {
      "headline": "Git no es un servicio de almacenamiento en la nube: es una máquina del tiempo de grafos dirigidos",
      "intro": "El error más común al empezar con Git es tratarlo como un Google Drive de código: hacer commits como si fueran \"guardar archivo\" con mensajes del tipo \"arreglos\", \"cambios varios\" o \"subiendo código\". Cuando un proyecto escala o trabajas en un equipo corporativo como Accenture, ese enfoque convierte el historial en un laberinto inauditable.",
      "analogy": {
        "concept": "Ramas en Git (Branches) y árboles de commits acíclicos (DAG)",
        "metaphor": "Piensa en una novela de ciencia ficción sobre viajes en el tiempo. La rama \"main\" es la línea temporal canónica e inmutable: la historia que ya está publicada en librerías. Cada nueva rama (\"feature/login\" o \"01-creacion-controller\") es una realidad paralela donde puedes destruir el universo sin que el lector de la novela lo note. Cuando terminas y las pruebas pasan, haces un Pull Request y colapsas ambas realidades en un solo punto histórico.",
        "takeaway": "Una rama en Git pesa solo 41 bytes: es un simple puntero a un hash SHA-1. Crear ramas no cuesta nada; no crearlas cuesta horas de depuración."
      },
      "theProblem": "Trabajar directamente en main o subir código roto a la rama compartida bloquea a todo el equipo y hace imposible aplicar git bisect para rastrear qué commit introdujo una regresión de rendimiento o un fallo de seguridad.",
      "crossCurricularInsight": "La disciplina de ramas feature/ y commits semánticos (feat, fix, docs, refactor) que exige Accenture en el bootcamp de Spring Boot es exactamente la misma convención requerida en las entregas EAC del IOC y en proyectos de producción."
    },
    "cavemanScript": {
      "title": "Limpiador de Ramas Locales Muertas (Git Prune Local)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. LEER RAMAS GIT MERGEADAS. BORRAR TODAS EXCEPTO MAIN Y MASTER. CERO PREGUNTAS. SI ERROR -> IMPRIMIR Y MATAR.",
      "code": "import subprocess\nimport sys\n\ntry:\n    raw = subprocess.check_output([\"git\", \"branch\", \"--merged\"]).decode(\"utf-8\")\n    branches = [b.strip().replace(\"* \", \"\") for b in raw.splitlines() if b.strip()]\n    protected = {\"main\", \"master\", \"develop\", \"HEAD\"}\n    deleted = []\n\n    for b in branches:\n        if b not in protected and not b.startswith(\"(\"):\n            subprocess.check_call([\"git\", \"branch\", \"-d\", b])\n            deleted.append(b)\n\n    print(f'{{\"deleted_count\": {len(deleted)}, \"branches\": {deleted}}}')\nexcept Exception as e:\n    print(f\"ERROR_GIT_CAVEMAN: {e}\")\n    sys.exit(1)",
      "explanation": "Elimina ramas locales residuales ya integradas en main para evitar acumular docenas de punteros obsoletos en el repositorio."
    }
  },
  {
    "id": "docker",
    "category": "docker",
    "tags": [
      "Docker",
      "Contenedores",
      "Linux",
      "Servidores"
    ],
    "topicTag": "Infraestructura & Contenedores",
    "emoji": "🐳",
    "title": "Docker, Entornos & Servidores Web",
    "summary": "Aislamiento de servicios, contenedores reproducibles, Docker Compose y gestión de puertos locales.",
    "videoUrl": "/fuentes/ioc/desp/De_local_a_producción_con_Docker.webm",
    "videoTitle": "De Local a Producción con Docker: Contenedores y Buenas Prácticas",
    "commonPoints": [
      {
        "title": "Aislamiento sin Sobrecarga de Hipervisor",
        "desc": "A diferencia de una máquina virtual pesada que emula hardware completo, Docker comparte el kernel del sistema operativo mediante cgroups y namespaces, levantando contenedores en milisegundos."
      },
      {
        "title": "Uso Cruzado en Despliegue y Accenture",
        "desc": "En Despliegue (DESP Bloque 3), Docker es el núcleo del despliegue moderno de servidores Apache/PHP. En Accenture, Docker Compose se usa para levantar bases de datos PostgreSQL o MySQL locales con un único comando."
      },
      {
        "title": "Reproducibilidad Garantizada",
        "desc": "El célebre \"en mi máquina funciona\" desaparece: una imagen Docker se comporta exactamente igual en tu Mac M5 que en el servidor de pruebas del profesor o en la nube."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Docker Compose para levantar bases de datos PostgreSQL/MySQL de soporte y plugins Maven de contenedor."
      },
      {
        "campus": "IOC DAW (0614 DESP)",
        "type": "ioc",
        "text": "Bloque 3 de DESP: servicios de red, Docker, virtualización ligera y despliegue sobre servidores Linux."
      },
      {
        "campus": "SEPE Servidor Web",
        "type": "sep",
        "text": "Servidor web Apache con mod_rewrite (.htaccess) para enrutar todas las peticiones a index.php."
      }
    ],
    "cheat": "docker compose up -d\ndocker logs -f app_container\ndocker exec -it mysql_db mysql -u root -p",
    "tutorial": {
      "type": "tool",
      "toolName": "Docker en macOS (Apple Silicon)",
      "steps": [
        {
          "num": 1,
          "title": "Instalar motor Docker ligero para Mac (OrbStack o Docker Desktop)",
          "cmd": "brew install --cask orbstack\n# O alternativamente:\nbrew install --cask docker",
          "explanation": "OrbStack es ultra ligero y rápido en procesadores Apple Silicon, consumiendo hasta un 80% menos de memoria y batería que Docker Desktop tradicional."
        },
        {
          "num": 2,
          "title": "Verificar la instalación de Docker y arquitectura nativa",
          "cmd": "docker --version\ndocker run --rm hello-world",
          "explanation": "Comprueba la comunicación entre el cliente Docker de macOS y el demonio de contenedores."
        },
        {
          "num": 3,
          "title": "Levantar un servidor web Apache de pruebas en 1 línea",
          "cmd": "docker run -d --name mi-apache -p 8080:80 httpd:alpine\ncurl -I http://localhost:8080",
          "explanation": "Descarga y levanta Apache en segundo plano mapeando el puerto 80 del contenedor al puerto 8080 del Mac."
        },
        {
          "num": 4,
          "title": "Crear un archivo docker-compose.yml multiservicio",
          "cmd": "cat << 'EOF' > docker-compose.yml\nservices:\n  app-web:\n    image: httpd:alpine\n    ports:\n      - \"8080:80\"\n  db-postgres:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: campus_db\n      POSTGRES_USER: admin\n      POSTGRES_PASSWORD: secretpassword\n    ports:\n      - \"5432:5432\"\nEOF\ndocker compose up -d",
          "explanation": "Define y levanta múltiples contenedores interconectados con una única instrucción."
        },
        {
          "num": 5,
          "title": "Comandos esenciales de inspección y limpieza",
          "cmd": "docker ps                  # Ver contenedores activos\ndocker logs -f app-web       # Ver logs en vivo\ndocker stop $(docker ps -q)  # Detener todos\ndocker system prune -f       # Liberar espacio en disco",
          "explanation": "Mantenimiento del motor para evitar acumulación innecesaria de imágenes o capas huérfanas."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un arquitecto cloud y divulgador tecnológico. Genera el guion completo para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"Docker y Contenedores Explicados para Desarrolladores: De Localhost a Producción\".\n\nCONTEXTO DEL ESTUDIANTE:\n- Soy Blanca, estudiante de DAW (Despliegue de Aplicaciones Web) y desarrolladora Java/Spring Boot.\n- Quiero un vídeo que me aclare conceptualmente la diferencia entre hipervisores (máquinas virtuales como UTM/VirtualBox) y contenedores Docker, y me enseñe a orquestar una aplicación con Docker Compose en macOS.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 1:00): La analogía del barco de carga y los contenedores estándar frente a transportar casas enteras (máquinas virtuales).\n2. ANATOMÍA DE DOCKER (1:00 - 2:15): Qué es una Imagen (receta inmutable) vs un Contenedor (instancia viva en ejecución), y cómo funciona el mapeo de puertos (-p 8080:80).\n3. DOCKER COMPOSE EN ACCIÓN (2:15 - 3:45): Cómo un archivo YAML sustituye comandos interminables para levantar servidor web + base de datos al instante.\n4. OPTIMIZACIÓN EN MAC APPLE SILICON (3:45 - 4:30): Mención especial al soporte ARM64, OrbStack frente a Docker Desktop y cómo compilar imágenes multi-arquitectura.\n5. CHECKLIST FINAL (4:30 - 5:00): Los 4 comandos indispensables que todo estudiante debe memorizar.\n\nTONO: Dinámico, muy visual, pedagógico y libre de tecnicismos innecesarios.",
    "readTime": "6 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "vm",
      "http",
      "spring-initializr"
    ],
    "blogPost": {
      "headline": "De la casa unifamiliar al apartamento de hotel: la muerte del \"en mi máquina funciona\"",
      "intro": "La pesadilla clásica del desarrollador es entregar un proyecto que compila perfecto en tu portátil y falla miserablemente al desplegarlo en el servidor del cliente o en el evaluador del campus. \"En mi máquina sí funcionaba\". Docker existe específicamente para desterrar esa frase del vocabulario técnico.",
      "analogy": {
        "concept": "Contenedor Docker vs Máquina Virtual Tradicional",
        "metaphor": "Una máquina virtual es una casa unifamiliar con su propio generador eléctrico, su propio depósito de agua y sus propios cimientos (un kernel de SO completo que pesa gigabytes y tarda minutos en arrancar). Un contenedor Docker es una habitación de hotel dentro de un rascacielos: comparte la fontanería, las vigas y el suministro del edificio (el kernel Linux del anfitrión), pero tiene su propia cerradura y aislamiento. Pesa megabytes y arranca en 300 milisegundos.",
        "takeaway": "El contenedor empaqueta el binario y sus dependencias exactas, no un sistema operativo completo."
      },
      "theProblem": "Tener que instalar Apache, PHP 8.2, MySQL 8.0 y Java 17 directamente sobre el sistema operativo del anfitrión ensucia variables de entorno y genera colisiones de versiones irresolubles cuando otra asignatura pide PHP 7.4 o Java 11.",
      "crossCurricularInsight": "En Despliegue (DESP) usas contenedores para publicar servicios web aislados; en Spring Boot (Accenture) empaquetas el microservicio .jar en una imagen mínima Eclipse Temurin para correr en Kubernetes."
    },
    "cavemanScript": {
      "title": "Purgador de Contenedores Zombi y Redes Huérfanas",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. MIRAR DOCKER. MATAR CONTENEDORES PARADOS. BORRAR REDES HUERFANAS. NO PREGUNTAR. IMPRIMIR ESPACIO LIBERADO.",
      "code": "import subprocess\nimport sys\n\ncommands = [\n    [\"docker\", \"container\", \"prune\", \"-f\"],\n    [\"docker\", \"network\", \"prune\", \"-f\"],\n    [\"docker\", \"image\", \"prune\", \"-f\"]\n]\n\nresults = {}\nfor cmd in commands:\n    try:\n        out = subprocess.check_output(cmd, stderr=subprocess.STDOUT).decode(\"utf-8\")\n        results[\" \".join(cmd)] = out.strip().splitlines()[-1] if out.strip() else \"OK\"\n    except Exception as e:\n        print(f\"DOCKER_NO_DISPONIBLE: {e}\")\n        sys.exit(2)\n\nprint('{\"status\": \"PURGE_OK\", \"details\": ' + str(results).replace(\"'\", '\"') + '}')",
      "explanation": "Limpia capas intermedias y contenedores detenidos que consumen espacio en disco sin confirmaciones interactivas."
    }
  },
  {
    "id": "http",
    "category": "http",
    "tags": [
      "HTTP",
      "APIs REST",
      "Redes",
      "Seguridad"
    ],
    "topicTag": "Protocolos & APIs",
    "emoji": "🌐",
    "title": "HTTP & Servicios Web RESTful",
    "summary": "Peticiones cliente-servidor, códigos de estado (2xx, 4xx, 5xx), cabeceras y payloads JSON.",
    "videoUrl": "/fuentes/ioc/desp/Despliegue_seguro_de_Apache_en_Ubuntu.webm",
    "videoTitle": "Despliegue Seguro de Servidor Web Apache en Ubuntu Server",
    "commonPoints": [
      {
        "title": "El Lenguaje Común de la Web",
        "desc": "HTTP es el protocolo sin estado sobre el que funciona toda la arquitectura web. Tanto si programas un backend en Spring Boot (@RestController), un API en PHP o configuras directivas en Apache/Nginx, todos se comunican con los mismos verbos y cabeceras."
      },
      {
        "title": "Diseño RESTful Semántico",
        "desc": "Una API bien diseñada asocia las operaciones CRUD con los verbos HTTP correspondientes (GET para lectura, POST para creación, PUT/PATCH para actualización, DELETE para borrado) y responde con códigos de estado semánticos adecuados."
      },
      {
        "title": "Seguridad y Cabeceras",
        "desc": "Las cabeceras HTTP controlan el tipo de contenido (Content-Type: application/json), la autenticación (Authorization: Bearer token) y la seguridad entre orígenes (CORS), puntos evaluados tanto en DESP como en Accenture."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "@RestController, inyección de DTOs, validaciones con Bean Validation y laboratorio REST con Postman."
      },
      {
        "campus": "IOC DAW (0614 DESP)",
        "type": "ioc",
        "text": "Configuración de servidores Apache/Nginx, análisis de cabeceras HTTP, MIME types y certificados SSL/TLS."
      },
      {
        "campus": "SEPE Servidor Web",
        "type": "sep",
        "text": "Endpoints REST nativos en PHP con json_encode(), lectura de php://input y cabecera Content-Type."
      }
    ],
    "cheat": "GET /api/v1/recursos   -> 200 OK\nPOST /api/v1/recursos  -> 201 Created\nPUT /api/v1/recursos/1 -> 200 / 204 No Content\nDELETE ...             -> 204 No Content",
    "tutorial": {
      "type": "concept",
      "toolName": "Fundamentos HTTP & Diseño de Endpoints",
      "steps": [
        {
          "num": 1,
          "title": "Comprender el ciclo de Petición (Request) y Respuesta (Response)",
          "cmd": "# Petición típica de un cliente:\nGET /api/v1/tareas HTTP/1.1\nHost: api.midominio.com\nAccept: application/json",
          "explanation": "Una petición incluye verbo, ruta, cabeceras y payload opcional; el servidor procesa y devuelve código de estado, cabeceras y cuerpo."
        },
        {
          "num": 2,
          "title": "Regla de oro de los Verbos HTTP",
          "cmd": "# GET    -> Consultar datos (idempotente y seguro, sin modificar el servidor)\n# POST   -> Crear un nuevo recurso\n# PUT    -> Reemplazar un recurso por completo\n# PATCH  -> Modificar parcialmente un recurso\n# DELETE -> Eliminar un recurso",
          "explanation": "Respetar la semántica de los verbos garantiza que clientes, proxies y navegadores gestionen cachés y reintentos correctamente."
        },
        {
          "num": 3,
          "title": "Códigos de Estado esenciales que debes dominar",
          "cmd": "# 200 OK           -> Operación correcta con contenido devuelto\n# 201 Created      -> Recurso creado exitosamente (tras un POST)\n# 204 No Content   -> Operación correcta sin contenido devuelto (ej. DELETE)\n# 400 Bad Request  -> Parámetros inválidos o error de validación del cliente\n# 401 Unauthorized -> Falta token o credenciales\n# 403 Forbidden    -> Autenticado pero sin permisos para este recurso\n# 404 Not Found    -> El recurso solicitado no existe\n# 500 Server Error -> Excepción no controlada en el servidor",
          "explanation": "Nunca devuelvas un 200 OK con un mensaje de error en el cuerpo JSON; utiliza siempre los códigos de estado HTTP."
        },
        {
          "num": 4,
          "title": "Prueba de endpoints con curl desde el terminal",
          "cmd": "curl -X GET \"http://localhost:8080/api/tareas\" -H \"Accept: application/json\"\ncurl -X POST \"http://localhost:8080/api/tareas\" -H \"Content-Type: application/json\" -d '{\"titulo\":\"Estudiar ENT\",\"completada\":false}'",
          "explanation": "curl permite verificar respuestas HTTP sin intermediarios gráficos directamente desde la terminal del Mac."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un lead architect y formador de desarrolladores backend. Vas a preparar un guion para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"HTTP y APIs RESTful: La Guía Semántica para Diseñar Servicios Web Robustos\".\n\nCONTEXTO DEL ESTUDIANTE:\n- Soy Blanca, estudiante de DAW y programadora de APIs REST en Java Spring Boot y PHP.\n- Quiero un vídeo que enseñe la filosofía HTTP de forma visual: por qué no inventar códigos propios, cómo usar los verbos adecuadamente y cómo depurar peticiones cliente-servidor.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 0:50): La metáfora del restaurante (cliente hace el pedido, camarero es HTTP, cocina es el servidor).\n2. LOS 5 VERBOS Y LA IDEMPOTENCIA (0:50 - 2:15): Qué significa que GET sea idempotente y por qué POST nunca debe usarse para consultar datos.\n3. EL MAPA DE CÓDIGOS DE ESTADO (2:15 - 3:45): 2xx (Éxito), 3xx (Redirección), 4xx (Culpa del cliente), 5xx (Culpa del servidor). Los 6 códigos indispensables explicados con ejemplos cómicos cotidianos.\n4. CABECERAS Y PAYLOADS JSON (3:45 - 4:30): Content-Type, Authorization y cómo estructurar un DTO en Spring Boot o PHP.\n5. RESUMEN Y CHECKLIST (4:30 - 5:00): 4 preguntas que debes hacerte antes de desplegar un endpoint a producción.\n\nTONO: Claro, riguroso, entretenido y con un enfoque muy práctico.",
    "readTime": "8 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "spring-initializr",
      "docker",
      "data"
    ],
    "blogPost": {
      "headline": "El contrato invisible de la web: verbos, cabeceras y por qué un 200 con error es un pecado de diseño",
      "intro": "Toda la infraestructura de internet, desde una consulta a Google hasta el microservicio bancario más complejo, se sostiene sobre un protocolo de texto plano nacido a principios de los 90: HTTP. Sin embargo, sorprende cuántas APIs se construyen violando sus principios más elementales, como devolver HTTP 200 OK cuando la base de datos acaba de fallar.",
      "analogy": {
        "concept": "La anatomía de una petición HTTP y la semántica REST",
        "metaphor": "Imagina el servicio postal internacional. El método (GET, POST, PUT, DELETE) es el sello de instrucciones en el exterior del sobre (\"solo leer\", \"crear paquete nuevo\", \"sustituir contenido\", \"destruir\"). Las cabeceras (Headers) son el albarán de aduanas que especifica el idioma y formato (\"Content-Type: application/json\") y el carné de identidad (\"Authorization: Bearer\"). El cuerpo (Body) es el contenido real. Los códigos de estado son la respuesta del cartero: 200 (entregado), 404 (buzón inexistente), 500 (el camión del cartero ardió en la carretera).",
        "takeaway": "Los códigos de estado HTTP no son sugerencias; son la señalización de tráfico de los navegadores y clientes API."
      },
      "theProblem": "Ignorar la semántica de HTTP rompe los mecanismos de caché de los navegadores, confunde a los proxies inversos como Nginx y obliga a los desarrolladores de frontend a parsear el cuerpo JSON de cada respuesta para saber si la petición tuvo éxito o fracasó.",
      "crossCurricularInsight": "En Despliegue configuras Virtual Hosts y reglas de cabeceras en Apache; en Spring Boot diseñas controladores con @GetMapping y devuelves ResponseEntity con códigos HTTP precisos; en PHP capturas $_SERVER y devuelves http_response_code()."
    },
    "cavemanScript": {
      "title": "Sonda HTTP de Latencia Cruda (Zero-Dependency)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. ENVIAR GET A URL PASADA POR ARGUMENTO. MEDIR TIEMPO EN MILISEGUNDOS. SACAR STATUS Y TIEMPO. SIN LIBS RARAS.",
      "code": "import sys\nimport time\nimport urllib.request\n\nurl = sys.argv[1] if len(sys.argv) > 1 else \"http://localhost:8080\"\nt0 = time.perf_counter()\n\ntry:\n    req = urllib.request.Request(url, headers={\"User-Agent\": \"CavemanProbe/1.0\"})\n    with urllib.request.urlopen(req, timeout=2.0) as resp:\n        elapsed = (time.perf_counter() - t0) * 1000\n        print(f'{{\"url\": \"{url}\", \"status\": {resp.status}, \"latency_ms\": {round(elapsed, 2)}}}')\nexcept Exception as err:\n    elapsed = (time.perf_counter() - t0) * 1000\n    print(f'{{\"url\": \"{url}\", \"error\": \"{str(err)}\", \"latency_ms\": {round(elapsed, 2)}}}')\n    sys.exit(1)",
      "explanation": "Mide la latencia de red y el código HTTP de cualquier microservicio o servidor local en una sola llamada sin requests."
    }
  },
  {
    "id": "data",
    "category": "data",
    "tags": [
      "SQL",
      "Bases de Datos",
      "Persistencia",
      "PostgreSQL"
    ],
    "topicTag": "Bases de Datos & ORM",
    "emoji": "🗄️",
    "title": "SQL, Transacciones & Persistencia",
    "summary": "Diseño relacional, prevención de inyecciones SQL, transacciones ACID y mapeo objeto-relacional.",
    "videoUrl": "/fuentes/springboot/Por_qué_un_POJO_no_es_una_Entidad.mp4",
    "videoTitle": "POJO vs Entidad JPA: Por Qué un POJO no es una Entidad",
    "commonPoints": [
      {
        "title": "Separación entre Memoria y Almacenamiento",
        "desc": "Los objetos Java o PHP viven en la memoria volátil; las bases de datos garantizan la persistencia en disco. Comprender el desfase objeto-relacional (Object-Relational Impedance Mismatch) es la clave para usar tanto SQL nativo como ORMs (JPA/Hibernate)."
      },
      {
        "title": "Seguridad contra Inyección SQL",
        "desc": "Concatenar cadenas directamente en consultas SQL es la vulnerabilidad más crítica en la web. El uso de Prepared Statements (consultas preparadas con parámetros ?) es obligatorio en PHP PDO y gestionado automáticamente por Spring Data JPA."
      },
      {
        "title": "Transacciones ACID",
        "desc": "Garantizar que un grupo de operaciones se ejecute por completo o se revierta en su totalidad (Atomicidad, Consistencia, Aislamiento y Durabilidad) es indispensable en operaciones financieras y de inventario."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Spring Data JPA con Hibernate (@Entity, @ManyToOne, repositorios automáticos, H2 en memoria)."
      },
      {
        "campus": "IOC DAW (0487 ENT / DESP)",
        "type": "ioc",
        "text": "Modelado de datos en diagramas de clases UML y conexión con el gestor de base de datos en servidor."
      },
      {
        "campus": "SEPE Servidor Web",
        "type": "sep",
        "text": "PDO nativo en PHP con Prepared Statements ($stmt->execute()), transacciones ACID y consultas preparadas."
      }
    ],
    "cheat": "SELECT u.id, u.nombre, COUNT(p.id) AS total_pedidos,\n       COALESCE(SUM(p.importe), 0) AS gasto_total\nFROM usuarios u\nLEFT JOIN pedidos p ON u.id = p.usuario_id\nGROUP BY u.id, u.nombre\nHAVING total_pedidos > 0;",
    "tutorial": {
      "type": "concept",
      "toolName": "Buenas Prácticas de Persistencia & SQL",
      "steps": [
        {
          "num": 1,
          "title": "Consulta Relacional Segura con JOINs y Agregaciones",
          "cmd": "SELECT u.id, u.nombre, COUNT(p.id) AS total_pedidos, COALESCE(SUM(p.importe), 0) AS gasto_total\nFROM usuarios u\nLEFT JOIN pedidos p ON u.id = p.usuario_id\nWHERE u.activo = 1\nGROUP BY u.id, u.nombre\nHAVING total_pedidos > 0;",
          "explanation": "Combina tablas mediante relaciones foráneas (Foreign Keys) y calcula métricas sin duplicar datos en memoria."
        },
        {
          "num": 2,
          "title": "Consultas Preparadas contra Inyecciones (Prepared Statements)",
          "cmd": "# En PHP con PDO:\n$stmt = $pdo->prepare(\"SELECT * FROM usuarios WHERE email = ?\");\n$stmt->execute([$email]);\n\n# En Spring Data JPA:\n@Query(\"SELECT u FROM Usuario u WHERE u.email = :email\")\nOptional<Usuario> findByEmail(@Param(\"email\") String email);",
          "explanation": "Los parámetros viajan separados de la sintaxis SQL, neutralizando cualquier intento de inyección maliciosa."
        },
        {
          "num": 3,
          "title": "Control de Transacciones ACID",
          "cmd": "# En terminal MySQL / PostgreSQL:\nSTART TRANSACTION;\nUPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;\nCOMMIT; -- O bien ROLLBACK; en caso de error",
          "explanation": "Asegura que el dinero nunca desaparezca si ocurre un fallo eléctrico entre las dos operaciones."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un administrador de bases de datos (DBA) senior y formador técnico. Vas a redactar un guion para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"Persistencia y SQL Profesional: Transacciones ACID, Consultas Preparadas y ORMs\".\n\nCONTEXTO DEL ESTUDIANTE:\n- Soy Blanca, estudiante de DAW y desarrolladora con Spring Data JPA y PHP PDO.\n- Quiero un vídeo que explique con claridad qué ocurre internamente en el motor de base de datos, por qué las inyecciones SQL siguen siendo un peligro y cómo funcionan las transacciones ACID.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 1:00): La diferencia entre memoria RAM volátil y disco persistente. Por qué los objetos no encajan de forma natural en tablas relacionales.\n2. LA REGLA DE ORO: CONSULTAS PREPARADAS (1:00 - 2:30): Muestra qué ocurre cuando se concatena texto (' OR '1'='1) y cómo los Prepared Statements separan el código de los datos.\n3. EL MILAGRO DE LAS TRANSACCIONES ACID (2:30 - 3:45): El ejemplo clásico de la transferencia bancaria (restar a una cuenta, sumar a otra) y qué pasa con COMMIT y ROLLBACK si se corta la luz.\n4. JPA VS SQL NATIVO (3:45 - 4:30): Cuándo dejar que el ORM haga el trabajo sucio y cuándo escribir una consulta SQL optimizada a mano.\n5. CHECKLIST Y CONCLUSIONES (4:30 - 5:00): Consejos para diseñar modelos de datos limpios.\n\nTONO: Riguroso, ameno, lleno de ejemplos prácticos y con ritmo dinámico.",
    "readTime": "7 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "spring-initializr",
      "arch",
      "http"
    ],
    "blogPost": {
      "headline": "La memoria RAM es efímera, el disco es para siempre: ACID, inyecciones SQL y el espejismo de los ORMs",
      "intro": "Puedes tener la arquitectura en capas más sofisticada del mundo, pero si tu capa de persistencia pierde datos durante un corte de suministro eléctrico o permite que un atacante inyecte sentencias maliciosas en un formulario de búsqueda, tu aplicación está rota. Las bases de datos relacionales son el verdadero núcleo de verdad del software.",
      "analogy": {
        "concept": "Transacciones ACID y Prepared Statements",
        "metaphor": "Una transferencia bancaria no son dos acciones independientes; es un pacto notarial indivisible. Si restas 100€ de la cuenta A y se corta la luz antes de sumarlos a la cuenta B, la \"A\" de ACID (Atomicidad) revierte la operación entera (ROLLBACK). O el dinero llega completo o vuelve al origen; jamás se evapora en el limbo. Y las consultas preparadas son como una ventanilla blindada: los datos viajan por la ranura sin mezclarse jamás con la voz del operador.",
        "takeaway": "Jamás concatenes strings en una consulta SQL. La separación estricta entre código y datos es la única defensa invulnerable."
      },
      "theProblem": "Los ORMs modernos como Hibernate o Doctrine hacen que guardar un objeto parezca tan trivial como repository.save(usuario), ocultando las consultas N+1 y los bloqueos de tablas que destruyen el rendimiento cuando el sistema pasa de diez a diez mil usuarios concurrentes.",
      "crossCurricularInsight": "En PHP (SEPE) utilizas PDO con sentencias preparadas; en Spring Boot (Accenture) usas Spring Data JPA con interfaces Repository; en Entornos (IOC) diseñas el modelo relacional y sus claves foráneas."
    },
    "cavemanScript": {
      "title": "Verificador de Integridad SQLite/DB en 5 Líneas",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. ABRIR BASE DE DATOS SQLITE. CORRER \"PRAGMA integrity_check\". SI OK -> SALIR CON 0. SI CORRUPTO -> EXPLOTAR.",
      "code": "import sqlite3\nimport sys\n\ndb_path = sys.argv[1] if len(sys.argv) > 1 else \":memory:\"\n\ntry:\n    conn = sqlite3.connect(db_path)\n    cur = conn.cursor()\n    cur.execute(\"PRAGMA integrity_check;\")\n    res = cur.fetchone()[0]\n    conn.close()\n    if res == \"ok\":\n        print('{\"db\": \"' + db_path + '\", \"integrity\": \"OK\"}')\n        sys.exit(0)\n    else:\n        print(f\"CORRUPCION: {res}\")\n        sys.exit(1)\nexcept Exception as e:\n    print(f\"FALLO_CONEXION_DB: {e}\")\n    sys.exit(2)",
      "explanation": "Comprueba al instante la integridad estructural de un fichero de base de datos relacional sin herramientas gráficas."
    }
  },
  {
    "id": "spring-initializr",
    "category": "arch",
    "tags": [
      "Spring Boot",
      "Accenture",
      "Java",
      "Framework",
      "Backend"
    ],
    "topicTag": "Spring Boot Initializr & Fundamentos",
    "emoji": "🌱",
    "title": "Spring Boot Initializr: Primeros Pasos para un Proyecto Java con Spring",
    "summary": "Landing maestra y guía paso a paso para inicializar proyectos en start.spring.io, diferencias entre Java puro y framework, servidor embebido y FAQ técnica.",
    "externalLink": "/springboot/primeros-pasos",
    "externalLinkLabel": "Abrir Portal Interactivo del Framework 🚀",
    "commonPoints": [
      {
        "title": "Qué Aporta el Framework frente a Java Puro (Vanilla Java)",
        "desc": "Java puro requiere implementar manualmente Sockets TCP, Servlets, parseo de cadenas JSON con Jackson, manejo manual de conexiones JDBC y creación de instancias con new. Spring Boot provee Inversión de Control (IoC), Inyección de Dependencias (@Autowired), serialización automática y servidores embebidos."
      },
      {
        "title": "Spring Framework Clásico vs Spring Boot (2002 vs 2014)",
        "desc": "El Spring tradicional requería cientos de líneas de XML (beans.xml, web.xml) y desplegar un archivo WAR en un Tomcat externo. Spring Boot aplica Convención sobre Configuración, dependencias Starters y empaqueta Tomcat dentro de un único archivo JAR autoejecutable."
      },
      {
        "title": "El Generador start.spring.io y Dependencias Starters",
        "desc": "Configuración estándar para Accenture: Project Maven, Java 17/21, Spring Boot 3.x, Group com.accenture, Artifact taskmanager. Dependencias esenciales: Spring Web (MVC y Tomcat), DevTools (recarga en caliente) y Lombok (eliminación de boilerplate)."
      },
      {
        "title": "Arquitectura en 3 Capas y Desacoplamiento Limpio",
        "desc": "Flujo unidireccional: Controller (recibe HTTP y valida) → Service (lógica de negocio y transacciones @Transactional) → Repository (acceso a base de datos con Spring Data JPA)."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Bootcamp (Spring Boot)",
        "type": "acc",
        "text": "Punto de partida de las 12 actividades prácticas y base del proyecto central taskmanager."
      },
      {
        "campus": "IOC DAW (0487 ENT & 0614 DESP)",
        "type": "ioc",
        "text": "Instalación de Java 17/21 SDK en Eclipse/Ubuntu y despliegue del microservicio con Tomcat embebido en puerto 8080."
      },
      {
        "campus": "SEPE Backend (PHP)",
        "type": "sepe",
        "text": "Contraste arquitectónico: Apache + PHP clásico frente a microservicios Java con contenedor IoC y servidor integrado."
      }
    ],
    "cheat": "# 1. Generar proyecto instantáneo con curl desde terminal\ncurl https://start.spring.io/starter.zip \\\n  -d type=maven-project \\\n  -d language=java \\\n  -d bootVersion=3.3.0 \\\n  -d groupId=com.accenture \\\n  -d artifactId=taskmanager \\\n  -d dependencies=web,devtools,lombok \\\n  -o taskmanager.zip\n\n# 2. Descomprimir e ingresar\nunzip taskmanager.zip && cd taskmanager\n\n# 3. Arrancar en desarrollo con recarga en caliente\n./mvnw spring-boot:run",
    "tutorial": {
      "videoUrl": "",
      "videoTitle": "Configuración de Spring Initializr y Primer Proyecto Spring Boot",
      "steps": [
        {
          "num": 1,
          "title": "Configurar start.spring.io",
          "cmd": "# Maven Project | Java 17/21 | Spring Boot 3.x\\n# Group: com.accenture\\n# Artifact: taskmanager\\n# Packaging: Jar",
          "explanation": "Genera la estructura estándar Maven con el envoltorio mvnw para compilaciones portables."
        },
        {
          "num": 2,
          "title": "Añadir Starters Esenciales",
          "cmd": "<!-- pom.xml -->\\n<dependency>\\n  <groupId>org.springframework.boot</groupId>\\n  <artifactId>spring-boot-starter-web</artifactId>\\n</dependency>\\n<dependency>\\n  <groupId>org.projectlombok</groupId>\\n  <artifactId>lombok</artifactId>\\n</dependency>",
          "explanation": "Spring Web levanta Tomcat y Gson/Jackson para APIs REST. Lombok evita escribir getters y setters."
        },
        {
          "num": 3,
          "title": "Primer Endpoint @RestController",
          "cmd": "@RestController\\npublic class HolaController {\\n  @GetMapping(\"/api/hola\")\\n  public String saludar() {\\n    return \"¡Hola Mundo desde Spring Boot!\";\\n  }\\n}",
          "explanation": "Expone una ruta HTTP GET directamente accesible en http://localhost:8080/api/hola."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un arquitecto senior de Spring Boot y mentor técnico. Vas a redactar un guion didáctico titulado: \"Spring Boot Initializr: De Cero a Tu Primera API REST en Java\". Explica qué diferencia hay entre Spring y Spring Boot, qué aporta el framework a Java puro y por qué usamos Tomcat embebido.",
    "readTime": "8 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "arch",
      "http",
      "data",
      "copilot-spring-accenture"
    ],
    "blogPost": {
      "headline": "start.spring.io desmitificado: por qué Java ya no es el lenguaje pesado y verboso de hace una década",
      "intro": "Quienes aprendieron Java hace diez años recuerdan configuraciones interminables de servidores WebLogic o Tomcat, carpetas WEB-INF repletas de XMLs y una ceremonia de arranque agotadora. Spring Boot cambió radicalmente las reglas del juego al adoptar el principio de \"Convención sobre Configuración\" y empaquetar un servidor HTTP dentro de la propia aplicación.",
      "analogy": {
        "concept": "Inversión de Control (IoC) y Tomcat embebido",
        "metaphor": "Cavar los cimientos de una casa con cuchara sopera vs contratar una excavadora industrial automatizada. En Java puro, para levantar una API REST necesitas escribir código de sockets TCP en el puerto 8080, parsear cabeceras y gestionar hilos a mano. Spring Boot te entrega la excavadora con el motor encendido: escribes @RestController y la máquina se encarga de toda la fontanería de red en milisegundos.",
        "takeaway": "Tu aplicación ES el servidor. Ya no despliegas código sobre un servidor; empaquetas el servidor dentro de tu JAR."
      },
      "theProblem": "Empezar un proyecto creando carpetas a mano sin usar Spring Initializr suele provocar desajustes de versiones en el pom.xml entre Spring Boot, Jackson, Hibernate y Lombok, provocando errores de compilación crípticos al arrancar.",
      "crossCurricularInsight": "El proyecto \"taskmanager\" que se inicializa en esta guía es la base troncal de las 12 actividades del bootcamp de Accenture y conecta con los conceptos de despliegue en contenedores de DESP."
    },
    "cavemanScript": {
      "title": "Generador de Proyectos Spring Boot en 1 Línea (API start.spring.io)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. PEDIR ZIP A START.SPRING.IO CON WEB, DEVTOOLS Y LOMBOK. GUARDAR EN DISCO. SI PESA CERO -> ERROR.",
      "code": "import urllib.request\nimport urllib.parse\nimport sys\nimport os\n\nparams = urllib.parse.urlencode({\n    \"type\": \"maven-project\",\n    \"language\": \"java\",\n    \"bootVersion\": \"3.3.0\",\n    \"groupId\": \"com.accenture\",\n    \"artifactId\": \"taskmanager\",\n    \"dependencies\": \"web,devtools,lombok\"\n})\n\nurl = f\"https://start.spring.io/starter.zip?{params}\"\nout_file = \"taskmanager-quick.zip\"\n\ntry:\n    urllib.request.urlretrieve(url, out_file)\n    size = os.path.getsize(out_file)\n    if size < 5000:\n        print(f\"ERROR: Archivo descargado demasiado pequeño ({size} bytes)\")\n        sys.exit(1)\n    print(f'{{\"status\": \"SPRING_PROJECT_GENERATED\", \"file\": \"{out_file}\", \"bytes\": {size}}}')\nexcept Exception as err:\n    print(f\"ERROR_INITIALIZR: {err}\")\n    sys.exit(2)",
      "explanation": "Consume directamente la API pública de Spring Initializr para generar y descargar un esqueleto de proyecto completo en un segundo."
    }
  },
  {
    "id": "arch",
    "category": "arch",
    "tags": [
      "Arquitectura",
      "Patrones",
      "Spring Boot",
      "POO"
    ],
    "topicTag": "Diseño de Software",
    "emoji": "📐",
    "title": "Arquitectura en Capas & Patrones SOLID",
    "summary": "Separación de responsabilidades, bajo acoplamiento, alta cohesión y código mantenible a largo plazo.",
    "audioUrl": "/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3",
    "audioTitle": "Reglas de Arquitectura en Spring Boot e Inteligencia Artificial",
    "videoUrl": "/fuentes/ia/IA_en_Arquitectura.mp4",
    "videoTitle": "Inteligencia Artificial en Diseño de Arquitectura de Software",
    "mediaList": [
      {
        "type": "audio",
        "url": "/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3",
        "title": "Reglas de Arquitectura en Spring Boot e Inteligencia Artificial",
        "duration": "Podcast Técnico"
      },
      {
        "type": "video",
        "url": "/fuentes/ia/IA_en_Arquitectura.mp4",
        "title": "Inteligencia Artificial en Diseño de Arquitectura de Software"
      }
    ],
    "commonPoints": [
      {
        "title": "El Principio de Separación de Responsabilidades",
        "desc": "Un controlador no debe consultar la base de datos ni calcular impuestos; una entidad de modelo no debe formatear respuestas JSON. Dividir el código en capas (Controlador -> Servicio -> Repositorio) es el estándar transversal en Java, PHP y cualquier lenguaje orientado a objetos."
      },
      {
        "title": "Inversión de Control e Inyección de Dependencias",
        "desc": "Depender de interfaces y contratos en lugar de instanciar clases concretas (new ServicioImpl()) permite cambiar de proveedor de base de datos o realizar pruebas unitarias con mocks sin tocar una sola línea de lógica de negocio."
      },
      {
        "title": "Mantenibilidad frente a Prisa",
        "desc": "Escribir código en una sola función gigante funciona para un script de 20 líneas, pero colapsa en aplicaciones reales. Los principios SOLID convierten el código en piezas intercambiables tipo Lego."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Inyección de dependencias (IoC), patrón Controller-Service-Repository y Frikadas de Arquitectura de Isra."
      },
      {
        "campus": "IOC DAW (0487 ENT)",
        "type": "ioc",
        "text": "Diagramas UML de clases, pruebas unitarias con JUnit/frameworks de testing y refactorización guiada."
      },
      {
        "campus": "SEPE Servidor Web",
        "type": "sep",
        "text": "Arquitectura clásica en 3 capas (Models, Controllers, Views) con enrutador central y helpers desacoplados."
      }
    ],
    "cheat": "S: Single Responsibility (1 sola razón para cambiar)\nO: Open/Closed (abierto a extensión, cerrado a cambio)\nL: Liskov Substitution (subclase sustituye a padre)\nI: Interface Segregation (interfaces pequeñas y claras)\nD: Dependency Inversion (depende de abstracciones, DI)",
    "tutorial": {
      "type": "concept",
      "toolName": "Patrones Arquitectónicos y Principios SOLID",
      "steps": [
        {
          "num": 1,
          "title": "Comprender la Arquitectura en 3 Capas",
          "cmd": "# 1. Capa Controlador (Controller) -> Recibe la petición HTTP, valida DTOs y llama al servicio.\n# 2. Capa Servicio (Service)       -> Contiene las reglas de negocio, cálculos y transacciones.\n# 3. Capa Repositorio (Repository)  -> Habla con la base de datos o almacenamiento persistente.",
          "explanation": "Cada capa tiene una sola razón para cambiar, facilitando el mantenimiento y las pruebas automatizadas."
        },
        {
          "num": 2,
          "title": "Los 5 Principios SOLID Explicados en 1 Línea",
          "cmd": "# S - Single Responsibility: Una clase debe hacer una sola cosa.\n# O - Open/Closed: Abierta a extensión, cerrada a modificación.\n# L - Liskov Substitution: Las subclases deben poder sustituir a sus clases base sin romper nada.\n# I - Interface Segregation: Mejor muchas interfaces específicas que una interfaz gigante.\n# D - Dependency Inversion: Depende de abstracciones (interfaces), no de implementaciones concretas.",
          "explanation": "La base de cualquier software profesional orientado a objetos."
        },
        {
          "num": 3,
          "title": "Ejemplo de Inversión de Dependencias (IoC / DI)",
          "cmd": "// MAL (alto acoplamiento):\npublic class PedidoService {\n    private EmailSender sender = new SmtpEmailSender(); // Acoplado a SMTP\n}\n\n// BIEN (bajo acoplamiento con DI):\n@Service\npublic class PedidoService {\n    private final Notificador notificador; // Interfaz abstracta\n\n    public PedidoService(Notificador notificador) {\n        this.notificador = notificador; // Spring inyecta la implementación adecuada\n    }\n}",
          "explanation": "Permite reemplazar SmtpEmailSender por MockEmailSender en pruebas unitarias con 0 cambios en PedidoService."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un arquitecto de software y mentor de Clean Code. Genera un guion para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"Arquitectura en Capas y Principios SOLID: Cómo Escribir Código del que Estar Orgulloso\".\n\nCONTEXTO DEL ESTUDIANTE:\n- Soy Blanca, estudiante de desarrollo de software trabajando con Java Spring Boot y arquitecturas web.\n- Quiero un vídeo que desmitifique los principios SOLID y la arquitectura Controller-Service-Repository con analogías visuales impactantes y código claro.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 1:00): El código espagueti y el dolor de tocar una línea que rompe tres módulos sin relación aparente.\n2. LAS 3 CAPAS LIMPIAS (1:00 - 2:15): Por qué el Controller es el camarero, el Service es el chef y el Repository es la despensa. Ninguno debe meterse en el trabajo del otro.\n3. SOLID EN 2 MINUTOS (2:15 - 3:45): Una analogía de la vida cotidiana para cada una de las 5 letras de SOLID (enchufes universales, piezas modulares de coche, etc.).\n4. INVERSIÓN DE CONTROL (3:45 - 4:30): El misterio de @Autowired y la inyección por constructor explicado sin tecnicismos innecesarios.\n5. RESUMEN FINAL (4:30 - 5:00): Cómo aplicar esto hoy mismo en tus ejercicios de clase para conseguir la máxima calificación.\n\nTONO: Inspirador, entretenido, didáctico y muy elegante.",
    "readTime": "7 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "externalLink": "/java/springboot#arquitectura-capas",
    "externalLinkLabel": "🎬 Vídeo & Teoría: Arquitectura por Capas",
    "externalLinkIcon": "🎬",
    "practiceLink": "/accenture/actividades",
    "practiceLinkLabel": "📦 12 Actividades Prácticas Accenture",
    "relatedTopicIds": [
      "spring-initializr",
      "data",
      "git"
    ],
    "blogPost": {
      "headline": "El código espagueti nace cuando el camarero se mete a freír el pescado",
      "intro": "En proyectos pequeños de clase, meter toda la lógica dentro del mismo archivo parece rápido y cómodo. El problema llega en cuanto el negocio pide una validación extra o necesitas cambiar de base de datos: tocas tres líneas y de pronto se rompen cinco módulos que no tenían relación aparente. La arquitectura en capas existe para proteger tu salud mental como desarrollador.",
      "analogy": {
        "concept": "Arquitectura en 3 Capas (Controller, Service, Repository) y Principios SOLID",
        "metaphor": "Un restaurante de alta cocina con una jerarquía estricta. El Controller es el camarero: atiende a los comensales (peticiones HTTP), valida que no pidan platos inexistentes y lleva la comanda a la cocina; jamás se mete a cocinar. El Service es el chef: ejecuta las recetas, calcula costes y coordina los platos (reglas de negocio); jamás sale a servir copas ni a cobrar la mesa. El Repository es la despensa: guarda los ingredientes en cámaras frigoríficas (la base de datos) y se los entrega al chef cuando este los solicita.",
        "takeaway": "Cada capa tiene una única responsabilidad y una sola razón para cambiar (Single Responsibility Principle)."
      },
      "theProblem": "Mezclar consultas SQL dentro de un controlador HTTP o meter lógica de presentación en un repositorio acopla el código de tal manera que resulta imposible escribir pruebas unitarias automatizadas con Mocks.",
      "crossCurricularInsight": "En la Unidad 2 de Entornos (IOC) estudias la cohesión y el acoplamiento; en Accenture (Spring Boot) aplicas @RestController, @Service y @Repository con inyección por constructor; en SEPE separas controladores PHP de modelos de datos.",
      "accentureBridge": {
        "title": "Aterrizaje en Vídeos Teóricos y Actividades de Accenture",
        "description": "Esta misma arquitectura en 3 capas y los principios SOLID son el núcleo troncal del Módulo 2 de los vídeos de Accenture/UPM, y el marco conceptual con el que se desarrollan y resuelven los 13 retos prácticos del curso (taskmanager).",
        "videoUrl": "/java/springboot#arquitectura-capas",
        "videoTitle": "🎬 Vídeo Teórico: 1. Arquitectura por Capas en Spring Boot",
        "solidVideoUrl": "/java/springboot#principios-solid",
        "solidVideoTitle": "⚡ Vídeo: 2. Principios SOLID & Código Limpio",
        "activitiesUrl": "/accenture/actividades",
        "activitiesTitle": "📦 Landing de Retos Prácticos (13 Actividades L2E)"
      }
    },

    "cavemanScript": {
      "title": "Auditor de Capas Java (Contador de Responsabilidades)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. BUSCAR EN DIRECTORIO ARCHIVOS *Controller.java, *Service.java, *Repository.java. SACAR CONTEO. SI HAY 0 SERVICIOS -> AVISAR.",
      "code": "import os\nimport sys\n\nroot = sys.argv[1] if len(sys.argv) > 1 else \".\"\ncounts = {\"controllers\": 0, \"services\": 0, \"repositories\": 0, \"total_java\": 0}\n\nfor dirpath, _, filenames in os.walk(root):\n    for f in filenames:\n        if f.endswith(\".java\"):\n            counts[\"total_java\"] += 1\n            if f.endswith(\"Controller.java\"): counts[\"controllers\"] += 1\n            elif f.endswith(\"Service.java\"): counts[\"services\"] += 1\n            elif f.endswith(\"Repository.java\"): counts[\"repositories\"] += 1\n\nprint('{\"audit\": ' + str(counts).replace(\"'\", '\"') + '}')\nif counts[\"total_java\"] > 5 and counts[\"services\"] == 0:\n    print(\"AVISO_CAVEMAN: Hay codigo Java pero 0 capas de servicio. Riesgo de logica en controladores.\")",
      "explanation": "Escanea el árbol de ficheros Java para validar métricas de arquitectura limpia y presencia equilibrada de las 3 capas."
    }
  },
  {
    "id": "ai",
    "category": "ai",
    "tags": [
      "IA",
      "GenAI",
      "Prompting",
      "Ética"
    ],
    "topicTag": "GenAI & Machine Learning",
    "emoji": "🤖",
    "title": "Inteligencia Artificial Aplicada & GenAI",
    "summary": "Modelos generativos, prompting estructurado, asistentes de código y digitalización ética en el desarrollo.",
    "audioUrl": "/fuentes/ia/Programar_con_IA_sin_perder_el_control.m4a",
    "audioTitle": "Podcast: Programar con IA sin perder el control",
    "videoUrl": "/fuentes/ia/IA_en_Arquitectura.mp4",
    "videoTitle": "Vídeo: Impacto de la Inteligencia Artificial en Arquitecturas de Software",
    "mediaList": [
      {
        "type": "audio",
        "url": "/fuentes/ia/Programar_con_IA_sin_perder_el_control.m4a",
        "title": "Podcast: Programar con IA sin perder el control",
        "duration": "Audio lección"
      },
      {
        "type": "video",
        "url": "/fuentes/ia/IA_en_Arquitectura.mp4",
        "title": "Vídeo: Impacto de la Inteligencia Artificial en Arquitecturas de Software"
      }
    ],
    "commonPoints": [
      {
        "title": "El Rol de la IA como Copiloto, No como Reemplazo",
        "desc": "Tanto en la normativa de IOC (donde se prohíbe el uso ciego de IA en ciertas actividades fundamentales) como en Accenture (donde se incentiva el modo Ask y el autocompletado responsable), el programador es el responsable civil y técnico del código entregado."
      },
      {
        "title": "Prompting Estructurado y Determinista",
        "desc": "Pedir código con frases vagas (\"hazme un programa\") genera soluciones frágiles y alucinadas. Un buen prompt técnico define rol, contexto, reglas de estilo, casos límite y formato de salida esperado."
      },
      {
        "title": "Auditoría Crítica de Código Generado",
        "desc": "Un desarrollador profesional no acepta una sugerencia de IA simplemente porque compila; revisa la complejidad temporal O(n), la seguridad contra inyecciones y los casos borde (nulos, vacíos, desbordamientos)."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Spring AI con modelos LLM, prompts estructurados y asistentes de código GenAI."
      },
      {
        "campus": "IOC DAW (M1665 DIG)",
        "type": "ioc",
        "text": "Tecnologías habilitadoras digitales, impacto de la IA en la industria productiva y digitalización ética."
      },
      {
        "campus": "SEPE Machine Learning",
        "type": "sep",
        "text": "Módulo de IA y modelos predictivos (clasificación, regresión, pipelines de entrenamiento en Python)."
      }
    ],
    "cheat": "PROMPT TÉCNICO EFECTIVO:\n[ROL] Experto Java 17 + Spring Boot 3\n[CONTEXTO] Arquitectura Controller-Service-Repository\n[TAREA] Generar método con @Transactional\n[REGLAS] Manejo explícito de excepciones y test unitario",
    "tutorial": {
      "type": "concept",
      "toolName": "Buenas Prácticas de GenAI en Desarrollo de Software",
      "steps": [
        {
          "num": 1,
          "title": "Estructura de un Prompt Técnico Profesional",
          "cmd": "# Estructura recomendada:\n[ROL]: Eres un ingeniero senior de Java 17 y Spring Boot 3.\n[CONTEXTO]: Proyecto de gestión de tareas con persistencia en PostgreSQL.\n[TAREA]: Implementa un método en TaskService para transferir una tarea de usuario.\n[RESTRICCIONES]:\n- Usa transacciones con @Transactional.\n- Valida que ambos usuarios existan antes de modificar.\n- Lanza excepciones de dominio TaskNotFoundException si no existe.\n[FORMATO]: Devuelve únicamente el método en código Java con Javadoc completo.",
          "explanation": "La precisión en las restricciones elimina el 95% de las alucinaciones de los modelos de lenguaje."
        },
        {
          "num": 2,
          "title": "Regla de Oro: Pruebas Unitarias para Código Asistido",
          "cmd": "// Antes de aceptar código generado por IA, escribe una prueba con JUnit:\n@Test\nvoid transferirTarea_cuandoUsuarioNoExiste_debeLanzarExcepcion() {\n    assertThrows(UserNotFoundException.class, () -> taskService.transferir(1L, 999L));\n}",
          "explanation": "Las pruebas unitarias actúan como red de seguridad innegociable."
        },
        {
          "num": 3,
          "title": "Uso en NotebookLM para Estudio y Vídeos Explicativos",
          "cmd": "# NotebookLM permite subir apuntes PDF y generar resúmenes en audio/vídeo.\n# Pega siempre un prompt enfocado en analogías y puntos evaluables para maximizar la retención.",
          "explanation": "Aprovecha la IA generativa como tutor personalizado de estudio interactivo."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un consultor senior en Inteligencia Artificial y profesor de ingeniería de software. Genera un guion para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"Inteligencia Artificial para Desarrolladores: De la Alucinación al Código de Calidad\".\n\nCONTEXTO DEL ESTUDIANTE:\n- Soy Blanca, estudiante de desarrollo de software aprendiendo a incorporar herramientas de GenAI con criterio profesional.\n- Quiero un vídeo que enseñe a trabajar con asistentes de IA de forma ética, rigurosa y sin caer en la trampa de delegar el pensamiento crítico.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 0:50): La IA no es magia, es un predictor estadístico de tokens altamente sofisticado.\n2. LA FÓRMULA DEL PROMPT DETERMINISTA (0:50 - 2:15): Rol + Contexto + Tarea + Restricciones + Formato. Muestra la diferencia abismal entre un prompt flojo y uno profesional.\n3. DETECCIÓN DE ALUCINACIONES (2:15 - 3:30): Cómo auditar código generado: verificación de casos límite, librerías obsoletas y agujeros de seguridad.\n4. LA POLÍTICA DE USO EN FORMACIÓN Y EMPRESA (3:30 - 4:30): Cuándo usar modo Ask (para aprender) vs autocompletado guiado, y por qué el programador siempre firma el código.\n5. RESUMEN Y CONSEJO DE ORO (4:30 - 5:00): \"Usa la IA para acelerar lo que ya entiendes, nunca para esconder lo que no sabes\".\n\nTONO: Reflexivo, inspirador, con rigor técnico y enfoque muy práctico.",
    "readTime": "6 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "hermes-local",
      "lmstudio-ollama",
      "copilot-skills"
    ],
    "blogPost": {
      "headline": "Los LLMs no piensan: son predictores de tokens hiperavanzados y tu contexto es su único mundo",
      "intro": "Existe una tendencia peligrosa a atribuir intencionalidad o razonamiento consciente a los modelos de lenguaje. En el momento en que comprendes que un modelo como Claude, GPT-4 o Llama 3 es un gigantesco compresor probabilístico de texto, aprendes a formular prompts con la precisión de un cirujano.",
      "analogy": {
        "concept": "Ventana de Contexto (Context Window) y Atención de Tokens",
        "metaphor": "La pizarra magnética de un detective en mitad de una investigación. El modelo no tiene memoria a largo plazo entre ejecuciones; nace y muere en cada llamada a la API. Toda su memoria es lo que cabe en su pizarra magnética actual (su ventana de tokens). Si llenas la pizarra con texto irrelevante o instrucciones difusas, el detective se queda sin espacio para ver las pistas cruciales.",
        "takeaway": "La calidad del output de una IA es directamente proporcional a la densidad y estructura de información útil en su contexto."
      },
      "theProblem": "Confiar a ciegas en las respuestas de una IA para código sin verificar las fuentes o sin estructurar un System Prompt estricto genera código con alucinaciones de métodos inexistentes o vulnerabilidades de seguridad.",
      "crossCurricularInsight": "En Digitalización (DIGI) analizas el impacto ético y corporativo de la IA; en Accenture usas Copilot con roles de ingeniería; en tus herramientas locales integras modelos con Ollama para privacidad total a coste 0€."
    },
    "cavemanScript": {
      "title": "Estimador Rápido de Tokens (Aproximación BPE)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. LEER TEXTO O ARCHIVO. CONTAR PALABRAS Y ESTIMAR TOKENS (REGLA 1 PALABRA = 1.3 TOKENS). IMPRIMIR NUMERO BRUTO.",
      "code": "import sys\nimport os\n\nraw_text = \"\"\nif len(sys.argv) > 1 and os.path.exists(sys.argv[1]):\n    with open(sys.argv[1], \"r\", encoding=\"utf-8\", errors=\"ignore\") as f:\n        raw_text = f.read()\nelse:\n    raw_text = sys.stdin.read() if not sys.stdin.isatty() else \"Hola mundo desde token counter caveman\"\n\nwords = len(raw_text.split())\nchars = len(raw_text)\nest_tokens = int(words * 1.33)\n\nprint(f'{{\"chars\": {chars}, \"words\": {words}, \"estimated_tokens\": {est_tokens}}}')",
      "explanation": "Calcula al vuelo el peso aproximado de tokens de cualquier prompt o fichero de notas para no desbordar la ventana de contexto del LLM."
    }
  },
  {
    "id": "hermes-local",
    "category": "ai",
    "tags": [
      "IA",
      "IA local",
      "Hermes",
      "Python",
      "Agentes"
    ],
    "topicTag": "Agente Autónomo & Telegram",
    "emoji": "🕊️",
    "title": "Hermes Bot: Arquitectura Soul, User y Harness de Ejecución",
    "summary": "Configuración avanzada del asistente personal local en Python: estructura de soul.md, user.md, catálogo de herramientas y el arnés de ejecución (Harness) para coordinar LLMs locales.",
    "commonPoints": [
      {
        "title": "El Alma del Agente (soul.md)",
        "desc": "El archivo soul.md fija la identidad profunda, tono (cálido, motivador, resolutivo sin condescendencia), valores morales y límites de autonomía del bot. Prohíbe estrictamente inventar fechas o validar código sin comprobación técnica."
      },
      {
        "title": "El Perfil de Usuario (user.md)",
        "desc": "user.md contextualiza las asignaturas activas de Blanca (IOC DAW, Accenture Java/Spring Boot, SEPE Machine Learning), su entorno hardware (MacBook Pro Apple Silicon ARM64) y sus preferencias de aprendizaje."
      },
      {
        "title": "El Sistema de Harness (Arnés de Ejecución)",
        "desc": "Un LLM pasivo solo predice tokens. El Harness es la infraestructura de software que lo envuelve: inyecta prompts, detecta invocaciones de herramientas (tool calls), ejecuta peticiones en local (leer JSONs, actualizar estado de entregas) y reinyecta la observación en un bucle ReAct acotado."
      },
      {
        "title": "Privacidad y Coste Cero con Modelos Locales",
        "desc": "Al conectarse con Ollama (puerto 11434) o LM Studio (puerto 1234), Hermes razona sobre los apuntes privados del campus y código sin enviar un solo byte a la nube y con coste 0€."
      }
    ],
    "crossCompare": [
      {
        "campus": "Hermes Telegram Bot",
        "type": "sep",
        "text": "Script hermes/hermes_bot.py en Python: escucha comandos /pendientes, /entregar y /tengo_dudas integrando la API de Telegram con el campus."
      },
      {
        "campus": "IOC DAW (Gestión)",
        "type": "ioc",
        "text": "Lectura directa de archivos JSON en /public/data/ioc/gestion/ para listar fechas límite de EACs de ENT, DESP, DIGI e IPO."
      },
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Sincronización con las 12 actividades del curso para alertar de entregas y actuar como tutor de código Java 17 y Spring Boot 3."
      }
    ],
    "cheat": "# 1. Arrancar Ollama con modelo de código en macOS\nollama run qwen2.5-coder:7b\n\n# 2. Iniciar el bot Hermes en Python\ncd hermes\nsource venv/bin/activate\npython hermes_bot.py\n\n# 3. Comandos Telegram disponibles:\n# /start        -> Saludo inicial y ayuda\n# /pendientes   -> Consulta entregas activas\n# /tengo_dudas  -> Menú interactivo por asignatura\n# /entregar ent eac1 -> Marca tarea completada",
    "tutorial": {
      "type": "tool",
      "toolName": "Configuración y Puesta en Marcha de Hermes",
      "steps": [
        {
          "num": 1,
          "title": "Definir el archivo de Alma (soul.md)",
          "cmd": "cat hermes/config/soul.md",
          "explanation": "Establece la personalidad del asistente, el trato respetuoso (\"princesa\" o \"Blanca\") y la directriz crítica de no alucinar fechas de entrega."
        },
        {
          "num": 2,
          "title": "Configurar el Perfil de Blanca (user.md)",
          "cmd": "cat hermes/config/user.md",
          "explanation": "Registra el mapa curricular (ENT, DESP, DIGI, IPO, Accenture, SEPE) y el hardware Mac ARM64 para que el asistente adapte sus comandos."
        },
        {
          "num": 3,
          "title": "Declarar el Catálogo de Herramientas (tools.md)",
          "cmd": "cat hermes/config/tools.md",
          "explanation": "Especifica esquemas JSON para get_pending_deliveries, mark_delivery_completed y query_local_llm."
        },
        {
          "num": 4,
          "title": "Estructurar el Bucle del Harness (Arnés)",
          "cmd": "# Ciclo ReAct: Context Assembly -> Model Inference -> Tool Dispatcher -> Observation -> Final Answer",
          "explanation": "El arnés añade un guardia de seguridad con límite de 5 iteraciones por mensaje para evitar bucles infinitos."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un arquitecto senior de IA y sistemas agénticos. Genera un guion para un VÍDEO EDUCATIVO de 6 minutos titulado: \"Cómo Construir un Agente de IA Local: De un Chatbot Simple a un Sistema Autónomo con Soul, User y Harness\".\n\nCONTEXTO:\n- Blanca ha desarrollado un bot de Telegram (Hermes) en Python conectado a su campus universitario y laboral.\n- Queremos explicar por qué un LLM necesita un \"Harness\" (arnés de ejecución) y archivos de configuración estructurados (soul.md, user.md) para no alucinar y operar con herramientas locales.\n\nESTRUCTURA DEL GUION:\n1. INTRODUCCIÓN (0:00 - 1:00): Por qué los chatbots conversacionales puros fallan en tareas reales. La diferencia entre predecir texto y actuar en el mundo real.\n2. EL ALMA DEL AGENTE: SOUL.MD Y USER.MD (1:00 - 2:30): Separación de responsabilidades: el \"alma\" (tono, principios, límites) y el \"perfil de usuario\" (contexto académico, Mac Apple Silicon).\n3. EL SISTEMA DE HARNESS (2:30 - 4:15): Explicación visual del arnés: el bucle ReAct (Pensamiento -> Acción -> Observación), la llamada a herramientas locales y el aislamiento de memoria.\n4. PRIVACIDAD Y DESARROLLO LOCAL A 0€ (4:15 - 5:15): Cómo correr modelos como Qwen 2.5 Coder o DeepSeek con Ollama/LM Studio sin enviar datos a la nube.\n5. CONCLUSIÓN Y LECCIÓN MAESTRA (5:15 - 6:00): \"Un agente de IA no es el modelo de lenguaje; es el arnés de ingeniería que lo rodea\".\n\nTONO: Dinámico, muy técnico pero didáctico, inspirador y riguroso.",
    "readTime": "7 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "lmstudio-ollama",
      "ai",
      "copilot-skills"
    ],
    "blogPost": {
      "headline": "Darle un alma a un agente: la separación entre el motor LLM y los ficheros soul.md, user.md y tools.md",
      "intro": "Un modelo de lenguaje descargado en tu ordenador es solo un motor apagado en un garaje. Para convertirlo en un agente personal útil que entienda tus preferencias de desarrollo, tus asignaturas y tus proyectos sin gastar un céntimo en APIs comerciales, necesitas una arquitectura de arnés (Harness).",
      "analogy": {
        "concept": "Arquitectura de Agente: Modelo Base vs Personalidad y Herramientas",
        "metaphor": "Un actor de método que sale al escenario sin un guion palabra por palabra, pero con una biografía exhaustiva grabada a fuego. El modelo LLM (Llama o Mistral) es la capacidad de interpretar y hablar del actor. El archivo soul.md es su carácter y sus límites morales. El archivo user.md es el dossier sobre a quién está ayudando. El archivo tools.md son las herramientas físicas que tiene permitidas en escena.",
        "takeaway": "No necesitas reentrenar un modelo para personalizarlo; basta con estructurar con rigor sus ficheros de contexto nucleares."
      },
      "theProblem": "Tener que explicarle a la IA quién eres, qué tecnologías usas y qué formato de código prefieres en cada conversación nueva es agotador e ineficiente.",
      "crossCurricularInsight": "Hermes Bot unifica en un solo asistente local las dudas de IOC (DAW), las actividades de Accenture y los ejercicios de SEPE con privacidad absoluta en tu Mac Apple Silicon."
    },
    "cavemanScript": {
      "title": "Validador de Integridad de Archivos de Configuración de Hermes",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. COMPROBAR EXISTENCIA DE SOUL.MD, USER.MD Y TOOLS.MD. SI FALTA UNO -> MATAR CON CODIGO 1.",
      "code": "import os\nimport sys\n\nrequired = [\"soul.md\", \"user.md\", \"tools.md\"]\nmissing = []\nsizes = {}\n\nfor f in required:\n    if not os.path.exists(f):\n        missing.append(f)\n    else:\n        sizes[f] = os.path.getsize(f)\n\nif missing:\n    print(f'{{\"status\": \"ERROR\", \"missing_files\": {missing}}}')\n    sys.exit(1)\n\nprint('{\"status\": \"HERMES_CONFIG_OK\", \"files\": ' + str(sizes).replace(\"'\", '\"') + '}')",
      "explanation": "Comprueba en un milisegundo que el harness del bot local tiene sus tres archivos maestros en regla antes de iniciar la sesión."
    }
  },
  {
    "id": "lmstudio-ollama",
    "category": "ai",
    "tags": [
      "IA",
      "IA local",
      "Ollama",
      "LM Studio",
      "DeepSeek",
      "Desarrollo"
    ],
    "topicTag": "Modelos Open-Weights & Inferencia Local",
    "emoji": "💻",
    "title": "IA Local Gratuita en Desarrollo: LM Studio, Ollama y Modelos Open-Weights",
    "summary": "Cómo articular un stack completo de Inteligencia Artificial para programadores 100% gratuito y privado: Ollama, LM Studio, DeepSeek-R1 y Qwen 2.5 Coder conectados a tu IDE.",
    "commonPoints": [
      {
        "title": "Ollama: El Motor Daemon Ligero",
        "desc": "Ollama se ejecuta como un servicio en segundo plano (puerto 11434). Es la herramienta preferida para scripts en terminal, automatizaciones de desarrollo y backend de bots como Hermes. Descarga y gestiona modelos en formato GGUF optimizados para la GPU Metal de Apple Silicon."
      },
      {
        "title": "LM Studio: La Interfaz de Laboratorio Visual",
        "desc": "LM Studio ofrece una interfaz gráfica completa para explorar el catálogo de Hugging Face, descargar diferentes niveles de cuantización (Q4_K_M, Q8), monitorear el consumo de RAM/VRAM y levantar un servidor local compatible con la API de OpenAI en el puerto 1234."
      },
      {
        "title": "Modelos Open-Weights Ideales para Desarrollo",
        "desc": "Qwen 2.5 Coder (7B y 14B) destaca en generación de código Java, Spring Boot y SQL. DeepSeek-R1 Distill Qwen ofrece razonamiento lógico paso a paso tipo cadena de pensamiento (<think>), ideal para depurar algoritmos complejos y diseñar diagramas de clases."
      },
      {
        "title": "Conexión Directa con el IDE (Continue.dev)",
        "desc": "Mediante la extensión de código abierto Continue.dev para VS Code o JetBrains, puedes utilizar autocompletado en línea y chat contextual alimentado directamente por tu servidor local de Ollama a 0€ de coste y con privacidad absoluta."
      }
    ],
    "crossCompare": [
      {
        "campus": "MacBook Pro Apple Silicon (ARM64)",
        "type": "sep",
        "text": "Aceleración nativa Metal: un chip M-series ejecuta modelos de 7B a 40-50 tokens/segundo utilizando memoria unificada sin necesidad de GPUs dedicadas."
      },
      {
        "campus": "IOC DAW (0487 ENT)",
        "type": "ioc",
        "text": "Generación de casos de prueba JUnit 5, refactorizaciones y consultas de apuntes de clase con cero riesgo de filtración de datos."
      },
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "Auditoría de código, generación de DTOs y validaciones para las 12 actividades del programa con modelos entrenados en patrones Java corporativos."
      }
    ],
    "cheat": "# 1. Instalar Ollama en macOS vía Homebrew\nbrew install ollama\n\n# 2. Descargar modelo de código líder\nollama pull qwen2.5-coder:7b\nollama pull deepseek-r1:8b\n\n# 3. Probar API OpenAI-compatible local en puerto 11434\ncurl http://localhost:11434/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"qwen2.5-coder:7b\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"Escribe un record Java para TaskDTO\"}]\n  }'",
    "tutorial": {
      "type": "tool",
      "toolName": "Stack de Desarrollo con IA Local (Ollama + Continue.dev)",
      "steps": [
        {
          "num": 1,
          "title": "Instalar Ollama y descargar Qwen 2.5 Coder",
          "cmd": "ollama run qwen2.5-coder:7b",
          "explanation": "Descarga automáticamente la versión cuantizada Q4_K_M (aprox. 4.7 GB), ideal para equipos Mac con 16GB o 32GB de RAM."
        },
        {
          "num": 2,
          "title": "Comprobar el endpoint de servidor local",
          "cmd": "curl http://localhost:11434/api/tags",
          "explanation": "Ollama expone un servidor HTTP local en el puerto 11434 que responde a peticiones JSON tanto nativas como en formato OpenAI v1."
        },
        {
          "num": 3,
          "title": "Configurar Continue.dev en VS Code",
          "cmd": "# En ~/.continue/config.json:\\n{\\n  \"models\": [{\\n    \"title\": \"Qwen 2.5 Coder 7B\",\\n    \"provider\": \"ollama\",\\n    \"model\": \"qwen2.5-coder:7b\"\\n  }]\\n}",
          "explanation": "Permite seleccionar código en tu editor y pulsar Cmd+I o Cmd+L para interactuar con tu modelo local sin salir del IDE."
        },
        {
          "num": 4,
          "title": "Descargar LM Studio para inspección visual y Hugging Face",
          "cmd": "brew install --cask lm-studio",
          "explanation": "Herramienta gráfica para probar diferentes prompts, cuantizaciones y visualizar el uso de memoria unificada de macOS."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un profesor universitario y consultor de infraestructura de software. Genera un guion para un VÍDEO EXPLICATIVO de 5 minutos titulado: \"Desarrollo de Software con IA Local y Gratuita: Domina Ollama, LM Studio y Modelos Open-Weights\".\n\nPUNTOS CLAVE A TRATAR:\n1. El fin del monopolio de la nube: cómo los modelos open-weights de 7B a 14B (Qwen 2.5 Coder, DeepSeek) igualan la calidad de modelos comerciales para tareas de código.\n2. Ollama vs LM Studio: cuándo usar el terminal y cuándo la interfaz gráfica.\n3. El poder de la memoria unificada en Mac Apple Silicon para correr inferencia local a alta velocidad.\n4. Integración práctica con el editor de código mediante Continue.dev.\n5. Privacidad corporativa: por qué las grandes empresas prefieren modelos locales para proteger su propiedad intelectual.\n\nTONO: Entusiasta, riguroso, práctico y orientado a empoderar al desarrollador independiente.",
    "readTime": "6 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "hermes-local",
      "ai",
      "vm"
    ],
    "blogPost": {
      "headline": "Tu Mac M5 es una supercomputadora de inferencia: LM Studio para jugar, Ollama para producir",
      "intro": "La memoria unificada de Apple Silicon (Unified Memory Architecture) resolvió el mayor cuello de botella del hardware moderno: la transferencia de pesos del modelo entre la CPU y la GPU. En un Mac M-Series, la GPU accede a la misma RAM de alta velocidad a cientos de gigabytes por segundo, permitiendo ejecutar modelos de 7B, 8B o 14B parámetros a coste cero y sin enviar datos a servidores externos.",
      "analogy": {
        "concept": "Interfaz Gráfica (LM Studio) vs Demonio de Terminal / Servidor API (Ollama)",
        "metaphor": "Un deportivo con cabina de lujo y pantalla táctil vs el motor del deportivo montado en un banco de pruebas de competición con cables directos a la centralita. LM Studio es la cabina de lujo: perfecto para probar modelos, ajustar la temperatura y explorar cómo responden. Ollama es el motor de fondo: un demonio ligero que corre en segundo plano y expone un endpoint HTTP en el puerto 11434 para que tus scripts de Python o tus IDEs consuman inferencia sin ventanas abiertas.",
        "takeaway": "Usa LM Studio para explorar modelos y entender su comportamiento; usa Ollama para integrarlos en tu flujo de trabajo diario."
      },
      "theProblem": "Depender de APIs en la nube implica pagar por token, sufrir límites de velocidad (rate limits) y exponer datos sensibles de proyectos corporativos a terceros.",
      "crossCurricularInsight": "Los modelos locales que ejecutas en Ollama se conectan directamente con los prompts de Digitalización (DIGI) y permiten asistencia técnica sin conexión a internet en tus prácticas de DAW."
    },
    "cavemanScript": {
      "title": "Escaner Rápido de Servidores LLM Locales (11434 Ollama vs 1234 LM Studio)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. MIRAR SI OLLAMA (11434) O LMSTUDIO (1234) ESTÁN ESCUCHANDO. DEVOLVER JSON DE ESTADO. SIN DEPENDENCIAS.",
      "code": "import socket\nimport sys\n\nservers = {\"ollama_11434\": (\"127.0.0.1\", 11434), \"lmstudio_1234\": (\"127.0.0.1\", 1234)}\nstatus = {}\n\nfor name, (host, port) in servers.items():\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(0.5)\n    try:\n        s.connect((host, port))\n        s.close()\n        status[name] = \"ONLINE\"\n    except Exception:\n        status[name] = \"OFFLINE\"\n\nprint('{\"inference_servers\": ' + str(status).replace(\"'\", '\"') + '}')",
      "explanation": "Detecta en 500ms qué motor de inferencia local está activo en tu Mac antes de lanzar una petición de autocompletado o chat."
    }
  },
  {
    "id": "copilot-spring-accenture",
    "category": "ai",
    "tags": [
      "IA",
      "Copilot",
      "Spring Boot",
      "Java",
      "Accenture",
      "POO"
    ],
    "topicTag": "GitHub Copilot & Accenture Java",
    "emoji": "🐙",
    "title": "GitHub Copilot en Spring Boot: Token Economy y 12 Prompts para Accenture",
    "summary": "Instrucciones maestras (.github/copilot-instructions.md) optimizadas para ahorrar tokens en Java 17/Spring Boot 3, junto con los 12 bloques de código y prompts listos para copiar de las actividades de Accenture.",
    "audioUrl": "/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3",
    "audioTitle": "Reglas de Arquitectura en Spring Boot e Inteligencia Artificial",
    "videoUrl": "/fuentes/springboot/Por_qué_un_POJO_no_es_una_Entidad.mp4",
    "videoTitle": "Buenas Prácticas Spring Boot: POJO vs Entidad JPA",
    "mediaList": [
      {
        "type": "audio",
        "url": "/fuentes/springboot/Reglas_arquitectura_SpringBoot_iA.mp3",
        "title": "Reglas de Arquitectura en Spring Boot e Inteligencia Artificial",
        "duration": "Podcast Técnico"
      },
      {
        "type": "video",
        "url": "/fuentes/springboot/Por_qué_un_POJO_no_es_una_Entidad.mp4",
        "title": "POJO vs Entidad JPA: Buenas Prácticas en Spring Boot"
      }
    ],
    "commonPoints": [
      {
        "title": "Token Economy en Copilot",
        "desc": "Un prompt verbose gasta tokens inútiles y dispersa la atención del LLM. Redactar directrices concisas y telegráficas reduce el consumo un 70% y obliga a Copilot a emitir código limpio sin relleno conversacional."
      },
      {
        "title": "Principios de POO y Arquitectura Limpia",
        "desc": "Inyección de dependencias exclusivamente por constructor (sin @Autowired en atributos de campo), inmutabilidad mediante final y Java Records para DTOs, interfaces de servicio limpias y separación estricta de responsabilidades."
      },
      {
        "title": "Estándar Corporativo de Accenture",
        "desc": "Cumplimiento riguroso de paquetes (com.accenture.model, com.accenture.services, com.accenture.controllers), documentación Javadoc completa en todas las clases y métodos, y respuestas HTTP semánticas con ResponseEntity."
      },
      {
        "title": "Recomendaciones Actividad por Actividad",
        "desc": "Cada una de las 12 actividades del curso dispone de un bloque de markdown copiable listo para inyectar en Copilot Chat o en el archivo .github/copilot-instructions.md."
      }
    ],
    "crossCompare": [
      {
        "campus": "Accenture Spring Boot",
        "type": "acc",
        "text": "12 Actividades evaluables desde IoC XML básico hasta microservicios seguros con JWT y tests unitarios con Mockito."
      },
      {
        "campus": "IOC DAW (0487 ENT)",
        "type": "ioc",
        "text": "Buenas prácticas de desarrollo orientado a objetos, diseño por contratos y pruebas unitarias con JUnit 5."
      },
      {
        "campus": "GitHub Copilot Agent Mode",
        "type": "sep",
        "text": "Inyección de .github/copilot-instructions.md en la raíz del repositorio para alinear automáticamente cualquier sugerencia al estándar del curso."
      }
    ],
    "cheat": "# .github/copilot-instructions.md (Extracto Maestro Token Economy)\n[ROL]: Desarrollador Senior Java 17 + Spring Boot 3.3.x.\n[ESTILO]: Código limpio, POO idiomática, SOLID. Sin introducciones ni conclusiones.\n[REGLAS ARQUITECTURA]:\n- Inyección por constructor estricta (sin @Autowired en atributos).\n- DTOs inmutables (Java Records o POJO con getters). Bean Validation (@Valid).\n- Repositorios Spring Data JPA extendiendo JpaRepository.\n- Manejo global de excepciones con @RestControllerAdvice.\n- Documentación Javadoc obligatoria en clase y métodos públicos.",
    "tutorial": {
      "type": "concept",
      "toolName": "Directrices de Token Economy para GitHub Copilot",
      "steps": [
        {
          "num": 1,
          "title": "Crear el archivo .github/copilot-instructions.md",
          "cmd": "mkdir -p .github && touch .github/copilot-instructions.md",
          "explanation": "GitHub Copilot lee automáticamente este archivo en cada interacción para condicionar su contexto base sin gastar tokens en cada prompt manual."
        },
        {
          "num": 2,
          "title": "Eliminar Saludo y Charla Conversacional",
          "cmd": "# Añade a las instrucciones:\n\"Responde únicamente con el bloque de código solicitado o diff. Omite cortesías, resúmenes y explicaciones obvias.\"",
          "explanation": "Ahorra entre 150 y 300 tokens de salida por cada respuesta, acelerando la generación al doble de velocidad."
        },
        {
          "num": 3,
          "title": "Exigir Java 17 + Spring Boot 3 Idiomático",
          "cmd": "# Regla innegociable:\n\"Usa Records para DTOs, switch expressions, var cuando el tipo sea evidente y Spring Security 6 sin WebSecurityConfigurerAdapter deprecado.\"",
          "explanation": "Evita que Copilot sugiera código obsoleto de tutoriales antiguos de Spring 4 o Java 8."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un lead architect de Java y especialista en herramientas de IA. Genera un guion para un VÍDEO EXPLICATIVO de 6 minutos titulado: \"Domina GitHub Copilot en Spring Boot: Ahorro de Tokens, Reglas de Arquitectura y las 12 Actividades de Accenture\".\n\nCONTENIDOS:\n1. TOKEN ECONOMY: Por qué los prompts largos empeoran el código. Cómo diseñar un .github/copilot-instructions.md hipercompacto.\n2. POO EN SPRING BOOT: Adiós a @Autowired en campos; por qué la inyección por constructor es la única arquitectura limpia admisible.\n3. LAS 12 ACTIVIDADES DE ACCENTURE: Recorrido rápido por los 4 bloques formativos (IoC básico, REST Controllers, JPA/DTOs y Seguridad JWT/Testing).\n4. EL TRUCO DEL JAVADOC: Cómo forzar a Copilot a escribir documentación que cumple al 100% las rúbricas docentes.\n\nTONO: Profesional, directo, ágil y de alto nivel técnico.",
    "accentureActivitiesPrompts": [
      {
        "numero": 1,
        "id": "act-01",
        "title": "Actividad 1. Uso de IoC",
        "slug": "1-uso-de-ioc",
        "category": "Spring Core",
        "module": "Bloque 1: IoC & DI",
        "recommendation": "Economiza tokens solicitando únicamente el bean sin inyección en applicationContext.xml y el POJO Grupo con Javadoc. Exige a Copilot que la recuperación se haga mediante ClassPathXmlApplicationContext y que los setters se invoquen en el Main.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 1 (Uso de IoC)\n```markdown\n[TAREA]: Generar solución completa para Actividad 1 de Accenture (Proyecto JavaSpringIoC).\n[STACK]: Java 17, Spring Context 6.2.6, Maven.\n[REQUISITOS]:\n1. Clase `com.accenture.model.Grupo` con atributos privados: id (int), nombre (String), creacion (int), origen (String), genero (String).\n   - Getters/setters, constructor por defecto y `toString()` con formato: \"<nombre> - <origen> <creacion> - <genero>\".\n   - Javadoc completo a nivel de clase y métodos.\n2. Fichero XML `src/main/resources/applicationContext.xml`:\n   - Definir bean id=\"grupoBean\" de clase `com.accenture.model.Grupo` SIN propiedades inyectadas.\n3. Clase `com.accenture.main.Main`:\n   - Cargar contexto con `ClassPathXmlApplicationContext(\"applicationContext.xml\")`.\n   - Recuperar bean, asignar valores con setters (Metallica, Estados Unidos, 1981, Heavy Metal).\n   - Imprimir por consola con `toString()` y cerrar contexto con `context.close()`.\n[FORMATO]: Devuelve únicamente los bloques de código Java y XML sin introducciones.\n```"
      },
      {
        "numero": 2,
        "id": "act-02",
        "title": "Actividad 2. Uso de IoD",
        "slug": "2-uso-de-iod",
        "category": "Spring Core",
        "module": "Bloque 1: IoC & DI",
        "recommendation": "Pide a Copilot que inyecte tanto propiedades externas desde datosGrupo.properties como la colección List<Componente> mediante la etiqueta XML <list><ref bean=\"...\"/></list>. Ahorra tokens omitiendo código ya visto en la Actividad 1.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 2 (Uso de IoD)\n```markdown\n[TAREA]: Generar solución para Actividad 2 de Accenture (Proyecto JavaSpringIoD).\n[STACK]: Java 17, Spring Context 6.2.6, Maven.\n[REQUISITOS]:\n1. Clase `com.accenture.model.Componente` (nombre, instrumento) con `toString()`: \"Componente: <nombre> a la <instrumento>\".\n2. Añadir a `com.accenture.model.Grupo` el atributo `private List<Componente> componentes` con su getter y setter.\n3. Fichero `src/main/resources/datosGrupo.properties` con claves: nombre=Metallica, creacion=1981, origen=Estados Unidos, genero=Heavy Metal.\n4. Fichero `src/main/resources/applicationContext.xml`:\n   - Activar `<context:property-placeholder location=\"classpath:datosGrupo.properties\"/>`.\n   - Definir 4 beans `Componente` (James Hetfield/Voz, Kirk Hammett/Guitarra, Cliff Burton/Bajo, Lars Ulrich/Bateria).\n   - Definir bean `Grupo` inyectando propiedades desde ${...} y la lista con `<list><ref bean=\"...\"/>...</list>`.\n5. `Main.java`: Cargar contexto, obtener grupo, imprimir datos y recorrer componentes con for-each.\n[FORMATO]: Código directo y Javadoc obligatorio.\n```"
      },
      {
        "numero": 3,
        "id": "act-03",
        "title": "Actividad 3. Java Annotations",
        "slug": "3-uso-java-annotations",
        "category": "Configuración",
        "module": "Bloque 1: IoC & DI",
        "recommendation": "Elimina todo rastro de XML. Instruye a Copilot para usar @Configuration, @PropertySource, @Value y métodos @Bean devolviendo los componentes y el grupo. En Main, utilizar AnnotationConfigApplicationContext.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 3 (Java Annotations)\n```markdown\n[TAREA]: Migrar configuración XML a JavaConfig para Actividad 3 (Proyecto JavaSpringConfigClaseJava).\n[STACK]: Java 17, Spring Context 6.2.6.\n[REQUISITOS]:\n1. Clase de configuración `com.accenture.config.GruposConfig` anotada con `@Configuration`:\n   - Cargar propiedades con `@PropertySource(\"classpath:datosGrupo.properties\")`.\n   - Inyectar campos con `@Value(\"${...}\")`.\n   - 4 métodos con `@Bean` para crear y retornar las instancias de `Componente`.\n   - 1 método con `@Bean` para crear `Grupo`, asignando valores inyectados y la lista de componentes.\n2. Clase `Main`:\n   - Arrancar contexto con `AnnotationConfigApplicationContext(GruposConfig.class)`.\n   - Obtener bean `Grupo.class`, imprimirlo por consola e iterar su lista de integrantes.\n   - Cerrar contexto.\n[FORMATO]: Solo código Java y Javadoc en cada método @Bean.\n```"
      },
      {
        "numero": 4,
        "id": "act-04",
        "title": "Actividad 4. Distintas configuraciones",
        "slug": "4-distintas-configuraciones",
        "category": "Configuración",
        "module": "Bloque 1: IoC & DI",
        "recommendation": "Asegura que Copilot mantenga el desacoplamiento mediante la interfaz GestionEventos y su implementación GestionEventosImpl. Pide las tres configuraciones (XML pura, Mixta con component-scan y JavaConfig 100%) organizadas claramente.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 4 (Distintas Configuraciones)\n```markdown\n[TAREA]: Demostrar las 3 formas de configuración en Spring (Proyecto JavaSpringEventosMusicales).\n[STACK]: Java 17, Spring Context 6.2.6.\n[COMPONENTES]:\n1. Modelo `com.accenture.model.Evento` (eventoId, nombre, descripcion, lugar, duracion, tipoEvento, asientosDisponibles) con `toString()`.\n2. Interfaz `com.accenture.services.GestionEventos` con método `List<Evento> getAllEvents()`.\n3. Implementación `com.accenture.services.GestionEventosImpl` con atributo `List<Evento> listaEventos`.\n[LAS 3 CONFIGURACIONES]:\n- Opción 1: `applicationContextXML.xml` (cableado 100% XML con beans de eventos inyectados en la lista de GestionEventosImpl).\n- Opción 2: `applicationContext.xml` mixto (`<context:component-scan base-package=\"com.accenture\"/>` + `@Service` y `@Autowired`).\n- Opción 3: `EventosConfig.java` (clase 100% Java con `@Configuration`, `@ComponentScan` y métodos `@Bean` para los 3 eventos).\n[FORMATO]: Código conciso, sin XML duplicado innecesario.\n```"
      },
      {
        "numero": 5,
        "id": "act-05",
        "title": "Actividad 5. Preparación del entorno",
        "slug": "5-preparacion-del-entorno",
        "category": "Arquitectura REST",
        "module": "Bloque 2: API REST & Arquitectura",
        "recommendation": "Economiza tokens solicitando el esqueleto Maven de Spring Boot 3.3.x para el proyecto taskmanager, la estructura de paquetes y la clase de arranque con @SpringBootApplication.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 5 (Preparación de Entorno)\n```markdown\n[TAREA]: Generar estructura de arranque de Spring Boot 3 para el proyecto `taskmanager` (Actividad 5).\n[STACK]: Java 17, Spring Boot 3.3.x, Maven.\n[DEPENDENCIAS POM.XML]:\n- spring-boot-starter-web\n- spring-boot-devtools (opcional/runtime)\n- lombok (opcional)\n[ESTRUCTURA DE PAQUETES]:\n- com.accenture.taskmanager.controllers\n- com.accenture.taskmanager.services\n- com.accenture.taskmanager.repositories\n- com.accenture.taskmanager.models\n[CLASE PRINCIPAL]:\n`TaskManagerApplication.java` con `@SpringBootApplication` y método `main` que invoca `SpringApplication.run`.\n`application.properties` configurado con `server.port=8080` y `spring.application.name=taskmanager`.\n[FORMATO]: pom.xml limpio y estructura de carpetas en árbol textual.\n```"
      },
      {
        "numero": 6,
        "id": "act-06",
        "title": "Actividad 6. Creación del Controller",
        "slug": "6-creacion-del-controller",
        "category": "Arquitectura REST",
        "module": "Bloque 2: API REST & Arquitectura",
        "recommendation": "Pide a Copilot endpoints REST canónicos usando ResponseEntity con códigos HTTP semánticos (200 OK, 201 Created, 204 No Content, 404 Not Found) y almacenamiento temporal en memoria (CopyOnWriteArrayList o Map).",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 6 (Creación del Controller)\n```markdown\n[TAREA]: Implementar controlador REST en memoria para Actividad 6 (`taskmanager`).\n[STACK]: Java 17, Spring Boot 3 Web.\n[REQUISITOS]:\n1. Modelo `Task` en `com.accenture.taskmanager.models`: id (Long), title (String), description (String), completed (boolean).\n2. Controlador `com.accenture.taskmanager.controllers.TaskController`:\n   - Anotar con `@RestController` y `@RequestMapping(\"/api/tasks\")`.\n   - Colección concurrente en memoria para almacenar tareas.\n   - GET /api/tasks -> 200 OK con lista de tareas.\n   - GET /api/tasks/{id} -> 200 OK si existe, 404 Not Found si no.\n   - POST /api/tasks -> 201 Created con URI en header Location o body.\n   - PUT /api/tasks/{id} -> 200 OK con tarea actualizada o 404 Not Found.\n   - DELETE /api/tasks/{id} -> 204 No Content o 404 Not Found.\n[RESTRICCIÓN]: Uso estricto de `ResponseEntity<T>`. Javadoc en cada endpoint.\n```"
      },
      {
        "numero": 7,
        "id": "act-07",
        "title": "Actividad 7. Inyección de dependencias",
        "slug": "7-inyeccion-de-dependencias",
        "category": "Arquitectura REST",
        "module": "Bloque 2: API REST & Arquitectura",
        "recommendation": "Exige la regla de oro de POO: inyección de dependencias por constructor estricta con modificadores final. Separa el contrato TaskService de su implementación TaskServiceImpl con @Service.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 7 (Inyección de Dependencias)\n```markdown\n[TAREA]: Refactorizar `taskmanager` introduciendo capa de servicio y DI por constructor (Actividad 7).\n[REQUISITOS]:\n1. Interfaz `com.accenture.taskmanager.services.TaskService`:\n   - List<Task> getAllTasks();\n   - Optional<Task> getTaskById(Long id);\n   - Task createTask(Task task);\n   - Optional<Task> updateTask(Long id, Task task);\n   - boolean deleteTask(Long id);\n2. Implementación `TaskServiceImpl` anotada con `@Service`.\n3. Refactorizar `TaskController`:\n   - Inyectar `TaskService` EXCLUSIVAMENTE por constructor (campo `private final TaskService taskService`).\n   - PROHIBIDO usar `@Autowired` en campos privados.\n   - Delegar toda la lógica de negocio al servicio.\n[FORMATO]: Código limpio y Javadoc explicativo de la inyección por constructor.\n```"
      },
      {
        "numero": 8,
        "id": "act-08",
        "title": "Actividad 8. Spring Data JPA",
        "slug": "8-spring-data-jpa",
        "category": "Persistencia & JPA",
        "module": "Bloque 3: Persistencia & Validación",
        "recommendation": "Instruye a Copilot para añadir spring-boot-starter-data-jpa y H2 database. Genera la entidad con anotaciones JPA (@Entity, @Table, @Id, @GeneratedValue) y el repositorio JpaRepository con queries derivados.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 8 (Spring Data JPA)\n```markdown\n[TAREA]: Persistir tareas con Spring Data JPA y H2 Database para Actividad 8 (`taskmanager`).\n[STACK]: Spring Boot 3, Spring Data JPA, H2 Database.\n[REQUISITOS]:\n1. Entidad `com.accenture.taskmanager.models.Task`:\n   - `@Entity`, `@Table(name = \"tasks\")`.\n   - `@Id`, `@GeneratedValue(strategy = GenerationType.IDENTITY)` en id.\n   - Columnas mapeadas con validación básica. Constructor por defecto.\n2. Repositorio `com.accenture.taskmanager.repositories.TaskRepository`:\n   - Interfaz que extiende `JpaRepository<Task, Long>`.\n   - Métodos derivados: `List<Task> findByCompleted(boolean completed)` y `List<Task> findByTitleContainingIgnoreCase(String title)`.\n3. Refactorizar `TaskServiceImpl` para inyectar `TaskRepository` por constructor y usar métodos del repositorio (`findAll`, `findById`, `save`, `deleteById`).\n4. Configuración en `application.properties` para H2 console activa en `/h2-console`.\n[FORMATO]: Código listo para compilar sin dependencias innecesarias.\n```"
      },
      {
        "numero": 9,
        "id": "act-09",
        "title": "Actividad 9. Validaciones y DTOs",
        "slug": "9-validaciones-y-dtos",
        "category": "Persistencia & JPA",
        "module": "Bloque 3: Persistencia & Validación",
        "recommendation": "Aplica el principio de segregación: nunca expongas la entidad JPA directamente en la API. Usa Java Records para TaskRequestDTO y TaskResponseDTO con anotaciones Bean Validation (@NotBlank, @Size) y @Valid en el Controller.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 9 (Validaciones y DTOs)\n```markdown\n[TAREA]: Implementar DTOs y validación de entrada con Bean Validation para Actividad 9.\n[DEPENDENCIAS]: `spring-boot-starter-validation`.\n[REQUISITOS]:\n1. `TaskRequestDTO` (usar Java Record o clase inmutable):\n   - title con `@NotBlank(message = \"El título no puede estar vacío\")` y `@Size(min = 3, max = 100)`.\n   - description con `@Size(max = 500)`.\n   - completed con valor por defecto false.\n2. `TaskResponseDTO` (Java Record): id, title, description, completed.\n3. Mapper estático o métodos de conversión limpios entre DTO y entidad JPA `Task`.\n4. En `TaskController`:\n   - Anotar `@RequestBody @Valid TaskRequestDTO dto` en endpoints POST y PUT.\n   - Devolver siempre `ResponseEntity<TaskResponseDTO>`.\n[FORMATO]: Código idiomático Java 17 sin boilerplate superfluo.\n```"
      },
      {
        "numero": 10,
        "id": "act-10",
        "title": "Actividad 10. Manejo de excepciones",
        "slug": "10-manejo-de-excepciones",
        "category": "Persistencia & JPA",
        "module": "Bloque 3: Persistencia & Validación",
        "recommendation": "Centraliza el control de errores con @RestControllerAdvice. Define la excepción de dominio ResourceNotFoundException y un DTO estructurado ErrorResponse (timestamp, status, error, message, path). Maneja MethodArgumentNotValidException para devolver listas de errores de validación.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 10 (Manejo de Excepciones)\n```markdown\n[TAREA]: Centralizar manejo de errores con @RestControllerAdvice para Actividad 10 (`taskmanager`).\n[REQUISITOS]:\n1. Excepción de dominio `ResourceNotFoundException extends RuntimeException`.\n2. DTO `ErrorResponse` (Record o clase con timestamp, status, error, message, path, fieldErrors).\n3. Clase `com.accenture.taskmanager.exceptions.GlobalExceptionHandler` anotada con `@RestControllerAdvice`:\n   - `@ExceptionHandler(ResourceNotFoundException.class)` -> 404 Not Found con mensaje descriptivo.\n   - `@ExceptionHandler(MethodArgumentNotValidException.class)` -> 400 Bad Request recopilando mapa de campos erróneos.\n   - `@ExceptionHandler(Exception.class)` -> 500 Internal Server Error controlado.\n4. Refactorizar `TaskServiceImpl` para lanzar `ResourceNotFoundException(\"Tarea no encontrada con id: \" + id)` cuando no exista.\n[FORMATO]: Código robusto y Javadoc en cada manejador.\n```"
      },
      {
        "numero": 11,
        "id": "act-11",
        "title": "Actividad 11. Seguridad con JWT",
        "slug": "11-seguridad-con-jwt",
        "category": "Seguridad & Testing",
        "module": "Bloque 4: Seguridad & Calidad",
        "recommendation": "Instruye a Copilot para utilizar Spring Security 6.x moderno con SecurityFilterChain (evitando WebSecurityConfigurerAdapter deprecado). Genera JwtUtils con HMAC-SHA256, OncePerRequestFilter y endpoints de login públicos.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 11 (Seguridad con JWT)\n```markdown\n[TAREA]: Proteger la API de `taskmanager` con Spring Security 6 y JWT (Actividad 11).\n[DEPENDENCIAS]: `spring-boot-starter-security`, `jjwt-api` 0.12.x.\n[REQUISITOS]:\n1. Componente `JwtUtils`:\n   - Generación de token JWT con expiración y firma secreta HMAC-SHA256.\n   - Extracción de username y validación del token.\n2. Filtro `JwtAuthenticationFilter extends OncePerRequestFilter`:\n   - Interceptar header \"Authorization: Bearer <token>\", validar y fijar `SecurityContextHolder`.\n3. Configuración `SecurityConfig` anotada con `@Configuration` y `@EnableWebSecurity`:\n   - Bean `SecurityFilterChain securityFilterChain(HttpSecurity http)`.\n   - CSRF deshabilitado, sesión STATELESS (`SessionCreationPolicy.STATELESS`).\n   - Rutas públicas: `/api/auth/**`, `/h2-console/**`.\n   - Rutas protegidas: `/api/tasks/**` requiere autenticación.\n   - Registrar `JwtAuthenticationFilter` antes de `UsernamePasswordAuthenticationFilter`.\n[RESTRICCIÓN]: Spring Security 6 idiomático sin clases obsoletas.\n```"
      },
      {
        "numero": 12,
        "id": "act-12",
        "title": "Actividad 12. Pruebas unitarias y mocking",
        "slug": "12-pruebas-unitarias-y-mocking",
        "category": "Seguridad & Testing",
        "module": "Bloque 4: Seguridad & Calidad",
        "recommendation": "Separa tests de capa de servicio (con Mockito puro y @ExtendWith(MockitoExtension.class)) de tests de integración del controlador (con @WebMvcTest y MockMvc). Pide tests deterministas con aserciones semánticas.",
        "markdownPrompt": "### 📋 Prompt Copilot para Actividad 12 (Pruebas Unitarias y Mocking)\n```markdown\n[TAREA]: Crear suite completa de pruebas unitarias y mocking para Actividad 12 (`taskmanager`).\n[STACK]: JUnit 5, Mockito, Spring Boot Test, MockMvc.\n[REQUISITOS]:\n1. `TaskServiceTest`:\n   - `@ExtendWith(MockitoExtension.class)`.\n   - `@Mock private TaskRepository taskRepository;`\n   - `@InjectMocks private TaskServiceImpl taskService;`\n   - Test: `getTaskById_debeRetornarTarea_cuandoExiste()`.\n   - Test: `getTaskById_debeLanzarResourceNotFoundException_cuandoNoExiste()`.\n   - Verificar interacciones con `verify(taskRepository, times(1)).findById(anyLong());`.\n2. `TaskControllerTest`:\n   - `@WebMvcTest(TaskController.class)` con seguridad deshabilitada para el test (`@AutoConfigureMockMvc(addFilters = false)`).\n   - `@MockBean private TaskService taskService;`\n   - `@Autowired private MockMvc mockMvc;`\n   - Test GET /api/tasks con `.andExpect(status().isOk())` y `.andExpect(jsonPath(\"$\", hasSize(1)))`.\n   - Test POST /api/tasks con body inválido esperando 400 Bad Request.\n[FORMATO]: Código limpio con comentarios AAA (Arrange-Act-Assert).\n```"
      }
    ],
    "readTime": "8 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "spring-initializr",
      "copilot-skills",
      "git"
    ],
    "blogPost": {
      "headline": "Economía de tokens en el bootcamp: cómo exprimir Copilot en las 12 actividades de Accenture sin quemar contexto",
      "intro": "Pedirle a GitHub Copilot \"hazme la actividad 4\" es la receta perfecta para obtener código genérico, dependencias obsoletas y anotaciones que no compilan con Java 17. Copilot no es un programador autónomo; es un copiloto que necesita que tú fijes la altitud, el rumbo y el plan de vuelo.",
      "analogy": {
        "concept": "Prompt Engineering orientado a tareas técnicas específicas",
        "metaphor": "Contratar a un arquitecto senior freelance que cobra por minuto. Si le dices \"hazme un plano de una casa\", te dibujará una vivienda estándar sin saber cuántas habitaciones necesitas. Si le entregas el enunciado exacto, le dices que actúe como auditor de código Spring Boot y le pides que refactorice una clase concreta para inyección por constructor, el resultado es impecable a la primera.",
        "takeaway": "Un prompt técnico debe incluir Rol, Restricciones técnicas, Código de entrada y Formato esperado de salida."
      },
      "theProblem": "Llenar el chat de Copilot con pegadas masivas de código sin estructurar hace que el modelo pierda el hilo y empiece a sugerir soluciones contradictorias que rompen el pom.xml.",
      "crossCurricularInsight": "Este dossier organiza los 12 prompts diseñados a medida para las 12 actividades prácticas de Accenture, conectando directamente con las ramas de Git del proyecto taskmanager."
    },
    "cavemanScript": {
      "title": "Extractor de Decisiones Técnicas de Archivos de Notas",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. LEER ARCHIVO DE NOTAS MARKDOWN. EXTRAER LINEAS QUE EMPIEZAN POR \"##\" O \"- \". SACAR RESUMEN PLANO.",
      "code": "import sys\nimport os\n\nfilepath = sys.argv[1] if len(sys.argv) > 1 else \"notas/NOTAS-ejercicio.md\"\n\nif not os.path.exists(filepath):\n    print(f'{{\"error\": \"Fichero no existe: {filepath}\"}}')\n    sys.exit(1)\n\nwith open(filepath, \"r\", encoding=\"utf-8\", errors=\"ignore\") as f:\n    lines = [line.strip() for line in f if line.strip().startswith((\"#\", \"-\", \"*\", \">\"))]\n\nprint(f'{{\"file\": \"{filepath}\", \"bullet_count\": {len(lines)}, \"bullets\": {lines[:10]}}}')",
      "explanation": "Extrae rápidamente los puntos clave y decisiones técnicas de cualquier cuaderno de notas para pegarlo en la memoria de entrega."
    }
  },
  {
    "id": "copilot-skills",
    "category": "ai",
    "tags": [
      "IA",
      "Copilot",
      "Skills",
      "Agentes",
      "Herramientas"
    ],
    "topicTag": "Skills & Copilot Extensions",
    "emoji": "🧩",
    "title": "Creación de Skills en GitHub Copilot: Manifiestos, Function Calling y Agentes",
    "summary": "Guía completa de arquitectura sobre cómo extender GitHub Copilot mediante Skills y Copilot Extensions: registro de GitHub Apps, servidores webhook, esquemas JSON de herramientas y streaming SSE.",
    "commonPoints": [
      {
        "title": "¿Qué es una Copilot Skill / Extension?",
        "desc": "A diferencia de las instrucciones estáticas en markdown (.github/copilot-instructions.md), una Skill es una integración activa respaldada por un servidor web que permite a Copilot ejecutar funciones personalizadas, consultar APIs privadas e interactuar con sistemas de terceros."
      },
      {
        "title": "El Manifiesto de la GitHub App",
        "desc": "Para crear una Skill se registra una GitHub App habilitando la funcionalidad Copilot Chat Agent. Se define el nombre del agente (ej. @micampus), el endpoint HTTPS del webhook y la descripción de capacidades que el usuario verá en el chat."
      },
      {
        "title": "Seguridad y Verificación de Firma",
        "desc": "GitHub envía cada turno del usuario mediante peticiones HTTP POST firmadas criptográficamente con la clave pública de GitHub (encabezado x-github-public-key-signature). El backend del agente debe verificar la firma antes de procesar el payload."
      },
      {
        "title": "Function Calling y Streaming SSE",
        "desc": "Copilot transmite las respuestas al cliente (VS Code o web) utilizando Server-Sent Events (SSE). Si el modelo necesita datos adicionales, emite un tool call estructurado en JSON Schema que tu servidor ejecuta antes de emitir la respuesta en markdown."
      }
    ],
    "crossCompare": [
      {
        "campus": "GitHub Copilot Chat",
        "type": "sep",
        "text": "Invocación directa escribiendo @mi-agente /comando en la barra de chat de VS Code, GitHub CLI o GitHub.com."
      },
      {
        "campus": "Model Context Protocol (MCP)",
        "type": "acc",
        "text": "Estándar abierto similar promovido por Anthropic; ambos resuelven la necesidad de conectar modelos con herramientas y bases de conocimiento vivas."
      },
      {
        "campus": "Hermes Telegram Bot",
        "type": "ioc",
        "text": "Misma lógica de harness y tools que usamos en hermes_bot.py, pero empaquetada como webhook de GitHub App."
      }
    ],
    "cheat": "# Esquema simplificado de un Copilot Extension Agent en Node.js/Express\nimport express from 'express';\nconst app = express();\n\napp.post('/api/copilot', async (req, res) => {\n  // 1. Configurar Server-Sent Events (SSE)\n  res.setHeader('Content-Type', 'text/event-stream');\n  res.setHeader('Cache-Control', 'no-cache');\n\n  // 2. Transmitir evento de respuesta a Copilot\n  res.write('event: copilot_message\\n');\n  res.write('data: {\"content\": \"¡Hola Blanca! Analizando tu campus...\\n\"}\\n\\n');\n\n  // 3. Finalizar streaming\n  res.write('event: done\\ndata: {}\\n\\n');\n  res.end();\n});",
    "tutorial": {
      "type": "tool",
      "toolName": "Flujo de Creación de una Copilot Extension",
      "steps": [
        {
          "num": 1,
          "title": "Registrar la GitHub App",
          "cmd": "# En GitHub.com -> Settings -> Developer Settings -> GitHub Apps -> New GitHub App",
          "explanation": "Asigna permisos de lectura/escritura y activa la casilla \"Copilot Chat Extension\"."
        },
        {
          "num": 2,
          "title": "Configurar la URL de Inferencia (Agent Endpoint)",
          "cmd": "# Ejemplo: https://api.micampus.local/copilot/v1/chat",
          "explanation": "La URL pública (o túnel local con ngrok/localtunnel) donde GitHub enviará las peticiones del chat."
        },
        {
          "num": 3,
          "title": "Declarar Tools y Function Calling",
          "cmd": "# Define esquemas JSON para funciones como \"consultar_eac\" o \"analizar_codigo_spring\"",
          "explanation": "Permite que Copilot delegue la ejecución de lógica pesada en tu propio backend antes de responder."
        },
        {
          "num": 4,
          "title": "Probar el Agente en VS Code",
          "cmd": "@micampus /status",
          "explanation": "Escribe en el chat de Copilot la mención @micampus para invocar tu skill personalizada directamente."
        }
      ]
    },
    "notebookLmPrompt": "Actúa como un Distinguished Engineer de GitHub y profesor universitario. Genera un guion para un VÍDEO EDUCATIVO de 5 minutos titulado: \"Creación de Skills y Extensiones en GitHub Copilot: De Prompts Estáticos a Agentes con Superpoderes\".\n\nPUNTOS A EXPLICAR:\n1. Las 3 capas de Copilot: Custom Instructions (.github/copilot-instructions.md), Slash Commands y Copilot Extensions (Skills completas).\n2. La arquitectura bajo el capó: GitHub App, webhooks firmados, SSE (Server-Sent Events) y function calling.\n3. El paralelismo con el Model Context Protocol (MCP) y agentes locales como Hermes.\n4. Caso de estudio: Cómo Blanca puede integrar Mi Campus directamente en GitHub Copilot para que @micampus le resuelva dudas de sus EACs en su editor.\n\nTONO: Inspirador, vanguardista, técnicamente impecable y muy motivador.",
    "readTime": "6 min de lectura",
    "author": "Blanca · Cuaderno de Ingeniería",
    "date": "Octubre 2026",
    "relatedTopicIds": [
      "copilot-spring-accenture",
      "hermes-local",
      "ai"
    ],
    "blogPost": {
      "headline": "Skills y Function Calling: cuando el asistente deja de ser un chat y empieza a manipular tu sistema de archivos",
      "intro": "La verdadera revolución de los asistentes de código no es que te respondan en lenguaje natural, sino que sean capaces de invocar herramientas reales en tu ordenador: leer un archivo, ejecutar un test, modificar líneas específicas de código o buscar referencias en el repositorio.",
      "analogy": {
        "concept": "Skills modulares en agentes de IA",
        "metaphor": "Una caja de herramientas modular donde cada llave inglesa tiene un manual de instrucciones pegado en el mango (el archivo SKILL.md). El asistente no carga todas las herramientas a la vez en su memoria RAM; solo abre el cajón cuando el usuario pide una tarea que coincide con la descripción de esa herramienta específica.",
        "takeaway": "Una Skill bien diseñada desacopla la capacidad del agente del modelo subyacente."
      },
      "theProblem": "Tener asistentes que solo pueden \"sugerir\" texto obliga al desarrollador a copiar, pegar y resolver conflictos a mano, rompiendo el flujo de concentración.",
      "crossCurricularInsight": "Comprender cómo funcionan las Skills y el protocolo MCP te prepara para la automatización avanzada tanto en entornos de desarrollo corporativos como en proyectos de innovación digital."
    },
    "cavemanScript": {
      "title": "Validador de Frontmatter de Skills (Regla SKILL.md)",
      "prompt": "PROMPT CAVEMAN: TÚ SCRIPT PYTHON BRUTO. BUSCAR CARPETAS CON SKILL.MD. COMPROBAR QUE EMPIEZAN POR \"---\". SI NO -> LISTAR CULPABLES.",
      "code": "import os\nimport sys\n\nskills_dir = sys.argv[1] if len(sys.argv) > 1 else \".\"\nvalid = []\ninvalid = []\n\nfor root, _, files in os.walk(skills_dir):\n    if \"SKILL.md\" in files:\n        p = os.path.join(root, \"SKILL.md\")\n        with open(p, \"r\", encoding=\"utf-8\", errors=\"ignore\") as f:\n            first_line = f.readline().strip()\n            if first_line.startswith(\"---\"):\n                valid.append(p)\n            else:\n                invalid.append(p)\n\nprint(f'{{\"valid_skills\": {len(valid)}, \"invalid_skills\": {len(invalid)}, \"invalid_paths\": {invalid}}}')\nif invalid: sys.exit(1)",
      "explanation": "Verifica que todas las carpetas de skills de tu entorno tengan su cabecera YAML reglamentaria para ser reconocidas por el runtime."
    }
  }
];
