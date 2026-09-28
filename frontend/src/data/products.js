// Mock catalog used for local development / demo without a live backend.
// In production, Home.jsx fetches from GET /api/products (see backend/controllers/productController.js).
export const CATEGORIES = ["All", "Home", "Kitchen", "Desk", "Outdoors", "Bath"]

export const PRODUCTS = [
  { id: "p1", name: "Ceramic Pour-Over Set", category: "Kitchen", priceCents: 4800, rating: 4.8, reviews: 214, image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600", tag: "Bestseller" },
  { id: "p2", name: "Linen Weave Throw", category: "Home", priceCents: 6200, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1659710197197-354fb99f30aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TGluZW4lMjBXZWF2ZSUyMFRocm93fGVufDB8fDB8fHww" },
  { id: "p3", name: "Oak Desk Organizer", category: "Desk", priceCents: 3400, rating: 4.7, reviews: 152, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600" },
  { id: "p4", name: "Enamel Camp Mug", category: "Outdoors", priceCents: 1800, rating: 4.5, reviews: 61, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600" },
  { id: "p5", name: "Stoneware Dinner Set", category: "Kitchen", priceCents: 8900, rating: 4.9, reviews: 302, image: "https://images.unsplash.com/photo-1727257050264-33a4f5f0982a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3RvbmV3YXJlJTIwRGlubmVyJTIwU2V0fGVufDB8fDB8fHww", tag: "New" },
  { id: "p6", name: "Waffle Cotton Towel Set", category: "Bath", priceCents: 5200, rating: 4.4, reviews: 77, image: "https://media.istockphoto.com/id/2293724529/photo/neatly-folded-stack-of-light-gray-waffle-weave-towels-for-contemporary-home-interior-decor.webp?a=1&b=1&s=612x612&w=0&k=20&c=e5Uiez0dAahwqmXDbZfRmvwn_wLXd0zRneEc-QbVoOk=" },
  { id: "p7", name: "Walnut Desk Lamp", category: "Desk", priceCents: 7400, rating: 4.7, reviews: 133, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600" },
  { id: "p8", name: "Recycled Wool Blanket", category: "Home", priceCents: 9600, rating: 4.8, reviews: 189, image: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=600", tag: "Sale" },
  { id: "p9", name: "Cast Iron Trivet", category: "Kitchen", priceCents: 2200, rating: 4.3, reviews: 44, image: "https://media.istockphoto.com/id/2287478407/photo/red-vintage-enamel-teapot-on-a-cast-iron-stand-in-garden-shop.webp?a=1&b=1&s=612x612&w=0&k=20&c=tZL108_xaH_phu0PYxEVvaF6pvtX9tgiwrCoiFd1faY=" },
  { id: "p10", name: "Canvas Camp Chair", category: "Outdoors", priceCents: 6800, rating: 4.6, reviews: 91, image: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=600" },
  { id: "p11", name: "Marble Bath Tray", category: "Bath", priceCents: 4100, rating: 4.5, reviews: 58, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600" },
  { id: "p12", name: "Woven Storage Basket", category: "Home", priceCents: 3600, rating: 4.6, reviews: 121, image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600" },
]

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id)
}
