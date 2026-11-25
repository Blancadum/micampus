import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * @component   ProyectoFinalFunctionalTab
 * @description Explicación exhaustiva de la capa funcional y cliente web:
 *              - Qué es index-secure.html y cómo está construida la SPA Vanilla
 *              - Flujos paso a paso: Login JWT, Libros, Autores, Categorías, Préstamos
 *              - Cálculo dinámico de stock y estados de préstamo (ACTIVE/OVERDUE/RETURNED)
 *              - Los 7 errores críticos de integración resueltos (CORS, OPTIONS, Page<T>, Fechas)
 *              - Simulador visual interactivo y enlace para probarlo en vivo
 * ============================================================================
 */
export default function ProyectoFinalFunctionalTab({ initialSection = 'auth', hideNav = false }) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* HERO BANNER DE LA CAPA FUNCIONAL */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.04) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '20px',
        padding: '2rem 2.4rem',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{
                background: '#10b981',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                letterSpacing: '0.5px'
              }}>
                Capa Cliente · Frontend Web
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Fichero: <code>index-secure.html</code> (517 líneas)
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 850, margin: '0 0 0.5rem 0', color: 'var(--text-title)' }}>
              🖥️ La Parte Funcional: Cómo Funciona el Frontend y la Interfaz Web
            </h2>
            <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '850px' }}>
              El cliente web es una <strong>Single Page Application (SPA)</strong> construida íntegramente en <strong>HTML5 semántico, CSS3 moderno y Vanilla JavaScript</strong> (sin frameworks pesados). Consume la API REST de Spring Boot mediante <code>fetch()</code> asíncrono, administra sesiones con tokens criptográficos <strong>JWT</strong> y sincroniza en tiempo real el stock y los préstamos.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="/java-studio/proyectos/libreria-capas/index-secure.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#10b981',
                color: '#ffffff',
                padding: '0.7rem 1.3rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🚀 Abrir Frontend en Nueva Pestaña</span>
            </a>
            <button
              type="button"
              onClick={() => setShowIframe(!showIframe)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-card)',
                color: 'var(--text-title)',
                border: '1px solid var(--border-subtle)',
                padding: '0.7rem 1.3rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{showIframe ? '🙈 Ocultar Simulador' : '👁️ Ver Simulador Embebido'}</span>
            </button>
          </div>
        </div>

        {/* IFRAME EMBEBIDO OPCIONAL */}
        {showIframe && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                🟢 Simulador en Vivo de index-secure.html (conectado a http://localhost:8080/api)
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Recuerda tener levantado el backend Spring Boot para realizar login real.
              </span>
            </div>
            <iframe
              src="/java-studio/proyectos/libreria-capas/index-secure.html"
              title="Frontend Library API"
              style={{
                width: '100%',
                height: '560px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                background: '#ffffff'
              }}
            />
          </div>
        )}
      </div>

      {/* SELECTOR DE PANTALLAS FUNCIONALES */}
      {!hideNav && (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem' }}>
        {[
          { id: 'auth', label: '1. Login & Gestión de Token JWT', icon: '🔑' },
          { id: 'books', label: '2. Catálogo & Stock de Libros', icon: '📚' },
          { id: 'loans', label: '3. Ciclo de Préstamos & Devolución', icon: '🔄' },
          { id: 'authors-categories', label: '4. Autores & Categorías', icon: '👥' },
          { id: 'errors-resolved', label: '5. Los 7 Errores Críticos Resueltos', icon: '🛡️' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.65rem 1.1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeSection === tab.id ? '#10b981' : 'var(--bg-hover)',
              color: activeSection === tab.id ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 750,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      )}

      {/* SECCIÓN 1: LOGIN & JWT */}
      {activeSection === 'auth' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔑</span> 1. Pantalla de Acceso y Gestión del Token JWT
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Al cargar la aplicación, el script comprueba si existe una variable de sesión activa. Si no la hay, se oculta el menú principal y se muestra exclusivamente el bloque modal <code>#login-screen</code>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', marginTop: '1.4rem' }}>
              <div style={{ background: 'var(--bg-hover)', padding: '1.3rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>
                  Flujo Funcional de Login
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li><strong>Formulario:</strong> El usuario introduce <code>username</code> y <code>password</code>.</li>
                  <li><strong>Petición:</strong> Se dispara <code>async function login()</code> que lanza un <code>fetch('/api/auth/login', &#123; method: 'POST' &#125;)</code>.</li>
                  <li><strong>Recepción:</strong> El backend devuelve el token Bearer firmado con HMAC-SHA256.</li>
                  <li><strong>Persistencia:</strong> Se guarda en memoria y en <code>sessionStorage.setItem('token', data.token)</code>.</li>
                  <li><strong>Apertura de la App:</strong> Se oculta el login y se invoca <code>initApp()</code>, cargando las secciones permitidas.</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.3rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 800, color: '#0ea5e9' }}>
                  Inyección Automática del Token en Cada Petición
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0' }}>
                  Para evitar repetir código en cada llamada CRUD, existe la función centralizadora <code>req(method, url, body)</code>:
                </p>
                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  overflowX: 'auto',
                  margin: 0
                }}>
{`async function req(method, url, body) {
  const headers = { 
    'Authorization': 'Bearer ' + token, 
    'Content-Type': 'application/json' 
  };
  const res = await fetch(API + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401 || res.status === 403) {
    logout(); // Token expirado o sin permisos
  }
  return res;
}`}
                </pre>
              </div>
            </div>

            <div style={{ marginTop: '1.2rem', padding: '1rem 1.2rem', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '10px', borderLeft: '4px solid #3b82f6', fontSize: '0.88rem', color: 'var(--text-title)' }}>
              <strong>Credenciales por defecto configuradas en el proyecto:</strong>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                <span>🛡️ <strong>Administrador:</strong> <code>admin</code> / <code>admin123</code> (Rol: <code>ROLE_ADMIN</code>, permiso total de altas, bajas y modificaciones)</span>
                <span>👤 <strong>Usuario Estándar:</strong> <code>user</code> / <code>user123</code> (Rol: <code>ROLE_USER</code>, consulta y solicitud de préstamos)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 2: LIBROS & STOCK */}
      {activeSection === 'books' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📚</span> 2. Catálogo, Tabla Dinámica y Control de Stock de Libros
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              La pestaña <strong>Libros</strong> es el corazón de la aplicación. Muestra todos los títulos registrados, su categoría, autores asociados y un indicador visual de existencias.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', marginTop: '1.4rem' }}>
              <div style={{ background: 'var(--bg-hover)', padding: '1.3rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.98rem', fontWeight: 800, color: '#10b981' }}>
                  Columnas y Componentes de la Tabla de Libros
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li><strong>ID & Título:</strong> Identificador numérico y nombre de la obra.</li>
                  <li><strong>ISBN:</strong> Código normalizado (ej. <code>978-84-376-0494-7</code>).</li>
                  <li><strong>Categoría:</strong> Obtenida resolviendo la relación foránea <code>category.name</code>.</li>
                  <li><strong>Autores:</strong> Lista separada por comas obtenida de la relación Many-to-Many.</li>
                  <li><strong>Stock Disponible / Total:</strong> Expresado como <code>X / Y</code> (ej. <code>3 / 5</code>).</li>
                  <li><strong>Badge de Estado:</strong>
                    <span style={{ marginLeft: '0.4rem', display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '4px', background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '0.78rem' }}>DISPONIBLE</span> si <code>availableStock &gt; 0</code> o
                    <span style={{ marginLeft: '0.4rem', display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '4px', background: '#fee2e2', color: '#991b1b', fontWeight: 700, fontSize: '0.78rem' }}>AGOTADO</span> si <code>availableStock === 0</code>.
                  </li>
                  <li><strong>Acciones:</strong> Botones <strong>Editar</strong> (permite corregir stock y título) y <strong>Eliminar</strong> (solo para <code>ROLE_ADMIN</code>).</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.3rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.98rem', fontWeight: 800, color: '#0ea5e9' }}>
                  Formulario de Alta de Libro (DTO Desacoplado)
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0 0 0.6rem 0' }}>
                  El formulario de alta no envía objetos anidados complejos, sino un DTO plano:
                </p>
                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  overflowX: 'auto',
                  margin: 0
                }}>
{`// Payload enviado por createBook():
{
  "title": "Clean Code",
  "isbn": "978-0132350884",
  "publishedYear": 2008,
  "availableStock": 5,
  "totalStock": 5,
  "categoryId": 1,        // Select desplegable
  "authorIds": [1, 2]     // Lista de IDs seleccionados
}`}
                </pre>
                <p style={{ fontSize: '0.82rem', color: '#ef4444', margin: '0.6rem 0 0 0', fontWeight: 600 }}>
                  ⚠️ Regla de Oro (@ValidStock): Si el usuario intenta poner availableStock &gt; totalStock, el backend rechaza la petición con HTTP 400 Bad Request.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 3: PRÉSTAMOS & DEVOLUCIÓN */}
      {activeSection === 'loans' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔄</span> 3. Ciclo de Vida de Préstamos: Creación, Vencimiento Dinámico y Devolución
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              La sección de préstamos es donde se evidencia la potencia transaccional de Spring Boot. Toda acción en esta pantalla impacta de forma inmediata e indivisible en el inventario de la biblioteca.
            </p>

            {/* DIAGRAMA DE FLUJO DEL PRÉSTAMO */}
            <div style={{
              background: '#0f172a',
              borderRadius: '14px',
              padding: '1.4rem',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              margin: '1.4rem 0',
              overflowX: 'auto'
            }}>
              <div style={{ color: '#10b981', fontWeight: 800, marginBottom: '0.5rem' }}>// DIAGRAMA DE ESTADOS Y STOCK EN EL CLIENTE</div>
              <div>[1. Formulario Nuevo Préstamo]</div>
              <div>   └── Seleccionar Libro (solo con stock &gt; 0) + Fecha Límite (&gt;= hoy)</div>
              <div>   └── Botón "Registrar Préstamo" (POST /api/loans)</div>
              <div>          │</div>
              <div>          ▼</div>
              <div>[2. Backend Spring Boot @Transactional]</div>
              <div>   ├── Guarda registro Loan con estado ACTIVE y loanDate = hoy</div>
              <div>   └── book.setAvailableStock(book.getAvailableStock() - 1);  &lt;-- REDUCCIÓN ATÓMICA</div>
              <div>          │</div>
              <div>          ▼</div>
              <div>[3. Visualización Dinámica en Tabla]</div>
              <div>   ├── Si hoy &lt;= expectedReturnDate ──&gt; Badge Verde: [ACTIVE] (En plazo)</div>
              <div>   └── Si hoy &gt; expectedReturnDate  ──&gt; Badge Rojo:  [OVERDUE] (¡Vencido y Reclamable!)</div>
              <div>          │</div>
              <div>          ▼</div>
              <div>[4. Acción del Usuario: Botón "Devolver"] (PUT /api/loans/{'{id}'}/return)</div>
              <div>   ├── Sella actualReturnDate = hoy y status = [RETURNED] (Badge Azul)</div>
              <div>   └── book.setAvailableStock(book.getAvailableStock() + 1);  &lt;-- REPOSICIÓN INMEDIATA</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
              <div style={{ background: 'var(--bg-hover)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#f59e0b' }}>
                  Protección de Fechas en el HTML
                </h4>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  En el formulario de préstamos, el selector de fecha tiene fijada la propiedad <code>min</code> mediante JavaScript:
                  <br />
                  <code>document.getElementById('loan-expected').min = new Date().toISOString().split('T')[0];</code>
                  <br />
                  Esto impide físicamente que un usuario elija una fecha de entrega en el pasado desde la propia interfaz.
                </p>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#10b981' }}>
                  Cálculo del Estado en Tiempo Real
                </h4>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  El frontend y el backend colaboran: si un préstamo no se ha devuelto y la fecha límite expiró ayer, <strong>no hace falta que un proceso nocturno modifique la base de datos</strong>. Al devolver el DTO, el backend computa al vuelo si está vencido y la interfaz lo resalta inmediatamente con el badge <code>OVERDUE</code>.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 4: AUTORES & CATEGORÍAS */}
      {activeSection === 'authors-categories' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>👥</span> 4. Módulos Auxiliares: Autores y Categorías
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Ambas secciones funcionan como tablas maestras indispensables para dar soporte al catálogo de libros. Cuentan con validación de duplicados y protección de integridad referencial.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', marginTop: '1.4rem' }}>
              <div style={{ background: 'var(--bg-hover)', padding: '1.3rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.98rem', fontWeight: 800, color: '#8b5cf6' }}>
                  Gestión de Autores (`loadAuthors()`)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li><strong>Campos:</strong> Nombre (obligatorio), Apellidos (obligatorio), Nacionalidad (opcional).</li>
                  <li><strong>Edición Rápida:</strong> Se activa mediante <code>toggleEditAuthor(id)</code> permitiendo renombrar sin salir de la página.</li>
                  <li><strong>Integridad Referencial:</strong> Si intentas borrar un autor que tiene libros publicados, la base de datos MySQL protege la relación y el backend devuelve <code>409 Conflict</code> o <code>400 Bad Request</code>, mostrando en pantalla un aviso claro.</li>
                </ul>
              </div>

              <div style={{ background: 'var(--bg-hover)', padding: '1.3rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.98rem', fontWeight: 800, color: '#f59e0b' }}>
                  Gestión de Categorías (`loadCategories()`)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li><strong>Campos:</strong> Nombre de categoría (único en BBDD) y Descripción temática.</li>
                  <li><strong>Control de Duplicados:</strong> Si intentas crear una categoría existente (ej. "Ciencia Ficción"), Spring Boot lanza <code>DuplicateResourceException</code> (HTTP 409).</li>
                  <li><strong>Sincronización con Selects:</strong> Al crear una categoría nueva, se invoca <code>loadCategoriesSelect()</code> para que aparezca instantáneamente en el desplegable de libros.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 5: LOS 7 ERRORES CRÍTICOS RESUELTOS */}
      {activeSection === 'errors-resolved' && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{ background: '#ef4444', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '5px' }}>
                AUDITORÍA DE INTEGRACIÓN
              </span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                🛡️ Los 7 Errores Críticos que Surgieron al Vincular Frontend con Backend
              </h3>
            </div>
            <p style={{ margin: '0 0 1.4rem 0', fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Conectar una SPA en JavaScript nativo con una API REST empresarial de Spring Boot 3 no fue directo. Estos fueron los 7 bloqueos reales que surgieron y cómo se solucionaron en el código:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  num: '1',
                  title: 'Bloqueo CORS (Cross-Origin Resource Sharing)',
                  symptom: 'Al abrir index-secure.html en el navegador, cualquier fetch() a http://localhost:8080 moría antes de salir.',
                  cause: 'Spring Security no tenía configurada una política de orígenes cruzados para navegadores.',
                  fix: 'Se configuró un @Bean de CorsConfigurationSource en SecurityConfig.java permitiendo orígenes cruzados y credenciales.'
                },
                {
                  num: '2',
                  title: 'Peticiones Preflight OPTIONS Bloqueadas con 401 Unauthorized',
                  symptom: 'Los GET funcionaban, pero los POST, PUT y DELETE fallaban misteriosamente con 401.',
                  cause: 'El navegador envía una petición preliminar OPTIONS para comprobar permisos. Spring Security la interceptaba exigiendo token JWT antes de permitir la verificación.',
                  fix: 'Se añadió .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() en SecurityConfig.'
                },
                {
                  num: '3',
                  title: 'Crash en Frontend: TypeError: data.map is not a function',
                  symptom: 'Al listar libros o autores, la tabla se quedaba en blanco y la consola de JS arrojaba error.',
                  cause: 'Spring Data JPA devuelve un objeto paginado Page<T> con metadatos ({ content: [...], totalPages, totalElements }), no un array plano [...].',
                  fix: 'Se creó en el frontend la función adaptadora list(data): return Array.isArray(data) ? data : (data?.content || []);'
                },
                {
                  num: '4',
                  title: 'Desajuste de Formato de Fechas (HTTP 400 Bad Request)',
                  symptom: 'Al registrar un préstamo, Jackson fallaba al deserializar la fecha.',
                  cause: 'El input <input type="date"> envía formato YYYY-MM-DD, pero si Jackson no tiene anotado el patrón estricto falla.',
                  fix: 'Se añadió @JsonFormat(pattern = "yyyy-MM-dd") en los DTOs de Loan y se sanitizó con toApiDate(iso) en JS.'
                },
                {
                  num: '5',
                  title: 'Desacople IDs vs Objetos Anidados en Peticiones POST',
                  symptom: 'El cliente intentaba enviar { category: { id: 1 } }, provocando fallos de mapeo en el servidor.',
                  cause: 'El DTO esperaba categoryId y authorIds planos para no forzar al cliente a construir grafos de objetos.',
                  fix: 'Se normalizó el contrato para que el frontend envíe exclusivamente IDs primitivos numéricos.'
                },
                {
                  num: '6',
                  title: 'Expiración Silenciosa del Token JWT',
                  symptom: 'Pasadas 24 horas, la interfaz dejaba de responder sin avisar al usuario.',
                  cause: 'El backend respondía 403 Forbidden y el frontend no capturaba el código de estado.',
                  fix: 'En la función req(), si el status es 401 o 403, se borra el token y se redirige automáticamente al login con mensaje explicativo.'
                },
                {
                  num: '7',
                  title: 'El Espejismo de Spring Boot 4 y Jackson 3 en los Enunciados',
                  symptom: 'Los PDFs oficiales de Accenture indicaban importar de tools.jackson.databind.exc para capturar InvalidFormatException.',
                  cause: 'El PDF mezcló una especificación futura de Spring Boot 4 con la versión real del proyecto (Spring Boot 3.3.x / Jackson 2.x).',
                  fix: 'Se mantuvo la librería canónica com.fasterxml.jackson.databind.*, evitando romper el pom.xml.'
                }
              ].map(err => (
                <div
                  key={err.num}
                  style={{
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1.1rem 1.3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 800
                    }}>
                      {err.num}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      {err.title}
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.2rem' }}>
                    <div>💥 <strong>Síntoma:</strong> {err.symptom}</div>
                    <div>🔍 <strong>Causa Raíz:</strong> {err.cause}</div>
                    <div>✅ <strong>Solución Definitiva:</strong> <span style={{ color: '#10b981', fontWeight: 600 }}>{err.fix}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
