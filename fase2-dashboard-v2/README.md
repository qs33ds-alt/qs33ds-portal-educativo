# QS33DS · Portal Educatiu · Fase 2 (V2.0.0-rc1)

La portada Dashboard V2 integra l'accés a Eines d’Aula V1.6.0 i vuit enllaços directes a les eines React existents al repositori.

**URL de proves:** https://qs33ds-alt.github.io/qs33ds-portal-educativo/fase2-dashboard-v2/

## Eines
- Temporitzador visual: `../eines-aula/?tool=timer`
- Ara i després: `../eines-aula/?tool=sequence`
- Selector d’alumnes: `../eines-aula/?tool=groups`
- Checklist d’autonomia: `../eines-aula/?tool=checklist`
- Registre d’observació: `../eines-aula/?tool=observation`
- Separació de síl·labes: `../eines-aula/?tool=syllables`
- Banc de paraules: `../eines-aula/?tool=words`
- Generador de pautes: `../eines-aula/?tool=guidelines`

Els arxius compilats originals es mantenen a `eines-aula/index.html`, `eines-aula/assets/index-CNLdszOX.js`, `eines-aula/assets/toolLaunch-CnX9ZloY.js` i `eines-aula/assets/index-CDHIrBDV.css`. No s'ha modificat el codi original de les eines.

## Protecció
No s'ha modificat el Worker Cloudflare `aula` ni `aula2`, ni l'arrel de GitHub, ni la Fase 1. Font Freda Diversitat, KAIRO i Panel Diari no s'inclouen. No hi ha connexions a Supabase o dades de producció. Aquest portal GitHub Pages és públic: fer servir exclusivament dades fictícies.

## Proves
Validats renderitzat del HTML amb Chromium, vuit enllaços d'eines, nou accessos d'aplicacions, sense desbordament en desktop 1400x900 i mòbil 390x844, creació d'una nota, edició d'un tram de l'horari i absència d'errors JS. La navegació externa completa Pages → React no s'ha pogut comprovar des d'aquest navegador; resta verificació manual amb navegador normal.

## Llindar fase 3
Recuperar Generador PI i Agenda V2, enllaçar la resta d'aplicacions verificades, validar exportació/importació i decidir arquitectura de dades privades.
