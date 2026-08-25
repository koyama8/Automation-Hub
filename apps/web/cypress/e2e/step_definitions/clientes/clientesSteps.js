import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import ClientesPage from '../../../support/page_objects/clientes/ClientesPage'
import { gerarClienteValido } from '../../../support/factories/ClienteFactory'

let cliente

When('acesso a tela de clientes', () => {
  ClientesPage.acessarClientes()
})

When('cadastro um cliente com dados validos', () => {
  cliente = gerarClienteValido()
  ClientesPage.cadastrarCliente(cliente)
})

Then('devo visualizar a confirmacao do cadastro do cliente', () => {
  ClientesPage.validarConfirmacaoCadastro(cliente.nome)
})

When('visualizo os dados do cliente cadastrado na tabela', () => {
  ClientesPage.validarDadosCliente(cliente)
})

When('solicito a inativacao do cliente', () => {
  ClientesPage.solicitarInativacao(cliente.nome)
})

Then('devo visualizar a confirmacao e o status inativo do cliente', () => {
  ClientesPage.validarConfirmacaoInativacao(cliente.nome)
})
