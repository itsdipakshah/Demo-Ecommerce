import { cn } from "@/lib/utils"

export function Input({ className, label, error, id, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm text-ink/80">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-11 w-full rounded border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted",
          "focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss",
          error && "border-clay focus:border-clay focus:ring-clay",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-clay">{error}</p>}
    </div>
  )
}
