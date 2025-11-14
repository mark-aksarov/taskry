import { List } from "@/components/common/List";
import { twMerge } from "tailwind-merge";

export function ProfileTaskList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <List className={twMerge("md:gap-0 md:px-6", className)}>{children}</List>
  );
}
