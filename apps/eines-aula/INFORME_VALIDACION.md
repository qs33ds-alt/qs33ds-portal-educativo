# Eines d’Aula QS33DS V1.1 — validación
Fecha: 29/10/2026. Entrega local; sin publicación en Cloudflare.

## Auditoría de origen
ZIP V1.0: 17 entradas, 29.718 bytes descomprimidos. React, TypeScript estricto, Vite. Tres módulos funcionales y cinco futuros. La carpeta components estaba vacía. No había pruebas ni archivo de bloqueo de dependencias. Se conservan catálogo, búsqueda, categorías, tema, menú, presets, pausa, reinicio, pantalla completa, secuencia editable y selección de turnos/parejas. Groups.tsx, Sequence.tsx y catalog.ts se mantienen byte a byte.

## Implementación
V1.1 separada. TimerVisual centraliza ocho representaciones sobre un solo contador existente. useWindows centraliza apertura, minimización, restauración, posición y orden; WindowManager reutiliza los tres módulos sin duplicarlos. Los componentes permanecen montados al minimizar. Sin almacenamiento adicional de alumnado ni conexiones externas nuevas. Incluye package-lock.json y dist.

## Comprobaciones realizadas
- npm install completado; npm run build: TypeScript estricto y Vite correctos.
- Renderizado estático: 40 combinaciones de estilos/progreso, ocho estilos únicos, extremos numéricos sin NaN, catálogo y render de tres módulos: correctos.
- Pruebas de estado React: abrir dos ventanas, minimizar/restaurar, evitar duplicados, traer al frente y limitar posición: correctas.
- Temporizador real: inicio, avance de un segundo, pausa estable y reinicio del preset: correctos.
- Comparación binaria de los tres archivos originales conservados y comprobación del ZIP: correctas.

## Límites de validación
Chromium no estaba instalado. La descarga del navegador devolvió archivos inválidos. Se incluye el guion browser.cjs, pero la interacción visual en navegador (arrastre táctil, pantalla completa, redimensionado, temas y solapamiento) sigue pendiente. Las pruebas React no sustituyen esa revisión. react-test-renderer emite aviso de deprecación; se usa solo en desarrollo.
No se afirma compatibilidad con componentes externos QS33DS: no estaban en el ZIP. Se reutiliza el código verificable adjunto. Los cinco módulos futuros mantienen su estado original; no se simula su funcionamiento. El contador no emite sonido. Se conserva la fuente web original; tiene alternativa local de sistema. No se ha publicado ni modificado la V1.0.

## Reproducción
npm ci
npm test
npm run build
npm run dev
Para navegador: instalar Playwright con Chromium y ejecutar node tests/browser.cjs con el servidor local activo. No hay scripts de despliegue.
