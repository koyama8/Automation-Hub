@api
@evidencias
@regression
Feature: Gestão de evidências pela API

  Background:
    Given que possuo acesso de administrador para gerenciar evidências

  Scenario: CT01 - Enviar evidência de cliente
    Given que existe um cliente cadastrado para evidências
    When envio uma evidência em texto vinculada ao cliente
    Then a evidência deve ser cadastrada com sucesso

  Scenario: CT02 - Enviar documento DOCX de cliente
    Given que existe um cliente cadastrado para evidências
    When envio uma evidência DOCX vinculada ao cliente
    Then a evidência deve ser cadastrada com sucesso

  Scenario: CT03 - Enviar evidência de pedido
    Given que existe um pedido cadastrado para evidências
    When envio uma evidência vinculada ao pedido
    Then a evidência deve ser cadastrada com sucesso

  Scenario: CT04 - Listar todas as evidências
    Given que existe uma evidência de cliente cadastrada
    When listo todas as evidências
    Then a listagem deve conter a evidência cadastrada

  Scenario Outline: CT05 - Filtrar evidências por entidade
    Given que existe uma evidência de <entidade> cadastrada
    When listo as evidências da <entidade>
    Then a listagem deve conter a evidência cadastrada

    Examples:
      | entidade |
      | cliente  |
      | pedido   |

  Scenario: CT06 - Baixar metadados e conteúdo da evidência
    Given que existe uma evidência de cliente cadastrada
    When solicito o download da evidência
    Then devo receber os metadados e o conteúdo do arquivo

  Scenario: CT07 - Excluir evidência por identificador
    Given que existe uma evidência de cliente cadastrada
    When excluo a evidência pelo identificador
    Then a evidência deve ser excluída com sucesso

  Scenario: CT08 - Excluir todas as evidências
    Given que existe uma evidência de cliente cadastrada
    When excluo todas as evidências
    Then a exclusão em massa de evidências deve ser concluída

  Scenario Outline: CT09 - Rejeitar arquivo inválido
    Given que existe um cliente cadastrado para evidências
    When envio uma evidência com <problema>
    Then a API deve rejeitar a evidência com a mensagem "<mensagem>"

    Examples:
      | problema              | mensagem                                   |
      | arquivo ausente       | Evidence file is required!                 |
      | tipo não permitido    | Evidence file type is not allowed!         |
      | tamanho acima de 1 MB | Evidence file exceeds maximum size of 1MB! |
