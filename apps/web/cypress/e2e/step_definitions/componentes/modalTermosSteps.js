import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import ModalTermosPage from '../../../support/page_objects/ModalTermosPage'

When('acesso a tela de termos', () => {
  ModalTermosPage.acessarTelaTermos()
})

When('concluo o aceite dos termos', () => {
  ModalTermosPage.concluirAceiteTermos()
})

Then('devo visualizar a confirmacao de termos aceitos com sucesso', () => {
  ModalTermosPage.validarConfirmacaoTermosAceitos()
})

When('tento finalizar o aceite sem marcar os termos', () => {
  ModalTermosPage.tentarFinalizarAceiteSemMarcarTermos()
})

Then('devo visualizar a mensagem para marcar o aceite', () => {
  ModalTermosPage.validarMensagemAceiteObrigatorio()
})
