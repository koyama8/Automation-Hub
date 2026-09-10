import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import AuthApi from '../../../support/api_clients/auth/AuthApi'
import PermissoesApi from '../../../support/api_clients/permissoes/PermissoesApi'
import { obterCredenciaisAdministrador } from '../../../support/data/Credenciais'
import { gerarClienteValido } from '../../../support/factories/clientes/ClienteFactory'
import {
  gerarChaveIdempotencia,
  gerarUsuarioConvidado,
  gerarUsuarioGerenciado,
} from '../../../support/factories/permissoes/UsuarioGerenciadoFactory'

let adminToken
let userToken
let usuario
let userId
let userVersion
let invitationToken
let response
let secondaryResponse

Before(() => {
  adminToken =
    userToken =
    usuario =
    userId =
    userVersion =
    invitationToken =
    response =
    secondaryResponse =
      undefined
})

Given('que possuo acesso administrativo para gerenciar perfis e permissões', () => {
  return AuthApi.autenticar(obterCredenciaisAdministrador()).then(({ body }) => {
    adminToken = body.data.token
  })
})

Given('que consultei a versão atual do perfil QA', () =>
  PermissoesApi.buscarPerfil(adminToken, 'qa').then(guardarResposta),
)
Given('que existe um usuário QA ativo gerenciado', () => criarUsuarioAtivo('qa'))
Given('que existe um usuário viewer convidado', () => criarConvidado())
Given('que existe um usuário QA autenticado', () => criarUsuarioAtivo('qa', true))
Given('que existe um usuário viewer autenticado', () => criarUsuarioAtivo('viewer', true))

When('consulto o catálogo de permissões', () =>
  PermissoesApi.catalogo(adminToken).then(guardarResposta),
)
When('listo os perfis de acesso', () =>
  PermissoesApi.listarPerfis(adminToken).then(guardarResposta),
)
When('consulto o perfil QA', () =>
  PermissoesApi.buscarPerfil(adminToken, 'qa').then(guardarResposta),
)

When('atualizo e restauro a matriz de permissões do perfil QA', () => {
  const perfilOriginal = response.body.data
  const matrizTemporaria = [...perfilOriginal.permissions, 'reports:export'].filter(
    (permission, index, permissions) => permissions.indexOf(permission) === index,
  )
  if (matrizTemporaria.length === perfilOriginal.permissions.length) matrizTemporaria.pop()

  return PermissoesApi.atualizarPerfil(adminToken, 'qa', {
    version: perfilOriginal.version,
    permissions: matrizTemporaria,
    reason: 'Validar atualização controlada da matriz de permissões QA',
  }).then((primeiraAlteracao) => {
    response = primeiraAlteracao
    return PermissoesApi.atualizarPerfil(adminToken, 'qa', {
      version: primeiraAlteracao.body.data.version,
      permissions: perfilOriginal.permissions,
      reason: 'Restaurar matriz original após a validação automatizada',
    }).then((restauracao) => {
      secondaryResponse = restauracao
    })
  })
})

When('crio um usuário QA ativo', () => criarUsuarioAtivo('qa'))

When('repito a criação do usuário com a mesma chave e payload', () => {
  usuario = gerarUsuarioGerenciado('qa')
  const chave = gerarChaveIdempotencia()
  return PermissoesApi.criarUsuario(adminToken, usuario, chave).then((primeira) => {
    response = primeira
    return PermissoesApi.criarUsuario(adminToken, usuario, chave).then((segunda) => {
      secondaryResponse = segunda
    })
  })
})

When('reutilizo a chave idempotente com outro payload', () => {
  usuario = gerarUsuarioGerenciado('qa')
  const chave = gerarChaveIdempotencia()
  return PermissoesApi.criarUsuario(adminToken, usuario, chave).then(() => {
    const divergente = gerarUsuarioGerenciado('viewer')
    return PermissoesApi.criarUsuario(adminToken, divergente, chave, false).then(guardarResposta)
  })
})

When('crio um usuário viewer convidado', () => criarConvidado())

When('solicito o reenvio do convite', () => {
  const tokenAnterior = invitationToken
  return PermissoesApi.reenviarConvite(
    adminToken,
    userId,
    'Renovar token de ativação do usuário convidado',
  ).then((resposta) => {
    response = resposta
    secondaryResponse = tokenAnterior
  })
})

