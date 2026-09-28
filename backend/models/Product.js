import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    priceCents: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    tag: { type: String },
    description: { type: String, default: "" },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
)

export default mongoose.model("Product", productSchema)
