# Portal Educatiu QS33DS · Fase 7 · V7.0.0-rc1

**Estat: auditoria de l'entorn de proves finalitzada. No és una versió autoritzada per dades reals d'alumnat.**

- Inici: `index.html`
- Agenda provisional: `agenda-proves.html`
- Generador PI provisional: `generador-pi-proves.html`
- Gestor de còpies locals: `dades.html`
- Pont IA local de demostració: `ia-local.html`
- Adaptador Python amb validació: `bridge/portal_bridge.py`

## Correccions d'auditoria
- Eines V1.6: l'accés d'autonomia usa `?tool=autonomy`, no `?tool=checklist`.
- Python: validesa estricta del tipus `context.focus`; resposta Ollama inesperada gestionada.
- Importació de còpies: comprovacions més estrictes dels camps i dels límits.

## Proves
- 18/18 tests executats sobre el paquet local del pont (9 originals + 8 d'enduriment + 1 Chromium).
- 5 HTML amb sintaxi JS verificada; 8 identificadors Eines comprovats.
- Prova de navegador del pont d'IA amb exportació, processament Python, importació i format mòbil superada.
- **No verificat:** desplegament públic real de GitHub Pages, la totalitat de les sis apps originals, Ollama real a Windows ni la recuperació funcional de les apps originals PI i Agenda.

## Precaucions
GitHub Pages és públic; `localStorage` es comparteix per origen, no per carpetes. Sense autenticació de servidor ni protecció de dades privades. Feu servir exclusivament dades fictícies. No s'ha modificat `aula`, `aula2`, l'index principal ni les aplicacions independents, inclosa Font Freda Diversitat.

## Reversió
F6 disponible a `../fase6-dashboard-v2/`. Els canvis F7 estan aïllats en aquesta carpeta.

**Decisió:** Fase 7 tancada com a candidata de proves; desplegament amb dades reals bloquejat.
