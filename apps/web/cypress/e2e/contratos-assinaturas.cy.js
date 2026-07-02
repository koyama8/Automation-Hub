describe("Contratos / Assinaturas", () => {
  beforeEach(() => {
    cy.iniciar();
    cy.submeterLogin("qa@adminlab.com", "pwd123");

    cy.url().should("include", "/dashboard");

    cy.visit("/admin/contratos");
  });

  it("deve cadastrar um contrato", () => {
    cy.get('[data-field="contractClientId"]').should("be.visible");
    cy.get('[data-cy="contract-client"]')
      .select("Cliente Bruno - QA Automation Lab")
      .should("have.value", "1");
    cy.get('[data-cy="contract-title"]').type("Assinatura QA Pro");
    cy.get('[data-cy="contract-plan"]').type("Pro mensal");
    cy.get('[data-cy="contract-amount-cents"]').type("2000");
    cy.get('[data-cy="contract-status"]').select("Ativo");
    cy.get('[data-cy="contract-notes"]').type("Contrato feito pelo Bruno");

    cy.contains("button", "Cadastrar contrato").click();
  });

  it.only("deve validar os dados do contrato cadastrado", () => {
    cy.get('[data-cy="contracts-table-body"]').within(() => {
      cy.get('[data-cy="contract-row-2"]').within(() => {
        cy.contains("td", "2").should("be.visible");
        cy.contains("strong", "Cliente Bruno").should("be.visible");
        cy.contains("small", "cliente.bruno@gmail.com").should("be.visible");
        cy.contains("strong", "Assinatura QA Pro").should("be.visible");
        cy.contains("td", "R$ 20,00").should("be.visible");
        cy.get(".status-badge").should("be.visible");
        cy.contains("button", "Editar").should("be.visible");
        cy.contains("button", "Cancelar").should("be.visible");
        cy.contains("button", "Excluir").should("be.visible");
      });
    });
  });
});
