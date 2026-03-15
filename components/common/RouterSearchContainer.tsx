"use client";

import { useSearchBar } from "../search/SearchBar";
import { useSearchModal } from "../search/SearchModal";
import { SearchListItem } from "../search/SearchListItem";
import { useApplySearchQuery } from "../search/useApplySearchQuery";
import { SearchList, SearchListSkeleton } from "../search/SearchList";
import { useFetchSearchKeywords } from "@/lib/swr/hooks/useFetchSearchKeywords";

export function RouterSearchContainer({
  clearSelectedItems,
}: {
  clearSelectedItems?: () => void;
}) {
  // whenever the search bar value changes, refetch the search keywords
  const { value: searchBarValue, updateValue: updateSearchBarValue } =
    useSearchBar();

  const { data } = useFetchSearchKeywords(searchBarValue);

  // close the search modal when applying a new search query
  const { onOpenChange } = useSearchModal();

  // apply the search query when a search keyword is selected
  const applySearchQuery = useApplySearchQuery();

  if (!data) return <SearchListSkeleton />;

  function handlePress(value: string) {
    clearSelectedItems?.();
    updateSearchBarValue(value);
    onOpenChange(false);
    applySearchQuery(value);
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
