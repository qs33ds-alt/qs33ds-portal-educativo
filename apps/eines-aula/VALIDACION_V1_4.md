# Eines d’Aula 1.4.0 — 29/10/2026

## Resultado
Banco de vocabulario ampliable con alta manual, importación de archivo JSON o texto pegado, vista previa antes de incorporar, exportación del banco completo y descarga de modelo. Las nuevas entradas aparecen inmediatamente en el banco y en el laboratorio, que permite seleccionar todas, iniciales o personalizadas. Eliminar una palabra personalizada ofrece deshacer; las 26 iniciales se conservan.

## Arquitectura y conservación
Un único almacén React compartido (useSyncExternalStore), parser tipado y banco inicial existente. Persistencia local versionada y eventos storage entre pestañas. No hay servidor, autenticación ni cambios de datos de ObservaPT o del dashboard. Si el guardado falla, se mantiene la sesión y se informa para exportar copia. Un banco corrupto no se sobrescribe durante la carga. Las respuestas del laboratorio se reinician al cambiar de pregunta, incluida una lista de una sola palabra.

## Contrato JSON
schema: qs33ds.eines-vocabulary.v1; language: ca; words: lista de {word, syllables}. Hasta 500 palabras personalizadas y 26 iniciales; archivo máximo 1 MB. Palabras de hasta 40 caracteres, 1–8 sílabas explícitas, unión exacta incluyendo acentos. Normaliza mayúsculas y Unicode NFC. Rechaza duplicados internos, versiones/idiomas desconocidos, estructuras inválidas y conflictos con separaciones existentes. Una importación con conflicto no incorpora entradas parcialmente. La validación estructural no certifica la corrección lingüística; el docente debe revisar las separaciones.

## Pruebas
npm test: se conservan las pruebas de temporizadores, ventanas, autonomía, lenguaje y pautas. Se añaden validación de esquema, tamaño, duplicados, conflictos, límites y roundtrip máximo de 526 entradas; importación atómica, sincronización de componentes, guardado, eliminación, reinicio de pregunta y almacenamiento bloqueado. npm run build: TypeScript estricto y compilación de las dos páginas. react-test-renderer conserva su aviso de deprecación de desarrollo.

La revisión de la web publicada se informa en la conversación. No se afirma sincronización de vocabulario entre dispositivos: requiere exportar e importar. El vocabulario importado permanece en el dispositivo y no se sube a GitHub.
