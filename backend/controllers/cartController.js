import User from "../models/User.js"

export async function getCart(req, res) {
  const user = await User.findById(req.user._id)
  res.json(user.cart)
}

export async function addToCart(req, res) {
  const { productId, qty = 1 } = req.body
  const user = await User.findById(req.user._id)

  const existing = user.cart.find((i) => i.productId === productId)
  if (existing) existing.qty += qty
  else user.cart.push({ productId, qty })

  await user.save()
  res.json(user.cart)
}

export async function updateCartItem(req, res) {
  const { qty } = req.body
  const user = await User.findById(req.user._id)
  const item = user.cart.find((i) => i.productId === req.params.productId)
  if (!item) return res.status(404).json({ message: "Item not in cart" })

  if (qty < 1) {
    user.cart = user.cart.filter((i) => i.productId !== req.params.productId)
  } else {
    item.qty = qty
  }

  await user.save()
  res.json(user.cart)
}

export async function removeFromCart(req, res) {
  const user = await User.findById(req.user._id)
  user.cart = user.cart.filter((i) => i.productId !== req.params.productId)
  await user.save()
  res.json(user.cart)
}
