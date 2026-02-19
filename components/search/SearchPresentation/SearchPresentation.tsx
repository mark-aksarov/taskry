import { DialogBody, DialogFooter } from "../../ui/Dialog";

export interface SearchPresentationProps {
  searchField: React.ReactNode;
  searchToggleButtonGroup: React.ReactNode;
  searchResult: React.ReactNode;
  searchPagination: React.ReactNode;
}

export function SearchPresentation({
  searchField,
  searchToggleButtonGroup,
  searchResult,
  searchPagination,
}: SearchPresentationProps) {
  return (
    <>
      <DialogBody className="p-0!">
        <div className="w-full p-4 pb-0">{searchField}</div>
        {searchToggleButtonGroup}
        {searchResult}
      </DialogBody>

      <DialogFooter>{searchPagination}</DialogFooter>
    </>
  );
}
