let cachedCampus = null;
let cachedAt = 0;
let inFlightPromise = null;
const CACHE_TTL_MS = 4000;

/**
 * Deduplica peticiones simultáneas a /api/campus y reutiliza una caché breve en memoria.
 */
export async function getCampusData({ force = false } = {}) {
  const now = Date.now();
  if (!force && cachedCampus && now - cachedAt < CACHE_TTL_MS) {
    return cachedCampus;
  }
  if (!force && inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = fetch('/api/campus')
    .then(async (res) => {
      if (!res.ok) return null;
      const data = await res.json();
      cachedCampus = data;
      cachedAt = Date.now();
      return data;
    })
    .catch(() => null)
    .finally(() => {
      inFlightPromise = null;
    });

  return inFlightPromise;
}

export function invalidateCampusCache() {
  cachedCampus = null;
  cachedAt = 0;
}

export function clearUserSessionCaches() {
  invalidateCampusCache();
  try {
    sessionStorage.removeItem('micampus_dynamic_tasks_cache');
    localStorage.removeItem('micampus_user_name');
  } catch {
    // Ignorar si storage no está disponible
  }
}
