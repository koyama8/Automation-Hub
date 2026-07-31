import { fakerPT_BR as faker } from "@faker-js/faker";

describe("GET /api/permissions/users/:id/effective-permissions - Permissões efetivas", () => {
  let token;
  let managedUserId;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve consultar as permissões efetivas do usuário gerenciado", () => {
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

      cy.api({
        method: "GET",
        url: `http://localhost:3030/api/permissions/users/${managedUserId}/effective-permissions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
