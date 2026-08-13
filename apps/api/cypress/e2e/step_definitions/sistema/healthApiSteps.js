import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import HealthApi from '../../../support/api_clients/HealthApi'

let response

Given('que a API esta configurada para consulta', () => {
  response = null
})

When('consulto o endpoint de saude da API', () => {
  HealthApi.consultarSaude().then((responseRecebida) => {
    response = responseRecebida
  })
})

When('recebo a resposta da requisicao', () => {
  HealthApi.validarRespostaRecebida(response)
})

Then('a API e o banco de dados devem estar disponiveis', () => {
  HealthApi.validarDisponibilidade(response)
})
