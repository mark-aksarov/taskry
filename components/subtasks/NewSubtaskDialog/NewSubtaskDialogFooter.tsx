import { DialogFooter } from "@/components/ui";

export function NewSubtaskDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogFooter className="border-none p-4! pt-0!">{children}</DialogFooter>
  );
}
