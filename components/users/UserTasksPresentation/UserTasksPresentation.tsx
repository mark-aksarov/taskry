"use client";

import { UserTaskList } from "../UserTaskList";
import { EntityContainerPagination } from "../../common/EntityContainerPagination";

export interface UserTasksPresentationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  children: React.ReactNode;
}

export function UserTasksPresentation({
  page,
  pageSize,
  totalPages,
  children,
}: UserTasksPresentationProps) {
  return (
    <>
      <UserTaskList>{children}</UserTaskList>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        className="md:py-4"
      />
    </>
  );
}
