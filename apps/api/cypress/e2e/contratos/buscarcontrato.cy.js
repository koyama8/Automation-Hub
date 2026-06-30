import { fakerPT_BR as faker } from "@faker-js/faker";

describe("GET /api/contracts/{{contractId}}", () => {
  let token;
  let clientId;
  let contractId;

  beforeEach(() => {
    const cliente = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      document: faker.string.numeric(11),
      phone: faker.string.numeric(11),
      company: faker.company.name(),
      status: "inactive",
    };

    cy.loginApi().then((tokengerado) => {
      token = tokengerado;

      cy.api({
        method: "POST",
        url: "http://localhost:3030/api/clients",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: cliente,
      }).then((response) => {
        expect(response.status).to.eq(201);
        clientId = response.body.data.id;

        const contrato = {
          clientId,
          title: faker.commerce.productName(),
          plan: faker.helpers.arrayElement([
            "Mensal",
            "Trimestral",
            "Semestral",
            "Anual",
          ]),
          amountCents: faker.number.int({ min: 1000, max: 50000 }),
          startDate: "2026-07-01",
          endDate: "2026-12-31",
          status: "active",
          notes: faker.lorem.sentence(),
        };

        cy.api({
          method: "POST",
          url: "http://localhost:3030/api/contracts",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: contrato,
        }).then((response) => {
          expect(response.status).to.eq(201);
          contractId = response.body.data.id;
        });
      });
    });
  });

  it("deve buscar o contrato", () => {
    cy.api({
      method: "GET",
      url: `http://localhost:3030/api/contracts/${contractId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
