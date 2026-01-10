"use client";

import { twMerge } from "tailwind-merge";
import { List } from "@/components/common/List";

export function UserTaskListLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <List
      data-test="user-task-list"
      className={twMerge("md:gap-0 md:px-6", className)}
    >
      {children}
    </List>
  );
}
