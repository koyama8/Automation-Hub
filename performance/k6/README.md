# Testes de desempenho da API com k6

Esta suíte mede uma rota pública de disponibilidade e uma consulta autenticada de produtos sem alterar dados do laboratório. O login ocorre uma vez no `setup`; apenas as rotas de leitura recebem carga.

## Perfis

- `smoke`: 1 usuário virtual e 1 iteração para validar ambiente, autenticação, checks e relatórios.
- `load`: 10 usuários virtuais constantes durante 30 segundos.

## Quality gates

- latência HTTP `p95 < 800 ms`;
- latência do health check `p95 < 500 ms`;
- requisições HTTP com falha `< 1%`;
- erros de contrato e negócio `< 1%`;
- checks aprovados `>= 99%`.

Os valores podem ser sobrescritos por `K6_VUS`, `K6_DURATION`, `K6_P95_MS`, `K6_MAX_FAILURE_RATE` e `K6_THINK_TIME_SECONDS`.

## Execução local

Com PostgreSQL e API ativos, abra o PowerShell na raiz do repositório:

```powershell
.\performance\k6\run.ps1 -Profile smoke
.\performance\k6\run.ps1 -Profile load
```

Também é possível executar diretamente:

```powershell
k6 run -e K6_PROFILE=load performance/k6/api-performance.js
```

Os arquivos `summary.md` e `summary.json` são gerados em `performance/k6/results/`. Eles são evidências de execução e não são versionados.

## Escopo e leitura dos resultados

O teste mede latência, volume, checks e falhas sob carga controlada no ambiente local ou no runner do CI. Ele não substitui teste de estresse, soak test, observabilidade de infraestrutura ou métricas reais de produção. Comparações de baseline devem utilizar hardware e condições equivalentes.
