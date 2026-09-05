import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

import dadosPersonagens from '../../../fixtures/personagens.json'
import PersonagensPage from '../../../support/page_objects/personagens/PersonagensPage'

When('acesso a tela de cadastro de personagens', () => {
  PersonagensPage.acessarCadastro()
})

When('cadastro um personagem com todos os dados obrigatorios', () => {
  PersonagensPage.cadastrarPersonagem(dadosPersonagens.cadastro)
})

Then('devo visualizar a confirmacao de personagem cadastrado com sucesso', () => {
  PersonagensPage.validarConfirmacaoCadastro()
})

When('tento cadastrar um personagem sem preencher os dados', () => {
  PersonagensPage.tentarCadastrarSemDados()
})

Then('devo visualizar as validacoes obrigatorias do personagem', () => {
  PersonagensPage.validarCamposObrigatorios()
})

When('acesso a tela de gerenciamento de personagens', () => {
  PersonagensPage.acessarGerenciamento()
})

Then('devo visualizar os dados dos personagens cadastrados', () => {
  PersonagensPage.validarPersonagensListados(dadosPersonagens.listados)
})

When('visualizo, edito e excluo um personagem', () => {
  PersonagensPage.visualizarEditarEExcluir(
    dadosPersonagens.personagemGerenciado,
    dadosPersonagens.edicao,
  )
})

Then('devo visualizar a confirmacao de personagem excluido com sucesso', () => {
  PersonagensPage.validarConfirmacaoExclusao(dadosPersonagens.edicao.nome)
})

When('filtro os personagens pelo universo Dragon Ball', () => {
  PersonagensPage.filtrarPorUniverso(dadosPersonagens.filtroUniverso.nome)
})

Then('devo visualizar somente os personagens do universo selecionado', () => {
  PersonagensPage.validarFiltroPorUniverso(dadosPersonagens.filtroUniverso.personagens)
})

When('busco o personagem Naruto pelo nome', () => {
  PersonagensPage.buscarPorNome(dadosPersonagens.busca.termo)
})

Then('devo visualizar os dados do personagem encontrado', () => {
  PersonagensPage.validarPersonagemEncontrado(dadosPersonagens.busca.resultado)
})
