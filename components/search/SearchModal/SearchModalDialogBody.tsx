import { DialogBody } from "@/components/ui/Dialog";

interface SearchModalProps {
  children: React.ReactNode;
}

export function SearchModalDialogBody({ children }: SearchModalProps) {
  return <DialogBody className="p-0!">{children}</DialogBody>;
}
