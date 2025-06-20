# Pokedex Angular/Ionic App
Este projeto é uma aplicação web **Pokedex** desenvolvida com **Angular 15+** e **Ionic 6+**, utilizando componentes standalone do Ionic para maximizar a modularidade e facilitar o carregamento sob demanda (lazy loading). A aplicação consome a API pública [PokeAPI](https://pokeapi.co/) para exibir informações detalhadas dos Pokémon, incluindo detalhes básicos, estatísticas e cadeia evolutiva.


## Estrutura e Arquitetura

* **Standalone Components**: Todos os componentes são construídos usando a funcionalidade standalone do Angular, eliminando a necessidade de módulos NgModule para componentes, simplificando a organização e potencialmente reduzindo o bundle.

* **Lazy Loading via Routes**: A navegação usa `loadComponent` para lazy loading das páginas e tabs, otimizando o desempenho.

* **Ionic UI**: Uso extensivo dos componentes `standalone` do Ionic (ex: `IonContent`, `IonCard`, `IonTabs`), garantindo responsividade e experiência nativa nos dispositivos.

* **RxJS e Reactive Patterns**: A comunicação com APIs usa `HttpClient` e RxJS (`forkJoin`, `switchMap`, `BehaviorSubject`) para composição reativa dos dados, sincronização do estado (ex: Pokémon selecionado), e manipulação eficiente de dados assíncronos.

* **Serviço Centralizado (`PokemonService`)**: Serviço singleton que orquestra o consumo da API, transformação de dados e estado compartilhado via `BehaviorSubject` para a seleção do Pokémon atual.

* **Roteamento Aninhado**: Uso de rotas aninhadas para detalhamento da página de Pokémon, separando tabs (`stats`, `evolution`) com seus próprios componentes carregados dinamicamente.


## Estilo de Codificação e Boas Práticas

* **Modularidade e Reutilização**: Divisão da UI em componentes pequenos e focados (ex: `PokemonTabsComponent`, `PokemonsStatsComponent`, `PokemonEvolutionComponent`).

* **Observables para Estado e Dados**: Uso do padrão Observer para manter a UI reativa a alterações no estado (ex: `selectedPokemon$`).

* **Separação de Responsabilidades**: A camada de serviço (`PokemonService`) é responsável por lidar com toda a lógica de negócio e comunicação externa, deixando os componentes focados na apresentação e interação.

* **Tratamento e Conversão de Dados**: Os dados da API são processados no serviço para serem facilmente consumidos pela UI (ex: conversão de unidades, formatação de IDs, limpeza de textos).


## Como Rodar o Projeto

1. **Instale as dependências**:

   ```bash
   npm install
   ```

2. **Execute o servidor de desenvolvimento com live reload**:

   ```bash
   ionic serve
   ```

## Testes Unitários

* A aplicação utiliza o framework padrão de testes do Angular (`@angular/core/testing`) com Karma e Jasmine.
* Os testes focam nos componentes principais, garantindo a criação dos componentes e algumas funções essenciais.
* Por serem componentes standalone, nos testes substituí o `declarations` por `imports` para evitar erros de compilação.

## Rotas Principais

| Path                     | Componente                  | Descrição                      |
| ------------------------ | --------------------------- | ------------------------------ |
| `/pokedex`               | `HomePage`                  | Tela inicial com lista e busca |
| `/pokedex/:id`           | `PokemonDetailPage`         | Página detalhe do Pokémon      |
| `/pokedex/:id/stats`     | `PokemonsStatsComponent`    | Aba estatísticas do Pokémon    |
| `/pokedex/:id/evolution` | `PokemonEvolutionComponent` | Aba cadeia evolutiva           |

