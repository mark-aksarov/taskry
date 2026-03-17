"use client";

import { useViewMode } from "@/components/common/ViewMode";
import { EntityContainerPagination } from "./EntityContainerPagination";

interface EntityContainerPresentationProps {
  page: number;
  pageSize: number;
  listLarge: React.ReactNode;
  gridLarge: React.ReactNode;
  gridMobile: React.ReactNode;
  totalPages: number;
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

  return (
    <>
      <div className="max-md:hidden">
        {viewMode === "list" ? listLarge : gridLarge}
      </div>

      <div className="md:hidden">{gridMobile}</div>

      <EntityContainerPagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </>
  );
}
