import { createContext, useContext, useEffect, useState } from "react"

const WishlistContext = createContext(null)
const STORAGE_KEY = "luma_wishlist"

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function isWishlisted(id) {
    return items.some((i) => i.id === id)
  }

  function toggleWishlist(product) {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeItem }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
