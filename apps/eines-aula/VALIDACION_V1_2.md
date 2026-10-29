# Validació V1.2.0 — 29/10/2026

Abast: activar Checklist d’Autonomia; conservar les tres eines anteriors i els vuit estils del temporitzador. Correcció de les finestres en pantalles estretes; versió centralitzada i comptadors dinàmics.

Reutilització: gestor de finestres i estils de controls de V1.1. S’ha inspeccionat Mi Rutina (qs33ds-alt/mi-rutina, index.html c3af4a73f7e282958df7fb5fefffdcd2a944b2ad): aporta llista editable, marcatge i progrés, adaptats a React. No s’ha duplicat el motor del temporitzador ni s’ha incrustat l’aplicació HTML.

Proves locals: npm test i npm run build correctes. Cobertura de 40 representacions del temporitzador, límits de posició, obrir/minimitzar/restaurar sense duplicats, comptador real amb pausa/reinici i checklist (editar, marcar, afegir, rebutjar espais buits, eliminar/desfer amb estat conservat, reiniciar i límit de 30). Les proves d’estat utilitzen react-test-renderer amb avís de deprecació conegut. La comprovació del navegador es realitza després del desplegament; el resultat es comunica a la conversa.

Privacitat: la checklist no es desa ni transmet; minimitzar conserva la sessió i recarregar reinicia. Sense canvis al portal principal, Cloudflare, autenticació, llistes d’alumnes ni integracions externes. Els quatre mòduls futurs continuen indicats com a preparació.
