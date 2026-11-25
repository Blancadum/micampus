import{j as e}from"./vendor-react-B1CazfeU.js";function f({isOpen:s=!0,onToggle:t,title:b="Índice de Contenidos",subtitle:l,icon:n="📚",badge:d,searchQuery:p,onSearchChange:o,searchPlaceholder:c="🔍 Buscar...",onExpandAll:i,onCollapseAll:a,children:m,footer:x,width:u=320,ariaLabel:g="Navegación Lateral"}){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .master-aside-wrapper {
          display: flex;
          position: relative;
          flex-shrink: 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .master-aside-container {
          width: ${u}px;
          flex-shrink: 0;
          position: sticky;
          top: 75px;
          max-height: calc(100vh - 95px);
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .master-aside-container::-webkit-scrollbar {
          width: 5px;
        }
        .master-aside-container::-webkit-scrollbar-thumb {
          background: var(--border-subtle);
          border-radius: 4px;
        }
        .master-aside-floating-toggle {
          position: fixed;
          top: 140px;
          left: 0;
          z-index: 1000;
          background: var(--bg-card);
          color: var(--text-title);
          border: 1px solid var(--border-subtle);
          border-left: none;
          border-radius: 0 10px 10px 0;
          padding: 0.65rem 0.85rem;
          font-size: 0.82rem;
          font-weight: 750;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }
        .master-aside-floating-toggle:hover {
          background: var(--bg-hover);
          color: #3b82f6;
          transform: translateX(3px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
        }
        @media (max-width: 960px) {
          .master-aside-container {
            width: 100% !important;
            position: static;
            max-height: none;
          }
          .master-aside-floating-toggle {
            top: auto;
            bottom: 20px;
          }
        }
      `}),!s&&e.jsxs("button",{type:"button",onClick:t,className:"master-aside-floating-toggle",title:"Desplegar menú lateral (Aside Left)","aria-label":"Desplegar menú lateral",children:[e.jsx("span",{children:n}),e.jsx("span",{children:"Mostrar Menú"}),e.jsx("span",{style:{fontSize:"0.9rem",color:"#3b82f6",fontWeight:900},children:"▶"})]}),s&&e.jsxs("aside",{className:"master-aside-container","aria-label":g,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid var(--border-subtle)",paddingBottom:"0.65rem",gap:"0.5rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",minWidth:0},children:[e.jsx("span",{style:{fontSize:"1.25rem",flexShrink:0},children:n}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("h3",{style:{margin:0,fontSize:"0.92rem",fontWeight:800,color:"var(--text-title)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:b}),l&&e.jsx("span",{style:{fontSize:"0.7rem",color:"var(--text-dim)",display:"block"},children:l})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",flexShrink:0},children:[d&&e.jsx("span",{style:{fontSize:"0.68rem",fontWeight:750,background:"var(--bg-hover)",padding:"0.15rem 0.45rem",borderRadius:"5px",color:"var(--text-muted)"},children:d}),t&&e.jsxs("button",{type:"button",onClick:t,title:"Replegar menú lateral para maximizar área de lectura","aria-label":"Replegar menú lateral",style:{background:"var(--bg-hover)",border:"1px solid var(--border-subtle)",borderRadius:"8px",padding:"0.25rem 0.55rem",fontSize:"0.72rem",color:"var(--text-muted)",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.25rem",fontWeight:700,transition:"all 0.15s ease"},onMouseEnter:r=>{r.currentTarget.style.color="#3b82f6",r.currentTarget.style.borderColor="rgba(59, 130, 246, 0.4)"},onMouseLeave:r=>{r.currentTarget.style.color="var(--text-muted)",r.currentTarget.style.borderColor="var(--border-subtle)"},children:[e.jsx("span",{children:"◀"}),e.jsx("span",{children:"Ocultar"})]})]})]}),o&&e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{type:"text",value:p||"",onChange:r=>o(r.target.value),placeholder:c,style:{width:"100%",padding:"0.55rem 0.8rem",borderRadius:"8px",border:"1px solid var(--border-subtle)",background:"var(--bg-hover)",color:"var(--text-title)",fontSize:"0.82rem",outline:"none",boxSizing:"border-box"}}),p&&e.jsx("button",{type:"button",onClick:()=>o(""),style:{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"var(--text-muted)",cursor:"pointer",fontSize:"0.8rem"},title:"Limpiar búsqueda",children:"✕"})]}),(i||a)&&e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[i&&e.jsx("button",{type:"button",onClick:i,style:{flex:1,background:"var(--bg-hover)",border:"1px solid var(--border-subtle)",borderRadius:"6px",padding:"0.3rem 0.5rem",fontSize:"0.72rem",color:"var(--text-muted)",cursor:"pointer",fontWeight:650},children:"Expandir Todo"}),a&&e.jsx("button",{type:"button",onClick:a,style:{flex:1,background:"var(--bg-hover)",border:"1px solid var(--border-subtle)",borderRadius:"6px",padding:"0.3rem 0.5rem",fontSize:"0.72rem",color:"var(--text-muted)",cursor:"pointer",fontWeight:650},children:"Contraer Todo"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.65rem",flex:1},children:m}),x&&e.jsx("div",{style:{marginTop:"auto",paddingTop:"0.75rem",borderTop:"1px solid var(--border-subtle)"},children:x})]})]})}export{f as C};
