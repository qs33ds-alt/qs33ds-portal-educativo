# Portal Educatiu QS33DS · Fase 6 · Preparada (V6.0.0-rc1)

## Qué se entrega
- Portal web de demostración `portal/index.html`, que exporta manualmente una solicitud JSON con **contadores ficticios**. No lee `localStorage`, Supabase ni archivos del alumnado; CSP bloquea conexiones de red.
- Adaptador Python estándar `bridge/portal_bridge.py`: valida estrictamente esquema, campos, tamaños y tipos. Procesa `summarize_demo` sin modificar ningún dato del programa.
- Ejemplo `bridge/example_request.json` y pruebas `tests/test_portal_bridge.py`.
- Modo local determinista (sin Ollama) y modo de inferencia opcional **solo con datos sintéticos**, usando exclusivamente `http://127.0.0.1:11434/api/generate`.
- Respuesta JSON importable manualmente en la pantalla web. Sin automatismos ni acciones sobre el portal.

## Arranque en Windows
1. Descomprime el ZIP en una carpeta propia, fuera de `Documentos/QS33DS_Local`.
2. Abre el HTML `portal/index.html` o la ruta de prueba de GitHub Pages.
3. Descarga una petición de ejemplo (`qs33ds_peticio_demo.json`).
4. Abre PowerShell en la carpeta del paquete y ejecuta:
   `py bridge/portal_bridge.py qs33ds_peticio_demo.json --output resultat.json`
5. Selecciona `resultat.json` desde la web para leer la respuesta.
6. Si Ollama está instalado y arrancado, **opcional**:
   `py bridge/portal_bridge.py qs33ds_peticio_demo.json --ollama --model qwen3:1.7b --output resultat_ollama.json`

El adaptador no necesita librerías externas. La ejecución de Python no se enlaza aún automáticamente con QS33DS Local. Es un **módulo instalable por separado** para no alterar sus bases de datos ni interfaz.

## Seguridad
- Solo acepta `mode=demo`, una acción de resumen, campos concretos y números enteros 0–100.
- Rechaza campos de nombres, notas libres, datos personales, acciones adicionales, archivos grandes y respuestas no válidas.
- Nunca acepta credenciales, sesiones, tokens o datos de Supabase.
- No almacena ni sube datos. La transferencia es manual. `--output` crea un archivo nuevo y se niega a sobrescribir uno existente.
- No integra Font Freda Diversitat, KAIRO ni Panel Diari.
- No modifica `aula`, `aula2`, el `index.html` principal de GitHub o las aplicaciones de las fases anteriores.

## Limitaciones y siguiente etapa
La Fase 6 prepara un **contrato y un flujo funcional de pruebas**, no una integración de producción de alumnos, agenda real, PI real ni acceso automático a la IA. Es imprescindible una autenticación/autoridad de servidor y protección RGPD antes de introducir datos reales.

## Pruebas
Ejecuta `py -m unittest discover -s tests -v` en la carpeta descomprimida.
