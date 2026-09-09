import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import ClientesApi from '../../../support/api_clients/clientes/ClientesApi'
import EvidenciasApi from '../../../support/api_clients/evidencias/EvidenciasApi'
import PedidosApi from '../../../support/api_clients/pedidos/PedidosApi'
import ProdutosApi from '../../../support/api_clients/produtos/ProdutosApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import {
  gerarEvidenciaCliente,
  gerarEvidenciaPedido,
} from '../../../support/factories/evidencias/EvidenciaFactory'
import { gerarPedidoValido } from '../../../support/factories/pedidos/PedidoFactory'
import { gerarProdutoValido } from '../../../support/factories/produtos/ProdutoFactory'

let token
let clientId
let orderId
let evidencia
let evidenceId
let response

Before(() => {
  token = clientId = orderId = evidencia = evidenceId = response = undefined
})

Given('que possuo acesso de administrador para gerenciar evidências', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then(({ body }) => {
    token = body.data.token
  })
})

Given('que existe um cliente cadastrado para evidências', () => criarCliente())
Given('que existe um pedido cadastrado para evidências', () => criarPedido())
Given('que existe uma evidência de cliente cadastrada', () =>
  criarCliente().then(() => cadastrar(gerarEvidenciaCliente(clientId))),
)
Given('que existe uma evidência de pedido cadastrada', () =>
  criarPedido().then(() => cadastrar(gerarEvidenciaPedido(orderId))),
)

When('envio uma evidência em texto vinculada ao cliente', () =>
  enviar(gerarEvidenciaCliente(clientId)),
)

When('envio uma evidência DOCX vinculada ao cliente', () => {
  return enviar(
    gerarEvidenciaCliente(clientId, {
      fileName: `documento-${Date.now()}.docx`,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }),
  )
})

When('envio uma evidência vinculada ao pedido', () => enviar(gerarEvidenciaPedido(orderId)))
When('listo todas as evidências', () => EvidenciasApi.listar(token).then(guardarResposta))
When('listo as evidências da cliente', () =>
  EvidenciasApi.listar(token, { entityType: 'client', clientId }).then(guardarResposta),
)
When('listo as evidências da pedido', () =>
  EvidenciasApi.listar(token, { entityType: 'order', orderId }).then(guardarResposta),
)
When('solicito o download da evidência', () =>
  EvidenciasApi.baixar(token, evidenceId).then(guardarResposta),
)
When('excluo a evidência pelo identificador', () =>
  EvidenciasApi.excluir(token, evidenceId).then(guardarResposta),
)
When('excluo todas as evidências', () => EvidenciasApi.excluirTodas(token).then(guardarResposta))

When('envio uma evidência com arquivo ausente', () => enviarInvalida({ fileBase64: undefined }))
When('envio uma evidência com tipo não permitido', () =>
  enviarInvalida({ mimeType: 'application/x-msdownload' }),
)
When('envio uma evidência com tamanho acima de 1 MB', () => {
  return enviarInvalida({
    fileBase64: Cypress.Buffer.alloc(1024 * 1024 + 1, 'A').toString('base64'),
  })
})

Then('a evidência deve ser cadastrada com sucesso', () => {
  expect(response.status).to.eq(201)
  expect(response.body.message).to.eq('Evidence uploaded successfully')
})

Then('a listagem deve conter a evidência cadastrada', () => {
  expect(response.status).to.eq(200)
  expect(response.body.some(({ id }) => id === evidenceId)).to.eq(true)
})

Then('devo receber os metadados e o conteúdo do arquivo', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data).to.include({
    id: evidenceId,
    fileName: evidencia.fileName,
    fileBase64: evidencia.fileBase64,
  })
})

Then('a evidência deve ser excluída com sucesso', () => expect(response.status).to.eq(200))
Then('a exclusão em massa de evidências deve ser concluída', () =>
  expect(response.status).to.eq(200),
)

Then('a API deve rejeitar a evidência com a mensagem {string}', (mensagem) => {
  expect(response.status).to.eq(400)
  expect(response.body.error).to.eq(mensagem)
})

function criarCliente() {
  return ClientesApi.cadastrarCliente(token, gerarClienteValido()).then(({ body }) => {
    clientId = body.data.id
  })
}

function criarPedido() {
  return criarCliente().then(() => {
    return ProdutosApi.cadastrarProduto(token, gerarProdutoValido()).then(({ body }) => {
      return PedidosApi.cadastrar(token, gerarPedidoValido(clientId, body.data.id)).then(
        ({ body: pedidoBody }) => {
          orderId = pedidoBody.data.id
        },
      )
    })
  })
}

function cadastrar(massa) {
  evidencia = massa
  return EvidenciasApi.criar(token, evidencia).then(({ body }) => {
    evidenceId = body.data.id
  })
}

function enviar(massa) {
  evidencia = massa
  return EvidenciasApi.criar(token, evidencia).then(guardarResposta)
}

function enviarInvalida(sobrescritas) {
  evidencia = gerarEvidenciaCliente(clientId, sobrescritas)
  return EvidenciasApi.criar(token, evidencia, false).then(guardarResposta)
}

function guardarResposta(resposta) {
  response = resposta
}
