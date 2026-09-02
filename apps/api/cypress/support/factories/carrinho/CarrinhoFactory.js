function gerarItemCarrinhoValido(clientId, productId, sobrescritas = {}) {
  return {
    clientId,
    productId,
    quantity: 2,
    ...sobrescritas,
  }
}

function gerarItemCarrinhoAtualizado(clientId, productId, sobrescritas = {}) {
  return {
    clientId,
    productId,
    quantity: 5,
    ...sobrescritas,
  }
}

function gerarItemCarrinhoInexistente(clientId, productId, sobrescritas = {}) {
  return {
    clientId,
    productId: 999999,
    quantity: 1,
    ...sobrescritas,
  }
}

function gerarItemCarrinhoQuantidadeInvalida(clientId, productId, sobrescritas = {}) {
  return {
    clientId,
    productId,
    quantity: 0,
    ...sobrescritas,
  }
}

export {
  gerarItemCarrinhoValido,
  gerarItemCarrinhoAtualizado,
  gerarItemCarrinhoInexistente,
  gerarItemCarrinhoQuantidadeInvalida,
}
