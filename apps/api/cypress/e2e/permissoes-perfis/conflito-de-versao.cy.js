import { fakerPT_BR as faker } from "@faker-js/faker";

describe("PATCH /api/permissions/users/:id/profile - Conflito de versão", () => {
  let token;
  let managedUserId;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve retornar 409 ao alterar o perfil utilizando uma versão obsoleta", () => {
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

      const conflitoVersao = {
        profile: "qa",
        version: 2,
        reason: "Simular atualizacao concorrente com versao obsoleta",
      };

      cy.api({
        method: "PATCH",
        url: `http://localhost:3030/api/permissions/users/${managedUserId}/profile`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: conflitoVersao,
      }).then((response) => {
        expect(response.status).to.eq(409);
        expect(response.body.error).to.eq(
          "User version conflict! Current version is 1.",
        );
      });
    });
  });
});
