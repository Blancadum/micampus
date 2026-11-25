#!/usr/bin/env bash
PLIST="$HOME/Library/LaunchAgents/com.micampus.app.plist"
launchctl bootout "gui/$(id -u)/com.micampus.app" 2>/dev/null || true
rm -f "$PLIST"
echo "✅ Servicio com.micampus.app detenido y eliminado."
