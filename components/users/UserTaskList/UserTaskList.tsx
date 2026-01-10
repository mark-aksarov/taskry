"use client";

import { Children } from "react";
import { Repeat } from "@/components/common/Repeat";
import { UserTaskListLayout } from "./UserTaskListLayout";
import { UserTaskListItemSkeleton } from "../UserTaskListItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

export function UserTaskList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { isPending } = useEntityPagination();

  if (isPending) {
    return (
      <UserTaskListLayout className={className}>
        <Repeat
          items={Children.count(children)}
          renderItem={() => <UserTaskListItemSkeleton />}
        />
      </UserTaskListLayout>
    );
  }

  return (
    <UserTaskListLayout className={className}>{children}</UserTaskListLayout>
  );
}
