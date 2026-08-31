class ProdutosApi {
  cadastrarProduto(token, produto) {
    return cy.api({
      method: 'POST',
      url: '/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: produto,
    })
  }

  listarProdutos(token) {
    return cy.api({
      method: 'GET',
      url: '/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  buscarProduto(token, produtoId) {
    return cy.api({
      method: 'GET',
      url: `/api/products/${produtoId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  atualizarProduto(token, produtoId, produto) {
    return cy.api({
      method: 'PUT',
      url: `/api/products/${produtoId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: produto,
    })
  }

  ativarProduto(token, produtoId) {
    return cy.api({
      method: 'PATCH',
      url: `/api/products/${produtoId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        status: 'active',
      },
    })
  }

  inativarProduto(token, produtoId) {
    return cy.api({
      method: 'PATCH',
      url: `/api/products/${produtoId}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        status: 'inactive',
      },
    })
  }

  excluirProdutoPorId(token, produtoId) {
    return cy.api({
      method: 'DELETE',
      url: `/api/products/${produtoId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  cadastrarProdutoComNomeDuplicado(token, produto) {
    return cy.api({
      method: 'POST',
      url: '/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
      body: produto,
    })
  }

  excluirTodosOsProdutos(token) {
    return cy.api({
      method: 'DELETE',
      url: '/api/products',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  validarRespostaRecebida(response) {
    expect(response).to.exist
    expect(response.body).to.exist
  }

  validarProdutoCadastrado(response, produto) {
    expect(response.status).to.eq(201)
    expect(response.body.message).to.eq('Product created successfully')

    expect(response.body.data)
      .to.have.property('id')
      .and.be.a('number')
      .and.be.greaterThan(0)

    const produtoCadastrado = response.body.data

    expect(produtoCadastrado.name).to.eq(produto.name)
    expect(produtoCadastrado.sku).to.eq(produto.sku)
    expect(produtoCadastrado.description).to.eq(produto.description)
    expect(produtoCadastrado.priceCents).to.eq(produto.priceCents)
    expect(produtoCadastrado.stock).to.eq(produto.stock)
    expect(produtoCadastrado.status).to.eq(produto.status)
  }

  validarProdutoNaListagem(response, produto, produtoId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')
    expect(response.body).to.not.be.empty

    const produtoListado = response.body.find((item) => item.id === produtoId)

    expect(produtoListado).to.exist
    expect(produtoListado.name).to.eq(produto.name)
    expect(produtoListado.sku).to.eq(produto.sku)
    expect(produtoListado.priceCents).to.eq(produto.priceCents)
    expect(produtoListado.stock).to.eq(produto.stock)
    expect(produtoListado.status).to.eq(produto.status)
  }

  validarProdutoBuscado(response, produto, produtoId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body.data).to.be.an('object')

    const produtoBuscado = response.body.data

    expect(produtoBuscado.id).to.eq(produtoId)
    expect(produtoBuscado.name).to.eq(produto.name)
    expect(produtoBuscado.sku).to.eq(produto.sku)
    expect(produtoBuscado.description).to.eq(produto.description)
  }

  validarProdutoAtualizado(response, produto, produtoId) {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body.data).to.be.an('object')

    const produtoRetornado = response.body.data

    expect(produtoRetornado.id).to.eq(produtoId)
    expect(produtoRetornado.name).to.eq(produto.name)
    expect(produtoRetornado.sku).to.eq(produto.sku)
    expect(produtoRetornado.description).to.eq(produto.description)
  }

  validarProdutoAtivo(response) {
    expect(response.status).to.eq(200)
    expect(response.body.data.status).to.eq('active')
  }

  validarProdutoInativo(response) {
    expect(response.status).to.eq(200)
    expect(response.body.data.status).to.eq('inactive')
  }

  validarProdutoExcluido(response) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('Product deleted successfully')
  }

  validarRejeicaoPorNomeDuplicado(response) {
    expect(response.status).to.eq(409)
    expect(response.body.error).to.eq('Product name already exists!')
  }

  validarTodosOsProdutosExcluidos(response) {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('All products deleted successfully')
  }
}

export default new ProdutosApi()
