# Eines d’Aula 1.6.0 · validación

Laboratorio ampliado a 177 palabras y tres modalidades: contar sílabas, marcar límites entre letras y ordenar fichas silábicas. Filtros por origen, número de sílabas y diez temas; mayúsculas/minúsculas, palabra anterior/siguiente, selección al azar y solución bajo demanda. El banco sigue compartido con vocabulario e importaciones JSON; los ejercicios se reinician al cambiar de pregunta o de modalidad. Las palabras importadas sin tema aparecen al seleccionar cualquier tema.

Se conservan las ocho herramientas, temporizadores, ventanas, copias y guardado local. Se revisan rótulos de las aplicaciones y del dashboard sin modificar almacenamiento ni rutas. Ver REVISION_LINGUISTICA_V1_6.md para alcance, fuentes y límites.

Pruebas: npm test conserva todas las suites previas y añade comprobaciones de las 177 entradas (unicidad, reconstrucción, vocales, temas), casos ortográficos concretos, evaluación de límites/orden sin índices repetidos, respuestas correctas/incorrectas, filtros vacíos, reinicio y minúsculas. Se ajustan límites del parser al nuevo tamaño del banco más 500 personalizadas. npm run build valida TypeScript estricto y las dos páginas de Vite. react-test-renderer mantiene su aviso de deprecación conocido. La revisión posterior del navegador se comunica en la conversación.

No se han añadido audio, pictogramas o datos de seguimiento del alumnado. Las explicaciones son apoyos didácticos; las importaciones validan estructura, no certifican segmentación lingüística.

La revisión de publicación detectó una copia anidada de recursos del dashboard cuando assets ya existía. Se corrigió el flujo para copiar su contenido y comprobar la presencia del JavaScript de entrada. El portal volvió a renderizarse y se verificaron sus rótulos corregidos. Se ajustaron también los mensajes de una palabra/una entrada para respetar singular y plural.
