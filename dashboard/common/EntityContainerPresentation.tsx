"use client";

import { EntityGrid } from "./EntityGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityContainerPagination } from "./EntityContainerPagination";

export interface EntityContainerPresentationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  children: React.ReactNode;
}

export function EntityContainerPresentation({
  page,
  pageSize,
  totalPages,
  children,
}: EntityContainerPresentationProps) {
  const { viewMode } = useViewMode();

  return (
    <>
      <EntityGrid viewMode={viewMode}>{children}</EntityGrid>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
