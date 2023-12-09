Poc para testes e estudos nextjs

Objetivo é criar um CRUD com o máximo de SSR. Acho que o maior desafio será o datagrid.

Lembre-se: react > componentes funcionais > composition pattern.

```
Respeite as camadas:
    |_src
      |_app Exclusiva para fins de roteamento
        https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-outside-of-app
        https://nextjs.org/docs/app/api-reference/file-conventions
      |_components abstratos/genericos
      |_services consumo de apis


Pontos de atenção:
  Route Segment Config: Não extende para subpastas e filhos, por exemplo no app/layout.tsx
  Revalidate itermitente quando run dev, buildava e dava start para testar melhor.