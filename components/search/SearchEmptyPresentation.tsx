import { DialogBody } from "../ui";
import { SearchEmptySection } from "./SearchEmptySection";

export interface SearchEmptyPresentationProps {
  searchField: React.ReactNode;
}

export function SearchEmptyPresentation({
  searchField,
}: SearchEmptyPresentationProps) {
  return (
    <DialogBody className="p-0!">
      {searchField}
      <SearchEmptySection />
    </DialogBody>
  );
}
