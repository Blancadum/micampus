import{r as n,j as e}from"./vendor-react-B1CazfeU.js";import{M as N,a as R,r as C}from"./vendor-markdown-a76stugL.js";const O=[{label:"📝 ¿Qué entra en el examen?",text:"¿Qué contenidos y bloques exactos entran en el examen del 18 de noviembre?"},{label:"💡 Pregunta tipo test",text:"Ponme una pregunta tipo test del examen para practicar y dame 4 opciones (A, B, C, D)."},{label:"🔌 Rutas amigables (.htaccess)",text:"Explícame detalladamente cómo configurar el archivo .htaccess con mod_rewrite para la API de socios."},{label:"📚 Transacciones ACID con PDO",text:"¿Cómo se programa una transacción atómica con PDO en PHP con beginTransaction, commit y rollBack?"},{label:"🛡️ Seguridad XSS e Inyección SQL",text:"¿Cuál es la diferencia entre prevenir XSS con htmlspecialchars y prevenir inyecciones SQL con PDO?"},{label:"📑 Paginación con LIMIT y OFFSET",text:"¿Cómo funciona la fórmula de paginación del aula con LIMIT, OFFSET y ceil()?"}];function D({isOpen:l,onToggleOpen:t}={}){const[v,E]=n.useState(()=>{try{return sessionStorage.getItem("sepe_tutor_chat_open")==="true"}catch{return!1}}),g=l!==void 0,o=g?l:v,b=a=>{const s=typeof a=="function"?a(o):a;try{sessionStorage.setItem("sepe_tutor_chat_open",String(s))}catch{}g&&t?t(s):E(s)},[d,x]=n.useState(""),[i,f]=n.useState(!1),[c,u]=n.useState(()=>{try{const a=sessionStorage.getItem("sepe_php_tutor_chat_history");if(a)return JSON.parse(a)}catch{}return[{id:"welcome",role:"assistant",text:`¡Hola Blanca! 👋 Soy tu **Profe Tutor de PHP & SQL (MF0492_3)**.

Estoy aquí para prepararte a fondo para tu **Examen Presencial del 18 de noviembre en Rincón de la Victoria** (17:00 a 22:00).

Puedes preguntarme dudas teóricas, pedirme que te examine con preguntas tipo test, o revisar juntos el código de los proyectos (Agenda, Tamagotchi, Biblioteca PDO y API REST con \`.htaccess\`).

¿Por qué tema quieres que empecemos hoy?`}]}),y=n.useRef(null),S=n.useRef(null);n.useEffect(()=>{var a;try{sessionStorage.setItem("sepe_php_tutor_chat_history",JSON.stringify(c))}catch{}o&&((a=y.current)==null||a.scrollIntoView({behavior:"smooth"}))},[c,o]),n.useEffect(()=>{o&&setTimeout(()=>{var a;return(a=S.current)==null?void 0:a.focus()},150)},[o]);const p=async a=>{const s=(a||d).trim();if(!s||i)return;const I={id:Date.now().toString(),role:"user",text:s},P=[...c,I];u(P),x(""),f(!0);try{const m=await fetch("http://localhost:3001/api/sepe/tutor-chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:s,history:P.map(r=>({role:r.role,text:r.text}))})});if(!m.ok)throw new Error("Respuesta no válida del servidor");const h=await m.json();u(r=>[...r,{id:(Date.now()+1).toString(),role:"assistant",text:h.reply}])}catch{const h=A(s);u(r=>[...r,{id:(Date.now()+1).toString(),role:"assistant",text:h}])}finally{f(!1)}},j=a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),p())},T=()=>{sessionStorage.removeItem("sepe_php_tutor_chat_history"),u([{id:"welcome-reset",role:"assistant",text:"¡Conversación reiniciada! ¿Qué duda o tema del examen de PHP quieres que trabajemos ahora?"}])};return e.jsxs("div",{className:"tutor-chat-wrapper",children:[!o&&e.jsxs("button",{type:"button",className:"tutor-chat-launcher",onClick:()=>b(!0),title:"Abrir chat con tu Profe Tutor de PHP","aria-label":"Abrir tutor virtual",children:[e.jsx("span",{className:"tutor-chat-launcher-icon",children:"👨‍🏫"}),e.jsx("span",{children:"Profe PHP"}),e.jsx("span",{className:"tutor-chat-status-dot"})]}),o&&e.jsxs("section",{className:"tutor-chat-window","aria-label":"Ventana de chat del tutor virtual",children:[e.jsxs("header",{className:"tutor-chat-header",children:[e.jsxs("div",{className:"tutor-chat-header-info",children:[e.jsx("div",{className:"tutor-chat-avatar",children:"👨‍🏫"}),e.jsxs("div",{className:"tutor-chat-header-text",children:[e.jsx("h4",{children:"Profe Tutor PHP · SEPE"}),e.jsxs("p",{children:[e.jsx("span",{className:"tutor-chat-status-dot",style:{display:"inline-block"}}),"Examen 18 Nov · Rincón de la Victoria"]})]})]}),e.jsxs("div",{className:"tutor-chat-actions",children:[e.jsx("button",{type:"button",className:"tutor-chat-btn-icon",onClick:T,title:"Reiniciar conversación",children:"🔄"}),e.jsx("button",{type:"button",className:"tutor-chat-btn-icon",onClick:()=>b(!1),title:"Minimizar chat",children:"✕"})]})]}),e.jsxs("div",{className:"tutor-chat-messages",children:[c.map(a=>e.jsx("div",{className:`tutor-msg-bubble ${a.role==="user"?"tutor-msg-user":"tutor-msg-assistant"}`,children:e.jsx(N,{remarkPlugins:[C],rehypePlugins:[R],children:a.text})},a.id)),i&&e.jsxs("div",{className:"tutor-typing-indicator",children:[e.jsx("span",{className:"tutor-typing-dot"}),e.jsx("span",{className:"tutor-typing-dot"}),e.jsx("span",{className:"tutor-typing-dot"}),e.jsx("span",{children:"El profe está pensando tu respuesta..."})]}),c.length<=3&&!i&&e.jsxs("div",{className:"tutor-chips-container",children:[e.jsx("span",{className:"tutor-chip-title",children:"💡 Preguntas rápidas para el examen:"}),e.jsx("div",{className:"tutor-chips-list",children:O.map((a,s)=>e.jsx("button",{type:"button",className:"tutor-quick-chip",onClick:()=>p(a.text),children:a.label},s))})]}),e.jsx("div",{ref:y})]}),e.jsxs("footer",{className:"tutor-chat-footer",children:[e.jsx("input",{ref:S,type:"text",className:"tutor-chat-input",placeholder:"Pregúntale al profe sobre el examen...",value:d,onChange:a=>x(a.target.value),onKeyDown:j,disabled:i}),e.jsx("button",{type:"button",className:"tutor-chat-send-btn",onClick:()=>p(),disabled:i||!d.trim(),title:"Enviar mensaje",children:"➤"})]})]})]})}function A(l){const t=l.toLowerCase();return t.includes("examen")||t.includes("18 nov")||t.includes("rincón")||t.includes("entra")||t.includes("temario")?"### 🎯 Temario Oficial para el 18 de Noviembre (17:00 – 22:00)\n\nEl examen presencial en **Rincón de la Victoria** consta de parte teórica (test y preguntas cortas) y parte práctica en ordenador con WAMP:\n\n1. **UF1844 (Ingeniería de Software & PHP Base):**\n   - Ciclo de vida (Cascada vs Iterativo/Ágil).\n   - Diagramas de flujo ANSI/ISO y casos de uso UML (`<<include>>` y `<<extend>>`).\n   - Formularios GET y POST, sesiones con `$_SESSION`, superglobal `$_SERVER`.\n   - Seguridad XSS con `htmlspecialchars()` y control de acceso (`comprobarUsuario()`).\n   - POO: atributos `private`, constructor `__construct()`, getters/setters y clase Tamagotchi.\n\n2. **UF1845 (MySQL, Persistencia & PDO):**\n   - DDL (`CREATE TABLE`, claves primarias, `FOREIGN KEY`) y DML (`SELECT` con JOIN y GROUP BY).\n   - Conexión PDO con sentencias preparadas (`prepare()` y marcadores `:id`).\n   - **Transacciones ACID:** `beginTransaction()`, `commit()` y `rollBack()` (préstamos atómicos).\n   - **Disparadores (Triggers):** `AFTER INSERT ON prestamo` para decrementar ejemplares del libro.\n   - **Paginación:** `LIMIT`, `OFFSET = ($pag - 1) * $por_pagina` y redondeo `ceil()`.\n\n3. **UF1846 (APIs REST & Rutas Amigables):**\n   - 5 Verbos HTTP: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.\n   - Recepción de datos JSON con `file_get_contents('php://input')` y `json_decode()`.\n   - Cabecera obligatoria: `header('Content-Type: application/json; charset=utf-8')`.\n   - Códigos HTTP: `200`, `201`, `400`, `404`, `500` con `http_response_code()`.\n   - **Rutas Amigables en Apache `.htaccess`:** `RewriteRule ^socios/([0-9]+)/?$ socios.php?id=$1 [L,QSA]`.\n\n¿Quieres que te ponga una pregunta tipo test para practicar?":t.includes("test")||t.includes("pregunta")||t.includes("quiz")||t.includes("simulacro")?"### 💡 Pregunta Tipo Test de Examen Oficial\n\n**Pregunta (UF1845 - Persistencia PDO):**\nEn una aplicación de gestión bibliotecaria, un usuario tramita un préstamo. Para asegurar que el registro en la tabla `prestamo` y la disminución de stock en la tabla `libro` se ejecuten como una sola unidad indivisible ante posibles fallos, ¿qué mecanismo debe implementarse?\n\n- **A)** Un bucle `while` que reintente la inserción hasta que no devuelva error.\n- **B)** Una transacción ACID mediante `$conexion->beginTransaction()`, confirmando con `commit()` y capturando fallos con `rollBack()`.\n- **C)** Una función recursiva en PHP que verifique el stock después de 5 segundos.\n- **D)** Definir el campo `ejemplares` con la restricción `UNIQUE` en MySQL.\n\n¿Cuál es tu respuesta: **A**, **B**, **C** o **D**?":t.includes("htaccess")||t.includes("amigable")||t.includes("rewrite")?`### 🔌 Rutas Amigables (*Clean URLs*) con Apache \`.htaccess\`

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
- \`[QSA]\` (*Query String Append*): Preserva cualquier parámetro adicional en la URL.`:t.includes("transaccion")||t.includes("acid")||t.includes("commit")||t.includes("rollback")?`### 📚 Transacciones ACID con PDO en PHP

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
\`\`\``:`¡Excelente consulta, Blanca! Recuerda que para el examen del 18 de noviembre es fundamental justificar siempre el *por qué* técnico: la separación de responsabilidades en 3 capas, la prevención de vulnerabilidades (XSS e inyección SQL) y la consistencia de los datos en el servidor.

¿Quieres que hagamos un simulacro de pregunta práctica o que veamos otro ejemplo de código?`}export{D as default};
