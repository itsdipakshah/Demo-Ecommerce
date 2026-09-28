import User from "../models/User.js"

export async function getWishlist(req, res) {
  const user = await User.findById(req.user._id)
  res.json(user.wishlist)
}

export async function toggleWishlist(req, res) {
  const { productId } = req.body
  const user = await User.findById(req.user._id)

  const exists = user.wishlist.some((i) => i.productId === productId)
  if (exists) {
    user.wishlist = user.wishlist.filter((i) => i.productId !== productId)
  } else {
    user.wishlist.push({ productId })
  }

  await user.save()
  res.json(user.wishlist)
}
