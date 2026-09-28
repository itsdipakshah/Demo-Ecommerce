import Product from "../models/Product.js"

export async function getProducts(req, res) {
  const { category, q } = req.query
  const filter = {}
  if (category && category !== "All") filter.category = category
  if (q) filter.name = { $regex: q, $options: "i" }

  const products = await Product.find(filter).sort({ createdAt: -1 })
  res.json(products)
}

export async function getProductById(req, res) {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: "Product not found" })
  res.json(product)
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body)
  res.status(201).json(product)
}
