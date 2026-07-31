import { fakerPT_BR as faker } from "@faker-js/faker";

describe("PATCH /api/permissions/users/:id/access - Bloqueio de acesso", () => {
  let token;
  let managedUserId;
  let managedUserVersion;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve bloquear o acesso do usuário gerenciado com sucesso", () => {
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

      const bloquearAcesso = {
        status: "blocked",
        version: managedUserVersion,
        reason:
          "Reduzir privilégios para validar a matriz de permissões do perfil viewer",
      };

      cy.api({
        method: "PATCH",
        url: `http://localhost:3030/api/permissions/users/${managedUserId}/access`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: bloquearAcesso,
      }).then((response) => {
        expect(response.status).to.eq(200);
        managedUserVersion = response.body.data.version;

        const liberarAcesso = {
          status: "active",
          version: managedUserVersion,
          reason: "Liberacao apos revisao administrativa do acesso",
        };

        cy.api({
          method: "PATCH",
          url: `http://localhost:3030/api/permissions/users/${managedUserId}/access`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: liberarAcesso,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});
