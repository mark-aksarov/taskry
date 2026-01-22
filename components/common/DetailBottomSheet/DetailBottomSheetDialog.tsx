import { Dialog } from "@/components/ui";

interface DetailBottomSheetDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailBottomSheetDialog(props: DetailBottomSheetDialogProps) {
  return <Dialog className="max-h-[calc(100dvh-6.25rem)]" {...props} />;
}
