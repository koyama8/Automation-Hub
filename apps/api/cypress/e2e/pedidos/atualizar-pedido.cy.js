import { fakerPT_BR as faker } from "@faker-js/faker";

describe("PATCH /api/orders/:id", () => {
  let token;
  let clientId;
  let productId;
  let orderId;
  let cliente;
  let produto;

  const priceCents = 2590;
  const quantity = 2;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;

      cliente = {
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

        produto = {
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
            orderId = response.body.data.id;
          });
        });
      });
    });
  });

  it("deve atualizar o status do pedido", () => {
    cy.api({
      method: "PATCH",
      url: `http://localhost:3030/api/orders/${orderId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        status: "processing",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Order status updated successfully");
      expect(response.body.data.id).to.have.eq(orderId);
      expect(response.body.data.status).to.eq("processing");
      expect(response.body.data.totalCents).to.eq(5180);
      expect(response.body.data.notes).to.eq(null);
      expect(response.body.data.client.name).to.eq(cliente.name);
      expect(response.body.data.client.email).to.eq(cliente.email);
      expect(response.body.data.client.company).to.eq(cliente.company);

      expect(response.body.data.items).to.be.an("array");
      expect(response.body.data.items[0].productName).to.eq(produto.name);
      expect(response.body.data.items[0].quantity).to.eq(quantity);
      expect(response.body.data.items[0].subtotalCents).to.eq(priceCents * quantity);
    });
  });

  it("deve cancelar o pedido", () => {
    cy.api({
      method: "PATCH",
      url: `http://localhost:3030/api/orders/${orderId}/cancel`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
