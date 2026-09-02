class CarrinhoApi {
  adicionarCarrinho(token, itemCarrinho) {
    return cy.api({
      method: 'POST',
      url: '/api/cart/items',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: itemCarrinho,
    })
  }

  consultarItem(token, clientId) {
    return cy.api({
      method: 'GET',
      url: `/api/cart/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  atualizarCarrinho(token, cartItemId, itemCarrinho) {
    return cy.api({
      method: 'PATCH',
      url: `/api/cart/items/${cartItemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: itemCarrinho,
    })
  }

  limparCarrinhoPorID(token, clientId) {
    return cy.api({
      method: 'DELETE',
      url: `/api/cart/${clientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  adicionarProdutoInexistente(token, itemCarrinho) {
    return cy.api({
      method: 'POST',
      url: '/api/cart/items',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: itemCarrinho,
    })
  }

  adicionarProdutoQtdInexistente(token, itemCarrinho) {
    return cy.api({
      method: 'POST',
      url: '/api/cart/items',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: itemCarrinho,
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarItemAdicionado(response) {
    expect(response.body.message).to.eq('Cart item added successfully')
  }

  validarDadosConsulta(response, clientId, productId) {
    expect(response.status).to.eq(200)

    const carrinho = response.body.data

    expect(carrinho.clientId).to.eq(clientId)

    const item = carrinho.items.find((item) => item.productId === productId)

    expect(item, 'produto encontrado no carrinho').to.exist
    expect(item.productId).to.eq(productId)
    expect(item.cartId).to.eq(carrinho.id)
  }

  validarItemAtualizado(response) {
    expect(response.body.message).to.eq('Cart item updated successfully')
    expect(response.body.data.totalItems).to.eq(5)
  }

  validarCarrinhoDeletado(response) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Cart cleared successfully')
  }

  validarProdutoInexistente(response) {
    expect(response.status).to.eq(404)
    expect(response.body.error).to.eq('Product not found!')
  }

  validarProdutoQtdInexistente(response) {
    expect(response.body.error).to.eq('Quantity must be a positive integer!')
  }
}

export default new CarrinhoApi()
