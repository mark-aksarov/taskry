import { twMerge } from "tailwind-merge";
import { Badge, BadgeProps } from "@/components/ui/Badge";

export function ItemBaseBadge({
  className,
  ...props
}: BadgeProps & { className?: string }) {
  return (
    <Badge className={twMerge("w-[5.625rem] px-2", className)} {...props} />
  );
}
