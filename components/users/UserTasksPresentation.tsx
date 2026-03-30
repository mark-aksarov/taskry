import { useMediaQuery } from "react-responsive";
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
  const isMd = useMediaQuery({ query: "(max-width: 47.999rem)" });

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
