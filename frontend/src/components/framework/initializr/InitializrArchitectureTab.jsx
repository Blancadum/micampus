import React from 'react';

export default function InitializrArchitectureTab() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>📐</span> Anatomía y Flujo de Petición en un Proyecto Spring Boot
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
        Un proyecto Spring Boot profesional separa responsabilidades en 3 capas estándar (Arquitectura en Capas o Clean Architecture). Cada capa tiene una sola misión:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {/* CAPA 1 */}
        <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
          <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#0ea5e9' }}>1. Controller (Camarero)</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Recibe la petición HTTP desde el navegador o Postman, valida los parámetros de entrada y devuelve la respuesta en JSON. No contiene cálculos de negocio ni sentencias SQL.
          </p>
        </div>

        {/* CAPA 2 */}
        <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧠</div>
          <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#10b981' }}>2. Service (Cocinero)</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Contiene las reglas de negocio, validaciones complejas, transacciones (<code>@Transactional</code>) y orquestación de llamadas a múltiples repositorios.
          </p>
        </div>

        {/* CAPA 3 */}
        <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🗄️</div>
          <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#8b5cf6' }}>3. Repository (Despensa)</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Accede a la base de datos (H2, MySQL, PostgreSQL) a través de Spring Data JPA o JDBC. Solo sabe cómo guardar, buscar y eliminar entidades.
          </p>
        </div>
      </div>

      {/* ESTRUCTURA DE CARPETAS */}
      <div style={{ background: '#1e1e2e', padding: '1.5rem', borderRadius: '16px', color: '#cdd6f4', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', overflowX: 'auto' }}>
        <div style={{ color: '#a6e3a1', fontWeight: 'bold', marginBottom: '0.75rem' }}>📁 Estructura Estándar Maven en taskmanager:</div>
        <pre style={{ margin: 0, fontFamily: 'inherit', color: 'inherit', lineHeight: 1.6 }}>
{`taskmanager/
├── pom.xml                               # Declaración de dependencias y versión Java
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/accenture/taskmanager/
│   │   │       ├── TaskmanagerApplication.java   # Punto de arranque (@SpringBootApplication)
│   │   │       ├── controller/                   # Endpoints HTTP REST (@RestController)
│   │   │       ├── service/                      # Lógica de negocio (@Service)
│   │   │       ├── repository/                   # Acceso a base de datos (@Repository)
│   │   │       └── model/                        # Entidades JPA y DTOs
│   │   └── resources/
│   │       ├── application.properties           # Puerto de servidor, credenciales de BD, perfiles
│   │       └── static/ & templates/
│   └── test/
│       └── java/                                # Pruebas unitarias y de integración (@SpringBootTest)`}
        </pre>
      </div>
    </div>
  );
}
