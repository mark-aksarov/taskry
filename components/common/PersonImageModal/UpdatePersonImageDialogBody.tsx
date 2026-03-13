import { DialogBody } from "@/components/ui/Dialog";

export function UpdatePersonImageDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogBody className="flex flex-col items-center justify-center gap-4 overflow-hidden">
      {children}
    </DialogBody>
  );
}
