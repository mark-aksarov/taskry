import { DialogBody, DialogFooter } from "../ui";
import { SearchForm } from "./SearchForm";

export interface SearchPresentationProps {
  toggleButtonGroup: React.ReactNode;
  searchList: React.ReactNode;
  pagination: React.ReactNode;
  totalPages: number;
}

export function SearchPresentation({
  toggleButtonGroup,
  searchList,
  pagination,
  totalPages,
}: SearchPresentationProps) {
  return (
    <>
      <DialogBody className="p-0!">
        <SearchForm />
        {toggleButtonGroup}
        {searchList}
      </DialogBody>

      {totalPages > 1 && <DialogFooter>{pagination}</DialogFooter>}
    </>
  );
}
