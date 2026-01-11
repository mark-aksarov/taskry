import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

interface AssignedTasksPresentationProps {
  page: number;
  pageSize: number;
  list: React.ReactNode;
  totalPages: number;
}

export function AssignedTasksPresentation({
  page,
  pageSize,
  list,
  totalPages,
}: AssignedTasksPresentationProps) {
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
