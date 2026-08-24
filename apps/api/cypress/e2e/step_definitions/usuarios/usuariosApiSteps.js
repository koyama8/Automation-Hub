import {
  Before,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import { fakerPT_BR as faker } from "@faker-js/faker";
import AuthApi from "../../../support/api_clients/AuthApi";
import UsuariosApi from "../../../support/api_clients/UsuariosApi";

let token;
let response;
let usuario;
let usuarioId;
let dadosAtualizados;

Before(() => {
  token = undefined;
  response = undefined;
  usuario = undefined;
  usuarioId = undefined;
  dadosAtualizados = undefined;
});

Given("que possuo um token de administrador valido", () => {
  const credenciais = {
    email: "qa@adminlab.com",
    password: "pwd123",
  };

  AuthApi.autenticar(credenciais).then((respostaRecebida) => {
    token = respostaRecebida.body.data.token;
  });
});

When("solicito a listagem de usuarios", () => {
  UsuariosApi.listarUsuarios(token).then((respostaRecebida) => {
    response = respostaRecebida;
  });
});

When("recebo a resposta da listagem de usuarios", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("os usuarios cadastrados devem ser retornados", () => {
  UsuariosApi.validarListagemUsuarios(response);
});

Given("que existe um usuario cadastrado", () => {
  usuario = {
    name: faker.person.fullName(),
    email: faker.internet
      .email({
        firstName: "buscar",
        lastName: String(Date.now()),
      })
      .toLowerCase(),
    password: faker.internet.password(),
  };

  return UsuariosApi.cadastrarUsuario(token, usuario).then(
    (respostaRecebida) => {
      expect(respostaRecebida.status).to.eq(201);
      usuarioId = respostaRecebida.body.data.id;
    },
  );
});

When("solicito a busca do usuario pelo ID", () => {
  UsuariosApi.buscarUsuarioPorId(token, usuarioId).then((respostaRecebida) => {
    response = respostaRecebida;
  });
});

When("recebo a resposta da busca do usuario", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("o usuario solicitado deve ser retornado", () => {
  UsuariosApi.validarUsuarioRetornado(response, usuario, usuarioId);
});

Given("que possuo dados validos para cadastro de usuario", () => {
  usuario = {
    name: faker.person.fullName(),
    email: faker.internet
      .email({
        firstName: "cadastrar",
        lastName: String(Date.now()),
      })
      .toLowerCase(),
    password: faker.internet.password(),
  };
});

When("solicito o cadastro do usuario", () => {
  UsuariosApi.cadastrarUsuario(null, usuario).then((respostaRecebida) => {
    response = respostaRecebida;
  });
});

When("recebo a resposta do cadastro do usuario", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("o usuario deve ser cadastrado com sucesso", () => {
  UsuariosApi.validarRespostaCadastro(response, usuario);
});

Given("que possuo novos dados validos para o usuario", () => {
  dadosAtualizados = {
    name: faker.person.fullName(),
    email: faker.internet
      .email({
        firstName: "atualizar",
        lastName: String(Date.now()),
      })
      .toLowerCase(),
    password: faker.internet.password(),
  };
});

When("solicito a atualizacao do usuario pelo ID", () => {
  UsuariosApi.atualizarUsuario(token, usuarioId, dadosAtualizados).then(
    (respostaRecebida) => {
      response = respostaRecebida;
    },
  );
});

When("recebo a resposta da atualizacao do usuario", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("o usuario deve ser atualizado com sucesso", () => {
  UsuariosApi.validarAtualizacaoUsuario(response, dadosAtualizados, usuarioId);
});

When("solicito a inativacao do usuario pelo ID", () => {
  UsuariosApi.alterarStatusUsuario(token, usuarioId, false).then(
    (respostaRecebida) => {
      response = respostaRecebida;
    },
  );
});

When("recebo a resposta da inativacao do usuario", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("o usuario deve ser inativado com sucesso", () => {
  UsuariosApi.validarStatusUsuario(response, usuarioId, false);
});

Given("que existe um usuario cadastrado e inativo", () => {
  usuario = {
    name: faker.person.fullName(),
    email: faker.internet
      .email({
        firstName: "buscar",
        lastName: String(Date.now()),
      })
      .toLowerCase(),
    password: faker.internet.password(),
  };

  return UsuariosApi.cadastrarUsuario(token, usuario).then(
    (respostaRecebida) => {
      expect(respostaRecebida.status).to.eq(201);
      usuarioId = respostaRecebida.body.data.id;

      return UsuariosApi.alterarStatusUsuario(token, usuarioId, false);
    },
  );
});

When("solicito a ativacao do usuario pelo ID", () => {
  UsuariosApi.alterarStatusUsuario(token, usuarioId, true).then(
    (respostaRecebida) => {
      expect(respostaRecebida.status).to.eq(200);

      response = respostaRecebida;
    },
  );
});

When("recebo a resposta da ativacao do usuario", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("o usuario deve ser ativado com sucesso", () => {
  UsuariosApi.validarStatusUsuario(response, usuarioId, true);
});

When("solicito a exclusao do usuario pelo ID", () => {
  UsuariosApi.excluirUsuarioID(token, usuarioId).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(200);
    response = respostaRecebida;
  });
});

When("recebo a resposta da exclusao do usuario", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then("o usuario deve ser excluido com sucesso", () => {
  UsuariosApi.validarExclusao(response, usuarioId);
});

When("solicito a limpeza dos usuarios de teste", () => {
  UsuariosApi.excluirUsuarios(token).then((respostaRecebida) => {
    expect(respostaRecebida.status).to.eq(200);
    response = respostaRecebida;
  });
});

When("recebo a resposta da limpeza dos usuarios", () => {
  UsuariosApi.validarRespostaRecebida(response);
});

Then(
  "os usuarios de teste devem ser removidos e o administrador preservado",
  () => {
    UsuariosApi.validarLimpezaUsuarios(response);
  },
);
