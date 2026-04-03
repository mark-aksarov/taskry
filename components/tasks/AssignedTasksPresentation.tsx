"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { EntityContainerPagination } from "@/components/common/EntityContainerPagination";
import { EntityContainerPresentationProps } from "@/components/common/EntityContainerPresentation";

type AssignedTasksPresentationProps = Omit<
  EntityContainerPresentationProps,
  "gridLarge"
>;

export function AssignedTasksPresentation({
  page,
  pageSize,
  listLarge,
  gridMobile,
  totalPages,
}: AssignedTasksPresentationProps) {
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
