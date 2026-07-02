describe("GET /api/contracts/999999", () => {
  let token;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve retornar 404 ao buscar contrato inexistente", () => {
    cy.api({
      method: "GET",
      url: "http://localhost:3030/api/contracts/999999",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error).to.eq("Contract not found!");
    });
  });
});
