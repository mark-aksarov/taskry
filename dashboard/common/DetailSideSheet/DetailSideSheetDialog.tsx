import { Dialog } from "@/ui/Dialog";

interface DetailSideSheetDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailSideSheetDialog(props: DetailSideSheetDialogProps) {
  return <Dialog className="w-[400px]" {...props} />;
}
