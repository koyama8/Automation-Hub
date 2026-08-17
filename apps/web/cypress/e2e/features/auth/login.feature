Feature: Login

  Scenario: CT01 - Exibir os elementos da tela de login
    Given que estou na tela de login
    Then devo visualizar todos os elementos da tela de login

  Scenario: CT02 - Login com sucesso
    Given que estou na tela de login
    When realizo o login com credenciais validas
    Then devo ser redirecionado para o dashboard

  Scenario: CT03 - Login com email invalido
    Given que estou na tela de login
    When realizo o login com email invalido
    Then devo visualizar a mensagem de email invalido

  Scenario: CT04 - Login com senha invalida
    Given que estou na tela de login
    When realizo o login com senha invalida
    Then devo visualizar a mensagem de credenciais invalidas

  Scenario: CT05 - Interagir com o assistente Automation Live
    Given que estou na tela de login
    When realizo o fluxo do assistente Automation Live
    Then o assistente deve ser fechado

  Scenario: CT06 - Recuperacao de senha com email nao cadastrado
    Given que estou na tela de recuperacao de senha
    When solicito a recuperacao com um email nao cadastrado
    Then devo visualizar uma mensagem de erro na recuperacao de senha

  Scenario: CT07 - Recuperacao de senha com email valido
    Given que estou na tela de recuperacao de senha
    When solicito a recuperacao com um email valido
    Then devo visualizar os dados da recuperacao de senha

  Scenario: CT08 - Cadastro sem preencher o nome
    Given que estou na tela de cadastro
    When tento cadastrar um usuario sem preencher o nome
    Then devo visualizar uma mensagem de validacao para o nome

  Scenario: CT09 - Cadastro sem preencher o email
    Given que estou na tela de cadastro
    When tento cadastrar um usuario sem preencher o email
    Then devo visualizar uma mensagem de validacao para o email

  Scenario: CT10 - Cadastro sem preencher a senha
    Given que estou na tela de cadastro
    When tento cadastrar um usuario sem preencher a senha
    Then devo visualizar uma mensagem de validacao para a senha

  Scenario: CT11 - Cadastrar usuario com sucesso
    Given que estou na tela de cadastro
    When cadastro um novo usuario com dados validos
    Then devo visualizar a confirmacao de cadastro realizado com sucesso
