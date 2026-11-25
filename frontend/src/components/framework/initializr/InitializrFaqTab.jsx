import React, { useState } from 'react';

export default function InitializrFaqTab() {
  const [openFaq, setOpenFaq] = useState({
    springVsBoot: true,
    vanillaVsFramework: true,
    embeddedTomcat: false,
    iocDi: false,
    annotations: false
  });

  const toggleFaq = (key) => {
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* FAQ 1: Spring vs Spring Boot */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => toggleFaq('springVsBoot')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-title)',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🌱</span>
            <span>1. ¿Qué diferencia fundamental hay entre Spring Framework y Spring Boot?</span>
          </div>
          <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.springVsBoot ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openFaq.springVsBoot && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 1rem' }}>
              <strong>Spring Framework</strong> (creado en 2002) es el ecosistema central que proporciona Inversión de Control (IoC), Inyección de Dependencias (DI), abstracciones para transacciones y seguridad. Sin embargo, en el Spring Framework clásico tenías que:
            </p>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.4rem' }}>
              <li>Escribir cientos de líneas de configuración en ficheros XML (<code>applicationContext.xml</code>, <code>web.xml</code>).</li>
              <li>Instalar, configurar y desplegar un servidor externo (Apache Tomcat, WildFly o WebLogic) como un archivo <code>.war</code>.</li>
              <li>Gestionar manualmente las versiones de cada librería en Maven, sufriendo conflictos constantes de dependencias incompatibles (el temido <em>"JAR Hell"</em>).</li>
            </ul>
            <p style={{ margin: '0 0 1rem' }}>
              <strong>Spring Boot</strong> (lanzado en 2014) es una capa superior "opinionada" que automatiza todo lo anterior mediante tres pilares:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: '#10b981' }}>1. Convención sobre Configuración</strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Auto-configura componentes según las librerías presentes en tu <code>pom.xml</code>. Si añades <code>spring-boot-starter-web</code>, configura Tomcat y Spring MVC automáticamente.</p>
              </div>
              <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: '#0ea5e9' }}>2. Servidor Embebido</strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tomcat viene empaquetado dentro de la aplicación. Tu proyecto es un archivo <code>.jar</code> autoejecutable con <code>java -jar app.jar</code>.</p>
              </div>
              <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: '#8b5cf6' }}>3. Dependencias "Starters"</strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Agrupaciones de dependencias probadas entre sí. Una sola línea importa todas las versiones compatibles necesarias.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ 2: Java Puro vs Framework */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => toggleFaq('vanillaVsFramework')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-title)',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚖️</span>
            <span>2. ¿Qué aportaciones hace el framework frente a desarrollar en Java "puro" (Vanilla)?</span>
          </div>
          <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.vanillaVsFramework ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openFaq.vanillaVsFramework && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 1rem' }}>
              Programar una API web en <strong>Java puro (sin framework)</strong> requiere escribir miles de líneas de "fontanería" antes de poder programar la primera regla de negocio. Observa la comparativa:
            </p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', margin: '0 0 1rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-hover)', borderBottom: '2px solid var(--border-subtle)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-title)' }}>Área</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#ef4444' }}>Java Puro (Vanilla)</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#10b981' }}>Con Spring Boot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Servidor HTTP</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>Configurar Sockets crudos con <code>ServerSocket</code> o Servlets manuales.</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}>Tomcat embebido incluido listo para escuchar peticiones al arrancar.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Rutas y JSON</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>Parsear strings de URL a mano y usar librerías de JSON con decenas de líneas de mapeo.</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}>Anotaciones declarativas: <code>@GetMapping</code> y serialización automática con Jackson.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Creación de Objetos</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>Instanciar con <code>new Servicio()</code> creando alto acoplamiento y dificultad para pruebas.</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}><strong>Inyección de Dependencias (IoC)</strong>: Spring instancia e inyecta los Beans automáticamente.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Base de Datos (SQL)</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>JDBC tradicional con <code>Connection</code>, <code>Statement</code>, <code>try/catch/finally</code> y SQL manual.</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}><strong>Spring Data JPA</strong>: Métodos CRUD generados automáticamente solo definiendo una interfaz.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* FAQ 3: Por qué Tomcat Embebido */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => toggleFaq('embeddedTomcat')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-title)',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🚀</span>
            <span>3. ¿Por qué Spring Boot empaqueta Tomcat dentro en lugar de usar un servidor externo?</span>
          </div>
          <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.embeddedTomcat ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openFaq.embeddedTomcat && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 1rem' }}>
              Antiguamente, la infraestructura era monolítica: existía un servidor físico con un Tomcat instalado donde los desarrolladores "subían" archivos <code>.war</code>.
            </p>
            <p style={{ margin: '0 0 1rem' }}>
              En la era moderna de <strong>Microservicios, la nube (AWS/Azure) y Docker</strong>, el paradigma cambió: <em>"La aplicación ES el servidor"</em>. Al generar un único archivo <code>.jar</code> autoejecutable:
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.4rem' }}>
              <li>Se puede arrancar en cualquier máquina con el simple comando <code>java -jar app.jar</code>.</li>
              <li>No dependes de qué versión de Tomcat tenga instalada el servidor de producción.</li>
              <li>Empaquetar en un contenedor Docker requiere apenas 4 líneas de <code>Dockerfile</code>.</li>
            </ul>
          </div>
        )}
      </div>

      {/* FAQ 4: Inversión de Control (IoC) y DI */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => toggleFaq('iocDi')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-title)',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🔄</span>
            <span>4. ¿Qué es el contenedor IoC y cómo funciona la Inyección de Dependencias (@Autowired)?</span>
          </div>
          <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.iocDi ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openFaq.iocDi && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 1rem' }}>
              <strong>Inversión de Control (IoC):</strong> En lugar de que tú crees las instancias de tus clases con <code>new GestorTareas()</code>, le cedes el control a Spring. Spring actúa como el director de orquesta: lee las anotaciones, crea los objetos (llamados <strong>Beans</strong>) al arrancar y los guarda en su contenedor interno (ApplicationContext).
            </p>
            <p style={{ margin: '0 0 1rem' }}>
              <strong>Inyección de Dependencias (DI):</strong> Cuando una clase (por ejemplo, un Controller) necesita un servicio para hacer su trabajo, tú no creas el servicio. Simplemente lo declaras y Spring te lo "inyecta" automáticamente mediante el constructor o la anotación <code>@Autowired</code>:
            </p>
            <pre style={{ background: '#1e1e2e', padding: '1rem', borderRadius: '10px', color: '#cdd6f4', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.84rem', margin: 0, overflowX: 'auto' }}>
{`@Service
public class TareaService { ... }

@RestController
public class TareaController {
    private final TareaService tareaService;

    // Spring busca automáticamente el Bean TareaService y lo inyecta aquí
    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }
}`}
            </pre>
          </div>
        )}
      </div>

      {/* FAQ 5: Anotaciones Esenciales */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => toggleFaq('annotations')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-title)',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🏷️</span>
            <span>5. ¿Cuáles son las anotaciones iniciales imprescindibles que debo memorizar?</span>
          </div>
          <span style={{ fontSize: '1.1rem', color: '#10b981', transform: openFaq.annotations ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>

        {openFaq.annotations && (
          <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.7' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#10b981', fontWeight: 700 }}>@SpringBootApplication</code>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Anota la clase principal. Combina <code>@Configuration</code>, <code>@EnableAutoConfiguration</code> y <code>@ComponentScan</code>.</p>
              </div>
              <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#0ea5e9', fontWeight: 700 }}>@RestController</code>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Marca un controlador web donde los retornos de métodos se convierten directamente a JSON/texto (incluye <code>@ResponseBody</code>).</p>
              </div>
              <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#8b5cf6', fontWeight: 700 }}>@GetMapping / @PostMapping</code>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Mapean peticiones HTTP GET y POST a métodos Java específicos.</p>
              </div>
              <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#f59e0b', fontWeight: 700 }}>@Service & @Repository</code>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Estereotipos que indican que una clase es de lógica de negocio o de acceso a datos.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
