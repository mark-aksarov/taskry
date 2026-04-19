"use client";

import { Grid } from "./Grid";
import { useViewMode } from "@/components/common/ViewMode";
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
      <Grid viewMode={viewMode}>{children}</Grid>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
