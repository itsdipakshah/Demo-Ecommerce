import { Link } from "react-router-dom"
import { Instagram, Twitter, Youtube } from "lucide-react"

const columns = [
  {
    title: "Shop",
    links: ["Home", "Kitchen", "Desk", "Outdoors", "Bath", "Gift cards"],
  },
  {
    title: "Support",
    links: ["Track an order", "Returns", "Shipping", "Contact us", "FAQ"],
  },
  {
    title: "Company",
    links: ["About SewaSetu", "Sustainability", "Careers", "Press"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">SewaSetu</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Considered goods for the home, the desk, and everywhere in between.
            Designed to last, priced to be honest.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-line p-2 hover:bg-ink/5">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-line p-2 hover:bg-ink/5">
              <Twitter size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-line p-2 hover:bg-ink/5">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-ink">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link to="/" className="text-sm text-muted hover:text-ink">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SewaSetu Goods, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-ink">Privacy</Link>
            <Link to="/" className="hover:text-ink">Terms</Link>
            <Link to="/" className="hover:text-ink">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
