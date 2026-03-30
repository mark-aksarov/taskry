"use client";

import { useMediaQuery } from "react-responsive";
import { TasksEmptySection } from "./TasksEmptySection";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";
import { EntityContainerPagination } from "@/components/common/EntityContainerPagination";
import { EntityContainerPresentationProps } from "@/components/common/EntityContainerPresentation";

interface AssignedTasksPresentationProps
  extends Omit<EntityContainerPresentationProps, "gridLarge"> {
  totalCount: number;
}

export function AssignedTasksPresentation({
  totalCount,
  page,
  pageSize,
  listLarge,
  gridMobile,
  totalPages,
}: AssignedTasksPresentationProps) {
  const isMd = useMediaQuery({ query: "(max-width: 47.999rem)" });

  if (totalCount === 0) {
    return (
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <div className="flex h-[25rem] items-center justify-center">
          <TasksEmptySection headingClassName="max-md:text-3xl md:text-4xl" />
        </div>
      </AssignedTasksSection>
    );
  }

  let content;

  if (isMd) {
    content = gridMobile();
  } else {
    content = listLarge();
  }

  return (
    <>
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        {content}
      </AssignedTasksSection>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
