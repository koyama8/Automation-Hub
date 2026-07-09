import { fakerPT_BR as faker } from "@faker-js/faker";

describe("POST /api/orders", () => {
  let token;
  let clientId;
  let productId;

  const priceCents = 2590;
  const quantity = 2;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;

      const cliente = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        document: faker.string.numeric(11),
        phone: faker.string.numeric(11),
        company: faker.company.name(),
        status: "inactive",
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
        clientId = response.body.data.id;

        const produto = {
          name: faker.commerce.productName(),
          sku: `SKU-${Date.now()}-${faker.string.alphanumeric(4)}`.toUpperCase(),
          description: faker.commerce.productDescription(),
          priceCents,
          stock: 10,
          status: "active",
        };

        cy.api({
          method: "POST",
          url: "http://localhost:3030/api/products",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: produto,
        }).then((response) => {
          expect(response.status).to.eq(201);
          productId = response.body.data.id;
        });
      });
    });
  });

  it("deve criar um pedido com cliente e produto", () => {
    const pedido = {
      clientId,
      items: [
        {
          productId,
          quantity,
        },
      ],
      notes: faker.internet.notes,
    };

    cy.api({
      method: "POST",
      url: "http://localhost:3030/api/orders",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: pedido,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  })

  it('nao deve cadastrar um pedido sem cliente',() => {
      const pedido =
      {
  "clientId": 999999,
  "items": [
    {
      "productId": "{{productId}}",
      "quantity": 1
    }
  ]
}
      cy.api({
      method: "POST",
      url: "http://localhost:3030/api/orders",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: pedido,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });


  })


})
