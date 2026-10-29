# Aula QS33DS — actualización del 29 de octubre de 2026

## Cambios
- Portada React + TypeScript + Vite, con cuatro paneles: horario editable por día, notas, lista de alumnos con casillas y herramienta seleccionable. El botón «Divideix en 4» activa una cuadrícula 2×2 en escritorio; en móvil se apila para mantener la lectura.
- Conserva los doce accesos a aplicaciones, incluyendo FILES y Eines d’Aula. El portal anterior permanece en portal-classic.html.
- Conserva las notas rápidas antiguas del mismo origen al iniciar la nueva portada. Datos del dashboard en una clave nueva; exportación/importación JSON con validación. No se trasladan datos entre dominios automáticamente.
- FILES reutiliza la adaptación existente de QS33DS FILES NUBE v1.0, sin duplicar su motor. Inicio de sesión propio, carpetas, filtros, subida/descarga, vista previa, copia, movimiento, renombrado y papelera. Sin borrado definitivo. El original adjunto no se modifica.
- Bucket private-files comprobado: privado, límite 50 MB, RLS activo y políticas de lectura/escritura por UUID del propietario. Sin cambios de políticas, cuentas ni contraseñas. Las credenciales de Cloudflare no equivalen a Supabase Auth.
- Service worker: actualización de caché y exclusión de FILES, peticiones autenticadas y servicios externos.
- GitHub Actions compila y prueba React y FILES antes de preparar la publicación.

La integración conserva también la V1.2 de Eines recibida durante el trabajo: checklist de autonomía, mejoras móviles y pruebas de edición, marcado, deshacer y límite de pasos.

## Validación
- TypeScript estricto + compilación Vite: correctos.
- Suite existente de Eines: 40 representaciones del temporizador, ocho estilos, extremos numéricos, catálogo y tres módulos; estado de ventanas y contador: correctos.
- Diez pruebas del adaptador FILES: correctas (rutas privadas, paginación, cambio de sesión, colisiones, copia/movimiento y tamaño).
- Sintaxis de app.js, cloud.js y sw.js: correcta.
- Revisión del aislamiento en Supabase por consulta de metadatos, sin leer documentos.

## Límites
- No se ha realizado una prueba con dos cuentas reales de FILES. No se han solicitado ni generado contraseñas.
- La revisión visual local no pudo realizarse: el navegador remoto no puede alcanzar el servidor local. La compilación no sustituye la revisión visual ni táctil.
- Cloudflare aula no se actualiza mediante este repositorio de GitHub Pages. Conserva su protección de acceso y su despliegue actual.
- Las aplicaciones existentes conservan sus versiones y funciones; esta actualización se centra en el portal, Eines y el acceso a FILES.
