#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
PLIST="$HOME/Library/LaunchAgents/com.micampus.app.plist"
JAVA_BIN="$(command -v java)"

mkdir -p "$HOME/Library/LaunchAgents" "$DIR/micampus-data"

cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.micampus.app</string>
  <key>WorkingDirectory</key>
  <string>${DIR}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${JAVA_BIN}</string>
    <string>-jar</string>
    <string>${DIR}/target/MiCampus.jar</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>MICAMPUS_AUTO_OPEN_BROWSER</key>
    <string>false</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>${DIR}/micampus-data/micampus.out.log</string>
  <key>StandardErrorPath</key>
  <string>${DIR}/micampus-data/micampus.err.log</string>
</dict>
</plist>
EOF

launchctl bootout "gui/$(id -u)/com.micampus.app" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "✅ Servicio silencioso instalado y activo en http://localhost:8090"
