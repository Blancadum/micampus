# Plan de Desarrollo: Sistema Integrado de Entregas, To-Do y Calendarios (ICS)

Este documento detalla la hoja de ruta para implementar la gestión interactiva de EACs, subida de archivos, lista de tareas cruzada y sincronización de calendarios, según los requerimientos.

## Reto Técnico Principal
Actualmente, la SPA lee datos estáticos (`.json`). Para poder "marcar como entregado", guardar archivos y regenerar un archivo `.ics` (Calendario) en tiempo real, **necesitamos un pequeño backend o motor local**. 

## Fase 1: Arquitectura de Persistencia y Archivos
1. **Directorios de Seguridad**: Crearemos la estructura de carpetas local para salvaguardar las entregas:
   - `/backend/uploads/ioc/ent`
   - `/backend/uploads/ioc/des` (etc.)
2. **Micro-Backend Local**: Desarrollaremos un servidor ligero (Node.js/Express o Python Flask) que se ejecutará en segundo plano. Sus funciones serán:
   - **Endpoint POST `/upload`**: Recibe el archivo de la EAC y lo guarda en la carpeta correspondiente.
   - **Endpoint PUT `/eac/status`**: Modifica los `.json` de las asignaturas (ej. `ent.json`) para cambiar el estado de `pending` a `done`.
   - **Motor ICS**: Cada vez que un estado cambie, este backend sobreescribirá instantáneamente los archivos `.ics`.

## Fase 2: UI en la Landing de Asignatura (`SubjectLanding.jsx`)
1. **Botón de Subida**: Integrar un *input* de archivo oculto tras un botón estilizado "☁️ Guardar Copia Segura".
2. **Botón "Entregado"**: Un botón de acción que al pulsarlo:
   - Cambie visualmente la tarjeta de la EAC al instante (color verde).
   - Envíe la orden al backend para persistir el cambio en el JSON.
3. **Bloqueo Inteligente**: Si se marca como entregado, se deshabilita el botón de subida (o se cambia por uno de "Ver entrega").

## Fase 3: Widget To-Do Global (El "Chivato" Visual)
1. **Creación de `GlobalToDo.jsx`**: Un componente flotante o integrado en la Home.
2. **Diseño Curioso**:
   - Tareas `pending`: Cuadrado blanco/vacío, texto normal.
   - Tareas `done`: Animación de *check* o cruz, texto tachado (`text-decoration: line-through`), opacidad reducida.
3. **Agregación**: Este componente leerá todos los JSON de las asignaturas y mezclará todas las EACs ordenadas por fecha de entrega.

## Fase 4: Sincronización y Motor de Calendario
1. **Generador Dinámico de ICS**: El backend tendrá una plantilla para archivos `.ics`.
2. **Lógica de Tachado/Borrado**:
   - Si una EAC está `pending` -> Se añade al `.ics` con alarma/notificación (`VALARM`).
   - Si se marca `done` -> El evento **se elimina del `.ics`** (o se le quita la alarma). Al sincronizar, el calendario del usuario (Apple Calendar, Google, Outlook) detectará la ausencia y borrará el evento, silenciando notificaciones.
3. **Multicalendario**: Podemos generar `ioc-ent.ics`, `ioc-des.ics` (cada uno con un color en tu app de calendario local) o un macro-calendario `HUB_PERSONALIZADO.ics`.
4. **El botón "📅 Sincroniza"**: Al pulsarlo, el usuario se suscribirá mediante protocolo `webcal://` o descargará el ZIP con los `.ics` actualizados al segundo.

## Siguientes Pasos
Si estás de acuerdo con esta hoja de ruta, el **primer paso de ejecución** será montar ese pequeñísimo servidor local (Fase 1) para que los botones que hagamos en React (Fase 2) tengan cerebro y memoria real y no se borren al refrescar la página. ¿Comenzamos por ahí?
