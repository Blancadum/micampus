import{r as i,j as e}from"./vendor-react-B1CazfeU.js";import{i as w,a as k,b as v,j as S}from"./StudioIcons-BAh4vAi2.js";import{M as z,r as C}from"./vendor-markdown-a76stugL.js";function M({isOpen:d=!1,onClose:n,title:h="guia-didactica-java-studio.md",command:b="cat poo/secretaria/guia-didactica-java-studio.md",filePath:a="/java-studio/poo/secretaria/guia-didactica-java-studio.md",initialContent:c=null}){const[s,f]=i.useState(c||""),[y,m]=i.useState(!1),[p,x]=i.useState(!1),[l,g]=i.useState("glow"),[o,u]=i.useState(!1);if(i.useEffect(()=>{if(!d)return;const t=r=>{r.key==="Escape"&&n()};return window.addEventListener("keydown",t),!c&&a&&(m(!0),fetch(a).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.text()}).then(r=>{f(r),m(!1)}).catch(r=>{f(`[ERROR] No se pudo leer el archivo: ${r.message}
Ruta: ${a}`),m(!1)})),()=>{window.removeEventListener("keydown",t)}},[d,a,c,n]),!d)return null;const j=()=>{s&&navigator.clipboard.writeText(s).then(()=>{x(!0),setTimeout(()=>x(!1),2e3)}).catch(()=>{})};return e.jsxs("div",{role:"dialog","aria-modal":"true",style:{position:"fixed",inset:0,zIndex:9999,background:"rgba(10, 15, 30, 0.78)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:o?"0":"1.25rem",animation:"studioModalFadeIn 0.2s ease-out"},onClick:t=>{t.target===t.currentTarget&&n()},children:[e.jsxs("div",{style:{width:o?"100vw":"92vw",maxWidth:o?"100vw":"980px",height:o?"100vh":"88vh",background:"#0d1117",color:"#e6edf3",borderRadius:o?"0":"12px",border:"1px solid #30363d",boxShadow:"0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(110, 118, 129, 0.2)",display:"flex",flexDirection:"column",overflow:"hidden",fontFamily:"'SF Mono', 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",transition:"all 0.2s ease"},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.65rem 1rem",background:"#161b22",borderBottom:"1px solid #21262d",userSelect:"none",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.45rem"},children:[e.jsx("button",{type:"button",onClick:n,title:"Cerrar terminal (Esc)",style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56",border:"1px solid #e0443e",cursor:"pointer",padding:0}}),e.jsx("button",{type:"button",onClick:()=>u(!1),title:"Restaurar tamaño",style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e",border:"1px solid #dea123",cursor:"pointer",padding:0}}),e.jsx("button",{type:"button",onClick:()=>u(!o),title:o?"Salir de pantalla completa":"Pantalla completa",style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f",border:"1px solid #1aab29",cursor:"pointer",padding:0}})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#8b949e",display:"flex",alignItems:"center",gap:"0.45rem",fontWeight:600},children:[e.jsx(w,{size:14,style:{color:"#a78bfa"}}),e.jsx("span",{style:{color:"#c9d1d9"},children:"blanca@macbook-pro:"}),e.jsx("span",{style:{color:"#58a6ff"},children:"~/Micampus/java-studio"}),e.jsxs("span",{style:{color:"#8b949e",fontSize:"0.72rem"},children:["(",h,")"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("div",{style:{display:"inline-flex",background:"#0d1117",borderRadius:"6px",border:"1px solid #30363d",padding:"2px"},children:[e.jsx("button",{type:"button",onClick:()=>g("glow"),style:{background:l==="glow"?"#6d28d9":"transparent",color:l==="glow"?"#ffffff":"#8b949e",border:"none",borderRadius:"4px",padding:"0.2rem 0.55rem",fontSize:"0.72rem",fontWeight:700,cursor:"pointer"},title:"Visor Markdown estilo Glow / CLI",children:"glow"}),e.jsx("button",{type:"button",onClick:()=>g("cat"),style:{background:l==="cat"?"#6d28d9":"transparent",color:l==="cat"?"#ffffff":"#8b949e",border:"none",borderRadius:"4px",padding:"0.2rem 0.55rem",fontSize:"0.72rem",fontWeight:700,cursor:"pointer"},title:"Texto Raw estilo cat / less",children:"cat (raw)"})]}),e.jsxs("button",{type:"button",onClick:j,style:{background:"transparent",border:"1px solid #30363d",color:p?"#3fb950":"#c9d1d9",borderRadius:"6px",padding:"0.25rem 0.6rem",fontSize:"0.74rem",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"0.35rem"},title:"Copiar contenido de la terminal",children:[p?e.jsx(k,{size:13}):e.jsx(v,{size:13}),e.jsx("span",{children:p?"¡Copiado!":"Copiar"})]}),e.jsx("button",{type:"button",onClick:n,style:{background:"transparent",border:"none",color:"#8b949e",cursor:"pointer",display:"flex",alignItems:"center",padding:"0.2rem",borderRadius:"4px"},title:"Cerrar (Esc)",children:e.jsx(S,{size:16})})]})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"1.25rem 1.5rem",background:"#0d1117",fontSize:"0.86rem",lineHeight:1.6},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"0.45rem",marginBottom:"1.1rem",paddingBottom:"0.75rem",borderBottom:"1px dashed #21262d",fontSize:"0.84rem"},children:[e.jsx("span",{style:{color:"#3fb950",fontWeight:800},children:"blanca@macbook-pro"}),e.jsx("span",{style:{color:"#8b949e"},children:":"}),e.jsx("span",{style:{color:"#58a6ff",fontWeight:700},children:"~/Micampus/java-studio"}),e.jsx("span",{style:{color:"#a78bfa",fontWeight:800},children:"%"}),e.jsx("span",{style:{color:"#f0883e",fontWeight:700},children:b})]}),y?e.jsxs("div",{style:{padding:"2rem",textAlign:"center",color:"#8b949e"},children:[e.jsx("span",{style:{display:"inline-block",animation:"spin 1s linear infinite"},children:"⏳"})," Cargando contenido en el buffer de la terminal..."]}):l==="glow"?e.jsx("div",{className:"studio-terminal-glow",style:{color:"#c9d1d9",fontSize:"0.88rem"},children:e.jsx(z,{remarkPlugins:[C],components:{h1:({children:t})=>e.jsxs("div",{style:{margin:"1.4rem 0 0.8rem 0",paddingBottom:"0.4rem",borderBottom:"2px solid #6d28d9",color:"#a78bfa",fontSize:"1.4rem",fontWeight:800,display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{style:{color:"#3fb950"},children:"#"})," ",t]}),h2:({children:t})=>e.jsxs("div",{style:{margin:"1.25rem 0 0.6rem 0",color:"#58a6ff",fontSize:"1.15rem",fontWeight:800,display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{color:"#d29922"},children:"##"})," ",t]}),h3:({children:t})=>e.jsxs("div",{style:{margin:"1rem 0 0.4rem 0",color:"#79c0ff",fontSize:"0.98rem",fontWeight:700},children:[e.jsx("span",{style:{color:"#8b949e"},children:"###"})," ",t]}),p:({children:t})=>e.jsx("p",{style:{margin:"0 0 0.85rem 0",color:"#c9d1d9",lineHeight:1.65},children:t}),ol:({children:t})=>e.jsx("ol",{className:"term-ol",children:t}),ul:({children:t})=>e.jsx("ul",{className:"term-ul",children:t}),li:({children:t})=>e.jsx("li",{className:"term-li",children:e.jsx("div",{className:"term-li-content",children:t})}),hr:()=>e.jsx("hr",{style:{border:"none",borderTop:"1px dashed #30363d",margin:"1.25rem 0"}}),table:({children:t})=>e.jsx("div",{style:{overflowX:"auto",margin:"1rem 0"},children:e.jsx("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem",background:"#161b22",border:"1px solid #30363d",borderRadius:"6px"},children:t})}),th:({children:t})=>e.jsx("th",{style:{background:"#21262d",color:"#a78bfa",padding:"0.55rem 0.8rem",textAlign:"left",borderBottom:"1px solid #30363d",fontWeight:800},children:t}),td:({children:t})=>e.jsx("td",{style:{padding:"0.5rem 0.8rem",borderBottom:"1px solid #21262d",color:"#c9d1d9"},children:t}),code:({inline:t,children:r})=>e.jsx("code",{style:{background:"#161b22",color:"#f0883e",padding:"0.15rem 0.4rem",borderRadius:"4px",border:"1px solid #30363d",fontSize:"0.82rem",fontFamily:"inherit"},children:r}),strong:({children:t})=>e.jsx("strong",{style:{color:"#ffffff",fontWeight:800},children:t}),a:({href:t,children:r})=>e.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",style:{color:"#58a6ff",textDecoration:"underline"},children:r})},children:s})}):e.jsx("pre",{style:{margin:0,color:"#7ee787",fontFamily:"inherit",fontSize:"0.82rem",lineHeight:1.55,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:s}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.45rem",marginTop:"1.5rem",paddingTop:"0.85rem",borderTop:"1px dashed #21262d",fontSize:"0.84rem"},children:[e.jsx("span",{style:{color:"#3fb950",fontWeight:800},children:"blanca@macbook-pro"}),e.jsx("span",{style:{color:"#8b949e"},children:":"}),e.jsx("span",{style:{color:"#58a6ff",fontWeight:700},children:"~/Micampus/java-studio"}),e.jsx("span",{style:{color:"#a78bfa",fontWeight:800},children:"%"}),e.jsx("span",{style:{display:"inline-block",width:"8px",height:"15px",background:"#a78bfa",animation:"terminalBlink 1s step-end infinite"}})]})]})]}),e.jsx("style",{children:`
        @keyframes studioModalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .studio-terminal-glow ol.term-ol {
          counter-reset: term-counter;
          list-style: none;
          padding-left: 0;
          margin: 0.85rem 0 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .studio-terminal-glow ol.term-ol > li.term-li {
          counter-increment: term-counter;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          line-height: 1.65;
          color: #c9d1d9;
        }
        .studio-terminal-glow ol.term-ol > li.term-li::before {
          content: counter(term-counter, decimal-leading-zero);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 22px;
          padding: 0 6px;
          font-size: 0.74rem;
          font-weight: 800;
          font-family: inherit;
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.12);
          border: 1px solid rgba(167, 139, 250, 0.35);
          border-radius: 6px;
          flex-shrink: 0;
          margin-top: 3px;
          letter-spacing: 0.5px;
        }
        .studio-terminal-glow ol.term-ol > li.term-li .term-li-content {
          flex: 1;
          min-width: 0;
        }
        .studio-terminal-glow ul.term-ul {
          list-style: none;
          padding-left: 0;
          margin: 0.85rem 0 1.1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .studio-terminal-glow ul.term-ul > li.term-li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          line-height: 1.6;
          color: #c9d1d9;
        }
        .studio-terminal-glow ul.term-ul > li.term-li::before {
          content: "❯";
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #3fb950;
          font-weight: 800;
          font-size: 0.82rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .studio-terminal-glow ul.term-ul > li.term-li .term-li-content {
          flex: 1;
          min-width: 0;
        }
        .studio-terminal-glow .term-li-content > p {
          margin: 0;
          line-height: inherit;
        }
      `})]})}export{M as S};
