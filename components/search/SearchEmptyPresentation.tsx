import { DialogBody } from "../ui/Dialog";
import { SearchEmptySection } from "./SearchEmptySection";

export interface SearchEmptyPresentationProps {
  searchField: React.ReactNode;
}

export function SearchEmptyPresentation({
  searchField,
}: SearchEmptyPresentationProps) {
  return (
    <DialogBody className="relative">
      {searchField}
      <SearchEmptySection />
    </DialogBody>
  );
}
