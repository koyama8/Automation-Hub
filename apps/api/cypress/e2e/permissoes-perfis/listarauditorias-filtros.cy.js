import { fakerPT_BR as faker } from '@faker-js/faker'

describe('template spec', () => {

  let adminToken
  let qatoken
  let managedUserId 

const identificador = `${Date.now()}-${faker.string.alphanumeric(6).toLowerCase()}`

  const administrador = {
    email: 'qa@adminlab.com',
    password: 'pwd123',
  }

  const usuarioQA = {
    name: 'QA Aluno',
    email: `qa.aluno.${identificador}@adminlab.com`,
    password: 'QaPleno@123',
    profile: 'qa',
    status: 'active',
    reason: 'Criacao de massa para validar o perfil QA',
  }

  const cliente = {
    name: 'Cliente criado por QA',
    email: `cliente.qa.${identificador}@adminlab.com`,
    document: faker.string.numeric(11),
    phone: '11999990000',
    company: 'QA Automation Lab',
    status: 'active',
  }
  beforeEach(() => {
    cy.loginApi().then((tokengerado) => {
      adminToken = tokengerado

    cy.api({
      method:'POST',
      url:'http://localhost:3030/api/permissions/users',
      headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      body:usuarioQA
     }).then((response) => {
      expect(response.status).to.eq(201)
      managedUserId = response.body.data.id

     })
    })
  })

  it('passes', () => {
    cy.api({
      method:'GET',
      url:`http://localhost:3030/api/permissions/audit?page=1&limit=20&targetUserId=${managedUserId}&sortOrder=desc`,
       headers: {
          Authorization: `Bearer ${adminToken}`,
        },
    }).then((response) =>{

    })
  })
})