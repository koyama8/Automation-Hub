import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import CuponsPage from '../../../support/page_objects/cupons/CuponsPage'
import dadosCupom from '../../../fixtures/cupom.json'

When('acesso a tela de cupons e cadastro um cupom valido', () => {
  CuponsPage.cadastrarCupom(dadosCupom.cdcupom)
})

When('visualizo o cupom ativo com os valores cadastrados na tabela', () => {
  CuponsPage.validarCupom()
})

Then('devo conseguir excluir o cupom cadastrado', () => {
  CuponsPage.excluirCupomcadastrado(dadosCupom.cdcupom)
})
