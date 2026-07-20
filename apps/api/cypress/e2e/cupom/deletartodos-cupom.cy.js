describe('template spec', () => {
  
   let token
  
  

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado
    })
  })

  it('deve deletar todos os cupom', () => {
    cy.api({
      method:'DELETE',
      url:'http://localhost:3030/api/coupons',
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})