When('aceito o convite e autentico o usuário', () => {
  const password = 'Viewer@123'
  return PermissoesApi.aceitarConvite(invitationToken, password).then((aceite) => {
    response = aceite
    return AuthApi.autenticar({ email: usuario.email, password }).then((login) => {
      secondaryResponse = login
      userToken = login.body.data.token
    })
  })
})

When('listo os usuários filtrando perfil e status', () => {
  return PermissoesApi.listarUsuarios(adminToken, {
    page: 1,
    limit: 10,
    profile: 'qa',
    status: 'active',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }).then(guardarResposta)
})

When('consulto o usuário gerenciado pelo identificador', () =>
  PermissoesApi.buscarUsuario(adminToken, userId).then(guardarResposta),
)

When('altero o perfil do usuário para viewer com a versão atual', () => {
  return autenticarUsuario().then(() => {
    return PermissoesApi.atualizarPerfilUsuario(adminToken, userId, {
      profile: 'viewer',
      version: userVersion,
      reason: 'Validar revogação de sessão após redução de privilégios',
    }).then((alteracao) => {
      response = alteracao
      return consultarClientes(userToken, false).then((consulta) => {
        secondaryResponse = consulta
      })
    })
  })
})

When('altero o perfil utilizando uma versão obsoleta', () => {
  return PermissoesApi.atualizarPerfilUsuario(
    adminToken,
    userId,
    {
      profile: 'viewer',
      version: userVersion + 99,
      reason: 'Validar concorrência otimista com versão obsoleta',
    },
    false,
  ).then(guardarResposta)
})

When('bloqueio e libero o acesso utilizando a versão atual', () => {
  return PermissoesApi.atualizarAcesso(adminToken, userId, {
    status: 'blocked',
    version: userVersion,
    reason: 'Bloquear acesso durante validação automatizada',
  }).then((bloqueio) => {
    response = bloqueio
    return PermissoesApi.atualizarAcesso(adminToken, userId, {
      status: 'active',
      version: bloqueio.body.data.version,
      reason: 'Liberar acesso após validação automatizada',
    }).then((liberacao) => {
      secondaryResponse = liberacao
    })
  })
})

When('consulto as permissões efetivas do usuário', () =>
  PermissoesApi.permissoesEfetivas(adminToken, userId).then(guardarResposta),
)

When('consulto a auditoria filtrada pelo usuário', () => {
  return PermissoesApi.auditoria(adminToken, {
    page: 1,
    limit: 20,
    targetUserId: userId,
    sortOrder: 'desc',
  }).then(guardarResposta)
})

When('o QA cria e tenta excluir um cliente', () => {
  const cliente = gerarClienteValido()
  return requisitarCliente(userToken, 'POST', '/api/clients', cliente).then((cadastro) => {
    response = cadastro
    return requisitarCliente(
      userToken,
      'DELETE',
      `/api/clients/${cadastro.body.data.id}`,
      undefined,
      false,
    ).then((exclusao) => {
      secondaryResponse = exclusao
    })
  })
})

When('o viewer tenta criar um cliente', () => {
  return requisitarCliente(userToken, 'POST', '/api/clients', gerarClienteValido(), false).then(
    guardarResposta,
  )
})

When('revogo todas as sessões do usuário QA', () => {
  return PermissoesApi.revogarSessoes(
    adminToken,
    userId,
    'Encerrar sessões para validar resposta a incidente',
  ).then(() => {
    return consultarClientes(userToken, false).then(guardarResposta)
  })
})

Then('devo receber os perfis, permissões e ações de auditoria disponíveis', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.profiles).to.include.members(['admin', 'qa', 'viewer'])
  expect(response.body.data.permissions).to.include('clients:write')
  expect(response.body.data.auditActions).to.include('USER_CREATED')
})

Then('devo receber os perfis admin, qa e viewer', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.map(({ name }) => name)).to.include.members(['admin', 'qa', 'viewer'])
})

Then('devo receber a matriz de permissões do perfil QA', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.name).to.eq('qa')
  expect(response.body.data.permissions).to.be.an('array').and.not.be.empty
})

Then('as duas alterações devem ser concluídas com controle de versão', () => {
  expect(response.status).to.eq(200)
  expect(secondaryResponse.status).to.eq(200)
  expect(secondaryResponse.body.data.version).to.eq(response.body.data.version + 1)
})

