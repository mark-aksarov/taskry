import { twMerge } from "tailwind-merge";
import { Badge, BadgeProps } from "@/components/ui/Badge";

export function ItemBaseBadge({
  className,
  ...props
}: BadgeProps & { className?: string }) {
  return (
    <Badge
      className={twMerge("block w-[5.625rem] truncate px-2", className)}
      {...props}
    />
  );
}
