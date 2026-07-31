import { fakerPT_BR as faker } from "@faker-js/faker";

describe("POST /api/clients - Autorização do perfil QA", () => {
  let token;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve permitir que o usuário QA crie um cliente", () => {
    const cliente = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      document: faker.string.numeric(11),
      phone: faker.string.numeric(11),
      company: faker.company.name(),
      status: "active",
    };

    cy.api({
      method: "POST",
      url: "http://localhost:3030/api/clients",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cliente,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
