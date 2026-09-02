import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import CarrinhoPage from '../../../support/page_objects/carrinho/CarrinhoPage'

When('acesso a tela do carrinho', () => {
  CarrinhoPage.acessarTelaCarrinho()
})

When('visualizo o formulario inicial do carrinho', () => {
  CarrinhoPage.validarFormularioInicial()
})

Then('devo visualizar a tabela do carrinho', () => {
  CarrinhoPage.validarTabelaCarrinho()
})
