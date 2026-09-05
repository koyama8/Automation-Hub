@web
@hobbies
@regression
Feature: Cadastro de hobbies

  Scenario: CT01 - Cadastrar um hobby com sucesso
    Given que estou autenticado como administrador
    When acesso a tela de cadastro de hobbies
    And cadastro um hobby com todos os dados obrigatorios
    Then devo visualizar os dados e a confirmacao do hobby cadastrado

  @negative
  Scenario: CT02 - Validar os campos obrigatorios do cadastro de hobby
    Given que estou autenticado como administrador
    When acesso a tela de cadastro de hobbies
    And tento cadastrar um hobby sem preencher os dados
    Then devo visualizar as validacoes obrigatorias do hobby
