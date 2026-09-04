import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import ContratosPage from '../../../support/page_objects/contratos/ContratosPage'

let cliente
let tituloContrato

Before(() => {
  cliente = undefined
  tituloContrato = undefined
})

Given('que possuo um cliente existente disponivel na tela de contratos', () => {
  return ContratosPage.prepararClienteParaContrato().then((clienteCriado) => {
    cliente = clienteCriado
  })
})

When('cadastro um contrato ativo para o cliente', () => {
  tituloContrato = `Assinatura QA Pro ${Date.now()}`
  ContratosPage.cadastrarContrato(cliente.id, tituloContrato)
})

Then('devo visualizar a confirmacao de contrato cadastrado com sucesso', () => {
  ContratosPage.validarConfirmacaoCadastro(tituloContrato)
})

When('cadastro um contrato ativo para validacao', () => {
  tituloContrato = `Assinatura QA Validacao ${Date.now()}`
  ContratosPage.cadastrarContrato(cliente.id, tituloContrato)
})

Then('devo visualizar os dados e as acoes do contrato na tabela', () => {
  ContratosPage.validarContratoNaTabela(cliente, tituloContrato)
})
