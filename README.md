# Vision Tower — reconstrução fiel para GitHub Pages

Reconstrução independente baseada no frontend client-side capturado do Vision Tower. Mantém a estrutura visual, telas, diálogos, filtros, relatórios, Command Center, alertas, preferências e fluxos do frontend original.

## Publicação

Este projeto foi preparado para GitHub Pages. O site é servido como arquivos estáticos e não precisa de Python, Node ou servidor próprio.

## Dados e APIs locais

`mock-fetch.js` substitui as chamadas `/api/*` por uma camada fictícia executada no navegador. Os dados são armazenados em `localStorage`, por usuário/navegador. O login local aceita qualquer usuário e senha não vazios; o usuário demonstrativo inicial é `Marcus`.

A camada local cobre sessão, login, seleção de unidades, veículos, riscos, locais, viagens, usuários, histórico, auditoria, relatórios e versão da aplicação. O banco pode ser reiniciado removendo os dados do site no navegador.

## Limites

GitHub Pages não executa código de servidor, banco centralizado, WebSocket ou integração de rastreadores. Por isso, os dados são fictícios e locais. Esta cópia não acessa o backend, banco ou telemetria do sistema original.

## Estrutura

- `index.html`: frontend fiel com HTML, CSS inline e JavaScript original capturado.
- `assets/`: CSS, JavaScript e imagens locais.
- `local-data.js`: dados fictícios iniciais.
- `mock-fetch.js`: API local simulada.
- `planned-routes.js` e `indicators.js`: módulos locais para os fluxos opcionais.
