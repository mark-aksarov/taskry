import { useIsMd } from "@/lib/hooks/useIsMd";
import { EntityContainerPagination } from "../common/EntityContainerPagination";
import { EntityContainerPresentationProps } from "../common/EntityContainerPresentation";

type UserTasksPresentationProps = Omit<
  EntityContainerPresentationProps,
  "gridLarge"
>;

export function UserTasksPresentation({
  page,
  pageSize,
  listLarge,
  gridMobile,
  totalPages,
}: UserTasksPresentationProps) {
  const isMd = useIsMd();

  let content;

  if (isMd) {
    content = gridMobile();
  } else {
    content = listLarge();
  }

  return (
    <>
      {content}

      <div className="md:py-4">
        <EntityContainerPagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}
