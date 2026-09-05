@api
@cupons
@regression
Feature: Cupons da API

  Scenario: CT01 - Cadastrar um cupom fixo com limite de uso
    Given que possuo acesso de administrador para gerenciar cupons
    When solicito o cadastro de um cupom fixo ativo com limite de uso
    Then o cupom deve ser cadastrado com sucesso
