import {
  createContext, useContext, useRef, useState,
  type CSSProperties, type ReactNode,
} from "react";
import { createPortal } from "react-dom";
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

export function SectionTitle({ title, noMargin }: { title: string; noMargin?: boolean }) {
  return (
    <div className={cn("sc-sectitle", noMargin && "!mb-0")}>
      <h3>{title}</h3>
    </div>
  );
}

// Portaled tooltip — content renders in a fixed-position layer on document.body so
// it is never clipped by an ancestor's overflow (e.g. the timeline's horizontal scroll).

type TooltipCtx = { open: boolean; rect: DOMRect | null };
const TooltipContext = createContext<TooltipCtx>({ open: false, rect: null });

export function Tooltip({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const show = () => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
    setOpen(true);
  };
  const hide = () => setOpen(false);

  return (
    <TooltipContext.Provider value={{ open, rect }}>
      <span
        ref={ref}
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children }: { children: ReactNode; asChild?: boolean }) {
  return <>{children}</>;
}

export function TooltipContent({
  children,
  className,
  side = "top",
  collisionPadding = 8,
}: {
  children: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  collisionPadding?: number;
}) {
  const { open, rect } = useContext(TooltipContext);
  if (!open || !rect || typeof document === "undefined") return null;

  const gap = 8;
  const below = side === "bottom";
  // Keep the horizontally-centered tooltip inside the viewport.
  const half = 130; // ~half of the max tooltip width
  const centerX = Math.min(
    Math.max(rect.left + rect.width / 2, collisionPadding + half),
    window.innerWidth - collisionPadding - half,
  );
  const style: CSSProperties = {
    position: "fixed",
    left: centerX,
    top: below ? rect.bottom + gap : rect.top - gap,
    transform: below ? "translate(-50%, 0)" : "translate(-50%, -100%)",
    zIndex: 60,
  };

  return createPortal(
    <span
      role="tooltip"
      style={style}
      className={cn(
        "pointer-events-none whitespace-normal rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
        className,
      )}
    >
      {children}
    </span>,
    document.body,
  );
}
