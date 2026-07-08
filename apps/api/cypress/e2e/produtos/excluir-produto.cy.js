import { fakerPT_BR as faker } from "@faker-js/faker";

describe("DELETE /api/products", () => {
  let token;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve excluir todos os produtos", () => {
    cy.api({
      method: "DELETE",
      url: "http://localhost:3030/api/products",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("deve excluir produto por id", () => {
    let productId;
    const timestamp = Date.now();

    const produto = {
      name: `${faker.commerce.productName()} ${timestamp}`,
      sku: `BRU-${faker.string.alphanumeric(6).toUpperCase()}-${timestamp}`,
      description: faker.commerce.productDescription(),
      priceCents: faker.number.int({ min: 1000, max: 99900 }),
      stock: faker.number.int({ min: 1, max: 100 }),
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

      cy.api({
        method: "DELETE",
        url: `http://localhost:3030/api/products/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
