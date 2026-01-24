import { Dialog } from "@/components/ui/Dialog";

interface CommentsModalDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function CommentsModalDialog(props: CommentsModalDialogProps) {
  return <Dialog className="md:h-[calc(100dvh-64px)]" {...props} />;
}
