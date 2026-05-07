import { Badge } from "@/ui/Badge";
import { tv } from "tailwind-variants";

const introBadgeStyles = tv({
  slots: {
    badge:
      "gap-2 px-4 py-2 text-sm font-semibold max-sm:self-start sm:self-center",
    dot: "h-2 w-2 shrink-0 rounded-full bg-(--icon-info)",
  },
});

export function IntroBadge() {
  const s = introBadgeStyles();

  return (
    <Badge color="blue" className={s.badge()}>
      <span className={s.dot()} />
      Менеджер управления задачами
    </Badge>
  );
}
