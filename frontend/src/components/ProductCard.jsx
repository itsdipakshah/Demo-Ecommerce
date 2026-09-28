import { Link } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatPrice, cn } from "@/lib/utils"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"

const tagVariant = { Sale: "clay", New: "moss", Bestseller: "sand" }

export function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const wished = isWishlisted(product.id)

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {product.tag && (
          <Badge variant={tagVariant[product.tag] || "sand"} className="absolute left-3 top-3">
            {product.tag}
          </Badge>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-card transition-colors hover:bg-white"
        >
          <Heart size={16} className={cn(wished ? "fill-clay text-clay" : "text-ink/60")} />
        </button>

        <button
          onClick={() => addItem({ id: product.id, name: product.name, priceCents: product.priceCents, image: product.image })}
          className="absolute inset-x-3 bottom-3 translate-y-10 rounded bg-ink py-2 text-sm font-medium text-paper opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to cart
        </button>
      </div>

      <div className="mt-3">
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-ink hover:underline">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          <Star size={12} className="fill-ink/70 text-ink/70" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <p className="mt-1 text-sm font-medium text-ink">{formatPrice(product.priceCents)}</p>
      </div>
    </div>
  )
}
