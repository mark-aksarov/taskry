import { SearchList } from "../SearchList";
import { SearchListItem } from "../../SearchListItem";

export function SearchListExample() {
  return (
    <SearchList>
      <SearchListItem value="Search keyword 1" onPress={() => {}} />
      <SearchListItem value="Search keyword 2" onPress={() => {}} />
      <SearchListItem value="Search keyword 3" onPress={() => {}} />
      <SearchListItem value="Search keyword 4" onPress={() => {}} />
      <SearchListItem value="Search keyword 5" onPress={() => {}} />
      <SearchListItem value="Search keyword 6" onPress={() => {}} />
      <SearchListItem value="Search keyword 7" onPress={() => {}} />
      <SearchListItem value="Search keyword 8" onPress={() => {}} />
      <SearchListItem value="Search keyword 9" onPress={() => {}} />
      <SearchListItem value="Search keyword 10" onPress={() => {}} />
    </SearchList>
  );
}
