import { obterCredenciaisAdministrador } from '../../data/Credenciais';

class UsuariosApi {
  listarUsuarios(token) {
    return cy.api({
      method: "GET",
      url: "http://localhost:3030/api/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  cadastrarUsuario(token, usuario) {
    return cy.api({
      method: "POST",
      url: "http://localhost:3030/api/users/register",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      body: usuario,
    });
  }

  buscarUsuarioPorId(token, usuarioId) {
    return cy.api({
      method: "GET",
      url: `http://localhost:3030/api/users/${usuarioId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  atualizarUsuario(token, usuarioId, dadosAtualizados) {
    return cy.api({
      method: "PUT",
      url: `http://localhost:3030/api/users/${usuarioId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: dadosAtualizados,
    });
  }

  alterarStatusUsuario(token, usuarioId, ativo) {
    return cy.api({
      method: "PATCH",
      url: `http://localhost:3030/api/users/${usuarioId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        active: ativo,
      },
    });
  }

  excluirUsuarioID(token, userId) {
    return cy.api({
      method: "DELETE",
      url: `http://localhost:3030/api/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  excluirUsuarios(token) {
    return cy.api({
      method: "DELETE",
      url: "http://localhost:3030/api/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist;
    expect(response.body).to.exist;
  }

  validarRespostaCadastro(response, usuarioEsperado) {
    expect(response.status).to.eq(201);
    expect(response.body).to.be.an("object");

    expect(response.body.message).to.eq("User created successfully");
    expect(response.body.data).to.be.an("object");

    const usuarioCadastrado = response.body.data;

    expect(usuarioCadastrado).to.have.property("id").and.be.a("number");
    expect(usuarioCadastrado).to.have.property("name", usuarioEsperado.name);
    expect(usuarioCadastrado).to.have.property("email", usuarioEsperado.email);
    expect(usuarioCadastrado).to.have.property("role", "user");
    expect(usuarioCadastrado).to.have.property("active", true);
    expect(usuarioCadastrado).to.not.have.property("password");
  }

  validarLimpezaUsuarios(response) {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.eq("User data reset successfully");

    const resultado = response.body.data;

    expect(resultado.admin).to.have.property("name", "QA Admin");
    const { email } = obterCredenciaisAdministrador();

    expect(resultado.admin).to.have.property("email", email);
    expect(resultado.admin).to.have.property("status", "active");
    expect(resultado.admin).to.have.property("role", "admin");
    expect(resultado.admin).to.not.have.property("password");
  }

  validarAtualizacaoUsuario(response, dadosAtualizados, usuarioId) {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("object");

    expect(response.body.message).to.eq("User updated successfully");
    expect(response.body.data).to.be.an("object");

    const usuarioAtualizado = response.body.data;

    expect(usuarioAtualizado).to.have.property("id", usuarioId);
    expect(usuarioAtualizado).to.have.property("name", dadosAtualizados.name);
    expect(usuarioAtualizado).to.have.property("email", dadosAtualizados.email);
    expect(usuarioAtualizado).to.have.property("role").and.be.a("string");
    expect(usuarioAtualizado).to.have.property("active").and.be.a("boolean");
    expect(usuarioAtualizado).to.not.have.property("password");
  }

  validarStatusUsuario(response, usuarioId, statusEsperado) {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.eq("User status updated successfully");
    expect(response.body.data).to.be.an("object");

    const usuarioAlterado = response.body.data;

    expect(usuarioAlterado).to.have.property("id", usuarioId);
    expect(usuarioAlterado).to.have.property("active", statusEsperado);
    expect(usuarioAlterado).to.not.have.property("password");
  }

  validarExclusao(response, usuarioId) {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.eq("User deleted successfully");
    expect(response.body.data).to.be.an("object");
    expect(response.body.data).to.have.property("id", usuarioId);
    expect(response.body.data).to.not.have.property("password");
  }

  validarUsuarioRetornado(response, usuarioEsperado, usuarioId) {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("object");
    expect(response.body.data).to.be.an("object");

    const usuarioRetornado = response.body.data;

    expect(usuarioRetornado).to.have.property("id", usuarioId);
    expect(usuarioRetornado).to.have.property("name", usuarioEsperado.name);
    expect(usuarioRetornado).to.have.property("email", usuarioEsperado.email);
    expect(usuarioRetornado).to.have.property("role").and.be.a("string");
    expect(usuarioRetornado).to.have.property("active").and.be.a("boolean");
    expect(usuarioRetornado).to.not.have.property("password");
  }

  validarListagemUsuarios(response) {
    expect(response.status).to.eq(200);

    expect(response.body).to.be.an("array");
    expect(response.body).to.not.be.empty;

    response.body.forEach((usuario, indice) => {
      expect(usuario, `usuario ${indice + 1}`)
        .to.have.property("id")
        .to.be.a("number");

      expect(usuario).to.have.property("name").to.be.a("string");

      expect(usuario).to.have.property("email").to.be.a("string");

      expect(usuario).to.have.property("role").to.be.a("string");

      expect(usuario).to.have.property("active").to.be.a("boolean");

      expect(usuario).to.not.have.property("password");
    });
  }
}

export default new UsuariosApi();
