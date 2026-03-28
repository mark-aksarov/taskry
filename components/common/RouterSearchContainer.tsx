"use client";

import { useModal } from "./ModalManagerContext";
import { useSearchParams } from "next/navigation";
import { useSearchBar } from "../search/SearchBar";
import { SearchListItem } from "../search/SearchListItem";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { SearchList, SearchListSkeleton } from "../search/SearchList";
import { useFetchSearchKeywords } from "@/lib/swr/hooks/useFetchSearchKeywords";

export function RouterSearchContainer({
  clearSelectedItems,
}: {
  clearSelectedItems?: () => void;
}) {
  const searchParams = useSearchParams();

  // whenever the search bar value changes, refetch the search keywords
  const { value: searchBarValue, updateValue: updateSearchBarValue } =
    useSearchBar();

  const { data } = useFetchSearchKeywords(searchBarValue);

  // close the search modal when applying a new search query
  const { onOpenChange } = useModal("search");

  // apply the filters when a search keyword is selected
  const applyFilterURL = useApplyFilterURL();

  if (!data) return <SearchListSkeleton />;

  function handlePress(newQuery: string) {
    clearSelectedItems?.();
    updateSearchBarValue(newQuery);
    onOpenChange(false);

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // set the search query
    newSearchParams.set("query", newQuery);

    applyFilterURL(newSearchParams);
  }

  return (
    <SearchList>
      {searchBarValue && (
        <SearchListItem value={searchBarValue} onPress={handlePress} />
      )}
      {data.map((keyword) => (
        <SearchListItem
          key={keyword.word}
          value={keyword.word}
          onPress={handlePress}
        />
      ))}
    </SearchList>
  );
}
