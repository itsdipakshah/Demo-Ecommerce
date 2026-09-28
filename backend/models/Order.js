import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    priceCents: Number,
    qty: Number,
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shipping: {
      name: String,
      address: String,
      city: String,
      zip: String,
    },
    totalCents: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model("Order", orderSchema)
