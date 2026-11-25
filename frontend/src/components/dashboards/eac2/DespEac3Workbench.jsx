import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePersistentState } from '../../../hooks/usePersistentState';
import './DespEac2Workbench.css';

/**
 * ============================================================================
 * @component   DespEac3Workbench
 * @description Guía Directa Paso a Paso para la EAC 3 de Despliegue (DAW 0614).
 *              Fiel al enunciado oficial DAW_0614_EAC3_Enunciat_2627S1.pdf
 *              (Partes 0 a 6, subapartados a) hasta ba)).
 * ============================================================================
 */

export const getEac3Parts = () => [
  {
    id: 'part-0',
    number: 'Parte 0',
    shortLabel: '⚙️ Parte 0 · Red Host-only',
    title: 'Laboratorio inicial y red Host-only (192.168.20.0/24)',
    score: '0 puntos',
    deliveryType: '📸 1 captura (a: ping al Host)',
    desc: 'Prepara la red Host-only (192.168.20.1/24 sin DHCP) y la MV Ubuntu Desktop 26.04 (Adaptador 1 = NAT, Adaptador 2 = Host-only con IP 192.168.20.20/24). No instales Vagrant dentro de Ubuntu Desktop.',
    tasks: [
      {
        id: 'ap-0',
        code: 'Parte 0',
        letters: 'a)',
        title: 'Red Host-only en VirtualBox y comprobación de ping',
        score: '0 puntos',
        machine: 'client',
        machineLabel: '💻 Ubuntu Desktop (192.168.20.20)',
        desc: 'Configura la red Host-only 192.168.20.1/24 (sin DHCP) en tu Mac y asigna 192.168.20.20/24 (sin gateway ni DNS) al segundo adaptador de Ubuntu Desktop.',
        steps: [
          {
            letter: '0.3.a)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Comprobar IP Host-only y hacer ping a la máquina física (192.168.20.1)',
            cmd: 'ip -br a && ping -c 4 192.168.20.1'
          }
        ],
        deliverables: [
          '📸 Captura a): Salida correcta del ping desde Ubuntu Desktop hacia el Host (192.168.20.1).'
        ]
      }
    ]
  },
  {
    id: 'part-1',
    number: 'Parte 1',
    shortLabel: '📦 Parte 1 · Apache + Vagrant (1.5 pts)',
    title: 'Despliegue de Apache con Vagrant y carpeta sincronizada',
    score: '1.5 puntos',
    deliveryType: '📸 Capturas + 🎥 Vídeo obligatorio (h, i, j)',
    desc: 'Ejecuta Vagrant desde tu Mac físico (192.168.20.1) para levantar automáticamente la MV Ubuntu 22.04 con Apache en 192.168.20.10 y ./web sincronizada con /var/www/html.',
    tasks: [
      {
        id: 'ap-1-1',
        code: '1.1 – 1.2',
        letters: 'b–e)',
        title: 'Inicializar proyecto Vagrant, Vagrantfile y carpeta ./web',
        score: '0,75 puntos',
        machine: 'server',
        machineLabel: '🖥️ Mac Físico (Host)',
        desc: 'Comprueba vagrant --version, crea EverOfficeSupplies, ejecuta vagrant init ubuntu/jammy64, sustituye el Vagrantfile por el del enunciado (fitxers/Part 1) y crea ./web/index.html.',
        steps: [
          {
            letter: 'b-c)',
            where: 'server',
            whereBadge: '🖥️ MAC HOST',
            label: 'Verificar Vagrant e inicializar el proyecto EverOfficeSupplies',
            cmd: 'vagrant --version && mkdir -p ~/EverOfficeSupplies/web && cd ~/EverOfficeSupplies && vagrant init ubuntu/jammy64'
          },
          {
            letter: 'e)',
            where: 'server',
            whereBadge: '🖥️ MAC HOST',
            label: 'Crear index.html inicial dentro de ./web',
            cmd: 'echo "<h1>EverOfficeSupplies - Apache Vagrant</h1>" > ~/EverOfficeSupplies/web/index.html'
          }
        ],
        deliverables: [
          '📸 Captura c): Ejecución de vagrant init ubuntu/jammy64.',
          '📸 Captura e): Carpeta ./web con index.html junto al Vagrantfile del enunciado.'
        ]
      },
      {
        id: 'ap-1-3',
        code: '1.3 – 1.5',
        letters: 'f–k)',
        title: 'Validar, arrancar Vagrant, SSH y probar persistencia',
        score: '0,75 puntos',
        machine: 'server',
        machineLabel: '🖥️ Mac Host + 🌐 Navegador',
        desc: 'Valida el Vagrantfile, arranca la máquina, verifica red por SSH y demuestra en vídeo la persistencia editando web/index.html y reiniciando con vagrant halt / up.',
        steps: [
          {
            letter: 'f)',
            where: 'server',
            whereBadge: '🖥️ MAC HOST',
            label: 'Validar, levantar la MV Vagrant y comprobar estado',
            cmd: 'cd ~/EverOfficeSupplies && vagrant validate && vagrant up && vagrant status'
          },
          {
            letter: 'g)',
            where: 'server',
            whereBadge: '🖥️ VAGRANT SSH',
            label: 'Conectar por SSH y verificar IP 192.168.20.10, Apache y pings',
            cmd: 'vagrant ssh -c "ip -br addr && sudo systemctl status apache2 --no-pager && ping -c 2 192.168.20.1 && ping -c 2 192.168.20.20"'
          },
          {
            letter: 'h-k)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR + TERMINAL',
            label: 'Abrir http://192.168.20.10, editar web/index.html, hacer vagrant halt && vagrant up',
            cmd: 'vagrant halt && vagrant up'
          }
        ],
        deliverables: [
          '📸 Capturas f): vagrant validate y vagrant status.',
          '📸 Capturas g): vagrant ssh y verificación de IP 192.168.20.10 + comunicación.',
          '🎥 Vídeo obligatorio (h, i, j): Modificando web/index.html en el Host y viendo los cambios en http://192.168.20.10 sin reiniciar.'
        ],
        videoScript: {
          title: '🎬 Guion Vídeo 1 — Parte 1: Vagrant y carpeta sincronizada (h, i, j)',
          duration: '~1 min 10 s · Recuerda mostrar tu cara en la webcam y explicarlo con tu voz',
          prep: 'Objetivo: demostrar que con synced_folder "./web", "/var/www/html" editamos la web desde el Mac y el contenido persiste fuera de la MV. Ten abierto web/index.html y Chrome.',
          steps: [
            {
              step: '0. Contextualización inicial (para decir al empezar — 15 s)',
              screen: 'Tu editor con web/index.html y la terminal en ~/EverOfficeSupplies.',
              say: '«Hola, soy Blanca De Una. Estamos en la Parte 1 de la EAC 3 de Despliegue, donde hemos desplegado nuestro primer servidor web Apache utilizando Vagrant como herramienta de virtualización automatizada. En este punto la máquina virtual Ubuntu ya está arrancada en la IP privada 192.168.20.10 y lo que se espera ahora es demostrar que la carpeta sincronizada entre nuestro ordenador físico y Apache funciona en tiempo real y conserva los cambios.»'
            },
            {
              step: '1. Introducción técnica (10 s)',
              screen: 'Editor abierto con web/index.html (y Vagrantfile al lado si quieres).',
              say: '«Hola, soy Blanca De Una y en este vídeo voy a demostrar el funcionamiento de la carpeta sincronizada y la persistencia en Apache con Vagrant. Gracias a la directiva synced_folder del Vagrantfile, nuestra carpeta local ./web en el Mac está enlazada directamente con /var/www/html dentro de la máquina virtual, lo que nos permite desarrollar cómodamente desde el equipo físico.»'
            },
            {
              step: '2. Paso h — Modificar web/index.html desde el Mac (20 s)',
              screen: 'Añades o editas texto de EverOfficeSupplies en web/index.html y guardas (Cmd + S).',
              say: '«En el paso h, modifico web/index.html directamente desde mi ordenador físico sin entrar por SSH a la máquina virtual ni editar archivos dentro del servidor. Al guardar aquí, el cambio se refleja automáticamente en el directorio que sirve Apache dentro de Vagrant.»'
            },
            {
              step: '3. Paso i — Comprobar en el navegador http://192.168.20.10 (15 s)',
              screen: 'Abres o recargas http://192.168.20.10 en Chrome.',
              say: '«En el paso i, accedo desde el navegador de mi equipo físico a la IP privada Host-only 192.168.20.10 y comprobamos que Apache está sirviendo exactamente la página que acabamos de guardar.»'
            },
            {
              step: '4. Paso j — Segunda modificación en caliente (25 s)',
              screen: 'Vuelves al editor, cambias otro texto en web/index.html, guardas y recargas el navegador.',
              say: '«Para demostrar que la sincronización es en tiempo real, hago una segunda modificación en index.html, guardo y recargo el navegador. Como vemos, los cambios aparecen al instante sin tener que reiniciar Apache ni la máquina virtual Vagrant, lo que agiliza mucho el desarrollo.»'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'part-2',
    number: 'Parte 2',
    shortLabel: '🐳 Parte 2 · Apache + Docker (2.0 pts)',
    title: 'Apache en contenedor Docker con bind mount persistente',
    score: '2.0 puntos',
    deliveryType: '📸 Capturas + 🎥 Vídeo obligatorio (v, w, x, y)',
    desc: 'Dentro de Ubuntu Desktop (192.168.20.20), instala Docker y levanta un contenedor httpd:2.4 en el puerto 8080 montando ~/projecte.',
    tasks: [
      {
        id: 'ap-2-1',
        code: '2.1 – 2.2',
        letters: 'l–r)',
        title: 'Instalar Docker, probar hello-world y lanzar contenedor Apache (:8080)',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '💻 Ubuntu Desktop (192.168.20.20)',
        desc: 'Instala Docker Engine, verifica con hello-world, crea ~/projecte/index.html y lanza everofficesupplies-web en el puerto 8080.',
        steps: [
          {
            letter: 'l-n)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Comprobar Docker, ejecutar hello-world y listar contenedores',
            cmd: 'sudo docker --version && sudo docker run --rm hello-world && sudo docker ps -a'
          },
          {
            letter: 'o-p)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Crear ~/projecte/index.html y lanzar contenedor httpd:2.4',
            cmd: 'mkdir -p ~/projecte && echo "<h1>EverOfficeSupplies - Docker Port 8080</h1>" > ~/projecte/index.html && sudo docker run -d --name everofficesupplies-web -p 8080:80 -v "$HOME/projecte:/usr/local/apache2/htdocs" httpd:2.4'
          },
          {
            letter: 'q-r)',
            where: 'browser',
            whereBadge: '🌐 NAVEGADOR',
            label: 'Comprobar docker ps y abrir http://192.168.20.20:8080',
            cmd: 'sudo docker ps'
          }
        ],
        deliverables: [
          '📸 Captura n): Salida de sudo docker ps -a.',
          '📸 Capturas q–r): sudo docker ps y navegador en http://192.168.20.20:8080.'
        ]
      },
      {
        id: 'ap-2-3',
        code: '2.3 – 2.4',
        letters: 's–z)',
        title: 'Acceso interno al contenedor y prueba de persistencia',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '💻 Ubuntu Desktop',
        desc: 'Inspecciona /usr/local/apache2/htdocs y httpd.conf dentro del contenedor, luego detén, elimina y recrea el contenedor comprobando que los cambios en ~/projecte/index.html persisten.',
        steps: [
          {
            letter: 's-v)',
            where: 'client',
            whereBadge: '💻 DOCKER EXEC',
            label: 'Entrar al contenedor y revisar htdocs y httpd.conf',
            cmd: 'sudo docker exec -it everofficesupplies-web /bin/sh -c "ls -l /usr/local/apache2/htdocs && head -n 25 /usr/local/apache2/conf/httpd.conf"'
          },
          {
            letter: 'x-y)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Parar, eliminar y volver a crear el contenedor tras editar ~/projecte/index.html',
            cmd: 'sudo docker stop everofficesupplies-web && sudo docker rm everofficesupplies-web && sudo docker run -d --name everofficesupplies-web -p 8080:80 -v "$HOME/projecte:/usr/local/apache2/htdocs" httpd:2.4'
          }
        ],
        deliverables: [
          '📸 Capturas t–u): Contenido de /usr/local/apache2/htdocs y httpd.conf.',
          '🎥 Vídeo obligatorio (v, w, x, y): Saliendo del contenedor, editando ~/projecte/index.html, eliminando y recreando el contenedor y verificando http://192.168.20.20:8080.'
        ],
        videoScript: {
          title: '🎬 Guion Vídeo 2 — Parte 2: Docker Apache y persistencia con bind mount (v, w, x, y)',
          duration: '~1 min 35 s · Recuerda mostrar tu cara en la webcam y explicarlo con tu voz',
          prep: 'Objetivo: demostrar que el contenedor es efímero (se puede parar y borrar), pero con el bind mount (-v "$HOME/projecte:/usr/local/apache2/htdocs") los datos viven en Ubuntu y no se pierden.',
          steps: [
            {
              step: '0. Contextualización inicial (para decir al empezar — 15 s)',
              screen: 'Terminal dentro del contenedor (/bin/sh), editor con ~/projecte/index.html y navegador.',
              say: '«Hola, soy Blanca De Una. Estamos en la Parte 2 de la EAC 3 de Despliegue. Después de ver Vagrant en la Parte 1, ahora trabajamos con Docker dentro de Ubuntu (192.168.20.20) para levantar un segundo Apache en el puerto 8080. En este punto ya hemos inspeccionado el interior del contenedor y lo que se espera ahora es demostrar que, aunque paremos y eliminemos el contenedor, nuestra web persiste gracias al bind mount.»'
            },
            {
              step: '1. Paso v — Salir del contenedor (15 s)',
              screen: 'En la terminal dentro del contenedor (/bin/sh) escribes exit.',
              say: '«Hola, soy Blanca De Una y en este vídeo voy a demostrar la persistencia de los archivos web en Docker mediante bind mounts. En el paso v, salgo de la terminal interactiva del contenedor con exit para volver a nuestra máquina Ubuntu, ya que editaremos la web desde fuera del contenedor.»'
            },
            {
              step: '2. Paso w — Editar ~/projecte/index.html y ver cambio inmediato (25 s)',
              screen: 'Editas ~/projecte/index.html en Ubuntu, guardas y recargas http://192.168.20.20:8080 en Chrome.',
              say: '«En el paso w, modifico ~/projecte/index.html directamente en Ubuntu. Esta carpeta está montada en /usr/local/apache2/htdocs dentro del contenedor httpd:2.4. Al recargar http://192.168.20.20:8080 vemos el cambio al instante sin reiniciar Apache ni el contenedor, porque Apache lee en directo la carpeta del host.»'
            },
            {
              step: '3. Paso x — Parar y eliminar el contenedor (25 s)',
              screen: 'Ejecutas: sudo docker stop everofficesupplies-web && sudo docker rm everofficesupplies-web && ls -l ~/projecte',
              say: '«En el paso x, demostramos que los contenedores son desechables pero los datos no se pierden: detengo el contenedor con docker stop y lo elimino con docker rm. Al comprobar ~/projecte con ls -l, vemos que index.html sigue intacto en la máquina anfitriona porque está fuera del ciclo de vida del contenedor.»'
            },
            {
              step: '4. Paso y (+ z) — Recrear el contenedor y verificar persistencia (30 s)',
              screen: 'Ejecutas docker run -d --name everofficesupplies-web -p 8080:80 -v "$HOME/projecte:/usr/local/apache2/htdocs" httpd:2.4 y recargas http://192.168.20.20:8080.',
              say: '«Por último, en el paso y, vuelvo a crear un contenedor nuevo desde cero con el mismo comando docker run y el mismo volumen -v. Al recargar el navegador en el puerto 8080, comprobamos que la página conserva todas nuestras modificaciones. Con esto queda demostrada la persistencia con bind mounts en Docker.»'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'part-3',
    number: 'Parte 3',
    shortLabel: '🔐 Parte 3 · OpenLDAP Docker (2.0 pts)',
    title: 'Servidor OpenLDAP en Docker e importación de usuarios (.ldif)',
    score: '2.0 puntos',
    deliveryType: '📸 Solo capturas (Sin vídeo)',
    desc: 'Crea la red xarxa-ldap, despliega osixia/openldap:1.5.0 con volúmenes persistentes, importa estructura/usuaris/grups y asigna contraseñas a Anna y Marc.',
    tasks: [
      {
        id: 'ap-3-1',
        code: '3.1 – 3.2',
        letters: 'aa–ae)',
        title: 'Crear red xarxa-ldap y desplegar contenedor everoffice-ldap',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '💻 Ubuntu Desktop',
        desc: 'Crea la red bridge xarxa-ldap y lanza el contenedor OpenLDAP con persistencia en everoffice-ldap-data y everoffice-ldap-config.',
        steps: [
          {
            letter: 'aa-ab)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Crear red Docker y verificar',
            cmd: 'sudo docker network create xarxa-ldap && sudo docker network ls'
          },
          {
            letter: 'ac-ae)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Desplegar OpenLDAP 1.5.0 y comprobar contenedor y volúmenes',
            cmd: 'sudo docker run -d --name everoffice-ldap --network xarxa-ldap -p 389:389 -e LDAP_ORGANISATION="EverOfficeSupplies" -e LDAP_DOMAIN="everofficesupplies.cat" -e LDAP_ADMIN_PASSWORD="admin123" -v everoffice-ldap-data:/var/lib/ldap -v everoffice-ldap-config:/etc/ldap/slapd.d osixia/openldap:1.5.0 && sudo docker ps && sudo docker volume ls'
          }
        ],
        deliverables: [
          '📸 Capturas ab, ad, ae): docker network ls, docker ps y docker volume ls.'
        ]
      },
      {
        id: 'ap-3-3',
        code: '3.3 – 3.4',
        letters: 'af–am)',
        title: 'Importar .ldif en orden y asignar contraseñas a Anna y Marc',
        score: '1,00 punto',
        machine: 'client',
        machineLabel: '💻 Ubuntu Desktop',
        desc: 'Copia los 3 .ldif de fitxers/Part 3/ a ~/ldap, pásalos al contenedor, impórtalos en orden (estructura → usuaris → grups), asigna claves con ldappasswd y verifica Anna con ldapwhoami.',
        steps: [
          {
            letter: 'ag)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Copiar los 3 archivos .ldif al interior del contenedor',
            cmd: 'cd ~/ldap && sudo docker cp estructura.ldif everoffice-ldap:/tmp/ && sudo docker cp usuaris.ldif everoffice-ldap:/tmp/ && sudo docker cp grups.ldif everoffice-ldap:/tmp/'
          },
          {
            letter: 'ah-aj)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Importar en orden exacto (admin123): estructura -> usuaris -> grups',
            cmd: 'sudo docker exec -it everoffice-ldap ldapadd -x -D "cn=admin,dc=everofficesupplies,dc=cat" -W -f /tmp/estructura.ldif && sudo docker exec -it everoffice-ldap ldapadd -x -D "cn=admin,dc=everofficesupplies,dc=cat" -W -f /tmp/usuaris.ldif && sudo docker exec -it everoffice-ldap ldapadd -x -D "cn=admin,dc=everofficesupplies,dc=cat" -W -f /tmp/grups.ldif'
          },
          {
            letter: 'ak-am)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Asignar contraseñas a Anna y Marc y probar ldapwhoami de Anna',
            cmd: 'sudo docker exec -it everoffice-ldap ldappasswd -x -H ldap://localhost -D "cn=admin,dc=everofficesupplies,dc=cat" -W -S "uid=anna,ou=usuaris,dc=everofficesupplies,dc=cat" && sudo docker exec -it everoffice-ldap ldappasswd -x -H ldap://localhost -D "cn=admin,dc=everofficesupplies,dc=cat" -W -S "uid=marc,ou=usuaris,dc=everofficesupplies,dc=cat" && sudo docker exec -it everoffice-ldap ldapwhoami -x -H ldap://localhost -D "uid=anna,ou=usuaris,dc=everofficesupplies,dc=cat" -W'
          }
        ],
        deliverables: [
          '📸 Capturas ah, ai, aj): Importación correcta de los 3 .ldif.',
          '📸 Captura am): Salida de ldapwhoami autenticando a Anna.'
        ]
      }
    ]
  },
  {
    id: 'part-4',
    number: 'Parte 4',
    shortLabel: '🌐 Parte 4 · phpLDAPadmin + Auth (1.5 pts)',
    title: 'phpLDAPadmin en Docker (:8081) y Autenticación LDAP en Apache Vagrant',
    score: '1.5 puntos',
    deliveryType: '📸 Solo capturas (Sin vídeo)',
    desc: 'Despliega phpLDAPadmin en el puerto 8081 y configura Apache en la MV Vagrant (192.168.20.10) para proteger /privat/ contra OpenLDAP.',
    tasks: [
      {
        id: 'ap-4-1',
        code: '4.1 – 4.2',
        letters: 'an–ap)',
        title: 'phpLDAPadmin (:8081) y /privat/ en Apache con Auth LDAP',
        score: '1,50 puntos',
        machine: 'client-server',
        machineLabel: '💻 Ubuntu Desktop + 🖥️ Vagrant SSH',
        desc: 'Lanza osixia/phpldapadmin:0.9.0, visualiza un usuario en http://192.168.20.20:8081, y configura mod_authnz_ldap en el Apache de Vagrant.',
        steps: [
          {
            letter: 'an-ao)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Lanzar phpLDAPadmin en el puerto 8081 y verificar los 3 contenedores',
            cmd: 'sudo docker run -d --name everoffice-phpldapadmin --network xarxa-ldap -p 8081:80 -e PHPLDAPADMIN_LDAP_HOSTS=everoffice-ldap -e PHPLDAPADMIN_HTTPS=false osixia/phpldapadmin:0.9.0 && sudo docker ps'
          },
          {
            letter: '4.2.1-3)',
            where: 'server',
            whereBadge: '🖥️ VAGRANT SSH',
            label: 'Activar módulos LDAP en Apache (Vagrant) y crear /var/www/html/privat',
            cmd: 'sudo a2enmod ldap authnz_ldap && sudo mkdir -p /var/www/html/privat && echo "<h1>Zona privada d\'EverOfficeSupplies</h1>" | sudo tee /var/www/html/privat/index.html'
          },
          {
            letter: '4.2.4-5)',
            where: 'server',
            whereBadge: '🖥️ VAGRANT SSH',
            label: 'Crear /etc/apache2/conf-available/ldap.conf, activar y reiniciar Apache',
            cmd: 'sudo tee /etc/apache2/conf-available/ldap.conf > /dev/null <<\'EOF\'\n<Directory /var/www/html/privat>\n    AuthType Basic\n    AuthName "Zona privada EverOfficeSupplies"\n    AuthBasicProvider ldap\n    AuthLDAPURL "ldap://192.168.20.20:389/ou=usuaris,dc=everofficesupplies,dc=cat?uid?sub"\n    Require valid-user\n</Directory>\nEOF\nsudo a2enconf ldap && sudo apache2ctl configtest && sudo systemctl restart apache2'
          }
        ],
        deliverables: [
          '📸 Captura ap): Sesión iniciada en http://192.168.20.20:8081 mostrando un usuario.',
          '📸 Captura 4.2: Acceso autenticado con Anna a http://192.168.20.10/privat/.'
        ]
      }
    ]
  },
  {
    id: 'part-5',
    number: 'Parte 5',
    shortLabel: '🌍 Parte 5 · DNS BIND9 (2.0 pts)',
    title: 'Servidor DNS BIND9 para everofficesupplies.cat (Directa e Inversa)',
    score: '2.0 puntos',
    deliveryType: '📸 Solo capturas (Sin vídeo)',
    desc: 'Instala BIND9 directamente en Ubuntu Desktop (192.168.20.20), configura named.conf.options, zona directa (www -> .10; docker, ldap, dns -> .20) y zona inversa.',
    tasks: [
      {
        id: 'ap-5-1',
        code: '5.1 – 5.2',
        letters: 'aq–az)',
        title: 'Instalar BIND9, configurar opciones, zonas y probar por dominio',
        score: '2,00 puntos',
        machine: 'client',
        machineLabel: '💻 Ubuntu Desktop (192.168.20.20)',
        desc: 'Instala bind9, escucha en 192.168.20.20, valida con named-checkconf / named-checkzone, pon 192.168.20.20 como DNS primario y accede por http://docker.everofficesupplies.cat:8080.',
        steps: [
          {
            letter: 'aq)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Instalar BIND9 y comprobar puerto 53',
            cmd: 'sudo apt update && sudo apt install -y bind9 bind9utils dnsutils && sudo systemctl status named --no-pager && sudo ss -tulnp | grep :53'
          },
          {
            letter: 'as-aw)',
            where: 'client',
            whereBadge: '💻 UBUNTU DESKTOP',
            label: 'Validar configuración y zona directa tras editar named.conf y db.everofficesupplies.cat',
            cmd: 'sudo named-checkconf && sudo named-checkzone everofficesupplies.cat /etc/bind/db.everofficesupplies.cat && sudo systemctl restart named'
          }
        ],
        deliverables: [
          '📸 Capturas aq, ar): BIND9 activo en puerto 53 y named.conf.options.',
          '📸 Capturas au, aw, ay, az): Zonas directa/inversa, named-checkzone, DNS primario configurado y acceso web por dominio.'
        ]
      }
    ]
  },
  {
    id: 'part-6',
    number: 'Parte 6',
    shortLabel: '📚 Parte 6 · JavaDoc (1.0 pt)',
    title: 'Documentación de ComandesServlet.java con JavaDoc',
    score: '1.0 punto',
    deliveryType: '📸 Capturas + 🎥 Vídeo obligatorio (JavaDoc en navegador)',
    desc: 'Abre EverOfficeComandes en NetBeans/IDE, documenta ComandesServlet.java con etiquetas JavaDoc estándar, genera el HTML y graba un vídeo navegando por clases y métodos.',
    tasks: [
      {
        id: 'ap-6-1',
        code: '6.1',
        letters: 'ba)',
        title: 'Documentar ComandesServlet.java, generar JavaDoc y grabar vídeo',
        score: '1,00 punto',
        machine: 'server',
        machineLabel: '🖥️ NetBeans / IDE + 🌐 Navegador',
        desc: 'Incluye @author, @version, @param, @return, @throws, @see, {@link} y @since. Genera el JavaDoc HTML.',
        steps: [
          {
            letter: 'ba)',
            where: 'server',
            whereBadge: '🖥️ TERMINAL / IDE',
            label: 'Generar JavaDoc desde Maven (o desde NetBeans: Run > Generate Javadoc)',
            cmd: 'mvn javadoc:javadoc'
          }
        ],
        deliverables: [
          '📸 Capturas ba): Clases con los comentarios JavaDoc en el IDE.',
          '🎥 Vídeo obligatorio ba): Navegando por el JavaDoc HTML generado en el navegador (entrando a clases y métodos).'
        ],
        videoScript: {
          title: '🎬 Guion Vídeo 3 — Parte 6: Documentación JavaDoc de EverOfficeComandes',
          duration: '~1 min 10 s · Recuerda mostrar tu cara en la webcam y explicarlo con tu voz',
          prep: 'Objetivo: demostrar que has documentado ComandesServlet.java con etiquetas estándar y que el HTML generado permite consultar arquitectura, parámetros, retornos, excepciones y enlaces.',
          steps: [
            {
              step: '0. Contextualización inicial (para decir al empezar — 15 s)',
              screen: 'Portada (index.html) del JavaDoc generado abierta en el navegador.',
              say: '«Hola, soy Blanca De Una. Estamos en la Parte 6, la recta final de la EAC 3, dedicada a la documentación del código fuente. Ya hemos documentado la clase ComandesServlet.java del proyecto EverOfficeComandes usando las etiquetas estándar de JavaDoc y hemos generado el sitio web con Maven. Lo que se espera en este vídeo es navegar por la documentación HTML para verificar que las clases, métodos, parámetros, retornos y excepciones se han generado correctamente.»'
            },
            {
              step: '1. Portada (10 s)',
              screen: 'Portada (index.html) del JavaDoc generado en el navegador.',
              say: '«Hola, soy Blanca De Una y en este vídeo muestro la documentación HTML generada con JavaDoc para la aplicación web EverOfficeComandes, a partir de los comentarios añadidos en ComandesServlet.java.»'
            },
            {
              step: '2. Entrar a ComandesServlet y explicar sus metadatos (25 s)',
              screen: 'Haces clic en cat.everoffice.comandes y luego en ComandesServlet, mostrando la cabecera de la clase.',
              say: '«Accedo al paquete y entro en la clase ComandesServlet. Aquí vemos la descripción general de la clase, que explica que gestiona el catálogo y las comandas en /comandes, con enlaces directos {@link} a doGet y doPost. También se muestran @since para indicar desde qué versión existe, @version, @author y See Also (@see) con las clases base de Jakarta Servlet.»'
            },
            {
              step: '3. Navegar por el resumen y detalle de los métodos (35 s)',
              screen: 'Bajas a Method Summary y haces clic en doGet, doPost, euros y escapar para ver Method Detail.',
              say: '«Si bajamos al resumen de métodos y entramos en doGet y doPost, vemos documentada la función de cada método HTTP, sus parámetros de entrada con @param (request y response), las posibles excepciones con @throws IOException y referencias cruzadas con @see. En métodos auxiliares como euros y escapar, además de @param, vemos la etiqueta @return explicando exactamente qué devuelve cada método. Así cualquier desarrollador puede consultar la API completa desde el navegador.»'
            }
          ]
        }
      }
    ]
  }
];

export default function DespEac3Workbench() {
  const [selectedPart, setSelectedPart] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [finderToast, setFinderToast] = useState(false);

  const [completedTasks, setCompletedTasks] = usePersistentState('desp_eac3_completed_v1', {}, {
    category: 'ioc'
  });

  const toggleTask = useCallback((taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  }, [setCompletedTasks]);

  const handleCopy = useCallback((text, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  const handleOpenFinder = () => {
    fetch('/api/open-folder?path=public/eacs/desp/eac3');
    setFinderToast(true);
    setTimeout(() => setFinderToast(false), 3500);
  };

  const parts = useMemo(() => getEac3Parts(), []);

  const allTasks = useMemo(() => parts.flatMap((p) => p.tasks), [parts]);
  const completedCount = useMemo(
    () => allTasks.filter((t) => Boolean(completedTasks[t.id])).length,
    [allTasks, completedTasks]
  );
  const progressPercent = useMemo(
    () => (allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0),
    [completedCount, allTasks.length]
  );

  const visibleParts = useMemo(() => {
    if (selectedPart === 'context') return [];
    if (selectedPart === 'all') return parts;
    return parts.filter((p) => p.id === selectedPart);
  }, [parts, selectedPart]);

  return (
    <div className="eac2-workbench-root">
      <header className="eac2-header">
        <div className="eac2-header-left">
          <Link to="/ioc/despliegue" className="eac2-back-btn">
            ← Volver a DESP
          </Link>
          <span className="eac2-badge">DAW 0614 · EAC 3</span>
          <div className="eac2-header-title">
            <h1>Guía Directa EAC 3: Vagrant, Docker, OpenLDAP, BIND9 y JavaDoc</h1>
            <p>
              Archivo a entregar: <strong>DAW_0614_EAC3_DeUna_M.pdf</strong> · Fecha límite: <strong>16/12/2026 (23:55h)</strong>
            </p>
          </div>
        </div>

        <div className="eac2-header-actions">
          <a
            href="/eacs/desp/eac3/enunciado/DAW_0614_EAC3_Enunciat_2627S1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="eac2-Resource-btn"
          >
            📄 Enunciado PDF ↗
          </a>
          <a
            href="/eacs/desp/eac3/enunciado/DAW_0614_EAC3_Enunciat_2627S1.odt"
            download
            className="eac2-Resource-btn"
          >
            📝 Descargar .odt
          </a>
          <button type="button" onClick={handleOpenFinder} className="eac2-Resource-btn">
            {finderToast ? '✅ ¡Abierta en Finder!' : '📂 Carpeta Finder'}
          </button>
          <a
            href="/eacs/desp/eac3/animacion-vagrant.html"
            target="_blank"
            rel="noopener noreferrer"
            className="eac2-Resource-btn"
          >
            🎬 Animación Vagrant ↗
          </a>
          <a
            href="/eacs/desp/eac3/animacion-eac3-completa.html"
            target="_blank"
            rel="noopener noreferrer"
            className="eac2-Resource-btn"
          >
            🧭 Mapa EAC3 (0–6) ↗
          </a>
          <a
            href="/eacs/desp/eac3/animacion-evolucion-videos.html"
            target="_blank"
            rel="noopener noreferrer"
            className="eac2-Resource-btn"
          >
            ☀️ Evolución Vídeos ↗
          </a>

          <div className="eac2-progress-pill">
            <span>Progreso:</span>
            <strong>
              {completedCount}/{allTasks.length} ({progressPercent}%)
            </strong>
          </div>
        </div>
      </header>

      <div className="eac2-container">
        <section className="eac2-summary-banner">
          <div className="eac2-summary-grid">
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-neutral">Partes 0–1 · Red + Vagrant (1.5 pts)</span>
              <p>
                <strong>Host-only 192.168.20.0/24</strong> + Apache Vagrant (<code>.10</code>). Lleva <strong>🎥 Vídeo obligatorio</strong> de persistencia (<code>h, i, j</code>).
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-blue">Parte 2 · Apache Docker (2 pts)</span>
              <p>
                <strong>Contenedor <code>httpd:2.4</code></strong> en <code>192.168.20.20:8080</code> con <code>~/projecte</code>. Lleva <strong>🎥 Vídeo obligatorio</strong> (<code>v, w, x, y</code>).
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-green">Partes 3–4 · OpenLDAP + Auth (3.5 pts)</span>
              <p>
                <strong>OpenLDAP + phpLDAPadmin (:8081)</strong> en Docker + Auth LDAP en Apache Vagrant (<code>/privat/</code>). <strong>Solo capturas.</strong>
              </p>
            </div>
            <div className="eac2-summary-item">
              <span className="eac2-summary-tag tag-amber">Partes 5–6 · BIND9 + JavaDoc (3 pts)</span>
              <p>
                <strong>DNS BIND9</strong> (<code>everofficesupplies.cat</code>) + <strong>JavaDoc</strong> en <code>ComandesServlet.java</code> con <strong>🎥 Vídeo obligatorio</strong>.
              </p>
            </div>
          </div>
        </section>

        <div className="eac2-filter-tabs">
          <button
            type="button"
            className={`eac2-filter-tab ${selectedPart === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPart('all')}
          >
            📋 Todas las Partes (0–6)
          </button>
          <button
            type="button"
            className={`eac2-filter-tab ${selectedPart === 'context' ? 'active' : ''}`}
            onClick={() => setSelectedPart('context')}
          >
            📖 Contexto y Vídeos (Guía Narrativa)
          </button>
          {parts.map((part) => {
            const doneInPart = part.tasks.filter((t) => completedTasks[t.id]).length;
            return (
              <button
                key={part.id}
                type="button"
                className={`eac2-filter-tab ${selectedPart === part.id ? 'active' : ''}`}
                onClick={() => setSelectedPart(part.id)}
              >
                <span>{part.shortLabel}</span>
                <span className="eac2-filter-count">
                  {doneInPart}/{part.tasks.length}
                </span>
              </button>
            );
          })}
        </div>

        {selectedPart === 'context' && (
          <div className="eac2-part-section">
            <div className="eac2-part-banner">
              <div>
                <div className="eac2-part-banner-top">
                  <span className="eac2-part-num">Guía Narrativa</span>
                  <span className="eac2-part-score">Visión Global</span>
                  <span className="eac2-part-delivery">Qué hemos hecho, por qué y cómo explicarlo en vídeo</span>
                </div>
                <h2 className="eac2-part-heading">Contexto completo de la EAC 3 y ampliación de los 3 Vídeos</h2>
                <p className="eac2-part-sub">
                  Aquí tienes el hilo conductor de toda la práctica: cómo encajan Vagrant, Docker, OpenLDAP, phpLDAPadmin, BIND9 y JavaDoc, la justificación técnica de cada paso y los guiones ampliados para defender los vídeos con seguridad.
                </p>
              </div>
            </div>

            <div className="eac2-context-grid">
              <article className="eac2-context-card">
                <h3>🧭 1. La historia completa: ¿Qué estamos construyendo?</h3>
                <p>
                  En la <strong>EAC 1</strong> instalaste Apache manualmente sobre Ubuntu Server y en la <strong>EAC 2</strong> desplegaste una aplicación Java (<code>EverOfficeComandes</code>) en Tomcat y WildFly. En esta <strong>EAC 3</strong> damos el salto a una <strong>infraestructura profesional automatizada y conectada</strong> para la empresa ficticia <strong>EverOfficeSupplies</strong>:
                </p>
                <ul>
                  <li><strong>Automatizar despliegues:</strong> en lugar de instalar todo a mano cada vez, usamos <strong>Vagrant</strong> (máquina virtual reproducible definida en código) y <strong>Docker</strong> (contenedores ligeros e intercambiables).</li>
                  <li><strong>Centralizar usuarios y permisos:</strong> en lugar de crear cuentas locales en cada servidor, montamos un directorio <strong>OpenLDAP</strong> y hacemos que el Apache principal consulte allí quién puede entrar en su zona privada (<code>/privat/</code>).</li>
                  <li><strong>Resolver nombres internos:</strong> montamos nuestro propio servidor DNS <strong>BIND9</strong> para acceder a los servicios por dominio (<code>www.everofficesupplies.cat</code>, <code>docker.everofficesupplies.cat</code>, <code>ldap...</code>) en lugar de recordar IPs.</li>
                  <li><strong>Documentar el código:</strong> generamos la documentación técnica navegable en HTML del proyecto Java usando <strong>JavaDoc</strong>.</li>
                </ul>
              </article>

              <article className="eac2-context-card">
                <h3>⚖️ 1b. ¿Qué es Vagrant y en qué se diferencia de Docker?</h3>
                <p>
                  <strong>Vagrant</strong> es una herramienta que permite crear, configurar y gestionar <strong>máquinas virtuales completas</strong> de forma automatizada mediante un archivo de texto llamado <code>Vagrantfile</code> (Infraestructura como Código). En lugar de crear la MV clic a clic en VirtualBox o UTM e instalar Apache a mano, Vagrant levanta un sistema operativo Linux entero con su propio kernel, red e IP (<code>192.168.20.10</code>) y ejecuta el aprovisionamiento automáticamente.
                </p>
                <p>
                  <strong>Docker</strong>, en cambio, no virtualiza un ordenador completo ni arranca un sistema operativo entero: ejecuta aplicaciones en <strong>contenedores ligeros</strong> que comparten el kernel del sistema anfitrión (<code>ubuntuservers</code> en <code>192.168.20.20</code>), aislando únicamente el proceso y sus dependencias (como <code>httpd:2.4</code> o <code>openldap</code>).
                </p>
                <ul>
                  <li><strong>Peso y arranque:</strong> Vagrant levanta una MV completa (GB de disco y segundos/minutos en arrancar); Docker arranca un contenedor en menos de 1 segundo ocupando pocos MB.</li>
                  <li><strong>Aislamiento:</strong> Vagrant aísla a nivel de hardware virtual y SO completo; Docker aísla a nivel de procesos del sistema operativo.</li>
                  <li><strong>Uso en esta EAC 3:</strong> Usamos <strong>Vagrant</strong> para el servidor Apache principal (<code>.10</code>) donde configuramos módulos de sistema como <code>mod_ldap</code>; y usamos <strong>Docker</strong> dentro de <code>.20</code> para levantar rápido varios servicios independientes (Apache <code>:8080</code>, OpenLDAP <code>:389</code> y phpLDAPadmin <code>:8081</code>) sin ensuciar el servidor.</li>
                </ul>
              </article>

              <article className="eac2-context-card">
                <h3>🧱 2. Justificación narrativa paso a paso (Partes 0 a 6)</h3>
                <div className="eac2-context-steps">
                  <div className="eac2-context-step">
                    <h4>Parte 0 · Laboratorio y red privada (<code>192.168.20.0/24</code>)</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Configurar una red privada compartida entre tu Mac (<code>192.168.20.1</code>), la futura MV Vagrant (<code>.10</code>) y la MV Ubuntu (<code>.20</code>), manteniendo además salida a Internet por NAT. En Mac Apple Silicon (<code>arm64</code>) con UTM, ambas máquinas comparten la red <code>bridge100</code> con las IPs <code>192.168.20.x</code>.
                    </p>
                    <p>
                      <strong>Por qué:</strong> Si las máquinas solo tuvieran NAT aislado, no podrían hablar entre sí directamente (el Apache de Vagrant no podría preguntar al OpenLDAP de Ubuntu, ni tu navegador del Mac podría abrir las webs por IP privada).
                    </p>
                  </div>

                  <div className="eac2-context-step">
                    <h4>Parte 1 · Apache con Vagrant (<code>192.168.20.10</code>)</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Crear un <code>Vagrantfile</code> que automatiza el alta de una MV Ubuntu, le instala Apache y enlaza la carpeta local <code>./web</code> del Mac con <code>/var/www/html</code> mediante <code>config.vm.synced_folder</code>.
                    </p>
                    <p>
                      <strong>Por qué:</strong> Es el principio de <em>Infraestructura como Código</em>: si mañana borras la máquina virtual o cambias de ordenador, con un solo <code>vagrant up</code> vuelves a tener el servidor idéntico. Y gracias a la carpeta sincronizada, el código HTML vive en tu Mac, se edita cómodamente y persiste aunque destruyas la MV.
                    </p>
                  </div>

                  <div className="eac2-context-step">
                    <h4>Parte 2 · Apache con Docker y bind mount (<code>192.168.20.20:8080</code>)</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Instalar Docker Engine dentro de Ubuntu (<code>.20</code>) y lanzar un contenedor <code>httpd:2.4</code> mapeando el puerto <code>8080:80</code> y montando <code>~/projecte</code> en <code>/usr/local/apache2/htdocs</code>.
                    </p>
                    <p>
                      <strong>Por qué:</strong> A diferencia de Vagrant (que levanta un sistema operativo entero), Docker aísla solo el proceso de Apache en segundos. Como los contenedores son efímeros (al hacer <code>docker rm</code> desaparece todo lo de dentro), el <strong>bind mount</strong> (<code>-v</code>) garantiza que los HTML sigan guardados en Ubuntu y reaparezcan intactos al recrear el contenedor.
                    </p>
                  </div>

                  <div className="eac2-context-step">
                    <h4>Parte 3 · OpenLDAP en Docker (<code>:389</code>)</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Crear una red bridge propia (<code>xarxa-ldap</code>), levantar <code>osixia/openldap:1.5.0</code> con dos volúmenes persistentes (<code>everoffice-ldap-data</code> y <code>everoffice-ldap-config</code>), importar en orden <code>estructura.ldif</code> → <code>usuaris.ldif</code> → <code>grups.ldif</code>, y asignar contraseñas a Anna y Marc.
                    </p>
                    <p>
                      <strong>Por qué:</strong> LDAP organiza la empresa en árbol (unidades organizativas <code>ou=usuaris</code> y <code>ou=grups</code> bajo <code>dc=everofficesupplies,dc=cat</code>). El orden de importación es obligatorio porque no puedes crear un usuario dentro de una <code>ou</code> que aún no existe, ni meter en un grupo a un usuario que todavía no se ha dado de alta. Los volúmenes evitan perder la base de datos si el contenedor se actualiza o recrea.
                    </p>
                  </div>

                  <div className="eac2-context-step">
                    <h4>Parte 4 · phpLDAPadmin (<code>:8081</code>) + Autenticación LDAP en Apache</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Desplegar <code>osixia/phpldapadmin:0.9.0</code> en la misma red <code>xarxa-ldap</code> (donde encuentra a <code>everoffice-ldap</code> por nombre interno) y activar <code>mod_ldap</code> + <code>mod_authnz_ldap</code> en el Apache de Vagrant para proteger <code>/privat/</code>.
                    </p>
                    <p>
                      <strong>Por qué:</strong> phpLDAPadmin da una interfaz web cómoda para inspeccionar el directorio sin comandos LDIF. Y al proteger <code>/var/www/html/privat</code> con <code>AuthBasicProvider ldap</code> (apuntando a <code>ldap://192.168.20.20:389</code> con <code>AuthLDAPBindDN</code> porque OpenLDAP 1.5.0 bloquea búsquedas anónimas), demostramos autenticación centralizada real: Apache no guarda contraseñas, valida a <code>anna</code> directamente contra el directorio LDAP.
                    </p>
                  </div>

                  <div className="eac2-context-step">
                    <h4>Parte 5 · Servidor DNS con BIND9 (<code>:53</code>)</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Instalar <code>bind9</code> en Ubuntu (<code>.20</code>), restringir consultas a la red local (<code>allow-query</code>), definir la zona directa (<code>everofficesupplies.cat</code> con registros <code>A</code>) y la inversa (<code>20.168.192.in-addr.arpa</code> con registros <code>PTR</code>), validar con <code>named-checkconf</code> / <code>named-checkzone</code> y configurar Ubuntu para usar <code>192.168.20.20</code> como DNS primario.
                    </p>
                    <p>
                      <strong>Por qué:</strong> La zona directa traduce nombres humanos (<code>docker.everofficesupplies.cat</code>) a IPs (<code>.20</code>), y la inversa permite comprobar qué dominio corresponde a cada IP. Validar antes de reiniciar evita que un error de sintaxis deje sin servicio a toda la red.
                    </p>
                  </div>

                  <div className="eac2-context-step">
                    <h4>Parte 6 · Documentación con JavaDoc</h4>
                    <p>
                      <strong>Qué hemos hecho:</strong> Documentar la clase <code>ComandesServlet.java</code> y sus métodos (<code>doGet</code>, <code>doPost</code>, <code>euros</code>, <code>escapar</code>, etc.) usando las etiquetas estándar (<code>@author</code>, <code>@version</code>, <code>@param</code>, <code>@return</code>, <code>@throws</code>, <code>@see</code>, <code>{'{@link}'}</code>, <code>@since</code>) y generar el sitio HTML con <code>mvn javadoc:javadoc</code>.
                    </p>
                    <p>
                      <strong>Por qué:</strong> En proyectos reales en equipo, el código sin documentación obliga a leer toda la implementación para saber qué hace un método o qué excepción puede lanzar. JavaDoc extrae esos comentarios y genera una referencia web navegable igual que la documentación oficial de Java.
                    </p>
                  </div>
                </div>
              </article>

              <article className="eac2-context-card">
                <h3>🎥 3. Ampliación para los 3 Vídeos Obligatorios</h3>
                <p className="eac2-context-note">
                  <strong>Reglas de autoría del IOC:</strong> Debes grabar pantalla + <strong>tu voz narrando</strong> + <strong>tu cara en cámara (webcam)</strong> en todo momento (con Loom u OBS). No hace falta editar ni alargar: con <strong>1 minuto – 1 min 30 s</strong> explicando el <em>qué</em> y el <em>porqué</em> de cada paso queda de 10.
                </p>

                <div className="eac2-context-videos">
                  <div className="eac2-context-video-box">
                    <h4>🎬 Vídeo 1 · Parte 1: Vagrant y carpeta sincronizada (<code>h, i, j</code>)</h4>
                    <p><strong>🎙️ Párrafo de contextualización inicial (para decir al empezar):</strong> <em>«Hola, soy Blanca De Una. Estamos en la Parte 1 de la EAC 3 de Despliegue, donde hemos desplegado nuestro primer servidor web Apache utilizando Vagrant como herramienta de virtualización automatizada. En este punto la máquina virtual Ubuntu ya está arrancada en la IP privada 192.168.20.10 y lo que se espera ahora es demostrar que la carpeta sincronizada entre nuestro ordenador físico y Apache funciona en tiempo real y conserva los cambios.»</em></p>
                    <p><strong>Idea clave que debe quedar clara:</strong> La carpeta <code>./web</code> del Mac está sincronizada en vivo con <code>/var/www/html</code> de la MV Vagrant, por lo que editamos desde el Mac y la web se actualiza sin reiniciar nada ni perderse.</p>
                    <ul>
                      <li><strong>1. Contexto (10 s):</strong> Enseña <code>EverOfficeSupplies/web/index.html</code> en tu editor. Di: <em>«Hola, soy Blanca De Una. En este vídeo demuestro la sincronización y persistencia de Apache con Vagrant gracias a la directiva synced_folder del Vagrantfile.»</em></li>
                      <li><strong>2. Paso h (20 s):</strong> Añade o edita texto de EverOfficeSupplies en <code>web/index.html</code> y guarda (<code>Cmd + S</code>). Explica: <em>«Edito el HTML directamente desde mi Mac sin entrar por SSH al servidor; al guardar, el archivo ya está disponible dentro de la máquina virtual.»</em></li>
                      <li><strong>3. Paso i (15 s):</strong> Abre <code>http://192.168.20.10</code> en Chrome. Explica: <em>«Accedo a la IP privada Host-only 192.168.20.10 y comprobamos que Apache sirve exactamente el contenido que acabamos de guardar.»</em></li>
                      <li><strong>4. Paso j (25 s):</strong> Vuelve al editor, haz un segundo cambio, guarda y recarga Chrome. Explica: <em>«Al volver a modificar y recargar, los cambios se reflejan en tiempo real sin reiniciar Apache ni Vagrant, agilizando el desarrollo y protegiendo los archivos en el disco físico.»</em></li>
                    </ul>
                  </div>

                  <div className="eac2-context-video-box">
                    <h4>🎬 Vídeo 2 · Parte 2: Docker Apache y persistencia con bind mount (<code>v, w, x, y</code>)</h4>
                    <p><strong>🎙️ Párrafo de contextualización inicial (para decir al empezar):</strong> <em>«Hola, soy Blanca De Una. Estamos en la Parte 2 de la EAC 3 de Despliegue. Después de ver Vagrant en la Parte 1, ahora trabajamos con Docker dentro de Ubuntu (192.168.20.20) para levantar un segundo Apache en el puerto 8080. En este punto ya hemos inspeccionado el interior del contenedor y lo que se espera ahora es demostrar que, aunque paremos y eliminemos el contenedor, nuestra web persiste gracias al bind mount.»</em></p>
                    <p><strong>Idea clave que debe quedar clara:</strong> El contenedor Docker es desechable (podemos pararlo y eliminarlo), pero gracias al bind mount (<code>-v "$HOME/projecte:/usr/local/apache2/htdocs"</code>) la web vive en Ubuntu y reaparece intacta al recrear el contenedor.</p>
                    <ul>
                      <li><strong>1. Paso v (15 s):</strong> Con la terminal abierta dentro del contenedor (<code>/bin/sh</code>), escribe <code>exit</code>. Di: <em>«Hola, soy Blanca De Una. Salgo del terminal interactivo del contenedor con exit para volver a Ubuntu y gestionar los archivos desde el host.»</em></li>
                      <li><strong>2. Paso w (25 s):</strong> Edita <code>~/projecte/index.html</code> en Ubuntu, guarda y recarga <code>http://192.168.20.20:8080</code>. Explica: <em>«Modifico el HTML en ~/projecte; como está montado como bind mount en /usr/local/apache2/htdocs, Apache muestra el cambio al instante sin reiniciar el contenedor.»</em></li>
                      <li><strong>3. Paso x (25 s):</strong> Ejecuta <code>sudo docker stop everofficesupplies-web && sudo docker rm everofficesupplies-web && ls -l ~/projecte</code>. Explica: <em>«Ahora paro y elimino por completo el contenedor para demostrar que, aunque el contenedor desaparezca, index.html sigue intacto en ~/projecte.»</em></li>
                      <li><strong>4. Paso y + z (30 s):</strong> Ejecuta <code>sudo docker run -d --name everofficesupplies-web -p 8080:80 -v "$HOME/projecte:/usr/local/apache2/htdocs" httpd:2.4</code> y recarga <code>http://192.168.20.20:8080</code>. Explica: <em>«Creo un contenedor nuevo desde cero montando la misma carpeta y, al recargar el puerto 8080, comprobamos que conserva todas las modificaciones.»</em></li>
                    </ul>
                  </div>

                  <div className="eac2-context-video-box">
                    <h4>🎬 Vídeo 3 · Parte 6: JavaDoc de <code>EverOfficeComandes</code></h4>
                    <p><strong>🎙️ Párrafo de contextualización inicial (para decir al empezar):</strong> <em>«Hola, soy Blanca De Una. Estamos en la Parte 6, la recta final de la EAC 3, dedicada a la documentación del código fuente. Ya hemos documentado la clase ComandesServlet.java del proyecto EverOfficeComandes usando las etiquetas estándar de JavaDoc y hemos generado el sitio web con Maven. Lo que se espera en este vídeo es navegar por la documentación HTML para verificar que las clases, métodos, parámetros, retornos y excepciones se han generado correctamente.»</em></p>
                    <p><strong>Idea clave que debe quedar clara:</strong> Los comentarios JavaDoc añadidos en <code>ComandesServlet.java</code> generan una documentación HTML navegable que explica el propósito de la clase, parámetros, retornos, excepciones y referencias entre métodos.</p>
                    <ul>
                      <li><strong>1. Portada (10 s):</strong> Muestra <code>target/reports/apidocs/index.html</code> en el navegador. Di: <em>«Hola, soy Blanca De Una y muestro el JavaDoc HTML generado con Maven para el proyecto EverOfficeComandes.»</em></li>
                      <li><strong>2. Clase ComandesServlet (25 s):</strong> Entra en <code>cat.everoffice.comandes</code> → <code>ComandesServlet</code>. Explica: <em>«Vemos la descripción de la clase con enlaces {'{@link}'} a doGet y doPost, además de @since, @version, @author y See Also (@see) a las clases base de Jakarta Servlet.»</em></li>
                      <li><strong>3. Métodos (35 s):</strong> Baja a <em>Method Summary</em> y haz clic en <code>doGet</code>, <code>doPost</code>, <code>euros</code> y <code>escapar</code>. Explica: <em>«En doGet y doPost vemos su función, los parámetros @param (request y response), las excepciones @throws IOException y @see. En euros y escapar vemos además @return detallando exactamente qué devuelve cada método.»</em></li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}

        {visibleParts.map((part) => (
          <div key={part.id} className="eac2-part-section">
            <div className="eac2-part-banner">
              <div>
                <div className="eac2-part-banner-top">
                  <span className="eac2-part-num">{part.number}</span>
                  <span className="eac2-part-score">{part.score}</span>
                  <span className="eac2-part-delivery">{part.deliveryType}</span>
                </div>
                <h2 className="eac2-part-heading">{part.title}</h2>
                <p className="eac2-part-sub">{part.desc}</p>
              </div>
            </div>

            <div className="eac2-tasks-section">
              {part.tasks.map((task) => {
                const isDone = Boolean(completedTasks[task.id]);

                return (
                  <article
                    key={task.id}
                    className={`eac2-task-box ${isDone ? 'is-done' : ''}`}
                  >
                    <div className="eac2-task-header">
                      <div className="eac2-task-title-group">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTask(task.id)}
                          className="eac2-checkbox"
                          id={`chk-${task.id}`}
                        />
                        <span className="eac2-task-badge">{task.code}</span>
                        <span className="eac2-letters-badge">Subapartados {task.letters}</span>
                        <label
                          htmlFor={`chk-${task.id}`}
                          className={`eac2-task-title ${isDone ? 'done-text' : ''}`}
                        >
                          {task.title}
                        </label>
                      </div>

                      <div className="eac2-task-meta-right">
                        <span className="eac2-machine-indicator">{task.machineLabel}</span>
                        <span className="eac2-task-score">{task.score}</span>
                      </div>
                    </div>

                    <p className="eac2-task-desc">{task.desc}</p>

                    <div className="eac2-steps-list">
                      {task.steps.map((st, idx) => {
                        const copyKey = `${task.id}-cmd-${idx}`;
                        return (
                          <div key={idx} className="eac2-cmd-card">
                            <div className="eac2-cmd-header">
                              <div className="eac2-cmd-header-left">
                                <span className="eac2-letter-pill">{st.letter}</span>
                                <span className={`where-pill where-${st.where}`}>
                                  {st.whereBadge}
                                </span>
                                <span className="eac2-step-label">{st.label}</span>
                              </div>
                            </div>
                            <div className="eac2-cmd-body">
                              <code className="eac2-cmd-text">{st.cmd}</code>
                              <button
                                type="button"
                                className={`eac2-copy-btn ${copiedId === copyKey ? 'copied' : ''}`}
                                onClick={() => handleCopy(st.cmd, copyKey)}
                              >
                                {copiedId === copyKey ? '✓ ¡Copiado!' : '📋 Copiar'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {task.deliverables && (
                      <div className="eac2-deliverables-box">
                        <div className="eac2-deliverables-title">
                          📌 Qué debes incluir en el PDF en este apartado:
                        </div>
                        <ul className="eac2-deliverables-list">
                          {task.deliverables.map((del, dIdx) => (
                            <li key={dIdx}>{del}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {task.videoScript && (
                      <details className="eac2-video-script-box">
                        <summary className="eac2-video-script-summary">
                          <span>{task.videoScript.title}</span>
                          <span className="eac2-video-script-duration">{task.videoScript.duration}</span>
                        </summary>
                        <div className="eac2-video-script-body">
                          <p className="eac2-video-script-prep">
                            <strong>Prepara antes:</strong> {task.videoScript.prep}
                          </p>
                          <ol className="eac2-video-script-steps">
                            {task.videoScript.steps.map((vs, vIdx) => (
                              <li key={vIdx} className="eac2-video-script-step">
                                <div className="eac2-video-script-step-title">{vs.step}</div>
                                <div className="eac2-video-script-line">
                                  <strong>En pantalla:</strong> {vs.screen}
                                </div>
                                <div className="eac2-video-script-line">
                                  <strong>Qué dices:</strong> <em>{vs.say}</em>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </details>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
