import { useState, useEffect, useRef, useCallback } from 'react';
import { API_ENDPOINTS } from '../config/api';

/**
 * ============================================================================
 * @hook        usePersistentState
 * @description Hook de persistencia híbrida (Offline-First con SQLite Sync).
 *              1. Carga instantánea y síncrona desde localStorage (cero flickering).
 *              2. Sincronización en segundo plano con la base de datos SQLite (si el backend está activo).
 *              3. Si el backend está apagado, funciona con total normalidad vía localStorage.
 * 
 * @param {string} key          Identificador único de la clave
 * @param {any}    initialValue Valor por defecto si no existe dato previo
 * @param {object} options      { category: 'general', syncWithBackend: true }
 * ============================================================================
 */
export function usePersistentState(key, initialValue, options = {}) {
  const { category = 'general', syncWithBackend = true } = options;
  const isMounted = useRef(true);

  // 1. Inicialización síncrona inmediata desde localStorage
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(`[usePersistentState] Error al leer localStorage para "${key}":`, e);
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  // 2. Sincronización inicial desde SQLite al montar
  useEffect(() => {
    isMounted.current = true;
    if (!syncWithBackend) return;

    let isCancelled = false;

    async function fetchFromBackend() {
      try {
        const res = await fetch(API_ENDPOINTS.progress.get(key));
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.value !== undefined && !isCancelled && isMounted.current) {
          setState(data.value);
          try {
            localStorage.setItem(key, JSON.stringify(data.value));
          } catch (err) {
            // Ignorar errores de cuota en localStorage
          }
        }
      } catch (err) {
        // Backend no disponible (modo offline silencioso)
      }
    }

    fetchFromBackend();

    return () => {
      isCancelled = true;
      isMounted.current = false;
    };
  }, [key, syncWithBackend]);

  // 3. Setter con actualización optimista y persistencia dual
  const setPersistentState = useCallback((valueOrUpdater) => {
    setState((prevState) => {
      const nextValue = typeof valueOrUpdater === 'function' ? valueOrUpdater(prevState) : valueOrUpdater;

      // Guardar en localStorage inmediatamente
      try {
        localStorage.setItem(key, JSON.stringify(nextValue));
      } catch (e) {
        console.warn(`[usePersistentState] Error al escribir en localStorage para "${key}":`, e);
      }

      // Sincronizar con SQLite en segundo plano
      if (syncWithBackend) {
        fetch(API_ENDPOINTS.progress.set(key), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, value: nextValue })
        }).catch(() => {
          // Fallo de red silencioso; el dato permanece en localStorage
        });
      }

      return nextValue;
    });
  }, [key, category, syncWithBackend]);

  return [state, setPersistentState];
}

/**
 * Utilidad para migrar todas las claves existentes de localStorage a la base de datos SQLite.
 */
export async function migrateLocalStorageToSQLite() {
  const knownKeys = [
    { key: 'accenture_activities_status', category: 'accenture' },
    { key: 'proyecto_final_roadmap_steps', category: 'accenture' },
    { key: 'initializr_completed_steps', category: 'accenture' },
    { key: 'micampus_sql_completed', category: 'sql' },
    { key: 'ent_eac2_completed', category: 'ioc' },
    { key: 'ent_eac2_test_answers', category: 'ioc' },
    { key: 'desp_eac2_completed_v2', category: 'ioc' },
    { key: 'desp_eac2_server_ip', category: 'ioc' },
    { key: 'micampus_checked_deliverables', category: 'ioc' },
    { key: 'micampus_backup_copies', category: 'ioc' },
    { key: 'sb_quiz_wrong_ids', category: 'quiz' },
    { key: 'sb_quiz_mastered_cards', category: 'quiz' },
    { key: 'sb_quiz_survey_ratings', category: 'quiz' },
    { key: 'micampus_removed_tasks', category: 'tasks' },
    { key: 'student_git_name', category: 'settings' }
  ];

  const itemsToSync = [];
  for (const item of knownKeys) {
    try {
      const saved = localStorage.getItem(item.key);
      if (saved !== null) {
        itemsToSync.push({
          key: item.key,
          category: item.category,
          value: JSON.parse(saved)
        });
      }
    } catch (e) {
      console.warn(`Error al leer clave ${item.key}:`, e);
    }
  }

  if (itemsToSync.length === 0) {
    return { count: 0, message: 'No hay datos pendientes de migrar en localStorage' };
  }

  const res = await fetch(API_ENDPOINTS.progress.bulk, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: itemsToSync })
  });

  if (!res.ok) {
    throw new Error(`Fallo en migración: ${res.statusText}`);
  }

  return await res.json();
}