Then('o usuário gerenciado deve ser criado com sucesso', () => {
  expect(response.status).to.eq(201)
  expect(response.body.data).to.include({ email: usuario.email, profile: 'qa', status: 'active' })
})

Then('devo receber o mesmo usuário como replay idempotente', () => {
  expect(response.status).to.eq(201)
  expect(secondaryResponse.status).to.eq(200)
  expect(secondaryResponse.body.data.id).to.eq(response.body.data.id)
  expect(secondaryResponse.body.idempotentReplay).to.eq(true)
})

Then('a API deve rejeitar a reutilização com status 409', () => expect(response.status).to.eq(409))

Then('devo receber um token de ativação para o usuário convidado', () => {
  expect(response.status).to.eq(201)
  expect(response.body.data.status).to.eq('invited')
  expect(invitationToken).to.be.a('string').and.not.be.empty
})

Then('devo receber um novo token de ativação', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.invitation.token).to.not.eq(secondaryResponse)
})

Then('o usuário convidado deve possuir uma sessão válida', () => {
  expect(response.status).to.eq(200)
  expect(secondaryResponse.status).to.eq(200)
  expect(userToken).to.be.a('string').and.not.be.empty
})

Then('a listagem deve conter o usuário QA gerenciado', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data.some(({ id }) => id === userId)).to.eq(true)
})

Then('devo receber os dados do usuário QA', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data).to.include({ id: userId, email: usuario.email, profile: 'qa' })
})

Then('o perfil deve ser alterado e a sessão anterior invalidada', () => {
  expect(response.body.data.profile).to.eq('viewer')
  expect(secondaryResponse.status).to.eq(401)
})

Then('a API deve rejeitar a alteração com status 409', () => expect(response.status).to.eq(409))

Then('o usuário deve voltar ao status ativo', () => {
  expect(response.body.data.status).to.eq('blocked')
  expect(secondaryResponse.body.data.status).to.eq('active')
})

Then('devo receber as permissões do perfil QA', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data).to.include({ userId, profile: 'qa' })
  expect(response.body.data.permissions).to.be.an('array').and.not.be.empty
})

Then('devo receber eventos de auditoria relacionados ao usuário', () => {
  expect(response.status).to.eq(200)
  expect(response.body.data).to.be.an('array').and.not.be.empty
  expect(response.body.data.every(({ targetUserId }) => targetUserId === userId)).to.eq(true)
})

Then('a criação deve ser permitida e a exclusão negada', () => {
  expect(response.status).to.eq(201)
  expect(secondaryResponse.status).to.eq(403)
  expect(secondaryResponse.body.error).to.eq('Permission required: clients:delete!')
})

Then('a criação deve ser negada por falta de permissão', () => {
  expect(response.status).to.eq(403)
  expect(response.body.error).to.eq('Permission required: clients:write!')
})

Then('o token anterior do QA deve ser recusado', () => expect(response.status).to.eq(401))

function criarUsuarioAtivo(perfil, autenticar = false) {
  usuario = gerarUsuarioGerenciado(perfil)
  return PermissoesApi.criarUsuario(adminToken, usuario, gerarChaveIdempotencia()).then(
    (resposta) => {
      response = resposta
      userId = resposta.body.data.id
      userVersion = resposta.body.data.version
      if (autenticar) return autenticarUsuario()
    },
  )
}

function criarConvidado() {
  usuario = gerarUsuarioConvidado()
  return PermissoesApi.criarUsuario(adminToken, usuario, gerarChaveIdempotencia()).then(
    (resposta) => {
      response = resposta
      userId = resposta.body.data.id
      invitationToken = resposta.body.invitation.token
    },
  )
}

function autenticarUsuario() {
  return AuthApi.autenticar({ email: usuario.email, password: usuario.password }).then(
    ({ body }) => {
      userToken = body.data.token
    },
  )
}

function consultarClientes(token, failOnStatusCode = true) {
  return cy.api({
    method: 'GET',
    url: '/api/clients',
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode,
  })
}

function requisitarCliente(token, method, url, body, failOnStatusCode = true) {
  return cy.api({
    method,
    url,
    headers: { Authorization: `Bearer ${token}` },
    body,
    failOnStatusCode,
  })
}

function guardarResposta(resposta) {
  response = resposta
}
