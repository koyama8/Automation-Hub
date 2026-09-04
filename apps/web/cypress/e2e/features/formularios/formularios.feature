@web
@formularios
@regression
Feature: Formularios

  Scenario: CT01 - Preencher e enviar o formulario completo de consultoria
    Given que estou autenticado como administrador
    When acesso o formulario de consultoria e preencho todos os campos obrigatorios
    And envio o formulario com os termos de uso aceitos
    Then devo visualizar a confirmacao de formulario enviado com sucesso

  @negative
  Scenario: CT02 - Exibir validacoes dos campos obrigatorios
    Given que estou autenticado como administrador
    When acesso o formulario de consultoria sem preencher os campos
    And tento enviar o formulario
    Then devo visualizar as mensagens de preenchimento obrigatorio

  Scenario: CT03 - Configurar preferencias de execucao e evidencias
    Given que estou autenticado como administrador
    When acesso a tela de preferencias e configuro as opcoes de execucao
    And seleciono as evidencias desejadas
    Then as preferencias configuradas devem permanecer selecionadas
