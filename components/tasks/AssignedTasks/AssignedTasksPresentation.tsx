import { TasksEmptySection } from "../TasksEmptySection";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";
import { EntityContainerPagination } from "@/components/common/EntityContainerPagination";

interface AssignedTasksPresentationProps {
  totalCount: number;
  page: number;
  pageSize: number;
  listLarge: React.ReactNode;
  gridMobile: React.ReactNode;
  totalPages: number;
}

export function AssignedTasksPresentation({
  totalCount,
  page,
  pageSize,
  listLarge,
  gridMobile,
  totalPages,
}: AssignedTasksPresentationProps) {
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

  return (
    <>
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <div className="max-md:hidden">{listLarge}</div>
        <div className="md:hidden">{gridMobile}</div>
      </AssignedTasksSection>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
