"use client";

import useSWR from "swr";
import { useState } from "react";
import { useSearchContext } from "./SearchContext";
import { SearchPagination } from "./SearchPagination";
import { SearchPresentation } from "./SearchPresentation";
import { SearchList, SearchListSkeleton } from "./SearchList";
import { SearchEmptyPresentation } from "./SearchEmptyPresentation";
import { SearchPaginationSkeleton } from "./SearchPagination/SearchPaginationSkeleton";

export const pageSize = 10;

export interface SearchContainerProps<T> {
  endpoint: string;
  renderItem: (item: T) => React.ReactNode;
}

interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}

export function SearchContainer<T extends { id: string | number }>({
  endpoint,
  renderItem,
}: SearchContainerProps<T>) {
  const { page, query, searchField, searchToggleButtonGroup } =
    useSearchContext();

  const { data } = useSWR<PaginatedResponse<T>>(
    `${endpoint}?page=${page}&pageSize=${pageSize}&query=${query}`,
  );

  const [totalCount, setTotalCount] = useState<number | null>(null);

  const isLoading = !data;

  // Update totalCount when the data changes
  if (!isLoading && data.totalCount !== totalCount) {
    setTotalCount(data.totalCount);
  }

  // Check if the data is empty
  const isEmpty = !isLoading && totalCount === 0;

  if (isEmpty) {
    return <SearchEmptyPresentation searchField={searchField} />;
  }

  return (
    <SearchPresentation
      searchField={searchField}
      searchToggleButtonGroup={searchToggleButtonGroup}
      searchResult={
        isLoading ? (
          <SearchListSkeleton />
        ) : (
          <SearchList>{data.items.map(renderItem)}</SearchList>
        )
      }
      searchPagination={
        !totalCount ? (
          <SearchPaginationSkeleton />
        ) : (
          <SearchPagination totalCount={totalCount} />
        )
      }
    />
  );
}
