# QS33DS Portal Educatiu — V7.2 · Estabilització incremental

Data: 2026-11-03

## Abast
Còpia independent de `validacion-v7-1/`, sense substituir V7, V7.1, la portada principal, Cloudflare ni Font Freda Diversitat.

## Canvis aplicats
- S'han copiat les sis peces del microsite V7.1 a `validacion-v7-2/`.
- Dashboard: els dos enllaços al prototip PI es redirigeixen a `../generador-pi/`, que conté els recursos complets publicats per al Generador PI V0.88.3.
- El text informatiu del PI ja no el descriu com a prototip pendent de compilació.
- Es corregeixen etiquetes de navegació que encara deien V6.
- L'Agenda segueix sent demostració i no es presenta com l'Agenda V2 original.
- El pont d'IA local continua sent una prova JSON per fitxers, sense connexió automàtica al PC.

## Validació real pendent
1. Comprovar que GitHub Pages serveix `validacion-v7-2/` i `generador-pi/` correctament. La consulta HTTP externa ha fallat al verificador i no s'ha confirmat HTTP 200.
2. Provar les vuit Eines d'Aula i totes les aplicacions (obertura, errors a consola, mòbil).
3. Provar el PI complet amb dades fictícies, exportació PDF/DOCX i recàrrega.
4. Localitzar i recuperar l'Agenda V2 original; no confondre-la amb `agenda-proves.html`.
5. Provar exportació/importació de dades fictícies i el pont IA, inclosa la coherència de `request_id`.
6. Dissenyar Supabase Auth i polítiques RLS abans d'introduir dades identificables d'alumnat.

## Seguretat
**No introduir dades reals ni identificables d'alumnes.** V7.2 és un entorn de prova sense garanties d'autenticació ni sincronització segura.

## Reversibilitat
El directori V7.2 pot retirar-se sense alterar V7, V7.1 o `generador-pi/`.
