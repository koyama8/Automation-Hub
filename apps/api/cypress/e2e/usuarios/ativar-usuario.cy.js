import { fakerPT_BR as faker } from "@faker-js/faker";

describe("PATCH /api/users/:userId/status", () => {
  let token;
  let usuarioID;

  const usuario = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;

      cy.api({
        method: "POST",
        url: "http://localhost:3030/api/users/register",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: usuario,
      }).then((response) => {
        expect(response.status).to.eq(201);
        usuarioID = response.body.data.id;
      });
    });
  });

  it("deve ativiar o usuario", () => {
    cy.api({
      method: "PATCH",
      url: `http://localhost:3030/api/users/${usuarioID}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        active: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
