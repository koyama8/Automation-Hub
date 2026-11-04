# QA Automation Lab — Engenharia de Automação de Testes

[![Quality Gate](https://img.shields.io/github/actions/workflow/status/koyama8/Automation-Hub/qa-ci.yml?branch=master&label=QUALITY%20GATE&style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/koyama8/Automation-Hub/actions/workflows/qa-ci.yml)
[![Relatório Cucumber](https://img.shields.io/badge/RELATORIO-CUCUMBER-00D084?style=for-the-badge&logo=cucumber&logoColor=white)](https://koyama8.github.io/Automation-Hub/)
[![Cypress Cloud](https://img.shields.io/badge/CYPRESS%20CLOUD-RUNS-04C38E?style=for-the-badge&logo=cypress&logoColor=white)](https://cloud.cypress.io/projects/2hmvki/branches/master/runs)
[![k6](https://img.shields.io/badge/PERFORMANCE-K6%20CI-F97316?style=for-the-badge&logo=k6&logoColor=white)](https://koyama8.github.io/Automation-Hub/k6/)
[![Lighthouse](https://img.shields.io/badge/PERFORMANCE-LIGHTHOUSE%20CI-F43F5E?style=for-the-badge&logo=lighthouse&logoColor=white)](https://koyama8.github.io/Automation-Hub/lighthouse/)
[![Download do projeto](https://img.shields.io/badge/BAIXAR%20PROJETO-ZIP-1677FF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/koyama8/Automation-Hub/archive/refs/heads/master.zip)

Laboratório de **Quality Engineering (QE) e SDET** com automação Web e API em Cypress, BDD/Cucumber, Page Objects, API Clients e integração contínua. Inclui testes de carga com k6, auditorias Web com Lighthouse e publicação de evidências no GitHub Pages.

## Visão geral

| Área                       | Objetivo                                 | Tecnologias                                   |
| -------------------------- | ---------------------------------------- | --------------------------------------------- |
| `apps/api/`                | API REST e automação de serviços         | Node.js, Express, Prisma, PostgreSQL, Cypress |
| `apps/web/`                | Interface, automação E2E e auditoria Web | HTML, CSS, JavaScript, Cypress, Lighthouse CI |
| `performance/k6/`          | Carga controlada e performance da API    | Grafana k6, checks, thresholds e relatórios   |
| `bruno/QA Automation Lab/` | Coleção para testes manuais de API       | Bruno                                         |
| `.github/workflows/`       | Pipeline de qualidade                    | GitHub Actions, Cypress Cloud, GitHub Pages   |

## Engenharia de Qualidade — QE & SDET

O projeto trata automação como software: os cenários de negócio permanecem legíveis nas Features, enquanto detalhes técnicos são distribuídos em camadas com responsabilidades claras. Essa organização reduz duplicação, facilita manutenção e permite que Web e API evoluam como suítes independentes.

As principais práticas de Engenharia de Qualidade aplicadas são:

- arquitetura BDD orientada por domínio, com rastreabilidade entre comportamento e implementação;
- Page Objects para encapsular seletores, ações e validações da interface;
- API Clients para centralizar endpoints, autenticação e contratos de resposta;
- Factories com dados sintéticos e sobrescritas para cenários positivos e negativos;
- preparação isolada de pré-condições, evitando dependência entre testes e IDs fixos;
- validações de RBAC, idempotência, concorrência otimista, revogação de sessão e regras de negócio;
- quality gates com ESLint, Prettier e bloqueio de testes focados por `.only`;
- evidências de execução no Cypress Cloud e relatórios Cucumber publicados pelo GitHub Pages;
- auditorias Lighthouse repetíveis, com medianas, limites de qualidade e diagnóstico automatizado;
- testes k6 com perfis smoke/load, carga não destrutiva, thresholds e relatórios reproduzíveis.

Nos cenários positivos, dados que determinam a elegibilidade devem ser explícitos. Por exemplo, pedidos de duas unidades precisam de estoque suficiente, sem depender de um valor aleatório.

## Arquitetura de automação

| Camada          | Organização                                                    |
| --------------- | -------------------------------------------------------------- |
| Web             | Feature → Steps → Page Objects → Interface                     |
| API             | Feature → Steps → API Clients → API REST                       |
| Dados           | Factories por domínio e fixtures de referência                 |
| Performance Web | Lighthouse CI → métricas e diagnóstico                         |
| Performance API | k6 → checks, thresholds e relatórios                           |
| CI/CD           | Quality gates → execução das suítes → artefatos → GitHub Pages |

Factories montam os dados; Page Objects e API Clients executam as ações. Steps existentes devem ser reutilizados quando representam o mesmo comportamento.

## Escopo automatizado

| Suíte | Domínios cobertos                                                                                                                                                             |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API   | Autenticação, sessão, usuários, clientes, produtos, carrinho, pedidos, pagamentos, contratos, cupons, evidências, permissões, recuperação de senha, relatórios e health check |
| Web   | Autenticação, usuários, clientes, carrinho, checkout, contratos, cupons, cenários, componentes, formulários, hobbies, personagens, upload e status do sistema                 |

## Relatórios e evidências

[![Portal](https://img.shields.io/badge/PORTAL-ABRIR-00D084?style=for-the-badge&logo=cucumber&logoColor=white)](https://koyama8.github.io/Automation-Hub/)
[![Web](https://img.shields.io/badge/WEB-RELATORIO-22E6A2?style=for-the-badge&logo=cypress&logoColor=white)](https://koyama8.github.io/Automation-Hub/web/)
[![API](https://img.shields.io/badge/API-RELATORIO-6CB6FF?style=for-the-badge&logo=cypress&logoColor=white)](https://koyama8.github.io/Automation-Hub/api/)

Os relatórios são publicados automaticamente após a aprovação dos jobs Web, API, Lighthouse e k6 na branch `master`. Quando algum deles falha, o portal mantém a última publicação bem-sucedida; consulte o GitHub Actions para verificar a execução mais recente.

## Estrutura principal

```text
qa-automation-lab/
├── .github/workflows/qa-ci.yml
├── apps/
│   ├── api/
│   │   ├── src/
│   │   └── cypress/
│   │       ├── e2e/
│   │       │   ├── features/
│   │       │   │   ├── auth/ carrinho/ clientes/ contratos/
│   │       │   │   ├── cupons/ evidencias/ pagamentos/ pedidos/
│   │       │   │   └── permissoes/ produtos/ relatorios/ senha/ sistema/ usuarios/
│   │       │   └── step_definitions/       # Steps organizados pelos mesmos domínios
│   │       └── support/
│   │           ├── api_clients/             # Comunicação com os serviços
│   │           ├── factories/               # Massas dinâmicas e reutilizáveis
│   │           └── data/                    # Dados de referência
│   └── web/
│       ├── dist/                             # Aplicação servida localmente
│       ├── lighthouse/                       # Execução, análise e documentação Lighthouse
│       ├── lighthouserc.cjs                  # URLs, métricas e limites da auditoria
│       └── cypress/
│           ├── e2e/
│           │   ├── features/
│           │   │   ├── auth/ carrinho/ cenarios/ checkout/ clientes/
│           │   │   ├── componentes/ contratos/ cupons/ formularios/
│           │   │   └── hobbies/ personagens/ sistema/ upload/ usuarios/
│           │   └── step_definitions/         # Steps organizados pelos mesmos domínios
│           └── support/
│               ├── factories/                # Massas de teste da interface
│               └── page_objects/             # Ações, seletores e validações Web
├── bruno/QA Automation Lab/
├── database/seed/
├── docs/
├── performance/k6/
│   ├── api-performance.js                  # Cenários smoke e carga da API
│   ├── config.js                           # Perfis, parâmetros e thresholds
│   ├── reporter.js                         # Relatórios HTML, Markdown e JSON
│   └── run.ps1                             # Execução local assistida
├── reports/site/
└── docker-compose.yml
```

## Baixar e executar

Pré-requisitos: **Node.js 24**, npm e Docker Desktop com Docker Compose. Para executar performance localmente, instale também o **Grafana k6**. Google Chrome é necessário para as auditorias Lighthouse locais. Git é necessário somente para a opção de clone.

Baixe pelo botão **BAIXAR PROJETO · ZIP** no topo, extraia o arquivo e abra um PowerShell na pasta extraída. Como alternativa, clone o repositório:

```powershell
git clone https://github.com/koyama8/Automation-Hub.git
cd Automation-Hub
```

Ordem de inicialização: **PostgreSQL → API → Web → testes Cypress**. Os comandos completos estão nas próximas seções.

## Execução local

Os serviços devem permanecer ativos durante a execução do Cypress. Os comandos utilizam PowerShell; inicie cada bloco em um terminal separado, a partir da raiz do projeto.

Suba o PostgreSQL e o PgAdmin:

```powershell
docker compose up -d
```

Prepare e execute a API:

```powershell
cd apps/api
npm ci
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm run prisma:generate
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

Execute a aplicação Web em outro terminal:

```powershell
cd apps/web
npm ci
npm run dev
```

Antes de iniciar os testes, confirme que os serviços respondem em `http://localhost:3030/api/health` e `http://localhost:3000`.

## Execução dos testes

API:

```powershell
cd apps/api
npx cypress run --browser electron --config video=false
```

Web:

```powershell
cd apps/web
npx cypress run --browser electron --config video=false
```

Auditoria Lighthouse da tela de login:

```powershell
cd apps/web
npm run lighthouse
```

O comando executa três medições, calcula as medianas e salva os relatórios HTML, JSON e o resumo técnico em `apps/web/lighthouse/reports/`.

Performance da API com k6, executada na raiz do repositório com PostgreSQL e API ativos:

```powershell
.\performance\k6\run.ps1 -Profile smoke
.\performance\k6\run.ps1 -Profile load
```

O smoke valida ambiente, autenticação e relatórios com uma iteração. O perfil load mantém 10 usuários virtuais durante 30 segundos e exige `p95 < 800 ms`, falhas abaixo de 1% e pelo menos 99% dos checks aprovados.

Feature específica, executada a partir de `apps/api`:

```powershell
npx cypress run --spec "cypress/e2e/features/usuarios/usuariosApi.feature"
```

As configurações executam exclusivamente as Features Cucumber em `cypress/e2e/features`.

Para verificar os quality gates locais, execute `npm run quality:check` dentro de `apps/api` e de `apps/web`.

## Padrão BDD

As palavras estruturais permanecem em inglês e o comportamento é descrito em português:

```gherkin
Feature: Usuários da API

  Scenario: CT01 - Listar todos os usuários cadastrados
    Given que possuo um token de administrador válido
    When solicito a listagem de usuários
    And recebo a resposta da listagem de usuários
    Then os usuários cadastrados devem ser retornados
```

Steps existentes devem ser reutilizados. Page Objects concentram seletores, ações e validações Web; API Clients concentram requisições e validações dos serviços.

### Massas de teste

Massas dinâmicas e reutilizáveis ficam em `apps/web/cypress/support/factories/` para Web e em `apps/api/cypress/support/factories/` para API. Na API, as Factories são organizadas por domínio, como `clientes/ClienteFactory.js` e `produtos/ProdutoFactory.js`, e permitem sobrescrever campos para preparar diferentes cenários.

Factories montam os dados; Page Objects e API Clients executam as ações. Dados estáticos de referência permanecem em `apps/web/cypress/fixtures/`; credenciais e segredos não devem ser armazenados nesses arquivos.

## Quality gates e CI/CD

O workflow [`qa-ci.yml`](.github/workflows/qa-ci.yml) executa:

- preparação do PostgreSQL, Prisma e massa inicial;
- suítes Cypress Web e API em jobs separados;
- auditoria Lighthouse CI com três execuções e limites monitorados;
- carga k6 da API com thresholds que bloqueiam regressões de desempenho;
- bloqueio de `.only` e registro no Cypress Cloud quando a chave de gravação está configurada;
- evidências em falhas, incluindo screenshots e logs da API e da execução Cypress API; vídeos estão desativados no CI;
- geração dos relatórios Cucumber Web/API;
- publicação dos relatórios Lighthouse como artefatos por 14 dias;
- publicação dos relatórios k6 em HTML, Markdown e JSON por 14 dias;
- publicação automática do portal no GitHub Pages.

A pipeline é executada em pushes e pull requests para `master`, por agendamento em dias úteis e também sob demanda. As suítes Web, API, Lighthouse e k6 são separadas para tornar falhas mais fáceis de diagnosticar e impedir que uma área esconda regressões da outra.

O registro da validação inicial de 11/09/2026, incluindo resultados e pendências daquele ambiente, está em [`docs/quality-execution.md`](docs/quality-execution.md). As execuções atuais estão disponíveis no GitHub Actions.

## Lighthouse CI

[![Abrir relatório Lighthouse](https://img.shields.io/badge/LIGHTHOUSE-ABRIR%20RELATÓRIO-F43F5E?style=for-the-badge&logo=lighthouse&logoColor=white)](https://koyama8.github.io/Automation-Hub/lighthouse/)

A rota pública `/admin/login` é auditada três vezes com perfil desktop. A mediana reduz oscilações do ambiente e alimenta limites iniciais de Performance, Acessibilidade, Boas Práticas, SEO, FCP, LCP, TBT e CLS. Nesta fase, os limites geram alertas; depois da estabilização da baseline, os indicadores prioritários poderão bloquear regressões no CI.

Baseline histórica da validação local:

| Indicador                | Resultado mediano |
| ------------------------ | ----------------: |
| Performance              |              100% |
| Acessibilidade           |              100% |
| Boas Práticas            |              100% |
| SEO                      |               83% |
| First Contentful Paint   |            255 ms |
| Largest Contentful Paint |            404 ms |
| Total Blocking Time      |              0 ms |
| Cumulative Layout Shift  |             0,000 |

O diagnóstico inicial registrou três oportunidades: adicionar uma meta description, disponibilizar um `robots.txt` válido e reduzir JavaScript não utilizado. Os números podem variar conforme máquina e versão do Chrome; por isso, os relatórios da pipeline são mantidos como artefatos para comparação.

## k6 — Performance da API

[![Abrir relatório k6](https://img.shields.io/badge/K6-ABRIR%20RELATÓRIO-F97316?style=for-the-badge&logo=k6&logoColor=white)](https://koyama8.github.io/Automation-Hub/k6/)

O perfil de carga mantém **10 usuários virtuais durante 30 segundos** e exercita rotas de leitura da API após validar o health check e a autenticação. Os thresholds reprovam a execução quando o `p95` alcança 800 ms, a taxa de falhas HTTP alcança 1% ou menos de 99% dos checks são aprovados.

Baseline histórica da validação local:

| Indicador               | Resultado |
| ----------------------- | --------: |
| Usuários virtuais       |        10 |
| Duração da carga        |      30 s |
| Requisições             |     1.110 |
| Iterações concluídas    |       554 |
| p95                     |  50,64 ms |
| Falhas HTTP             |        0% |
| Checks aprovados        |      100% |
| Iterações interrompidas |         0 |

Os resultados são gerados em HTML, Markdown e JSON. O botão acima e o cartão **Carga da API** abrem a última execução publicada no GitHub Pages. Os valores desta tabela são uma referência local histórica e variam conforme o ambiente e a carga. Os relatórios locais ficam em `performance/k6/results/`; essa carga não substitui testes de estresse ou resistência.

## Próximas evoluções

1. ampliar testes de contrato e validações com JSON Schema;
2. adicionar métricas de estabilidade e identificação de testes instáveis;
3. evoluir os testes k6 com perfis de estresse e resistência em ambiente dedicado;
4. evoluir os limites Lighthouse de monitoramento para bloqueio gradual de regressões;
5. adicionar verificações DAST com OWASP ZAP e quality gates específicos.

Esses itens são planejados e não fazem parte da cobertura implementada atual.

## Ambiente local

| Serviço    | URL                                |
| ---------- | ---------------------------------- |
| Web        | `http://localhost:3000`            |
| API        | `http://localhost:3030`            |
| Health     | `http://localhost:3030/api/health` |
| PostgreSQL | `localhost:5434`                   |
| PgAdmin    | `http://localhost:15434`           |

Credenciais exclusivas do laboratório local:

| Acesso  | E-mail            | Senha    |
| ------- | ----------------- | -------- |
| API/Web | `qa@adminlab.com` | `pwd123` |
| PgAdmin | `dba@pgadmin.com` | `dba`    |

## Bruno

Abra `bruno/QA Automation Lab` no Bruno Desktop e execute primeiro `Auth/01 - Login valido` para armazenar o token das rotas protegidas. A coleção inclui cenários positivos, negativos, permissões, perfis, idempotência e auditoria.

> Rotas protegidas utilizam `Authorization: Bearer <token>`. IDs podem mudar após limpezas ou seeds; prefira os valores retornados pela API.
