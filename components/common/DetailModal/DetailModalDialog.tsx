import { Dialog } from "@/components/ui/Dialog";

interface DetailModalDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailModalDialog(props: DetailModalDialogProps) {
  return <Dialog className="md:max-h-[calc(100dvh-64px)]" {...props} />;
}
