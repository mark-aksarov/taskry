import { Dialog } from "@/components/ui/Dialog";

interface SearchModalDialogProps {
  children: React.ReactNode;
}

export function SearchModalDialog({ children }: SearchModalDialogProps) {
  return <Dialog className="md:h-[calc(100dvh-64px)]">{children}</Dialog>;
}
