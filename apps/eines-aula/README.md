# Eines d'Aula · QS33DS V1.2.0

Portal React + TypeScript + Vite, independiente del Portal Educatiu existente.

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilación de producción

```bash
npm run build
```

El contenido compilado se genera en `dist/` y puede publicarse como sitio estático en Cloudflare Pages. No se ha publicado ni conectado a la cuenta QS33DS.

## Módulos disponibles

- Temporitzador Visual: cuenta atrás, pausa, reinicio y pantalla completa.
- Ara i Després: dos pasos editables y marcado de finalización; solo texto en esta versión.
- Selector d'Alumnes: selección de turnos sin repetición hasta agotar el conjunto y parejas aleatorias; utilizar alias.

## Módulos pendientes de integración

Registre d'Observació, Laboratori de Síl·labes, Banc de Paraules per Sons y Generador de Pautes.

**Integraciones pendientes de auditar:** Portal Educatiu QS33DS, LECTO PUBLISHER, LECTO ADAPT PUBLISHER, pictogramas, vocabulario y Supabase. No se ha copiado código de estos sistemas ni se ha supuesto compatibilidad.

## Arquitectura

- `src/catalog.ts`: registro único de herramientas y disponibilidad.
- `src/modules/`: herramientas funcionales aisladas.
- `src/App.tsx`: shell, navegación, catálogo, búsqueda, filtros y tema.
- `src/styles/main.css`: sistema de estilos responsive con variables y modos claro/oscuro.

## Privacidad

No hay backend, autenticación ni almacenamiento de listas de alumnos. El selector es efímero. Se recomienda usar alias. La preferencia de tema se guarda en localStorage.

## Limitaciones conocidas

La versión 1.0 no dispone de pictogramas, audio, exportación, persistencia, sincronización ni seguimiento de alumnado. El temporizador no emite sonido. Se requiere una revisión de accesibilidad y pruebas de navegador antes de publicación.

## V1.1: ventanas y temporizador
Ocho estilos: circular, arena, digital, barra, segmentos, vela, órbita y escalera.
Las tres herramientas usan un gestor compartido. Arrastra la cabecera o enfócala y usa las flechas. Minimiza con «−» y restaura desde el lateral inferior derecho o desde el catálogo. Cada herramienta tiene una única instancia: minimizar conserva el estado y el temporizador sigue activo. Recargar la página reinicia las herramientas.

Instalación reproducible: `npm ci`. Validación: `npm test` y `npm run build`.
Los tests .mjs son las versiones ejecutables de los .tsx incluidas para no necesitar un compilador de tests adicional. El test browser.cjs requiere instalar Playwright y Chromium; no se ejecutó con éxito en este entorno. Ver INFORME_VALIDACION.md.

## V1.2
Checklist d’Autonomia activa: títol i passos editables, marcar/desmarcar, progrés, afegir fins a 30 passos, eliminar amb opció de desfer i tornar a començar. Estat de sessió conservat en minimitzar; sense desar dades personals. Finestres ajustades a l’amplada visible en obrir i moure. Comptadors del catàleg derivats de les eines actives.
Adaptació funcional de la llista i el progrés de https://github.com/qs33ds-alt/mi-rutina (index.html, c3af4a73f7e282958df7fb5fefffdcd2a944b2ad). La font és HTML, sense components React exportables; es reutilitza el gestor, la superfície i els controls React existents d’Eines d’Aula.


## V1.3.0
Ocho herramientas activas. Observación reutiliza ObservaPT; sílabas y palabras usan src/data/vocabulary.ts; pautas produce A4 con altura de escritura configurable y acceso al gestor de referentes. Ver VALIDACION_V1_3.md para alcance y pruebas. Se conserva el dashboard incorporado al repositorio.

## V1.4.0
Banco ampliable y compartido con el laboratorio. Añadir palabras manualmente o importar JSON (archivo o texto), revisar vista previa y exportar copias. El modelo se descarga desde la herramienta. Esquema y pruebas documentados en VALIDACION_V1_4.md. Persistencia en el navegador, sin nube ni transmisión de las palabras añadidas.

## V1.5.0
Rutinas y secuencias se conservan al recargar. Copias JSON compartidas: exportar, importar, revisar y deshacer. Se guardan en el navegador; no en la nube. Ver VALIDACION_V1_5.md.
