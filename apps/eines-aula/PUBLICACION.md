# Publicación de Eines d’Aula

Fuente React: apps/eines-aula. Aplicación publicada: /eines-aula/.

El flujo .github/workflows/pages.yml se ejecuta en cada push a main y manualmente. Instala con npm ci, valida con npm test, compila con npm run build y sustituye únicamente la carpeta /eines-aula del artefacto público por la compilación actual. Conserva los archivos del portal. No requiere subir dist manualmente para futuras actualizaciones.

GitHub Pages debe tener GitHub Actions como origen de publicación. Consultar el resultado de Actions antes de dar un cambio por publicado. No se modifica Cloudflare. La V1.0 original no se sobrescribe.
