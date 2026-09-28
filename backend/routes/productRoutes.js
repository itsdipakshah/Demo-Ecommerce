import express from "express"
import { getProducts, getProductById, createProduct } from "../controllers/productController.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", createProduct) // protect + restrict to admins in production

export default router
