import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import EstadosVisuaisPage from '../../../support/page_objects/componentes/EstadosVisuaisPage'

When('acesso a tela de estados visuais', () => {
  EstadosVisuaisPage.acessarTelaEstadosVisuais()
})

When('seleciono o estado visual {string}', (estado) => {
  EstadosVisuaisPage.selecionarEstadoVisual(estado)
})

Then('devo visualizar a mensagem {string} sem alerta de erro', (mensagem) => {
  EstadosVisuaisPage.validarEstadoVisual(mensagem, false)
})

Then('devo visualizar a mensagem {string} com alerta de erro', (mensagem) => {
  EstadosVisuaisPage.validarEstadoVisual(mensagem, true)
})
