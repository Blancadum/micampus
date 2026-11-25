/**
 * Manifiesto "Recuerdos": inventario centralizado de rutas, módulos y datos
 * heredados del campus antiguo que deberán eliminarse cuando concluya la
 * migración hacia el campus dinámico (SQLite + DynamicSubjectPage + IA).
 */

export const RECUERDOS_META = {
  label: 'Recuerdos (Campus antiguo)',
  status: 'pending-migration-cleanup',
  newCampusSourceOfTruth: [
    'micampus-data/micampus.db',
    'frontend/src/pages/DynamicSubjectPage.jsx',
    'frontend/src/pages/Home.jsx',
    'frontend/src/pages/CalendarRadarPage.jsx',
    'frontend/src/pages/SettingsPage.jsx',
    'frontend/src/pages/ScriptsCenterPage.jsx',
  ],
};

export const RECUERDOS_LEGACY_ROUTES = [
  { file: 'frontend/src/routes/accentureRoutes.jsx', prefixes: ['/acc', '/accenture', '/java', '/springboot'] },
  { file: 'frontend/src/routes/sepeAndMiscRoutes.jsx', prefixes: ['/sepe', '/sql', '/brain', '/blog', '/tecnofor'] },
  { file: 'frontend/src/routes/iocRoutes.jsx', prefixes: ['/ioc', '/lecciones'] },
];

export const RECUERDOS_LEGACY_SRC_DATA = [
  'frontend/src/data/acc/',
  'frontend/src/data/javaStudio/',
  'frontend/src/data/models/',
  'frontend/src/data/accentureReflexiones.js',
  'frontend/src/data/brainTopicsData.js',
  'frontend/src/data/eacDevKitData.js',
  'frontend/src/data/linkedinBlogData.js',
  'frontend/src/data/sepePhpProjectsData.js',
  'frontend/src/data/sqlMasterData.js',
  'frontend/src/data/tecnoforData.js',
  'frontend/src/data/tecnoforPythonData.js',
  'frontend/src/data/troubleshootingData.js',
];

export const RECUERDOS_LEGACY_PUBLIC_DATA = [
  'frontend/public/data/extra/',
  'frontend/public/data/brain/',
  'frontend/public/data/ioc/lecciones/',
  'frontend/public/data/glossary.json',
  'frontend/public/data/search_index.json',
  'frontend/public/data/tasks.json',
];

export const RECUERDOS_LEGACY_BACKEND = [
  'src/main/java/com/micampus/service/LegacyImporterService.java',
  'POST /api/scripts/import-legacy',
];

export function isRecuerdosPath(pathname = '') {
  return RECUERDOS_LEGACY_ROUTES.some((group) =>
    group.prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  );
}
