import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"
import axiosClient from "@/api/axiosClient"

export function Checkout() {
  const { items, subtotalCents, clearCart } = useCart()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", zip: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handlePay(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      // Backend creates a Stripe Checkout Session and returns its hosted URL.
      // See backend/controllers/orderController.js -> createCheckoutSession
      const { data } = await axiosClient.post("/orders/create-checkout-session", {
        items: items.map((i) => ({ id: i.id, name: i.name, priceCents: i.priceCents, qty: i.qty })),
        shipping,
      })
      clearCart()
      if (data.url) {
        window.location.href = data.url // redirect to Stripe-hosted checkout
      } else {
        navigate("/dashboard")
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Payment could not be started. Make sure the backend and STRIPE_SECRET_KEY are configured."
      )
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-muted">Your cart is empty — nothing to check out.</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold">Checkout</h1>

      <form onSubmit={handlePay} className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full name"
                required
                className="sm:col-span-2"
                value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
              />
              <Input
                label="Address"
                required
                className="sm:col-span-2"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              />
              <Input
                label="City"
                required
                value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
              />
              <Input
                label="ZIP / postal code"
                required
                value={shipping.zip}
                onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">Payment</h2>
            <div className="flex items-center gap-3 rounded border border-line bg-sand/40 p-4 text-sm text-muted">
              <CreditCard size={18} />
              You'll enter your card securely on Stripe's hosted checkout page — SewaSetu never sees or stores your card number.
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-line p-6">
          <h2 className="text-sm font-medium">Order summary</h2>
          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted">{item.name} × {item.qty}</span>
                <span>{formatPrice(item.priceCents * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-medium">
            <span>Total due</span>
            <span>{formatPrice(subtotalCents)}</span>
          </div>
          {error && <p className="mt-3 text-sm text-clay">{error}</p>}
          <Button type="submit" variant="moss" className="mt-5 w-full" disabled={loading}>
            <Lock size={15} /> {loading ? "Redirecting to payment…" : `Pay ${formatPrice(subtotalCents)}`}
          </Button>
        </aside>
      </form>
    </div>
  )
}
