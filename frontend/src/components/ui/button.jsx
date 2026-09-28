import { cn } from "@/lib/utils"

const variants = {
  primary: "bg-ink text-paper hover:bg-ink/90",
  moss: "bg-moss text-white hover:bg-moss-dark",
  outline: "border border-ink/15 text-ink hover:bg-ink/5",
  ghost: "text-ink hover:bg-ink/5",
  clay: "bg-clay text-white hover:bg-clay/90",
}

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
}

export function Button({ className, variant = "primary", size = "md", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
