import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * ============================================================================
 * @component   DespEac1Teleprompter
 * @description Centro de Operaciones, Teleprompter y Live Runner para la
 *              grabación del videotutorial de la EAC 1 de Despliegue (DESP).
 *              VERSIÓN CLARA (LIGHT MODE) DE ALTO CONTRASTE Y COLORES VIVOS.
 *              Distribución estricta por pestañas independientes por escena.
 * ============================================================================
 */

const SCENES_DATA = [
  {
    id: 'escena-1',
    tabLabel: 'Red & Apple Silicon',
    number: '1',
    title: 'Infraestructura de Red en Apple Silicon (Mac + Ubuntu ARM64)',
    score: '0.5 puntos',
    objective: 'Configurar la red virtualizada en modo puente (Bridged) para comunicación directa entre el Mac host y Ubuntu Server sin intermediación NAT.',
    rubricChecklist: [
      'Mostrar configuración del adaptador de red en modo puente (Bridged) en UTM/Parallels',
      'Mostrar IP de Ubuntu Server con "ip a"',
      'Mostrar IP del Mac host en Preferencias de Red o terminal',
      'Ejecutar ping bidireccional entre Mac y Ubuntu Server',
      'Mostrar actualización de paquetes del servidor ("sudo apt update && sudo apt upgrade")'
    ],
    bossEmail: {
      fromName: 'David Brent',
      fromRole: 'Director de Infraestructura e IT',
      fromEmail: 'david.brent@everofficesupplies.cat',
      date: 'Hoy, 08:30',
      priority: 'Prioridad: ALTA 🔴',
      subject: 'URGENTE: Blanca, aislamiento de red y puesta a punto del nuevo servidor central',
      body: `Hola Blanca,

Bienvenida a bordo del equipo de sistemas de EverOffice Supplies. Te escribo a primera hora porque Dirección nos ha dado luz verde para levantar el servidor central de la empresa.

Como estás trabajando en tu MacBook Pro con procesador Apple Silicon (ARM64), recuerda que VirtualBox tradicional no ofrece estabilidad nativa en esta arquitectura; monta la máquina con UTM o Parallels utilizando la ISO oficial de Ubuntu Server 24.04 ARM64.

Antes de desplegar cualquier servicio web o FTP, necesito que asegures tres puntos críticos:
1. Configura la máquina virtual en modo puente (Bridged) para que tu Mac anfitrión y el servidor compartan la misma red local física de la oficina.
2. Identifica la IP privada asignada a Ubuntu y haz un ping bidireccional desde tu Mac anfitrión. Si el ping no responde, nada de lo que hagamos después funcionará.
3. Actualiza el sistema por completo (apt update && upgrade). No quiero sorpresas con dependencias obsoletas en producción.

Confírmame en cuanto tengas conectividad bidireccional y los paquetes al día para darte luz verde con los portales web.

Un saludo,
David Brent · Dirección de IT
EverOffice Supplies Corp.`
    },
    scriptText: `«En esta primera parte configuramos la infraestructura del entorno virtualizado. Dado que trabajamos en un equipo Mac con procesador Apple Silicon (arquitectura ARM64), utilizamos UTM o Parallels con la imagen oficial de Ubuntu Server 24.04 ARM64, ya que VirtualBox tradicional para x86 no ofrece estabilidad nativa.
    
Para que nuestro Mac anfitrión y el servidor convivan en el mismo segmento de red local, configuramos el adaptador de red en modo Puente (Bridged). Comprobamos que el router nos asigna una IP válida y verificamos la conectividad bidireccional realizando un ping entre ambos equipos. Finalmente, actualizamos los repositorios del sistema para garantizar la compatibilidad de todos los servicios.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Identificar la dirección IP asignada a Ubuntu Server',
        cmd: 'ip -br a',
        whatItDoes: 'Ejecuta ip con la opción -br (brief) sobre la familia address (a) para listar de inmediato las interfaces de red activas (UP) y la IP privada asignada por DHCP en formato CIDR sin saturar la terminal.',
        businessContext: '«Como administrador/a de sistemas de EverOffice Supplies, acabo de levantar el servidor corporativo en mi estación de trabajo Mac. Necesito identificar con qué IP privada responde la máquina en la red local de la empresa para poder configurarle los servicios web y conectarme a ella como cliente.»'
      },
      {
        stepNumber: 2,
        label: 'Comprobar conectividad bidireccional hacia el Mac anfitrión',
        cmd: 'ping -c 3 192.168.1.XX',
        whatItDoes: 'Envía 3 paquetes de sondeo ICMP Echo Request (-c 3) hacia la IP del Mac anfitrión, certificando respuesta inmediata sin pérdida de paquetes (0% loss) ni filtrado por cortafuegos.',
        businessContext: '«Nuestros puestos de trabajo corporativos deben alcanzar al servidor sin trabas. Al configurar el adaptador en modo puente (Bridged), verifico que mi equipo anfitrión y el servidor conviven en el mismo segmento de red física, garantizando que cuando los clientes abran la web o FileZilla habrá visibilidad directa.»'
      },
      {
        stepNumber: 3,
        label: 'Actualizar repositorios y paquetes del servidor',
        cmd: 'sudo apt update && sudo apt upgrade -y',
        whatItDoes: 'Actualiza los índices de paquetes de Canonical (apt update) y descarga e instala de forma desatendida (-y) todos los parches de seguridad y versiones estables más recientes.',
        businessContext: '«Antes de poner en producción ningún servicio para EverOffice Supplies, es mi deber como sysadmin endurecer el sistema base. Un servidor desactualizado es una brecha abierta; dejamos el sistema blindado con los últimos parches de seguridad de Ubuntu 24.04.»'
      }
    ],
    configFiles: []
  },
  {
    id: 'escena-2',
    tabLabel: 'Apache & VHosts',
    number: '2',
    title: 'Apache2 y Virtual Hosts Corporativos (EverOffice Supplies)',
    score: '1.0 punto',
    objective: 'Instalar Apache2 y configurar Virtual Hosts basados en nombre para www.everofficesupplies.cat, www.dundersupplies.cat y www.mifflinsupplies.cat.',
    rubricChecklist: [
      'Mostrar estado de Apache2 activo ("systemctl status apache2")',
      'Mostrar estructura de directorios y páginas index.html en /var/www/...',
      'Mostrar ficheros de configuración en /etc/apache2/sites-available/',
      'Mostrar activación de sitios con "a2ensite"',
      'Mostrar resolución en /etc/hosts del Mac anfitrión',
      'Navegar en el navegador web del Mac mostrando cada uno de los 3 dominios'
    ],
    bossEmail: {
      fromName: 'Michael Scott',
      fromRole: 'CEO & Director General',
      fromEmail: 'ceo@everofficesupplies.cat',
      date: 'Hoy, 10:15',
      priority: 'Prioridad: MÁXIMA ⭐',
      subject: '¡BLANCA! Lanzamiento inminente de los portales de Dunder y Mifflin',
      body: `¡Blanca! ¡Mi administradora de sistemas favorita!

La junta directiva está encima mía. Hemos culminado la adquisición de nuestras dos divisiones internacionales: la americana (Dunder Supplies) y la británica (Mifflin Supplies). ¡El imperio del material de oficina se expande!

Finanzas me ha dicho que comprar tres servidores dedicados es una locura de presupuesto, y les he dicho: "Tranquilos, Blanca lo resolverá con un solo servidor".

Esto es lo que necesito urgentemente:
1. Instala el servidor web Apache2 en nuestro Ubuntu corporativo y asegúrate de que el demonio está activo.
2. Implementa Virtual Hosts basados en nombre. Quiero que una sola IP física sirva tres webs totalmente distintas:
   - www.everofficesupplies.cat (nuestra matriz catalana)
   - www.dundersupplies.cat (la división americana)
   - www.mifflinsupplies.cat (la división británica)
3. Prepara páginas de bienvenida diferenciadas para que cuando entre desde el navegador de mi Mac o los clientes tecleen la URL, vean su portal correspondiente.
4. Mapea la resolución en tu fichero /etc/hosts para que podamos navegar y hacer la demostración en directo.

¡Haz que brille, Blanca! Confío plenamente en ti.

Michael Scott · CEO
EverOffice Supplies & Dunder Mifflin Global`
    },
    scriptText: `«A continuación, desplegamos el servidor web Apache2 para la empresa EverOffice Supplies. La compañía requiere alojar su portal principal y dos divisiones internacionales bajo una única dirección IP.
    
Para resolver esto implementamos Virtual Hosts basados en nombre. Cuando el navegador solicita una URL, envía la cabecera HTTP "Host". Apache inspecciona esta cabecera y sirve el DocumentRoot correspondiente.
    
Hemos preparado tres directorios diferenciados en /var/www/ y configurado sus respectivos archivos .conf en sites-available. En nuestro Mac anfitrión, editamos el fichero /etc/hosts para simular la resolución DNS local apuntando los tres dominios hacia la IP de nuestra máquina virtual. Al abrir el navegador, vemos cómo cada dominio carga su propia página corporativa de manera independiente.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Instalar el servidor web Apache2',
        cmd: 'sudo apt install -y apache2',
        whatItDoes: 'Descarga e instala el motor web Apache HTTP Server (apache2) junto a sus módulos esenciales desde los repositorios de Ubuntu en modo desatendido (-y).',
        businessContext: '«La dirección de EverOffice Supplies nos encomienda publicar la presencia online de la compañía. Instalamos el servidor web corporativo para dar soporte al portal institucional y a las dos divisiones internacionales.»'
      },
      {
        stepNumber: 2,
        label: 'Comprobar estado del servicio web y socket',
        cmd: 'sudo systemctl status apache2 --no-pager',
        whatItDoes: 'Verifica con systemd que el servicio apache2 está en estado "active (running)" y que el proceso maestro ha abierto los sockets de escucha en el puerto 80 sin pausar la terminal (--no-pager).',
        businessContext: '«Como sysadmin, no doy nada por sentado: verifico que el demonio web ha levantado correctamente y está listo para despachar tráfico HTTP antes de crear los portales de las filiales.»'
      },
      {
        stepNumber: 3,
        label: 'Crear directorios DocumentRoot de los tres portales',
        cmd: 'sudo mkdir -p /var/www/everofficesupplies/html /var/www/dundersupplies/html /var/www/mifflinsupplies/html',
        whatItDoes: 'Crea de forma recursiva (-p) las rutas de almacenamiento web independientes para cada uno de los tres dominios de la empresa.',
        businessContext: '«EverOffice Supplies opera su portal principal y dos divisiones: la americana (Dunder Supplies) y la británica (Mifflin Supplies). En lugar de gastar presupuesto en tres servidores físicos, optimizo recursos creando una raíz web aislada para cada marca en este mismo equipo.»'
      },
      {
        stepNumber: 4,
        label: 'Crear páginas de bienvenida diferenciadas (index.html)',
        cmd: 'echo "<h1>EverOffice Supplies · Portal Principal</h1>" | sudo tee /var/www/everofficesupplies/html/index.html && echo "<h1>Dunder Mifflin Supplies · División Americana</h1>" | sudo tee /var/www/dundersupplies/html/index.html && echo "<h1>Mifflin Supplies · División Británica</h1>" | sudo tee /var/www/mifflinsupplies/html/index.html',
        whatItDoes: 'Escribe mediante sudo tee el código HTML distintivo en cada archivo index.html para diferenciar visualmente los 3 sitios web.',
        businessContext: '«Preparo el contenido de bienvenida específico para cada marca. Los clientes que visiten la matriz catalana, la división americana o la británica deben ver inmediatamente la identidad visual de su delegación sin confusiones.»'
      },
      {
        stepNumber: 5,
        label: 'Habilitar sitios virtuales y recargar Apache2',
        cmd: 'sudo a2ensite everofficesupplies.conf dundersupplies.conf mifflinsupplies.conf && sudo systemctl reload apache2',
        whatItDoes: 'Crea los enlaces simbólicos de sites-available hacia sites-enabled y recarga la configuración del demonio sin interrumpir conexiones activas.',
        businessContext: '«Pongo en marcha los Virtual Hosts basados en nombre. Cuando un cliente teclea el dominio en su navegador, Apache inspecciona la cabecera Host y le sirve la web exacta de su filial. Recargo la configuración en caliente para no interrumpir el servicio.»'
      }
    ],
    configFiles: [
      {
        filename: '/etc/apache2/sites-available/everofficesupplies.conf',
        content: `<VirtualHost *:80>
    ServerName www.everofficesupplies.cat
    ServerAlias everofficesupplies.cat
    ServerAdmin admin@everofficesupplies.cat
    DocumentRoot /var/www/everofficesupplies/html

    ErrorLog \${APACHE_LOG_DIR}/everoffice_error.log
    CustomLog \${APACHE_LOG_DIR}/everoffice_access.log combined
</VirtualHost>`
      },
      {
        filename: '/etc/hosts (en tu Mac anfitrión)',
        content: `# Añadir al final de /etc/hosts en macOS (sudo nano /etc/hosts):
192.168.1.XX  www.everofficesupplies.cat everofficesupplies.cat
192.168.1.XX  www.dundersupplies.cat
192.168.1.XX  www.mifflinsupplies.cat`
      }
    ]
  },
  {
    id: 'escena-3',
    tabLabel: 'Recurso Privado /nomines',
    number: '3',
    title: 'Recurso Privado (/nomines) y Autenticación Básica HTTP',
    score: '1.0 punto',
    objective: 'Restringir el acceso a www.everofficesupplies.cat/nomines mediante autenticación básica HTTP con .htpasswd.',
    rubricChecklist: [
      'Mostrar creación del directorio /nomines y archivo privado dentro',
      'Mostrar creación de usuarios en el fichero .htpasswd con contraseña cifrada',
      'Mostrar bloque <Directory> con directivas AuthType Basic en Apache',
      'Demostrar en el navegador el diálogo emergente de petición de credenciales',
      'Demostrar error 401 Unauthorized ante contraseña incorrecta o cancelación',
      'Demostrar acceso concedido tras introducir credenciales válidas'
    ],
    bossEmail: {
      fromName: 'Toby Flenderson',
      fromRole: 'Director de Recursos Humanos',
      fromEmail: 'rrhh@everofficesupplies.cat',
      date: 'Hoy, 11:45',
      priority: 'CONFIDENCIAL 🔒',
      subject: 'ESTRICTAMENTE CONFIDENCIAL: Blanca, bloquea /nomines de inmediato',
      body: `Hola Blanca,

Te escribo este correo con carácter estrictamente confidencial.

Alguien en contabilidad ha dejado entrever que el directorio de salarios y nóminas de la empresa (www.everofficesupplies.cat/nomines) podría ser accesible por cualquier empleado o visitante si no se aplica una restricción férrea. Esto supondría una infracción gravísima de la legislación de protección de datos (RGPD).

Necesito tu intervención urgente como sysadmin:
1. Aísla la ruta /nomines con autenticación básica HTTP mediante el módulo mod_auth de Apache.
2. Crea un archivo seguro .htpasswd FUERA del árbol público de la web para que nadie pueda descargárselo por URL.
3. Genera el usuario administrativo 'rrhh_admin' con contraseña fuertemente cifrada (hash criptográfico con sal).
4. Verifica en tu navegador que cualquier intento de entrar a /nomines devuelve un error HTTP 401 Unauthorized a menos que se introduzcan las credenciales autorizadas.

Por favor, no comentes esto con nadie más hasta que el cerrojo esté activo y verificado.

Gracias por tu discreción,
Toby Flenderson · Recursos Humanos
EverOffice Supplies`
    },
    scriptText: `«La dirección de EverOffice Supplies exige que el directorio de nóminas (/nomines) solo sea accesible por personal autorizado.
    
Para proteger este recurso confidencial, implementamos Autenticación Básica HTTP mediante el módulo mod_auth de Apache. Definimos la directiva AuthType Basic vinculada al archivo seguro .htpasswd, donde las contraseñas se almacenan mediante hash criptográfico con sal.
    
En el navegador accedemos a www.everofficesupplies.cat/nomines. Vemos cómo el servidor intercepta la petición y responde con un código HTTP 401 Unauthorized, forzando la ventana de autenticación. Si introducimos credenciales erróneas o cancelamos, se deniega el acceso. Al autenticarnos con el usuario autorizado, el navegador envía la cabecera Authorization y accedemos al contenido privado.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Crear directorio restringido y documento privado /nomines',
        cmd: 'sudo mkdir -p /var/www/everofficesupplies/html/nomines && echo "<h2>Listado de Nóminas Confidenciales - Octubre 2026</h2>" | sudo tee /var/www/everofficesupplies/html/nomines/index.html',
        whatItDoes: 'Crea el subdirectorio /nomines dentro del DocumentRoot de EverOffice y genera un archivo sensible simulando nóminas confidenciales.',
        businessContext: '«El departamento de Recursos Humanos de EverOffice Supplies nos traslada una exigencia crítica de privacidad: el listado de nóminas de la empresa (/nomines) jamás puede quedar expuesto al público general ni a clientes.»'
      },
      {
        stepNumber: 2,
        label: 'Crear usuario en .htpasswd con contraseña cifrada',
        cmd: 'sudo htpasswd -c /etc/apache2/.htpasswd rrhh_admin',
        whatItDoes: 'Crea el archivo nuevo (-c) en /etc/apache2/.htpasswd y solicita la contraseña interactiva para el usuario rrhh_admin, almacenándola con hash seguro y sal.',
        businessContext: '«Para cumplir la estricta confidencialidad laboral, como sysadmin genero una credencial administrativa exclusiva para el responsable de RRHH (rrhh_admin). Al colocar el fichero fuera de /var/www/, garantizo que ningún atacante pueda descargárselo por la web.»'
      },
      {
        stepNumber: 3,
        label: 'Verificar almacenamiento seguro de contraseñas (Hash criptográfico)',
        cmd: 'cat /etc/apache2/.htpasswd',
        whatItDoes: 'Imprime en la terminal el contenido del archivo .htpasswd mostrando el usuario y el hash criptográfico resultante (no la contraseña en texto plano).',
        businessContext: '«Audito la seguridad de la cuenta de RRHH: me aseguro de que la clave no se ha guardado en texto plano. Si alguien accediera físicamente al archivo, solo vería una huella criptográfica indescifrable.»'
      },
      {
        stepNumber: 4,
        label: 'Recargar Apache para activar la protección HTTP',
        cmd: 'sudo systemctl reload apache2',
        whatItDoes: 'Relee la configuración de Virtual Hosts tras añadir la directiva <Directory> de protección sin reiniciar ni cortar peticiones en curso.',
        businessContext: '«Activo el cerrojo de seguridad en el servidor. A partir de este segundo, cualquier empleado o cliente ajeno que intente abrir /nomines chocará contra una ventana de autenticación HTTP 401 y será rechazado si no cuenta con las credenciales de RRHH.»'
      }
    ],
    configFiles: [
      {
        filename: 'Añadir a /etc/apache2/sites-available/everofficesupplies.conf',
        content: `    # Protección del recurso privado /nomines
    <Directory /var/www/everofficesupplies/html/nomines>
        AuthType Basic
        AuthName "Acceso Restringido a Personal de RRHH"
        AuthUserFile /etc/apache2/.htpasswd
        Require valid-user
    </Directory>`
      }
    ]
  },
  {
    id: 'escena-4',
    tabLabel: 'ProFTPD & Demonio',
    number: '4',
    title: 'Instalación y Gestión del Servidor FTP ProFTPD',
    score: '0.5 puntos',
    objective: 'Instalar ProFTPD, verificar estado, ciclo de parada/reinicio, usuario en ejecución y escucha en el puerto 21.',
    rubricChecklist: [
      'Mostrar instalación del paquete proftpd',
      'Demostrar parada ("systemctl stop proftpd") y arranque ("systemctl start proftpd")',
      'Mostrar con qué usuario se ejecuta el servicio con "ps aux | grep proftpd"',
      'Mostrar usuarios de sistema creados con "cat /etc/passwd | grep -E proftpd|ftp"',
      'Comprobar el proceso a la escucha en el puerto 21 con "sudo ss -tlnp | grep :21"'
    ],
    bossEmail: {
      fromName: 'Dr. Walter Bishop',
      fromRole: 'Jefe de I+D y Laboratorios de Material',
      fromEmail: 'laboratorio@everofficesupplies.cat',
      date: 'Hoy, 14:20',
      priority: 'PETICIÓN TÉCNICA 🧪',
      subject: 'Blanca, los científicos necesitamos transferir informes pesados al servidor',
      body: `Estimada Blanca,

En nuestro laboratorio de investigación química de tintas y papeles especiales hemos finalizado una serie de ensayos críticos. Los informes generados contienen telemetría pesada y datos espectrales de varios gigabytes. El correo corporativo rechaza los archivos por límite de tamaño y necesitamos una vía directa de transferencia.

Dirección nos ha autorizado a utilizar el mismo servidor de la empresa para desplegar un servidor FTP ProFTPD.

Te solicito los siguientes pasos de infraestructura:
1. Instala ProFTPD en modo autónomo (standalone).
2. Verifica que el demonio responde a las órdenes de parada y arranque limpio, y comprueba que escucha activamente por el puerto estándar 21 TCP.
3. Por favor, asegúrate de que el proceso en ejecución NO corre bajo el usuario root; debe correr bajo la cuenta del sistema 'proftpd' para cumplir las normas de menor privilegio del laboratorio.
4. Comprueba en /etc/passwd que las cuentas de servicio del demonio tienen su shell bloqueada (/bin/false) para evitar accesos indebidos a consola.

Quedo a la espera de tu confirmación para empezar a subir los informes.

Atentamente,
Dr. Walter Bishop · Dpto. de I+D
EverOffice Supplies`
    },
    scriptText: `«Pasamos ahora a la Parte 2 del encargo: el servicio de transferencia de archivos seguro para que los científicos de la empresa suban informes de investigación.
    
Instalamos el servidor ProFTPD en el mismo sistema Ubuntu. Comprobamos su estado mediante systemctl, realizando una parada y posterior arranque para evidenciar el control del demonio.
    
Inspeccionamos los procesos activos y observamos que ProFTPD se ejecuta con el usuario del sistema "proftpd". Al consultar /etc/passwd comprobamos que la instalación ha dado de alta automáticamente a los usuarios de sistema "proftpd" y "ftp". Finalmente, verificamos con "ss" que el demonio está escuchando activamente por el puerto estándar 21 TCP para atender conexiones de control.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Instalar el servidor FTP ProFTPD',
        cmd: 'sudo apt install -y proftpd',
        whatItDoes: 'Descarga e instala el servidor FTP ProFTPD en modo standalone junto a sus archivos de configuración base en /etc/proftpd/proftpd.conf.',
        businessContext: '«Nuestros científicos e investigadores de producto en EverOffice Supplies necesitan transferir a la central grandes informes de laboratorio. Como sysadmin, despliego ProFTPD como plataforma corporativa para el intercambio seguro de archivos.»'
      },
      {
        stepNumber: 2,
        label: 'Demostrar parada, arranque y control del demonio',
        cmd: 'sudo systemctl stop proftpd && sudo systemctl start proftpd && sudo systemctl status proftpd --no-pager',
        whatItDoes: 'Envía señales de parada (stop) y rearranque (start) limpias al proceso proftpd mediante systemd, reportando su estado operativo en ejecución.',
        businessContext: '«En las operaciones del día a día de la empresa tendré que realizar tareas de mantenimiento programado. Verifico que el servicio responde con precisión a las órdenes de parada y puesta en marcha sin dejar procesos zombi bloqueando el puerto.»'
      },
      {
        stepNumber: 3,
        label: 'Comprobar usuario de ejecución del proceso',
        cmd: 'ps aux | grep proftpd',
        whatItDoes: 'Filtra la lista de procesos activos para mostrar qué usuario del sistema es el propietario del proceso daemon en memoria.',
        businessContext: '«Regla de oro de seguridad en la empresa: aplicar el principio de menor privilegio. Constato que ProFTPD se ejecuta bajo el usuario del sistema "proftpd" y NO como root; si el servicio sufriera una vulnerabilidad, el atacante no tomaría el control del servidor.»'
      },
      {
        stepNumber: 4,
        label: 'Comprobar usuarios del sistema registrados',
        cmd: "cat /etc/passwd | grep -E 'proftpd|ftp'",
        whatItDoes: 'Inspecciona /etc/passwd para mostrar las cuentas de sistema creadas automáticamente por el paquete (proftpd y ftp) con shell /bin/false.',
        businessContext: '«Compruebo qué cuentas ha aprovisionado el paquete en el sistema operativo. Constato que la cuenta "ftp" y "proftpd" tienen su shell bloqueada en /bin/false, impidiendo que nadie pueda utilizarlas para colarse por SSH o consola en la máquina de la empresa.»'
      },
      {
        stepNumber: 5,
        label: 'Comprobar proceso escuchando en el puerto 21 TCP',
        cmd: 'sudo ss -tlnp | grep :21',
        whatItDoes: 'Usa Socket Statistics para verificar sockets TCP (-t) a la escucha (-l) numéricos (-n) con el proceso (-p) en el puerto 21.',
        businessContext: '«Verifico que el canal de control está listo en el puerto 21 TCP. El servidor está despierto y preparado para aceptar conexiones de los equipos de los científicos y clientes de EverOffice Supplies.»'
      }
    ],
    configFiles: []
  },
  {
    id: 'escena-5',
    tabLabel: 'Acceso Anónimo & FileZilla',
    number: '5',
    title: 'Acceso Anónimo FTP de Solo Lectura y FileZilla',
    score: '1.0 punto',
    objective: 'Configurar acceso anónimo solo de lectura a /everofficesupplies/public, descargar archivos y demostrar bloqueo de escritura.',
    rubricChecklist: [
      'Mostrar creación de /everofficesupplies/public y archivo informe_publico.txt',
      'Mostrar permisos de propiedad "chown -R ftp:ftp /everofficesupplies"',
      'Mostrar bloque <Anonymous> con directiva <Limit WRITE> DenyAll en proftpd.conf',
      'Conectarse por terminal cliente o lftp como "anonymous" y descargar el informe',
      'Intentar subir un archivo como anónimo y demostrar el error de permisos (550)',
      'Conectarse con el cliente gráfico FileZilla como anónimo y descargar el archivo'
    ],
    bossEmail: {
      fromName: 'Pam Beesly',
      fromRole: 'Directora de Comunicación y Relaciones Públicas',
      fromEmail: 'comunicacion@everofficesupplies.cat',
      date: 'Hoy, 16:00',
      priority: 'CANAL EXTERNO 📢',
      subject: 'Blanca, zona de descarga pública para prensa y clientes sin contraseña',
      body: `Hola Blanca,

¡Qué buena noticia que ya tengamos el servidor FTP en marcha!

Te escribo porque desde el departamento de Comunicación y Prensa necesitamos habilitar una zona abierta para que periodistas, proveedores y clientes puedan descargarse nuestros dossiers públicos y catálogos de productos sin necesidad de registrarse ni recordar contraseñas.

Los requisitos que nos ha fijado la dirección son muy concretos:
1. Crea una carpeta pública en /everofficesupplies/public y coloca dentro un informe público de prueba.
2. Configura ProFTPD para permitir acceso anónimo (usuario 'anonymous') únicamente a esta zona.
3. ¡MUY IMPORTANTE, BLANCA!: La zona pública debe ser estrictamente de SOLO LECTURA. Debes aplicar la directiva <Limit WRITE> DenyAll. No podemos permitir bajo ningún concepto que usuarios anónimos puedan subir archivos (PUT), borrar informes o inyectar código dañino.
4. Conéctate con FileZilla desde tu Mac y demuéstranos que la descarga funciona en un clic y que los intentos de subida son bloqueados con error 550 Permission Denied.

¡Mil gracias por tu ayuda, Blanca!

Pam Beesly · Comunicación & RR.PP.
EverOffice Supplies`
    },
    scriptText: `«La empresa necesita una zona pública donde clientes y colaboradores descarguen comunicados sin necesidad de usuario ni contraseña.
    
Creamos la carpeta /everofficesupplies/public con un informe de prueba y asignamos la propiedad al usuario y grupo del sistema "ftp".
    
En proftpd.conf activamos el bloque <Anonymous /everofficesupplies>. Es fundamental aplicar la directiva <Limit WRITE> DenyAll dentro del directorio public para garantizar que el usuario anónimo solo tenga permisos de lectura y descarga, impidiendo cualquier inyección de archivos no autorizados.
    
Reiniciamos el servicio y realizamos dos comprobaciones: primero conectándonos por terminal para verificar la descarga y demostrar que la orden PUT es rechazada con un error 550 Permission Denied; y después abriendo FileZilla, conectándonos en modo anónimo y descargando el documento a nuestro ordenador local.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Crear directorio público y archivo corporativo',
        cmd: 'sudo mkdir -p /everofficesupplies/public && echo "Informe público de investigación EverOffice 2026" | sudo tee /everofficesupplies/public/informe_publico.txt',
        whatItDoes: 'Crea la estructura de carpetas públicas solicitada y genera un archivo de texto de prueba para la descarga.',
        businessContext: '«El departamento de Comunicación y Ventas nos pide una pasarela pública donde clientes, proveedores y colaboradores puedan descargarse catálogos e informes generales sin necesidad de registrarse ni pedir contraseñas.»'
      },
      {
        stepNumber: 2,
        label: 'Asignar propiedad al usuario ftp y permisos de solo lectura',
        cmd: 'sudo chown -R ftp:ftp /everofficesupplies && sudo chmod -R 755 /everofficesupplies',
        whatItDoes: 'Otorga la propiedad del directorio al usuario del sistema ftp y aplica permisos 755 (lectura y ejecución para todos, escritura solo para root).',
        businessContext: '«Alineo el sistema de archivos con las políticas de seguridad: asigno la carpeta al usuario del servicio "ftp" para que el demonio pueda servirla, pero bloqueo la escritura a cualquiera que no sea el administrador.»'
      },
      {
        stepNumber: 3,
        label: 'Reiniciar ProFTPD tras configurar bloque anónimo',
        cmd: 'sudo systemctl restart proftpd',
        whatItDoes: 'Reinicia el proceso de ProFTPD para cargar las directivas <Anonymous> y <Limit WRITE> DenyAll configuradas en proftpd.conf.',
        businessContext: '«Aplico la directiva que blindará la zona pública: permito que cualquiera entre como anónimo a leer, pero prohíbo terminantemente (DenyAll) la escritura. Así evitamos que usuarios malintencionados inyecten virus o borren los informes de la empresa.»'
      },
      {
        stepNumber: 4,
        label: 'Probar conexión anónima y verificar bloqueo de escritura',
        cmd: 'ftp -p 127.0.0.1',
        whatItDoes: 'Inicia cliente FTP en modo pasivo (-p). Con usuario "anonymous" y contraseña en blanco permite ejecutar get y probar put.',
        businessContext: '«Me pongo en la piel de un cliente externo: accedo sin clave, compruebo que me descargo el informe a la primera y luego intento "hackear" o subir un archivo propio; el servidor me corta el paso con error 550. Objetivo cumplido: lectura abierta, escritura bloqueada.»'
      }
    ],
    configFiles: [
      {
        filename: 'Añadir al final de /etc/proftpd/proftpd.conf',
        content: `<Anonymous /everofficesupplies>
    User ftp
    Group ftp
    UserAlias anonymous ftp
    RequireValidShell off
    MaxClients 10 "Servidor ocupado"
    
    <Directory public>
        <Limit WRITE>
            DenyAll
        </Limit>
    </Directory>
</Anonymous>`
      }
    ]
  },
  {
    id: 'escena-6',
    tabLabel: 'Usuarios Virtuales',
    number: '6',
    title: 'Usuarios Virtuales (ftpasswd) y Permisos Diferenciados',
    score: '1.0 punto',
    objective: 'Crear usuarios virtuales con ftpasswd para comerciales (Carla y Dídac: R/W) y auditores (Elena y Francesc: Solo lectura) en /everofficesupplies/clients.',
    rubricChecklist: [
      'Mostrar creación del directorio /everofficesupplies/clients',
      'Crear grupos virtuales "comercials" y "auditors" con "ftpasswd --group"',
      'Crear usuarios virtuales con "ftpasswd --passwd" vinculados a sus grupos',
      'Mostrar directivas AuthUserFile, AuthGroupFile y DefaultRoot ~ en proftpd.conf',
      'Demostrar que Carla o Dídac pueden leer y subir archivos a /clients',
      'Demostrar que Elena o Francesc pueden leer pero se les rechaza la subida a /clients',
      'Comprobar que usuarios ajenos no pueden entrar'
    ],
    bossEmail: {
      fromName: 'Jim Halpert',
      fromRole: 'Director Comercial y Coordinación Externa',
      fromEmail: 'ventas@everofficesupplies.cat',
      date: 'Hoy, 17:30',
      priority: 'GESTIÓN DE EQUIPOS 👥',
      subject: 'Blanca, acceso diferenciado para Carla (Ventas) y Elena (Auditoría)',
      body: `Hola Blanca,

Tenemos que coordinar el acceso a la carpeta de clientes (/everofficesupplies/clients) y aquí tenemos un caso especial con dos perfiles de empleados muy diferentes:

1. CARLA (y Dídac): Son nuestros comerciales estrella. Necesitan subir contratos firmados, pedidos y presupuestos. Deben tener permisos completos de lectura y escritura en la carpeta.
2. ELENA (y Francesc): Son auditores contables externos. Su cometido es verificar balances y facturas. Por normativa de auditoría, deben poder leer y descargar todo, pero tienen TERMINANTEMENTE PROHIBIDO modificar o subir archivos (solo lectura).

Y aquí viene la clave de seguridad, Blanca:
Por favor, NO crees cuentas reales en Linux ni toques /etc/passwd ni /etc/group. No queremos que ningún comercial o auditor tenga cuenta local en el servidor ni pueda abrir sesiones SSH. Utiliza la utilidad ftpasswd para crear usuarios y grupos virtuales independientes, y enjaúlalos a todos con DefaultRoot ~ para que no puedan navegar hacia la raíz del servidor.

Demuéstranos que Carla puede subir archivos y que a Elena el servidor le deniega la escritura.

¡Contamos contigo!
Jim Halpert · Dirección Comercial
EverOffice Supplies`
    },
    scriptText: `«Para el acceso autenticado a la carpeta de clientes, la empresa no desea crear cuentas reales de Linux para evitar exponer el sistema operativo. Por ello, recurrimos a Usuarios Virtuales mediante la utilidad ftpasswd.
    
Definimos dos grupos: "comercials" (GID 2001) para Carla y Dídac, y "auditors" (GID 2002) para Elena y Francesc. Enjaulamos a todos los usuarios virtuales con la directiva DefaultRoot ~ para que no puedan navegar hacia la raíz del servidor.
    
En la configuración de ProFTPD, regulamos los límites: al grupo comercial le otorgamos permisos completos (lectura, escritura y modificación), mientras que al grupo de auditores le permitimos únicamente lectura (READ y DIRS) denegando cualquier operación de escritura.
    
En la demostración conectamos con Carla y mostramos cómo sube un archivo con éxito; acto seguido conectamos con Elena y comprobamos que puede ver y descargar los ficheros, pero al intentar subir un documento el servidor le deniega el acceso.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Crear carpeta compartida de clientes y asignar permisos',
        cmd: 'sudo mkdir -p /everofficesupplies/clients && sudo chown -R ftp:ftp /everofficesupplies/clients && sudo chmod -R 775 /everofficesupplies/clients',
        whatItDoes: 'Crea el directorio /clients y establece permisos 775 con propietario ftp:ftp para permitir que los usuarios virtuales interactúen.',
        businessContext: '«Preparo el espacio de trabajo compartido para la gestión comercial y de auditoría de EverOffice Supplies. Aquí convivirán pedidos, facturas y auditorías contables de clientes.»'
      },
      {
        stepNumber: 2,
        label: 'Crear grupos virtuales independientes (comercials y auditors)',
        cmd: 'sudo ftpasswd --group --name=comercials --gid=2001 --file=/etc/proftpd/ftpd.group && sudo ftpasswd --group --name=auditors --gid=2002 --file=/etc/proftpd/ftpd.group',
        whatItDoes: 'Utiliza ftpasswd para definir los grupos virtuales comercials (GID 2001) y auditors (GID 2002) en un fichero independiente sin tocar /etc/group.',
        businessContext: '«Como administrador de sistemas responsable, decido NO crear usuarios ni grupos en Linux. No quiero llenar el servidor de cuentas locales que puedan comprometer el sistema operativo; creo grupos virtuales que sólo existen dentro del ecosistema FTP de la empresa.»'
      },
      {
        stepNumber: 3,
        label: 'Crear usuario comercial (Carla - Permisos de Lectura y Escritura)',
        cmd: 'sudo ftpasswd --passwd --name=carla --uid=2001 --gid=2001 --home=/everofficesupplies/clients --shell=/bin/false --file=/etc/proftpd/ftpd.passwd',
        whatItDoes: 'Crea el usuario virtual "carla" con home en /clients y shell falsa en /etc/proftpd/ftpd.passwd, pidiendo su contraseña interactiva.',
        businessContext: '«Doy de alta a Carla, responsable del departamento comercial. Ella necesita subir presupuestos de clientes, descargar contratos y actualizar pedidos diarios, por lo que le concedo permisos completos de lectura y escritura dentro de la carpeta compartida.»'
      },
      {
        stepNumber: 4,
        label: 'Crear usuario auditor (Elena - Permisos de Solo Lectura)',
        cmd: 'sudo ftpasswd --passwd --name=elena --uid=2003 --gid=2002 --home=/everofficesupplies/clients --shell=/bin/false --file=/etc/proftpd/ftpd.passwd',
        whatItDoes: 'Crea el usuario virtual "elena" vinculado al GID 2002 (auditors) con home en /clients y shell /bin/false para evitar acceso SSH.',
        businessContext: '«Doy de alta a Elena, auditora contable de la empresa. Su función es fiscalizar y verificar que las operaciones de los comerciales sean correctas; por cumplimiento normativo, Elena debe poder descargar y leer cualquier documento, pero bajo ningún concepto puede alterar, subir o borrar información.»'
      },
      {
        stepNumber: 5,
        label: 'Reiniciar ProFTPD para cargar usuarios virtuales y enjaulado',
        cmd: 'sudo systemctl restart proftpd',
        whatItDoes: 'Reinicia el servicio para activar AuthUserFile, AuthGroupFile, DefaultRoot ~ y las directivas <Limit> configuradas.',
        businessContext: '«Activo la configuración y el enjaulado chroot (DefaultRoot ~). A partir de este momento, ni Carla ni Elena pueden escapar de /clients hacia las carpetas del sistema operativo. Cada departamento tiene exactamente los permisos que la dirección de la empresa ha estipulado.»'
      }
    ],
    configFiles: [
      {
        filename: 'Añadir a /etc/proftpd/proftpd.conf',
        content: `# Ficheros de autenticación virtual
AuthUserFile /etc/proftpd/ftpd.passwd
AuthGroupFile /etc/proftpd/ftpd.group
AuthOrder mod_auth_file.c

# Enjaulado chroot para todos los usuarios
DefaultRoot ~

<Directory /everofficesupplies/clients>
    # Comerciales: lectura y escritura completas
    <Limit ALL>
        AllowGroup comercials
        DenyAll
    </Limit>
    
    # Auditores: solo lectura
    <Limit READ DIRS>
        AllowGroup auditors
    </Limit>
    <Limit WRITE>
        DenyGroup auditors
    </Limit>
</Directory>`
      }
    ]
  },
  {
    id: 'escena-7',
    tabLabel: 'FTPS Seguro (TLS)',
    number: '7',
    title: 'Implementación de FTPS Seguro con TLS/SSL (OpenSSL)',
    score: '1.0 punto',
    objective: 'Cifrar las transferencias con proftpd-mod-crypto y certificados OpenSSL para prevenir ataques Man-in-the-Middle y sniffing.',
    rubricChecklist: [
      'Mostrar instalación del módulo "proftpd-mod-crypto"',
      'Generar certificado autofirmado con OpenSSL (proftpd.crt y proftpd.key)',
      'Mostrar configuración de /etc/proftpd/tls.conf (TLSEngine on, TLSRequired on)',
      'Descomentar "Include /etc/proftpd/tls.conf" en proftpd.conf',
      'Conectar con FileZilla exigiendo "FTP explícito sobre TLS"',
      'Mostrar en pantalla el certificado SSL y la huella digital aceptándola',
      'Mostrar icono del candado en FileZilla y registros de sesión en /var/log/proftpd/tls.log'
    ],
    bossEmail: {
      fromName: 'Dwight Schrute',
      fromRole: 'Oficial Principal de Seguridad (CISO)',
      fromEmail: 'seguridad@everofficesupplies.cat',
      date: 'Hoy, 18:45',
      priority: 'CRÍTICA / AMENAZA DETECTADA 🚨',
      subject: '¡ALERTA MÁXIMA BLANCA! Sniffing en la red local. Cifrado FTPS obligatorio YA',
      body: `¡BLANCA! ¡ATENCIÓN INMEDIATA!

Mis sistemas de monitorización han detectado una vulnerabilidad crítica: ¡el servidor FTP está transmitiendo credenciales y datos en texto plano! Cualquier persona malintencionada conectada a la red corporativa o a la Wi-Fi de la oficina con una herramienta como Wireshark puede interceptar las contraseñas de Carla, las de los auditores y los informes confidenciales mediante un ataque Man-in-the-Middle (MITM).

¡Esto es una catástrofe de seguridad y no lo voy a tolerar bajo mi supervisión!

Exijo la implementación inmediata del protocolo FTPS seguro:
1. Instala el módulo criptográfico proftpd-mod-crypto en Ubuntu.
2. Genera un par de claves RSA de 2048 bits y un certificado digital autofirmado con OpenSSL a nombre de EverOffice Supplies.
3. Protege los permisos de la clave privada (/etc/ssl/private/proftpd.key) a 600 para que solo root pueda leerla.
4. En tls.conf activa TLSEngine on y fuerza TLSRequired on. ¡No toleres ni una sola conexión insegura!
5. Conéctate con FileZilla exigiendo "FTP explícito sobre TLS", acepta el certificado en pantalla y enséñame el candado de seguridad en la barra de estado y el registro en /var/log/proftpd/tls.log.

¡La integridad de EverOffice Supplies depende de ti en este instante, Blanca! ¡Actúa con determinación!

Dwight Schrute · Jefe de Seguridad e Información (CISO)
EverOffice Supplies`
    },
    scriptText: `«En la última fase implementamos la máxima seguridad en la transferencia mediante FTPS. El protocolo FTP estándar transmite credenciales y datos en texto plano; cualquier atacante en la red con herramientas como Wireshark podría interceptar contraseñas mediante un ataque Man-in-the-Middle.
    
Para blindar el servicio instalamos el módulo proftpd-mod-crypto y generamos un par criptográfico RSA de 2048 bits con OpenSSL.
    
En el archivo tls.conf activamos TLSEngine y forzamos TLSRequired on, lo que significa que el servidor rechazará cualquier intento de conexión no cifrada. Descomentamos la inclusión del fichero en proftpd.conf y reiniciamos.
    
Abrimos FileZilla y configuramos la conexión con "Usar FTP explícito sobre TLS". Al conectar, FileZilla nos muestra la ventana de advertencia del certificado autofirmado con todos nuestros datos corporativos. Aceptamos el certificado, observamos el candado de conexión cifrada en la barra de estado y confirmamos la negociación exitosa inspeccionando el log /var/log/proftpd/tls.log.»`,
    commands: [
      {
        stepNumber: 1,
        label: 'Instalar módulo criptográfico TLS de ProFTPD',
        cmd: 'sudo apt install -y proftpd-mod-crypto',
        whatItDoes: 'Instala el módulo dinámico mod_tls para habilitar el cifrado TLSv1.2 y TLSv1.3 en el servidor ProFTPD.',
        businessContext: '«Alerta de seguridad: el FTP convencional transmite usuarios y claves en texto plano a través de la red local. Si un espía o empleado desleal conecta un analizador de red (Wireshark), capturaría las contraseñas de Carla o de los auditores. Instalamos el módulo de cifrado para blindar la empresa contra ataques Man-in-the-Middle.»'
      },
      {
        stepNumber: 2,
        label: 'Generar certificado SSL y par de claves con OpenSSL',
        cmd: 'sudo openssl req -x509 -newkey rsa:2048 -keyout /etc/ssl/private/proftpd.key -out /etc/ssl/certs/proftpd.crt -nodes -days 365',
        whatItDoes: 'Genera un par criptográfico RSA de 2048 bits con certificado X.509 autofirmado sin contraseña de desbloqueo (-nodes) válido durante 365 días.',
        businessContext: '«Como sysadmin, emito la identidad criptográfica de EverOffice Supplies. Generamos un par de claves corporativas robustas para cifrar tanto el canal de comandos (autenticación) como el canal de datos (ficheros transferidos).»'
      },
      {
        stepNumber: 3,
        label: 'Proteger permisos de la clave privada SSL',
        cmd: 'sudo chmod 600 /etc/ssl/private/proftpd.key && sudo chmod 644 /etc/ssl/certs/proftpd.crt',
        whatItDoes: 'Fija permisos 600 (solo lectura/escritura para root) en la clave privada y 644 en el certificado público para proteger el secreto criptográfico.',
        businessContext: '«La clave privada es el secreto más preciado del servidor. Si otro proceso o usuario pudiera leerla, podría descifrar las sesiones de los clientes. Como administrador responsable, restrinjo los permisos a lectura exclusiva del sistema.»'
      },
      {
        stepNumber: 4,
        label: 'Reiniciar ProFTPD y monitorizar el log TLS en tiempo real',
        cmd: 'sudo systemctl restart proftpd && sudo tail -f /var/log/proftpd/tls.log',
        whatItDoes: 'Reinicia ProFTPD para cargar tls.conf y abre un seguimiento activo (tail -f) sobre el fichero de registro de TLS.',
        businessContext: '«Pongo en marcha el servidor en modo seguro estricto y abro la consola de monitorización. Cuando Carla o los auditores se conecten desde FileZilla, veré en tiempo real cómo negocian el cifrado TLS, apareciendo el candado de seguridad y garantizando que ningún dato viaja desprotegido por la red de EverOffice Supplies.»'
      }
    ],
    configFiles: [
      {
        filename: '/etc/proftpd/tls.conf',
        content: `<IfModule mod_tls.c>
    TLSEngine on
    TLSLog /var/log/proftpd/tls.log
    TLSProtocol TLSv1.2 TLSv1.3
    
    # Exigir cifrado estricto tanto en canal de control como de datos
    TLSRequired on
    
    TLSRSACertificateFile /etc/ssl/certs/proftpd.crt
    TLSRSACertificateKeyFile /etc/ssl/private/proftpd.key
    
    TLSVerifyClient off
    TLSOptions NoSessionReuseRequired
</IfModule>`
      },
      {
        filename: 'En /etc/proftpd/proftpd.conf (Descomentar la línea)',
        content: `Include /etc/proftpd/tls.conf`
      }
    ]
  }
];

