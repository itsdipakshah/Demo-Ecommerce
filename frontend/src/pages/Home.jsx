import { Fragment, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/ProductCard"
import { AdSlot } from "@/components/AdSlot"
import { Button } from "@/components/ui/button"
import { CATEGORIES, PRODUCTS } from "@/data/products"
import { cn } from "@/lib/utils"

export function Home() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get("q") || ""
  const [category, setCategory] = useState("All")
  const [products, setProducts] = useState(PRODUCTS)

  // Swap this for a real fetch once the backend is running:
  // useEffect(() => {
  //   axiosClient.get("/products").then(({ data }) => setProducts(data))
  // }, [])
  useEffect(() => setProducts(PRODUCTS), [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category
      const matchesQuery = p.name.toLowerCase().includes(q.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [products, category, q])

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-sand/50">
        <div className="container grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-widest text-moss-dark">
              New season edit
            </span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Everyday objects,
              <br />
              made to be kept.
            </h1>
            <p className="mt-4 max-w-md text-muted">
              {filtered.length} pieces for the kitchen, the desk and the home —
              built from honest materials and priced without the markup.
            </p>
            <div className="mt-7 flex gap-3">
              <Button variant="moss" size="lg">
                Shop the edit <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg">
                Our story
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200"
              alt="A considered, sunlit home interior"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Leaderboard ad — high-visibility placement right below the fold */}
      <div className="container py-6">
        <AdSlot size="leaderboard" label="Advertisement · 728×90" />
      </div>

      <section className="container py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Sidebar: filters + skyscraper ad */}
          <aside className="lg:w-56 lg:shrink-0">
            <p className="mb-3 text-sm font-medium text-ink">Category</p>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-left text-sm transition-colors lg:rounded lg:px-3 lg:py-2",
                    category === c
                      ? "bg-ink text-paper"
                      : "bg-white text-ink/70 border border-line hover:border-ink/40"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-8 hidden lg:block">
              <AdSlot size="skyscraper" label="Advertisement · 160×600" />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted">
                Showing <span className="font-medium text-ink">{filtered.length}</span> products
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, idx) => (
                <Fragment key={product.id}>
                  <ProductCard product={product} />
                  {/* Native in-grid ad every 8 products */}
                  {(idx + 1) % 8 === 0 && (
                    <div className="col-span-2 sm:col-span-3 xl:col-span-4">
                      <AdSlot size="banner" label="Sponsored" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-muted">
                No products match “{q}”. Try a different search or category.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Bottom banner ad, above footer */}
      <div className="container pb-14">
        <AdSlot size="banner" label="Advertisement" className="h-[120px]" />
      </div>
    </div>
  )
}
