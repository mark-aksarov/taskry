"use client";

import { pageSize } from "../constants";
import { useSearchContext } from "../SearchContext";
import { Pagination } from "../../common/Pagination";
import { SearchPaginationStatus } from "./SearchPaginationStatus";

export interface SearchPaginationProps {
  totalCount: number;
}

export function SearchPagination({ totalCount }: SearchPaginationProps) {
  const { page, setPage } = useSearchContext();

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex h-[1.875rem] w-full items-center justify-between">
      <SearchPaginationStatus totalCount={totalCount} />
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => setPage(p)}
          showPageItems={false}
        />
      )}
    </div>
  );
}
