"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { useViewMode } from "@/components/common/ViewMode";
import { EntityContainerPagination } from "./EntityContainerPagination";

export interface EntityContainerPresentationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  listLarge: () => React.ReactNode;
  gridLarge: () => React.ReactNode;
  gridMobile: () => React.ReactNode;
}

export function EntityContainerPresentation({
  page,
  pageSize,
  listLarge,
  gridLarge,
  gridMobile,
  totalPages,
}: EntityContainerPresentationProps) {
  const { viewMode } = useViewMode();
  const isMd = useIsMd();

  let content;

  if (isMd) {
    content = gridMobile();
  } else if (viewMode === "list") {
    content = listLarge();
  } else {
    content = gridLarge();
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
