import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import dadosHobby from '../../../fixtures/hobbies.json'
import HobbiesPage from '../../../support/page_objects/hobbies/HobbiesPage'

When('acesso a tela de cadastro de hobbies', () => {
  HobbiesPage.acessarCadastro()
})

When('cadastro um hobby com todos os dados obrigatorios', () => {
  HobbiesPage.cadastrarHobby(dadosHobby.valido)
})

Then('devo visualizar os dados e a confirmacao do hobby cadastrado', () => {
  HobbiesPage.validarCadastro(dadosHobby.valido)
})

When('tento cadastrar um hobby sem preencher os dados', () => {
  HobbiesPage.tentarCadastrarSemDados()
})

Then('devo visualizar as validacoes obrigatorias do hobby', () => {
  HobbiesPage.validarCamposObrigatorios()
})
