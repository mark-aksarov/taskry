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

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
