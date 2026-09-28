import { cn } from "@/lib/utils"

/**
 * Reusable advertising placement.
 * Swap the placeholder markup for your ad network's script/tag
 * (Google AdSense, Amazon Associates, a house banner, etc.).
 * Sizes follow standard IAB ad units so real creatives drop in cleanly.
 */
const SIZES = {
  leaderboard: "h-[90px] w-full max-w-[728px]",   // 728x90
  banner: "h-[100px] w-full",                      // full-width responsive
  square: "h-[250px] w-full max-w-[300px]",        // 300x250
  skyscraper: "h-[600px] w-full max-w-[160px]",    // 160x600
}

export function AdSlot({ size = "banner", label = "Advertisement", className }) {
  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-center rounded border border-dashed border-line bg-sand/40 text-xs uppercase tracking-wide text-muted",
        SIZES[size],
        className
      )}
      data-ad-slot={size}
    >
      {label}
    </div>
  )
}
