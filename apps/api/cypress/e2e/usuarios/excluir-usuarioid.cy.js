import { fakerPT_BR as faker } from "@faker-js/faker";

describe("DELETE /api/users/{{userId}}", () => {
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

  it("deve excluir um usuario por id", () => {
    cy.api({
      method: "DELETE",
      url: `http://localhost:3030/api/users/${usuarioID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
