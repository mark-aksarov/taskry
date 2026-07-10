import { useSearchBar } from "../SearchBar";

export function SearchModalTriggerText() {
  const { value: searchBarValue } = useSearchBar();

  return <div className="truncate text-sm">{searchBarValue}</div>;
}
