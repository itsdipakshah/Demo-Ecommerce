import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-6xl font-semibold">404</p>
      <p className="mt-3 text-muted">This page wandered off.</p>
      <Link to="/" className="mt-6 rounded bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink/90">
        Back to shop
      </Link>
    </div>
  )
}
