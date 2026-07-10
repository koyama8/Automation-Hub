import { prisma } from '../lib/prisma.js'

const cartInclude = {
  client: {
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
    },
  },
  items: {
    orderBy: { id: 'asc' },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          priceCents: true,
          stock: true,
          status: true,
        },
      },
    },
  },
}

export function findActiveCartByClientId(clientId) {
  return prisma.cart.findFirst({
    where: { clientId, status: 'active' },
    include: cartInclude,
    orderBy: { id: 'desc' },
  })
}

export function findCartItemById(id) {
  return prisma.cartItem.findUnique({
    where: { id },
    include: {
      cart: true,
      product: true,
    },
  })
}

export function getOrCreateActiveCart(clientId) {
  return prisma.$transaction(async (transaction) => {
    const existingCart = await transaction.cart.findFirst({
      where: { clientId, status: 'active' },
      orderBy: { id: 'desc' },
    })

    const cart = existingCart || (await transaction.cart.create({ data: { clientId } }))

    return transaction.cart.findUnique({
      where: { id: cart.id },
      include: cartInclude,
    })
  })
}

export function addItemToCart({ cartId, productId, quantity, unitPriceCents }) {
  return prisma.$transaction(async (transaction) => {
    await transaction.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
        unitPriceCents,
        subtotalCents: quantity * unitPriceCents,
      },
    })

    return transaction.cart.findUnique({ where: { id: cartId }, include: cartInclude })
  })
}

export function updateCartItem(id, { quantity, unitPriceCents }) {
  return prisma.$transaction(async (transaction) => {
    const item = await transaction.cartItem.update({
      where: { id },
      data: {
        quantity,
        unitPriceCents,
        subtotalCents: quantity * unitPriceCents,
      },
    })

    return transaction.cart.findUnique({ where: { id: item.cartId }, include: cartInclude })
  })
}

export function deleteCartItem(id) {
  return prisma.$transaction(async (transaction) => {
    const item = await transaction.cartItem.delete({ where: { id } })
    return transaction.cart.findUnique({ where: { id: item.cartId }, include: cartInclude })
  })
}

export function clearCart(cartId) {
  return prisma.$transaction(async (transaction) => {
    await transaction.cartItem.deleteMany({ where: { cartId } })
    return transaction.cart.findUnique({ where: { id: cartId }, include: cartInclude })
  })
}
