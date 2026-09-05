import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import Cupom from '../../../support/api_clients/cupons/CuponsApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarCupomFixoValido } from '../../../support/factories/cupons/CupomFactory'

let token
let cupom
let response

Before(() => {
  token = undefined
  cupom = undefined
  response = undefined
})

Given('que possuo acesso de administrador para gerenciar cupons', () => {
  const credenciais = obterCredenciaisAdministrador()

  return AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

When('solicito o cadastro de um cupom fixo ativo com limite de uso', () => {
  cupom = gerarCupomFixoValido()

  return Cupom.cupomAtivo(token, cupom).then((respostaRecebida) => {
    response = respostaRecebida
  })
})

Then('o cupom deve ser cadastrado com sucesso', () => {
  Cupom.validarCupomCadastrado(response)
})
