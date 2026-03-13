import { DialogBody } from "@/components/ui/Dialog";

export function CommentsModalDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogBody className="flex">{children}</DialogBody>;
}
