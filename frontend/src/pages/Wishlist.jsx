import { Link, useNavigate } from "react-router-dom"
import { X } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Wishlist() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-2xl font-semibold">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-muted">Tap the heart on any product to save it here.</p>
        <Button variant="moss" className="mt-6" onClick={() => navigate("/")}>
          Browse products
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold">Wishlist</h1>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <div key={product.id} className="group relative">
            <button
              onClick={() => removeItem(product.id)}
              aria-label="Remove from wishlist"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-card"
            >
              <X size={14} />
            </button>
            <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden rounded-lg bg-sand">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </Link>
            <p className="mt-3 text-sm font-medium">{product.name}</p>
            <p className="text-sm text-muted">{formatPrice(product.priceCents)}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={() => addItem(product)}
            >
              Add to cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
