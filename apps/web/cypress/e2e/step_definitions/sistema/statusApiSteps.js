import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import StatusApiPage from '../../../support/page_objects/StatusApiPage'

When('acesso a tela de status da API', () => {
  StatusApiPage.acessarTelaStatusApi()
})

When('verifico o status com a API indisponivel', () => {
  StatusApiPage.verificarStatusComApiIndisponivel()
})

Then('devo visualizar a mensagem de API indisponivel e uma notificacao de erro',() => {
    StatusApiPage.validarMensagemApiIndisponivel()
    StatusApiPage.validarNotificacaoErro()
  },
)
