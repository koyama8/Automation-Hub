describe("DELETE /api/users", () => {
  let token;

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado;
    });
  });

  it("deve excluir todos os usuarios", () => {
    cy.api({
      method: "DELETE",
      url: "http://localhost:3030/api/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
