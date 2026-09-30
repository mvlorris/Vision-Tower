# Vision Tower — reconstrução local para GitHub Pages

Esta é uma reconstrução independente do Vision Tower em HTML, CSS e JavaScript puro. Ela foi adaptada para funcionar como **site estático no GitHub Pages**, sem Python, Node, PHP ou servidor próprio.

## Publicar no GitHub Pages

1. Crie um repositório público ou privado no GitHub.
2. Envie `index.html`, `styles.css`, `app.js`, `data.js`, `local-api.js` e `.nojekyll`.
3. Abra **Settings → Pages**.
4. Escolha **Deploy from a branch**, branch `main` e pasta `/root`.
5. Salve e abra a URL apresentada pelo GitHub.

A aplicação também pode ser testada abrindo `index.html` diretamente. Para evitar restrições do navegador, use `python3 -m http.server 8000` e acesse `http://127.0.0.1:8000`.

## Backend local no navegador

Como o GitHub Pages serve apenas arquivos estáticos, o projeto usa `local-api.js` como uma camada de dados no navegador. Ela persiste tudo em `localStorage` e simula operações de login, sessão, veículos, locais, viagens, usuários, alertas e histórico. O banco local é criado automaticamente na primeira abertura.

O login é demonstrativo: qualquer usuário e senha não vazios são aceitos. A sessão e as preferências ficam armazenadas somente no navegador do usuário. O botão de sair encerra a sessão local.

A aplicação mantém dados de demonstração em `data.js`, derivados do recorte visível usado na reconstrução. Os dados podem ser alterados localmente no navegador e restaurados limpando os dados do site.

## Funcionalidades

A versão inclui tela de login, painel de frota, métricas, distribuição operacional, busca, filtros, paginação, alertas, relatórios demonstrativos, preferências de tema/densidade, sessão local e uma camada de persistência local compatível com hospedagem estática.

## Limites

O GitHub Pages não executa backend, banco centralizado, WebSocket, integração de rastreadores ou tarefas agendadas. Portanto, esta versão não recebe posições reais em tempo real e cada usuário possui seu próprio banco local no navegador. Para dados compartilhados entre usuários, login real, sincronização, mapas ativos, geração de PDF no servidor ou telemetria, é necessário adicionar um serviço externo autorizado, como Supabase, Firebase ou uma API própria.

O projeto não contém credenciais reais nem tenta acessar o backend do site original.
