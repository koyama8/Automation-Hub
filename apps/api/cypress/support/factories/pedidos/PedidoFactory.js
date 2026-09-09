function gerarPedidoValido(clientId, productId, sobrescritas = {}) {
  return {
    clientId,
    items: [{ productId, quantity: 2 }],
    ...sobrescritas,
  }
}

export { gerarPedidoValido }
