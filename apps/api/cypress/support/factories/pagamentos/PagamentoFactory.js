function gerarPagamento(orderId, method, sobrescritas = {}) {
  const pagamento = { orderId, method, ...sobrescritas }

  if (method === 'card' && !pagamento.cardNumber) {
    pagamento.cardNumber = '4111111111111111'
  }

  return pagamento
}

export { gerarPagamento }
