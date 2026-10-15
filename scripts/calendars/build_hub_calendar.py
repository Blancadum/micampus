"""
============================================================================
@package     MiCampus.Calendars
@module      BuildHubCalendar
@description Generador y sincronizador de calendarios unificados iCalendar (.ics).
             Combina los archivos fuente de cada campus en una única exportación
             maestra libre de duplicados (UIDs únicos).

ESTRUCTURA DE DIRECTORIOS:
 - data/calendars/source/   : Fuentes individuales (.ics) de cada módulo o campus.
 - data/calendars/exports/  : Exportaciones consolidadas para importación del usuario:
     * calendario_miCampus.ics : Macro-calendario con los 172 eventos.
     * todo.ics                : Calendario de entregas pendientes gestionado por la API.

@author      Blanca
@version     2.0.0
@since       2026-10-08
============================================================================
"""

import os
import re
from pathlib import Path

def build_hub_calendar():
    project_root = Path(__file__).resolve().parents[2]
    source_dir = project_root / 'data' / 'calendars' / 'source'
    
    # Directorio de exportación en la raíz
    output_dir = project_root / 'data' / 'calendars' / 'exports'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Directorio público de la SPA para descarga web directa
    spa_output_dir = project_root / 'public' / 'data' / 'calendars' / 'exports'
    spa_output_dir.mkdir(parents=True, exist_ok=True)

    output_files = [
        output_dir / 'calendario_miCampus.ics',
        output_dir / 'HUB_PERSONALIZADO.ics',
        spa_output_dir / 'calendario_miCampus.ics',
        spa_output_dir / 'HUB_PERSONALIZADO.ics'
    ]

    # Ordered sources to merge
    source_files = [
        'ACC.ics',
        'PAFS.ics',
        'ENT.ics',
        'DES.ics',
        'DIG.ics',
        'INT.ics',
        'IPO.ics',
        'SERV.ics',
        'SALUD.ics',
        'ML.ics'
    ]

    all_events = []
    seen_uids = set()

    for filename in source_files:
        filepath = source_dir / filename
        if not filepath.is_file():
            continue

        try:
            with filepath.open('r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {filename}: {e}")
            continue

        # Extract all VEVENT blocks
        events = re.findall(r'BEGIN:VEVENT[\s\S]*?END:VEVENT', content)
        for ev in events:
            uid_match = re.search(r'UID:([^\r\n]+)', ev)
            uid = uid_match.group(1).strip() if uid_match else None

            if uid and uid in seen_uids:
                continue
            if uid:
                seen_uids.add(uid)

            all_events.append(ev)

    header = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Blanca//Calendario miCampus//ES
X-WR-CALNAME:🎯 Calendario miCampus · Blanca
X-WR-CALDESC:Calendario Unificado de miCampus (Accenture Spring Boot + IOC DAW). Enriquecido con metas, entregas y alertas push.
X-WR-TIMEZONE:Europe/Madrid
CALSCALE:GREGORIAN
"""

    footer = "\nEND:VCALENDAR\n"

    final_content = header + "\n" + "\n".join(all_events) + footer

    for out_file in output_files:
        with out_file.open('w', encoding='utf-8') as f:
            f.write(final_content)

    print(f"✅ Calendario miCampus unificado creado con éxito en:")
    for out_file in output_files:
        print(f"   -> {out_file}")
    print(f"   Total de eventos unificados: {len(all_events)}")

if __name__ == '__main__':
    build_hub_calendar()
