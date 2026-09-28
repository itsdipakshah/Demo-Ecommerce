import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"

export function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const { items: wishItems } = useWishlist()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container flex h-16 items-center gap-6">
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
          SewaSetu
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="h-10 w-full rounded-full border border-line bg-white pl-9 pr-3 text-sm focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1">
          <Link to="/wishlist" className="relative rounded p-2 hover:bg-ink/5" aria-label="Wishlist">
            <Heart size={20} />
            {wishItems.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] text-white">
                {wishItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded p-2 hover:bg-ink/5" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moss text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-1">
              <Link to="/dashboard" className="rounded p-2 hover:bg-ink/5" aria-label="Dashboard">
                <User size={20} />
              </Link>
              <button
                onClick={logout}
                className="hidden rounded px-3 py-2 text-sm text-muted hover:text-ink sm:block"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-1 rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink/90"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 py-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="h-10 w-full rounded-full border border-line bg-white pl-9 pr-3 text-sm focus:outline-none"
            />
          </form>
        </div>
      )}
    </header>
  )
}
