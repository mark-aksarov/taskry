"use client";

import useSWR from "swr";
import { SearchEmptySection } from "./SearchEmptySection";
import { SearchPresentation } from "./SearchPresentation";
import { useSearchModalContext } from "./SearchModal/SearchModalContext";
import { ModalPagination } from "../common/ModalPagination";
import { SearchList, SearchListSkeleton } from "./SearchList";

const pageSize = 10;

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
  const { page, setPage, query, searchField, searchToggleButtonGroup } =
    useSearchModalContext();

  const { data, isLoading } = useSWR<PaginatedResponse<T>>(
    `${endpoint}?page=${page}&pageSize=${pageSize}&query=${query}`,
  );

  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const isEmpty = items.length === 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <SearchPresentation
      searchField={searchField}
      searchToggleButtonGroup={searchToggleButtonGroup}
      totalPages={totalPages}
      searchResult={
        isLoading ? (
          <SearchListSkeleton />
        ) : isEmpty ? (
          <SearchEmptySection />
        ) : (
          <SearchList>{items.map(renderItem)}</SearchList>
        )
      }
      pagination={
        !isEmpty && (
          <ModalPagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            totalCount={totalCount}
            totalPages={totalPages}
          />
        )
      }
    />
  );
}
