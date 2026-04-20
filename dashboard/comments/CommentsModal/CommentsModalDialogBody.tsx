import { useRef } from "react";
import { DialogBody } from "@/ui/Dialog";
import { useScrollOnSendingCommentActionSuccess } from "@/lib/hooks/useScrollOnSendingCommentActionSuccess";

export function CommentsModalDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollOnSendingCommentActionSuccess(ref);

  return (
    <DialogBody ref={ref} className="relative flex flex-col gap-4">
      {children}
    </DialogBody>
  );
}
