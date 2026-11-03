# Generador PI V0.88.3 · Recuperado, pendiente de despliegue

Se ha recibido el ZIP `Generador_PI_v0_88_3_SUPORTS(3).zip`, que contiene compilación Vite en `dist/` (React, CSS, JavaScript, plantillas y recursos). Versión del paquete `0.88.3`.

**No confundir con el prototipo `generador-pi-proves.html` de V7.1.** No se ha reemplazado el enlace actual, porque la aplicación completa todavía no está publicada en GitHub.

Para desplegar en `generador-pi/` se requieren todos los elementos de `dist/` (no solo `index.html`): `assets/`, `fonts/`, `model-psi-fontfreda.docx`, `model-psi-fontfreda.pdf`, `plantilla-horari-pi.csv`.

El ZIP también incluye tests y scripts de compilación, pero los tests automáticos no se pudieron ejecutar por ausencia de `esbuild` en este entorno y el navegador bloqueó el servidor localhost. Queda pendiente la prueba funcional real y comprobar privacidad de las plantillas antes de publicación pública.

No se altera Font Freda Diversitat ni Cloudflare. Prohibido usar datos reales del alumnado en GitHub Pages sin backend protegido.
