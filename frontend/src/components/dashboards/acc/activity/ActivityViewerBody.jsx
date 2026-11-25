import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

/**
 * ActivityViewerBody
 * Contenedor principal para visualizar el enunciado en Markdown o la solución técnica paso a paso.
 */
export default function ActivityViewerBody({
  activeTab,
  enunciadoMarkdown,
  solucionDoc
}) {
  return (
    <main style={{ 
      background: 'var(--bg-card)', 
      border: '1px solid var(--border-subtle)', 
      borderRadius: '12px', 
      padding: '2rem 2.5rem',
      boxShadow: 'var(--shadow-sm)',
      lineHeight: '1.7',
      color: 'var(--text-main)'
    }}>
      {activeTab === 'enunciado' ? (
        <div>
          <div style={{ 
            background: 'rgba(56, 189, 248, 0.05)', 
            borderLeft: '4px solid #38bdf8', 
            padding: '0.8rem 1.2rem', 
            borderRadius: '4px', 
            marginBottom: '2rem', 
            fontSize: '0.9rem', 
            color: 'var(--text-muted)' 
          }}>
            📌 <strong>Enunciado oficial:</strong> Este es el texto íntegro del ejercicio sin soluciones expuestas, ideal para resolver el reto de forma autónoma.
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {enunciadoMarkdown}
          </ReactMarkdown>
        </div>
      ) : (
        <div>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.05)', 
            borderLeft: '4px solid #10b981', 
            padding: '0.8rem 1.2rem', 
            borderRadius: '4px', 
            marginBottom: '2rem', 
            fontSize: '0.9rem', 
            color: 'var(--text-muted)' 
          }}>
            ✅ <strong>Guía de resolución:</strong> Estructura del proyecto, explicaciones de arquitectura y código Java comentado listo para contrastar tu implementación.
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {solucionDoc || 'Solución en redacción.'}
          </ReactMarkdown>
        </div>
      )}
    </main>
  );
}
