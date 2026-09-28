import { Link, useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"

export function Cart() {
  const { items, updateQty, removeItem, subtotalCents } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted">Add something you'll actually use.</p>
        <Button variant="moss" className="mt-6" onClick={() => navigate("/")}>
          Continue shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="divide-y divide-line">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-5">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded object-cover bg-sand" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{item.name}</p>
                  <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-muted hover:text-clay">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded border border-line">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2 hover:bg-ink/5" aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2 hover:bg-ink/5" aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.priceCents * item.qty)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-line p-6">
          <h2 className="text-sm font-medium">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-medium">
            <span>Total</span>
            <span>{formatPrice(subtotalCents)}</span>
          </div>
          <Button variant="moss" className="mt-5 w-full" onClick={() => navigate("/checkout")}>
            Checkout <ArrowRight size={16} />
          </Button>
          <Link to="/" className="mt-3 block text-center text-sm text-muted hover:text-ink">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
