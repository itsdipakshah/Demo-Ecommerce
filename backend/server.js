import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import { stripeWebhook } from "./controllers/orderController.js"

import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }))

// Stripe webhook needs the raw body, so it's wired BEFORE express.json()
app.post("/api/orders/webhook", express.raw({ type: "application/json" }), stripeWebhook)

app.use(express.json())

app.get("/api/health", (req, res) => res.json({ status: "ok" }))

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/orders", orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Luma API running on port ${PORT}`))
