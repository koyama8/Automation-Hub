function metricValues(data, metricName) {
  return data.metrics?.[metricName]?.values || {};
}

function number(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function percentage(value) {
  return `${(number(value) * 100).toFixed(2)}%`;
}

function milliseconds(value) {
  return `${number(value).toFixed(2)} ms`;
}

function thresholdRows(data) {
  const rows = [];

  Object.entries(data.metrics || {}).forEach(([metricName, metric]) => {
    Object.entries(metric.thresholds || {}).forEach(([expression, result]) => {
      rows.push(
        `| ${metricName} | \`${expression}\` | ${result.ok ? "APROVADO" : "REPROVADO"} |`,
      );
    });
  });

  return rows.length ? rows : ["| - | - | Nenhum threshold encontrado |"];
}

function markdownSummary(data, context) {
  const requestDuration = metricValues(data, "http_req_duration");
  const failedRequests = metricValues(data, "http_req_failed");
  const checks = metricValues(data, "checks");
  const requests = metricValues(data, "http_reqs");
  const iterations = metricValues(data, "iterations");
  const duration = number(data.state?.testRunDurationMs);

  return [
    "# Resultado de desempenho da API com k6",
    "",
    `- Perfil: ${context.profile}`,
    `- API: ${context.baseUrl}`,
    `- Duracao total: ${(duration / 1000).toFixed(2)} s`,
    `- Requisicoes: ${number(requests.count)}`,
    `- Iteracoes: ${number(iterations.count)}`,
    "",
    "## Indicadores",
    "",
    "| Indicador | Resultado |",
    "| --- | ---: |",
    `| Latencia media | ${milliseconds(requestDuration.avg)} |`,
    `| Latencia p90 | ${milliseconds(requestDuration["p(90)"])} |`,
    `| Latencia p95 | ${milliseconds(requestDuration["p(95)"])} |`,
    `| Latencia p99 | ${milliseconds(requestDuration["p(99)"])} |`,
    `| Taxa de requisicoes HTTP com falha | ${percentage(failedRequests.rate)} |`,
    `| Checks aprovados | ${percentage(checks.rate)} |`,
    "",
    "## Quality gates",
    "",
    "| Metrica | Limite | Resultado |",
    "| --- | --- | --- |",
    ...thresholdRows(data),
    "",
    "> O resultado representa o ambiente em que o teste foi executado e deve ser comparado com execucoes equivalentes.",
    "",
  ].join("\n");
}

function consoleSummary(data, context) {
  const requestDuration = metricValues(data, "http_req_duration");
  const failedRequests = metricValues(data, "http_req_failed");
  const checks = metricValues(data, "checks");
  const requests = metricValues(data, "http_reqs");

  return [
    "",
    "=== k6 API Performance ===",
    `Perfil: ${context.profile}`,
    `Requisicoes: ${number(requests.count)}`,
    `p95: ${milliseconds(requestDuration["p(95)"])}`,
    `Falhas HTTP: ${percentage(failedRequests.rate)}`,
    `Checks aprovados: ${percentage(checks.rate)}`,
    "Relatorios: performance/k6/results/",
    "",
  ].join("\n");
}

function htmlSummary(data, context) {
  const requestDuration = metricValues(data, "http_req_duration");
  const failedRequests = metricValues(data, "http_req_failed");
  const checks = metricValues(data, "checks");
  const requests = metricValues(data, "http_reqs");
  const rows = thresholdRows(data)
    .map((row) =>
      row
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean),
    )
    .map(
      ([metric, limit, status]) =>
        `<tr><td>${metric}</td><td><code>${limit.replaceAll("`", "")}</code></td><td class="${status === "APROVADO" ? "pass" : "fail"}">${status}</td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>k6 | API Performance</title>
    <style>
      :root { color-scheme: dark; font-family: Inter, system-ui, sans-serif; background: #090d16; color: #f4f7fb; }
      body { width: min(980px, calc(100% - 32px)); margin: 48px auto; }
      h1 { margin-bottom: 6px; } p { color: #9ba8bb; }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 28px 0; }
      .metric, table { border: 1px solid #29364a; border-radius: 12px; background: #111925; }
      .metric { padding: 18px; } .metric strong { display: block; color: #8f7cff; font-size: 1.4rem; }
      .metric span { color: #9ba8bb; font-size: .8rem; }
      table { width: 100%; border-collapse: collapse; overflow: hidden; }
      th, td { padding: 13px 16px; border-bottom: 1px solid #29364a; text-align: left; }
      th { color: #9ba8bb; } .pass { color: #22e6a2; font-weight: 800; } .fail { color: #ff6b81; font-weight: 800; }
      code { color: #d8d0ff; } footer { margin-top: 24px; color: #78869a; font-size: .82rem; }
      @media (max-width: 700px) { .grid { grid-template-columns: 1fr 1fr; } }
    </style>
  </head>
  <body>
    <h1>Desempenho da API com k6</h1>
    <p>Perfil <strong>${context.profile}</strong> executado contra ${context.baseUrl}.</p>
    <section class="grid">
      <div class="metric"><strong>${number(requests.count)}</strong><span>Requisicoes</span></div>
      <div class="metric"><strong>${milliseconds(requestDuration["p(95)"])}</strong><span>Latencia p95</span></div>
      <div class="metric"><strong>${percentage(failedRequests.rate)}</strong><span>Falhas HTTP</span></div>
      <div class="metric"><strong>${percentage(checks.rate)}</strong><span>Checks aprovados</span></div>
    </section>
    <h2>Quality gates</h2>
    <table><thead><tr><th>Metrica</th><th>Limite</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table>
    <footer>QA Automation Lab · resultado gerado automaticamente pelo k6</footer>
  </body>
</html>`;
}

export function buildSummaryOutputs(data, context) {
  const directory = context.resultsDirectory.replace(/\/$/, "");

  return {
    stdout: consoleSummary(data, context),
    [`${directory}/index.html`]: htmlSummary(data, context),
    [`${directory}/summary.json`]: JSON.stringify(data, null, 2),
    [`${directory}/summary.md`]: markdownSummary(data, context),
  };
}