export default function DespEac1Teleprompter() {
  const [activeTab, setActiveTab] = useState('escena-1');
  const [fontSize, setFontSize] = useState(18);
  const [copiedCmd, setCopiedCmd] = useState(null);
  
  // Estados para el sistema de correos emergentes de la Jefatura
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailToast, setEmailToast] = useState(null);
  const [readEmails, setReadEmails] = useState({});

  // Timer de grabación
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Checklist de rúbricas guardado en localStorage
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('desp_eac1_teleprompter_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Temporizador
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleCheck = (key) => {
    setCheckedItems(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('desp_eac1_teleprompter_checks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  // Cálculos de progreso global y por escena
  const totalChecks = SCENES_DATA.reduce((acc, s) => acc + s.rubricChecklist.length, 0);
  const completedChecks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedChecks / totalChecks) * 100);

  const getSceneCheckStatus = (scene) => {
    const total = scene.rubricChecklist.length;
    const completed = scene.rubricChecklist.filter((_, idx) => Boolean(checkedItems[`${scene.id}_${idx}`])).length;
    return { completed, total, isAll: completed === total && total > 0 };
  };

  // Navegación secuencial entre pestañas
  const currentSceneIndex = SCENES_DATA.findIndex(s => s.id === activeTab);
  const currentScene = SCENES_DATA[currentSceneIndex];

  // Control de modal de correo corporativo y toast flotante
  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true);
    setEmailToast(null);
    if (currentScene) {
      setReadEmails(prev => ({ ...prev, [currentScene.id]: true }));
    }
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const handleTriggerToast = () => {
    if (currentScene && currentScene.bossEmail) {
      setEmailToast(currentScene.bossEmail);
      setTimeout(() => {
        setEmailToast(prev => (prev === currentScene.bossEmail ? null : prev));
      }, 10000);
    }
  };

  const handlePrevTab = () => {
    if (activeTab === 'plan-b') {
      setActiveTab('escena-7');
    } else if (currentSceneIndex > 0) {
      setActiveTab(SCENES_DATA[currentSceneIndex - 1].id);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNextTab = () => {
    if (currentSceneIndex < SCENES_DATA.length - 1) {
      setActiveTab(SCENES_DATA[currentSceneIndex + 1].id);
    } else if (currentSceneIndex === SCENES_DATA.length - 1) {
      setActiveTab('plan-b');
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', paddingBottom: '6rem' }}>
      
      {/* 1. BARRA SUPERIOR STICKY CLARA DE ALTO CONTRASTE */}
      <header style={{
        position: 'sticky',
        top: '76px',
        zIndex: 90,
        background: '#ffffff',
        borderBottom: '3px solid #e2e8f0',
        padding: '0.9rem 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
        
        {/* Lado izquierdo: Título y Volver */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <Link 
            to="/ioc/desp/lecciones-desp"
            style={{
              color: '#0f172a',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              border: '2px solid #cbd5e1',
              background: '#f1f5f9',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.color = '#15803d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
          >
            ← Volver al Libro
          </Link>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ 
                background: '#16a34a', 
                color: '#ffffff', 
                border: '1px solid #15803d', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.78rem', 
                fontWeight: 900,
                letterSpacing: '0.6px'
              }}>
                DESP · EAC 1
              </span>
              <h1 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                🎬 Teleprompter & Live Runner
              </h1>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600, marginTop: '0.15rem' }}>
              EverOffice Supplies · Videotutorial Guiado y Comandos en 1-Clic
            </div>
          </div>
        </div>

        {/* Lado Central: Cronómetro de Grabación con Colores Vivos */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          background: '#f8fafc',
          padding: '0.45rem 1.1rem',
          borderRadius: '10px',
          border: '2px solid #cbd5e1',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontSize: '1.1rem' }}>⏱️</span>
          <span style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.4rem', 
            fontWeight: 900, 
            color: isRunning ? '#dc2626' : '#0f172a',
            letterSpacing: '1.5px'
          }}>
            {formatTimer(seconds)}
          </span>
          <button 
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            style={{
              background: isRunning ? '#dc2626' : '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '7px',
              padding: '0.4rem 0.85rem',
              fontWeight: 900,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: isRunning ? '0 3px 10px rgba(220, 38, 38, 0.35)' : '0 3px 10px rgba(22, 163, 74, 0.35)',
              transition: 'transform 0.1s'
            }}
          >
            {isRunning ? 'Pausar' : 'Grabar'}
          </button>
          <button 
            type="button"
            onClick={() => { setIsRunning(false); setSeconds(0); }}
            style={{
              background: '#ffffff',
              color: '#475569',
              border: '2px solid #cbd5e1',
              borderRadius: '7px',
              padding: '0.4rem 0.7rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            title="Reiniciar cronómetro a 00:00"
          >
            Reset
          </button>
        </div>

        {/* Lado Derecho: Progreso Global y Zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          
          {/* Progreso Rúbrica */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 800, letterSpacing: '0.5px' }}>RÚBRICA IOC</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: progressPercent === 100 ? '#16a34a' : '#d97706' }}>
                {completedChecks}/{totalChecks} ({progressPercent}%)
              </div>
            </div>
            <div style={{ width: '75px', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: '#16a34a', transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* Ajuste de Tamaño de Fuente */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f1f5f9', padding: '0.3rem 0.5rem', borderRadius: '8px', border: '2px solid #cbd5e1' }}>
            <button 
              type="button"
              onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
              style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '5px', cursor: 'pointer', padding: '0.25rem 0.6rem', fontWeight: 900, fontSize: '0.86rem' }}
              title="Reducir tamaño del texto"
            >
              A-
            </button>
            <span style={{ fontSize: '0.88rem', color: '#0f172a', minWidth: '32px', textAlign: 'center', fontWeight: 900 }}>
              {fontSize}px
            </span>
            <button 
              type="button"
              onClick={() => setFontSize(prev => Math.min(28, prev + 1))}
              style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '5px', cursor: 'pointer', padding: '0.25rem 0.6rem', fontWeight: 900, fontSize: '0.86rem' }}
              title="Aumentar tamaño del texto"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      {/* 2. SISTEMA DE PESTAÑAS HORIZONTAL CLARO Y COLORIDO */}
      <nav 
        aria-label="Pestañas de Escenas de Grabación"
        style={{
          background: '#ffffff',
          borderBottom: '3px solid #cbd5e1',
          padding: '0.85rem 2rem',
          display: 'flex',
          gap: '0.65rem',
          overflowX: 'auto',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
        }}
      >
        {SCENES_DATA.map((scene) => {
          const isSelected = activeTab === scene.id;
          const status = getSceneCheckStatus(scene);

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => { setActiveTab(scene.id); window.scrollTo({ top: 0, behavior: 'auto' }); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.7rem 1.15rem',
                borderRadius: '10px',
                border: isSelected ? '2px solid #15803d' : '2px solid #cbd5e1',
                background: isSelected ? '#16a34a' : '#ffffff',
                color: isSelected ? '#ffffff' : '#0f172a',
                fontWeight: isSelected ? 900 : 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 4px 14px rgba(22, 163, 74, 0.35)' : '0 2px 5px rgba(0,0,0,0.03)'
              }}
            >
              <span style={{
                background: isSelected ? '#ffffff' : '#0f172a',
                color: isSelected ? '#15803d' : '#ffffff',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 900
              }}>
                {status.isAll ? '✓' : scene.number}
              </span>

              <span>{scene.tabLabel}</span>

              <span style={{
                fontSize: '0.74rem',
                background: isSelected ? 'rgba(0,0,0,0.2)' : '#f1f5f9',
                color: isSelected ? '#ffffff' : '#475569',
                padding: '0.15rem 0.5rem',
                borderRadius: '5px',
                fontWeight: 800,
                border: isSelected ? 'none' : '1px solid #cbd5e1'
              }}>
                {scene.score}
              </span>
            </button>
          );
        })}

        {/* Pestaña Especial: Plan B / Troubleshooting */}
        <button
          type="button"
          onClick={() => { setActiveTab('plan-b'); window.scrollTo({ top: 0, behavior: 'auto' }); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.7rem 1.2rem',
            borderRadius: '10px',
            border: activeTab === 'plan-b' ? '2px solid #b91c1c' : '2px solid #fca5a5',
            background: activeTab === 'plan-b' ? '#dc2626' : '#fef2f2',
            color: activeTab === 'plan-b' ? '#ffffff' : '#991b1b',
            fontWeight: 900,
            fontSize: '0.9rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'plan-b' ? '0 4px 14px rgba(220, 38, 38, 0.35)' : 'none'
          }}
        >
          <span>🚨</span>
          <span>Plan B / Troubleshooting</span>
        </button>
      </nav>

      {/* 3. VISTA DE CONTENIDO DE LA PESTAÑA ACTIVA */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.8rem' }}>
        
        {/* VISTA ESCENA INDIVIDUAL */}
        {activeTab !== 'plan-b' && currentScene && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
            
            {/* TARJETA DE CABECERA DE LA ESCENA */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              borderRadius: '16px',
              padding: '1.8rem 2.2rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <span style={{ 
                    background: '#16a34a', 
                    color: '#ffffff', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '7px', 
                    fontSize: '0.85rem', 
                    fontWeight: 900,
                    letterSpacing: '0.5px'
                  }}>
                    ESCENA {currentScene.number} DE 7
                  </span>
                  <span style={{ 
                    background: '#d97706', 
                    color: '#ffffff', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '7px', 
                    fontSize: '0.85rem', 
                    fontWeight: 900 
                  }}>
                    ⚖️ {currentScene.score}
                  </span>
                </div>
                
                <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 700 }}>
                  Videotutorial Oficial · DAW IOC 2627S1
                </span>
              </div>

              <h2 style={{ margin: '0.5rem 0 1rem', fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', lineHeight: '1.25' }}>
                {currentScene.title}
              </h2>

              <div style={{ 
                background: '#f0fdf4', 
                borderLeft: '5px solid #16a34a', 
                border: '1px solid #bbf7d0',
                borderLeftWidth: '5px',
                padding: '1rem 1.4rem', 
                borderRadius: '8px',
                color: '#14532d',
                fontSize: '1rem',
                lineHeight: '1.55',
                fontWeight: 600
              }}>
                <strong style={{ color: '#166534', fontWeight: 900 }}>🎯 Objetivo Evaluado: </strong>
                {currentScene.objective}
              </div>
            </div>

            {/* BANNER INTERACTIVO: EMAIL ENTRANTE DE LA JEFATURA PARA BLANCA */}
            {currentScene.bossEmail && (
              <section style={{
                background: '#ffffff',
                border: '2px solid #0284c7',
                borderRadius: '16px',
                padding: '1.4rem 1.8rem',
                boxShadow: '0 4px 18px rgba(2, 132, 199, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '12px', 
                      background: '#e0f2fe', 
                      border: '2px solid #bae6fd', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '1.4rem' 
                    }}>
                      📩
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Bandeja de Entrada · EverOffice Supplies Mail
                        </span>
                        <span style={{ 
                          background: readEmails[currentScene.id] ? '#dcfce7' : '#fee2e2', 
                          color: readEmails[currentScene.id] ? '#15803d' : '#b91c1c', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '6px', 
                          fontSize: '0.75rem', 
                          fontWeight: 900 
                        }}>
                          {readEmails[currentScene.id] ? '✓ LEÍDO' : '🔴 NO LEÍDO (PARA BLANCA)'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 700, marginTop: '0.15rem' }}>
                        De: <strong style={{ color: '#0f172a' }}>{currentScene.bossEmail.fromName}</strong> ({currentScene.bossEmail.fromRole}) · Para: <strong style={{ color: '#0284c7' }}>Blanca (SysAdmin)</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {/* Botón para simular notificación toast en vivo para el vídeo */}
                    <button
                      type="button"
                      onClick={handleTriggerToast}
                      title="Haz clic para que aparezca la notificación flotante en directo mientras grabas"
                      style={{
                        background: '#f8fafc',
                        color: '#334155',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '0.55rem 0.95rem',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>🔔</span>
                      <span>Simular pop-up en vivo</span>
                    </button>

                    {/* Botón para abrir la ventana emergente */}
                    <button
                      type="button"
                      onClick={handleOpenEmailModal}
                      style={{
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.55rem 1.15rem',
                        fontSize: '0.88rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        boxShadow: '0 3px 10px rgba(2, 132, 199, 0.35)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>📨</span>
                      <span>Abrir Email en Ventana Emergente</span>
                    </button>
                  </div>
                </div>

                {/* Preview clickeable del Asunto */}
                <div 
                  onClick={handleOpenEmailModal}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '0.9rem 1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                    <span style={{ 
                      background: '#0f172a', 
                      color: '#ffffff', 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '5px', 
                      fontSize: '0.75rem', 
                      fontWeight: 900,
                      whiteSpace: 'nowrap'
                    }}>
                      {currentScene.bossEmail.priority}
                    </span>
                    <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {currentScene.bossEmail.subject}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.86rem', color: '#0284c7', fontWeight: 900, whiteSpace: 'nowrap' }}>
                    Leer correo completo →
                  </span>
                </div>
              </section>
            )}

            {/* CHECKLIST DE RÚBRICA IOC (NO OLVIDES MOSTRAR EN EL VÍDEO) */}
            <section style={{
              background: '#fffbeb',
              border: '2px solid #f59e0b',
              borderRadius: '16px',
              padding: '1.6rem 2rem',
              boxShadow: '0 4px 18px rgba(245, 158, 11, 0.1)'
            }}>
              <div style={{ 
                fontSize: '0.95rem', 
                textTransform: 'uppercase', 
                fontWeight: 900, 
                color: '#b45309', 
                letterSpacing: '0.6px', 
                marginBottom: '1.1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ fontSize: '1.2rem' }}>📋</span>
                <span>Criterios de Rúbrica IOC (Marca mientras grabas tu clip):</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {currentScene.rubricChecklist.map((item, idx) => {
                  const itemKey = `${currentScene.id}_${idx}`;
                  const isChecked = Boolean(checkedItems[itemKey]);

                  return (
                    <label 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.9rem',
                        cursor: 'pointer',
                        padding: '0.75rem 1.1rem',
                        borderRadius: '10px',
                        background: isChecked ? '#dcfce7' : '#ffffff',
                        border: isChecked ? '2px solid #16a34a' : '2px solid #e2e8f0',
                        color: isChecked ? '#14532d' : '#0f172a',
                        fontSize: '1rem',
                        fontWeight: isChecked ? 700 : 800,
                        textDecoration: isChecked ? 'line-through' : 'none',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                      }}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleCheck(itemKey)}
                        style={{
                          width: '22px',
                          height: '22px',
                          accentColor: '#16a34a',
                          cursor: 'pointer'
                        }}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* TELEPROMPTER: GUION DE LOCUCIÓN ("QUÉ DECIR") - MÁXIMO CONTRASTE CLARO */}
            <section style={{
              background: '#f0f9ff',
              border: '2px solid #bae6fd',
              borderLeft: '7px solid #0284c7',
              borderRadius: '16px',
              padding: '2rem 2.2rem',
              boxShadow: '0 6px 25px rgba(2, 132, 199, 0.12)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', borderBottom: '2px solid #e0f2fe', paddingBottom: '0.8rem' }}>
                <div style={{ 
                  fontSize: '0.98rem', 
                  textTransform: 'uppercase', 
                  fontWeight: 900, 
                  color: '#0369a1', 
                  letterSpacing: '0.8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}>
                  <span style={{ fontSize: '1.3rem' }}>🎙️</span>
                  <span>Guion de Locución · Teleprompter (Qué decir en el vídeo)</span>
                </div>

                <span style={{ 
                  fontSize: '0.82rem', 
                  background: '#0284c7', 
                  color: '#ffffff', 
                  padding: '0.25rem 0.7rem', 
                  borderRadius: '6px',
                  fontWeight: 900
                }}>
                  Explicación Conceptual
                </span>
              </div>
              
              <div style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.85',
                color: '#0f172a',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                whiteSpace: 'pre-line',
                fontWeight: 600,
                letterSpacing: '0.2px'
              }}>
                {currentScene.scriptText}
              </div>
            </section>

            {/* LIVE RUNNER: COMANDOS COMENTADOS EN 1-CLIC */}
            <section style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              borderRadius: '16px',
              padding: '2rem 2.2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{ 
                fontSize: '0.98rem', 
                textTransform: 'uppercase', 
                fontWeight: 900, 
                color: '#0f172a', 
                letterSpacing: '0.6px', 
                marginBottom: '1.3rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <span>Comandos de Terminal Comentados (Copia en 1 clic y pega en Ubuntu):</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {currentScene.commands.map((c, cIdx) => {
                  const btnId = `${currentScene.id}_cmd_${cIdx}`;
                  const isCopied = copiedCmd === btnId;

                  return (
                    <div 
                      key={cIdx}
                      style={{
                        background: '#ffffff',
                        border: '2px solid #cbd5e1',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      {/* Barra de cabecera del paso */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '0.85rem 1.4rem', 
                        background: '#f8fafc', 
                        borderBottom: '2px solid #e2e8f0',
                        flexWrap: 'wrap',
                        gap: '0.8rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span style={{ 
                            background: '#0f172a', 
                            color: '#ffffff', 
                            padding: '0.3rem 0.8rem', 
                            borderRadius: '7px', 
                            fontSize: '0.85rem', 
                            fontWeight: 900,
                            letterSpacing: '0.5px'
                          }}>
                            PASO {c.stepNumber || cIdx + 1}
                          </span>
                          <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a' }}>
                            {c.label}
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => handleCopy(c.cmd, btnId)}
                          style={{
                            background: isCopied ? '#16a34a' : '#0f172a',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '7px',
                            padding: '0.5rem 1.1rem',
                            fontSize: '0.88rem',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: isCopied ? '0 3px 10px rgba(22, 163, 74, 0.4)' : '0 2px 5px rgba(0,0,0,0.12)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span>{isCopied ? '✓' : '📋'}</span>
                          <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                      
                      {/* Bloque de código con alto contraste */}
                      <div style={{ padding: '1.1rem 1.4rem', overflowX: 'auto', background: '#0f172a' }}>
                        <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '1.05rem', color: '#38bdf8', fontWeight: 700 }}>
                          {c.cmd}
                        </code>
                      </div>

                      {/* Bloque explicativo enriquecido y justificación pedagógica */}
                      <div style={{ 
                        padding: '1.2rem 1.4rem', 
                        background: '#f8fafc', 
                        borderTop: '2px solid #e2e8f0', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.85rem' 
                      }}>
                        {/* 1. Qué hace el comando (Sintaxis y flags) */}
                        <div style={{ 
                          background: '#ffffff', 
                          border: '1px solid #cbd5e1', 
                          borderLeft: '5px solid #0284c7', 
                          borderRadius: '8px', 
                          padding: '0.85rem 1.1rem',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }}>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            fontWeight: 900, 
                            color: '#0369a1', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.5px', 
                            marginBottom: '0.35rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.45rem' 
                          }}>
                            <span>⚙️</span>
                            <span>Explicación del Comando (Sintaxis y Parámetros):</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.94rem', color: '#1e293b', lineHeight: '1.55', fontWeight: 600 }}>
                            {c.whatItDoes || c.note}
                          </p>
                        </div>

                        {/* 2. Por qué se usa en el ejercicio (Rol y Contexto de EverOffice Supplies) */}
                        {(c.businessContext || c.whyItsUsed) && (
                          <div style={{ 
                            background: '#f0fdf4', 
                            border: '1px solid #bbf7d0', 
                            borderLeft: '5px solid #16a34a', 
                            borderRadius: '8px', 
                            padding: '0.85rem 1.1rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                          }}>
                            <div style={{ 
                              fontSize: '0.8rem', 
                              fontWeight: 900, 
                              color: '#15803d', 
                              textTransform: 'uppercase', 
                              letterSpacing: '0.5px', 
                              marginBottom: '0.35rem', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.45rem' 
                            }}>
                              <span>🏢</span>
                              <span>Misión & Contexto de Rol (EverOffice Supplies):</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.94rem', color: '#14532d', lineHeight: '1.6', fontWeight: 600, fontStyle: 'italic' }}>
                              {c.businessContext || c.whyItsUsed}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ARCHIVOS DE CONFIGURACIÓN COMPLETOS (SI TIENE LA ESCENA) */}
            {currentScene.configFiles && currentScene.configFiles.length > 0 && (
              <section style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '16px',
                padding: '2rem 2.2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <div style={{ 
                  fontSize: '0.98rem', 
                  textTransform: 'uppercase', 
                  fontWeight: 900, 
                  color: '#0f172a', 
                  letterSpacing: '0.6px', 
                  marginBottom: '1.2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📄</span>
                  <span>Ficheros de Configuración Listos para Pegar:</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {currentScene.configFiles.map((f, fIdx) => {
                    const fileBtnId = `${currentScene.id}_file_${fIdx}`;
                    const isFileCopied = copiedCmd === fileBtnId;

                    return (
                      <div 
                        key={fIdx}
                        style={{
                          background: '#0f172a',
                          border: '2px solid #334155',
                          borderRadius: '12px',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '0.75rem 1.2rem', 
                          background: '#1e293b', 
                          borderBottom: '2px solid #334155' 
                        }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: '#fbbf24', fontWeight: 900 }}>
                            {f.filename}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => handleCopy(f.content, fileBtnId)}
                            style={{
                              background: isFileCopied ? '#16a34a' : '#334155',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '7px',
                              padding: '0.45rem 1rem',
                              fontSize: '0.84rem',
                              fontWeight: 900,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              boxShadow: isFileCopied ? '0 3px 10px rgba(22,163,74,0.4)' : 'none'
                            }}
                          >
                            <span>{isFileCopied ? '✓' : '📋'}</span>
                            <span>{isFileCopied ? '¡Fichero Copiado!' : 'Copiar Todo'}</span>
                          </button>
                        </div>
                        
                        <pre style={{ margin: 0, padding: '1.3rem', overflowX: 'auto', fontSize: '0.92rem', color: '#f8fafc', lineHeight: '1.55', fontFamily: 'monospace', background: '#0f172a' }}>
                          {f.content}
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* BARRA DE NAVEGACIÓN INFERIOR (ANTERIOR / SIGUIENTE ESCENA) */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '3px solid #cbd5e1'
            }}>
              <button
                type="button"
                onClick={handlePrevTab}
                disabled={currentSceneIndex === 0}
                style={{
                  background: currentSceneIndex === 0 ? '#e2e8f0' : '#ffffff',
                  color: currentSceneIndex === 0 ? '#94a3b8' : '#0f172a',
                  border: '2px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '0.85rem 1.6rem',
                  fontSize: '1rem',
                  fontWeight: 900,
                  cursor: currentSceneIndex === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: currentSceneIndex === 0 ? 'none' : '0 2px 6px rgba(0,0,0,0.05)'
                }}
              >
                ← Escena Anterior
              </button>

              <div style={{ fontSize: '1rem', color: '#475569', fontWeight: 800 }}>
                Escena {currentScene.number} de {SCENES_DATA.length}
              </div>

              <button
                type="button"
                onClick={handleNextTab}
                style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.85rem 1.8rem',
                  fontSize: '1rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(22, 163, 74, 0.4)'
                }}
              >
                <span>{currentSceneIndex === SCENES_DATA.length - 1 ? 'Ir a Plan B 🚨' : 'Siguiente Escena →'}</span>
              </button>
            </div>

          </div>
        )}

        {/* VISTA PESTAÑA: PLAN B / TROUBLESHOOTING EN DIRECTO */}
        {activeTab === 'plan-b' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
            
            <div style={{
              background: '#fef2f2',
              border: '2px solid #ef4444',
              borderRadius: '16px',
              padding: '2rem 2.2rem',
              boxShadow: '0 6px 25px rgba(239, 68, 68, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem' }}>
                <span style={{ background: '#dc2626', color: '#fff', padding: '0.25rem 0.7rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 900 }}>
                  EMERGENCIA EN VIVO
                </span>
                <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#991b1b' }}>
                  🚨 Plan B / Troubleshooting en Vivo
                </h2>
              </div>
              <p style={{ margin: 0, fontSize: '1.02rem', color: '#7f1d1d', fontWeight: 600 }}>
                Si algún servicio falla mientras estás grabando el videotutorial, ejecuta estos comandos rápidos de diagnóstico para solucionarlo en segundos sin necesidad de reiniciar la máquina:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.6rem' }}>
              
              {/* Tarjeta 1: Apache */}
              <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.6rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>❌</span>
                  <span>Apache no arranca o falla sintaxis:</span>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.9rem' }}>
                  <code style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 800 }}>
                    sudo apache2ctl configtest
                  </code>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.8rem 0 0', lineHeight: '1.5', fontWeight: 600 }}>
                  Te dirá en qué línea exacta del fichero <code>.conf</code> hay una directiva mal escrita o una etiqueta de cierre ausente.
                </p>
              </div>

              {/* Tarjeta 2: ProFTPD */}
              <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.6rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>❌</span>
                  <span>ProFTPD falla al reiniciar:</span>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.9rem' }}>
                  <code style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 800 }}>
                    sudo proftpd -t -d10
                  </code>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.8rem 0 0', lineHeight: '1.5', fontWeight: 600 }}>
                  Modo test de sintaxis con nivel de depuración 10 para identificar qué directiva de <code>proftpd.conf</code> o <code>tls.conf</code> está impidiendo el arranque.
                </p>
              </div>

              {/* Tarjeta 3: FileZilla / Firewall */}
              <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.6rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>❌</span>
                  <span>FileZilla no conecta o da timeout:</span>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.9rem' }}>
                  <code style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 800 }}>
                    sudo ufw allow 21/tcp && sudo ufw reload
                  </code>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.8rem 0 0', lineHeight: '1.5', fontWeight: 600 }}>
                  Abre el puerto 21 TCP en el cortafuegos UFW de Ubuntu para asegurar que no se bloquean las conexiones entrantes desde tu Mac.
                </p>
              </div>

              {/* Tarjeta 4: Permisos de FTP */}
              <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '14px', padding: '1.6rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>❌</span>
                  <span>Permiso denegado en carpetas FTP:</span>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.9rem' }}>
                  <code style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 800 }}>
                    sudo chown -R ftp:ftp /everofficesupplies
                  </code>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.8rem 0 0', lineHeight: '1.5', fontWeight: 600 }}>
                  Restaura la propiedad de la raíz de EverOffice Supplies al usuario y grupo del sistema <code>ftp</code>.
                </p>
              </div>

            </div>

            {/* Botón para volver a la Escena 1 */}
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('escena-1'); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.9rem 2.2rem',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(22, 163, 74, 0.4)'
                }}
              >
                ← Volver a la Escena 1 (Comienzo del Vídeo)
              </button>
            </div>

          </div>
        )}

      </div>

      {/* 4. MODAL EMERGENTE: CLIENTE DE CORREO WEBMAIL EVEROFFICE SUPPLIES */}
      {isEmailModalOpen && currentScene && currentScene.bossEmail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.72)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.2rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            maxWidth: '720px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            border: '2px solid #cbd5e1',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Cabecera de la Ventana de Correo */}
            <div style={{
              background: '#0f172a',
              color: '#ffffff',
              padding: '1rem 1.6rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.3rem' }}>✉️</span>
                <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '0.5px' }}>
                  EverOffice Mail · Comunicaciones Internas
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseEmailModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  lineHeight: '1'
                }}
              >
                ✕
              </button>
            </div>

            {/* Metadatos del Mensaje */}
            <div style={{ padding: '1.6rem 2rem', borderBottom: '2px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#0284c7',
                    color: '#ffffff',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 10px rgba(2, 132, 199, 0.3)'
                  }}>
                    {currentScene.bossEmail.fromName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#0f172a' }}>
                      {currentScene.bossEmail.fromName}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 600 }}>
                      {currentScene.bossEmail.fromRole} · <span style={{ color: '#0284c7' }}>&lt;{currentScene.bossEmail.fromEmail}&gt;</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    display: 'inline-block',
                    marginBottom: '0.3rem'
                  }}>
                    {currentScene.bossEmail.priority}
                  </span>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>
                    {currentScene.bossEmail.date}
                  </div>
                </div>
              </div>

              {/* Destinatario: Blanca */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.8rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 700 }}>
                  <strong style={{ color: '#0f172a' }}>Para:</strong> Blanca &lt;blanca.sysadmin@everofficesupplies.cat&gt;
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginTop: '0.4rem', lineHeight: '1.3' }}>
                  Asunto: {currentScene.bossEmail.subject}
                </div>
              </div>
            </div>

            {/* Cuerpo del Correo */}
            <div style={{ padding: '2rem', overflowY: 'auto', background: '#ffffff', lineHeight: '1.8', fontSize: '1.02rem', color: '#1e293b', whiteSpace: 'pre-line', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 500 }}>
              {currentScene.bossEmail.body}
            </div>

            {/* Pie con botón de cierre / confirmación */}
            <div style={{
              padding: '1.2rem 2rem',
              background: '#f8fafc',
              borderTop: '2px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>
                EverOffice Supplies Corp. · Sistema de Mensajería Interna
              </span>
              <button
                type="button"
                onClick={handleCloseEmailModal}
                style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem 1.8rem',
                  fontSize: '0.98rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>✓</span>
                <span>¡Entendido, manos a la obra!</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TOAST NOTIFICACIÓN POP-UP FLOTANTE (PARA SIMULAR EN DIRECTO EN EL VÍDEO) */}
      {emailToast && (
        <aside style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          maxWidth: '420px',
          width: '92%',
          background: '#ffffff',
          border: '2px solid #0284c7',
          borderRadius: '16px',
          padding: '1.2rem 1.4rem',
          boxShadow: '0 12px 35px rgba(2, 132, 199, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📬</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                EverOffice Webmail · Nuevo Mensaje
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEmailToast(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.2rem',
                fontWeight: 900,
                cursor: 'pointer',
                lineHeight: '1'
              }}
            >
              ✕
            </button>
          </div>

          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>
              De: {emailToast.fromName} ({emailToast.fromRole})
            </div>
            <div style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 700, marginTop: '0.2rem', lineHeight: '1.35' }}>
              Para: Blanca · Asunto: {emailToast.subject}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.2rem' }}>
            <button
              type="button"
              onClick={() => setEmailToast(null)}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '7px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Descartar
            </button>
            <button
              type="button"
              onClick={handleOpenEmailModal}
              style={{
                background: '#0284c7',
                border: 'none',
                borderRadius: '7px',
                padding: '0.4rem 1rem',
                fontSize: '0.84rem',
                fontWeight: 900,
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.4)'
              }}
            >
              Leer Email Completo →
            </button>
          </div>
        </aside>
      )}

    </div>
  );
}
