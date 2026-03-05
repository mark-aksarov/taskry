import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";
import { AssignedTasksEmptySection } from "./AssignedTasksEmptySection";

interface AssignedTasksPresentationProps {
  totalCount: number;
  page: number;
  pageSize: number;
  list: React.ReactNode;
  totalPages: number;
}

export function AssignedTasksPresentation({
  totalCount,
  page,
  pageSize,
  list,
  totalPages,
}: AssignedTasksPresentationProps) {
  if (totalCount === 0) {
    return <AssignedTasksEmptySection />;
  }

  return (
    <EntityPaginationProvider>
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        {list}
      </AssignedTasksSection>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </EntityPaginationProvider>
  );
}
