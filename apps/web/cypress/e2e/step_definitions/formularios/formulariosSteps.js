import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import FormularioWeb from '../../../support/page_objects/formularios/FormulariosPage'
import consultancyData from '../../../fixtures/preferencias.json'
import dadosform from '../../../fixtures/consultancy.json'

When('acesso o formulario de consultoria e preencho todos os campos obrigatorios', () => {
  FormularioWeb.cadastrarFormulario(dadosform.personal)
})

When('envio o formulario com os termos de uso aceitos', () => {
  FormularioWeb.enviarformulario()
})

Then('devo visualizar a confirmacao de formulario enviado com sucesso', () => {
  FormularioWeb.visualizarFormulario()
})

When('acesso o formulario de consultoria sem preencher os campos', () => {
  FormularioWeb.acessarformularioSemPreenchercampos()
})

When('tento enviar o formulario', () => {
  FormularioWeb.enviarformularioSemPreenchercampos()
})

Then('devo visualizar as mensagens de preenchimento obrigatorio', () => {
  FormularioWeb.visualizarMensagensObrigatorias()
})

When('acesso a tela de preferencias e configuro as opcoes de execucao', () => {
  FormularioWeb.acessarTelaPreferencias()
})

When('seleciono as evidencias desejadas', () => {
  FormularioWeb.selecionarEvidencias(consultancyData.evidencias)
})

Then('as preferencias configuradas devem permanecer selecionadas', () => {
  FormularioWeb.validarEvidenciasSelecionadas(consultancyData.evidencias)
})
