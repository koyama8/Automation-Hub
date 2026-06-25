import { fakerPT_BR as faker } from '@faker-js/faker'

describe('PUT /api/users/', () => {

let token
let usuarioID 

 const usuario = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
 }

 beforeEach(()=> {
   cy.loginApi().then((tokengerado)=> {
     token = tokengerado

     cy.api({
      method:'POST',
      url:'http://localhost:3030/api/users/register',
      headers:{
        Authorization: `Bearer ${token}`,
      },
      body:usuario
     }).then((response)=> {
       expect(response.status).to.eq(201)
       usuarioID = response.body.data.id
     })
   })
 })


  it('deve atualizar o usuario', () => {
  
    const useadm = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }

   cy.api({
     method:'PUT',
     url:`http://localhost:3030/api/users/${usuarioID}`,
     headers:{
     Authorization: `Bearer ${token}`,
     },
     body:useadm
   }).then((response)=> {
     expect(response.status).to.eq(200)
   })
  })
})