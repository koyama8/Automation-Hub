@api
@cupons
@regression
Feature: Gestão de cupons pela API

  Background:
    Given que possuo acesso de administrador para gerenciar cupons

  Scenario: CT01 - Cadastrar cupom fixo
    When solicito o cadastro de um cupom fixo ativo com limite de uso
    Then o cupom deve ser cadastrado com sucesso

  Scenario: CT02 - Cadastrar cupom percentual
    When solicito o cadastro de um cupom percentual ativo
    Then o cupom deve ser cadastrado com sucesso

  Scenario: CT03 - Consultar cupom por identificador
    Given que existe um cupom percentual cadastrado
    When consulto o cupom pelo identificador
    Then devo receber os dados do cupom cadastrado

  Scenario: CT04 - Listar cupons ativos
    Given que existe um cupom percentual cadastrado
    When listo os cupons com status ativo
    Then a listagem deve conter o cupom cadastrado

  Scenario: CT05 - Atualizar cupom cadastrado
    Given que existe um cupom percentual cadastrado
    When atualizo os dados do cupom
    Then o cupom deve apresentar os dados atualizados

  Scenario: CT06 - Excluir todos os cupons
    Given que existe um cupom percentual cadastrado
    When solicito a exclusao de todos os cupons
    Then a exclusao em massa deve ser concluida com sucesso

  Scenario: CT07 - Validar cupom para um pedido elegivel
    Given que existe um pedido elegivel e um cupom percentual cadastrado
    When valido o cupom para o pedido
    Then o cupom deve ser considerado valido

  Scenario: CT08 - Rejeitar cupom inexistente
    Given que existe um pedido elegivel
    When valido um codigo de cupom inexistente
    Then a API deve rejeitar a validacao com status 404
