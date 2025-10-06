import { Badge, BadgeProps, Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const badgeStyles = "w-[5.5rem] px-0 @max-xl:hidden";

export function ItemCardBadge(props: BadgeProps) {
  return <Badge {...props} className={badgeStyles} />;
}

export function ItemCardBadgeSkeleton() {
  return <Skeleton className={twMerge(badgeStyles, "h-[1.75rem]")} />;
}
