# Eines d’Aula 1.3.0 — 29/10/2026

## Cambios
Ocho entradas del catálogo disponibles. Observación reutiliza ObservaPT original mediante un adaptador React con iframe y enlace de apertura completa; no se duplica ni se modifica el registro. ObservaPT mantiene su almacenamiento local original, explicado en la interfaz.

Laboratorio de sílabas y banco de palabras comparten 26 entradas catalanas con separación explícita. El laboratorio ofrece respuestas 1–4, feedback, mostrar/ocultar sílabas y siguiente palabra. El banco permite buscar letras o sílabas escritas al principio, interior o final; ignora tildes. No se presenta como análisis fonológico automático.

Generador de pautas A4: 4–7 pautas, separación de 1, 1,5 o 2 cm, título/modelo y nombre/fecha; impresión o PDF a través del navegador. Vincula el gestor de referentes existente. Para mantener las medidas: A4 vertical, 100 %, sin cabeceras/pies. La medida CSS física se valida en código; no se afirma prueba con impresora física.

## Conservación
Se parte de main 4bfed2212ea95da05d0c3900597f70051b7dc90e e incorpora los cambios de dashboard de ese estado. Se mantienen los módulos, el gestor de ventanas y el build de dos páginas. Sin cambios en Cloudflare, autenticación o datos del alumnado. No se conecta ningún servicio nuevo.

## Verificación
npm test: pruebas anteriores y nuevas correctas. Banco sin duplicados, reconstrucción de palabras desde sílabas, filtros con resultados exactos, feedback y reinicio de pregunta, controles de altura/número de pautas y adaptador de ObservaPT. npm run build: TypeScript estricto y dos páginas Vite correctos. Las pruebas usan react-test-renderer con aviso de deprecación conocido. Se verifica la publicación y navegación después del despliegue.

## Límites
Banco inicial limitado, no diccionario completo; sin pictogramas ni audio en el laboratorio. ObservaPT requiere los archivos existentes del mismo portal y dispone de apertura alternativa. La impresión final depende del ajuste de escala del navegador. Los módulos de sesión conservan estado al minimizar, no al recargar. El resultado de despliegue y revisión del navegador se informa en la conversación.
