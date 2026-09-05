import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import AuthApi from '../../../support/api_clients/auth/AuthApi'
import SenhaApi from '../../../support/api_clients/senha/SenhaApi'
import UsuariosApi from '../../../support/api_clients/usuarios/UsuariosApi'
import { gerarUsuarioValido } from '../../../support/factories/usuarios/UsuarioFactory'

let token
let usuario
let response
let tokenRecuperacao
let novaSenha

Before(() => {
  token = undefined
  usuario = undefined
  response = undefined
  tokenRecuperacao = undefined
  novaSenha = undefined
})

Given('que possuo um token de administrador para o fluxo de senha', () => {
  const credenciais = obterCredenciaisAdministrador()

  AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token
  })
})

Given('que existe um usuario cadastrado para recuperacao de senha', () => {
  usuario = gerarUsuarioValido({ password: 'Bruno@123' })

  return UsuariosApi.cadastrarUsuario(token, usuario).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
  })
})

When('solicito a recuperacao de senha', () => {
  SenhaApi.solicitarRecuperacaoSenha(usuario.email).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(200)
    response = respostaRecebida
  })
})

When('recebo a resposta da solicitacao de recuperacao de senha', () => {
  SenhaApi.validarRespostaRecebida(response)
})

Then('o token de recuperacao de senha deve ser retornado', () => {
  SenhaApi.validarTokenRecuperacao(response, usuario.email)
})

Given('que existe um usuario cadastrado para redefinicao de senha', () => {
  usuario = gerarUsuarioValido({ password: 'Bruno@123' })

  UsuariosApi.cadastrarUsuario(token, usuario).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(201)
  })
})

Given('que solicitei a recuperacao de senha e obtive um token valido', () => {
  SenhaApi.solicitarRecuperacaoSenha(usuario.email).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(200)
    response = respostaRecebida
    tokenRecuperacao = respostaRecebida.body.data.token
  })
})

When('solicito a redefinicao da senha', () => {
  novaSenha = 'Bruno@789'

  SenhaApi.redefinirSenha(tokenRecuperacao, novaSenha).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(200)
    response = respostaRecebida
  })
})

When('recebo a resposta da redefinicao de senha', () => {
  SenhaApi.validarRespostaRecebida(response)
})

Then('a senha deve ser redefinida com sucesso', () => {
  SenhaApi.validarRespostaSolicitarSenha(response, usuario.email)
})
