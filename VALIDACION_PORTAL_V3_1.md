# Portal Aula V3.1 — mejoras preparadas

Fecha: 29/10/2026. Base final: Eines V1.6 y revisión lingüística del repositorio, commit 90bdd56.

- Selector del cuarto panel con acceso directo a cada una de las ocho herramientas. Se reutiliza ToolContent tanto en ventanas como en el modo integrado.
- Ampliar/restaurar cada panel sin desmontar la herramienta; cierre de ampliación mediante Escape cuando el foco está en el portal.
- Preferencias locales de vista, día y herramienta, incluidas opcionalmente en las copias JSON existentes. Las copias anteriores siguen siendo compatibles.
- Edición de notas y nombres sin tener que borrar y crear otra entrada; se conservan las casillas. Límite coherente de 200 caracteres por nombre.
- Las rutas de herramientas y preferencias se validan contra el catálogo; no se permiten URLs externas en el panel.
- Aviso antes de cambiar de herramienta, ya que esa acción reinicia su sesión.

Validación: TypeScript estricto y Vite correctos. Suite existente de temporizador, ventanas, autonomía, lenguaje e importación de vocabulario correcta. Nueva suite workspace: render de los ocho módulos compartidos, acceso directo/integrado, parámetros inválidos, preferencias y enlaces de apertura independientes correctos. La revisión visual se realiza tras el despliegue.

La captura del usuario corresponde a otro sitio: Cloudflare /dashboard-v2#files, que no está en este repositorio. El inicio de sesión de Cloudflare fue rechazado después de la verificación de Google. No se ha aplicado ninguna limpieza a esa sección ni se han cambiado sus preferencias de copia o documentos.

## Limpieza de Fitxers en GitHub
Se incorpora una sección compacta del gestor existente: título, ampliar/restaurar, acceso en otra pestaña y ayuda desplegable. El iframe mantiene el gestor privado y sus operaciones. El modo integrado omite la barra de navegación superior repetida, conservando carpetas, papelera y acciones. No se cambian autenticación, permisos, ficheros ni ajustes de copias en Cloudflare.
