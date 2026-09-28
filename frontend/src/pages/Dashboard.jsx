import { useEffect, useState } from "react"
import { Package, Heart, MapPin, LogOut } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useWishlist } from "@/context/WishlistContext"
import { formatPrice } from "@/lib/utils"
import axiosClient from "@/api/axiosClient"

export function Dashboard() {
  const { user, logout } = useAuth()
  const { items: wishItems } = useWishlist()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axiosClient
      .get("/orders/mine")
      .then(({ data }) => setOrders(data))
      .catch(() => setOrders([])) // backend not running yet / no orders — fail quietly
  }, [])

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-semibold">Hi, {user?.name?.split(" ")[0] || "there"}</h1>
          <p className="mt-1 text-sm text-muted">{user?.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut size={16} /> Sign out
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-full bg-moss-light p-3 text-moss-dark"><Package size={20} /></div>
            <div>
              <p className="text-2xl font-semibold">{orders.length}</p>
              <p className="text-sm text-muted">Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-full bg-clay/10 p-3 text-clay"><Heart size={20} /></div>
            <div>
              <p className="text-2xl font-semibold">{wishItems.length}</p>
              <p className="text-sm text-muted">Wishlisted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-full bg-sand p-3 text-ink/70"><MapPin size={20} /></div>
            <div>
              <p className="text-2xl font-semibold">1</p>
              <p className="text-sm text-muted">Saved address</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-medium">Recent orders</h2>
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted">
              No orders yet. Once the backend is connected, completed checkouts will appear here.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="font-medium">{formatPrice(order.totalCents)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
