import { DialogFooter } from "@/components/ui/Dialog";

export function SubtaskFormDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogFooter className="border-none p-4! pt-0!">{children}</DialogFooter>
  );
}
