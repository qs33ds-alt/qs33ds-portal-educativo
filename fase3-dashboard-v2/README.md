# Portal Educatiu QS33DS — Fase 3 · V3.0.0-rc1

**Vista de pruebas:** https://qs33ds-alt.github.io/qs33ds-portal-educativo/fase3-dashboard-v2/

## Alcance real
- Dashboard V2 recuperado con Eines V1.6.0.
- Seis aplicaciones existentes enlazadas a los HTML del repositorio: Lecto, Lecto Publisher, ObservaPT, Pictogrames, Referents d'Escriptura y Laboratori de Nombres.
- Dos aplicaciones **provisionales** (NO equivalentes a las originales): `agenda-proves.html`, calendario local con eventos y exportación/importación; `generador-pi-proves.html`, editor básico de pruebas con JSON local.
- La fuente real **Generador PI React v0.87.0** fue localizada en respaldo privado de Google Drive; **NO está compilada ni publicada**. El archivo fuente original contiene plantillas escolares que no deben exponerse públicamente. Requiere auditoría, compilación y controles de privacidad antes de desplegarse.
- La fuente original del módulo **Agenda V2** no pudo verificarse; el prototipo no recupera sus capacidades anteriores.

## Verificaciones y pendientes
1. Ocho enlaces de aplicaciones en el dashboard, con archivos de destino creados o existentes en GitHub.
2. Sintaxis JavaScript de los tres HTML nuevos verificada.
3. La navegación pública y el funcionamiento completo de las seis aplicaciones originales **NO se han verificado en browser público**.
4. Los dos prototipos requieren aceptación funcional en dispositivos reales; usan `localStorage` sin backend.
5. **Prohibido introducir datos reales de alumnado en GitHub Pages** hasta diseñar autenticación y tratamiento de datos conforme a privacidad.

## Límites
- No se modifica Cloudflare `aula` ni `aula2`, ni el `index.html` principal.
- Font Freda Diversitat, KAIRO y Panel Diari quedan fuera del portal, sin accesos.
- La Fase 3 es **candidata de integración de interfaz**: no debe anunciarse como recuperación total de Generador PI ni Agenda V2.

## Próxima entrega
- Recuperación original de Agenda V2 desde fuentes autorizadas.
- Compilación aislada, auditoría de datos y pruebas de Generador PI React.
- Pruebas automatizadas de los ocho accesos y sus funciones, y posterior validación en GitHub Pages.
