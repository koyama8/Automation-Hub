describe("GET /api/orders", () => {
  let token;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve listar os pedidos", () => {
    cy.api({
      method: "GET",
      url: "http://localhost:3030/api/orders",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.be.an("array");
      expect(response.body).to.not.be.empty;

      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("clientId");
      expect(response.body[0]).to.have.property("status");
      expect(response.body[0]).to.have.property("totalCents");
      expect(response.body[0]).to.have.property("client");
      expect(response.body[0]).to.have.property("items");
      expect(response.body[0].items).to.be.an("array");
    });
  });
});
