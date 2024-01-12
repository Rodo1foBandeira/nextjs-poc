Poc para testes e estudos nextjs

Objetivo é criar um CRUD com o máximo de SSR. Acho que o maior desafio será o datagrid.
Datagrid funciona pela query strings ^_^ benefícios:
  Entrar em edição ou adição, ao dar um forward não perde paginação, filtragem, etc
  Fácil compartilhamento de uma filtragem
  Alterar pagina e quantidade por pagina

Lembre-se: react > componentes funcionais > composition pattern.

```
Respeite as camadas:
    ├─src
    |  ├─app // Exclusiva para fins de roteamento
    |  |  ├─ minhaPagina
    |  |  |   ├─ page.tsx
    |  |  |   ├─ actions.ts // Não utilizar diretamente para fins de busca
    |  ├─ui // componentes abstratos e reutilizáveis
    |  ├─lib // (1)funções abstratas e reutilizáveis, enums, busca de dados
    |  |  ├─pages
    |  |  |  ├─minhaPagina.ts // (1) especificas dela
    |  |  |  ├─minhaPagina2.ts // (1) especificas dela
    |  |  ├─utils // (1) geral
    |  |  ├─enums // geral
    |  ├─models // Classes e interfaces


Conclusões:
  Revalidações começam a funcionar depois de 30 segundos.
  Nas revalidações, mesmo requisitando api mostra na tela o dado cacheado
  loading.tsx na raiz app não replica para subrotas