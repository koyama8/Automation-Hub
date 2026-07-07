describe("PATCH /api/products/{{productId}}/status", () => {
  let token;
  let productId;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;

      const timestamp = Date.now();

      const produto = {
        name: `Produto Bruno ${timestamp}`,
        sku: `BRU-${timestamp}`,
        description: "Produto criado pelo Cypress",
        priceCents: 19990,
        stock: 25,
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

  it("deve inativar o status do produto", () => {
    cy.api({
      method: "PATCH",
      url: `http://localhost:3030/api/products/${productId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        status: "inactive",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("deve ativar o status do produto", () => {

    cy.api({
      method: "PATCH",
      url: `http://localhost:3030/api/products/${productId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        status: "active",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  })
})
