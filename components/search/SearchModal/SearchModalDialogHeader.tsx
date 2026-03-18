import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function SearchModalDialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogHeaderWithClose className="max-md:hidden">
      {children}
    </DialogHeaderWithClose>
  );
}
