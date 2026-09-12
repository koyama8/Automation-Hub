# Registro de execução e pendências de qualidade

Data da revisão: **11/09/2026**.

## Escopo concluído

- automação funcional Web e API estruturada com Cypress, Cucumber e BDD;
- performance Web com Lighthouse CI;
- performance da API com k6, incluindo perfis smoke e load;
- execução k6 não destrutiva sobre health check e consulta autenticada de produtos;
- thresholds para latência, falhas HTTP, erros de negócio e checks;
- relatórios k6 em HTML, Markdown e JSON;
- jobs independentes e publicação de evidências no GitHub Actions e GitHub Pages.

## Resultado desta validação

| Validação                             | Resultado              | Evidência                                                                                        |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| ESLint e Prettier Web                 | Aprovado               | `npm run quality:check` em `apps/web`                                                            |
| ESLint e Prettier API                 | Aprovado               | `npm run quality:check` em `apps/api`                                                            |
| Sintaxe e perfis k6                   | Aprovado               | `k6 inspect` para smoke e load                                                                   |
| Executor k6 smoke                     | Aprovado               | 1 VU, 1 iteração e 100% dos checks no servidor de contrato controlado                            |
| Executor k6 load                      | Aprovado               | 10 VUs por 30 s, 554 iterações, 1.110 requisições, p95 de 50,64 ms e 100% dos checks na API real |
| Relatórios k6                         | Aprovado               | HTML, Markdown e JSON gerados corretamente                                                       |
| Configuração GitHub Actions           | Aprovado               | YAML válido com job independente `k6-performance`                                                |
| Instalação Cypress                    | Aprovado               | binário Cypress 14.5.4 verificado                                                                |
| Cypress Web/API contra aplicação real | Pendente nesta revisão | Execução funcional completa não repetida após a implementação do k6                              |
| k6 contra API real                    | Aprovado               | 0% de falhas HTTP e nenhuma iteração interrompida                                                |

O resultado do perfil load constitui a baseline local inicial da API. Comparações futuras devem utilizar condições equivalentes de máquina, dados e infraestrutura.

## Observação sobre o ambiente local

Durante a revisão inicial, o Docker Desktop apresentou um bloqueio temporário no arquivo interno `sailor-ingest.sock`. Nenhum volume, banco ou dado do laboratório foi removido. Após a normalização do ambiente, a carga k6 foi executada com sucesso contra a API real. A pipeline utiliza um PostgreSQL limpo em runner Linux e não depende do estado do Docker local.

## Execução completa do ambiente

Na raiz do repositório:

```powershell
docker compose up -d

cd apps/api
npm run prisma:generate
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

Em outro terminal, na raiz:

```powershell
.\performance\k6\run.ps1 -Profile smoke
.\performance\k6\run.ps1 -Profile load
```

Para executar as suítes funcionais completas:

```powershell
cd apps/api
npx cypress run --browser electron --config video=false

cd ..\web
npx cypress run --browser electron --config video=false
```

Utilize `performance/k6/results/summary.md` para consultar a execução local mais recente e comparar regressões futuras.
