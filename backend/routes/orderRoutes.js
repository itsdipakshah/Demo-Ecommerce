import express from "express"
import { createCheckoutSession, getMyOrders } from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create-checkout-session", protect, createCheckoutSession)
router.get("/mine", protect, getMyOrders)

export default router
