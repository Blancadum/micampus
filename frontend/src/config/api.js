// Configuración centralizada de APIs y endpoints del backend (mismo origen en Spring Boot)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  eacStatus: `${API_BASE_URL}/api/eac/status`,
  upload: (subjectId) => `${API_BASE_URL}/api/upload/${subjectId}`,
  progress: {
    get: (key) => `${API_BASE_URL}/api/progress/${encodeURIComponent(key)}`,
    set: (key) => `${API_BASE_URL}/api/progress/${encodeURIComponent(key)}`,
    delete: (key) => `${API_BASE_URL}/api/progress/${encodeURIComponent(key)}`,
    all: `${API_BASE_URL}/api/progress`,
    byCategory: (category) => `${API_BASE_URL}/api/progress/category/${encodeURIComponent(category)}`,
    bulk: `${API_BASE_URL}/api/progress-bulk`,
  },
  eacEvaluation: `${API_BASE_URL}/api/eac/evaluation`,
  eacEvaluations: (subjectId) => `${API_BASE_URL}/api/eac/evaluations/${encodeURIComponent(subjectId)}`,
  backup: `${API_BASE_URL}/api/scripts/backup/export`,
};
