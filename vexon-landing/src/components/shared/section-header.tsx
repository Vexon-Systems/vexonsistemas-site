import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, className }: { eyebrow: string; title: string; description?: string; className?: string }) {
  return <div className={cn(className)}><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{description && <p className="section-copy">{description}</p>}</div>;
}
