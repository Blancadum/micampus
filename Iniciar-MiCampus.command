#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

JAR_FILE="$DIR/target/MiCampus.jar"
if [ ! -f "$JAR_FILE" ]; then
  echo "No se encontró target/MiCampus.jar. Compilando primero..."
  bash "$DIR/build-app.sh"
fi

echo "Iniciando MiCampus... Se abrirá automáticamente en tu navegador."
java -jar "$JAR_FILE"
