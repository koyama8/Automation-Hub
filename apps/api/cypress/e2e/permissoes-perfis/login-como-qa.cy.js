import { fakerPT_BR as faker } from "@faker-js/faker";

describe("POST /api/auth/login - Autenticação do usuário QA", () => {
  let token;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve autenticar o usuário com perfil QA com sucesso", () => {
    const identificadorUnico = `${Date.now()}-${faker.string.alphanumeric(8).toLowerCase()}`;

    const usuarioQA = {
      name: faker.person.fullName(),
      email: `qa.pleno.${identificadorUnico}@adminlab.com`,
      password: "QaPleno@123",
      profile: "qa",
      status: "active",
      reason: "Criar usuário QA para validar autenticação",
    };

    cy.api({
      method: "POST",
      url: "http://localhost:3030/api/users/register",
      headers: {
        Authorization: `Bearer ${token}`,
        "Idempotency-Key": `managed-user-${identificadorUnico}`,
      },
      body: usuarioQA,
    }).then((response) => {
      expect(response.status).to.eq(201);

      const credenciaisQA = {
        email: usuarioQA.email,
        password: usuarioQA.password,
      };

      cy.api({
        method: "POST",
        url: "http://localhost:3030/api/auth/login",

        body: credenciaisQA,
      });
    });
  });
});
