/**
 * Minimal UI primitives so the Injury components are drop-in with no design-system
 * dependency. Replace any of these with your own equivalents (shadcn/ui Card,
 * Tooltip, your `cn`, etc.) — the Injury components only need these signatures.
 *
 * The Tooltip here is a zero-dependency CSS hover/focus popover (no Radix). It
 * accepts `side`/`collisionPadding` for API-compatibility but ignores them. For
 * collision-aware positioning, swap in shadcn/ui's Radix tooltip.
 */
import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
}

export function SkeletonLines({ n }: { n: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-3.5 rounded bg-muted/40 animate-pulse" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
      ))}
    </div>
  );
}

export function ComingSoon({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <Card className="p-10 text-center">
      <Icon className="w-7 h-7 text-muted-foreground/50 mx-auto mb-3" />
      <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
      <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">{body}</p>
    </Card>
  );
}

export function SectionTitle({ icon: Icon, title, noMargin }: { icon: LucideIcon; title: string; noMargin?: boolean }) {
  return (
    <div className={cn("flex items-center gap-1.5", noMargin ? "" : "mb-3")}>
      <Icon className="w-4 h-4 text-[#d4af37]" />
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
    </div>
  );
}

// ── Lightweight Tooltip (CSS hover/focus; no Radix) ───────────────────────────
export function Tooltip({ children }: { children: ReactNode }) {
  return <span className="relative inline-flex group/tt">{children}</span>;
}

export function TooltipTrigger({ children }: { children: ReactNode; asChild?: boolean }) {
  return <>{children}</>;
}

export function TooltipContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  collisionPadding?: number;
}) {
  return (
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-normal rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
        "group-hover/tt:block group-focus-within/tt:block",
        className,
      )}
    >
      {children}
    </span>
  );
}
