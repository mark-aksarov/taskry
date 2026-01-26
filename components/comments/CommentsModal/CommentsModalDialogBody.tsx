import { DialogBody } from "@/components/ui/Dialog";

export function CommentsModalDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogBody className="flex flex-col gap-4">{children}</DialogBody>;
}
