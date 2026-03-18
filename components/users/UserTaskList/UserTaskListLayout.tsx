import { twMerge } from "tailwind-merge";
import { List } from "@/components/common/List";

interface UserTaskListLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function UserTaskListLayout({
  className,
  children,
}: UserTaskListLayoutProps) {
  return (
    <List
      data-test="user-task-list"
      className={twMerge("md:gap-0 md:px-6", className)}
    >
      {children}
    </List>
  );
}
