import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, Star, Minus, Plus, Truck } from "lucide-react"
import { getProductById, PRODUCTS } from "@/data/products"
import { formatPrice, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ProductCard"
import { AdSlot } from "@/components/AdSlot"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"

export function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted">Product not found.</p>
        <Link to="/" className="mt-3 inline-block underline">Back to shop</Link>
      </div>
    )
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const wished = isWishlisted(product.id)

  return (
    <div className="container py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-sand">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-moss-dark">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            <Star size={14} className="fill-ink/70 text-ink/70" />
            <span>{product.rating}</span>
            <span>· {product.reviews} reviews</span>
          </div>
          <p className="mt-4 text-2xl font-medium">{formatPrice(product.priceCents)}</p>
          <p className="mt-4 max-w-md text-sm text-muted">
            Made from responsibly sourced materials, finished by hand, and built to hold up
            to daily use. Ships in plastic-free packaging.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded border border-line">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-ink/5" aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-ink/5" aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
            <Button
              variant="moss"
              size="lg"
              className="flex-1"
              onClick={() => addItem({ id: product.id, name: product.name, priceCents: product.priceCents, image: product.image }, qty)}
            >
              Add to cart
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="rounded border border-line p-3.5 hover:bg-ink/5"
            >
              <Heart size={18} className={cn(wished && "fill-clay text-clay")} />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded bg-sand/60 p-3 text-sm text-muted">
            <Truck size={16} />
            Free shipping on orders over $75. Delivered in 3–5 business days.
          </div>

          <div className="mt-8">
            <AdSlot size="banner" label="Sponsored" className="h-20" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 text-lg font-medium">You may also like</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
