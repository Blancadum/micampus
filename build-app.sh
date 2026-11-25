#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "1/3 Instalando dependencias y compilando frontend React..."
cd "$ROOT_DIR/frontend"
npm install
npm run build

echo "2/3 Compilando y ejecutando tests Java + empaquetando MiCampus.jar..."
cd "$ROOT_DIR"
mvn clean package

echo "3/3 ¡Listo! Ejecutable generado en: $ROOT_DIR/target/MiCampus.jar"
echo "    Puedes iniciarlo haciendo doble clic en Iniciar-MiCampus.command"
