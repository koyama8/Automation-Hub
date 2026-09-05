import { Before, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import CuponsPage from '../../../support/page_objects/cupons/CuponsPage'
import dadosCupom from '../../../fixtures/cupom.json'

let cupom

Before(() => {
  cupom = undefined
})

When('acesso a tela de cupons e cadastro um cupom valido', () => {
  cupom = {
    ...dadosCupom.cdcupom,
    codigoCupom: `QA-FIXO-${Date.now()}`,
  }

  CuponsPage.cadastrarCupom(cupom)
})

When('visualizo o cupom ativo com os valores cadastrados na tabela', () => {
  CuponsPage.validarCupom(cupom)
})

Then('devo conseguir excluir o cupom cadastrado', () => {
  CuponsPage.excluirCupomcadastrado(cupom)
})
