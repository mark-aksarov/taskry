"use client";

import { usePageTransition } from "./PageTransitionContext";
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
  const { isFilteringPending, isSortingPending } = usePageTransition();

  return (
    <>
      <ViewModeLayout list={list} grid={grid} />

      {isFilteringPending || isSortingPending ? null : (
        <EntityContainerPagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
        />
      )}
    </>
  );
}
