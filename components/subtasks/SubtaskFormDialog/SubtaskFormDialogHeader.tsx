import { DialogHeader } from "@/components/ui/Dialog";

export function SubtaskFormDialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogHeader className="px-4! py-3!">{children}</DialogHeader>;
}
