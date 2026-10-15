#!/bin/bash

echo "Migrando Hub de Accenture..."

# Crear carpetas destino
mkdir -p micampus/content/courses/acc/{modules,assignments,tutorias}
mkdir -p micampus/content/exercises/spring
mkdir -p micampus/content/resources/images/acc
mkdir -p micampus/apps/web/pages/AccentureHub

# Mover contenido silenciosamente (si existe)
if [ -d "accenture/contenidos/ejercicios-enunciados" ]; then
    mv accenture/contenidos/ejercicios-enunciados/* micampus/content/courses/acc/assignments/ 2>/dev/null
fi

if [ -d "accenture/contenidos/Ejercicios-completados" ]; then
    mv accenture/contenidos/Ejercicios-completados/* micampus/content/exercises/spring/ 2>/dev/null
fi

if [ -d "accenture/contenidos/frikadas-isra" ]; then
    mv accenture/contenidos/frikadas-isra/* micampus/content/courses/acc/tutorias/ 2>/dev/null
fi

# Mover los módulos M0, M1, M2...
mv accenture/contenidos/m* micampus/content/courses/acc/modules/ 2>/dev/null

if [ -d "accenture/contenidos/img" ]; then
    mv accenture/contenidos/img/* micampus/content/resources/images/acc/ 2>/dev/null
fi

if [ -d "accenture/dashboard" ]; then
    mv accenture/dashboard/* micampus/apps/web/pages/AccentureHub/ 2>/dev/null
fi

# Limpieza
rm -rf accenture/contenidos
rm -rf accenture/dashboard

echo "¡Migración de Accenture completada y limpia!"

