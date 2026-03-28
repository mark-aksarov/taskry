"use client";

import { useModal } from "./ModalManagerContext";
import { useSearchBar } from "../search/SearchBar";
import { SearchListItemLink } from "../search/SearchListItem";
import { SearchList, SearchListSkeleton } from "../search/SearchList";
import { useFetchSearchKeywords } from "@/lib/swr/hooks/useFetchSearchKeywords";

export function LinkSearchContainer({ pathname }: { pathname: string }) {
  // whenever the search bar value changes, refetch the search keywords
  const { value: searchBarValue, updateValue: updateSearchBarValue } =
    useSearchBar();

  const { data } = useFetchSearchKeywords(searchBarValue);

  // close the search modal when applying a new search query
  const { onOpenChange } = useModal("search");

  if (!data) return <SearchListSkeleton />;

  function handlePress(value: string) {
    updateSearchBarValue(value);
    onOpenChange(false);
  }

  return (
    <SearchList>
      {searchBarValue && (
        <SearchListItemLink
          value={searchBarValue}
          pathname={pathname}
          onPress={handlePress}
        />
      )}
      {data.map((keyword) => (
        <SearchListItemLink
          key={keyword.word}
          value={keyword.word}
          pathname={pathname}
          onPress={handlePress}
        />
      ))}
    </SearchList>
  );
}
