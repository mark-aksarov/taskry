import { FiltersFormResetButton } from "./FiltersForm";
import { DialogCloseButton, DialogHeader, DialogHeading } from "../ui/Dialog";

interface FilterModalDialogHeaderProps {
  resetFilters: () => void;
  children: React.ReactNode;
}

export function FilterModalDialogHeader({
  resetFilters,
  children,
}: FilterModalDialogHeaderProps) {
  return (
    <DialogHeader className="relative justify-start gap-2">
      <DialogHeading className="mr-auto">{children}</DialogHeading>
      <FiltersFormResetButton onPress={resetFilters} />
      <DialogCloseButton />
    </DialogHeader>
  );
}
