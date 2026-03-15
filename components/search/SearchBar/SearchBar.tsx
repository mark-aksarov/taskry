import { SearchField } from "../SearchField";
import { DialogCloseButton } from "@/components/ui/Dialog";

export function SearchBar() {
  return (
    <div className="flex w-full items-center gap-2 p-4">
      <SearchField />
      <DialogCloseButton className="md:hidden" />
    </div>
  );
}
