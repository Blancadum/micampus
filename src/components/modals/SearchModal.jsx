import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/search_index.json')
      .then(res => res.json())
      .then(data => setSearchData(data))
      .catch(() => {
        // Fallback si falla la carga
        setSearchData([]);
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    // Si la búsqueda tiene menos de 3 caracteres, no mostramos resultados
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    // Optimización 2: Debouncing (esperar a que el usuario deje de teclear)
    const timer = setTimeout(() => {
      const lowerQuery = query.toLowerCase().trim();
      const escapedQuery = lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'i');
      
      const filtered = searchData.filter(item => {
        const titleMatch = regex.test(item.title);
        const typeMatch = regex.test(item.type);
        const definitionMatch = item.definition ? regex.test(item.definition) : false;
        const keywordsMatch = Array.isArray(item.keywords)
          ? item.keywords.some(k => k.toLowerCase().includes(lowerQuery) || regex.test(k))
          : false;
        return titleMatch || typeMatch || definitionMatch || keywordsMatch;
      });
      setResults(filtered);
    }, 200); // 200ms de retraso

    return () => clearTimeout(timer);
  }, [query, searchData]);

  if (!isOpen) return null;

  const handleResultClick = (item) => {
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
    onClose();
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Buscar conceptos, materias, glosario o campus..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-close-btn" onClick={onClose}>✕</button>
        </div>
        
        {query && (
          <div className="search-results">
            {results.length > 0 ? (
              <ul className="search-results-list">
                {results.map(item => (
                  <li key={item.id} className="search-result-item" onClick={() => handleResultClick(item)}>
                    <div className="search-result-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span className="search-result-title">{item.title}</span>
                        <span className="search-result-type">{item.type}</span>
                      </div>
                      {item.definition && (
                        <p style={{ margin: '0.28rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                          {item.definition}
                        </p>
                      )}
                    </div>
                    <span className="search-result-arrow">→</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="search-no-results">
                No se encontraron resultados para "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
