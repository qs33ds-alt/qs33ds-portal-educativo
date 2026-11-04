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


## 2026-11-04 · Fase 7 implementada y comprobada
- Puente manual completo: petición JSON desde V7.2, procesamiento con Python y resultado de vuelta al portal.
- Procesador descargable en `bridge/portal_bridge.py`; integrado también en QS33DS Local 0.9.9.18-rc1, Herramientas → Procesar petición del portal.
- Validación de semana ISO, métricas e identificador, límites de tamaño y salida sin sobrescritura.
- 151 pruebas Python (una omitida), 11 comprobaciones JavaScript y contrato Python → web correctos.
- GitHub Actions #104 completado correctamente. Prueba real del sitio publicado: descarga, procesamiento, rechazo de respuesta ajena y aceptación del resultado correcto (6/4/2).
- Sigue siendo un flujo voluntario con datos ficticios. No sincroniza agenda/PI/alumnos ni accede a bases del perfil. Ollama es opcional por consola y no se ha validado con un modelo real.
- Las tareas pendientes del informe anterior sobre otras aplicaciones, autenticación y datos reales siguen pendientes; la comprobación del circuito JSON queda resuelta por esta prueba.
