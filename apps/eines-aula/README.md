# Eines d'Aula · QS33DS V1.1.0

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

Checklist d'Autonomia, Registre d'Observació, Laboratori de Síl·labes, Banc de Paraules per Sons y Generador de Pautes.

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
