import{r as s,j as e}from"./vendor-react-B1CazfeU.js";function c(){const[r,a]=s.useState(null),o=(t,i)=>{navigator.clipboard.writeText(i).then(()=>{a(t),setTimeout(()=>a(null),2200)})},n=`curl https://start.spring.io/starter.zip \\
  -d type=maven-project \\
  -d language=java \\
  -d bootVersion=3.3.0 \\
  -d baseDir=taskmanager \\
  -d groupId=com.accenture \\
  -d artifactId=taskmanager \\
  -d name=taskmanager \\
  -d packageName=com.accenture.taskmanager \\
  -d packaging=jar \\
  -d javaVersion=17 \\
  -d dependencies=web,devtools,lombok \\
  -o taskmanager.zip && unzip taskmanager.zip && cd taskmanager && ./mvnw spring-boot:run`;return e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid var(--border-subtle)",borderRadius:"20px",padding:"2rem"},children:[e.jsxs("h2",{style:{fontSize:"1.4rem",fontWeight:700,margin:"0 0 0.5rem",color:"var(--text-title)",display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{children:"⚡"})," Inicialización Instantánea por Terminal (1 Línea de Comando)"]}),e.jsxs("p",{style:{color:"var(--text-muted)",fontSize:"0.92rem",lineHeight:"1.6",margin:"0 0 1.5rem"},children:["¿Sabías que puedes generar el proyecto entero sin abrir el navegador? start.spring.io expone un API REST oficial que permite descargar y configurar tu proyecto directamente desde la terminal con ",e.jsx("code",{children:"curl"}),":"]}),e.jsxs("div",{style:{position:"relative",marginBottom:"1.5rem"},children:[e.jsx("pre",{style:{background:"#1e1e2e",padding:"1.25rem",borderRadius:"14px",color:"#a6e3a1",fontFamily:"var(--font-mono, monospace)",fontSize:"0.88rem",margin:0,overflowX:"auto",lineHeight:"1.6"},children:`# 1. Descargar el proyecto taskmanager configurado con Web, DevTools y Lombok
curl https://start.spring.io/starter.zip \\
  -d type=maven-project \\
  -d language=java \\
  -d bootVersion=3.3.0 \\
  -d baseDir=taskmanager \\
  -d groupId=com.accenture \\
  -d artifactId=taskmanager \\
  -d name=taskmanager \\
  -d packageName=com.accenture.taskmanager \\
  -d packaging=jar \\
  -d javaVersion=17 \\
  -d dependencies=web,devtools,lombok \\
  -o taskmanager.zip

# 2. Descomprimir e ingresar
unzip taskmanager.zip && cd taskmanager

# 3. Compilar y arrancar de inmediato
./mvnw spring-boot:run`}),e.jsx("button",{type:"button",onClick:()=>o("curlCmd",n),style:{position:"absolute",top:"12px",right:"12px",background:"#10b981",color:"#ffffff",border:"none",padding:"0.45rem 0.9rem",borderRadius:"8px",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",boxShadow:"0 2px 8px rgba(16, 185, 129, 0.4)"},children:r==="curlCmd"?"✓ ¡Comando copiado!":"📋 Copiar Comando"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.8rem",padding:"1rem",borderRadius:"12px",background:"rgba(16, 185, 129, 0.1)",border:"1px solid rgba(16, 185, 129, 0.25)",fontSize:"0.85rem"},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"💡"}),e.jsxs("span",{style:{color:"var(--text-main)"},children:[e.jsx("strong",{children:"Tip de Productividad:"})," Este comando es exactamente el mismo que ejecutan las pipelines de CI/CD para generar esqueletos de microservicios automatizados en producción."]})]})]})}export{c as default};
