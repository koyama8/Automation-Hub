import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";
import { buildOptions, settings } from "./config.js";
import { buildSummaryOutputs } from "./reporter.js";

const businessErrors = new Rate("business_errors");
const healthDuration = new Trend("health_duration", true);
const productsDuration = new Trend("products_duration", true);

export const options = buildOptions();

function safeJson(response) {
  try {
    return response.json();
  } catch {
    return null;
  }
}

export function setup() {
  const healthResponse = http.get(`${settings.baseUrl}/api/health`, {
    tags: { endpoint: "setup_health" },
  });
  const healthBody = safeJson(healthResponse);
  const healthReady = check(healthResponse, {
    "setup: API responde 200": (response) => response.status === 200,
    "setup: banco esta conectado": () => healthBody?.database === "connected",
  });

  if (!healthReady) {
    throw new Error(
      `API indisponivel para o teste de desempenho: ${settings.baseUrl}`,
    );
  }

  const loginResponse = http.post(
    `${settings.baseUrl}/api/auth/login`,
    JSON.stringify({
      email: settings.adminEmail,
      password: settings.adminPassword,
    }),
    {
      headers: { "Content-Type": "application/json" },
      tags: { endpoint: "setup_login" },
    },
  );
  const loginBody = safeJson(loginResponse);
  const authenticated = check(loginResponse, {
    "setup: login responde 200": (response) => response.status === 200,
    "setup: token foi retornado": () => Boolean(loginBody?.data?.token),
  });

  if (!authenticated) {
    throw new Error(
      "Nao foi possivel obter o token administrativo no setup do k6.",
    );
  }

  return { token: loginBody.data.token };
}

export default function (data) {
  group("Health da API e do PostgreSQL", () => {
    const response = http.get(`${settings.baseUrl}/api/health`, {
      tags: { endpoint: "health" },
    });
    const body = safeJson(response);
    const successful = check(response, {
      "health: status 200": (result) => result.status === 200,
      "health: servico esta operacional": () => body?.status === "ok",
      "health: PostgreSQL esta conectado": () => body?.database === "connected",
    });

    businessErrors.add(!successful, { endpoint: "health" });
    healthDuration.add(response.timings.duration);
  });

  group("Consulta autenticada de produtos", () => {
    const response = http.get(`${settings.baseUrl}/api/products`, {
      headers: { Authorization: `Bearer ${data.token}` },
      tags: { endpoint: "products" },
    });
    const body = safeJson(response);
    const successful = check(response, {
      "produtos: status 200": (result) => result.status === 200,
      "produtos: contrato retorna uma lista": () => Array.isArray(body),
    });

    businessErrors.add(!successful, { endpoint: "products" });
    productsDuration.add(response.timings.duration);
  });

  sleep(settings.thinkTimeSeconds);
}

export function handleSummary(data) {
  return buildSummaryOutputs(data, settings);
}
