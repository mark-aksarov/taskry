import { Dialog } from "@/components/ui/Dialog";

interface SubtaskFormDialogProps {
  children: React.ReactNode;
}

export function SubtaskFormDialog({ children }: SubtaskFormDialogProps) {
  return <Dialog className="md:w-[300px]">{children}</Dialog>;
}
