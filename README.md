# insurmind_landing

Repositorio: https://github.com/insurmind/insurmind_landing

Landing pública de Insurmind (insurmind.ai). Un solo archivo: `index.html`.

- Sin build ni dependencias. Vercel la sirve tal cual.
- `assets/insurmind-tres-planos.svg`: fuente del diagrama de tres planos (también va inline en `index.html`).
- `CLAUDE.md` / `AGENTS.md`: instrucciones para cualquier agente de código que trabaje aquí. Léelas antes de tocar nada.

## Flujo

`dev` → PR a `staging` → PR a `main`. Nunca commits directos a `main`.

## Probar en local

Abre `index.html` en el navegador, o:

```bash
python3 -m http.server 8080
```

y entra en http://localhost:8080. Revisa a 1280 px y a 390 px, con y sin `prefers-reduced-motion`.

## Pendientes

Ver la sección «Backlog conocido» en `CLAUDE.md`.
