import { EntityContainerPagination } from "../common/EntityContainerPagination";

interface UserTasksPresentationProps {
  page: number;
  pageSize: number;
  listLarge: React.ReactNode;
  gridMobile: React.ReactNode;
  totalPages: number;
}

export function UserTasksPresentation({
  page,
  pageSize,
  listLarge,
  gridMobile,
  totalPages,
}: UserTasksPresentationProps) {
  return (
    <>
      <div className="max-md:hidden">{listLarge}</div>
      <div className="md:hidden">{gridMobile}</div>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        className="md:my-4"
      />
    </>
  );
}
