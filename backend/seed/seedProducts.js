import dotenv from "dotenv"
import { connectDB } from "../config/db.js"
import Product from "../models/Product.js"

dotenv.config()

const products = [
  { name: "Ceramic Pour-Over Set", category: "Kitchen", priceCents: 4800, rating: 4.8, reviews: 214, image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600", tag: "Bestseller" },
  { name: "Linen Weave Throw", category: "Home", priceCents: 6200, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1580301762395-83c9ba7c6d94?w=600" },
  { name: "Oak Desk Organizer", category: "Desk", priceCents: 3400, rating: 4.7, reviews: 152, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600" },
  { name: "Enamel Camp Mug", category: "Outdoors", priceCents: 1800, rating: 4.5, reviews: 61, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600" },
  { name: "Stoneware Dinner Set", category: "Kitchen", priceCents: 8900, rating: 4.9, reviews: 302, image: "https://images.unsplash.com/photo-1584346133934-a3044ba26c46?w=600", tag: "New" },
  { name: "Waffle Cotton Towel Set", category: "Bath", priceCents: 5200, rating: 4.4, reviews: 77, image: "https://images.unsplash.com/photo-1620293023555-2ee1d6c39cba?w=600" },
]

async function run() {
  await connectDB()
  await Product.deleteMany({})
  await Product.insertMany(products)
  console.log(`Seeded ${products.length} products`)
  process.exit(0)
}

run()
