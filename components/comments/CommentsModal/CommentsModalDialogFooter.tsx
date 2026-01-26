import { DialogFooter } from "@/components/ui/Dialog";

export function CommentsModalDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogFooter className="p-0!">{children}</DialogFooter>;
}
