import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import RelatoriosApi from '../../../support/api_clients/relatorios/RelatoriosApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'

let token
let response

Before(() => {
  token = undefined
  response = undefined
})

Given('que possuo um token de administrador para relatorios', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

Given('que utilizo um token invalido nos relatorios', () => {
  token = 'token-invalido'
})

When('solicito o resumo geral dos relatorios', () => {
  return RelatoriosApi.consultar(token, 'summary', {}, false).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When(
  'solicito o relatorio de {string} com pagina {int} e limite {int}',
  (recurso, pagina, limite) => {
    return RelatoriosApi.consultar(token, recurso, {
      page: pagina,
      limit: limite,
      sortBy: 'id',
      sortOrder: 'asc',
    }).then((respostaRecebida) => {
      response = respostaRecebida
    })
  },
)

When(
  'solicito o relatorio de {string} com o filtro {string} igual a {string}',
  (recurso, filtro, valor) => {
    return RelatoriosApi.consultar(token, recurso, {
      [filtro]: valor,
      page: 1,
      limit: 10,
    }).then((respostaRecebida) => {
      response = respostaRecebida
    })
  },
)

When(
  'solicito o relatorio de {string} entre {string} e {string} com status {string}',
  (recurso, startDate, endDate, status) => {
    const parametros = { startDate, endDate, page: 1, limit: 10 }

    if (status) parametros.status = status

    return RelatoriosApi.consultar(token, recurso, parametros).then((respostaRecebida) => {
      response = respostaRecebida
    })
  },
)

When('solicito a exportacao do relatorio de {string}', (recurso) => {
  return RelatoriosApi.consultar(token, `${recurso}/export`).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito o relatorio com uma pagina invalida', () => {
  return RelatoriosApi.consultar(token, 'clients', { page: 0, limit: 101 }, false).then(
    (respostaRecebida) => {
      response = respostaRecebida
    },
  )
})

When('solicito o relatorio com um periodo invalido', () => {
  return RelatoriosApi.consultar(
    token,
    'clients',
    { startDate: '2026-12-31', endDate: '2026-01-01' },
    false,
  ).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

When('solicito o relatorio com um status invalido', () => {
  return RelatoriosApi.consultar(token, 'clients', { status: 'blocked' }, false).then(
    (respostaRecebida) => {
      response = respostaRecebida
    },
  )
})

Then('o relatorio deve ser retornado com sucesso', () => {
  RelatoriosApi.validarConsulta(response)
})

Then('o arquivo CSV deve ser retornado com sucesso', () => {
  RelatoriosApi.validarExportacao(response)
})

Then(
  'a consulta do relatorio deve ser rejeitada com status {int} e mensagem {string}',
  (status, mensagem) => {
    RelatoriosApi.validarErro(response, status, mensagem)
  },
)
