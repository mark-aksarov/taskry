import { useSearchBar } from "../SearchBar";

export function SearchModalTriggerText() {
  const { value: searchBarValue } = useSearchBar();

  return <div className="text-sm">{searchBarValue}</div>;
}
