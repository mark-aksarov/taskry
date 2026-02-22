"use client";

import { ViewModeLayout } from "@/components/common/ViewMode";
import { EntityContainerPagination } from "../common/EntityContainerPagination";

interface EntityContainerPresentationProps {
  page: number;
  pageSize: number;
  list: React.ReactNode;
  grid: React.ReactNode;
  totalPages: number;
}

export function EntityContainerPresentation({
  page,
  pageSize,
  list,
  grid,
  totalPages,
}: EntityContainerPresentationProps) {
  return (
    <>
      <ViewModeLayout list={list} grid={grid} />
      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
