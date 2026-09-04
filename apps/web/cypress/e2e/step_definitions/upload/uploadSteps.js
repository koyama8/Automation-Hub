import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import UploadPage from '../../../support/page_objects/upload/UploadPage'

Given('que estou na tela de upload de evidencias', () => {
  UploadPage.acessarTelaUpload()
})

When('envio um arquivo PDF como evidencia', () => {
  UploadPage.enviarPDF()
})

Then('devo visualizar a confirmacao de evidencia anexada com sucesso', () => {
  UploadPage.visualizarPDF()
})

When('tento enviar uma evidencia sem selecionar um arquivo', () => {
  UploadPage.enviarPDFSemArquivo()
})

Then('devo visualizar a mensagem de selecao obrigatoria de arquivo', () => {
  UploadPage.visualizarMensagemObrigatoria()
})
