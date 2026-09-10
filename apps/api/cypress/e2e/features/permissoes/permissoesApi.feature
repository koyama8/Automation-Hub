@api
@permissoes
@regression
Feature: Perfis e permissões da API

  Background:
    Given que possuo acesso administrativo para gerenciar perfis e permissões

  Scenario: CT01 - Consultar catálogo de permissões
    When consulto o catálogo de permissões
    Then devo receber os perfis, permissões e ações de auditoria disponíveis

  Scenario: CT02 - Listar perfis de acesso
    When listo os perfis de acesso
    Then devo receber os perfis admin, qa e viewer

  Scenario: CT03 - Consultar perfil QA
    When consulto o perfil QA
    Then devo receber a matriz de permissões do perfil QA

  Scenario: CT04 - Atualizar matriz do perfil QA
    Given que consultei a versão atual do perfil QA
    When atualizo e restauro a matriz de permissões do perfil QA
    Then as duas alterações devem ser concluídas com controle de versão

  Scenario: CT05 - Criar usuário QA ativo
    When crio um usuário QA ativo
    Then o usuário gerenciado deve ser criado com sucesso

  Scenario: CT06 - Repetir criação com chave idempotente
    When repito a criação do usuário com a mesma chave e payload
    Then devo receber o mesmo usuário como replay idempotente

  Scenario: CT07 - Rejeitar chave idempotente com payload divergente
    When reutilizo a chave idempotente com outro payload
    Then a API deve rejeitar a reutilização com status 409

  Scenario: CT08 - Criar usuário convidado
    When crio um usuário viewer convidado
    Then devo receber um token de ativação para o usuário convidado

  Scenario: CT09 - Reenviar convite
    Given que existe um usuário viewer convidado
    When solicito o reenvio do convite
    Then devo receber um novo token de ativação

  Scenario: CT10 - Aceitar convite e autenticar viewer
    Given que existe um usuário viewer convidado
    When aceito o convite e autentico o usuário
    Then o usuário convidado deve possuir uma sessão válida

  Scenario: CT11 - Listar usuários QA ativos com filtros
    Given que existe um usuário QA ativo gerenciado
    When listo os usuários filtrando perfil e status
    Then a listagem deve conter o usuário QA gerenciado

  Scenario: CT12 - Consultar usuário gerenciado por identificador
    Given que existe um usuário QA ativo gerenciado
    When consulto o usuário gerenciado pelo identificador
    Then devo receber os dados do usuário QA

  Scenario: CT13 - Alterar usuário QA para viewer
    Given que existe um usuário QA ativo gerenciado
    When altero o perfil do usuário para viewer com a versão atual
    Then o perfil deve ser alterado e a sessão anterior invalidada

  Scenario: CT14 - Rejeitar atualização com versão obsoleta
    Given que existe um usuário QA ativo gerenciado
    When altero o perfil utilizando uma versão obsoleta
    Then a API deve rejeitar a alteração com status 409

  Scenario: CT15 - Bloquear e liberar acesso
    Given que existe um usuário QA ativo gerenciado
    When bloqueio e libero o acesso utilizando a versão atual
    Then o usuário deve voltar ao status ativo

  Scenario: CT16 - Consultar permissões efetivas
    Given que existe um usuário QA ativo gerenciado
    When consulto as permissões efetivas do usuário
    Then devo receber as permissões do perfil QA

  Scenario: CT17 - Auditar alterações do usuário
    Given que existe um usuário QA ativo gerenciado
    When consulto a auditoria filtrada pelo usuário
    Then devo receber eventos de auditoria relacionados ao usuário

  Scenario: CT18 - Permitir que QA crie cliente e impedir exclusão
    Given que existe um usuário QA autenticado
    When o QA cria e tenta excluir um cliente
    Then a criação deve ser permitida e a exclusão negada

  Scenario: CT19 - Impedir que viewer crie cliente
    Given que existe um usuário viewer autenticado
    When o viewer tenta criar um cliente
    Then a criação deve ser negada por falta de permissão

  Scenario: CT20 - Revogar sessões do usuário
    Given que existe um usuário QA autenticado
    When revogo todas as sessões do usuário QA
    Then o token anterior do QA deve ser recusado
