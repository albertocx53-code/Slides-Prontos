# Slides Prontos: código-fonte

Plataforma de aulas de Língua Portuguesa alinhadas à BNCC. Os professores podem apresentar, editar e baixar as aulas (PowerPoint editável, PDF dos slides, folha de atividades e pacote .zip).

## Como colocar no ar

1. Pegue o arquivo `dist/index.html`. Ele já é o site completo, num arquivo só.
2. Envie esse arquivo para qualquer hospedagem de site estático, por exemplo Netlify, Vercel, GitHub Pages ou a hospedagem que você já usa.
3. Pronto: o site funciona sem servidor e sem banco de dados.

Para testar no seu computador, basta abrir o `index.html` no navegador. É preciso estar conectado à internet, porque as fontes e as bibliotecas de PowerPoint, PDF e ZIP são carregadas de CDNs públicas.

## Organização das pastas

| Arquivo | O que tem |
|---|---|
| `src/catalog.js` | Lista dos 200 conteúdos: número, ano, eixo, título e habilidades BNCC |
| `src/bncc.js` | Descrição resumida de cada habilidade da BNCC usada no catálogo |
| `src/lessons/` | As 200 aulas completas: `lote1a.js` e `lote1b.js` (10 primeiras), `ano1.js` a `ano9.js` e `em1.js` a `em3.js` |
| `check.js` | Confere todas as aulas (rode `node check.js` depois de editar) |
| `src/illustrations.js` | Ilustrações próprias em SVG, livres de direitos autorais |
| `src/engine.js` | Desenho dos slides: o mesmo layout serve para a tela, o PowerPoint e o PDF |
| `src/exports.js` | Geração do PowerPoint, do PDF dos slides, da folha de atividades e do .zip |
| `src/app.js` | Site: catálogo, filtros, busca, visualizador, edição e modo apresentação |
| `src/style.css` | Visual do site, com tema claro e escuro |
| `build.py` | Junta tudo da pasta `src` num único arquivo HTML |
| `dist/index.html` | Site pronto para publicar |
| `dist/slides-prontos.html` | Mesma página, no formato usado dentro do Claude |

## Como adicionar ou alterar uma aula

1. Abra o arquivo do ano em `src/lessons/` (por exemplo, `ano7.js`) e encontre a aula pelo número (`AULAS[113]`).
2. Altere os textos. Para criar uma aula nova, copie uma existente, inclua o conteúdo no `catalog.js` e use o novo número.
3. Rode `node check.js` para conferir se está tudo certo.
4. Rode `python3 build.py` para gerar o `index.html` de novo.

Tipos de slide disponíveis: `capa`, `objetivos`, `pergunta`, `conceito`, `grade`, `exemplos`, `comparacao`, `texto`, `passos`, `mapa`, `atividade`, `quiz`, `gabarito`, `resumo`, `auto`, `desafio`, `encerramento`. Use `**palavra**` para deixar uma palavra em negrito.

## Limites desta versão

- As edições que cada professor faz ficam salvas no navegador dele. Para guardar as edições numa conta, com login, é preciso acrescentar um servidor com banco de dados.
- Não há cadastro, login nem cobrança. Essas partes dependem da plataforma de assinatura que você escolher.
