# Eines d’Aula 1.5.0 — 29/10/2026

## Cambios
Rutinas de autonomía y secuencias Ara i Després conservan automáticamente su contenido y estado de progreso en el navegador. Ambas usan un único hook de persistencia y un componente compartido de copia JSON, con exportación, importación por archivo o texto, vista previa antes de reemplazar y deshacer la última importación. La descarga JSON del vocabulario reutiliza ahora la misma utilidad común.

## Esquemas
qs33ds.eines-autonomy.v1: title (hasta 80 caracteres), steps (0–30 objetos con text de hasta 120 caracteres y done booleano).
qs33ds.eines-sequence.v1: now y next (hasta 90 caracteres), done booleano.
La importación rechaza otros tipos de documento, campos inválidos y archivos superiores a 1 MB. No convierte silenciosamente un tipo en otro. No incorpora datos parcialmente.

## Guardado
Claves independientes de vocabulario, dashboard y ObservaPT. No se escribe al montar una herramienta sin cambios. Una copia local corrupta deja disponible el contenido inicial y no se sobrescribe hasta una edición explícita. Si el navegador bloquea el guardado, conserva la sesión y avisa para exportar. No se promete sincronización entre pestañas o dispositivos para rutinas/secuencias; para otro dispositivo se exporta e importa. Se recomienda utilizar solo textos de actividades, sin datos personales.

## Pruebas
npm test: pruebas previas regeneradas contra el código actual y suite nueva de esquemas, límites, ausencia de escrituras iniciales, recuperación del progreso al remontar, conservación de datos corruptos sin sobrescribir, previsualización, recuperación, deshacer, rechazo de documentos incompatibles y almacenamiento bloqueado. npm run build: TypeScript estricto y Vite de dos páginas correctos. Se mantiene el aviso de deprecación de react-test-renderer en desarrollo.

Conserva las ocho herramientas, los ocho temporizadores y las funciones anteriores. Sin cambios en Cloudflare ni servicios externos. El resultado de publicación y revisión del navegador se comunica en la conversación.
