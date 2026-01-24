import { DialogBody, DialogFooter } from "../ui/Dialog";

export interface SearchPresentationProps {
  searchField: React.ReactNode;
  searchToggleButtonGroup: React.ReactNode;
  searchResult: React.ReactNode;
  pagination: React.ReactNode;
  totalPages: number;
}

export function SearchPresentation({
  searchField,
  searchToggleButtonGroup,
  searchResult,
  pagination,
  totalPages,
}: SearchPresentationProps) {
  return (
    <>
      <DialogBody className="p-0!">
        <div className="w-full p-4 pb-0">{searchField}</div>
        {searchToggleButtonGroup}
        {searchResult}
      </DialogBody>
      {totalPages > 1 && <DialogFooter>{pagination}</DialogFooter>}
    </>
  );
}
