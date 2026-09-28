import Stripe from "stripe"
import Order from "../models/Order.js"

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

// POST /api/orders/create-checkout-session
// Creates a pending order, then a Stripe Checkout Session for it.
export async function createCheckoutSession(req, res) {
  const { items, shipping } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" })
  }
  if (!stripe) {
    return res.status(500).json({
      message: "Stripe is not configured. Set STRIPE_SECRET_KEY in backend/.env",
    })
  }

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.qty, 0)

  const order = await Order.create({
    user: req.user._id,
    items: items.map((i) => ({ productId: i.id, name: i.name, priceCents: i.priceCents, qty: i.qty })),
    shipping,
    totalCents,
    status: "pending",
  })

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((i) => ({
      price_data: {
        currency: "usd",
        product_data: { name: i.name },
        unit_amount: i.priceCents,
      },
      quantity: i.qty,
    })),
    success_url: `${process.env.CLIENT_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout?checkout=cancelled`,
    client_reference_id: order._id.toString(),
    metadata: { orderId: order._id.toString() },
  })

  order.stripeSessionId = session.id
  await order.save()

  res.json({ url: session.url })
}

// GET /api/orders/mine
export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders)
}

// POST /api/orders/webhook (Stripe raw body — see server.js for the raw-body route wiring)
// Marks the matching order as paid once Stripe confirms the payment.
export async function stripeWebhook(req, res) {
  if (!stripe) return res.status(500).send("Stripe not configured")

  const signature = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`)
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    await Order.findByIdAndUpdate(session.metadata.orderId, {
      status: "paid",
      stripePaymentIntentId: session.payment_intent,
    })
  }

  res.json({ received: true })
}
