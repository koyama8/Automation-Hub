import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import dadosCenario from '../../../fixtures/construtor-cenários.json'
import ConstrutorCenariosPage from '../../../support/page_objects/cenarios/ConstrutorCenariosPage'

When('acesso o construtor de cenarios', () => {
  ConstrutorCenariosPage.acessar()
})

When('preencho e salvo um novo cenario automatizado', () => {
  ConstrutorCenariosPage.construirCenario(dadosCenario.personal)
})

Then('devo visualizar todos os dados do cenario construido', () => {
  ConstrutorCenariosPage.validarCenario(dadosCenario.personal)
})

When('tento salvar um cenario sem preencher os dados', () => {
  ConstrutorCenariosPage.tentarSalvarSemDados()
})

Then('devo visualizar as validacoes obrigatorias do cenario', () => {
  ConstrutorCenariosPage.validarCamposObrigatorios()
})
