import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  theme?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        theme === "dark" && "[&_.section-copy]:text-zinc-300 [&_.section-title]:text-white",
        className,
      )}
    >
      <p className={cn("eyebrow", theme === "dark" && "eyebrow-light")}>{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-copy">{description}</p>}
    </div>
  );
}
