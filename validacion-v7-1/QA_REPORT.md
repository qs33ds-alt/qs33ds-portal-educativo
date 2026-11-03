# QS33DS Portal Educatiu · V7.1 · Informe de validació

**Estat:** validació estàtica superada; publicació pública i proves integrals encara no verificades. **No és producció.**

## Canvis respecte V7
- Directori independent `validacion-v7-1/` sense substituir l'arrel, V7 ni Cloudflare.
- Pantalla IA local: títols de versió corregits; la importació de resposta exigeix haver generat una petició en la mateixa sessió i que el `request_id` coincideixi.
- Es conserven sis HTML d'aplicacions externes del repositori sense modificar-ne el codi.

## Comprovacions realitzades
- 5 HTML: sintaxi JavaScript correcta.
- 8 de 8 identificadors de `Eines d'Aula` localitzats en el Dashboard.
- 8 de 8 enllaços d'aplicacions presents; els sis fitxers HTML originals existents a GitHub.
- No hi ha cap referència a Font Freda Diversitat ni a l'URL del Worker privat en les sis fonts revisades.
- Fitxers d'Agenda i Generador PI: **prototips**, no funcionalitat original recuperada.
- Bridge IA: demostració per fitxers JSON; no realitza connexió automàtica amb l'ordinador.

## Limitacions no superades
1. L'URL pública de GitHub Pages no es pot consultar des de l'eina de verificació: no confirmar desplegament HTTP 200.
2. No hi ha proves de clics en navegador públic, navegació mòbil, accessibilitat amb lector de pantalla ni persistència després de recarregar.
3. No està verificat el funcionament complet de les sis aplicacions originals ni els imports/exports amb dades límit.
4. No hi ha autenticació ni sincronització segura; GitHub Pages és públic i localStorage és compartit dins del mateix origen. **Mai dades identificables d'alumnat**.

## Criteris de pas a estable
- Verificar el desplegament públic de V7.1.
- Prova real desktop i Android dels vuit accessos, de les vuit eines i de les còpies locals.
- Recuperar i validar el PI original i Agenda V2 o acceptar explícitament el seu caràcter de prototips.
- Dissenyar i provar autenticació, autorització i emmagatzematge privat abans de dades reals.

## Còpia de seguretat
La V7 conservada a Google Drive no ha estat substituïda ni esborrada.
