import { DialogBody } from "@/components/ui/Dialog";

interface FormBaseModalDialogProps {
  children: React.ReactNode;
}

export function FormBaseModalDialogBody({
  children,
}: FormBaseModalDialogProps) {
  return <DialogBody className="p-0!">{children}</DialogBody>;
}
