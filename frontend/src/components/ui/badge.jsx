import { cn } from "@/lib/utils"

const variants = {
  moss: "bg-moss-light text-moss-dark",
  clay: "bg-clay/10 text-clay",
  sand: "bg-sand text-ink/70",
}

export function Badge({ className, variant = "sand", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
