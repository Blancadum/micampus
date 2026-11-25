import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';
import { migrateLocalStorageToSQLite } from '../../hooks/usePersistentState';
import './HeaderPersistenceWidget.css';

/**
 * ============================================================================
 * @component   HeaderPersistenceWidget
 * @description Indicador de estado de la base de datos SQLite y menú de
 *              exportación de copias de seguridad y sincronización en vivo.
 * ============================================================================
 */
export default function HeaderPersistenceWidget() {
  const [isOnline, setIsOnline] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null); // null | 'syncing' | 'success' | 'error'
  const [syncMsg, setSyncMsg] = useState('');
  const menuRef = useRef(null);

  // Comprobar disponibilidad de la API y SQLite
  useEffect(() => {
    let isCancelled = false;

    async function checkHealth() {
      try {
        const res = await fetch(`${API_BASE_URL}/`, { method: 'GET' });
        if (!isCancelled) {
          setIsOnline(res.ok);
        }
      } catch (err) {
        if (!isCancelled) {
          setIsOnline(false);
        }
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 12000);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Exportar backup
  const handleExportBackup = async () => {
    if (isOnline) {
      window.open(API_ENDPOINTS.backup, '_blank');
      setMenuOpen(false);
    } else {
      // Exportación de emergencia desde localStorage si la API está apagada
      const backup = {
        app: 'MiCampus (Offline Export)',
        timestamp: new Date().toISOString(),
        data: {}
      };
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        try {
          backup.data[k] = JSON.parse(localStorage.getItem(k));
        } catch {
          backup.data[k] = localStorage.getItem(k);
        }
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `micampus_local_backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMenuOpen(false);
    }
  };

  // Sincronizar / Migrar
  const handleSyncToDatabase = async () => {
    if (!isOnline) {
      setSyncStatus('error');
      setSyncMsg('Inicia el backend (npm run fullstack) para sincronizar.');
      return;
    }

    setSyncStatus('syncing');
    setSyncMsg('Volcando datos del navegador...');

    try {
      const res = await migrateLocalStorageToSQLite();
      setSyncStatus('success');
      setSyncMsg(`✅ ${res.count || 0} claves sincronizadas con SQLite.`);
      setTimeout(() => {
        setSyncStatus(null);
        setSyncMsg('');
      }, 4000);
    } catch (err) {
      setSyncStatus('error');
      setSyncMsg('Fallo en sincronización: ' + err.message);
    }
  };

  return (
    <div className="header-persistence-container" ref={menuRef}>
      {/* Botón Píldora de Estado */}
      <button 
        type="button"
        className={`header-persistence-pill ${isOnline ? 'pill-online' : 'pill-offline'}`}
        onClick={() => setMenuOpen(!menuOpen)}
        title={isOnline ? 'Base de datos SQLite activa y sincronizada' : 'Modo local (localStorage) · Clic para opciones'}
        aria-expanded={menuOpen}
      >
        <span className={`persistence-dot ${isOnline ? 'dot-online' : 'dot-offline'}`} />
        <span className="persistence-text">{isOnline ? 'SQLite' : 'Local'}</span>
        <span className="persistence-caret">{menuOpen ? '▲' : '▼'}</span>
      </button>

      {/* Menú Desplegable Flotante */}
      {menuOpen && (
        <div className="persistence-dropdown">
          <div className="persistence-dropdown-header">
            <div className="header-title-row">
              <span className={`status-badge ${isOnline ? 'badge-online' : 'badge-offline'}`}>
                {isOnline ? '🟢 En Línea' : '🟡 Modo Local'}
              </span>
              <span className="engine-name">
                {isOnline ? 'SQLite WAL Nativo' : 'localStorage'}
              </span>
            </div>
            <p className="header-desc">
              {isOnline 
                ? 'Tus tareas, checklists y notas se guardan automáticamente en backend/database/micampus.db.' 
                : 'El backend está detenido. Tus cambios se guardan de forma segura en este navegador.'}
            </p>
          </div>

          {syncMsg && (
            <div className={`persistence-alert alert-${syncStatus}`}>
              {syncMsg}
            </div>
          )}

          <div className="persistence-dropdown-actions">
            <button 
              type="button" 
              className="persistence-btn btn-backup"
              onClick={handleExportBackup}
            >
              <span className="btn-icon">💾</span>
              <div className="btn-copy">
                <strong>Exportar Copia de Seguridad</strong>
                <small>Descarga un volcado JSON con todo tu progreso</small>
              </div>
            </button>

            {isOnline && (
              <button 
                type="button" 
                className="persistence-btn btn-sync"
                onClick={handleSyncToDatabase}
                disabled={syncStatus === 'syncing'}
              >
                <span className="btn-icon">🔄</span>
                <div className="btn-copy">
                  <strong>Volcar Navegador a SQLite</strong>
                  <small>Migra el historial previo de este navegador a la BD</small>
                </div>
              </button>
            )}
          </div>

          <div className="persistence-dropdown-footer">
            <span>🛡️ Transacciones atómicas ACID · 100% privado en tu Mac</span>
          </div>
        </div>
      )}
    </div>
  );
}
