import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PATCH /api/cart/items/{{cartItemId}}', () => {
  
  let token
  let cartItemId

  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      token = tokengerado

      

      cy
    })
  })


  it('deve atualizar a quantidade de itens no carrinho', () => {
   
    
  })
})