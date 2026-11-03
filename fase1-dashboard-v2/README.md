# QS33DS · Portal Educatiu · Fase 1 (Dashboard V2)

**Estado:** base instalada en GitHub, sin sustituir la portada principal del repositorio.

## Ubicación
- Vista de pruebas: `/fase1-dashboard-v2/`
- HTML autónomo: `fase1-dashboard-v2/index.html`
- Aviso para herramientas pendientes: `fase1-dashboard-v2/pendiente.html`

## Funciones incluidas
- Apariencia recuperada a partir del HTML guardado del portal privado (no es copia exacta de su JS de servidor).
- Horario editable, selección de día y conservación de cambios en el almacenamiento del navegador.
- Tablón con creación, edición y eliminación de notas.
- Importación y exportación JSON local.
- Diseño adaptable al móvil según el CSS existente.
- Seis accesos con archivos comprobados en el repositorio: Lecto, Lecto Publisher, ObservaPT, Pictogrames, Referents d'escriptura, Laboratori de Nombres.
- Generador PI y Agenda V2 señalizados como **pendientes** (no enlaces falsamente funcionales).

## Seguridad y alcance
- No se ha modificado el Worker `aula`, el Worker `aula2` ni el index principal de GitHub.
- No hay credenciales, autenticación, sesiones, Supabase ni sincronización de producción.
- Se excluye completamente Font Freda Diversitat (también de los accesos).
- El almacenamiento local en GitHub Pages **no constituye privacidad de servidor**; no introducir datos reales de alumnado.

## Verificación
- HTML y código JavaScript recuperados; sintaxis JavaScript validada con `node --check`.
- Confirmada presencia de ocho tarjetas, seis rutas existentes y dos pendientes.
- La prueba visual y de ejecución con Chromium se intentó, pero el entorno bloqueó la navegación local; queda por realizar desde navegador normal.
- La disponibilidad pública mediante GitHub Pages está sujeta al despliegue de Pages y **no se ha confirmado con una prueba de carga externa**.

## Fase 2
Integración de Eines d'Aula V1.6.0 y pruebas de herramientas. Revisión posterior de rutas y datos de prueba.
