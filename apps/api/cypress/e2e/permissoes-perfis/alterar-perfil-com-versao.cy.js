import { fakerPT_BR as faker } from "@faker-js/faker";

describe("PATCH /api/permissions/users/:id/profile - Alteração de perfil", () => {
  let token;
  let managedUserId;
  let managedUserVersion;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve alterar o perfil do usuário utilizando a versão atual", () => {
    const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(8).toLowerCase()}`;

    const idempotencyKey = `managed-user-${identificadorUnico}`;

    const usuarioQA = {
      name: faker.person.fullName(),
      email: `qa.pleno.${identificadorUnico}@adminlab.com`,
      password: "QaPleno@123",
      profile: "qa",
      status: "active",
      reason: faker.lorem.sentence(),
    };

    cy.api({
      method: "POST",
      url: "http://localhost:3030/api/permissions/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: usuarioQA,
    }).then((response) => {
      expect(response.status).to.eq(201);
      managedUserId = response.body.data.id;
      managedUserVersion = response.body.data.version;

      const alteracaoPerfil = {
        profile: "viewer",
        version: managedUserVersion,
        reason:
          "Reduzir privilégios para validar a matriz de permissões do perfil viewer",
      };

      cy.api({
        method: "PATCH",
        url: `http://localhost:3030/api/permissions/users/${managedUserId}/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: alteracaoPerfil,
        body: alteracaoPerfil,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
