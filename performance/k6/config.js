function numberFromEnvironment(name, fallback) {
  const value = Number(__ENV[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const settings = Object.freeze({
  baseUrl: (__ENV.BASE_URL || "http://localhost:3030").replace(/\/$/, ""),
  adminEmail: __ENV.ADMIN_EMAIL || "qa@adminlab.com",
  adminPassword: __ENV.ADMIN_PASSWORD || "pwd123",
  profile: (__ENV.K6_PROFILE || "load").toLowerCase(),
  virtualUsers: numberFromEnvironment("K6_VUS", 10),
  duration: __ENV.K6_DURATION || "30s",
  p95LimitMilliseconds: numberFromEnvironment("K6_P95_MS", 800),
  maxFailureRate: numberFromEnvironment("K6_MAX_FAILURE_RATE", 0.01),
  thinkTimeSeconds: numberFromEnvironment("K6_THINK_TIME_SECONDS", 0.5),
  resultsDirectory: __ENV.K6_RESULTS_DIR || "performance/k6/results",
});

function scenarios() {
  if (settings.profile === "smoke") {
    return {
      api_smoke: {
        executor: "shared-iterations",
        vus: 1,
        iterations: 1,
        maxDuration: "30s",
        tags: { profile: "smoke" },
      },
    };
  }

  if (settings.profile !== "load") {
    throw new Error(
      `K6_PROFILE invalido: ${settings.profile}. Use smoke ou load.`,
    );
  }

  return {
    api_load: {
      executor: "constant-vus",
      vus: settings.virtualUsers,
      duration: settings.duration,
      gracefulStop: "5s",
      tags: { profile: "load" },
    },
  };
}

export function buildOptions() {
  return {
    scenarios: scenarios(),
    thresholds: {
      checks: [`rate>=${1 - settings.maxFailureRate}`],
      business_errors: [`rate<${settings.maxFailureRate}`],
      http_req_failed: [`rate<${settings.maxFailureRate}`],
      http_req_duration: [`p(95)<${settings.p95LimitMilliseconds}`],
      "http_req_duration{endpoint:health}": ["p(95)<500"],
      "http_req_duration{endpoint:products}": [
        `p(95)<${settings.p95LimitMilliseconds}`,
      ],
    },
    summaryTrendStats: [
      "avg",
      "min",
      "med",
      "max",
      "p(90)",
      "p(95)",
      "p(99)",
      "count",
    ],
    noConnectionReuse: false,
    userAgent: "qa-automation-lab-k6/1.0",
  };
}
