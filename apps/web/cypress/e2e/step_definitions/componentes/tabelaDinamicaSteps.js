import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import TabelaDinamicaPage from '../../../support/page_objects/componentes/TabelaDinamicaPage'

When('acesso a tela de tabela dinamica', () => {
  TabelaDinamicaPage.acessarTabelaDinamica()
})

Then('devo visualizar os dados iniciais da tabela dinamica', () => {
  TabelaDinamicaPage.validarTabelaDinamica()
})

When('adiciono uma nova linha na tabela dinamica', () => {
  TabelaDinamicaPage.adicionarNovaLinha()
})

Then('devo visualizar a nova linha na tabela dinamica', () => {
  TabelaDinamicaPage.validarDadosTabela()
})

When('filtro a tabela dinamica pelo status automatizado', () => {
  TabelaDinamicaPage.filtrarDadosTabela()
})

Then('devo visualizar somente os registros com status automatizado', () => {
  TabelaDinamicaPage.validarFiltroTabela()
})

When('removo uma linha da tabela dinamica', () => {
  TabelaDinamicaPage.removerLinha()
})

When('recebo a confirmacao da remocao', () => {
  TabelaDinamicaPage.validarConfirmacaoRemocao()
})

Then('a linha removida nao deve permanecer na tabela', () => {
  TabelaDinamicaPage.validarLinhaRemovidaTabela()
})
