import { DialogBody } from "@/components/ui/Dialog";

export function SubtaskFormDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogBody className="p-4!">{children}</DialogBody>;
}
