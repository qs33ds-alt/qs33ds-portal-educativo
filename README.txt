QS33DS · Portal Educatiu PWA

Publicació prevista:
https://qs33ds-alt.github.io/qs33ds-portal-educativo/

Font Freda Diversitat:
https://qs33ds-alt.github.io/Font-Freda-Diversitat/

Chromebook / terminal:
unzip QS33DS_Portal_Educativo_PWA.zip -d QS33DS_Portal_Educativo_PWA
cd QS33DS_Portal_Educativo_PWA
git init
git branch -M main
git add .
git commit -m "Portal educatiu PWA + Font Freda Diversitat"
gh repo create qs33ds-portal-educativo --public --source=. --remote=origin --push
gh api -X POST repos/qs33ds-alt/qs33ds-portal-educativo/pages -f source[branch]=main -f source[path]=/

Actualitzacions:
git add . && git commit -m "Actualització portal" && git push
