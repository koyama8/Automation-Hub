# Lighthouse CI

Esta camada mede desempenho, acessibilidade, boas práticas e SEO da aplicação Web sem misturar essas responsabilidades com os testes funcionais do Cypress.

## Execução local

Na pasta `apps/web`, execute:

```powershell
npm install
npm run lighthouse:healthcheck
npm run lighthouse
```

O comando identifica o sistema operacional. No Linux da integração contínua, utiliza o fluxo padrão do Lighthouse CI. No Windows, conecta a auditoria a uma instância controlada do Chrome para contornar uma falha conhecida do `chrome-launcher` ao remover perfis temporários. Nos dois ambientes são executadas três auditorias da rota `/admin/login`, com relatórios HTML e JSON em `lighthouse/reports/`.

Ao final, `summarize.cjs` calcula as medianas e cria `lighthouse/reports/summary.md` com os principais gargalos encontrados.
O relatório representativo também é copiado para `lighthouse/reports/index.html`, permitindo sua publicação em `https://koyama8.github.io/Automation-Hub/lighthouse/`.

## Estratégia de qualidade

As métricas utilizam a mediana de três execuções para reduzir variações do ambiente. Nesta primeira fase, os limites geram avisos e estabelecem uma linha de base sem bloquear entregas por oscilações pequenas. Após estabilização e correção dos principais gargalos, os limites prioritários devem ser promovidos de `warn` para `error`.

| Indicador                | Limite inicial |
| ------------------------ | -------------: |
| Performance              |            80% |
| Acessibilidade           |            90% |
| Boas práticas            |            90% |
| SEO                      |            80% |
| First Contentful Paint   |          1,8 s |
| Largest Contentful Paint |          2,5 s |
| Total Blocking Time      |         200 ms |
| Cumulative Layout Shift  |            0,1 |

Os relatórios produzidos localmente não são versionados. Na integração contínua, eles são publicados como artefatos para análise e rastreabilidade.
