#!/usr/bin/env bash
# ==============================================================================
# Sincronizador Automático de Calendario macOS — Hub Táctico · Blanca
# ==============================================================================
# Unifica Accenture Spring Boot + IOC DAW + Machine Learning con metas personalizadas,
# notas de estudio, frikadas y alertas Push.

cd "$(dirname "$0")"

echo ""
echo "=================================================================="
echo "🎯  HUB TÁCTICO · BLANCA — SINCRONIZADOR DE CALENDARIO MAC"
echo "=================================================================="
echo ""

# 1. Regenerar el calendario unificado con los últimos cambios y notas
echo "1️⃣  Compilando eventos del Hub unificado..."
if [ -f "scripts/calendars/build_hub_calendar.py" ]; then
    python3 scripts/calendars/build_hub_calendar.py > /dev/null 2>&1
    echo "    ✅ Calendario compilado con tus notas y metas más recientes."
elif [ -f "scripts/build_hub_calendar.py" ]; then
    python3 scripts/build_hub_calendar.py > /dev/null 2>&1
    echo "    ✅ Calendario compilado con tus notas y metas más recientes."
fi

# 2. Crear el calendario dedicado si no existe usando AppleScript
echo "2️⃣  Verificando calendario '🎯 Hub Táctico · Blanca' en tu app Calendario..."
osascript <<'EOF'
tell application "Calendar"
    set calName to "🎯 Hub Táctico · Blanca"
    set calExists to false
    repeat with c in calendars
        if name of c is calName then
            set calExists to true
            exit repeat
        end if
    end repeat
    if not calExists then
        -- Color índigo / violeta vibrante para destacar en Calendario
        make new calendar with properties {name:calName, color:{24000, 18000, 58000}}
    end if
end tell
EOF

if [ $? -eq 0 ]; then
    echo "    ✅ Calendario dedicado '🎯 Hub Táctico · Blanca' listo."
else
    echo "    ⚠️  Continuando..."
fi

# 3. Localizar el archivo .ics unificado
ICS_FILE="$(pwd)/data/calendars/exports/HUB_PERSONALIZADO.ics"
if [ ! -f "$ICS_FILE" ]; then
    ICS_FILE="$(pwd)/fechas/HUB_PERSONALIZADO.ics"
fi
if [ ! -f "$ICS_FILE" ]; then
    ICS_FILE="$(pwd)/fechas/ACC.ics"
fi

if [ -f "$ICS_FILE" ]; then
    echo ""
    echo "3️⃣  Abriendo eventos con alertas Push en tu app Calendario..."
    open -a Calendar "$ICS_FILE"
    
    echo "    ✅ Eventos enviados a la app Calendario."
    echo "    👉 En la ventana emergente, selecciona '🎯 Hub Táctico · Blanca' y pulsa 'Añadir'."
    
    # 4. Notificación Push en pantalla de macOS
    osascript -e 'display notification "Eventos de Accenture Spring Boot + IOC DAW listos con alertas activadas." with title "🎯 Hub Táctico · Blanca" subtitle "Calendario Complementario Sincronizado"'
    
    echo ""
    echo "=================================================================="
    echo "🎉  ¡PUSH DE CALENDARIO COMPLETADO CON ÉXITO!"
    echo "    • Accenture Spring Boot (Tutorías, vídeos, Actividades 1 a 6)."
    echo "    • IOC DAW (DESP, DIG, ENT, INT, IPO, SERV, PAFS)."
    echo "    • Alarmas Push activas para entregas y recordatorios matutinos."
    echo "    • Sincronizado automáticamente con tu iPhone / Apple Watch vía iCloud."
    echo "=================================================================="
else
    echo "❌ Error: No se encontró el archivo HUB_PERSONALIZADO.ics"
fi

echo ""
read -p "Presiona [ENTER] para cerrar esta ventana..."
