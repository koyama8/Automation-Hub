import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import EntradaTecladoPage from '../../../support/page_objects/componentes/EntradaTecladoPage'

let cenario

When('acesso a tela de entrada por teclado', () => {
  EntradaTecladoPage.acessarTelaEntradaTeclado()
})

When('informo um cenario e pressiono Enter', () => {
  cenario = 'Validar senha do login'
  EntradaTecladoPage.salvarCenarioComEnter(cenario)
})

Then('o cenario informado deve ser salvo com sucesso', () => {
  EntradaTecladoPage.validarCenarioSalvo(cenario)
})

When('informo um cenario para salvar', () => {
  cenario = 'Validar nome do usuario'
  EntradaTecladoPage.informarCenario(cenario)
})

When('solicito o salvamento pelo botao', () => {
  EntradaTecladoPage.salvarCenarioPeloBotao()
})

When('cadastro tres cenarios por teclado', () => {
  cenario = ['Validar nome do usuario', 'Validar o email do usuario', 'Validar a senha do usuario']
  EntradaTecladoPage.cadastrarCenariosPeloBotao(cenario)
})

Then('os cenarios salvos devem ser exibidos na lista com a data atual', () => {
  EntradaTecladoPage.validarCenariosSalvosNaLista()
})

When('removo dois cenarios salvos da lista', () => {
  EntradaTecladoPage.removerDoisCenarios()
})

Then('os cenarios removidos nao devem ser exibidos na lista', () => {
  EntradaTecladoPage.validarCenariosRemovidos()
})

When('solicito o salvamento sem informar um cenario', () => {
  EntradaTecladoPage.tentarSalvarCenarioVazio()
})

Then('devo visualizar a mensagem de validacao do cenario', () => {
  EntradaTecladoPage.validarMensagemCenarioObrigatorio()
})

When('informo e salvo um cenario pelo botao', () => {
  cenario = 'Validar nome do usuario'
  EntradaTecladoPage.salvarCenarioParaAtualizarContador(cenario)
})

Then('o contador deve indicar um cenario salvo', () => {
  EntradaTecladoPage.validarContadorDeCenariosSalvos(1)
})
