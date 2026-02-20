import { DialogFooter } from "@/components/ui/Dialog";
import { CommentCancelEditingButton } from "../CommentCancelEditingButton";

export function CommentsModalDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogFooter className="flex-col items-start p-0!">
      <CommentCancelEditingButton />
      {children}
    </DialogFooter>
  );
}
